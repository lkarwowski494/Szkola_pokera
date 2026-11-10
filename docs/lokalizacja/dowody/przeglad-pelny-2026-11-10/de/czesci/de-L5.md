# de-L5: niemiecki (de), lekcje m7-* (4) i egzamin m7.yaml

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m7-l1-druga-beczka.md | tak | 138 |
| content/de/lessons/m7-l2-polaryzacja.md | tak | 139 |
| content/de/lessons/m7-l3-implied-odds.md | tak | 147 |
| content/de/lessons/m7-l4-probe-obrona.md | tak | 146 |
| content/de/exams/m7.yaml | tak | 95 |

Każdy plik czytany linia po linii obok `content/pl/…` (ta sama liczba linii); terminologia wg `content/de/terms-nazwy.yaml`. Dodatkowo porównanie maszynowe kluczy znaczników `{{t:…}}`/`{{n:…}}` linia po linii: jedyna różnica to m7-l1:137 (znalezisko 2).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | NISKIE | m7-l1-druga-beczka.md:36 | nimmst eine Gratiskarte | nimmst eine Freikarte | m7-l1:36: „darmowa karta” w pozostałych plikach modułu i korpusie to „Freikarte” (11×), „Gratiskarte” tylko tutaj. | wysoka | tak |
| 2 | ŚR | m7-l1-druga-beczka.md:137 | die {{t:value\|Value}}-Hände des Gegners blocken | die Value-Hände des Gegners blocken | m7-l1:137: nadmiarowy znacznik {{t:value}} — źródło pl ma w tym miejscu zwykły tekst („blokują wartość rywala”); usunięcie nadmiarowego znacznika. | wysoka | tak |
| 3 | NISKIE | m7-l4-probe-obrona.md:16 | der {{t:aggressor}} von vor dem Flop keinen | der Preflop-{{t:aggressor}} keinen | m7-l4:16: „der Aggressor von vor dem Flop” to niezręczna kalka; naturalnie „der Preflop-Aggressor”. | średnia | tak |
| 4 | NISKIE | m7-l4-probe-obrona.md:122 | der {{t:aggressor}} von vor dem Flop auf dem Flop | der Preflop-{{t:aggressor}} auf dem Flop | m7-l4:122: „der Aggressor von vor dem Flop auf dem Flop” to niezręczna kalka; naturalnie „der Preflop-Aggressor”. | średnia | tak |
| 5 | NISKIE | m7-l4-probe-obrona.md:26 | setzen würde, also hat er nach einem {{t:check}} weniger davon | setzen würde und nach einem {{t:check}} deshalb weniger davon hat | m7-l4:26: „Weil …, also hat er …” to niegramatyczna konstrukcja (zdanie podrzędne bez dokończenia); sens bez zmian. | średnia | tak |
| 6 | NISKIE | m7-l4-probe-obrona.md:96 | auf einer Blank-Karte zu | auf einer leeren Karte zu | m7-l4:96: „pusta karta” zdefiniowana w m7-l1:124 jako „leere Karte”; „Blank-Karte” tylko tutaj. | wysoka | tak |
| 7 | ŚR | m7-l4-probe-obrona.md:108 | du verteidigst weiter, weil | du verteidigst breiter, weil | m7-l4:108: źródło „bronisz szerzej”; „verteidigst weiter” czyta się jako „bronisz dalej/nadal”; w lekcji przeciwieństwem „enger” jest „breit” („breite Verteidigung”). | wysoka | tak |
| 8 | NISKIE | m7-l4-probe-obrona.md:116 | übers Erwischen von {{t:bluff\|Bluffs}} | übers Fangen von {{t:bluff\|Bluffs}} | m7-l4:116: odesłanie do lekcji M8 „łapanie blefów”, której tytuł de to „Bluffs fangen”. | średnia | tak |
| 9 | ŚR | exams/m7.yaml:8 | {{t:open\|geöffnet}}, der {{t:big-blind\|Big Blind}} hat {{t:call\|gecallt}} | {{t:open\|eröffnet}}, der {{t:big-blind\|Big Blind}} hat {{t:call\|gecallt}} | m7.exam.q1 prompt: {{t:open}} to w korpusie de „eröffnet/Eröffnen” (109×); „geöffnet/Öffnen” (otworzyć drzwi) tylko w tym pliku. | wysoka | tak |
| 10 | ŚR | exams/m7.yaml:18 | {{t:open\|geöffnet}}, der {{t:big-blind\|Big Blind}} hat die C-Bet auf dem Flop {{t:call\|gecallt}}. Der Turn ist eine Zwei | {{t:open\|eröffnet}}, der {{t:big-blind\|Big Blind}} hat die C-Bet auf dem Flop {{t:call\|gecallt}}. Der Turn ist eine Zwei | m7.exam.q2 prompt: {{t:open}} to w korpusie de „eröffnet/Eröffnen” (109×); „geöffnet/Öffnen” (otworzyć drzwi) tylko w tym pliku. | wysoka | tak |
| 11 | ŚR | exams/m7.yaml:27 | {{t:open\|geöffnet}}, der {{t:big-blind\|Big Blind}} hat die C-Bet auf dem Flop {{t:call\|gecallt}}. Der Turn ist eine Fünf | {{t:open\|eröffnet}}, der {{t:big-blind\|Big Blind}} hat die C-Bet auf dem Flop {{t:call\|gecallt}}. Der Turn ist eine Fünf | m7.exam.q3 prompt: {{t:open}} to w korpusie de „eröffnet/Eröffnen” (109×); „geöffnet/Öffnen” (otworzyć drzwi) tylko w tym pliku. | wysoka | tak |
| 12 | ŚR | exams/m7.yaml:11 | fürs {{t:open\|Öffnen}} | fürs {{t:open\|Eröffnen}} | m7.exam.q1 why [[Kh]]: {{t:open}} to w korpusie de „eröffnet/Eröffnen” (109×); „geöffnet/Öffnen” (otworzyć drzwi) tylko w tym pliku. | wysoka | tak |
| 13 | ŚR | exams/m7.yaml:12 | T7 und 75 eine {{t:straight\|Straight}} | T7 und 75 eine {{t:straight\|Straße}} | m7.exam.q1 why [[8c]]: {{t:straight}} to wg terms-nazwy.yaml i lekcji m7 „Straße”; „Straight” tylko w egzaminie. | wysoka | tak |
| 14 | ŚR | exams/m7.yaml:13 | 87 und 43 eine {{t:straight\|Straight}} | 87 und 43 eine {{t:straight\|Straße}} | m7.exam.q1 why [[5s]]: {{t:straight}} to wg terms-nazwy.yaml i lekcji m7 „Straße”; „Straight” tylko w egzaminie. | wysoka | tak |
| 15 | ŚR | exams/m7.yaml:22 | gibt ihr eine {{t:straight\|Straight}} | gibt ihr eine {{t:straight\|Straße}} | m7.exam.q2 why [[8c 7c]]: {{t:straight}} to wg terms-nazwy.yaml i lekcji m7 „Straße”; „Straight” tylko w egzaminie. | wysoka | tak |
| 16 | ŚR | exams/m7.yaml:74 | zur {{t:straight\|Straight}} | zur {{t:straight\|Straße}} | m7.exam.q8 why (outs.oesd): {{t:straight}} to wg terms-nazwy.yaml i lekcji m7 „Straße”; „Straight” tylko w egzaminie. | wysoka | tak |
| 17 | NISKIE | exams/m7.yaml:75 | {{t:straight-draw\|Straight Draw}} | {{t:straight-draw\|Straight-Draw}} | m7.exam.q8 why (outs.gutshot): pisownia wg terms-nazwy.yaml „Straight-Draw”. | wysoka | tak |
| 18 | ŚR | exams/m7.yaml:12 | 98 und 86 {{t:two-pair\|Two Pair}} | 98 und 86 {{t:two-pair\|zwei Paare}} | m7.exam.q1 why [[8c]]: {{t:two-pair}} to wg terms-nazwy.yaml i lekcji m7-l2 „zwei Paare”. | wysoka | tak |
| 19 | ŚR | exams/m7.yaml:47 | Sets und {{t:two-pair\|Two Pair}} | Sets und {{t:two-pair\|zwei Paare}} | m7.exam.q5 opcja 2: {{t:two-pair}} to wg terms-nazwy.yaml i lekcji m7-l2 „zwei Paare”. | wysoka | tak |
| 20 | ŚR | exams/m7.yaml:53 | Du hast {{t:two-pair\|Two Pair}} | Du hast {{t:two-pair\|zwei Paare}} | m7.exam.q6 prompt: {{t:two-pair}} to wg terms-nazwy.yaml i lekcji m7-l2 „zwei Paare”. | wysoka | tak |
| 21 | ŚR | exams/m7.yaml:58 | Mit {{t:two-pair\|Two Pair}} setzt du | Mit {{t:two-pair\|zwei Paaren}} setzt du | m7.exam.q6 why (check): {{t:two-pair}} to wg terms-nazwy.yaml i lekcji m7-l2 „zwei Paare”. | wysoka | tak |
| 22 | NISKIE | exams/m7.yaml:21 | einen {{t:flush-draw\|Flush Draw}} und einen Gutshot | einen {{t:flush-draw\|Flush-Draw}} und einen Gutshot | m7.exam.q2 why [[Qh Jh]]: pisownia wg terms-nazwy.yaml i lekcji m7: „Flush-Draw”. | wysoka | tak |
| 23 | NISKIE | exams/m7.yaml:48 | {{t:flush-draw\|Flush Draws}} | {{t:flush-draw\|Flush-Draws}} | m7.exam.q5 opcja 3: pisownia wg terms-nazwy.yaml i lekcji m7: „Flush-Draw”. | wysoka | tak |
| 24 | NISKIE | exams/m7.yaml:53 | einen {{t:flush-draw\|Flush Draw}} haben | einen {{t:flush-draw\|Flush-Draw}} haben | m7.exam.q6 prompt: pisownia wg terms-nazwy.yaml i lekcji m7: „Flush-Draw”. | wysoka | tak |
| 25 | NISKIE | exams/m7.yaml:58 | für einen {{t:flush-draw\|Flush Draw}} | für einen {{t:flush-draw\|Flush-Draw}} | m7.exam.q6 why (check): pisownia wg terms-nazwy.yaml i lekcji m7: „Flush-Draw”. | wysoka | tak |
| 26 | ŚR | exams/m7.yaml:27 | Du hast {{t:second-pair\|zweites Paar}} mit Ass | Du hast {{t:second-pair\|Second Pair}} mit Ass | m7.exam.q3 prompt: {{t:second-pair}} to wg terms-nazwy.yaml i lekcji m7-l1:134 „Second Pair”. | wysoka | tak |
| 27 | ŚR | exams/m7.yaml:30 | {{t:second-pair\|Zweites Paar}} | {{t:second-pair\|Second Pair}} | m7.exam.q3 why (check): {{t:second-pair}} to wg terms-nazwy.yaml i lekcji m7-l1:134 „Second Pair”. | wysoka | tak |
| 28 | ŚR | exams/m7.yaml:46 | {{t:second-pair\|zweites Paar}}", correct | {{t:second-pair\|Second Pair}}", correct | m7.exam.q5 opcja 1: {{t:second-pair}} to wg terms-nazwy.yaml i lekcji m7-l1:134 „Second Pair”. | wysoka | tak |
| 29 | ŚR | exams/m7.yaml:80 | {{t:second-pair\|zweites Paar}} und einen Gutshot | {{t:second-pair\|Second Pair}} und einen Gutshot | m7.exam.q9 prompt: {{t:second-pair}} to wg terms-nazwy.yaml i lekcji m7-l1:134 „Second Pair”. | wysoka | tak |
| 30 | NISKIE | exams/m7.yaml:48 | also setzen sie mit derselben großen Size wie starke Hände | also setzen sie genauso groß wie starke Hände | m7.exam.q5 why opcja 3: „rozmiar” w lekcjach m7 to „Größe”/„groß” („Richtige Aktion, falsche Größe” w m7-l1 i m7-l2); „Size” tylko w egzaminie. | wysoka | tak |
| 31 | NISKIE | exams/m7.yaml:57 | falsche Size | falsche Größe | m7.exam.q6 why (sizeError): „rozmiar” w lekcjach m7 to „Größe”/„groß” („Richtige Aktion, falsche Größe” w m7-l1 i m7-l2); „Size” tylko w egzaminie. | wysoka | tak |
| 32 | NISKIE | exams/m7.yaml:93 | und einer größeren Size als die C-Bet | und größer als die C-Bet | m7.exam.q10 why (fold): „rozmiar” w lekcjach m7 to „Größe”/„groß” („Richtige Aktion, falsche Größe” w m7-l1 i m7-l2); „Size” tylko w egzaminie. | wysoka | tak |
| 33 | NISKIE | exams/m7.yaml:95 | weder eine Hand {{t:value\|auf Value}} noch | weder eine {{t:value\|Value}}-Hand noch | m7.exam.q10 why (raise): „eine Hand auf Value” to kalka „ręka dla wartości”; naturalnie „Value-Hand” (tak w m7-l2:16). | średnia | tak |
| 34 | ŚR | m7-l2-polaryzacja.md (cały plik, 17+ miejsc, np. :6, :32, :41, :110), m7-l4-probe-obrona.md (ok. 25 miejsc, np. :16, :17, :73, :86) | „Großer Bet”, „deinen C-Bet”, „Ein Probe Bet”, „den C-Bet”, „der kleine Bet” | „Große Bet”, „deine C-Bet”, „Eine Probe Bet”, „die C-Bet”, „die kleine Bet” | Rodzaj gramatyczny: terms-nazwy.yaml podaje bet, c-bet i probe-bet jako rodzaj żeński; m7-l1, m7-l3 i egzamin mają „die/eine (C-)Bet” (egzamin :85 „Eine Probe Bet”), a m7-l2 i m7-l4 rodzaj męski; w m7-l4:16 oba naraz („Ein Probe Bet ist eine Bet”). W całym korpusie de ok. 151× żeński i 79× męski, więc to decyzja dla całego korpusu (ujednolicenie hurtowe z odmianą przymiotników), nie pojedyncza poprawka. | wysoka | nie |
| 35 | ŚR | m7-l2-polaryzacja.md (21 miejsc, np. :16, :22, :44, :106) | „bettet”, „gebettet”, „Ich bette”, „bettest” | „setzt”, „gesetzt”, „Ich setze”, „setzt” | Czasownik „betować/stawiać”: m7-l1, m7-l3, m7-l4 i egzamin mają „setzen” („Ich setze …”), m7-l2 konsekwentnie „betten” (po niemiecku także „ścielić”, forma „bettet” dwuznaczna). Ta sama opcja odpowiedzi brzmi więc raz „Ich setze {{n:…}}”, raz „Ich bette {{n:…}}”. W korpusie 259× „setzen” wobec 215× „betten” — decyzja dla całego korpusu. | wysoka | nie |
| 36 | NISKIE | m7-l3-implied-odds.md:40, :41, :66–68, :75–77, :85–87 | „{{t:call\|Callen}}”, „{{t:fold\|Folden}}”, „All-in {{t:raise\|raisen}}” | „Ich {{t:call\|calle}}”, „Ich {{t:fold\|folde}}”, „Ich {{t:raise\|raise}} all-in” | Forma opcji odpowiedzi: m7-l3 ma bezokolicznik, pozostałe pliki modułu 1. osobę („Ich calle”, „Ich folde”), jak źródło pl („Sprawdzam”, „Pasuję”). Preferencja spójności, bez wpływu na sens. | średnia | nie |

Razem: KRYT 0, WYS 0, ŚR 20, NISKIE 16; poprawek JSON 33.

## Do sprawdzenia przez człowieka znającego język

- m7-l3:122 „Implied Odds (versteckte Chancen)” — dosłowne oddanie „szanse ukryte”; w niemieckiej literaturze pokerowej objaśnienie bywa inne („implizite Odds”). Sens zrozumiały, bez poprawki.
- m7-l2:78, :87 „etwa {{n:…}} bis zum River” wobec m7-l3/m7-l4/egzamin „ca. {{n:…}} am River” (pl w obu „na riverze”) oraz „etwa” (m7-l2) wobec „ca.” (pozostałe) — drobna niespójność stylu.
- m7-l2:104, :127, m7-l3:114, :116 „offene Straße” za „strit otwarty” (chodzi o draw, OESD) — wierne źródłu, ale rodzimy czytelnik mógłby oczekiwać „offener Straight-Draw”/„OESD”.
- m7-l3:85 „mit Herz-Dame oder Herz-Bube” — ściśle „Herz-Buben” (odmiana słaba); w języku karcianym forma bez końcówki jest powszechna.
- „Auf dem Flop/Turn” (m7-l4, egzamin) wobec „Am Flop/Turn” (m7-l1–l3) — obie formy poprawne, niespójne między plikami.

## Uwagi do źródła pl

- m7-l1:76 „Taki bet zarabia na lepszych rękach.” — dwuznaczne (kto zarabia?); de („Mit so einer Bet verdienen die besseren Hände”) i en rozstrzygają tak samo: zarabiają lepsze ręce.
- m7-l4:57 „Gdy znów czeka, dostaje darmową kartę…” — podmiot domyślny (Button) po zdaniu o Buttonie, choć opcja dotyczy czekania gracza; przekład wiernie zachowuje tę konstrukcję.

## Ocena ogólna

Przekład jest merytorycznie wierny: nie znalazłem zmienionej liczby, ręki, kierunku zalecenia ani poprawnej odpowiedzi, a klucze znaczników zgadzają się ze źródłem poza jednym nadmiarowym `{{t:value}}` (m7-l1:137). Jedyna nieścisłość sensu to „verteidigst weiter” za „bronisz szerzej” (m7-l4:108). Główny problem to niespójność między plikami, które wyglądają na tłumaczone osobno: egzamin używa „geöffnet”, „Straight”, „Two Pair”, „zweites Paar”, „Size” wbrew terms-nazwy.yaml i lekcjom, a m7-l2 i m7-l4 mają rodzaj męski „der Bet” i (m7-l2) czasownik „betten” wobec „die Bet”/„setzen” w pozostałych — te dwa ostatnie wymagają decyzji dla całego korpusu.
