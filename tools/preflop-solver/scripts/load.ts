import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join, resolve } from 'node:path';
import { HAND_CLASSES } from '@szkola/poker-core';
import { validateEquity, type EqrParams, type EquityData } from '../src/model';
import { PreflopSolver } from '../src/solver';
import { loadThreeWay } from '../src/threeway';
import { buildTree, DEFAULT_TREE } from '../src/tree';

/**
 * Solver ze strategiami wczytanymi z pliku wynikowego (bez liczenia), do diagnostyk na zapisanych przebiegach.
 * Gra po flopie (v3) nie jest odtwarzana: pule 3-betowane liczy model EQR z parametrów pliku.
 */
export function loadResult(file: string): { solver: PreflopSolver; meta: { eqr: EqrParams; tree: typeof DEFAULT_TREE; postflop?: unknown; iterations: number } } {
  const root = resolve(import.meta.dirname, '../../..');
  const j = JSON.parse(readFileSync(resolve(file), 'utf8')) as {
    meta: { eqr: EqrParams; tree: typeof DEFAULT_TREE; postflop?: unknown; iterations: number };
    spots: { path: string; strategy: Record<string, number>[] }[];
  };
  const equity = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as EquityData;
  validateEquity(equity);
  if (j.meta.eqr.io || j.meta.eqr.mid) {
    const d = JSON.parse(readFileSync(join(root, 'tools/equity/implied169.json'), 'utf8')) as { nut: number[]; pay: number[]; mid: number[] };
    equity.implied = { nut: d.nut, pay: d.pay, mid: d.mid };
  }
  const tw = j.meta.tree.bbOvercall ? loadThreeWay(gunzipSync(readFileSync(join(root, 'tools/equity/equity3.bin.gz')))) : null;
  const s = new PreflopSolver(buildTree(j.meta.tree), equity, j.meta.eqr, undefined, tw);
  const byPath = new Map(j.spots.map((x) => [x.path, x]));
  const tables = (s as unknown as { tables: Map<number, { stratSum: Float64Array; nA: number }> }).tables;
  for (const n of s.nodes) {
    if (n.kind !== 'decision') continue;
    const sp = byPath.get(n.path)!;
    const t = tables.get(n.id)!;
    HAND_CLASSES.forEach((hc, h) => sp.strategy.forEach((st, a) => (t.stratSum[h * t.nA + a] = st[hc]!)));
  }
  return { solver: s, meta: j.meta };
}
