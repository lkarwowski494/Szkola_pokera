---
id: m1.l1
module: m1
order: 1
title: "Diễn biến một ván bài"
sub: "Blind, các vòng bài và những nước đi có thể chọn"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "Đang ở flop, chưa ai trước bạn {{t:bet|cược}}. Bạn có thể làm gì?"
    options:
      - { text: "{{t:check|Xem bài}} hoặc {{t:bet|cược}}", correct: true, why: "Khi trước bạn chưa có {{t:bet|cược}} nào, bạn có hai lựa chọn: để lượt trôi qua miễn phí hoặc tự mình {{t:bet|cược}}." }
      - { text: "{{t:call|Theo}}", why: "Không có gì để {{t:call|theo}}, vì chưa ai {{t:bet|cược}} gì cả." }
      - { text: "{{t:raise|Tố}}", why: "Bạn chỉ có thể {{t:raise|tố}} trên {{t:bet}} của người khác. {{t:bet}} đầu tiên trong vòng được gọi là bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Có bao nhiêu {{t:community-cards|lá bài chung}} xuất hiện ở flop?"
    options:
      - { text: "3", correct: true, why: "Flop là ba lá ra cùng lúc. Sau đó turn và river mỗi vòng thêm một lá." }
      - { text: "1", why: "Turn và river mỗi lần ra một lá." }
      - { text: "5", why: "Phải đến river mới có đủ năm {{t:community-cards|lá bài chung}}." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "Đối thủ đã {{t:bet|cược}} 20 {{t:chips|chip}}. Bạn có bài yếu và không muốn chơi tiếp. Bạn làm gì?"
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Khi có {{t:bet}} mà bạn không muốn trả, bạn {{t:fold|bỏ bài}}. Bạn chỉ mất phần đã bỏ vào." }
      - { text: "{{t:check|Xem bài}}", why: "Không thể check khi đang có {{t:bet}} cần {{t:call|theo}}." }
      - { text: "{{t:call|Theo}}", why: "{{t:call|Theo}} tốn 20 {{t:chips|chip}}. Vì bạn không muốn chơi, đó là khoản mất." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "{{t:betting-round}} nào là vòng cuối cùng?"
    options:
      - { text: "River", correct: true, why: "River là {{t:community-cards|lá bài chung}} thứ năm. Nếu sau vòng cược ở river vẫn còn ít nhất hai người chơi, họ lật bài (showdown)." }
      - { text: "Turn", why: "Turn là lá thứ tư. Sau đó vẫn còn river." }
      - { text: "Flop", why: "Flop là vòng đầu tiên có {{t:community-cards|lá bài chung}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Bạn đang ở {{t:big-blind|mù lớn}}, mọi người đều đã {{t:fold|bỏ bài}}, {{t:small-blind}} chỉ bù thêm cho đủ. Bạn có bài yếu. Bạn làm gì?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "{{t:big-blind}} của bạn được tính như một {{t:bet}}, còn {{t:small-blind}} chỉ cược bằng. Không ai {{t:raise|tố}}, nên bạn được xem flop miễn phí. Bài yếu không phải lý do để bỏ bài khi việc đó không tốn gì." }
      - { text: "{{t:fold|Bỏ bài}}", why: "{{t:fold|Bỏ bài}} khi bạn có thể {{t:check|xem bài}} miễn phí là thiệt hại thuần túy." }
      - { text: "{{t:raise|Tố}}", why: "Với 7-2, bạn không có gì để phát triển; {{t:check}} cho bạn flop miễn phí." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
Mỗi ván bài đều diễn ra theo một thứ tự cố định. Trước tiên, hai người chơi đặt các khoản cược bắt buộc, gọi là **blind**: {{t:small-blind}} và {{t:big-blind}}. Nhờ vậy, trong {{t:pot|hũ}} luôn có thứ để tranh giành.

Trước flop, {{t:big-blind}} được tính như một {{t:bet}}: ai muốn chơi thì ít nhất phải {{t:call|theo}}. {{t:big-blind|Mù lớn}} hành động cuối cùng trước flop. Nếu không ai {{t:raise|tố}}, người này có thể {{t:check|xem bài}} và xem flop mà không phải trả thêm.

## Bốn {{t:betting-round|vòng cược}}

1. **Preflop**: bạn chỉ có 2 lá bài của mình.
2. **Flop**: 3 {{t:community-cards}} được đặt lên {{t:board}}.
3. **Turn**: lá thứ tư.
4. **River**: lá thứ năm, lá cuối cùng.

Nếu sau vòng cược ở river vẫn còn ít nhất hai người chơi, họ lật bài. Đó là **showdown**: tay bài mạnh nhất thắng {{t:pot|hũ}}. Nếu tất cả trừ một người đã {{t:fold|bỏ bài}} trước đó, người còn lại thắng {{t:pot|hũ}} mà không cần lật bài.

## Các nước đi có thể chọn

- **{{t:check|Xem bài}}**: bạn không bỏ thêm gì. Chỉ được làm khi trong vòng này chưa ai trước bạn {{t:bet|cược}} hoặc {{t:raise|tố}} (trước flop, {{t:big-blind|mù lớn}} có thể {{t:check|xem bài}} nếu không ai {{t:raise|tố}}).
- **{{t:bet|Cược}}**: {{t:bet}} đầu tiên trong vòng. Trong các công thức ở những bài sau, chúng ta viết ngắn gọn là “bet”.
- **{{t:call|Theo}}**: bạn bỏ vào cho bằng {{t:bet|mức cược}} của đối thủ.
- **{{t:raise|Tố}}**: bạn nâng {{t:bet}} của người khác lên.
- **{{t:fold|Bỏ bài}}**: bạn bỏ bài đi và mất phần đã bỏ vào.

:::note Cần ghi nhớ
Nếu có người đã {{t:bet|cược}}, bạn có thể {{t:fold|bỏ bài}}, {{t:call|theo}} hoặc {{t:raise|tố}}. Nếu chưa ai {{t:bet|cược}}, bạn có thể {{t:check|xem bài}} hoặc {{t:bet|cược}}.
:::

:::note All-in và {{t:side-pot}}
Bạn không thể {{t:bet|cược}} nhiều hơn số bạn có trước mặt. Khi bạn bỏ vào toàn bộ {{t:chips}}, bạn **all-in**: bạn không tham gia cược tiếp nữa, còn các {{t:community-cards}} còn lại được chia ra đến hết. Từ mỗi đối thủ, bạn chỉ có thể thắng tối đa bằng số bạn đã bỏ vào. Nếu những người khác tiếp tục chơi với số tiền lớn hơn, phần dư sẽ vào **{{t:side-pot|hũ phụ}}**, và chỉ họ tranh nhau phần đó.
:::
