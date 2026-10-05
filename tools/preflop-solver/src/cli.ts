import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { dirname, join, resolve } from 'node:path';
import { DEFAULT_EQR, N, PLAY_GROUPS, validateEquity, type EqrParams, type EquityData, type PlayGroup } from './model';
import { evReport, formatSummary, rangeOf, realizationReport, summarize } from './report';
import { DEFAULT_DCFR, PreflopSolver } from './solver';
import { loadFlops, type FlopData } from './postflop';
import { loadBoards, StreetModel, V3B_TREE, type StreetData, type StreetTreeConfig } from './streets';
import { PostflopPool } from './pfpool';
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
// wariant pomiarowy (naprawa EQR): --3bet-oop 4.4 = 3-bet bez pozycji do 11bb po otwarciu 2,5bb (kanon 4, czyli 10bb)
const treeConfig = { ...DEFAULT_TREE, bbOvercall: useThreeWay, ...(args.includes('--3bet-oop') ? { threeBetOop: Number(arg('3bet-oop', '4')) } : {}) };
// gra po flopie w pulach 3-betowanych (wersja 3, wariant pomiarowy): --flops tools/equity/boards.bin.gz (trzy ulice)
// albo tools/equity/flops.bin.gz (bez nowych kart). Domyślnie none = kanon (wersja 2, model EQR we wszystkich pulach).
const flopsArg = arg('flops', 'none');
let flops: FlopData | StreetData | null = null;
if (flopsArg !== 'none') {
  const buf = readFileSync(resolve(root, flopsArg));
  const raw = buf[0] === 0x1f && buf[1] === 0x8b ? gunzipSync(buf) : buf;
  if (raw.subarray(0, 7).toString('latin1') === 'SZKPPF2') {
    const d = loadBoards(raw, flopsArg);
    flops = d;
    console.log(`Gra po flopie z nowymi kartami: ${d.F} flopów × ${d.T} turny × ${d.R} rivery, ${d.B} koszyków (${flopsArg})`);
  } else {
    const d = loadFlops(raw, flopsArg);
    flops = d;
    console.log(`Gra po flopie bez nowych kart: ${d.F} flopów, ${d.B} koszyków (${flopsArg})`);
  }
}
const postflopMinRaises = Number(arg('postflop-min-raises', '2'));
const postflopMaxRaises = Number(arg('postflop-max-raises', '2'));
// v3c: drzewo gry po flopie dla pul o SPR ≥ --pf-spr-high (domyślnie 8): --pf-high-sizes "0.33,0.75/0.66/0"
// (ułamki puli na flopie / turnie / riverze, 0 = zakład geometryczny), --pf-high-raise 3 (przebicie do 3x zakładu, 0 = all-in)
const parseSizes = (x: string): StreetTreeConfig['sizes'] => {
  const parts = x.split('/');
  const lv = (i: number) => (parts[Math.min(i, parts.length - 1)] ?? '0').split(',').map(Number);
  return [lv(0), lv(1), lv(2)];
};
const highTree: StreetTreeConfig | null = args.includes('--pf-high-sizes') ? { sizes: parseSizes(arg('pf-high-sizes', '0')), raise: Number(arg('pf-high-raise', '0')) } : null;
const sprHigh = Number(arg('pf-spr-high', '8'));
const postflopTree = (spr: number): StreetTreeConfig => (highTree && spr >= sprHigh ? highTree : V3B_TREE);
// --threads N: gra po flopie liczona w N wątkach (tylko z --flops dla tablic z nowymi kartami)
const threads = Number(arg('threads', '1'));
// --explore-iters N: eksploracja do iteracji N (domyślnie 150; 0 = przez cały przebieg)
const exploreIters = args.includes('--explore-iters') ? Number(arg('explore-iters', '150')) || Infinity : null;

// punkt kontrolny: --checkpoint PLIK (zapis co --checkpoint-every iteracji, wznowienie po restarcie)
const checkpoint = args.includes('--checkpoint') ? resolve(arg('checkpoint', '')) : null;
const checkpointEvery = Number(arg('checkpoint-every', '10'));

// wariant pomiarowy B-045 (nie kanon): --lock-fold 0.6 wymusza częstość pasa otwierającego wobec 3-betu z blindów
// (BTN vs 3-bet SB, BTN vs 3-bet BB, SB vs 3-bet BB)
const lockFold = args.includes('--lock-fold') ? Number(arg('lock-fold', '0')) : null;
const LOCK_PATHS = [
  'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:raise10,BB:fold',
  'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:raise10',
  'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3,BB:raise9',
];

async function solve(eqr: EqrParams, iterations: number, log = true): Promise<{ s: PreflopSolver; pool: PostflopPool | null }> {
  const s = new PreflopSolver(buildTree(treeConfig), equity, eqr, DEFAULT_DCFR, threeWay, flops, postflopMinRaises, postflopMaxRaises, postflopTree);
  if (lockFold !== null)
    for (const path of LOCK_PATHS) {
      const n = s.nodes.find((x) => x.kind === 'decision' && x.path === path) as DecisionNode | undefined;
      if (!n || n.actions[0]!.kind !== 'fold') throw new Error(`Blokada pasa: brak węzła ${path}`);
      s.foldLocks.set(n.id, lockFold);
    }
  if (exploreIters !== null) s.exploreIterations = exploreIters;
  const fingerprint = JSON.stringify({ eqr, flops: flopsArg, postflopMinRaises, postflopMaxRaises, tree: treeConfig, lockFold, ...(highTree ? { highTree, sprHigh } : {}), ...(exploreIters !== null ? { exploreIters: String(exploreIters) } : {}) });
  if (checkpoint && s.loadState(checkpoint, fingerprint)) console.error(`Wznowiono z punktu kontrolnego: iteracja ${s.iteration}`);
  const pool = threads > 1 && s.postflop instanceof StreetModel ? new PostflopPool(s.postflop, { equityFile: join(root, 'tools/equity/equity169.json'), boardsFile: resolve(root, flopsArg) }, eqr, threads) : null;
  const expl = () => (pool ? s.exploitabilityParallel(pool) : Promise.resolve(s.exploitability()));
  const t0 = Date.now();
  const start = s.iteration + 1;
  for (let i = start; i <= iterations; i++) {
    if (pool) await s.stepParallel(pool);
    else s.step();
    if (i % 10 === 0) console.error(`iteracja ${i}/${iterations} (${((Date.now() - t0) / 1000).toFixed(0)} s od startu procesu)`);
    if (checkpoint && i % checkpointEvery === 0) s.saveState(checkpoint, fingerprint);
    if (log && (i % 100 === 0 || i === iterations)) {
      const e = await expl();
      console.log(`iteracja ${i}: NashConv ${e.nashConv.toFixed(4)} bb, max gracz ${Math.max(...e.perPlayer).toFixed(4)} bb (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    }
  }
  return { s, pool };
}

const eqr: EqrParams = {
  k: Number(arg('k', String(DEFAULT_EQR.k))),
  m: Number(arg('m', String(DEFAULT_EQR.m))),
  rakeRate: Number(arg('rake', String(DEFAULT_EQR.rakeRate))),
  rakeCap: Number(arg('cap', String(DEFAULT_EQR.rakeCap))),
  role: Number(arg('role', '0')),
  ...(args.includes('--role3') ? { role3: Number(arg('role3', '0')) } : {}),
  ...(args.includes('--role4') ? { role4: Number(arg('role4', '0')) } : {}),
  ...(args.includes('--spr-full') ? { sprFull: Number(arg('spr-full', '8')) } : {}),
  // warianty pomiarowe (naprawa EQR, raport 10): --weights p22=1.2,oAce=0.75 (grupy: PLAY_GROUPS w model.ts), --spr-play 16
  ...(args.includes('--weights') ? { weights: parseWeights(arg('weights', '')) } : {}),
  ...(args.includes('--spr-play') ? { sprPlay: Number(arg('spr-play', '8')) } : {}),
  // --io 0.1 [--io-cap 20]: człon implied odds (dane: tools/equity/implied169.json z scripts/implied.ts)
  ...(args.includes('--io') ? { io: Number(arg('io', '0')) } : {}),
  ...(args.includes('--io-cap') ? { ioCap: Number(arg('io-cap', '100')) } : {}),
  // --mid 0.1 [--mid-cap 4]: człon ręki średniej siły (te same dane)
  ...(args.includes('--mid') ? { mid: Number(arg('mid', '0')) } : {}),
  ...(args.includes('--mid-cap') ? { midCap: Number(arg('mid-cap', '4')) } : {}),
};
if (eqr.io || eqr.mid) {
  const d = JSON.parse(readFileSync(join(root, 'tools/equity/implied169.json'), 'utf8')) as { classes: string[]; nut: number[]; pay: number[]; mid: number[] };
  if (d.classes.join() !== equity.classes.join()) throw new Error('implied169.json: inna kolejność klas niż w macierzy equity');
  equity.implied = { nut: d.nut, pay: d.pay, mid: d.mid };
}

function parseWeights(s: string): Partial<Record<PlayGroup, number>> {
  const out: Partial<Record<PlayGroup, number>> = {};
  for (const kv of s.split(',').filter(Boolean)) {
    const [g, v] = kv.split('=');
    if (!(PLAY_GROUPS as readonly string[]).includes(g!) || !Number.isFinite(Number(v))) throw new Error(`--weights: nieznana grupa albo wartość „${kv}”`);
    out[g as PlayGroup] = Number(v);
  }
  return out;
}

if (args.includes('--calibrate')) {
  const iters = Number(arg('iterations', '200'));
  const ks = arg('ks', '0.5,1,1.5,2').split(',').map(Number);
  const ms = arg('ms', '0.04,0.08,0.12').split(',').map(Number);
  const roles = arg('roles', String(eqr.role ?? 0)).split(',').map(Number);
  const role3s = args.includes('--role3s') ? arg('role3s', '0').split(',').map(Number) : [undefined];
  const sprFulls = args.includes('--spr-fulls') ? arg('spr-fulls', '8').split(',').map(Number) : [eqr.sprFull];
  console.log('sprFull\tk\tm\trole\trole3\tBTN RFI\tBB obrona vs BTN\tCO 3-bet vs UTG\tpas vs 3-bet\t| UTG\tHJ\tCO\tSB\tBB 3b vs BTN\tBB 3b vs SB\tSB 3b vs BTN\tBTN 3b vs CO\t4-bet vs 3b\tNashConv');
  for (const sprFull of sprFulls)
  for (const role3 of role3s)
  for (const role of roles)
    for (const k of ks)
      for (const m of ms) {
        const { s, pool } = await solve({ ...eqr, k, m, role, ...(role3 === undefined ? {} : { role3 }), ...(sprFull === undefined ? {} : { sprFull }) }, iters, false);
        const sum = summarize(s);
        const f = (name: string) => sum.spots.find((x) => x.name === name)!.freqs;
        const bb = f('BB vs BTN');
        const co = f('CO vs UTG');
        const v3 = f('CO vs 3-bet BTN');
        const raise = (x: Record<string, number>) => Object.entries(x).filter(([a]) => a.startsWith('raise')).reduce((t, [, v]) => t + v, 0);
        const p1 = (x: number) => (x * 100).toFixed(1);
        const extra = [sum.rfi.UTG!, sum.rfi.HJ!, sum.rfi.CO!, sum.rfi.SB!, raise(bb), raise(f('BB vs SB')), raise(f('SB vs BTN')), raise(f('BTN vs CO')), raise(v3)].map(p1).join('\t');
        const nc = pool ? (await s.exploitabilityParallel(pool)).nashConv : s.exploitability().nashConv;
        await pool?.close();
        console.log(`${sprFull ?? 8}\t${k}\t${m}\t${role}\t${role3 ?? '-'}\t${p1(sum.rfi.BTN!)}\t${p1(1 - (bb.fold ?? 0))}\t${p1(raise(co))}\t${p1(v3.fold ?? 0)}\t| ${extra}\t${nc.toFixed(4)}`);
      }
} else {
  const iterations = Number(arg('iterations', '600'));
  console.log(`Solver: DCFR ${JSON.stringify(DEFAULT_DCFR)}, EQR ${JSON.stringify(eqr)}, ${iterations} iteracji`);
  const { s, pool } = await solve(eqr, iterations);
  const summary = summarize(s);
  console.log(formatSummary(summary));
  const realization = realizationReport(s);
  console.log(realization);
  // diagnostyka B-045: wartość akcji w 3-betach z blindów (--ev-report)
  if (args.includes('--ev-report')) console.log(evReport(s));
  const expl = pool ? await s.exploitabilityParallel(pool) : s.exploitability();
  await pool?.close();

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
          ...(lockFold !== null ? { lock: { fold: lockFold, paths: LOCK_PATHS, note: 'wariant pomiarowy B-045, nie kanon' } } : {}),
          iterations,
          ...(exploreIters !== null ? { exploreIterations: String(exploreIters) } : {}),
          players: N_PLAYERS,
          handClasses: N,
          nashConvBb: Number(expl.nashConv.toFixed(5)),
          perPlayerGainBb: expl.perPlayer.map((x) => Number(x.toFixed(5))),
          equity: 'tools/equity/equity169.json (dokładne przeliczenie)',
          equity3: threeWay ? `tools/equity/equity3.bin.gz (${threeWay.samples} prób Monte Carlo na trójkę klas)` : null,
          postflop: flops
            ? 'kind' in flops && flops.kind === 'streets'
              ? { file: flopsArg, model: 'flop, turn i river jako osobne ulice', ...(highTree ? { highSprTree: highTree, sprHigh } : {}), flops: flops.F, turnsPerFlop: flops.T, riversPerTurn: flops.R, buckets: flops.B, minRaises: postflopMinRaises, maxRaises: postflopMaxRaises, regretWeight: s.postflop!.regretWeight, betting: 'na każdej ulicy czekanie albo zakład geometryczny na pozostałe ulice, przebicie all-in' }
              : { file: flopsArg, model: 'bez nowych kart', flops: flops.F, buckets: flops.B, minRaises: postflopMinRaises, maxRaises: postflopMaxRaises, regretWeight: s.postflop!.regretWeight, rounds: 'SPR ≥ 3: 3 rundy, inaczej 2; zakład geometryczny, przebicie all-in' }
            : null,
          realization,
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
