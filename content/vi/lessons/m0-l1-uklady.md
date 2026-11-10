---
id: m0.l1
module: m0
order: 1
title: "Xếp hạng tay bài"
sub: "Bài nào thắng bài nào"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Bài nào thắng: {{t:flush}} hay {{t:straight}}?"
    options:
      - { text: "{{t:flush|Thùng}}", correct: true, why: "{{t:flush|Thùng}} xếp hạng cao hơn. Gom được 5 lá cùng chất khó hơn gom 5 lá liên tiếp." }
      - { text: "{{t:straight|Sảnh}}", why: "Đây là lỗi thường gặp của người mới. {{t:straight|Sảnh}} xếp thấp hơn {{t:flush}} một bậc." }
      - { text: "Hòa", why: "Hai tay bài khác loại không bao giờ hòa. Tay bài xếp hạng cao hơn luôn thắng." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Bạn có {{t:full-house|cù lũ}}, đối thủ có {{t:flush}}. Ai thắng?"
    options:
      - { text: "Bạn, {{t:full-house}} thắng {{t:flush}}", correct: true, why: "{{t:full-house|Cù lũ}} ({{t:three-of-a-kind}} và {{t:pair}}) đứng thứ 4, {{t:flush}} đứng thứ 5. Thứ tự từ trên xuống: thùng phá sảnh, {{t:four-of-a-kind}}, {{t:full-house}}, {{t:flush}}, {{t:straight}}." }
      - { text: "Đối thủ, {{t:flush}} thắng {{t:full-house|cù lũ}}", why: "Ngược lại. {{t:full-house|Cù lũ}} hiếm hơn nên mạnh hơn." }
      - { text: "Tùy vào độ lớn của lá bài", why: "Độ lớn của lá bài chỉ được tính khi hai tay bài cùng loại." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Tay bài nào mạnh hơn: {{t:two-pair}} hay {{t:three-of-a-kind}}?"
    options:
      - { text: "{{t:three-of-a-kind|Bộ ba}}", correct: true, why: "{{t:three-of-a-kind|Bộ ba}} đứng thứ 7, {{t:two-pair}} đứng thứ 8. Rất dễ nhầm, vì {{t:two-pair}} “trông như” có nhiều lá hơn." }
      - { text: "{{t:two-pair|Hai đôi}}", why: "{{t:two-pair|Hai đôi}} xếp thấp hơn {{t:three-of-a-kind}} một bậc." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Cả bạn và đối thủ đều có {{t:pair|đôi}} K. Ai thắng?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Bạn", correct: true, why: "{{t:pair|Đôi}} giống nhau, nên kicker quyết định: lá A của bạn thắng lá Q của đối thủ. Vì vậy AK tốt hơn KQ rất nhiều." }
      - { text: "Đối thủ", why: "Lá Q của đối thủ thấp hơn lá A của bạn." }
      - { text: "{{t:split-pot|Chia pot}}", why: "Pot chỉ được chia khi bộ năm lá tốt nhất giống hệt nhau. Ở đây kicker phân định: A với Q." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Trên {{t:board|bàn}} có {{t:straight}}. Ai thắng?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Chia pot}}", correct: true, why: "Bộ năm lá tốt nhất của cả hai người chơi là {{t:straight}} trên {{t:board|bàn}}. {{t:pair|Đôi}} A yếu hơn {{t:straight}}, nên không thêm được gì. Đây là tình huống “{{t:playing-the-board}}”." }
      - { text: "Bạn, vì bạn có {{t:pair|đôi}} A", why: "{{t:pair|Đôi}} A chỉ là {{t:pair}}. {{t:straight|Sảnh}} trên {{t:board|bàn}} mạnh hơn, nên bạn chơi bằng sảnh đó, giống như đối thủ." }
      - { text: "Đối thủ", why: "Để có {{t:straight|sảnh}} cao hơn, đối thủ cần một lá 10." }
  - kind: generated
    id: m0.l1.g1
    family: m0.who-wins
    rules: [R-M0-001]
    generator: whoWins
    count: 3
  - kind: generated
    id: m0.l1.g2
    family: m0.kicker
    rules: [R-M0-002]
    generator: whoWinsKicker
    count: 2
  - kind: generated
    id: m0.l1.g3
    family: m0.best-hand
    rules: [R-M0-001]
    generator: bestHand
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar hands
  - kind: generated
    id: m0.l1.g-vocab-hands
    family: vocab.hands
    generator: vocab
    params: { area: hands, dir: both }
    count: 4
---
Trong Texas Hold'em, bạn nhận **2 {{t:hole-cards|lá bài tẩy}}**, và **5 {{t:community-cards|lá bài chung}}** được chia ra {{t:board}}. Từ 7 lá này, bạn tạo tay bài tốt nhất gồm **5** lá. Tay bài mạnh hơn thắng toàn bộ {{t:pot|pot}}.

## Thứ hạng từ mạnh nhất

| | Tay bài | Ví dụ |
|---|---|---|
| 1 | {{t:royal-flush|Thùng phá sảnh hoàng gia}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Thùng phá sảnh}}: {{t:straight-flush|sảnh cùng chất}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Tứ quý}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Cù lũ}}: {{t:three-of-a-kind}} và {{t:pair}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Thùng}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Sảnh}} (5 lá liên tiếp) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Bộ ba}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Hai đôi}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Đôi}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|Mậu thầu}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Trước tiên, hãy so thứ hạng của tay bài: {{t:three-of-a-kind}} thắng {{t:two-pair}}. Nếu cùng loại tay bài, độ lớn của tay bài quyết định: {{t:pair}} K thắng {{t:pair|đôi}} Q, còn khi có hai {{t:pair|đôi}} thì so {{t:pair|đôi}} cao hơn trước. Chỉ khi phần lõi của tay bài giống hệt nhau (cùng {{t:pair}}, {{t:three-of-a-kind}} hoặc cùng {{t:two-pair}}), các lá phụ, tức kicker, mới quyết định: lá cao nhất trước, nếu vẫn hòa thì đến lá tiếp theo. Chỉ tính kicker trong bộ năm lá tốt nhất. Nếu cả hai bộ năm lá giống hệt nhau, {{t:split-pot|pot được chia}}.
:::

Lá A có thể là lá thấp nhất của {{t:straight|sảnh}}: [[5h 4s 3c 2d Ah]] là {{t:straight}} thấp nhất, còn gọi là {{t:wheel}}.

Khi tay bài tốt nhất của bạn chỉ gồm {{t:community-cards|các lá bài chung}}, còn {{t:hole-cards}} không thêm được gì, đó gọi là {{t:playing-the-board|chơi bài trên bàn}}: tốt nhất thì các bạn {{t:split-pot|chia pot}}.
