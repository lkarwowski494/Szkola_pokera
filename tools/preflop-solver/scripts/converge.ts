import { readFileSync } from 'node:fs';
import { DEFAULT_EQR, validateEquity, type EquityData } from '../src/model';
import { loadFlops } from '../src/postflop';
import { formatSummary, realizationReport, summarize } from '../src/report';
import { DEFAULT_DCFR, PreflopSolver } from '../src/solver';
import { loadThreeWay } from '../src/threeway';
import { buildTree, DEFAULT_TREE } from '../src/tree';
// użycie: tsx scripts/converge.ts FLOPS ITER CO_ILE [k m maxRaises]
const eq = JSON.parse(readFileSync(new URL('../../equity/equity169.json', import.meta.url), 'utf8')) as EquityData;
validateEquity(eq);
const tw = loadThreeWay(readFileSync(new URL('../../equity/equity3.bin.gz', import.meta.url)));
const fl = loadFlops(readFileSync(process.argv[2]!));
const [iters, every, k, m, maxR] = [Number(process.argv[3]), Number(process.argv[4]), Number(process.argv[5] ?? 1.25), Number(process.argv[6] ?? 0.16), Number(process.argv[7] ?? 2)];
const s = new PreflopSolver(buildTree(DEFAULT_TREE), eq, { ...DEFAULT_EQR, k, m }, DEFAULT_DCFR, tw, fl, 2, maxR);
const t0 = Date.now();
for (let i = 1; i <= iters; i++) {
  s.step();
  if (i % every === 0) {
    const full = s.exploitability();
    s.postflopBestResponse = false;
    const pre = s.exploitability();
    s.postflopBestResponse = true;
    console.log(`it ${i} (${((Date.now() - t0) / 1000).toFixed(0)} s): NashConv ${full.nashConv.toFixed(4)} [${full.perPlayer.map((x) => x.toFixed(3)).join(' ')}], sam preflop ${pre.nashConv.toFixed(4)}`);
  }
}
console.log(formatSummary(summarize(s)));
console.log(realizationReport(s));
