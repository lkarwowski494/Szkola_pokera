import type { Card } from './cards';
import { assertUnique, remainingDeck } from './cards';
import { strengthUnchecked } from './evaluate';
import type { Rng } from './rng';
import { randInt } from './rng';

export interface EquityResult {
  /** Udział w puli każdego gracza (remisy dzielone), suma = 1. */
  equity: number[];
  /** Odsetek wygranych bez remisu. */
  win: number[];
  /** Odsetek rozdań zakończonych podziałem puli (z udziałem gracza). */
  tie: number[];
  /** Liczba przeliczonych rozkładów stołu. */
  samples: number;
  exact: boolean;
}

export interface EquityOptions {
  /** Liczba prób Monte Carlo, gdy pełne przeliczenie byłoby za drogie. */
  iterations?: number;
  /** Maksymalna liczba rozkładów, przy której liczymy dokładnie. */
  exactLimit?: number;
  rng?: Rng;
  dead?: readonly Card[];
}

function nCk(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}

/**
 * Equity kilku znanych rąk przy częściowym lub pustym stole.
 * Liczy dokładnie, gdy liczba rozkładów ≤ exactLimit, w przeciwnym razie Monte Carlo.
 */
export function handEquity(hands: readonly (readonly Card[])[], board: readonly Card[] = [], opts: EquityOptions = {}): EquityResult {
  if (hands.length < 2) throw new Error('Equity wymaga co najmniej dwóch rąk');
  if (board.length > 5) throw new Error('Stół ma maksymalnie 5 kart');
  const all = [...hands.flat(), ...board, ...(opts.dead ?? [])];
  assertUnique(all);
  for (const h of hands) if (h.length !== 2) throw new Error('Ręka w Hold\'em ma 2 karty');

  const deck = remainingDeck(all);
  const missing = 5 - board.length;
  const n = hands.length;
  const shares = new Array<number>(n).fill(0);
  const wins = new Array<number>(n).fill(0);
  const ties = new Array<number>(n).fill(0);
  const handBufs = hands.map((h) => [h[0]!, h[1]!, ...board, ...new Array<number>(missing).fill(0)]);
  const strengths = new Array<number>(n).fill(0);

  const score = (runout: readonly number[]) => {
    for (let p = 0; p < n; p++) {
      const buf = handBufs[p]!;
      for (let i = 0; i < missing; i++) buf[2 + board.length + i] = runout[i]!;
      strengths[p] = strengthUnchecked(buf);
    }
    let best = Infinity;
    for (let p = 0; p < n; p++) if (strengths[p]! < best) best = strengths[p]!;
    let winners = 0;
    for (let p = 0; p < n; p++) if (strengths[p] === best) winners++;
    for (let p = 0; p < n; p++) {
      if (strengths[p] !== best) continue;
      shares[p]! += 1 / winners;
      if (winners === 1) wins[p]! += 1;
      else ties[p]! += 1;
    }
  };

  const total = nCk(deck.length, missing);
  const exactLimit = opts.exactLimit ?? 2_000_000;
  let samples = 0;
  let exact = false;

  if (missing === 0) {
    score([]);
    samples = 1;
    exact = true;
  } else if (total <= exactLimit) {
    exact = true;
    const idx = Array.from({ length: missing }, (_, i) => i);
    const runout = new Array<number>(missing);
    for (;;) {
      for (let i = 0; i < missing; i++) runout[i] = deck[idx[i]!]!;
      score(runout);
      samples++;
      let i = missing - 1;
      while (i >= 0 && idx[i] === deck.length - missing + i) i--;
      if (i < 0) break;
      idx[i]!++;
      for (let j = i + 1; j < missing; j++) idx[j] = idx[j - 1]! + 1;
    }
  } else {
    const rng = opts.rng;
    if (!rng) throw new Error('Monte Carlo wymaga generatora losowego (rng)');
    const iterations = opts.iterations ?? 20_000;
    const pool = deck.slice();
    const runout = new Array<number>(missing);
    for (let it = 0; it < iterations; it++) {
      // częściowe tasowanie: losujemy `missing` kart bez powtórzeń
      for (let i = 0; i < missing; i++) {
        const j = i + randInt(rng, pool.length - i);
        const tmp = pool[i]!;
        pool[i] = pool[j]!;
        pool[j] = tmp;
        runout[i] = pool[i]!;
      }
      score(runout);
    }
    samples = iterations;
  }
  return {
    equity: shares.map((s) => s / samples),
    win: wins.map((w) => w / samples),
    tie: ties.map((t) => t / samples),
    samples,
    exact,
  };
}
