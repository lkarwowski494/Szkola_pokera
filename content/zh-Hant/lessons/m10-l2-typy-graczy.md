---
id: m10.l2
module: m10
order: 2
title: "玩家類型"
sub: "岩石玩家、常客、被動玩家、瘋子"
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
    prompt: "經過{{n:hud.ex.reg.hands}}手牌後，對手的{{t:vpip}}是{{n:hud.ex.passive.vpip}}、{{t:pfr}}是{{n:hud.ex.passive.pfr}}。這說明他翻牌前怎麼打？"
    options:
      - { text: "他很被動：大多數牌只{{t:call|跟注}}或平跟", correct: true, why: "{{t:vpip}} − {{t:pfr}}的差距是{{n:hud.ex.passive.gap}}點，超過{{n:hud.gap.passive}}的門檻。他玩的牌相當多，但大多數都沒有{{t:raise|加注}}就投入{{t:pot|底池}}。" }
      - { text: "他很兇，因為他玩很多牌", why: "玩牌數量（{{t:vpip}}）說明他打得多鬆，而不是多兇。攻擊性要看{{t:pfr}}以及兩者的差距。" }
      - { text: "他是{{t:nit}}", why: "{{t:nit}}最多只玩約{{n:hud.vpip.nit-max}}的牌；這位玩家明顯玩得更多。" }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "根據線上微級別（NL25）的玩家群體資料，{{t:recreational|娛樂玩家}}有{{n:mda.rec.wtsd}}的情況會打到攤牌，並贏下{{n:mda.rec.wsd}}的攤牌；{{t:regular|常客}}則是{{n:mda.reg.wtsd}}和{{n:mda.reg.wsd}}。這代表什麼？"
    options:
      - { text: "{{t:recreational|娛樂玩家}}更常付錢看到最後，也更常輸：他們用較弱的牌{{t:call|跟注}}", correct: true, why: "他們更常打到攤牌，卻更少贏，所以是帶著較弱的牌走到那裡。面對他們，你要用更多牌下注{{t:value|拿價值}}，並減少{{t:bluff|詐唬}}。" }
      - { text: "{{t:recreational|娛樂玩家}}更常{{t:bluff|詐唬}}", why: "這些數字說的是他們多常打到攤牌、帶著什麼牌，而不是{{t:bluff|詐唬}}。他們贏的攤牌較少，是因為用較弱的牌{{t:call|跟注}}。" }
      - { text: "沒什麼：差幾個點只是雜訊", why: "這是該{{t:stakes|級別}}整個玩家群體{{n:mda.period.months}}個月的資料，而不是單一玩家幾十手牌的資料。這個差距在NL25、NL50和NL100都一致。" }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "河牌。你在翻牌和轉牌都下注，對手都{{t:call|跟注}}。對手是被動的{{t:recreational|娛樂玩家}}（{{t:vpip}} {{n:mda.rec.vpip}}、{{t:pfr}} {{n:mda.rec.pfr}}、{{n:hud.ex.reg.hands}}手牌）。他{{t:check|過牌}}。你拿著{{t:top-pair|頂對}}加第二大踢腳，怎麼打？"
    options:
      - { text: "下注{{t:value|拿價值}}", correct: true, why: "這類玩家會用較弱的K、8和口袋{{t:pair|對子}}一路{{t:call|跟注}}到底。他的{{t:call|跟注}}有一半以上是比你差的牌，所以下注能賺錢（第8單元的門檻）。" }
      - { text: "{{t:check|過牌}}，以免撞上更好的牌", why: "面對會用較弱的牌{{t:call|跟注}}的玩家，{{t:check}}等於放棄價值。更好的牌有時會付錢，但較差的牌{{t:call|跟注}}的次數更多。" }
      - { text: "下注整個{{t:pot|底池}}，當作{{t:bluff}}", why: "拿著{{t:top-pair|頂對}}，這不是{{t:bluff}}：會{{t:call|跟注}}的牌中有很多你都贏。這個下注是{{t:value|為了價值}}。" }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "河牌，{{t:straight-draw}}沒中。對手是被動的{{t:recreational|娛樂玩家}}（{{t:wtsd}} {{n:mda.rec.wtsd}}），翻牌和轉牌都{{t:call|跟注}}。他{{t:check|過牌}}。你怎麼打？"
    options:
      - { text: "{{t:check|過牌}}，放棄{{t:pot|底池}}", correct: true, why: "只有當對手{{t:fold|棄牌}}的頻率高於你下注的{{t:alpha}}時，{{t:bluff}}才會賺錢。{{t:call|跟注}}了兩條{{t:street|街}}、又常打到攤牌的玩家，河牌很少{{t:fold|棄牌}}。" }
      - { text: "下大注，因為我在攤牌時沒有價值", why: "在基準策略（第8單元）中，這種{{t:bluff}}有時是好選擇，但面對這位玩家，{{t:fold|棄牌}}不夠多：{{t:bluff|詐唬}}會虧錢。" }
      - { text: "下小注，讓{{t:bluff}}便宜一點", why: "較小的下注需要的{{t:fold|棄牌}}較少，但{{t:call|跟注}}了兩條{{t:street|街}}的牌，通常也會{{t:call|跟注}}小注。不如放棄{{t:pot|底池}}。" }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "你在{{t:cutoff|CO}}{{t:open|開池}}。按鈕位坐著一位{{t:nit}}：{{t:vpip}} {{n:hud.ex.nit.vpip}}、{{t:pfr}} {{n:hud.ex.nit.pfr}}、{{n:hud.ex.reg.hands}}手牌。他對你3-bet。你拿AJo怎麼打？"
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "玩牌這麼少的人，3-bet主要用最強的牌：AQ、AK和高{{t:pair|對子}}，這些牌都壓制AJ。面對他，你要比第4單元的基準策略更常{{t:fold|棄牌}}。" }
      - { text: "{{t:call|跟注}}，因為AJ是強牌", why: "AJ面對寬的{{t:range|範圍}}是強牌。面對{{t:vpip}} {{n:hud.ex.nit.vpip}}的玩家的3-bet，它常被壓制，而且沒有{{t:position|位置}}。" }
      - { text: "4-bet", why: "對{{t:nit|岩石玩家}}用AJ 4-bet，是在對抗一個壓制它、又很少{{t:fold|棄牌}}的{{t:range|範圍}}。這既不是{{t:value}}，也不是好的{{t:bluff}}。" }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "你在按鈕位，其他人都{{t:fold|棄牌}}了。{{t:big-blind|大盲}}坐著一位{{t:nit}}（{{n:hud.ex.reg.hands}}手牌後{{t:vpip}} {{n:hud.ex.nit.vpip}}）。你要怎麼調整{{t:open|開池}}？"
    options:
      - { text: "比基準策略更寬地{{t:open|開池}}", correct: true, why: "{{t:nit}}防守盲注很窄，所以你的{{t:open}}更常直接贏下，即使拿弱牌也一樣。" }
      - { text: "更緊地{{t:open|開池}}，因為{{t:nit}}有強牌", why: "{{t:nit}}只有在入池時才有強牌。在{{t:big-blind|大盲}}時他大多{{t:fold|棄牌}}，這就是你的利潤。" }
      - { text: "不變：玩家類型不影響偷盲", why: "會影響。偷盲的利潤取決於盲注多常{{t:fold|棄牌}}，而{{t:nit}}常常{{t:fold|棄牌}}。" }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "對手是{{t:maniac|瘋子}}：{{n:hud.ex.reg.hands}}手牌後{{t:vpip}} {{n:hud.ex.maniac.vpip}}、{{t:pfr}} {{n:hud.ex.maniac.pfr}}。他每條{{t:street|街}}都下注，河牌{{t:bet|下注}}整個{{t:pot|底池}}。你拿{{t:top-pair|頂對}}加弱踢腳，怎麼打？"
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "面對詐唬比基準策略更多的玩家，處於{{t:call|跟注}}邊緣的牌能賺錢。最大的{{t:pair}}能贏他的{{t:bluff|詐唬}}和部分價值牌。" }
      - { text: "{{t:fold|棄牌}}，因為下注整個{{t:pot|底池}}代表強牌", why: "一位幾乎每手牌都以{{t:raise|加注}}入池、每條{{t:street|街}}都下注的玩家，大注裡會有很多{{t:bluff|詐唬}}。{{t:fold|棄牌}}等於因為他打得兇而付錢給他。" }
      - { text: "{{t:raise|加注}}全下", why: "{{t:raise|加注}}會讓{{t:bluff|詐唬}}牌{{t:fold|棄牌}}，而更好的牌會{{t:call|跟注}}。拿著抓{{t:bluff|詐唬}}的牌，{{t:call}}就夠了。" }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "你在和{{t:maniac|瘋子}}對戰。轉牌時你拿著沒有機會改進的弱牌，而他{{t:check|過牌}}。你怎麼打？"
    options:
      - { text: "{{t:check|過牌}}：對{{t:maniac|瘋子}}{{t:bluff|詐唬}}很少奏效", correct: true, why: "{{t:maniac|瘋子}}很少{{t:fold|棄牌}}，又常{{t:raise|加注}}。對他賺錢靠的是用較強的牌{{t:call|跟注}}，而不是{{t:bluff|詐唬}}。" }
      - { text: "下注，因為{{t:maniac|瘋子}}的{{t:check}}代表他很弱", why: "有可能，但{{t:maniac|瘋子}}常常拿任何牌都{{t:raise|加注}}。{{t:bluff|詐唬}}需要{{t:fold|棄牌}}，而他很少這麼做。" }
      - { text: "全下，讓他無法{{t:raise|加注}}", why: "面對很少{{t:fold|棄牌}}的玩家，你拿整個籌碼冒險，只為了贏一個小{{t:pot|底池}}。這是最貴的{{t:bluff}}方式。" }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
上一課的統計數據可以歸納成幾種典型樣貌。玩家類型告訴你他偏離基準策略的方向：玩的牌太少、玩的牌太多、太常{{t:call|跟注}}，或太常{{t:raise|加注}}。

## 兩個數字，四種類型

你從{{t:vpip}}以及{{t:vpip}} − {{t:pfr}}的差距判斷類型（6-max，至少約{{n:hud.hands.vpip.low}}手牌）：

| 類型 | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | 相對基準策略的漏洞 |
|---|---|---|---|
| {{t:nit|岩石玩家}} | 最多約{{n:hud.vpip.nit-max}} | 小 | 玩的牌太少 |
| {{t:regular}}（{{t:tag}}、{{t:lag}}） | 約{{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | 小 | 接近基準策略 |
| 被動的{{t:recreational|娛樂玩家}} | 約{{n:hud.vpip.loose}}起 | 超過{{n:hud.gap.passive}}點 | 玩的牌太多，太常{{t:call|跟注}} |
| {{t:maniac|瘋子}} | 約{{n:hud.vpip.loose}}起 | 最多約{{n:hud.gap.aggressive}}點 | 玩的牌太多，太常{{t:raise|加注}} |

差距大的被動玩家也稱為{{t:calling-station}}。類型之間有過渡區（例如{{t:vpip}}在十幾%，或差距只有幾點的鬆手玩家）：在這些區域你不歸類，而是繼續看其他統計數據。

## 玩家群體資料怎麼說

一個公開的統計資料庫提供某個大型線上平台玩家的平均統計，NL25 6-max，涵蓋過去{{n:mda.period.months}}個月的所有牌局。其中{{t:regular|常客}}是{{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}}且勝率高於{{n:mda.reg.def.wr}}的玩家，{{t:recreational|娛樂玩家}}則是{{t:vpip}}超過{{n:mda.rec.def}}且勝率低於{{n:mda.rec.def.wr}}的玩家：

| 統計 | {{t:regular|常客}} | {{t:recreational|娛樂玩家}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| 面對3-bet棄牌 | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| 贏下的攤牌 | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| 勝率 | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

{{t:recreational|娛樂玩家}}的{{t:vpip}} − {{t:pfr}}差距是{{n:mda.rec.gap.pp}}點，也就是說他們很被動。他們更常打到攤牌，也更少贏：他們用較弱的牌{{t:call|跟注}}。他們也很少在面對3-bet時{{t:fold|棄牌}}。在NL50和NL100，數字幾乎一樣。

## 被動的{{t:recreational|娛樂玩家}}

第8單元的基準策略不變：當會{{t:call|跟注}}的牌中有一半以上比你差時，你下注{{t:value|拿價值}}；當對手{{t:fold|棄牌}}的頻率高於{{t:alpha}}時，{{t:bluff}}能賺錢。改變的是對手：他會用更多較弱的牌{{t:call|跟注}}。因此：

- 你用更多牌下注{{t:value|拿價值}}，包括更薄的價值，例如拿{{t:top-pair|頂對}}加較弱踢腳打三條{{t:street|街}}；
- 你更少{{t:bluff|詐唬}}，尤其是在河牌：{{t:bluff}}要賺錢所需的{{t:fold|棄牌}}並不存在。

## {{t:nit|岩石玩家}}和{{t:maniac|瘋子}}

**{{t:nit|岩石玩家}}**只玩強牌。當他{{t:raise|加注}}或3-bet時，你{{t:call|跟注}}{{t:range|範圍}}底部的牌更常被壓制，所以你要比第4單元的基準策略更常用這些牌{{t:fold|棄牌}}。當他在盲注位時，你要更常偷盲，因為他很少防守。

**{{t:maniac|瘋子}}**玩很多牌，而且幾乎每手都{{t:raise|加注}}。他的下注比基準策略含有更多{{t:bluff|詐唬}}，所以處於{{t:call|跟注}}邊緣的牌你要{{t:call|跟注}}，拿非常強的牌時讓他下注，自己則不{{t:bluff|詐唬}}：他很少{{t:fold|棄牌}}。

:::note 這些門檻從哪來
類型門檻是教練的慣例（兩份培訓教材，6-max線上現金局）：我們取兩者的交集，或涵蓋兩個來源的區間。玩家群體資料來自公開的統計資料庫（一個大型線上平台，NL25–NL100，2026年10月之前{{n:mda.period.months}}個月的所有牌局；網站未提供手牌數）。判讀{{t:nit|岩石玩家}}和{{t:maniac|瘋子}}依據的是特定對手的統計，而不是整個玩家群體的資料，因此需要樣本。
:::
