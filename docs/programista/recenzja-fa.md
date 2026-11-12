# Audyt: Programista — Szkoła Pokera — 2026-11-12 (recenzja niezależna FA zmian EY)
Commit: 105ed456 (zakres kodu 7e667066..0ef0fcc0, 5 commitów EY: d9e28a48, a3b18da2, c20f9467, c6e575c0, 0ef0fcc0) · Tryb: audit (recenzja na polecenie koordynatora FA) · Środowisko: Linux 6.18, Node v22.23.4, pnpm 10.28.0, 4 rdzenie; bez Xcode i symulatora iOS (ekranu nie oglądałem, zmiana nie dotyka widoków). Specyfikacja czytana jako wymagania: `docs/tresci/stan-ev.md` (08-EV-1…5), `docs/decyzje/EV.md` (D-1285…D-1289), recenzja EZ (`origin/sesja-ez-recenzja:docs/tresci/recenzja-ez.md`, 06-tresci-001). `docs/decyzje/EY.md` przeczytałem dopiero po własnej ocenie; wcześniej jeden wiersz (D-1312) wypadł przypadkiem w wyniku `grep` przy szukaniu 06-tresci-001.

## Podsumowanie
**Werdykt: PRZYJĘTE Z ZASTRZEŻENIAMI.** Brak znalezisk KRYTYCZNYCH i WYSOKICH, więc nic nie blokuje scalenia ani wydania testowego (próg z `CLAUDE.md`). Rachunek zgadza się ze specyfikacją. SDV = (W + ½T)/N jest w `packages/poker-core/src/scenario-gen.ts:1001`. Turn-bet przyjmuje tylko czyste outy (zbiór wygrywających = zbiór nominalnych, 0 remisów), a progi to N/46 > cena małego i N/44 < cena dużego (`packages/poker-core/src/scenario-gen.ts:725-738`). `pnpm run ci` na 105ed456: kod 0 (`dowody/fa-ci-105ed456.txt`). 8 z 10 mutantów zabitych (`dowody/fa/mutanty-wynik.txt`). Limit 20 000 nie zmienia odcisków, a w kontekście aplikacji zmiana EV-4 też nie: 0 różnic na 1400 wariantach (`dowody/fa/odciski-ev4.txt`). Identyfikatory powtórek w 35 bazach treści: jedyna zmiana to dodane `m5.l4.c-oop` (`dowody/fa/porownanie-db.txt`). Najważniejsze zastrzeżenie: gałąź odrzucenia wariantu przy remisie na riverze w EV-2 nie ma testu (mutanty M3 i M6 przeżyły), a fixture sprawdza tylko kolor. To warunek przed dodaniem turn-bet do `RODZAJE_NA_EKRANIE`, nie przed scaleniem.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR (P2) | D | EV-2: odrzucenie remisu i draw OESD bez testu; mutanty „remis przepuszczony” przeżyły | otwarte |
| 08-programista-002 | ŚR (P2) | D | `heroPositions` niesprawdzane w budowaniu treści: zła wartość przechodzi, w grze wyjątek albo cicho wyłączona reguła | otwarte |
| 08-programista-003 | NIS (P2) | D | EV-1: test „wektor A, tryb blockers” przechodzi także na starej definicji SDV; asercja showdown `not.toBe(0)` | otwarte |
| 08-programista-004 | NIS (P2) | D | `szablony-f2-ca`: lista reguł cbet-case z danych zamiast na sztywno; zniknięcie `check` R-M5-004/007/009 przejdzie | otwarte |

Odpowiedzi na pytania polecenia FA:
- (a) Rachunek zgodny ze specyfikacją. Wektory EV-1 i EV-2 przeliczyłem niezależnie od testów autora: sonda `dowody/fa/blockers-wektory.txt` daje SDV 0,5 dla 7h6h, a sonda `dowody/fa/remis-wektory.txt` pokazuje, że remis przy W = N istnieje, więc osobny warunek jest potrzebny.
- (b) Limit 5000 → 20 000 nie zmienia odcisków. Pętla w `packages/poker-core/src/scenario-gen.ts:905-908` zwraca pierwszy przyjęty wariant z tego samego generatora losowego, a sonda daje 0 różnic. Limit nie ukrywa błędu: akceptacja zmierzona niezależnie wynosi 0,090%, czyli średnio 1111 prób na wariant. 13 na 1000 ziaren potrzebowało ponad 5000 prób, najwięcej 7346 (`dowody/fa/proby-turn-bet.txt`). Ogon przy 20 000 prób to ok. e^-18. Mutant M10 (powrót do 5000) czerwieni 7 testów. Koszt czasu: testy turn-bet trwają 110,9 s zamiast 24,9 s, a sam test 3000 wariantów 51,0 s zamiast 11,4 s (`dowody/fa/czasy-turn-bet.txt`). poker-core w CI trwa 138,8 s.
- (c) Zmiany istniejących testów nie osłabiają kontroli zachowania. SC-23a 7h6h → 7h5h jest wymuszone przez D-1285 (7h6h remisuje z 76s), a 7h6h przeszło do bloku EV-1. EI-002 big 0,4 → 0,42 jest wymuszone przez D-1286, a stary wektor 0,4 ma teraz test odwrotny („brak wariantów”). Rachunek wektora: zakład 17, cena 17/74 = 0,2297, margines od 9/44 to 0,0252. Podniesione limity czasu wynikają z wolniejszej akceptacji. Jedno osłabienie przypinania: 08-programista-004.
- (d) `position: HJ` jest zgodne z 06-tresci-001 opcja (a) i ze schematem (`packages/content-schema/src/index.ts:355`). `positionOf` przy 6 graczach daje etykiety `HJ` i `CO` (`packages/poker-core/src/table.ts:28`), a `heroPositions: "HJ,CO"` jest identyczne w 35 bazach.
- (e) Teksty angielskie w 10 językach nie psują budowania (CI kod 0) ani identyfikatorów powtórek. We wszystkich 35 bazach `drills` ma 393 zamiast 392 wierszy, nie ma usuniętych ani zmienionych identyfikatorów i rodzin, a `rules`, `lessons`, `scenarios` i `exam_drills` są bez zmian.

## Linia bazowa i założenia
Linię bazową zbudowałem z kodu i specyfikacji, zanim przeczytałem testy EY. Zakres nie ma ścieżek zapisu danych użytkownika (bez zmian w `packages/postep/`, `apps/mobile/src/data/` i schemacie). Zmienia się czysta logika generatora i oceny (poker-core), bramka budowania treści (content-build, ścieżka wrażliwa D-043: identyfikatory w powtórkach) i treść jednej lekcji. Dane użytkownika, których dotyka zakres pośrednio, to historia wariantów: odcisk zależy od wyniku generatora, a `GENERATOR_WERSJA` musi rosnąć przy jego zmianie (`packages/poker-core/test/scenario-gen.test.ts:148`). Dlatego sprawdziłem odciski w kontekście takim jak w aplikacji (`apps/mobile/src/data/content/repo.ts:309`, pula przypadków c-betu ze wszystkich reguł). Test `tools/content-build/test/generator-odciski.test.ts:25` używa samych przypadków R-M5-007, więc zmiany EV-4 by nie wykrył.

Wymiary pokrycia:
- Ścieżki zapisu: sprawdzone, brak w zakresie. Identyfikatory w bazach treści porównane (`dowody/fa/porownanie-db.txt`).
- Obsługa błędów: `parseHeroPositions` rzuca `Error` przy złych danych, a budowanie go nie woła, gdy żaden szablon nie używa reguły (08-programista-002). Generator zgłasza `TemplateError` po limicie.
- Typy na granicach: `parseHeroPositions(v: unknown)` bez asercji; parametry reguł mają w schemacie typ `string | number` (`packages/content-schema/src/index.ts:139`), więc `heroPositions: 5` przechodzi schemat.
- System projektowy: sprawdzone, brak zmian interfejsu.
- Teksty przez i18n: treść zadania w 10 językach po angielsku, odstępstwo nazwane w D-1313 (rola 09). Poza zakresem FA (e) z wyjątkiem budowania i ID.
- Wydajność: koszt czasu testów zmierzony (pkt b). W aplikacji turn-bet nie jest na ekranie, a szablony na ekranie mają odciski bez zmian.
- Testy na właściwym poziomie: logika w Node (vitest), wektory wpisane ręcznie plus wyrocznie. Braki: 08-programista-001 i 003.
- Dostępność: sprawdzone, brak zmian w komponentach.
- Liczby konfiguracyjne: `MAX_CONSECUTIVE_REJECTIONS` jest w jednym miejscu z ID decyzji (D-1310).

Soczewki: recenzent szukający ścieżki bez testu (mutanty, 001 i 003), programista czytający moduł pierwszy raz (002: lista pozycji w treści bez walidacji). Soczewki użytkownika z przerwanym zapisem i użytkownika VoiceOver nie mają w tym zakresie zastosowania (brak zapisu i widoków). Wzorzec najlepszych w klasie z kontraktu roli: każda gałąź reguły ma test, który potrafi paść, a granica z danymi jest sprawdzana przy wejściu (budowanie treści), nie dopiero w grze. Zmian statusu w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (EV-1, EV-2, EV-4, limit) | tak, cały diff | czytanie, mutanty `dowody/fa/mutanty-wynik.txt`, sondy `dowody/fa/proby-turn-bet.txt`, `dowody/fa/odciski-ev4.txt` |
| `packages/poker-core/src/grading.ts` (EV-3) | tak | M8; sonda `dowody/fa/heropositions-walidacja.txt` |
| `tools/content-build/src/scenariusze.ts`, `tools/content-build/src/build.ts` | tak | M9; sonda walidacji |
| Testy: ef-turn-bet, ei-turn-bet-zywe-outy, ek-pick-hand, ey-turn-bet-czyste-outy, ey-ev3, ey-ev4, szablony-f2-ca | tak, cały diff | czytanie, czasy `dowody/fa/czasy-turn-bet.txt`, `dowody/fa/blockers-wektory.txt` |
| Treść m5.l4.c-oop i R-M5-012 (pl, en; 10 języków tylko budowanie i ID) | tak | diff, `dowody/fa/porownanie-db.txt`, CI |
| Bazy treści 35 języków (ID, rodziny, parametry R-M5-012) | tak | `dowody/fa/porownanie-db.txt` |
| Pełne `pnpm run ci` na 105ed456 | tak, kod 0 | `dowody/fa-ci-105ed456.txt` |
| Merytoryka źródeł R-M5-012 (Upswing) | nie (rola 06; potwierdzone w EZ) | — |
| Zachowanie ekranu gry przy wyjątku z `gradeDecision` | nie (bez symulatora; wyjątek potwierdzony w Node) | — |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzja-fa.md . docs/programista --rola 08-programista` (kopia skryptu z promptu roli w scratchpadzie): wynik niżej, wklejony po ostatnim przebiegu.

```
OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista
```
Kod wyjścia 0. `git status --porcelain` przed commitem (pliki śledzone nietknięte, sondy i worktree tylko w scratchpadzie, usunięte):
```
?? docs/decyzje/FA.md
?? docs/programista/dowody/fa-ci-105ed456.txt
?? docs/programista/dowody/fa/
?? docs/programista/recenzja-fa.md
```
`git diff --cached` przed commitem przejrzany: tylko raport, dowody i `docs/decyzje/FA.md`, bez sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | 08-programista-001 (gałąź remisu EV-2, OESD); EV-1, EV-3, EV-4 z testem i wektorem ok |
| DEV-02 | dotyczy | 5/5 commitów zmieniających zachowanie ma test w tym samym commicie (d9e28a48, a3b18da2, c20f9467, c6e575c0, 0ef0fcc0); mutanty cofające każdą poprawkę (M1, M4, M5, M7, M8, M9) czerwone, więc testy byłyby czerwone na kodzie sprzed poprawki |
| DEV-03 | dotyczy | 08-programista-003, 08-programista-004; zmiany SC-23a i EI-002 uzasadnione D-1285/D-1286 (D-1311), bez `.skip`/`.only`/`expect(true)` w diffie |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0, 741 s (`dowody/fa-ci-105ed456.txt`) |
| DEV-05 | nie dotyczy: brak zapisów do bazy użytkownika w zakresie | — |
| DEV-06 | nie dotyczy: brak migracji i kopii w zakresie | — |
| DEV-07 | dotyczy | ok: brak `heroPositions` = brak ograniczenia (zapisane w D-1287, `packages/poker-core/src/grading.ts:277-278`) |
| DEV-08 | nie dotyczy: brak dat w zakresie | — |
| DEV-09 | dotyczy | ok: `parseHeroPositions(v: unknown)`; `as any` tylko w testach |
| DEV-10 | dotyczy | 08-programista-002 |
| DEV-11 | nie dotyczy: brak zmian interfejsu | — |
| DEV-12 | rozstrzygnięte decyzją D-1313 (angielski w 10 językach do przekładu 09) | budowanie i ID ok |
| DEV-13 | rozstrzygnięte decyzją D-1310 (limit 20 000) | ok: jedna stała z ID decyzji; skutki zmierzone (pkt b) |
| DEV-14 | dotyczy | ok: diff zakresu bez plików `.env`/kluczy; skrypt kontrolny bez trafień |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów w zakresie | — |
| DEV-16 | dotyczy | ok: `hit` (N/46, pokazywane) i `equityRywala` (N/44) nazwane i opisane w `packages/poker-core/src/scenario-gen.ts:736-737` |

## Znaleziska (szczegóły)

### 08-programista-001 · EV-2: odrzucenie remisu i draw OESD bez testu; mutanty „remis przepuszczony” przeżyły
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚREDNIE według progu z `CLAUDE.md`; nie blokuje wydania)
- Realność: brzegowy (turn-bet nie jest na ekranie, D-1250)   · Pewność: wysoka
- Rodzaj: D
- Dowód: warunek `packages/poker-core/src/scenario-gen.ts:725` („if (r === h) return null; // remis to nie czysty out”). Mutant M3 usuwa go, a M6 robi go nieosiągalnym. Oba przeżyły 3 pliki testów turn-bet: kod wyjścia 0 (`dowody/fa/mutanty-wynik.txt`). Remis przy W = N jest możliwy: 7d5s vs 5h3h na QsQh7hAs daje W = 9 = N i T = 2 (`dowody/fa/remis-wektory.txt`), więc warunek nie jest martwy, tylko nietestowany. Fixture `packages/poker-core/test/ey-turn-bet-czyste-outy.test.ts:10` ma `small: 0.25`. OESD (8/46 = 0,174) nie mieści marginesu 0,02 nad ceną 0,1667, więc wszystkie przyjęte warianty to kolor (1000/1000, `dowody/fa/proby-turn-bet.txt`). Ścieżka D-1286 dla OESD nie jest wykonywana żadnym testem.
- Mechanizm: zbiór wygrywających i warunek remisu są liczone wewnątrz `tryVariant`, a jedynymi testami są przebiegi generatora na fixture, w którym remisy i OESD prawie się nie zdarzają. `grep -rn "small: 0.25, big: 0.75" packages/poker-core/test` → 3 pliki (ef, ei, ey) z tym samym fixture.
- Powraca: tak, z EI-001 i 08-programista-003 recenzji EK (turn-bet, outy) → trwała kontrola: wektor remisu w teście
- Wzorzec lub źródło: kontrakt roli, DEV-01 („każda reguła … ma test z wektorem”); D-1286 („nie może zawierać remisów”)
- Kroki w aplikacji: dziś brak (turn-bet poza `RODZAJE_NA_EKRANIE`). Po włączeniu: wariant z remisem na riverze pokazałby e = N/44, a prawdziwe equity rywala to (N + ½T)/44.
- Opcje: (a) wydzielić czystą funkcję (np. `czysteOuty(hero, villain, turn, nominalne)`) i dać jej wektory: 7d5s vs 5h3h na QsQh7hAs → odrzucony (remis), AsKd vs QhJh na Ks8h5h2c → przyjęty, oraz wektor OESD. To mały refaktor, ale test jest szybki i trafia w gałąź. (b) Drugi fixture generatora z `small: 0.2` (OESD przechodzi margines) i asercją T = 0. Bez refaktoru, ale remis i tak może się nie wylosować, więc M3 może dalej przeżyć. Rekomendacja: (a), bo tylko wektor wpisany ręcznie zabija M3 i M6 deterministycznie.
- Test akceptacyjny: mutanty M3 i M6 z `dowody/fa/sonda-mutanty.mjs.txt` są czerwone; jest wektor OESD przyjęty z W = N = 8 i T = 0.
- Status: otwarte (warunek przed dodaniem turn-bet do `RODZAJE_NA_EKRANIE`, obok D-1250)

### 08-programista-002 · `heroPositions` niesprawdzane w budowaniu treści: zła wartość przechodzi, w grze wyjątek albo cicho wyłączona reguła
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 (ŚREDNIE; nie blokuje: dziś wartość „HJ,CO” jest poprawna w 35 bazach)
- Realność: brzegowy (wymaga błędu w treści)   · Pewność: wysoka
- Rodzaj: D
- Dowód: `parseHeroPositions` jest wołane tylko w ocenie (`packages/poker-core/src/grading.ts:411`) i w bramce szablonu (`tools/content-build/src/scenariusze.ts:192`). Bramka działa tylko dla szablonu z punktem tej reguły, a żaden szablon nie używa R-M5-012. Sonda na kopii treści (`dowody/fa/heropositions-walidacja.txt`): `heroPositions: ""` i `5` przechodzą budowanie, po czym `gradeDecision` rzuca `heroPositions: pusta lista pozycji` albo `oczekiwano napisu…`. Przy `"hj,co"` budowanie też przechodzi, a reguła cicho przestaje oceniać HJ (`ruleId=null`). Nazw pozycji nikt nie sprawdza z `POSITION_NAMES` (`packages/poker-core/src/table.ts:23`).
- Mechanizm: walidacja parametru reguły jest w miejscu użycia, a nie przy kompilacji reguł (`compileEvalRules`). `grep -rn "heroPositions" tools/content-build/src packages/poker-core/src` → 2 miejsca użycia (`packages/poker-core/src/grading.ts:411`, `tools/content-build/src/scenariusze.ts:192`) i przekazanie mapy (`tools/content-build/src/build.ts:427`), bez kontroli reguły bez szablonu.
- Powraca: nie
- Wzorzec lub źródło: kontrakt roli, wzorzec „Parsowanie: brak zostaje brakiem” (niepoprawne dane dają typowany błąd przy wejściu); DEV-10
- Kroki w aplikacji: po błędzie w `rules.yaml` jednego języka (12 plików z tym samym wierszem): gracz na HJ albo CO czeka na niskim flopie w trybie gry, a ocena rzuca wyjątek (ekranu nie sprawdzono) albo ocenia „bez oceny” tylko w tym języku.
- Opcje: (a) w budowaniu treści dla każdej reguły `cbet-case` z `heroPositions` wołać `parseHeroPositions` i sprawdzać każdą pozycję z `POSITION_NAMES[players]` reguły. Błąd budowania z nazwą reguły i języka, kilka linii i test. (b) Zawęzić typ w schemacie (`heroPositions` jako lista enum pozycji). Mocniejsze, ale to zmiana formatu `params` (dziś `Record<string, string | number>`) we wszystkich językach i w `game_kit`. Rekomendacja: (a), bo daje tę samą ochronę bez zmiany formatu treści.
- Test akceptacyjny: budowanie z `heroPositions` równym `""`, `5` albo `"hj,co"` (i nazwą spoza `POSITION_NAMES`) kończy się błędem z ID reguły; wartość „HJ,CO” przechodzi.
- Status: otwarte

### 08-programista-003 · EV-1: test „wektor A, tryb blockers” przechodzi także na starej definicji SDV; asercja showdown `not.toBe(0)`
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (NISKIE)
- Realność: teoretyczny (inne testy EV-1 zabijają mutanty M1 i M2)   · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/test/ek-pick-hand.test.ts:59` („wektor A, tryb blockers: wariant z 7h6h (SDV 0,5) jest odrzucany (null)”) zestawia 7h6h z 8c8d. 8c8d ma SDV > 0, więc wynik to `null` przy każdej definicji remisu. Na mutancie M1 ten test jest zielony: nie ma go na liście czerwonych (`dowody/fa/mutanty-wynik.txt`). Test showdown (`packages/poker-core/test/ek-pick-hand.test.ts:57`) sprawdza tylko `not.toBe(0)`, a dla tej pary wynik powinien być `null`. Wektor rozróżniający: blockers, 7h6h vs 7d6c, stół Ts9h4d3c2s, calls 76s, folds 76o. Kod EY daje `null`, a mutant M1 daje `1` (`dowody/fa/blockers-wektory.txt`).
- Mechanizm: wektor trybu nie spełnia warunku poprzedzającego (druga ręka z SDV 0), więc nie sprawdza nowej reguły. Jedno wystąpienie.
- Powraca: tak, podobne do 08-programista-006 recenzji EK (asercja zbyt luźna w wektorach pick-hand) → trwała kontrola: wektor rozróżniający w teście
- Wzorzec lub źródło: wzorce roli, „Dobry test” (czerwień z właściwego powodu); DEV-03
- Kroki w aplikacji: brak (pick-hand bez treści, D-1250)
- Opcje: (a) dodać wektor 7h6h vs 7d6c (blockers → `null`) i zamienić `not.toBe(0)` na `toBeNull()`. Dwie linie, test zabija M1 sam. (b) Zostawić, bo M1 zabijają inne testy. Kontrola zostaje rozproszona, a nazwa testu obiecuje więcej, niż sprawdza. Rekomendacja: (a).
- Test akceptacyjny: test trybu blockers jest czerwony na mutancie M1.
- Status: otwarte

### 08-programista-004 · `szablony-f2-ca`: lista reguł cbet-case z danych zamiast na sztywno; zniknięcie `check` R-M5-004/007/009 przejdzie
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (NISKIE)
- Realność: brzegowy   · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/szablony-f2-ca.test.ts:105` porównuje zbiór reguł z przypadkami ze zbiorem reguł `cbet-case`, a oba pochodzą z tej samej treści. Przypięta jest tylko R-M5-012 (`tools/content-build/test/szablony-f2-ca.test.ts:106`). Przed EY test wymagał dokładnie R-M5-004, R-M5-007 i R-M5-009. `grep -rln "R-M5-009" --include=*.test.ts tools packages apps tests` → 0 plików, więc usunięcia `check` R-M5-009 nie wykryje już żaden test. Specyfikacja 08-EV-3 każe dopisać R-M5-012 do listy.
- Mechanizm: wyrocznia liczona z tych samych danych, które sprawdza. Jedno wystąpienie.
- Powraca: nie
- Wzorzec lub źródło: zasada 11 i DEV-03 (nie luzować oczekiwań); `docs/tresci/stan-ev.md` 08-EV-3
- Kroki w aplikacji: po przypadkowym usunięciu wiersza `check` R-M5-009 w treści tryb gry przestaje oceniać c-bet według tej reguły, a CI zostaje zielone.
- Opcje: (a) zostawić nową asercję ogólną i dodać `expect([...cbetRules].sort()).toEqual(['R-M5-004', 'R-M5-007', 'R-M5-009', 'R-M5-012'])`. Jedna linia, przy każdej nowej regule trzeba zmienić test świadomie. (b) Zostawić jak jest. Mniej utrzymania, ale znika przypięcie trzech reguł. Rekomendacja: (a), bo łączy ogólną własność z przypięciem.
- Test akceptacyjny: usunięcie `check` R-M5-009 z `content/pl/rules.yaml` daje czerwony `szablony-f2-ca.test.ts`.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Ekran gry przy wyjątku z `gradeDecision` (08-programista-002): granica błędów czy zamknięcie ekranu, nie sprawdzono bez symulatora. Potrzebny test RNTL albo E2E z regułą o złym `heroPositions`.
- Pozostałe 23 języki (np. bg, cs) dostają zadanie `m5.l4.c-oop` jak każde inne z bazy angielskiej: identyfikatory się zgadzają, ale tekstu nie oceniałem (rola 09, D-1313).
- Spójność generatora i oceny przy przypadkach jednej reguły w kilku zadaniach: generator szuka po `x.rule` w puli wszystkich zadań, a ocena tylko w zadaniu wskazanym w `check.drill`. Dziś pula ma po jednym zadaniu na regułę, więc różnicy nie ma (0 różnic odcisków). Gdyby przypadki z `rule: R-M5-007` trafiły do drugiego zadania, wyniki mogłyby się rozjechać. To teoria bez dzisiejszej ścieżki.

## Co działa dobrze i należy zachować
- Wektory wpisane ręcznie obok wyroczni (EV-1: W = 0, T = 9 → 0,5; EV-2: 7/9, 9/9, 8/9) zabijają mutanty powrotu do starego kodu (M1, M2, M4, M5).
- Każda zmiana starego testu ma w komentarzu powód i ID decyzji, a stary wektor EI-002 dostał test odwrotny zamiast usunięcia.
- `parseHeroPositions` jest jedną definicją dla oceny i bramki, z `unknown` na wejściu.
- Limit odrzuceń zmieniony bez zmiany wyniku dla ziaren, które już działały. Komentarz przy stałej podaje pomiar i ID decyzji.
- Bazy treści przebudowane spójnie w 35 językach, bez zmiany identyfikatorów i rodzin.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje agenta (do weta, `docs/decyzje/FA.md`): D-1325 (werdykt i poziomy znalezisk: żadne nie blokuje scalenia ani wydania testowego), D-1326 (08-programista-001 dołącza do warunków D-1250 przed dodaniem turn-bet do `RODZAJE_NA_EKRANIE`).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-004`
