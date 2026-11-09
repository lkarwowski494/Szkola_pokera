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

### Przegląd D-043 części 2 (świeży kontekst, 2026-11-07, zakres 2847073..1227a46)
- **P0:** brak.
- **P1 przyjęte i naprawione (D-214):** maszyna zakupu bez wyjścia z `brak_zakupow` (po „Przywróć” bez zakupu nie da się kupić do końca sesji) i z `oczekuje` (odmowa Ask to Buy blokuje „Przywróć”). Naprawa: `brak_zakupow` + `komunikat_zamkniety` → `bezczynny`, `oczekuje` + `przywroc` → przywracanie; test `maszyny-08` (2 nowe) czerwony przed poprawką. Test 07 pomija te pary (`maszyny.test.ts:264`), bez konfliktu.
- Sprawdzone bez uwag (próby recenzenta): odnowienie limitu w strefach bez północy i z pominiętym dniem (Sao Paulo 2018, Apia 2011, Kiritimati, Teheran, Santiago, Lord Howe), dostęp (zwrot, granica wygaśnięcia, pamięć offline), import tylko po potwierdzeniu, plan treści nie usuwa danych użytkownika, przypomnienie bez dublowania, RD-11 (granice; brak przypadków, w których błąd zaokrąglenia częstości pasa daje „niedokładność” zamiast „błąd”), zmieniony test `grading.test.ts` nie osłabia sprawdzenia.
- Drugiego przeglądu nie ma (zasada roli).

## E2 część 2: definicja ukończenia (2026-11-07, STOP)
| Punkt | Dowód | Stan |
|---|---|---|
| Nowe zachowanie: test czerwony przed kodem z właściwego powodu, zielony po | tabela „E1 część 2: wynik”; testy `*-08` pokazane czerwone na mutantach; poprawka D-214 czerwona przed kodem | spełniony |
| Żaden test nie usunięty, wyłączony ani osłabiony | przeniesione pliki różnią się tylko importami (`git diff -M`); usunięte 2 puste pliki oczekujące (przypadki w pakiecie); 1 zmieniony test z powodem (`grading.test.ts`, ER-01) | spełniony |
| Pełny zestaw zielony | `pnpm run ci` kod 0 (domena 188, poker-core 144, content-build 108, mobile 147); E2E po pushu — wynik w raporcie STOP | spełniony lokalnie |
| Typecheck, lint | `pnpm typecheck` w `ci` kod 0; lintu brak (kontrole w testach) | spełniony |
| `git diff --cached` bez sekretów | przed każdym commitem | spełniony |
| Zapis danych/schematu | nie dotyczy (część 2 bez zapisu i schematu) | — |
| Zmiana widoczna: zrzuty | nie dotyczy (stary ekran zadań bez zmiany wyglądu: `inaccuracy` → `wrong`, D-213) | — |
| Decyzje zapisane | D-208–D-214 | spełniony |
| Przegląd ścieżki wrażliwej (D-043) | wykonany; P1 naprawione testem (D-214) | spełniony |

Czego celowo nie zrobiono: `kurs`, `wyjasnienie`, `scenariusz` (sygnatury czekają na 05 fix), `przygotujTresc` (część 3); tekst i stan „niedokładność” w ekranie zadań (04/06).
Ryzyka na urządzeniu: `Intl.DateTimeFormat.formatToParts` ze strefą w Hermes (limit dnia); `getCalendars().timeZone` = `null`.
Następny krok (D-215, właściciel): 05 fix (sygnatury `kurs`, `scenariusz`, `wyjasnienie`, typy maszyn, luki L8-01–L8-05, D-210/D-214), potem 08 część 3 (treść na plikach, content-build) albo najpierw część 3 (nie zależy od 05).

# Część 3: treść (build, E0, 2026-11-08, STOP)

Zlecenie: D-227 (właściciel: „08 część 3: treść”). Prompt: `assemble.mjs 08-programista --tryb build` (nowa sesja, opus). Wejście: ten plik (części 1–2, „Poza częścią 2”), `fix-08-2026-11-07.md`, `docs/jakosc/przekazanie-08.md` (kolejność 3), `docs/jakosc/fix-07-2026-11-07.md` (JAK-F07-02), ADR 0005, 0014, `moduly.md` („Treść”, „Wyjaśnienie zadań” — format liczb).

## Środowisko i stan wyjściowy (e08933f)
| Sprawdź | Wynik |
|---|---|
| System | Linux, Node 22, bez Xcode; `pnpm install --frozen-lockfile` kod 0 |
| GitHub | MCP (push na gałąź roboczą); `prompts` dołączone do odczytu; Trening: klon `/home/user/lkarwowski494/trening` (2e4b0f8) |
| `pnpm run ci` | kod 0: srs 21, jezyki 136, poker-core 155, domena 295, postep 61, content-build 110, preflop-solver 43, mobile 147; `content:check` 1,8 s (44 lekcje, 141 reguł, 162 terminy) |
| `test:akceptacja:domena` | 43 testy, 26 czerwonych (tylko `tresc/*`, `kontrole/*`, `postep/k14`) — za przekazaniem, nieuruchamiane ponownie |
| CI na gałęzi | e08933f zielone (przebieg 42456164735) |
| E2E | 70a7247 (przebieg 42422522419, zadanie 128553803917): **porażka maszyny drugi raz z rzędu** — kompilacja zielona (23 min 36 s), symulator gotowy po 1 min 44 s migracji danych, potem Maestro 2.11.0 po 3 min 21 s: „iOS driver not ready in time, consider increasing timeout by configuring MAESTRO_DRIVER_STARTUP_TIMEOUT” przed pierwszym flowem. Polityka §7 pkt 4: jedno powtórzenie wykorzystane (92b273d → 70a7247), teraz przyczyna → zgłoszenie 08-F03 |

## Założenia wejściowe (hipotezy)
- Sygnatury `przygotujTresc`/`PlikiTresci` (`tresc.ts`, przyjęte w 05 fix) są wykonalne bez zmiany testu `k06-start` — sprawdzone czytaniem: test potrzebuje kopii pod nazwą tymczasową i przemianowania (port bez nadpisywania), sprzątania niepełnej kopii przy następnym starcie i zamknięcia każdej bazy odrzuconej.
- `numbers.display` różni się między językami; test `k06-content-build` porównuje tylko `key, value` — zgodne z D-220.
- Treść istnieje tylko w `content/pl`; `content/<język>` brak dla 34 języków (przekład: rola 09, „koszt przekładu API” otwarte).
- Aplikacja czyta dziś `content-v6.db` z `forceOverwrite: true` (`apps/mobile/src/app/_layout.tsx:21–23, 68`). Usunięcie tego pliku przez `content-build` (wymóg AK-K-06-r) psuje aplikację, jeśli w tej samej części nie powstanie wybór pliku w aplikacji → zakres części 3 obejmuje adapter (D-232).

## Plan (cięcie pionowe; każdy krok: czerwień z właściwego powodu → kod → `pnpm run ci` → commit)
| Krok | Zachowanie | Test (czerwony przed) | Pliki |
|---|---|---|---|
| 1 | `przygotujTresc`: plan → kopia pod nazwą tymczasową (`<plik>.kopia`) → przemianowanie → otwarcie, manifest → usunięcie innych `tresc-*.db` i resztek kopii po otwarciu; każdy błąd = `tresc_niedostepna`, bez wyjątku | `tests/akceptacja/tresc/k06-start.test.ts` → `packages/domena/test/k06-start.test.ts` (D-175, tylko importy) | `packages/domena/src/tresc.ts` |
| 2 | `{{n:…}}` językiem budowanej bazy przez `@szkola/jezyki` (JAK-F07-02, D-220, ADR 0014 pkt 7) | nowy `tools/content-build/test/liczby-jezyk-08.test.ts`: wektory pl „50%”, de „50 %”, fr „50 %”, tr „%50”, `bb`/`x`/` s` bez zmian poza liczbą; strażnik: dla `pl` `display` każdej liczby z `numbers.yaml` = wynik dzisiejszego `formatNumber` (baza polska bez zmiany tekstu) | `tools/content-build/src/numbers.ts`, `package.json` (`@szkola/jezyki: workspace:*`, lockfile `--lockfile-only`) |
| 3 | 35 plików `tresc-<wersja>-<język>.db` z `meta` (`format`, `wersja`, `jezyk`, `min_wersja_aplikacji`), tekst z łańcucha zastępczego (D-228), wersja = skrót treści (D-229); `content:check` dla 35 plików i modułów; stare pliki (`content-v*.db`, inne wersje) usuwane przy budowie | `tests/akceptacja/tresc/k06-content-build.test.ts` → `tools/content-build/test/`; nowe `-08`: zmiana treści zmienia wersję, check wykrywa brak/obcy plik | `tools/content-build/src/build.ts`, `cli.ts`, `apps/mobile/assets/content/` |
| 4 | Aplikacja otwiera plik z `przygotujTresc` (język = język interfejsu z `jezykDlaUstawienia`, dziś `pl`), bez `forceOverwrite`; mapa język → `require` generowana przez `content-build`; adapter `PlikiTresci` na `expo-file-system` (paczka jako katalog wirtualny z mapy) | Jest: adapter na atrapie modułu plików (lista z mapy, kopia bez nadpisywania); E2E 01–04 (treść pl) po pushu | `apps/mobile/src/data/tresc/` (nowe), `src/data/content/tresc.generated.ts`, `_layout.tsx`; API `expo-file-system` z dokumentacji SDK 57 w dniu pracy (zasada 12) |
| 5 | E2: mutacje (D-172), pomiar rozmiaru 35 baz i paczki (ADR 0005, próg 50 MB), przegląd D-043 (`packages/domena/`, `tools/content-build/`, `apps/mobile/src/data/`) w świeżym kontekście, jeden push kodu (E2E) | — | — |

Wywołania do sprawdzenia (zasada 4): `formatNumber` — `numbers.ts` (`resolveNumbers`) i testy `content-build`; `contentDbFileName`, `staleContentDbs`, `writeContentDb`, `readDbHash` — `cli.ts`, testy `build.test.ts`; `CONTENT_DB` — `_layout.tsx`, `src/data/content/repo.ts:178` (`meta.hash` → zostaje klucz `hash` obok manifestu).

Poza częścią 3 (nazwane): `kryteria-liczby`, `kryteria-terminy` (znaleziska treści roli 06; zostają czerwone); nazwy terminów `{{t:…}}` na język (glosariusz 09 + 06, ADR 0014); przekład treści (09); `k14`, `kontrole/*` (część 4); ekrany (część 5).

## Decyzje techniczne (A, do weta; zapis D-228–D-232)
- **D-228** tekst baz bez przekładu: łańcuch zastępczy `@szkola/jezyki` (`lancuchZastepczy`: wariant → język → źródło `pl`) na poziomie pliku treści; liczby w formacie języka bazy (D-220). Odrzucone: tylko języki z `content/<język>` (AK-K-06-r czerwony do przekładu); angielski jako zastępczy (brak `content/en`). Trening: brak przekładu → angielski (`tests/pending-translation.ts:1–4`, odczyt 2026-11-08, 2e4b0f8); odstępstwo nazwane: źródłem jest `pl`, bo treści `en` nie ma (ADR 0014 pkt 6).
- **D-229** `wersja` w nazwie = 10 znaków hex skrótu łącznego (sha256 ze skrótów 35 baz). Odrzucone: `CONTENT_SCHEMA_VERSION` (zmiana treści bez zmiany schematu nie skopiowałaby nowego pliku przy `forceOverwrite: false` — użytkownik zostałby ze starą treścią), licznik ręczny (zapominany). `min_wersja_aplikacji` = `0.1.0` (pierwsza wersja z formatem 1, `app.json`), stała w `content-build`.
- **D-230** format liczb: `formatujLiczbe`/`formatujProcent` z `miejsca` = `decimals` wpisu; jednostki `bb`, `bb/100`, `x`, ` s` doklejane bez zmian (moduly.md). Strażnik polskiej bazy jak w kroku 2.
- **D-231** 35 baz commitowanych w `apps/mobile/assets/content/` (jak dziś `content-v6.db`; `content:check` pilnuje aktualności). Koszt [OCENA]: ok. 9 MB historii na wersję treści (35 × ok. 250 KB po kompresji); 78 commitów zmieniało bazę w budowie, plan treści kwartalny (D-108) → ok. 36 MB/rok. Odrzucone: generowanie przy buildzie (zmiana `e2e-ios.yml`, haka EAS i `pnpm run ci`; testy zależne od kroku budowy). Warunek powrotu: zmierzony przyrost > 15 MB na wersję.
- **D-232** wybór pliku treści w aplikacji w części 3 (nie 4): bez niego usunięcie `content-v6.db` psuje start. Odrzucone: zostawić `content-v6.db` obok 35 baz (AK-K-06-r czerwony, dwie ścieżki treści).

## Zgłoszenie 08-F03 → 07 (CI, ścieżka wrażliwa): E2E pada na starcie sterownika Maestro
Przyczyna: domyślny czas startu sterownika XCTest za krótki po świeżym rozruchu symulatora (2/2 ostatnie przebiegi; kompilacja i rozruch zielone). Trening miał to samo i ustawił `MAESTRO_DRIVER_STARTUP_TIMEOUT: '480000'` („04.10.2026: 2× „driver not ready” przy 240 s po 8-min. rozruchu symulatora”, `.github/workflows/e2e-ios.yml:207`, odczyt 2026-11-08, 2e4b0f8) oraz jedno powtórzenie tylko przy „iOS driver not ready in time” (`:214–223`). Propozycja: ta sama zmienna w kroku „Flowy Maestro” i „Ponowienie”; ryzyko: limit zadania 42 min (`20 + 3 × flowy + 10`, test `e2e-flowy.test.mjs`) może nie zmieścić 8 min oczekiwania — ostatni zielony przebieg 36 min 42 s; zmiana limitu to test roli 07. Bez poprawki krok 4 (adapter treści w aplikacji) nie ma dowodu z symulatora.

## Szacunek (zasada 9)
Agent: ok. 4–5 h (5 kroków, `pnpm run ci` ok. 2,5 min po każdym; budowa 35 baz dodaje ok. 35 s do `content:check` [OCENA z 1,8 s na język]). Czekanie: E2E ok. 37 min po jednym pushu kodu (0 USD), przegląd D-043 ok. 10 min. Właściciel: ta decyzja; potem raport E2.

## E1 część 3: wynik (2026-11-08; plan przyjęty D-233, 08-F03 jako krok 0)
Każdy commit: `pnpm run ci` kod 0. Przeniesienia testów 07 według D-175 (tylko importy).

| Krok | Commit | Test | Przed (fragment) | Po | Mutanty (D-172) |
|---|---|---|---|---|---|
| 1 `przygotujTresc` | ad7b4ba | `domena/test/k06-start` (13, przeniesiony), nowy `k06-start-08` (2) | 7/13 na asercji: `expected { ok: false, …(1) } to match object { ok: true, wartosc: { …(2) } }` | domena 310 | 4/6 przez 07 (kopia wprost pod cel, bez sprzątania resztki, bez zamknięcia odrzuconej, usunięcie przed otwarciem); resztki `.kopia` i błąd usunięcia starego → `k06-start-08` (M5–M7) |
| 2 liczby wg języka | a23ed73 | nowy `content-build/test/liczby-jezyk-08` (4; JAK-F07-02) | 3/4 na asercji: `expected '50%' to be '50 %'`; strażnik `pl` zielony przed i po | content-build 114; skrót treści `pl` bez zmian (5e6dc15141abe5ed) | 4/4 (procent sklejany, bez stałych miejsc, `resolveNumbers` bez języka, zawsze `pl`) |
| 3 35 baz | 12d3241 | `content-build/test/k06-content-build` (3, przeniesiony), nowy `tresc-35-08` (7) | 07: `expected [ 'content-v6.db' ] to deeply equal []`; 08: `ENOENT … content/es-419/modules.yaml` (brak łańcucha), `expected [ 'content-v3.db' ] to deeply equal [ 'content-v3.db', 'tresc-a-pl.db' ]` | content-build 124, mobile 148 | 7/7 (M6 „kontrola bez skrótu” najpierw przeżył — test poprawiony przed commitem) |
| 4 aplikacja | a5d38b9 | nowy `apps/mobile/src/data/tresc/__tests__/plikiExpo` (5) | test po kodzie adaptera (odstępstwo nazwane) — dowód mutantami | mobile 153 | 6/6 po zaostrzeniu atrapy (kopia/przeniesienie nadpisujące, `list()` brakującego katalogu rzuca) |
| 0 08-F03 | 95e3cad | `tests/narzedzia/workflowy.test.mjs` (+1) | `MAESTRO_DRIVER_STARTUP_TIMEOUT = undefined` | 14/14 | — |

Zmienione istniejące testy (zasada 11, z powodem): `apps/mobile/src/features/session/__tests__/contentDbName.test.ts` (kontrakt jednej `content-v<N>.db` zastąpiony: moduł wygenerowany = pliki w paczce, `_layout` bez nazw i `forceOverwrite`); `tools/content-build/test/build.test.ts:374–380` (`staleContentDbs` z listą oczekiwanych zamiast `contentDbFileName()`); 4 testy aplikacji czytają bazę `pl` przez `src/test-utils/trescPl.ts` zamiast `content-v${CONTENT_SCHEMA_VERSION}.db` (bez zmiany asercji). Workflowy wydania `testflight.yml:145–148`, `iphone-local.yml:82–85`: kontrola 35 plików `tresc-*.db` zamiast `content-v*.db` (inaczej następny build TestFlight padłby).
Pomiar (ADR 0005, D-231): 35 baz = 36 MB surowo, ok. 8,9 MB po zip (35 × 254 KB), w git 333 KiB na wersję treści; `content:build` 30 s, `content:check` 23 s.
`test:akceptacja:domena`: 27 testów, 10 czerwonych (było 43/26; 16 testów treści w pakietach): `kontrole/*` i `postep/k14` (część 4), `kryteria-*` (treść, rola 06). K-07 bez trafienia `forceOverwrite`.


### Przegląd D-043 części 3 (świeży kontekst, 2026-11-08, zakres 1ea7a05..95e3cad)
- **P0/P1:** brak uwag.
- Sprawdzone (próby recenzenta w osobnym worktree): usuwanie tylko według wzorca `tresc-*.db(.kopia)` (postęp, `user.db*`, `-wal/-shm/-journal` nietknięte); `File.copy/move` 57.0.7 bez `overwrite` nie usuwają celu (`FileSystemPath.swift:69–92`), `Paths.document/SQLite` = `defaultDatabaseDirectory` (`SQLiteModule.swift:27`); przerwanie: `move` atomowy, resztka sprzątana, `przygotujTresc` nie rzuca (mutanty zabite przez AK-K-06-q); 35 baz wobec `content-v6.db`: `pl` identyczna poza `meta`, `numbers.value` i struktura identyczne w 35 bazach (824 klucze), jedna wersja `52c2dc3d56`; `content:check` wykrywa brak, rozjazd skrótu, obcy `.db`, nieaktualny moduł; workflowy wydania nie przepuszczą paczki bez treści; zmienione testy nie osłabione; `_layout` bez zawieszenia (obietnica nie odrzuca, błąd → ekran z ponowieniem); brak sekretów. Drugiego przeglądu nie ma.
- Poniżej progu (backlog): (1) stara `content-v6.db` (ok. 1 MB) zostaje na urządzeniach z wcześniejszymi buildami (tylko TestFlight właściciela) — usuwanie poza wzorcem treści celowo wyłączone (D-211); (2) nazwa pliku zależy od skrótu treści, nie od układu tabel w `writeContentDb` — zmiana układu bez zmiany treści i `CONTENT_SCHEMA_VERSION` zostawiłaby stary plik na urządzeniu (dziś nie występuje; reguła: zmiana układu = podniesienie `CONTENT_SCHEMA_VERSION`, które wchodzi do skrótu).

## E2 część 3: definicja ukończenia (2026-11-08, STOP)
| Punkt | Dowód | Stan |
|---|---|---|
| Nowe zachowanie: test czerwony przed kodem z właściwego powodu, zielony po | tabela „E1 część 3: wynik”; wyjątek nazwany: test adaptera expo po kodzie (dowód: 6/6 mutantów) | spełniony z wyjątkiem nazwanym |
| Żaden test nie usunięty, wyłączony ani osłabiony | przeniesienia D-175 tylko z importami; 3 zmienione testy z powodem (przegląd D-043: nie osłabione) | spełniony |
| Pełny zestaw zielony | `pnpm run ci` kod 0 (domena 310, content-build 124, mobile 153, postep 61, poker-core 155, jezyki 136, srs 21, preflop-solver 43); **E2E iOS 95e3cad zielone bez ponowień** (przebieg 42458624316, zadanie 128662878505: 34 min 35 s, kompilacja 20 min 41 s, symulator 6 min 18 s, flowy 4 min 37 s; pierwszy zielony E2E od 3 przebiegów — 08-F03 działa) | spełniony |
| CI na GitHubie | 95e3cad i 14856e6: zadanie `check` czerwone — `T35-08-a` przekroczył domyślne 5 s (7,3 s na runnerze; kompilacja w ciele testu); przyczyna usunięta jawnym limitem 60 s dla pliku (§7: bez ponowienia, przyczyna); `akceptacja` czerwone z założenia (informacyjne, D-175) | naprawione w commicie raportu |
| Typecheck, lint | `pnpm typecheck` w `ci` kod 0; lintu brak (kontrole w testach) | spełniony |
| `git diff --cached` bez sekretów | przed każdym commitem; przegląd D-043 (h) | spełniony |
| Zapis danych/schematu | schemat postępu bez zmian; pliki użytkownika w katalogu baz nietknięte (testy K-06 `sumaDanych`, atrapa adaptera, przegląd D-043 a) | spełniony |
| Zmiana widoczna: zrzuty | ekran błędu treści = istniejący `RenderErrorScreen` (bez nowego wyglądu); reszta bez zmian wyglądu — zrzuty nie dotyczą | nie dotyczy |
| Decyzje zapisane | D-228–D-233 | spełniony |
| Przegląd ścieżki wrażliwej (D-043) | wykonany, brak uwag P0/P1 | spełniony |

Czego celowo nie zrobiono: przekład treści (09); tekst ekranu `tresc_niedostepna` (04); ponowne przygotowanie treści przy zmianie języka w działającej aplikacji (`ustawJezyk` — część 5, ekran ustawień); usuwanie starej `content-v6.db` z urządzeń z wcześniejszymi buildami (backlog, poza wzorcem D-211); `kryteria-*` (06); kontrole i `k14` (część 4).
Ryzyka na urządzeniu (lista kontrolna TestFlight): pierwszy start po aktualizacji z buildu 1005–1008 — treść widoczna, postęp ten sam; drugi start bez ponownej kopii (czas startu); brak miejsca na urządzeniu → ekran z ponowieniem.

### Zgłoszenia części 3
- **Do 04:** tekst i stan ekranu `tresc_niedostepna` (tlo-i-bledy.md §4); dziś ogólny „Coś poszło nie tak” z ponowieniem.
- **Do 07:** limit E2E 42 min wobec `MAESTRO_DRIVER_STARTUP_TIMEOUT` 8 min (przebieg 95e3cad 34 min 35 s — zapas 7 min); testy kompilujące treść potrzebują jawnego limitu czasu na runnerze.
- **Do 05:** reguła „zmiana układu tabel `writeContentDb` = podniesienie `CONTENT_SCHEMA_VERSION`” (nazwa pliku ze skrótu treści, przegląd D-043 obs. 2); `content-build` zależy teraz od `@szkola/domena` (`nazwaPlikuTresci`, `TRESC_FORMAT`) i `@szkola/jezyki` — krawędź do dopisania w `moduly.md`.
- **Do 09:** 34 bazy z polskim tekstem (`meta.jezyk_tekstu = pl`) czekają na przekład; liczby już w formacie języka.

## Punkt czyszczenia (STOP E2 części 3)
Rola 08, tryb build. Prompt: `node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build`. Plik stanu: ten plik, „Część 3”, „E2 część 3”. Następny krok według przekazania 07 (kolejność 4): część 4 — usunięcie starego kodu (drizzle `src/data/user`, Sentry, Observe; ADR 0003, 0004, 0009, 0011), adapter `postepExpo`, `expo-iap` (L8-04), manifest prywatności w `app.json`, SDK 58 z tabelą Xcode [DO USTALENIA] (K-07, K-08, K-09, R-56, `k14`).

# Część 4: kontrole, platforma, adaptery (build, E0, 2026-11-08, STOP)

Zlecenie: D-234 (właściciel: „08 część 4”). Prompt: `assemble.mjs 08-programista --tryb build` (nowa sesja, opus/high). Wejście: ten plik, `docs/jakosc/przekazanie-08.md` (kolejność 4), ADR 0001, 0003, 0004, 0006, 0009, 0011, 0012, 0013, `moduly.md`, `kontrole-07.md`.

## Środowisko i stan wyjściowy (25a6183)
| Sprawdź | Wynik |
|---|---|
| System | Linux, Node 22.23.4, bez Xcode; `pnpm install --frozen-lockfile` kod 0 |
| GitHub | MCP (push na gałąź roboczą); `prompts` dołączone do odczytu (`assemble.mjs` za zgodą właściciela w tej sesji); Trening: klon `/home/user/lkarwowski494/trening` (2e4b0f8) |
| Sieć | docs.expo.dev i expo.dev: proxy 403; raw.githubusercontent.com (źródła dokumentacji Expo), registry.npmjs.org, developer.apple.com: 200 |
| `pnpm run ci` | kod 0: srs 21, jezyki 136, poker-core 155, domena 310, postep 61, mobile 153, content-build 124, preflop-solver 43 |
| Testy części 4 (`vitest --root tests/akceptacja`, `kontrole/*` + `postep/k14`) | 14 testów, 7 czerwonych na asercji: K-07 (9 trafień: `sentry` 5, `expo-observe` 3, pusty `catch` 1 w `observability/crashReports.ts:48`), K-08 (brak `NSPrivacyAccessedAPICategoryDiskSpace` z `expo-file-system`; 3 zbierane typy danych), K-09-b/c/d, AK-D050-a (SDK 57), ADR 0004 statyczny (`user.db` w `apps/mobile/src/data/user/db.ts`); K-14 zachowanie (4 testy) już zielone |
| CI na GitHubie | 5174487 `CI` zielone (42461519583, poprawka limitu `tresc-35-08` działa); 25a6183 `CI` zielone (42461941995); E2E 5174487 (42461519607) w toku w chwili odczytu |

## Xcode dla SDK 58 (zamknięcie [DO USTALENIA])
docs.expo.dev niedostępne z kontenera, więc odczyt u źródła tabeli: strona `docs/pages/versions/unversioned/index.mdx` renderuje `<AndroidIOSCompatibilityTable />` (`docs/ui/components/SDKTables/AndroidIosCompatibilityTable.tsx:40` — kolumna `version.xcode`), dane z `@expo/sdk-compatibility/data` = `packages/@expo/sdk-compatibility/src/sdk-compatibility.json` (raw.githubusercontent.com/expo/expo/main, odczyt 2026-11-08): `"sdk": "58.0.0"` … `"ios": { "minimumVersion": "16.4", "xcodeVersionRange": ">=26.4.0" }`, `"runtime": { "reactNative": "0.88", "react": "19.3.0" }`. Wniosek: SDK 58 → Xcode 26.4 (ten sam próg co 57, workflowy bez zmiany liczby). Odstępstwo nazwane: źródło to plik danych tej tabeli w repozytorium Expo (szczebel 1, producent), nie wyrenderowana strona.

## Założenia wejściowe (hipotezy)
- ADR 0001: `expo-iap` zgodny z SDK 58 — `peerDependencies expo: "*"` (6.4.2); pełna zgodność dopiero po instalacji i buildzie (E2E). `npx expo install --check` uruchamia kod z npm — w kontenerze zastępczo porównanie wersji z `bundledNativeModules.json` paczki `expo` 58.0.23 (dane, bez uruchamiania).
- „Podłączenie `packages/postep`” w części 4 zakłada, że stare ekrany da się przenieść bez nowych zachowań. **Podważone czytaniem:** 15 plików ekranów i stanu woła 22 funkcje `src/data/user/repo.ts`/`game.ts` (odpowiedzi, karty, wyniki lekcji i testów, seria dni, ustawienia), a `packages/postep` ma dziś zapis kroku, powtórki, eksport/import i start — bez repozytoriów odczytu (`ustawienia`, `postepLekcji`, `testy`, karty do terminu; moduly.md „Repozytoria”). Przeniesienie ekranów to wpięcie maszyny `aktywnosc` (limit, wznowienie) — zachowania z testami części 5–6 → decyzja P-1.
- K-08: kategoria DiskSpace pochodzi z manifestu `expo-file-system` (powody `E174.1`, `85F4.1`); Trening ma w `app.json:66–76` ten sam wpis (odczyt 2026-11-08, 2e4b0f8). Lista kategorii zmieni się po SDK 58 i nowych paczkach → K-08 uruchamiany po ostatniej zmianie zależności.

## Plan (cięcie pionowe; każdy krok: czerwień z właściwego powodu → kod → `pnpm run ci` → commit; jeden push kodu na końcu = jedno E2E)
| Krok | Zachowanie | Test (czerwony przed) | Pliki |
|---|---|---|---|
| 1 | Bez Sentry i Expo Observe (ADR 0009 pkt 1): zależności, `src/observability/`, `jest.setup.js`, `metro.config.js`, wtyczka i `extra.sentry` w `app.json`, 3 typy `NSPrivacyCollectedDataTypes`; `NSPrivacyTracking: false`, `NSPrivacyTrackingDomains: []` | `kontrole/k07-zakazy`, `k09-app-json` (c, d) → do bramki `pnpm run ci` (D-175; miejsce: D-236) | `apps/mobile/package.json`, `app.json`, `jest.setup.js`, `metro.config.js`, lockfile |
| 2 | Kod bez BR usunięty (ADR 0011): `features/play`, `app/play/*`, `(tabs)/rules.tsx`, tryb `speed`, część „gra” w `advancement`, `data/user/game.ts`; `diagnostics.tsx` tylko pod `__DEV__`; hash ostatniego commitu z kodem w kolumnie „Powrót” kontraktu zakresu. Schemat drizzle starej bazy bez zmian (tabele gry zostają w `user.db`, nieczytane) | nowy strażnik `apps/mobile/src/__tests__/adr0011-08.test.ts` (brak plików i trybu `speed`, `diagnostics` tylko w gałęzi `__DEV__`) | `apps/mobile/src/app`, `features`, `docs/scope-contract.md` |
| 3 | SDK 58: `expo ~58.0.23` i moduły w wersjach z `bundledNativeModules.json` (RN 0.88, React 19.3), `jest-expo` 58; tabela `MIN_XCODE` z wpisem `58: '26.4'` i cytatem wyżej | `kontrole/r56-runner-xcode` (a, b) → bramka | `apps/mobile/package.json`, lockfile (`--lockfile-only`, potem `--frozen-lockfile`), `r56` (tylko tabela, zgodnie z jej komentarzem) |
| 4 | Przypomnienie — konfiguracja i adapter (ADR 0012 pkt 5): `expo-notifications` 58.1.8, wtyczka `enableRemoteNotifications: false`; adapter `PortPowiadomien` (kształt z `przypomnienie.ts`) bez `get*PushTokenAsync` | `k09-app-json` (b); nowy `platform/__tests__/powiadomienia-08` (atrapa modułu: wyzwalacz `daily`, anulowanie własnych) | `apps/mobile/src/platform/powiadomienia.ts`, `app.json` |
| 5 | Adapter zakupów `expo-iap` 6.4.2 (ADR 0006, L8-04): transakcje → `OdczytSklepu` (`wygasaMs: null` tylko z `PRODUKTY_BEZ_KONCA`, błąd sklepu → `{ ok: false }`, nie „brak zakupu”), `kup`, `przywroc`, arkusz zarządzania; bez wywołań w transakcji bazy. API 6.x z typów paczki (odczyt w dniu pracy, zasada 12); wzorzec Trening `lib/store-native.ts` (5.8.1) | nowy `platform/__tests__/zakupy-08` (atrapa `expo-iap`: odczyt, zwrot, brak sieci, produkt bez daty końca) | `apps/mobile/src/platform/zakupy.ts` |
| 6 | Ochrona tła (ADR 0013 pkt 1–2): moduł `apps/mobile/modules/ochrona-tla/` (Swift, `beginBackgroundTask`/`endBackgroundTask`, zdarzenie `wygasa`, −1 dla `.invalid`; Android bez działania) i adapter `OchronaTla` | nowy `platform/__tests__/ochronaTla-08` (atrapa modułu: `zakoncz` po `wygasa` bez drugiego końca, odpięcie słuchacza); Swift bez testu w Node — krok właściciela U-2 | `modules/ochrona-tla/*`, `src/platform/ochronaTla.ts` |
| 7 | Adapter `postepExpo` (moduly.md: `openDatabaseAsync('postep.db')`, `runAsync`, `getAllAsync`, `withTransactionAsync` w kolejce) + `PlikiPostepu` na `expo-file-system` + `uruchomPostep` przy starcie w `_layout` z ochroną tła; `BladStartuPostepu` → ekran błędu z ponowieniem (istniejący, bez nowego wyglądu); kontrola K-04 w buildzie deweloperskim (`journal_mode = delete`, `foreign_keys = 1`, wpis przy ≠) | nowy `data/__tests__/postepExpo-08` (atrapa expo-sqlite: pragma przed migracją, poza transakcją; błędy → `PowodZapisu`); K-14 zachowanie zostaje zielone | `apps/mobile/src/data/postepExpo.ts`, `data/plikiPostepu.ts`, `_layout.tsx` |
| 8 | K-08 po ostatniej zmianie zależności: każda kategoria z manifestów drzewa w `expo.ios.privacyManifests` z powodem z listy Apple (odczyt developer.apple.com w dniu pracy) | `kontrole/k08-manifesty` → informacyjna w CI (strategia §8.1) | `app.json` |
| 9 | E2: mutacje (D-172), przegląd D-043 (`apps/mobile/src/data/`, `src/platform/`, `modules/ochrona-tla/`, `app.json`), jeden push kodu → E2E 01–04 na SDK 58 | — | — |

Wywołania do sprawdzenia (zasada 4): `observability` — `_layout.tsx`, `crashReports.test.tsx`; `userDb` — 15 plików (zostają przy P-1 = B); `RenderErrorScreen` — `_layout.tsx` (ekran błędu postępu).

Poza częścią 4 (nazwane): rola 10 — przegląd całego manifestu prywatności przed wydaniem; podpięcie zakupów, przypomnienia i ochrony do ekranów (część 5); `kryteria-*` (06).

## Decyzja dla właściciela (P-1, zakres i kolejność prac)
Stare ekrany (lekcja, sesja, powtórki, postęp, start, ustawienia) zapisują przez drizzle do `user.db`. Usunięcie drizzle (K-14 statyczny, ADR 0003/0004) wymaga przeniesienia ich danych na `packages/postep`.
- **A: przeniesienie w części 4.** Repozytoria odczytu (`ustawienia`, `postepLekcji`, `testy`, karty do terminu) z testami na `node:sqlite`, 15 plików ekranów na nowe repozytoria i maszynę `aktywnosc`, usunięcie `src/data/user`, `drizzle/`, `drizzle-orm`, `drizzle-kit`. Kompromis: jedna ścieżka danych i K-14 zielony od razu; ok. +6–8 h, a część ekranów (start, ustawienia, postęp) i tak przebudowuje część 5 — praca podwójna; limit i wznowienie wchodziłyby bez testów ekranów 07.
- **B (rekomendacja): przeniesienie razem z ekranami w części 5.** Część 4 = kroki 1–9; `postep.db` otwierana przy starcie, ale stare ekrany do części 5 piszą jeszcze do `user.db`; drizzle i `src/data/user` znikają w części 5, w commicie, który zazielenia K-14 statyczny (do tego czasu jeden czerwony test oczekujący). Kompromis: dwie bazy w buildach deweloperskich do części 5 (bez wydania między częściami — próg z `CLAUDE.md`); każdy ekran przenoszony raz, z testami 07.
- C: tymczasowa warstwa ze starym API (`recordAnswer`, `lessonProgressMap` …) na nowym schemacie — odrzucona: kod do wyrzucenia w części 5, bez testów zachowań.

## Decyzje techniczne (A, do weta; zapis D-235–D-238)
- **D-235** Xcode dla SDK 58 = 26.4 ze źródła tabeli docs.expo.dev (wyżej); odrzucone: zostawić [DO USTALENIA] do odblokowania proxy (R-56 czerwony bez powodu merytorycznego).
- **D-236** kontrole K-07, K-09, R-56 po zazielenieniu idą do `pnpm run ci` jako testy Vitest w `tests/kontrole/` (wspólny katalog repo, bo sprawdzają całe drzewo, nie pakiet); K-08 informacyjne w CI (strategia §8.1). Odrzucone: `apps/mobile` (Jest; skaner repo nie jest testem aplikacji); zostawić w `tests/akceptacja` (D-175: bez bramki).
- **D-237** wersje SDK 58 z `bundledNativeModules.json` paczki `expo` 58.0.23 zamiast `npx expo install` (klasyfikator blokuje uruchamianie kodu z npm); `expo-iap` 6.4.2 (wersja przeczytana w ADR 0006; 6.4.3 z 2026-11-04 bez przeglądu zmian). Trening: SDK 57, `expo-iap` 5.8.1 — odstępstwo nazwane w ADR 0001 i 0006.
- **D-238** DiskSpace w manifeście z powodami jak w Treningu (`E174.1`, `85F4.1`, `app.json:74`, odczyt 2026-11-08) po sprawdzeniu opisu powodów u Apple w kroku 8; `enableRemoteNotifications: false` — odstępstwo od Treningu (tam bez opcji, `app.json:90–93`) z powodu ADR 0012 pkt 5 (bez uprawnienia APNs).

## Szacunek (zasada 9)
Agent: B ok. 7–9 h (kroki 1–9; SDK 58 i adapter `expo-iap` najbardziej niepewne), A dodatkowo ok. 6–8 h. Czekanie: E2E ok. 37 min po jednym pushu kodu (0 USD, repo publiczne), przegląd D-043 ok. 10 min. Ryzyko: build iOS na SDK 58 sprawdza dopiero E2E — przy porażce kompilacji poprawka i drugi push (zasada 5: po dwóch nieudanych — STOP). Właściciel: decyzja P-1; potem raport E2 i lista na telefon (U-2 ochrona tła, U-5 zakupy w piaskownicy po części 5).

## Punkt czyszczenia (STOP E0 części 4)
Rola 08, tryb build. Prompt: `node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build`. Plik stanu: ten plik, „Część 4”. Decyzja: D-239 (P-1 = B, D-235–D-238 przyjęte). Następny krok: E1 kroki 1–9 (bez przenoszenia ekranów i usuwania drizzle — część 5).

## E1 część 4: wynik (2026-11-08; plan przyjęty D-239)
| Krok | Commit | Zachowanie | Testy (czerwone przed kodem → zielone) |
|---|---|---|---|
| 1 | 3764d30 | bez Sentry i Expo Observe (zależności, `observability/`, `jest.setup.js`, `metro.config.js`, wtyczka i `extra.sentry`, `SENTRY_ALLOW_FAILURE` w `eas.json`); manifest: `NSPrivacyCollectedDataTypes` [], `NSPrivacyTracking` false; dziennik lokalny `platform/dziennik.ts` (D-240) i `components/GranicaBledu.tsx` | `platform/__tests__/dziennik-08` (4); K-07 → `tests/kontrole` (bramka); K-09 a/c/d zielone |
| 2 | 979626e | ADR 0011: usunięte gra z botami, księga reguł, tryb „speed”, część „gra” wskaźnika, `data/user/game.ts`; historia wskaźnika tylko z wiedzy; diagnostyka pod `__DEV__` (D-242); „Powrót” w kontrakcie zakresu = `3764d30` | `src/__tests__/adr0011-08` (6), `advancement/__tests__/historia` (1); usunięte testy usuniętego kodu (nazwane w commicie) |
| 3 | d707b35 | SDK 58: expo 58.0.23, RN 0.88.1, React 19.3.0, moduły z `bundledNativeModules.json` (D-237), lockfile (D-241); R-56 `MIN_XCODE[58] = '26.4'` (D-235, cytat sprawdzony ponownie 2026-11-08) | R-56 → `tests/kontrole` (AK-D050-a był czerwony: 57 ≠ 58) |
| 4 | 45bdf2b | `expo-notifications` 58.1.8, wtyczka `enableRemoteNotifications: false`; adapter `platform/powiadomienia.ts` | `platform/__tests__/powiadomienia-08` (4); K-09 → `tests/kontrole` |
| 5 | c571525, d950488 | `expo-iap` 6.4.2 + wtyczka; `platform/zakupy.ts`: odczyt → `OdczytSklepu`, produkty, `kup` (wynik z nasłuchu, P1-1), przywróć, arkusz zarządzania, `nasluchuj` | `platform/__tests__/zakupy-08` (12) |
| 6 | b37e373, d950488 | moduł `modules/ochrona-tla` (Swift; koniec dokładnie raz, wyścig P1-2 poprawiony) i adapter `platform/ochronaTla.ts`; `.gitignore` (D-244) | `platform/__tests__/ochronaTla-08` (5); Swift: E2E (kompilacja), U-2 (telefon) |
| 7 | 41505ef | `data/postepExpo.ts` (adapter expo-sqlite, `errcode` z komunikatu), `plikiPostepuExpo`, `startPostepu` z ochroną tła, K-04 w `__DEV__`, `usePostep` w `_layout` (ekran błędu z ponowieniem, port w `PostepKontekst`) | `data/__tests__/postepExpo-08` (7); K-14 zachowanie zielone |
| 8 | 2acc246 | DiskSpace (E174.1, 85F4.1) w manifeście (D-238; opisy u Apple 2026-11-08); `pnpm k08` informacyjnie w `pnpm run ci` (D-243) | AK-K-08 zielony |

### Przegląd D-043 części 4 (świeży kontekst, 2026-11-08, zakres f800d22..5be9c14)
Dwa P1, oba potwierdzone u źródła i poprawione w d950488: P1-1 `kup` zwracał „zakonczony” bez transakcji (expo-iap 6.4.2 `build/index.d.ts`: „The result arrives through `purchaseUpdatedListener` / `purchaseErrorListener` …, not the return value”) → wynik z nasłuchu, 4 testy; P1-2 wyścig odczytu identyfikatora w handlerze wygaśnięcia (Swift) → identyfikator pod blokadą. Poza tym „brak uwag” (`postepExpo`, `_layout`, `dziennik`, `powiadomienia`, `app.json`, `eas.json`, `.gitignore`, `konfiguracja.ts`). Zgodnie z D-043 drugiego przeglądu nie ma.

## E2 część 4: definicja ukończenia (2026-11-08, STOP)
| Punkt | Dowód |
|---|---|
| nowe zachowania z testem czerwonym przed kodem | 7 nowych plików testów (39 testów), czerwień na asercjach po zaślepkach zgodnych z typem (fragmenty w commitach); kontrole K-07, K-09, R-56 przeniesione do `tests/kontrole` w commitach, które je zazieleniły |
| testy nieosłabione | zmiany istniejących testów z powodem: `HelpScreen.test` (atrapa dziennika zamiast Sentry; RN 0.88 `openURL` → `Promise<void>`), `engine.test` (usunięty przypadek trybu na czas, ADR 0011), usunięte testy usuniętego kodu (ADR 0011, ADR 0009) |
| mutacje (D-172) | 21 ręcznych mutantów kroków 1–7 (przed poprawkami P1); 21/21 zabitych po dopisaniu asercji „dożywotni z datą końca” (5be9c14) |
| pełny zestaw | `pnpm run ci` kod 0 (d950488): srs 21, jezyki 136, poker-core 155, domena 310, postep 61, mobile 150, content-build 124, preflop-solver 43, kontrole 8; `pnpm k08` bez braków |
| typecheck, lint | `pnpm typecheck` w `pnpm run ci` kod 0; lint: `expo lint` nieuruchamiany (kod z npm; jak w częściach 1–3) |
| `git diff --cached` | przejrzany przed każdym commitem; bez sekretów (usunięte puste pola Sentry) |
| dane: kopia bazy poprzedniej wersji | schemat `postep.db` bez zmian (migracje pakietu `postep` z testami części 1); `user.db` nieotwierana przez nowy start (ADR 0004), drizzle bez zmian (D-239) |
| zrzuty | nie wykonane: zmiany wyglądu tylko usunięcia (wejście do gry na Nauce, zakładka Reguły, karty gry i trybu na czas w Powtórkach, wiersz „gra” na karcie wskaźnika i w rozbiciu, link diagnostyki w wydaniu); ekrany przebudowuje część 5 — lista do audytu roli 04 niżej |
| E2E na SDK 58 | 42477250584 (d950488) zielone: kompilacja na symulator z modułem `ochrona-tla` 21 min 42 s, flowy 01–04 zielone w pierwszym przebiegu (ponowienie pominięte), cały przebieg 39 min; CI 42477299461 (51f8d2d, ten sam kod) zielone |

Ekrany zmienione (do audytu 04): Nauka (`(tabs)/index`), Powtórki (`(tabs)/review`), Postęp (`(tabs)/progress`), pasek zakładek (bez „Reguły”), Wskaźnik zaawansowania (`advancement`), sesja (bez licznika czasu).

### Zgłoszenia części 4
- **08-F04 → 05:** kody dziennika spoza tabeli tlo-i-bledy.md §4: `link_niedostepny`, `odczyt_nieudany`, `kontrola_k04` (D-240) — dopisać albo zastąpić.
- **08-F05 → 05:** ADR 0006 nie przewiduje karencji płatności (Trening `lib/store-native.ts`: `subscriptionStatusIOS` + `gracePeriodExpirationDate`) ani limitu czasu wywołań sklepu — decyzja, czy dodać w części 5.
- **08-F06 → 05/07:** nasłuch transakcji od startu aplikacji (Apple: „Set up a transaction listener as soon as your app launches”, cytat w Treningu `store-native.ts`) — miejsce w części 5 razem z ekranem zakupu.
- **08-F07 → 10:** `FileTimestamp` w `app.json` ma tylko `C617.1`, a manifest `expo-file-system` także `0A2A.1`, `3B52.1`; DiskSpace z powodami SDK (aplikacja sama nie czyta wolnego miejsca) — przegląd całego manifestu przed wydaniem.
- **08-F08 → 07:** pozostałości Sentry w workflowach (`iphone-local.yml` krok „Sentry”, `SENTRY_DISABLE_AUTO_UPLOAD` w `e2e-ios.yml`, `testflight.yml`) — nieszkodliwe (wtyczki brak), do usunięcia w następnej zmianie workflowów.
- **08-F09 → 04:** nieużywane klucze i18n (`play.*`, `rules.*` księgi, `review.speed*`, `advancement.game*`, `session.secondsLeft`) zostają do przebudowy ekranów (część 5).
- Stan testów akceptacyjnych: czerwone zostają ADR 0004 statyczny (D-239) i trzy testy treści 06 (KURS-003-b, KURS-005-a, CWI-005-b — czerwone także przed częścią 4).

## Punkt czyszczenia (STOP E2 części 4)
Rola 08, tryb build. Prompt: `node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build`. Plik stanu: ten plik, „Część 4”. Decyzja: D-245 (część 4 przyjęta). Następny krok: 08 część 5, E0 → STOP, w nowej sesji: ekrany na `packages/postep` (repozytoria odczytu, maszyna `aktywnosc`, testy ekranów 07 z `tests/akceptacja/ekrany`), usunięcie drizzle i `src/data/user` (K-14 statyczny zielony), podpięcie zakupów z nasłuchem od startu (08-F06), przypomnienia, ochrony tła i dziennika do `postep.db`.

# Część 5: ekrany na `packages/postep`, nowe ekrany, platforma (build, E0, 2026-11-08, STOP)

Zlecenie: D-245. Prompt: `assemble.mjs 08-programista --tryb build` (nowa sesja, opus/high). Wejście: ten plik („Część 4”), `docs/jakosc/przekazanie-08.md` (kolejność 5–6), strategia §6, §7, §9, ADR 0003, 0004, 0006, 0007, 0008, 0010, 0012, 0013, `moduly.md`, `tlo-i-bledy.md` §4, `docs/design/design-spec.md`.

## Środowisko i stan wyjściowy (50952c4)
| Sprawdź | Wynik |
|---|---|
| System | Linux, Node 22, bez Xcode; nowy kontener: `pnpm install --frozen-lockfile` kod 0 |
| GitHub | MCP (push na gałąź roboczą); `prompts` dołączone do odczytu; Trening: klon `/home/user/lkarwowski494/trening` (2e4b0f8) |
| `pnpm run ci` | kod 0: srs 21, jezyki 136, poker-core 155, domena 310, postep 61, mobile 150, content-build 124, preflop-solver 43, kontrole 8; `k08`, `i18n`, `content:check`, `tresci:rejestr` bez błędów |
| Testy ekranów 07 (`jest -c jest.akceptacja.config.js`) | 80 testów: 69 czerwonych (znacznik `NIEZAIMPLEMENTOWANE` w 7 zaślepkach), 11 zielonych (`pomoc.test.tsx` w całości) |
| `pnpm test:akceptacja:ekrany` | pada przed Jest: `tsc` — `pomoc.test.tsx:25` `mockResolvedValue(true)` wobec `openURL(): Promise<void>` (RN 0.88, skutek SDK 58 z części 4; ten sam powód co zmiana `HelpScreen.test` w części 4) → krok 0 |
| Flowy oczekujące | 05 (ocena poziomu), 06 (przerwanie sesji), 09 (limit) — do zazielenienia; 07 (scenariusz) wymaga treści scenariuszy (06), 08 (drugi język) — `content/en` (09): w części 5 zostają oczekujące |
| Zależności do dodania (5b) | `expo-sharing`, `expo-document-picker`, `expo-store-review` — brak w `apps/mobile/package.json`; Trening ma wszystkie trzy (`package.json:42,52,56`) |

## Założenia wejściowe (hipotezy)
- **Podważone czytaniem (→ 05, 08-F10):** `PlanAktywnosci` (`maszyny.ts:11–19`) nie niesie listy zadań, a sesja losuje zadania w pamięci (`features/session/build.ts:44–75`, generatory z ziarnem) — wznowienie „4 z N” (flow 06, BR-CWI-004) nie odtworzy tego samego zestawu. Rozwiązanie: D-248.
- **Podważone czytaniem (→ 05, 08-F11):** historia wskaźnika zaawansowania (`data/user/historia.ts`, `app/advancement.tsx:21`) nie ma tabeli w schemacie v1. Rozwiązanie: D-250.
- `moduly.md` „Repozytoria” wymienia `ustawienia`, `postepLekcji`, `testy`, `uprawnienia`, `dziennik` bez sygnatur — sygnatury ustala 08 w kroku, w którym repozytorium powstaje (styl `aktywnosci.ts`, `powtorki.ts`: `PortBazy` → `Wynik<…, PowodZapisu>`; odczyt z `unknown`, brak zostaje brakiem).
- design-spec „Otwarte”: ekrany poza kluczowymi (ocena poziomu, lekcja, powtórki, scenariusz, dane, pomoc, ustawienia) 08 buduje z komponentów systemu, audyt 04 po implementacji — teksty spoza design-spec piszę według „Głosu” i wypisuję do akceptacji.
- Dane z `user.db` nie są przenoszone (ADR 0004, D-124): po części 5 właściciel zaczyna od pustego postępu w `postep.db`.

## Wywołania do zmiany (zasada 4)
`userDb` / `data/user/*`: `_layout.tsx` (`useMigrations`), `(tabs)/index.tsx`, `(tabs)/progress.tsx`, `(tabs)/review.tsx`, `lesson/[id].tsx`, `session.tsx`, `advancement.tsx`, `state/settings.ts`, `features/advancement/{historia,useAdvancement,useContentChangeNotice}.ts`, testy `historia.test.ts`, `adr0011-08.test.ts`, `test-utils/userTestDb.ts`; konfiguracja: `drizzle.config.ts`, `package.json` (`drizzle-orm`, `drizzle-kit`, `db:generate`), `tsconfig.json`. 22 funkcje → repozytoria: `recordAnswer` → `zapiszKrok` (+ `zapiszPowtorke`); `saveLessonResult`, `saveExamResult` → `zakonczAktywnosc`; `markTheorySeen` → `postepLekcji.teoriaPrzeczytana`; `dueFamilies`, `nextDue`, `allCards`, `allFamilies` → `powtorki` (odczyt); `examSummaryMap`, `examDrillIdsSeen` → `testy`; `lessonProgressMap` → `postepLekcji` + `stanKursu`; `familyStats`, `streakDays`, `answerCountSince` → statystyki z `odpowiedz`/`aktywnosc`; `getSetting`, `setSetting` → `ustawienia`; `resetProgress` → `usunPostep` + `usunStareBazy`; historia → D-250.

## Plan 5a: dane i przeniesienie istniejących ekranów (cięcie pionowe; każdy krok: czerwień z właściwego powodu → kod → `pnpm run ci` → commit)
| Krok | Zachowanie | Test (czerwony przed) | Pliki |
|---|---|---|---|
| 0 | `pomoc.test.tsx` kompiluje się na RN 0.88 (D-254) i jako zielony idzie do `apps/mobile` (D-175) — zmiana struktury | `pnpm test:akceptacja:ekrany` (`tsc` kod 0) | `tests/akceptacja/ekrany/pomoc.test.tsx` → `apps/mobile/src/features/help/__tests__/` |
| 1 | `ustawienia`: odczyt klucza z JSON (`unknown` → wartość albo `null`; zły JSON → błąd typowany), zapis UPSERT z `zmieniono_ms`, inne klucze nietknięte | nowy `packages/postep/test/ustawienia.test.ts` (node:sqlite, `enableForeignKeyConstraints: false`) | `packages/postep/src/ustawienia.ts` |
| 2 | `postepLekcji`: „teoria przeczytana” UPSERT bez nadpisania `ukonczono_ms` i `miejsce`; odczyt faktów kursu (`ukonczoneLekcje`) | `test/postepLekcji.test.ts` (pola spoza zapisu przed = po) | `src/postepLekcji.ts` |
| 3 | `aktywnosci`: `zacznijAktywnosc` (INSERT z planem, `z_limitu`, dniem i strefą), `aktywnoscWToku(rodzaj)`, `odpowiedziAktywnosci`, `zakonczAktywnosc` (stan, `koniec_ms`, `wynik_testu`, `postep_lekcji.ukonczono_ms` w jednej transakcji), `porzucAktywnosc`, `zuzyteDzis(dzien)`; plan z listą zadań (D-248) | `test/aktywnosci-08.test.ts`: błąd w środku zakończenia nic nie zapisuje; wznowienie na nowym porcie tego samego pliku wraca do `krok`; zużycie liczy tylko `z_limitu = 1` danego dnia (także zakończone i porzucone) | `src/aktywnosci.ts`, `packages/domena/src/maszyny.ts` (typ planu) |
| 4 | odczyty: `powtorki` (karty do terminu, następny termin, wszystkie), `testy` (wyniki per moduł, zadania widziane w testach), statystyki postępu (rodziny, seria dni z `aktywnosc.dzien_lokalny`, D-251) | `test/odczyty-08.test.ts` (pusta baza, granica terminu = teraz, złe wiersze → błąd) | `src/powtorki.ts`, `src/testy.ts`, `src/statystyki.ts` |
| 5 | `uprawnienia` (pamięć dostępu: zastąpienie w transakcji, odczyt jako `Pamiec`) i `dziennik` (wpis + przycięcie do `DZIENNIK_MAKS_WPISOW` w tej samej transakcji, ostatnie wpisy) | `test/uprawnienia-dziennik-08.test.ts` | `src/uprawnienia.ts`, `src/dziennik.ts` |
| 6 | ekrany na nowych repozytoriach, po jednym: ustawienia interfejsu (`state/settings.ts`, D-251), Nauka i lekcja (`stanKursu`), sesja (lekcja, ćwiczenia, powtórki, test jako `aktywnosc`: `wejscieDoAktywnosci` → `startAktywnosci` → `zapiszKrok` na każdą odpowiedź → zakończenie; wznowienie z `aktywnoscWToku` + `odpowiedziAktywnosci`), Powtórki, Postęp, wskaźnik (D-250); oceny starego silnika → cztery stopnie (D-249) | testy RNTL ekranów z atrapą portu na `node:sqlite` tam, gdzie zapis (sesja: odpowiedź zapisana przed „Dalej”, wznowienie od kroku); istniejące testy `drills`, `session`, `advancement` zielone | `apps/mobile/src/app/**`, `state/settings.ts`, `features/advancement/*` |
| 7 | usunięte `drizzle-orm`, `drizzle-kit`, `drizzle/`, `drizzle.config.ts`, `src/data/user/`, `test-utils/userTestDb.ts`; `_layout` bez `useMigrations` | ADR 0004 statyczny (`tests/akceptacja/postep/k14…`) czerwony → zielony, przeniesiony (D-224); K-14 zachowanie zielone | `apps/mobile/**`, lockfile |
| 8 | E2 5a: mutacje (D-172), przegląd D-043 (`packages/postep/`, `apps/mobile/src/data/`), jeden push kodu → E2E 01–04 (dowód przeniesienia na symulatorze) | — | — |

Stan przejściowy 5a (nazwany): limit liczony i zapisywany (`z_limitu`), ale bez blokady startu i bez ekranu zakupu do 5b; bez wydania między częściami (próg z `CLAUDE.md`).

## Plan 5b: nowe ekrany i platforma
| Krok | Zachowanie | Test (czerwony przed) | Pliki |
|---|---|---|---|
| 1 | (zależnie od P-2) moduł motywu z `docs/design/tokeny.ts` (201 użyć `useTokens`), zakładka „Dziś” z `BlokLekcji` i identyfikatorami `dzis-*` | istniejące testy ekranów; `i18n` | `src/theme/`, `(tabs)/*` |
| 2 | 8 komponentów z kontraktem 07, po jednym (zaślepka → render minimalny → czerwień na asercji → kod → test do `apps/mobile`, D-175): `StopienOceny`, `EkranPowitania`, `EkranyOceny`, `EkranStartu`, `EkranZakupu`, `EkranUstawien`, `EkranDanych`, `Opinie` | `tests/akceptacja/ekrany/*` (69 czerwonych) | `src/features/{ocena,powitanie,ocena-poziomu,start,zakup,ustawienia,dane,opinie}/` |
| 3 | pierwsze uruchomienie: powitanie → ocena poziomu (`aktywnosc` `ocena_poziomu`, „Pomiń” → M0) → `punkt_startu` → „Dziś” | flow 05 | `_layout`, trasy |
| 4 | start z limitem: `EkranStartu` przed sesją, powtórkami i testem; wyczerpany limit → `EkranZakupu` jako stan przepływu; sklep z karencją i limitem czasu (D-246), nasłuch transakcji od startu aplikacji, `decyzja` + pamięć `uprawnienia` (D-247) | `platform/__tests__/zakupy-08` (karencja, przekroczony czas → `{ ok: false }`); flowy 06, 09 | `platform/zakupy.ts`, `_layout`, trasy |
| 5 | Ustawienia: zarządzanie, przywróć, pomoc, „Usuń postęp” (`usunPostep` + `usunStareBazy`), dane (eksport i import: `expo-sharing`, `expo-document-picker`, kopia przed importem), opinie (`expo-store-review`, `czyProsicOOcene`), przypomnienie (D-252), język (`ustawienia-jezyk`, ADR 0014) | testy ekranów 07 + adapter plików (atrapa modułów); K-08, K-09 po nowych zależnościach (D-253) | `platform/pliki.ts`, `platform/opinie.ts`, trasa ustawień, `app.json` |
| 6 | dziennik do tabeli `dziennik` (pierścień w pamięci do otwarcia bazy), „Zgłoś błąd w tym zadaniu” | `platform/__tests__/dziennik-08` rozszerzony | `platform/dziennik.ts` |
| 7 | flowy 05, 06, 09 → `apps/mobile/e2e/`; 01–04 z `za-powitaniem`; limit czasu `e2e-ios.yml` z liczby flowów (`tests/narzedzia/e2e-flowy.test.mjs`) | E2E | `apps/mobile/e2e/`, `.github/workflows/e2e-ios.yml` |
| 8 | E2 5b: mutacje, przegląd D-043 (`src/platform/`, `src/data/`, `app.json`, workflow), push → E2E 01–06, 09 | — | — |

## Decyzje dla właściciela (zakres i kolejność prac)
**P-2: gdzie wdrożyć system wyglądu roli 04** (tokeny `docs/design/tokeny.ts`, `Stol`, `PasekStrategii`, `SkalaStopni`, `BlokLekcji`, zakładka „Dziś”; dziś kod używa starego `theme/tokens.ts` i `TableFelt`).
- A: cały system w części 5 (5b). Każdy ekran budowany raz w docelowym wyglądzie; +ok. 10–14 h, największy diff i audyt 04 naraz.
- **B (rekomendacja): tokeny i „Dziś” w 5b, `Stol`, `PasekStrategii`, `SkalaStopni` (ekran decyzji w sesji) w części 6.** Nowe ekrany powstają od razu na tokenach systemu (zasada 15), a ekran decyzji — najbardziej złożony — dostaje osobny krok ze zrzutami i porównaniem z `wzorce-zrzuty/`. Kompromis: +ok. 4–6 h w 5b, ekran sesji zmieniany dwa razy (dane w 5a, wygląd w 6).
- C: cały system w części 6. Najmniejsza część 5, ale 8 nowych ekranów zbudowanych na starych tokenach (poza systemem 04) i przerabianych w 6.

**P-3: jedna część czy dwie bramki.** A (rekomendacja): 5a i 5b z osobnym E2, przeglądem D-043 i E2E — po 5a dowód, że przeniesione ekrany działają na symulatorze, zanim dojdą nowe; punkt czyszczenia między nimi. B: jedna część 5 z jednym E2 — mniej przerw, ale ok. 25–30 h w jednym przebiegu i jeden przegląd dla dwóch ścieżek wrażliwych naraz.

## Decyzje techniczne (A, do weta; zapis D-246–D-255)
- **D-246 (08-F05)** karencja płatności i limit czasu wywołań sklepu jak w Treningu: `store-native.ts:38–39` (limit czasu, `products.ts:46` 15000 ms) i `:64–78` (`subscriptionStatusIOS` → `gracePeriodExpirationDate` jako koniec dostępu); `expo-iap` 6.4.2 ma oba pola (`src/modules/ios.ts`, odczyt 2026-11-08). Przekroczony czas → `{ ok: false }` (pamięć bez zmian, D-209); `SKLEP_LIMIT_CZASU_MS` w `konfiguracja.ts`. Bez zmiany `OdczytSklepu` i ADR 0006 (zgłoszenie informacyjne do 05).
- **D-247 (08-F06)** nasłuch transakcji od startu aplikacji jak Trening `entitlement.ts:74–79`: po otwarciu `postep.db` pamięć dostępu → nasłuch → odświeżenie; ekran zakupu bierze wynik z tego samego nasłuchu.
- **D-248 (08-F10 → 05)** `PlanAktywnosci` dostaje opcjonalne `zadania: { id, ziarno }[]` (kolumna `plan` to JSON — schemat v1 bez zmian); wznowienie buduje te same zadania. Wzór: Trening `lib/state/core.ts:83` (aktywny trening zapisywany w całości jako JSON). Odrzucone: samo ziarno losowania (zestaw zmienia się z treścią), nowa tabela (migracja v2).
- **D-249** oceny starego silnika → stopnie schematu: `correct` → `zgodne`, `acceptable` → `dopuszczalne`, `close` → `niedokladnosc`, `size` i `wrong` → `blad`; `zaliczona` z obecnego `isPass` (B-017). Jedna funkcja w `features/drills`; słowa stopni dalej otwarte (D-213, 04/06).
- **D-250 (08-F11 → 05)** historia wskaźnika w `ustawienie` pod kluczem `historia_wskaznika` (JSON, najwyżej `HISTORY_DAYS` dni), bez zmiany schematu; odrzucone: nowa tabela (migracja v2 dla funkcji pomocniczej), usunięcie historii (zmiana produktu). Wzór: Trening trzyma stan pomocniczy jako JSON w tabeli klucz–wartość `kv` (`entitlement.ts:84`).
- **D-251** ustawienia interfejsu jako klucze `cztery_kolory`, `haptyka` (JSON boolean; domyślne z modułu konfiguracji — preferencja interfejsu); seria dni = kolejne dni lokalne z `aktywnosc.dzien_lokalny` z co najmniej jedną odpowiedzią (dotąd z czasu odpowiedzi w `user.db`).
- **D-252** przypomnienie: przełącznik z porą z `PRZYPOMNIENIE_DOMYSLNA_PORA` = 08:00 jak Trening `planReminder.ts:13` (stała godzina, bez wyboru), jedno zdanie przed prośbą systemu (F-11); bez nowej zależności natywnej do wyboru godziny. Pora i tekst do potwierdzenia przez 04 (zgłoszenie).
- **D-253** nowe zależności 5b: `expo-sharing`, `expo-document-picker`, `expo-store-review` w wersjach z `bundledNativeModules.json` SDK 58 (D-237), jak w Treningu; K-08 i K-09 po dodaniu.
- **D-254** `pomoc.test.tsx`: `mockResolvedValue(undefined)` zamiast `true` (RN 0.88 `openURL(): Promise<void>`), jak `HelpScreen.test` w części 4; asercje bez zmian; zgłoszenie do 07.
- **D-255** wejście „Scenariusz” na „Dziś” tylko, gdy treść ma scenariusze (dziś 0) — bez pustego stanu bez projektu; flow 07 czeka na treść 06, flow 08 na `content/en` (09).

## Szacunek (zasada 9)
Agent: 5a ok. 10–13 h (sesja i wznowienie najbardziej niepewne), 5b ok. 12–16 h przy P-2 = B (A: +6–8 h; C: −4 h), część 6 (przy B) ok. 6–8 h. Czekanie: E2E ok. 40 min po każdym pushu kodu (0 USD, repo publiczne), przegląd D-043 ok. 10 min na część. Właściciel: P-2, P-3; po 5b telefon: U-2 (ochrona tła), U-5 (zakupy w piaskownicy), przejście PR-01–PR-09.

## Punkt czyszczenia (STOP E0 części 5)
Rola 08, tryb build. Prompt: `node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build`. Plik stanu: ten plik, „Część 5”. Decyzje: P-2, P-3, D-246–D-255 (do weta). Następny krok: E1 5a kroki 0–8.
Decyzja: D-256 (P-2 = B, P-3 = dwie bramki, D-246–D-255 przyjęte; E1 5a w tej sesji).

## E1 część 5a: wynik (2026-11-08; plan przyjęty D-256)
| Krok | Commit | Zachowanie | Testy (czerwone przed kodem → zielone) |
|---|---|---|---|
| 0 | cfed44b | `pomoc.test.tsx` do `apps/mobile` (D-254), narzędzia testów ekranów do `src/test-utils/ekrany/` | `test:akceptacja:ekrany` kompiluje się (było: TS2345) |
| 1 | 908559c | repozytorium `ustawienia` | `ustawienia-08` 4/5 → 5/5 |
| 2 | 1af774f | repozytorium `postepLekcji` | `postepLekcji-08` 3/4 → 4/4 |
| 3 | 67eaba7 | `aktywnosci`: start (z porzuceniem), w toku, odpowiedzi, zakończenie w jednej transakcji, zużycie dnia; powtórka w transakcji odpowiedzi; `PlanAktywnosci.zadania` (D-248) | `aktywnosci-08` 12/12 → 12/12, `plan-zadania-08` 2/3 → 3/3 |
| 4 | e2da481 | odczyty: karty, testy, statystyki rodzin, wyniki lekcji, seria dni | `odczyty-08` 8/8 → 8/8 |
| 5 | 509c66e | `uprawnienia` (pamięć), `dziennik` | `uprawnienia-dziennik-08` 7/8 → 8/8 |
| 6 | c1e0f6c | ekrany na `postep.db`: sesja jako aktywność ze wznowieniem (te same zadania z planu), Nauka, Powtórki, Postęp, wskaźnik (D-250), lekcja, ustawienia interfejsu (D-251), „Usuń postęp” z `user.db*`; zegar (D-257); D-249 | `aktywnoscSesji-08`, `odtworzenie-08`, `ocena-schematu-08`, `zegar-08`, `settings-08`, `podsumowania-08`, `usunPostep-08`, `historia`; strażnik `odtworzenie-tresc-08` |
| 7 | e750655 | usunięte drizzle, `drizzle/`, `src/data/user`, `userTestDb`, `babel-plugin-inline-import` | ADR 0004 statyczny czerwony (4 pliki) → zielony; `k14-stare-bazy` do `packages/postep/test` |
| P1 | 5d8589e | wznowienie z zadaniem wymagającym zakresów (przegląd D-043) | 2 testy czerwone → zielone |
| D-172 | b64a345 | 30 ręcznych mutantów: 25 zabitych, 4 dopisane przypadki → 30/30 | — |

Stan przejściowy (nazwany w planie): start aktywności bez limitu (`bezLimitu`) i bez ekranu zakupu do 5b; `z_limitu` = 0.

### Przegląd D-043 części 5a (świeży kontekst, 2026-11-08, zakres 50952c4..e750655)
Jedno P1, potwierdzone czytaniem kodu: `wznow` wołał `odtworzZestaw` bez kontekstu zakresów (malowanie, `rangeDecision` → wyjątek „Brak zakresu”), `zaladuj` bez `catch` → pusty ekran i aktywność na zawsze w toku. Poprawione w 5d8589e (kontekst w `WejscieSesji`, wyjątek przy odtwarzaniu → nowa aktywność, `catch` → komunikat z ponowieniem), test odtwarzający przed poprawką czerwony. Poza tym „brak uwag”. Drugiego przeglądu nie ma (D-043).

## E2 część 5a: definicja ukończenia (2026-11-08, STOP)
| Punkt | Dowód |
|---|---|
| nowe zachowania z testem czerwonym przed kodem | 15 nowych plików testów; czerwień na asercjach po zaślepkach zgodnych z typem (fragmenty w commitach); `dzien-lokalny-08` i `historia` — czerwień sprawdzona zaślepką po kodzie (nazwane w commitach) |
| testy nieosłabione | `pomoc.test.tsx`: `mockResolvedValue(undefined)` (D-254); `historia.test.ts` zastąpiony (ta sama reguła dnia na nowym zapisie, D-250); `k14-stare-bazy` przeniesiony bez zmian poza importami; w moich testach: zbiór zamiast kolejności usuwanych plików (kolejność ustala pakiet) i stany po id |
| mutacje (D-172) | 30/30 zabitych po dopisaniu 4 przypadków |
| pełny zestaw | `pnpm run ci` kod 0 (b64a345): srs 21, jezyki 136, poker-core 155, domena 314, postep 105, mobile 199, content-build 124, preflop-solver 43, kontrole 8; `i18n` 0 błędów (314 kluczy) |
| akceptacja | domena: czerwone tylko 3 testy treści 06 (KURS-003-b, KURS-005-a, CWI-005-b); ekrany: 69 czerwonych (8 komponentów — 5b) |
| typecheck, lint | `pnpm typecheck` w `pnpm run ci` kod 0; `expo lint` nieuruchamiany (kod z npm, jak w częściach 1–4) |
| `git diff --cached` | przejrzany przed każdym commitem; bez sekretów |
| dane: kopia bazy poprzedniej wersji | schemat `postep.db` bez zmian (v1); `user.db*` nieotwierane, usuwane tylko przez „Usuń postęp” (K-14 zielony); dane z buildów 1005–1008 nieprzenoszone (ADR 0004, D-124) |
| zrzuty | brak (Linux bez symulatora); zmiany widoczne: komunikaty błędu odczytu i zapisu, brak ekranu błędu migracji drizzle — do audytu 04 po 5b |
| E2E | 42485850361 (b64a345): kompilacja na symulator 28 min 46 s (część 4: 21 min 42 s), flowy 01–04 zielone w pierwszym przebiegu (ponowienie pominięte, krok „Wynik E2E” zielony, flowy 12 min 50 s); przebieg oznaczony „cancelled”: limit joba 42 min (20 + 3 × 4 + 10) minął w kroku sprzątania (zapis pamięci podręcznej pnpm po wyniku) — klasyfikacja §7 pkt 5: maszyna/limit, nie aplikacja (08-F14). CI 42485850347: `check` i `rachunki` zielone; `akceptacja` czerwone zgodnie z D-175 (testy oczekujące: 3 treści 06 + 69 ekranów 5b) |

Nowe teksty (do akceptacji 04/06, „Głos”): `postep.odczytNieudany`, `postep.ponow`, `session.saveFailed`, `session.saveNoSpace`, `progress.resetFailed`.

### Zgłoszenia części 5a
- **08-F10 → 05:** `PlanAktywnosci.zadania` (D-248) — dopisać do `moduly.md` „Maszyny stanów”.
- **08-F11 → 05:** historia wskaźnika w `ustawienie` (`historia_wskaznika`, D-250) — dopisać do listy kluczy ustawień.
- **08-F12 → 07:** wzorzec bazy `tests/narzedzia/wzorzec-bazy.ts` ma plany aktywności w kształcie innym niż `PlanAktywnosci` (`{"scenariusz":"s01"}`, `{"zadania":["z1"]}`); odczyt takiego wiersza daje `odczyt_nieudany` (test `aktywnosci-08`) — wyrównać wzorzec z kontraktem.
- **08-F14 → 07 (CI):** limit czasu `e2e-ios.yml` bez zapasu — build 28 min 46 s (+7 min wobec części 4) i 4 flowy zjadły 42 min, anulowanie w sprzątaniu po wyniku; przy 5b (+3 flowy, +9 min limitu) ryzyko anulowania przed wynikiem. Propozycje: stały składnik 20 → 30 min albo pamięć podręczna `ios/build`/Pods; decyzja 07 (zmiana workflow = przegląd D-043).
- **08-F13 → 07:** `tests/akceptacja/ekrany/pomoc.test.tsx` nie kompilował się po SDK 58 (RN 0.88 `openURL`) — poprawione D-254; `test:akceptacja` poza `pnpm run ci` nie wyłapał tego w części 4.

## Punkt czyszczenia (STOP E2 części 5a)
Rola 08, tryb build. Prompt: `node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build`. Plik stanu: ten plik, „Część 5”. Decyzja: D-258 (5a przyjęta). Następny krok: E1 5b w nowej sesji — krok 0: limit `e2e-ios.yml` (08-F14, D-258), potem tokeny i „Dziś”, 8 ekranów 07, limit i zakup (D-246, D-247), ustawienia, dziennik w bazie, flowy 05, 06, 09.

## E1 część 5b: stan w toku (2026-11-08; plan przyjęty D-256, krok 0 z D-258)
| Krok | Commit | Zachowanie | Testy (czerwone przed kodem → zielone) |
|---|---|---|---|
| 0 | 8677182 | `e2e-ios.yml`: limit joba 30 + 3n + 10 (4 flowy → 52) | `e2e-flowy` 52 ≠ 42 → zielony |
| 1a | 51806f9 | moduł motywu z `docs/design/tokeny.ts` (kopia 1:1), 22 ekrany na tokenach 04, wyjątki do części 6 w `tk.przejsciowe` (D-259) | `motyw-08` 5/8 czerwonych → 8/8; mutacja jednej barwy zabita |
| 1b, 2 | f65dcec | „Dziś”: `BlokLekcji` (`dzis-lekcja`), `dzis-cwiczenia`, `dzis-powtorki`, wszystkie lekcje; `czytajFaktyKursu`; sesja ćwiczeń (`practice` → rodzaj `sesja`, D-260); `EkranStartu`; `terms.yaml` skip (D-261) | `widok-08` 5/6, `BlokLekcji-08` 2/2, `faktyKursu-08` 7, `praktyka-08` 2/4, `start.test` 17/20 → zielone |
| 2 | 767fb4a | `StopienOceny`, `EkranPowitania`, `EkranyOceny`, `EkranZakupu`, `EkranUstawien` (+ `sekcje`, D-262), `EkranDanych`, `Opinie` | 07: 1/1, 13/13, 12/12, 16/17, 5/6 czerwonych → zielone, przeniesione do `apps/mobile` (D-175); `tests/akceptacja/ekrany` pusty |
| 3 | c3c1842 | pierwsze uruchomienie: bramka w `_layout` (stan nad nawigacją, wzór Treningu `app/_layout.tsx:38–73`), powitanie → ocena poziomu (`ocena_poziomu`, 8 pytań z puli 06, bez kart) → `punkt_startu` → „Dziś”; „Pomiń” → M0 i porzucona; przerwana → od pierwszego pytania bez powitania; reguła wyniku D-264; `EkranPytaniaOceny.stol` (D-265) | `ocenaPoziomu-08` 12/13 → 13/13; `PierwszeUruchomienie-08` (czerwień zaślepką po kodzie: 3/4) → 4/4; strażnik `ocenaPoziomu-tresc-08` 10/10 |
| 4 | 03c704e | `przygotujStart` (wznowienie od razu; lekcja i pierwszy test bez ekranu; sesja, powtórki, test powtórny → `EkranStartu`; wyczerpany → `EkranZakupu` w trasie sesji; limit zawsze liczony, D-267); „Zamknij” → „Zakończ” (porzuca); sklep: karencja + `SKLEP_LIMIT_CZASU_MS` (D-246); `state/dostep.ts`: pamięć → nasłuch → odczyt → decyzja → pamięć, start w `_layout` (D-247); adresy zakupu (D-266) | `zakupy-08` 3 czerwone → 17/17; `dostep-08` 5/5 → 5/5; `wejscieStartu-08` 6/7 → 7/7 |
| 7 (część) | 1dd4354 | flowy 01–04 z `wspolne/za-powitaniem.yaml` (podprzepływ przeniesiony z `oczekujace/wspolne/` do `e2e/wspolne/`, oczekujące wołają `../wspolne/`); flow 01: „Zamknij” → „Zakończ” (słownik 04, D-267) | `e2e-flowy`, `workflowy` zielone; E2E po pushu |

`pnpm run ci` kod 0 (767fb4a): mobile 297 (było 199), domena 314, postep 105, content-build 124; `i18n` 0 błędów (404 klucze). Ostrzeżenia `act(...)` w `dane.test.tsx` (asynchroniczny `setState` po akcji; testy 07 nie czekają na końcowy stan) — do 07 przy E2.

**Zostaje (kroki 5–8):** 5 trasa ustawień (ikona na „Dziś”, `testID` `ustawienia`) z `EkranUstawien` + sekcje: `EkranDanych` (adapter plików: eksport `expo-sharing` przez plik w cache `expo-file-system`, import `expo-document-picker` → `walidujEksport` → kopia `kopiaBazy` → `importuj`; zależności z `bundledNativeModules.json` SDK 58: `expo-sharing` ~58.0.22, `expo-document-picker` ~58.0.4, `expo-store-review` ~58.0.2 — `pnpm install --lockfile-only`, potem `--frozen-lockfile`; K-08, K-09), `Opinie` (id sklepu i adres kontaktowy [DO USTALENIA] rola 10), prośba o ocenę `czyProsicOOcene` na podsumowaniu sesji (`expo-store-review`), przypomnienie (D-252, `PRZYPOMNIENIE_DOMYSLNA_PORA` 08:00 do `konfiguracja.ts`, adapter `powiadomieniaExpo` gotowy), język: wiersz `ustawienia-jezyk` → `Linking.openSettings()` jak Trening `app/more/language.tsx:21` (język aplikacji w Ustawieniach iOS; ADR 0014 pkt 3 `auto`) — do decyzji w E1, flow 08 i tak oczekujący; przenieść z „Postępu” przełączniki i „Usuń postęp” (`usunCalyPostep`); „Pomoc” zostaje też w „Postępie” (flow 04); 6 dziennik do tabeli (`zapiszWpisDziennika`, pierścień w pamięci do otwarcia bazy) + `ZglosBlad` pod oceną zadania w sesji; 7 flowy 05, 06, 09 → `apps/mobile/e2e/` (zmienić `../wspolne/` na `wspolne/`), limit `e2e-ios.yml` 30 + 3n + 10 (n = 7 → 61 min), `e2e-flowy.test.mjs`; 8 E2 (mutacje D-172 w osobnym worktree, przegląd D-043: `src/platform/`, `src/data/`, `src/state/dostep.ts`, `packages/domena/src/konfiguracja.ts`, `app.json`, `.github/workflows/e2e-ios.yml`; jeden push kodu → E2E 01–06, 09) → STOP.

**Zgłoszenia nowe (do raportu E2):** 08-F15 → 04: kolory talii czterokolorowej poza tokenami (D-259); 08-F16 → 04: promienie `BlokLekcji` z makiety (28/22) bez tokenu, użyte `promien.sukno` i wcięcie; lista modułów na „Dziś” pod „Wszystkie lekcje” (makieta bez miejsca na mapę kursu); 08-F17 → 06: `terms.yaml` skip „sesja ćwiczeń” (D-261); 08-F18 → 05/07: `EkranUstawien.sekcje` (D-262). 08-F19 → 01/03/06: BR-ONB-001 „pytania o poziom i cel” i BR-ONB-002-a „zaznaczył, że nie zna zasad” — pula 06 ma tylko pytania z egzaminów; bez pytania o cel i samooceny (D-264: brak poprawnych → M0, „Pomiń” → M0); 08-F20 → 10/właściciel: adres polityki prywatności (D-266; bloker publikacji w App Store); 08-F21 → 07: brak testu ekranu sesji (`session.tsx`: start, zakup, „Zakończ”) — logika w `wejscieStartu`, `dostep`, zachowanie ekranu tylko w E2E (06, 09). Nowe teksty do akceptacji 04/06: `session.end` („Zakończ”, ze słownika), `today.*`, `start.*`, `grade.*`, `welcome.*`, `placement.*`, `purchase.*`, `settings.*`, `data.*`, `feedback.*`.

Zestawienie 08-F15–F29 (rola, miejsce, stan, waga): [`zgloszenia-08.md`](zgloszenia-08.md).

## Punkt czyszczenia (w trakcie E1 5b, po krokach 3–4)
Rola 08, tryb build. Prompt: `node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build`. Plik stanu: ten plik, „E1 część 5b: stan w toku”. Decyzje D-264–D-267 (A, do weta). Następny krok: E1 5b kroki 5–8 w nowej sesji; najpierw wynik E2E pushu z krokami 3–4 (flowy 01–04 z powitaniem). Powód przerwy: duży kontekst sesji (zasada 19).

## E1 część 5b: kroki 5–8 (2026-11-08; nowa sesja po D-268)
Stan wyjściowy (4b17657): `pnpm run ci` kod 0 (mobile 341, domena 314, postep 105). E2E pushu 1dd4354: przebieg 42506064931 (wynik niżej).

| Krok | Commit | Zachowanie | Testy (czerwone przed kodem → zielone) |
|---|---|---|---|
| 5 | 21112fc | trasa `settings` (ikona ⚙︎ na „Dziś”, `testID` `ustawienia`): `EkranUstawien` + sekcje (D-262): wyświetlanie (przełączniki z „Postępu”), przypomnienie (D-252, `PRZYPOMNIENIE_DOMYSLNA_PORA` 08:00), Dane, Język (`ustawienia-jezyk`), Pomoc, „Przywróć zakupy”, „Zarządzaj subskrypcją” tylko przy subskrypcji, „Usuń postęp” (`usunCalyPostep` → ustawienia → odtworzenie przypomnienia); trasa `data` (port `utworzDaneEkranu`: eksport → arkusz, `ostatni_eksport`; import: wybór → `walidujEksport` → `VACUUM INTO` w katalogu tymczasowym → `importuj` → usunięcie kopii; adapter `platform/pliki.ts`); trasa `language` (D-269); odtworzenie przypomnienia i język przy starcie; prośba o ocenę na podsumowaniu lekcji i sesji (`expo-store-review`); „Opinie” ukryte bez ID i adresu (D-270); zależności D-253 | `ustawieniaAplikacji-08` 11/11 + 1 → 12/12, `przeniesienie-08` 7/7 + 2/2 → 9/9, `pliki-08` 5/6 → 6/6, `prosbaOOcene-08` 2/3 → 3/3, `przypomnienie-08` 5/6 → 6/6; `trasaUstawien-08` po kodzie, czerwień zaślepką (2/3) |
| 6 | 4a5939b | `podlaczDziennik`: wpisy sprzed otwarcia bazy i kolejne do tabeli `dziennik` (przycięcie w transakcji), bez duplikatów po ponownym podłączeniu, bez pętli przy błędzie; „Zgłoś błąd w tym zadaniu” pod oceną (ukryte bez adresu, D-270) | `dziennik-08` +4 (3 czerwone; „bez pętli” zielony na zaślepce, nazwane) → 8/8 |
| 7 | f8d1c32 | flowy 05, 06, 09 → `apps/mobile/e2e/`; `e2e-ios.yml` limit 61 (30 + 3 × 7 + 10); `testflight.yml` czekanie bramki 76 × 60 s, limit 81 | `e2e-flowy` 61 ≠ 52 → zielony; `workflowy` (czekanie ≥ limit + 15) czerwony → zielony; `e2e-ponowienia` oczekiwana liczba flowów 4 → 7 (powód w commicie) |
| D-172 | 98d11a2 | 22 ręczne mutanty kroków 5–6: 19 zabitych; dopisane M10 (drugi zapis importu bez walidacji), M16 (odmowa po włączeniu zapisuje „wyłączone”) → zabite; M21 równoważny (tabela przycinana w transakcji wpisu) | 21/22 zabitych, 1 równoważny |

**Odstępstwa i decyzje:** D-269 (język: ekran w aplikacji zamiast `Linking.openSettings()`), D-270 (ID sklepu i adres poczty `[DO USTALENIA]`; sekcja „Opinie” i „Zgłoś błąd” ukryte; „skończone prace”; „Zarządzaj subskrypcją”; kopia przed importem; bez wtyczek w `app.json`). Przełączenie bazy treści po zmianie języka w trakcie działania: z drugim językiem treści (rola 09).

**Zgłoszenia nowe:** 08-F22 → 04: ikona ustawień na „Dziś” jako znak ⚙︎ (system bez komponentu ikony; makieta e3 ma SVG); 08-F23 → 10/właściciel: App Store ID i adres poczty do opinii i zgłoszeń (D-270) — bez nich „Oceń w sklepie”, „Napisz do nas” i „Zgłoś błąd w tym zadaniu” są ukryte. Nowe teksty do akceptacji 04/06: `settings.display`, `settings.reminder*`, `settings.general`, `settings.language`, `settings.restored`, `reminder.title`, `reminder.body`, `language.*`, `progress.more`; usunięte nieużywane `progress.settings`, `progress.reset*`, `progress.cancel`.

Zestawienie 08-F15–F29 (rola, miejsce, stan, waga): [`zgloszenia-08.md`](zgloszenia-08.md).

### Przegląd D-043 części 5b (świeży kontekst, 2026-11-08, zakres b64a345..98d11a2, ścieżki wrażliwe)
„Brak uwag”. Rozważone i odrzucone przez recenzenta jako poniżej P1: utrata zwalidowanego pliku importu przy odświeżeniu ekranu między wyborem a potwierdzeniem (wynik `blad_zapisu`, baza nietknięta — teoretyczne); kolejność odświeżeń dostępu w `startDostepu` (ten sam sklep — teoretyczne); zawieszone `initConnection` do restartu (decyduje pamięć — brzegowe). Drugiego przeglądu nie ma (D-043).

### E2E części 5b: przebieg 42508961244 (7c6a3bd) — czerwony, 4/7 (2026-11-08)
Build 23 min 52 s, flowy 21 min 54 s. Zielone: 03 Słowniczek, 04 Pomoc, 05 Ocena poziomu. Czerwone w pierwszym przebiegu i w ponowieniu (powtarzalne → §7: flow/aplikacja, nie maszyna). Przebiegi 6632986 i 1dd4354 anulowane, więc przebudowa „Dziś” z kroku 1b (f65dcec) przeszła przez E2E pierwszy raz dopiero tutaj.
| Flow | Błąd Maestro | Przyczyna | Stan |
|---|---|---|---|
| 01 Lekcja i pierwsze zadanie | `Id matching regex: lesson-m0.l1` nie znaleziony | lista lekcji na „Dziś” (`(tabs)/index.tsx:138`, `testID` `lesson-<id>`) leży pod `BlokLekcji`, grupą ćwiczeń i kartą wskaźnika — poza ekranem; `tapOn` nie przewija | potwierdzone czytaniem kodu |
| 09 Limit dnia | jw. (`lesson-m0.l1` po „Wróć do lekcji”) | jw. | potwierdzone czytaniem kodu |
| 02 Powtórki | `"Nic nie czeka na powtórkę.*" is visible` fałsz | `tapOn: 'Powtórki'` trafia w wiersz „Powtórki” na „Dziś” (`today.reviews` = `tabs.review` = „Powtórki”, `dzis-powtorki`) zamiast w zakładkę → sesja powtórek zamiast ekranu zakładki | potwierdzone tekstami w `pl.json`; które dopasowanie wybiera Maestro — `[DO USTALENIA]` |
| 06 Przerwanie sesji | `Text matching regex: Dalej` nie znaleziony (po `option-0` w sesji ćwiczeń) | hipoteza: przycisk „Dalej” pod wyjaśnieniem ze stołem poza ekranem; do sprawdzenia w artefakcie `e2e-wyniki` (zrzuty, niedostępne z kontenera — właściciel albo podgląd w Actions) | hipoteza |

Propozycja naprawy (następna sesja, jeden push → E2E): 01 i 09 — `scrollUntilVisible: { element: { id: 'lesson-m0.l1' }, direction: DOWN }` przed `tapOn` (zmiana struktury flowu po przebudowie „Dziś”, jak „Zamknij” → „Zakończ”); 06 i 01 — `scrollUntilVisible` dla „Dalej” przed `tapOn`; 02 — rozróżnienie zakładki od wiersza: opcje (A, rekomendacja) zakładka po `tapOn` z `index` (sprawdzić w hierarchii Maestro, które dopasowanie jest zakładką) albo (B) zgłoszenie do 04 (08-F24): ten sam tekst „Powtórki” dla wiersza na „Dziś” i zakładki — dwa różne cele pod jedną nazwą; zmiana tekstu to decyzja 04. Bez zmiany asercji o zachowaniu.

### Naprawa flowów po 42508961244 (2026-11-08, D-271)
Wzór Treningu (D-191, odczyt 2026-11-08, `2e4b0f8`): `scrollUntilVisible … centerElement: true` przed `tapOn` (`.maestro/07-zamiana.yaml:75`); zakładka odróżniana własną etykietą dostępności (`app/(tabs)/_layout.tsx:18`) — u nas identyfikator (`testID` zakładki), bez zmiany tekstu VoiceOver. Maestro 2.11.0 (`e2e-ios.yml:39`): `scrollUntilVisible` ma `optional` i `centerElement` (`YamlScrollUntilVisible.kt`, tag `cli-2.11.0`) i najpierw sprawdza widoczność (`Orchestra.kt:803–837`).
| Flow | Zmiana | Asercje |
|---|---|---|
| 01 | `scrollUntilVisible` do `lesson-m0.l1` i do „Dalej” | bez zmian |
| 02 | `tapOn: { id: 'zakladka-powtorki' }` zamiast tekstu; `NativeTabs.Trigger testID` (`zakladka-dzis`, `-powtorki`, `-postep`) | bez zmian |
| 06 | w pętli: opcja szukana w górę, potem w dół (`optional`), „Dalej” z `scrollUntilVisible` | bez zmian |
| 09 | `scrollUntilVisible` do `lesson-m0.l1` | bez zmian |

Strażnik: `e2e-flowy` „każde id we flowach bramki ma testID w kodzie aplikacji” — czerwony po zmianie flowu 02 (`id 'zakladka-powtorki' bez testID`), zielony po `testID`. `pnpm run ci` kod 0: srs 21, jezyki 136, poker-core 155, domena 314, postep 105, mobile 385, content-build 124, preflop-solver 43, skrypty 79, kontrole 8.

**Zgłoszenia nowe:** 08-F24 → 04: ten sam tekst „Powtórki” dla wiersza na „Dziś” (`today.reviews`) i zakładki (`tabs.review`) — dwa cele pod jedną nazwą (także dla VoiceOver); 08-F25 → 04: ekran sesji po „Dalej” nie wraca na górę — przy dłuższym zadaniu (stół) treść następnego zadania zaczyna się nad krawędzią; propozycje: przewinięcie na górę przy zmianie zadania (A) albo bez zmian (B); decyzja 04 (zachowanie interfejsu).

Zestawienie 08-F15–F29 (rola, miejsce, stan, waga): [`zgloszenia-08.md`](zgloszenia-08.md).

## E2 część 5b: definicja ukończenia (2026-11-08, przyjęta wg D-272 — D-276)
| Punkt | Dowód |
|---|---|
| nowe zachowania z testem czerwonym przed kodem | kroki 0–7 i D-271 (tabele wyżej): czerwień na asercjach po zaślepkach zgodnych z typem; czerwień zaślepką po kodzie nazwana w commitach (`PierwszeUruchomienie-08`, `trasaUstawien-08`, „bez pętli” w `dziennik-08`) |
| testy nieosłabione | testy 07 przeniesione do `apps/mobile` bez zmian asercji (D-175); `e2e-ponowienia` oczekiwana liczba flowów 4 → 7 (powód w f8d1c32: przeniesione flowy); flowy 01, 02, 06, 09: zmiana struktury (przewijanie, zakładka po id), asercje bez zmian (D-271) |
| mutacje (D-172) | kroki 5–6: 21/22 zabitych, 1 równoważny (98d11a2); kroki 1–4 w poprzedniej sesji (commity kroków) |
| pełny zestaw | `pnpm run ci` kod 0 na 2fab680 (srs 21, jezyki 136, poker-core 155, domena 314, postep 105, mobile 385, content-build 124, preflop-solver 43, skrypty 79, kontrole 8) i na 66d947f (mobile 402, skrypty 82); `i18n` 0 błędów |
| akceptacja | `pnpm test:akceptacja` (2026-11-08, 66d947f): domena 11/14 — czerwone tylko 3 testy treści 06 (KURS-003-b, KURS-005-a, CWI-005-b, jak w 5a); ekrany: brak oczekujących (wszystkie w `apps/mobile`, D-175) |
| typecheck, lint | `pnpm typecheck` w `pnpm run ci` kod 0; `expo lint` nieuruchamiany (kod z npm, jak w częściach 1–5a) |
| `git diff --cached` | przejrzany przed każdym commitem; bez sekretów |
| dane: kopia bazy poprzedniej wersji | schemat `postep.db` bez zmian w 5b (v1; brak commitów w migracjach i `schemat.sql` w b64a345..2fab680); import robi kopię `postep-przed-importem.db` przez `VACUUM INTO` (D-270, test `przeniesienie-08`) |
| ścieżki wrażliwe (D-043) | przegląd części 5b (b64a345..98d11a2): „brak uwag”; zmiana `e2e-ios.yml` z D-271 tylko flowy i `testID` (bez workflow) |
| E2E | **42515532537 (2fab680): 7/7 flowów w pierwszym przebiegu** („7/7 Flows Passed in 8m 45s”, ponowienie pominięte), build 23 min 20 s, flowy 14 min 2 s; poprzedni 42508961244 czerwony 4/7 (flow, nie maszyna; naprawa D-271) |
| zrzuty | Linux bez symulatora i bez `react-native-web` — lista dla właściciela niżej; artefakt `e2e-wyniki` przebiegu 42515532537 (7 dni) ma zrzuty Maestro z flowów |

### Zrzuty do zrobienia (właściciel, symulator albo telefon; ekran:stan:motyw, jasny i ciemny = 2 pliki)
`dzis:typowy`, `dzis:limit-zuzyty`, `dzis:pelny-dostep`, `powitanie:start`, `ocena-poziomu:pytanie`, `ocena-poziomu:wynik`, `start:przed-sesja`, `zakup:ceny`, `zakup:ceny-niedostepne`, `zakup:przywracanie-bez-zakupu`, `ustawienia:typowy`, `ustawienia:subskrypcja` („Zarządzaj subskrypcją”), `dane:eksport`, `dane:import-potwierdzenie`, `dane:import-blad`, `jezyk:lista`, `sesja:po-ocenie`, `postep:typowy`, `usun-postep:potwierdzenie` — w obu motywach (38 plików, nazwy `5b-<ekran>-<stan>-<light|dark>.png`); do audytu zgodności 04.

### Zgłoszenia części 5b (zbiorczo)
Zestawienie 08-F15–F29 (rola, miejsce, stan, waga): [`zgloszenia-08.md`](zgloszenia-08.md).
08-F15 (04, talia czterokolorowa), 08-F16 (04, promienie `BlokLekcji`, mapa kursu), 08-F17 (06, skip „sesja ćwiczeń”), 08-F18 (05/07, `EkranUstawien.sekcje`), 08-F19 (01/03/06, pytania o cel i samoocenę w ocenie poziomu), **08-F20 (10/właściciel, adres polityki prywatności — bloker App Store)**, 08-F21 (07, brak testu ekranu sesji), 08-F22 (04, ikona ustawień ⚙︎), **08-F23 (10/właściciel, App Store ID i adres poczty)**, 08-F24 (04, „Powtórki” dwa cele), 08-F25 (04, powrót ekranu sesji na górę po „Dalej”).

### Teksty do akceptacji 04/06 (część 5b)
`session.end`, `today.*`, `start.*`, `grade.*`, `welcome.*`, `placement.*`, `purchase.*`, `settings.*` (w tym `settings.display`, `settings.reminder*`, `settings.general`, `settings.language`, `settings.restored`), `data.*`, `feedback.*`, `reminder.title`, `reminder.body`, `language.*`, `progress.more`.

### Ryzyka do sprawdzenia na urządzeniu
U-2 ochrona tła, U-5 zakupy w piaskownicy (karencja, przywracanie), eksport i import pliku (arkusz udostępniania, wybór pliku), przypomnienie (zgoda na powiadomienia, pora 08:00), prośba o ocenę po podsumowaniu.

## Punkt czyszczenia (praca nocna D-272, 2026-11-08 ok. 19:50 UTC)
Rola 08, tryb build. Prompt: `node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build`. Plik stanu: ten plik od „E1 część 5b: kroki 5–8”. Szczyt: 2fab680 (naprawa flowów, D-271) + ten zapis. E2E 42515532537 (2fab680) w toku; przypomnienie `trig_017KdxmtiwCqU5ftPcgt8Ykm` o 20:20 UTC. Kolejka nocy: (1) wynik E2E → naprawa flowów (najwyżej 2 podejścia) → (2) E2 5b → (3) szybsze E2E jak Trening (`aplikacja_z_przebiegu`) z przeglądem D-043 → (4) część 6 (E0 → E1, P-2 = B: `Stol`, `PasekStrategii`, `SkalaStopni`) → stan do 04:00 UTC.

# Część 6: ekran decyzji w sesji — `Stol`, `PasekStrategii`, `SkalaStopni` (build, E0, 2026-11-08, przyjęty wg D-272)
Zakres (P-2 = B, D-256; wyjątki D-259 do części 6): ekran decyzji w sesji według `docs/design/design-spec.md` („Komponenty”, „`Stol`”, „`PasekStrategii`”, „Znaczenie kolorów”, „Typografia”) i makiety `ekrany/e3.html` (ekrany `przed-decyzja`, `po-ocenie`, `bez-pozycji`); kroje tytułów Literata 600; zdjęcie `tk.przejsciowe` z ekranu sesji. Nie mylić z „częścią 6” roli 07 (K-08, D-186).

## Stan wyjściowy (401bcb5)
`pnpm run ci` kod 0 (mobile 52 pliki / 385 testów, skrypty 82). Ekran sesji `src/app/session.tsx` (652 linie): `TableFelt` (pas sukna z kartami i nazwą pozycji), `ChoiceOptions` (lista opcji z kolorami `tk.przejsciowe.good/bad/warn`), nagłówek oceny kolorem (`gradeColor`), wyjaśnienie na `przejsciowe.feltSoft`. Gotowe i nieużyte w sesji: `features/ocena/StopienOceny` (znak + słowo, D-213). Dane: `ChoiceInstance.table` ma `hand/opp/board/position`, bez przebiegu akcji; zadania z zakresu (`engine.ts` `rangeDecision`) znają `spot.path` (np. `UTG:fold,HJ:fold`) i częstości akcji (`freqs`), ale ich nie przekazują. Expo web: brak `react-native-web` w `apps/mobile/package.json` → zrzuty jako lista dla właściciela (Linux bez symulatora). Literata: w repo tylko woff2 (makiety); TTF 600 dostępny u źródła `raw.githubusercontent.com/googlefonts/literata/main/fonts/ttf/Literata-SemiBold.ttf` (HTTP 200, 2026-11-08), licencja `docs/design/fonty/OFL-literata.txt`.

## Założenia wejściowe (hipotezy)
- Zadanie z przebiegiem akcji = zadanie z zakresu (`rangeDecision`); inne zadania z wyborem (teoria) nie mają częstości solvera → pasek strategii po ocenie tylko dla zadań z zakresu, reszta: lista odpowiedzi w stylu systemu (makieta `bez-pozycji`: „Wybierz odpowiedź”, równe segmenty).
- Liczba miejsc = 6 (wszystkie `spots.yaml` są 6-osobowe; `meta.players` z design-spec nie ma w danych zadania) — sprawdzane testem na treści.
- Stan miejsca z `path`: `fold` → „pas”, akcja inna niż pas (np. `raise2.5`) → **luka**: design-spec zna tylko „pas”, „czeka”, „ty”.

## Plan (cięcie pionowe; każdy krok: czerwień z właściwego powodu → kod → `pnpm run ci` → commit; jeden push kodu na końcu)
| Krok | Zachowanie | Test (czerwony przed) | Pliki |
|---|---|---|---|
| 1 | czysta funkcja `ukladStolu(position, path)`: 6 miejsc w kolejności wskazówek zegara, ty na dole, stany pas/czeka/ty/akcja; etykieta VoiceOver („Stół: UTG pas, HJ pas, ty na CO z J9o, czekają BTN, SB i BB.”); opis ręki; bez pozycji: opis kart („Twoje karty: J♣ 9♦. Na stole: 10♠ 7♥ 2♣.”) | `features/stol/__tests__/uklad-08` | `features/stol/uklad.ts`, teksty `pl.json` |
| 2 | `rangeDecision` przekazuje `table.path` i `strategia` (nazwa + częstość każdej akcji, w kolejności opcji) | `engine` test: zadanie z zakresu ma `path` i `strategia` sumujące się do 1 | `features/drills/types.ts`, `engine.ts` |
| 3 | `Stol`: z pozycją owal z miejscami (pas kreskowane, ty złota obwódka 2,5), bez pozycji owal bez miejsc, karty wspólne na suknie i twoje przy krawędzi; `accessibilityRole="image"` + etykieta z kroku 1; opis tekstem pod stołem | `components/__tests__/Stol-08` | `components/Stol.tsx`, `components/Karta.tsx` (z `PlayingCard`) |
| 4 | czysta funkcja `segmentyPaska(strategia, wybor)`: przed decyzją równe; po ocenie szerokości = częstości, znacznik nad wyborem, opis VoiceOver („Strategia solvera dla J9o: pas 80 procent, przebicie 20 procent. Twój wybór: przebicie.”) | `features/stol/__tests__/pasek-08` | `features/stol/pasek.ts` |
| 5 | `PasekStrategii`: przed decyzją segmenty-przyciski ≥ 64 pt z `testID` `option-<i>` (flowy E2E bez zmian), po ocenie granice z kroku 4, „pas” kreskowany, złoty znacznik, podpisy z procentami i „twój wybór”; „Ogranicz ruch” → przenikanie | `components/__tests__/PasekStrategii-08` | `components/PasekStrategii.tsx` |
| 6 | `SkalaStopni`: trzy przedziały z progów `thresholds.ts` (`MIXED_MIN`, `MIXED_LOW`), twój przedział złotą obwódką, etykieta („Skala stopni: twoja akcja 20 procent, przedział dopuszczalna”) | `components/__tests__/SkalaStopni-08` (progi czytane z `thresholds.ts`, nie wpisane) | `features/stol/skala.ts`, `components/SkalaStopni.tsx` |
| 7 | sesja: zadanie z wyborem → `Stol` + (zakres: `PasekStrategii`; inne: lista odpowiedzi) ; po ocenie `StopienOceny` na suknie + pasek + skala; nagłówki ocen bez koloru (ink + znak + słowo); wyjaśnienie na `surface`; `tk.przejsciowe` znika z `session.tsx` | testy ekranu sesji (istniejące + nowy: brak `przejsciowe` w `session.tsx`, `StopienOceny` po ocenie) | `app/session.tsx` |
| 8 | Literata 600: `assets/fonts/Literata-SemiBold.ttf` + OFL, ładowanie `Font.loadAsync` z limitem 3 s przy starcie (wzór Treningu `app/_layout.tsx:23,31`, `app.json:96` `expo-font`), `styl.tytul*` i indeks karty z Literatą do AX1 (D-122) | test motywu: `styl.tytul.fontFamily` = Literata przy domyślnym tekście, systemowy od AX1 | `src/theme/tokens.ts`, `_layout`, `assets/fonts/` |
| 9 | E2: mutacje ręczne (D-172), pełny `pnpm run ci`, push → E2E (flowy 01, 06 przechodzą przez ekran decyzji) | — | — |

## Luki z opcjami (przyjęte wg D-272; zgłoszenia do 04)
- **L-1 stan miejsca po akcji innej niż pas** (np. `CO:raise2.5` w spotach obrony): (A, przyjęta) stan „przebija” zwykłym stanem miejsca (bez nowego koloru), tekst do akceptacji 04/06 — 08-F26; (B) pominąć przebieg i pokazać tylko pas/czeka — gubi informację, kto przebił, a zadanie obrony bez niej jest niezrozumiałe.
- **L-2 kolory siatki malowania i zakresów, talia czterokolorowa** (`PaintGrid`, `RangeGrid`, `PlayingCard`): system 04 nie ma tych barw. (A, przyjęta) zostają w `tk.przejsciowe` (wyjątek D-259 przedłużony, nazwany), zgłoszenie 08-F15 (talia) i nowe 08-F27 (siatki) do 04; (B) zastąpić najbliższymi tokenami (`gold`, `alert`) — sprzeczne ze znaczeniem kolorów („złoto = ty”, „alert = błąd działania”).
- **L-3 znak stopnia** — makieta ma „∼” dla Dopuszczalna, `StopienOceny` „≈” (D-213, do akceptacji 04): bez zmiany (D-213 obowiązuje), uwaga w 08-F26.
- **L-4 ocena „blisko” i „zły rozmiar” w zadaniach liczbowych i teksturze** — poza skalą stopni z design-spec: nagłówek bez koloru (znak + słowo), bez skali.
- **L-5 ruch paska (240 ms) i znacznika (160 ms po 200 ms)** — `Animated` z RN, przy „Ogranicz ruch” przenikanie; jeśli test ruchu okaże się nierealny w Jest, ruch sprawdza zrzut/urządzenie (lista dla właściciela).

## Szacunek (zasada 9)
Agent: ok. 6–8 h (kroki 1–8), w tym noc do 03:45 UTC: kroki 1–7 realnie, 8 jeśli starczy. Czekanie: E2E ~46 min po pushu (0 USD). Właściciel: zrzuty na telefonie/symulatorze (lista w E2), weto L-1–L-5.

## E1 część 6: stan w toku (2026-11-08, ok. 20:20 UTC)
| Krok | Commit | Zachowanie | Testy (czerwone przed → zielone) |
|---|---|---|---|
| 1 | 1d33c68 | `features/stol/uklad.ts`: układ 6 miejsc, etykieta VoiceOver, opis ręki, opis kart; terminologia D-275 | `uklad-08` 7 |
| 2 | 6ee5734 | `rangeDecision`: `table.path`, `DrillOption.czestosc` | `engine` „przebieg akcji…” |
| 3 | 4cfd17b | `components/Stol.tsx` | `Stol-08` 3 |
| 4 | 66d947f | `features/stol/pasek.ts` (segmenty, opis) | `pasek-08` 6 |
| 5 | 7fcfbb6 | `components/PasekStrategii.tsx`; `DrillOption.pas` | `PasekStrategii-08` 2; asercja `pas` — czerwień mutacją |
| 6 | 3e22c02 | `features/stol/skala.ts`, `components/SkalaStopni.tsx` | `skala-08` 3, `SkalaStopni-08` 1 |
| 7 | 66317c9 | `features/stol/PanelDecyzji.tsx`; `session.tsx`: `Stol` (także przegląd egzaminu), zadania ze strategią → `PanelDecyzji`, bez strategii → lista „Wybierz odpowiedź” ze znakiem + słowem, nagłówki i wynik w `ink`, wyjaśnienie na `surface`; `StopienOceny` `naSuknie` (D-277) | `PanelDecyzji-08` 4 (czerwone na zaślepce), `sesja-ekran-08` 2 |
| 8 | 75895ea | Literata 600 TTF + OFL w `assets/fonts/`, `theme/kroje.ts`, ładowanie w `_layout` z limitem 3 s, `styl.tytul*` i indeks karty Literatą do XXXL, od AX1 systemowy (D-278) | `kroje-08` 8 (5 czerwonych na zaślepce) |
| 9 | 13606f6 | E2: mutacje 42 (37 zabitych, 5 przeżywa — klasyfikacja w „E2 część 6”), asercje dopisane do istniejących testów; zgłoszenia 08-F26–F29 | `uklad-08`, `pasek-08`, `PanelDecyzji-08`, `SkalaStopni-08` (+3 testy, +4 asercje; każda czerwona na swoim mutancie) |

`pnpm run ci` kod 0 na 66317c9 (mobile 414) i na 75895ea (mobile 61 zestawów / 422 testy). Kroków 7–8 nie wypchnięto osobno: push kodu jeden, na końcu sesji (E2E 42519763480 na 36a8600 w toku).

**Zostaje:** krok 9 zrobiony — „E2 część 6” niżej.

## E2 część 6: definicja ukończenia (2026-11-08, przyjęta wg D-272 — D-279)
| Punkt | Dowód |
|---|---|
| nowe zachowania z testem czerwonym przed kodem | kroki 1–8 (tabela „E1 część 6”): czerwień na asercjach po zaślepkach zgodnych z typem (`uklad-08`, `pasek-08`, `PanelDecyzji-08`, `kroje-08`), asercja `pas` w `engine` — czerwień mutacją (7fcfbb6) |
| testy nieosłabione | brak usuniętych i wyłączonych testów; w kroku 9 tylko dopisane asercje (13606f6), istniejące bez zmian |
| mutacje (D-172) | ręcznie, 42 mutanty na zmianach kroków 1–8 (skrypt w scratchpadzie: podmiana → `jest` testów obszaru → przywrócenie): 30 zabitych w pierwszym przebiegu; 7 z 12 przeżywających zabitych dopisanymi asercjami (13606f6: M03 powtórzona pozycja w przebiegu, M11 `maStrategie([])`, M13 normalizacja szerokości, M15 `opisPaska` przed decyzją, M26 zły rozmiar bez skali, M41 złota obwódka przedziału, M42 stopień na suknie `onFelt`) — każda nowa asercja zielona na kodzie, czerwona na swoim mutancie; **przeżywa 5**: M29–M32 (`session.tsx`: wybór `PanelDecyzji`/lista, nagłówek oceny, `Feedback` w przeglądzie, obwódka `ink` w liście odpowiedzi — ekran sesji nie ma testu renderu, tylko strażnik statyczny `sesja-ekran-08`; zgłoszenie 08-F21 do 07 potwierdzone) i M40 (kreskowanie segmentu „pas” — sam wygląd, zrzut `6-sesja-decyzja-po-ocenie`); razem 37/42 |
| pełny zestaw | `pnpm run ci` kod 0 na 13606f6 (srs 21, jezyki 136, poker-core 155, domena 314, postep 105, mobile 61 zestawów / 425 testów, content-build 124, preflop-solver 43, skrypty 82, kontrole 8; `i18n` 0 błędów); wcześniej 66317c9 (mobile 414) i 75895ea (mobile 422) |
| typecheck, lint | `pnpm typecheck` w `pnpm run ci` kod 0; `expo lint` nieuruchamiany (jak w częściach 1–5b) |
| `git diff --cached` | przejrzany przed każdym commitem; bez sekretów (Literata: OFL 1.1 w repo obok pliku) |
| dane: kopia bazy poprzedniej wersji | nie dotyczy: część 6 nie zmienia schematu ani zapisu (`git diff 401bcb5..13606f6` bez `packages/postep`, `src/data/`, `schemat.sql`) |
| ścieżki wrażliwe (D-043) | nie dotyczy: zmiany 401bcb5..13606f6 poza listą `CLAUDE.md` (bez `packages/postep`, `packages/domena`, `src/data/`, `src/platform/`, `tools/content-build/`, `.github/workflows/`, `app.json`, `eas.json`); krój ładowany w czasie działania bez zmiany `app.json` (D-278) |
| E2E | **42523567101 (bbada0b, kod kroków 7–8): 7/7 flowów w pierwszym przebiegu** („7/7 Flows Passed in 11m 39s”, ponowienie pominięte; w tym „Lekcja i pierwsze zadanie” 1 min 57 s i „Przerwanie sesji” 2 min 25 s — przechodzą przez ekran decyzji), build 23 min 17 s, flowy 16 min 11 s, artefakt `e2e-wyniki` 13635531988 (7 dni); 13606f6 zmienia tylko testy Jest — push uruchamia nowy E2E na tym samym kodzie aplikacji (dowód dodatkowy, nie wymagany) |
| zrzuty | Linux bez symulatora i bez `react-native-web` — lista dla właściciela niżej; artefakt `e2e-wyniki` przebiegu E2E ma zrzuty Maestro z flowów 01 i 06 |

### Zrzuty do zrobienia (właściciel, symulator albo telefon; jasny i ciemny = 2 pliki, nazwy `6-<ekran>-<stan>-<light|dark>.png`)
`sesja-decyzja:przed` (zadanie z zakresu: stół z miejscami, pas kreskowany, ty złotą obwódką, pasek-przyciski), `sesja-decyzja:przebija` (spot obrony, miejsce „przebija”, 08-F26), `sesja-decyzja:po-ocenie-zgodne`, `sesja-decyzja:po-ocenie-dopuszczalne` (pasek po ocenie, znacznik, skala z twoim przedziałem), `sesja-decyzja:po-ocenie-blad`, `sesja-decyzja:niedokladnosc` (zły rozmiar: segment 0%, bez skali), `sesja-decyzja:czas-minal`, `sesja-bez-pozycji:przed` („Wybierz odpowiedź”, owal bez miejsc, opis kart), `sesja-bez-pozycji:po-ocenie` (obwódka `ink`, znak + słowo), `sesja-tekstura:po-ocenie`, `egzamin:przeglad` (stół `Stol`, obwódka `separator`), `egzamin:wynik`, `tytuly:domyslny` (Literata w tytułach i indeksie karty), `tytuly:AX1` (krój systemowy) — 14 stanów, 28 plików; do audytu zgodności 04.

### Zgłoszenia części 6
Zestawienie 08-F15–F29 (rola, miejsce, stan, waga): [`zgloszenia-08.md`](zgloszenia-08.md).
- **08-F26 → 04/06:** stan miejsca „przebija (raise)” po akcji innej niż pas (L-1, D-274) — tekst i wygląd (zwykły stan miejsca, bez nowego koloru) do akceptacji; znak Dopuszczalnej „≈” (D-213) wobec „∼” w makiecie e3 (L-3).
- **08-F27 → 04:** „pas” w pasku strategii jako obwódka kreskowana (`borderStyle: 'dashed'`) zamiast kreskowanego wypełnienia z makiety (RN nie ma wzoru wypełnienia bez dodatkowej biblioteki); kolory `PaintGrid`/`RangeGrid` nadal w `tk.przejsciowe` (L-2, wyjątek D-259 przedłużony).
- **08-F28 → 04/06:** terminologia stołu (D-275): „Przy stole: …”, „po tobie BTN, SB i BB” zamiast „Stół: …”, „czeka/czekają” z makiety i design-spec — do przeniesienia do design-spec i tabeli terminologii (dok. 13).
- **08-F29 → 04, 08 część 7:** ocena poziomu (`PierwszeUruchomienie`) rysuje stół starym `TableFelt` (bez `tk.przejsciowe`, ale niezgodnie z `Stol`); zamiana w części 7 (D-279), nie w kroku 9.
- **08-F21 → 07 (potwierdzone mutacjami):** M29–M32 przeżywają, bo ekran sesji nie ma testu renderu — gałęzie `maStrategie` w `session.tsx` sprawdza tylko E2E (flow 06, gdy trafi zadanie z zakresu).

### Teksty do akceptacji 04/06 (część 6)
`table.*` (w tym `table.stateRaise`, `table.seatRaise`, `table.raised`, `table.after`, `table.label`), `strategy.*`, `scale.*`, `session.chooseAction`, `session.chooseAnswer`.

### Ryzyka do sprawdzenia na urządzeniu
Ruch paska (240 ms) i znacznika (160 ms po 200 ms) oraz przenikanie przy „Ogranicz ruch” (L-5); start aplikacji z krojem (bez pustego ekranu dłużej niż 3 s, także bez sieci — krój jest w pakiecie); przełączenie kroju tytułów przy AX1 (Ustawienia → Dostępność → Większy tekst); VoiceOver: etykiety stołu, paska i skali, kolejność fokusu na suknie; cele dotyku segmentów ≥ 64 pt przy 4 opcjach.

## 08-F29: stół oceny poziomu przez `Stol` (2026-11-08, sesja D, D-280)
| Punkt | Dowód |
|---|---|
| test czerwony przed kodem | `PierwszeUruchomienie-08`: „08-F29: pytanie ze stołem rysuje `Stol`…” — „Unable to find an element with role: image”; „`TableFelt` bez użyć w kodzie apps/mobile/src” — lista plików niepusta |
| kod | 8362e14: `PierwszeUruchomienie` → `<Stol table={item.table} />`; `components/TableFelt.tsx` usunięty (bez własnych testów) |
| pełny zestaw | `pnpm run ci` kod 0 na 8362e14 (mobile 61 zestawów / 427 testów) |
| E2E | flow 05 stuka `option-0` (`EkranyOceny`, bez zmian); pierwsze pytanie `m0.exam.q1` ma stół (karty bez pozycji) — E2E 42531461257 (6ea86fa) **zielone** w pierwszym przebiegu (flowy 23:06–23:21 UTC, ponowienie pominięte) |
| ścieżki wrażliwe | niedotknięte — przegląd D-043 nie dotyczy |
| zrzut | `ocena-poziomu:pytanie` (zgloszenia-08, lista zrzutów) pokaże teraz `Stol` |

## Naprawy audytu roli 04 (sesja F, 2026-11-09)
Rola `08-programista --tryb fix` (tekst złożony przez koordynatora, prompts c025063, wersja skrócona — wyjątek nazwany przez koordynatora). Raport: `docs/design/audyt-5b-6.md`; decyzje D-282–D-284 (A), D-285 (W, bez zmian w kodzie). Stan wyjściowy: `fec75e7`, `pnpm run ci` — wynik w tabeli „Stan wyjściowy F”.

### E0: plan i klasyfikacja (D defekt / P produkt / M merytoryka)
Wszystkie ID mają rozstrzygnięcie w D-282–D-284, więc wszystkie są typu D (bez P i M). Teksty nowych kluczy wg D-282/D-284 (brzmienie pl), terminologia „rywal” do potwierdzenia przez 06 (D-282).

| Kol. | ID | Typ | Pliki | Test odtwarzający | Ryzyko |
|---|---|---|---|---|---|
| 1 | A04-01 | D | `features/stol/uklad.ts` (`opisKart` + `opp`), `components/Stol.tsx` (podpisy rzędów przy `opp`), `pl.json` | `uklad-08`, `Stol-08`: etykieta zawiera każdą narysowaną kartę; podpisy „Rywal”, „Na stole” | niskie |
| 2 | A04-02 | D | `features/ocena-poziomu/EkranyOceny.tsx` | `PierwszeUruchomienie-08`/`EkranyOceny`: brak tekstu `[[`, karty z etykietami | testID `option-<i>` (flow 05) zostaje |
| 3 | A04-03, 08-F25 | D | nowy `lib/announce.ts`, `PanelDecyzji.tsx`, `session.tsx`, `components/ui.tsx` (ref przewijania) | strażnik `accessibilityLiveRegion` tylko w pomocniku; ogłoszenie po ocenie (atrapa `AccessibilityInfo`); przewinięcie na górę i fokus po „Dalej” | `session.tsx` bez testu renderu (08-F21) — test na pomocnikach + strażnik statyczny |
| 4 | A04-04 | D | `Stol.tsx`, `uklad.ts` | `Stol-08`: sama pozycja → bez obrazu, tekst „Twoja pozycja: BB”; pozycja z kartami bez przebiegu → dopisek w etykiecie | niskie |
| 5 | A04-05–07 | D | `Stol.tsx`, `PlayingCard.tsx`, `PasekStrategii.tsx`, `SkalaStopni.tsx`, `StopienOceny.tsx`, `theme/tokens.ts` | RNTL: `allowFontScaling={false}`, `flexWrap`, `maxFontSizeMultiplier` | wygląd tylko na zrzucie |
| 6 | A04-08–09 | D | `session.tsx:458`, `app/(tabs)/index.tsx` | strażnik/RNTL | niskie |
| 7 | A04-10–11 | D | `PaintGrid`, `RangeGrid`, `PlayingCard`, `RenderErrorScreen`, `_layout`, `uklad.ts` | `i18n:kod` / RNTL etykiety kart | brzmienie pl bez zmian |

Źródła API (zasada 12): React Native 0.88.1 z `package.json`, `node_modules/react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo.js:441–460` (`sendAccessibilityEvent(handle, 'focus')`, `announceForAccessibility`; `setAccessibilityFocus` oznaczone jako przestarzałe, :433), odczyt 2026-11-09. Trening (D-191): `lib/announce.ts:1–10`, `tests/interaction-guards.test.ts:88`, gałąź `main`, odczyt 2026-11-09.

### E1: stan napraw (sesja F)
| ID | Stan | Commit | Test (czerwony przed → zielony) |
|---|---|---|---|
| A04-01 | zrobione | 7ba70ac | `uklad-08` „A04-01”, `Stol-08` „A04-01” ×2 — przed: etykieta bez A♣ A♦ |
| A04-02 | zrobione | 6bc64e1 | `PierwszeUruchomienie-08` „A04-02” — przed: 4 teksty z „[[” |
| A04-03, 08-F25 | zrobione | c0f6797, eee2464 (bez pustego `catch`, K-07) | `announce-08` 7 — przed (zaślepka): 0 ogłoszeń, brak przewinięcia i fokusu, `accessibilityLiveRegion` w `PanelDecyzji` |
| A04-04 | zrobione | 074425f | `Stol-08` „A04-04” ×2 — przed: obraz z etykietą `""`, opis bez pozycji |
| A04-05 | zrobione | fb6f1ce | `skalowanie-08` „A04-05” 5 — przed: `allowFontScaling` undefined, stała 0 |
| A04-06, A04-07 | zrobione | 7e05e1a | `skalowanie-08` „A04-06” 3, „A04-07” 2 — przed: brak `flexWrap`, tytuł bez sufitu, słowo stopnia 28/34 |

| A04-08 | zrobione | 2dc77cc | `sesja-ekran-08` „A04-08” (strażnik statyczny: ekran sesji bez testu renderu, 08-F21) — przed: `opacity 0.75` |
| A04-09 | zrobione | 327af22 | `widok-08` „A04-09” ×2 — przed: pusta etykieta (zaślepka), 0 użyć na „Dziś” |
| A04-10, A04-11 | **zostaje** | — | następna sesja (wersja: przed rolą 09 — drugi język) |

Pełny zestaw: `pnpm run ci` kod 0 na f8a6be8 (= 7e05e1a po rebase; mobile 450) i df9fe4e (= 327af22; mobile 61+ zestawów / 453 testy, i18n 0 błędów, 455 kluczy); rebase na docs sesji G (bez zmian kodu, `git diff --name-only` tylko `docs/`). Pierwszy przebieg CI na 317ee6c czerwony z właściwego powodu (K-07 `pusty-catch` w `announce.ts`) → eee2464. Typecheck w `pnpm run ci`; `expo lint` nieuruchamiany (jak w częściach 1–6).

**E2E po pushu (af71a5e):** przebieg 42566410755 — kompilacja zielona w obu próbach (20 min 40 s; 22 min 27 s), aplikacja zapisana (D-273). Obie próby (1: 05:17, 2: ponowienie joba 06:01) padły na kroku „Maestro”: `curl: (56) … 504` przy pobieraniu `maestro.zip` przez `get.maestro.mobile.dev` → flowy pominięte (0 flowów uruchomionych). Infrastruktura, nie kod. O 06:46 UTC z kontenera `releases/download/cli-2.11.0/maestro.zip` odpowiada 200. **Flowy nie mają jeszcze dowodu na tym kodzie.**

**Zostaje:** (1) A04-10 teksty poza `t()` (`PaintGrid.tsx:115, 153–156, 159`, `RangeGrid.tsx:15`, `PlayingCard.tsx:7–8, 26`, `RenderErrorScreen.tsx:17`, `_layout.tsx:180`; D-284: klucze `paint.*`, `range.label`, `card.rank.*`/`card.suit.*`, `error.retry`, `nav.back`, brzmienie pl bez zmian); (2) A04-11 etykieta kart w `uklad.ts` z nazw (te same klucze `card.*`); (3) E2E: ponowić (opcje w PRZEKAZANIU sesji F); jeśli 504 wróci — krok „Maestro” z ponowieniem pobrania (ścieżka wrażliwa `.github/workflows/`, przegląd D-043); (4) F-SOLVER-CZAS (niżej). D-290 do weta.

Odstępstwa nazwane: A04-03 i 08-F25 jednym commitem (D-283 łączy je w jeden krok, wspólne pliki); A04-06 i A04-07 jednym commitem (wspólny moduł `theme/skalowanie.ts` i plik testu). Ścieżki wrażliwe (CLAUDE.md) niedotknięte — przegląd D-043 nie dotyczy.

Nowe znalezisko (poza zakresem fix, nie naprawiam): **F-SOLVER-CZAS** — `tools/preflop-solver` test „wagi blokerów 3-way” trwa ok. 59 s przy limicie 60 s; w `pnpm run ci` (testy pakietów równolegle, 4 rdzenie) przekroczył limit na `fec75e7` bez zmian w kodzie (log stanu wyjściowego), osobno przechodzi 13/13 (59 s). Waga: ŚREDNIE (fałszywa czerwień CI, nie wpływa na aplikację). Opcje: (A) limit testu 180 s; (B) mniejsza próba w teście; rekomendacja A — decyzja roli 07/08 w kolejnej sesji.

Teksty nowe do akceptacji 04/06: `table.oppCards`, `table.rowOpp`, `table.rowBoard`, `table.yourPosition`, `grade.announce`.

Stany do zrzutu (właściciel): `sesja-bez-pozycji:przed` z „Kto wygrywa” (rzędy „Rywal”/„Na stole”), `ocena-poziomu:pytanie` przy m5.exam.q2 (karty zamiast „[[…]]”), zadanie z samą pozycją (`m6-l1-mdf-alpha`: wiersz „Twoja pozycja”), `sesja-decyzja:przed` i `po-ocenie-*` przy AX3 i AX5 na 390 pt (pasek i skala zawinięte, miejsca i karty bez wzrostu, słowo stopnia 34 pt), VoiceOver: ogłoszenie po dotknięciu akcji, fokus na „Zadanie n z m” po „Dalej”.

## Naprawy — sesja I (2026-11-09, rola 08 fix)
Rola `08-programista --tryb fix` złożona `tools/assemble.mjs` (repo `prompts`, odczyt 2026-11-09). Stan wyjściowy `1607c7b`: `pnpm run ci` kod 0, mobile 453. Wszystkie ID typu D (rozstrzygnięte w D-284, D-297/D-299/D-301 i rekomendacji sesji F); szczegóły wykonania D-306 (do weta). Commity jeszcze bez SHA po pushu — w tabeli SHA z gałęzi po `git pull --rebase`.

| ID | Commit | Test (czerwony przed → zielony po) |
|---|---|---|
| A04-10 | 1eb4df7 | `teksty-08` 6 (język testowy z oznaczonymi tekstami) — przed 6/6 czerwone („Unable to find … X-HINT”); `pnpm i18n:kod` 10 błędów → 0; `i18n:kod` w `pnpm run ci` |
| A04-11 | 00e0cb2 | `uklad-08` „A04-11” ×2, `Stol-08` — przed 4/17 („A♥ K♦…” zamiast „as kier i król karo…”); zmiana specyfikacji w 5 istniejących asercjach (etykieta z nazw, symbole w tekście widocznym) |
| 10-US-01, 10-US-02, 10-JP-01 | f6182d5 | `anulowanie-08` 4 — przed 2/4 („Unable to find … /ustawieniach konta Apple/”; 2 strażniki zielone od początku) |
| F-SOLVER-CZAS | 302ce3c | `limity.test.ts` — przed: 10 limitów < 180 s; wyjątek nazwany: przekroczenia nie odtworzono tu (2 próby, w tym pod 4× obciążeniem CPU: najdłuższy test 14,9 s), dowód z logu sesji F |
| Maestro (42566410755) | 965231c | `workflowy.test.mjs` „krok Maestro ponawia instalację” — przed „bez pipefail”; symulacja z atrapą curl: 0/2/3 awarie → 1 próba / sukces w 3. / kod 1; przegląd D-043: brak uwag |

Pełny zestaw: `pnpm run ci` kod 0 po każdym commicie (ostatni: mobile 465, preflop-solver 44, skrypty 83). Pierwszy przebieg po A04-10 czerwony z dwóch powodów (teksty „pas/pasuje” bez `{{t:fold|…}}`, test dziennika bez `import '@/i18n'`) — poprawione przed pushem w tym samym commicie. `expo lint` nieuruchamiany (jak w częściach 1–6).

**Teksty do akceptacji 04** (brzmienie pl jak dotąd poza nowym): `purchase.cancelInfo` (nowy, D-306 pkt 4); pozostałe 37 kluczy A04-10 to przeniesione napisy bez zmiany brzmienia — wyjątek: stany pól `PaintGrid` z „pas/pasuje” mają znacznik terminu, a etykieta `RangeGrid` czyta liczbę w formacie języka („42,5”).

**Stany do zrzutu (właściciel):** `zakup:plany` (jasny/ciemny) — zdanie o anulowaniu pod planami, przed „Przywróć zakupy”; VoiceOver: zadanie „Kto wygrywa” (karty czytane nazwami „as trefl…”, nie symbolami), siatka malowania po ocenie (stany pól), karta w treści (np. „walet trefl”).

**E2E:** 42578171401 (push b8eb0a2, pełny build, kod sesji I) **zielony**, 07:15–07:47 UTC (status sprawdzony przez `actions_get`); dispatch koordynatora 42575336076 (aplikacja z 42566410755, kod A04-01..09) **zielony** 06:48–07:11 UTC.

**Zostaje:** `[DO USTALENIA]` warunki zwrotów Apple (zdanie ich nie obiecuje); 10-JP-02 dane sprzedawcy (właściciel/rola 10); przekład `purchase.cancelInfo` i `card.*` — rola 09.

## Naprawy — sesja Q (2026-11-09, rola 08 build)
Rola `08-programista --tryb build`: `tools/assemble.mjs` zablokowane przez klasyfikator trybu auto — pliki roli czytane bezpośrednio z repo `prompts` (`role/08-programista/rdzen.md`, `wzorce.md`, `rola.json`; wyjątek nazwany w zleceniu). Stan wyjściowy `4cd4a4d`: `pnpm run ci` kod 0, mobile 68/487, skrypty 124.

| Zadanie | Commit | Test (czerwony przed → zielony po) | Decyzja |
|---|---|---|---|
| plan-09 §13: zmiana języka przemontowywała nawigację (zmiana `databaseName`) | struktura `useBazaTresci` + `ProviderTresci` | `ProviderTresci-08` 5 — przed (zaślepka = obecne zachowanie): „Unable to find … tresc-pl.db” po zmianie pliku, brak zamknięć | D-324 |
| plan-09 §13: zimny start z zapisanym językiem kopiował dwie bazy | `useTresc(…, start)`, `_layout` stosuje język przed treścią | `useTresc-start-08` 1 — przed `["pl","en"]`, po `["en"]` | D-324 |
| 10-D01-02 „Pełny dostęp” w ustawieniach | trasa `/purchase`, `settings.fullAccess` | `pelnyDostep-08` 3 — przed: brak wiersza, „Wróć do lekcji” na ekranie spoza lekcji; strażnik „z dostępem bez wiersza” zielony od początku | D-325 |
| 10-PRYW-01 FileTimestamp 3B52.1 | `app.json:23`, `POWODY_WYMAGANE` w K-08 | `k08-manifesty.test.mjs` 2 nowe; AK-K-08 czerwony na starym `app.json` (`brakiPowodow`) | D-326 |
| P1 z przeglądu D-043 (pętla render → `changeLanguage`, błąd sprzed sesji) | `useJezykPrzedTresca` raz na port, efekt ekranu startowego od portu | `jezykStartu-08` 3 — przed: 3 wywołania zamiast 1, odrzucenie bez obsługi | D-328 |
| `store/**` poza E2E | `e2e-ios.yml:22` | `workflowy.test.mjs` 1 nowy (czerwony przed, 18/18 po) | D-327 |

Przegląd D-043 (subagent, świeży kontekst, diff `e6565f0..HEAD`): 1×P1 (wyżej, naprawione testem), P2 do backlogu: (a) pusta klatka między zdjęciem ekranu startowego a otwarciem bazy w `ProviderTresci` (`kontekst.tsx`, `_layout.tsx`); (b) `/purchase` i `session.tsx:284` bez obsługi odrzucenia `odswiezDostep`; (c) `otworz`/`onBlad` w refie jak w `useTresc`. SHA w `git log e6565f0..`. Pełny zestaw po zmianach: `pnpm run ci` kod 0 — mobile 72/499, skrypty 127/127, `i18n:kod` 0 błędów (699 kluczy). `expo lint` nieuruchamiany (jak w częściach 1–6).

**Tekst do akceptacji 04:** `settings.fullAccess` „Pełny dostęp” (nowy klucz, brzmienie jak tytuł ekranu zakupu). Przekład — rola 09.

**Stany do zrzutu (właściciel):** `ustawienia` bez pełnego dostępu (wiersz „Pełny dostęp” w sekcji Zakupy, jasny/ciemny); `zakup` z ustawień (bez „Wróć do lekcji”). Telefon: zmiana języka w ustawieniach zostawia ekran ustawień (nie wraca na „Dziś”) — do sprawdzenia po wydaniu drugiego języka (dziś `WYDANE = ["pl"]`).

### Zostaje
- K-06 (A04-12 haptyka, A04-13 pasek po ocenie; 08-F15, F22, F24) i K-07 (08-F21 test renderu ekranu sesji) — nie zaczęte (próg kontekstu).
- E2E zmian tej sesji po pushu (nowa trasa `/purchase` bez flowu Maestro — flow dla 10-D01-02 do roli 07).

## Naprawy — sesja R (2026-11-09, rola 08 build)
Rola `08-programista --tryb build` złożona `tools/assemble.mjs` (repo `prompts`, odczyt 2026-11-09). Stan wyjściowy `0cc07bf`: `pnpm run ci` zielony poza moim czerwonym testem w toku (`ProviderTresci-08`, przebieg uruchomiony równolegle z pisaniem testu — wyjątek nazwany), mobile 71/72 zestawów, 501 testów.

| Zadanie | Commit | Test (czerwony przed → zielony po) | Decyzja |
|---|---|---|---|
| 3×P2 przeglądu D-043 sesji Q: (a) pusta klatka przy starcie, (b) `odswiezDostep` bez odrzucenia, (c) `otworz`/`onBlad` w refie | ff4fa71 | `dostep-08` 1 (przed: „Rejected to value: most natywny”), `ProviderTresci-08` 4 (3 czerwone, 1 strażnik zielony od początku), `startEkranu-08` 3 (1 czerwony) | D-329 |
| P1 przeglądu D-043 sesji R (ekran startowy nad ekranem błędu przy wyjątku pierwszego renderu — błąd z ff4fa71) | 3038ecc | `GranicaBledu-08` 2 (oba czerwone; strażnik czerwony bez zmiany `_layout`) | D-332 |
| A04-12 haptyka, A04-13 pasek po ocenie | dbfc14f | `haptyka-08` 3 (przed: „notificationSuccess” zamiast „impactLight”), `PasekStrategii-08` „A04-13” (przed: brak osi `os-paska`) | D-330 |
| 08-F15 tokeny kart, A04-16 karta | 05f689c | `motyw-08` „08-F15” (przed: brak tokenów), `PlayingCard-08` 3 (przed: promień 6, cień `#000`) | D-331 |
| 08-F22 limit ⚙︎ | — (zrobione w A04-05, sesja F) | `skalowanie-08` | D-331 |
| 08-F24 „Powtórki na dziś” | 2d9eff1 | `powtorki-nazwa-08` 6 (przed: 6/6 czerwone) | D-331 |
| K-07 / 08-F21 test renderu ekranu sesji | 4f3e35f | `sesja-render-08` 4 — test istniejącego zachowania; dowód: mutanty M29–M32 (gałęzie `maStrategie`) i M33 (podpowiedź) zabite 5/5 (skrypt podmiany w scratchpadzie sesji, `session.tsx` przywrócony) | D-331 |
| K-10 strona `site/` (polityka pl/en, wsparcie) | commit „Strona polityki…” | `tests/narzedzia/strona.test.mjs` 9 (bez `site/`: 7/9 czerwone) | D-333 |

Pełny zestaw: `pnpm run ci` kod 0 po P2 (mobile 510), po K-06/K-07 (525), po P1 (527), po K-10 (527, skrypty 136/136). `expo lint` nieuruchamiany (jak w częściach 1–6). Przegląd D-043 (subagent, świeży kontekst, `0cc07bf..HEAD -- apps/mobile/src`): 1×P1 (wyżej, naprawione testem), reszta „bez uwag”.

**Teksty do akceptacji 04/09:** `today.reviews` „Powtórki na dziś”, `today.reviewsDue` „{{count}}”; strona wsparcia (pl, en roboczy; zdanie pomocy en = przekład H-INT-2 do przeglądu treści, D-323).

**Zgłoszenia do 04:** token haptyki dla niedokładności/błędu rozmiaru (dziś token Błędu); promień 12 osi paska (dziś `promien.przycisk` 14).

**Stany do zrzutu (właściciel):** `sesja-decyzja:po-ocenie` jasny/ciemny (oś 44 pt z obrysem, trójkąt nad wyborem, podpisy pod segmentami; także AX3 i strategia z udziałem 0–5%); karty md/lg (promień 8, cień); talia czterokolorowa (karo niebieskie, trefl zielony); „Dziś” z powtórkami (wiersz „Powtórki na dziś”, wartość liczba). Telefon: haptyka po ocenie — Zgodna/Dopuszczalna lekkie stuknięcie, Błąd ostrzeżenie; zimny start bez błysku tła między ekranem startowym a „Dziś”.

**Szkic workflow publikacji (NIE w repo, czeka na zgodę właściciela, D-308):** `.github/workflows/pages.yml` jak Trening (`on: push: branches: [main], paths: ['site/**', '.github/workflows/pages.yml']` + `workflow_dispatch`; `permissions: contents: read, pages: write, id-token: write`; kroki `actions/checkout@v5` (`persist-credentials: false`), `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4` z `path: site`, `actions/deploy-pages@v4` w środowisku `github-pages`). Przed dodaniem: zdjąć strażnik D-308 w `strona.test.mjs` (zmiana testu za zgodą), wpisać W-04 zamiast `[DO USTALENIA]`, przegląd D-043 (ścieżka `.github/workflows/`).

### Zostaje
- NISKIE A04-14 (akceptacja, bez zmian), A04-15 (ustawienia jako listy grupowane), A04-17 (układ ekranu zakupu), A04-18 (z tokenami siatek 08-F27b) → 1.0.1 albo przy kolejnej sesji interfejsu.
- K-10: publikacja (zgoda właściciela, D-308), fakty W-04 (adres poczty, administrator), przekład strony na ja/pt-BR/fr/zh-Hant (09), `ADRES_PRYWATNOSCI` w `platform/adresy.ts` po publikacji (K-09).
- E2E zmian tej sesji po pushu (flowy 01/06 dotykają paska i „Dziś”).

## Naprawy — sesja S (2026-11-09, rola 08 build)
Rola `08-programista --tryb build`: `add_repo lkarwowski494/prompts` odrzucone przez klasyfikator trybu auto — pliki roli nieprzeczytane (wyjątek nazwany; tańsza kontrola: zasady roli zapisane w sekcjach Q i R tego planu i w CLAUDE.md, cykl test czerwony → kod → `pnpm run ci` → commit, przegląd D-043 subagentem). Trening czytany z publicznego klonu (2e4b0f8, 2026-11-09). Stan wyjściowy `833ce01`.

| Zadanie | Commit | Test (czerwony przed → zielony po) | Decyzja |
|---|---|---|---|
| K-11 test metadanych sklepu w `pnpm run ci` | 48fa51f | `tests/kontrole/k11-sklep.test.ts` 14 — czerwony na „nauka” (słowo z podtytułu w słowach kluczowych pl, usunięte); mutanty 6/6 zabite | D-334 |
| Nakładka definicji `content/<język>/terms-def.yaml` (otwarte #3 sesji P) | 3f4f57d | content-build `definicje-08` 8 (brak modułu → zielony), aplikacja `definicje-08` 4 (2 czerwone bez zmian w `vocab.ts`/`text.ts`), `przeklad-api.test.mjs` 4 nowe; 35 baz bez zmian | D-335 |
| Flow Maestro ekranu zakupu z ustawień (D-325) | c136413 | `e2e-flowy.test.mjs` (limit 61 ≠ 64) i `workflowy.test.mjs` (76/81) czerwone → zielone; `e2e-ponowienia.test.mjs` 7 → 8 | D-336 |
| K-12 workflow `store-screenshots.yml` (tylko ręcznie, nieuruchamiany) | commit „Workflow zrzutów…” | `dane-pokazowe.test.mjs` 2, `workflowy.test.mjs` 1 nowy | D-337 |

E2E 42601439302 (8f78583, kod R): czerwony po 5 min na infrastrukturze — `pod install` → `rsync … write: Input/output error` w pamięci podręcznej CocoaPods runnera; flowy nieuruchomione, bez naprawy w kodzie (klasa brzegowa). Push tej sesji uruchamia E2E na kodzie R+S (8 flowów).

**Teksty do akceptacji 04:** brak nowych kluczy interfejsu. Reguła promptu przekładu definicji (`REGULA_DEFINICJI`, `przeklad-api.mjs`) — 09.

**Lista telefonu:** ustawienia → „Pełny dostęp” → ekran zakupu (bez „Wróć do lekcji”), „Zamknij” wraca do ustawień; słowniczek po polsku bez zmian (definicje pod terminami).

Przegląd D-043 (subagent, świeży kontekst, `833ce01..e205c0e`): **0×P1**. P2 naprawione od razu (commit „Przegląd D-043 sesji S…”): klucze z prototypu w strażniku definicji (`Object.hasOwn`, test `definicje-08` czerwony → zielony), to samo w walidacji rozmiarów `store-screenshots.yml`, `</dev/null` dla poleceń w pętli `zrzuty-sklepu.sh`. P2 do backlogu: niżej.

### Zostaje
- P2 przeglądu D-043: (a) nakładka definicji wymaga kompletu kluczy — nowy termin z `def` w `terms.yaml` czerwieni `content:build` dla języka z `terms-def.yaml` do nowego przekładu, a zmiana polskiej definicji przechodzi bez sygnału (skrót sha256 tylko w potoku przekładu) → decyzja przy pierwszym przekładzie: zapis skrótu źródła w pliku albo ostrzeżenie zamiast błędu; (b) `termDefRevealsName` nie zna nazw lokalnych (ja/zh, fala 1); (c) `store-screenshots.yml` sprawdza tylko format kodów języków — dodać kontrolę względem `WYDANE`; (d) przy `aplikacja_z_przebiegu` wypisać SHA przebiegu źródłowego (zgodność lekcji z danymi pokazowymi).
- K-12: pierwsze uruchomienie `store-screenshots.yml` (zgoda koordynatora; minuty macOS) i ocena zrzutów; ryzyko: okno „Otworzyć w …?” po `simctl openurl` (Trening zamyka je akcją Maestro `dialogi`) — jeśli wyjdzie, dodać akcję; ekran decyzji z oceną (sesja) wymaga akcji Maestro; bogatsze dane pokazowe (odpowiedzi, seria, powtórki) przez `zacznijAktywnosc`/`zapiszKrok`; ramki i podpisy — decyzja 04/właściciela; en pokaże tekst polski do wydania en.
- K-11: tekst sklepu ja/pt-BR/fr/zh-Hant (K-04) — test obejmie je automatycznie (pętla po lokalizacjach); mapa §2 sprawdza punkty pl i en-US.
- D-335: pierwszy przekład `terms-def.yaml` w przebiegu API en (K3/K5, po sekrecie); ekran słowniczka nadal pokazuje polskie nazwy terminów także w en (P-2 słowniczka — 09/04).

## Treść K-02 — sesja N (2026-11-09, rola 06 build, plan-1.0 K-02)

Wejście: 3 czerwone testy `pnpm test:akceptacja` (`docs/wydanie/dowody/stan-2026-11-09.txt`). Prompt roli: `node tools/assemble.mjs 06-tresci --tryb build` (repo prompts, 2026-11-09). Naprawiana treść, testy bez zmian.

| Test | Przyczyna | Zmiana | Decyzja |
|---|---|---|---|
| AK-BR-KURS-003-b | brak pola `lesson` w 162 terminach | `lesson` w każdym wpisie `content/terms.yaml` (pierwsza lekcja z terminem w tekście; 35 ręcznie z kontekstu; 7 terminów tylko słownikowych → lekcja tematu) | D-311 |
| AK-BR-CWI-005-b | „ICM nie zna …” zamiast „nie uwzględnia …”; egzamin m11 bez ograniczenia modelu | m11.l3: „nie uwzględnia pozycji, rosnących blindów ani umiejętności”; m11.exam.q7: zdanie o ograniczeniu + R-M11-008; cytat „Limitations of ICM” (GTO Wizard, odczyt 2026-11-09) w `source` R-M11-008 | D-312 |
| AK-BR-KURS-005-a | wynik reguły 2 i 4 bez słowa „przybliżenie” (m2.l1, m7.l3, egzamin m2) | „(przybliżenie)” / „w przybliżeniu” przy każdym wyniku reguły; zdanie we wstępie sekcji „Reguła 2 i 4” | D-313 |
| 10-D01-01 (WYSOKIE, dodatek koordynatora) | `purchase.unlocks` obiecywał „scenariusze” (F-12 poza 1.0) | tekst z `sklep.md` §4 + test `zakup-tekst-10.test.ts` (czerwony → zielony) | D-315 |
| F-17, F-26 (NISKIE) | czekały na akceptację 06 | zaakceptowane bez zmian treści; ryzyko `uklad.ts:27` (każda akcja ≠ fold → „przebija”) dla 05/08 | D-314 |

Dowody: `pnpm test:akceptacja` exit 0, 14/14 (było 11/14); `pnpm content:build` exit 0 (44 lekcje, 162 terminy); `pnpm run ci` exit 0 (2026-11-09, po poprawkach weryfikacji); niezależna weryfikacja zmienionych zdań subagentem (świeży kontekst): POPARTE poza `set` (→ m4.l1), `stakes` (→ m3.l3 + znacznik) i zdaniem m11.l3 „dobre przybliżenie…” (zawężone) — poprawione; ponowny przegląd zastępczy t:bankroll i t:risk-of-ruin (pole `lesson` zmieniło skrót, D-157): 0 rozbieżności, nowe `przeglad.sha`.

### Zostaje
- 05/08: `lesson` z opcjonalnego na wymagane w `TermEntry` (D-221 „potem wymagane”; zmienia test `terminy-lekcja-08.test.ts:9`).
- 06 po 1.0: 7 terminów tylko słownikowych (D-311) wpisać do lekcji tematu albo zostawić jako słowniczek.
- 06/07: `m2-l1-outy.md` „Skąd te liczby”: liczby „2 punkty procentowe” i „10” outów wpisane ręcznie, nie przez `{{n:}}` (rachunek się zgadza: 10 outów, 2 karty: 40% wobec 38,39%) — NISKIE.
- Przekład: zmienione zdania pl (m2.l1, m3.l3, m7.l3, m11.l3, egzaminy m2 i m11) wchodzą do K-03 przed zamrożeniem K4.

## Naprawy — sesja T (2026-11-09, rola 08 build)
Rola `08-programista --tryb build` złożona `tools/assemble.mjs` (repo `prompts`, odczyt 2026-11-09). Trening z publicznego klonu (2e4b0f8, 2026-11-09). Stan wyjściowy `7a697da`: `pnpm run ci` zielony poza moim testem w toku (`uklad-08`, przebieg równoległy z pisaniem testu — wyjątek nazwany jak w sesji R), mobile 531/533.

| Zadanie | Realność | Commit | Test (czerwony przed → zielony po) | Decyzja |
|---|---|---|---|---|
| 1. `uklad.ts:27` każda akcja ≠ fold → „przebija” | teoretyczne (9 spotów 6-max: tylko fold/raise; push/fold i 9-max już dziś null), poprawka tania | 6a031b1 | `uklad-08` „akcja bez stanu stołu” (przed: HJ:call → „przebija”); strażnik ścieżek `spots.yaml` (zielony od początku) | D-338 |
| 2. m2.l1 „Skąd te liczby”: „2 pp” i „10” na sztywno (+ to samo w R-M2-002 `because`) | realne (zasada techniczna CLAUDE.md), rachunek się zgadzał | 0e03d1d | content-build `regula-blad-08` 2 (przed: brak kluczy, liczby na sztywno); rejestr D-141 5 wpisów, przeliczenie niezależne 0 rozbieżności | D-339 |
| 3. `lesson` wymagane w `TermEntry` | realne (nowy termin bez lekcji przechodził schemat) | 317b30c | `terminy-lekcja-08` (przed: „expected true to be false”); zmiana testu z powodem w komentarzu | D-340 |
| 4. P2 sesji S (a)–(d) | (a) teoretyczne dziś — brak `content/*/terms-def.yaml`; (b) brzegowe, fala 1 ja/zh; (c) sprzeczne z obecnym zamierzeniem: `jezyki` domyślnie `pl,en`, en celowo przed wydaniem (`store-screenshots.yml:8,17`); (d) brzegowe | — | — | backlog niżej |

Pełny zestaw po zmianach: `pnpm run ci` kod 0 — mobile 533/533, content-build 144/144, skrypty 143/143, `i18n:kod` 0 błędów; `pnpm content:build` 35 baz (44 lekcje, 141 reguł, 829 liczb, 162 terminy). `expo lint` nieuruchamiany (jak w częściach 1–6).

Przegląd D-043 (subagent, świeży kontekst, diff sesji T): **brak uwag P0/P1** — identyfikatory modułów, lekcji, zadań, egzaminów, reguł, zakresów i terminów w bazie pl identyczne przed i po; błąd reguły przeliczony dla trzech sytuacji (maksimum turn → river); żaden test nie osłabiony.

**Teksty do akceptacji 04/06:** brak nowych kluczy interfejsu; zdania m2.l1 i R-M2-002 bez zmiany brzmienia po polsku (liczby z `numbers.yaml`). Przekład: zmienione źródło m2.l1 i R-M2-002 → K-03.

**Lista telefonu:** m2.l1 „Skąd te liczby” pokazuje „ok. 2 punkty procentowe … nie więcej niż 10” jak dotąd; stół w zadaniach zakresów bez zmian.

### Zostaje
- P2 sesji S: (a) skrót źródła w `terms-def.yaml` albo ostrzeżenie → przy pierwszym przekładzie definicji (K-03/K5 en); (b) nazwy lokalne w `termDefRevealsName` → przekład ja/zh-Hant (fala 1); (c) kontrola kodów języków względem `WYDANE` → po wydaniu en (dziś zablokowałaby zamierzony zrzut en); (d) SHA przebiegu źródłowego w zrzutach → 1.0.1.
- Stan stołu „sprawdza”/„all-in” (D-338, odrzucona opcja) — tylko gdy dojdą ścieżki z `call`, z tekstem i makietą od 04.
- E2E zmian tej sesji po pushu.

## Koordynacja (decyzja właściciela 2026-11-08 ok. 20:20 UTC)
Od teraz sesja koordynująca tylko zleca, odbiera wyniki i archiwizuje; pracę robią osobne sesje. Prompt koordynatora: `docs/programista/koordynator.md`.

| UTC | Sesja | Zdarzenie / wynik (dowód) | Następny krok |
|---|---|---|---|
| 20:25 | koordynator `session_01T66VBzPr7MhGZ3A6RPdfBG` | E2E 42519763480 (36a8600) w toku od 20:22; 42518976066 (66d947f) anulowany pushem 36a8600 | wynik ok. 21:00 (pobudka `trig_01GBCqcFtBUcX3KLhabMfre1`, 21:01) |
| 20:25 | A `session_01T66VBzUhonnhbrrrh9E2P8` | start: część 6 krok 7 (PanelDecyzji, session.tsx), opcjonalnie krok 8; push kodu po 21:05 | odbiór PRZEKAZANIA |
| 21:01 | koordynator | E2E 42519763480 (36a8600) **zielone**; dowód D-273: `workflow_dispatch` z `aplikacja_z_przebiegu=42519763480` → przebieg 42523112301, tytuł „E2E iOS · aplikacja z innego przebiegu” (grupa współbieżności osobna dla push i dispatch) | wynik D-273 ok. 21:20 |
| 21:12 | A | PRZEKAZANIE: krok 7 66317c9 (D-277), krok 8 75895ea (D-278), docs bbada0b, e80d5fc — commity na gałęzi sprawdzone (`git log 22e819c..`); `pnpm run ci` 0, mobile 422 (deklaracja sesji); otwarte 08-F29 (`PierwszeUruchomienie` na `TableFelt`), limit szerokości tytułów od AX1 (D-122) | A zarchiwizowana 21:12 |
| 21:12 | B `session_01T66VBvkWxicAoRBbcPFPfL` | start: część 6 krok 9 (E2, mutacje, zrzuty, 08-F26–F29); E2E 42523567101 (bbada0b, kod kroków 7–8) w toku od 21:07 | odbiór PRZEKAZANIA |
| 21:24 | koordynator | **D-273 dowód zielony**: 42523112301 — kroki prebuild, CocoaPods, kompilacja „skipped”, aplikacja z 42519763480, flowy zielone bez ponowienia, 21:02–21:22 (20,5 min); wpis w D-273 | E2E 42523567101 ok. 21:50; B w toku |
| 21:53 | koordynator | E2E 42523567101 (bbada0b, kod kroków 7–8) **zielone** (status sprawdzony; 7/7 wg sesji B) | — |
| 21:54 | B | PRZEKAZANIE: 13606f6 (testy z mutacji, 37/42 zabitych; M29–M32 → 08-F21, M40 → zrzut), 22b0509, 5528e82 (E2 części 6, D-279); `pnpm run ci` 0, mobile 425 (deklaracja); nowy E2E 42527158545 (5528e82) w toku od 21:50 | B zarchiwizowana 21:54 |
| 21:54 | C `session_01T66VBxCAqcnX91pPjSgHEM` (tylko docs) | start: `docs/programista/zgloszenia-08.md` (08-F15–F29, lista zrzutów) | odbiór PRZEKAZANIA; kolejka kodu pusta do decyzji rannej (pkt 8 koordynator.md) |
| 22:35 | koordynator | E2E 42527158545 (5528e82 = szczyt kodu, testy z mutacji) **zielone** | — |
| 22:35 | C | PRZEKAZANIE: 274ce6d — `docs/programista/zgloszenia-08.md` (15 zgłoszeń, 14 otwartych; WYSOKIE tylko 08-F20; zrzuty scalone: 32 stany / 64 pliki); uwaga spoza zakresu: legenda `PaintGrid.tsx:153–156` poza tłumaczeniami | C zarchiwizowana 22:36 |
| 22:36 | D `session_01T66VBvnpc5MYpiv8AJqTGT` | start: 08-F29 (`TableFelt` → `Stol` w ocenie poziomu) teraz zamiast w części 7 — decyzja koordynatora wg D-272 (mała poprawka spójności z D-274/D-275), zapis D-280 przez sesję; koniec najpóźniej 03:30 | odbiór PRZEKAZANIA, E2E po pushu |
| 23:28 | D | PRZEKAZANIE: 8362e14 (08-F29, `Stol` w ocenie poziomu, D-280), 6ea86fa, b8f05fc; E2E 42531461257 (6ea86fa) **zielone** — status sprawdzony | D zarchiwizowana 23:28; kolejka kodu pusta do decyzji rannej |

### Raport nocy D-272 (2026-11-08 20:20 → 23:30 UTC; koordynator)
**Zrobione (commity na `claude/sleepy-brahmagupta-2065nu`, sprawdzone `git log`):**
- Część 6 krok 7 — 66317c9 (`PanelDecyzji`, `session.tsx` bez kolorów przejściowych); krok 8 — 75895ea (Literata 600, ładowanie z limitem 3 s); krok 9 / E2 — 13606f6 (testy z mutacji), 22b0509, 5528e82. Część 6 przyjęta (D-279).
- 08-F29 — 8362e14 (ocena poziomu rysuje `Stol`), D-280.
- `docs/programista/zgloszenia-08.md` — 274ce6d (08-F15–F29, wagi, lista zrzutów).

**Dowody E2E (status sprawdzony przez koordynatora w Actions):** 42519763480 (36a8600) zielone; 42523567101 (bbada0b, kroki 7–8) zielone; 42527158545 (5528e82) zielone; **42531461257 (6ea86fa, szczyt kodu) zielone**. D-273: 42523112301 — build pominięty, flowy zielone, 20,5 min. `pnpm run ci` kod 0, mobile 425 — deklaracje sesji (CI lokalne, nie powtarzane przez koordynatora).

**Decyzje do weta:** D-273 (szybsze E2E z aplikacją z innego przebiegu), D-274 (plan części 6), D-275 (terminologia stołu), D-276 (E2 części 5b), D-277 (panel decyzji; teoria bez paska; nagłówek „Dobrze”/„Tym razem nie”), D-278 (krój w czasie działania, bez wtyczki w `app.json` — odstępstwo od Treningu), D-279 (E2 części 6), D-280 (08-F29 teraz zamiast w części 7).

**Czerwone:** brak. **Otwarte:** 08-F20 polityka prywatności (WYSOKIE: blokuje App Store, nie TestFlight) i 08-F23 adres poczty — fakty właściciela `[DO USTALENIA]`; 5 mutantów przeżywa (M29–M32 → test renderu ekranu sesji, 08-F21 do roli 07; M40 → zrzut); D-122: limit szerokości tytułów od AX1 i dzielenie wyrazów; legenda `PaintGrid.tsx:153–156` poza tłumaczeniami (04/09); 08-F15–F28 do ról 04/05/06/07 (`zgloszenia-08.md`).

**Kroki właściciela:** (1) odpowiedź na pytanie poranne (dane do 08-F20/F23, weta, następny krok); (2) telefon: U-2 ochrona tła, U-5 zakupy w piaskownicy; (3) zrzuty: 32 stany × jasny/ciemny = 64 pliki (lista w `zgloszenia-08.md`).
| 04:00 | koordynator → właściciel | pytanie poranne: fakty 08-F20/F23 „zostaw [DO USTALENIA]”, D-273–D-280 bez weta, następny krok „audyt roli 04” — zapis D-281 (W) | — |
| 04:01 | E `session_01T66VBzTvgU6XNMwtZcUYr1` | start: audyt zgodności roli 04, ekrany 5b i 6 (tylko docs; pytania produktowe w PRZEKAZANIU) | odbiór PRZEKAZANIA, potem sesja napraw 08 |
| 04:05 | właściciel | „Zatwierdzam decyzje nocne zgodnie z rekomendacją” (dopisane do D-281); `koordynator.md` przepisany na 2026-11-09 (tryb dzienny, plan 24 h) | /clear z promptem koordynatora |
| 04:43 | E | PRZEKAZANIE: c725588 (tylko docs: `docs/design/audyt-5b-6.md`, D-282–D-284, stany w `zgloszenia-08.md`) — commit na gałęzi sprawdzony; WYSOKIE: A04-01 (karty rywala bez opisu/podpisu), A04-02 (surowe kody kart w ocenie poziomu), A04-03 (brak ogłoszeń VoiceOver na iOS); ŚREDNIE A04-04–A04-11; wyjątek: prompt roli 04 nieprzeczytany (repo `prompts` niedostępne z sesji) | pytania produktowe → właściciel |
| 04:45 | koordynator → właściciel | 08-F16b mapa kursu „Na «Dziś»”, licznik „Tylko na starcie” — zapis D-285 (W) | sesja F (08 fix), sesja G (09 E0, docs); prompty ról składane przez koordynatora i podawane w `append_system_prompt` (obejście braku dostępu do `prompts`) |
| 04:45 | F `session_01T66VBzMLnodx2FBJpiXS22` | start: naprawy audytu roli 04 (`08-programista --tryb fix`, A04-01–A04-11 + 08-F25; 1–3 obowiązkowe), jeden push kodu → E2E; przy braku dostępu do `prompts` prosi koordynatora o tekst roli | odbiór PRZEKAZANIA, E2E |
| 04:45 | G `session_01T66VBwFD7fPs82ncqiSGwB` (tylko docs) | start: rola 09 E0 — `docs/lokalizacja/plan-09.md`, opcje drugiego języka z rekomendacją | pytanie do właściciela (pkt 5, poz. 6); E zarchiwizowana 04:45 |
| 04:47 | F | prośba: brak dostępu do `prompts` (add_repo odrzucone przez klasyfikator trybu auto, klon bez logowania) — koordynator wysłał skrócony tekst roli 08 fix (wyjątek nazwany: bez modułu sqlite-expo i listy DEV; odstępstwa: gałąź robocza, E0/E2 bez czekania na właściciela) | stała naprawa: repo `prompts` w ustawieniach środowiska (krok właściciela) |
| 05:28 | F | stan pośredni (nie PRZEKAZANIE): A04-01–A04-09 + 08-F25 — commity 7ba70ac…327af22 na gałęzi sprawdzone (`git log d8dc2b2..`); `pnpm run ci` 0, mobile 453 (deklaracja); push kodu 05:15 → E2E 42566410755 w toku; zostaje A04-10, A04-11 (bez pushu kodu do wyniku E2E) | wynik E2E ok. 06:00, PRZEKAZANIE F |
| 05:28 | G | 9a8f28d `docs/lokalizacja/plan-09.md` (D-286–D-289); właściciel odpowiedział bezpośrednio w sesji G: D-291 (W) drugi język = en, D-292 (W) 35 języków w aplikacji jak Trening, storefront kraju dopiero po zapisanym sprawdzeniu legalności (zmienia OP-15) — 4fe6caf; G ma już `prompts` w źródłach | PRZEKAZANIE G; pkt 6 planu (wybór języka) zamknięty przez D-291 — zostaje pytanie o start roli 09 w kodzie po F |
| 06:05 | właściciel | „Pracuj dalej sam do 15.00” — D-296 (W): tryb samodzielny do 14:00 UTC; decyzje D-293–D-295 (W) podjęte w sesji G (P-2/P-3, przekład przez API jak Trening, limit 15 USD, legalność krajów przez agenta) | — |
| 06:05 | F | E2E 42566410755 próba 1 czerwona — nie kod: pobieranie Maestro `curl (56) 504` po buildzie; F ponowiła job (próba 2 od 06:01, pełny build; status sprawdzony: in_progress) | wynik ok. 06:44; potem A04-10/11 |
| 06:06 | G | PRZEKAZANIE: 9a8f28d, 4fe6caf, a294b95, 48352a2, 7591235, e65645a (docs + 1 linia CLAUDE.md, wyjątek nazwany); E1 roli 09 = plan-09 §11 (K1 po A04-10/11 → K2 mechanizm i K3a narzędzie API w kodzie → K4 glosariusz → sekret `ANTHROPIC_API_KEY` = krok właściciela po `--szacuj` ≤ 15 USD → K3/K5 przekład w 3 falach → K6–K8); do weta D-286–D-289 | G zarchiwizowana 06:06 |
| 06:06 | F | zapowiedź: próg kontekstu — A04-10/11 nie zaczyna (duża zmiana: PaintGrid, RangeGrid, PlayingCard, RenderErrorScreen, _layout, uklad.ts, ~20 kluczy); oddaje po E2E 06:44 | nowa sesja kodu I: A04-10/11 wg plan-08 „Zostaje”, potem rola 09 K2 |
| 06:06 | H `session_01T66VBxMLFJRZTSHCbVpm8A` (tylko docs) | start: legalność storefrontu US (D-295 pkt 2, plan-09 §12) → `docs/wydanie/legalnosc/US.md` | odbiór PRZEKAZANIA |
| 06:17 | H | PRZEKAZANIE: 874ef9f (`docs/wydanie/legalnosc/US.md`, D-297 — czeka na akceptację właściciela wg D-295 pkt 2; OP-16 zamknięte); rekomendacja US „włączyć warunkowo”: W1 zdanie o anulowaniu subskrypcji na EkranZakupu (10-US-01/02 → 04/08), W2 adres polityki prywatności, W3 NFR-ZGOD-003/OG-01, W4 test marek na treści en; otwarte: CA BPC §17602 (403), reguła FTC, 48 stanów + DC | H zarchiwizowana 06:17 |
| 06:17 | J `session_01T66VByopy81mAitB9rdpuW` (tylko docs) | start: legalność JP, CA, GB (wzór US.md; commit po każdym kraju) | odbiór PRZEKAZANIA |
| 06:21 | właściciel → J | D-298 (W): storefronty wg dostępności aplikacji konkurencji (iTunes Lookup API, 102 aplikacje × storefronty); J przekierowana z JP/CA/GB na `docs/wydanie/konkurencja/storefronty.md` | odbiór PRZEKAZANIA J |
| 06:40 | J | PRZEKAZANIE: 5f3a218 (`legalnosc/JP.md`, D-299), ee1e7ba (`docs/wydanie/konkurencja/`: top 25 + 10 gier na żetony × 174 storefronty, 0 błędów, 0 USD; D-300) — commity sprawdzone | J zarchiwizowana 06:40 |
| 06:40 | koordynator → właściciel | D-301 (W): 166 storefrontów (D-300), US i JP przyjęte z warunkami W1–W4, J1–J2 | warunki: 10-US-01/02, 10-JP-01 → kolejka kodu (EkranZakupu) po A04-10/11; 10-JP-02 dane sprzedawcy → właściciel/rola 10 |
| 06:49 | F | PRZEKAZANIE: A04-01–A04-09 + 08-F25 (7ba70ac…327af22, eee2464), docs 1059c01, 6286869, af71a5e, 3ea0d80; `pnpm run ci` 0, mobile 453 (deklaracja); **E2E 42566410755 bez dowodu**: build zielony ×2, krok Maestro czerwony ×2 (curl 504, maestro.zip) — flowy nieuruchomione; do weta D-290; nowe F-SOLVER-CZAS (test solvera 59 s / limit 60 s) | F zarchiwizowana 06:49 |
| 06:49 | koordynator | `workflow_dispatch` e2e-ios.yml z `aplikacja_z_przebiegu=42566410755` (szybki dowód flowów A04-01..09, ~20 min; decyzja koordynatora wg D-296, opcja B sesji F) | wynik ok. 07:10 |
| 06:49 | I `session_01T66VBzRvcm2jJpwtAj5SFw` | start: A04-10, A04-11, 10-US-01/02 + 10-JP-01 (EkranZakupu, D-301), F-SOLVER-CZAS (180 s), ponowienie pobrania Maestro w e2e-ios.yml (D-043); jeden push kodu → E2E pełny | odbiór PRZEKAZANIA |
| 06:56 | K `session_01T66VBw3RwmyfzPFPWqDWFH` (tylko docs) | start: plan wydania 1.0 (`docs/wydanie/plan-1.0.md`, rola 10 E0; D-302: pl + en + kilka największych języków; pomiar `pnpm test:akceptacja`, szacunek z datą) | odbiór PRZEKAZANIA |
| 07:07 | K | PRZEKAZANIE: 523a041 (`docs/wydanie/plan-1.0.md`, dowody `stan-2026-11-09.txt`, D-303–D-305) — commit sprawdzony; pomiar: `test:akceptacja` 3/14 czerwone (treść, rola 06: KURS-005-a, CWI-005-b WYSOKIE; KURS-003-b), i18n:kod 10 błędów (A04-10); **data wysłania 1.0: 24.11–05.12, najpewniej ok. 27.11 [OCENA]**; języki 1.0: pl, en, ja, pt-BR, fr, zh-Hant (D-303); do pytania 14:00: P-1 F-12 w 1.1, P-2 adres polityki (GitHub Pages), W-03 kwota API 30–40 USD; kolejka kodu: po I → K-02 treść → rola 09 K1–K8 → K-04 języki | K zarchiwizowana 07:07 |
| 07:07 | L (tylko docs) | start: polityka prywatności pl/en (projekt), odpowiedzi App Privacy, rekomendacja hostingu (08-F20, P-2) — bez publikacji | odbiór PRZEKAZANIA |
| 07:23 | koordynator | E2E dispatch 42575336076 (aplikacja z 42566410755, kod A04-01..09) **zielone** 06:48–07:11 — dowód flowów (status sprawdzony; nie liczy się do bramki TestFlight) | — |
| 07:23 | L | PRZEKAZANIE: 7a8052f (`docs/wydanie/polityka-prywatnosci/` pl/en + README, `docs/wydanie/app-privacy.md`) — commit sprawdzony; do weta D-307 (App Privacy „No data collected”), D-308 (GitHub Pages z `site/` przez Actions, 0 USD); zgłoszenia 10-PRYW-01 (ŚREDNIE, `app.json:23` FileTimestamp 3B52.1) dla 08, 10-PRYW-02 (NISKIE) dla 05; Support URL w ASC wymagany → `support.html` blokuje wysyłkę; kroki właściciela: zgoda D-308, W-04 dane administratora, potem scalenie + Settings → Pages | L zarchiwizowana 07:23 |
| 07:23 | I | push kodu 07:15 (b8eb0a2, D-306) → E2E 42578171401 (pełny build) w toku | wynik ok. 07:58; odbiór PRZEKAZANIA I |
| 07:58 | koordynator | E2E 42578171401 (push b8eb0a2, kod sesji I: A04-10, A04-11, 10-US-01/02, 10-JP-01, F-SOLVER-CZAS, Maestro) **zielone** 07:15–07:47 (status sprawdzony) — dowód dla A04-01..11 | odbiór PRZEKAZANIA I (sesja się wybudziła 07:56) |
| 07:58 | M `session_01T66VBwYvyUhawCAhDJ5XKQ` (tylko docs, rola 10) | start: plan-1.0 §4.2 D-01 (tekst sklepu pl/en, notatki dla recenzenta, nazwa en ze sprawdzeniem zajętości) i D-02 (kategoria wiekowa, OP-18) | odbiór PRZEKAZANIA M |
| 07:59 | I | PRZEKAZANIE: 1eb4df7 (A04-10), 00e0cb2 (A04-11), f6182d5 (10-US-01/02, 10-JP-01), 302ce3c (F-SOLVER-CZAS 180 s), 965231c (Maestro: 3 próby + pipefail), docs b8eb0a2, 11fbc19 — commity na gałęzi sprawdzone; E2E 42578171401 zielone; do weta D-306 (zdanie o anulowaniu, `errors.render.*`); otwarte: warunki zwrotów Apple [DO USTALENIA], 10-JP-02, zrzuty zakup:plany jasny/ciemny + VoiceOver karty i siatka | I zarchiwizowana 07:59 |
| 07:59 | N `session_01T66VByH8W6anihYjqyR6Ed` (kod/treść, rola 06) | start: K-02 — 3 czerwone testy akceptacyjne (KURS-005-a, CWI-005-b WYSOKIE; KURS-003-b), jeden push na koniec → E2E | odbiór PRZEKAZANIA N; potem rola 09 K1–K8 |
| 08:13 | M | PRZEKAZANIE: 77ba939 (D-01: `store/app-store-metadata.json` pl/en-US, `store/review-notes.md`, `docs/wydanie/sklep.md`; D-309 nazwa en „Poker School: Learn Strategy”, podtytuł „Practice decisions, no betting”; zajętość: iTunes Search API 08:00–08:03), b844733 (D-02: D-310 Simulated Gambling = None, OP-18 zamknięte; rekomendacja override 18+, B: 13+), 56bb784 — commity sprawdzone; zgłoszenia 10-D01-01 WYSOKIE (purchase.unlocks obiecuje „scenariusze”, F-12 poza 1.0) → przekazane N, 10-D01-02 ŚREDNIE (brak wiersza „Pełny dostęp” w ustawieniach) → kolejka kodu; otwarte: 18+ a potwierdzanie wieku w krajach (przed D-06) | M zarchiwizowana 08:13 |
| 08:13 | O `session_01T66VBwTFuVEVTdKPjsZ5gy` (tylko docs, rola 10) | start: legalność storefrontów VN, potem TR (D-300/D-301) → `docs/wydanie/legalnosc/VN.md`, `TR.md`; włączenie = decyzja właściciela | odbiór PRZEKAZANIA O |
| 08:18 | N | PRZEKAZANIE: 7585362 (K-02: `test:akceptacja` 14/14, było 11/14; D-311–D-314), 3c8bcfd (10-D01-01: purchase.unlocks bez scenariuszy, D-315; test zakup-tekst-10) — commity sprawdzone; push → E2E 42584822763 (pending 08:17); uwaga: push M ze `store/` uruchomił E2E 42583966961 (store/ poza paths-ignore) — zostanie anulowany przez 42584822763; otwarte: `lesson` wymagane w TermEntry (05/08), ryzyko `uklad.ts:27` („przebija” dla każdej akcji ≠ fold), m2.l1 „2 pp” i „10” ręcznie (NISKIE), 7 terminów słownikowych po 1.0 | N zarchiwizowana 08:18 |
| 08:18 | P `session_01T66VBz2PGWPmMDihAbfJDV` (kod, rola 09) | start: K-03 K1–K4 (mechanizm, narzędzie API bez płatnego przebiegu, `--szacuj`, glosariusz en); bez pushu kodu przed końcem E2E 42584822763 (~08:57); opcjonalnie `store/**` do paths-ignore | odbiór PRZEKAZANIA P; wynik E2E ok. 08:57 |
| 08:41 | koordynator | stan: E2E 42584822763 (3c8bcfd, kod N) in_progress od 08:17; O wypchnęła 7814d21 (VN: „nie teraz”, D-316), pracuje nad TR; P pracuje (K-03), bez pushu | pobudka 09:00 (wynik E2E) |
| 09:01 | koordynator | E2E 42584822763 (3c8bcfd, kod N: K-02, 10-D01-01) **zielone** 08:17–08:55 (status sprawdzony) — nowy szczyt kodu z dowodem; P powiadomiona, że może pushować kod | — |
| 09:01 | O | PRZEKAZANIE: 7814d21 (VN.md, D-316 „nie teraz”), 1a17ec8 (TR.md, D-317 „włączyć warunkowo” W1–W4 + T1 odczyt mevzuat.gov.tr — z kontenera niedostępne, krok właściciela 10–15 min albo sesja z innym dostępem; T2 dane sprzedawcy z J2) — commity sprawdzone; obie do akceptacji właściciela (D-295 pkt 2) → pytanie 14:00 | O zarchiwizowana 09:01; pas docs pusty (zadania docs z plan-1.0 §4.2 zależą od kodu/dnia wysyłki) |
| 09:11 | P | PRZEKAZANIE: 13 commitów 1fd0543…4cd4a4d (K1 i18n:kod 0; K2a–e D-318–D-323: text.pl.ts→klucze, terminy wg języka, nakładki `content/<język>/` spots i helplines, baza wg języka, kontrola (a) w rejestrze; K3a `scripts/i18n/` + 2 workflowy ręczne, twardy limit 15 USD; K4 glosariusz 162 terminy; przegląd D-043: 0 KRYT/WYS, 4 ŚREDNIE + 2 NISKIE naprawione) — gałąź na 4cd4a4d sprawdzona; push 09:09 → E2E 42591233527 w toku; `--szacuj`: en ≈ 13,27 USD (najgorszy 29,07; 3 przebiegi < 15), ja+pt-BR+fr+zh-Hant ≈ 55,21 USD (> ocena D-303 30–40 → W-03); otwarte: klucz `ANTHROPIC_API_KEY` + workflowy ręczne widoczne tylko z gałęzi domyślnej (scalenie albo uruchomienie lokalne — pytanie 14:00), definicje `def` bez przekładu (propozycja nakładki terms-def w K5), ŚREDNIE 08: przemontowanie przy zmianie języka, podwójna kopia bazy | P zarchiwizowana 09:11 |
| 09:11 | Q `session_01T66VBwigMVRuadbpvi4XMo` (kod, rola 08) | start: ŚREDNIE z przeglądu P (przemontowanie, podwójna kopia bazy), 10-D01-02 (wiersz „Pełny dostęp”), 10-PRYW-01 (app.json), `store/**` w paths-ignore, potem K-06/K-07; bez pushu kodu przed końcem E2E 42591233527 (~09:50) | wynik E2E → wiadomość do Q; odbiór PRZEKAZANIA Q |
| 09:55 | koordynator | E2E 42591233527 (4cd4a4d, kod P: K-03 K1–K4) **zielone** 09:09–09:50 (status sprawdzony) | — |
| 09:55 | Q | PRZEKAZANIE: push 09:54 e6565f0..0cc07bf — 93ffa6f, 12a6f2e (D-324: zmiana języka bez przemontowania, jedna kopia bazy), 09ef667 (D-325: wiersz „Pełny dostęp”, 10-D01-02), fe753a6 (D-326: 10-PRYW-01), f4dd163 (D-327: `store/**` w paths-ignore), 0cc07bf (D-328: pętla render→changeLanguage, P1 z przeglądu D-043, błąd sprzed sesji), 5b2a24c docs — commity sprawdzone; `pnpm run ci` 0 (deklaracja); E2E 42596932204 w toku od 09:54; 3×P2 w plan-08; otwarte: tekst settings.fullAccess (04/09), zrzuty `ustawienia` i `zakup` z ustawień, flow Maestro /purchase (07) | Q zarchiwizowana 09:55 |
| 09:55 | R `session_01T66VBz9C3RWoCDDAAJvk2z` (kod, rola 08) | start: 3×P2, K-06, K-07, potem K-10 pliki `site/` bez wdrożenia (D-308 czeka); bez pushu kodu przed końcem E2E 42596932204 (~10:35) | wynik E2E → wiadomość do R; odbiór PRZEKAZANIA R |
| 10:32 | koordynator | E2E 42596932204 (0cc07bf, kod Q: D-324–D-328) **zielone** 09:54–10:29 (status sprawdzony) | — |
| 10:32 | R | PRZEKAZANIE: push a5f1b68..8f78583 — f565369 (3×P2 Q, D-329), 4ad72b7 (A04-12, A04-13, D-330), 4b2d3a6 (08-F15, A04-16), abb3325 (08-F24), 52fd4c4 (K-07: mutanty M29–M33 zabite 5/5, D-331), cf039eb (P1 przeglądu D-043: ekran startowy nad ekranem błędu, D-332), 8f78583 (K-10 `site/privacy.html`, `site/support.html` bez publikacji + strażnik „żaden workflow nie publikuje Pages”, D-333) — commity sprawdzone; 08-F22 już było (F); E2E 42601439302 od 10:31; otwarte: pages.yml za zgodą D-308 (szkic w plan-08), W-04, en strony wsparcia roboczy, A04-15/17/18 → 1.0.1, promień osi 14 bez tokenu (04) | R zarchiwizowana 10:32 |
| 10:32 | S `session_01T66VBy7W51Q2tS7XtyAgMA` (kod, rola 08) | start: K-11 test metadanych w CI, nakładka `terms-def` (bez API), flow Maestro /purchase z ustawień, K-12 `store-screenshots.yml` (tylko dispatch, bez uruchomienia); bez pushu kodu przed końcem E2E 42601439302 (~11:10) | wynik E2E → wiadomość do S; odbiór PRZEKAZANIA S |
| 11:04 | koordynator | E2E 42601439302 (8f78583, kod R) **czerwone po 5 min — infrastruktura** (wg S: `pod install` → rsync „Input/output error” w cache CocoaPods runnera; flowy nieuruchomione); tail logu sprawdzony — bez kroku kodu; kod R wchodzi do następnego przebiegu | — |
| 11:04 | S | PRZEKAZANIE: push 833ce01..7a697da — 48fa51f (K-11 test metadanych, 14 testów, D-334), 3f4f57d (nakładka `terms-def.yaml`, szacunek en +7,56 USD, D-335), c136413 (flow Maestro 10-zakup-z-ustawien, D-336), e205c0e (K-12 `store-screenshots.yml` tylko dispatch, nieuruchomiony, D-337), 7a697da (P2 przeglądu D-043) — commity sprawdzone; E2E 42605856335 (kod R+S) od 11:03; otwarte: pierwsze uruchomienie zrzutów (minuty macOS, repo publiczne = 0 USD, ~50 min) — decyzja koordynatora po zielonym E2E; P2 do backlogu | S zarchiwizowana 11:04 |
| 11:04 | T `session_01T66VBvQzCaBh3aPDwArugy` (kod, rola 08) | start: ryzyko `uklad.ts:27` („przebija”), m2.l1 liczby → numbers.yaml, `lesson` w TermEntry, tanie P2; bez pushu kodu przed końcem E2E 42605856335 (~11:45) | wynik E2E → wiadomość do T; odbiór PRZEKAZANIA T |
