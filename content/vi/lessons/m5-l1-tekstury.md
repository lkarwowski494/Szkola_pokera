---
id: m5.l1
module: m5
order: 1
title: "Kết cấu flop"
sub: "Độ cao, chất, độ liên kết"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Flop nào dưới đây là {{t:connected}}, tức là trên đó đã có thể có {{t:straight}} ngay bây giờ?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Đúng: chín, bảy và sáu nằm gọn trong năm hạng liên tiếp. Ví dụ, 85 hoặc T8 tạo thành {{t:straight|sảnh}}." }
      - { text: "[[Ks 8d 3c]]", why: "Sai: từ ba đến K quá xa. Không có hai lá nào tạo được {{t:straight|sảnh}} ở đây." }
      - { text: "[[Qd Qs 9h]]", why: "Sai: flop {{t:paired}}. Với hai lá trên tay và {{t:pair|đôi}} trên {{t:board|bàn}}, không thể có {{t:straight}}, vì {{t:straight|sảnh}} cần năm hạng khác nhau." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Flop là {{t:monotone}}: cả ba lá đều cùng một chất. Điều này có nghĩa là gì?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Người chơi có hai lá chất đó đã có {{t:flush}}", correct: true, why: "Đúng: ba lá cơ trên {{t:board|bàn}} và hai lá trên tay là năm lá cùng chất. Người chơi có một lá cơ thì có {{t:flush-draw}}." }
      - { text: "Chưa ai có thể có {{t:flush|thùng}}", why: "Sai: {{t:flush|thùng}} cần năm lá, và ba lá đã nằm trên {{t:board|bàn}}. Chỉ cần hai lá trên tay." }
      - { text: "{{t:flush|Thùng}} chỉ có thể có từ turn trở đi", why: "Sai: đó là trường hợp của flop {{t:two-tone|hai chất}}. Trên flop {{t:monotone|đồng chất}}, {{t:flush}} có thể đã hoàn thành ngay bây giờ." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Bạn có [[Ac Kd]], và flop là [[Ks 7d 2c]]. Tại sao trên flop như vậy, {{t:pair}} với kicker tốt lại an toàn hơn trên flop {{t:wet|ướt}}?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Vì đối thủ không có {{t:draw|draw}} nào, nên các lá tiếp theo hiếm khi thay đổi người dẫn", correct: true, why: "Đúng: flop là {{t:rainbow}} và không thể có {{t:straight}}. Đối thủ đang thua lúc này thường có ít out: vài lá để có {{t:three-of-a-kind|bộ ba}} hoặc {{t:two-pair}}, còn nếu không có {{t:pair|đôi}} thì cần hai lá tốt liên tiếp." }
      - { text: "Vì trên flop {{t:dry|khô}}, đối thủ luôn {{t:fold|bỏ bài}}", why: "Sai: đối thủ có con bảy, con hai hoặc K yếu hơn có thể {{t:call|theo}}. Flop {{t:dry|khô}} cho biết về {{t:draw|draw}}, chứ không cho biết đối thủ có {{t:fold|bỏ bài}} hay không." }
      - { text: "Vì {{t:pair}} K luôn thắng đến river", why: "Sai: đối thủ có thể đã có set hoặc {{t:two-pair}} ngay bây giờ. Flop {{t:dry|khô}} chỉ giảm nguy cơ bị ai đó đuổi kịp." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Sau flop, mỗi người chơi đã thấy năm trong bảy lá của mình. Cách ba lá trên {{t:board|bàn}} khớp với bài của người chơi được gọi là {{t:texture|kết cấu}} flop. {{t:texture|Kết cấu}} quyết định ai trúng bài thường xuyên hơn và có nên bet hay không. Trước khi học c-bet ({{t:bet|cược}} trên flop sau khi {{t:raise|tố}} trước flop), hãy học cách đọc flop theo bốn trục.

## Độ cao

Ta nhìn vào lá cao nhất. Flop **cao** có lá cao nhất là A, K hoặc Q, ví dụ [[Ks 7d 2c]]. Flop **trung bình** có lá cao nhất là J hoặc 10, ví dụ [[Jh 8c 4d]]. Flop **thấp** có lá cao nhất là 9 trở xuống, ví dụ [[7s 6h 5d]].

## Chất

Flop **{{t:rainbow}}** có ba chất khác nhau: chưa ai có {{t:flush-draw|draw thùng}}. Flop **{{t:two-tone}}** có hai lá cùng một chất, ví dụ [[Jh Th 8c]]: hai lá của người chơi thuộc chất đó cho {{t:flush-draw}}. Flop **{{t:monotone}}** có cả ba lá cùng một chất, ví dụ [[Kh 8h 3h]]: {{t:flush}} có thể đã hoàn thành.

## Hạng

Flop **{{t:paired}}** có hai lá cùng hạng, ví dụ [[Qd Qs 6h]]. Trên flop này không ai có {{t:straight|sảnh}} với hai lá trên tay, dù đôi khi vẫn có thể có {{t:straight-draw}} (ví dụ trên Q-Q-9).

Flop **{{t:connected}}** có ba hạng khác nhau nằm trong năm hạng liên tiếp, nên đã có thể có {{t:straight}} ngay bây giờ: trên [[9h 7d 6c]], ví dụ 85 và T8 tạo thành {{t:straight|sảnh}}. Lá A cũng được tính là một, nên [[Ah 5d 3c]] cũng là {{t:connected}}.

Flop **{{t:semi-connected|bán liên kết}}** chỉ có hai lá nằm trong năm hạng liên tiếp. Chưa ai có {{t:straight|sảnh}}, nhưng ai đó có thể có {{t:straight-draw}} (hở hai đầu hoặc gutshot): trên [[Kh Qd 4c]], ví dụ JT có draw đó. Những flop như vậy rất nhiều, vì chỉ cần hai lá gần nhau.

Flop **{{t:disconnected}}** có các lá cách xa nhau đến mức không có hai lá nào nằm trong năm hạng liên tiếp, ví dụ [[Ks 8d 3c]]. Ở đây không ai có dù chỉ {{t:straight-draw|draw sảnh}}. Những flop như vậy rất ít.

## {{t:dry|Khô}} hay {{t:wet}}

Ta tính điểm {{t:wetness|độ ướt}}, tức là mức độ flop tạo điều kiện cho {{t:draw|draw}} và các tay bài mạnh theo chất và theo {{t:straight|sảnh}}:

- {{t:straight}} đã có thể có ngay bây giờ theo nhiều cách, tức là với ít nhất hai tổ hợp khác nhau của hai hạng trên tay (trên [[9h 8d 7c]], JT, T6 và 65 tạo được sảnh): {{n:tex.points.straight.made}} điểm,
- {{t:straight}} chỉ có thể có theo một cách (trên [[Ah Kd Tc]] chỉ QJ tạo được, trên [[Ah 4d 2c]] chỉ 53): {{n:tex.points.straight.made-one}} điểm,
- chỉ có {{t:straight-draw}} (flop {{t:semi-connected|bán liên kết}} hoặc flop {{t:paired}} có hai lá gần nhau): {{n:tex.points.straight.draw}} điểm,
- hai lá cùng một chất: {{n:tex.points.suits.two-tone}} điểm; ba lá cùng một chất: {{n:tex.points.suits.monotone}} điểm.

Flop **{{t:dry}}** có ít hơn {{n:tex.threshold.medium}} điểm, flop **{{t:wet}}** có ít nhất {{n:tex.threshold.wet}} điểm, còn flop **trung gian** nằm ở giữa.

| Flop | Chất | {{t:straight|Sảnh}} | Tổng | {{t:texture|Kết cấu}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | trung gian |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | trung gian |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet}} |

{{t:straight}} đã hoàn thành có trọng số lớn hơn chỉ một {{t:draw}}, vì nó thay đổi tương quan lực lượng ngay bây giờ. {{t:straight|Sảnh}} có thể có theo nhiều cách có trọng số lớn hơn {{t:straight}} chỉ có thể có theo một cách: trên [[9h 8d 7c]] nhiều tay bài có {{t:straight|sảnh}} hoặc {{t:oesd}}, còn trên [[Ah Kd Tc]] chỉ QJ tạo được {{t:straight|sảnh}} và không ai có {{t:draw|draw}} hở hai đầu. Vì vậy A-K-T ba chất là flop trung gian, dù nó là {{t:connected}}.

Flop {{t:two-tone|hai chất}} [[Kh 7h 2c]] là flop {{t:dry}} với một {{t:flush-draw|draw thùng}}: không có {{t:straight|sảnh}} cũng không có {{t:straight-draw|draw sảnh}}. Flop {{t:monotone|đồng chất}} luôn là {{t:wet}}: trên [[Kh 8h 3h]] có nhiều tay bài có {{t:flush}} hoặc {{t:flush-draw}} hơn số tay bài có {{t:straight|sảnh}} hoặc {{t:oesd}} trên [[9h 8d 7c]].

Trên flop {{t:dry|khô}}, người dẫn thường vẫn dẫn đến river. Trên flop {{t:wet|ướt}}, các lá tiếp theo thường thay đổi tương quan lực lượng, nên tay bài mạnh nhất trên flop kém an toàn hơn.

:::note Các định nghĩa này từ đâu ra
Khái niệm {{t:dry}} và {{t:wet}} đến từ tài liệu poker: các tài liệu đào tạo xếp vào loại {{t:dry|khô}} ví dụ K-7-2, A-9-4 và A-A-6 ba chất, còn loại {{t:wet|ướt}} là 9-8-7, Q-J-T và T-9-5-4. Điểm số và các ranh giới chính xác, ví dụ flop trung bình bắt đầu từ lá 10, là quy ước được áp dụng trong ứng dụng để mọi flop đều có thể được đánh giá một cách rõ ràng. Các nguồn không đưa ra ngưỡng điểm và không quyết định cách gọi những flop không {{t:dry|khô}} cũng không {{t:wet|ướt}}. Theo quy ước này, khoảng {{n:tex.share.dry}} tổng số flop là {{t:dry|khô}}, khoảng {{n:tex.share.medium}} là trung gian và khoảng {{n:tex.share.wet}} là {{t:wet|ướt}}; đây là kết quả từ định nghĩa của ứng dụng, không phải con số từ tài liệu.
:::
