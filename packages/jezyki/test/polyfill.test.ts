// Ścieżka Hermesa: Intl.PluralRules z polyfillu formatjs (polyfill-force + locale-data), nie z ICU Node.
// Test w Node potwierdza dane polyfillu; działanie w silniku Hermes sprawdza samosprawdzenie przy starcie aplikacji (telefon).
import { beforeAll, describe, expect, it } from 'vitest';
import { JEZYKI, sprawdzIntl } from '../src/index';
import { WEKTORY } from './wektory';

const natywny = Intl.PluralRules;
const CALKOWITE = [...Array.from({ length: 205 }, (_, i) => i), 1000000, 1000001];
const ULAMKI = [0.5, 1.5, 2.5, 10.5];
// Znana różnica danych: polyfill (formatjs 6.3.15) i ICU Node 22 (CLDR 48) inaczej klasyfikują ułamki w tych językach.
// Liczba mnoga w interfejsie dotyczy tylko liczb całkowitych (ADR 0014); zmiana tej listy przy aktualizacji pakietu wymaga decyzji.
const ZNANE_ROZNICE_ULAMKI = ['bg', 'da', 'el', 'es', 'es-419', 'hu', 'lt', 'lv', 'nb', 'tr'];

beforeAll(async () => {
  await import('@formatjs/intl-pluralrules/polyfill-force.js');
  for (const j of new Set(JEZYKI.map((x) => x.split('-')[0]))) await import(`@formatjs/intl-pluralrules/locale-data/${j}.js`);
});

describe('polyfill formatjs dla 35 języków', () => {
  it('podmienia Intl.PluralRules', () => {
    expect(Intl.PluralRules).not.toBe(natywny);
  });
  it('sprawdzIntl: 0 problemów po załadowaniu danych', () => {
    expect(sprawdzIntl(JEZYKI)).toEqual([]);
  });
  for (const [jezyk, wektory] of Object.entries(WEKTORY)) {
    for (const [n, kategoria] of wektory) {
      it(`wektor ${jezyk}: ${n} → ${kategoria}`, () => {
        expect(new Intl.PluralRules(jezyk).select(n)).toBe(kategoria);
      });
    }
  }
  for (const jezyk of JEZYKI) {
    it(`${jezyk}: liczby całkowite zgodne z ICU Node (${CALKOWITE.length} próbek)`, () => {
      const poly = new Intl.PluralRules(jezyk);
      const icu = new natywny(jezyk);
      expect(CALKOWITE.filter((n) => poly.select(n) !== icu.select(n))).toEqual([]);
    });
  }
  it('ułamki: różnice względem ICU Node tylko w znanych językach', () => {
    const rozni = JEZYKI.filter((j) => {
      const poly = new Intl.PluralRules(j);
      const icu = new natywny(j);
      return ULAMKI.some((n) => poly.select(n) !== icu.select(n));
    });
    expect([...rozni].sort()).toEqual([...ZNANE_ROZNICE_ULAMKI].sort());
  });
});
