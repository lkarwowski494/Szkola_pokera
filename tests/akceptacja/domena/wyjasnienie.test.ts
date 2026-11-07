// Testy akceptacyjne wyjaśnienia zadania i oceny odpowiedzi liczbowej (BR-CWI-002, BR-CWI-003, BR-CWI-007, BR-JEZ-002;
// rola 07 E3 część 13, przegląd D-043 W1, Ś1, Ś2). Wyrocznia: wektory tests/wektory/brd.json i tolerancje z KONFIGURACJA (B-017).
import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { KONFIGURACJA as K, ocenOdpowiedzLiczbowa, wyjasnienieZadania } from '../../../packages/domena/src';
import { formatujLiczbe, formatujProcent, type Jezyk } from '../../../packages/jezyki/src';

const WEKTORY = JSON.parse(readFileSync(new URL('../../wektory/brd.json', import.meta.url), 'utf8')) as { id: string; oczekiwane: Record<string, unknown> }[];
const w = (id: string, pole: string) => Number(WEKTORY.find((v) => v.id === id)!.oczekiwane[pole]);

describe('AK-BR-CWI-002: wyjaśnienie zadania o sprawdzeniu', () => {
  it('AK-BR-CWI-002-d pula 100, zakład 50 → jedno wyjaśnienie podaje wymagane equity 25% (RD-01-W1) i MDF 66,67% (RD-02-W1)', () => {
    const x = wyjasnienieZadania({ rodzaj: 'sprawdzenie', pula: 100, zaklad: 50 });
    expect(x.liczby.wymaganeEquity).toBeCloseTo(w('RD-01-W1', 'e [-]'), 4);
    expect(x.liczby.mdf).toBeCloseTo(w('RD-02-W1', 'MDF [-]'), 4);
  });
  it('AK-BR-CWI-002-e equity 30%, pula 100, zakład 50 → wartość oczekiwana sprawdzenia +10 (RD-08-W2)', () => {
    expect(wyjasnienieZadania({ rodzaj: 'sprawdzenie', pula: 100, zaklad: 50, equity: 0.3 }).liczby.ev).toBeCloseTo(w('RD-08-W2', 'EV [żetony]'), 4);
  });
});

describe('AK-BR-CWI-003: odpowiedź oceniana względem dokładnej szansy', () => {
  it('AK-BR-CWI-003-c 9 outów, 47 kart, 2 do odkrycia: poprawna 34,97% (RD-04-W1), przybliżenie 36% (RD-05-W1) osobno w liczbach', () => {
    const x = wyjasnienieZadania({ rodzaj: 'szansa', outy: 9, nieznane: 47, doOdkrycia: 2 });
    expect(x.poprawna).toBeCloseTo(w('RD-04-W1', 'p [-]'), 4);
    expect(x.liczby.dokladna).toBeCloseTo(w('RD-04-W1', 'p [-]'), 4);
    expect((x.liczby.przyblizenie ?? NaN) * 100).toBeCloseTo(w('RD-05-W1', 'p [%]'), 9);
  });
  it('AK-BR-CWI-003-d ocena względem dokładnej: w tolerancji OK → zgodne, poza tolerancją BLISKO → błąd; 0 outów → poprawna 0 (RD-04-W4)', () => {
    const d = w('RD-04-W1', 'p [-]') * 100;
    expect(ocenOdpowiedzLiczbowa(d, d)).toBe('zgodne');
    expect(ocenOdpowiedzLiczbowa(d, d + K.TOLERANCJA_PROCENT_OK)).toBe('zgodne');
    expect(ocenOdpowiedzLiczbowa(d, d + K.TOLERANCJA_PROCENT_BLISKO + 0.01)).toBe('blad');
    expect(ocenOdpowiedzLiczbowa(d, d - K.TOLERANCJA_PROCENT_BLISKO - 0.01)).toBe('blad');
    expect(wyjasnienieZadania({ rodzaj: 'szansa', outy: 0, nieznane: 47, doOdkrycia: 2 }).poprawna).toBe(w('RD-04-W4', 'p [-]'));
  });
  // L7-13c (moduly.md „Wyjaśnienie zadań”): (OK, BLISKO] pp → niedokladnosc — decyzja właściciela B-017 („blisko” nie zalicza,
  // FSRS „trudne”); granice włączne z ε = 1e-9, więc próbki ±0,01 pp przy granicy i sama granica w obie strony.
  it.each([1, -1])('AK-BR-CWI-003-e znak %i: tuż za OK → niedokladnosc, sama granica BLISKO → niedokladnosc, tuż za nią → blad', (znak) => {
    const d = w('RD-04-W1', 'p [-]') * 100;
    expect(ocenOdpowiedzLiczbowa(d, d + znak * K.TOLERANCJA_PROCENT_OK)).toBe('zgodne');
    expect(ocenOdpowiedzLiczbowa(d, d + znak * (K.TOLERANCJA_PROCENT_OK + 0.01))).toBe('niedokladnosc');
    expect(ocenOdpowiedzLiczbowa(d, d + znak * (K.TOLERANCJA_PROCENT_OK + K.TOLERANCJA_PROCENT_BLISKO) / 2)).toBe('niedokladnosc');
    expect(ocenOdpowiedzLiczbowa(d, d + znak * K.TOLERANCJA_PROCENT_BLISKO)).toBe('niedokladnosc');
    expect(ocenOdpowiedzLiczbowa(d, d + znak * (K.TOLERANCJA_PROCENT_BLISKO + 0.01))).toBe('blad');
  });
});

describe('AK-BR-CWI-007: kto wygrywa — kolor wobec strita', () => {
  it('AK-BR-CWI-007-a kolor wobec strita → poprawna odpowiedź to kolor, wyjaśnienie podaje 5108 wobec 10200 (RD-10-W4, -W5)', () => {
    // A: kolor kier (A♥ 3♥ + K♥ 9♥ 2♥); B: strit 5–9 (6♣ 8♦ + 5♠ 7♣ 9♥); stół K♥ 9♥ 2♥ 5♠ 7♣
    const x = wyjasnienieZadania({ rodzaj: 'zwyciezca', rekaA: ['Ah', '3h'], rekaB: ['6c', '8d'], stol: ['Kh', '9h', '2h', '5s', '7c'] });
    expect(x.poprawna).toBe('A');
    expect(x.liczby.ukladyZwyciezcy).toBe(w('RD-10-W4', 'liczba [układy]'));
    expect(x.liczby.ukladyPrzegranego).toBe(w('RD-10-W5', 'liczba [układy]'));
    const odwrotnie = wyjasnienieZadania({ rodzaj: 'zwyciezca', rekaA: ['6c', '8d'], rekaB: ['Ah', '3h'], stol: ['Kh', '9h', '2h', '5s', '7c'] });
    expect(odwrotnie.poprawna).toBe('B');
    expect(odwrotnie.liczby).toEqual(x.liczby);
  });
});

// L7-13d (D-220, ADR 0014): jedna implementacja formatu w `@szkola/jezyki`; `miejsca` = stała liczba cyfr po przecinku
// (minimum = maksimum), żeby liczba w interfejsie miała tyle cyfr co wartość w treści.
describe('AK-BR-JEZ-002: ta sama liczba w dwóch językach', () => {
  const pl = 'pl' as Jezyk, en = 'en' as Jezyk;
  it('AK-BR-JEZ-002-b 34,97% (RD-04-W1) po polsku i 34.97% po angielsku', () => {
    const p = w('RD-04-W1', 'p [-]');
    expect(formatujProcent(p, pl, { miejsca: 2 }).replace(/\s/g, '')).toBe('34,97%');
    expect(formatujProcent(p, en, { miejsca: 2 })).toBe('34.97%');
  });
  it('AK-BR-JEZ-002-c miejsca stałe: zera końcowe zostają (0,35 → 35,00% / 35.00%; 2,5 przy 2 miejscach → 2,50 / 2.50)', () => {
    expect(formatujProcent(0.35, pl, { miejsca: 2 }).replace(/\s/g, '')).toBe('35,00%');
    expect(formatujProcent(0.35, en, { miejsca: 2 })).toBe('35.00%');
    expect(formatujLiczbe(2.5, pl, { miejsca: 2 })).toBe('2,50');
    expect(formatujLiczbe(2.5, en, { miejsca: 2 })).toBe('2.50');
  });
  it('AK-BR-JEZ-002-d domena nie formatuje liczb (D-220): brak `formatProcent` i `Intl.NumberFormat` w packages/domena/src', () => {
    const katalog = new URL('../../../packages/domena/src/', import.meta.url);
    for (const plik of readdirSync(katalog).filter((n) => n.endsWith('.ts'))) {
      const zrodlo = readFileSync(new URL(plik, katalog), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
      expect(zrodlo, plik).not.toMatch(/formatProcent|Intl\.NumberFormat|toLocaleString/);
    }
  });
});
