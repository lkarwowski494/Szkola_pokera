# de-T1: niemiecki (de), terminy — definicje (terms-def.yaml), nazwy (terms-nazwy.yaml), spójność form w znacznikach

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/de/terms-def.yaml | tak (wszystkie 162 definicje względem `def` w content/terms.yaml, po kluczu) | 162 |
| content/de/terms-nazwy.yaml | tak (162 nazwy względem `pl`/`en` w content/terms.yaml) | 164 |
| content/terms.yaml (źródło) | tak | 1351 |
| content/de/lessons, rules.yaml, exams | nie — zgodnie ze zleceniem tylko zliczenie form w znacznikach `{{t:klucz\|forma}}` (skrypt), bez czytania treści | — |

Zestaw kluczy: terms.yaml, terms-def.yaml i terms-nazwy.yaml mają te same 162 klucze (sprawdzone skryptem). Liczby i przykłady rąk we wszystkich definicjach zgodne ze źródłem (A♠ K♠ Q♠ J♠ T♠, 5♥ 6♥ 7♥ 8♥ 9♥, K-K-8-8-3, 7♣ 7♦ na K-7-2, 5-6-7-8 / 4 lub 9, 5-6-8-9 / 7, K♠ 7♦ 2♣, J♥ T♥ 8♣, 8-8-3, 9-8-7, T-8-3, K♠ Q♦, 7♠ 6♠, Q-Q na J-7-2, K♥ 9♥ 4♥ 2♣, 100 BB, bb/100).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | content/de/terms-def.yaml:60 | Das Zählen solcher Combos zeigt, wie viele einer bestimmten Hand wirklich in einer Range sind. | Das Zählen solcher Kombinationen zeigt, wie viele Kombinationen einer bestimmten Hand wirklich in einer Range sind. | definicja terminu combo używa „Combos”, przyjęta nazwa to „Kombination”; „wie viele einer bestimmten Hand” niegramatyczne | wysoka | tak |
| 2 | ŚR | content/de/terms-def.yaml:144 | bei der kein Spieler gewinnt, wenn nur er allein seine Strategie ändert | bei der sich kein Spieler verbessern kann, indem nur er allein seine Strategie ändert | pl „nie zyska”; „gewinnt” = też „wygrywa” (dwuznaczne: „żaden gracz nie wygrywa”) | średnia | tak |
| 3 | ŚR | content/de/terms-nazwy.yaml:62 + terms-def.yaml:11, 12, 49 | combo: "Kombination"; w definicjach „bessere Kombination”, „außerhalb der Kombination”, „starke Kombination” (= pl „układ”) | jedna nazwa na jedno pojęcie: combo = „Combo” (zwykła nazwa w niemieckim pokerze) albo w definicjach high-card/kicker/draw inne słowo na układ (np. „Hand”) | „Kombination” oznacza w de dwa pojęcia: combo (kombinacja dwóch kart) i układ pięciu kart; pl rozróżnia „kombinacja” / „układ”. W korpusie: Kombinationen×23, Kombos×3, Combos×3 | średnia | nie (wybór terminu w korpusie) |
| 4 | ŚR | content/de/terms-nazwy.yaml:53 | straight-draw: "Straight-Draw" | nazwa zgodna z użyciem albo ujednolicenie lekcji | przyjęta nazwa „Straight-Draw” nie występuje w lekcjach/rules/exams ani razu jako forma: Straßen-Draw×5, Straight Draw×3, bez formy×2; definicje (terms-def 51–54, 80, 81) używają „Straight-Draw”, a strit to „Straße” | wysoka | nie |
| 5 | ŚR | content/de/terms-nazwy.yaml:78 | two-tone: "Two-Tone" | — | przyjęta nazwa nie występuje w formach korpusu: zweifarbig(e/en/er)×4, „Two-Tone”×0; analogicznie monotone: monoton(en/er)×12 obok einfarbig(en/er)×4 | wysoka | nie |
| 6 | ŚR | content/de/terms-nazwy.yaml:24, 29 | side-pot: "Side Pot"; hole-cards: "Hole Cards" | — | korpus używa innych nazw niż przyjęte: Nebenpot×2 (Side Pot×0); Handkarten×2, Hole Cards×1. Definicje używają „Side Pot”, „Hole Cards” | wysoka | nie |
| 7 | ŚR | content/de/terms-nazwy.yaml:43 | out-of-position: "out of Position" | — | konkurują dwie nazwy: ohne Position×19 + Ohne Position×17 = 36, out of Position×11 + Out of Position×7 = 18, bez formy×27 (wtedy renderuje się „out of Position”) | wysoka | nie |
| 8 | ŚR | content/de/terms-nazwy.yaml:11 | two-pair: "zwei Paare" | — | konkurują: zwei Paare×21 + Zwei Paare×9 + zwei Paaren×1 = 31, Two Pair×22 + Two Pairs×2 = 24, bez formy×7; second-pair: Second Pair×5, zweites Paar×3 + Zweites Paar×1 | wysoka | nie |
| 9 | NISKIE | content/de/terms-def.yaml:16 | wie der Bet oder Raise des Gegners beträgt | wie die Bet oder der Raise des Gegners beträgt | rodzaj „Bet”: wszędzie indziej żeński (terms-nazwy „r. f”, „einer 3-Bet”, „einer C-Bet”) | wysoka | tak |
| 10 | NISKIE | content/de/terms-def.yaml:104 | vom Spieler out of position, nachdem | vom Spieler out of Position, nachdem | pisownia nazwy terminu wg terms-nazwy („out of Position”) | wysoka | tak |
| 11 | NISKIE | content/de/terms-def.yaml:48 + terms-nazwy.yaml:50 | outs: "Outs" / „Eine Karte, die noch im Deck ist …” | nazwa i definicja w tej samej liczbie (np. „Karten, die noch im Deck sind und deine Hand verbessern …”) | nazwa w liczbie mnogiej, definicja w pojedynczej (w pl nazwa „out” jest pojedyncza); w ćwiczeniu słownictwa „Outs = eine Karte” | średnia | nie |

### Spójność form w znacznikach (15 najczęstszych terminów; lekcje + rules.yaml + exams; „bez formy” = `{{t:klucz}}`)

Miejsce 15 jest remisowe (small-blind i flush po 115), więc policzono 16 terminów.

| nr | waga | termin (wystąpień) | formy | ocena |
|---|---|---|---|---|
| S1 | ŚR | bet (411) | setzt×102, Bet×91, Einsatz×47, Bets×47, bez formy×46, Einsätze×24, gesetzt×24, setzen×14, Einsätzen×6, bettet×5, bettest×2, Setzen×1, betten×1, Einsatzes×1 | konkurują rzeczowniki Bet/Bets (138 + 46 bez formy) i Einsatz/Einsätze/… (78) oraz czasowniki setzen (141) i betten (8). Para Bet/Einsatz jest nazwana w definicji („Bet bzw. Einsatz”), ale w tekście to dwie nazwy jednego pojęcia; „betten” do ujednolicenia z „setzen” |
| S2 | ŚR | raise (300) | raist×85, Raise×64, raisen×31, geraist×31, bez formy×18, raise×17, Raisen×15, erhöht×11, erhöhen×7, erhöhst×6, Erhöhen×5, Ich erhöhe×3, Erhöhung×3, Raises×2, erhöht hat×1, erhöhe×1 | raisen/Raise (245 + 18) konkuruje z erhöhen/Erhöhung (37); definicja dopuszcza „Erhöhung” jako synonim |
| S3 | ŚR | open (261) | eröffnet×109, Eröffnung×54, eröffnest×28, Open×28, Opens×7, Eröffner×7, bez formy×6, Eröffnungen×5, Eröffnen×4, geöffnet×3, eröffne×2, eröffnen×2, Eröffnende×2, Eröffners×2, opent×1, Öffnen×1 | przyjęta nazwa „Open” (35 + 6) jest mniejszością wobec Eröffnung/eröffnen (215); definicje używają „Open”. Dodatkowo „geöffnet”×3 i „Öffnen”×1 to inny czasownik (öffnen ≠ eröffnen), „opent”×1 — trzeci wariant |
| S4 | ŚR | straight (142) | Straße×93, Straight×27, Straßen×11, bez formy×7, Straights×4 | Straße (104 + 7) konkuruje ze Straight (31) |
| S5 | NISKIE | call (832) | Call×184, gecallt×105, callt×104, callst×96, bez formy×95, callen×81, Callen×71, calle×39, Calls×38, Mitgehen×5, Ich calle×2, Callt×2, Callst×2, mitgehen×2, Caller×2, Calling×1, gehe mit×1, Callens×1, Calle×1 | praktycznie spójne; „Mitgehen/mitgehen/gehe mit”×8 jako druga nazwa (definicja check objaśnia Call jako „Mitgehen”), „Calling”×1 |
| — | — | pot (881) | Pot×519, bez formy×217, Pots×145 | spójne |
| — | — | fold (681) | folden×139, foldet×136, foldest×88, gefoldet×76, Fold×70, Folds×55, folde×47, Folden×34, bez formy×31, Ich folde×4, Foldet×1 | spójne |
| — | — | bluff (476) | Bluffs×236, Bluff×88, bez formy×65, blufft×46, bluffst×31, bluffen×8, Blufft×1, Bluffen×1 | spójne |
| — | — | pair (304) | Paar×194, Paare×77, bez formy×17, Paaren×14, Pair×1, Paars×1 | spójne („Pair”×1 odosobnione) |
| — | — | check (279) | checkst×52, checkt×48, checke×45, checken×42, Check×38, bez formy×22, gecheckt×16, Checken×11, Ich checke×5 | spójne |
| — | — | big-blind (270) | Big Blind×155, bez formy×97, Big Blinds×12, BB×6 | spójne |
| — | — | range (242) | Range×160, bez formy×63, Ranges×19 | spójne |
| — | — | draw (196) | Draws×102, Draw×51, bez formy×43 | spójne |
| — | — | spr (188) | bez formy×140, SPR×48 | spójne |
| — | — | small-blind (115) | Small Blind×85, bez formy×18, Small Blinds×7, SB×5 | spójne |
| — | — | flush (115) | Flush×87, bez formy×25, Flushes×2, Flushs×1 | jedna nazwa; liczba mnoga w dwóch pisowniach (Flushes×2, Flushs×1) — NISKIE |

Poza pierwszą piętnastką (przy okazji, patrz znaleziska 3–8): out-of-position (81), two-pair (62), flush-draw (56: Flush-Draw×25 + Flush-Draws×6 wobec Flush Draw×12 + Flush Draws×3 — pisownia z łącznikiem i bez), combo (29), monotone (16), straight-draw (10), second-pair (9), two-tone (4), hole-cards (3), side-pot (2).

## Do sprawdzenia przez człowieka znającego język

- wetness: „Nässe” (terms-nazwy:84) — kalka; czy w niemieckim pokerze nie mówi się raczej opisowo („wie nass das Board ist”) albo „Wetness”. Źródło pl też ma neologizm („mokrość”), więc bez poprawki.
- out-of-position: hybryda „out of Position” (wielka litera w angielskiej frazie) — przyjęta w terms-nazwy; w użyciu spotyka się „out of position”/„OOP” i „ohne Position”. Wybór należy do właściciela terminologii (znalezisko 7).
- two-tone / rainbow jako przymiotniki z wielkiej litery („Two-Tone”, „Rainbow”) obok „monoton”, „suited”, „offsuit” z małej — niejednolita konwencja pisowni przymiotników obcych.
- rake: rodzaj (der/das Rake) — definicje go nie ujawniają („an Rake”), komentarz w terms-nazwy podaje m.
- nit: komentarz w terms-nazwy podaje r. m, cytowane źródło „Eine Nit” (f); definicja neutralna.

## Uwagi do źródła pl

- oesd: pl „który uzupełnia karta z obu końców” jest nieścisłe (jedna karta z jednego z dwóch końców); de oddaje to poprawnie („an einem der beiden Enden”) — zgodnie z sensem i z definicją straight-draw w pl („z jednego z dwóch końców”).
- blocker: przykład „z asem kier rywal nie może mieć koloru z asem kier” jest tautologiczny w pl; de przełożone wiernie.

## Ocena ogólna

Definicje de są wierne źródłu: nie znaleziono żadnej zmiany liczby, ręki, przykładu ani kierunku; adaptacje zdań o polskim uzusie („W polskich tekstach…”) są sensowne. Nazwy w terms-nazwy.yaml są poprawnymi, używanymi w niemieckim pokerze odpowiednikami; słabym punktem jest „Kombination” (dwa pojęcia pod jedną nazwą) i kilka nazw przyjętych, których korpus nie używa (Straight-Draw, Two-Tone, Side Pot, Hole Cards). Główny problem to spójność korpusu: dla bet, raise, open i straight konkurują nazwa angielska i niemiecka (Bet/Einsatz, raisen/erhöhen, Open/Eröffnung, Straight/Straße).
