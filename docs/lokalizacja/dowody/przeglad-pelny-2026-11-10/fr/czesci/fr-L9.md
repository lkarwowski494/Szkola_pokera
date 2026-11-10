# fr-L9: francuski (fr), lekcje m11-l1…l3 oraz egzaminy m11 i m13

Recenzja niezależna, źródło `content/pl` linia w linię; terminologia wg `content/fr/terms-nazwy.yaml`. Formaty liczb sprawdzone w `content/numbers.yaml` (jednostki `percent`, `bb`, `count`).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/fr/lessons/m11-l1-push-fold.md | tak | 178 |
| content/fr/lessons/m11-l2-sprawdzanie.md | tak | 176 |
| content/fr/lessons/m11-l3-icm.md | tak | 169 |
| content/fr/exams/m11.yaml | tak | 86 |
| content/fr/exams/m13.yaml | tak | 91 |

## Znaleziska

Nie znaleziono błędów KRYT ani WYS: wszystkie liczby, klucze `{{n:…}}`, ręce, pozycje, kierunki zaleceń i poprawne odpowiedzi (`correct: true`) zgadzają się ze źródłem; zestaw kluczy `{{t:…}}` zgodny poza nr 26.

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | lessons/m11-l1-push-fold.md:63 | `à environ {{n:m11.push.15}} mains. K2o` | `à environ {{n:m11.push.15}} des mains. K2o` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 2 | ŚR | lessons/m11-l1-push-fold.md:91 | `{{n:m11.push.10-ante}} mains." }` | `{{n:m11.push.10-ante}} des mains." }` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 3 | ŚR | lessons/m11-l1-push-fold.md:152 | `avec environ {{n:m11.push.15}} mains, à` | `avec environ {{n:m11.push.15}} des mains, à` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 4 | ŚR | lessons/m11-l1-push-fold.md:156 | `{{n:m11.3max.push.btn}} mains, et la` | `{{n:m11.3max.push.btn}} des mains, et la` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 5 | ŚR | lessons/m11-l1-push-fold.md:174 | `{{n:m11.push.10-ante}} mains (le` | `{{n:m11.push.10-ante}} des mains (le` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 6 | ŚR | lessons/m11-l1-push-fold.md:72 | `a aussi de l'equity quand` | `a aussi de l'équité quand` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne w module (fold equity zostaje) | wysoka | tak |
| 7 | ŚR | lessons/m11-l1-push-fold.md:74 | `Sans equity, il vous faut` | `Sans équité, il vous faut` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne w module (fold equity zostaje) | wysoka | tak |
| 8 | ŚR | lessons/m11-l1-push-fold.md:82 | `a toujours plus d'equity"` | `a toujours plus d'équité"` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne w module (fold equity zostaje) | wysoka | tak |
| 9 | ŚR | lessons/m11-l1-push-fold.md:82 | `L'equity d'une main ne dépend` | `L'équité d'une main ne dépend` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne w module (fold equity zostaje) | wysoka | tak |
| 10 | ŚR | lessons/m11-l1-push-fold.md:170 | `tout comme l'equity de votre main` | `tout comme l'équité de votre main` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne w module (fold equity zostaje) | wysoka | tak |
| 11 | NISKIE | lessons/m11-l1-push-fold.md:74 | `Il suffit qu'il {{t:fold\|se couche}}` | `Il suffit qu'elle {{t:fold\|se couche}}` | podmiotem w pytaniu jest „la grosse blinde” (elle), nie „il” | średnia | tak |
| 12 | NISKIE | lessons/m11-l1-push-fold.md:156 | `depuis le Button, il reste` | `depuis le Bouton, il reste` | pozycja: terms-nazwy.yaml button = „bouton”; w m11-l2 i egzaminach „le Bouton”, tu angielskie „Button” (niespójność w module) | średnia | tak |
| 13 | NISKIE | lessons/m11-l1-push-fold.md:156 | `chacun, le Button part` | `chacun, le Bouton part` | pozycja: terms-nazwy.yaml button = „bouton”; w m11-l2 i egzaminach „le Bouton”, tu angielskie „Button” (niespójność w module) | średnia | tak |
| 14 | NISKIE | lessons/m11-l1-push-fold.md:156 | `quand le Button {{t:fold\|s'est couché}}, avec` | `quand le Bouton {{t:fold\|s'est couché}}, avec` | pozycja: terms-nazwy.yaml button = „bouton”; w m11-l2 i egzaminach „le Bouton”, tu angielskie „Button” (niespójność w module) | średnia | tak |
| 15 | NISKIE | lessons/m11-l1-push-fold.md:166 | `: Button {{n:m11.jamfold3.btn}}` | `: Bouton {{n:m11.jamfold3.btn}}` | pozycja: terms-nazwy.yaml button = „bouton”; w m11-l2 i egzaminach „le Bouton”, tu angielskie „Button” (niespójność w module) | średnia | tak |
| 16 | ŚR | lessons/m11-l2-sprawdzanie.md:67 | `(env. {{n:m11.push.15}} mains)` | `(env. {{n:m11.push.15}} des mains)` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 17 | ŚR | lessons/m11-l2-sprawdzanie.md:67 | `à env. {{n:m11.call.15}} mains.` | `à env. {{n:m11.call.15}} des mains.` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 18 | ŚR | lessons/m11-l2-sprawdzanie.md:74 | `avec env. {{n:m11.push.10}} mains, mais` | `avec env. {{n:m11.push.10}} des mains, mais` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 19 | ŚR | lessons/m11-l2-sprawdzanie.md:86 | `env. {{n:m11.call.10-ante}} mains au lieu` | `env. {{n:m11.call.10-ante}} des mains au lieu` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 20 | ŚR | lessons/m11-l2-sprawdzanie.md:110 | `avec env. {{n:m11.3max.call.bb-two}} mains, et quand` | `avec env. {{n:m11.3max.call.bb-two}} des mains, et quand` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 21 | ŚR | lessons/m11-l2-sprawdzanie.md:111 | `Le solveur ne {{t:call\|suit}} qu'avec env. {{n:m11.3max.call.bb-two}} mains` | `Le solveur ne {{t:call\|suit}} qu'avec env. {{n:m11.3max.call.bb-two}} des mains` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 22 | ŚR | lessons/m11-l2-sprawdzanie.md:140 | `avec env. {{n:m11.push.10}} mains, et la` | `avec env. {{n:m11.push.10}} des mains, et la` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 23 | ŚR | lessons/m11-l2-sprawdzanie.md:154 | `{{n:m11.3max.call.sb}} mains, bien` | `{{n:m11.3max.call.sb}} des mains, bien` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 24 | ŚR | lessons/m11-l2-sprawdzanie.md:160 | `{{n:m11.3max.call.bb-two}} mains. Contre` | `{{n:m11.3max.call.bb-two}} des mains. Contre` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 25 | ŚR | lessons/m11-l2-sprawdzanie.md:168 | `{{t:call\|suit}} avec env. {{n:m11.call.10-ante}} mains` | `{{t:call\|suit}} avec env. {{n:m11.call.10-ante}} des mains` | liczba jest procentem (np. „60 %”), po francusku wymagane „des mains”; „X % mains” jest niegramatyczne (pl: „ok. X rąk”) | wysoka | tak |
| 26 | ŚR | lessons/m11-l2-sprawdzanie.md:168 | `l'adversaire {{t:shove\|fait}} aussi {{t:shove\|tapis}} plus large` | `l'adversaire {{t:shove\|fait tapis}} plus large lui aussi` | jeden znacznik źródła ({{t:shove\|pushuje}}) rozbity na dwa; formy „fait” i „tapis” osobno nie oznaczają terminu. Poprawka scala znacznik (ten sam klucz shove, liczba wystąpień 2→1 jak w pl) | wysoka | tak |
| 27 | ŚR | lessons/m11-l2-sprawdzanie.md:57 | `qu'à l'abattage, et contre une {{t:range\|range}}` | `qu'au showdown, et contre une {{t:range\|range}}` | termin: terms-nazwy.yaml showdown = „showdown” (tak w m11-l1 i egzaminie m11); „abattage” niespójne w module | wysoka | tak |
| 28 | ŚR | lessons/m11-l2-sprawdzanie.md:59 | `jusqu'à l'abattage` | `jusqu'au showdown` | termin: terms-nazwy.yaml showdown = „showdown” (tak w m11-l1 i egzaminie m11); „abattage” niespójne w module | wysoka | tak |
| 29 | ŚR | lessons/m11-l2-sprawdzanie.md:76 | `qu'à l'abattage, et contre des mains déjà` | `qu'au showdown, et contre des mains déjà` | termin: terms-nazwy.yaml showdown = „showdown” (tak w m11-l1 i egzaminie m11); „abattage” niespójne w module | wysoka | tak |
| 30 | ŚR | lessons/m11-l2-sprawdzanie.md:134 | `qu'à l'abattage, et contre des mains que` | `qu'au showdown, et contre des mains que` | termin: terms-nazwy.yaml showdown = „showdown” (tak w m11-l1 i egzaminie m11); „abattage” niespójne w module | wysoka | tak |
| 31 | NISKIE | lessons/m11-l2-sprawdzanie.md:140 | `la table d'un site de formation donne` | `le tableau d'un site de formation donne` | „table” w znaczeniu tabeli to anglicyzm (tu myli się ze stołem); m11-l1:152 ma „le tableau d'un site de formation” | średnia | tak |
| 32 | ŚR | lessons/m11-l3-icm.md:80 | `pour ne pas perdre la tête"` | `pour ne pas perdre la première place"` | pl „żeby nie stracić prowadzenia”; „perdre la tête” to po francusku przede wszystkim idiom „stracić głowę / oszaleć”, dwuznaczne | wysoka | tak |
| 33 | ŚR | lessons/m11-l3-icm.md:80 | `Le leader prend le moins de risques à la table.` | `C'est le leader qui risque le moins à la table.` | pl „Lider ma najmniejsze ryzyko przy stole” (stan, nie zachowanie); „prend le moins de risques” sugeruje, że lider gra najostrożniej, co przeczy uzasadnieniu | wysoka | tak |
| 34 | NISKIE | lessons/m11-l3-icm.md:161 | `quand le bouton et la` | `quand le Bouton et la` | nazwa pozycji wielką literą jak w m11-l2 i egzaminach („le Bouton”) | średnia | tak |
| 35 | ŚR | exams/m11.yaml:25 | `a aussi besoin d'equity pour` | `a aussi besoin d'équité pour` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne | wysoka | tak |
| 36 | ŚR | exams/m11.yaml:41 | `pourcentage d'equity avez-vous` | `pourcentage d'équité avez-vous` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne | wysoka | tak |
| 37 | ŚR | exams/m11.yaml:59 | `Votre equity est actuellement` | `Votre équité est actuellement` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne | wysoka | tak |
| 38 | ŚR | exams/m11.yaml:64 | `d'equity suffit pour` | `d'équité suffit pour` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne | wysoka | tak |
| 39 | ŚR | exams/m11.yaml:66 | `Equity requise = BF` | `Équité requise = BF` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne | wysoka | tak |
| 40 | ŚR | exams/m11.yaml:68 | `élève toujours l'equity requise` | `élève toujours l'équité requise` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne | wysoka | tak |
| 41 | ŚR | exams/m11.yaml:75 | `nettement plus d'equity qu'en` | `nettement plus d'équité qu'en` | termin: terms-nazwy.yaml equity = „équité” (tak w m11-l2, m11-l3, m13); samodzielne „equity” niespójne | wysoka | tak |
| 42 | NISKIE | exams/m13.yaml:37 | `ni règle ni résultat du solver.` | `ni règle ni résultat du solveur.` | „solver” zamiast „solveur” (wszędzie indziej w pliku i module „solveur”) | wysoka | tak |
| 43 | NISKIE | exams/m13.yaml:37 | `il y a un résultat du solver.` | `il y a un résultat du solveur.` | „solver” zamiast „solveur” | wysoka | tak |
| 44 | ŚR | lessons/m11-l1, m11-l2, m11-l3, exams/m11 (cały zakres) | `{{t:shove\|push}}` / « partez all-in » (l1) · `{{t:shove\|fait tapis}}` / « fait all-in » (l2, l3, exams/m11) | jedna forma w module (terms-nazwy: shove = „push”, all-in = „all-in”) | to samo zagranie nazwane czterema sposobami w jednym module; l1:108 definiuje „push”, a l2 od nagłówka używa „faites tapis” bez wprowadzenia; wybór formy dotyczy całego korpusu | wysoka | nie |
| 45 | NISKIE | exams/m13.yaml:44 | `{{t:oesd\|tirage par les deux bouts}}` | np. `{{t:oesd\|tirage quinte bilatéral}}` | forma terminu OESD niespójna w korpusie (najczęstsza: „tirage quinte bilatéral”, 11×; tu wariant bez „quinte”); wybór dla całego korpusu | średnia | nie |
| 46 | NISKIE | lessons/m11-l1 („environ”) vs m11-l2, m11-l3, exams/m11 („env.”) | `environ` / `env.` | jedna pisownia | skrót „env.” w tekście ciągłym lekcji obok pełnego „environ” w lekcji sąsiedniej; kosmetyczne | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- **„partie aux jetons”** (m11-l3: 54, 59, 62, 68, 153, 159, 164) jako odpowiednik pl „gra o żetony” (chip EV) brzmi nienaturalnie; egzamin m11 oddaje to samo jako „en jouant pour les jetons” / „jeu pour les jetons” (64, 73, 75). Do ujednolicenia; możliwe „si seuls les jetons comptaient” albo „en chip EV” (terms-nazwy: chip-ev = „chip EV”). Pewność niska co do najlepszej formy.
- **„Dans une partie d'argent (cash)”** (m11-l3:113): zwykle „en cash game”; zrozumiałe dzięki nawiasowi.
- **„short stack très court” / „short stack aussi court”** (m11-l1:65, exams/m11:50): pleonazm wynikający ze znacznika; pl „bardzo short stack”.
- **„il ne vous reste que all-in ou …” / „plus que all-in ou …”** (m11-l1:40, 134) bez elizji, a w l1:112 „qu'all-in ou”; do ujednolicenia.
- **m11-l2:140** „vous faites tapis avec depuis la petite blinde, mais vous vous couchez avec face à un all-in”: przyimek „avec” bez dopełnienia dwa razy, potoczne; ewentualnie „vous les jouez all-in … mais vous les couchez …”.
- **m11-l1:24** „Je relance normalement (p. ex. au minimum)” za pl „Zwykle podbijam”: „normalement” można czytać jako „zwykle” albo „w zwykły sposób”; oba odczytania zgodne ze źródłem.
- **„préflop”** (exams/m13:72) wobec terms-nazwy „preflop”: w korpusie występują obie pisownie, decyzja dla całości.
- `{{t:icm}}` i `{{t:oesd}}` nie mają wpisu w `content/fr/terms-nazwy.yaml`; przekład zakłada, że `{{t:icm}}` wyświetli się jako „ICM” (stąd „l'{{t:icm}}”, „Selon l'{{t:icm}}”). Warto potwierdzić w zbudowanej treści.
- Znaczniki bez formy w zdaniu z rodzajnikiem: „la {{t:big-blind}} paie”, „des {{t:chips}} supplémentaires”, „Chaque {{t:call}}”, „Avec {{t:bb-ante}}” (m11-l1: 31, 74, 88, 174) dają poprawne zdania przy nazwach z terms-nazwy (grosse blinde, jetons, call, big blind ante); sprawdzić po ewentualnej zmianie nazw.

## Uwagi do źródła pl

- `{{n:m11.push.10.win}} blindów` (m11-l1:73, 170; exams/m11:25): klucz ma jednostkę `bb`, więc tekst wyświetla jednostkę dwa razy („1,5bb blindów”); przekład wiernie to powtarza („1,5bb blindes”).
- m11-l1:113 (pl „Nagrody dostaje kilka pierwszych miejsc”) — bez uwag do treści; przekład pomija „kilka” („Les prix vont aux premières places”), bez zmiany sensu.

## Ocena ogólna

Przekład jest merytorycznie wierny: nie znalazłem żadnej zmienionej liczby, ręki, kierunku zalecenia ani poprawnej odpowiedzi, a znaczniki są kompletne. Główna usterka językowa jest systematyczna: w m11-l1 i m11-l2 po procencie stoi gołe „mains” („environ 60 % mains”) zamiast „des mains” (15 miejsc; egzamin m11 i m11-l3 mają to dobrze). Druga grupa to niespójna terminologia między plikami modułu, wyraźnie pochodzącymi z różnych przebiegów tłumaczenia (equity/équité, showdown/abattage, Button/Bouton, push/faire tapis). Egzamin m13 jest najczystszy (dwie literówki „solver”).
