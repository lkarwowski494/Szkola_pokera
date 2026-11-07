// Ścieżka kursu, test modułu, ponowna ocena poziomu i prośba o ocenę w sklepie (BR-KURS-001, BR-KURS-002, BR-ONB-003,
// BR-OPIN-001). Zaślepki roli 07 (E3 część 13, D-197): moduly.md nie podaje sygnatur tych funkcji (luka dla 05,
// strategia.md §9 część 13); kształt niżej to propozycja roli 07 — czyste funkcje, bez zegara (czas w argumencie),
// bez zapisu (zapis robi port bazy). Parametry z KONFIGURACJA (TEST_MODULU_*, PROSBA_O_OCENE_*).
import { niezaimplementowane } from './niezaimplementowane';

/** Moduł w kolejności kursu (content/pl/modules.yaml, M0–M13) z lekcjami w kolejności. */
export interface ModulKursu {
  id: string;
  lekcje: readonly string[];
}

/** Stan kursu użytkownika (tabele postępu lekcji, testów i ustawienie `punkt_startu` w schemat.sql). */
export interface PostepKursu {
  ukonczoneLekcje: readonly string[];
  zaliczoneTestem: readonly string[]; // moduły zaliczone testem modułu
  zaliczoneOcena: readonly string[]; // moduły zaliczone oceną poziomu (przed punktem startu)
  punktStartu: string; // moduł, od którego zaczyna ścieżka (wynik oceny poziomu; „Pomiń” → pierwszy moduł)
}

/** Następna lekcja na ścieżce: pierwsza nieukończona lekcja pierwszego modułu, który nie jest zaliczony testem ani oceną,
 *  licząc od punktu startu; null, gdy kurs przerobiony (BR-KURS-001 „Następna lekcja”, BR-KURS-002 „Zaliczony test”). */
export function nastepnaLekcja(_moduly: readonly ModulKursu[], _postep: PostepKursu): string | null {
  return niezaimplementowane('nastepnaLekcja (BR-KURS-001, BR-KURS-002)');
}

/** Plan aktywności lekcji: części lekcji, po nich ćwiczenia sprawdzające z tej lekcji (BR-KURS-001 „Ukończenie lekcji”). */
export interface KrokLekcji {
  rodzaj: 'czesc' | 'cwiczenie';
  id: string;
}
export function planLekcji(_lekcja: { id: string; czesci: readonly string[]; cwiczenia: readonly string[] }): readonly KrokLekcji[] {
  return niezaimplementowane('planLekcji (BR-KURS-001)');
}

/** Lekcja ukończona dopiero po ostatnim kroku planu (ostatnie ćwiczenie); wcześniej postęp bez zmian. */
export function poKrokuLekcji(_postep: PostepKursu, _lekcjaId: string, _plan: readonly KrokLekcji[], _wykonanyKrok: number): PostepKursu {
  return niezaimplementowane('poKrokuLekcji (BR-KURS-001)');
}

export interface OdpowiedzTestu {
  zadanieId: string;
  lekcjaId: string; // lekcja, której dotyczy zadanie (BR-KURS-002 „które lekcje odpowiadają pytaniom z błędem”)
  poprawna: boolean;
}
export interface WynikTestuModulu {
  zaliczony: boolean; // odsetek poprawnych ≥ TEST_MODULU_PROG przy TEST_MODULU_LICZBA_ZADAN zadaniach (D-106)
  lekcjeDoPowtorki: readonly string[]; // lekcje z błędnych zadań, bez powtórzeń, w kolejności pierwszego błędu
  bledneZadania: readonly string[];
}
/** Wynik testu modułu; liczba odpowiedzi ≠ TEST_MODULU_LICZBA_ZADAN → wyjątek (test niekompletny nie ma wyniku). */
export function wynikTestuModulu(_odpowiedzi: readonly OdpowiedzTestu[]): WynikTestuModulu {
  return niezaimplementowane('wynikTestuModulu (BR-KURS-002, D-106)');
}

/** Skutek testu w postępie: zaliczony → moduł w `zaliczoneTestem`; niezaliczony → moduł nie trafia do `zaliczoneTestem`;
 *  ukończone lekcje bez zmian. Czy niezaliczony test zdejmuje zaliczenie oceną (BR-ONB-003 mówi tylko o lekcjach do
 *  powtórki) — luka dla 01/05, bez asercji do rozstrzygnięcia. */
export function poTescieModulu(_postep: PostepKursu, _modulId: string, _wynik: WynikTestuModulu): PostepKursu {
  return niezaimplementowane('poTescieModulu (BR-KURS-002, BR-ONB-003)');
}

/** Ponowna ocena poziomu z ustawień: nowy punkt startu i moduły przed nim zaliczone oceną; ukończone lekcje i moduły
 *  zaliczone testem zostają (BR-ONB-003 „Ponowna ocena z ustawień”; powtórki są w innej tabeli i tej funkcji nie dotyczą). */
export function poPonownejOcenie(_postep: PostepKursu, _moduly: readonly ModulKursu[], _nowyPunktStartu: string): PostepKursu {
  return niezaimplementowane('poPonownejOcenie (BR-ONB-003)');
}

/** Miejsce w aplikacji w chwili, gdy prośba mogłaby się pojawić (BR-OPIN-001). */
export type MiejsceProsby = 'podsumowanie_lekcji' | 'podsumowanie_sesji' | 'zadanie' | 'ocena_poziomu' | 'zakup' | 'pierwsze_uruchomienie';
/** Czy wywołać systemową prośbę o ocenę: tylko na podsumowaniu lekcji albo sesji, od PROSBA_O_OCENE_OD_PRACY skończonych
 *  prac od instalacji, nie wcześniej niż PROSBA_O_OCENE_ODSTEP_DNI od poprzedniej prośby (BR-OPIN-001, D-110). */
export function czyProsicOOcene(_wej: {
  miejsce: MiejsceProsby;
  skonczonePrace: number; // lekcje i sesje ćwiczeń zakończone od instalacji
  ostatniaProsbaMs: number | null;
  teraz: number;
}): boolean {
  return niezaimplementowane('czyProsicOOcene (BR-OPIN-001, D-110)');
}
