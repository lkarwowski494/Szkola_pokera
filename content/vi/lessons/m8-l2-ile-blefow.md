---
id: m8.l2
module: m8
order: 2
title: "Bluff bao nhiêu"
sub: "Tỉ lệ bluff theo kích thước cược"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Trong {{t:pot|pot}} có {{n:ex.pot}}, bạn cược cả {{t:pot|pot}}: {{n:ex.bet.pot}}. {{t:range}} của bạn gồm các tay bài rất mạnh và {{t:bluff|bluff}}. Bao nhiêu phần trong các lần cược của bạn nên là {{t:bluff|bluff}} để đối thủ không thể lợi dụng bạn? Hãy nhập số phần trăm."
    answer: bluff.share.bet-pot
    explanation: "Tỉ lệ {{t:bluff|bluff}} = cược ÷ ({{t:pot}} + 2·cược) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Cứ ba lần cược thì có một lần là {{t:bluff}}: khi đó tay bài của đối thủ chỉ thắng được {{t:bluff|bluff}} sẽ không kiếm được gì, dù {{t:call|theo}} hay {{t:fold|bỏ bài}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Trong {{t:pot|pot}} có {{n:ex.pot}}, bạn cược nửa {{t:pot|pot}}: {{n:ex.bet.half}}. Ở trạng thái cân bằng, bao nhiêu phần trong các lần cược của bạn là {{t:bluff|bluff}}? Hãy nhập số phần trăm."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Cược nhỏ hơn cho đối thủ mức giá tốt hơn, nên số {{t:bluff|bluff}} ít hơn so với khi cược cả {{t:pot|pot}} ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Trong {{t:pot|pot}} có {{n:ex.pot}}, bạn cược {{n:ex.bet.three-quarters}}. Ở trạng thái cân bằng, bao nhiêu phần trong các lần cược của bạn là {{t:bluff|bluff}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. Đây chính là con số equity mà đối thủ cần để {{t:call|theo}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "Đó là alpha: một {{t:bluff}} đơn lẻ không có cơ hội phải thành công thường xuyên đến mức nào. Tỉ lệ {{t:bluff|bluff}} trong {{t:range|range}} được tính với cả hai lần cược ở mẫu số: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "Đó là {{t:mdf}}, tức đối thủ nên phòng thủ bao nhiêu. Tỉ lệ {{t:bluff|bluff}} của bạn là {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Trong {{t:pot|pot}} có {{n:ex.pot}}, bạn cược nhiều hơn {{t:pot|pot}}: {{n:ex.bet.overbet}}. Ở trạng thái cân bằng, bao nhiêu phần trong các lần cược của bạn là {{t:bluff|bluff}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. {{t:overbet|Overbet}}, tức một {{t:bet|cược}} lớn hơn cả {{t:pot|pot}}, cho đối thủ mức giá tệ nhất, nên bạn có thể có nhiều {{t:bluff|bluff}} nhất trong đó, nhưng vẫn ít hơn một nửa." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Đó là alpha cho kích thước này: đối thủ phải {{t:fold|bỏ bài}} thường xuyên đến mức nào để một {{t:bluff}} đơn lẻ có lời. Tỉ lệ {{t:bluff|bluff}} trong {{t:range|range}} là {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "Đó là tỉ lệ {{t:bluff|bluff}} khi cược cả {{t:pot|pot}}. Với mức cược {{n:ex.bet.overbet}}, số bluff nhiều hơn: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Với mức cược nào ở river, bạn có nhiều {{t:bluff|bluff}} hơn trong {{t:range|range}}: 1/3 {{t:pot|pot}} hay cả {{t:pot|pot}}?"
    options:
      - { text: "Khi cược cả {{t:pot|pot}}", correct: true, why: "Khi cược 1/3 {{t:pot|pot}}, {{t:bluff|bluff}} chiếm khoảng {{n:bluff.share.bet-third}} số lần cược; khi cược cả {{t:pot|pot}}, khoảng {{n:bluff.share.bet-pot}}. Cược lớn hơn cho đối thủ mức giá tệ hơn, nên lần {{t:call|theo}} của họ cần nhiều {{t:bluff|bluff}} hơn mới có lời." }
      - { text: "Khi cược 1/3 {{t:pot|pot}}", why: "Ngược lại. Cược nhỏ cho đối thủ mức giá tốt: để {{t:call|theo}}, họ chỉ cần khoảng {{n:bluff.share.bet-third}} {{t:bluff|bluff}} trong các lần cược của bạn. Nếu có nhiều {{t:bluff|bluff}} hơn, họ sẽ theo có lời." }
      - { text: "Như nhau", why: "Tỉ lệ {{t:bluff|bluff}} phụ thuộc vào kích thước: khoảng {{n:bluff.share.bet-third}} khi cược 1/3 {{t:pot|pot}}, khoảng {{n:bluff.share.bet-pot}} khi cược cả {{t:pot|pot}}." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Bạn cược cả {{t:pot|pot}} ở river. Alpha là {{n:alpha.bet-pot}}, còn tỉ lệ {{t:bluff|bluff}} là {{n:bluff.share.bet-pot}}. Mỗi con số cho bạn biết điều gì?"
    options:
      - { text: "Alpha: đối thủ phải {{t:fold|bỏ bài}} thường xuyên đến mức nào; tỉ lệ: bao nhiêu phần trong các lần cược là {{t:bluff|bluff}}", correct: true, why: "Alpha nói về một {{t:bluff}} đơn lẻ không có cơ hội: nó hòa vốn khi đối thủ {{t:fold|bỏ bài}} {{n:alpha.bet-pot}} số lần. Tỉ lệ {{t:bluff|bluff}} mô tả thành phần {{t:range|range}} của bạn: cứ ba lần cược thì một lần là {{t:bluff}}, để lần {{t:call|theo}} của đối thủ hòa vốn." }
      - { text: "Đó là hai tên gọi của cùng một thứ, một trong hai bị tính sai", why: "Cả hai đều được tính đúng: alpha = cược ÷ ({{t:pot}} + cược), tỉ lệ {{t:bluff|bluff}} = cược ÷ ({{t:pot}} + 2·cược). Chúng trả lời những câu hỏi khác nhau." }
      - { text: "Alpha: bạn có bao nhiêu {{t:bluff|bluff}} trong {{t:range|range}}; tỉ lệ: đối thủ {{t:fold|bỏ bài}} thường xuyên đến mức nào", why: "Ngược lại. Alpha là ngưỡng {{t:fold|bỏ bài}} của đối thủ đối với một {{t:bluff}} đơn lẻ, còn tỉ lệ {{t:bluff|bluff}} là thành phần {{t:range|range}} cược của bạn." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Vì sao tỉ lệ {{t:bluff|bluff}} trong các lần cược của bạn được tính bằng cùng công thức với equity mà đối thủ cần để {{t:call|theo}}?"
    options:
      - { text: "Vì tay bài bắt {{t:bluff|bluff}} của đối thủ thắng đúng vào những lúc bạn {{t:bluff|bluff}}", correct: true, why: "Tay bài của họ thua {{t:value|giá trị}} của bạn và thắng {{t:bluff|bluff}}, nên equity của nó chính là tỉ lệ {{t:bluff|bluff}}. Khi tỉ lệ này bằng equity cần thiết, lần {{t:call|theo}} hòa vốn và đối thủ không thể lợi dụng bạn, dù bằng cách theo hay bỏ bài." }
      - { text: "Đó là trùng hợp, các công thức chỉ trông giống nhau", why: "Đó không phải trùng hợp. Bạn chọn tỉ lệ {{t:bluff|bluff}} sao cho equity của tay bài bắt {{t:bluff|bluff}} bằng đúng mức giá của nó." }
      - { text: "Vì đối thủ luôn có đúng mức equity cần thiết", why: "Đối thủ có bao nhiêu equity là do các lần cược của bạn quyết định. Chính bạn chọn số {{t:bluff|bluff}} sao cho kết quả hòa vốn." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Bạn cược cả {{t:pot|pot}} ở river, nhưng {{t:bluff|bluff}} chiếm một nửa số lần cược của bạn chứ không phải {{n:bluff.share.bet-pot}}. Một đối thủ tinh ý có thể làm gì?"
    options:
      - { text: "{{t:call|Theo}} thường xuyên hơn, kể cả bằng những tay bài yếu bắt {{t:bluff|bluff}}", correct: true, why: "Lần {{t:call|theo}} của họ thắng một nửa số lần, trong khi chỉ cần {{n:eq.bet-pot}}. Trả tiền nhiều hơn, họ kiếm được từ {{t:bluff|bluff}} của bạn nhiều hơn số mất cho {{t:value|giá trị}}." }
      - { text: "{{t:fold|Bỏ bài}} thường xuyên hơn", why: "Bỏ bài là nhường {{t:pot|pot}} cho các {{t:bluff|bluff}} của bạn. Khi có quá nhiều {{t:bluff|bluff}}, đối thủ kiếm lời bằng cách {{t:call|theo}}." }
      - { text: "Không làm gì, tỉ lệ không quan trọng", why: "Có quan trọng: khi có quá nhiều {{t:bluff|bluff}}, mỗi lần {{t:call|theo}} bằng tay bài bắt {{t:bluff|bluff}} đều có lời cho đối thủ." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Ở river, bạn cược cả {{t:pot|pot}} gần như chỉ để {{t:value|lấy giá trị}}, gần như không có {{t:bluff|bluff}}. Một đối thủ tinh ý có thể làm gì?"
    options:
      - { text: "{{t:fold|Bỏ}} mọi tay bài chỉ thắng được {{t:bluff|bluff}}", correct: true, why: "Khi {{t:bluff|bluff}} ít hơn {{n:bluff.share.bet-pot}}, lần {{t:call|theo}} bằng tay bài bắt {{t:bluff|bluff}} sẽ lỗ. Khi đó đối thủ chỉ trả tiền bằng những tay bài tốt hơn, và các lần cược {{t:value|lấy giá trị}} của bạn ít được trả tiền hơn." }
      - { text: "{{t:call|Theo}} thường xuyên hơn", why: "Nếu {{t:call|theo}}, họ chủ yếu trả tiền cho {{t:value|giá trị}} của bạn. Khi {{t:range|range}} của bạn không có {{t:bluff|bluff}}, họ nên {{t:fold|bỏ bài}}." }
      - { text: "{{t:raise|Tố}} với mọi tay bài", why: "{{t:raise|Tố}} vào tay bài mạnh của bạn mà không có bài tốt hơn là chắc chắn lỗ. Đối thủ chỉ cần {{t:fold|bỏ bài}} thường xuyên hơn." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "Ở river, bạn cược cả {{t:pot|pot}} với một {{t:range|range}} gồm {{n:bluff.ex.range}} {{t:combo|combo}}: giá trị và {{t:bluff|bluff}}. Ở trạng thái cân bằng, bao nhiêu trong số đó là {{t:bluff|bluff}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|bluff}} và {{n:bluff.ex.value}} {{t:combo|combo}} {{t:value|lấy giá trị}}: một {{t:bluff}} cho mỗi hai tay bài {{t:value|lấy giá trị}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "Đó là kết quả nếu tính theo alpha ({{n:alpha.bet-pot}}). Alpha là ngưỡng {{t:fold|bỏ bài}} cho một {{t:bluff}} đơn lẻ, không phải tỉ lệ {{t:bluff|bluff}} trong {{t:range|range}}." }
      - { text: "{{n:bluff.ex.value}}", why: "Đó là số {{t:combo|combo}} {{t:value|lấy giá trị}}. Số {{t:bluff|bluff}} chỉ bằng một nửa: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "Ở river, bạn cần một vài {{t:bluff|bluff}} cho các lần cược cả {{t:pot|pot}}. Bạn chọn những tay bài nào?"
    options:
      - { text: "Những tay yếu nhất, ví dụ {{t:draw|draw}} {{t:straight|sảnh}} bị trượt hoặc bài cao không có cơ hội", correct: true, why: "Tay bài không có cơ hội ở showdown không mất gì khi {{t:bluff}} thất bại: sau khi {{t:check}} nó cũng sẽ thua. Vì vậy chính nó là tay đi {{t:bluff}}." }
      - { text: "Các {{t:pair|đôi}} trung bình", why: "Một {{t:pair|đôi}} trung bình thường thắng sau khi {{t:check}}. Khi bạn {{t:bluff}} bằng nó, các tay yếu hơn {{t:fold|bỏ bài}}, còn các tay mạnh hơn trả tiền: bạn đánh mất chiến thắng ở showdown." }
      - { text: "Tay nào cũng được, miễn là tỉ lệ đúng", why: "Tỉ lệ chưa phải là tất cả. {{t:bluff|Bluff}} bằng tay bài lẽ ra thắng ở showdown tốn kém hơn {{t:bluff}} bằng tay bài không có cơ hội." }
---
Trong bài học đầu tiên, bạn đã cược {{t:value|lấy giá trị}}. Nhưng nếu ở river bạn chỉ cược bằng tay bài mạnh, một đối thủ tinh ý sẽ bỏ mọi tay trừ những tay còn mạnh hơn, và các lần cược của bạn gần như không bao giờ được trả tiền. {{t:bluff|Bluff}} khiến việc trả tiền trở nên đáng giá với đối thủ.

## {{t:range|Range}} {{t:polarized}}

Ở river khi {{t:in-position}}, bạn thường cược bằng **{{t:range|range}} {{t:polarized|phân cực}}** (như trong M7): các tay bài rất mạnh {{t:value|lấy giá trị}} và {{t:bluff|bluff}}, không có tay bài trung bình (những tay này {{t:check}}, như trong bài học đầu tiên). Ở river, {{t:bluff|bluff}} là những tay bài không có cơ hội ở showdown. Khi đó đối thủ có nhiều tay bài thua {{t:value|giá trị}} của bạn nhưng thắng {{t:bluff|bluff}}. Đó là **bluff-catcher** (tay bài bắt {{t:bluff|bluff}}).

## Bao nhiêu {{t:bluff|bluff}}

Bạn chọn số {{t:bluff|bluff}} sao cho bluff-catcher của đối thủ hòa vốn, dù họ {{t:call|theo}} hay {{t:fold|bỏ bài}}:

```formula
tỉ lệ bluff = cược ÷ (pot + 2·cược)
```

Đây cũng chính là công thức equity cần để {{t:call|theo}} trong M2. Đó không phải trùng hợp: bluff-catcher thắng đúng vào những lúc bạn {{t:bluff}}, nên equity của nó chính là tỉ lệ {{t:bluff|bluff}} của bạn. Khi cược cả {{t:pot|pot}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, tức cứ ba lần cược thì một lần là {{t:bluff}}.

## Cược lớn hơn, nhiều {{t:bluff|bluff}} hơn

| Cược | Tỉ lệ {{t:bluff|bluff}} | Alpha (từ M6) |
|---|---|---|
| 1/3 {{t:pot|pot}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 {{t:pot|pot}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 {{t:pot|pot}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| Cả {{t:pot}} | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot|pot}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Cược lớn hơn cho đối thủ mức giá tệ hơn, nên bạn có thể có nhiều {{t:bluff|bluff}} hơn trong đó. Cược nhỏ chỉ chứa được vài bluff.

## Tỉ lệ {{t:bluff|bluff}} không phải là alpha

Alpha từ M6 = cược ÷ ({{t:pot}} + cược) cho biết đối thủ phải {{t:fold|bỏ bài}} thường xuyên đến mức nào để **một** {{t:bluff}} không có cơ hội hòa vốn. Tỉ lệ {{t:bluff|bluff}} = cược ÷ ({{t:pot}} + 2·cược) cho biết bao nhiêu phần trong **toàn bộ {{t:range|range}} cược** là {{t:bluff|bluff}}. Khi cược cả {{t:pot|pot}}, {{t:bluff}} cần hơn {{n:alpha.bet-pot}} lần {{t:fold|bỏ bài}}, còn trong {{t:range|range}} bạn có {{n:bluff.share.bet-pot}} {{t:bluff|bluff}}. Mẫu số thứ hai có thêm một lần cược vì bạn đang tính mức giá cho lần {{t:call|theo}} của đối thủ.

## {{t:bluff|Bluff}} bằng gì

Để {{t:bluff}}, bạn chọn **những tay bài yếu nhất**, ví dụ {{t:draw|draw}} {{t:straight|sảnh}} bị trượt hoặc bài cao không có cơ hội (về {{t:flush|thùng}} bị trượt, xem bài học về {{t:blocker|blocker}}): sau khi {{t:check}} chúng cũng sẽ thua, nên một {{t:bluff}} thất bại không lấy mất gì của chúng. Những tay bài có giá trị ở showdown thì {{t:check}}.

:::note Đây là điểm cân bằng, không phải công thức cho mọi đối thủ
Các tỉ lệ này bảo vệ bạn trước đối thủ chơi tốt. Với từng người chơi cụ thể, bạn có thể đi lệch khỏi chúng; điều này có trong mô-đun về {{t:exploit|khai thác}} ở microstakes (M10). Công thức tỉ lệ {{t:bluff|bluff}} là phép tính trong một mô hình đơn giản hóa: {{t:range}} {{t:polarized}} đấu với tay bài bắt {{t:bluff|bluff}} (mô hình đơn giản từ lý thuyết trò chơi). Lời khuyên {{t:bluff}} bằng những tay bài yếu nhất đến từ tài liệu đào tạo và các phân tích solver.
:::
