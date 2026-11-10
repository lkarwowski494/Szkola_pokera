---
id: m7.l4
module: m7
order: 4
title: "Probe bet và phòng thủ"
sub: "Khi đối thủ check hoặc cược lần thứ hai"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Button {{t:open|mở}}, bạn {{t:call|theo}} ở {{t:big-blind|mù lớn}}. Trên flop cả hai cùng check. Trên turn bạn cược trước. Khoản {{t:bet|cược}} này gọi là gì?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Đúng: probe bet là {{t:bet|cược}} {{t:out-of-position|không có vị trí}} trên turn, sau khi {{t:aggressor|người tấn công}} trước flop không c-bet mà {{t:check|check}}." }
      - { text: "C-bet", why: "Người {{t:bet|đặt}} c-bet là người chơi đã {{t:raise|tố}} trước flop. Bạn chỉ {{t:call|theo}}." }
      - { text: "Check-raise", why: "Check-raise là {{t:check}}, sau đó {{t:raise|tố}} lên {{t:bet|cược}} của đối thủ. Ở đây bạn cược trước, không {{t:raise|tố}} ai cả." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Vì sao sau khi Button {{t:check|check}} trên flop, bạn có thể cược trên turn thường xuyên hơn bình thường?"
    table: { position: BB }
    options:
      - { text: "Vì với nhiều tay bài mạnh Button sẽ cược, nên sau khi {{t:check|check}} họ có ít tay mạnh hơn", correct: true, why: "Đúng: tay bài mạnh thường c-bet. Sau khi {{t:check|check}}, {{t:range|dải bài}} của Button có nhiều tay trung bình và yếu hơn, và bạn có thể tấn công bằng một {{t:bet|cược}}." }
      - { text: "Vì {{t:check}} luôn có nghĩa là Button không có gì", why: "Không phải lúc nào cũng vậy: đôi khi Button {{t:check|check}} với tay mạnh để bẫy bạn. Tuy nhiên họ có ít tay như vậy hơn so với khi cược." }
      - { text: "Vì trên turn bạn mới là người có {{t:position|vị trí}}", why: "Không: Button hành động sau bạn ở mọi {{t:street|vòng cược}}. Bạn {{t:bet|đặt}} probe bet khi {{t:out-of-position|không có vị trí}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Button đã {{t:check|check}} trên flop. Với {{t:board|bài chung}} nào bạn {{t:bet|đặt}} probe bet từ {{t:big-blind|mù lớn}} thường xuyên hơn?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Đúng: các lá thấp trúng dải phòng thủ rộng của {{t:big-blind|mù lớn}} thường xuyên hơn ({{t:pair|đôi}} nhỏ, {{t:connectors|bài liên tiếp}}), còn Button sau khi {{t:check|check}} hiếm khi có tay mạnh ở đây." }
      - { text: "[[Ac Kd 8h Js]]", why: "Trên {{t:board|bài chung}} cao, Button có {{t:range-advantage|lợi thế dải bài}}: nhiều lá A và K của họ đã trúng. Ở đây bạn {{t:bet|đặt}} probe bet ít hơn." }
      - { text: "Thường xuyên như nhau ở cả hai", why: "{{t:texture|Kết cấu}} có ý nghĩa, giống như với c-bet ở M5: trên bài chung thấp bạn cược thường xuyên hơn, trên bài chung cao ít hơn." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Bạn phòng thủ {{t:big-blind|mù lớn}} trước {{t:open|lượt mở}} của Button. Trên flop cả hai đã {{t:check|check}}. Turn là lá 3. Bạn hành động trước. Bạn làm gì?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Cược (probe bet)", correct: true, why: "Bạn có {{t:oesd}} (lá 4 hoặc lá 9) trên {{t:board|bài chung}} thấp, hợp với {{t:range|dải bài}} của bạn. Bạn thắng khi Button {{t:fold|bỏ bài}}, còn khi họ {{t:call|theo}}, bạn vẫn có {{n:outs.oesd}} out." }
      - { text: "{{t:check|Check}}", correct: true, why: "Cũng được: với {{t:draw}} bạn có thể xem river miễn phí nếu Button cũng {{t:check|check}}. Tuy vậy, probe bet thường tốt hơn, vì sau khi {{t:check|check}} trên flop Button có {{t:range|dải bài}} yếu, còn bạn có một {{t:semi-bluff}} mạnh." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Chưa ai {{t:bet|cược}}, nên bạn có thể {{t:check|check}} miễn phí (quy tắc từ mô-đun 1). {{t:fold|Bỏ bài}} là từ bỏ {{t:pot}} mà không có lý do." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Bạn phòng thủ {{t:big-blind|mù lớn}} trước {{t:open|lượt mở}} của Button. Trên flop cả hai đã {{t:check|check}}. Turn là lá 3. Bạn hành động trước. Bạn làm gì?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Cược (probe bet)", correct: true, why: "{{t:top-pair|Đôi cao nhất}} là tay bài tốt để probe bet: các {{t:pair|đôi}} yếu hơn và lá cao của Button sẽ trả tiền cho bạn, và bằng {{t:bet|cược}} bạn không cho họ lá bài miễn phí." }
      - { text: "{{t:check|Check}}", why: "Sau khi {{t:check|check}} trên flop, Button thường có lá cao mà không có {{t:pair|đôi}}. Nếu họ lại {{t:check|check}}, họ được một lá bài miễn phí có thể thắng bạn, còn bạn không kiếm được gì từ các tay yếu hơn của họ." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Chưa ai {{t:bet|cược}}, nên bạn có thể {{t:check|check}} miễn phí. Và với {{t:top-pair|đôi cao nhất}} bạn muốn cược." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Bạn phòng thủ {{t:big-blind|mù lớn}} trước {{t:open|lượt mở}} của Button. Trên flop cả hai đã {{t:check|check}}. Turn là lá J. Bạn hành động trước. Bạn làm gì?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "Bạn không có {{t:pair|đôi}} cũng không có {{t:draw}}, và {{t:board|bài chung}} cao có lợi cho {{t:range|dải bài}} của Button. Probe bet không có out trên {{t:board|bài chung}} như thế này chỉ thắng khi Button {{t:fold|bỏ bài}}, mà ở đây họ có nhiều lá A, K và J." }
      - { text: "Cược (probe bet)", why: "Bạn {{t:bet|đặt}} probe bet thường xuyên hơn trên bài chung thấp và với tay bài có {{t:pair|đôi}} hoặc có out. Ở đây bạn không có cái nào." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Bạn có thể {{t:check|check}} miễn phí, nên {{t:fold|bỏ bài}} chẳng mang lại gì (quy tắc từ mô-đun 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Bạn phòng thủ {{t:big-blind|mù lớn}}. Bạn đã {{t:call|theo}} c-bet của Button trên flop. Turn là lá 2, bạn {{t:check|check}}, còn Button {{t:bet|cược}} {{n:ex.bet.three-quarters}} vào {{t:pot}} {{n:ex.pot}}. Bạn làm gì?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Bạn chỉ có gutshot (lá J): khoảng {{n:odds.gutshot.turn-river}} trên river, trong khi bạn cần {{n:eq.bet-three-quarters}}. Không có {{t:pair|đôi}} và chỉ còn một lá bài, tay này không phòng thủ được trước {{t:second-barrel}}." }
      - { text: "{{t:call|Theo}}", why: "Giá cao gấp mấy lần cơ hội của bạn: {{n:eq.bet-three-quarters}} so với khoảng {{n:odds.gutshot.turn-river}}. Implied odds không bù được chênh lệch như vậy." }
      - { text: "Check-raise", why: "{{t:second-barrel}} là {{t:range|dải bài}} mạnh hơn c-bet: Button thường có lá K hoặc tay tốt hơn sẽ không {{t:fold|bỏ bài}}. Với {{n:outs.gutshot}} out, đây là một {{t:bluff}} đắt giá." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Bạn phòng thủ {{t:big-blind|mù lớn}}. Bạn đã {{t:call|theo}} c-bet của Button trên flop. Turn là lá K, bạn {{t:check|check}}, còn Button chỉ {{t:bet|cược}} {{n:ex.bet.quarter}} vào {{t:pot}} {{n:ex.pot}}. Bạn làm gì?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Bạn có {{t:oesd}} (lá J hoặc lá 6): khoảng {{n:odds.oesd.turn-river}}. Cược nhỏ chỉ đòi hỏi {{n:eq.bet-quarter}}, gần như đúng bằng mức đó, và nếu trúng bạn còn có thể thắng thêm trên river." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Với cược nhỏ như vậy, giá gần bằng cơ hội của bạn ({{n:eq.bet-quarter}} so với khoảng {{n:odds.oesd.turn-river}}), và implied odds nghiêng quyết định về phía {{t:call|theo}}." }
      - { text: "{{t:raise|Tố}} all-in", why: "Bạn mạo hiểm cả stack với tay bài chưa có gì, còn Button có lá K sẽ không {{t:fold|bỏ bài}}. Với giá tốt như vậy, chỉ cần {{t:call|theo}} là đủ." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Bạn phòng thủ {{t:big-blind|mù lớn}}. Bạn đã {{t:call|theo}} c-bet của Button trên flop. Turn là lá 5, bạn {{t:check|check}}, còn Button {{t:bet|cược}} {{n:ex.bet.three-quarters}} vào {{t:pot}} {{n:ex.pot}}. Bạn làm gì?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "{{t:top-pair|Đôi cao nhất}} quá mạnh để {{t:fold|bỏ bài}} trước một lá bài trống: nó thắng các {{t:semi-bluff}} và các lá K yếu hơn. Bạn cần {{n:eq.bet-three-quarters}}, và trước {{t:range|dải bài}} {{t:second-barrel}}, một {{t:pair|đôi}} như vậy thường có đủ mức đó." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt. {{t:second-barrel}} mạnh hơn c-bet, nhưng Button cũng {{t:bet|cược}} nó bằng {{t:draw}} và {{t:bluff}}. {{t:top-pair|Đôi cao nhất}} thắng tất cả." }
      - { text: "{{t:raise|Tố}}", why: "Sau khi bạn {{t:raise|tố}}, các tay yếu hơn sẽ {{t:fold|bỏ bài}}, còn các lá K tốt hơn và sám cô sẽ trả tiền. {{t:top-pair|Đôi cao nhất}} với kicker trung bình không phải tay bài để {{t:raise|tố}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Vì sao trước {{t:second-barrel}} bạn phòng thủ hẹp hơn so với trước c-bet trên flop?"
    table: { position: BB }
    options:
      - { text: "Vì đối thủ {{t:bet|đặt}} {{t:second-barrel}} bằng {{t:range|dải bài}} hẹp hơn và thường với mức cược lớn hơn, còn {{t:draw}} chỉ còn một lá bài", correct: true, why: "Đúng: đối thủ bỏ một phần {{t:bluff}} trên turn, cược lớn hơn làm giảm {{t:mdf}} (với 3/4 {{t:pot}} là {{n:mdf.bet-three-quarters}}), và các {{t:draw}} của bạn mất một nửa cơ hội. Bạn {{t:fold|bỏ}} các {{t:pair|đôi}} yếu và tay không có out thường xuyên hơn trên flop." }
      - { text: "Vì trên turn cần tiết kiệm {{t:chips|chip}}", why: "Điều quan trọng là {{t:expected-value}} của mỗi quyết định, không phải tiết kiệm. Bạn phòng thủ hẹp hơn vì đối thủ cược bằng tay mạnh hơn." }
      - { text: "Không, bạn phòng thủ rộng hơn vì đã bỏ vào nhiều {{t:chips|chip}}", why: "Số chip bạn đã bỏ vào không quay lại. Bạn quyết định dựa trên giá hiện tại và độ mạnh của {{t:range|dải bài}} đối thủ." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. Đối thủ {{t:bet|cược}} {{n:ex.bet.three-quarters}} vào {{t:pot}} {{n:ex.pot}}. {{t:mdf}} là bao nhiêu? Hãy nhập số theo phần trăm."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + cược) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. Trong một ví dụ turn đã công bố, solver phòng thủ trung bình gần {{t:mdf}}; khi {{t:out-of-position|không có vị trí}}, đôi khi bạn phòng thủ ít hơn (trên flop và trên turn). Khi biết đối thủ {{t:bluff}} ít hơn, bạn {{t:fold|bỏ bài}} thường xuyên hơn (phép tính ở M8, bài học về bắt {{t:bluff}})."
---
Trên turn bạn sẽ gặp hai tình huống mới: Button không c-bet mà {{t:check|check}}, hoặc đã c-bet và cược lần thứ hai. Ở tình huống đầu, bạn có thể tự tấn công; ở tình huống sau, bạn phòng thủ hẹp hơn so với trên flop.

## Probe bet

Probe bet là {{t:bet|cược}} {{t:out-of-position|không có vị trí}} trên turn, sau khi {{t:aggressor|người tấn công}} trước flop đã {{t:check|check}} trên flop. Với nhiều tay mạnh Button sẽ c-bet, nên sau khi {{t:check|check}} họ có ít tay mạnh hơn. {{t:range|Dải bài}} của họ yếu hơn và bạn có thể tấn công.

- **Thường xuyên hơn trên bài chung thấp**, ví dụ [[8c 5d 2s 3h]]: các lá thấp trúng dải phòng thủ rộng của bạn.
- **Ít hơn trên bài chung cao**, ví dụ [[Ac Kd 8h Js]]: {{t:range-advantage|lợi thế dải bài}} vẫn thuộc về Button.

## Probe bet bằng gì

- **Các {{t:pair|đôi}}** muốn được lá cao của Button trả tiền và không muốn cho họ lá bài miễn phí,
- **các {{t:draw}} mạnh**, thắng theo hai cách.

Tay bài không có {{t:pair|đôi}} và không có out thì {{t:check|check}}.

## Phòng thủ trước {{t:second-barrel}}

Khi bạn đã {{t:call|theo}} c-bet và Button cược lần thứ hai, {{t:range|dải bài}} của họ hẹp hơn và mạnh hơn trên flop: họ đã bỏ một phần {{t:bluff}}. Các {{t:draw}} của bạn chỉ còn một lá bài. Vì vậy:

- {{t:draw}} chỉ {{t:call|theo}} khi giá tốt hoặc có implied odds (bài học trước),
- tay không có out và các {{t:pair|đôi}} yếu nhất {{t:fold|bỏ bài}} thường xuyên hơn,
- {{t:top-pair|đôi cao nhất}} thường vẫn {{t:call|theo}}.

{{t:mdf}} vẫn là điểm tham chiếu: với cược 3/4 {{t:pot}} là {{n:mdf.bet-three-quarters}}. Trong một ví dụ turn đã công bố, solver phòng thủ trung bình gần giá trị này; khi {{t:out-of-position|không có vị trí}}, đôi khi bạn phòng thủ ít hơn. Bạn cũng phòng thủ ít hơn khi đối thủ {{t:bluff}} ít hơn mức {{t:mdf}} giả định.

:::note Các quy tắc này từ đâu ra
Các quy tắc về probe bet và phòng thủ trước {{t:second-barrel}} là các heuristic từ tài liệu đào tạo và phân tích solver. Việc phòng thủ trên turn gần {{t:mdf}} được thể hiện qua một ví dụ solver đã công bố. Ứng dụng không đưa ra tần suất theo phần trăm, vì các nguồn khác nhau tùy theo bài chung. Số liệu về việc người chơi microstakes {{t:bet|đặt}} probe bet bằng gì cần nguồn có mô tả quần thể (mẫu, {{t:stakes|mức cược}}, phòng chơi), nên không có ở đây.
:::
