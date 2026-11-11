# Szkice kroku E (SC-16…SC-31) — sesja DY (rola 06, 2026-11-11)
Status: **szkic dla roli 08** (DX), poza `content:build`. Po scaleniu rodzajów punktów 06 przenosi je do `content/{pl,en}/scenarios/`, dopisuje test treści wg KO-070 i uruchamia `pnpm content:build`. Źródła warunków: `docs/tresci/zrodla-krok-e.md` §2 (DV). Decyzje: `docs/decyzje/DY.md`. Osobny podkatalog: testy treści walidują obecnym schematem każdy `*.yaml` katalogu `szablony-robocze/`, a te szkice używają proponowanych rodzajów punktów; podkatalog nie koliduje też ze zmianą DU (D-1085).

Zasady wspólne (jak w `README.md`): jedna oczekiwana akcja na punkt we wszystkich poziomach (D-630); pierwsze zdanie każdej akcji ma `{{w:reka}}`, `{{w:pozycja}}`, `{{w:stol}}`; liczby tylko `{{n:…}}`; „bo” z pola `because` reguły; reguła częstotliwości daje najwyżej `inaccuracy`, `mistake` tylko rachunek poza marginesem albo SC-26 (D-1052); margines δ ≥ 2 pp (D-1051); zakres rywala na riverze jest daną zadania, nie twierdzeniem o graczach (D-1050).

## 1. Szkice
| Szkic | Poziomy | Oczekiwane | Reguła / rachunek | Rodzaj punktu (08) | Nowe pola i podstawienia |
|---|---|---|---|---|---|
| sc-16 | Ś T | raise; rozmiar `raise` | R-M6-008, R-M6-010 | N2 + N8 (`defend-cbet`, `raise-size`) | `drawOutsMin`, holding `set`, `two-pair-both`, flop `straightPossible` |
| sc-17 | Ł Ś | fold | R-M6-007 | N2 (`defend-cbet`) | `boardHas` |
| sc-18 | Ś T | bet-big | R-M7-001, R-M7-005 | N9 (`turn-barrel`) | `turnClass`, holding `pair-on-turn`, `sizes` |
| sc-20 | Ś | bet-big | R-M7-002 | N6 (`turn-barrel`) | `drawOutsMin`, `holdingPair` |
| sc-21 | Ł Ś | check | R-M7-003 | N9 | holding `pair-second`, `pair-low`, `drawOutsMax` |
| sc-22 | Ś T | bet | rachunek `value.threshold` (R-M8-001) | N7b (`river-value`) | `callRanges`, `betFraction`, `{{w:zakres}}` |
| sc-23 | Ś T | pick-best | R-M8-007 | KO-072 (`pick-hand`) | `vGapMin/Max`, `{{w:zakres}}`, `{{w:zakres-call}}`, `{{w:reka-dobra}}`, `{{w:reka-zla}}` |
| sc-24 | Ł Ś T | call | R-M8-010 | N7a (`river-catch`) | `betComposition`, `{{w:value}}`, `{{w:blefy}}` |
| sc-25 | Ł Ś | check | R-M8-002 (+ rachunek R-M8-001 w wyroczni) | N7b | jw. SC-22 |
| sc-26 | Ł Ś T | call | R-M9-003 | N10 (`spr-call`) | `spr {min,max}`, holding `overpair`, `top-pair-*`, `{{w:stack}}` |
| sc-27 | Ś T | bet-geo | R-M9-009 | N11 (`flop-size`) | holding `set`, `straight`, `top-two-pair` |
| sc-28 | Ł Ś | bet | R-M9-008 (+ rachunek R-M8-001) | N7b | `calcCheck` |
| sc-29 | Ł Ś | bet | rachunek `value.threshold` (KO-071) | N7b | jw. SC-22 |
| sc-30 | Ł Ś | fold | rachunek `eq.call-3bet` (do dodania, D-1083) | N12 (`vs-3bet-equity`) | `topPercent`, `hands`, `threeBetBb`, `{{w:procent}}` |
| sc-31 | Ł Ś | call | R-M8-010 (KO-071) | N7a | jw. SC-24 |

Nazwy rodzajów punktów, pól i klas rąk są propozycją; ostateczny kształt ustala 08 w schemacie, a 06 dopasowuje szkic przy przenoszeniu. Wersje en powstają przy przenoszeniu (jak DU).

## 2. Rodzaje punktów dla 08: zachowanie i test akceptacji
| ID | Zachowanie | Test akceptacji (BR-GEN-003, 10 000 losowań, wyrocznia niezależna od generatora) |
|---|---|---|
| N7a | river, rywal stawia `betFraction` puli; gracz call / fold; skład zakładów (`betComposition`) to klasy rąk względem stołu; b = blefy ÷ (blefy + value) po usunięciu kombinacji zablokowanych kartami gracza i stołu; potrzebne = bet ÷ (pula + 2·bet); call ⇔ b ≥ potrzebne + δ, fold ⇔ b ≤ potrzebne − δ; zła strona `mistake`; ręka gracza przegrywa z każdą ręką value i wygrywa z każdym blefem | kombinacje i requiredEquity liczone w teście; 100% wariantów z |b − potrzebne| ≥ δ i expected zgodnym z rachunkiem |
| N7b | river IP, rywal czeka; gracz bet / check; zakres sprawdzenia (`callRanges`) jako klasy rąk; w = gorsze ÷ (gorsze + lepsze), remisy pominięte; bet ⇔ w ≥ `value.threshold` + δ, check ⇔ w ≤ `value.threshold` − δ; zła strona `mistake` | jw.; evaluator rąk z poker-core dopuszczalny jako wyrocznia porównania rąk (nie generator) |
| N8 | w punkcie obrony wobec c-betu (N2) akcja `raise` (check-raise); drugi punkt `raise-size`: m = przebicie ÷ c-bet, m ≥ `xr.mult.low` zgodne, m < `xr.mult.low` niedokładność, górnej granicy brak (DV SC-16c) | Ś: outs ≥ 8 bez pary z kartą gracza; T: set albo dwie pary z obu kart, flop nie monotoniczny i bez możliwego strita; expected raise w 100% |
| N9 | otwierający IP na turnie po c-becie flopu i sprawdzeniu, rywal czeka; klasa turnu z rang (`nadkarta-ak`: ranga ∈ {A, K} i > max(flop); `niska`: < min(flop); `parujaca`: ranga na flopie; `neutralna`: reszta); filtr ręki (`pairKind`, outs); akcje check / bet-small / bet-big z `sizes` | klasa turnu i pairKind liczone w teście; 100% zgodności expected z warunkiem szkicu |
| N10 | flop, rywal all-in; gracz call / fold; rozmiar 3-betu dobrany tak, by SPR = stack za pulą ÷ pula ∈ [min, max]; filtr ręki: najwyższa para (kicker z poziomu), overpara albo lepsza | SPR liczony w teście; 100% w przedziale i expected call |
| N11 | flop w puli 3-betowanej IP (linia stała, SPR = `spr.3bet-ip`); akcje `bet-geo` (rozmiar `geo.3bet-ip.3`) / `bet-small` (`cbet.size.small`); filtr ręki: set, strit, dwie najwyższe pary | formuła geometric(spr, 3) w teście równa liczbie z bazy treści; 100% expected bet-geo |
| N12 | preflop, gracz otworzył, rywal 3-betuje do `threeBetBb`; equity ręki gracza wobec górnych x% rąk (`topPercent`) wobec ceny dopłata ÷ (pula po sprawdzeniu); fold ⇔ equity ≤ cena − δ; tylko ręce z listy `hands` | equity w teście z pełnego wyliczenia albo Monte Carlo z błędem < δ/4; 100% expected fold |
| KO-072 | dwie ręce gracza do wyboru na riverze; SDV obu = 0; V, F jak w `sc-23.yaml`; poprawna ręka z mniejszym V i nie mniejszym F; brak dominacji → odrzucenie | V, F liczone w teście; 100% zgodności |

## 3. Reguła do dodania przy przenoszeniu (projekt, D-1081)
SC-18b (turn niski albo parujący → otwierający częściej czeka ręką bez pary i bez mocnego drawa) nie ma reguły w `rules.yaml`. Projekt **R-M7-013** (heuristic), tylko z przeczytanych źródeł DV (`zrodla-krok-e.md` §2 SC-18b, odczyt 2026-11-11):
- if: „c-betowałeś flop z pozycji, rywal sprawdził, a turn jest niski (niższy od każdej karty flopu) albo paruje stół”;
- then: „częściej czekasz; drugi blef stawiasz rzadziej i raczej rękami z outami”;
- because: „taka karta zwykle nie pomaga twojemu zakresowi otwarcia tak jak as albo król” (GW the-worst-turn-card:77 „Low cards, like the 5, are not so good for the PFR.”; :79 „Board-pairing cards are pretty bad. … reduce our barreling frequency accordingly.”; PC double-barrel:112 „the barrel mostly dies, and the few bluffs you do fire should carry real equity”).
Dodanie wymaga wpisu w rejestrze, przekładu na wszystkie języki reguł i brzmienia od 04; robi to sesja, która przenosi SC-18b do treści (jeśli 03 doda go do 1.0).

## 4. Otwarte pytania
- **OP-DY-1 [DO USTALENIA]** (SC-30): źródło, że ręce zdominowane wobec 3-betu realizują mniej niż swoje equity. Tekst tego nie twierdzi; oczekiwany pas wynika z rachunku z nazwanym uproszczeniem („jakby wszystkie karty miały zaraz wyjść”). Bez źródła wariant zostaje tylko z marginesem δ ≥ 2 pp po stronie pasa.
- **OP-DY-2** (08): klasy rąk w `callRanges` / `betComposition` (`top-pair`, `missed-flush-draw`, …) — słownik klas i ich definicje z rang ustala 08 razem z N7; 06 dopasuje szkice.
- **OP-DY-3** (03): SC-18b i SC-23a jako osobne szablony albo poza 1.0 (próg BR-SZB-002 spełniają szkice bez nich: M7 ma SC-18, 19, 20, 21; M8 SC-22–25).
