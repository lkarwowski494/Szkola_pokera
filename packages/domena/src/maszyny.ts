// Maszyny stanów (ADR 0010; tabele przejść: docs/architektura/moduly.md „Maszyny stanów”).
// Zaślepki roli 07 (E3). ADR 0010 podaje kształt `przejscie(stan, zdarzenie) → stan | blad`, moduly.md tabele bez sygnatur
// TypeScript; typy stanu i zdarzeń niżej uzupełniła rola 07 (luka dla 05, strategia.md §9 część 5). Funkcje są czyste:
// nie zmieniają argumentów, czas przychodzi w zdarzeniu (`teraz`), zapis robi port bazy w tej samej transakcji (ADR 0010 pkt 2).
import type { Limit } from './limit';
import { niezaimplementowane } from './niezaimplementowane';
import type { RodzajAktywnosci, Wynik } from './typy';

// --- aktywnosc (sesja, powtórki, scenariusz, test modułu, lekcja, ocena poziomu; stan trwały: aktywnosc.stan + krok) ---
export interface PlanAktywnosci {
  liczbaKrokow: number; // > 0; zapisany w `aktywnosc.plan`
  // tylko `scenariusz`: dla kroku i akcje z oceną w treści scenariusza (D-109); akcja spoza listy → `akcja_niedostepna`
  akcjeZOcena?: readonly (readonly string[])[];
}
interface AktywnoscWspolne {
  rodzaj: RodzajAktywnosci;
  zLimitu: boolean;
  dzienLokalny: string; // RRRR-MM-DD w strefie w chwili startu (ADR 0007 pkt 1)
  strefa: string;
  startMs: number;
  plan: PlanAktywnosci;
  krok: number; // indeks bieżącego kroku (0…liczbaKrokow−1) w `w_toku`
}
export type AktywnoscWToku = AktywnoscWspolne & { stan: 'w_toku' };
export type AktywnoscZamknieta = AktywnoscWspolne & { stan: 'zakonczona' | 'porzucona'; koniecMs: number };
export type Aktywnosc = AktywnoscWToku | AktywnoscZamknieta;

export type ZdarzenieAktywnosci =
  | { typ: 'odpowiedz'; krok: number; akcja?: string; teraz: number }
  | { typ: 'wznow' }
  | { typ: 'porzuc'; teraz: number };
export type PowodAktywnosci = 'przejscie_niedozwolone' | 'akcja_niedostepna' | 'krok_niezgodny';

// Wiersz „— start” tabeli: start tylko, gdy `mozeStartowac` pozwala (ADR 0007 pkt 3: limit sprawdzany raz, przy starcie).
export function startAktywnosci(_wej: {
  rodzaj: RodzajAktywnosci;
  pierwszePodejscieTestu: boolean;
  limit: Limit;
  plan: PlanAktywnosci;
  teraz: number;
  dzienLokalny: string;
  strefa: string;
}): Wynik<AktywnoscWToku, 'limit_wyczerpany' | 'plan_niepoprawny'> {
  return niezaimplementowane('startAktywnosci (ADR 0010, 0007, BR-LIM-001)');
}

export function przejscieAktywnosci(_a: Aktywnosc, _z: ZdarzenieAktywnosci): Wynik<Aktywnosc, PowodAktywnosci> {
  return niezaimplementowane('przejscieAktywnosci (ADR 0010, BR-CWI-004, BR-LIM-002, D-109)');
}

// Wejście do przepływu (PR-03, PR-05): aktywność w toku tego rodzaju → wznowienie bez sprawdzania limitu, także po północy
// (ADR 0007 pkt 3, BR-LIM-002); brak → start albo ekran zakupu według `mozeStartowac`.
export type WejscieDoAktywnosci =
  | { akcja: 'wznow'; aktywnosc: AktywnoscWToku }
  | { akcja: 'start'; zLimitu: boolean }
  | { akcja: 'ekran_zakupu' };
export function wejscieDoAktywnosci(
  _rodzaj: RodzajAktywnosci,
  _wToku: AktywnoscWToku | null,
  _pierwszePodejscieTestu: boolean,
  _limit: Limit,
): WejscieDoAktywnosci {
  return niezaimplementowane('wejscieDoAktywnosci (ADR 0007 pkt 3, BR-LIM-002)');
}

// --- zakup (w pamięci, bez tabeli; stan trwały to transakcje sklepu) ---
export const STANY_ZAKUPU = ['bezczynny', 'w_toku', 'oczekuje', 'zakonczony', 'blad', 'brak_zakupow'] as const;
export type StanZakupu =
  | { stan: 'bezczynny' | 'oczekuje' | 'zakonczony' | 'blad' | 'brak_zakupow' }
  | { stan: 'w_toku'; operacja: 'kup' | 'przywroc' };
export type ZdarzenieZakupu =
  | { typ: 'kup'; produkt: string }
  | { typ: 'przywroc' } // tylko z przycisku (ADR 0006)
  | { typ: 'transakcja_zakonczona' }
  | { typ: 'anulowano' }
  | { typ: 'oczekuje' } // np. zgoda rodzica
  | { typ: 'transakcja_z_nasluchu' }
  | { typ: 'blad_sklepu' }
  | { typ: 'brak_zakupow' }
  | { typ: 'komunikat_zamkniety' };
export function przejscieZakupu(_s: StanZakupu, _z: ZdarzenieZakupu): Wynik<StanZakupu, 'przejscie_niedozwolone'> {
  return niezaimplementowane('przejscieZakupu (ADR 0010, BR-ZAK-002)');
}

// --- import (PR-07) ---
export const STANY_IMPORTU = ['wybor_pliku', 'walidacja', 'bledny_plik', 'nowsza_wersja', 'potwierdzenie', 'zapis', 'gotowe', 'blad_zapisu'] as const;
export type StanImportu = (typeof STANY_IMPORTU)[number];
export type ZdarzenieImportu =
  | { typ: 'plik_wybrany' }
  | { typ: 'zwalidowano'; wynik: 'ok' | 'bledny_plik' | 'nowsza_wersja'; istniejacyPostep: boolean }
  | { typ: 'potwierdz' }
  | { typ: 'zapisano' }
  | { typ: 'blad_zapisu' };
export function przejscieImportu(_s: StanImportu, _z: ZdarzenieImportu): Wynik<StanImportu, 'przejscie_niedozwolone'> {
  return niezaimplementowane('przejscieImportu (ADR 0010, 0008, BR-DANE-002)');
}
