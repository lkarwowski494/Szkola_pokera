#!/usr/bin/env node
// Glosariusz przekładu (rola 09, K4; moduł `tlumaczenie`: termin | znaczenie | źródło | przekład | uwagi) generowany
// z content/terms.yaml — jedno źródło prawdy nazw angielskich (ADR-24). Nie edytuj glosariusz.md ręcznie.
// Użycie: node docs/lokalizacja/narzedzia/glosariusz.mjs [--sprawdz]   (--sprawdz: kod 1, gdy plik nieaktualny)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const { parse } = createRequire(join(ROOT, 'tools/content-build/package.json'))('yaml');
const terms = parse(readFileSync(join(ROOT, 'content/terms.yaml'), 'utf8'));
const WYJSCIE = join(ROOT, 'docs/lokalizacja/glosariusz.md');

const kom = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
// Ta sama reguła co renderTermsBare (packages/content-schema/src/terms.ts, D-287): polska nazwa będąca skrótem zostaje skrótem.
const wEn = (t) => ((t.abbr && t.pl.toLowerCase() === t.abbr.toLowerCase()) || /^[A-Z][A-Z0-9+]{1,5}$/.test(t.pl) ? t.pl : t.en);
const zrodlo = (s) => { const m = String(s ?? '').match(/https?:\/\/[^\s)]+/); return m ? m[0] : '—'; };

const wiersze = Object.entries(terms).map(([k, t]) => {
  const uwagi = [t.abbr && `skrót ${t.abbr}`, t.en_alt?.length && `inne: ${t.en_alt.join(', ')}`, wEn(t) !== t.en && `w tekście en domyślnie „${wEn(t)}”`].filter(Boolean).join('; ');
  return `| \`${k}\` | ${kom(t.pl)} | ${kom(t.def)} | ${zrodlo(t.source)} | ${kom(t.en)} | ${kom(uwagi) || '—'} |`;
});
const tekst = [
  '# Glosariusz przekładu',
  '',
  'Wygenerowany z `content/terms.yaml` (`node docs/lokalizacja/narzedzia/glosariusz.mjs`; nie edytuj ręcznie). Rola 09, K4 (`plan-09.md` §5 pkt 1).',
  '',
  'Zasady:',
  '- Nazwa angielska pochodzi z przeczytanego źródła (kolumna „Źródło”, pełny cytat w `terms.yaml`, pole `source`). Tłumacz nie wymyśla nazwy; brak terminu w źródle to pytanie `[DO USTALENIA]` do roli 06.',
  '- W tekście en znacznik `{{t:klucz}}` daje samą nazwę angielską, bez nawiasu (D-287); polska nazwa będąca skrótem (UTG, SPR, ICM) zostaje skrótem. Forma `{{t:klucz|forma}}` w przekładzie to postać w języku docelowym (np. liczba mnoga „flushes”); klucz bez zmian.',
  '- Pozostałe języki (fala 1, K-05): do decyzji 09 z 06; robocze założenie jak w Treningu — nazwa angielska.',
  '- Nie tłumaczyć: nazwy własne (solver, tytuły książek, autorzy), notacja kart `[[As Kd]]`, skróty pozycji i akcji przy stole.',
  '- Definicje (kolumna „Znaczenie”) są po polsku; ich przekład to osobna jednostka K5 (ćwiczenie „definicja → termin” w en czeka na nią, D-293).',
  '',
  `Terminów: ${wiersze.length}.`,
  '',
  '| Klucz | Termin (pl) | Znaczenie | Źródło | Przekład en | Uwagi |',
  '|---|---|---|---|---|---|',
  ...wiersze,
  '',
].join('\n');

if (process.argv.includes('--sprawdz')) {
  let obecny = '';
  try { obecny = readFileSync(WYJSCIE, 'utf8'); } catch { /* brak pliku = nieaktualny */ }
  if (obecny !== tekst) { console.log('glosariusz.md nieaktualny: uruchom node docs/lokalizacja/narzedzia/glosariusz.mjs'); process.exitCode = 1; }
  else console.log(`glosariusz.md aktualny (${wiersze.length} terminów)`);
} else {
  writeFileSync(WYJSCIE, tekst);
  console.log(`zapisano ${WYJSCIE} (${wiersze.length} terminów)`);
}
