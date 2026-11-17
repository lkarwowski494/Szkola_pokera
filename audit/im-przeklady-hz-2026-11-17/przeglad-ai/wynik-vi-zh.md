# Drugi przegląd AI: vi, zh-Hant — sc-09, 16, 18, 21, 26, 27, 30 (tylko odczyt, 2026-11-17)

Sprawdzone: renderer `renderTermsBare` (packages/content-schema/src/terms.ts:117–125) — `{{t:spr}}`, `{{t:icm}}`, `{{t:vpip}}` bez formy przy null wyświetlają skrót (SPR, ICM, VPIP), nie pełną nazwę angielską; `{{t:3-bet}}` w zh-Hant wyświetla „3-bet”. `{{w:rozmiar}}` = `String(Math.round(fractionBig*100))` bez „%” (apps/mobile/src/features/scenariusz/wariant.ts:410).

## 1. Tabela

| język | szablon | werdykt | ID znalezisk |
|---|---|---|---|
| vi | sc-09 | OK | — |
| vi | sc-16 | uwagi NISKIE | vi-sc-16-1, vi-sc-16-2 |
| vi | sc-18 | OK | — |
| vi | sc-21 | uwagi NISKIE | vi-sc-21-1 |
| vi | sc-26 | OK | — |
| vi | sc-27 | uwagi NISKIE (+ problem źródła Z-1) | vi-sc-27-1 |
| vi | sc-30 | uwagi NISKIE | vi-sc-30-1 |
| zh-Hant | sc-09 | OK | — |
| zh-Hant | sc-16 | uwagi NISKIE | zh-Hant-sc-16-1 |
| zh-Hant | sc-18 | OK | — |
| zh-Hant | sc-21 | OK | — |
| zh-Hant | sc-26 | OK | — |
| zh-Hant | sc-27 | ŚREDNIE (+ problem źródła Z-1) | zh-Hant-sc-27-1 |
| zh-Hant | sc-30 | uwagi NISKIE | zh-Hant-sc-30-1 |

Spójność 3-bet w zh-Hant (znany null): w sc-27 i sc-30 zawsze `{{t:3-bet}}` bez formy, z czasownikiem 做／做了 („做{{t:3-bet}}”, „做了{{t:3-bet}}”) i jako przydawka („{{t:3-bet}} 底池”) — spójne, bez uwag.

## 2. Znaleziska

### zh-Hant-sc-27-1 · ŚREDNIE · „przed riverem” zamiast „do rivera (włącznie)”
- Pole: situation (ostatnie zdanie).
- Obecnie: „…用相同比例的{{t:bet|下注}}，在河牌前投入全部籌碼。”
- Wzorzec: pl „chcesz wpłacić cały stack do rivera równymi zakładami na flopie, turnie i riverze”; en „get the whole stack in by the river with equal bets on the flop, turn and river”.
- Problem: 在河牌前 = „przed riverem” (zanim river się zacznie), co kłóci się z zakładem na riverze w tym samym zdaniu i z wyjaśnieniem bet-big („剛好會在河牌投入全部籌碼” — dokładnie na riverze). Uczący może zrozumieć, że stack ma wejść w dwóch zakładach.
- Proponowane: „假設你的牌值得打三條街的{{t:value|價值}}，而且你想在翻牌、轉牌和河牌用相同比例的{{t:bet|下注}}，到河牌時投入全部籌碼。”
- Pewność: średnia (wysoka co do dwuznaczności).

### vi-sc-16-1 · NISKIE · brak „lên” przy przedziale rozmiaru
- Pole: explanation akcji raise-small (ostatnie zdanie).
- Obecnie: „Bạn {{t:raise|tố}} khoảng {{n:xr.mult.low}}–{{n:xr.mult.example}} {{t:c-bet|c-bet}}, …”
- Wzorzec: en „You raise to about … the c-bet”; w tym samym pliku vi pisze „tố lên khoảng {{n:xr.mult.example}}”.
- Proponowane: „Bạn {{t:raise|tố}} lên khoảng {{n:xr.mult.low}}–{{n:xr.mult.example}} {{t:c-bet|c-bet}}, {{t:c-bet|c-bet}} càng nhỏ thì tố càng nhiều.”
- Pewność: średnia.

### vi-sc-16-2 · NISKIE · „Theo” w dwóch znaczeniach w jednym wyjaśnieniu
- Pole: explanation akcji call.
- Obecnie: „{{t:call|Theo}} cũng tốt: … Theo một trang đào tạo, …”
- Problem: „Theo” = call i „według” w kolejnych zdaniach; czytelne, ale zgrzyta (to samo „Theo một trang đào tạo” w raise-big jest bez kolizji).
- Proponowane (drugie zdanie): „Một trang đào tạo cho biết không phải {{t:draw|bài chờ}} mạnh nào cũng cần {{t:raise|tố}}, nhưng {{t:check-raise|check-raise}} thêm khả năng đối thủ {{t:fold|bỏ bài}} ngay.”
- Pewność: średnia.

### vi-sc-21-1 · NISKIE · nienaturalne „mang lại ít”
- Pole: explanation akcji bet-big.
- Obecnie: „…nên việc bảo vệ mang lại ít.”
- Wzorzec: „ochrona daje niewiele” / „protection is worth little”.
- Proponowane: „…nên việc bảo vệ không mang lại nhiều.”
- Pewność: średnia.

### vi-sc-27-1 · NISKIE · szyk „đến river thì đưa hết stack vào”
- Pole: situation (ostatnie zdanie).
- Obecnie: „…và muốn đến river thì đưa hết stack vào bằng các khoản {{t:bet|cược}} bằng nhau ở flop, turn và river.”
- Problem: sens zachowany, ale konstrukcja „muốn đến river thì…” brzmi jak warunek („jeśli dojdziesz do rivera”); wyraźniej „đến river là đã đưa hết stack vào”.
- Proponowane: „Giả sử bạn có tay đủ cho ba {{t:value|vòng giá trị}} và muốn đưa hết stack vào trước khi kết thúc river, bằng các khoản {{t:bet|cược}} bằng nhau ở flop, turn và river.” (albo: „…và muốn đến river là đã đưa hết stack vào, bằng các khoản…”)
- Pewność: średnia.

### vi-sc-30-1 · NISKIE · „Nói đơn giản” zamiast „w uproszczeniu (modelu)”
- Pole: explanation akcji call.
- Obecnie: „Nói đơn giản, không tính lối chơi sau flop, {{t:call|theo}} sẽ lỗ: …”
- Wzorzec: pl „W uproszczeniu, bez gry po flopie”; en „Simplified, ignoring play after the flop”. W fold vi ma poprawnie „(đơn giản hóa, không tính lối chơi sau flop)”.
- Problem: „Nói đơn giản” = „mówiąc prosto” (styl wypowiedzi), nie zastrzeżenie uproszczonego modelu; niespójne z fold.
- Proponowane: „Khi đơn giản hóa, không tính lối chơi sau flop, {{t:call|theo}} sẽ lỗ: ngay cả trước mọi tay mà đối thủ này chơi, tay của bạn vẫn có ít equity hơn mức mà giá của việc {{t:call|theo}} đòi hỏi, và theo giả định, {{t:3-bet|3-bet}} của họ nằm trong những tay đó.”
- Pewność: średnia.

### zh-Hant-sc-16-1 · NISKIE · rozbite „stawia mały c-bet”
- Pole: situation i wszystkie 4 explanation (zdanie otwierające).
- Obecnie: „按鈕位{{t:bet|下注}}，是小額的{{t:c-bet|持續下注}}” / „對手{{t:bet|下注}}，是小額的{{t:c-bet|持續下注}}”.
- Problem: konstrukcja „下注，是…” jest sztywna; naturalniej jednym orzeczeniem.
- Proponowane (situation): „翻牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}}小額的{{t:c-bet|持續下注}}。” (analogicznie w wyjaśnieniach i w sc-18/sc-21: „{{t:bet|下注}}了小額的…” jest już tak zbudowane).
- Pewność: średnia.

### zh-Hant-sc-30-1 · NISKIE · „最好的 A”
- Pole: explanation akcji fold.
- Obecnie: „這些主要是{{t:pair|對子}}和最好的 A”.
- Wzorzec: „najlepsze asy” / „the best aces” (ręce z asem).
- Proponowane: „這些主要是{{t:pair|對子}}和最強的A開頭手牌”.
- Pewność: średnia.

## 3. Do sprawdzenia przez rodzimego użytkownika

- vi (sc-16): czy „trước một {{t:c-bet|c-bet}} nhỏ” naturalnie znaczy „wobec / w obliczu małego c-betu”, czy lepiej „đối mặt với một c-bet nhỏ”? (powtarza się 9×).
- vi (sc-26 call): „đủ để chơi cả stack” — czy naturalne dla „grać o cały stack”, czy lepiej „đủ để đặt cược cả stack / chơi hết stack”?
- zh-Hant (sc-09): 溜入／溜入玩家 dla limp/limper — znany temat [DO USTALENIA] (przeczytane źródła TW: 平跟); tu tylko potwierdzić, że użycie w szablonie jest spójne (jest).
- zh-Hant (sc-26): „籌碼很短” dla „krótkie stacki” — czy naturalne, czy lepiej „雙方籌碼都很短／短籌碼”?

## 4. Uwagi o źródle (pl/en, wspólne dla wszystkich języków)

- **Z-1 · `{{w:rozmiar}}` bez znaku procentu (sc-27, bet-big i bet-small).** Znacznik wyświetla samą liczbę (np. „75”, wariant.ts:410), więc pl daje „Stawiasz ok. 75 puli”, en „about 75 of the pot”, vi „khoảng 75 pot”, zh-Hant „約 75 底池”. Błędna liczba w odbiorze (75 puli zamiast 75% puli) — w mojej ocenie poziom WYSOKI dla źródła (błędna wielkość w wyjaśnieniu), do naprawy we wzorcu i we wszystkich językach. Proponowane: pl „ok. {{w:rozmiar}}% {{t:pot|puli}}”, en „about {{w:rozmiar}}% of the {{t:pot}}”, vi „khoảng {{w:rozmiar}}% {{t:pot|pot}}”, zh-Hant „約 {{w:rozmiar}}% 的{{t:pot|底池}}” (albo dodanie „%” w wariant.ts, jeśli wszystkie użycia mają być procentem — wtedy bez zmian w treści).
