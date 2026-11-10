---
id: m9.l4
module: m9
order: 4
title: "Kế hoạch cho ba vòng"
sub: "Một tay bài chịu được bao nhiêu vòng giá trị"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}. Bạn trúng set trên flop {{t:dry|khô}}. Tay bài này chịu được bao nhiêu {{t:value|vòng giá trị}}?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Ba", correct: true, why: "Set trên flop {{t:dry|khô}} gần như luôn là tay mạnh nhất. Ở mỗi {{t:street|vòng}}, các tay yếu hơn của đối thủ (vd. một lá K, một lá 7, một {{t:pair|đôi}}) vẫn có thể trả tiền, nên bạn lên kế hoạch {{t:bet|cược}} ở flop, turn và river." }
      - { text: "Một", why: "Quá ít: với tay bài mạnh như vậy, chỉ một {{t:bet|lần cược}} sẽ bỏ lại phần lớn giá trị trên {{t:board|bàn}}. Đối thủ có lá K sẽ trả tiền nhiều hơn một lần." }
      - { text: "Không vòng nào: tôi {{t:check|xem bài}} để không làm đối thủ sợ", why: "{{t:check|Xem bài}} ở mọi {{t:street|vòng}} không làm {{t:pot|pot}} lớn lên. Set muốn {{t:pot}} lớn dần, vì nó thường thắng ở showdown." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}, {{t:spr}} khoảng {{n:spr.srp}}. Bạn có {{t:top-pair|đôi cao nhất}} với kicker tốt nhất. Kế hoạch là gì?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Thường là hai {{t:value|vòng giá trị}}, không có kế hoạch chơi cả stack", correct: true, why: "Đúng: các tay có K yếu hơn và các tay có 8 thường trả một hoặc hai {{t:bet|lần cược}}. Khi tiền trong {{t:pot|pot}} trở nên rất nhiều, chủ yếu là các tay mạnh hơn một {{t:pair|đôi}} trả tiền. Với {{t:spr}} khoảng {{n:spr.srp}}, cả stack chỉ vào pot khi các {{t:bet|lần cược}} lớn hơn {{t:pot}}." }
      - { text: "Ba {{t:street|vòng}} {{t:bet|cược}} lớn đến all-in", why: "Với {{t:spr}} khoảng {{n:spr.srp}}, đó là các {{t:bet|lần cược}} khoảng {{n:geo.srp.3}} {{t:pot|pot}} ở mỗi {{t:street|vòng}}. Đến river, trong {{t:pot|pot}} chủ yếu còn lại {{t:two-pair}} và set, những tay thắng một {{t:pair|đôi}}." }
      - { text: "Một {{t:street}} hoặc không vòng nào", why: "Quá thận trọng: {{t:top-pair}} với kicker tốt nhất trên flop {{t:dry|khô}} thắng nhiều tay của đối thủ. Nó thường chịu được hai {{t:value|vòng giá trị}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}. Bạn có {{t:pair|đôi}} giữa. Tay bài này chịu được bao nhiêu {{t:value|vòng giá trị}}?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Một hoặc không vòng nào: thường chỉ cần đi đến showdown là đủ", correct: true, why: "Đúng: {{t:pair}} giữa thắng các {{t:bluff|bluff}} và các {{t:pair|đôi}} yếu hơn, nhưng có rất ít tay yếu hơn sẽ trả vài {{t:bet|lần cược}}. Kế hoạch: nhiều nhất một {{t:bet|lần cược}} nhỏ, hoặc {{t:check|xem bài}} và {{t:call|theo}}." }
      - { text: "Hai, như {{t:top-pair}}", why: "{{t:pair}} giữa thua mọi tay có K. Sau {{t:bet|lần cược}} thứ hai, chủ yếu là các tay thắng nó trả tiền." }
      - { text: "Ba, để đối thủ không kịp ra bài", why: "Ba {{t:bet|lần cược}} với {{t:pair|đôi}} giữa chủ yếu được các tay mạnh hơn trả: các tay yếu hơn {{t:fold|bỏ bài}} ngay sau {{t:bet|lần cược}} thứ nhất hoặc thứ hai." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Pot}} sau 4-bet, {{t:spr}} khoảng {{n:spr.4bet}}. Bạn có {{t:top-pair|đôi cao nhất}} với kicker tốt nhất. Tay bài chịu được hai {{t:value|vòng giá trị}}. Kế hoạch là gì?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Hai {{t:bet|lần cược}}, mỗi lần khoảng {{n:geo.4bet.2}} {{t:pot|pot}}: ở turn cả stack vào pot", correct: true, why: "Đúng: với {{t:spr}} khoảng {{n:spr.4bet}}, hai {{t:street|vòng}} là đủ để đưa cả stack vào. Ở đây, hai {{t:value|vòng giá trị}} với {{t:top-pair|đôi cao nhất}} nghĩa là chơi cả stack." }
      - { text: "{{t:bet|Cược}} nhỏ rồi {{t:fold|bỏ bài}} trước all-in", why: "Với {{t:spr}} khoảng {{n:spr.4bet}}, {{t:fold|bỏ}} {{t:top-pair|đôi cao nhất}} có A trước all-in là bỏ quá nhiều: bạn chỉ cần khoảng {{n:eq.jam.4bet}} equity, và sau {{t:bet|lần cược}} của chính bạn còn cần ít hơn nữa." }
      - { text: "Tôi {{t:check|xem bài}} ở mọi {{t:street|vòng}} để kiểm soát {{t:pot|pot}}", why: "Kiểm soát {{t:pot|pot}} có ý nghĩa khi {{t:spr}} cao. Ở đây {{t:pot}} đã lớn so với stack, và các tay yếu hơn (AQ, QQ, JJ) sẵn lòng đưa phần còn lại vào." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Pot}} 3-bet, bạn có {{t:position|vị trí}}, {{t:spr}} khoảng {{n:spr.3bet-ip}}. Bạn có set và muốn đưa cả stack vào trước khi hết river. Chọn đường chơi nào?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Cược}} ở flop, turn và river, mỗi lần khoảng {{n:geo.3bet-ip.3}} {{t:pot|pot}}", correct: true, why: "Đúng: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} và {{n:geo.3bet-ip.river}} cộng lại là {{n:geo.3bet-ip.total}}, tức là cả stack. Ở mỗi {{t:street|vòng}}, đối thủ trả một phần hợp lý của {{t:pot|pot}}." }
      - { text: "{{t:bet|Cược}} 1/3 {{t:pot|pot}} ở mỗi {{t:street|vòng}}", sizeError: true, why: "Đường chơi đúng, kích thước sai: ba {{t:bet|lần cược}} mỗi lần 1/3 {{t:pot|pot}} chỉ đưa vào khoảng {{n:g3b.third.total}} trên {{n:spr.3bet-ip.stack}}. Kế hoạch chơi cả stack cần khoảng {{n:geo.3bet-ip.3}} {{t:pot|pot}}." }
      - { text: "Tôi {{t:check|xem bài}} ở flop và turn, all-in ở river", why: "Ở river, all-in cả stack sẽ là một {{t:bet|lần cược}} lớn gấp vài lần {{t:pot}}. Đối thủ chỉ trả bằng tay rất mạnh, còn các tay yếu hơn, vốn sẽ trả ba {{t:bet|lần cược}} nhỏ hơn, sẽ {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Vì sao nên định kế hoạch cho ba {{t:street|vòng}} ngay từ flop?"
    options:
      - { text: "Vì kích thước ở flop quyết định sau đó có thể đưa vào bao nhiêu", correct: true, why: "Đúng: {{t:pot}} tăng theo phép nhân. Một {{t:bet|lần cược}} nhỏ ở flop để lại {{t:pot|pot}} nhỏ cho turn và river, nên về sau khó đưa cả stack vào mà không cần các {{t:bet|lần cược}} rất lớn." }
      - { text: "Vì sau đó không được đổi kế hoạch", why: "Bạn đổi kế hoạch khi tình huống thay đổi (vd. một lá bài nguy hiểm ở turn). Điều quan trọng là {{t:bet|lần cược}} đầu tiên phải phù hợp với mục tiêu: bao nhiêu {{t:value|vòng giá trị}} và có chơi cả stack hay không." }
      - { text: "Vì đối thủ nhìn thấy kế hoạch của bạn", why: "Đối thủ không biết kế hoạch của bạn. Kế hoạch giúp chính bạn chọn kích thước, để cuối cùng trong {{t:pot|pot}} có đúng lượng tiền mà tay bài chịu được." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Pot}} chỉ có một lần raise, {{t:spr}} khoảng {{n:spr.srp}}. Bạn có {{t:top-pair|đôi cao nhất}} với kicker tốt. Bạn có cược kích thước hình học khoảng {{n:geo.srp.3}} {{t:pot|pot}} không?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "Không: đó là kích thước để chơi cả stack, còn tay này thường chịu được hai {{t:street|vòng}}", correct: true, why: "Đúng: kích thước hình học dùng để đưa cả stack vào. Với các {{t:bet|lần cược}} lớn hơn {{t:pot}}, các tay yếu hơn ngừng trả tiền, chỉ còn lại các tay mạnh hơn một {{t:pair|đôi}}." }
      - { text: "Có: tôi luôn cược theo kích thước hình học", why: "Kích thước hình học phù hợp với kế hoạch chơi cả stack. {{t:top-pair|Đôi cao nhất}} với {{t:spr}} khoảng {{n:spr.srp}} thường không có kế hoạch như vậy." }
      - { text: "Không: với {{t:top-pair|đôi cao nhất}} tôi luôn {{t:check|xem bài}}", why: "{{t:top-pair|Đôi cao nhất}} muốn {{t:bet|cược}} lấy giá trị, chỉ là nhỏ hơn và thường trong hai {{t:street|vòng}}, chứ không phải để chơi cả stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}: trong {{t:pot|pot}} có {{n:ex.pot}}, mỗi người có stack {{n:commit.stack}}. Bạn cược khoảng {{n:geo.spr2.2}} {{t:pot|pot}} ở flop và ở turn, đối thủ {{t:call|theo}}. Phần còn lại của stack thì sao?"
    options:
      - { text: "Sau turn, cả stack đã ở trong {{t:pot|pot}}", correct: true, why: "Đúng: {{n:geo.spr2.flop}} ở flop và {{n:geo.spr2.turn}} ở turn cộng lại là {{n:geo.spr2.total}}. Vì vậy với {{t:spr}} {{n:spr.commit}}, hai {{t:value|vòng giá trị}} với {{t:top-pair|đôi cao nhất}} là đủ để chơi cả stack." }
      - { text: "Còn khoảng một nửa cho river", why: "{{t:pot|Pot}} tăng theo phép nhân: sau flop trong đó có khoảng {{n:geo.spr2.flop-after}}, và một {{t:bet|lần cược}} khoảng {{n:geo.spr2.2}} ở turn là khoảng {{n:geo.spr2.turn}}, tức là phần còn lại của stack." }
      - { text: "Còn lại gần như cả stack", why: "Với {{t:spr}} {{n:spr.commit}}, stack chỉ bằng {{n:spr.commit}} lần {{t:pot|pot}}. Hai {{t:bet|lần cược}}, mỗi lần khoảng {{n:geo.spr2.2}} {{t:pot|pot}}, đưa vào toàn bộ {{n:geo.spr2.total}}." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Một kế hoạch tốt bắt đầu từ flop, trước khi bạn {{t:bet|đặt}} {{t:bet|lần cược}} đầu tiên. Hãy tự hỏi: tay bài của mình chịu được bao nhiêu {{t:value|vòng giá trị}} và mình có muốn chơi cả stack không? Câu trả lời kết hợp sức mạnh tay bài với {{t:spr}}.

## Bao nhiêu {{t:value|vòng giá trị}}

Qua mỗi {{t:street|vòng}}, các tay yếu hơn của đối thủ {{t:fold|bỏ bài}}, và trong {{t:pot|pot}} chủ yếu còn lại các tay mạnh hơn tay của bạn. Vì vậy tay mạnh hơn chịu được nhiều {{t:bet|lần cược}} hơn:

| Tay bài | {{t:value|Vòng giá trị}} (thường) |
|---|---|
| Rất mạnh: set, {{t:straight}}, {{t:two-pair}} cao | Ba |
| {{t:top-pair|Đôi cao nhất}} với kicker tốt, {{t:overpair}} | Hai; vòng thứ ba khi đối thủ trả bằng các tay yếu hơn |
| {{t:pair|Đôi}} yếu hơn (giữa, thấp) | Một hoặc không vòng nào |

Số {{t:street|vòng}} trong bảng là cách đơn giản hóa: nhiều thứ phụ thuộc vào {{t:texture|kết cấu}} của {{t:board|bàn}}, các lá ở turn và river, và vào đối thủ.

## Kết hợp tay bài với {{t:spr}}

- **Tay bài cho ba {{t:street|vòng}}, vùng {{t:spr}} cho phép chơi stack và bạn muốn cả stack:** cược kích thước hình học từ flop (trong {{t:pot|pot}} 3-bet khi {{t:in-position|có vị trí}}, khoảng {{n:geo.3bet-ip.3}} {{t:pot|pot}}).
- **Tay bài cho hai {{t:street|vòng}} khi {{t:spr}} thấp:** với {{t:spr}} khoảng {{n:spr.commit}}, hai {{t:bet|lần cược}}, mỗi lần khoảng {{n:geo.spr2.2}} {{t:pot|pot}}, đã là cả stack, nên bạn chơi stack.
- **Tay bài cho hai {{t:street|vòng}} khi {{t:spr}} cao:** trong {{t:pot|pot}} chỉ có một lần raise ({{t:spr}} khoảng {{n:spr.srp}}), bạn cược lấy giá trị nhưng không lên kế hoạch đưa cả stack vào.

Ba {{t:value|vòng giá trị}} không giống với chơi cả stack. {{t:two-pair|Hai đôi}} cao chịu được ba {{t:street|vòng}}, nhưng trong {{t:pot|pot}} chỉ có một lần raise ({{t:spr}} khoảng {{n:spr.srp}}, trên {{n:spr.zone.deep}}) thường không chơi cả stack: ở vùng này, những tay chơi stack là set, {{t:straight}} và các tay mạnh hơn (các vùng {{t:spr}} từ bài học đầu tiên).

## Đường chơi

Đường chơi là kế hoạch hành động qua các {{t:street|vòng}} tiếp theo. Vài đường chơi cơ bản:

- **{{t:bet}}, {{t:bet}}, {{t:bet}}:** tay bài cho ba {{t:value|vòng giá trị}},
- **{{t:bet}}, {{t:bet}}, {{t:check}}:** tay bài cho hai {{t:street|vòng}}, ở river bạn đi đến showdown,
- **{{t:bet}} hoặc {{t:check}}, sau đó {{t:check}} và {{t:call|theo}}:** {{t:pair|đôi}} yếu hơn, muốn đi đến showdown với giá rẻ.

## Kích thước ở flop quyết định phần còn lại

{{t:pot|Pot}} tăng theo phép nhân, nên một {{t:bet|lần cược}} nhỏ ở flop để lại {{t:pot|pot}} nhỏ cho các {{t:street|vòng}} tiếp theo. Trong {{t:pot|pot}} 3-bet, ba {{t:bet|lần cược}}, mỗi lần 1/3 {{t:pot|pot}}, chỉ đưa vào khoảng {{n:g3b.third.total}} từ stack {{n:spr.3bet-ip.stack}}, còn ba {{t:bet|lần cược}}, mỗi lần khoảng {{n:geo.3bet-ip.3}} {{t:pot|pot}}, đưa vào cả stack.

:::note Kế hoạch không phải là bất biến
Ở turn và river, bạn đánh giá lại kế hoạch: một lá bài nguy hiểm có thể làm giảm số {{t:value|vòng giá trị}}. Cách chơi turn và river được dạy trong mô-đun M7 và M8. Số {{t:value|vòng giá trị}} cho từng nhóm tay bài là một quy tắc kinh nghiệm, tổng hợp từ một số tài liệu đào tạo: trong {{t:pot|pot}} chỉ có một lần raise, {{t:spr}} quá cao để nhiều {{t:top-pair|đôi cao nhất}} có thể thoải mái thu được ba {{t:value|vòng giá trị}}.
:::
