---
id: m5.l3
module: m5
order: 3
title: "Cược thường xuyên đến đâu và lớn bao nhiêu"
sub: "C-bet khi có vị trí"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Bạn đã {{t:open|mở}} từ Button, {{t:big-blind}} đã {{t:call|theo}} và {{t:check|xem bài}} ở flop. Kế hoạch nào hợp với flop này?"
    position: BTN
    options:
      check: "{{t:check|Xem bài}} thường xuyên hơn, c-bet ít hơn bình thường"
      small: "C-bet thường xuyên và nhỏ: {{n:cbet.size.small}} {{t:pot|pot}} ({{n:cbet.btn.small}})"
      big: "C-bet thường xuyên và lớn: {{n:cbet.size.big}} {{t:pot|pot}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Quá thận trọng: trên flop {{t:dry|khô}}, cao, bạn có {{t:range-advantage|lợi thế dải bài}}, còn đối thủ thường đã trượt. Khi {{t:check|xem bài}}, bạn cho họ một lá miễn phí."
          small: "Đúng: flop {{t:dry}}, cao có lợi cho bạn. Một {{t:bet}} nhỏ là đủ để đối thủ {{t:fold|bỏ bài}} với các tay yếu, còn các {{t:pair|đôi}} kém hơn vẫn sẽ {{t:call|theo}}."
          big: "Hành động đúng, kích thước sai: trên flop {{t:dry|khô}}, đối thủ có ít {{t:draw|bài chờ}}, và các tay đã trượt cũng sẽ {{t:fold|bỏ bài}} trước một {{t:bet}} nhỏ. Một {{t:bet}} lớn hơn khiến đối thủ {{t:fold|bỏ bài}} với gần như cùng những tay đó, nhưng rủi ro nhiều hơn. Hãy cược khoảng {{n:cbet.size.small}} {{t:pot|pot}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Quá thận trọng: bạn có {{t:range-advantage|lợi thế dải bài}}, và trên flop {{t:paired|có đôi}} khó có {{t:draw}}, nên đối thủ không có {{t:pair|đôi}} hiếm khi trả nổi ngay cả một {{t:bet}} nhỏ."
          small: "Đúng: trên flop {{t:paired|có đôi}}, bạn cược thường xuyên và nhỏ. Đối thủ không có {{t:pair|đôi}} hiếm khi có gì để {{t:call|theo}}, và cả hai người chơi đều có thể có {{t:three-of-a-kind|bộ ba}}, nên không có lý do để mạo hiểm nhiều hơn."
          big: "Hành động đúng, kích thước sai: trên flop {{t:paired|có đôi}}, ai trong hai bạn cũng có thể có {{t:three-of-a-kind|bộ ba}}, nên một {{t:bet}} lớn không đáng, và các tay yếu của đối thủ cũng sẽ {{t:fold|bỏ bài}} trước cược nhỏ. Khoảng {{n:cbet.size.small}} {{t:pot|pot}} là đủ."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Đúng: flop thấp với các lá gần nhau trúng {{t:range|range}} của {{t:big-blind|big blind}}: họ bảo vệ nhiều tay có lá nhỏ, còn các lá cao của bạn đã trượt ở đây. Trên flop {{t:connected|liên kết}}, họ còn có {{t:straight|sảnh}} và {{t:two-pair|hai đôi}}, nên thường bạn không có {{t:nuts-advantage|lợi thế nuts}}. Bạn c-bet ít hơn so với trên flop cao: nhiều tay {{t:check|xem bài}}, còn chủ yếu các tay mạnh và {{t:draw|bài chờ}} mạnh mới cược."
          small: "Quá thường xuyên: flop thấp với các lá gần nhau trúng {{t:range|range}} của {{t:big-blind|big blind}}, còn trên flop {{t:connected|liên kết}} thường bạn không có {{t:nuts-advantage|lợi thế nuts}}. C-bet thường xuyên, dù nhỏ, cho {{t:big-blind}} cơ hội {{t:raise|tố}} sau khi đã {{t:check|xem bài}} trước (check-raise) bằng những tay mạnh nhất."
          big: "Quá thường xuyên và quá đắt: flop này trúng {{t:range|range}} của {{t:big-blind|big blind}}, còn trên flop {{t:connected|liên kết}} họ còn có {{t:straight|sảnh}} và {{t:two-pair|hai đôi}}. C-bet lớn thường xuyên rủi ro nhiều khi chính bạn thường chỉ có lá cao."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "Bạn đã {{t:open|mở}} từ Button, {{t:big-blind}} đã {{t:call|theo}} và {{t:check|xem bài}}. Bạn có {{t:pair|đôi}} K kèm lá J. Bạn làm gì?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} {{t:pot|pot}})", correct: true, why: "Đúng: {{t:top-pair}} ({{t:pair|đôi}} với lá cao nhất trên {{t:board|bàn}}) trên flop {{t:dry|khô}}. Một {{t:bet}} nhỏ sẽ được {{t:call}} bởi các tay có 7, có 2 và K yếu hơn, còn đối thủ gần như không có {{t:draw|bài chờ}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} {{t:pot|pot}})", sizeError: true, why: "Hành động đúng, kích thước sai: trên flop {{t:dry|khô}}, đối thủ không có {{t:draw|bài chờ}}, và các tay đã trượt cũng sẽ {{t:fold|bỏ bài}} trước một {{t:bet}} nhỏ. Một {{t:bet}} lớn hơn khiến đối thủ {{t:fold|bỏ bài}} với gần như cùng những tay đó, nhưng rủi ro nhiều hơn. Hãy cược khoảng {{n:cbet.size.small}} {{t:pot|pot}}." }
      - { text: "{{t:check|Xem bài}}", why: "Bạn mất giá trị: đối thủ có nhiều {{t:pair|đôi}} yếu hơn và tay có A, những tay sẽ trả một {{t:bet}} nhỏ. Trên flop {{t:dry|khô}} với {{t:top-pair|đôi cao nhất}}, bạn cược." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "Bạn đã {{t:open|mở}} từ Button, {{t:big-blind}} đã {{t:call|theo}} và {{t:check|xem bài}}. Bạn có set J trên flop có nhiều {{t:draw|bài chờ}}. Bạn làm gì?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} {{t:pot|pot}})", correct: true, why: "Đúng: đối thủ có nhiều {{t:flush-draw|bài chờ thùng}} và chờ {{t:straight|sảnh}} (vd. QT, AQ, hai lá cơ). Một {{t:bet}} lớn buộc họ phải trả đắt cho lá tiếp theo." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} {{t:pot|pot}})", sizeError: true, why: "Hành động đúng, kích thước sai: một {{t:bet}} nhỏ cho {{t:draw|bài chờ}} của đối thủ một lá rẻ, và set của bạn có thể thua thùng hoặc {{t:straight|sảnh}}. Khi có nhiều {{t:draw|bài chờ}}, hãy cược lớn." }
      - { text: "{{t:check|Xem bài}} để không làm đối thủ sợ", why: "Khi có nhiều {{t:draw|bài chờ}}, một lá miễn phí là món quà cho chúng. Với tay rất mạnh, bạn xây {{t:pot|pot}} ngay." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "Bạn đã {{t:open|mở}} từ Button, {{t:big-blind}} đã {{t:call|theo}} và {{t:check|xem bài}}. Flop {{t:paired}}. Kế hoạch nào đúng ở đây?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet thường xuyên và nhỏ", correct: true, why: "Đúng: bạn có {{t:range-advantage|lợi thế dải bài}}, và trên flop {{t:paired|có đôi}} khó có {{t:draw}}, nên đối thủ không có {{t:pair|đôi}} hiếm khi trả nổi ngay cả một {{t:bet}} nhỏ. Bạn cũng có nhiều {{t:pair|đôi}} cao hơn, vd. AA và KK, mà {{t:big-blind}} thường không có sau khi chỉ {{t:call|theo}}." }
      - { text: "C-bet thường xuyên và lớn", sizeError: true, why: "Hành động đúng, kích thước sai: ai trong hai bạn cũng có thể có {{t:three-of-a-kind|bộ ba}}, nên một {{t:bet}} lớn không đáng, và đối thủ không có {{t:pair|đôi}} cũng sẽ {{t:fold|bỏ bài}} trước cược nhỏ. Hãy cược thường xuyên và nhỏ." }
      - { text: "{{t:check|Xem bài}} nhiều hơn cược", why: "Quá thận trọng: flop {{t:paired}}, cao có lợi cho bạn, còn đối thủ ở đây thường không có gì." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "Bạn đã {{t:open|mở}} từ Button, {{t:big-blind}} đã {{t:call|theo}} và {{t:check|xem bài}}. Flop {{t:monotone}}. Kế hoạch nào đúng ở đây?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet ít hơn bình thường và nhỏ", correct: true, why: "Đúng: người chơi nào cũng có thể đã có {{t:flush}}, nên {{t:nuts-advantage}} của bạn nhỏ hơn so với trên flop cao thông thường. Bạn cược ít hơn và với kích thước nhỏ, để không xây {{t:pot|pot}} lớn chống lại một tay thùng." }
      - { text: "C-bet thường xuyên và lớn để {{t:draw|bài chờ}} phải trả", why: "Trên flop {{t:monotone|đồng chất}}, {{t:pot}} lớn rất nguy hiểm: đối thủ có thể đã có {{t:flush}} hoàn chỉnh, còn các tay không có lá cơ của bạn chống đỡ kém." }
      - { text: "Luôn {{t:check|xem bài}}", why: "Quá thận trọng: flop cao vẫn có lợi cho bạn, và một số tay (vd. có lá cơ cao) sẵn sàng cược nhỏ." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Trong {{t:pot|pot}} có {{n:ex.pot}}. Bạn cược {{n:cbet.ex.small}} mà không có tay bài nào. Đối thủ phải {{t:fold|bỏ bài}} trong bao nhiêu phần trăm số trường hợp để {{t:bet}} này hòa vốn? Hãy nhập một số."
    answer: alpha.cbet.small
    explanation: "Bạn mạo hiểm {{n:cbet.ex.small}} để thắng {{n:ex.pot}}. Ngưỡng là cược ÷ ({{t:pot}} + cược): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Đối thủ trượt flop thường xuyên hơn nhiều, vì vậy c-bet nhỏ hay có lãi đến thế."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Trong {{t:pot|pot}} có {{n:ex.pot}}. Bạn cược {{n:cbet.ex.big}} mà không có tay bài nào. Đối thủ phải {{t:fold|bỏ bài}} trong bao nhiêu phần trăm số trường hợp để {{t:bet}} này hòa vốn? Hãy nhập một số."
    answer: alpha.cbet.big
    explanation: "Bạn mạo hiểm {{n:cbet.ex.big}} để thắng {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Một {{t:bluff}} lớn phải thành công thường xuyên hơn nhiều so với một cú nhỏ ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Vì sao trên flop {{t:dry|khô}}, c-bet {{n:cbet.size.small}} {{t:pot|pot}} với tay không có cơ hội lại có lãi thường xuyên hơn c-bet {{n:cbet.size.big}} {{t:pot|pot}}?"
    options:
      - { text: "Vì {{t:bet}} nhỏ chỉ cần đối thủ bỏ bài trong {{n:alpha.cbet.small}} số trường hợp, còn cược lớn cần {{n:alpha.cbet.big}}", correct: true, why: "Đúng: trên flop {{t:dry|khô}}, những tay yếu nhất của đối thủ (không có {{t:pair|đôi}} và không có {{t:draw|bài chờ}}) {{t:fold|bỏ bài}} trước cả hai kích thước, nên {{t:bet}} nhỏ đạt cùng hiệu quả với chi phí thấp hơn." }
      - { text: "Vì {{t:bet}} nhỏ luôn khiến đối thủ {{t:fold}}", why: "Không: đối thủ {{t:call|theo}} {{t:bet}} nhỏ với bất kỳ {{t:pair|đôi}} nào. {{t:bet|Cược}} nhỏ đơn giản là rủi ro ít hơn, nên cần ít lần {{t:fold|bỏ bài}} hơn." }
      - { text: "Vì {{t:bet}} lớn luôn là sai lầm", why: "Không: trên flop {{t:wet|ướt}} và khi có {{t:nuts-advantage|lợi thế nuts}}, {{t:bet}} lớn đôi khi là tốt nhất. Tuy nhiên, trên flop {{t:dry|khô}} nó không mang lại gì để bù cho rủi ro lớn hơn." }
---
C-bet ({{t:bet}} tiếp tục) là {{t:bet}} ở flop của người chơi đã {{t:raise|tố}} sau cùng trước flop. Trong bài này bạn chơi {{t:in-position}}: bạn đã {{t:open|mở}} từ Button, {{t:big-blind}} đã {{t:call|theo}} và {{t:check|xem bài}} ở flop. {{t:pot|Pot}} ở flop là {{n:bb.pot-after.vs-btn}}. Có hai câu hỏi: cược thường xuyên đến đâu và lớn bao nhiêu.

## Flop {{t:dry|khô}} và cao: thường xuyên và nhỏ

Trên flop như [[Ks 7d 2c]], bạn có {{t:range-advantage|lợi thế dải bài}}, còn đối thủ gần như không có {{t:draw|bài chờ}}. Bạn cược thường xuyên và nhỏ, khoảng {{n:cbet.size.small}} {{t:pot|pot}}, tức khoảng {{n:cbet.btn.small}}. Một {{t:bet}} nhỏ là đủ để đối thủ {{t:fold|bỏ bài}} với các tay đã trượt, còn các {{t:pair|đôi}} kém hơn vẫn sẽ {{t:call|theo}}. Một {{t:bet}} lớn hơn khiến đối thủ {{t:fold|bỏ bài}} với gần như cùng những tay đó, nhưng rủi ro nhiều hơn.

C-bet nhỏ điển hình khoảng {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} {{t:pot|pot}}, còn c-bet lớn khoảng {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (tài liệu đào tạo); solver thường dùng {{n:cbet.size.small}} và {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, và trên một số flop còn dùng {{t:overbet}}, tức {{t:bet|cược}} lớn hơn toàn bộ {{t:pot|pot}} (kết quả solver đã công bố).

## Flop có nhiều {{t:draw|bài chờ}}: ít hơn, nhưng lớn hơn

Trên flop như [[Kh Jh 7c]], đối thủ có nhiều {{t:flush-draw|bài chờ thùng}} và chờ {{t:straight|sảnh}}, nhưng {{t:straight}} chưa thể có. Các tay mạnh và {{t:draw|bài chờ}} mạnh cược với kích thước lớn hơn, vd. {{n:cbet.size.big}} {{t:pot|pot}}, để {{t:draw|bài chờ}} phải trả đắt cho lá tiếp theo. Các tay trung bình không có {{t:draw|bài chờ}} {{t:check|xem bài}} thường xuyên hơn. Khi {{t:straight}} đã có thể có, vd. trên [[Jh Th 8c]], đối thủ có thể đang có nó, nên solver cược kích thước nhỏ hơn ở đó.

## Flop {{t:paired|có đôi}} và flop {{t:monotone}}

Trên flop {{t:paired|có đôi}}, vd. [[Qd Qs 6h]], bạn có {{t:range-advantage|lợi thế dải bài}}, và khó có {{t:draw}}, nên đối thủ không có {{t:pair|đôi}} hiếm khi có thể {{t:call|theo}}. Bạn cược thường xuyên và nhỏ: một {{t:bet}} lớn không đáng, vì ai trong hai bạn cũng có thể có {{t:three-of-a-kind|bộ ba}}. Trên flop {{t:monotone|đồng chất}}, vd. [[Kh 8h 3h]], ai cũng có thể đã có {{t:flush}}, nên bạn cược ít hơn bình thường và nhỏ.

Lưu ý: “{{t:wet}}” không có nghĩa là “cược lớn”. Trong ứng dụng, flop {{t:monotone|đồng chất}} luôn là {{t:wet}}, nhưng solver vẫn cược trên đó ít và với kích thước nhỏ (kết quả solver đã công bố). Kích thước tăng theo {{t:wetness|độ ướt}} chỉ đến một mức nhất định: trên những flop {{t:wet|ướt}} nhất, như [[Qd 8d 7d]], nó lại giảm. Kích thước lớn hơn ở phần trước áp dụng cho các flop có nhiều {{t:draw|bài chờ}} mà trên đó {{t:straight}} chưa thể có (trong ứng dụng thường thuộc mức trung gian).

## Flop thấp với các lá gần nhau: bạn {{t:check|xem bài}} thường xuyên hơn

Trên [[7s 6h 5d]], {{t:big-blind}} có {{t:straight|sảnh}} và {{t:two-pair|hai đôi}} trong {{t:range|range}}, còn bạn không có {{t:nuts-advantage|lợi thế nuts}} (bài học về lợi thế). Thường cũng tương tự trên các flop thấp {{t:connected|liên kết}} khác. Trên flop thấp {{t:semi-connected|bán liên kết}} thì chưa có {{t:straight|sảnh}}, nhưng flop vẫn trúng các tay có lá nhỏ mà {{t:big-blind}} bảo vệ rất nhiều, còn các lá cao của bạn đã trượt. Bạn c-bet ít hơn so với trên flop cao: nhiều tay {{t:check|xem bài}}, còn chủ yếu các tay rất mạnh và {{t:draw|bài chờ}} mạnh mới cược.

## Đối thủ phải {{t:fold|bỏ bài}} bao nhiêu

Một {{t:bet|cược}} không có tay bài hòa vốn khi đối thủ {{t:fold|bỏ bài}} trong cược ÷ ({{t:pot}} + cược) số trường hợp. Với {{n:cbet.size.small}} {{t:pot|pot}}, con số đó là {{n:alpha.cbet.small}}, với {{n:cbet.size.big}} {{t:pot|pot}} đã là {{n:alpha.cbet.big}}. Tay không có {{t:pair|đôi}} trượt flop trong khoảng {{n:flop.miss.unpaired}} số trường hợp, vì vậy c-bet nhỏ hay có lãi đến thế.

:::note Các quy tắc này từ đâu ra
Các hướng chung (flop {{t:dry}}: nhỏ và thường xuyên; nhiều {{t:draw|bài chờ}} mà chưa có {{t:straight|sảnh}} hoàn chỉnh: lớn hơn và ít hơn; {{t:straight}} đã có thể có: nhỏ hơn; {{t:paired}}: nhỏ; {{t:monotone}}: ít hơn và nhỏ) là các nguyên tắc chung từ tài liệu đào tạo và kết quả solver đã công bố, được đánh dấu là quy tắc kinh nghiệm. Các kích thước {{n:cbet.size.small}} và {{n:cbet.size.big}} {{t:pot|pot}} là ví dụ từ các khoảng nêu ở trên (tài liệu đào tạo về kích thước cược; kết quả solver đã công bố). Ứng dụng không đưa ra tần suất cược theo phần trăm, vì những con số như vậy đến từ kết quả solver.
:::
