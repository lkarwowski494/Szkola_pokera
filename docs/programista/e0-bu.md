# Sesja BU (rola 08, build): E0 — rozszerzenie formatu szablonów scenariuszy (KO-049)
Stan: 2026-11-10 · gałąź `sesja-bu-format` od b9a656a · tożsamość git ustawiona wg CLAUDE.md (domyślna była `Claude`, poprawiona przed commitem)

## Środowisko
Linux (chmura), Node 22, `pnpm install --frozen-lockfile` kod 0, push na gałąź roboczą. Bez Xcode (nie potrzebny). Stan wyjściowy `pnpm run ci`: patrz sekcja „Stan wyjściowy” (uzupełniana po przebiegu).

## Format dziś (odczyt @ b9a656a)
- Schemat `packages/content-schema/src/index.ts:485-552`: jeden rodzaj `kind: draw-call`, akcje `call`/`fold`, linia `bet`.
- Generator `packages/poker-core/src/scenario-gen.ts`: karty z `dealCards`, decyzja z `analyseOutsSpot` wobec ceny; `tryVariant` odrzuca warianty poza granicami; margines jeden na poziom.
- Budowanie `tools/content-build/src/scenariusze.ts`: reguły/liczby/pojemność ≥ 40 odcisków; wyjaśnienia z `{{w:reka|stol|pozycja}}`.
- Zakresy: `EvalSpot.groups[].freqs` (indeks = `HAND_CLASSES`), `rangeVerdict` (grading.ts:135), `uncertain` wyłączone z oceny.

## Plan: punkt decyzji jako unia po `kind` (wstecznie zgodna: `draw-call` bez zmian pól)
| F | Rodzaj / zmiana | Granice poziomu (bounds) | Generator | Wyrocznia testu (niezależna) |
|---|---|---|---|---|
| F1 | `range-spot` (preflop): `spot` z spots.yaml; `expected` = nazwa grupy albo `fold`; poziom = `freq: [min, max]` częstości akcji oczekiwanej z danych solvera (Ł ≥ 0,9 i daleko od granicy, Ś ≥ 0,9 z dolnej połowy zakresu, T = ręka mieszana: oczekiwana zgodna, druga dopuszczalna) | `freqMin`, `freqMax`, `alsoAcceptable` (T) | losuje klasę rąk, kombinację kart; odrzuca `uncertain`; pula = zakres solvera (dane przekazane jako argument, poker-core bez I/O) | `rangeVerdict` na częstościach z `content/ranges` czytanych w teście wprost z JSON (nie przez generator) |
| F2 | `cbet-case`: tekstura flopu z `TextureFilter`, akcje `bet-small`/`bet-big`/`check`, ocena z przypadków reguły (`cases`) | `flop: TextureFilter`, filtr ręki (`holding: air/pair/draw`, z `classifyHolding`) | losuje flop z filtrem i rękę gracza | `classifyFlop` + `cases` z reguły i logika `cbet-case` w grading.ts (ten sam werdykt: compliant = expected) |
| F3 | rozmiar jako akcja: `three-bet-size` (mult × otwarcie, ip/oop), `open-size` (bb), `no-limp` | `sizes` dopuszczalne; granica `near()` jak grading | liczba z parametrów reguły, nie z generatora | `sizeCandidate`/`near` z grading.ts |
| F4 | `icm-call`: equity ręki z kart (handEquity vs zakres rywala ze spotu push), struktura z `ICM_STRUCTURES`, stosy | margines equity wobec `required` (BF÷(BF+1)) | `icmEquities` | `icmEquities` liczone w teście od zera z definicji |
| F5 | `draw-call`: `start: 'turn'` (flop bez akcji gracza), `margin` per punkt decyzji (tablica zamiast jednej pary), linia `all-in`, filtr `drawToBest` (nutOutsShare ≥ NUT_DRAW_MIN_SHARE) | `marginMin/Max` jako liczba albo tablica po punktach | rozszerzenie `tryVariant` | jak `szablony-bs.test.ts` (outy z kart, cena z `requiredEquity`) |
| F6 | ŚR-103 b: błąd budowania, gdy wszystkie łatwe szablony modułu (≥ 2) mają ten sam `expected` | — | — | test `build` z fixture dwóch szablonów |

Wspólne: `{{w:stol}}` preflop = „przed flopem” (nowy tekst dla `fillVariantMarkers`, podaje wołający), `{{w:rywal}}` bez zmian. Akcje punktu: z grup spotu + `fold` (F1), `bet-small|bet-big|check` (F2). Reguła „jedna oczekiwana akcja na punkt we wszystkich poziomach” (D-556) pozostaje.

## Kolejność (testy czerwone przed kodem, jedna wyrocznia na rodzaj, 10 000 losowań/poziom)
1. F6 (najmniejszy, ŚR-103 b) → 2. F5 (rozszerza istniejący rodzaj, regresja sc-01/02/19) → 3. F1 → 4. F2 → 5. F3 → 6. F4. Po każdym: typecheck, test pakietu, commit.
Fixture: po jednym szablonie rodzaju w `tools/content-build/test/fixtures/scenariusze/` (nie w `content/`).

## Decyzje techniczne do weta (analogia z Treningiem: do sprawdzenia przy pierwszym wpisie, jeśli repo dostępne)
- T1 (D-660, warunkowa): punkt decyzji jako unia dyskryminowana po `kind` w jednym schemacie zod (odrzucone: osobne pliki szablonów na rodzaj — dubluje pola; osobny schemat na punkt bez unii — traci kontrolę `strict`).
- T2 (D-661): poker-core nie czyta plików: dane zakresów i reguły przychodzą argumentem (`GeneratorContext`); tools/content-build ładuje je z content/.

## Czego nie robię
`content/`, `apps/mobile/` (BS, BT); workflowów; scalania. Treść pokerowa (co jest poprawną decyzją) wchodzi z reguł/solvera; wątpliwość → PYTANIE.

## Szacunek
Czas agenta: ok. 6–9 h pracy (6 rodzajów × test, wyrocznia, kod, fixture). Oczekiwanie: pełne `pnpm run ci` ok. kilka minut na przebieg. Od właściciela: nic w tym kroku.
