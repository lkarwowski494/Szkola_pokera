// Maszyny stanów (ADR 0010; tabele przejść: docs/architektura/moduly.md „Maszyny stanów”).
// Zaślepki roli 07 (E3). ADR 0010 podaje kształt `przejscie(stan, zdarzenie) → stan | blad`, moduly.md tabele bez sygnatur
// TypeScript; typy stanu i zdarzeń niżej uzupełniła rola 07 (luka dla 05, strategia.md §9 część 5). Funkcje są czyste:
// nie zmieniają argumentów, czas przychodzi w zdarzeniu (`teraz`), zapis robi port bazy w tej samej transakcji (ADR 0010 pkt 2).
import type { Konfiguracja } from './konfiguracja';
import { KONFIGURACJA } from './konfiguracja';
import { mozeStartowac, type Limit } from './limit';
import type { RodzajAktywnosci, Wynik } from './typy';

// --- aktywnosc (sesja, powtórki, scenariusz, test modułu, lekcja, ocena poziomu; stan trwały: aktywnosc.stan + krok) ---
export interface PlanAktywnosci {
  liczbaKrokow: number; // > 0; zapisany w `aktywnosc.plan`
  // identyfikator treści (scenariusz, moduł testu, lekcja; schemat.sql: plan zawiera „moduł testu, scenariusz albo lekcja”);
  // null dla sesji i powtórek (jedna aktywność danego rodzaju). Rozróżnia „wznów” od „porzuć i zacznij inną” (moduly.md, `porzuc`).
  trescId: string | null;
  // tylko `scenariusz` (D-219): szkielet grafu z treści — dla decyzji i akcje z oceną (D-109) i następna decyzja (`dalej`:
  // indeks > i albo koniec); `liczbaKrokow` = liczba decyzji, krok = indeks decyzji. Akcja spoza listy → `akcja_niedostepna`.
  decyzje?: readonly (readonly AkcjaPlanu[])[];
  // D-248 (08-F10): zadania kroków w kolejności (sesja, powtórki, test, lekcja, ocena poziomu) — wznowienie buduje ten sam
  // zestaw; `ziarno` (liczba całkowita) odtwarza zadanie generowane. Plan zapisany w JSON kolumny `plan` (schemat v1 bez zmian).
  zadania?: readonly ZadaniePlanu[];
}
export interface ZadaniePlanu {
  id: string;
  ziarno: number;
}
export interface AkcjaPlanu {
  akcja: string;
  dalej: number | 'pokazanie' | 'koniec';
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
export function startAktywnosci(wej: {
  rodzaj: RodzajAktywnosci;
  pierwszePodejscieTestu: boolean;
  limit: Limit;
  plan: PlanAktywnosci;
  teraz: number;
  dzienLokalny: string;
  strefa: string;
}): Wynik<AktywnoscWToku, 'limit_wyczerpany' | 'plan_niepoprawny'> {
  if (!planPoprawny(wej.rodzaj, wej.plan, KONFIGURACJA)) return { ok: false, powod: 'plan_niepoprawny' };
  const m = mozeStartowac(wej.rodzaj, wej.pierwszePodejscieTestu, wej.limit);
  if (!m.start) return { ok: false, powod: m.powod };
  return {
    ok: true,
    wartosc: {
      stan: 'w_toku', rodzaj: wej.rodzaj, zLimitu: m.zLimitu, dzienLokalny: wej.dzienLokalny, strefa: wej.strefa,
      startMs: wej.teraz, plan: wej.plan, krok: 0,
    },
  };
}

// Plan: dodatnia całkowita liczba kroków; ocena poziomu najwyżej OCENA_POZIOMU_MAKS_PYTAN (D-105; dłuższy odrzucony, nie
// skracany — skracanie zmieniałoby plan zapisany w bazie po cichu); scenariusz: graf bez cykli (D-219) — każda decyzja ma
// ≥ 1 akcję, każde `dalej` liczbowe jest całkowite, > własny indeks i < liczby decyzji, więc każda ścieżka się kończy.
function planPoprawny(rodzaj: RodzajAktywnosci, plan: PlanAktywnosci, k: Konfiguracja): boolean {
  if (!Number.isInteger(plan.liczbaKrokow) || plan.liczbaKrokow <= 0) return false;
  if (rodzaj === 'ocena_poziomu' && plan.liczbaKrokow > k.OCENA_POZIOMU_MAKS_PYTAN) return false;
  const z = plan.zadania; // D-248: krok i = zadanie i
  if (z && (z.length !== plan.liczbaKrokow || z.some((x) => x.id.length === 0 || !Number.isInteger(x.ziarno)))) return false;
  if (rodzaj === 'scenariusz') {
    const d = plan.decyzje;
    if (!d || d.length !== plan.liczbaKrokow) return false;
    const dalejPoprawne = (x: AkcjaPlanu, i: number) =>
      typeof x.dalej !== 'number' || (Number.isInteger(x.dalej) && x.dalej > i && x.dalej < d.length);
    if (d.some((akcje, i) => akcje.length === 0 || !akcje.every((x) => dalejPoprawne(x, i)))) return false;
  }
  return true;
}

// Tabela `aktywnosc` z moduly.md. Przejścia nie zależą od limitu ani od daty (BR-LIM-002): rozpoczęta aktywność kończy się
// bez ekranu zakupu. Kolejność sprawdzeń przy `odpowiedz`: stan, krok, akcja (podwójne naciśnięcie po zapisie → krok_niezgodny).
export function przejscieAktywnosci(a: Aktywnosc, z: ZdarzenieAktywnosci): Wynik<Aktywnosc, PowodAktywnosci> {
  if (a.stan !== 'w_toku') return { ok: false, powod: 'przejscie_niedozwolone' };
  switch (z.typ) {
    case 'wznow':
      return { ok: true, wartosc: a };
    case 'porzuc':
      return { ok: true, wartosc: { ...a, stan: 'porzucona', koniecMs: z.teraz } };
    case 'odpowiedz': {
      if (z.krok !== a.krok) return { ok: false, powod: 'krok_niezgodny' };
      if (a.rodzaj === 'scenariusz') {
        // D-219: następna decyzja z grafu (`dalej`), nie `krok + 1`; pokazanie albo koniec kończy aktywność
        const wybrana = z.akcja === undefined ? undefined : a.plan.decyzje?.[a.krok]?.find((x) => x.akcja === z.akcja);
        if (wybrana === undefined) return { ok: false, powod: 'akcja_niedostepna' };
        if (typeof wybrana.dalej === 'number') return { ok: true, wartosc: { ...a, krok: wybrana.dalej } };
        return { ok: true, wartosc: { ...a, stan: 'zakonczona', koniecMs: z.teraz } };
      }
      if (a.krok >= a.plan.liczbaKrokow - 1) return { ok: true, wartosc: { ...a, stan: 'zakonczona', koniecMs: z.teraz } };
      return { ok: true, wartosc: { ...a, krok: a.krok + 1 } };
    }
  }
}

// Wejście do przepływu (PR-03, PR-05): aktywność w toku tego rodzaju i tej treści → wznowienie bez sprawdzania limitu
// (ADR 0007 pkt 3, BR-LIM-002; funkcja nie dostaje dzisiejszej daty, więc północ nic nie zmienia); w toku inna treść tego
// rodzaju → `porzuc_i_start` tylko, gdy `mozeStartowac` pozwala, inaczej ekran zakupu, a stara zostaje nietknięta;
// brak → start albo ekran zakupu. Ocena poziomu: sprzeczność BR-ONB-001 „Przerwana ocena” (od początku albo „Pomiń”)
// z tabelą (`wznow` zawsze) — luka dla 05/01, bez testu do rozstrzygnięcia.
export type WejscieDoAktywnosci =
  | { akcja: 'wznow'; aktywnosc: AktywnoscWToku }
  | { akcja: 'start'; zLimitu: boolean }
  | { akcja: 'porzuc_i_start'; porzuc: AktywnoscWToku; zLimitu: boolean }
  | { akcja: 'ekran_zakupu' };
// `wToku` innego rodzaju nie koliduje (porzucenie dotyczy „innej aktywności tego rodzaju”, moduly.md).
export function wejscieDoAktywnosci(
  rodzaj: RodzajAktywnosci,
  trescId: string | null,
  wToku: AktywnoscWToku | null,
  pierwszePodejscieTestu: boolean,
  limit: Limit,
): WejscieDoAktywnosci {
  const tegoRodzaju = wToku !== null && wToku.rodzaj === rodzaj ? wToku : null;
  if (tegoRodzaju && tegoRodzaju.plan.trescId === trescId) return { akcja: 'wznow', aktywnosc: tegoRodzaju };
  const m = mozeStartowac(rodzaj, pierwszePodejscieTestu, limit);
  if (!m.start) return { akcja: 'ekran_zakupu' };
  return tegoRodzaju ? { akcja: 'porzuc_i_start', porzuc: tegoRodzaju, zLimitu: m.zLimitu } : { akcja: 'start', zLimitu: m.zLimitu };
}

// --- zakup (w pamięci, bez tabeli; stan trwały to transakcje sklepu) ---
export const STANY_ZAKUPU = ['bezczynny', 'w_toku', 'oczekuje', 'zakonczony', 'blad', 'brak_zakupow'] as const;
export type StanZakupu =
  | { stan: 'bezczynny' | 'oczekuje' | 'zakonczony' | 'blad' | 'brak_zakupow' }
  | { stan: 'w_toku'; operacja: 'kup' | 'przywroc' };
export type ZdarzenieZakupu =
  | { typ: 'kup'; produkt: string }
  | { typ: 'przywroc' } // tylko z przycisku (ADR 0006)
  // Adapter mapuje zdarzenia sklepu według stanu maszyny, nie według źródła (w StoreKit 2 / expo-iap zwykły zakup też
  // kończy się zdarzeniem z nasłuchu): w `w_toku` → transakcja_zakonczona, w `oczekuje` → transakcja_z_nasluchu.
  | { typ: 'transakcja_zakonczona' }
  | { typ: 'anulowano' }
  | { typ: 'oczekuje' } // np. zgoda rodzica
  | { typ: 'transakcja_z_nasluchu' }
  | { typ: 'blad_sklepu' }
  | { typ: 'brak_zakupow' }
  | { typ: 'komunikat_zamkniety' };
// Tabela `zakup` z moduly.md; `w_toku` rozróżnia operację (uzupełnienie 07). Uzupełnienie roli 08 (D-214): wyjście z `brak_zakupow`
// i przywracanie z `oczekuje`. Każda para spoza tabeli → przejscie_niedozwolone (potwierdzone przez 05: moduly.md „Uzupełnienie”, D-210, D-214). Drugi `kup` w toku albo w oczekiwaniu → błąd (R-48).
export function przejscieZakupu(s: StanZakupu, z: ZdarzenieZakupu): Wynik<StanZakupu, 'przejscie_niedozwolone'> {
  const na = (stan: StanZakupu): Wynik<StanZakupu, 'przejscie_niedozwolone'> => ({ ok: true, wartosc: stan });
  switch (s.stan) {
    case 'bezczynny':
      if (z.typ === 'kup') return na({ stan: 'w_toku', operacja: 'kup' });
      if (z.typ === 'przywroc') return na({ stan: 'w_toku', operacja: 'przywroc' });
      break;
    case 'w_toku':
      if (z.typ === 'transakcja_zakonczona') return na({ stan: 'zakonczony' });
      if (z.typ === 'anulowano') return na({ stan: 'bezczynny' });
      if (z.typ === 'blad_sklepu') return na({ stan: 'blad' });
      if (s.operacja === 'kup' && z.typ === 'oczekuje') return na({ stan: 'oczekuje' });
      if (s.operacja === 'przywroc' && z.typ === 'brak_zakupow') return na({ stan: 'brak_zakupow' });
      break;
    case 'oczekuje':
      if (z.typ === 'transakcja_z_nasluchu') return na({ stan: 'zakonczony' });
      // odmowa rodzica zwykle nie daje zdarzenia: „Przywróć” musi zostać dostępne (BR-ZAK-003; przegląd D-043, D-214)
      if (z.typ === 'przywroc') return na({ stan: 'w_toku', operacja: 'przywroc' });
      break;
    case 'blad':
    case 'brak_zakupow': // komunikat „brak zakupów” zamknięty → jak po błędzie (D-214)
      if (z.typ === 'komunikat_zamkniety') return na({ stan: 'bezczynny' });
      break;
  }
  return { ok: false, powod: 'przejscie_niedozwolone' };
}

// --- import (PR-07) ---
export const STANY_IMPORTU = ['wybor_pliku', 'walidacja', 'bledny_plik', 'nowsza_wersja', 'potwierdzenie', 'zapis', 'gotowe', 'blad_zapisu'] as const;
export type StanImportu = (typeof STANY_IMPORTU)[number];
export type ZdarzenieImportu =
  | { typ: 'plik_wybrany' }
  | { typ: 'zwalidowano'; wynik: 'ok' | 'bledny_plik' | 'nowsza_wersja'; istniejacyPostep: boolean }
  | { typ: 'potwierdz' }
  | { typ: 'anuluj' } // rezygnacja (R-13); w każdym stanie → przejscie_niedozwolone (moduly.md „import”, D-210)
  | { typ: 'zapisano' }
  | { typ: 'blad_zapisu' };
// Tabela `import` z moduly.md. Zapis bez potwierdzenia tylko, gdy postępu nie ma (BR-DANE-002). `anuluj` nie ma wiersza
// w tabeli → przejscie_niedozwolone (przepływ zamyka się bez zmiany stanu maszyny; moduly.md, D-210).
export function przejscieImportu(s: StanImportu, z: ZdarzenieImportu): Wynik<StanImportu, 'przejscie_niedozwolone'> {
  const na = (stan: StanImportu): Wynik<StanImportu, 'przejscie_niedozwolone'> => ({ ok: true, wartosc: stan });
  if (s === 'wybor_pliku' && z.typ === 'plik_wybrany') return na('walidacja');
  if (s === 'walidacja' && z.typ === 'zwalidowano') {
    if (z.wynik !== 'ok') return na(z.wynik);
    return na(z.istniejacyPostep ? 'potwierdzenie' : 'zapis');
  }
  if (s === 'potwierdzenie' && z.typ === 'potwierdz') return na('zapis');
  if (s === 'zapis' && z.typ === 'zapisano') return na('gotowe');
  if (s === 'zapis' && z.typ === 'blad_zapisu') return na('blad_zapisu');
  return { ok: false, powod: 'przejscie_niedozwolone' };
}
