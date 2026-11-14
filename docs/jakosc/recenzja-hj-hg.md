# Recenzja niezależna HG (07-jakosc, audit) — Szkoła Pokera — 2026-11-14
Commit: ba9a0fa5 (`claude/sesja-hg-ci`) · Zakres: diff b7bc12e6..ba9a0fa5 (11 plików, 9 commitów) · Tryb: audit · Sesja HJ, polecenie `origin/koordynacja:docs/koordynacja/polecenia/HJ.md` @ 87fb31ca
Środowisko: Linux x86_64, Node v22.23.4, pnpm 10.28.0, vitest 5.0.3; GitHub przez MCP (odczyt przebiegów); brak macOS/Xcode (E2E iOS nie uruchamiane, poza zakresem). Raport autora HG nie był wejściem; pliki `docs/jakosc/dowody/hg-*.txt` czytane jako deklaracje do sprawdzenia.

## Werdykt: PRZYJĄĆ Z UWAGAMI
Rozstrzygnął: brak P0/P1 w zakresie, `pnpm run ci` i CI GitHub zielone na ba9a0fa5; 5 uwag P2. Próg projektu: `CLAUDE.md`, „Audyty i wydania” pkt 1 — „wydanie blokują tylko znaleziska KRYTYCZNE i WYSOKIE”. Decyzja D-1650 (`docs/decyzje/HJ.md`).

## Podsumowanie
Wszystkie trzy zmiany HG robią to, co deklarują, i mają dowody odtworzone niezależnie. (1) `e2e-ios.yml` zmienia tylko listę gałęzi push; test łapie 10 z 13 mutantów wyzwalaczy, a przeżywają wyłącznie mutanty fragmentów, których diff nie dotyka (concurrency, tags). (2) Hook w `build.ts` nie zmienia wyniku: 35 baz i 3 moduły generowane są identyczne bajtowo przed i po. Liczba losowań jest deterministyczna, testów jest 43 zamiast 42, a czas nie jest asercją. (3) Test kształtu CI zabija M15, M16 i M20, które przeżywały na teście sprzed zmiany, oraz 8 dalszych mutantów. Uwagi P2 dotyczą siły testów i dokumentacji, nie wyniku.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 07-jakosc-301 | P2 | D | Kontrola zastępcza „czasy są wypisywane” niewidoczna w domyślnym przebiegu testów | otwarte |
| 07-jakosc-302 | P2 | D | Usunięcie wywołania hooka `naStartKontroliSzablonu` nie czerwieni żadnego testu | otwarte |
| 07-jakosc-303 | P2 | D | Nagłówek `e2e-ios.yml` nadal opisuje push na `integration/**` i `claude/**` | otwarte |
| 07-jakosc-304 | P2 | D | `concurrency` w `e2e-ios.yml` bez testu (mutanty M8, M9 przeżywają) | otwarte |
| 07-jakosc-305 | P2 | P | Próg losowań globalny: sc-13 może urosnąć ~2×, mniejsze szablony kilkanaście razy bez czerwieni | otwarte |

## Komendy (każda osobno)
| Komenda | Kod wyjścia | Wynik (liczby) | Uwagi |
|---|---|---|---|
| `pnpm install --frozen-lockfile` | 0 | Done in 5s | lockfile bez zmian |
| `node --test tests/narzedzia/workflowy.test.mjs` (ba9a0fa5) | 0 | tests 30, fail 0 | dowody/hj-zad1-e2e-mutanty.txt |
| `pnpm content:build` ×2 (z build.ts po i przed) | 0, 0 | 35 baz, sumy sha256 identyczne (38 plików) | dowody/hj-zad2-build.txt §A |
| `npx vitest run test/build.test.ts` ×2 (ba9a0fa5) | 0, 0 | Tests 43 passed (43) | przed (b7bc12e6): 42 passed |
| `vitest … -t "budżecie losowań" --silent=false` ×2 | 0, 0 | 18 szablonów, liczby identyczne; sc-13 365 903 081 | dowody/hj-zad2-build.txt §B |
| `pnpm run ci` (ba9a0fa5) | patrz dowody/hj-ci-pelne.txt | — | jeden proces, bez innych ciężkich przebiegów |
| CI GitHub, przebieg 43530873449 (push, ba9a0fa5) | success | — | `actions_list` 2026-11-14 |

## Linia bazowa i założenia
Ryzyka od zera dla zakresu: (a) bramka E2E przestaje działać tam, gdzie jest potrzebna, czyli przed TestFlight; (b) zmiana w ścieżce wrażliwej `tools/content-build/` (D-043) zmienia bazy treści; (c) nowy test budżetu przechodzi, choć nic nie mierzy (licznik zero albo zły zakres); (d) test kształtu CI nie łapie łagodzenia porażek; (e) liczba testów maleje. Wymiary: bramki CI — sprawdzone (zad. 1, 3); niestabilne testy — sprawdzone (determinizm losowań, czas bez asercji); siła testów — sprawdzone (24 mutanty łącznie); dane testowe z prawdziwych plików — nie dotyczy zakresu; platforma/E2E, dostępność — nie dotyczy zakresu (bez zmian aplikacji); dowody wydania — nie dotyczy (to nie kandydat do wydania). Wzorzec: Trening @ 2d97581 — `.github/workflows/e2e-ios.yml:17-20` (push tylko `main` i gałąź integracyjna) i bramka bez zegara (`tests/matrix-data-fuzz.test.ts`, wg D-1622). Zmian w rejestrze założeń nie proponuję.

## Pokrycie
| Obszar / pliki | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `.github/workflows/e2e-ios.yml` (cały blok `on`, `concurrency`, nagłówek) | tak | dowody/hj-zad1-e2e-mutanty.txt |
| `tests/narzedzia/workflowy.test.mjs` (3 nowe testy) | tak | dowody/hj-zad1-e2e-mutanty.txt, dowody/hj-zad3-ksztalt-ci.txt |
| `scripts/ci/bramka-e2e.mjs` (czy dispatch liczy się do bramki TestFlight) | tak, odczyt kodu | `scripts/ci/bramka-e2e.mjs:105` (filtr tylko `head_sha`) |
| `tools/content-build/src/build.ts` (hook) | tak | dowody/hj-zad2-build.txt §A, §C |
| `tools/content-build/test/build.test.ts` | tak | dowody/hj-zad2-build.txt §B–E |
| `.github/workflows/ci.yml` | tak (bez zmian w zakresie, mutanty) | dowody/hj-zad3-ksztalt-ci.txt |
| `docs/decyzje/HG.md`, `docs/jakosc/plan-hg.md`, dowody hg-* | odczyt jako deklaracje | liczby HG zgodne z pomiarem HJ |
| E2E iOS na symulatorze | nie (Linux) | poza zakresem polecenia |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/jakosc/recenzja-hj-hg.md . docs/jakosc --rola 07-jakosc` (kopia skryptu w scratchpadzie): OK, kod 0 — pełny wynik w dowody/hj-sprawdz-raport.txt (pierwszy przebieg: 1 błąd, kropka w ścieżce dowodu; poprawione)

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| JAK-01 | dotyczy (ryzyka a–e) | ok: każde ma test lub dowód |
| JAK-02 | dotyczy (próg losowań) | ok: wartość z pomiaru udokumentowanego (rachunek 2 × 365 903 081 = 731 806 162); 07-jakosc-305 |
| JAK-03 | nie dotyczy | brak nowych kryteriów akceptacji produktu w zakresie |
| JAK-04 | dotyczy | 07-jakosc-302, 07-jakosc-304 (przeżyłe mutanty, P2) |
| JAK-05 | dotyczy | ok: losowania deterministyczne, czas bez asercji (`tools/content-build/test/build.test.ts:122` tylko `console.info`) |
| JAK-06, JAK-08, JAK-12, JAK-13, JAK-14, JAK-16 | nie dotyczy | zakres bez logiki dat, parserów, ekranów, lokalizacji i kandydata do wydania |
| JAK-07 | nie dotyczy | brak niezmienników domeny w zakresie |
| JAK-09 | dotyczy | ok: CI GitHub na ba9a0fa5 = 43530873449 success; ci.yml bez zmian |
| JAK-10 | dotyczy | ok: `e2e-ios.yml` bez `pull_request_target`, permissions `contents: read`, `actions: read` (bez zmian) |
| JAK-11 | dotyczy | ok: repo publiczne; zmiana zmniejsza zużycie macOS (gałęzie sesji bez E2E — potwierdzone: brak przebiegu E2E dla `claude/sesja-hg-ci`) |
| JAK-15 | dotyczy | 07-jakosc-301 (deklaracja „czasy są wypisywane”), 07-jakosc-303 (nagłówek) |
| JAK-17 | dotyczy | ok: test „budżet losowań” mierzy losowania (licznik > 0 dla 18 szablonów) |
| JAK-18 | dotyczy | ok: ostatni CI na gałęzi HG zielony; stan `main` poza zakresem polecenia |

## Znaleziska

### 07-jakosc-301 · Kontrola zastępcza „czasy są wypisywane” niewidoczna w domyślnym przebiegu testów
- Pozycja listy kontrolnej: JAK-15
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/build.test.ts:97` „nie łapie wzrostu kosztu jednej próby bez wzrostu liczby losowań; czasy są wypisywane”; w domyślnym `npx vitest run test/build.test.ts` linia `console.info` z `tools/content-build/test/build.test.ts:122` nie pojawia się (grep → 0 w 2 przebiegach), a z `--silent=false` pojawia się (1) — dowody/hj-zad2-build.txt §E
- Mechanizm: vitest 5.0.3 w tym uruchomieniu nie pokazuje konsoli przechodzących testów; nazwane ograniczenie D-1622 ma kontrolę zastępczą, której nikt nie widzi w logu CI
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 7 (pominiętą kontrolę zastępuje tańsza, nie żadna)
- Kroki w aplikacji: brak (narzędzie CI); skutek: wzrost kosztu jednej próby (typ sc-11, sc-34) przejdzie niezauważony
- Opcje: (a) zapis czasów do pliku/`GITHUB_STEP_SUMMARY` — widoczne, +kilka linii; (b) poprawić komentarz na „czasy tylko z `--silent=false`” — tanio, kontrola zostaje ręczna; Rekomendacja: (a)
- Test akceptacyjny: w logu albo podsumowaniu przebiegu CI widać czasy kontroli generatora dla każdego szablonu
- Status: otwarte

### 07-jakosc-302 · Usunięcie wywołania hooka `naStartKontroliSzablonu` nie czerwieni żadnego testu
- Pozycja listy kontrolnej: JAK-04
- Poziom: P2
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant H1 (wywołanie z `tools/content-build/src/build.ts:441` usunięte) → `vitest -t "losowań"` kod 0, Tests 3 passed; liczby narastające, maks. 695 858 837 < 731 806 162 — dowody/hj-zad2-build.txt §C
- Mechanizm: test sprawdza tylko n > 0 i próg; liczba narastająca jest zawsze ≥ rzeczywistej, więc błąd daje wyłącznie fałszywą czerwień (przy ~5% wzroście treści), nigdy fałszywą zieleń
- Powraca: nie
- Wzorzec lub źródło: zasada roli 3 (test ma prawo paść)
- Kroki w aplikacji: brak; skutek: po refaktorze bramka zaczęłaby padać bez jasnej przyczyny
- Opcje: (a) asercja: suma losowań szablonów ≤ licznik całkowity przyrostu w kompilacji, albo znana mała wartość (sc-06 = 102 000) — tanio; (b) zostawić — skutek tylko fałszywa czerwień; Rekomendacja: (a)
- Test akceptacyjny: mutant H1 czerwony
- Status: otwarte

### 07-jakosc-303 · Nagłówek `e2e-ios.yml` nadal opisuje push na `integration/**` i `claude/**`
- Pozycja listy kontrolnej: JAK-15
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `.github/workflows/e2e-ios.yml:7` „push na main i integration/** bez zmian samej dokumentacji”, `.github/workflows/e2e-ios.yml:11-14` „Push także na claude/**”; faktyczny wyzwalacz `.github/workflows/e2e-ios.yml:25` (tylko `main` i gałąź robocza)
- Mechanizm: komentarz przy `on:` zaktualizowany, nagłówek pliku nie; `grep -n "integration/\*\*\|claude/\*\*" .github/workflows/e2e-ios.yml` → 3 trafienia w nagłówku i 1 w nowym komentarzu (opis zastąpienia)
- Powraca: nie
- Wzorzec lub źródło: JAK-15
- Kroki w aplikacji: brak; skutek: mylący opis dla kolejnej sesji
- Opcje: (a) poprawić nagłówek przy najbliższej zmianie workflowu (wymaga przeglądu D-043); (b) zostawić z odesłaniem do D-1620; Rekomendacja: (a)
- Test akceptacyjny: nagłówek opisuje D-1620
- Status: otwarte

### 07-jakosc-304 · `concurrency` w `e2e-ios.yml` bez testu (mutanty M8, M9 przeżywają)
- Pozycja listy kontrolnej: JAK-04
- Poziom: P2
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: usunięty blok `concurrency` (M8) i `cancel-in-progress: false` (M9) → tests 30, fail 0 — dowody/hj-zad1-e2e-mutanty.txt; blok bez zmian w diffie (stan sprzed HG)
- Mechanizm: istniejące testy nie sprawdzają `concurrency`; skutek usunięcia: dwa przebiegi macOS na tej samej gałęzi zamiast anulowania (koszt czasu kolejki, repo publiczne)
- Powraca: nie
- Wzorzec lub źródło: Trening `.github/workflows/e2e-ios.yml` (concurrency identyczne, odczyt 2026-11-14)
- Kroki w aplikacji: brak
- Opcje: (a) dopisać asercję w `workflowy.test.mjs`; (b) backlog bez testu; Rekomendacja: (a) przy najbliższej zmianie testów workflowów
- Test akceptacyjny: M8 i M9 czerwone
- Status: otwarte

### 07-jakosc-305 · Próg losowań globalny: sc-13 może urosnąć ~2×, mniejsze szablony kilkanaście razy bez czerwieni
- Pozycja listy kontrolnej: JAK-02
- Poziom: P2
- Realność: brzegowy · Pewność: średnia
- Rodzaj: P
- Dowód: `tools/content-build/test/build.test.ts:99` próg 731 806 162; sc-13 365 903 081 (zapas 2,0×), sc-01 52 849 136 (13,8×), sc-11 69 783 037 (10,5×) — dowody/hj-zad2-build.txt §B; mutant ×2 sc-13 z dowodu HG: 739 008 841 (o ~1% ponad próg)
- Mechanizm: jeden próg dla wszystkich szablonów, jak wcześniejsze 45 s (D-766); dawny próg dopuszczał ok. 1,4× sc-13 (45 / 32,8 s), nowy 2×. Mutant ×2 jest poprawnym dowodem, że test może paść: zabija go granica ustawiona dokładnie na 2×, a granicę pokrywa też test syntetyczny (`BUDZET+1`). Nie pokazuje jednak czułości: wzrost sc-13 o 1,9× przejdzie. Celem KO-106 jest czas CI, więc próg globalny wystarcza (sc-13 przy 2× to ok. 52–66 s lokalnie przy limicie testu 120 s)
- Powraca: nie
- Wzorzec lub źródło: D-1622; Trening (zegar poza bramką, wg D-1622)
- Kroki w aplikacji: brak
- Opcje: (a) zostawić próg globalny (cel: czas CI) — prosty, zgodny z D-766; (b) próg na szablon (np. 2× pomiar każdego) — łapie regresje małych szablonów, ale wymaga aktualizacji przy każdej zmianie treści; Rekomendacja: (a), zapisać czułość w komentarzu
- Test akceptacyjny: komentarz progu podaje zapas sc-13 i to, że próg nie pilnuje małych szablonów
- Status: otwarte

## Do sprawdzenia
- Skutek D-1620 obejmuje tylko gałęzie z nowym plikiem: GitHub czyta wyzwalacze z pliku w wypchniętym commicie, więc gałęzie sesji od starszej bazy (np. `claude/sesja-hi-przeklady`, przebieg 43526473226 push 2026-11-13) nadal uruchamiają E2E, dopóki nie mają ba9a0fa5. Odczyt na podstawie listy przebiegów; reguła GitHuba nieczytana w dokumentacji dziś `[DO USTALENIA]`.
- TestFlight z gałęzi innej niż `main`/robocza: bramka (`scripts/ci/bramka-e2e.mjs:105`) liczy każdy przebieg po `head_sha`, więc ręczny `workflow_dispatch` E2E wystarcza; bez niego bramka nie znajdzie przebiegu. Workflow jest zarejestrowany (96 przebiegów), więc dispatch z ref sesji działa mimo braku pliku na `main` (git ls-tree origin/main: 0 trafień `e2e-ios.yml`). Nie uruchamiałem dispatch (działanie zewnętrzne).
- M12 (dodane `tags` do push) przeżywa: teoretyczny, projekt nie wypycha tagów.

## Co działa dobrze i należy zachować
- Lista gałęzi push bez wzorców plus stała `GALAZ_ROBOCZA` (`tests/narzedzia/workflowy.test.mjs:412`) i sprawdzenie przykładowych nazw gałęzi sesji przez dopasowanie wzorców GitHuba.
- Zamknięta lista dozwolonych kluczy w `luzneKsztaltyCzesci` (`tests/narzedzia/workflowy.test.mjs:432`) zamiast listy zakazanych: łapie też klucze, o których nikt nie pomyślał (`if`, `continue-on-error` — X1, X2, X5, X6).
- Stały test mutantów w Node (`tests/narzedzia/workflowy.test.mjs:450`): czerwień zostaje w zestawie, nie tylko w dowodzie jednorazowym.
- Licznik losowań przez `vi.mock` tylko w jednym pliku, z tym samym ciągiem liczb: bazy i hashe bez zmian (dowody/hj-zad2-build.txt §A), plus test n > 0, który zabija mutant H2.
- Dowody HG (liczby losowań, 42 → 43 testy) zgadzają się co do sztuki z pomiarem HJ.

## Decyzje dla właściciela
Brak decyzji produktowych. Do weta: D-1650 (werdykt PRZYJĄĆ Z UWAGAMI). Kolejność napraw P2 ustala koordynator (backlog 04).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 07-jakosc --tryb fix --zadania 07-jakosc-301,07-jakosc-302,07-jakosc-303,07-jakosc-304` (P2, backlog; 07-jakosc-305 tylko komentarz progu). Nie blokuje przyjęcia HG.

## git status --porcelain
Na początku: pusto (HEAD ba9a0fa5). Na końcu: tylko nowe pliki HJ w `docs/` (wynik w dowody/hj-ci-pelne.txt i w PRZEKAZANIU).
