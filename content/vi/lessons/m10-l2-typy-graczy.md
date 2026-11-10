---
id: m10.l2
module: m10
order: 2
title: "Các kiểu người chơi"
sub: "Nit, reg, người chơi thụ động, maniac"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "Sau {{n:hud.ex.reg.hands}} tay bài, đối thủ có {{t:vpip}} {{n:hud.ex.passive.vpip}} và {{t:pfr}} {{n:hud.ex.passive.pfr}}. Điều này nói gì về lối chơi của anh ta trước flop?"
    options:
      - { text: "Anh ta chơi thụ động: với phần lớn tay bài, anh ta chỉ {{t:call|theo}} hoặc limp", correct: true, why: "Chênh lệch {{t:vpip}} − {{t:pfr}} là {{n:hud.ex.passive.gap}} điểm, vượt ngưỡng {{n:hud.gap.passive}}. Anh ta chơi khá nhiều tay, nhưng phần lớn đưa vào {{t:pot|pot}} mà không {{t:raise|tố}}." }
      - { text: "Anh ta chơi hung hăng, vì chơi nhiều tay", why: "Số tay bài ({{t:vpip}}) cho biết anh ta chơi lỏng đến đâu, chứ không cho biết hung hăng đến đâu. Mức hung hăng thể hiện qua {{t:pfr}} và chênh lệch giữa hai chỉ số." }
      - { text: "Đây là {{t:nit}}", why: "{{t:nit}} chơi tối đa khoảng {{n:hud.vpip.nit-max}} tay bài; người này chơi nhiều hơn rõ rệt." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "Theo dữ liệu tổng thể người chơi ở mức cược micro trực tuyến (NL25), {{t:recreational|người chơi giải trí}} đi đến showdown trong {{n:mda.rec.wtsd}} trường hợp và thắng {{n:mda.rec.wsd}} số showdown; với {{t:regular|reg}} là {{n:mda.reg.wtsd}} và {{n:mda.reg.wsd}}. Từ đó suy ra điều gì?"
    options:
      - { text: "{{t:recreational|Người chơi giải trí}} thường trả tiền đến cuối hơn và thua thường hơn: họ {{t:call|theo}} bằng tay yếu hơn", correct: true, why: "Họ đi đến showdown thường xuyên hơn nhưng thắng ít hơn, nên họ đến đó với tay yếu hơn. Trước họ, bạn cược {{t:value|lấy giá trị}} với nhiều tay hơn và {{t:bluff|bluff}} ít hơn." }
      - { text: "{{t:recreational|Người chơi giải trí}} {{t:bluff|bluff}} thường xuyên hơn", why: "Các con số này nói về việc họ đi đến showdown thường xuyên đến đâu và với tay gì, chứ không nói về {{t:bluff|bluff}}. Họ thắng ít showdown hơn vì {{t:call|theo}} bằng tay yếu hơn." }
      - { text: "Không gì cả: chênh lệch vài điểm chỉ là nhiễu", why: "Đây là dữ liệu của toàn bộ người chơi ở {{t:stakes|mức cược}} này trong {{n:mda.period.months}} tháng, không phải từ vài chục tay của một người chơi. Chênh lệch nhất quán ở NL25, NL50 và NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Bạn đã cược ở flop và turn, đối thủ {{t:call|theo}}. Đối thủ là {{t:recreational|người chơi giải trí}} thụ động ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} tay). Anh ta {{t:check|check}}. Bạn làm gì với {{t:top-pair|đôi cao nhất}} và kicker tốt thứ hai?"
    options:
      - { text: "Cược {{t:value|lấy giá trị}}", correct: true, why: "Kiểu người chơi này {{t:call|theo}} đến cuối với K yếu hơn, đôi 8 và các {{t:pair|đôi}} túi. Hơn một nửa số lần {{t:call|theo}} của anh ta là tay kém hơn bạn, nên cược sinh lời (ngưỡng ở mô-đun 8)." }
      - { text: "{{t:check|Check}} để tránh đụng tay mạnh hơn", why: "Trước người chơi {{t:call|theo}} bằng tay yếu hơn, {{t:check}} là bỏ phí giá trị. Tay mạnh hơn đôi khi sẽ trả tiền, nhưng số lần {{t:call|theo}} bằng tay kém hơn còn nhiều hơn." }
      - { text: "Cược cả {{t:pot|pot}} như một {{t:bluff}}", why: "Với {{t:top-pair|đôi cao nhất}} thì đây không phải {{t:bluff}}: bạn thắng nhiều tay sẽ {{t:call|theo}}. Đây là cược {{t:value|lấy giá trị}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, {{t:straight-draw}} không thành. Đối thủ là {{t:recreational|người chơi giải trí}} thụ động ({{t:wtsd}} {{n:mda.rec.wtsd}}), đã {{t:call|theo}} ở flop và turn. Anh ta {{t:check|check}}. Bạn làm gì?"
    options:
      - { text: "{{t:check|Check}} và bỏ {{t:pot|pot}}", correct: true, why: "{{t:bluff}} chỉ sinh lời khi đối thủ {{t:fold|bỏ bài}} thường xuyên hơn {{t:alpha}} của cược. Người chơi đã {{t:call|theo}} hai {{t:street|vòng cược}} và hay đi đến showdown hiếm khi {{t:fold|bỏ bài}} ở river." }
      - { text: "Cược lớn, vì tôi không có giá trị showdown", why: "Trong chiến lược nền (mô-đun 8), {{t:bluff}} kiểu này có thể tốt, nhưng trước người chơi này thì không đủ số lần {{t:fold|bỏ bài}}: {{t:bluff|cú bluff}} bị lỗ." }
      - { text: "Cược nhỏ để {{t:bluff}} rẻ hơn", why: "Cược nhỏ hơn cần ít lần {{t:fold|bỏ bài}} hơn, nhưng tay đã {{t:call|theo}} hai {{t:street|vòng cược}} thường cũng sẽ {{t:call|theo}} cược nhỏ. Tốt hơn là bỏ {{t:pot|pot}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "Bạn {{t:open|mở pot}} từ {{t:cutoff|CO}}. Ở Button là một {{t:nit}}: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} tay. Anh ta 3-bet bạn. Bạn làm gì với AJo?"
    options:
      - { text: "{{t:fold|Bỏ bài}}", correct: true, why: "Người chơi ít tay như vậy chủ yếu 3-bet bằng những tay mạnh nhất: AQ, AK và các {{t:pair|đôi}} cao, vốn áp đảo AJ. Trước anh ta, bạn {{t:fold|bỏ bài}} thường xuyên hơn so với chiến lược nền ở mô-đun 4." }
      - { text: "{{t:call|Theo}}, vì AJ là tay mạnh", why: "AJ mạnh trước một {{t:range|dải bài}} rộng. Trước cú 3-bet của người chơi có {{t:vpip}} {{n:hud.ex.nit.vpip}}, AJ thường bị áp đảo và không có {{t:position|vị trí}}." }
      - { text: "4-bet", why: "4-bet AJ trước {{t:nit|nit}} là đấu với một {{t:range|dải bài}} áp đảo nó và hiếm khi {{t:fold|bỏ bài}}. Đây không phải {{t:value}}, cũng không phải {{t:bluff}} tốt." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Bạn ở Button, mọi người đều đã {{t:fold|bỏ bài}}. Ở {{t:big-blind|big blind}} là một {{t:nit}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} sau {{n:hud.ex.reg.hands}} tay). Bạn điều chỉnh việc {{t:open|mở pot}} thế nào?"
    options:
      - { text: "{{t:open|Mở pot}} rộng hơn chiến lược nền", correct: true, why: "{{t:nit}} bảo vệ blind hẹp, nên {{t:open}} của bạn thắng ngay thường xuyên hơn, kể cả với tay yếu." }
      - { text: "{{t:open|Mở pot}} hẹp hơn, vì {{t:nit}} có tay mạnh", why: "{{t:nit}} có tay mạnh khi anh ta chơi. Ở {{t:big-blind|big blind}}, anh ta thường {{t:fold|bỏ bài}}, và đó là lợi nhuận của bạn." }
      - { text: "Không đổi: kiểu người chơi không ảnh hưởng đến việc cướp blind", why: "Có ảnh hưởng. Lợi nhuận từ việc cướp blind phụ thuộc vào việc blind {{t:fold|bỏ bài}} thường xuyên đến đâu, mà {{t:nit}} thì hay {{t:fold|bỏ bài}}." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "Đối thủ là {{t:maniac|maniac}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} sau {{n:hud.ex.reg.hands}} tay. Anh ta cược ở mọi {{t:street|vòng cược}}, và ở river {{t:bet|cược}} cả {{t:pot|pot}}. Bạn làm gì với {{t:top-pair|đôi cao nhất}} và kicker yếu?"
    options:
      - { text: "{{t:call|Theo}}", correct: true, why: "Trước người chơi {{t:bluff|bluff}} nhiều hơn chiến lược nền, các tay sát ngưỡng {{t:call|theo}} sẽ sinh lời. {{t:pair}} cao nhất thắng các {{t:bluff|cú bluff}} của anh ta và một phần tay giá trị." }
      - { text: "{{t:fold|Bỏ bài}}, vì cược cả {{t:pot|pot}} nghĩa là tay mạnh", why: "Với người chơi gần như tay nào cũng chơi bằng cách {{t:raise|tố}} và cược ở mọi {{t:street|vòng cược}}, cược lớn chứa nhiều {{t:bluff|cú bluff}}. Khi {{t:fold|bỏ bài}}, bạn trả tiền cho sự hung hăng của anh ta." }
      - { text: "{{t:raise|Tố}} all-in", why: "{{t:raise|Tố}} khiến các {{t:bluff|cú bluff}} {{t:fold|bỏ bài}}, còn tay mạnh hơn thì {{t:call|theo}}. Với tay bắt {{t:bluff|bluff}}, chỉ cần {{t:call}}." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Bạn đang chơi với {{t:maniac|maniac}}. Ở turn, bạn có tay yếu không còn cơ hội cải thiện, và anh ta {{t:check|check}}. Bạn làm gì?"
    options:
      - { text: "{{t:check|Check}}: {{t:bluff|bluff}} {{t:maniac|maniac}} hiếm khi hiệu quả", correct: true, why: "{{t:maniac|Maniac}} hiếm khi {{t:fold|bỏ bài}} và thường {{t:raise|tố}}. Bạn kiếm tiền từ anh ta bằng cách {{t:call|theo}} với tay mạnh hơn, không phải bằng {{t:bluff|bluff}}." }
      - { text: "Cược, vì {{t:check}} của {{t:maniac|maniac}} nghĩa là yếu", why: "Có thể vậy, nhưng {{t:maniac|maniac}} thường {{t:raise|tố}} với bất kỳ tay nào. {{t:bluff|Bluff}} cần đối thủ {{t:fold|bỏ bài}}, mà anh ta ít khi làm vậy." }
      - { text: "Cược all-in để anh ta không thể {{t:raise|tố}}", why: "Bạn mạo hiểm cả stack để thắng một {{t:pot|pot}} nhỏ, trước người chơi hiếm khi {{t:fold|bỏ bài}}. Đây là cách {{t:bluff}} đắt nhất." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Các chỉ số ở bài trước ghép lại thành vài hình mẫu điển hình. Kiểu người chơi cho biết người đó lệch khỏi chiến lược nền theo hướng nào: chơi quá ít tay, quá nhiều tay, {{t:call|theo}} quá thường xuyên hoặc {{t:raise|tố}} quá thường xuyên.

## Hai con số, bốn kiểu

Bạn xác định kiểu người chơi từ {{t:vpip}} và chênh lệch {{t:vpip}} − {{t:pfr}} (6-max, ít nhất khoảng {{n:hud.hands.vpip.low}} tay):

| Kiểu | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Lỗi so với chiến lược nền |
|---|---|---|---|
| {{t:nit|Nit}} | tối đa khoảng {{n:hud.vpip.nit-max}} | nhỏ | chơi quá ít tay |
| {{t:regular}} ({{t:tag}}, {{t:lag}}) | khoảng {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | nhỏ | gần chiến lược nền |
| {{t:recreational|người chơi giải trí}} thụ động | từ khoảng {{n:hud.vpip.loose}} | trên {{n:hud.gap.passive}} điểm | quá nhiều tay, {{t:call|theo}} quá thường xuyên |
| {{t:maniac|maniac}} | từ khoảng {{n:hud.vpip.loose}} | tối đa khoảng {{n:hud.gap.aggressive}} điểm | quá nhiều tay, {{t:raise|tố}} quá thường xuyên |

Người chơi thụ động có chênh lệch lớn còn được gọi là {{t:calling-station}}. Giữa các kiểu có những vùng chuyển tiếp (ví dụ {{t:vpip}} khoảng mười mấy phần trăm, hoặc người chơi lỏng có chênh lệch vài điểm): ở đó bạn không gán kiểu mà xem thêm các chỉ số khác.

## Dữ liệu tổng thể nói gì

Một cơ sở dữ liệu thống kê công khai đưa ra chỉ số trung bình của người chơi tại một phòng chơi trực tuyến lớn, NL25 6-max, từ mọi ván bài trong {{n:mda.period.months}} tháng gần nhất. Trong đó, {{t:regular|reg}} là người chơi có {{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} và tỉ lệ thắng trên {{n:mda.reg.def.wr}}, còn {{t:recreational|người chơi giải trí}} là người có {{t:vpip}} trên {{n:mda.rec.def}} và tỉ lệ thắng dưới {{n:mda.rec.def.wr}}:

| Chỉ số | {{t:regular|Reg}} | {{t:recreational|Người chơi giải trí}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Showdown thắng | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Tỉ lệ thắng | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

{{t:recreational|Người chơi giải trí}} có chênh lệch {{t:vpip}} − {{t:pfr}} là {{n:mda.rec.gap.pp}} điểm, tức là họ chơi thụ động. Họ đi đến showdown thường xuyên hơn và thắng ít hơn: họ {{t:call|theo}} bằng tay yếu hơn. Họ cũng hiếm khi {{t:fold|bỏ bài}} trước 3-bet. Ở NL50 và NL100, các con số gần như giống hệt.

## {{t:recreational|Người chơi giải trí}} thụ động

Chiến lược nền ở mô-đun 8 không đổi: bạn cược {{t:value|lấy giá trị}} khi hơn một nửa số tay sẽ {{t:call|theo}} là tay kém hơn, và {{t:bluff}} sinh lời khi đối thủ {{t:fold|bỏ bài}} thường xuyên hơn {{t:alpha}}. Điều thay đổi là đối thủ: anh ta {{t:call|theo}} với nhiều tay yếu hơn. Vì vậy:

- bạn cược {{t:value|lấy giá trị}} với nhiều tay hơn, kể cả tay mỏng hơn, ví dụ {{t:top-pair|đôi cao nhất}} với kicker yếu hơn qua ba {{t:street|vòng cược}};
- bạn {{t:bluff|bluff}} ít hơn, nhất là ở river: không có đủ số lần {{t:fold|bỏ bài}} để {{t:bluff}} sinh lời.

## {{t:nit|Nit}} và {{t:maniac|maniac}}

**{{t:nit|Nit}}** chỉ chơi tay mạnh. Khi anh ta {{t:raise|tố}} hoặc 3-bet, các tay ở phần dưới {{t:range|dải bài}} {{t:call|theo}} của bạn bị áp đảo thường xuyên hơn, nên bạn {{t:fold|bỏ bài}} với chúng thường xuyên hơn so với chiến lược nền ở mô-đun 4. Khi anh ta ở blind, bạn cướp blind thường xuyên hơn, vì anh ta hiếm khi bảo vệ.

**{{t:maniac|Maniac}}** chơi nhiều tay và gần như tay nào cũng {{t:raise|tố}}. Các cú cược của anh ta chứa nhiều {{t:bluff|cú bluff}} hơn chiến lược nền, nên bạn {{t:call|theo}} với các tay sát ngưỡng {{t:call|theo}}, để anh ta cược khi bạn có tay rất mạnh, và bản thân không {{t:bluff|bluff}}: anh ta hiếm khi {{t:fold|bỏ bài}}.

:::note Các ngưỡng này từ đâu ra
Ngưỡng của các kiểu là quy ước của huấn luyện viên (hai tài liệu đào tạo, cash trực tuyến 6-max): chúng tôi lấy phần trùng nhau hoặc khoảng bao trùm cả hai nguồn. Dữ liệu tổng thể đến từ một cơ sở dữ liệu thống kê công khai (một phòng chơi trực tuyến lớn, NL25–NL100, mọi ván bài trong {{n:mda.period.months}} tháng trước tháng 10 năm 2026; trang này không cho biết số tay bài). Việc nhận ra {{t:nit|nit}} và {{t:maniac|maniac}} dựa trên chỉ số của một đối thủ cụ thể, chứ không dựa trên dữ liệu về toàn bộ người chơi, nên cần có mẫu đủ lớn.
:::
