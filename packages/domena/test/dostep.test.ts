// Testy akceptacyjne logiki dostępu: 9 wektorów z docs/monetyzacja.md „Logika dostępu: wektory” (ADR 0006 pkt 2; K-05; BR-ZAK-003)
// i W10 z L8-04 (fix 05, D-217): `wygasaMs: null` liczy się jako „bez końca” tylko dla produktów z `bezKonca`.
// Sprawdzane są tylko pola, które wektor podaje (kolumna „Oczekiwane”).
// Wersja 07 fix (D-224), przeniesiona przez 08 fix (L8-04). Wartość `bezKonca` z decyzji (moduly.md, tabela parametrów:
// PRODUKTY_BEZ_KONCA = dożywotni), nie z kodu.
import { describe, expect, it } from 'vitest';
import { decyzja as decyzja5, KONFIGURACJA as K, type OdczytSklepu, type Pamiec } from '../src';

const [KWARTAL, ROK, DOZYWOTNI] = K.PRODUKTY_ODBLOKOWUJACE;
const BEZ_KONCA: readonly string[] = [DOZYWOTNI!];
const decyzja = (o: OdczytSklepu, p: Pamiec | null, t: number, odb: readonly string[]) => decyzja5(o, p, t, odb, BEZ_KONCA);
const T = Date.UTC(2026, 10, 4, 12);
const D = 86_400_000;
const sklep = (...t: { produkt: string; wygasaMs: number | null; odebrana?: boolean }[]): OdczytSklepu => ({ ok: true, transakcje: t.map((x) => ({ odebrana: false, ...x })) });
const BLAD: OdczytSklepu = { ok: false };
const pamiec = (produkt: string, wygasaMs: number | null): Pamiec => ({ produkty: [{ produkt, wygasaMs }], odczytanoMs: T - D });
const produktyPamieci = (p: Pamiec | null) => p?.produkty.map((x) => ({ produkt: x.produkt, wygasaMs: x.wygasaMs }));

describe('AK-BR-ZAK-003: logika dostępu (9 wektorów, docs/monetyzacja.md:89–99)', () => {
  it('W1 dożywotni → dostęp ze sklepu, pamięć dożywotni bez końca', () => {
    const w = decyzja(sklep({ produkt: DOZYWOTNI, wygasaMs: null }), null, T, K.PRODUKTY_ODBLOKOWUJACE);
    expect([w.dostep, w.zrodlo]).toEqual([true, 'sklep']);
    expect(produktyPamieci(w.nowaPamiec)).toEqual([{ produkt: DOZYWOTNI, wygasaMs: null }]);
  });
  it('W2 ponowna instalacja (pamięć wyczyszczona) → dostęp ze sklepu', () => {
    const w = decyzja(sklep({ produkt: DOZYWOTNI, wygasaMs: null }), null, T, K.PRODUKTY_ODBLOKOWUJACE);
    expect([w.dostep, w.zrodlo]).toEqual([true, 'sklep']);
  });
  it('W3 subskrypcja roczna trwa → dostęp ze sklepu, pamięć wygasa T+1', () => {
    const w = decyzja(sklep({ produkt: ROK, wygasaMs: T + D }), null, T, K.PRODUKTY_ODBLOKOWUJACE);
    expect([w.dostep, w.zrodlo]).toEqual([true, 'sklep']);
    expect(produktyPamieci(w.nowaPamiec)).toEqual([{ produkt: ROK, wygasaMs: T + D }]);
  });
  it('W4 brak sieci, roczna trwa → dostęp z pamięci', () => {
    const w = decyzja(BLAD, pamiec(ROK, T + D), T, K.PRODUKTY_ODBLOKOWUJACE);
    expect([w.dostep, w.zrodlo]).toEqual([true, 'pamiec']);
  });
  it('W5 brak sieci, kwartał wygasł → brak dostępu', () => {
    expect(decyzja(BLAD, pamiec(KWARTAL, T - D), T, K.PRODUKTY_ODBLOKOWUJACE).dostep).toBe(false);
  });
  it('W6 brak sieci, nigdy nie kupił → brak dostępu', () => {
    expect(decyzja(BLAD, null, T, K.PRODUKTY_ODBLOKOWUJACE).dostep).toBe(false);
  });
  it('W7 zwrot dożywotniego → brak dostępu, pamięć wyczyszczona', () => {
    const w = decyzja(sklep({ produkt: DOZYWOTNI, wygasaMs: null, odebrana: true }), pamiec(DOZYWOTNI, null), T, K.PRODUKTY_ODBLOKOWUJACE);
    expect(w.dostep).toBe(false);
    expect(w.nowaPamiec === null || w.nowaPamiec.produkty.length === 0).toBe(true);
  });
  it('W8 dożywotni i wygasły kwartał → dostęp, pamięć tylko dożywotni bez końca', () => {
    const w = decyzja(sklep({ produkt: DOZYWOTNI, wygasaMs: null }, { produkt: KWARTAL, wygasaMs: T - D }), null, T, K.PRODUKTY_ODBLOKOWUJACE);
    expect(w.dostep).toBe(true);
    expect(produktyPamieci(w.nowaPamiec)).toEqual([{ produkt: DOZYWOTNI, wygasaMs: null }]);
  });
  it('W9 przywracanie bez zakupu (pusta lista) → brak dostępu', () => {
    expect(decyzja(sklep(), null, T, K.PRODUKTY_ODBLOKOWUJACE).dostep).toBe(false);
  });
});

describe('AK-L8-04: subskrypcja bez daty końca (D-217, ADR 0006 pkt 2)', () => {
  it('AK-L8-04-a konfiguracja: PRODUKTY_BEZ_KONCA = [dożywotni] (moduly.md, tabela parametrów)', () => {
    expect(K.PRODUKTY_BEZ_KONCA).toEqual(BEZ_KONCA);
  });
  it.each([KWARTAL!, ROK!])('W10 sklep: %s z wygasaMs null (błąd adaptera) → brak dostępu, pamięć bez wpisu', (produkt) => {
    const w = decyzja(sklep({ produkt, wygasaMs: null }), null, T, K.PRODUKTY_ODBLOKOWUJACE);
    expect([w.dostep, w.zrodlo]).toEqual([false, 'sklep']);
    expect(produktyPamieci(w.nowaPamiec)).toEqual([]);
  });
  it('W10-b brak sieci, pamięć roczna z wygasaMs null (zapis sprzed poprawki) → brak dostępu', () => {
    expect(decyzja(BLAD, pamiec(ROK!, null), T, K.PRODUKTY_ODBLOKOWUJACE).dostep).toBe(false);
  });
  it('W10-c roczna bez końca obok dożywotniego → dostęp, w pamięci tylko dożywotni', () => {
    const w = decyzja(sklep({ produkt: ROK!, wygasaMs: null }, { produkt: DOZYWOTNI!, wygasaMs: null }), null, T, K.PRODUKTY_ODBLOKOWUJACE);
    expect(w.dostep).toBe(true);
    expect(produktyPamieci(w.nowaPamiec)).toEqual([{ produkt: DOZYWOTNI, wygasaMs: null }]);
  });
});
