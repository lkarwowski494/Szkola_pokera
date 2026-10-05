import type { CbetDrill, ChoiceDrill, Drill, GeneratedDrill, NumericDrill, PaintDrill, TextureDrill } from '@szkola/content-schema';
import {
  cardsToString,
  classCombos,
  combosCount,
  HAND_CLASSES,
  generateBestHand,
  generateDrawCall,
  generateIcmCall,
  generateHudSpot,
  hudThresholdsFromParams,
  PLAYER_TYPES,
  generateIcmSpot,
  icmEquities,
  generateOuts,
  generatePotOdds,
  generateWhoWins,
  generateFlop,
  generateTextureSpot,
  HandCategory,
  pick,
  TEXTURE_VALUES,
  textureMatches,
  type FlopTexture,
  type TextureAxis,
  type TextureFilter,
  shuffle,
  type Card,
  type DrawKind,
  type Rng,
} from '@szkola/poker-core';
import type { RangeSpot } from '@/data/content/repo';
import { capitalize, categoryName, pctEquity, t, TEXTURE_AXIS_LABELS, TEXTURE_LABELS, textureText } from './text.pl';
import { MIXED_HIGH, MIXED_LOW, MIXED_MIN } from './thresholds';
import { tr } from './terms';
import { vocabBatch } from './vocab';
import type { DrillInstance, DrillOption, NumericInstance, Position, TextureAxisItem } from './types';

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
  if (drill.kind === 'texture') return Array.from({ length: n }, (_, i) => fromTexture(drill, lessonId, rng, i));
  if (drill.kind === 'cbet') return Array.from({ length: n }, (_, i) => fromCbet(drill, lessonId, rng, i));
  // słownictwo losuje całą serię naraz, żeby ten sam termin nie wypadł dwa razy w jednej lekcji
  if (drill.generator === 'vocab') return vocabBatch(drill, lessonId, rng, n);
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

/** Zadania, które za każdym razem losują nowe rozdanie (w powtórce i egzaminie mogą wystąpić kilka razy). */
export function isGenerative(d: Drill): boolean {
  return d.kind === 'generated' || d.kind === 'texture' || d.kind === 'cbet';
}

/** Klasyfikacja tekstury flopa: losowy flop (rzadkie tekstury częściej), po jednej odpowiedzi na każdą oś. */
function fromTexture(d: TextureDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  const axes = d.axes as TextureAxis[];
  const { flop, texture } = generateTextureSpot(rng, axes);
  const items: TextureAxisItem[] = axes.map(<A extends TextureAxis>(axis: A) => ({
    axis,
    label: TEXTURE_AXIS_LABELS[axis],
    options: (TEXTURE_VALUES[axis] as readonly FlopTexture[A][]).map((v) => ({
      text: (TEXTURE_LABELS[axis] as Record<string, string>)[v as string]!,
      correct: texture[axis] === v,
      why: textureText.why(axis, v, flop, texture),
    })),
  }));
  return {
    kind: 'texture',
    key: `${d.id}#${i}`,
    drillId: d.id,
    family: d.family,
    lessonId,
    rules: d.rules,
    prompt: textureText.prompt(axes),
    table: { board: toStrings(flop) },
    axes: items,
    explanation: textureText.summary(texture),
  };
}

/**
 * Decyzja c-betu: losujemy przypadek (równo), potem flop o jego teksturze. Opcje w stałej kolejności: czekam, mały,
 * duży. Gdy najlepszy jest c-bet, drugi rozmiar to niedokładność (sizeError, ADR-22); przy „czekam” każdy c-bet to błąd.
 */
function fromCbet(d: CbetDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  const c = pick(rng, d.cases);
  const { flop, texture } = generateFlop(rng, c.when as TextureFilter);
  // przypadki się wykluczają (sprawdza content-build), ale bronimy się przed treścią spoza potoku
  const matching = d.cases.filter((x) => textureMatches(texture, x.when as TextureFilter));
  if (matching.length !== 1) throw new Error(`Zadanie ${d.id}: flop pasuje do ${matching.length} przypadków`);
  const actions = ['check', 'small', 'big'] as const;
  const options: DrillOption[] = actions.map((a) => {
    const correct = a === c.best;
    const sizeError = !correct && a !== 'check' && c.best !== 'check';
    return { text: d.options[a], correct, ...(sizeError ? { sizeError: true } : {}), why: c.why[a] };
  });
  return {
    ...base(d, lessonId, i),
    prompt: d.prompt,
    table: { board: toStrings(flop), ...(d.position ? { position: d.position as Position } : {}) },
    options,
    explanation: textureText.summary(texture),
  };
}

function base(d: Pick<GeneratedDrill, 'id' | 'family' | 'rules'>, lessonId: string | null, i: number) {
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
    case 'icm':
      return d.params.mode === 'equity' ? icmEquity(d, lessonId, rng, i) : icmCall(d, lessonId, rng, i);
    case 'vocab':
      return vocabBatch(d, lessonId, rng, 1, i)[0]!;
    case 'playerType':
      return playerType(d, lessonId, rng, i);
  }
}

/**
 * M10: typ gracza po statystykach HUD. Progi przychodzą z treści (params po podstawieniu „n:klucz”), opcje w stałej
 * kolejności (nit, regular, pasywny, maniak, za mało rąk); wyjaśnienie każdej opcji podaje próg i dostosowanie.
 */
function playerType(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  const th = hudThresholdsFromParams(d.params);
  const s = generateHudSpot(rng, th);
  return {
    ...base(d, lessonId, i),
    prompt: t.playerType.prompt(s),
    options: PLAYER_TYPES.map((x) => ({ text: t.playerType.option(x), correct: x === s.type, why: t.playerType.why(s, x, th) })),
    explanation: t.playerType.explanation(s, th),
  };
}

/** M11: sprawdzić all-in na bańce według ICM (bubble factor), losowe stacki i equity ręki. */
function icmCall(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  const s = generateIcmCall(rng);
  const call = s.correct === 'call';
  return {
    ...base(d, lessonId, i),
    prompt: t.icm.callPrompt(s),
    options: [
      { text: t.icm.call, correct: call, why: call ? t.icm.callRight(s) : t.icm.callWrong(s) },
      { text: t.icm.fold, correct: !call, why: call ? t.icm.foldWrong(s) : t.icm.foldRight(s) },
    ],
    explanation: t.icm.callExplanation(s),
  };
}

/** M11: ile według ICM jest wart stack (trzy odpowiedzi: ICM, udział w żetonach, sama szansa na 1. miejsce). */
function icmEquity(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number): DrillInstance {
  for (;;) {
    const s = generateIcmSpot(rng);
    const total = s.stacks.reduce((a, b) => a + b, 0);
    const icm = icmEquities(s.stacks, s.payouts)[s.hero]!;
    const chips = s.stacks[s.hero]! / total;
    const firstOnly = chips * s.payouts[0]!;
    const texts = [icm, chips, firstOnly].map((x) => t.icm.share(x));
    if (new Set(texts).size < 3) continue;
    return {
      ...base(d, lessonId, i),
      prompt: t.icm.equityPrompt(s),
      options: shuffle(rng, [
        { text: texts[0]!, correct: true, why: t.icm.equityRight },
        { text: texts[1]!, correct: false, why: t.icm.equityChips },
        { text: texts[2]!, correct: false, why: t.icm.equityFirstOnly },
      ]),
      explanation: t.icm.equityExplanation(s, icm, chips),
    };
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
    const text = capitalize(tr(name));
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
      explanation: t.outs.explanation(kind, s.outs, s.hitNextCard, s.hitToRiver, street),
    };
  }
  const values = shuffle(rng, [s.outs, ...shuffle(rng, OUTS_DISTRACTORS[kind]).slice(0, 2)]);
  return {
    ...base(d, lessonId, i),
    prompt: t.outs.prompt(kind),
    table: { hand: toStrings(s.hole), board: toStrings(s.board) },
    options: values.map((v) => ({ text: String(v), correct: v === s.outs, why: v === s.outs ? t.outs.right : t.outs.wrong(v, s.outs) })),
    explanation: t.outs.explanation(kind, s.outs, s.hitNextCard, s.hitToRiver, street),
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
      display: pctEquity(s.required),
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
        : { value: s.pot / (s.pot + s.bet), why: t.potOdds.mistakeInverted };
    const vals = [s.required, noCall, third.value].map(pctEquity);
    if (new Set(vals).size < 3) continue;
    const options: DrillOption[] = [
      { text: pctEquity(s.required), correct: true, why: t.potOdds.right },
      { text: pctEquity(noCall), correct: false, why: t.potOdds.mistakeNoCall },
      { text: pctEquity(third.value), correct: false, why: third.why },
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
  const street = d.params.street === 'flop' ? 'flop' : 'turn';
  const s = generateDrawCall(rng, street);
  const what = s.draw.kind as 'flush' | 'oesd' | 'gutshot';
  return {
    ...base(d, lessonId, i),
    prompt: t.drawCall.prompt(s.pot, s.bet, what, street),
    table: { hand: toStrings(s.hole), board: toStrings(s.board) },
    options: [
      { text: t.drawCall.call, correct: s.correct === 'call', why: s.correct === 'call' ? t.drawCall.right : t.drawCall.wrong },
      { text: t.drawCall.fold, correct: s.correct === 'fold', why: s.correct === 'fold' ? t.drawCall.right : t.drawCall.wrong },
    ],
    explanation: t.drawCall.explanation(s),
  };
}

/**
 * Zadanie z zakresu solvera: losowa ręka w danym spocie, częściej ręce graniczne.
 * Skala ADR-26 (wspólna z trybem gry, dokument 14, 5.2): zgodna jest akcja najczęstsza i każda grana w co najmniej
 * MIXED_LOW przypadków; dopuszczalna każda grana w MIXED_MIN–MIXED_LOW; rzadziej to błąd. Grupa z wrongSizes
 * dostaje dodatkowe opcje „zły rozmiar” (B-015): przy akcji zgodnej albo dopuszczalnej to niedokładność.
 */
/**
 * Werdykt każdej akcji według częstości solvera (ADR-26): correct (najczęstsza albo ≥ MIXED_LOW),
 * acceptable (MIXED_MIN ≤ f < MIXED_LOW), wrong (f < MIXED_MIN). Wspólna dla zadań i przyszłej oceny gry (M13).
 */
export function rangeVerdict(freqs: readonly number[]): ('correct' | 'acceptable' | 'wrong')[] {
  const best = Math.max(...freqs);
  return freqs.map((f) => (f === best || f >= MIXED_LOW ? 'correct' : f >= MIXED_MIN ? 'acceptable' : 'wrong'));
}

function rangeDecision(d: GeneratedDrill, lessonId: string | null, rng: Rng, i: number, ctx: DrillContext): DrillInstance {
  const ids = String(d.params.spots ?? '').split(',').map((x) => x.trim()).filter(Boolean);
  const spot = ctx.range(ids[Math.floor(rng() * ids.length)]!);
  if (!spot) throw new Error(`Brak zakresu dla zadania ${d.id}`);
  const play = (h: number) => spot.groups.reduce((s, g) => s + (g.freqs[h] ?? 0), 0);
  // losowanie klasy: wagi = kombinacje × (0,25 + 4·p·(1−p)), więc ręce graniczne pojawiają się częściej;
  // klasy niepewne (solver odbiega od publicznych tabel, spots.yaml → uncertain) nie pojawiają się wcale
  const uncertain = new Set(spot.uncertain ?? []);
  const weights = HAND_CLASSES.map((hc, h) => (uncertain.has(hc) ? 0 : combosCount(hc) * (0.25 + 4 * play(h) * (1 - play(h)))));
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
  const verdict = rangeVerdict(freqs.map((f) => f.f));
  const options: DrillOption[] = freqs.map((f, fi) => {
    const v = verdict[fi]!;
    if (v === 'correct') return { text: f.name, correct: true, why: t.range.right(f.f) };
    if (v === 'acceptable') return { text: f.name, correct: false, acceptable: true, why: t.range.acceptable(f.f) };
    return { text: f.name, correct: false, why: t.range.wrong(f.f) };
  });
  // błędne rozmiary dokładamy na końcu listy (kolejność opcji generatora jest stała: grupy, pas, złe rozmiary)
  spot.groups.forEach((g, gi) => {
    const f = freqs[gi]!.f;
    for (const w of g.wrongSizes ?? []) {
      options.push(
        verdict[gi] !== 'wrong' ? { text: w.text, correct: false, sizeError: true, why: w.why } : { text: w.text, correct: false, why: `${t.range.wrong(f)} ${w.why}` },
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
