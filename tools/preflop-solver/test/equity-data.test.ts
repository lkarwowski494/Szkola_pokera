import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import { computePairs, PRIOR, validateEquity, type EquityData } from '../src/model';
import { buildPushFoldTree } from '../src/pushfold';
import { actionFrequencies, playerReach } from '../src/report';
import { PreflopSolver } from '../src/solver';
import type { DecisionNode } from '../src/tree';

const file = join(resolve(import.meta.dirname, '../../..'), 'tools/equity/equity169.json');
const has = existsSync(file);
const data = has ? (JSON.parse(readFileSync(file, 'utf8')) as EquityData) : null;
const idx = (hc: string) => HAND_CLASSES.indexOf(hc);

describe.skipIf(!has)('macierz equity (dokładna)', () => {
  it('jest kompletna i symetryczna', () => validateEquity(data!));
  it('liczba par kombinacji zgadza się z obliczeniem w TypeScript', () => {
    expect(data!.pairs).toEqual(computePairs());
  });
  it('zgadza się z wartościami referencyjnymi (dokładne przeliczenie, dokument 08)', () => {
    const e = (a: string, b: string) => data!.equity[idx(a)]![idx(b)]!;
    expect(e('AA', 'KK')).toBeCloseTo(0.8195, 3);
    expect(e('AKo', 'QQ')).toBeCloseTo(0.4324, 3);
    expect(e('AKs', 'QQ')).toBeCloseTo(0.4605, 3);
    expect(e('KK', 'AKo')).toBeCloseTo(0.6988, 3);
    expect(e('22', 'AKs')).toBeCloseTo(0.5011, 3);
    expect(e('AKo', 'JTs')).toBeCloseTo(0.5949, 3);
  });
});

describe.skipIf(!has)('solver: push/fold heads-up (wynik bez modelu EQR)', () => {
  it('10bb: zbiega do równowagi zgodnej z tablicami Nasha', () => {
    const s = new PreflopSolver(buildPushFoldTree(10), data!, { k: 0, m: 0, rakeRate: 0, rakeCap: 0 });
    for (let i = 0; i < 1500; i++) s.step();
    const sb = s.nodes.find((n) => n.kind === 'decision' && n.player === 4) as DecisionNode;
    const bb = s.nodes.find((n) => n.kind === 'decision' && n.player === 5) as DecisionNode;
    const push = actionFrequencies(s, sb)['all-in']!;
    const call = actionFrequencies(s, bb, PRIOR)['call']!;
    // referencja: SB ok. 58%, BB ok. 37,5% (obliczenie Nasha z dokumentu 08, ±2 pp)
    expect(push).toBeGreaterThan(0.55);
    expect(push).toBeLessThan(0.61);
    expect(call).toBeGreaterThan(0.345);
    expect(call).toBeLessThan(0.405);
    // w grze dwuosobowej NashConv = wykorzystywalność
    expect(s.exploitability().nashConv).toBeLessThan(0.002);
    void playerReach;
  }, 120_000);
});

const file3 = join(resolve(import.meta.dirname, '../../..'), 'tools/equity/equity3.bin.gz');
const has3 = existsSync(file3);

describe.skipIf(!has3)('tablica equity 3-way', () => {
  it('udziały sumują się do 1 i zgadzają się z niezależnym Monte Carlo z poker-core', async () => {
    const { loadThreeWay } = await import('../src/threeway');
    const { classCombos, createRng, handEquity } = await import('@szkola/poker-core');
    const d = loadThreeWay(readFileSync(file3));
    const N2 = 169 * 169;
    const at = (x: string, y: string, z: string) => d.eq[idx(x) * N2 + idx(y) * 169 + idx(z)]!;
    for (const [x, y, z] of [
      ['AA', 'KK', 'QQ'],
      ['AKs', 'JTs', '22'],
      ['72o', 'K9o', '65s'],
    ] as const) {
      expect(at(x, y, z) + at(y, x, z) + at(z, x, y)).toBeCloseTo(1, 3);
      // niezależne odniesienie: losowe rozłączne trójki kombinacji, equity liczone przez poker-core
      const rng = createRng(7);
      const cx = classCombos(x), cy = classCombos(y), cz = classCombos(z);
      let sum = 0;
      let n = 0;
      while (n < 60) {
        const a = cx[Math.floor(rng() * cx.length)]!, b = cy[Math.floor(rng() * cy.length)]!, c = cz[Math.floor(rng() * cz.length)]!;
        if (new Set([...a, ...b, ...c]).size < 6) continue;
        sum += handEquity([a, b, c], [], { exactLimit: 0, iterations: 2000, rng }).equity[0]!;
        n++;
      }
      expect(Math.abs(at(x, y, z) - sum / n)).toBeLessThan(0.02);
    }
  }, 300_000);
});
