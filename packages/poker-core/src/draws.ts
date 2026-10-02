import type { Card } from './cards';
import { rankOf, remainingDeck, suitOf } from './cards';

export interface DrawOuts {
  /** Karty dające kolor (gdy ręka ma 4 karty w kolorze i nie ma jeszcze koloru). */
  flush: Card[];
  /** Karty dające strit (gdy nie ma jeszcze strita). */
  straight: Card[];
  /** Suma bez podwójnego liczenia. */
  all: Card[];
  kind: 'none' | 'flush' | 'oesd' | 'gutshot' | 'double-gutshot' | 'combo';
}

function hasStraight(ranks: Set<number>): boolean {
  const has = (r: number) => ranks.has(r === -1 ? 12 : r);
  for (let top = 12; top >= 3; top--) {
    let ok = true;
    for (let k = 0; k < 5; k++) if (!has(top - k)) { ok = false; break; }
    if (ok) return true;
  }
  return false;
}

/**
 * Outy do koloru i strita dla ręki gracza na flopie lub turnie.
 * Liczy karty kończące dobieranie, bez oceny, czy wynik wygra z przeciwnikiem.
 */
export function drawOuts(hole: readonly Card[], board: readonly Card[]): DrawOuts {
  if (board.length < 3 || board.length > 4) throw new Error('Outy liczymy na flopie lub turnie');
  const cards = [...hole, ...board];
  const unseen = remainingDeck(cards);

  const suitCounts = [0, 0, 0, 0];
  for (const c of cards) suitCounts[suitOf(c)]!++;
  const flushSuit = suitCounts.findIndex((n) => n === 4);
  const hasFlush = suitCounts.some((n) => n >= 5);
  const flush = !hasFlush && flushSuit >= 0 ? unseen.filter((c) => suitOf(c) === flushSuit) : [];

  const ranks = new Set(cards.map(rankOf));
  const straight: Card[] = [];
  let straightRanks = 0;
  if (!hasStraight(ranks)) {
    for (let r = 0; r <= 12; r++) {
      if (ranks.has(r)) continue;
      const next = new Set(ranks);
      next.add(r);
      if (hasStraight(next)) {
        straightRanks++;
        straight.push(...unseen.filter((c) => rankOf(c) === r));
      }
    }
  }

  const all = Array.from(new Set([...flush, ...straight]));
  let kind: DrawOuts['kind'] = 'none';
  const straightKind = straightRanks >= 2 ? (isOpenEnded(ranks) ? 'oesd' : 'double-gutshot') : straightRanks === 1 ? 'gutshot' : null;
  if (flush.length && straightKind) kind = 'combo';
  else if (flush.length) kind = 'flush';
  else if (straightKind) kind = straightKind;
  return { flush, straight, all, kind };
}

/** Cztery kolejne rangi z możliwością domknięcia z obu stron. */
function isOpenEnded(ranks: Set<number>): boolean {
  for (let low = 0; low <= 8; low++) {
    if ([0, 1, 2, 3].every((k) => ranks.has(low + k)) && low + 4 <= 12) return true;
  }
  return false;
}
