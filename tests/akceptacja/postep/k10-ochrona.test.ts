// K-10 (kontrole-07.md; ADR 0013 pkt 3–4, „Potwierdzenie”): każda długa operacja woła rozpocznij przed pierwszą instrukcją
// i zakoncz dokładnie raz (także przy wyjątku); wygaśnięcie w środku importu → przerwano_w_tle, dane bez zmian, integrity ok.
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { eksportuj, importuj, kopiaBazy, listaMigracji, migruj, usunPostep, type PortBazy } from '../../../packages/postep/src';
import { atrapaOchrony } from '../../narzedzia/ochrona-atrapa';
import { adapterNode, integralnosc, otworzNode, zawartosc, type Zdarzenie } from '../../narzedzia/postep-node';
import { DZIEN_WZORCA, T0, zbudujWzorzecV1 } from '../../narzedzia/wzorzec-bazy';
import { bladIO, katalogTymczasowy, przygotuj, sprzatnij } from '../../../packages/postep/test/wspolne';

afterEach(sprzatnij);

async function zOchrona() {
  const dziennik: string[] = [];
  const atrapa = atrapaOchrony(dziennik);
  let awaria: ((z: Zdarzenie) => void) | null = null;
  const zdarzenie = (z: Zdarzenie) => { dziennik.push(`sql:${z.sql}`); awaria?.(z); };
  const p = await przygotuj('wzorzec', { zdarzenie, ochrona: atrapa.ochrona });
  return { ...p, dziennik, atrapa, ustawAwarie: (f: ((z: Zdarzenie) => void) | null) => { awaria = f; } };
}
// Każde rozpoczęte id zakończone dokładnie raz (import może zawierać chronioną kopię: ADR 0008 pkt 2, ADR 0013 pkt 3).
const jedenRaz = (z: Map<number, number>) => z.size > 0 && [...z.values()].every((n) => n === 1);
function sprawdzKolejnosc(dziennik: string[], od: number) {
  const fragment = dziennik.slice(od);
  const r = fragment.findIndex((x) => x.startsWith('rozpocznij:'));
  const pierwszaInstrukcja = fragment.findIndex((x) => x.startsWith('sql:'));
  expect(r, `brak rozpocznij w: ${fragment.slice(0, 5).join(' | ')}`).toBeGreaterThanOrEqual(0);
  expect(r).toBeLessThan(pierwszaInstrukcja === -1 ? Infinity : pierwszaInstrukcja);
}

describe('K-10 ochrona długich operacji', () => {
  const plikEksportu = async () => {
    const { port } = await przygotuj('wzorzec');
    const w = await eksportuj(port, { terazMs: T0, aplikacja: '1.0.0' });
    if (!w.ok) throw new Error(w.powod);
    return w.wartosc;
  };
  const OPERACJE: [string, (port: PortBazy, plik: string) => Promise<{ ok: boolean }>][] = [
    ['eksport', (port) => eksportuj(port, { terazMs: T0, aplikacja: '1.0.0' })],
    ['import', (port, plik) => importuj(port, plik, DZIEN_WZORCA)],
    ['kopia VACUUM INTO', (port) => kopiaBazy(port, join(katalogTymczasowy(), 'kopia.db'))],
    ['Usuń postęp', (port) => usunPostep(port, DZIEN_WZORCA)],
  ];
  it.each(OPERACJE)('ADR 0013 pkt 3: %s — rozpocznij przed pierwszą instrukcją, zakoncz dokładnie raz', async (_n, op) => {
    const plik = await plikEksportu();
    const { port, dziennik, atrapa } = await zOchrona();
    const od = dziennik.length;
    expect((await op(port, plik)).ok).toBe(true);
    sprawdzKolejnosc(dziennik, od);
    expect(jedenRaz(atrapa.zakonczenia)).toBe(true);
    expect(atrapa.otwarte.size).toBe(0);
  });
  it.each(OPERACJE.filter(([n]) => n !== 'kopia VACUUM INTO'))('ADR 0013 pkt 3: %s z błędem zapisu — zakoncz dokładnie raz, wynik ok: false', async (_n, op) => {
    const plik = await plikEksportu();
    const { port, atrapa, ustawAwarie } = await zOchrona();
    ustawAwarie(() => { throw bladIO(); });
    expect((await op(port, plik)).ok).toBe(false);
    expect(jedenRaz(atrapa.zakonczenia)).toBe(true);
    expect(atrapa.otwarte.size).toBe(0);
  });
  it('ADR 0013 pkt 4: wygaśnięcie czasu w środku importu → przerwano_w_tle, liczności i zawartość bez zmian, integrity ok', async () => {
    const plik = await plikEksportu();
    const { db, port, atrapa, ustawAwarie } = await zOchrona();
    await port.run("UPDATE ustawienie SET wartosc = '\"vi\"' WHERE klucz = 'jezyk'"); // stan odróżnialny od pliku
    const przed = zawartosc(db);
    let wstawien = 0;
    ustawAwarie((z) => { if (z.rodzaj !== 'all' && /\bINSERT\b/i.test(z.sql) && ++wstawien === 2) atrapa.wygasnij(); });
    expect(await importuj(port, plik, DZIEN_WZORCA)).toEqual({ ok: false, powod: 'przerwano_w_tle' });
    expect(wstawien).toBeGreaterThanOrEqual(2);
    expect(zawartosc(db)).toEqual(przed);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
    expect(jedenRaz(atrapa.zakonczenia)).toBe(true);
  });
  it('ADR 0013 pkt 3, 7; dane.md E4d: migracja z przebudową tabeli nadrzędnej (karta) — ochrona, log_powtorki bez zmian, foreign_keys wraca do 1', async () => {
    const p = join(katalogTymczasowy(), 'postep.db');
    zbudujWzorzecV1(p);
    const dziennik: string[] = [];
    const atrapa = atrapaOchrony(dziennik);
    const db = otworzNode(p);
    db.exec('PRAGMA foreign_keys = ON'); // jak otworzPostep przed migruj (moduly.md)
    const logi = (db.prepare('SELECT count(*) AS n FROM log_powtorki').get() as { n: number }).n;
    const kartaSql = (db.prepare("SELECT sql FROM sqlite_schema WHERE name = 'karta'").get() as { sql: string }).sql;
    const przebudowa = { wersja: 2, przebudowa: true, sql: `${kartaSql.replace('CREATE TABLE karta', 'CREATE TABLE karta_n')};
      INSERT INTO karta_n SELECT * FROM karta; DROP TABLE karta; ALTER TABLE karta_n RENAME TO karta;
      CREATE INDEX idx_karta_termin ON karta(termin_ms);` };
    const w = await migruj(adapterNode(db, (z) => dziennik.push(`sql:${z.sql}`)), [...listaMigracji(), przebudowa], atrapa.ochrona);
    expect(w).toEqual({ ok: true, wartosc: 2 });
    const r = dziennik.findIndex((x) => x.startsWith('rozpocznij:'));
    const start = dziennik.findIndex((x) => /foreign_keys\s*=\s*OFF|BEGIN|karta_n/i.test(x));
    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThan(start);
    expect(jedenRaz(atrapa.zakonczenia)).toBe(true);
    expect((db.prepare('SELECT count(*) AS n FROM log_powtorki').get() as { n: number }).n).toBe(logi);
    expect((db.prepare('PRAGMA foreign_keys').get() as { foreign_keys: number }).foreign_keys).toBe(1);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
});
