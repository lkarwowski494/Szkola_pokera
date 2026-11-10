---
id: m8.l4
module: m8
order: 4
title: "Bắt tháu cáy"
sub: "Nên theo bằng những tay bài nào ở river"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Bạn đang bảo vệ {{t:big-blind|mù lớn}}. Ở river bạn {{t:check|xem bài}}, còn Button {{t:bet|cược}} cả {{t:pot|pot}}. Không ra thêm lá bích nào. {{t:pair|Đôi}} chín của bạn đóng vai trò gì?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: chỉ thắng được các tay {{t:bluff|tháu cáy}}", correct: true, why: "Khi cược cả {{t:pot|pot}}, Button cược {{t:value|lấy giá trị}} với ít nhất một lá K, và {{t:bluff|tháu cáy}} chủ yếu bằng các {{t:draw|bài chờ}} hụt. {{t:pair|Đôi}} của bạn thua mọi tay {{t:value|lấy giá trị}} của đối thủ và thắng mọi tay {{t:bluff|tháu cáy}}." }
      - { text: "Tay bài {{t:value|lấy giá trị}}", why: "Tay bài {{t:value|lấy giá trị}} thắng những tay sẽ trả tiền hoặc cược {{t:value|lấy giá trị}}. {{t:pair|Đôi}} chín thua mọi lá K và mọi tay mạnh hơn của Button." }
      - { text: "Tay bài không có cơ hội", why: "{{t:pair|Đôi}} chín thắng các {{t:draw|bài chờ}} hụt, và Button {{t:bluff|tháu cáy}} bằng chính những tay đó. Nó có cơ hội, nhưng chỉ trước các tay {{t:bluff|tháu cáy}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. {{t:pot|Pot}} có {{n:ex.pot}}, đối thủ {{t:bet|cược}} cả {{t:pot|pot}}: {{n:ex.bet.pot}}. Bạn có bluff-catcher. Ít nhất bao nhiêu phần trăm số lần cược của đối thủ phải là {{t:bluff|tháu cáy}} thì {{t:call|theo}} mới có lời? Hãy nhập một số."
    answer: eq.bet-pot
    explanation: "Equity của bạn là tỷ lệ {{t:bluff|tháu cáy}} trong các lần cược của đối thủ. Bạn bỏ thêm {{n:ex.bet.pot}} để thắng {{t:pot|pot}} sau khi {{t:call|theo}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. Đây cũng chính là tỷ lệ {{t:bluff|tháu cáy}} ở trạng thái cân bằng trong bài học trước."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Đối thủ {{t:bet|cược}} nửa {{t:pot|pot}}. Bạn có bluff-catcher và ước tính {{t:bluff|tháu cáy}} chiếm khoảng {{n:catch.ex.bluffs-low}} số lần cược của đối thủ. Bạn làm gì?"
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Bạn cần {{n:eq.bet-half}} equity, mà bluff-catcher của bạn chỉ thắng trong {{n:catch.ex.bluffs-low}} trường hợp. {{t:call|Theo}} sẽ lỗ." }
      - { text: "{{t:call|Theo}}, vì {{t:mdf}} là {{n:mdf.bet-half}}", why: "{{t:mdf}} bảo vệ bạn trước đối thủ {{t:bluff|tháu cáy}} đủ thường xuyên. Khi có quá ít {{t:bluff|tháu cáy}}, {{t:call|theo}} bằng bluff-catcher là đem tiền cho đối thủ." }
      - { text: "{{t:raise|Tố}}", why: "Tay bài của bạn chỉ thắng các tay {{t:bluff|tháu cáy}}. Sau khi bạn {{t:raise|tố}}, các tay {{t:bluff|tháu cáy}} sẽ {{t:fold|bỏ bài}}, còn các tay {{t:value|giá trị}} sẽ trả tiền: bạn thua nhiều hơn." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Đối thủ {{t:bet|cược}} cả {{t:pot|pot}}. Bạn có bluff-catcher và ước tính {{t:bluff|tháu cáy}} chiếm khoảng {{n:catch.ex.bluffs-high}} số lần cược của đối thủ. Bạn làm gì?"
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Bạn cần {{n:eq.bet-pot}} equity, còn {{t:bluff|tháu cáy}} chiếm {{n:catch.ex.bluffs-high}}. Đối thủ {{t:bluff|tháu cáy}} nhiều hơn mức cân bằng, nên {{t:call|theo}} sẽ có lời." }
      - { text: "{{t:fold|Bỏ bài}}, vì mức cược lớn", why: "Cược lớn đẩy giá lên {{n:eq.bet-pot}}, nhưng {{t:bluff|tháu cáy}} còn nhiều hơn thế. Điều quan trọng là so sánh hai con số này, chứ không phải chỉ nhìn kích thước cược." }
      - { text: "{{t:raise|Tố}} all-in", why: "Bluff-catcher không {{t:raise|tố}}: các tay {{t:bluff|tháu cáy}} sẽ {{t:fold|bỏ bài}}, và chỉ những tay mạnh hơn bạn mới trả tiền." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "Đối thủ cược cả {{t:pot|pot}} ở river và {{t:bluff|tháu cáy}} đúng trong {{n:bluff.share.bet-pot}} trường hợp. Bạn kiếm được bao nhiêu khi {{t:call|theo}} bằng bluff-catcher?"
    options:
      - { text: "Không gì cả: {{t:call|theo}} và {{t:fold|bỏ bài}} cho kết quả như nhau", correct: true, why: "Tỷ lệ {{t:bluff|tháu cáy}} bằng {{n:eq.bet-pot}} đúng bằng giá của việc {{t:call|theo}}. Phần thắng khi gặp {{t:bluff|tháu cáy}} bù đúng phần thua trước bài giá trị, nên đối thủ không để bạn kiếm lời, dù bạn {{t:call|theo}} hay {{t:fold|bỏ bài}}." }
      - { text: "Có lời, vì có nhiều {{t:bluff|tháu cáy}}", why: "Chúng chỉ nhiều đúng bằng mức giá. Bạn chỉ có lời khi đối thủ {{t:bluff|tháu cáy}} thường xuyên hơn {{n:eq.bet-pot}}." }
      - { text: "Lỗ, vì bài giá trị nhiều hơn {{t:bluff|tháu cáy}}", why: "Bài giá trị nhiều hơn, nhưng khi {{t:call|theo}}, bạn mạo hiểm {{n:ex.bet.pot}} để thắng {{n:ex.pot}} + {{n:ex.bet.pot}}. Với tỷ lệ {{t:bluff|tháu cáy}} như vậy, hai điều này cân bằng nhau." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Không ra thêm lá bích nào. Ở river bạn {{t:check|xem bài}}, còn Button {{t:bet|cược}} cả {{t:pot|pot}}. Bạn có {{t:top-pair|đôi cao nhất}} với kicker 10. Với tay nào trong hai tay dưới đây thì {{t:call|theo}} tốt hơn?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Không có lá bích, bạn không chặn các {{t:flush-draw|bài chờ thùng}} hụt, tức những tay {{t:bluff|tháu cáy}} chính của Button (vd. J-10 bích). Trong {{t:range|dải bài}} của đối thủ còn lại nhiều tay {{t:bluff|tháu cáy}} hơn mà bạn thắng được." }
      - { text: "[[Kc Ts]]", why: "Lá 10 bích lấy đi của Button một phần các {{t:draw|bài chờ}} hụt mà đối thủ dùng để {{t:bluff|tháu cáy}} (vd. J-10 bích). Đối thủ còn lại tương đối nhiều bài giá trị hơn, nên {{t:call|theo}} kém hơn." }
      - { text: "Không khác gì", why: "Sức mạnh khi showdown là như nhau, nhưng lá bích trong tay bạn chặn các tay {{t:bluff|tháu cáy}} của Button. Điều đó thay đổi việc bạn thực sự đang đối đầu với những gì." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Lá cơ thứ ba ra ở river. Bạn {{t:check|xem bài}}, còn Button {{t:bet|cược}} cả {{t:pot|pot}}. Bạn có {{t:pair|đôi}} chín. Với tay nào trong hai tay dưới đây thì {{t:call|theo}} tốt hơn?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "Lá A cơ chặn {{t:flush|thùng}} A, một trong những tay {{t:value|giá trị}} mạnh nhất của Button. Khi bạn chặn bài giá trị của đối thủ, trong các lần cược của họ sẽ còn lại nhiều {{t:bluff|tháu cáy}} hơn." }
      - { text: "[[Ad 9c]]", why: "Cùng một {{t:pair|đôi}}, nhưng bạn không chặn {{t:flush|thùng}} nào. Button vẫn có đủ mọi tay thùng, và bạn thua tất cả." }
      - { text: "Không khác gì", why: "Khi showdown, hai tay mạnh như nhau, nhưng lá A cơ lấy đi của Button một phần các tay {{t:value|giá trị}}." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Không ra thêm lá bích nào. Ở river bạn {{t:check|xem bài}}, còn Button {{t:bet|cược}} nửa {{t:pot|pot}}. Bạn làm gì?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Lá cao nhất của bạn chỉ là 7. Bạn thua cả phần lớn các tay {{t:bluff|tháu cáy}} của Button (Q đi cùng lá bích, J đi cùng lá bích), nên đây không phải bluff-catcher. Bạn bảo vệ bằng những tay khác." }
      - { text: "{{t:call|Theo}}, vì giá tốt", why: "Giá ({{n:eq.bet-half}}) không giúp được một tay bài thua gần như mọi thứ, kể cả các tay {{t:bluff|tháu cáy}}." }
      - { text: "{{t:raise|Tố}} để {{t:bluff|tháu cáy}}", why: "{{t:raise|Tố}} {{t:bluff|tháu cáy}} ở river là lối chơi nâng cao và rủi ro. Bỏ một tay bài không có cơ hội vừa đơn giản hơn vừa tốt hơn." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. Đối thủ {{t:bet|cược}} nửa {{t:pot|pot}}. {{t:mdf}} là {{n:mdf.bet-half}}. Bạn ưu tiên bảo vệ những tay nào trước?"
    options:
      - { text: "Những bluff-catcher tốt nhất: thắng được {{t:bluff|tháu cáy}} và có {{t:blocker|bài chặn}} tốt", correct: true, why: "Bạn bảo vệ những tay thắng được {{t:bluff|tháu cáy}}, và trong số các tay mạnh tương đương, bạn chọn những tay chặn bài giá trị của đối thủ và không chặn các tay {{t:bluff|tháu cáy}} của họ. Bạn {{t:fold|bỏ}} những tay thua cả {{t:bluff|tháu cáy}}." }
      - { text: "Ngẫu nhiên {{n:mdf.bet-half}} {{t:range|dải bài}}", why: "{{t:mdf}} cho biết cần bảo vệ bao nhiêu, chứ không cho biết bằng tay nào. Bảo vệ ngẫu nhiên là trả tiền bằng những tay không bao giờ thắng." }
      - { text: "Chỉ những tay {{t:value|giá trị}}", why: "Khi đó bạn bảo vệ quá ít, và đối thủ kiếm lời bằng cách {{t:bluff|tháu cáy}} với bất kỳ lá bài nào. Để đạt {{t:mdf}}, bạn bổ sung những bluff-catcher tốt nhất." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Vì sao với bluff-catcher ở river, bạn {{t:call|theo}} chứ không {{t:raise|tố}}?"
    options:
      - { text: "Vì sau khi bạn {{t:raise|tố}}, các tay {{t:bluff|tháu cáy}} sẽ {{t:fold|bỏ bài}}, và chỉ những tay mạnh hơn trả tiền", correct: true, why: "Tay bài của bạn chỉ thắng các tay {{t:bluff|tháu cáy}}. {{t:raise|Tố}} đẩy chính những tay đó ra và giữ lại những tay mà bạn thua." }
      - { text: "Vì không được phép {{t:raise|tố}} ở river", why: "Được phép. Chỉ là {{t:raise|tố}} bằng bluff-catcher biến nó thành {{t:bluff|tháu cáy}} trước những tay sẽ không {{t:fold|bỏ bài}}." }
      - { text: "Vì {{t:call|theo}} luôn rẻ hơn", why: "Vấn đề không phải chi phí, mà là ai còn ở lại ván bài. Sau khi bạn {{t:raise|tố}}, những tay còn lại là những tay thắng bạn." }
---
Giờ bạn ngồi ở phía bên kia: đối thủ là người cược ở river, còn bạn có tay bài trung bình. Thường gặp nhất sẽ là **bluff-catcher**, tức tay bài thua mọi tay {{t:value|giá trị}} của đối thủ, nhưng thắng các tay {{t:bluff|tháu cáy}} của họ.

## Equity của bạn là các tay {{t:bluff|tháu cáy}} của đối thủ

Bluff-catcher thắng đúng vào những lúc đối thủ {{t:bluff|tháu cáy}}. Vì vậy equity của nó là tỷ lệ {{t:bluff|tháu cáy}} trong các lần cược của đối thủ. Bạn {{t:call|theo}} khi tỷ lệ này lớn hơn equity cần thiết từ M2:

| Mức cược của đối thủ | Equity cần thiết ({{t:bluff|tháu cáy}} ít nhất) |
|---|---|
| 1/3 {{t:pot|pot}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|pot}} | {{n:eq.bet-half}} |
| Cả {{t:pot|pot}} | {{n:eq.bet-pot}} |

Khi đối thủ {{t:bluff|tháu cáy}} đúng theo tỷ lệ như trong bài học trước ({{n:bluff.share.bet-pot}} khi cược cả {{t:pot|pot}}), {{t:call|theo}} hòa vốn. Khi họ {{t:bluff|tháu cáy}} thường xuyên hơn, bạn {{t:call|theo}}; khi ít hơn, bạn {{t:fold|bỏ bài}}. Các con số chưa tính rake; rake làm equity cần thiết tăng lên một chút.

## Bảo vệ bao nhiêu, và bằng tay nào

Cần bảo vệ bao nhiêu thì {{t:mdf}} ở M6 đã cho biết: trước mức cược nửa {{t:pot|pot}}, khoảng **{{n:mdf.bet-half}}** {{t:range|dải bài}}. Bài học này trả lời câu hỏi thứ hai: **bằng những tay nào**. Bạn {{t:call|theo}} bằng những bluff-catcher tốt nhất: trong số các tay mạnh tương đương, bạn chọn những tay có {{t:blocker|bài chặn}} tốt hơn; bạn {{t:fold|bỏ}} những tay thua cả {{t:bluff|tháu cáy}}.

Bluff-catcher tốt hơn là tay:

- thắng được nhiều tay {{t:bluff|tháu cáy}} hơn ({{t:pair|đôi}} tốt hơn chỉ một lá cao),
- chặn các tay {{t:value|giá trị}} của đối thủ,
- không chặn các tay {{t:bluff|tháu cáy}} của đối thủ.

## {{t:blocker|Bài chặn}} khi {{t:call|theo}}

Đây là hình ảnh phản chiếu của bài học trước. Khi không ra thêm lá bích nào, đối thủ {{t:bluff|tháu cáy}} bằng các {{t:flush-draw|bài chờ thùng}} hụt. Lá bích trong tay bạn lấy đi của họ một phần các tay {{t:bluff|tháu cáy}}, nên {{t:call|theo}} kém hơn. Khi {{t:flush|thùng}} đã thành, lá A cùng chất đó trong tay bạn lấy đi của họ những tay thùng mạnh nhất, nên {{t:call|theo}} tốt hơn.

## Đừng tố bằng bluff-catcher

Sau khi bạn {{t:raise|tố}}, các tay {{t:bluff|tháu cáy}} sẽ {{t:fold|bỏ bài}}, và chỉ những tay thắng bạn mới trả tiền. Với bluff-catcher, bạn {{t:call|theo}} hoặc {{t:fold|bỏ bài}}.

:::note Khi đối thủ hiếm khi {{t:bluff|tháu cáy}}
Những nguyên tắc này giả định đối thủ {{t:bluff|tháu cáy}} xấp xỉ ở mức cân bằng. Trước người chơi hiếm khi {{t:bluff|tháu cáy}} bằng mức cược lớn ở river, bạn {{t:fold|bỏ bài}} thường xuyên hơn mức {{t:mdf}} chỉ ra: khi số tay {{t:bluff|tháu cáy}} ít hơn mức giá đòi hỏi, {{t:call|theo}} sẽ lỗ (phép tính trong bài học này). Các nguyên tắc chọn bluff-catcher theo {{t:blocker|bài chặn}} lấy từ tài liệu đào tạo và các phân tích solver (lối chơi ở river, {{t:blocker|bài chặn}}): trong số các bluff-catcher (những tay dù sao cũng chỉ thắng các tay {{t:bluff|tháu cáy}}), solver chọn {{t:call|theo}} dựa vào {{t:blocker|bài chặn}} nhiều hơn là chỉ dựa vào sức mạnh tay bài.
:::
