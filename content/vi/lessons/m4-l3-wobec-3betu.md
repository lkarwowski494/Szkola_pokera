---
id: m4.l3
module: m4
order: 3
title: "Khi bạn gặp 3-bet"
sub: "Bỏ bài, theo hay 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "Bạn {{t:open|mở cược}} từ {{t:cutoff|CO}} với mức {{n:pf.open-size}}, Button {{t:raise|tố}} lên {{n:pf.3bet.ip-total}}, hai blind {{t:fold|bỏ bài}}. Bạn phải tiếp tục ({{t:call|theo}} hoặc 4-bet) với ít nhất bao nhiêu phần {{t:range|range}} {{t:open|mở cược}} để Button không có lời khi 3-bet với mọi tay bài?"
    table: { position: CO }
    options:
      - { text: "Khoảng {{n:mdf.vs-3bet-ip-size}} {{t:range|range}} {{t:open|mở cược}}", correct: true, why: "Button mạo hiểm {{n:pf.3bet.ip-total}} để thắng {{n:vs3bet.win}}. Nếu bạn {{t:fold|bỏ bài}} thường xuyên hơn {{n:alpha.vs-3bet-ip-size}}, 3-bet của họ có lời ngay cả với tay bài tệ nhất." }
      - { text: "Khoảng một nửa {{t:range|range}}", why: "Quá nhiều cho mức tối thiểu: theo toán học chỉ cần {{n:mdf.vs-3bet-ip-size}}. Theo lời giải của solver và các bảng, người {{t:open|mở cược}} {{t:fold|bỏ bài}} khoảng {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} số lần {{t:open|mở cược}}, nên họ tiếp tục với ít hơn một nửa {{t:range|range}}." }
      - { text: "Luôn luôn, với mọi tay bài", why: "Khi đó bạn trả tiền cho các 3-bet bằng những tay bài thua {{t:range|range}} của Button. {{t:fold|Bỏ bài}} với phần yếu nhất trong các tay {{t:open|mở cược}} là đúng." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Bạn {{t:open|mở cược}} từ {{t:cutoff|CO}} với mức {{n:pf.open-size}}, Button {{t:raise|tố}} lên {{n:pf.3bet.ip-total}}, hai blind {{t:fold|bỏ bài}}. Bạn làm gì?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "KJ khác chất khi {{t:out-of-position}} thường bị AK, AJ và KQ áp chế, và khó chơi sau flop. Các tài liệu đào tạo khuyên {{t:fold}} ở đây." }
      - { text: "{{t:call|Theo}}", why: "Dễ bị cám dỗ vì đây là bài cao, nhưng khi {{t:out-of-position}} tay bài này {{t:equity-realization|hiện thực hóa equity}} kém và thường thua kicker tốt hơn." }
      - { text: "4-bet", why: "KJo quá yếu để 4-bet {{t:value|lấy giá trị}}, còn với vai trò {{t:bluff}} thì nó không chặn các tay bài mà Button dùng để tiếp tục." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Bạn {{t:open|mở cược}} từ {{t:cutoff|CO}} với mức {{n:pf.open-size}}, Button {{t:raise|tố}} lên {{n:pf.3bet.ip-total}}, hai blind {{t:fold|bỏ bài}}. Bạn làm gì?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "4-bet", correct: true, why: "Bạn thường 4-bet với AK: tay này muốn đưa cả stack vào, chặn AA và KK của đối thủ, và áp chế AQ, KQ cùng các tay A yếu hơn." }
      - { text: "{{t:call|Theo}}", why: "Một số nguồn đôi khi {{t:call|theo}} với AK, nhưng thường bạn sẽ 4-bet: khi {{t:out-of-position}}, sau khi {{t:call|theo}} bạn mất {{t:initiative|thế chủ động}} và giá trị." }
      - { text: "{{t:fold|Bỏ bài}}", why: "AK là một trong những tay bài tốt nhất preflop. {{t:fold|Bỏ bài}} ở đây là sai lầm lớn." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Bạn {{t:open|mở cược}} từ Button với mức {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|bỏ bài}}, {{t:big-blind}} {{t:raise|tố}} lên {{n:pf.3bet.oop-total}}. Bạn làm gì?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Một tay {{t:connectors|connector}} đồng chất khi {{t:in-position}} {{t:equity-realization|hiện thực hóa equity}} tốt: nó ra {{t:straight|sảnh}} và thùng, còn khi trượt thì dễ {{t:fold|bỏ bài}} trên flop." }
      - { text: "{{t:fold|Bỏ bài}}", why: "{{t:in-position|Khi có vị trí}}, tay bài này đủ chơi được để phòng thủ. {{t:fold|Bỏ bài}} sẽ là quá chặt." }
      - { text: "4-bet", why: "Với vai trò {{t:bluff}}, các tay A đồng chất phù hợp hơn vì chúng chặn AA và AK. 87s muốn xem flop hơn." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Bạn {{t:open|mở cược}} từ Button với mức {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|bỏ bài}}, {{t:big-blind}} {{t:raise|tố}} lên {{n:pf.3bet.oop-total}}. Bạn làm gì?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Theo một nguồn, bạn {{t:fold|bỏ}} các {{t:pair|đôi}} thấp nhất trước 3-bet lớn ngay cả khi {{t:in-position}}: chúng kiếm lời chủ yếu nhờ ra set, mà giá thì quá cao. Một nguồn khác cho phép {{t:call|theo}} với chúng khi {{t:in-position}}." }
      - { text: "{{t:call|Theo}}, vì tôi có {{t:position|vị trí}}", why: "{{t:position|Vị trí}} có giúp ích, nhưng trước 3-bet lên {{n:pf.3bet.oop-total}} thì giá quá cao cho một tay bài cần ra set." }
      - { text: "4-bet", why: "{{t:pair|Đôi}} 33 không phải tay để 4-bet: không phải giá trị, cũng không phải một {{t:bluff}} tốt." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Bạn {{t:open|mở cược}} từ {{t:cutoff|CO}} với mức {{n:pf.open-size}}, Button {{t:raise|tố}} lên {{n:pf.3bet.ip-total}}, hai blind {{t:fold|bỏ bài}}. Bạn làm gì?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "4-bet", correct: true, why: "Một nguồn 4-bet QQ (và JJ) trong tuyệt đại đa số trường hợp: Button tiếp tục với nhiều {{t:pair|đôi}} và tay A yếu hơn." }
      - { text: "{{t:call|Theo}}", correct: true, why: "Cũng là lối chơi tốt: một nguồn khác xếp QQ vào {{t:range|range}} {{t:call|theo}}, để không đẩy các tay yếu hơn của Button ra khỏi ván. Các nguồn khác nhau, nên cả hai lối chơi đều tốt." }
      - { text: "{{t:fold|Bỏ bài}}", why: "QQ là tay bài tốt thứ ba preflop. {{t:fold|Bỏ bài}} là sai lầm lớn." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Bạn {{t:open|mở cược}} từ {{t:cutoff|CO}} với mức {{n:pf.open-size}}, Button {{t:raise|tố}} lên {{n:pf.3bet.ip-total}}, hai blind {{t:fold|bỏ bài}}. Bạn làm gì?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Tay A mạnh đồng chất là nền tảng của {{t:range|range}} {{t:call|theo}}: nó chặn AA và AK, ra thùng và các {{t:pair|đôi}} tốt." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt: AJs thuộc nhóm tay tốt nhất để phòng thủ trước 3-bet." }
      - { text: "4-bet {{t:value|lấy giá trị}}", why: "AJs quá yếu để muốn chơi cả stack. Các tay mạnh hơn của Button sẽ áp chế nó." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "Bạn {{t:open|mở cược}} từ Button với mức {{n:pf.open-size}}, {{t:small-blind}} {{t:raise|tố}} lên {{n:pf.3bet.oop-total}}, {{t:big-blind}} {{t:fold|bỏ bài}}. Bạn có KK và muốn 4-bet. Lên bao nhiêu?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "Lên khoảng {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|Khi có vị trí}}, 4-bet bằng khoảng {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} 3-bet. Nếu {{t:small-blind}} {{t:call|theo}}, {{t:pot|pot}} có khoảng {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (tính cả tiền chết của {{t:big-blind|big blind}}), và số chip còn lại trong stack bằng khoảng {{n:spr.4bet.high}}–{{n:spr.4bet}} lần số chip trong {{t:pot|pot}}." }
      - { text: "Lên {{n:pf.4bet.too-small}}", why: "Quá nhỏ: bạn cho đối thủ mức giá rất tốt để {{t:call}} khi {{t:out-of-position}}." }
      - { text: "All-in {{n:format.stack}}", why: "Với stack {{n:format.stack}}, all-in đẩy ra những tay yếu hơn mà đối thủ lẽ ra sẽ trả tiền cho 4-bet. Bạn kiếm được ít hơn." }
---
3-bet là phản ứng của đối thủ trước {{t:open}} của bạn. Bạn có ba lựa chọn: {{t:fold|bỏ bài}}, {{t:call|theo}} hoặc {{t:raise|tố}} thêm lần nữa, tức là 4-bet.

:::note Các quy tắc này từ đâu ra
Bài học này dựa trên tài liệu đào tạo từ một số nguồn và kết quả đã công bố của các solver khác, không dựa trên solver của ứng dụng. Với lối chơi trước 3-bet, solver của ứng dụng chưa được kiểm định, vì vậy các quy tắc được đánh dấu là quy tắc kinh nghiệm (heuristic).
:::

## Tiếp tục bao nhiêu

Khi Button {{t:raise|tố}} {{t:open}} của bạn từ {{t:cutoff|CO}} lên {{n:pf.3bet.ip-total}}, họ mạo hiểm chừng đó để thắng {{n:vs3bet.win}}. Nếu bạn {{t:fold|bỏ bài}} thường xuyên hơn {{n:alpha.vs-3bet-ip-size}}, 3-bet của họ có lời với mọi tay bài. Vì vậy bạn phải tiếp tục với ít nhất khoảng {{n:mdf.vs-3bet-ip-size}} {{t:range|range}} {{t:open|mở cược}}.

Theo một lời giải solver đã công bố ({{t:cutoff|CO}} trước 3-bet của Button lên {{n:pf.3bet.ip-total}}), người {{t:open|mở cược}} {{t:fold|bỏ bài}} khoảng {{n:pf.vs3bet.pub1.fold}} số lần {{t:open|mở cược}}, {{t:call|theo}} khoảng {{n:pf.vs3bet.pub1.call}} và 4-bet khoảng {{n:pf.vs3bet.pub1.4bet}}; các bảng đơn giản hóa từ một nguồn khác cho khoảng {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. Chúng tôi chọn các khoảng gần với cả hai nguồn: {{t:fold}} khoảng {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call}} khoảng {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet khoảng {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. Giới hạn trên của tần suất {{t:fold|bỏ bài}} nằm ngay dưới ngưỡng {{n:alpha.vs-3bet-ip-size}}: nếu bỏ bài thường xuyên hơn, 3-bet của Button sẽ có lời với mọi tay bài. Để {{t:call|theo}}, bạn cần khoảng {{n:eq.call-3bet-ip-size}} equity: bạn bỏ thêm {{n:vs3bet.call}} vào {{t:pot|pot}}, mà sau khi {{t:call|theo}} sẽ có {{n:vs3bet.pot-after}}.

## {{t:out-of-position|Không có vị trí}}, hãy chọn thận trọng

{{t:out-of-position|Khi không có vị trí}}, bạn {{t:call|theo}} bằng những tay chơi tốt sau flop: chủ yếu là bài cao đồng chất (KQs, QJs), các tay A mạnh đồng chất, các {{t:pair|đôi}} trung bình và cao, cùng một phần {{t:connectors|connector}} đồng chất. Các tay yếu hơn khác chất như KJo, ATo hay QTo thường bị áp chế, nên bạn {{t:fold|bỏ}} chúng.

## {{t:in-position|Có vị trí}}, hãy phòng thủ rộng hơn

{{t:in-position|Khi có vị trí}}, bạn còn {{t:call|theo}} với các {{t:pair|đôi}} từ 66 đến TT và các {{t:connectors|connector}} đồng chất (T9s, 98s, 87s). Theo một nguồn, bạn {{t:fold|bỏ}} các {{t:pair|đôi}} thấp nhất trước 3-bet lớn ngay cả khi {{t:in-position}}: chúng kiếm lời chủ yếu nhờ ra set, mà giá thì quá cao. Một nguồn khác cho phép {{t:call|theo}} với chúng khi {{t:in-position}}.

## 4-bet

Bạn thường 4-bet AA, KK và AK {{t:value|lấy giá trị}}; một số nguồn đôi khi {{t:call|theo}} với AK. Với QQ và JJ, các nguồn chơi khác nhau: một nguồn chủ yếu 4-bet, nguồn kia {{t:call|theo}}. Với vai trò {{t:bluff}}, tốt nhất là các tay A đồng chất, ví dụ A5s: chúng chặn AA và AK của đối thủ, và sau khi bị {{t:call|theo}} vẫn có cơ hội ra {{t:flush}} và {{t:straight|sảnh}}. Kích thước 4-bet khoảng {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} 3-bet khi {{t:in-position}} và {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} khi {{t:out-of-position}}. Ví dụ, khi từ Button bạn 4-bet trước 3-bet của {{t:small-blind|small blind}} lên {{n:pf.3bet.oop-total}} ({{t:big-blind}} {{t:fold|bỏ bài}}), bạn {{t:raise|tố}} lên {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; khi từ {{t:cutoff|CO}} bạn 4-bet trước 3-bet của Button lên {{n:pf.3bet.ip-total}}, bạn {{t:raise|tố}} lên khoảng {{n:pf.4bet.oop-example.low}}. Sau khi bị {{t:call|theo}}, số chip còn lại trong stack bằng khoảng {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} lần số chip trong {{t:pot|pot}}, nên các tay mạnh dễ dàng đưa phần còn lại vào.
