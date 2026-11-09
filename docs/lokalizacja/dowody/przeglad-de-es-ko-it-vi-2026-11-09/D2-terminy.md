# D2-terminy: terminologia de i nazwy K-05 (przegląd D2, 2026-11-09)

Zakres: (1) kluczowe terminy sprawdzone na przeczytanych źródłach niemieckich (64 cytaty, 55 kluczy); (2) nazwa K-05 dla każdego ze 162 wierszy `k05-kand-de.tsv` (plik `docs/lokalizacja/przygotowane/terms-nazwy-de.yaml`); (3) konflikty rodzaju i liczby przy znacznikach `{{t:klucz}}` bez formy (1 463 wystąpienia w `tl/content/de`, 66 kluczy; w `tl/…/de.json` 0 — tłumacz dał formę wszędzie).

Wszystkie cytaty niżej sprawdzone dosłownie na surowym tekście (curl → tekst → `grep -F`, skrypt: 64 sprawdzone, 0 braków), data odczytu 2026-11-09. Kopie robocze: `SP/pr/D2/web/` (113 stron), lista cytatów `SP/pr/D2/cytaty.tsv`; każda nazwa z `źr.` w YAML-u sprawdzona skryptem `SP/pr/D2/gen.py` (0 braków).

## Źródła

- [A] https://de.wikipedia.org/wiki/Hand_(Poker) (de.wikipedia, „Hand (Poker)”: ranking układów)
- [B] https://de.wikipedia.org/wiki/Texas_Hold%E2%80%99em (de.wikipedia, „Texas Hold’em”)
- [C] https://de.wikipedia.org/wiki/Poker (de.wikipedia, „Poker”)
- [D] https://de.wikipedia.org/wiki/Liste_von_Pokerbegriffen (de.wikipedia, lista pojęć pokerowych)
- [E] https://www.pokerstrategy.com/de/glossary/ + hasła `…/de/glossary/<hasło>/` (glosariusz PokerStrategy po niemiecku; w YAML-u `E:<hasło>`, np. `E:Bet` = https://www.pokerstrategy.com/de/glossary/Bet/)

Nie dało się otworzyć: https://de.pokernews.com/poker-glossar/ i https://de.pokernews.com/pokerregeln/texas-holdem.htm (404). `de.pokerstrategy.com/glossary/` przekierowuje na [E]. Hasło `E:Position` (404) — pozycja potwierdzona przez `E:In-Position`/`E:Out-of-Position`.

## Tabela: terminy kluczowe

| klucz | nazwa K-05 (rodzaj) | formy tłumacza | źródło i cytat (2026-11-09) | ocena |
|---|---|---|---|---|
| pot | Pot (m) | Pot×530, Pots×146 | [E] Pot: „Der Pot ist der Gesamteinsatz aller Spieler in einer Hand.” | potwierdzone |
| bet | Bet (f) | setzt×105, Bet×102, Einsatz×47 | [E] Bet: „Eine Bet ist eine der möglichen Aktionen, die ein Spieler ausführen kann, wenn er nicht mit einem gegnerischen Gebot konfrontiert wird.” | potwierdzone; rodzaj żeński (tłumacz miesza der/die, niżej) |
| call | Call (m) | Call×203, gecallt×106, callt×105 | [E] Call: „Ein Call bedeutet, den aktuellen Einsatz mitzugehen, indem man denselben Betrag an Chips in den Pot legt.” | potwierdzone (rzeczownik „Call”, czasownik „callen”) |
| check | Check (m) | checkst×52, checkt×50, Check×40 | [E] Check: „Du kannst nicht checken, wenn du mit einer Bet oder einem Raise konfrontiert bist, sondern nur, wenn es in der laufenden Setzrunde bisher keine Bet gab.” | potwierdzone |
| raise | Raise (m) | raist×89, Raise×79, erhöht×11 | [E] Raise: „Ein Raise ist eine Aktion, die Spieler in jeder Setzrunde machen können” | potwierdzone; [E] używa też „Ein Raise, das” (n), tłumacz „der/einen Raise” (m) — bez konfliktu przy nazwie |
| fold | Fold (m) | foldet×141, folden×139, Fold×78 | [E] Fold: „Zu folden bedeutet, freiwillig aus einer laufenden Hand auszusteigen” | potwierdzone |
| board | Board (n) | Board×83 | [E] Board: „In Spielen mit Gemeinschaftskarten bezeichnet das Board die Gesamtheit aller Gemeinschaftskarten.” | potwierdzone |
| community-cards | Gemeinschaftskarten (lm) | Gemeinschaftskarten×11 | [E] Gemeinschaftskarten: „Gemeinschaftskarten sind offen geteilte Karten, die jeder Spieler für die Bildung seines Pokerblatts verwenden darf.” | potwierdzone |
| hole-cards | Hole Cards (lm) | Handkarten×2, Hole Cards×1 | [E] Hole-Cards: „Hole Cards sind die verdeckten Karten, die jeder Spieler zu Beginn einer Hand erhält.” | potwierdzone; definicje i UI mają „Hole Cards” |
| small-blind / big-blind | Small Blind / Big Blind (m) | Big Blind×165, Small Blind×99 | [E] „Der Small Blind ist der kleinere der beiden Zwangseinsätze in einem Pokerspiel mit Blinds.”; „Der Big Blind ist der größere der beiden Zwangeinsätze in einem Pokerspiel mit Blinds.” | potwierdzone |
| chips | Chips (lm) | Chips×87 | [B] „In sogenannten Cash Games entsprechen die Chips aber direkt einem festgesetzten Gegenwert in echtem Geld” | potwierdzone |
| street | Street (f) | Streets×38, Street×24 | [E] Street: „Die Streets in Texas Hold’em sind Preflop, Flop, Turn und River.” | potwierdzone |
| betting-round | Setzrunde (f) | Setzrunde(n)×8 | [C] „Danach folgen eine oder mehrere Setzrunden, in denen die Spieler ihre Karten einschätzen und ihre Einsätze machen.” | potwierdzone |
| showdown | Showdown (m) | Showdown×1 | [B] „Kommt es nach der letzten Wettrunde zum Showdown” | potwierdzone |
| in-position / out-of-position | in Position / out of Position | in Position×34; ohne Position×36, out of Position×18 | [E] „Ein Spieler ist In Position auf einen anderen Spieler, wenn er nach diesem in einer Wettrunde agieren kann.”; „Ein Spieler ist Out of Position auf einen anderen Gegner, wenn er vor diesem in einer Wettrunde agieren muss.” | potwierdzone oba; nazwa en dla pary IP/OOP, „ohne Position” zostaje poprawną formą |
| royal-flush, straight-flush | Royal Flush, Straight Flush (m) | ×3 | [A] „Ein Royal Flush, wie z. B. A♣ K♣ Q♣ J♣ 10♣, ist ein Straight Flush mit dem Ass als höchster Karte” | potwierdzone |
| four-of-a-kind | Vierling (m) | Vierling×8 | [A] „Ein Vierling, oder Poker, im Englischen auch four of a kind oder quads genannt” | potwierdzone |
| full-house | Full House (n) | Full House×16 | [A] „Der Vierling steht über dem Full House und unter einem Straight Flush.” | potwierdzone |
| flush | Flush (m) | Flush×92 | [A] „Ein Flush ist eine Hand wie etwa Q♣ 10♣ 7♣ 6♣ 4♣, die aus fünf Karten derselben Farbe besteht.” | potwierdzone |
| straight | Straße (f) | Straße×93, Straight×43, Straßen×11 | [A] „Ein Straight, im Deutschen auch Straße, ist eine Hand”; [E] Straight: „Eine Straight oder eine Straße ist eine Pokerhand, die aus fünf direkt aufeinander folgenden Karten besteht.” | potwierdzone oba; nazwa **Straße** (większość tłumacza, definicje); UI ujednolicone w poprawki-D2 |
| three-of-a-kind, set | Drilling (m), Set (n) | Drilling×23 | [A] „Die Hand ist stärker als ein Drilling und schwächer als ein Flush.”; [E] Set: „bezeichnet man als Set einen Drilling, der aus einem in der Starthand des Spielers befindlichen Paar und einer Gemeinschaftskarte besteht.” | potwierdzone |
| two-pair | zwei Paare (lm) | zwei/Zwei Paare×33, Two Pair×24 | [A] „Zwei Paare aus Zweien und Dreien sind also besser als Ein Paar Asse.”; [E] Kicker: „Two Pair (zwei Paare)” | potwierdzone oba; nazwa = większość tłumacza i UI; 1 konflikt („hohes”) niżej |
| high-card, kicker | High Card (f), Kicker (m) | High Card×3 | [A] „das Paar wahrscheinlicher als High Card”; [E] Kicker: „Ein Kicker dient als Tie-Breaker (Entscheidungskarte)” | potwierdzone |
| side-pot, split-pot | Side Pot, Split Pot (m) | Nebenpot×2; Split Pot×15 | [B] „so spielen die anderen Spieler zusätzlich um einen Side Pot, an dem der All-in-Spieler nicht beteiligt ist.”; [E] „Ein Split Pot ist ein Pot, der unter mehreren Spielern aufgeteilt wird, weil sie eine gleichwertige Hand halten.” | potwierdzone; „Nebenpot” (2×) bez źródła, definicje mają „Side Pot” |
| outs, flush-draw | Outs (lm), Flush-Draw (m) | Outs; Flush-Draw×36, Flush Draw×19 | [E] Outs: „Outs sind die Karten, die deine Hand mit einiger Wahrscheinlichkeit zu einer voraussichtlichen Gewinnerhand verbessern.”; [E] Flush-Draw: „Ein Flush Draw bedeutet, dass ein Spieler vier Karten einer Farbe hält” | potwierdzone; pisownia z łącznikiem (większość, UI), [E] bez |
| pot-odds, equity, expected-value | Pot Odds (lm), Equity (f), Erwartungswert (m) | Equity×8, Erwartungswert×7 | [E] „Pot Odds sind das Verhältnis zwischen der gesamten Potgröße und den Kosten eines Calls.”; „Die Equity (engl. für Marktwert, Kapitalanteil) oder Pot Equity bezeichnet den Anteil eines Spielers am aktuellen Pot”; „Der Expected Value, Erwartungswert, mathematical Expectation oder auch EV” | potwierdzone |
| range | Range (f) | Range×164, Ranges×19 | [E] Range: „Eine Range ist die Bandbreite möglicher Hände” | potwierdzone |
| top-pair, overpair, pocket-pair | Top Pair, Overpair, Pocket Pair (n) | Top Pair×61, Overpair×8 | [E] „und der höchsten Gemeinschaftskarte besteht, als Top Pair.”; „daher ein Overpair.”; „Ein Pocket Pair ist die Bezeichnung für ein Paar, das mit deinen Hole Cards gebildet wird.” | potwierdzone |
| texture, dry | Textur (f), trocken | Textur×6, trocken… | [E] Textur: „Unter der Boardtextur wird die Zusammensetzung des Boards in einem Pokerspiel verstanden.”; „Das Board kann koordiniert (drawheavy, wet) oder trocken (dry) sein.” | potwierdzone; „nass” (wet) bez źródła — [E] pisze „wet”, zostaje forma tłumacza |
| bluff, semi-bluff, nuts | Bluff (m), Semi-Bluff (m), Nuts (lm) | Bluffs×238, Bluff×88 | [E] „Bluffen im Poker bedeutet, mit einer schwachen Hand zu setzen oder zu raisen”; „Ein Semibluff ist ein Bluff mit einem momentan schwachen Blatt”; „Die Nuts im Poker bezeichnen die bestmögliche Kombination zu einem bestimmten Zeitpunkt in einer Hand.” | potwierdzone |
| variance, downswing, tilt, bankroll, risk-of-ruin (moduł 12) | Varianz (f), Downswing (m), Tilt (m), Bankroll (f), Ruinrisiko (n) | Varianz×22, Downswing×19, Ruinrisiko×4 | [E] „beschreibt Varianz die mögliche, kurzfristige Abweichung”; „Als Downswing bezeichnet man eine Phase oder Zeitspanne, in der ein Spieler trotz korrektem Spiel Verluste einfährt”; „Tilt im Poker bezeichnet jeden emotionalen Zustand, der die Entscheidungsfindung beeinflusst.”; „Als Bankroll bezeichnet man die Pokerkasse eines Spielers.”; „Das Risiko des Ruins in Bezug auf Poker gibt daher die Wahrscheinlichkeit an” | potwierdzone (Ruinrisiko = „Risiko des Ruins”) |
| stakes | Limit (n) | Limit×41, Limits×21, Mikrolimits | [E] Stakes: „Stakes beziehen sich auf das allgemeine Buy-in-Level von Pokerspielen.”; [E] Micro-Limit (hasło „Micro-Limit”) | oba w użyciu; nazwa „Limit” (większość tłumacza); definicje ujednolicone w poprawki-D2 |
| rake, bubble, payout, stack | Rake (m), Bubble (f), Auszahlung (f), Stack (m) | Rake×17, Bubble×11, Auszahlung(en)×12 | [E] „Rake ist die Spielgebühr, die der Anbieter aus jedem Pot oder Buy-in einbehält.”; „Die Bubble beschreibt den Turnierabschnitt kurz vor dem Erreichen der Geldränge”; „Der Payout oder die Auszahlung ist der Gewinn, den ein Spieler in einem Turnier auf einem bestimmten Platz erhält.”; „Als Stack bezeichnet man den Betrag an Geld oder Chips, den ein Spieler am Tisch hat” | potwierdzone |
| limp, overbet, donk-bet, initiative | Limp (m), Overbet (f), Donk Bet (f), Initiative (f) | Limp, Overbet×2, Initiative×15 | [E] „Er callt den Big Blind, erhöht aber nicht.”; „wird als Overbet bezeichnet.”; „Eine typische Situation für eine Donkbet ist beispielsweise”; „Ist man derjenige, der die Richtung in einer Hand vorgibt, der der Aggressor ist, hat man die Initiative.” | potwierdzone |
| nit, calling-station, shove, final-table | Nit, Calling Station, Push, Finaltisch | Nit×6, Push/Shove po 12 | [E] „Eine Nit ist ein extrem tighter Pokerspieler”; „Eine Calling Station ist ein Pokerspieler, der häufig Einsätze callt”; „Ein Spieler pusht, wenn er All-In geht.”; „als Final-Table bezeichnet.” | potwierdzone; Finaltisch = kalka „Final-Table” (forma tłumacza) |

## Najważniejsze rozstrzygnięcia nazw

- **straight → „Straße”**: oba słowa są w źródłach, ale jedno pojęcie ma mieć jedną nazwę; lekcje i definicje mają „Straße”, UI „Straight” → poprawki-D2 (16 kluczy UI, ŚREDNIE).
- **two-pair → „zwei Paare”** (lm), nie „Two Pair”: większość tłumacza i UI; wymaga jednej formy w lekcji (niżej).
- **in-position / out-of-position → „in Position” / „out of Position”** (para en jak [E]); „ohne Position” w treści zostaje poprawną formą.
- **stakes → „Limit”**, najniższe poziomy „Mikrolimits”; definicje stakes i risk-of-ruin („Micro Stakes”, „Stakes”) ujednolicone w poprawki-D2.
- **flush-draw / straight-draw → „Flush-Draw” / „Straight-Draw”** (pisownia z łącznikiem jak UI i większość lekcji); terms-def ujednolicone (NISKIE).
- [DO USTALENIA] 39 nazw bez przeczytanego źródła (np. Range-Vorteil, Nuts-Vorteil, MDF, Alpha, Session, Preispool, Reg, Freizeitspieler, Isolation) — zostaje propozycja zgodna z przekładem.

## Konflikty rodzaju i liczby (znaczniki bez formy wobec proponowanej nazwy)

Sprawdzone automatycznie wszystkie 1 463 znaczniki bez formy w `tl/content/de` (skrypt `SP/pr/D2/konf.py`: słowo przed znacznikiem — der/die/das/ein/eine/einen/einem/einer, kein-, dies-, jed-, sein-/dein-, im/am/zum/zur — wobec rodzaju nazwy; przymiotnik bez odmiany przed rzeczownikiem) i ręcznie konteksty liczby mnogiej (bluff, pair, two-pair, flush, chips, straight, draw, call, fold, check, raise). Słownik UI: 0 znaczników bez formy.

Wynik: 15 trafień, z tego 3 fałszywe (zaimek względny: „in der {{t:top-pair}} eine Grenzhand ist” ×2, „Zahlung, die {{t:vpip}} erhöht”; złożenie „Die {{t:alpha}}-Schwellen”). Prawdziwe:

1. **bet — rodzaj (6×, lekcje)**: „einen/ein/einem {{t:bet}}” w `lessons/m9-l4-plan-trzech-ulic.md` (2×) i `lessons/m7-l4-probe-obrona.md` (4×, m.in. „Ein Probe Bet ist ein {{t:bet}}”), wobec „eine/einer {{t:bet}}” (~20×) i źródła [E] („Eine Bet”, „einer Bet”). Niezależnie od nazwy (zawsze „Bet”) tekst miesza der/die. Propozycja dla sesji lekcji: rodzaj żeński („eine {{t:bet}}”, „einer {{t:bet}}”). ŚREDNIE.
2. **spr — rodzaj (4×, lekcje)**: „mit dem {{t:spr}}” ×2, „Zonen des {{t:spr}}”, „ist das {{t:spr}} zu hoch” (`lessons/m9-l4…`), „Bei welchem {{t:spr}}” (`lessons/m9-l3…`) wobec „die {{t:spr}}” ×43 i „einer {{t:spr}}” ×7. [E] pisze „das SPR”, ale treść konsekwentnie żeńska (die Stack-to-Pot-Ratio) — ujednolicić na żeński w 5 miejscach. NISKIE/ŚREDNIE.
3. **two-pair — przymiotnik w lp (1×)**: `lessons/m9-l1-spr.md:136` „| hohes {{t:two-pair}} und besser |” przy nazwie „zwei Paare” da „hohes zwei Paare” → `hohe {{t:two-pair|zwei Paare}}` (dla sesji lekcji). Inne konteksty („hohe {{t:two-pair}}”, „87 {{t:two-pair}}”) zgodne.
4. Brak konfliktów liczby przy pozostałych nazwach; brak znaczników bez formy przy nazwach przymiotnikowych (trocken, nass, gepaart…) i wyrażeniach (Push/Fold, covern).

Zależności, które nazwa musi spełnić (inaczej powstanie konflikt): „das {{t:open}}” ×3 wymaga rodzaju nijakiego („Open”; „Eröffnung” dałoby „das Eröffnung”); „eine {{t:straight}}” ×3 — żeński (Straße, też „die Straight”); „der/den/dem {{t:big-blind}}”, „der {{t:pot}}”, „ein {{t:call}}”, „ein/dieser {{t:bluff}}”, „einen {{t:draw}}” — męski; „ein {{t:pair}}”, „das {{t:icm}}”, „einem {{t:board}}” — nijaki; „die {{t:mdf}}”, „die {{t:range}}” — żeński; „um {{t:chips}}”, „viele {{t:chips}}” — lm.
