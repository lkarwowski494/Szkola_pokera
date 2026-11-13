// HD: warianty z remisem wśród rąk pasujących (SC-22/25/29) — przykłady i wpływ na EV (P/2 na kombinację).
import { join, resolve } from 'node:path';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compareHands, generateVariant, cardToString, type GeneratorTemplate } from '@szkola/poker-core';
const root = resolve(import.meta.dirname, '../../..'); const R = '23456789TJQKA';
const all = loadScenarioTemplates(join(root, 'content/pl/scenarios')).map((x) => x.template);
function combos(cls: string, dead: Set<number>) { const a = R.indexOf(cls[0]), b = R.indexOf(cls[1]), out: number[][] = [];
  for (let s1 = 0; s1 < 4; s1++) for (let s2 = 0; s2 < 4; s2++) { const c1 = a * 4 + s1, c2 = b * 4 + s2;
    if (a === b ? s2 <= s1 : cls[2] === 's' ? s1 !== s2 : s1 === s2) continue; if (dead.has(c1) || dead.has(c2)) continue; out.push([c1, c2]); } return out; }
function split(hero: number[], board: number[], classes: string[]) { const dead = new Set([...hero, ...board]); let worse = 0, better = 0, ties = 0;
  for (const cl of classes) for (const v of combos(cl, dead)) { const c = compareHands([...v, ...board], [...hero, ...board]); if (c > 0) better++; else if (c < 0) worse++; else ties++; } return { worse, better, ties }; }
const s = (cs: number[]) => cs.map((c) => cardToString(c)).join(' ');
for (const id of ['sc-22', 'sc-25', 'sc-29']) {
  const t: any = all.find((x) => x.id === id)!; const d = t.decisions[0];
  const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  let cw = 0, kmin = 0; let zRemisem = 0, odwrotPol = 0, odwrotPula = 0, pokaz = 0;
  for (let seed = 1; seed <= 2000; seed++) {
    const v: any = generateVariant(g, 'latwy', seed, { thresholds: { mixedMin: 0.035, mixedLow: 0.25 } } as any);
    const c = split(v.hero, v.board, d.calls), f = split(v.hero, v.board, d.folds);
    if (f.ties === 0) continue; zRemisem++;
    // EV(bet) − EV(check) w jednostkach puli P, zakład B = k·P: k·(W − L) + Tf/2 (na kombinację rywala, wspólny mianownik pominięty)
    const ev = (k: number) => k * (c.worse - c.better) + f.ties / 2;
    if (id === "sc-25") { if (ev(0.5) > 0) odwrotPol++; if (ev(1) > 0) odwrotPula++; if (ev(0.25) > 0) cw++; kmin = Math.max(kmin, f.ties / (2 * (c.better - c.worse))); }
    if (pokaz < 3) { pokaz++; console.log(`${id} ziarno ${seed}: gracz ${s(v.hero)} stół ${s(v.board)} | sprawdzające W=${c.worse} L=${c.better} T=${c.ties} | pasujące gorsze=${f.worse} remis=${f.ties}`); }
  }
  console.log(`${id}: warianty z remisem wśród pasujących ${zRemisem}/2000` + (id === 'sc-25' ? `; EV(bet) > EV(check) przy zakładzie 1/2 puli: ${odwrotPol}, przy zakładzie = pula: ${odwrotPula}, przy 1/4 puli: ${cw}; najmniejszy zakład (ułamek puli), od którego czekanie jest lepsze we wszystkich wariantach: ${kmin.toFixed(3)}` : ''));
}
