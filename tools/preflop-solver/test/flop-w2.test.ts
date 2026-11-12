import { expect, it } from 'vitest';
import { parseCards } from '@szkola/poker-core';
import { classOfCombo, COMBO_C1, COMBO_C2, NC } from '../src/flop/combos';
import { w2Metrics } from '../src/flop/w2';

// Kryteria W2 (D-1332): ta sama waga po obu stronach = częstość preflop × kombinacje po usunięciu kart stołu.
const board = parseCards('Ks 7d 2c');
function root(bet: (cls: string) => number): { actions: string[]; freqs: Float64Array } {
  const f = new Float64Array(NC * 3);
  for (let i = 0; i < NC; i++) {
    if (board.includes(COMBO_C1[i]!) || board.includes(COMBO_C2[i]!)) continue;
    const b = bet(classOfCombo(i));
    f[i * 3] = 1 - b;
    f[i * 3 + 1] = b;
  }
  return { actions: ['x', 'b1.4', 'b4.4'], freqs: f };
}

it('W2: K1 i K2 z wagą preflop × kombinacje (KK: 3 kombinacje, AA: 6, 72o: 7 po usunięciu kart stołu)', () => {
  const hero = { AA: 1, KK: 1, '72o': 0.5, '32o': 0 };
  const page = { AA: { small: 1, large: 0, check: 0 }, KK: { small: 0, large: 0.5, check: 0.5 }, '72o': { small: 0, large: 0, check: 1 }, '32o': { small: 1, large: 0, check: 0 } };
  // nasz: AA zakład 1, KK 1, 72o 0,5
  const m = w2Metrics(board, hero, root((c) => (c === '72o' ? 0.5 : 1)), page);
  // wagi: AA 6, KK 3, 72o 0,5 × 7 = 3,5 (7s/7h/7c × 2s/2h/2d bez 7s2s i 7h2h); Σ = 12,5
  const W = 12.5;
  expect(m.oursBet).toBeCloseTo((6 * 1 + 3 * 1 + 3.5 * 0.5) / W, 10);
  expect(m.pageBet).toBeCloseTo((6 * 1 + 3 * 0.5 + 3.5 * 0) / W, 10);
  expect(m.k1).toBeCloseTo(Math.abs(m.oursBet - m.pageBet), 10);
  expect(m.k2).toBeCloseTo(1 - (6 * 0 + 3 * 0.5 + 3.5 * 0.5) / W, 10);
});
