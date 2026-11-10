# Scenariusze 1.0: rozkład szablonów, kolejność budowy, analogia z Treningu, skutki poza aplikacją
Stan: 2026-11-10 · Rola 03 build, sesja BD (zadania 4–6) · Decyzje właściciela: KO-035…KO-041 (gałąź `koordynacja`, `docs/koordynacja/decyzje.md:43-49`) · Decyzje agenta: D-530…D-536 (`docs/decyzje.md`, do weta) · Wymagania: `docs/brd/wymagania-scenariusze.md`

## 1. Co już umie silnik (odczyt kodu @ 00b0566)
| Element | Gdzie | Co losuje / liczy | Dla scenariuszy |
|---|---|---|---|
| `rangeDecision` | `apps/mobile/src/features/drills/engine.ts:425` | spot preflop z `content/ranges/spots.yaml` (rfi, vs-open, call.bb-N, push.sb-N, 3max, ante), klasa ręki z wagą ku granicznym, kolory | decyzje preflop z oceną RD-11 (solver zwalidowany tylko preflop, `spots.yaml:1-5`) |
| `cbet` | `engine.ts:165` | przypadek z treści i flop o tej teksturze | decyzja c-betu na flopie (reguła `cbet-case`, 3 przypadki) |
| `drawCall`, `potOdds`, `outs` | `engine.ts:393`, `:356`, `:331`; `packages/poker-core/src/drills.ts:164-204` | draw, karty, stół, pula, zakład (8 ułamków); margines `DRAW_CALL_MIN_GAP` 2 pp | decyzje sprawdzenia drawem na flopie i turnie (rachunek, reguły `draw-price`, `implied-odds`) |
| `whoWins`, `bestHand` | `engine.ts:274`, `:293` | ręce i stół | pokazanie kart (RD-10) |
| `icm` | `engine.ts:237`, `:252` | struktura, stacki, equity jako liczba 30–75% | decyzje turniejowe (M11) |
| `playerType` | `engine.ts:225` | typ, VPIP, PFR, próba | opis rywala (M10) |
| `permuteSituation` | `packages/poker-core/src/situation.ts:66-79` | permutacja kolorów (23) przy niezmiennej decyzji | wariant „ten sam odcisk, inne kolory” |
| przebieg scenariusza | `packages/domena/src/scenariusz.ts` | deterministyczny przebieg z treści (D-109, RD-11, RD-10) | rdzeń przebiegu; brak: szablon → wariant (generator), historia odcisków, poziom |
| automatyczne sprawdzenie reguł | `content/pl/rules.yaml` pole `check`; `packages/poker-core/src/grading.ts` | 21 ze 141 reguł: `solver-spot` 9, `cbet-case` 3, `draw-price` 2, `implied-odds`, `free-check-fold`, `no-limp`, `open-size`, `iso-size`, `three-bet-size` 2 | wyrocznia testu BR-GEN-003 tam, gdzie jest; gdzie nie ma — warunek reguły do napisania (ZAL-013) |

Brakuje w każdym szablonie: generator wariantu (granice, odrzucanie, ziarno), łączenie ulic w jedną linię rywala, historia odcisków (dane postępu, F-14), poziom (BR-POZ), wyjaśnienie z kontekstem sytuacji (BR-OCE-001; dziś generatory decyzji nie mają pozycji ani rywala, `ocena-wyjasnien-ko040.md` wzorzec 2).

## 2. Proponowany zestaw: 34 szablony (D-536, [OCENA] do przeglądu roli 06)
Kryterium doboru: każdy moduł M2–M11 ma 3–4 sytuacje „od prostej do trudnej” (KO-037), każda decyzja ma regułę z `rules.yaml` albo rachunek; M0, M1, M12, M13 bez scenariuszy (zasady, przebieg, mental game, analiza — nie ma tam decyzji w rozdaniu). „Silnik”: **umie** = wszystkie decyzje mają generator i automatyczne sprawdzenie; **częściowo** = część decyzji bez sprawdzenia albo bez generatora tej ulicy; **brakuje** = decyzje na regułach bez `check` (warunek i źródło do zrobienia w 06 + 08, ZAL-013). Poziomy: Ł / Ś / T.

| ID | Moduł | Sytuacja (linia) | Reguły / rachunek | Poziomy | Silnik | Czego brakuje |
|---|---|---|---|---|---|---|
| SC-01 | M2 | flop: kolor-draw wobec zakładu ½ puli, turn: brak trafienia | R-M2-001, R-M2-003 | Ł Ś T | umie | linia ulic, kontekst pozycji w wyjaśnieniu |
| SC-02 | M2 | turn: strit dwustronny wobec zakładu wielkości puli | R-M2-004, R-M7-007 | Ł Ś T | umie | jw. |
| SC-03 | M2 | flop: gutshot wobec dużego zakładu (pas) | R-M2-005, R-M2-002 | Ł Ś | umie | jw. |
| SC-04 | M3 | UTG otwiera ręką graniczną, c-bet na suchym wysokim flopie | R-M3-002, R-M5-007 | Ł Ś T | umie | łączenie preflop → flop |
| SC-05 | M3 | Button otwiera szeroko, BB broni, flop niski | R-M3-003, R-M5-004 | Ł Ś T | umie | jw. |
| SC-06 | M3 | mały blind: przebicie albo pas, bez limpu | R-M3-009, R-M3-004 | Ł Ś | umie | — |
| SC-07 | M4 | BB broni wobec Buttona, flop: kontynuacja parą albo drawem | R-M4-004, R-M6-006 | Ł Ś T | częściowo | sprawdzenie R-M6-006 (heuristic) |
| SC-08 | M4 | Button 3-betuje otwarcie CO, rozmiar 3-betu | R-M4-003, R-M4-001 | Ł Ś T | umie | — (tylko preflop i rozmiar) |
| SC-09 | M4 | izolacja limpera, rozmiar i ręka | R-M4-012, R-M4-013 | Ł Ś | częściowo | rozmiar ma `iso-size`; warunek zakresu R-M4-013 |
| SC-10 | M4 | otwarcie wobec 3-betu: pas, sprawdzenie albo 4-bet | R-M4-007, R-M4-010 | Ł Ś T | częściowo | spot „vs 3-bet” wycofany z solvera (`spots.yaml:3`) → reguła heuristic |
| SC-11 | M5 | c-bet na suchym wysokim flopie z pozycją | R-M5-007, R-M5-003 | Ł Ś T | umie | — |
| SC-12 | M5 | niski połączony flop: czekanie | R-M5-004 | Ł Ś T | umie | — |
| SC-13 | M5 | mokry flop: rzadziej, większy rozmiar | R-M5-008, R-M5-011 | Ł Ś T | umie | — |
| SC-14 | M5 | c-bet bez pozycji | R-M5-012, R-M5-013 | Ł Ś | częściowo | sprawdzenie R-M5-012 |
| SC-15 | M6 | obrona wobec małego c-betu (nie pasuj za łatwo) | R-M6-003, R-M6-001 | Ł Ś T | częściowo | warunek R-M6-003 |
| SC-16 | M6 | check-raise z mocnym drawem | R-M6-008, R-M6-010 | Ś T | brakuje | warunek R-M6-008, rozmiar R-M6-010 |
| SC-17 | M6 | suchy flop z asem, słaba ręka: pas | R-M6-007 | Ł Ś | częściowo | warunek R-M6-007 |
| SC-18 | M7 | second barrel na karcie dobrej dla otwierającego | R-M7-001, R-M7-005 | Ś T | brakuje | klasyfikacja karty turnu |
| SC-19 | M7 | draw na turnie: cena wobec implied odds | R-M7-008, R-M7-009 | Ł Ś T | umie | — (`implied-odds`) |
| SC-20 | M7 | semi-blef drawem na turnie | R-M7-006, R-M7-002 | Ś T | częściowo | warunek R-M7-002 |
| SC-21 | M7 | średnia ręka na turnie: czekanie | R-M7-003, R-M7-012 | Ł Ś | brakuje | warunek R-M7-003 |
| SC-22 | M8 | river: cienki value bet | R-M8-001, R-M8-003 | Ś T | brakuje | rachunek „ręce, które zapłacą” na zakresie rywala |
| SC-23 | M8 | river: blef nietrafionym drawem z blokerem | R-M8-006, R-M8-007 | Ś T | brakuje | warunek blokera |
| SC-24 | M8 | river: sprawdzenie bluff-catcherem wobec betu wielkości puli | R-M8-010, R-M8-012 | Ł Ś T | częściowo | rachunek ceny jest; skład blefów — reguła |
| SC-25 | M8 | river: czekanie do showdownu ręką średnią | R-M8-002 | Ł Ś | brakuje | warunek R-M8-002 |
| SC-26 | M9 | niski SPR: top para gra o cały stack | R-M9-001, R-M9-003, R-M9-010 | Ł Ś T | brakuje | rachunek SPR jest (F-09), warunek strefy |
| SC-27 | M9 | 3-bet pot: rozmiar geometryczny | R-M9-006, R-M9-009 | Ś T | brakuje | rachunek jest (R-M9-006 math), linia 3 ulic |
| SC-28 | M9 | ile ulic wartości z overparą | R-M9-008 | Ł Ś | brakuje | warunek R-M9-008 (uproszczenie nazwane) |
| SC-29 | M10 | rywal pasywny: więcej value, mniej blefów | R-M10-006, R-M10-004 | Ł Ś | brakuje | `typRywala` z populacją (exploit) |
| SC-30 | M10 | nit 3-betuje: pas ręką z dołu zakresu | R-M10-007 | Ł Ś | brakuje | jw. |
| SC-31 | M10 | rywal agresywny: pozwól mu betować | R-M10-008 | Ś T | brakuje | jw. |
| SC-32 | M11 | push/fold z małego blinda przy ok. 10bb | R-M11-001, R-M11-002 | Ł Ś T | umie | — (`push.sb-N`) |
| SC-33 | M11 | duży blind sprawdza all-in | R-M11-006, R-M11-007 | Ł Ś T | umie | — (`call.bb-N`) |
| SC-34 | M11 | bańka: sprawdzenie ciaśniej (ICM) | R-M11-009, R-M11-010 | Ł Ś T | umie | equity z kart zamiast liczby losowej |

Podsumowanie: 34 szablony, 17 z trzema poziomami; silnik **umie** 14, **częściowo** 8, **brakuje** 12. Część „umie + częściowo” (22 szablony) pokrywa M2–M7 i M11 po 2–4; do progu BR-SZB-002 (≥ 30 szablonów, ≥ 2 na moduł) potrzebna jest część „brakuje”, bo M8 ma w niej 1 szablon, a M9 i M10 żadnego — to zależy od ZAL-013. Rola 06 może zamienić sytuację na inną z tego samego modułu, jeśli źródło nie rozstrzyga (wtedy wpis w tej tabeli i D-nnn).

## 3. Kolejność i podział pracy ([OCENA] czas agenta; sesja ≈ 3–6 h)
| Krok | Rola | Zakres | Zależy od | Szacunek |
|---|---|---|---|---|
| A | 04 | ekran scenariusza (start z przełącznikiem poziomu, punkt decyzji, ocena „dlaczego dobrze / dlaczego źle”, podsumowanie bez wygranej, „Zagraj jeszcze raz” / „Nowe rozdanie”), kafelek bez treści, ekran główny z kafelkami w 2 wariantach do wyboru właściciela (KO-041), zębatka (KO-036, BR-MENU-003) | — | 1 sesja |
| B | 08 | format szablonu w `content-schema` i `content-build` (BR-SZB-001), generator wariantu z ziarnem i odrzucaniem, odcisk i historia 20 (migracja w transakcji, eksport/import/usunięcie — ścieżka wrażliwa `packages/postep/`, przegląd D-043), test 10 000 losowań z wyrocznią niezależną (BR-GEN-003) | — | 1–1,5 sesji |
| C | 06 | szablony „umie” (14): SC-01–06, 08, 11–13, 19, 32–34; wyjaśnienia wg BR-OCE-001/002 | B (format) | 1 sesja |
| D | 06 | szablony „częściowo” (8) + warunki reguł do sprawdzenia | C | 1 sesja |
| E | 06 + 08 | szablony „brakuje” (12): źródło każdej decyzji (ADR-24), warunek w `grading.ts`, `typRywala` z populacją dla M10 | D; ZAL-013 | 1,5–2 sesje |
| F | 08 | ekran przebiegu (tryb scenariusza w `session.tsx` albo osobny), poziom auto + przełącznik (BR-POZ-002), wejście z kafelka, „Zagraj jeszcze raz” | A, B, C (pierwsze 3 szablony) | 1 sesja |
| G | 08 | ekran główny z kafelkami i lista lekcji osobno (BR-MENU-001/002), zębatka (BR-MENU-003) | A + wybór właściciela | 0,5 sesji |
| H | 06 (+08 szablony tekstów generatorów) | przeróbka istniejących wyjaśnień wg KO-040 (`ocena-wyjasnien-ko040.md`): najpierw generatory decyzji i egzaminy | — (równolegle) | 1–2 sesje |
| I | 09 | przekład szablonów i nowych tekstów na 11 języków (KO-035: „przekład 11 języków”) | C–E, H | 1–2 sesje |
| J | 07 | flow `07-scenariusz.yaml` z `oczekujace/` do bramki, flow ekranu głównego, testy akceptacji BR-SZB/GEN/POZ/OCE/MENU | F, G | 0,5 sesji |
| K | 10 | `purchase.unlocks`, metadane sklepu, ankieta wiekowa (§5) | C, F | 0,5 sesji |

Razem ok. 10–13 sesji agentów [OCENA]. Równolegle od razu: A, B, H. Ścieżka krytyczna: B → C → D → E → I → J → audyt M1 → build. Czekanie: CI i E2E (GitHub Actions, minuty macOS dla Maestro). Czas właściciela: wybór wariantu ekranu głównego (A), lista telefonu (T-09, T-11 w `scope-contract.md`).

## 4. Analogia w Treningu (`lkarwowski494/trening` @ 2e4b0f8, odczyt 2026-11-10)
| Sprawa | Trening | Decyzja tu |
|---|---|---|
| Generator na regułach ze źródłem | „opiera się na regułach z potwierdzonych źródeł” (`README.md:39-40`); każda stała ze źródłem i statusem „potwierdzone / konwencja / uproszczenie” (`docs/24-generator-i-plany.md:42-59`, `lib/generator.ts:54-55`, `:76-77`) | analogicznie: każdy punkt decyzji szablonu wskazuje regułę z poziomem pewności albo rachunek (BR-SZB-001, D-533) |
| Wynik powtarzalny | ten sam wynik dla tych samych danych (`tests/generator.test.ts:58-62`, `expect(generate(...)).toEqual(r)`) | analogicznie: wariant = szablon + poziom + ziarno, powtórzenie ziarna = te same karty (BR-GEN-001, D-531) |
| Walidacja | wyrocznie liczące wynik niezależnie dla wszystkich kombinacji wejścia (`tests/mutation-generator.test.ts:2-5`, pętle `tests/generator.test.ts:39`, `:76`) | analogicznie: test 10 000 losowań z wyrocznią niezależną od generatora (BR-GEN-003, D-533) |
| Bez powtórzeń | tylko w obrębie szablonu (brak tego samego ćwiczenia, `tests/generator.test.ts:58-62`); losowania, okna ostatnich i historii nie ma | **odstępstwo nazwane:** Trening nie losuje, więc okno między sesjami (BR-GEN-002, D-532) nie ma analogii |
| Poziom trudności | brak automatu z postępu i przełącznika; „Automatycznie” = wartość domyślna celu serii (`docs/24-generator-i-plany.md:51`) | **odstępstwo nazwane:** reguła automatu z D-534 na decyzji właściciela KO-039 |
| Ekran główny | zakładka „Trening” bez list: start, plan tygodnia, 4 kafelki statystyk prowadzące dalej (`app/(tabs)/index.tsx:41-54`, `components/Dashboard.tsx:34-35`); listy szablonów przeniesione do „Więcej” (`docs/22-przeplywy-i-nawigacja.md:292-299`); problem „długiego ekranu” opisany w `docs/22…:22-27` | analogicznie: kafelki funkcji, lista lekcji w osobnym ekranie (BR-MENU-001/002, D-535) |
| Ustawienia i cel dotyku | ustawienia jako wiersz w „Więcej” (`app/(tabs)/more.tsx:24`), cel dotyku 44 pt (`lib/tokens.ts:153-155`) | 44 pt jak w Treningu i `design-spec.md:77`; miejsce ikony wybiera 04 |
| „Dlaczego źle / dobrze” | nie znaleziono (Trening nie ocenia odpowiedzi) | brak analogii; podstawą są słowa właściciela KO-040 |

## 5. Skutki poza aplikacją
| Miejsce | Dziś | Skutek scenariuszy w 1.0 | Kto |
|---|---|---|---|
| `purchase.unlocks` (D-315) | „Bez dziennego limitu: sesje ćwiczeń, powtórki i powtórne egzaminy…”; test `apps/mobile/src/i18n/__tests__/zakup-tekst-10.test.ts` zabrania „scenariuszy”, dopóki `content/pl` ich nie ma | tekst wraca do „scenariuszy” w tym samym commicie, w którym treść dostaje pierwsze szablony (inaczej test albo 2.3.1(a)); propozycja: „Bez dziennego limitu: sesje ćwiczeń, powtórki, scenariusze i powtórne egzaminy każdego dnia. Lekcje zostają darmowe.” (brzmienie: 06/04) | 06, 08, 10 |
| Metadane sklepu | `docs/wydanie/sklep.md:56` świadomie bez scenariuszy; kontrola `docs/wydanie/dowody/sprawdz-metadane-aso.py:30` blokuje „scenariusz/scenario” jako funkcję spoza 1.0 | opis może wymienić scenariusze dopiero, gdy są w buildzie; kontrola do zmiany przez 10 | 10 |
| Ankieta wiekowa (OG-02, D-310) | Simulated Gambling = None; definicja przeczytana ponownie 2026-11-10: „Simulated Gambling: Betting or wagering without using real money or in-game currency that can be exchanged for real money.” (developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions, surowy HTML) — identyczna z S-19 | **odpowiedź zostaje „None”** [OCENA roli 03, decyzja należy do roli 10]: definicja dotyczy zakładu, a w scenariuszu nikt nic nie stawia; losowanie kart przez generator dzieje się przed pierwszą decyzją (BR-GEN-001), tak jak w ćwiczeniach `whoWins`, `drawCall` i `rangeDecision`, które już losują karty i były podstawą D-310. Warunki, które muszą zostać: brak stosu do wygrania i salda (BR-SCN-002), wynik = ocena decyzji, karty ustalone przed decyzją; pokazanie kart opisuje lepszy układ (RD-10), bez komunikatu „wygrałeś/przegrałeś” i bez licznika wygranych. Do poprawy w `sklep.md:125` zdanie „i scenariuszy w 1.0 (D-305)” | 10 |
| Lista telefonu | T-09 „Trzy scenariusze całego rozdania” | T-09 rozszerzona i nowa T-11 (`scope-contract.md`) | 07 |
| E2E | `apps/mobile/e2e/oczekujace/07-scenariusz.yaml` czeka na treść; wejście `dzis-scenariusz` | flow wraca do bramki po kroku F; wejście przez kafelek (nowy `testID` z projektu 04); dopisać: wybór zagrania ocenionego jako błąd → widać „dlaczego źle” i „dlaczego dobrze”; przełącznik poziomu; nowy flow ekranu głównego | 07 |
| Plan wydania | `docs/wydanie/plan-1.0.md:9-10`, `:254`, `:259` (wariant A, F-12 w 1.1) | nieaktualne po KO-035; termin wysyłki do przeliczenia z §3 | koordynator, 10 |
| Kod bez treści | D-255: wejście „Scenariusz” ukryte, gdy treść ma 0 scenariuszy | zastąpione w części pustego stanu przez BR-MENU-001 (kafelek mówi, co odblokuje; D-535) | 08 |
