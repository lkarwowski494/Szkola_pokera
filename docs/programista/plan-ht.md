# Plan sesji HT (08-programista, fix) — stan 2026-11-16
Gałąź `claude/sesja-ht-poprawki` od e270da14. Wejście: recenzje HR (`recenzja-hr-ho.md`) i HS (`recenzja-hs.md`). Decyzje: `docs/decyzje/HT.md` (D-1760…D-1767).
Klasyfikacja (E0): HR-001 D, HR-002 M (rozstrzygnięte KO-112), HR-003 D, HR-004 D, HR-005 D, HR-006 D, HR-007 D, D-1750 M, 06-tresci-301 M. Znalezisk typu P brak.
| ID | Stan | Commit |
|---|---|---|
| D-1750 | zrobione | 6df327ec |
| HR-001, HR-002 | zrobione | dbb5ba30 |
| HR-006 | zrobione | 3c5d6efa |
| HR-003 | zrobione | d128c0ef |
| HR-004 | testy; mutanty M3/M9 do uruchomienia | d5ff862f |
| HR-005 | zrobione | f5568833 |
| HR-007 | zrobione lokalnie (HO.md), do commitu | — |
| 06-tresci-301 | kod i testy; czas testu ei-turn-bet w sprawdzeniu | — |
Do zrobienia: odciski generatora (GENERATOR_ODCISKI_ZAPISZ=1), `pnpm content:build`, `pnpm run ci`, dowód `dowody/ht-ci-<sha>.txt`, przegląd ścieżek wrażliwych (`tools/content-build/` oraz `packages/poker-core/`: brak ścieżek danych użytkownika, przegląd subagentem tylko dla `tools/content-build/`).

## Stan końcowy (2026-11-16, SHA 2fbed1f6 + commit dowodów)
Wszystkie ID z E0 wdrożone red-first, osobny commit każde; scalono `claude/sesja-hu-tresci` @ 545e6ada (tylko content/ i docs/); `pnpm run ci` kod 0 (`dowody/ht-ci-2fbed1f6.txt`); mutanty M3 i M9 giną (`dowody/ht-mutanty.txt`); pomiar SC-20 `dowody/ht-sc20-pomiar.txt`. Przegląd diffa tools/content-build świeżym subagentem: brak P0/P1; uwagi P2: (a) bramka check-raise przy `cbet` undefined przepuszcza (NaN), (b) ex.frac.* sprawdzane w każdym turn-bet z kluczem w tekście, (c) `koduj` w wyroczni z `?? 0` (bez skutku dla 5–7 kart) → backlog.
