import { describe, expect, it } from 'vitest';
import { parseCard, parseCards } from '@szkola/poker-core';
import { NC, rangeFromClasses } from '../src/flop/combos';
import { FlopGame, type GameSpec } from '../src/flop/game';
import { solveNative } from '../src/flop/native';
import { LIMIT_CIEZKI_MS } from './limity';

// Etap B4 (plan B, `docs/solver/plan-b-etapy.md`): flop w C z OpenMP, testy różnicowe wobec TS z B2/B3.
const OOP: Record<string, number> = {};
for (const c of ['AA', 'KK', 'QQ', 'JJ', '99', '88', 'AKs', 'AQs', 'KQs', 'QJs', 'JTs', 'T9s', '98s', '87s', 'AKo', 'KQo']) OOP[c] = 1;
const IP: Record<string, number> = {};
for (const c of ['TT', '77', '66', 'AJs', 'ATs', 'KJs', 'KTs', 'QTs', 'J9s', 'T8s', '76s', 'AJo', 'KJo', 'QJo', 'JTo', 'T9o']) IP[c] = 1;
const COMMON = { pot: 20, stack: 90, raiseMult: 3, allinFrac: 2 / 3, rakeRate: 0.05, rakeCap: 3 } as const;

function compare(spec: GameSpec, iterations: number): void {
  const ts = new FlopGame(spec);
  ts.run(iterations);
  // wariant double: ta sama arytmetyka co TS (float64); wariant float (produkcyjny) różni się zaokrągleniami
  // w sytuacjach obojętnych (diagnoza B4: docs/solver/dowody/b4-zielone.txt), jego jakość pilnuje test NashConv niżej
  const c = solveNative(spec, iterations, { threads: 2, real: 'double' });
  const r = ts.rootStrategy();
  expect(c.iterations).toBe(iterations);
  expect(c.root.actions).toEqual(r.actions);
  expect(c.root.freqs.length).toBe(NC * r.actions.length);
  let maxD = 0;
  for (let i = 0; i < r.freqs.length; i++) maxD = Math.max(maxD, Math.abs(r.freqs[i]! - c.root.freqs[i]!));
  expect(maxD).toBeLessThan(1e-6);
  expect(Math.abs(c.valueOop - ts.valueOop())).toBeLessThan(1e-6 * spec.pot);
  expect(Math.abs(c.nashConvPot - ts.stats().nashConvPot)).toBeLessThan(1e-6);
}

describe('B4 solver flopu w C: zgodność z TS', () => {
  it(
    'flop z jednym turnem i jednym riverem = wynik TS (B3)',
    () => {
      const flop = parseCards('Kd 9c 5h');
      compare(
        {
          ...COMMON,
          board: flop,
          ranges: [rangeFromClasses(OOP, flop), rangeFromClasses(IP, flop)],
          streets: [{ betsBb: [5, 14] }, { betsPot: [0.66] }, { betsPot: [0.66] }],
          turnCards: [parseCard('2s')],
          riverCards: [parseCard('Js')],
        },
        200,
      );
    },
    LIMIT_CIEZKI_MS,
  );

  it(
    'turn z 44 riverami = wynik TS (B3)',
    () => {
      const turn = parseCards('Kd 9c 5h 2s');
      compare({ ...COMMON, board: turn, ranges: [rangeFromClasses(OOP, turn), rangeFromClasses(IP, turn)], streets: [{ betsPot: [0.66] }, { betsPot: [0.66] }] }, 60);
    },
    LIMIT_CIEZKI_MS,
  );

  it(
    'pełny flop (wszystkie turny i rivery): NashConv poniżej 0,5% puli',
    () => {
      const flop = parseCards('Kd 9c 5h');
      // mniejsze zakresy niż w testach różnicowych: pełny flop to ok. 2000 runoutów, test musi zmieścić się w limicie CI
      const small = (w: Record<string, number>) => Object.fromEntries(Object.entries(w).filter((_, i) => i % 2 === 0));
      const c = solveNative(
        { ...COMMON, board: flop, ranges: [rangeFromClasses(small(OOP), flop), rangeFromClasses(small(IP), flop)], streets: [{ betsBb: [5, 14] }, { betsPot: [0.66] }, { betsPot: [0.66] }], oopCheckedFirst: true },
        150,
      );
      expect(c.iterations).toBe(150);
      expect(c.nashConvPot).toBeLessThan(0.005);
    },
    LIMIT_CIEZKI_MS,
  );
});
