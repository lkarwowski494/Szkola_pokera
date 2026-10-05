import { HAND_CLASSES } from '@szkola/poker-core';
import { N, PRIOR } from './model';
import type { PreflopSolver } from './solver';
import { POSITIONS, positionsFor, type DecisionNode, type Node } from './tree';

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
  const reach = Array.from({ length: s.nPlayers }, () => Float64Array.from(PRIOR));
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
  if (s.nPlayers === 9) return summarize9(s, openSize);
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
  spot('BTN vs UTG', `${open(0)},HJ:fold,CO:fold`);
  spot('BB vs UTG + CO call', `${open(0)},HJ:fold,CO:call,BTN:fold,SB:fold`);
  spot('BB vs CO + BTN call', `${open(2)},BTN:call,SB:fold`);
  // otwierający wobec 3-betu z Buttona po otwarciu z CO
  const coOpen = open(2);
  const n3 = s.nodes.find((x) => x.kind === 'decision' && x.path.startsWith(`${coOpen},BTN:raise`) && x.path.endsWith('BB:fold') && x.player === 2);
  if (n3) spots.push({ name: 'CO vs 3-bet BTN', freqs: actionFrequencies(s, n3 as DecisionNode, playerReach(s, n3)[2]!) });
  return { rfi, spots };
}

/**
 * 9-max: liczone są tylko poddrzewa otwarć z UTG, UTG+1 i UTG+2 (reszta to kanon 6-max, TreeConfig.externalFolds),
 * więc podsumowanie obejmuje otwarcia tych pozycji i odpowiedzi na nie.
 */
function summarize9(s: PreflopSolver, openSize: number): Summary {
  const POS = positionsFor(9);
  const folds = (n: number) => POS.slice(0, n).map((p) => `${p}:fold`);
  const rfi: Record<string, number> = {};
  for (let i = 0; i < 3; i++) {
    const node = findNode(s, folds(i).join(','));
    if (node) rfi[POS[i]!] = 1 - (actionFrequencies(s, node).fold ?? 0);
  }
  const spots: Summary['spots'] = [];
  const spot = (name: string, path: string) => {
    const node = findNode(s, path);
    if (!node) return;
    spots.push({ name, freqs: actionFrequencies(s, node, playerReach(s, node)[node.player]!) });
  };
  // otwarcie z pozycji i, potem pasy aż do pozycji j (j > i), która odpowiada
  const facing = (i: number, j: number) => [...folds(i), `${POS[i]}:raise${openSize}`, ...POS.slice(i + 1, j).map((p) => `${p}:fold`)].join(',');
  for (let i = 0; i < 3; i++) for (const j of [i + 1, 5, 6, 8]) if (j > i) spot(`${POS[j]} vs ${POS[i]}`, facing(i, j));
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

/** Realizacja equity w wybranych pulach heads-up (diagnostyka modelu gry po flopie). */
export function realizationReport(s: PreflopSolver): string {
  // pule z raportów zbiorczych rangeconverter (solver, 6-max 100bb; cel kalibracji wariantu naprawy EQR, raport 10)
  const paths = [
    ['CO otwiera, BTN 3-bet, CO sprawdza', 'UTG:fold,HJ:fold,CO:raise2.5,BTN:raise7.5,SB:fold,BB:fold,CO:call'],
    ['BTN otwiera, BB 3-bet, BTN sprawdza', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:raise10,BTN:call'],
    ['BTN otwiera, BB sprawdza (pula z jednym podbiciem)', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:call'],
    ['UTG otwiera, CO 3-bet, UTG sprawdza', 'UTG:raise2.5,HJ:fold,CO:raise7.5,BTN:fold,SB:fold,BB:fold,UTG:call'],
    ['SB otwiera, BB sprawdza', 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3,BB:call'],
    ['CO otwiera, BTN sprawdza', 'UTG:fold,HJ:fold,CO:raise2.5,BTN:call,SB:fold,BB:fold'],
    ['BTN otwiera, SB 3-bet, BTN sprawdza', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:raise10,BB:fold,BTN:call'],
    ['SB otwiera, BB 3-bet, SB sprawdza', 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3,BB:raise9,SB:call'],
    ['BTN otwiera, BB 3-bet, BTN 4-bet, BB sprawdza', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:raise10,BTN:raise23,BB:call'],
  ];
  const lines = ['Realizacja equity (udział w puli netto: zdobyty / z equity):'];
  for (const [name, path] of paths) {
    const node = s.nodes.find((n) => n.kind === 'showdown' && n.path === path);
    if (!node) continue;
    const r = s.realization(node.id, playerReach(s, node));
    lines.push(`  ${name}: ` + r.map((x) => `${POSITIONS[x.player]} ${(x.realizedShare * 100).toFixed(1)}% / ${(x.equityShare * 100).toFixed(1)}% (EQR ${(x.eqr * 100).toFixed(0)}%)`).join(', '));
  }
  return lines.join('\n');
}

/**
 * Diagnostyka B-045: wartość akcji (bb) i częstość 3-betu dla rąk ze środka zakresu i typowych blefów w 3-betach z blindów.
 */
export function evReport(s: PreflopSolver): string {
  const HANDS = ['55', '66', '77', '88', '99', 'ATo', 'A9o', 'KQo', 'AJo', 'A5s', 'A4s', 'A3s', 'A2s', '76s', '65s', 'T9s'];
  const SPOTS: [string, string][] = [
    ['SB vs BTN', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5'],
    ['BB vs BTN', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold'],
    ['BB vs SB', 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3'],
  ];
  const lines = ['Wartość akcji w bb (strategie uśrednione); kolumny: ręka, akcje, 3-bet minus najlepsza z pozostałych, częstość 3-betu:'];
  for (const [name, path] of SPOTS) {
    const node = findNode(s, path);
    if (!node) continue;
    const vals = s.actionValues(node, playerReach(s, node));
    const st = s.averageStrategy(node.id);
    const nA = node.actions.length;
    const ri = node.actions.findIndex((a) => a.kind === 'raise' || a.kind === 'allin');
    lines.push(`  ${name} (${node.actions.map((a) => a.label).join(' / ')}):`);
    for (const hc of HANDS) {
      const h = HAND_CLASSES.indexOf(hc);
      const v = vals.map((x) => x[h]!);
      const other = Math.max(...v.filter((_, a) => a !== ri));
      lines.push(`    ${hc}\t${v.map((x) => x.toFixed(3)).join('\t')}\t${(v[ri]! - other >= 0 ? '+' : '') + (v[ri]! - other).toFixed(3)}\t${Math.round(st[h * nA + ri]! * 100)}%`);
    }
  }
  return lines.join('\n');
}
