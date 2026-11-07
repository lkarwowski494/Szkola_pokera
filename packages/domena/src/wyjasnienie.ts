// Wyjaśnienie zadania i ocena odpowiedzi liczbowej (BR-CWI-002, BR-CWI-003, BR-CWI-007, BR-JEZ-002). Zaślepki roli 07
// (E3 część 13, przegląd D-043 W1): moduly.md nie ma portu wyjaśnienia zadań (także generowanych w aplikacji, poker-core
// `generatePotOdds` itp.) ani formatu liczby według języka — sygnatury niżej to propozycja roli 07 (luka dla 05,
// strategia.md §9 część 13). Liczby wyjaśnienia liczy silnik `poker-core` (jedno źródło z budową treści).
import { niezaimplementowane } from './niezaimplementowane';
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
export function wyjasnienieZadania(_z: ZadanieZWyjasnieniem): WyjasnienieZadania {
  return niezaimplementowane('wyjasnienieZadania (BR-CWI-002, BR-CWI-003, BR-CWI-007)');
}

/** Ocena odpowiedzi liczbowej (procenty) względem wartości dokładnej: w TOLERANCJA_PROCENT_OK pp → zgodne,
 *  dalej niż TOLERANCJA_PROCENT_BLISKO pp → błąd (B-017); przedział pomiędzy — decyzja 05/06. */
export function ocenOdpowiedzLiczbowa(_dokladnaProcent: number, _odpowiedzProcent: number): OcenaOdpowiedzi {
  return niezaimplementowane('ocenOdpowiedzLiczbowa (BR-CWI-003, B-017)');
}

/** Procent zapisany według języka interfejsu (BR-JEZ-002: „34,97%” po polsku, „34.97%” po angielsku). */
export function formatProcent(_ulamek: number, _jezyk: string, _miejsca: number): string {
  return niezaimplementowane('formatProcent (BR-JEZ-002)');
}
