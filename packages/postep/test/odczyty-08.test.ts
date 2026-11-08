// Odczyty dla ekranów (rola 08 cz. 5 krok 4): karty, testy, statystyki rodzin, wyniki lekcji, seria dni (D-251).
import { afterEach, describe, expect, it } from 'vitest';
import type { AktywnoscWToku } from '../../domena/src';
import {
  dniZOdpowiedzia, odczytajKarty, seriaDni, statystykiRodzin, wynikiLekcji, wynikiTestow, zacznijAktywnosc, zadaniaZTestow,
  zakonczAktywnosc, zapiszKrok, type OdpowiedzKroku,
} from '../src';
import { DZIEN_WZORCA, T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { bladIO, przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);
const D = 86_400_000;
const LEKCJA = (id: string, dzien = '2026-11-08'): AktywnoscWToku => ({
  stan: 'w_toku', rodzaj: 'lekcja', zLimitu: false, dzienLokalny: dzien, strefa: 'Europe/Warsaw', startMs: T0, krok: 0,
  plan: { liczbaKrokow: 3, trescId: id, zadania: [{ id: 'a', ziarno: 0 }, { id: 'b', ziarno: 0 }, { id: 'c', ziarno: 0 }] },
});
const odp = (krok: number, zal: 0 | 1, rodzina = 'r1'): OdpowiedzKroku => ({
  krok, zadanie_id: `z${krok}`, rodzina_id: rodzina, wybor: '{}', ocena: zal ? 'zgodne' : 'blad', zaliczona: zal, czas_ms: 1, odpowiedziano_ms: T0,
});

describe('odczyty na wzorcu v1', () => {
  it('karty w kolejności terminu, wszystkie pola (brak ostatniej powtórki zostaje null)', async () => {
    const { port } = await przygotuj('wzorzec');
    const w = await odczytajKarty(port);
    expect(w.ok && w.wartosc.map((k) => [k.rodzina_id, k.termin_ms, k.ostatnia_powtorka_ms])).toEqual([
      ['r1', T0 - 3 * D, T0 - 10 * D], ['r9', T0 - D, T0 - 2 * D], ['r3', T0, null], ['r2', T0 + 5 * D, T0 - D],
    ]);
    expect(w.ok && w.wartosc[0]).toEqual({ rodzina_id: 'r1', termin_ms: T0 - 3 * D, stabilnosc: 3.17, trudnosc: 5.5, dni_zaplanowane: 2, kroki_nauki: 0, powtorzenia: 4, zapomnienia: 1, stan: 2, ostatnia_powtorka_ms: T0 - 10 * D, zmieniono_ms: T0 });
  });
  it('wyniki testów z czasem zakończenia; zadania z testów bez zadań z innych aktywności', async () => {
    const { port } = await przygotuj('wzorzec');
    expect(await wynikiTestow(port)).toEqual({ ok: true, wartosc: [
      { aktywnoscId: 'a-test', modulId: 'm01', poprawne: 13, wszystkie: 15, zaliczony: true, koniecMs: T0 - 19 * D + 1 },
      { aktywnoscId: 'a-test2', modulId: 'm01', poprawne: 9, wszystkie: 15, zaliczony: false, koniecMs: T0 - 18 * D + 1 },
    ] });
    expect(await zadaniaZTestow(port)).toEqual({ ok: true, wartosc: ['m01-t1'] });
  });
  it('statystyki rodzin ze wszystkich odpowiedzi', async () => {
    const { port } = await przygotuj('wzorzec');
    expect(await statystykiRodzin(port)).toEqual({ ok: true, wartosc: [
      { rodzinaId: 'r1', wszystkie: 2, zaliczone: 2 }, { rodzinaId: 'r2', wszystkie: 1, zaliczone: 1 },
      { rodzinaId: 'r3', wszystkie: 1, zaliczone: 0 }, { rodzinaId: 'r9', wszystkie: 1, zaliczone: 0 },
    ] });
  });
  it('dni z odpowiedzią: tylko aktywności z odpowiedzią, bez powtórzeń, rosnąco', async () => {
    const { port } = await przygotuj('wzorzec');
    expect(await dniZOdpowiedzia(port)).toEqual({ ok: true, wartosc: ['2026-10-07', DZIEN_WZORCA] }); // a-test; a-sesja i a-scen
  });
});

describe('wyniki lekcji', () => {
  it('najlepszy wynik ukończonej lekcji; lekcja w toku i porzucona się nie liczą', async () => {
    const { port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'l1', LEKCJA('m01-l1'));
    await zapiszKrok(port, 'l1', odp(0, 1), 1); await zapiszKrok(port, 'l1', odp(1, 0), 2);
    await zakonczAktywnosc(port, 'l1', T0 + 1, { ostatnia: odp(2, 0), lekcjaId: 'm01-l1' }); // 1/3
    await zacznijAktywnosc(port, 'l2', LEKCJA('m01-l1'));
    await zapiszKrok(port, 'l2', odp(0, 1), 1); await zapiszKrok(port, 'l2', odp(1, 1), 2);
    await zakonczAktywnosc(port, 'l2', T0 + 2, { ostatnia: odp(2, 0), lekcjaId: 'm01-l1' }); // 2/3
    await zacznijAktywnosc(port, 'l3', LEKCJA('m01-l1'));
    await zapiszKrok(port, 'l3', odp(0, 1), 1); await zapiszKrok(port, 'l3', odp(1, 1), 2); // w toku, 2/2
    await zacznijAktywnosc(port, 'l4', LEKCJA('m01-l2'));
    await zapiszKrok(port, 'l4', odp(0, 1), 1);
    expect(await wynikiLekcji(port)).toEqual({ ok: true, wartosc: [{ lekcjaId: 'm01-l1', poprawne: 2, wszystkie: 3 }] });
  });
});

describe('wyniki lekcji: ułamek, nie liczba', () => {
  it('3/6 potem 2/3 → najlepszy 2/3 (więcej poprawnych w dłuższej próbie nie jest lepszym wynikiem)', async () => {
    const { port } = await przygotuj('pusta');
    const szesc = { ...LEKCJA('m01-l1'), plan: { liczbaKrokow: 6, trescId: 'm01-l1', zadania: [0, 1, 2, 3, 4, 5].map((i) => ({ id: `z${i}`, ziarno: 0 })) } };
    await zacznijAktywnosc(port, 'l1', szesc);
    for (let k = 0; k < 5; k++) await zapiszKrok(port, 'l1', odp(k, k < 3 ? 1 : 0), k + 1);
    await zakonczAktywnosc(port, 'l1', T0 + 1, { ostatnia: odp(5, 0), lekcjaId: 'm01-l1' }); // 3/6
    await zacznijAktywnosc(port, 'l2', LEKCJA('m01-l1'));
    await zapiszKrok(port, 'l2', odp(0, 1), 1); await zapiszKrok(port, 'l2', odp(1, 1), 2);
    await zakonczAktywnosc(port, 'l2', T0 + 2, { ostatnia: odp(2, 0), lekcjaId: 'm01-l1' }); // 2/3
    expect(await wynikiLekcji(port)).toEqual({ ok: true, wartosc: [{ lekcjaId: 'm01-l1', poprawne: 2, wszystkie: 3 }] });
  });
});

describe('seria dni (czysta funkcja)', () => {
  it('brak dni → 0; dziś i wczoraj → 2; tylko wczoraj → 1 (dziś jeszcze bez odpowiedzi); luka przerywa', () => {
    expect(seriaDni([], '2026-11-08')).toBe(0);
    expect(seriaDni(['2026-11-07', '2026-11-08'], '2026-11-08')).toBe(2);
    expect(seriaDni(['2026-11-07'], '2026-11-08')).toBe(1);
    expect(seriaDni(['2026-11-05', '2026-11-07', '2026-11-08'], '2026-11-08')).toBe(2);
    expect(seriaDni(['2026-11-06'], '2026-11-08')).toBe(0);
  });
  it('granice miesiąca i roku, zmiana czasu (dni kalendarzowe, nie 24 h)', () => {
    expect(seriaDni(['2026-02-28', '2026-03-01'], '2026-03-01')).toBe(2);
    expect(seriaDni(['2025-12-31', '2026-01-01'], '2026-01-01')).toBe(2);
    expect(seriaDni(['2026-03-28', '2026-03-29', '2026-03-30'], '2026-03-30')).toBe(3);
  });
});

describe('błędy odczytu', () => {
  it('błąd bazy → odczyt_nieudany we wszystkich odczytach', async () => {
    const { port } = await przygotuj('pusta');
    const z = { ...port, all: async () => { throw bladIO(); } };
    for (const f of [odczytajKarty, wynikiTestow, zadaniaZTestow, statystykiRodzin, wynikiLekcji, dniZOdpowiedzia]) {
      expect(await f(z)).toEqual({ ok: false, powod: 'odczyt_nieudany' });
    }
  });
});
