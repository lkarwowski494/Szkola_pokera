// ŚR-001 (KO-058 A, D-730…D-734): kolumna `generator_wersja` w `wariant_historia` (migracja v3).
// Migracja na kopii bazy v2 z wpisami (wpisy sprzed = 0), zapis bieżącej wersji, odczyt, eksport, import starego pliku, kopia.
import { cpSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { afterEach, describe, expect, it } from 'vitest';
import { eksportuj, importuj, listaMigracji, migruj, odczytajOdciski, otworzPostep, zapiszOdcisk } from '../src';
import { SCHEMAT_V3 } from '../src/schemat-v3';
import { adapterNode, integralnosc, otworzNode, zawartosc } from '../../../tests/narzedzia/postep-node';
import { DZIEN_WZORCA, schematV1, schematV2, schematV3, T0, zbudujWzorzecV1 } from '../../../tests/narzedzia/wzorzec-bazy';
import { katalogTymczasowy, przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const META = { terazMs: T0, aplikacja: '1.0.0' };
const wersja = (db: DatabaseSync) => (db.prepare('PRAGMA user_version').get() as { user_version: number }).user_version;
const schemat = (db: DatabaseSync) => db.prepare("SELECT type, name, tbl_name, sql FROM sqlite_schema WHERE name NOT LIKE 'sqlite_%' ORDER BY type, name").all();
const historia = (db: DatabaseSync) => db.prepare('SELECT * FROM wariant_historia ORDER BY id').all().map((w) => ({ ...w }));

// Kopia prawdziwej bazy v2 (wzorzec v1 + migracja v2 + wpisy historii): plik, który użytkownik miał przed tą wersją aplikacji.
function bazaV2(): { kopia: string; oczekiwane: Record<string, number> } {
  const zrodlo = join(katalogTymczasowy(), 'wzorzec-v2.db');
  const oczekiwane = zbudujWzorzecV1(zrodlo);
  const d = new DatabaseSync(zrodlo, { enableForeignKeyConstraints: true });
  d.exec(schematV2()); d.exec('PRAGMA user_version = 2');
  const ins = d.prepare('INSERT INTO wariant_historia (szablon_id, poziom, odcisk, ziarno, zagrano_ms) VALUES (?, ?, ?, ?, ?)');
  ins.run('s01', 'latwy', 'o1', 11, T0); ins.run('s01', 'latwy', 'o2', 22, T0 + 1); ins.run('s02', 'trudny', 'o3', 33, T0 + 2);
  d.close();
  const kopia = join(katalogTymczasowy(), 'postep.db');
  cpSync(zrodlo, kopia);
  return { kopia, oczekiwane };
}

describe('ŚR-001 migracja v2 → v3 (generator_wersja)', () => {
  it('lista migracji: 1, 2, 3; v3 = SCHEMAT_V3', () => {
    const l = listaMigracji();
    expect(l.map((m) => m.wersja)).toEqual([1, 2, 3]);
    expect(l[2]!.sql).toBe(SCHEMAT_V3);
  });
  it('kopia bazy v2 z wpisami → otworzPostep: user_version 3, wpisy sprzed = 0, reszta pól i dane v1 bez zmian, integrity ok, schemat = v1+v2+v3', async () => {
    const { kopia, oczekiwane } = bazaV2();
    const d0 = otworzNode(kopia); expect(wersja(d0)).toBe(2);
    const przed = historia(d0); const dane1 = zawartosc(d0, Object.keys(oczekiwane)); d0.close();
    const db = otworzNode(kopia);
    const port = await otworzPostep(adapterNode(db));
    expect(wersja(db)).toBe(3);
    expect(historia(db)).toEqual(przed.map((w) => ({ ...w, generator_wersja: 0 })));
    expect(zawartosc(db, Object.keys(oczekiwane))).toEqual(dane1);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
    const wzor = new DatabaseSync(':memory:'); wzor.exec(schematV1()); wzor.exec(schematV2()); wzor.exec(schematV3());
    expect(schemat(db)).toEqual(schemat(wzor));
    expect(await odczytajOdciski(port, 's01', 'latwy')).toEqual({ ok: true, wartosc: [
      { odcisk: 'o1', ziarno: 11, zagranoMs: T0, generatorWersja: 0 }, { odcisk: 'o2', ziarno: 22, zagranoMs: T0 + 1, generatorWersja: 0 },
    ] });
    await port.zamknij();
  });
  it('migracja v3 nieudana (błąd po ALTER) → migracja_nieudana, wersja 2, bez kolumny, wpisy bez zmian', async () => {
    const { kopia } = bazaV2();
    const db = otworzNode(kopia);
    const przed = historia(db);
    const zla = { wersja: 3, sql: `${SCHEMAT_V3}\nINSERT INTO wariant_historia (szablon_id, poziom, odcisk, ziarno, zagrano_ms, generator_wersja) VALUES ('s', 'latwy', 'x', 1, 1, -1);` };
    expect(await migruj(adapterNode(db), [...listaMigracji().slice(0, 2), zla])).toEqual({ ok: false, powod: 'migracja_nieudana' });
    expect(wersja(db)).toBe(2);
    expect((db.prepare('PRAGMA table_info(wariant_historia)').all() as { name: string }[]).map((k) => k.name)).not.toContain('generator_wersja');
    expect(historia(db)).toEqual(przed);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
  it('kolumna odrzuca wersję ujemną (CHECK)', () => {
    const db = new DatabaseSync(':memory:'); db.exec(schematV1()); db.exec(schematV2()); db.exec(schematV3());
    expect(() => db.exec("INSERT INTO wariant_historia (szablon_id, poziom, odcisk, ziarno, zagrano_ms, generator_wersja) VALUES ('s', 'latwy', 'o', 1, 1, -1)")).toThrow();
  });
});

describe('ŚR-001 zapis i odczyt wersji generatora', () => {
  const zapis = (o: { odcisk: string; generatorWersja?: number; ziarno?: number; terazMs?: number }) =>
    ({ szablonId: 's01', poziom: 'latwy' as const, ziarno: 1, terazMs: T0, generatorWersja: 1, ...o });
  it('zapiszOdcisk zapisuje wersję przekazaną przez wywołującego (bieżący GENERATOR_WERSJA), odczytajOdciski ją zwraca', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'a', generatorWersja: 3 }));
    expect(historia(db)[0]).toMatchObject({ odcisk: 'a', generator_wersja: 3 });
    expect(await odczytajOdciski(port, 's01', 'latwy')).toEqual({ ok: true, wartosc: [{ odcisk: 'a', ziarno: 1, zagranoMs: T0, generatorWersja: 3 }] });
  });
  it('ten sam odcisk zagrany nową wersją: UPSERT podnosi wersję i ziarno razem (jeden wiersz, nie dubel)', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'a', ziarno: 5, generatorWersja: 1, terazMs: T0 }));
    await zapiszOdcisk(port, zapis({ odcisk: 'a', ziarno: 9, generatorWersja: 2, terazMs: T0 + 1 }));
    expect(historia(db)).toHaveLength(1);
    expect(historia(db)[0]).toMatchObject({ odcisk: 'a', ziarno: 9, generator_wersja: 2 });
  });
  it('niecałkowita albo ujemna wersja → zapis_nieudany, nic nie zapisane', async () => {
    const { db, port } = await przygotuj('pusta');
    expect(await zapiszOdcisk(port, zapis({ odcisk: 'a', generatorWersja: -1 }))).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(historia(db)).toHaveLength(0);
  });
  it('odczytajOdciski: kolumna generator_wersja o złym typie → odczyt_nieudany (nie udaje wersji 0)', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszOdcisk(port, zapis({ odcisk: 'a' }));
    db.exec("UPDATE wariant_historia SET generator_wersja = 'x'"); // SQLite z afinicją INTEGER przyjmuje tekst
    expect(await odczytajOdciski(port, 's01', 'latwy')).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});

describe('ŚR-001 eksport, import i kopia obejmują kolumnę', () => {
  it('eksport → import w nowej bazie: generator_wersja zachowana, także 0', async () => {
    const z = await przygotuj('pusta');
    await zapiszOdcisk(z.port, { szablonId: 's01', poziom: 'latwy', odcisk: 'a', ziarno: 1, terazMs: T0, generatorWersja: 4 });
    z.db.exec("INSERT INTO wariant_historia (szablon_id, poziom, odcisk, ziarno, zagrano_ms, generator_wersja) VALUES ('s01', 'latwy', 'stary', 2, 5, 0)");
    const w = await eksportuj(z.port, META);
    if (!w.ok) throw new Error(w.powod);
    expect(JSON.parse(w.wartosc).dane.wariant_historia.map((x: Record<string, unknown>) => x.generator_wersja).sort()).toEqual([0, 4]);
    const cel = await przygotuj('pusta');
    expect(await importuj(cel.port, w.wartosc, DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(historia(cel.db)).toEqual(historia(z.db));
  });
  it('import pliku sprzed kolumny (wiersze wariant_historia bez generator_wersja) → wpisy z wersją 0, nie błędny plik', async () => {
    const z = await przygotuj('pusta');
    await zapiszOdcisk(z.port, { szablonId: 's01', poziom: 'latwy', odcisk: 'a', ziarno: 7, terazMs: T0, generatorWersja: 2 });
    const w = await eksportuj(z.port, META);
    if (!w.ok) throw new Error(w.powod);
    const k = JSON.parse(w.wartosc);
    k.dane.wariant_historia = k.dane.wariant_historia.map(({ generator_wersja: _g, ...reszta }: Record<string, unknown>) => reszta);
    const cel = await przygotuj('pusta');
    expect(await importuj(cel.port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(historia(cel.db)).toMatchObject([{ odcisk: 'a', ziarno: 7, generator_wersja: 0 }]);
  });
  it.each([-1, 1.5, '2', null])('import: generator_wersja = %j → bledny_plik, baza bez zmian', async (zla) => {
    const z = await przygotuj('pusta');
    await zapiszOdcisk(z.port, { szablonId: 's01', poziom: 'latwy', odcisk: 'a', ziarno: 7, terazMs: T0, generatorWersja: 2 });
    const w = await eksportuj(z.port, META);
    if (!w.ok) throw new Error(w.powod);
    const k = JSON.parse(w.wartosc);
    k.dane.wariant_historia[0].generator_wersja = zla;
    const cel = await przygotuj('pusta');
    await zapiszOdcisk(cel.port, { szablonId: 's09', poziom: 'latwy', odcisk: 'istniejacy', ziarno: 3, terazMs: T0, generatorWersja: 1 });
    const przed = historia(cel.db);
    expect(await importuj(cel.port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: false, powod: 'bledny_plik' });
    expect(historia(cel.db)).toEqual(przed);
  });
  it('import: wiersz z nadmiarową kolumną nadal bledny_plik (opcjonalna jest tylko generator_wersja)', async () => {
    const z = await przygotuj('pusta');
    await zapiszOdcisk(z.port, { szablonId: 's01', poziom: 'latwy', odcisk: 'a', ziarno: 7, terazMs: T0, generatorWersja: 2 });
    const w = await eksportuj(z.port, META);
    if (!w.ok) throw new Error(w.powod);
    const k = JSON.parse(w.wartosc);
    k.dane.wariant_historia[0].obca = 1;
    const cel = await przygotuj('pusta');
    expect(await importuj(cel.port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: false, powod: 'bledny_plik' });
  });
});
