// Testy akceptacyjne walidacji pliku eksportu (BR-DANE-002 „Plik uszkodzony albo obcy”, „Plik z nowszej wersji”; ADR 0008 pkt 1–3, „Testy odrzucenia”).
// Część „postęp bez zmian” sprawdza test integracyjny przez port (K-11, pakiet postep); tu tylko decyzja przed dotknięciem bazy.
import { describe, expect, it } from 'vitest';
import { FORMAT_EKSPORTU, KONFIGURACJA as K, migrujFormat, walidujEksport } from '../../../packages/domena/src';

const koperta = (zmiany: Record<string, unknown> = {}) => ({
  format: FORMAT_EKSPORTU,
  wersja_formatu: K.EKSPORT_WERSJA_FORMATU,
  utworzono: '2026-11-04T12:00:00.000Z',
  aplikacja: '1.0.0',
  dane: { ustawienie: [{ klucz: 'jezyk', wartosc: '"pl"' }] },
  ...zmiany,
});

describe('AK-BR-DANE-002: walidacja pliku przed importem', () => {
  it('AK-BR-DANE-002-c plik obcy (inny `format`) → bledny_plik', () => {
    expect(walidujEksport(JSON.stringify(koperta({ format: 'inna-aplikacja' })), K.EKSPORT_WERSJA_FORMATU)).toEqual({ ok: false, powod: 'bledny_plik' });
  });
  it('AK-BR-DANE-002-c plik ucięty (niepełny JSON) → bledny_plik', () => {
    const tekst = JSON.stringify(koperta());
    expect(walidujEksport(tekst.slice(0, tekst.length - 5), K.EKSPORT_WERSJA_FORMATU)).toEqual({ ok: false, powod: 'bledny_plik' });
  });
  it.each(['null', '[]', '"tekst"', '42', ''])('AK-BR-DANE-002-c treść, która nie jest kopertą (%j) → bledny_plik', (tekst) => {
    expect(walidujEksport(tekst, K.EKSPORT_WERSJA_FORMATU)).toEqual({ ok: false, powod: 'bledny_plik' });
  });
  it('AK-BR-DANE-002-d plik z nowszej wersji formatu → nowsza_wersja', () => {
    expect(walidujEksport(JSON.stringify(koperta({ wersja_formatu: K.EKSPORT_WERSJA_FORMATU + 1 })), K.EKSPORT_WERSJA_FORMATU)).toEqual({ ok: false, powod: 'nowsza_wersja' });
  });
  it('AK-BR-DANE-002-a plik tej samej wersji → koperta bez zmian', () => {
    const w = walidujEksport(JSON.stringify(koperta()), K.EKSPORT_WERSJA_FORMATU);
    expect(w).toEqual({ ok: true, wartosc: koperta() });
  });
  it('AK-ADR0008-3 migracja formatu v1 → v1 bez zmian', () => {
    expect(migrujFormat(koperta())).toEqual(koperta());
  });
});
