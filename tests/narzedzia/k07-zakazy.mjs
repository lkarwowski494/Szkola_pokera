// K-07 (docs/architektura/kontrole-07.md) + D-174: zakazy statyczne w kodzie produkcyjnym `apps/` i `packages/`.
// Zamiast `grep -rnE` (kontrole-07.md) skaner z pomijaniem komentarzy: komentarz „nie używamy INSERT OR REPLACE” nie jest
// użyciem, a SQL w napisach jest (napisy zostają). Pliki testów, zależności i katalogi generowane są poza zakresem.
// Uruchomienie: `node tests/narzedzia/k07-zakazy.mjs [--json]` (kod 1 przy trafieniach); testy skanera: k07-zakazy.test.mjs.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Każda reguła: id, wzorzec (na tekście bez komentarzy), opcjonalnie `tylko` (zakaz tylko w tych ścieżkach) i `poza` (dozwolone tu).
export const REGULY = [
  { id: 'insert-or-replace', wzor: /\b(INSERT\s+OR\s+REPLACE|REPLACE\s+INTO)\b/i, zrodlo: 'ADR 0003; zasada wspólna 10 (kaskada kasuje dzieci)' },
  { id: 'exclusive-transaction', wzor: /\bwithExclusiveTransactionAsync\b/, zrodlo: 'ADR 0003 (kolejka zapisów)' },
  { id: 'execAsync-szablon', wzor: /\bexecAsync\s*\(\s*`[^`]*\$\{/, zrodlo: 'ADR 0003 (SQL z parametrami, nie z interpolacji)' },
  { id: 'pusty-catch', wzor: /\bcatch\s*(\(\s*[\w$]*\s*\))?\s*\{\s*\}/, zrodlo: 'tlo-i-bledy.md §4 (nigdy cicho)' },
  { id: 'sentry', wzor: /@sentry\//, zrodlo: 'ADR 0009; prywatnosc.md' },
  { id: 'expo-observe', wzor: /\bexpo-observe\b/, zrodlo: 'ADR 0009' },
  { id: 'iapkit', wzor: /\b(verifyPurchaseWithProvider|kitApi|iapkit)\b/i, zrodlo: 'ADR 0006 (bez serwera weryfikacji)' },
  { id: 'token-push', wzor: /\b(getExpoPushTokenAsync|getDevicePushTokenAsync)\b/, zrodlo: 'ADR 0012 (tylko powiadomienia lokalne)' },
  { id: 'zadania-w-tle', wzor: /\b(expo-background-task|expo-task-manager)\b/, zrodlo: 'ADR 0013; tlo-i-bledy.md §1' },
  { id: 'setInterval-domena', wzor: /\bsetInterval\s*\(/, tylko: ['packages/domena/'], zrodlo: 'ADR 0010 (czas jako argument)' },
  { id: 'getEachAsync', wzor: /\bgetEachAsync\b/, poza: ['packages/postep/', 'apps/mobile/src/data/postepExpo.ts'], zrodlo: 'ADR 0003' },
  { id: 'siec', wzor: /(\bfetch\s*\(|\bXMLHttpRequest\b|\bnew\s+WebSocket\b|\baxios\b|\bEventSource\b)/, poza: ['apps/mobile/src/platform/'], zrodlo: 'D-174; NFR-OFF-001' },
];

const ROZSZERZENIA = /\.(ts|tsx|js|jsx|mjs|cjs|json)$/;
const POMIJANE_KATALOGI = new Set(['node_modules', 'ios', 'android', '.expo', 'dist', 'build', 'coverage', '__tests__', 'test', 'tests', 'e2e', '.turbo']);
const PLIK_TESTU = /\.(test|spec)\.[cm]?[jt]sx?$/;

// Usuwa komentarze `//` i `/* */` poza napisami ('…', "…", `…`), zachowując znaki nowej linii (numery linii bez zmian).
export function bezKomentarzy(tekst) {
  let wynik = '', i = 0, napis = null;
  while (i < tekst.length) {
    const c = tekst[i], d = tekst[i + 1];
    if (napis) {
      wynik += c;
      if (c === '\\') { wynik += d ?? ''; i += 2; continue; }
      if (c === napis || (c === '\n' && napis !== '`')) napis = null; // ' i " nie przechodzą przez nową linię (np. /["']/ w regexie psuje tylko jedną linię)
      i++;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { napis = c; wynik += c; i++; continue; }
    if (c === '/' && d === '/') { while (i < tekst.length && tekst[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') {
      const k = tekst.indexOf('*/', i + 2), koniec = k < 0 ? tekst.length : k + 2;
      wynik += tekst.slice(i, koniec).replace(/[^\n]/g, ' ');
      i = koniec;
      continue;
    }
    wynik += c;
    i++;
  }
  return wynik;
}

const pasuje = (sciezka, lista) => lista.some((p) => (p.endsWith('/') ? sciezka.startsWith(p) : sciezka === p));

// pliki: [{ sciezka: 'apps/mobile/src/x.ts' (względem korzenia, „/”), tekst }] → trafienia [{ regula, sciezka, linia, fragment }]
export function skanuj(pliki, reguly = REGULY) {
  const trafienia = [];
  for (const { sciezka, tekst } of pliki) {
    const czysty = sciezka.endsWith('.json') ? tekst : bezKomentarzy(tekst);
    for (const r of reguly) {
      if (r.tylko && !pasuje(sciezka, r.tylko)) continue;
      if (r.poza && pasuje(sciezka, r.poza)) continue;
      const g = new RegExp(r.wzor.source, r.wzor.flags.includes('g') ? r.wzor.flags : `${r.wzor.flags}g`);
      for (const m of czysty.matchAll(g)) {
        const linia = czysty.slice(0, m.index).split('\n').length;
        trafienia.push({ regula: r.id, sciezka, linia, fragment: tekst.split('\n')[linia - 1].trim().slice(0, 120) });
      }
    }
  }
  return trafienia;
}

// Pliki produkcyjne w `apps/` i `packages/` (bez testów, zależności i katalogów generowanych).
export function plikiDoSkanu(korzen) {
  const wynik = [];
  const odwiedz = (k) => {
    for (const n of readdirSync(k)) {
      const p = join(k, n);
      if (statSync(p).isDirectory()) { if (!POMIJANE_KATALOGI.has(n)) odwiedz(p); continue; }
      if (!ROZSZERZENIA.test(n) || PLIK_TESTU.test(n)) continue;
      wynik.push({ sciezka: relative(korzen, p).split(sep).join('/'), tekst: readFileSync(p, 'utf8') });
    }
  };
  for (const k of ['apps', 'packages']) odwiedz(join(korzen, k));
  return wynik;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const korzen = fileURLToPath(new URL('../..', import.meta.url));
  const t = skanuj(plikiDoSkanu(korzen));
  if (process.argv.includes('--json')) console.log(JSON.stringify(t));
  else for (const x of t) console.log(`${x.sciezka}:${x.linia} [${x.regula}] ${x.fragment}`);
  process.exit(t.length ? 1 : 0);
}
