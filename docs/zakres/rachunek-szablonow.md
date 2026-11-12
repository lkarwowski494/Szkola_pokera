# Co w 21 brakujących szablonach da się policzyć
Stan: 2026-11-12 · Rola 06 build, sesja EX (polecenie `origin/koordynacja:docs/koordynacja/polecenia/EX.md` @ 7ce5c0a9) · Gałąź `sesja-ex-rachunek` od 91573ab6 · Decyzje: D-1300…D-1306 (`docs/decyzje/EX.md`, do weta) · Wejście: `docs/zakres/scenariusze-plan.md` §2 (34 szablony), `docs/tresci/zrodla-krok-e.md` (DV: warunki i źródła SC-16…SC-31), `docs/tresci/stan-el.md`, `docs/decyzje/EF.md`, `docs/decyzje/EL.md`, `content/pl/rules.yaml`, `packages/poker-core/src/` (odczyt kodu @ 91573ab6), `origin/koordynacja:docs/koordynacja/decyzje.md` (KO-069, KO-071).

## Odpowiedź dla właściciela
Częściowo tak. Rachunek (prawdopodobieństwo, cena, MDF, SPR, liczenie kombinacji) rozstrzyga decyzję wtedy, gdy wiadomo, co rywal może mieć; w prawdziwej grze tego nie wiadomo, a „co zwykle ma rywal i jak gra” to strategia z solverów i książek, nie z prawdopodobieństwa. Dlatego scenariusze dzielą się na trzy grupy. W 8 z 21 brakujących szablonów decyzja wynika w całości z rachunku, bo scenariusz sam podaje, czym rywal sprawdza albo jak często blefuje (tak, jak już przyjęto dla M10, KO-071). W 4 dalszych rachunek wystarcza, jeśli przyjmiemy jedno założenie o rywalu, które ma przeczytane źródło. W 9 pozostałych potrzebna jest strategia, ale 8 z nich ma już przeczytane źródła z wcześniejszych sesji, więc nie blokują pracy; zablokowany jest tylko SC-14 (c-bet bez pozycji). Wąskim gardłem nie są więc źródła, tylko silnik: brakuje mu m.in. equity ręki wobec zakresu na flopie i liczenia „ile rąk, które zapłacą, jest gorszych od mojej”; to praca dla programisty na ok. 2,5–3 sesje [OCENA]. Do decyzji: dwie zmiany pytań szablonów (SC-13 i SC-28) i los SC-14 (opcje niżej, §3).

## 1. Klasy i zasada „dana zadania”
- **R** — werdykt każdej akcji wynika z danych wariantu (karty, pula, zakład, stack) i ewentualnie z danej zadania podanej wprost w sytuacji („załóż, że rywal sprawdzi…”, „rywal blefuje w 1 z 3 zakładów”). Szczebel 1 ADR-24.
- **R+Z** — rachunek plus jedno założenie o zakresie albo akcji rywala, które aplikacja twierdzi jako fakt; założenie wymaga przeczytanego źródła (szczebel 2 lub 4 według KO-069).
- **Z** — strategia zakresu (częstości według klasy ręki albo tekstury) bez prostego rachunku; szczebel 2 lub 4.
- Dana zadania nie jest twierdzeniem o rywalach, więc nie wymaga źródła populacji; warunki w D-1300 (sytuacja mówi wprost, że to założenie; wyjaśnienie nie uogólnia; dane możliwe po usunięciu kart).

## 2. Tabela 21 szablonów
Skróty: „DV” = `docs/tresci/zrodla-krok-e.md` (źródła przeczytane 2026-11-11, cytaty i wiersze tam); GW = blog.gtowizard.com (szczebel 2), UP/PC/SS/DF = serwisy szkoleniowe (szczebel 4). Silnik: rodzaj punktu w `packages/poker-core/src/scenario-gen.ts` (stan @ 91573ab6); „brak widoku” = rodzaj odrzucany przez ekran (`apps/mobile/src/features/scenariusz/wariant.ts:58`).

| Szablon | Decyzja gracza | Klasa | Policzalna część (szczebel 1) | Wymagane źródło / założenie | Zmiana pytania | Praca 08 |
|---|---|---|---|---|---|---|
| SC-07 (M4) BB wobec BTN, flop | preflop gram/pas; flop wobec małego c-betu: sprawdzenie/pas | Z | cena preflop (`eq.bb-vs-btn-open`); MDF przy 1/3 = 75 % (R-M6-001) — dotyczy zakresu, nie ręki | jest: zakresy solvera preflop w aplikacji (`spots.yaml`, R-M4-004); flop R-M6-006 z D-1210/D-1212 | niepotrzebna | rodzaje są (`range-spot` z `play`, `defend`); brak widoku `defend` |
| SC-09 (M4) izolacja limpera | rozmiar przebicia; ręka do izolacji | Z | rozmiar = wzór z parametrów R-M4-012 (arytmetyka, ale wzór to konwencja szczebla 4); cena dla limpera | jest: R-M4-012, R-M4-013 (szczebel 4, KO-069, DV §4) | niepotrzebna | `iso-size` jest (D-1140); brak widoku limperów (04) |
| SC-10 (M4) otwarcie wobec 3-betu | pas / sprawdzenie / 4-bet | Z | alpha 3-betu (`alpha.vs-3bet-ip-size`) wyznacza górną granicę pasów **zakresu**; ręki nie rozstrzyga | jest: R-M4-010 lista AA/KK/AK (szczebel 4, DV §4) | niepotrzebna (pytanie o rękę z listy) | `list-hand` jest (D-1142); brak widoku |
| SC-13 (M5) mokry flop | dziś: c-bet czy czekanie (częstość) i rozmiar | R+Z (po zmianie) / Z (dziś) | cena drawa rywala przy 1/4 i 2/3 puli (jedna karta, jak `hitNextCard`; D-1306); liczba kombinacji drawów w zakresie obrony BB na stole (zakres z solvera preflop) | częstość c-betu na tej teksturze: brak źródła (D-795, otwarte); kierunek „większy rozmiar”: GW Flop Heuristics IP (R-M5-008, przeczytane) | **produktowa P1:** „silna ręka na mokrym flopie: rozmiar 1/4 czy 2/3 puli?” zamiast „c-bet czy czekanie” (cel: rozmiar zamiast częstości) | rodzaj „wybór rozmiaru po flopie” (jak `turn-bet` na flopie) + kombinacje drawów w zakresie |
| SC-14 (M5) c-bet bez pozycji | c-bet czy czekanie (CO wobec BTN) | Z | nic na poziomie ręki; prawdopodobieństwo trafienia kilku rywali (R-M5-013) dotyczy innej sytuacji | **brak**: wynik solvera według tekstury dla otwierającego bez pozycji (D-1218, sesja EV) | **produktowa P2** (opcje §3) | `cbet-case` z `position: oop` jest (D-1145); przypadki z treści po źródle |
| SC-15 (M6) obrona wobec małego c-betu | sprawdzenie/pas | Z | MDF 75 % i alpha 25 % przy 1/3 (R-M6-001, math) — kotwica wyjaśnienia | jest: R-M6-006 (D-1210/D-1212), R-M6-003 GW MDF & Alpha | niepotrzebna; liczba MDF w wyjaśnieniu poziomu Ś | `defend` jest; brak widoku; 08-EL-2 (progi [0,25; 0,35]) — w kodzie nadal `DEFEND_SMALL_MAX = 0.4` |
| SC-16 (M6) check-raise mocnym drawem | check-raise / sprawdzenie / pas; rozmiar check-raise'u | Z (+R rozmiar) | rozmiar: cena dla Buttona = dopłata ÷ (pula po przebiciu + dopłata) (R-M6-010) | jest: UP (szczebel 4) dla wyboru akcji (DV SC-16a/b); **pas nie z `draw-price`** (D-1301) | niepotrzebna | rodzaj „check-raise na flopie” (akcja + krotność) |
| SC-17 (M6) duży c-bet, słaba ręka | pas/sprawdzenie | Z | cena przy 3/4 = 30 % (`eq.bet-three-quarters`), MDF 57 % | jest: R-M6-007 (D-1166, D-1211) | niepotrzebna | `defend` (gałąź „duży”) jest; brak widoku |
| SC-18 (M7) second barrel | bet/czekanie na turnie; rozmiar | Z | klasa karty turnu (nadkarta/parująca/niska) z kart; alpha blefu przy 2/3 = 40 % | jest: GW The Worst Turn Card (szczebel 2), PC, PL (DV SC-18a–c) | niepotrzebna; alpha w wyjaśnieniu Ś | klasa karty turnu + rodzaj „akcja na turnie” |
| SC-20 (M7) semi-blef drawem | bet/czekanie z drawem na turnie | R+Z | próg częstości pasów rywala FE* = B·(1 − 2e) ÷ (P + B − e·(P + 2B)), e = szansa drawa na jednej karcie (przy e = 0 to alpha); uproszczenie: po sprawdzeniu bez dalszych zakładów, po czekaniu darmowa karta | częstość pasów rywala: dana zadania albo źródło — rozstrzyga sesja EV (N6, nie dubluję) | możliwa zmiana na „silna ręka wobec drawa” (`turn-bet`, już R) zmienia cel (ochrona zamiast semi-blefu): **produktowa**, przy wyniku EV | zależnie od EV: punkt semi-blefu z FE jako daną |
| SC-21 (M7) średnia ręka na turnie | czekanie/bet | Z | brak prostego: „gorsze ręce zapłacą?” na turnie zależy od dalszych ulic | jest: GW Principles of Turn Strategy (szczebel 2, DV SC-21) | niepotrzebna | rodzaj „akcja na turnie” (wspólny z SC-18) |
| SC-22 (M8) cienki value bet | bet/czekanie na riverze z pozycji | R | w = gorsze ÷ (gorsze + lepsze) wśród kombinacji sprawdzających po usunięciu kart; bet ⇔ w ≥ 0,5 + δ (R-M8-001) | dana zadania: zakres sprawdzenia; założenie „bez przebicia” i „lepsze nie pasują” (D-1302) | niepotrzebna (już rachunek, DV D-1050) | rodzaj `river-value` + publiczne liczenie kombinacji z usunięciem kart |
| SC-23 (M8) blef z blokerem | wybór jednej z dwóch rąk do blefu | R | SDV i kombinacje V/F po usunięciu kart; EV blefu = f·P − (1 − f)·B, f = F ÷ (V + F) (D-1303) | dana zadania: listy `calls`/`folds` (KO-072) | niepotrzebna | `pick-hand` jest, z widokiem (`wariant.ts:46`); opcjonalnie werdykt z EV z marginesem (więcej wariantów) |
| SC-24 (M8) bluff-catcher | sprawdzenie/pas | R | udział blefów wobec B ÷ (P + 2B) (R-M8-010) | dana zadania: `bluffShares` (D-1143, D-1217) | niepotrzebna | `river-catch` jest; brak widoku |
| SC-25 (M8) średnia ręka, river | czekanie/bet | R | jak SC-22, czekanie ⇔ w ≤ 0,5 − δ | jak SC-22 | niepotrzebna | `river-value` (wspólny z SC-22) |
| SC-26 (M9) niski SPR | sprawdzenie all-inu / pas z najwyższą parą | R+Z | SPR = stack ÷ pula; potrzebne equity = s ÷ (1 + 2s) (SPR 2 → 40 %) | „najwyższa para ma tyle wobec all-inu przy SPR < 3”: GW Stack-to-Pot Ratio (szczebel 2), SS (DV SC-26) | opcjonalnie poziom T: zakres all-inu jako dana → R (D-1304) | rodzaj „all-in po flopie przy SPR”; dla T: equity ręki wobec zakresu po flopie |
| SC-27 (M9) rozmiar geometryczny | 1/3 puli czy rozmiar geometryczny | R | f = ((1 + 2·SPR)^(1/3) − 1) ÷ 2 (R-M9-006, `geometricBetFraction` jest) | przesłanka „ręka na trzy ulice, chcesz wpłacić stack” jako dana zadania (R-M9-009) | niepotrzebna | rodzaj „wybór rozmiaru po flopie” (wspólny z SC-13) |
| SC-28 (M9) ile ulic wartości | dziś: plan na flopie (1/2/3 ulice) | R (po zmianie) / Z (dziś) | trzecia ulica = decyzja na riverze jak SC-22 | pytanie na flopie: R-M9-008 to uproszczenie bez progu (DV „bez decyzji”) | **produktowa P3:** „trzecia ulica: bet czy czekanie na riverze z overparą” zamiast planu na flopie | `river-value` (wspólny) |
| SC-29 (M10) rywal pasywny | bet/czekanie na riverze | R | jak SC-22 z szerokim zakresem sprawdzenia | dana zadania (KO-071) | przyjęta już (KO-071) | `river-value` (wspólny) |
| SC-30 (M10) nit 3-betuje | pas/sprawdzenie ręką z dołu zakresu | R+Z | equity klasy wobec górnych x% (macierz `equity169`) wobec ceny sprawdzenia 3-betu | VPIP nita = dana zadania; założenie „3-bet ⊆ górne x%” i pominięta realizacja: uproszczenia w bezpiecznym kierunku, tylko werdykt „pas” (D-1305) | przyjęta (KO-071); zawężenie do strony „pas” | eksport `equityVsRange` (`scenario-gen.ts:422`) + zakres „górne x%” + rodzaj punktu |
| SC-31 (M10) rywal agresywny | sprawdzenie bluff-catcherem | R | jak SC-24 z wyższym udziałem blefów | dana zadania (KO-071); część „pozwól mu betować silną ręką” wyłączona (brak populacji) | przyjęta (KO-071) | `river-catch` (wspólny) |

**Liczby:** R 8 (SC-22, 23, 24, 25, 27, 28, 29, 31), R+Z 4 (SC-13, 20, 26, 30), Z 9 (SC-07, 09, 10, 14, 15, 16, 17, 18, 21). Z czego bez przeczytanego źródła albo rozstrzygnięcia: SC-14 (źródło per tekstura), SC-13 w obecnym brzmieniu (D-795), SC-20 (EV). Silnik ma już rodzaj punktu dla 11 szablonów (SC-07, 09, 10, 14, 15, 17, 23, 24, 31, częściowo 20 i 30 przez macierz), ale 5 rodzajów nie ma widoku na ekranie (`defend`, `list-hand`, `river-catch`, `turn-bet`: `wariant.ts:58`; `iso-size`: `tools/content-build/src/scenariusze.ts:310`).

## 3. Decyzje produktowe (dla właściciela przez koordynatora)
**P1 — SC-13 (mokry flop).** (a) Pytanie o rozmiar silną ręką wobec drawów (R+Z, gotowe merytorycznie: cena jednej karty + kierunek GW) — kompromis: moduł uczy rozmiaru, a „rzadziej c-betuj” zostaje tylko w lekcji; (b) zostawić pytanie o częstość i czekać na źródło według tekstury (D-795) — pełny cel, termin nieznany; (c) zamienić SC-13 na inną sytuację M5 — M5 ma już SC-11, SC-12. **Rekomendacja: (a)**, bo rozmiar to połowa reguły R-M5-008, a rachunek ceny jest w aplikacji od M2.

**P2 — SC-14 (c-bet bez pozycji).** (a) Czekać na wynik sesji EV (źródło per tekstura, D-1218); (b) usunąć SC-14 z 1.0 — M5 ma wtedy 3 szablony (SC-11, 12, 13), próg BR-SZB-002 (≥ 2 na moduł) spełniony, łącznie 33 ≥ 30; (c) zamienić na pulę wieloosobową (R-M5-013) — nadal Z, rachunek tylko w uzasadnieniu. **Rekomendacja: (a) z terminem**: jeśli EV nie znajdzie źródła, to (b).

**P3 — SC-28 (ile ulic wartości).** (a) Decyzja na riverze o trzeciej ulicy wartości overparą (R, ten sam rodzaj co SC-22) — kompromis: ćwiczy skutek planu, nie sam plan na flopie; (b) zostawić pytanie „ile ulic” na flopie — brak progu w źródle (R-M9-008 to nazwane uproszczenie), więc ocena byłaby bez podstawy; (c) usunąć SC-28 — M9 ma wtedy SC-26, SC-27. **Rekomendacja: (a).**

Szablony SC-20 (semi-blef): opcje zależą od wyniku sesji EV; podaję je w tabeli, rozstrzygnięcie merytoryczne należy do EV.

## 4. Czego silnik jeszcze nie liczy (dla roli 08) [OCENA czasu agenta]
| Nr | Co | Dla | Szacunek |
|---|---|---|---|
| 08-EX-1 | publiczne liczenie kombinacji klas z usunięciem kart martwych i podział na lepsze/gorsze/remis wobec ręki gracza (dziś wewnątrz `pickHandAnalysis`, `scenario-gen.ts:977`) | SC-22, 25, 28, 29 | 0,2 sesji |
| 08-EX-2 | rodzaj `river-value` (bet/czekanie), wyrocznia w = gorsze ÷ (gorsze + lepsze) z marginesem δ, warunki D-1302 | SC-22, 25, 28, 29 | 0,5 |
| 08-EX-3 | equity ręki wobec zakresu po flopie/turnie (ważone kombinacjami, z usunięciem kart; dokładnie na turnie i riverze, Monte Carlo albo pełne wyliczenie na flopie); dziś `handEquity` liczy tylko ręka wobec ręki (`equity.ts:39`), a `equityVsRange` tylko preflop z macierzy (`scenario-gen.ts:422`, prywatna) | SC-26 T, SC-13 (kombinacje drawów) | 0,4 |
| 08-EX-4 | rodzaj „wybór rozmiaru po flopie” (dwa rozmiary, werdykt z ceny drawa albo z rozmiaru geometrycznego; `geometricBetFraction`, `spr` są w `math.ts`) | SC-13, SC-27 | 0,4 |
| 08-EX-5 | rodzaj „all-in po flopie przy SPR” (cena s ÷ (1 + 2s)) | SC-26 | 0,3 |
| 08-EX-6 | klasa karty turnu (nadkarta, parująca, niska, neutralna) + rodzaj „akcja na turnie” z klasą ręki | SC-18, SC-21 | 0,4 |
| 08-EX-7 | rodzaj „check-raise na flopie” (akcja + krotność; werdykt rozmiaru z R-M6-010) | SC-16 | 0,3 |
| 08-EX-8 | eksport `equityVsRange`, zakres „górne x%” według equity169, rodzaj sprawdzenia 3-betu z ceną (tylko werdykt „pas”, D-1305) | SC-30 | 0,3 |
| 08-EX-9 | (opcjonalnie) werdykt `pick-hand` z EV blefu z marginesem (D-1303) | SC-23 | 0,1 |
| — | widoki dla 5 rodzajów bez ekranu (`defend`, `list-hand`, `river-catch`, `turn-bet`, `iso-size` z limperami) i widok „zakres rywala jako dana” (lista rąk w sytuacji) — najpierw projekt roli 04 | wszystkie R | 04: 0,5; 08: 0,5–1 |

Razem 08: ok. 2,5–3 sesji bez widoków, 3–4 z widokami [OCENA].

## 5. Plan kroków D/E po tej klasyfikacji [OCENA]
| Fala | Szablony | Warunek startu | Kto | Sesje |
|---|---|---|---|---|
| 1 | treść R z gotowym silnikiem: SC-24, SC-31 (`river-catch`), SC-23 (`pick-hand`) | od razu (ekran po widokach) | 06 | 0,5 |
| 2 | treść Z ze źródłem i gotowym silnikiem: SC-07, 15, 17 (`defend`, N1), SC-09 (`iso-size`), SC-10 (`list-hand`) | od razu; SC-15/17 po 08-EL-2 | 06 | 0,5–1 |
| 3 | silnik dla R: 08-EX-1, 2, 4, 5, potem treść SC-22, 25, 28, 29, 27, 26 | 08-EX-1/2 → treść; P3 dla SC-28 | 08, potem 06 | 08: 1,5; 06: 0,5–1 |
| 4 | R+Z i Z bez silnika: SC-30 (08-EX-8), SC-16 (08-EX-7), SC-18, 21 (08-EX-6), SC-13 (P1, 08-EX-3/4) | fala 3 | 08, potem 06 | 08: 1–1,5; 06: 0,5–1 |
| 5 | SC-20, SC-14 | wynik EV; P2 | 06 (+08) | 0–0,5 |
| równolegle | 04: widoki rodzajów i „zakres jako dana”; 09: przekład po każdej fali; 06 audit (niezależna weryfikacja werdyktów) po falach 2 i 4 | — | 04, 09, 06 | 04: 0,5 |

Razem: 06 ok. 2,5–3,5 sesji, 08 ok. 3–4, 04 ok. 0,5, plus 09 [OCENA]. Równolegle od razu: fale 1 i 2 (06) obok 08-EX-1/2 (08) i projektu widoków (04). Czekanie: CI i E2E po każdej fali. Czas właściciela: P1–P3 (trzy wybory) i lista telefonu po widokach.

## 6. Analogia z Treningiem (D-191)
Trening nie ma reguł pokerowych ani rachunku zakresów (zapis sesji EH, `docs/decyzje/EH.md:2`, powtórzony w `docs/decyzje/EL.md:2`), więc klasyfikacja idzie z ADR-24; z Treningu analogiczny jest tylko podział stałych generatora na „potwierdzone / konwencja / uproszczenie” (`scenariusze-plan.md` §4) — tu odpowiada mu podział R / R+Z / Z i nazwane uproszczenia D-1302…D-1305.
