# Recenzja niezależna: sesja FZ, podział CI (1d2ef3bf..31011f9c) — Szkoła Pokera — 2026-11-13
Commit: 31011f9c (gałąź `claude/sesja-ga-recenzja` od `claude/sesja-fz-ci` @ 31011f9c, zgodny z poleceniem) · Tryb: audit (rola 07, recenzja w świeżym kontekście, D-043, ścieżka wrażliwa „CI i wydanie”) · Zakres: `.github/workflows/ci.yml`, `tests/narzedzia/workflowy.test.mjs` · Środowisko: Linux, Node v22.23.4, pnpm 10.28.0, MCP GitHub (przebiegi i logi CI), push na gałąź roboczą; symulator iOS niepotrzebny w tym zakresie.

Kolejność pracy: najpierw diff i kod, potem przebiegi CI i sondy; dokumenty FZ (`docs/decyzje/FZ.md`) przeczytane dopiero przy sprawdzaniu twierdzeń (JAK-15).

## Werdykt: PRZYJĄĆ Z UWAGAMI
Commit: 31011f9c · Kandydat do wydania: nie dotyczy (zmiana CI, nie wydanie) · Rozstrzygnął warunek: brak otwartych P0/P1; dwa znaleziska P2 · Próg projektu: „wydanie blokują tylko znaleziska KRYTYCZNE i WYSOKIE” (CLAUDE.md, „Audyty i wydania” pkt 1).

| Waga | Liczba |
|---|---|
| KRYTYCZNE (P0) | 0 |
| WYSOKIE (P1) | 0 |
| ŚREDNIE/NISKIE (P2) | 2 |

## Podsumowanie
Podział joba `check` na 4 równoległe części wykonuje w CI dokładnie komendy skryptu `ci` z `package.json`, a `pnpm test` jest rozpisany na wszystkie 8 pakietów ze skryptem `test`, każdy raz. Liczby testów w przebiegu 43389167128 (fb4e6e0f) są równe liczbom z przebiegu 43337711819 (ac2ed2e3) dla każdego pakietu; jedyna różnica (+2 w `test:skrypty`) to dwa nowe testy FZ. Job `check` jest czerwony przy porażce, anulowaniu, pominięciu albo braku dowolnej części: sprawdzone krokiem `jq` na 7 kombinacjach i na żywo przebiegiem z celowo czerwonym testem (sekcja „Sonda na żywo”). Test rozjazdu zabił 16 z 20 mutantów; przeżyły trzy łagodzenia przez semantykę powłoki lub środowiska kroku (`set +e`, `shell: bash {0}`, `env`) i jedna poprawna, spójna zmiana nazwy pakietu. Decyzji właściciela nie ma; dwie decyzje techniczne do weta (D-1530, D-1531).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 07-jakosc-001 | P2 | D | Test rozjazdu porównuje tekst linii `pnpm …`, a nie skutek kroku: `set +e`, `shell: bash {0}` i `env` kroku łagodzą bramkę bez czerwieni | otwarte |
| 07-jakosc-002 | P2 | D | Rejestr D-1520 podaje „9 pakietów z testami”, jest 8 | otwarte |

## Komendy (każda osobno)
| Komenda | Kod wyjścia | Wynik (liczby) | Uwagi |
|---|---|---|---|
| `pnpm install --frozen-lockfile` | 0 | zależności z blokady | — |
| `node --test tests/narzedzia/workflowy.test.mjs` | 0 | 27/27 | dowody/ga-workflowy-test.txt |
| `mutanty.sh` na kopii (worktree @31011f9c) | 0 (skrypt) | 20 mutantów: 16 zabitych, 4 przeżyło | dowody/ga-mutanty-rozjazdu.txt (skrypt w pliku) |
| krok `check` (wyciągnięty z ci.yml) pod `bash -e` z 7 wariantami `NEEDS_JSON` | 0 tylko dla 4× success | 1 zielony, 6 czerwonych | dowody/ga-check-agregat.txt |
| `pnpm --filter @szkola/nieistnieje test` | 0 | „No projects matched the filters” | dowody/ga-pnpm-filter.txt; ryzyko pokryte testem (M18) |
| logi przebiegów 43337711819 i 43389167128 (zip z API) | — | tabela niżej | dowody/ga-liczby-testow-ci.txt |
| przebieg sondy (czerwony test w srs) | — | sekcja „Sonda na żywo” | dowody/ga-sonda-check.txt |

### Zadanie 1: równoważność zestawu kontroli
Skrypt `ci` (`package.json`): `pnpm typecheck && pnpm test && pnpm test:skrypty && pnpm test:kontrole && pnpm k08 && pnpm i18n:kod && pnpm content:check && pnpm tresci:rejestr && pnpm tresci:el-kontrola`. `pnpm test` = `pnpm -r --if-present test`; w obu przebiegach „Scope: 9 of 10 workspace projects” (korzeń wyłączony), z czego `@szkola/content-schema` nie ma skryptu `test` (dowody/ga-pnpm-filter.txt), więc pakietów z testem jest 8.

| Komenda / pakiet | Job (31011f9c) | Przebieg 43337711819 (ac2ed2e3) | Przebieg 43389167128 (fb4e6e0f) |
|---|---|---|---|
| `pnpm typecheck` | ci-kontrole | ok (w `pnpm run ci`) | krok success |
| `@szkola/content-build` | ci-testy-tresci | 76 plików, 748 + 1 expected fail (749) | 76 plików, 748 + 1 expected fail (749) |
| `@szkola/poker-core` | ci-testy-silnik | 37, 310 | 37, 310 |
| `@szkola/preflop-solver` | ci-testy-silnik | 9, 44 | 9, 44 |
| `@szkola/mobile` (jest) | ci-testy-aplikacja | 137 zestawów, 1395 | 137 zestawów, 1395 |
| `@szkola/domena` | ci-testy-aplikacja | 27, 347 + 1 expected fail (348) | 27, 347 + 1 expected fail (348) |
| `@szkola/postep` | ci-testy-aplikacja | 21, 160 | 21, 160 |
| `@szkola/srs` | ci-testy-aplikacja | 3, 21 | 3, 21 |
| `@szkola/jezyki` | ci-testy-aplikacja | 6, 144 | 6, 144 |
| `pnpm test:skrypty` | ci-kontrole | 202 | 204 (+2: nowe testy FZ w `workflowy.test.mjs`; zakres ac2ed2e3..fb4e6e0f nie zmienia innych testów) |
| `pnpm test:kontrole` | ci-kontrole | 6 plików, 35 | 6 plików, 35 |
| `pnpm k08` | ci-kontrole | „K-08: pakiety natywne 40, z manifestem 7…” | to samo |
| `pnpm i18n:kod`, `pnpm content:check`, `pnpm tresci:rejestr`, `pnpm tresci:el-kontrola` | ci-kontrole | ok | kroki success |

Każda komenda występuje w częściach dokładnie raz (multizbiór sprawdzany testem, mutanty M1–M6). Bez łagodzenia: w `ci.yml` brak `continue-on-error`, `|| true` i `if` w częściach (`.github/workflows/ci.yml:24-99`); jedyne `|| echo` to `k08` wewnątrz skryptu `package.json`, niezmienione względem `pnpm run ci` (informacyjne z decyzji, strategia §8.1). Flagi poleceń bez zmian (regex `^pnpm --filter \S+ test$`, mutant M13 zabity). Różnica semantyczna: `pnpm -r` przerywa po pierwszym czerwonym pakiecie, a w części kolejne kroki też się nie wykonają (`bash -e`); bramka bez zmian, mniej informacji przy porażce tak jak wcześniej.

Czas: stary krok `pnpm run ci` 12 min 28 s przy limicie 15 (dowody/ga-liczby-testow-ci.txt); nowy przebieg 8 min 07 s, najdłuższa część `ci-testy-tresci` 7 min 40 s w kroku testów.

### Zadanie 2: job `check` jako bramka
| Przypadek | Wynik | Dowód |
|---|---|---|
| wszystkie 4 części success | check success | dowody/ga-check-agregat.txt; przebieg 43389167128 |
| jedna część failure | check failure | dowody/ga-check-agregat.txt; sonda na żywo |
| jedna część cancelled | check failure | dowody/ga-check-agregat.txt |
| jedna część skipped | check failure | dowody/ga-check-agregat.txt; mutant M19 (`!= "failure"`) zabity |
| brak części w `needs` (3 zamiast 4) | check failure (`length == 4`) | dowody/ga-check-agregat.txt; mutant M11 zabity |
| `check` bez `always()` | test czerwony (M10) | GitHub Docs: pominięty job raportuje „Success” (cytat w D-1520, nie sprawdzałem drugi raz źródła; zachowanie zgodne z dokumentacją Actions) |
| `pull_request`, `workflow_dispatch`, `push` | wyzwalacze bez zmian (`.github/workflows/ci.yml:5-10`), diff dotyczy tylko sekcji `jobs` | `git diff 1d2ef3bf..31011f9c` |
| `permissions` | bez zmian: `contents: read` na poziomie workflowu (`.github/workflows/ci.yml:13-14`), części bez własnych uprawnień | diff |
| `persist-credentials` | `false` w każdym checkoutcie części (`.github/workflows/ci.yml:31`, `.github/workflows/ci.yml:54`, `.github/workflows/ci.yml:70`, `.github/workflows/ci.yml:87`); `check` bez checkoutu | grep |
| `concurrency` | bez zmian (`.github/workflows/ci.yml:16-18`) | diff |
| dane zdarzeń w `run:` | `toJSON(needs)` przez `env`, nie wprost w skrypcie (`.github/workflows/ci.yml:111`) | JAK-10 ok |

### Zadanie 3: test rozjazdu, mutanty
Pełna lista z kodami: dowody/ga-mutanty-rozjazdu.txt (plik). Zabite: M1 usunięcie komendy, M2 usunięcie pakietu, M3 komenda tylko w `package.json`, M4 komenda tylko w `ci.yml`, M5 nowy pakiet z testem bez kroku, M6 dubel pakietu, M7 `|| true`, M8 `continue-on-error`, M9 `if: false` na części, M10 `check` bez `always()`, M11 część usunięta z `needs`, M12 `jq` bez `-e`, M13 dodatkowa flaga, M14 limit 30 min, M18 literówka w nazwie pakietu, M19 słabszy warunek `jq`. Przeżyły: M15 (`set +e` + końcowe `true`), M16 (`shell: bash {0}` i dwie komendy w jednym `run`), M20 (`env: CI: false` na kroku testów) → 07-jakosc-001; M17 (spójna zmiana nazwy pakietu w obu miejscach) to poprawne zachowanie, nie luka.

## Sonda na żywo
SONDA_WYNIK

## Twierdzenia projektu vs stan
| Twierdzenie (plik:linia) | Jak sprawdzone | Potwierdzone / obalone |
|---|---|---|
| ci.yml: części „łącznie wykonują dokładnie komendy skryptu `ci`” (`.github/workflows/ci.yml:21`) | tabela zadania 1, mutanty M1–M6 | potwierdzone |
| D-1520: „dla każdego z 9 pakietów z testami” (`docs/decyzje/FZ.md:6`) | `pnpm -r exec`: 8 pakietów ze skryptem `test` | obalone (liczba), 07-jakosc-002 |
| D-1521: „Czerwień na 7 mutacjach” | niezależne mutanty M1–M20 | potwierdzone kierunkowo; moja próba szersza |
| ci.yml: „check czerwony przy każdym wyniku części innym niż success” (test, `tests/narzedzia/workflowy.test.mjs:390`) | dowody/ga-check-agregat.txt, sonda | potwierdzone |

## Nie sprawdzono
| Co | Dlaczego (środowisko) | Krok i kto | Wpływ na werdykt |
|---|---|---|---|
| Czy `check` jest wymaganym statusem w regułach gałęzi `main` | MCP GitHub w tej sesji nie ma odczytu reguł ochrony gałęzi | właściciel: Settings → Rules/Branches; jeśli wymagany jest stary `check`, nazwa zachowana, nic do zmiany | brak (nazwa joba bez zmian) |

## Otwarte P0/P1 innych ról z tego commitu
| ID | Rola | Tytuł | Status |
|---|---|---|---|
| — | — | brak raportów innych ról dla 31011f9c | — |

## Linia bazowa i założenia
Od zera, przed czytaniem decyzji FZ: ryzyka takiej zmiany to (1) komenda albo pakiet wypada z CI i bramka przepuszcza czerwony kod, (2) agregat raportuje sukces, gdy część padła, została anulowana lub pominięta, (3) zmiana uprawnień albo tokena przy okazji, (4) rozjazd lokalnego `pnpm run ci` i CI z czasem (nowy pakiet, nowa komenda), (5) test pilnujący rozjazdu sam nie potrafi paść. Najlepsza praktyka (wzorzec agregatu `needs` + `always()` i sprawdzenie wyników, Trening `nightly.yml`, linie 141–142, odczyt 2026-11-13 z klonu @2d97581): agregat wymaga jawnie `success` każdej części, a lista części jest pilnowana testem, nie ręcznie.

Wymiary pokrycia: rejestr ryzyk — 5 ryzyk wyżej, każde z dowodem; wyrocznie — liczby z niezależnych przebiegów CI i semantyka `jq` pod `bash -e`, nie z kodu testu; dane testowe — prawdziwe logi CI; platforma — nie dotyczy (bez E2E w zakresie); dostępność — nie dotyczy; bramki CI — zadania 1–2; niestabilne testy — sprawdzone, brak (oba przebiegi zielone, te same liczby); siła testów — 20 mutantów; dowody wydania — nie dotyczy (zmiana CI). Soczewki: programista, który doda pakiet (M5 zabity); sceptyk szukający testu, który nie może paść (M15, M16, M20 przeżyły). Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `.github/workflows/ci.yml` (cały plik, nie tylko diff) | tak | czytanie, dowody/ga-check-agregat.txt |
| `tests/narzedzia/workflowy.test.mjs` (dodane funkcje i 2 testy) | tak | dowody/ga-workflowy-test.txt, dowody/ga-mutanty-rozjazdu.txt |
| `package.json` (skrypty `ci`, `test`, `k08`), `pnpm-workspace.yaml`, `package.json` pakietów | tak | dowody/ga-pnpm-filter.txt |
| logi CI obu przebiegów | tak | dowody/ga-liczby-testow-ci.txt |
| reguły ochrony gałęzi `main` | nie | „Nie sprawdzono” |
| pozostałe workflowy (`e2e-ios.yml` itd.) | poza zakresem | — |

## Kontrola dowodów i sekretów
SPRAWDZ_WYNIK

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| JAK-01 | nie dotyczy: zmiana CI, bez nowego ryzyka produktu | — |
| JAK-02 | nie dotyczy: brak testów domenowych w zakresie | — |
| JAK-03 | nie dotyczy: brak kryteriów akceptacji w zakresie (KO-101 sprawdzone w zadaniach 1–3) | — |
| JAK-04 | dotyczy (test rozjazdu) | 07-jakosc-001 (P2) |
| JAK-05 | dotyczy | ok: test czyta pliki, bez czasu i losowości; dwa przebiegi CI z tymi samymi liczbami |
| JAK-06 | nie dotyczy: brak logiki dat | — |
| JAK-07 | nie dotyczy: brak domeny | — |
| JAK-08 | nie dotyczy: brak parserów danych z zewnątrz | — |
| JAK-09 | dotyczy | ok: te same komendy co lokalnie, bez wyciszania; 07-jakosc-001 jako luka kontroli |
| JAK-10 | dotyczy | ok: `permissions` bez zmian, `persist-credentials: false`, `toJSON(needs)` przez `env`; akcje `actions/*` i `pnpm/action-setup@v5` bez zmian względem 1d2ef3bf |
| JAK-11 | dotyczy | ok: repo publiczne, standardowe runnery bez opłat (komentarz `.github/workflows/ci.yml:4`); 5 jobów Linux zamiast 1 zwiększa liczbę minut, nie koszt |
| JAK-12 | nie dotyczy: bez E2E w zakresie | — |
| JAK-13 | nie dotyczy | — |
| JAK-14 | nie dotyczy | — |
| JAK-15 | dotyczy | 07-jakosc-002 (P2) |
| JAK-16 | nie dotyczy: nie wydanie | — |
| JAK-17 | dotyczy | ok: `check` agreguje, nazwy części odpowiadają zawartości |
| JAK-18 | dotyczy częściowo | ok dla tej gałęzi (43389167128 zielony); stan `main` poza zakresem polecenia |

## Znaleziska (szczegóły)

### 07-jakosc-001 · Test rozjazdu nie wykrywa łagodzenia przez semantykę powłoki lub środowiska kroku
- Pozycja listy kontrolnej: JAK-04 (siła testu), powiązane JAK-09
- Poziom: P2
- Realność: teoretyczny (wymaga celowej zmiany w ścieżce wrażliwej, która przechodzi przegląd D-043) · Pewność: wysoka
- Rodzaj: D
- Dowód: dowody/ga-mutanty-rozjazdu.txt, M15, M16, M20 „PRZEŻYŁ (kod 0, fail 0)”. `komendyCzesci` bierze tylko linie zaczynające się od `pnpm ` (`tests/narzedzia/workflowy.test.mjs:363-366`), a test braku łagodzenia sprawdza `continue-on-error` i `if` kroków, nie `shell`, `env` ani inne linie `run`.
- Mechanizm: porównanie tekstu komend zamiast kształtu kroku; `grep -n "l.startsWith('pnpm ')" tests/narzedzia/workflowy.test.mjs` → 1 trafienie: `tests/narzedzia/workflowy.test.mjs:366`.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 07 nr 3 (test ma prawo paść); GitHub Actions uruchamia `run` bez `shell` jako `bash -e {0}`, więc `set +e` albo `shell: bash {0}` wyłącza przerwanie na błędzie (dokumentacja Actions, `jobs.<job_id>.steps[*].shell`; z pamięci, nieodczytane dziś — wniosek potwierdza mutant tylko na poziomie testu, nie w CI).
- Kroki w aplikacji: brak drogi przez interfejs; skutek: bramka CI mogłaby przepuścić czerwony test po takiej zmianie.
- Opcje: (a) test wymaga kształtu kroku w częściach: każdy krok to `uses` albo `run` z jedną linią, bez kluczy `shell`, `env`, `working-directory`, `timeout-minutes` — kilka linii testu, łapie M15, M16, M20; (b) zostawić, kontrolą zastępczą jest przegląd D-043 każdej zmiany `ci.yml` — zero kosztu, kontrola ludzka. Rekomendacja: (a) przy następnej zmianie `ci.yml` (decyzja D-1531).
- Test akceptacyjny: mutanty M15, M16, M20 ze skryptu w dowody/ga-mutanty-rozjazdu.txt czerwone; M1–M14, M18, M19 dalej czerwone; M17 zielony.
- Status: otwarte

### 07-jakosc-002 · Rejestr decyzji podaje złą liczbę pakietów z testami
- Pozycja listy kontrolnej: JAK-15
- Poziom: P2
- Realność: realny (fałszywa liczba w rejestrze), bez wpływu na bramkę · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/decyzje/FZ.md:6` „dla każdego z 9 pakietów z testami”; dowody/ga-pnpm-filter.txt: 9 pakietów w obszarze roboczym, 8 ze skryptem `test` (`@szkola/content-schema` bez); `ci.yml` ma 8 kroków `--filter … test`.
- Mechanizm: pomylenie „9 of 10 workspace projects” (zakres `pnpm -r`) z liczbą pakietów z testem; `grep -rn "9 pakiet" docs/decyzje/FZ.md docs/jakosc/fz-ci-podzial.md .github/workflows/ci.yml` → 1 trafienie: `docs/decyzje/FZ.md:6`.
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 2 i 17 (sprawdź liczby)
- Kroki w aplikacji: brak
- Opcje: (a) poprawić liczbę w D-1520 na 8 — jedna linia; (b) zapisać erratę w rejestrze GA bez zmiany wpisu FZ. Rekomendacja: (a) przez sesję FZ albo koordynatora (rejestr FZ nie jest mój).
- Test akceptacyjny: `docs/decyzje/FZ.md` D-1520 podaje 8 pakietów.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Zachowanie `check` przy anulowaniu przebiegu przez `concurrency` (nowy push na tę samą gałąź): `always()` uruchamia `check` także w anulowanym przebiegu, więc superseded commit może dostać czerwony `check` zamiast szarego „cancelled”. To szum wizualny, nie luka bramki (czerwień jest bezpieczna). ANULOWANIE_WYNIK Alternatywa `!cancelled()` (wzór Trening `e2e-ios.yml`, linia 126) dałaby pominięty `check`, a pominięty wymagany status liczy się jak sukces, więc `always()` jest bezpieczniejsze (D-1530).

## Co działa dobrze i należy zachować
- Agregat wymaga `success` każdej części i liczby części (`length == 4`), a nie tylko braku `failure`: łapie `skipped` i `cancelled` (M19, M11).
- Test rozjazdu wylicza pakiety z `pnpm-workspace.yaml`, więc nowy pakiet z testem bez kroku CI czerwieni `pnpm run ci` lokalnie i w hooku pre-push (M5). To też zamyka lukę `pnpm --filter <brak> test` z kodem 0 (dowody/ga-pnpm-filter.txt, M18).
- `toJSON(needs)` przez `env` zamiast interpolacji w skrypcie; brak checkoutu w `check`.
- Lokalnie nadal jedna komenda `pnpm run ci`; CI nie ma własnej listy kontroli poza testowanym rozpisaniem.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje techniczne GA (do weta, `docs/decyzje/GA.md`): D-1530 (werdykt PRZYJĄĆ Z UWAGAMI i utrzymanie `always()` w `check`), D-1531 (07-jakosc-001 do backlogu z terminem „przy następnej zmianie `ci.yml`”, 07-jakosc-002 do poprawki w rejestrze FZ).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 07-jakosc --tryb fix --zadania 07-jakosc-001,07-jakosc-002` (P2, nie blokuje scalenia; termin z D-1531).
