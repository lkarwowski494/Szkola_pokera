/**
 * Terminy PL ↔ EN (content/terms.yaml): wspólny renderer znaczników {{t:klucz}} i {{t:klucz|forma}} dla potoku treści
 * i aplikacji (teksty zadań generowanych). Czysty TypeScript, bez zależności od React Native.
 *
 * Reguła nawiasu (dokument 13, decyzja T-01):
 * - nazwa angielska w nawiasie, gdy polska nazwa różni się od angielskiej (porównanie bez wielkości liter, spacji
 *   i myślników) albo gdy w tekście stoi sam skrót (UTG, SPR);
 * - skrót w nawiasie, gdy termin go ma, a w tekście stoi pełna nazwa (mały blind → „mały blind (small blind, SB)”);
 * - nawias tylko przy pierwszym użyciu terminu w jednostce tekstu; kolejne użycia w tej samej jednostce bez nawiasu;
 * - bez „(…) (…)”: gdy za terminem stoi nawias z treści, nazwa angielska idzie do późniejszego wystąpienia albo do tego
 *   nawiasu („przebiłeś (raise; 3-bet)”); termin wewnątrz nawiasu dostaje nawias kwadratowy („(33% puli [pot])”).
 */

export interface TermInfo {
  pl: string;
  en: string;
  enAlt?: readonly string[];
  abbr?: string;
  area: string;
  forms?: readonly string[];
  skip?: readonly string[];
}

export type TermLookup = (key: string) => TermInfo | undefined;

/** {{t:klucz}} albo {{t:klucz|forma}}. Forma nie zawiera „}” ani „|”. */
export const TERM_PLACEHOLDER = /\{\{t:([a-z0-9][a-z0-9.\-]*)(?:\|([^}|]+))?\}\}/g;

const norm = (s: string) => s.toLowerCase().replace(/[\s\-]/g, '');

/** Czy termin w ogóle dostaje nazwę angielską w nawiasie (polska nazwa ≠ angielska). */
export function termNeedsEnglish(t: Pick<TermInfo, 'pl' | 'en'>): boolean {
  return norm(t.pl) !== norm(t.en);
}

/** Zawartość nawiasu dla danej formy albo null, gdy nawias niepotrzebny. */
export function termGloss(t: TermInfo, form: string): string | null {
  const isAbbr = !!t.abbr && form === t.abbr;
  const parts: string[] = [];
  if (termNeedsEnglish(t) || isAbbr) parts.push(t.en);
  if (t.abbr && !isAbbr) parts.push(t.abbr);
  // nic, co już stoi w tekście (forma równa nazwie angielskiej albo skrótowi), nie trafia do nawiasu
  const out = parts.filter((p) => norm(p) !== norm(form));
  return out.length ? out.join(', ') : null;
}

/** Tekst jednego terminu: „forma (en)” albo sama forma. */
export function termText(t: TermInfo, form = t.pl): string {
  const g = termGloss(t, form);
  return g ? `${form} (${g})` : form;
}

/**
 * Podstawia znaczniki terminów w jednej jednostce tekstu. `seen` przenosi stan „już objaśniony” między polami tej samej
 * jednostki (np. if/then/because reguły). Nieznany klucz przerywa (błąd z miejscem `where`).
 */
export function renderTerms(text: string, lookup: TermLookup, where: string, seen: Set<string> = new Set(), used?: Set<string>): string {
  const matches = [...text.matchAll(TERM_PLACEHOLDER)];
  const info = matches.map((m) => {
    const t = lookup(m[1]!);
    if (!t) throw new Error(`${where}: nieznany termin {{t:${m[1]}}}`);
    used?.add(m[1]!);
    const end = m.index! + m[0].length;
    const before = text.slice(0, m.index).replace(TERM_PLACEHOLDER, '');
    const depth = (before.match(/\(/g)?.length ?? 0) - (before.match(/\)/g)?.length ?? 0);
    return { key: m[1]!, t, form: m[2] ?? t.pl, start: m.index!, end, parenAfter: /^\s*\(/.test(text.slice(end)), inParen: depth > 0 };
  });
  // Które wystąpienie dostaje nawias: pierwsze, po którym nie stoi już nawias z treści i które nie jest w nawiasie;
  // potem pierwsze bez nawiasu tuż za nim; w ostateczności pierwsze, a nazwę angielską wpisujemy do nawiasu z treści
  // („przebiłeś (raise; 3-bet)”), żeby nie było „(…) (…)”.
  const chosen = new Map<string, number>();
  for (const pass of [(x: (typeof info)[number]) => !x.parenAfter && !x.inParen, (x: (typeof info)[number]) => !x.parenAfter, () => true]) {
    info.forEach((x, i) => {
      if (!seen.has(x.key) && !chosen.has(x.key) && termGloss(x.t, x.form) !== null && pass(x)) chosen.set(x.key, i);
    });
  }
  let out = '';
  let last = 0;
  info.forEach((x, i) => {
    out += text.slice(last, x.start);
    last = x.end;
    if (chosen.get(x.key) !== i) {
      out += x.form;
      return;
    }
    const g = termGloss(x.t, x.form)!;
    if (x.parenAfter) {
      const p = /^\s*\(/.exec(text.slice(x.end))!;
      out += `${x.form} (${g}; `;
      last = x.end + p[0].length;
    } else if (x.inParen) out += `${x.form} [${g}]`; // nawias w nawiasie: kwadratowy (polska typografia)
    else out += `${x.form} (${g})`;
  });
  for (const x of info) seen.add(x.key);
  return out + text.slice(last);
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const LETTER = '\\p{L}\\p{N}_\\-';

/** Wariant formy z wielką pierwszą literą (początek zdania, opcja odpowiedzi). */
function variants(f: string): string[] {
  const up = f.charAt(0).toUpperCase() + f.slice(1);
  return up === f ? [f] : [f, up];
}

export interface TermMatcher {
  /** Polskie formy terminów stojące w tekście bez znacznika. */
  find(text: string): { form: string; key: string }[];
}

/**
 * Wykrywa formy z pola `forms` stojące poza znacznikami (jak kontrola liczb wpisanych ręcznie). Pomija znaczniki
 * {{…}}, karty [[…]], adresy URL i frazy z pola `skip`. Dłuższe formy mają pierwszeństwo („dwie pary” przed „pary”).
 */
export function termMatcher(terms: Iterable<[string, TermInfo]>): TermMatcher {
  const formKey = new Map<string, string>();
  const skips: string[] = [];
  for (const [key, t] of terms) {
    for (const f of t.forms ?? []) for (const v of variants(f)) if (!formKey.has(v)) formKey.set(v, key);
    for (const s of t.skip ?? []) skips.push(...variants(s));
  }
  const forms = [...formKey.keys()].sort((a, b) => b.length - a.length);
  if (forms.length === 0) return { find: () => [] };
  const re = new RegExp(`(?<![${LETTER}])(${forms.map(escapeRe).join('|')})(?![${LETTER}])`, 'gu');
  const skipRe = skips.length ? new RegExp(`(?<![${LETTER}])(${skips.sort((a, b) => b.length - a.length).map(escapeRe).join('|')})(?![${LETTER}])`, 'gu') : null;
  return {
    find(text: string) {
      let masked = text
        .replace(/\{\{[^}]*\}\}/g, (m) => ' '.repeat(m.length))
        .replace(/\[\[[^\]]*\]\]/g, (m) => ' '.repeat(m.length))
        .replace(/https?:\/\/\S+/g, (m) => ' '.repeat(m.length));
      if (skipRe) masked = masked.replace(skipRe, (m) => ' '.repeat(m.length));
      return [...masked.matchAll(re)].map((m) => ({ form: m[1]!, key: formKey.get(m[1]!)! }));
    },
  };
}
