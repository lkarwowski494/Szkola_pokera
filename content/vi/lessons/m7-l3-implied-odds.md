---
id: m7.l3
module: m7
order: 3
title: "Bài chờ và implied odds"
sub: "Bạn cần thắng thêm bao nhiêu về sau"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "Trên flop, bạn có khoảng {{n:odds.flush.flop-river}} cơ hội ra {{t:flush}} cho đến river. Turn không giúp gì. Bây giờ cơ hội của bạn là bao nhiêu?"
    options:
      - { text: "Khoảng {{n:odds.flush.turn-river}}", correct: true, why: "Đúng: chỉ còn một lá. {{n:outs.flush}} out trên {{n:cards.unseen.turn}} lá chưa biết là {{n:odds.flush.turn-river}}, khoảng một nửa cơ hội so với trên flop." }
      - { text: "Vẫn khoảng {{n:odds.flush.flop-river}}, vì số out vẫn như cũ", why: "Số out vẫn như cũ, nhưng số lá còn lật ít hơn. {{n:odds.flush.flop-river}} tính cho hai lá, còn ở turn chỉ còn một lá." }
      - { text: "Không thể tính được nếu không có máy tính", why: "Tính được: quy tắc 2 và 4 từ M2. Còn một lá, nên số out × 2: xấp xỉ {{n:odds.flush.rule-turn}}. Chính xác là {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. Bạn có bao nhiêu out để ra {{t:flush|thùng}} hoặc {{t:straight|sảnh}}? Hãy nhập một số."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Để ra {{t:flush|thùng}}: {{n:outs.flush}} lá cơ; để ra {{t:straight|sảnh}}: mọi lá Q và mọi lá 7, tức {{n:outs.oesd}} lá. Q cơ và 7 cơ đã được tính trong thùng, nên bạn trừ {{n:draw.combo.overlap}}: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.three-quarters}}. Bạn làm gì?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Bạn có {{n:outs.combo}} out, tức khoảng {{n:odds.combo.turn-river}} ở river. Bạn cần {{n:eq.bet-three-quarters}}, nên việc {{t:call}} có lời ngay cả khi không tính implied odds." }
      - { text: "{{t:fold|Bỏ bài}}, vì {{t:draw}} ở turn là không đủ", why: "Một {{t:draw}} thông thường ở mức giá này đúng là nên {{t:fold|bỏ bài}}, nhưng chờ cả {{t:flush}} lẫn {{t:straight|sảnh}} cho khoảng {{n:odds.combo.turn-river}}, nhiều hơn mức {{n:eq.bet-three-quarters}} cần thiết." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Trong {{t:pot|pot}} có {{n:ex.third.pot}}, đối thủ {{t:bet|cược}} {{n:io.flush.bet}}. Bạn có {{t:flush-draw}}: {{n:outs.flush}} out trên {{n:cards.unseen.turn}} lá. Khi trúng, bạn cần thắng thêm bao nhiêu {{t:chips|chip}} ở river để việc {{t:call}} hòa vốn? Hãy nhập một số."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Bạn cần {{n:io.flush.eq}} equity, còn bạn có khoảng {{n:odds.flush.turn-river}}. Trong {{n:cards.unseen.turn}} lá river có thể ra, bạn trúng {{n:outs.flush}} lần và trượt {{n:miss.flush.turn}} lần, mỗi lần trượt mất {{n:io.flush.bet}}. Vì vậy mỗi lần trúng phải mang về {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. Trong {{t:pot|pot}} có {{n:io.flush.pot-after-bet}}, còn thiếu {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Trong {{t:pot|pot}} có {{n:io.oesd.pot}}, đối thủ {{t:bet|cược}} {{n:io.oesd.bet}}. Bạn có {{t:oesd}}: {{n:outs.oesd}} out, {{n:miss.oesd.turn}} lá trượt. Khi trúng, bạn cần thắng thêm bao nhiêu ở river?"
    options:
      - { text: "Khoảng {{n:io.oesd.extra}}", correct: true, why: "Mỗi lần trúng phải mang về {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. Trong {{t:pot|pot}} có {{n:io.oesd.pot-after-bet}}, nên còn thiếu {{n:io.oesd.extra}}." }
      - { text: "Khoảng {{n:io.oesd.need}}", why: "Đó là tổng số bạn cần thắng ở mỗi lần trúng. Một phần trong đó đã nằm sẵn trong {{t:pot|pot}} ({{n:io.oesd.pot-after-bet}}), nên còn thiếu thêm {{n:io.oesd.extra}}." }
      - { text: "Không cần gì, giá đã đủ", why: "Bạn cần {{n:eq.bet-half}} equity, còn bạn có khoảng {{n:odds.oesd.turn-river}}. Riêng {{t:pot}} là không đủ, còn thiếu {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Trong {{t:pot|pot}} có {{n:ex.third.pot}}, đối thủ {{t:bet|cược}} {{n:io.flush.bet}}. Mỗi người còn {{n:io.flush.stack}} phía sau, và đối thủ sẵn sàng trả tiền với {{t:pair|đôi}} A. Bạn làm gì?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Riêng giá thì không đủ ({{n:io.flush.eq}} so với khoảng {{n:odds.flush.turn-river}}), nhưng khi trúng bạn chỉ cần thắng thêm {{n:io.flush.extra}}. Bạn có {{t:draw|bài chờ}} tới {{t:flush|thùng}} mạnh nhất (A cơ nằm trên {{t:board|bài chung}}, nên {{t:flush}} K là cao nhất), đối thủ còn nhiều {{t:chips|chip}} phía sau, và người chơi có {{t:pair|đôi}} A thường sẽ trả một lượt cược như vậy ở river. Lá trúng sẽ dễ thấy (lá cơ thứ ba), nhưng đối thủ có {{t:pair|đôi}} A vẫn thường trả tiền; vì thế implied odds ở đây nhỏ hơn so với khi trúng kín." }
      - { text: "{{t:fold|Bỏ bài}}, vì {{n:odds.flush.turn-river}} ít hơn {{n:io.flush.eq}}", why: "Pot odds bảo “{{t:fold}}”, nhưng bạn đang bỏ qua implied odds. Chỉ thiếu {{n:io.flush.extra}}, và đối thủ còn {{n:io.flush.stack}} phía sau và có một tay bài sẽ trả tiền." }
      - { text: "{{t:raise|Tố}} all-in", why: "Đối thủ có {{t:pair|đôi}} A nhiều khả năng sẽ {{t:call|theo}}, và khi đó bạn chỉ có khoảng {{n:odds.flush.turn-river}}. Tốt hơn là xem river với giá rẻ và thắng nhiều hơn khi trúng." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.half}}. Bạn có gutshot. Sau khi trúng, bạn sẽ cần thắng thêm {{n:io.gut.extra}}, nhưng đối thủ chỉ còn {{n:io.gut.stack}} phía sau. Bạn làm gì?"
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Gutshot cho khoảng {{n:odds.gutshot.turn-river}}, còn bạn cần {{n:eq.bet-half}}. Implied odds không giúp được: ngay cả khi đối thủ đặt hết {{n:io.gut.stack}}, số đó cũng không bù được {{n:io.gut.extra}} còn thiếu." }
      - { text: "{{t:call|Theo}}, vì có implied odds", why: "Implied odds là số {{t:chips}} mà đối thủ còn có thể trả cho bạn. Đối thủ chỉ có {{n:io.gut.stack}}, còn bạn cần {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Tố}} all-in", why: "{{t:bluff|Bluff}} all-in với {{n:outs.gutshot}} out là mạo hiểm tất cả. Đối thủ đã {{t:bet|cược}} nửa {{t:pot|pot}} với stack nhỏ như vậy thường sẽ không {{t:fold|bỏ bài}} nữa." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. Trong {{t:pot|pot}} có {{n:ex.pot}}, một đối thủ thận trọng {{t:bet|cược}} cả {{t:pot|pot}}: {{n:ex.bet.pot}}. Bạn làm gì?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Bạn cần {{n:eq.bet-pot}}, còn bạn có khoảng {{n:odds.flush.turn-river}}. Thêm nữa, {{t:flush}} của bạn thấp: khi ra lá cơ, đối thủ có Q hoặc J cơ sẽ có {{t:flush}} tốt hơn, và đó là lúc bạn thua nhiều nhất (implied odds ngược)." }
      - { text: "{{t:call|Theo}}, vì có implied odds", why: "Implied odds ở đây yếu: {{t:flush}} đã trúng vẫn có thể thua một thùng cao hơn, và ai cũng thấy lá cơ thứ ba trên {{t:board|bài chung}}. Ngoài ra còn thiếu rất nhiều: giá là {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Tố}}", why: "Một đối thủ thận trọng đã {{t:bet|cược}} cả {{t:pot|pot}} trên {{t:board|bài chung}} có A và K hiếm khi {{t:fold|bỏ bài}}. Bạn mạo hiểm nhiều với một tay bài có thể thua ngay cả khi trúng." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "Khi nào implied odds lớn nhất?"
    options:
      - { text: "Khi bạn có {{t:draw}} tới tay bài mạnh nhất, đối thủ có tay bài mạnh và còn nhiều {{t:chips|chip}} phía sau", correct: true, why: "Đúng: khi đó trúng là bạn thắng, và đối thủ vừa có chip vừa có bài để trả cho bạn." }
      - { text: "Khi đối thủ có ít {{t:chips|chip}} ({{t:spr}} thấp)", why: "Ngược lại: với {{t:spr}} thấp, đối thủ không còn gì để trả thêm, nên implied odds nhỏ." }
      - { text: "Khi bạn có {{t:draw}} tới {{t:flush|thùng}} thấp", why: "Đó là implied odds ngược: đôi khi bạn trúng mà vẫn thua, lại còn thua trong {{t:pot|pot}} lớn." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "Đầu turn, trong {{t:pot|pot}} có {{n:ex.pot}}, và stack nhỏ hơn trong hai stack của các bạn là {{n:spr.stack.high}}. {{t:spr}} bằng bao nhiêu?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = stack ÷ {{t:pot}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. Đối thủ còn vài {{t:pot|pot}} phía sau, nên implied odds có thể lớn." }
      - { text: "{{n:spr.low}}", why: "Đó là giá trị khi stack là {{n:spr.stack.low}}. Ở đây stack là {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "Đó là {{t:pot}}. {{t:spr}} là một tỷ lệ: stack chia cho {{t:pot|pot}}." }
---
Ở turn chỉ còn một lá nữa. Cơ hội của {{t:draw|bài chờ}} giảm khoảng một nửa, còn giá cho lá tiếp theo thường tăng. Vì vậy ở turn bạn tính chính xác hơn và đặt một câu hỏi mới: sau này mình có thể thắng bao nhiêu nếu trúng?

## Còn một lá cuối

| {{t:draw|Bài chờ}} | Out | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Thùng}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:straight|Sảnh}} hai đầu | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Thùng}} + {{t:straight}} hai đầu | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Với quy tắc 2 và 4 từ M2, bạn nhân số out với 2. Khi hai {{t:draw|bài chờ}} có chung lá, bạn chỉ tính những lá đó một lần.

## Implied odds

Implied odds (tỷ lệ ẩn) là số {{t:chips}} bạn sẽ thắng ở river khi trúng. Ví dụ: trong {{t:pot|pot}} có {{n:ex.third.pot}}, đối thủ {{t:bet|cược}} {{n:io.flush.bet}}, còn bạn có {{t:flush-draw}}. Bạn cần {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} equity, còn bạn có khoảng {{n:odds.flush.turn-river}}. Riêng {{t:pot}} là không đủ.

Trong {{n:cards.unseen.turn}} lá river có thể ra, bạn trúng {{n:outs.flush}} lần và trượt {{n:miss.flush.turn}} lần. Để hòa vốn, mỗi lần trúng phải mang về đúng bằng số mà các lần trượt tiêu tốn:

```formula
số cần thắng = số tiền phải theo × (số lá trượt ÷ số out)
```

Ở đây: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. Trong {{t:pot|pot}} có {{n:io.flush.pot-after-bet}}, nên ở river bạn cần nhận thêm trung bình **{{n:io.flush.extra}}**.

## {{t:spr}}: đối thủ còn bao nhiêu {{t:chips|chip}} phía sau

{{t:spr}} (tỷ lệ stack so với {{t:pot|pot}}) là {{t:effective-stack}}, tức stack nhỏ hơn trong hai stack, chia cho {{t:pot|pot}} ở đầu {{t:street|vòng cược}}. Có thể tính {{t:spr}} ở bất kỳ {{t:street|vòng cược}} nào; ở đây bạn tính nó ở turn. Với {{t:pot|pot}} {{n:ex.pot}} và stack {{n:spr.stack.high}}, {{t:spr}} bằng {{n:spr.high}}, tức đối thủ còn vài {{t:pot|pot}} phía sau, còn với stack {{n:spr.stack.low}} thì chỉ là {{n:spr.low}}. Implied odds không thể lớn hơn số {{t:chips}} mà đối thủ còn trước mặt. Với {{t:spr}} thấp, gần như chỉ pot odds là quan trọng. Tìm hiểu thêm về {{t:spr}} trong mô-đun “Lên kế hoạch cho ván bài” (M9), nơi lên kế hoạch cho ván bài theo {{t:spr}} từ flop.

## Khi nào implied odds là thật

- bạn có {{t:draw}} tới **tay bài mạnh nhất** ({{t:flush}} cao nhất có thể, thường là có A),
- đối thủ có **tay bài mạnh** mà họ sẽ trả tiền,
- đối thủ còn **nhiều {{t:chips|chip}}** phía sau ({{t:spr}} cao),
- lá trúng **không dễ nhận ra** (ví dụ: gutshot ít lộ hơn lá cơ thứ ba trên {{t:board|bài chung}}).

Implied odds ngược bất lợi cho bạn: khi bạn có {{t:draw}} tới {{t:flush|thùng}} thấp, hoặc tới {{t:straight|sảnh}} trong khi {{t:flush}} có thể xuất hiện trên {{t:board|bài chung}}, đôi khi bạn trúng mà vẫn thua, lại còn thua trong {{t:pot|pot}} lớn.

:::note Các quy tắc này từ đâu ra
Phép tính implied odds là phép tính chính xác dựa trên {{t:expected-value|giá trị kỳ vọng}}. Các điều kiện để implied odds là thật, cũng như implied odds ngược, là các quy tắc kinh nghiệm từ tài liệu đào tạo.
:::
