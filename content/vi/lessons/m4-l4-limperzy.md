---
id: m4.l4
module: m4
order: 4
title: "Người limp"
sub: "Tố cô lập: mức tố và range"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Một người chơi trước bạn chỉ theo {{t:big-blind}} (limp). Bạn muốn {{t:raise|tố}} từ Button. Tố lên bao nhiêu?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "Lên {{n:pf.iso.one-limper}}", correct: true, why: "Mức cơ bản {{n:pf.iso.base}} cộng {{n:pf.iso.per-limper}} cho người limp. Mức tố này lấy đi mức giá tốt của người limp." }
      - { text: "Lên {{n:pf.min-raise}}", why: "Mức {{t:raise|tố}} tối thiểu cho người limp mức giá rất tốt và gần như không bao giờ thắng {{t:pot}} ngay lập tức." }
      - { text: "Lên {{n:pf.open-size}}, như một lần {{t:open|mở cược}} thông thường", why: "Người limp đã bỏ vào một blind, nên {{t:pot}} lớn hơn. Lần {{t:raise|tố}} phải lớn hơn một lần {{t:open|mở cược}} thông thường." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Hai người chơi trước bạn chỉ theo {{t:big-blind}}. Bạn muốn {{t:raise|tố}} từ {{t:cutoff|CO}}. Tố lên bao nhiêu?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "Lên {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} cộng {{n:pf.iso.per-limper}} cho mỗi người trong hai người limp." }
      - { text: "Lên {{n:pf.iso.one-limper}}", why: "Đó là mức tố khi gặp một người limp. Mỗi người limp tiếp theo cộng thêm {{n:pf.iso.per-limper}}." }
      - { text: "Chỉ theo cược", why: "AQ đồng chất là tay bài để {{t:raise|tố}} lấy {{t:value|giá trị}}. Theo cược sẽ trao đi {{t:initiative|thế chủ động}} và để mọi người vào rẻ." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Một người chơi limp, mọi người bỏ bài đến lượt bạn ở {{t:small-blind|small blind}}. Bạn muốn {{t:raise|tố}}. Tố lên bao nhiêu?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "Lên {{n:pf.iso.one-limper-oop}}", correct: true, why: "Khi {{t:out-of-position|không có vị trí}}, bạn cộng thêm {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} cộng {{n:pf.iso.per-limper}} cho người limp cộng {{n:pf.iso.oop-extra}}." }
      - { text: "Lên {{n:pf.iso.one-limper}}", why: "Đó là mức tố khi {{t:in-position}}. Khi {{t:out-of-position|không có vị trí}}, bạn {{t:raise|tố}} nhiều hơn một chút để đối thủ {{t:fold|bỏ bài}} thường xuyên hơn hoặc phải trả đắt hơn." }
      - { text: "Chỉ theo cược", why: "Với KK, bạn luôn xây {{t:pot}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Một người chơi trước bạn chỉ theo {{t:big-blind}} (limp). Bạn ở Button. Bạn làm gì?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|Tố}} lên {{n:pf.iso.one-limper}}", correct: true, why: "AJ là tay bài để {{t:isolation|tố cô lập}}: nó lấn át nhiều tay bài mà người chơi yếu hơn hay limp, và sau flop bạn có {{t:position|vị trí}}. Mức tố: {{n:pf.iso.base}} cộng {{n:pf.iso.per-limper}} cho người limp." }
      - { text: "{{t:raise|Tố}} lên {{n:pf.min-raise}}", sizeError: true, why: "Hành động đúng, nhưng {{t:raise|tố}} tối thiểu cho người limp mức giá rất tốt, nên họ gần như không bao giờ {{t:fold|bỏ bài}} và bạn không được đấu tay đôi với họ. Bạn {{t:raise|tố}} lên {{n:pf.iso.one-limper}}." }
      - { text: "Theo cược", why: "Bạn trao đi {{t:initiative|thế chủ động}} và để các blind vào rẻ. Với tay bài lấn át người limp, bạn muốn xây {{t:pot}}." }
      - { text: "{{t:fold|Bỏ bài}}", why: "Quá chặt: khi gặp một người limp, Button {{t:isolation|tố cô lập}} khoảng {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} số tay bài, và AJ nằm gọn trong đó với nhiều dư địa." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Ba người chơi trước bạn chỉ theo {{t:big-blind}}. Bạn ở Button. Bạn làm gì?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Theo cược", correct: true, why: "Khi gặp nhiều người limp, {{t:connectors}} đồng chất là tay bài đầu cơ: bạn xem flop rẻ khi {{t:in-position}} và có thể trúng tay bài lớn. Một nguồn khuyên theo cược ở đây; nguồn khác khuyên tránh, nên chúng tôi cũng chấp nhận {{t:fold}}." }
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Cũng đúng: một nguồn khuyên không theo cược mà nên {{t:raise|tố}} hoặc {{t:fold|bỏ bài}}, còn 76s không phải tay bài để {{t:raise|tố}} lấy {{t:value|giá trị}}. Nguồn khác khuyên theo cược, nên chúng tôi chấp nhận cả hai cách chơi." }
      - { text: "{{t:raise|Tố}} lên {{n:pf.iso.two-limpers}}", why: "Với ba người limp, {{t:bluff}} bằng {{t:raise|cú tố}} hiếm khi lấy được {{t:pot}}, và mức tố còn phải lớn hơn nữa. 76s không phải tay bài để {{t:raise|tố}} lấy {{t:value|giá trị}}." }
---
Limp là vào ván bài chỉ bằng cách theo {{t:big-blind|big blind}}. Người chơi chuyên nghiệp hiếm khi limp đầu tiên (quy tắc từ mô-đun 3), nên người limp ở micro stakes thường là người chơi yếu hơn. {{t:raise|Tố}} người limp được gọi là {{t:isolation|tố cô lập}}: bạn muốn đấu tay đôi với họ, tốt nhất là khi {{t:in-position}}.

:::note Các quy tắc này từ đâu ra
Solver của ứng dụng không chơi limp, nên bài học này dựa trên tài liệu đào tạo. Các quy tắc được đánh dấu là quy tắc kinh nghiệm (heuristic).
:::

## Mức {{t:isolation|tố cô lập}}

Khi chơi online, bạn {{t:raise|tố}} lên {{n:pf.iso.base}} cộng {{n:pf.iso.per-limper}} cho mỗi người limp: gặp một người thì lên {{n:pf.iso.one-limper}}, gặp hai người thì lên {{n:pf.iso.two-limpers}}. Khi {{t:out-of-position|không có vị trí}}, bạn cộng thêm {{n:pf.iso.oop-extra}}. Đừng bao giờ tố tối thiểu: người limp sẽ có mức giá rất tốt và gần như không bao giờ {{t:fold|bỏ bài}}.

## {{t:range|Range}} {{t:isolation|tố cô lập}}

Ở Button khi gặp một người limp, bạn {{t:isolation|tố cô lập}} rộng, khoảng {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} số tay bài: các {{t:pair|đôi}} trung bình và cao, át đồng chất, át mạnh khác chất, bài cao và một phần {{t:connectors|connector}} đồng chất. {{t:position|Vị trí}} càng sớm và càng nhiều người limp thì {{t:range}} càng hẹp: khi gặp ba người limp, bạn {{t:raise|tố}} chủ yếu để lấy {{t:value|giá trị}}.

Với các tay bài đầu cơ, như {{t:pair|đôi}} nhỏ và {{t:connectors|connector}} đồng chất, bạn có thể theo cược khi gặp nhiều người limp nếu {{t:in-position}}. Ở đây các nguồn khác nhau: một nguồn khuyên theo cược, nguồn kia khuyên tránh; trong bài tập, chúng tôi chấp nhận cả hai cách chơi, theo cược và {{t:fold}}.
