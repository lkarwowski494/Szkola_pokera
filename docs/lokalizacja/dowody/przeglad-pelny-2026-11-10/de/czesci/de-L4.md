# de-L4: niemiecki (de), lekcje m6-* (3) i egzamin m6.yaml

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m6-l1-mdf-alpha.md (wobec content/pl/lessons/m6-l1-mdf-alpha.md) | tak | 136 |
| content/de/lessons/m6-l2-sprawdzenie.md (wobec content/pl/lessons/m6-l2-sprawdzenie.md) | tak | 134 |
| content/de/lessons/m6-l3-check-raise.md (wobec content/pl/lessons/m6-l3-check-raise.md) | tak | 139 |
| content/de/exams/m6.yaml (wobec content/pl/exams/m6.yaml) | tak | 96 |

Pomocniczo: `content/de/terms-nazwy.yaml` (cały), `content/numbers.yaml` (klucze `xr.*`).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m6-l3:27 | `{{t:flush-draw\|Flush Draw}} oder {{t:straight\|Straight}}-Draw` | `{{t:flush-draw\|Flush-Draw}} oder {{t:straight\|Straßen}}-Draw` | niespójny termin: straight = „Straße” w terms-nazwy, m6-l2 i egzaminie; w m6-l3 „Straight” | wysoka | tak |
| 2 | ŚR | m6-l3:28 | `eine {{t:straight\|Straight}}` | `eine {{t:straight\|Straße}}` | jw. | wysoka | tak |
| 3 | ŚR | m6-l3:73 | `Die {{t:straight\|Straight}}` | `Die {{t:straight\|Straße}}` | jw. | wysoka | tak |
| 4 | ŚR | m6-l3:74 | `die {{t:straight\|Straight}}` | `die {{t:straight\|Straße}}` | jw. | wysoka | tak |
| 5 | ŚR | m6-l3:130 | `{{t:straight\|Straights}}` | `{{t:straight\|Straßen}}` | jw. (egzamin q10 ma „Straßen” w tym samym zdaniu-regule) | wysoka | tak |
| 6 | ŚR | m6-l3:82 | `mit dem {{t:call\|Call}} hältst du sie im Spiel` | `… hältst du seine Bluffs im Spiel` | dwuznaczny zaimek: „sie” czyta się jako rękę (podmiot poprzedniego zdania), źródło: „trzymasz je [blefy] w grze” | średnia | tak |
| 7 | ŚR | m6-l2:18, 54, 85, 91, 112 (goły `{{t:out-of-position}}` → „out of Position”) wobec m6-l2:94, 114, 116, m6-l1, egzamin („ohne Position”) | `{{t:out-of-position}}` | jedna forma w całym module | to samo pojęcie raz jako „out of Position”, raz „ohne Position”, także w obrębie jednej lekcji; wybór formy to decyzja dla całego korpusu (terms-nazwy: [WIELE FORM]) | wysoka | nie |
| 8 | ŚR | m6-l3 (16, 17, 18, 102, 122, 125, 129, 130: „Two Pair/Two Pairs”) wobec egzaminu m6:94 (goły `{{t:two-pair}}` → „zwei Paare”) | `{{t:two-pair\|Two Pair}}` | jedna forma | niespójny termin w obrębie modułu; terms-nazwy: „zwei Paare”, [WIELE FORM] — decyzja korpusowa | wysoka | nie |
| 9–16 | NISKIE | m6-l1:22, 38, 54, 64, 79, 82, 100, 128 | `einem Bet`, `der Bet`, `Ein größerer Bet`, `einen C-Bet`, `einen kleinen C-Bet`, `den Bet` | `einer Bet`, `die Bet`, `Eine größere Bet`, `eine C-Bet`, `eine kleine C-Bet`, `die Bet` | rodzaj gramatyczny: Bet/C-Bet w terms-nazwy r. żeński, tak w m6-l2, m6-l3, rules.yaml i w większości korpusu; m6-l1 ma r. męski | wysoka | tak (8) |
| 17–31 | NISKIE | exams/m6.yaml:24, 27, 28, 47, 49, 54, 57, 58, 64, 67, 68, 73, 83 (×2), 86 | `einen C-Bet`, `einem C-Bet`, `einen kleinen/großen C-Bet`, `einen größeren Bet`, `Ein größerer Bet`, `des C-Bets` | formy żeńskie (`eine C-Bet`, `einer C-Bet`, `eine kleine/große C-Bet`, `eine größere Bet`, `der C-Bet`) | jw.; egzamin ma r. męski, lekcje m6-l2/l3 żeński | wysoka | tak (15) |
| 32 | NISKIE | m6-l3:92 | `einen {{t:flush-draw\|Flush Draw}};` | `einen {{t:flush-draw\|Flush-Draw}};` | pisownia terminu (terms-nazwy, m6-l2: z łącznikiem) | wysoka | tak |
| 33 | NISKIE | m6-l3:92 | `Backdoor-{{t:straight-draw\|Straight Draw}}` | `Backdoor-{{t:straight-draw\|Straight-Draw}}` | pisownia terminu; złożenie z jednym łącznikiem jest błędne | wysoka | tak |
| 34 | NISKIE | m6-l3:103 | `Voller {{t:pot\|Pot}}` | `Ganzer {{t:pot\|Pot}}` | „Cała pula” w m6-l1/l2 = „Ganzer Pot” | wysoka | tak |
| 35 | NISKIE | m6-l3:52 | `mehrmals so groß sein wie die C-Bet` | `ein Mehrfaches der C-Bet betragen` | niezręczne sformułowanie | średnia | tak |
| 36 | NISKIE | m6-l3:83 | `zahlen dich vor allem` | `bezahlen dich vor allem` | błąd rekcji („jemanden zahlen”) | średnia | tak |
| 37 | NISKIE | m6-l2:46 | `zahlen dich hauptsächlich` | `bezahlen dich hauptsächlich` | jw. | średnia | tak |
| 38 | NISKIE | m6-l2:85 | `ein Bezugspunkt für` | `ein Richtwert für` | „punkt odniesienia” (MDF) w m6-l1 i egzaminie = „Richtwert” | wysoka | tak |
| 39 | NISKIE | exams/m6.yaml:57 | `Ass als höchste Karte schlägt` | `Ein Ass als höchste Karte schlägt` | brak rodzajnika | wysoka | tak |
| 40 | NISKIE | exams/m6.yaml:58 | `wird Ass als höchste Karte` | `wird ein Ass als höchste Karte` | jw. | wysoka | tak |
| 41 | NISKIE | exams/m6.yaml:78 | `"Ass als höchste Karte ohne` | `"Ein Ass als höchste Karte ohne` | jw. | wysoka | tak |
| 42 | NISKIE | m6-l1:92–94, egzamin:37–39, 57–58 („Ich folde / Ich calle”), m6-l2 („Call / Fold”), m6-l3 („Callen / Folden”) | — | jedna konwencja | ta sama odpowiedź źródła („Sprawdzam”, „Pasuję”) oddana trzema konwencjami w jednym module; styl, decyzja korpusowa | wysoka | nie |

Razem: KRYT 0, WYS 0, ŚR 8, NISKIE 34 (42 znaleziska; 39 poprawek JSON).

Sprawdzone bez zastrzeżeń: wszystkie klucze `{{n:…}}` i `{{t:…}}` odpowiadają źródłu w tych samych miejscach (różnice tylko w obecności formy po `|`); pola `correct`, `sizeError`, `answer`, `table`, karty `[[…]]`, ułamki puli i kierunki zaleceń zgodne ze źródłem we wszystkich 4 plikach.

## Do sprawdzenia przez człowieka znającego język

- m6-l2:84 „zusätzlichen {{t:straight-draw}}” wobec m6-l3:92–93 „Backdoor-Straight-Draw / Backdoor-Draw” dla tego samego zdania źródła („słaby dodatkowy straight-draw”): sens ten sam (źródło samo objaśnia „dodatkowy” jako backdoor), ale dwa sformułowania; czy ujednolicać.
- „am Flop / am Turn” (egzamin, m6-l2) wobec „auf dem Flop / auf dem Turn” (m6-l1, m6-l3): oba poprawne, mieszane w module.
- exams/m6.yaml:27 „überlässt ihm den Pot für nichts” („za bezcen”): zrozumiałe; naturalniej byłoby „fast geschenkt”.
- m6-l2:54 „Ein Paar Damen oder Buben gewinnt auch nicht immer”: wiernie oddaje źródło, ale bez „selbst” (np. „Selbst ein Paar Damen oder Buben …”) związek z poprzednim zdaniem jest mniej czytelny.

## Uwagi do źródła pl

- m6-l2:84 (pl) „Cena jest dobra, ale ta ręka prawie nigdy jej nie zrealizuje” — realizuje się equity, nie cenę; przekład wiernie powtarza („realisiert ihn fast nie”).
- m6-l2:65, m6-l3:93, 123 (pl) „{{t:draw|drawami}} ({{t:flush}}, {{t:oesd}})” — w nawiasie stoi nazwa układu (kolor) zamiast drawa do koloru; de w m6-l3:26, 93 doprecyzowuje („Flush-Draws”), w m6-l2:65 i m6-l3:123 powtarza skrót.

## Ocena ogólna

Przekład modułu 6 jest merytorycznie wierny: nie znaleziono zmienionej liczby, ręki, kierunku zalecenia, poprawnej odpowiedzi ani zgubionego znacznika. Słabością jest spójność między plikami, które wyglądają na tłumaczone osobno: rodzaj „Bet/C-Bet” (męski w m6-l1 i egzaminie, żeński w m6-l2/l3), „Straight” wobec „Straße”, „Two Pair” wobec „zwei Paare”, „out of Position” wobec „ohne Position” oraz trzy konwencje zapisu odpowiedzi. Język jest naturalny i poprawny, z pojedynczymi drobnymi potknięciami.
