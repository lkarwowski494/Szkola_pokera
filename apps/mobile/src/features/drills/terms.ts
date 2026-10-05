import { renderTerms, termText, type TermInfo } from '@szkola/content-schema';
import { TERMS, type AppTerm, type TermKey } from '@/data/content/terms.generated';

/**
 * Terminy PL ↔ EN w tekstach aplikacji: to samo źródło (content/terms.yaml → terms.generated.ts) i ten sam znacznik
 * {{t:klucz|forma}} co w treści. Jeden wywołany tekst = jedna jednostka: nazwa angielska przy pierwszym użyciu terminu.
 */

const lookup = (k: string): TermInfo | undefined => (TERMS as Record<string, AppTerm>)[k];

/** Podstawia znaczniki {{t:…}} w jednym tekście. Nieznany klucz rzuca błąd (łapią go testy). */
export function tr(text: string): string {
  return renderTerms(text, lookup, 'tekst aplikacji');
}

/** Pojedynczy termin z nazwą angielską: term('flush', 'koloru') → „koloru (flush)”. */
export function term(key: TermKey, form?: string): string {
  return termText(TERMS[key] as TermInfo, form ?? TERMS[key].pl);
}

/** Polska nazwa terminu z terms.yaml (mianownik), bez nawiasu. */
export function termPl(key: TermKey): string {
  return TERMS[key].pl;
}

/** Podstawia znaczniki we wszystkich napisach obiektu (teksty interfejsu przed przekazaniem do i18next). */
export function trDeep<T>(v: T): T {
  if (typeof v === 'string') return tr(v) as T;
  if (Array.isArray(v)) return v.map(trDeep) as T;
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, trDeep(x)])) as T;
  return v;
}

/**
 * Owija obiekt tekstów: każdy napis i wynik każdej funkcji przechodzi przez tr(). Funkcje i stałe w środku mogą
 * składać teksty ze znacznikami, a nawias z nazwą angielską powstaje dopiero w gotowym tekście (jedna jednostka).
 */
export function trAll<T>(v: T): T {
  if (typeof v === 'string') return tr(v) as T;
  if (typeof v === 'function') return ((...a: unknown[]) => trAll((v as (...x: unknown[]) => unknown)(...a))) as T;
  if (Array.isArray(v)) return v.map(trAll) as T;
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, trAll(x)])) as T;
  return v;
}
