import type { Card } from '@szkola/poker-core';
import { classOfCombo, COMBO_C1, COMBO_C2, NC } from './combos';

/** Wynik porównania jednego stołu z siatką BeyondGTO według kryteriów W2 (D-1332, `docs/solver/w2-cel.md`). */
export interface W2Metrics {
  /** |łączny zakład nasz − strona| przy tej samej wadze (K1, próg ≤ 0,05). */
  readonly k1: number;
  /** 1 − Σ w·|b_nasz − b_strona| ÷ Σ w (K2, próg ≥ 0,85). */
  readonly k2: number;
  readonly oursBet: number;
  readonly pageBet: number;
}

/**
 * Metryki W2. heroWeights: częstość preflop gracza decydującego w korzeniu (siatka BeyondGTO);
 * root: średnia strategia w korzeniu (etykiety akcji, częstości [kombinacja × akcja]); zakład = akcje „b…”;
 * page: klasy ze strony (small, large, check). Waga klasy = częstość preflop × kombinacje bez kart stołu,
 * b_nasz klasy = średnia po tych kombinacjach.
 */
export function w2Metrics(
  board: readonly Card[],
  heroWeights: Readonly<Record<string, number>>,
  root: { readonly actions: readonly string[]; readonly freqs: ArrayLike<number> },
  page: Readonly<Record<string, Readonly<Record<string, number>>>>,
): W2Metrics {
  const nA = root.actions.length;
  const betIdx = root.actions.flatMap((a, i) => (a.startsWith('b') ? [i] : []));
  const sumBet = new Map<string, number>();
  const count = new Map<string, number>();
  for (let i = 0; i < NC; i++) {
    if (board.includes(COMBO_C1[i]!) || board.includes(COMBO_C2[i]!)) continue;
    const c = classOfCombo(i);
    let b = 0;
    for (const a of betIdx) b += root.freqs[i * nA + a]!;
    sumBet.set(c, (sumBet.get(c) ?? 0) + b);
    count.set(c, (count.get(c) ?? 0) + 1);
  }
  let W = 0;
  let ours = 0;
  let pg = 0;
  let diff = 0;
  for (const [c, n] of count) {
    const w = (heroWeights[c] ?? 0) * n;
    if (w <= 0) continue;
    const p = page[c];
    if (!p) throw new Error(`W2: strona nie ma klasy ${c}`);
    const bo = sumBet.get(c)! / n;
    const bp = (p.small ?? 0) + (p.large ?? 0);
    W += w;
    ours += w * bo;
    pg += w * bp;
    diff += w * Math.abs(bo - bp);
  }
  if (W <= 0) throw new Error('W2: pusty zakres gracza');
  return { k1: Math.abs(ours - pg) / W, k2: 1 - diff / W, oursBet: ours / W, pageBet: pg / W };
}
