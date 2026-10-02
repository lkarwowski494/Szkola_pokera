import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import { computePairs, N, PRIOR, type EquityData } from '../src/model';
import { PreflopSolver } from '../src/solver';
import { buildTree, N_PLAYERS, type Node } from '../src/tree';

/** Syntetyczna, symetryczna macierz equity: silniejsza klasa = niższy indeks rankingu. */
function syntheticEquity(): EquityData {
  const pairs = computePairs();
  const strength = HAND_CLASSES.map((_, i) => 1 - i / 169);
  const equity = HAND_CLASSES.map((_, i) => HAND_CLASSES.map((__, j) => 0.5 + 0.4 * (strength[i]! - strength[j]!)));
  return { classes: [...HAND_CLASSES], equity, pairs };
}

describe('drzewo', () => {
  const { nodes } = buildTree();
  it('każdy węzeł decyzyjny ma co najmniej dwie akcje, terminale mają poprawną pulę', () => {
    for (const n of nodes) {
      if (n.kind === 'decision') expect(n.actions.length).toBeGreaterThanOrEqual(2);
      else expect(n.pot).toBeCloseTo(n.invested.reduce((a, b) => a + b, 0), 6);
    }
  });
  it('na flopie dokładnie dwóch graczy z równą stawką', () => {
    for (const n of nodes) {
      if (n.kind !== 'showdown') continue;
      expect(n.invested[n.oop]).toBeCloseTo(n.invested[n.ip]!, 6);
      expect(n.oop).not.toBe(n.ip);
    }
  });
  it('nikt nie wkłada więcej niż stack', () => {
    for (const n of nodes) if (n.kind !== 'decision') for (const x of n.invested) expect(x).toBeLessThanOrEqual(100);
  });
});

describe('solver', () => {
  it('bez rake gra ma sumę zerową (suma wartości graczy = 0)', () => {
    const s = new PreflopSolver(buildTree(), syntheticEquity(), { k: 1, m: 0.08, rakeRate: 0, rakeCap: 0 });
    for (let i = 0; i < 5; i++) s.step();
    let total = 0;
    for (let p = 0; p < N_PLAYERS; p++) total += s.value(p);
    expect(Math.abs(total)).toBeLessThan(1e-9);
  }, 60_000);

  it('z rake suma wartości jest ujemna (rake wychodzi z gry)', () => {
    const s = new PreflopSolver(buildTree(), syntheticEquity(), { k: 1, m: 0.08, rakeRate: 0.05, rakeCap: 3 });
    for (let i = 0; i < 5; i++) s.step();
    let total = 0;
    for (let p = 0; p < N_PLAYERS; p++) total += s.value(p);
    expect(total).toBeLessThan(0);
  }, 60_000);

  it('wykorzystywalność maleje z iteracjami', () => {
    const s = new PreflopSolver(buildTree(), syntheticEquity(), { k: 1, m: 0.08, rakeRate: 0, rakeCap: 0 });
    for (let i = 0; i < 3; i++) s.step();
    const early = s.exploitability().nashConv;
    for (let i = 0; i < 25; i++) s.step();
    const late = s.exploitability().nashConv;
    expect(late).toBeLessThan(early);
    expect(late).toBeGreaterThanOrEqual(-1e-9);
  }, 120_000);

  it('rozkład a priori sumuje się do 1', () => {
    let s = 0;
    for (let i = 0; i < N; i++) s += PRIOR[i]!;
    expect(s).toBeCloseTo(1, 12);
  });
});

export type { Node };
