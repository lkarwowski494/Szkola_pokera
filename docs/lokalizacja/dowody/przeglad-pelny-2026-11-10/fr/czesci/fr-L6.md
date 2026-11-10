# fr-L6: francuski (fr), lekcje `content/fr/lessons/m8-*.md` (4 pliki) i egzamin `content/fr/exams/m8.yaml`

Przegląd niezależny, źródło: te same pliki w `content/pl/`. Terminologia: `content/fr/terms-nazwy.yaml`. Dodatkowo mechaniczne porównanie kluczy znaczników `{{t:…}}`, `{{n:…}}`, `[[…]]`, pól `table`, `answer`, `correct`, `sizeError` linia po linii (jedyna różnica: m8-l3:55).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/fr/lessons/m8-l1-value.md | tak | 140 |
| content/fr/lessons/m8-l2-ile-blefow.md | tak | 144 |
| content/fr/lessons/m8-l3-blokery.md | tak | 119 |
| content/fr/lessons/m8-l4-bluff-catching.md | tak | 137 |
| content/fr/exams/m8.yaml | tak | 94 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | WYS | m8-l3-blokery.md:55 | La grosse blinde checke à la river | La {{t:big-blind\|grosse blinde}} checke à la river | zgubiony znacznik `{{t:big-blind}}` (pl: „{{t:big-blind\|Duży blind}} czeka”); sens bez zmian | wysoka | tak |
| 2 | ŚR | m8-l1-value.md:131 | un solveur mise la thin value jusqu'à env. 1/4 du pot | …mise la thin value en descendant jusqu'à env. 1/4 du pot | pl „betuje thin value nawet ok. 1/4 puli” (aż tak mało); „jusqu'à” czyta się jako górną granicę | średnia | tak |
| 3 | NISKIE | m8-l1-value.md:131 | sous 1/2 {{t:pot\|pot}} | sous 1/2 du {{t:pot\|pot}} | brak „du” | wysoka | tak |
| 4 | ŚR | m8-l2-ile-blefow.md:101 | des mains hauteur sans chance | des cartes hautes sans chance | pl „wysokie karty bez szans”; „mains hauteur” bez nazwy karty niegramatyczne; high-card = „carte haute” | wysoka | tak |
| 5 | ŚR | m8-l2-ile-blefow.md:139 | des mains hauteur sans chance | des cartes hautes sans chance | jak nr 4 | wysoka | tak |
| 6 | NISKIE | m8-l2-ile-blefow.md:126 | \| 1/2 {{t:pot}} \| | \| 1/2 du {{t:pot}} \| | niespójne z sąsiednimi wierszami („1/3 du”, „3/4 du”) | wysoka | tak |
| 7 | NISKIE | m8-l4-bluff-catching.md:80 | Vous n'avez que hauteur sept | Vous n'avez qu'une hauteur sept | brak rodzajnika (por. m8-l1:99) | wysoka | tak |
| 8 | ŚR | m8-l3-blokery.md:89 | {{t:value\|pour la valeur}} | {{t:value\|pour la value}} | termin value = „value” (terms-nazwy; l1, l2, l4 mają „value”) | wysoka | tak |
| 9 | ŚR | m8-l3-blokery.md:77 | Vous bloquez sa valeur | Vous bloquez sa value | jak nr 8 (por. m8-l4:70 „vous bloquez sa value”) | średnia | tak |
| 10 | ŚR | exams/m8.yaml:22 | Vous perdez de la valeur | Vous perdez de la value | jak nr 8 (por. m8-l1:82) | wysoka | tak |
| 11 | ŚR | exams/m8.yaml:34 | mains de valeur et | mains de value et | jak nr 8 | wysoka | tak |
| 12 | ŚR | exams/m8.yaml:36 | {{t:value\|pour la valeur}} | {{t:value\|de value}} | jak nr 8 (por. m8-l2:92) | wysoka | tak |
| 13 | ŚR | exams/m8.yaml:38 | {{t:value\|pour la valeur}} | {{t:value\|de value}} | jak nr 8 (por. m8-l2:94) | wysoka | tak |
| 14 | ŚR | exams/m8.yaml:57 | qui bloque sa valeur | qui bloque sa value | jak nr 8 | średnia | tak |
| 15 | ŚR | exams/m8.yaml:82 | une partie de la valeur du Button | une partie de la value du Button | jak nr 8 | średnia | tak |
| 16 | ŚR | exams/m8.yaml:83 | Il reste plus de valeur dans ses mises | Il reste plus de value dans ses mises | jak nr 8 (por. m8-l4:61) | średnia | tak |
| 17 | ŚR | exams/m8.yaml:92 | {{t:value\|pour la valeur}} | {{t:value\|pour la value}} | jak nr 8 | wysoka | tak |
| 18 | ŚR | exams/m8.yaml:29 | d'autant d'equity | d'autant d'équité | termin equity = „équité” (terms-nazwy; lekcje M8 mają „équité”) | wysoka | tak |
| 19 | ŚR | exams/m8.yaml:72 | d'equity | d'équité | jak nr 18 | wysoka | tak |
| 20 | ŚR | exams/m8.yaml:73 | Votre equity est | Votre équité est | jak nr 18 | wysoka | tak |
| 21 | NISKIE | exams/m8.yaml:20 | c'est du thin value | c'est de la thin value | rodzaj „thin value”: w m8-l1 żeński | wysoka | tak |
| 22 | NISKIE | exams/m8.yaml:21 | Misez le thin value plus petit | Misez la thin value plus petit | jak nr 21 | wysoka | tak |
| 23 | ŚR | m8-l4 (cały plik) wobec m8-l1–l3 i exams/m8 | {{t:call\|payer}}, {{t:call\|Je paie}}, {{t:call\|payez}}… | suivre / call (jak w l1–l3 i egzaminie) albo decyzja korpusowa | niespójny odpowiednik „call”: l4 konsekwentnie „payer”, reszta modułu „suivre/call”; w l1 „payer” oddaje pl „zapłacić”, więc w l4 zaciera się rozróżnienie; sens zaleceń bez zmian | wysoka | nie |
| 24 | ŚR | m8-l1:47, 57, 67; exams/m8:17, 43, 79, 82, 83, 88 wobec m8-l4 | le Button / du Button | le Bouton / du Bouton (jak w l4; terms-nazwy: button = „bouton”) | niespójna nazwa pozycji w obrębie modułu; w korpusie fr przeważa „Bouton” (ok. 234 wobec 89 „Button”) — ujednolicenie korpusowe | wysoka | nie |
| 25 | NISKIE | m8-l2:90, 92, 94 wobec m8-l3 i exams/m8 | {{t:combo\|combos}} | {{t:combo\|combinaisons}} (albo odwrotnie) | niespójna forma terminu combo w module (l2 „combos”, l3 i egzamin „combinaisons”); terms-nazwy: „combo” [DO USTALENIA] | wysoka | nie |
| 26 | NISKIE | m8-l1, m8-l2, m8-l4 „ratés” wobec m8-l3, exams/m8 „manqués” | tirages ratés / tirages manqués | jedna forma | „nietrafione drawy” oddane dwojako; oba poprawne, tylko niespójność | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- m8-l1:129 „Thin value (valeur fine)”: glosa pl „cienka wartość”; czy francuski czytelnik rozpoznaje „valeur fine”, czy lepiej „value fine” (spójnie z terminem „value”).
- m8-l1:16 „sa main est finale” (pl „jego ręka jest gotowa”): zrozumiałe, ale nietypowe; ewentualnie „sa main est définitive”.
- m8-l3:15, 22, 31, 36, 40, 102 „de AK”, „de AA”: bez elizji („d'AK”, „d'AA”); obie pisownie spotykane, konsekwentne w pliku.
- m8-l1:81 „La plupart des calls sont alors meilleurs que vous” (pl „większość sprawdzeń jest lepsza od ciebie”): kalka źródła, zrozumiała; ewentualnie „viennent alors de mains meilleures que la vôtre” (jak w l1:61).
- `{{t:mdf}}` bez formy (m8-l2:31 „la {{t:mdf}}”): klucza `mdf` nie ma w `terms-nazwy.yaml`; sprawdzić, co się wyświetla (w l4 użyto formy „MDF”).

## Uwagi do źródła pl

- exams/m8.yaml:10 (q1): odpowiedź „Nie, czekam” ma uzasadnienie zaczynające się od „Tak: liczysz tylko…”; zestawienie „Nie… / Tak:” może mylić (fr wiernie: „Non, je checke” / „Oui : …”).
- m8-l1:77 i m8-l3:55: „czeka” bez znacznika `{{t:check|…}}`, choć w analogicznych zdaniach znacznik jest (fr wiernie bez znacznika).
- m8-l1:131: „betuje thin value nawet ok. 1/4 puli” jest dwuznaczne (nawet tak mało / nawet tyle), co przeniosło się do przekładu (znalezisko 2).

## Ocena ogólna

Przekład jest wierny: wszystkie liczby, ręce, stoły, poprawne odpowiedzi, kierunki zaleceń i klucze znaczników zgadzają się ze źródłem, z jednym zgubionym znacznikiem (m8-l3:55). Francuszczyzna jest naturalna i poprawna, forma „vous” spójna. Główna słabość to niespójność terminologii między plikami modułu (wyraźnie różne ręce tłumaczy: value/valeur, équité/equity, suivre/payer, Button/Bouton, combos/combinaisons), bez wpływu na sens merytoryczny. Brak znalezisk KRYT; treść krytyczna (M12) nie wchodziła w zakres.
