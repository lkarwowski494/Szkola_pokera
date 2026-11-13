// HD (06, audit): niezależny rachunek zdań SC-13/22/25/28/29; własne rozwinięcie klas rąk i liczenie (nie classComboSplit ani flopSizeAnalysis).
import { join, resolve } from 'node:path';
import { loadScenarioTemplates } from '../src/scenariusze';
import { compareHands, generateVariant, type GeneratorTemplate } from '@szkola/poker-core';
const root = resolve(import.meta.dirname, '../../..');
const R = '23456789TJQKA';
const all = loadScenarioTemplates(join(root, 'content/pl/scenarios')).map((x) => x.template);
const N = 2000;
function combos(cls: string, dead: Set<number>): [number, number][] {
  const a = R.indexOf(cls[0]), b = R.indexOf(cls[1]), out: [number, number][] = [];
  for (let s1 = 0; s1 < 4; s1++) for (let s2 = 0; s2 < 4; s2++) {
    const c1 = a * 4 + s1, c2 = b * 4 + s2;
    if (a === b ? s2 <= s1 : cls[2] === 's' ? s1 !== s2 : cls[2] === 'o' ? s1 === s2 : false) continue;
    if (dead.has(c1) || dead.has(c2)) continue; out.push([c1, c2]);
  }
  return out;
}
function split(hero: number[], board: number[], classes: string[]) {
  const dead = new Set([...hero, ...board]); let worse = 0, better = 0, ties = 0;
  for (const cl of classes) for (const v of combos(cl, dead)) { const c = compareHands([...v, ...board], [...hero, ...board]); if (c > 0) better++; else if (c < 0) worse++; else ties++; }
  return { worse, better, ties };
}
let bledy = 0;
for (const id of ['sc-13', 'sc-22', 'sc-25', 'sc-28', 'sc-29']) {
  const t: any = all.find((x) => x.id === id)!;
  const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  const st: Record<string, number> = {}; const inc = (k: string) => (st[k] = (st[k] ?? 0) + 1);
  let wMin = 1, wMax = 0, tiesMax = 0;
  for (let seed = 1; seed <= N; seed++) {
    const v: any = generateVariant(g, 'latwy', seed, { thresholds: { mixedMin: 0.035, mixedLow: 0.25 } } as any);
    const d = t.decisions[0];
    if (id === 'sc-13') {
      const flop = v.board.slice(0, 3), znane = new Set([...v.hero, ...v.villain, ...flop]); let n = 0;
      for (let c = 0; c < 52; c++) if (!znane.has(c) && compareHands([...v.villain, ...flop, c], [...v.hero, ...flop, c]) >= 0) n++;
      inc(`N=${n}`);
      const p = v.points[0]; inc(`pot=${p.pot}`);
      if (!(n / 47 > 0.25 / 1.5)) { bledy++; inc('BŁĄD: e47 <= cena małego'); }
      if (!(n / 45 < 2 / 7)) { bledy++; inc('BŁĄD: e45 >= cena dużego'); }
      const kol = [0, 1, 2, 3].map((s) => flop.filter((c: number) => (c & 3) === s).length); if (Math.max(...kol) !== 2) { bledy++; inc('BŁĄD: flop nie two-tone'); }
      const rk = flop.map((c: number) => c >> 2); if (new Set(rk).size < 3) { bledy++; inc('BŁĄD: flop sparowany'); }
      continue;
    }
    const s = split(v.hero, v.board, d.calls), f = split(v.hero, v.board, d.folds);
    const w = s.worse / (s.worse + s.better); wMin = Math.min(wMin, w); wMax = Math.max(wMax, w); tiesMax = Math.max(tiesMax, s.ties / (s.worse + s.better + s.ties));
    if (f.better > 0) { bledy++; inc('BŁĄD: pasująca lepsza'); }
    if (f.ties > 0) inc('pasująca remisuje');
    if (id === 'sc-25') {
      if (!(s.better > s.worse)) { bledy++; inc('BŁĄD: lepszych nie więcej niż gorszych'); }
      if (!(s.better > (s.worse + s.ties))) inc('UWAGA: lepsze nie są większością wszystkich sprawdzających (remisy)');
      if (s.worse === 0) inc('gorszych sprawdzających 0');
    } else {
      if (!(s.worse > s.better)) { bledy++; inc('BŁĄD: gorszych nie więcej niż lepszych'); }
      if (s.better === 0) inc('lepszych sprawdzających 0');
    }
    if (s.ties > 0) inc('remisy wśród sprawdzających > 0');
  }
  console.log(id, JSON.stringify(st), id === 'sc-13' ? '' : `w∈[${wMin.toFixed(3)}; ${wMax.toFixed(3)}], max udział remisów ${tiesMax.toFixed(3)}`);
}
console.log(`błędy: ${bledy}`); process.exit(bledy ? 1 : 0);
