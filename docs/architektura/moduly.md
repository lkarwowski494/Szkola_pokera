# Moduły, porty, maszyny stanów, konfiguracja (rola 05 E2, 2026-11-04)
Decyzje: ADR 0003 (port bazy), 0006 (logika dostępu), 0007 (limit), 0010 (maszyny stanów), 0011 (kod bez BR usunięty). Sygnatury niżej są kontraktem dla ról 07 i 08, nie kodem.

## Drzewo i kierunek zależności
Monorepo pnpm zostaje (ADR-06 rejestru 03). Nowe pakiety są czystym TypeScript, jak `poker-core` i `srs` (`CLAUDE.md`: pakiety nie importują React Native).
```
packages/
  poker-core/      domena pokera (istnieje): karty, szanse, ocena zagrania, ICM, SPR
  srs/             domena powtórek (istnieje): FSRS (ts-fsrs), harmonogram
  content-schema/  typy treści (istnieje)
  jezyki/          NOWY (ADR 0014, rola 09): lista 35 języków, wybór języka i łańcuch zastępczy, samosprawdzenie Intl.PluralRules, formaty wg języka, opcje i18next; bez React Native, używany też przez content-build
  domena/          NOWY: limit dnia, logika dostępu, maszyny stanów, format eksportu (walidacja i migracja formatu), zegar (port), konfiguracja.ts
  postep/          NOWY: port bazy (interfejs), kolejka zapisów, migracje (v1 = schemat.sql), repozytoria SQL, eksport/import przez port; testy na node:sqlite
tools/content-build/  YAML → tresc-<wersja>-<język>.db (ADR 0005)
apps/mobile/src/
  data/            adapter expo-sqlite → PortBazy (postęp), odczyt bazy treści, wybór pliku treści
  platform/        NOWY: zakupy (expo-iap), powiadomienia, pliki (sharing, document-picker, file-system), język i strefa (localization), linki i poczta, dziennik, ochrona długich operacji (adapter `OchronaTla`, ADR 0013)
apps/mobile/modules/ochrona-tla/  NOWY: lokalny moduł Expo (Swift) z beginBackgroundTask/endBackgroundTask (ADR 0013)
  features/, app/, components/, theme/, i18n/   interfejs (role 04, 08); stan widoku w zustand jako kopia (ADR-09)
```
Kierunek (strzałka = „importuje”): `app/features/components` → `platform`, `data`, `domena`, `postep` · `data` → `postep` → `domena` → `srs`, `poker-core`, `content-schema` · `platform` → `domena` (typy). Zakazy: `domena` i `postep` bez `react`, `react-native`, `expo-*` i bez importów z `apps/`; `domena` bez `postep`; brak cykli.

Usunięte (ADR 0009, 0011): `src/observability/`, `features/play/`, `(tabs)/rules.tsx`, tryb `speed`; `src/data/user/` (drizzle) zastąpiony przez `packages/postep` + adapter. `diagnostics.tsx` tylko pod `__DEV__`.

## Port bazy (pakiet `postep`)
```ts
export type Wartosc = string | number | null;
export interface Wynik { zmiany: number; ostatnieId: number }
export interface Tx {                     // to samo połączenie, bez ponownego kolejkowania
  run(sql: string, p?: Wartosc[]): Promise<Wynik>;
  all<T>(sql: string, p?: Wartosc[]): Promise<T[]>;
}
export interface PortBazy extends Tx {    // run: przez kolejkę; all: poza kolejką
  transakcja<T>(fn: (tx: Tx) => Promise<T>): Promise<T>;   // przez kolejkę; fn czeka tylko na tx.*
  zamknij(): Promise<void>;
}
export interface Polaczenie { exec(sql: string): Promise<void>; all<T>(sql: string): Promise<T[]> } // dla runnera migracji
export function otworzPostep(adapter: Polaczenie & SurowyPort): Promise<PortBazy>; // foreign_keys=ON → migruj → port
export class BladStartuPostepu extends Error { powod: 'baza_nowsza' | 'migracja_nieudana' } // rzucany przez otworzPostep / uruchomPostep
```
Błąd startu (L8-01, fix 05 2026-11-07, D-200): `otworzPostep` i `uruchomPostep` zwracają port, więc `baza_nowsza` i `migracja_nieudana` wychodzą jako wyjątek typowany `BladStartuPostepu { powod }` — nazwany wyjątek od zasady „błędy jako wartości” (`tlo-i-bledy.md` §4). Łapie go tylko warstwa startu aplikacji (`apps/mobile/src/data`) i zamienia na ekran z tabeli §4; nic nie jest zapisywane. Wzór: Trening `lib/state/boot.ts:96–101` (wyjątek migracji przerywa start bez zapisu, odczyt 2026-11-07).
Adaptery: `apps/mobile/src/data/postepExpo.ts` (`openDatabaseAsync('postep.db')`, `runAsync`, `getAllAsync`, `withTransactionAsync` wewnątrz kolejki) i testowy na `node:sqlite` (`enableForeignKeyConstraints: false`, potem pragma — jak w aplikacji). Wzór kolejki: `eksperymenty/e1-sqlite.mjs`, `portZKolejka`.

Ochrona tła (L8-03, ADR 0013 pkt 2, D-205): `otworzPostep(adapter, ochrona?: OchronaTla)`; długie operacje przez `dlugaOperacja(port, nazwa, praca)`, `PortBazy` bez zmian.

Kopia przed importem (L8-02, ADR 0008 pkt 2): `kopiaBazy(port, sciezka)` woła warstwa `apps/mobile/src/data` przed `importuj`; przed migracją z przebudową — `migruj` (ADR 0003 pkt 5, od pierwszej takiej migracji).

Repozytoria (pakiet `postep`, każde przyjmuje `PortBazy`): `ustawienia`, `postepLekcji`, `aktywnosci` (start, krok + odpowiedź w jednej transakcji, zakończenie, w toku, zużycie dnia), `powtorki` (karty do terminu, zapis karty UPSERT + log), `testy`, `uprawnienia` (pamięć), `dziennik`, `daneUzytkownika` (eksport, import, usuń postęp — algorytmy z `e2-schemat.mjs`).

## Porty domeny (pakiet `domena`)
```ts
export interface Zegar { teraz(): number; strefa(): string; dzienLokalny(ms: number, strefa: string): string } // RRRR-MM-DD
export type Wynik<T, P extends string> = { ok: true; wartosc: T } | { ok: false; powod: P };            // błędy jako wartości

// Limit (ADR 0007)
export function limitDnia(wej: { zuzyteDzis: number; pro: boolean; dzien: string; strefa: string }, k: Konfiguracja):
  { bezLimitu: true } | { bezLimitu: false; pozostalo: number; odnowienieMs: number };
export function mozeStartowac(rodzaj: RodzajAktywnosci, pierwszePodejscieTestu: boolean, limit: ReturnType<typeof limitDnia>):
  { start: true; zLimitu: boolean } | { start: false; powod: 'limit_wyczerpany' };

// Dostęp (ADR 0006; wektory w docs/monetyzacja.md)
export type OdczytSklepu = { ok: true; transakcje: { produkt: string; wygasaMs: number | null; odebrana: boolean }[] } | { ok: false };
export function decyzja(odczyt: OdczytSklepu, pamiec: Pamiec | null, teraz: number, odblokowuja: readonly string[],
  bezKonca: readonly string[]): { dostep: boolean; zrodlo: 'sklep' | 'pamiec' | 'brak'; nowaPamiec: Pamiec | null };
// L8-04 (D-217): wygasaMs = null tylko dla produktów z `bezKonca` (PRODUKTY_BEZ_KONCA); inny produkt bez daty końca → nieaktywny

// Przypomnienie (ADR 0012; port PortPowiadomien z kształtem expo-notifications, adapter w apps/mobile/src/platform/)
export function wlaczPrzypomnienie(port: PortPowiadomien, pora: { godzina: number; minuta: number }, tekst: TekstPrzypomnienia):
  Promise<Wynik<UstawieniaPrzypomnienia, 'brak_zgody' | 'planowanie_nieudane'>>; // L8-05: błąd API → planowanie_nieudane, nie wyjątek
export function odtworzPrzypomnienie(port: PortPowiadomien, ust: UstawieniaPrzypomnienia, tekst: TekstPrzypomnienia):
  Promise<'zaplanowane' | 'wylaczone' | 'brak_zgody'>;                                  // nigdy nie odrzuca, nigdy nie prosi o zgodę

// Eksport (ADR 0008)
export function walidujEksport(tekst: string, obslugiwana: number): Wynik<KopertaV1, 'bledny_plik' | 'nowsza_wersja'>;
export function migrujFormat(k: KopertaDowolna): KopertaV1;
```
### Kurs (L7-13a, fix 05 2026-11-07; propozycja 07 w `packages/domena/src/kurs.ts` przyjęta z uzupełnieniami)
```ts
// Stan zapisany → widok: zaliczenia są pochodną faktów, bez nowych kolumn (schemat v1 bez zmian)
export interface FaktyKursu {
  ukonczoneLekcje: readonly string[];                                   // postep_lekcji.ukonczono_ms IS NOT NULL
  punktStartu: { modulId: string; ustawionoMs: number } | null;         // ustawienie `punkt_startu` (+ zmieniono_ms); null = „Pomiń” → pierwszy moduł
  testy: readonly { modulId: string; zaliczony: boolean; koniecMs: number }[]; // wynik_testu + aktywnosc.koniec_ms
}
export function stanKursu(moduly: readonly ModulKursu[], f: FaktyKursu): PostepKursu;
// zaliczoneTestem = moduły z co najmniej jednym zaliczonym testem;
// zaliczoneOcena = moduły przed punktem startu BEZ niezaliczonego testu z koniecMs > punktStartu.ustawionoMs (D-216, BR-ONB-003 A);
// ponowna ocena (nowe ustawionoMs) przywraca zaliczenie oceną modułów przed nowym punktem.
```
- `nastepnaLekcja`, `planLekcji`, `wynikTestuModulu`, `czyProsicOOcene` — sygnatury z `kurs.ts` bez zmian; `wynikTestuModulu` przy liczbie odpowiedzi ≠ `TEST_MODULU_LICZBA_ZADAN` rzuca (stan niemożliwy: maszyna kończy test po tylu krokach).
- `poTescieModulu`, `poPonownejOcenie`, `poKrokuLekcji` — rzuty na `PostepKursu` (podgląd w interfejsie) zgodne ze `stanKursu`: niezaliczony test zdejmuje moduł z `zaliczoneOcena` (D-216). Źródłem prawdy jest zapis: lekcja ukończona wtedy, gdy aktywność `lekcja` przechodzi do `zakonczona` (repozytorium `aktywnosci` ustawia `postep_lekcji.ukonczono_ms` w tej samej transakcji); `poKrokuLekcji` nie jest drugą ścieżką zapisu.
- Prośba o ocenę: `ustawienie.opinie` = `{ "ostatniaProsbaMs": number | null }` (czas, nie licznik); `skonczonePrace` = liczba aktywności `lekcja` i `sesja` w stanie `zakonczona`. Adapter `expo-store-review`: gdy `requestReview` rzuci, czasu nie zapisuje (wzór Treningu `lib/review-run.ts:41`, odczyt 2026-11-07).

Typy treści i oceny zagrania pochodzą z `poker-core` i `content-schema`; harmonogram z `srs` (`review`, `dueCards`).

## Maszyny stanów (ADR 0010)
Lista stanów każdej maszyny jest eksportowana z `domena` i porównywana z CHECK w `schemat.sql` (wzór: `e2-schemat.mjs`, sekcja 2).

**`aktywnosc`** (sesja, powtórki, scenariusz, test modułu, lekcja, ocena poziomu; stan trwały w `aktywnosc.stan` + `krok`)
| Stan | Zdarzenie | Warunek | Następny stan | Zapis |
|---|---|---|---|---|
| — | `start` | `mozeStartowac` = start | `w_toku` (krok 0) | INSERT `aktywnosc` (`z_limitu`, `dzien_lokalny`, `strefa`, `plan`) |
| — | `start` | limit wyczerpany | — (stan przepływu „ekran zakupu”, BR-LIM-001) | brak |
| `w_toku` | `odpowiedz(krok)` | krok = bieżący | `w_toku` (krok+1) | UPSERT `odpowiedz` + UPDATE `krok` (+ karta/log dla powtórek) w jednej transakcji |
| `w_toku` | `wznow` | zawsze (także po północy, BR-LIM-002) | `w_toku` | brak (odczyt) |
| `w_toku` | `odpowiedz(ostatni)` | — | `zakonczona` | jw. + `koniec_ms` (+ `wynik_testu` dla testu) |
| `w_toku` | `porzuc` | użytkownik zaczyna inną aktywność tego rodzaju albo „Zakończ” | `porzucona` | `koniec_ms` |
| `zakonczona`, `porzucona` | dowolne | — | błąd `przejscie_niedozwolone` | brak |

Funkcje (sygnatury w `packages/domena/src/maszyny.ts`, przyjęte): `startAktywnosci(wej) → Wynik<AktywnoscWToku, 'limit_wyczerpany' | 'plan_niepoprawny'>`, `przejscieAktywnosci(a, z) → Wynik<Aktywnosc, 'przejscie_niedozwolone' | 'akcja_niedostepna' | 'krok_niezgodny'>`, `wejscieDoAktywnosci(rodzaj, trescId, wToku, pierwszePodejscieTestu, limit) → wznow | start | porzuc_i_start | ekran_zakupu`. Aktywność w toku innego rodzaju nie koliduje przy wejściu (D-210).

**`ocenaPoziomu`** = `aktywnosc` rodzaju `ocena_poziomu` (najwyżej `OCENA_POZIOMU_MAKS_PYTAN` — dłuższy plan → `plan_niepoprawny`, D-210; „Pomiń” → `porzucona` i punkt startu M0; zakończenie → `ustawienie.punkt_startu`).

**`scenariusz`** = `aktywnosc` rodzaju `scenariusz`; zdarzenie `odpowiedz` przyjmuje tylko akcje z oceną w treści scenariusza (D-109): akcja spoza listy → błąd `akcja_niedostepna` (nie zapis).

**`zakup`** (w pamięci, bez tabeli; stan trwały to transakcje sklepu)
| Stan | Zdarzenie | Następny |
|---|---|---|
| `bezczynny` | `kup(produkt)` | `w_toku` |
| `w_toku` | transakcja zakończona | `zakonczony` (odczyt uprawnień → pamięć) |
| `w_toku` | anulowanie przez użytkownika | `bezczynny` |
| `w_toku` | `oczekuje` (np. zgoda rodzica) | `oczekuje` |
| `oczekuje` | transakcja z nasłuchu | `zakonczony` |
| `w_toku` | błąd sklepu | `blad` → `bezczynny` po komunikacie |
| `bezczynny` | `przywroc` (tylko z przycisku) | `w_toku` → `zakonczony` albo `brak_zakupow` |
| `brak_zakupow` | komunikat zamknięty | `bezczynny` (D-214) |
| `oczekuje` | `przywroc` | `w_toku` (przywracanie; D-214: odmowa rodzica zwykle nie daje zdarzenia) |

Uzupełnienie (D-210, D-214, fix 05 2026-11-07): `w_toku` niesie operację (`kup` | `przywroc`); `oczekuje` tylko z `w_toku(kup)`, `brak_zakupow` tylko z `w_toku(przywroc)`; anulowanie i błąd sklepu z obu. Każda para spoza tabeli → `przejscie_niedozwolone`, stan bez zmian — w tym drugi `kup` w `w_toku` i `oczekuje` (R-48), zdarzenia po `zakonczony` i transakcja z nasłuchu w `bezczynny` (dostęp i tak liczy `decyzja` z odczytu sklepu). Maszyna żyje w ekranie zakupu: każde wejście na ekran zaczyna od `bezczynny`, więc `zakonczony` nie wymaga wyjścia. Typy stanu i zdarzeń: `packages/domena/src/maszyny.ts` (propozycja 07 przyjęta).

**`import`**: `wybor_pliku` → `walidacja` → (`bledny_plik` | `nowsza_wersja` | `potwierdzenie` przy istniejącym postępie | `zapis`) → `zapis` (kopia, transakcja) → `gotowe` | `blad_zapisu` (dane bez zmian). Rezygnacja (`anuluj`, D-210): w `wybor_pliku`, `walidacja`, `potwierdzenie` → `przejscie_niedozwolone` (maszyna bez stanu rezygnacji; ekran zamyka przepływ, nowe wejście zaczyna od `wybor_pliku`); nigdy do `zapis`.

## Konfiguracja (jeden plik: `packages/domena/src/konfiguracja.ts`)
Liczby, których aplikacja uczy (progi solvera, tolerancje), są merytoryczne: źródło to rejestr roli 06 i `content/numbers.yaml`; tu tylko nazwy i obecne wartości z kodu do przeniesienia.
| Parametr | Wartość | Źródło / decyzja |
|---|---|---|
| `LIMIT_AKTYWNOSCI_DZIENNIE` (szt.) | 1 | D-107 (właściciel) |
| `TEST_MODULU_LICZBA_ZADAN` (szt.) | 15 | D-106 (B-023, `thresholds.ts:45`) |
| `TEST_MODULU_PROG` (ułamek) | 0,85 | D-106 |
| `TEST_MODULU_UDZIAL_MODULU` (ułamek) | 2/3 | `thresholds.ts:46` (decyzja właściciela 3.10.2026) |
| `OCENA_POZIOMU_MAKS_PYTAN` (szt.) | 8 | D-105 |
| `OCENA_POZIOMU_CZAS_S` (s, cel projektowy) | ok. 120 [OCENA] | D-105 |
| `SESJA_LICZBA_ZADAN` (szt.) | `[DO USTALENIA]` (rola 08 odczyta obecną wartość z `features/session`; zmiana to decyzja produktowa) | — |
| `OCENA_PROG_DOPUSZCZALNE` (częstość) | 0,035 | merytoryczne: `thresholds.ts` `MIXED_MIN` (GTO Wizard „Inaccuracy … less than 3.5%”); RD-11; rola 06 |
| `OCENA_PROG_MIESZANA_DOLNY` / `_GORNY` (częstość) | 0,25 / 0,75 | `MIXED_LOW`/`MIXED_HIGH`, „założenie do kalibracji bez źródła” (ADR-22, B-044); rola 06 |
| `MALOWANIE_ZAKRESU_PROG` (ułamek) | 0,9 | `PAINT_PASS` (B-016) |
| `TOLERANCJA_PROCENT_OK` / `_BLISKO` (pp) | 2 / 5 | `NUMERIC_TOLERANCE` (B-017) |
| `FSRS_RETENCJA` (ułamek) | 0,9 | `packages/srs/src/scheduler.ts:5`; pochodzenie `[DO USTALENIA]` (ADR-05 rejestru 03) |
| `FSRS_SZYBKO_MS` / `FSRS_WOLNO_MS` (ms) | 3000 / 8000 | `srs/src/index.ts:45` `DEFAULT_THRESHOLDS`; pochodzenie `[DO USTALENIA]` |
| `PROSBA_O_OCENE_OD_PRACY` (szt.) | 3 | D-110 |
| `PROSBA_O_OCENE_ODSTEP_DNI` (dni) | 14 | D-110 |
| `PRZYPOMNIENIE_DOMYSLNA_PORA` (gg:mm) | `[DO USTALENIA]` (rola 04) | — |
| `DZIENNIK_MAKS_WPISOW` (szt.) | `[DO USTALENIA]` [OCENA: 200] | ADR 0009 |
| `SCHEMAT_WERSJA` (liczba) | 1 | ADR 0004 |
| `EKSPORT_WERSJA_FORMATU` (liczba) | 1 | ADR 0008 |
| `TRESC_FORMAT` (liczba) | 1 | ADR 0005 |
| `ROZMIAR_POBRANIA_PROG_MB` (MB) | 50 [OCENA] | ADR 0005 (powyżej: decyzja właściciela) |
| `PRODUKTY_ODBLOKOWUJACE` | `pl.lkarwowski.szkolapokera.kwartal`, `.rok`, `.dozywotni` | ADR 0006 |
| `PRODUKTY_BEZ_KONCA` | `pl.lkarwowski.szkolapokera.dozywotni` | ADR 0006 pkt 2 (L8-04, D-217) |

Reguła: kod i testy importują wartości z `konfiguracja.ts`; testy nie kopiują liczb.

## Znaleziska dla innych ról (E2)
- **01/04/06, terminologia stopni oceny:** BR-CWI-001 ma cztery stopnie (zgodne, dopuszczalne, niedokładność, błąd; RD-11-W6: 0,0349 → niedokładność), `docs/design/design-spec.md:17` trzy (Błąd, Dopuszczalna, Zgodna), kod (`thresholds.ts`) trzy ze stopniem „błąd” poniżej 3,5% jako „nazwane uproszczenie”. Schemat v1 przyjmuje cztery z BRD (wyższe w kolejności ważności dla wymagań); zmiana listy przed pierwszym wydaniem nie wymaga migracji. Rozstrzyga rola 06 (merytorycznie) z 04 (słowa i znaki).
