# W2: przesiew na 7 stołach (etap B5, sesja FB2, 2026-11-12)

Kryteria (D-1332, `docs/solver/w2-cel.md`, zapisane przed pomiarem):

- K1: |łączny zakład nasz − strona| ≤ 5 pp przy tej samej wadze;
- K2: pokrycie częstości zakładu ≥ 85%;
- NashConv < 0,5% puli;
- przesiew przechodzi, gdy ≥ 5 z 7 stołów spełnia wszystkie trzy warunki.

Model: D-1333. Zakresy: D-1334. Uruchomienie: `npx tsx scripts/w2-run.ts STÓŁ`. Wynik każdego stołu trafia do `tools/preflop-solver/targets/w2-results/` (poza gitem), a logi do `docs/solver/dowody/b5-*.log`.

## Wybór stołów (reguła zapisana przed pomiarem stołów 2–7)

- Stół 1: `btn-vs-bb-srp-k72-rainbow`. To SRP BTN vs BB, które plan B5 każe liczyć najpierw (najbliżej SC-07, SC-13, SC-14).
- Stoły 2–7: kolejne pary w kolejności planu dostają kolejne flopy z alfabetycznej listy mapy strony. Reguła jest mechaniczna i daje różne tekstury bez wybierania pod wynik:

| Para | Stół |
|---|---|
| CO vs BB SRP | `co-vs-bb-srp-543-rainbow` |
| HJ vs BB SRP | `hj-vs-bb-srp-663-paired` |
| UTG vs BB SRP | `utg-vs-bb-srp-873-two-tone` |
| BB vs BTN 3BP | `bb-vs-btn-3bet-942-rainbow` |
| BB vs CO 3BP | `bb-vs-co-3bet-987-two-tone` |
| SB vs BTN 3BP | `sb-vs-btn-3bet-a52-rainbow` |

## Wyniki

| Stół | Iteracje | NashConv | Czas | Pamięć | Zakład nasz / strona | K1 | K2 | Wynik |
|---|---|---|---|---|---|---|---|---|
| `btn-vs-bb-srp-k72-rainbow` | 200 | 0,44% puli | 8 min | 2,8 GB | 96,4% / 99,9% | 3,4 pp | 96,6% | przeszedł |
