---
id: m9.l2
module: m9
order: 2
title: "Cam kết"
sub: "Khi bạn chơi bằng cả stack"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: {{t:pot|pot}} có {{n:ex.pot}}, mỗi người có stack {{n:commit.stack}}. Bạn cược bằng cả {{t:pot|pot}} ({{n:ex.bet.pot}}), đối thủ all-in. Bạn phải bỏ thêm {{n:commit.after-pot.call}}. Bạn cần bao nhiêu equity để {{t:call|theo}}? Hãy nhập số theo phần trăm."
    answer: eq.commit.after-pot
    explanation: "Trước phần chênh lệch của đối thủ, {{t:pot|pot}} có {{n:ex.pot.after-pot-call}} ({{t:pot}}, {{t:bet}} của bạn và phần theo bằng của đối thủ). Bạn bỏ thêm {{n:commit.after-pot.call}}, nên equity cần = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Sau một {{t:bet|cược}} như vậy, bạn đã cam kết: {{t:fold}} thường không có lợi."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: {{t:pot|pot}} có {{n:ex.pot}}, mỗi người có stack {{n:commit.stack}}. Bạn cược nửa {{t:pot|pot}} ({{n:ex.bet.half}}), đối thủ all-in. Bạn phải bỏ thêm {{n:commit.after-half.call}}. Bạn cần bao nhiêu equity để {{t:call|theo}}? Hãy nhập số theo phần trăm."
    answer: eq.commit.after-half
    explanation: "Trước phần chênh lệch của đối thủ, {{t:pot|pot}} có {{n:ex.half.total}} ({{t:pot}}, {{t:bet}} của bạn và phần theo bằng của đối thủ). Bạn bỏ thêm {{n:commit.after-half.call}}: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. Ít hơn so với khi đối thủ all-in ngay ({{n:eq.jam.spr2}}), vì bạn đã bỏ vào một phần tiền."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Bạn có {{t:top-pair|đôi cao nhất}}, bạn cược bằng cả {{t:pot|pot}}, đối thủ all-in. Để {{t:call|theo}}, bạn cần {{n:eq.commit.after-pot}} equity. Bạn làm gì?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Đúng: giá rất tốt. Khi {{t:spr}} thấp, đối thủ cũng all-in với {{t:draw|bài chờ}} và các con Q yếu hơn, nên {{t:top-pair}} kèm A thường có nhiều hơn hẳn {{n:eq.commit.after-pot}} equity. Bài này chỉ thua rõ trước {{t:two-pair|hai đôi}} và set." }
      - { text: "{{t:fold|Bỏ bài}}, vì all-in cho thấy bài mạnh", why: "{{t:fold|Bỏ bài}} là nhường lại {{t:pot|pot}} mà bạn đã bỏ vào khá nhiều. Bạn chỉ cần thắng một lần trong năm lần, tức là {{n:eq.commit.after-pot}} số lần. Nếu bạn định {{t:fold|bỏ bài}} ở đây thì tốt hơn là đừng cược bằng cả {{t:pot|pot}}." }
      - { text: "{{t:fold|Bỏ bài}}, vì {{t:spr}} thấp", why: "{{t:spr}} thấp có tác dụng ngược lại: khi đó chơi bằng cả stack dễ hơn, vì giá cho all-in tốt hơn." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Sau {{t:bet|cược}} của bạn, phần còn lại trong stack của bạn sẽ ít hơn {{t:pot}} sau khi cược đó được {{t:call|theo}}. Kế hoạch nào là vô lý?"
    options:
      - { text: "{{t:bet|Cược}} rồi {{t:fold}} khi đối thủ all-in", correct: true, why: "Đúng, kế hoạch này là sai lầm: sau {{t:bet|cược}} như vậy, bạn cần rất ít equity để {{t:call|theo}} all-in (với {{t:spr}} {{n:spr.commit}} và {{t:bet|cược}} bằng {{t:pot|pot}}, chỉ {{n:eq.commit.after-pot}}). Nếu đằng nào bạn cũng {{t:fold|bỏ bài}}, {{t:bet}} chỉ làm mất {{t:chips}}." }
      - { text: "All-in ngay", why: "Đây là kế hoạch hợp lý với bài mạnh: đằng nào bạn cũng chơi bằng cả stack, nên bạn bỏ hết vào ngay." }
      - { text: "{{t:check|Check}}", why: "Cũng hợp lý khi bạn không muốn chơi bằng cả stack: bạn không bỏ vào số tiền mà sau đó sẽ khó {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} sau 4-bet, {{t:spr}} khoảng {{n:spr.4bet}}. Bạn trúng {{t:top-pair|đôi cao nhất}} với kicker tốt nhất. Kế hoạch là gì?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Chơi bằng cả stack", correct: true, why: "Đúng: với {{t:spr}} khoảng {{n:spr.4bet}}, bạn chỉ cần khoảng {{n:eq.jam.4bet}} equity cho all-in, và {{t:top-pair}} kèm A ở đây rất mạnh. Bạn cược hoặc {{t:call|theo}} với kế hoạch bỏ hết vào." }
      - { text: "Chơi thận trọng và {{t:fold|bỏ bài}} trước {{t:bet|cược}} lớn", why: "Với {{t:spr}} thấp như vậy, {{t:fold}} {{t:top-pair|đôi cao nhất}} là bỏ đi quá nhiều. Sau 4-bet, đối thủ còn có AQ, QQ, JJ và những tay bài khác thua bài của bạn." }
      - { text: "Cược nhỏ và {{t:fold|bỏ bài}} trước all-in", why: "Đây là kế hoạch {{t:bet}} rồi {{t:fold}} khi {{t:spr}} thấp: sau {{t:bet|cược}}, giá cho all-in còn tốt hơn nữa, và {{t:fold}} là nhường lại {{t:pot|pot}} mà bạn đã bỏ tiền vào." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Vì sao với {{t:spr}} khoảng {{n:spr.commit}}, {{t:top-pair}} thường chơi bằng cả stack?"
    options:
      - { text: "Vì cho all-in bạn cần khoảng {{n:eq.jam.spr2}} equity, và hai {{t:bet|cược}} mỗi lần khoảng {{n:geo.spr2.2}} {{t:pot|pot}} là đưa hết cả stack vào", correct: true, why: "Đúng: giá tốt, và chỉ cần hai {{t:value|vòng cược giá trị}} là đưa hết stack vào. {{t:top-pair|Đôi cao nhất}} thường chịu được chừng đó. Bản thân ngưỡng này là một quy tắc kinh nghiệm: đối thủ chơi với những bài gì cũng quan trọng." }
      - { text: "Vì {{t:top-pair}} luôn thắng", why: "Không phải lúc nào cũng vậy: đôi khi đối thủ có {{t:two-pair}} hoặc set. Tuy nhiên, khi {{t:spr}} thấp, các tay bài yếu hơn và {{t:draw|bài chờ}} bỏ vào đủ tiền, và giá lại tốt." }
      - { text: "Vì với {{t:spr}} {{n:spr.commit}}, luật không cho phép {{t:fold|bỏ bài}}", why: "Bạn luôn có thể {{t:fold|bỏ bài}}. Vấn đề là {{t:fold}} thường tốn nhiều hơn cái nó mang lại: cho all-in bạn chỉ cần khoảng {{n:eq.jam.spr2}} equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Pot}} có một lần raise, mỗi người có stack {{n:format.stack}}, {{t:spr}} khoảng {{n:spr.srp}}. Bạn trúng {{t:top-pair|đôi cao nhất}} với kicker tốt. Bạn coi tay bài này thế nào?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Là bài để lấy giá trị, nhưng thường không phải để chơi bằng cả stack", correct: true, why: "Đúng: với {{t:spr}} khoảng {{n:spr.srp}}, cả stack chỉ vào hết sau vài {{t:bet|cược}} lớn hơn {{t:pot}}. Đối thủ bỏ vào nhiều như vậy hiếm khi có bài yếu hơn một {{t:pair}}." }
      - { text: "Chơi bằng cả stack, vì {{t:top-pair}} mạnh", why: "Với {{t:spr}} {{n:spr.commit}} thì đúng, nhưng ở đây {{t:spr}} khoảng {{n:spr.srp}}. Khi cả stack đã ở trong {{t:pot|pot}}, đối thủ thường có {{t:two-pair}}, set hoặc {{t:pair|đôi}} tốt hơn." }
      - { text: "{{t:fold|Bỏ bài}} trước {{t:bet|cược}} đầu tiên của đối thủ", why: "Quá thận trọng: {{t:top-pair}} với kicker tốt là bài mạnh trên flop này. Vấn đề là không xây {{t:pot|pot}} bằng cả stack với nó, chứ không phải {{t:fold}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} sau 4-bet, {{t:spr}} khoảng {{n:spr.4bet}}. Bạn có {{t:pair|đôi}} J, còn trên flop có A và K. Đối thủ all-in. Còn quy tắc “khi {{t:spr}} thấp, tôi chơi bằng cả stack” thì sao?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Không áp dụng cho tay bài này: đây là {{t:pair}} thấp hơn cả hai lá cao trên {{t:board|bài chung}}", correct: true, why: "Đúng: quy tắc nói về {{t:top-pair|đôi cao nhất}} và các bài mạnh hơn. Sau 4-bet, đối thủ thường có A hoặc K, và đôi J của bạn thua mọi {{t:pair|đôi}} tạo từ lá cao. Ở đây bạn {{t:fold|bỏ bài}} thường xuyên hơn, dù giá tốt ({{n:eq.jam.4bet}})." }
      - { text: "Có áp dụng: khi {{t:spr}} thấp, tôi {{t:call|theo}} với mọi bài", why: "{{t:spr}} thấp cho giá tốt, nhưng không biến bài yếu thành bài mạnh. Khi đối thủ thường có {{t:pair|đôi}} tốt hơn, ngay cả {{n:eq.jam.4bet}} equity cũng có thể là quá nhiều." }
      - { text: "Có áp dụng, nhưng chỉ khi tôi có {{t:position|vị trí}}", why: "{{t:position|Vị trí}} không thay đổi việc bạn đang chơi với bài gì. Quy tắc áp dụng cho {{t:top-pair|đôi cao nhất}} và các bài mạnh hơn." }
---
Cam kết (tiếng Anh: commitment) là tình huống khi trong {{t:pot|pot}} đã có quá nhiều tiền so với stack của bạn, đến mức {{t:fold}} trước all-in gần như không bao giờ có lợi. {{t:spr}} từ bài học trước cho bạn biết ngay từ đầu flop bạn đã gần tình huống này đến mức nào.

## Sau {{t:bet|cược}}, giá còn tốt hơn

Ví dụ: {{t:spr}} {{n:spr.commit}}, {{t:pot|pot}} có {{n:ex.pot}}, mỗi người có stack {{n:commit.stack}}. Nếu đối thủ all-in ngay, bạn cần {{n:eq.jam.spr2}} equity. Nếu bạn cược trước, bạn cần ít hơn:

| {{t:bet|Cược}} của bạn trước khi đối thủ all-in | Số tiền phải bỏ thêm | Equity cần |
|---|---|---|
| Không có (đối thủ all-in ngay) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Nửa {{t:pot|pot}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Cả {{t:pot}} ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Đừng lên kế hoạch {{t:bet|cược}} rồi {{t:fold|bỏ bài}}

Nếu sau {{t:bet|cược}} của bạn, phần còn lại trong stack sẽ ít hơn {{t:pot}} sau khi cược đó được {{t:call|theo}}, thì {{t:bet}} rồi {{t:fold}} trước all-in thường là vô lý: khi đó để {{t:call|theo}} all-in, bạn cần ít equity hơn so với để {{t:call|theo}} một {{t:bet|cược}} bằng {{t:pot|pot}} ({{n:eq.bet-pot}}). Bạn có hai cách hợp lý: chơi bằng cả stack (cược hoặc all-in) hoặc {{t:check|check}}.

## {{t:spr}} thấp: {{t:top-pair}} chơi bằng cả stack

Quy tắc: **khi {{t:spr}} trên flop thấp hơn khoảng {{n:spr.zone.low}}, {{t:top-pair}} và các bài mạnh hơn thường chơi bằng cả stack** (các vùng {{t:spr}} từ bài học trước). Ví dụ {{t:spr}} {{n:spr.commit}} nằm trong vùng này, và phép tính ở đó ủng hộ quy tắc:

- cho all-in bạn cần nhiều nhất khoảng {{n:eq.jam.spr2}} equity, và sau {{t:bet|cược}} của chính bạn thì còn ít hơn,
- hai {{t:bet|cược}} mỗi lần khoảng {{n:geo.spr2.2}} {{t:pot|pot}} là đưa hết cả stack vào: với {{t:pot|pot}} {{n:ex.pot}}, đó là {{n:geo.spr2.flop}} trên flop và {{n:geo.spr2.turn}} trên turn, tổng cộng {{n:geo.spr2.total}},
- {{t:top-pair}} thường chịu được hai {{t:value|vòng cược giá trị}} (bài học về kế hoạch cho ba {{t:street|vòng}}).

Tuy vậy, phép tính không xác định một ngưỡng chính xác. {{t:top-pair|Đôi cao nhất}} có đủ equity hay không còn tùy vào việc đối thủ chơi với những bài gì. Vì thế đây là quy tắc kinh nghiệm, không phải định luật cứng. Quy tắc áp dụng cho {{t:top-pair|đôi cao nhất}} và các bài mạnh hơn: {{t:pair}} thấp hơn các lá cao trên {{t:board|bài chung}} không đáp ứng quy tắc này.

## {{t:spr}} cao: thận trọng hơn với một {{t:pair}}

Trong {{t:pot|pot}} có một lần raise, {{t:spr}} khoảng {{n:spr.srp}}. Để đưa hết cả stack vào cho đến river, bạn phải cược nhiều hơn {{t:pot|pot}} ở mỗi {{t:street|vòng cược}} (bài học về kích cỡ cược hình học). Đối thủ bỏ vào nhiều tiền như vậy hiếm khi có bài yếu hơn một {{t:pair}}. Vì thế, với một {{t:pair|đôi}} trong {{t:pot|pot}} như vậy, bạn chơi để lấy giá trị, nhưng thường không lên kế hoạch chơi bằng cả stack.

:::note Các quy tắc này từ đâu ra
Ngưỡng khoảng {{n:spr.zone.low}} đến từ tài liệu đào tạo và một phân tích solver đã công bố (với {{t:spr}} khoảng {{n:spr.commit}}, mọi {{t:top-pair}} và bài mạnh hơn đều chơi bằng cả stack). Sự thận trọng với một {{t:pair|đôi}} khi {{t:spr}} cao được tài liệu đào tạo và các phân tích solver xác nhận. Các con số về giá và kích thước cược trong bài học này là toán học thuần túy.
:::
