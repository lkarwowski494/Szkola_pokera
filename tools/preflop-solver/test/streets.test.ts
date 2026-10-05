import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { compatMatrix, N, PRIOR, type EquityData } from '../src/model';
import { buildStreetTree, loadBoards, StreetModel, type SNode } from '../src/streets';

const data = loadBoards(readFileSync(new URL('../../equity/boards.bin.gz', import.meta.url)));
const eq = JSON.parse(readFileSync(new URL('../../equity/equity169.json', import.meta.url), 'utf8')) as EquityData;
const compat = compatMatrix(eq.pairs);
const DCFR = { alpha: 1.5, beta: 0, gamma: 2 };

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

function leaves(n: SNode, out: SNode[] = []): SNode[] {
  if (n.kind === 'decision') n.children.forEach((c) => leaves(c, out));
  else if (n.kind === 'chance') leaves(n.child, out);
  else out.push(n);
  return out;
}

describe('plansze trzech ulic', () => {
  it('kombinacje niezablokowane: 1176 na flopie, 1128 na turnie, 1081 na riverze; macierze z sumą zerową', () => {
    const want = [1176, 1128, 1081];
    data.levels.forEach((boards, lv) => {
      for (const b of boards.slice(0, 10)) {
        let valid = 0;
        for (let c = 0; c < 1326; c++) if (b.bucket[c] !== 255) valid++;
        expect(valid).toBe(want[lv]);
        const B = data.B;
        for (let a = 0; a < B; a++) for (let x = 0; x < B; x++) expect(b.eAvg[a * B + x]! + b.eAvg[x * B + a]!).toBeCloseTo(b.dAvg[a * B + x]!, 6);
      }
    });
  });
  it('przejścia koszyków: z każdego koszyka rodzica odpływa 1 minus odsetek kombinacji zablokowanych przez nową kartę', () => {
    const B = data.B;
    for (const lv of [1, 2] as const) {
      const per = lv === 1 ? data.T : data.R;
      data.levels[lv].slice(0, 6).forEach((b, k) => {
        const parent = data.levels[lv - 1]![Math.floor(k / per)]!;
        for (let a = 0; a < B; a++) {
          if (parent.nBucket[a] === 0) continue;
          let s = 0;
          for (let a2 = 0; a2 < B; a2++) s += b.trans![a * B + a2]!;
          let blocked = 0;
          for (let c = 0; c < 1326; c++) if (parent.bucket[c] === a && b.bucket[c] === 255) blocked++;
          expect(s).toBeCloseTo(1 - blocked / parent.nBucket[a]!, 9);
        }
      });
    }
  });
});

describe('drzewo trzech ulic', () => {
  it('pula liścia = pula preflop + wkłady; linia zakład-sprawdzenie na każdej ulicy kończy all-in na riverze', () => {
    const t = buildStreetTree(16, 92, [data.F, data.F * data.T, data.F * data.T * data.R], data.B);
    let allinRiver = false;
    for (const l of leaves(t.root)) {
      if (l.kind === 'decision' || l.kind === 'chance') continue;
      expect(l.pot).toBeCloseTo(16 + l.contrib[0] + l.contrib[1], 9);
      expect(Math.max(...l.contrib)).toBeLessThanOrEqual(92 + 1e-9);
      if (l.kind === 'showdown' && l.level === 2 && l.contrib[0] > 92 - 1e-6) allinRiver = true;
    }
    expect(allinRiver).toBe(true);
  });

  it('v3c: kilka rozmiarów i przebicie; showdown tylko przy równych wkładach, pas zawsze przy nierównych', () => {
    const cfg = { sizes: [[0.33, 0.75], [0.66], [0]] as [number[], number[], number[]], raise: 3 };
    const nb: [number, number, number] = [data.F, data.F * data.T, data.F * data.T * data.R];
    const t = buildStreetTree(5.5, 97.5, nb, data.B, cfg);
    const v3b = buildStreetTree(5.5, 97.5, nb, data.B);
    expect(t.decisions).toBeGreaterThan(v3b.decisions);
    let raises = 0;
    const walk = (n: SNode): void => {
      if (n.kind === 'decision') {
        if (n.actions.includes('raise')) raises++;
        n.children.forEach(walk);
        return;
      }
      if (n.kind === 'chance') return walk(n.child);
      expect(n.pot).toBeCloseTo(5.5 + n.contrib[0] + n.contrib[1], 9);
      expect(Math.max(...n.contrib)).toBeLessThanOrEqual(97.5 + 1e-9);
      if (n.kind === 'showdown') expect(n.contrib[0]).toBeCloseTo(n.contrib[1], 9);
      else expect(Math.abs(n.contrib[0] - n.contrib[1])).toBeGreaterThan(1e-9);
    };
    walk(t.root);
    expect(raises).toBeGreaterThan(0);
  });
});

describe('gra trzech ulic', () => {
  it('wartości wracają z próbki z poprawną normalizacją: czekanie przez trzy ulice bez blokad ≈ czekanie na flopie', () => {
    // przy pełnej masie rywala w każdym koszyku (D·1) suma przejść i normalizacji turn/river daje tę samą masę par
    const m = new StreetModel(data, { k: 0, m: 0, rakeRate: 0, rakeCap: 0 }, eq.equity, compat);
    const W = new Float64Array(data.F * data.B).fill(1);
    const viaRiver = m.checkdown(0, W, 0, -1); // −inv·D: masa par rozłącznych
    const atFlop = m.leafShowdown(0, W, 0, -1);
    let s1 = 0;
    let s2 = 0;
    for (let i = 0; i < viaRiver.length; i++) {
      s1 += viaRiver[i]!;
      s2 += atFlop[i]!;
    }
    expect(s1 / s2).toBeGreaterThan(0.97);
    expect(s1 / s2).toBeLessThan(1.03);
  });

  it('bez rake suma zerowa po treningu', () => {
    const m = new StreetModel(data, { k: 0, m: 0, rakeRate: 0, rakeCap: 0 }, eq.equity, compat);
    const ti = m.addTerminal(20, [10, 10], 90);
    const r0 = randomReach(3);
    const r1 = randomReach(4);
    for (let it = 1; it <= 3; it++) {
      m.value(ti, 0, r0, r1, 1, 'train', it, DCFR, 0.05);
      m.value(ti, 1, r1, r0, 1, 'train', it, DCFR, 0.05);
    }
    const v0 = m.value(ti, 0, r0, r1, 1, 'avg', 4, DCFR, 0);
    const v1 = m.value(ti, 1, r1, r0, 1, 'avg', 4, DCFR, 0);
    let ev0 = 0;
    let ev1 = 0;
    for (let h = 0; h < N; h++) {
      ev0 += r0[h]! * v0[h]!;
      ev1 += r1[h]! * v1[h]!;
    }
    expect(Math.abs(ev0 + ev1)).toBeLessThan(1e-6 * (Math.abs(ev0) + 1));
  }, 60_000);
});
