---
id: m4.l1
module: m4
order: 1
title: "Khi có người mở trước bạn"
sub: "Bỏ bài, theo hay 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "{{t:cutoff|CO}} {{t:open|mở}} lên {{n:pf.open-size}}. Bạn muốn {{t:raise|tố}} từ Button. Tố lên bao nhiêu?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "Lên {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|Có vị trí}}, bạn {{t:raise|tố}} lên khoảng {{n:pf.3bet.size-ip}} mức {{t:open|mở}}. Đây là mức chuẩn, giúp giữ tỷ lệ stack so với {{t:pot|pot}} tốt trên flop." }
      - { text: "Lên {{n:pf.3bet.too-small}}", why: "Quá nhỏ: đối thủ có giá rất tốt để {{t:call|theo}} với gần như mọi tay bài và chơi tiếp." }
      - { text: "Lên {{n:pf.3bet.too-big}}", why: "Quá lớn khi chơi {{t:in-position}}: bạn mạo hiểm nhiều hơn, mà những tay mạnh hơn của đối thủ vẫn sẽ không {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "Button {{t:open|mở}} lên {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|bỏ bài}}. Bạn muốn {{t:raise|tố}} từ {{t:big-blind|big blind}}. Tố lên bao nhiêu?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "Lên {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Không có vị trí}}, bạn {{t:raise|tố}} lên khoảng {{n:pf.3bet.size-oop}} mức {{t:open|mở}}. Kích cỡ lớn hơn không cho Button được {{t:call}} rẻ khi {{t:in-position}}." }
      - { text: "Lên {{n:pf.3bet.ip-total}}", why: "Đây là kích cỡ dành cho người chơi {{t:in-position}}. {{t:out-of-position|Không có vị trí}}, bạn cho đối thủ mức giá quá tốt." }
      - { text: "Chỉ {{t:call|theo}}", why: "Với KK, bạn muốn xây {{t:pot|pot}} ngay: đây là tay mạnh thứ hai preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "Button {{t:open|mở}} lên {{n:pf.open-size}}. Bạn ở {{t:small-blind|small blind}}. Kế hoạch nào là chuẩn?"
    table: { position: SB }
    options:
      - { text: "{{t:raise|Tố}} hoặc {{t:fold|bỏ bài}}", correct: true, why: "Sau khi {{t:call|theo}}, bạn chơi {{t:out-of-position}}, và phía sau bạn vẫn còn {{t:big-blind}}. Từ {{t:small-blind|small blind}}, trước các lượt {{t:open|mở}} từ vị trí muộn, solver gần như luôn {{t:raise|tố}} hoặc {{t:fold|bỏ bài}}." }
      - { text: "{{t:call|Theo}} rộng, vì tôi đã có nửa blind trong {{t:pot|pot}}", why: "Nửa blind là ít. {{t:call|Theo}} {{t:out-of-position}} khi {{t:big-blind|big blind}} còn ở phía sau khiến bạn {{t:equity-realization|hiện thực hóa equity}} kém: bạn thắng phần {{t:pot|pot}} nhỏ hơn mức equity của tay bài cho thấy, vì bạn thường {{t:fold|bỏ bài}} trước showdown." }
      - { text: "Luôn {{t:fold|bỏ bài}}", why: "Quá chặt: Button {{t:open|mở}} rất rộng, nên đáng để {{t:raise|tố}} với các tay mạnh và một phần {{t:bluff|bluff}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Bạn ở {{t:big-blind|big blind}} trước lượt {{t:open|mở}} từ Button. Tay nào sau đây là 3-bet điển hình dưới dạng {{t:bluff}}?"
    table: { position: BB }
    options:
      - { text: "A5 đồng chất", correct: true, why: "Tay này chặn AA và AK của đối thủ, và sau khi được {{t:call|theo}} vẫn có cơ hội ra {{t:flush}} và {{t:straight|sảnh}}. Đây là {{t:bluff}} điển hình từ phần dưới {{t:range|range}} {{t:call|theo}}: từ {{t:big-blind|big blind}}, bạn 3-bet các tay mạnh nhất cộng thêm những {{t:bluff|bluff}} như vậy." }
      - { text: "K7 khác chất", why: "Với tay này, bạn phòng thủ bằng cách {{t:call|theo}}. Khi 3-bet, nó không chặn được gì quan trọng và chơi kém khi đối thủ {{t:call|theo}}." }
      - { text: "{{t:pair|Đôi}} 22", why: "Các {{t:pair|đôi}} nhỏ nhất phòng thủ bằng cách {{t:call|theo}}: chúng kiếm lời khi ra set ({{t:three-of-a-kind|bộ ba}} với {{t:pocket-pair|pocket pair}}, tức là {{t:pair|đôi}} gồm hai {{t:hole-cards|lá bài tẩy}}), còn 3-bet với chúng thì chịu 4-bet kém." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
Khi có người trước bạn đã {{t:open|mở}}, bạn có ba lựa chọn: {{t:fold|bỏ bài}}, {{t:call|theo}} hoặc {{t:raise|tố}} thêm lần nữa. Lần {{t:raise}} lại này được gọi là 3-bet, vì đó là {{t:bet}} thứ ba trong ván bài (blind, {{t:open}}, {{t:raise}}).

## Kích cỡ 3-bet

{{t:in-position|Có vị trí}}, bạn {{t:raise|tố}} lên khoảng {{n:pf.3bet.size-ip}} mức {{t:open|mở}}, tức là với lượt {{t:open|mở}} {{n:pf.open-size}}, bạn tố lên {{n:pf.3bet.ip-total}}. {{t:out-of-position|Không có vị trí}}, ví dụ từ các blind trước lượt {{t:open|mở}} từ {{t:cutoff|CO}} hoặc Button, bạn tố lên khoảng {{n:pf.3bet.size-oop}} mức {{t:open|mở}}, tức là {{n:pf.3bet.oop-total}}. Kích cỡ lớn hơn khi {{t:out-of-position}} không cho đối thủ một lần {{t:call}} rẻ, mà nhờ đó về sau họ sẽ được chơi với lợi thế {{t:position|vị trí}}.

## {{t:position|Vị trí}} quyết định có nên {{t:call|theo}} hay không

Theo các lời giải solver đã công bố, Button trước lượt {{t:open|mở}} từ {{t:cutoff|CO}} thường 3-bet khoảng {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} số tay, và chỉ {{t:call|theo}} khoảng {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Trước lượt {{t:open|mở}} từ {{t:utg}} (trong lời giải này là mở tối thiểu, lên {{n:pf.open-size.solver-utg}}), số lần {{t:call|theo}} đã nhiều hơn một chút so với 3-bet: khoảng {{n:pf.call-freq.btn-vs-utg}} so với {{n:pf.3bet-freq.btn-vs-utg}}. {{t:range|Range}} của {{t:utg}} mạnh, nên 3-bet thường bị 4-bet hơn và ít khi thắng {{t:pot|pot}} ngay hơn.

```range
vs-open.btn-vs-co
```

Bảng chỉ cho thấy Button chơi những tay nào (bằng 3-bet hoặc {{t:call|theo}}) và {{t:fold|bỏ bài}} những tay nào. Hãy học cách chia giữa 3-bet và {{t:call|theo}} từ các con số ở trên: solver của ứng dụng gần như không {{t:call|theo}} trong spot này, nên không tái hiện được cách chia đó. Ở khoảng hơn chục tay, ví dụ A8s, 98s và 44, solver của ứng dụng chơi khác với các lời giải đã công bố, nên bài tập không chấm những tay này.

Từ {{t:small-blind|small blind}}, bạn gần như luôn {{t:raise|tố}} hoặc {{t:fold|bỏ bài}}. {{t:call|Theo}} nghĩa là chơi {{t:out-of-position}}, và {{t:big-blind}} phía sau bạn vẫn có thể {{t:raise|tố}}. {{t:out-of-position|Không có vị trí}}, tay bài **{{t:equity-realization|hiện thực hóa equity}}** kém hơn: nó thắng phần {{t:pot|pot}} nhỏ hơn mức equity của nó cho thấy, vì bạn {{t:fold|bỏ bài}} trước showdown thường xuyên hơn và khó thắng {{t:pot|pot}} bằng một {{t:bet|cú cược}} hơn.

```range
vs-open.sb-vs-btn
```

Theo lời giải solver đã công bố, {{t:small-blind}} trước Button gần như không {{t:call|theo}} tay nào: nó 3-bet khoảng {{n:pf.3bet-freq.sb-vs-btn}} số tay, tức phần trên của {{t:range|range}} (trong đó có 77+, AJo+, KQo, A5s, A4s, T9s), và {{t:fold|bỏ bài}} với phần còn lại. Solver của ứng dụng ở đây 3-bet {{n:solver.3bet.sb-vs-btn}} số tay, trong đó có các {{t:pair|đôi}} 55 và 66, những tay mà lời giải đã công bố cũng thường 3-bet; số ít lần {{t:call|theo}} của nó được bảng tính là {{t:fold}}. Ở một vài tay, ví dụ ATo, T9s và A4s, solver của ứng dụng chơi khác với các lời giải đã công bố, nên bài tập không chấm những tay này.

## {{t:range|Range}} {{t:linear}} hay {{t:polarized}}

Khi có {{t:position|vị trí}} trước lượt {{t:open|mở}} từ {{t:cutoff|CO}}, bạn chủ yếu 3-bet các tay tốt nhất từ trên xuống và thêm vài {{t:bluff|bluff}} với át đồng chất (A5s, A4s), còn các tay trung bình (ví dụ 77–99, AJs, ATs, {{t:connectors|connector}} đồng chất) thì chơi trộn: một phần 3-bet, một phần {{t:call|theo}}. Đối thủ thường {{t:call|theo}}, nên bạn muốn có tay bài chơi tốt trong {{t:pot|pot}} sau khi được {{t:call|theo}}. Các nguồn gọi {{t:range}} như vậy theo những cách khác nhau: có nguồn gọi là {{t:linear|tuyến tính}} (xây từ những tay mạnh nhất trở xuống), có nguồn gọi là {{t:polarized|phân cực}} (gồm chủ yếu các tay rất mạnh và {{t:bluff|bluff}}, gần như không có tay trung bình); điều quan trọng hơn là bạn 3-bet những tay nào và {{t:call|theo}} những tay nào.

Từ {{t:big-blind|big blind}} trước Button, bạn 3-bet các tay mạnh nhất (TT+, AQ+, AJs+) cộng thêm {{t:bluff|bluff}} từ phần dưới {{t:range|range}} {{t:call|theo}}: A5s, đôi khi A4s, và {{t:connectors|connector}} đồng chất. Át đồng chất chặn AA và AK của đối thủ, và khi bị {{t:call}}, chúng vẫn có thể ra {{t:flush}} hoặc {{t:straight|sảnh}}. Các {{t:pair|đôi}} trung bình và nhỏ, KQo và át khác chất (AJo–A9o) thì bạn thường chỉ {{t:call|theo}}: từ {{t:big-blind|big blind}}, bạn vào bài rẻ và khép lại hành động, nên những tay này kiếm được nhiều hơn sau khi {{t:call|theo}}. Thành phần phụ thuộc vào {{t:rake|rake}} và kích cỡ 3-bet, nên 99, KQo và AJo có thể được chơi theo nhiều cách khác nhau. Trước lượt {{t:open|mở}} của {{t:small-blind|small blind}}, bạn 3-bet chủ yếu để lấy {{t:value|giá trị}} (TT+, AJs+, một phần AQo và KQ), còn A5s và {{t:connectors|connector}} đồng chất thì thường {{t:call|theo}}.

Từ {{t:small-blind|small blind}}, bạn chơi khác: 3-bet hoặc {{t:fold}}, với phần trên của {{t:range|range}} nằm trong 3-bet.

:::note Các nguyên tắc này đến từ đâu
Bảng của Button và {{t:small-blind|small blind}} lấy từ solver của ứng dụng và gần khớp với các nguồn (ở {{t:small-blind|small blind}}, trừ một vài tay mà bài tập không chấm). Cách 3-bet từ {{t:big-blind|big blind}} được dạy bằng một quy tắc dựa trên kết quả đã công bố của các solver khác từ một số nguồn độc lập: thành phần 3-bet từ {{t:big-blind|big blind}} trong solver của ứng dụng khác với các kết quả đó.
:::
