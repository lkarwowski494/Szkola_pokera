# Plan i stan sesji HG (07-jakosc build), 2026-11-13
Gałąź `claude/sesja-hg-ci` od `claude/sleepy-brahmagupta-2065nu` @ b7bc12e6. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/HG.md` @ 6ccb1f90.

| Zad. | Stan | Dowód |
|---|---|---|
| 1 WG-19 | zrobione (0c1c952f), D-1620 | `docs/jakosc/dowody/hg-wg19.txt` |
| 2 budżet czasu sc-13 | diagnoza zrobiona; PYTANIE do koordynatora (nowa miara = nowy próg) | `docs/jakosc/dowody/hg-czas-diagnoza.txt` |
| 3 07-jakosc-001 | zrobione, D-1621 | `docs/jakosc/dowody/hg-07-jakosc-001.txt` |
| 4 `pnpm run ci` + CI | czeka | — |

Następny krok: czekam na odpowiedź koordynatora (session_01T66VByLRhPb6XTrNCYoUC8) w sprawie zad. 2 (opcje A/B/C, rekomendacja A: budżet losowań rng przez vi.mock tylko w build.test.ts; wykonalność sprawdzona). Potem `pnpm run ci` (kod 0) i CI na końcowym SHA.
