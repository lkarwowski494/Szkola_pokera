---
id: m13.l2
module: m13
order: 2
title: "Ôn tập từ ván chơi và luyện tập có mục tiêu"
sub: "Điều gì xảy ra với các lỗi của bạn"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Trong ván chơi, bạn có A♥ K♥ trên {{t:board|bài chung}} Q♥ 7♥ 2♣ và đã mắc lỗi. Trong phần ôn tập, bạn thấy A♠ K♠ trên {{t:board|bài chung}} Q♠ 7♠ 2♦. Quyết định đúng có giống nhau không?"
    options:
      - { text: "Có: tất cả các chất đã được đổi bằng một phép đổi duy nhất", correct: true, why: "Cơ thành bích và nhép thành rô, ở mọi chỗ cùng lúc. Bạn vẫn có {{t:flush-draw|bài chờ thùng}} với lá A và cùng sức mạnh tay bài, nên quyết định không đổi." }
      - { text: "Không: bích mạnh hơn cơ", why: "Trong Texas Hold'em, các chất ngang nhau: chỉ quan trọng là các lá bài có cùng chất hay không, chứ không phải chất nào." }
      - { text: "Không biết, phải tính lại từ đầu", why: "Không cần: đổi tất cả các chất cùng lúc giữ nguyên mọi tay bài và mọi {{t:draw|bài chờ}}. Đây là phép tính chính xác, không phải ước lượng." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Thay đổi nào sau đây KHÔNG giữ nguyên quyết định của tình huống: K♥ Q♥ trên {{t:board|bài chung}} J♥ 8♥ 3♠?"
    options:
      - { text: "K♥ Q♥ trên {{t:board|bài chung}} J♠ 8♠ 3♥", correct: true, why: "Ở đây chỉ đổi chất trên {{t:board|bài chung}}: các lá cơ của bạn không còn khớp với {{t:board|bài chung}} và {{t:flush-draw|bài chờ thùng}} biến mất. Đây đã là một tình huống khác." }
      - { text: "K♠ Q♠ trên {{t:board|bài chung}} J♠ 8♠ 3♥", why: "Đây là một phép đổi duy nhất cho tất cả các lá bài (cơ ↔ bích), nên quyết định giống nhau." }
      - { text: "K♦ Q♦ trên {{t:board|bài chung}} J♦ 8♦ 3♠", why: "Đây là một phép đổi duy nhất (cơ → rô) cho tất cả các lá bài, nên quyết định giống nhau." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Những quyết định nào trong báo cáo được đưa vào ôn tập dưới dạng thẻ?"
    options:
      - { text: "Sai lầm, quyết định thiếu chính xác và quyết định sau khi hết giờ", correct: true, why: "Đúng. Quyết định chấp nhận được không phải là sai lầm, nên không tạo thẻ. Cùng một quy tắc với cùng nhóm tay bài trong cùng một spot chỉ tạo một thẻ, không phải nhiều thẻ." }
      - { text: "Tất cả các quyết định đã được đánh giá", why: "Quyết định phù hợp và chấp nhận được không cần sửa, còn ôn tập là để luyện những gì đã sai." }
      - { text: "Chỉ sai lầm, không tính quyết định thiếu chính xác", why: "Quyết định thiếu chính xác (ví dụ hành động đúng nhưng sai kích cỡ) được tính như sai lầm, nên cũng quay lại trong ôn tập." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "Trong vòng {{n:game.recall.days}} ngày, bạn mắc {{n:game.recall.count}} lỗi trong cùng một nhóm spot (ví dụ phòng thủ {{t:big-blind|big blind}} trước Button). Ứng dụng sẽ làm gì?"
    options:
      - { text: "Đưa cả nhóm trở lại ôn tập: các tay bài mới từ spot đó", correct: true, why: "Đúng: một tình huống riêng lẻ được lặp lại bằng thẻ của nó, còn lỗi lặp lại trong một nhóm sẽ đưa trở lại bài tập từ cả nhóm, với các tay bài mới." }
      - { text: "Không làm gì, thẻ lỗi là đủ", why: "Một thẻ lặp lại một tình huống cụ thể. Lỗi lặp lại trong một nhóm nghĩa là nên luyện nhóm đó rộng hơn." }
      - { text: "Khóa lĩnh vực của mô-đun này", why: "Lĩnh vực đã mở khóa sau các bài học vẫn luôn sẵn sàng. Ứng dụng chỉ thêm phần ôn tập." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Sau một {{t:session|phiên chơi}} vài chục ván, bạn đếm được rằng mình đã vào pot ở gần một nửa số ván. Điều này cho thấy gì?"
    options:
      - { text: "Hiện chưa có gì: mẫu quá nhỏ", correct: true, why: "Ngay cả {{t:vpip}} cũng chỉ đọc được sau khoảng {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} tay bài. Từ một {{t:session|phiên chơi}}, bạn đánh giá được từng quyết định riêng lẻ, nhưng không đánh giá được tần suất của mình." }
      - { text: "Bạn chơi quá lỏng và cần thay đổi", why: "Có thể đúng, có thể không: vài chục ván là quá ít để phân biệt phong cách với cách bài được chia. Hãy xem đánh giá của từng quyết định vào pot." }
      - { text: "Bạn chơi tốt, vì đã thắng nhiều ván", why: "Kết quả không nói lên chất lượng quyết định, và một {{t:session}} không nói lên tần suất." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "Trong một {{t:session|phiên chơi}}, bạn gặp 4-bet hai lần và cả hai lần đều {{t:fold|bỏ bài}}. Bạn đã biết mình {{t:fold|bỏ bài}} trước 4-bet quá thường xuyên chưa?"
    options:
      - { text: "Chưa: điều quan trọng là số cơ hội, và hai là quá ít", correct: true, why: "Một huấn luyện viên chỉ xem chỉ số khi có khoảng {{n:hud.opps.look}} cơ hội, và tin chắc khi có khoảng {{n:hud.opps.sure}}. Hai cơ hội chỉ là nhiễu; hãy đánh giá riêng từng quyết định đó." }
      - { text: "Rồi: bạn {{t:fold|bỏ bài}} trong mọi tình huống", why: "Hai trên hai trông như “luôn luôn”, nhưng với hai cơ hội, ngay cả một chiến lược {{t:fold|bỏ bài}} một nửa số lần cũng thường cho ra kết quả như vậy." }
      - { text: "Rồi, nếu điều đó xảy ra trong một {{t:session|phiên chơi}}", why: "Một {{t:session}} không thêm được gì: số cơ hội vẫn ít." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "Khi nào lĩnh vực chơi “Flop: c-bet” được mở khóa?"
    options:
      - { text: "Sau khi hoàn thành tất cả các bài học của mô-đun", correct: true, why: "Đúng: lĩnh vực chỉ chia các tình huống từ mô-đun đó, nên được mở khóa khi bạn đã biết các quy tắc của nó. Chơi tự do có sẵn ngay từ đầu." }
      - { text: "Sau khi thắng vài {{t:session|phiên chơi}}", why: "Kết quả tính bằng {{t:chips|chip}} không mở khóa gì cả: chủ yếu đó là nhiễu." }
      - { text: "Ngay lập tức, như chơi tự do", why: "Chơi tự do có sẵn từ ngày đầu tiên, còn các lĩnh vực chỉ mở sau các bài học của mô-đun." }
---
Mỗi lỗi trong báo cáo đều quay lại với bạn trong phần ôn tập. Bài học này cho thấy cách thức.

## Cùng tình huống với chất khác

Sai lầm, quyết định thiếu chính xác và quyết định sau khi hết giờ sẽ trở thành thẻ ôn tập. Thẻ cho thấy cùng một tình huống: cùng {{t:position|vị trí}}, hành động và kích cỡ, cùng thứ hạng lá bài. Chỉ có chất thay đổi: ứng dụng đổi chúng bằng một phép đổi duy nhất cho tất cả các lá bài cùng lúc, ví dụ cơ thành bích và bích thành cơ.

Phép đổi như vậy không làm thay đổi sức mạnh của bất kỳ tay bài hay {{t:draw|bài chờ}} nào, vì chỉ quan trọng là các lá bài có cùng chất hay không. Vì vậy quyết định đúng vẫn giống nhau, và bạn học cách nhận ra tình huống chứ không phải ghi nhớ một hình ảnh.

Cùng một quy tắc với cùng nhóm tay bài trong cùng một spot chỉ tạo một thẻ, không phải nhiều thẻ. Thẻ mới từ ván chơi được đưa vào ôn tập trong giới hạn hằng ngày; phần còn lại chờ đến những ngày tiếp theo.

## Khi lỗi lặp lại

Nếu trong vòng {{n:game.recall.days}} ngày bạn có ít nhất {{n:game.recall.count}} sai lầm hoặc quyết định thiếu chính xác trong cùng một nhóm spot, ứng dụng sẽ đưa cả nhóm trở lại ôn tập: các bài tập với tay bài mới từ spot đó. Điều được tính là lỗi quyết định, chứ không phải ván thua. Các ngưỡng này là giá trị khởi đầu, chúng tôi sẽ điều chỉnh dựa trên dữ liệu sử dụng ứng dụng.

## Luyện tập có mục tiêu

Lĩnh vực chơi là một mô-đun của khóa học. Lĩnh vực được mở khóa sau khi bạn hoàn thành tất cả các bài học của mô-đun và chỉ chia các tình huống từ mô-đun đó, ví dụ c-bet sau khi {{t:open|mở pot}} từ Button. Từ báo cáo, bạn có thể đi thẳng đến lĩnh vực có nhiều lỗi nhất.

## Một {{t:session|phiên chơi}} không phải là thống kê

Báo cáo không cho thấy tần suất của bạn, ví dụ bạn vào pot thường xuyên đến mức nào. Ngay cả {{t:vpip}} cũng chỉ đọc được sau khoảng {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} tay bài, còn những tình huống hiếm chỉ xuất hiện vài lần trong một {{t:session|phiên chơi}}. Một huấn luyện viên khuyên nên đếm số cơ hội chứ không phải số ván: họ xem chỉ số khi có khoảng {{n:hud.opps.look}} cơ hội, và tin chắc khi có khoảng {{n:hud.opps.sure}}.

:::note Các quy tắc này đến từ đâu
Đổi chất là phép tính chính xác: thứ hạng tay bài không phân biệt chất. Cỡ mẫu tay bài như trong mô-đun về {{t:exploit|khai thác}} (hai tài liệu đào tạo); số cơ hội: tài liệu đào tạo về cỡ mẫu cho các chỉ số {{t:hud|HUD}}. Các ngưỡng ôn tập là thiết lập của ứng dụng, không có nguồn.
:::
