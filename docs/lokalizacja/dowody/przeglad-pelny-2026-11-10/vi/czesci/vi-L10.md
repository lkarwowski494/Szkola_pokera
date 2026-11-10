# vi-L10: wietnamski (vi), treść krytyczna — lekcje m12 (4), egzamin m12, helplines

Źródło: `content/pl/…` (lekcje, egzamin) i `content/helplines.yaml` (linie pomocy). Terminologia: `content/vi/terms-nazwy.yaml`. Kontrola mechaniczna linia po linii (pl ↔ vi): zestaw znaczników `{{t:}}`/`{{n:}}`/`{{helplines}}`, flagi `correct: true` i liczba linii zgodne we wszystkich 5 parach plików; jedyne różnice cyfr to „0” w miejscu polskiego słowa „zero” (m12-l1:114, m12-l4:24, 42, egzamin:74) — bez zmiany sensu.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/vi/lessons/m12-l1-wariancja.md | tak | 140 |
| content/vi/lessons/m12-l2-decyzja-wynik.md | tak | 116 |
| content/vi/lessons/m12-l3-tilt.md | tak | 134 |
| content/vi/lessons/m12-l4-bankroll.md | tak | 149 |
| content/vi/exams/m12.yaml | tak | 93 |
| content/vi/helplines.yaml (wobec content/helplines.yaml) | tak | 39 |
| content/vi/terms-nazwy.yaml (pomocniczo) | tak | 164 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m12-l2:97 | thắng khoảng một lần trong năm | cứ khoảng năm lần thì vẫn thắng một lần | pl „raz na pięć”; po wietnamsku czyta się jako „raz w roku” (năm = pięć / rok) | wysoka | tak |
| 2 | ŚR | m12-l2:67 | cũng chỉ dẫn trước trong khoảng … trường hợp sau khoảng … tay bài | cũng phải sau khoảng … tay bài mới dẫn trước trong khoảng … trường hợp | pl „dopiero po ok. N rękach”; „chỉ” przy „dẫn trước trong khoảng X” czyta się jako „prowadzi tylko w X przypadków” | średnia | tak |
| 3 | ŚR | m12-l2:29 | {{t:flush-draw\|draw thùng}} | {{t:flush-draw\|bài chờ thùng}} | przyjęta nazwa terminu w terms-nazwy.yaml | wysoka | tak |
| 4 | ŚR | m12-l2:38 | {{t:flush-draw\|Draw thùng}} | {{t:flush-draw\|Bài chờ thùng}} | jw. | wysoka | tak |
| 5 | ŚR | m12-l2:97 | theo với {{t:flush-draw\|draw thùng}} một cược bằng cả pot trên turn | theo một cược bằng cả pot trên turn với {{t:flush-draw\|bài chờ thùng}} | jw.; przy okazji niezręczny szyk (dopełnienie oddzielone od czasownika) | wysoka | tak |
| 6 | ŚR | egzamin:43 (q5 prompt) | {{t:flush-draw\|draw thùng}} | {{t:flush-draw\|bài chờ thùng}} | jw. | wysoka | tak |
| 7 | ŚR | egzamin:45 (q5 why) | {{t:flush-draw\|draw thùng}} | {{t:flush-draw\|bài chờ thùng}} | jw. | wysoka | tak |
| 8 | ŚR | m12-l2:49 | {{t:range\|phạm vi bài}} | {{t:range\|range}} | przyjęta nazwa „range”; „phạm vi bài” to trzecia, mniejszościowa forma | wysoka | tak |
| 9 | ŚR | m12-l2:106 | {{t:range\|phạm vi bài}} | {{t:range\|range}} | jw. | wysoka | tak |
| 10 | ŚR | m12-l4:47 | {{t:downswing\|chuỗi thua}} | {{t:downswing\|downswing}} | przyjęta nazwa „downswing” (tak w m12-l1 i egzaminie q9); „chuỗi thua” w m12-l3:100 oddaje zwykłą „serię strat” | wysoka | tak |
| 11 | ŚR | m12-l4:60 | {{t:downswing\|chuỗi thua}} | {{t:downswing\|downswing}} | jw. | wysoka | tak |
| 12 | ŚR | egzamin:56 (q6 text) | Tilt vì sai lầm | Tilt vì mắc lỗi | nazwa typu tiltu inna niż w lekcji m12-l3 („Tilt vì mắc lỗi”), a pytanie odwołuje się do podziału z lekcji | wysoka | tak |
| 13 | ŚR | egzamin:56 (q6 why) | Tilt vì sai lầm là sự tức giận | Tilt vì mắc lỗi là sự tức giận | jw. | wysoka | tak |
| 14 | NISKIE | egzamin:52 (q6 prompt) | đây là loại tilt nào? | đây là kiểu tilt nào? | w lekcji „typ tiltu” = „kiểu tilt” | wysoka | tak |
| 15 | NISKIE | egzamin:55 (q6 why) | Loại này bị kích hoạt | Kiểu tilt này bị kích hoạt | jw. | wysoka | tak |
| 16 | NISKIE | m12-l3:35 (why) | {{t:stakes}} cao hơn cũng làm tăng | {{t:stakes\|Mức cược}} cao hơn cũng làm tăng | termin bez formy na początku zdania renderuje się małą literą (renderTermsBare nie zmienia wielkości liter) | wysoka | tak |
| 17 | NISKIE | m12-l3:71 (why) | {{t:stakes}} cao hơn đi cùng | {{t:stakes\|Mức cược}} cao hơn đi cùng | jw. | wysoka | tak |
| 18 | NISKIE | m12-l3:16 | tức giận vì vận may | tức giận vì may rủi | pl „los”; „vận may” = raczej „szczęście”; w l1/l2 „los” = „may rủi” | średnia | tak |
| 19 | NISKIE | m12-l3:43 | đổ lỗi cho vận may | đổ lỗi cho may rủi | jw. | średnia | tak |
| 20 | NISKIE | egzamin:54 (q6 why) | đổ lỗi cho vận may | đổ lỗi cho may rủi | jw. | średnia | tak |
| 21 | NISKIE | m12-l3:13 | ván bài thật bất công | trò chơi này thật bất công | pl „gra jest niesprawiedliwa” (gra w ogóle); „ván bài” = jedno rozdanie | średnia | tak |
| 22 | NISKIE | m12-l4:58 | nghìn ván | nghìn tay | pl „tys. rąk”; wszędzie indziej „nghìn tay” | wysoka | tak |
| 23 | NISKIE | m12-l4:133 | cần rất nhiều ván | cần rất nhiều tay bài | pl „bardzo wielu rąk”; ręka = „tay (bài)” | wysoka | tak |
| 24 | NISKIE | m12-l4:102 (treść krytyczna, sens bez zmian) | hãy dùng các liên hệ trong thẻ | hãy dùng thông tin liên hệ trong thẻ | kalka; naturalnie i jak w helplines.yaml („thông tin liên hệ”) | średnia | tak |
| 25 | NISKIE | m12-l2:85 | ngay cả khi nó mang lại lợi | ngay cả khi nó mang lại lợi nhuận | brzmi jak urwane wyrażenie | średnia | tak |
| 26 | NISKIE | m12-l2:108 | những sai lầm mang lại lợi | những sai lầm mang lại lợi nhuận | jw. | średnia | tak |
| 27 | NISKIE | m12-l1:83 | chứ không phải chỉ qua kết quả | chứ không phải qua bản thân kết quả | pl „a nie sam wynik”; obecne brzmienie = „nie tylko przez wynik” | średnia | tak |
| 28 | NISKIE | m12-l2:65, 67, 68, 83 (2×), 86 (2×), 112 | {{t:session\|phiên}} | {{t:session\|phiên chơi}} | przyjęta nazwa „phiên chơi” (tak w m12-l3, l4, egzaminie); skrócona forma zrozumiała, decyzja korpusowa | wysoka | nie |

## Treść krytyczna — wynik sprawdzenia zdanie po zdaniu

- `helplines.yaml`: nazwa „Gambling Therapy (Gordon Moody)”, etykieta i adres `https://www.gamblingtherapy.org/`, `claim`, `id`, `country`, `kind`, daty, `online`, `sources` — identyczne ze źródłem wspólnym; brak numerów telefonów w obu plikach (`regions: {}`). Przetłumaczone pola (`pointer`, `fallback.text`, `regions_label`, `info`) oddają sens w pełni: lekarz albo specjalista zdrowia psychicznego; w nagłym zagrożeniu, także przy myślach samobójczych własnych lub kogoś znajomego, od razu lokalny numer alarmowy; „bezpłatnie”, „online”, „poufnie” zachowane, nic nie dodane.
- m12-l4, ramka „Chơi có trách nhiệm” (144–148): wszystkie pięć sygnałów, zdanie „Gdzie szukać pomocy” i znacznik `{{helplines}}` zgodne. Pytanie `q-warning-sign` (100–104): poprawna odpowiedź i uzasadnienia zgodne.
- Progi bankrollu (m12-l4:137, q-move-down, q-stay, q-move-up; egzamin q9): „najpóźniej / muộn nhất”, „najwcześniej / sớm nhất”, „połowa / một nửa”, „pełny bankroll”, dwie poprawne odpowiedzi w q-stay — zgodne. Brak znalezisk KRYT.
- Zastrzeżenia (m12-l1:140, egzamin q9: „ogólne wskazówki… ekran »Pomoc«”) zgodne; nazwa ekranu „Trợ giúp” zgadza się z interfejsem (`vi.json`).

## Do sprawdzenia przez człowieka znającego język

- m12-l3:87, 130: „gąsienica” oddana jako „con sâu bướm” (wiernie wobec pl). W wietnamskich omówieniach tej metafory (inchworm) może funkcjonować „sâu đo”; do oceny, bez poprawki.
- m12-l4:49 i 137: „…lại gần đủ số buy-in của mức này” — „mức này” ma oznaczać niższą stawkę; egzamin q9 ma jaśniejsze „của mức đó”. Do rozważenia ujednolicenie na „mức đó”.
- m12-l1:65: „một phần bình thường trong lối chơi của người chơi thắng” — „lối chơi” (styl gry) za pl „gry”; być może lepiej „trong cuộc chơi của…”.
- „micro stakes” (m12-l1:74, 93, 100) zostawione po angielsku przy terminie stakes = „mức cược”; do sprawdzenia, czy w korpusie to forma przyjęta dla „mikrostawek”.
- m12-l2:89: „Poker cho bạn phản hồi thường xuyên đánh lừa” — zrozumiałe, ale sztywne.

## Uwagi do źródła pl

- Brak.

## Ocena ogólna

Przekład modułu 12 jest wierny: liczby, znaczniki, kierunki zaleceń, poprawne odpowiedzi i cała treść krytyczna (odpowiedzialna gra, progi bankrollu, linie pomocy) zgadzają się ze źródłem; nie ma znalezisk KRYT ani WYS. Najważniejsze usterki to dwuznaczne „một lần trong năm” (raz na pięć / raz w roku) i przesunięte „dopiero” w m12-l2 oraz niespójności terminologii wobec `terms-nazwy.yaml` (flush-draw, range, downswing, nazwa typu tiltu w egzaminie). Język jest naturalny, forma zwracania się („bạn”) spójna.
