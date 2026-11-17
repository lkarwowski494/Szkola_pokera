# Audyt: Jakość (strategia testów, gotowość wydania) — Szkoła Pokera, build 1011 — 2026-11-17
Commit: c266091b93278bba34e5f062a03e9ca586e6f0e5 (kandydat 1011, gałąź robocza `claude/sleepy-brahmagupta-2065nu`) · Zakres: zmiany od buildu 1010 @ 57a83bfe · Tryb: audit (sesja IK, polecenie koordynatora `docs/koordynacja/polecenia/IK.md` @ 39aba28e) · Środowisko: Linux, Node 22, pnpm (`--frozen-lockfile`), Jest; bez macOS, Xcode, symulatora i telefonu (E2E iOS tylko jako przebieg GitHub Actions)

Wyjątek nazwany (zasada wspólna 7, zgłoszony w raporcie startowym): raport w `audit/1011-2026-11-17/raport.md` z ID `IK-NNN` według polecenia, zamiast `audit/07-jakosc-2026-11-17.md` z ID `07-jakosc-NNN` z kontraktu roli; skrypt kontroli uruchamiany z `--rola IK`.

## Werdykt: GOTOWE Z ZASTRZEŻENIAMI (= WYDAĆ, z warunkiem wysyłki)
Commit: c266091b · Kandydat do wydania: ten sam (plus commit tego audytu: tylko `audit/**` i `docs/**`, bez kodu aplikacji) · Rozstrzygnął warunek: „brak otwartych P0 i P1, ale »Nie sprawdzono« albo »tylko telefon« ma pozycje” · Próg projektu: CLAUDE.md:71 „wydanie blokują tylko znaleziska KRYTYCZNE i WYSOKIE”.

Brak znalezisk KRYTYCZNYCH i WYSOKICH. Zastrzeżenia (każde z właścicielem i krokiem):
1. **Warunek wysyłki (dane):** aktualizacja 1010 → 1011 na telefonie z danymi (właściciel; kroki w „Nie sprawdzono”). Wynik z utratą danych zmienia werdykt na ZABLOKOWANE.
2. **E2E iOS na SHA wysyłanego commitu** zielony (bramka `testflight.yml`); przebieg #108 na c266091b: w toku o 01:40 UTC (kompilacja i instalacja zielone, flowy Maestro jeszcze nie ruszyły); poprzednie #104–#107 na gałęzi roboczej zielone; koordynator sprawdza wynik przed dispatchem.
3. **Protokół F buildu 1011** (`docs/jakosc/test-fizyczny/1011.md`, 10 pozycji) wypełnia właściciel po instalacji z TestFlight; zamknięty protokół warunkuje build 1012 i wysyłkę 1011 do recenzji.

## Podsumowanie
Build 1011 dokłada scenariusze całego rozdania (33 szablony, 3 poziomy, ocena po decyzji, głębokość startu KO-117), menu W2 z zakładką „Lekcje” oraz migracje bazy v2 i v3 (`wariant_historia`). Ścieżka danych jest w porządku: migracje transakcyjne z testem z kopii schematu 1010, eksport, import i „Usuń postęp” obejmują nową tabelę i kolumnę, a 1010 po cofnięciu odrzuca nowszą bazę bez jej zmiany. Identyfikatory zadań w powtórkach są stabilne (0 usuniętych), nowych SDK sieciowych ani śledzących brak. Największe ryzyko to brak przebiegu E2E dla scenariuszy (flow 07 czeka od 2026-11-11, IK-001), łagodzone pozycją F PU-027 i testami ekranu w Jest. Katalog PU uzupełniony o PU-023…PU-028, protokół 1011 utworzony.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| IK-001 | ŚREDNIE (P2) | D | Scenariusze, główna nowa funkcja 1011, nie mają ani jednego przebiegu E2E na symulatorze | otwarte, wersja 1013 |

## Linia bazowa i założenia
- E0b, ryzyka od zera (przed lekturą strategii): (R1) migracja v1→v3 psuje albo gubi postęp przy aktualizacji 1010→1011; (R2) eksport 1011 nie obejmuje historii wariantów albo import 1010/1011 kasuje dane; (R3) „Usuń postęp” zostawia historię wariantów (prywatność); (R4) cofnięcie do 1010 po otwarciu bazy przez 1011; (R5) zmiana identyfikatorów zadań w treści osieroca karty powtórek; (R6) błędne liczby w scenariuszu (pula, stos, dopłata, głębokość) ; (R7) awaria lub ekran nie do użycia w scenariuszu przy 320 pt / AX5; (R8) limit dnia omijany albo naliczany podwójnie przez „Zagraj to samo jeszcze raz”; (R9) usunięta zakładka „Powtórki” jako cel nawigacji; (R10) nowa zależność natywna z dostępem do sieci lub śledzeniem.
- Każde ryzyko ma test albo dowód w „Pokryciu”; R7 częściowo (zrzuty web to przybliżenie, telefon w protokole F).
- Założenie: kandydat = c266091b; commit tego audytu dokłada tylko pliki z listy polecenia (dowody, katalog PU, protokół, decyzje).

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| R1 migracje v2, v3 (`packages/postep/src/migracje.ts`, `schemat-v2.ts`, `schemat-v3.ts`) | tak | testy `k02-migracje`, `wariantyHistoria-532`, `wariantyHistoria-cf` (v1→v3 na kopii szablonu v1 z danymi, nieudana v2 wycofana, v2→v3): dowody/test-postep.txt (21 plików, 160 testów, kod 0); schemat v1 bez zmian od 1010 (`git diff 57a83bfe c266091b -- docs/architektura/schemat.sql packages/postep/src/schemat-v1.ts` pusty), więc szablon v1 testów = baza 1010 |
| R2 eksport/import (`packages/domena/src/eksport.ts`, `packages/postep/src/daneUzytkownika.ts`) | tak | `packages/domena/src/eksport.ts:7` tabela w eksporcie, `packages/domena/src/eksport.ts:11` brak tabeli w starym pliku = pusta lista, `wersja_formatu` zostaje 1; testy importu starego pliku bez tabeli i bez kolumny: dowody/test-postep.txt, dowody/test-domena.txt (27 plików, 347 + 1 oczekiwanie nieudany, kod 0) |
| R3 „Usuń postęp” | tak | `packages/postep/src/daneUzytkownika.ts:39` kolejność usuwania zawiera `wariant_historia`, `packages/postep/src/daneUzytkownika.ts:173` pętla usuwania; test `packages/postep/test/wariantyHistoria-532.test.ts:168` (asercja 0 wierszy `wariant_historia` po `usunPostep`), wynik w dowody/test-postep.txt |
| R4 cofnięcie do 1010 | tak (odczyt kodu) | `packages/postep/src/migracje.ts:45` „baza_nowsza” bez zmiany pliku; 1010 importuje eksport 1011 bez błędu (odczyt `git show 57a83bfe:packages/domena/src/eksport.ts`: iteruje tylko swoje 7 tabel), traci tylko historię wariantów |
| R5 identyfikatory treści | tak | dowody/id-tresci-1010-1011.txt: rodziny 181/181, id 573 → 574, 0 usuniętych |
| R6 liczby w scenariuszu | tak (próba własności) | sonda `sonda-liczby-scenariusza.test.ts.txt` (Jest, poza zestawem, usunięta z drzewa po przebiegu): 33 szablony × poziomy (51 przypadków) × 30 ziaren: głębokość startu skończona i 0 < min ≤ max, karty bez powtórzeń, stos > 0, pula > 0, dopłata > 0, < pula i ≤ stos, kwota każdej akcji ≥ 0 i ≤ stos; 51/51, kod 0: dowody/sonda-liczby-scenariusza.txt; poprawność merytoryczna liczb (częstości solvera) poza zakresem (polecenie: bez ponownej oceny decyzji merytorycznych) |
| R7 ekrany scenariusza 320 pt / AX5 | częściowo | zrzuty web `docs/design/dowody/if-*`, `ih-*`, `ij-*` (320/390 × domyślny/AX5, pl i de) obejrzane: if-ocena-blad-320-ax5, ij-de-po-ocenie-320-ax5, ih-decyzja-320-ax5; zachowanie na telefonie: protokół F (PU-027, PU-028) |
| R8 limit i „Zagraj to samo jeszcze raz” | tak | `packages/domena/src/wariant.ts:60` (`czyPowtorkaWariantu`: tylko ostatni wpis zgodnej wersji generatora), testy domeny limitu w dowody/test-domena.txt |
| R9 usunięta trasa `(tabs)/review` | tak | `grep` odwołań do `review` jako trasy w `apps/mobile/src` (poza testami): 0; powiadomienie nie niesie trasy (`apps/mobile/src/platform/powiadomienia.ts:20` tylko tytuł i treść) |
| R10 prywatność, sieć, SDK | tak | dowody/prywatnosc-siec.txt: diff `app.json`/`eas.json` 0 linii, 0 trafień fetch/XHR/WebSocket/analityki w dodanym kodzie, nowe zależności `react-native-svg` 15.16.0 i `react-native-web` (dev) zgodne z Expo |
| Workflowy wydania (`testflight.yml`, `e2e-ios.yml`) | tak (odczyt) | `.github/workflows/testflight.yml:70` krok bramki scenariuszy; e2e na push tylko `main` i gałąź robocza (WG-19) |
| Katalog PU i protokół F | tak | `node scripts/sprawdz-scenariusze.mjs --statycznie` i `--szkielet 1011`: dowody/scenariusze-1011.txt |
| Pełny zestaw | tak | dowody/ci-baza-c266091b.txt (`env -u NODE_PATH pnpm run ci` na c266091b) |
| Aktualizacja 1010 → 1011 na urządzeniu z danymi | nie | brak macOS/telefonu; „Nie sprawdzono” |
| Manifest prywatności nowej zależności natywnej | nie | rola 10 |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs audit/1011-2026-11-17/raport.md . --rola IK` (kopia skryptu z promptu roli w scratchpadzie): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu IK”, kod 0. Sekrety: 0 trafień wzorców. Dowody nie zawierają danych osobowych (logi testów i list identyfikatorów).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| JAK-01 ryzyka wysokie z testem | dotyczy (R1–R10) | ok dla R1–R6, R8–R10; R7 częściowo (telefon: PU-027/028) |
| JAK-02 wyrocznie | dotyczy | nie sprawdzono w całości (audyt zmian, polecenie: bez ponownej oceny decyzji merytorycznych); sonda R6 używa niezmienników (relacje), nie wyników kodu |
| JAK-03 kryteria z testem | dotyczy | ok dla migracji i limitu (testy z ID D-532, KO-043); scenariusz E2E brak → IK-001 |
| JAK-04 testy mogą paść | dotyczy | nie sprawdzono (jeden audyt na wydanie, zakres zmian); bez próby mutacji |
| JAK-05 powtarzalność | dotyczy | ok w zakresie: generator z ziarnem (`packages/domena/src/wariant.ts:35`), testy postep/domena powtórzone osobno = te same liczby |
| JAK-06 daty i strefy | dotyczy (limit dnia) | bez zmian logiki dnia od 1010 w tym zakresie poza wariantem; nie sprawdzono ponownie |
| JAK-07 własności | dotyczy | sonda IK (30 ziaren × 33 szablony × 3 poziomy) |
| JAK-08 dane z zewnątrz | dotyczy (import) | ok: import starego pliku bez tabeli/kolumny i bledny_plik w testach |
| JAK-09 bramka CI bez wyciszania | dotyczy | ok; wyjątek nazwany: `k08 \|\| echo` informacyjny z decyzji (strategia §8.1) |
| JAK-10 bezpieczeństwo workflowów | dotyczy | bez nowych wyzwalaczy `pull_request_target`/`workflow_run` w diffie workflowów od 1010 |
| JAK-11 koszt CI | dotyczy | repo publiczne; bez zmian kosztu poza cache CocoaPods (zmniejsza) |
| JAK-12 E2E głównych przepływów | dotyczy | IK-001 (scenariusze bez przebiegu); pozostałe flowy 01–06, 08–10 w przebiegach #104–107 zielone |
| JAK-13 dostępność tylko narzędziem | dotyczy | ok: Dynamic Type i 320 pt jako F (PU-027, PU-028), zrzuty web nazwane przybliżeniem (D-1915) |
| JAK-14 geo | nie dotyczy (brak lokalizacji w aplikacji) | — |
| JAK-15 deklaracje | dotyczy | patrz „Twierdzenia projektu” |
| JAK-16 jeden SHA | dotyczy | CI GitHub #458 i lokalne CI na c266091b; E2E #108 na c266091b: w toku o 01:40 UTC (kompilacja i instalacja zielone, flowy Maestro jeszcze nie ruszyły); poprzednie #104–#107 na gałęzi roboczej zielone (zastrzeżenie 2) |
| JAK-17 nazwy workflowów | dotyczy | ok (odczyt `e2e-ios.yml`: budowa i symulator) |
| JAK-18 `main` zielony | dotyczy | CI na `main` ostatni przebieg sukces (#276, 2026-11-10); ręczne ASC na `main` padają zgodnie z D-364 (uruchamiane z gałęzi roboczej) |
| JAK-19 bramka scenariuszy | dotyczy | katalog przejrzany (D-1920, D-1921), skrypt `--statycznie` kod 0, próba negatywna na kopii (pusty ekran) kod 1, symulacja `--build 1011 --wykonane` kod 0, protokół 1011 utworzony; scenariuszy A: 0 (wszystkie B/F); protokół 1010 zamknięty (bez pozycji) |

## Znaleziska (szczegóły)

### IK-001 · Scenariusze, główna nowa funkcja 1011, nie mają ani jednego przebiegu E2E na symulatorze
- Pozycja listy kontrolnej: JAK-12
- Poziom: P2 (ŚREDNIE; nie blokuje według CLAUDE.md:71, bo to luka testu, nie defekt widoczny dla użytkownika)
- Realność: realny (luka istnieje) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/e2e/oczekujace/README.md:22` „przebieg na symulatorze: po scaleniu”; flow `07-scenariusz.yaml` leży w `oczekujace/` poza `flows: '*.yaml'`, więc `e2e-ios.yml` go nie uruchamia; katalog PU: PU-011 klasa B z terminem 1013
- Mechanizm: flow napisany przed ekranami (D-189), przeniesienie wymaga zielonego przebiegu na macOS; od 2026-11-11 nikt go nie przeniósł, a scenariusze weszły do buildu
- Powraca: nie
- Wzorzec lub źródło: JAK-12; Trening https://github.com/lkarwowski494/trening/blob/2d97581/docs/37-katalog-przeplywow.md#L3 (odczyt 2026-11-17) (scenariusze automatyczne mają zastąpić testy ręczne)
- Kroki w aplikacji: Dziś → Scenariusze → rozdanie → poziom → decyzje do końca → „Zagraj to samo jeszcze raz”; regresja w tej ścieżce nie zatrzyma bramki E2E
- Opcje: (a) rola 08 uruchamia flow 07 przez `workflow_dispatch` na gałęzi roboczej i przenosi go po zielonym przebiegu — koszt jednego przebiegu macOS; (b) zostaje B do 1013, telefon (PU-027) jako kontrola zastępcza w 1011 i 1012 — taniej, ale ręcznie; Rekomendacja: (a) w buildzie 1012, (b) jako kontrola w 1011
- Test akceptacyjny: flow 07 w `apps/mobile/e2e/`, zielony w `e2e-ios.yml` na SHA buildu; PU-011, PU-023, PU-024 klasa A
- Status: otwarte, proponowana wersja: 1012 (termin bramki 1013)

## Do sprawdzenia (pewność ≤ 80%)
- Czy właściciel ma telefon 320 pt (iPhone SE / mini). Bez niego PU-027 sprawdza tylko szerszy ekran; punkt 9 listy prosi o model telefonu (D-1922).
- D-1912: czy iOS po powrocie z Ustawień odświeża ekran scenariusza po zmianie rozmiaru tekstu (PU-028 na telefonie).
- Teoretyczne: szablon o pojemności 1 wariantu dałby „Nowe rozdanie” rozpoznane jako powtórka (poza limitem); pojemność ≥ 40 pilnuje test `dx-pojemnosc`, więc nie występuje w treści 1011.

## Co działa dobrze i należy zachować
- Migracje v2/v3 każda we własnej transakcji `BEGIN IMMEDIATE` (`packages/postep/src/migracje.ts:57`) i test z kopii schematu poprzedniego buildu.
- Format eksportu bez podnoszenia wersji: tabela opcjonalna (`packages/domena/src/eksport.ts:11`), więc 1010 i 1011 czytają nawzajem swoje pliki bez utraty czegokolwiek poza historią wariantów.
- Powtórka wariantu rozpoznawana w domenie z historii, nie w interfejsie (`packages/domena/src/wariant.ts:60`).
- Bramka scenariuszy na ścieżce buildu (`.github/workflows/testflight.yml:70`) i protokół poprzedniego buildu jako warunek.

## Decyzje dla właściciela
Brak decyzji blokujących. Do weta: D-1920…D-1922 (`docs/decyzje/IK.md`): nowe PU-023…PU-028, klasy i terminy B, punkty 9–10 listy F.

## Proponowane polecenie naprawy
Brak napraw przed wydaniem (zero KRYTYCZNYCH i WYSOKICH). Do backlogu: `node tools/assemble.mjs 08-programista --tryb fix --zadania IK-001` w buildzie 1012.

## Komendy (każda osobno)
| Komenda | Kod wyjścia | Wynik (liczby) | Uwagi (powtórka jednym procesem, czas) |
|---|---|---|---|
| `pnpm install --frozen-lockfile` | 0 | lockfile bez zmian | — |
| `pnpm --filter @szkola/postep test` | 0 | 21 plików, 160 testów | dowody/test-postep.txt |
| `pnpm --filter @szkola/domena test` | 0 | 27 plików, 347 + 1 oczekiwanie nieudany | dowody/test-domena.txt |
| `env -u NODE_PATH pnpm run ci` (łańcuch projektu; każdy krok niżej z osobnym wynikiem w logu) | 0 | wszystkie kroki zielone | dowody/ci-baza-c266091b.txt, 01:01–01:18 UTC |
| ↳ `pnpm typecheck` (9 pakietów) | 0 | 9 × Done | log, linie 8–29 |
| ↳ `pnpm test`: srs / jezyki / poker-core / domena / preflop-solver / postep / content-build / mobile | 0 | 21 / 144 / 349 / 347+1 oczek. / 44 / 160 / 914+1 oczek. / 1769 (172 pliki) | — |
| ↳ `pnpm test:skrypty` | 0 | 229 pass, 0 fail | — |
| ↳ `pnpm test:kontrole` | 0 | 35 testów | — |
| ↳ `pnpm k08` | 0 | informacyjny (`\|\| echo`, strategia §8.1) | wyjątek nazwany |
| ↳ `i18n:kod`, `content:check`, `tresci:rejestr`, `tresci:el-kontrola` | 0 | rejestr 0 błędów, 1 uwaga; el-kontrola 0 braków | — |
| sonda `jest --ci ik-liczby-niezmienniki.test.ts` | 0 | 51/51 | dowody/sonda-liczby-scenariusza.txt |
| `node scripts/sprawdz-scenariusze.mjs --statycznie` (po aktualizacji katalogu) | 0 | PU 28, F 10, funkcje 19, ekrany 15 | dowody/scenariusze-1011.txt |
| `node scripts/sprawdz-scenariusze.mjs --szkielet 1011` | 0 | zapisano `docs/jakosc/test-fizyczny/1011.md` (10 pozycji) | — |
| `node scripts/sprawdz-scenariusze.mjs --build 1011 --wykonane <flowy e2e>` (symulacja kroku `testflight.yml`) | 0 | BRAMKA ZIELONA | E2E nie z tego przebiegu |
| GitHub CI #458 na c266091b | sukces | — | Actions |
| GitHub E2E iOS #108 na c266091b | w toku (01:40 UTC) | — | Actions |
| `env -u NODE_PATH pnpm run ci` na cba97b01 (commit audytu z katalogiem PU, protokołem i raportem) | 0 | mobile 1769/1769, test:skrypty 229/0, rejestr 0 błędów | `audit/1011-2026-11-17/ci-cba97b01.txt`, 01:22–01:40 UTC; następny commit dokłada tylko ten plik i uzupełnienia raportu w `audit/**` (bez wpływu na kod i katalog) |

## Twierdzenia projektu vs stan
| Twierdzenie (plik:linia) | Jak sprawdzone | Potwierdzone / obalone |
|---|---|---|
| `packages/domena/src/konfiguracja.ts:26` „v2 = wariant_historia (D-532), v3 = generator_wersja” | `packages/postep/src/schemat-v3.ts:10` ALTER TABLE, testy migracji | potwierdzone |
| `packages/domena/src/eksport.ts:6` „wersja_formatu zostaje 1” | `packages/domena/src/eksport.ts:14`, test importu starego pliku | potwierdzone |
| `docs/jakosc/test-fizyczny/1010.md:3` protokół 1010 bez pozycji, bo wszystkie F mają „(od buildu 1011)” | katalog PU: PU-014…PU-020, PU-022 z dopiskiem | potwierdzone |
| polecenie IK: „34 szablony” | `getScenarioTemplates` zwraca 33 (sonda), SC-14 poza treścią z decyzji D-1863 | rozbieżność opisu, nie defekt (33 z 34 zgodnie z D-1863) |

## Nie sprawdzono
| Co | Dlaczego (środowisko) | Krok i kto | Wpływ na werdykt |
|---|---|---|---|
| Aktualizacja 1010 → 1011 z danymi na urządzeniu | brak telefonu/symulatora (Linux) | właściciel: na buildzie 1010 zrób lekcję, sesję ćwiczeń i powtórkę, zanotuj liczby z „Postępu”; zainstaluj 1011 z TestFlight; „Postęp” ma te same liczby, Powtórki tę samą liczbę na dziś; Dane → Eksport działa | warunek wysyłki (zastrzeżenie 1) |
| E2E #108 na c266091b | przebieg w toku w chwili raportu | koordynator: wynik przed dispatchem TestFlight | zastrzeżenie 2 |
| Protokół F 1011 | wymaga buildu z TestFlight | właściciel, lista 1–10 w `docs/jakosc/test-fizyczny/README.md` | zastrzeżenie 3 |
| Manifest prywatności `react-native-svg` | poza rolą 07 | rola 10 | brak (przekazanie) |
| JAK-04 próba mutacji | jeden audyt na wydanie, zakres zmian | następny pełny audyt | brak |

## Otwarte P0/P1 innych ról z tego commitu
| ID | Rola | Tytuł | Status |
|---|---|---|---|
| — | — | brak raportów innych ról w `audit/` dla c266091b (WYSOKIE D-1910, D-1911 zamknięte w IJ przed tym SHA) | — |

## Lista wydania (moduł wydanie)
1. Jeden commit: c266091b (CI #458, lokalne CI, E2E #108) — commit audytu dokłada tylko `audit/**`, `docs/**`.
2. Wersja i numer buildu: `apps/mobile/app.json:5` wersja 0.1.0; numer = 1000 + `GITHUB_RUN_NUMBER` (`.github/workflows/testflight.yml:74`), oczekiwany 1011.
3. Pełny zestaw, typecheck, lint: `env -u NODE_PATH pnpm run ci` — patrz Komendy.
4. E2E: #108 na c266091b w toku o 01:40 UTC (kompilacja i instalacja zielone, flowy Maestro jeszcze nie ruszyły); poprzednie #104–#107 na gałęzi roboczej zielone; scenariusze bez przebiegu (IK-001).
5. Aktualizacja z poprzedniej wersji z danymi: krok właściciela (warunek wysyłki).
6. Bramka scenariuszy: katalog z linią `Przegląd: build 1011 @ c266091b`, protokół `docs/jakosc/test-fizyczny/1011.md`, `docs/wydanie/ostatni-build.txt` = 1010 (bez zmiany), protokół 1010 zamknięty. Uwaga: commit z samymi `docs/**` i `*.md` nie uruchamia E2E (`docs/jakosc/test-fizyczny/README.md:16`); commit audytu zawiera `audit/**/*.txt`, które nie są w `paths-ignore`, więc po scaleniu do gałęzi roboczej E2E pobiegnie na SHA scalenia.
7. Zakres zmian: `git log --oneline 57a83bfe..c266091b` = 361 commitów; kod: 158 plików poza testami i zrzutami.
8. Raporty innych ról: brak otwartych P0/P1.
9. Cofnięcie: 1010 odrzuca bazę 1011 jako nowszą bez zmiany pliku (`packages/postep/src/migracje.ts:45`); eksport 1011 czytelny w 1010.
10. Zasady projektu: zamrożenie zakresu (ten audyt nie zmienia kodu aplikacji), próg CLAUDE.md:71.

Co testować (TestFlight): scenariusz od startu do podsumowania na każdym poziomie, „Zagraj to samo jeszcze raz” bez zużycia limitu, AX5 na najwęższym telefonie, aktualizacja z 1010 z danymi.

## git status
Na początku (c266091b, przed zapisem dowodów): pusty. Na końcu (przed ostatnim commitem): ` M audit/1011-2026-11-17/raport.md`, `?? audit/1011-2026-11-17/ci-cba97b01.txt`; pliki śledzone poza listą polecenia nietknięte (`git diff --stat c266091b HEAD` obejmuje tylko `audit/1011-2026-11-17/**`, `docs/jakosc/przypadki-uzycia.md`, `docs/jakosc/test-fizyczny/README.md`, `docs/jakosc/test-fizyczny/1011.md`, `docs/decyzje/IK.md`).
