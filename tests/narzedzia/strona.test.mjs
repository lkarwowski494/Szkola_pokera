// K-10 (plan-1.0; D-307, D-308): strona polityki prywatności i wsparcia w site/ — wzór Trening tests/public-repo.test.ts:173–262
// (2e4b0f8, odczyt 2026-11-09). Treść zgodna z etykietą App Privacy „Data Not Collected” (docs/architektura/prywatnosc.md §3):
// pliki = wynik generatorów z jednego źródła, bez skryptów i zasobów zewnętrznych, bez SDK zbierających dane w aplikacji.
// Publikacja: tylko pages.yml, tylko site/, tylko z main (D-308, zgoda D-341 pkt 4, D-342): strażnik niżej.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stronaPolityki } from '../../tools/strona/polityka.mjs';
import { pomocZTresci, stronaWsparcia } from '../../tools/strona/wsparcie.mjs';

const korzen = join(dirname(fileURLToPath(import.meta.url)), '../..');
const czytaj = (p) => readFileSync(join(korzen, p), 'utf8');
const bezKomentarzy = (h) => h.replace(/<!--[\s\S]*?-->/g, '');
const sekcja = (h, j) => { const a = h.indexOf(`<section lang="${j}"`); return h.slice(a, h.indexOf('</section>', a)); };

test('site/ zawiera dokładnie privacy.html i support.html (bez .md, danych, obrazów)', () => {
  assert.deepEqual(readdirSync(join(korzen, 'site')).sort(), ['privacy.html', 'support.html']);
});

test('pliki strony = wynik generatorów (polityka z docs/wydanie/polityka-prywatnosci/*.md; uruchom node tools/strona/*.mjs --zapisz)', () => {
  assert.equal(czytaj('site/privacy.html'), stronaPolityki());
  assert.equal(czytaj('site/support.html'), stronaWsparcia());
});

test('obie strony po polsku i angielsku, ze wzajemnymi odnośnikami', () => {
  for (const p of ['site/privacy.html', 'site/support.html']) {
    const h = czytaj(p);
    assert.match(h, /<section lang="pl" id="pl">/);
    assert.match(h, /<section lang="en" id="en">/);
  }
  assert.match(czytaj('site/privacy.html'), /href="support\.html"/);
  assert.match(czytaj('site/support.html'), /href="privacy\.html"/);
});

test('bez skryptów, ramek, formularzy i zasobów zewnętrznych; odnośniki zewnętrzne tylko z content/helplines.yaml', () => {
  const pomoc = pomocZTresci();
  for (const p of ['site/privacy.html', 'site/support.html']) {
    const h = bezKomentarzy(czytaj(p));
    assert.doesNotMatch(h, /<script|<iframe|<form|<img|<link|@import|src=/i, p);
    const zewnetrzne = [...h.matchAll(/href="(https?:[^"]+)"/g)].map((m) => m[1]);
    for (const u of zewnetrzne) assert.equal(u, pomoc.adres, `${p}: ${u}`);
  }
});

test('„Data Not Collected”: polityka mówi, że aplikacja nie zbiera danych, i nie wspomina narzędzi zbierających dane', () => {
  const h = bezKomentarzy(czytaj('site/privacy.html'));
  assert.match(sekcja(h, 'pl'), /Aplikacja Szkoła Pokera sama nie zbiera żadnych danych/);
  assert.match(sekcja(h, 'en'), /does not collect any data/);
  assert.match(sekcja(h, 'pl'), /nie ma konta, serwera, reklam, analityki ani śledzenia/);
  assert.doesNotMatch(h, /Google Analytics|Firebase|Crashlytics|Sentry|Amplitude|Mixpanel|AppsFlyer|Adjust|Facebook SDK|ciasteczk|cookie/i);
});

test('zdanie „nic nie wysyła” zgodne z zależnościami aplikacji: brak SDK analityki, reklam, raportów awarii i zdalnej konfiguracji', () => {
  const pkg = JSON.parse(czytaj('apps/mobile/package.json'));
  const zaleznosci = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  const zakazane = zaleznosci.filter((z) => /firebase|analytics|sentry|crashlytics|bugsnag|amplitude|mixpanel|segment|appsflyer|adjust|admob|ads|facebook|onesignal|expo-updates|expo-insights|posthog|datadog/i.test(z));
  assert.deepEqual(zakazane, []);
});

test('wsparcie: zdanie pomocy przy hazardzie i link dokładnie jak w content/helplines.yaml (D-158: bez numerów krajowych)', () => {
  const pomoc = pomocZTresci();
  const h = czytaj('site/support.html');
  const esc = pomoc.zdanie.replace(/&/g, '&amp;');
  assert.ok(sekcja(h, 'pl').includes(esc));
  assert.ok(sekcja(h, 'pl').includes(`href="${pomoc.adres}"`) && sekcja(h, 'en').includes(`href="${pomoc.adres}"`));
  assert.doesNotMatch(bezKomentarzy(h), /\+?\d[\d\s-]{7,}\d/); // bez numerów telefonów
});

test('wsparcie: bez cen i bez liczby limitu wpisanej ręcznie (ceny w App Store; liczby tylko z KONFIGURACJA)', () => {
  const h = bezKomentarzy(czytaj('site/support.html'));
  for (const j of ['pl', 'en']) assert.doesNotMatch(sekcja(h, j), /\$|USD|zł|€|\d+[,.]\d\d|\d+ (zadań|ćwiczeń|tasks|sessions)/);
});

// D-342 (2026-11-09, zgoda właściciela na publikację D-341 pkt 4): jedyny workflow publikujący Pages to pages.yml — wyłącznie
// katalog site/ i wyłącznie z main (push ścieżek site/** albo ręcznie z main). Wzór Trening .github/workflows/pages.yml:1–34
// (2e4b0f8, odczyt 2026-11-09); odstępstwo nazwane: uprawnienia pages/id-token na poziomie zadania (zasada tego repo, workflowy.test).
const PAGES = /deploy-pages|upload-pages-artifact|configure-pages|gh-pages/; // gh-pages: publikacja gałęzią (przegląd D-043, P2)
test('D-308/D-342: Pages publikuje tylko pages.yml, tylko site/ i tylko z main', async () => {
  const { parseDocument } = await import('yaml');
  const publikujace = readdirSync(join(korzen, '.github/workflows')).filter((f) => PAGES.test(czytaj(`.github/workflows/${f}`)));
  assert.deepEqual(publikujace, ['pages.yml']);
  const w = parseDocument(czytaj('.github/workflows/pages.yml')).toJSON();
  assert.deepEqual(Object.keys(w.on).sort(), ['push', 'workflow_dispatch']);
  assert.deepEqual(w.on.push.branches, ['main']);
  assert.deepEqual([...w.on.push.paths].sort(), ['.github/workflows/pages.yml', 'site/**']);
  assert.equal(w.on.workflow_dispatch, null, 'dispatch bez wejść (nic do wstrzyknięcia)');
  assert.deepEqual(Object.keys(w.jobs), ['deploy']);
  const j = w.jobs.deploy;
  assert.equal(j.if, "github.ref == 'refs/heads/main'", 'ręczne uruchomienie z innej gałęzi nie publikuje');
  assert.deepEqual(j.permissions, { contents: 'read', pages: 'write', 'id-token': 'write' });
  assert.equal(j.environment?.name, 'github-pages');
  const uses = j.steps.map((k) => k.uses);
  assert.deepEqual(uses, ['actions/checkout@v5', 'actions/configure-pages@v5', 'actions/upload-pages-artifact@v4', 'actions/deploy-pages@v4']);
  assert.deepEqual(j.steps[0].with, { 'persist-credentials': false }, 'checkout bez ref (= main) i bez tokenu w .git');
  assert.deepEqual(j.steps[2].with, { path: 'site' });
  assert.ok(j.steps.every((k) => !k.run), 'bez własnych poleceń (nic nie dopisuje do site/)');
  assert.doesNotMatch(czytaj('.github/workflows/pages.yml'), /secrets\./, 'bez sekretów');
});
