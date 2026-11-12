import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCards } from '@szkola/poker-core';
import { rangeFromClasses } from '../src/flop/combos';
import { FlopGame } from '../src/flop/game';
// użycie: tsx scripts/flop-time.ts "Ks 7d 2c 9h" [ITERACJE] [KATALOG_CELU]
// Pomiar czasu jednego stołu turn + river w TS (etap B3, plan B). Zakresy: BTN otwiera (siatka BeyondGTO),
// BB sprawdza (D-1334), pula SRP po zakładzie 1,4bb na flopie i sprawdzeniu: 5,5 + 2 × 1,4 = 8,3bb, za stawką 96,1bb.
// Drzewo turnu i rivera z D-1333: 66% puli, przebicie ×3, rake 5%/3bb.

const board = parseCards(process.argv[2] ?? 'Ks 7d 2c 9h');
const iters = Number(process.argv[3] ?? 50);
const dir = resolve(process.argv[4] ?? resolve(import.meta.dirname, '../targets/beyondgto-spots'));
const pre = JSON.parse(readFileSync(resolve(dir, 'preflop.json'), 'utf8')) as {
  preflop: Record<string, { freqs: Record<string, Record<string, number>> }>;
};
const pick = (page: string, act: string): Record<string, number> => {
  const out: Record<string, number> = {};
  for (const [h, a] of Object.entries(pre.preflop[page]!.freqs)) out[h] = a[act] ?? 0;
  return out;
};
const ip = rangeFromClasses(pick('rfi.btn', 'raise'), board);
const oop = rangeFromClasses(pick('def.bb-vs-btn', 'call'), board);
const g = new FlopGame({
  board,
  ranges: [oop, ip],
  pot: 8.3,
  stack: 96.1,
  streets: [{ betsPot: [0.66] }, { betsPot: [0.66] }],
  raiseMult: 3,
  allinFrac: 2 / 3,
  rakeRate: 0.05,
  rakeCap: 3,
});
const t0 = performance.now();
const step = Math.max(1, Math.floor(iters / 5));
for (let done = 0; done < iters; done += step) {
  g.run(Math.min(step, iters - done));
  const s = g.stats();
  console.log(`it ${s.iterations}: ${((performance.now() - t0) / 1000).toFixed(1)} s, NashConv ${(s.nashConvPot * 100).toFixed(3)}% puli`);
}
const ms = performance.now() - t0;
console.log(`turn ${process.argv[2] ?? 'Ks 7d 2c 9h'}: ${iters} iteracji w ${(ms / 1000).toFixed(1)} s (${(ms / iters).toFixed(0)} ms/iterację, z pomiarami NashConv)`);
