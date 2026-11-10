---
id: m3.l1
module: m3
order: 1
title: "Vị trí tại bàn chơi"
sub: "Vì sao chỗ ngồi lại quan trọng"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "{{t:position|Vị trí}} nào là tốt nhất?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "Từ flop trở đi, Button hành động cuối cùng, nên luôn biết quyết định của các đối thủ trước khi đưa ra quyết định của mình." }
      - { text: "{{t:big-blind|Big blind}}", why: "{{t:big-blind|BB}} trả ít hơn để vào bài vì đã bỏ tiền trước, nhưng từ flop trở đi lại hành động trong số những người đầu tiên." }
      - { text: "{{t:utg}}", why: "{{t:utg}} hành động đầu tiên ở preflop và có tất cả người chơi trong bàn ở phía sau. Đây là chỗ khó mở cược nhất." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Mọi người trước bạn đều đã {{t:fold|bỏ bài}}. Bạn làm gì?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "K9 khác chất nằm ngoài {{t:range|dải bài}} {{t:open|mở}} từ {{t:utg}}, tức là ngoài danh sách các tay bài bạn {{t:open|mở}} từ {{t:position|vị trí}} này. Phía sau bạn còn năm người chơi và thường có ai đó cầm lá K với kicker tốt hơn." }
      - { text: "{{t:raise|Tố}}", why: "Từ {{t:utg}}, bạn chỉ {{t:open|mở}} khoảng {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} số tay bài. K9o dễ trúng lá K rồi thua KQ hoặc AK." }
      - { text: "Bỏ thêm cho bằng {{t:big-blind|big blind}}", why: "Chỉ bỏ thêm cho bằng (limp) từ {{t:utg}} là một thói quen kém. Hoặc tay bài đáng để {{t:raise|tố}}, hoặc bạn {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Vẫn tay bài đó, nhưng bạn ngồi ở Button và mọi người trước bạn đều đã {{t:fold|bỏ bài}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Tố}}", correct: true, why: "Chỉ còn lại các blind, và sau flop bạn có {{t:position|vị trí}}. Ở Button, bạn {{t:open|mở}} khoảng {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} số tay bài, và K9o nằm trong số đó." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá thận trọng. Khi chỉ còn các blind, tay bài này đủ tốt, và {{t:position}} còn làm tăng giá trị của nó." }
      - { text: "Bỏ thêm cho bằng {{t:big-blind|big blind}}", why: "Limp đánh mất {{t:initiative|thế chủ động}}. {{t:raise|Tố}} thường giúp bạn lấy được các blind ngay lập tức." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Vì sao hành động cuối cùng lại có lợi?"
    options:
      - { text: "Tôi biết đối thủ đã làm gì trước khi quyết định", correct: true, why: "Mỗi hành động của đối thủ là một thông tin. Người hành động cuối có nhiều thông tin nhất và có thể {{t:check|check}} với chi phí thấp hoặc giành lấy {{t:pot|pot}} khi những người khác lộ ra điểm yếu." }
      - { text: "Tôi được chia bài tốt hơn", why: "Bài được chia ngẫu nhiên, bất kể {{t:position|vị trí}} nào." }
      - { text: "Tôi trả blind nhỏ hơn", why: "Ở Button bạn không phải trả blind, nhưng đó không phải lợi thế chính. Quan trọng nhất là thông tin." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
Nút dealer (**{{t:button|BTN}}**, Button) di chuyển sau mỗi ván. Nó quyết định thứ tự hành động. Từ flop trở đi, Button hành động **cuối cùng**, và đó là một lợi thế rất lớn: bạn thấy mọi người khác đã làm gì trước khi tự mình quyết định. Ai hành động trước đối thủ sau flop là đang chơi {{t:out-of-position}}: họ phải quyết định mà không biết đối thủ sẽ đánh thế nào.

## Các {{t:position|vị trí}} tại bàn 6 người

| {{t:position|Vị trí}} | Khi nào hành động | {{t:open|Mở}} rộng đến đâu |
|---|---|---|
| {{t:utg}} | Đầu tiên ở preflop | khoảng {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} số tay bài |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Sau {{t:utg}}; {{t:cutoff|CO}} ngay trước Button | ngày càng rộng hơn |
| {{t:button|BTN}} | Cuối cùng từ flop trở đi | khoảng {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} số tay bài |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Cuối cùng ở preflop, đầu tiên từ flop trở đi | {{t:small-blind|SB}} {{t:open|mở}} khi mọi người đều {{t:fold|bỏ bài}} (bài học về {{t:range|dải bài}}); bảo vệ blind ở mô-đun M4 |

**{{t:hijack|HJ}}** (Hijack) ngồi sau {{t:utg}}, cách Button hai chỗ về phía trước, còn **{{t:cutoff|CO}}** (Cutoff) ngồi ngay trước Button. Đây là các {{t:position|vị trí}} giữa: phía sau họ có ít người chơi hơn so với {{t:utg}}, nên bạn {{t:open|mở}} từ đây rộng hơn, nhưng vẫn hẹp hơn so với từ Button.

:::note Kích thước {{t:open|mở}} bài
Bạn {{t:open|mở}} bằng cách {{t:raise|tố}} lên {{n:pf.open-size}} từ mọi {{t:position|vị trí}}, còn từ {{t:small-blind|small blind}} thì lên {{n:pf.open-size-sb}}. Đây là cách đơn giản hóa: trong lời giải của solver, các lần {{t:open|mở}} từ {{t:early-position|vị trí đầu}} nhỏ hơn một chút (ví dụ {{n:pf.open-size.solver-utg}} từ {{t:utg}} và {{n:pf.open-size.solver-co}} từ {{t:cutoff|CO}}), nhưng một kích thước duy nhất thì dễ học hơn. Khi vào bài đầu tiên, bạn không chỉ bỏ thêm cho bằng blind (đó là {{t:limp}}, tức là vào bài chỉ bằng cách {{t:call|theo}} {{t:big-blind|big blind}}): {{t:raise}} có thể thắng {{t:pot|pot}} ngay lập tức và mang lại cho bạn {{t:initiative|thế chủ động}}, vì ai {{t:raise|tố}} sau cùng thường là người đặt {{t:bet|cược}} tiếp theo.
:::
