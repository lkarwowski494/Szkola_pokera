import type { Card } from '../src/cards';
import { rankOf, suitOf } from '../src/cards';

/**
 * Wolny, oczywisty evaluator wzorcowy do testów. Zwraca wektor porównawczy:
 * [kategoria (8 = poker … 0 = wysoka karta), …rangi rozstrzygające].
 */
function score5(cards: Card[]): number[] {
  const ranks = cards.map(rankOf).sort((a, b) => b - a);
  const flush = cards.every((c) => suitOf(c) === suitOf(cards[0]!));
  const uniq = [...new Set(ranks)];
  let straightHigh = -1;
  if (uniq.length === 5) {
    if (uniq[0]! - uniq[4]! === 4) straightHigh = uniq[0]!;
    else if (uniq.join(',') === '12,3,2,1,0') straightHigh = 3; // koło A-5
  }
  const counts = new Map<number, number>();
  for (const r of ranks) counts.set(r, (counts.get(r) ?? 0) + 1);
  const groups = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0]);
  const byGroup = groups.map(([r]) => r);
  const shape = groups.map(([, n]) => n).join('');
  if (straightHigh >= 0 && flush) return [8, straightHigh];
  if (shape === '41') return [7, ...byGroup];
  if (shape === '32') return [6, ...byGroup];
  if (flush) return [5, ...ranks];
  if (straightHigh >= 0) return [4, straightHigh];
  if (shape === '311') return [3, ...byGroup];
  if (shape === '221') return [2, ...byGroup];
  if (shape === '2111') return [1, ...byGroup];
  return [0, ...ranks];
}

function cmp(a: number[], b: number[]): number {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? -1) - (b[i] ?? -1);
    if (d !== 0) return d;
  }
  return 0;
}

export function referenceScore(cards: Card[]): number[] {
  let best: number[] | null = null;
  const n = cards.length;
  for (let a = 0; a < n; a++)
    for (let b = a + 1; b < n; b++)
      for (let c = b + 1; c < n; c++)
        for (let d = c + 1; d < n; d++)
          for (let e = d + 1; e < n; e++) {
            const s = score5([cards[a]!, cards[b]!, cards[c]!, cards[d]!, cards[e]!]);
            if (!best || cmp(s, best) > 0) best = s;
          }
  return best!;
}

/** 1 gdy a silniejsze, -1 gdy b, 0 remis. */
export function referenceCompare(a: Card[], b: Card[]): number {
  return Math.sign(cmp(referenceScore(a), referenceScore(b)));
}
