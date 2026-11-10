# vi-T1: wietnamski (vi), słowniczek — definicje (`terms-def.yaml`), nazwy (`terms-nazwy.yaml`), spójność form `{{t:klucz|forma}}`

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/vi/terms-def.yaml | tak (162 definicje, każda obok `def` z content/terms.yaml po kluczu) | 162 |
| content/vi/terms-nazwy.yaml | tak (162 nazwy, obok `pl`/`en` z content/terms.yaml) | 164 |
| content/terms.yaml | pola `pl`, `en`, `abbr`, `def` wszystkich 162 terminów (pola `forms`, `source`, `lesson` pominięte: poza zakresem) | 1351 |
| content/vi/lessons, content/vi/exams, content/vi/rules.yaml | nie — tylko grep znaczników `{{t:…}}` (zakres pkt 3: liczenie form, 8031 znaczników) | — |

Zestaw kluczy: terms-def.yaml = terms-nazwy.yaml = terms.yaml (162, ta sama kolejność). W obu plikach vi brak znaczników `{{…}}` (zgodnie ze źródłem: `def` to czysty tekst).

## Znaleziska

Wiersze 2–46: jedna poprawka JSON = jedna definicja (cała wartość definicji jako `stary`, bo kilka zamian w jednej linii); „było / ma być” pokazują tylko zmieniane fragmenty, rozdzielone „…”.

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | NISKIE | content/vi/terms-def.yaml:6 (straight) | không cùng một chất | không phải cả năm cùng một chất | pl „nie wszystkie w jednym kolorze”; „không cùng một chất” można odczytać jako „każda w innym kolorze” | średnia | tak |
| 2 | ŚR | content/vi/terms-def.yaml:14 (check) | chưa ai bet … không ai raise … nhầm với call … theo bet của | chưa ai cược … không ai tố … nhầm với theo (call) … theo cược của | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 3 | ŚR | content/vi/terms-def.yaml:15 (bet) | chưa ai bet … gọi là bet | chưa ai cược … gọi là cược | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 4 | ŚR | content/vi/terms-def.yaml:16 (call) | mức bet hoặc raise … không bet khi chưa ai bet | mức cược hoặc mức tố … không cược khi chưa ai cược | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 5 | ŚR | content/vi/terms-def.yaml:17 (raise) | lên trên bet của … raise tiếp hoặc fold | lên trên lần cược của … tố tiếp hoặc bỏ bài | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 6 | ŚR | content/vi/terms-def.yaml:19 (check-raise) | đối thủ bet thì bạn raise lại | đối thủ cược thì bạn tố | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 7 | ŚR | content/vi/terms-def.yaml:21 (pot) | khác đã fold | khác đã bỏ bài | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 8 | ŚR | content/vi/terms-def.yaml:32 (street) | lấy value ở | lấy giá trị ở | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 9 | ŚR | content/vi/terms-def.yaml:33 (betting-round) | check, bet, call, raise hoặc fold | check, cược, theo, tố hoặc bỏ bài | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 10 | ŚR | content/vi/terms-def.yaml:55 (pot-odds) | tính cả bet của … để call có lời | tính cả lần cược của … để việc theo có lời | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 11 | ŚR | content/vi/terms-def.yaml:62 (mixed-hand) | lúc raise, lúc call | lúc tố, lúc theo | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 12 | ŚR | content/vi/terms-def.yaml:63 (open) | một lần raise … đã fold | một lần tố … đã bỏ bài | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 13 | ŚR | content/vi/terms-def.yaml:68 (3-bet) | Lần raise đầu tiên lên một lần open … và open là | Lần tố đầu tiên lên trên một lần mở cược … và lần mở cược là | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 14 | ŚR | content/vi/terms-def.yaml:69 (4-bet) | Raise lên một | Tố lên trên một | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 15 | ŚR | content/vi/terms-def.yaml:70 (limp) | cách call big blind khi chưa ai raise | cách theo big blind khi chưa ai tố | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 16 | ŚR | content/vi/terms-def.yaml:71 (isolation) | Raise sau | Tố sau | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 17 | ŚR | content/vi/terms-def.yaml:86 (c-bet) | bet của người chơi là aggressor … ví dụ bet ở flop sau khi open preflop | lần cược của người chơi là người tấn công … ví dụ cược ở flop sau khi mở cược preflop | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 18 | ŚR | content/vi/terms-def.yaml:87 (aggressor) | chơi bet hoặc raise | chơi cược hoặc tố | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 19 | ŚR | content/vi/terms-def.yaml:88 (initiative) | của aggressor sau cùng … thực hiện bet tiếp | của người tấn công sau cùng … thực hiện lần cược tiếp | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 20 | ŚR | content/vi/terms-def.yaml:93 (polarization) | lấy value | lấy giá trị | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 21 | ŚR | content/vi/terms-def.yaml:96 (value) | đối thủ call bằng | đối thủ theo bằng | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 22 | ŚR | content/vi/terms-def.yaml:97 (value-bet) | Một lần bet để lấy value … yếu hơn call | Một lần cược để lấy giá trị … yếu hơn theo | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 23 | ŚR | content/vi/terms-def.yaml:98 (bluff) | Bet với … đối thủ fold tay | Cược với … đối thủ bỏ tay | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 24 | ŚR | content/vi/terms-def.yaml:99 (semi-bluff) | Bet với … đối thủ fold hoặc | Cược với … đối thủ bỏ bài hoặc | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 25 | ŚR | content/vi/terms-def.yaml:101 (bluff-catcher) | các bet lấy value | các lần cược lấy giá trị | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 26 | ŚR | content/vi/terms-def.yaml:102 (barrel) | Thêm một bet … sau bet của | Thêm một lần cược … sau lần cược của | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 27 | ŚR | content/vi/terms-def.yaml:103 (second-barrel) | Lần bet thứ hai … người chơi bet tiếp | Lần cược thứ hai … người chơi cược tiếp | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 28 | ŚR | content/vi/terms-def.yaml:104 (probe-bet) | Bet ở turn … khi aggressor preflop | Lần cược ở turn … khi người tấn công preflop | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 29 | ŚR | content/vi/terms-def.yaml:105 (donk-bet) | Bet của người … khi aggressor của | Lần cược của người … khi người tấn công của | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 30 | ŚR | content/vi/terms-def.yaml:106 (overbet) | Bet sau flop | Lần cược sau flop | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 31 | ŚR | content/vi/terms-def.yaml:108 (spr) | Effective stack chia | Stack hiệu dụng chia | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 32 | ŚR | content/vi/terms-def.yaml:109 (mdf) | trước một bet để | trước một lần cược để | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 33 | ŚR | content/vi/terms-def.yaml:110 (alpha) | phải fold để … kích thước bet so | phải bỏ bài để … kích thước lần cược so | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 34 | ŚR | content/vi/terms-def.yaml:123 (push-fold) | all-in hoặc fold | all-in hoặc bỏ bài | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 35 | ŚR | content/vi/terms-def.yaml:124 (shove) | một lần raise | một lần tố | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 36 | ŚR | content/vi/terms-def.yaml:131 (red-zone) | all-in hoặc fold | all-in hoặc bỏ bài | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 37 | ŚR | content/vi/terms-def.yaml:135 (fold-equity) | đối thủ fold. | đối thủ bỏ bài. | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 38 | ŚR | content/vi/terms-def.yaml:136 (gap-concept) | để call một lần open … tự mình open | để theo một lần mở cược … tự mình mở cược | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 39 | ŚR | content/vi/terms-def.yaml:145 (overcall) | Call một bet … đã call. | Theo một lần cược … đã theo. | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 40 | ŚR | content/vi/terms-def.yaml:147 (dead-money) | đã fold. | đã bỏ bài. | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 41 | ŚR | content/vi/terms-def.yaml:148 (stack-off) | hoặc call all-in | hoặc theo all-in | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 42 | ŚR | content/vi/terms-def.yaml:151 (vpip) | (call hoặc raise) | (theo hoặc tố) | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 43 | ŚR | content/vi/terms-def.yaml:152 (pfr) | chơi raise trước | chơi tố trước | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 44 | ŚR | content/vi/terms-def.yaml:156 (tag) | (bet và raise) | (cược và tố) | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 45 | ŚR | content/vi/terms-def.yaml:159 (calling-station) | chơi call rất | chơi theo rất | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 46 | ŚR | content/vi/terms-def.yaml:160 (maniac) | bet và raise với | cược và tố với | nazwa niezgodna z terms-nazwy.yaml (angielskie słowo zamiast przyjętej nazwy vi) | wysoka | tak |
| 47 | ŚR | content/vi/terms-nazwy.yaml:64 (mixed-hand) | tay bài trộn | tay bài hỗn hợp | „trộn” = tasować/mieszać fizycznie („tay bài trộn” brzmi jak „potasowana ręka”); definicja tego samego terminu (terms-def:62) mówi „chiến lược hỗn hợp” — utrwalony termin teorii gier; w lekcjach konkurują formy: tay bài trộn ×8, tay bài hỗn hợp ×3. Zmiana nazwy wymaga zmiany form w korpusie | średnia | nie |
| 48 | ŚR | content/vi/terms-nazwy.yaml:44–45 (early-position / late-position) | vị trí đầu / vị trí muộn | vị trí đầu / vị trí cuối (albo vị trí sớm / vị trí muộn) | para antonimów z dwóch różnych osi (đầu = pierwszy, muộn = późny); definicje (terms-def:42–43) opisują „hành động đầu tiên” / „hành động cuối cùng”. Wybór pary dotyczy całego korpusu | średnia | nie |
| 49 | ŚR | spójność: pot (880 znaczników) | pot ×633 + bez formy ×153 (nazwa „pot”) vs hũ ×94 | pot | dwie nazwy jednego pojęcia; „hũ” nie jest nazwą z terms-nazwy (w vi kojarzy się z jackpotem) | wysoka | nie |
| 50 | ŚR | spójność: bluff (475) | bluff ×236, cú bluff ×23, bez formy ×107 (nazwa „bluff”) vs tháu cáy ×80, cú tháu cáy ×13 vs đánh lừa ×10, cú đánh lừa ×5, tố lừa ×1 | bluff / cú bluff | trzy konkurujące nazwy (366 : 93 : 16); pokrewny semi-bluff: bán tháu cáy ×10 vs semi-bluff ×4 + bez formy ×10 | wysoka | nie |
| 51 | ŚR | spójność: check (279) | xem bài ×154 vs check ×84 + bez formy ×41 (nazwa „check”) | check | nazwa spoza terms-nazwy jest formą większościową (154 : 125); czytelnik widzi na zmianę „xem bài” i „check” | wysoka | nie |
| 52 | ŚR | spójność: big-blind (270) | mù lớn ×89 vs big blind ×47 + bez formy ×128 (nazwa „big blind”), BB ×6 | big blind | dwie nazwy (89 : 175); definicje (terms-def) używają wyłącznie „big blind” | wysoka | nie |
| 53 | ŚR | spójność: small-blind (115) | mù nhỏ ×61 vs small blind ×29 + bez formy ×20 (nazwa „small blind”), SB ×5 | small blind | dwie nazwy (61 : 49); tu forma spoza terms-nazwy przeważa | wysoka | nie |
| 54 | ŚR | spójność: range (242) | dải bài ×118, phạm vi bài ×7 vs range ×62 + bez formy ×55 (nazwa „range”) | range | trzy nazwy (118 : 7 : 117); pochodny range-advantage: lợi thế dải bài vs lợi thế range (wg komentarza w terms-nazwy 23 : 5) | wysoka | nie |
| 55 | ŚR | spójność: open (261) | mở ×123, mở cược ×81, lượt mở cược ×5, bez formy ×9 (nazwa „mở cược”) vs mở pot ×33, lượt mở ×9, tố mở ×1 | mở cược (czasownik skrócony „mở” dopuszczalny) | „mở pot” i „tố mở” to osobne nazwy tego samego zagrania obok „mở cược”; „mở”/„lượt mở” to skróty nazwy, nie konkurencja | średnia | nie |
| 56 | ŚR | spójność: draw (196) | bài chờ ×101 + bez formy ×39 (nazwa „bài chờ”) vs draw ×56 | bài chờ | dwie nazwy (140 : 56); pochodny flush-draw: draw thùng ×23 vs bài chờ thùng ×19 + bez formy ×14 | wysoka | nie |
| 57 | NISKIE | spójność: bet (413) | cược ×288, lần cược ×39, cú cược ×2, mức cược ×1, bez formy ×69 vs đặt ×14 | cược | „đặt” (postawić) to czasownik ogólny, zrozumiały, ale nie nazwa terminu; „mức cược” jest też nazwą terminu stakes | średnia | nie |
| 58 | ŚR | spójność (poza pierwszą piętnastką, zauważone przy okazji): street (79) | vòng cược ×52, vòng ×26 vs bez formy ×1 (nazwa „street”) | street (albo zmiana nazwy) | forma „vòng cược” jest nazwą innego terminu (betting-round); nazwa „street” z terms-nazwy praktycznie nie występuje w treści, a definicja street (terms-def:32) używa „street” | wysoka | nie |
| 59 | ŚR | spójność (poza pierwszą piętnastką): board (99) | bàn ×44, bài chung ×44 vs board ×6 + bez formy ×5 (nazwa „board”) | board | „bàn” = także stół do gry (definicja board, terms-def:25, wprost to rozróżnia), „bài chung” = nazwa community-cards; nazwa przyjęta jest w treści mniejszością, a wszystkie definicje używają „board” | wysoka | nie |

### Spójność form: 15 najczęstszych terminów (content/vi/lessons, exams, rules.yaml; formy bez rozróżniania wielkiej litery)

| termin | znaczników | formy po `\|` (liczba) | nazwa w terms-nazwy | konkurencja nazw |
|---|---|---|---|---|
| pot | 880 | pot 633; bez formy 153; hũ 94 | pot | tak (nr 49) |
| call | 833 | theo 788; bez formy 44; việc theo 1 | theo | nie |
| fold | 685 | bỏ bài 601; bỏ 46; bez formy 38 | bỏ bài | nie („bỏ” + dopełnienie to skrót) |
| bluff | 475 | bluff 236; bez formy 107; tháu cáy 80; cú bluff 23; cú tháu cáy 13; đánh lừa 10; cú đánh lừa 5; tố lừa 1 | bluff | tak (nr 50) |
| bet | 413 | cược 288; bez formy 69; lần cược 39; đặt 14; cú cược 2; mức cược 1 | cược | drobna (nr 57) |
| pair | 304 | đôi 280; bez formy 24 | đôi | nie |
| raise | 298 | tố 287; bez formy 6; lần tố 2; cú tố 2; tố lại 1 | tố | nie |
| check | 279 | xem bài 154; check 84; bez formy 41 | check | tak (nr 51) |
| big-blind | 270 | bez formy 128; mù lớn 89; big blind 47; BB 6 | big blind | tak (nr 52) |
| open | 261 | mở 123; mở cược 81; mở pot 33; lượt mở 9; bez formy 9; lượt mở cược 5; tố mở 1 | mở cược | tak (nr 55) |
| range | 242 | dải bài 118; range 62; bez formy 55; phạm vi bài 7 | range | tak (nr 54) |
| draw | 196 | bài chờ 101; draw 56; bez formy 39 | bài chờ | tak (nr 56) |
| spr | 190 | bez formy 175; SPR 15 | SPR | nie |
| straight | 142 | sảnh 108; bez formy 34 | sảnh | nie |
| small-blind | 115 | mù nhỏ 61; small blind 29; bez formy 20; SB 5 | small blind | tak (nr 53) |

(16. flush, 115: thùng 81; bez formy 34 — bez konkurencji.)

## Do sprawdzenia przez człowieka znającego język

- `royal-flush: "sảnh rồng"` (terms-nazwy:3): w pokerze po wietnamsku spotyka się też „thùng phá sảnh lớn” i „sảnh chúa”; „sảnh rồng” w innych grach karcianych (tiến lên) oznacza długi strit od 3 do asa. Czy to nazwa najmniej myląca dla początkującego? Pewność niska.
- `monotone: "đồng chất"` (terms-nazwy:79): „đồng chất” bywa w wietnamskim pokerze używane także o ręce suited (np. „AK đồng chất”), a suited ma tu nazwę „cùng chất”. Czy „flop đồng chất” nie myli się z suited? Pewność niska.
- `combo` (nazwa „combo”) a słowo „tổ hợp”: w definicjach „tổ hợp” oznacza raz układ pięciu kart (kicker :12, high-card :11, draw :49), raz kombinację dwóch kart (combo :60). Do decyzji, czy w definicji combo pisać „combo”.
- `top-pair: "top pair"` obok `second-pair: "đôi thứ hai"`: para pojęć nazwana raz po angielsku, raz po wietnamsku; w lekcjach top-pair ma formę „đôi cao nhất” ×61 wobec 22 znaczników bez formy (= „top pair”).
- `shove: "push"`: w lekcjach đẩy ×8, đẩy all-in ×7, push ×7, shove ×2; `prize-pool: "tổng giải thưởng"`: w lekcjach quỹ thưởng ×11, quỹ giải thưởng ×2, nazwa przyjęta ×0; `connectors: "connector"`: bài liên tiếp ×10, connector ×8, bài liền (nhau) ×5; `pocket-pair`: đôi túi ×3, đôi tẩy ×1 (terminy poza pierwszą piętnastką, liczby z tego samego grepa).
- Poprawki 2–46 przyjmują formy rzeczownikowe „lần cược”, „lần tố”, „mức tố”, „việc theo” (występują w korpusie jako formy znaczników); rodzimy czytelnik powinien potwierdzić naturalność zwłaszcza w liniach 17 („lên trên lần cược của đối thủ”), 68–69 („tố … lên trên một lần mở cược / một 3-bet”) i 110 („kích thước lần cược”).

## Uwagi do źródła pl

- Zdania właściwe tylko dla polszczyzny („Nie mylić ze »sprawdzam«”, „W polskich tekstach także »podbicie«”, „W polskich tekstach mówi się…”) przekład vi rozsądnie adaptuje albo pomija (check :14, call :16, raise :17, board :25, mixed-hand :62, wetness :82, linear :94, tournament-equity :138); nie zgłaszam jako błędów.
- oesd: pl „który uzupełnia karta z obu końców” jest mniej precyzyjne niż vi „lá ở một trong hai đầu” (karta z jednego z dwóch końców); sens zgodny.

## Ocena ogólna

Definicje wietnamskie są wierne źródłu: nie znalazłem zmienionej liczby, ręki, przykładu ani kierunku (0 KRYT, 0 WYS), a nazwy układów, drawów i pojęć statystycznych zgadzają się z `terms-nazwy.yaml`. Główna wada to niezgodność definicji z przyjętą terminologią: 45 definicji używa angielskich „bet / call / raise / fold / open / aggressor / value / effective stack”, podczas gdy nazwy przyjęte to cược / theo / tố / bỏ bài / mở cược / người tấn công / giá trị / stack hiệu dụng i takie formy dominują w lekcjach (theo 788, bỏ bài 601, tố 287, cược 288). W korpusie 8 z 15 najczęstszych terminów ma konkurujące nazwy (pot/hũ, bluff/tháu cáy/đánh lừa, check/xem bài, big blind/mù lớn, small blind/mù nhỏ, range/dải bài, mở cược/mở pot, bài chờ/draw); dla check i small-blind forma spoza `terms-nazwy.yaml` jest większościowa.
