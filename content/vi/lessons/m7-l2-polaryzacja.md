---
id: m7.l2
module: m7
order: 2
title: "Phân cực"
sub: "Cược lớn: bài mạnh và bán tháu cáy"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "{{t:range|Dải bài}} cược nào trên turn là {{t:polarized|phân cực}}?"
    options:
      - { text: "Set, {{t:two-pair|hai đôi}} và {{t:draw|bài chờ}}, không có {{t:pair|đôi}} trung bình", correct: true, why: "Đúng: {{t:range|dải bài}} {{t:polarized|phân cực}} có hai cực: bài rất mạnh và {{t:semi-bluff|bán tháu cáy}}. Phần giữa, tức bài trung bình, không có trong đó: những bài này {{t:check|check}}." }
      - { text: "{{t:top-pair|Đôi cao nhất}}, {{t:pair|đôi}} trung bình và {{t:pair|đôi}} yếu hơn", why: "Ở đây không có cực nào: thiếu bài rất mạnh và {{t:semi-bluff|bán tháu cáy}}, chỉ toàn {{t:pair|đôi}} từ cao xuống thấp. Điều này gần với {{t:range|dải bài}} {{t:linear|tuyến tính}} hơn, loại dải bài cược chủ yếu bằng bài có giá trị, thường với kích cỡ nhỏ, chứ không phải cược lớn trên turn." }
      - { text: "Chỉ toàn {{t:bluff|tháu cáy}}", why: "Đối thủ sẽ dễ nhận ra {{t:range|dải bài}} không có bài mạnh và sẽ {{t:call|theo}}. {{t:range|Dải bài}} {{t:polarized|phân cực}} kết hợp {{t:bluff|tháu cáy}} với bài rất mạnh." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Trên flop {{t:dry|khô}} [[Ks 7d 2c]], bạn đã cược nhỏ với gần như mọi bài: từ set đến {{t:pair|đôi}} yếu. {{t:range|Dải bài}} cược như vậy gọi là gì?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Tuyến tính}}", correct: true, why: "Đúng: bài mạnh và bài trung bình cùng cược, với kích cỡ nhỏ. Đây là kế hoạch từ M5 trên flop {{t:dry|khô}}, cao, nơi bạn có {{t:range-advantage|lợi thế dải bài}}." }
      - { text: "{{t:polarized|Phân cực}}", why: "{{t:range|Dải bài}} {{t:polarized|phân cực}} không có bài trung bình: chỉ bài rất mạnh và {{t:bluff|tháu cáy}} mới cược. Ở đây cả {{t:pair|đôi}} yếu cũng cược." }
      - { text: "Bị giới hạn", why: "{{t:range|Dải bài}} bị giới hạn là dải bài thiếu những bài mạnh nhất. Bạn đã cược cả với set." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Vì sao {{t:pair|đôi}} trung bình không hợp với cược lớn trên turn?"
    options:
      - { text: "Vì bài yếu hơn sẽ {{t:fold|bỏ bài}}, còn bài mạnh hơn sẽ trả tiền", correct: true, why: "Đúng: cược lớn với {{t:pair|đôi}} trung bình chỉ kiếm lời khi bài yếu hơn trả tiền, mà những bài đó thường {{t:fold|bỏ bài}} trước cược lớn. Còn lại là những lần {{t:call|theo}} từ các bài thắng bạn." }
      - { text: "Vì cược lớn luôn là {{t:bluff|tháu cáy}}", why: "Không: những bài mạnh nhất cũng {{t:bet|cược}} lớn. Vấn đề của {{t:pair|đôi}} trung bình là ai sẽ trả tiền cho nó." }
      - { text: "Vì {{t:pair|đôi}} trung bình không thể thắng", why: "Có thể: nó thắng {{t:bluff|tháu cáy}} và {{t:pair|đôi}} yếu hơn. Vì vậy nó {{t:check|check}} và đi đến showdown với giá rẻ." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "Bạn đã {{t:open|mở cược}} từ Button, {{t:big-blind|mù lớn}} {{t:call|theo}} c-bet trên flop. Turn là lá 2. {{t:pot|Pot}} có {{n:ex.pot}}, đối thủ {{t:check|check}}. Bạn có set. Bạn làm gì?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Cược {{n:ex.bet.three-quarters}}", correct: true, why: "Đúng: đối thủ có thể có {{t:draw|bài chờ}} {{t:flush|thùng}} (hai lá cơ) và {{t:straight|sảnh}} (vd. 65, T9). Trước cược 3/4 {{t:pot|pot}}, {{t:flush-draw|bài chờ thùng}} cần {{n:eq.bet-three-quarters}} equity, trong khi {{t:flush|thùng}} về trong khoảng {{n:odds.flush.turn-river}} trường hợp. Trước set của bạn, cơ hội còn thấp hơn: [[4h]] và [[2h]] cho bạn {{t:full-house|cù lũ}}, nên đối thủ chỉ còn {{n:outs.flush.vs-set}} out sạch, khoảng {{n:odds.flush.vs-set}}. Đối thủ trả giá quá đắt." }
      - { text: "Cược {{n:ex.bet.quarter}}", sizeError: true, why: "Hành động đúng, kích cỡ sai: trước cược 1/4 {{t:pot|pot}}, {{t:draw|bài chờ}} chỉ cần {{n:eq.bet-quarter}} equity, nên được giá tốt. Với bài rất mạnh trên {{t:board|bài chung}} có {{t:flush-draw|bài chờ thùng}}, bạn cược lớn." }
      - { text: "{{t:check|Check}}", why: "Lá bài miễn phí là món quà cho {{t:draw|bài chờ}}, và bạn không xây {{t:pot|pot}} trước river. Set trên {{t:board|bài chung}} có {{t:flush-draw|bài chờ thùng}} thì cược." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "Bạn đã {{t:open|mở cược}} từ Button, {{t:big-blind|mù lớn}} {{t:call|theo}} c-bet trên flop. Turn là lá 3. {{t:pot|Pot}} có {{n:ex.pot}}, đối thủ {{t:check|check}}. Bạn làm gì?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Cược {{n:ex.bet.three-quarters}}", correct: true, why: "Đúng: {{t:flush-draw|bài chờ thùng}} với hai lá cao là một {{t:semi-bluff|bán tháu cáy}} tốt. Bạn cược cùng kích cỡ lớn như với bài mạnh, nên đối thủ không phân biệt được {{t:bluff|tháu cáy}} với bài giá trị." }
      - { text: "Cược {{n:ex.bet.quarter}}", sizeError: true, why: "Hành động đúng, kích cỡ sai: cược rẻ như vậy đối thủ sẽ {{t:call|theo}} với bất kỳ {{t:pair|đôi}} nào, mà {{t:semi-bluff|bán tháu cáy}} kiếm lời chủ yếu nhờ những lần {{t:fold|bỏ bài}}. Nếu với bạn cược nhỏ nghĩa là {{t:draw|bài chờ}}, còn cược lớn nghĩa là bài mạnh, đối thủ sẽ dễ dàng khai thác điều đó." }
      - { text: "{{t:check|Check}}", correct: true, why: "Cũng tốt: bạn được xem river miễn phí và về {{t:flush|thùng}} trong {{n:odds.flush.turn-river}} trường hợp. Tuy vậy, cược thường tốt hơn, vì {{t:draw|bài chờ}} với lá cao là một trong những {{t:semi-bluff|bán tháu cáy}} tốt nhất, còn khi {{t:check|check}}, bạn từ bỏ cơ hội thắng {{t:pot|pot}} ngay lập tức." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "Bạn đã {{t:open|mở cược}} từ Button, {{t:big-blind|mù lớn}} {{t:call|theo}} c-bet trên flop. Turn là lá 5. {{t:pot|Pot}} có {{n:ex.pot}}, đối thủ {{t:check|check}}. Bạn làm gì?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "{{t:top-pair|Đôi cao nhất}} với kicker yếu là bài trung bình. Trước cược lớn, người trả tiền chủ yếu là các lá K tốt hơn (AK, KQ, KJ), còn bài yếu hơn sẽ {{t:fold|bỏ bài}}. Khi {{t:check|check}}, bạn đi đến showdown với giá rẻ." }
      - { text: "Cược {{n:ex.bet.three-quarters}}", why: "Cược lớn phù hợp với {{t:range|dải bài}} {{t:polarized|phân cực}}. Với bài này, bạn kiếm tiền chủ yếu từ những bài thắng bạn." }
      - { text: "Cược {{n:ex.bet.pot}}", why: "{{t:pot|Pot}} còn lớn hơn nữa với bài sức mạnh trung bình: bài yếu hơn gần như luôn {{t:fold|bỏ bài}}, còn bài mạnh hơn sẽ trả tiền." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. {{t:pot|Pot}} có {{n:ex.pot}}, bạn cược {{n:ex.bet.three-quarters}} với bài rất mạnh. Đối thủ có {{t:draw|bài chờ}} cần bao nhiêu phần trăm equity để {{t:call|theo}}? Hãy nhập một số."
    answer: eq.bet-three-quarters
    explanation: "Đối thủ bỏ thêm {{n:ex.bet.three-quarters}} vào {{t:pot|pot}}, mà sau khi {{t:call|theo}} sẽ có {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. {{t:flush-draw|Bài chờ thùng}} trên turn có khoảng {{n:odds.flush.turn-river}}, nên đối thủ trả giá quá đắt."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Bạn có set và chỉ cược {{n:ex.bet.quarter}} vào {{t:pot|pot}} {{n:ex.pot}}. Đối thủ có {{t:flush-draw|bài chờ thùng}} (khoảng {{n:odds.flush.turn-river}} đến river). Điều này dẫn đến gì?"
    options:
      - { text: "Đối thủ được giá tốt: chỉ cần {{n:eq.bet-quarter}}", correct: true, why: "Đúng: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, ít hơn {{n:odds.flush.turn-river}} của đối thủ. {{t:call|Theo}} có lợi cho đối thủ, còn cược nhỏ khiến bạn mất đi một phần giá trị." }
      - { text: "Đối thủ phải {{t:fold|bỏ bài}}, vì cần {{n:eq.bet-three-quarters}}", why: "Đó là mức cần khi gặp cược 3/4 {{t:pot|pot}}. Với cược 1/4 {{t:pot|pot}}, chỉ cần {{n:eq.bet-quarter}} là đủ." }
      - { text: "Giá không quan trọng, vì đằng nào bạn cũng đang thắng", why: "Lúc này bạn đang thắng, nhưng trong khoảng {{n:odds.flush.turn-river}} trường hợp đối thủ sẽ thắng ở river. Kích cỡ cược quyết định đối thủ trả quá nhiều hay quá ít cho cơ hội đó." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Trên turn, đối thủ có {{t:oesd|bài chờ sảnh hai đầu}}: khoảng {{n:odds.oesd.turn-river}} đến river. Từ mức cược nào của bạn thì đối thủ trả giá quá đắt (chỉ tính pot odds)?"
    options:
      - { text: "Ngay từ 1/3 {{t:pot|pot}}: cần {{n:eq.bet-third}}", correct: true, why: "Đúng: {{n:eq.bet-third}} lớn hơn {{n:odds.oesd.turn-river}}. Trên turn, {{t:draw|bài chờ}} chỉ còn một lá, nên ngay cả cược trung bình cũng cho chúng giá tệ." }
      - { text: "Chỉ từ cả {{t:pot|pot}}: cần {{n:eq.bet-pot}}", why: "Với cược cả {{t:pot|pot}}, đối thủ trả quá đắt nhiều, nhưng ngay ở 1/3 {{t:pot|pot}} đã cần {{n:eq.bet-third}}, nhiều hơn {{n:odds.oesd.turn-river}} của mình." }
      - { text: "Không bao giờ, {{t:draw|bài chờ}} luôn có thể {{t:call|theo}}", why: "{{t:draw|Bài chờ}} chỉ {{t:call|theo}} khi có giá tốt hoặc có implied odds (bài học tiếp theo). Trên turn, nó có khoảng {{n:odds.oesd.turn-river}}, nên phần lớn mức cược là giá tệ đối với nó." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. {{t:pot|Pot}} có {{n:ex.pot}}, bạn cược cả {{t:pot|pot}}: {{n:ex.bet.pot}}. Đối thủ cần bao nhiêu phần trăm equity để {{t:call|theo}}? Hãy nhập một số."
    answer: eq.bet-pot
    explanation: "Đối thủ bỏ thêm {{n:ex.bet.pot}} vào {{t:pot|pot}}, mà sau khi {{t:call|theo}} sẽ có {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Cả bài chờ {{t:flush|thùng}} (khoảng {{n:odds.flush.turn-river}}) lẫn bài chờ {{t:straight|sảnh}} hai đầu (khoảng {{n:odds.oesd.turn-river}}) đều không có cơ hội như vậy."
---
Trên flop, bạn thường cược nhỏ với gần như toàn bộ {{t:range|dải bài}}. Trên turn, {{t:range|dải bài}} cược thay đổi: trong đó còn lại bài rất mạnh và {{t:semi-bluff|bán tháu cáy}}, còn bài trung bình thì {{t:check|check}}. {{t:range|Dải bài}} như vậy được gọi là {{t:polarized|phân cực}}.

## Hai loại {{t:range|dải bài}}

- **{{t:linear|Tuyến tính}}:** bạn cược từ bài mạnh nhất trở xuống, kể cả bài trung bình. Thường với kích cỡ nhỏ, vd. c-bet {{n:cbet.size.small}} {{t:pot|pot}} trên [[Ks 7d 2c]].
- **{{t:polarized|Phân cực}}:** hai cực cùng cược: bài rất mạnh (set, {{t:two-pair|hai đôi}}, {{t:straight|sảnh}}, thùng) và {{t:semi-bluff|bán tháu cáy}} ({{t:draw|bài chờ}}). Trong đó không có bài trung bình.

Nói chung, {{t:range|dải bài}} {{t:polarized|phân cực}} gồm bài rất mạnh và {{t:bluff|tháu cáy}}. Trên turn, {{t:bluff|tháu cáy}} thường là {{t:semi-bluff|bán tháu cáy}}, còn trên river (M8) là những bài không có cơ hội khi showdown.

## Vì sao bạn phân cực trên turn

Đối thủ đã {{t:call|theo}} trên flop, nên thường có {{t:pair|đôi}} hoặc {{t:draw|bài chờ}}, đôi khi là lá cao kèm backdoor (M6). Bài trung bình không được gì từ cược thứ hai: bài yếu hơn {{t:fold|bỏ bài}}, còn bài mạnh hơn trả tiền. Bài mạnh muốn xây {{t:pot|pot}} trước river, còn {{t:semi-bluff|bán tháu cáy}} cần đối thủ {{t:fold|bỏ bài}} và vẫn có out khi bị {{t:call|theo}}.

## {{t:range|Dải bài}} {{t:polarized|phân cực}}, cược lớn

{{t:range|Dải bài}} {{t:polarized|phân cực}} cược lớn, vd. 3/4 {{t:pot|pot}}. Bài mạnh lấy được nhiều {{t:chips|chip}} hơn, còn {{t:semi-bluff|bán tháu cáy}} thắng ngay thường xuyên hơn. Bài trung bình {{t:check|check}}. Khi {{t:bluff|tháu cáy}} và bài mạnh cược cùng một kích cỡ, đối thủ không biết bạn có gì.

## Giá cho {{t:draw|bài chờ}}

Trên turn, {{t:draw|bài chờ}} chỉ còn một lá. Cược lớn buộc nó trả giá quá đắt:

| Cược của bạn | Đối thủ cần | {{t:flush|Thùng}} có | {{t:straight|Sảnh}} hai đầu có |
|---|---|---|---|
| 1/4 {{t:pot|pot}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 {{t:pot|pot}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 {{t:pot|pot}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 {{t:pot|pot}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| Cả {{t:pot|pot}} | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Với cược 1/4 {{t:pot|pot}}, {{t:flush-draw|bài chờ thùng}} được giá tốt. Ở 1/3 {{t:pot|pot}}, giá gần bằng cơ hội về {{t:flush|thùng}} ({{n:eq.bet-third}} so với {{n:odds.flush.turn-river}}), còn từ 1/2 {{t:pot|pot}} trở lên, {{t:flush|thùng}} trả giá quá đắt rõ rệt, trừ khi trông vào implied odds (bài học tiếp theo). Các bài tập về {{t:draw|bài chờ}} trong bài học này chỉ tính pot odds.

:::note Nguồn gốc của các nguyên tắc này
Các khái niệm {{t:range|dải bài}} {{t:polarized|phân cực}} và {{t:linear|tuyến tính}} cùng nguyên tắc “{{t:range|dải bài}} {{t:polarized|phân cực}} cược lớn, bài trung bình {{t:check|check}}” đến từ tài liệu đào tạo và ở đây là một quy tắc kinh nghiệm; lời khuyên cược lớn với bài mạnh nhưng dễ bị vượt cũng vậy. Solver trên turn cũng dùng các kích cỡ nhỏ. Kích cỡ 3/4 {{t:pot|pot}} là ví dụ để luyện tập, không phải kích cỡ tốt duy nhất. Giá trong bảng là kết quả tính toán chính xác của ứng dụng.
:::
