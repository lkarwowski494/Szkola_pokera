import type { ChoiceDrill, Drill, GeneratedDrill, NumericDrill, PaintDrill } from '@szkola/content-schema';
import {
  cardsToString,
  classCombos,
  combosCount,
  HAND_CLASSES,
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
import type { RangeSpot } from '@/data/content/repo';
import { categoryName, pct, t } from './text.pl';
import { MIXED_HIGH, MIXED_LOW } from './thresholds';
import type { DrillInstance, DrillOption, NumericInstance, Position } from './types';

/** Dane potrzebne generatorom poza samym zadaniem (np. zakresy z solvera). */
export interface DrillContext {
  range: (id: string) => RangeSpot | undefined;
}

const NO_CONTEXT: DrillContext = { range: () => undefined };

/**
 * Zamienia definicję zadania z treści na konkretne zadania do pokazania.
 * Czysta funkcja (rng z zewnątrz), więc łatwa do testowania.
 */
export function instantiate(drill: Drill, lessonId: string | null, rng: Rng, count?: number, ctx: DrillContext = NO_CONTEXT): DrillInstance[] {
  if (drill.kind === 'choice') return [fromChoice(drill, lessonId, rng)];
  if (drill.kind === 'numeric') return [fromNumeric(drill, lessonId)];
  if (drill.kind === 'paint') return [fromPaint(drill, lessonId, ctx)];
  const n = count ?? drill.count;
  return Array.from({ length: n }, (_, i) => fromGenerator(drill, lessonId, rng, i, ctx));
}

const split = (s?: string) => (s ? s.split(' ') : undefined);
const toStrings = (c: readonly Card[]) => cardsToString(c).split(' ');

type ContentTable = ChoiceDrill['table'];

function tableOf(tb: ContentTable) {
  return tb
    ? {
        ...(tb.hand ? { hand: split(tb.hand)! } : {}),
        ...(tb.opp ? { opp: split(tb.opp)! } : {}),
        ...(tb.board ? { board: split(tb.board)! } : {}),
        ...(tb.position ? { position: tb.position as Position } : {}),
      }
    : undefined;
}

function fromNumeric(d: NumericDrill, lessonId: string | null): DrillInstance {
  if (d.value === undefined || d.unit === undefined || d.display === undefined) throw new Error(`Zadanie ${d.id}: brak skompilowanej odpowiedzi`);
  const table = tableOf(d.table);
  return {
    kind: 'numeric',
    key: d.id,
    drillId: d.id,
    family: d.family,
    lessonId,
    rules: d.rules,
    prompt: d.prompt,
    ...(table ? { table } : {}),
    answer: d.unit === 'percent' ? d.value * 100 : d.value,
    unit: d.unit,
    display: d.display,
    explanation: d.explanation,
  };
}

function fromPaint(d: PaintDrill, lessonId: string | null, ctx: DrillContext): DrillInstance {
  const spot = ctx.range(d.spot);
  if (!spot) throw new Error(`Brak zakresu ${d.spot} dla zadania ${d.id}`);
  return {
    kind: 'paint',
    key: d.id,
    drillId: d.id,
    family: d.family,
    lessonId,
    rules: d.rules,
    prompt: d.prompt,
    table: { position: spot.hero as Position },
    spot,
    explanation: t.paint.explanation(spot.title),
  };
}

function fromChoice(d: ChoiceDrill, lessonId: string | null, rng: Rng): DrillInstance {
  const table = tableOf(d.table);
  return {
    kind: 'choice',
    key: `${d.id}`,
    drillId: d.id,
    family: d.family,
    lessonId,
    rules: d.rules,
    prompt: d.prompt,
    ...(table ? { table } : {}),
    options: shuffle(rng, d.options.map((o) => ({ text: o.text, correct: o.correct, ...(o.sizeError ? { sizeError: true } : {}), why: o.why }))),
  };
}

function base(d: GeneratedDrill, lessonId: string | null, i: number) {
  return { kind: 'choice' as const, key: `${d.id}#${i}`, drillId: d.id, family: d.family, lessonId, rules: d.rules };
}

/** Generatory z params.answer = "numeric" dają zadanie z wpisywaną liczbą zamiast opcji (B-017). */
const wantsNumeric = (d: GeneratedDrill) => d.params.answer === 'numeric';

function numericBase(d: GeneratedDrill, lessonId: string | null, i: number): Omit<NumericInstance, 'prompt' | 'answer' | 'unit' | 'display'> {
  return { kind: 'numeric', key: `${d.id}#${i}`, drillId: d.id, family: d.family, lessonId, rules: d.rules };
}

function fromGenerator(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number, ctx: DrillContext): DrillInstance {
  switch (d.generator) {
    case 'rangeDecision':
      return rangeDecision(d, lessonId, rng, i, ctx);
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
  if (wantsNumeric(d)) {
    return {
      ...numericBase(d, lessonId, i),
      prompt: t.outs.prompt(kind),
      table: { hand: toStrings(s.hole), board: toStrings(s.board) },
      answer: s.outs,
      unit: 'count',
      display: String(s.outs),
      explanation: t.outs.explanation(kind, s.outs, s.hitToRiver, street),
    };
  }
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
  if (wantsNumeric(d)) {
    const s = generatePotOdds(rng);
    return {
      ...numericBase(d, lessonId, i),
      prompt: t.potOdds.prompt(s.pot, s.bet),
      answer: s.required * 100,
      unit: 'percent',
      display: pct(s.required, 1),
      explanation: t.potOdds.explanation(s.pot, s.bet, s.required),
    };
  }
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

/**
 * Zadanie z zakresu solvera: losowa ręka w danym spocie, częściej ręce graniczne.
 * Poprawna jest akcja najczęstsza; w rękach mieszanych (najczęstsza poniżej MIXED_HIGH) także każda akcja
 * grana w co najmniej MIXED_LOW przypadków. Grupa z wrongSizes dostaje dodatkowe opcje „zły rozmiar” (B-015).
 */
function rangeDecision(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number, ctx: DrillContext): DrillInstance {
  const ids = String(d.params.spots ?? '').split(',').map((x) => x.trim()).filter(Boolean);
  const spot = ctx.range(ids[Math.floor(rng() * ids.length)]!);
  if (!spot) throw new Error(`Brak zakresu dla zadania ${d.id}`);
  const play = (h: number) => spot.groups.reduce((s, g) => s + (g.freqs[h] ?? 0), 0);
  // losowanie klasy: wagi = kombinacje × (0,25 + 4·p·(1−p)), więc ręce graniczne pojawiają się częściej
  const weights = HAND_CLASSES.map((hc, h) => combosCount(hc) * (0.25 + 4 * play(h) * (1 - play(h))));
  const total = weights.reduce((a, b) => a + b, 0);
  let x = rng() * total;
  let h = 0;
  while (h < 168 && x >= weights[h]!) x -= weights[h++]!;
  const hc = HAND_CLASSES[h]!;
  const combos = classCombos(hc);
  const [c1, c2] = combos[Math.floor(rng() * combos.length)]!;
  const freqs = [...spot.groups.map((g) => ({ name: g.name, f: g.freqs[h] ?? 0 })), { name: t.range.fold, f: Math.max(0, 1 - play(h)) }];
  const best = Math.max(...freqs.map((f) => f.f));
  const mixed = best < MIXED_HIGH;
  const isCorrect = (f: number) => f === best || (mixed && f >= MIXED_LOW);
  const options: DrillOption[] = freqs.map((f) => {
    const correct = isCorrect(f.f);
    return { text: f.name, correct, why: correct ? t.range.right(f.f) : t.range.wrong(f.f) };
  });
  // błędne rozmiary dokładamy na końcu listy (kolejność opcji generatora jest stała: grupy, pas, złe rozmiary)
  spot.groups.forEach((g, gi) => {
    const f = freqs[gi]!.f;
    for (const w of g.wrongSizes ?? []) {
      options.push(
        isCorrect(f) ? { text: w.text, correct: false, sizeError: true, why: w.why } : { text: w.text, correct: false, why: `${t.range.wrong(f)} ${w.why}` },
      );
    }
  });
  return {
    ...base(d, lessonId, i),
    prompt: spot.title,
    table: { hand: toStrings([c1, c2]), position: spot.hero as Position },
    options,
    explanation: t.range.explanation(hc, freqs, mixed),
  };
}
