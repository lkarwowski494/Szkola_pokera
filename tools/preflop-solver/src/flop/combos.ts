import { parseCard, type Card } from '@szkola/poker-core';

/**
 * 1326 kombinacji rąk startowych w stałej kolejności: (c1, c2), c1 < c2, karty jak w poker-core (ranga·4 + kolor).
 * Indeks kombinacji jest wspólny dla wszystkich modułów `src/flop/` i dla kodu C (B4).
 */
export const NC = 1326;
export const COMBO_C1 = new Uint8Array(NC);
export const COMBO_C2 = new Uint8Array(NC);
const INDEX = new Int16Array(52 * 52).fill(-1);
{
  let i = 0;
  for (let a = 0; a < 52; a++)
    for (let b = a + 1; b < 52; b++) {
      COMBO_C1[i] = a;
      COMBO_C2[i] = b;
      INDEX[a * 52 + b] = i;
      INDEX[b * 52 + a] = i;
      i++;
    }
}

export function comboIndex(a: Card, b: Card): number {
  const i = INDEX[a * 52 + b]!;
  if (i < 0) throw new Error(`Nieprawidłowa kombinacja: ${a}, ${b}`);
  return i;
}

const RANKS = '23456789TJQKA';
/** Klasa ręki kombinacji w zapisie siatki 13×13 („AKs”, „QJo”, „77”). */
export function classOfCombo(i: number): string {
  const a = COMBO_C1[i]!;
  const b = COMBO_C2[i]!;
  const ra = a >> 2;
  const rb = b >> 2;
  const hi = Math.max(ra, rb);
  const lo = Math.min(ra, rb);
  if (hi === lo) return RANKS[hi]! + RANKS[lo]!;
  return RANKS[hi]! + RANKS[lo]! + ((a & 3) === (b & 3) ? 's' : 'o');
}

/** Zakres jako wektor wag 1326 z wag klas (brak klasy = 0); kombinacje z kartami stołu dostają 0. */
export function rangeFromClasses(weights: Readonly<Record<string, number>>, board: readonly Card[]): Float64Array {
  const out = new Float64Array(NC);
  for (let i = 0; i < NC; i++) {
    if (board.includes(COMBO_C1[i]!) || board.includes(COMBO_C2[i]!)) continue;
    out[i] = weights[classOfCombo(i)] ?? 0;
  }
  return out;
}

/** Zakres z listy konkretnych kombinacji („KhKd”), waga 1. */
export function rangeFromCombos(list: readonly string[]): Float64Array {
  const out = new Float64Array(NC);
  for (const s of list) out[comboIndex(parseCard(s.slice(0, 2)), parseCard(s.slice(2, 4)))] = 1;
  return out;
}
