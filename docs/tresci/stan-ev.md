# Stan sesji EV (06-tresci, fix): EP-002, EP-003, R-M5-012, semi-blef N6 — 2026-11-12
Gałąź `sesja-ev-tresci` od `claude/sleepy-brahmagupta-2065nu` @ 91573ab6. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/EV.md` @ c6087c7a. Decyzje: `docs/decyzje/EV.md` (D-1285…D-1289). Odczyty: `docs/tresci/odczyty/ev-2026-11-12.tsv` (10/10 cytatów dosłownie). Rachunek: `docs/tresci/narzedzia/rachunki/ev_wektory.py` → `docs/tresci/dowody/ev-wektory.txt`.

| Zadanie | Stan | Dowód |
|---|---|---|
| 1. EP-002 (remis w SDV) | rozstrzygnięte: D-1285, SDV = (W + ½T)/N; R-M8-006 `then` pl/en; rejestr | wektor A: SDV 0,5 (`dowody/ev-wektory.txt`) |
| 1. EP-003 (turn-bet, żywe outy) | rozstrzygnięte: D-1286, tylko czyste outy; R-M7-006 bez zmian | wektory ziarno 8 / czyste / kolor w ręce |
| 2. R-M5-012 `check` | źródło jest (Upswing ep24, szczebel 4); D-1287 **warunkowe**: łatka gotowa (`szablony-robocze/ev-m5-l4-c-oop.patch`, `ev-r-m5-012-check.txt`), nie w `content/`, bo wymaga zmiany testu 08 (`szablony-f2-ca.test.ts:104`) i przekładu 09 (struktura we wszystkich językach) | `pnpm content:build` kod 0 z łatką i bez niej; CI z łatką czerwone: `dowody/ev-ci-czerwone-1.txt` |
| 3. Semi-blef N6 | otwarte: D-1289 (źródło przeczy regule ogólnej) | odczyt GW gutshots |
| 4. Klucze dla 09 | niżej | — |

## Specyfikacja dla roli 08 (bez zmian kodu w EV)

**08-EV-1 (EP-002, D-1285)** `packages/poker-core/src/scenario-gen.ts` `pickHandAnalysis`:
- SDV = (wygrane + ½ remisów) / (V + F). Remis to równa siła 5 z 7 kart (`strength` równe).
- Reguły trybów zostają: showdown wymaga, żeby jedna ręka miała SDV = 0, a druga SDV > 0; blockers wymaga SDV = 0 dla obu rąk.
- Wyrocznia testu liczy remisy jawnie, osobnym licznikiem.
- Wektory: (A) 7h6h, stół Ts9h4d3c2s, zakres = wszystkie 76: W = 0, T = 9, N = 9 → SDV 0,5. W trybie showdown 7h6h nie jest blefem. W trybie blockers wariant z 7h6h jest odrzucany. (B) 7h6h wobec KQ: SDV 0.
- GENERATOR_WERSJA: według D-1250. Dziś nie ma treści pick-hand, więc podniesienie wersji jest potrzebne tylko wtedy, gdy zmienią się odciski.

**08-EV-2 (EP-003, D-1286)** turn-bet (`scenario-gen.ts:719-726`):
- Przyjmij wariant tylko wtedy, gdy zbiór kart rivera (44 niewidziane przy znanych 8 kartach), na których rywal wygrywa albo remisuje, jest **równy** zbiorowi nominalnych outów drawa z `analyseOutsSpot(villain, turn)`, a remisów jest 0.
- Wtedy e = N/44, a `hit` = N/46 zostaje liczbą pokazywaną.
- Warunek: `hit > reqSmall && e < reqBig && inMargin(hit − reqSmall) && inMargin(reqBig − e)`.
- Wektory: 4c9c vs 7hKh na 4dJh3h9d → odrzucony (wygrywa 7 kart, nominalnie 9); AsKd vs QhJh na Ks8h5h2c → przyjęty (9/44 = 0,2045; 9/46 = 0,1957; ceny 0,1667 i 0,30); AhKd vs QhJh na Ks8h5h2c → odrzucony (8 ≠ 9).
- Test trwały (powraca z EI-001): 3000 ziaren; każdy przyjęty wariant ma licznik wygrywających kart = N, 0 remisów, N/46 > cena małego, N/44 < cena dużego.
- Blokuje dodanie turn-bet do `RODZAJE_NA_EKRANIE`.

**08-EV-3 (R-M5-012, D-1287)** dopisz R-M5-012 do listy w `tools/content-build/test/szablony-f2-ca.test.ts:104` (po wdrożeniu łatki) oraz `params.heroPositions` (lista po przecinku, np. `"HJ,CO"`):
- ocena `cbet-case` w `grading.ts:386` stosuje regułę tylko wtedy, gdy pozycja gracza jest na liście;
- bramka `tools/content-build/src/scenariusze.ts:186` odrzuca szablon z `positions.hero` spoza listy.
- Do tego czasu ocena w grze obejmuje też UTG i SB wobec BB (brzegowe: bet dostaje „dopuszczalne”).

**08-EV-4 (R-M5-012)** `scenario-gen.ts:192` i `:811`:
- dziś przypadki c-betu ze wszystkich reguł trafiają do jednej puli i wygrywa pierwszy pasujący. Na niskich połączonych flopach jest to przypadek IP R-M5-004 (`m5.l3.c-btn`), a punkt R-M5-012 dostaje `null`. Wynik nie jest błędny, ale część wariantów odpada.
- Poprawka: dla punktu `cbet-case` szukaj tylko w przypadkach reguły `spec.rule`.
- Wektor: flop 7c6d5h (low, connected), szablon CO wobec BTN, reguła R-M5-012 → przypadek `check` z R-M5-012.

**08-EV-5 (opcjonalne, ŚR, backlog)** przypadek „czysty check” (źródło: cały zakres czeka):
- dziś bet przy `best: check` dostaje „dopuszczalne”. To uproszczenie nazwane w D-1287.
- Ewentualna flaga przypadku (np. `pure: true` → bet = niedokładność) to zmiana schematu do decyzji 08 i koordynatora.

## Klucze zmienione w EV dla roli 09 (10 języków: de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant; wzorzec pl i en)
- `content/{lang}/rules.yaml` R-M8-006 `then`: „które przy showdownie nie wygrają ani nie podzielą puli” (en: „that won't win or split the pot at showdown”).
- `content/{lang}/rules.yaml` R-M5-012 `source`: dopisany trzeci cytat (Upswing ep24, adres i cytat po angielsku bez zmian); `sources`: trzeci wpis `{ kind: training }`; `check`: wiersz strukturalny. Wszystko to jest w `docs/tresci/szablony-robocze/ev-r-m5-012-check.txt` i jeszcze nie w `content/` (D-1287 warunkowe); wstawiać we wszystkich 12 językach naraz, razem z zadaniem niżej.
- `content/{lang}/lessons/m5-l4-bez-pozycji.md` (wzorzec pl/en w `docs/tresci/szablony-robocze/ev-m5-l4-c-oop.patch`): nowe zadanie `m5.l4.c-oop` przed `m5.l4.q-oop-why`: `prompt`, `options.check|small|big`, `cases[0].why.check|small|big`.

## Otwarte pytania
- [DO USTALENIA] N6 / SC-20 (produkt, 03/koordynator): (a) zadanie stałe z przykładu GW (A♠9♣7♥2♠, odpowiedzi per ręka podane w tekście artykułu) zamiast generatora: zmienia typ szablonu; (b) SC-20 poza 1.0 albo zastąpiony inną sytuacją M7. Rekomendacja 06: (b), bo (a) uczy jednego układu, którego źródło samo nie uogólnia.
- [DO USTALENIA] R-M5-012 dla flopów wysokich i średnich (CO wobec BTN): źródło podaje „very wide” i ok. 35% bez rozmiaru; przypadek bez źródła rozmiaru zostaje poza treścią.
- [DO USTALENIA] Backdoor z kartą niższą niż T wobec c-betu ok. 1/3 (z EH/EL, bez zmian).

Następny krok: koordynator (weto D-1285…D-1289, zadania 08-EV-1…5, 09).
