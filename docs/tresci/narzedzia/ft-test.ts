// FT (06-tresci fix, 2026-11-12): test odtwarzający znaleziska FS 06-tresci-001…005 na szkicach FQ.
// Wiąże zdanie szkicu z licznikiem wariantów: zdanie jest dozwolone tylko wtedy, gdy jest prawdziwe w każdym wariancie.
// Rachunek W/L/T własnymi kombinacjami klas (jak docs/tresci/dowody/fs-niezalezny.ts.txt); z poker-core tylko generateVariant,
// strength, classifyFlop. Uruchomienie (z kopii w packages/poker-core/.ft-tmp/):
//   cd packages/poker-core && npx tsx .ft-tmp/ft-test.ts ../../docs/tresci/szablony-robocze/fq/pl ../../docs/tresci/liczby-river-catch-defend.md 1000
// Kod wyjścia: 0 = wszystkie ID zielone, 1 = co najmniej jedno czerwone.
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { generateVariant, strength, rankOf, suitOf, cardToString, classifyFlop } from '../src/index';

const [DIR, LICZBY, NS] = process.argv.slice(2);
const N = Number(NS ?? 1000);
const RANKS = '23456789TJQKA';
const card = (r: number, s: number) => r * 4 + s;
if (rankOf(card(12, 3)) !== 12 || suitOf(card(12, 3)) !== 3) throw new Error('kodowanie kart inne niż r*4+s');
function combos(hc: string): [number, number][] {
  const a = RANKS.indexOf(hc[0]), b = RANKS.indexOf(hc[1]); const out: [number, number][] = [];
  if (hc.length === 2) { for (let s = 0; s < 4; s++) for (let t = s + 1; t < 4; t++) out.push([card(a, s), card(a, t)]); }
  else if (hc[2] === 's') { for (let s = 0; s < 4; s++) out.push([card(a, s), card(b, s)]); }
  else { for (let s = 0; s < 4; s++) for (let t = 0; t < 4; t++) if (s !== t) out.push([card(a, s), card(b, t)]); }
  return out;
}
function split(hero: number[], board: number[], classes: string[]) {
  const dead = new Set([...hero, ...board]); const me = strength([...hero, ...board]); let w = 0, l = 0, t = 0;
  for (const hc of classes) for (const c of combos(hc)) { if (dead.has(c[0]) || dead.has(c[1])) continue; const v = strength([...c, ...board]); if (me < v) w++; else if (me > v) l++; else t++; }
  return { w, l, t };
}

// Zdania pod kontrolą: fraza (pl | en) → licznik, który musi być 0, gdy fraza jest w wyjaśnieniach szablonu.
type Licz = Record<string, number>;
const ZDANIA: { id: string; opis: string; frazy: RegExp; licznik: string }[] = [
  { id: '06-tresci-001', opis: '„ponad X rąk, które sprawdzą, to gorsze” (udział wśród WSZYSTKICH sprawdzających)', frazy: /ponad \{\{n:value\.threshold\}\} rąk|more than \{\{n:value\.threshold\}\} of the hands/, licznik: 'gorsze÷wszystkie≤50%' },
  { id: '06-tresci-001', opis: '„gorszych jest więcej niż lepszych” (W > L)', frazy: /gorszych od twojej jest więcej niż lepszych|more are worse than yours than better/, licznik: 'W≤L' },
  { id: '06-tresci-002', opis: '„pasujące i tak przegrałyby”', frazy: /i tak przegrałyby|would have lost to you/, licznik: 'pasujące: remis albo lepsza' },
  { id: '06-tresci-002', opis: '„po czekaniu wygrałbyś od nich tylko pulę”', frazy: /wygrałbyś od nich tylko|would also win only the/, licznik: 'pasujące: remis albo lepsza' },
  { id: '06-tresci-002', opis: '„pasujące i tak nie wygrałyby” (0 lepszych wśród pasujących)', frazy: /i tak nie wygrałyby|would not have beaten you/, licznik: 'pasujące: lepsza' },
  { id: '06-tresci-004', opis: '„potrzebuje więcej equity, niż ma” (equity do rivera > cena ⅔)', frazy: /więcej equity, niż ma|more equity than it has/, licznik: 'equity do rivera > cena ⅔' },
  { id: '06-tresci-004', opis: '„cena za następną kartę wyższa niż jego szansa na nią”', frazy: /cena za następną kartę jest wyższa niż jego szansa|price of the next card is higher than its chance/, licznik: 'szansa na 1 kartę ≥ cena ⅔' },
];

const wynik: { id: string; ok: boolean; linia: string }[] = [];
for (const f of ['sc-13', 'sc-22', 'sc-25', 'sc-28', 'sc-29']) {
  const y = parse(readFileSync(`${DIR}/${f}.yaml`, 'utf8'));
  const teksty = y.decisions.flatMap((d: any) => d.actions.map((a: any) => a.explanation)).join('\n');
  for (const b of Object.values<any>(y.bounds)) { b.reject ??= []; b.draws ??= []; }
  const g = { id: y.id, stackBb: y.stackBb, positions: y.positions, levels: y.bounds, decisions: y.decisions } as any;
  const c: Licz = {}; const pierwszy: Record<string, string> = {};
  const inc = (k: string, gdzie: string) => { c[k] = (c[k] ?? 0) + 1; pierwszy[k] ??= gdzie; };
  for (let seed = 1; seed <= N; seed++) {
    let v;
    try { v = generateVariant(g, 'latwy', seed); } catch (e) { inc('błąd szablonu (limit odrzuceń, 08-FQ-1)', `ziarno ${seed}: ${(e as Error).message}`); continue; }
    const p: any = v.points[0];
    const hero = [...v.hero], board = [...v.board];
    const gdzie = `ziarno ${seed}: gracz ${hero.map(cardToString).join('')} stół ${board.map(cardToString).join('')}`;
    inc('warianty', gdzie);
    if (p.point === 'flop-size') {
      const flop = board.slice(0, 3), vil = [...v.villain];
      const r = classifyFlop(flop).ranks; inc('flop ranks=' + r, gdzie);
      if (r === 'paired' || r === 'connected') inc('flop poza zakresem R-M5-008 (paired/connected)', gdzie);
      const known = new Set([...hero, ...vil, ...flop]); const rest = [...Array(52).keys()].filter((x) => !known.has(x));
      let win = 0, tie = 0, n = 0;
      for (let i = 0; i < rest.length; i++) for (let j = i + 1; j < rest.length; j++) { const bb = [...flop, rest[i], rest[j]]; const a = strength([...vil, ...bb]), h = strength([...hero, ...bb]); n++; if (a < h) win++; else if (a === h) tie++; }
      if ((win + tie / 2) / n > p.requiredBig) inc('equity do rivera > cena ⅔', gdzie);
      if (p.hit >= p.requiredBig) inc('szansa na 1 kartę ≥ cena ⅔', gdzie);
      continue;
    }
    const d = y.decisions[0]; const s = split(hero, board, d.calls), sf = split(hero, board, d.folds);
    if (s.w !== p.worse || s.l !== p.better || s.t !== p.ties) inc('ROZBIEŻNOŚĆ z generatorem', gdzie);
    if (s.w / (s.w + s.l + s.t) <= 0.5) inc('gorsze÷wszystkie≤50%', gdzie);
    if (s.w <= s.l) inc('W≤L', gdzie);
    if (sf.t > 0 || sf.l > 0) inc('pasujące: remis albo lepsza', gdzie);
    if (sf.l > 0) inc('pasujące: lepsza', gdzie);
  }
  console.log(`== ${f} (${N} ziaren): ` + Object.entries(c).map(([k, n]) => `${k}=${n}`).join('; '));
  if (c['ROZBIEŻNOŚĆ z generatorem']) wynik.push({ id: 'rachunek', ok: false, linia: `${f}: rozbieżność W/L/T z generatorem (${pierwszy['ROZBIEŻNOŚĆ z generatorem']})` });
  if (c['błąd szablonu (limit odrzuceń, 08-FQ-1)']) console.log(`  UWAGA ${f}: ${c['błąd szablonu (limit odrzuceń, 08-FQ-1)']} ziaren bez wariantu (pojemność, rola 08; nie wynik treści), pierwsze: ${pierwszy['błąd szablonu (limit odrzuceń, 08-FQ-1)']}`);
  if (f === 'sc-13') {
    const k = 'flop poza zakresem R-M5-008 (paired/connected)', n = c[k] ?? 0;
    wynik.push({ id: '06-tresci-003', ok: n === 0, linia: `${f}: ${k} = ${n}${n ? ` [pierwszy: ${pierwszy[k]}]` : ''}` });
  }
  for (const z of ZDANIA) {
    if (!z.frazy.test(teksty)) continue;
    const n = c[z.licznik] ?? 0;
    wynik.push({ id: z.id, ok: n === 0, linia: `${f}: zdanie ${z.opis} obecne; licznik „${z.licznik}” = ${n}${n ? ` [pierwszy: ${pierwszy[z.licznik]}]` : ''}` });
  }
}
// 06-tresci-005: zdanie „Liczby” defend — MDF bez zastrzeżenia flopu (grep jak docs/tresci/dowody/fs-005-test.txt)
const liczby = readFileSync(LICZBY, 'utf8').split('\n');
const defend = liczby.filter((l) => /\{\{t:mdf\}\} (to|is) \{\{obrona\}\}/.test(l));
const stare = liczby.filter((l) => /bronisz w teorii|you defend in theory/.test(l)).length;
const flop = defend.filter((l) => /na flopie możesz bronić trochę mniej|on the flop you can defend a little less/.test(l)).length;
wynik.push({ id: '06-tresci-005', ok: stare === 0 && defend.length === 2 && flop === 2, linia: `liczby: zdania „w teorii bronisz” = ${stare}; zdania MDF defend = ${defend.length}, z zastrzeżeniem flopu = ${flop}` });

for (const w of wynik) console.log(`${w.ok ? 'ZIELONY' : 'CZERWONY'} ${w.id} — ${w.linia}`);
const czerwone = [...new Set(wynik.filter((w) => !w.ok).map((w) => w.id))];
console.log(czerwone.length ? `CZERWONE: ${czerwone.join(', ')}` : 'wszystkie zielone');
process.exitCode = czerwone.length ? 1 : 0;
