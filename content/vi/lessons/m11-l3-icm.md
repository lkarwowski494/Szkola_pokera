---
id: m11.l3
module: m11
order: 3
title: "ICM và bubble factor"
sub: "Chip không phải là tiền"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Còn ba người chơi, hai vị trí được trả thưởng. Stack: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} và {{n:m11.icm.a.s3}} {{t:chips|chip}}. Theo {{t:icm}}, cơ hội về nhất của stack ngắn nhất là bao nhiêu? Hãy nhập số phần trăm."
    answer: m11.icm.a.chips3
    explanation: "Cơ hội về nhất = stack ÷ tổng số {{t:chips}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Vẫn các stack đó ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). Stack lớn đã về nhất. Giờ cơ hội về nhì của stack ngắn nhất là bao nhiêu?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Còn hai người chơi với {{n:m11.icm.a.rest1}} {{t:chips|chip}}, trong đó stack ngắn có {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "Đây là cơ hội về nhất, tính trên tất cả {{t:chips|chip}}. Khi người thắng đã ra khỏi phép tính, bạn chỉ chia cho số {{t:chips}} của những người còn lại: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "Đây là tổng cơ hội về nhì của {{t:short-stack|short stack}}, tính qua cả hai người có thể vô địch. Câu hỏi nói về trường hợp stack lớn đã thắng." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Tiền thưởng}}: {{n:m11.icm.a.p1}} {{t:prize-pool|tổng giải thưởng}} cho hạng 1 và {{n:m11.icm.a.p2}} cho hạng 2. Stack {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Theo {{t:icm}}, stack ngắn nhất đáng giá bao nhiêu (tính theo phần trăm {{t:prize-pool|tổng giải thưởng}})? Hãy nhập số."
    answer: m11.icm.a.eq3
    explanation: "Cơ hội về nhất {{n:m11.icm.a.chips3}}, về nhì {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, lớn hơn phần {{n:m11.icm.a.chips3}} {{t:chips|chip}} của nó."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "Stack lớn nắm {{n:m11.icm.a.chips1}} số {{t:chips|chip}} trong cuộc chơi. Theo {{t:icm}}, nó đáng giá bao nhiêu tiền?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, tức là ít hơn tỷ lệ {{t:chips|chip}}", correct: true, why: "Stack lớn chỉ có thể thắng tối đa {{n:m11.icm.a.p1}} {{t:prize-pool|tổng giải thưởng}}, dù có cơ hội giành tất cả {{t:chips}}. Vì vậy {{t:chips}} của người dẫn đầu đáng giá ít hơn tỷ lệ của chúng, còn của {{t:short-stack|short stack}} thì nhiều hơn ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, bằng tỷ lệ {{t:chips|chip}}", why: "Điều đó chỉ đúng nếu người vô địch lấy toàn bộ {{t:prize-pool|tổng giải thưởng}}. Với {{t:payout|tiền thưởng}} {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}}, mỗi {{t:chips|chip}} của stack lớn đáng giá ít hơn: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, vì gần như chắc chắn sẽ thắng", why: "Nó chỉ có {{n:m11.icm.a.chips1}} cơ hội về nhất, phần còn lại của {{t:tournament-equity|equity giải đấu}} đến từ hạng 2. Tổng cộng {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bubble}}: bốn người chơi, ba vị trí được trả thưởng. Khi {{t:call|theo}} all-in, nếu thua bạn mất {{n:m11.bf.loss}} {{t:prize-pool|tổng giải thưởng}}, còn nếu thắng bạn được thêm {{n:m11.bf.gain}}. Bubble factor bằng bao nhiêu? Hãy nhập số có hai chữ số thập phân."
    answer: m11.bf.value
    explanation: "Bubble factor = phần mất ÷ phần được = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Thua gây thiệt hại gần gấp rưỡi so với lợi ích khi thắng."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Bubble factor là {{n:m11.bf.value}}. Bạn cần bao nhiêu equity để {{t:call}} all-in có lời? Hãy nhập số phần trăm."
    answer: m11.bf.req
    explanation: "Equity cần thiết = BF ÷ (BF + 1), tức là phần mất ÷ (phần mất + phần được) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. Nếu chỉ xét {{t:chips}}, chỉ cần {{n:m11.bf.req-chips}}."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Nếu chỉ xét {{t:chips}}, để {{t:call|theo}} all-in này chỉ cần {{n:m11.bf.req-chips}} equity, nhưng theo {{t:icm}} bạn cần {{n:m11.bf.req}}. Phần chênh lệch gọi là gì?"
    options:
      - { text: "{{t:risk-premium|Risk premium}} ({{n:m11.bf.premium}})", correct: true, why: "{{t:risk-premium|Risk premium}} là phần equity bổ sung mà {{t:icm}} đòi hỏi trên mức giá tính bằng {{t:chips|chip}}: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "Bubble factor là tỷ lệ giữa phần mất và phần được ({{n:m11.bf.value}}). Từ nó bạn tính equity cần thiết, còn phần chênh lệch so với khi chỉ xét {{t:chips}} là {{t:risk-premium}}." }
      - { text: "Fold equity", why: "Fold equity là lợi nhuận từ việc đối thủ {{t:fold|bỏ bài}}. Khi {{t:call|theo}} all-in, bạn không có nó." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bubble}}, ví dụ trong bài. Tay bài của bạn có khoảng {{n:m11.bf.example-eq}} equity trước {{t:range|range}} all-in của đối thủ. Nếu chỉ xét {{t:chips}}, {{t:call}} sẽ có lời vì chỉ cần {{n:m11.bf.req-chips}}. Ở đây bạn làm gì?"
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Theo {{t:icm}}, ở đây bạn cần {{n:m11.bf.req}} equity. Tay bài thắng ít hơn mức đó sẽ mất tiền, dù tính bằng {{t:chips|chip}} thì có lời." }
      - { text: "{{t:call|Theo}}, vì tính bằng {{t:chips|chip}} là có lời", why: "Trong {{t:tournament|giải đấu}} có {{t:payout|tiền thưởng}}, điều quan trọng là tiền, không phải {{t:chips}}. Thua khiến bạn mất {{n:m11.bf.loss}} {{t:prize-pool|tổng giải thưởng}}, còn thắng chỉ mang lại {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Theo}}, vì tôi thắng hơn một nửa số lần", why: "Tay bài có {{n:m11.bf.example-eq}} thắng hơn một nửa số lần, nhưng ở đây vẫn quá yếu: ngưỡng là {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Bubble}} của {{t:tournament|giải đấu}}. Bạn có stack lớn nhất bàn và {{t:cover|cover}} tất cả mọi người. Stack trung bình rất thường bỏ bài khi đối đầu với bạn. Điều này dẫn đến gì?"
    options:
      - { text: "Bạn có thể {{t:shove|push}} rộng hơn, vì đối thủ {{t:call|theo}} chặt", correct: true, why: "Khi {{t:call|theo}}, stack trung bình có nguy cơ bị loại ngay trước vùng thưởng, nên cần nhiều equity. Còn bạn, nếu thua chỉ mất một phần stack. Đối thủ {{t:call|theo}} chặt, nên bạn thường xuyên ăn {{t:pot|pot}} hơn mà không phải đấu." }
      - { text: "Bạn chơi chặt hơn để không mất vị trí dẫn đầu", why: "Người dẫn đầu chịu rủi ro thấp nhất bàn. Chơi chặt là từ bỏ lợi thế chính của họ: áp lực lên các stack trung bình." }
      - { text: "Không có gì, vì {{t:icm}} chỉ áp dụng cho {{t:short-stack|short stack}}", why: "{{t:icm}} áp dụng cho mọi người: nó thay đổi lượng equity mỗi người cần để {{t:call|theo}}, và điều đó phụ thuộc vào toàn bộ phân bố stack." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "Mô hình {{t:icm}} giả định điều gì?"
    options:
      - { text: "Rằng mọi người chơi giỏi như nhau, và chỉ stack quyết định thứ hạng", correct: true, why: "{{t:icm}} chỉ quy đổi stack thành cơ hội đạt từng thứ hạng. Nó không biết đến {{t:position|vị trí}}, blind tăng dần hay lợi thế kỹ năng." }
      - { text: "Rằng người chơi giỏi hơn thắng thường xuyên hơn", why: "Ngược lại: {{t:icm}} giả định kỹ năng ngang nhau. Nó hoàn toàn không tính đến lợi thế của người chơi." }
      - { text: "Rằng người chơi ở {{t:big-blind|big blind}} có ít cơ hội hơn", why: "{{t:icm}} không biết đến {{t:position|vị trí}} hay blind: nó chỉ nhìn vào stack. Đó là một trong những hạn chế của nó." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
Khi chơi bằng tiền (cash), một {{t:chips|chip}} chính là tiền: chip thắng được và chip thua mất có giá trị như nhau. Trong {{t:tournament|giải đấu}} thì không như vậy. Giải thưởng dành cho vài hạng đầu, và người vô địch không lấy toàn bộ {{t:prize-pool|tổng giải thưởng}}, dù lấy hết {{t:chips}}. Vì vậy cần quy đổi {{t:chips}} ra tiền.

## {{t:icm}}: stack quy ra tiền

Mô hình {{t:chips|chip}} độc lập ({{t:icm}}) quy đổi stack thành cơ hội đạt từng thứ hạng. Mô hình giả định mọi người chơi giỏi như nhau, nên chỉ stack quyết định thứ tự.

```formula
cơ hội về nhất = stack của bạn ÷ tổng số chip
```

Cơ hội về nhì tính tương tự, nhưng riêng cho từng người có thể vô địch: trừ {{t:chips}} của người đó và chia cho phần còn lại. {{t:tournament-equity|Equity giải đấu}} của một stack, tức phần {{t:prize-pool|tổng giải thưởng}} kỳ vọng của nó, là tổng: cơ hội đạt hạng × {{t:payout}} cho hạng đó.

## Ví dụ: ba người chơi ở {{t:bubble|bubble}}

Hai vị trí được trả thưởng: {{n:m11.icm.a.p1}} và {{n:m11.icm.a.p2}} {{t:prize-pool|tổng giải thưởng}}. Stack: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} và {{n:m11.icm.a.s3}} {{t:chips|chip}}.

- {{t:short-stack|Short stack}} vô địch {{t:tournament}} với cơ hội {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Về nhì: nếu stack lớn thắng ({{n:m11.icm.a.chips1}}), stack ngắn về nhì với cơ hội {{n:m11.icm.a.second3.via1}}; nếu stack trung bình thắng ({{n:m11.icm.a.chips2}}), với cơ hội {{n:m11.icm.a.second3.via2}}. Tổng cộng {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (các thành phần đã được làm tròn).
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** {{t:prize-pool|tổng giải thưởng}}.

| Stack | Tỷ lệ {{t:chips|chip}} | Equity theo {{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

{{t:short-stack|Short stack}} đáng giá hơn số {{t:chips}} của nó, còn stack lớn thì kém hơn: người dẫn đầu không thể nhận nhiều hơn giải thưởng hạng nhất.

## Bubble factor: thua đau hơn

Bốn người chơi, ba vị trí được trả thưởng: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} và {{n:m11.bf.p3}}. Stack {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (bạn), {{n:m11.bf.s3}} và {{n:m11.bf.s4}}. Người chơi có {{n:m11.bf.s3}} all-in, bạn {{t:cover|cover}} người đó, tức là bạn có nhiều {{t:chips|chip}} hơn. Để đơn giản, ta bỏ qua blind trong {{t:pot|pot}}.

- Hiện tại stack của bạn đáng giá {{n:m11.bf.eq.now}} {{t:prize-pool|tổng giải thưởng}}.
- Nếu thắng: bạn có {{n:m11.bf.win}}, đối thủ bị loại, mọi người đều vào vùng thưởng. Equity của bạn tăng lên {{n:m11.bf.eq.win}}, tức thêm **{{n:m11.bf.gain}}**.
- Nếu thua: bạn còn {{n:m11.bf.lose}}, và equity giảm xuống {{n:m11.bf.eq.lose}}, tức mất **{{n:m11.bf.loss}}**.

```formula
bubble factor = phần mất khi thua ÷ phần được khi thắng
```

Ở đây {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. Ứng dụng dùng định nghĩa này (phần mất ÷ phần được): nếu chỉ xét {{t:chips}}, khi phần mất bằng phần được, bubble factor bằng một. Một số bảng push/fold tính bubble factor theo cách khác, trên thang đo khác, nên đừng so sánh trực tiếp số liệu của chúng với các số ở đây. Từ bubble factor suy ra equity cần thiết:

```formula
equity cần thiết = BF ÷ (BF + 1)
```

Kết quả là **{{n:m11.bf.req}}**. Nếu chỉ xét {{t:chips}}, bạn mạo hiểm {{n:m11.bf.s3}} để thắng {{n:m11.bf.s3}}, nên chỉ cần {{n:m11.bf.req-chips}}. Phần chênh lệch, {{n:m11.bf.premium}}, là **{{t:risk-premium}}**.

Cùng xu hướng đó thể hiện trong một trạng thái cân bằng đã được công bố cho ba người chơi có stack bằng nhau (một công trình nghiên cứu năm 2008): khi Button và {{t:small-blind}} đã all-in, {{t:big-blind}} {{t:call|theo}} với {{n:m11.jamfold3.overcall.single}} số tay bài nếu chỉ là một ván đơn lẻ, còn trong {{t:tournament|giải đấu}} có {{t:payout|tiền thưởng}} thì chỉ {{n:m11.jamfold3.overcall.tourn}}, tức là chỉ những {{t:pocket-pair|pocket pair}} cao nhất và AKs.

:::note Ai {{t:call|theo}} chặt
Stack trung bình ở {{t:bubble|bubble}} hoặc tại {{t:final-table|bàn chung kết}} (bàn cuối cùng của {{t:tournament|giải đấu}}, nơi tranh các giải thưởng cao nhất) {{t:call|theo}} all-in chặt hơn nhiều so với khi chỉ xét {{t:chips}}. Stack lớn {{t:cover|cover}} các đối thủ thì rủi ro thấp hơn và có thể tận dụng điều này: {{t:shove|push}} rộng hơn, vì đối thủ buộc phải {{t:fold|bỏ bài}}. Bubble factor phụ thuộc vào tất cả các stack trên bàn, nên không tính nó ngay tại bàn mà hãy luyện qua các ví dụ để hình thành cảm giác.
:::

## Hạn chế của {{t:icm}}

{{t:icm}} không tính đến {{t:position|vị trí}}, blind tăng dần hay kỹ năng người chơi. Đây là phép tính gần đúng, không phải định giá chính xác một {{t:tournament|giải đấu}}.
