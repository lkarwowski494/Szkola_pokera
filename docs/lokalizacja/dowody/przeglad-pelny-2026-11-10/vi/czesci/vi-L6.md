# vi-L6: wietnamski (vi), lekcje m8-* (4) i egzamin m8.yaml

Recenzja niezależna, źródło `content/pl`, przekład `content/vi`. Znaczniki `{{t:…}}`, `{{n:…}}`, `[[…]]` oraz pola strukturalne (`id`, `family`, `rules`, `table`, `answer`, `correct`, `sizeError`) porównane dodatkowo mechanicznie linia po linii.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/vi/lessons/m8-l1-value.md | tak | 139 |
| content/vi/lessons/m8-l2-ile-blefow.md | tak | 143 |
| content/vi/lessons/m8-l3-blokery.md | tak | 118 |
| content/vi/lessons/m8-l4-bluff-catching.md | tak | 136 |
| content/vi/exams/m8.yaml | tak | 93 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m8-l2-ile-blefow.md:65 | thua {{t:value\|giá trị}} của bạn và thắng | thua giá trị của bạn và thắng | nadmiarowy znacznik t:value; pl ma zwykłe „wartością” bez znacznika | wysoka | tak |
| 2 | ŚR | m8-l2-ile-blefow.md:74 | số mất cho {{t:value\|giá trị}} | số mất cho giá trị | jw., pl „traci na wartości” bez znacznika | wysoka | tak |
| 3 | ŚR | m8-l2-ile-blefow.md:84 | trả tiền cho {{t:value\|giá trị}} của bạn | trả tiền cho giá trị của bạn | jw., pl „twojej wartości” bez znacznika | wysoka | tak |
| 4 | ŚR | m8-l2-ile-blefow.md:109 | thua {{t:value\|giá trị}} của bạn nhưng thắng | thua giá trị của bạn nhưng thắng | jw., pl „z twoją wartością” bez znacznika | wysoka | tak |
| 5 | ŚR | m8-l1-value.md:89 | vì khi có {{t:position\|vị trí}}, đối thủ sẽ lật bài | vì khi bạn có {{t:position\|vị trí}}, đối thủ sẽ lật bài | pl „z pozycji rywal pokaże karty”: pozycję masz ty; bez podmiotu czyta się, jakby miał ją rywal | średnia | tak |
| 6 | ŚR | m8-l3-blokery.md:17 | Một bet nhỏ nhằm chặn một bet lớn | Một cược nhỏ nhằm chặn một cược lớn | angielskie „bet” w tekście; wszędzie indziej w M8 i w terms-nazwy „cược” | wysoka | tak |
| 7 | ŚR | m8-l3-blokery.md:58 | trước bet của bạn | trước cược của bạn | jw. | wysoka | tak |
| 8 | ŚR | m8-l3-blokery.md:88 | Bet để {{t:bluff}}, vì có lá A cơ | Cược để {{t:bluff}}, vì có lá A cơ | jw. | wysoka | tak |
| 9 | ŚR | m8-l3-blokery.md:89 | Bet {{t:value\|lấy giá trị}} | Cược {{t:value\|lấy giá trị}} | jw. | wysoka | tak |
| 10 | NISKIE | exams/m8.yaml:20 | có nhiều tay yếu hơn tay mạnh hơn | tay yếu hơn nhiều hơn tay mạnh hơn | szyk dwuznaczny; pl „więcej gorszych rąk niż lepszych” | wysoka | tak |
| 11 | ŚR | m8-l4-bluff-catching.md (cały plik, ok. 45 miejsc, także tytuł:5) | {{t:bluff\|tháu cáy}} | {{t:bluff\|bluff}} | niespójny termin w obrębie modułu: l1–l3 i egzamin mają „bluff” (zgodnie z terms-nazwy), l4 „tháu cáy”; l2:109 definiuje bluff-catcher jako „tay bài bắt bluff”, a l4 nazywa to „bắt tháu cáy” | wysoka | nie (wybór formy w korpusie) |
| 12 | ŚR | m8-l4-bluff-catching.md:60, 90, 118 | {{t:range\|dải bài}} | {{t:range\|range}} | niespójne z l2 i egzaminem („range”, terms-nazwy „range”) | wysoka | nie (wybór formy w korpusie) |
| 13 | ŚR | m8-l4-bluff-catching.md:89, 118, 126, 135 | {{t:blocker\|bài chặn}} | {{t:blocker\|blocker}} | niespójne z l3, gdzie pojęcie jest wprowadzone jako „blocker” (terms-nazwy „blocker”) | wysoka | nie (wybór formy w korpusie) |
| 14 | ŚR | m8-l3-blokery.md (15, 17, 22, 24, 29, 31, 36, 40, 95, 102, 117) | {{t:combo\|tổ hợp}} | {{t:combo\|combo}} | niespójne z l2:90–94 i egzaminem („combo”, terms-nazwy „combo”) | wysoka | nie (wybór formy w korpusie) |
| 15 | ŚR | l2:101, 139; l3:58, 59, 68, 78, 110; exams/m8.yaml:47, 82, 83, 91 | {{t:draw\|draw}}, {{t:flush-draw\|draw thùng}}; „bị trượt” / „hụt” / „trượt” | {{t:draw\|bài chờ}}, {{t:flush-draw\|bài chờ thùng}}; jedno określenie „nietrafiony” (np. „hụt”) | l1 i l4 mają „bài chờ (thùng) hụt” (terms-nazwy „bài chờ”), l2, l3 i egzamin „draw … bị trượt/hụt/trượt” — trzy warianty jednego pojęcia | wysoka | nie (wybór formy w korpusie) |
| 16 | NISKIE | l2 (101, 102, 109, 139), l3 i egzamin (wszystkie) kontra l1 i l4 | {{t:check}} / {{t:check\|check}} | {{t:check\|xem bài}} albo odwrotnie | l1 i l4 konsekwentnie „xem bài”, l2/l3/egzamin „check”; także „trên river/flop” (l3, egzamin) kontra „ở river” (l1, l2, l4) | wysoka | nie (wybór formy w korpusie) |
| 17 | NISKIE | m8-l4-bluff-catching.md:13; m8-l3-blokery.md:45, 55, 84 | {{t:big-blind\|mù lớn}}; {{t:big-blind\|Big blind}} | jedna forma (terms-nazwy „big blind”) | trzy postacie nazwy pozycji w module (bez formy, „Big blind”, „mù lớn”) | wysoka | nie (wybór formy w korpusie) |

## Do sprawdzenia przez człowieka znającego język

- m8-l2-ile-blefow.md:142: pl „model zabawkowy z teorii gry” → „mô hình đơn giản từ lý thuyết trò chơi”. Sens „toy model/toy game” spłaszczony do „prosty model”, a zdanie wcześniej już mówi „mô hình đơn giản hóa” (powtórzenie). Możliwe „toy game trong lý thuyết trò chơi”; nie mam pewności co do przyjętego wietnamskiego odpowiednika.
- m8-l1-value.md:127: nagłówek „Thin value: ít, nhưng có người trả” za pl „mało, ale za cenę” (en „small, but paid”). Sens zachowany swobodnie; do oceny, czy brzmi naturalnie.
- m8-l4 (13, 57, 77, 128): „Piki nie weszły” → „Không ra thêm lá bích nào” (dosł. „nie spadł już żaden pik”); l3:65 ma „bích không về”. Sens ten sam (draw nietrafiony), ale dwa różne sformułowania tej samej sytuacji na tym samym stole.
- Po usunięciu znaczników z poz. 1–4 zostaje gołe „thua giá trị của bạn”; l4 w tym samym sensie pisze „bài giá trị”/„tay giá trị”. Do rozważenia ujednolicenie na „các tay giá trị”.

## Uwagi do źródła pl

Brak.

## Ocena ogólna

Przekład merytorycznie wierny: liczby, ręce, stoły, kierunki zaleceń, poprawne odpowiedzi i uzasadnienia zgadzają się ze źródłem we wszystkich pięciu plikach; klucze `{{n:…}}` i pola strukturalne są identyczne, jedyna różnica znaczników to cztery nadmiarowe `t:value` w l2. Brak znalezisk KRYT i WYS. Główną słabością jest niespójność terminologii między plikami modułu (widać co najmniej dwie ręce tłumacza): l4 używa „tháu cáy / dải bài / bài chặn / mù lớn”, l3 „tổ hợp” i angielskiego „bet”, a l1–l2 i egzamin form z terms-nazwy. Język naturalny i poprawny.
