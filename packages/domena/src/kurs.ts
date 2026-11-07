// Ścieżka kursu, test modułu, ponowna ocena poziomu i prośba o ocenę w sklepie (BR-KURS-001, BR-KURS-002, BR-ONB-003,
// BR-OPIN-001). Zaślepki roli 07 (E3 część 13, D-197); sygnatury przyjęte przez 05 (fix 05 2026-11-07, L7-13a, moduly.md
// „Kurs”) z uzupełnieniem `FaktyKursu` / `stanKursu` (07 fix, D-224) — czyste funkcje, bez zegara (czas w argumencie),
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

/** Stan zapisany → widok (moduly.md „Kurs”): zaliczenia są pochodną faktów, bez nowych kolumn. */
export interface FaktyKursu {
  ukonczoneLekcje: readonly string[]; // postep_lekcji.ukonczono_ms IS NOT NULL
  punktStartu: { modulId: string; ustawionoMs: number } | null; // ustawienie `punkt_startu`; null = „Pomiń” → pierwszy moduł
  testy: readonly { modulId: string; zaliczony: boolean; koniecMs: number }[]; // wynik_testu + aktywnosc.koniec_ms
}
/** zaliczoneTestem = moduły z co najmniej jednym zaliczonym testem; zaliczoneOcena = moduły przed punktem startu bez
 *  niezaliczonego testu z koniecMs > punktStartu.ustawionoMs (D-216, BR-ONB-003 A); ponowna ocena przywraca zaliczenie. */
export function stanKursu(_moduly: readonly ModulKursu[], _f: FaktyKursu): PostepKursu {
  return niezaimplementowane('stanKursu (BR-ONB-003, D-216)');
}

/** Następna lekcja na ścieżce: pierwsza nieukończona lekcja pierwszego modułu w kolejności kursu, który nie jest zaliczony
 *  testem ani oceną (punkt startu działa przez `zaliczoneOcena` ze `stanKursu`, D-224 pkt 4 — moduł zdjęty z zaliczenia
 *  oceną wraca na ścieżkę, D-216); null, gdy kurs przerobiony (BR-KURS-001 „Następna lekcja”, BR-KURS-002 „Zaliczony test”). */
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

/** Skutek testu w postępie (rzut zgodny ze `stanKursu`): zaliczony → moduł w `zaliczoneTestem`; niezaliczony → moduł nie
 *  trafia do `zaliczoneTestem` i schodzi z `zaliczoneOcena` (D-216); ukończone lekcje bez zmian. */
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
