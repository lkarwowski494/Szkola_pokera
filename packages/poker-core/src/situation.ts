import type { Card } from './cards';
import { randInt, type Rng } from './rng';
import { replayHand, type HandPreset, type HandState, type PlayerAction, type TableConfig } from './table';

/**
 * Sytuacja z gry zapisana na karcie powtórek (dokument 14, 4.4.5): stół w chwili decyzji gracza. Wszystkie karty są
 * ustalone (ręce każdego miejsca i pięć kart wspólnych), więc odtworzenie nie zależy od talii.
 */
export interface GameSituation {
  config: TableConfig;
  seed: number;
  holes: [Card, Card][];
  board: Card[];
  /** Akcje przed decyzją gracza. */
  actions: { seat: number; action: PlayerAction }[];
  heroSeat: number;
}

/** Sytuacja przed akcją numer `index` z zapisanego rozdania. */
export function situationAt(
  config: TableConfig,
  seed: number,
  allActions: readonly { seat: number; action: PlayerAction }[],
  index: number,
  preset?: HandPreset,
): GameSituation {
  const before = allActions.slice(0, index);
  const st = replayHand(config, seed, before, preset);
  const hero = allActions[index];
  if (!hero || st.toAct !== hero.seat) throw new Error(`situationAt: akcja ${index} nie należy do miejsca, które mówi`);
  return {
    config,
    seed,
    holes: st.seats.map((s) => [s.hole[0], s.hole[1]]),
    board: st.runout.slice(),
    actions: before.map((a) => ({ seat: a.seat, action: { ...a.action } })),
    heroSeat: hero.seat,
  };
}

/** Stan stołu w chwili decyzji. */
export function replaySituation(s: GameSituation): HandState {
  const st = replayHand(s.config, s.seed, s.actions, { holes: s.holes, board: s.board });
  if (st.toAct !== s.heroSeat) throw new Error('replaySituation: w odtworzonym stanie mówi inne miejsce');
  return st;
}

/** Wszystkie permutacje kolorów poza tożsamością (23). perm[k] = nowy kolor dla koloru k. */
export const SUIT_PERMUTATIONS: readonly (readonly number[])[] = (() => {
  const out: number[][] = [];
  const rec = (pre: number[], rest: number[]) => {
    if (!rest.length) {
      if (pre.some((v, i) => v !== i)) out.push(pre);
      return;
    }
    rest.forEach((x, i) => rec([...pre, x], [...rest.slice(0, i), ...rest.slice(i + 1)]));
  };
  rec([], [0, 1, 2, 3]);
  return out;
})();

export function permuteCard(c: Card, perm: readonly number[]): Card {
  return (c & ~3) | perm[c & 3]!;
}

/**
 * Ta sama sytuacja z kolorami zamienionymi jedną permutacją dla wszystkich kart naraz (5.6): siła rąk i dobierań się
 * nie zmienia, więc poprawna decyzja też nie. Losuje permutację inną niż tożsamość.
 */
export function permuteSituation(s: GameSituation, rng: Rng): GameSituation {
  const perm = SUIT_PERMUTATIONS[randInt(rng, SUIT_PERMUTATIONS.length)]!;
  return {
    ...s,
    holes: s.holes.map(([a, b]) => [permuteCard(a, perm), permuteCard(b, perm)]),
    board: s.board.map((c) => permuteCard(c, perm)),
    actions: s.actions.map((a) => ({ seat: a.seat, action: { ...a.action } })),
  };
}
