# Audyt: Programista — Szkoła Pokera — recenzja niezależna poprawek DK — 2026-11-11
Commit: `64eea6c7` (gałąź `sesja-dl-recenzja` = `origin/sesja-dk-poprawki`) · Zakres: `1834b144..64eea6c7` (6917fcfc, 683fbf70, a1eb967c, 64eea6c7), poprawki 07-jakosc-001…003 z recenzji DF (`docs/jakosc/recenzje/recenzja-cz-ee7f991.md`) · Tryb: audit (recenzja D-043, polecenie DL) · Środowisko: Linux, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; vitest, jest i `node --test` działają; Maestro i symulator iOS niedostępne, więc flow 07 oceniony statycznie. Ścieżki dowodów względem `docs/programista`. Sondy i mutanty uruchamiane w kopii (`git worktree` w scratchpadzie), pliki śledzone nietknięte.

## Podsumowanie
Werdykt: **PRZYJĄĆ** (0 KRYT, 0 WYS, 1 ŚR, 1 NIS). Wszystkie trzy znaleziska DF są naprawione: 07-jakosc-001 z uwagą, 002 i 003 bez uwag. Moje mutanty A, B, A2 i A3 (D-630) oraz F i F4 (strit jako „air”) padają. Żaden test nie został poluzowany: dodano asercje i jeden test, nic nie usunięto. Testy w zakresie przechodzą (14/14, 3/3, 21/21), a CI 43006543702 na `64eea6c7` ma wynik success (odczyt przez MCP GitHub). Uwaga do 001: poprawkę chroni test, który czyta tekst źródła i flowu, a nie zachowanie. Mutant „`Button` nie przekazuje `testID` do `Pressable`” przechodzi wszystkie testy (jest 910/910, `df-flow-zakoncz`, `e2e-flowy`, `tsc`), a flow 07 padłby na symulatorze (08-programista-001, ŚR). Sonda RNTL o 9 liniach, dopisana do istniejącego `sesja-render-08`, zabija tego mutanta. Ścieżki wrażliwe (D-043) są nietknięte. Z `tools/content-build/` zmieniły się tylko testy, a regeneracja treści daje pusty diff. `testID` nie zmienia wyglądu, tekstów ani dostępności ekranu (zasada 15).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR (P2) | D | Poprawkę 07-jakosc-001 chroni test tekstu źródła: `Button` gubiący `testID` przechodzi wszystkie testy, a flow 07 padnie | otwarte |
| 08-programista-002 | NIS (P2) | D | D-940 podaje „Treningu nie sprawdzano (brak analogii)”, a Trening ma analogię (`testID` w komponencie, flow po `id`, test RNTL po `testID`) | otwarte |

Ocena znalezisk DF:

| Znalezisko DF | Wynik | Dowód |
|---|---|---|
| 07-jakosc-001 (WYS) flow 07 trafiał w górny „Zakończ” | **naprawione z uwagą** (uwaga: 08-programista-001) | flow stuka po `id: 'sesja-dalej'` (`apps/mobile/e2e/oczekujace/07-scenariusz.yaml:61-68`); `testID` jest tylko na przycisku pod oceną (`apps/mobile/src/app/session.tsx:414`), a górny `Pressable` (`apps/mobile/src/app/session.tsx:360`) go nie ma; mutanty U2, U3 i U5 padają, U1 i U4 przeżywają |
| 07-jakosc-002 (ŚR) mutanty A i B przeżywały | **naprawione** | `tools/content-build/test/szablony-bs.test.ts:83`; mutanty A, B, A2 i A3 padają (dowody/dl-mut-A-bez-D630.txt, dowody/dl-mut-B-points-length.txt, dowody/dl-mut-A2-indeks-punktu.txt, dowody/dl-mut-A3-turn-zamiast-flop.txt) |
| 07-jakosc-003 (ŚR) wyrocznia „air” bez gotowego strita | **naprawione** | `gotowyUklad` (`tools/content-build/test/szablony-co.test.ts:65`) użyty w `tools/content-build/test/szablony-co.test.ts:166`; mutanty F i F4 padają w sc-12 łatwy i średni (dowody/dl-mut-F-gen-strit-air.txt, dowody/dl-mut-F4-holding-strit.txt). Mutanty kolorowe Fk i F4k przeżywają, bo są równoważne: filtry flopu SC-11 i SC-12 to `rainbow` albo `two-tone` (`content/pl/scenarios/sc-12.yaml:18`), więc koloru z flopu nie da się ułożyć. Funkcję dla koloru sprawdza przypadek jednostkowy `Ah 5h` na `Kh 8h 3h` |

## Linia bazowa i założenia
Ryzyka spisałem z diffu i kodu, zanim przeczytałem `docs/decyzje/DK.md` i dowody autora. Wyjątek: jedna linia D-940 pojawiła się w wyniku `grep -rn sesja-dalej`, zanim ocena była gotowa, i nie zmieniła oceny. DK.md przeczytałem w całości po ocenie, żeby odróżnić decyzje od defektów: D-941 i D-943 tłumaczą U4 i brak przywróconej kontroli `cls === 'air'`.
- **Ścieżki zapisu:** w zakresie brak. `next` w `session.tsx` tylko zwiększa indeks, a zapis odpowiedzi (`commit`) i porzucenie (`zakoncz`) są bez zmian (dowody/dl-zakres.txt).
- **Obsługa błędów:** bez zmian w zakresie.
- **Typy na granicach:** bez zmian. Nowy prop `testID?: string` w `Button` (`apps/mobile/src/components/ui.tsx:74`) nie dotyczy danych z zewnątrz.
- **System projektowy (zasada 15):** diff `apps/mobile/src` to 1 linia w ekranie i 4 w `Button`: destrukturyzacja, typ z komentarzem i przekazanie do `Pressable` (`apps/mobile/src/components/ui.tsx:80`). Styl, tekst, `accessibilityLabel` i rola są bez zmian (dowody/dl-zakres.txt). Na iOS `testID` staje się identyfikatorem dostępności, którego VoiceOver nie czyta. To twierdzenie opiera się na wiedzy o platformie, w tej sesji nie czytałem źródła, więc ma status `[DO USTALENIA]` dla roli 10/04, choć ryzyko jest teoretyczne.
- **i18n:** bez zmian tekstów, `pl.json` nietknięty.
- **Wydajność:** bez znaczenia (jeden prop).
- **Testy na właściwym poziomie:** to jest główne ryzyko recenzji. Zachowanie ekranu da się sprawdzić RNTL na prawdziwym `SessionScreen` (istnieje `apps/mobile/src/__tests__/sesja-render-08.test.tsx:112`), a DK dało test czytający tekst źródła (`tests/narzedzia/df-flow-zakoncz.test.mjs:65-70`) → 001.
- **Liczby konfiguracyjne:** bez zmian.
- **Ścieżka wrażliwa `tools/content-build/`:** zmienione są tylko 2 pliki w `test/`. `pnpm content:build` na kopii daje kod 0 i 0 linii `git status --porcelain` (dowody/dl-regeneracja.txt), więc identyfikatory i odciski są bez zmian.
- **Soczewki:** (1) recenzent szukający ścieżki bez testu: U1 → 001; (2) programista czytający moduł pierwszy raz: `Button` z `testID` jest czytelny, a test regex pada przy samym przeformatowaniu linii (fałszywa czerwień), → 001; (3) użytkownik VoiceOver: bez zmiany etykiet; dwa „Zakończ” o różnym skutku to sprawa roli 04, zgłoszona już przez DF; (4) właściciel czekający na E2E z macOS: lista do potwierdzenia w „Do sprawdzenia”.
- **Wzorzec najlepszych:** Trening (repo `lkarwowski494/trening` @ 2d97581, odczyt 2026-11-11). Flow stuka po `id` (plik `.maestro/07-zamiana.yaml`, linie 41–42), komponent przekazuje opcjonalny `testID` (plik `components/ProgressBars.tsx`, linia 16), a test RNTL wciska element po `testID` (plik `tests/audit-m1-026-kolejnosc-menu.test.tsx`, linia 30). Wynika z tego, że wybór DK (opcja a) jest zgodny z Treningiem, a kontrolą powinien być test zachowania.
- Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `apps/mobile/src/app/session.tsx` (diff, przycisk pod oceną, górny „Zakończ”, `next`, ekran „Wynik”) | tak | odczyt; mutanty U1, U2; sonda RNTL (dowody/dl-sonda-rntl.txt) |
| `apps/mobile/src/components/ui.tsx` (`Button`) | tak | odczyt; mutant U1 z jest, `tsc` i testami skryptów (dowody/dl-mut-U1-button-bez-testid-jest.txt, dowody/dl-mut-U1-button-bez-testid-tsc.txt, dowody/dl-mut-U1-button-bez-testid.txt) |
| `apps/mobile/e2e/oczekujace/07-scenariusz.yaml` | tak, statycznie | porównanie z ekranem; mutanty U3, U4, U5 |
| `tests/narzedzia/df-flow-zakoncz.test.mjs`, `tests/narzedzia/e2e-flowy.test.mjs`, `package.json` (`test:skrypty`) | tak | odczyt; przebieg 14/14 (dowody/dl-baza.txt) |
| `tools/content-build/test/szablony-bs.test.ts` | tak | odczyt; mutanty A, A2, A3, B |
| `tools/content-build/test/szablony-co.test.ts` | tak | odczyt; mutanty F, Fk, F4, F4k; przebieg 21/21 |
| ścieżki wrażliwe D-043 | tak | dowody/dl-zakres.txt (trafienia tylko `tools/content-build/test/`), dowody/dl-regeneracja.txt |
| CI na `64eea6c7` | tak | MCP GitHub `get_workflow_run` 43006543702: `conclusion: success`, `head_sha` 64eea6c7 |
| przebieg flow 07 na symulatorze | nie | Linux bez Xcode; lista w „Do sprawdzenia” |
| `docs/jakosc/dowody/dk-ci.txt` (3319 linii) i pozostałe dowody DK | nie w całości | dowód autora; zamiast niego własne mutanty i odczyt CI |
| pełne `pnpm run ci` lokalnie | nie | nie było KRYT/WYS (polecenie DL pkt 3.2); CI GitHub na tym SHA zielone |

## Kontrola dowodów i sekretów
`node <scratchpad>/narz/sprawdz-raport.mjs docs/programista/recenzje/recenzja-dk-64eea6c7.md . docs/programista --rola 08-programista` → kod 0: „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | nie dotyczy: brak logiki domenowej w zakresie (wyrocznie testów sprawdzone w DEV-03) | — |
| DEV-02 | dotyczy | 3/3 commity zmieniające zachowanie lub testy mają test w tym samym commicie (6917fcfc: test + flow + ekran; 683fbf70 i a1eb967c: same testy); 64eea6c7 to dowód CI |
| DEV-03 | dotyczy | ok: bez `.skip`/`.only`, bez usuniętych asercji (diff testów to same dodane linie poza komentarzem nagłówka `df-flow-zakoncz`); siła testu poprawki 001: 08-programista-001 |
| DEV-04 | dotyczy | ok: testy w zakresie 14/14, 3/3, 21/21, jest 910/910 (dowody/dl-baza.txt); CI 43006543702 success |
| DEV-05, DEV-06 | nie dotyczy: brak zmian zapisu, schematu, migracji i kopii | — |
| DEV-07 | nie dotyczy: brak mapperów i parserów w zakresie | — |
| DEV-08 | nie dotyczy: brak dat | — |
| DEV-09 | nie dotyczy: brak danych z zewnątrz | — |
| DEV-10 | nie dotyczy: obsługa błędów bez zmian | — |
| DEV-11 | dotyczy (zmiana komponentu systemu) | ok: tylko prop niewizualny, bez kopii komponentu |
| DEV-12 | dotyczy | ok: brak nowych tekstów |
| DEV-13 | nie dotyczy: brak liczb konfiguracyjnych | — |
| DEV-14 | dotyczy | ok: w diffie brak plików kluczy i wzorców sekretów (dowody/dl-zakres.txt; skrypt kontroli raportu) |
| DEV-15, DEV-16 | nie dotyczy: brak nasłuchów, timerów i jednostek w zakresie | — |

## Znaleziska (szczegóły)

### 08-programista-001 · Poprawkę flow 07 chroni test tekstu źródła, więc `Button` gubiący `testID` przechodzi wszystkie testy, a flow padnie
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (ŚR wg skali recenzji, D-913: luka siły testu bez wpływu na to, co widzi użytkownik)
- Realność: brzegowy (refaktor `Button` w systemie projektowym, roli 04, może zgubić prop, którego nic poza flowem nie używa) · Pewność: wysoka
- Rodzaj: D
- Dowód:
  - test poprawki czyta tekst: `tests/narzedzia/df-flow-zakoncz.test.mjs:67` (regex na linię `<Button testID="sesja-dalej" label=…`) i `tests/narzedzia/df-flow-zakoncz.test.mjs:70` (napis `id: 'sesja-dalej'` gdziekolwiek we flowie);
  - mutant U1 (usunięte `testID={testID}`, `apps/mobile/src/components/ui.tsx:80`) przeżywa `df-flow-zakoncz` + `e2e-flowy` (14/14), jest 910/910 i `tsc --noEmit` (kod 0): dowody/dl-mut-U1-button-bez-testid.txt, dowody/dl-mut-U1-button-bez-testid-jest.txt, dowody/dl-mut-U1-button-bez-testid-tsc.txt;
  - mutant U4 (pętla flow stuka `'Zakończ'` zamiast po id, przy zostawionym `scrollUntilVisible` po id) przeżywa, bo napis `id: 'sesja-dalej'` nadal jest we flowie: dowody/dl-mut-U4-flow-tap-zakoncz.txt (samo zwykłe „Zakończ” we flowach jest celowe (D-941, `docs/decyzje/DK.md:6`), więc kontrola musi dotyczyć pętli flow 07, a nie zakazu tekstu);
  - mutanty U2 (testID też na górnym „Zakończ”), U3 (tekst `'(Dalej|Zakończ)'`) i U5 (literówka id) padają: dowody/dl-mut-U2-testid-na-gornym.txt, dowody/dl-mut-U3-flow-tap-tekst.txt, dowody/dl-mut-U5-flow-literowka-id.txt;
  - sonda RNTL (9 linii dopisanych do kopii `sesja-render-08`, plik dowody/dl-sonda-sesja-dalej.test.tsx.txt) przechodzi na `64eea6c7`, a pada na U1 („Unable to find an element with testID: sesja-dalej”) i na U2 („Expected length: 0, Received length: 1”): dowody/dl-sonda-rntl.txt;
  - regex na całą linię JSX pada też przy samym przeformatowaniu propsów w kilku liniach (fałszywa czerwień, bez skutku dla użytkownika).
- Mechanizm: kontrola poprawki przez tekst źródła zamiast przez render. `grep -n "readFileSync(join(ROOT, 'apps/mobile/src" tests/narzedzia/*.mjs` → 1 trafienie w zakresie (`tests/narzedzia/df-flow-zakoncz.test.mjs:66`); wcześniejszy test przesłanek (linia 46) pochodzi od DF i nie należy do zakresu DK.
- Powraca: nie → trwała kontrola: test RNTL w `sesja-render-08` (niżej).
- Wzorzec lub źródło: wzorce roli 08 „Dobry test” (ekran: „test sprawdza, że element się pojawił, i skutek w danych”); Trening, plik `tests/audit-m1-026-kolejnosc-menu.test.tsx`, linia 30 (wciśnięcie po `testID` w RNTL), odczyt 2026-11-11.
- Kroki w aplikacji: brak skutku dla użytkownika. Skutek dotyczy E2E: po refaktorze `Button` flow 07 na symulatorze nie znajdzie `sesja-dalej` i padnie po 30 s, a flow jest poza bramką (D-189), więc regresja wyjdzie dopiero przy ręcznym przebiegu.
- Opcje: (a) dopisać do `apps/mobile/src/__tests__/sesja-render-08.test.tsx` test z sondy: przed odpowiedzią 0 elementów `sesja-dalej`, po odpowiedzi dokładnie 1 z tekstem „Dalej”, wciśnięcie po id daje „2 z n” bez `router.back`. Regex z `df-flow-zakoncz` można wtedy zastąpić tym testem. Koszt: kilka linii, mutanty U1 i U2 padają (dowód w sondzie). (b) Dodatkowo w `df-flow-zakoncz` sprawdzić, że każdy `tapOn` w pętli `repeat` flow 07 jest po `id: 'sesja-dalej'` albo `option-0`/polu liczbowym (zabija U4). Koszt: kilkanaście linii parsowania YAML. (c) Zostawić bez zmian, bo przebieg flow 07 na symulatorze i tak wykryje U1. Kompromis: wykrycie dopiero przy ręcznym przebiegu E2E. Rekomendacja: (a), a (b) tylko jeśli flow 07 wejdzie do bramki bez przebiegu na każdej zmianie.
- Test akceptacyjny: test RNTL w `sesja-render-08` zielony na kodzie i czerwony na U1 oraz U2 (komendy jak w dowody/dl-sonda-rntl.txt).
- Status: otwarte.

### 08-programista-002 · D-940 podaje „Treningu nie sprawdzano (brak analogii)”, choć Trening ma analogię
- Pozycja listy kontrolnej: DEV-02
- Poziom: P2 (NIS, proces: CLAUDE.md „Delegacja decyzji”, D-191)
- Realność: realny dla rejestru decyzji, bez skutku w kodzie · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/decyzje/DK.md:5` „Treningu nie sprawdzano (brak analogii dla tego flowu, D-912)”. Tymczasem repo `lkarwowski494/trening` @ 2d97581 (odczyt 2026-11-11) ma flow po `id` (plik `.maestro/07-zamiana.yaml`, linie 41–42), opcjonalny `testID` przekazywany w komponencie (plik `components/ProgressBars.tsx`, linia 16) i testy RNTL po `testID` (plik `tests/audit-m1-026-kolejnosc-menu.test.tsx`, linie 30 i 38). D-912 (DF) dotyczyło testu odtwarzającego poza `test:skrypty`, a nie wyboru selektora.
- Mechanizm: odwołanie do cudzej decyzji o innej sprawie jako powód pominięcia analogii; `grep -n "Treningu nie sprawdzano" docs/decyzje/*.md` → 1 trafienie (`docs/decyzje/DK.md:5`).
- Powraca: nie.
- Wzorzec lub źródło: CLAUDE.md „Delegacja decyzji” (D-191, 2026-11-07).
- Kroki w aplikacji: brak.
- Opcje: (a) dopisać do D-940 analogię z Treningu (wspiera wybór DK). Koszt: jedna komórka tabeli. (b) Zostawić, bo decyzja jest i tak zgodna z Treningiem. Kompromis: rejestr podaje nieprawdziwą przesłankę. Rekomendacja: (a), przy najbliższej sesji naprawy.
- Test akceptacyjny: D-940 ma odwołanie `repo:plik:linia` do Treningu z datą odczytu.
- Status: otwarte.

## Do sprawdzenia (pewność ≤ 80%)
Do potwierdzenia przebiegiem E2E flow 07 na runnerze macOS (Maestro nie działa w Linuksie):
- `testID` z `Button` (`Pressable` z `accessibilityRole="button"`, bez rodzica `accessible`) jest widoczny dla Maestro jako `id` na iOS. Inne flowy bramki stukają po `id` w `Pressable` (np. `option-0`), więc przez analogię tak, ale dla tego elementu nie zostało to sprawdzone.
- `scrollUntilVisible` po `id: 'sesja-dalej'` znajduje przycisk pod długim wyjaśnieniem (`Feedback`) przy `centerElement: true`.
- Na ostatnim zadaniu ten sam `id` niesie „Zakończ” (`session.finish`), a `next` prowadzi do ekranu „Wynik” (`session.resultTitle`, `apps/mobile/src/i18n/locales/pl.json:212`). Statycznie pętla `while: notVisible: 'Wynik'` kończy się poprawnie.
- Punkty z „Do sprawdzenia” DF bez zmian: etykieta pola liczbowego, klawiatura a „Sprawdź”, trwałość ukończenia po `stopApp`, budżet 3 min na flow.

## Co działa dobrze i należy zachować
- Wybór selektora po `id` zamiast `index` albo `below:`: nie zależy od języka ani kolejności drzewa, zgodny z resztą flowów i z Treningiem.
- `testID` dodany jako opcjonalny prop w jednym miejscu (`Button`), bez kopii komponentu i bez zmiany wyglądu.
- 002: asercja na pełny komunikat z numerem punktu (`^\d+#2: … \(D-630\)$`) zabija także mutanty spoza dowodów autora (A2: zły numer punktu, A3: warunek na turnie).
- 003: wyrocznia `gotowyUklad` z samych rang i kolorów, z przypadkami jednostkowymi (strit, koło, kolor, draw, nic), niezależna od `classifyHolding`. D-943 (bez przywracania `cls === 'air'`) uznaję za trafne: F i F4 padają na niezależnej kontroli.
- `df-flow-zakoncz` jest w `pnpm test:skrypty`, więc warunek DF jest spełniony.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje techniczne recenzenta D-950 i D-951 są w `docs/decyzje/DL.md` (do weta).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002` (test RNTL `sesja-dalej` w `sesja-render-08` według sondy dowody/dl-sonda-sesja-dalej.test.tsx.txt; uzupełnienie D-940). Nie blokuje przyjęcia DK. Potem przebieg E2E flow 07 na runnerze macOS za zgodą właściciela.
