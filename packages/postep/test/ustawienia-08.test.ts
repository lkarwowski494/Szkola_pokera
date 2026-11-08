// Repozytorium `ustawienia` (rola 08 cz. 5 krok 1; moduly.md „Repozytoria”; ADR 0003: UPSERT, nie REPLACE).
import { afterEach, describe, expect, it } from 'vitest';
import { odczytajUstawienie, zapiszUstawienie } from '../src';
import { ile } from '../../../tests/narzedzia/postep-node';
import { bladIO, przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);

describe('ustawienia', () => {
  it('brak klucza → null (brak zostaje brakiem)', async () => {
    const { port } = await przygotuj('pusta');
    expect(await odczytajUstawienie(port, 'punkt_startu')).toEqual({ ok: true, wartosc: null });
  });
  it('zapis i odczyt wartości JSON (obiekt, boolean, liczba)', async () => {
    const { port } = await przygotuj('pusta');
    expect(await zapiszUstawienie(port, 'punkt_startu', { modulId: 'M2' }, 1000)).toEqual({ ok: true, wartosc: undefined });
    await zapiszUstawienie(port, 'haptyka', false, 1000);
    await zapiszUstawienie(port, 'n', 0, 1000);
    expect(await odczytajUstawienie(port, 'punkt_startu')).toEqual({ ok: true, wartosc: { modulId: 'M2' } });
    expect(await odczytajUstawienie(port, 'haptyka')).toEqual({ ok: true, wartosc: false });
    expect(await odczytajUstawienie(port, 'n')).toEqual({ ok: true, wartosc: 0 });
  });
  it('ponowny zapis klucza: UPSERT (jeden wiersz, nowa wartość i zmieniono_ms), inne klucze nietknięte', async () => {
    const { db, port } = await przygotuj('pusta');
    await zapiszUstawienie(port, 'a', 1, 1000);
    await zapiszUstawienie(port, 'b', 'x', 1000);
    await zapiszUstawienie(port, 'a', 2, 2000);
    expect(ile(db, 'ustawienie')).toBe(2);
    expect(db.prepare('SELECT klucz, wartosc, zmieniono_ms FROM ustawienie ORDER BY klucz').all()).toEqual([
      { klucz: 'a', wartosc: '2', zmieniono_ms: 2000 },
      { klucz: 'b', wartosc: '"x"', zmieniono_ms: 1000 },
    ]);
  });
  it('wartość nie do zapisania w JSON (undefined) → zapis_nieudany, bez zapisu', async () => {
    const { db, port } = await przygotuj('pusta');
    expect(await zapiszUstawienie(port, 'a', undefined, 1000)).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(ile(db, 'ustawienie')).toBe(0);
  });
  it('błąd bazy przy zapisie → zapis_nieudany; przy odczycie → odczyt_nieudany (nie null)', async () => {
    const { port } = await przygotuj('pusta');
    const zepsuty = { ...port, run: async () => { throw bladIO(); }, all: async () => { throw bladIO(); }, transakcja: async () => { throw bladIO(); } };
    expect(await zapiszUstawienie(zepsuty, 'a', 1, 1000)).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(await odczytajUstawienie(zepsuty, 'a')).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});
