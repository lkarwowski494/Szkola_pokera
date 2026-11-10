---
id: m7.l1
module: m7
order: 1
title: "Cú cược thứ hai"
sub: "Khi nào nên cược thêm lần nữa ở turn"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Bạn {{t:open|mở pot}} từ Button, {{t:big-blind}} {{t:call|theo}}. Trên flop [[Jd 7c 3s]], bạn {{t:bet|đặt}} c-bet và đối thủ {{t:call|theo}}. Lá turn nào giúp {{t:second-barrel}} của bạn nhiều nhất?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Đúng: lá A trúng nhiều tay trong {{t:range|phạm vi bài}} {{t:open|mở pot}} của bạn (AK, AQ, AJ), còn {{t:big-blind}} {{t:call|theo}} flop chủ yếu bằng {{t:pair|đôi}} và {{t:draw|bài chờ}}. Mỗi {{t:pair}} của họ đều tụt xuống một bậc." }
      - { text: "[[8h]]", why: "Không: lá 8 nối với flop. Nó tạo {{t:straight|sảnh}} cho T9 và {{t:two-pair}} cho 87, những tay mà {{t:big-blind}} bảo vệ rất nhiều. Lá này có lợi cho họ hơn." }
      - { text: "[[3h]]", why: "Không phải tệ nhất, nhưng ít thay đổi: lá này hiếm khi cải thiện {{t:range}} của bạn, còn đối thủ có {{t:pair|đôi}} vẫn có {{t:pair|đôi}}. Lá A mang lại cho {{t:second-barrel}} của bạn nhiều hơn hẳn." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Vì sao lá A ở turn sau flop [[Jd 7c 3s]] có lợi cho {{t:second-barrel}} của người {{t:open|mở pot}} từ Button?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Nó trúng AK và AQ của bạn, còn {{t:pair}} của đối thủ trở thành {{t:pair|đôi}} thứ hai hoặc thứ ba", correct: true, why: "Đúng: lá cao trúng {{t:range}} của người {{t:open|mở pot}} thường xuyên hơn, còn đối thủ đã {{t:call|theo}} flop bằng {{t:pair|đôi}} J hoặc đôi 7 giờ có tay yếu hơn so với {{t:board|bài chung}}." }
      - { text: "Vì gặp lá A thì đối thủ luôn {{t:fold|bỏ bài}}", why: "Không phải luôn: đối thủ có A hoặc có set sẽ trả tiền. Lá A tăng khả năng {{t:fold}}, nhưng không đảm bảo điều gì." }
      - { text: "Vì lá A hoàn thành {{t:draw|bài chờ}} của đối thủ", why: "Không: trên {{t:board|bài chung}} này, lá A không hoàn thành {{t:flush|thùng}} hay {{t:straight|sảnh}} nào mà đối thủ có thể có. Nó có lợi vì hợp với {{t:range|phạm vi bài}} của bạn." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "Bạn {{t:open|mở pot}} từ Button, {{t:big-blind}} {{t:call|theo}}. Trên flop bạn {{t:bet|đặt}} c-bet, đối thủ {{t:call|theo}}. Turn là lá 7. Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:check|xem bài}}. Bạn làm gì?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "Lá 7 trên {{t:board|bài chung}} có 9 và 6 tạo {{t:straight|sảnh}} cho T8 và 85, và {{t:two-pair}} cho 76 và 97, đều là những tay mà {{t:big-blind}} bảo vệ. Bạn không có {{t:pair|đôi}} hay {{t:draw|bài chờ}}. Bạn bỏ ý định {{t:bluff}} và nhận lá bài miễn phí." }
      - { text: "Cược {{n:ex.bet.three-quarters}}", why: "Lá này hợp với {{t:range|phạm vi bài}} của đối thủ, không phải của bạn, và bạn không có out để thành tay mạnh. Hãy đánh {{t:second-barrel}} bằng {{t:bluff}} trên những lá giúp bạn và với những tay có thể cải thiện." }
      - { text: "Cược {{n:ex.bet.pot}}", why: "Một cú {{t:bluff}} lớn trên lá có lợi cho đối thủ là rất rủi ro: họ phải {{t:fold|bỏ bài}} nhiều hơn {{n:alpha.bet-pot}} số lần, mà sau khi {{t:call|theo}} flop họ có nhiều {{t:pair|đôi}} và {{t:draw|bài chờ}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "Bạn {{t:open|mở pot}} từ Button, {{t:big-blind}} {{t:call|theo}} c-bet của bạn trên flop. Turn là lá A. Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:check|xem bài}}. Bạn làm gì?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Cược {{n:ex.bet.three-quarters}}", correct: true, why: "Một {{t:second-barrel}} tốt: lá A hợp với {{t:range|phạm vi bài}} của bạn, và bạn có gutshot ra {{t:straight|sảnh}} (lá 10). Khi đối thủ {{t:fold|bỏ}} {{t:pair|đôi}}, bạn thắng ngay, còn khi họ {{t:call|theo}}, bạn vẫn có thể trúng." }
      - { text: "Cược {{n:ex.bet.quarter}}", sizeError: true, why: "Hành động đúng, kích cỡ sai: cược rẻ như vậy thì đối thủ sẽ {{t:call|theo}} với bất kỳ {{t:pair|đôi}} nào, mà cú {{t:bluff}} này kiếm lời chủ yếu nhờ {{t:fold|bỏ bài}}. Trên lá giúp bạn, hãy cược lớn, giống như với tay mạnh." }
      - { text: "{{t:check|Xem bài}}", correct: true, why: "Cũng tốt: bạn có out và sẽ được xem river miễn phí, nên {{t:check}} không phải là sai lầm. Trong một ví dụ solver đã công bố, gutshot ra {{t:straight|sảnh}} cao nhất đã {{t:check|xem bài}} ở turn. Cả hai cách chơi đều đúng." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Bạn {{t:open|mở pot}} từ Button, {{t:big-blind}} {{t:call|theo}} c-bet của bạn trên flop. Turn là lá 2. Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:check|xem bài}}. Bạn làm gì?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "Bạn không có {{t:pair|đôi}} hay {{t:draw|bài chờ}}: ba lá cơ là không đủ khi chỉ còn một lá nữa, còn để thành {{t:straight|sảnh}} bạn thiếu hai lá. Lá 2 không thay đổi gì, và đối thủ đã {{t:call|theo}} flop trên {{t:board|bài chung}} có lá K, nên họ thường có {{t:pair|đôi}}. Bạn bỏ ý định {{t:bluff}}." }
      - { text: "Cược {{n:ex.bet.three-quarters}}", why: "{{t:bluff|Bluff}} không có out chỉ thắng khi đối thủ {{t:fold|bỏ bài}}. Sau khi {{t:call|theo}} flop, họ có nhiều {{t:pair|đôi}} (đôi K, đôi 8) sẽ không {{t:fold|bỏ}} trước một lá 2 trống." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Đối thủ {{t:check|xem bài}}, nên bạn có thể {{t:check|xem bài}} miễn phí (quy tắc từ mô-đun 1). {{t:fold|Bỏ bài}} là nhường {{t:pot|pot}} mà không có lý do." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Bạn {{t:bet|đặt}} {{t:second-barrel}} với {{t:flush-draw|bài chờ thùng}}, và đối thủ {{t:call|theo}}. Bạn còn cơ hội nào?"
    options:
      - { text: "Khoảng {{n:odds.flush.turn-river}} để trúng {{t:flush|thùng}} ở river", correct: true, why: "Đúng: đó là con đường thắng thứ hai. {{n:outs.flush}} out trong {{n:cards.unseen.turn}} lá chưa biết. Vì vậy {{t:semi-bluff}} tốt hơn {{t:bluff}} không có out." }
      - { text: "Không còn gì, {{t:bluff}} đã thất bại", why: "{{t:bluff|Bluff}} không có out thì hết cơ hội, nhưng bạn có {{t:draw|bài chờ}}: {{t:flush|thùng}} ở river sẽ thắng dù bạn đã bị {{t:call|theo}}." }
      - { text: "Khoảng {{n:odds.flush.flop-river}}", why: "Đó là cơ hội bạn có ở flop, khi còn hai lá phía trước. Ở turn chỉ còn một lá: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Bạn {{t:open|mở pot}} từ Button, {{t:big-blind}} {{t:call|theo}} c-bet của bạn trên flop. Turn là lá 2. Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:check|xem bài}}. Bạn làm gì?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "{{t:pair|Đôi}} 9 là tay trung bình: thắng các cú {{t:bluff}}, nhưng thua mọi tay có K. Trước cú cược thứ hai, đối thủ sẽ {{t:fold|bỏ}} tay yếu hơn và trả tiền bằng K. Khi {{t:check|xem bài}}, bạn giữ {{t:pot|pot}} nhỏ và đi đến showdown." }
      - { text: "Cược {{n:ex.bet.three-quarters}}", why: "Đối thủ đã {{t:call|theo}} flop trên {{t:board|bài chung}} có lá K. Tay yếu hơn (đôi 8, đôi 3) sẽ {{t:fold|bỏ bài}} hoặc trả một lần, còn tay mạnh hơn luôn trả. Cú cược như vậy mang lợi cho những tay mạnh hơn." }
      - { text: "Cược để biết mình đang đứng ở đâu", why: "Cược “để lấy thông tin” là lỗi phổ biến: bạn phải trả giá cho thông tin đó, vì tay mạnh hơn đằng nào cũng không để bạn thoát, còn tay yếu hơn sẽ bỏ chạy. Bạn cược {{t:value|lấy giá trị}} hoặc để {{t:bluff}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Bạn {{t:open|mở pot}} từ Button, {{t:big-blind}} {{t:call|theo}} c-bet của bạn trên flop. Turn là lá 2. Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:check|xem bài}}. Bạn làm gì?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Cược {{t:value|lấy giá trị}}", correct: true, why: "{{t:top-pair|Đôi cao nhất}} với kicker tốt nhất là tay mạnh. Đối thủ đã {{t:call|theo}} flop, nên thường có K yếu hơn hoặc đôi 8, những tay sẽ trả tiền thêm một lần nữa." }
      - { text: "{{t:check|Xem bài}}, vì đằng nào đối thủ cũng không có gì", why: "Đối thủ đã {{t:call|theo}} flop, nên thường có {{t:pair|đôi}}. Khi {{t:check|xem bài}}, bạn mất một {{t:bet|cược}} mà tay yếu hơn lẽ ra đã trả." }
      - { text: "Cược all-in", why: "Các {{t:pair|đôi}} yếu hơn hiếm khi trả cả stack. Hãy chọn kích cỡ mà K yếu hơn và đôi 8 sẽ trả." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Bạn thường {{t:bet|đặt}} {{t:second-barrel}} ở turn bằng những tay nào?"
    options:
      - { text: "Tay mạnh và {{t:draw|bài chờ}}; tay trung bình thì {{t:check|xem bài}}", correct: true, why: "Đúng: tay mạnh muốn được trả tiền, {{t:draw|bài chờ}} thắng theo hai cách, còn tay trung bình không được lợi gì từ thêm một {{t:bet|cược}}." }
      - { text: "Tất cả, để không mất {{t:initiative|thế chủ động}}", why: "Chỉ riêng {{t:initiative|thế chủ động}} thì không mang lại chiến thắng. Đối thủ đã {{t:call|theo}} flop, nên có {{t:range}} mạnh hơn, còn tay không có out và {{t:pair|đôi}} trung bình sẽ thua thiệt khi cược liên tục." }
      - { text: "Chỉ những tay mạnh nhất", why: "Khi đó đối thủ sẽ bỏ bài mỗi lần bạn cược và chỉ trả tiền khi thắng bạn. {{t:draw|Bài chờ}} là những cú {{t:semi-bluff}} tự nhiên." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. Trong {{t:pot|pot}} có {{n:ex.pot}}, bạn {{t:bluff}} bằng một tay gần như không thể thắng, và {{t:bet|cược}} {{n:ex.bet.three-quarters}}. Đối thủ phải {{t:fold|bỏ bài}} thường xuyên đến mức nào để cú {{t:bluff}} này hòa vốn? Hãy nhập số phần trăm."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = cược ÷ ({{t:pot}} + cược) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Khi có out, bạn cần ít lần {{t:fold|bỏ bài}} hơn, vì đằng nào bạn cũng sẽ thắng một phần các lần bị {{t:call|theo}} ở river."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Vì sao sau khi {{t:call|theo}} c-bet, {{t:range}} của đối thủ ở turn mạnh hơn ở flop?"
    options:
      - { text: "Vì họ đã {{t:fold|bỏ}} những tay yếu nhất ở flop", correct: true, why: "Đúng: trước c-bet, những tay không có {{t:pair|đôi}} và không có {{t:draw|bài chờ}} sẽ {{t:fold|bỏ bài}}. Còn lại là {{t:pair|đôi}} và {{t:draw|bài chờ}}, nên {{t:second-barrel}} gặp {{t:range}} mạnh hơn cú cược đầu tiên." }
      - { text: "Vì turn luôn giúp họ", why: "Không: turn là ngẫu nhiên và đôi khi giúp bạn (ví dụ lá A). {{t:range|Phạm vi bài}} của đối thủ mạnh lên nhờ chính quyết định của họ ở flop." }
      - { text: "Không phải vậy, họ có cùng {{t:range}} như trước flop", why: "Mỗi quyết định đều lọc bớt một số tay. Ai đã {{t:call|theo}} {{t:bet|cược}} thường đã trúng gì đó hoặc có {{t:draw|bài chờ}}." }
---
{{t:second-barrel}} là {{t:bet|cú cược}} thứ hai của người chơi đã {{t:raise|tố}} trước flop: c-bet ở flop, {{t:call}}, rồi cược ở turn. Ở turn, bạn không chỉ hỏi “mình có tay bài không”, mà còn hỏi “lá này giúp mình hay giúp đối thủ”.

## Đối thủ đã {{t:call|theo}}, nên họ mạnh hơn

Trước c-bet, đối thủ {{t:fold|bỏ}} những tay không có {{t:pair|đôi}} và không có {{t:draw|bài chờ}}. Ai đã {{t:call|theo}} thường có {{t:pair|đôi}} hoặc {{t:draw}}, đôi khi là lá cao kèm backdoor (như khi phòng thủ ở M6). Vì vậy {{t:second-barrel}} gặp {{t:range}} mạnh hơn cú cược đầu tiên, và bạn không cược lần hai với mọi tay.

## Lá nào có lợi

- **Lá cao trên {{t:board|bài chung}} thấp hơn** (A, K) thường có lợi cho người {{t:open|mở pot}}: nó trúng AK, AQ, KQ của họ, và mỗi {{t:pair}} của đối thủ đều tụt xuống một bậc. Trên những lá như vậy, bạn cược lần hai thường xuyên hơn, kể cả để {{t:bluff}}.
- **Lá thấp nối với {{t:board|bài chung}}**, ví dụ lá 7 trên [[9h 6c 2d]], có lợi cho {{t:big-blind}}: nó tạo {{t:straight|sảnh}} và {{t:two-pair}} cho những tay mà họ bảo vệ nhiều nhất.
- **Lá trống**, ví dụ lá 2 trên [[Kd 8c 3s]], ít thay đổi. Tay bài của bạn quyết định.

## Cược lần hai bằng gì

Bạn cược bằng tay mạnh ({{t:value|lấy giá trị}}) và {{t:draw|bài chờ}} ({{t:semi-bluff}}). {{t:semi-bluff|Semi-bluff}} thắng theo hai cách: khi đối thủ {{t:fold|bỏ bài}} hoặc khi bạn trúng ở river. Những tay không có {{t:pair|đôi}} và không có out thì bạn thường bỏ cuộc hơn, vì chúng chỉ thắng khi đối thủ bỏ bài, trừ khi chúng chặn những tay mà đối thủ sẽ dùng để trả tiền. Khi đối thủ có thể đáp trả bằng {{t:raise|tố}}, solver cũng {{t:bluff}} bằng những tay không có out.

{{t:bluff|Bluff}} không có cơ hội thắng sẽ hòa vốn khi đối thủ {{t:fold|bỏ bài}} với tần suất cược ÷ ({{t:pot}} + cược) (alpha từ M6). Với cược 3/4 {{t:pot|pot}}, con số đó là {{n:alpha.bet-three-quarters}}, với cược nửa {{t:pot|pot}} là {{n:alpha.bet-half}}.

## Tay trung bình thì {{t:check|xem bài}}

{{t:second-pair|Đôi thứ hai}} hoặc {{t:top-pair}} với kicker yếu thắng các cú {{t:bluff}}, nhưng thua những {{t:pair|đôi}} mạnh hơn. Trước cú cược thứ hai, tay yếu hơn sẽ {{t:fold|bỏ bài}}, còn tay mạnh hơn sẽ trả. Bạn {{t:check|xem bài}}, giữ {{t:pot|pot}} nhỏ và đi đến showdown.

:::note Các quy tắc này từ đâu ra
Các hướng chung (lá cao thường có lợi cho {{t:second-barrel}}, {{t:bluff}} bằng tay có out thay vì tay không có out, tay trung bình {{t:check|xem bài}}) là các nguyên tắc kinh nghiệm từ tài liệu đào tạo và phân tích solver. Chúng áp dụng cho stack khoảng {{n:format.stack}}. Đây là cách đơn giản hóa: solver cũng {{t:bluff}} bằng một phần các tay không có out khi chúng chặn {{t:value|giá trị}} của đối thủ hoặc khi đối thủ có thể đáp trả bằng {{t:raise|tố}}. Ứng dụng không đưa ra tần suất cược theo phần trăm, vì những con số như vậy phụ thuộc vào ván bài cụ thể trong kết quả solver.
:::
