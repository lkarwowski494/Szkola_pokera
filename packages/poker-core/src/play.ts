import type { Card } from './cards';
import { dealCards } from './cards';
import { botDecide, botView, type BotKnowledge, type BotStyle } from './bots';
import { drawOuts } from './draws';
import { gradeHand, type Finding, type GradingKit } from './grading';
import { classifyHolding } from './holding';
import { classCombos, combosCount, HAND_CLASSES } from './ranges';
import { createRng, pick, randInt, type Rng } from './rng';
import { situationAt, type GameSituation } from './situation';
import {
  applyAction,
  legalActions,
  positionNames,
  tableSeats,
  startHand,
  validateAction,
  type HandPreset,
  type HandState,
  type PlayerAction,
  type Street,
  type TableConfig,
} from './table';
import { textureMatches, type TextureFilter, classifyFlop } from './texture';

/**
 * Przebieg sesji trybu gry M13 (dokument 14, 4.1): rozdania z rotacją buttona, boty, decyzje gracza, ocena po
 * rozdaniu. Gracz zawsze siedzi na miejscu 0. W trybie obszaru generator ustawia sytuację przed decyzją gracza
 * (scenariusz akcji, także automatycznych akcji gracza przed pierwszą ocenianą decyzją), a dalej rozdanie toczy się
 * normalnie (4.3). Czysty TypeScript: ekran stołu tylko wywołuje te funkcje i rysuje stan.
 */

export const HERO_SEAT = 0;

export type AreaGeneratorId = 'flop-draw' | 'rfi' | 'vs-open' | 'cbet-ip' | 'turn-draw';

export interface PlayConfig {
  players: number;
  stackBb: number;
  /** Duży blind w żetonach (mały blind = połowa). */
  bigBlind: number;
  /** Style rywali dla miejsc 1…players−1. */
  seatStyles: readonly BotStyle[];
  hands: number;
  seed: number;
  area: AreaGeneratorId | null;
}

/** Krok scenariusza obszaru: akcja miejsca na danej ulicy (także gracza, wtedy jest automatyczna i nieoceniana). */
export interface ScriptStep {
  street: Street;
  seat: number;
  action: PlayerAction;
}

export interface PlayHand {
  handNo: number;
  seed: number;
  config: TableConfig;
  preset: HandPreset | null;
  state: HandState;
  script: ScriptStep[];
  /** Indeksy akcji gracza wykonanych przez scenariusz (nieoceniane). */
  auto: number[];
  /** Indeksy akcji gracza wykonanych po przekroczeniu czasu (5.11). */
  timeouts: number[];
}

/** Dane do generatorów obszarów: spoty solvera, rozmiary i przypadki c-betu z treści. */
export interface AreaContext {
  spots: readonly { id: string; hero: string; path: string; groups: readonly { freqs: readonly number[] }[]; uncertain: readonly string[] }[];
  sizes: BotKnowledge['sizes'];
  cbetCases: readonly { when: TextureFilter }[];
}

export function handSeed(sessionSeed: number, handNo: number): number {
  return (Math.imul(sessionSeed >>> 0, 1000003) + handNo * 7919 + 17) >>> 0;
}

/** Button, przy którym gracz (miejsce 0) ma daną pozycję. */
export function buttonFor(players: number, position: string): number {
  const p = positionNames(players).indexOf(position);
  if (p < 0) throw new Error(`Nieznana pozycja ${position} przy ${players} graczach`);
  // pierwszy mówiący przed flopem to (button + 3) mod n (heads-up: button), a gracz ma indeks p w kolejności
  for (let b = 0; b < players; b++) if ((tableSeats(players, b).firstPreflop + p) % players === HERO_SEAT) return b;
  throw new Error('buttonFor: brak buttona');
}

function seatOf(players: number, button: number, position: string): number {
  const p = positionNames(players).indexOf(position);
  return (tableSeats(players, button).firstPreflop + p) % players;
}

/** Scenariusz z ścieżki solvera („UTG:fold,HJ:fold,CO:raise2.5”). */
function scriptFromPath(players: number, button: number, path: string, bb: number): ScriptStep[] {
  if (!path) return [];
  return path.split(',').map((tok) => {
    const [pos, act] = tok.split(':') as [string, string];
    const seat = seatOf(players, button, pos);
    if (act === 'fold') return { street: 'preflop', seat, action: { type: 'fold' } };
    if (act === 'call') return { street: 'preflop', seat, action: { type: 'call' } };
    if (act.startsWith('raise')) return { street: 'preflop', seat, action: { type: 'raise', to: Math.round(Number(act.slice(5)) * bb) } };
    throw new Error(`Nieobsługiwana akcja w ścieżce: ${tok}`);
  });
}

/** Klasa ręki do zadania: wagi kombinacje × (0,25 + 4·p·(1−p)), jak w zadaniach z zakresów; bez klas niepewnych. */
function sampleSpotClass(rng: Rng, spot: AreaContext['spots'][number], weightOf?: (play: number) => number): string {
  const unc = new Set(spot.uncertain);
  const w = HAND_CLASSES.map((hc, h) => {
    if (unc.has(hc)) return 0;
    const play = spot.groups.reduce((s, g) => s + (g.freqs[h] ?? 0), 0);
    return combosCount(hc) * (weightOf ? weightOf(play) : 0.25 + 4 * play * (1 - play));
  });
  let x = rng() * w.reduce((a, b) => a + b, 0);
  for (let h = 0; h < w.length; h++) {
    x -= w[h]!;
    if (x < 0) return HAND_CLASSES[h]!;
  }
  return HAND_CLASSES[HAND_CLASSES.length - 1]!;
}

function comboOf(rng: Rng, hc: string, dead: readonly Card[] = []): [Card, Card] {
  const d = new Set(dead);
  const combos = classCombos(hc).filter(([a, b]) => !d.has(a) && !d.has(b));
  return pick(rng, combos);
}

function holesWithHero(players: number, hero: [Card, Card]): ([Card, Card] | null)[] {
  return Array.from({ length: players }, (_, s) => (s === HERO_SEAT ? hero : null));
}

/** Rozdanie z obszaru: button, karty ustalone z góry i scenariusz akcji do pierwszej decyzji gracza. */
export function areaDeal(area: AreaGeneratorId, rng: Rng, players: number, bb: number, ctx: AreaContext): { button: number; preset: HandPreset; script: ScriptStep[] } {
  const spotsBy = (prefix: string) => ctx.spots.filter((s) => s.id.startsWith(prefix));
  switch (area) {
    case 'rfi':
    case 'vs-open': {
      const list = spotsBy(area === 'rfi' ? 'rfi.' : 'vs-open.');
      // w obszarze M4 część rozdań to limperzy przed graczem (R-M4-012)
      if (area === 'vs-open' && rng() < 1 / (list.length + 1)) return limpDeal(rng, players, ctx);
      const spot = pick(rng, list);
      const button = buttonFor(players, spot.hero);
      const hero = comboOf(rng, sampleSpotClass(rng, spot));
      return { button, preset: { holes: holesWithHero(players, hero) }, script: scriptFromPath(players, button, spot.path, bb) };
    }
    case 'cbet-ip':
    case 'flop-draw':
    case 'turn-draw':
      return postflopDeal(area, rng, players, bb, ctx);
  }
}

function limpDeal(rng: Rng, players: number, ctx: AreaContext) {
  const heroPos = pick(rng, ['CO', 'BTN'] as const);
  const button = buttonFor(players, heroPos);
  const limpers = 1 + randInt(rng, 2);
  const rfi = ctx.spots.find((s) => s.id === `rfi.${heroPos.toLowerCase()}`) ?? ctx.spots[0]!;
  const hero = comboOf(rng, sampleSpotClass(rng, rfi));
  const order = positionNames(players);
  const script: ScriptStep[] = [];
  for (const pos of order.slice(0, order.indexOf(heroPos))) {
    const seat = seatOf(players, button, pos);
    script.push({ street: 'preflop', seat, action: script.filter((s) => s.action.type === 'call').length < limpers ? { type: 'call' } : { type: 'fold' } });
  }
  return { button, preset: { holes: holesWithHero(players, hero) }, script };
}

/** Otwarcie z Buttona, sprawdzenie dużego blinda, flop (i turn) z teksturą albo dobieraniem gracza. */
function postflopDeal(area: 'cbet-ip' | 'flop-draw' | 'turn-draw', rng: Rng, players: number, bb: number, ctx: AreaContext) {
  const button = buttonFor(players, 'BTN');
  const btnSpot = ctx.spots.find((s) => s.id === 'rfi.btn');
  if (!btnSpot) throw new Error('Obszar wymaga spotu rfi.btn');
  // ręka, którą Button otwiera (waga = częstość otwarcia)
  const openHand = () => comboOf(rng, sampleSpotClass(rng, btnSpot, (p) => p));
  let hero: [Card, Card];
  let board: Card[];
  for (let tries = 0; ; tries++) {
    if (tries > 5000) throw new Error(`Generator obszaru ${area} nie znalazł rozdania`);
    hero = openHand();
    if (area === 'cbet-ip') {
      const c = pick(rng, ctx.cbetCases);
      const flop = dealCards(rng, 3, hero);
      if (!textureMatches(classifyFlop(flop), c.when)) continue;
      board = [...flop, ...dealCards(rng, 2, [...hero, ...flop])];
      break;
    }
    const street = area === 'flop-draw' ? 3 : 4;
    const vis = dealCards(rng, street, hero);
    const h = classifyHolding(hero, vis);
    const d = drawOuts(hero, vis);
    if (d.kind === 'none' || h.improvesBoard) continue;
    // na turn-draw flop też bez gotowej ręki gracza, żeby czekanie na flopie było naturalne
    board = [...vis, ...dealCards(rng, 5 - street, [...hero, ...vis])];
    break;
  }
  const order = positionNames(players);
  const seat = (pos: string) => seatOf(players, button, pos);
  const script: ScriptStep[] = [];
  for (const pos of order.slice(0, order.indexOf('BTN'))) script.push({ street: 'preflop', seat: seat(pos), action: { type: 'fold' } });
  script.push({ street: 'preflop', seat: HERO_SEAT, action: { type: 'raise', to: Math.round(ctx.sizes.open * bb) } });
  script.push({ street: 'preflop', seat: seat('SB'), action: { type: 'fold' } });
  script.push({ street: 'preflop', seat: seat('BB'), action: { type: 'call' } });
  const pot = 2 * Math.round(ctx.sizes.open * bb) + bb / 2;
  const betFrac = () => pick(rng, [1 / 3, 1 / 2, 3 / 4, 1]);
  if (area === 'cbet-ip') script.push({ street: 'flop', seat: seat('BB'), action: { type: 'check' } });
  if (area === 'flop-draw') script.push({ street: 'flop', seat: seat('BB'), action: { type: 'bet', to: Math.round(betFrac() * pot) } });
  if (area === 'turn-draw') {
    script.push({ street: 'flop', seat: seat('BB'), action: { type: 'check' } });
    script.push({ street: 'flop', seat: HERO_SEAT, action: { type: 'check' } });
    script.push({ street: 'turn', seat: seat('BB'), action: { type: 'bet', to: Math.round(betFrac() * pot) } });
  }
  return { button, preset: { holes: holesWithHero(players, hero!), board: board! }, script };
}

/** Nowe rozdanie sesji: w grze swobodnej button krąży, w obszarze ustawia go generator. */
export function dealPlayHand(pc: PlayConfig, handNo: number, ctx: AreaContext | null): PlayHand {
  const seed = handSeed(pc.seed, handNo);
  const stacks = Array(pc.players).fill(Math.round(pc.stackBb * pc.bigBlind));
  let button = (handNo + (pc.seed % pc.players)) % pc.players;
  let preset: HandPreset | null = null;
  let script: ScriptStep[] = [];
  if (pc.area) {
    if (!ctx) throw new Error('dealPlayHand: obszar wymaga AreaContext');
    const d = areaDeal(pc.area, createRng(seed ^ 0x5bd1e995), pc.players, pc.bigBlind, ctx);
    button = d.button;
    preset = d.preset;
    script = d.script;
  }
  const config: TableConfig = { stacks, smallBlind: pc.bigBlind / 2, bigBlind: pc.bigBlind, button };
  const state = startHand(config, seed, preset ?? undefined);
  return { handNo, seed, config, preset, state, script, auto: [], timeouts: [] };
}

/** Kto teraz działa: gracz (decyzja oceniana), automat (bot albo scenariusz) albo nikt (koniec rozdania). */
export function nextActor(hp: PlayHand): 'hero' | 'auto' | 'done' {
  const st = hp.state;
  if (st.toAct === null) return 'done';
  const head = hp.script[0];
  if (head && head.street === st.street && head.seat === st.toAct && validateAction(st, head.action) === null) return 'auto';
  return st.toAct === HERO_SEAT ? 'hero' : 'auto';
}

function botRng(hp: PlayHand): Rng {
  // osobny strumień losowy na każdą decyzję: decyzje botów nie zależą od tempa gracza ani od wcześniejszych wywołań
  return createRng((hp.seed ^ Math.imul(hp.state.actions.length + 1, 0x9e3779b1)) >>> 0);
}

/** Jedna akcja automatu: krok scenariusza (gdy pasuje i jest legalny) albo decyzja bota. */
export function stepAuto(hp: PlayHand, knowledge: BotKnowledge, pc: PlayConfig): PlayHand {
  const st = hp.state;
  if (st.toAct === null) return hp;
  const head = hp.script[0];
  if (head && head.street === st.street && head.seat === st.toAct && validateAction(st, head.action) === null) {
    const auto = st.toAct === HERO_SEAT ? [...hp.auto, st.actions.length] : hp.auto;
    return { ...hp, state: applyAction(st, head.action), script: hp.script.slice(1), auto };
  }
  if (st.toAct === HERO_SEAT) throw new Error('stepAuto: teraz decyduje gracz');
  // scenariusz rozjechał się z grą (np. gracz zagrał inaczej): dalej grają boty
  const style = pc.seatStyles[st.toAct - 1];
  if (!style) throw new Error(`Brak stylu dla miejsca ${st.toAct}`);
  const action = botDecide(botView(st), knowledge, style, botRng(hp));
  return { ...hp, state: applyAction(st, action), script: [] };
}

export function heroAct(hp: PlayHand, action: PlayerAction, timedOut = false): PlayHand {
  if (hp.state.toAct !== HERO_SEAT) throw new Error('heroAct: teraz nie decyduje gracz');
  const idx = hp.state.actions.length;
  return { ...hp, state: applyAction(hp.state, action), script: [], timeouts: timedOut ? [...hp.timeouts, idx] : hp.timeouts };
}

/** Automat aż do decyzji gracza albo końca rozdania (do testów i symulacji; ekran stołu idzie krok po kroku). */
export function runAuto(hp: PlayHand, knowledge: BotKnowledge, pc: PlayConfig): PlayHand {
  let h = hp;
  for (let i = 0; i < 500 && nextActor(h) === 'auto'; i++) h = stepAuto(h, knowledge, pc);
  return h;
}

export interface HandReport {
  findings: Finding[];
  situations: Map<number, GameSituation>;
  /** Wynik gracza w bb (drugorzędny, 5.8). */
  resultBb: number;
}

/** Ocena zakończonego rozdania (decyzje gracza poza automatycznymi) i sytuacje do kart. */
export function finishPlayHand(hp: PlayHand, kit: GradingKit): HandReport {
  const st = hp.state;
  if (st.result === null) throw new Error('finishPlayHand: rozdanie trwa');
  const all = gradeHand(hp.config, hp.seed, st.actions, HERO_SEAT, kit, { ...(hp.preset ? { preset: hp.preset } : {}), timeouts: hp.timeouts });
  const findings = all.filter((f) => !hp.auto.includes(f.index));
  const situations = new Map(findings.map((f) => [f.index, situationAt(hp.config, hp.seed, st.actions, f.index, hp.preset ?? undefined)]));
  return { findings, situations, resultBb: st.result.net[HERO_SEAT]! / hp.config.bigBlind };
}

// ---------- przyciski akcji (ADR-22: akcja z rozmiarem w jednym przycisku) ----------

export interface MenuItem {
  kind: 'fold' | 'check' | 'call' | 'bet' | 'raise' | 'allin';
  action: PlayerAction;
  /** Kwota w bb: dopłata (call) albo łączna kwota zakładu (bet, raise, all-in). */
  bb: number;
  /** Zakład jako część puli przed zakładem (po flopie). */
  potFraction?: number;
}

/** Podbicie po flopie: do tylu razy zakładu rywala (rozmiar przycisku, nie twierdzenie kursu). */
export const POSTFLOP_RAISE_MULTIPLE = 3;

/**
 * Przyciski decyzji w stanie stołu. Rozmiary z treści (te same co w lekcjach): przed flopem otwarcie 2,5bb i 3bb,
 * izolacja z pozycją i bez, 3-bet 3x i 4x, 4-bet z pozycją i bez; po flopie mały i duży zakład z M5 oraz all-in.
 * Dwa rozmiary tej samej akcji pozwalają ocenić wybór rozmiaru (niedokładność, ADR-22).
 */
export function actionMenu(st: HandState, sizes: BotKnowledge['sizes']): MenuItem[] {
  const la = legalActions(st);
  const bb = st.config.bigBlind;
  const me = st.seats[la.seat]!;
  const items: MenuItem[] = [];
  if (!la.canCheck) items.push({ kind: 'fold', action: { type: 'fold' }, bb: 0 });
  if (la.canCheck) items.push({ kind: 'check', action: { type: 'check' }, bb: 0 });
  if (la.callAmount !== null) items.push({ kind: la.callAmount >= me.stack ? 'allin' : 'call', action: { type: 'call' }, bb: (me.streetBet + la.callAmount) / bb });
  if (la.minTo !== null && la.maxTo !== null) {
    const pot = st.seats.reduce((s, x) => s + x.committed, 0);
    const targets: { to: number; frac?: number }[] = [];
    if (st.street === 'preflop') {
      const pre = st.events.filter((e) => e.street === 'preflop' && (e.type === 'raise' || e.type === 'call'));
      const raises = pre.filter((e) => e.type === 'raise');
      if (raises.length === 0) {
        const limpers = pre.filter((e) => e.type === 'call').length;
        if (limpers === 0) targets.push({ to: sizes.open * bb }, { to: sizes.openSb * bb });
        else {
          const iso = sizes.isoBase + sizes.isoPerLimper * limpers;
          targets.push({ to: iso * bb }, { to: (iso + sizes.isoOopExtra) * bb });
        }
      } else if (raises.length === 1) {
        const open = raises[0]!.to;
        targets.push({ to: sizes.threeBetIp * open }, { to: sizes.threeBetOop * open });
      } else if (raises.length === 2) {
        const tb = raises[1]!.to;
        targets.push({ to: sizes.fourBetIp * tb }, { to: sizes.fourBetOop * tb });
      }
    } else if (la.aggressive === 'bet') {
      targets.push({ to: sizes.cbetSmall * pot, frac: sizes.cbetSmall }, { to: sizes.cbetBig * pot, frac: sizes.cbetBig });
    } else {
      targets.push({ to: POSTFLOP_RAISE_MULTIPLE * st.currentBet });
    }
    const seen = new Set<number>();
    for (const t of targets) {
      const to = Math.round(t.to);
      if (to < la.minTo || to >= la.maxTo || seen.has(to)) continue;
      seen.add(to);
      items.push({ kind: la.aggressive, action: { type: la.aggressive, to }, bb: to / bb, ...(t.frac !== undefined ? { potFraction: t.frac } : {}) });
    }
    items.push({ kind: 'allin', action: { type: la.aggressive, to: la.maxTo }, bb: la.maxTo / bb });
  }
  return items;
}
