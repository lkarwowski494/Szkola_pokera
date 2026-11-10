# Audyt: Programista — Szkoła Pokera — 2026-11-10 (recenzja CH scalenia CD)
Commit: 07b04fb (zakres `70fdf40..07b04fb` poza gałęziami BT 713314b, BS 866744e, BU 6a5ca17, BY b5325bb) · Tryb: audit · Środowisko: Linux, Node 22.23.4, pnpm 10.28.0, 4 rdzenie; testy, typecheck, `pnpm content:build` działają; bez iOS/Xcode (ekranu na urządzeniu nie oglądano).

## Podsumowanie
Werdykt: **do poprawki przed wydaniem** (1 WYSOKIE). Scalenie miało konflikty tekstowe tylko w `96ce106` (BU): trzy testy content-build i pliki generowane; rozwiązania są poprawne (wersja BS to nadzbiór, regeneracja treści bez różnic). Konflikt semantyczny BT×BU w adapterze `naGenerator` CD naprawił tylko w typach: adapter nadal nie przekazuje `stackBb`, więc na ekranie nie działa ograniczenie zakładu do stosu z BU (ŚR-203), a punkty `range-spot` i linia `all-in` są zmapowane, ale na ekranie zawsze kończą się błędem planu. Przepisany test „wkrótce” nie osłabia asercji; limit 120 s jest uzasadniony pomiarem, ale bez kontroli wzrostu kosztu.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS (P1) | D | Ekran scenariusza pokazuje zakład do sprawdzenia większy niż stos gracza (`naGenerator` bez `stackBb`) | otwarte |
| 08-programista-002 | ŚR (P2) | D | Szablon z punktem `range-spot` albo linią `all-in` na ekranie zawsze daje „plan niepoprawny”, a budowanie treści go przepuszcza | otwarte |
| 08-programista-003 | ŚR (P2) | D | Limit 120 s ukrywa liniowy wzrost kosztu kompilacji treści (ok. 7,5 s na szablon) | otwarte |
| 08-programista-004 | NIS (P2) | D | Gałąź „wkrótce” (pusta lista scenariuszy) straciła jedyny test | otwarte |

## Linia bazowa i założenia
Linia bazowa (przed czytaniem uzasadnień CD): scalenie wielu gałęzi jest poprawne, gdy (1) każde rozwiązanie konfliktu zachowuje sumę zachowań obu stron, (2) styki bez konfliktu tekstowego (ten sam kontrakt używany przez dwie gałęzie) dają to samo zachowanie w aplikacji co w budowaniu treści, (3) testy zmienione przy scaleniu sprawdzają co najmniej tyle co wcześniej, (4) pliki generowane są wynikiem generatora, nie ręcznego scalania.

Wymiary pokrycia:
- Ścieżki zapisu: scalenie nie zmienia zapisu danych użytkownika (`packages/postep`, `apps/mobile/src/data` bez zmian w rozwiązaniach); sprawdzone, brak. Wznowienie scenariusza odtwarza wariant z ziarna (patrz „Do sprawdzenia”).
- Obsługa błędów: błąd generatora na ekranie zamienia się w `plan_niepoprawny` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:90`); dotyczy 002.
- Typy na granicach: odczyt szablonów z bazy przez `ScenarioTemplate.safeParse` (`apps/mobile/src/data/content/repo.ts:256`); tabela `scenarios` z BU ma kolumny, których oczekuje BT (sprawdzone na bazie pl). Brak znalezisk.
- System projektowy, i18n, dostępność: scalenie nie zmieniło ekranów poza testem; sprawdzone, brak.
- Wydajność: kompilacja treści 0,8 s → 24 s (003).
- Testy na właściwym poziomie: test ekranu używa szablonu SC-01 ze stosem 100 bb, przy którym ograniczenie stosu nie działa, dlatego 001 nie wyszło w CI.
- Liczby konfiguracyjne: `MARTWE_BLINDY_BB` tylko w generatorze; brak nowych.

Soczewki: recenzent szukający ścieżki bez testu (001, 004), programista czytający adapter pierwszy raz (001, 002: dwa adaptery szablon → generator, budowanie i ekran, z różnym zestawem pól). Wzorzec: jedna funkcja odwzorowania szablonu treści na szablon generatora używana przez budowanie i aplikację (zasada „jedna definicja”, komentarz `apps/mobile/src/features/scenariusz/wariant.ts:19`). Zmian w rejestrze założeń nie proponuję.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Commity scaleń 687ef5d, 87e51ad, 96ce106, 61d9318 (`--remerge-diff`) | tak | dowody/ch-remerge-diff.txt |
| 96ce106: `build.test.ts`, `liczby-jezyk-08.test.ts`, `szablon-scenariusza-bf.test.ts` | tak, diff wobec obu rodziców | dowody/ch-remerge-diff.txt |
| 96ce106: `tresc.generated.ts`, 35 baz `tresc-*.db` | tak, regeneracja | dowody/ch-content-build-regen.txt |
| 50f5ec5: `wariant.ts` (`naGenerator`) | tak, kod + test | dowody/ch-czerwony-stos.txt |
| 50f5ec5: `menu-bi.test.tsx` | tak, kod ekranu `WyborScenariusza.tsx` | — |
| 50f5ec5: `build.test.ts` limit | tak, pomiar na 5 commitach | dowody/ch-czasy-kompilacji.txt, dowody/ch-czas-szablonow.txt, dowody/ch-build-test-czasy.txt |
| 50f5ec5, 07b04fb: dokumenty (`docs/decyzje*`, `stan-cd.md`, dowód CI) | przeczytane po własnej ocenie | — |
| Ekran scenariusza na urządzeniu | nie (Linux, bez symulatora) | — |
| Kod gałęzi BT, BS, BU, BY poza stykami | nie (zrecenzowane wcześniej, poza zakresem) | — |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-cd-07b04fb.md . --rola 08-programista` → `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista` (kod 0). CI: stan wyjściowy dowody/ch-ci-wyjsciowe.txt (kod 0); po dodaniu testu odtwarzającego `docs/programista/dowody/ch-ci-840e7e2.txt` (kod 0; 818 testów mobile, w tym `recenzja-ch-stos.test.ts`).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy (adapter `naGenerator`) | 08-programista-001, 08-programista-002 |
| DEV-02 | dotyczy (50f5ec5) | 1/1 commit zmieniający zachowanie (`wariant.ts`) bez testu nowego zachowania (`kind`, `villain`); w raporcie przy 001 |
| DEV-03 | dotyczy | menu-bi: nie osłabiony (004 dotyczy utraty pokrycia gałęzi, nie asercji); limit czasu: 003 |
| DEV-04 | dotyczy | `pnpm run ci` kod 0 (dowody/ch-ci-wyjsciowe.txt) |
| DEV-05, DEV-06 | nie dotyczy: scalenie nie zmienia zapisu, migracji ani kopii | — |
| DEV-07 | dotyczy | ok: brak zgadniętych wartości w rozwiązaniach (brak `stackBb` to 001, nie wartość domyślna) |
| DEV-08 | nie dotyczy: brak dat w zakresie | — |
| DEV-09 | dotyczy (odczyt szablonów) | ok, `safeParse` |
| DEV-10 | dotyczy | 002 (błąd treści widoczny dopiero na ekranie) |
| DEV-11, DEV-12, DEV-15 | nie dotyczy: brak zmian ekranów i tekstów w zakresie | — |
| DEV-13 | dotyczy | ok |
| DEV-14 | dotyczy | ok: diff zakresu bez sekretów (`git diff 70fdf40..07b04fb` przejrzany pod kątem plików kluczy) |
| DEV-16 | dotyczy (bb, stos) | 001 |

## Znaleziska (szczegóły)

### 08-programista-001 · Ekran scenariusza pokazuje zakład do sprawdzenia większy niż stos gracza
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (WYSOKIE wg progu wydania: błędna liczba w głównym przepływie)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:21` zwraca `{ id, levels, decisions }` bez `stackBb`; generator ogranicza zakład do stosu tylko z `stackBb` (`packages/poker-core/src/scenario-gen.ts:245` "bez stackBb bez ograniczenia"), a budowanie treści je przekazuje (`tools/content-build/src/scenariusze.ts:121` "stackBb: t.stackBb"). Test odtwarzający `apps/mobile/src/features/scenariusz/__tests__/recenzja-ch-stos.test.ts` bez `.failing`: kod 1, SC-02 łatwy 20/200 wariantów (zakład 24 bb przy stosie 23,75 bb), SC-19 łatwy 74/200 (do 26 bb przy 22,75 bb); ten sam szablon ze `stackBb` 0/400 (dowody/ch-czerwony-stos.txt). Z `.failing` zielony (dowody/ch-zielony-failing.txt).
- Mechanizm: dwa adaptery szablon treści → szablon generatora z różnym zestawem pól; `grep -rn "naGenerator\|as GeneratorTemplate" apps tools` → 2 miejsca budujące `GeneratorTemplate`: `apps/mobile/src/features/scenariusz/wariant.ts:20`, `tools/content-build/src/scenariusze.ts:121`. BT pisało adapter przed ograniczeniem stosu z BU, CD dopasowało tylko pola decyzji.
- Powraca: tak, cofa na ekranie poprawkę BU ŚR-203 (KO-051) → trwała kontrola: test odtwarzający w CI (D-740).
- Wzorzec lub źródło: komentarz `apps/mobile/src/features/scenariusz/wariant.ts:19` „jedna definicja granic dla treści i generatora”.
- Kroki w aplikacji: po pierwszej lekcji modułu 2 → Scenariusze → SC-19 (35 bb), poziom łatwy → na turnie „do sprawdzenia 26 bb”, choć gracz ma za pulą 22,75 bb. Także „Zagraj jeszcze raz” i wznowienie (ten sam adapter, `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:57`).
- Opcje: (A) `naGenerator` przekazuje `stackBb` — jedna linia, ale dwa adaptery dalej mogą się rozjechać; (B) jedna wspólna funkcja odwzorowania w `poker-core` albo `content-schema`, używana przez budowanie i aplikację — większa zmiana, usuwa mechanizm. Rekomendacja: B (A jako minimum przed wydaniem).
- Test akceptacyjny: `recenzja-ch-stos.test.ts` z `it.failing` → `it` przechodzi; test, że budowanie i ekran dają ten sam odcisk wariantu dla tego samego ziarna.
- Status: otwarte

### 08-programista-002 · Szablon z punktem range-spot albo linią all-in na ekranie zawsze daje „plan niepoprawny”
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 (ŚREDNIE; staje się WYSOKIE w chwili dodania takiego szablonu do `content/`)
- Realność: brzegowy (dziś `content/pl/scenarios` ma tylko draw-call z `villain: bet`) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:21` mapuje `range-spot` i `villain`, ale `generateVariant` na ekranie dostaje szablon bez kontekstu spotów i bez `stackBb`: range-spot rzuca `packages/poker-core/src/scenario-gen.ts:195` "punkt range-spot wymaga danych zakresów", all-in rzuca `packages/poker-core/src/scenario-gen.ts:160` "linia all-in wymaga stackBb"; ekran zamienia to w `plan_niepoprawny` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:90`). Ekran i tak liczy kroki z `v.decisions` (tylko draw-call), a wyjaśnienia z `s.decisions[indeks]` (wszystkie punkty), więc indeksy rozjadą się po dodaniu kontekstu. Budowanie przepuszcza takie szablony (`tools/content-build/src/build.ts:401` sprawdza generator z kontekstem).
- Mechanizm: ten sam co 001 (adapter ekranu niepełny wobec budowania).
- Powraca: nie (CD zapisało brak kontekstu spotów jako [DO USTALENIA] po własnej ocenie; linia all-in nie była wymieniona).
- Wzorzec lub źródło: zasada 18 (funkcja bez użycia w aplikacji to martwa ścieżka).
- Kroki w aplikacji: po dodaniu szablonu F1 albo F5 (szkice BS b9a656a) → Scenariusze → wybór → błąd planu zamiast rozdania.
- Opcje: (A) budowanie odrzuca `range-spot` i `all-in` do czasu obsługi na ekranie — tanie, blokuje treść; (B) ekran filtruje nieobsługiwane szablony z listy — treść w bazie, niewidoczna; (C) obsługa na ekranie (kontekst spotów, preflop, indeksy po `points`) — pełne, osobna praca. Rekomendacja: A teraz, C jako zadanie roli 08 przed pierwszym szablonem F1/F5.
- Test akceptacyjny: test budowania, że szablon `range-spot`/`all-in` jest odrzucony z komunikatem albo test ekranu, że taki szablon daje rozdanie.
- Status: otwarte

### 08-programista-003 · Limit 120 s ukrywa liniowy wzrost kosztu kompilacji treści
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (ŚREDNIE)
- Realność: realny (CI), bez skutku dla użytkownika · Pewność: wysoka
- Rodzaj: D
- Dowód: `compileContent` pl: 70fdf40 0,8 s; BS 866744e 15,8 s; po scaleniu BS 87e51ad 15,4 s; BU 6a5ca17 24,1 s; HEAD 24,2 s (dowody/ch-czasy-kompilacji.txt). Koszt to `checkScenarioGenerator` (2000 losowań na poziom): sc-01 9,8 s, sc-02 5,2 s, sc-19 7,8 s (dowody/ch-czas-szablonow.txt). Sam plik `build.test.ts`: deterministyczność 39,1 s, „kompiluje się” 19,9 s przy limicie 30 s (dowody/ch-build-test-czasy.txt); cały pakiet content-build w CI 258 s (dowody/ch-ci-wyjsciowe.txt).
- Mechanizm: scalenie nie wprowadza regresu (HEAD = tip BU), limit 30 s nie był budżetem wydajności, tylko zabezpieczeniem; ale przy ok. 7,5 s na szablon test 120 s padnie przy ok. 8 szablonach (plan BS: 14), a `tools/content-build/test/build.test.ts:81` (jedna kompilacja, 30 s) wcześniej. `grep -rn "compileContent(" tools/content-build/test` → 34 wywołania w 13 plikach, każde płaci pełną kontrolę generatora.
- Powraca: tak (limit podnoszony w BS D-555, BU, CD D-720) → trwała kontrola: test budżetu czasu.
- Wzorzec lub źródło: D-720 (pomiar CD 16 s odpowiada stanowi po BS, nie HEAD).
- Kroki w aplikacji: brak (CI i `pnpm content:build`).
- Opcje: (A) `CompileOptions` z liczbą prób generatora; deterministyczność z np. 200 próbami i tą samą asercją hasha (hash nie zależy od kontroli generatora, `tools/content-build/src/build.ts:401` dodaje tylko błędy) + osobny test "kontrola generatora ≤ N s na szablon" — utrzymuje pełną kontrolę w `content:build`; (B) pamięć podręczna wyniku kontroli po hashu szablonu w procesie — druga kompilacja darmowa, ale pierwsza dalej rośnie. Rekomendacja: A.
- Test akceptacyjny: deterministyczność < 30 s przy obecnej treści, test budżetu na szablon czerwony po sztucznym spowolnieniu generatora.
- Status: otwarte

### 08-programista-004 · Gałąź „wkrótce” (pusta lista scenariuszy) straciła jedyny test
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (NISKIE)
- Realność: teoretyczny (każda z 35 baz ma 3 szablony, także języki bez katalogu `scenarios`) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/__tests__/menu-bi.test.tsx:235-243` sprawdza teraz listę z bazą pl (brak "wkrótce", przyciski wyłączone z "Po pierwszej lekcji modułu N") — asercje nie są słabsze, "brak martwego przycisku" zachowany przez `disabled`. Gałąź `grupy.length === 0` (`apps/mobile/src/features/scenariusz/WyborScenariusza.tsx:24-27`) nie ma już testu (`grep -rln "scenarios.soon" apps/mobile/src --include=*.test.tsx` → tylko asercja `toBeNull`).
- Mechanizm: test przepisany zamiast uzupełniony.
- Powraca: nie
- Wzorzec lub źródło: D-722 (CD sam wskazuje test pustej listy dla roli 07).
- Kroki w aplikacji: brak przy obecnej treści.
- Opcje: (A) test komponentu `WyborScenariusza` z `grupy=[]` — bez zmiany kodu ekranu; (B) zostawić do roli 07. Rekomendacja: A (komponent przyjmuje `grupy` w propsach, nie trzeba wstrzykiwać portu).
- Test akceptacyjny: `WyborScenariusza grupy=[]` pokazuje „wkrótce” i 0 przycisków.
- Status: otwarte

## Do sprawdzenia
- Wznowienie i „Zagraj jeszcze raz” odtwarzają wariant z samego ziarna (`packages/domena/src/maszyny.ts:27-30`, bez odcisku); naprawa 001 zmieni warianty dla zapisanych ziaren, więc rozdanie w toku po aktualizacji pokaże inne karty ze starymi odpowiedziami. Dziś bez skutku (ekran scenariusza nie był w buildach 1005–1008, brak danych użytkowników) [DO USTALENIA: czy porównywać odcisk przy wznowieniu].
- Bazy treści języków bez katalogu `scenarios` (np. hr) mają 3 szablony: zakładam przejście przez en; nie sprawdzałem, czy teksty są angielskie celowo (rola 09).

## Co działa dobrze i należy zachować
- Rozwiązania konfliktów 96ce106: wersja BS fikstury (`readdirSync` po wszystkich językach) to nadzbiór wersji BU (tylko pl, en); testy BU poza konfliktem zachowane w całości (`git diff 6a5ca17 HEAD -- tools/content-build/test/` tylko w hunkach konfliktu).
- Pliki generowane nie były scalane ręcznie: `pnpm content:build` na 07b04fb daje zero różnic, `git status --porcelain` czysty poza testem recenzji (dowody/ch-content-build-regen.txt).
- Mapowanie po `kind` zamiast rzutowania `as` (typy łapią unię decyzji); test menu po scaleniu dalej sprawdza „brak martwego przycisku”.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje techniczne recenzji (D-740 forma testu odtwarzającego, D-741 poziom 001, D-742 ocena limitu) w `docs/decyzje/CH.md`, do weta. Wybór opcji przy 002 (A: blokada w budowaniu teraz) należy do koordynatora razem z rolą 03, bo blokuje treść F1/F5.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-004`

`git status --porcelain` przed commitem recenzji (pliki śledzone nietknięte): tylko nowe pliki `?? apps/mobile/src/features/scenariusz/__tests__/recenzja-ch-stos.test.ts`, `?? docs/decyzje/CH.md`, `?? docs/programista/recenzje/`.
