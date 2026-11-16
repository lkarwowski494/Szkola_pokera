import { blindBb } from '@szkola/poker-core';
import { KOLEJNOSC } from '@/features/stol/uklad';
import type { Position } from '@/features/drills/types';

/**
 * Limperzy przed graczem w punkcie size-spot z `check: iso-size` (HX, SC-09; D-1734, D-1736, D-1800; docs/design/scenariusz-i-ocena.md
 * „Limperzy na stole i w dzienniku”). Czyste funkcje, bez React Native. Reguła: limperami są OSTATNIE `limpers` miejsc przed graczem w kolejności akcji
 * przed flopem (UTG, HJ, CO, BTN, SB; BB nigdy nie jest przed graczem), wcześniejsze miejsca spasowały. Stół 6-osobowy (jedyny z układem miejsc,
 * `uklad.ts`); inna pozycja albo liczba limperów spoza 1…liczby miejsc przed graczem daje null, bez zgadywania układu.
 */
export interface WpisPrzedGraczem {
  readonly pozycja: Position;
  readonly akcja: 'pas' | 'limp';
  /** Wpłata w bb: limp = 1 bb pomniejszone o blind miejsca (SB 0,5 bb), pas 0. */
  readonly kwotaBb: number;
}

/** Blindy w puli przed akcją: SB 0,5 + BB 1. */
const BLINDY_BB = 1.5;

/** Miejsca przed graczem w kolejności akcji z akcją każdego (UTG → ostatnie miejsce przed graczem), albo null przy złych danych. */
export function przedGraczem(hero: string, limpers: number): WpisPrzedGraczem[] | null {
  const indeks = (KOLEJNOSC as readonly string[]).indexOf(hero);
  if (indeks <= 0 || !Number.isInteger(limpers) || limpers < 1 || limpers > indeks) return null;
  return KOLEJNOSC.slice(0, indeks).map((pozycja, i) => {
    const limp = i >= indeks - limpers;
    return { pozycja, akcja: limp ? 'limp' : 'pas', kwotaBb: limp ? 1 - blindBb(pozycja) : 0 };
  });
}

/** Pula przed decyzją gracza: blindy 1,5 bb plus wpłaty limperów (SB dopłaca 0,5 bb); null przy złym układzie. */
export function pulaPrzedDecyzjaBb(hero: string, limpers: number): number | null {
  const wpisy = przedGraczem(hero, limpers);
  return wpisy === null ? null : BLINDY_BB + wpisy.reduce((suma, w) => suma + w.kwotaBb, 0);
}

/** Przebieg w zapisie `ukladStolu` („UTG:fold,HJ:limp”): miejsca przed graczem; po graczu miejsca „czekają”. Null przy złym układzie. */
export function przebiegLimperow(hero: string, limpers: number): string | null {
  const wpisy = przedGraczem(hero, limpers);
  return wpisy === null ? null : wpisy.map((w) => `${w.pozycja}:${w.akcja === 'pas' ? 'fold' : 'limp'}`).join(',');
}
