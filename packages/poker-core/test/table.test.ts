import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  applyAction,
  buildPots,
  createRng,
  legalActions,
  parseCards,
  positionOf,
  potSize,
  randInt,
  replayHand,
  startHand,
  tableSeats,
  validateAction,
  type Card,
  type HandState,
  type PlayerAction,
  type Rng,
  type SeatState,
  type TableConfig,
} from '../src';

const BB = 100;
const six = (stack = 100 * BB, button = 3): TableConfig => ({ stacks: Array(6).fill(stack), smallBlind: BB / 2, bigBlind: BB, button });

/** Losowa legalna akcja (do testów właściwości). */
function randomAction(rng: Rng, st: HandState): PlayerAction {
  const la = legalActions(st);
  const opts: PlayerAction[] = [{ type: 'fold' }];
  if (la.canCheck) opts.push({ type: 'check' }, { type: 'check' });
  if (la.callAmount !== null) opts.push({ type: 'call' }, { type: 'call' });
  if (la.minTo !== null && la.maxTo !== null) {
    const span = la.maxTo - la.minTo;
    const to = rng() < 0.15 ? la.maxTo : la.minTo + randInt(rng, Math.min(span, 4 * BB) + 1);
    opts.push({ type: la.aggressive, to });
  }
  return opts[randInt(rng, opts.length)]!;
}

function playRandom(config: TableConfig, seed: number): HandState {
  const rng = createRng(seed ^ 0x9e3779b9);
  let st = startHand(config, seed);
  let steps = 0;
  while (st.toAct !== null) {
    st = applyAction(st, randomAction(rng, st));
    if (++steps > 500) throw new Error('rozdanie się nie kończy');
  }
  return st;
}

const configArb = fc
  .integer({ min: 2, max: 9 })
  .chain((n) =>
    fc.record({
      stacks: fc.array(fc.integer({ min: 1, max: 300 * BB }), { minLength: n, maxLength: n }),
      smallBlind: fc.constant(BB / 2),
      bigBlind: fc.constant(BB),
      button: fc.integer({ min: 0, max: n - 1 }),
    }),
  );

function checkInvariants(st: HandState): void {
  for (const s of st.seats) {
    expect(s.stack).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(s.stack)).toBe(true);
  }
  if (st.toAct !== null) {
    const s = st.seats[st.toAct]!;
    expect(s.folded).toBe(false);
    expect(s.allIn).toBe(false);
  }
}

describe('maszyna stanów rozdania: właściwości', () => {
  it('żetony się nie gubią: suma wyników 0, pule równe wpłatom, zwycięzcy uprawnieni', () => {
    fc.assert(
      fc.property(configArb, fc.integer(), (config, seed) => {
        const rng = createRng(seed ^ 0x51ed27);
        let st = startHand(config, seed);
        checkInvariants(st);
        while (st.toAct !== null) {
          st = applyAction(st, randomAction(rng, st));
          checkInvariants(st);
        }
        const r = st.result!;
        expect(r.net.reduce((a, b) => a + b, 0)).toBe(0);
        const committed = st.seats.reduce((a, s) => a + s.committed, 0);
        expect(r.pots.reduce((a, p) => a + p.amount, 0)).toBe(committed);
        for (const p of r.pots) {
          expect(p.winners.length).toBeGreaterThan(0);
          for (const w of p.winners) expect(p.eligible).toContain(w);
          expect(Object.values(p.shares).reduce((a, b) => a + b, 0)).toBe(p.amount);
        }
        // nikt nie traci więcej niż swój stack
        st.seats.forEach((s, i) => expect(r.net[i]).toBeGreaterThanOrEqual(-s.startStack));
      }),
      { numRuns: 400 },
    );
  });

  it('odtworzenie z ziarna i listy akcji daje to samo rozdanie', () => {
    fc.assert(
      fc.property(configArb, fc.integer(), (config, seed) => {
        const st = playRandom(config, seed);
        const again = replayHand(config, seed, st.actions);
        expect(again.result).toEqual(st.result);
        expect(again.board).toEqual(st.board);
        expect(again.events).toEqual(st.events);
      }),
      { numRuns: 200 },
    );
  });

  it('legalne akcje są akceptowane, a kwoty spoza przedziału odrzucane', () => {
    fc.assert(
      fc.property(configArb, fc.integer(), (config, seed) => {
        const rng = createRng(seed);
        let st = startHand(config, seed);
        while (st.toAct !== null) {
          const la = legalActions(st);
          if (la.minTo !== null && la.maxTo !== null) {
            expect(la.minTo).toBeGreaterThan(st.currentBet);
            expect(validateAction(st, { type: la.aggressive, to: la.minTo })).toBeNull();
            expect(validateAction(st, { type: la.aggressive, to: la.maxTo })).toBeNull();
            expect(validateAction(st, { type: la.aggressive, to: la.maxTo + 1 })).not.toBeNull();
            if (la.minTo < la.maxTo) expect(validateAction(st, { type: la.aggressive, to: la.minTo - 1 })).not.toBeNull();
          }
          if (!la.canCheck) expect(validateAction(st, { type: 'check' })).not.toBeNull();
          st = applyAction(st, randomAction(rng, st));
        }
      }),
      { numRuns: 200 },
    );
  });

  it('zamiana kolorów jedną permutacją nie zmienia wyniku (dokument 14, 5.6)', () => {
    fc.assert(
      fc.property(configArb, fc.integer(), fc.constantFrom(...permutations([0, 1, 2, 3])), (config, seed, perm) => {
        const st = playRandom(config, seed);
        const map = (c: Card) => (c & ~3) | perm[c & 3]!;
        const preset = { holes: st.seats.map((s) => [map(s.hole[0]), map(s.hole[1])] as const), board: st.runout.map(map) };
        const swapped = replayHand(config, seed, st.actions, preset);
        expect(swapped.result!.net).toEqual(st.result!.net);
      }),
      { numRuns: 150 },
    );
  });
});

function permutations(xs: number[]): number[][] {
  if (xs.length <= 1) return [xs];
  return xs.flatMap((x, i) => permutations([...xs.slice(0, i), ...xs.slice(i + 1)]).map((p) => [x, ...p]));
}

describe('maszyna stanów rozdania: przypadki', () => {
  it('6-max: pozycje, blindy i kolejność przed flopem i po flopie', () => {
    const st = startHand(six(), 1);
    expect(st.seats.map((s) => s.position)).toEqual(['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB']);
    expect(positionOf(9, 0, 3)).toBe('UTG');
    expect(positionOf(9, 0, 0)).toBe('BTN');
    expect(st.seats[4]!.streetBet).toBe(50);
    expect(st.seats[5]!.streetBet).toBe(100);
    expect(st.toAct).toBe(0);
    // wszyscy pasują do BB: BB wygrywa blind małego blinda, a jego własny zakład wraca jako niesprawdzony
    let s = st;
    for (let i = 0; i < 5; i++) s = applyAction(s, { type: 'fold' });
    expect(s.toAct).toBeNull();
    expect(s.result!.net[5]).toBe(50);
    expect(s.result!.net[4]).toBe(-50);
    expect(s.result!.endedOn).toBe('preflop');
    expect(s.result!.uncalled).toEqual({ seat: 5, amount: 50 });
  });

  it('duży blind ma opcję po limpach, a po flopie pierwszy mówi mały blind', () => {
    let s = startHand(six(), 2);
    s = applyAction(s, { type: 'call' }); // UTG
    for (let i = 0; i < 3; i++) s = applyAction(s, { type: 'fold' }); // HJ, CO, BTN
    s = applyAction(s, { type: 'call' }); // SB
    expect(s.toAct).toBe(5);
    expect(legalActions(s).canCheck).toBe(true);
    expect(legalActions(s).minTo).toBe(200);
    s = applyAction(s, { type: 'check' });
    expect(s.street).toBe('flop');
    expect(s.board).toHaveLength(3);
    expect(s.toAct).toBe(4);
    expect(potSize(s)).toBe(300);
  });

  it('heads-up: button jest małym blindem, mówi pierwszy przed flopem i ostatni po flopie', () => {
    const cfg: TableConfig = { stacks: [10000, 10000], smallBlind: 50, bigBlind: 100, button: 1 };
    expect(tableSeats(2, 1)).toEqual({ sb: 1, bb: 0, firstPreflop: 1, firstPostflop: 0 });
    let s = startHand(cfg, 3);
    expect(s.seats[1]!.position).toBe('BTN');
    expect(s.seats[1]!.streetBet).toBe(50);
    expect(s.toAct).toBe(1);
    s = applyAction(s, { type: 'call' });
    s = applyAction(s, { type: 'check' });
    expect(s.street).toBe('flop');
    expect(s.toAct).toBe(0);
  });

  it('najmniejsze przebicie to ostatnie pełne podbicie; all-in za mało nie otwiera licytacji ponownie', () => {
    // UTG 100bb, HJ ma tylko 6bb
    const cfg: TableConfig = { stacks: [10000, 600, 10000, 10000, 10000, 10000], smallBlind: 50, bigBlind: 100, button: 3 };
    let s = startHand(cfg, 4);
    expect(legalActions(s).minTo).toBe(200);
    s = applyAction(s, { type: 'raise', to: 400 }); // UTG do 4bb (podbicie o 3bb)
    expect(legalActions(s).minTo).toBe(600); // HJ: all-in 6bb to podbicie tylko o 2bb, ale za mniej wolno
    s = applyAction(s, { type: 'raise', to: 600 });
    expect(s.seats[1]!.allIn).toBe(true);
    expect(legalActions(s).minTo).toBe(900); // CO: 6bb + pełne podbicie 3bb
    s = applyAction(s, { type: 'fold' }); // CO
    s = applyAction(s, { type: 'fold' }); // BTN
    s = applyAction(s, { type: 'fold' }); // SB
    s = applyAction(s, { type: 'fold' }); // BB
    // UTG już mówił, a od tego czasu było tylko niepełne przebicie: może sprawdzić albo spasować
    expect(s.toAct).toBe(0);
    const la = legalActions(s);
    expect(la.callAmount).toBe(200);
    expect(la.minTo).toBeNull();
    expect(validateAction(s, { type: 'raise', to: 2000 })).not.toBeNull();
  });

  it('side pot: krótki all-in walczy tylko o pulę główną', () => {
    // seat 0: 10bb, seat 1: 50bb, seat 2: 100bb; button 2, SB 0, BB 1
    const cfg: TableConfig = { stacks: [1000, 5000, 10000], smallBlind: 50, bigBlind: 100, button: 2 };
    const preset = {
      holes: [parseCards('As Ah'), parseCards('Ks Kh'), parseCards('Qs Qh')] as [Card, Card][],
      board: parseCards('2c 7d 9s Jc 3h'),
    };
    let s = startHand(cfg, 5, preset);
    expect(s.toAct).toBe(2); // button mówi pierwszy przy 3 graczach
    s = applyAction(s, { type: 'raise', to: 10000 });
    s = applyAction(s, { type: 'call' }); // SB all-in 10bb
    s = applyAction(s, { type: 'call' }); // BB all-in 50bb
    const r = s.result!;
    expect(r.uncalled).toEqual({ seat: 2, amount: 5000 });
    expect(r.pots.map((p) => p.amount)).toEqual([3000, 8000]);
    expect(r.pots[0]!.winners).toEqual([0]);
    expect(r.pots[1]!.winners).toEqual([1]);
    expect(r.net).toEqual([2000, 3000, -5000]);
    expect(r.shown).toEqual([0, 1, 2]);
  });

  it('podział puli i nieparzysty żeton dla pierwszego na lewo od buttona', () => {
    const cfg: TableConfig = { stacks: [1001, 1001, 1001], smallBlind: 50, bigBlind: 100, button: 2 };
    // obaj grają strita ze stołu; trzeci ma gorszą rękę
    const preset = {
      holes: [parseCards('2s 3h'), parseCards('2d 3c'), parseCards('Ks Kd')] as [Card, Card][],
      board: parseCards('Ah Kh Qc Jd Ts'),
    };
    let s = startHand(cfg, 6, preset);
    s = applyAction(s, { type: 'raise', to: 1001 }); // BTN all-in
    s = applyAction(s, { type: 'call' });
    s = applyAction(s, { type: 'call' });
    const r = s.result!;
    expect(r.pots).toHaveLength(1);
    expect(r.pots[0]!.winners.sort()).toEqual([0, 1, 2]);
    // 3003 / 3 = 1001 każdy, bez reszty
    expect(r.net).toEqual([0, 0, 0]);
    const odd = buildPots([
      seatStub(0, 5, false),
      seatStub(1, 5, false),
      seatStub(2, 1, true),
    ]);
    expect(odd).toEqual([{ amount: 11, eligible: [0, 1] }]);
  });

  it('pas spasowanego po większej wpłacie zasila pulę, w której nie walczy', () => {
    const pots = buildPots([seatStub(0, 300, false), seatStub(1, 100, false), seatStub(2, 500, true)]);
    expect(pots.reduce((a, p) => a + p.amount, 0)).toBe(900);
    expect(pots[0]).toEqual({ amount: 300, eligible: [0, 1] });
  });

  it('nielegalne akcje są odrzucane', () => {
    const s = startHand(six(), 7);
    expect(() => applyAction(s, { type: 'check' })).toThrow();
    expect(() => applyAction(s, { type: 'bet', to: 300 })).toThrow();
    expect(() => applyAction(s, { type: 'raise', to: 150 })).toThrow();
    expect(() => applyAction(s, { type: 'raise' })).toThrow();
    expect(() => startHand({ ...six(), stacks: Array(10).fill(100) }, 1)).toThrow();
    expect(() => startHand({ ...six(), button: 6 }, 1)).toThrow();
  });
});

function seatStub(seat: number, committed: number, folded: boolean): SeatState {
  return {
    seat,
    position: '',
    startStack: 0,
    stack: 0,
    streetBet: 0,
    committed,
    folded,
    allIn: false,
    acted: true,
    actedAtFullBet: 0,
    hole: [0, 1],
  };
}
