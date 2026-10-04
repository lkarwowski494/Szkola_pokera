import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { combosCount, HAND_CLASSES } from '@szkola/poker-core';
// użycie: tsx scripts/compare.ts CELE.json WYNIK.json [WYNIK2.json ...]
// Zgodność wyniku solvera z celami walidacji (scripts/fetch-targets.ts) w otwarciach i obronie blindów.
// Metryki na spot: częstości akcji; udział zgodnych klas (ta sama akcja dominująca, różnica < 50 pp), ważony kombinacjami;
// odległość = połowa sumy |różnic częstości| po akcjach, średnio na kombinację (0 = identycznie, 1 = rozłącznie);
// lista klas różniących się o co najmniej 50 pp. Dla 3-betów z blindów: indeks polaryzacji jak w polar.ts.

interface Spot {
  path: string;
  actions: string[];
  strategy: Record<string, number>[];
}
type Freqs = Record<string, Record<string, number>>;

const SPOTS: { name: string; path: string; kind: 'rfi' | 'def' }[] = [
  { name: 'rfi.UTG', path: '', kind: 'rfi' },
  { name: 'rfi.HJ', path: 'UTG:fold', kind: 'rfi' },
  { name: 'rfi.CO', path: 'UTG:fold,HJ:fold', kind: 'rfi' },
  { name: 'rfi.BTN', path: 'UTG:fold,HJ:fold,CO:fold', kind: 'rfi' },
  { name: 'rfi.SB', path: 'UTG:fold,HJ:fold,CO:fold,BTN:fold', kind: 'rfi' },
  { name: 'SB vs BTN', path: 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5', kind: 'def' },
  { name: 'BB vs BTN', path: 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold', kind: 'def' },
  { name: 'BB vs SB', path: 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3', kind: 'def' },
];
const BLUFFS = ['A5s', 'A4s', 'A3s', 'A2s', '54s', '65s', '76s', '87s', '98s', 'T9s'];
const MIDDLE = ['55', '66', '77', '88', '99', 'ATo', 'A9o', 'KQo'];
const C: Record<string, number> = Object.fromEntries(HAND_CLASSES.map((h) => [h, combosCount(h)]));
const ACTS = ['fold', 'call', 'raise'] as const;

/** Rozkład akcji (pas, sprawdzenie, podbicie) dla każdej klasy. */
function fromSolver(sp: Spot): Freqs {
  const out: Freqs = {};
  for (const hc of HAND_CLASSES) {
    const f = { fold: 0, call: 0, raise: 0 };
    sp.actions.forEach((a, i) => {
      const k = a.startsWith('fold') ? 'fold' : a.startsWith('call') ? 'call' : 'raise';
      f[k] += sp.strategy[i]![hc]!;
    });
    out[hc] = f;
  }
  return out;
}
function fromTarget(t: Freqs): Freqs {
  const out: Freqs = {};
  for (const hc of HAND_CLASSES) {
    const x = t[hc]!;
    const raise = (x.raise ?? 0) + (x['3-bet'] ?? 0) + (x.jam ?? 0);
    const call = x.call ?? 0;
    out[hc] = { fold: Math.max(0, 1 - raise - call), call, raise };
  }
  return out;
}
const top = (f: Record<string, number>) => ACTS.reduce((b, a) => (f[a]! > f[b]! ? a : b), 'fold' as (typeof ACTS)[number]);

function metrics(s: Freqs, t: Freqs) {
  let agree = 0;
  let dist = 0;
  let all = 0;
  const freq = { s: { fold: 0, call: 0, raise: 0 }, t: { fold: 0, call: 0, raise: 0 } };
  const diff: string[] = [];
  for (const hc of HAND_CLASSES) {
    const c = C[hc]!;
    all += c;
    let d = 0;
    let maxd = 0;
    for (const a of ACTS) {
      d += Math.abs(s[hc]![a]! - t[hc]![a]!);
      maxd = Math.max(maxd, Math.abs(s[hc]![a]! - t[hc]![a]!));
      freq.s[a] += c * s[hc]![a]!;
      freq.t[a] += c * t[hc]![a]!;
    }
    dist += (c * d) / 2;
    if (top(s[hc]!) === top(t[hc]!) && maxd < 0.5) agree += c;
    if (maxd >= 0.5) diff.push(`${hc} ${ACTS.map((a) => Math.round(s[hc]![a]! * 100)).join('/')}←${ACTS.map((a) => Math.round(t[hc]![a]! * 100)).join('/')}`);
  }
  for (const a of ACTS) {
    freq.s[a] /= all;
    freq.t[a] /= all;
  }
  return { agree: agree / all, dist: dist / all, freq, diff };
}
function polar(f: Freqs): number {
  const g = (names: string[]) => names.reduce((t, n) => t + C[n]! * f[n]!.raise!, 0);
  const b = g(BLUFFS);
  const m = g(MIDDLE);
  return b / (b + m);
}

const p1 = (x: number) => (x * 100).toFixed(1);
const [targetsFile, ...files] = process.argv.slice(2);
const targets = JSON.parse(readFileSync(resolve(targetsFile!), 'utf8')) as { pages: Record<string, { freqs: Freqs }> };
for (const file of files) {
  const j = JSON.parse(readFileSync(resolve(file), 'utf8')) as { meta: { eqr: unknown; iterations: number; tree?: unknown }; spots: Spot[] };
  const byPath = new Map(j.spots.map((s) => [s.path, s]));
  console.log(`\n${file}\n  eqr ${JSON.stringify(j.meta.eqr)}, iteracje ${j.meta.iterations}`);
  console.log('  spot\t\tczęstości solver (pas/sprawdz./podb.)\tcel\t\t\tzgodne klasy\todległość\tpolar. solver/cel');
  let sumAgree = 0;
  for (const sp of SPOTS) {
    const node = byPath.get(sp.path);
    if (!node) continue;
    const s = fromSolver(node);
    const t = fromTarget(targets.pages[sp.name]!.freqs);
    const m = metrics(s, t);
    sumAgree += m.agree;
    const fr = (x: Record<string, number>) => ACTS.map((a) => p1(x[a]!)).join('/');
    const pol = sp.kind === 'def' ? `\t${polar(s).toFixed(2)}/${polar(t).toFixed(2)}` : '';
    console.log(`  ${sp.name.padEnd(10)}\t${fr(m.freq.s)}\t\t\t${fr(m.freq.t)}\t\t${p1(m.agree)}\t\t${m.dist.toFixed(3)}${pol}`);
    console.log(`    różnice ≥50 pp (${m.diff.length}, solver←cel, pas/sprawdz./podb.): ${m.diff.join(', ')}`);
  }
  console.log(`  średni udział zgodnych klas: ${p1(sumAgree / SPOTS.length)}%`);
}
