---
id: m10.l3
module: m10
order: 3
title: "Rời khỏi chiến lược nền"
sub: "Với tay bài nào và lệch bao xa"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Bạn biết đối thủ {{t:bluff|bluff}} trong line này thường hơn một chút so với trạng thái cân bằng. Bạn thay đổi quyết định với những tay bài nào trước?"
    options:
      - { text: "Những tay bài mà trong chiến lược nền trộn {{t:call}} và {{t:fold}}: giờ bạn luôn {{t:call|theo}}", correct: true, why: "Ở trạng thái cân bằng, các tay bài này cho kết quả như nhau, vì đối thủ có đúng số {{t:bluff|bluff}} cần thiết. Chỉ cần dư một chút {{t:bluff|bluff}} là {{t:call}} đã lời hơn {{t:fold}}." }
      - { text: "Những tay bài yếu nhất, mà trong chiến lược nền luôn {{t:fold|bỏ bài}}", why: "Các tay bài này thua cả một phần {{t:bluff|bluff}} hoặc cần lượng dư lớn hơn nhiều. Chúng chỉ thay đổi khi đối thủ lệch xa khỏi trạng thái cân bằng." }
      - { text: "Những tay bài mạnh nhất: giờ bạn {{t:raise|tố}} chúng", why: "Những tay bài mạnh nhất đằng nào bạn cũng chơi tiếp. Sự thay đổi bắt đầu từ những tay bài nằm ở ranh giới quyết định." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Trong một ví dụ solver đã được công bố, đối thủ trên river {{t:bluff|bluff}} khoảng {{n:overbluff.lock}} thay vì khoảng {{n:overbluff.base}} số lần cược. Cách bạn đáp lại cược của họ bằng những tay bài bắt {{t:bluff|bluff}} thay đổi thế nào?"
    options:
      - { text: "Bạn thôi {{t:fold|bỏ bài}}: những tay bài từng trộn trong chiến lược nền giờ luôn {{t:call|theo}}", correct: true, why: "Chừng đó đã đủ để trong lời giải với chiến lược của đối thủ bị khóa, việc phòng thủ chuyển hẳn sang chỉ {{t:call|theo}}. Những tay bài cho kết quả như nhau phản ứng với cả lượng {{t:bluff|bluff}} dư nhỏ nhất." }
      - { text: "Gần như không đổi: vài điểm phần trăm là quá ít để thay đổi điều gì", why: "Với những tay bài cho kết quả như nhau, vài điểm phần trăm là nhiều: ở trạng thái cân bằng, {{t:call}} và {{t:fold}} mang lại cho chúng kết quả như nhau, nên bất kỳ lượng {{t:bluff|bluff}} dư nào cũng nghiêng về phía {{t:call|theo}}." }
      - { text: "Bạn bắt đầu {{t:raise|tố}} bằng những tay bài bắt {{t:bluff|bluff}}", why: "{{t:raise|Tố}} sẽ đẩy {{t:bluff|bluff}} của đối thủ ra khỏi ván, còn những tay bài mạnh hơn thì {{t:call|theo}}. Tay bài bắt {{t:bluff|bluff}} kiếm lời bằng cách {{t:call|theo}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Bạn biết đối thủ trong một line nhất định {{t:bluff|bluff}} ít hơn so với trạng thái cân bằng. Bạn làm gì với tay bài bắt {{t:bluff|bluff}} mà trong chiến lược nền lúc thì {{t:call|theo}}, lúc thì {{t:fold|bỏ bài}}?"
    options:
      - { text: "Luôn {{t:fold|bỏ bài}}", correct: true, why: "Khi số {{t:bluff|bluff}} ít hơn mức cân bằng đòi hỏi, những tay bài cho kết quả như nhau sẽ lỗ khi {{t:call|theo}}. Kết quả của solver: khi thiếu {{t:bluff|bluff}}, bạn luôn {{t:fold|bỏ bài}}." }
      - { text: "Luôn {{t:call|theo}}, để đối thủ không khai thác được tôi bằng {{t:bluff|bluff}}", why: "Đối thủ {{t:bluff|bluff}} quá ít sẽ không khai thác được việc bạn {{t:fold|bỏ bài}}. Chính bạn khai thác sai lầm của họ bằng cách {{t:fold|bỏ bài}}." }
      - { text: "Chơi như trong chiến lược nền, mỗi bên một nửa", why: "Trộn chỉ có ý nghĩa khi cả hai quyết định cho kết quả như nhau. Khi thiếu {{t:bluff|bluff}}, {{t:fold}} mang lại nhiều hơn." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "Bạn {{t:bet|cược}} c-bet {{n:cbet.ex.small}} vào {{t:pot|pot}} {{n:ex.pot}}, không có bài gì. Đối thủ phải {{t:fold|bỏ bài}} thường xuyên đến mức nào để {{t:bluff}} này hòa vốn? Hãy nhập phần trăm."
    answer: alpha.cbet.small
    explanation: "Ngưỡng là cược ÷ ({{t:pot}} + cược) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Đối thủ có fold to c-bet cao hơn hẳn con số này sẽ {{t:fold|bỏ bài}} đủ thường xuyên để c-bet có lời ngay cả khi không có bài."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "Đối thủ có fold to c-bet {{n:hud.ex.fcb.high}} sau {{n:hud.ex.reg.hands}} ván. Trên flop {{t:dry|khô}}, bạn không trúng gì. C-bet 1/3 {{t:pot|pot}} khi không có bài có đáng không?"
    options:
      - { text: "Có: đối thủ {{t:fold|bỏ bài}} thường hơn {{n:alpha.cbet.small}}, nên c-bet có lời ngay", correct: true, why: "C-bet 1/3 {{t:pot|pot}} hòa vốn ở mức {{n:alpha.cbet.small}} lần {{t:fold|bỏ bài}}. Đối thủ {{t:fold|bỏ bài}} thường hơn nhiều, nên c-bet có lời trước cả khi bạn tính đến equity của tay bài. Fold to c-bet gộp mọi kích thước cược và mọi bàn, nên đây chỉ là con số gần đúng." }
      - { text: "Không: không có bài thì không cược", why: "{{t:bluff}} không cần bài, nó cần đối thủ {{t:fold|bỏ bài}}. Khi đối thủ {{t:fold|bỏ bài}} thường hơn {{n:alpha.cbet.small}}, c-bet có lời với bất kỳ tay bài nào." }
      - { text: "Chỉ với kích thước lớn, vì cược nhỏ không đẩy được bài ra", why: "Cược lớn hơn cần đối thủ {{t:fold|bỏ bài}} nhiều hơn: với 3/4 {{t:pot|pot}} là tới {{n:alpha.cbet.big}}. Khi đối thủ đằng nào cũng {{t:fold|bỏ bài}} thường xuyên, c-bet nhỏ làm được điều đó với chi phí thấp hơn." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "Đối thủ có fold to c-bet {{n:hud.ex.fcb.low}} sau {{n:hud.ex.reg.hands}} ván. Bạn trượt flop và không có {{t:draw|bài chờ}}. Bạn đang cân nhắc c-bet 3/4 {{t:pot|pot}}. Bạn làm gì?"
    options:
      - { text: "{{t:check|Check}}: đối thủ này {{t:fold|bỏ bài}} ít hơn mức mà một c-bet lớn cần", correct: true, why: "C-bet 3/4 {{t:pot|pot}} chỉ hòa vốn ở mức {{n:alpha.cbet.big}} lần {{t:fold|bỏ bài}}, còn đối thủ {{t:fold|bỏ bài}} trong {{n:hud.ex.fcb.low}} trường hợp. Không có bài và không có outs, {{t:bluff}} như vậy sẽ lỗ." }
      - { text: "Cược, vì c-bet là tiêu chuẩn", why: "C-bet khi không có bài chỉ tốt khi đối thủ {{t:fold|bỏ bài}} đủ thường xuyên hoặc khi tay bài có equity. Ở đây không có điều nào cả." }
      - { text: "Cược all-in để buộc đối thủ {{t:fold|bỏ bài}}", why: "Cược càng lớn thì càng cần đối thủ {{t:fold|bỏ bài}} nhiều. Đối thủ hiếm khi {{t:fold|bỏ bài}} sẽ không {{t:fold|bỏ bài}} thường hơn chỉ vì bạn {{t:bet|cược}} nhiều hơn." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "Một {{t:recreational|người chơi giải trí}} có fold to 3-bet {{n:mda.rec.f3b}} {{t:open|mở}} từ {{t:cutoff|CO}}. Bạn ở Button. Trong chiến lược nền, KJs đôi khi {{t:call|theo}}, còn A5s đôi khi là 3-bet {{t:bluff|bluff}}. Bạn chơi thế nào trước người chơi này?"
    options:
      - { text: "Tôi 3-bet KJs để lấy {{t:value|giá trị}}, còn A5s thì không 3-bet {{t:bluff|bluff}}", correct: true, why: "Người chơi hiếm khi {{t:fold|bỏ bài}} trước 3-bet thường {{t:call|theo}} bằng những tay bài yếu hơn, nên các tay bài mạnh hơn kiếm lời nhờ 3-bet. 3-bet {{t:bluff|bluff}} chỉ có lời ngay khi đối thủ {{t:fold|bỏ bài}} trên {{n:alpha.vs-3bet-ip-size}}, còn người chơi này {{t:fold|bỏ bài}} trong {{n:mda.rec.f3b}} trường hợp." }
      - { text: "Tôi 3-bet A5s, vì {{t:bluff}} có {{t:blocker|blocker}} là một 3-bet tốt", why: "Trong chiến lược nền thì đúng, trước đối thủ {{t:fold|bỏ bài}} khoảng một nửa số lần. Người này {{t:fold|bỏ bài}} trong {{n:mda.rec.f3b}} trường hợp, nên {{t:bluff}} gần như luôn phải chơi {{t:pot|pot}} lớn với tay bài yếu." }
      - { text: "Tôi chỉ {{t:call|theo}} với KJs để không làm đối thủ sợ", why: "Trước người chơi {{t:call|theo}} 3-bet bằng những tay bài yếu hơn, 3-bet KJs giúp xây {{t:pot|pot}} lớn hơn với tay bài tốt hơn và có {{t:position|vị trí}}. Như vậy tốt hơn là chỉ {{t:call|theo}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Theo dữ liệu từ tập người chơi micro stakes online (NL25), {{t:regular|reg}} {{t:fold|bỏ bài}} trước 3-bet trong {{n:mda.reg.f3b}} trường hợp, còn {{t:recreational|người chơi giải trí}} trong {{n:mda.rec.f3b}}. 3-bet có {{t:position|vị trí}} lên {{n:pf.3bet.ip-total}} có lời khi không có bài nếu đối thủ {{t:fold|bỏ bài}} trên {{n:alpha.vs-3bet-ip-size}}. Từ đó rút ra điều gì?"
    options:
      - { text: "Trước {{t:recreational|người chơi giải trí}}, bạn 3-bet gần như không có {{t:bluff|bluff}}; trước {{t:regular|reg}}, {{t:bluff|bluff}} vẫn giữ lại, nhưng chỉ với những tay bài có equity", correct: true, why: "Không nhóm nào {{t:fold|bỏ bài}} đủ thường xuyên để 3-bet có lời khi không có bài. Trong chiến lược nền, 3-bet {{t:bluff|bluff}} sống nhờ equity sau flop và nhờ đối thủ {{t:fold|bỏ bài}}; trước người chơi {{t:fold|bỏ bài}} trong {{n:mda.rec.f3b}} trường hợp, chủ yếu chỉ còn lại equity, nên bạn 3-bet bằng {{t:range|range}} {{t:linear|tuyến tính}}." }
      - { text: "Bạn 3-bet mọi người bằng bất kỳ tay bài nào, vì ai cũng {{t:fold|bỏ bài}} nhiều", why: "Ở đây không ai {{t:fold|bỏ bài}} thường hơn {{n:alpha.vs-3bet-ip-size}}. 3-bet bằng mọi tay bài sẽ lỗ." }
      - { text: "Trước {{t:recreational|người chơi giải trí}}, bạn ngừng 3-bet hoàn toàn", why: "Ngược lại: người chơi {{t:call|theo}} 3-bet bằng những tay bài yếu hơn sẽ trả tiền cho những tay bài mạnh của bạn. Bạn thay đổi thành phần 3-bet, chứ không bỏ 3-bet." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Sau {{n:hud.ex.mid.hands}} ván, đối thủ có vẻ lỏng và thụ động, nhưng mẫu còn nhỏ. Bạn lệch khỏi chiến lược nền bao xa?"
    options:
      - { text: "Một chút, theo hướng của nhận định, và chỉ với những tay bài ranh giới", correct: true, why: "Hướng đã thấy được ngay cả trong mẫu nhỏ, nhưng các con số có sai số lớn. Bạn dịch những tay bài ở ranh giới quyết định theo hướng nhận định, phần còn lại chơi như trong chiến lược nền cho đến khi mẫu lớn hơn." }
      - { text: "Hết mức: tôi lập tức {{t:exploit|khai thác}} tối đa đối thủ", why: "Với mẫu nhỏ, nhận định có thể sai. Lệch xa khỏi chiến lược nền tự nó đã có thể bị khai thác: chiến lược nền là chiến lược ít bị khai thác nhất." }
      - { text: "Hoàn toàn không, cho đến khi tôi có một nghìn ván", why: "Quá thận trọng. Hướng của nhận định sau {{n:hud.ex.mid.hands}} ván đã có ý nghĩa, và bạn có thể dịch những tay bài ranh giới với chi phí thấp." }
---
{{t:exploit|Khai thác}} không thay thế chiến lược nền, mà chỉ dịch chuyển nó. Trước hết bạn biết cách chơi ở trạng thái cân bằng (mô-đun 3–9), sau đó từ dữ liệu bạn thấy đối thủ lệch khỏi nó theo hướng nào, và bạn dịch lối chơi của mình theo cùng hướng đó. Câu hỏi là: với những tay bài nào và lệch bao xa.

## Bắt đầu từ {{t:mixed-hand|tay bài trộn}}

Ở trạng thái cân bằng, một số tay bài chơi hai hành động, ví dụ lúc thì {{t:call|theo}}, lúc thì {{t:fold|bỏ bài}}. Chúng làm vậy vì cả hai hành động cho kết quả như nhau: đối thủ có đúng đủ số {{t:bluff|bluff}} để hai lựa chọn của tay bài là như nhau. Chính những tay bài này phản ứng đầu tiên với sai lầm của đối thủ:

- đối thủ {{t:bluff|bluff}} quá thường xuyên: {{t:mixed-hand|tay bài trộn}} luôn {{t:call|theo}};
- đối thủ {{t:bluff|bluff}} quá ít: {{t:mixed-hand|tay bài trộn}} luôn {{t:fold|bỏ bài}}.

Chỉ cần thay đổi một chút. Trong một ví dụ solver đã được công bố (Button cược trên river sau line cược, {{t:check}}, cược), việc thay đổi lượng {{t:bluff|bluff}} của đối thủ từ khoảng {{n:overbluff.base}} lên khoảng {{n:overbluff.lock}} đã chuyển phòng thủ của {{t:big-blind|big blind}} sang chỉ {{t:call|theo}}. Những tay bài trong chiến lược nền luôn {{t:fold|bỏ bài}} hoặc luôn chơi tiếp chỉ thay đổi quyết định khi đối thủ lệch xa khỏi trạng thái cân bằng.

## Tính {{t:bluff|bluff}} bằng ngưỡng

{{t:alpha}} từ mô-đun 6 cho biết {{t:bluff}} khi không có bài có đáng hay không:

```formula
{{t:bluff}} có lời khi đối thủ {{t:fold|bỏ bài}} thường hơn: cược ÷ (pot + cược)
```

Với c-bet 1/3 {{t:pot|pot}}, con số này là {{n:alpha.cbet.small}}; với 3/4 {{t:pot|pot}} là {{n:alpha.cbet.big}}. Chỉ số fold to c-bet trên {{t:hud|HUD}} cho thấy đối thủ ở trên hay dưới ngưỡng này. Đây là con số gần đúng: chỉ số gộp mọi kích thước cược và mọi flop, còn tay bài của bạn thường vẫn có một ít equity. Trên flop trúng {{t:range}} của đối thủ, họ {{t:fold|bỏ bài}} ít hơn mức trung bình.

Người chơi trong tập micro stakes online (NL25) {{t:fold|bỏ bài}} trước c-bet trên flop trung bình trong {{n:mda.all.fcb}} trường hợp. Điều đó không nhất thiết là sai lầm: solver khi {{t:out-of-position|không có vị trí}} trên flop cũng {{t:fold|bỏ bài}} thường hơn mức {{t:mdf}} chỉ ra (mô-đun 6). Vì vậy, chỉ riêng mức trung bình của tập người chơi cao hơn ngưỡng không đủ để biện minh cho c-bet khi không có bài; bạn cần nhận định về đối thủ cụ thể hoặc một flop không trúng {{t:range}} của họ.

## 3-bet người chơi không chịu {{t:fold|bỏ bài}}

3-bet có {{t:position|vị trí}} lên {{n:pf.3bet.ip-total}} chỉ có lời khi hoàn toàn không có bài nếu đối thủ {{t:fold|bỏ bài}} thường hơn {{n:alpha.vs-3bet-ip-size}} (mô-đun 4). Dữ liệu từ tập người chơi micro stakes online (NL25):

| Nhóm | Fold to 3-bet |
|---|---|
| {{t:regular|Reg}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Người chơi giải trí}} | {{n:mda.rec.f3b}} |

Trong chiến lược nền, 3-bet {{t:bluff|bluff}} sống nhờ đối thủ {{t:fold|bỏ bài}} và nhờ equity sau flop. Trước người chơi {{t:fold|bỏ bài}} trong {{n:mda.rec.f3b}} trường hợp, gần như không có lần {{t:fold|bỏ bài}} nào, nhưng họ lại {{t:call|theo}} bằng những tay bài yếu hơn. Vì vậy bạn 3-bet họ bằng {{t:range|range}} {{t:linear|tuyến tính}}: thêm nhiều tay bài mạnh để lấy {{t:value|giá trị}}, gần như không có {{t:bluff|bluff}}. Huấn luyện viên trong hai tài liệu đào tạo đặt ranh giới này ở mức fold to 3-bet khoảng {{n:hud.f3b.low}}.

## Mẫu nhỏ, lệch ít

Mẫu càng nhỏ, sai số của chỉ số càng lớn (bài 1). Với mẫu nhỏ, bạn chỉ dịch những tay bài ranh giới và chỉ theo hướng của nhận định. Lệch xa, với toàn bộ {{t:range|range}}, chỉ có ý nghĩa khi có mẫu lớn và sai lầm rõ ràng của đối thủ. Bản thân việc lệch khỏi chiến lược nền đã là một sai lầm mà đối thủ giỏi có thể khai thác.

:::note Nguồn
Nguyên tắc về {{t:mixed-hand|tay bài trộn}} lấy từ một phân tích solver đã được công bố, với chiến lược của đối thủ bị khóa (lời giải solver, không phải dữ liệu về tập người chơi). Các ngưỡng {{t:alpha}} là phép tính. Fold to 3-bet và fold to c-bet của tập người chơi lấy từ một cơ sở dữ liệu thống kê công khai (một phòng online lớn, NL25–NL100, {{n:mda.period.months}} tháng trước tháng 10 năm 2026). Ranh giới fold to 3-bet và nguyên tắc “mẫu nhỏ, lệch ít” là khuyến nghị từ hai tài liệu đào tạo.
:::
