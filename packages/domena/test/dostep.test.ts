// Testy akceptacyjne logiki dostępu: 9 wektorów z docs/monetyzacja.md „Logika dostępu: wektory” (ADR 0006 pkt 2; K-05; BR-ZAK-003).
// Sprawdzane są tylko pola, które wektor podaje (kolumna „Oczekiwane”).
import { describe, expect, it } from 'vitest';
import { decyzja, KONFIGURACJA as K, type OdczytSklepu, type Pamiec } from '../src';

const [KWARTAL, ROK, DOZYWOTNI] = K.PRODUKTY_ODBLOKOWUJACE;
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
