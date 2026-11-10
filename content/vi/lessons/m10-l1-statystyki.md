---
id: m10.l1
module: m10
order: 1
title: "Chỉ số HUD"
sub: "VPIP và PFR đo gì và cần bao nhiêu ván bài"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Bạn đang ở {{t:big-blind|big blind}}. Hai người chơi limp, bạn {{t:check|check}} và xem flop. Ván này có làm tăng {{t:vpip}} của bạn không?"
    options:
      - { text: "Không: bạn không tự nguyện bỏ thêm dù chỉ một {{t:chips|chip}}", correct: true, why: "{{t:vpip}} chỉ tính các khoản tự nguyện bỏ vào trước flop: {{t:call}} hoặc {{t:raise}}. {{t:big-blind|Big blind}} là khoản bắt buộc, còn {{t:check}} không tốn gì." }
      - { text: "Có: bạn chơi flop, nên ván này được tính là đã chơi", why: "Xem flop là chưa đủ. {{t:vpip}} chỉ tăng khi chính bạn bỏ thêm {{t:chips|chip}} trước flop." }
      - { text: "Có, và nó cũng làm tăng {{t:pfr}}", why: "{{t:pfr}} chỉ tăng khi có {{t:raise|tố}} trước flop. Ở đây không ai {{t:raise|tố}}, còn bạn chỉ {{t:check|check}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Một người quen cho bạn xem ghi chú: đối thủ có {{t:vpip}} {{n:hud.ex.wrong.vpip}} và {{t:pfr}} {{n:hud.ex.wrong.pfr}}. Bạn nghĩ sao về điều này?"
    options:
      - { text: "Điều này không thể xảy ra: {{t:pfr}} không thể lớn hơn {{t:vpip}}", correct: true, why: "Mỗi lần {{t:raise|tố}} trước flop cũng là một khoản tự nguyện bỏ vào, nên được tính ở cả hai chỉ số. {{t:pfr}} luôn nhỏ hơn hoặc bằng {{t:vpip}}; người quen của bạn đã nhầm số." }
      - { text: "Đây là người chơi rất hung hăng, gần như không bao giờ {{t:call|theo}}", why: "Người chơi không bao giờ {{t:call|theo}} có {{t:pfr}} bằng {{t:vpip}}, nhưng không lớn hơn. {{t:pfr}} lớn hơn nghĩa là ghi chép bị sai." }
      - { text: "Đây là người chơi thụ động", why: "Sự thụ động thể hiện ở chỗ {{t:pfr}} nhỏ hơn nhiều so với {{t:vpip}}, chứ không phải lớn hơn." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Đối thủ có {{t:vpip}} {{n:mda.rec.vpip}} và {{t:pfr}} {{n:mda.rec.pfr}}. Anh ta làm gì với những ván mình chơi nhưng không {{t:raise|tố}}?"
    options:
      - { text: "{{t:call|Theo}} hoặc limp: đó là phần chênh lệch {{n:mda.rec.gap}} số ván", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Những ván này anh ta bỏ vào {{t:pot}} mà không {{t:raise|tố}}: limp hoặc {{t:call|theo}} các lần {{t:open|mở pot}} của người khác." }
      - { text: "{{t:fold|Bỏ bài}} trước flop", why: "Các ván bỏ bài trước flop hoàn toàn không được tính vào {{t:vpip}}. Chênh lệch {{t:vpip}} − {{t:pfr}} là các ván được chơi mà không {{t:raise|tố}}." }
      - { text: "Chơi chúng bằng {{t:all-in|all-in}}", why: "All-in trước flop cũng là {{t:raise|tố}}, nên sẽ làm tăng {{t:pfr}}. Phần chênh lệch là các ván chỉ {{t:call|theo}} hoặc limp." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Sau {{n:hud.se.ex.n}} ván, đối thủ có {{t:vpip}} {{n:hud.se.ex.p}}. Sai số chuẩn của con số này là bao nhiêu điểm phần trăm? Hãy nhập một số."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Với độ tin cậy khoảng {{n:var.conf95}}, {{t:vpip}} thực sự nằm trong phạm vi ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Sau {{n:hud.se.ex.n}} ván, {{t:vpip}} của đối thủ là {{n:hud.se.ex.p}}. Bạn biết gì về {{t:vpip}} thực sự của anh ta?"
    options:
      - { text: "Với độ tin cậy khoảng {{n:var.conf95}}, nó nằm trong khoảng từ {{n:hud.ci.ex.low}} đến {{n:hud.ci.ex.high}}", correct: true, why: "Sai số chuẩn khoảng {{n:hud.se.ex}}, còn khoảng tin cậy {{n:var.conf95}} là ± {{n:var.z95}} lần sai số, tức ± {{n:hud.ci.ex}}. Bạn biết đối thủ không ở mức cực đoan, nhưng chưa phân biệt được các kiểu người chơi chỉ chênh nhau vài điểm." }
      - { text: "Nó đúng bằng {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} ván vẫn là một mẫu nhỏ: sai số khoảng {{n:hud.se.ex}}, còn khoảng tin cậy {{n:var.conf95}} là ± {{n:hud.ci.ex}}." }
      - { text: "Không biết gì: trước một nghìn ván, chỉ số không có ý nghĩa", why: "Nói quá rồi. Khoảng từ {{n:hud.ci.ex.low}} đến {{n:hud.ci.ex.high}} đã loại trừ người chơi rất chặt và người chơi rất lỏng. Chỉ còn thiếu độ chính xác." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Sau vài trăm ván, đối thủ có {{n:hud.se.f3b.n}} cơ hội phản ứng với 3-bet và đã {{t:fold|bỏ bài}} trong {{n:hud.se.f3b.p}} số lần đó. Bạn biết gì về chỉ số fold to 3-bet của anh ta?"
    options:
      - { text: "Gần như không gì: với độ tin cậy khoảng {{n:var.conf95}}, nó nằm trong khoảng từ {{n:hud.ci.f3b.low}} đến {{n:hud.ci.f3b.high}}", correct: true, why: "Cái được tính là số cơ hội, không phải số ván. Sai số là √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, còn khoảng tin cậy {{n:var.conf95}} là ± {{n:hud.ci.f3b}}. Khoảng này chứa được cả người chơi gần như luôn phòng thủ lẫn người gần như luôn {{t:fold|bỏ bài}}." }
      - { text: "{{t:fold|Bỏ bài}} đúng {{n:hud.se.f3b.p}} số lần, vì mẫu có vài trăm ván", why: "Vài trăm ván chỉ là {{n:hud.se.f3b.n}} cơ hội cho chỉ số này. Sai số được tính từ số cơ hội: ra khoảng {{n:hud.se.f3b}}." }
      - { text: "{{t:fold|Bỏ bài}} quá thường xuyên, vì trên {{n:hud.f3b.low}} là sai lầm", why: "{{n:hud.se.f3b.p}} không phải là “trên {{n:hud.f3b.low}}”, và với {{n:hud.se.f3b.n}} cơ hội thì sai số khoảng {{n:hud.se.f3b}}. Từ một mẫu như vậy, bạn không rút ra được kết luận." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Đối thủ mới, {{n:hud.ex.few.hands}} ván trong {{t:hud|HUD}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. Bạn chơi với anh ta thế nào?"
    options:
      - { text: "Như với một người chơi chưa biết, theo chiến lược nền; tôi tiếp tục thu thập thêm ván", correct: true, why: "Dưới khoảng {{n:hud.hands.random}} ván, chỉ số mang tính ngẫu nhiên: vài ván bài đẹp liên tiếp là đủ tạo ra {{t:vpip}} như vậy. Kiểu người chơi lộ ra sơ bộ sau khoảng {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} ván, còn {{t:vpip}} và {{t:pfr}} ổn định sau khoảng {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} ván." }
      - { text: "Như với một {{t:maniac|maniac}}: tôi {{t:call|theo}} rộng", why: "{{t:maniac|Maniac}}, tức người chơi rất lỏng và hung hăng, chỉ là một khả năng: sau {{n:hud.ex.few.hands}} ván, đó có thể là bất kỳ kiểu nào. {{t:call|Theo}} rộng dựa trên sự ngẫu nhiên sẽ khiến bạn mất tiền khi đối thủ hóa ra là một {{t:regular|reg}} bình thường, tức người chơi thường xuyên, chơi khá chắc tay." }
      - { text: "Như với một {{t:nit|nit}}, vì đa số người chơi là nit", why: "Điều đó bạn cũng không biết: {{t:nit}}, tức người chơi rất chặt, chỉ là một trong các kiểu. Không có mẫu thì không có nhận định, nên bạn quay về chiến lược nền." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Chỉ số nào cần nhiều ván nhất để đáng tin cậy?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "Cơ hội cho fold to 3-bet chỉ xuất hiện khi đối thủ đã {{t:open|mở pot}} và bị 3-bet, tức là hiếm. Vì vậy bạn cần khoảng {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} ván thay vì {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "{{t:vpip}} có cơ hội ở mọi ván, nên ổn định nhanh nhất: sau khoảng {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} ván." }
      - { text: "{{t:pfr}}", why: "{{t:pfr}}, giống {{t:vpip}}, có cơ hội ở mọi ván mà người chơi có thể {{t:raise|tố}}, nên ổn định nhanh." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "Phòng chơi của bạn cấm phần mềm {{t:hud|HUD}} tại bàn. Bạn làm gì?"
    options:
      - { text: "Tôi chơi không dùng {{t:hud|HUD}}, và sau {{t:session|phiên chơi}} tôi xem lại cơ sở dữ liệu ván bài của mình và ghi chú về các đối thủ quen mặt", correct: true, why: "Quy định của phòng chơi có tính ràng buộc: phần mềm bị cấm có thể khiến tài khoản bị đóng. Bạn có thể xem chỉ số từ lịch sử ván bài của chính mình sau khi chơi, và một số phòng chơi hiển thị chỉ số riêng ngay tại bàn." }
      - { text: "Tôi vẫn dùng {{t:hud|HUD}} dù bị cấm, vì nó mang lại lợi thế", why: "Nếu vi phạm quy định, phòng chơi có thể đóng tài khoản và giữ lại tiền của bạn. Lợi thế đó không đáng." }
      - { text: "Tôi từ bỏ {{t:exploit|khai thác}}, vì không có {{t:hud|HUD}} thì không thể làm được", why: "Vẫn làm được: nhận định từ việc xem lại ván bài sau {{t:session|phiên chơi}} và dữ liệu về tập người chơi ở {{t:stakes|mức cược}} của bạn cũng cho thấy nên lệch khỏi chiến lược nền theo hướng nào." }
---
{{t:exploit|Khai thác}} là việc lệch khỏi chiến lược nền của các mô-đun 3–9 theo hướng sai lầm của đối thủ. Để biết nên lệch theo hướng nào, bạn cần dữ liệu. Khi chơi online, dữ liệu đó đến từ {{t:hud}}: phần mềm ghi lại các ván bài và hiển thị chỉ số của từng đối thủ tại bàn.

## {{t:vpip}} và {{t:pfr}}

Hai con số quan trọng nhất mô tả lối chơi trước flop:

- **{{t:vpip}}**: tỷ lệ phần trăm số ván mà người chơi tự nguyện bỏ {{t:chips|chip}} vào {{t:pot}} trước flop, tức là {{t:call|theo}} hoặc {{t:raise|tố}}. Blind không được tính, vì đó là khoản bắt buộc.
- **{{t:pfr}}**: tỷ lệ phần trăm số ván mà người chơi {{t:raise|tố}} trước flop: {{t:open|mở pot}}, 3-bet hoặc 4-bet.

Mỗi lần {{t:raise|tố}} cũng là một khoản tự nguyện bỏ vào, nên {{t:pfr}} không bao giờ vượt quá {{t:vpip}}. Chênh lệch {{t:vpip}} − {{t:pfr}} là các ván mà người chơi chỉ {{t:call|theo}} hoặc limp. Người chơi có {{t:vpip}} {{n:mda.rec.vpip}} và {{t:pfr}} {{n:mda.rec.pfr}} chơi nhiều ván, nhưng trong {{n:mda.rec.gap}} tổng số ván, anh ta vào {{t:pot}} mà không {{t:raise|tố}}.

## Các chỉ số khác

| Chỉ số | Đo gì | Cơ hội |
|---|---|---|
| 3-bet | tần suất {{t:raise|tố}} lần {{t:open|mở pot}} của người khác | có người trước anh ta đã {{t:open|mở pot}} |
| Fold to 3-bet | tần suất {{t:fold|bỏ bài}} trước 3-bet | anh ta đã {{t:open|mở pot}} và bị 3-bet |
| C-bet | tần suất cược ở flop sau lần {{t:raise|tố}} của chính mình | anh ta là {{t:aggressor|người tấn công}} trước flop |
| Fold to c-bet | tần suất {{t:fold|bỏ bài}} trước c-bet | anh ta bị c-bet |
| {{t:wtsd}} | tần suất đi đến showdown sau flop | anh ta đã xem flop |

Cột cuối cùng rất quan trọng: chỉ số chỉ thay đổi khi đối thủ có cơ hội. {{t:vpip}} có cơ hội ở mọi ván, còn fold to 3-bet chỉ có khi đối thủ đã {{t:open|mở pot}} và bị 3-bet.

## Cần bao nhiêu ván

Mỗi ván là một mẫu ngẫu nhiên từ chiến lược của đối thủ, nên chỉ số có sai số như mọi giá trị trung bình mẫu. Bạn tính nó bằng công thức sai số của trung bình mẫu (ở mô-đun 12, bạn sẽ dùng chính công thức này để tính sai số của {{t:winrate}}):

```formula
sai số = √(p × (1 − p) ÷ n)
khoảng tin cậy {{n:var.conf95}} = p ± {{n:var.z95}} × sai số
```

Ở đây p là tỷ lệ phần trăm (ví dụ {{t:vpip}}), còn n là số cơ hội. Sau {{n:hud.se.ex.n}} ván với {{t:vpip}} {{n:hud.se.ex.p}}, sai số khoảng {{n:hud.se.ex}}, nên với độ tin cậy khoảng {{n:var.conf95}}, {{t:vpip}} thực sự nằm trong khoảng **từ {{n:hud.ci.ex.low}} đến {{n:hud.ci.ex.high}}**. Fold to 3-bet {{n:hud.se.f3b.p}} từ {{n:hud.se.f3b.n}} cơ hội cho khoảng từ {{n:hud.ci.f3b.low}} đến {{n:hud.ci.f3b.high}}: gần như không nói lên gì.

Các huấn luyện viên đưa ra những ngưỡng tương tự:

- dưới khoảng {{n:hud.hands.random}} ván, chỉ số mang tính ngẫu nhiên; bạn chơi như với người chơi chưa biết;
- kiểu người chơi lộ ra sơ bộ sau {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} ván, còn {{t:vpip}} và {{t:pfr}} ổn định sau khoảng {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} ván;
- 3-bet cần khoảng {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} ván, fold to 3-bet khoảng {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} ván, các chỉ số ở turn và river còn cần nhiều hơn nữa.

:::note Khi phòng chơi cấm {{t:hud|HUD}}
Một số phòng chơi (theo các tài liệu đào tạo, kể cả các phòng lớn ở {{t:stakes|mức cược}} thấp) cấm phần mềm {{t:hud|HUD}} tại bàn. Khi đó, bạn xem lại lịch sử ván bài của chính mình sau {{t:session|phiên chơi}}, ghi chú về các đối thủ quen mặt và sử dụng dữ liệu về tập người chơi ở {{t:stakes|mức cược}} của mình (bài 2). Các ngưỡng mẫu được lấy từ hai tài liệu đào tạo đưa ra số ván khác nhau. Công thức sai số là phép tính toán học.
:::
