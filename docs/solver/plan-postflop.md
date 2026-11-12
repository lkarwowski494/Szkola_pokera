# Plan: solver postflop dla spotów 1.0 (sesja FB, zadanie 3, 2026-11-12)

Status: **plan do decyzji koordynatora**. Implementacji nie ma i do odpowiedzi nie będzie (polecenie FB, pkt 3.3). Wejścia:

- `origin/sesja-ex-rachunek:docs/zakres/rachunek-szablonow.md` (klasy R, R+Z, Z dla 21 szablonów, tabela §2);
- `docs/solver/rozpoznanie-2026-11-12.md`;
- `docs/solver/diagnoza-bb-2026-11-12.md`.

Szacunki oznaczone [OCENA] to czas agenta, nie pomiar.

## 1. Które szablony skorzystałyby

Solver postflop przydaje się tam, gdzie decyzja zależy od strategii zakresu na konkretnym stole (klasa Z) albo od zakresu rywala po flopie (R+Z). Szablony klasy R rozstrzyga rachunek z danej zadania. Szablony preflop rozstrzyga już istniejący solver preflop.

| Szablon | Klasa | Co dałby solver postflop | Przydatność |
|---|---|---|---|
| SC-20 semi-blef drawem na turnie | Z (bez rozstrzygnięcia) | Źródło przeczy regule według klasy ręki („there is no clear pattern”, D-1289 sesji EV), więc odpowiedź musi być dla konkretnej ręki i stołu. Taką odpowiedź daje tylko rozwiązanie danego stołu | **wysoka**: jedyny szablon bez innej drogi |
| SC-13 mokry flop, rozmiar | R+Z | Rozmiar zakładu silnej ręki na danym stole (1/4 czy 2/3 puli) | wysoka |
| SC-14 c-bet bez pozycji, niskie flopy | Z | Częstość czekania na konkretnych flopach; dziś warunkowe źródło szczebla 4 (D-1287) | średnia: walidacja wobec stron BeyondGTO HJ/UTG vs BB (pkt 4) |
| SC-15, SC-17 obrona wobec c-betu | Z | Sprawdzenie / pas danej ręki wobec 1/3 i 3/4 puli | średnia: reguły R-M6-006/007 mają źródła |
| SC-16 check-raise drawem | Z (+R rozmiar) | Wybór akcji z drawem | średnia |
| SC-18, SC-21 turn: druga lufa, średnia ręka | Z | Akcja na turnie dla klasy karty turnu | średnia: źródła szczebla 2 są |
| SC-26 niski SPR | R+Z | Equity ręki wobec zakresu all-inu po flopie (poziom T) | niska: to rachunek equity wobec zakresu, solver niepotrzebny |
| SC-07 flop po obronie BB | Z | Obrona wobec małego c-betu | średnia |
| SC-22, 23, 24, 25, 27, 28, 29, 31 | R | — (rachunek z danej zadania) | brak |
| SC-09, SC-10, SC-30 | Z / R+Z preflop | — (solver preflop i macierz equity) | brak |

Wniosek: solver postflop ma uzasadnienie przede wszystkim dla SC-20 i SC-13. Dla SC-14 do SC-21 może dać drugie, niezależne potwierdzenie reguł, które mają już źródła. Treść 1.0 tego nie wymaga (KO-084: solver tylko tam, gdzie jest zwalidowany).

## 2. Minimalny solver

Istniejący `src/streets.ts` rozwiązuje grę trzech ulic na abstrakcji (koszyki, 2×2 runouty) jako część preflopu. Do pytania „co zrobić tą ręką na tym stole” się nie nadaje. Gubi konkretne karty ręki (koszyki) i ma tylko 4 runouty na flop. Potrzebny jest osobny solver **jednego stołu bez abstrakcji kart**:

- **Wejście:** stół (flop, turn albo river), zakresy obu graczy jako 1326 kombinacji z wagami (z kanonu preflop, po usunięciu kart stołu), pula, stack, drzewo rozmiarów.
- **Algorytm:** DCFR jak w preflopie (`src/solver.ts:19`, α 1,5, β 0, γ 2), wektorowo po kombinacjach. Showdown liczony porównaniem siły rąk z usunięciem kart (koszt O(n log n) na river). Ocena rąk: `evaluateHand` z `@szkola/poker-core` (`packages/poker-core/src/evaluate.ts:74`); czy jest dość szybka dla P3, trzeba zmierzyć w E0 implementacji `[DO USTALENIA]`.
- **Etapy** [OCENA czasu agenta]:

| Etap | Zakres | Koszt obliczeń [OCENA] | Czas agenta [OCENA] |
|---|---|---|---|
| P1 river | jedna ulica, 1–2 rozmiary, przebicie all-in | sekundy na stół w Node | 1 sesja |
| P2 turn + river | 44–46 riverów na turn, 1 rozmiar na ulicę | minuty na stół w Node | +1 sesja |
| P3 flop + turn + river | ok. 2000 runoutów; w Node godziny na stół, rozsądnie w C z OpenMP (jak `tools/equity/*.c`) | offline, 10–60 min na stół na 4 rdzeniach | +1,5–2 sesje |

  SC-20 wymaga co najmniej P2 (decyzja na turnie). SC-13 i SC-14 wymagają P3.
- **Gdzie liczyć:** CI uruchamia tylko testy (gry zabawkowe i P1 na małych zakresach, poniżej limitu 180 s z `test/limity.ts`). Rozwiązania stołów liczy się offline, a wynik commituje jako plik danych, jak kanon preflop. Koszt GitHub Actions: 0.
- **Zakresy wejściowe:** z kanonu preflop. Kanon ma znane błędy składu (lista `uncertain`, diagnoza BB), więc wynik postflop dziedziczy niepewność zakresów. Dlatego walidację robi się na zakresach źródła, nie kanonu (pkt 4, W2).

Alternatywa nazwana i odrzucona do decyzji: otwarte solvery postflop (np. TexasSolver, postflop-solver b-inary) jako narzędzie offline. Plus: gotowe i szybkie. Minus: licencje (AGPL lub inne `[DO USTALENIA]`; repo jest publiczne), zależność spoza stosu TypeScript, a ich wynik też wymaga walidacji. Nadają się najwyżej jako niezależne porównanie programowe (W1b), bez włączania ich kodu do repo.

## 3. Koszt w CI i offline

| Element | CI (każdy push) | Offline (raz na stół lub zestaw) |
|---|---|---|
| Testy gier zabawkowych (W1) | < 10 s [OCENA] | — |
| Rozwiązanie P1 jednego stołu | test na małych zakresach < 5 s | sekundy |
| Rozwiązania P2 (SC-20: ok. 10–20 stołów) | — | minuty na stół, łącznie < 1 h [OCENA] |
| Rozwiązania P3 (SC-13, SC-14: kilkanaście flopów) | — | 10–60 min na stół, łącznie kilka godzin w kontenerze, bez płatnych zasobów [OCENA] |

## 4. Walidacja (bez niej wynik nie wchodzi do aplikacji)

- **W1, szczebel 1 (rachunek, w CI):**
  - (a) Gra zabawkowa na riverze: zakres spolaryzowany kontra łapacz blefów. Znane rozwiązanie: udział blefów w zakresie zakładu = B ÷ (P + 2B), MDF = P ÷ (P + B). Rachunek z „The Mathematics of Poker” wymaga przeczytanego fragmentu `[DO USTALENIA]`, ale wzory są już w aplikacji jako R-M8-010 i R-M6-001 (math).
  - (b) Zbieżność: NashConv poniżej progu na grze, w której rozwiązanie zna niezależny skrypt (jak `nash_hu.py` w E1b).
- **W2, szczebel 2 (opublikowane rozwiązania, czytelne dziś):** BeyondGTO, strony „spots” (https://beyondgto.com/sitemap-spots.xml, odczyt 2026-11-12).
  - 105 stołów: 7 par pozycji × 15 flopów (np. `btn-vs-bb-srp-*`, `bb-vs-btn-3bet-*`, `hj-vs-bb-srp-*`).
  - Każda strona podaje rozmiar zakładu („Main size Bet 5.4bb”) i częstość dla każdej klasy ręki w atrybucie `title` komórki siatki, np. na `bb-vs-btn-3bet-543-rainbow`: „AKs · bet 5.4bb 40% · c-bet 40%”.
  - Metoda (https://beyondgto.com/methodology): „one 6-max cash tree at 100bb … two bet sizes, printed on each page”.
  - Kryterium proponowane przed pomiarem (wzór D-153): łączna częstość c-betu najwyżej 5 pp od strony; zgodność „bet / czekanie” dla klas ważona kombinacjami co najmniej 85%. Zakresy wejściowe z siatek preflop BeyondGTO, nie z kanonu, żeby mierzyć solver, a nie zakresy.
  - Ograniczenie: drzewo turnu i rivera BeyondGTO nie jest opisane `[DO USTALENIA]`, więc pełna zgodność nie jest możliwa. Stąd tolerancja.
- **W3, szczebel 2 dla SC-20 i SC-13:** artykuły GTO Wizard z częstościami dla konkretnych stołów (np. „From Gutshots to Airballs”, D-1289). Do wyszukania i odczytu przy implementacji. Bez przeczytanego celu wynik zostaje w otwartych pytaniach.
- **Zasada:** każdy stół użyty w aplikacji ma albo bezpośredni cel W2/W3, albo leży w klasie stołów, w której solver przeszedł W2. To drugie to uproszczenie dydaktyczne, które trzeba nazwać i zapisać w rejestrze.

## 5. Rekomendacja i opcje (do decyzji koordynatora, sprawa produktowa i kosztowa)

- **A: P1 + P2 (river oraz turn + river) z walidacją W1 i W3.** W2 nie dotyczy, bo strony BeyondGTO opisują decyzję na flopie, czyli wymagają P3. [OCENA] 2–2,5 sesji agenta, obliczenia minuty. Daje SC-20 jako pierwszy szablon Z rozstrzygnięty solverem. Ryzyko: celu W3 dla SC-20 może nie być do przeczytania.
- **B: od razu P3 (pełny flop w C) z walidacją W2 na 105 stołach BeyondGTO.** [OCENA] 4–5 sesji, obliczenia kilka do kilkunastu godzin offline. Pokrywa SC-13, SC-14 i SC-20, ale to największy koszt i nic nie daje przed 1.0.
- **C: nie budować teraz.** SC-20 zastąpić sytuacją policzalną (propozycja sesji EX, P4). Solver postflop po 1.0. Koszt 0.

Rekomendacja: **C dla 1.0, A jako eksperyment równoległy**, jeśli koordynator chce kontynuować FB. Powód: treść 1.0 ma drogi bez solvera (klasy R i źródła dla Z), a A to najmniejszy krok, który da się zwalidować i który odpowiada na jedyną lukę bez innej drogi (SC-20).
