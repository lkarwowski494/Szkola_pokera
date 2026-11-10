import type { Jezyk } from './jezyki';

/**
 * Tag przekazywany do `Intl` (liczby, daty, liczba mnoga): kod języka aplikacji (serbski domyślnie cyrylicą, chiński tradycyjny
 * z pismem). Region telefonu nie zmienia formatu (D-134: język aplikacji decyduje). Wyjątek: „pt” w aplikacji to portugalski europejski, a CLDR „pt” bez regionu to
 * wariant brazylijski (plurals.xml: pt i = 0..1, pt_PT i = 1) — więc pt → pt-PT, jak Trening `lib/i18n.ts:28` (TAG pt: 'pt-PT',
 * odczyt 2026-11-10; D-405). Pozostałe kody bez zmian.
 */
export const znacznikIntl = (j: Jezyk): string => (j === 'pt' ? 'pt-PT' : j);

/** Liczba wg języka: znak dziesiętny i grupowanie z `Intl.NumberFormat`. `miejsca` = stała liczba cyfr po przecinku
 *  (minimum = maksimum; D-220, ADR 0014: „34,97%” ma tyle cyfr co wartość w treści, „35,00%” nie traci zer). */
export function formatujLiczbe(n: number, j: Jezyk, opcje: { miejsca?: number } = {}): string {
  return new Intl.NumberFormat(znacznikIntl(j), opcje.miejsca === undefined ? {} : { minimumFractionDigits: opcje.miejsca, maximumFractionDigits: opcje.miejsca }).format(n);
}

/** Ułamek jako procent wg języka (pl „50%”, de i fr „50 %”, tr „%50”); `miejsca` stałe jak w `formatujLiczbe` (domyślnie 0). */
export function formatujProcent(ulamek: number, j: Jezyk, opcje: { miejsca?: number } = {}): string {
  return new Intl.NumberFormat(znacznikIntl(j), { style: 'percent', minimumFractionDigits: opcje.miejsca ?? 0, maximumFractionDigits: opcje.miejsca ?? 0 }).format(ulamek);
}

/** Data wg języka (długi zapis miesiąca). `timeZone` wymusza strefę (testy, eksport). */
export function formatujDate(d: Date, j: Jezyk, opcje: { timeZone?: string } = {}): string {
  return new Intl.DateTimeFormat(znacznikIntl(j), { year: 'numeric', month: 'long', day: 'numeric', ...opcje }).format(d);
}
