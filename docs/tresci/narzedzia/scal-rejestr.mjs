// Rola 06: scalenie partii rejestru (docs/tresci/rejestr/*.json) w docs/tresci/rejestr.json, kontrola pokrycia i skrypt biblioteki.
// Użycie (z katalogu głównego repo): node docs/tresci/narzedzia/scal-rejestr.mjs [--przed-przegladem] [--przeglad zastępczy] [--sprawdz]
// --sprawdz (CI): nie zapisuje rejestr.json, tylko zgłasza błąd, gdy zapisany plik różni się od scalenia partii (strażnik content-build czyta ten plik).
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
const bezK = new Set(bez.map((b) => `n:${b.klucz}`));
// Liczba użyta w kilku modułach ma wpis w kilku partiach: jeden wpis, źródła połączone (bez źródeł bez adresu),
// status i werdykt najsurowszy, poprawki i uwagi połączone. Parametry produktowe (bez-twierdzen.json) wypadają z rejestru.
// Status najsurowszy wygrywa; „wycofane” surowsze niż „potwierdzone”, żeby scalenie nie przepuściło wycofanego wpisu.
const SUR = { potwierdzone: 0, robocze: 1, otwarte: 1, wycofane: 2, sprzeczne: 3 }, WER = { POPARTE: 0, CZĘŚCIOWO: 1, NIEPOPARTE: 2, SPRZECZNE: 3 };
const wgId = new Map();
for (const w of rejestr.splice(0)) {
  if (!(w.status in SUR)) bledy.push(`rejestr ${w.id} (${w.partia}): nieznany status „${w.status}”`);
  if (bezK.has(w.id)) continue;
  const zr = (w.zrodla ?? []).filter((z) => z.adres && [1, 2, 3, 4, 5].includes(z.szczebel));
  const a = wgId.get(w.id);
  if (!a) { wgId.set(w.id, { ...w, zrodla: zr, partia: [w.partia] }); continue; }
  const klucz = (z) => `${z.adres}|${z.cytat}`, znane = new Set(a.zrodla.map(klucz));
  a.zrodla.push(...zr.filter((z) => !znane.has(klucz(z))));
  if ((SUR[w.status] ?? 0) > (SUR[a.status] ?? 0)) a.status = w.status;
  if ((WER[w.werdykt_tekstu] ?? -1) > (WER[a.werdykt_tekstu] ?? -1)) a.werdykt_tekstu = w.werdykt_tekstu;
  a.krytyczne = a.krytyczne || w.krytyczne;
  a.poprawka = [a.poprawka, w.poprawka].filter(Boolean).join(' | ') || null;
  a.uwagi = [a.uwagi, w.uwagi].filter(Boolean).join(' | ');
  a.partia.push(w.partia);
}
rejestr.push(...wgId.values());
const ids = new Set(rejestr.map((w) => w.id));
const rules = YAML.parse(readFileSync('content/pl/rules.yaml', 'utf8')), nums = YAML.parse(readFileSync('content/numbers.yaml', 'utf8')), terms = YAML.parse(readFileSync('content/terms.yaml', 'utf8'));
// wpisy pomocy (content/helplines.yaml): pole claim każdego wpisu = id twierdzenia H-… w rejestrze, ze statusem „potwierdzone”
const pomoc = YAML.parse(readFileSync('content/helplines.yaml', 'utf8')).entries ?? [];
const claims = [...new Set(pomoc.map((e) => e.claim))];
for (const e of pomoc) if (!e.claim) bledy.push(`pokrycie: wpis pomocy ${e.id} bez pola claim`);
const wymagane = [...rules.map((r) => r.id), ...Object.keys(nums).map((k) => `n:${k}`), ...Object.keys(terms).map((k) => `t:${k}`), ...claims.filter(Boolean)];
const brak = wymagane.filter((id) => !ids.has(id) && !bezK.has(id));
for (const id of brak) bledy.push(`pokrycie: brak wpisu ${id}`);
const wgIdR = new Map(rejestr.map((w) => [w.id, w]));
for (const e of pomoc) if (e.claim && wgIdR.has(e.claim) && wgIdR.get(e.claim).status !== 'potwierdzone') bledy.push(`pomoc: wpis ${e.id} (${e.claim}) ma w rejestrze status „${wgIdR.get(e.claim).status}”`);
bledy.push(...sprawdzRejestr(rejestr, [], opcje, uwagi));
const ile = (f) => rejestr.reduce((m, w) => ((m[f(w)] = (m[f(w)] ?? 0) + 1), m), {});
const jedno = rejestr.filter((w) => w.status === 'potwierdzone' && (w.zrodla ?? []).length === 1 && w.zrodla[0].szczebel >= 3);
const scalony = JSON.stringify(rejestr, null, 1) + '\n';
if (argv.includes('--sprawdz')) {
  if (!existsSync('docs/tresci/rejestr.json') || readFileSync('docs/tresci/rejestr.json', 'utf8') !== scalony) bledy.push('docs/tresci/rejestr.json nieaktualny względem partii: uruchom node docs/tresci/narzedzia/scal-rejestr.mjs');
} else writeFileSync('docs/tresci/rejestr.json', scalony);
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
