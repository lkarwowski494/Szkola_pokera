# Szkice 11 szablonów spoza formatu kroku B (rola 06, sesja BS, 2026-11-10)
Status (do sesji CO): **szkic dla roli 08** (wzór rozszerzenia formatu, PYTANIE BS wariant (a)); nie jest treścią aplikacji i nie przechodzi `content:build`. Po rozszerzeniu formatu sesja 06 przenosi je do `content/{pl,en}/scenarios/` i dopisuje test jak `tools/content-build/test/szablony-bs.test.ts`.

## Stan po sesji CO (rola 06, 2026-11-11; decyzje `docs/decyzje/CO.md`)
| Szkic | Stan | Powód / warunek powrotu |
|---|---|---|
| SC-03 | **w treści** `content/*/scenarios/sc-03.yaml` (draw-call od turnu, 25 bb, Ł Ś `fold`) | D-790 |
| SC-11 | **w treści** `sc-11.yaml` (cbet-case R-M5-007, ręka bez pary i drawa z zakresu otwarcia BTN, Ł Ś `bet-small`; czekanie dopuszczalne) | D-792, D-793, CS D-827 |
| SC-12 | **w treści** `sc-12.yaml` (cbet-case R-M5-004, ręka bez pary i drawa z zakresu otwarcia BTN, Ł Ś `check`; mały i duży zakład dopuszczalne, trzy akcje wymagane przez bramkę CR) | D-792, D-793, CS D-826, D-827 |
| SC-34 | **szkic** `sc-34.yaml` (w tym katalogu; icm-call BB wobec SB, 10 bb, Ł `fold`, Ś `call`, T `fold` z chipsDiffer) | CS (D-825): icm-call poza ekranem (D-807, D-817): bramka odrzuca. Powrót: projekt widoku ICM (rola 04) + wdrożenie (08); poziom trudny dopiero po 06-tresci-002 (CQ: odpowiedź odporna na zakres all-inu z równowagi ICM albo nazwane założenie; test `it.fails` na szkicu w `recenzja-cq-odtworzenie.test.ts`). Wersje językowe: `git show ad62a2d:content/<język>/scenarios/sc-34.yaml` |
| SC-04, SC-05, SC-32, SC-33 | **szkic**: punkt `range-spot` (F1) | budowanie odrzuca range-spot, dopóki ekran go nie obsłuży (D-755, `checkScenarioNaEkran`); wraca po pracy 08 nad ekranem (kontekst spotów, interfejs wielu akcji) |
| SC-06, SC-08 | **szkic**: `size-spot` (F3) | generator size-spot losuje dowolną rękę, a ręka spoza zakresu przy `raise` to „mistake” reguły zakresu (D-698: 32s z BTN); wraca razem z range-spot (pierwszy punkt `range-spot` ogranicza ręce) albo po filtrze rąk dla size-spot (zadanie 08) |
| SC-13 | **szkic, otwarte pytanie** | R-M5-008 nie ma przypadku `cbet-case` z `best: big`, a przeczytane źródło (GTO Wizard, Flop Heuristics IP, 2026-11-11) mówi o większym rozmiarze, ale „decreased overall betting frequency” — bez źródła, czy na takiej teksturze akcją zakresu jest zakład; D-795 |

Zasady wspólne (z D-630 i formatu B): jedna oczekiwana akcja na punkt decyzji we wszystkich poziomach szablonu (wyjaśnienia są jedne na akcję); pierwsze zdanie każdej akcji ma `{{w:reka}}`, `{{w:pozycja}}`, `{{w:stol}}` (preflop: `{{w:stol}}` = „przed flopem”, do ustalenia przez 08); liczby tylko `{{n:…}}`; powód „bo” tylko z pola `because` reguły (D-565, D-567). Poziomy dla decyzji z zakresu solvera (ADR-26, skala `rangeVerdict`): **Ł** = ręka grana tą akcją w ≥ 90% i daleko od granicy zakresu (np. para ≥ 99, AK–AQ przy otwarciu; śmieci przy pasie), **Ś** = ręka zgodna, ale z drugiej połowy zakresu (wymaga znajomości szerokości zakresu, „procent otwarć”), **T** = ręka mieszana (akcja oczekiwana „zgodna”, druga „dopuszczalna”, BR-POZ-001).

## Czego potrzeba od roli 08 (rozszerzenie formatu)
| Nr | Rozszerzenie | Dla szablonów | Wyrocznia testu (BR-GEN-003) |
|---|---|---|---|
| F1 | punkt `range-spot` (preflop): `spot` z `content/ranges/spots.yaml`, granice poziomu jako przedział częstości akcji oczekiwanej z danych solvera; akcje z grup spotu | SC-04, SC-05, SC-06, SC-08, SC-32, SC-33 | `rangeVerdict` na częstościach solvera (`packages/poker-core`), nie kod generatora |
| F2 | punkt `cbet-case` (flop po otwarciu): tekstura z `TextureFilter`, akcje `bet-small` / `bet-big` / `check`, ocena z przypadków `m5.l3.c-btn` | SC-04, SC-05, SC-11, SC-12, SC-13 | `grading.ts` `cbet-case` |
| F3 | rozmiar jako akcja (`three-bet-size`, `open-size`) | SC-06, SC-08 | `grading.ts` `three-bet-size`, `no-limp` |
| F4 | punkt `icm-call` z equity z kart (plan §2 SC-34) i strukturą wypłat | SC-34 | `icm` z `engine.ts` / poker-core |
| F5 | dla `draw-call`: decyzja od turnu (flop bez akcji gracza), margines na punkt decyzji, linia `all-in`, filtr „draw do najlepszej ręki” | SC-03 (i T w SC-02, SC-19) | jak `szablony-bs.test.ts` |
| F6 | ostrzeżenie budowania: wszystkie łatwe szablony modułu z tym samym `expected` (ŚR-103 b) | wszystkie | test budowania |

## Szkice
### SC-03 (M2) gutshot wobec dużego zakładu → pas
Brak w formacie B: pas gutshotem na flopie przy 1 decyzji przechodzi D-630 tylko na Ł (zakład ≥ pula, krótki stos), na Ś daje go tylko rachunek na jedną kartę, a na dwie karty (ok. {{n:odds.gutshot.flop-river}}) i z implied odds sprawdzenie bywa dobre. Propozycja z F5: decyzja na turnie (flop: rywal i ty czekacie), 35 bb, zakład ½–1 puli; Ł Ś, oczekiwane `fold`; reguły R-M7-007, R-M7-008, R-M2-002.
- fold: „Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}, a rywal z {{w:rywal}} stawia dużo. Pasujesz, bo gutshot domyka tylko jedna wysokość: masz {{n:outs.gutshot}} outy, a ostatnia karta trafia w ok. {{n:odds.gutshot.turn-river}} przypadków, czyli rzadziej niż raz na jedenaście kart, dużo rzadziej, niż wymaga cena.”
- call: „… Sprawdzenie traci: płacisz za kartę, która rzadko domyka strita, a przy krótkich stosach za pulą zostało za mało żetonów, żeby trafienie to odrobiło.”

### SC-04 (M3) UTG otwiera ręką z zakresu → c-bet na suchym wysokim flopie
F1 + F2. Decyzje: (1) `range-spot` `rfi.utg`, oczekiwane `raise` (Ł: pary ≥ 99, AK–AQ; Ś: ręce zgodne z dolnej części zakresu; T: ręce mieszane), R-M3-002 (gto); (2) `cbet-case` flop suchy z asem albo królem, BB sprawdził i czeka, oczekiwane `bet-small`, R-M5-007, R-M5-003.
- raise: „Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, wszyscy przed tobą spasowali. Otwierasz, bo ta ręka mieści się w ciasnym zakresie z UTG: za tobą jest jeszcze pięciu graczy, więc otwierasz tylko ręce, które często są lepsze od ich rąk.” (R-M3-002 because)
- fold: „… Pas oddaje rękę, którą solver z UTG otwiera: jest w zakresie ok. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} najlepszych rąk, mimo że za tobą jest pięciu graczy.”
- bet-small: „Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}, duży blind sprawdził i czeka. Stawiasz mało, ok. {{n:cbet.size.small}} puli, bo masz przewagę zakresu: duży blind większość AA, KK i AK przebija przed flopem, a jego słabe ręce i tak spasują małemu zakładowi.” (R-M5-007, R-M5-003)
- check: „… Czekanie oddaje darmową kartę rękom, które mały zakład by spasował; na suchym wysokim flopie masz przewagę zakresu.”

### SC-05 (M3) Button otwiera szeroko, BB broni, flop niski połączony
F1 + F2. (1) `range-spot` `rfi.btn`, oczekiwane `raise` (Ł: górna połowa; Ś: dolna; T: mieszane), R-M3-003; (2) `cbet-case` flop niski połączony, oczekiwane `check` dla rąk bez pary i drawa, R-M5-004.
- raise: „Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, wszyscy przed tobą spasowali. Otwierasz, bo zostały tylko blindy, a po flopie będziesz mieć pozycję.” (R-M3-003)
- check (flop): „Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}, duży blind sprawdził i czeka. Czekasz, bo duży blind broni wielu konektorów i małych kart, które trafiają taki flop, a twoje wysokie karty chybiły.” (R-M5-004)
- bet (flop): „… Zakład na niskim połączonym flopie płaci rękom dużego blinda, które ten flop trafił; częściej czekasz niż na wysokich flopach.”

### SC-06 (M3) mały blind: przebicie albo pas, bez limpu
F1 + F3. `range-spot` `rfi.sb`, akcje `raise` / `call` (limp) / `fold`; dwa warianty szablonu albo poziomy z oczekiwanym `raise` (Ł: ręce mocne; Ś: dolna część zakresu); limp = „niedokładność” z uproszczeniem z R-M3-004 („niektóre rozwiązania solverów część rąk dopłacają”). R-M3-009 (gto), R-M3-004 (heuristic).
- raise: „Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, wszyscy spasowali do ciebie. Przebijasz, bo grasz już tylko przeciw dużemu blindowi, a przebicie może od razu wygrać blindy i daje inicjatywę.”
- limp: „… Samo dopłacenie oddaje szansę na wygranie blindów od razu i inicjatywę; to uproszczenie: niektóre rozwiązania solverów część rąk dopłacają.”

### SC-08 (M4) Button 3-betuje otwarcie CO, rozmiar 3-betu
F1 + F3. (1) `range-spot` `vs-open.btn-vs-co` (jedna grupa „gram”, solver prawie nie sprawdza), oczekiwane `3-bet` (Ł: AA–QQ, AK; Ś: dolne 3-bety; T: mieszane); (2) rozmiar: ok. {{n:pf.3bet.size-ip}} otwarcia, R-M4-001 (heuristic).
- 3-bet: „Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, CO otworzył. Przebijasz, bo w tym spocie solver gra 3-bet albo pas, a ta ręka jest w jego zakresie 3-betu.”
- rozmiar: „… Przebijasz do ok. {{n:pf.3bet.size-ip}} otwarcia, bo taki rozmiar daje dobry stosunek stacka do puli na flopie i nie daje rywalowi taniej ceny.” (R-M4-001)

### SC-11, SC-12, SC-13 (M5) c-bet: suchy wysoki / niski połączony / mokry flop
F2. Jedna decyzja na flopie po otwarciu z BTN i obronie BB (preflop jako linia, bez decyzji). SC-11: oczekiwane `bet-small` (R-M5-007, R-M5-003); SC-12: `check` dla rąk bez pary i drawa (R-M5-004); SC-13: `bet-big` dla rąk z drawem lub parą, rzadziej (R-M5-008), z liczbą R-M5-011 (math: blef musi spasować rywala częściej niż {{n:alpha.cbet.big}}) na T. Teksty jak w SC-04/SC-05 (te same pola `because`).

### SC-32 (M11) push/fold z małego blinda przy ok. 10 bb
F1 z `push.sb-10`. Oczekiwane `all-in` (Ł: ręce daleko w zakresie; Ś: dolna część; T: granica). R-M11-002 (gto), R-M11-001 (heuristic).
- all-in: „Masz {{w:reka}} na {{w:pozycja}} przy ok. {{n:m11.depth.10}}, {{w:stol}}, wszyscy spasowali. Grasz all-in, bo przy tak krótkim stacku ryzykujesz mało względem blindów, które zgarniasz, gdy duży blind spasuje, a on musi sprawdzać szerzej.”
- fold: „… Pas oddaje blindy ręką z zakresu all-in: przy ok. {{n:m11.depth.10}} solver pushuje ok. {{n:m11.push.10}} rąk.”
- raise (podbicie bez all-in): „… Podbicie i pas po przebiciu oddaje za dużo żetonów; all-in wyciska najwięcej pasów rywala.” (R-M11-001)

### SC-33 (M11) duży blind sprawdza all-in
F1 z `call.bb-10`. Oczekiwane `call` (Ł: ręce mocne; Ś: dolna część zakresu sprawdzenia) albo osobny szablon `fold` dla rąk spoza zakresu. R-M11-007 (gto), R-M11-006 (math: equity (S − 1) ÷ 2S, {{n:m11.call.10.eq}}).
- call: „Masz {{w:reka}} na {{w:pozycja}}, {{w:stol}}, mały blind wszedł all-in. Sprawdzasz, bo ta ręka jest w zakresie sprawdzenia: blind już leży w puli, więc potrzebujesz ok. {{n:m11.call.10.eq}} equity, a ta ręka ma ją przeciw zakresowi all-in.”
- fold: „… Sprawdzasz węziej, niż sam byś pushował: wygrywasz tylko na showdownie, przeciw zakresowi silniejszemu niż losowy.” (R-M11-007)

### SC-34 (M11) bańka: sprawdzenie ciaśniej (ICM)
F4. Oczekiwane `fold` ręką, która w grze o żetony sprawdza, a z ICM nie (equity z kart wobec progu BF ÷ (BF + 1)). R-M11-009 (math), R-M11-010 (heuristic).
- fold: „Masz {{w:reka}} na {{w:pozycja}} na bańce, {{w:stol}}, rywal z większym stackiem wszedł all-in. Pasujesz, bo na bańce przegrana zabiera ci więcej z puli nagród, niż wygrana dodaje, więc sprawdzenie musi wygrywać częściej niż w grze o żetony.”
- call: „… W grze o żetony to sprawdzenie by się opłacało, ale z ICM próg jest wyższy: ok. {{n:m11.bf.req}} zamiast {{n:m11.bf.req-chips}}.”
