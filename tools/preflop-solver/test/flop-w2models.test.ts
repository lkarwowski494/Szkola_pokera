import { describe, expect, it } from 'vitest';
import { parseCards } from '@szkola/poker-core';
import { NC } from '../src/flop/combos';
import { w2Game } from '../src/flop/w2models';

// Modele gry W2: D-1333 (B5) i reguła opcji B D-1335 (`docs/solver/plan-b5-diagnoza.md`), zapisana przed pomiarem.
const board = parseCards('Ks 7d 2c');
const R: readonly [Float64Array, Float64Array] = [new Float64Array(NC), new Float64Array(NC)];
const SRP = { pot: 5.5, stack: 97.5, srp: true } as const;
const BB3 = { pot: 20.5, stack: 90, srp: false } as const;

describe('modele gry W2', () => {
  it('d1333: drzewo B5 bez zmian (SRP: BB czeka, turn i river 66%, rake 5%/3bb)', () => {
    const g = w2Game('d1333', SRP, board, R, 1.4);
    expect(g.path).toEqual([]);
    expect(g.spec.oopCheckedFirst).toBe(true);
    expect(g.spec.streets).toEqual([{ betsBb: [1.4, 4.4] }, { betsPot: [0.66] }, { betsPot: [0.66] }]);
    expect([g.spec.pot, g.spec.stack, g.spec.raiseMult, g.spec.allinFrac, g.spec.rakeRate, g.spec.rakeCap]).toEqual([5.5, 97.5, 3, 2 / 3, 0.05, 3]);
    const s = w2Game('d1333', BB3, board, R, 5.6).spec;
    expect(s.oopCheckedFirst).toBe(false);
    expect(s.streets[0]).toEqual({ betsBb: [5.6, 14.4] });
    expect(w2Game('d1333', BB3, board, R, 5.4).spec.streets[0]).toEqual({ betsBb: [5.4, 14] });
  });
});
