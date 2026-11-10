---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Nhận ra nó trước khi nó chi phối quyết định của bạn"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Lần thứ ba trong một giờ, đối thủ trúng một lá river cứu họ. Bạn cảm thấy ván bài thật bất công và như có ai đó cố tình chơi xấu bạn. Theo cách phân loại trong bài học này, đây là kiểu tilt nào?"
    options:
      - { text: "Tilt vì bất công", correct: true, why: "Bad beat, cooler và việc đối thủ trúng bài ở river tạo cảm giác rằng poker thật bất công. Đây là yếu tố kích hoạt điển hình của tilt vì bất công." }
      - { text: "Tilt vì mắc lỗi", why: "Tilt vì mắc lỗi liên quan đến sai lầm của chính bạn. Ở đây bạn tức giận vì vận may, chứ không phải vì quyết định của mình." }
      - { text: "Tilt vì tuyệt vọng", why: "Tuyệt vọng là nhu cầu mạnh mẽ muốn gỡ lại ({{t:session|phiên chơi}} kéo dài, {{t:stakes|mức cược}} cao hơn). Còn ở đây, lúc này vấn đề là cảm giác bị đối xử bất công." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Vẫn đối thủ đó tố vào blind của bạn lần thứ tư liên tiếp. Bạn quyết định lần tới sẽ {{t:raise|tố}} lại họ với bất kỳ tay bài nào, để cho họ biết tay. Đây là kiểu tilt nào?"
    options:
      - { text: "Tilt vì trả thù", correct: true, why: "Sự thiếu tôn trọng, sự hung hăng liên tục của đối thủ và mong muốn “cho họ biết tay” là những yếu tố kích hoạt tilt vì trả thù. Lúc này, mong muốn trả đũa bắt đầu đưa ra quyết định thay cho tính toán." }
      - { text: "Tilt vì cho rằng mình đáng được thắng", why: "Kiểu tilt này xuất phát từ niềm tin rằng bạn xứng đáng thắng vì bạn giỏi hơn. Còn ở đây là chuyện trả đũa một đối thủ cụ thể." }
      - { text: "Đây không phải tilt, chỉ là điều chỉnh trước một đối thủ hung hăng", why: "Điều chỉnh nghĩa là phòng thủ rộng hơn bằng những tay bài được cân nhắc kỹ. “Bất kỳ tay bài nào, để cho họ biết tay” là cảm xúc, không phải chiến lược." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Bạn đang thua và nghĩ: “Thêm một giờ nữa, nếu không ổn thì mình sẽ lên {{t:stakes|mức cược}} cao hơn và gỡ lại tất cả một lần”. Đây là kiểu tilt nào?"
    options:
      - { text: "Tilt vì tuyệt vọng", correct: true, why: "Nhu cầu gỡ lại dẫn đến những {{t:session|phiên chơi}} rất dài, cố ép hành động và nhảy vọt lên {{t:stakes|mức cược}} cao hơn. Đó là tín hiệu để dừng chơi." }
      - { text: "Tilt vì ghét thua", why: "Gần đúng, nhưng ở đây còn có thêm kế hoạch gỡ lại khoản thua bằng {{t:stakes|mức cược}} cao hơn và chơi lâu hơn. Đó là đặc điểm của tuyệt vọng." }
      - { text: "Một kế hoạch hợp lý, vì {{t:stakes}} cao hơn sẽ gỡ lại khoản thua nhanh hơn", why: "{{t:stakes}} cao hơn cũng làm tăng biến động, trong khi bạn lại đang ra quyết định trong trạng thái tồi. Lên mức cao hơn sau khi thua chính là điều ngược lại với việc quản lý {{t:bankroll|bankroll}} thận trọng (bài học về bankroll và rủi ro)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "Bạn đã {{t:fold|bỏ}} tay bài tốt nhất và từ lúc đó không thể ngừng nghĩ về nó. Bạn tức giận với bản thân và chơi ngày càng tệ. Đây là kiểu tilt nào?"
    options:
      - { text: "Tilt vì mắc lỗi", correct: true, why: "Tức giận với sai lầm của chính mình là tilt vì mắc lỗi. Nguồn gốc thường là kỳ vọng phi thực tế rằng trong khi học bạn sẽ không mắc sai lầm." }
      - { text: "Tilt vì bất công", why: "Ở đây bạn không đổ lỗi cho vận may mà cho chính mình. Đó là tilt vì mắc lỗi." }
      - { text: "Tilt vì trả thù", why: "Trả thù nhắm vào đối thủ. Ở đây cơn giận liên quan đến quyết định của bạn." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Bạn đang thua một người chơi mà theo bạn là chơi rất tệ, và bạn nghĩ: “Mình chịu học, anh ta thì không, mình phải thắng anh ta mới đúng”. Đây là kiểu tilt nào?"
    options:
      - { text: "Tilt vì cho rằng mình đáng được thắng", correct: true, why: "Niềm tin rằng vì lý do nào đó bạn xứng đáng thắng khiến chiến thắng có vẻ như là tài sản của bạn. Khi một đối thủ “không xứng đáng” lấy mất nó, tilt xuất hiện." }
      - { text: "Tilt vì ghét thua", why: "Kiểu tilt này liên quan đến việc thua nói chung. Ở đây điểm mấu chốt là niềm tin rằng chiến thắng thuộc về bạn." }
      - { text: "Tilt vì mắc lỗi", why: "Vấn đề không phải là sai lầm của bạn, mà là cảm giác rằng bạn xứng đáng thắng." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Sau một bad beat, bạn cảm thấy cơn giận đang dâng lên, nhưng vẫn chơi đúng. Bạn làm gì?"
    options:
      - { text: "Phản ứng ngay: hít thở và dùng một câu đã chuẩn bị sẵn, ví dụ “Đây là {{t:variance}}, hãy tiếp tục chơi tốt”", correct: true, why: "Tilt được điều chỉnh khi nó còn nhỏ và bạn vẫn còn suy nghĩ được. Khi nó lớn lên, nó làm tê liệt khả năng suy nghĩ và việc kiểm soát trở nên bất khả thi." }
      - { text: "Tiếp tục chơi cho đến khi nhận thấy sai lầm đầu tiên", why: "Lúc đó tilt đã lớn hơn và khó dừng hơn. Phản ứng với những tín hiệu đầu tiên là dễ nhất." }
      - { text: "Kìm nén cơn giận và giả vờ như nó không tồn tại", why: "Tốt hơn là nhận ra cảm xúc và đáp lại nguyên nhân của nó bằng một suy nghĩ cụ thể. Chỉ kìm nén thì không loại bỏ được nguyên nhân." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Đã nửa giờ nay bạn chơi những tay bài mà bình thường bạn sẽ {{t:fold|bỏ}}, và chỉ nghĩ đến chuyện gỡ lại. Bạn làm gì?"
    options:
      - { text: "Kết thúc {{t:session|phiên chơi}}", correct: true, why: "Đây là những tín hiệu cho thấy bạn không còn lấy lại được suy nghĩ sáng suốt. Khi đó mục tiêu là dừng lại càng sớm càng tốt, chứ không phải thắng lại số tiền." }
      - { text: "Tiếp tục chơi, nhưng chỉ những tay bài tốt nhất", why: "Trong trạng thái này rất khó giữ quyết tâm, vì cảm xúc đưa ra quyết định thay bạn. Dừng lại thì an toàn hơn." }
      - { text: "Tăng {{t:stakes|mức cược}} để gỡ lại nhanh hơn", why: "Đó chính là tilt vì tuyệt vọng ở dạng thuần túy nhất. {{t:stakes}} cao hơn đi cùng những quyết định tệ hơn sẽ khiến bạn thua nhanh hơn." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Bạn muốn phát hiện tilt sớm hơn. Bạn bắt đầu từ đâu?"
    options:
      - { text: "Từ việc viết ra hồ sơ: điều gì kích hoạt bạn, bạn nghĩ và cảm thấy gì, lối chơi của bạn thay đổi ra sao", correct: true, why: "Mỗi người chơi bị tilt theo một cách hơi khác và vì những lý do khác nhau. Hồ sơ giúp bạn nhận ra tín hiệu trước khi tilt lớn lên: không thể kiểm soát điều mà mình không hiểu." }
      - { text: "Từ việc chơi ở {{t:stakes|mức cược}} cao hơn để rèn luyện bản lĩnh", why: "Áp lực lớn hơn không dạy bạn nhận ra tilt. Trước hết bạn cần biết tilt ở bạn trông như thế nào." }
      - { text: "Từ việc tránh tất cả những đối thủ khiến bạn khó chịu", why: "Không thể tránh được các yếu tố kích hoạt, vì bad beat và những đối thủ hung hăng sẽ luôn xuất hiện. Mục tiêu là nhận ra phản ứng của mình và đáp lại nó." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Lối chơi của bạn có ngày tốt và ngày tệ. Tiến bộ bền vững nhanh nhất nằm ở đâu?"
    options:
      - { text: "Ở việc cải thiện lối chơi tệ nhất (C-game)", correct: true, why: "Tiến bộ giống như cách con sâu bướm di chuyển: một bước tiến ở phía trước (A-game tốt hơn) và một bước ở phía sau (C-game bớt tệ hơn). Loại bỏ những sai lầm tệ nhất cũng giải phóng sự chú ý để học những điều mới." }
      - { text: "Chỉ ở việc mài giũa lối chơi tốt nhất (A-game)", why: "A-game quan trọng, nhưng chính C-game mới gây tốn kém nhiều nhất. Nếu không cải thiện những ngày tệ nhất, tiến bộ ở phía trước dễ bị mất đi ở phía sau." }
      - { text: "Không ở đâu cả, phong độ là chuyện may rủi", why: "Độ dao động của phong độ có thể thu hẹp được: những người chơi kiểm soát tilt tốt có phân bố chất lượng chơi hẹp hơn (tổng quan năm 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Làm sao bạn kiểm tra xem việc rèn luyện {{t:mental-game}}, tức là cách đối phó với tilt, cảm xúc và sự tập trung, có mang lại hiệu quả hay không?"
    options:
      - { text: "So sánh những {{t:session|phiên chơi}} tệ nhất với những phiên tệ nhất trước đây", correct: true, why: "Hãy so sánh những thứ tương đồng: lối chơi tệ nhất với lối chơi tệ nhất trước đây. Tiến bộ còn thể hiện ở việc bạn nhận ra tilt nhanh hơn và kết thúc {{t:session|phiên chơi}} sớm hơn." }
      - { text: "Xem kết quả của tuần vừa qua", why: "Kết quả một tuần chủ yếu là {{t:variance}} (bài học về {{t:variance|phương sai}}). Chất lượng chơi trong những ngày tệ nhất cho bạn biết nhiều hơn." }
      - { text: "So sánh {{t:session|phiên chơi}} tốt nhất với phiên tệ nhất", why: "Phép so sánh đó chỉ cho thấy độ dao động, chứ không cho thấy tiến bộ. Hãy so sánh lối chơi tệ nhất với lối chơi tệ nhất trước đây." }
---
Tilt là sự mất kiểm soát do cảm xúc tiêu cực, thường xảy ra sau những bad beat hoặc một chuỗi thua dài. Nó kết thúc bằng những quyết định kém và khoản thua lớn hơn nhiều so với bình thường. Điều này không hiếm: trong một nghiên cứu khảo sát, {{n:tilt.severe}} người chơi thừa nhận đã bị tilt nặng ít nhất một lần trong sáu tháng gần đây.

## Bảy kiểu tilt

Một cuốn sách uy tín về tâm lý poker mô tả tilt là vấn đề về cơn giận và phân biệt {{n:tilt.types}} kiểu:

| Kiểu | Điều gì kích hoạt nó |
|---|---|
| Vì chuỗi bài xấu | Các kiểu tilt khác quay lại thường xuyên đến mức tâm trí không kịp hồi phục trước {{t:session|phiên chơi}} tiếp theo |
| Vì bất công | Bad beat, cooler, đối thủ trúng bài ở river |
| Vì ghét thua | Bản thân việc thua, ngay cả khi bạn biết đó là {{t:variance}} |
| Vì mắc lỗi | Sai lầm của chính bạn |
| Vì cho rằng mình đáng được thắng | Niềm tin rằng bạn xứng đáng thắng |
| Vì trả thù | Sự thiếu tôn trọng, sự hung hăng liên tục của đối thủ |
| Vì tuyệt vọng | Nhu cầu gỡ lại: chơi marathon, {{t:stakes|mức cược}} cao hơn |

## Nhận ra tín hiệu

Mỗi người bị tilt theo một cách hơi khác nhau. Hãy viết ra **hồ sơ tilt** của bạn: điều gì kích hoạt nó, lúc đó bạn nghĩ và cảm thấy gì, bạn làm gì tại bàn (ví dụ bạn {{t:call|theo}} quá rộng, bạn {{t:raise|tố}} để trả thù). Bạn càng hiểu rõ tín hiệu của mình, bạn càng phát hiện chúng sớm.

## Phản ứng khi còn suy nghĩ được

Khi tilt lớn lên, nó làm tê liệt khả năng suy nghĩ. Vì vậy bạn phản ứng ngay với những tín hiệu đầu tiên:

1. Một hơi thở giúp bạn có chút khoảng cách với cảm xúc.
2. Một câu đã chuẩn bị sẵn để đáp lại nguyên nhân, ví dụ “Người chơi yếu hơn đôi khi cũng phải thắng, đó là {{t:variance}}. Hãy tiếp tục chơi tốt”.
3. Nếu bạn không còn suy nghĩ sáng suốt được nữa, hãy kết thúc {{t:session|phiên chơi}}. Việc bạn dừng sớm hơn, vì một lý do đúng đắn, cũng là tiến bộ.

## A-game và C-game

Lối chơi của bạn có độ dao động: từ tốt nhất (A-game) đến tệ nhất (C-game). Tiến bộ giống như cách con sâu bướm di chuyển: một bước tiến ở phía trước khi lối chơi tốt nhất trở nên tốt hơn, và một bước ở phía sau khi lối chơi tệ nhất trở nên bớt tệ hơn. C-game gây tốn kém nhiều nhất, vì vậy hãy bắt đầu từ đó.

:::note Khi đó không chỉ là tilt
Nếu bạn chơi lâu hơn dự định, cố gỡ lại khoản thua hoặc chơi bằng số tiền bạn không thể để mất, hãy đọc thẻ về chơi có trách nhiệm trong bài học về bankroll.
:::
