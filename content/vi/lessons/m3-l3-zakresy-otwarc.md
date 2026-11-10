---
id: m3.l3
module: m3
order: 3
title: "Dải bài mở cược"
sub: "Vào bài với tay nào khi là người đầu tiên, theo từng vị trí"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "Tất cả người trước bạn đều đã {{t:fold|bỏ bài}}, bạn đang ở Button. Hãy tô những tay bài mà bạn dùng để {{t:open|mở cược}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Bạn là người hành động đầu tiên ({{t:utg|UTG}}). Hãy tô những tay bài mà bạn dùng để {{t:open|mở cược}}."
---
{{t:range|Range}} {{t:open|mở cược}} là danh sách những tay bài mà bạn {{t:raise|tố}} khi tất cả người trước bạn đều đã {{t:fold|bỏ bài}}. Các bảng lưới dưới đây do solver preflop của ứng dụng này tính cho lối chơi ở bàn 6 người với stack {{n:format.stack}}.

## Cách đọc bảng lưới

Mỗi ô là một loại tay bài. Phía trên đường chéo là các tay bài cùng chất (ví dụ AKs), phía dưới là các tay bài khác chất (ví dụ AKo), còn trên đường chéo là các {{t:pair|đôi}}. Ô màu xanh lá là {{t:raise|tố}}, ô trống là {{t:fold|bỏ bài}}. Ô được tô một phần nghĩa là solver chỉ thỉnh thoảng chơi tay bài đó. Nếu solver {{t:open|mở cược}} với tay đó với tần suất từ {{n:range.mixed.low}} đến {{n:range.mixed.high}} (các ngưỡng này là thiết lập của ứng dụng), thì đó là {{t:mixed-hand|tay bài trộn}}: khi đó, trong bài tập chúng tôi chấp nhận cả hai câu trả lời. Hành động mà solver chơi ít hơn {{n:range.mixed.low}} số lần, nhưng ít nhất {{n:range.mixed.min}}, được bài tập coi là chấp nhận được: đó không phải lỗi, nhưng phần ôn lại của nhiệm vụ này sẽ quay lại sớm hơn. Hành động mà solver chơi ít hơn {{n:range.mixed.min}} số lần bị bài tập đánh giá là thiếu chính xác (thang đánh giá do trang của solver công bố gọi những nước đi như vậy là thế), còn hành động mà solver không bao giờ chơi bị đánh giá là lỗi.

## Từ {{t:position|vị trí}} đầu tiên đến Button

```range
rfi.utg
```

Từ {{t:utg|UTG}}, solver {{t:open|mở cược}} với {{n:solver.rfi.utg}} số tay bài. Các nguồn chuyên nghiệp đưa ra {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

Với mỗi {{t:position|vị trí}} gần Button hơn, {{t:range|range}} lại rộng hơn: {{t:hijack|HJ}} {{t:open|mở cược}} với {{n:solver.rfi.hj}}, còn {{t:cutoff|CO}} đã lên tới {{n:solver.rfi.co}} số tay bài.

```range
rfi.btn
```

Ở Button, solver {{t:open|mở cược}} với tới {{n:solver.rfi.btn}} số tay bài, vì chỉ còn lại các blind và sau flop bạn sẽ có {{t:position|vị trí}}.

```range
rfi.sb
```

{{t:small-blind|Small blind}} chỉ còn chơi với {{t:big-blind|big blind}}, nên {{t:open|mở cược}} rộng gần như Button: khoảng {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} số tay bài, dù sau flop phải hành động trước. Ở {{t:stakes|mức cược}} micro, từ {{t:small-blind|small blind}} bạn hoặc {{t:raise|tố}} hoặc {{t:fold|bỏ bài}}, không bù thêm cho đủ {{t:big-blind|big blind}}: {{t:rake|phí rake}} thu từ {{t:pot|pot}} làm giảm lợi nhuận của việc bù thêm. Đây là cách đơn giản hóa: một số lời giải của solver có bù thêm với một phần tay bài từ {{t:small-blind|small blind}}. Solver của ứng dụng {{t:open|mở cược}} từ vị trí này với {{n:solver.rfi.sb}} số tay bài, tức là nằm trong khoảng mà các nguồn đưa ra.

:::note Ở bàn 9 người
Ở bàn 9 người, trước {{t:hijack|HJ}} còn có thêm ba {{t:position|vị trí}}: {{t:utg|UTG}}, {{t:utg|UTG}}+1 và {{t:utg|UTG}}+2, tiếp theo là LJ. Khi đó, sau {{t:utg|UTG}} có tám người chơi, nên từ {{t:utg|UTG}}, {{t:utg|UTG}}+1 và {{t:utg|UTG}}+2 bạn {{t:open|mở cược}} hẹp hơn so với từ {{t:utg|UTG}} ở bàn 6 người: sau bạn có nhiều người chơi hơn. Khi ba người chơi này {{t:fold|bỏ bài}}, LJ chơi như {{t:utg|UTG}} ở bàn 6 người, còn các {{t:position|vị trí}} phía sau chơi giống như trong các bảng lưới ở trên. Với các {{t:position|vị trí}} đầu ở bàn 9 người, chúng tôi chỉ đưa ra hướng chung: chúng tôi chưa đối chiếu các con số và thành phần của những {{t:range|range}} này với các lời giải solver đã được công bố.
:::

:::note Cách ghi nhớ
Đừng học thuộc lòng {{n:combos.kinds}} ô. Hãy nhớ các ranh giới: những {{t:pair|đôi}} nào, những quân át cùng chất nào, và các tay bài khác chất bắt đầu từ lá bài nào. Các bài tập dưới đây sẽ chia những tay bài ở ranh giới của {{t:range|range}} thường xuyên hơn.
:::

Những {{t:range|range}} này đến từ một mô hình đơn giản hóa lối chơi sau flop, vì vậy ở hơn chục tay bài nằm ở ranh giới của {{t:range|range}}, chúng khác với các bảng chuyên nghiệp, khi theo hướng này, khi theo hướng kia. Chủ yếu là các tay bài cùng chất có khoảng trống (ví dụ 75s, 97s) và các tay bài khác chất yếu (ví dụ A4o, K7o). Bài tập không chấm điểm những tay bài này.
