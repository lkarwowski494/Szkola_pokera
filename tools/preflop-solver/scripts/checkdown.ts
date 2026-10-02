import { readFileSync } from 'node:fs';
import { HAND_CLASSES } from '@szkola/poker-core';
import { compatMatrix, DEFAULT_EQR, N, PRIOR, rake, type EquityData } from '../src/model';
import { loadFlops, PostflopModel } from '../src/postflop';
const eq = JSON.parse(readFileSync(new URL('../../equity/equity169.json', import.meta.url), 'utf8')) as EquityData;
const compat = compatMatrix(eq.pairs);
const file = process.argv[2]!;
const data = loadFlops(readFileSync(file));
const eqr = { ...DEFAULT_EQR, rakeRate: 0, rakeCap: 0 };
const m = new PostflopModel(data, eqr, eq.equity, compat);
m.controlVariate = process.argv[3] === 'cv';
const ti = m.addTerminal(16.5, [7.5, 7.5], 92.5, 0);
// zakresy: CO open (top ~28%) vs BTN 3-bet (top ~8%) wg rankingu equity vs losowa
const evr = HAND_CLASSES.map((_, h) => { let s = 0; for (let v = 0; v < N; v++) s += PRIOR[v]! * compat[h * N + v]! * eq.equity[h]![v]!; return s; });
const order = [...evr.keys()].sort((a, b) => evr[b]! - evr[a]!);
const top = (frac: number) => { const r = new Float64Array(N); let acc = 0; for (const h of order) { if (acc >= frac) break; r[h] = PRIOR[h]!; acc += PRIOR[h]!; } return r; };
for (const [name, own, opp] of [['CO 28% vs BTN 8%', top(0.28), top(0.08)], ['BB 50% vs BTN 45%', top(0.5), top(0.45)], ['all vs all', top(1), top(1)]] as const) {
  const v = m.value(ti, 0, own, opp, 1, 'avg', 1, { alpha: 1.5, beta: 0, gamma: 2 }, 0);
  // dokładnie: Σ_v opp_v c(h,v) (pot·eq − inv)
  let errMax = 0, errW = 0, wsum = 0, worst = '';
  for (let h = 0; h < N; h++) {
    let ex = 0, mass = 0;
    for (let w = 0; w < N; w++) { const c = opp[w]! * compat[h * N + w]!; ex += c * (16.5 * eq.equity[h]![w]! - 7.5); mass += c; }
    if (mass === 0 || own[h] === 0) continue;
    const eqEx = (ex / mass + 7.5) / 16.5, eqAp = (v[h]! / mass + 7.5) / 16.5;
    const e = Math.abs(eqEx - eqAp);
    if (e > errMax) { errMax = e; worst = `${HAND_CLASSES[h]} ${eqEx.toFixed(3)} vs ${eqAp.toFixed(3)}`; }
    errW += e * own[h]!; wsum += own[h]!;
  }
  console.log(`${name}: średni błąd equity ${(errW / wsum * 100).toFixed(2)} pp, maks ${(errMax * 100).toFixed(2)} pp (${worst})`);
}
