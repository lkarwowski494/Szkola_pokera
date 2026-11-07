// K-04 (ADR 0003: foreign_keys w transakcji portu = 1), kolejka zapisów (dane.md „Zapis spoza transakcji … ginie przy ROLLBACK”, wzór e1-sqlite.mjs E1b),
// K-15 (UPSERT zamiast REPLACE zachowuje wiersze podrzędne; kaskady przez port; wzór e2-schemat.mjs sekcja 4).
import { afterEach, describe, expect, it } from 'vitest';
import { zapiszKrok, zapiszPowtorke, type WierszKarty } from '../../../packages/postep/src';
import { ile, integralnosc } from '../../narzedzia/postep-node';
import { T0 } from '../../narzedzia/wzorzec-bazy';
import { przygotuj, sprzatnij } from '../../../packages/postep/test/wspolne';

afterEach(sprzatnij);

describe('K-04 klucze obce na połączeniu portu', () => {
  it('K-04: PRAGMA foreign_keys odczytane wewnątrz transakcji portu = 1 (adapter otwarty z enableForeignKeyConstraints: false)', async () => {
    const { port } = await przygotuj('pusta');
    const fk = await port.transakcja(async (tx) => (await tx.all<{ foreign_keys: number }>('PRAGMA foreign_keys'))[0]?.foreign_keys);
    expect(fk).toBe(1);
  });
  it('K-04: usunięcie karty przez port kasuje jej log (kaskada działa), foreign_key_check pusty', async () => {
    const { db, port } = await przygotuj('wzorzec');
    await port.run("DELETE FROM karta WHERE rodzina_id = 'r1'");
    expect((db.prepare("SELECT count(*) AS n FROM log_powtorki WHERE rodzina_id = 'r1'").get() as { n: number }).n).toBe(0);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
});

describe('Kolejka zapisów portu (ADR 0003)', () => {
  it('ADR 0003 / E1b: zapis spoza transakcji w czasie wycofywanej transakcji przeżywa ROLLBACK', async () => {
    const { db, port } = await przygotuj('pusta');
    const czekaj = (ms: number) => new Promise((r) => setTimeout(r, ms));
    let sygnal!: () => void;
    const wTransakcji = new Promise<void>((r) => { sygnal = r; });
    const a = port.transakcja(async (tx) => {
      await tx.run("INSERT INTO dziennik (ms, kod, ekran, wersja) VALUES (1, 'a', NULL, 't')");
      sygnal(); // B startuje na pewno w trakcie otwartej transakcji A (bez zależności od czasu)
      await czekaj(20);
      throw new Error('błąd w A');
    }).catch(() => 'A wycofana');
    await wTransakcji;
    const b = port.run("INSERT INTO dziennik (ms, kod, ekran, wersja) VALUES (2, 'b', NULL, 't')");
    await Promise.all([a, b]);
    expect(db.prepare('SELECT kod FROM dziennik ORDER BY id').all().map((r) => (r as { kod: string }).kod)).toEqual(['b']);
  });
});

describe('K-15 UPSERT zachowuje wiersze podrzędne', () => {
  it('K-15: zapis istniejącej karty (r1, 2 wpisy logu we wzorcu) dodaje wpis logu i nie kasuje starych', async () => {
    const { db, port } = await przygotuj('wzorzec');
    const karta: WierszKarty = { rodzina_id: 'r1', termin_ms: T0 + 86_400_000, stabilnosc: 4.2, trudnosc: 5.1, dni_zaplanowane: 1,
      kroki_nauki: 0, powtorzenia: 5, zapomnienia: 1, stan: 2, ostatnia_powtorka_ms: T0, zmieniono_ms: T0 + 1 };
    const w = await zapiszPowtorke(port, karta, { odpowiedz_id: null, ocena_fsrs: 3, stan_przed: 2, termin_przed_ms: T0 - 1, powtorzono_ms: T0 });
    expect(w.ok).toBe(true);
    expect((db.prepare("SELECT count(*) AS n FROM log_powtorki WHERE rodzina_id = 'r1'").get() as { n: number }).n).toBe(3);
    expect(db.prepare("SELECT stabilnosc, powtorzenia, zmieniono_ms FROM karta WHERE rodzina_id = 'r1'").get()).toEqual({ stabilnosc: 4.2, powtorzenia: 5, zmieniono_ms: T0 + 1 });
    expect(ile(db, 'karta')).toBe(4);
  });
  it('K-15 / ADR 0010: ponowny zapis tego samego kroku po przerwaniu: ten sam id odpowiedzi, jeden wiersz, log z odpowiedz_id zostaje', async () => {
    const { db, port } = await przygotuj('wzorzec');
    const id0 = (db.prepare("SELECT id FROM odpowiedz WHERE aktywnosc_id = 'a-sesja' AND krok = 0").get() as { id: number }).id;
    const w = await zapiszKrok(port, 'a-sesja', { krok: 0, zadanie_id: 'z1', rodzina_id: 'r1', wybor: '{"akcja":"call"}', ocena: 'blad', zaliczona: 0, czas_ms: 900, odpowiedziano_ms: T0 + 99 });
    expect(w).toEqual({ ok: true, wartosc: id0 });
    expect((db.prepare("SELECT count(*) AS n FROM odpowiedz WHERE aktywnosc_id = 'a-sesja'").get() as { n: number }).n).toBe(3);
    expect(db.prepare('SELECT wybor, ocena FROM odpowiedz WHERE id = ?').get(id0)).toEqual({ wybor: '{"akcja":"call"}', ocena: 'blad' });
    expect((db.prepare('SELECT count(*) AS n FROM log_powtorki WHERE odpowiedz_id = ?').get(id0) as { n: number }).n).toBe(1);
  });
});
