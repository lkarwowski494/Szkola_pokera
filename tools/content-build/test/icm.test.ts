import { describe, expect, it } from 'vitest';
import { icmEquities } from '@szkola/poker-core';
import { resolveNumbers } from '../src/numbers';

/** Niezależne odniesienie: pełne wyliczenie wszystkich kolejności miejsc z prawdopodobieństwem Harville'a. */
function bruteForce(stacks: number[], payouts: number[]): number[] {
  const out = stacks.map(() => 0);
  const perms = (xs: number[]): number[][] => (xs.length <= 1 ? [xs] : xs.flatMap((x) => perms(xs.filter((y) => y !== x)).map((p) => [x, ...p])));
  for (const order of perms(stacks.map((_, i) => i))) {
    let p = 1;
    let left = stacks.reduce((a, b) => a + b, 0);
    for (const i of order) {
      p *= stacks[i]! / left;
      left -= stacks[i]!;
    }
    order.forEach((i, place) => (out[i]! += p * (payouts[place] ?? 0)));
  }
  return out;
}

describe('ICM Malmutha-Harville’a (M11)', () => {
  it('przykład z lekcji m11.l3 policzony ręcznie: 4500/3500/2000, wypłaty 60/40', () => {
    const [a, b, c] = icmEquities([4500, 3500, 2000], [0.6, 0.4]);
    // krótki stack: 0,6·0,2 + 0,4·(0,45·2000/5500 + 0,35·2000/6500)
    expect(c).toBeCloseTo(0.6 * 0.2 + 0.4 * (0.45 * (2000 / 5500) + 0.35 * (2000 / 6500)), 12);
    expect(a! + b! + c!).toBeCloseTo(1, 12);
  });
  it('zgadza się z pełnym wyliczeniem permutacji', () => {
    for (const [s, p] of [
      [[4000, 3000, 2000, 1000], [0.5, 0.3, 0.2]],
      [[7, 1, 1, 1, 5], [0.4, 0.3, 0.2, 0.1]],
      [[10, 10], [1]],
    ] as [number[], number[]][]) {
      const got = icmEquities(s, p);
      bruteForce(s, p).forEach((v, i) => expect(got[i]).toBeCloseTo(v, 12));
    }
  });
  it('gracz bez żetonów ma zero, a gracz z wszystkimi żetonami całą pulę wypłat', () => {
    expect(icmEquities([0, 10, 10], [0.6, 0.4])[0]).toBe(0);
    expect(icmEquities([30, 0, 0], [0.5, 0.3, 0.2])[0]).toBeCloseTo(0.5, 12);
  });
  it('formuła icm w numbers.yaml: refs = stacki i wypłaty, args = [gracze, indeks]', () => {
    const n = resolveNumbers({
      s1: { value: 4500, unit: 'count', decimals: 0, source: 'test' },
      s2: { value: 3500, unit: 'count', decimals: 0, source: 'test' },
      s3: { value: 2000, unit: 'count', decimals: 0, source: 'test' },
      p1: { value: 0.6, unit: 'percent', decimals: 0, source: 'test' },
      p2: { value: 0.4, unit: 'percent', decimals: 0, source: 'test' },
      eq: { formula: 'icm', refs: ['s1', 's2', 's3', 'p1', 'p2'], args: [3, 2], unit: 'percent', decimals: 1, source: 'test' },
    });
    expect(n.get('eq')!.display).toBe('22,9%');
    expect(() => resolveNumbers({ x: { formula: 'icm', refs: [], args: [3, 0], unit: 'percent', decimals: 0, source: 'test' } })).toThrow(/icm/);
  });
});
