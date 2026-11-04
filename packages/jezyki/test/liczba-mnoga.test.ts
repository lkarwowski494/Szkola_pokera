import { describe, expect, it } from 'vitest';
import { JEZYKI, sprawdzIntl } from '../src/index';
import { WEKTORY } from './wektory';

describe('liczba mnoga na wektorach ze wzorców (ICU Node)', () => {
  for (const [jezyk, wektory] of Object.entries(WEKTORY)) {
    for (const [n, kategoria] of wektory) {
      it(`${jezyk}: ${n} → ${kategoria}`, () => {
        expect(new Intl.PluralRules(jezyk).select(n)).toBe(kategoria);
      });
    }
  }
});

describe('sprawdzIntl (samosprawdzenie przy starcie)', () => {
  it('pusta lista, gdy wszystkie języki mają reguły', () => {
    expect(sprawdzIntl(JEZYKI)).toEqual([]);
  });
  it('zgłasza język bez reguł liczby mnogiej', () => {
    expect(sprawdzIntl(['pl', 'xx'])).toEqual(['brak reguł liczby mnogiej dla xx']);
  });
  it('niepoprawny kod języka nie rzuca wyjątku, tylko jest zgłoszony', () => {
    expect(sprawdzIntl(['pl', 'xx-nieistnieje'])).toEqual(['brak reguł liczby mnogiej dla xx-nieistnieje']);
  });
  it('zgłasza brak Intl.PluralRules (polyfill nie załadowany)', () => {
    const PR = Intl.PluralRules;
    // symulacja Hermesa bez PluralRules
    delete (Intl as { PluralRules?: unknown }).PluralRules;
    try {
      expect(sprawdzIntl(['pl'])).toEqual(['brak Intl.PluralRules: polyfill nie został załadowany']);
    } finally {
      (Intl as { PluralRules?: unknown }).PluralRules = PR;
    }
  });
});
