# de-L8: niemiecki (de), lekcje m10-* (4) i egzamin m10.yaml

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m10-l1-statystyki.md | tak | 132 |
| content/de/lessons/m10-l2-typy-graczy.md | tak | 144 |
| content/de/lessons/m10-l3-odejscie-od-bazy.md | tak | 131 |
| content/de/lessons/m10-l4-rake.md | tak | 128 |
| content/de/exams/m10.yaml | tak | 83 |

Każdy plik czytany obok `content/pl/…` (ta sama liczba linii). Dodatkowo mechaniczne porównanie zestawu znaczników `{{t:…}}` / `{{n:…}}` linia po linii oraz pól strukturalnych (id, family, rules, answer, table, params): bez różnic; `correct: true` w egzaminie 7 = 7, przy tych samych opcjach co w pl.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | NISKIE | lessons/m10-l2-typy-graczy.md:29 | aus Online-Micro-Stakes (NL25) | aus Online-Mikrolimits (NL25) | m10-l2:29 prompt: „mikrostawki” w m10-l3 i m10-l4 to „Mikrolimits” (stakes = Limit); tu jedyny raz „Micro-Stakes”. | wysoka | tak |
| 2 | NISKIE | lessons/m10-l2-typy-graczy.md:41 | Pocket-{{t:pair\|Paaren}} | Pocket {{t:pair\|Pairs}} | m10-l2:41 why: hybryda „Pocket-Paaren”; przyjęta nazwa to „Pocket Pair”. | wysoka | tak |
| 3 | ŚR | lessons/m10-l2-typy-graczy.md:116 | einer großen Online-Plattform, NL25 6-max | eines großen Online-Pokerraums, NL25 6-max | m10-l2:116: „sala” to w m10-l1, m10-l4 i egzaminie „Pokerraum” (28×); tu „Online-Plattform” — niespójny termin. | wysoka | tak |
| 4 | ŚR | lessons/m10-l2-typy-graczy.md:121 | \| Fold auf 3-Bet \| | \| Fold to 3-Bet \| | m10-l2:121 tabela: nazwa statystyki wszędzie indziej (m10-l1, m10-l3, egzamin) to „Fold to 3-Bet”. | wysoka | tak |
| 5 | ŚR | lessons/m10-l2-typy-graczy.md:139 | lässt ihn mit sehr starken Händen betten und | lässt ihn betten, wenn du eine sehr starke Hand hast, und | m10-l2:139: dwuznaczne — po niemiecku czyta się, jakby to maniak miał bardzo silne ręce; pl: z bardzo silnymi rękami (twoimi) pozwalasz mu betować. | średnia | tak |
| 6 | ŚR | lessons/m10-l2-typy-graczy.md:142 | (eine große Online-Plattform, NL25–NL100 | (ein großer Online-Pokerraum, NL25–NL100 | m10-l2:142 note: „sala” = „Pokerraum” jak w pozostałych plikach modułu. | wysoka | tak |
| 7 | NISKIE | lessons/m10-l3-odejscie-od-bazy.md:51 | Nur mit einer großen Größe, weil | Nur mit einer großen Bet, weil | m10-l3:51 text: niezręczne „großen Größe” (pl: „Tylko dużym rozmiarem”). | średnia | tak |
| 8 | NISKIE | lessons/m10-l3-odejscie-od-bazy.md:122 | Trainer in zwei Lernmaterialien | Trainer in zwei Trainingsmaterialien | m10-l3:122: „materiały szkoleniowe” to w m10-l1 i m10-l2 „Trainingsmaterialien”; ujednolicenie. | wysoka | tak |
| 9 | ŚR | lessons/m10-l3-odejscie-od-bazy.md:129 | (ein großer Online-Anbieter, | (ein großer Online-Pokerraum, | m10-l3:129 note: „sala” = „Pokerraum” jak w pozostałych plikach modułu (trzeci wariant: Online-Anbieter). | wysoka | tak |
| 10 | NISKIE | lessons/m10-l3-odejscie-od-bazy.md:129 | Empfehlungen aus zwei Lernmaterialien | Empfehlungen aus zwei Trainingsmaterialien | m10-l3:129 note: „materiały szkoleniowe” = „Trainingsmaterialien” jak w m10-l1 i m10-l2. | wysoka | tak |
| 11 | NISKIE | lessons/m10-l4-rake.md:102 | : ein Mehrfaches weniger, als er | : um ein Mehrfaches weniger, als er | m10-l4:102: „ein Mehrfaches weniger” jest niegramatyczne; poprawnie „um ein Mehrfaches weniger”. | wysoka | tak |
| 12 | NISKIE | exams/m10.yaml:10 | eine Pflichtzahlung ist | ein Pflichteinsatz ist | m10.exam.q1 opcja 2 text: w m10-l1 „wpłata obowiązkowa” to „Pflichteinsatz”; ujednolicenie. | wysoka | tak |
| 13 | NISKIE | exams/m10.yaml:10 | also eine freiwillige Zahlung, die | also ein freiwilliger Einsatz, der | m10.exam.q1 opcja 2 why: w m10-l1 „dobrowolna wpłata” to „freiwilliger Einsatz”; ujednolicenie. | wysoka | tak |
| 14 | ŚR | exams/m10.yaml:12 | freiwillige Einzahlungen | freiwillige Einsätze | m10.exam.q1 opcja 4 why: „Einzahlung” to po niemiecku wpłata na konto (depozyt), nie żetony włożone do puli; w m10-l1 „freiwillige Einsätze”. | wysoka | tak |
| 15 | ŚR | exams/m10.yaml:17 | -mal einen C-Bet bekommen | -mal eine C-Bet bekommen | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q2 prompt. | wysoka | tak |
| 16 | ŚR | exams/m10.yaml:26 | und einem 3-Bet entsteht | und einer 3-Bet entsteht | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q3 opcja 1 why. | wysoka | tak |
| 17 | ŚR | exams/m10.yaml:38 | auf einen 3-Bet selten | auf eine 3-Bet selten | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q4 opcja 3 why. | wysoka | tak |
| 18 | ŚR | exams/m10.yaml:56 | in Richtung eines Bets | in Richtung einer Bet | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q6 opcja 3 why. | wysoka | tak |
| 19 | ŚR | exams/m10.yaml:61 | Welcher C-Bet ohne Hand | Welche C-Bet ohne Hand | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 prompt. | wysoka | tak |
| 20 | ŚR | exams/m10.yaml:63 | Nur der kleine, 1/3 | Nur die kleine, 1/3 | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 1 text. | wysoka | tak |
| 21 | ŚR | exams/m10.yaml:63 | Ein C-Bet von 1/3 | Eine C-Bet von 1/3 | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 1 why. | wysoka | tak |
| 22 | ŚR | exams/m10.yaml:63 | break-even, einer von 3/4 | break-even, eine von 3/4 | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 1 why. | wysoka | tak |
| 23 | ŚR | exams/m10.yaml:63 | reicht nur für den kleinen | reicht nur für die kleine | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 1 why. | wysoka | tak |
| 24 | ŚR | exams/m10.yaml:64 | Ein großer C-Bet riskiert | Eine große C-Bet riskiert | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 2 why. | wysoka | tak |
| 25 | ŚR | exams/m10.yaml:65 | Nur der große, weil er stärker | Nur die große, weil sie stärker | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 3 text. | wysoka | tak |
| 26 | ŚR | exams/m10.yaml:65 | auf einen großen Bet öfter | auf eine große Bet öfter | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 3 why. | wysoka | tak |
| 27 | ŚR | exams/m10.yaml:65 | verliert ein großer C-Bet ohne Hand, weil er | verliert eine große C-Bet ohne Hand, weil sie | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 3 why. | wysoka | tak |
| 28 | ŚR | exams/m10.yaml:66 | Keiner, weil der Gegner | Keine, weil der Gegner | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 4 text. | wysoka | tak |
| 29 | ŚR | exams/m10.yaml:66 | Für einen C-Bet von 1/3 | Für eine C-Bet von 1/3 | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q7 opcja 4 why. | wysoka | tak |
| 30 | ŚR | exams/m10.yaml:73 | auf den 3-Bet; gegen ihn | auf die 3-Bet; gegen ihn | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q8 opcja 1 text. | wysoka | tak |
| 31 | ŚR | exams/m10.yaml:73 | Ein 3-Bet auf | Eine 3-Bet auf | Rodzaj: „Bet/C-Bet/3-Bet” jest w terms-nazwy.yaml i we wszystkich lekcjach m10 rodzaju żeńskiego (die Bet, eine C-Bet, eine 3-Bet); egzamin używa męskiego. m10.exam.q8 opcja 1 why. | wysoka | tak |
| 32 | ŚR | lessons/m10-l2-typy-graczy.md (10×, m.in. :52, :61, :70, :80, :99, :105, :108, :130, :137, :139); exams/m10.yaml:34, :36, :37, :52, :54, :56, :71 | Basisstrategie | Basis | Niespójny termin na „bazę”: m10-l1 i m10-l3 (tytuł „Abweichen von der Basis”) mają „Basis”, m10-l2 i egzamin „Basisstrategie”. Sens ten sam; wybór jednej nazwy dotyczy całego korpusu (w lekcjach de: „der Basis” 18×, „Basisstrategie” 10×). | wysoka | nie |
| 33 | NISKIE | lessons/m10-l2-typy-graczy.md:99, :112, :116, :118, :142 | Stats / Durchschnittsstats / Stat | Statistiken / Statistik | m10-l1, m10-l3 i egzamin mają „Statistik(en)”, m10-l2 skrót „Stats”. Zrozumiałe, tylko niejednolite. | wysoka | nie |

## Do sprawdzenia przez człowieka znającego język

- m10-l1:130 „Die Fehlerformel ist eine Rechnung.”, m10-l4:126 „Die Equity-Schwelle ist eine Rechnung.”, m10-l3:129 „Die {{t:alpha}}-Schwellen sind Rechnung.” — pl „to rachunek” oznacza szczebel źródła (matematyka, nie opinia). Po niemiecku zrozumiałe, ale mało idiomatyczne; możliwe „ist reine Mathematik” / „ist reine Rechnung”. Bez poprawki (styl, jedna decyzja dla całego korpusu).
- m10-l3 (wielokrotnie): nieprzechodnie „verdient” („die C-Bet verdient sofort”, „eine 3-Bet verdient ohne Hand”) jako odpowiednik „zarabia”; egzamin ma „ist profitabel”, m10-l2 „bringt Gewinn”. Zrozumiałe, lekko kalkowe; do decyzji stylistycznej.
- m10-l2:112 „ein {{t:vpip}} im Zehnerbereich” za „kilkanaście procent” — sens (10–19) oddany, sformułowanie rzadkie; ewentualnie „zwischen 10 und 20 Prozent”.
- „dopłaca do dużego blinda”: egzamin q1 „ergänzt auf den Big Blind”, m10-l4:123 „ohne zum Big Blind aufzufüllen” — oba poprawne, dwa różne czasowniki na to samo zagranie; warto ujednolicić z modułem 3 (poza zakresem tej części).
- m10-l1:49 „± {{n:var.z95}} Fehler” — czytelniej „± {{n:var.z95}} Standardfehler”; preferencja, bez poprawki.

## Uwagi do źródła pl

- m10-l3:49 i exams/m10.yaml:63 (pl): „Fold to c-bet łączy wszystkie rozmiary i stoły”, a w treści lekcji m10-l3:109 „łączy wszystkie rozmiary i flopy”. Przekład wiernie oddaje „Tische”; jeśli w źródle chodziło o flopy (boardy), „stoły” jest mylące i przeniosło się do de (i en: „tables”).

## Ocena ogólna

Przekład jest merytorycznie wierny: nie znalazłem żadnej zmiany liczby, ręki, pozycji, kierunku zalecenia, przeczenia ani poprawnej odpowiedzi, a znaczniki zgadzają się ze źródłem we wszystkich pięciu plikach (0 znalezisk KRYT i WYS). Słabością jest spójność między plikami, które wyglądają na tłumaczone osobno: egzamin używa rodzaju męskiego dla Bet/C-Bet/3-Bet wbrew terms-nazwy.yaml i lekcjom, „sala” ma trzy warianty (Pokerraum / Online-Plattform / Online-Anbieter), „baza” dwa (Basis / Basisstrategie). Język jest naturalny i poprawny, poza pojedynczymi niezręcznościami.
