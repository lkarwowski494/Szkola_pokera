// Testy ponowień E2E (D-178) na raportach syntetycznych w kształcie JUnit Maestro (pierwszy prawdziwy raport: artefakt e2e-wyniki).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { mapaFlowow, nieudane, oczekiwane, podsumuj, przypadki } from './e2e-ponowienia.mjs';

const E2E = fileURLToPath(new URL('../../apps/mobile/e2e/', import.meta.url));
const junit = (...p) => `<?xml version="1.0"?><testsuites><testsuite name="Test Suite" tests="${p.length}">${p
  .map(([n, ok]) => (ok ? `<testcase id="${n}" name="${n}" classname="${n}"/>` : `<testcase id="${n}" name="${n}" classname="${n}"><failure>Element not found</failure></testcase>`))
  .join('')}</testsuite></testsuites>`;

test('przypadki: nazwy i wynik, także encje XML w nazwie', () => {
  assert.deepEqual(przypadki(junit(['Pomoc', true], ['Lekcja &amp; zadanie', false])), [
    { nazwa: 'Pomoc', ok: true },
    { nazwa: 'Lekcja & zadanie', ok: false },
  ]);
});

test('mapa flowów: name z nagłówka i nazwa pliku wskazują ten sam plik; config.yaml i oczekujace/ pominięte', () => {
  const m = mapaFlowow(E2E);
  assert.equal(m.get('Pomoc'), m.get('04-pomoc'));
  assert.ok(m.get('Pomoc').endsWith('04-pomoc.yaml'));
  assert.ok(![...m.values()].some((p) => p.includes('oczekujace') || p.endsWith('config.yaml')));
});

test('nieudane: pliki tylko nieudanych flowów, bez powtórzeń; nieznany flow → wyjątek (nie cicha zgoda)', () => {
  const m = mapaFlowow(E2E);
  assert.deepEqual(nieudane(junit(['Pomoc', false], ['Słowniczek', true], ['Pomoc', false]), m), [m.get('Pomoc')]);
  assert.throws(() => nieudane(junit(['Nie ma takiego', false]), m), /bez pliku/);
});

test('podsumuj: zielony w ponowieniu wypisany i kod 0; padł dwa razy → kod 1; flow bez ponowienia liczy się jako dwa razy', () => {
  const pierwszy = junit(['Pomoc', false], ['Słowniczek', true], ['Powtórki', false]);
  const ok = podsumuj(pierwszy, [junit(['Pomoc', true]), junit(['Powtórki', true])]);
  assert.equal(ok.kod, 0);
  assert.match(ok.tekst, /dopiero w ponowieniu[^\n]*Pomoc, Powtórki/);
  const zle = podsumuj(pierwszy, [junit(['Pomoc', true])]);
  assert.equal(zle.kod, 1);
  assert.match(zle.tekst, /padły dwa razy: Powtórki/);
});

test('podsumuj: pusty albo brakujący raport = maszyna, kod 1 bez ponowień', () => {
  assert.equal(podsumuj('', []).kod, 1);
  assert.match(podsumuj('', []).tekst, /maszyna/);
});

test('przypadki: porażka zapisana atrybutem status (bez elementu failure) też jest porażką', () => {
  assert.deepEqual(przypadki('<testcase name="Pomoc" status="ERROR"/><testcase name="X" status="SUCCESS"/>'), [
    { nazwa: 'Pomoc', ok: false },
    { nazwa: 'X', ok: true },
  ]);
});

test('podsumuj: przerwany przebieg — flow z katalogu nieobecny w raporcie → kod 1 z nazwą (przegląd D-043 nr 1)', () => {
  const wymagane = oczekiwane(mapaFlowow(E2E));
  assert.equal(wymagane.length, 8); // 01–06, 09, 10 w bramce (08 cz. 5b krok 7: 05, 06, 09 z oczekujace/; sesja S: 10-zakup-z-ustawien, D-336)
  const r = podsumuj(junit(['Pomoc', true], ['Słowniczek', true]), [], { kodPierwszego: 1, wymagane });
  assert.equal(r.kod, 1);
  assert.match(r.tekst, /brak w raporcie/);
});

test('podsumuj: Maestro z kodem ≠ 0, w raporcie same zielone → kod 1 (maszyna; Trening e2e-ios.yml:231–241)', () => {
  const r = podsumuj(junit(['Pomoc', true]), [], { kodPierwszego: 1 });
  assert.equal(r.kod, 1);
  assert.match(r.tekst, /bez nieudanego flowu/);
  assert.equal(podsumuj(junit(['Pomoc', true]), [], { kodPierwszego: 0 }).kod, 0);
});
