import { describe, expect, it } from 'vitest';
import { parseCard, parseCards } from '@szkola/poker-core';
import { COMBO_C1, COMBO_C2, NC, rangeFromClasses } from '../src/flop/combos';
import { FlopGame, type GameSpec } from '../src/flop/game';
import { LIMIT_CIEZKI_MS } from './limity';

// Etap B3 (plan B, `docs/solver/plan-b-etapy.md`): turn + river w TS.
const OOP: Record<string, number> = {};
for (const c of ['AA', 'KK', 'QQ', 'JJ', '99', '88', 'AKs', 'AQs', 'KQs', 'QJs', 'JTs', 'T9s', '98s', '87s', 'AKo', 'KQo']) OOP[c] = 1;
const IP: Record<string, number> = {};
for (const c of ['TT', '77', '66', 'AJs', 'ATs', 'KJs', 'KTs', 'QTs', 'J9s', 'T8s', '76s', 'AJo', 'KJo', 'QJo', 'JTo', 'T9o']) IP[c] = 1;

function zeroCard(r: Float64Array, card: number): Float64Array {
  const out = Float64Array.from(r);
  for (let i = 0; i < NC; i++) if (COMBO_C1[i] === card || COMBO_C2[i] === card) out[i] = 0;
  return out;
}

describe('B3 turn + river', () => {
  it('turn bez zakładów z jednym riverem daje ten sam wynik co river z B2', () => {
    const turn = parseCards('Kd 9c 5h 2s');
    const river = parseCard('Js');
    const full = [...turn, river];
    const oop = zeroCard(rangeFromClasses(OOP, turn), river);
    const ip = zeroCard(rangeFromClasses(IP, turn), river);
    const common = { pot: 20, stack: 90, raiseMult: 3, allinFrac: 2 / 3, rakeRate: 0.05, rakeCap: 3 } as const;
    const r = new FlopGame({ ...common, board: full, ranges: [oop, ip], streets: [{ betsPot: [0.66] }] });
    const t = new FlopGame({ ...common, board: turn, ranges: [oop, ip], streets: [{ betsPot: [] }, { betsPot: [0.66] }], riverCards: [river] });
    r.run(300);
    t.run(300);
    expect(Math.abs(t.valueOop() - r.valueOop())).toBeLessThan(1e-6 * 20);
    const sr = r.rootStrategy();
    const st = t.strategyAt(['x', 'x', '=Js']);
    expect(st.actions).toEqual(sr.actions);
    let maxD = 0;
    for (let i = 0; i < sr.freqs.length; i++) maxD = Math.max(maxD, Math.abs(sr.freqs[i]! - st.freqs[i]!));
    expect(maxD).toBeLessThan(1e-6);
  });

  it(
    'NashConv turnu z 44 riverami poniżej 0,5% puli',
    () => {
      const turn = parseCards('Kd 9c 5h 2s');
      const spec: GameSpec = {
        board: turn,
        ranges: [rangeFromClasses(OOP, turn), rangeFromClasses(IP, turn)],
        pot: 20,
        stack: 90,
        streets: [{ betsPot: [0.66] }, { betsPot: [0.66] }],
        raiseMult: 3,
        allinFrac: 2 / 3,
        rakeRate: 0.05,
        rakeCap: 3,
      };
      const g = new FlopGame(spec);
      g.run(150);
      expect(g.stats().iterations).toBe(150);
      expect(g.stats().nashConvPot).toBeLessThan(0.005);
    },
    LIMIT_CIEZKI_MS,
  );
});
