import type { Card } from './cards';
import { dealCards, rankOf, suitOf } from './cards';
import type { Rng } from './rng';
import { pick } from './rng';

/**
 * Tekstura flopa (moduł M5). Czysta klasyfikacja faktów o trzech kartach; co z nią robić (c-bet, rozmiar),
 * mówią reguły w treści, nie silnik.
 *
 * Osie (decyzja właściciela po audycie 4.10.2026, K4):
 * - height: najwyższa karta: A, K, Q → high; J, T → middle; 9 i niżej → low,
 * - suits: trzy różne kolory → rainbow; dwie karty w jednym kolorze → two-tone; trzy → monotone,
 * - ranks: para (lub trójka) na stole → paired; trzy różne rangi w jednym oknie pięciu kolejnych rang
 *   (strit możliwy już z dwiema kartami gracza) → connected; dwie różne rangi w takim oknie (ktoś może mieć
 *   dobieranie do strita: otwarte albo gutshot) → semi-connected; inaczej → disconnected. As liczy się też jako 1,
 * - wetness (pochodna): suma punktów za strita i za kolory (WETNESS_POINTS), progi w WETNESS_THRESHOLDS. Punkty za
 *   strita zależą od liczby okien pięciu kolejnych rang, w których mieszczą się wszystkie trzy karty (decyzja D-39).
 *
 * Wszystkie wagi i progi są tylko tutaj; treść (lekcje M5) opisuje je słowami.
 */

export const FLOP_HEIGHTS = ['high', 'middle', 'low'] as const;
export const FLOP_SUITS = ['rainbow', 'two-tone', 'monotone'] as const;
export const FLOP_RANKS = ['paired', 'connected', 'semi-connected', 'disconnected'] as const;
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

/**
 * Co flop daje w stritach: strit możliwy w co najmniej dwóch oknach pięciu rang (`made`, np. 987, QJT, 986), strit
 * możliwy w dokładnie jednym oknie (`made-one`, np. AKT, A42, T86), tylko dobieranie do strita albo nic.
 */
export type FlopStraightPotential = 'made' | 'made-one' | 'draw' | 'none';

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
  /** W ilu oknach pięciu kolejnych rang mieszczą się wszystkie trzy karty (0–3); tyle par rang daje strita. */
  straightWindows: number;
  /** Co flop daje w stritach (do punktów mokrości). */
  straight: FlopStraightPotential;
  /** Któraś ręka może mieć dobieranie do strita (otwarte albo gutshot); także na flopie sparowanym, np. JJT. */
  straightDrawPossible: boolean;
  /** Punkty mokrości (WETNESS_POINTS), z których wynika wetness. */
  wetnessPoints: number;
}

/** Najniższa ranga flopu „wysokiego” (Q) i „średniego” (T). */
export const HIGH_MIN_RANK = 10;
export const MIDDLE_MIN_RANK = 8;

/** Długość strita: tyle kolejnych rang tworzy jedno okno. */
export const STRAIGHT_LENGTH = 5;

/**
 * Punkty mokrości (jedno źródło prawdy dla aplikacji i testów). Decyzja D-39 (dokument 12 M4–M6, raport 12a-22).
 * - Strit: strit możliwy w co najmniej dwóch oknach pięciu rang („bardzo połączony”, np. 987, QJT, 986) 3; w dokładnie
 *   jednym oknie (np. AKT, A42, T86, KQ9) 2; tylko dobieranie do strita (półpołączony albo sparowany z dwiema rangami
 *   w jednym oknie, np. JJT) 1; nic 0. Na 987r strita daje 48 kombinacji i jest 324 z otwartym dobieraniem, na AKTr
 *   i A42r 16 i 0, dlatego jedno okno waży mniej.
 * - Kolory: tęczowy 0, dwukolorowy 1 (K♥7♥2♣ zostaje suchy), monotoniczny 3 (zawsze mokry; było 2).
 */
export const WETNESS_POINTS = {
  straight: { made: 3, 'made-one': 2, draw: 1, none: 0 } as const satisfies Record<FlopStraightPotential, number>,
  suits: { rainbow: 0, 'two-tone': 1, monotone: 3 } as const satisfies Record<FlopSuits, number>,
};

/** Progi mokrości: poniżej `medium` suchy (0–1), od `medium` pośredni (2), od `wet` mokry (3 i więcej). */
export const WETNESS_THRESHOLDS = { medium: 2, wet: 3 } as const;

export function wetnessFromPoints(points: number): FlopWetness {
  return points >= WETNESS_THRESHOLDS.wet ? 'wet' : points >= WETNESS_THRESHOLDS.medium ? 'medium' : 'dry';
}

/** Pozycje rangi w skali 1–14 (as = 14 albo 1). */
function positions(rank: number): number[] {
  return rank === 12 ? [14, 1] : [rank + 2];
}

/**
 * W ilu oknach pięciu kolejnych rang [lo, lo+4], lo = 1…10, mieszczą się wszystkie (różne) rangi (A także jako 1).
 * Dla trzech rang flopu to liczba par rang, które dają strita (987: 3, 986: 2, AKT, A42, T86: 1).
 */
export function straightWindowCount(ranks: readonly number[]): number {
  if (new Set(ranks).size !== ranks.length) return 0;
  let count = 0;
  for (let low = 1; low + STRAIGHT_LENGTH - 1 <= 14; low++) {
    const high = low + STRAIGHT_LENGTH - 1;
    if (ranks.every((r) => positions(r).some((p) => p >= low && p <= high))) count++;
  }
  return count;
}

/** Czy wszystkie (różne) rangi mieszczą się w jednym oknie pięciu kolejnych rang (A także jako 1). */
export function fitsStraightWindow(ranks: readonly number[]): boolean {
  return straightWindowCount(ranks) > 0;
}

/**
 * Czy jakieś dwie różne rangi flopu mieszczą się w jednym oknie pięciu kolejnych rang. Dokładnie wtedy istnieje ręka
 * z dobieraniem do strita: gracz dokłada dwie brakujące rangi okna i ma cztery z pięciu (test wyczerpujący w texture.test.ts).
 */
export function hasStraightDrawPair(ranks: readonly number[]): boolean {
  const distinct = [...new Set(ranks)];
  for (let i = 0; i < distinct.length; i++) {
    for (let j = i + 1; j < distinct.length; j++) if (fitsStraightWindow([distinct[i]!, distinct[j]!])) return true;
  }
  return false;
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
  const straightWindows = distinctRanks === 3 ? straightWindowCount(ranks) : 0;
  const straightPossible = straightWindows > 0;
  const straightDrawPossible = hasStraightDrawPair(ranks);
  const rankShape: FlopRanks =
    distinctRanks < 3 ? 'paired' : straightPossible ? 'connected' : straightDrawPossible ? 'semi-connected' : 'disconnected';
  const straight: FlopStraightPotential =
    straightWindows >= 2 ? 'made' : straightPossible ? 'made-one' : straightDrawPossible ? 'draw' : 'none';
  const wetnessPoints = WETNESS_POINTS.straight[straight] + WETNESS_POINTS.suits[suits];
  return {
    height,
    suits,
    ranks: rankShape,
    wetness: wetnessFromPoints(wetnessPoints),
    top,
    trips: distinctRanks === 1,
    straightPossible,
    straightWindows,
    straight,
    straightDrawPossible,
    wetnessPoints,
  };
}

/** Liczba różnych flopów: C(52,3). */
export const FLOP_COUNT = 22100;

let shares: Record<FlopWetness, number> | undefined;

/** Odsetek wszystkich {@link FLOP_COUNT} flopów suchych, pośrednich i mokrych według classifyFlop (wynik definicji aplikacji). */
export function flopWetnessShares(): Record<FlopWetness, number> {
  if (shares) return shares;
  const counts: Record<FlopWetness, number> = { dry: 0, medium: 0, wet: 0 };
  for (let a = 0; a < 52; a++)
    for (let b = a + 1; b < 52; b++) for (let c = b + 1; c < 52; c++) counts[classifyFlop([a, b, c]).wetness]++;
  shares = { dry: counts.dry / FLOP_COUNT, medium: counts.medium / FLOP_COUNT, wet: counts.wet / FLOP_COUNT };
  return shares;
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
 * żeby rzadkie tekstury (monotoniczny, sparowany, rozłączony) pojawiały się często, a nie w kilku procentach zadań.
 */
export function generateTextureSpot(rng: Rng, axes: readonly TextureAxis[] = TEXTURE_AXES): FlopSpot {
  const axis = pick(rng, axes.length ? axes : TEXTURE_AXES);
  const value = pick(rng, TEXTURE_VALUES[axis] as readonly string[]);
  return generateFlop(rng, { [axis]: [value] } as TextureFilter);
}
