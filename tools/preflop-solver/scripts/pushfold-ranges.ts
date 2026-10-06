/**
 * Zakresy push/fold do modułu M11 → content/ranges/pushfold.json: heads-up (mały blind kontra duży blind) i trzyosobowe
 * (Button, mały blind, duży blind; tylko 7,5bb, jedyna głębokość z opublikowanym celem walidacji: Ganzfried i Sandholm,
 * AAMAS 2008, tabele 11–16 „single hand”; porównanie: scripts/pushfold3-validate.ts).
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
import { buildPushFold3Tree } from '../src/pushfold3';
import { actionFrequencies } from '../src/report';
import { PreflopSolver } from '../src/solver';
import { loadThreeWay } from '../src/threeway';
import { POSITIONS, type DecisionNode } from '../src/tree';

const ROOT = resolve(import.meta.dirname, '../../..');
const ITERATIONS = 3000;
/** Drzewo trzyosobowe: pętle pul trzyosobowych są wolniejsze, NashConv poniżej 1e-5bb po 2000 iteracjach. */
const ITERATIONS_3 = 2000;
/** Głębokości (stack efektywny w bb) i big blind ante w bb. */
const VARIANTS: { label: string; stack: number; ante: number; players: 2 | 3 }[] = [
  { label: '5bb', stack: 5, ante: 0, players: 2 },
  { label: '10bb', stack: 10, ante: 0, players: 2 },
  { label: '15bb', stack: 15, ante: 0, players: 2 },
  { label: '10bb-ante', stack: 10, ante: 1, players: 2 },
  { label: '3max-7.5bb', stack: 7.5, ante: 0, players: 3 },
];

const data = JSON.parse(readFileSync(join(ROOT, 'tools/equity/equity169.json'), 'utf8')) as EquityData;
const threeWay = loadThreeWay(readFileSync(join(ROOT, 'tools/equity/equity3.bin.gz')));
const spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] = [];
const summary: Record<string, { push: number; call: number; nashConvBb: number; nodes: Record<string, number> }> = {};

for (const v of VARIANTS) {
  const tree = v.players === 3 ? buildPushFold3Tree(v.stack) : buildPushFoldTree(v.stack, v.ante);
  const s = new PreflopSolver(tree, data, { k: 0, m: 0, rakeRate: 0, rakeCap: 0 }, undefined, v.players === 3 ? threeWay : null);
  for (let i = 0; i < (v.players === 3 ? ITERATIONS_3 : ITERATIONS); i++) s.step();
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
  // pierwszy decydujący (korzeń) i pierwszy sprawdzający all-in; częstości po wszystkich rękach gracza (rozkład a priori)
  const first = decisions.find((n) => n.path === '')!;
  const caller = decisions.find((n) => n.path === (v.players === 3 ? 'BTN:allin' : 'SB:allin'))!;
  const last = (n: DecisionNode) => actionFrequencies(s, n, PRIOR)[n.actions[n.actions.length - 1]!.label]!;
  summary[v.label] = {
    push: last(first),
    call: last(caller),
    nashConvBb: s.exploitability().nashConv,
    nodes: Object.fromEntries(decisions.map((n) => [n.path, last(n)])),
  };
  console.log(`${v.label}: pierwszy all-in ${(summary[v.label]!.push * 100).toFixed(1)}%, sprawdzenie ${(summary[v.label]!.call * 100).toFixed(1)}%, NashConv ${summary[v.label]!.nashConvBb.toExponential(2)}bb`);
}

const meta = {
  solver: '@szkola/preflop-solver 0.1.0, drzewa push/fold heads-up (src/pushfold.ts) i trzyosobowe (src/pushfold3.ts)',
  algorithm: 'Discounted CFR (α=1,5, β=0, γ=2), bez modelu EQR i rake’u',
  iterations: { headsUp: ITERATIONS, threeWay: ITERATIONS_3 },
  variants: VARIANTS,
  equity: 'tools/equity/equity169.json (dokładne przeliczenie); pule trzyosobowe: tools/equity/equity3.bin.gz (8000 prób Monte Carlo na trójkę klas)',
  validation:
    'heads-up: dokument 10, przy 10bb bez ante push 55–61%, sprawdzenie 34,5–40,5% (test equity-data.test.ts); trzyosobowe 7,5bb: Ganzfried i Sandholm, AAMAS 2008, tabele 11–16 (scripts/pushfold3-validate.ts, raport M11)',
  summary,
};
writeFileSync(join(ROOT, 'content/ranges/pushfold.json'), JSON.stringify({ meta, spots }) + '\n');
