---
id: m8.l3
module: m8
order: 3
title: "Blocker"
sub: "Bluff bằng tay bài nào"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "{{t:blocker}} là gì?"
    options:
      - { text: "Một lá bài trong tay bạn khiến đối thủ có ít {{t:combo|tổ hợp}} của một tay bài nào đó hơn", correct: true, why: "Đối thủ không thể có lá bài bạn đang cầm. Khi bạn có một lá A, đối thủ có ít lá A hơn: ít {{t:pair|đôi}} A hơn, ít AK hơn, ít thùng có lá A hơn." }
      - { text: "Một lá bài trên {{t:board|bàn}} làm hỏng một {{t:draw}}", why: "Đôi khi người ta nói vậy một cách thông thường về các lá trên {{t:board|bàn}}, nhưng {{t:blocker}} theo nghĩa này là lá bài trong tay bạn. Các lá trên {{t:board|bàn}} thì cả hai người chơi đều thấy." }
      - { text: "Một cược nhỏ nhằm chặn một cược lớn của đối thủ", why: "Đó là cái gọi là blocking bet, một chuyện khác. {{t:blocker|Blocker}} là lá bài trong tay làm giảm số {{t:combo|tổ hợp}} của đối thủ." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Khi không có thông tin gì, AK có {{n:combos.unpaired}} {{t:combo|tổ hợp}}. Bạn cầm một lá K (không có A). Đối thủ có thể có bao nhiêu {{t:combo|tổ hợp}} AK? Hãy nhập số."
    answer: combos.unpaired.one-blocked
    explanation: "Có {{n:cards.suits}} lá A, còn lá K chỉ còn lại {{n:pair.outs.per-rank}}, vì một lá đang ở trong tay bạn: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Một lá bài loại bỏ trọn một phần tư số {{t:combo|tổ hợp}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "{{t:pair|Đôi}} A có {{n:combos.pair}} {{t:combo|tổ hợp}}. Bạn cầm một lá A. Đối thủ có thể có bao nhiêu {{t:combo|tổ hợp}} {{t:pair|đôi}} A? Hãy nhập số."
    answer: combos.pair.one-blocked
    explanation: "Còn lại {{n:pair.outs.per-rank}} lá A, và từ ba lá chỉ có thể tạo được {{n:combos.pair.one-blocked}} {{t:pair|đôi}}. Một lá A trong tay bạn loại bỏ một nửa số {{t:combo|tổ hợp}} AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Bạn cầm [[Ah Kc]]. Đối thủ có thể có bao nhiêu {{t:combo|tổ hợp}} AK?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Còn lại {{n:pair.outs.per-rank}} lá A và {{n:pair.outs.per-rank}} lá K: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Đó là con số nếu bạn chỉ cầm lá A hoặc chỉ cầm lá K. Bạn chặn cả hai hạng bài." }
      - { text: "{{n:combos.unpaired}}", why: "Đó là số {{t:combo|tổ hợp}} AK trong bộ bài trước khi bạn xem bài của mình. Lá A và lá K của bạn không thể nằm trong tay đối thủ." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "Trên river, lá cơ thứ ba xuất hiện và {{t:flush|thùng}} có thể xảy ra. {{t:big-blind|Big blind}} {{t:check|check}}. Trong tay bạn chỉ có A cao và bạn muốn bluff. Với tay bài nào thì {{t:bluff}} tốt hơn?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "Lá A cơ chặn những thùng mạnh nhất của đối thủ: đối thủ không thể có {{t:flush|thùng}} với lá A, mà đó là tay bài luôn trả tiền. Đối thủ có ít tay bài để {{t:call|theo}} hơn, nên {{t:bluff}} thành công thường xuyên hơn." }
      - { text: "[[Ad 3c]]", why: "Sức mạnh ở showdown như nhau, nhưng bạn không chặn {{t:flush|thùng}} nào. Đối thủ vẫn có tất cả các thùng của mình và sẽ trả tiền bằng chúng." }
      - { text: "Không khác gì, cả hai đều chỉ là A cao", why: "Ở showdown thì đúng, nhưng khi làm {{t:bluff}} thì không. Lá A cơ làm giảm số thùng của đối thủ chắc chắn sẽ trả tiền." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "{{t:flush-draw|Draw thùng}} bích không thành. {{t:big-blind|Big blind}} check trên river. Cả hai tay đều chỉ có Q với 8. Nên bluff bằng tay nào?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Không có lá bích, bạn không chặn các {{t:draw|bài chờ}} hụt của đối thủ, mà đó là những tay sẽ {{t:fold|bỏ bài}} trước cược của bạn. Các lá còn lại của hai tay giống nhau." }
      - { text: "[[Qd 8s]]", why: "Lá 8 bích chặn một phần các {{t:flush-draw|draw thùng}} hụt (vd. [[8s 7s]]) mà đối thủ lẽ ra sẽ {{t:fold|bỏ}}. Đối thủ còn lại tương đối nhiều tay bài sẽ trả tiền hơn." }
      - { text: "Không khác gì", why: "Khác biệt nằm ở chất của lá 8. Lá bích trong tay bạn lấy đi của đối thủ một phần các tay bài sẽ bỏ." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "Cùng tình huống: bích không về, {{t:big-blind}} {{t:check|check}}. Bạn có một trong hai tay bài. Bạn {{t:bluff|bluff}} với tay nào, và {{t:check|check}} với tay nào?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Bluff}} với [[Qc Jd]], {{t:check|check}} với [[9c 8c]]", correct: true, why: "{{t:pair|Đôi}} 9 thắng các {{t:draw|bài chờ}} hụt sau khi {{t:check|check}}. Q-J thua gần như mọi tay bài, nên chỉ có {{t:bluff|bluff}} mới thắng được {{t:pot|pot}}." }
      - { text: "{{t:bluff|Bluff}} với [[9c 8c]], {{t:check|check}} với [[Qc Jd]]", why: "Ngược lại. {{t:bluff|Bluff}} bằng {{t:pair|đôi}} 9 là bỏ đi chiến thắng ở showdown, còn {{t:check}} với Q-J là nhường {{t:pot|pot}} mà không chiến đấu." }
      - { text: "{{t:bluff|Bluff}} với cả hai", why: "{{t:pair|Đôi}} 9 không cần {{t:bluff|bluff}}: nó thắng nhiều tay bài sau khi {{t:check|check}}. Bạn {{t:bluff|bluff}} bằng những tay không có giá trị showdown." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Bạn chọn một {{t:bluff}} trên river trong số các tay bài không có giá trị showdown. Lá bài nào trong tay giúp ích nhiều nhất?"
    options:
      - { text: "Lá bài thuộc các tay mà đối thủ sẽ trả tiền", correct: true, why: "Bạn chặn giá trị của đối thủ: đối thủ có ít tay mạnh hơn, nên thường xuyên hơn chỉ còn lại tay bài phải bỏ." }
      - { text: "Lá bài cùng chất với {{t:draw|bài chờ}} hụt", why: "Lá đó chặn những tay đối thủ sẽ {{t:fold|bỏ}}. Khi đó {{t:bluff|bluff}} thành công ít hơn." }
      - { text: "Lá cao nhất, bất kể bàn", why: "Lá cao cho một chút sức mạnh ở showdown, nhưng không cho biết gì về những gì bạn chặn. Hãy xem những tay nào của đối thủ sẽ trả tiền." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "Trên river, lá cơ thứ ba xuất hiện. {{t:big-blind|Big blind}} {{t:check|check}}. Bạn có {{t:pair|đôi}} 9 và lá A cơ. Bạn làm gì?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "{{t:pair|Đôi}} 9 sau khi {{t:check|check}} thắng nhiều tay bài không có {{t:pair|đôi}} của đối thủ. {{t:blocker|Blocker}} không biến một tay có giá trị showdown thành một {{t:bluff}} tốt: trước tiên bạn chọn những tay không có cơ hội, sau đó mới xem đến {{t:blocker|blocker}}." }
      - { text: "Cược để {{t:bluff}}, vì có lá A cơ", why: "Lá A cơ là một {{t:blocker}} tốt, nhưng với {{t:pair|đôi}} 9 bạn sẽ thiệt khi {{t:bluff|bluff}}: các tay yếu hơn đằng nào cũng {{t:fold|bỏ bài}}, còn các thùng và các tay có K sẽ trả tiền." }
      - { text: "Cược {{t:value|lấy giá trị}}", why: "Ai sẽ trả tiền bằng tay yếu hơn? Trên {{t:board|bàn}} có thể có thùng, các tay yếu hơn {{t:pair|đôi}} 9 gần như luôn {{t:fold|bỏ bài}}." }
---
Trong bài trước, bạn đã xác định cần bao nhiêu {{t:bluff|bluff}} và rằng bạn {{t:bluff|bluff}} bằng những tay không có cơ hội ở showdown. Thường thì số tay như vậy nhiều hơn mức cần. Khi đó, **{{t:blocker|blocker}}** sẽ quyết định lựa chọn.

## {{t:blocker|Blocker}}

Đối thủ không thể có lá bài bạn đang cầm. Vì vậy, đối thủ có ít {{t:combo|tổ hợp}} của các tay chứa lá đó hơn:

| Tay bài của đối thủ | Không có {{t:blocker|blocker}} | Bạn cầm một lá cùng hạng |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Khi bạn cầm cả lá A lẫn lá K, đối thủ chỉ có {{n:combos.unpaired.both-blocked}} {{t:combo|tổ hợp}} AK.

## Hãy chặn những tay đối thủ sẽ trả tiền

Một {{t:bluff}} tốt có một lá thuộc các tay mà đối thủ sẽ **{{t:call|theo}}**. Ví dụ: trên river, lá cơ thứ ba xuất hiện. Lá A cơ trong tay bạn nghĩa là đối thủ không có {{t:flush|thùng}} với lá A, tức là tay bài luôn trả tiền. Đối thủ còn lại nhiều tay bài phải bỏ hơn.

## Đừng chặn những tay đối thủ sẽ {{t:fold|bỏ}}

Khi {{t:flush-draw}} **không thành**, đối thủ sẽ {{t:fold|bỏ}} các {{t:draw|bài chờ}} hụt của mình. Nếu bạn có một lá cùng chất đó, đối thủ có ít tay như vậy hơn, nên {{t:bluff}} của bạn sẽ thường xuyên gặp phải tay bài trả tiền hơn. Giữa hai {{t:bluff|bluff}} tương tự nhau, bạn chọn tay không có lá nào cùng chất với {{t:draw|bài chờ}} hụt.

## Sức mạnh showdown trước tiên

Thứ tự luôn cố định: trước tiên bạn để riêng những tay có thể thắng sau khi {{t:check|check}}, rồi mới chọn {{t:bluff|bluff}} có {{t:blocker|blocker}} tốt nhất trong số còn lại. Một {{t:blocker}} tốt không biến một {{t:pair|đôi}} lẽ ra thắng ở showdown thành {{t:bluff|bluff}}. {{t:blocker|Blocker}} nghiêng lựa chọn giữa các tay tương tự nhau; bản thân hiệu ứng này nhỏ, nên nó chỉ quyết định khi các tay có sức mạnh tương đương (lựa chọn {{t:call|theo}} trong bài tiếp theo cũng vậy).

:::note Nguồn gốc các quy tắc này
Số {{t:combo|tổ hợp}} là phép tính tổ hợp. Các quy tắc chọn {{t:bluff|bluff}} theo {{t:blocker|blocker}} đến từ chương trình học, cùng với tài liệu huấn luyện và các phân tích solver. Khi không đủ {{t:bluff|bluff}} khác, solver cũng {{t:bluff|bluff}} bằng các thùng hụt.
:::
