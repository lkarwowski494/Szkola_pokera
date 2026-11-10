---
id: m12.l1
module: m12
order: 1
title: "Phương sai qua các con số"
sub: "Kết quả qua hàng nghìn tay bài cho bạn biết bao nhiêu"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Bạn thắng trung bình {{n:var.wr.ex}} và sẽ chơi {{n:var.hands.k}} nghìn tay. Kết quả kỳ vọng của bạn là bao nhiêu {{t:buy-in|buy-in}} (mỗi buy-in {{n:format.stack}})? Hãy nhập một số."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} nghìn tay là {{n:var.blocks}} khối, mỗi khối 100 tay. Kết quả kỳ vọng = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, tức {{n:var.exp.bi}} {{t:buy-in|buy-in}}. Đây là mức trung bình: kết quả thực tế có thể lệch xa so với nó."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "{{t:standard-deviation|Độ lệch chuẩn}} trong lối chơi của bạn là {{n:var.sd}}. {{t:standard-deviation|Độ lệch chuẩn}} của kết quả sau {{n:var.hands.k}} nghìn tay ({{n:var.blocks}} khối 100 tay) là bao nhiêu?"
    options:
      - { text: "Khoảng {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}", correct: true, why: "{{t:standard-deviation|Độ lệch chuẩn}} tăng theo căn bậc hai của số khối: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, tức khoảng {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}." }
      - { text: "Khoảng {{n:var.sd.wrong.bi}} {{t:buy-in|buy-in}}", why: "Đây là kết quả khi bạn nhân {{t:standard-deviation|độ lệch chuẩn}} với số khối. Các dao động ngẫu nhiên phần nào triệt tiêu nhau, nên bạn nhân với căn bậc hai: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Khoảng {{n:var.exp.bi}} {{t:buy-in|buy-in}}", why: "Đây là kết quả kỳ vọng ở mức {{n:var.wr.ex}}, không phải {{t:standard-deviation|độ lệch chuẩn}} của nó. {{t:standard-deviation|Độ lệch chuẩn}} vào khoảng {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Bạn thắng {{n:var.wr.ex}} với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}. Với độ tin cậy khoảng {{n:var.conf95}}, kết quả của bạn sau {{n:var.hands.k}} nghìn tay sẽ nằm trong khoảng nào?"
    options:
      - { text: "Từ khoảng {{n:var.ci.low.bi}} đến khoảng {{n:var.ci.high.bi}} {{t:buy-in|buy-in}}", correct: true, why: "Kết quả kỳ vọng {{n:var.exp.bi}} {{t:buy-in|buy-in}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Ngay cả người chơi thắng rõ rệt cũng có thể gần như hòa vốn sau {{n:var.hands.k}} nghìn tay." }
      - { text: "Từ khoảng {{n:var.ci68.low.bi}} đến khoảng {{n:var.ci68.high.bi}} {{t:buy-in|buy-in}}", why: "Đây là khoảng một {{t:standard-deviation|độ lệch chuẩn}}: nó chỉ bao gồm khoảng 2 trên 3 kết quả. Với {{n:var.conf95}}, bạn lấy {{n:var.z95}} {{t:standard-deviation|độ lệch chuẩn}}: từ khoảng {{n:var.ci.low.bi}} đến khoảng {{n:var.ci.high.bi}}." }
      - { text: "Đúng {{n:var.exp.bi}} {{t:buy-in|buy-in}}", why: "Đó chỉ là mức trung bình. Kết quả dao động quanh nó vài chục {{t:buy-in|buy-in}} về cả hai phía." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Sau {{n:var.hands.k}} nghìn tay ({{n:var.blocks}} khối 100 tay) với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}: sai số chuẩn của winrate của bạn tính theo bb/100 là bao nhiêu? Hãy lấy √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Hãy nhập một số."
    answer: var.se.wr
    explanation: "Sai số chuẩn = SD ÷ √(số khối) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. Khoảng {{n:var.conf95}} là ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Sau {{n:var.hands.k}} nghìn tay, kết quả của bạn là {{n:var.wr.ex}}, {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}. Bạn biết gì về winrate thực sự của mình?"
    options:
      - { text: "Với độ tin cậy khoảng {{n:var.conf95}}, nó nằm giữa khoảng {{n:var.wr.ci.low}} và khoảng {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Sau {{n:var.hands.k}} nghìn tay, bạn chỉ biết rằng nhiều khả năng mình không thua." }
      - { text: "Nó là {{n:var.wr.ex}}, vì mẫu đã lớn", why: "{{n:var.hands.k}} nghìn tay nghe có vẻ nhiều, nhưng với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}, sai số vẫn vào khoảng ± {{n:var.ci.wr}}." }
      - { text: "Không biết gì cả, kết quả trong poker hoàn toàn là may rủi", why: "Nói quá. Mẫu có thu hẹp khoảng, chỉ là chậm: sai số giảm theo căn bậc hai của số tay." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Bạn muốn biết winrate của mình với độ chính xác ± {{n:var.target}} ở độ tin cậy {{n:var.conf95}}. {{t:standard-deviation|Độ lệch chuẩn}} là {{n:var.sd}}. Bạn cần bao nhiêu tay?"
    options:
      - { text: "Khoảng {{n:var.need.hands.k}} nghìn", correct: true, why: "Số khối = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Tức là khoảng {{n:var.need.hands.k}} nghìn tay." }
      - { text: "Khoảng {{n:var.hands.k}} nghìn", why: "Sau {{n:var.hands.k}} nghìn tay, sai số vào khoảng ± {{n:var.ci.wr}}. Để giảm nó xuống ± {{n:var.target}}, bạn cần khoảng {{n:var.need.hands.k}} nghìn tay." }
      - { text: "Khoảng {{n:var.need.blocks}} tay", why: "Đó là số khối 100 tay. Số tay nhiều gấp một trăm lần: khoảng {{n:var.need.hands.k}} nghìn." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Một người chơi thắng {{n:var.wr.ex}} với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}. Trong {{n:var.hands.k}} nghìn tay, người đó gặp {{t:downswing}} ít nhất {{n:dd.bi.small}} {{t:buy-in|buy-in}} tính từ điểm cao nhất thường xuyên đến mức nào?"
    options:
      - { text: "Gần như luôn luôn, khoảng {{n:dd.p.small.100k}}", correct: true, why: "Mô phỏng {{n:var.hands.k}} nghìn tay với các thông số này cho ra {{t:downswing}} như vậy ở khoảng {{n:dd.p.small.100k}} số lần chạy. {{t:downswing|Downswing}} {{n:dd.bi.small}} {{t:buy-in|buy-in}} là một phần bình thường trong lối chơi của người chơi thắng." }
      - { text: "Trong khoảng {{n:dd.p.small.20k}} trường hợp", why: "Đó là con số cho mẫu ngắn hơn, {{n:dd.hands.short.k}} nghìn tay. Trong {{n:var.hands.k}} nghìn tay, cơ hội gặp {{t:downswing}} sâu nhiều hơn hẳn: khoảng {{n:dd.p.small.100k}}." }
      - { text: "Hiếm khi, khoảng {{n:var.p.lose}}", why: "Đó là mức hiếm mà người chơi {{n:var.wr.ex}} kết thúc {{n:var.hands.k}} nghìn tay trong tình trạng âm. {{t:downswing|Downswing}} giữa chừng là chuyện khác: nó gần như luôn xảy ra." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Hai người chơi, {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}, {{n:var.hands.k}} nghìn tay. Một người thắng {{n:var.wr.ex}}, người kia {{n:dd.wr-low}}. Mỗi người gặp {{t:downswing}} {{n:dd.bi.big}} {{t:buy-in|buy-in}} thường xuyên đến mức nào?"
    options:
      - { text: "Người thứ nhất trong khoảng {{n:dd.p.big.100k}}, người thứ hai trong khoảng {{n:dd.p.big.100k.wr-low}} trường hợp", correct: true, why: "Winrate thấp hơn kéo kết quả đi lên yếu hơn, nên các {{t:downswing|downswing}} sâu hơn và thường xuyên hơn. Ở mức {{n:dd.wr-low}}, điển hình cho người chơi thắng ở micro stakes, {{t:downswing}} {{n:dd.bi.big}} {{t:buy-in|buy-in}} xảy ra ở hơn một nửa số mẫu." }
      - { text: "Cả hai đều thường xuyên như nhau, vì {{t:standard-deviation|độ lệch chuẩn}} giống nhau", why: "{{t:standard-deviation|Độ lệch chuẩn}} quyết định mức dao động, còn winrate quyết định kết quả thoát khỏi các dao động đó nhanh đến đâu. Ở mức {{n:dd.wr-low}}, {{t:downswing}} {{n:dd.bi.big}} {{t:buy-in|buy-in}} xảy ra ở khoảng {{n:dd.p.big.100k.wr-low}} số mẫu, ở mức {{n:var.wr.ex}} là khoảng {{n:dd.p.big.100k}}." }
      - { text: "Không ai cả: {{t:downswing}} {{n:dd.bi.big}} {{t:buy-in|buy-in}} chỉ xảy ra với người chơi thua", why: "Không đúng. Ngay cả người chơi {{n:var.wr.ex}} cũng gặp nó ở khoảng {{n:dd.p.big.100k}} số mẫu {{n:var.hands.k}} nghìn tay." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Đã một tháng nay bạn đang âm {{n:dd.bi.small}} {{t:buy-in|buy-in}}. Điều này cho thấy gì?"
    options:
      - { text: "Bản thân {{t:downswing}} không chứng minh điều gì; bạn xem lại các quyết định trong những ván đã thua", correct: true, why: "{{t:downswing|Downswing}} {{n:dd.bi.small}} {{t:buy-in|buy-in}} trong {{n:var.hands.k}} nghìn tay xảy đến với gần như mọi người chơi thắng từ {{n:dd.wr-low}} đến {{n:var.wr.ex}} (mô phỏng với SD {{n:var.sd}}). Việc bạn chơi tốt hay không được thể hiện qua việc xem lại quyết định, chứ không phải chỉ qua kết quả." }
      - { text: "Bạn đang chơi tệ và phải thay đổi toàn bộ lối chơi", why: "{{t:downswing|Downswing}} cỡ này xảy ra với người chơi thắng {{n:var.wr.ex}} (SD {{n:var.sd}}) ở khoảng {{n:dd.p.small.100k}} số mẫu {{n:var.hands.k}} nghìn tay. Thay đổi lối chơi chỉ vì kết quả là phản ứng với nhiễu." }
      - { text: "Chắc chắn bạn chỉ xui, không cần xem lại gì cả", why: "{{t:downswing|Downswing}} cũng có thể do sai lầm. Kết quả không phân biệt được xui với sai lầm, nhưng việc xem lại ván bài thì có thể." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "{{t:standard-deviation|Độ lệch chuẩn}} bao nhiêu là điển hình cho cash game 6-max No-Limit Hold'em?"
    options:
      - { text: "Khoảng {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "Đó là con số mà các công cụ tính {{t:variance|phương sai}} đưa ra. Thường người ta lấy khoảng {{n:var.sd}} làm giá trị điển hình. Lối chơi hung hăng cho {{t:standard-deviation|độ lệch chuẩn}} cao hơn." }
      - { text: "Khoảng {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "Đó là winrate điển hình của người chơi thắng ở micro stakes. {{t:standard-deviation|Độ lệch chuẩn}} lớn hơn winrate vài chục lần, và đó là lý do kết quả nhảy lên xuống nhiều như vậy." }
      - { text: "Khoảng {{n:var.sd.result.bi}} {{t:buy-in|buy-in}} mỗi 100 tay", why: "Đó là {{t:standard-deviation|độ lệch chuẩn}} của kết quả sau {{n:var.hands.k}} nghìn tay, không phải mỗi 100 tay." }
---
Kết quả của bạn trong poker là tổng của hai yếu tố: bạn chơi tốt đến đâu, và may rủi. Cả hai thành phần đều đo được. Winrate cho biết trung bình bạn thắng bao nhiêu, còn {{t:standard-deviation|độ lệch chuẩn}} cho biết kết quả nhảy quanh mức trung bình đó nhiều đến đâu.

## Hai con số tính theo bb/100

**Winrate** là lợi nhuận trung bình mỗi 100 tay, tính bằng {{t:big-blind|big blind}}. Người chơi thắng ở micro stakes thường có {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

**{{t:standard-deviation|Độ lệch chuẩn}} (SD)** là độ phân tán điển hình của kết quả mỗi 100 tay. Trong cash game 6-max, nó thường là {{n:var.sd.low}}–{{n:var.sd.high}}, và {{n:var.sd}} được lấy làm giá trị điển hình. {{t:standard-deviation|Độ lệch chuẩn}} lớn hơn winrate vài chục lần, nên kết quả của một {{t:session|phiên chơi}}, thậm chí của cả một tháng, cho bạn biết rất ít.

## Kết quả qua nhiều tay bài

Lấy số tay chia cho 100, bạn được số khối.

```formula
kết quả kỳ vọng = winrate × số khối
độ lệch chuẩn của kết quả = SD × √(số khối)
khoảng {{n:var.conf95}} = kết quả kỳ vọng ± {{n:var.z95}} × độ lệch chuẩn của kết quả
```

Ví dụ: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} nghìn tay, tức {{n:var.blocks}} khối. Bạn kỳ vọng {{n:var.exp.bb}}, tức {{n:var.exp.bi}} {{t:buy-in|buy-in}}. {{t:standard-deviation|Độ lệch chuẩn}} của kết quả là {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, tức khoảng {{n:var.sd.result.bi}} {{t:buy-in|buy-in}}. Với độ tin cậy {{n:var.conf95}}, bạn sẽ kết thúc ở mức từ khoảng **{{n:var.ci.low.bi}} đến khoảng {{n:var.ci.high.bi}} {{t:buy-in|buy-in}}**. Kết quả kỳ vọng nằm trên mức 0 khoảng {{n:var.z.lose}} {{t:standard-deviation|độ lệch chuẩn}}, nên khả năng bạn bị âm sau {{n:var.hands.k}} nghìn tay là khoảng {{n:var.p.lose}}.

## Cần bao nhiêu tay để biết winrate của bạn

Phép tính tương tự cũng áp dụng theo chiều ngược lại. Sai số khi ước lượng winrate giảm theo căn bậc hai của số tay:

```formula
sai số winrate = SD ÷ √(số khối)
số khối cần thiết = ({{n:var.z95}} × SD ÷ độ chính xác)²
```

Sau {{n:var.hands.k}} nghìn tay, sai số vào khoảng {{n:var.se.wr}}, nên khoảng {{n:var.conf95}} là ± {{n:var.ci.wr}}. Khi đó, kết quả {{n:var.wr.ex}} chỉ có nghĩa là winrate thực sự của bạn nằm đâu đó trong khoảng từ {{n:var.wr.ci.low}} đến {{n:var.wr.ci.high}}. Để biết winrate với độ chính xác ± {{n:var.target}}, bạn cần khoảng **{{n:var.need.hands.k}} nghìn tay**.

## {{t:downswing|Downswing}} là bình thường

{{t:downswing|Downswing}} là sự sụt giảm kết quả tính từ điểm cao nhất. Mô phỏng người chơi {{n:var.wr.ex}} với SD {{n:var.sd}}:

| {{t:downswing|Downswing}} từ đỉnh | Trong {{n:dd.hands.short.k}} nghìn tay | Trong {{n:var.hands.k}} nghìn tay | Trong {{n:var.hands.k}} nghìn tay ở mức {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-in}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-in}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note Những con số này đến từ đâu
Kết quả mô phỏng: hàng nghìn lần chạy, mỗi lần {{n:var.hands.k}} nghìn tay, với kết quả ngẫu nhiên cho từng khối. {{t:downswing|Downswing}} thực tế có thể sâu hơn một chút, vì kết quả thay đổi sau mỗi ván bài chứ không phải sau mỗi 100 tay. Kết luận: {{t:downswing}} {{n:dd.bi.small}} {{t:buy-in|buy-in}} không chứng minh rằng bạn đang chơi tệ.
:::

Đây là những hướng dẫn chung, không phải sự đảm bảo về kết quả. Nếu việc chơi bắt đầu vượt khỏi tầm kiểm soát, hãy xem màn hình “Trợ giúp”.
