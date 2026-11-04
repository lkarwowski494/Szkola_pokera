// Testy akceptacyjne limitu dnia (BR-LIM-001, -003, -005; ADR 0007 „Potwierdzenie”; K-05). Oczekiwane wartości:
// parametr LIMIT_AKTYWNOSCI_DZIENNIE z konfiguracji (D-107) i data w strefie z Intl (tests/narzedzia/czas.ts), nie z kodu aplikacji.
import { describe, expect, it } from 'vitest';
import { KONFIGURACJA as K, limitDnia, mozeStartowac, type Limit, type RodzajAktywnosci } from '../../../packages/domena/src';
import { dzienW, nastepnyDzien, poczatekDnia, przejsciaCzasu } from '../../narzedzia/czas';
import { lataTestowe, STREFY_TESTOWE } from '../../narzedzia/strefy';

const WYCZERPANY: Limit = { bezLimitu: false, pozostalo: 0, odnowienieMs: 0 };
const JEDNA: Limit = { bezLimitu: false, pozostalo: K.LIMIT_AKTYWNOSCI_DZIENNIE, odnowienieMs: 0 };
const Z_LIMITU: [RodzajAktywnosci, boolean][] = [['sesja', false], ['powtorki', false], ['scenariusz', false], ['test_modulu', false]];
const POZA_LIMITEM: [RodzajAktywnosci, boolean][] = [['lekcja', false], ['ocena_poziomu', false], ['test_modulu', true]];

// Dni do sprawdzenia w strefie: dzień każdego przejścia czasu, dzień przed nim, 1 stycznia i 31 grudnia, w roku bieżącym i następnym.
function dniTestowe(strefa: string): string[] {
  const dni = new Set<string>();
  for (const rok of lataTestowe()) {
    dni.add(`${rok}-01-01`).add(`${rok}-12-31`);
    for (const p of przejsciaCzasu(strefa, rok)) {
      dni.add(dzienW(strefa, p.utcMs - 60_000)).add(dzienW(strefa, p.utcMs));
    }
  }
  return [...dni];
}

describe('AK-BR-LIM-001: licznik przed startem i wyczerpany limit', () => {
  it('AK-BR-LIM-001-a licznik przed startem: brak aktywności dziś → limit z konfiguracji (D-107)', () => {
    const l = limitDnia({ zuzyteDzis: 0, pro: false, dzien: '2026-11-04', strefa: 'America/New_York' }, K);
    expect(l).toMatchObject({ bezLimitu: false, pozostalo: K.LIMIT_AKTYWNOSCI_DZIENNIE });
  });

  it.each(STREFY_TESTOWE)('AK-BR-LIM-001-b jeden wspólny limit: po zużyciu 0 i odnowienie o początku następnego dnia w strefie (%s)', (strefa) => {
    for (const dzien of dniTestowe(strefa)) {
      const l = limitDnia({ zuzyteDzis: K.LIMIT_AKTYWNOSCI_DZIENNIE, pro: false, dzien, strefa }, K);
      const odnowienie = poczatekDnia(strefa, nastepnyDzien(dzien));
      expect(l, `${strefa} ${dzien}`).toEqual({ bezLimitu: false, pozostalo: 0, odnowienieMs: odnowienie });
      // własność: chwila odnowienia to już następny dzień, minuta wcześniej to jeszcze `dzien`
      expect(dzienW(strefa, odnowienie)).toBe(nastepnyDzien(dzien));
      expect(dzienW(strefa, odnowienie - 60_000)).toBe(dzien);
    }
  });

  it('AK-ADR0007-5 zużycie ponad limit (import sumuje wpisy dnia) → pozostało 0, nie liczba ujemna', () => {
    const l = limitDnia({ zuzyteDzis: K.LIMIT_AKTYWNOSCI_DZIENNIE + 1, pro: false, dzien: '2026-11-04', strefa: 'Europe/Warsaw' }, K);
    expect(l).toMatchObject({ bezLimitu: false, pozostalo: 0 });
  });

  it.each(Z_LIMITU)('AK-BR-LIM-001-c limit wyczerpany: %s (pierwsze podejście: %s) → bez startu', (rodzaj, pierwsze) => {
    expect(mozeStartowac(rodzaj, pierwsze, WYCZERPANY)).toEqual({ start: false, powod: 'limit_wyczerpany' });
  });

  it.each(Z_LIMITU)('AK-BR-LIM-001-d darmowa aktywność dnia: %s → start z limitu', (rodzaj, pierwsze) => {
    expect(mozeStartowac(rodzaj, pierwsze, JEDNA)).toEqual({ start: true, zLimitu: true });
  });
});

describe('AK-BR-LIM-003: nauka poza limitem', () => {
  it.each(POZA_LIMITEM)('AK-BR-LIM-003-a %s (pierwsze podejście: %s) przy wyczerpanym limicie → start, licznik bez zmian', (rodzaj, pierwsze) => {
    expect(mozeStartowac(rodzaj, pierwsze, WYCZERPANY)).toEqual({ start: true, zLimitu: false });
  });
});

describe('ADR 0007 „Potwierdzenie”: Pro i nowy dzień', () => {
  it('AK-ADR0007-pro: Pro → bez licznika i start każdej aktywności', () => {
    const l = limitDnia({ zuzyteDzis: 5, pro: true, dzien: '2026-11-04', strefa: 'Europe/Warsaw' }, K);
    expect(l).toEqual({ bezLimitu: true });
    for (const [rodzaj, pierwsze] of [...Z_LIMITU, ...POZA_LIMITEM]) expect(mozeStartowac(rodzaj, pierwsze, l).start).toBe(true);
  });

  it.each(STREFY_TESTOWE)('AK-BR-LIM-005-a nowy dzień: brak zużycia w następnym dniu → znów limit z konfiguracji (%s)', (strefa) => {
    for (const dzien of dniTestowe(strefa)) {
      const l = limitDnia({ zuzyteDzis: 0, pro: false, dzien: nastepnyDzien(dzien), strefa }, K);
      expect(l, `${strefa} ${dzien}`).toMatchObject({ bezLimitu: false, pozostalo: K.LIMIT_AKTYWNOSCI_DZIENNIE });
    }
  });
});
