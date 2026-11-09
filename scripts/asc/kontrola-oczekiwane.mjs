// Oczekiwane wartości dla kontroli App Store Connect (asc-kontrola.yml, narzędzie studia) — PLIKI GENEROWANE z jednego źródła prawdy, nie edytować ręcznie.
// Szkoła Pokera: przeniesione z Treningu (scripts/asc/kontrola-oczekiwane.mjs, 2e4b0f8, odczyt 2026-11-09; D-348). Powód w Treningu (przebieg 41009108485):
//   (1) w sklepie tylko lokalizacje obsługiwane przez App Store Connect (LOCALE_MAP w metadane.mjs), tu z aliasami en-GB/en-CA/en-AU = en-US, oraz
//   (2) w polu Notes tylko blok angielski z store/review-notes.md, nie cały plik z wersją polską.
// Odstępstwo (D-352): nazwa z store/app-store-metadata.json (bez app-store-names.json).
// Wyjście: store/asc-kontrola-oczekiwane.json (kod ASC → name, subtitle, keywords) i store/review-notes.en.txt (blok EN).
//   node scripts/asc/kontrola-oczekiwane.mjs           → zapis plików
//   node scripts/asc/kontrola-oczekiwane.mjs --check   → kod 1, gdy pliki w repo różnią się od wygenerowanych (test: tests/asc-kontrola.test.ts)
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALE_MAP, buildWanted } from './metadane.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const OUT_JSON = 'store/asc-kontrola-oczekiwane.json';
export const OUT_NOTES = 'store/review-notes.en.txt';

/** Blok angielski notatek: pierwszy blok ```text w store/review-notes.md (ten wkleja właściciel do pola Notes). */
export function notesEn(md) {
  const m = md.match(/```text\n([\s\S]*?)```/);
  if (!m || !m[1].startsWith('Thank you for reviewing')) throw new Error('store/review-notes.md: brak angielskiego bloku ```text na początku notatek');
  return m[1].trim() + '\n';
}

export function oczekiwane({ meta, urls, mapping = LOCALE_MAP }) {
  const lokalizacje = {};
  for (const [repo, w] of Object.entries(buildWanted({ meta, urls }))) {
    const asc = mapping[repo];
    if (!asc) continue;
    if (typeof w.info.name !== 'string') throw new Error(`brak nazwy dla ${repo}`);
    lokalizacje[asc] = { name: w.info.name, subtitle: w.info.subtitle, keywords: w.version.keywords };
  }
  return { _opis: 'PLIK GENEROWANY przez scripts/asc/kontrola-oczekiwane.mjs ze store/app-store-metadata.json (z aliasami) — tylko lokalizacje obsługiwane przez App Store Connect. Nie edytować ręcznie.', lokalizacje };
}

export function generuj(read = f => readFileSync(join(ROOT, f), 'utf8')) {
  const json = oczekiwane({ meta: JSON.parse(read('store/app-store-metadata.json')), urls: JSON.parse(read('store/app-store-urls.json')) });
  return { [OUT_JSON]: JSON.stringify(json, null, 2) + '\n', [OUT_NOTES]: notesEn(read('store/review-notes.md')) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const pliki = generuj(); const check = process.argv.includes('--check'); let zle = 0;
  for (const [f, tresc] of Object.entries(pliki)) {
    if (check) { let jest = null; try { jest = readFileSync(join(ROOT, f), 'utf8'); } catch {} if (jest !== tresc) { console.error(`${f}: nieaktualny — uruchom node scripts/asc/kontrola-oczekiwane.mjs`); zle++; } }
    else writeFileSync(join(ROOT, f), tresc);
  }
  process.exit(zle ? 1 : 0);
}
