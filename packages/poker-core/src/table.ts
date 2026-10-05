import type { Card } from './cards';
import { FULL_DECK, assertUnique } from './cards';
import { strength } from './evaluate';
import { createRng, shuffle } from './rng';

/**
 * Maszyna stanów rozdania No-Limit Hold'em (M13, dokument 14, 4.4.1): 2–9 graczy, dowolne stacki, blindy,
 * kolejność mówienia, legalne akcje i rozmiary, side poty, showdown. Czysty TypeScript, bez React Native (NFR-10).
 *
 * Kwoty są w żetonach jako liczby całkowite (np. duży blind = 100 żetonów), żeby nie gubić groszy na ułamkach bb.
 * Rozdanie jest w pełni opisane przez konfigurację, ziarno i listę akcji: `replayHand` odtwarza je co do żetonu.
 * Stan jest niemutowalny: `applyAction` zwraca nowy obiekt.
 */

export type Street = 'preflop' | 'flop' | 'turn' | 'river';
export const STREETS: readonly Street[] = ['preflop', 'flop', 'turn', 'river'];

/**
 * Nazwy pozycji według liczby graczy, w kolejności mówienia przed flopem (od pierwszego po dużym blindzie).
 * Przy dwóch graczach button jest małym blindem i mówi pierwszy przed flopem.
 * Nazwy 6-max są te same co w wyniku solvera (UTG, HJ, CO, BTN, SB, BB); 9-max od razu w kodzie (dokument 14, 4.4.6).
 */
export const POSITION_NAMES: Readonly<Record<number, readonly string[]>> = {
  2: ['BTN', 'BB'],
  3: ['BTN', 'SB', 'BB'],
  4: ['CO', 'BTN', 'SB', 'BB'],
  5: ['HJ', 'CO', 'BTN', 'SB', 'BB'],
  6: ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
  7: ['UTG', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
  8: ['UTG', 'UTG+1', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
  9: ['UTG', 'UTG+1', 'UTG+2', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'],
};

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 9;

export interface TableConfig {
  /** Stack każdego miejsca na początku rozdania (indeks = numer miejsca, zgodnie z ruchem wskazówek zegara). */
  stacks: readonly number[];
  smallBlind: number;
  bigBlind: number;
  /** Numer miejsca buttona. */
  button: number;
}

/** Karty ustawione z góry (generatory obszarów, powtórki z błędów); reszta talii jest tasowana z ziarna. */
export interface HandPreset {
  holes?: readonly (readonly [Card, Card] | null | undefined)[];
  /** Pierwsze karty wspólne (0–5) w kolejności wykładania. */
  board?: readonly Card[];
}

export type ActionType = 'fold' | 'check' | 'call' | 'bet' | 'raise';

/** Akcja gracza. Dla bet i raise `to` to łączna kwota postawiona na tej ulicy po akcji. */
export interface PlayerAction {
  type: ActionType;
  to?: number;
}

export interface HandEvent {
  street: Street;
  seat: number;
  type: ActionType | 'post-sb' | 'post-bb';
  /** Żetony dołożone w tej akcji. */
  amount: number;
  /** Łączna kwota gracza na tej ulicy po akcji. */
  to: number;
  allIn: boolean;
}

export interface SeatState {
  seat: number;
  position: string;
  startStack: number;
  stack: number;
  /** Postawione na bieżącej ulicy. */
  streetBet: number;
  /** Postawione w całym rozdaniu (do side potów). */
  committed: number;
  folded: boolean;
  allIn: boolean;
  /** Gracz mówił na tej ulicy. */
  acted: boolean;
  /** Poziom ostatniego pełnego przebicia w chwili ostatniej akcji gracza (reguła ponownego otwarcia licytacji). */
  actedAtFullBet: number;
  hole: readonly [Card, Card];
}

export interface PotResult {
  amount: number;
  eligible: number[];
  winners: number[];
  /** Wygrana każdego zwycięzcy z tej puli (nieparzyste żetony: pierwsi na lewo od buttona). */
  shares: Record<number, number>;
}

export interface HandOutcome {
  pots: PotResult[];
  /** Zwrócony niesprawdzony zakład. */
  uncalled: { seat: number; amount: number } | null;
  /** Miejsca, które pokazały karty (showdown); puste, gdy wszyscy poza jednym spasowali. */
  shown: number[];
  /** Wynik każdego miejsca w żetonach (końcowy stack − początkowy). Suma zawsze 0. */
  net: number[];
  /** Ulica, na której rozdanie się rozstrzygnęło (dla showdownu: river). */
  endedOn: Street;
}

export interface HandState {
  config: TableConfig;
  seed: number;
  seats: SeatState[];
  /** Pełne 5 kart wspólnych ustalonych na starcie; widoczne jest `board`. */
  runout: readonly Card[];
  board: Card[];
  street: Street;
  /** Miejsce, które teraz mówi; null po zakończeniu rozdania. */
  toAct: number | null;
  currentBet: number;
  /** Najmniejsze dozwolone podbicie (wielkość ostatniego pełnego przebicia, co najmniej duży blind). */
  minRaise: number;
  /** Poziom zakładu po ostatnim pełnym przebiciu (albo zakładzie) na tej ulicy. */
  lastFullBet: number;
  events: HandEvent[];
  /** Akcje graczy w kolejności (bez blindów): wejście dla `replayHand`. */
  actions: { seat: number; action: PlayerAction }[];
  result: HandOutcome | null;
}

export interface LegalActions {
  seat: number;
  canFold: boolean;
  canCheck: boolean;
  /** Ile trzeba dołożyć do sprawdzenia (może być all-in za mniej); null, gdy nie ma czego sprawdzać. */
  callAmount: number | null;
  /** 'bet' gdy nikt nie postawił na tej ulicy, inaczej 'raise'. */
  aggressive: 'bet' | 'raise';
  /** Najmniejsza i największa łączna kwota zakładu/przebicia (`to`); null, gdy podbić nie wolno. */
  minTo: number | null;
  maxTo: number | null;
}

export function positionNames(players: number): readonly string[] {
  const names = POSITION_NAMES[players];
  if (!names) throw new Error(`Obsługiwane są stoły od ${MIN_PLAYERS} do ${MAX_PLAYERS} graczy, podano ${players}`);
  return names;
}

/** Miejsca małego i dużego blinda oraz pierwszego mówiącego przed flopem i po flopie. */
export function tableSeats(players: number, button: number): { sb: number; bb: number; firstPreflop: number; firstPostflop: number } {
  if (players === 2) return { sb: button, bb: (button + 1) % 2, firstPreflop: button, firstPostflop: (button + 1) % 2 };
  const sb = (button + 1) % players;
  const bb = (button + 2) % players;
  return { sb, bb, firstPreflop: (bb + 1) % players, firstPostflop: sb };
}

/** Pozycja miejsca przy danym buttonie. */
export function positionOf(players: number, button: number, seat: number): string {
  const names = positionNames(players);
  const { firstPreflop } = tableSeats(players, button);
  return names[(seat - firstPreflop + players) % players]!;
}

function validateConfig(c: TableConfig): void {
  const n = c.stacks.length;
  positionNames(n);
  if (!Number.isInteger(c.button) || c.button < 0 || c.button >= n) throw new Error(`Nieprawidłowy button: ${c.button}`);
  if (!Number.isInteger(c.smallBlind) || !Number.isInteger(c.bigBlind) || c.smallBlind < 1 || c.bigBlind < c.smallBlind) {
    throw new Error(`Nieprawidłowe blindy: ${c.smallBlind}/${c.bigBlind}`);
  }
  for (const s of c.stacks) if (!Number.isInteger(s) || s < 1) throw new Error(`Nieprawidłowy stack: ${s}`);
}

function cloneState(s: HandState): HandState {
  return {
    ...s,
    seats: s.seats.map((x) => ({ ...x })),
    board: s.board.slice(),
    events: s.events.slice(),
    actions: s.actions.slice(),
  };
}

/** Rozkłada karty: najpierw ustawione z góry, reszta z talii tasowanej ziarnem. */
function dealFromSeed(n: number, seed: number, preset: HandPreset | undefined): { holes: [Card, Card][]; runout: Card[] } {
  const fixed: Card[] = [];
  for (const h of preset?.holes ?? []) if (h) fixed.push(h[0], h[1]);
  const presetBoard = preset?.board ?? [];
  if (presetBoard.length > 5) throw new Error('Za dużo kart wspólnych w ustawieniu');
  fixed.push(...presetBoard);
  assertUnique(fixed);
  const used = new Set(fixed);
  const deck = shuffle(createRng(seed), FULL_DECK.filter((c) => !used.has(c)));
  let k = 0;
  const holes: [Card, Card][] = [];
  for (let i = 0; i < n; i++) {
    const h = preset?.holes?.[i];
    holes.push(h ? [h[0], h[1]] : [deck[k++]!, deck[k++]!]);
  }
  const runout = presetBoard.slice();
  while (runout.length < 5) runout.push(deck[k++]!);
  return { holes, runout };
}

/** Nowe rozdanie: rozdanie kart, blindy, pierwszy mówiący. */
export function startHand(config: TableConfig, seed: number, preset?: HandPreset): HandState {
  validateConfig(config);
  const n = config.stacks.length;
  const { holes, runout } = dealFromSeed(n, seed, preset);
  const seats: SeatState[] = config.stacks.map((stack, seat) => ({
    seat,
    position: positionOf(n, config.button, seat),
    startStack: stack,
    stack,
    streetBet: 0,
    committed: 0,
    folded: false,
    allIn: false,
    acted: false,
    actedAtFullBet: -1,
    hole: holes[seat]!,
  }));
  const state: HandState = {
    config,
    seed,
    seats,
    runout,
    board: [],
    street: 'preflop',
    toAct: null,
    currentBet: config.bigBlind,
    minRaise: config.bigBlind,
    lastFullBet: config.bigBlind,
    events: [],
    actions: [],
    result: null,
  };
  const { sb, bb, firstPreflop } = tableSeats(n, config.button);
  post(state, sb, config.smallBlind, 'post-sb');
  post(state, bb, config.bigBlind, 'post-bb');
  state.toAct = firstPreflop;
  return advance(state, firstPreflop);
}

function post(state: HandState, seat: number, blind: number, type: 'post-sb' | 'post-bb'): void {
  const s = state.seats[seat]!;
  const amount = Math.min(blind, s.stack);
  s.stack -= amount;
  s.streetBet += amount;
  s.committed += amount;
  if (s.stack === 0) s.allIn = true;
  state.events.push({ street: 'preflop', seat, type, amount, to: s.streetBet, allIn: s.allIn });
}

const canAct = (s: SeatState) => !s.folded && !s.allIn;

function needsAction(state: HandState, s: SeatState): boolean {
  return canAct(s) && (!s.acted || s.streetBet < state.currentBet);
}

/** Legalne akcje gracza, który teraz mówi. */
export function legalActions(state: HandState): LegalActions {
  if (state.toAct === null) throw new Error('Rozdanie zakończone: nikt nie mówi');
  const s = state.seats[state.toAct]!;
  const toCall = Math.max(0, state.currentBet - s.streetBet);
  const callAmount = toCall > 0 ? Math.min(toCall, s.stack) : null;
  const maxTo = s.streetBet + s.stack;
  // gracz, który już mówił, a od tego czasu nie było pełnego przebicia (np. tylko all-in za mało), może tylko sprawdzić albo spasować
  const reopened = !s.acted || state.lastFullBet > s.actedAtFullBet;
  // jest ktoś, kto mógłby odpowiedzieć na podbicie
  const opponentsCanAct = state.seats.some((o) => o.seat !== s.seat && canAct(o));
  const aggressive: 'bet' | 'raise' = state.currentBet === 0 ? 'bet' : 'raise';
  let minTo: number | null = null;
  let allowedMax: number | null = null;
  // bez rywali zdolnych do akcji podbijanie nie ma sensu (nikt nie odpowie); zostaje sprawdzenie albo czekanie
  if (reopened && opponentsCanAct && maxTo > state.currentBet) {
    // zakład: co najmniej duży blind; przebicie: o co najmniej ostatnie pełne podbicie; mniej tylko jako all-in
    minTo = Math.min(state.currentBet + state.minRaise, maxTo);
    allowedMax = maxTo;
  }
  return { seat: s.seat, canFold: true, canCheck: toCall === 0, callAmount, aggressive, minTo, maxTo: allowedMax };
}

/** Czy akcja jest legalna; zwraca opis błędu albo null. */
export function validateAction(state: HandState, action: PlayerAction): string | null {
  if (state.toAct === null) return 'Rozdanie zakończone';
  const la = legalActions(state);
  switch (action.type) {
    case 'fold':
      return null;
    case 'check':
      return la.canCheck ? null : 'Nie można czekać wobec zakładu';
    case 'call':
      return la.callAmount !== null ? null : 'Nie ma czego sprawdzać';
    case 'bet':
    case 'raise': {
      if (action.type !== la.aggressive) return la.aggressive === 'bet' ? 'Nikt nie postawił: to zakład, nie przebicie' : 'Ktoś już postawił: to przebicie, nie zakład';
      if (la.minTo === null || la.maxTo === null) return 'Podbicie niedozwolone';
      const to = action.to;
      if (to === undefined || !Number.isInteger(to)) return 'Brak kwoty zakładu';
      if (to > la.maxTo) return `Za duży zakład: najwyżej ${la.maxTo}`;
      if (to < la.minTo) return `Za mały zakład: co najmniej ${la.minTo}`;
      return null;
    }
  }
}

/** Wykonuje akcję gracza, który mówi. Rzuca błąd przy akcji nielegalnej. */
export function applyAction(state: HandState, action: PlayerAction): HandState {
  const err = validateAction(state, action);
  if (err) throw new Error(`Nielegalna akcja ${action.type}${action.to !== undefined ? ` ${action.to}` : ''}: ${err}`);
  const next = cloneState(state);
  const seat = next.toAct!;
  const s = next.seats[seat]!;
  let amount = 0;
  switch (action.type) {
    case 'fold':
      s.folded = true;
      break;
    case 'check':
      break;
    case 'call':
      amount = Math.min(next.currentBet - s.streetBet, s.stack);
      break;
    case 'bet':
    case 'raise': {
      const to = action.to!;
      amount = to - s.streetBet;
      const raiseBy = to - next.currentBet;
      // pełny zakład (co najmniej duży blind) albo pełne przebicie otwiera licytację na nowo;
      // all-in za mniej podnosi kwotę do sprawdzenia, ale nie najmniejsze podbicie
      if (raiseBy >= next.minRaise) {
        next.minRaise = raiseBy;
        next.lastFullBet = to;
      }
      next.currentBet = to;
      break;
    }
  }
  s.stack -= amount;
  s.streetBet += amount;
  s.committed += amount;
  if (s.stack === 0 && !s.folded) s.allIn = true;
  s.acted = true;
  s.actedAtFullBet = next.lastFullBet;
  next.events.push({ street: next.street, seat, type: action.type, amount, to: s.streetBet, allIn: s.allIn });
  next.actions.push({ seat, action: action.to !== undefined ? { type: action.type, to: action.to } : { type: action.type } });
  return advance(next, (seat + 1) % next.seats.length);
}

/** Ustala, kto mówi dalej, kończy ulicę albo rozdanie. Mutuje `state` (świeżą kopię). */
function advance(state: HandState, from: number): HandState {
  const n = state.seats.length;
  const live = state.seats.filter((s) => !s.folded);
  if (live.length === 1) return finish(state, false, returnUncalled(state));
  const actors = state.seats.filter(canAct);
  const roundOpen = actors.some((s) => needsAction(state, s));
  // jeden gracz zdolny do akcji, który nie musi niczego sprawdzać, nie ma z kim licytować
  const lonely = actors.length === 1 && actors[0]!.streetBet >= state.currentBet;
  if (roundOpen && !lonely) {
    for (let i = 0; i < n; i++) {
      const seat = (from + i) % n;
      if (needsAction(state, state.seats[seat]!)) {
        state.toAct = seat;
        return state;
      }
    }
  }
  return endStreet(state);
}

/** Zwraca graczowi część zakładu, której nikt nie sprawdził. */
function returnUncalled(state: HandState): { seat: number; amount: number } | null {
  const bets = state.seats.map((s) => s.streetBet).sort((a, b) => b - a);
  const top = bets[0]!;
  const second = bets[1] ?? 0;
  if (top <= second) return null;
  const s = state.seats.find((x) => x.streetBet === top)!;
  const amount = top - second;
  s.stack += amount;
  s.streetBet -= amount;
  s.committed -= amount;
  if (s.stack > 0) s.allIn = false;
  return { seat: s.seat, amount };
}

function endStreet(state: HandState): HandState {
  const uncalled = returnUncalled(state);
  if (state.seats.filter((s) => !s.folded).length === 1) return finish(state, false, uncalled);
  const actors = state.seats.filter(canAct);
  if (state.street === 'river' || actors.length <= 1) {
    // showdown, w razie potrzeby z wyłożeniem pozostałych kart (all-in)
    state.board = state.runout.slice();
    return finish(state, true, uncalled);
  }
  const nextStreet = STREETS[STREETS.indexOf(state.street) + 1]!;
  state.street = nextStreet;
  state.board = state.runout.slice(0, nextStreet === 'flop' ? 3 : nextStreet === 'turn' ? 4 : 5);
  state.currentBet = 0;
  state.minRaise = state.config.bigBlind;
  state.lastFullBet = 0;
  for (const s of state.seats) {
    s.streetBet = 0;
    s.acted = false;
    s.actedAtFullBet = -1;
  }
  const { firstPostflop } = tableSeats(state.seats.length, state.config.button);
  return advance(state, firstPostflop);
}

/** Pule główna i boczne z wpłat (spasowani dokładają, ale nie walczą o pulę). */
export function buildPots(seats: readonly SeatState[]): { amount: number; eligible: number[] }[] {
  const levels = [...new Set(seats.filter((s) => !s.folded && s.committed > 0).map((s) => s.committed))].sort((a, b) => a - b);
  const pots: { amount: number; eligible: number[] }[] = [];
  let prev = 0;
  for (const level of levels) {
    const amount = seats.reduce((sum, s) => sum + Math.max(0, Math.min(s.committed, level) - prev), 0);
    const eligible = seats.filter((s) => !s.folded && s.committed >= level).map((s) => s.seat);
    if (amount > 0) {
      // pula z tymi samymi uprawnionymi co poprzednia (np. po zwrocie) łączy się z nią
      const last = pots[pots.length - 1];
      if (last && last.eligible.length === eligible.length && last.eligible.every((x, i) => x === eligible[i])) last.amount += amount;
      else pots.push({ amount, eligible });
    }
    prev = level;
  }
  // żetony spasowanych ponad najwyższy poziom aktywnych (np. spasował po wpłacie większej niż all-in rywala) trafiają do ostatniej puli
  const rest = seats.reduce((sum, s) => sum + Math.max(0, s.committed - prev), 0);
  if (rest > 0 && pots.length > 0) pots[pots.length - 1]!.amount += rest;
  return pots;
}

/** Kolejność przydziału nieparzystych żetonów: od pierwszego miejsca na lewo od buttona. */
function oddChipOrder(state: HandState): number[] {
  const n = state.seats.length;
  return Array.from({ length: n }, (_, i) => (state.config.button + 1 + i) % n);
}

function finish(state: HandState, showdown: boolean, uncalled: { seat: number; amount: number } | null): HandState {
  const pots = buildPots(state.seats);
  const order = oddChipOrder(state);
  const live = state.seats.filter((s) => !s.folded);
  const strengths = new Map<number, number>();
  if (showdown) for (const s of live) strengths.set(s.seat, strength([...s.hole, ...state.board]));
  const results: PotResult[] = pots.map((p) => {
    let winners: number[];
    if (!showdown || p.eligible.length === 1) winners = p.eligible.slice();
    else {
      const best = Math.min(...p.eligible.map((x) => strengths.get(x)!));
      winners = p.eligible.filter((x) => strengths.get(x) === best);
    }
    const base = Math.floor(p.amount / winners.length);
    let odd = p.amount - base * winners.length;
    const shares: Record<number, number> = {};
    for (const w of winners) shares[w] = base;
    for (const seat of order) {
      if (odd === 0) break;
      if (winners.includes(seat)) {
        shares[seat]! += 1;
        odd--;
      }
    }
    return { amount: p.amount, eligible: p.eligible, winners, shares };
  });
  for (const r of results) for (const [seat, v] of Object.entries(r.shares)) state.seats[Number(seat)]!.stack += v;
  const endedOn = state.street;
  state.result = {
    pots: results,
    uncalled,
    shown: showdown ? live.map((s) => s.seat) : [],
    net: state.seats.map((s) => s.stack - s.startStack),
    endedOn: showdown ? 'river' : endedOn,
  };
  state.toAct = null;
  return state;
}

export function isHandOver(state: HandState): boolean {
  return state.result !== null;
}

/** Pula w tej chwili (wszystkie wpłaty, łącznie z bieżącą ulicą). */
export function potSize(state: HandState): number {
  return state.seats.reduce((s, x) => s + x.committed, 0);
}

/** Odtwarza rozdanie z konfiguracji, ziarna, ustawienia kart i listy akcji. */
export function replayHand(
  config: TableConfig,
  seed: number,
  actions: readonly { seat: number; action: PlayerAction }[],
  preset?: HandPreset,
): HandState {
  let st = startHand(config, seed, preset);
  for (const a of actions) {
    if (st.toAct !== a.seat) throw new Error(`Odtwarzanie: mówi miejsce ${st.toAct}, a zapis ma ${a.seat}`);
    st = applyAction(st, a.action);
  }
  return st;
}
