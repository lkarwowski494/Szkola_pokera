import type { ChoiceDrill, Drill, GeneratedDrill } from '@szkola/content-schema';
import {
  cardsToString,
  generateBestHand,
  generateDrawCall,
  generateOuts,
  generatePotOdds,
  generateWhoWins,
  HandCategory,
  shuffle,
  type Card,
  type DrawKind,
  type Rng,
} from '@szkola/poker-core';
import { categoryName, pct, t } from './text.pl';
import type { DrillInstance, DrillOption, Position } from './types';

/**
 * Zamienia definicję zadania z treści na konkretne zadania do pokazania.
 * Czysta funkcja (rng z zewnątrz), więc łatwa do testowania.
 */
export function instantiate(drill: Drill, lessonId: string | null, rng: Rng, count?: number): DrillInstance[] {
  if (drill.kind === 'choice') return [fromChoice(drill, lessonId, rng)];
  const n = count ?? drill.count;
  return Array.from({ length: n }, (_, i) => fromGenerator(drill, lessonId, rng, i));
}

const split = (s?: string) => (s ? s.split(' ') : undefined);
const toStrings = (c: readonly Card[]) => cardsToString(c).split(' ');

function fromChoice(d: ChoiceDrill, lessonId: string | null, rng: Rng): DrillInstance {
  const table = d.table
    ? {
        ...(d.table.hand ? { hand: split(d.table.hand)! } : {}),
        ...(d.table.opp ? { opp: split(d.table.opp)! } : {}),
        ...(d.table.board ? { board: split(d.table.board)! } : {}),
        ...(d.table.position ? { position: d.table.position as Position } : {}),
      }
    : undefined;
  return {
    key: `${d.id}`,
    drillId: d.id,
    family: d.family,
    lessonId,
    rules: d.rules,
    prompt: d.prompt,
    ...(table ? { table } : {}),
    options: shuffle(rng, d.options.map((o) => ({ text: o.text, correct: o.correct, why: o.why }))),
  };
}

function base(d: GeneratedDrill, lessonId: string | null, i: number) {
  return { key: `${d.id}#${i}`, drillId: d.id, family: d.family, lessonId, rules: d.rules };
}

function fromGenerator(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  switch (d.generator) {
    case 'whoWins':
    case 'whoWinsKicker':
      return whoWins(d, lessonId, rng, i, d.generator === 'whoWinsKicker');
    case 'bestHand':
      return bestHand(d, lessonId, rng, i);
    case 'outs':
      return outs(d, lessonId, rng, i);
    case 'potOdds':
      return potOdds(d, lessonId, rng, i);
    case 'drawCall':
      return drawCall(d, lessonId, rng, i);
  }
}

function whoWins(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number, kicker: boolean): DrillInstance {
  const s = generateWhoWins(rng, kicker ? { reason: 'kicker' } : {});
  const winner = s.winner === 'villain' ? s.villainResult : s.heroResult;
  const loser = s.winner === 'villain' ? s.heroResult : s.villainResult;
  const explanation = `${t.whoWins.facts(s.heroResult, s.villainResult)} ${t.whoWins.reason(s.reason, winner, loser)}`;
  const opt = (key: 'hero' | 'villain' | 'split', text: string): DrillOption => ({
    text,
    correct: s.winner === key,
    why: s.winner === key ? t.whoWins.yes : t.whoWins.no,
  });
  return {
    ...base(d, lessonId, i),
    prompt: t.whoWins.prompt,
    table: { hand: toStrings(s.hero), opp: toStrings(s.villain), board: toStrings(s.board) },
    options: [opt('hero', t.whoWins.hero), opt('villain', t.whoWins.villain), opt('split', t.whoWins.split)],
    explanation,
  };
}

function bestHand(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  // losujemy najpierw kategorię, żeby nie dominowały „para” i „wysoka karta”
  const target = shuffle(rng, [
    HandCategory.OnePair,
    HandCategory.TwoPair,
    HandCategory.ThreeOfAKind,
    HandCategory.Straight,
    HandCategory.Flush,
    HandCategory.FullHouse,
  ])[0]!;
  const s = generateBestHand(rng, target);
  const correct = s.result.category;
  const candidates = [correct - 1, correct + 1, correct + 2, correct - 2].filter((c) => c >= 1 && c <= 8 && c !== correct);
  const distractors = shuffle(rng, candidates).slice(0, 3);
  const options = shuffle(rng, [correct, ...distractors]).map((cat) => {
    const name = categoryName({ category: cat as (typeof HandCategory)[keyof typeof HandCategory], strength: 9999 });
    const text = name.charAt(0).toUpperCase() + name.slice(1);
    return {
      text,
      correct: cat === correct,
      why: cat === correct ? t.bestHand.right : cat < correct ? t.bestHand.tooHigh(name) : t.bestHand.tooLow(name),
    };
  });
  return {
    ...base(d, lessonId, i),
    prompt: t.bestHand.prompt,
    table: { hand: toStrings(s.hole), board: toStrings(s.board) },
    options,
    explanation: t.bestHand.explanation(s.result),
  };
}

const OUTS_DISTRACTORS: Record<'flush' | 'oesd' | 'gutshot', number[]> = {
  flush: [13, 4, 8, 12],
  oesd: [4, 6, 2, 9],
  gutshot: [8, 2, 6, 3],
};

function outs(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  const kind = String(d.params.kind ?? 'flush') as 'flush' | 'oesd' | 'gutshot';
  const street = d.params.street === 'turn' ? 'turn' : 'flop';
  const s = generateOuts(rng, kind as DrawKind, street);
  const values = shuffle(rng, [s.outs, ...shuffle(rng, OUTS_DISTRACTORS[kind]).slice(0, 2)]);
  return {
    ...base(d, lessonId, i),
    prompt: t.outs.prompt(kind),
    table: { hand: toStrings(s.hole), board: toStrings(s.board) },
    options: values.map((v) => ({ text: String(v), correct: v === s.outs, why: v === s.outs ? t.outs.right : t.outs.wrong(v, s.outs) })),
    explanation: t.outs.explanation(kind, s.outs, s.hitToRiver, street),
  };
}

function potOdds(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  // powtarzamy losowanie, aż trzy odpowiedzi będą się wyraźnie różnić po zaokrągleniu
  for (;;) {
    const s = generatePotOdds(rng);
    const noCall = s.bet / (s.pot + s.bet);
    const overPot = s.bet / s.pot;
    const third =
      overPot < 1
        ? { value: overPot, why: t.potOdds.mistakeBetOverPot }
        : { value: s.pot / (s.pot + s.bet), why: t.potOdds.mistakeMdf };
    const vals = [s.required, noCall, third.value].map((v) => pct(v));
    if (new Set(vals).size < 3) continue;
    const options: DrillOption[] = [
      { text: pct(s.required), correct: true, why: t.potOdds.right },
      { text: pct(noCall), correct: false, why: t.potOdds.mistakeNoCall },
      { text: pct(third.value), correct: false, why: third.why },
    ];
    return {
      ...base(d, lessonId, i),
      prompt: t.potOdds.prompt(s.pot, s.bet),
      options: shuffle(rng, options),
      explanation: t.potOdds.explanation(s.pot, s.bet, s.required),
    };
  }
}

function drawCall(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  const s = generateDrawCall(rng);
  const what = s.draw.kind as 'flush' | 'oesd' | 'gutshot';
  return {
    ...base(d, lessonId, i),
    prompt: t.drawCall.prompt(s.pot, s.bet, what),
    table: { hand: toStrings(s.hole), board: toStrings(s.board) },
    options: [
      { text: t.drawCall.call, correct: s.correct === 'call', why: s.correct === 'call' ? t.drawCall.right : t.drawCall.wrong },
      { text: t.drawCall.fold, correct: s.correct === 'fold', why: s.correct === 'fold' ? t.drawCall.right : t.drawCall.wrong },
    ],
    explanation: t.drawCall.explanation(s.outs, s.hitToRiver, s.required),
  };
}
