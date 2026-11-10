# vi-L9: wietnamski (vi), lekcje m11-* (3) oraz egzaminy m11.yaml i m13.yaml

Źródło: `content/pl/…` (ten sam plik), terminologia: `content/vi/terms-nazwy.yaml`; nazwy werdyktów porównane z `apps/mobile/src/i18n/locales/vi.json`. Data: 2026-11-10.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/vi/lessons/m11-l1-push-fold.md | tak | 178 |
| content/vi/lessons/m11-l2-sprawdzanie.md | tak | 176 |
| content/vi/lessons/m11-l3-icm.md | tak | 169 |
| content/vi/exams/m11.yaml | tak | 86 |
| content/vi/exams/m13.yaml | tak | 91 |

Znaczniki `{{t:…}}` i `{{n:…}}`: klucze zgodne ze źródłem we wszystkich pięciu plikach (nie znaleziono zgubionego, dodanego ani zamienionego klucza; żadna liczba nie jest wpisana cyfrą w miejscu `{{n:…}}`). Poprawne odpowiedzi (`correct: true`, `answer`) na tych samych pozycjach co w pl.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m11-l1:25 | còn tay mạnh hơn sẽ trả tiền cho bạn. | còn tay mạnh hơn sẽ theo. | pl „a płacą lepsze” = lepsze ręce sprawdzają; „trả tiền cho bạn” = „zapłacą ci”, sugeruje zysk gracza (odwrócony wydźwięk uzasadnienia) | wysoka | tak |
| 2 | ŚR | m11-l1:70 | một tay bài hoàn toàn không có cơ hội hòa vốn? | …không có cơ hội thắng đạt mức hòa vốn? | zbitka „không có cơ hội hòa vốn” czyta się „bez szansy wyjścia na zero”; pl: all-in ręką bez żadnych szans wychodzi na zero | wysoka | tak |
| 3 | ŚR | exams/m11:23 (q3) | một tay bài hoàn toàn không có cơ hội hòa vốn? | …không có cơ hội thắng đạt mức hòa vốn? | jak nr 2 | wysoka | tak |
| 4 | ŚR | exams/m11:32 (q4) | với tay bài không có cơ hội hòa vốn? | với tay bài không có cơ hội thắng đạt mức hòa vốn? | jak nr 2 | wysoka | tak |
| 5 | ŚR | m11-l2:88 | Nhiều hơn khi không có ante, vì | Nhiều hơn so với khi không có ante, vì | pl „Więcej niż bez ante”; bez „so với” zdanie znaczy „więcej, gdy nie ma ante” (odwrotnie); opcja błędna, wynik pytania bez zmian | wysoka | tak |
| 6 | ŚR | m11-l2: 41 miejsc (l. 13–175) | {{t:big-blind\|mù lớn}}, {{t:small-blind\|mù nhỏ}}, {{t:bb-ante\|ante mù lớn}}, „tiền mù” | {{t:big-blind\|big blind}}, {{t:small-blind\|small blind}}, {{t:bb-ante\|big blind ante}}, „blind” | cała lekcja 2 używa nazw wietnamskich, a terms-nazwy ma „big blind / small blind / big blind ante”; l1, l3 i egzamin m11 mają formy angielskie i „blind” — ten sam moduł, dwie nazwy jednego pojęcia | wysoka | tak (39 poprawek; l. 49 i 140 po dwa miejsca w jednej poprawce) |
| 7 | ŚR | exams/m13:51 (q6) | {{t:big-blind\|mù lớn}} | {{t:big-blind\|big blind}} | jak nr 6 | wysoka | tak |
| 8 | ŚR | m11-l3:29, 38, 39, 45, 71, 113, 123, 127, 131, 145 (11 miejsc) | {{t:prize-pool\|quỹ thưởng}} | {{t:prize-pool\|tổng giải thưởng}} | terms-nazwy: prize-pool = „tổng giải thưởng” (tak też w UI); „quỹ thưởng” bez źródła; egzamin ma trzecią formę | wysoka | tak (11) |
| 9 | ŚR | exams/m11:57 (q7, 2 miejsca) | {{t:prize-pool\|quỹ giải thưởng}} | {{t:prize-pool\|tổng giải thưởng}} | jak nr 8; lekcja i egzamin tego samego modułu różnią się nazwą | wysoka | tak (2) |
| 10 | ŚR | m11-l3:61 (text i why) | {{t:risk-premium\|Phần bù rủi ro}} | {{t:risk-premium\|Risk premium}} | terms-nazwy: „risk premium”; w tym samym pytaniu (l. 62) i w l. 159 goły znacznik daje „risk premium”, więc poprawna odpowiedź nazywa się inaczej niż w wyjaśnieniu obok; egzamin m11 ma „risk premium” | wysoka | tak (2) |
| 11 | ŚR | m11-l3:79, 164 | {{t:shove\|shove}} | {{t:shove\|push}} | terms-nazwy: shove = „push”; l1, l2 i egzamin mają „đẩy (all-in)”; „shove” to trzecia nazwa tego samego zagrania | wysoka | tak (2) |
| 12 | ŚR | m11-l3:161 | {{t:pocket-pair\|đôi túi}} | {{t:pocket-pair\|pocket pair}} | terms-nazwy: „pocket pair”; „đôi túi” odnotowane tam jako forma bez źródła | wysoka | tak |
| 13 | ŚR | exams/m13:25, 27 (q3) | {{t:mixed-hand\|tay bài hỗn hợp}} | {{t:mixed-hand\|tay bài trộn}} | terms-nazwy: mixed-hand = „tay bài trộn” | wysoka | tak (2) |
| 14 | ŚR | exams/m13:26 (q3) | text: "Khớp" … Hành động khớp là | text: "Phù hợp" … Hành động phù hợp là | pytanie dotyczy nazw werdyktów raportu; w interfejsie vi „Zgodna” = „Phù hợp” (vi.json grade.zgodne, verdicts.compliant) | wysoka | tak |
| 15 | ŚR | exams/m13:27 (q3), 35 (q4) | text: "Lỗi", why: "Lỗi là hành động… | text: "Sai lầm", why: "Sai lầm là hành động… | w interfejsie vi werdykt „Błąd” = „Sai lầm” (vi.json verdicts.mistake, grade.blad); pozostałe werdykty w egzaminie („Chấp nhận được”, „Thiếu chính xác”, „Không đánh giá”) zgadzają się z UI | wysoka | tak (2) |
| 16 | ŚR | exams/m13:78 (q9) | {{t:bluff\|tháu cáy}} | {{t:bluff\|bluff}} | terms-nazwy: bluff = „bluff”; egzamin m11 (l. 68) ma „bluff” | wysoka | tak |
| 17 | ŚR | m11-l1, m11-l2 (wiele), exams/m11:50–52 | {{t:range\|dải bài}} obok gołego {{t:range}} (→ „range”) i {{t:range\|range}} | jedna nazwa | terms-nazwy: range = „range”; w l1 i l2 w tym samym akapicie pojawia się „dải bài” (forma) i „range” (goły znacznik), np. l1:63–64; wybór do rozstrzygnięcia w całym korpusie (terms-nazwy: WIELE FORM) | wysoka | nie |
| 18 | ŚR | m11-l1:26, 65, 79; tytuł l1 | {{t:short-stack\|stack ngắn}} | {{t:short-stack\|short stack}} | terms-nazwy: „short stack”; l3 i egzamin mają „short stack”, l1:128 (goły znacznik) też; „stack ngắn” jest zrozumiałe, decyzja korpusowa | średnia | nie |
| 19 | ŚR | exams/m13:42–46 (8 miejsc) i 44–46 (3 miejsca) | {{t:board\|bài chung}}; {{t:flush-draw\|draw thùng}} | {{t:board\|board}}; {{t:flush-draw\|bài chờ thùng}} | niezgodne z terms-nazwy (board = „board”, flush-draw = „bài chờ thùng”); w pliku spójne, sens poprawny; ujednolicenie korpusowe | średnia | nie |
| 20 | NISKIE | m11-l1:108, 65; m11-l2:68, 132, 140, 168; exams/m11:34, 48–52, 76, 82, 86 | {{t:shove\|đẩy all-in}} / {{t:shove\|đẩy}} | (terms-nazwy: „push”) | dwie formy opisowe zamiast nazwy „push”; zrozumiałe i naturalne, tylko do decyzji przy ujednoliceniu | średnia | nie |
| 21 | NISKIE | m11-l1:117 | các tay yếu và trung bình | các tay yếu hơn và trung bình | pl „dla słabszych i średnich rąk”; w drillu (l. 26) i w egzaminie „yếu hơn” | wysoka | tak |
| 22 | NISKIE | m11-l1:138 | bạn chơi từ {{t:small-blind\|small blind}} với {{t:big-blind\|big blind}} | …small blind}} đấu với {{t:big-blind\|big blind}} | pl „przeciw dużemu blindowi”; samo „với” = „z”; l2:175 ma „đấu với” | wysoka | tak |
| 23 | NISKIE | m11-l2:67 | thường xuyên gặp {{t:pair\|đôi}} cao hơn hơn. | gặp {{t:pair\|đôi}} cao hơn thường xuyên hơn. | zdublowane „hơn hơn” (pl „częściej trafia na wyższą parę”) | wysoka | tak |
| 24 | NISKIE | m11-l1:65 | khi {{t:short-stack\|stack ngắn}} chỉ còn rất ít | np. khi stack đã rất ngắn (z zachowaniem znacznika) | niezręczne: „gdy krótki stack ma już bardzo mało”; pl „przy bardzo short stacku”; sens zachowany | średnia | nie |
| 25 | NISKIE | m11-l1:152 „trang đào tạo” vs m11-l2:140 „trang huấn luyện”; m11-l1:31, 88 „đặt ante” vs m11-l2:83 „nộp ante” | — | jedna forma | drobna niespójność słownictwa między lekcjami (serwis szkoleniowy; wpłacić ante) | średnia | nie |

Razem: KRYT 0, WYS 0, ŚR 19 wierszy (w tym 69 poprawek JSON), NISKIE 6 wierszy (3 poprawki JSON).

## Do sprawdzenia przez człowieka znającego język

- m11-l1:174 „chênh nhau một phần nhỏ của một điểm” (pl „różnią się o ułamek punktu”): wierne, ale po wietnamsku „một điểm” bez dopowiedzenia jest niejasne; jeśli chodzi o punkt procentowy, naturalniej „chưa đến một điểm phần trăm”. Źródło pl też nie mówi „procentowego”, więc bez poprawki.
- m11-l2, m11-l3, exams/m11: pl „węziej / ciaśniej” oddano raz jako „hẹp hơn” (l1, egzamin q6), raz „chặt hơn” (l2, l3, egzamin q9). Oba są używane; warto sprawdzić, czy czytelnik nie odbierze ich jako dwóch pojęć (l2:107–112: pytanie „rộng hơn?”, odpowiedź „chặt hơn”).
- m11-l2:154 „dù chỉ cần {{n}} equity” — dodane „chỉ” („tylko”), pl ma „choć potrzebuje”; kierunek zgodny z intencją zdania, ale to dopowiedzenie.
- m11-l3:161 „{{n}} số tay bài” — poprawne, jeśli wartość `m11.jamfold3.overcall.single` wyświetla się jako procent; przy liczbie rąk „số” byłoby zbędne.
- Po zamianie nr 8: „toàn bộ tổng giải thưởng” (l3:39, 113) jest poprawne, lecz nieco ciężkie; ewentualnie „toàn bộ giải thưởng” wymagałoby odejścia od nazwy terminu.
- exams/m13:34 „tức như lỗi” i l. 25 „không phải lỗi” zostawiłem (użycie opisowe, nie nazwa werdyktu); po zamianie nr 15 można rozważyć „như sai lầm”.

## Uwagi do źródła pl

- Brak uwag merytorycznych. Technicznie: pl w m11-l3:77 ma „Średni stack pasuje do ciebie” bez znacznika `{{t:fold|…}}` (wszędzie indziej „pasować” jest oznaczone); przekład wiernie nie ma znacznika.

## Ocena ogólna

Przekład jest wierny: nie znalazłem zmienionej liczby, ręki, kierunku zalecenia ani poprawnej odpowiedzi, a wszystkie znaczniki mają właściwe klucze. Główny problem to terminologia: lekcja 2 konsekwentnie używa „mù lớn / mù nhỏ / tiền mù”, gdy reszta modułu i `terms-nazwy.yaml` mają formy angielskie, a nagroda turniejowa, risk premium, shove i nazwy werdyktów (m13) występują pod dwiema–trzema nazwami. Cztery miejsca są dwuznaczne znaczeniowo („không có cơ hội hòa vốn” ×3, „Nhiều hơn khi không có ante”) i jedno uzasadnienie ma odwrócony wydźwięk („trả tiền cho bạn”). Język jest naturalny, bez zdań niezrozumiałych.
