---
id: m12.l4
module: m12
order: 4
title: "Bankroll và rủi ro"
sub: "Phương sai tính bằng số buy-in và khi nào nên xuống mức cược"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "{{t:buy-in|Buy-in}} là {{n:format.stack}}. Bankroll {{n:br.bi.base}} {{t:buy-in|buy-in}} bằng bao nhiêu bb? Hãy nhập một số."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Bạn tính bankroll bằng số {{t:buy-in|buy-in}} của {{t:stakes|mức cược}} mà bạn đang chơi."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Bạn thắng {{n:var.wr.typical.high}} với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}} và có {{n:br.bi.base}} {{t:buy-in|buy-in}} ({{n:br.base.bb}}). Rủi ro mất toàn bộ bankroll là bao nhiêu?"
    options:
      - { text: "Khoảng {{n:ror.base}}", correct: true, why: "Số mũ là 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, nên RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. Đây là xác suất bạn có lúc nào đó mất toàn bộ bankroll nếu không bao giờ xuống {{t:stakes|mức cược}}." }
      - { text: "Khoảng {{n:ror.half}}", why: "Đó là kết quả khi bankroll chỉ bằng một nửa, {{n:br.bi.move-down}} {{t:buy-in|buy-in}}. Với {{n:br.bi.base}}, số mũ lớn gấp đôi, nên rủi ro giảm xuống khoảng {{n:ror.base}}." }
      - { text: "Bằng 0, vì người chơi đang thắng", why: "Người chơi có lãi cũng có thể gặp {{t:downswing}} sâu hơn toàn bộ bankroll. Rủi ro giảm khi bankroll lớn hơn, nhưng không bao giờ về 0." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Vẫn bankroll {{n:br.bi.base}} {{t:buy-in|buy-in}}, {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}, nhưng winrate chỉ {{n:var.wr.typical.low}}. Rủi ro mất bankroll là bao nhiêu?"
    options:
      - { text: "Khoảng {{n:ror.base.wr-min}}", correct: true, why: "Winrate nằm trong số mũ: với {{n:var.wr.typical.low}} thay vì {{n:var.wr.typical.high}}, số mũ nhỏ hơn ba lần, và rủi ro tăng từ khoảng {{n:ror.base}} lên khoảng {{n:ror.base.wr-min}}." }
      - { text: "Khoảng {{n:ror.base}}, vì bankroll vẫn như cũ", why: "Rủi ro phụ thuộc vào tích winrate × bankroll. Winrate thấp hơn có tác dụng như bankroll nhỏ hơn: kết quả là khoảng {{n:ror.base.wr-min}}." }
      - { text: "Khoảng {{n:ror.base.wr-ex}}", why: "Đó là kết quả với winrate {{n:var.wr.ex}}. Với {{n:var.wr.typical.low}}, rủi ro cao hơn hàng chục lần: khoảng {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Bạn có {{n:br.bi.base}} {{t:buy-in|buy-in}}, {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}, nhưng chưa biết winrate của mình. Bạn biết gì về rủi ro mất toàn bộ bankroll?"
    options:
      - { text: "Phụ thuộc vào winrate: với {{n:var.wr.typical.high}} khoảng {{n:ror.base}}, với {{n:var.wr.typical.low}} khoảng {{n:ror.base.wr-min}}", correct: true, why: "Winrate nằm trong số mũ, cạnh bankroll. Khi chưa biết winrate, bạn cũng chưa biết rủi ro, và với winrate thấp, cùng một bankroll cho rủi ro cao hơn vài lần." }
      - { text: "Khoảng {{n:ror.base}}, vì rủi ro chỉ phụ thuộc vào bankroll", why: "Kết quả đó chỉ đúng với {{n:var.wr.typical.high}}. Với {{n:var.wr.typical.low}}, cùng bankroll đó cho khoảng {{n:ror.base.wr-min}}." }
      - { text: "Bằng 0, vì {{n:br.bi.base}} {{t:buy-in|buy-in}} là nhiều", why: "Với winrate dương, rủi ro giảm khi bankroll lớn hơn, nhưng không bao giờ về 0. Với {{n:var.wr.typical.low}}, rủi ro vẫn là khoảng {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Bạn bắt đầu {{t:stakes|mức cược}} này với {{n:br.bi.base}} {{t:buy-in|buy-in}}. Sau một {{t:downswing|downswing}}, bạn còn {{n:br.ex.below}}. Bạn làm gì?"
    options:
      - { text: "Xuống thấp hơn một {{t:stakes|mức cược}}", correct: true, why: "Bạn đã xuống dưới một nửa bankroll dự định ({{n:br.bi.move-down}}). Với chừng ấy {{t:buy-in|buy-in}}, rủi ro mất phần còn lại cao hơn vài lần so với khi có {{n:br.bi.base}} (với winrate {{n:var.wr.typical.high}} và SD {{n:var.sd}}). Ở {{t:stakes|mức cược}} thấp hơn một nửa, cùng bankroll đó lại gần đủ số {{t:buy-in|buy-in}} của mức này." }
      - { text: "Chơi tiếp, vì đó chỉ là {{t:variance}}", why: "Đúng là có lẽ đó là {{t:variance}}, nhưng việc xuống {{t:stakes|mức cược}} chính là để bảo vệ bạn khỏi nó. Với {{n:br.ex.below}} {{t:buy-in|buy-in}}, thêm một {{t:downswing}} nữa có thể lấy đi tất cả." }
      - { text: "Lên {{t:stakes|mức cược}} cao hơn để gỡ lại nhanh hơn", why: "Đó là tilt vì tuyệt vọng. {{t:stakes|Mức cược}} cao hơn khi bankroll tính bằng {{t:buy-in|buy-in}} nhỏ hơn làm tăng mạnh {{t:risk-of-ruin|rủi ro phá sản}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Bạn bắt đầu {{t:stakes|mức cược}} này với {{n:br.bi.base}} {{t:buy-in|buy-in}} và đã mất {{n:dd.bi.small}}. Giờ bạn có {{n:br.ex.after-dd}}. Bạn làm gì?"
    options:
      - { text: "Ở lại {{t:stakes|mức cược}} này và xem lại các quyết định trong những ván đã thua", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-in}} vẫn nhiều hơn ngưỡng xuống muộn nhất, {{n:br.bi.move-down}}. Trong mô phỏng, một {{t:downswing}} như vậy xảy ra với khoảng {{n:dd.p.small.100k}} người chơi thắng {{n:var.wr.ex}} trong {{n:var.hands.k}} nghìn tay, còn việc xem lại các ván bài giúp kiểm tra xem nguyên nhân có phải là sai lầm hay không." }
      - { text: "Xuống {{t:stakes|mức cược}} ngay", correct: true, why: "Đây cũng là quyết định tốt: một số nguồn khuyên nên xuống ngay sau khi mất {{n:dd.bi.small}} {{t:buy-in|buy-in}}. Xuống sớm hơn mốc một nửa bankroll không phải là sai lầm, còn xuống muộn hơn thì là sai lầm." }
      - { text: "Bỏ thêm {{t:buy-in|buy-in}} từ bên ngoài để trở lại {{n:br.bi.base}}", why: "Nạp thêm sau mỗi {{t:downswing|downswing}} làm mất ý nghĩa của bankroll như một giới hạn rủi ro. Bạn đặt ngưỡng từ trước và tuân thủ nó." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Bạn có {{n:br.bi.base}} {{t:buy-in|buy-in}} của {{t:stakes|mức cược}} hiện tại, đúng bằng bankroll bạn đã đặt ra. {{t:stakes|Mức cược}} cao hơn có {{t:buy-in}} lớn gấp đôi. Bạn có lên mức cao hơn không?"
    options:
      - { text: "Không, ở {{t:stakes|mức cược}} cao hơn đó chỉ là một nửa bankroll dự định", correct: true, why: "Bạn tính bankroll bằng số {{t:buy-in|buy-in}} của {{t:stakes|mức cược}} mà bạn muốn lên. {{n:br.bi.base}} {{t:buy-in|buy-in}} của bạn ở đó chỉ là {{n:br.bi.move-down}}, tức đúng bằng ngưỡng xuống." }
      - { text: "Có, vì kết quả của bạn đang tốt", why: "Một tháng tốt chủ yếu là do {{t:variance}} (bài học về {{t:variance|phương sai}}). Việc lên mức phụ thuộc vào bankroll ở {{t:stakes|mức cược}} mới." }
      - { text: "Có, vì bạn đã có {{n:br.bi.base}} {{t:buy-in|buy-in}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-in}} của {{t:stakes|mức cược}} hiện tại chỉ là {{n:br.bi.move-down}} ở {{t:stakes|mức cược}} cao gấp đôi." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Một người chơi tính trung bình đang thua ở {{t:stakes|mức cược}} của mình, nhưng có bankroll rất lớn. Điều đó mang lại gì cho họ?"
    options:
      - { text: "Chỉ trì hoãn khoản thua", correct: true, why: "Với winrate âm, kết quả trung bình đi xuống, nên sớm hay muộn họ sẽ mất bankroll bất kể nó lớn đến đâu. Bankroll bảo vệ trước {{t:variance|phương sai}}, chứ không bảo vệ trước lối chơi yếu." }
      - { text: "Bảo vệ họ khỏi phá sản", why: "Công thức tính rủi ro chỉ áp dụng khi winrate dương. Người chơi thua chắc chắn sẽ mất bankroll, chỉ chậm hơn nếu bankroll lớn hơn." }
      - { text: "Cho phép họ chơi {{t:stakes|mức cược}} cao hơn", why: "{{t:stakes|Mức cược}} cao hơn với winrate âm chỉ khiến họ thua nhanh hơn." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Bạn mới bắt đầu. Bạn chia thời gian giữa học và chơi thế nào?"
    options:
      - { text: "Khoảng {{n:study.beginner}} để học", correct: true, why: "Lúc đầu bạn có nhiều thứ nhất cần bù đắp, nên việc học chiếm phần lớn." }
      - { text: "Khoảng {{n:study.min}} để học", why: "Đó là mức tối thiểu cho người chơi đã có lãi. Lúc đầu, việc học nên chiếm phần lớn." }
      - { text: "Chỉ chơi, kiến thức sẽ đến cùng kinh nghiệm", why: "Kết quả ván chơi là phản hồi kém (bài học về quyết định và kết quả). Học có giải thích và phân tích ván bài giúp bạn tiến bộ nhanh hơn." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Bạn đã thắng ở {{t:stakes|mức cược}} của mình. Bạn chia thời gian thế nào?"
    options:
      - { text: "Khoảng một nửa mỗi bên, nhưng không bao giờ dưới {{n:study.min}} để học", correct: true, why: "Ngay cả khi bạn thắng, lý tưởng là khoảng {{n:study.winner}} để học, còn tối thiểu là {{n:study.min}}." }
      - { text: "Chỉ chơi, vì bạn đang thắng", why: "Ngay cả khi thắng, bạn không để thời gian học xuống dưới {{n:study.min}}." }
      - { text: "Khoảng {{n:study.beginner}} để học, như lúc đầu", why: "Bạn có thể làm vậy nếu đang chuẩn bị lên {{t:stakes|mức cược}} cao hơn. Nếu bạn chỉ đơn giản đang thắng ở mức của mình, khoảng {{n:study.winner}} là đủ." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Dấu hiệu nào cho thấy việc chơi có thể đang mất kiểm soát?"
    options:
      - { text: "Sau khi thua, bạn quay lại chơi để gỡ lại khoản thua", correct: true, why: "Chơi để gỡ lại khoản thua là một trong những dấu hiệu của vấn đề cờ bạc được nêu trong các tiêu chí chẩn đoán. Nếu bạn nhận ra những dấu hiệu như vậy ở bản thân, hãy dùng thông tin liên hệ trong thẻ về chơi có trách nhiệm." }
      - { text: "Bạn phân tích các ván đã thua sau {{t:session|phiên chơi}}", why: "Đó là thói quen học tập lành mạnh. Dấu hiệu của vấn đề bao gồm chơi để gỡ lại khoản thua, chơi lâu hơn dự định và chơi bằng tiền đi vay." }
      - { text: "Bạn kết thúc {{t:session|phiên chơi}} đúng kế hoạch", why: "Đó là sự kiểm soát tốt việc chơi. Dấu hiệu của vấn đề sẽ là chơi lâu hơn dự định hoặc cảm thấy cần gỡ lại." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
Bankroll là toàn bộ khoản tiền dự trữ chỉ dành riêng cho việc chơi poker. Trong bài học này, bạn tính nó bằng **{{t:buy-in|buy-in}}**, chứ không phải bằng tiền: một {{t:buy-in}} là một stack đầy đủ {{n:format.stack}} ở {{t:stakes|mức cược}} mà bạn đang chơi.

## {{t:risk-of-ruin|Rủi ro phá sản}}

Đây là xác suất bạn có lúc nào đó mất toàn bộ bankroll nếu tiếp tục chơi ở cùng {{t:stakes|mức cược}}:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

Công thức này là phép xấp xỉ với winrate và SD không đổi. Winrate và SD tính theo bb/100, bankroll tính theo bb. Với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-in}} | {{n:br.bi.base}} {{t:buy-in|buy-in}} | {{n:br.bi.beginner}} {{t:buy-in|buy-in}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## Rủi ro phụ thuộc vào điều gì

Winrate và bankroll đứng cạnh nhau trong công thức: winrate thấp hơn một nửa đòi hỏi bankroll lớn gấp đôi để có cùng mức rủi ro. Vì vậy, cùng một số {{t:buy-in|buy-in}} lại cho người chơi này rủi ro thấp hơn vài lần so với người chơi khác. Lúc đầu winrate của bạn chưa được biết, và để ước tính nó cần rất nhiều tay bài (bài học về {{t:variance|phương sai}}). Với winrate âm, không bankroll nào giúp được, vì bankroll bảo vệ trước {{t:variance|phương sai}}, chứ không bảo vệ trước lối chơi yếu.

## Khi nào nên xuống {{t:stakes|mức cược}}

Hãy đặt ngưỡng từ trước: bạn xuống thấp hơn một {{t:stakes|mức cược}} muộn nhất là khi bankroll giảm còn **một nửa** số {{t:buy-in|buy-in}} dự định, ví dụ từ {{n:br.bi.base}} xuống {{n:br.bi.move-down}}. Các nguồn đưa ra ngưỡng từ một nửa đến toàn bộ bankroll; một nửa là ngưỡng muộn nhất trong số đó. Ở {{t:stakes|mức cược}} thấp hơn một nửa, cùng bankroll đó lại gần đủ số {{t:buy-in|buy-in}} của mức này. Bạn quay lại mức cao hơn sớm nhất là khi có đủ bankroll tính bằng {{t:buy-in|buy-in}} của {{t:stakes|mức cược}} cao hơn. Một số nguồn khuyên nên xuống sớm hơn, ngay sau khi mất {{n:dd.bi.small}} {{t:buy-in|buy-in}}: xuống trước ngưỡng một nửa không phải là sai lầm.

## Học và chơi

Lúc đầu, bạn dành khoảng {{n:study.beginner}} thời gian để học, phần còn lại để chơi. Khi bạn đã thắng ở {{t:stakes|mức cược}} của mình, lý tưởng là khoảng {{n:study.winner}}, nhưng không bao giờ dưới {{n:study.min}} để học.

:::note Chơi có trách nhiệm
Một số dấu hiệu cho thấy việc chơi đang mất kiểm soát: bạn chơi lâu hơn dự định; sau khi thua, bạn quay lại để gỡ lại khoản thua; bạn chơi bằng số tiền không thể để mất, hoặc vay tiền để chơi; bạn chơi để trốn tránh những lo âu; bạn giấu việc chơi với người thân.

Nơi tìm kiếm sự giúp đỡ:

{{helplines}}
:::
