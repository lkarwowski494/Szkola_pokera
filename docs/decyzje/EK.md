# Decyzje sesji EK (08-programista, build): partia 2 (EF + EH), EI-001…006, 08-EH-1…3, KO-072
Pula D-1190…D-1209. Kto: A = agent (delegacja z `CLAUDE.md`); wszystkie do weta właściciela. Odczyt analogii Trening: nie dotyczy (decyzje techniczne w istniejącym kodzie, bez nowego wzorca procesu).

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa |
|---|---|---|---|---|---|
| D-1190 | 2026-11-11 | A | EI-001 opcja (a): turn-bet losuje tylko rękę zrobioną (very-strong albo nadpara/najwyższa para z klasą strong) i wymaga co najmniej jednego żywego outu rywala (ewaluator 7 kart). Opcja (b) (equity rywala z żywych outów > cena małego zakładu) trafia jako pytanie do roli 06. | (b) od razu: odrzuca dodatkowo ok. 1/3 wariantów, wymaga decyzji 06 o przesłance R-M7-006 | recenzja EI `recenzja-ef-9a054b59.md` (EI-001), test odtwarzający `ei-turn-bet-zywe-outy.test.ts` |
| D-1191 | 2026-11-11 | A | `GENERATOR_WERSJA` 3 → 4: dolosowanie flopu po range-spot zmienia odciski tylko sc-04 i sc-05 (jedyne szablony z range-spot i cbet-case); odciski pozostałych szablonów bez różnic. Ryzyko: rozdania w toku sc-04/sc-05 zaczynają się od nowa; aplikacja niewydana (TestFlight wewnętrzny). | zostawić 3 z przeliczonymi odciskami: łamie zasadę ŚR-002 (zmiana wyniku = nowa wersja) | `scenario-gen.ts` komentarz wersji, `generator-odciski.test.ts` |
| D-1192 | 2026-11-11 | A | EI-004 (iso-size BB bez zapisu limperów) zostaje notatką dla widoku (04): test przy powstaniu widoku limperów. | (a) test teraz: nie ma jeszcze danych o limperach w wariancie | recenzja EI (rekomendacja) |
