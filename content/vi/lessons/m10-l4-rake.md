---
id: m10.l4
module: m10
order: 4
title: "Phí rake"
sub: "Chơi tốn bao nhiêu và điều đó thay đổi quyết định của bạn ra sao"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Bạn chơi NL10 6-max trên một trong các phòng online lớn. {{t:rake}} lớn đến mức nào so với winrate của một người chơi thắng điển hình ở {{t:stakes|mức cược}} thấp?"
    options:
      - { text: "Lớn gấp vài lần: khoảng {{n:rake.micro.low}}–{{n:rake.micro.high}} so với {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Quy đổi biểu phí của các phòng sang bb/100, ở mức micro được khoảng {{n:rake.micro.low}}–{{n:rake.micro.high}}. Người chơi thắng phải thắng đối thủ nhiều hơn mức {{t:rake}}, và chỉ phần dư ra mới là winrate của họ." }
      - { text: "Gần như bằng nhau", why: "{{t:rake}} ở mức micro khoảng {{n:rake.micro.low}}–{{n:rake.micro.high}}, còn winrate điển hình là {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. Chênh lệch là gấp vài lần." }
      - { text: "Nhỏ không đáng kể, vì phòng chỉ lấy vài phần trăm {{t:pot|pot}}", why: "Vài phần trăm từ mỗi {{t:pot|pot}} sau flop cộng lại thành khoảng {{n:rake.micro.low}}–{{n:rake.micro.high}}. Như vậy là nhiều hơn số mà một người chơi thắng điển hình thắng được." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Trong một báo cáo về cộng đồng người chơi cash 6-max, mỗi người chơi NL100 mất trung bình {{n:rake.pop.nl100.loss}}. Khoản lỗ này đến từ đâu?"
    options:
      - { text: "Đó là {{t:rake}}: nếu không có nó, người chơi gộp lại sẽ hòa vốn", correct: true, why: "Người chơi đấu với nhau, nên những gì người này thắng thì người kia thua. Tính trung bình, mọi người chỉ mất phần mà phòng lấy đi. Tác giả viết: “your biggest villain is the house”." }
      - { text: "Do phần lớn người chơi chơi kém", why: "Lối chơi kém chuyển tiền từ người chơi yếu hơn sang người chơi giỏi hơn, nhưng không thay đổi mức trung bình. Chỉ {{t:rake}} mới kéo mức trung bình xuống." }
      - { text: "Do {{t:variance|phương sai}}: với mẫu lớn hơn sẽ ra bằng không", why: "{{t:variance|Phương sai}}, tức độ phân tán của kết quả quanh {{t:expected-value|giá trị kỳ vọng}}, tác động lên kết quả của từng người chơi theo cả hai chiều. Mức trung bình của cả cộng đồng là âm vì ai cũng trả {{t:rake}}." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Theo ước tính của tác giả cùng bộ dữ liệu này (có hiệu chỉnh Bayes), trong số người chơi có ít nhất {{n:rake.pop.reg.hands}} ván, khoảng {{n:rake.pop.reg.prerake}} thắng trước khi trừ {{t:rake|rake}}. Sau khi trừ rake thì bao nhiêu người còn thắng?"
    options:
      - { text: "Khoảng {{n:rake.pop.reg.postrake}}", correct: true, why: "{{t:rake}} lấy đi gần một nửa số người thắng: khoảng {{n:rake.pop.reg.prerake}} trước rake, khoảng {{n:rake.pop.reg.postrake}} sau rake. Vì vậy bạn luôn tính winrate sau rake." }
      - { text: "Gần như bằng nhau, khoảng {{n:rake.pop.reg.prerake}}", why: "Nếu {{t:rake}} nhỏ thì đúng là vậy. Với rake vài bb/100, nhiều người chơi thắng trước rake bị tụt xuống dưới 0." }
      - { text: "Gần như không ai", why: "Phóng đại: khoảng {{n:rake.pop.reg.postrake}} của nhóm này vẫn thắng. {{t:rake}} là trở ngại lớn, nhưng không chặn đường đến chiến thắng." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Vì sao ở NL500, {{t:rake}} tính theo bb/100 nhỏ hơn vài lần ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) so với ở mức micro?"
    options:
      - { text: "Vì các {{t:pot|pot}} lớn hơn thường chạm {{t:rake-cap|mức trần rake}} hơn, mà ở đó mức trần tính theo bb là nhỏ", correct: true, why: "Phòng lấy một phần trăm {{t:pot|pot}}, nhưng không quá mức trần tính bằng đô la. Ở mức micro, mức trần bằng nhiều bb và các {{t:pot|pot}} hiếm khi chạm tới, nên bạn trả đủ phần trăm. Ở NL500, cùng mức trần đó chỉ là một phần nhỏ của bb." }
      - { text: "Vì ở NL500 phòng lấy phần trăm nhỏ hơn", why: "Phần trăm thường tương tự (khoảng {{n:rake.ex.pct}}). Khác biệt nằm ở {{t:rake-cap|mức trần rake}}, thứ mà ở {{t:stakes|mức cược}} cao cắt bớt phí từ các {{t:pot|pot}} lớn." }
      - { text: "Vì ở NL500 người ta chơi ít ván hơn mỗi giờ", why: "bb/100 tính {{t:rake}} trên 100 ván, nên nhịp độ chơi không làm nó thay đổi. Thứ làm nó thay đổi là {{t:rake-cap|mức trần rake}} tính theo bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Trong {{t:pot|pot}} có {{n:ex.pot}}, đối thủ {{t:bet|cược}} {{n:ex.bet.half}}. Phòng thu {{n:rake.ex.pct}} {{t:pot|pot}} và không có {{t:rake-cap|mức trần}} nào trong tầm chạm tới. Bạn cần bao nhiêu equity để {{t:call|theo}}? Hãy nhập phần trăm."
    answer: eq.bet-half.rake
    explanation: "Sau khi bạn {{t:call|theo}}, {{t:pot|pot}} có {{n:ex.half.total}}, và sau rake còn lại {{n:rake.ex.pot-after}}. Bạn bỏ thêm {{n:ex.bet.half}}, nên bạn cần {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} thay vì {{n:eq.bet-half}} khi không có rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Khi không có {{t:rake|rake}}, {{t:call}} trước một lần cược bằng nửa {{t:pot|pot}} cần {{n:eq.bet-half}} equity. Với {{t:rake|rake}} {{n:rake.ex.pct}} thì cần bao nhiêu?"
    options:
      - { text: "Nhiều hơn một chút: khoảng {{n:eq.bet-half.rake}}", correct: true, why: "Bạn thắng {{t:pot|pot}} đã bị trừ {{t:rake}}, nhưng phải trả đủ số tiền bỏ thêm. Một tay bài vừa nhỉnh hơn ngưỡng khi không có rake có thể đã nằm dưới ngưỡng khi có rake." }
      - { text: "Bằng nhau, vì cả hai người chơi đều trả {{t:rake}}", why: "{{t:rake}} được trừ vào {{t:pot|pot}} bạn thắng, không phải vào số tiền bạn bỏ thêm. Ngưỡng tăng lên khoảng {{n:eq.bet-half.rake}}." }
      - { text: "Ít hơn, vì {{t:pot}} lớn hơn", why: "{{t:pot}} sau rake nhỏ hơn chứ không lớn hơn, nên bạn cần nhiều equity hơn: khoảng {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Bạn chơi ở một phòng chỉ thu {{t:rake}} từ các {{t:pot|pot}} đi tới flop. Một người trước bạn {{t:open|mở}}, bạn {{t:position|có vị trí}} với một tay bài mà nếu không có rake sẽ nằm ở ranh giới {{t:call|theo}}. {{t:rake}} thay đổi điều gì?"
    options:
      - { text: "Tôi {{t:call|theo}} ít hơn: các tay bài ở ranh giới {{t:call|theo}} thì tôi {{t:fold|bỏ bài}} hoặc 3-bet thường xuyên hơn", correct: true, why: "Trong các lời giải solver đã công bố có tính rake, người chơi {{t:position|có vị trí}} trước một lượt {{t:open|mở}} chơi ít tay bài hơn khoảng {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}}. Chính lượt {{t:call|theo}} bị thiệt, vì {{t:pot}} sau flop phải trả {{t:rake}}, còn {{t:pot}} thắng bằng 3-bet trước flop thì không." }
      - { text: "Không gì cả: {{t:rake}} chỉ liên quan đến lối chơi sau flop", why: "Chính vì thế nó thay đổi quyết định trước flop: {{t:call|theo}} dẫn tới flop và tới rake, còn 3-bet hoặc {{t:fold}} thường kết thúc ván bài mà không mất rake." }
      - { text: "Tôi {{t:call|theo}} thường xuyên hơn, vì các {{t:pot|pot}} sau flop lớn", why: "Ngược lại: {{t:rake}} lấy một phần của chính những {{t:pot|pot}} đó. Solver có tính rake {{t:call|theo}} ít hơn rõ rệt." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Trong cùng các lời giải solver đó, {{t:big-blind}} {{t:call|theo}} min-raise trong trò chơi có rake chỉ ở khoảng {{n:rake.solver.bb-minraise}} số trường hợp mà nó {{t:call|theo}} khi không có rake. Điều này có ý nghĩa gì với bạn khi ở {{t:big-blind|big blind}}?"
    options:
      - { text: "Tôi vẫn phòng thủ nhiều tay bài, nhưng hẹp hơn so với các bảng tính không có rake", correct: true, why: "{{t:big-blind}} vẫn phòng thủ thường xuyên vì đã có {{t:chips|chip}} trong {{t:pot|pot}} và là người đóng hành động. Tuy nhiên, {{t:rake}} cắt bỏ những lượt {{t:call|theo}} yếu nhất, nên các bảng không tính rake là quá rộng đối với bạn." }
      - { text: "Tôi thôi phòng thủ {{t:big-blind|big blind}} bằng cách {{t:call|theo}}", why: "Không: theo tác giả, việc {{t:call|theo}} từ các vị trí blind vẫn là phần quan trọng của chiến lược cả khi có rake. Thứ thay đổi là độ rộng phòng thủ, không phải việc có phòng thủ hay không." }
      - { text: "Tôi phòng thủ rộng như cũ, vì ở {{t:big-blind|big blind}} thì {{t:rake}} không ảnh hưởng", why: "Có ảnh hưởng: {{t:pot}} sau khi {{t:call|theo}} đi tới flop và trả {{t:rake}}. Vì vậy solver {{t:call|theo}} từ {{t:big-blind|big blind}} ít hơn." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Ở một số phòng, {{t:rake}} cũng được thu từ các {{t:pot|pot}} 3-bet kết thúc trước flop. Điều này thay đổi gì trong lập luận “3-bet không trả rake”?"
    options:
      - { text: "Ở phòng như vậy, lập luận này yếu đi: 3-bet cũng trả rake, nên lợi thế của 3-bet so với {{t:call|theo}} nhỏ hơn", correct: true, why: "Kết quả solver áp dụng cho cấu trúc “no flop, no drop”, trong đó {{t:pot}} không có flop được miễn rake. Ở phòng như vậy, quy tắc này chỉ áp dụng cho các {{t:pot|pot}} không có 3-bet, nên {{t:call|theo}} vẫn bị thiệt vì rake, nhưng 3-bet không được miễn rake." }
      - { text: "Không gì cả, vì {{t:rake}} từ 3-bet không đáng kể", why: "Ta không biết được điều đó nếu không tính toán cho một phòng cụ thể. Điều chắc chắn duy nhất là 3-bet không còn được miễn rake." }
      - { text: "Ở phòng như vậy, luôn nên {{t:call|theo}} thay vì 3-bet", why: "{{t:call|Theo}} vẫn dẫn tới flop và trả {{t:rake}} như trước. Thay đổi duy nhất là 3-bet cũng phải trả." }
---
{{t:rake}} là khoản phí mà phòng thu từ {{t:pot|pot}}. Người chơi đấu với nhau, nên nếu không có {{t:rake}}, gộp lại họ sẽ hòa vốn. Khi có rake, người chơi trung bình mất đúng bằng phần mà phòng lấy đi, còn người chơi thắng phải thắng đối thủ nhiều hơn mức {{t:rake}}.

## Chi phí là bao nhiêu

Phòng lấy một phần trăm {{t:pot|pot}}, nhưng không quá {{t:rake-cap|mức trần rake}} tính bằng đô la. Ở hai phòng online lớn nhất, tại NL2–NL10 mức này là {{n:rake.ex.pct}} {{t:pot|pot}}. Ở mức micro, các {{t:pot|pot}} hiếm khi chạm mức trần, nên bạn trả đủ phần trăm.

Một bài so sánh biểu phí của các phòng quy đổi chúng sang bb/100 dựa trên phân bố {{t:pot|pot}} từ vài triệu ván:

| {{t:stakes|Mức cược}} (6-max, hai phòng online lớn nhất) | {{t:rake}} |
|---|---|
| NL2–NL25 | khoảng {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | khoảng {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Một người chơi thắng điển hình ở {{t:stakes|mức cược}} thấp có winrate {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (mô-đun 12): ít hơn vài lần so với số họ trả cho phòng. Ở {{t:stakes|mức cược}} cao hơn, cùng mức trần tính bằng đô la chỉ là một phần nhỏ của bb, nên {{t:rake}} tính theo bb/100 giảm xuống.

Dữ liệu về cộng đồng người chơi cũng cho thấy điều tương tự. Trong một báo cáo về cộng đồng người chơi (cash 6-max, NL10–NL500), mỗi người chơi mất trung bình {{n:rake.pop.nl10.loss}} ở NL10, {{n:rake.pop.nl100.loss}} ở NL100 và {{n:rake.pop.nl500.loss}} ở NL500. Trong số người chơi NL100 có ít nhất {{n:rake.pop.reg.hands}} ván, theo ước tính của tác giả (hiệu chỉnh Bayes), khoảng {{n:rake.pop.reg.prerake}} thắng trước khi trừ rake, còn sau khi trừ là khoảng {{n:rake.pop.reg.postrake}} (trong dữ liệu thô là {{n:rake.pop.reg.prerake.raw}} và {{n:rake.pop.reg.postrake.raw}}).

## Ngưỡng {{t:call|theo}} khi có rake

Bạn thắng {{t:pot|pot}} đã bị trừ {{t:rake}}, nhưng phải trả đủ số tiền bỏ thêm. Equity cần thiết từ mô-đun 2 tăng lên:

```formula
equity cần thiết = số tiền bỏ thêm ÷ ({{t:pot}} sau khi {{t:call|theo}} × (1 − {{t:rake}}))
```

Cược {{n:ex.bet.half}} vào {{t:pot|pot}} {{n:ex.pot}}: không có rake bạn cần {{n:eq.bet-half}}, với rake {{n:rake.ex.pct}} bạn cần {{n:eq.bet-half.rake}}. Chênh lệch nhỏ trong một ván bài, nhưng áp dụng cho mọi {{t:pot|pot}} sau flop.

## {{t:rake}} thay đổi gì trước flop

Ở nhiều phòng, {{t:rake}} chỉ được thu từ các {{t:pot|pot}} đi tới flop (“no flop, no drop”). Khi đó, {{t:pot}} thắng trước flop được miễn rake, còn {{t:pot}} sau khi {{t:call|theo}} thì phải trả. Trong các lời giải solver NL100 đã công bố có tính rake:

- người chơi {{t:position|có vị trí}} trước một lượt {{t:open|mở}} chơi ít tay bài hơn khoảng {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}}; bị thiệt chủ yếu là lượt {{t:call|theo}}, còn số lần 3-bet tăng nhẹ;
- {{t:big-blind}} {{t:call|theo}} min-raise chỉ ở khoảng {{n:rake.solver.bb-minraise}} số trường hợp so với khi không có rake, dù việc phòng thủ từ các vị trí blind vẫn dựa trên {{t:call|theo}}.

Cũng vì lý do này, ở mô-đun 3, từ {{t:small-blind|small blind}} bạn {{t:raise|tố}} hoặc {{t:fold|bỏ bài}}, không bù thêm cho bằng {{t:big-blind|big blind}}. Một số phòng cũng thu {{t:rake}} từ các {{t:pot|pot}} 3-bet kết thúc trước flop; ở đó, 3-bet không được miễn rake.

:::note Nguồn
Mức rake: bài so sánh rake của các phòng online năm 2026 (biểu phí của hai phòng lớn nhất quy đổi sang bb/100, truy cập ngày 5 tháng 10 năm 2026); các phòng khác có số liệu khác. Khoản lỗ của cộng đồng người chơi: một báo cáo độc lập về cộng đồng người chơi (cash NLHE 6-max, các phòng có cơ sở dữ liệu theo dõi ván bài, người chơi có ít nhất 100 ván; tác giả không nêu tên phòng và khoảng thời gian). Ảnh hưởng của rake đến lối chơi trước flop: một bài viết đã công bố về kích cỡ tố trước flop, lời giải solver cho stack {{n:rake.solver.depth}}; tác giả viết rằng các kết luận phần lớn áp dụng được cho các thể thức khác, nên với stack {{n:format.stack}} đây là một cách đơn giản hóa. Ngưỡng equity là kết quả tính toán.
:::
