# Rola 08 (Programista), build: plan i postęp

## E0: rozpoznanie i plan (2026-11-07, STOP)

### Środowisko i stan wyjściowy
| Sprawdź | Wynik |
|---|---|
| System, Node, git | Linux x86_64 (chmura, bez Xcode), Node 22.23.4, gałąź `claude/sleepy-brahmagupta-2065nu` = origin, szczyt d595053 |
| GitHub | MCP GitHub (repo w zakresie sesji), push na gałąź roboczą; Trening: klon tylko do odczytu `/home/user/lkarwowski494/trening` (2e4b0f8) |
| Przeglądarka | Chromium + Playwright wstępnie zainstalowane (zrzuty ekranów od części 5) |
| iOS | brak; E2E przez `e2e-ios.yml` (macOS, repo publiczne, 0 USD) |
| `pnpm run ci` | kod 0 (typecheck, test, test:skrypty 77, i18n, content:check, tresci:rejestr 0 błędów) |
| `pnpm test:akceptacja` | kod 1 zgodnie z oczekiwaniem: domena 295 (277 czerwonych, 18 zielonych), ekrany 80 (69 czerwonych, 11 zielonych); razem 375, 346 czerwonych, 29 strażników |
| Komendy | testy szybkie i pełne: `pnpm test` (w `ci`); typecheck: `pnpm typecheck`; lint: brak osobnej komendy (kontrole statyczne w testach: `granice.mjs`, K-07, i18n) — zostaje jak jest, bez propozycji nowego narzędzia |

### Założenia wejściowe (hipotezy z artefaktów 05 i 07)
- Sygnatury `packages/postep/src` (07, część uzupełniona: `SurowyPort`, `PlikiPostepu`, `eksportuj`/`importuj`/`kopiaBazy`/`usunPostep`) są wykonalne bez zmiany testów — sprawdzone czytaniem 6 testów; jedna luka niżej (L8-01).
- Kontrakt błędów adaptera: wyjątek niesie liczbowe `errcode` SQLite (założenie 07). node:sqlite 22.23 daje `errcode` — potwierdzi pierwszy czerwony test K-12.

### Plan (część 1: `packages/postep`, cięcie pionowe, każdy krok kończy się zielonym `pnpm run ci`)
| Krok | Zachowanie (kryterium) | Test (plik w `tests/akceptacja/postep/` → `packages/postep/test/`) | Pliki |
|---|---|---|---|
| 0 | infrastruktura testów pakietu (struktura, bez zachowania) | — | `packages/postep/package.json` (vitest 5.0.3, @types/node ^22.10.0 jak w `domena`; lockfile bez nowych pakietów), `tsconfig.test.json` |
| 1 | K-02 migracje: v1 = `schemat.sql`, E4e, E4f; K-04 klucze obce, kolejka E1b | `k02-migracje`, `k04-k15-port` (część K-04, kolejka) | `migracje.ts`, `schemat-v1.ts` (nowy), `port.ts` |
| 2 | K-15 UPSERT kroku i karty; K-12 błędy zapisu → `powod` | `k04-k15-port`, `k12-bledy` (część zapisu) | `aktywnosci.ts`, `powtorki.ts`, `bledy.ts` (nowy, mapowanie `errcode`) |
| 3 | K-12 baza uszkodzona przy starcie; K-14 stare `user.db*` | `k12-bledy` (część startu), `k14-stare-bazy` | `start.ts` |
| 4 | K-11 eksport, import, „Usuń postęp”; walidacja koperty w domenie | `k11-dane`, `domena/eksport` (przeniesiony do `packages/domena/test/`) | `daneUzytkownika.ts`, `packages/domena/src/eksport.ts` |
| 5 | K-10 ochrona tła (4 operacje + migracja z przebudową, przerwanie przy wygaśnięciu) | `k10-ochrona` | `port.ts`, `migracje.ts`, `daneUzytkownika.ts` |
| 6 | E2: próby mutacji (D-172), przegląd D-043 w świeżym kontekście, raport | — | — |

Wywołania do sprawdzenia przed zmianą (zasada 4): `otworzPostep`, `migruj`, `listaMigracji` — dziś tylko testy akceptacyjne i `index.ts` (`grep -rn` w `apps/`, `packages/`: brak użyć poza zaślepkami); adapter `apps/mobile/src/data/postepExpo.ts` jeszcze nie istnieje (część 4 przekazania: usunięcie starego kodu i adapter).

### Luki i decyzje (techniczne, agent, do weta; zapis D-199–D-204)
- **L8-01 (do 05):** `otworzPostep` / `uruchomPostep` zwracają port, a polityka błędów wymaga `baza_nowsza` i `migracja_nieudana`. Wybór: wyjątek typowany `BladStartuPostepu { powod }` (wzór Treningu: `lib/state/boot.ts:96–101`, wyjątek migracji przerywa start bez zapisu, odczyt 2026-11-07). Odrzucone: zmiana sygnatury na `Wynik` (to zmiana testu, rola 07/05).
- **L8-02 (do 05):** `importuj` i `migruj` nie mają ścieżki kopii `VACUUM INTO` (ADR 0008 pkt 2.3, ADR 0003 pkt 5). Wybór: kopię robi wywołujący (warstwa `apps/mobile/src/data`) przez `kopiaBazy` przed `importuj`; v1 nie ma migracji z przebudową, więc kopia przed migracją czeka na pierwszą taką migrację.
- Schemat v1 w kodzie: moduł `schemat-v1.ts` z dosłowną kopią `schemat.sql` (aplikacja nie czyta plików `docs/`); strażnik: K-02 (porównanie `sqlite_schema` z plikiem) i test zgodności tekstu. Odrzucone: generator przy budowaniu (dodatkowy krok), plik jako zasób (asynchroniczne ładowanie przy starcie).
- Uszkodzona baza: kolizja nazwy → sufiks `-1`, `-2`…; dziennik `-journal` bez przenoszenia (poprawka w E1, D-201: SQLite sam obsługuje dziennik przy pierwszym odczycie, próba 2026-11-07).
- Import: kolumny wiersza muszą być dokładnie kolumnami tabeli (zamknięta lista; nazwy kolumn trafiają do SQL), wartości tylko tekst, liczba, null; naruszenie CHECK/klucza obcego w transakcji → `bledny_plik`. Dzisiejsze aktywności z limitu spoza pliku zostają jako puste znaczniki (jak w „Usuń postęp”), ich odpowiedzi usunięte (kolizja identyfikatorów z plikiem).
- Mapowanie błędów: `errcode & 0xff` = 13 → `brak_miejsca`; każdy inny błąd zapisu → `zapis_nieudany` (nigdy cicho).

### Szacunek (zasada 9)
Agent: część 1 ok. 3–4 h (6 kroków, `pnpm run ci` ok. 2 min po każdym). Czekanie: E2E po każdym pushu kodu ok. 26–33 min (macOS, 0 USD), przegląd D-043 ok. 10 min. Właściciel: akceptacja E0, potem dopiero raport E2 (decyzji produktowych w części 1 brak).

## E1 część 1: wynik (2026-11-07)
| Krok | Commit | Testy przeniesione → `packages/*/test/` | Czerwień przed kodem (fragment) | Po |
|---|---|---|---|---|
| 0+1 | a7dd40f | `k02-migracje` (4), `wspolne.ts`; nowy `schemat-v1` (1) | K-02: `expected { ok: true, wartosc: +0 } to deeply equal { ok: true, wartosc: 1 }`; E1b: `expected [] to deeply equal [ 'b' ]` (port bez kolejki) | zielone |
| 2 | abd6bd8 | `k04-k15-port` (5) | `expected 2 to be 3` (log karty); K-12: `expected { ok: true, wartosc: +0 } to deeply equal { ok: false, powod: 'brak_miejsca' }` | zielone |
| 3 | 2b89ecf | `k12-bledy` (16) | `expected null to be '…postep-uszkodzona-…'`; `Error: file is not a database` (nieobsłużony NOTADB) | zielone |
| 4 | 4cf506d | `k11-dane` (10), `domena/eksport` (21); nowe `dane-08` (5), `eksport-obcy` (1) | `expected { ok: false, powod: 'bledny_plik' } to deeply equal { ok: false, powod: 'nowsza_wersja' }`; `expected 1 to be 4` | zielone |
| 5 | d1598b6 | `k10-ochrona` (9); nowy `ochrona-08` (1) | `brak rozpocznij w: sql:BEGIN | …`; `expected { ok: true } … przerwano_w_tle` | zielone |

Stan po części 1: `pnpm run ci` kod 0 (postep 51 testów, domena 25); `pnpm test:akceptacja` 310 (domena 230: 208 czerwonych, 22 zielonych; ekrany 80: 69/11) — 29 strażników nadal zielonych (18 w domenie + 11 w ekranach; 4 pozostałe zielone w domenie to `k14`), liczby sprawdzane po każdym kroku.

Nie przeniesiony: `tests/akceptacja/postep/k14-stare-bazy.test.ts` — 4 z 5 zielone; kontrola statyczna ADR 0004 czerwona do usunięcia `apps/mobile/src/data/user/db.ts` (część 4 przekazania: usunięcie starego kodu drizzle).

Próby mutacji (D-172, ręcznie): `INSERT OR REPLACE` karty → K-15 czerwony; każdy błąd jako uszkodzenie → K-12 IOERR czerwony; walidacja eksportu: 3 z 4 mutantów zabite przez testy 07, czwarty (bez sprawdzenia `format` przed wersją) → nowy test `eksport-obcy`; import i „Usuń postęp”: 4 mutanty zabite (`dane-08`); ochrona: bez `zakoncz` → 8 czerwonych, bez sprawdzenia flagi → przeżył K-10, zabity przez `ochrona-08`.

### Zgłoszenia
- **Do 07:** (1) obcy plik z wyższą `wersja_formatu` — brak testu w `domena/eksport` (dodany `packages/domena/test/eksport-obcy.test.ts`); (2) K-10 nie odróżnia przerwania na granicy instrukcji od wycofania po całym imporcie (dodany `ochrona-08`); (3) K-11 „Usuń postęp” nie obejmuje wyniku dzisiejszego powtórnego testu (dodany w `dane-08`).
- **Do 05:** L8-01 (błąd startu jako wyjątek, D-200), L8-02 (ścieżka kopii przed importem i migracją), L8-03 (`PortBazy` bez ochrony, D-205); wzór `e2-schemat.mjs` sekcja 7 zostawia `wynik_testu` przy znaczniku dnia (poprawione w kodzie); `migruj` teraz zwraca `migracja_nieudana` także przy błędzie `BEGIN`; adapter `OchronaTla` w `apps/mobile/src/platform/` musi przyjąć `zakoncz(id)` po wygaśnięciu (handler sam woła `endBackgroundTask`, ADR 0013 pkt 1) bez drugiego `endBackgroundTask`.
- **[DO USTALENIA]:** odtwarzanie prawidłowego dziennika `-journal` przy starcie z uszkodzoną bazą (sqlite.org niedostępne z kontenera, proxy 403).

### Przegląd D-043 (świeży kontekst, 2026-11-07, zakres 940a274..d1598b6)
- **P1 przyjęte i naprawione:** import przyjmował wartości złego typu (np. `karta.termin_ms = "jutro"`) i zastępował nimi cały postęp (SQLite z afinicją INTEGER/REAL przyjmuje tekst). Naprawa: `TYPY_KOLUMN` (zamknięta lista typów, strażnik zgodności z `schemat.sql`); test `dane-08` „typy wartości w imporcie” (5 przypadków) — przed poprawką 4 czerwone (`expected { ok: true } to deeply equal { ok: false, powod: 'bledny_plik' }`), przypadek `null` zielony już wcześniej (NOT NULL).
- **Poza P0/P1, naprawione przy okazji (ten sam plik):** aktywność z pliku o id lokalnego znacznika dnia, ale spoza limitu, odnawiała limit (ADR 0007 pkt 5); teraz znacznik zastępuje tylko dzisiejsza aktywność z limitu z pliku. Test czerwony przed poprawką (`expected 3 not to be 3`).
- Luka [DO USTALENIA] z D-201 zamknięta próbą recenzenta: prawidłowy gorący dziennik przy uszkodzonej stronie 1 jest odtwarzany przy pierwszym `SELECT` (`integrity_check` = ok), dziennik usunięty.
- Drugiego przeglądu nie ma (zasada roli).

## E2 część 1: definicja ukończenia (2026-11-07, STOP)
| Punkt | Dowód | Stan |
|---|---|---|
| Każde nowe zachowanie ma test czerwony przed kodem z właściwego powodu, zielony po | tabela „E1 część 1: wynik” (fragmenty czerwieni z asercji); testy roli 08 pokazane czerwone na mutantach | spełniony |
| Żaden test nie usunięty, wyłączony ani osłabiony | przeniesione pliki różnią się tylko ścieżkami importu (`git diff -M` w commitach a7dd40f…d1598b6); w testach oczekujących zmienione tylko importy `wspolne` | spełniony |
| Pełny zestaw zielony | `pnpm run ci` kod 0 (ad5e736; postep 57, domena 25 testów); CI na GitHubie zielone (przebieg 42399545940); E2E iOS 4/4 bez ponowień (przebieg 42399545970, zadanie 128484233720, 36 min 42 s przy limicie 42 min) | spełniony |
| Typecheck, lint | `pnpm typecheck` w `ci` kod 0; osobnego lintu projekt nie ma (kontrole K-07, granice w testach) | spełniony |
| `git diff --cached` przejrzany, bez sekretów | przed każdym commitem (grep kluczy pusty) | spełniony |
| Zapis danych/schematu: test na kopii bazy poprzedniej wersji | K-02 na wzorcu v1 (`tests/narzedzia/wzorzec-bazy.ts`; v1 = pierwsza wersja, brak wydanej wcześniejszej z tym schematem, ADR 0004) | spełniony |
| Zmiana widoczna: zrzuty | nie dotyczy (bez zmian interfejsu) | — |
| Decyzje zapisane | D-199–D-205 w `docs/decyzje.md` | spełniony |
| Przegląd ścieżki wrażliwej (D-043) | wykonany w świeżym kontekście; P1 naprawione testem (ad5e736) | spełniony |

Czego celowo nie zrobiono: adapter `apps/mobile/src/data/postepExpo.ts` i podłączenie `postep` do aplikacji (część 4: usunięcie drizzle, ADR 0003, 0004); kopia `VACUUM INTO` przed importem po stronie wywołującego (L8-02); `k14` w `tests/akceptacja` do usunięcia `apps/mobile/src/data/user/db.ts`.
Ryzyka na urządzeniu: adapter `OchronaTla` (podwójne `zakoncz` po wygaśnięciu), `errcode` w wyjątkach expo-sqlite (założenie 07; w node:sqlite potwierdzone) — do sprawdzenia przy adapterze.
Uwaga dla 07: zadanie E2E 36 min 42 s przy limicie 42 min — zapas 5 min.

## Część 2: czysta domena (plan, 2026-11-07; bez osobnego STOP E0 — plan roli zaakceptowany, D-206)
Każdy krok: znacznik → najprostszy wynik → czerwień na asercji → kod → przeniesienie testu do `packages/domena/test/` w commicie, który go zazielenia; ręczne próby mutacji (D-172); `pnpm run ci` przed commitem. Przed decyzją: Trening (D-191).

| Krok | Zachowanie | Test (`tests/akceptacja/…` → pakiet) | Pliki |
|---|---|---|---|
| 1 | limit dnia, odnowienie w strefie (BR-LIM-001/003/005, ADR 0007) | `domena/limit` | `limit.ts` |
| 2 | logika dostępu, 9 wektorów (BR-ZAK-003, ADR 0006) | `domena/dostep` | `dostep.ts` |
| 3 | maszyny: aktywność, wejście, zakup, import (ADR 0010, BR-LIM-002, D-109) | `domena/maszyny` | `maszyny.ts` |
| 4 | treść czysta i kolejka powtórek (K-06, BR-DANE-004, BR-POW-002, BR-KURS-004, BR-SCN-001-b) | `domena/k06-tresc`, `domena/powtorki-wznowienie` | `tresc.ts` |
| 5 | przypomnienie codzienne (K-13, ADR 0012) | `domena/k13-przypomnienie` | `przypomnienie.ts` |
| 6 | poker-core: walidacja wejścia (RYZ-03/ER-11), progi oceny RD-11 | `poker-core/brd-wektory`, `poker-core/rd11-ocena` | `packages/poker-core/src` |
| 7 | E2 części 2: przegląd D-043 (`packages/domena/` — logika dostępu i limitu) w świeżym kontekście, raport | — | — |

Poza częścią 2: `kurs`, `wyjasnienie`, `scenariusz` (sygnatury czekają na 05 fix), `przygotujTresc` (część 3, `tresc/k06-start`).
Pary maszyn, o których tabela `moduly.md` milczy (zbiory `NIEROZSTRZYGNIETE_*` w teście 07): `przejscie_niedozwolone` (najbezpieczniejsze: stan bez zmian), do potwierdzenia przez 05.

## E1 część 2: wynik (2026-11-07)
| Krok | Commit | Testy przeniesione → `packages/*/test/` | Czerwień przed kodem (fragment) | Mutanty (D-172) |
|---|---|---|---|---|
| 1 limit | 6a71f8d | `limit` (32) | `expected { bezLimitu: false, …(2) } to match object { bezLimitu: false, pozostalo: 1 }` | 6/6 zabite |
| 2 dostęp | c3f873b | `dostep` (9); nowy `dostep-08` (3) | `expected [ false, 'brak' ] to deeply equal [ true, 'sklep' ]` | 4/6 przez 07; filtr produktów i scalanie odnowień → `dostep-08` |
| 3 maszyny | 8e2ca44 | `maszyny` (51); nowy `maszyny-08` (2) | `expected { akcja: 'ekran_zakupu' } to deeply equal { akcja: 'wznow', … }` (53) | 10/14 przez 07, 2 → `maszyny-08`; 2 pary nierozstrzygnięte (bez testu, D-210), 1 równoważny |
| 4 treść | e3ae078 | `k06-tresc` (26), `powtorki-wznowienie` (8, w tym 2 strażniki POW-001); nowy `tresc-08` (2) | `expected [] to deeply equal [ { familyId: 'f-a', … } ]` (16) | 9/11 przez 07, 2 → `tresc-08` |
| 5 przypomnienie | cbb33c1 | `k13-przypomnienie` (16); nowy `przypomnienie-08` (2) | `expected [] to have a length of 1 but got +0` (8) | 4 przez K-13, 3 → `przypomnienie-08`, 2 równoważne |
| 6a poker-core walidacja | 03d8d32 | wpisy z `OCZEKUJACE` (4 wektory biegną w `poker-core/test/brd-wektory`); nowy `walidacja-08` (2) | `RD-05-W6 … błąd danych ma być odrzucony walidacją, jest: null` | 3 przez wektory, 3 → `walidacja-08` |
| 6b RD-11 | 1227a46 | wpisy z `OCZEKUJACE_RD11` (2); nowy przypadek w `content-build/test/grading.test.ts` | `expected 'wrong' to be 'inaccuracy'`; `expected [Function uruchom] to throw an error` | 4/4 |

Stan po części 2: `pnpm run ci` kod 0 (domena 186, poker-core 144, content-build 108, mobile 147 testów); `pnpm test:akceptacja`: domena 72 (52 czerwonych, 20 zielonych: 16 strażników + 4 `k14`), ekrany 80 (69/11); strażniki 29 zielone (16 + 2 POW-001 w pakiecie + 11 ekrany).
Usunięte puste pliki oczekujące: `tests/akceptacja/poker-core/brd-wektory.test.ts`, `rd11-ocena.test.ts` (ich przypadki biegną w pakiecie; vitest odrzuca plik bez testów).
Zmieniony istniejący test (zasada 11, z powodem): `tools/content-build/test/grading.test.ts` — f = 0,02 oczekiwał `wrong` (utrwalał ER-01); teraz `inaccuracy`, `wrong` dla f = 0.

### Zgłoszenia części 2
- **Do 05:** potwierdzenie par nierozstrzygniętych maszyn (D-210); L8-04: `OdczytSklepu` bez rodzaju planu — `wygasaMs: null` dla subskrypcji to błąd adaptera, kontrola w `expo-iap` (D-209); L8-05: `wlaczPrzypomnienie` bez powodu dla błędu platformy (D-212); `startAktywnosci` czyta `KONFIGURACJA` bezpośrednio (sygnatura bez `k`, inaczej niż `limitDnia`).
- **Do 04 i 06:** stopień „niedokładność” (RD-11) w ekranie zadań — brak tekstu i stanu; dziś pokazywany jak „błąd” (D-213).
- **Do 09/adapter:** `getCalendars().timeZone` może być `null` — adapter `Zegar` musi podać strefę (D-208); Hermes `formatToParts` ze strefą — sprawdzenie na telefonie.
