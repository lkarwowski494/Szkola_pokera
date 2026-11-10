---
id: m5.l4
module: m5
order: 4
title: "Không có vị trí và khi đấu nhiều đối thủ"
sub: "Khi nào nên xem bài thường xuyên hơn"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Bạn {{t:open|mở pot}} từ {{t:cutoff|CO}}, Button {{t:call|theo}}, hai blind {{t:fold|bỏ bài}}. Flop ở mức trung bình và {{t:connected}}. Bạn hành động trước. Kế hoạch nào đúng ở đây?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Xem bài}} thường xuyên hơn so với khi {{t:in-position}}", correct: true, why: "Đúng: Button {{t:call|theo}} khi có {{t:position|vị trí}}, nên họ có {{t:range}} mạnh, còn flop trung bình và {{t:connected}} trúng tốt các {{t:pair|đôi}} và {{t:connectors|bài liên tiếp}} của họ. Khi {{t:out-of-position|không có vị trí}}, bạn {{t:check|xem bài}} ở đây rất thường xuyên, kể cả với tay bài mạnh." }
      - { text: "C-bet thường xuyên và nhỏ, như khi ở Button", why: "Đó là kế hoạch khi {{t:in-position}} trên flop {{t:dry|khô}}, cao. Ở đây bạn không có {{t:position|vị trí}}, và flop không có lợi cho {{t:range|dải bài}} của bạn." }
      - { text: "C-bet với mọi tay bài để không mất {{t:initiative|thế chủ động}}", why: "{{t:initiative|Thế chủ động}} tự nó không giúp bạn thắng: {{t:range}} của Button ở đây mạnh, và sau mỗi {{t:bet|lần cược}}, bạn cũng hành động trước ở turn và river." }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Vì sao khi {{t:out-of-position}}, bạn c-bet ít hơn so với khi {{t:in-position}}?"
    options:
      - { text: "Vì đối thủ {{t:in-position}} thấy hành động của bạn ở mỗi {{t:street|vòng cược}}, và {{t:range}} của họ sau khi {{t:call|theo}} là mạnh", correct: true, why: "Đúng: người chơi {{t:call|theo}} khi có {{t:position|vị trí}} đã {{t:fold|bỏ}} các tay bài yếu, và thường {{t:raise|tố}} với các tay mạnh nhất. Họ còn lại các tay trung bình và khá, lại còn hành động sau cùng." }
      - { text: "Vì c-bet khi {{t:out-of-position}} bị cấm", why: "Không: luật cho phép cược từ mọi chỗ ngồi. Vấn đề là c-bet khi {{t:out-of-position}} ít khi sinh lời hơn." }
      - { text: "Vì khi {{t:out-of-position}}, bạn luôn có tay bài yếu hơn", why: "Không: tay bài của bạn không phụ thuộc vào {{t:position|vị trí}}. Điều thay đổi là bạn hiện thực hóa equity của nó dễ đến đâu." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Bạn {{t:open|mở pot}} từ {{t:cutoff|CO}}, Button {{t:call|theo}}, hai blind {{t:fold|bỏ bài}}. Bạn có {{t:top-pair|đôi cao nhất}} với kicker tốt nhất trên flop {{t:dry|khô}}. Bạn hành động trước. Bạn làm gì?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|Xem bài}} (để {{t:call|theo}} {{t:bet|cược}} của Button)", correct: true, why: "Đúng: Button {{t:call|theo}} khi có {{t:position|vị trí}}, nên {{t:range}} của họ mạnh, và trên flop này solver khi {{t:out-of-position}} {{t:check|xem bài}} với gần như toàn bộ {{t:range|dải bài}}, kể cả {{t:top-pair|đôi cao nhất}} với kicker tốt nhất. Sau khi {{t:check|xem bài}}, bạn {{t:call|theo}} {{t:bet|cược}} của Button." }
      - { text: "C-bet {{n:cbet.size.small}} {{t:pot}}", why: "Quá thường xuyên: trong tình huống này solver cược ít hơn {{n:cbet.oop.a94.bet}} số lần. Bạn chơi {{t:top-pair|đôi cao nhất}} với kicker tốt nhất bằng cách {{t:check|xem bài}} rồi {{t:call|theo}}." }
      - { text: "C-bet {{n:cbet.size.big}} {{t:pot}}", why: "Quá thường xuyên: trong tình huống này solver cược ít hơn {{n:cbet.oop.a94.bet}} số lần. Bạn chơi {{t:top-pair|đôi cao nhất}} với kicker tốt nhất bằng cách {{t:check|xem bài}} rồi {{t:call|theo}}." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Chưa ai {{t:bet|cược}}, nên {{t:fold}} chẳng được gì: bạn có thể {{t:check|xem bài}} miễn phí (quy tắc từ mô-đun 1). Bạn chơi tay bài này bằng cách {{t:check|xem bài}} rồi {{t:call|theo}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Bạn {{t:open|mở pot}} từ {{t:cutoff|CO}}, Button và {{t:big-blind}} {{t:call|theo}}. Trên flop, {{t:big-blind}} {{t:check|xem bài}}, còn Button hành động sau bạn. Bạn chỉ có bài cao, không có {{t:draw|bài chờ}}. Bạn làm gì?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "Đúng: khi đấu hai đối thủ, tay bài không có {{t:pair|đôi}} và không có {{t:draw|bài chờ}} hiếm khi thắng {{t:pot}} bằng một {{t:bet|lần cược}}. Nhiều khả năng hơn là một trong hai người đã trúng flop này." }
      - { text: "C-bet nhỏ, như khi đấu một đối một", why: "Khi đấu hai đối thủ, {{t:bluff|cú bluff}} phải vượt qua cả hai, và việc cả hai cùng trượt hiếm hơn nhiều so với chỉ một người." }
      - { text: "C-bet lớn để đẩy cả hai ra", why: "Một {{t:bluff|cú bluff}} lớn khi đấu hai đối thủ có rủi ro cao, còn khả năng cả hai {{t:fold|bỏ bài}} là nhỏ. Trên flop này họ có nhiều {{t:pair|đôi}} và {{t:draw|bài chờ}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Bạn {{t:open|mở pot}} từ {{t:cutoff|CO}}, Button và {{t:big-blind}} {{t:call|theo}}. {{t:big-blind|Big blind}} {{t:check|xem bài}}. Bạn có {{t:top-pair|đôi cao nhất}} với kicker tốt. Bạn làm gì?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "Đúng: trong {{t:pot}} nhiều người trên flop {{t:dry|khô}}, solver {{t:check|xem bài}} rất thường xuyên, kể cả với tay bài rất mạnh, vì hai người {{t:call|theo}} cộng lại thường đã trúng flop hơn." }
      - { text: "Cược {{t:value|lấy giá trị}}", why: "Khi đấu hai đối thủ trên flop {{t:dry|khô}}, solver {{t:check|xem bài}} kể cả với tay bài rất mạnh; bạn cược ít khi và nhỏ, chủ yếu khi flop trúng tốt {{t:range}} của bạn." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Không ai {{t:bet|cược}}, nên bạn có thể {{t:check|xem bài}} miễn phí. {{t:fold|Bỏ bài}} nghĩa là nhường lại {{t:pot}} mà có lẽ bạn đang dẫn trước." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Một tay bài không có {{t:pair|đôi}} trượt flop khoảng {{n:flop.miss.unpaired}} số lần. Hai tay bài như vậy (bốn hạng bài khác nhau) cùng trượt thường xuyên đến mức nào?"
    options:
      - { text: "Khoảng {{n:flop.miss.two}}", correct: true, why: "Đúng: bạn tính giống như với một tay bài, chỉ là có nhiều lá tạo đôi hơn: {{n:pair.outs.two-hands}} trong số {{n:cards.unseen.two-hands}} lá chưa biết (không tính bài của bạn). Khả năng không lá nào trong {{n:cards.board.flop}} lá flop nằm trong số đó là khoảng {{n:flop.miss.two}}: cả hai cùng trượt ít hơn một nửa số lần." }
      - { text: "Khoảng {{n:flop.miss.unpaired}}, giống như một tay bài", why: "Không: mỗi đối thủ thêm vào là thêm một khả năng có người đã trúng. Khả năng tất cả cùng trượt giảm dần theo mỗi người chơi." }
      - { text: "Khoảng {{n:flop.hit.unpaired}}", why: "Đó là khả năng một tay bài không có {{t:pair|đôi}} trúng {{t:pair|đôi}} trên flop. Câu hỏi là về việc cả hai cùng trượt." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Ôn tập khi {{t:in-position}}: bạn {{t:open|mở pot}} từ Button, {{t:big-blind}} {{t:call|theo}} và {{t:check|xem bài}} trên flop. Kế hoạch nào hợp với flop này?"
    position: BTN
    options:
      check: "{{t:check|Xem bài}} thường xuyên hơn, c-bet ít hơn bình thường"
      small: "C-bet thường xuyên và nhỏ: {{n:cbet.size.small}} {{t:pot}} ({{n:cbet.btn.small}})"
      big: "C-bet thường xuyên và lớn: {{n:cbet.size.big}} {{t:pot}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Quá thận trọng: trên flop {{t:dry|khô}}, cao, bạn có {{t:range-advantage|lợi thế dải bài}}, còn đối thủ thường đã trượt. Khi {{t:check|xem bài}}, bạn cho họ một lá bài miễn phí."
          small: "Đúng: flop {{t:dry}}, cao có lợi cho bạn. Một {{t:bet|lần cược}} nhỏ là đủ để đối thủ {{t:fold|bỏ}} các tay yếu, còn các {{t:pair|đôi}} yếu hơn vẫn sẽ {{t:call|theo}}."
          big: "Hành động đúng, kích thước sai: trên flop {{t:dry|khô}}, đối thủ có ít {{t:draw|bài chờ}}, và các tay đã trượt cũng sẽ {{t:fold|bỏ}} trước một {{t:bet|lần cược}} nhỏ. {{t:bet|Cược}} lớn hơn không khiến thêm tay nào {{t:fold|bỏ bài}}, mà lại rủi ro hơn. Hãy cược khoảng {{n:cbet.size.small}} {{t:pot}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Đúng: flop thấp với các lá gần nhau có lợi cho {{t:big-blind}}, người ở đây thường có {{t:two-pair|hai đôi}} hoặc {{t:straight|sảnh}} hơn. Bạn c-bet ít hơn so với trên flop cao: nhiều tay bài {{t:check|xem bài}}, còn cược chủ yếu là các tay mạnh và {{t:draw|bài chờ}} mạnh."
          small: "Quá thường xuyên: trên flop thấp với các lá gần nhau, chính {{t:big-blind}} có {{t:nuts-advantage|lợi thế nuts}}. C-bet thường xuyên, dù nhỏ, cho họ cơ hội {{t:raise|tố}} (check-raise) với các tay mạnh nhất."
          big: "Quá thường xuyên và quá đắt: {{t:big-blind}} ở đây thường trúng {{t:two-pair|hai đôi}} hoặc {{t:straight|sảnh}} hơn. C-bet lớn thường xuyên có rủi ro cao khi bản thân bạn thường chỉ có bài cao."
    count: 3
---
Cho đến giờ bạn đã chơi khi {{t:in-position}} với một đối thủ. Khi {{t:out-of-position|không có vị trí}} và khi đấu nhiều người chơi, bạn c-bet ít hơn.

## {{t:out-of-position|Không có vị trí}}

Khi bạn {{t:open|mở pot}} từ {{t:cutoff|CO}} và Button {{t:call|theo}}, sau flop bạn hành động trước ở mỗi {{t:street|vòng cược}}. Đồng thời {{t:range|dải bài}} của Button lại mạnh: họ đã {{t:fold|bỏ}} các tay yếu và {{t:raise|tố}} với một phần các tay mạnh nhất, nên còn lại các tay trung bình và khá. Một {{t:range|dải bài}} như vậy, không có các tay mạnh nhất và chủ yếu gồm các tay trung bình, là {{t:condensed|dải bài cô đặc}}. Vì thế khi {{t:out-of-position}}, bạn {{t:check|xem bài}} thường xuyên hơn nhiều, thường với toàn bộ {{t:range|dải bài}}, kể cả với tay bài mạnh: bạn sẽ chơi chúng bằng cách {{t:call|theo}} hoặc check-raise. Bạn cược chủ yếu trên những flop rất có lợi cho {{t:range|dải bài}} của bạn, ví dụ K-Q-6. {{t:check|Xem bài}} khi {{t:out-of-position}} không có nghĩa là từ bỏ tay bài: nhiều tay trong số đó sẽ {{t:call|theo}} {{t:bet|cược}} của đối thủ.

## Khi đấu nhiều đối thủ

Mỗi đối thủ thêm vào là thêm một khả năng có người đã trúng flop. Một tay bài không có {{t:pair|đôi}} trượt flop khoảng {{n:flop.miss.unpaired}} số lần, nhưng hai tay cùng trượt thì chỉ còn khoảng {{n:flop.miss.two}}. {{t:bluff|Cú bluff}} phải vượt qua tất cả mọi người, nên khi đấu nhiều đối thủ, bạn chủ yếu từ bỏ các {{t:bluff|cú bluff}}. Bạn cược ít khi và nhỏ, chủ yếu trên những flop trúng tốt {{t:range}} của bạn; trên flop {{t:dry|khô}}, bạn thường {{t:check|xem bài}} kể cả với tay bài rất mạnh.

:::note Nguồn gốc của các quy tắc này
Các quy tắc trong bài học này lấy từ kết quả solver đã công bố (c-bet khi {{t:out-of-position}}, c-bet trên flop có lá A và trong {{t:pot}} nhiều người) và từ tài liệu đào tạo ({{t:pot}} nhiều người). Đây là các quy tắc kinh nghiệm: ứng dụng không đưa ra tần suất bằng phần trăm. Khả năng hai tay bài cùng trượt là phép tính chính xác cho hai tay bài có bốn hạng bài khác nhau; phép tính này bỏ qua bài của bạn, giống như con số cho một tay bài.
:::
