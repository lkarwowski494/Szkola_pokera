// ŚR-001 (KO-058 A, D-730…D-734): wersja generatora w historii wariantów. Wpis zapisany przez starszy generator nie może
// udawać „tego samego rozdania”: pod tym samym ziarnem nowy generator daje inną rękę. Okno bez powtórzeń liczy wszystkie wersje.
import { describe, expect, it } from 'vitest';
import { BET_FRACTIONS, GENERATOR_WERSJA, generateVariant, type GeneratorTemplate, type ScenarioLevel, type ScenarioVariant } from '@szkola/poker-core';
import { czyPowtorkaWariantu, KONFIGURACJA as K, wybierzWariant, ziarnoPowtorki, type WpisHistorii } from '../src';

const SZABLON: GeneratorTemplate = {
  id: 'test-cf',
  levels: { sredni: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.02, marginMax: 0.1, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['fold'] } },
  decisions: [{ street: 'flop', pots: [20, 40, 60], fractions: BET_FRACTIONS }],
};
const STARA = GENERATOR_WERSJA - 1; // wpisy sprzed kolumny mają 0, czyli zawsze mniej niż bieżąca
const wpis = (odcisk: string, ziarno: number, generatorWersja: number): WpisHistorii => ({ odcisk, ziarno, generatorWersja });

describe('ŚR-001: GENERATOR_WERSJA', () => {
  it('dodatnia liczba całkowita (0 jest zarezerwowane dla wpisów sprzed kolumny)', () => {
    expect(Number.isInteger(GENERATOR_WERSJA)).toBe(true);
    expect(GENERATOR_WERSJA).toBeGreaterThanOrEqual(1);
  });
});

describe('ŚR-001: powtórka tylko przy zgodnej wersji generatora', () => {
  it('czyPowtorkaWariantu: ten sam odcisk, ale wpis starej wersji → nie powtórka (to nie to samo rozdanie)', () => {
    expect(czyPowtorkaWariantu({ historia: [wpis('o', 1, STARA)], odcisk: 'o' })).toBe(false);
    expect(czyPowtorkaWariantu({ historia: [wpis('o', 1, 0)], odcisk: 'o' })).toBe(false);
    expect(czyPowtorkaWariantu({ historia: [wpis('o', 1, GENERATOR_WERSJA)], odcisk: 'o' })).toBe(true);
  });
  it('ziarnoPowtorki: ziarno ostatniego wpisu tylko dla bieżącej wersji; stara wersja i pusta historia → null (nowe rozdanie)', () => {
    expect(ziarnoPowtorki([wpis('a', 7, GENERATOR_WERSJA), wpis('b', 9, GENERATOR_WERSJA)])).toBe(9);
    expect(ziarnoPowtorki([wpis('a', 7, GENERATOR_WERSJA), wpis('b', 9, STARA)])).toBeNull();
    expect(ziarnoPowtorki([])).toBeNull();
  });
  it('powtórka ze starego wpisu nie odtwarza innej ręki pod tym samym ziarnem: ziarnoPowtorki nie oddaje ziarna starego generatora', () => {
    const zapisane = generateVariant(SZABLON, 'sredni', 42);
    const stary = [wpis(zapisane.fingerprint, 42, STARA)];
    expect(ziarnoPowtorki(stary)).toBeNull(); // brak ziarna = wywołujący losuje nowe rozdanie, nie generateVariant(…, 42) nowym generatorem
  });
});

describe('ŚR-001: okno bez powtórzeń liczy odciski wszystkich wersji', () => {
  it('odcisk starej wersji w oknie jest zajęty: nowy wariant go nie powtarza', () => {
    const v = generateVariant(SZABLON, 'sredni', 1);
    const wynik = wybierzWariant(SZABLON, 'sredni', 1, { historia: [wpis(v.fingerprint, 1, 0)], sesja: new Set() });
    expect(wynik.fingerprint).not.toBe(v.fingerprint);
  });
  it('brak wolnego odcisku: ponowne użycie ziarna tylko z wpisu zgodnej wersji; stare ziarno nie jest odtwarzane', () => {
    const pula = ['a', 'b', 'c'].map((odcisk, i): ScenarioVariant => ({
      templateId: 't', level: 'sredni', seed: 100 + i, hero: [0, 1], villain: [2, 3], board: [4, 5, 6, 7, 8], decisions: [], points: [], fingerprint: odcisk,
    }));
    const uzyte: number[] = [];
    const generuj = (_: GeneratorTemplate, __: ScenarioLevel, ziarno: number): ScenarioVariant => { uzyte.push(ziarno); return pula[ziarno >= 100 && ziarno <= 102 ? ziarno - 100 : ziarno % 3]!; };
    const historia = [wpis('b', 101, STARA), wpis('c', 102, GENERATOR_WERSJA), wpis('a', 100, GENERATOR_WERSJA)];
    expect(wybierzWariant(SZABLON, 'sredni', 5, { historia, sesja: new Set(), generuj }).fingerprint).toBe('c'); // najdawniejszy ZGODNY
    uzyte.length = 0;
    wybierzWariant(SZABLON, 'sredni', 5, { historia: [wpis('b', 101, STARA), wpis('c', 102, STARA), wpis('a', 100, STARA)], sesja: new Set(), generuj });
    expect(uzyte.some((z) => z >= 100 && z <= 102)).toBe(false); // żadnego ziarna ze starych wpisów
  });
  it('okno liczy ostatnie 20 wpisów niezależnie od wersji (mieszane wersje)', () => {
    const v = generateVariant(SZABLON, 'sredni', 1);
    const wypelniacze = Array.from({ length: K.WARIANTY_HISTORIA_OKNO - 1 }, (_, i) => wpis(`inny-${i}`, i, i % 2));
    expect(wybierzWariant(SZABLON, 'sredni', 1, { historia: [wpis(v.fingerprint, 1, 0), ...wypelniacze], sesja: new Set() }).fingerprint).not.toBe(v.fingerprint);
  });
});
