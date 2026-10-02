import { HAND_CLASSES } from '@szkola/poker-core';
import { N, PRIOR } from './model';
import type { PreflopSolver } from './solver';
import { N_PLAYERS, POSITIONS, type DecisionNode, type Node } from './tree';

export function findNode(s: PreflopSolver, path: string): DecisionNode | null {
  const n = s.nodes.find((x) => x.kind === 'decision' && x.path === path);
  return (n as DecisionNode | undefined) ?? null;
}

/** Częstość każdej akcji w węźle przy rozkładzie a priori gracza (bez uwzględnienia wcześniejszych akcji). */
export function actionFrequencies(s: PreflopSolver, node: DecisionNode, weights: Float64Array = PRIOR): Record<string, number> {
  const st = s.averageStrategy(node.id);
  const nA = node.actions.length;
  const out: Record<string, number> = {};
  let total = 0;
  for (let h = 0; h < N; h++) total += weights[h]!;
  node.actions.forEach((a, i) => {
    let f = 0;
    for (let h = 0; h < N; h++) f += weights[h]! * st[h * nA + i]!;
    out[a.label] = f / total;
  });
  return out;
}

/** Rozkład rąk gracza docierającego do węzła (iloczyn jego decyzji po drodze). */
export function playerReach(s: PreflopSolver, target: DecisionNode | Node): Float64Array[] {
  const reach = Array.from({ length: N_PLAYERS }, () => Float64Array.from(PRIOR));
  const walk = (node: Node, r: Float64Array[]): Float64Array[] | null => {
    if (node === target) return r;
    if (node.kind !== 'decision') return null;
    const st = s.averageStrategy(node.id);
    const nA = node.actions.length;
    for (let a = 0; a < nA; a++) {
      const next = r.slice();
      const v = new Float64Array(N);
      for (let h = 0; h < N; h++) v[h] = r[node.player]![h]! * st[h * nA + a]!;
      next[node.player] = v;
      const found = walk(node.children[a]!, next);
      if (found) return found;
    }
    return null;
  };
  return walk(s.root, reach) ?? reach;
}

const FOLDS = (n: number) => POSITIONS.slice(0, n).map((p) => `${p}:fold`).join(',');

export interface Summary {
  rfi: Record<string, number>;
  spots: { name: string; freqs: Record<string, number> }[];
}

/** Najważniejsze liczby do walidacji z celami z researchu. */
export function summarize(s: PreflopSolver, openSize = 2.5, sbOpen = 3): Summary {
  const rfi: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    const node = findNode(s, FOLDS(i));
    if (!node) continue;
    const f = actionFrequencies(s, node);
    rfi[POSITIONS[i]!] = 1 - (f.fold ?? 0);
  }
  const spots: Summary['spots'] = [];
  const spot = (name: string, path: string) => {
    const node = findNode(s, path);
    if (!node) return;
    const reach = playerReach(s, node)[node.player]!;
    spots.push({ name, freqs: actionFrequencies(s, node, reach) });
  };
  const open = (i: number) => `${FOLDS(i)}${i ? ',' : ''}${POSITIONS[i]}:raise${i === 4 ? sbOpen : openSize}`;
  spot('BB vs BTN', `${open(3)},SB:fold`);
  spot('BB vs SB', open(4));
  spot('SB vs BTN', open(3));
  spot('BTN vs CO', open(2));
  spot('BB vs UTG', `${open(0)},HJ:fold,CO:fold,BTN:fold,SB:fold`);
  spot('CO vs UTG', `${open(0)},HJ:fold`);
  // otwierający wobec 3-betu z Buttona po otwarciu z CO
  const coOpen = open(2);
  const n3 = s.nodes.find((x) => x.kind === 'decision' && x.path.startsWith(`${coOpen},BTN:raise`) && x.path.endsWith('BB:fold') && x.player === 2);
  if (n3) spots.push({ name: 'CO vs 3-bet BTN', freqs: actionFrequencies(s, n3 as DecisionNode, playerReach(s, n3)[2]!) });
  return { rfi, spots };
}

export function formatSummary(sum: Summary): string {
  const pct = (x: number) => `${(x * 100).toFixed(1)}%`;
  const lines = ['Otwarcia (RFI):', ...Object.entries(sum.rfi).map(([p, f]) => `  ${p}: ${pct(f)}`), 'Spoty:'];
  for (const s of sum.spots) lines.push(`  ${s.name}: ${Object.entries(s.freqs).map(([a, f]) => `${a} ${pct(f)}`).join(', ')}`);
  return lines.join('\n');
}

/** Zakres jako lista klas z częstością akcji (do siatki 13×13). */
export function rangeOf(s: PreflopSolver, node: DecisionNode, actionIndex: number): Record<string, number> {
  const st = s.averageStrategy(node.id);
  const nA = node.actions.length;
  const out: Record<string, number> = {};
  HAND_CLASSES.forEach((hc, h) => {
    out[hc] = Math.round(st[h * nA + actionIndex]! * 1000) / 1000;
  });
  return out;
}
