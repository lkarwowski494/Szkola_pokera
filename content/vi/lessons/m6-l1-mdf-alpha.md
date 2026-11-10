---
id: m6.l1
module: m6
order: 1
title: "MDF và alpha"
sub: "Cần bảo vệ bao nhiêu khi đối thủ cược"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. {{t:pot|Pot}} đang có {{n:ex.third.pot}}, đối thủ {{t:bet|cược}} {{n:ex.third.bet}}. Bạn phải bảo vệ ({{t:call|theo}} hoặc {{t:raise|tố}}) ít nhất bao nhiêu phần {{t:range|range}} để {{t:bluff|cú bluff}} không có cơ hội thắng của họ không tự động có lãi? Hãy nhập số phần trăm."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + cược) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. Đối thủ mạo hiểm {{n:ex.third.bet}} để thắng {{n:ex.third.pot}}, nên {{t:bluff|cú bluff}} của họ có lãi khi bạn {{t:fold|bỏ bài}} thường xuyên hơn {{n:alpha.bet-third}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. {{t:pot|Pot}} đang có {{n:ex.pot}}, đối thủ {{t:bet|cược}} cả {{t:pot|pot}}: {{n:ex.bet.pot}}. {{t:mdf}} là bao nhiêu? Hãy nhập số phần trăm."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Với mức cược bằng {{t:pot|pot}}, {{t:bluff|cú bluff}} mạo hiểm đúng bằng số có thể thắng, nên chỉ cần bạn {{t:fold|bỏ bài}} một nửa số lần là nó hòa vốn."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. {{t:pot|Pot}} đang có {{n:ex.pot}}, đối thủ {{t:bet|cược}} nửa {{t:pot|pot}}: {{n:ex.bet.half}}. {{t:mdf}} là bao nhiêu?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. Đó là phần {{t:range|range}} bạn bảo vệ để {{t:bluff|cú bluff}} không có cơ hội thắng không có lãi." }
      - { text: "{{n:alpha.bet-half}}", why: "Đó là alpha: {{t:bluff|cú bluff}} của đối thủ phải thành công thường xuyên đến mức nào. {{t:mdf}} là phần còn lại, tức {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "Đó là equity cần có để {{t:call|theo}} với một tay bài (từ M2). {{t:mdf}} cho biết bạn bảo vệ bao nhiêu phần trong toàn bộ {{t:range|range}}." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. {{t:pot|Pot}} đang có {{n:ex.pot}}, đối thủ {{t:bet|cược}} nhiều hơn {{t:pot|pot}}: {{n:ex.bet.overbet}}. {{t:mdf}} là bao nhiêu?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Mức cược càng lớn, phần {{t:range|range}} bạn phải bảo vệ càng nhỏ." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Đó là alpha: {{t:bluff|cú bluff}} {{n:ex.bet.overbet}} phải thành công thường xuyên chừng ấy. Bạn bảo vệ phần còn lại, tức {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "Đó là equity cần có để {{t:call|theo}}: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Con số khác, câu hỏi khác." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Bạn {{t:bluff}} với một tay bài không có cơ hội thắng: {{t:pot|pot}} đang có {{n:ex.pot}}, bạn {{t:bet|cược}} {{n:ex.bet.half}}. Đối thủ phải {{t:fold|bỏ bài}} thường xuyên đến mức nào để {{t:bluff|cú bluff}} hòa vốn? Hãy nhập số phần trăm."
    answer: alpha.bet-half
    explanation: "Alpha = cược ÷ ({{t:pot}} + cược) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Bạn mạo hiểm {{n:ex.bet.half}} để thắng {{n:ex.pot}}: khi đối thủ {{t:fold|bỏ bài}} thường xuyên hơn, {{t:bluff|cú bluff}} có lãi."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Bạn {{t:bluff}}: {{t:pot|pot}} đang có {{n:ex.pot}}, bạn {{t:bet|cược}} {{n:ex.bet.three-quarters}}. Đối thủ phải {{t:fold|bỏ bài}} thường xuyên đến mức nào để {{t:bluff|cú bluff}} có lãi?"
    options:
      - { text: "Thường xuyên hơn {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Đó là alpha cho mức cược 3/4 {{t:pot|pot}}." }
      - { text: "Thường xuyên hơn {{n:mdf.bet-three-quarters}}", why: "Đó là {{t:mdf}}, tức đối thủ nên bảo vệ bao nhiêu. Alpha là phần họ có thể {{t:fold|bỏ}} trước khi {{t:bluff|cú bluff}} của bạn bắt đầu có lãi: {{n:alpha.bet-three-quarters}}." }
      - { text: "Thường xuyên hơn {{n:eq.bet-three-quarters}}", why: "Đó là equity đối thủ cần để {{t:call|theo}}. Ngưỡng cho {{t:bluff|cú bluff}} được tính mà không có phần {{t:call|theo}} của họ ở mẫu số: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "{{t:pot|Pot}} đang có {{n:ex.pot}}. {{t:bluff|Cú bluff}} không có cơ hội thắng nào cần đối thủ {{t:fold|bỏ bài}} ít thường xuyên hơn: cú cược {{n:ex.bet.quarter}} hay cú cược {{n:ex.bet.pot}}?"
    options:
      - { text: "Cú {{n:ex.bet.quarter}}: chỉ cần đối thủ {{t:fold|bỏ bài}} hơn {{n:alpha.bet-quarter}}", correct: true, why: "{{t:bluff|Cú bluff}} nhỏ mạo hiểm ít: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. {{t:bluff|Cú bluff}} bằng cả {{t:pot|pot}} cần đối thủ {{t:fold|bỏ bài}} hơn {{n:alpha.bet-pot}}." }
      - { text: "Cú {{n:ex.bet.pot}}: chỉ cần đối thủ {{t:fold|bỏ bài}} hơn {{n:alpha.bet-quarter}}", why: "Ngược lại. Mức cược lớn hơn mạo hiểm nhiều hơn, nên đối thủ phải {{t:fold|bỏ bài}} thường xuyên hơn: với cả {{t:pot|pot}} là hơn {{n:alpha.bet-pot}}." }
      - { text: "Cả hai cần như nhau", why: "Alpha phụ thuộc vào kích cỡ cược: {{n:alpha.bet-quarter}} với {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} với {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, đối thủ {{t:bet|cược}} 1/3 {{t:pot|pot}}. {{t:mdf}} là {{n:mdf.bet-third}}, còn để {{t:call|theo}} bạn cần {{n:eq.bet-third}} equity. Làm sao dung hòa hai con số này?"
    options:
      - { text: "{{t:mdf}} áp dụng cho toàn bộ {{t:range|range}}, equity cho một tay bài", correct: true, why: "{{t:mdf}} cho biết bạn bảo vệ bao nhiêu phần trong tất cả các tay bài của mình để đối thủ không thể {{t:bluff}} với bất kỳ lá bài nào. Equity cần có cho biết {{t:call|theo}} với một tay bài cụ thể có lãi hay không trước những tay bài mà đối thủ thực sự dùng để {{t:bet|cược}}." }
      - { text: "Một trong hai bị tính sai", why: "Cả hai đều đúng: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} và {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Chúng trả lời các câu hỏi khác nhau." }
      - { text: "Bạn {{t:call|theo}} khi có ít nhất {{n:mdf.bet-third}} equity", why: "Nhầm lẫn khái niệm. Để {{t:call|theo}}, {{n:eq.bet-third}} equity là đủ. {{n:mdf.bet-third}} là một phần của {{t:range|range}}, không phải cơ hội thắng của một tay bài." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Bạn bảo vệ {{t:big-blind}}, Button {{t:bet|cược}} c-bet 1/3 {{t:pot|pot}}. {{t:mdf}} là {{n:mdf.bet-third}}. Bạn có phải bảo vệ nhiều tay bài đến vậy không?"
    table: { position: BB }
    options:
      - { text: "Không, bạn có thể bảo vệ ít hơn một chút", correct: true, why: "{{t:mdf}} giả định {{t:bluff|cú bluff}} hoàn toàn không có cơ hội thắng. Trên flop, các {{t:bluff|cú bluff}} của Button vẫn còn equity ({{t:draw|bài chờ}}, lá cao), còn bạn khi {{t:out-of-position|không có vị trí}} sẽ không hiện thực hóa hết equity của các tay bài yếu. Vì vậy bạn có thể bảo vệ ít hơn {{t:mdf}} một chút, nhưng không {{t:fold|bỏ bài}} hàng loạt trước một c-bet nhỏ." }
      - { text: "Có, nếu không Button có lãi với mọi tay bài", why: "Trên river thì đúng là vậy. Trên flop, Button không {{t:bluff}} với tay bài không có cơ hội thắng: ngay cả khi bạn {{t:call|theo}}, họ vẫn có thể trúng bài. {{t:mdf}} là điểm tham chiếu, không phải nghĩa vụ." }
      - { text: "Không, bạn bảo vệ nhiều hơn vì mới chỉ là flop", why: "Ngược lại. Các {{t:street|vòng cược}} sau có lợi cho người cược {{t:in-position|có vị trí}}, nên bạn bảo vệ ít hơn, không phải nhiều hơn." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Một người chơi mà qua nhiều ván trước bạn biết là hiếm khi {{t:bluff}}, trên river {{t:bet|cược}} cả {{t:pot|pot}}. Bạn có {{t:pair|đôi}} K với kicker yếu. Bạn làm gì?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Qua nhiều ván trước, bạn biết người chơi này hiếm khi {{t:bluff}}. Khi thiếu các {{t:bluff|cú bluff}}, {{t:pair|đôi}} của bạn chủ yếu trả tiền cho tay bài mạnh hơn (KQ, set). Trước người chơi như vậy, bạn {{t:fold|bỏ bài}} thường xuyên hơn mức {{t:mdf}} gợi ý." }
      - { text: "{{t:call|Theo}}, vì {{t:mdf}} bảo phải bảo vệ {{n:mdf.bet-pot}}", why: "{{t:mdf}} bảo vệ bạn trước người chơi {{t:bluff}} đủ thường xuyên. Người chơi này không làm vậy, nên bám theo {{t:mdf}} là dâng tiền cho họ." }
      - { text: "{{t:raise|Tố}} all-in", why: "Tay bài mạnh hơn sẽ trả tiền, tay yếu hơn sẽ {{t:fold|bỏ bài}}. {{t:pair|Đôi}} với kicker yếu không phải tay bài để {{t:raise|tố}}." }
---
Khi đối thủ {{t:bet|cược}}, bạn không chỉ hỏi “tay bài này có thể thắng không”. Bạn còn nhìn vào tất cả các tay bài bạn có thể có trong tình huống này, tức {{t:range|range}} của mình. Hai con số cho biết nên bảo vệ bao nhiêu trong số đó và {{t:bluff|cú bluff}} của đối thủ phải thành công thường xuyên đến mức nào.

## Alpha: {{t:bluff|cú bluff}} phải thành công thường xuyên đến mức nào

{{t:bluff|Cú bluff}} không có cơ hội thắng chỉ thắng khi đối thủ {{t:fold|bỏ bài}}. Bạn mạo hiểm mức cược để thắng {{t:pot|pot}}.

```formula
alpha = cược ÷ (pot + cược)
```

Ví dụ: {{t:pot|pot}} đang có {{n:ex.pot}}, bạn {{t:bet|cược}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Nếu đối thủ {{t:fold|bỏ bài}} thường xuyên hơn, {{t:bluff|cú bluff}} của bạn có lãi ngay cả khi bạn không có tay bài nào.

## {{t:mdf}}: bạn phải bảo vệ bao nhiêu

{{t:mdf}} (tần suất bảo vệ tối thiểu) là mặt còn lại của alpha. Nếu bạn bảo vệ ({{t:call|theo}} hoặc {{t:raise|tố}}) ít tay bài hơn, đối thủ sẽ có lãi khi {{t:bluff}} với bất kỳ lá bài nào.

```formula
MDF = pot ÷ (pot + cược)
```

Ví dụ trên river: {{t:pot|pot}} đang có {{n:ex.third.pot}}, đối thủ {{t:bet|cược}} {{n:ex.third.bet}}, tức 1/3 {{t:pot|pot}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Mức cược của đối thủ | {{t:mdf}} | Alpha | Equity cần có |
|---|---|---|---|
| 1/4 {{t:pot|pot}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 {{t:pot|pot}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|pot}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 {{t:pot|pot}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Cả {{t:pot|pot}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf}} không phải equity cần có

Equity cần có từ M2 áp dụng cho **một tay bài**: {{t:call|theo}} với nó có lãi hay không. {{t:mdf}} áp dụng cho **toàn bộ {{t:range|range}}**: bạn bảo vệ bao nhiêu phần trong đó. Trước mức cược 1/3 {{t:pot|pot}} trên river, {{t:mdf}} gợi ý bảo vệ khoảng {{n:mdf.bet-third}} số tay bài, còn từng lần {{t:call|theo}} riêng lẻ có lãi khi tay bài thắng ít nhất {{n:eq.bet-third}} số lần.

## Trên flop khi {{t:out-of-position|không có vị trí}}, bạn bảo vệ ít hơn

{{t:mdf}} giả định {{t:bluff|cú bluff}} của đối thủ hoàn toàn không có cơ hội thắng. Điều này gần đúng nhất trên river, nơi {{t:draw|bài chờ}} không còn cải thiện được nữa. Trên flop, các {{t:bluff|cú bluff}} vẫn còn equity: {{t:draw|bài chờ}} và lá cao có thể cải thiện. Thêm vào đó, khi {{t:out-of-position|không có vị trí}}, bạn sẽ không hiện thực hóa hết equity của các tay bài yếu. Vì vậy trên flop khi {{t:out-of-position|không có vị trí}}, bạn có thể bảo vệ ít hơn {{t:mdf}} (trên những flop bất lợi cho người bảo vệ thì ít hơn rõ rệt) và coi nó là điểm tham chiếu, không phải nghĩa vụ; tuy vậy, bạn không {{t:fold|bỏ bài}} hàng loạt trước các c-bet nhỏ. Trong một ví dụ trên turn, solver bảo vệ trung bình gần mức {{t:mdf}}.

:::note Khi đối thủ hiếm khi {{t:bluff}}
{{t:mdf}} bảo vệ bạn trước người chơi {{t:bluff}} đủ thường xuyên. Nếu qua quan sát bạn biết một người chơi cụ thể {{t:bluff}} bằng các mức cược lớn trên river quá ít, thì trước người đó bạn {{t:fold|bỏ bài}} thường xuyên hơn mức {{t:mdf}} gợi ý: {{t:call|theo}} với {{t:pair|đôi}} yếu hơn chủ yếu là trả tiền cho tay bài mạnh hơn. Đó là {{t:exploit|khai thác}}, không phải chiến lược áp dụng với mọi người (xem thêm ở mô-đun 10).
:::
