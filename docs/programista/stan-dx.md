# Stan sesji DX (08-programista, build): silnik scenariuszy
Gałąź `sesja-dx-silnik` od b3963e9a. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/DX.md` @ 100319bb. Stan na 2026-11-11. Pula decyzji D-1065…D-1079 (`docs/decyzje/DX.md`).

## Stan zadań
| Zadanie | Stan | Dowód |
|---|---|---|
| 1. 08-A bramka `holding` | **zrobione** (af871e32) | `tools/content-build/test/dx-bramka-holding.test.ts` (czerwony przed poprawką: „holding tylko dla punktu cbet-case” dla range-spot → cbet-case; zielony po); fixture `fixtures/range-cbet/sc-fx-range-cbet.yaml` (układ szkicu SC-04, nie treść aplikacji) |
| 2. 08-N1…N7 | **częściowo: czyste funkcje oceny** N2, N3, N4, N7 w `packages/poker-core/src/scenario-gen.ts` (koniec pliku; osobny plik łamał test nocny.yml „grupy mutacji obejmują każdy plik src/”, a workflowów nie zmieniam) + testy `test/scenario-dx.test.ts` (8 testów, wyrocznia z rang i kolorów, 10 000 losowań dla N2); **brak**: schemat `ScenarioDecision`, generator (`scenario-gen.ts`), bramka budowania (`scenariusze.ts`), widok. Nic nie jest w `RODZAJE_NA_EKRANIE` (brak widoku). N1, N5, N6 bez kodu. |
| 3. KO-072 wybór jednej z dwóch rąk | nie zaczęte | |
| 4. `GENERATOR_WERSJA` | patrz niżej | |
| 5. `pnpm run ci` | patrz „Dowód” | |

## Co zrobione w `scenario-dx.ts` (czyste, bez RN, bez plików)
- `isoSizeStandardBb`, `isoSizeOptions` (N3): standard = base + n × perLimper (+ oopExtra), złe rozmiary 0,8× i 1,6× jak size-spot, werdykt `sizeVerdict` (0,05 bb).
- `defendVsCbet` (N2): mały c-bet (≤ 0,4 puli): call przy parze/dwóch parach+ (`improvesBoard`), drawie (≥ `HOLDING_LIMITS.drawOutsMin` outów), backdoorze kolorowym z obiema kartami ≥ T i asie w ręce, inaczej fold; duży (≥ 0,7): call para/draw, fold reszta, as + król na suchym flopie → `null` (wariant odrzucany, wyjątek źródła); rozmiar 0,4–0,7 → `null` (źródło nie rozstrzyga).
- `listHandVerdicts` (N4): akcja oczekiwana i dopuszczalne z listy klas; spoza listy `null`.
- `riverCatchAction` (N7): call, gdy udział blefów > bet ÷ (pula + 2·bet), margines od progu jak draw-call, w marginesie `null`.

## Decyzje do weta (zapis w `docs/decyzje/DX.md`)
- D-1065 (techniczna, analogia do `draw-call`): odpowiedź w marginesie od progu nie istnieje (`null`), jak margines `draw-call` (`scenariusze.ts`).
- D-1066 (merytoryczna, nazwane uproszczenie): „wysokie karty” backdoora = obie ≥ T; „mały c-bet” ≤ 0,4 puli, „duży” ≥ 0,7 (źródło: stan-du.md 08-N2 podaje ≈ 1/3 i ≥ 3/4; progi pośrednie to moje); as w ręce przy małym c-becie = call (nazwane uproszczenie: „as jako najwyższa karta” rozumiem jako as w ręce). Do potwierdzenia przez 06.

## Następne kroki (kolejność)
1. Schemat: nowe rodzaje w `packages/content-schema/src/index.ts` (`ScenarioDecision`: `iso-size` w `size-spot.check`, `list-hand`, `defend`, `river-catch`); `validateTemplate`/`tryVariant` w `scenario-gen.ts` (wzór: `size-spot`, `icm-call`); bramka `checkScenarioTemplate`; `akcjeSzablonu`.
2. Wariant: `packages/domena/src/wariant.ts` i `apps/mobile/src/features/scenariusz/wariant.ts`; widok `EkranScenariusza.tsx` (minimalny wariant istniejących komponentów; nowy wygląd → zadanie dla 04). Do czasu widoku rodzaje poza `RODZAJE_NA_EKRANIE`.
3. N1 (range-spot grupa gram/pas): akcje `call`+`3bet` zaliczone jak w siatce grupy `groups`; test: klasy z sumą częstości gry ≥ 0,97.
4. N5 (`check.drill` + zakres otwarcia z `positions.hero`), N6 (cena `bet ÷ (pula + 2·bet)`, 3/4 wobec 1/4).
5. KO-072: typ „wybór jednej z dwóch rąk” (SC-23a/b): SDV z kart i V/F z zakresu rywala; wyrocznia: liczba kombinacji po usunięciu kart liczona niezależnie od generatora (zrodla-krok-e.md, SC-23).
6. `GENERATOR_WERSJA`: nowe rodzaje nie zmieniają losowania istniejących szablonów (nowe gałęzie `kind`), więc podniesienie niepotrzebne, o ile `tryVariant` dla starych rodzajów pozostaje bez zmian i odciski `generator-odciski.json` bez różnic (do sprawdzenia testem `generator-odciski.test.ts` po integracji). Ryzyko: aplikacja niewydana (TestFlight wewnętrzny), historia wariantów tylko właściciela.
