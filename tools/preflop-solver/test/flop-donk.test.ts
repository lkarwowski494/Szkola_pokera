import { describe, expect, it } from 'vitest';
import { parseCard, parseCards } from '@szkola/poker-core';
import { NC, rangeFromClasses } from '../src/flop/combos';
import { FlopGame, type GameSpec } from '../src/flop/game';
import { solveNative } from '../src/flop/native';
import { LIMIT_CIEZKI_MS } from './limity';

// Etap D0 opcji B (`docs/solver/plan-b5-diagnoza.md`, D-1335): donk BB w SRP (M3) i strategia w węźle ze ścieżki.
const OOP: Record<string, number> = {};
for (const c of ['AA', 'KK', 'QQ', 'JJ', '99', '88', 'AKs', 'AQs', 'KQs', 'QJs', 'JTs', 'T9s', '98s', '87s', 'AKo', 'KQo']) OOP[c] = 1;
const IP: Record<string, number> = {};
for (const c of ['TT', '77', '66', 'AJs', 'ATs', 'KJs', 'KTs', 'QTs', 'J9s', 'T8s', '76s', 'AJo', 'KJo', 'QJo', 'JTo', 'T9o']) IP[c] = 1;
const flop = parseCards('Kd 9c 5h');
const ITERACJE = 200;
const DONK: GameSpec = {
  board: flop,
  ranges: [rangeFromClasses(OOP, flop), rangeFromClasses(IP, flop)],
  pot: 5.5,
  stack: 97.5,
  raiseMult: 3,
  allinFrac: 2 / 3,
  rakeRate: 0.05,
  rakeCap: 3,
  // M1 + M3: flop OOP pierwszy zakład 1,4bb, IP po czekaniu 1,4/4,4; turn i river 33% / 75% puli
  streets: [{ betsBb: [1.4, 4.4], oopLeadBb: [1.4] }, { betsPot: [0.33, 0.75] }, { betsPot: [0.33, 0.75] }],
  turnCards: [parseCard('2s')],
  riverCards: [parseCard('Js')],
};

describe('D0: donk OOP na flopie i strategia w węźle ze ścieżki', () => {
  it('drzewo TS: OOP ma własne rozmiary pierwszego zakładu, IP po czekaniu rozmiary ulicy', () => {
    const g = new FlopGame(DONK);
    expect(g.strategyAt([]).actions).toEqual(['x', 'b1.4']);
    expect(g.strategyAt(['x']).actions).toEqual(['x', 'b1.4', 'b4.4']);
    expect(g.strategyAt(['b1.4']).actions).toEqual(['f', 'c', 'r4.2']);
    // turn: OOP zaczyna z rozmiarami ulicy (donk dotyczy tylko wpisu flopu)
    expect(g.strategyAt(['x', 'x', '=2s']).actions).toEqual(['x', 'b1.82', 'b4.13']);
  });

  it(
    'C = TS (double): korzeń i węzeł [x] przy donku',
    () => {
      const ts = new FlopGame(DONK);
      ts.run(ITERACJE);
      const c = solveNative(DONK, ITERACJE, { threads: 2, real: 'double', path: ['x'] });
      const tr = ts.strategyAt([]);
      const tx = ts.strategyAt(['x']);
      expect(c.root.actions).toEqual(tr.actions);
      expect(c.node.player).toBe(1);
      expect(c.node.actions).toEqual(tx.actions);
      expect(c.node.freqs.length).toBe(NC * tx.actions.length);
      let maxD = 0;
      for (let i = 0; i < tx.freqs.length; i++) maxD = Math.max(maxD, Math.abs(tx.freqs[i]! - c.node.freqs[i]!));
      expect(maxD).toBeLessThan(1e-6);
      expect(Math.abs(c.nashConvPot - ts.stats().nashConvPot)).toBeLessThan(1e-6);
    },
    LIMIT_CIEZKI_MS,
  );

  it('C: ścieżka do nieistniejącej akcji kończy się błędem, nie strategią korzenia', () => {
    expect(() => solveNative(DONK, 1, { threads: 1, real: 'double', path: ['b9.9'] })).toThrow();
  });
});

describe('D0: ulica bez przebicia (reguła 12 GB z D-1335)', () => {
  const turn = parseCards('Kd 9c 5h 2s');
  const spec: GameSpec = {
    ...DONK,
    board: turn,
    ranges: [rangeFromClasses(OOP, turn), rangeFromClasses(IP, turn)],
    streets: [{ betsPot: [0.33, 0.75] }, { betsPot: [0.33, 0.75], noRaise: true }],
    turnCards: undefined,
    riverCards: [parseCard('Js'), parseCard('3c')],
  };
  it('TS: wobec zakładu na riverze tylko pas i sprawdzenie, na turnie przebicie zostaje', () => {
    const g = new FlopGame(spec);
    expect(g.strategyAt(['b1.82']).actions).toEqual(['f', 'c', 'r5.45']);
    expect(g.strategyAt(['x', 'x', '=Js', 'b1.82']).actions).toEqual(['f', 'c']);
  });
  it(
    'C = TS (double) przy riverze bez przebicia',
    () => {
      const ts = new FlopGame(spec);
      ts.run(ITERACJE);
      const c = solveNative(spec, ITERACJE, { threads: 2, real: 'double' });
      const r = ts.strategyAt([]);
      expect(c.root.actions).toEqual(r.actions);
      let maxD = 0;
      for (let i = 0; i < r.freqs.length; i++) maxD = Math.max(maxD, Math.abs(r.freqs[i]! - c.root.freqs[i]!));
      expect(maxD).toBeLessThan(1e-6);
      expect(Math.abs(c.nashConvPot - ts.stats().nashConvPot)).toBeLessThan(1e-6);
    },
    LIMIT_CIEZKI_MS,
  );
});

