import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCard } from '@szkola/poker-core';
import { rangeFromClasses } from '../src/flop/combos';
import type { GameSpec } from '../src/flop/game';
import { solveNative } from '../src/flop/native';
import { w2Metrics } from '../src/flop/w2';
// użycie: tsx scripts/w2-run.ts STÓŁ [STÓŁ…]   (np. btn-vs-bb-srp-k72-rainbow)
// Etapy B5/B6 planu B: rozwiązuje stół solverem C i porównuje z siatką BeyondGTO według kryteriów W2 (D-1332).
// Model gry: D-1333. Zakresy: D-1334. Wynik każdego stołu w targets/w2-results/<stół>.json (poza gitem);
// istniejący wynik jest pomijany (punkt kontrolny na poziomie stołu).
// Zbieżność (reguła ustalona przed pomiarem): NashConv sprawdzany co 50 iteracji, stop przy < 0,5% puli, najwyżej 1000.

const ROOT = resolve(import.meta.dirname, '..');
const TARGETS = resolve(ROOT, 'targets/beyondgto-spots');
const OUT = resolve(ROOT, 'targets/w2-results');
const CANON = resolve(ROOT, '../../content/ranges/preflop-6max-100bb.json');
const STEP = 50;
const MAX_IT = 1000;
const NC_LIMIT = 0.005;

type Freqs = Record<string, Record<string, number>>;
const pre = JSON.parse(readFileSync(resolve(TARGETS, 'preflop.json'), 'utf8')) as { preflop: Record<string, { freqs: Freqs }> };
const canon = JSON.parse(readFileSync(CANON, 'utf8')) as { spots: { path: string; player: string; actions: string[]; strategy: Record<string, number>[] }[] };

const col = (page: string, act: string): Record<string, number> => {
  const f = pre.preflop[page];
  if (!f) throw new Error(`brak siatki ${page}`);
  const out: Record<string, number> = {};
  for (const [h, a] of Object.entries(f.freqs)) out[h] = a[act] ?? 0;
  return out;
};
const canonCall = (path: string): Record<string, number> => {
  const s = canon.spots.find((x) => x.path === path);
  if (!s) throw new Error(`kanon: brak węzła ${path}`);
  const i = s.actions.findIndex((a) => a.startsWith('call'));
  return s.strategy[i]!;
};
const times = (a: Record<string, number>, b: Record<string, number>): Record<string, number> => {
  const out: Record<string, number> = {};
  for (const h of Object.keys(a)) out[h] = (a[h] ?? 0) * (b[h] ?? 0);
  return out;
};

/** Pary pozycji: zakresy (D-1334), pula i stack (D-1333). OOP pierwszy w tablicy. */
const PAIRS: Record<string, { oop: () => Record<string, number>; ip: () => Record<string, number>; pot: number; stack: number; srp: boolean; hero: 'oop' | 'ip' }> = {
  'btn-vs-bb-srp': { oop: () => col('def.bb-vs-btn', 'call'), ip: () => col('rfi.btn', 'raise'), pot: 5.5, stack: 97.5, srp: true, hero: 'ip' },
  'co-vs-bb-srp': { oop: () => col('def.bb-vs-co', 'call'), ip: () => col('rfi.co', 'raise'), pot: 5.5, stack: 97.5, srp: true, hero: 'ip' },
  'hj-vs-bb-srp': { oop: () => col('def.bb-vs-hj', 'call'), ip: () => col('rfi.hj', 'raise'), pot: 5.5, stack: 97.5, srp: true, hero: 'ip' },
  'utg-vs-bb-srp': { oop: () => col('def.bb-vs-lj', 'call'), ip: () => col('rfi.lj', 'raise'), pot: 5.5, stack: 97.5, srp: true, hero: 'ip' },
  'bb-vs-btn-3bet': {
    oop: () => col('def.bb-vs-btn', '3bet'),
    ip: () => times(col('rfi.btn', 'raise'), canonCall('UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:raise10')),
    pot: 20.5, stack: 90, srp: false, hero: 'oop',
  },
  'bb-vs-co-3bet': {
    oop: () => col('def.bb-vs-co', '3bet'),
    ip: () => times(col('rfi.co', 'raise'), canonCall('UTG:fold,HJ:fold,CO:raise2.5,BTN:fold,SB:fold,BB:raise10')),
    pot: 20.5, stack: 90, srp: false, hero: 'oop',
  },
  'sb-vs-btn-3bet': {
    oop: () => col('def.sb-vs-btn', '3bet'),
    ip: () => times(col('rfi.btn', 'raise'), canonCall('UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:raise10,BB:fold')),
    pot: 21, stack: 90, srp: false, hero: 'oop',
  },
};

mkdirSync(OUT, { recursive: true });
for (const slug of process.argv.slice(2)) {
  const file = resolve(OUT, `${slug}.json`);
  if (existsSync(file)) {
    console.log(`${slug}: wynik istnieje, pomijam`);
    continue;
  }
  const pairKey = Object.keys(PAIRS).find((k) => slug.startsWith(`${k}-`));
  if (!pairKey) throw new Error(`nieznana para: ${slug}`);
  const pair = PAIRS[pairKey]!;
  const target = JSON.parse(readFileSync(resolve(TARGETS, 'spots', `${slug}.json`), 'utf8')) as {
    board: string[]; mainSizeBb: number; sizesPrinted: { bb: number }[]; classes: Freqs;
  };
  const board = target.board.map(parseCard);
  const large = pair.srp ? 4.4 : target.mainSizeBb === 5.6 ? 14.4 : 14; // rozmiary ze stron (w2-cel.md)
  const heroW = pair.hero === 'ip' ? pair.ip() : pair.oop();
  const spec: GameSpec = {
    board,
    ranges: [rangeFromClasses(pair.oop(), board), rangeFromClasses(pair.ip(), board)],
    pot: pair.pot,
    stack: pair.stack,
    streets: [{ betsBb: [target.mainSizeBb, large] }, { betsPot: [0.66] }, { betsPot: [0.66] }],
    raiseMult: 3,
    allinFrac: 2 / 3,
    rakeRate: 0.05,
    rakeCap: 3,
    oopCheckedFirst: pair.srp,
  };
  const t0 = Date.now();
  const res = solveNative(spec, MAX_IT, { threads: 4, reportEvery: STEP, targetNashConvPot: NC_LIMIT, progress: true });
  const it = res.iterations;
  const m = w2Metrics(board, heroW, res.root, target.classes);
  const pass = res.nashConvPot < NC_LIMIT && m.k1 <= 0.05 && m.k2 >= 0.85;
  writeFileSync(file, JSON.stringify({ slug, spec: { ...spec, ranges: undefined }, iterations: it, nashConvPot: res.nashConvPot, seconds: (Date.now() - t0) / 1000, tableMB: res.tableMB, metrics: m, pass, root: res.root }, null, 1));
  console.log(`${slug}: K1 ${(m.k1 * 100).toFixed(1)} pp (nasz ${(m.oursBet * 100).toFixed(1)}%, strona ${(m.pageBet * 100).toFixed(1)}%), K2 ${(m.k2 * 100).toFixed(1)}%, NashConv ${(res.nashConvPot * 100).toFixed(3)}%, ${pass ? 'PRZESZEDŁ' : 'NIE PRZESZEDŁ'}`);
}
