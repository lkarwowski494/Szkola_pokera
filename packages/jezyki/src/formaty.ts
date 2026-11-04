import type { Jezyk } from './jezyki';

/** Tag przekazywany do `Intl`: kod języka aplikacji (serbski domyślnie cyrylicą, chiński tradycyjny z pismem). Region telefonu nie zmienia formatu (D-134: język aplikacji decyduje). */
export const znacznikIntl = (j: Jezyk): string => j;

/** Liczba wg języka: znak dziesiętny i grupowanie z `Intl.NumberFormat`. `miejsca` ustala maksymalną liczbę cyfr po przecinku. */
export function formatujLiczbe(n: number, j: Jezyk, opcje: { miejsca?: number } = {}): string {
  return new Intl.NumberFormat(znacznikIntl(j), opcje.miejsca === undefined ? {} : { maximumFractionDigits: opcje.miejsca }).format(n);
}

/** Ułamek jako procent wg języka (pl „50%”, de i fr „50 %”, tr „%50”). */
export function formatujProcent(ulamek: number, j: Jezyk, opcje: { miejsca?: number } = {}): string {
  return new Intl.NumberFormat(znacznikIntl(j), { style: 'percent', maximumFractionDigits: opcje.miejsca ?? 0 }).format(ulamek);
}

/** Data wg języka (długi zapis miesiąca). `timeZone` wymusza strefę (testy, eksport). */
export function formatujDate(d: Date, j: Jezyk, opcje: { timeZone?: string } = {}): string {
  return new Intl.DateTimeFormat(znacznikIntl(j), { year: 'numeric', month: 'long', day: 'numeric', ...opcje }).format(d);
}
