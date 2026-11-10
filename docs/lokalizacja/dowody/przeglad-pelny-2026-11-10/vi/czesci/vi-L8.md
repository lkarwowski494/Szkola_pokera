# vi-L8: wietnamski (vi), lekcje m10-l1…m10-l4 i egzamin m10

Źródło: `content/pl/lessons/m10-*.md`, `content/pl/exams/m10.yaml`. Terminologia: `content/vi/terms-nazwy.yaml`. Przegląd niezależny, 2026-11-10.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/vi/lessons/m10-l1-statystyki.md | tak | 131 |
| content/vi/lessons/m10-l2-typy-graczy.md | tak | 143 |
| content/vi/lessons/m10-l3-odejscie-od-bazy.md | tak | 130 |
| content/vi/lessons/m10-l4-rake.md | tak | 127 |
| content/vi/exams/m10.yaml | tak | 82 |

Znaczniki `{{t:…}}` i `{{n:…}}`: te same klucze co w pl w każdej linii (porównanie linia po linii); liczby wpisane cyfrą zgodne ze źródłem (1/3, 3/4, 100, NL-y, „tháng 10 năm 2026”). Poprawne odpowiedzi (`correct: true`) i pola `answer` w tych samych miejscach co w pl.

## Znaleziska

Wiersz z kilkoma liniami = ten sam błąd w kilku miejscach; w JSON każde miejsce ma osobną poprawkę (liczba w ostatniej kolumnie).

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | exams/m10.yaml:34, 36, 37 (2×), 52, 54, 56 (2×), 71 | chiến lược cơ sở | chiến lược nền | pl „baza” to we wszystkich czterech lekcjach modułu „chiến lược nền” (31×); egzamin jako jedyny ma „chiến lược cơ sở” — dwie nazwy jednego pojęcia | wysoka | tak (9) |
| 2 | ŚR | exams/m10.yaml:54 | nên nhiều lần {{t:call\|theo}} của họ là tay bài kém hơn tay của bạn | nên số lần {{t:call\|theo}} của họ bằng tay bài kém hơn tay của bạn cũng nhiều hơn | zgubione porównanie: pl „więcej jego sprawdzeń to ręce gorsze”, vi „wiele jego sprawdzeń” | średnia | tak (1) |
| 3 | ŚR | exams/m10.yaml:61 | {{t:draw\|draw}} | {{t:draw\|bài chờ}} | termin draw = „bài chờ” (terms-nazwy; bliźniacze pytanie m10-l3:56 ma „bài chờ”) | wysoka | tak (1) |
| 4 | NISKIE | exams/m10.yaml:55 | có khoảng cách {{t:vpip}} − {{t:pfr}} lớn | có chênh lệch … lớn | różnica VPIP − PFR w lekcjach to „chênh lệch” | wysoka | tak (1) |
| 5 | NISKIE | exams/m10.yaml:19 | tức là trong khoảng từ khoảng | tức là từ khoảng | niezręczne potrójne „khoảng” | wysoka | tak (1) |
| 6 | ŚR | lessons/m10-l2:39, 42, 49, 51, 87, 89 | {{t:check\|xem bài}} / {{t:check\|Xem bài}} | {{t:check\|check}} / {{t:check\|Check}} | check = „check” (terms-nazwy; l1, l3, egzamin); w tym samym pliku `{{t:check}}` bez formy (l. 42, 90) wyświetla „check”, więc czytelnik widzi dwie nazwy w jednym pytaniu | wysoka | tak (6) |
| 7 | ŚR | lessons/m10-l2:31, 32 (2×), 52, 80 (2×), 81, 82 (2×), 89 (2×), 90, 133, 139 (2×) | {{t:bluff\|đánh lừa}} / {{t:bluff\|cú đánh lừa}} | {{t:bluff\|bluff}} / {{t:bluff\|cú bluff}} | bluff = „bluff” (terms-nazwy; l3, egzamin); w tym samym pliku `{{t:bluff}}` bez formy wyświetla „bluff” (np. l. 52: „bluff kiểu này… cú đánh lừa bị lỗ” w jednym zdaniu) | wysoka | tak (15) |
| 8 | ŚR | lessons/m10-l2:23, 112 | chơi rộng đến đâu; người chơi rộng | chơi lỏng đến đâu; người chơi lỏng | pl „luźno / luźny”: w l1 i l3 „lỏng”; „rộng” to w module „szeroko” (theo rộng, mở rộng hơn) — zlewa luźny z szerokim | wysoka | tak (2) |
| 9 | NISKIE | lessons/m10-l2:52 | vì bạn không có giá trị showdown | vì tôi không có giá trị showdown | odpowiedź gracza w 1. osobie w pl („nie mam”); „bạn” zmienia osobę | średnia | tak (1) |
| 10 | ŚR | lessons/m10-l3:77, 122, 126 | {{t:range\|dải bài}} | {{t:range\|range}} | range = „range” (terms-nazwy; egzamin); w tym samym pliku `{{t:range}}` bez formy (l. 109, 111) wyświetla „range” | wysoka | tak (3) |
| 11 | NISKIE | lessons/m10-l3:122 | nhiều tay bài mạnh hơn để lấy | thêm nhiều tay bài mạnh để lấy | dwuznaczne: czyta się też „wiele silniejszych rąk”; pl „więcej silnych rąk dla wartości” | średnia | tak (1) |
| 12 | ŚR | lessons/m10-l4:74, 77, 78 (2×), 123 | {{t:big-blind\|mù lớn}} | {{t:big-blind\|big blind}} | big blind = „big blind” (terms-nazwy; l1, l2, egzamin); w l. 74 i 78 w tym samym zdaniu `{{t:big-blind}}` bez formy wyświetla „big blind” | wysoka | tak (5) |
| 13 | ŚR | lessons/m10-l4:123 | {{t:small-blind\|mù nhỏ}} | {{t:small-blind\|small blind}} | small blind = „small blind” (terms-nazwy; egzamin m10) | wysoka | tak (1) |
| 14 | ŚR | l1:87, 130; l2:29, 114, 116, 142; l3:75, 111, 115, 129; l4:22, 26, 104, 126 | tập người chơi (l1, l3) / dữ liệu tổng thể, toàn bộ người chơi (l2) / cộng đồng người chơi (l4) | jedna nazwa w module | pl „populacja” ma trzy różne odpowiedniki w czterech lekcjach (w pozostałym korpusie jest jeszcze „quần thể”); wybór terminu dla całego korpusu | wysoka | nie |
| 15 | ŚR | l1:33, 59, 76, 96, 104–110; l2:59, 68, 70, 71 | {{t:open\|mở pot}} | mở cược (albo jedna forma w module) | open = „mở cược” (terms-nazwy); l1–l2 mają „mở pot”, l3–l4 i egzamin „mở”; w l2:70 `{{t:open}}` bez formy wyświetla „mở cược” obok „Mở pot” w tej samej odpowiedzi; wybór formy dotyczy całego korpusu | średnia | nie |
| 16 | NISKIE | l2:62, 63, 137 | {{t:range\|dải bài}} | {{t:range\|range}} | jak nr 10, ale w l2 nie ma zderzenia w tym samym pliku; do decyzji razem z korpusem („dải bài” 118× w całości) | średnia | nie |
| 17 | NISKIE | l2:39, 43, 78, 132 (top-pair „đôi cao nhất”); l2:51, 53, 78, 81, 132; egzamin:45 (street „vòng cược”) | đôi cao nhất; vòng cược | top pair; street | nazwy z terms-nazwy to „top pair” i „street”, ale w całym korpusie formy przekładu są jednolite („top pair” jako forma 0×, „street” 0×) — wewnątrz modułu spójne; decyzja korpusowa | średnia | nie |
| 18 | NISKIE | l2:20–142 (np. 20, 39, 59, 68, 78, 103) | N tay / tay bài (liczba rąk w próbie) | N ván | liczba rąk w próbie: l1, l3, l4, egzamin „ván”, l2 „tay (bài)”; oba poprawne, niespójne między lekcjami | średnia | nie |
| 19 | NISKIE | l2:29 „mức cược micro trực tuyến”; l3:75, 111, 115 „micro stakes online”; l4:15, 16, 40, 93 „mức micro”; l2:116, 142 „phòng chơi trực tuyến” vs l3:129, l4 „phòng online” | — | jedna forma | „mikrostawki online” i „sala online” oddane na kilka sposobów; zrozumiałe, niespójne | średnia | nie |
| 20 | NISKIE | l2:116, 124 „tỉ lệ” vs l1:95, 96, 121, egzamin:63–80 „tỷ lệ” | tỉ lệ | tỷ lệ | dwie pisownie tego samego słowa w module (obie dopuszczalne) | wysoka | nie |

Razem: KRYT 0, WYS 0, ŚR 9 wierszy (46 miejsc, z tego 43 w JSON), NISKIE 11 wierszy (4 w JSON).

Uwaga do JSON: poprawki są ułożone w kolejności nakładania; kilka fragmentów „stary” (np. `{{t:check|xem bài}}`, `{{t:bluff|đánh lừa}}`, `chiến lược cơ sở`, `{{t:big-blind|mù lớn}}`) jest unikalnych dopiero po nałożeniu wcześniejszych poprawek z tego samego pliku (tak sprawdza walidator). Żadna poprawka nie zmienia kluczy znaczników.

## Do sprawdzenia przez człowieka znającego język

- l2:116, 124: pl „wynik” (bb/100) → „tỉ lệ thắng”. Dosłownie „odsetek wygranych”; wartości mają jednostkę bb/100, a l4 dla tego samego pojęcia używa „winrate”. Czy rodzimy czytelnik nie odczyta „tỉ lệ thắng trên X” jako procentu wygranych rozdań? Możliwy zamiennik: „winrate”.
- l1:85: „một số phòng chơi hiển thị chỉ số riêng ngay tại bàn” (pl „część sal pokazuje własne statystyki przy stole”): „chỉ số riêng” może znaczyć „osobne/prywatne statystyki”; jaśniej „chỉ số của chính phòng”.
- l1–l3, egzamin: „hung hăng” dla „agresywny” (terms-nazwy nie ma tego hasła; „người tấn công” dla agresora). W wietnamskim pokerze częste jest też „chủ động”/„aggressive”; „hung hăng” ma zabarwienie potoczne (napastliwy). W module spójne.
- l3:15, 24, 25, 33: pl „ręce obojętne” → „tay bài cho kết quả như nhau”. Opisowe i zrozumiałe, ale w l. 25 daje powtórzenie („…cho kết quả như nhau… kết quả như nhau”); do oceny, czy nie lepiej „tay bài trung lập / bàng quan”.
- l3:115: „chỉ có lời khi hoàn toàn không có bài nếu đối thủ…” — szyk „chỉ … khi … nếu” jest ciężki; sens zgodny z pl.
- zaimki rywala: l1–l2 „anh ta”, l3 i egzamin „họ/đối thủ”; nie błąd, różnica stylu między plikami.

## Uwagi do źródła pl

- m10-l3:49 i exams/m10:63: „Fold to c-bet łączy wszystkie rozmiary i stoły”, a w treści lekcji (m10-l3:109) „łączy wszystkie rozmiary i flopy”. Przekład wiernie oddaje oba („mọi bàn” / „mọi flop”); jeśli w pytaniach chodzi o flopy (boardy), „stoły” jest w źródle mylące i przenosi się na przekłady.
- m10-l4:126: „gracze z co najmniej 100 rękami” — liczba wpisana cyfrą, nie przez `{{n:…}}` (w vi tak samo).

## Ocena ogólna

Przekład modułu 10 jest merytorycznie wierny: nie znalazłem zmienionej liczby, ręki, pozycji, kierunku zalecenia, poprawnej odpowiedzi ani zgubionego znacznika; język jest naturalny i zrozumiały. Jedyny słaby punkt to spójność terminologii między plikami — widać, że lekcje i egzamin tłumaczono osobno (l2: „xem bài”, „đánh lừa”; l4: „mù lớn”; egzamin: „chiến lược cơ sở”; trzy nazwy „populacji”). Poprawki JSON ujednolicają to, co rozstrzyga `terms-nazwy.yaml` albo przewaga w module; wybory dotyczące całego korpusu zostawiłem bez poprawek.
