# Audyt: Programista — Szkoła Pokera — recenzja niezależna DX, część 2 (D-1040/KO-074 próg pojemności, D-1067) — 2026-11-11
Commit: `a6186653` (`origin/sesja-dx-silnik`) · Zakres: `174dc00b..a6186653` (88253858, a0e3e938, a6186653; f86c72fc tylko dokumenty, poza zakresem) · Tryb: audit (rozszerzenie polecenia EC od koordynatora) · Środowisko: jak w części 1 (`recenzja-dx-174dc00b.md`); mutanty w kopii `git worktree` @a6186653 w scratchpadzie. `pnpm run ci` na tym zakresie uruchamia koordynator (ci.yml), ja go nie uruchamiałem. Ścieżki `plik:linia` odnoszą się do plików, których ten zakres nie zmienia (`build.ts`, `scenario-gen.ts` poza eksportem), albo są cytowane z `a6186653` w treści.

## Podsumowanie
Werdykt części 2: **PRZYJĄĆ PO POPRAWKACH** (0 KRYT, 0 WYS, 1 ŚR, 1 NIS). Próg `min(40, klasy z eligibleClasses)` jest poprawny: dla szablonu bez flopu odcisk wariantu to sam układ kart gracza z dokładnością do permutacji kolorów, czyli klasa ręki (`packages/poker-core/src/scenario-gen.ts:331-337` i `:590`). Wymagany mutant p-1 (40 zamiast min) jest czerwony w obu testach (p-1). Zmiana testu CK (D-1067) nie osłabia jego celu, tylko go wzmacnia. Bramka terminów rzuca dopiero po pętli szablonów (`tools/content-build/src/build.ts:485`), a pętla rzuca przy pierwszym błędzie szablonu, ekranu albo generatora (`tools/content-build/src/build.ts:430-436`). Skoro test widzi błąd terminów, szablon przeszedł więc wszystkie bramki scenariusza, łącznie z pojemnością. Luka: warunek, że szablon ma tylko punkty range-spot i size-spot, nie ma testu. Mutant, który go usuwa, przechodzi cały zestaw `tools/content-build` (486/486), więc szablon range-spot → cbet-case (SC-04, SC-05, z flopem w odcisku) mógłby po cichu dostać obniżony próg (007).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-007 | ŚR (P1 wg DEV-03) | D | Warunek „szablon bez flopu” w obniżonym progu pojemności nie ma testu: po jego usunięciu szablon range-spot → cbet-case dostaje próg min(40, klasy), a cały zestaw content-build jest zielony | otwarte |
| 08-programista-008 | NIS (P2) | D | Górna granica 40 w `min` nie ma testu: bez niej szeroki szablon wymagałby odcisku każdej klasy, a testy są zielone | otwarte |

## Linia bazowa i założenia
Przed czytaniem testu autora ustaliłem z kodu, czym jest odcisk wariantu bez flopu (`variantFingerprint` z pustym `shown`) i w jakiej kolejności `compileContent` rzuca błędy. Część 1 (b3963e9a..174dc00b) ma osobny werdykt w `recenzja-dx-174dc00b.md`.
- **Ścieżki zapisu:** brak. Bramka dotyczy budowania treści (`tools/content-build`, ścieżka wrażliwa), a nie danych użytkownika. Generator (`tryVariant`) jest bez zmian, zmienia się tylko widoczność `eligibleClasses` (eksport), więc odciski i `GENERATOR_WERSJA` zostają.
- **Obsługa błędów:** przy braku spotu, przedziału albo oczekiwanej akcji próg zostaje 40 (bez zgadywania). Gdy `eligibleClasses` zwraca 0 klas, próg wynosi 0, ale generator wtedy rzuca i bramka zgłasza „nie wytwarza wariantów” (`continue` przed porównaniem).
- **Typy, system projektowy, i18n, dostępność:** nie dotyczy.
- **Testy:** p-1, p-3, p-5 i p-6 są czerwone; p-2 i p-4 przeżywają (dowody/ec-mutanty-d1040.txt).
- **Liczby konfiguracyjne:** 40 pozostaje w `POJEMNOSC_MIN`; nowej stałej nie ma.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `tools/content-build/src/scenariusze.ts` (`checkScenarioGenerator`, diff 88253858) | tak | czytanie; 6 mutantów (dowody/ec-mutanty-d1040.txt) |
| `packages/poker-core/src/scenario-gen.ts` (eksport `eligibleClasses`, odcisk) | tak | czytanie |
| `tools/content-build/test/dx-pojemnosc-d1040.test.ts` | tak | czytanie, mutanty |
| `tools/content-build/test/szablon-na-ekranie-ck.test.ts` (D-1067) | tak | czytanie + kolejność rzucania w `build.ts` |
| `pnpm run ci` na f86c72fc | nie | uruchamia koordynator (ci.yml dispatch) |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-dx-a6186653.md . --rola 08-programista` → OK, kod 0 (przebieg przed commitem).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | próg ma test pozytywny i negatywny; luki → 08-programista-007, 08-programista-008 |
| DEV-02 | dotyczy | 2/2 commity z testem (88253858 nowy test; a0e3e938 zmiana testu) |
| DEV-03 | dotyczy | zmiana testu CK nie osłabia celu (kolejność bramek w `build.ts`); przeżywające mutanty → 007, 008 |
| DEV-04 | dotyczy | dwa pliki testów 6/6 w kopii; pełne CI: nie sprawdzono (koordynator) |
| DEV-05, DEV-06, DEV-08, DEV-09, DEV-11, DEV-12, DEV-15 | nie dotyczy: brak zapisu, dat, danych z zewnątrz i widoku | — |
| DEV-07 | dotyczy | brak danych spotu → próg 40, bez zgadywania; ok |
| DEV-10 | dotyczy | 0 klas → błąd generatora, nie cichy próg 0; ok |
| DEV-13 | dotyczy | 40 tylko w `POJEMNOSC_MIN`; ok |
| DEV-14 | dotyczy | diff bez sekretów; ok |
| DEV-16 | nie dotyczy: brak jednostek | — |

## Znaleziska (szczegóły)

### 08-programista-007 · Warunek „szablon bez flopu” w obniżonym progu pojemności nie ma testu
- Pozycja listy kontrolnej: DEV-03
- Poziom: P1 wg DEV-03 (ŚR wg progu wydania: nie psuje danych, osłabia bramkę treści)
- Realność: realny (SC-04 i SC-05 to range-spot → cbet-case i czekają na wejście do treści) · Pewność: wysoka
- Rodzaj: D
- Dowód: w `a6186653:tools/content-build/src/scenariusze.ts` warunek `t.decisions.every((d) => d.kind === 'range-spot' || d.kind === 'size-spot')` ogranicza obniżony próg do szablonów bez flopu. Mutant p-4 usuwa ten warunek i przechodzi oba testy D-1040 i CK oraz cały zestaw `tools/content-build`: 486 passed, kod 0 (dowody/ec-mutanty-d1040.txt). Dla szablonu z cbet-case odcisk obejmuje flop (`packages/poker-core/src/scenario-gen.ts:590`), więc liczba klas nie ogranicza liczby odcisków. Bez warunku taki szablon z wąskim przedziałem częstości przeszedłby bramkę z kilkoma odciskami zamiast 40.
- Mechanizm: 1 warunek; jeden plik testu (`dx-pojemnosc-d1040.test.ts`) ma tylko szablon bez flopu.
- Powraca: nie
- Wzorzec lub źródło: rola 08, „Dobry test”: każda gałąź decyzji ma test, który potrafi paść.
- Kroki w aplikacji: brak bezpośrednich; skutek: szablon z małą pulą wariantów trafia do aplikacji, a użytkownik szybciej widzi powtórki tego samego rozdania (BR-GEN-002 c).
- Opcje: jedna sensowna — dopisać przypadek: fixture `sc-fx-range-cbet` (range-spot → cbet-case) z wąskim przedziałem i małą liczbą prób ma dostać błąd z „wymagane 40” — bo brak testu gałęzi nie ma tańszego zastępstwa.
- Test akceptacyjny: mutant p-4 ze skryptu w dowody/ec-mutanty-d1040.txt daje czerwony wynik.
- Status: otwarte

### 08-programista-008 · Górna granica 40 w `min` nie ma testu
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (NIS)
- Realność: brzegowy (mutant zaostrza bramkę; dziś szablony w treści i tak osiągają wszystkie klasy w 2000 losowaniach) · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant p-2 (`prog = eligibleClasses(…).length`, bez `min` z 40) przechodzi testy D-1040 i CK oraz cały zestaw `tools/content-build`, kod 0 (dowody/ec-mutanty-d1040.txt). Żaden test nie ma szablonu bez flopu z więcej niż 40 klasami i mniej niż tyloma odciskami.
- Mechanizm: 1 wyrażenie.
- Powraca: nie
- Wzorzec lub źródło: jak 007.
- Kroki w aplikacji: brak; szeroki szablon mógłby zostać fałszywie odrzucony przy `content:build`.
- Opcje: (a) dopisać przypadek: szeroki poziom (> 40 klas) i liczba prób dająca 40–(klasy − 1) odcisków przechodzi — test precyzyjny, ale zależny od losowania; (b) wydzielić czystą funkcję `progPojemnosci(t, level, ctx)` i przetestować ją bez generatora — mniejszy test, ale dodatkowa funkcja. Rekomendacja: (b), test deterministyczny.
- Test akceptacyjny: mutant p-2 czerwony.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Szablon z dwoma punktami range-spot o różnych spotach: odcisk to nadal klasa ręki, a próg liczy klasy tylko z pierwszego punktu. Gdyby drugi punkt zawężał pulę klas, próg byłby za wysoki, czyli bramka byłaby ostrzejsza, a nie łagodniejsza. Dziś w treści nie ma takiego szablonu.

## Co działa dobrze i należy zachować
- Test CK po D-1067 jest mocniejszy niż przed: błąd terminów jest osiągalny tylko po przejściu wszystkich bramek scenariusza.
- Brak danych spotu daje domyślny próg 40, a nie niższy.
- Test założenia (`klasy()` liczone z tabeli zakresów niezależnie od `eligibleClasses`) pilnuje, że fixture naprawdę ma mniej niż 40 klas.

## Decyzje dla właściciela
Brak. D-1067 jest techniczna i jej uzasadnienie potwierdzam.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-007,08-programista-008`

`git status --porcelain` przed commitem:
```
?? docs/programista/recenzje/dowody/ec-mutanty-d1040.txt
?? docs/programista/recenzje/recenzja-dx-a6186653.md
```
