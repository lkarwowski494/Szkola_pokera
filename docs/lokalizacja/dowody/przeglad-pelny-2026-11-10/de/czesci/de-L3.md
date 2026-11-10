# de-L3: niemiecki (de), lekcje m5-* (4) i egzamin m5.yaml

Recenzja niezależna względem `content/pl/`; terminologia według `content/de/terms-nazwy.yaml`. Klucze znaczników `{{t:…}}`, `{{n:…}}` i karty `[[…]]` porównane dodatkowo mechanicznie linia po linii (jedyne różnice: znaleziska 5 i 6).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m5-l1-tekstury.md | tak | 110 |
| content/de/lessons/m5-l2-przewagi.md | tak | 101 |
| content/de/lessons/m5-l3-czestotliwosc-rozmiar.md | tak | 135 |
| content/de/lessons/m5-l4-bez-pozycji.md | tak | 108 |
| content/de/exams/m5.yaml | tak | 101 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | lessons/m5-l1-tekstury.md:34 | Der Flop ist {{t:monotone\|einfarbig}}: | Der Flop ist {{t:monotone\|monoton}}: | m5.l1.q-monotone prompt: termin monotone: terms-nazwy.yaml ma „monoton”, tak też m5-l3 i egzamin m5; w m5-l1 „einfarbig” (jedna nazwa na jedno pojęcie) | wysoka | tak |
| 2 | ŚR | lessons/m5-l1-tekstury.md:39 | Auf einem {{t:monotone\|einfarbigen}} kann | Auf einem {{t:monotone\|monotonen}} kann | m5.l1.q-monotone opcja 3 why: termin monotone: terms-nazwy.yaml ma „monoton”, tak też m5-l3 i egzamin m5; w m5-l1 „einfarbig” (jedna nazwa na jedno pojęcie) | wysoka | tak |
| 3 | ŚR | lessons/m5-l1-tekstury.md:66 | **{{t:monotone\|einfarbiger}}** | **{{t:monotone\|monotoner}}** | m5-l1 sekcja Farben (definicja): termin monotone: terms-nazwy.yaml ma „monoton”, tak też m5-l3 i egzamin m5; w m5-l1 „einfarbig” (jedna nazwa na jedno pojęcie) | wysoka | tak |
| 4 | ŚR | lessons/m5-l1-tekstury.md:103 | Ein {{t:monotone\|einfarbiger}} Flop ist immer | Ein {{t:monotone\|monotoner}} Flop ist immer | m5-l1 akapit o K72 two-tone: termin monotone: terms-nazwy.yaml ma „monoton”, tak też m5-l3 i egzamin m5; w m5-l1 „einfarbig” (jedna nazwa na jedno pojęcie) | wysoka | tak |
| 5 | NISKIE | lessons/m5-l2-przewagi.md:16 | vor dem Flop {{t:raise\|geraist}}, und seine breite | vor dem Flop geraist, und seine breite | m5.l2.q-k72 opcja 1 why: nadmiarowy znacznik t:raise, źródło pl ma tu „przebiłby” bez znacznika (poprawka usuwa dodany znacznik) | wysoka | tak |
| 6 | NISKIE | lessons/m5-l2-przewagi.md:37 | die stärksten, die er {{t:raise\|geraist}} hätte | die stärksten, die er geraist hätte | m5.l2.q-capped opcja 2 why: nadmiarowy znacznik t:raise, źródło pl ma „przebiłby” bez znacznika (poprawka usuwa dodany znacznik) | wysoka | tak |
| 7 | NISKIE | lessons/m5-l2-przewagi.md:46 | Über eine große Größe entscheidet | Über eine große Bet-Größe entscheidet | m5.l2.q-kinds opcja 2 why: niezręczne „große/größere Größe” | średnia | tak |
| 8 | NISKIE | lessons/m5-l2-przewagi.md:92 | kannst du mit einer größeren Größe betten | kannst du größer betten | m5-l2 sekcja Nuts-Vorteil: niezręczne „große/größere Größe” | średnia | tak |
| 9 | ŚR | lessons/m5-l3-czestotliwosc-rozmiar.md:122 | (in der App meist mittlere) | (in der App meist mittelnasse) | m5-l3 akapit „Achtung”: pl „pośrednich” to kategoria mokrości, w m5-l1 nazwana „mittelnass”; „mittlere” oznacza w m5-l1 wysokość flopa (mittlerer Flop = walet/dziesiątka), więc zmienia odniesienie | wysoka | tak |
| 10 | NISKIE | lessons/m5-l3-czestotliwosc-rozmiar.md:122 | Die größere Größe aus dem vorigen Abschnitt | Die größere Bet-Größe aus dem vorigen Abschnitt | m5-l3 akapit „Achtung”: niezręczne „große/größere Größe” | średnia | tak |
| 11 | NISKIE | lessons/m5-l3-czestotliwosc-rozmiar.md:106 | (fortsetzende {{t:bet\|Bet}}) | (Continuation {{t:bet\|Bet}}) | m5-l3 pierwszy akapit: rozwinięcie skrótu C-Bet to po niemiecku „Continuation Bet”; „fortsetzende Bet” jest kalką nieużywaną w języku | średnia | tak |
| 12 | ŚR | lessons/m5-l4-bez-pozycji.md:13 | und {{t:connected\|connected}} | und {{t:connected\|verbunden}} | m5.l4.q-oop-plan prompt: forma angielska; terms-nazwy.yaml i reszta modułu (także why tej samej odpowiedzi) mają „verbunden” | wysoka | tak |
| 13 | ŚR | lessons/m5-l4-bez-pozycji.md:90 | öfter {{t:two-pair\|Two Pair}} oder eine {{t:straight\|Straight}} hat | öfter {{t:two-pair\|zwei Paare}} oder eine {{t:straight\|Straße}} hat | m5.l4.c-review why.check: terminy two-pair i straight; terms-nazwy.yaml oraz ten sam tekst w m5.l3.c-btn mają „zwei Paare” i „Straße” | wysoka | tak |
| 14 | ŚR | lessons/m5-l4-bez-pozycji.md:92 | öfter {{t:two-pair\|Two Pair}} oder eine {{t:straight\|Straight}} getroffen | öfter {{t:two-pair\|zwei Paare}} oder eine {{t:straight\|Straße}} getroffen | m5.l4.c-review why.big: terminy two-pair i straight; terms-nazwy.yaml oraz ten sam tekst w m5.l3.c-btn mają „zwei Paare” i „Straße” | wysoka | tak |
| 15 | ŚR | exams/m5.yaml:19 | {{t:two-pair\|Two Pair}} | {{t:two-pair\|zwei Paare}} | m5.exam.q2 prompt: termin two-pair; terms-nazwy.yaml i lekcje m5-l2, m5-l3 mają „zwei Paare” | wysoka | tak |
| 16 | ŚR | exams/m5.yaml:66 | {{t:out-of-position\|Ohne Position}} gegen einen Spieler | {{t:out-of-position\|Out of Position}} gegen einen Spieler | m5.exam.q7 prompt: termin out-of-position: terms-nazwy.yaml i m5-l4 mają „out of Position”, egzamin „ohne Position” | średnia | tak |
| 17 | ŚR | exams/m5.yaml:68 | {{t:out-of-position\|ohne Position}} gibt | {{t:out-of-position\|out of Position}} gibt | m5.exam.q7 opcja 1 why: termin out-of-position: terms-nazwy.yaml i m5-l4 mają „out of Position”, egzamin „ohne Position” | średnia | tak |
| 18 | ŚR | exams/m5.yaml:70 | Nein: {{t:out-of-position\|Ohne Position}} | Nein: {{t:out-of-position\|Out of Position}} | m5.exam.q7 opcja 3 why: termin out-of-position: terms-nazwy.yaml i m5-l4 mają „out of Position”, egzamin „ohne Position” | średnia | tak |
| 19 | NISKIE | exams/m5.yaml:32 | weil ein großer {{t:bet\|Bet}} viel | weil eine große {{t:bet\|Bet}} viel | m5.exam.q3 opcja 2 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 20 | NISKIE | exams/m5.yaml:47 | damit dieser {{t:bet\|Bet}} bei null | damit diese {{t:bet\|Bet}} bei null | m5.exam.q5 prompt: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 21 | NISKIE | exams/m5.yaml:51 | für einen kleinen C-Bet | für eine kleine C-Bet | m5.exam.q5 opcja 2 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 22 | NISKIE | exams/m5.yaml:51 | Ein größerer Bet riskiert mehr, also muss er öfter | Eine größere Bet riskiert mehr, also muss sie öfter | m5.exam.q5 opcja 2 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 23 | NISKIE | exams/m5.yaml:52 | Rentabilitätsschwelle des Bets | Rentabilitätsschwelle der Bet | m5.exam.q5 opcja 3 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 24 | NISKIE | exams/m5.yaml:68 | du seinen {{t:bet\|Bet}} oder | du seine {{t:bet\|Bet}} oder | m5.exam.q7 opcja 1 text: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 25 | NISKIE | exams/m5.yaml:69 | auf jeden {{t:bet\|Bet}} | auf jede {{t:bet\|Bet}} | m5.exam.q7 opcja 2 text: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 26 | NISKIE | exams/m5.yaml:69 | mit jedem {{t:bet\|Bet}} gewinnen | mit jeder {{t:bet\|Bet}} gewinnen | m5.exam.q7 opcja 2 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 27 | NISKIE | exams/m5.yaml:69 | {{t:call\|callen}} den {{t:bet\|Bet}} des Gegners | {{t:call\|callen}} die {{t:bet\|Bet}} des Gegners | m5.exam.q7 opcja 2 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 28 | NISKIE | exams/m5.yaml:75 | zuerst auf den C-Bet? | zuerst auf die C-Bet? | m5.exam.q8 prompt: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 29 | NISKIE | exams/m5.yaml:88 | Deinen {{t:bet\|Bet}} | Deine {{t:bet\|Bet}} | m5.exam.q9 opcja 1 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 30 | NISKIE | exams/m5.yaml:90 | Ein kleiner {{t:bet\|Bet}} gibt | Eine kleine {{t:bet\|Bet}} gibt | m5.exam.q9 opcja 3 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 31 | NISKIE | exams/m5.yaml:99 | „großer Bet“ | „große Bet“ | m5.exam.q10 opcja 2 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski (w m5-l3 to samo zdanie: „große Bet“) | wysoka | tak |
| 32 | NISKIE | exams/m5.yaml:100 | Ein Bet in Höhe | Eine Bet in Höhe | m5.exam.q10 opcja 3 why: rodzaj rzeczownika Bet: terms-nazwy.yaml i lekcje m5 mają rodzaj żeński (eine Bet, die C-Bet), w egzaminie męski | wysoka | tak |
| 33 | NISKIE | exams/m5.yaml:95 | Wenn du c-bettest, mit welcher Größe? | Wenn du überhaupt c-bettest, mit welcher Größe? | m5.exam.q10 prompt: pl „Gdy już c-betujesz” (jeśli w ogóle); przekład gubi „już” | średnia | tak |
| 34 | ŚR | lessons/m5-l1-tekstury.md:39, 66, 103 | {{t:two-tone\|zweifarbigen}} / {{t:two-tone\|zweifarbiger}} / {{t:two-tone\|zweifarbige}} | forma zgodna z terms-nazwy („Two-Tone”) albo zmiana nazwy w terms-nazwy na „zweifarbig” | terms-nazwy.yaml ma dla two-tone „Two-Tone” (oznaczone DO USTALENIA); w m5-l1 konsekwentnie „zweifarbig”. Wybór terminu w całym korpusie, nie pojedyncza poprawka | średnia | nie |
| 35 | ŚR | lessons/m5-l1-tekstury.md:70, 74, 76, 84, 103 | {{t:straight-draw\|Straßen-Draw}} | „Straight-Draw” (terms-nazwy) albo zmiana nazwy w terms-nazwy na „Straßen-Draw” | terms-nazwy.yaml ma „Straight-Draw” (WIELE FORM); m5-l1 używa „Straßen-Draw” (spójne ze „Straße”), m5-l3:59 i :116 opisowo „Draws auf eine Straße”. Wybór terminu w korpusie | średnia | nie |
| 36 | NISKIE | lessons/m5-l4-bez-pozycji.md:13, 16 | mittelhoch / mittelhoher | „mittlerer Flop” jak w definicji m5-l1:62 (albo odwrotnie) | wysokość „średni” nazwana w m5-l1 „mittlerer Flop”, w m5-l4 „mittelhoch”; sens ten sam, nazwa niespójna | średnia | nie |
| 37 | NISKIE | lessons/m5-l4-bez-pozycji.md (m.in. 26, 36, 37, 57, 85, 90, 99, 103), exams/m5.yaml (m.in. 29, 31, 32, 78, 79, 88, 98) | setzen / setzt / Setze | betten / bettest (jak w m5-l1–l3) | pl „betować” oddane w m5-l1–l3 przez „betten”, w m5-l4 i egzaminie przez „setzen”; oba poprawne, niespójne w obrębie modułu. Decyzja korpusowa | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- m5-l2:80 „Das ist die Ergänzung zur vorherigen Zahl” (pl „dopełnienie”): zrozumiałe, ale w rachunku prawdopodobieństwa naturalniejsze byłoby „Gegenwahrscheinlichkeit” / „Komplement”.
- exams/m5.yaml:70 „checkst du oft deine ganze Range” (dopełnienie bliższe) wobec m5-l4:99 „checkst du … mit deiner gesamten Range”: czy forma przechodnia jest akceptowalna w tekście dydaktycznym.
- m5-l4:16, 25, 35 „mit Position gecallt” wobec exams/m5.yaml:59, 66, 68 „in Position gecallt” (pl „sprawdził z pozycji”): która forma ma być przyjęta.
- m5-l3:116 i exams/m5.yaml:88, 90 „mittlere Hände” (pl „ręce średnie”) wobec m5-l2:54 „mittelstarke Hände”: czy ujednolicić na „mittelstarke”.
- exams/m5.yaml:47 „bei null rauskommt” (potoczne) wobec m5-l3:86, 93, 130 „plus/minus null ergibt” dla tego samego „wychodził na zero”.

## Uwagi do źródła pl

- Ten sam przypadek ćwiczenia cbet (R-M5-007, why.big) ma w pl dwa brzmienia: m5-l3:26 „Większy bet spasuje mniej więcej te same ręce” i m5-l4:85 „Większy bet nie spasuje więcej rąk”; podobnie R-M5-004 why.small: m5-l3:39 z „po wcześniejszym czekaniu”, m5-l4:91 bez. Przekład de wiernie oddaje obie wersje.
- Liczba wpisana słownie w pl exams/m5.yaml:38 („sześć różnych rang”) i m5-l4:63 („cztery różne rangi”) nie idzie przez `{{n:…}}`; przekład zgodny ze źródłem.

## Ocena ogólna

Przekład jest merytorycznie wierny: w pięciu plikach nie znaleziono zmienionej liczby, ręki, flopa, kierunku zalecenia ani poprawnej odpowiedzi, a zestawy znaczników zgadzają się ze źródłem poza dwoma nadmiarowymi `t:raise` w m5-l2. Słabą stroną jest spójność: pliki wyglądają na tłumaczone w różnych przebiegach (m5-l1 „einfarbig” wobec „monoton”, m5-l4 „Two Pair / Straight / connected” wobec „zwei Paare / Straße / verbunden”, egzamin z „der Bet” i „ohne Position” wobec „die Bet” i „out of Position”). Jedyne miejsce, gdzie niespójność zmienia odniesienie, to m5-l3:122 („mittlere” zamiast „mittelnasse”). Język jest naturalny i poprawny; brak znalezisk KRYT i WYS.
