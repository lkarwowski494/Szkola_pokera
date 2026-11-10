// D-532: historia odcisków wariantów scenariuszy (okno 20 na szablon i poziom), tabela `wariant_historia` (migracja v2).
// Zapis, UPSERT, przycięcie okna, eksport → import, import starego pliku v1, „Usuń postęp”, plik z błędnym wierszem.
import { afterEach, describe, expect, it } from 'vitest';
import { KONFIGURACJA } from '../../domena/src';
import { eksportuj, importuj, odczytajOdciski, usunPostep, zapiszOdcisk, type ZapisOdcisku } from '../src';
import { ile, integralnosc, zawartosc } from '../../../tests/narzedzia/postep-node';
import { DZIEN_WZORCA, T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const META = { terazMs: T0, aplikacja: '1.0.0' };
const OKNO = KONFIGURACJA.WARIANTY_HISTORIA_OKNO;
const zapis = (o: Partial<ZapisOdcisku> & { odcisk: string }) => ({ szablonId: 's01', poziom: 'latwy' as const, ziarno: 1, terazMs: T0, generatorWersja: 1, ...o });
const kolumnyHistorii = (db: import('node:sqlite').DatabaseSync) => db.prepare('SELECT * FROM wariant_historia ORDER BY id').all().map((w) => ({ ...w }));

describe('D-532 okno historii', () => {
  it('okno = 20 (stała w domenie)', () => expect(OKNO).toBe(20));

  it('zapiszOdcisk → odczytajOdciski: lista od najstarszego do najnowszego, pola zachowane', async () => {
    const { port } = await przygotuj('pusta');
    for (let i = 0; i < 3; i++) expect(await zapiszOdcisk(port, zapis({ odcisk: `o${i}`, ziarno: 100 + i, terazMs: T0 + i }))).toEqual({ ok: true, wartosc: undefined });
    expect(await odczytajOdciski(port, 's01', 'latwy')).toEqual({ ok: true, wartosc: [
      { odcisk: 'o0', ziarno: 100, zagranoMs: T0, generatorWersja: 1 }, { odcisk: 'o1', ziarno: 101, zagranoMs: T0 + 1, generatorWersja: 1 }, { odcisk: 'o2', ziarno: 102, zagranoMs: T0 + 2, generatorWersja: 1 },
    ] });
    expect(await odczytajOdciski(port, 's01', 'trudny')).toEqual({ ok: true, wartosc: [] });
  });

  it('UPSERT po (szablon, poziom, odcisk): ten sam odcisk odświeża ziarno i czas, nie dubluje wiersza i trafia na koniec listy', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'a', ziarno: 1, terazMs: T0 }));
    await zapiszOdcisk(port, zapis({ odcisk: 'b', ziarno: 2, terazMs: T0 + 1 }));
    const idA = (db.prepare("SELECT id FROM wariant_historia WHERE odcisk = 'a'").get() as { id: number }).id;
    await zapiszOdcisk(port, zapis({ odcisk: 'a', ziarno: 9, terazMs: T0 + 5 }));
    expect(ile(db, 'wariant_historia')).toBe(2);
    expect((db.prepare("SELECT id FROM wariant_historia WHERE odcisk = 'a'").get() as { id: number }).id).toBe(idA); // UPSERT, nie REPLACE (ADR 0003 pkt 4)
    expect(await odczytajOdciski(port, 's01', 'latwy')).toEqual({ ok: true, wartosc: [
      { odcisk: 'b', ziarno: 2, zagranoMs: T0 + 1, generatorWersja: 1 }, { odcisk: 'a', ziarno: 9, zagranoMs: T0 + 5, generatorWersja: 1 },
    ] });
  });

  it('08-programista-003: zapis przy cofniętym zegarze trafia na koniec listy i nie wypada z okna (kolejność zapisu, nie zegara)', async () => {
    const { port } = await przygotuj('pusta');
    for (let i = 0; i < OKNO; i++) await zapiszOdcisk(port, zapis({ odcisk: `o${String(i).padStart(2, '0')}`, ziarno: i, terazMs: T0 + i }));
    const DZIEN_MS = 86_400_000;
    expect(await zapiszOdcisk(port, zapis({ odcisk: 'nowy', ziarno: 777, terazMs: T0 - DZIEN_MS }))).toEqual({ ok: true, wartosc: undefined });
    const w = await odczytajOdciski(port, 's01', 'latwy');
    if (!w.ok) throw new Error('odczyt');
    expect(w.wartosc).toHaveLength(OKNO);
    expect(w.wartosc[OKNO - 1]).toMatchObject({ odcisk: 'nowy', ziarno: 777 }); // ostatni zapisany = ostatni na liście (czyPowtorkaWariantu)
    expect(w.wartosc.some((o) => o.odcisk === 'o00')).toBe(false); // wypadł najstarszy, nie nowy
    expect(w.wartosc.map((o) => o.zagranoMs)).toEqual([...w.wartosc.map((o) => o.zagranoMs)].sort((a, b) => a - b)); // czas monotoniczny
  });
  it('08-programista-003: ten sam znacznik czasu dwóch zapisów nie zmienia kolejności zapisu', async () => {
    const { port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'a', terazMs: T0 }));
    await zapiszOdcisk(port, zapis({ odcisk: 'b', terazMs: T0 }));
    const w = await odczytajOdciski(port, 's01', 'latwy');
    expect(w.ok && w.wartosc.map((o) => o.odcisk)).toEqual(['a', 'b']);
  });
  it('przycięcie: po 25 różnych odciskach zostaje 20 najnowszych (najstarsze znikają)', async () => {
    const { db, port } = await przygotuj('pusta');
    for (let i = 0; i < 25; i++) await zapiszOdcisk(port, zapis({ odcisk: `o${String(i).padStart(2, '0')}`, ziarno: i, terazMs: T0 + i }));
    expect(ile(db, 'wariant_historia')).toBe(OKNO);
    const w = await odczytajOdciski(port, 's01', 'latwy');
    expect(w.ok && w.wartosc.map((x) => x.odcisk)).toEqual(Array.from({ length: OKNO }, (_, i) => `o${String(i + 5).padStart(2, '0')}`));
  });

  it('odświeżony stary odcisk przeżywa przycięcie, a najstarszy nieodświeżony odpada', async () => {
    const { port } = await przygotuj('pusta');
    for (let i = 0; i < OKNO; i++) await zapiszOdcisk(port, zapis({ odcisk: `o${i}`, terazMs: T0 + i }));
    await zapiszOdcisk(port, zapis({ odcisk: 'o0', terazMs: T0 + 100 })); // odświeżenie, nadal 20
    await zapiszOdcisk(port, zapis({ odcisk: 'nowy', terazMs: T0 + 101 })); // 21. → odpada o1
    const w = await odczytajOdciski(port, 's01', 'latwy');
    const nazwy = w.ok ? w.wartosc.map((x) => x.odcisk) : [];
    expect(nazwy).toHaveLength(OKNO);
    expect(nazwy).toContain('o0');
    expect(nazwy).not.toContain('o1');
    expect(nazwy.at(-1)).toBe('nowy');
  });

  it('przycięcie jednej pary (szablon, poziom) nie rusza innych szablonów ani poziomów', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ szablonId: 's02', odcisk: 'x', terazMs: T0 }));
    await zapiszOdcisk(port, zapis({ poziom: 'sredni', odcisk: 'y', terazMs: T0 }));
    await zapiszOdcisk(port, zapis({ poziom: 'trudny', odcisk: 'z', terazMs: T0 }));
    for (let i = 0; i < 30; i++) await zapiszOdcisk(port, zapis({ odcisk: `o${i}`, terazMs: T0 + 10 + i }));
    expect((await odczytajOdciski(port, 's01', 'latwy')).ok && ile(db, 'wariant_historia')).toBe(OKNO + 3);
    for (const [s, p, o] of [['s02', 'latwy', 'x'], ['s01', 'sredni', 'y'], ['s01', 'trudny', 'z']] as const) {
      const w = await odczytajOdciski(port, s, p);
      expect(w.ok && w.wartosc.map((x) => x.odcisk)).toEqual([o]);
    }
  });

  it('ten sam odcisk w różnych szablonach i poziomach to osobne wiersze', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'k' }));
    await zapiszOdcisk(port, zapis({ szablonId: 's02', odcisk: 'k' }));
    await zapiszOdcisk(port, zapis({ poziom: 'trudny', odcisk: 'k' }));
    expect(ile(db, 'wariant_historia')).toBe(3);
  });

  it('przycięcie w jednej transakcji z zapisem: błąd w środku (zły poziom łamie CHECK) → nic nie zapisane, stan bez zmian', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'a' }));
    const przed = kolumnyHistorii(db);
    const w = await zapiszOdcisk(port, { ...zapis({ odcisk: 'b' }), poziom: 'zly' as 'latwy' });
    expect(w).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(kolumnyHistorii(db)).toEqual(przed);
  });

  it('odczytajOdciski: wiersz o złym kształcie (kolumna z innym typem niż w schemacie) → odczyt_nieudany, nie rzuca', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'a' }));
    db.exec("UPDATE wariant_historia SET zagrano_ms = 'tekst'"); // afinicja INTEGER przyjmuje tekst (D-043 P1)
    expect(await odczytajOdciski(port, 's01', 'latwy')).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});

describe('D-532 eksport, import, „Usuń postęp”', () => {
  async function zHistoria() {
    const z = await przygotuj('wzorzec');
    await zapiszOdcisk(z.port, zapis({ odcisk: 'a', ziarno: 7, terazMs: T0 }));
    await zapiszOdcisk(z.port, zapis({ poziom: 'trudny', szablonId: 's05', odcisk: 'b', ziarno: 8, terazMs: T0 + 1 }));
    return z;
  }
  it('eksport zawiera tabelę wariant_historia, wersja_formatu nadal 1', async () => {
    const { port } = await zHistoria();
    const w = await eksportuj(port, META);
    const k = JSON.parse(w.ok ? w.wartosc : '{}');
    expect(k.wersja_formatu).toBe(1);
    expect(k.dane.wariant_historia).toEqual([
      { id: 1, szablon_id: 's01', poziom: 'latwy', odcisk: 'a', ziarno: 7, zagrano_ms: T0, generator_wersja: 1 },
      { id: 2, szablon_id: 's05', poziom: 'trudny', odcisk: 'b', ziarno: 8, zagrano_ms: T0 + 1, generator_wersja: 1 },
    ]);
  });
  it('round-trip: eksport → import na czystej bazie daje identyczną historię, integrity ok', async () => {
    const { db: zrodlo, port: pz } = await zHistoria();
    const w = await eksportuj(pz, META);
    if (!w.ok) throw new Error(w.powod);
    const { db, port } = await przygotuj('pusta');
    expect(await importuj(port, w.wartosc, '2026-11-04')).toEqual({ ok: true, wartosc: undefined });
    expect(zawartosc(db, ['wariant_historia'])).toEqual(zawartosc(zrodlo, ['wariant_historia']));
    expect(ile(db, 'wariant_historia')).toBe(2);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
  it('import zastępuje historię (nie scala): lokalne odciski spoza pliku znikają', async () => {
    const { port: pz } = await zHistoria();
    const w = await eksportuj(pz, META);
    if (!w.ok) throw new Error(w.powod);
    const { db, port } = await przygotuj('wzorzec');
    await zapiszOdcisk(port, zapis({ odcisk: 'lokalny', szablonId: 's99' }));
    expect(await importuj(port, w.wartosc, DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(kolumnyHistorii(db).map((x) => x.odcisk)).toEqual(['a', 'b']);
  });
  it('import starego pliku v1 bez tabeli wariant_historia → ok, historia pusta (lokalna znika), reszta danych z pliku', async () => {
    const { db: zrodlo, port: pz } = await przygotuj('wzorzec');
    const w = await eksportuj(pz, META);
    if (!w.ok) throw new Error(w.powod);
    const k = JSON.parse(w.wartosc);
    delete k.dane.wariant_historia;
    const { db, port } = await przygotuj('wzorzec');
    await zapiszOdcisk(port, zapis({ odcisk: 'lokalny' }));
    expect(await importuj(port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(ile(db, 'wariant_historia')).toBe(0);
    const { wariant_historia: _a, ...reszta } = zawartosc(db, ['ustawienie', 'postep_lekcji', 'aktywnosc', 'odpowiedz', 'wynik_testu', 'karta', 'log_powtorki']);
    expect(reszta).toEqual(zawartosc(zrodlo, ['ustawienie', 'postep_lekcji', 'aktywnosc', 'odpowiedz', 'wynik_testu', 'karta', 'log_powtorki']));
  });
  it('„Usuń postęp” czyści historię', async () => {
    const { db, port } = await zHistoria();
    expect(await usunPostep(port, DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(ile(db, 'wariant_historia')).toBe(0);
  });
  it.each([
    ['zły poziom', (w: Record<string, unknown>) => { w.poziom = 'ekspert'; }],
    ['pusty odcisk', (w: Record<string, unknown>) => { w.odcisk = ''; }],
    ['ujemne ziarno', (w: Record<string, unknown>) => { w.ziarno = -1; }],
    ['ziarno nie liczba', (w: Record<string, unknown>) => { w.ziarno = '5'; }],
    ['brakująca kolumna', (w: Record<string, unknown>) => { delete w.zagrano_ms; }],
    ['kolumna spoza tabeli', (w: Record<string, unknown>) => { w.dodatkowa = 1; }],
  ])('plik z błędnym wierszem historii (%s) → bledny_plik, baza bez zmian', async (_n, psuj) => {
    const { port: pz } = await zHistoria();
    const e = await eksportuj(pz, META);
    if (!e.ok) throw new Error(e.powod);
    const k = JSON.parse(e.wartosc);
    psuj(k.dane.wariant_historia[0]);
    const { db, port } = await przygotuj('wzorzec');
    await zapiszOdcisk(port, zapis({ odcisk: 'lokalny' }));
    const przed = zawartosc(db, ['ustawienie', 'karta', 'odpowiedz', 'wariant_historia']);
    expect(await importuj(port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: false, powod: 'bledny_plik' });
    expect(zawartosc(db, ['ustawienie', 'karta', 'odpowiedz', 'wariant_historia'])).toEqual(przed);
  });
  it('plik z duplikatem (szablon, poziom, odcisk) → bledny_plik (UNIQUE), baza bez zmian', async () => {
    const { port: pz } = await zHistoria();
    const e = await eksportuj(pz, META);
    if (!e.ok) throw new Error(e.powod);
    const k = JSON.parse(e.wartosc);
    k.dane.wariant_historia.push({ ...k.dane.wariant_historia[0], id: 99 });
    const { db, port } = await przygotuj('wzorzec');
    await zapiszOdcisk(port, zapis({ odcisk: 'lokalny' }));
    const przed = zawartosc(db, ['karta', 'wariant_historia']);
    expect(await importuj(port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: false, powod: 'bledny_plik' });
    expect(zawartosc(db, ['karta', 'wariant_historia'])).toEqual(przed);
  });
  it('tabela wariant_historia w pliku nie jest tablicą → bledny_plik', async () => {
    const { port: pz } = await zHistoria();
    const e = await eksportuj(pz, META);
    if (!e.ok) throw new Error(e.powod);
    const k = JSON.parse(e.wartosc);
    k.dane.wariant_historia = 'x';
    const { port } = await przygotuj('wzorzec');
    expect(await importuj(port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: false, powod: 'bledny_plik' });
  });
});
