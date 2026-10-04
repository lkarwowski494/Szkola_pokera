import { HAND_CLASSES } from '@szkola/poker-core';
import { N } from '../src/model';
import { playerReach } from '../src/report';
import { N_PLAYERS, POSITIONS, type DecisionNode, type Node } from '../src/tree';
import { loadResult } from './load';
// użycie: tsx scripts/decompose.ts WYNIK.json [ŚCIEŻKA_WĘZŁA] [RĘCE]
// Diagnostyka (naprawa EQR, raport 10): wartość 3-betu i sprawdzenia w węźle (domyślnie BB vs BTN) rozłożona na odpowiedzi
// otwierającego: dla każdej ręki częstość pasa / sprawdzenia / 4-betu otwierającego (ważona jego zasięgiem, z blokerami
// przybliżonymi jak w actionValues) i wartość ręki w każdej gałęzi. Strategie wczytane z pliku wynikowego (bez liczenia).

const [file, pathArg, handsArg] = process.argv.slice(2);
const { solver: s } = loadResult(file!);
const traverse = (s as unknown as { traverse: (n: Node, p: number, r: Float64Array[], m: string) => Float64Array }).traverse.bind(s);

// wartość akcji z najlepszą kontynuacją gracza (br): ręce, które nie docierają dalej, mają w strategii uśrednionej rozkład jednostajny
const MODE = process.env.MODE ?? 'br';
const path = pathArg && pathArg !== '-' ? pathArg : 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold';
const hands = (handsArg ?? '55,66,77,88,99,TT,KQo,AJo,ATo,A9o,A5s,A4s,76s,65s,T9s,K6o').split(',');
const node = s.nodes.find((x) => x.kind === 'decision' && x.path === path) as DecisionNode;
const p = node.player;
const reach = playerReach(s, node);
const massOf = (r: Float64Array[], skip: number) => {
  let m = 1;
  for (let q = 0; q < N_PLAYERS; q++) if (q !== skip) m *= r[q]!.reduce((a, b) => a + b, 0);
  return m;
};
const base = massOf(reach, p);
console.log(`${file}\nwęzeł ${path} (gracz ${POSITIONS[p]}), akcje: ${node.actions.map((a) => a.label).join(' / ')}`);
node.actions.forEach((act, ai) => {
  const child = node.children[ai]!;
  if (child.kind !== 'decision' || child.player === p) {
    const v = traverse(child, p, reach, MODE);
    console.log(`  ${act.label}: ` + hands.map((hc) => `${hc} ${(v[HAND_CLASSES.indexOf(hc as never)]! / base).toFixed(2)}`).join(', '));
    return;
  }
  // odpowiedź rywala: rozkład na jego akcje
  const q = child.player;
  const st = s.averageStrategy(child.id);
  const nA = child.actions.length;
  const parts = child.actions.map((ca, a) => {
    const r = reach.slice();
    const v = new Float64Array(N);
    for (let h = 0; h < N; h++) v[h] = reach[q]![h]! * st[h * nA + a]!;
    r[q] = v;
    const val = traverse(child.children[a]!, p, r, MODE);
    return { label: ca.label, w: massOf(r, p) / base, val: val.map((x, h) => (x / massOf(r, p)) || 0) };
  });
  const tot = traverse(child, p, reach, MODE);
  console.log(`  ${act.label} → odpowiedź ${POSITIONS[q]}: ${parts.map((x) => `${x.label} ${(x.w * 100).toFixed(1)}%`).join(', ')} (bez blokerów)`);
  for (const hc of hands) {
    const h = HAND_CLASSES.indexOf(hc as never);
    console.log(`    ${hc}\trazem ${(tot[h]! / base).toFixed(2)}\t` + parts.map((x) => `${x.label}: ${x.val[h]!.toFixed(2)}`).join('\t'));
  }
});
