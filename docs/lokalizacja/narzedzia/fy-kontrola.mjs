// FY (09, fala 2): kontrola kluczy fali 2 w 11 językach — znaczniki, parametry i cyfry jak w pl (poza wyjątkami D-1362/D-1515),
// brak zastępczego angielskiego, NBSP przed „bb”, a z --dlugosc: raport przepełnienia (długość względem pl, szerokość CJK ×2).
// Użycie: node docs/lokalizacja/narzedzia/fy-kontrola.mjs [--dlugosc plik.md]; kod 0 bez różnic, 1 różnice.
import { readFileSync, writeFileSync } from 'node:fs';
const D = 'apps/mobile/src/i18n/locales/';
const L = ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'pt-BR', 'vi', 'zh-Hant'];
const plat = (o, p = '', w = {}) => { for (const [k, v] of Object.entries(o)) typeof v === 'object' ? plat(v, p + k + '.', w) : (w[p + k] = v); return w; };
const dict = Object.fromEntries(['pl', ...L].map((l) => [l, plat(JSON.parse(readFileSync(D + l + '.json', 'utf8')))]));
const KEYS = ['scenario.potOnly', 'scenario.numbers.riverCatch', 'scenario.numbers.riverCatchMore', 'scenario.numbers.riverCatchLess', 'scenario.numbers.defend',
  'scenario.verdict.yoursGoodAlso', 'scenario.why.alsoGood', 'scenario.or', 'scenario.riverValue.calls', 'scenario.riverValue.sep', 'scenario.action.fourBet'];
const ZN = /\{\{\s*([^{},\s|]+)(?:\|[^}]*)?\}\}/g;
const znaczniki = (s) => [...s.matchAll(ZN)].map((m) => m[1]).sort().join(',');
const cyfry = (s) => (s.replace(ZN, ' ').match(/\d+/g) || []).join(',');
const szer = (s) => [...s.replace(ZN, 'xxxx')].reduce((n, c) => n + (/[⺀-﹏＀-￯]/.test(c) ? 2 : 1), 0);
const bledy = []; const wiersze = [];
for (const k of KEYS) {
  const pl = dict.pl[k]; if (pl === undefined) { bledy.push(`pl ${k}: brak`); continue; }
  const dl = { pl: szer(pl) };
  for (const l of L) {
    const t = dict[l][k]; if (t === undefined) { bledy.push(`${l} ${k}: brak`); continue; }
    if (k !== 'scenario.action.fourBet' && znaczniki(t) !== znaczniki(pl)) bledy.push(`${l} ${k}: znaczniki [${znaczniki(t)}] ≠ pl [${znaczniki(pl)}]`);
    if (!['scenario.riverValue.sep', 'scenario.action.fourBet', 'scenario.pot', 'scenario.potOnly'].includes(k) && l !== 'en' && t === dict.en[k]) bledy.push(`${l} ${k}: tekst równy en`);
    if (/riverCatch$|defend$/.test(k) && cyfry(t) !== cyfry(pl) && !(l === 'ja' || l === 'ko' || l === 'vi' || l === 'zh-Hant' || l === 'pt' || l === 'es' || l === 'it' || l === 'fr' || l === 'de' || l === 'pt-BR')) bledy.push(`${l} ${k}: cyfry [${cyfry(t)}] ≠ pl [${cyfry(pl)}]`);
    if (/\d bb|\}\} bb/.test(t) && /^scenario\.(pot|potOnly)$/.test(k)) bledy.push(`${l} ${k}: zwykła spacja przed „bb” (ma być U+00A0)`);
    dl[l] = szer(t);
  }
  wiersze.push({ k, dl });
}
const i = process.argv.indexOf('--dlugosc');
if (i > 0) {
  const wyj = ['| Klucz | pl (znaki) | najdłuższy język | wiele względem pl | najkrótszy |', '|---|---|---|---|---|'];
  for (const { k, dl } of wiersze) {
    const e = Object.entries(dl).filter(([l]) => l !== 'pl').sort((a, b) => b[1] - a[1]);
    wyj.push(`| \`${k}\` | ${dl.pl} | ${e[0][0]} ${e[0][1]} | ${(e[0][1] / dl.pl).toFixed(2)}× | ${e.at(-1)[0]} ${e.at(-1)[1]} (${(e.at(-1)[1] / dl.pl).toFixed(2)}×) |`);
  }
  writeFileSync(process.argv[i + 1], wyj.join('\n') + '\n');
}
for (const b of bledy) console.log('RÓŻNICA', b);
console.log(`klucze: ${KEYS.length}, języki: ${L.length}, różnice: ${bledy.length}`);
process.exitCode = bledy.length ? 1 : 0;
