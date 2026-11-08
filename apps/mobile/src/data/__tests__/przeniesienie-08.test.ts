/// <reference types="jest" />
// Port ekranu „Dane” (PR-07; BR-DANE-001, BR-DANE-002; ADR 0008 pkt 2 i 5, L8-02/D-202): eksport przez arkusz udostępniania
// z plikiem tymczasowym i zapis daty eksportu; import: wybór pliku → walidacja całości bez dotykania bazy → kopia VACUUM INTO →
// importuj w jednej transakcji → usunięcie kopii po sukcesie. Testy na prawdziwym SQLite (node:sqlite), atrapa tylko plików.
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));
import { existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { odczytajUstawienie, statystykiRodzin, zapiszUstawienie, type PortBazy } from '@szkola/postep';
import { czyMaPostep, utworzDaneEkranu, type PlikiPrzeniesienia } from '@/data/przeniesienie';
import { czytajOstatniEksport } from '@/features/ustawienia/ustawieniaAplikacji';
import { plikTestowy, portTestowy } from '@/test-utils/postepTestowy';

const TERAZ = Date.UTC(2026, 10, 8, 12);

function atrapaPlikow(o: { doWyboru?: string | null; bladUdostepniania?: boolean } = {}) {
  const katalog = dirname(plikTestowy());
  const zdarzenia: string[] = [];
  const pliki: PlikiPrzeniesienia & { udostepnione: { nazwa: string; tekst: string }[] } = {
    udostepnione: [],
    udostepnij: async (nazwa, tekst) => {
      if (o.bladUdostepniania) throw new Error('arkusz');
      pliki.udostepnione.push({ nazwa, tekst });
    },
    wybierz: async () => o.doWyboru ?? null,
    sciezkaKopii: () => join(katalog, 'postep-przed-importem.db'),
    usunPlik: async (s) => {
      zdarzenia.push(`usun:${existsSync(s) ? 'jest' : 'brak'}`);
      rmSync(s, { force: true });
    },
  };
  return { pliki, zdarzenia, katalog };
}

const opcje = (port: PortBazy, pliki: PlikiPrzeniesienia) => ({
  port, pliki, aplikacja: '1.0.0', terazMs: () => TERAZ, dzienLokalny: () => '2026-11-08', maPostep: true, ostatniEksportMs: null,
});

async function zPostepem() {
  const t = await portTestowy();
  await t.port.run(
    `INSERT INTO karta (rodzina_id, termin_ms, stabilnosc, trudnosc, dni_zaplanowane, kroki_nauki, powtorzenia, zapomnienia, stan, ostatnia_powtorka_ms, zmieniono_ms)
     VALUES ('f1', 1, 1, 1, 1, 0, 1, 0, 2, 1, 1)`,
  );
  await zapiszUstawienie(t.port, 'haptyka', false, 1);
  return t;
}

describe('eksport (BR-DANE-001)', () => {
  it('plik z kopertą formatu trafia do arkusza; data eksportu zapisana', async () => {
    const { port } = await zPostepem();
    const { pliki } = atrapaPlikow();
    expect(await utworzDaneEkranu(opcje(port, pliki)).eksportuj()).toBe('zapisano');
    expect(pliki.udostepnione).toHaveLength(1);
    const [u] = pliki.udostepnione;
    expect(u?.nazwa).toBe('szkola-pokera-2026-11-08.json');
    expect(JSON.parse(u?.tekst ?? '')).toMatchObject({ format: 'szkola-pokera-postep', wersja_formatu: 1, aplikacja: '1.0.0' });
    expect(await czytajOstatniEksport(port)).toEqual({ ok: true, wartosc: TERAZ });
  });
  it('błąd arkusza → blad; data eksportu bez zmian', async () => {
    const { port } = await zPostepem();
    const { pliki } = atrapaPlikow({ bladUdostepniania: true });
    expect(await utworzDaneEkranu(opcje(port, pliki)).eksportuj()).toBe('blad');
    expect(await czytajOstatniEksport(port)).toEqual({ ok: true, wartosc: null });
  });
});

describe('import (BR-DANE-002)', () => {
  it('eksport → import na innej bazie: postęp przeniesiony, kopia przed importem usunięta po sukcesie', async () => {
    const zrodlo = await zPostepem();
    const a = atrapaPlikow();
    await utworzDaneEkranu(opcje(zrodlo.port, a.pliki)).eksportuj();
    const cel = await portTestowy();
    const b = atrapaPlikow({ doWyboru: a.pliki.udostepnione[0]?.tekst ?? null });
    const dane = utworzDaneEkranu(opcje(cel.port, b.pliki));
    expect(await dane.wybierzIZwaliduj()).toEqual({ ok: true });
    expect(await dane.zapiszImport()).toBe('gotowe');
    expect(await statystykiRodzin(cel.port)).toEqual(await statystykiRodzin(zrodlo.port));
    expect(cel.db.prepare('SELECT rodzina_id FROM karta').all()).toEqual([{ rodzina_id: 'f1' }]);
    expect(await odczytajUstawienie(cel.port, 'haptyka')).toEqual({ ok: true, wartosc: false });
    // kopia powstała przed importem (istniała przy usuwaniu) i nie została w katalogu
    expect(b.zdarzenia).toContain('usun:jest');
    expect(existsSync(b.pliki.sciezkaKopii())).toBe(false);
    // ten sam plik nie zapisuje się drugi raz bez nowego wyboru i walidacji (D-172: mutant M10)
    expect(await dane.zapiszImport()).toBe('blad_zapisu');
  });
  it('anulowany wybór → anulowano; zły plik i nowsza wersja → powód, baza nietknięta', async () => {
    const { port, db } = await zPostepem();
    expect(await utworzDaneEkranu(opcje(port, atrapaPlikow().pliki)).wybierzIZwaliduj()).toEqual({ ok: false, powod: 'anulowano' });
    expect(await utworzDaneEkranu(opcje(port, atrapaPlikow({ doWyboru: '{"format":"inny"}' }).pliki)).wybierzIZwaliduj()).toEqual({ ok: false, powod: 'bledny_plik' });
    const nowszy = JSON.stringify({ format: 'szkola-pokera-postep', wersja_formatu: 99, utworzono: 'x', aplikacja: '9', dane: {} });
    expect(await utworzDaneEkranu(opcje(port, atrapaPlikow({ doWyboru: nowszy }).pliki)).wybierzIZwaliduj()).toEqual({ ok: false, powod: 'nowsza_wersja' });
    expect(db.prepare('SELECT count(*) AS n FROM karta').get()).toEqual({ n: 1 });
  });
  it('zapis bez udanej walidacji → blad_zapisu, baza nietknięta', async () => {
    const { port, db } = await zPostepem();
    expect(await utworzDaneEkranu(opcje(port, atrapaPlikow().pliki)).zapiszImport()).toBe('blad_zapisu');
    expect(db.prepare('SELECT count(*) AS n FROM karta').get()).toEqual({ n: 1 });
  });
  it('nieudana kopia przed importem → import się nie zaczyna (blad_zapisu, postęp bez zmian)', async () => {
    const zrodlo = await portTestowy();
    const a = atrapaPlikow();
    await utworzDaneEkranu(opcje(zrodlo.port, a.pliki)).eksportuj(); // pusty postęp w pliku
    const { port, db } = await zPostepem();
    const b = atrapaPlikow({ doWyboru: a.pliki.udostepnione[0]?.tekst ?? null });
    const pliki = { ...b.pliki, sciezkaKopii: () => join(b.katalog, 'brak-katalogu', 'kopia.db') };
    const dane = utworzDaneEkranu(opcje(port, pliki));
    expect(await dane.wybierzIZwaliduj()).toEqual({ ok: true });
    expect(await dane.zapiszImport()).toBe('blad_zapisu');
    expect(db.prepare('SELECT count(*) AS n FROM karta').get()).toEqual({ n: 1 });
  });
  it('po udanym imporcie wołane poImporcie (odtworzenie przypomnienia i ustawień, ADR 0012)', async () => {
    const zrodlo = await portTestowy();
    const a = atrapaPlikow();
    await utworzDaneEkranu(opcje(zrodlo.port, a.pliki)).eksportuj();
    const { port } = await portTestowy();
    const poImporcie = jest.fn(async () => undefined);
    const dane = utworzDaneEkranu({ ...opcje(port, atrapaPlikow({ doWyboru: a.pliki.udostepnione[0]?.tekst ?? null }).pliki), poImporcie });
    await dane.wybierzIZwaliduj();
    expect(await dane.zapiszImport()).toBe('gotowe');
    expect(poImporcie).toHaveBeenCalledTimes(1);
  });
});

describe('czyMaPostep (ostrzeżenie przed zastąpieniem, BR-DANE-002)', () => {
  it('pusta baza i same ustawienia → nie; karta powtórki → tak', async () => {
    const { port } = await portTestowy();
    expect(await czyMaPostep(port)).toEqual({ ok: true, wartosc: false });
    await zapiszUstawienie(port, 'haptyka', false, 1);
    expect(await czyMaPostep(port)).toEqual({ ok: true, wartosc: false });
    const z = await zPostepem();
    expect(await czyMaPostep(z.port)).toEqual({ ok: true, wartosc: true });
  });
  it('błąd odczytu → odczyt_nieudany', async () => {
    const { port } = await portTestowy();
    expect(await czyMaPostep({ ...port, all: async () => { throw new Error('io'); } })).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});
