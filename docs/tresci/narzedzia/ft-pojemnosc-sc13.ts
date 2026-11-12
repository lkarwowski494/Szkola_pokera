import { readFileSync } from 'node:fs'; import { parse } from 'yaml';
import { generateVariant, classifyFlop, MAX_CONSECUTIVE_REJECTIONS } from '../src/index';
const [plik, NS] = process.argv.slice(2); const N = Number(NS);
const y = parse(readFileSync(plik, 'utf8')); for (const b of Object.values<any>(y.bounds)) { b.reject ??= []; b.draws ??= []; }
const g = { id: y.id, stackBb: y.stackBb, positions: y.positions, levels: y.bounds, decisions: y.decisions } as any;
let ok = 0, bl: number[] = []; const r: Record<string, number> = {}; const t0 = Date.now();
for (let s = 1; s <= N; s++) { try { const v = generateVariant(g, 'latwy', s); ok++; const k = classifyFlop([...v.board].slice(0, 3)).ranks; r[k] = (r[k] ?? 0) + 1; } catch (e) { bl.push(s); } }
console.log(`${plik}: limit ${MAX_CONSECUTIVE_REJECTIONS}; ziarna 1–${N}: warianty ${ok}, błąd szablonu ${bl.length}${bl.length ? ' (ziarna ' + bl.slice(0, 10).join(', ') + ')' : ''}; flop ranks: ${JSON.stringify(r)}; czas ${((Date.now() - t0) / 1000).toFixed(0)} s`);
