---
id: m8.l1
module: m8
order: 1
title: "Cược giá trị ở river"
sub: "Hãy cược khi tay yếu hơn trả tiền"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: tất cả các lá bài đã nằm trên {{t:board|bàn}}. Vậy cược để làm gì?"
    options:
      - { text: "Để tay yếu hơn trả tiền hoặc để tay mạnh hơn {{t:fold|bỏ bài}}", correct: true, why: "Ở river không còn lá nào để mở, nên cược chỉ có hai mục đích: giá trị (tay yếu hơn trả tiền) hoặc {{t:bluff}} (tay mạnh hơn {{t:fold|bỏ bài}}). Cược không làm được điều nào trong hai điều đó chỉ khiến bạn tốn tiền." }
      - { text: "Để lấy đi cơ hội rút bài của đối thủ", why: "Đó là lý do để cược ở flop và turn. Ở river đối thủ không rút thêm được gì nữa: tay bài của họ đã hoàn chỉnh." }
      - { text: "Để kiểm tra xem tay bài của tôi có mạnh nhất không", why: "Cược không phải là câu hỏi. Khi bạn cược với tay trung bình, tay yếu hơn thường {{t:fold|bỏ bài}}, còn tay mạnh hơn trả tiền, nên bạn “tìm hiểu” bằng chính tiền của mình. Bạn có thể biết miễn phí bằng cách {{t:check|xem bài}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, đối thủ {{t:check|xem bài}}. Bạn ước tính họ sẽ trả tiền cho cược của bạn trong {{n:value.ex.calls}} trường hợp: {{n:value.ex.many}} lần với tay yếu hơn, {{n:value.ex.few}} lần với tay mạnh hơn. Họ không thể {{t:raise|tố}} bạn. Bạn có cược không?"
    options:
      - { text: "Có, đây là cược {{t:value|lấy giá trị}}", correct: true, why: "Bạn thắng cược {{n:value.ex.many}} lần, thua {{n:value.ex.few}} lần: lãi ròng {{n:value.ex.net}} cược. Hơn {{n:value.threshold}} số lần {{t:call|theo}} là tay yếu hơn, nên cược kiếm được nhiều hơn {{t:check}}." }
      - { text: "Không, vì đôi khi họ trả tiền bằng tay mạnh hơn", why: "Tay mạnh hơn luôn trả tiền trong một phần trường hợp. Điều quan trọng là số lần {{t:call|theo}} bằng tay yếu hơn có nhiều hơn số lần bằng tay mạnh hơn hay không: ở đây là {{n:value.ex.many}} so với {{n:value.ex.few}}." }
      - { text: "Chỉ khi đối thủ không bao giờ có tay mạnh hơn", why: "Khi đó bạn chỉ cược với nuts và bỏ lỡ rất nhiều giá trị. Chỉ cần hơn {{n:value.threshold}} số lần {{t:call|theo}} là tay yếu hơn." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, đối thủ {{t:check|xem bài}}. Họ sẽ trả tiền cho cược của bạn trong {{n:value.ex.calls}} trường hợp: {{n:value.ex.few}} lần với tay yếu hơn, {{n:value.ex.many}} lần với tay mạnh hơn. Những tay yếu hơn của đối thủ mà {{t:fold|bỏ bài}} thì đằng nào cũng thua bạn khi showdown. Bạn làm gì?"
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "Cược sẽ thắng {{n:value.ex.few}} lần và thua {{n:value.ex.many}} lần: lỗ ròng {{n:value.ex.net}} cược. Sau khi {{t:check|xem bài}}, bạn vẫn thắng {{t:pot|pot}} trước cùng những tay yếu hơn đó, chỉ là không phải trả thêm cho tay mạnh hơn." }
      - { text: "Cược, vì tôi có tay bài khá", why: "Sức mạnh tay bài tự nó chưa đủ. Điều quan trọng là ai sẽ trả tiền: ở đây phần lớn số lần {{t:call|theo}} là tay mạnh hơn, nên cược bị lỗ." }
      - { text: "Cược lớn để tay mạnh hơn {{t:fold|bỏ bài}}", why: "Đó sẽ là {{t:bluff}} bằng một tay thường thắng khi showdown. Tay mạnh hơn hiếm khi {{t:fold|bỏ bài}} ở river, còn sau khi {{t:check|xem bài}} bạn vẫn thắng các tay yếu hơn." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. {{n:value.ex.many}} tay yếu hơn và {{n:value.ex.few}} tay mạnh hơn sẽ {{t:call|theo}} cược của bạn. Bạn lãi ròng bao nhiêu cược trên {{n:value.ex.calls}} lần {{t:call|theo}} này? Hãy nhập một số."
    answer: value.ex.net
    explanation: "Mỗi lần {{t:call}} bằng tay yếu hơn là một cược thắng, mỗi lần bằng tay mạnh hơn là một cược thua: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. Bạn cũng sẽ thắng {{t:pot|pot}} trước các tay yếu hơn sau khi {{t:check|xem bài}}, nên bạn chỉ tính các cược."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}. Bạn cược ở flop và turn, lần nào cũng bị {{t:call}}. River, {{t:big-blind}} {{t:check|xem bài}}. Bạn làm gì?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Cược {{t:value|lấy giá trị}}", correct: true, why: "{{t:top-pair|Đôi cao nhất}} với kicker tốt nhất. Đối thủ đã {{t:call|theo}} qua hai {{t:street|vòng cược}} có nhiều tay K yếu hơn (KQ, KJ, KT) và tay 9, còn {{t:draw|bài chờ}} trên {{t:board|bàn}} này thì ít. Tay yếu hơn sẽ trả tiền thường xuyên hơn nhiều so với tay mạnh hơn ({{t:two-pair}}, set). Thông thường {{t:top-pair}} chịu được hai {{t:value|vòng lấy giá trị}} (M9); ở đây là vòng thứ ba, vì đối thủ trả tiền bằng các tay K yếu hơn." }
      - { text: "{{t:check|Xem bài}}, vì đối thủ có thể có set", why: "Có thể, nhưng hiếm. Khi {{t:check|xem bài}}, bạn mất một cược từ tất cả các tay K yếu hơn mà họ sẽ dùng để trả tiền. Bạn tính xem ai sẽ {{t:call|theo}}, chứ không phải có tồn tại tay mạnh hơn hay không." }
      - { text: "{{t:check|Xem bài}} để đối thủ bluff", why: "Đối thủ đã {{t:call|theo}} hai lần chủ yếu có {{t:pair|đôi}} và hiếm khi {{t:bluff|bluff}} sau khi bạn {{t:check|xem bài}}. Bạn kiếm tiền chắc hơn bằng cách cược vào các tay K yếu hơn của họ." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}. Ở flop bạn c-bet và bị {{t:call}}, ở turn cả hai cùng {{t:check|xem bài}}. River, {{t:big-blind}} {{t:check|xem bài}}. Bạn làm gì?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|Xem bài}}", correct: true, why: "{{t:second-pair|Đôi thứ hai}} với kicker yếu thắng các {{t:draw|bài chờ}} hụt và các {{t:pair|đôi}} yếu hơn, nhưng những tay đó sẽ {{t:fold|bỏ bài}} trước cược. Người trả tiền chủ yếu là tay K và tay 10 tốt hơn. Bạn {{t:check|xem bài}} và được xem showdown miễn phí." }
      - { text: "Cược {{t:value|lấy giá trị}}", why: "Ai sẽ trả tiền? Các tay không có {{t:pair|đôi}} sẽ {{t:fold|bỏ bài}}, còn tay K và tay 10 tốt hơn sẽ {{t:call|theo}}. Phần lớn số lần {{t:call|theo}} sẽ là tay mạnh hơn tay của bạn." }
      - { text: "Cược lớn như một {{t:bluff}}", why: "Tay của bạn thường thắng khi showdown. Khi {{t:bluff|bluff}}, bạn từ bỏ phần thắng đó: tay yếu hơn đằng nào cũng {{t:fold|bỏ bài}}, còn tay K hiếm khi {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "Bạn {{t:open|mở}} từ Button, {{t:big-blind}} {{t:call|theo}}. Ở flop bạn c-bet và bị {{t:call}}, ở turn cả hai cùng {{t:check|xem bài}}. River, {{t:big-blind}} {{t:check|xem bài}}. Bạn có {{t:top-pair|đôi cao nhất}} với kicker 10. Những tay nào sẽ trả tiền cho một cược nhỏ và yếu hơn tay của bạn?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Tay 8, tay 4 và tay Q với kicker yếu hơn", correct: true, why: "Những tay này đã theo ở flop và có {{t:pair|đôi}}, nên thường sẽ trả tiền cho một cược nhỏ. Bạn thua Q với kicker tốt hơn, {{t:two-pair|hai đôi}}, set và {{t:straight|sảnh}} (A5, 65), nhưng số lần {{t:call|theo}} bằng tay yếu hơn nhiều hơn." }
      - { text: "Các tay không có {{t:pair|đôi}}", why: "Tay không có {{t:pair|đôi}} hiếm khi trả tiền cho cược ở river; đôi khi A-high có trả, nhưng ở đây các {{t:pair|đôi}} yếu hơn nhiều hơn hẳn." }
      - { text: "Không có tay nào, chỉ tay mạnh hơn mới trả tiền", why: "Quá thận trọng: {{t:big-blind}} bảo vệ nhiều {{t:pair|đôi}} thấp hơn Q. Sau khi {{t:check|xem bài}} ở turn, {{t:range}} của họ chứa khá nhiều tay như vậy." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Cùng tình huống: bạn có {{t:top-pair|đôi cao nhất}} với kicker 10, {{t:big-blind}} xem bài ở river. Trong {{t:pot|pot}} có {{n:ex.pot}}. Bạn làm gì?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Cược {{n:ex.bet.quarter}}, tức 1/4 {{t:pot|pot}}", correct: true, why: "Thin value: bạn thắng chỉ hơn một nửa số tay sẽ trả tiền. Cược nhỏ sẽ được tay 8, tay 4 và tay Q yếu hơn {{t:call|theo}}, nên số lần {{t:call|theo}} bằng tay yếu hơn vẫn nhiều hơn tay mạnh hơn." }
      - { text: "Cược {{n:ex.bet.pot}}, tức cả {{t:pot}}", sizeError: true, why: "Hành động đúng, kích thước sai: trước cược bằng {{t:pot|pot}}, tay 8 và tay 4 sẽ {{t:fold|bỏ bài}}, còn người trả tiền chủ yếu là tay Q tốt hơn, {{t:two-pair}} và set. Khi đó phần lớn số lần {{t:call|theo}} mạnh hơn bạn. Thin value thì hãy cược nhỏ." }
      - { text: "{{t:check|Xem bài}}", why: "Bạn mất giá trị: đối thủ có nhiều {{t:pair|đôi}} thấp hơn sẽ trả tiền cho cược nhỏ. {{t:check|Xem bài}} là bỏ phí số tiền đó." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Một người bạn nói: “Ở river với {{t:pair|đôi}} trung bình, tôi cược để biết mình đang ở đâu”. Ý tưởng này sai ở chỗ nào?"
    options:
      - { text: "Tay yếu hơn sẽ {{t:fold|bỏ bài}}, còn tay mạnh hơn sẽ trả tiền", correct: true, why: "Sau một cược như vậy, những tay bạn thắng sẽ {{t:fold|bỏ bài}}, còn những tay bạn thua sẽ trả tiền hoặc {{t:raise|tố}}. Bạn có được thông tin miễn phí bằng cách {{t:check|xem bài}}, vì khi có {{t:position|vị trí}}, đối thủ sẽ lật bài khi showdown." }
      - { text: "Không sai gì, đây là cách tốt để lấy thông tin", why: "Ở đây thông tin tốn một cược mà bạn thường thua. Sau khi {{t:check|xem bài}}, bạn sẽ thấy tay của đối thủ mà không phải trả thêm." }
      - { text: "Cược nên lớn hơn", why: "Cược lớn hơn làm mọi việc tệ hơn: càng nhiều tay yếu hơn sẽ {{t:fold|bỏ bài}}, còn tay mạnh hơn vẫn trả tiền." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "{{t:flush-draw}} của bạn không thành. Ở river bạn cân nhắc cược. Đó sẽ là loại cược gì?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Bluff}}", correct: true, why: "Bạn chỉ có Q là lá cao nhất. Không tay nào {{t:call|theo}} bạn mà lại yếu hơn, nên cược chỉ có thể thắng khi đối thủ {{t:fold|bỏ bài}}. Đó là {{t:bluff}} (cách chọn tay để {{t:bluff|bluff}} có trong các bài tiếp theo)." }
      - { text: "Cược {{t:value|lấy giá trị}}", why: "Cược {{t:value|lấy giá trị}} đòi hỏi tay yếu hơn trả tiền. Chỉ với lá Q, hầu như không có tay nào yếu hơn {{t:call|theo}} bạn." }
      - { text: "Thin value", why: "Thin value là cược bằng tay thắng chỉ hơn một nửa số lần {{t:call|theo}}. Tay của bạn hầu như không thắng lần {{t:call|theo}} nào." }
---
Ở river, tất cả các lá bài đã nằm trên {{t:board|bàn}}. Không ai rút thêm được gì, nên cược chỉ có thể làm hai việc: khiến tay yếu hơn trả tiền (**giá trị**) hoặc khiến tay mạnh hơn {{t:fold|bỏ bài}} (**{{t:bluff}}**). Bài này nói về giá trị; các bài tiếp theo nói về {{t:bluff|bluff}} và việc theo.

## Ngưỡng: hơn một nửa số lần {{t:call|theo}}

Khi bạn cược từ {{t:position|vị trí}} có lợi, còn đối thủ chỉ có thể {{t:call|theo}} hoặc {{t:fold|bỏ bài}}, bạn chỉ tính những tay họ sẽ dùng để trả tiền:

```formula
cược lấy giá trị: lần theo bằng tay yếu hơn > lần theo bằng tay mạnh hơn
```

Mỗi lần {{t:call}} bằng tay yếu hơn, bạn thắng một cược. Mỗi lần {{t:call}} bằng tay mạnh hơn, bạn thua một cược. Khi đối thủ {{t:fold|bỏ bài}} với tay yếu hơn, bạn thắng cùng {{t:pot|pot}} như sau khi {{t:check|xem bài}}. Vì vậy cược có lãi khi hơn **{{n:value.threshold}}** số tay trả tiền yếu hơn tay của bạn.

Ví dụ: trong {{n:value.ex.calls}} lần {{t:call|theo}}, {{n:value.ex.many}} là tay yếu hơn, còn {{n:value.ex.few}} là tay mạnh hơn. Bạn lãi ròng {{n:value.ex.net}} cược. Nếu tỷ lệ đảo ngược, bạn sẽ lỗ đúng bấy nhiêu.

## Ai sẽ trả tiền

Bạn không hỏi “tay mình có tốt không”, mà hỏi “đối thủ sẽ trả tiền bằng gì”. Hãy duyệt qua {{t:range}} của họ:

- các tay không có {{t:pair|đôi}} hiếm khi trả tiền; đôi khi A-high trả tiền, vì nó thắng các tay {{t:bluff|bluff}},
- các {{t:pair|đôi}} thấp hơn và kicker yếu hơn thường trả tiền cho cược nhỏ,
- tay mạnh hơn luôn trả tiền, và đôi khi {{t:raise|tố}}.

Khi đối thủ có thể {{t:raise|tố}} bạn, và khi đó bạn sẽ phải {{t:fold|bỏ bài}}, ngưỡng còn cao hơn: cược chỉ có lãi khi số lần {{t:call|theo}} bằng tay yếu hơn vượt trội rõ rệt.

## Thin value: ít, nhưng có người trả

Thin value (giá trị mỏng) là cược bằng tay thắng chỉ hơn một nửa số lần {{t:call|theo}}, ví dụ {{t:top-pair|đôi cao nhất}} với kicker trung bình. Cược này bạn đặt **nhỏ hơn** so với khi có tay mạnh, thường khoảng 1/4–1/2 {{t:pot|pot}}: cược nhỏ thì cả các {{t:pair|đôi}} yếu hơn cũng trả tiền, còn trước cược lớn họ sẽ {{t:fold|bỏ bài}} và chỉ còn lại tay mạnh hơn.

Đây là cách đơn giản hóa: khi không có rủi ro check-raise, solver cược thin value nhỏ tới khoảng 1/4 {{t:pot|pot}}, còn khi có rủi ro đó, từ {{t:position|vị trí}} có lợi nó hiếm khi cược dưới 1/2 {{t:pot|pot}}.

## Tay trung bình thì {{t:check|xem bài}}

Bạn có tay trung bình và {{t:in-position}}, ví dụ {{t:second-pair|đôi thứ hai}}. Các tay yếu hơn của đối thủ sẽ {{t:fold|bỏ bài}} trước cược, còn tay mạnh hơn sẽ trả tiền. Khi đó cược biến tay của bạn thành {{t:bluff}}. Bạn {{t:check|xem bài}}: bạn sẽ thắng showdown trước các tay yếu hơn mà không phải trả thêm cho tay mạnh hơn.

:::note Các quy tắc này từ đâu ra
Ngưỡng hơn một nửa số lần {{t:call|theo}} là toán học thuần túy (cược {{t:in-position}}, không có {{t:raise|tố}} và không có rake). Kích thước thin value và việc {{t:check|xem bài}} với tay trung bình đến từ các phân tích solver đã công bố ({{t:tournament|giải đấu}} với stack ngắn hơn) và từ các tài liệu đào tạo.
:::
