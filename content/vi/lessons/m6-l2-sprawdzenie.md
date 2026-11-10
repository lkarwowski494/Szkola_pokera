---
id: m6.l2
module: m6
order: 2
title: "Theo hay bỏ bài"
sub: "Phòng thủ trước c-bet khi không có vị trí"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. {{t:pot|Pot}} có {{n:ex.third.pot}}, Button {{t:bet|cược}} c-bet {{n:ex.third.bet}}. Bạn cần bao nhiêu equity để {{t:call|theo}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Bạn bỏ thêm {{n:ex.third.bet}} vào {{t:pot|pot}}, mà sau khi bạn {{t:call|theo}} sẽ có {{n:ex.third.total}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. C-bet nhỏ cho mức giá rất tốt." }
      - { text: "{{n:alpha.bet-third}}", why: "Đó là alpha: {{t:bluff|bluff}} của Button phải thành công thường xuyên đến mức nào. Ở mẫu số của equity cần thiết, hãy cộng cả khoản {{t:call|theo}} của bạn." }
      - { text: "{{n:mdf.bet-third}}", why: "Đó là {{t:mdf|MDF}}, tức một phần {{t:range|range}}, chứ không phải equity của một tay bài. Hơn nữa, trên flop khi {{t:out-of-position|không có vị trí}}, bạn phòng thủ ít hơn {{t:mdf|MDF}} một chút." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. {{t:pot|Pot}} có {{n:ex.pot}}, Button {{t:bet|cược}} c-bet {{n:ex.bet.three-quarters}}. Bạn cần bao nhiêu phần trăm equity để {{t:call|theo}}? Hãy nhập một số."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Bạn bỏ thêm {{n:ex.bet.three-quarters}} vào {{t:pot|pot}}, mà sau khi bạn {{t:call|theo}} sẽ có {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}. {{n:ex.bet.three-quarters}} ÷ tổng này = {{n:eq.bet-three-quarters}}. Gần gấp đôi so với khi gặp c-bet 1/4 {{t:pot|pot}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "Cùng một tay bài trên cùng một flop. Một lần Button {{t:bet|cược}} 1/3 {{t:pot|pot}}, lần khác cả {{t:pot|pot}}. Cách phòng thủ của bạn thay đổi thế nào?"
    table: { position: BB }
    options:
      - { text: "Trước cược bằng cả {{t:pot|pot}}, bạn phòng thủ bằng {{t:range|range}} hẹp hơn", correct: true, why: "Cược lớn hơn nghĩa là giá tệ hơn: equity cần thiết tăng từ {{n:eq.bet-third}} lên {{n:eq.bet-pot}}, còn {{t:mdf|MDF}} giảm từ {{n:mdf.bet-third}} xuống {{n:mdf.bet-pot}}. Những tay yếu nhất từng theo cược nhỏ, giờ bạn {{t:fold|bỏ}}." }
      - { text: "Bạn phòng thủ như cũ, vì vẫn là tay bài đó", why: "Tay bài giống nhau, nhưng giá khác. Trước cược bằng {{t:pot|pot}}, bạn cần {{n:eq.bet-pot}} equity thay vì {{n:eq.bet-third}}." }
      - { text: "Trước cược bằng cả {{t:pot|pot}}, bạn phòng thủ rộng hơn, vì cược lớn là {{t:bluff|bluff}} thường xuyên hơn", why: "Không có quy tắc như vậy. Cược lớn thường nghĩa là {{t:range|range}} {{t:polarized|phân cực}} (tay rất mạnh và {{t:bluff|bluff}}), và dù sao cũng là giá tệ hơn cho bạn." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bạn phòng thủ ở {{t:big-blind|big blind}} trước {{t:open|lượt mở cược}} của Button. Trên flop bạn {{t:check|xem bài}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot|pot}}. Bạn làm gì?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "{{t:pair|Đôi}} giữa thắng mọi {{t:bluff|bluff}} của Button (tay không có {{t:pair|đôi}}), và bạn chỉ cần {{n:eq.bet-third}} equity để {{t:call|theo}}. Phòng thủ tiêu chuẩn." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt. Trước c-bet nhỏ, bạn {{t:fold|bỏ}} những tay yếu nhất không có {{t:pair|đôi}} và không có {{t:draw|bài chờ}}, chứ không phải một {{t:pair|đôi}}." }
      - { text: "Check-raise", why: "Thường thì bạn {{t:call|theo}}. Sau khi bạn {{t:raise|tố}}, người trả tiền chủ yếu là tay mạnh hơn và {{t:draw|bài chờ}}; check-raise với tay như thế này là nước đi hiếm của solver trước c-bet nhỏ." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Bạn phòng thủ ở {{t:big-blind|big blind}} trước {{t:open|lượt mở cược}} của Button. Trên flop bạn {{t:check|xem bài}}, Button {{t:bet|cược}} c-bet 3/4 {{t:pot|pot}}. Bạn làm gì?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Bạn không có {{t:pair|đôi}} lẫn {{t:draw|bài chờ}} (không có lá bích nào, còn {{t:straight|sảnh}} thì còn xa). Trước c-bet lớn, bạn cần {{n:eq.bet-three-quarters}} equity, và khi {{t:out-of-position|không có vị trí}}, bạn hiếm khi đi đến showdown chỉ với bài cao. {{t:pair|Đôi}} đầm hoặc bồi cũng không phải lúc nào cũng thắng." }
      - { text: "{{t:call|Theo}}", why: "Hấp dẫn, vì đầm và bồi cao hơn bài trên bàn. Nhưng chỉ có bài cao trơn thì không đủ ở mức giá này: ở turn bạn thường sẽ gặp thêm một cược và {{t:fold|bỏ bài}}." }
      - { text: "Check-raise", why: "Để {{t:bluff|bluff}}, tay có {{t:draw|bài chờ}} phù hợp hơn, vì chúng có con đường thứ hai để thắng. Tay này không có con đường nào." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bạn phòng thủ ở {{t:big-blind|big blind}} trước {{t:open|lượt mở cược}} của Button. Trên flop bạn {{t:check|xem bài}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot|pot}}. Bạn làm gì?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Hai lá cao cộng thêm {{t:flush-draw|bài chờ thùng}} phụ (backdoor: ba lá bích, bạn cần bích ở cả turn lẫn river). Ở mức giá {{n:eq.bet-third}}, như vậy là đủ để {{t:call|theo}}." }
      - { text: "Check-raise", why: "Thường thì không. Bạn check-raise chủ yếu với những tay mạnh nhất và {{t:draw|bài chờ}} ({{t:flush|thùng}}, {{t:oesd|OESD}}). {{t:flush-draw|Bài chờ thùng}} phụ thì yếu: khi Button trả tiền, bạn thường chỉ còn lại bài cao. Tay này bạn {{t:call|theo}}." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt trước c-bet nhỏ. {{t:draw|Bài chờ}} phụ và hai lá cao cho đủ equity ở mức giá {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bạn phòng thủ ở {{t:big-blind|big blind}} trước {{t:open|lượt mở cược}} của Button. Trên flop bạn {{t:check|xem bài}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot|pot}}. Bạn làm gì?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Bạn có gutshot tới {{t:straight|sảnh}} (cần lá đầm) và lá già cao hơn bài trên bàn. {{t:call|Theo}} là mua một lá: bạn trúng gutshot ở turn khoảng {{n:odds.gutshot.flop-turn}}, còn lá già thêm vài out để thành {{t:top-pair|đôi cao nhất}}. Cộng lại vẫn thấp hơn mức giá {{n:eq.bet-third}}, nhưng khi trúng {{t:straight|sảnh}} bạn sẽ thắng nhiều hơn (implied odds), và riêng lá già đôi khi thắng được {{t:bluff|bluff}} của Button. Trước c-bet nhỏ, như vậy là đủ để {{t:call|theo}}." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt: {{t:draw|bài chờ}} cộng một lá cao là đủ trước c-bet nhỏ." }
      - { text: "Check-raise all-in", why: "Bạn mạo hiểm cả stack với một tay chưa có gì. Mức cược như vậy đẩy các tay yếu hơn ra khỏi ván, và chỉ tay mạnh hơn mới trả tiền." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Bạn phòng thủ ở {{t:big-blind|big blind}} trước {{t:open|lượt mở cược}} của Button. Trên flop bạn {{t:check|xem bài}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot|pot}}. Bạn làm gì?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Bạn không có {{t:pair|đôi}} lẫn {{t:flush-draw|bài chờ thùng}}; bạn chỉ có {{t:straight-draw|bài chờ sảnh}} phụ yếu (cần hai lá cụ thể), và không lá nào của bạn cao hơn bài trên bàn. Trên flop có át và già, Button có nhiều tay mạnh. Giá thì tốt, nhưng tay này gần như không bao giờ hiện thực hóa được nó." }
      - { text: "{{t:call|Theo}}, vì {{t:mdf|MDF}} là {{n:mdf.bet-third}}", why: "{{t:mdf|MDF}} là điểm tham chiếu cho cả {{t:range|range}}, chứ không phải lý do để trả tiền bằng những tay yếu nhất. Trên flop khi {{t:out-of-position|không có vị trí}}, bạn có thể phòng thủ ít hơn {{t:mdf|MDF}} một chút." }
      - { text: "Check-raise", why: "Trên flop có át và già, {{t:range-advantage|lợi thế dải bài}} thuộc về Button, còn bạn không có {{t:draw|bài chờ}} nào cho con đường thứ hai để thắng." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Vì sao khi {{t:out-of-position|không có vị trí}}, bạn không {{t:call|theo}} trên flop với mọi tay có equity dù chỉ cao hơn giá một chút?"
    table: { position: BB }
    options:
      - { text: "Vì bạn sẽ không hiện thực hóa được toàn bộ equity", correct: true, why: "Equity là cơ hội thắng khi chơi đến showdown mà không có thêm {{t:bet|cược}} nào. Khi {{t:out-of-position|không có vị trí}}, bạn hành động trước ở turn và river và thường sẽ {{t:fold|bỏ bài}} trước cược tiếp theo. Khi đó, tay yếu hiện thực hóa ít hơn equity của chúng." }
      - { text: "Vì Button trên flop luôn có tay mạnh", why: "Button {{t:open|mở cược}} và c-bet rộng, kể cả bằng {{t:bluff|bluff}}. Vấn đề là {{t:position|vị trí}} của bạn, chứ không phải sức mạnh của họ." }
      - { text: "Vì cần tiết kiệm {{t:chips|chip}} cho cơ hội tốt hơn", why: "Điều quan trọng là {{t:expected-value|giá trị kỳ vọng}} của từng quyết định, chứ không phải tiết kiệm {{t:chips|chip}}." }
---
Ở M5, bạn đã chơi c-bet với vai trò {{t:aggressor|người tấn công}}. Giờ bạn ngồi ở phía bên kia: bạn phòng thủ ở {{t:big-blind|big blind}}, xem bài trên flop, và Button {{t:bet|cược}} c-bet. Hãy nhớ từ M5: c-bet là {{t:bet|cược}} của người chơi đã {{t:raise|tố}} preflop, và {{t:range-advantage|lợi thế dải bài}} phụ thuộc vào {{t:texture|kết cấu}} của flop.

## Giá của c-bet

Trước tiên, hãy tính xem bạn cần bao nhiêu equity (công thức từ M2). C-bet nhỏ cho mức giá rất tốt, c-bet lớn cho mức giá tệ hơn rõ rệt.

| C-bet của Button | Equity cần thiết | {{t:mdf|MDF}} |
|---|---|---|
| 1/4 {{t:pot|pot}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 {{t:pot|pot}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 {{t:pot|pot}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 {{t:pot|pot}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| Cả {{t:pot|pot}} | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

{{t:mdf|MDF}} cho thấy hướng đi: cược càng lớn, bạn phòng thủ càng ít tay. Trên flop khi {{t:out-of-position|không có vị trí}}, bạn có thể phòng thủ ít hơn {{t:mdf|MDF}} một chút, vì {{t:bluff|bluff}} của Button vẫn còn equity, nhưng trước c-bet nhỏ, bạn không {{t:fold|bỏ bài}} hàng loạt.

## Khi {{t:out-of-position|không có vị trí}}, bạn hiện thực hóa ít hơn

Equity là cơ hội thắng khi chơi đến cuối mà không có thêm {{t:bet|cược}} nào. Khi {{t:out-of-position|không có vị trí}}, bạn hành động trước ở mọi {{t:street|vòng cược}}, nên thường sẽ {{t:fold|bỏ bài}} trước khi đến showdown. Tay yếu không có {{t:draw|bài chờ}} hiện thực hóa ít hơn mức equity của chúng. Tay cùng chất, {{t:connectors|bài liền nhau}} và {{t:pair|đôi}} hiện thực hóa nhiều hơn, vì chúng tạo được bộ mạnh hoặc đang thắng sẵn.

## Bạn {{t:call|theo}} bằng gì

Trước c-bet nhỏ (khoảng 1/3 {{t:pot|pot}}), bạn tiếp tục với:

- gần như mọi {{t:pair|đôi}}, kể cả đôi giữa và đôi thấp nhất,
- {{t:flush-draw|bài chờ thùng}} và bài chờ {{t:straight|sảnh}}, kể cả gutshot có lá cao,
- bài cao có thêm {{t:draw|bài chờ}} phụ (backdoor), ví dụ ba lá cùng chất,
- thường cả những tay có át là lá cao nhất.

Hãy nhớ từ M2: {{t:call|theo}} một {{t:bet|cược}} trên flop là mua một lá, nên bạn so sánh {{t:draw|bài chờ}} với cơ hội trúng ở turn. Cơ hội này đôi khi thấp hơn giá của c-bet nhỏ một chút. {{t:call|Theo}} vẫn có lời khi sau lúc trúng bạn sẽ thắng nhiều hơn số đang có trong {{t:pot|pot}} lúc này (gọi là implied odds, bạn sẽ tính ở M7), hoặc khi tay bài đôi khi thắng dù không trúng, ví dụ nhờ một lá cao.

## Bạn {{t:fold|bỏ}} những tay nào

- tay không có {{t:pair|đôi}} và không có {{t:draw|bài chờ}}, không có át cũng không có lá nào cao hơn bài trên bàn; trên flop có át, bạn {{t:fold|bỏ}} nhiều tay loại này hơn,
- thường là hai lá cao không có {{t:draw|bài chờ}} khi c-bet lớn (dù vậy, trên flop {{t:dry|khô}} có già, solver vẫn {{t:call|theo}} với nhiều tay có át); bạn nên {{t:call|theo}} khi có thêm {{t:draw|bài chờ}} phụ, tốt nhất là tới {{t:flush|thùng}} cao nhất.

Khi c-bet tăng lên, những tay yếu nhất tiếp theo chuyển từ {{t:call|theo}} sang bỏ bài.
