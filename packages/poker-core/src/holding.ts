import type { Card } from './cards';
import { rankOf } from './cards';
import { drawOuts, type DrawOuts } from './draws';
import { categoryOf, HandCategory, strength } from './evaluate';

/**
 * Siła ręki gracza po flopie względem stołu (dokument 14, 4.4.2): fakty o układzie i dobieraniach oraz klasa
 * dla polityki botów. Fakty (pairKind, kicker, outy) są rachunkiem; podział na klasy to model bota (BOT_POLICY),
 * a nie reguła kursu, więc nie trafia do treści jako twierdzenie.
 */
export type HoldingClass = 'very-strong' | 'strong' | 'medium' | 'weak' | 'draw' | 'air';
export const HOLDING_CLASSES: readonly HoldingClass[] = ['very-strong', 'strong', 'medium', 'weak', 'draw', 'air'];

/** Rodzaj pary, gdy ręka to jedna para z udziałem karty gracza. */
export type PairKind = 'overpair' | 'top' | 'second' | 'low' | 'underpair';

export interface Holding {
  category: HandCategory;
  /** Układ lepszy niż sam stół (karty gracza się liczą). */
  improvesBoard: boolean;
  /** Dla jednej pary z kartą gracza (także na sparowanym stole: para gracza obok pary ze stołu). */
  pairKind: PairKind | null;
  /** Ranga drugiej karty gracza przy parze z jedną kartą (0 = 2 … 12 = A). */
  kicker: number | null;
  /** Outy do koloru i strita (flop i turn); na riverze brak. */
  draw: DrawOuts | null;
  /** Liczba kart gracza wyższych od najwyższej karty stołu. */
  overcards: number;
  cls: HoldingClass;
}

/** Granice klas (model bota): kicker przy najwyższej parze, od którego para jest „silna”, i outy dobierania. */
export const HOLDING_LIMITS = {
  /** Najwyższa para z kickerem od tej rangi (T) jest silna, niżej średnia. */
  strongKickerMin: 8,
  /** Od tylu outów dobieranie jest pełnoprawne (kolor 9, strit otwarty 8). */
  drawOutsMin: 8,
  /** Od tylu outów dobieranie gra jak silna ręka (np. kolor ze stritem). */
  comboOutsMin: 12,
} as const;

export function classifyHolding(hole: readonly [Card, Card], board: readonly Card[]): Holding {
  if (board.length < 3 || board.length > 5) throw new Error('Siłę ręki po flopie liczymy dla 3–5 kart wspólnych');
  const all = [...hole, ...board];
  const s = strength(all);
  const category = categoryOf(s);
  const boardCat = board.length === 5 ? categoryOf(strength(board)) : boardOnlyCategory(board);
  const boardStrength = board.length === 5 ? strength(board) : null;
  // na flopie i turnie porównujemy kategorie (stół ma mniej niż 5 kart); na riverze dokładną siłę
  const improvesBoard = boardStrength === null ? categoryRank(category) > categoryRank(boardCat) : s < boardStrength;
  const boardRanks = [...new Set(board.map(rankOf))].sort((a, b) => b - a);
  const top = boardRanks[0]!;
  const [h1, h2] = [rankOf(hole[0]), rankOf(hole[1])];
  const overcards = [h1, h2].filter((r) => r > top).length;
  const draw = board.length < 5 ? drawOuts(hole, board) : null;

  let pairKind: PairKind | null = null;
  let kicker: number | null = null;
  const boardPaired = boardRanks.length < board.length;
  const holePairsBoard = [h1, h2].filter((r) => boardRanks.includes(r));
  const onePairWithHole =
    (category === HandCategory.OnePair && improvesBoard) || (category === HandCategory.TwoPair && boardPaired && holePairsBoard.length + (h1 === h2 ? 1 : 0) === 1);
  if (onePairWithHole) {
    if (h1 === h2) {
      // para w ręce między najwyższą a drugą kartą stołu gra jak druga para
      pairKind = h1 > top ? 'overpair' : h1 > (boardRanks[1] ?? -1) ? 'second' : 'underpair';
    } else {
      const paired = holePairsBoard[0]!;
      const other = paired === h1 ? h2 : h1;
      kicker = other;
      pairKind = paired === top ? 'top' : paired === boardRanks[1] ? 'second' : 'low';
    }
  }

  const outs = draw?.all.length ?? 0;
  let cls: HoldingClass;
  const L = HOLDING_LIMITS;
  if (improvesBoard && categoryRank(category) >= categoryRank(HandCategory.TwoPair) && !onePairWithHole) cls = 'very-strong';
  else if (pairKind === 'overpair' || (pairKind === 'top' && (kicker ?? 0) >= L.strongKickerMin)) cls = 'strong';
  else if (outs >= L.comboOutsMin) cls = 'strong';
  else if (pairKind === 'top' || pairKind === 'second') cls = 'medium';
  else if (outs >= L.drawOutsMin) cls = 'draw';
  else if (pairKind === 'low' || pairKind === 'underpair' || (overcards > 0 && Math.max(h1, h2) === 12)) cls = 'weak';
  else cls = 'air';
  return { category, improvesBoard, pairKind, kicker, draw, overcards, cls };
}

/** Wyższa liczba = silniejsza kategoria (HandCategory ma odwrotną kolejność). */
function categoryRank(c: HandCategory): number {
  return 8 - c;
}

/** Kategoria samego stołu z 3–4 kart (para, dwie pary, trójka, kareta albo wysoka karta). */
function boardOnlyCategory(board: readonly Card[]): HandCategory {
  const counts = new Map<number, number>();
  for (const c of board) counts.set(rankOf(c), (counts.get(rankOf(c)) ?? 0) + 1);
  const v = [...counts.values()].sort((a, b) => b - a);
  if (v[0] === 4) return HandCategory.FourOfAKind;
  if (v[0] === 3) return HandCategory.ThreeOfAKind;
  if (v[0] === 2 && v[1] === 2) return HandCategory.TwoPair;
  if (v[0] === 2) return HandCategory.OnePair;
  return HandCategory.HighCard;
}

