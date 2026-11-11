# Stan sesji DX/ED (08-programista, build): silnik scenariuszy (kontynuuje sesja ED; stan ED na górze)
Gałąź `sesja-dx-silnik` od b3963e9a. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/DX.md` @ 100319bb. Stan na 2026-11-11. Pula decyzji D-1065…D-1079 (`docs/decyzje/DX.md`).

## Stan sesji EF (2026-11-11 ~22:00 UTC; polecenie `origin/koordynacja:docs/koordynacja/polecenia/EF.md`, pula D-1140…D-1159 w `docs/decyzje/EF.md`)
Start 539919af; HEAD sesji patrz plik dowodu `docs/programista/dowody/ef-ci-*.txt` (pnpm run ci kod 0 @ 82eb8738 (`ef-ci-82eb8738.txt`)). KO-078: cięcie A/B zatwierdzone (silnik+bramka, ekran zablokowany; widoki po decyzji 04).
| Zadanie | Stan | Dowód |
|---|---|---|
| N3 iso-size (size-spot) | A zrobione (eb269882, D-1140) | `ef-iso-size.test.ts` |
| KO-076 filtr marginesu | zrobione (4adf0453, D-1141): pole `equityMarginMin`; **06 dopisuje `0.02` do łatwych SC-06/32/33** | `ef-margines-ko076.test.ts` |
| N4 list-hand | A zrobione (02e74b0b, D-1142) | `ef-list-hand*.test.ts` |
| N7 river-catch | A zrobione (1a80fad2, D-1143) | `ef-river-catch*.test.ts` |
| N2 defend | A zrobione (e1174cf8, D-1144) | `ef-defend*.test.ts` |
| N5 cbet-case OOP | zrobione (375c0b7f, D-1145): `params.position: oop`; **06: R-M5-012 bez `check`** | `ef-n5-oop.test.ts` |
| N1 gram/pas (`play`) | A zrobione (911a986a, D-1146) | `ef-gram-pas*.test.ts` |
| N6 turn-bet (R-M7-006) | A zrobione (82eb8738, D-1147); semi-blef (gracz z drawem) poza zakresem (do 06) | `ef-turn-bet*.test.ts` |
| KO-072 (SC-23a/b wybór jednej z dwóch rąk) | niezaczęte | |
| Testy EE ŚR-009, NIS-010, NIS-011 | zrobione (commit przed 82eb8738); mutant k-10 czerwony | recenzja `origin/sesja-ee-recenzja:docs/programista/recenzje/recenzja-ed-539919af.md` |
| nocny.yml | „niepotrzebne”: wszystkie nowe rodzaje dopisane do `scenario-gen.ts`, brak nowych plików src | |
| GENERATOR_WERSJA | bez podniesienia (3): nowe rodzaje to nowe gałęzie `kind`, odciski starych szablonów bez różnic (generator-odciski), refaktor `handFromRange` zachowuje kolejność losowania | |
Wszystkie nowe rodzaje poza `RODZAJE_NA_EKRANIE` (bramka `checkScenarioNaEkran`; mobile rzuca głośny błąd). Widoki = zadania dla 04.

## Stan sesji ED (2026-11-11 ~20:55 UTC; polecenie `origin/koordynacja:docs/koordynacja/polecenia/ED.md`, pula D-1115…D-1134 w `docs/decyzje/ED.md`)
| Zadanie | Stan | Dowód |
|---|---|---|
| 1. KO-073 | **zrobione** (701b6d18, push cc6d3be0) | blok `{{jesli:nadkarty}}…{{/jesli}}`; testy `poker-core/test/ko073-warunki.test.ts`, `apps/mobile/.../ko073-nadkarty.test.ts`, `tools/content-build/test/ko073-warunek-nadkarty.test.ts`; D-1115 |
| Poprawki EC (WYS-001/002, ŚR-003, NIS-005/006) | **zrobione** (cc6d3be0) | `scenario-dx.test.ts` (16 testów, wyrocznia 20 000 losowań trójwartościowa); D-1116…D-1118; NIS-004 nie ruszane (do 06) |
| 2. N1…N7 (schemat, generator, bramka, wariant, widok) | **niezaczęte** (są tylko czyste funkcje N2, N3, N4, N7a) | kroki 1–4 w „Następne kroki” niżej; po KO-073 dodać: `defendVsCbet` zwraca `null` poza zakresem reguł, więc generator odrzuca takie warianty jak `draw-call` w marginesie |
| 3. KO-072 | niezaczęte | |
| 4. nocny.yml (grupy mutacji) | niezaczęte; nowe pliki w `packages/poker-core/src` wymagają grupy w `.github/workflows/nocny.yml` (test „grupy mutacji obejmują każdy plik src/”) | |
| 5. `GENERATOR_WERSJA` | niezaczęte (ocena po integracji; odciski `generator-odciski.json` bez różnic) | |
| 6. `pnpm run ci` | patrz plik dowodu `docs/programista/dowody/ed-ci-*.txt` | |

Uwagi dla następcy: (a) treść w `content/` ma teraz bloki `{{jesli:nadkarty}}`; `pnpm content:build` zmienia pliki generowane `apps/mobile/assets/content/tresc-*.db` i `tresc.generated.ts` (commitować). (b) `isoSizeStandardBb`/`IsoParams` są w `grading.ts` (jedno źródło), `sizeOptionBbs` w `scenario-gen.ts`. (c) Hak końca sesji wymaga commit+push; push na `sesja-*` nie uruchamia E2E. (d) Testy mobile (jest) dla `features/scenariusz` uruchamiać `pnpm --filter @szkola/mobile exec jest <ścieżka>`; content-build ~4 min, poker-core ~2 min.

## Stan zadań
| Zadanie | Stan | Dowód |
|---|---|---|
| 1. 08-A bramka `holding` | **zrobione** (af871e32) | `tools/content-build/test/dx-bramka-holding.test.ts` (czerwony przed poprawką: „holding tylko dla punktu cbet-case” dla range-spot → cbet-case; zielony po); fixture `fixtures/range-cbet/sc-fx-range-cbet.yaml` (układ szkicu SC-04, nie treść aplikacji) |
| 2. 08-N1…N7 | **częściowo: czyste funkcje oceny** N2, N3, N4, N7 w `packages/poker-core/src/scenario-gen.ts` (koniec pliku; osobny plik łamał test nocny.yml „grupy mutacji obejmują każdy plik src/”, a workflowów nie zmieniam) + testy `test/scenario-dx.test.ts` (8 testów, wyrocznia z rang i kolorów, 10 000 losowań dla N2); **brak**: schemat `ScenarioDecision`, generator (`scenario-gen.ts`), bramka budowania (`scenariusze.ts`), widok. Nic nie jest w `RODZAJE_NA_EKRANIE` (brak widoku). N1, N5, N6 bez kodu. |
| 3. KO-072 wybór jednej z dwóch rąk | nie zaczęte | |
| 4. `GENERATOR_WERSJA` | patrz niżej | |
| 5. `pnpm run ci` | kod 0 na a0e3e938 | `docs/programista/dowody/dx-ci-a0e3e938.txt` |
| D-1040/KO-074 | **zrobione** (88253858, a0e3e938) | `dx-pojemnosc-d1040.test.ts` |
| KO-073 | **niezrobione: niejednoznaczne** (patrz raport) | |

## Co zrobione (koniec scenario-gen.ts; czyste, bez RN, bez plików)
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

## Zadanie dla następcy: KO-073 (doprecyzowanie koordynatora 2026-11-11 20:23)
Zdanie NIS-003 w `why` wyjaśnień draw-call („Każda twoja karta wyższa od stołu daje jeszcze najwyżej {{n:pair.outs.per-rank}} niepewne outy na parę, ale tu nie zmienia to odpowiedzi.”, D-917) ma być pokazywane tylko w wariantach, gdzie `overcardOuts > 0` (ta sama definicja co `liczby.ts:41`). Występuje 14 razy w `content/pl/scenarios/sc-01, sc-02, sc-03, sc-19` (np. sc-02.yaml:23) i w przekładach. Źródła: `docs/tresci/recenzje/recenzja-cw-0ef7785.md:12, :101, :106` (opcja a), `decyzje.md:81`. Mechanizm (warunek w ekranie albo flaga/zmienna wariantu) do wyboru przez wykonawcę; zapisać D-…, odrzucone alternatywy. Test: wariant bez nadkarty → brak zdania, z nadkartą → jest, 14 wystąpień objętych. Odwraca D-857 w części „zawsze”. Ścieżka wrażliwa (`tools/content-build`) → recenzja niezależna. Nie wykonane w sesji DX (okno kontekstu).
