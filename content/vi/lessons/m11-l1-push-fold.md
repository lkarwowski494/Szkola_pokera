---
id: m11.l1
module: m11
order: 1
title: "Stack ngắn: all-in hoặc bỏ bài"
sub: "Khi cú tố trở thành all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Giải đấu}}. Bạn có {{n:m11.depth.10}}, mọi người trước bạn đều đã {{t:fold|bỏ bài}}. Kế hoạch chơi nào đơn giản và đã được các nguồn kiểm chứng?"
    options:
      - { text: "All-in hoặc {{t:fold}}", correct: true, why: "Ở mức khoảng {{n:m11.thr.pushfold}} trở xuống, các nguồn đều thống nhất khuyên push/fold. Tố rồi {{t:fold|bỏ bài}} khi bị {{t:raise|tố}} sẽ mất quá nhiều stack, còn all-in ép đối thủ {{t:fold|bỏ bài}} nhiều nhất." }
      - { text: "Tố lên {{n:pf.open-size}}, rồi quyết định sau khi bị {{t:raise|tố}}", why: "Sau cú tố như vậy, bạn chỉ còn ít chip phía sau {{t:pot|pot}}, nên khi gặp {{t:raise|cú tố}} all-in, bạn gần như vẫn buộc phải {{t:call|theo}}. Đối thủ không cần phải {{t:fold|bỏ bài}}, còn bạn mất fold equity." }
      - { text: "{{t:call|Theo}} mức blind (limp) và xem flop", why: "Limp không cho bạn cơ hội giành {{t:pot|pot}} ngay lập tức. Các solver có đủ lựa chọn hành động đôi khi limp, nhưng đó là chiến lược cho người chơi nâng cao; kế hoạch đơn giản và an toàn là all-in hoặc {{t:fold}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Bạn có {{n:m11.thr.raise}} trở lên và là người đầu tiên {{t:open|mở}} pot. Bạn làm gì với một tay bài muốn chơi?"
    options:
      - { text: "Thường là tố (ví dụ tố tối thiểu)", correct: true, why: "Trên khoảng {{n:m11.thr.raise}}, các nguồn khuyên tố bình thường: bạn vẫn còn chỗ để {{t:fold|bỏ bài}} trước một cú {{t:raise|tố}} hoặc chơi sau flop." }
      - { text: "Luôn all-in", why: "All-in với stack lớn như vậy là mạo hiểm nhiều chỉ để thắng các blind. Tay yếu hơn sẽ {{t:fold|bỏ bài}}, còn tay mạnh hơn sẽ theo." }
      - { text: "Push/fold như ở mức {{n:m11.thr.pushfold}}", why: "Push/fold là công cụ cho {{t:short-stack|stack ngắn}}: đến khoảng {{n:m11.thr.pushfold}}, và với các tay yếu hơn thì đến khoảng {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Bạn có {{n:m11.m.stack}} {{t:chips|chip}}. Mức blind là {{n:m11.m.sb}}/{{n:m11.m.bb}}, và {{t:big-blind}} còn đặt thêm ante {{n:m11.m.ante}}. M của bạn là bao nhiêu?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind}} + {{t:big-blind}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. Đó là số vòng bạn trụ được mà không chơi. Tính theo {{t:big-blind|big blind}} thì là {{n:m11.m.bbs}}, nhưng M tính cả ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "M của bạn đã giảm xuống khoảng {{n:m11.m.example}}. Mô hình vùng M nói gì về điều này?"
    options:
      - { text: "{{t:red-zone|Vùng đỏ}}: chỉ all-in hoặc {{t:fold}}, tốt nhất là vào đầu tiên", correct: true, why: "Với M khoảng {{n:m11.m.red}} trở xuống, bạn chỉ còn all-in hoặc {{t:fold}}. Vào đầu tiên cho bạn cơ hội để mọi người đều {{t:fold|bỏ bài}}." }
      - { text: "{{t:green-zone|Vùng xanh}}: bạn chơi bình thường", why: "{{t:green-zone|Vùng xanh}}, nơi stack cho phép bạn chơi thoải mái, chỉ bắt đầu từ M khoảng {{n:m11.m.green}}. Với M khoảng {{n:m11.m.example}}, stack đủ cho {{n:m11.m.example}} vòng." }
      - { text: "Chờ đôi A, vì dù sao bạn vẫn còn thời gian", why: "Với M khoảng {{n:m11.m.example}}, các blind sẽ ăn hết stack trước khi bạn chờ được một tay bài mạnh. Bạn cần all-in với {{t:range|range}} rộng hơn." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Bạn có {{n:m11.depth.10}} ở {{t:small-blind|small blind}}, mọi người đều đã {{t:fold|bỏ bài}}. Hãy tô các tay bài mà bạn all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Small blind}}, mọi người đều đã {{t:fold|bỏ bài}}, bạn có K2o. Ở mức {{n:m11.depth.10}}, solver all-in với tay này. Còn ở mức {{n:m11.depth.15}} thì sao?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Ở mức {{n:m11.depth.15}}, bạn mạo hiểm nhiều hơn so với các blind, nên {{t:range}} all-in thu hẹp từ khoảng {{n:m11.push.10}} xuống khoảng {{n:m11.push.15}} tay. K2o rơi ra khỏi dải đó." }
      - { text: "All-in, vì K là lá bài mạnh", why: "Ở mức {{n:m11.depth.15}}, K2o quá thường xuyên gặp K mạnh hơn hoặc A trong {{t:range|range}} {{t:call|theo}}. Solver chọn {{t:fold|bỏ bài}} với tay này." }
      - { text: "All-in, vì stack càng sâu thì càng rộng", why: "Ngược lại: stack càng sâu, {{t:range}} all-in càng hẹp. Bạn {{t:shove|đẩy all-in}} rộng nhất khi {{t:short-stack|stack ngắn}} chỉ còn rất ít." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Small blind}}, {{n:m11.depth.10}}, không có ante. {{t:big-blind}} phải {{t:fold|bỏ bài}} bao nhiêu lần trên một trăm để cú all-in bằng một tay bài hoàn toàn không có cơ hội thắng đạt mức hòa vốn?"
    options:
      - { text: "Hơn {{n:m11.push.10.alpha}}", correct: true, why: "Bạn mạo hiểm {{n:m11.push.10.risk}} để thắng {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) là khoảng {{n:m11.push.10.alpha}}. Đối thủ không {{t:fold|bỏ bài}} nhiều đến vậy, nên all-in chỉ có lời với tay bài cũng có equity khi đối thủ {{t:call|theo}}." }
      - { text: "Hơn một nửa", why: "Một nửa là đủ nếu bạn mạo hiểm bằng số bạn có thể thắng. Ở đây bạn mạo hiểm {{n:m11.push.10.risk}}, mà chỉ thắng {{n:m11.push.10.win}} blind." }
      - { text: "Chỉ cần thỉnh thoảng đối thủ {{t:fold|bỏ bài}}", why: "Mỗi lần {{t:call}} khiến tay bài không có cơ hội mất cả stack. Không có equity, bạn cần đối thủ {{t:fold|bỏ bài}} rất thường xuyên: hơn {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Vì sao khi có {{t:short-stack|stack ngắn}}, bạn thích all-in trước hơn là chờ người khác all-in rồi {{t:call|theo}}?"
    options:
      - { text: "Vì all-in thắng theo hai cách", correct: true, why: "Khi vào trước, bạn giành {{t:pot|pot}} khi mọi người đều {{t:fold|bỏ bài}}, hoặc thắng ở showdown. Khi {{t:call|theo}}, bạn chỉ thắng ở showdown." }
      - { text: "Vì all-in luôn có nhiều equity hơn", why: "Equity của tay bài không phụ thuộc vào việc ai vào trước. Khác biệt là all-in cho đối thủ cơ hội để {{t:fold|bỏ bài}}." }
      - { text: "Vì {{t:call|theo}} all-in là bị cấm", why: "Bạn được phép {{t:call|theo}}, nhưng để {{t:call|theo}} bạn cần tay bài mạnh hơn (bài học về việc {{t:call|theo}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "Vẫn stack {{n:m11.depth.10}} ở {{t:small-blind|small blind}}, nhưng ván chơi có {{t:bb-ante}}: {{t:big-blind}} đã đặt ante {{n:m11.ante}}. {{t:range}} all-in thay đổi thế nào?"
    options:
      - { text: "Rộng ra: khoảng {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} thay vì {{n:m11.push.10}}", correct: true, why: "Ante làm lớn {{t:pot|pot}} mà bạn giành được khi đối thủ {{t:fold|bỏ bài}}: {{n:m11.push.10.win-ante}} thay vì {{n:m11.push.10.win}}. Tay bài không có cơ hội giờ chỉ cần đối thủ {{t:fold|bỏ bài}} trong hơn {{n:m11.push.10.alpha-ante}} trường hợp, nên có nhiều cú all-in sinh lời hơn." }
      - { text: "Hẹp lại, vì đối thủ đã bỏ nhiều hơn vào {{t:pot|pot}} và sẽ {{t:call|theo}} thường xuyên hơn", why: "Đối thủ đúng là {{t:call|theo}} rộng hơn, nhưng {{t:pot}} lớn hơn để giành lấn át điều đó. Điểm cân bằng là khoảng {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} tay." }
      - { text: "Không thay đổi", why: "Ante thay đổi tỷ lệ giữa rủi ro và phần thưởng. Không có ante là khoảng {{n:m11.push.10}}, có ante là khoảng {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
Trong {{t:tournament|giải đấu}}, các mức blind tăng dần, còn stack thì không. Sớm hay muộn stack của bạn sẽ ít đến mức một cú tố thông thường không còn tác dụng. Lúc đó đến lượt chiến lược **push/fold**: với mỗi tay bài bạn chơi, bạn {{t:shove|đẩy all-in}}, tức là đặt cược toàn bộ stack, còn những tay còn lại bạn {{t:fold|bỏ bài}}.

## Khi nào all-in hoặc {{t:fold}}

Bạn tính stack bằng {{t:big-blind|big blind}}. Các nguồn đồng ý ở một điểm: ở mức khoảng **{{n:m11.thr.pushfold}} trở xuống**, bạn gần như chỉ chơi all-in hoặc {{t:fold}}.

| Stack | Bạn thường làm gì |
|---|---|
| khoảng {{n:m11.thr.pushfold}} trở xuống | all-in hoặc {{t:fold}} |
| từ {{n:m11.thr.pushfold}} đến {{n:m11.thr.upper}} | push/fold với các tay yếu hơn và trung bình |
| trên khoảng {{n:m11.thr.raise}} | tố thông thường |

Vì sao không tố? Khi bạn có {{n:m11.depth.10}} và tố lên {{n:pf.open-size}}, bạn còn quá ít chip phía sau {{t:pot|pot}} đến mức gặp cú {{t:raise}} all-in, bạn gần như vẫn phải {{t:call|theo}}. Đối thủ biết bạn sẽ không {{t:fold|bỏ bài}}, nên không cần phải e ngại. All-in ngay lập tức ép ra nhiều **fold equity** nhất từ stack, tức là lợi nhuận đến từ việc đối thủ {{t:fold|bỏ bài}}.

:::note Đơn giản hóa
Push/fold là một cách đơn giản hóa. Các solver được chọn cả limp và cú tố nhỏ thì ở mức {{n:m11.depth.10}} sẽ limp hoặc tố tối thiểu với một phần tay bài. Tuy vậy, all-in hoặc {{t:fold}} đơn giản, khó mắc sai lầm lớn, và các nguồn khuyên dùng nó làm điểm xuất phát.
:::

## M: bạn trụ được bao nhiêu vòng

Một mô hình phổ biến trong giải đấu đo {{t:short-stack}} theo cách khác: **M** là stack chia cho chi phí của một vòng người chơi quanh bàn.

```formula
M = stack ÷ (small blind + big blind + ante)
```

Ví dụ: bạn có {{n:m11.m.stack}} {{t:chips|chip}}, blind {{n:m11.m.sb}}/{{n:m11.m.bb}}, {{t:bb-ante}} {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. Tính theo {{t:big-blind|big blind}} là {{n:m11.m.bbs}}, nhưng M còn tính cả ante. Với M khoảng {{n:m11.m.red}} trở xuống ({{t:red-zone}}), bạn chỉ còn all-in hoặc {{t:fold}}.

## Stack càng ngắn, càng rộng

Các lưới trong bài học này được solver của ứng dụng tính cho tình huống đơn giản nhất: mọi người đều đã {{t:fold|bỏ bài}}, bạn chơi từ {{t:small-blind|small blind}} đấu với {{t:big-blind|big blind}}, và mỗi người chỉ có thể all-in hoặc {{t:fold|bỏ bài}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Ở mức {{n:m11.depth.15}} bạn all-in với khoảng {{n:m11.push.15}} tay, ở mức {{n:m11.depth.10}} với khoảng {{n:m11.push.10}}, còn ở mức {{n:m11.depth.5}} đã là khoảng {{n:m11.nash.push.5}}–{{n:m11.push.5}}. Bạn càng mạo hiểm ít so với các blind, càng nhiều tay bài có lời. Để so sánh, bảng từ một trang đào tạo đưa ra {{n:m11.ext.push.10}} ở mức {{n:m11.depth.10}}; chênh lệch nằm trong dung sai kiểm định của solver, và xu hướng là như nhau.

## Ba người chơi: càng nhiều đối thủ phía sau, càng hẹp

Khi bạn chơi từ Button, phía sau bạn còn hai người chơi chứ không phải một. Mỗi người đều có thể có tay bài mạnh, nên việc cả hai cùng {{t:fold|bỏ bài}} xảy ra ít hơn. Với ba người chơi và mỗi stack {{n:m11.depth.3max}}, Button all-in với khoảng {{n:m11.3max.push.btn}} tay, còn {{t:small-blind}}, khi Button đã {{t:fold|bỏ bài}}, với khoảng {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Chúng tôi đã đối chiếu hai lưới này với kết quả cân bằng đã công bố cho cùng tình huống (một công trình khoa học năm 2008: Button {{n:m11.jamfold3.btn}}). Vài tay bài có kết quả khác nhau không được đưa vào bài luyện tập.

## Hai cách để thắng

All-in thắng khi đối thủ {{t:fold|bỏ bài}}, hoặc khi đối thủ {{t:call|theo}} và thua ở showdown. Chỉ riêng việc đối thủ {{t:fold}} hiếm khi đủ: ở mức {{n:m11.depth.10}}, bạn mạo hiểm {{n:m11.push.10.risk}} để giành {{n:m11.push.10.win}} blind, nên tay bài không có cơ hội sẽ cần đối thủ {{t:fold|bỏ bài}} trong hơn {{n:m11.push.10.alpha}} trường hợp. Vì vậy, cả fold equity lẫn equity của tay bài khi đối thủ {{t:call|theo}} đều quan trọng.

## Ante mở rộng {{t:range}}

Ante là {{t:chips}} bổ sung trong {{t:pot|pot}} trước khi chia bài. Với {{t:bb-ante}}, {{t:big-blind}} đặt ante {{n:m11.ante}}, nên all-in giành được {{n:m11.push.10.win-ante}} thay vì {{n:m11.push.10.win}}, trong khi rủi ro vẫn như cũ. Trong cấu trúc này, {{t:range|range}} tăng từ khoảng {{n:m11.push.10}} lên khoảng {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} tay (solver của ứng dụng và một phép tính cân bằng độc lập chênh nhau một phần nhỏ của một điểm).

```range
push.sb-10-ante
```
