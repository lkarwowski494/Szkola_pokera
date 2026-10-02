import { readFileSync } from 'node:fs';
import { HAND_CLASSES } from '@szkola/poker-core';
import { compatMatrix, DEFAULT_EQR, N, PRIOR, type EquityData } from '../src/model';
import { loadFlops, PostflopModel } from '../src/postflop';
// Gra po flopie w izolacji: stałe zakresy, sama zbieżność CFR (diagnostyka).
const eq = JSON.parse(readFileSync(new URL('../../equity/equity169.json', import.meta.url), 'utf8')) as EquityData;
const compat = compatMatrix(eq.pairs);
const fl = loadFlops(readFileSync(process.argv[2]!));
const m = new PostflopModel(fl, DEFAULT_EQR, eq.equity, compat);
const ti = m.addTerminal(16.5, [7.5, 7.5], 92.5);
const evr = HAND_CLASSES.map((_, h) => { let s = 0; for (let v = 0; v < N; v++) s += PRIOR[v]! * compat[h * N + v]! * eq.equity[h]![v]!; return s; });
const order = [...evr.keys()].sort((a, b) => evr[b]! - evr[a]!);
const top = (lo: number, hi: number) => { const r = new Float64Array(N); let acc = 0; for (const h of order) { if (acc >= lo && acc < hi) r[h] = PRIOR[h]!; acc += PRIOR[h]!; } return r; };
const oop = top(0.03, 0.28); // CO: otwarcie bez 4-betów
const ip = top(0, 0.1); // BTN 3-bet
const D = { alpha: 1.5, beta: 0, gamma: 2 };
const ev = (role: 0 | 1, mode: 'avg' | 'br', it: number) => { const own = role === 0 ? oop : ip; const opp = role === 0 ? ip : oop; const v = m.value(ti, role, own, opp, 1, mode, it, D, 0); let s = 0; for (let h = 0; h < N; h++) s += own[h]! * v[h]!; return s; };
const iters = Number(process.argv[3] ?? 300);
for (let it = 1; it <= iters; it++) {
  m.value(ti, 0, oop, ip, 1, 'train', it, D, 0);
  m.value(ti, 1, ip, oop, 1, 'train', it, D, 0);
  if (it % 50 === 0 || it === 10) {
    const a0 = ev(0, 'avg', it), a1 = ev(1, 'avg', it), b0 = ev(0, 'br', it), b1 = ev(1, 'br', it);
    console.log(`it ${it}: EV OOP ${a0.toFixed(4)} IP ${a1.toFixed(4)} | zysk BR OOP ${(b0 - a0).toFixed(4)} IP ${(b1 - a1).toFixed(4)}`);
  }
}
