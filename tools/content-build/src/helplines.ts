import { formatPolishDate, resolvePhoneRefs, type HelplinesFile } from '@szkola/content-schema';

/**
 * Telefony pomocy (content/helplines.yaml, B-058). Lekcja wstawia je znacznikiem {{helplines}} w osobnej linii, a
 * aplikacja dostaje ten sam plik jako moduł TS (ekran „Pomoc”), więc numer, godziny i koszt żyją w jednym miejscu.
 */

export const HELPLINES_MARKER = '{{helplines}}';

export interface Helplines extends HelplinesFile {
  /** Dopisek „Za granicą…” z podstawionymi numerami. */
  abroadText: string;
  /** Stopka „Dane sprawdzone: …”. */
  checkedText: string;
}

export function loadHelplines(file: HelplinesFile): Helplines {
  const ids = new Set<string>();
  const phones = new Set<string>();
  for (const e of file.entries) {
    if (ids.has(e.id)) throw new Error(`helplines.yaml: powtórzony wpis ${e.id}`);
    ids.add(e.id);
    if (e.phone) {
      if (phones.has(e.phone)) throw new Error(`helplines.yaml: numer ${e.phone} powtarza się`);
      phones.add(e.phone);
    }
  }
  return { ...file, abroadText: resolvePhoneRefs(file.abroad, file.entries), checkedText: `Dane sprawdzone: ${formatPolishDate(file.checked)}` };
}

/** Domena do pokazania w tekście lekcji (Markdown bez linków: „https://116sos.pl/” → „116sos.pl”). */
export function displayHost(url: string): string {
  return new URL(url).host.replace(/^www\./, '');
}

/** Lista w Markdown dla ramki w lekcji: jedna pozycja na wpis, potem dopisek i data sprawdzenia. */
export function helplinesMarkdown(h: Helplines): string {
  const items = h.entries.map((e) => {
    const head = e.phone ? `**${e.name}: ${e.phone}**` : `**${e.name}**`;
    const details = [e.hours, e.cost].filter(Boolean).join(', ');
    const sentences = [details ? `${head}, ${details}.` : `${head}.`];
    if (e.info) sentences.push(e.info);
    for (const l of e.links ?? []) sentences.push(`${l.label}: ${displayHost(l.url)}.`);
    return `- ${sentences.join(' ')}`;
  });
  return [...items, '', h.abroadText, '', `${h.checkedText}.`].join('\n');
}

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
    if (e.phone && e.phone.length > 3 && text.replace(/\s/g, '').includes(e.phone.replace(/\s/g, ''))) {
      throw new Error(`${where}: numer ${e.phone} wpisany ręcznie; użyj znacznika ${HELPLINES_MARKER} (content/helplines.yaml)`);
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

/** Moduł TS dla ekranu „Pomoc” (z tego samego helplines.yaml). */
export function helplinesModuleSource(h: Helplines): string {
  const data = {
    checked: h.checked,
    checkedText: h.checkedText,
    abroadText: h.abroadText,
    entries: h.entries.map((e) => ({
      id: e.id,
      name: e.name,
      ...(e.phone ? { phone: e.phone } : {}),
      ...(e.hours ? { hours: e.hours } : {}),
      ...(e.cost ? { cost: e.cost } : {}),
      ...(e.info ? { info: e.info } : {}),
      links: e.links ?? [],
    })),
  };
  return [
    '// Wygenerowane przez content-build z content/helplines.yaml (pnpm content:build). Nie edytuj ręcznie.',
    '',
    'export interface AppHelpline {',
    '  id: string;',
    '  name: string;',
    '  phone?: string;',
    '  hours?: string;',
    '  cost?: string;',
    '  info?: string;',
    '  links: readonly { label: string; url: string }[];',
    '}',
    '',
    `export const HELPLINES: { checked: string; checkedText: string; abroadText: string; entries: readonly AppHelpline[] } = ${JSON.stringify(data, null, 2)};`,
    '',
  ].join('\n');
}
