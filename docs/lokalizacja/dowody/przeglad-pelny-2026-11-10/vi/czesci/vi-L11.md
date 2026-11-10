# vi-L11: wietnamski (vi), lekcje m0-l1-uklady, m13-l1-raport, m13-l2-powtorki, m13-l3-przeglad

Źródło: `content/pl/lessons/`, przekład: `content/vi/lessons/`. Nazwy interfejsu sprawdzone grepem w `apps/mobile/src/i18n/locales/vi.json` (i `pl.json` dla kluczy). Znaczniki `{{t:…}}`, `{{n:…}}`, karty `[[…]]`, symbole kolorów i liczby porównane także skryptem linia po linii: zestawy kluczy zgodne we wszystkich czterech plikach (jedyna różnica: m0-l1:54 „dziesiątki” → „lá 10”, poprawnie).

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/vi/lessons/m0-l1-uklady.md | tak | 105 |
| content/vi/lessons/m13-l1-raport.md | tak | 110 |
| content/vi/lessons/m13-l2-powtorki.md | tak | 98 |
| content/vi/lessons/m13-l3-przeglad.md | tak | 89 |

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | m13-l1-raport.md:95 | **Hết giờ** | **Quá thời gian** | nazwa stopnia „Przekroczony czas” w raporcie vi (`play.report.verdict.timeout`) to „Quá thời gian”; lekcja opisuje stopnie raportu | średnia | tak |
| 2 | ŚR | m13-l2-powtorki.md:33 (text) | Lỗi, quyết định thiếu chính xác | Sai lầm, quyết định thiếu chính xác | stopień „Błąd” w interfejsie i w m13-l1 to „Sai lầm” (`verdict.mistake`) | wysoka | tak |
| 3 | ŚR | m13-l2-powtorki.md:33 (why) | không phải là lỗi, nên không tạo thẻ | không phải là sai lầm, nên không tạo thẻ | jw. | wysoka | tak |
| 4 | ŚR | m13-l2-powtorki.md:35 (text) | Chỉ lỗi, không tính | Chỉ sai lầm, không tính | jw. | wysoka | tak |
| 5 | ŚR | m13-l2-powtorki.md:35 (why) | được tính như lỗi | được tính như sai lầm | jw.; interfejs: „Được tính như sai lầm” | wysoka | tak |
| 6 | ŚR | m13-l2-powtorki.md:77 | Lỗi, quyết định thiếu chính xác và quyết định sau khi hết giờ sẽ | Sai lầm, quyết định thiếu chính xác … | jw.; interfejs: „Thẻ ôn tập: … từ các sai lầm” | wysoka | tak |
| 7 | ŚR | m13-l2-powtorki.md:85 | lỗi hoặc quyết định thiếu chính xác | sai lầm hoặc quyết định thiếu chính xác | jw. (wyliczenie stopni) | wysoka | tak |
| 8 | ŚR | m13-l2-powtorki.md:34 (why) | Quyết định đúng và chấp nhận được | Quyết định phù hợp và chấp nhận được | stopień „Zgodna” = „Phù hợp”; interfejs ma dosłownie „Quyết định phù hợp và chấp nhận được” | wysoka | tak |
| 9 | NISKIE | m13-l2-powtorki.md:34 (text) | đã được chấm | đã được đánh giá | „ocenione” wszędzie indziej „(được) đánh giá” | wysoka | tak |
| 10 | ŚR | m13-l2-powtorki.md:44 (text) | Khóa khu vực của mô-đun này | Khóa lĩnh vực của mô-đun này | „obszar” w interfejsie vi to „lĩnh vực” (`play.areasHint`, `report.again`, `areas`); lekcja konsekwentnie „khu vực” | wysoka | tak |
| 11 | ŚR | m13-l2-powtorki.md:44 (why) | Khu vực đã mở khóa sau các bài học | Lĩnh vực đã mở khóa sau các bài học | jw. | wysoka | tak |
| 12 | ŚR | m13-l2-powtorki.md:67 | khu vực chơi „Flop: c-bet” | lĩnh vực chơi “Flop: c-bet” | jw.; dodatkowo polskie cudzysłowy „…” (reszta przekładu “…”) | wysoka | tak |
| 13 | ŚR | m13-l2-powtorki.md:69 (why) | Đúng: khu vực chỉ chia | Đúng: lĩnh vực chỉ chia | jw. | wysoka | tak |
| 14 | ŚR | m13-l2-powtorki.md:71 (why) | còn các khu vực chỉ mở | còn các lĩnh vực chỉ mở | jw. | wysoka | tak |
| 15 | ŚR | m13-l2-powtorki.md:89 | Khu vực chơi là một mô-đun | Lĩnh vực chơi là một mô-đun | jw. | wysoka | tak |
| 16 | ŚR | m13-l2-powtorki.md:89 | Khu vực được mở khóa sau khi bạn | Lĩnh vực được mở khóa sau khi bạn | jw. | wysoka | tak |
| 17 | ŚR | m13-l2-powtorki.md:89 | đi thẳng đến khu vực có | đi thẳng đến lĩnh vực có | jw. | wysoka | tak |
| 18 | NISKIE | m13-l2-powtorki.md:52 (why) | Hãy xem điểm đánh giá của | Hãy xem đánh giá của | źródło „ocenę każdej decyzji”; „điểm” sugeruje punktację, której raport nie ma | średnia | tak |
| 19 | NISKIE | m13-l2-powtorki.md:15 (why) | với át và | với lá A và | as w pozostałych plikach „lá A” / „A” | średnia | tak |
| 20 | NISKIE | m13-l2-powtorki.md:17 (why) | giữ nguyên mọi tổ hợp bài | giữ nguyên mọi tay bài | „układ” w m0-l1 = „tay bài”; „tổ hợp” w korpusie także = combo | średnia | tak |
| 21 | NISKIE | m13-l2-powtorki.md:96 | thứ hạng tổ hợp bài | thứ hạng tay bài | jw. („ranking układów”) | średnia | tak |
| 22 | ŚR | m13-l3-przeglad.md:80 | các hành động và mức cược ở mỗi | các hành động và kích cỡ cược ở mỗi | „rozmiary” w m13-l1/l2 = „kích cỡ”; „mức cược” to przyjęta nazwa terminu stakes | średnia | tak |
| 23 | ŚR | m0-l1-uklady.md:87 | {{t:royal-flush\|Thùng phá sảnh hoàng gia}} | {{t:royal-flush\|Sảnh rồng}} | przyjęta nazwa w `terms-nazwy.yaml`: „sảnh rồng”; forma jednorazowa, niezgodna ze słowniczkiem | średnia | tak |
| 24 | NISKIE | m0-l1-uklady.md:104 (por. :52) | {{t:playing-the-board\|chơi bài trên bàn}} | (do ustalenia w korpusie) | linia 52 bez formy wyświetla „chơi bài trên board”, linia 104 „chơi bài trên bàn”; termin oznaczony [DO USTALENIA] | średnia | nie |
| 25 | NISKIE | m0-l1:49–53, m13-l2:13–26, m13-l3:33 | {{t:board\|bàn}} / {{t:board\|bài chung}} / {{t:board\|board}} | jedna forma | trzy różne formy terminu board w zakresie; także range: „dải bài” (m13-l1:97) i „range” (m13-l3:58, 83); wybór w całym korpusie | wysoka | nie |
| 26 | NISKIE | m13-l2-powtorki.md:13, 40, 42, 43, 73, 83, 85, 89 | lỗi (ogólnie „błąd”) | sai lầm (jeśli ujednolicać) | po poprawkach 2–7 w lekcji zostaje „lỗi” w znaczeniu ogólnym obok „sai lầm” jako stopnia; m13-l1 i m13-l3 używają wyłącznie „sai lầm”; zrozumiałe, decyzja stylistyczna | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- Interfejs vi sam ma dwie nazwy dla przekroczenia czasu: `play.report.verdict.timeout` = „Quá thời gian” oraz „Hết giờ” (`drill.timeout`, `play.timerHint` „Khi hết giờ”, `timeoutCheck`/`timeoutFold` „Hết giờ: …”). Poprawka nr 1 dopasowuje lekcję do etykiety stopnia w raporcie; alternatywa: zmienić etykietę w `vi.json` na „Hết giờ” (poza zakresem zlecenia) i zostawić lekcję.
- m13-l2: „klasa ręki” → „nhóm tay bài” i „rodzina spotów” → „nhóm spot”: oba pojęcia mają „nhóm”. Interfejs dla „rodzina zadań” ma „nhóm bài tập”, więc „nhóm spot” jest spójne; czy „klasa ręki” nie powinna być np. „loại tay bài”, żeby nie mylić — do oceny.
- m13-l1:91 „(“thường”, “ít hơn”)” za „(„często”, „rzadziej”)”: zgodne z brzmieniem reguł w `content/vi/rules.yaml` („thường hơn … thì ít hơn”), ale poza kontekstem „ít hơn” znaczy „mniej”; ewentualnie „ít khi hơn”.
- m13-l3:31 „Ván nào trong số này ít đáng để phân tích lâu nhất?” — zrozumiałe, ale zbitka „ít … lâu nhất” może być czytana dwojako; propozycja: „Ván nào trong số này ít đáng bỏ nhiều thời gian phân tích nhất?”.
- Nagłówek ramki „Skąd te zasady” ma trzy różne przekłady (m13-l1:107, m13-l2:95, m13-l3:86) — wszystkie poprawne, ewentualnie ujednolicić.
- m13-l2:89 „{{t:open|mở pot}}”: `terms-nazwy.yaml` podaje „mở cược”, korpus ma wiele form [WIELE FORM]; nie poprawiano.

## Uwagi do źródła pl

- m13-l1:45 (q-rare): uzasadnienie „{{t:call}} grane w ok. {{n:range.mixed.low}} przypadków” zakłada, że `range.mixed.high` + `range.mixed.low` = całość; przekład oddaje to wiernie. Bez uwag merytorycznych do pozostałych plików.

## Ocena ogólna

Przekład jest wierny i naturalny: nie znaleziono zmienionych liczb, rąk, kierunków zaleceń, poprawnych odpowiedzi ani zgubionych znaczników (0 KRYT, 0 WYS). Główny problem to niezgodność m13-l2 ze słownikiem interfejsu: „obszar” jako „khu vực” zamiast „lĩnh vực” oraz stopnie oceny („lỗi”/„đúng” zamiast „Sai lầm”/„Phù hợp”), a w m13-l1 nazwa stopnia „Hết giờ” zamiast „Quá thời gian” z raportu. m0-l1 i m13-l3 są praktycznie czyste (po jednej uwadze terminologicznej).
