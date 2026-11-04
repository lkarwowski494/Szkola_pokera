// Rola 06: scalenie partii rejestru (docs/tresci/rejestr/*.json) w docs/tresci/rejestr.json, kontrola pokrycia i skrypt biblioteki.
// Użycie (z katalogu głównego repo): node docs/tresci/narzedzia/scal-rejestr.mjs [--przed-przegladem] [--przeglad zastępczy]
// Kod wyjścia: 0 bez błędów, 1 błędy. Pokrycie: każda reguła (rules.yaml), liczba (numbers.yaml), termin (terms.yaml)
// i wpis pomocy ma wpis w rejestrze albo w bez-twierdzen.json. Dlaczego: D-141 (rejestr nad istniejącym systemem treści).
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { sprawdzRejestr } from './kontrole-tresci.mjs';
const require = createRequire(new URL('../../../tools/content-build/package.json', import.meta.url));
const YAML = require('yaml');
const argv = process.argv.slice(2);
const opcje = { przedPrzegladem: argv.includes('--przed-przegladem'), przeglad: argv.includes('--przeglad') ? argv[argv.indexOf('--przeglad') + 1] : undefined };
const kat = 'docs/tresci/rejestr';
const rejestr = [], bledy = [], uwagi = [];
for (const f of readdirSync(kat).filter((f) => f.endsWith('.json') && f !== 'bez-twierdzen.json').sort()) {
  const t = JSON.parse(readFileSync(`${kat}/${f}`, 'utf8'));
  for (const w of t) rejestr.push({ ...w, partia: f.replace('.json', '') });
}
const bez = existsSync(`${kat}/bez-twierdzen.json`) ? JSON.parse(readFileSync(`${kat}/bez-twierdzen.json`, 'utf8')) : [];
const ids = new Set(rejestr.map((w) => w.id)), bezK = new Set(bez.map((b) => `n:${b.klucz}`));
const rules = YAML.parse(readFileSync('content/pl/rules.yaml', 'utf8')), nums = YAML.parse(readFileSync('content/numbers.yaml', 'utf8')), terms = YAML.parse(readFileSync('content/terms.yaml', 'utf8'));
const wymagane = [...rules.map((r) => r.id), ...Object.keys(nums).map((k) => `n:${k}`), ...Object.keys(terms).map((k) => `t:${k}`)];
const brak = wymagane.filter((id) => !ids.has(id) && !bezK.has(id));
for (const id of brak) bledy.push(`pokrycie: brak wpisu ${id}`);
bledy.push(...sprawdzRejestr(rejestr, [], opcje, uwagi));
const ile = (f) => rejestr.reduce((m, w) => ((m[f(w)] = (m[f(w)] ?? 0) + 1), m), {});
const jedno = rejestr.filter((w) => w.status === 'potwierdzone' && (w.zrodla ?? []).length === 1 && w.zrodla[0].szczebel >= 3);
writeFileSync('docs/tresci/rejestr.json', JSON.stringify(rejestr, null, 1) + '\n');
console.log(`wpisy: ${rejestr.length}, bez twierdzeń: ${bez.length}, wymagane: ${wymagane.length}, brak pokrycia: ${brak.length}`);
console.log('status:', JSON.stringify(ile((w) => w.status)));
console.log('najwyższy szczebel:', JSON.stringify(ile((w) => (w.zrodla?.length ? Math.min(...w.zrodla.map((z) => z.szczebel)) : '-'))));
console.log('werdykt tekstu:', JSON.stringify(ile((w) => w.werdykt_tekstu ?? '-')));
console.log(`jedno źródło szczebla 3–4: ${jedno.length}${jedno.length ? ' (' + jedno.map((w) => w.id).join(', ') + ')' : ''}`);
console.log(`krytyczne: ${rejestr.filter((w) => w.krytyczne).length}`);
for (const b of bledy.slice(0, 60)) console.log(`BŁĄD ${b}`);
if (bledy.length > 60) console.log(`… i ${bledy.length - 60} kolejnych`);
for (const u of uwagi) console.log(`UWAGA ${u}`);
console.log(`${bledy.length} błędów, ${uwagi.length} uwag`);
process.exitCode = bledy.length ? 1 : 0;
