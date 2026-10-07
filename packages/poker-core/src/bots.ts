import type { Card } from './cards';
import { remainingDeck } from './cards';
import { classifyHolding, type HoldingClass } from './holding';
import { hitProbability } from './math';
import { classOf, combosCount, HAND_CLASSES, type HandClass } from './ranges';
import type { Rng } from './rng';
import { legalActions, positionNames, tableSeats, type HandEvent, type HandState, type LegalActions, type PlayerAction, type Street } from './table';
import { classifyFlop, textureMatches, type TextureFilter } from './texture';

/**
 * Boty trybu gry M13 (dokument 14, 4.4.2; decyzja techniczna 6.3 A: kod w poker-core, parametry w jednym miejscu
 * z numerem wersji). Wszystkie parametry modelu bota są w BOT_POLICY; liczby z treści (rozmiary, częstości wobec
 * 3-betu, przypadki c-betu, zakresy solvera) przychodzą z zewnątrz w BotKnowledge, budowanym z bazy treści.
 *
 * Polityka bazowa:
 * - przed flopem: w spotach solvera zwalidowanych w dokumencie 10 (spoty z content/ranges/spots.yaml) losowanie akcji
 *   z częstości solvera; w pozostałych spotach heurystyki według reguł M4 (R-M4-001–013) na rankingu rąk,
 * - po flopie: klasa siły ręki (holding.ts), tekstura, cena sprawdzenia, liczba rywali, pozycja, z losowością;
 *   c-bet według przypadków z lekcji M5.
 * Styl modyfikuje politykę bazową (looseness: szerzej/węziej przed flopem i częściej/rzadziej sprawdza po flopie;
 * aggression: przesuwa masę między sprawdzeniem a podbiciem), na wzór „virtual incentives” z profili GTO Wizard.
 *
 * Bot widzi tylko BotView: swoje karty, karty wspólne i publiczne akcje (nie widzi kart gracza ani talii).
 * Parametry BOT_POLICY to model przeciwnika, nie twierdzenia kursu: nie trafiają do treści i nie oceniają gracza
 * (ocena odnosi się do bazy GTO i reguł, dokument 14, 5.5). Do kalibracji testami (dokument 14, sekcja 9).
 */

export type StyleId = 'balanced' | 'tight-passive' | 'tight-aggressive' | 'loose-passive' | 'loose-aggressive';
export const STYLE_IDS: readonly StyleId[] = ['balanced', 'tight-passive', 'tight-aggressive', 'loose-passive', 'loose-aggressive'];

/** looseness i aggression w przedziale [−1, 1]; 0 = polityka bazowa. */
export interface BotStyle {
  looseness: number;
  aggression: number;
}

export type TablePresetId = 'balanced' | 'loose-passive' | 'tight-aggressive' | 'loose-aggressive' | 'mixed';

export const BOT_POLICY = {
  version: 1,
  styles: {
    balanced: { looseness: 0, aggression: 0 },
    'tight-passive': { looseness: -0.5, aggression: -0.6 },
    'tight-aggressive': { looseness: -0.4, aggression: 0.5 },
    'loose-passive': { looseness: 0.6, aggression: -0.6 },
    'loose-aggressive': { looseness: 0.5, aggression: 0.6 },
  } satisfies Record<StyleId, BotStyle>,
  /** Gotowe zestawy stołów (pięciu rywali; dokument 14, decyzja właściciela P13). */
  tables: {
    balanced: ['balanced', 'balanced', 'balanced', 'balanced', 'balanced'],
    'loose-passive': ['loose-passive', 'loose-passive', 'loose-passive', 'loose-passive', 'loose-passive'],
    'tight-aggressive': ['tight-aggressive', 'tight-aggressive', 'tight-aggressive', 'tight-aggressive', 'tight-aggressive'],
    'loose-aggressive': ['loose-aggressive', 'loose-aggressive', 'loose-aggressive', 'loose-aggressive', 'loose-aggressive'],
    mixed: ['loose-passive', 'tight-aggressive', 'balanced', 'loose-aggressive', 'tight-passive'],
  } satisfies Record<TablePresetId, readonly StyleId[]>,
  style: {
    /** Jaka część pasów przechodzi do gry przy looseness = 1 (dla rąk tuż pod zakresem spotu; dla gorszych mniej). */
    preflopLoosen: 1,
    /** Rozluźnienie obejmuje ręce do tylu punktów percentyla poniżej szerokości zakresu spotu, malejąco. */
    loosenSpread: 0.5,
    /** Pasywny styl w spocie otwarcia: taka część rozluźnienia × |aggression| idzie w limp zamiast przebicia. */
    limp: 1,
    /** Jaka część gry przechodzi do pasa przy looseness = −1 (dla rąk na krawędzi zakresu spotu; dla lepszych mniej). */
    preflopTighten: 0.8,
    /** Mnożnik szerokości zakresów heurystycznych: szerokość × (1 + width × looseness). */
    width: 1,
    /** Jaka część sprawdzeń przechodzi w podbicie (aggression > 0) albo odwrotnie (aggression < 0). */
    shift: 0.5,
    /** Po flopie: częstość betowania i podbijania × (1 + bet × aggression). */
    postflopBet: 0.6,
    /** Po flopie: częstość pasa × (1 − fold × looseness). */
    postflopFold: 0.5,
  },
  preflop: {
    /** Ręce, które zawsze grają o stack wobec 4-betu i dalej (R-M4-010: AA, KK, AK 4-betują wobec 3-betu). */
    premium: ['AA', 'KK', 'AKs', 'AKo'] as readonly HandClass[],
    /** Wobec 4-betu: all-in, sprawdzenie. */
    vs4betJam: ['AA', 'KK'] as readonly HandClass[],
    vs4betCall: ['QQ', 'AKs'] as readonly HandClass[],
    /** Wobec all-inu (5-bet i dalej). */
    vsJamCall: ['AA', 'KK', 'QQ', 'AKs', 'AKo'] as readonly HandClass[],
    /** Wobec otwarcia poza spotami solvera (R-M4-005, R-M4-006): część zakresu otwierającego grana 3-betem i sprawdzeniem. */
    vsOpen: { threeBet: 0.25, call: 0.7, bbCall: 1.4, bluffs: ['A5s', 'A4s'] as readonly HandClass[], bluffFreq: 0.5 },
    /** Wobec limperów (R-M4-012, R-M4-013): izolacja węższym zakresem niż otwarcie, dopłata rękami spekulacyjnymi. */
    vsLimp: { iso: 0.6, overlimp: 1.2 },
    /** Wobec 3-betu, gdy bot nie otwierał (cold 4-bet / sprawdzenie): tylko najlepsze ręce. */
    coldVs3bet: { call: 0.02 },
    /** Otwarcie z pozycji, dla której nie ma spotu solvera, gdy za botem jest więcej graczy niż za UTG w 6-max. */
    earlyShrink: 0.8,
    /** Podbicie wpłacające taką część stacka lub więcej idzie od razu all-in. */
    commit: 0.4,
  },
  postflop: {
    /** Częstość betowania, gdy nikt nie postawił, według klasy ręki. */
    bet: { 'very-strong': 0.75, strong: 0.65, medium: 0.35, weak: 0.12, draw: 0.45, air: 0.2 } satisfies Record<HoldingClass, number>,
    /** Agresor preflop na flopie heads-up, przypadek c-betu „mały/duży”: słabe ręce betują co najmniej tak często. */
    cbetRange: 0.6,
    /** Przypadek c-betu „czekam” (R-M5-004): częstość × ten mnożnik. */
    cbetCheckCase: 0.5,
    /** Agresor bez pozycji (R-M5-012). */
    oopAggressor: 0.7,
    /** Bet bez inicjatywy, bez pozycji, na flopie (donk). */
    donk: 0.5,
    /** Kilku rywali (R-M5-013): blefy i drawy × ten mnożnik. */
    multiwayBluff: 0.3,
    /** Wobec zakładu: częstość podbicia według klasy. */
    raise: { 'very-strong': 0.35, strong: 0.08, medium: 0.02, weak: 0, draw: 0.15, air: 0.04 } satisfies Record<HoldingClass, number>,
    /** Wobec zakładu: próg ceny (call ÷ (pula + call)), do którego klasa zwykle sprawdza, i częstość sprawdzenia poniżej i powyżej progu. */
    call: {
      strong: { price: 0.45, below: 1, above: 0.6 },
      medium: { price: 0.3, below: 0.85, above: 0.35 },
      weak: { price: 0.2, below: 0.45, above: 0.1 },
    },
    /** Dobieranie bez ceny sprawdza z implied odds, gdy stack za pulą to co najmniej tyle sprawdzeń. */
    impliedStackCalls: 10,
    impliedCall: 0.5,
    /** Podbicie do tylu razy zakładu rywala. */
    raiseMultiple: 3,
    /** Stack po zakładzie poniżej tej części puli: bot idzie all-in. */
    commitPot: 0.3,
  },
} as const;

export const BOT_POLICY_VERSION = BOT_POLICY.version;

export function styleOf(id: StyleId): BotStyle {
  return BOT_POLICY.styles[id];
}

/**
 * Style rywali zestawu stołu dla `players` graczy (rywale na miejscach 1…players−1). Zestawy mają pięciu rywali
 * (stół 6-osobowy); przy większym stole kolejne miejsca powtarzają zestaw od początku.
 */
export function presetStyles(id: TablePresetId, players: number): StyleId[] {
  const t = BOT_POLICY.tables[id];
  return Array.from({ length: players - 1 }, (_, i) => t[i % t.length]!);
}

/** Częstości jednego węzła solvera dla 169 klas (kolejność HAND_CLASSES). Etykiety jak w wyniku solvera: „fold”, „call 2.5”, „raise 7.5”, „all-in”. */
export interface PreflopSolverSpot {
  hero: string;
  /** Ścieżka akcji w drzewie solvera, np. „UTG:fold,HJ:fold,CO:raise2.5”. */
  path: string;
  actions: readonly { label: string; freqs: readonly number[] }[];
}

/** Wiedza bota z treści (content-build): jedno źródło prawdy, bez kopiowania liczb do kodu. */
export interface BotKnowledge {
  /** Format, dla którego policzono spoty solvera; w innych formatach bot gra z heurystyk. */
  solverFormat: { players: number; stackBb: number };
  /** Tylko spoty zwalidowane (dokument 10). */
  spots: readonly PreflopSolverSpot[];
  /** 169 klas od najsilniejszej (equity wobec losowej ręki, obliczenie z tools/equity/equity169.json). */
  handRanking: readonly HandClass[];
  sizes: {
    /** Otwarcie i otwarcie z SB w bb (pf.open-size, pf.open-size-sb). */
    open: number;
    openSb: number;
    /** 3-bet: mnożnik otwarcia z pozycją i bez (pf.3bet.size-ip, pf.3bet.size-oop). */
    threeBetIp: number;
    threeBetOop: number;
    /** 4-bet: mnożnik 3-betu z pozycją i bez (środek przedziałów pf.4bet.size-*). */
    fourBetIp: number;
    fourBetOop: number;
    /** Izolacja limperów w bb (pf.iso.*). */
    isoBase: number;
    isoPerLimper: number;
    isoOopExtra: number;
    /** C-bet jako część puli (cbet.size.small, cbet.size.big). */
    cbetSmall: number;
    cbetBig: number;
  };
  /** Wobec 3-betu z pozycji rywala: udział pasa, sprawdzenia i 4-betu w zakresie otwarcia (środki pf.vs3bet.*). */
  vs3bet: { call: number; fourBet: number };
  /** Przypadki c-betu agresora z pozycją heads-up (lekcje M5, zadania kind: cbet). */
  cbetCases: readonly { when: TextureFilter; best: 'check' | 'small' | 'big' }[];
}

/** To, co bot wie w chwili decyzji: bez kart innych graczy i bez talii. */
export interface BotView {
  seat: number;
  position: string;
  hole: readonly [Card, Card];
  board: readonly Card[];
  street: Street;
  players: number;
  button: number;
  bigBlind: number;
  smallBlind: number;
  startStacks: readonly number[];
  stacks: readonly number[];
  streetBets: readonly number[];
  committed: readonly number[];
  folded: readonly boolean[];
  allIn: readonly boolean[];
  positions: readonly string[];
  events: readonly HandEvent[];
  currentBet: number;
  legal: LegalActions;
}

export function botView(state: HandState): BotView {
  if (state.toAct === null) throw new Error('botView: rozdanie zakończone');
  const me = state.seats[state.toAct]!;
  return {
    seat: me.seat,
    position: me.position,
    hole: me.hole,
    board: state.board.slice(),
    street: state.street,
    players: state.seats.length,
    button: state.config.button,
    bigBlind: state.config.bigBlind,
    smallBlind: state.config.smallBlind,
    startStacks: state.seats.map((s) => s.startStack),
    stacks: state.seats.map((s) => s.stack),
    streetBets: state.seats.map((s) => s.streetBet),
    committed: state.seats.map((s) => s.committed),
    folded: state.seats.map((s) => s.folded),
    allIn: state.seats.map((s) => s.allIn),
    positions: state.seats.map((s) => s.position),
    events: state.events.slice(),
    currentBet: state.currentBet,
    legal: legalActions(state),
  };
}

/** Decyzja bota. Deterministyczna przy tym samym `rng`. */
export function botDecide(view: BotView, knowledge: BotKnowledge, style: BotStyle, rng: Rng): PlayerAction {
  const a = view.street === 'preflop' ? preflopDecision(view, knowledge, style, rng) : postflopDecision(view, knowledge, style, rng);
  return legalize(view, a);
}

// ---------- wspólne ----------

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const pot = (v: BotView) => v.committed.reduce((a, b) => a + b, 0);

/** Pozycja po flopie: im większa, tym później mówi (ostatni ma pozycję). */
function postflopOrder(v: BotView, seat: number): number {
  const { firstPostflop } = tableSeats(v.players, v.button);
  return (seat - firstPostflop + v.players) % v.players;
}

function liveOpponents(v: BotView): number[] {
  return v.folded.flatMap((f, s) => (!f && s !== v.seat ? [s] : []));
}

/** Bot ma pozycję wobec wszystkich, którzy zostali w rozdaniu. */
function inPosition(v: BotView): boolean {
  const me = postflopOrder(v, v.seat);
  return liveOpponents(v).every((s) => postflopOrder(v, s) < me);
}

/** Dopasowuje akcję do legalnych kwot: zaokrągla, ogranicza, a podbicie bez prawa podbicia zamienia na sprawdzenie. */
function legalize(v: BotView, a: PlayerAction): PlayerAction {
  const la = v.legal;
  if (a.type === 'fold') return la.canCheck ? { type: 'check' } : a;
  if (a.type === 'check') return la.canCheck ? a : { type: 'fold' };
  if (a.type === 'call') return la.callAmount !== null ? a : { type: 'check' };
  if (la.minTo === null || la.maxTo === null) return la.callAmount !== null ? { type: 'call' } : { type: 'check' };
  let to = Math.round(a.to ?? la.minTo);
  // podbicie, po którym zostaje mało żetonów, idzie od razu all-in
  const after = la.maxTo - to;
  if (after < BOT_POLICY.postflop.commitPot * (pot(v) + to)) to = la.maxTo;
  to = Math.max(la.minTo, Math.min(la.maxTo, to));
  return { type: la.aggressive, to };
}

/** Losowanie akcji z wag (suma dowolna, ujemne jak 0). */
function sample<T>(rng: Rng, items: readonly { w: number; v: T }[]): T {
  const total = items.reduce((s, x) => s + Math.max(0, x.w), 0);
  if (total <= 0) return items[0]!.v;
  let r = rng() * total;
  for (const x of items) {
    r -= Math.max(0, x.w);
    if (r < 0) return x.v;
  }
  return items[items.length - 1]!.v;
}

// ---------- przed flopem ----------

/** Udział rąk silniejszych od klasy (0 = najlepsza ręka, ~1 = najgorsza), ważony kombinacjami. */
export function handPercentile(ranking: readonly HandClass[], hc: HandClass): number {
  let before = 0;
  for (const c of ranking) {
    if (c === hc) return (before + combosCount(c) / 2) / 1326;
    before += combosCount(c);
  }
  throw new Error(`Brak klasy ${hc} w rankingu rąk`);
}

/** Etykieta akcji w ścieżce solvera: fold, call, raise2.5, allin. */
function pathToken(e: HandEvent, bb: number): string {
  if (e.type === 'raise' || e.type === 'bet') return e.allIn ? 'allin' : `raise${Number((e.to / bb).toFixed(2))}`;
  return e.type;
}

/** Ścieżka akcji przed flopem w zapisie drzewa solvera, np. „UTG:fold,HJ:fold,CO:raise2.5”. */
export function solverPath(events: readonly HandEvent[], positions: readonly string[], bigBlind: number): string {
  return events
    .filter((e) => e.street === 'preflop' && e.type !== 'post-sb' && e.type !== 'post-bb')
    .map((e) => `${positions[e.seat]}:${pathToken(e, bigBlind)}`)
    .join(',');
}

function preflopPath(v: BotView): string {
  return solverPath(v.events, v.positions, v.bigBlind);
}

/** Rozdanie w formacie spotów solvera: liczba graczy, pełne stacki, blindy 0,5/1. */
function inSolverFormat(v: BotView, k: BotKnowledge): boolean {
  return (
    v.players === k.solverFormat.players &&
    v.smallBlind * 2 === v.bigBlind &&
    v.startStacks.every((s) => s === k.solverFormat.stackBb * v.bigBlind)
  );
}

/** Akcja przed flopem; `limp` to wejście samym blindem dodawane tylko przez styl pasywny w spocie otwarcia. */
type PfAction = { kind: 'fold' } | { kind: 'call' } | { kind: 'limp' } | { kind: 'raise'; toBb: number } | { kind: 'allin' };

function parseLabel(label: string): PfAction {
  if (label === 'fold') return { kind: 'fold' };
  if (label === 'all-in') return { kind: 'allin' };
  const [kind, size] = label.split(' ');
  if (kind === 'call') return { kind: 'call' };
  if (kind === 'raise' && size) return { kind: 'raise', toBb: Number(size) };
  throw new Error(`Nieznana etykieta akcji solvera: ${label}`);
}

/**
 * Częstości solvera zmodyfikowane stylem. q to percentyl ręki (0 = najlepsza), width to udział rąk granych w spocie.
 * Rozluźnienie przenosi część pasów do gry (najwięcej dla rąk tuż pod zakresem), zacieśnienie część gry do pasa
 * (najwięcej dla rąk na krawędzi zakresu), agresja przesuwa masę między sprawdzeniem a podbiciem.
 */
export function styledFreqs(acts: readonly PfAction[], freqs: readonly number[], q: number, width: number, style: BotStyle): number[] {
  const S = BOT_POLICY.style;
  const out = freqs.slice();
  const iFold = acts.findIndex((a) => a.kind === 'fold');
  const iCall = acts.findIndex((a) => a.kind === 'call');
  const iLimp = acts.findIndex((a) => a.kind === 'limp');
  const aggr = acts.flatMap((a, i) => (a.kind === 'raise' || a.kind === 'allin' ? [i] : []));
  const iRaise = aggr[0] ?? -1;
  if (iFold >= 0 && style.looseness > 0) {
    const moved = out[iFold]! * Math.min(1, S.preflopLoosen * style.looseness) * clamp01(1 - (q - width) / S.loosenSpread);
    out[iFold]! -= moved;
    // pasywny styl dokłada sprawdzenia (albo limpy w spocie otwarcia), agresywny podbicia
    const iPassive = iCall >= 0 ? iCall : iLimp;
    const toCall = iPassive >= 0 ? (iRaise >= 0 ? (iCall >= 0 ? (1 - style.aggression) / 2 : clamp01(-style.aggression) * S.limp) : 1) : 0;
    if (iPassive >= 0) out[iPassive]! += moved * toCall;
    if (iRaise >= 0) out[iRaise]! += moved * (1 - toCall);
    if (iPassive < 0 && iRaise < 0) out[iFold]! += moved;
  } else if (iFold >= 0 && style.looseness < 0) {
    const k = clamp01(S.preflopTighten * -style.looseness * (q / Math.max(width, 1e-9)));
    for (let i = 0; i < out.length; i++) {
      if (i === iFold) continue;
      const moved = out[i]! * k;
      out[i]! -= moved;
      out[iFold]! += moved;
    }
  }
  if (iCall >= 0 && iRaise >= 0 && style.aggression !== 0) {
    if (style.aggression > 0) {
      const moved = out[iCall]! * S.shift * style.aggression;
      out[iCall]! -= moved;
      out[iRaise]! += moved;
    } else {
      const moved = out[iRaise]! * S.shift * -style.aggression;
      out[iRaise]! -= moved;
      out[iCall]! += moved;
    }
  }
  return out;
}

function pfToAction(v: BotView, a: PfAction): PlayerAction {
  switch (a.kind) {
    case 'fold':
      return { type: 'fold' };
    case 'call':
    case 'limp':
      return { type: 'call' };
    case 'allin':
      return { type: 'raise', to: v.legal.maxTo ?? 0 };
    case 'raise':
      return { type: 'raise', to: Math.round(a.toBb * v.bigBlind) };
  }
}

/** Szerokość otwarcia (udział rąk) z pozycji: ze spotów solvera według liczby graczy za botem. */
function rfiWidth(v: BotView, k: BotKnowledge, behind: number): number {
  const widths = new Map<number, number>();
  const order = positionNames(k.solverFormat.players);
  for (const s of k.spots) {
    // spot otwarcia: przed graczem same pasy (6-max: UTG…BTN, 9-max także UTG+1, UTG+2 i LJ)
    if (!/^([A-Z0-9+]+:fold,?)*$/.test(s.path)) continue;
    const raise = s.actions.findIndex((a) => a.label.startsWith('raise'));
    if (raise < 0) continue;
    const b = k.solverFormat.players - 1 - order.indexOf(s.hero);
    const w = HAND_CLASSES.reduce((sum, hc, i) => sum + combosCount(hc) * s.actions[raise]!.freqs[i]!, 0) / 1326;
    widths.set(b, w);
  }
  if (widths.has(behind)) return widths.get(behind)!;
  const known = [...widths.keys()].sort((a, b) => a - b);
  if (!known.length) throw new Error('Brak spotów otwarć solvera w wiedzy bota');
  const maxB = known[known.length - 1]!;
  if (behind > maxB) return widths.get(maxB)! * BOT_POLICY.preflop.earlyShrink ** (behind - maxB);
  return widths.get(known[0]!)!;
}

function preflopDecision(v: BotView, k: BotKnowledge, style: BotStyle, rng: Rng): PlayerAction {
  const hc = classOf(v.hole[0], v.hole[1]);
  const q = handPercentile(k.handRanking, hc);
  if (inSolverFormat(v, k)) {
    const path = preflopPath(v);
    const spot = k.spots.find((s) => s.path === path && s.hero === v.position);
    if (spot) {
      const acts = spot.actions.map((a) => parseLabel(a.label));
      const idx = HAND_CLASSES.indexOf(hc);
      const base = spot.actions.map((a) => a.freqs[idx]!);
      // spot otwarcia (solver zna tylko pas i przebicie): styl pasywny może dołożyć limp
      if (style.aggression < 0 && style.looseness > 0 && !acts.some((a) => a.kind === 'call')) {
        acts.push({ kind: 'limp' });
        base.push(0);
      }
      const iFold = acts.findIndex((a) => a.kind === 'fold');
      const width = iFold < 0 ? 1 : HAND_CLASSES.reduce((sum, c, i) => sum + combosCount(c) * (1 - spot.actions[iFold]!.freqs[i]!), 0) / 1326;
      const freqs = styledFreqs(acts, base, q, width, style);
      return pfToAction(v, sample(rng, acts.map((a, i) => ({ w: freqs[i]!, v: a }))));
    }
  }
  return heuristicPreflop(v, k, style, rng, hc, q);
}

/** Przed flopem poza spotami solvera: reguły M4 na rankingu rąk. */
function heuristicPreflop(v: BotView, k: BotKnowledge, style: BotStyle, rng: Rng, hc: HandClass, q: number): PlayerAction {
  const P = BOT_POLICY.preflop;
  const widthMul = 1 + BOT_POLICY.style.width * style.looseness;
  const vol = v.events.filter((e) => e.street === 'preflop' && e.type !== 'post-sb' && e.type !== 'post-bb');
  const raises = vol.filter((e) => e.type === 'raise' || e.type === 'bet');
  const bb = v.bigBlind;
  const { sb: sbSeat, bb: bbSeat, firstPreflop } = tableSeats(v.players, v.button);
  const isBlind = v.seat === sbSeat || v.seat === bbSeat;
  const behind = (firstPreflop + v.players - 1 - v.seat + v.players) % v.players;
  const ip = inPositionPreflop(v, raises[raises.length - 1]?.seat);
  const aggrUp = (p: number) => clamp01(p * (1 + BOT_POLICY.style.shift * style.aggression));

  if (raises.length === 0) {
    const limpers = vol.filter((e) => e.type === 'call').length;
    const width = Math.min(1, rfiWidth(v, k, behind) * widthMul);
    if (limpers === 0) {
      if (q < width) return { type: 'raise', to: Math.round((v.seat === sbSeat && v.players > 2 ? k.sizes.openSb : k.sizes.open) * bb) };
      // luźny pasywny gracz czasem wchodzi samym blindem (limp), choć R-M3-004 tego nie zaleca
      if (style.looseness > 0 && style.aggression < 0 && q < width * (1 + style.looseness)) return { type: 'call' };
      return { type: 'fold' };
    }
    const iso = Math.round((k.sizes.isoBase + k.sizes.isoPerLimper * limpers + (isBlind ? k.sizes.isoOopExtra : 0)) * bb);
    if (q < width * aggrUp(P.vsLimp.iso)) return { type: 'raise', to: iso };
    if ((speculative(hc) || style.looseness > 0) && q < width * P.vsLimp.overlimp && (!isBlind || v.seat === sbSeat)) return { type: 'call' };
    return { type: 'fold' };
  }

  const last = raises[raises.length - 1]!;
  const callers = vol.filter((e) => e.type === 'call' && vol.indexOf(e) > vol.indexOf(last)).length;
  const iRaised = raises.some((e) => e.seat === v.seat);

  if (raises.length === 1) {
    // otwarcie (albo izolacja) przed botem: szerokość otwierającego z jego pozycji
    const openerBehind = (firstPreflop + v.players - 1 - last.seat + v.players) % v.players;
    const openerWidth = rfiWidth(v, k, openerBehind);
    const size = (ip ? k.sizes.threeBetIp : k.sizes.threeBetOop) * last.to + callers * last.to;
    if (q < openerWidth * aggrUp(P.vsOpen.threeBet) * Math.max(0.5, widthMul) || P.premium.includes(hc)) return { type: 'raise', to: Math.round(size) };
    if (P.vsOpen.bluffs.includes(hc) && rng() < aggrUp(P.vsOpen.bluffFreq)) return { type: 'raise', to: Math.round(size) };
    // R-M4-003: mały blind prawie nie sprawdza (luźny styl sprawdza mimo to)
    if (v.seat === sbSeat && v.players > 2 && style.looseness <= 0) return { type: 'fold' };
    const callWidth = openerWidth * (v.seat === bbSeat ? P.vsOpen.bbCall : P.vsOpen.call) * widthMul;
    if (q < callWidth && (ip || v.seat === bbSeat || suitedOrPair(hc))) return { type: 'call' };
    return { type: 'fold' };
  }

  if (raises.length === 2) {
    const fourBet = Math.round((ip ? k.sizes.fourBetIp : k.sizes.fourBetOop) * last.to);
    if (iRaised) {
      // R-M4-007–010: wobec 3-betu część otwarć 4-betuje, część sprawdza, reszta pasuje (udziały z treści)
      const myOpen = raises[0]!;
      const openerBehind = (firstPreflop + v.players - 1 - myOpen.seat + v.players) % v.players;
      const width = rfiWidth(v, k, openerBehind) * widthMul;
      const rel = q / Math.max(width, 1e-9);
      if (P.premium.includes(hc) || rel < aggrUp(k.vs3bet.fourBet)) return { type: 'raise', to: fourBet };
      const callShare = k.vs3bet.call * (1 + BOT_POLICY.style.width * style.looseness);
      // R-M4-008: bez pozycji sprawdzają tylko pary i ręce w kolorze
      if (rel < k.vs3bet.fourBet + callShare && (ip || suitedOrPair(hc))) return { type: 'call' };
      return { type: 'fold' };
    }
    if (P.premium.includes(hc)) return { type: 'raise', to: fourBet };
    if (q < P.coldVs3bet.call * widthMul) return { type: 'call' };
    return { type: 'fold' };
  }

  if (raises.length === 3) {
    if (P.vs4betJam.includes(hc)) return { type: 'raise', to: v.legal.maxTo ?? 0 };
    if (P.vs4betCall.includes(hc)) return { type: 'call' };
    return { type: 'fold' };
  }
  return P.vsJamCall.includes(hc) ? { type: 'call' } : { type: 'fold' };
}

/** Bot będzie mieć pozycję po flopie wobec ostatniego podbijającego. */
function inPositionPreflop(v: BotView, raiser: number | undefined): boolean {
  if (raiser === undefined) return false;
  return postflopOrder(v, v.seat) > postflopOrder(v, raiser);
}

function suitedOrPair(hc: HandClass): boolean {
  return hc.length === 2 || hc[2] === 's';
}

/** Ręce spekulacyjne z R-M4-013: małe i średnie pary oraz konektory w kolorze. */
function speculative(hc: HandClass): boolean {
  if (hc.length === 2) return true;
  if (hc[2] !== 's') return false;
  const r = '23456789TJQKA';
  return r.indexOf(hc[0]!) - r.indexOf(hc[1]!) <= 2;
}

// ---------- po flopie ----------

function postflopDecision(v: BotView, k: BotKnowledge, style: BotStyle, rng: Rng): PlayerAction {
  const P = BOT_POLICY.postflop;
  const S = BOT_POLICY.style;
  const h = classifyHolding(v.hole, v.board);
  const cls = h.cls;
  const total = pot(v);
  const opponents = liveOpponents(v).length;
  const ip = inPosition(v);
  const preflopRaises = v.events.filter((e) => e.street === 'preflop' && (e.type === 'raise' || e.type === 'bet'));
  const aggressor = preflopRaises.length > 0 && preflopRaises[preflopRaises.length - 1]!.seat === v.seat;
  const betUp = 1 + S.postflopBet * style.aggression;
  const la = v.legal;

  if (la.canCheck) {
    let p: number = P.bet[cls];
    let frac: number = cls === 'very-strong' || cls === 'strong' ? k.sizes.cbetBig : k.sizes.cbetSmall;
    const bluffish = cls === 'air' || cls === 'weak' || cls === 'draw';
    if (v.street === 'flop' && aggressor && opponents === 1) {
      const tex = classifyFlop(v.board as [Card, Card, Card]);
      const c = k.cbetCases.find((x) => textureMatches(tex, x.when));
      if (c?.best === 'check') p *= P.cbetCheckCase;
      else if (c) {
        if (bluffish) p = Math.max(p, P.cbetRange);
        frac = c.best === 'big' ? k.sizes.cbetBig : k.sizes.cbetSmall;
      } else frac = tex.wetness === 'wet' ? k.sizes.cbetBig : k.sizes.cbetSmall;
      if (!ip) p *= P.oopAggressor;
    } else if (v.street === 'flop' && !aggressor && !ip) p *= P.donk;
    if (opponents >= 2 && bluffish) p *= P.multiwayBluff;
    if (v.street === 'river' && bluffish) frac = k.sizes.cbetBig;
    p = clamp01(p * betUp);
    if (rng() < p && la.minTo !== null) {
      const to = v.streetBets[v.seat]! + Math.round(frac * total);
      return { type: la.aggressive, to };
    }
    return { type: 'check' };
  }

  const toCall = la.callAmount ?? 0;
  const price = toCall / (total + toCall);
  let raiseP: number = P.raise[cls] * betUp;
  let callP: number;
  switch (cls) {
    case 'very-strong':
      callP = 1;
      break;
    case 'strong':
    case 'medium':
    case 'weak': {
      const c = P.call[cls];
      callP = price <= c.price ? c.below : c.above;
      break;
    }
    case 'draw': {
      const outs = h.draw?.all.length ?? 0;
      const unseen = remainingDeck([...v.hole, ...v.board]).length;
      const allInCall = toCall >= v.stacks[v.seat]!;
      const cards = v.street === 'flop' && allInCall ? 2 : 1;
      const eq = hitProbability(outs, unseen, cards);
      const behind = v.stacks[v.seat]! - toCall;
      callP = eq >= price ? 1 : behind >= P.impliedStackCalls * toCall ? P.impliedCall : 0;
      break;
    }
    case 'air':
      callP = 0;
      break;
  }
  if (opponents >= 2 && (cls === 'air' || cls === 'draw')) raiseP *= P.multiwayBluff;
  raiseP = clamp01(raiseP);
  // luźny styl pasuje rzadziej, ciasny częściej
  const foldP = clamp01((1 - callP) * (1 - S.postflopFold * style.looseness));
  if (la.minTo !== null && rng() < raiseP) return { type: 'raise', to: Math.round(P.raiseMultiple * v.currentBet) };
  if (rng() < foldP) return { type: 'fold' };
  return { type: 'call' };
}

/** Do testów. */
export const _internal = { preflopPath, legalize };

/** Źródła wiedzy bota w treści (klucze numbers.yaml); te same liczby, których uczą lekcje M3–M5. */
export const BOT_NUMBER_KEYS = {
  stack: 'format.stack',
  open: 'pf.open-size',
  openSb: 'pf.open-size-sb',
  threeBetIp: 'pf.3bet.size-ip',
  threeBetOop: 'pf.3bet.size-oop',
  fourBetIp: ['pf.4bet.size-ip.low', 'pf.4bet.size-ip.high'],
  fourBetOop: ['pf.4bet.size-oop.low', 'pf.4bet.size-oop.high'],
  isoBase: 'pf.iso.base',
  isoPerLimper: 'pf.iso.per-limper',
  isoOopExtra: 'pf.iso.oop-extra',
  cbetSmall: 'cbet.size.small',
  cbetBig: 'cbet.size.big',
  vs3betCall: ['pf.vs3bet.call.low', 'pf.vs3bet.call.high'],
  vs3betFourBet: ['pf.vs3bet.4bet.low', 'pf.vs3bet.4bet.high'],
} as const;

/** Plik solvera, którego spoty grają boty (6-max, 100bb). */
export const BOT_SOLVER_FILE = 'preflop-6max-100bb.json';
export const BOT_SOLVER_PLAYERS = 6;
/**
 * Pliki solvera według liczby graczy przy stole (tryb gry M13). 9-max: otwarcia UTG–UTG+2 z solvera 9-max, reszta to
 * kanon 6-max pod pasami UTG–UTG+2 (dokument 10, „Pomiar N9a końcowy”).
 */
export const SOLVER_FILES: Readonly<Record<number, string>> = { 6: BOT_SOLVER_FILE, 9: 'preflop-9max-100bb.json' };
/** Liczby graczy, przy których można grać w trybie gry (stół z botami i oceną decyzji). */
export const PLAY_TABLE_SIZES = [6, 9] as const;

/**
 * Składa BotKnowledge z treści: liczby po kluczach, spoty zakresów (tylko z pliku solvera dla danej liczby graczy,
 * domyślnie 6-max 100bb; spots.yaml zawiera wyłącznie spoty zwalidowane), ranking rąk i przypadki c-betu z zadań M5.
 * Przedziały z treści zamienia na ich środek.
 */
/** Plik solvera dla liczby graczy (błąd dla stołu bez wyniku solvera). */
export function solverFile(players: number): string {
  const f = SOLVER_FILES[players];
  if (!f) throw new Error(`Brak wyniku solvera dla stołu ${players}-osobowego`);
  return f;
}

export function botKnowledgeFrom(src: {
  number: (key: string) => number;
  spots: readonly { hero: string; path: string; solver: string; actions: readonly { label: string; freqs: readonly number[] }[] }[];
  handRanking: readonly HandClass[];
  cbetCases: readonly { when: TextureFilter; best: 'check' | 'small' | 'big' }[];
  /** Liczba graczy przy stole (6 albo 9); wybiera plik solvera z SOLVER_FILES. */
  players?: number;
}): BotKnowledge {
  const K = BOT_NUMBER_KEYS;
  const n = src.number;
  const mid = (keys: readonly [string, string]) => (n(keys[0]) + n(keys[1])) / 2;
  if (src.handRanking.length !== HAND_CLASSES.length) throw new Error('Ranking rąk musi mieć 169 klas');
  return {
    solverFormat: { players: src.players ?? BOT_SOLVER_PLAYERS, stackBb: n(K.stack) },
    spots: src.spots.filter((s) => s.solver === solverFile(src.players ?? BOT_SOLVER_PLAYERS)).map((s) => ({ hero: s.hero, path: s.path, actions: s.actions })),
    handRanking: src.handRanking,
    sizes: {
      open: n(K.open),
      openSb: n(K.openSb),
      threeBetIp: n(K.threeBetIp),
      threeBetOop: n(K.threeBetOop),
      fourBetIp: mid(K.fourBetIp),
      fourBetOop: mid(K.fourBetOop),
      isoBase: n(K.isoBase),
      isoPerLimper: n(K.isoPerLimper),
      isoOopExtra: n(K.isoOopExtra),
      cbetSmall: n(K.cbetSmall),
      cbetBig: n(K.cbetBig),
    },
    vs3bet: { call: mid(K.vs3betCall), fourBet: mid(K.vs3betFourBet) },
    cbetCases: src.cbetCases,
  };
}
