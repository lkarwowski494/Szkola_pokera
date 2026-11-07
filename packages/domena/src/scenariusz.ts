// Przebieg scenariusza rozdania (PR-05, F-12; BR-SCN-001–004, D-109). Sygnatura roli 07 przyjęta przez 05 (fix 05, D-219):
// krok = indeks decyzji, `dalej` prowadzi do następnej decyzji albo kończy. Funkcja jest czysta i deterministyczna: karty
// i akcje rywala pochodzą z treści scenariusza (rola 06), bez losowania (BR-SCN-001). Ocena decyzji: RD-11 (`rangeVerdict`
// z poker-core, progi z konfiguracji), pokazanie kart: `compareHands`, liczby układów: RD-10 (`fiveCardHandCount`).
import { compareHands, evaluateHand, fiveCardHandCount, parseCard, rangeVerdict, type HandCategory, type RangeVerdict } from '@szkola/poker-core';
import { KONFIGURACJA as K } from './konfiguracja';
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

const KART_STOLU: Readonly<Record<Ulica, number>> = { preflop: 0, flop: 3, turn: 4, river: 5 };
const NA_OCENE: Readonly<Record<RangeVerdict, OcenaOdpowiedzi>> = { correct: 'zgodne', acceptable: 'dopuszczalne', inaccuracy: 'niedokladnosc', wrong: 'blad' };

function pokazanie(t: TrescScenariusza): PokazanieKart {
  const stol = t.stol.map(parseCard);
  const gracz = [...t.rekaGracza.map(parseCard), ...stol];
  const rywal = [...t.rekaRywala.map(parseCard), ...stol];
  const w = compareHands(gracz, rywal);
  const kategorie: [HandCategory, HandCategory] = [evaluateHand(gracz).category, evaluateHand(rywal).category];
  // liczby układów obu kategorii (RD-10), gdy różne; tekst zdania należy do interfejsu (zgłoszenie dla 04/05 w raporcie 08 fix)
  const wyjasnienie = kategorie[0] === kategorie[1] ? '' : `${fiveCardHandCount(kategorie[0])} / ${fiveCardHandCount(kategorie[1])}`;
  return { zwyciezca: w === 1 ? 'gracz' : w === -1 ? 'rywal' : 'remis', wyjasnienie };
}

/** Przebieg dla wyborów gracza w kolejnych decyzjach; wybór spoza akcji z oceną → `akcja_niedostepna` (D-109), także wybór
 *  po końcu scenariusza (nie ma decyzji, której by dotyczył). */
export function przebiegScenariusza(tresc: TrescScenariusza, wybory: readonly string[]): Wynik<PrzebiegScenariusza, 'akcja_niedostepna'> {
  const kroki: KrokPrzebiegu[] = [];
  let indeks = 0;
  let koniec: PrzebiegScenariusza['koniec'] = 'w_toku';
  for (const wybor of wybory) {
    const decyzja: DecyzjaScenariusza | undefined = koniec === 'w_toku' ? tresc.decyzje[indeks] : undefined;
    const i = decyzja ? decyzja.akcje.findIndex((a) => a.akcja === wybor) : -1;
    if (!decyzja || i < 0) return { ok: false, powod: 'akcja_niedostepna' };
    const akcja: AkcjaScenariusza = decyzja.akcje[i]!;
    const oceny = rangeVerdict(decyzja.akcje.map((a) => a.czestosc), { mixedMin: K.OCENA_PROG_DOPUSZCZALNE, mixedLow: K.OCENA_PROG_MIESZANA_DOLNY });
    const ocena = NA_OCENE[oceny[i]!];
    const najczestsza = decyzja.akcje.reduce((m: AkcjaScenariusza, a) => (a.czestosc > m.czestosc ? a : m));
    const wyjasnienie = ocena === 'zgodne' || najczestsza === akcja ? akcja.wyjasnienie : `${akcja.wyjasnienie} ${najczestsza.wyjasnienie}`;
    kroki.push({ ulica: decyzja.ulica, stolWidoczny: tresc.stol.slice(0, KART_STOLU[decyzja.ulica]), wybor, ocena, wyjasnienie, rywal: akcja.rywal });
    if (typeof akcja.dalej === 'number') indeks = akcja.dalej;
    else koniec = akcja.dalej;
  }
  return {
    ok: true,
    wartosc: { kroki, koniec, pokazanie: koniec === 'pokazanie' ? pokazanie(tresc) : null, podsumowanie: { oceny: kroki.map((k) => k.ocena) } },
  };
}
