// K-02 (kontrole-07.md): migracja z kopii wydanej wersji; dane.md „Polityka migracji”; ADR 0003, 0004; wzór e1-sqlite.mjs E4a–E4f.
// Wyrocznia schematu: docs/architektura/schemat.sql (rola 05), nie kod pakietu. Wzorzec v1: tests/narzedzia/wzorzec-bazy.ts.
import { createHash } from 'node:crypto';
import { cpSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { afterEach, describe, expect, it } from 'vitest';
import { listaMigracji, migruj, otworzPostep } from '../src';
import { SCHEMAT_V2 } from '../src/schemat-v2';
import { adapterNode, integralnosc, otworzNode, zawartosc } from '../../../tests/narzedzia/postep-node';
import { schematV1, schematV2, schematV3, zbudujWzorzecV1 } from '../../../tests/narzedzia/wzorzec-bazy';
import { katalogTymczasowy, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const schemat = (db: DatabaseSync) => db.prepare("SELECT type, name, tbl_name, sql FROM sqlite_schema WHERE name NOT LIKE 'sqlite_%' ORDER BY type, name").all();
const wersja = (db: DatabaseSync) => (db.prepare('PRAGMA user_version').get() as { user_version: number }).user_version;
const licznosci = (db: DatabaseSync) => Object.fromEntries((db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name").all() as { name: string }[])
  .map(({ name }) => [name, (db.prepare(`SELECT count(*) AS n FROM ${name}`).get() as { n: number }).n]));
const sha = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');

describe('K-02 migracje', () => {
  it('ADR 0004: lista migracji na pustej bazie daje schemat = schemat.sql (v1) + schemat-v2.sql (D-532) + schemat-v3.sql (ŚR-001), user_version = 3', async () => {
    const wzor = new DatabaseSync(':memory:'); wzor.exec(schematV1()); wzor.exec(schematV2()); wzor.exec(schematV3());
    const db = otworzNode();
    const w = await migruj(adapterNode(db), listaMigracji());
    expect(w).toEqual({ ok: true, wartosc: 3 });
    expect(schemat(db)).toEqual(schemat(wzor));
    expect(wersja(db)).toBe(3);
  });
  it('K-02, AK-NFR-DANE-001-a: kopia wzorca v1 → otworzPostep: liczności bez zmian, integrity_check = ok, foreign_key_check pusty, user_version bieżąca; drugie otwarcie bez zmian', async () => {
    const p = join(katalogTymczasowy(), 'postep.db');
    const oczekiwane = zbudujWzorzecV1(p);
    const WSZYSTKIE = [...Object.keys(oczekiwane)];
    const d0 = otworzNode(p); const tresc = zawartosc(d0, WSZYSTKIE); d0.close();
    for (const proba of [1, 2]) {
      const db = otworzNode(p);
      const port = await otworzPostep(adapterNode(db));
      // D-532: wzorzec v1 nie ma `wariant_historia`; migracja v2 dodaje ją pustą, reszta liczności bez zmian
      expect(licznosci(db), `otwarcie ${proba}`).toEqual({ ...oczekiwane, wariant_historia: 0 });
      expect(zawartosc(db, WSZYSTKIE), `otwarcie ${proba}: wartości bez zmian`).toEqual(tresc);
      expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
      expect(wersja(db)).toBe(Math.max(...listaMigracji().map((m) => m.wersja)));
      await port.zamknij();
    }
  });
  it('E4e, AK-NFR-DANE-001-b: migracja z danymi łamiącymi nowe CHECK → migracja_nieudana, wersja i dane bez zmian, brak częściowych zmian', async () => {
    const p = join(katalogTymczasowy(), 'postep.db');
    const oczekiwane = zbudujWzorzecV1(p);
    const db = otworzNode(p);
    const zla = { wersja: 4, sql: 'CREATE TABLE nowa (x INTEGER CHECK (x > 0)); INSERT INTO nowa SELECT krok FROM odpowiedz;' }; // wzorzec ma krok = 0
    const w = await migruj(adapterNode(db), [...listaMigracji(), zla]);
    expect(w).toEqual({ ok: false, powod: 'migracja_nieudana' });
    expect(wersja(db)).toBe(3); // v2 (D-532) i v3 (ŚR-001) przeszły i zatwierdzone osobno; wersja 4 wycofana
    expect(licznosci(db)).toEqual({ ...oczekiwane, wariant_historia: 0 }); // także brak tabeli `nowa`
  });
  it('E4f, AK-NFR-DANE-001-c: baza nowsza niż aplikacja → baza_nowsza, plik bajt w bajt bez zmian', async () => {
    const p = join(katalogTymczasowy(), 'postep.db');
    zbudujWzorzecV1(p);
    const d = new DatabaseSync(p); d.exec('PRAGMA user_version = 99'); d.close();
    const przed = sha(p);
    const db = otworzNode(p);
    const w = await migruj(adapterNode(db), listaMigracji());
    db.close();
    expect(w).toEqual({ ok: false, powod: 'baza_nowsza' });
    expect(sha(p)).toBe(przed);
  });
});

// D-532: migracja v1 → v2 na kopii prawdziwej bazy v1 z danymi brzegowymi (wzór K-14: kopia pliku, nie budowa w locie).
describe('K-02 migracja v1 → v2 (wariant_historia, D-532)', () => {
  const WZORZEC_V1 = () => {
    const zrodlo = join(katalogTymczasowy(), 'wzorzec-v1.db');
    const oczekiwane = zbudujWzorzecV1(zrodlo);
    const kopia = join(katalogTymczasowy(), 'postep.db');
    cpSync(zrodlo, kopia);
    return { kopia, oczekiwane };
  };
  it('kopia bazy v1 z danymi → otworzPostep: user_version 3 (v1 → v2 → v3), dane v1 bez zmian (wartości), wariant_historia pusta, integrity ok', async () => {
    const { kopia, oczekiwane } = WZORZEC_V1();
    const WSZYSTKIE = Object.keys(oczekiwane);
    const d0 = otworzNode(kopia); expect(wersja(d0)).toBe(1); const przed = zawartosc(d0, WSZYSTKIE); d0.close();
    const db = otworzNode(kopia);
    const port = await otworzPostep(adapterNode(db));
    expect(wersja(db)).toBe(3);
    expect(zawartosc(db, WSZYSTKIE)).toEqual(przed);
    expect(licznosci(db)).toEqual({ ...oczekiwane, wariant_historia: 0 });
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
    const wzor = new DatabaseSync(':memory:'); wzor.exec(schematV1()); wzor.exec(schematV2()); wzor.exec(schematV3());
    expect(schemat(db)).toEqual(schemat(wzor));
    await port.zamknij();
  });
  it('migracja v2 nieudana (błąd po CREATE TABLE) → migracja_nieudana, wersja 1, brak tabeli i indeksu, dane v1 bez zmian', async () => {
    const { kopia, oczekiwane } = WZORZEC_V1();
    const db = otworzNode(kopia);
    const przed = zawartosc(db, Object.keys(oczekiwane));
    const zla = { wersja: 2, sql: `${SCHEMAT_V2}\nINSERT INTO wariant_historia (szablon_id, poziom, odcisk, ziarno, zagrano_ms) VALUES ('s', 'zly', 'o', 1, 1);` };
    const w = await migruj(adapterNode(db), [listaMigracji()[0]!, zla]);
    expect(w).toEqual({ ok: false, powod: 'migracja_nieudana' });
    expect(wersja(db)).toBe(1);
    expect(licznosci(db)).toEqual(oczekiwane); // bez wariant_historia
    expect(db.prepare("SELECT name FROM sqlite_schema WHERE name LIKE '%wariant%'").all()).toEqual([]);
    expect(zawartosc(db, Object.keys(oczekiwane))).toEqual(przed);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
  it('lista migracji: v1 bez zmian jako pierwsza, v2 = SCHEMAT_V2 (v3 osobno, wariantyHistoria-cf.test.ts)', () => {
    const l = listaMigracji();
    expect(l.map((m) => m.wersja)).toEqual([1, 2, 3]);
    expect(l[1]!.sql).toBe(SCHEMAT_V2);
  });
});
