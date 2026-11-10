---
id: m11.l2
module: m11
order: 2
title: "Theo all-in"
sub: "Bạn cần bao nhiêu equity và vì sao bạn theo chặt hơn"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Bạn có {{n:m11.depth.10}} ở {{t:big-blind|mù lớn}}, không có ante. {{t:small-blind|Mù nhỏ}} đã all-in {{n:m11.depth.10}}. Bạn cần bao nhiêu phần trăm equity để {{t:call|theo}} có lãi? Hãy nhập một số."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Tiền mù của bạn đã nằm trong {{t:pot|pot}}, nên bạn bỏ thêm {{n:m11.call.10.cost}}. Sau khi {{t:call|theo}}, {{t:pot|pot}} có {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Cùng spot đó, nhưng mỗi stack là {{n:m11.depth.5}}. Bạn cần bao nhiêu equity để {{t:call|theo}} all-in?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Bạn bỏ thêm {{n:m11.call.5.cost}} vào {{t:pot|pot}} mà sau khi {{t:call|theo}} sẽ có {{n:m11.call.5.pot}}: {{n:m11.call.5.eq}}. Khi stack ngắn hơn, tiền mù chiếm phần lớn hơn trong stack, nên giá tốt hơn." }
      - { text: "{{n:m11.call.10.eq}}", why: "Đó là giá ở {{n:m11.depth.10}}. Ở {{n:m11.depth.5}}, tiền mù của bạn chiếm phần lớn hơn trong toàn bộ stack, nên bạn cần ít hơn: {{n:m11.call.5.eq}}." }
      - { text: "Một nửa", why: "Bạn sẽ cần một nửa nếu phải bỏ vào cả stack. Tiền mù đã nằm trong {{t:pot|pot}}, nên bạn chỉ bỏ thêm {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Mỗi stack là {{n:m11.depth.15}}, {{t:small-blind|mù nhỏ}} đã all-in. Bạn cần bao nhiêu equity để {{t:call|theo}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Bạn bỏ thêm {{n:m11.call.15.cost}} vào {{t:pot|pot}} {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. Stack càng sâu, giá càng gần một nửa." }
      - { text: "{{n:m11.call.5.eq}}", why: "Đó là giá ở {{n:m11.depth.5}}. Ở {{n:m11.depth.15}}, tiền mù chiếm phần nhỏ hơn trong stack, nên giá tăng lên {{n:m11.call.15.eq}}." }
      - { text: "Hơn một nửa", why: "Ngay cả với stack rất sâu, giá cũng không vượt quá một nửa: bạn luôn có tiền mù của mình trong {{t:pot|pot}}." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "Bạn có {{n:m11.depth.10}} ở {{t:big-blind|mù lớn}}, {{t:small-blind|mù nhỏ}} đã all-in. Hãy tô các tay bài bạn {{t:call|theo}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Ở {{n:m11.depth.10}}, solver all-in từ {{t:small-blind|mù nhỏ}} với bảy và sáu cùng chất (76s). Bạn có tay bài này ở {{t:big-blind|mù lớn}} và chính {{t:small-blind|mù nhỏ}} đã all-in. Bạn làm gì?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "All-in với 76s có lãi chủ yếu nhờ đối thủ {{t:fold|bỏ bài}}. Khi {{t:call|theo}}, bạn chỉ thắng ở showdown, mà còn phải đấu với {{t:range|dải bài}} all-in có nhiều lá cao và {{t:pair|đôi}}. Solver {{t:fold|bỏ}} tay bài này." }
      - { text: "{{t:call|Theo}}, vì từ {{t:small-blind|mù nhỏ}} tôi cũng sẽ all-in với nó", why: "{{t:call|Theo}} là một tình huống khác: bạn không có fold equity, còn {{t:range|dải bài}} của đối thủ mạnh hơn bài ngẫu nhiên. Để {{t:call|theo}}, bạn cần tay bài mạnh hơn." }
      - { text: "{{t:call|Theo}}, vì tay bài cùng chất phát triển tốt", why: "Sau all-in không còn vòng chơi nào để tay bài phát triển. Chỉ equity đến showdown là quan trọng." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Mù lớn}}, {{t:small-blind|mù nhỏ}} đã all-in. Bạn có {{t:pair|đôi}} hai. Ở {{n:m11.depth.10}}, solver {{t:call|theo}}. Còn ở {{n:m11.depth.15}} thì sao?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Ở {{n:m11.depth.15}}, giá tăng lên {{n:m11.call.15.eq}}, còn {{t:range|dải bài}} all-in hẹp hơn (khoảng {{n:m11.push.15}} tay bài), nên {{t:pair|đôi}} hai thường xuyên gặp {{t:pair|đôi}} cao hơn hơn. {{t:range|Dải bài}} {{t:call|theo}} giảm từ khoảng {{n:m11.call.10}} xuống khoảng {{n:m11.call.15}} tay bài." }
      - { text: "{{t:call|Theo}}, vì {{t:pair|đôi}} luôn là cửa trên", why: "{{t:pair|Đôi}} hai gặp hai lá cao hơn gần như là tung đồng xu, còn gặp bất kỳ {{t:pair|đôi}} nào cao hơn thì rõ ràng là cửa dưới. Với stack sâu hơn, đối thủ {{t:shove|đẩy all-in}} ít tay yếu hơn, nên các {{t:pair|đôi}} chiếm phần lớn hơn trong {{t:range|dải bài}} của họ." }
      - { text: "{{t:call|Theo}}, vì stack càng sâu thì càng rộng", why: "Ngược lại: stack càng sâu, {{t:call|theo}} càng tốn kém và {{t:range|dải bài}} {{t:call|theo}} càng hẹp." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Ở {{n:m11.depth.10}}, {{t:small-blind|mù nhỏ}} all-in với khoảng {{n:m11.push.10}} tay bài, còn {{t:big-blind|mù lớn}} chỉ {{t:call|theo}} với khoảng {{n:m11.call.10}}. Vì sao?"
    options:
      - { text: "Người theo không có fold equity và phải đấu với {{t:range|dải bài}} mạnh hơn bài ngẫu nhiên", correct: true, why: "All-in còn thắng cả khi đối thủ {{t:fold|bỏ bài}}. {{t:call|Theo}} chỉ thắng ở showdown, mà còn phải đấu với những tay bài đã qua chọn lọc. Từ đó có quy tắc cũ: để {{t:call|theo}}, bạn cần tay bài tốt hơn so với khi all-in trước." }
      - { text: "{{t:big-blind|Mù lớn}} phải trả nhiều hơn", why: "Cả hai đều mạo hiểm cùng một stack, còn {{t:big-blind|BB}} đã có tiền mù của mình trong {{t:pot|pot}}, nên thậm chí bỏ thêm ít hơn." }
      - { text: "Solver sai", why: "Đây là trạng thái cân bằng của trò chơi all-in hoặc {{t:fold|bỏ bài}}: không người chơi nào có thể kiếm thêm lời chỉ bằng cách thay đổi {{t:range|dải bài}} của riêng mình. Sự khác biệt đến từ fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Ván chơi có {{t:bb-ante|ante mù lớn}}. Bạn có {{n:m11.depth.10}} ở {{t:big-blind|mù lớn}} và đã nộp ante {{n:m11.ante}}. {{t:small-blind|Mù nhỏ}} đã all-in. Bạn cần bao nhiêu equity để {{t:call|theo}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Bạn bỏ thêm số tiền như cũ ({{n:m11.call.10.cost}}), nhưng trong {{t:pot|pot}} còn có ante: sau khi {{t:call|theo}} là {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Vì vậy khi có ante, bạn {{t:call|theo}} rộng hơn: khoảng {{n:m11.call.10-ante}} tay bài thay vì {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "Đó là giá khi không có ante. Ante vẫn nằm trong {{t:pot|pot}}, nên với cùng số tiền bỏ thêm, bạn thắng được nhiều hơn: {{n:m11.call.10-ante.eq}}." }
      - { text: "Nhiều hơn khi không có ante, vì bạn đã bỏ vào nhiều hơn", why: "Ante là tiền đã bỏ ra. Điều quan trọng chỉ là bạn còn phải bỏ thêm bao nhiêu và có thể thắng bao nhiêu." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "Ba người chơi, mỗi stack là {{n:m11.depth.3max}}. Button đã all-in, {{t:small-blind|mù nhỏ}} đã {{t:call|theo}}. Ở {{t:big-blind|mù lớn}}, bạn chỉ cần {{n:m11.3max.bb-two.eq}} equity. Bạn có {{t:call|theo}} rộng hơn so với khi chỉ có Button all-in không?"
    table: { position: BB }
    options:
      - { text: "Không, chặt hơn", correct: true, why: "Giá tốt hơn, nhưng bạn đấu với hai {{t:range|dải bài}}, trong đó có người theo đang cầm tay bài mạnh. Ở đây solver {{t:call|theo}} với khoảng {{n:m11.3max.call.bb-two}} tay bài, còn khi chỉ có Button all-in thì khoảng {{n:m11.3max.call.bb}}." }
      - { text: "Có, vì giá tốt hơn nhiều", why: "Giá tốt hơn là chưa đủ: khi đấu với hai đối thủ, equity của các tay yếu hơn giảm nhanh. Solver chỉ {{t:call|theo}} với khoảng {{n:m11.3max.call.bb-two}} tay bài." }
      - { text: "Như nhau, vì chỉ tay bài của bạn là quan trọng", why: "Điều quan trọng là equity so với tay bài của các đối thủ. Người theo all-in của Button có {{t:range|dải bài}} mạnh hơn Button, nên bạn {{t:call|theo}} chặt hơn." }
---
Khi đối thủ all-in còn bạn ở {{t:big-blind|mù lớn}}, quyết định có hình thức đơn giản: bạn {{t:call|theo}} hoặc {{t:fold|bỏ bài}}. Sau khi {{t:call|theo}} không còn vòng chơi nào nữa, nên chỉ giá và equity của bạn so với {{t:range|dải bài}} all-in là quan trọng.

## Giá để {{t:call|theo}}

Tiền mù của bạn đã nằm trong {{t:pot|pot}}. Với stack {{n:m11.depth.10}}, bạn bỏ thêm {{n:m11.call.10.cost}}, và {{t:pot|pot}} sau khi {{t:call|theo}} có {{n:m11.call.10.pot}}.

```formula
equity cần có = phần bỏ thêm ÷ pot sau khi theo
```

| Stack | Phần bỏ thêm | {{t:pot|Pot}} sau khi {{t:call|theo}} | Equity cần có |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Stack càng ngắn, giá càng tốt, vì tiền mù của bạn chiếm phần lớn hơn trong toàn bộ stack.

## Bạn {{t:call|theo}} chặt hơn mức bạn {{t:shove|đẩy all-in}}

Khi all-in trước, bạn còn thắng cả khi đối thủ {{t:fold|bỏ bài}}. Khi {{t:call|theo}}, bạn chỉ thắng ở showdown, mà còn phải đấu với những tay bài đối thủ đã chọn để all-in. Vì vậy, để {{t:call|theo}}, bạn cần tay bài tốt hơn so với khi all-in trước (trong sách vở, điều này được gọi là “gap concept”).

```range
call.bb-10
```

Ở {{n:m11.depth.10}}, {{t:small-blind|mù nhỏ}} all-in với khoảng {{n:m11.push.10}} tay bài, còn {{t:big-blind|mù lớn}} {{t:call|theo}} với khoảng {{n:m11.call.10}}. Những tay như [[7s 6s]] bạn {{t:shove|đẩy all-in}} từ {{t:small-blind|mù nhỏ}}, nhưng lại {{t:fold|bỏ}} khi gặp all-in: không có fold equity, chúng có quá ít equity trước các lá cao và {{t:pair|đôi}}. Để so sánh, bảng của một trang huấn luyện đưa ra {{t:range|dải bài}} {{t:call|theo}} ở {{n:m11.depth.10}} là {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Stack sâu hơn nghĩa là {{t:call|theo}} đắt hơn và {{t:range|dải bài}} all-in của đối thủ hẹp hơn, nên bạn {{t:call|theo}} ít hơn: khoảng {{n:m11.call.15}} ở {{n:m11.depth.15}}, còn ở {{n:m11.depth.5}} thì lên tới khoảng {{n:m11.call.5}}.

## Khi sau bạn vẫn còn người chơi

Với ba người chơi và mỗi stack là {{n:m11.depth.3max}}, {{t:small-blind|mù nhỏ}} chỉ {{t:call|theo}} all-in của Button với khoảng {{n:m11.3max.call.sb}} tay bài, dù chỉ cần {{n:m11.3max.sb.eq}} equity. {{t:big-blind|Mù lớn}} trong cùng tình huống, khi {{t:small-blind|mù nhỏ}} đã {{t:fold|bỏ bài}}, bỏ thêm {{n:m11.3max.bb.cost}} vào {{t:pot|pot}} {{n:m11.3max.bb.pot}}, cần {{n:m11.3max.bb.eq}} equity và {{t:call|theo}} với khoảng {{n:m11.3max.call.bb}}. Sự khác biệt chủ yếu đến từ người chơi sau bạn (giá chênh lệch không nhiều): {{t:small-blind|mù nhỏ}} có thể {{t:call|theo}} rồi gặp tay bài còn mạnh hơn của {{t:big-blind|mù lớn}}.

```range
call.sb-vs-btn-3max
```

Khi đã có hai người all-in, giá giảm xuống {{n:m11.3max.bb-two.eq}}, nhưng {{t:big-blind|mù lớn}} vẫn chỉ {{t:call|theo}} với khoảng {{n:m11.3max.call.bb-two}} tay bài. Khi đấu với hai {{t:range|dải bài}}, trong đó một người đã {{t:call|theo}} all-in, các tay yếu hơn mất equity rất nhanh.

```range
call.bb-vs-two-3max
```

## Khi có ante, bạn {{t:call|theo}} rộng hơn

Ante vẫn nằm trong {{t:pot|pot}}, nên với cùng số tiền bỏ thêm, bạn thắng được nhiều hơn: ở {{n:m11.depth.10}} với {{t:bb-ante|ante mù lớn}} {{n:m11.ante}}, bạn cần {{n:m11.call.10-ante.eq}} thay vì {{n:m11.call.10.eq}}. Khi có ante, đối thủ cũng {{t:shove|đẩy all-in}} rộng hơn, nên solver {{t:call|theo}} với khoảng {{n:m11.call.10-ante}} tay bài.

```range
call.bb-10-ante
```

:::note {{t:range|Dải bài}} trong bài học này
Các lưới áp dụng cho ván hai người: {{t:small-blind|mù nhỏ}} đấu với {{t:big-blind|mù lớn}} khi mọi người khác đã {{t:fold|bỏ bài}}, và tính theo {{t:chips|chip}}, không phải tiền. Khi trong {{t:tournament|giải đấu}} {{t:payout|tiền thưởng}} trở nên quan trọng, bạn {{t:call|theo}} còn chặt hơn nữa (bài học tiếp theo).
:::
