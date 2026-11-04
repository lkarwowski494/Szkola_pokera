// K-10 (kontrole-07.md; ADR 0013 pkt 3–4, „Potwierdzenie”): każda długa operacja woła rozpocznij przed pierwszą instrukcją
// i zakoncz dokładnie raz (także przy wyjątku); wygaśnięcie w środku importu → przerwano_w_tle, dane bez zmian, integrity ok.
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { eksportuj, importuj, kopiaBazy, listaMigracji, migruj, usunPostep, type PortBazy } from '../../../packages/postep/src';
import { atrapaOchrony } from '../../narzedzia/ochrona-atrapa';
import { adapterNode, integralnosc, otworzNode, zawartosc, type Zdarzenie } from '../../narzedzia/postep-node';
import { DZIEN_WZORCA, T0, zbudujWzorzecV1 } from '../../narzedzia/wzorzec-bazy';
import { bladIO, katalogTymczasowy, przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);

async function zOchrona() {
  const dziennik: string[] = [];
  const atrapa = atrapaOchrony(dziennik);
  let awaria: ((z: Zdarzenie) => void) | null = null;
  const zdarzenie = (z: Zdarzenie) => { dziennik.push(`sql:${z.sql}`); awaria?.(z); };
  const p = await przygotuj('wzorzec', { zdarzenie, ochrona: atrapa.ochrona });
  return { ...p, dziennik, atrapa, ustawAwarie: (f: ((z: Zdarzenie) => void) | null) => { awaria = f; } };
}
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
    expect([...atrapa.zakonczenia.values()]).toEqual([1]);
    expect(atrapa.otwarte.size).toBe(0);
  });
  it.each(OPERACJE.filter(([n]) => n !== 'kopia VACUUM INTO'))('ADR 0013 pkt 3: %s z błędem zapisu — zakoncz dokładnie raz, wynik ok: false', async (_n, op) => {
    const plik = await plikEksportu();
    const { port, atrapa, ustawAwarie } = await zOchrona();
    ustawAwarie(() => { throw bladIO(); });
    expect((await op(port, plik)).ok).toBe(false);
    expect([...atrapa.zakonczenia.values()]).toEqual([1]);
    expect(atrapa.otwarte.size).toBe(0);
  });
  it('ADR 0013 pkt 4: wygaśnięcie czasu w środku importu → przerwano_w_tle, liczności i zawartość bez zmian, integrity ok', async () => {
    const plik = await plikEksportu();
    const { db, port, atrapa, ustawAwarie } = await zOchrona();
    await port.run("INSERT INTO ustawienie VALUES ('jezyk', '\"vi\"', 1)"); // stan odróżnialny od pliku
    const przed = zawartosc(db);
    let wstawien = 0;
    ustawAwarie((z) => { if (z.rodzaj === 'run' && /^\s*INSERT/i.test(z.sql) && ++wstawien === 5) atrapa.wygasnij(); });
    expect(await importuj(port, plik, DZIEN_WZORCA)).toEqual({ ok: false, powod: 'przerwano_w_tle' });
    expect(wstawien).toBeGreaterThanOrEqual(5);
    expect(zawartosc(db)).toEqual(przed);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
    expect([...atrapa.zakonczenia.values()]).toEqual([1]);
  });
  it('ADR 0013 pkt 3, 7: migracja z przebudową — rozpocznij przed foreign_keys=OFF/BEGIN, zakoncz raz', async () => {
    const p = join(katalogTymczasowy(), 'postep.db');
    zbudujWzorzecV1(p);
    const dziennik: string[] = [];
    const atrapa = atrapaOchrony(dziennik);
    const db = otworzNode(p);
    const przebudowa = { wersja: 2, przebudowa: true, sql: `CREATE TABLE dziennik_n (id INTEGER PRIMARY KEY, ms INTEGER NOT NULL, kod TEXT NOT NULL CHECK (length(kod) > 0), ekran TEXT, wersja TEXT NOT NULL);
      INSERT INTO dziennik_n SELECT * FROM dziennik; DROP TABLE dziennik; ALTER TABLE dziennik_n RENAME TO dziennik;` };
    const w = await migruj(adapterNode(db, (z) => dziennik.push(`sql:${z.sql}`)), [...listaMigracji(), przebudowa], atrapa.ochrona);
    expect(w).toEqual({ ok: true, wartosc: 2 });
    const r = dziennik.findIndex((x) => x.startsWith('rozpocznij:'));
    const start = dziennik.findIndex((x) => /foreign_keys\s*=\s*OFF|BEGIN|dziennik_n/i.test(x));
    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThan(start);
    expect([...atrapa.zakonczenia.values()]).toEqual([1]);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
});
