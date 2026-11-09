import { renderTermsIn, termText, type TermInfo, type TermNames } from '@szkola/content-schema';
import { jestJezykiem, lancuchTresci, ZAPASOWY, ZRODLO } from '@szkola/jezyki';
import { TERM_NAMES, TERMS, type AppTerm, type TermKey } from '@/data/content/terms.generated';

/**
 * Terminy PL ↔ EN w tekstach aplikacji: to samo źródło (content/terms.yaml → terms.generated.ts) i ten sam znacznik
 * {{t:klucz|forma}} co w treści. Jeden wywołany tekst = jedna jednostka: nazwa angielska przy pierwszym użyciu terminu.
 * Język tekstu decyduje o sposobie (D-287): po polsku „forma (en)”, w innym języku forma, nazwa w tym języku (K-05,
 * `TERM_NAMES` z content/<język>/terms-nazwy.yaml) albo sama nazwa angielska.
 */

const lookup = (k: string): TermInfo | undefined => (TERMS as Record<string, AppTerm>)[k];

/** Nazwy terminów dla tekstu w języku `jezyk`: wariant → język bazowy; en i pl nie mają nazw (D-287, T-01). */
export function nazwyTerminow(jezyk: string, nazwy: typeof TERM_NAMES = TERM_NAMES): TermNames | undefined {
  if (!jestJezykiem(jezyk)) return undefined;
  for (const j of lancuchTresci(jezyk)) {
    if (j === ZAPASOWY || j === ZRODLO) return undefined;
    if (nazwy[j]) return nazwy[j];
  }
  return undefined;
}

/** Podstawia znaczniki {{t:…}} w jednym tekście w języku `jezyk` (domyślnie polski). Nieznany klucz rzuca błąd (łapią go testy). */
export function tr(text: string, jezyk = 'pl', nazwy: typeof TERM_NAMES = TERM_NAMES): string {
  return renderTermsIn(jezyk, text, lookup, 'tekst aplikacji', new Set(), undefined, nazwyTerminow(jezyk, nazwy));
}

/** Pojedynczy termin z nazwą angielską: term('flush', 'koloru') → „koloru (flush)”. */
export function term(key: TermKey, form?: string): string {
  return termText(TERMS[key] as TermInfo, form ?? TERMS[key].pl);
}

/** Polska nazwa terminu z terms.yaml (mianownik), bez nawiasu. */
export function termPl(key: TermKey): string {
  return TERMS[key].pl;
}

/** Podstawia znaczniki we wszystkich napisach obiektu (słownik języka `jezyk` przed przekazaniem do i18next). */
export function trDeep<T>(v: T, jezyk = 'pl'): T {
  if (typeof v === 'string') return tr(v, jezyk) as T;
  if (Array.isArray(v)) return v.map((x) => trDeep(x, jezyk)) as T;
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, trDeep(x, jezyk)])) as T;
  return v;
}
