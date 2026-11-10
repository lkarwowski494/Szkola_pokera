---
id: m2.l1
module: m2
order: 1
title: "Out và xác suất"
sub: "Quy tắc 2 và 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Bạn có bao nhiêu out để ra {{t:flush|thùng}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Bạn có {{n:draw.flush.seen}} lá cơ (2 trên tay, 2 trên {{t:board|bàn}}). Bộ bài có {{n:cards.per-suit}} lá cơ, nên còn lại {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} là tất cả lá cơ trong bộ bài, nhưng bạn đã thấy {{n:draw.flush.seen}} lá." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} là số lá cơ bạn đã có. Ta đếm những lá bạn cần." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Bạn có bao nhiêu out để ra {{t:straight|sảnh}}?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Bạn có 6-7-8-9. Mọi lá 5 và mọi lá 10 đều cho bạn {{t:straight|sảnh}}: {{n:draw.oesd.ranks}} hạng × {{n:cards.suits}} chất = {{n:outs.oesd}} lá." }
      - { text: "{{n:outs.gutshot}}", why: "Đó là số out khi thiếu một lá ở giữa (gutshot). Ở đây {{t:straight}} mở cả hai đầu." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Hai hạng bài (lá 5 và lá 10), nhưng mỗi hạng có bốn chất." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, bạn có {{n:outs.flush}} out để ra {{t:flush|thùng}}. Khả năng bạn trúng ở river là bao nhiêu?"
    options:
      - { text: "Khoảng {{n:odds.flush.turn-river}}", correct: true, why: "Còn một lá để lật: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (ước lượng). Chính xác là {{n:outs.flush}} trên {{n:cards.unseen.turn}} lá chưa biết, tức {{n:odds.flush.turn-river}}." }
      - { text: "Khoảng {{n:odds.flush.flop-river}}", why: "Đó là khả năng ở flop, khi còn hai lá để lật. Ở turn chỉ còn một lá." }
      - { text: "Khoảng {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} nghĩa là cứ hai lá chưa biết thì có một lá cho bạn {{t:flush}}. Thực ra chỉ {{n:outs.flush}} trên {{n:cards.unseen.turn}} lá làm được điều đó." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Ở flop bạn có gutshot ({{n:outs.gutshot}} out). Khả năng trúng tính đến river là bao nhiêu?"
    options:
      - { text: "Khoảng {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (ước lượng). Chính xác là {{n:odds.gutshot.flop-river}}. Tuy nhiên, bạn chỉ có khả năng này khi được xem cả hai lá mà không có thêm {{t:bet|cược}} nào (all-in). Khi đối thủ {{t:bet|cược}} ở flop, bạn trả cho một lá: khi đó khả năng là khoảng {{n:odds.gutshot.flop-turn}}." }
      - { text: "Khoảng {{n:odds.gutshot.rule-turn}}", why: "Đó là khả năng ước lượng với một lá ({{n:outs.gutshot}} × 2). Câu hỏi là về cả hai lá: turn và river." }
      - { text: "Khoảng {{n:odds.oesd.flop-river}}", why: "Đó là khả năng nếu bạn có {{n:outs.oesd}} out. Gutshot chỉ có {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Bạn có {{t:flush-draw}}, và đối thủ {{t:bet|cược}}. Bạn so sánh giá để {{t:call|theo}} với khả năng trúng nào?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Khoảng {{n:odds.flush.flop-turn}}, khả năng ở turn", correct: true, why: "{{t:call|Theo}} chỉ mua được một lá. Ở turn đối thủ có thể {{t:bet|cược}} tiếp và bạn sẽ trả riêng cho river. {{n:outs.flush}} trên {{n:cards.unseen.flop}} là khoảng {{n:odds.flush.flop-turn}}." }
      - { text: "Khoảng {{n:odds.flush.flop-river}}, khả năng tính đến river", why: "Bạn chỉ có khả năng này khi chắc chắn được xem cả hai lá mà không có thêm {{t:bet|cược}} nào, tức là khi có người all-in. Với một {{t:bet}} thông thường ở flop, bạn mua một lá." }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn. Bạn có {{n:outs.flush}} out để ra {{t:flush|thùng}}. Theo quy tắc 2 và 4, khả năng trúng ở river là bao nhiêu phần trăm? Hãy nhập một số."
    answer: odds.flush.rule-turn
    explanation: "Còn một lá để lật, nên bạn nhân với 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (ước lượng). Chính xác: {{n:outs.flush}} trên {{n:cards.unseen.turn}} lá, tức {{n:odds.flush.turn-river}}."
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
**Out** là lá bài nâng tay bài của bạn thành tay nhiều khả năng thắng. Đếm out giúp bạn ước lượng nhanh khả năng của mình mà không cần máy tính.

## Các {{t:draw|bài chờ}} thường gặp

- **{{t:flush-draw|Bài chờ thùng}}** ({{n:draw.flush.seen}} lá cùng chất, thiếu một lá để thành {{t:flush|thùng}}): **{{n:outs.flush}} out**. Một chất có {{n:cards.per-suit}} lá, bạn đã thấy {{n:draw.flush.seen}} lá.
- **{{t:oesd|Bài chờ sảnh hai đầu}}**, ví dụ [[8c 9d]] trên {{t:board|bàn}} [[6s 7h Kd]]: **{{n:outs.oesd}} out**, tức bốn lá 5 và bốn lá 10.
- **Lỗ hổng giữa {{t:straight|sảnh}} (gutshot)**, ví dụ 5-6-8-9 thiếu lá 7: **{{n:outs.gutshot}} out**.

## Quy tắc 2 và 4

Quy tắc này cho bạn khả năng ước lượng mà không cần máy tính: nhân số out với 2 hoặc 4. Khả năng chính xác có trong bảng bên dưới.

```formula
khả năng ≈ số out × 2   (còn một lá để lật)
khả năng ≈ số out × 4   (hai lá, chỉ khi bạn xem được cả hai mà không có thêm cược)
```

| {{t:draw|Bài chờ}} | Out | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| {{t:flush|Thùng}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|Bài chờ sảnh hai đầu}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## Một lá hay hai lá?

Khi đối thủ {{t:bet|cược}} ở flop, việc bạn {{t:call}} chỉ mua được một lá: turn. Ở turn đối thủ có thể {{t:bet|cược}} tiếp và bạn sẽ trả riêng cho river. Vì vậy, khi gặp {{t:bet|cược}} ở flop, bạn tính khả năng cho **lá tiếp theo** (× 2): với {{t:flush|thùng}} là {{n:outs.flush}} trên {{n:cards.unseen.flop}}, tức khoảng {{n:odds.flush.flop-turn}}. Chỉ dùng khả năng **tính đến river** (× 4, với {{t:flush|thùng}} khoảng {{n:odds.flush.flop-river}}) khi bạn chắc chắn được xem cả hai lá mà không có thêm {{t:bet|cược}} nào, tức là khi có người all-in.

:::note Những con số này từ đâu ra
Ở turn có {{n:cards.unseen.turn}} lá bạn không biết ({{n:cards.deck}} trừ {{n:cards.hole}} lá của bạn và {{n:cards.board.turn}} lá trên {{t:board|bàn}}). Khả năng trúng {{t:flush|thùng}} là {{n:outs.flush}} trên {{n:cards.unseen.turn}}. Quy tắc 2 và 4 sai lệch nhiều nhất khoảng {{n:rule24.error.max.pp}} điểm phần trăm, miễn là số out không quá {{n:rule24.outs.max}}.
:::
