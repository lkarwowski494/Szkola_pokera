---
id: m5.l2
module: m5
order: 2
title: "Flop có lợi cho ai"
sub: "Lợi thế dải bài và lợi thế nuts"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}. Flop: [[Ks 7d 2c]]. Ai có {{t:range-advantage|lợi thế dải bài}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Bạn, người {{t:open|mở}} từ Button", correct: true, why: "Đúng: {{t:range|range}} của bạn có đủ mọi KK, AK và KQ. {{t:big-blind|Big blind}} sẽ tố lại những tay mạnh nhất trong số đó trước flop, còn phần phòng thủ rộng của họ phần lớn là những tay trượt ở đây." }
      - { text: "{{t:big-blind|Big blind}}", why: "Không: {{t:big-blind}} có nhiều tay yếu hơn vì đã phòng thủ rộng. Họ có lá K với kicker tốt ít hơn bạn." }
      - { text: "Không ai cả, flop là ngẫu nhiên", why: "Flop là ngẫu nhiên, nhưng {{t:range|range}} thì không. Cùng một flop sẽ hợp hơn với {{t:range|range}} có nhiều lá cao hơn." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}. Flop: [[7s 6h 5d]]. Ai thường có tay rất mạnh ở đây hơn ({{t:two-pair}} hoặc {{t:straight}})?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "{{t:big-blind|Big blind}}", correct: true, why: "Đúng: {{t:big-blind}} phòng thủ nhiều {{t:connectors|bài liên tiếp}} cùng chất và các tay có lá 6 hoặc lá 7. Bạn từ Button có nhiều lá cao hơn, và chúng trượt ở đây. Đó là {{t:nuts-advantage}} của {{t:big-blind|big blind}}." }
      - { text: "Bạn, người {{t:open|mở}} từ Button", why: "Không: {{t:range}} của bạn đầy lá cao. Bạn có nhiều {{t:overpair|overpair}} hơn ({{t:pocket-pair|đôi túi}} cao hơn mọi lá trên {{t:board|bàn}}, ví dụ TT, JJ), nhưng ít {{t:two-pair|hai đôi}} và {{t:straight|sảnh}} hơn; số set (bộ ba với {{t:pocket-pair|đôi túi}}) của hai bạn thì tương đương." }
      - { text: "Cả hai thường như nhau", why: "Không: các {{t:range|range}} khác nhau về thành phần. Phần phòng thủ rộng của {{t:big-blind|big blind}} có nhiều lá nhỏ, còn {{t:range}} của bạn có nhiều lá cao." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Vì sao {{t:big-blind}} chỉ {{t:call|theo}} lượt {{t:open}} của bạn lại hiếm khi có AA hoặc AK trên flop [[Ad 8s 3c]]?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Vì với những tay này họ thường {{t:raise|tố}} trước flop (3-bet)", correct: true, why: "Đúng: {{t:big-blind}} chơi những tay mạnh nhất bằng 3-bet, nên sau khi chỉ {{t:call|theo}}, {{t:range}} của họ có ít tay tốt nhất. Bạn thì có đủ chúng trong {{t:range|range}}." }
      - { text: "Vì {{t:big-blind}} không bao giờ chơi lá A", why: "Không: {{t:big-blind}} phòng thủ nhiều tay có lá A, ví dụ A5 hay A9. Họ chủ yếu thiếu những tay mạnh nhất, những tay mà họ sẽ tố lại." }
      - { text: "Vì trên flop đã có một lá A", why: "Lá A trên {{t:board|bàn}} làm giảm số {{t:combo|tổ hợp}} có lá A trong cả hai {{t:range|range}}, nhưng không tạo ra khác biệt giữa chúng. Khác biệt đến từ các quyết định trước flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Bạn có {{t:range-advantage|lợi thế dải bài}}, nhưng đối thủ có số tay mạnh nhất ngang bạn. Bạn thường cược với cỡ nào?"
    options:
      - { text: "Nhỏ, và thường xuyên", correct: true, why: "Đúng: {{t:range-advantage}} cho biết bạn có thể cược thường xuyên. Không có {{t:nuts-advantage|lợi thế nuts}}, một {{t:bet|cược}} lớn sẽ mạo hiểm nhiều trước những tay mạnh nhất của đối thủ, còn các tay yếu hơn dù sao cũng {{t:fold|bỏ bài}} trước cược nhỏ." }
      - { text: "Lớn, vì bạn có lợi thế", why: "Không: cỡ cược lớn do {{t:nuts-advantage}} quyết định, tức là có nhiều tay mạnh nhất hơn. Ở đây bạn không có lợi thế đó." }
      - { text: "Luôn {{t:check}}", why: "Quá thận trọng: {{t:range-advantage}} là lý do để cược thường xuyên, chỉ là cược nhỏ." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "{{t:range|Range}} của bạn có nhiều tay mạnh nhất hơn hẳn {{t:range|range}} của đối thủ. Điều đó mang lại gì cho bạn?"
    options:
      - { text: "Bạn có thể cược lớn, vì hiếm khi gặp tay mạnh hơn", correct: true, why: "Đúng: đó là {{t:nuts-advantage}}. Một {{t:bet|cược}} lớn lấy được nhiều hơn từ các tay trung bình của đối thủ, còn việc bị {{t:raise|tố}} bởi tay mạnh hơn thì hiếm." }
      - { text: "Bạn luôn phải cược nhỏ", why: "Không: bạn chọn cỡ nhỏ khi chỉ có {{t:range-advantage|lợi thế dải bài}}. {{t:nuts-advantage|Lợi thế nuts}} cho phép bạn cược lớn hơn." }
      - { text: "Không gì cả, chỉ tay bài của bạn mới quan trọng", why: "Tay bài của bạn quan trọng, nhưng đối thủ chỉ thấy {{t:range}} của bạn. Cỡ {{t:bet|cược}} được chọn sao cho hợp với nhiều tay cùng lúc." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Đối thủ có hai lá khác hạng, ví dụ [[Jc Td]]. Trong bao nhiêu phần trăm trường hợp flop không tạo đôi với lá nào trong hai lá đó? Hãy nhập một số."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Trong {{n:cards.unseen.preflop}} lá chưa biết, chỉ {{n:pair.outs.unpaired}} lá tạo {{t:pair|đôi}}: ba lá J và ba lá 10 còn lại. Flop gồm {{n:cards.board.flop}} lá, và khả năng không lá nào thuộc {{n:pair.outs.unpaired}} lá đó là khoảng {{n:flop.miss.unpaired}}. Vì vậy bạn chỉ trúng {{t:pair|đôi}} trong khoảng {{n:flop.hit.unpaired}} số trường hợp."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Tay không có {{t:pair|đôi}} trượt {{t:pair|đôi}} trên flop trong khoảng {{n:flop.miss.unpaired}} số trường hợp. Điều này có ý nghĩa gì với c-bet?"
    options:
      - { text: "Đối thủ thường không có gì, nên ngay cả một {{t:bet|cược}} nhỏ cũng thường thắng {{t:pot}} ngay", correct: true, why: "Đúng: đó là nền tảng của c-bet. Trượt không phải lúc nào cũng có nghĩa là {{t:fold|bỏ bài}} (đối thủ có thể có {{t:draw|bài chờ}} hoặc lá cao), nhưng trong {{t:range|range}} của họ có nhiều tay yếu." }
      - { text: "Đối thủ sẽ {{t:fold|bỏ bài}} đúng {{n:flop.miss.unpaired}} số trường hợp", why: "Không: đối thủ không có {{t:pair|đôi}} đôi khi {{t:call|theo}} với {{t:draw|bài chờ}} hoặc lá cao, và đôi khi đã có sẵn {{t:pair|đôi}} trên tay. Đây chỉ là ước lượng flop trượt với họ thường xuyên đến mức nào." }
      - { text: "Bạn cũng trượt thường xuyên như vậy, nên c-bet chẳng có ý nghĩa", why: "Không: bạn cũng thường trượt, nhưng đối thủ không biết khi nào. {{t:range|Range}} của bạn với tư cách {{t:aggressor|người tấn công}} (người chơi {{t:raise|tố}} cuối cùng trước flop) mạnh hơn trên nhiều flop, và {{t:bet|cược}} sẽ thắng {{t:pot}} khi đối thủ {{t:fold|bỏ bài}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Vậy trong bao nhiêu phần trăm trường hợp flop tạo đôi với ít nhất một trong hai lá của tay không có {{t:pair|đôi}}? Hãy nhập một số."
    answer: flop.hit.unpaired
    explanation: "Đây là phần bù của số trước: {{n:prob.certain}} trừ {{n:flop.miss.unpaired}} là khoảng {{n:flop.hit.unpaired}}, tức là cứ khoảng ba flop thì có một."
---
Trước flop, {{t:range|range}} của những người chơi trông khác nhau. Người {{t:open|mở}} từ Button có nhiều lá cao. {{t:big-blind|Big blind}} phòng thủ rất rộng, nhưng thường {{t:raise|tố}} với những tay mạnh nhất (AA, KK, AK), nên sau khi chỉ {{t:call|theo}}, họ có ít tay như vậy. Flop hợp hơn với một trong hai {{t:range|range}} này, và điều đó quyết định ai có thể cược thường xuyên.

## {{t:range-advantage|Lợi thế dải bài}}

Bạn có {{t:range-advantage|lợi thế dải bài}} khi trên một flop cụ thể, các tay của bạn trung bình mạnh hơn các tay của đối thủ. Trên [[Ks 7d 2c]] sau khi {{t:open|mở}} từ Button, chính bạn là người có nhiều lá K với kicker tốt hơn và nhiều {{t:pair|đôi}} cao hơn. {{t:big-blind|Big blind}} ở đây có nhiều tay đã trượt.

Trên flop thấp, {{t:connected|liên kết}}, ví dụ [[7s 6h 5d]], {{t:range-advantage}} gần như biến mất, và {{t:big-blind}} thường có những tay mạnh nhất hơn: họ phòng thủ nhiều {{t:connectors|bài liên tiếp}} cùng chất và các tay có lá 6 hoặc lá 7, nên thường có {{t:two-pair}} hoặc {{t:straight|sảnh}} hơn.

## {{t:nuts-advantage|Lợi thế nuts}}

{{t:nuts-advantage|Lợi thế nuts}} là có nhiều tay mạnh nhất (“{{t:nuts|nuts}}”) hơn trong {{t:range|range}}. {{t:range-advantage|Lợi thế dải bài}} cho biết bạn có thể cược thường xuyên đến mức nào. {{t:nuts-advantage|Lợi thế nuts}} cho biết cược lớn đến đâu: khi bạn có nhiều tay mạnh nhất hơn hẳn đối thủ, bạn có thể cược với cỡ lớn hơn. Khi chỉ có {{t:range-advantage|lợi thế dải bài}}, bạn cược nhỏ.

## Đối thủ thường trượt

Tay không có {{t:pair|đôi}}, ví dụ [[Jc Td]], trượt {{t:pair|đôi}} trên flop trong khoảng {{n:flop.miss.unpaired}} số trường hợp. Trong {{n:cards.unseen.preflop}} lá chưa biết, chỉ {{n:pair.outs.unpaired}} lá tạo đôi với các lá của tay đó. Các nguồn thường đưa ra con số khoảng {{n:flop.hit.one-pair}}: đó là khả năng trúng đúng một {{t:pair|đôi}}; tính cả {{t:two-pair|hai đôi}} và {{t:three-of-a-kind|bộ ba}}, tỷ lệ trúng là khoảng {{n:flop.hit.unpaired}}. Vì vậy, {{t:bet|cược}} trên flop thường thắng {{t:pot}} ngay, kể cả khi chính bạn không trúng gì. Trượt không phải lúc nào cũng có nghĩa là {{t:fold|bỏ bài}}: đối thủ có thể có {{t:draw|bài chờ}} hoặc hai lá cao.

:::note Các nguyên tắc này từ đâu ra
Khái niệm {{t:range-advantage|lợi thế dải bài}} và {{t:nuts-advantage|lợi thế nuts}} lấy từ các tài liệu về lý thuyết trò chơi dựa trên kết quả của solver (bảng thuật ngữ và bài viết về cỡ c-bet). Các con số trong bài học này là phép tính chính xác của ứng dụng.
:::
