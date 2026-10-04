import type { Card } from './cards';
import { dealCards, rankOf, suitOf } from './cards';
import type { Rng } from './rng';
import { pick } from './rng';

/**
 * Tekstura flopa (moduł M5). Czysta klasyfikacja faktów o trzech kartach; co z nią robić (c-bet, rozmiar),
 * mówią reguły w treści, nie silnik.
 *
 * Osie (decyzja tymczasowa, opisana w raporcie M5):
 * - height: najwyższa karta: A, K, Q → high; J, T → middle; 9 i niżej → low,
 * - suits: trzy różne kolory → rainbow; dwie karty w jednym kolorze → two-tone; trzy → monotone,
 * - ranks: para (lub trójka) na stole → paired; trzy różne rangi mieszczące się w pięciu kolejnych
 *   (strit możliwy już z dwiema kartami gracza, as liczy się też jako 1) → connected; inaczej → disconnected,
 * - wetness (pochodna): liczba „dróg do dobierania” = kolor (two-tone lub monotone) + strit (connected);
 *   0 → dry, 1 → medium, 2 → wet.
 */

export const FLOP_HEIGHTS = ['high', 'middle', 'low'] as const;
export const FLOP_SUITS = ['rainbow', 'two-tone', 'monotone'] as const;
export const FLOP_RANKS = ['paired', 'connected', 'disconnected'] as const;
export const FLOP_WETNESS = ['dry', 'medium', 'wet'] as const;

export type FlopHeight = (typeof FLOP_HEIGHTS)[number];
export type FlopSuits = (typeof FLOP_SUITS)[number];
export type FlopRanks = (typeof FLOP_RANKS)[number];
export type FlopWetness = (typeof FLOP_WETNESS)[number];

export const TEXTURE_AXES = ['height', 'suits', 'ranks', 'wetness'] as const;
export type TextureAxis = (typeof TEXTURE_AXES)[number];

export const TEXTURE_VALUES: { [A in TextureAxis]: readonly FlopTexture[A][] } = {
  height: FLOP_HEIGHTS,
  suits: FLOP_SUITS,
  ranks: FLOP_RANKS,
  wetness: FLOP_WETNESS,
};

export interface FlopTexture {
  height: FlopHeight;
  suits: FlopSuits;
  ranks: FlopRanks;
  wetness: FlopWetness;
  /** Ranga najwyższej karty (0 = 2 … 12 = A). */
  top: number;
  /** Trzy karty tej samej rangi. */
  trips: boolean;
  /** Strit możliwy z dwiema kartami gracza (na stole bez pary). */
  straightPossible: boolean;
}

/** Najniższa ranga flopu „wysokiego” (Q) i „średniego” (T). */
export const HIGH_MIN_RANK = 10;
export const MIDDLE_MIN_RANK = 8;

/** Czy trzy różne rangi mieszczą się w jednym oknie pięciu kolejnych rang (A także jako 1). */
export function fitsStraightWindow(ranks: readonly number[]): boolean {
  if (new Set(ranks).size !== ranks.length) return false;
  // pozycje w skali 1–14: as = 14 albo 1
  const variants = [ranks.map((r) => r + 2), ranks.map((r) => (r === 12 ? 1 : r + 2))];
  return variants.some((v) => Math.max(...v) - Math.min(...v) <= 4);
}

export function classifyFlop(flop: readonly Card[]): FlopTexture {
  if (flop.length !== 3) throw new Error('Flop to dokładnie 3 karty');
  if (new Set(flop).size !== 3) throw new Error('Powtórzona karta na flopie');
  const ranks = flop.map(rankOf);
  const top = Math.max(...ranks);
  const distinctSuits = new Set(flop.map(suitOf)).size;
  const distinctRanks = new Set(ranks).size;
  const height: FlopHeight = top >= HIGH_MIN_RANK ? 'high' : top >= MIDDLE_MIN_RANK ? 'middle' : 'low';
  const suits: FlopSuits = distinctSuits === 3 ? 'rainbow' : distinctSuits === 2 ? 'two-tone' : 'monotone';
  const straightPossible = distinctRanks === 3 && fitsStraightWindow(ranks);
  const rankShape: FlopRanks = distinctRanks < 3 ? 'paired' : straightPossible ? 'connected' : 'disconnected';
  const draws = (suits === 'rainbow' ? 0 : 1) + (rankShape === 'connected' ? 1 : 0);
  const wetness: FlopWetness = draws === 0 ? 'dry' : draws === 1 ? 'medium' : 'wet';
  return { height, suits, ranks: rankShape, wetness, top, trips: distinctRanks === 1, straightPossible };
}

/** Filtr tekstury: dla każdej osi lista dopuszczalnych wartości (brak osi = dowolna). */
export type TextureFilter = { [A in TextureAxis]?: readonly FlopTexture[A][] } & { trips?: boolean };

export function textureMatches(tex: FlopTexture, filter: TextureFilter): boolean {
  for (const axis of TEXTURE_AXES) {
    const allowed = filter[axis] as readonly string[] | undefined;
    if (allowed && !allowed.includes(tex[axis])) return false;
  }
  if (filter.trips !== undefined && filter.trips !== tex.trips) return false;
  return true;
}

export interface FlopSpot {
  flop: Card[];
  texture: FlopTexture;
}

const MAX_TRIES = 20000;

/** Losowy flop spełniający filtr. Rzuca błąd, gdy filtr jest niespełnialny (np. monotone + paired). */
export function generateFlop(rng: Rng, filter: TextureFilter = {}): FlopSpot {
  for (let i = 0; i < MAX_TRIES; i++) {
    const flop = dealCards(rng, 3).sort((a, b) => b - a);
    const texture = classifyFlop(flop);
    if (textureMatches(texture, filter)) return { flop, texture };
  }
  throw new Error('Generator nie znalazł flopu o podanej teksturze');
}

/**
 * Flop do ćwiczenia klasyfikacji: najpierw losujemy wartość jednej z pytanych osi (równo), potem flop z tą wartością,
 * żeby rzadkie tekstury (monotoniczny, sparowany) pojawiały się często, a nie w kilku procentach zadań.
 */
export function generateTextureSpot(rng: Rng, axes: readonly TextureAxis[] = TEXTURE_AXES): FlopSpot {
  const axis = pick(rng, axes.length ? axes : TEXTURE_AXES);
  const value = pick(rng, TEXTURE_VALUES[axis] as readonly string[]);
  return generateFlop(rng, { [axis]: [value] } as TextureFilter);
}
