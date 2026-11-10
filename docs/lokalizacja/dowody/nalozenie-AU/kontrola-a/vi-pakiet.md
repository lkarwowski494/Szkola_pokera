# Pakiet kontroli (a), vi: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:43
NOWE:     prompt: "Turn. Bạn có {{t:flush-draw|bài chờ thùng}} sạch, trong {{t:pot|pot}} có {{n:ex.pot}}. Đối thủ all-in {{n:ex.bet.half}}, không thể thắng thêm gì nữa. Bạn {{t:call|theo}}, {{t:flush|thùng}} về ở river và bạn thắng. Bạn đánh giá lần {{t:call|theo}} này thế nào?"
STARE:     prompt: "Turn. Bạn có {{t:flush-draw|draw thùng}} sạch, trong {{t:pot|pot}} có {{n:ex.pot}}. Đối thủ all-in {{n:ex.bet.half}}, không thể thắng thêm gì nữa. Bạn {{t:call|theo}}, {{t:flush|thùng}} về ở river và bạn thắng. Bạn đánh giá lần {{t:call|theo}} này thế nào?"

## [2] exams/m12.yaml:45
NOWE:       - { text: "Đó là quyết định sai, dù bạn thắng", correct: true, why: "Bạn cần {{n:eq.bet-half}} equity, còn {{t:flush-draw|bài chờ thùng}} trúng ở river trong khoảng {{n:odds.flush.turn-river}} trường hợp. Đối thủ đã all-in, nên sau đó sẽ không trả thêm cho bạn gì nữa. Qua nhiều lần lặp lại, kiểu {{t:call|theo}} này sẽ lỗ." }
STARE:       - { text: "Đó là quyết định sai, dù bạn thắng", correct: true, why: "Bạn cần {{n:eq.bet-half}} equity, còn {{t:flush-draw|draw thùng}} trúng ở river trong khoảng {{n:odds.flush.turn-river}} trường hợp. Đối thủ đã all-in, nên sau đó sẽ không trả thêm cho bạn gì nữa. Qua nhiều lần lặp lại, kiểu {{t:call|theo}} này sẽ lỗ." }

## [3] exams/m12.yaml:52
NOWE:     prompt: "Bạn vừa thua một {{t:pot|pot}} lớn. Bạn biết mình đã chơi tốt và đó là {{t:variance|phương sai}}, còn đối thủ cũng chơi đúng. Dù vậy, chính việc thua khiến bạn tức giận đến mức không thể tập trung. Theo cách phân loại trong bài học về tilt, đây là kiểu tilt nào?"
STARE:     prompt: "Bạn vừa thua một {{t:pot|pot}} lớn. Bạn biết mình đã chơi tốt và đó là {{t:variance|phương sai}}, còn đối thủ cũng chơi đúng. Dù vậy, chính việc thua khiến bạn tức giận đến mức không thể tập trung. Theo cách phân loại trong bài học về tilt, đây là loại tilt nào?"

## [4] exams/m12.yaml:54
NOWE:       - { text: "Tilt vì ghét thua", correct: true, why: "Tác nhân là chính việc thua, ngay cả khi bạn biết đó là {{t:variance|phương sai}}. Bạn không đổ lỗi cho may rủi, cho bản thân hay cho đối thủ." }
STARE:       - { text: "Tilt vì ghét thua", correct: true, why: "Tác nhân là chính việc thua, ngay cả khi bạn biết đó là {{t:variance|phương sai}}. Bạn không đổ lỗi cho vận may, cho bản thân hay cho đối thủ." }

## [5] exams/m12.yaml:55
NOWE:       - { text: "Tilt vì bất công", why: "Kiểu tilt này bị kích hoạt bởi cảm giác poker không công bằng: bad beat, cooler, đối thủ trúng bài ở river. Ở đây bạn biết mọi thứ diễn ra bình thường, và điều khiến bạn tức giận là chính việc thua." }
STARE:       - { text: "Tilt vì bất công", why: "Loại này bị kích hoạt bởi cảm giác poker không công bằng: bad beat, cooler, đối thủ trúng bài ở river. Ở đây bạn biết mọi thứ diễn ra bình thường, và điều khiến bạn tức giận là chính việc thua." }

## [6] exams/m12.yaml:56
NOWE:       - { text: "Tilt vì mắc lỗi", why: "Tilt vì mắc lỗi là sự tức giận với lỗi của chính mình. Ở đây bạn biết mình đã chơi tốt." }
STARE:       - { text: "Tilt vì sai lầm", why: "Tilt vì sai lầm là sự tức giận với lỗi của chính mình. Ở đây bạn biết mình đã chơi tốt." }

## [7] lessons/m12-l1-wariancja.md:83
NOWE:       - { text: "Bản thân {{t:downswing}} không chứng minh điều gì; bạn xem lại các quyết định trong những ván đã thua", correct: true, why: "{{t:downswing|Downswing}} {{n:dd.bi.small}} {{t:buy-in|buy-in}} trong {{n:var.hands.k}} nghìn tay xảy đến với gần như mọi người chơi thắng từ {{n:dd.wr-low}} đến {{n:var.wr.ex}} (mô phỏng với SD {{n:var.sd}}). Việc bạn chơi tốt hay không được thể hiện qua việc xem lại quyết định, chứ không phải qua bản thân kết quả." }
STARE:       - { text: "Bản thân {{t:downswing}} không chứng minh điều gì; bạn xem lại các quyết định trong những ván đã thua", correct: true, why: "{{t:downswing|Downswing}} {{n:dd.bi.small}} {{t:buy-in|buy-in}} trong {{n:var.hands.k}} nghìn tay xảy đến với gần như mọi người chơi thắng từ {{n:dd.wr-low}} đến {{n:var.wr.ex}} (mô phỏng với SD {{n:var.sd}}). Việc bạn chơi tốt hay không được thể hiện qua việc xem lại quyết định, chứ không phải chỉ qua kết quả." }

## [8] lessons/m12-l2-decyzja-wynik.md:29
NOWE:     prompt: "Turn. Bạn có {{t:flush-draw|bài chờ thùng}} sạch ({{n:outs.flush}} out), {{t:pot|pot}} là {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.quarter}}. Bạn {{t:call|theo}}, {{t:flush|thùng}} không về và bạn mất {{n:ex.bet.quarter}}. Bạn đánh giá lần {{t:call|theo}} này thế nào?"
STARE:     prompt: "Turn. Bạn có {{t:flush-draw|draw thùng}} sạch ({{n:outs.flush}} out), {{t:pot|pot}} là {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.quarter}}. Bạn {{t:call|theo}}, {{t:flush|thùng}} không về và bạn mất {{n:ex.bet.quarter}}. Bạn đánh giá lần {{t:call|theo}} này thế nào?"

## [9] lessons/m12-l2-decyzja-wynik.md:38
NOWE:     prompt: "Turn. {{t:flush-draw|Bài chờ thùng}} sạch, {{t:pot|pot}} là {{n:ex.pot}}, đối thủ {{t:bet|cược}} bằng cả {{t:pot|pot}}: {{n:ex.bet.pot}}. Bạn {{t:call|theo}} và {{t:flush|thùng}} về trên river. Bạn đánh giá lần {{t:call|theo}} này thế nào?"
STARE:     prompt: "Turn. {{t:flush-draw|Draw thùng}} sạch, {{t:pot|pot}} là {{n:ex.pot}}, đối thủ {{t:bet|cược}} bằng cả {{t:pot|pot}}: {{n:ex.bet.pot}}. Bạn {{t:call|theo}} và {{t:flush|thùng}} về trên river. Bạn đánh giá lần {{t:call|theo}} này thế nào?"

## [10] lessons/m12-l2-decyzja-wynik.md:49
NOWE:       - { text: "Với thông tin mình có, quyết định đó có {{t:expected-value|EV}} dương không?", correct: true, why: "Đây là câu hỏi duy nhất phân biệt sai lầm với xui xẻo. Bạn tính giá, equity so với {{t:range|range}} của đối thủ và những gì bạn biết tại thời điểm quyết định." }
STARE:       - { text: "Với thông tin mình có, quyết định đó có {{t:expected-value|EV}} dương không?", correct: true, why: "Đây là câu hỏi duy nhất phân biệt sai lầm với xui xẻo. Bạn tính giá, equity so với {{t:range|phạm vi bài}} của đối thủ và những gì bạn biết tại thời điểm quyết định." }

## [11] lessons/m12-l2-decyzja-wynik.md:67
NOWE:       - { text: "Không, ba {{t:session|phiên}} là quá ít; bạn đánh giá các nước đi mới khi xem lại ván bài", correct: true, why: "Ngay cả chênh lệch kỹ năng rất lớn ({{n:skill.pct}} giỏi nhất so với {{n:skill.pct}} yếu nhất) cũng phải sau khoảng {{n:skill.hands}} tay bài mới dẫn trước trong khoảng {{n:skill.ahead}} trường hợp. Khác biệt giữa hai lối chơi của bạn nhỏ hơn nhiều." }
STARE:       - { text: "Không, ba {{t:session|phiên}} là quá ít; bạn đánh giá các nước đi mới khi xem lại ván bài", correct: true, why: "Ngay cả chênh lệch kỹ năng rất lớn ({{n:skill.pct}} giỏi nhất so với {{n:skill.pct}} yếu nhất) cũng chỉ dẫn trước trong khoảng {{n:skill.ahead}} trường hợp sau khoảng {{n:skill.hands}} tay bài. Khác biệt giữa hai lối chơi của bạn nhỏ hơn nhiều." }

## [12] lessons/m12-l2-decyzja-wynik.md:85
NOWE:       - { text: "Ghi lại những lần {{t:call|theo}} đó như những sai lầm cần sửa", correct: true, why: "Thắng không thay đổi giá. Nếu lần {{t:call|theo}} đòi hỏi nhiều equity hơn bạn có, đó là sai lầm, ngay cả khi nó mang lại lợi nhuận." }
STARE:       - { text: "Ghi lại những lần {{t:call|theo}} đó như những sai lầm cần sửa", correct: true, why: "Thắng không thay đổi giá. Nếu lần {{t:call|theo}} đòi hỏi nhiều equity hơn bạn có, đó là sai lầm, ngay cả khi nó mang lại lợi." }

## [13] lessons/m12-l2-decyzja-wynik.md:97
NOWE: All-in với {{t:pair|đôi}} A trước {{t:pair|đôi}} K là quyết định tốt nhất có thể, nhưng vẫn thua trong khoảng **{{n:res.kk-wins}}** trường hợp. Ngược lại, {{t:call|theo}} một cược bằng cả {{t:pot|pot}} trên turn với {{t:flush-draw|bài chờ thùng}} là tệ (bạn cần {{n:eq.bet-pot}}, bạn có khoảng {{n:odds.flush.turn-river}}), nhưng cứ khoảng năm lần thì vẫn thắng một lần.
STARE: All-in với {{t:pair|đôi}} A trước {{t:pair|đôi}} K là quyết định tốt nhất có thể, nhưng vẫn thua trong khoảng **{{n:res.kk-wins}}** trường hợp. Ngược lại, {{t:call|theo}} với {{t:flush-draw|draw thùng}} một cược bằng cả {{t:pot|pot}} trên turn là tệ (bạn cần {{n:eq.bet-pot}}, bạn có khoảng {{n:odds.flush.turn-river}}), nhưng vẫn thắng khoảng một lần trong năm.

## [14] lessons/m12-l2-decyzja-wynik.md:106
NOWE: 2. Tính giá và equity so với {{t:range|range}} của đối thủ (M2, M6).
STARE: 2. Tính giá và equity so với {{t:range|phạm vi bài}} của đối thủ (M2, M6).

## [15] lessons/m12-l2-decyzja-wynik.md:108
NOWE: 4. Hãy phân tích cả các ván thắng: những sai lầm mang lại lợi nhuận cũng tốn kém như vậy.
STARE: 4. Hãy phân tích cả các ván thắng: những sai lầm mang lại lợi cũng tốn kém như vậy.

## [16] lessons/m12-l3-tilt.md:13
NOWE:     prompt: "Lần thứ ba trong một giờ, đối thủ trúng một lá river cứu họ. Bạn cảm thấy trò chơi này thật bất công và như có ai đó cố tình chơi xấu bạn. Theo cách phân loại trong bài học này, đây là kiểu tilt nào?"
STARE:     prompt: "Lần thứ ba trong một giờ, đối thủ trúng một lá river cứu họ. Bạn cảm thấy ván bài thật bất công và như có ai đó cố tình chơi xấu bạn. Theo cách phân loại trong bài học này, đây là kiểu tilt nào?"

## [17] lessons/m12-l3-tilt.md:16
NOWE:       - { text: "Tilt vì mắc lỗi", why: "Tilt vì mắc lỗi liên quan đến sai lầm của chính bạn. Ở đây bạn tức giận vì may rủi, chứ không phải vì quyết định của mình." }
STARE:       - { text: "Tilt vì mắc lỗi", why: "Tilt vì mắc lỗi liên quan đến sai lầm của chính bạn. Ở đây bạn tức giận vì vận may, chứ không phải vì quyết định của mình." }

## [18] lessons/m12-l3-tilt.md:35
NOWE:       - { text: "Một kế hoạch hợp lý, vì {{t:stakes}} cao hơn sẽ gỡ lại khoản thua nhanh hơn", why: "{{t:stakes|Mức cược}} cao hơn cũng làm tăng biến động, trong khi bạn lại đang ra quyết định trong trạng thái tồi. Lên mức cao hơn sau khi thua chính là điều ngược lại với việc quản lý {{t:bankroll|bankroll}} thận trọng (bài học về bankroll và rủi ro)." }
STARE:       - { text: "Một kế hoạch hợp lý, vì {{t:stakes}} cao hơn sẽ gỡ lại khoản thua nhanh hơn", why: "{{t:stakes}} cao hơn cũng làm tăng biến động, trong khi bạn lại đang ra quyết định trong trạng thái tồi. Lên mức cao hơn sau khi thua chính là điều ngược lại với việc quản lý {{t:bankroll|bankroll}} thận trọng (bài học về bankroll và rủi ro)." }

## [19] lessons/m12-l3-tilt.md:43
NOWE:       - { text: "Tilt vì bất công", why: "Ở đây bạn không đổ lỗi cho may rủi mà cho chính mình. Đó là tilt vì mắc lỗi." }
STARE:       - { text: "Tilt vì bất công", why: "Ở đây bạn không đổ lỗi cho vận may mà cho chính mình. Đó là tilt vì mắc lỗi." }

## [20] lessons/m12-l3-tilt.md:71
NOWE:       - { text: "Tăng {{t:stakes|mức cược}} để gỡ lại nhanh hơn", why: "Đó chính là tilt vì tuyệt vọng ở dạng thuần túy nhất. {{t:stakes|Mức cược}} cao hơn đi cùng những quyết định tệ hơn sẽ khiến bạn thua nhanh hơn." }
STARE:       - { text: "Tăng {{t:stakes|mức cược}} để gỡ lại nhanh hơn", why: "Đó chính là tilt vì tuyệt vọng ở dạng thuần túy nhất. {{t:stakes}} cao hơn đi cùng những quyết định tệ hơn sẽ khiến bạn thua nhanh hơn." }

## [21] lessons/m12-l4-bankroll.md:47
NOWE:     prompt: "Bạn bắt đầu {{t:stakes|mức cược}} này với {{n:br.bi.base}} {{t:buy-in|buy-in}}. Sau một {{t:downswing|downswing}}, bạn còn {{n:br.ex.below}}. Bạn làm gì?"
STARE:     prompt: "Bạn bắt đầu {{t:stakes|mức cược}} này với {{n:br.bi.base}} {{t:buy-in|buy-in}}. Sau một {{t:downswing|chuỗi thua}}, bạn còn {{n:br.ex.below}}. Bạn làm gì?"

## [22] lessons/m12-l4-bankroll.md:58
NOWE:       - { text: "Ở lại {{t:stakes|mức cược}} này và xem lại các quyết định trong những ván đã thua", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-in}} vẫn nhiều hơn ngưỡng xuống muộn nhất, {{n:br.bi.move-down}}. Trong mô phỏng, một {{t:downswing}} như vậy xảy ra với khoảng {{n:dd.p.small.100k}} người chơi thắng {{n:var.wr.ex}} trong {{n:var.hands.k}} nghìn tay, còn việc xem lại các ván bài giúp kiểm tra xem nguyên nhân có phải là sai lầm hay không." }
STARE:       - { text: "Ở lại {{t:stakes|mức cược}} này và xem lại các quyết định trong những ván đã thua", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-in}} vẫn nhiều hơn ngưỡng xuống muộn nhất, {{n:br.bi.move-down}}. Trong mô phỏng, một {{t:downswing}} như vậy xảy ra với khoảng {{n:dd.p.small.100k}} người chơi thắng {{n:var.wr.ex}} trong {{n:var.hands.k}} nghìn ván, còn việc xem lại các ván bài giúp kiểm tra xem nguyên nhân có phải là sai lầm hay không." }

## [23] lessons/m12-l4-bankroll.md:60
NOWE:       - { text: "Bỏ thêm {{t:buy-in|buy-in}} từ bên ngoài để trở lại {{n:br.bi.base}}", why: "Nạp thêm sau mỗi {{t:downswing|downswing}} làm mất ý nghĩa của bankroll như một giới hạn rủi ro. Bạn đặt ngưỡng từ trước và tuân thủ nó." }
STARE:       - { text: "Bỏ thêm {{t:buy-in|buy-in}} từ bên ngoài để trở lại {{n:br.bi.base}}", why: "Nạp thêm sau mỗi {{t:downswing|chuỗi thua}} làm mất ý nghĩa của bankroll như một giới hạn rủi ro. Bạn đặt ngưỡng từ trước và tuân thủ nó." }

## [24] lessons/m12-l4-bankroll.md:102
NOWE:       - { text: "Sau khi thua, bạn quay lại chơi để gỡ lại khoản thua", correct: true, why: "Chơi để gỡ lại khoản thua là một trong những dấu hiệu của vấn đề cờ bạc được nêu trong các tiêu chí chẩn đoán. Nếu bạn nhận ra những dấu hiệu như vậy ở bản thân, hãy dùng thông tin liên hệ trong thẻ về chơi có trách nhiệm." }
STARE:       - { text: "Sau khi thua, bạn quay lại chơi để gỡ lại khoản thua", correct: true, why: "Chơi để gỡ lại khoản thua là một trong những dấu hiệu của vấn đề cờ bạc được nêu trong các tiêu chí chẩn đoán. Nếu bạn nhận ra những dấu hiệu như vậy ở bản thân, hãy dùng các liên hệ trong thẻ về chơi có trách nhiệm." }

## [25] lessons/m12-l4-bankroll.md:133
NOWE: Winrate và bankroll đứng cạnh nhau trong công thức: winrate thấp hơn một nửa đòi hỏi bankroll lớn gấp đôi để có cùng mức rủi ro. Vì vậy, cùng một số {{t:buy-in|buy-in}} lại cho người chơi này rủi ro thấp hơn vài lần so với người chơi khác. Lúc đầu winrate của bạn chưa được biết, và để ước tính nó cần rất nhiều tay bài (bài học về {{t:variance|phương sai}}). Với winrate âm, không bankroll nào giúp được, vì bankroll bảo vệ trước {{t:variance|phương sai}}, chứ không bảo vệ trước lối chơi yếu.
STARE: Winrate và bankroll đứng cạnh nhau trong công thức: winrate thấp hơn một nửa đòi hỏi bankroll lớn gấp đôi để có cùng mức rủi ro. Vì vậy, cùng một số {{t:buy-in|buy-in}} lại cho người chơi này rủi ro thấp hơn vài lần so với người chơi khác. Lúc đầu winrate của bạn chưa được biết, và để ước tính nó cần rất nhiều ván (bài học về {{t:variance|phương sai}}). Với winrate âm, không bankroll nào giúp được, vì bankroll bảo vệ trước {{t:variance|phương sai}}, chứ không bảo vệ trước lối chơi yếu.

## [26] rules.yaml R-M12-003
NOWE:
```
- id: R-M12-003
  module: m12
  if: "bạn muốn biết mình thực sự thắng bao nhiêu"
  then: "bạn thu thập hàng trăm nghìn ván: độ chính xác ± {{n:var.target}} với độ tin cậy {{n:var.conf95}} đòi hỏi khoảng {{n:var.need.hands.k}} nghìn ván"
  because: "sai số ước lượng giảm theo căn bậc hai của số ván: số khối 100 ván cần có = ({{n:var.z95}} × SD ÷ độ chính xác)²"
  level: math
  source: "tính toán: (1,96 × 80 ÷ 2)² khối; khớp với bậc độ lớn trong tài liệu 08 (khoảng 615 nghìn ván)"
  sources: [{ kind: math }]
```
STARE:
```
- id: R-M12-003
  module: m12
  if: "bạn muốn biết mình thực sự thắng bao nhiêu"
  then: "bạn thu thập hàng trăm nghìn ván: độ chính xác ± {{n:var.target}} với độ tin cậy {{n:var.conf95}} đòi hỏi khoảng {{n:var.need.hands.k}} nghìn ván"
  because: "sai số ước lượng giảm theo căn bậc hai của số ván: số khối 100 ván cần có = ({{n:var.z95}} × SD ÷ độ chính xác)²"
  level: math
  source: "tính toán: (1,96 × 80 ÷ 2)² khối; khớp với cấp độ lớn trong tài liệu 08 (khoảng 615 nghìn ván)"
  sources: [{ kind: math }]
```
