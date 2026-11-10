---
id: m13.l3
module: m13
order: 3
title: "Xem lại các ván bài từ khi chơi thật"
sub: "Xem lại gì và xem lại thế nào"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Khi đang chơi trực tiếp, bạn gặp một ván mà bạn không biết nên làm gì. Sau đó bạn làm gì với ván này?"
    options:
      - { text: "Ghi chú ngắn và xem lại sau {{t:session|phiên chơi}}", correct: true, why: "Đúng: trong lúc chơi bạn chỉ đánh dấu ván bài, còn phân tích thì để sau, khi đầu óc tỉnh táo. Đánh giá khi đang bị cảm xúc chi phối thường dễ sai." }
      - { text: "Phân tích ngay khi còn nhớ", why: "Một ghi chú ngắn là đủ để không quên. Việc phân tích đầy đủ hãy để sau, khi đầu óc tỉnh táo." }
      - { text: "Không làm gì, chỉ ván tiếp theo mới quan trọng", why: "Những ván bạn không biết nên làm gì rất đáng để xem lại. Hãy đánh dấu chúng và quay lại sau {{t:session|phiên chơi}}." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Bạn vừa thua một {{t:pot|pot}} lớn và đang bực bội. Khi nào là lúc tốt nhất để xem lại ván này?"
    options:
      - { text: "Sau vài giờ hoặc ngày hôm sau", correct: true, why: "Đúng: thời điểm tốt nhất để xem lại là vài giờ hoặc vài ngày sau {{t:session|phiên chơi}}, khi đầu óc tỉnh táo. Ngay sau khi thua, rất dễ coi một quyết định tốt là sai lầm, hoặc ngược lại." }
      - { text: "Ngay lập tức, để không quên chi tiết", why: "Bạn ghi lại chi tiết ngay, nhưng hoãn việc đánh giá. Khi đang xúc động, đánh giá của bạn bị kết quả chi phối." }
      - { text: "Không bao giờ, vì đó chỉ là xui", why: "Có thể là xui, cũng có thể là sai lầm. Bạn chỉ biết được khi xem lại, lúc cảm xúc đã lắng xuống." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Ván nào trong số này ít đáng để phân tích lâu nhất?"
    options:
      - { text: "Set thua set cao hơn trên {{t:board|board}} {{t:dry|khô}}; cả hai đã đẩy hết stack", correct: true, why: "Đúng: đó là cooler. Không người chơi hợp lý nào lại {{t:fold|bỏ bài}} với set ở đây. Cooler xảy ra với tất cả mọi người và dạy được rất ít." }
      - { text: "Một {{t:pot}} lớn bị thua, trong đó ở river bạn không biết có nên {{t:call|theo}} hay không", why: "Đây là ứng viên tốt để xem lại: {{t:pot}} lớn và quyết định khó." }
      - { text: "Một {{t:pot}} trung bình, trong đó đối thủ chơi khôn hơn bạn và bạn thấy lúng túng", why: "Những ván như vậy đáng xem lại: bạn cảm thấy có gì đó không ổn, và nên xem đó là gì." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Bạn thua một {{t:pot|pot}} lớn, nhưng nghĩ rằng mình đã chơi tốt. Có đáng xem lại không?"
    options:
      - { text: "Có: trong {{t:pot|pot}} lớn, các quyết định có trọng lượng lớn nhất, kể cả khi bạn đã chơi tốt", correct: true, why: "Đúng: các {{t:pot|pot}} lớn, nhất là những pot bị thua, là những quyết định có trọng lượng lớn nhất. Kể cả khi bạn đã chơi tốt, vẫn nên biết vì sao. Bạn chỉ bỏ qua những cooler hiển nhiên." }
      - { text: "Không: nếu tôi đã chơi tốt thì chẳng có gì để tìm", why: "Sự chắc chắn khi chưa xem lại vẫn chỉ là phản ứng đầu tiên. Một {{t:pot}} lớn là lý do tốt để xem lại." }
      - { text: "Chỉ khi tôi thua trước một tay bài hiếm", why: "Loại tay bài của đối thủ không phải là yếu tố quyết định. Điều quan trọng là quyết định có khó không hoặc {{t:pot}} có lớn không." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Bạn bắt đầu xem lại một quyết định ở river. Bạn làm gì trước tiên?"
    options:
      - { text: "Ghi lại phản ứng đầu tiên, ví dụ “{{t:call|theo}} dễ”, rồi mới tính toán", correct: true, why: "Đúng: so sánh phản ứng đầu tiên với phép tính cho thấy trực giác đánh lừa bạn ở đâu. Theo thời gian, trực giác sẽ tốt lên." }
      - { text: "Tính {{t:equity}} ngay", why: "Tính toán là cần thiết, nhưng nếu không ghi lại phản ứng đầu tiên, bạn sẽ không thấy trực giác sai ở đâu." }
      - { text: "Xem đối thủ đã có bài gì", why: "Bài của đối thủ ở showdown là kết quả, không phải thông tin bạn có vào lúc quyết định. Hãy đánh giá quyết định dựa trên các tay bài mà đối thủ có thể có." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Bạn đang xem lại một lần {{t:call|theo}} ở river. Ngay cả với giả định bi quan về {{t:range|range}} của đối thủ (ít {{t:bluff|bluff}}), bạn vẫn có đủ {{t:equity}}. Tiếp theo thì sao?"
    options:
      - { text: "Tôi có thể dừng: quyết định là tốt với mọi giả định hợp lý", correct: true, why: "Đúng: các giả định cực đoan xác định khoảng giới hạn. Nếu quyết định tốt ngay cả với giả định bi quan, giả định thực tế cũng sẽ xác nhận điều đó." }
      - { text: "Tôi vẫn phải tính thêm trường hợp thực tế", why: "Không cần: giả định thực tế nằm giữa hai cực, và vì cả hai đều cho cùng một kết luận, kết quả sẽ không thay đổi." }
      - { text: "Đổi sang giả định lạc quan, vì giả định bi quan là quá đà", why: "Bạn bắt đầu từ các cực để xác định khoảng giới hạn. Khi giả định bi quan đã cho kết quả tốt, giả định lạc quan càng tốt hơn." }
---
Ứng dụng tự xem lại giúp bạn các ván bài khi chơi với bot. Các ván chơi bên ngoài ứng dụng thì bạn tự xem lại. Bài học này tổng hợp lời khuyên của các huấn luyện viên.

## Đánh dấu trong lúc chơi, phân tích sau {{t:session|phiên chơi}}

Trong lúc chơi, bạn chỉ đánh dấu những ván có vẻ thú vị, khó hoặc lạ: một ghi chú ngắn là đủ. Tốt nhất là xem lại sau {{t:session|phiên chơi}} vài giờ hoặc vài ngày, khi đầu óc tỉnh táo. Thời điểm tệ nhất là ngay sau một lần thua lớn hoặc khi đang mệt.

## Xem lại gì

- Các {{t:pot|pot}} lớn, nhất là những pot bị thua: đó là nơi các quyết định có trọng lượng lớn nhất.
- Những ván bạn không biết nên làm gì, hoặc cảm thấy đối thủ chơi khôn hơn bạn.
- Cả những ván thắng: một sai lầm mang lại lợi nhuận vẫn tốn kém như vậy (bài học về quyết định và kết quả).

Bạn không dành nhiều thời gian cho cooler và bad beat. Cooler là ván mà hai tay bài mạnh gặp nhau và không bên nào có thể {{t:fold|bỏ bài}} một cách hợp lý, ví dụ set gặp set cao hơn. Những ván như vậy xảy ra với tất cả mọi người và dạy được rất ít.

## Xem lại một quyết định thế nào

1. Ghi lại ván bài: {{t:position|vị trí}}, stack, các hành động và kích cỡ cược ở mỗi {{t:street|vòng cược}}.
2. Ghi lại phản ứng đầu tiên: quyết định có vẻ dễ hay khó.
3. Tính toán: giá, {{t:equity}} và những gì bạn biết vào lúc quyết định.
4. Kiểm tra quyết định với ba giả định về {{t:range|range}} của đối thủ: lạc quan, bi quan và thực tế. Nếu quyết định tốt ngay cả với giả định bi quan, bạn có thể dừng.
5. Ghi lại sự khác biệt giữa phản ứng đầu tiên và phép tính. Theo thời gian, trực giác sẽ tốt lên.

:::note Các quy tắc này từ đâu ra
Ba tài liệu huấn luyện về việc xem lại ván bài: khi nào và xem lại gì; cooler và bad beat; phản ứng đầu tiên và ba giả định về đối thủ. Đây là các nguyên tắc kinh nghiệm của huấn luyện viên, không phải kết quả từ solver.
:::
