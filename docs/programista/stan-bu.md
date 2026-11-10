# Stan sesji BU (08-programista, build): rozszerzenie formatu szablonów (KO-049)
Aktualizacja: 2026-11-10 · gałąź `sesja-bu-format` · kod @ e6dfee3 · dowód CI: `docs/programista/dowody/bu-ci-e6dfee3.txt` (kod 0)

## Zrobione (każdy rodzaj: test czerwony przed kodem, wyrocznia niezależna, 10 000 losowań/poziom)
| F | Zakres | Test | Uwagi |
|---|---|---|---|
| baza | naprawa stanu wyjściowego CI (2 testy bf zależne od content/, 3 limity czasu) | `dowody/bu-ci-baseline-b9a656a.txt` | asercje bez zmian; powód w commicie |
| F6 | `checkScenarioSet` (ŚR-103 b) jako błąd budowania | `zestaw-szablonow-bu.test.ts` | błąd, nie ostrzeżenie (do weta) |
| F5 | draw-call: decyzja od turnu, linia `all-in`, `drawToBest`, `margins` per punkt | `szablony-f5-bu.test.ts` + 3 fixture | poziom z drawToBest ~2 min (nutOutsShare drogie); drawToBest zawęża pulę do ok. 4% rozdań, a limit 1000 odrzuceń wymaga granic przepuszczających prawie całą pulę |
| F1 | `range-spot` (preflop): spot, `freqs` per poziom, etykiety akcji węzła solvera; `GeneratorContext` | `szablony-f1-bu.test.ts` (8) + 2 fixture | oracle: częstości z surowego JSON solvera + `rangeVerdict`; mutacja generatora wykryta |

Zmiany kształtu (wstecznie zgodne dla szablonów sc-01/02/19; tylko typy): `ScenarioDecision` = unia po `kind`; `LevelBounds.expected` to napisy; `ScenarioVariant.points` (wszystkie punkty) obok `decisions` (tylko draw-call); `VariantDecision.point` jako rozróżnik; domyślne `draws/marginMin/marginMax/reject` w schemacie.

## Niezrobione (następny krok)
- F2 `cbet-case` (flop wg TextureFilter + filtr ręki `holding`; ocena z `cases` reguły, wzór: grading.ts:363).
- F3 rozmiar jako akcja (`three-bet-size`, `open-size`, `no-limp`; wzór: grading.ts `sizeCandidate`/`near`).
- F4 `icm-call` (equity z kart + `ICM_STRUCTURES`, `icmEquities`).
- Podpięcie `GeneratorContext` w `packages/domena/src/wariant.ts` (`wybierzWariant` woła generator bez kontekstu: range-spot przez domenę rzuci TemplateError) i w apps/mobile (nie moje: BS/BT).
- `{{w:stol}}` preflop = „przed flopem”: tekst podaje wołający `fillVariantMarkers` (nie ma jeszcze wołającego).
- Fixture F2–F4 do `tools/content-build/test/fixtures/`.

## Decyzje techniczne do weta
- D-660: punkt decyzji jako unia dyskryminowana po `kind` w jednym schemacie (odrzucone: osobne pliki na rodzaj).
- D-661: poker-core nie czyta plików; dane zakresów przez `GeneratorContext`.
- D-662: ŚR-103 b jako błąd budowania (odrzucone: ostrzeżenie, bo nic go nie wymusza).
- D-663: `points` obok `decisions` zamiast zmiany typu `decisions` (odrzucone: unia w `decisions`, łamie testy BS i domeny).
(Numery z puli D-660…D-674; wpis do docs/decyzje.md robi koordynator albo następna sesja: nie dotykałem pliku wspólnego.)

## Ścieżki wrażliwe do recenzji niezależnej (D-043)
`tools/content-build/src/scenariusze.ts`, `tools/content-build/src/build.ts` (blok scenariuszy), `packages/poker-core/src/scenario-gen.ts`, `packages/content-schema/src/index.ts`, test domeny `packages/domena/test/wariant-bf.test.ts` (dopisane `points: []`). Recenzja subagentem nie odbyła się (ta sesja nie ma dalszego kontekstu).
