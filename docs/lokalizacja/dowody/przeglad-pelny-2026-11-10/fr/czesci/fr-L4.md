# fr-L4: francuski (fr), lekcje `content/fr/lessons/m6-*.md` (3 pliki) i egzamin `content/fr/exams/m6.yaml`

Przegląd niezależny, 2026-11-10. Źródło: te same pliki w `content/pl/`. Terminologia: `content/fr/terms-nazwy.yaml`. Moduł 6 nie zawiera treści krytycznej (M12).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/fr/lessons/m6-l1-mdf-alpha.md | tak | 136 |
| content/fr/lessons/m6-l2-sprawdzenie.md | tak | 134 |
| content/fr/lessons/m6-l3-check-raise.md | tak | 139 |
| content/fr/exams/m6.yaml | tak | 96 |

Znaczniki `{{t:…}}` i `{{n:…}}` porównane linia po linii ze źródłem: zestaw kluczy zgodny we wszystkich czterech plikach, żadnej liczby wpisanej cyfrą zamiast `{{n:…}}`. Poprawne odpowiedzi (`correct: true`, `sizeError`, `answer`) i tabele (`hand`, `board`, `position`) bez zmian względem pl.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m6-l1-mdf-alpha.md:56 | sans son {{t:call\|paiement}} au dénominateur | sans son {{t:call\|call}} au dénominateur | forma „paiement” dla call niespójna (wszędzie „suivre”/„call”), a „paiement” to przyjęta nazwa `payout`; zdanie o mianowniku staje się niejasne | wysoka | tak |
| 2 | ŚR | m6-l1-mdf-alpha.md:92 | (KQ, brelans) | (KQ, sets) | pl „sety”; terms-nazwy: set = „set”, brelan = three-of-a-kind; w m6-l3:102, 129 „sets” | wysoka | tak |
| 3 | ŚR | exams/m6.yaml:28 | pas autant moins que vous voulez | mais pas aussi peu que vous le voulez | konstrukcja niegramatyczna (pl „nie dowolnie mniej”) | wysoka | tak |
| 4 | ŚR | exams/m6.yaml:94 | {{t:two-pair\|deux paires}} | {{t:two-pair\|doubles paires}} | terms-nazwy: „double paire”; w m6-l3 „doubles paires” | wysoka | tak |
| 5 | ŚR | exams/m6.yaml:54 | Vous avez As hauteur, sans | Vous avez une hauteur As, sans | kalka „ace high”; w korpusie i w użyciu „hauteur As” | średnia | tak |
| 6 | ŚR | exams/m6.yaml:57 | As hauteur bat … donc vous le défendez | Une hauteur As bat … donc vous la défendez | jw. | średnia | tak |
| 7 | ŚR | exams/m6.yaml:58 | As hauteur se défend | une hauteur As se défend | jw. | średnia | tak |
| 8 | ŚR | exams/m6.yaml:78 | As hauteur sans | Une hauteur As sans | jw. | średnia | tak |
| 9 | ŚR | m6-l2:74, 127 wobec m6-l3:63, 64, 73, 74 | l2: „implied odds”; l3: „cotes implicites” | jedna nazwa w module | to samo pojęcie (pl wszędzie „implied odds”) ma dwie nazwy w sąsiednich lekcjach; terms-nazwy: „cote implicite”, ale lekcje M7 (definicja pojęcia) i większość korpusu mają „implied odds” (34× wobec 10×) — wybór dla całego korpusu | wysoka | nie |
| 10 | ŚR | m6-l2 (6, 18, 54, 85, 91, 94, 112, 114), exams/m6.yaml:27, 29 wobec m6-l1 | „hors position” | „hors de position” | terms-nazwy: „hors de position”; m6-l1 używa „hors de position”, m6-l2 i egzamin „hors position” (korpus: 45× wobec 33×) — wybór dla całego korpusu | wysoka | nie |
| 11 | NISKIE | m6-l2-sprawdzenie.md:55 | à la turn, vous ferez | au turn, vous ferez | rodzaj „turn”: terms-nazwy „le turn”, m6-l1 i m6-l3 „au turn” (korpus: 100× „au turn”, 12× „à la turn”) | wysoka | tak |
| 12 | NISKIE | m6-l2-sprawdzenie.md:64 | un pique à la turn et | un pique au turn et | jw. | wysoka | tak |
| 13 | NISKIE | m6-l2-sprawdzenie.md:74 | le gutshot à la turn dans | le gutshot au turn dans | jw. | wysoka | tak |
| 14 | NISKIE | m6-l2-sprawdzenie.md:94 | en premier à la turn et | en premier au turn et | jw. | wysoka | tak |
| 15 | NISKIE | m6-l2-sprawdzenie.md:127 | votre chance à la turn. Cette | votre chance au turn. Cette | jw. | wysoka | tak |
| 16 | NISKIE | m6-l2-sprawdzenie.md:76 | tout votre tapis | tout votre stack | pl „cały stack”; terms-nazwy: stack = „stack” | średnia | tak |
| 17 | NISKIE | m6-l2-sprawdzenie.md:98 | {{t:raise\|relancé}} préflop | {{t:raise\|relancé}} preflop | terms-nazwy: „preflop” (korpus 104× wobec 39×) | średnia | tak |
| 18 | NISKIE | m6-l2-sprawdzenie.md:134 | ne sont plus {{t:call\|suivies}}, mais couchées | passent du {{t:call\|call}} au fold | pl „przechodzą ze sprawdzenia do pasa”; „mains suivies” niezręczne (sprawdza się zakład, nie rękę) | średnia | tak |
| 19 | NISKIE | exams/m6.yaml:18 | L’alpha, c’est le reste jusqu’au total | L’alpha en est le complément | kalka „reszta do całości”; w m6-l1:30 „le complément” | średnia | tak |
| 20 | NISKIE | m6-l1-mdf-alpha.md:31 | C'est l'équité nécessaire pour {{t:call\|suivre}} avec une seule main | C'est l'équité requise pour … | „potrzebne equity”: w M2, rules.yaml i m6-l2 „équité requise”, w m6-l1 „équité nécessaire” | średnia | tak |
| 21 | NISKIE | m6-l1-mdf-alpha.md:40 | l'équité nécessaire pour {{t:call\|suivre}} | l'équité requise pour {{t:call\|suivre}} | jw. | średnia | tak |
| 22 | NISKIE | m6-l1-mdf-alpha.md:72 | L'équité nécessaire indique | L'équité requise indique | jw. | średnia | tak |
| 23 | NISKIE | m6-l1-mdf-alpha.md:118 | Équité nécessaire \| | Équité requise \| | jw. (nagłówek tabeli; w m6-l2:104 „Équité requise”) | średnia | tak |
| 24 | NISKIE | m6-l1-mdf-alpha.md:126 | n'est pas l'équité nécessaire | n'est pas l'équité requise | jw. (nagłówek sekcji) | średnia | tak |
| 25 | NISKIE | m6-l1-mdf-alpha.md:128 | L'équité nécessaire vue en M2 | L'équité requise vue en M2 | jw. (odwołanie do M2, gdzie pojęcie nazywa się „équité requise”) | średnia | tak |
| 26 | NISKIE | m6-l1:92–94, m6-l2/l3 (opcje), exams/m6.yaml:37–39, 57–58 | l1: „Je paie” / „Je me couche” / „Je relance”; l2, l3: „Suivre” / „Se coucher”; egzamin: „Je suis” / „Je me couche” | jedna forma etykiet odpowiedzi | pl wszędzie 1. os. („Sprawdzam”, „Pasuję”); w fr trzy różne konwencje, w tym „Je paie” i „Je suis” dla tego samego call — wybór dla całego korpusu | wysoka | nie |
| 27 | NISKIE | m6-l3-check-raise.md:92, 93 wobec m6-l2:84 | l3: „tirage quinte backdoor”, „tirage backdoor”; l2: „tirage quinte supplémentaire” | jedna forma | to samo zdanie pl („słaby dodatkowy draw”) oddane dwojako; m6-l2 wprowadza „tirage supplémentaire (backdoor)” | średnia | nie |
| 28 | NISKIE | exams/m6.yaml (22 linie) wobec lekcji | apostrof typograficzny ’ w egzaminie, prosty ' w lekcjach | jedna konwencja | typografia niespójna między plikami modułu — decyzja dla całego korpusu | wysoka | nie |

Razem: KRYT 0, WYS 0, ŚR 10 (8 z poprawką JSON), NISKIE 18 (15 z poprawką JSON). Poprawek JSON: 23.

## Do sprawdzenia przez człowieka znającego język

- „{{t:fold|abandons}}” (m6-l1:61, 63, 64) jako rzeczownik „pasy”: zrozumiałe, ale poza tym miejscem fold to „se coucher”/„fold”; ewentualnie „folds”.
- „Je {{t:call|suis}}” (exams/m6.yaml:38, 57): poprawne, ale homonimiczne z „je suis” (jestem); w m6-l1 „Je paie”. Patrz znalezisko 26.
- „fait des c-bets large” (m6-l2:95): przysłówkowe „large” po rzeczowniku w liczbie mnogiej; żargon pokerowy to dopuszcza („c-bet large”), do oceny.
- „hauteur As” (znaleziska 5–8): pewność średnia co do rodzajnika („une hauteur As” jak w innych plikach korpusu, albo bez rodzajnika: „Vous avez hauteur As”).
- m6-l2:65 „vos mains et vos {{t:draw|tirages}} les plus forts ({{t:flush|couleur}}, …)”: w pl „najsilniejszymi rękami i drawami (kolor, OESD)” przymiotnik odnosi się do rąk; fr rozciąga „les plus forts” także na drawy. Sens zalecenia bez zmiany.

## Uwagi do źródła pl

- m6-l2:65, m6-l3:26, 93, 123: w nawiasach po „drawami” źródło używa `{{t:flush}}` („kolor”) w znaczeniu drawa do koloru; przekład raz to wyjaśnia („tirages couleur”, l3:26, 93), raz zostawia („couleur”, l2:65, l3:123). Klucz `flush-draw` byłby ściślejszy.
- „implied odds” w pl jest bez znacznika `{{t:implied-odds}}`, stąd rozjazd nazw w przekładach (znalezisko 9).

## Ocena ogólna

Przekład jest wierny: liczby, ręce, stoły, kierunki zaleceń, poprawne odpowiedzi i wszystkie znaczniki zgadzają się ze źródłem, nie znalazłem błędu zmieniającego sens (brak KRYT i WYS). Francuszczyzna jest naturalna i poprawna, z jednym zdaniem niegramatycznym w egzaminie (nr 3). Główna słabość to niespójność między czterema plikami, wyraźnie tłumaczonymi osobno: „hors position / hors de position”, „au turn / à la turn”, „implied odds / cotes implicites”, „équité requise / nécessaire”, forma etykiet odpowiedzi i apostrofy.
