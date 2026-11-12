import type { Card } from '@szkola/poker-core';
import type { GameSpec } from './game';

/** Model gry W2 (`docs/decyzje/FB.md`): D-1333. */
export type W2Model = 'd1333';
export const W2_MODELS: readonly W2Model[] = ['d1333'];

/** Pula i stack pary pozycji (D-1333); srp: BB broni się sprawdzeniem i czeka na flopie, decyzję na stronie podejmuje otwierający. */
export interface W2Pot {
  readonly pot: number;
  readonly stack: number;
  readonly srp: boolean;
}

/** Gra stołu W2 i ścieżka do węzła porównywanego ze stroną (decyzja c-betu). */
export interface W2Game {
  readonly spec: GameSpec;
  readonly path: readonly string[];
}

/**
 * Specyfikacja gry stołu W2 w danym modelu. mainSizeBb: mały rozmiar flopu ze strony; większy z `w2-cel.md`
 * (SRP 4,4bb; 3BP 14bb, SB 14,4bb przy małym 5,6bb).
 */
export function w2Game(
  model: W2Model,
  pair: W2Pot,
  board: readonly Card[],
  ranges: readonly [Float64Array, Float64Array],
  mainSizeBb: number,
): W2Game {
  void model;
  const large = pair.srp ? 4.4 : mainSizeBb === 5.6 ? 14.4 : 14;
  return {
    spec: {
      board,
      ranges,
      pot: pair.pot,
      stack: pair.stack,
      streets: [{ betsBb: [mainSizeBb, large] }, { betsPot: [0.66] }, { betsPot: [0.66] }],
      raiseMult: 3,
      allinFrac: 2 / 3,
      rakeRate: 0.05,
      rakeCap: 3,
      oopCheckedFirst: pair.srp,
    },
    path: [],
  };
}
