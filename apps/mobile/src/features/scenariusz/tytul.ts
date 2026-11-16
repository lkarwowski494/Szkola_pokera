/**
 * Wybór stylu tytułu startu scenariusza (HX, D-1730, D-1731; docs/design/scenariusz-i-ocena.md „Długi tytuł sytuacji”).
 * Długi tytuł (pierwsze zdanie sytuacji, D-1660) dostaje mniejszy styl `tytulDlugi`; próg zależy od szerokości ekranu i od wagi znaków,
 * a nie od `fontScale` (przy dużym tekście oba style mają ten sam sufit, `sufitTytulu`). Czyste funkcje, bez React Native.
 */

/** Ułamek szerokości treści (ekran − 2 × `odstep.l`), od którego tytuł jest „długi” (D-1730; pomiar 630 tytułów: ≤ 3 wiersze przy progu). */
export const PROG_TYTULU_DLUGIEGO = 0.19;
/** 2 × `odstep.l` (components/ui.tsx: pole ekranu): szerokość treści = szerokość ekranu − 32. */
const MARGINESY_POZIOME = 32;

export type StylTytuluSytuacji = 'tytul' | 'tytulDlugi';

/** CJK (U+2E80–U+9FFF, U+F900–U+FAFF), hangul (U+AC00–U+D7AF, U+1100–U+11FF), pełna szerokość i interpunkcja CJK (U+FF00–U+FFEF, U+3000–U+303F). */
const ZAKRESY_SZEROKIE: readonly (readonly [number, number])[] = [
  [0x2e80, 0x9fff],
  [0xf900, 0xfaff],
  [0xac00, 0xd7af],
  [0x1100, 0x11ff],
  [0xff00, 0xffef],
  [0x3000, 0x303f],
];

/** Długość ważona: 2 dla znaków szerokich (zajmują w wierszu około dwa razy więcej miejsca niż litera łacińska), 1 dla pozostałych; liczone po punktach kodowych. */
export function dlugoscWazona(s: string): number {
  let suma = 0;
  for (const znak of s) {
    const kod = znak.codePointAt(0) ?? 0;
    suma += ZAKRESY_SZEROKIE.some(([od, do_]) => kod >= od && kod <= do_) ? 2 : 1;
  }
  return suma;
}

/** `tytulDlugi`, gdy długość ważona > floor(0,19 × (szerokość ekranu − 32)): 320 → 54, 390 → 68, 430 → 75. */
export function stylTytuluSytuacji(tytul: string, szerokoscEkranu: number): StylTytuluSytuacji {
  return dlugoscWazona(tytul) > Math.floor(PROG_TYTULU_DLUGIEGO * (szerokoscEkranu - MARGINESY_POZIOME)) ? 'tytulDlugi' : 'tytul';
}
