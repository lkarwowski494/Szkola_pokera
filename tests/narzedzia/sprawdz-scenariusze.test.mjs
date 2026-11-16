// Test bramki scenariuszy użytkownika (D-060, JAK-19, sesja HV): scripts/sprawdz-scenariusze.mjs na fiksturach w katalogu
// tymczasowym (skrypt czyta ścieżki względem cwd) oraz na katalogu PU tego repozytorium. Wyrocznia: reguły modułu
// „scenariusze-uzytkownika” (prompt roli 07, 2026-11-16), nie wynik skryptu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KORZEN = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SKRYPT = join(KORZEN, 'scripts', 'sprawdz-scenariusze.mjs');
const SHA = 'a'.repeat(40);

/** Uruchamia bramkę w katalogu `cwd`; GITHUB_SHA zastępuje `git rev-parse HEAD` (fikstura nie jest repozytorium git). */
function bramka(cwd, args, env = {}) {
  const r = spawnSync(process.execPath, [SKRYPT, ...args], { cwd, encoding: 'utf8', env: { ...process.env, GITHUB_SHA: SHA, ...env } });
  const wynik = `${r.stdout}${r.stderr}`;
  // czerwień tylko z bramki: wyjątek (stos z tekstem komunikatu z kodu) nie może udawać wykrycia (mutant M4, sesja HV)
  if (r.status !== 0) assert.match(wynik, /^BRAMKA CZERWONA/m, `skrypt zakończył się bez werdyktu bramki:\n${wynik}`);
  return { kod: r.status, wynik };
}

const NAGLOWEK = '| ID | Funkcja | Cel użytkownika od początku do końca | Warianty i błędy | Ekrany | Klasa | Test albo kroki | Powrót |\n|---|---|---|---|---|---|---|---|';
const PU_A = '| PU-001 | `nauka` | Uczeń otwiera lekcję, odpowiada i wraca do listy | pusta lista; anulowanie w połowie | `lista`, `lekcja` | A | `e2e/01-nauka.yaml` | tak |';
const PU_F = '| PU-002 | `zakup` | Użytkownik kupuje dostęp w piaskownicy i widzi odblokowanie | brak sieci; anulowanie arkusza | `zakup` | F | Ustawienia → Pełny dostęp → kup; oczekiwane: limit znika |  tak |';
const FLOW_OK = 'appId: x\n# PU-001\n---\n- assertVisible: { id: "ekran:lista" }\n- assertVisible: { id: "ekran:lekcja" }\n# powrót: lekcja\n- back\n- assertVisible: { id: "ekran:lista" }\n# powrót: lista\n- back\n';

/** Fikstura: katalog PU (domyślnie PU-001 klasy A i PU-002 klasy F), ekrany z listy, plik scenariusza. */
function fikstura({ ekrany = '`lista`, `lekcja`, `zakup`', wiersze = [PU_A, PU_F], funkcje = ['nauka', 'zakup'], wyjatki = [], flow = FLOW_OK, przeglad = '', pliki = {} } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'scenariusze-'));
  mkdirSync(join(dir, 'docs/jakosc'), { recursive: true });
  const katalog = [
    '# Przypadki użycia — fikstura',
    `Ekrany: lista ${ekrany}`,
    przeglad,
    '',
    NAGLOWEK,
    ...wiersze,
    '',
    '## Funkcje',
    '| Funkcja | Opis |',
    '|---|---|',
    ...funkcje.map((f) => `| \`${f}\` | opis funkcji ${f} |`),
    '',
    '## Wyjątki B',
    '| PU | Powód | Termin (build) |',
    '|---|---|---|',
    ...wyjatki,
    '',
  ].join('\n');
  writeFileSync(join(dir, 'docs/jakosc/przypadki-uzycia.md'), katalog);
  if (flow !== null) { mkdirSync(join(dir, 'e2e'), { recursive: true }); writeFileSync(join(dir, 'e2e/01-nauka.yaml'), flow); }
  for (const [p, t] of Object.entries(pliki)) { mkdirSync(dirname(join(dir, p)), { recursive: true }); writeFileSync(join(dir, p), t); }
  return dir;
}

const protokol = (wyniki) => `# Test fizyczny\n\n| PU | Cel | Kroki | Wynik |\n|---|---|---|---|\n${wyniki.map(([id, w]) => `| ${id} | cel | kroki | ${w} |`).join('\n')}\n`;
/** Stan gotowy do buildu 11: wysłany 10 z zamkniętym protokołem, przegląd i protokół 11, E2E na tym SHA zielone. */
const gotowyDoBuildu = (zmiany = {}) => fikstura({
  przeglad: `Przegląd: build 11 @ ${SHA.slice(0, 7)}`,
  pliki: {
    'docs/wydanie/ostatni-build.txt': '10\n',
    'docs/jakosc/test-fizyczny/10.md': protokol([['PU-002', 'OK']]),
    'docs/jakosc/test-fizyczny/11.md': protokol([['PU-002', '—']]),
    'wykonane.tsv': `${SHA}\ne2e/01-nauka.yaml\tPASS\n`,
    ...zmiany,
  },
});

test('katalog PU tego repozytorium: bramka statyczna zielona (kod 0)', () => {
  const r = spawnSync(process.execPath, [SKRYPT, '--statycznie'], { cwd: KORZEN, encoding: 'utf8' });
  assert.equal(r.status, 0, `${r.stdout}${r.stderr}`);
  assert.match(r.stdout, /BRAMKA ZIELONA/);
});

test('fikstura poprawna: statycznie zielona', () => {
  const r = bramka(fikstura(), ['--statycznie']);
  assert.equal(r.kod, 0, r.wynik);
});

test('ekran bez PU → czerwona z nazwą ekranu', () => {
  const r = bramka(fikstura({ ekrany: '`lista`, `lekcja`, `zakup`, `ustawienia`' }), ['--statycznie']);
  assert.equal(r.kod, 1);
  assert.match(r.wynik, /ekran `ustawienia` nie ma żadnego PU/);
});

test('funkcja bez PU → czerwona z nazwą funkcji', () => {
  const r = bramka(fikstura({ funkcje: ['nauka', 'zakup', 'opinie'] }), ['--statycznie']);
  assert.equal(r.kod, 1);
  assert.match(r.wynik, /funkcja `opinie` nie ma żadnego PU/);
});

test('brak katalogu PU → czerwona', () => {
  const dir = mkdtempSync(join(tmpdir(), 'scenariusze-'));
  const r = bramka(dir, ['--statycznie']);
  assert.equal(r.kod, 1);
  assert.match(r.wynik, /brak docs\/jakosc\/przypadki-uzycia\.md/);
});

test('scenariusz A bez ekranu albo bez kroku powrotu → czerwona', () => {
  const bezEkranu = bramka(fikstura({ flow: FLOW_OK.replaceAll('ekran:lekcja', 'inny') }), ['--statycznie']);
  assert.equal(bezEkranu.kod, 1);
  assert.match(bezEkranu.wynik, /PU-001: scenariusz nie odwiedza ekranu `lekcja`/);
  const bezPowrotu = bramka(fikstura({ flow: FLOW_OK.replace('# powrót: lekcja\n', '') }), ['--statycznie']);
  assert.equal(bezPowrotu.kod, 1);
  assert.match(bezPowrotu.wynik, /PU-001: brak kroku powrotu z `lekcja`/);
  const bezPliku = bramka(fikstura({ flow: null }), ['--statycznie']);
  assert.equal(bezPliku.kod, 1);
  assert.match(bezPliku.wynik, /PU-001: klasa A wymaga pliku scenariusza/);
});

test('klasa B: bez wyjątku czerwona statycznie; w trybie pełnym termin minął albo dalej niż 3 buildy → czerwona', () => {
  const pu = PU_A.replace('| A |', '| B |');
  assert.match(bramka(fikstura({ wiersze: [pu, PU_F] }), ['--statycznie']).wynik, /PU-001: klasa B bez wyjątku/);
  const zWyjatkiem = (termin) => ({ wiersze: [pu, PU_F], wyjatki: [`| PU-001 | brak testID ekranów w kodzie aplikacji | ${termin} |`] });
  assert.equal(bramka(fikstura(zWyjatkiem(13)), ['--statycznie']).kod, 0);
  const pelny = (termin) => {
    const dir = gotowyDoBuildu();
    const k = readFileSync(join(dir, 'docs/jakosc/przypadki-uzycia.md'), 'utf8').replace(PU_A, pu).replace(/(\|---\|---\|---\|\n)$/, `$1| PU-001 | brak testID ekranów w kodzie aplikacji | ${termin} |\n`);
    writeFileSync(join(dir, 'docs/jakosc/przypadki-uzycia.md'), k);
    return bramka(dir, ['--build', '11', '--wykonane', 'wykonane.tsv']);
  };
  assert.equal(pelny(12).kod, 0, pelny(12).wynik);
  assert.match(pelny(10).wynik, /PU-001: wyjątek B po terminie \(build 10\)/);
  assert.match(pelny(15).wynik, /PU-001: termin wyjątku B dalej niż 3 buildy naprzód/);
});

test('tryb pełny: stan gotowy do buildu 11 → zielona', () => {
  const r = bramka(gotowyDoBuildu(), ['--build', '11', '--wykonane', 'wykonane.tsv']);
  assert.equal(r.kod, 0, r.wynik);
});

test('tryb pełny: protokół F poprzedniego buildu bez wyniku albo bez pozycji → czerwona', () => {
  const bezWyniku = bramka(gotowyDoBuildu({ 'docs/jakosc/test-fizyczny/10.md': protokol([['PU-002', '—']]) }), ['--build', '11', '--wykonane', 'wykonane.tsv']);
  assert.equal(bezWyniku.kod, 1);
  assert.match(bezWyniku.wynik, /10\.md: PU-002 bez wyniku/);
  const bezPozycji = bramka(gotowyDoBuildu({ 'docs/jakosc/test-fizyczny/10.md': protokol([]) }), ['--build', '11', '--wykonane', 'wykonane.tsv']);
  assert.equal(bezPozycji.kod, 1);
  assert.match(bezPozycji.wynik, /10\.md: brak pozycji PU-002/);
  const pominiete = bramka(gotowyDoBuildu({ 'docs/jakosc/test-fizyczny/10.md': protokol([['PU-002', 'POMINIĘTE: brak konta piaskownicy na tym telefonie']]) }), ['--build', '11', '--wykonane', 'wykonane.tsv']);
  assert.equal(pominiete.kod, 0, pominiete.wynik);
});

test('tryb pełny: brak protokołu bieżącego buildu, brak linii przeglądu, numer nie wyższy niż wysłany → czerwona', () => {
  const dir = gotowyDoBuildu();
  const r = bramka(dir, ['--build', '12', '--wykonane', 'wykonane.tsv']);
  assert.equal(r.kod, 1);
  assert.match(r.wynik, /katalog nie ma linii „Przegląd: build 12 @/);
  assert.match(r.wynik, /brak docs\/jakosc\/test-fizyczny\/12\.md/);
  assert.match(bramka(gotowyDoBuildu({ 'docs/wydanie/ostatni-build.txt': '11\n' }), ['--build', '11', '--wykonane', 'wykonane.tsv']).wynik, /build 11 nie jest wyższy niż już wysłany/);
});

test('tryb pełny: scenariusz A nieprzechodzący, brak pliku wykonanych albo przebieg z innego SHA → czerwona', () => {
  const fail = bramka(gotowyDoBuildu({ 'wykonane.tsv': `${SHA}\ne2e/01-nauka.yaml\tFAIL\n` }), ['--build', '11', '--wykonane', 'wykonane.tsv']);
  assert.equal(fail.kod, 1);
  assert.match(fail.wynik, /PU-001: e2e\/01-nauka\.yaml nie przeszedł/);
  assert.match(bramka(gotowyDoBuildu(), ['--build', '11']).wynik, /tryb pełny wymaga --wykonane/);
  const inny = bramka(gotowyDoBuildu(), ['--build', '11', '--wykonane', 'wykonane.tsv'], { GITHUB_SHA: 'b'.repeat(40) });
  assert.equal(inny.kod, 1);
  assert.match(inny.wynik, /--wykonane: przebieg E2E z innego SHA/);
});

test('--szkielet: tworzy protokół z pozycjami F, nie nadpisuje istniejącego; „(od buildu n)” wyłącza pozycję ze starszego protokołu', () => {
  const dir = fikstura();
  const r = bramka(dir, ['--szkielet', '11']);
  assert.equal(r.kod, 0, r.wynik);
  const plik = join(dir, 'docs/jakosc/test-fizyczny/11.md');
  assert.match(readFileSync(plik, 'utf8'), /\| PU-002 \| .* \| — \|/);
  const drugi = bramka(dir, ['--szkielet', '11']);
  assert.equal(drugi.kod, 1);
  assert.match(drugi.wynik, /już istnieje/);
  // pozycja „(od buildu 12)”: jest w protokole 12, a protokół 11 bez niej jest zamknięty
  const odBuildu = fikstura({ wiersze: [PU_A, PU_F.replace('limit znika', 'limit znika (od buildu 12)')], pliki: { 'docs/jakosc/test-fizyczny/11.md': protokol([]) } });
  assert.equal(bramka(odBuildu, ['--szkielet', '12']).kod, 0);
  assert.match(readFileSync(join(odBuildu, 'docs/jakosc/test-fizyczny/12.md'), 'utf8'), /^\| PU-002 \|/m);
  assert.equal(bramka(odBuildu, ['--protokol', '11']).kod, 0);
  assert.equal(bramka(fikstura({ pliki: { 'docs/jakosc/test-fizyczny/11.md': protokol([]) } }), ['--protokol', '11']).kod, 1);
  const wczesniej = bramka(fikstura({ wiersze: [PU_A, PU_F.replace('limit znika', 'limit znika (od buildu 12)')] }), ['--szkielet', '11']);
  assert.equal(wczesniej.kod, 1);
  assert.match(wczesniej.wynik, /PU-002: „\(od buildu 12\)” późniejsze niż build 11/);
});

test('--protokol: zamknięty → zielona, otwarty → czerwona', () => {
  const zamkniety = fikstura({ pliki: { 'docs/jakosc/test-fizyczny/11.md': protokol([['PU-002', 'BŁĄD → KO-100']]) } });
  assert.equal(bramka(zamkniety, ['--protokol', '11']).kod, 0);
  const otwarty = fikstura({ pliki: { 'docs/jakosc/test-fizyczny/11.md': protokol([['PU-002', '—']]) } });
  assert.equal(bramka(otwarty, ['--protokol', '11']).kod, 1);
});

// Recenzja HV P3-3: reguły skryptu modułu, których nie łapał żaden przypadek (mutacje w dowodzie hv-ci).
test('protokół: „POMINIĘTE:” bez uzasadnienia albo zdublowana pozycja → czerwona', () => {
  const krotkie = bramka(fikstura({ pliki: { 'docs/jakosc/test-fizyczny/11.md': protokol([['PU-002', 'POMINIĘTE: nie']]) } }), ['--protokol', '11']);
  assert.equal(krotkie.kod, 1);
  assert.match(krotkie.wynik, /11\.md: PU-002 bez wyniku/);
  const dubel = bramka(fikstura({ pliki: { 'docs/jakosc/test-fizyczny/11.md': protokol([['PU-002', 'OK'], ['PU-002', 'OK']]) } }), ['--protokol', '11']);
  assert.equal(dubel.kod, 1);
  assert.match(dubel.wynik, /11\.md: zdublowane pozycje/);
});

test('katalog: pozycja F bez kroków albo pusta kolumna „Warianty i błędy” → czerwona', () => {
  const bezKrokow = bramka(fikstura({ wiersze: [PU_A, '| PU-002 | `zakup` | Użytkownik kupuje dostęp w piaskownicy i widzi odblokowanie | brak sieci; anulowanie arkusza | `zakup` | F | kup | tak |'] }), ['--statycznie']);
  assert.equal(bezKrokow.kod, 1);
  assert.match(bezKrokow.wynik, /PU-002: klasa F bez kroków/);
  const bezWariantow = bramka(fikstura({ wiersze: [PU_A.replace('pusta lista; anulowanie w połowie', ''), PU_F] }), ['--statycznie']);
  assert.equal(bezWariantow.kod, 1);
  assert.match(bezWariantow.wynik, /PU-001: kolumna „Warianty i błędy” pusta/);
  assert.equal(bramka(fikstura({ wiersze: [PU_A.replace('pusta lista; anulowanie w połowie', 'n/d: jedna ścieżka bez wyboru'), PU_F] }), ['--statycznie']).kod, 0);
});

// Repozytorium bez tagów v*-b<N> (stan 2026-11-16): numer ostatniego wysłanego buildu jest w docs/wydanie/ostatni-build.txt.
// Bez jego aktualizacji po wysyłce bramka buildu N+1 sprawdzałaby protokół starszego buildu zamiast N (D-1783). Kontrola:
// każdy protokół F poza najnowszym dotyczy wysłanego buildu (≤ ostatni), a najnowszy jest ≥ ostatni.
test('docs/wydanie/ostatni-build.txt nadąża za protokołami F (D-1783)', () => {
  const ostatni = Number(readFileSync(join(KORZEN, 'docs/wydanie/ostatni-build.txt'), 'utf8').trim());
  assert.ok(Number.isInteger(ostatni) && ostatni >= 1010, `ostatni-build.txt: ${ostatni}`);
  const dir = join(KORZEN, 'docs/jakosc/test-fizyczny');
  const numery = existsSync(dir) ? readdirSync(dir).map((f) => f.replace(/\.md$/, '')).filter((f) => /^\d+$/.test(f)).map(Number).sort((a, b) => a - b) : [];
  assert.ok(numery.length > 0, 'brak protokołów F');
  const najnowszy = numery.at(-1);
  assert.ok(najnowszy >= ostatni, `najnowszy protokół ${najnowszy} < ostatni wysłany ${ostatni}`);
  for (const n of numery.slice(0, -1)) assert.ok(n <= ostatni, `protokół ${n} jest starszy niż najnowszy, a ostatni-build.txt = ${ostatni}: po wysyłce buildu ${n} wpisz jego numer`);
});
