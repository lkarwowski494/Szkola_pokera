import type { Card } from './cards';
import { FULL_DECK } from './cards';
import { solverPath } from './bots';
import { drawOuts } from './draws';
import { strength } from './evaluate';
import { classifyHolding } from './holding';
import { hitProbability } from './math';
import { classOf, HAND_CLASSES } from './ranges';
import {
  applyAction,
  legalActions,
  startHand,
  tableSeats,
  type HandPreset,
  type HandState,
  type PlayerAction,
  type Street,
  type TableConfig,
} from './table';
import { classifyFlop, textureMatches, type TextureFilter } from './texture';

/**
 * Silnik oceny decyzji trybu gry M13 (dokument 14, 4.4.3 i sekcja 5). Działa po sesji na zapisanym przebiegu:
 * dla każdej decyzji gracza buduje fakty ze stanu stołu w chwili decyzji, wybiera reguły z polem check
 * (rules.yaml → content-build → game_kit.evalRules), których warunek pasuje, i wystawia werdykt według skali z 5.2
 * (ADR-26). Werdykt nie zależy od wyniku rozdania ani od kart, które padły po decyzji (5.1): silnik widzi tylko
 * stan sprzed akcji (bez kart rywali i dalszej talii).
 *
 * Łączenie (5.3): wygrywa wyższy szczebel źródła (math > gto > heuristic); przy tym samym szczeblu surowszy werdykt.
 * Wyjątki: dobra akcja ze złym rozmiarem to niedokładność (ADR-22); implied odds (R-M7-008) zastępuje ocenę samej
 * ceny (R-M2-005), bo obie są rachunkiem, a druga mówi wprost „bez dodatkowych argumentów”.
 * Reguły-zakazy (R-M1-002 pas przy darmowym czekaniu, R-M3-004 limp) dają werdykt tylko przy naruszeniu.
 */

export type Verdict = 'compliant' | 'compliant-exploit' | 'acceptable' | 'inaccuracy' | 'mistake' | 'unrated' | 'timeout';
export const VERDICTS: readonly Verdict[] = ['compliant', 'compliant-exploit', 'acceptable', 'inaccuracy', 'mistake', 'unrated', 'timeout'];

/** Werdykty, które tworzą kartę powtórek (dokument 14, 4.4.5 i 5.11). */
export function makesCard(v: Verdict): boolean {
  return v === 'mistake' || v === 'inaccuracy' || v === 'timeout';
}

/** Punkty do części „gra” wskaźnika (dokument 14, 4.8); null = decyzja nie wchodzi do wskaźnika. */
export function verdictPoints(v: Verdict): 0 | 1 | null {
  if (v === 'compliant' || v === 'compliant-exploit' || v === 'acceptable') return 1;
  if (v === 'inaccuracy' || v === 'mistake') return 0;
  return null;
}

export type RuleLevelName = 'rules' | 'math' | 'gto' | 'heuristic' | 'exploit';

export interface EvalRule {
  id: string;
  module: string;
  level: RuleLevelName;
  check: {
    kind: string;
    players?: readonly number[];
    stackBb?: readonly number[];
    streets?: readonly Street[];
    spots?: readonly string[];
    params: Readonly<Record<string, number | string>>;
    cases?: readonly { when: TextureFilter; best: 'check' | 'small' | 'big'; rule?: string }[];
  };
  families: readonly string[];
}

export interface EvalSpot {
  id: string;
  hero: string;
  path: string;
  groups: readonly { name: string; labels: readonly string[]; freqs: readonly number[] }[];
  uncertain: readonly string[];
  actions: readonly { label: string; freqs: readonly number[] }[];
}

export interface GradingKit {
  rules: readonly EvalRule[];
  /** Spoty zakresów solvera 6-max 100bb (te same co w zadaniach). */
  spots: readonly EvalSpot[];
  /** range.mixed.min i range.mixed.low z numbers.yaml (ADR-26). */
  thresholds: { mixedMin: number; mixedLow: number };
  /** cbet.size.small i cbet.size.big z numbers.yaml: granica „mały/duży” to ich średnia (nazwane uproszczenie). */
  cbet: { small: number; big: number };
  /** Format spotów solvera (format.stack i 6 graczy). */
  solverFormat: { players: number; stackBb: number };
}

export type GradeDetail =
  | { kind: 'solver'; spot: string; handClass: string; options: { name: string; f: number }[]; chosen: string; sizeMismatch: boolean; uncertain: boolean }
  | { kind: 'size'; expectedBb: number; actualBb: number }
  | { kind: 'cbet'; best: 'check' | 'small' | 'big'; chosen: 'check' | 'small' | 'big'; betFraction: number | null }
  | {
      kind: 'draw';
      outs: number;
      unseen: number;
      cards: 1 | 2;
      hit: number;
      required: number;
      implied?: { neededExtra: number; available: number; spr: number; sprMin: number; nutDraw: boolean; mathOk: boolean };
    }
  | { kind: 'free-check' }
  | { kind: 'limp' }
  | { kind: 'timeout'; auto: 'check' | 'fold' };

export interface Finding {
  /** Indeks akcji w HandState.actions. */
  index: number;
  street: Street;
  seat: number;
  position: string;
  hole: readonly [Card, Card];
  board: readonly Card[];
  action: PlayerAction;
  verdict: Verdict;
  ruleId: string | null;
  level: RuleLevelName | null;
  module: string | null;
  family: string | null;
  detail: GradeDetail | null;
  /** Inne reguły, które też pasowały (do raportu). */
  alsoRules: string[];
  /** Klucz deduplikacji karty: reguła + klasa ręki + spot (dokument 14, 4.4.5). */
  dedupeKey: string;
  /** Pula, kwota do sprawdzenia i stack gracza przed decyzją (żetony). */
  pot: number;
  toCall: number;
  stack: number;
}

/** Werdykt akcji z częstości solvera (ADR-26): zgodna, dopuszczalna, błąd. Wspólna dla zadań i gry. */
export function rangeVerdict(freqs: readonly number[], t: { mixedMin: number; mixedLow: number }): ('correct' | 'acceptable' | 'wrong')[] {
  const best = Math.max(...freqs);
  return freqs.map((f) => (f === best || f >= t.mixedLow ? 'correct' : f >= t.mixedMin ? 'acceptable' : 'wrong'));
}

const LEVEL_RANK: Record<RuleLevelName, number> = { math: 4, gto: 3, heuristic: 2, rules: 1, exploit: 0 };
const SEVERITY: Record<Verdict, number> = { mistake: 5, inaccuracy: 4, timeout: 3, acceptable: 2, 'compliant-exploit': 1, compliant: 1, unrated: 0 };
const fromRange = { correct: 'compliant', acceptable: 'acceptable', wrong: 'mistake' } as const;

interface Candidate {
  rule: EvalRule;
  verdict: Verdict;
  detail: GradeDetail;
  /** Sprawdzenie samego rozmiaru (łączone z oceną akcji). */
  sizeOnly?: boolean;
  /** Dobra akcja solvera z rozmiarem spoza drzewa. */
  sizeMismatch?: boolean;
}

interface Ctx {
  st: HandState;
  kit: GradingKit;
  seat: number;
  action: PlayerAction;
  bb: number;
  pot: number;
  toCall: number;
  canCheck: boolean;
  path: string;
  solverFormat: boolean;
  /** Akcje przed flopem przed decyzją (bez blindów). */
  pre: HandState['events'];
}

/** Ocena jednej decyzji: `st` to stan tuż przed akcją gracza. */
export function gradeDecision(st: HandState, action: PlayerAction, kit: GradingKit, index = st.actions.length): Finding {
  if (st.toAct === null) throw new Error('gradeDecision: rozdanie zakończone');
  const seat = st.toAct;
  const me = st.seats[seat]!;
  const la = legalActions(st);
  const bb = st.config.bigBlind;
  const ctx: Ctx = {
    st,
    kit,
    seat,
    action,
    bb,
    pot: st.seats.reduce((s, x) => s + x.committed, 0),
    toCall: la.callAmount ?? 0,
    canCheck: la.canCheck,
    path: solverPath(st.events, st.seats.map((s) => s.position), bb),
    solverFormat:
      st.seats.length === kit.solverFormat.players &&
      st.config.smallBlind * 2 === bb &&
      st.seats.every((s) => s.startStack === kit.solverFormat.stackBb * bb),
    pre: st.events.filter((e) => e.street === 'preflop' && e.type !== 'post-sb' && e.type !== 'post-bb'),
  };
  const cands: Candidate[] = [];
  for (const rule of kit.rules) {
    const c = rule.check;
    if (c.players && !c.players.includes(st.seats.length)) continue;
    if (c.stackBb && !st.seats.every((s) => c.stackBb!.includes(s.startStack / bb))) continue;
    if (c.streets && !c.streets.includes(st.street)) continue;
    const r = CHECKS[c.kind]?.(ctx, rule);
    if (r) cands.push(...(Array.isArray(r) ? r : [r]));
  }
  const chosen = combine(cands);
  const handKey = st.street === 'preflop' ? classOf(me.hole[0], me.hole[1]) : postflopHandKey(me.hole, st.board);
  const spotKey = st.street === 'preflop' ? `${ctx.path}>${me.position}` : `${st.street}:${me.position}:${chosen?.detail.kind ?? '-'}`;
  return {
    index,
    street: st.street,
    seat,
    position: me.position,
    hole: me.hole,
    board: st.board.slice(),
    action,
    verdict: chosen?.verdict ?? 'unrated',
    ruleId: chosen?.rule.id ?? null,
    level: chosen?.rule.level ?? null,
    module: chosen?.rule.module ?? null,
    family: chosen?.rule.families[0] ?? null,
    detail: chosen?.detail ?? null,
    alsoRules: [...new Set(cands.map((c) => c.rule.id).filter((id) => id !== chosen?.rule.id))],
    dedupeKey: `${chosen?.rule.id ?? '-'}|${handKey}|${spotKey}`,
    pot: ctx.pot,
    toCall: ctx.toCall,
    stack: me.stack,
  };
}

function postflopHandKey(hole: readonly [Card, Card], board: readonly Card[]): string {
  const h = classifyHolding(hole, board);
  return `${h.cls}:${h.pairKind ?? '-'}:${h.draw?.kind ?? '-'}`;
}

function combine(cands: Candidate[]): Candidate | null {
  if (!cands.length) return null;
  // implied odds (R-M7-008) zastępuje ocenę samej ceny drawa
  const implied = cands.find((c) => c.detail.kind === 'draw' && c.detail.implied);
  if (implied) cands = cands.filter((c) => c === implied || c.detail.kind !== 'draw');
  const actions = cands.filter((c) => !c.sizeOnly);
  const sizes = cands.filter((c) => c.sizeOnly);
  const pick = (list: Candidate[]) =>
    list.reduce((best, c) => {
      const d = LEVEL_RANK[c.rule.level] - LEVEL_RANK[best.rule.level];
      return d > 0 || (d === 0 && SEVERITY[c.verdict] > SEVERITY[best.verdict]) ? c : best;
    });
  if (!actions.length) return pick(sizes);
  const main = pick(actions);
  // dobra akcja (zgodna albo dopuszczalna), zły rozmiar → niedokładność z regułą rozmiaru (ADR-22)
  if (main.verdict === 'compliant' || main.verdict === 'acceptable') {
    const wrongSize = sizes.find((s) => s.verdict === 'inaccuracy');
    if (wrongSize) return wrongSize;
    if (main.sizeMismatch) return { ...main, verdict: 'inaccuracy' };
  }
  return main;
}

type Check = (ctx: Ctx, rule: EvalRule) => Candidate | Candidate[] | null;

const voluntaryBefore = (ctx: Ctx) => ctx.pre;
const raisesBefore = (ctx: Ctx) => ctx.pre.filter((e) => e.type === 'raise' || e.type === 'bet');

/** Kolejność po flopie: większa liczba = mówi później. */
function postflopOrder(st: HandState, seat: number): number {
  const { firstPostflop } = tableSeats(st.seats.length, st.config.button);
  return (seat - firstPostflop + st.seats.length) % st.seats.length;
}

const near = (a: number, b: number) => Math.abs(a - b) < 0.05;

const CHECKS: Record<string, Check> = {
  'free-check-fold': (ctx, rule) => (ctx.canCheck && ctx.action.type === 'fold' ? { rule, verdict: 'mistake', detail: { kind: 'free-check' } } : null),

  'no-limp': (ctx, rule) => {
    if (ctx.st.street !== 'preflop' || ctx.action.type !== 'call') return null;
    if (voluntaryBefore(ctx).some((e) => e.type !== 'fold')) return null;
    const { bb } = tableSeats(ctx.st.seats.length, ctx.st.config.button);
    if (ctx.seat === bb) return null;
    return { rule, verdict: 'mistake', detail: { kind: 'limp' } };
  },

  'solver-spot': (ctx, rule) => {
    if (ctx.st.street !== 'preflop' || !ctx.solverFormat) return null;
    const me = ctx.st.seats[ctx.seat]!;
    const spot = ctx.kit.spots.find((s) => (rule.check.spots ?? []).includes(s.id) && s.path === ctx.path && s.hero === me.position);
    if (!spot) return null;
    const hc = classOf(me.hole[0], me.hole[1]);
    const h = HAND_CLASSES.indexOf(hc);
    const options = [
      ...spot.groups.map((g) => ({ name: g.name, f: g.freqs[h] ?? 0 })),
      { name: 'fold', f: Math.max(0, 1 - spot.groups.reduce((s, g) => s + (g.freqs[h] ?? 0), 0)) },
    ];
    // klasy niepewne (solver odbiega od publicznych tabel, spots.yaml → uncertain): bez oceny solverem
    if (spot.uncertain.includes(hc)) return null;
    const a = ctx.action;
    let label: string | null = null;
    if (a.type === 'call') label = spot.actions.find((x) => x.label.startsWith('call'))?.label ?? null;
    if (a.type === 'raise' || a.type === 'bet') {
      const allIn = a.to === me.stack + me.streetBet;
      label =
        (allIn ? spot.actions.find((x) => x.label === 'all-in')?.label : undefined) ??
        spot.actions.find((x) => x.label.startsWith('raise ') && near(Number(x.label.slice(6)), (a.to ?? 0) / ctx.bb))?.label ??
        null;
    }
    const verdicts = rangeVerdict(
      options.map((o) => o.f),
      ctx.kit.thresholds,
    );
    const solverDetail = (chosen: string, sizeMismatch: boolean): GradeDetail => ({ kind: 'solver', spot: spot.id, handClass: hc, options, chosen, sizeMismatch, uncertain: false });
    if (a.type === 'fold' || a.type === 'check') {
      if (a.type === 'check' && ctx.canCheck) return null;
      return { rule, verdict: fromRange[verdicts[options.length - 1]!], detail: solverDetail('fold', false) };
    }
    const gi = label ? spot.groups.findIndex((g) => g.labels.includes(label!)) : -1;
    if (gi >= 0) return { rule, verdict: fromRange[verdicts[gi]!], detail: solverDetail(spot.groups[gi]!.name, false) };
    if (a.type === 'raise' || a.type === 'bet') {
      // podbicie innym rozmiarem niż w drzewie solvera: ocena akcji grupy podbić, rozmiar osobno (ADR-22)
      const ri = spot.groups.findIndex((g) => g.labels.some((l) => l.startsWith('raise') || l === 'all-in'));
      if (ri >= 0) return { rule, verdict: fromRange[verdicts[ri]!], detail: solverDetail(spot.groups[ri]!.name, true), sizeMismatch: true };
    }
    // akcja spoza siatki (np. sprawdzenie z SB wobec Buttona): częstość tej akcji w węźle solvera
    if (label) {
      const raw = spot.actions.map((x) => x.freqs[h] ?? 0);
      const i = spot.actions.findIndex((x) => x.label === label);
      const rawOptions = spot.actions.map((x) => ({ name: x.label, f: x.freqs[h] ?? 0 }));
      return { rule, verdict: fromRange[rangeVerdict(raw, ctx.kit.thresholds)[i]!], detail: { kind: 'solver', spot: spot.id, handClass: hc, options: rawOptions, chosen: label, sizeMismatch: false, uncertain: false } };
    }
    return null;
  },

  'open-size': (ctx, rule) => {
    const a = ctx.action;
    if (ctx.st.street !== 'preflop' || a.type !== 'raise') return null;
    if (voluntaryBefore(ctx).some((e) => e.type !== 'fold')) return null;
    const { sb } = tableSeats(ctx.st.seats.length, ctx.st.config.button);
    const expected = Number(ctx.seat === sb && ctx.st.seats.length > 2 ? rule.check.params.openSb : rule.check.params.open);
    return sizeCandidate(rule, expected, (a.to ?? 0) / ctx.bb);
  },

  'three-bet-size': (ctx, rule) => {
    const a = ctx.action;
    if (ctx.st.street !== 'preflop' || a.type !== 'raise') return null;
    const raises = raisesBefore(ctx);
    if (raises.length !== 1) return null;
    const open = raises[0]!;
    if (ctx.pre.slice(ctx.pre.indexOf(open) + 1).some((e) => e.type === 'call')) return null;
    const ip = postflopOrder(ctx.st, ctx.seat) > postflopOrder(ctx.st, open.seat);
    if ((rule.check.params.position === 'ip') !== ip) return null;
    const me = ctx.st.seats[ctx.seat]!;
    if (a.to === me.stack + me.streetBet) return null;
    return sizeCandidate(rule, (Number(rule.check.params.mult) * open.to) / ctx.bb, (a.to ?? 0) / ctx.bb);
  },

  'iso-size': (ctx, rule) => {
    const a = ctx.action;
    if (ctx.st.street !== 'preflop' || a.type !== 'raise') return null;
    if (raisesBefore(ctx).length) return null;
    const limpers = ctx.pre.filter((e) => e.type === 'call');
    if (!limpers.length) return null;
    const oop = limpers.every((e) => postflopOrder(ctx.st, ctx.seat) < postflopOrder(ctx.st, e.seat));
    const p = rule.check.params;
    const expected = Number(p.base) + Number(p.perLimper) * limpers.length + (oop ? Number(p.oopExtra) : 0);
    return sizeCandidate(rule, expected, (a.to ?? 0) / ctx.bb);
  },

  'cbet-case': (ctx, rule) => {
    const st = ctx.st;
    if (st.street !== 'flop' || !ctx.solverFormat || !ctx.canCheck) return null;
    const raises = st.events.filter((e) => e.street === 'preflop' && (e.type === 'raise' || e.type === 'bet'));
    if (raises.length !== 1 || raises[0]!.seat !== ctx.seat) return null;
    const live = st.seats.filter((s) => !s.folded);
    if (live.length !== 2) return null;
    const opp = live.find((s) => s.seat !== ctx.seat)!;
    if (postflopOrder(st, ctx.seat) < postflopOrder(st, opp.seat)) return null;
    const tex = classifyFlop(st.board);
    const c = (rule.check.cases ?? []).find((x) => textureMatches(tex, x.when));
    if (!c || c.rule !== rule.id) return null;
    const a = ctx.action;
    let chosen: 'check' | 'small' | 'big';
    let frac: number | null = null;
    if (a.type === 'check') chosen = 'check';
    else if (a.type === 'bet') {
      frac = (a.to ?? 0) / ctx.pot;
      chosen = frac <= (ctx.kit.cbet.small + ctx.kit.cbet.big) / 2 ? 'small' : 'big';
    } else return null;
    // reguły c-betu są częstotliwościowe („często”, „rzadziej”): rzadsza akcja jest dopuszczalna, nie błędem (5.2)
    let verdict: Verdict;
    if (c.best === 'check') verdict = chosen === 'check' ? 'compliant' : 'acceptable';
    else verdict = chosen === 'check' ? 'acceptable' : chosen === c.best ? 'compliant' : 'inaccuracy';
    return { rule, verdict, detail: { kind: 'cbet', best: c.best, chosen, betFraction: frac } };
  },

  'draw-price': (ctx, rule) => {
    const d = drawFacts(ctx);
    if (!d) return null;
    const a = ctx.action.type;
    const detail: GradeDetail = { kind: 'draw', ...d.base };
    if (a === 'fold') return { rule, verdict: d.base.hit >= d.base.required ? 'mistake' : 'compliant', detail };
    if (a === 'call') return { rule, verdict: d.base.hit >= d.base.required ? 'compliant' : 'mistake', detail };
    return null;
  },

  'implied-odds': (ctx, rule) => {
    const d = drawFacts(ctx);
    if (!d || ctx.action.type !== 'call' || d.base.hit >= d.base.required) return null;
    const st = ctx.st;
    const me = st.seats[ctx.seat]!;
    const { outs, unseen } = d.base;
    // R-M7-008: po trafieniu trzeba wygrać łącznie co najmniej dopłata × (nietrafiające ÷ outy); ponad pulę to implied odds
    const neededExtra = (ctx.toCall * (unseen - outs)) / outs - ctx.pot;
    const myBehind = me.stack - ctx.toCall;
    const oppBehind = Math.max(...st.seats.filter((s) => !s.folded && s.seat !== ctx.seat).map((s) => s.stack));
    const available = Math.max(0, Math.min(myBehind, oppBehind));
    const spr = available / (ctx.pot + ctx.toCall);
    const sprMin = Number(rule.check.params.sprMin);
    const mathOk = neededExtra <= available;
    const nutDraw = drawsToNuts(me.hole, st.board);
    const verdict: Verdict = mathOk && spr >= sprMin && nutDraw ? 'acceptable' : 'mistake';
    return { rule, verdict, detail: { kind: 'draw', ...d.base, implied: { neededExtra, available, spr, sprMin, nutDraw, mathOk } } };
  },
};

function sizeCandidate(rule: EvalRule, expectedBb: number, actualBb: number): Candidate {
  return { rule, verdict: near(expectedBb, actualBb) ? 'compliant' : 'inaccuracy', detail: { kind: 'size', expectedBb, actualBb }, sizeOnly: true };
}

/** Fakty o drawie wobec zakładu (dokument 14, 5.4): outy z samych drawów, dokładna szansa z kart nieznanych. */
function drawFacts(ctx: Ctx): { base: { outs: number; unseen: number; cards: 1 | 2; hit: number; required: number } } | null {
  const st = ctx.st;
  if ((st.street !== 'flop' && st.street !== 'turn') || ctx.toCall <= 0) return null;
  const me = st.seats[ctx.seat]!;
  const h = classifyHolding(me.hole, st.board);
  // gotowa ręka z kartą gracza (para i lepsza): equity to nie same outy, reguła nie pasuje
  if (h.improvesBoard) return null;
  const outs = drawOuts(me.hole, st.board).all.length;
  if (outs === 0) return null;
  const unseen = 52 - 2 - st.board.length;
  // na flopie sprawdzenie zakładu kupuje jedną kartę, chyba że wpłaca cały stack (R-M2-001, R-M2-002)
  const cards: 1 | 2 = st.street === 'flop' && ctx.toCall >= me.stack ? 2 : 1;
  const hit = hitProbability(outs, unseen, cards);
  const required = ctx.toCall / (ctx.pot + ctx.toCall);
  return { base: { outs, unseen, cards, hit, required } };
}

/**
 * Udział outów, po których gracz ma najlepszą możliwą rękę (żadna para kart spoza widocznych jej nie bije).
 * Do warunku R-M7-009 „dobierasz do najlepszej ręki”.
 */
export function nutOutsShare(hole: readonly [Card, Card], board: readonly Card[]): number {
  const outs = drawOuts(hole, board).all;
  if (!outs.length) return 0;
  let nuts = 0;
  for (const out of outs) {
    const b = [...board, out];
    const mine = strength([...hole, ...b]);
    const dead = new Set([...hole, ...b]);
    const rest = FULL_DECK.filter((c) => !dead.has(c));
    let beaten = false;
    for (let i = 0; i < rest.length && !beaten; i++) {
      for (let j = i + 1; j < rest.length; j++) {
        if (strength([rest[i]!, rest[j]!, ...b]) < mine) {
          beaten = true;
          break;
        }
      }
    }
    if (!beaten) nuts++;
  }
  return nuts / outs.length;
}

/**
 * Dobieranie do najlepszej ręki (R-M7-009): co najmniej połowa outów daje najlepszą możliwą rękę. Nazwane
 * uproszczenia: próg „połowa” (out parujący stół zawsze dopuszcza fulla, więc „każdy out” prawie nigdy by nie
 * zachodził) i pominięty warunek „trafienie nie rzuca się w oczy” (nie da się go sprawdzić rachunkiem).
 */
export const NUT_DRAW_MIN_SHARE = 0.5;
export function drawsToNuts(hole: readonly [Card, Card], board: readonly Card[]): boolean {
  return nutOutsShare(hole, board) >= NUT_DRAW_MIN_SHARE;
}

/**
 * Ocena całego rozdania z zapisu: odtwarza je i ocenia każdą decyzję gracza `heroSeat`. `timeouts` to indeksy
 * akcji wykonanych automatycznie po przekroczeniu limitu czasu (5.11): werdykt „przekroczony czas”, bez reguły.
 */
export function gradeHand(
  config: TableConfig,
  seed: number,
  actions: readonly { seat: number; action: PlayerAction }[],
  heroSeat: number,
  kit: GradingKit,
  opts: { preset?: HandPreset; timeouts?: readonly number[] } = {},
): Finding[] {
  let st = startHand(config, seed, opts.preset);
  const out: Finding[] = [];
  actions.forEach((a, i) => {
    if (st.toAct !== a.seat) throw new Error(`gradeHand: mówi miejsce ${st.toAct}, a zapis ma ${a.seat}`);
    if (a.seat === heroSeat) {
      const f = gradeDecision(st, a.action, kit, i);
      if (opts.timeouts?.includes(i)) {
        out.push({ ...f, verdict: 'timeout', ruleId: null, level: null, detail: { kind: 'timeout', auto: a.action.type === 'check' ? 'check' : 'fold' }, alsoRules: f.ruleId ? [f.ruleId, ...f.alsoRules] : f.alsoRules });
      } else out.push(f);
    }
    st = applyAction(st, a.action);
  });
  return out;
}

/** Automatyczna akcja po przekroczeniu czasu (5.11): czekanie, gdy darmowe, inaczej pas. */
export function timeoutAction(st: HandState): PlayerAction {
  return legalActions(st).canCheck ? { type: 'check' } : { type: 'fold' };
}

/** Składa GradingKit z treści: reguły z check, spoty 6-max 100bb, progi ADR-26 i rozmiary c-betu z numbers.yaml. */
export function gradingKitFrom(src: {
  number: (key: string) => number;
  rules: readonly EvalRule[];
  spots: readonly (EvalSpot & { solver: string })[];
  solverFile: string;
  players: number;
}): GradingKit {
  const n = src.number;
  return {
    rules: src.rules,
    spots: src.spots.filter((s) => s.solver === src.solverFile),
    thresholds: { mixedMin: n('range.mixed.min'), mixedLow: n('range.mixed.low') },
    cbet: { small: n('cbet.size.small'), big: n('cbet.size.big') },
    solverFormat: { players: src.players, stackBb: n('format.stack') },
  };
}
