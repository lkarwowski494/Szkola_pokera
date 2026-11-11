// Rola 06: scalenie partii rejestru (docs/tresci/rejestr/*.json) w docs/tresci/rejestr.json, kontrola pokrycia i skrypt biblioteki.
// Użycie (z katalogu głównego repo): node docs/tresci/narzedzia/scal-rejestr.mjs [--przed-przegladem] [--przeglad zastępczy] [--sprawdz] [--skroty]
// --sprawdz (CI): nie zapisuje rejestr.json, tylko zgłasza błąd, gdy zapisany plik różni się od scalenia partii (strażnik content-build czyta ten plik).
// Kod wyjścia: 0 bez błędów, 1 błędy. Pokrycie: każda reguła (rules.yaml), liczba (numbers.yaml), termin (terms.yaml)
// i wpis pomocy ma wpis w rejestrze albo w bez-twierdzen.json. Dlaczego: D-141 (rejestr nad istniejącym systemem treści).
import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { sprawdzRejestr, skrot } from './kontrole-tresci.mjs';
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
const pomocPlik = YAML.parse(readFileSync('content/helplines.yaml', 'utf8'));
const pomoc = pomocPlik.entries ?? [];
// fallback.claim (D-158): zdanie ogólne bez numeru ma własne twierdzenie; jak wpis pomocy liczy się do pokrycia i statusu
const pomocFallback = pomocPlik.fallback?.claim ? [{ id: 'fallback', claim: pomocPlik.fallback.claim, ...pomocPlik.fallback }] : [];
const claims = [...new Set([...pomoc, ...pomocFallback].map((e) => e.claim))];
for (const e of pomoc) if (!e.claim) bledy.push(`pokrycie: wpis pomocy ${e.id} bez pola claim`);
const wymagane = [...rules.map((r) => r.id), ...Object.keys(nums).map((k) => `n:${k}`), ...Object.keys(terms).map((k) => `t:${k}`), ...claims.filter(Boolean)];
const brak = wymagane.filter((id) => !ids.has(id) && !bezK.has(id));
for (const id of brak) bledy.push(`pokrycie: brak wpisu ${id}`);
const wgIdR = new Map(rejestr.map((w) => [w.id, w]));
for (const e of [...pomoc, ...pomocFallback]) if (e.claim && wgIdR.has(e.claim) && wgIdR.get(e.claim).status !== 'potwierdzone') bledy.push(`pomoc: wpis ${e.id} (${e.claim}) ma w rejestrze status „${wgIdR.get(e.claim).status}”`);
bledy.push(...sprawdzRejestr(rejestr, [], opcje, uwagi));
// Skrót wersji zdań twierdzeń krytycznych (pole przeglad.sha, moduł kontrole-mechaniczne): w formacie A (D-141) jednostką
// jest wpis źródłowy (reguła w rules.yaml, liczba w numbers.yaml, termin w terms.yaml, wpis pomocy w helplines.yaml)
// i cały plik lekcji albo egzaminu, który go używa (pole rules:, {{n:klucz}}); pole uzyte_w wpisu dopisuje pliki bez
// odwołania po ID (np. ramka M12-L4). Zmiana któregokolwiek z nich unieważnia przegląd (strona bezpieczna: plik zamiast zdania).
// Dlaczego: przegląd ma dotyczyć wersji tekstu, którą widział recenzent (D-027, E3 2026-11-04).
/**
 * Źródła tekstu języka `j` (rola 09, K2d): lekcje, egzaminy i reguły z content/<j>/ (brak pliku → ten z content/pl, jak
 * łańcuch treści), pomoc z nakładki content/<j>/helplines.yaml (brak → plik wspólny), definicje terminów z
 * content/<j>/terms-def.yaml (otwarte nr 2 sesji V). Liczby i wpisy terms.yaml wspólne.
 */
const zrodlaJezyka = (j) => {
  const kat = (d) => (existsSync(`content/${j}/${d}`) ? `content/${j}/${d}` : `content/pl/${d}`);
  const plikiTresci = [kat('lessons'), kat('exams')].flatMap((d) => readdirSync(d).sort().map((f) => `${d}/${f}`));
  const plikRules = existsSync(`content/${j}/rules.yaml`) ? `content/${j}/rules.yaml` : 'content/pl/rules.yaml';
  const plikPomocy = existsSync(`content/${j}/helplines.yaml`) ? `content/${j}/helplines.yaml` : 'content/helplines.yaml';
  const h = j === 'pl' ? pomocPlik : YAML.parse(readFileSync(plikPomocy, 'utf8'));
  return {
    tekst: new Map(plikiTresci.map((p) => [p, readFileSync(p, 'utf8')])),
    wpisRules: new Map((j === 'pl' ? rules : YAML.parse(readFileSync(plikRules, 'utf8'))).map((r) => [r.id, r])),
    pomocJ: h.entries ?? [],
    // definicje terminów w języku ≠ pl (D-335): ekran słowniczka w tym języku pokazuje je zamiast `def` z terms.yaml
    defJ: j !== 'pl' && existsSync(`content/${j}/terms-def.yaml`) ? YAML.parse(readFileSync(`content/${j}/terms-def.yaml`, 'utf8')) ?? {} : {},
    ramka: { pointer: h.pointer, fallback: h.fallback },
    // uzyte_w wskazuje ścieżki content/pl/…; w innym języku ten sam plik z content/<j>/, gdy jest
    sciezka: (p) => (j !== 'pl' && p.startsWith('content/pl/') && existsSync(`content/${j}/${p.slice('content/pl/'.length)}`) ? `content/${j}/${p.slice('content/pl/'.length)}` : p),
  };
};
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const jednostki = (w, z) => {
  const out = [];
  if (z.wpisRules.has(w.id)) out.push(`rules.yaml#${w.id}\n${JSON.stringify(z.wpisRules.get(w.id))}`);
  if (w.id.startsWith('n:') && w.id.slice(2) in nums) out.push(`numbers.yaml#${w.id}\n${JSON.stringify(nums[w.id.slice(2)])}`);
  if (w.id.startsWith('t:') && w.id.slice(2) in terms) out.push(`terms.yaml#${w.id}\n${JSON.stringify(terms[w.id.slice(2)])}`);
  if (w.id.startsWith('t:') && Object.hasOwn(z.defJ, w.id.slice(2))) out.push(`terms-def.yaml#${w.id}\n${JSON.stringify(z.defJ[w.id.slice(2)])}`);
  // indeks wpisu w pliku: kolejność decyduje, który numer ekran pokazuje pierwszy (przegląd D-043, E3)
  z.pomocJ.forEach((e, i) => { if (e.claim === w.id) out.push(`helplines.yaml#${i}#${e.id}\n${JSON.stringify(e)}`); });
  if (z.ramka.fallback?.claim === w.id) out.push(`helplines.yaml#fallback\n${JSON.stringify(z.ramka)}`);
  const wzor = w.id.startsWith('n:') ? new RegExp(`\\{\\{n:${esc(w.id.slice(2))}\\}\\}`) : w.id.startsWith('t:') ? null : new RegExp(`(?<![\\w-])${esc(w.id)}(?![\\w-])`);
  if (wzor) for (const [p, t] of z.tekst) if (wzor.test(t)) out.push(`${p}\n${t}`);
  for (const p0 of w.uzyte_w ?? []) {
    const p = z.sciezka(p0);
    if (p0 === 'helplines.yaml#ramka') out.push(`${p0}\n${JSON.stringify(z.ramka)}`);
    else if (existsSync(p) && statSync(p).isFile()) out.push(`${p}\n${readFileSync(p, 'utf8')}`);
    else bledy.push(`rejestr ${w.id}: pole uzyte_w wskazuje nieistniejący plik albo katalog ${p}`);
  }
  return out;
};
const krytyczne = rejestr.filter((x) => x.krytyczne && x.status === 'potwierdzone');
const skroty = [];
const skrotPl = new Map();
const zPl = zrodlaJezyka('pl');
for (const w of krytyczne) {
  const j = jednostki(w, zPl);
  if (!j.length) bledy.push(`rejestr ${w.id}: twierdzenie krytyczne bez znanego miejsca użycia (dopisz uzyte_w)`);
  const s = skrot(j);
  skroty.push(`SKRÓT ${w.id} ${s} (${j.length} jedn.)`);
  skrotPl.set(w.id, s);
  if (w.przeglad?.sha && w.przeglad.sha !== s) (opcje.przedPrzegladem ? uwagi : bledy).push(`rejestr ${w.id}: przegląd dotyczy innej wersji zdań (${w.przeglad.sha}, teraz ${s})`);
}
// Rola 09, K2d (D-135, D-027): treść krytyczna w języku innym niż polski trafia do bazy tylko po kontroli (a) — przekład
// zwrotny w świeżej sesji i porównanie sensu, plus drugi przegląd — zapisanej w polu przeglad_jezyki.<język> = { kto, data,
// sha, kontrola }. Skrót liczony jak dla pl, ze źródeł języka. Język z katalogiem content/<j>/ bez zapisu albo z zapisem
// dla innej wersji zdań = błąd (CI czerwone), więc przekład nie wejdzie bez kontroli. Dlaczego: przekład twierdzenia to
// nowe twierdzenie (rola 09, zasada 3).
const JEZYKI_TRESCI = existsSync('content') ? readdirSync('content').filter((d) => d !== 'pl' && /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$/.test(d) && statSync(`content/${d}`).isDirectory()).sort() : [];
const bezSkrotuPl = [];
for (const jz of JEZYKI_TRESCI) {
  const z = zrodlaJezyka(jz);
  for (const w of krytyczne) {
    const s = skrot(jednostki(w, z));
    skroty.push(`SKRÓT ${jz} ${w.id} ${s}`);
    const pj = w.przeglad_jezyki?.[jz];
    if (!pj?.sha) (opcje.przedPrzegladem ? uwagi : bledy).push(`rejestr ${w.id}: treść krytyczna w ${jz} bez kontroli (a) (przeglad_jezyki.${jz}, skrót ${s})`);
    else if (pj.sha !== s) (opcje.przedPrzegladem ? uwagi : bledy).push(`rejestr ${w.id}: kontrola (a) w ${jz} dotyczy innej wersji zdań (${pj.sha}, teraz ${s})`);
    // 06-tresci-001 (opcja b): przekład powstał z określonej wersji pl (sha_pl); zmiana pl bez przekładu = błąd (uwaga przed przeglądem).
    // Wpis bez sha_pl: uwaga zbiorcza (wprowadzanie partiami; po uzupełnieniu wszystkich partii brak sha_pl stanie się błędem).
    if (pj?.sha) {
      if (!pj.sha_pl) bezSkrotuPl.push(`${w.id}/${jz}`);
      else if (pj.sha_pl !== skrotPl.get(w.id)) (opcje.przedPrzegladem ? uwagi : bledy).push(`rejestr ${w.id}: przekład w ${jz} powstał z innej wersji pl (${pj.sha_pl}, teraz ${skrotPl.get(w.id)}): przetłumacz zmiany i zapisz nowy sha_pl`);
    }
  }
}
if (bezSkrotuPl.length) uwagi.push(`przeglad_jezyki bez sha_pl (skrót pl, z którego powstał przekład): ${bezSkrotuPl.length} wpisów, np. ${bezSkrotuPl.slice(0, 3).join(', ')}`);
if (argv.includes('--skroty')) for (const s of skroty) console.log(s);
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
