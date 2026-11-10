// BT, krok F: wariant (poziom, ziarno) zapisany w planie aktywności scenariusza (wznowienie bez zmiany kart, BR-GEN-001)
// i odczyt wyników ukończonych scenariuszy do poziomu automatycznego (BR-POZ-002, D-534).
import { afterEach, describe, expect, it } from 'vitest';
import type { AktywnoscWToku } from '../../domena/src';
import { aktywnoscWToku, wynikiScenariuszy, zacznijAktywnosc, zakonczAktywnosc, zapiszKrok, type OdpowiedzKroku } from '../src';
import { T0 } from '../../../tests/narzedzia/wzorzec-bazy';
import { przygotuj, sprzatnij } from './wspolne';

afterEach(sprzatnij);

const GRAF = [[{ akcja: 'call', dalej: 1 }, { akcja: 'fold', dalej: 'koniec' as const }], [{ akcja: 'call', dalej: 'pokazanie' as const }, { akcja: 'fold', dalej: 'koniec' as const }]];
const scenariusz = (trescId: string, poziom: 'latwy' | 'sredni' | 'trudny', ziarno: number, startMs: number): AktywnoscWToku => ({
  stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-10', strefa: 'Europe/Warsaw', startMs, krok: 0,
  plan: { liczbaKrokow: 2, trescId, decyzje: GRAF, wariant: { poziom, ziarno } },
});
const odp = (krok: number, ocena: OdpowiedzKroku['ocena']): OdpowiedzKroku => ({
  krok, zadanie_id: `sc-01#${krok}`, rodzina_id: 'sc-01', wybor: '{"akcja":"call"}', ocena, zaliczona: ocena === 'zgodne' || ocena === 'dopuszczalne' ? 1 : 0, czas_ms: 1000, odpowiedziano_ms: T0 + krok,
});

describe('wariant w planie scenariusza', () => {
  it('poziom i ziarno przeżywają zapis i wznowienie (wznowienie = te same karty)', async () => {
    const { port } = await przygotuj('pusta');
    const a = scenariusz('sc-01', 'sredni', 4242, T0);
    await zacznijAktywnosc(port, 'a1', a);
    expect(await aktywnoscWToku(port, 'scenariusz')).toEqual({ ok: true, wartosc: { id: 'a1', aktywnosc: a } });
  });
  it('zły kształt wariantu w planie → odczyt_nieudany (nie zgadujemy poziomu)', async () => {
    const { db, port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'a1', scenariusz('sc-01', 'latwy', 1, T0));
    db.prepare("UPDATE aktywnosc SET plan = json_set(plan, '$.wariant.poziom', 'ekspert') WHERE id = 'a1'").run();
    expect(await aktywnoscWToku(port, 'scenariusz')).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});

describe('wynikiScenariuszy', () => {
  it('tylko zakończone scenariusze, od najstarszego, z poziomem, szablonem i ocenami decyzji w kolejności kroków', async () => {
    const { port } = await przygotuj('pusta');
    await zacznijAktywnosc(port, 'a1', scenariusz('sc-01', 'latwy', 1, T0));
    await zapiszKrok(port, 'a1', odp(0, 'zgodne'), 1);
    await zakonczAktywnosc(port, 'a1', T0 + 10, { ostatnia: odp(1, 'blad') });
    await zacznijAktywnosc(port, 'a2', scenariusz('sc-02', 'sredni', 2, T0 + 100));
    await zapiszKrok(port, 'a2', odp(0, 'dopuszczalne'), 1);
    await zakonczAktywnosc(port, 'a2', T0 + 110, { ostatnia: odp(1, 'zgodne') });
    await zacznijAktywnosc(port, 'a3', scenariusz('sc-01', 'trudny', 3, T0 + 200)); // w toku: pominięta
    await zapiszKrok(port, 'a3', odp(0, 'zgodne'), 1);
    expect(await wynikiScenariuszy(port)).toEqual({ ok: true, wartosc: [
      { trescId: 'sc-01', poziom: 'latwy', startMs: T0, oceny: ['zgodne', 'blad'] },
      { trescId: 'sc-02', poziom: 'sredni', startMs: T0 + 100, oceny: ['dopuszczalne', 'zgodne'] },
    ] });
  });
  it('przegląd D-043 P1: zakończony scenariusz ze złym planem (stary build, import) jest pomijany, reszta wyników czytelna', async () => {
    const { db, port } = await przygotuj('pusta');
    for (const [id, ms] of [['z1', T0], ['z2', T0 + 1], ['z3', T0 + 2]] as const) {
      await zacznijAktywnosc(port, id, scenariusz('sc-01', 'latwy', 1, ms));
      await zakonczAktywnosc(port, id, ms + 5, { ostatnia: odp(0, 'zgodne') });
    }
    db.prepare("UPDATE aktywnosc SET plan = '\"x\"' WHERE id = 'z1'").run();
    db.prepare("UPDATE aktywnosc SET plan = json_set(plan, '$.wariant.poziom', 'ekspert') WHERE id = 'z2'").run();
    expect(await wynikiScenariuszy(port)).toEqual({ ok: true, wartosc: [{ trescId: 'sc-01', poziom: 'latwy', startMs: T0 + 2, oceny: ['zgodne'] }] });
  });
  it('porzucone i zakończone bez odpowiedzi nie liczą się; brak danych = pusta lista', async () => {
    const { port } = await przygotuj('pusta');
    expect(await wynikiScenariuszy(port)).toEqual({ ok: true, wartosc: [] });
    await zacznijAktywnosc(port, 'a1', scenariusz('sc-01', 'latwy', 1, T0));
    await zakonczAktywnosc(port, 'a1', T0 + 1);
    expect(await wynikiScenariuszy(port)).toEqual({ ok: true, wartosc: [] });
  });
});
