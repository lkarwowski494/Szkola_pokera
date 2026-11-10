---
id: m12.l2
module: m12
order: 2
title: "Quyết định và kết quả"
sub: "Hãy đánh giá nước đi, không phải lá bài trên river"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Preflop, bạn đưa cả stack vào với {{t:pair|đôi}} A, đối thủ {{t:call|theo}} với {{t:pair|đôi}} K. Trên river ra lá K và bạn thua. Bạn đánh giá quyết định của mình thế nào?"
    options:
      - { text: "Quyết định rất tốt", correct: true, why: "AA thắng KK trong khoảng {{n:pf.aa-vs-kk}} trường hợp. Thua trong khoảng {{n:res.kk-wins}} là cái giá của việc chơi, không phải sai lầm. Lần nào bạn cũng làm đúng như vậy." }
      - { text: "Quyết định tệ, lẽ ra phải chơi thận trọng hơn", why: "Đó là đánh giá theo kết quả. Nếu lá bài trên river khác đi, cùng quyết định đó sẽ trông rất tuyệt. Quyết định phụ thuộc vào những gì bạn biết trước lá bài đó: khoảng {{n:pf.aa-vs-kk}} equity." }
      - { text: "Không thể đánh giá, vì bạn đã thua", why: "Có thể: bạn tính equity tại thời điểm quyết định. Kết quả của một ván bài không bổ sung thêm điều gì." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA thắng KK khi all-in preflop trong khoảng {{n:pf.aa-vs-kk}} trường hợp. Bạn thua trong bao nhiêu phần trăm trường hợp dù đã đưa ra quyết định tốt nhất có thể? Hãy nhập một số."
    answer: res.kk-wins
    explanation: "Toàn bộ trừ đi {{n:pf.aa-vs-kk}} còn khoảng {{n:res.kk-wins}}. Cứ khoảng năm–sáu lần thì có một lần quyết định tốt kết thúc bằng thua."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Bạn có {{t:flush-draw|draw thùng}} sạch ({{n:outs.flush}} out), {{t:pot|pot}} là {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.quarter}}. Bạn {{t:call|theo}}, {{t:flush|thùng}} không về và bạn mất {{n:ex.bet.quarter}}. Bạn đánh giá lần {{t:call|theo}} này thế nào?"
    options:
      - { text: "Đó là lựa chọn tốt", correct: true, why: "Bạn cần {{n:eq.bet-quarter}} equity và có khoảng {{n:odds.flush.turn-river}}. Lần {{t:call|theo}} như vậy kiếm được tiền về lâu dài, dù thua trong phần lớn các ván riêng lẻ." }
      - { text: "Đó là lựa chọn tệ, vì {{t:flush|thùng}} không về", why: "{{t:flush|Thùng}} chỉ về trong khoảng {{n:odds.flush.turn-river}} trường hợp, nên trượt là kết quả có khả năng xảy ra nhất. Bạn đánh giá quyết định theo giá, và giá lúc đó là tốt." }
      - { text: "Chỉ tốt nếu {{t:flush|thùng}} về", why: "Đó chính là định nghĩa của việc đánh giá theo kết quả. Cùng một quyết định không thay đổi chất lượng tùy theo lá bài ra sau đó." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. {{t:flush-draw|Draw thùng}} sạch, {{t:pot|pot}} là {{n:ex.pot}}, đối thủ {{t:bet|cược}} bằng cả {{t:pot|pot}}: {{n:ex.bet.pot}}. Bạn {{t:call|theo}} và {{t:flush|thùng}} về trên river. Bạn đánh giá lần {{t:call|theo}} này thế nào?"
    options:
      - { text: "Đó là lựa chọn tệ, dù đã thắng", correct: true, why: "Bạn cần {{n:eq.bet-pot}} equity và có khoảng {{n:odds.flush.turn-river}}. Lần này bạn thắng, nhưng qua nhiều lần lặp lại, lần {{t:call|theo}} như vậy sẽ lỗ." }
      - { text: "Đó là lựa chọn tốt, vì bạn đã thắng {{t:pot|pot}}", why: "Thắng không làm quyết định tốt hơn. Với giá {{n:eq.bet-pot}} và cơ hội khoảng {{n:odds.flush.turn-river}}, lần {{t:call|theo}} này lỗ về lâu dài." }
      - { text: "Đó là lựa chọn tốt, vì {{t:flush|thùng}} là tay bài mạnh nhất", why: "Sức mạnh tay bài sau khi trúng không thay đổi giá. Điều quan trọng là phép so sánh: cơ hội {{n:odds.flush.turn-river}} so với {{n:eq.bet-pot}} cần có." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Bạn đang phân tích một ván bài đã thua. Câu hỏi nào quan trọng nhất?"
    options:
      - { text: "Với thông tin mình có, quyết định đó có {{t:expected-value|EV}} dương không?", correct: true, why: "Đây là câu hỏi duy nhất phân biệt sai lầm với xui xẻo. Bạn tính giá, equity so với {{t:range|phạm vi bài}} của đối thủ và những gì bạn biết tại thời điểm quyết định." }
      - { text: "Đối thủ sẽ nhận lá bài nào nếu mình {{t:fold|bỏ bài}}?", why: "Lá bài trong tương lai không thay đổi chất lượng quyết định. Chỉ những gì bạn biết lúc đó mới quan trọng." }
      - { text: "Mình đã thua bao nhiêu trong ván này?", why: "Mức thua cho biết về {{t:pot|pot}}, không phải về quyết định. Thua lớn có thể đến từ quyết định tốt, thua nhỏ có thể đến từ sai lầm." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Một người bạn hỏi bạn về cùng một nước đi trong hai ván: một ván thắng, một ván thua. Bạn có cảm giác lần đầu họ chơi tốt hơn. Chuyện gì đang xảy ra?"
    options:
      - { text: "Đó là thiên kiến kết quả: bạn đánh giá quyết định theo cách nó kết thúc", correct: true, why: "Trong các nghiên cứu tâm lý, mọi người đánh giá cùng một quyết định cao hơn khi kết quả tốt, ngay cả khi họ cho rằng kết quả không nên có ý nghĩa. Đánh giá trước khi biết kết quả sẽ giúp ích." }
      - { text: "Quyết định đầu tiên tốt hơn, vì nó hiệu quả", why: "Nếu nước đi giống nhau thì quyết định cũng giống nhau. Chỉ kết quả khác nhau, tức là may rủi." }
      - { text: "Quyết định thứ hai tốt hơn, vì nó dạy sự khiêm tốn", why: "Đánh giá không phụ thuộc vào kết quả theo chiều nào cả. Cùng một quyết định có cùng một chất lượng." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Trong ba {{t:session|phiên}}, bạn chơi hung hăng hơn thường lệ và đã thắng. Đó có phải bằng chứng rằng lối chơi mới tốt hơn không?"
    options:
      - { text: "Không, ba {{t:session|phiên}} là quá ít; bạn đánh giá các nước đi mới khi xem lại ván bài", correct: true, why: "Ngay cả chênh lệch kỹ năng rất lớn ({{n:skill.pct}} giỏi nhất so với {{n:skill.pct}} yếu nhất) cũng chỉ dẫn trước trong khoảng {{n:skill.ahead}} trường hợp sau khoảng {{n:skill.hands}} tay bài. Khác biệt giữa hai lối chơi của bạn nhỏ hơn nhiều." }
      - { text: "Có, kết quả cho thấy điều gì hiệu quả", why: "Kết quả của vài {{t:session|phiên}} chủ yếu là nhiễu. Với {{t:standard-deviation|độ lệch chuẩn}} khoảng {{n:var.sd}}, ngay cả {{n:var.hands.k}} nghìn tay bài vẫn để lại sai số khoảng ± {{n:var.ci.wr}}." }
      - { text: "Có, nếu bạn thắng nhiều hơn thường lệ", why: "Thắng lớn hơn từ một mẫu nhỏ thì vẫn là mẫu nhỏ. Bạn đánh giá nước đi bằng tính toán và bằng việc xem lại ván bài." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Một nghiên cứu trên hàng triệu ván bài trực tuyến đã cho thấy khi nào kỹ năng bắt đầu lấn át may rủi. Chính xác thì điều gì đã được đo?"
    options:
      - { text: "{{n:skill.pct}} người chơi giỏi nhất vượt {{n:skill.pct}} yếu nhất trong khoảng {{n:skill.ahead}} trường hợp sau khoảng {{n:skill.hands}} tay bài", correct: true, why: "Các tác giả nghiên cứu (2015) định nghĩa như vậy. Đây là phép so sánh giữa các nhóm cực đoan: với chênh lệch kỹ năng nhỏ hơn, cần nhiều tay bài hơn đáng kể." }
      - { text: "Sau khoảng {{n:skill.hands}} tay bài, mọi người chơi giỏi đều có lãi", why: "Nghiên cứu so sánh các nhóm người chơi cực đoan, chứ không nói khi nào một người chơi giỏi cụ thể sẽ có lãi. Điều đó phụ thuộc vào winrate và {{t:standard-deviation|độ lệch chuẩn}} (bài học về {{t:variance|phương sai}})." }
      - { text: "Sau khoảng {{n:skill.hands}} tay bài, may rủi không còn ý nghĩa", why: "May rủi luôn có ý nghĩa. Nghiên cứu chỉ cho biết khi nào lợi thế của những người giỏi nhất so với những người kém nhất bắt đầu thắng trong phần lớn các phép so sánh." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Bạn thắng một {{t:session|phiên}} nhờ hai lần theo với giá không tốt nhưng trúng trên river. Bạn làm gì sau {{t:session|phiên}} đó?"
    options:
      - { text: "Ghi lại những lần {{t:call|theo}} đó như những sai lầm cần sửa", correct: true, why: "Thắng không thay đổi giá. Nếu lần {{t:call|theo}} đòi hỏi nhiều equity hơn bạn có, đó là sai lầm, ngay cả khi nó mang lại lợi." }
      - { text: "Không làm gì, {{t:session|phiên}} đó đã thắng", why: "Sai lầm trong các {{t:session|phiên}} thắng cũng tốn kém như vậy, chỉ là khó nhận ra hơn. Chỉ phân tích các ván thua sẽ bỏ sót một nửa số sai lầm." }
      - { text: "Kết luận rằng bạn đọc đối thủ tốt hơn những gì tính toán cho thấy", why: "Hai lần trúng là quá ít để rút ra kết luận về khả năng đọc đối thủ. Lời giải thích đơn giản nhất là {{t:variance|phương sai}}." }
---
Poker cho bạn phản hồi thường xuyên đánh lừa. Một quyết định tốt có thể thua, còn quyết định tệ có thể thắng. Nếu bạn đánh giá lối chơi theo kết quả, bạn đang học từ những tín hiệu ngẫu nhiên.

## Resulting: đánh giá theo kết quả

Người chơi gọi điều này là *resulting*: bạn cho rằng chất lượng của kết quả cho biết chất lượng của quyết định. Các nhà tâm lý học mô tả cùng hiện tượng này là **thiên kiến kết quả**. Trong một nghiên cứu tâm lý kinh điển (1988), mọi người đánh giá cùng một quyết định là tốt hơn, và người ra quyết định là có năng lực hơn, khi kết quả thuận lợi. Họ làm như vậy ngay cả khi chính họ cho rằng không nên tính đến kết quả.

## Quyết định tốt cũng thua

All-in với {{t:pair|đôi}} A trước {{t:pair|đôi}} K là quyết định tốt nhất có thể, nhưng vẫn thua trong khoảng **{{n:res.kk-wins}}** trường hợp. Ngược lại, {{t:call|theo}} với {{t:flush-draw|draw thùng}} một cược bằng cả {{t:pot|pot}} trên turn là tệ (bạn cần {{n:eq.bet-pot}}, bạn có khoảng {{n:odds.flush.turn-river}}), nhưng vẫn thắng khoảng một lần trong năm.

```formula
chất lượng quyết định = EV dựa trên thông tin bạn có tại thời điểm quyết định
```

## Cách phân tích một ván bài

1. Che kết quả đi. Chỉ đánh giá những gì bạn biết tại thời điểm quyết định.
2. Tính giá và equity so với {{t:range|phạm vi bài}} của đối thủ (M2, M6).
3. Kiểm tra xem nước đi có khớp với các quy tắc trong khóa học không.
4. Hãy phân tích cả các ván thắng: những sai lầm mang lại lợi cũng tốn kém như vậy.

## Khi nào kết quả bắt đầu có ý nghĩa

Trong một nghiên cứu trên khoảng {{n:skill.sample.m}} triệu ván bài trực tuyến (nghiên cứu năm 2015), kỹ năng chỉ bắt đầu lấn át sau khoảng **{{n:skill.hands}}** tay bài. Điều đó có nghĩa là {{n:skill.pct}} người chơi giỏi nhất vượt {{n:skill.pct}} yếu nhất trong khoảng {{n:skill.ahead}} phép so sánh. Với chênh lệch kỹ năng nhỏ hơn, cần nhiều tay bài hơn gấp nhiều lần. Vì vậy, kết quả của vài {{t:session|phiên}} không cho biết lối chơi nào tốt hơn.

:::note Cách đánh giá trong ứng dụng này
Đó là lý do ứng dụng đánh giá quyết định của bạn, chứ không phải kết quả của ván bài. Khi kết quả và quyết định không khớp nhau, hãy tin vào tính toán.
:::
