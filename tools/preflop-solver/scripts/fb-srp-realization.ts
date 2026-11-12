import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join, resolve } from 'node:path';
import { HAND_CLASSES } from '@szkola/poker-core';
import { validateEquity, type EqrParams, type EquityData } from '../src/model';
import { playerReach } from '../src/report';
import { PreflopSolver } from '../src/solver';
import { loadBoards, StreetModel, V3B_TREE, type StreetTreeConfig } from '../src/streets';
import { loadThreeWay } from '../src/threeway';
import { buildTree, type ShowdownTerminal } from '../src/tree';

// Sesja FB (diagnoza BB vs BTN/SB, docs/solver/diagnoza-bb-2026-11-12.md): realizacja equity w pulach z jednym podbiciem
// przy STAŁYCH zakresach preflop z pliku wynikowego, z grą po flopie rozwiązywaną od zera na podanych tablicach plansz.
// Porównanie dwóch tablic (np. kanon 60×2×2×24 i drobniejsza abstrakcja) mierzy wpływ abstrakcji na realizację
// przy tych samych zakresach; preflopu nie liczy się od nowa.
// użycie: tsx scripts/fb-srp-realization.ts WYNIK.json PLANSZE.bin.gz [iteracje=300]

// [nazwa, ścieżka końca drzewa, EQR bez pozycji, EQR z pozycją] — cele jak w scripts/fit-eqr.ts (rangeconverter, 6-max 100bb)
const TARGETS: [string, string, number, number][] = [
  ['BTN-BB SRP', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:call', 81.38, 115.15],
  ['SB-BB SRP', 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3,BB:call', 96.69, 103.66],
  ['CO-BTN flat', 'UTG:fold,HJ:fold,CO:raise2.5,BTN:call,SB:fold,BB:fold', 92.64, 106.91],
];
const root = resolve(import.meta.dirname, '../../..');
const [file, boardsFile, itA] = process.argv.slice(2);
const iters = Number(itA ?? 300);
type Meta = { eqr: EqrParams; tree: never; postflop: { highSprTree?: StreetTreeConfig; sprHigh?: number } };
const j = JSON.parse(readFileSync(resolve(file!), 'utf8')) as { meta: Meta; spots: { path: string; strategy: Record<string, number>[] }[] };
const equity = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as EquityData;
validateEquity(equity);
const tw = loadThreeWay(gunzipSync(readFileSync(join(root, 'tools/equity/equity3.bin.gz'))));
const boards = loadBoards(readFileSync(resolve(boardsFile!)), boardsFile);
const high = j.meta.postflop.highSprTree ?? null;
const sprHigh = j.meta.postflop.sprHigh ?? 8;
const cfg = (spr: number): StreetTreeConfig => (high && spr >= sprHigh ? high : V3B_TREE);
// pule z jednym podbiciem rozgrywane grą po flopie (minRaises 1, maxRaises 1); reszta na modelu EQR — nieistotne, bo czytamy tylko te końce
const s = new PreflopSolver(buildTree(j.meta.tree), equity, j.meta.eqr, undefined, tw, boards, 1, 1, cfg);
const tables = (s as unknown as { tables: Map<number, { stratSum: Float64Array; nA: number }> }).tables;
const byPath = new Map(j.spots.map((x) => [x.path, x]));
for (const n of s.nodes) {
  if (n.kind !== 'decision') continue;
  const t = tables.get(n.id)!;
  const sp = byPath.get(n.path);
  if (!sp) throw new Error(`Brak węzła w pliku wynikowym: ${n.path}`);
  HAND_CLASSES.forEach((hc, h) => sp.strategy.forEach((st, a) => (t.stratSum[h * t.nA + a] = st[hc]!)));
}
const pm = s.postflop as StreetModel;
const pIndex = (s as unknown as { postflopIndex: Map<number, number> }).postflopIndex;
const D = s.dcfr;
console.log(`plansze ${boardsFile}: ${boards.F}×${boards.T}×${boards.R}, ${boards.B} koszyków; ${iters} iteracji CFR gry po flopie`);
for (const [name, path, to, ti] of TARGETS) {
  const node = s.nodes.find((n): n is ShowdownTerminal => n.kind === 'showdown' && n.path === path)!;
  const reach = playerReach(s, node);
  let mass = 1;
  for (let q = 0; q < s.nPlayers; q++) if (q !== node.oop && q !== node.ip) mass *= reach[q]!.reduce((a, b) => a + b, 0);
  const idx = pIndex.get(node.id)!;
  const t0 = Date.now();
  for (let it = 1; it <= iters; it++) {
    pm.value(idx, 0, reach[node.oop]!, reach[node.ip]!, mass, 'train', it, D, 0);
    pm.value(idx, 1, reach[node.ip]!, reach[node.oop]!, mass, 'train', it, D, 0);
  }
  // wykorzystywalność samej gry po flopie: zysk najlepszej odpowiedzi względem strategii uśrednionej (bb na rozdanie w tej puli)
  const gain = ([0, 1] as const).map((role) => {
    const own = role === 0 ? reach[node.oop]! : reach[node.ip]!;
    const opp = role === 0 ? reach[node.ip]! : reach[node.oop]!;
    const a = pm.value(idx, role, own, opp, mass, 'avg', iters, D, 0);
    const b = pm.value(idx, role, own, opp, mass, 'br', iters, D, 0);
    let x = 0;
    let w = 0;
    for (let h = 0; h < own.length; h++) {
      x += own[h]! * (b[h]! - a[h]!);
      w += own[h]!;
    }
    return x / w / mass;
  });
  (s as unknown as { iteration: number }).iteration = iters;
  const [o, i] = s.realization(node.id, reach);
  console.log(
    `${name}: EQR OOP ${(o!.eqr * 100).toFixed(1)}% (cel ${to}), IP ${(i!.eqr * 100).toFixed(1)}% (cel ${ti}); equity OOP ${(o!.equityShare * 100).toFixed(1)}%; ` +
      `zysk BR OOP ${gain[0]!.toFixed(4)} IP ${gain[1]!.toFixed(4)} bb; ${((Date.now() - t0) / 1000).toFixed(0)} s`,
  );
}
