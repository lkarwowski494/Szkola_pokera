// Przebieg scenariusza rozdania (PR-05, F-12; BR-SCN-001–004, D-109). Zaślepka roli 07 (E3 część 13, D-197): moduly.md
// opisuje scenariusz tylko jako rodzaj `aktywnosc` (krok = decyzja, akcje z oceną w treści), bez kształtu treści ani funkcji
// przebiegu — sygnatura niżej to propozycja roli 07 (luka dla 05, strategia.md §9 część 13). Funkcja jest czysta
// i deterministyczna: karty i akcje rywala pochodzą z treści scenariusza (rola 06), bez losowania (BR-SCN-001).
import { niezaimplementowane } from './niezaimplementowane';
import type { OcenaOdpowiedzi, Wynik } from './typy';

export type Ulica = 'preflop' | 'flop' | 'turn' | 'river';
/** Akcja gracza z oceną w treści (D-109): częstość z rozwiązania, odpowiedź rywala i następna decyzja albo koniec. */
export interface AkcjaScenariusza {
  akcja: string;
  czestosc: number; // 0–1, z rozwiązania (RD-11)
  rywal: string | null; // akcja rywala po tej akcji gracza (z treści)
  dalej: number | 'pokazanie' | 'koniec'; // indeks następnej decyzji, pokazanie kart albo koniec z wyjaśnieniem
  wyjasnienie: string;
}
export interface DecyzjaScenariusza {
  ulica: Ulica;
  akcje: readonly AkcjaScenariusza[];
}
export interface TrescScenariusza {
  id: string;
  rekaGracza: readonly [string, string];
  rekaRywala: readonly [string, string];
  stol: readonly [string, string, string, string, string]; // karty stołu ustalone w treści (flop, turn, river)
  decyzje: readonly DecyzjaScenariusza[];
}

export interface KrokPrzebiegu {
  ulica: Ulica;
  stolWidoczny: readonly string[]; // karty stołu odkryte przy tej decyzji
  wybor: string;
  ocena: OcenaOdpowiedzi; // RD-11 z częstości wyboru wobec najczęstszej akcji tej decyzji
  wyjasnienie: string; // przy ocenie innej niż „zgodne”: także dlaczego najczęstsza akcja jest lepsza
  rywal: string | null;
}
export interface PokazanieKart {
  zwyciezca: 'gracz' | 'rywal' | 'remis';
  wyjasnienie: string; // przy różnych kategoriach: liczby układów obu kategorii (RD-10)
}
/** Podsumowanie: tylko oceny decyzji — bez wygranej, salda i stosu przenoszonego dalej (BR-SCN-002). */
export interface PodsumowanieScenariusza {
  oceny: readonly OcenaOdpowiedzi[];
}
export interface PrzebiegScenariusza {
  kroki: readonly KrokPrzebiegu[];
  koniec: 'pokazanie' | 'koniec' | 'w_toku'; // w_toku: wybory kończą się przed końcem treści (wznowienie, ocena krok po kroku)
  pokazanie: PokazanieKart | null;
  podsumowanie: PodsumowanieScenariusza;
}

/** Przebieg dla wyborów gracza w kolejnych decyzjach; wybór spoza akcji z oceną → `akcja_niedostepna` (D-109). */
export function przebiegScenariusza(_tresc: TrescScenariusza, _wybory: readonly string[]): Wynik<PrzebiegScenariusza, 'akcja_niedostepna'> {
  return niezaimplementowane('przebiegScenariusza (BR-SCN-001–004, D-109)');
}
