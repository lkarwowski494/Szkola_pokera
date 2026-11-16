# Plan IH (rola 08, tryb fix): głębokość startu jako przedział (KO-117), uwagi recenzji IF

Stan: 2026-11-16, gałąź `claude/sesja-ih-glebokosc` od 52572507. Decyzje: `docs/decyzje/IH.md` (D-1900…D-1908).

| Zadanie | Klasa | Stan | Dowód |
|---|---|---|---|
| 1. `zakresGlebokosciStartu`, wspólny filtr par, ekran startu, test strażnik (KO-117, WYSOKIE) | D | gotowe | `tools/content-build/test/stos-start-ih.test.ts` (3/4 czerwone przed), `apps/mobile/src/features/scenariusz/__tests__/ih-start-glebokosc.test.tsx`; D-1900, D-1901 |
| 2. Akapit `RichText` poza ekranem przy 320 pt AX5 (IF P2-3, WYSOKIE) | D | gotowe | `ih-richtext-dlugi-wyraz.test.tsx`; zrzuty `docs/design/dowody/ih-*.png`; adnotacja w `IF.md`; D-1902 |
| 2a. Ten sam wzorzec w `PoOcenie` (lekcje) | P | otwarte: PYTANIE | D-1908 (oszacowanie 309 pt > 214 pt; wymaga ekranu zrzutów) |
| 3. IF P2-1 (`useWindowDimensions`), P2-2 (pole z kontekstu), P3-1 (jedna definicja) | D | gotowe | `ih-ui-wymiary.test.tsx`; D-1904…D-1906 |
| 3a. IF P3-2 („~” przy wyrazie) | P | niewdrożone: PYTANIE | D-1907 |
| 4. `HL_LOCALE`, `HL_PODSUM`, `HL_NAGL` | D | gotowe | `scripts/zrzuty/hl-zrzuty.mjs`; D-1903 |
| 5. `env -u NODE_PATH pnpm run ci` | — | w toku | `docs/programista/dowody/ih-ci-<sha>.txt` |
