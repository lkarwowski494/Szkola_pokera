# Stan sesji CA (08-programista, build): format szablonów F2–F4 + KO-056
Aktualizacja: 2026-11-10 · gałąź `sesja-ca-format` · kod @ 5802982 · dowód CI: `docs/programista/dowody/ca-ci-5802982.txt` (content:build i `pnpm run ci` kod 0)

## Zrobione (test czerwony przed kodem, wyrocznia niezależna, 10 000 losowań/poziom)
| Zadanie | Commit | Test |
|---|---|---|
| F2 `cbet-case` (flop wg TextureFilter, filtr `holding`, ocena z `cases` reguły) | d6ceeee | `szablony-f2-ca.test.ts` (wyrocznia: silnik gry + gradeDecision) |
| F3 `size-spot` (open-size, three-bet-size, no-limp; rozmiar z parametrów reguły) | 1392fc7 | `szablony-f3-ca.test.ts` |
| F4 `icm-call` (equity z equity169 wobec zakresu push, ICM_STRUCTURES, chipsDiffer) | ad0f3f0 | `szablony-f4-ca.test.ts` (equity i ICM liczone w teście od zera) |
| KO-056 a / ŚR-004: `GeneratorContext` przez `wybierzWariant` | po ad0f3f0 | `packages/domena/test/wariant-kontekst-ca.test.ts` |
| KO-056 b / ŚR-003: brak domyślnego `marginMin`, margines jawny w draw-call, dodatni na łatwym | 6273ea2 | `margines-ca.test.ts` |
| KO-056 c / ŚR-002: all-in = dokładnie stos za pulą | 6273ea2 | `allin-stos-ca.test.ts` (zmieniony oracle `szablony-f5-bu.test.ts:43`: powtarzał zaokrąglenie, powód w komentarzu) |
| KO-056 e / NIS-006: bez zgadywanych progów range.mixed.* | 6273ea2, 5802982 | `progi-bez-zgadywania-ca.test.ts` (kontrola mechaniczna na źródle) |
| KO-056 f: D-660…D-665 BU | 5802982 | `docs/decyzje/BU.md` |
Fixture: `tools/content-build/test/fixtures/{cbet-case,size-spot,icm-call}/`. Decyzje CA: `docs/decyzje/CA.md` (D-695…D-700).

## Niezrobione (następny krok)
- **ŚR-001, opcja A zatwierdzona (KO-058)**: `GENERATOR_WERSJA` w poker-core; kolumna wersji w `wariant_historia` (schemat v2 w `packages/postep/src/schemat-v2.ts`, `docs/architektura/schemat.sql`, migracje `migracje.ts`) z migracją w transakcji i testem na kopii bazy poprzedniej wersji (wpisy sprzed = 0); eksport/import (`packages/domena/src/eksport.ts`, `konfiguracja.ts`: pole wersji opcjonalne, brak = 0); `zapiszOdcisk`/`odczytajOdciski`; powtórka (`czyPowtorkaWariantu`) tylko przy zgodnej wersji; okno bez powtórzeń liczy odciski wszystkich wersji. Ścieżka wrażliwa (D-043), zalecany opus; test czerwony najpierw.
- Szablony size-spot w treści: łączyć z range-spot albo ograniczyć do rąk z zakresu (D-698; sprawa roli 06).
- Żaden przypadek c-betu w treści nie ma `best: big` (bet-big bez testu na realnych cases).

## Ścieżki wrażliwe do recenzji niezależnej (D-043)
`tools/content-build/src/scenariusze.ts`, `tools/content-build/src/build.ts` (blok scenariuszy, kolejność evalRules, progi), `packages/poker-core/src/scenario-gen.ts`, `packages/poker-core/src/icm.ts` (tylko eksporty), `packages/content-schema/src/index.ts`. Recenzja subagentem nie odbyła się (kontekst).
