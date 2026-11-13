// HD (06, audit): niezależna kontrola mechaniczna przekładów SC-13/22/25/28/29 względem pl (bez oceny językowej, ta należy do roli 09).
// Sprawdza: dane bez tekstu identyczne z pl; w każdym tekście ten sam multizbiór {{n:…}}, {{w:…}} i kluczy {{t:klucz…}} co w en i pl;
// (klucze t jako zbiór: równe en albo pl; liczba powtórzeń znacznika może się różnić) kody rąk (AK, QJ, JJ…) te same; brak cyfr poza znacznikami i kodami rąk; klucze t istnieją w content/terms.yaml.
// Użycie (z katalogu repo): node docs/tresci/narzedzia/hd-kontrola-przekladow.mjs ; kod 0 = brak błędów.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../../../tools/content-build/package.json', import.meta.url));
const YAML = require('yaml');
const JEZ = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'pt-BR', 'vi', 'zh-Hant'];
const SZ = ['sc-13', 'sc-22', 'sc-25', 'sc-28', 'sc-29'];
const terms = YAML.parse(readFileSync('content/terms.yaml', 'utf8'));
const znaneT = new Set(Array.isArray(terms) ? terms.map((x) => x.id ?? x.key) : Object.keys(terms.terms ?? terms));
const wczytaj = (j, s) => YAML.parse(readFileSync(`content/${j}/scenarios/${s}.yaml`, 'utf8'));
const teksty = (o) => [['situation', o.situation], ...o.decisions.flatMap((d, i) => d.actions.map((a) => [`d${i}.${a.action}`, a.explanation]))];
const bezTekstu = (o) => JSON.stringify({ ...o, situation: null, decisions: o.decisions.map((d) => ({ ...d, actions: d.actions.map((a) => ({ ...a, explanation: null })) })) });
const ms = (arr) => arr.slice().sort().join(' ');
const sygn = (t) => ({
  n: ms([...t.matchAll(/\{\{n:([^}]+)\}\}/g)].map((m) => m[1])),
  w: ms([...t.matchAll(/\{\{w:([^}]+)\}\}/g)].map((m) => m[1])),
  t: ms([...t.matchAll(/\{\{t:([^}|]+)/g)].map((m) => m[1])),
  rece: ms([...t.replace(/\{\{[^}]*\}\}/g, ' ').matchAll(/(?<![A-Za-z])([AKQJT2-9]{2})(?![A-Za-z0-9])/g)].map((m) => m[1]).filter((x) => /[AKQJT]/.test(x))),
});
let bledy = 0, uwagi = 0; const wynik = [];
for (const s of SZ) {
  const pl = wczytaj('pl', s), en = wczytaj('en', s), plT = Object.fromEntries(teksty(pl)), enT = Object.fromEntries(teksty(en));
  for (const j of ['en', ...JEZ]) {
    const o = wczytaj(j, s);
    if (bezTekstu(o) !== bezTekstu(pl)) { bledy++; wynik.push(`BŁĄD ${j}/${s}: dane bez tekstu różne od pl`); }
    for (const [k, t] of teksty(o)) {
      const a = sygn(t), p = sygn(plT[k] ?? ''), e = sygn(enT[k] ?? '');
      for (const pole of ['n', 'w', 'rece']) if (a[pole] !== p[pole]) { bledy++; wynik.push(`BŁĄD ${j}/${s} ${k}: ${pole} „${a[pole]}” ≠ pl „${p[pole]}”`); }
      const u = (x) => [...new Set(x.split(" "))].sort().join(" "); if (u(a.t) !== u(e.t) && u(a.t) !== u(p.t)) { uwagi++; wynik.push(`UWAGA ${j}/${s} ${k}: klucze t „${a.t}” ≠ en „${e.t}”`); }
      for (const tk of a.t.split(' ').filter(Boolean)) if (znaneT.size && !znaneT.has(tk)) { bledy++; wynik.push(`BŁĄD ${j}/${s} ${k}: nieznany termin ${tk}`); }
      const cyfry = t.replace(/\{\{[^}]*\}\}/g, ' ').replace(/(?<![A-Za-z])[AKQJT2-9]{2}[so]?(?![A-Za-z0-9])/g, ' ').match(/[0-9０-９]/g);
      if (cyfry) { bledy++; wynik.push(`BŁĄD ${j}/${s} ${k}: cyfry poza znacznikami: ${cyfry.join('')}`); }
    }
  }
}
console.log(wynik.join('\n'));
console.log(`terminy znane: ${znaneT.size}; ${SZ.length} szablonów × 11 języków; błędy: ${bledy}, uwagi: ${uwagi}`);
process.exit(bledy ? 1 : 0);
