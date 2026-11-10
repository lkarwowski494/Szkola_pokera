# Stan sesji BF (08 build, generator scenariuszy), 2026-11-10
Gałąź `sesja-bf-generator`, ostatni SHA kodu 2a37673. Zadania 1–6 wykonane; CI kod 0 (SHA d3215dc, log: dowody/bf-ci-final-d3215dc.md); nocny.yml zmieniony za zgodą KO-047.
Dalej (nie w BF): krok C–E (06: szablony treści), F (08: ekran przebiegu, poziom auto, flaga powtorkaWariantu z ziarna, zapis szablonów do bazy treści, bump wersji schematu treści — D-555), 05: ADR/dane.md dla v2 i eksportu (D-550).

## Poprawki po recenzji BJ: wykonane w sesji BM (2026-11-10)
Gałąź `sesja-bf-generator`, commity: 001 `0634592` (D-556), 004 `7a66c69` (D-557), 002 `91ec96e` (D-558), 003 `9500640` (D-559); test BJ (cherry-pick `d4fd511`) przeniesiony do `packages/poker-core/test/scenario-gen-decyzja-niezmienna.test.ts`.
CI: kod 0 na 9500640, log `docs/programista/dowody/bm-ci-9500640.md`. Przegląd ścieżek wrażliwych: `docs/programista/dowody/bm-przeglad-sciezek-wrazliwych.md`.
Dla 06/05/F: format szablonu ma teraz `bounds.<poziom>.expected` (po jednej akcji na punkt decyzji) i znaczniki `{{w:reka}}`, `{{w:stol}}`, `{{w:pozycja}}`, `{{w:rywal}}` w wyjaśnieniach (pierwsze zdanie: reka, stol, pozycja); `mozeStartowac(..., wariant?: {historia, odcisk})`; `docs/architektura/moduly.md:58` (sygnatura) do aktualizacji przez 05.
Otwarte: zapis `rywal` i formatowanie kart w ekranie (krok F); krok C (06) może startować.
