# W2: diagnoza D1 (opcja B, KO-090), sesja FB3, 2026-11-12

Plan: `docs/solver/plan-b5-diagnoza.md` (reguły zapisane przed pomiarem, D-1335; uzupełnienie D-1400 po pomiarze pamięci). Ten plik to **raport wpływu, bez decyzji o modelu**: model do D2 jest ustalony z góry (kandydat = D-1333 + M1 + M3, river bez przebicia wg D-1400), a wyniki D1 go nie zmieniają.

Modele:
- **d1333**: model B5 (wyniki z `docs/solver/w2-przesiew.md`, nie liczone ponownie);
- **kandydat**: turn i river {33%, 75%} puli, river bez przebicia, w SRP donk BB 1,4bb, porównanie w węźle `['x']`, rake 5%/3bb;
- **rake0**: d1333 z rake 0 (tylko pomiar ograniczający, nie kandydat).

Kryteria D-1332: K1 ≤ 5 pp, K2 ≥ 85%, NashConv < 0,5% puli. Wszystkie 14 przebiegów D1 ma NashConv < 0,5% puli (maks. 0,496%, rake0 a52).

## Wyniki (7 stołów B5)

Zakład nasz / strona w %, K1 w pp, K2 w %.

| Stół | d1333: zakład, K1, K2 | rake0: zakład, K1, K2 | kandydat: zakład, K1, K2 |
|---|---|---|---|
| `btn-vs-bb-srp-k72-rainbow` | 96,4 / 99,9; 3,4; 96,6 ✔ | 93,6 / 99,9; 6,3; 93,7 ✘ | 90,4 / 99,9; 9,5; 90,5 ✘ |
| `co-vs-bb-srp-543-rainbow` | 29,4 / 41,0; 11,6; 84,6 ✘ | 26,8 / 41,0; 14,2; 82,3 ✘ | 45,1 / 41,0; 4,1; 86,7 ✔ |
| `hj-vs-bb-srp-663-paired` | 63,6 / 82,3; 18,8; 80,5 ✘ | 67,1 / 82,3; 15,2; 82,7 ✘ | 52,2 / 82,3; 30,1; 69,6 ✘ |
| `utg-vs-bb-srp-873-two-tone` | 66,5 / 71,9; 5,4; 86,0 ✘ | 57,9 / 71,9; 14,0; 81,9 ✘ | 49,9 / 71,9; 22,0; 77,7 ✘ |
| `bb-vs-btn-3bet-942-rainbow` | 95,6 / 98,4; 2,8; 95,8 ✔ | 92,2 / 98,4; 6,2; 93,1 ✘ | 99,4 / 98,4; 1,0; 98,3 ✔ |
| `bb-vs-co-3bet-987-two-tone` | 59,0 / 46,6; 12,4; 85,6 ✘ | 58,6 / 46,6; 12,1; 85,9 ✘ | 69,3 / 46,6; 22,7; 76,8 ✘ |
| `sb-vs-btn-3bet-a52-rainbow` | 81,0 / 74,1; 6,9; 88,6 ✘ | 77,4 / 74,1; 3,2; 89,3 ✔ | 78,8 / 74,1; 4,6; 87,9 ✔ |
| **Przeszło** | **2/7** | **1/7** | **3/7** |

Źródło liczb: `targets/w2-results/{rake0,kandydat}/*.json` (poza gitem), te same wartości w ostatniej linii logów `docs/solver/dowody/d1-{rake0,kandydat}-<stół>.log`.

## Wpływ zmian (zmiana zakładu względem d1333, w pp)

| Stół | rake 0 | kandydat (M1 + M3 łącznie) |
|---|---|---|
| k72 | −2,8 | −6,0 |
| 543 | −2,6 | +15,7 |
| 663 | +3,5 | −11,4 |
| 873 | −8,6 | −16,6 |
| 942 (3BP) | −3,4 | +3,8 |
| 987 (3BP) | −0,4 | +10,3 |
| a52 (3BP) | −3,6 | −2,2 |

Obserwacje (bez wniosku o modelu):
- **Rake 0** zmienia łączny zakład o −8,6…+3,5 pp, zwykle w dół. Kierunek nie jest zgodny z różnicą wobec strony (w SRP nasz solver zakłada za rzadko, rake 0 to pogłębia na 3 z 4 stołów SRP). H-C (rake) jako wyjaśnienie różnic B5 **nie znajduje potwierdzenia**: rake nie jest główną przyczyną.
- **Kandydat** zmienia zakład silniej (−16,6…+15,7 pp) i w różnych kierunkach na różnych stołach. Średnie |K1| na 7 stołach: d1333 8,8 pp, rake0 10,1 pp, kandydat 13,4 pp. Kandydat przechodzi 3/7 (543, 942, a52), ale na 663, 873 i 987 rozjazd rośnie. Drzewo turnu i rivera (H-A) ma więc duży wpływ na decyzję na flopie, lecz rozmiary {33%, 75%} nie przybliżają wyniku systematycznie.
- M1 i M3 mierzono łącznie (reguła D-1335 przewidziała jeden model). Udziału każdej zmiany osobno D1 nie rozdziela; na stołach 3BP (bez donku) zmiana pochodzi wyłącznie z M1.
- H-B (nieopublikowane zakresy drzewa flopu) pozostaje niewyjaśniona, zgodnie z planem.

## Koszt D1

- CPU: rake0 7 stołów 35,4 min; kandydat 7 stołów 97,8 min (k72 24,9 min, maks. 8,4 GB tablic). Razem ok. 2,2 h CPU kontenera, 0 zł.
- Pierwszy przebieg tła został przerwany limitem 2 h po 5 stołach kandydata; brakujące 2 stoły dokończono w osobnym przebiegu (skrypt pomija gotowe stoły, stąd linia „wynik istnieje, pomijam” w części logów).

Następny krok: D2 (7 stołów odłożonych, model kandydujący bez zmian), kryteria D-1332, próg ≥ 5/7.
