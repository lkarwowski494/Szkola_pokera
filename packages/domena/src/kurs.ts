// Ścieżka kursu, test modułu, ponowna ocena poziomu i prośba o ocenę w sklepie (BR-KURS-001, BR-KURS-002, BR-ONB-003,
// BR-OPIN-001). Zaślepki roli 07 (E3 część 13, D-197); sygnatury przyjęte przez 05 (fix 05 2026-11-07, L7-13a, moduly.md
// „Kurs”) z uzupełnieniem `FaktyKursu` / `stanKursu` (07 fix, D-224) — czyste funkcje, bez zegara (czas w argumencie),
// bez zapisu (zapis robi port bazy). Parametry z KONFIGURACJA (TEST_MODULU_*, PROSBA_O_OCENE_*).

import { KONFIGURACJA } from './konfiguracja';

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
export function stanKursu(moduly: readonly ModulKursu[], f: FaktyKursu): PostepKursu {
  const ip = f.punktStartu ? moduly.findIndex((m) => m.id === f.punktStartu!.modulId) : 0;
  const ustawiono = f.punktStartu?.ustawionoMs ?? 0;
  const zdjete = (id: string) => f.testy.some((t) => t.modulId === id && !t.zaliczony && t.koniecMs > ustawiono);
  return {
    ukonczoneLekcje: f.ukonczoneLekcje,
    zaliczoneTestem: moduly.map((m) => m.id).filter((id) => f.testy.some((t) => t.modulId === id && t.zaliczony)),
    zaliczoneOcena: moduly.slice(0, Math.max(0, ip)).map((m) => m.id).filter((id) => !zdjete(id)),
    punktStartu: f.punktStartu?.modulId ?? moduly[0]!.id,
  };
}

/** Następna lekcja na ścieżce: pierwsza nieukończona lekcja pierwszego modułu w kolejności kursu, który nie jest zaliczony
 *  testem ani oceną (punkt startu działa przez `zaliczoneOcena` ze `stanKursu`, D-224 pkt 4 — moduł zdjęty z zaliczenia
 *  oceną wraca na ścieżkę, D-216); null, gdy kurs przerobiony (BR-KURS-001 „Następna lekcja”, BR-KURS-002 „Zaliczony test”). */
export function nastepnaLekcja(moduly: readonly ModulKursu[], postep: PostepKursu): string | null {
  for (const m of moduly) {
    if (postep.zaliczoneTestem.includes(m.id) || postep.zaliczoneOcena.includes(m.id)) continue;
    const l = m.lekcje.find((x) => !postep.ukonczoneLekcje.includes(x));
    if (l !== undefined) return l;
  }
  return null;
}

/** Plan aktywności lekcji: części lekcji, po nich ćwiczenia sprawdzające z tej lekcji (BR-KURS-001 „Ukończenie lekcji”). */
export interface KrokLekcji {
  rodzaj: 'czesc' | 'cwiczenie';
  id: string;
}
export function planLekcji(lekcja: { id: string; czesci: readonly string[]; cwiczenia: readonly string[] }): readonly KrokLekcji[] {
  return [...lekcja.czesci.map((id) => ({ rodzaj: 'czesc' as const, id })), ...lekcja.cwiczenia.map((id) => ({ rodzaj: 'cwiczenie' as const, id }))];
}

/** Lekcja ukończona dopiero po ostatnim kroku planu (ostatnie ćwiczenie); wcześniej postęp bez zmian. */
export function poKrokuLekcji(postep: PostepKursu, lekcjaId: string, plan: readonly KrokLekcji[], wykonanyKrok: number): PostepKursu {
  if (wykonanyKrok !== plan.length - 1 || postep.ukonczoneLekcje.includes(lekcjaId)) return postep;
  return { ...postep, ukonczoneLekcje: [...postep.ukonczoneLekcje, lekcjaId] };
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
export function wynikTestuModulu(odpowiedzi: readonly OdpowiedzTestu[]): WynikTestuModulu {
  if (odpowiedzi.length !== KONFIGURACJA.TEST_MODULU_LICZBA_ZADAN) {
    throw new Error(`Test modułu niekompletny: ${odpowiedzi.length} z ${KONFIGURACJA.TEST_MODULU_LICZBA_ZADAN} odpowiedzi`); // stan niemożliwy
  }
  const bledne = odpowiedzi.filter((o) => !o.poprawna);
  return {
    zaliczony: (odpowiedzi.length - bledne.length) / odpowiedzi.length >= KONFIGURACJA.TEST_MODULU_PROG,
    lekcjeDoPowtorki: [...new Set(bledne.map((o) => o.lekcjaId))],
    bledneZadania: bledne.map((o) => o.zadanieId),
  };
}

/** Skutek testu w postępie (rzut zgodny ze `stanKursu`): zaliczony → moduł w `zaliczoneTestem`; niezaliczony → moduł nie
 *  trafia do `zaliczoneTestem` i schodzi z `zaliczoneOcena` (D-216); ukończone lekcje bez zmian. */
export function poTescieModulu(postep: PostepKursu, modulId: string, wynik: WynikTestuModulu): PostepKursu {
  if (wynik.zaliczony) {
    return postep.zaliczoneTestem.includes(modulId) ? postep : { ...postep, zaliczoneTestem: [...postep.zaliczoneTestem, modulId] };
  }
  return { ...postep, zaliczoneOcena: postep.zaliczoneOcena.filter((m) => m !== modulId) }; // D-216
}

/** Ponowna ocena poziomu z ustawień: nowy punkt startu i moduły przed nim zaliczone oceną; ukończone lekcje i moduły
 *  zaliczone testem zostają (BR-ONB-003 „Ponowna ocena z ustawień”; powtórki są w innej tabeli i tej funkcji nie dotyczą). */
export function poPonownejOcenie(postep: PostepKursu, moduly: readonly ModulKursu[], nowyPunktStartu: string): PostepKursu {
  const ip = moduly.findIndex((m) => m.id === nowyPunktStartu);
  return { ...postep, punktStartu: nowyPunktStartu, zaliczoneOcena: moduly.slice(0, Math.max(0, ip)).map((m) => m.id) };
}

/** Miejsce w aplikacji w chwili, gdy prośba mogłaby się pojawić (BR-OPIN-001). */
export type MiejsceProsby = 'podsumowanie_lekcji' | 'podsumowanie_sesji' | 'zadanie' | 'ocena_poziomu' | 'zakup' | 'pierwsze_uruchomienie';
/** Czy wywołać systemową prośbę o ocenę: tylko na podsumowaniu lekcji albo sesji, od PROSBA_O_OCENE_OD_PRACY skończonych
 *  prac od instalacji, nie wcześniej niż PROSBA_O_OCENE_ODSTEP_DNI od poprzedniej prośby (BR-OPIN-001, D-110). */
export function czyProsicOOcene(wej: {
  miejsce: MiejsceProsby;
  skonczonePrace: number; // lekcje i sesje ćwiczeń zakończone od instalacji
  ostatniaProsbaMs: number | null;
  teraz: number;
}): boolean {
  if (wej.miejsce !== 'podsumowanie_lekcji' && wej.miejsce !== 'podsumowanie_sesji') return false;
  if (wej.skonczonePrace < KONFIGURACJA.PROSBA_O_OCENE_OD_PRACY) return false;
  return wej.ostatniaProsbaMs === null || wej.teraz - wej.ostatniaProsbaMs >= KONFIGURACJA.PROSBA_O_OCENE_ODSTEP_DNI * 86_400_000;
}
