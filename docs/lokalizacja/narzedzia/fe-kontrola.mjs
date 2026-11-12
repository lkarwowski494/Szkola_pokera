// Kontrola mechaniczna kluczy FE (D-1313 + split-pot): znaczniki {{n:}} {{t:}} i cyfry = pl, brak angielskiego tekstu z łatki.
// Użycie: node docs/lokalizacja/narzedzia/fe-kontrola.mjs   Kod wyjścia: 0 zgodne, 1 różnice.
import { readFileSync } from 'node:fs';
const LANGS = ['de','es','fr','it','ja','ko','pt','pt-BR','vi','zh-Hant'];
const R = (l, f) => readFileSync(`content/${l}/${f}`, 'utf8');
const blok = (l) => { const t = R(l, 'lessons/m5-l4-bez-pozycji.md'); const i = t.indexOf('    id: m5.l4.c-oop'); return t.slice(i, t.indexOf('    count: 3', i)); };
const linie = (b) => b.split('\n').filter((x) => /^\s+(prompt|check|small|big): "/.test(x)).map((x) => x.replace(/^\s+/, ''));
const regula = (l, id, pole) => { const t = R(l, 'rules.yaml'); const a = t.indexOf(`- id: ${id}`); const seg = t.slice(a, t.indexOf('\n- id:', a + 5)); return seg.split('\n').find((x) => x.startsWith(`  ${pole}: `)).trim(); };
const tagi = (s) => [...s.matchAll(/\{\{([nt]):([^}|]+)/g)].map((m) => `${m[1]}:${m[2]}`).sort().join(',');
const cyfry = (s) => (s.replace(/\{\{[^}]*\}\}/g, '').replace(/https?:\/\/\S+/g, '').match(/\d+/g) || []).join(',');
// Wyjątek nazwany: w ja/ko/vi/zh-Hant najwyższa karta flopu to nazwa figury zapisana cyfrą ("9以下", jak notacja kart), pl/en piszą słownie (dziewiątka/nine).
const FIGURA = new Set(['ja', 'ko', 'vi', 'zh-Hant']);
let bledy = 0, ok = 0;
const porownaj = (l, nazwa, a, b, tolTag) => {
  const ta = tagi(a), tb = tagi(b), ca = cyfry(a), cb = cyfry(b);
  if (ta !== tb && !tolTag) { console.log(`RÓŻNICA ${l} ${nazwa}: znaczniki pl[${ta}] ≠ [${tb}]`); bledy++; }
  else if (ca !== cb && !(FIGURA.has(l) && ca === '' && cb === '9')) { console.log(`RÓŻNICA ${l} ${nazwa}: cyfry pl[${ca}] ≠ [${cb}]`); bledy++; }
  else ok++;
};
const plL = linie(blok('pl'));
for (const l of LANGS) {
  const L = linie(blok(l));
  if (L.length !== plL.length) { console.log(`BŁĄD ${l}: liczba linii ${L.length} ≠ ${plL.length}`); bledy++; continue; }
  plL.forEach((p, i) => porownaj(l, `drill[${i}]`, p, L[i], false));
  porownaj(l, 'R-M8-006 then', regula('pl', 'R-M8-006', 'then'), regula(l, 'R-M8-006', 'then'), false);
  porownaj(l, 'R-M5-012 source', regula('pl', 'R-M5-012', 'source'), regula(l, 'R-M5-012', 'source'), true);
  const ang = [...linie(blok(l)).join(' ').matchAll(/\b(You|Yes|Too often|Small|Big|solver doesn't)\b/g)];
  if (ang.length) { console.log(`ANGIELSKI ${l}: ${ang.map((m) => m[0]).join(',')}`); bledy++; }
  if (/training site, C-betting Out Of Position \(https:\/\/upswingpoker\.com\/podcast\/ep24-cbetting-oop\/, middle-position/.test(regula(l, 'R-M5-012', 'source'))) { console.log(`ANGIELSKI ${l}: etykieta źródła`); bledy++; }
}
console.log(`zgodne pary: ${ok}, różnice/błędy: ${bledy}`);
process.exitCode = bledy ? 1 : 0;
