# Stan sesji EQ (06-tresci, fix): 06-tresci-001 i 06-tresci-002 z recenzji EO — 2026-11-12
Gałąź `sesja-eq-tresci` od `sesja-eo-recenzja` @ 333af15d. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/EQ.md`. Decyzje: `docs/decyzje/EQ.md` (D-1255…D-1259). Odczyty: `docs/tresci/odczyty/eq-2026-11-12.tsv`. Kontrola: `node docs/tresci/narzedzia/eq-kontrola.mjs` (czerwony przed: `dowody/eq-red.txt`, 17 braków, kod 1).

## 06-tresci-001 (WYS): „silna ręka” = najwyższa para z dobrym kickerem albo lepsza (D-1255, D-1256)
Zmienione: R-M7-006 `if` i `source` (pl, en), wpis rejestru R-M7-006 (`docs/tresci/rejestr/m5-m8.json`, scalony `docs/tresci/rejestr.json`).

### Specyfikacja dla 08: filtr 08-EL-1 bez TPWK (zastępuje „`pairKind` overpair/top z kartą gracza” z D-1213 w części „top”)
`turn-bet` w `packages/poker-core/src/scenario-gen.ts`, filtr ręki gracza (oprócz żywych outów i cen z D-1213, bez zmian):
- przyjęty: `pairKind` overpair; układ ≥ dwie pary z kartą gracza; `pairKind` top (para z kartą gracza z najwyższą kartą stołu) **tylko gdy druga karta gracza (kicker) ma rangę ≥ Q** (D-1256);
- odrzucony: `pairKind` top z kickerem ≤ J (TPWK i średni kicker), każda inna para, klasa „strong” z samych outów.
Wektory akceptacji (stół K♦8♦3♠7♥, rywal z drawem do koloru w karach, 9 żywych outów):
- K♥4♣ → odrzucony (TPWK; wektor z recenzji EO);
- K♥J♣ → odrzucony (kicker J, tuż pod progiem);
- K♥Q♣ → przyjęty (kicker Q, na progu);
- K♥A♣ → przyjęty;
- A♥Q♣ na A♦8♦3♠7♥ → przyjęty; A♥J♣ na tym stole → odrzucony;
- K♥8♣ (dwie pary z kartami gracza) → przyjęty (9 żywych outów: 3♦ i 7♦ dają tylko dwie pary z parą stołu, przegrywające z kolorem). Uwaga: set 8♥8♣ na tym stole ma 7 żywych outów (3♦, 7♦ dają fulla), więc odpada na marginesie z D-1213, nie na kickerze; nie używać go jako wektora „przyjęty”.
Test akceptacyjny 08: powyższe wektory w teście generatora + wyrocznia losowań: żaden przyjęty wariant z `pairKind` top nie ma kickera < Q.

## Klucze do przekładu 09 (zmienione zdania; w 10 językach de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant bez zmian w tej sesji)
- `rules.yaml` R-M7-006 `if` (dodać „z dobrym kickerem”, `{{t:kicker}}`) i `source` („silna = najwyższa para z dobrym kickerem i lepsze”). Wzorzec: pl i en.
