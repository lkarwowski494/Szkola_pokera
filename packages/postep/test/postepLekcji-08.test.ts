// Repozytorium `postepLekcji` (rola 08 cz. 5 krok 2; moduly.md „Repozytoria”, „Kurs”; ADR 0003: UPSERT, pola spoza zapisu nietknięte).
import { afterEach, describe, expect, it } from 'vitest';
import { odczytajPostepLekcji, oznaczTeoriePrzeczytana } from '../src';
import { T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { bladIO, przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const D = 86_400_000;

describe('postepLekcji', () => {
  it('pusta baza → pusta lista', async () => {
    const { port } = await przygotuj('pusta');
    expect(await odczytajPostepLekcji(port)).toEqual({ ok: true, wartosc: [] });
  });
  it('odczyt wzorca v1: teoria jako boolean, brak ukończenia zostaje null', async () => {
    const { port } = await przygotuj('wzorzec');
    expect(await odczytajPostepLekcji(port)).toEqual({ ok: true, wartosc: [
      { lekcjaId: 'm01-l1', teoriaPrzeczytana: true, ukonczonoMs: T0 - 20 * D },
      { lekcjaId: 'm01-l2', teoriaPrzeczytana: true, ukonczonoMs: null },
      { lekcjaId: 'm02-l1', teoriaPrzeczytana: false, ukonczonoMs: null },
    ] });
  });
  it('teoria przeczytana: nowa lekcja → wiersz; istniejąca → UPSERT bez zmiany ukonczono_ms i miejsce', async () => {
    const { db, port } = await przygotuj('wzorzec');
    const przed = db.prepare("SELECT miejsce, ukonczono_ms FROM postep_lekcji WHERE lekcja_id IN ('m01-l1','m01-l2') ORDER BY lekcja_id").all();
    expect(await oznaczTeoriePrzeczytana(port, 'm02-l1', T0 + 5)).toEqual({ ok: true, wartosc: undefined });
    await oznaczTeoriePrzeczytana(port, 'm01-l1', T0 + 5);
    await oznaczTeoriePrzeczytana(port, 'm01-l2', T0 + 5);
    await oznaczTeoriePrzeczytana(port, 'm03-l1', T0 + 6);
    expect(db.prepare("SELECT miejsce, ukonczono_ms FROM postep_lekcji WHERE lekcja_id IN ('m01-l1','m01-l2') ORDER BY lekcja_id").all()).toEqual(przed);
    expect(db.prepare('SELECT lekcja_id, teoria_przeczytana, zmieniono_ms FROM postep_lekcji WHERE lekcja_id IN (?, ?)').all('m02-l1', 'm03-l1')).toEqual([
      { lekcja_id: 'm02-l1', teoria_przeczytana: 1, zmieniono_ms: T0 + 5 },
      { lekcja_id: 'm03-l1', teoria_przeczytana: 1, zmieniono_ms: T0 + 6 },
    ]);
  });
  it('błąd bazy → zapis_nieudany / odczyt_nieudany', async () => {
    const { port } = await przygotuj('pusta');
    const zepsuty = { ...port, run: async () => { throw bladIO(); }, all: async () => { throw bladIO(); } };
    expect(await oznaczTeoriePrzeczytana(zepsuty, 'x', 1)).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(await odczytajPostepLekcji(zepsuty)).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});
