---
id: m9.l1
module: m9
order: 1
title: "SPR: stack so với pot"
sub: "Còn lại bao nhiêu tiền ngoài pot"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Bạn {{t:open|mở}} từ Button lên {{n:pf.open-size}}, {{t:big-blind}} {{t:call|theo}}, mỗi người có stack {{n:format.stack}}. Trên flop, {{t:pot|pot}} có {{n:bb.pot-after.vs-btn}}, và stack còn lại của bạn là {{n:spr.srp.stack}}. {{t:spr}} là bao nhiêu?"
    table: { position: BTN }
    options:
      - { text: "Khoảng {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. Stack còn lại ngoài {{t:pot|pot}} lớn gấp hơn chục lần {{t:pot}}: đây là {{t:spr}} điển hình sau khi {{t:open|mở}} và được {{t:call|theo}}." }
      - { text: "Khoảng {{n:spr.srp.wrong-full}}", why: "Đó là kết quả khi tính từ toàn bộ stack {{n:format.stack}}. {{n:pf.open-size}} của bạn đã nằm trong {{t:pot|pot}}, nên bạn chỉ tính phần còn lại: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Khoảng {{n:spr.3bet-ip}}", why: "Đó là {{t:spr}} sau 3-bet và được {{t:call|theo}}. Trong {{t:pot|pot}} chỉ có một lần nâng cược, {{t:pot}} nhỏ hơn nhiều, nên {{t:spr}} khoảng {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:cutoff|CO}} {{t:open|mở}} lên {{n:pf.open-size}}, bạn ở Button {{t:raise|tố}} (3-bet) lên {{n:pf.3bet.ip-total}}, {{t:cutoff|CO}} {{t:call|theo}}, các blind {{t:fold|bỏ bài}}. Trên flop, {{t:pot|pot}} có {{n:vs3bet.pot-after}}, và stack còn lại của bạn là {{n:spr.3bet-ip.stack}}. {{t:spr}} là bao nhiêu?"
    table: { position: BTN }
    options:
      - { text: "Khoảng {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Sau 3-bet, {{t:pot}} lớn gấp ba lần so với sau một lần {{t:open|mở}} thông thường, nên {{t:spr}} giảm từ khoảng {{n:spr.srp}} xuống khoảng {{n:spr.3bet-ip}}." }
      - { text: "Khoảng {{n:spr.3bet-ip.wrong-full}}", why: "Đó là kết quả khi tính từ toàn bộ stack {{n:format.stack}}. 3-bet {{n:pf.3bet.ip-total}} của bạn đã nằm trong {{t:pot|pot}}, nên bạn chỉ lấy phần còn lại để chia: {{n:spr.3bet-ip.stack}}." }
      - { text: "Khoảng {{n:spr.srp}}", why: "Đó là {{t:spr}} trong {{t:pot|pot}} chỉ có một lần nâng cược. Sau 3-bet, {{t:pot}} lớn hơn nhiều, còn stack còn lại thì nhỏ hơn, nên {{t:spr}} giảm xuống khoảng {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Button {{t:open|mở}}, bạn ở {{t:big-blind|big blind}} {{t:raise|tố}} (3-bet) lên {{n:pf.3bet.oop-total}}, Button {{t:call|theo}}. Trên flop, {{t:pot|pot}} có {{n:spr.3bet-oop.pot}}, stack còn lại của bạn là {{n:spr.3bet-oop.stack}}. {{t:spr}} là bao nhiêu?"
    table: { position: BB }
    options:
      - { text: "Khoảng {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. Khi {{t:out-of-position|không có vị trí}}, 3-bet lớn hơn, nên {{t:pot}} tăng nhiều hơn và {{t:spr}} thấp hơn so với 3-bet {{t:in-position}} ({{n:spr.3bet-ip}})." }
      - { text: "Khoảng {{n:spr.3bet-ip}}", why: "Đó là {{t:spr}} sau 3-bet {{t:in-position}} lên {{n:pf.3bet.ip-total}}. 3-bet lên {{n:pf.3bet.oop-total}} của bạn tạo ra {{t:pot|pot}} lớn hơn, nên {{t:spr}} thấp hơn: khoảng {{n:spr.3bet-oop}}." }
      - { text: "Khoảng {{n:spr.4bet}}", why: "Phải có 4-bet thì {{t:spr}} mới thấp như vậy. Sau 3-bet lên {{n:pf.3bet.oop-total}}, kết quả là khoảng {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Mỗi người có stack {{n:format.stack}}. Trong {{t:pot|pot}} nào thì {{t:spr}} trên flop thấp nhất?"
    options:
      - { text: "Trong {{t:pot|pot}} sau 4-bet và được {{t:call|theo}}", correct: true, why: "Đúng: khi Button 4-bet lên {{n:pf.4bet.example.low}} trước 3-bet của {{t:small-blind|small blind}}, {{t:small-blind}} {{t:call|theo}}, còn {{t:big-blind}} đã {{t:fold|bỏ bài}}, thì {{t:pot|pot}} có {{n:spr.4bet.pot}} và stack còn lại chỉ là {{n:spr.4bet.stack}}. {{t:spr}} khoảng {{n:spr.4bet}}." }
      - { text: "Trong {{t:pot|pot}} sau 3-bet và được {{t:call|theo}}", why: "Sau 3-bet, {{t:spr}} khoảng {{n:spr.3bet-ip}} khi {{t:in-position}} và khoảng {{n:spr.3bet-oop}} khi {{t:out-of-position}}. 4-bet còn hạ nó xuống thấp hơn nữa: khoảng {{n:spr.4bet}}." }
      - { text: "Trong {{t:pot|pot}} chỉ có một lần nâng cược", why: "Ngược lại: ở đây {{t:spr}} cao nhất, khoảng {{n:spr.srp}}, vì {{t:pot}} trên flop nhỏ." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Vì sao sau 3-bet, {{t:spr}} trên flop thấp hơn nhiều so với sau một lần {{t:open|mở}} thông thường?"
    options:
      - { text: "{{t:pot|Pot}} tăng gấp nhiều lần, còn stack còn lại chỉ giảm một chút", correct: true, why: "Đúng: {{t:pot}} tăng từ {{n:bb.pot-after.vs-btn}} lên {{n:vs3bet.pot-after}}, còn stack còn lại chỉ giảm từ {{n:spr.srp.stack}} xuống {{n:spr.3bet-ip.stack}}. Tỉ lệ giảm từ khoảng {{n:spr.srp}} xuống khoảng {{n:spr.3bet-ip}}." }
      - { text: "Vì sau 3-bet người chơi có stack nhỏ hơn", why: "Chỉ nhỏ hơn một chút: {{n:spr.3bet-ip.stack}} thay vì {{n:spr.srp.stack}}. Điều khiến {{t:spr}} giảm là {{t:pot}} lớn gấp ba lần." }
      - { text: "Vì 3-bet cho bạn {{t:position|vị trí}}", why: "{{t:position|Vị trí}} phụ thuộc vào chỗ ngồi ở bàn, không phụ thuộc vào 3-bet. {{t:spr}} chỉ là stack còn lại ngoài {{t:pot|pot}} chia cho {{t:pot|pot}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Bạn {{t:open|mở}} từ Button lên {{n:pf.open-size}}, bạn có {{n:format.stack}}. {{t:big-blind|Big blind}} chỉ có {{n:spr.short.stack}} và {{t:call|theo}}. {{t:pot|Pot}} trên flop: {{n:bb.pot-after.vs-btn}}. {{t:spr}} là bao nhiêu?"
    table: { position: BTN }
    options:
      - { text: "Khoảng {{n:spr.short}}", correct: true, why: "Bạn tính từ {{t:effective-stack|stack hiệu dụng}}, tức stack nhỏ hơn trong hai stack: đối thủ còn {{n:spr.short.behind}}, nên {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Ngoài phần đã nằm trong {{t:pot|pot}}, mỗi người chỉ có thể bỏ thêm tối đa {{n:spr.short.behind}}." }
      - { text: "Khoảng {{n:spr.srp}}", why: "Điều đó chỉ đúng nếu đối thủ cũng có {{n:format.stack}}. Hai bạn chỉ có thể chơi trong phạm vi stack nhỏ hơn, nên {{t:spr}} khoảng {{n:spr.short}}." }
      - { text: "Không tính được vì hai stack khác nhau", why: "Tính được: bạn lấy stack nhỏ hơn (stack hiệu dụng). Đối thủ còn {{n:spr.short.behind}}, nên {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Bạn tính {{t:spr}} dùng để quyết định cách chơi ván bài sau flop vào lúc nào?"
    options:
      - { text: "Trên flop, trước khi có ai {{t:bet|đặt}} {{t:bet}}", correct: true, why: "Đúng: có thể tính {{t:spr}} ở mọi {{t:street|vòng}} (ở M7 bạn đã tính nó trên turn), nhưng để lập kế hoạch cho ván bài, bạn lấy stack còn lại ngoài {{t:pot|pot}} chia cho {{t:pot|pot}} ở đầu flop. Khi đó bạn biết còn bao nhiêu {{t:pot|pot}} để chơi trong ba {{t:street|vòng}}." }
      - { text: "Trước ván bài, trước khi có ai {{t:raise|tố}}", why: "Trước flop bạn chưa biết {{t:pot}} sẽ lớn đến đâu. {{t:spr}} phụ thuộc chính vào những gì đã xảy ra trước flop: sau khi {{t:open|mở}} khoảng {{n:spr.srp}}, sau 3-bet khoảng {{n:spr.3bet-ip}}." }
      - { text: "Trên river, trước {{t:bet|lần cược}} cuối cùng", why: "Trên river chỉ còn một quyết định. Ở đó cũng tính được {{t:spr}}, nhưng hữu ích nhất cho kế hoạch ván bài là {{t:spr}} trên flop, vì nó bao trùm cả ba {{t:street|vòng}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "Bạn {{t:raise|tố}} từ Button (3-bet), {{t:cutoff|CO}} {{t:call|theo}}. {{t:spr}} trên flop khoảng {{n:spr.3bet-ip}}. Bạn trúng {{t:top-pair|đôi cao nhất}} với kicker tốt. Bạn xem tay bài này thế nào?"
    table: { position: BTN }
    options:
      - { text: "Là tay bài ở ranh giới: bạn chơi {{t:value|lấy giá trị}}, nhưng không phải lúc nào cũng {{t:call|theo}} all-in của đối thủ", correct: true, why: "{{t:spr}} khoảng {{n:spr.3bet-ip}} nằm trong vùng từ {{n:spr.zone.low}} đến {{n:spr.zone.mid}}, nơi {{t:top-pair}} là tay bài ở ranh giới. Quyết định chơi cả stack phụ thuộc vào cách đối thủ chơi và {{t:board}} trông như thế nào." }
      - { text: "Luôn chơi cả stack", why: "Thường chỉ như vậy khi {{t:spr}} dưới khoảng {{n:spr.zone.low}}, ví dụ sau 4-bet (khoảng {{n:spr.4bet}}). Với {{t:spr}} khoảng {{n:spr.3bet-ip}}, cần nhiều {{t:bet|lần cược}} hơn mới tới all-in, và những tay chịu trả đến cùng chủ yếu là tay mạnh hơn." }
      - { text: "Chơi thận trọng như khi {{t:spr}} rất cao", why: "Bạn chơi {{t:top-pair|đôi cao nhất}} thận trọng như vậy khi {{t:spr}} trên khoảng {{n:spr.zone.deep}}, ví dụ trong {{t:pot|pot}} chỉ có một lần nâng cược (khoảng {{n:spr.srp}}). Sau 3-bet, {{t:spr}} thấp hơn nhiều." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. {{t:pot|Pot}} có {{n:ex.pot}}, đối thủ all-in {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). Bạn cần bao nhiêu equity để {{t:call|theo}}? Hãy nhập số theo phần trăm."
    answer: eq.jam.spr2
    explanation: "Bạn bỏ thêm {{n:commit.stack}}, và {{t:pot}} sau khi {{t:call|theo}} là {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Equity cần thiết = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Trên flop, đối thủ all-in cả stack ({{n:format.stack}} lúc đầu ván). Trong {{t:pot|pot}} nào bạn cần ít equity nhất để {{t:call|theo}}?"
    options:
      - { text: "Sau 4-bet: khoảng {{n:eq.jam.4bet}}", correct: true, why: "Với {{t:spr}} khoảng {{n:spr.4bet}}, bạn bỏ thêm {{n:spr.4bet.stack}} để thắng {{t:pot|pot}} {{n:spr.4bet.pot}} cùng stack của đối thủ. {{t:spr}} càng thấp, giá càng tốt." }
      - { text: "Sau 3-bet: khoảng {{n:eq.jam.3bet-ip}}", why: "Sau 3-bet {{t:in-position}}, bạn cần khoảng {{n:eq.jam.3bet-ip}}. Sau 4-bet, {{t:pot}} lớn hơn so với stack, nên chỉ cần khoảng {{n:eq.jam.4bet}}." }
      - { text: "Sau khi {{t:open|mở}} và được {{t:call|theo}}: khoảng {{n:eq.jam.srp}}", why: "Đây là giá tệ nhất trong ba trường hợp: với {{t:spr}} khoảng {{n:spr.srp}}, bạn bỏ thêm {{n:spr.srp.stack}} để thắng {{t:pot|pot}} nhỏ {{n:bb.pot-after.vs-btn}} cùng stack của đối thủ." }
---
Trước flop, bạn quyết định bao nhiêu tiền sẽ vào {{t:pot|pot}}. Sau flop, điều quan trọng là còn lại bao nhiêu ngoài pot. Một con số kết nối cả hai: {{t:spr}}.

## {{t:spr}} là gì

{{t:spr}} (tiếng Anh: stack-to-pot ratio) là tỉ lệ giữa stack và {{t:pot|pot}} ở đầu một {{t:street|vòng}}. Có thể tính nó ở mọi {{t:street|vòng}} (ở M7 bạn đã tính nó trên turn), nhưng để lập kế hoạch cho ván bài, bạn lấy {{t:spr}} trên flop, trước khi có ai {{t:bet|đặt}} {{t:bet}}.

```formula
SPR = stack hiệu dụng ÷ pot trên flop
```

{{t:effective-stack|Stack hiệu dụng}} là stack nhỏ hơn trong hai stack, không tính phần đã nằm trong {{t:pot|pot}}. Đó là mức tối đa mỗi người chơi còn có thể bỏ thêm vào {{t:pot|pot}}: ngoài {{t:pot|pot}}, bạn không thể thắng của đối thủ nhiều hơn {{t:effective-stack}}, và đó cũng là mức tối đa bạn còn có thể mất.

Ví dụ: bạn {{t:open|mở}} từ Button lên {{n:pf.open-size}}, {{t:big-blind}} {{t:call|theo}}. {{t:pot|Pot}} trên flop là {{n:bb.pot-after.vs-btn}}, stack còn lại của bạn là {{n:spr.srp.stack}}. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## Preflop quyết định {{t:spr}}

Mỗi lần {{t:raise}} trước flop làm {{t:pot|pot}} lớn lên vài lần, còn stack còn lại giảm chậm hơn nhiều. Vì vậy {{t:spr}} phụ thuộc rất nhiều vào những gì đã xảy ra trước flop.

| {{t:pot|Pot}} (stack {{n:format.stack}}) | {{t:pot|Pot}} trên flop | Stack còn lại ngoài {{t:pot|pot}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Mở}} và {{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position}} và {{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet từ {{t:big-blind|big blind}} và {{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| Button 4-bet trước 3-bet của {{t:small-blind|small blind}} và {{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Các vùng {{t:spr}}

Bạn xác định vùng {{t:spr}} dựa trên {{t:spr}} trên flop. {{t:spr}} càng cao, bạn càng cần tay bài mạnh hơn để chơi cả stack:

| {{t:spr}} | Thường chơi cả stack với tay nào |
|---|---|
| dưới {{n:spr.zone.low}} | {{t:top-pair}} trở lên |
| từ {{n:spr.zone.low}} đến {{n:spr.zone.mid}} | {{t:top-pair}} là tay bài ở ranh giới |
| từ {{n:spr.zone.mid}} đến {{n:spr.zone.deep}} | {{t:two-pair}} cao trở lên |
| trên {{n:spr.zone.deep}} | set, {{t:straight}} trở lên |

Sau khi {{t:open|mở}} và được {{t:call|theo}} ({{t:spr}} khoảng {{n:spr.srp}}), bạn ở vùng cao nhất; sau 3-bet (khoảng {{n:spr.3bet-ip}}), bạn ở vùng mà {{t:top-pair}} nằm ở ranh giới; còn sau 4-bet (khoảng {{n:spr.4bet}}), bạn ở vùng thấp nhất. Các ngưỡng này là cách đơn giản hóa. Các nguồn chia vùng khác nhau, nhưng đều đồng ý rằng dưới khoảng {{n:spr.zone.low}}, {{t:top-pair}} chơi cả stack, còn khi {{t:spr}} cao hơn thì một {{t:pair}} ngày càng ít khi làm vậy. Ranh giới {{n:spr.zone.mid}} là quy ước được dùng trong ứng dụng. Ngưỡng {{n:spr.zone.deep}} đến từ phép tính: với {{t:spr}} {{n:spr.zone.deep}}, ba {{t:bet|lần cược}} bằng cỡ {{t:pot|pot}} là đủ để all-in.

## {{t:spr}} thấp: giá tốt hơn khi all-in

Khi đối thủ all-in cả stack, bạn bỏ thêm stack của mình để thắng {{t:pot|pot}} cùng stack của họ. Equity cần thiết = stack ÷ ({{t:pot}} + 2·stack). Với {{t:spr}} {{n:spr.commit}}, con số này là {{n:eq.jam.spr2}}; sau 4-bet khoảng {{n:eq.jam.4bet}}; sau 3-bet khoảng {{n:eq.jam.3bet-ip}}; còn trong {{t:pot|pot}} chỉ có một lần nâng cược thì đã lên khoảng {{n:eq.jam.srp}}.

{{t:spr}} càng thấp, số tiền còn lại để chơi càng ít và càng dễ đưa cả stack vào. {{t:spr}} càng cao, càng còn nhiều {{t:street|vòng}} và {{t:bet|lần cược}} trước khi stack vào {{t:pot|pot}}.

:::note Các con số này từ đâu ra
Các {{t:pot|pot}} và stack được tính từ các mức cược trong module về chơi trước flop ({{t:open}} {{n:pf.open-size}}, 3-bet lên {{n:pf.3bet.ip-total}} hoặc {{n:pf.3bet.oop-total}}, 4-bet lên {{n:pf.4bet.example.low}}). {{t:pot|Pot}} sau 4-bet là một tình huống giả định: Button 4-bet trước 3-bet của {{t:small-blind|small blind}}, {{t:small-blind}} {{t:call|theo}}, còn {{t:big-blind}} đã {{t:fold|bỏ bài}} và blind của họ ở lại trong {{t:pot|pot}}. Mức cược khác sẽ cho {{t:spr}} hơi khác, nhưng thứ tự luôn giữ nguyên: càng nhiều lần {{t:raise|tố}} trước flop, {{t:spr}} càng thấp.
:::
