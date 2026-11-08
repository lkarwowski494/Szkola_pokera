import Constants from 'expo-constants';
import { KONFIGURACJA } from '@szkola/domena';

/**
 * Dziennik lokalny błędów (ADR 0009 pkt 2; tlo-i-bledy.md §4): pierścień ostatnich `DZIENNIK_MAKS_WPISOW` wpisów w pamięci,
 * bez wysyłki. Wpis: czas, kod, ekran, wersja — bez treści błędu, odpowiedzi i identyfikatorów osób. Zapis do tabeli
 * `dziennik` w `postep.db` i dołączanie do „Zgłoś błąd” (F-17) przychodzą z repozytorium `dziennik` (część 5).
 */
export type KodDziennika =
  | 'wyjatek_ekranu' // granica błędu ekranu (tlo-i-bledy.md §4)
  | 'tresc_niedostepna' // brak albo błąd pliku treści (ADR 0005)
  | 'migracja_nieudana' // start bazy (tu: stara user.db do części 5)
  | 'link_niedostepny' // system nie otworzył adresu tel:/https (ekran Pomoc); kod spoza tabeli §4 — zgłoszenie 08-F04
  | 'odczyt_nieudany' // uszkodzona wartość zapisana przez aplikację; kod spoza tabeli §4 — zgłoszenie 08-F04
  | 'sklep_niedostepny' // expo-iap: błąd odczytu transakcji albo produktów (tlo-i-bledy.md §4)
  | 'zakup_blad' // expo-iap: błąd zakupu (nie anulowanie, nie oczekiwanie)
  | 'baza_nowsza' // start postep.db (tlo-i-bledy.md §4)
  | 'przerwano_w_tle' // jw., migracja przerwana w tle (ADR 0013)
  | 'baza_uszkodzona' // jw., plik odłożony pod postep-uszkodzona-<ms>.db
  | 'zapis_nieudany' // jw., inny błąd otwarcia (np. SQLITE_IOERR)
  | 'kontrola_k04'; // build deweloperski: journal_mode ≠ delete albo foreign_keys ≠ 1 na porcie (K-04, ADR 0003)

export interface WpisDziennika {
  readonly ms: number;
  readonly kod: KodDziennika;
  readonly ekran: string | null;
  readonly wersja: string | null; // brak wersji w konfiguracji zostaje brakiem
}

const wpisy: WpisDziennika[] = [];

/** Nigdy nie rzuca: dziennik nie może zepsuć ścieżki, która właśnie obsługuje błąd. */
export function zapiszBlad(kod: KodDziennika, ekran: string | null = null, teraz: number = Date.now()): void {
  const v = Constants.expoConfig?.version;
  wpisy.push({ ms: teraz, kod, ekran, wersja: typeof v === 'string' ? v : null });
  if (wpisy.length > KONFIGURACJA.DZIENNIK_MAKS_WPISOW) wpisy.splice(0, wpisy.length - KONFIGURACJA.DZIENNIK_MAKS_WPISOW);
}

export function wpisyDziennika(): readonly WpisDziennika[] {
  return [...wpisy];
}
