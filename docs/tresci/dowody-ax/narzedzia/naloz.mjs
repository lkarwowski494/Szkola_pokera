// Nałożenie propozycji przekładów po recenzji (AX, KO-027). Zmiana tylko w bloku drilla o danym id.
// Użycie: node naloz.mjs <katalog przekladow> <katalog content> [--sucho]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const [dir, content, flag] = process.argv.slice(2);
const sucho = flag === '--sucho';
const langs = ['en','de','es','fr','it','ja','ko','pt','pt-BR','vi','zh-Hant'];
const keys = (s, re) => [...s.matchAll(re)].map((m) => m[1]).sort().join(',');
const T = /\{\{t:([^}|]+)/g, N = /\{\{n:([^}]+)\}\}/g;
let bledy = 0; const raport = [];
for (const j of langs) {
  const prop = JSON.parse(readFileSync(join(dir, `${j}.json`), 'utf8'));
  const rf = join(dir, `recenzja-${j}.json`);
  if (!existsSync(rf)) { console.log(`BŁĄD ${j}: brak recenzji`); bledy++; continue; }
  const rec = JSON.parse(readFileSync(rf, 'utf8'));
  const klucz = (x) => `${x.id}|${x.pole}`;
  const wg = new Map(rec.map((r) => [klucz(r), r]));
  const zmiany = [...prop.map((p) => ({ ...p, r: wg.get(klucz(p)) })),
    ...rec.filter((r) => r.stare && !prop.some((p) => klucz(p) === klucz(r))).map((r) => ({ plik: r.plik, id: r.id, pole: r.pole, stare: r.stare, nowe: r.nowe_ostateczne ?? r.nowe, r }))];
  let n = { ok: 0, pop: 0, odrz: 0, brak: 0 };
  for (const z of zmiany) {
    const w = z.r?.werdykt ?? '';
    if (!z.r) { n.brak++; console.log(`BŁĄD ${j} ${klucz(z)}: brak werdyktu`); bledy++; continue; }
    if (/ODRZUC/i.test(w)) { n.odrz++; continue; }
    const nowe = /POPRAWK/i.test(w) ? z.r.nowe_ostateczne : (z.r.nowe_ostateczne ?? z.nowe);
    /POPRAWK/i.test(w) ? n.pop++ : n.ok++;
    const modul = z.id.split('.')[0];
    const f = z.plik?.startsWith('/') ? z.plik : join(content, j, 'exams', `${modul}.yaml`);
    let t = readFileSync(f, 'utf8');
    const s = t.indexOf(`id: ${z.id}\n`); if (s < 0) { console.log(`BŁĄD ${j} ${z.id}: brak bloku`); bledy++; continue; }
    let e = t.indexOf('\n  - kind:', s); if (e < 0) e = t.length;
    const blok = t.slice(s, e);
    const ile = blok.split(z.stare).length - 1;
    if (ile !== 1) { console.log(`BŁĄD ${j} ${klucz(z)}: „stare” ${ile}× w bloku`); bledy++; continue; }
    if (keys(nowe, N) !== keys(z.stare, N)) { console.log(`BŁĄD ${j} ${klucz(z)}: inne {{n:}}`); bledy++; continue; }
    if (/(^|[^\\])"/.test(nowe.replace(/^"|"$/g, '')) && nowe.includes('"') && !nowe.includes('\\"')) { console.log(`UWAGA ${j} ${klucz(z)}: cudzysłów w tekście`); }
    t = t.slice(0, s) + blok.replace(z.stare, nowe) + t.slice(e);
    if (!sucho) writeFileSync(f, t);
  }
  raport.push(`| ${j} | ${n.ok} | ${n.pop} | ${n.odrz} | ${n.brak} |`);
}
console.log('| język | przyjęte | po poprawce recenzenta | odrzucone | bez werdyktu |\n|---|---|---|---|---|\n' + raport.join('\n'));
console.log(`${bledy} błędów${sucho ? ' (na sucho)' : ''}`);
process.exitCode = bledy ? 1 : 0;
