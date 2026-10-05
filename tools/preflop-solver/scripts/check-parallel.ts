import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join, resolve } from 'node:path';
import { DEFAULT_EQR, validateEquity, type EquityData } from '../src/model';
import { PostflopPool } from '../src/pfpool';
import { DEFAULT_DCFR, PreflopSolver } from '../src/solver';
import { loadBoards, StreetModel, type StreetTreeConfig } from '../src/streets';
import { loadThreeWay } from '../src/threeway';
import { buildTree, DEFAULT_TREE } from '../src/tree';
// użycie: tsx scripts/check-parallel.ts [ITERACJE=2] [WĄTKI=3] [MIN_PODBIĆ=1]
// Sprawdza, że gra po flopie liczona w puli wątków (v3c) daje to samo co liczona synchronicznie:
// wartości graczy, wykorzystywalność i tablice żalu po kilku iteracjach (różnica 0 do błędu zaokrągleń).
const root = resolve(import.meta.dirname, '../../..');
const [itA, thA, minA] = process.argv.slice(2);
const iters = Number(itA ?? 2);
const threads = Number(thA ?? 3);
const minRaises = Number(minA ?? 1);
const eq = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as EquityData;
validateEquity(eq);
const tw = loadThreeWay(readFileSync(join(root, 'tools/equity/equity3.bin.gz')));
const boardsFile = join(root, 'tools/equity/boards.bin.gz');
const data = loadBoards(gunzipSync(readFileSync(boardsFile)), boardsFile);
const high: StreetTreeConfig = { sizes: [[0.33, 0.75], [0.66], [0]], raise: 3 };
const treeOf = (spr: number) => (spr >= 8 ? high : { sizes: [[0], [0], [0]] as StreetTreeConfig['sizes'], raise: 0 });
const eqr = { ...DEFAULT_EQR, k: 1.25, m: 0.16 };
const make = () => new PreflopSolver(buildTree(DEFAULT_TREE), eq, eqr, DEFAULT_DCFR, tw, data, minRaises, 3, treeOf);
const a = make();
const b = make();
const pool = new PostflopPool(b.postflop as StreetModel, { equityFile: join(root, 'tools/equity/equity169.json'), boardsFile }, eqr, threads);
let t0 = Date.now();
for (let i = 0; i < iters; i++) a.step();
const tA = (Date.now() - t0) / 1000;
t0 = Date.now();
for (let i = 0; i < iters; i++) await b.stepParallel(pool);
const tB = (Date.now() - t0) / 1000;
let maxReg = 0;
const ta = (a.postflop as StreetModel).terminals;
const tb = (b.postflop as StreetModel).terminals;
ta.forEach((t, i) => {
  for (let k = 0; k < t.regrets.length; k += 97) maxReg = Math.max(maxReg, Math.abs(t.regrets[k]! - tb[i]!.regrets[k]!));
});
const vA = a.value(0);
const vB = await b.valueParallel(pool, 0);
const eA = a.exploitability().nashConv;
const eB = (await b.exploitabilityParallel(pool)).nashConv;
await pool.close();
console.log(`końce z grą po flopie: ${ta.length}; czas ${iters} iter.: synchronicznie ${tA.toFixed(1)} s, ${threads} wątki ${tB.toFixed(1)} s`);
console.log(`różnica wartości UTG ${Math.abs(vA - vB).toExponential(2)}, NashConv ${eA.toFixed(6)} / ${eB.toFixed(6)}, max różnica żalu po flopie ${maxReg.toExponential(2)}`);
if (Math.abs(vA - vB) > 1e-9 || Math.abs(eA - eB) > 1e-9 || maxReg > 1e-6) {
  console.error('NIEZGODNOŚĆ wyniku równoległego z synchronicznym');
  process.exit(1);
}
