# Plan IF (rola 08, tryb fix): bariery AX5 przy 320 pt

Stan: 2026-11-16, gałąź `claude/sesja-if-ax5` od 858300d0. Decyzje: `docs/decyzje/IF.md` (D-1880…D-1885).

| Zadanie | Klasa | Stan | Dowód |
|---|---|---|---|
| 1. Przycisk, nazwy akcji, stopień w dzienniku przy 320 pt/AX5 | D (wysokie, blokuje build 1011) | gotowe, commit 53046488 | `apps/mobile/src/components/__tests__/if-ax5-320.test.tsx` (czerwony przed: 9 z 12 przebiegów AX5/dziennik; zielony po: 21/21) |
| 2. Zrzuty `if-*.png` 320/390 × domyślny/AX5 × pl/de | D | gotowe, 32 pliki | `docs/design/dowody/if-*.png` |
| 3. P2-2 recenzji IC (zapis D-1853) | D (dokumentacja) | gotowe | `docs/decyzje/IF.md` D-1885, adnotacja w `docs/decyzje/IC.md` |
| 4. `env -u NODE_PATH pnpm run ci` | — | zielone, kod 0: `docs/programista/dowody/if-ci-2da2878c.txt` | |

Czas agenta: ok. 1,5 h, oczekiwanie na budowanie i testy ok. 15 min; od właściciela: test na telefonie (AX5 przy 320 pt) po buildzie.
