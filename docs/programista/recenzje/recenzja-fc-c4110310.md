# Recenzja niezależna FC (08-programista, audit): refaktor `czysteOuty`, FA-001…004 i 28fdb1b0 — 2026-11-12
Commit: c4110310 (zakres `28fdb1b0..c4110310`, 6 commitów, 9 plików; pobieżnie 28fdb1b0) · Tryb: audit (recenzja D-043, sesja FF) · Środowisko: Linux x86_64, 4 rdzenie, Node v22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez Xcode i symulatora (nie dotyczy: zmiany bez interfejsu). GitHub: odczyt przebiegów CI przez MCP (bez uruchamiania workflowów).

## Podsumowanie
Werdykt: **PO POPRAWKACH** (1 × WYS, 1 × ŚR, 1 × NIS; KRYT: 0). Refaktor `czysteOuty` i wczesne odrzucenia z 28fdb1b0 nie zmieniają wyników: odciski 1600 wariantów turn-bet (4 zestawy drawów × 2 marginesy × ziarna 1–200) są identyczne na da1e02db, 28fdb1b0 i c4110310 (`dowody/ff-odciski-turn-bet.txt`). Walidacja `heroPositions` nie odrzuca poprawnej treści (`pnpm content:check` kod 0, wszystkie języki) i jej test pada z właściwego powodu na kodzie sprzed poprawki (4/5 czerwone: „expected [Function] to throw”). Blokuje jedno: nowy test wydajności `fc-turn-bet-wydajnosc` ma limit 700 ms przy rzeczywistym czasie 620–760 ms i czerwieni CI — GitHub CI na 28fdb1b0 (761 ms) i dwa moje przebiegi `pnpm run ci` na c4110310 (709 i 747 ms), więc `pnpm run ci` na c4110310 daje kod 1. Dowód autora „ci kod 0” (`docs/programista/dowody/fc-ci-df7c7f2e.txt`) to pojedynczy lokalny przebieg.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS (P1) | D | Test wydajności turn-bet z limitem 700 ms przy czasie 620–760 ms: czerwone CI na GitHub (28fdb1b0) i w `pnpm run ci` na c4110310 | otwarte |
| 08-programista-002 | ŚR (P2) | D | Wektory FA-001 nie sprawdzają równości zbiorów outów: mutant „tylko liczność” przeżywa i zmienia warianty OESD | otwarte |
| 08-programista-003 | NIS (P2) | D | `(e as Error).message` w nowej walidacji `heroPositions`: błąd nie-`Error` daje komunikat „undefined” | otwarte |

## Linia bazowa i założenia
Ocenę zbudowałem z diffu, kodu i własnych sond przed przeczytaniem `docs/decyzje/FC.md` i dowodów FC (polecenie FF, pkt 1); dowody FC (`fc-ci-df7c7f2e.txt`, `fc-fa001-mutanty.txt`) i D-1340/D-1341 przeczytałem dopiero po ocenie, żeby porównać.
- Wzorzec: refaktor „bez zmiany zachowania” dowodzi się odciskami na tych samych ziarnach przed i po; test błędu jest czerwony na kodzie sprzed poprawki z powodu asercji; test w bramce CI jest deterministyczny (ta sama odpowiedź na każdej maszynie i przy każdym obciążeniu). Precedens w repo: `packages/poker-core/test/core.test.ts:284` mierzy czas pomiaru NFR-03, ale nie stawia progu czasu, tylko sprawdza wyniki. Trening: `gh api search/code` (`repo:lkarwowski494/trening toBeLessThan`, `… wydajno`, `… vitest`) → 0 trafień; analogii tam brak.
- Wymiary pokrycia: ścieżki zapisu — sprawdzone, brak (diff bez zapisu danych użytkownika). Obsługa błędów — 003 (komunikat błędu builda). Typy na granicach — `params.heroPositions` z YAML parsowane z `unknown` przez `parseHeroPositions` (dobrze), 003. System projektowy, i18n, dostępność — nie dotyczy (bez interfejsu). Wydajność — 001 (28fdb1b0 przyspiesza generator ok. 3×: `dowody/ff-wydajnosc-pomiar.txt`, da1e02db 1986 ms → 28fdb1b0 683 ms na 100 wariantów). Testy na właściwym poziomie — `czysteOuty` jako czysta funkcja z wyrocznią niezależną (pełne przejście talii) dobrze; luka 002. Liczby konfiguracyjne — `LIMIT_MS` (001).
- Soczewki: „recenzent szukający ścieżki bez testu” → 002 (mutant M7); „programista czytający moduł pierwszy raz” → 28fdb1b0 zostawia nadmiarowe `!zKarta` w `packages/poker-core/src/scenario-gen.ts:737` po wczesnym `return` z linii 731 (bez skutku, styl, nie zgłaszam).
- Rejestr założeń: bez zmian proponowanych.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (refaktor `czysteOuty`, 28fdb1b0) | tak, cały diff | czytanie + odciski 3 commitów (`dowody/ff-odciski-turn-bet.txt`) + mutanty M3, M7 (`dowody/ff-czerwien-fa002-fa001.txt`, `dowody/ff-odciski-mutant-m7.txt`) |
| `packages/poker-core/test/fc-fa001-czyste-outy-wektory.test.ts` | tak | czytanie, mutanty |
| `packages/poker-core/test/ek-pick-hand.test.ts` (FA-003) | tak, czytanie | asercja `sdv[0] = 0,5` wiąże wektor z definicją remisu = ½; mutanta M1 nie powtarzałem |
| `packages/poker-core/test/fc-turn-bet-wydajnosc.test.ts` (28fdb1b0) | tak | `dowody/ff-ci-c4110310.txt`, `dowody/ff-ci-c4110310-pod-obciazeniem.txt`, `dowody/ff-wydajnosc-izolacja.txt`, `dowody/ff-wydajnosc-pomiar.txt`, `dowody/ff-gh-ci-28fdb1b0.txt` |
| `tools/content-build/src/build.ts` (FA-002) | tak | czytanie + test na build.ts sprzed dd685d2b (`dowody/ff-czerwien-fa002-fa001.txt`) + `pnpm content:check` (`dowody/ff-ci-reszta-c4110310.txt`) |
| `tools/content-build/test/fc-fa002-hero-positions-build.test.ts`, `szablony-f2-ca.test.ts` (FA-004) | tak | czytanie, przebieg w content-build (693 zielone, 1 oczekiwana porażka) |
| `packages/poker-core/src/grading.ts` (`parseHeroPositions`, ocena w grze) | tak, fragmenty | spójność walidacji builda z oceną w grze |
| interfejs, ekrany | nie dotyczy | diff bez `apps/mobile` |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-fc-c4110310.md . --rola 08-programista` (kopia skryptu z promptu roli w scratchpadzie) → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0.
Komendy i kody wyjścia:
- `pnpm run ci` na c4110310, jedyny proces: kod 1 (poker-core: 1 failed | 261 passed; `czasy: 841, 837, 747 ms`) — `dowody/ff-ci-c4110310.txt`.
- `pnpm run ci` na c4110310 równolegle z moimi sondami: kod 1 (`czasy: 846, 714, 709 ms`) — `dowody/ff-ci-c4110310-pod-obciazeniem.txt`.
- Kroki `ci` po poker-core, osobno (pnpm -r zatrzymał się na pierwszym błędzie): domena, preflop-solver, postep, content-build, test:skrypty, test:kontrole, k08, i18n:kod, content:check, tresci:rejestr, tresci:el-kontrola — wszystkie kod 0 — `dowody/ff-ci-reszta-c4110310.txt`.
- `vitest run test/fc-turn-bet-wydajnosc.test.ts` sam ×3: kod 0; cały pakiet poker-core ×2: kod 0 (262 passed) — `dowody/ff-wydajnosc-izolacja.txt`.
- Sekrety: diff nie dodaje plików konfiguracyjnych ani kluczy; skrypt nie znalazł wzorców w raporcie.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (czysteOuty, walidacja heroPositions) | ok: `czysteOuty` czysta z wektorami; luka w 002 |
| DEV-02 | dotyczy | 4/4 commitów zmieniających zachowanie albo test ma test w tym samym commicie (28fdb1b0, a8860e87 refaktor + 163e4f17 testy, dd685d2b, ee8a504b); FA-002 czerwony przed poprawką — ok |
| DEV-03 | dotyczy | ok: brak `.skip`/`.only`; ee8a504b zaostrza asercję (`not.toBe(0)` → `toBeNull()`), nie luzuje |
| DEV-04 | dotyczy | znalezisko 08-programista-001 (`pnpm run ci` kod 1) |
| DEV-05 | nie dotyczy: diff bez zapisu do bazy | — |
| DEV-06 | nie dotyczy: brak migracji i kopii w diffie | — |
| DEV-07 | dotyczy (walidacja params) | ok: brak `heroPositions` = brak ograniczenia (null), zła wartość = błąd builda |
| DEV-08 | nie dotyczy: brak dat | — |
| DEV-09 | dotyczy (dane z YAML) | ok dla danych; 003 dla rzutowania błędu |
| DEV-10 | dotyczy | 08-programista-003 |
| DEV-11 | nie dotyczy: bez interfejsu | — |
| DEV-12 | nie dotyczy: komunikaty builda dla autora treści, nie dla użytkownika | — |
| DEV-13 | dotyczy (`LIMIT_MS`) | 08-programista-001 |
| DEV-14 | dotyczy | ok |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów | — |
| DEV-16 | dotyczy (`LIMIT_MS`, `Date.now()`) | ok: jednostka w nazwie |

## Znaleziska (szczegóły)

### 08-programista-001 · Test wydajności turn-bet czerwieni CI: limit 700 ms przy rzeczywistym czasie 620–760 ms
- Pozycja listy kontrolnej: DEV-04
- Poziom: P1 (WYS: bramka CI czerwona; blokuje scalenie FC)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/test/fc-turn-bet-wydajnosc.test.ts:13` „const LIMIT_MS = 700;”; GitHub CI run 43200552809 na 28fdb1b0: „czasy: 789, 761, 991 ms: expected 761 to be less than 700” (`dowody/ff-gh-ci-28fdb1b0.txt`); `pnpm run ci` na c4110310 jako jedyny proces: „czasy: 841, 837, 747 ms”, kod 1 (`dowody/ff-ci-c4110310.txt`); pomiar samego generatora tym samym szablonem: 621–753 ms (`dowody/ff-wydajnosc-pomiar.txt`); sam plik testu: kod 0 ×3 (`dowody/ff-wydajnosc-izolacja.txt`).
- Mechanizm: próg czasu ściennego w teście bramki, a `pnpm -r test` uruchamia pakiety równolegle (vitest w każdym z wieloma wątkami), więc wynik zależy od maszyny i obciążenia; „margines ×2” z komentarza liczono od 330 ms sprzed EV-2, a kod po 28fdb1b0 ma ok. 620–760 ms na tej maszynie i na runnerze GitHub, czyli margines ~0. `grep -rln "Date.now()\|performance.now()" packages/*/test tools/*/test` → 2 trafienia: ten test i `packages/poker-core/test/core.test.ts:284` (bez progu czasu, wzorzec do zachowania).
- Powraca: tak, ten sam mechanizm co CI-43192365903 (test „odciski turn-bet” > 5 s) → trwała kontrola: bramka bez progów czasu ściennego.
- Wzorzec lub źródło: zasada 21 (czerwony workflow to znalezisko); `packages/poker-core/test/core.test.ts:284` (pomiar bez progu).
- Kroki w aplikacji: brak drogi przez interfejs; skutek: czerwone CI na gałęzi FC i po scaleniu na roboczej.
- Opcje: (a) zamienić próg czasu na deterministyczną miarę kosztu — licznik wywołań `classifyHolding`/`czysteOuty` albo liczba prób na wariant dla stałych ziaren, z progiem z obecnego stanu — kompromis: wymaga punktu pomiaru (np. licznik w kontekście albo eksport liczby prób), ale wykrywa tę samą regresję (EV-2 zwiększył liczbę odrzuceń ×3,5) bez zależności od maszyny; (b) przenieść test czasu poza bramkę (osobny skrypt, raport informacyjny jak `pnpm k08`) — kompromis: najmniej pracy, ale regresja nie zatrzyma CI; (c) podnieść limit do np. 2000 ms — kompromis: nadal niedeterministyczny i blisko czasu sprzed poprawki (1986 ms), D-1341 to odrzuciło. Rekomendacja: (a), decyzja D-1370.
- Test akceptacyjny: `pnpm run ci` kod 0 trzy razy z rzędu lokalnie oraz zielony job `check` na GitHub na nowym HEAD; test regresji czerwony na da1e02db (sprzed 28fdb1b0) i zielony po.
- Status: otwarte

### 08-programista-002 · Wektory FA-001 nie sprawdzają równości zbiorów: mutant „tylko liczność” przeżywa i zmienia warianty OESD
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚR)
- Realność: brzegowy (dziś turn-bet jest tylko w fiksturach, `content/` go nie używa) · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:598` „if (wygrywajace.size !== nom.size || ![...wygrywajace].every((c) => nom.has(c))) return null;”; mutant M7 (usunięta część `every`): `fc-fa001-czyste-outy-wektory` i `ey-turn-bet-czyste-outy` 9/9 zielone, kod 0 (`dowody/ff-czerwien-fa002-fa001.txt`), a odciski zmieniają się dla `oesd` i `flush+oesd` (`dowody/ff-odciski-mutant-m7.txt` vs `dowody/ff-odciski-turn-bet.txt`).
- Mechanizm: każdy wektor ma albo W ≠ N, albo W = N z tym samym zbiorem; brak wektora z W = N i innym zbiorem (np. jeden martwy out drawa i jedna karta spoza drawa dająca rywalowi dwie pary). Liczby equity w takim wariancie zostają N/44, ale wyjaśnienie „draw ma N outów” opisuje nie te karty (D-1286 wymaga dokładnie nominalnych outów).
- Powraca: nie (FA-001 dotyczyło remisu; M3 i M6 są zabite — potwierdziłem M3: 2 failed, kod 1)
- Wzorzec lub źródło: D-1286 (komentarz w `scenario-gen.ts` przy wywołaniu `czysteOuty`)
- Kroki w aplikacji: brak dziś; po dodaniu szablonu turn-bet z OESD do treści generator przyjąłby wariant z niezgodnym opisem outów, gdyby warunek `every` zniknął.
- Opcje: (a) dopisać wektor W = N ≠ zbiór (znaleziony przeszukaniem ziaren, wpisany ręcznie z W i T) — kompromis: jeden test, zabija M7; (b) zostawić — kompromis: zero pracy, warunek bez ochrony. Rekomendacja: (a), decyzja D-1371.
- Test akceptacyjny: nowy wektor czerwony na mutancie M7 i zielony na kodzie.
- Status: otwarte

### 08-programista-003 · Walidacja `heroPositions` rzutuje błąd `as Error`: wyjątek nie-`Error` daje komunikat „undefined”
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 (NIS)
- Realność: teoretyczny (`parseHeroPositions` rzuca tylko `Error`) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/src/build.ts:753` „catch (e) { throw new Error(`${where}: ${(e as Error).message}`); }”
- Mechanizm: rzutowanie błędu zamiast `e instanceof Error ? e.message : String(e)`; `grep -rn "(e as Error).message\|(err as Error).message" tools/content-build/src` → 2 trafienia: `tools/content-build/src/build.ts:753` (nowe), `tools/content-build/src/scenariusze.ts:192` (sprzed FC).
- Powraca: nie
- Wzorzec lub źródło: wzorce roli, „Typy na granicy z zewnętrzem” (bez `as` na danych z zewnątrz)
- Kroki w aplikacji: brak (narzędzie builda)
- Opcje: (a) poprawić oba trafienia przy okazji następnej zmiany w content-build — kompromis: drobny diff; (b) backlog bez wersji — kompromis: zero pracy. Rekomendacja: (a), nie blokuje.
- Test akceptacyjny: typecheck zielony, `grep` → 0 trafień.
- Status: otwarte

## Do sprawdzenia
- FA-003: mutanta M1 (stara definicja SDV: remis = przegrana) nie odtwarzałem; asercja `sdv[0] = 0,5` w nowym wektorze wiąże go z definicją, ale czerwieni na M1 nie potwierdziłem (brak: wskazanie miejsca mutacji w `pickHandAnalysis`).
- Czasy na runnerze GitHub dla c4110310: brak przebiegu CI na tym SHA (`dowody/ff-gh-ci-28fdb1b0.txt`); wniosek opieram na 28fdb1b0 (ten sam kod generatora) i lokalnych przebiegach.

## Co działa dobrze i należy zachować
- Refaktor `czysteOuty` jest wierny: odciski 1600 wariantów identyczne na trzech commitach; czysta funkcja z wyrocznią niezależną (pełna talia + `strength`).
- 28fdb1b0: wczesne odrzucenia są warunkami koniecznymi (draw koloru wymaga 4 kart koloru wśród kart rywala i turnu, `analyseOutsSpot` wymaga karty rywala w kolorze) i nie zużywają losowań przed `pick`; przyspieszenie ok. 3× zmierzone.
- FA-002: walidacja w jednym miejscu z `parseHeroPositions` (ta sama definicja co ocena w grze, `packages/poker-core/src/grading.ts:411`), nazwy z `POSITION_NAMES` zamiast listy na sztywno; test na kopii prawdziwej treści, czerwony przed poprawką.
- FA-004: przypięcie listy reguł c-betu zamyka cichą utratę `check`.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje techniczne D-1370 (sposób naprawy 001) i D-1371 (wektor dla 002) zapisane w `docs/decyzje/FF.md`, do weta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003` (zakres: recenzja-fc-c4110310; 001 blokuje scalenie FC).
