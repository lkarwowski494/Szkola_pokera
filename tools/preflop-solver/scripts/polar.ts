import { readFileSync } from 'node:fs';
import { combosCount, HAND_CLASSES } from '@szkola/poker-core';
// użycie: tsx scripts/polar.ts WYNIK.json [WYNIK2.json ...]
// Skład 3-betów z blindów wobec otwarcia (B-045): czy zakres jest liniowy, czy spolaryzowany,
// i jak często otwierający pasuje wobec tego 3-betu.

interface Spot {
  path: string;
  player: string;
  actions: string[];
  strategy: Record<string, number>[];
}

const C = HAND_CLASSES.map(combosCount);
const idx = (hc: string) => HAND_CLASSES.indexOf(hc);
// grupy z B-045: blefy (słabe asy w kolorze, łączniki w kolorze) i środek (ręce, które w zakresie spolaryzowanym raczej sprawdzają)
const BLUFFS = ['A5s', 'A4s', 'A3s', 'A2s', '54s', '65s', '76s', '87s', '98s', 'T9s'];
const MIDDLE = ['55', '66', '77', '88', '99', 'ATo', 'A9o', 'KQo'];
const VALUE = ['AA', 'KK', 'QQ', 'AKs', 'AKo'];

const SPOTS = [
  { name: 'SB vs BTN', open: 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5', threeBet: 'SB', after: ',BB:fold', openerNode: 'UTG:fold,HJ:fold,CO:fold' },
  { name: 'BB vs BTN', open: 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold', threeBet: 'BB', after: '', openerNode: 'UTG:fold,HJ:fold,CO:fold' },
  { name: 'BB vs SB', open: 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3', threeBet: 'BB', after: '', openerNode: 'UTG:fold,HJ:fold,CO:fold,BTN:fold' },
];

const pct = (x: number) => `${(x * 100).toFixed(1)}`;

for (const file of process.argv.slice(2)) {
  const j = JSON.parse(readFileSync(file, 'utf8')) as { meta: { eqr: unknown; lock?: unknown; postflop?: unknown; iterations: number }; spots: Spot[] };
  const byPath = new Map(j.spots.map((s) => [s.path, s]));
  console.log(`\n${file}\n  eqr ${JSON.stringify(j.meta.eqr)}, iteracje ${j.meta.iterations}, gra po flopie: ${j.meta.postflop ? 'tak' : 'nie'}${j.meta.lock ? `, blokada ${JSON.stringify(j.meta.lock)}` : ''}`);
  console.log('  spot\t\t3-bet\tpas otw.\tsprawdz.\t4-bet\t| 3-bet: wartość\tblefy\tśrodek\tindeks polar.');
  for (const sp of SPOTS) {
    const node = byPath.get(sp.open)!;
    const ai = node.actions.findIndex((a) => a.startsWith('raise'));
    const raise = node.strategy[ai]!;
    // otwierający: zasięg = jego decyzja o otwarciu (po pasach przed nim)
    const openNode = byPath.get(sp.openerNode)!;
    const openRange = openNode.strategy[openNode.actions.findIndex((a) => a.startsWith('raise'))]!;
    const label = node.actions[ai]!.replace('raise ', 'raise');
    const resp = byPath.get(`${sp.open},${sp.threeBet}:${label}${sp.after}`)!;
    let tb = 0;
    let all = 0;
    const group = (names: string[]) => names.reduce((t, n) => t + C[idx(n)]! * raise[n]!, 0);
    for (const hc of HAND_CLASSES) {
      tb += C[idx(hc)]! * raise[hc]!;
      all += C[idx(hc)]!;
    }
    // odpowiedź otwierającego ważona jego zasięgiem otwarcia (bez blokerów)
    const r = resp.actions.map((_, a) => HAND_CLASSES.reduce((t, hc) => t + C[idx(hc)]! * openRange[hc]! * resp.strategy[a]![hc]!, 0));
    const rt = r.reduce((a, b) => a + b, 0);
    const bl = group(BLUFFS);
    const mid = group(MIDDLE);
    console.log(
      `  ${sp.name}\t${pct(tb / all)}\t${pct(r[0]! / rt)}\t\t${pct(r[1]! / rt)}\t\t${pct(r[2]! / rt)}\t| ${pct(group(VALUE) / tb)}\t\t${pct(bl / tb)}\t${pct(mid / tb)}\t${(bl / (bl + mid)).toFixed(2)}`,
    );
    const show = (names: string[]) => names.map((n) => `${n} ${Math.round(raise[n]! * 100)}`).join(' ');
    console.log(`    blefy: ${show(BLUFFS)}\n    środek: ${show(MIDDLE)}`);
  }
}
console.log('\nKolumny: częstości w %; „blefy”, „środek”, „wartość” = udział grupy w kombinacjach 3-betu; indeks polaryzacji = blefy / (blefy + środek), 1 = w pełni spolaryzowany, 0 = liniowy.');
