// K-11 (kontrole-07.md): eksport → import bez różnic (NFR-DANE-002, BR-DANE-001/002), awaria w środku importu → dane bez zmian,
// złe pliki odrzucone przed dotknięciem bazy, „Usuń postęp” (BR-DANE-003) zostawia dzisiejsze zużycie limitu i pamięć uprawnień.
// Algorytmy-wzory: docs/architektura/eksperymenty/e2-schemat.mjs sekcje 6–7; format: dane.md „Format eksportu (wersja 1)”.
import { afterEach, describe, expect, it } from 'vitest';
import { eksportuj, importuj, usunPostep } from '../../../packages/postep/src';
import { ile, integralnosc, TABELE_EKSPORTU, zawartosc, type Zdarzenie } from '../../narzedzia/postep-node';
import { DZIEN_WZORCA, T0 } from '../../narzedzia/wzorzec-bazy';
import { bladIO, przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const META = { terazMs: T0, aplikacja: '1.0.0' };
async function plikZWzorca(): Promise<string> {
  const { port } = await przygotuj('wzorzec');
  const w = await eksportuj(port, META);
  if (!w.ok) throw new Error(`eksport: ${w.powod}`);
  return w.wartosc;
}
const zuzycie = (db: import('node:sqlite').DatabaseSync, dzien: string) =>
  (db.prepare('SELECT count(*) AS n FROM aktywnosc WHERE dzien_lokalny = ? AND z_limitu = 1').get(dzien) as { n: number }).n;

describe('K-11 eksport', () => {
  it('BR-DANE-001 / ADR 0008: koperta z 7 tabelami postępu = zawartość bazy; bez uprawnienie_cache i dziennika', async () => {
    const { db, port } = await przygotuj('wzorzec');
    const w = await eksportuj(port, META);
    expect(w.ok).toBe(true);
    const k = JSON.parse(w.ok ? w.wartosc : '{}');
    expect({ format: k.format, wersja_formatu: k.wersja_formatu, utworzono: k.utworzono, aplikacja: k.aplikacja })
      .toEqual({ format: 'szkola-pokera-postep', wersja_formatu: 1, utworzono: new Date(T0).toISOString(), aplikacja: '1.0.0' });
    expect(Object.keys(k.dane).sort()).toEqual([...TABELE_EKSPORTU].sort());
    const posortowane = Object.fromEntries(TABELE_EKSPORTU.map((t) => [t, [...k.dane[t]].sort((a, b) => JSON.stringify(a) < JSON.stringify(b) ? -1 : 1)]));
    const zBazy = Object.fromEntries(Object.entries(zawartosc(db)).map(([t, w_]) => [t, [...w_].sort((a, b) => JSON.stringify(a) < JSON.stringify(b) ? -1 : 1)]));
    expect(posortowane).toEqual(zBazy);
  });
});

describe('K-11 import', () => {
  it('NFR-DANE-002: eksport → import na czystej instalacji: 0 różnic w 7 tabelach, integrity ok', async () => {
    const { db: zrodlo, port: pz } = await przygotuj('wzorzec');
    const w = await eksportuj(pz, META);
    if (!w.ok) throw new Error(`eksport: ${w.powod}`);
    const { db, port } = await przygotuj('pusta');
    expect(await importuj(port, w.wartosc, '2026-11-04')).toEqual({ ok: true, wartosc: undefined });
    expect(zawartosc(db)).toEqual(zawartosc(zrodlo));
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
  it('ADR 0006/0007: import nie rusza pamięci uprawnień, a dzisiejsze aktywności z limitu spoza pliku zostają', async () => {
    const plik = await plikZWzorca();
    const { db, port } = await przygotuj('pusta');
    await port.run("INSERT INTO aktywnosc VALUES ('dzis-x','sesja','zakonczona',1,?,'Asia/Kathmandu','{}',0,?,?)", [DZIEN_WZORCA, T0 + 10, T0 + 11]);
    await port.run("INSERT INTO uprawnienie_cache VALUES ('pl.lkarwowski.szkolapokera.kwartal', ?, ?)", [T0 + 1, T0]);
    expect((await importuj(port, plik, DZIEN_WZORCA)).ok).toBe(true);
    expect(ile(db, 'uprawnienie_cache')).toBe(1);
    expect(db.prepare("SELECT id FROM aktywnosc WHERE id = 'dzis-x'").all()).toHaveLength(1);
    expect(zuzycie(db, DZIEN_WZORCA)).toBe(4); // 3 z pliku + 1 lokalna
  });
  it.each([
    ['nowsza_wersja', (p: string) => JSON.stringify({ ...JSON.parse(p), wersja_formatu: 2 })],
    ['bledny_plik', () => JSON.stringify({ format: 'inny', wersja_formatu: 1, dane: {} })],
    ['bledny_plik', (p: string) => p.slice(0, Math.floor(p.length / 2))],
    ['bledny_plik', (p: string) => { const k = JSON.parse(p); delete k.dane.karta; return JSON.stringify(k); }],
  ])('BR-DANE-002: plik odrzucony (%s) przed dotknięciem bazy, dane bez zmian', async (powod, zepsuj) => {
    const plik = await plikZWzorca();
    const { db, port } = await przygotuj('wzorzec');
    const przed = zawartosc(db, [...TABELE_EKSPORTU, 'uprawnienie_cache', 'dziennik']);
    expect(await importuj(port, zepsuj(plik), DZIEN_WZORCA)).toEqual({ ok: false, powod });
    expect(zawartosc(db, [...TABELE_EKSPORTU, 'uprawnienie_cache', 'dziennik'])).toEqual(przed);
  });
  it('ADR 0008 / R-14: błąd zapisu w środku importu (SQLITE_IOERR po 10. INSERT) → ok: false, ROLLBACK, dane bez zmian', async () => {
    const plik = await plikZWzorca();
    let wstawien = 0, wlacz = false;
    const zdarzenie = (z: Zdarzenie) => { if (wlacz && z.rodzaj === 'run' && /^\s*INSERT/i.test(z.sql) && ++wstawien > 10) throw bladIO(); };
    const { db, port } = await przygotuj('pusta', { zdarzenie });
    await port.run("INSERT INTO ustawienie VALUES ('jezyk', '\"de\"', 1)");
    await port.run("INSERT INTO postep_lekcji VALUES ('m09-l1', 1, '{}', NULL, 1)");
    const przed = zawartosc(db);
    wlacz = true;
    const w = await importuj(port, plik, DZIEN_WZORCA);
    expect(w.ok).toBe(false);
    expect(wstawien).toBeGreaterThan(10); // awaria nastąpiła w środku, nie przed importem
    expect(zawartosc(db)).toEqual(przed);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
});

describe('K-11 „Usuń postęp”', () => {
  it('BR-DANE-003: postęp pusty; dzisiejsze zużycie limitu (3 znaczniki) i pamięć uprawnień zostają; integrity ok', async () => {
    const { db, port } = await przygotuj('wzorzec');
    expect(zuzycie(db, DZIEN_WZORCA)).toBe(3);
    expect(await usunPostep(port, DZIEN_WZORCA)).toEqual({ ok: true, wartosc: undefined });
    expect(Object.fromEntries(['odpowiedz', 'karta', 'log_powtorki', 'postep_lekcji', 'wynik_testu', 'ustawienie', 'dziennik'].map((t) => [t, ile(db, t)])))
      .toEqual({ odpowiedz: 0, karta: 0, log_powtorki: 0, postep_lekcji: 0, wynik_testu: 0, ustawienie: 0, dziennik: 0 });
    expect(zuzycie(db, DZIEN_WZORCA)).toBe(3);
    expect((db.prepare('SELECT count(*) AS n FROM aktywnosc WHERE NOT (dzien_lokalny = ? AND z_limitu = 1)').get(DZIEN_WZORCA) as { n: number }).n).toBe(0);
    expect(db.prepare("SELECT DISTINCT stan, plan FROM aktywnosc").all()).toEqual([{ stan: 'porzucona', plan: '{}' }]); // dane.md: puste znaczniki
    expect(ile(db, 'uprawnienie_cache')).toBe(2);
    expect(integralnosc(db)).toEqual({ integrity: 'ok', kluczeObce: 0 });
  });
});
