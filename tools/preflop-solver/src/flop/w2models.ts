import type { Card } from '@szkola/poker-core';
import type { GameSpec } from './game';

/**
 * Modele gry W2 (`docs/decyzje/FB.md`): d1333 = model B5; kandydat = D-1333 + M1 + M3 (D-1335);
 * rake0 = D-1333 bez rake'u, wyłącznie pomiar ograniczający (D-1335, cel ma rake NL500).
 */
export type W2Model = 'd1333' | 'kandydat' | 'rake0';
export const W2_MODELS: readonly W2Model[] = ['d1333', 'kandydat', 'rake0'];

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
  const large = pair.srp ? 4.4 : mainSizeBb === 5.6 ? 14.4 : 14;
  const kandydat = model === 'kandydat';
  // M1: turn i river {33%, 75%} puli = rozmiary flopu z drzewa kanonu (`meta.postflop.highSprTree.sizes[0]`); D-1333: 66%
  const later = kandydat ? { betsPot: [0.33, 0.75] } : { betsPot: [0.66] };
  // reguła 12 GB z D-1335: tablice SRP kandydata przekroczyły 12 GB (OOM przy 13,9 GB, `dowody/d0-pamiec-oom.txt`), więc river bez przebicia (D-1400)
  const river = kandydat ? { ...later, noRaise: true } : later;
  // M3: w SRP BB może zagrać donk 1,4bb (mały rozmiar ze strony); porównanie w węźle otwierającego po czekaniu BB
  const donk = kandydat && pair.srp;
  const rake = model === 'rake0' ? { rakeRate: 0, rakeCap: 0 } : { rakeRate: 0.05, rakeCap: 3 };
  return {
    spec: {
      board,
      ranges,
      pot: pair.pot,
      stack: pair.stack,
      streets: [donk ? { betsBb: [mainSizeBb, large], oopLeadBb: [1.4] } : { betsBb: [mainSizeBb, large] }, later, river],
      raiseMult: 3,
      allinFrac: 2 / 3,
      ...rake,
      oopCheckedFirst: pair.srp && !donk,
    },
    path: donk ? ['x'] : [],
  };
}
