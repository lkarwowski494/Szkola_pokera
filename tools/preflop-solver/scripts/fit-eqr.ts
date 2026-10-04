import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { join, resolve } from 'node:path';
import { HAND_CLASSES } from '@szkola/poker-core';
import { validateEquity, type EqrParams, type EquityData } from '../src/model';
import { playerReach } from '../src/report';
import { PreflopSolver } from '../src/solver';
import { loadThreeWay } from '../src/threeway';
import { buildTree } from '../src/tree';
// użycie: tsx scripts/fit-eqr.ts WYNIK.json "m1,m2" "r1,r2" "s1,s2" ["r3a,r3b" (role3, domyślnie = role)] ["r4a" (role4)]
// Kalibracja wariantu naprawy EQR (raport 10): realizacja equity zakresów w 8 pulach heads-up przy STAŁYCH zakresach
// z pliku wynikowego, dla siatki m (pozycja) × role (inicjatywa) × sprFull, wobec celów z raportów zbiorczych
// rangeconverter (solver, 6-max 100bb). Błąd = pierwiastek ze średniego kwadratu różnicy EQR (w pp).

// [nazwa, ścieżka terminala, EQR bez pozycji, EQR z pozycją] — rangeconverter.com/reports/No-Limit-Texas-Holdem-Poker-Cash-Game/6-max-100bb
const TARGETS: [string, string, number, number][] = [
  ['BTN-BB SRP', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:call', 81.38, 115.15],
  ['SB-BB SRP', 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3,BB:call', 96.69, 103.66],
  ['CO-BTN flat', 'UTG:fold,HJ:fold,CO:raise2.5,BTN:call,SB:fold,BB:fold', 92.64, 106.91],
  ['BB 3b BTN', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:raise10,BTN:call', 99.22, 95.87],
  ['SB 3b BTN', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:raise10,BB:fold,BTN:call', 96.9, 98.5],
  ['BTN 3b CO', 'UTG:fold,HJ:fold,CO:raise2.5,BTN:raise7.5,SB:fold,BB:fold,CO:call', 81.06, 114.52],
  ['BB 3b SB', 'UTG:fold,HJ:fold,CO:fold,BTN:fold,SB:raise3,BB:raise9,SB:call', 85.89, 114.08],
  ['4BP BTN-BB', 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold,BB:raise10,BTN:raise23,BB:call', 85.21, 109.15],
];
const root = resolve(import.meta.dirname, '../../..');
const [file, msA, rsA, sfA, r3A, r4A] = process.argv.slice(2);
const j = JSON.parse(readFileSync(resolve(file!), 'utf8')) as { meta: { eqr: EqrParams; tree: never }; spots: { path: string; strategy: Record<string, number>[] }[] };
const equity = JSON.parse(readFileSync(join(root, 'tools/equity/equity169.json'), 'utf8')) as EquityData;
validateEquity(equity);
if (j.meta.eqr.io || j.meta.eqr.mid) {
  const d = JSON.parse(readFileSync(join(root, 'tools/equity/implied169.json'), 'utf8')) as { nut: number[]; pay: number[]; mid: number[] };
  equity.implied = { nut: d.nut, pay: d.pay, mid: d.mid };
}
const tw = loadThreeWay(gunzipSync(readFileSync(join(root, 'tools/equity/equity3.bin.gz'))));
const byPath = new Map(j.spots.map((x) => [x.path, x]));
const list = (s: string | undefined, d: string) => (s ?? d).split(',').map(Number);
console.log('m\trole\trole3\trole4\tsprFull\tbłąd pp\t' + TARGETS.map((t) => t[0]).join('\t'));
for (const m of list(msA, '0.16'))
  for (const role of list(rsA, '0'))
    for (const sprFull of list(sfA, '8'))
      for (const role3 of r3A ? list(r3A, '0') : [undefined])
      for (const role4 of r4A ? list(r4A, '0') : [undefined]) {
      const eqr: EqrParams = { ...j.meta.eqr, m, role, sprFull, ...(role3 === undefined ? {} : { role3 }), ...(role4 === undefined ? {} : { role4 }) };
      const s = new PreflopSolver(buildTree(j.meta.tree), equity, eqr, undefined, tw);
      const tables = (s as unknown as { tables: Map<number, { stratSum: Float64Array; nA: number }> }).tables;
      for (const n of s.nodes) {
        if (n.kind !== 'decision') continue;
        const t = tables.get(n.id)!;
        const sp = byPath.get(n.path)!;
        HAND_CLASSES.forEach((hc, h) => sp.strategy.forEach((st, a) => (t.stratSum[h * t.nA + a] = st[hc]!)));
      }
      let se = 0;
      const cells: string[] = [];
      for (const [, path, to, ti] of TARGETS) {
        const node = s.nodes.find((n) => n.kind === 'showdown' && n.path === path)!;
        const [o, i] = s.realization(node.id, playerReach(s, node));
        se += (o!.eqr * 100 - to) ** 2 + (i!.eqr * 100 - ti) ** 2;
        cells.push(`${(o!.eqr * 100).toFixed(0)}/${(i!.eqr * 100).toFixed(0)}`);
      }
      console.log(`${m}\t${role}\t${role3 ?? '-'}\t${role4 ?? '-'}\t${sprFull}\t${Math.sqrt(se / 16).toFixed(1)}\t${cells.join('\t')}`);
    }
console.log('cel\t\t\t\t\t\t' + TARGETS.map((t) => `${t[2].toFixed(0)}/${t[3].toFixed(0)}`).join('\t'));
