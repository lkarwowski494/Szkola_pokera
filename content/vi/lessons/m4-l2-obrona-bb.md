---
id: m4.l2
module: m4
order: 2
title: "Phòng thủ ở mù lớn"
sub: "Giá để theo và phòng thủ rộng"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "Button {{t:open|mở}} lên {{n:pf.open-size}}, {{t:small-blind|mù nhỏ}} {{t:fold|bỏ bài}}. Bạn cần bao nhiêu phần trăm equity ở {{t:big-blind|mù lớn}} để {{t:call|theo}} có lãi (chưa tính lối chơi sau flop)? Hãy nhập một số."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Bạn bỏ thêm {{n:bb.call.vs-btn}} vào {{t:pot|pot}}, mà sau khi bạn {{t:call|theo}} sẽ có {{n:bb.pot-after.vs-btn}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} là khoảng {{n:eq.bb-vs-btn-open}}. Bạn chỉ cần một nửa nếu trong {{t:pot|pot}} chỉ có {{t:bet|cược}} của đối thủ; các blind trong {{t:pot|pot}} giúp giá tốt hơn."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "{{t:small-blind|Mù nhỏ}} {{t:open|mở}} lên {{n:pf.open-size-sb}}. Bạn cần bao nhiêu equity ở {{t:big-blind|mù lớn}} để {{t:call|theo}}?"
    table: { position: BB }
    options:
      - { text: "Khoảng {{n:eq.bb-vs-sb-open}}", correct: true, why: "Bạn bỏ thêm {{n:bb.call.vs-sb}} vào {{t:pot|pot}}, mà sau khi bạn {{t:call|theo}} sẽ có {{n:bb.pot-after.vs-sb}}: tức là khoảng {{n:eq.bb-vs-sb-open}}. Giá tệ hơn so với khi đối đầu Button, nhưng bù lại sau flop bạn có {{t:position|vị trí}}." }
      - { text: "Khoảng {{n:eq.bb-vs-btn-open}}", why: "Đó là giá khi đối đầu lượt {{t:open|mở}} từ Button lên {{n:pf.open-size}}. {{t:small-blind|Mù nhỏ}} {{t:open|mở}} với kích thước lớn hơn, nên bạn phải trả nhiều hơn." }
      - { text: "Khoảng một nửa", why: "Bạn sẽ cần một nửa equity nếu trong {{t:pot|pot}} chỉ có {{t:bet|cược}} của đối thủ. Ở đây trong pot còn có các blind, nên giá tốt hơn." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Vì sao ở {{t:big-blind|mù lớn}} bạn không {{t:call|theo}} với mọi tay bài có khoảng {{n:eq.bb-vs-btn-open}} equity so với {{t:range|range}} của Button?"
    table: { position: BB }
    options:
      - { text: "Vì khi {{t:out-of-position|không có vị trí}}, bạn sẽ không hiện thực hóa được toàn bộ equity", correct: true, why: "Equity là cơ hội thắng khi chơi đến cuối mà không có {{t:bet|cược}} nào. Khi {{t:out-of-position|không có vị trí}}, bạn thường sẽ {{t:fold|bỏ}} tay bài trước showdown, nên các tay yếu khác chất hiện thực hóa ít hơn mức equity cho thấy." }
      - { text: "Vì Button luôn có tay bài mạnh", why: "Button {{t:open|mở}} rất rộng, vì vậy phòng thủ ở {{t:big-blind|BB}} cũng rộng." }
      - { text: "Vì cần tiết kiệm {{t:chips|chip}}", why: "Điều quan trọng là {{t:expected-value|giá trị kỳ vọng}}, không phải tiết kiệm {{t:chips|chip}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "Button {{t:open|mở}} lên {{n:pf.open-size}}, {{t:small-blind|mù nhỏ}} {{t:fold|bỏ bài}}. Bạn có QQ ở {{t:big-blind|mù lớn}}. Bạn làm gì?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet lên {{n:pf.3bet.oop-total}}", correct: true, why: "QQ là tay bài để lấy {{t:value|giá trị}}. Khi {{t:out-of-position|không có vị trí}}, bạn {{t:raise|tố}} khoảng {{n:pf.3bet.size-oop}} mức {{t:open|mở}}, để Button không thể {{t:call|theo}} rẻ khi {{t:in-position|có vị trí}}." }
      - { text: "3-bet lên {{n:pf.3bet.ip-total}}", sizeError: true, why: "Hành động đúng, nhưng đó là kích thước dành cho người chơi {{t:in-position|có vị trí}} ({{n:pf.3bet.size-ip}} mức {{t:open|mở}}). Khi {{t:out-of-position|không có vị trí}}, bạn {{t:raise|tố}} lớn hơn: lên {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Theo}}", why: "Bạn mất giá trị: với QQ, bạn muốn xây {{t:pot|pot}} trước flop, chứ không phải chơi một {{t:pot|pot}} nhỏ khi {{t:out-of-position|không có vị trí}}." }
      - { text: "{{t:fold|Bỏ bài}}", why: "QQ là một trong những tay bài tốt nhất preflop. {{t:fold|Bỏ bài}} là sai lầm lớn." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "Button {{t:open|mở}} lên {{n:pf.open-size}}, {{t:small-blind|mù nhỏ}} {{t:fold|bỏ bài}}. Hãy tô các tay bài bạn dùng để phòng thủ {{t:big-blind|mù lớn}} (bằng cách {{t:call|theo}} hoặc 3-bet)."
---
{{t:big-blind|Mù lớn}} đã có nguyên một blind trong {{t:pot|pot}}, nên khi gặp lượt {{t:open|mở}} chỉ phải bỏ thêm ít. Khi Button {{t:open|mở}} lên {{n:pf.open-size}} và {{t:small-blind|mù nhỏ}} {{t:fold|bỏ bài}}, bạn chỉ cần khoảng {{n:eq.bb-vs-btn-open}} equity để {{t:call|theo}}. Vì vậy {{t:big-blind|mù lớn}} phòng thủ rộng nhất trong tất cả các {{t:position|vị trí}}.

## Giá không phải là tất cả

Equity cho biết bạn thắng thường xuyên đến mức nào nếu cả hai cùng đi đến showdown mà không có thêm {{t:bet|cược}} nào. Khi {{t:out-of-position|không có vị trí}}, bạn thường sẽ {{t:fold|bỏ bài}} sau flop, nên các tay yếu khác chất hiện thực hóa ít hơn equity của chúng. Các tay đồng chất, {{t:connectors|bài liên tiếp}} và {{t:pair|đôi}} trung bình hiện thực hóa nhiều hơn, vì vậy trong bảng bạn phòng thủ với chúng nhiều hơn.

```range
vs-open.bb-vs-btn
```

Các lời giải solver đã công bố phòng thủ ở đây khoảng {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} số tay bài ({{t:call|theo}} và 3-bet cộng lại). Solver của ứng dụng, nguồn gốc của bảng này, phòng thủ ở đây rộng hơn các lời giải đã công bố.

## Khi đối đầu {{t:small-blind|mù nhỏ}}

{{t:small-blind|Mù nhỏ}} {{t:open|mở}} với kích thước lớn hơn, lên {{n:pf.open-size-sb}}, nên bạn cần khoảng {{n:eq.bb-vs-sb-open}} equity để {{t:call|theo}}. Giá tệ hơn, nhưng sau flop bạn có {{t:position|vị trí}}, nên bạn vẫn phòng thủ rộng: hơn một nửa số tay bài.

```range
vs-open.bb-vs-sb
```

Lời giải solver đã công bố phòng thủ ở đây khoảng {{n:pf.bb-def.vs-sb.pub}} số tay bài. Solver của ứng dụng, nguồn gốc của bảng này, phòng thủ ở đây hẹp hơn lời giải đã công bố.

:::note Cách {{t:raise|tố}} từ {{t:big-blind|mù lớn}}
Các bảng cho biết nên phòng thủ với tay nào, chứ không cho biết phòng thủ thế nào: 3-bet và {{t:call|theo}} được gộp chung, vì thành phần 3-bet từ {{t:big-blind|mù lớn}} trong solver của ứng dụng khác với kết quả đã công bố của các solver khác. Khi đối đầu Button, 3-bet từ {{t:big-blind|mù lớn}} khoảng {{n:pf.3bet.size-oop}} mức {{t:open|mở}}. Bạn 3-bet các tay mạnh nhất (TT+, AQ+, AJs+) cùng với các tay {{t:bluff|bluff}} từ phần dưới của {{t:range|range}} {{t:call|theo}}: A5s, đôi khi A4s, và {{t:connectors|bài liên tiếp}} đồng chất. Với {{t:pair|đôi}} trung bình và nhỏ, KQo và các tay A khác chất, bạn thường {{t:call|theo}}. Khi đối đầu {{t:small-blind|mù nhỏ}}, bạn có {{t:position|vị trí}}, nên bạn {{t:raise|tố}} nhỏ hơn, khoảng {{n:pf.3bet.size-ip}} mức {{t:open|mở}}. Khi đó bạn 3-bet chủ yếu để lấy {{t:value|giá trị}} (TT+, AJs+, một phần AQo và KQ), còn với A5s và {{t:connectors|bài liên tiếp}} đồng chất bạn thường {{t:call|theo}}.
:::
