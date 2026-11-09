/**
 * Języki aplikacji (D-131: polityka „szeroka”, 35 lokalizacji jak w Treningu; NFR-JEZ-001).
 * Lista odpowiada `locales/*.json` repo `trening` (commit 2e4b0f8, odczyt 2026-11-04). Jedno źródło listy dla interfejsu,
 * `content-build` (baza na język, ADR 0005) i skryptu `sprawdz-i18n.mjs`.
 */
export const JEZYKI = [
  'pl', 'en', 'bg', 'cs', 'da', 'de', 'el', 'es', 'es-419', 'et', 'fi', 'fr', 'hr', 'hu', 'id', 'it', 'ja', 'ko',
  'lt', 'lv', 'ms', 'nb', 'nl', 'pt', 'pt-BR', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'tr', 'uk', 'vi', 'zh-Hant',
] as const;
export type Jezyk = (typeof JEZYKI)[number];

/** Język tekstów źródłowych i ostatni element łańcucha zastępczego. */
export const ZRODLO: Jezyk = 'pl';
/** Język dla systemu spoza listy (BRD, rynek główny US; „Język systemu spoza listy”). */
export const ZAPASOWY: Jezyk = 'en';
/** Warianty regionalne: słownik wariantu zawiera tylko różnice względem języka bazowego (jak w Treningu). */
export const NAKLADKI: Partial<Record<Jezyk, Jezyk>> = { 'es-419': 'es', 'pt-BR': 'pt' };

export const jestJezykiem = (x: unknown): x is Jezyk => typeof x === 'string' && (JEZYKI as readonly string[]).includes(x);

/** Wariant → język bazowy → źródło (bez powtórzeń). */
export function lancuchZastepczy(j: Jezyk): Jezyk[] {
  const baza = NAKLADKI[j];
  return [...new Set<Jezyk>([j, ...(baza ? [baza] : []), ZRODLO])];
}

/**
 * Łańcuch tekstów (treść i brakujące klucze interfejsu, D-289): wariant → język → en → pl. Po przekładzie en to on, a nie
 * źródło, jest językiem zastępczym (Trening: brak klucza → angielski, `docs/16-jezyki-i-marka.md:23`). Wybór języka
 * z preferencji telefonu (`wybierzJezyk`) zostaje przy `lancuchZastepczy`.
 */
export function lancuchTresci(j: Jezyk): Jezyk[] {
  const baza = NAKLADKI[j];
  if (j === ZRODLO) return [ZRODLO];
  return [...new Set<Jezyk>([j, ...(baza ? [baza] : []), ZAPASOWY, ZRODLO])];
}

/** Regiony, w których hiszpański dziedziczy po es-419 (CLDR supplementalData.xml, parentLocales; odczyt przez Trening 2026-10-09). */
const REGIONY_ES_419 = ['419', 'AR', 'BO', 'BR', 'BZ', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'GT', 'HN', 'JP', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'US', 'UY', 'VE'];
/** Regiony chińskiego w piśmie tradycyjnym (CLDR likelySubtags: zh_TW, zh_HK, zh_MO → Hant). */
const REGIONY_HANT = ['TW', 'HK', 'MO'];
/** Przestarzałe kody (CLDR supplementalMetadata languageAlias: in → id, zsm → ms). */
const ALIASY: Record<string, string> = { in: 'id', zsm: 'ms' };

/**
 * Tag języka systemu (BCP 47, np. „pt-BR”, „es_MX”, „sr-Latn-RS”) → język aplikacji albo null, gdy tag nie pasuje do żadnego z 35.
 * pt: sam „pt” lub region BR → pt-BR, inny region → pt. es: region z listy es-419 → es-419, reszta → es.
 * zh: pismo Hant albo region TW/HK/MO bez pisma → zh-Hant; chiński uproszczony poza zestawem → null.
 */
export function jezykZTagu(tag: string | null | undefined): Jezyk | null {
  const czesci = (tag ?? '').split(/[-_]/);
  const kod0 = (czesci[0] ?? '').toLowerCase();
  const kod = ALIASY[kod0] ?? kod0;
  const region = (czesci.slice(1).find((x) => /^([A-Za-z]{2}|\d{3})$/.test(x)) ?? '').toUpperCase();
  const pismo = (czesci.slice(1).find((x) => /^[A-Za-z]{4}$/.test(x)) ?? '').toLowerCase();
  if (kod === 'pt') return !region || region === 'BR' ? 'pt-BR' : 'pt';
  if (kod === 'es') return REGIONY_ES_419.includes(region) ? 'es-419' : 'es';
  if (kod === 'zh') return pismo === 'hant' || (!pismo && REGIONY_HANT.includes(region)) ? 'zh-Hant' : null;
  return jestJezykiem(kod) ? kod : null;
}

/**
 * Język aplikacji z preferencji systemu: pierwszy tag z listy, którego język jest dostępny (ma słownik); wariant bez słownika
 * schodzi do języka bazowego. Nic nie pasuje: angielski (BRD), a bez niego język źródłowy.
 * `dostepne` to języki z rzeczywistym słownikiem (nie cała lista JEZYKI).
 */
export function wybierzJezyk(tagi: readonly string[], dostepne: readonly Jezyk[]): Jezyk {
  for (const tag of tagi) {
    const j = jezykZTagu(tag);
    if (!j) continue;
    const trafienie = lancuchZastepczy(j).find((x) => x !== ZRODLO && dostepne.includes(x)) ?? (j === ZRODLO && dostepne.includes(ZRODLO) ? ZRODLO : null);
    if (trafienie) return trafienie;
  }
  return dostepne.includes(ZAPASOWY) ? ZAPASOWY : ZRODLO;
}
