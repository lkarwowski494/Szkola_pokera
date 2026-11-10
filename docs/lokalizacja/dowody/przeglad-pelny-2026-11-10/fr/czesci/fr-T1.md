# fr-T1: francuski, słowniczek (terms-def, terms-nazwy) i spójność nazw terminów w korpusie

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/fr/terms-def.yaml | tak (162 definicje porównane po kluczu z `def` w content/terms.yaml) | 162 |
| content/fr/terms-nazwy.yaml | tak (151 nazw porównanych z `pl`/`en`/`abbr` w content/terms.yaml) | 153 |
| content/terms.yaml | tak w zakresie pól pl, en, en_alt, abbr, def wszystkich 162 kluczy (pola forms/skip/lesson/source pominięte: nie są przedmiotem przekładu) | 1351 |
| content/fr/lessons, rules.yaml, exams | nie — tylko zliczenie grep form w znacznikach `{{t:klucz\|forma}}` (zakres pkt 3 zlecenia) | — |

Zgodność kluczy: terms-def ma te same 162 klucze co terms.yaml, w tej samej kolejności. W terms-nazwy brak 11 kluczy: utg, oesd, spr, mdf, icm, hud, vpip, pfr, wtsd, tag, lag (wszystkie to skróty; nagłówek pliku mówi „null = skrót”, ale wpisów nie ma wcale, zamiast `null` — do potwierdzenia, że strażnik `nazwy.ts` tak to rozumie).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | content/fr/terms-def.yaml:97 | Une mise isolée pour la value | Une seule mise pour la value | value-bet: pl „Pojedynczy zakład”; „isolée” = odizolowany, myli się z terminem isolation | średnia | tak |
| 2 | ŚR | content/fr/terms-def.yaml:110 | soit à l'équilibre | ne soit ni gagnant ni perdant | alpha: pl „wyszedł na zero”; „équilibre” w kursie to strategia równowagi (mixed-hand, nash-equilibrium) — dwuznaczność | średnia | tak |
| 3 | NISKIE | content/fr/terms-def.yaml:20 | gagner contre chaque adversaire qu'au maximum ce que | gagner de chaque adversaire, au maximum, que ce que | all-in: pl „Od każdego rywala … najwyżej tyle”; składnia niezręczna | średnia | tak |
| 4 | NISKIE | content/fr/terms-def.yaml:123 | on part soit all-in, soit on se couche | soit on part all-in, soit on se couche | push-fold: błędna symetria „soit…, soit…” | wysoka | tak |
| 5 | NISKIE | content/fr/terms-def.yaml:154 | n'entre dans le pot presque qu'avec | n'entre dans le pot pratiquement qu'avec | nit: niezręczny zbitek „presque qu'” | wysoka | tak |
| 6 | ŚR | content/fr/terms-nazwy.yaml:74 i :82 (+ terms-def.yaml:82) | wet: "wet" / wetness: "humidité" | jedna rodzina nazw (wet + „degré de wet/coordination” albo humide + humidité) | Para termin–stopień ma dwie różne podstawy; definicja wetness mówi „de sec à wet”, a korpus taguje wetness jako „humidité” (4×) i wet jako „wet” (19× + 6 bez formy) | wysoka | nie (wybór terminu) |
| 7 | ŚR | content/fr/terms-nazwy.yaml:18 (call) | nazwa „call”; w korpusie 3 nazwy | jedna nazwa czynności (suivre) + ewentualnie rzeczownik „call” | Korpus (832 znaczniki): rodzina „suivre” 635, „call/calls” 120, rodzina „payer” 48 (payer 16, payé 14, payez 6, je paie 4, payant 3, paie 2, payée 1, en payant 1, paiement 1), bez formy 29. „payer” konkuruje z „suivre” jako trzeci wariant; „paiement” (m6-l1:56) koliduje z nazwą payout = „paiement” | wysoka | nie |
| 8 | ŚR | content/fr/terms-nazwy.yaml:20 (fold) | nazwa „fold”; w korpusie 3 nazwy | „se coucher” + jeden rzeczownik (fold albo abandon) | Korpus (686): rodzina „(se) coucher” 633, „fold/folds” 24, „abandon/abandons” 18, bez formy 11. Rzeczownik ma dwa konkurujące warianty (folds 22 vs abandons 11 + abandon 7) | wysoka | nie |
| 9 | ŚR | content/fr/terms-nazwy.yaml:31, :30 (big-blind, small-blind) | „big blind” ×5, „small blind” ×1 obok „grosse blinde” / „petite blinde” | grosse blinde / petite blinde | big-blind (269): grosse(s) blinde(s) 208, BB 6, big blind 5, bez formy 50; small-blind (115): petite blinde 103, SB 5, small blind 1, bez formy 6. Wszystkie angielskie formy w jednej lekcji: m4-l4-limperzy.md:13, 23, 33, 43, 54, 61 | wysoka | nie (poza zakresem plików zlecenia; 6 miejsc do poprawki przez recenzenta m4-l4) |
| 10 | ŚR | content/fr/terms-nazwy.yaml:96 (value) | nazwa „value”; w korpusie „valeur” i „value” | jedna nazwa | Poza top 15, ale wyraźne (105): „valeur” 62 (pour la valeur 32, streets de valeur 22, valeur 7, de valeur 1) vs „value” 43 (de value 16, pour la value 15, value 4, streets de value 4, en value 4); definicje terms-def używają wyłącznie „value” | wysoka | nie |
| 11 | ŚR | content/fr/terms-nazwy.yaml (inne, poza top 15) | różne | jedna nazwa na termin | board: board 64 / tableau 12 (bez formy 23); out-of-position: hors de position 37 / hors position 28 (bez formy 16); two-pair: double(s) paire(s) 49 / deux paires 12; standard-deviation: écart-type 26 / écart type 18; monotone: monochrome 6 / monocolore 5 / monotones 1 (nazwa: monocolore; bez formy 4); shove: faire tapis 15 / push- 9 (nazwa: push); combo: combinaisons 26 / combos 3 (nazwa: combo); payout: paiement(s) 6 / gains 3 (nazwa: paiement) | wysoka | nie |
| 12 | NISKIE | content/fr/terms-def.yaml:125, :138, :140, :141 | structure des gains / Le prix attribué / Différence de gains | — | Nazwa payout w terms-nazwy to „paiement”, a definicje (icm, tournament-equity, payout, pay-jump) używają „gains” i „prix”; słowo „paiement” nie pada w żadnej definicji | średnia | nie |

Top 15 terminów wg liczby znaczników w content/fr (lessons, rules.yaml, exams; `grep -rohE '\{\{t:klucz(\|[^}]*)?\}\}'`, formy sprowadzone do małych liter): pot 881, call 832, fold 686, bluff 476, bet 408, pair 303, raise 298, check 279, big-blind 269, open 261, range 242, draw 196, spr 188, straight 143, small-blind 115 (ex aequo flush 115). Bez konkurujących nazw: pot (pot/pots), bluff (bluff-), bet (mise/miser; „placer” 1× to czasownik posiłkowy przy „mise”), pair (paire/paires), raise (relance-), check (check-), open (ouverture/ouvrir/ouvreur), range, draw (tirage/tirages), spr, straight (quinte/quintes), flush (couleur/couleurs). Konkurencja nazw: call, fold, big-blind, small-blind (znaleziska 7–9).

## Do sprawdzenia przez człowieka znającego język

- terms-def.yaml:68–69 (3-bet, 4-bet): „La première relance d'une ouverture”, „Relance d'un 3-bet” — czy rodzimy czytelnik nie odczyta „relance d'une ouverture” jako „przebicie będące otwarciem”; ewentualnie „relance par-dessus une ouverture / un 3-bet”.
- terms-nazwy.yaml:36 „preflop” (tak też w definicjach): we francuskich serwisach częsta pisownia „préflop”; do decyzji, czy zostaje forma angielska.
- terms-nazwy.yaml:74 „wet”: w mowie francuskich graczy funkcjonuje też „board humide”; nazwa „wet” jest poprawna, ale w parze z „humidité” (znalezisko 6) wymaga jednej decyzji.
- terms-nazwy.yaml:137 „paiement” (payout): we francuskim pokerze turniejowym częściej „gains” / „paliers de gains” / „structure des prix”; „paiement” brzmi jak kalka.
- terms-nazwy.yaml:100 „bloqueur”: używane, ale równie częste jest „blocker”; korpus spójny (bloqueur 22×), więc bez zmiany.
- terms-def.yaml:60 (combo) i :1, :12, :49: „combinaison” oznacza raz układ (royal-flush, kicker, draw), raz kombinację kart (combo) — w pl są to dwa różne słowa (układ / ułożenie).

## Uwagi do źródła pl

- Brak. (oesd: pl „uzupełnia karta z obu końców” jest mniej ścisłe niż fr „à l'un ou l'autre bout”; przekład jest tu trafniejszy.)

## Ocena ogólna

Definicje w terms-def.yaml są wierne źródłu: wszystkie liczby, przykłady rąk i boardów, kierunki i przeczenia zgadzają się w 162 definicjach; nie ma znalezisk KRYT ani WYS, a pięć poprawek dotyczy sformułowań. Nazwy w terms-nazwy.yaml to poprawne, używane we francuskim pokerze odpowiedniki i definicje konsekwentnie z nich korzystają (wyjątki: para wet/humidité i payout). Główna słabość leży w korpusie: dla call i fold konkurują po trzy nazwy, a dla value, board, hors (de) position, écart(-)type i monotone po dwie–trzy, co wymaga decyzji terminologicznych, nie pojedynczych poprawek.
