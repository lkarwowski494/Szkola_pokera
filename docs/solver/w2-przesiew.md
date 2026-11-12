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
| `btn-vs-bb-srp-k72-rainbow` | 200 | 0,44% puli | 7,9 min | 2,8 GB | 96,4% / 99,9% | 3,4 pp | 96,6% | przeszedł |
| `co-vs-bb-srp-543-rainbow` | 200 | 0,30% | 6,5 min | 2,3 GB | 29,4% / 41,0% | 11,6 pp | 84,6% | nie |
| `hj-vs-bb-srp-663-paired` | 200 | 0,38% | 5,3 min | 1,9 GB | 63,6% / 82,3% | 18,8 pp | 80,5% | nie |
| `utg-vs-bb-srp-873-two-tone` | 200 | 0,38% | 5,4 min | 1,7 GB | 66,5% / 71,9% | 5,4 pp | 86,0% | nie (K1) |
| `bb-vs-btn-3bet-942-rainbow` | 150 | 0,41% | 4,2 min | 1,7 GB | 95,6% / 98,4% | 2,8 pp | 95,8% | przeszedł |
| `bb-vs-co-3bet-987-two-tone` | 150 | 0,33% | 3,4 min | 1,3 GB | 59,0% / 46,6% | 12,4 pp | 85,6% | nie (K1) |
| `sb-vs-btn-3bet-a52-rainbow` | 250 | 0,42% | 6,8 min | 1,6 GB | 81,0% / 74,1% | 6,9 pp | 88,6% | nie (K1) |

## Wynik: 2 z 7, przesiew nie przechodzi (STOP z planu B5)

- Przeszły tylko stoły, na których obie strony c-betują prawie cały zakres (K72 i 942 suchy, 96–100%). Tam zgodność łatwo uzyskać, więc te dwa wyniki mało mówią o solverze.
- Odchylenia mają stały kierunek zależny od typu puli:
  - w SRP nasz solver zakłada mniej niż strona (543 −11,6 pp, 663 −18,8 pp, 873 −5,4 pp);
  - w 3BP zakłada więcej (987 +12,4 pp, a52 +6,9 pp).
- Zbieżność nie jest przyczyną: NashConv wynosi 0,30–0,44% puli na wszystkich stołach.
- Klasy z największą różnicą (diagnoza, bez zmian drzewa):
  - CO 543: A9o, AKo, KTo, QJo; nasz zakład 6–41% wobec 41–71% na stronie;
  - HJ 663: overkarty i overpary, np. AA 31% wobec 60%, ATo 30% wobec 80%.
- Hipotezy przyczyny (niesprawdzone; sprawdzenie wymaga zmiany modelu, czyli decyzji):
  - H-A: drzewo turnu i rivera. Nasze ma jeden rozmiar 66% i przebicie ×3. BeyondGTO drzewa nie podaje. Uboższe drzewo dalszych ulic obniża wartość budowania puli na flopie w SRP.
  - H-B: zakresy drzewa flopu BeyondGTO nie są opublikowane (znalezisko B0: c-bet ze stron odtwarza się z siatek preflop tylko w 39 ze 105 stołów). W 3BP dochodzi zakres sprawdzenia 3-betu z kanonu (D-1334). Kierunek odchylenia zmienia się z typem puli, co pasuje do różnicy zakresów.
  - H-C: brak donku BB w SRP i rake 5%/3bb (D-1333). Parametry NL500 nie są znane.
- Plan B5 zabrania dopasowania drzewa pod wynik. Dalsze kroki są w PYTANIU do koordynatora (opcje w `docs/solver/stan-fb.md`).

