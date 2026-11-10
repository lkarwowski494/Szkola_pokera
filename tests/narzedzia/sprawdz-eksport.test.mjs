// Testy kontroli pliku eksportu (node --test). Dowód, że kontrola łapie to, do czego służy (strategia.md §4).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kolumnyZeSchematu, sprawdzEksport, TABELE_EKSPORTU } from './sprawdz-eksport.mjs';

// v1 + v2 + v3 (D-532, ŚR-001): schemat bazy = schemat.sql + schemat-v2.sql + schemat-v3.sql
const SCHEMAT = readFileSync(new URL('../../docs/architektura/schemat.sql', import.meta.url), 'utf8') + '\n'
  + readFileSync(new URL('../../docs/architektura/schemat-v2.sql', import.meta.url), 'utf8') + '\n'
  + readFileSync(new URL('../../docs/architektura/schemat-v3.sql', import.meta.url), 'utf8');
const dobry = () => ({
  format: 'szkola-pokera-postep', wersja_formatu: 1, utworzono: '2026-11-04T12:00:00.000Z', aplikacja: '1.0.0',
  dane: {
    ...Object.fromEntries(TABELE_EKSPORTU.map((t) => [t, []])),
    ustawienie: [{ klucz: 'jezyk', wartosc: '"pl"', zmieniono_ms: 1 }],
    aktywnosc: [{ id: '3f2b6c1e-8a4d-4c1b-9e7a-2d5f0b1c9a33', rodzaj: 'sesja', stan: 'zakonczona', z_limitu: 1, dzien_lokalny: '2026-11-04', strefa: 'America/New_York', plan: '{"zadania":["z1"]}', krok: 1, start_ms: 1, koniec_ms: 2 }],
  },
});
const sprawdz = (k) => sprawdzEksport(JSON.stringify(k), SCHEMAT);

test('kolumny z schemat.sql + v2 + v3 (ALTER ADD COLUMN): 10 tabel, aktywnosc ma 10 kolumn', () => {
  const k = kolumnyZeSchematu(SCHEMAT);
  assert.equal(Object.keys(k).length, 10);
  assert.deepEqual(k.wariant_historia, ['id', 'szablon_id', 'poziom', 'odcisk', 'ziarno', 'zagrano_ms', 'generator_wersja']);
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

test('D-532: stary plik v1 bez tabeli wariant_historia → 0 błędów; z poprawną tabelą też; ze złą kolumną → błąd', () => {
  const stary = dobry(); delete stary.dane.wariant_historia;
  assert.deepEqual(sprawdz(stary).bledy, []);
  const nowy = dobry(); nowy.dane.wariant_historia = [{ id: 1, szablon_id: 's01', poziom: 'latwy', odcisk: 'abc', ziarno: 1, zagrano_ms: 2 }];
  assert.deepEqual(sprawdz(nowy).bledy, []); // wiersz sprzed v3, bez generator_wersja
  nowy.dane.wariant_historia[0].generator_wersja = 1;
  assert.deepEqual(sprawdz(nowy).bledy, []); // ŚR-001
  nowy.dane.wariant_historia[0].obca = 1;
  assert.ok(sprawdz(nowy).bledy.includes('wariant_historia[0].obca: kolumna spoza schemat.sql'));
});
test('brak innej tabeli (np. karta) nadal błąd', () => {
  const k = dobry(); delete k.dane.karta;
  assert.ok(sprawdz(k).bledy.includes('brak tabeli karta'));
});
