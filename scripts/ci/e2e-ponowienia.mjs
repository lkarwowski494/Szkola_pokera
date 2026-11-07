// E2E: jedno ponowienie nieudanego flowu (D-178; wzór Trening e2e-ios.yml: „nieudany scenariusz ponawiany RAZ, drugi
// czerwony = porażka”). Podpolecenia:
//   nieudane <raport-junit> <katalog-flowów>  → ścieżki plików flowów z <failure>/<error> w raporcie, po jednej w linii
//   podsumuj <raport-junit> <raport-ponowienia>... → Markdown do GITHUB_STEP_SUMMARY; kod 1, gdy którykolwiek flow padł dwa razy
// Raport JUnit Maestro (`--format junit`): <testcase name="<name z nagłówka flowu>"> z <failure> przy porażce.
// Kształt sprawdzony tylko na danych syntetycznych [DO USTALENIA: pierwszy przebieg na macos-26 — raport w artefakcie e2e-wyniki].
// Brak raportu (awaria przed pierwszym flowem) to maszyna, nie flow: bez ponowień, kod 1 (wzorce roli 07, polityka niestabilnych testów pkt 5).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const odkoduj = (s) => s.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

/** Przypadki z raportu JUnit: { nazwa, ok }. */
export function przypadki(xml) {
  const wynik = [];
  for (const m of xml.matchAll(/<testcase\b([^>]*?)(\/>|>([\s\S]*?)<\/testcase>)/g)) {
    const nazwa = m[1].match(/\bname="([^"]*)"/)?.[1];
    if (nazwa === undefined) continue;
    wynik.push({ nazwa: odkoduj(nazwa), ok: !/<(failure|error)\b/.test(m[3] ?? '') });
  }
  return wynik;
}

/** Nazwa flowu → plik: `name:` z nagłówka YAML albo nazwa pliku bez rozszerzenia (Maestro używa jej, gdy nie ma `name`). */
export function mapaFlowow(katalog) {
  const mapa = new Map();
  for (const plik of readdirSync(katalog).filter((f) => f.endsWith('.yaml') && f !== 'config.yaml')) {
    const sciezka = join(katalog, plik);
    const naglowek = readFileSync(sciezka, 'utf8').split(/^---$/m)[0];
    const nazwa = parse(naglowek)?.name;
    mapa.set(basename(plik, '.yaml'), sciezka);
    if (typeof nazwa === 'string') mapa.set(nazwa, sciezka);
  }
  return mapa;
}

export function nieudane(xml, mapa) {
  const pliki = [];
  for (const p of przypadki(xml)) {
    if (p.ok) continue;
    const plik = mapa.get(p.nazwa);
    if (!plik) throw new Error(`raport: flow „${p.nazwa}” bez pliku w katalogu flowów`);
    if (!pliki.includes(plik)) pliki.push(plik);
  }
  return pliki;
}

/** Wynik: pierwszy przebieg + ponowienia → { tekst, kod }. Flow zielony w ponowieniu jest wypisany (niestabilność widoczna). */
export function podsumuj(xml, ponowienia) {
  const pierwsze = przypadki(xml);
  if (!pierwsze.length) return { tekst: '## E2E\n\nBrak przypadków w raporcie: awaria przed pierwszym flowem (maszyna), bez ponowień.\n', kod: 1 };
  const drugie = new Map(ponowienia.flatMap(przypadki).map((p) => [p.nazwa, p.ok]));
  const zielone = pierwsze.filter((p) => p.ok).map((p) => p.nazwa);
  const wPonowieniu = pierwsze.filter((p) => !p.ok && drugie.get(p.nazwa) === true).map((p) => p.nazwa);
  const dwaRazy = pierwsze.filter((p) => !p.ok && drugie.get(p.nazwa) !== true).map((p) => p.nazwa);
  const lista = (t, xs) => (xs.length ? `- ${t}: ${xs.join(', ')}\n` : '');
  const tekst = `## E2E\n\n${lista('zielone', zielone)}${lista('zielone dopiero w ponowieniu (niestabilne, D-178)', wPonowieniu)}${lista('padły dwa razy', dwaRazy)}`;
  return { tekst, kod: dwaRazy.length ? 1 : 0 };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [polecenie, raport, ...reszta] = process.argv.slice(2);
  const xml = raport && existsSync(raport) ? readFileSync(raport, 'utf8') : '';
  if (polecenie === 'nieudane') {
    for (const f of nieudane(xml, mapaFlowow(reszta[0]))) console.log(f);
  } else if (polecenie === 'podsumuj') {
    const { tekst, kod } = podsumuj(xml, reszta.filter(existsSync).map((f) => readFileSync(f, 'utf8')));
    process.stdout.write(tekst);
    process.exit(kod);
  } else {
    console.error('użycie: e2e-ponowienia.mjs nieudane <junit> <katalog> | podsumuj <junit> [<junit-ponowienia>...]');
    process.exit(2);
  }
}
