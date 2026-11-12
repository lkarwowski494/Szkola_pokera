# Stan sesji EQ (06-tresci, fix): 06-tresci-001 i 06-tresci-002 z recenzji EO — 2026-11-12
Gałąź `sesja-eq-tresci` od `sesja-eo-recenzja` @ 333af15d. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/EQ.md`. Decyzje: `docs/decyzje/EQ.md` (D-1255…D-1259). Odczyty: `docs/tresci/odczyty/eq-2026-11-12.tsv`. Kontrola: `node docs/tresci/narzedzia/eq-kontrola.mjs` (czerwony przed: `dowody/eq-red.txt`, 17 braków, kod 1).

| ID | Commit | Kontrola przed → po | Dowód |
|---|---|---|---|
| 06-tresci-001 | 5d8adf17 | 7 braków 001 → 0 (`eq-kontrola.mjs`) | `dowody/eq-red.txt`, `dowody/eq-green.txt`, cytat Tip #2 w `odczyty/eq-2026-11-12.tsv` |
| 06-tresci-002 | a578f41a | 10 braków 002 → 0 | jw.; wektory na kodzie EK: `dowody/eq-ek-wektory.txt` |
| CI | a578f41a | `pnpm run ci` kod 0 (content-build 665 + 1 oczekiwany błąd) | `dowody/eq-ci-a578f41a.txt` |

Status obu ID: naprawione-do-weryfikacji (status „zweryfikowane” nadaje reaudit). Zmiany widoczne w aplikacji to tylko tekst reguł i lekcji; zrzutów nie robiono (bez zmian wyglądu). Poza zakresem: 06-tresci-003 i 004 (D-1214 → D-1213 w rejestrze R-M7-006 zostaje), 08-EL-3/4. Przy okazji poprawione w wpisie R-M7-006: `miejsce` cytatu „Tip #1” → „Tip #2” (cytat stoi w Tip #2; ten sam wpis, który zmienia 001).

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

## 06-tresci-002 (ŚR): backdoor → kontynuacja tylko z overkartą (D-1258)
Zmienione: R-M6-006 `then` i `source` (pl, en), `content/{pl,en}/lessons/m6-l2-sprawdzenie.md` (punkt listy „Czym sprawdzasz”), wpis rejestru R-M6-006 (nowy cytat Tip 4 z zakresem, pole `uproszczenie` z zakresem BvB). Nie zmieniane: `content/pl/lessons/m7-l1-druga-beczka.md:118` i `content/pl/lessons/m7-l2-polaryzacja.md:117` („czasem wysokie karty z backdoorem” jako opis zakresu rywala; „wysoka karta” w kursie = karta wyższa od stołu, `content/terms.yaml:126`).

### Specyfikacja dla 08: zmiana 08-EH-3 w `defendVsCbet` (implementacja EK: `packages/poker-core/src/scenario-gen.ts` na `origin/sesja-ek-partia2` @ 24f32fb5, linie 1064–1068)
Gałąź „mały c-bet” (progi z 08-EL-2):
- backdoor koloru (linia 1064) i backdoor strita (linia 1067): warunek `hero.every(rank >= BACKDOOR_HIGH_MIN)` **zastąpić** warunkiem „co najmniej jedna karta gracza ma rangę wyższą od najwyższej karty flopu” → `call`;
- backdoor (koloru albo strita) bez takiej karty → `null` (nie `fold`), jak dziś linia 1068;
- gutshot bez pary → `call` (D-1167, bez zmian); para, draw ≥ `drawOutsMin`, as w ręce: bez zmian; `fold` tylko bez pary, bez drawa i bez backdoora (bez zmian);
- komentarz `BACKDOOR_HIGH_MIN` (D-1066) w gałęzi „mały” nieaktualny; w gałęzi „duży” (R-M6-007: dwie karty ≥ T) stała zostaje.
Wektory akceptacji (c-bet 1/3 puli):
- J♠T♠ na K♠8♦4♣ → `null` (backdoory, brak overkarty; wektor z recenzji EO; dziś `call`);
- Q♥4♥ na T♣9♥2♠ → `call` (przykład źródła; dziś `null`, bo 4 < T);
- K♦Q♦ na J♥7♣2♦ → `call` (overkarty, backdoor koloru i strita);
- 6♦5♦ na K♥4♠9♦ → `null` (backdoor bez overkarty; bez zmian względem EH);
- J♦T♣ na Q♥8♣2♠ → `call` (gutshot, D-1167, bez zmian);
- 7♣2♦ na K♥9♠4♣ → `fold` (bez pary, drawa i backdoora strita; jeden trefl na stole przy kartach w różnych kolorach to nie backdoor koloru).
Test akceptacyjny 08: wektory wyżej + wyrocznia losowań (`outyDrawa` w `szablony-co.test.ts`): żaden wariant `call` z gałęzi backdoor nie ma ręki bez karty wyższej od całego flopu.

## Klucze do przekładu 09 (zmienione zdania; w 10 językach de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant bez zmian w tej sesji)
- `rules.yaml` R-M7-006 `if` (dodać „z dobrym kickerem”, `{{t:kicker}}`) i `source` („silna = najwyższa para z dobrym kickerem i lepsze”). Wzorzec: pl i en.
- `rules.yaml` R-M6-006 `then` („dodatkowym drawem (backdoor) z co najmniej jedną kartą wyższą od wszystkich kart stołu”, `{{t:board}}`) i `source` („backdoor z kartą wyższą od stołu (źródło: blind vs blind)”).
- `lessons/m6-l2-sprawdzenie.md`, sekcja „Czym sprawdzasz”, punkt listy o backdoorze (warunek: co najmniej jedna karta wyższa od wszystkich kart stołu).
