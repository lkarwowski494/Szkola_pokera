// Testy akceptacyjne powtórek (BR-POW-001, BR-POW-002) i wznowienia lekcji oraz scenariusza (BR-KURS-004, BR-SCN-001-b)
// (rola 07 E3 część 13, D-197). Wyrocznia: kryteria BRD (relacje: „błąd wcześniej niż zgodne”, „od najdawniej zaległej”,
// „żadna nie znika po zmianie strefy”, „wraca do tej samej części / decyzji”), nie wartości z kodu. BR-POW-001 sprawdza
// istniejący `@szkola/srs` (FSRS, D-145) — strażnik zielony; kolejka i wznowienie — zaślepki domeny.
// Wersja oczekująca (07 fix, D-224; L7-13b, D-219): plan scenariusza ze szkieletem `decyzje` zamiast `akcjeZOcena` i wznowienie
// po skoku w grafie. Zastępuje packages/domena/test/powtorki-wznowienie.test.ts w commicie 08, który zmienia `PlanAktywnosci`.
import fc from 'fast-check';
import { afterEach, describe, expect, it } from 'vitest';
import { dueCards, newCard, review, type StoredCard } from '../../../packages/srs/src';
import { KONFIGURACJA as K, kolejkaPowtorek, wejscieDoAktywnosci, type AktywnoscWToku, type Limit, type PlanAktywnosci } from '../../../packages/domena/src';
import { STREFY_TESTOWE } from '../../narzedzia/strefy';

const DZIEN = 86_400_000;
const T0 = Date.UTC(2026, 10, 7, 18);

describe('AK-BR-POW-001: zadanie z błędem wraca wcześniej niż zgodne', () => {
  it('AK-BR-POW-001-a ta sama sesja, błąd i zgodne → błąd wraca nie później i stoi w kolejce przed zgodnym', () => {
    const blad = review(newCard('r-blad', T0), { correct: false, elapsedMs: 4000 }, T0).card;
    const zgodne = review(newCard('r-zgodne', T0), { correct: true, elapsedMs: 4000 }, T0).card;
    expect(blad.due).toBeLessThan(zgodne.due);
    const pierwszyDzien = (familyId: string) => {
      for (let d = 0; d <= 60; d++) if (dueCards([blad, zgodne], T0 + d * DZIEN).some((c) => c.familyId === familyId)) return d;
      return Infinity;
    };
    // „wcześniej” = nie później niż zgodne i przed nim w kolejce tego dnia (odczyt D-197; FSRS ma kroki nauki w minutach,
    // więc oba mogą wrócić tego samego dnia — doprecyzowanie brzmienia: zgłoszenie do 01, strategia.md §9 część 13)
    const dB = pierwszyDzien('r-blad');
    expect(dB).toBeLessThanOrEqual(pierwszyDzien('r-zgodne'));
    expect(dueCards([zgodne, blad], T0 + dB * DZIEN)[0]?.familyId).toBe('r-blad');
  });

  it('AK-BR-POW-001-b własność: dla każdego czasu odpowiedzi błąd ma termin wcześniejszy niż zgodne (ta sama chwila)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 200, max: 60_000 }), fc.integer({ min: 200, max: 60_000 }), (msBlad, msZgodne) => {
        const blad = review(newCard('a', T0), { correct: false, elapsedMs: msBlad }, T0).card;
        const zgodne = review(newCard('b', T0), { correct: true, elapsedMs: msZgodne }, T0).card;
        expect(blad.due).toBeLessThan(zgodne.due);
      }),
    );
  });
});

const karta = (familyId: string, due: number) => ({ familyId, due });

describe('AK-BR-POW-002: powrót po przerwie i zmiana strefy', () => {
  const pierwotnaTZ = process.env.TZ;
  afterEach(() => {
    if (pierwotnaTZ === undefined) delete process.env.TZ; // przypisanie undefined zapisałoby napis „undefined”
    else process.env.TZ = pierwotnaTZ;
  });

  it('AK-BR-POW-002-a po kilku tygodniach wszystkie zaległe są w kolejce od najdawniej zaległej; wejście bez zmian', () => {
    const teraz = T0 + 35 * DZIEN;
    const karty = Object.freeze([karta('c', T0 + 20 * DZIEN), karta('a', T0 + 1 * DZIEN), karta('b', T0 + 9 * DZIEN), karta('przyszla', teraz + DZIEN)].map((k) => Object.freeze(k)));
    const wTresci = new Set(['a', 'b', 'c', 'przyszla']);
    expect(kolejkaPowtorek(karty, wTresci, teraz).map((k) => k.familyId)).toEqual(['a', 'b', 'c']);
    expect(karty.map((k) => k.familyId)).toEqual(['c', 'a', 'b', 'przyszla']);
    // granica: termin dokładnie teraz jest zaległy, minutę później jeszcze nie
    expect(kolejkaPowtorek([karta('teraz', teraz), karta('za-minute', teraz + 60_000)], new Set(['teraz', 'za-minute']), teraz).map((k) => k.familyId)).toEqual(['teraz']);
  });

  it('AK-BR-POW-002-b zmiana strefy (TZ procesu po liście stref testowych) nie usuwa żadnej powtórki z kolejki', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: -60, max: 60 }), { minLength: 1, maxLength: 30 }), fc.integer({ min: 0, max: 47 }), (dni, godzina) => {
        const teraz = T0 + godzina * 3_600_000;
        const karty = dni.map((d, i) => karta(`r${i}`, T0 + d * DZIEN));
        const wTresci = new Set(karty.map((k) => k.familyId));
        const oczekiwane = karty.filter((k) => k.due <= teraz).map((k) => k.familyId).sort();
        for (const strefa of STREFY_TESTOWE) {
          process.env.TZ = strefa;
          expect(kolejkaPowtorek(karty, wTresci, teraz).map((k) => k.familyId).sort(), strefa).toEqual(oczekiwane);
        }
      }),
      { numRuns: 25 },
    );
  });
});

const JEST: Limit = { bezLimitu: false, pozostalo: K.LIMIT_AKTYWNOSCI_DZIENNIE, odnowienieMs: 0 };
const WYCZERPANY: Limit = { bezLimitu: false, pozostalo: 0, odnowienieMs: 0 };
const PRO: Limit = { bezLimitu: true };
function wToku(rodzaj: 'lekcja' | 'scenariusz', trescId: string, krok: number, liczbaKrokow: number): AktywnoscWToku {
  return {
    rodzaj,
    stan: 'w_toku',
    zLimitu: rodzaj === 'scenariusz',
    dzienLokalny: '2026-11-07',
    strefa: 'Europe/Warsaw',
    startMs: T0,
    // scenariusz: decyzja i → call do i + 1 albo skok raise do i + 2 (gdy jest), fold kończy; typ z moduly.md (D-219) przez rzutowanie
    plan: (rodzaj === 'scenariusz'
      ? { liczbaKrokow, trescId, decyzje: Array.from({ length: liczbaKrokow }, (_, i) => [
        { akcja: 'call', dalej: i + 1 < liczbaKrokow ? i + 1 : 'pokazanie' }, { akcja: 'fold', dalej: 'koniec' },
        ...(i + 2 < liczbaKrokow ? [{ akcja: 'raise', dalej: i + 2 }] : []),
      ]) }
      : { liczbaKrokow, trescId }) as PlanAktywnosci,
    krok,
  };
}

describe('AK-BR-KURS-004 i AK-BR-SCN-001-b: po ponownym uruchomieniu powrót do tego samego miejsca', () => {
  it('AK-BR-KURS-004-a lekcja w trzeciej części → wejście do tej lekcji wznawia ją w trzeciej części (krok 2), także bez limitu', () => {
    const a = wToku('lekcja', 'm2-l1', 2, 6);
    for (const limit of [JEST, WYCZERPANY, PRO]) {
      const w = wejscieDoAktywnosci('lekcja', 'm2-l1', a, false, limit);
      expect(w).toEqual({ akcja: 'wznow', aktywnosc: a });
    }
  });

  it('AK-BR-SCN-001-b scenariusz przy decyzji na turnie → wejście do tego scenariusza wznawia tę decyzję, także przy wyczerpanym limicie', () => {
    const TURN = 2; // kroki: preflop, flop, turn, river — krok to indeks decyzji w treści scenariusza
    const a = wToku('scenariusz', 'scn-01', TURN, 4);
    for (const limit of [JEST, WYCZERPANY, PRO]) {
      const w = wejscieDoAktywnosci('scenariusz', 'scn-01', a, false, limit);
      expect(w).toEqual({ akcja: 'wznow', aktywnosc: a });
    }
  });

  it('AK-BR-SCN-001-b-skok po skoku (preflop raise → turn, decyzja 1 pominięta) wejście wznawia decyzję 2, nie 1 (D-219: krok = indeks decyzji)', () => {
    const a = wToku('scenariusz', 'scn-01', 2, 4);
    for (const limit of [JEST, WYCZERPANY, PRO]) {
      expect(wejscieDoAktywnosci('scenariusz', 'scn-01', a, false, limit)).toEqual({ akcja: 'wznow', aktywnosc: a });
    }
  });
});
