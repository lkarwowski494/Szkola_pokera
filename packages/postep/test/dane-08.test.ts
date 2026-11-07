// Testy roli 08 do decyzji spoza testów akceptacyjnych (D-202, poprawka wzoru „Usuń postęp”) i strażnik listy kolumn eksportu.
import { DatabaseSync } from 'node:sqlite';
import { afterEach, describe, expect, it } from 'vitest';
import { TABELE_EKSPORTU } from '../../domena/src';
import { eksportuj, importuj, KOLUMNY_EKSPORTU, usunPostep } from '../src';
import { ile } from '../../../tests/narzedzia/postep-node';
import { DZIEN_WZORCA, schematV1, T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);

describe('D-202 kolumny eksportu', () => {
  it('KOLUMNY_EKSPORTU = kolumny tabel w docs/architektura/schemat.sql (kolejność i zbiór), dla każdej z 7 tabel', () => {
    const db = new DatabaseSync(':memory:'); db.exec(schematV1());
    const zSchematu = Object.fromEntries(TABELE_EKSPORTU.map((t) => [t, (db.prepare(`PRAGMA table_info(${t})`).all() as { name: string }[]).map((k) => k.name)]));
    expect(KOLUMNY_EKSPORTU).toEqual(zSchematu);
  });
  it('import: wiersz z kolumną spoza tabeli (nazwa jak fragment SQL) → bledny_plik, bez zapisu', async () => {
    const { port: pz } = await przygotuj('wzorzec');
    const w = await eksportuj(pz, { terazMs: T0, aplikacja: '1.0.0' });
    if (!w.ok) throw new Error(w.powod);
    const k = JSON.parse(w.wartosc);
    k.dane.ustawienie[0] = { ...k.dane.ustawienie[0], 'zmieniono_ms) VALUES (1,1,1); DROP TABLE karta; --': 1 };
    const { db, port } = await przygotuj('wzorzec');
    expect(await importuj(port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: false, powod: 'bledny_plik' });
    expect(ile(db, 'karta')).toBe(4);
  });
  it('import: wiersz łamiący CHECK (ocena spoza listy) → bledny_plik, dane bez zmian', async () => {
    const { port: pz } = await przygotuj('wzorzec');
    const w = await eksportuj(pz, { terazMs: T0, aplikacja: '1.0.0' });
    if (!w.ok) throw new Error(w.powod);
    const k = JSON.parse(w.wartosc);
    k.dane.odpowiedz[0].ocena = 'swietnie';
    const { db, port } = await przygotuj('wzorzec');
    expect(await importuj(port, JSON.stringify(k), DZIEN_WZORCA)).toEqual({ ok: false, powod: 'bledny_plik' });
    expect(ile(db, 'odpowiedz')).toBe(5);
  });
  it('import: dzisiejsza aktywność z limitu spoza pliku zostaje jako pusty znacznik bez odpowiedzi (D-202, ADR 0007 pkt 5)', async () => {
    const { port: pz } = await przygotuj('pusta');
    const w = await eksportuj(pz, { terazMs: T0, aplikacja: '1.0.0' });
    if (!w.ok) throw new Error(w.powod);
    const { db, port } = await przygotuj('wzorzec'); // a-scen: dziś, z limitu, w toku, z odpowiedzią
    expect(await importuj(port, w.wartosc, DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(db.prepare('SELECT id, stan, plan, krok FROM aktywnosc ORDER BY id').all().map((r) => ({ ...r })))
      .toEqual(['a-powt', 'a-scen', 'a-sesja'].map((id) => ({ id, stan: 'porzucona', plan: '{}', krok: 0 })));
    expect(ile(db, 'odpowiedz')).toBe(0);
  });
});

describe('BR-DANE-003 wynik testu przy znaczniku dnia', () => {
  it('„Usuń postęp”: dzisiejszy powtórny test z limitu zostaje znacznikiem, a jego wynik_testu znika', async () => {
    const { db, port } = await przygotuj('wzorzec');
    await port.run("INSERT INTO aktywnosc VALUES ('a-test3','test_modulu','zakonczona',1,?,'Asia/Kathmandu','{\"modul\":\"m01\"}',15,?,?)", [DZIEN_WZORCA, T0 + 5, T0 + 6]);
    await port.run("INSERT INTO wynik_testu VALUES ('a-test3', 'm01', 14, 15, 1)");
    expect(await usunPostep(port, DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(ile(db, 'wynik_testu')).toBe(0);
    expect(db.prepare("SELECT stan FROM aktywnosc WHERE id = 'a-test3'").get()).toEqual({ stan: 'porzucona' });
  });
});
