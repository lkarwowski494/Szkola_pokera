import { readFileSync } from 'node:fs';
import { HAND_CLASSES } from '@szkola/poker-core';
import { compatMatrix, DEFAULT_EQR, N, PRIOR, type EquityData } from '../src/model';
import { loadBoards, StreetModel } from '../src/streets';
// Gra trzech ulic w izolacji: zgodność czekania z equity, suma zerowa bez rake, zbieżność, realizacja equity.
const eq = JSON.parse(readFileSync(new URL('../../equity/equity169.json', import.meta.url), 'utf8')) as EquityData;
const compat = compatMatrix(eq.pairs);
const data = loadBoards(readFileSync(process.argv[2]!));
const rakeless = { ...DEFAULT_EQR, rakeRate: 0, rakeCap: 0 };
const m = new StreetModel(data, rakeless, eq.equity, compat);
const ti = m.addTerminal(16, [8, 8], 92); // bez martwych pieniędzy
console.log('pamięć MB', (m.memoryBytes() / 1e6).toFixed(1), 'węzły', m.terminals[0]!.tree.decisions);
const evr = HAND_CLASSES.map((_, h) => { let s = 0; for (let v = 0; v < N; v++) s += PRIOR[v]! * compat[h * N + v]! * eq.equity[h]![v]!; return s; });
const order = [...evr.keys()].sort((a, b) => evr[b]! - evr[a]!);
const top = (lo: number, hi: number) => { const r = new Float64Array(N); let acc = 0; for (const h of order) { if (acc >= lo && acc < hi) r[h] = PRIOR[h]!; acc += PRIOR[h]!; } return r; };
const oop = top(0.03, 0.28);
const ip = top(0, 0.1);
const D = { alpha: 1.5, beta: 0, gamma: 2 };
const ev = (role: 0 | 1, mode: 'avg' | 'br', it: number) => { const own = role === 0 ? oop : ip; const opp = role === 0 ? ip : oop; const v = m.value(ti, role, own, opp, 1, mode, it, D, 0); let s = 0; for (let h = 0; h < N; h++) s += own[h]! * v[h]!; return s; };
let joint = 0, cd0 = 0;
for (let h = 0; h < N; h++) for (let o = 0; o < N; o++) { const c = oop[h]! * ip[o]! * compat[h * N + o]!; joint += c; cd0 += c * eq.equity[h]![o]!; }
const iters = Number(process.argv[3] ?? 200);
const t0 = Date.now();
for (let it = 1; it <= iters; it++) {
  m.value(ti, 0, oop, ip, 1, 'train', it, D, 0);
  m.value(ti, 1, ip, oop, 1, 'train', it, D, 0);
  if (it % 50 === 0 || it === 10) {
    const a0 = ev(0, 'avg', it), a1 = ev(1, 'avg', it), b0 = ev(0, 'br', it), b1 = ev(1, 'br', it);
    const share0 = (a0 / joint + 8) / 16;
    console.log(`it ${it} (${((Date.now() - t0) / 1000).toFixed(0)} s): suma ${(a0 + a1).toExponential(2)} | zysk BR OOP ${(b0 - a0).toFixed(4)} IP ${(b1 - a1).toFixed(4)} | OOP udział ${(share0 * 100).toFixed(1)}% przy equity ${(cd0 / joint * 100).toFixed(1)}% (EQR ${(share0 / (cd0 / joint) * 100).toFixed(0)}%)`);
  }
}
