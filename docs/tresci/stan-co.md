# Stan sesji CO (06-tresci, build): krok C — szkice szablonów do content/
Gałąź `sesja-co-szablony` od 5637200; decyzje `docs/decyzje/CO.md` (D-790…D-797, do weta). Data: 2026-11-11.

## Zrobione
- W treści (pl + 11 przekładów, przekład w sesji do przeglądu 09, D-796): **SC-03** (M2, draw-call od turnu, 25 bb, `fold`, D-790), **SC-11** (M5, cbet-case R-M5-007, `bet-small`), **SC-12** (M5, cbet-case R-M5-004, `check`), **SC-34** (M11, icm-call BB wobec SB, 10 bb, Ł/T `fold`, Ś `call`, D-794). Treść scenariuszy: 7 szablonów (SC-01, 02, 03, 11, 12, 19, 34).
- Źródła ocen: reguły z `rules.yaml` (R-M7-007 math, R-M5-007/R-M5-004 heuristic ze źródłami szczebla 2, R-M11-009 math); liczby tylko `{{n:…}}`; nowe źródło przeczytane: GTO Wizard, Flop Heuristics IP (`docs/tresci/odczyty/co-gtow-flop-heuristics-ip-2026-11-11.txt`).
- ŚR-005 (D-750) rozstrzygnięte: D-793 (rzadsza akcja c-betu „dopuszczalna”, ADR-04; kod oceny bez zmian).
- Testy: nowy `tools/content-build/test/szablony-co.test.ts` (10 000 losowań na poziom, wyrocznie niezależne, zgodność wyjaśnień z oceną silnika; sprawdzony na czerwono mutacją); `szablony-bs`, `stos-zakladu-bu`, `bv-gotowa-reka` zawężone do szablonów draw-call (D-791).
- Szkice z adnotacją (`docs/tresci/szablony-robocze/README.md`): SC-04, 05, 32, 33 (range-spot), SC-06, 08 (size-spot bez filtra rąk), SC-13 (otwarte pytanie, D-795).

## Otwarte / dla innych ról
- **08 (blokuje wydanie SC-11/12):** akcje dopuszczalne/niedokładne w wariancie `cbet-case` i ocena „dopuszczalne” na ekranie (D-793). **CN/08 (blokuje wydanie SC-11/12/34):** `GeneratorContext` na ekranie scenariusza i przyciski akcji c-betu (D-797). Filtr rąk dla size-spot (SC-06, 08).
- **09:** przegląd przekładów 4 szablonów; zh-Hant `gutshot` bez nazwy w słowniku (forma „卡順”).
- **06 (dalej):** SC-13 — źródło częstości c-betu na flopie z drawami bez strita (D-795).
- Rejestr Drive (12/13): wpisy D-790…D-797 tylko w repo, do przeniesienia przez sesję z dostępem do Drive.
- Recenzja niezależna treści (06 audit): zleca koordynator.

## Dowody
- `pnpm content:build` kod 0; `pnpm run ci` kod 0 na 385b63f: `docs/tresci/dowody/co-ci-385b63f.txt`.
