// Testy kontroli pliku eksportu (node --test). Dowód, że kontrola łapie to, do czego służy (strategia.md §4).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kolumnyZeSchematu, sprawdzEksport, TABELE_EKSPORTU } from './sprawdz-eksport.mjs';

const SCHEMAT = readFileSync(new URL('../../docs/architektura/schemat.sql', import.meta.url), 'utf8');
const dobry = () => ({
  format: 'szkola-pokera-postep', wersja_formatu: 1, utworzono: '2026-11-04T12:00:00.000Z', aplikacja: '1.0.0',
  dane: {
    ...Object.fromEntries(TABELE_EKSPORTU.map((t) => [t, []])),
    ustawienie: [{ klucz: 'jezyk', wartosc: '"pl"', zmieniono_ms: 1 }],
    aktywnosc: [{ id: '3f2b6c1e-8a4d-4c1b-9e7a-2d5f0b1c9a33', rodzaj: 'sesja', stan: 'zakonczona', z_limitu: 1, dzien_lokalny: '2026-11-04', strefa: 'America/New_York', plan: '{"zadania":["z1"]}', krok: 1, start_ms: 1, koniec_ms: 2 }],
  },
});
const sprawdz = (k) => sprawdzEksport(JSON.stringify(k), SCHEMAT);

test('kolumny z schemat.sql: 9 tabel, aktywnosc ma 10 kolumn', () => {
  const k = kolumnyZeSchematu(SCHEMAT);
  assert.equal(Object.keys(k).length, 9);
  assert.deepEqual(k.aktywnosc, ['id', 'rodzaj', 'stan', 'z_limitu', 'dzien_lokalny', 'strefa', 'plan', 'krok', 'start_ms', 'koniec_ms']);
});
test('poprawny plik (z identyfikatorem UUID): 0 błędów', () => assert.deepEqual(sprawdz(dobry()).bledy, []));
test('pole koperty spoza ADR 0008 (np. urzadzenie) → błąd', () => {
  assert.ok(sprawdz({ ...dobry(), urzadzenie: 'x' }).bledy.some((b) => b.includes('pole koperty spoza ADR 0008: urzadzenie')));
});
test('tabela spoza eksportu (uprawnienie_cache, dziennik) → błąd', () => {
  const k = dobry(); k.dane.dziennik = []; k.dane.uprawnienie_cache = [];
  const b = sprawdz(k).bledy;
  assert.ok(b.includes('tabela spoza eksportu: dziennik') && b.includes('tabela spoza eksportu: uprawnienie_cache'));
});
test('kolumna spoza schemat.sql → błąd', () => {
  const k = dobry(); k.dane.ustawienie[0].notatka = 'x';
  assert.ok(sprawdz(k).bledy.includes('ustawienie[0].notatka: kolumna spoza schemat.sql'));
});
test('adres e-mail i nazwa urządzenia także w JSON wewnątrz kolumny → błąd', () => {
  const k = dobry();
  k.dane.ustawienie.push({ klucz: 'opinie', wartosc: JSON.stringify({ kontakt: 'jan.kowalski@example.com', z: 'iPhone Jana' }), zmieniono_ms: 1 });
  const b = sprawdz(k).bledy;
  assert.ok(b.some((x) => x.includes('adres e-mail')) && b.some((x) => x.includes('nazwa urządzenia')));
});
test('brak tabeli, zły format, ucięty plik → błąd', () => {
  const k = dobry(); delete k.dane.karta; k.format = 'inny';
  const b = sprawdz(k).bledy;
  assert.ok(b.includes('brak tabeli karta') && b.some((x) => x.startsWith('format:')));
  assert.ok(sprawdzEksport(JSON.stringify(dobry()).slice(0, 50), SCHEMAT).bledy[0].startsWith('nie JSON'));
});
test('długi napis → uwaga, nie błąd', () => {
  const k = dobry(); k.dane.ustawienie[0].wartosc = JSON.stringify('a'.repeat(200));
  const r = sprawdz(k);
  assert.deepEqual(r.bledy, []);
  assert.equal(r.uwagi.length, 1);
});
