---
id: m3.l2
module: m3
order: 2
title: "Bài khởi đầu"
sub: "Nên chơi những lá bài nào trước flop"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Tay bài nào mạnh hơn?"
    options:
      - { text: "A♥ K♥ (cùng chất)", correct: true, why: "Thứ hạng giống nhau, nhưng tay bài cùng chất có thêm một cách để thắng bằng {{t:flush}}." }
      - { text: "A♥ K♣ (khác chất)", why: "Khi khác chất, bạn mất cơ hội có {{t:flush}}." }
      - { text: "Bằng nhau", why: "Gần đúng, nhưng không hẳn. Chất của lá bài có ý nghĩa." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Chưa ai vào ván. Bạn làm gì?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "7-2 khác chất là một trong những tay bài yếu nhất: hai lá cách nhau quá xa để cùng tạo thành {{t:straight|sảnh}}, hiếm khi tạo ra {{t:flush}}, và nếu trúng {{t:pair}} thì lá kicker lại yếu. Nó thường được gọi là tay bài tệ nhất, dù theo tính toán khi đấu với một tay bài ngẫu nhiên, một số tay khác, ví dụ 3-2 khác chất, còn kém hơn nữa." }
      - { text: "{{t:raise|Tố}} để gây bất ngờ", why: "{{t:bluff|Bluff}} (chơi một tay bài yếu để đối thủ {{t:fold|bỏ}} những tay bài tốt hơn) preflop với một trong những tay bài yếu nhất, khi sau bạn vẫn còn bốn người chơi, sẽ thua lỗ về lâu dài." }
      - { text: "{{t:call|Theo}}, vì rẻ", why: "Mỗi lần vào ván “rẻ” với tay bài yếu sẽ cộng dồn thành khoản thua lớn." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "Người chơi trước bạn đã {{t:raise|tố}}. Bạn làm gì?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Tố}} lại (3-bet)", correct: true, why: "Bạn có tay bài tốt nhất có thể. Bạn muốn đưa vào càng nhiều tiền càng tốt và giảm số đối thủ." }
      - { text: "Chỉ {{t:call|theo}}", why: "Người chơi nâng cao đôi khi chơi như vậy để đánh lừa, nhưng theo nguyên tắc chung, bạn mất giá trị và để người khác vào ván rẻ." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Bạn không bao giờ {{t:fold|bỏ}} đôi A preflop. Chúng là cửa trên trước mọi tay bài khác, ví dụ trước KK chúng có khoảng {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Mọi người đều đã {{t:fold|bỏ bài}} đến lượt bạn. Bạn làm gì?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Tố}}", correct: true, why: "QJ cùng chất là tay bài rất tốt để tấn công các blind khi có {{t:position|vị trí}}: nó tạo được {{t:straight|sảnh}}, thùng và {{t:pair|đôi}} cao." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Ở Button, tay bài này quá tốt để {{t:fold|bỏ}}." }
      - { text: "{{t:call|Theo}}", why: "Tốt hơn là {{t:raise|tố}}: bạn có cơ hội ăn các blind ngay lập tức và chơi với {{t:initiative|thế chủ động}}." }
---
Người mới chơi mất phần lớn tiền vì chơi quá nhiều tay bài yếu. Chọn lọc tốt ngay từ đầu là cách nhanh nhất để ngừng thua.

## Các nhóm tay bài

- **Mạnh nhất**: [[As Ah]], [[Ks Kh]], [[Qs Qh]] cùng AK cùng chất và khác chất, ví dụ [[As Ks]] và [[As Kd]]. Bạn {{t:raise|tố}}, và khi có người đã {{t:raise|tố}} trước bạn, bạn thường {{t:raise|tố}} lại (3-bet) {{t:value|để lấy giá trị}}, tức là để đối thủ {{t:call|theo}} bằng một tay bài yếu hơn.
- **Mạnh**: JJ, TT, AQ, AJ cùng chất, KQ cùng chất.
- **Đầu cơ**: các {{t:pair|đôi}} nhỏ và các lá liên tiếp cùng chất, ví dụ [[7h 6h]]. Tốt ở {{t:late-position|vị trí muộn}}.
- **Yếu**: rời rạc, thấp, khác chất, ví dụ [[9c 3d]]. {{t:fold|Bỏ bài}}.

:::note Có bao nhiêu {{t:combo|tổ hợp}}
Tổng cộng có {{n:combos.total}} {{t:combo|tổ hợp}} bài khởi đầu, nhưng chỉ có {{n:combos.kinds}} loại: {{n:combos.kinds.pair}} {{t:pair|đôi}}, {{n:combos.kinds.suited}} tay bài cùng chất và {{n:combos.kinds.offsuit}} tay bài khác chất. Mỗi {{t:pair}} có {{n:combos.pair}} {{t:combo|tổ hợp}}, tay bài cùng chất có {{n:combos.suited}}, còn tay bài khác chất có {{n:combos.offsuit}}. Vì vậy AK khác chất xuất hiện thường xuyên gấp ba lần AK cùng chất.
:::

Các nhóm trên là cách đơn giản hóa để bạn bắt đầu. Bạn sẽ học các {{t:range|dải bài}} {{t:open|mở}} chính xác cho từng {{t:position|vị trí}}, trên lưới {{t:range|dải bài}}, trong bài học tiếp theo.
