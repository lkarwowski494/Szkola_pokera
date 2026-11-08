import Constants from 'expo-constants';
import { KONFIGURACJA } from '@szkola/domena';
import { zapiszWpisDziennika, type PortBazy } from '@szkola/postep';

/**
 * Dziennik lokalny błędów (ADR 0009 pkt 2; tlo-i-bledy.md §4): pierścień ostatnich `DZIENNIK_MAKS_WPISOW` wpisów w pamięci,
 * bez wysyłki. Wpis: czas, kod, ekran, wersja — bez treści błędu, odpowiedzi i identyfikatorów osób. Od otwarcia `postep.db`
 * wpisy trafiają też do tabeli `dziennik` (repozytorium `dziennik`, `podlaczDziennik` niżej).
 */
export type KodDziennika =
  | 'wyjatek_ekranu' // granica błędu ekranu (tlo-i-bledy.md §4)
  | 'tresc_niedostepna' // brak albo błąd pliku treści (ADR 0005)
  | 'migracja_nieudana' // start postep.db (tlo-i-bledy.md §4)
  | 'link_niedostepny' // system nie otworzył adresu tel:/https (ekran Pomoc); kod spoza tabeli §4 — zgłoszenie 08-F04
  | 'odczyt_nieudany' // uszkodzona wartość zapisana przez aplikację; kod spoza tabeli §4 — zgłoszenie 08-F04
  | 'sklep_niedostepny' // expo-iap: błąd odczytu transakcji albo produktów (tlo-i-bledy.md §4)
  | 'zakup_blad' // expo-iap: błąd zakupu (nie anulowanie, nie oczekiwanie)
  | 'baza_nowsza' // start postep.db (tlo-i-bledy.md §4)
  | 'przerwano_w_tle' // jw., migracja przerwana w tle (ADR 0013)
  | 'baza_uszkodzona' // jw., plik odłożony pod postep-uszkodzona-<ms>.db
  | 'zapis_nieudany' // jw., inny błąd otwarcia (np. SQLITE_IOERR); też nieudany zapis odpowiedzi (część 5)
  | 'brak_miejsca' // SQLITE_FULL przy zapisie (tlo-i-bledy.md §4)
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
  const wpis: WpisDziennika = { ms: teraz, kod, ekran, wersja: typeof v === 'string' ? v : null };
  wpisy.push(wpis);
  if (wpisy.length > KONFIGURACJA.DZIENNIK_MAKS_WPISOW) wpisy.splice(0, wpisy.length - KONFIGURACJA.DZIENNIK_MAKS_WPISOW);
  czekajace.push(wpis);
  if (czekajace.length > KONFIGURACJA.DZIENNIK_MAKS_WPISOW) czekajace.splice(0, czekajace.length - KONFIGURACJA.DZIENNIK_MAKS_WPISOW);
  wyslij();
}

export function wpisyDziennika(): readonly WpisDziennika[] {
  return [...wpisy];
}

// --- zapis do tabeli `dziennik` w postep.db (08 cz. 5b krok 6; ADR 0009 pkt 2, D-240) ---
// Do otwarcia bazy wpisy czekają w kolejce (oprócz pierścienia w pamięci); po `podlaczDziennik` zapisują się w kolejności,
// a kolejne od razu (przez kolejkę portu). Błąd zapisu do bazy nie trafia do dziennika (bez pętli) i niczego nie przerywa;
// wpis zostaje w pamięci. Wpis bez wersji (brak `expoConfig.version`) zostaje tylko w pamięci: kolumna `wersja` NOT NULL,
// a zgadnięta wersja byłaby nieprawdziwa (brak zostaje brakiem).
let port: PortBazy | null = null;
const czekajace: WpisDziennika[] = [];
let ogon: Promise<void> = Promise.resolve();

function wyslij(): void {
  const p = port;
  if (!p) return;
  const doZapisu = czekajace.splice(0);
  ogon = ogon.then(async () => {
    for (const w of doZapisu) {
      if (w.wersja === null) continue;
      await zapiszWpisDziennika(p, { ms: w.ms, kod: w.kod, ekran: w.ekran, wersja: w.wersja }, KONFIGURACJA.DZIENNIK_MAKS_WPISOW);
    }
  }).catch(() => undefined); // zapisz… zwraca Wynik; tu tylko zabezpieczenie przed wyjątkiem portu
}

/** Po otwarciu postep.db (`_layout`): zapis wpisów sprzed otwarcia i kolejnych. Zwraca odłączenie (przy zamknięciu portu). */
export function podlaczDziennik(p: PortBazy): () => void {
  port = p;
  wyslij();
  return () => {
    if (port === p) port = null;
  };
}

/** Koniec zapisów dziennika do bazy zleconych do tej chwili (testy, kolejność przy zamykaniu). */
export function dziennikZapisany(): Promise<void> {
  return ogon;
}
