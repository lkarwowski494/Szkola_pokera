import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { DEFAULT_EQR, N, validateEquity, type EqrParams, type EquityData } from './model';
import { formatSummary, rangeOf, summarize } from './report';
import { DEFAULT_DCFR, PreflopSolver } from './solver';
import { loadThreeWay, type ThreeWayData } from './threeway';
import { buildTree, DEFAULT_TREE, N_PLAYERS, POSITIONS, type DecisionNode } from './tree';

/**
 * Użycie:
 *   pnpm solve [--iterations 600] [--k 1] [--m 0.08] [--rake 0.05] [--cap 3] [--out content/ranges/preflop-6max-100bb.json]
 *   pnpm solve --calibrate   (siatka k × m na krótkich rozwiązaniach, wypisuje metryki)
 */
const root = resolve(import.meta.dirname, '../../..');
const args = process.argv.slice(2);
const arg = (name: string, def: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1]! : def;
};

const equity = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as EquityData;
validateEquity(equity);
const useThreeWay = !args.includes('--no-3way');
const threeWayFile = join(root, 'tools/equity/equity3.bin.gz');
let threeWay: ThreeWayData | null = null;
if (useThreeWay) {
  const t0 = Date.now();
  threeWay = loadThreeWay(readFileSync(threeWayFile));
  console.log(`Tablica equity 3-way: ${threeWay.samples} prób na trójkę (${((Date.now() - t0) / 1000).toFixed(0)} s wczytywania)`);
}
const treeConfig = { ...DEFAULT_TREE, bbOvercall: useThreeWay };

function solve(eqr: EqrParams, iterations: number, log = true): PreflopSolver {
  const s = new PreflopSolver(buildTree(treeConfig), equity, eqr, DEFAULT_DCFR, threeWay);
  const t0 = Date.now();
  for (let i = 1; i <= iterations; i++) {
    s.step();
    if (log && (i % 100 === 0 || i === iterations)) {
      const e = s.exploitability();
      console.log(`iteracja ${i}: NashConv ${e.nashConv.toFixed(4)} bb, max gracz ${Math.max(...e.perPlayer).toFixed(4)} bb (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    }
  }
  return s;
}

const eqr: EqrParams = {
  k: Number(arg('k', String(DEFAULT_EQR.k))),
  m: Number(arg('m', String(DEFAULT_EQR.m))),
  rakeRate: Number(arg('rake', String(DEFAULT_EQR.rakeRate))),
  rakeCap: Number(arg('cap', String(DEFAULT_EQR.rakeCap))),
  role: Number(arg('role', '0')),
  ...(args.includes('--role3') ? { role3: Number(arg('role3', '0')) } : {}),
};

if (args.includes('--calibrate')) {
  const iters = Number(arg('iterations', '200'));
  const ks = arg('ks', '0.5,1,1.5,2').split(',').map(Number);
  const ms = arg('ms', '0.04,0.08,0.12').split(',').map(Number);
  const roles = arg('roles', String(eqr.role ?? 0)).split(',').map(Number);
  const role3s = args.includes('--role3s') ? arg('role3s', '0').split(',').map(Number) : [undefined];
  console.log('k\tm\trole\trole3\tBTN RFI\tBB obrona vs BTN\tCO 3-bet vs UTG\tpas vs 3-bet');
  for (const role3 of role3s)
  for (const role of roles)
    for (const k of ks)
      for (const m of ms) {
        const s = solve({ ...eqr, k, m, role, ...(role3 === undefined ? {} : { role3 }) }, iters, false);
        const sum = summarize(s);
        const f = (name: string) => sum.spots.find((x) => x.name === name)!.freqs;
        const bb = f('BB vs BTN');
        const co = f('CO vs UTG');
        const v3 = f('CO vs 3-bet BTN');
        const raise = (x: Record<string, number>) => Object.entries(x).filter(([a]) => a.startsWith('raise')).reduce((t, [, v]) => t + v, 0);
        console.log(`${k}\t${m}\t${role}\t${role3 ?? '-'}\t${(sum.rfi.BTN! * 100).toFixed(1)}\t${((1 - (bb.fold ?? 0)) * 100).toFixed(1)}\t${(raise(co) * 100).toFixed(1)}\t${((v3.fold ?? 0) * 100).toFixed(1)}`);
      }
} else {
  const iterations = Number(arg('iterations', '600'));
  console.log(`Solver: DCFR ${JSON.stringify(DEFAULT_DCFR)}, EQR ${JSON.stringify(eqr)}, ${iterations} iteracji`);
  const s = solve(eqr, iterations);
  const summary = summarize(s);
  console.log(formatSummary(summary));
  const expl = s.exploitability();

  // eksport: wszystkie węzły decyzyjne z rozkładem akcji na klasę ręki (jedno źródło prawdy dla zakresów)
  const spots = s.nodes
    .filter((n): n is DecisionNode => n.kind === 'decision')
    .map((n) => ({
      path: n.path,
      player: POSITIONS[n.player],
      raiseLevel: n.raiseLevel,
      actions: n.actions.map((a) => a.label),
      strategy: n.actions.map((_, i) => rangeOf(s, n, i)),
    }));
  const out = resolve(root, arg('out', 'content/ranges/preflop-6max-100bb.json'));
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    JSON.stringify(
      {
        meta: {
          solver: '@szkola/preflop-solver 0.1.0',
          algorithm: 'Discounted CFR',
          dcfr: DEFAULT_DCFR,
          tree: treeConfig,
          eqr,
          iterations,
          players: N_PLAYERS,
          handClasses: N,
          nashConvBb: Number(expl.nashConv.toFixed(5)),
          perPlayerGainBb: expl.perPlayer.map((x) => Number(x.toFixed(5))),
          equity: 'tools/equity/equity169.json (dokładne przeliczenie)',
          equity3: threeWay ? `tools/equity/equity3.bin.gz (${threeWay.samples} prób Monte Carlo na trójkę klas)` : null,
          summary,
        },
        spots,
      },
      null,
      0,
    ),
  );
  console.log(`Zapisano ${out} (${spots.length} węzłów)`);
}
