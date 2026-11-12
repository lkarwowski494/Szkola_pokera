// Sesja FQ (rola 06): próbka generatora dla szkiców river-value / flop-size przed zapisaniem YAML. Nie jest testem; wynik do projektu list.
// Użycie: npx tsx docs/tresci/narzedzia/fq-symulacja.ts <plik.yaml> [poziom] [n]
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { generateVariant, cardToString, classifyHolding } from '../../../packages/poker-core/src';
const [plik, poziom = 'latwy', ile = '200'] = process.argv.slice(2);
const y = parse(readFileSync(plik!, 'utf8'));
const t = { ...y, levels: Object.fromEntries(Object.entries(y.bounds).map(([k, v]: [string, any]) => [k, { draws: [], reject: [], ...v }])) };
let ok = 0, bl = 0; const przyk: string[] = []; const ws: number[] = []; const rodz: Record<string, number> = {};
const t0 = Date.now();
for (let s = 1; s <= Number(ile); s++) {
  try {
    const v: any = generateVariant(t as any, poziom as any, s);
    ok++; const p = v.points[0];
    if (p.w !== undefined) ws.push(p.w);
    const pk = classifyHolding(v.hero, v.board).pairKind ?? 'brak'; rodz[pk] = (rodz[pk] ?? 0) + 1;
    if (przyk.length < 6) przyk.push(`${v.hero.map(cardToString).join('')} | ${v.board.map(cardToString).join(' ')} | ${JSON.stringify(p)}`);
  } catch (e) { bl++; if (bl < 3) console.log('błąd', String(e).slice(0, 200)); }
}
ws.sort((a, b) => a - b);
console.log(`${plik} ${poziom}: ${ok}/${Number(ile)} wariantów, ${Date.now() - t0} ms; w min ${ws[0]?.toFixed(3)} mediana ${ws[ws.length >> 1]?.toFixed(3)} max ${ws.at(-1)?.toFixed(3)}; pary ${JSON.stringify(rodz)}`);
for (const p of przyk) console.log('  ' + p);
