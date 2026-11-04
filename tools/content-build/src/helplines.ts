import { formatPolishDate, type HelplineEntry, type HelplinesFile } from '@szkola/content-schema';

/**
 * Telefony pomocy (content/helplines.yaml, B-058). Lekcja wstawia je znacznikiem {{helplines}} w osobnej linii, a
 * aplikacja dostaje ten sam plik jako moduł TS (ekran „Pomoc”), więc numer, godziny i koszt żyją w jednym miejscu.
 * Lekcje są per język, nie per kraj, więc ramka w lekcji pokazuje tylko pomoc międzynarodową online i odsyła do ekranu
 * „Pomoc”, który wybiera numery kraju (selectHelplines w content-schema).
 */

export const HELPLINES_MARKER = '{{helplines}}';

export interface Helplines extends HelplinesFile {
  /** Stopka „Dane sprawdzone: …”. */
  checkedText: string;
}

/** Wszystkie numery wpisu do wyświetlenia (główny, dodatkowe, SMS). */
function entryPhones(e: HelplineEntry): string[] {
  return [e.phone, ...(e.phone_alt ?? []).map((a) => a.phone), e.sms].filter((p): p is string => !!p);
}

const digits = (p: string) => p.replace(/\D/g, '');
const host = (url: string) => new URL(url).host.toLowerCase().replace(/^www\./, '');

/**
 * Kontrole między wpisami, których schemat nie wyrazi: powtórzone id, numer powtórzony w innym wpisie tego samego
 * kraju, region spoza listy `regions`, link do domeny spoza źródeł wpisu (np. domena, która przekierowuje na obcą
 * stronę, D-150), wpisy `fallback.online` tylko z pomocy międzynarodowej, numer alarmowy w każdym kraju.
 */
export function loadHelplines(file: HelplinesFile): Helplines {
  const ids = new Set<string>();
  const phonesByCountry = new Map<string, Map<string, string>>();
  for (const e of file.entries) {
    if (ids.has(e.id)) throw new Error(`helplines.yaml: powtórzony wpis ${e.id}`);
    ids.add(e.id);
    const seen = phonesByCountry.get(e.country) ?? new Map<string, string>();
    phonesByCountry.set(e.country, seen);
    // numer i SMS tego samego wpisu mogą być równe (988: telefon i SMS); między wpisami kraju numer nie może się powtórzyć
    for (const p of new Set([e.phone, ...(e.phone_alt ?? []).map((a) => a.phone)].filter((x): x is string => !!x).map(digits))) {
      const other = seen.get(p);
      if (other) throw new Error(`helplines.yaml: ${e.id}: numer ${entryPhones(e).find((x) => digits(x) === p)} powtarza się w kraju ${e.country} (${other})`);
      seen.set(p, e.id);
    }
    for (const r of e.regions ?? []) if (!(r in file.regions)) throw new Error(`helplines.yaml: ${e.id}: nieznany region ${r} (dopisz go w regions)`);
    const allowed = new Set(e.sources.map((s) => host(s.url)));
    for (const l of e.links ?? []) {
      if (!allowed.has(host(l.url))) throw new Error(`helplines.yaml: ${e.id}: link ${l.url} prowadzi do domeny spoza źródeł wpisu (${[...allowed].join(', ')})`);
    }
  }
  for (const id of file.fallback.online) {
    const e = file.entries.find((x) => x.id === id);
    if (!e || e.country !== '*') throw new Error(`helplines.yaml: fallback.online: ${id} nie jest wpisem pomocy międzynarodowej (country: '*')`);
  }
  for (const c of new Set(file.entries.map((e) => e.country))) {
    if (c !== '*' && !file.entries.some((e) => e.country === c && e.kind === 'emergency')) throw new Error(`helplines.yaml: ${c}: brak numeru alarmowego (kind: emergency)`);
  }
  return { ...file, checkedText: `Dane sprawdzone: ${formatPolishDate(file.checked)}` };
}

/** Domena do pokazania w tekście lekcji (Markdown bez linków: „https://116sos.pl/” → „116sos.pl”). */
export function displayHost(url: string): string {
  return new URL(url).host.replace(/^www\./, '');
}

/** Wpisy pomocy międzynarodowej online (fallback.online) w kolejności z pliku. */
function onlineEntries(h: Helplines): HelplineEntry[] {
  return h.fallback.online.map((id) => h.entries.find((e) => e.id === id)!);
}

/**
 * Ramka w lekcji: pomoc międzynarodowa online (bez numerów jednego kraju), odesłanie do ekranu „Pomoc”, tekst
 * na zagrożenie życia i data sprawdzenia.
 */
export function helplinesMarkdown(h: Helplines): string {
  const items = onlineEntries(h).map((e) => {
    const sentences = [`**${e.name}**.`];
    if (e.info) sentences.push(e.info);
    for (const l of e.links ?? []) sentences.push(`${l.label}: ${displayHost(l.url)}.`);
    return `- ${sentences.join(' ')}`;
  });
  return [...items, '', h.pointer, '', h.fallback.text, '', `${h.checkedText}.`].join('\n');
}

/** Wyrażenie wykrywające numer w tekście: te same cyfry z dowolnymi spacjami i łącznikami, bez cyfr obok. */
function phonePattern(p: string): RegExp {
  return new RegExp(`(?<!\\d)${digits(p).split('').join('[\\s\\u00a0-]*')}(?!\\d)`);
}

/** Najkrótszy numer sprawdzany w lekcjach: krótsze (112, 1925, 3114) to zbyt często lata albo liczby w tekście. */
export const MIN_CHECKED_DIGITS = 5;

/**
 * Rozwija znacznik {{helplines}} w tekście lekcji. Numer z helplines.yaml wpisany ręcznie poza znacznikiem przerywa
 * budowanie: inaczej po zmianie numeru lekcja i ekran „Pomoc” po cichu by się rozjechały.
 */
export function expandHelplines(text: string, h: Helplines, where: string, used: { count: number }): string {
  const lines = text.split('\n');
  for (const l of lines) {
    if (l.includes(HELPLINES_MARKER) && l.trim() !== HELPLINES_MARKER) throw new Error(`${where}: znacznik ${HELPLINES_MARKER} musi stać sam w linii`);
  }
  for (const e of h.entries) {
    for (const p of entryPhones(e)) {
      if (digits(p).length >= MIN_CHECKED_DIGITS && phonePattern(p).test(text)) {
        throw new Error(`${where}: numer ${p} wpisany ręcznie; użyj znacznika ${HELPLINES_MARKER} (content/helplines.yaml)`);
      }
    }
    if (e.vanity && text.toUpperCase().includes(e.vanity)) {
      throw new Error(`${where}: numer ${e.vanity} wpisany ręcznie; użyj znacznika ${HELPLINES_MARKER} (content/helplines.yaml)`);
    }
  }
  return lines
    .map((l) => {
      if (l.trim() !== HELPLINES_MARKER) return l;
      used.count++;
      return helplinesMarkdown(h);
    })
    .join('\n');
}

/**
 * Moduł TS dla ekranu „Pomoc” (z tego samego helplines.yaml). Jeden obiekt JSON (`HELPLINES`), bo flow E2E czyta go
 * bez kompilacji (apps/mobile/e2e/helplines-env.mjs). `entries` to wszystkie wpisy wszystkich krajów; wybór kraju
 * i regionu (selectHelplines z content-schema) robi ekran. Źródła (sources) zostają w repozytorium.
 */
export function helplinesModuleSource(h: Helplines): string {
  const data = {
    checked: h.checked,
    checkedText: h.checkedText,
    reviewBy: h.review_by,
    /** Tekst dla kraju bez wpisów (D-142); dawne pole „abroadText” ekranu. */
    abroadText: h.fallback.text,
    pointer: h.pointer,
    fallback: h.fallback,
    regions: h.regions,
    entries: h.entries.map((e) => ({
      id: e.id,
      claim: e.claim,
      country: e.country,
      ...(e.regions ? { regions: e.regions } : {}),
      ...(e.national ? { national: true } : {}),
      kind: e.kind,
      name: e.name,
      ...(e.phone ? { phone: e.phone } : {}),
      ...(e.vanity ? { vanity: e.vanity } : {}),
      ...(e.phone_alt ? { phone_alt: e.phone_alt } : {}),
      ...(e.sms ? { sms: e.sms } : {}),
      ...(e.hours ? { hours: e.hours } : {}),
      ...(e.cost ? { cost: e.cost } : {}),
      ...(e.language ? { language: e.language } : {}),
      ...(e.operator ? { operator: e.operator } : {}),
      ...(e.info ? { info: e.info } : {}),
      ...(e.review_by ? { review_by: e.review_by } : {}),
      links: e.links ?? [],
    })),
  };
  return [
    '// Wygenerowane przez content-build z content/helplines.yaml (pnpm content:build). Nie edytuj ręcznie.',
    "import type { HelplineEntry } from '@szkola/content-schema';",
    '',
    '/** Wpis bez źródeł (zostają w content/helplines.yaml); pola jak w HelplineEntry z content-schema. */',
    "export type AppHelpline = Omit<HelplineEntry, 'sources' | 'links'> & { links: readonly { label: string; url: string }[] };",
    '',
    'export const HELPLINES: {',
    '  checked: string;',
    '  checkedText: string;',
    '  reviewBy: string;',
    '  abroadText: string;',
    '  pointer: string;',
    '  fallback: { text: string; online: readonly string[] };',
    '  regions: Readonly<Record<string, string>>;',
    '  entries: readonly AppHelpline[];',
    `} = ${JSON.stringify(data, null, 2)};`,
    '',
  ].join('\n');
}
