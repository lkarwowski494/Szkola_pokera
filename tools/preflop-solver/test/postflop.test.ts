import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import { compatMatrix, computePairs, N, PRIOR, type EquityData } from '../src/model';
import { buildPostflopTree, COMBO_CLASS, geometricFraction, loadFlops, PostflopModel, type PNode } from '../src/postflop';
import { PreflopSolver } from '../src/solver';
import { buildTree, DEFAULT_TREE, N_PLAYERS } from '../src/tree';

const flops = loadFlops(readFileSync(new URL('../../equity/flops.bin.gz', import.meta.url)));
const realEquity = JSON.parse(readFileSync(new URL('../../equity/equity169.json', import.meta.url), 'utf8')) as EquityData;
const DCFR = { alpha: 1.5, beta: 0, gamma: 2 };

function leaves(n: PNode, out: PNode[] = []): PNode[] {
  if (n.kind === 'decision') n.children.forEach((c) => leaves(c, out));
  else out.push(n);
  return out;
}

/** Deterministyczny pseudolosowy zasięg (część klas wyzerowana). */
function randomReach(seed: number): Float64Array {
  let x = seed;
  const r = new Float64Array(N);
  for (let h = 0; h < N; h++) {
    x = (x * 1103515245 + 12345) % 2147483648;
    const u = x / 2147483648;
    r[h] = u < 0.4 ? 0 : PRIOR[h]! * u;
  }
  return r;
}

describe('dane flopów', () => {
  it('każda kombinacja niezablokowana ma koszyk; macierze mają sumę zerową (E + Eᵀ = D)', () => {
    expect(flops.F).toBeGreaterThan(0);
    for (const fl of flops.flops) {
      let valid = 0;
      for (let c = 0; c < 1326; c++) if (fl.bucket[c] !== 255) valid++;
      expect(valid).toBe(1176);
      const B = flops.B;
      for (let a = 0; a < B; a++)
        for (let b = 0; b < B; b++) expect(fl.eAvg[a * B + b]! + fl.eAvg[b * B + a]!).toBeCloseTo(fl.dAvg[a * B + b]!, 6);
    }
  });
  it('klasy kombinacji zgodne z liczbą kombinacji klas', () => {
    const count = new Array(N).fill(0);
    for (let c = 0; c < 1326; c++) count[COMBO_CLASS[c]!]++;
    HAND_CLASSES.forEach((hc, h) => expect(count[h]).toBe(hc.length === 2 ? 6 : hc[2] === 's' ? 4 : 12));
  });
});

describe('drzewo po flopie', () => {
  it('zakład geometryczny: zakład i sprawdzenie w każdej rundzie kończy all-in', () => {
    const g = geometricFraction(16.5, 92.5, 3);
    let pot = 16.5;
    let stack = 92.5;
    for (let r = 0; r < 3; r++) {
      const bet = g * pot;
      pot += 2 * bet;
      stack -= bet;
    }
    expect(stack).toBeCloseTo(0, 9);
  });
  it('pula każdego liścia = pula preflop + wkłady, nikt nie przekracza stacka, istnieje linia all-in', () => {
    const t = buildPostflopTree(16.5, 92.5, 3);
    const ls = leaves(t.root);
    let allin = false;
    for (const l of ls) {
      if (l.kind === 'decision') continue;
      expect(l.pot).toBeCloseTo(16.5 + l.contrib[0] + l.contrib[1], 9);
      expect(Math.max(...l.contrib)).toBeLessThanOrEqual(92.5 + 1e-9);
      if (l.kind === 'showdown') expect(l.contrib[0]).toBeCloseTo(l.contrib[1], 9);
      if (l.kind === 'showdown' && l.contrib[0] > 92.5 - 1e-9) allin = true;
    }
    expect(allin).toBe(true);
  });
});

describe('model gry po flopie', () => {
  const compat = compatMatrix(realEquity.pairs);
  it('zmienna kontrolna: przy samym czekaniu do showdownu wynik równa się dokładnemu equity 169×169', () => {
    const m = new PostflopModel(flops, { k: 0, m: 0, rakeRate: 0.05, rakeCap: 3 }, realEquity.equity, compat);
    const ti = m.addTerminal(16.5, [7.5, 7.5], 92.5, 0);
    const own = randomReach(1);
    const opp = randomReach(2);
    const v = m.value(ti, 0, own, opp, 0.7, 'avg', 1, DCFR, 0);
    const net = 16.5 - 16.5 * 0.05;
    for (let h = 0; h < N; h++) {
      let ex = 0;
      for (let o = 0; o < N; o++) ex += opp[o]! * compat[h * N + o]! * (net * realEquity.equity[h]![o]! - 7.5);
      expect(v[h]).toBeCloseTo(0.7 * ex, 9);
    }
  });

  it('bez rake gra po flopie ma sumę zerową także po treningu', () => {
    const m = new PostflopModel(flops, { k: 0, m: 0, rakeRate: 0, rakeCap: 0 }, realEquity.equity, compat);
    const ti = m.addTerminal(20, [10, 10], 90); // bez martwych pieniędzy w puli
    const r0 = randomReach(3);
    const r1 = randomReach(4);
    for (let it = 1; it <= 4; it++) {
      m.value(ti, 0, r0, r1, 1, 'train', it, DCFR, 0.05);
      m.value(ti, 1, r1, r0, 1, 'train', it, DCFR, 0.05);
    }
    const v0 = m.value(ti, 0, r0, r1, 1, 'avg', 5, DCFR, 0);
    const v1 = m.value(ti, 1, r1, r0, 1, 'avg', 5, DCFR, 0);
    let ev0 = 0;
    let ev1 = 0;
    for (let h = 0; h < N; h++) {
      ev0 += r0[h]! * v0[h]!;
      ev1 += r1[h]! * v1[h]!;
    }
    // tolerancja: macierze koszyków zapisane jako float32
    expect(Math.abs(ev0 + ev1)).toBeLessThan(1e-6 * (Math.abs(ev0) + 1));
    expect(Math.abs(ev0)).toBeGreaterThan(0);
  }, 60_000);

  it('solver z grą po flopie: suma zerowa bez rake (drzewo bez pul 3-way)', () => {
    const pairs = computePairs();
    const strength = HAND_CLASSES.map((_, i) => 1 - i / 169);
    const synthetic: EquityData = { classes: [...HAND_CLASSES], equity: HAND_CLASSES.map((_, i) => HAND_CLASSES.map((__, j) => 0.5 + 0.4 * (strength[i]! - strength[j]!))), pairs };
    const s = new PreflopSolver(buildTree({ ...DEFAULT_TREE, bbOvercall: false }), synthetic, { k: 1, m: 0.08, rakeRate: 0, rakeCap: 0 }, undefined, null, flops);
    expect(s.postflop!.terminals.length).toBeGreaterThan(0);
    for (let i = 0; i < 2; i++) s.step();
    let total = 0;
    for (let p = 0; p < N_PLAYERS; p++) total += s.value(p);
    expect(Math.abs(total)).toBeLessThan(1e-8);
  }, 180_000);
});
