---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Khi nào tố c-bet và tố lên bao nhiêu"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Bạn bảo vệ {{t:big-blind}} trước lần {{t:open|mở pot}} của Button. Trên flop, bạn {{t:check}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot}}. Bạn làm gì?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:two-pair|Hai đôi}} trên flop thấp, {{t:connected|liên kết}} là bài để chơi {{t:value|lấy giá trị}}. Trên những flop như vậy, {{t:big-blind}} có nhiều tổ hợp mạnh nhất hơn Button. Khi {{t:raise|tố}}, bạn xây {{t:pot}} và buộc các {{t:pair|đôi}} và {{t:draw|bài chờ}} phải trả tiền." }
      - { text: "{{t:call|Theo}}", correct: true, why: "Cũng tốt: trên flop rất {{t:connected|liên kết}}, solver chỉ {{t:call|theo}} với một phần {{t:two-pair|hai đôi}}. Check-raise xây {{t:pot}} và bảo vệ bài thường xuyên hơn." }
      - { text: "{{t:fold|Bỏ bài}}", why: "{{t:two-pair|Hai đôi}} là một trong những bài mạnh nhất trên flop này. {{t:fold|Bỏ bài}} là sai lầm lớn." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|Pot}} có {{n:ex.third.pot}}, Button {{t:bet|cược}} c-bet {{n:ex.third.bet}}. Bạn có set và muốn check-raise. Bạn {{t:raise|tố}} lên bao nhiêu?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "Lên {{n:xr.example}}", correct: true, why: "Đó là {{n:xr.mult.example}} c-bet. Button phải bỏ thêm {{n:xr.example.extra}} và cần khoảng {{n:eq.vs-xr.example}} equity: các {{t:pair|đôi}} yếu hơn và {{t:draw|bài chờ}} yếu (gutshot) không có giá tốt, còn bài chờ {{t:flush|thùng}} và {{t:oesd}} sẽ trả tiền vào {{t:pot}} đã lớn." }
      - { text: "Lên {{n:xr.too-small}}", sizeError: true, why: "Hành động đúng, nhưng kích thước quá nhỏ: Button chỉ bỏ thêm {{n:xr.too-small.extra}} và cần khoảng {{n:eq.vs-xr.too-small}} equity. Mọi {{t:flush-draw|bài chờ thùng}} hay bài chờ {{t:straight|sảnh}} đều sẽ trả tiền gần như miễn phí." }
      - { text: "{{t:call|Theo}}", why: "Trên flop có hai lá cơ và các lá tạo {{t:straight|sảnh}}, bạn mất giá trị và sự bảo vệ: nhiều lá turn sẽ làm dừng hành động hoặc đánh bại bài của bạn. Set muốn xây {{t:pot}} ngay." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|Pot}} có {{n:ex.third.pot}}, Button {{t:bet|cược}} c-bet {{n:ex.third.bet}}. Bạn check-raise lên {{n:xr.mult.example}} c-bet. Bạn {{t:raise|tố}} lên bao nhiêu? Hãy nhập số {{t:chips|chip}}."
    table: { position: BB }
    answer: xr.example
    explanation: "C-bet là {{n:ex.third.bet}}, nên {{n:xr.mult.example}} c-bet là {{n:xr.example}}. Kích thước check-raise tính theo c-bet, không theo {{t:pot}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|Pot}} có {{n:ex.third.pot}}, Button đã {{t:bet|cược}} {{n:ex.third.bet}}, và bạn {{t:raise|tố}} lên {{n:xr.example}}. Button cần bao nhiêu phần trăm equity để {{t:call|theo}}? Hãy nhập số."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "Button bỏ thêm {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}. Khi đó {{t:pot}} có {{n:xr.example.pot-after}}, và sau khi Button {{t:call|theo}} thì thêm {{n:xr.example.extra}}. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|Pot}} có {{n:ex.third.pot}}, Button đã {{t:bet|cược}} {{n:ex.third.bet}}, và bạn chỉ {{t:raise|tố}} lên {{n:xr.too-small}}. Button cần bao nhiêu equity để {{t:call|theo}}?"
    table: { position: BB }
    options:
      - { text: "Khoảng {{n:eq.vs-xr.too-small}}", correct: true, why: "Button bỏ thêm {{n:xr.too-small.extra}} vào {{t:pot}} {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. Với giá rẻ như vậy, Button sẽ trả tiền với gần như mọi bài, vì thế {{t:raise|lần tố}} phải lớn gấp vài lần c-bet." }
      - { text: "Khoảng {{n:eq.vs-xr.example}}", why: "Đó là mức Button cần nếu bạn {{t:raise|tố}} lên {{n:xr.example}}. Với {{n:xr.too-small}}, Button chỉ bỏ thêm {{n:xr.too-small.extra}}." }
      - { text: "Khoảng {{n:eq.bet-third}}", why: "Đó là mức bạn cần để {{t:call|theo}} c-bet. Sau check-raise, bạn tính giá của Button: Button bỏ thêm {{n:xr.too-small.extra}} vào {{t:pot}} {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Bạn bảo vệ {{t:big-blind}} trước lần {{t:open|mở pot}} của Button. Trên flop, bạn {{t:check}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot}}. Bạn làm gì?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:draw|Bài chờ}} đến {{t:flush|thùng}} mạnh nhất là một {{t:semi-bluff}} tốt: bạn thắng khi Button {{t:fold|bỏ bài}}, còn khi Button trả tiền, bạn vẫn có {{n:outs.flush}} out (khoảng {{n:odds.flush.flop-turn}} ở turn)." }
      - { text: "{{t:call|Theo}}", correct: true, why: "Cũng tốt: bạn trúng {{t:flush|thùng}} ở turn khoảng {{n:odds.flush.flop-turn}}, gần bằng mức giá {{n:eq.bet-third}}, và khi trúng {{t:flush|thùng}} mạnh nhất, bạn thắng thêm (implied odds). Bạn chơi các {{t:draw|bài chờ}} mạnh theo cả hai cách để check-raise của bạn không chỉ gồm bài mạnh." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Sai lầm lớn: với {{n:outs.flush}} out, bạn trúng {{t:flush|thùng}} mạnh nhất ở turn khoảng {{n:odds.flush.flop-turn}}, gần bằng mức giá {{n:eq.bet-third}}, và khi trúng, bạn thắng thêm (implied odds). Ngoài ra, bạn có thể check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Bạn bảo vệ {{t:big-blind}} trước lần {{t:open|mở pot}} của Button. Trên flop, bạn {{t:check}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot}}. Bạn làm gì?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:oesd|OESD}} ({{n:outs.oesd}} out) trước c-bet nhỏ, tạo cơ hội rẻ để {{t:raise|tố}}. Khi {{t:raise|tố}}, bạn có thể thắng ngay, còn nếu bị {{t:call|theo}}, bạn vẫn có thể trúng." }
      - { text: "{{t:call|Theo}}", correct: true, why: "Cũng tốt: bạn trúng {{t:straight|sảnh}} ở turn khoảng {{n:odds.oesd.flop-turn}}, thấp hơn một chút so với mức giá {{n:eq.bet-third}}, nhưng khi trúng, bạn thắng thêm (implied odds), và nếu không ai {{t:bet|cược}} ở turn, bạn còn được xem river miễn phí. Bạn {{t:call|theo}} với một phần {{t:draw|bài chờ}} mạnh để các lần {{t:call|theo}} của bạn không toàn là bài yếu." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt: với {{n:outs.oesd}} out, bạn trúng {{t:straight|sảnh}} ở turn khoảng {{n:odds.oesd.flop-turn}}, không thấp hơn nhiều so với mức giá {{n:eq.bet-third}}; phần còn lại đến từ implied odds và cơ hội xem river miễn phí. Ngoài ra, bạn có thể check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Bạn bảo vệ {{t:big-blind}} trước lần {{t:open|mở pot}} của Button. Trên flop, bạn {{t:check}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot}}. Bạn làm gì?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "{{t:top-pair|Đôi cao nhất}} với kicker yếu là bài để {{t:call|theo}}. Nó thắng các {{t:bluff}} của Button, và khi {{t:call|theo}}, bạn giữ chúng lại trong ván." }
      - { text: "Check-raise", why: "Thường thì bạn {{t:call|theo}}. Sau khi bạn {{t:raise|tố}}, người trả tiền cho bạn chủ yếu là bài mạnh hơn và {{t:draw|bài chờ}}; check-raise với bài như vậy là lối chơi hiếm của solver trước c-bet nhỏ." }
      - { text: "{{t:fold|Bỏ bài}}", why: "{{t:top-pair|Đôi cao nhất}} trước c-bet nhỏ chắc chắn là quá mạnh để {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Bạn bảo vệ {{t:big-blind}} trước lần {{t:open|mở pot}} của Button. Trên flop, bạn {{t:check}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot}}. Bạn làm gì?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Bạn không có {{t:pair|đôi}} cũng không có {{t:flush-draw|bài chờ thùng}}; bạn chỉ có {{t:straight-draw|bài chờ sảnh}} backdoor yếu (cần hai lá cụ thể), và không lá nào của bạn cao hơn bài trên bàn. Trên flop có át, bạn {{t:fold|bỏ}} nhiều bài như vậy hơn." }
      - { text: "Check-raise như một {{t:bluff}}", why: "Bạn {{t:bluff}} bằng check-raise chủ yếu với các {{t:draw|bài chờ}} (bài chờ {{t:flush|thùng}}, {{t:oesd}}) cũng thắng khi trúng. Bài này chỉ có {{t:draw}} backdoor yếu, và ở đây Button có nhiều át và K sẽ không {{t:fold|bỏ bài}}." }
      - { text: "{{t:call|Theo}}", why: "Giá tốt, nhưng bài này gần như không trúng được gì: ngay cả {{t:pair|đôi}} 6 hay đôi 5 cũng thua phần lớn bài mà Button sẽ tiếp tục trả tiền." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Trước c-bet nào của Button, bạn check-raise thường xuyên hơn?"
    table: { position: BB }
    options:
      - { text: "1/4 {{t:pot}}", correct: true, why: "C-bet nhỏ tạo cơ hội rẻ để {{t:raise|tố}}, và Button {{t:bet|cược}} nó với {{t:range}} rộng gồm nhiều bài yếu. Trước c-bet lớn, bạn {{t:raise|tố}} ít hơn và hẹp hơn: chủ yếu set và {{t:two-pair}}, ít {{t:bluff}} hơn." }
      - { text: "Cả {{t:pot}}", why: "Trước c-bet lớn, {{t:raise|tố}} tốn nhiều, và {{t:range}} của Button mạnh hơn. Bạn {{t:call|theo}} hoặc {{t:fold|bỏ bài}} thường xuyên hơn." }
      - { text: "Thường xuyên như nhau", why: "Trước c-bet nhỏ, bạn {{t:raise|tố}} thường xuyên hơn và rộng hơn; trước c-bet lớn thì ít hơn, chủ yếu với các bài mạnh nhất." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Bạn chơi với một Button gần như không bao giờ {{t:fold|bỏ bài}} trên flop. Button {{t:bet|cược}} c-bet 1/3 {{t:pot}}. Bạn làm gì?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Gutshot có lá cao là một lần {{t:call|theo}} tốt với mức giá {{n:eq.bet-third}}. {{t:bluff|Bluff}} bằng check-raise kiếm tiền từ các lần {{t:fold|bỏ bài}}, mà đối thủ này hầu như không {{t:fold|bỏ bài}}, nên {{t:raise|lần tố}} mất đi ưu điểm chính." }
      - { text: "Check-raise", why: "Bạn {{t:bluff}} bằng check-raise chủ yếu với các {{t:draw|bài chờ}} mạnh, và gutshot không thuộc nhóm đó. Ngoài ra, {{t:bluff}} kiếm tiền từ các lần {{t:fold|bỏ bài}}, mà đối thủ này hầu như không {{t:fold|bỏ bài}}: trước đối thủ này, bạn {{t:raise|tố}} chủ yếu để {{t:value|lấy giá trị}}." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt: {{t:draw}} có lá cao với mức giá tốt như vậy là đáng giữ, bất kể bạn chơi với ai." }
---
Check-raise là {{t:check}} rồi {{t:raise|tố}} {{t:bet|cược}} của đối thủ. Từ {{t:big-blind}}, đây là vũ khí quan trọng trước c-bet (phần lớn thời gian bạn vẫn chọn giữa {{t:call|theo}} và {{t:fold|bỏ bài}}): không có nó, Button có thể c-bet rẻ với gần như mọi bài.

## Vì sao {{t:raise|tố}}

Bạn check-raise vì hai lý do:

- **{{t:value|lấy giá trị}}**: bạn có bài rất mạnh ({{t:two-pair}}, set) và muốn xây {{t:pot}},
- **như một {{t:semi-bluff}}**: bạn có {{t:draw}} (bài chờ {{t:flush|thùng}}, {{t:oesd}}) thắng theo hai cách: khi Button {{t:fold|bỏ bài}} hoặc khi bạn trúng.

Với bài trung bình, ví dụ {{t:top-pair|đôi cao nhất}} với kicker yếu, bạn thường {{t:call|theo}}: sau khi bạn {{t:raise|tố}}, bài yếu hơn của Button sẽ {{t:fold|bỏ}} thường xuyên hơn, còn bài mạnh hơn sẽ trả tiền. Đây là cách đơn giản hóa: trước c-bet nhỏ, solver cũng {{t:raise|tố}} với một phần {{t:top-pair|đôi cao nhất}} và {{t:pair|đôi}} yếu để bảo vệ. Ngược lại, với {{t:two-pair}} trên flop rất {{t:connected|liên kết}}, solver thường chỉ {{t:call|theo}}.

## Khi nào thường xuyên hơn

- **Trước c-bet nhỏ.** {{t:raise|Tố}} rẻ, và Button {{t:bet|cược}} c-bet nhỏ với {{t:range}} rộng. Trước c-bet lớn, bạn {{t:raise|tố}} ít hơn và hẹp hơn: chủ yếu set và {{t:two-pair}}, ít {{t:bluff}} hơn.
- **Trên flop thấp, {{t:connected|liên kết}}** (ví dụ [[7h 6d 5s]]). {{t:big-blind|Big blind}} bảo vệ nhiều bài thấp, nên ở đây thường có nhiều {{t:two-pair}} và {{t:straight|sảnh}} hơn Button, tức là có {{t:nuts-advantage}}.
- **Ít hơn trên flop cao có lợi cho Button**, ví dụ K-J-T hoặc A-A-K: ở đó chính Button có nhiều bài mạnh nhất hơn.

## Kích thước bao nhiêu

Kích thước check-raise tính theo c-bet. Ví dụ: {{t:pot}} có {{n:ex.third.pot}}, c-bet {{n:ex.third.bet}}. Check-raise lên {{n:xr.mult.example}} c-bet là {{t:raise|tố}} lên {{n:xr.example}}: Button bỏ thêm {{n:xr.example.extra}} và cần khoảng **{{n:eq.vs-xr.example}}** equity. {{t:raise|Tố}} chỉ lên {{n:xr.too-small}} cho Button mức giá khoảng **{{n:eq.vs-xr.too-small}}**: Button sẽ trả tiền với gần như mọi bài có bất kỳ {{t:draw}} nào. Vì vậy bạn {{t:raise|tố}} khoảng {{n:xr.mult.low}}–{{n:xr.mult.example}} c-bet, c-bet càng nhỏ thì tố càng nhiều, chứ không tố tối thiểu.

:::note Đối thủ không {{t:fold|bỏ bài}}
{{t:bluff|Bluff}} bằng check-raise kiếm tiền từ các lần {{t:fold|bỏ bài}} (hãy nhớ lại alpha từ bài học đầu tiên). Trước người chơi gần như không bao giờ {{t:fold|bỏ bài}} trên flop, bạn {{t:raise|tố}} chủ yếu để {{t:value|lấy giá trị}}, và để dành {{t:bluff}} cho các {{t:draw|bài chờ}} mạnh nhất.
:::
