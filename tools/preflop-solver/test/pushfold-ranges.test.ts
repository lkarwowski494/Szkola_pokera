import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import type { EquityData } from '../src/model';
import { buildPushFoldTree } from '../src/pushfold';
import { PreflopSolver } from '../src/solver';
import type { DecisionNode } from '../src/tree';

const ROOT = resolve(import.meta.dirname, '../../..');
const eqFile = join(ROOT, 'tools/equity/equity169.json');
const rangesFile = join(ROOT, 'content/ranges/pushfold-hu.json');
const has = existsSync(eqFile) && existsSync(rangesFile);

interface File {
  meta: { summary: Record<string, { push: number; call: number; nashConvBb: number }> };
  spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[];
}

describe.skipIf(!has)('zakresy push/fold M11 (content/ranges/pushfold-hu.json)', () => {
  const file = has ? (JSON.parse(readFileSync(rangesFile, 'utf8')) as File) : null;
  it('10bb bez ante mieści się w celach walidacji z dokumentu 10', () => {
    const s = file!.meta.summary['10bb']!;
    expect(s.push).toBeGreaterThan(0.55);
    expect(s.push).toBeLessThan(0.61);
    expect(s.call).toBeGreaterThan(0.345);
    expect(s.call).toBeLessThan(0.405);
    for (const v of Object.values(file!.meta.summary)) expect(v.nashConvBb).toBeLessThan(0.002);
  });
  it('ante poszerza zakresy, a krótszy stack poszerza all-in i sprawdzenie', () => {
    const m = file!.meta.summary;
    expect(m['10bb-ante']!.push).toBeGreaterThan(m['10bb']!.push);
    expect(m['10bb-ante']!.call).toBeGreaterThan(m['10bb']!.call);
    expect(m['5bb']!.push).toBeGreaterThan(m['10bb']!.push);
    expect(m['10bb']!.push).toBeGreaterThan(m['15bb']!.push);
    expect(m['5bb']!.call).toBeGreaterThan(m['10bb']!.call);
    expect(m['10bb']!.call).toBeGreaterThan(m['15bb']!.call);
  });
  it('plik jest aktualny: ponowne rozwiązanie 10bb z ante daje te same strategie', () => {
    const data = JSON.parse(readFileSync(eqFile, 'utf8')) as EquityData;
    const s = new PreflopSolver(buildPushFoldTree(10, 1), data, { k: 0, m: 0, rakeRate: 0, rakeCap: 0 });
    for (let i = 0; i < 3000; i++) s.step();
    for (const node of s.nodes.filter((n): n is DecisionNode => n.kind === 'decision')) {
      const spot = file!.spots.find((x) => x.path === `10bb-ante|${node.path}`)!;
      const st = s.averageStrategy(node.id);
      const nA = node.actions.length;
      HAND_CLASSES.forEach((hc, h) => expect(Math.abs(spot.strategy[nA - 1]![hc]! - st[h * nA + nA - 1]!)).toBeLessThan(0.002));
    }
  }, 120_000);
});
