import { evaluate as evalCodes } from '@pokertools/evaluator';
import type { Card } from './cards';
import { assertUnique, rankOf } from './cards';

/**
 * Kategorie układów od najsilniejszego. Wartości liczbowe są stabilnym kontraktem
 * dla treści i bazy danych (nie zmieniać kolejności).
 */
export const HandCategory = {
  StraightFlush: 0,
  FourOfAKind: 1,
  FullHouse: 2,
  Flush: 3,
  Straight: 4,
  ThreeOfAKind: 5,
  TwoPair: 6,
  OnePair: 7,
  HighCard: 8,
} as const;
export type HandCategory = (typeof HandCategory)[keyof typeof HandCategory];

/**
 * Siła ręki: im NIŻSZA liczba, tym silniejszy układ (1 = poker królewski, 7462 = najsłabsza wysoka karta).
 * Progi kategorii pochodzą z algorytmu doskonałego haszowania (Cactus Kev / PokerHandEvaluator).
 */
export type Strength = number;

const CATEGORY_UPPER_BOUNDS: readonly [number, HandCategory][] = [
  [10, HandCategory.StraightFlush],
  [166, HandCategory.FourOfAKind],
  [322, HandCategory.FullHouse],
  [1599, HandCategory.Flush],
  [1609, HandCategory.Straight],
  [2467, HandCategory.ThreeOfAKind],
  [3325, HandCategory.TwoPair],
  [6185, HandCategory.OnePair],
  [7462, HandCategory.HighCard],
];

export function categoryOf(strength: Strength): HandCategory {
  for (const [bound, cat] of CATEGORY_UPPER_BOUNDS) if (strength <= bound) return cat;
  throw new Error(`Nieprawidłowa siła ręki: ${strength}`);
}

/** Ocena 5–7 kart. Bez walidacji, do gorących pętli (Monte Carlo). */
export function strengthUnchecked(cards: Card[]): Strength {
  return evalCodes(cards);
}

/** Ocena 5–7 kart z walidacją wejścia. */
export function strength(cards: readonly Card[]): Strength {
  if (cards.length < 5 || cards.length > 7) throw new Error(`Ocena wymaga 5–7 kart, podano ${cards.length}`);
  assertUnique(cards);
  return evalCodes(cards.slice());
}

export interface HandResult {
  strength: Strength;
  category: HandCategory;
  /** Najlepsze 5 kart, posortowane malejąco wg rangi. */
  bestFive: Card[];
}

function* combinations5(cards: readonly Card[]): Generator<Card[]> {
  const n = cards.length;
  for (let a = 0; a < n - 4; a++)
    for (let b = a + 1; b < n - 3; b++)
      for (let c = b + 1; c < n - 2; c++)
        for (let d = c + 1; d < n - 1; d++)
          for (let e = d + 1; e < n; e++) yield [cards[a]!, cards[b]!, cards[c]!, cards[d]!, cards[e]!];
}

/** Pełny wynik z najlepszymi pięcioma kartami (do wyjaśnień „gra stół”, kicker). */
export function evaluateHand(cards: readonly Card[]): HandResult {
  const s = strength(cards);
  let best: Card[] | null = null;
  for (const five of combinations5(cards)) {
    if (evalCodes(five) === s) {
      best = five;
      break;
    }
  }
  if (!best) throw new Error('Nie znaleziono najlepszej piątki');
  // kolejność do wyświetlania: najpierw grupy (kareta, trójka, pary), potem karty boczne; w grupie wg koloru ♠♥♦♣
  const counts = new Map<number, number>();
  for (const c of best) counts.set(rankOf(c), (counts.get(rankOf(c)) ?? 0) + 1);
  best.sort((x, y) => counts.get(rankOf(y))! - counts.get(rankOf(x))! || rankOf(y) - rankOf(x) || (x & 3) - (y & 3));
  // koło A-2-3-4-5: as na końcu
  if (categoryOf(s) === HandCategory.Straight || categoryOf(s) === HandCategory.StraightFlush) {
    const ranks = best.map(rankOf);
    if (ranks[0] === 12 && ranks[1] === 3) best.push(best.shift()!);
  }
  return { strength: s, category: categoryOf(s), bestFive: best };
}

export type Comparison = 1 | 0 | -1;

/** 1 gdy a silniejsze, -1 gdy b silniejsze, 0 przy remisie. */
export function compareHands(a: readonly Card[], b: readonly Card[]): Comparison {
  const sa = strength(a);
  const sb = strength(b);
  return sa < sb ? 1 : sa > sb ? -1 : 0;
}
