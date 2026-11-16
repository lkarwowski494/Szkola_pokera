// HZ (06; kopia narzędzia HN): kontrola przekładów względem pl — 7 szablonów HZ (SC-09/16/18/21/26/27/30), od sesji ID (D-1860) w content/<j>/scenarios/
// i 5 szablonów content/<j>/scenarios/ zmienionych uwagami HY (SC-07/15/17/24/31): struktura bez tekstu, znaczniki {{w:}} {{n:}} (multizbiór), klucze {{t:}} (zbiór),
// kody rąk w situation, brak cyfr poza znacznikami i kodami rąk, długość ważona tytułu ≤ 68 (D-1730; tytuł = pierwsze zdanie situation, CJK/Hangul/pełna szerokość = 2),
// a dla SC-07/15/17/24/31: zmienione są dokładnie te teksty, które zmieniły się w pl względem HEAD (git show HEAD:…).
// Użycie (z katalogu repo): node docs/tresci/narzedzia/hz-kontrola-przekladow.mjs [de,fr,…] ; kod 0 = brak błędów.
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const YAML = createRequire(new URL('../../../tools/content-build/package.json', import.meta.url))('yaml');
const HZ = ['sc-09', 'sc-16', 'sc-18', 'sc-21', 'sc-26', 'sc-27', 'sc-30'];
const HY = ['sc-07', 'sc-15', 'sc-17', 'sc-24', 'sc-31'];
const KAT = 'content'; // ID (D-1860): szablony przeniesione z docs/tresci/szablony-robocze/hz/<j>/
const wszystkie = readdirSync('content', { withFileTypes: true }).filter((d) => d.isDirectory() && !['pl', 'en', 'ranges'].includes(d.name)).map((d) => d.name);
const jezyki = process.argv[2] ? process.argv[2].split(',') : ['en', ...wszystkie];
const teksty = (t) => [t.situation, ...t.decisions.flatMap((d) => d.actions.map((a) => a.explanation))];
const bez = (t) => JSON.stringify({ ...t, situation: '', decisions: t.decisions.map((d) => ({ ...d, actions: d.actions.map((a) => ({ ...a, explanation: '' })) })) });
const multi = (s, re) => [...s.matchAll(re)].map((m) => m[0]).sort().join(' ');
const tk = (s) => [...new Set([...s.matchAll(/\{\{t:([a-z0-9-]+)/g)].map((m) => m[1]))].sort().join(' ');
const RECE = /(?<![A-Za-z])(?:[AKQJT2-9]{2})(?![A-Za-z])/g;
const SZER = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}　-〿＀-￯]/u;
const waga = (s) => Array.from(s).reduce((n, c) => n + (SZER.test(c) ? 2 : 1), 0);
// tytuł: ta sama funkcja co w aplikacji (podzielSytuacje z apps/mobile/src/features/scenariusz/zdanie.ts, import .ts przez node z usuwaniem typów) po wyrenderowaniu znaczników
const nazwy = (j) => { try { return YAML.parse(readFileSync(`content/${j}/terms-nazwy.yaml`, 'utf8')) ?? {}; } catch { return {}; } };
const render = (s, n) => s.replace(/\{\{t:([a-z0-9-]+)\|([^}]+)\}\}/g, '$2').replace(/\{\{t:([a-z0-9-]+)\}\}/g, (_m, k) => n[k] ?? k.replace(/-/g, ' ')).replace(/\{\{[nw]:[^}]+\}\}/g, 'X');
const { podzielSytuacje } = await import(new URL('../../../apps/mobile/src/features/scenariusz/zdanie.ts', import.meta.url).href);
const tytul = (s) => podzielSytuacje(s).tytul.trim();
let bledy = 0, ok = 0;
const sprawdz = (id, pl, plik, j, zmienione) => {
  const e = [];
  let t; try { t = YAML.parse(readFileSync(plik, 'utf8')); } catch (x) { console.log(`BŁĄD ${plik}: ${x.message}`); bledy++; return; }
  if (bez(t) !== bez(pl)) e.push('struktura różna od pl');
  const tp = teksty(pl), tt = teksty(t);
  tp.forEach((s, i) => {
    const u = tt[i] ?? '';
    if (multi(u, /\{\{[wn]:[^}]+\}\}/g) !== multi(s, /\{\{[wn]:[^}]+\}\}/g)) e.push(`tekst ${i}: znaczniki w/n`);
    if (tk(u) !== tk(s)) e.push(`tekst ${i}: klucze t (${tk(u)} ≠ ${tk(s)})`);
    if (/\d/.test(u.replace(/\{\{[^}]*\}\}/g, '').replace(RECE, ''))) e.push(`tekst ${i}: cyfra poza znacznikiem`);
  });
  if (multi(t.situation.replace(/\{\{[^}]*\}\}/g, ''), RECE) !== multi(pl.situation.replace(/\{\{[^}]*\}\}/g, ''), RECE)) e.push('kody rąk w situation');
  const ty = tytul(render(t.situation, nazwy(j)));
  let stary = null;
  if (zmienione) { try { stary = teksty(YAML.parse(execFileSync('git', ['show', `HEAD:${plik}`], { encoding: 'utf8' }))); } catch { stary = null; } }
  // tytuł: szablony hz zawsze; szablony HY tylko, gdy pierwsze zdanie situation zmieniło się względem HEAD (tytuły sprzed HZ to nie zakres tej sesji)
  if (waga(ty) > 68 && (!stary || tytul(render(stary[0], nazwy(j))) !== ty)) e.push(`tytuł ${waga(ty)} > 68: „${ty}”`);
  if (zmienione) {
    if (stary) {
      const zm = tt.map((u, i) => u !== stary[i]).map((b, i) => (b ? i : -1)).filter((i) => i >= 0).join(',');
      if (zm !== zmienione) e.push(`zmienione teksty [${zm}] ≠ zmienione w pl [${zmienione}]`);
    }
  }
  if (e.length) { bledy++; console.log(`BŁĄD ${plik}: ${e.join('; ')}`); } else ok++;
};
for (const id of HZ) {
  const pl = YAML.parse(readFileSync(`${KAT}/pl/scenarios/${id}.yaml`, 'utf8'));
  for (const j of jezyki) sprawdz(id, pl, `${KAT}/${j}/scenarios/${id}.yaml`, j, null);
}
for (const id of HY) {
  const p = `content/pl/scenarios/${id}.yaml`;
  const pl = YAML.parse(readFileSync(p, 'utf8'));
  const plStary = teksty(YAML.parse(execFileSync('git', ['show', `HEAD:${p}`], { encoding: 'utf8' })));
  const zmienione = teksty(pl).map((u, i) => (u !== plStary[i] ? i : -1)).filter((i) => i >= 0).join(',');
  for (const j of jezyki) sprawdz(id, pl, `content/${j}/scenarios/${id}.yaml`, j, zmienione);
}
console.log(`${ok} plików OK, ${bledy} z błędami (${jezyki.length} języków: ${jezyki.join(', ')}; ${HZ.length} szablonów hz + ${HY.length} HY)`);
process.exit(bledy ? 1 : 0);
