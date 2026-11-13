// HA (06): kontrola przekładów SC-13/22/25/28/29 względem pl — struktura bez tekstu, znaczniki {{w:}} {{n:}} (multizbiór), klucze {{t:}} (zbiór),
// kody rąk w situation (kolejność), brak cyfr poza znacznikami i kodami rąk. Użycie (z katalogu repo): node docs/tresci/narzedzia/ha-kontrola-przekladow.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
const YAML = createRequire(new URL('../../../tools/content-build/package.json', import.meta.url))('yaml');
const ID = ['sc-13', 'sc-22', 'sc-25', 'sc-28', 'sc-29'];
const jezyki = readdirSync('content', { withFileTypes: true }).filter((d) => d.isDirectory() && !['pl', 'ranges'].includes(d.name)).map((d) => d.name);
const teksty = (t) => [t.situation, ...t.decisions.flatMap((d) => d.actions.map((a) => a.explanation))];
const bez = (t) => JSON.stringify({ ...t, situation: '', decisions: t.decisions.map((d) => ({ ...d, actions: d.actions.map((a) => ({ ...a, explanation: '' })) })) });
const multi = (s, re) => [...s.matchAll(re)].map((m) => m[0]).sort().join(' ');
const tk = (s) => [...new Set([...s.matchAll(/\{\{t:([a-z0-9-]+)/g)].map((m) => m[1]))].sort().join(' ');
const RECE = /(?<![A-Za-z])(?:[AKQJT2-9]{2})(?![A-Za-z])/g;
let bledy = 0, ok = 0;
for (const id of ID) {
  const pl = YAML.parse(readFileSync(`content/pl/scenarios/${id}.yaml`, 'utf8'));
  for (const j of jezyki) {
    const p = `content/${j}/scenarios/${id}.yaml`; const e = [];
    let t; try { t = YAML.parse(readFileSync(p, 'utf8')); } catch (x) { console.log(`BŁĄD ${p}: ${x.message}`); bledy++; continue; }
    if (bez(t) !== bez(pl)) e.push('struktura różna od pl');
    const tp = teksty(pl), tt = teksty(t);
    tp.forEach((s, i) => {
      const u = tt[i] ?? '';
      if (multi(u, /\{\{[wn]:[^}]+\}\}/g) !== multi(s, /\{\{[wn]:[^}]+\}\}/g)) e.push(`tekst ${i}: znaczniki w/n`);
      if (tk(u) !== tk(s)) e.push(`tekst ${i}: klucze t (${tk(u)} ≠ ${tk(s)})`);
      if (/\d/.test(u.replace(/\{\{[^}]*\}\}/g, '').replace(RECE, ''))) e.push(`tekst ${i}: cyfra poza znacznikiem`);
    });
    if (multi(t.situation.replace(/\{\{[^}]*\}\}/g, ''), RECE) !== multi(pl.situation.replace(/\{\{[^}]*\}\}/g, ''), RECE)) e.push('kody rąk w situation');
    if (e.length) { bledy++; console.log(`BŁĄD ${p}: ${e.join('; ')}`); } else ok++;
  }
}
console.log(`${ok} plików OK, ${bledy} z błędami (${jezyki.length} języków × ${ID.length} szablonów)`);
process.exit(bledy ? 1 : 0);
