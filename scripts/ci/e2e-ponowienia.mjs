// E2E: jedno ponowienie nieudanego flowu (D-178; wzór Trening e2e-ios.yml: „nieudany scenariusz ponawiany RAZ, drugi
// czerwony = porażka”). Podpolecenia:
//   nieudane <raport-junit> <katalog-flowów>  → ścieżki plików flowów z <failure>/<error> w raporcie, po jednej w linii
//   podsumuj <raport-junit> <katalog-flowów> <kod-pierwszego-przebiegu> [<raport-ponowienia>...] → Markdown do
//     GITHUB_STEP_SUMMARY; kod 1, gdy flow padł dwa razy, flowu z katalogu brakuje w raporcie albo Maestro zakończył się
//     błędem bez nieudanego flowu w raporcie (jak Trening e2e-ios.yml:231–241: rc ≠ 0 i pusta lista nieudanych = porażka)
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
    const status = m[1].match(/\bstatus="([^"]*)"/)?.[1] ?? '';
    wynik.push({ nazwa: odkoduj(nazwa), ok: !/<(failure|error)\b/.test(m[3] ?? '') && !/^(error|failed?|failure)$/i.test(status) });
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

/** Nazwy flowów oczekiwanych w raporcie: jedna na plik (name z nagłówka, inaczej nazwa pliku). */
export function oczekiwane(mapa) {
  const naPlik = new Map();
  for (const [nazwa, plik] of mapa) if (!naPlik.has(plik) || !/^\d/.test(nazwa)) naPlik.set(plik, nazwa);
  return [...naPlik.values()];
}

/**
 * Wynik: pierwszy przebieg + ponowienia → { tekst, kod }. Flow zielony w ponowieniu jest wypisany (niestabilność widoczna).
 * `kodPierwszego` ≠ 0 bez nieudanego przypadku w raporcie i brak flowu z `wymagane` w raporcie to porażka (raport niepełny).
 */
export function podsumuj(xml, ponowienia, { kodPierwszego = 0, wymagane = [] } = {}) {
  const pierwsze = przypadki(xml);
  if (!pierwsze.length) return { tekst: '## E2E\n\nBrak przypadków w raporcie: awaria przed pierwszym flowem (maszyna), bez ponowień.\n', kod: 1 };
  const drugie = new Map(ponowienia.flatMap(przypadki).map((p) => [p.nazwa, p.ok]));
  const zielone = pierwsze.filter((p) => p.ok).map((p) => p.nazwa);
  const wPonowieniu = pierwsze.filter((p) => !p.ok && drugie.get(p.nazwa) === true).map((p) => p.nazwa);
  const dwaRazy = pierwsze.filter((p) => !p.ok && drugie.get(p.nazwa) !== true).map((p) => p.nazwa);
  const brak = wymagane.filter((n) => !pierwsze.some((p) => p.nazwa === n));
  const bezNieudanych = kodPierwszego !== 0 && pierwsze.every((p) => p.ok);
  const lista = (t, xs) => (xs.length ? `- ${t}: ${xs.join(', ')}\n` : '');
  const tekst = `## E2E\n\n${lista('zielone', zielone)}${lista('zielone dopiero w ponowieniu (niestabilne, D-178)', wPonowieniu)}${lista('padły dwa razy', dwaRazy)}${lista('brak w raporcie (przebieg przerwany)', brak)}${bezNieudanych ? '- Maestro zakończył się błędem bez nieudanego flowu w raporcie (maszyna)\n' : ''}`;
  return { tekst, kod: dwaRazy.length || brak.length || bezNieudanych ? 1 : 0 };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [polecenie, raport, ...reszta] = process.argv.slice(2);
  const xml = raport && existsSync(raport) ? readFileSync(raport, 'utf8') : '';
  if (polecenie === 'nieudane') {
    for (const f of nieudane(xml, mapaFlowow(reszta[0]))) console.log(f);
  } else if (polecenie === 'podsumuj') {
    const [katalog, kodPierwszego, ...ponowienia] = reszta;
    const { tekst, kod } = podsumuj(xml, ponowienia.filter(existsSync).map((f) => readFileSync(f, 'utf8')), {
      kodPierwszego: Number(kodPierwszego),
      wymagane: oczekiwane(mapaFlowow(katalog)),
    });
    process.stdout.write(tekst);
    process.exit(kod);
  } else {
    console.error('użycie: e2e-ponowienia.mjs nieudane <junit> <katalog> | podsumuj <junit> <katalog> <kod> [<junit-ponowienia>...]');
    process.exit(2);
  }
}
