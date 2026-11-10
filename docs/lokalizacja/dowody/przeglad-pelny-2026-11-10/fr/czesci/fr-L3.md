# fr-L3: francuski (fr), lekcje m5 (4 pliki) i egzamin m5

Przegląd niezależny, 2026-11-10. Źródło: te same pliki w `content/pl/`. Terminologia: `content/fr/terms-nazwy.yaml`. Zgodność kluczy znaczników `{{t:…}}`, `{{n:…}}` i zapisów kart `[[…]]` sprawdzona dodatkowo skryptem linia po linii (wszystkie pliki mają tę samą liczbę linii co pl).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/fr/lessons/m5-l1-tekstury.md | tak | 110 |
| content/fr/lessons/m5-l2-przewagi.md | tak | 101 |
| content/fr/lessons/m5-l3-czestotliwosc-rozmiar.md | tak | 135 |
| content/fr/lessons/m5-l4-bez-pozycji.md | tak | 108 |
| content/fr/exams/m5.yaml | tak | 101 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | WYS | m5-l3:130 | Une main non pairée rate le flop | Une main sans {{t:pair\|paire}} rate le flop | zgubiony znacznik `{{t:pair\|…}}` (pl „Ręka bez {{t:pair\|pary}}”); sens zachowany, brakuje tylko znacznika | wysoka | tak (walidator zgłasza zmianę znaczników: celowa) |
| 2 | ŚR | m5-l3:76 | Le flop est {{t:monotone\|monochrome}} | {{t:monotone\|monocolore}} | niespójny termin: w m5-l1 i egzaminie „monocolore” (nazwa przyjęta w terms-nazwy), w m5-l3 wszędzie „monochrome” | wysoka | tak |
| 3 | ŚR | m5-l3:80 | Sur un flop {{t:monotone\|monochrome}}, un gros | {{t:monotone\|monocolore}} | jak nr 2 | wysoka | tak |
| 4 | ŚR | m5-l3:118 | {{t:paired\|Pairé}} et {{t:monotone\|monochrome}} | {{t:monotone\|monocolore}} | jak nr 2 (nagłówek) | wysoka | tak |
| 5 | ŚR | m5-l3:120 | Sur un flop {{t:monotone\|monochrome}}, p. ex. | {{t:monotone\|monocolore}} | jak nr 2 | wysoka | tak |
| 6 | ŚR | m5-l3:122 | un flop {{t:monotone\|monochrome}} est toujours | {{t:monotone\|monocolore}} | jak nr 2 | wysoka | tak |
| 7 | ŚR | m5-l3:133 | ; {{t:monotone\|monochrome}} | ; {{t:monotone\|monocolore}} | jak nr 2 (note) | wysoka | tak |
| 8 | ŚR | exams/m5:99 | {{t:monotone\|monotones}} | {{t:monotone\|monocolores}} | trzecia nazwa tego samego pojęcia; „monotone” po francusku znaczy „jednostajny”; w tym samym zdaniu znacznik bez formy daje „monocolore” | wysoka | tak |
| 9 | ŚR | m5-l1:74 | (bilatéral ou ventral) | (bilatéral ou gutshot) | pl „otwarty albo gutshot”; przyjęta nazwa to „gutshot”, „ventral” występuje w korpusie fr tylko tutaj | wysoka | tak |
| 10 | ŚR | m5-l1:29 | une {{t:pair\|paire}} au {{t:board\|tableau}} | sur le {{t:board\|board}} | niespójny termin: przyjęta nazwa „board”, tak w m5-l2, m5-l3 i egzaminie; m5-l1 ma „tableau” | średnia | tak |
| 11 | ŚR | m5-l1:37 | trois cœurs au {{t:board\|tableau}} | sur le {{t:board\|board}} | jak nr 10 | średnia | tak |
| 12 | ŚR | m5-l1:38 | trois sont déjà au {{t:board\|tableau}} | sur le {{t:board\|board}} | jak nr 10 | średnia | tak |
| 13 | ŚR | m5-l1:58 | les trois cartes du {{t:board\|tableau}} | du {{t:board\|board}} | jak nr 10 | średnia | tak |
| 14 | ŚR | m5-l2:27 | {{t:overpair\|overpairs}} | {{t:overpair\|overpaires}} | przyjęta nazwa „overpaire”; forma angielska | wysoka | tak |
| 15 | ŚR | m5-l4:27 | vous réalisez son equity | son équité | przyjęta nazwa „équité”; egzamin m5 q9 ma „équité” | wysoka | tak |
| 16 | ŚR | exams/m5:38 | six hauteurs différentes | six rangs différents | pl „sześć różnych rang”; ranga = „rang” w m5-l1 i m5-l4:63 („quatre rangs différents”); „hauteur” w m5-l1 oznacza wysokość flopa | wysoka | tak |
| 17 | ŚR | m5-l4 (13, 16, 17, 18, 32, 35, 43, 53, 72, 99) i exams/m5 (9, 19, 22, 47, 59, 60, 75, 85, 95) | le Button | le Bouton | niespójna nazwa pozycji: m5-l2 i m5-l3 mają „Bouton” (13×, zgodnie z terms-nazwy „bouton”), m5-l4 i egzamin „Button” (24×); wybór dotyczy całego korpusu (Button 117×, Bouton 272×) | wysoka | nie |
| 18 | NISKIE | m5-l4 (5, 16, 23, 26, 27, 35, 95, 97, 99, 106), exams/m5:66 | hors position | hors de position | przyjęta nazwa „hors de position”; w egzaminie znacznik bez formy (linie 68, 70) wyświetla „hors de position”, a linia 66 ma formę „Hors position”; oba warianty poprawne, wybór w całym korpusie | średnia | nie |
| 19 | NISKIE | exams/m5 (17 wystąpień w 14 liniach, np. 9, 12, 59, 68) | a {{t:call\|payé}} | a {{t:call\|suivi}} | lekcje m5 oddają call wyłącznie przez „suivre” (39×), egzamin wyłącznie przez „payer” (17×); oba poprawne po francusku, niespójność między lekcją a egzaminem | średnia | nie |
| 20 | NISKIE | m5-l1:76 | qu'aucune paire de cartes ne tient dans | que deux cartes ne tiennent jamais dans | pl „żadne dwie”; „paire de cartes” myli się z układem „paire”; m5-l1:28 ma „combinaison de deux cartes” | średnia | tak |
| 21 | NISKIE | m5-l3:51 | de mains hauteur as qui | de mains avec un as qui | pl „rąk z asem”; „hauteur as” to „as wysoka” (ręka bez pary), węższe niż źródło | średnia | tak |
| 22 | NISKIE | m5-l3:133 | résultats de solvers | résultats de solveurs | w tym samym akapicie i pliku „solveurs” | wysoka | tak |
| 23 | NISKIE | m5-l4:47 | le {{t:bluff}} doit passer les deux | doit passer face aux deux | pl „musi przejść przez obu”; „passer les deux” niegramatyczne; egzamin q8 ma „passer face aux deux adversaires” | średnia | tak |
| 24 | NISKIE | m5-l4:103 | doit passer tout le monde | doit passer face à tous | pl „musi przejść przez wszystkich”; jak nr 23; egzamin q4 ma „passe rarement face à tous” | średnia | tak |
| 25 | NISKIE | m5-l3:16 i m5-l4:75 (oraz 35, 46, 56 wobec m5-l3:51, 61, 81) | „Je {{t:check\|checke}} plus souvent…” / „{{t:check\|Checker}} plus souvent…” | jedna forma | ta sama opcja tego samego ćwiczenia (rodzina m5.cbet.btn-vs-bb) raz w 1. osobie, raz w bezokoliczniku; pl ma wszędzie „Czekam”; wybór stylu | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- „sans aucune main” (m5-l3:86, 93, 130) za pl „bez żadnej ręki”: dosłowna kalka, po francusku naturalniej „sans rien en main”. Ten sam zwrot jest w `rules.yaml`, m6-l1 i m10-l3 (9× w korpusie), więc ewentualna zmiana tylko w całym korpusie.
- „avec une main sans chance” (m5-l3:100) za pl „z ręką bez szans”: egzamin m5 q5 (linia 47) ma naturalniejsze „une main sans aucune chance”; „main sans chance” występuje 13× w korpusie.
- „soit à l'équilibre” (m5-l3:86, 93, 130; exams/m5:47) za pl „wychodził na zero”: zrozumiałe, ale m10-l3 oddaje to samo przez „atteigne le point mort”; czy „à l'équilibre” nie myli się z równowagą GTO.
- „L'as compte aussi comme un un” (m5-l1:72): poprawne, ale zbitka „un un” czyta się źle; może „comme un 1”.
- „le solveur {{t:out-of-position\|hors position}} {{t:check\|checke}}” (m5-l4:35): szyk dosłowny z pl („solver bez pozycji czeka”); może „hors position, le solveur checke”.
- m5-l3:102: przekład ma o jedno wystąpienie `{{t:fold\|…}}` więcej niż źródło (pl „potrzebuje pasa” bez znacznika); zestaw kluczy ten sam, bez wpływu na sens.

## Uwagi do źródła pl

- m5-l2:72 (q-miss-means, why 2): „rywal bez pary … czasem ma parę z ręki” jest wewnętrznie niezręczne (chodzi o parę w ręce startowej); przekład „a parfois une paire en main” oddaje to wiernie.
- m5-l1:108: „T-9-5-4” wśród przykładów flopów ma cztery karty; przekład powtarza zapis bez zmian.

## Ocena ogólna

Przekład jest wierny: nie znalazłem zmienionej liczby, ręki, kart, kierunku zalecenia ani poprawnej odpowiedzi, a klucze znaczników zgadzają się poza jednym zgubionym `{{t:pair}}` (m5-l3:130). Główna słabość to niespójność terminów między plikami modułu, które wyglądają na tłumaczone osobno: monocolore / monochrome / monotones, board / tableau, Bouton / Button, suivre / payer, hors position / hors de position. Język jest naturalny i poprawny gramatycznie, z kilkoma drobnymi kalkami.
