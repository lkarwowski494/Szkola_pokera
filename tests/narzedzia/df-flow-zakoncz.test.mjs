// DF (recenzja CZ ee7f991a, znalezisko recenzja-cz-ee7f991-001): test odtwarzający, celowo czerwony do naprawy flow 07.
// Ekran sesji (apps/mobile/src/app/session.tsx) ma stały przycisk „Zakończ” u góry (session.end, porzuca aktywność) i pod oceną
// „Dalej” / „Zakończ” (session.next / session.finish); session.end jest w drzewie widoku przed przyciskiem pod oceną.
// Maestro przy kilku dopasowaniach selektora bez `index` bierze pierwsze w kolejności drzewa po sortowaniu `clickableFirst`
// (maestro-orchestra Orchestra.kt, filtr bez index → Filters.clickableFirst(); Filters.kt: sortedByDescending { it.clickable },
// sortowanie stabilne; odczyt 2026-11-11). Selektor tekstowy, który pasuje do „Dalej” i do session.end, w sesji trafia więc
// w porzucenie lekcji zamiast przejścia dalej. Mechanizm, nie linia (D-043): sprawdzane są wszystkie flowy, także oczekujące.
// Uruchomienie: node --test tests/narzedzia/df-flow-zakoncz.test.mjs (poza `pnpm test:skrypty`, dopóki flow 07 nie jest naprawiony).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAllDocuments } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const E2E = join(ROOT, 'apps/mobile/e2e');
const flowy = (kat) => readdirSync(kat).flatMap((f) => (statSync(join(kat, f)).isDirectory() ? flowy(join(kat, f)) : f.endsWith('.yaml') ? [join(kat, f)] : []));
const wszystkie = flowy(E2E).filter((f) => !f.endsWith('config.yaml'));
const pl = JSON.parse(readFileSync(join(ROOT, 'apps/mobile/src/i18n/locales/pl.json'), 'utf8'));
const { next: DALEJ, finish: ZAKONCZ_PO_OCENIE, end: ZAKONCZ_SESJE } = pl.session;

/** Dopasowanie tekstu jak Maestro (Filters.textMatches): całe dopasowanie wyrażenia albo tekst równy wzorcowi. */
const pasuje = (wzorzec, tekst) => wzorzec === tekst || new RegExp(`^(?:${wzorzec})$`).test(tekst);

/** Selektory tekstowe kroków tapOn i scrollUntilVisible, także w repeat/runFlow (rekurencyjnie). */
function selektory(kroki, out = []) {
  for (const k of kroki ?? []) {
    if (k === null || typeof k !== 'object') continue;
    if ('tapOn' in k) {
      const s = typeof k.tapOn === 'string' ? k.tapOn : k.tapOn?.text;
      if (typeof s === 'string' && k.tapOn?.index === undefined) out.push({ krok: 'tapOn', s });
    }
    if (k.scrollUntilVisible) {
      const e = k.scrollUntilVisible.element;
      const s = typeof e === 'string' ? e : e?.text;
      if (typeof s === 'string') out.push({ krok: 'scrollUntilVisible', s });
    }
    selektory(k.repeat?.commands, out);
    if (k.runFlow && typeof k.runFlow === 'object') selektory(k.runFlow.commands, out);
  }
  return out;
}

test('przesłanki: górny „Zakończ” sesji jest w drzewie przed „Dalej”/„Zakończ” pod oceną i ma ten sam tekst co session.finish', () => {
  const zrodlo = readFileSync(join(ROOT, 'apps/mobile/src/app/session.tsx'), 'utf8');
  const gora = zrodlo.indexOf("t('session.end')");
  const pod = zrodlo.indexOf("t('session.next') : t('session.finish')");
  assert.ok(gora > 0 && pod > gora, 'session.end nie jest renderowany przed przyciskiem pod oceną');
  assert.equal(ZAKONCZ_PO_OCENIE, ZAKONCZ_SESJE);
});

test('żaden selektor tekstowy flowu nie pasuje jednocześnie do „Dalej” i do górnego „Zakończ” sesji (porzucenie lekcji)', () => {
  const bledy = [];
  for (const f of wszystkie) {
    const kroki = parseAllDocuments(readFileSync(f, 'utf8')).at(-1).toJSON();
    for (const { krok, s } of selektory(kroki)) {
      if (pasuje(s, DALEJ) && pasuje(s, ZAKONCZ_SESJE)) bledy.push(`${relative(E2E, f)}: ${krok} '${s}' pasuje do „${DALEJ}” i do „${ZAKONCZ_SESJE}” (session.end)`);
    }
  }
  assert.deepEqual(bledy, []);
});
