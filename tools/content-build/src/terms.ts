import { renderTerms, termMatcher, termNeedsEnglish, type CompiledTerm, type TermEntry, type TermInfo } from '@szkola/content-schema';

/**
 * Terminy PL ↔ EN w potoku treści (content/terms.yaml). Znaczniki {{t:…}} zamieniamy na „forma (en)”, a polskie
 * formy terminów bez znacznika zgłaszamy jako błąd (decyzja T-02, dokument 13): jak liczby, nazwa angielska ma jedno
 * źródło prawdy, a tekst bez znacznika po cichu by go omijał.
 */

export interface Terms {
  info: Map<string, TermInfo>;
  compiled: (CompiledTerm & { forms?: string[]; skip?: string[] })[];
  /** Rendery jednej jednostki tekstu; `seen` wspólny dla pól tej samej jednostki. */
  render(text: string, where: string, seen?: Set<string>): string;
  /** Formy bez znacznika w surowym tekście (przed podstawieniem). */
  unmarked(text: string): { form: string; key: string }[];
  used: Set<string>;
}

export function loadTerms(file: Record<string, TermEntry>): Terms {
  const info = new Map<string, TermInfo>();
  const plSeen = new Map<string, string>();
  for (const [key, e] of Object.entries(file)) {
    const pl = e.pl.toLowerCase();
    if (plSeen.has(pl)) throw new Error(`terms.yaml: polska nazwa „${e.pl}” powtarza się w ${plSeen.get(pl)} i ${key}`);
    plSeen.set(pl, key);
    info.set(key, { pl: e.pl, en: e.en, ...(e.en_alt ? { enAlt: e.en_alt } : {}), ...(e.abbr ? { abbr: e.abbr } : {}), area: e.area, forms: e.forms ?? [], skip: e.skip ?? [] });
  }
  // ta sama forma nie może należeć do dwóch terminów (inaczej kontrola nie wie, który znacznik podpowiedzieć)
  const formOwner = new Map<string, string>();
  for (const [key, t] of info) {
    for (const f of t.forms ?? []) {
      const prev = formOwner.get(f);
      if (prev && prev !== key) throw new Error(`terms.yaml: forma „${f}” należy do ${prev} i ${key}`);
      formOwner.set(f, key);
    }
    if (!termNeedsEnglish(t) && !t.abbr && (t.forms?.length ?? 0) > 0) {
      throw new Error(`terms.yaml: ${key} ma polską nazwę równą angielskiej, więc nie wymaga znacznika; usuń forms`);
    }
  }
  const matcher = termMatcher(info);
  const used = new Set<string>();
  const lookup = (k: string) => info.get(k);
  const compiled: Terms['compiled'] = [...info].map(([key, t]) => ({
    key,
    pl: t.pl,
    en: t.en,
    enAlt: [...(t.enAlt ?? [])],
    ...(t.abbr ? { abbr: t.abbr } : {}),
    area: t.area as CompiledTerm['area'],
    source: file[key]!.source,
    ...(t.forms?.length ? { forms: [...t.forms] } : {}),
    ...(t.skip?.length ? { skip: [...t.skip] } : {}),
  }));
  return {
    info,
    compiled,
    used,
    render: (text, where, seen = new Set()) => renderTerms(text, lookup, where, seen, used),
    unmarked: (text) => matcher.find(text),
  };
}

/** Moduł TS z terminami dla aplikacji (teksty zadań generowanych i ćwiczenie słownictwa). */
export function termsModuleSource(terms: (CompiledTerm & { forms?: string[]; skip?: string[] })[]): string {
  const rows = terms.map((t) => {
    const fields = [`pl: ${JSON.stringify(t.pl)}`, `en: ${JSON.stringify(t.en)}`, `enAlt: ${JSON.stringify(t.enAlt)}`];
    if (t.abbr) fields.push(`abbr: ${JSON.stringify(t.abbr)}`);
    fields.push(`area: ${JSON.stringify(t.area)}`);
    if (t.forms?.length) fields.push(`forms: ${JSON.stringify(t.forms)}`);
    if (t.skip?.length) fields.push(`skip: ${JSON.stringify(t.skip)}`);
    return `  ${JSON.stringify(t.key)}: { ${fields.join(', ')} },`;
  });
  return [
    '// Wygenerowane przez content-build z content/terms.yaml (pnpm content:build). Nie edytuj ręcznie.',
    "import type { TermArea } from '@szkola/content-schema';",
    '',
    'export interface AppTerm {',
    '  pl: string;',
    '  en: string;',
    '  enAlt: readonly string[];',
    '  abbr?: string;',
    '  area: TermArea;',
    '  /** Formy wymagające znacznika (test tekstów aplikacji). */',
    '  forms?: readonly string[];',
    '  skip?: readonly string[];',
    '}',
    '',
    'export const TERMS = {',
    ...rows,
    '} as const satisfies Record<string, AppTerm>;',
    '',
    'export type TermKey = keyof typeof TERMS;',
    '',
  ].join('\n');
}
