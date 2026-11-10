# de-L6: niemiecki (de), lekcje m8-* (4) i egzamin m8.yaml

Recenzja niezależna, względem `content/pl/` (te same pliki, linia w linię). Terminologia: `content/de/terms-nazwy.yaml`. Zgodność kluczy znaczników `{{t:…}}`, `{{n:…}}`, `[[…]]`, pól `table`, `answer`, `correct`, `sizeError` sprawdzona dodatkowo skryptem linia po linii.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/de/lessons/m8-l1-value.md | tak | 140 |
| content/de/lessons/m8-l2-ile-blefow.md | tak | 144 |
| content/de/lessons/m8-l3-blokery.md | tak | 119 |
| content/de/lessons/m8-l4-bluff-catching.md | tak | 137 |
| content/de/exams/m8.yaml | tak | 94 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | WYS | m8-l1-value.md:17 | folden schlechtere Hände meist | {{t:fold\|folden}} schlechtere Hände meist | zgubiony znacznik `t:fold` (pl: „gorsze ręce zwykle {{t:fold\|pasują}}”) | wysoka | tak |
| 2 | WYS | m8-l1-value.md:50 | {{t:street\|Streets}} gecallt hat | {{t:street\|Streets}} {{t:call\|gecallt}} hat | zgubiony znacznik `t:call` (pl: „{{t:call\|sprawdził}} dwie {{t:street\|ulice}}”) | wysoka | tak |
| 3 | ŚR | m8-l1-value.md:107 | Wenn du aus {{t:position\|Position}} bettest | Wenn du in {{t:position\|Position}} bettest | „z pozycji” = mając pozycję; „aus Position” to kalka, dwuznaczna (blisko „out of position”); niżej w lekcji „in Position” | średnia | tak |
| 4 | ŚR | m8-l1-value.md:131 | geht er aus {{t:position\|Position}} selten | geht er in {{t:position\|Position}} selten | jak nr 3 | średnia | tak |
| 5 | ŚR | m8-l2-ile-blefow.md:109, 113, 119 | Bluffcatcher | Bluff-Catcher | pisownia terminu niespójna z m8-l4 i egzaminem (3 miejsca) | wysoka | tak (3) |
| 6 | ŚR | m8-l2-ile-blefow.md:90, 92, 94 | {{t:combo\|Combos}} | {{t:combo\|Kombinationen}} | terms-nazwy: combo = „Kombination”; tak w m8-l3 i egzaminie (3 miejsca) | wysoka | tak (3) |
| 7 | ŚR | m8-l2-ile-blefow.md:101, 139 | {{t:straight\|Straight}} | {{t:straight\|Straße}} | terms-nazwy: straight = „Straße”; tak w m8-l1 i egzaminie (2 miejsca) | wysoka | tak (2) |
| 8 | ŚR | m8-l2-ile-blefow.md:142 | {{t:exploit\|Exploits}} bei Microstakes | {{t:exploit\|Exploits}} auf den Mikrolimits | „mikrostawki” w korpusie de to „Mikrolimits” (18×), „Microstakes” tylko tu | wysoka | tak |
| 9 | NISKIE | m8-l2-ile-blefow.md:15, 22 (2×), 38, 40 (2×), 45, 47, 48, 56, 119 (2×), 121, 131 (2×), 135 (2×) | ein Bet / jeder dritte Bet / ein kleiner Bet / ein Overbet … der | eine Bet / jede dritte Bet / eine kleine Bet / eine Overbet … die | rodzaj terminu: terms-nazwy podaje r. żeński („eine Bet”), tak m8-l1 i m8-l4; tu konsekwentnie r. męski — niespójność wewnątrz modułu (17 miejsc) | wysoka | tak (17) |
| 10 | NISKIE | m8-l3-blokery.md:17 (2×), 58 | Ein kleiner Bet, der einen großen Bet / ein sogenannter Blocking Bet / deinen Bet | Eine kleine Bet, die eine große Bet / eine sogenannte Blocking Bet / deine Bet | jak nr 9 (3 poprawki) | wysoka | tak (3) |
| 11 | NISKIE | exams/m8.yaml:8, 10, 11, 12, 20, 21, 22 (2×), 37 (2×), 91, 92, 93 | deinen Bet / Der Bet / einen Bet / Ein Bet … | deine Bet / Die Bet / eine Bet / Eine Bet … | jak nr 9 (13 miejsc) | wysoka | tak (13) |
| 12 | NISKIE | m8-l1-value.md:96; exams/m8.yaml:82, 83 | Flush Draw / Flush Draws | Flush-Draw / Flush-Draws | pisownia wg terms-nazwy („Flush-Draw”), tak w m8-l3 i m8-l4 | wysoka | tak (3) |
| 13 | NISKIE | m8-l1-value.md:71, 121; exams/m8.yaml:46 | Ass-high / König hoch | Ass-hoch / König-hoch | ta sama nazwa układu zapisana trzema sposobami (m8-l3: „Ass-hoch”) | średnia | tak (3) |
| 14 | NISKIE | m8-l1 (50, 70, 81) i cały zakres | {{t:two-pair\|Two Pair}} | (zwei Paare) | terms-nazwy podaje „zwei Paare”, w korpusie obie formy [WIELE FORM]; wybór dla całego korpusu | średnia | nie |
| 15 | NISKIE | m8-l4 i egzamin (29×), terms-nazwy | Bluff-Catcher | (Bluff Catcher) | terms-nazwy: „Bluff Catcher” (bez łącznika), korpus niemal wszędzie „Bluff-Catcher”; do ujednolicenia razem z terms-nazwy | średnia | nie |
| 16 | NISKIE | m8-l3-blokery.md:70, 75, 87 wobec m8-l2:139, exams/m8.yaml:48, 93 | Showdown-Wert / Showdown-Value | jedna forma | dwie nazwy tego samego pojęcia w module; kierunek ujednolicenia to wybór | średnia | nie |
| 17 | NISKIE | m8-l1:70, 80, 81 wobec exams/m8.yaml:20, 21, 91 | Achten, Vieren / Siebener, Vierer, Achter | jedna forma | dwie formy nazw rang (obie poprawne), niespójne między lekcją a egzaminem | średnia | nie |
| 18 | NISKIE | m8-l2 (cały plik) wobec pozostałych | auf dem River | am River | m8-l2 pisze „auf dem River”, pozostałe pliki „am River”; obie formy poprawne, różnica stylu między tłumaczami | średnia | nie |

Razem: WYS 2, ŚR 11 miejsc (nr 3–8), NISKIE 39 miejsc z poprawką (nr 9–13) oraz 5 uwag bez poprawki (nr 14–18). KRYT: 0.

## Do sprawdzenia przez człowieka znającego język

- „kommt bei null heraus” (m8-l2:56, 65, 67, 113, 135) i „kommt auf null heraus” (m8-l4:114) za „wychodzi na zero”: zrozumiałe, ale brzmi jak kalka; rodzimy gracz powiedziałby raczej „ist break-even” albo „geht plus/minus null aus”. Dodatkowo dwie różne formy przyimka.
- exams/m8.yaml:79 „Die Herzen sind nicht angekommen” (pl „Kiery nie weszły”): liczba mnoga koloru karcianego to raczej „die Herz-Karten” albo, jak w m8-l4, konstrukcja „Die Pik sind nicht gekommen”; „Herzen” brzmi nietypowo.
- m8-l1:127 nagłówek „Thin Value: klein, aber bezahlt” (pl „mało, ale za cenę”): sens źródła sam jest skrótowy; warto ocenić, czy niemiecki nagłówek jest czytelny.
- m8-l2:129 „1,5 {{t:pot|Pots}}” przy sąsiednich „1/3 Pot”, „1/2 Pot”: forma liczby mnogiej poprawna, ale odstaje od reszty tabeli.
- m8-l1:89 „mit {{t:position|Position}} zeigt der Gegner …” (pl „z pozycji”): powiązane ze znaleziskami 3–4; tu przekład jest zrozumiały, ale „in Position” byłoby spójniejsze.

## Uwagi do źródła pl

Brak.

## Ocena ogólna

Przekład jest merytorycznie wierny: liczby, ręce, stoły, kierunki zaleceń, poprawne odpowiedzi i uzasadnienia zgadzają się ze źródłem we wszystkich pięciu plikach, a klucze `{{n:…}}` i `[[…]]` są kompletne. Jedyne błędy blokujące to dwa zgubione znaczniki terminów w m8-l1. Reszta to niespójność między plikami, widoczna jak praca różnych tłumaczy: m8-l2 odstaje terminologicznie (Bluffcatcher, Combos, Straight, Microstakes, „auf dem River”), a rodzaj gramatyczny „Bet” jest żeński w m8-l1 i m8-l4, męski w m8-l2, m8-l3 i egzaminie. Język jest poza tym naturalny i poprawny, forma „du” spójna.
