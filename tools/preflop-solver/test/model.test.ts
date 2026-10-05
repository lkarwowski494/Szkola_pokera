import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import { CANON_WEIGHTS, impliedTerm, N, playabilityWeight, playGroup, shareMatrix, type EqrParams, type ImpliedData } from '../src/model';

/** Syntetyczna macierz equity (jak w solver.test.ts) i syntetyczne dane implied odds. */
const equity = HAND_CLASSES.map((_, i) => HAND_CLASSES.map((__, j) => 0.5 + 0.4 * ((169 - i) / 169 - (169 - j) / 169)));
const implied: ImpliedData = { nut: HAND_CLASSES.map((_, i) => ((i * 37) % 23) / 100), pay: HAND_CLASSES.map((_, i) => ((i * 11) % 31) / 100) };

describe('model EQR: warianty naprawy (raport 10)', () => {
  it('domyślne wagi grup są wagami kanonu (np. 22–66 1,1; K6o 0,78; 76s 1,08)', () => {
    expect(playabilityWeight('55')).toBe(1.1);
    expect(playabilityWeight('K6o')).toBe(0.78);
    expect(playabilityWeight('76s')).toBe(1.08);
    expect(playGroup('AKo')).toBe('oBw');
    expect(playGroup('A5s')).toBe('sAce');
    for (const hc of HAND_CLASSES) expect(playabilityWeight(hc)).toBe(CANON_WEIGHTS[playGroup(hc)]);
    expect(playabilityWeight('55', { p22: 0.9 })).toBe(0.9);
  });

  it('człon implied odds jest antysymetryczny i znika przy SPR 0 i io 0', () => {
    const p: EqrParams = { k: 1, m: 0.1, rakeRate: 0, rakeCap: 0, io: 0.2 };
    for (const [h, v] of [[0, 100], [12, 150], [77, 3]] as const) {
      expect(impliedTerm(p, implied, 10, h, v)).toBeCloseTo(-impliedTerm(p, implied, 10, v, h), 12);
      expect(impliedTerm(p, implied, 0, h, v)).toBeCloseTo(0, 12);
      expect(impliedTerm({ ...p, io: 0 }, implied, 10, h, v)).toBe(0);
    }
    expect(impliedTerm({ ...p, ioCap: 5 }, implied, 10, 0, 100)).toBeCloseTo(impliedTerm(p, implied, 5, 0, 100), 12);
  });

  it('z członem io udziały nadal sumują się do 1 (gra o stałej sumie) przy dowolnym SPR', () => {
    // bez przewagi pozycji (m = 0) macierz jest symetryczna względem zamiany graczy, więc s(h,v) + s(v,h) = 1;
    // w solverze udział gracza z pozycją to 1 − s(h,v), więc stała suma nie zależy od m
    const p: EqrParams = { k: 1.25, m: 0, rakeRate: 0, rakeCap: 0, io: 0.3, weights: { p22: 0.9 }, sprPlay: 16 };
    for (const spr of [0, 1.5, 4.4, 17.7]) {
      const s = shareMatrix(equity, p, spr, null, implied);
      for (let h = 0; h < N; h += 7) for (let v = 0; v < N; v += 5) expect(s[h * N + v]! + s[v * N + h]!).toBeCloseTo(1, 9);
    }
  });
});
