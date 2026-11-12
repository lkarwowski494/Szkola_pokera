# Plan opcji B: diagnoza i nowy przesiew W2 (KO-090, 2026-11-12)

Decyzja właściciela, 14:25 UTC (przez koordynatora): „B: diagnoza i nowy przesiew”, KO-090. Zakres KO-088 rozszerza się o etap diagnozy. Reguły poniżej zapisano **przed** jakimkolwiek pomiarem z nowym modelem (D-1335). Wynik przesiewu B5 (2/7) jest w `docs/solver/w2-przesiew.md`.

## 1. Model kandydujący (ustalony z góry, bez patrzenia na wynik)

Model kandydujący to D-1333 z dwiema zmianami. Wybór zmian wynika z hipotez, a nie z wyników stołów:

- **M1 (H-A, drzewo turnu i rivera).** Turn i river mają rozmiary {33%, 75%} puli zamiast 66%. To rozmiary flopu z drzewa kanonu (`meta.postflop.highSprTree.sizes[0]`). Przebicie ×3 zostaje.
  - Jeśli tablice SRP przekroczą 12 GB, przebicie na riverze wypada. To uproszczenie nazwane, zapisane przed pomiarem.
- **M3 (H-C, donk).** W SRP BB na flopie może zagrać jako pierwszy, zakładem 1,4bb (mały rozmiar ze strony), albo czekać. Korzeń porównania W2 to wtedy decyzja otwierającego po czekaniu BB (ścieżka `['x']`).
- Rake bez zmian (5%/3bb, D-1333).

Rake 0 (H-C) to wyłącznie **pomiar ograniczający**. Pokazuje, ile rake przesuwa wynik. Kandydatem nie jest, bo cel ma rake NL500.

Hipoteza H-B (nieopublikowane zakresy drzewa flopu BeyondGTO, a w 3BP zakres sprawdzenia 3-betu z kanonu) **zostaje niewyjaśniona**. Opcja B jej nie sprawdza: nie ma czytelnego źródła tych zakresów. Jeśli przyczyną jest H-B, nowy przesiew też nie przejdzie, a wniosek zostanie w otwartych pytaniach.

## 2. Etapy

| Etap | Co | Kryterium / wynik | CPU [OCENA] |
|---|---|---|---|
| D0 kod | Kod obsługuje osobne rozmiary pierwszego zakładu OOP na flopie (donk); C zwraca strategię w węźle ze ścieżki (korzeń W2 = `['x']` w SRP); `w2-run.ts` dostaje model jako parametr (`d1333`, `kandydat`, `rake0`). Testy najpierw czerwone; test różnicowy C = TS dla donku i ścieżki | `pnpm run ci` kod 0 | — |
| D1 diagnoza | 7 stołów z B5 (`w2-przesiew.md`): (a) model kandydujący, (b) D-1333 z rake 0 | tylko raport wpływu każdej zmiany na K1/K2; **żadnej decyzji o modelu** | 14 stołów × 10–25 min ≈ 3–5 h |
| D2 nowy przesiew | 7 stołów odłożonych (pkt 3), model kandydujący | kryteria bez zmian: K1 ≤ 5 pp, K2 ≥ 85%, NashConv < 0,5% puli; przechodzi przy ≥ 5/7 | 7 × 10–25 min ≈ 1,5–3 h |
| po D2 | przeszedł: PYTANIE „105 stołów czy próbka 35” (B6); nie przeszedł: STOP i PYTANIE (opcja A albo C z `stan-fb.md`) | — | — |

Czasy [OCENA] wyprowadzono z B5: 3,4–7,9 min na stół przy D-1333 (`dowody/b5-*.log`). M1 i M3 powiększają drzewo, przyjęty mnożnik to 2–3×. Pamięć SRP przy D-1333 wynosiła do 2,8 GB; przy M1 szacunek to ok. 7–9 GB, do zmierzenia w D0.

## 3. Stoły odłożone (D2): reguła mechaniczna

- Flopy: alfabetyczna lista 15 flopów z mapy strony, indeksy 0–14: 543, 663, 873, 942, 987, a52, a83, ak4, ak7, j96, k72, kk3, q95, qjt, t98.
- Pary w kolejności planu: k = 0…6.
- Para k dostaje flop o indeksie (2k + 7) mod 15.
- Żaden stół odłożony nie powtarza stołu przesiewu B5 tej samej pary.

| k | Para | Stół D2 |
|---|---|---|
| 0 | BTN vs BB SRP | `btn-vs-bb-srp-ak4-two-tone` |
| 1 | CO vs BB SRP | `co-vs-bb-srp-j96-two-tone` |
| 2 | HJ vs BB SRP | `hj-vs-bb-srp-kk3-paired` |
| 3 | UTG vs BB SRP | `utg-vs-bb-srp-qjt-two-tone` |
| 4 | BB vs BTN 3BP | `bb-vs-btn-3bet-543-rainbow` |
| 5 | BB vs CO 3BP | `bb-vs-co-3bet-873-two-tone` |
| 6 | SB vs BTN 3BP | `sb-vs-btn-3bet-987-two-tone` |

## 4. Komendy

```bash
cd tools/preflop-solver
npx tsx scripts/fetch-beyondgto-spots.ts      # cel W2 (poza gitem), sumy: docs/solver/w2-cel-sumy.txt
# po D0 (parametr modelu do dodania):
npx tsx scripts/w2-run.ts --model kandydat btn-vs-bb-srp-k72-rainbow …   # D1(a)
npx tsx scripts/w2-run.ts --model rake0 btn-vs-bb-srp-k72-rainbow …      # D1(b)
npx tsx scripts/w2-run.ts --model kandydat btn-vs-bb-srp-ak4-two-tone …  # D2
```

- Wyniki trafiają do `targets/w2-results/<model>/` (poza gitem). Podsumowanie i logi idą do repo (`docs/solver/w2-diagnoza.md`, `dowody/d1-*.log`, `dowody/d2-*.log`).
- Obliczenia w odcinkach: skrypt pomija stoły, które mają już wynik. Jeden przebieg w tle nie powinien przekraczać 2 h.
