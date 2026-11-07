// K-02 (kontrole-07.md): migracja z kopii wydanej wersji; dane.md „Polityka migracji”; ADR 0003, 0004; wzór e1-sqlite.mjs E4a–E4f.
// Wyrocznia schematu: docs/architektura/schemat.sql (rola 05), nie kod pakietu. Wzorzec v1: tests/narzedzia/wzorzec-bazy.ts.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { afterEach, describe, expect, it } from 'vitest';
import { listaMigracji, migruj, otworzPostep } from '../../../packages/postep/src';
import { adapterNode, integralnosc, otworzNode, zawartosc } from '../../narzedzia/postep-node';
import { schematV1, zbudujWzorzecV1 } from '../../narzedzia/wzorzec-bazy';
import { katalogTymczasowy, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const schemat = (db: DatabaseSync) => db.prepare("SELECT type, name, tbl_name, sql FROM sqlite_schema WHERE name NOT LIKE 'sqlite_%' ORDER BY type, name").all();
const wersja = (db: DatabaseSync) => (db.prepare('PRAGMA user_version').get() as { user_version: number }).user_version;
const licznosci = (db: DatabaseSync) => Object.fromEntries((db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name").all() as { name: string }[])
  .map(({ name }) => [name, (db.prepare(`SELECT count(*) AS n FROM ${name}`).get() as { n: number }).n]));
const sha = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');

describe('K-02 migracje', () => {
  it('ADR 0004: lista migracji na pustej bazie daje schemat = docs/architektura/schemat.sql, user_version = 1', async () => {
    const wzor = new DatabaseSync(':memory:'); wzor.exec(schematV1());
    const db = otworzNode();
    const w = await migruj(adapterNode(db), listaMigracji());
    expect(w).toEqual({ ok: true, wartosc: 1 });
    expect(schemat(db)).toEqual(schemat(wzor));
    expect(wersja(db)).toBe(1);
  });
  it('K-02, AK-NFR-DANE-001-a: kopia wzorca v1 → otworzPostep: liczności bez zmian, integrity_check = ok, foreign_key_check pusty, user_version bieżąca; drugie otwarcie bez zmian', async () => {
    const p = join(katalogTymczasowy(), 'postep.db');
    const oczekiwane = zbudujWzorzecV1(p);
    const WSZYSTKIE = [...Object.keys(oczekiwane)];
    const d0 = otworzNode(p); const tresc = zawartosc(d0, WSZYSTKIE); d0.close();
    for (const proba of [1, 2]) {
      const db = otworzNode(p);
      const port = await otworzPostep(adapterNode(db));
      expect(licznosci(db), `otwarcie ${proba}`).toEqual(oczekiwane);
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
    const zla = { wersja: 2, sql: 'CREATE TABLE nowa (x INTEGER CHECK (x > 0)); INSERT INTO nowa SELECT krok FROM odpowiedz;' }; // wzorzec ma krok = 0
    const w = await migruj(adapterNode(db), [...listaMigracji(), zla]);
    expect(w).toEqual({ ok: false, powod: 'migracja_nieudana' });
    expect(wersja(db)).toBe(1);
    expect(licznosci(db)).toEqual(oczekiwane); // także brak tabeli `nowa`
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
