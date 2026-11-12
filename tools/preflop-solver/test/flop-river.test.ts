import { describe, expect, it } from 'vitest';
import { parseCard, parseCards } from '@szkola/poker-core';
import { comboIndex, NC, rangeFromClasses, rangeFromCombos } from '../src/flop/combos';
import { FlopGame, type GameSpec } from '../src/flop/game';
import { solveRef } from './flop-ref';
import { LIMIT_CIEZKI_MS } from './limity';

// W1 (plan B, etap B2, `docs/solver/plan-b-etapy.md`): rachunek szczebla 1 i zgodność z niezależnym solverem.
const BOARD = parseCards('Ks Qd 7h 4c 2s'); // bez strita i koloru: siłę rąk ustala wyłącznie para/set/wysoka karta
const VALUE = ['KhKd', 'KhKc', 'KdKc']; // set króli: bije wszystko poniżej
const AIR: string[] = [];
for (const a of 'shdc') for (const b of 'shdc') AIR.push(`9${a}8${b}`); // 16 kombinacji powietrza
const CATCH: string[] = [];
for (const q of 'shc') for (const a of 'shdc') CATCH.push(`A${a}Q${q}`); // 12 łapaczy blefów: para dam bije 98, przegrywa z setem

function polar(betPot: number): GameSpec {
  const oop = rangeFromCombos([...VALUE, ...AIR]);
  const ip = rangeFromCombos(CATCH);
  return {
    board: BOARD,
    ranges: [oop, ip],
    pot: 10,
    stack: 100,
    streets: [{ betsPot: [betPot] }],
    raiseMult: 0,
    allinFrac: 2,
    rakeRate: 0,
    rakeCap: 0,
    ipBetAfterCheck: false,
  };
}

function freqOf(f: Float64Array, nA: number, a: number, list: readonly string[], w?: Float64Array): number {
  let s = 0;
  let t = 0;
  for (const c of list) {
    const i = comboIndex(parseCard(c.slice(0, 2)), parseCard(c.slice(2, 4)));
    const wi = w ? w[i]! : 1;
    s += wi * f[i * nA + a]!;
    t += wi;
  }
  return s / t;
}

describe('W1(a) zakres spolaryzowany kontra łapacz blefów (R-M8-010, R-M6-001)', () => {
  for (const betPot of [1, 0.5]) {
    it(`zakład ${betPot} puli: udział blefów B÷(P+2B), obrona P÷(P+B), tolerancja 0,5 pp`, () => {
      const g = new FlopGame(polar(betPot));
      g.run(3000);
      const P = 10;
      const B = betPot * P;
      const root = g.rootStrategy();
      const bet = root.actions.findIndex((a) => a.startsWith('b'));
      expect(bet).toBeGreaterThanOrEqual(0);
      const nA = root.actions.length;
      const valueBets = freqOf(root.freqs, nA, bet, VALUE) * VALUE.length;
      const bluffs = freqOf(root.freqs, nA, bet, AIR) * AIR.length;
      expect(valueBets / VALUE.length).toBeGreaterThan(0.99);
      expect(Math.abs(bluffs / (valueBets + bluffs) - B / (P + 2 * B))).toBeLessThan(0.005);
      const resp = g.strategyAt([root.actions[bet]!]);
      const call = resp.actions.indexOf('c');
      expect(call).toBeGreaterThanOrEqual(0);
      expect(Math.abs(freqOf(resp.freqs, resp.actions.length, call, CATCH) - P / (P + B))).toBeLessThan(0.005);
    });
  }
});

describe('W1(b) zbieżność: NashConv poniżej 0,1% puli', () => {
  it('gra spolaryzowana', () => {
    const g = new FlopGame(polar(1));
    g.run(3000);
    expect(g.stats().iterations).toBe(3000);
    expect(g.stats().nashConvPot).toBeLessThan(0.001);
  });

  it(
    'river z szerokimi zakresami, przebiciami i rake',
    () => {
      const board = parseCards('Ah Td 7c 5s 2h');
      const w: Record<string, number> = {};
      for (const c of ['AA', 'TT', '77', '55', 'AKs', 'AQs', 'AJs', 'ATs', 'A5s', 'KQs', 'KJs', 'QJs', 'JTs', 'T9s', '98s', '87s', '76s', '65s', 'AKo', 'AQo', 'KQo', 'QJo', 'JTo']) w[c] = 1;
      const v: Record<string, number> = {};
      for (const c of ['99', '88', '66', '44', '33', 'A9s', 'A8s', 'A4s', 'A3s', 'KTs', 'QTs', 'J9s', 'T8s', '97s', '86s', '75s', '64s', '54s', 'AJo', 'ATo', 'KJo', 'KTo', 'QTo', 'J9o', 'T9o']) v[c] = 1;
      const spec: GameSpec = {
        board,
        ranges: [rangeFromClasses(w, board), rangeFromClasses(v, board)],
        pot: 20,
        stack: 80,
        streets: [{ betsPot: [0.5, 1] }],
        raiseMult: 3,
        allinFrac: 2 / 3,
        rakeRate: 0.05,
        rakeCap: 3,
      };
      const g = new FlopGame(spec);
      g.run(1000);
      expect(g.stats().iterations).toBe(1000);
      expect(g.stats().nashConvPot).toBeLessThan(0.001);
    },
    LIMIT_CIEZKI_MS,
  );
});

describe('W1(c) zgodność z niezależnym skalarnym CFR (test/flop-ref.ts)', () => {
  it('wartość gry i częstości w korzeniu', () => {
    const board = parseCards('Jc 8d 5h 3s 2c');
    const pairs = (l: string[]) => l.map((s) => [parseCard(s.slice(0, 2)), parseCard(s.slice(2, 4))] as const);
    const oopL = ['AsAh', 'JsJh', 'Js9s', 'Ts9s', '7s6s', 'KsQs'];
    const ipL = ['JdTd', 'QhQd', '8s8h', 'AdKd', '9h9d', '6h4h'];
    const ref = solveRef({ board, oop: pairs(oopL), ip: pairs(ipL), pot: 10, bet: 7 }, 5000);
    const g = new FlopGame({
      board,
      ranges: [rangeFromCombos(oopL), rangeFromCombos(ipL)],
      pot: 10,
      stack: 100,
      streets: [{ betsBb: [7] }],
      raiseMult: 0,
      allinFrac: 2,
      rakeRate: 0,
      rakeCap: 0,
    });
    g.run(500);
    expect(Math.abs(g.valueOop() - ref.valueOop)).toBeLessThan(0.001 * 10); // 0,1% puli
    const root = g.rootStrategy();
    const bet = root.actions.findIndex((a) => a.startsWith('b'));
    expect(bet).toBeGreaterThanOrEqual(0);
    const ours = oopL.map((c) => freqOf(root.freqs, root.actions.length, bet, [c]));
    // łączna częstość zakładu OOP (strategie pojedynczych rąk mogą być niejednoznaczne, suma nie)
    const sum = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
    expect(Math.abs(sum(ours) - sum(ref.oopBet))).toBeLessThan(0.01);
  }, LIMIT_CIEZKI_MS);
});

it('wektor zakresu ma 1326 pozycji i zeruje kombinacje z kartami stołu', () => {
  const r = rangeFromClasses({ AA: 1 }, parseCards('As 7d 2c'));
  expect(r.length).toBe(NC);
  expect(r.reduce((a, b) => a + b, 0)).toBe(3);
});
