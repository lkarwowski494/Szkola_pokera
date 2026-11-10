---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "Khi nào theo là có lợi"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "{{t:pot|Pot}} đang có {{n:ex.third.pot}}. Đối thủ {{t:bet|cược}} {{n:ex.third.bet}}. Bạn cần bao nhiêu equity để {{t:call|theo}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "{{t:pot|Pot}} sau {{t:bet|cược}} là {{n:ex.third.pot-after-bet}}, bạn bỏ thêm {{n:ex.third.bet}}, tổng cộng {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Đó là mức bạn cần khi gặp {{t:bet|cược}} bằng cỡ {{t:pot|pot}}. Ở đây {{t:bet}} là 1/3 {{t:pot|pot}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "Đó là {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Hãy cộng cả khoản {{t:call}} của bạn vào mẫu số." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Bạn có {{t:flush-draw}}. {{t:pot|Pot}} có {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Bạn cần {{n:eq.bet-pot}}. {{t:flush|Thùng}} cho bạn {{n:outs.flush}} out, tức khoảng {{n:odds.flush.turn-river}}. Ngay cả khi tính thêm {{n:pair.outs.per-rank}} lá át cho bạn {{t:pair|đôi}} át (tổng cộng {{n:outs.flush-ace}} out, khoảng {{n:odds.flush-ace.turn-river}}), con số đó vẫn thấp hơn rõ rệt so với {{n:eq.bet-pot}}. Kiểu {{t:call}} này sẽ thua lỗ về lâu dài." }
      - { text: "{{t:call|Theo}}", why: "Rất hấp dẫn, vì bạn có {{t:draw}} tới {{t:flush|thùng}} mạnh nhất và lá át cũng có thể giúp ích, nhưng ngay cả khoảng {{n:odds.flush-ace.turn-river}} vẫn thấp hơn {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Tố}} all-in", why: "Người chơi trình độ cao đôi khi chọn nước đi này, nhưng nếu không có lý do chính đáng, bạn đang mạo hiểm cả stack (toàn bộ {{t:chips|chip}} bạn có trước mặt) với một tay bài chưa có gì." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Cùng tay bài đó, nhưng đối thủ chỉ {{t:bet|cược}} {{n:ex.bet.quarter}} vào {{t:pot|pot}} {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Bạn cần {{n:eq.bet-quarter}}, còn bạn có khoảng {{n:odds.flush.turn-river}}, tính thêm các lá át thì còn nhiều hơn. Một {{t:bet}} nhỏ cho bạn mức giá tốt." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá rẻ để {{t:fold|bỏ bài}}: {{n:odds.flush.turn-river}} cao hơn mức {{n:eq.bet-quarter}} cần có, tính thêm các lá át thì còn cao hơn nữa." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Đối thủ {{t:bet|cược}} nửa {{t:pot|pot}}. Bạn cần bao nhiêu equity?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Pot}} {{n:ex.pot}}, {{t:bet}} {{n:ex.bet.half}}. Bạn bỏ thêm {{n:ex.bet.half}} vào tổng cộng {{n:ex.half.total}}, tức là {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Lỗi thường gặp: {{n:ex.wrong.half}} là {{t:bet}} chia cho {{t:pot|pot}} trước {{t:bet|cược}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Bạn chia phần bỏ thêm cho toàn bộ {{t:pot|pot}} sau khi bạn {{t:call|theo}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Đó là mức bạn cần khi gặp {{t:bet|cược}} bằng cả {{t:pot|pot}}." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "Đối thủ {{t:bet|cược}} cả {{t:pot|pot}}. Bạn cần bao nhiêu phần trăm equity để {{t:call|theo}}? Hãy nhập một số."
    answer: eq.bet-pot
    explanation: "{{t:pot|Pot}} {{n:ex.pot}}, {{t:bet}} {{n:ex.bet.pot}}. Bạn bỏ thêm {{n:ex.bet.pot}} vào {{t:pot|pot}} mà sau khi bạn {{t:call|theo}} sẽ có {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Bạn chia phần bỏ thêm cho toàn bộ {{t:pot|pot}}: {{n:eq.bet-pot}}, tức một phần ba."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Khi đối thủ {{t:bet|cược}} còn bạn có {{t:draw}}, câu hỏi là: mức giá có tốt không? Bạn so sánh hai con số: **bạn cần thắng bao nhiêu** và **bạn thực sự thắng bao nhiêu**.

:::note Equity và khả năng trúng bài
**Equity** là phần {{t:pot|pot}} của bạn: bạn sẽ thắng thường xuyên đến mức nào nếu ván bài đi đến showdown mà không có thêm {{t:bet|cược}} nào. **Khả năng trúng bài** trong bài học về out chỉ là xác suất ra một lá out. Với một {{t:draw}} thuần túy, chỉ thắng khi trúng, khả năng trúng trên những lá bài bạn thực sự được xem với mức giá này là giá trị xấp xỉ của equity. Khi gặp {{t:bet|cược}} ở flop, đó là khả năng trúng với một lá bài, chứ không phải tính đến river.
:::

## Bạn cần thắng bao nhiêu

```formula
equity cần có = tiền theo ÷ pot sau khi bạn theo
pot sau khi bạn theo = pot trước cược + cược + tiền theo
```

Ví dụ: {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.half}}. {{t:pot|Pot}} lúc này có {{n:ex.half.pot-after-bet}}, bạn bỏ thêm {{n:ex.bet.half}}, nên {{t:pot}} sau khi bạn {{t:call|theo}} có {{n:ex.half.total}}. Bạn cần {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Bảng tra nhanh

| {{t:bet|Cược}} của đối thủ | Equity cần có |
|---|---|
| Cả {{t:pot}} | {{n:eq.bet-pot}} |
| Nửa {{t:pot|pot}} | {{n:eq.bet-half}} |
| Một phần tư {{t:pot|pot}} | {{n:eq.bet-quarter}} |

:::note Quyết định
Nếu equity của bạn lớn hơn mức cần có, bạn {{t:call|theo}}. Nếu nhỏ hơn, bạn {{t:fold|bỏ bài}}. Điều này suy ra từ {{t:expected-value|giá trị kỳ vọng}}: {{t:expected-value|EV}} của {{t:call|việc theo}} = equity × {{t:pot}} sau khi bạn {{t:call|theo}} − {{t:call|tiền theo}}, và giá trị này âm khi và chỉ khi equity nhỏ hơn mức cần có. Chỉ một phép tính này đã loại bỏ phần lớn các sai lầm tốn kém của người mới. Tạm thời bạn bỏ qua {{t:implied-odds}}, tức số {{t:chips|chip}} bạn kỳ vọng thắng thêm sau đó trong ván nếu hoàn thành tay bài của mình; chúng sẽ quay lại trong các mô-đun sau.
:::
