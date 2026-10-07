import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import { computePairs, N, PRIOR, type EquityData } from '../src/model';
import { PreflopSolver } from '../src/solver';
import { threeWayCompat, type ThreeWayData } from '../src/threeway';
import { buildTree, DEFAULT_TREE, isInPosition, N_PLAYERS, POSITIONS, positionsFor, postflopOrder, type Node } from '../src/tree';

/** Syntetyczna, symetryczna macierz equity: silniejsza klasa = niższy indeks rankingu. */
function syntheticEquity(): EquityData {
  const pairs = computePairs();
  const strength = HAND_CLASSES.map((_, i) => 1 - i / 169);
  const equity = HAND_CLASSES.map((_, i) => HAND_CLASSES.map((__, j) => 0.5 + 0.4 * (strength[i]! - strength[j]!)));
  return { classes: [...HAND_CLASSES], equity, pairs };
}

/** Syntetyczne dane 3-way: equity proporcjonalne do siły klasy, prawdziwe blokery. */
let tw: ThreeWayData | null = null;
function syntheticThreeWay(): ThreeWayData {
  if (tw) return tw;
  const st = HAND_CLASSES.map((_, i) => 1.1 - i / 169);
  const eq = new Float32Array(N * N * N);
  for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) eq[x * N * N + y * N + z] = st[x]! / (st[x]! + st[y]! + st[z]!);
  tw = { eq, compat: threeWayCompat(), samples: 0 };
  return tw;
}

describe('drzewo', () => {
  const { nodes } = buildTree();
  it('każdy węzeł decyzyjny ma co najmniej dwie akcje, terminale mają poprawną pulę', () => {
    for (const n of nodes) {
      if (n.kind === 'decision') expect(n.actions.length).toBeGreaterThanOrEqual(2);
      else if (n.kind !== 'external') expect(n.pot).toBeCloseTo(n.invested.reduce((a, b) => a + b, 0), 6);
    }
  });
  it('pule trzyosobowe: tylko po dołączeniu dużego blinda, równe stawki', () => {
    const three = nodes.filter((n) => n.kind === 'showdown3');
    expect(three.length).toBeGreaterThan(0);
    for (const n of three) {
      if (n.kind !== 'showdown3') continue;
      expect(n.players).toContain(5);
      expect(n.path.endsWith('BB:call')).toBe(true);
      const inv = n.players.map((p) => n.invested[p]!);
      expect(Math.max(...inv) - Math.min(...inv)).toBeLessThan(1e-9);
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
    for (const n of nodes) if (n.kind !== 'decision' && n.kind !== 'external') for (const x of n.invested) expect(x).toBeLessThanOrEqual(100);
  });
});

describe('drzewo 9-max', () => {
  const POS9 = positionsFor(9);
  const prefix = 'UTG:fold,UTG+1:fold,UTG+2:fold';
  // ścieżka 6-max → 9-max: UTG 6-max to LJ 9-max, reszta nazw bez zmian
  const to9 = (path: string) => [prefix, ...(path ? path.split(',').map((x) => (x.startsWith('UTG:') ? `LJ:${x.slice(4)}` : x)) : [])].join(',');
  const sig = (n: Node, pos: readonly string[], map: (p: string) => string) =>
    n.kind === 'decision'
      ? `D ${map(n.path)} ${pos[n.player]} ${n.actions.map((a) => a.label).join('/')}`
      : n.kind === 'external'
        ? `X ${n.path}`
        : `${n.kind} ${map(n.path)} ${n.pot.toFixed(2)} ${n.kind === 'showdown' ? `${pos[n.oop]}-${pos[n.ip]}` : n.kind === 'showdown3' ? n.players.map((q) => pos[q]).join('-') : pos[n.winner]}`;

  it('po pasach UTG, UTG+1 i UTG+2 poddrzewo jest dokładnie drzewem 6-max (te same węzły, akcje, pule i pozycje)', () => {
    const six = buildTree();
    const nine = buildTree({ ...DEFAULT_TREE, players: 9 });
    const sub9 = nine.nodes.filter((n) => n.path === prefix || n.path.startsWith(`${prefix},`)).map((n) => sig(n, POS9, (x) => x)).sort();
    const sub6 = six.nodes.map((n) => sig(n, POS9.slice(3), to9)).sort();
    expect(POSITIONS.slice(1)).toEqual(POS9.slice(4));
    expect(sub9).toEqual(sub6);
  });

  it('z externalFolds poddrzewo 6-max jest jedną końcówką external, a reszta drzewa się nie zmienia', () => {
    const full = buildTree({ ...DEFAULT_TREE, players: 9 });
    const ext = buildTree({ ...DEFAULT_TREE, players: 9, externalFolds: 3 });
    expect(ext.players).toBe(9);
    const outside = (n: Node) => !(n.path === prefix || n.path.startsWith(`${prefix},`));
    expect(ext.nodes.filter(outside).map((n) => sig(n, POS9, (x) => x)).sort()).toEqual(full.nodes.filter(outside).map((n) => sig(n, POS9, (x) => x)).sort());
    const x = ext.nodes.filter((n) => n.kind === 'external');
    expect(x).toHaveLength(1);
    expect(x[0]!.path).toBe(prefix);
    // blindy 9-max to miejsca 7 i 8; po flopie mówią pierwsze
    expect(postflopOrder(7, 9)).toBe(0);
    expect(postflopOrder(8, 9)).toBe(1);
    expect(isInPosition(6, 5, 9)).toBe(true);
  });
});

describe('dane 3-way', () => {
  it('wagi blokerów 3-way sumują się do 1 przy rozkładzie a priori', () => {
    const c = syntheticThreeWay().compat;
    let s = 0;
    for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) s += PRIOR[x]! * PRIOR[y]! * PRIOR[z]! * c[x * N * N + y * N + z]!;
    expect(s).toBeCloseTo(1, 4);
  }, 60_000);
});

describe('solver', () => {
  it('bez rake gra ma sumę zerową (suma wartości graczy = 0)', () => {
    const s = new PreflopSolver(buildTree(), syntheticEquity(), { k: 1, m: 0.08, rakeRate: 0, rakeCap: 0 }, undefined, syntheticThreeWay());
    for (let i = 0; i < 2; i++) s.step();
    let total = 0;
    for (let p = 0; p < N_PLAYERS; p++) total += s.value(p);
    expect(Math.abs(total)).toBeLessThan(1e-9);
  }, 60_000);

  it('wariant z członem implied odds (io) i własnymi wagami: bez rake gra nadal ma sumę zerową (także pule 3-way)', () => {
    const eq = syntheticEquity();
    eq.implied = { nut: HAND_CLASSES.map((_, i) => ((i * 37) % 23) / 100), pay: HAND_CLASSES.map((_, i) => ((i * 11) % 31) / 100) };
    const eqr = { k: 1.25, m: 0.16, rakeRate: 0, rakeCap: 0, io: 0.3, weights: { p22: 0.9 }, sprPlay: 16 };
    const s = new PreflopSolver(buildTree(), eq, eqr, undefined, syntheticThreeWay());
    for (let i = 0; i < 2; i++) s.step();
    let total = 0;
    for (let p = 0; p < N_PLAYERS; p++) total += s.value(p);
    expect(Math.abs(total)).toBeLessThan(1e-9);
  }, 60_000);

  it('z rake suma wartości jest ujemna (rake wychodzi z gry)', () => {
    const s = new PreflopSolver(buildTree(), syntheticEquity(), { k: 1, m: 0.08, rakeRate: 0.05, rakeCap: 3 }, undefined, syntheticThreeWay());
    for (let i = 0; i < 2; i++) s.step();
    let total = 0;
    for (let p = 0; p < N_PLAYERS; p++) total += s.value(p);
    expect(total).toBeLessThan(0);
  }, 60_000);

  it('wykorzystywalność maleje z iteracjami (drzewo bez pul 3-way, dla szybkości)', () => {
    const s = new PreflopSolver(buildTree({ ...DEFAULT_TREE, bbOvercall: false }), syntheticEquity(), { k: 1, m: 0.08, rakeRate: 0, rakeCap: 0 });
    for (let i = 0; i < 3; i++) s.step();
    const early = s.exploitability().nashConv;
    for (let i = 0; i < 15; i++) s.step();
    const late = s.exploitability().nashConv;
    expect(late).toBeLessThan(early);
    expect(late).toBeGreaterThanOrEqual(-1e-9);
  }, 120_000);

  it('punkt kontrolny: zapis i wczytanie odtwarzają stan (dalsze iteracje dają ten sam wynik)', () => {
    const cfg = { ...DEFAULT_TREE, bbOvercall: false };
    const eqr = { k: 1, m: 0.08, rakeRate: 0.05, rakeCap: 3 };
    const a = new PreflopSolver(buildTree(cfg), syntheticEquity(), eqr);
    for (let i = 0; i < 2; i++) a.step();
    const path = join(mkdtempSync(join(tmpdir(), 'szkp-')), 'ck.bin');
    a.saveState(path, 'test');
    const b = new PreflopSolver(buildTree(cfg), syntheticEquity(), eqr);
    expect(b.loadState(path, 'inny')).toBe(false);
    expect(b.loadState(path, 'test')).toBe(true);
    expect(b.iteration).toBe(2);
    a.step();
    b.step();
    expect(b.value(0)).toBeCloseTo(a.value(0), 12);
  }, 60_000);

  it('rozkład a priori sumuje się do 1', () => {
    let s = 0;
    for (let i = 0; i < N; i++) s += PRIOR[i]!;
    expect(s).toBeCloseTo(1, 12);
  });
});

export type { Node };
