// Wyjaśnienie zadania i ocena odpowiedzi liczbowej (BR-CWI-002, BR-CWI-003, BR-CWI-007). Sygnatury roli 07 przyjęte przez 05
// (fix 05, L7-13c, moduly.md „Wyjaśnienie zadań”). Liczby liczy silnik `poker-core` (jedno źródło z budową treści): RD-01
// `requiredEquity`, RD-02 `mdf`, RD-04 `hitProbability`, RD-05 `ruleOf2And4`, RD-08 `callEv`, RD-10 `fiveCardHandCount`.
import { callEv, compareHands, evaluateHand, fiveCardHandCount, hitProbability, mdf, parseCard, requiredEquity, ruleOf2And4 } from '@szkola/poker-core';
import { KONFIGURACJA as K } from './konfiguracja';
import type { OcenaOdpowiedzi } from './typy';

export type ZadanieZWyjasnieniem =
  | { rodzaj: 'sprawdzenie'; pula: number; zaklad: number; equity?: number } // pula przed zakładem rywala
  | { rodzaj: 'szansa'; outy: number; nieznane: number; doOdkrycia: 1 | 2 }
  | { rodzaj: 'zwyciezca'; rekaA: readonly [string, string]; rekaB: readonly [string, string]; stol: readonly string[] };

/** Liczby, które wyjaśnienie pokazuje (klucze stałe dla rodzaju), i poprawna odpowiedź. */
export interface WyjasnienieZadania {
  poprawna: number | 'A' | 'B' | 'remis';
  // sprawdzenie: wymaganeEquity, mdf, (przy equity) ev; szansa: dokladna, przyblizenie;
  // zwyciezca: ukladyZwyciezcy, ukladyPrzegranego (liczby 5-kartowych układów kategorii, RD-10)
  liczby: Readonly<Record<string, number>>;
}
export function wyjasnienieZadania(z: ZadanieZWyjasnieniem): WyjasnienieZadania {
  switch (z.rodzaj) {
    case 'sprawdzenie': {
      const wymaganeEquity = requiredEquity(z.pula, z.zaklad);
      const liczby: Record<string, number> = { wymaganeEquity, mdf: mdf(z.pula, z.zaklad) };
      if (z.equity !== undefined) liczby.ev = callEv(z.equity, z.pula + z.zaklad, z.zaklad); // pula po zakładzie rywala
      return { poprawna: wymaganeEquity, liczby };
    }
    case 'szansa': {
      const dokladna = hitProbability(z.outy, z.nieznane, z.doOdkrycia);
      return { poprawna: dokladna, liczby: { dokladna, przyblizenie: ruleOf2And4(z.outy, z.doOdkrycia) } };
    }
    case 'zwyciezca': {
      const stol = z.stol.map(parseCard);
      const a = [...z.rekaA.map(parseCard), ...stol];
      const b = [...z.rekaB.map(parseCard), ...stol];
      const w = compareHands(a, b);
      const [wygrany, przegrany] = w === -1 ? [b, a] : [a, b];
      return {
        poprawna: w === 1 ? 'A' : w === -1 ? 'B' : 'remis',
        liczby: { ukladyZwyciezcy: fiveCardHandCount(evaluateHand(wygrany).category), ukladyPrzegranego: fiveCardHandCount(evaluateHand(przegrany).category) },
      };
    }
  }
}

/** Ocena odpowiedzi liczbowej (procenty) względem wartości dokładnej: w TOLERANCJA_PROCENT_OK pp → zgodne, w
 *  TOLERANCJA_PROCENT_BLISKO pp → niedokladnosc, dalej → błąd (granice włączne, ε = 1e-9; B-017, moduly.md L7-13c). */
const EPS = 1e-9; // granice włączne mimo błędu zaokrąglenia liczb zmiennoprzecinkowych (moduly.md L7-13c)
export function ocenOdpowiedzLiczbowa(dokladnaProcent: number, odpowiedzProcent: number): OcenaOdpowiedzi {
  const r = Math.abs(odpowiedzProcent - dokladnaProcent);
  if (r <= K.TOLERANCJA_PROCENT_OK + EPS) return 'zgodne';
  if (r <= K.TOLERANCJA_PROCENT_BLISKO + EPS) return 'niedokladnosc';
  return 'blad';
}

// Format liczby według języka nie należy do domeny (L7-13d, D-220): domena zwraca liczby, interfejs formatuje przez
// `@szkola/jezyki` (`formatujProcent`, `formatujLiczbe`); zaślepka `formatProcent` roli 07 usunięta w 07 fix.
