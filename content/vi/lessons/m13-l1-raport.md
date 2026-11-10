---
id: m13.l1
module: m13
order: 1
title: "Cách đọc báo cáo ván chơi"
sub: "Quyết định, kết quả và các mức đánh giá"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Bạn all-in với {{t:equity}} {{n:m13.eq.example}} và thua. Bạn thua trong bao nhiêu phần trăm số ván như vậy dù đã quyết định đúng? Hãy nhập một số."
    answer: m13.lose.example
    explanation: "Bạn thua trong 1 − e số ván: toàn bộ trừ {{n:m13.eq.example}} còn {{n:m13.lose.example}}. Lần thua này không nói lên điều gì về quyết định."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Bạn all-in mười lần với {{t:equity}} {{n:m13.eq.example}}. Trung bình bạn sẽ thua bao nhiêu ván trong số đó? Hãy nhập một số."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Nếu bạn thua hai lần liên tiếp, điều đó vẫn nằm trong phép tính."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Bạn có {{t:equity}} {{n:m13.eq.example2}} khi all-in. Bạn thua trong bao nhiêu phần trăm số ván như vậy? Hãy nhập một số."
    answer: m13.lose.example2
    explanation: "Toàn bộ trừ {{n:m13.eq.example2}} còn {{n:m13.lose.example2}}: cứ khoảng ba ván như vậy bạn thua một ván, và quyết định vẫn đúng."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Ở spot này, solver chơi tay bài của bạn gần như chia đều: {{t:raise|tố}} hoặc {{t:fold|bỏ bài}}. Bạn đã {{t:fold|bỏ bài}}. Báo cáo sẽ đánh giá thế nào?"
    options:
      - { text: "Phù hợp", correct: true, why: "Đúng: hành động mà solver chơi trong ít nhất {{n:range.mixed.low}} trường hợp là phù hợp. Ở trạng thái cân bằng, người chơi chỉ trộn những lối chơi có cùng {{t:expected-value|giá trị kỳ vọng}}, nên cả hai đều đúng." }
      - { text: "Sai lầm, vì lẽ ra phải {{t:raise|tố}}", why: "Không: với {{t:mixed-hand|tay bài trộn}}, cả hai lối chơi có cùng {{t:expected-value|giá trị kỳ vọng}}. Báo cáo không phạt việc chọn một trong hai." }
      - { text: "Không đánh giá", why: "Không: spot này có kết quả solver, nên quyết định được đánh giá. “Không đánh giá” dành cho quyết định mà ứng dụng không có quy tắc kiểm chứng được." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Solver chơi tay bài của bạn bằng cách {{t:raise|tố}} trong khoảng {{n:range.mixed.high}} trường hợp, và {{t:call|theo}} trong các trường hợp còn lại. Bạn đã {{t:call|theo}}. Kết luận là gì?"
    options:
      - { text: "Phù hợp", correct: true, why: "Đúng: {{t:call}} được chơi trong khoảng {{n:range.mixed.low}} trường hợp không xuống dưới ngưỡng phù hợp ({{n:range.mixed.low}}). Đây là {{t:mixed-hand|tay bài trộn}}." }
      - { text: "Chấp nhận được", why: "Chấp nhận được là hành động được chơi trong ít nhất {{n:range.mixed.min}}, nhưng ít hơn {{n:range.mixed.low}} trường hợp. Ở đây {{t:call}} đạt ngưỡng phù hợp." }
      - { text: "Sai lầm", why: "Sai lầm là hành động mà solver hoàn toàn không chơi. Hành động được chơi ít hơn {{n:range.mixed.min}} trường hợp là thiếu chính xác." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "Ở spot mà solver chơi 3-bet, bạn 3-bet, nhưng với kích cỡ khác với kích cỡ quy tắc khuyến nghị. Kết luận là gì?"
    options:
      - { text: "Thiếu chính xác", correct: true, why: "Đúng: hành động đúng, kích cỡ sai. Lỗi này được tính như sai lầm và quay lại trong phần ôn tập, nhưng báo cáo hiển thị phần giải thích riêng về kích cỡ." }
      - { text: "Phù hợp", why: "Hành động đúng, nhưng kích cỡ quan trọng: 3-bet quá nhỏ cho đối thủ mức giá tốt, quá lớn thì mạo hiểm nhiều hơn mức cần thiết." }
      - { text: "Sai lầm", why: "Sai lầm dành cho hành động sai. Hành động đúng với kích cỡ sai là một mức riêng: thiếu chính xác." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Báo cáo: “Đã đánh giá 14 trên 30 quyết định”. Các quyết định còn lại có nghĩa là gì?"
    options:
      - { text: "Ứng dụng không có quy tắc kiểm chứng được hay kết quả solver cho chúng", correct: true, why: "Đúng: “không đánh giá” không có nghĩa là “tốt”. Những quyết định này có thể tốt hoặc xấu; báo cáo không biết và nói thẳng điều đó." }
      - { text: "Chúng tốt, nên báo cáo không hiển thị", why: "Không: báo cáo tính các quyết định tốt là phù hợp. “Không đánh giá” là thiếu đánh giá, không phải lời khen." }
      - { text: "Chúng quá dễ để đánh giá", why: "Vấn đề không nằm ở độ khó. Các quyết định được đánh giá là những quyết định mà ứng dụng có quy tắc kèm điều kiện hoặc spot solver." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Sau {{t:session|phiên chơi}}, bạn thắng khá nhiều {{t:chips|chip}}, nhưng báo cáo cho thấy năm sai lầm. Điều gì nói lên nhiều hơn về lối chơi của bạn?"
    options:
      - { text: "Đánh giá quyết định", correct: true, why: "Đúng: vài chục ván là quá ít để kết quả nói lên điều gì. Ngay cả sau hàng nghìn tay bài, kết quả phần lớn vẫn là nhiễu, và mỗi sai lầm đều có cái giá của nó bất kể ván bài kết thúc thế nào." }
      - { text: "Kết quả tính bằng {{t:chips|chip}}", why: "Kết quả của {{t:session|phiên chơi}} ngắn phụ thuộc chủ yếu vào bài. Chính vì vậy báo cáo hiển thị nó bằng cỡ chữ nhỏ hơn." }
      - { text: "Cả hai như nhau", why: "Kết quả từ vài chục ván gần như không nói gì về kỹ năng. Quyết định được đánh giá bằng quy tắc hoặc solver nói lên nhiều hơn hẳn." }
---
Báo cáo sau {{t:session|phiên chơi}} đánh giá các quyết định của bạn, chứ không phải bạn đã thắng bao nhiêu. Bài học này giải thích cách đọc báo cáo.

## Quyết định, không phải kết quả

Trong mô-đun về mental game, bạn đã học nguyên tắc: bạn đánh giá quyết định dựa trên thông tin bạn có tại thời điểm quyết định, chứ không phải kết quả ván bài. Báo cáo áp dụng nguyên tắc này theo đúng nghĩa đen: nó đánh giá tình huống trước hành động của bạn, không thấy bài của đối thủ hay những lá bài ra sau đó.

Thua khi cầm tay bài mạnh hơn vẫn nằm trong phép tính. {{t:equity|Equity}} là tỷ lệ thắng qua nhiều lần lặp lại cùng một tình huống. Với {{t:equity}} {{n:m13.eq.example}}, bạn thua khoảng {{n:m13.lose.example}} số ván, tức trung bình {{n:m13.lose.of-ten}} trên {{n:m13.ten}}.

```formula
xác suất thua = 1 − equity
```

## Các mức đánh giá

- **Phù hợp**: hành động mà quy tắc khuyến nghị, hoặc được solver chơi trong ít nhất {{n:range.mixed.low}} trường hợp (ngưỡng này là thiết lập của ứng dụng).
- **Chấp nhận được**: solver hiếm khi chơi nó (ít nhất {{n:range.mixed.min}}, nhưng ít hơn {{n:range.mixed.low}}), hoặc quy tắc nói về tần suất (“thường”, “ít hơn”) và bạn chọn phương án ít gặp hơn. Đây không phải sai lầm.
- **Thiếu chính xác**: hành động đúng, kích cỡ sai, hoặc hành động mà solver có chơi, nhưng ít hơn {{n:range.mixed.min}} trường hợp. Được tính như sai lầm: đây là thiết lập của ứng dụng, không phải lý thuyết.
- **Sai lầm**: hành động trái với quy tắc được phát biểu dứt khoát, hoặc hành động mà solver hoàn toàn không chơi.
- **Không đánh giá**: ứng dụng không có quy tắc kiểm chứng được cho quyết định này. Điều này không có nghĩa là “tốt”.
- **Quá thời gian**: khi bật giới hạn thời gian, ứng dụng đã chơi thay bạn. Quyết định như vậy không được tính vào đánh giá, nhưng sẽ quay lại trong phần ôn tập.

Ở đầu báo cáo có con số “Đã đánh giá X trên Y quyết định”. Sau flop, nhiều quyết định không được đánh giá, vì phần lớn quy tắc ở turn và river nói về tần suất của toàn bộ {{t:range|dải bài}}, chứ không phải về một tay bài.

## {{t:mixed-hand|Tay bài trộn}}

Khi solver chơi tay bài của bạn theo hai cách, cả hai đều đúng. Lý thuyết cân bằng giải thích điều này bằng nguyên tắc bàng quan: người chơi chỉ trộn những lối chơi có cùng {{t:expected-value|giá trị kỳ vọng}}. Vì vậy báo cáo không phạt việc chọn một trong hai, và đánh dấu lối chơi ít gặp hơn là chấp nhận được khi solver chơi nó trong ít nhất {{n:range.mixed.min}} trường hợp; ít hơn thế là thiếu chính xác (thiết lập của ứng dụng).

## Kết quả tính bằng {{t:chips|chip}}

Kết quả nằm ở cuối báo cáo, cỡ chữ nhỏ. Theo phép tính trong bài học về {{t:variance|phương sai}}, sau khoảng {{n:m13.noise.hands.k}} nghìn tay bài, khoảng tin cậy {{n:var.conf95}} cho winrate là khoảng ± {{n:m13.noise.ci}}, nên kết quả gần như chỉ là nhiễu: người chơi thắng vẫn có thể đang lỗ, còn người chơi thua có thể đang lãi lớn. Một {{t:session|phiên chơi}} có vài chục ván, nên kết quả gần như không nói gì về lối chơi của bạn.

:::note Nguồn gốc các nguyên tắc này
Nguyên tắc bàng quan: tài liệu về nền tảng lý thuyết cân bằng. Ngưỡng nước đi hiếm và tên gọi “thiếu chính xác”: tài liệu về việc tự đánh giá lối chơi so với solver. Ngưỡng {{n:range.mixed.low}} là thiết lập của ứng dụng, không có nguồn. {{t:variance|Phương sai}} của kết quả và xác suất thua là phép tính.
:::
