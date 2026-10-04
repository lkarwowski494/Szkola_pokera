/**
 * Zakresy push/fold heads-up (mały blind kontra duży blind) do modułu M11 → content/ranges/pushfold-hu.json.
 * Drzewo buildPushFoldTree (zwalidowane z równowagą Nasha przy 10bb, dokument 10), bez modelu EQR i bez rake'u:
 * po all-inie nie ma dalszej gry, więc wynik zależy tylko od dokładnej macierzy equity 169×169.
 *
 * Uruchomienie: pnpm --filter @szkola/preflop-solver exec tsx scripts/pushfold-ranges.ts
 * Ścieżki węzłów mają przedrostek wariantu („10bb|”, „10bb-ante|”), bo wszystkie warianty leżą w jednym pliku.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { HAND_CLASSES } from '@szkola/poker-core';
import { PRIOR, type EquityData } from '../src/model';
import { buildPushFoldTree } from '../src/pushfold';
import { actionFrequencies } from '../src/report';
import { PreflopSolver } from '../src/solver';
import { POSITIONS, type DecisionNode } from '../src/tree';

const ROOT = resolve(import.meta.dirname, '../../..');
const ITERATIONS = 3000;
/** Głębokości (stack efektywny w bb) i ante dużego blinda w bb. */
const VARIANTS: { label: string; stack: number; ante: number }[] = [
  { label: '5bb', stack: 5, ante: 0 },
  { label: '10bb', stack: 10, ante: 0 },
  { label: '15bb', stack: 15, ante: 0 },
  { label: '10bb-ante', stack: 10, ante: 1 },
];

const data = JSON.parse(readFileSync(join(ROOT, 'tools/equity/equity169.json'), 'utf8')) as EquityData;
const spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] = [];
const summary: Record<string, { push: number; call: number; nashConvBb: number }> = {};

for (const v of VARIANTS) {
  const s = new PreflopSolver(buildPushFoldTree(v.stack, v.ante), data, { k: 0, m: 0, rakeRate: 0, rakeCap: 0 });
  for (let i = 0; i < ITERATIONS; i++) s.step();
  const decisions = s.nodes.filter((n): n is DecisionNode => n.kind === 'decision');
  for (const node of decisions) {
    const st = s.averageStrategy(node.id);
    const nA = node.actions.length;
    spots.push({
      path: `${v.label}|${node.path}`,
      player: POSITIONS[node.player]!,
      actions: node.actions.map((a) => a.label),
      strategy: node.actions.map((_, a) => Object.fromEntries(HAND_CLASSES.map((hc, h) => [hc, Math.round(st[h * nA + a]! * 1000) / 1000]))),
    });
  }
  const sb = decisions.find((n) => n.player === 4)!;
  const bb = decisions.find((n) => n.player === 5)!;
  summary[v.label] = {
    push: actionFrequencies(s, sb)['all-in']!,
    // częstość sprawdzenia liczona po wszystkich rękach BB (rozkład a priori), jak w teście walidacyjnym
    call: actionFrequencies(s, bb, PRIOR)['call']!,
    nashConvBb: s.exploitability().nashConv,
  };
  console.log(`${v.label}: push ${(summary[v.label]!.push * 100).toFixed(1)}%, sprawdzenie ${(summary[v.label]!.call * 100).toFixed(1)}%, NashConv ${summary[v.label]!.nashConvBb.toExponential(2)}bb`);
}

const meta = {
  solver: '@szkola/preflop-solver 0.1.0, drzewo push/fold heads-up (src/pushfold.ts)',
  algorithm: 'Discounted CFR (α=1,5, β=0, γ=2), bez modelu EQR i rake’u',
  iterations: ITERATIONS,
  variants: VARIANTS,
  equity: 'tools/equity/equity169.json (dokładne przeliczenie)',
  validation: 'dokument 10: przy 10bb bez ante push 55–61%, sprawdzenie 34,5–40,5% (test equity-data.test.ts)',
  summary,
};
writeFileSync(join(ROOT, 'content/ranges/pushfold-hu.json'), JSON.stringify({ meta, spots }) + '\n');
