import type { Card } from './cards';
import { dealCards, rankOf, suitOf } from './cards';
import { drawOuts, type DrawOuts } from './draws';
import { evaluateHand, type HandCategory, type HandResult } from './evaluate';
import { hitProbability, requiredEquity } from './math';
import type { Rng } from './rng';
import { pick } from './rng';

/**
 * Generatory zadań. Zwracają wyłącznie fakty (karty, liczby, poprawną odpowiedź),
 * bez tekstu. Tekst po polsku buduje warstwa treści w aplikacji (ADR-14: gotowość na EN).
 */

const MAX_TRIES = 5000;

function retry<T>(gen: () => T | null): T {
  for (let i = 0; i < MAX_TRIES; i++) {
    const v = gen();
    if (v !== null) return v;
  }
  throw new Error('Generator nie znalazł pasującego rozdania');
}

// ---------- Kto wygrywa ----------

export type Winner = 'hero' | 'villain' | 'split';
export type WinReason = 'category' | 'higher-same-category' | 'kicker' | 'board-plays' | 'identical';

export interface WhoWinsSpot {
  hero: Card[];
  villain: Card[];
  board: Card[];
  heroResult: HandResult;
  villainResult: HandResult;
  winner: Winner;
  reason: WinReason;
}

function sameRanks(a: readonly Card[], b: readonly Card[]): boolean {
  return a.length === b.length && a.every((c, i) => rankOf(c) === rankOf(b[i]!));
}

export function analyseShowdown(hero: Card[], villain: Card[], board: Card[]): WhoWinsSpot {
  const heroResult = evaluateHand([...hero, ...board]);
  const villainResult = evaluateHand([...villain, ...board]);
  const winner: Winner =
    heroResult.strength < villainResult.strength ? 'hero' : heroResult.strength > villainResult.strength ? 'villain' : 'split';
  let reason: WinReason;
  if (winner === 'split') {
    const boardRanks = board.map(rankOf).sort((a, b) => b - a);
    const bestRanks = heroResult.bestFive.map(rankOf).sort((a, b) => b - a);
    reason = bestRanks.every((r, i) => r === boardRanks[i]) ? 'board-plays' : 'identical';
  } else if (heroResult.category !== villainResult.category) {
    reason = 'category';
  } else if (isKickerDecided(heroResult, villainResult)) {
    reason = 'kicker';
  } else {
    reason = 'higher-same-category';
  }
  return { hero, villain, board, heroResult, villainResult, winner, reason };
}

/** Te same rangi „rdzenia” układu (pary/trójki), różnica dopiero na kartach bocznych. */
function isKickerDecided(a: HandResult, b: HandResult): boolean {
  const core = (r: HandResult) => {
    const counts = new Map<number, number>();
    for (const c of r.bestFive) counts.set(rankOf(c), (counts.get(rankOf(c)) ?? 0) + 1);
    return [...counts.entries()].filter(([, n]) => n >= 2).map(([rank]) => rank).sort((x, y) => y - x);
  };
  const ca = core(a);
  const cb = core(b);
  if (ca.length === 0 || ca.length !== cb.length) return false;
  return ca.every((r, i) => r === cb[i]) && !sameRanks(a.bestFive, b.bestFive);
}

export interface WhoWinsOptions {
  /** Wymuś powód rozstrzygnięcia (np. ćwiczenie kickera). */
  reason?: WinReason;
}

export function generateWhoWins(rng: Rng, opts: WhoWinsOptions = {}): WhoWinsSpot {
  return retry(() => {
    const cards = dealCards(rng, 9);
    const spot = analyseShowdown(cards.slice(0, 2), cards.slice(2, 4), cards.slice(4, 9));
    if (opts.reason && spot.reason !== opts.reason) return null;
    // pomijamy rozdania, w których obaj mają tylko wysoką kartę (mało dydaktyczne)
    if (!opts.reason && spot.heroResult.category === 8 && spot.villainResult.category === 8) return null;
    return spot;
  });
}

// ---------- Najlepszy układ ----------

export interface BestHandSpot {
  hole: Card[];
  board: Card[];
  result: HandResult;
}

export function generateBestHand(rng: Rng, category?: HandCategory): BestHandSpot {
  return retry(() => {
    const cards = dealCards(rng, 7);
    const result = evaluateHand(cards);
    if (category !== undefined && result.category !== category) return null;
    return { hole: cards.slice(0, 2), board: cards.slice(2), result };
  });
}

// ---------- Outy ----------

export type DrawKind = Exclude<DrawOuts['kind'], 'none' | 'double-gutshot'>;

export interface OutsSpot {
  hole: Card[];
  board: Card[];
  draw: DrawOuts;
  outs: number;
  street: 'flop' | 'turn';
  /** Dokładna szansa trafienia do rivera. */
  hitToRiver: number;
}

export function generateOuts(rng: Rng, kind: DrawKind, street: 'flop' | 'turn' = 'flop'): OutsSpot {
  const boardSize = street === 'flop' ? 3 : 4;
  return retry(() => {
    const cards = dealCards(rng, 2 + boardSize);
    const hole = cards.slice(0, 2);
    const board = cards.slice(2);
    const draw = drawOuts(hole, board);
    if (draw.kind !== kind) return null;
    // dobieranie do koloru musi korzystać z karty gracza, inaczej to „kolor na stole”
    if (draw.flush.length && !hole.some((c) => suitOf(c) === suitOf(draw.flush[0]!))) return null;
    const evaluated = evaluateHand([...hole, ...board]);
    if (evaluated.category <= 4) return null; // już gotowy strit lub lepiej
    const unseen = 52 - 2 - boardSize;
    const outs = draw.all.length;
    return { hole, board, draw, outs, street, hitToRiver: hitProbability(outs, unseen, street === 'flop' ? 2 : 1) };
  });
}

// ---------- Pot odds ----------

export const BET_FRACTIONS = [0.25, 1 / 3, 0.5, 2 / 3, 0.75, 1, 1.5, 2] as const;

export interface PotOddsSpot {
  pot: number;
  bet: number;
  fraction: number;
  required: number;
}

export function generatePotOdds(rng: Rng): PotOddsSpot {
  const pot = pick(rng, [20, 30, 40, 60, 80, 90, 100, 120, 150, 200]);
  const fraction = pick(rng, BET_FRACTIONS);
  const bet = Math.round(pot * fraction);
  return { pot, bet, fraction, required: requiredEquity(pot, bet) };
}

// ---------- Sprawdzić czy spasować z dobieraniem (turn) ----------

export interface DrawCallSpot extends OutsSpot {
  pot: number;
  bet: number;
  required: number;
  /** Poprawna decyzja bez implied odds. */
  correct: 'call' | 'fold';
}

export function generateDrawCall(rng: Rng): DrawCallSpot {
  return retry(() => {
    const kind = pick(rng, ['flush', 'oesd', 'gutshot'] as const);
    const spot = generateOuts(rng, kind, 'turn');
    const potOddsSpot = generatePotOdds(rng);
    // pomijamy przypadki na granicy (±2 pp), żeby odpowiedź była jednoznaczna bez kalkulatora
    if (Math.abs(spot.hitToRiver - potOddsSpot.required) < 0.02) return null;
    return {
      ...spot,
      pot: potOddsSpot.pot,
      bet: potOddsSpot.bet,
      required: potOddsSpot.required,
      correct: spot.hitToRiver > potOddsSpot.required ? 'call' : 'fold',
    };
  });
}
