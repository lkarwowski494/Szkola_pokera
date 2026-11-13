// HD (06, audit): SC-13 — czy flop wariantu pozwala już na strita (trzy różne rangi w oknie 5 kolejnych, z asem także jako 1); zakres R-M5-008 / FT 06-tresci-003.
// Użycie: cp do tools/content-build/.hd-tmp/ i (cd tools/content-build && npx tsx .hd-tmp/hd-sc13-strit.ts)
import { join, resolve } from 'node:path';
import { loadScenarioTemplates } from '../src/scenariusze';
import { generateVariant, type GeneratorTemplate } from '@szkola/poker-core';
const root = resolve(import.meta.dirname, '../../..');
const t: any = loadScenarioTemplates(join(root, 'content/pl/scenarios')).map((x) => x.template).find((x) => x.id === 'sc-13')!;
const g = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
let strit = 0;
for (let seed = 1; seed <= 2000; seed++) {
  const v: any = generateVariant(g, 'latwy', seed, { thresholds: { mixedMin: 0.035, mixedLow: 0.25 } } as any);
  const r = v.board.slice(0, 3).map((c: number) => (c >> 2) + 2); // 2..14
  const rr = [...new Set([...r, ...(r.includes(14) ? [1] : [])])];
  const mozliwy = [...Array(10)].some((_, i) => { const lo = i + 1; return r.every((x: number) => (x >= lo && x <= lo + 4) || (x === 14 && lo === 1)); });
  if (mozliwy) { strit++; if (strit <= 3) console.log(`strit możliwy: ziarno ${seed}, rangi ${r}`); }
  void rr;
}
console.log(`SC-13: flopy z możliwym stritem ${strit}/2000`); process.exit(strit ? 1 : 0);
