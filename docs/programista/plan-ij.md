# Plan IJ (rola 08, tryb fix): PoOcenie w lekcjach przy AX5 i 320 pt, P3 recenzji IH

Stan: 2026-11-17, gałąź `claude/sesja-ij-poocenie` od ad88e4d3. Decyzje: `docs/decyzje/IJ.md` (D-1910…D-1916).

| Zadanie | Klasa | Stan | Dowód |
|---|---|---|---|
| 1. D-1908: ekran po-ocenie w zrzutach, ocena, naprawa (WYSOKIE) | D | gotowe, D-1908 zamknięte | `ij-po-ocenie.test.tsx` (9 czerwonych przed), `docs/design/dowody/ij-*.png` + `ij-przed-*`; D-1910, D-1911 |
| 2a. Test `zakresGlebokosciStartu` (gałęzie null, min = max, przedział) | D | gotowe | `packages/poker-core/test/ij-zakres-glebokosci.test.ts` (8; mutacja 2 miejsc w kodzie → 4 czerwone) |
| 2b. `RzadPrzyciskow`: `Children.toArray` | D | gotowe | `ij-rzad-przyciskow.test.tsx` (2 czerwone przed); D-1913 |
| 2c. `tokens.ts` helpery modułowe (D-1904) | — | ocena: brzegowy, bez zmiany | `ij-tokens-zywe.test.tsx`; D-1912; **[DO USTALENIA na telefonie]** zmiana Dynamic Type przy działającej aplikacji |
| 3. `env -u NODE_PATH pnpm run ci` | — | patrz dowód | `docs/programista/dowody/ij-ci-<sha>.txt` |
