// HE (06-tresci-001 po 08-programista-HD-1): pełny rachunek EV na 2000 ziarnach SC-22/25/29 (metoda HD: kombinacje z kartami martwymi,
// compareHands; EV(bet) − EV(check) w jednostkach puli P przy zakładzie k·P = k·(W − L) + Tf/2 + Lf, gdzie Lf, Tf to pasujące lepsze i remisujące; poprawka HE wymaga Lf = Tf = 0).
// Uruchomienie: cp docs/programista/narzedzia/he-rachunek.ts tools/content-build/.he-tmp/ && (cd tools/content-build && npx tsx .he-tmp/he-rachunek.ts)
import { join, resolve } from 'node:path';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compareHands, generateVariant, type GeneratorTemplate } from '@szkola/poker-core';
const root = resolve(import.meta.dirname, '../../..'); const R = '23456789TJQKA';
const all = loadScenarioTemplates(join(root, 'content/pl/scenarios')).map((x) => x.template);
function combos(cls: string, dead: Set<number>) { const a = R.indexOf(cls[0]), b = R.indexOf(cls[1]), out: number[][] = [];
  for (let s1 = 0; s1 < 4; s1++) for (let s2 = 0; s2 < 4; s2++) { const c1 = a * 4 + s1, c2 = b * 4 + s2;
    if (a === b ? s2 <= s1 : cls[2] === 's' ? s1 !== s2 : s1 === s2) continue; if (dead.has(c1) || dead.has(c2)) continue; out.push([c1, c2]); } return out; }
function split(hero: number[], board: number[], classes: string[]) { const dead = new Set([...hero, ...board]); let worse = 0, better = 0, ties = 0;
  for (const cl of classes) for (const v of combos(cl, dead)) { const c = compareHands([...v, ...board], [...hero, ...board]); if (c > 0) better++; else if (c < 0) worse++; else ties++; } return { worse, better, ties }; }
const K = [0.25, 0.5, 2 / 3, 1, 2];
let bledy = 0;
for (const id of ['sc-22', 'sc-25', 'sc-29']) {
  const t: any = all.find((x) => x.id === id)!; const d = t.decisions[0];
  const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  for (const level of t.levels) {
    const oczek = t.bounds[level].expected[0];
    let pasLepsza = 0, pasRemis = 0, zgodne = 0;
    for (let seed = 1; seed <= 2000; seed++) {
      const v: any = generateVariant(g, level, seed, { thresholds: { mixedMin: 0.035, mixedLow: 0.25 } } as any);
      const c = split(v.hero, v.board, d.calls), f = split(v.hero, v.board, d.folds);
      if (f.better > 0) pasLepsza++; if (f.ties > 0) pasRemis++;
      // pasujące: po czekaniu showdown, po zakładzie pas; lepsza pasująca daje +P na kombinację dla bet, remis +P/2
      const ev = (k: number) => k * (c.worse - c.better) + f.ties / 2 + f.better;
      const ok = K.every((k) => (oczek === 'bet' ? ev(k) > 0 : ev(k) < 0));
      if (ok) zgodne++;
    }
    const blad = pasLepsza + pasRemis > 0 || zgodne !== 2000; if (blad) bledy++;
    console.log(`${id}|${level} (oczekiwane ${oczek}): pasująca lepsza ${pasLepsza}/2000, pasująca remisuje ${pasRemis}/2000, werdykt zgodny z EV przy zakładzie k·pula dla k ∈ {${K.map((k) => k.toFixed(3)).join(', ')}}: ${zgodne}/2000`);
  }
}
console.log(bledy ? `BŁĘDY: ${bledy}` : 'OK');
process.exit(bledy ? 1 : 0);
