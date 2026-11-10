---
id: m9.l3
module: m9
order: 3
title: "Kích cỡ cược hình học"
sub: "Cùng một tỷ lệ của hũ cho đến khi all-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Trong {{t:pot|hũ}} có {{n:ex.pot}}. Bạn cược cả {{t:pot|hũ}} ({{n:ex.bet.pot}}), đối thủ {{t:call|theo}}. Bây giờ trong {{t:pot|hũ}} có bao nhiêu? Hãy nhập một số."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Một {{t:bet|cược}} bằng cả {{t:pot|hũ}} và một lần {{t:call|theo}} nhân {{t:pot|hũ}} lên ba lần. Tổng quát: {{t:bet|cược}} f {{t:pot|hũ}} và {{t:call|theo}} nhân {{t:pot|hũ}} với (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Trong {{t:pot|hũ}} có {{n:ex.pot}}. Ở flop, turn và river bạn cược cả {{t:pot|hũ}} ({{n:ex.bet.pot}}, rồi {{n:geo.ex.turn}}, rồi {{n:geo.ex.river}}), và lần nào đối thủ cũng {{t:call|theo}}. Mỗi người bỏ vào tổng cộng bao nhiêu? Hãy nhập một số."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. {{t:pot|Hũ}} tăng từ {{n:ex.pot}} lên {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} và {{n:geo.ex.river-after}}. Vậy ba {{t:bet|cược}} bằng cả {{t:pot|hũ}} đưa đến all-in khi {{t:spr}} là {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Với {{t:spr}} bằng bao nhiêu thì ba {{t:bet|cược}} nửa {{t:pot|hũ}} (flop, turn, river, lần nào cũng được theo) đưa vào đúng toàn bộ stack?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Hũ}} {{n:ex.pot}}: các {{t:bet|cược}} {{n:ex.bet.half}}, {{n:geo.half.turn}} và {{n:geo.half.river}} cộng lại là {{n:geo.half.total}}, tức stack {{n:geo.half.stack}}. Theo công thức: (1 + 2·{{n:ex.frac.half}}) mũ ba = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Với {{t:spr}} {{n:spr.zone.deep}} phải cược cả {{t:pot|hũ}} ở mọi {{t:street|vòng cược}}. Khi đó các {{t:bet|cược}} nửa {{t:pot|hũ}} chỉ đưa vào {{n:geo.half.total}} trên {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Với {{t:spr}} {{n:spr.commit}}, ba {{t:bet|cược}} nửa {{t:pot|hũ}} là quá nhiều: stack sẽ hết ngay ở river, trước khi bạn {{t:bet|cược}} đủ nửa {{t:pot|hũ}}. Kế hoạch này ứng với {{t:spr}} {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Hũ}} một lần tố: ở flop có {{n:bb.pot-after.vs-btn}}, mỗi người còn {{n:spr.srp.stack}} phía sau. Bạn cược nửa {{t:pot|hũ}} ở flop, turn và river, đối thủ luôn {{t:call|theo}}. Tổng cộng bạn bỏ vào bao nhiêu?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. Phần lớn stack vẫn ở ngoài {{t:pot|hũ}}: với {{t:spr}} khoảng {{n:spr.srp}}, nửa {{t:pot|hũ}} là quá nhỏ để chơi cho cả stack." }
      - { text: "{{n:spr.srp.stack}}, tức toàn bộ stack", why: "{{t:pot|Hũ}} chỉ tăng lên {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} và tiếp theo. Ba {{t:bet|cược}} nửa {{t:pot|hũ}} đưa vào tổng cộng {{n:srp.half.total}}, còn xa mới hết stack." }
      - { text: "{{n:srp.potbet.total}}", why: "Đó là số tiền mà ba {{t:bet|cược}} bằng cả {{t:pot|hũ}} sẽ đưa vào ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). Các {{t:bet|cược}} nửa {{t:pot|hũ}} chỉ đưa vào {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Hũ}} một lần tố, {{t:spr}} khoảng {{n:spr.srp}}. Kích cỡ {{t:bet|cược}} cố định nào ở flop, turn và river đưa vào toàn bộ stack?"
    options:
      - { text: "Khoảng {{n:geo.srp.3}} {{t:pot|hũ}}, tức lớn hơn cả {{t:pot|hũ}}", correct: true, why: "Đúng: ngay cả ba {{t:bet|cược}} bằng cả {{t:pot|hũ}} cũng chỉ đưa vào {{n:srp.potbet.total}} trên stack {{n:spr.srp.stack}}. Toàn bộ stack chỉ vào hết khi cược khoảng {{n:geo.srp.3}} {{t:pot|hũ}} ở mỗi {{t:street|vòng cược}}." }
      - { text: "Khoảng {{n:geo.3bet-ip.3}} {{t:pot|hũ}}", why: "Mức này đủ trong {{t:pot|hũ}} 3-bet ({{t:spr}} khoảng {{n:spr.3bet-ip}}). Trong {{t:pot|hũ}} một lần tố, {{t:spr}} khoảng {{n:spr.srp}}, nên các {{t:bet|cược}} phải lớn hơn {{t:pot|hũ}}." }
      - { text: "Khoảng {{n:cbet.size.small}} {{t:pot|hũ}}", why: "Ba {{t:bet|cược}} như vậy chỉ đưa vào một phần nhỏ của stack. Với {{t:spr}} khoảng {{n:spr.srp}}, cần khoảng {{n:geo.srp.3}} {{t:pot|hũ}} ở mỗi {{t:street|vòng cược}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Hũ}} 3-bet, bạn có {{t:position|vị trí}}, {{t:spr}} khoảng {{n:spr.3bet-ip}}. Bạn có bài rất mạnh và muốn đưa toàn bộ stack vào trước river bằng các {{t:bet|cược}} đều nhau. Ở flop bạn cược bao nhiêu?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Khoảng {{n:geo.3bet-ip.3}} {{t:pot|hũ}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Đúng: (1 + 2f) mũ ba = 1 + 2·{{n:spr.3bet-ip}} cho f ≈ {{n:geo.3bet-ip.3}}. Các {{t:bet|cược}} {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} và {{n:geo.3bet-ip.river}} cộng lại là {{n:geo.3bet-ip.total}}, tức toàn bộ stack." }
      - { text: "{{n:cbet.size.small}} {{t:pot|hũ}} ({{n:g3b.third.flop}})", sizeError: true, why: "Hành động đúng, kích cỡ sai: ba {{t:bet|cược}} 1/3 {{t:pot|hũ}} chỉ đưa vào khoảng {{n:g3b.third.total}} trên {{n:spr.3bet-ip.stack}}. Kế hoạch “toàn bộ stack vào trước river” cần khoảng {{n:geo.3bet-ip.3}} {{t:pot|hũ}}." }
      - { text: "{{t:check|Xem bài}}, rồi all-in ở river", why: "All-in {{n:spr.3bet-ip.stack}} vào {{t:pot|hũ}} {{n:vs3bet.pot-after}} ở river là một {{t:bet|cược}} lớn hơn {{t:pot|hũ}} nhiều lần: đối thủ chỉ trả bằng bài rất mạnh. Các {{t:bet|cược}} đều nhau trên ba {{t:street|vòng cược}} cho đối thủ cơ hội bỏ tiền vào từng chút một." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Hũ}} sau khi bạn 3-bet từ {{t:big-blind|mù lớn}}, {{t:spr}} khoảng {{n:spr.3bet-oop}}. Bạn muốn đưa toàn bộ stack vào trước river bằng các {{t:bet|cược}} đều nhau. Mỗi {{t:street|vòng cược}} cược bao nhiêu phần {{t:pot|hũ}}?"
    table: { position: BB }
    options:
      - { text: "Khoảng {{n:geo.3bet-oop.3}} {{t:pot|hũ}}", correct: true, why: "Đúng: với {{t:spr}} khoảng {{n:spr.3bet-oop}}, (1 + 2f) mũ ba = 1 + 2·{{n:spr.3bet-oop}}, nên f ≈ {{n:geo.3bet-oop.3}}. {{t:spr}} thấp hơn so với sau 3-bet {{t:in-position|có vị trí}}, nên kích cỡ cũng nhỏ hơn." }
      - { text: "Khoảng {{n:geo.3bet-ip.3}} {{t:pot|hũ}}", sizeError: true, why: "Gần đúng, nhưng đó là kích cỡ cho {{t:spr}} khoảng {{n:spr.3bet-ip}}. Với {{t:spr}} khoảng {{n:spr.3bet-oop}}, chỉ cần khoảng {{n:geo.3bet-oop.3}} {{t:pot|hũ}}, còn với các {{t:bet|cược}} lớn hơn thì đến river sẽ không đủ stack cho một {{t:bet|cược}} trọn vẹn." }
      - { text: "Khoảng {{n:geo.4bet.3}} {{t:pot|hũ}}", sizeError: true, why: "Mức này đủ sau 4-bet ({{t:spr}} khoảng {{n:spr.4bet}}). Với {{t:spr}} khoảng {{n:spr.3bet-oop}}, ba {{t:bet|cược}} như vậy sẽ để lại một phần lớn stack." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Hũ}} sau 4-bet, {{t:spr}} khoảng {{n:spr.4bet}}. Bạn muốn đưa toàn bộ stack vào bằng hai {{t:bet|cược}}: ở flop và ở turn. Ở flop bạn cược bao nhiêu?"
    options:
      - { text: "Khoảng {{n:geo.4bet.2}} {{t:pot|hũ}}", correct: true, why: "Đúng: với hai {{t:street|vòng cược}}, (1 + 2f) bình phương = 1 + 2·{{n:spr.4bet}}, nên f ≈ {{n:geo.4bet.2}}. Sau {{t:bet|cược}} và {{t:call|theo}}, phần còn lại đúng bằng một {{t:bet|cược}} cùng kích cỡ ở turn." }
      - { text: "Khoảng {{n:geo.4bet.3}} {{t:pot|hũ}}", sizeError: true, why: "Đó là kích cỡ cho ba {{t:street|vòng cược}}. Với hai {{t:bet|cược}} {{n:geo.4bet.3}} {{t:pot|hũ}}, một phần stack sẽ còn lại cho river." }
      - { text: "All-in ngay ({{n:spr.4bet.stack}})", why: "Đó là kế hoạch cho một {{t:street|vòng cược}}, không phải hai. Một {{t:bet|cược}} khoảng {{n:spr.4bet}} {{t:pot|hũ}} ngay lập tức chỉ cho đối thủ một quyết định: {{t:call|theo}} toàn bộ hoặc {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Kích cỡ cược hình học nghĩa là gì?"
    options:
      - { text: "Cùng một tỷ lệ của {{t:pot|hũ}} ở mọi {{t:street|vòng cược}}, sao cho {{t:bet|cược}} cuối cùng là all-in", correct: true, why: "Đúng: {{t:bet|cược}} f và {{t:call|theo}} nhân {{t:pot|hũ}} với (1 + 2f) ở mỗi {{t:street|vòng cược}}. Bạn chọn kích cỡ sao cho sau {{t:bet|cược}} cuối cùng toàn bộ stack đã nằm trong {{t:pot|hũ}}." }
      - { text: "Luôn {{t:bet|cược}} bằng cả {{t:pot|hũ}}", why: "Cược cả {{t:pot|hũ}} chỉ là hình học ở một mức {{t:spr}} (ví dụ {{n:spr.zone.deep}} cho ba {{t:street|vòng cược}}). Với {{t:spr}} khoảng {{n:spr.3bet-ip}}, chỉ cần khoảng {{n:geo.3bet-ip.3}} {{t:pot|hũ}}." }
      - { text: "Các {{t:bet|cược}} tăng dần theo tỷ lệ phần trăm: nhỏ ở flop, lớn ở river", why: "Số tiền tăng vì {{t:pot|hũ}} tăng, nhưng tỷ lệ của {{t:pot|hũ}} ở mọi {{t:street|vòng cược}} là như nhau. Trong {{t:pot|hũ}} 3-bet, đó là {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} và {{n:geo.3bet-ip.river}}, lần nào cũng khoảng {{n:geo.3bet-ip.3}} {{t:pot|hũ}}." }
---
Trước khi {{t:bet|cược}} ở flop, bạn nên biết có thể đưa bao nhiêu tiền vào cho đến river. Một {{t:bet|cược}} và một lần {{t:call|theo}} không cộng thêm một khoản cố định vào {{t:pot|hũ}}, mà nhân nó lên.

## {{t:pot|Hũ}} tăng như thế nào

Một {{t:bet|cược}} bằng f {{t:pot|hũ}} và một lần {{t:call|theo}} nhân {{t:pot|hũ}} với (1 + 2f). Với {{t:bet|cược}} bằng cả {{t:pot|hũ}}, {{t:pot|hũ}} tăng gấp ba:

| {{t:street|Vòng cược}} | {{t:pot|Hũ}} trước khi {{t:bet|cược}} | {{t:bet|Cược}} (cả {{t:pot|hũ}}) | {{t:pot|Hũ}} sau khi {{t:call|theo}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Mỗi người chơi đã bỏ vào {{n:geo.ex.total}}, tức {{n:spr.zone.deep}} lần {{t:pot|hũ}}. Vậy ba {{t:bet|cược}} bằng cả {{t:pot|hũ}} đưa đến all-in đúng khi {{t:spr}} là {{n:spr.zone.deep}}. Đó là nguồn gốc của ngưỡng vùng {{t:spr}} cao nhất trong bài học đầu tiên.

## Công thức

Kích cỡ cược hình học là cùng một tỷ lệ f của {{t:pot|hũ}} ở mọi {{t:street|vòng cược}}, được chọn sao cho {{t:bet|cược}} cuối cùng là all-in. Với n {{t:street|vòng cược}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Ví dụ: với {{t:spr}} {{n:geo.half.spr}}, ba {{t:bet|cược}} nửa {{t:pot|hũ}} đưa vào toàn bộ stack: {{n:ex.bet.half}}, {{n:geo.half.turn}} và {{n:geo.half.river}}, tổng cộng {{n:geo.half.total}} với {{t:pot|hũ}} {{n:ex.pot}}.

## Kích cỡ cho các {{t:pot|hũ}} thường gặp

| {{t:pot|Hũ}} | {{t:spr}} | Ba {{t:street|vòng cược}} | Hai {{t:street|vòng cược}} |
|---|---|---|---|
| {{t:open|Tố mở}} và {{t:call|theo}} | {{n:spr.srp}} | {{n:geo.srp.3}} {{t:pot|hũ}} | – |
| 3-bet {{t:in-position|có vị trí}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} {{t:pot|hũ}} | – |
| 3-bet từ {{t:big-blind|mù lớn}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} {{t:pot|hũ}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} {{t:pot|hũ}} | {{n:geo.4bet.2}} {{t:pot|hũ}} |

Trong {{t:pot|hũ}} 3-bet {{t:in-position|có vị trí}}, đó là các {{t:bet|cược}} {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} và {{n:geo.3bet-ip.river}}, tổng cộng {{n:geo.3bet-ip.total}}, tức toàn bộ stack.

## {{t:pot|Hũ}} một lần tố là hũ sâu

Với {{t:spr}} khoảng {{n:spr.srp}}, ba {{t:bet|cược}} nửa {{t:pot|hũ}} chỉ đưa vào {{n:srp.half.total}}, còn ba {{t:bet|cược}} bằng cả {{t:pot|hũ}} đưa vào {{n:srp.potbet.total}} trên stack {{n:spr.srp.stack}}. Toàn bộ stack chỉ vào hết khi các {{t:bet|cược}} lớn hơn {{t:pot|hũ}}. Vì vậy, trong {{t:pot|hũ}} như thế, việc chơi cho cả stack chủ yếu xảy ra với bài rất mạnh.

:::note Khi nào điều này hữu ích
Kích cỡ cược hình học hữu ích khi bạn muốn đưa toàn bộ stack vào trước river, tức là khi có bài rất mạnh. Không phải bài nào cũng muốn chơi cho cả stack: một bài chịu được bao nhiêu {{t:value|vòng cược lấy giá trị}} là chủ đề của bài học tiếp theo. Công thức chỉ là toán học thuần túy. Các mô-đun trước đưa ra kích cỡ phù hợp với {{t:texture|kết cấu}} flop; kích cỡ cược hình học là điểm tham chiếu cho kế hoạch chơi cả stack.
:::
