---
id: m7.l3
module: m7
order: 3
title: "聽牌與隱含賠率"
sub: "之後還得贏多少"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "翻牌時，你到河牌前約有 {{n:odds.flush.flop-river}} 的機會做成{{t:flush}}。轉牌沒幫上忙。現在機率是多少？"
    options:
      - { text: "約 {{n:odds.flush.turn-river}}", correct: true, why: "對：只剩一張牌。{{n:cards.unseen.turn}} 張未知牌中有 {{n:outs.flush}} 張補牌，也就是 {{n:odds.flush.turn-river}}，大約是翻牌時機率的一半。" }
      - { text: "仍約 {{n:odds.flush.flop-river}}，因為補牌數一樣", why: "補牌數一樣，但待發的牌變少了。{{n:odds.flush.flop-river}} 算的是兩張牌，而到了轉牌只剩一張。" }
      - { text: "沒有計算機就算不出來", why: "算得出來：用 M2 的 2 與 4 法則。剩一張牌，所以補牌 × 2：約 {{n:odds.flush.rule-turn}}。精確值是 {{n:odds.flush.turn-river}}。" }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "轉牌。你做成{{t:flush|同花}}或{{t:straight|順子}}的補牌有幾張？請輸入數字。"
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "{{t:flush|同花}}有 {{n:outs.flush}} 張紅心，{{t:straight|順子}}則是每張 Q 和每張 7，共 {{n:outs.oesd}} 張。紅心 Q 和紅心 7 已經算在同花裡，所以要減去 {{n:draw.combo.overlap}}：{{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}。"
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:bet|下注}} {{n:ex.bet.three-quarters}}。你怎麼做？"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "你有 {{n:outs.combo}} 張補牌，也就是河牌約有 {{n:odds.combo.turn-river}}。你需要 {{n:eq.bet-three-quarters}}，所以即使不算隱含賠率，{{t:call}}也有利可圖。" }
      - { text: "{{t:fold|棄牌}}，因為轉牌的{{t:draw}}不夠", why: "在這個價格下，單純的{{t:draw}}確實該{{t:fold|棄牌}}，但{{t:flush}}加上{{t:straight|順子}}約有 {{n:odds.combo.turn-river}}，高於所需的 {{n:eq.bet-three-quarters}}。" }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.third.pot}}，對手{{t:bet|下注}} {{n:io.flush.bet}}。你有{{t:flush-draw}}：{{n:cards.unseen.turn}} 張牌中有 {{n:outs.flush}} 張補牌。擊中時，你在河牌還得額外贏多少{{t:chips|籌碼}}，{{t:call}}才能打平？請輸入數字。"
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "你需要 {{n:io.flush.eq}} 權益，而你約有 {{n:odds.flush.turn-river}}。在 {{n:cards.unseen.turn}} 種可能的河牌中，你擊中 {{n:outs.flush}} 次、落空 {{n:miss.flush.turn}} 次，每次落空都損失 {{n:io.flush.bet}}。所以每次擊中都必須帶來 {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}。{{t:pot|底池}}裡有 {{n:io.flush.pot-after-bet}}，還差 {{n:io.flush.extra}}。"
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:io.oesd.pot}}，對手{{t:bet|下注}} {{n:io.oesd.bet}}。你有{{t:oesd}}：{{n:outs.oesd}} 張補牌，{{n:miss.oesd.turn}} 張落空牌。擊中時，你在河牌還得額外贏多少？"
    options:
      - { text: "約 {{n:io.oesd.extra}}", correct: true, why: "每次擊中都必須帶來 {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}。{{t:pot|底池}}裡有 {{n:io.oesd.pot-after-bet}}，所以還差 {{n:io.oesd.extra}}。" }
      - { text: "約 {{n:io.oesd.need}}", why: "這是你每次擊中總共要贏的數目。其中一部分已經在{{t:pot|底池}}裡（{{n:io.oesd.pot-after-bet}}），所以額外還差 {{n:io.oesd.extra}}。" }
      - { text: "不用，價格已經夠了", why: "你需要 {{n:eq.bet-half}} 權益，而你約有 {{n:odds.oesd.turn-river}}。光靠{{t:pot}}不夠，還差 {{n:io.oesd.extra}}。" }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.third.pot}}，對手{{t:bet|下注}} {{n:io.flush.bet}}。你們每人後手都還有 {{n:io.flush.stack}}，而且對手拿著{{t:pair|一對}} A 很樂意付錢。你怎麼做？"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "光看價格不夠（{{n:io.flush.eq}} 對上約 {{n:odds.flush.turn-river}}），但擊中後只要再多贏 {{n:io.flush.extra}} 就夠了。你的{{t:draw}}聽的是最大的{{t:flush|同花}}（紅心 A 在{{t:board|公共牌}}上，所以 K 高的{{t:flush}}最大），對手後手{{t:chips|籌碼}}很多，而拿{{t:pair|一對}} A 的玩家常會在河牌付這樣的下注。你擊中會很明顯（第三張紅心），但拿{{t:pair|一對}} A 的對手往往還是會付；因此這裡的隱含賠率比擊中不明顯時小。" }
      - { text: "{{t:fold|棄牌}}，因為 {{n:odds.flush.turn-river}} 小於 {{n:io.flush.eq}}", why: "底池賠率說「{{t:fold}}」，但你忽略了隱含賠率。只差 {{n:io.flush.extra}}，而對手後手有 {{n:io.flush.stack}}，手上也是會付錢的牌。" }
      - { text: "{{t:raise|加注}}全下", why: "拿{{t:pair|一對}} A 的對手多半會{{t:call|跟注}}，那時你只有約 {{n:odds.flush.turn-river}}。不如便宜看河牌，擊中時贏更多。" }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:bet|下注}} {{n:ex.bet.half}}。你有卡順聽牌。擊中後你還得再贏 {{n:io.gut.extra}}，但對手後手只剩 {{n:io.gut.stack}}。你怎麼做？"
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "卡順約有 {{n:odds.gutshot.turn-river}}，而你需要 {{n:eq.bet-half}}。隱含賠率幫不上忙：就算對手把 {{n:io.gut.stack}} 全部投入，也補不上差的 {{n:io.gut.extra}}。" }
      - { text: "{{t:call|跟注}}，因為有隱含賠率", why: "隱含賠率是對手之後還能付給你的{{t:chips}}。他只有 {{n:io.gut.stack}}，而你需要 {{n:io.gut.extra}}。" }
      - { text: "{{t:raise|加注}}全下", why: "只有 {{n:outs.gutshot}} 張補牌就全下{{t:bluff|詐唬}}，是把一切都押上。籌碼這麼短還{{t:bet|下注}}半個{{t:pot|底池}}的對手，往往已經不會{{t:fold|棄牌}}。" }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.pot}}，謹慎的對手{{t:bet|下注}}滿{{t:pot|底池}}：{{n:ex.bet.pot}}。你怎麼做？"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你需要 {{n:eq.bet-pot}}，而你約有 {{n:odds.flush.turn-river}}。而且你的{{t:flush}}很小：來紅心時，拿紅心 Q 或紅心 J 的對手有更大的{{t:flush}}，這時你會輸得最多（反向隱含賠率）。" }
      - { text: "{{t:call|跟注}}，因為有隱含賠率", why: "這裡的隱含賠率很差：做成的{{t:flush}}可能輸給更大的同花，而{{t:board|公共牌}}上的第三張紅心誰都看得到。差距也很大：價格是 {{n:eq.bet-pot}}。" }
      - { text: "{{t:raise|加注}}", why: "在有 A 和 K 的{{t:board|公共牌}}上{{t:bet|下注}}滿{{t:pot|底池}}的謹慎對手，很少會{{t:fold|棄牌}}。你拿一手即使擊中也可能輸的牌，冒了很大的風險。" }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "隱含賠率什麼時候最大？"
    options:
      - { text: "當你的{{t:draw}}聽的是最大的牌，而對手有強牌且後手{{t:chips|籌碼}}很多", correct: true, why: "對：這樣你擊中就能贏，而對手既有籌碼、也有牌可以付你。" }
      - { text: "當對手{{t:chips|籌碼}}很少（{{t:spr}}低）", why: "正好相反：{{t:spr}}低時，對手已經沒什麼可以再付，所以隱含賠率很小。" }
      - { text: "當你的{{t:draw}}聽的是小{{t:flush|同花}}", why: "這是反向隱含賠率：有時你擊中了仍然會輸，而且是在大{{t:pot|底池}}裡輸。" }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "轉牌開始時{{t:pot|底池}}有 {{n:ex.pot}}，你們兩人中較小的籌碼量是 {{n:spr.stack.high}}。{{t:spr}}是多少？"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = 籌碼量 ÷ {{t:pot}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}。對手後面還有好幾個{{t:pot|底池}}，所以隱含賠率可能很大。" }
      - { text: "{{n:spr.low}}", why: "籌碼量是 {{n:spr.stack.low}} 時才會是這個數。這裡的籌碼量是 {{n:spr.stack.high}}。" }
      - { text: "{{n:ex.pot}}", why: "這是{{t:pot}}。{{t:spr}}是比值：籌碼量除以{{t:pot|底池}}。" }
---
到了轉牌，只剩一張牌要發。{{t:draw|聽牌}}的機率大約降一半，而看下一張牌的價格通常會上升。所以在轉牌你要算得更精確，並問一個新問題：如果擊中，之後我能贏多少？

## 只剩一張牌

| {{t:draw|聽牌}} | 補牌 | 翻牌 → 河牌 | 轉牌 → 河牌 |
|---|---|---|---|
| {{t:flush|同花}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| 兩頭{{t:straight|順子}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| 卡順 | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|同花}} + 兩頭{{t:straight}} | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

用 M2 的 2 與 4 法則，把補牌數乘以 2。兩個{{t:draw|聽牌}}有共用的牌時，那些牌只算一次。

## 隱含賠率

隱含賠率（implied odds）是你擊中時能在河牌贏到的{{t:chips}}。範例：{{t:pot|底池}}有 {{n:ex.third.pot}}，對手{{t:bet|下注}} {{n:io.flush.bet}}，你有{{t:flush-draw}}。你需要 {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} 權益，而你約有 {{n:odds.flush.turn-river}}。光靠{{t:pot}}不夠。

在 {{n:cards.unseen.turn}} 種可能的河牌中，你擊中 {{n:outs.flush}} 次、落空 {{n:miss.flush.turn}} 次。要打平，每次擊中帶來的必須和落空的代價一樣多：

```formula
所需贏額 = 跟注金額 × (落空牌數 ÷ 補牌數)
```

這裡：{{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**。{{t:pot|底池}}裡有 {{n:io.flush.pot-after-bet}}，所以你在河牌平均還要再拿到 **{{n:io.flush.extra}}**。

## {{t:spr}}：對手後手有多少{{t:chips|籌碼}}

{{t:spr}}（籌碼與{{t:pot|底池}}比）是{{t:effective-stack}}（也就是兩人中較小的籌碼量）除以該{{t:street|街}}開始時的{{t:pot|底池}}。每條{{t:street|街}}都能算{{t:spr}}；這裡你在轉牌算。{{t:pot|底池}} {{n:ex.pot}}、籌碼量 {{n:spr.stack.high}} 時，{{t:spr}}是 {{n:spr.high}}，也就是對手後面還有好幾個{{t:pot|底池}}；籌碼量 {{n:spr.stack.low}} 時則只有 {{n:spr.low}}。隱含賠率不可能大於對手面前還剩的{{t:chips}}。{{t:spr}}低時，幾乎只有底池賠率重要。更多關於{{t:spr}}的內容，請見「手牌規劃」模組（M9），該模組依翻牌的{{t:spr}}來規劃整手牌。

## 隱含賠率何時成立

- 你的{{t:draw}}聽的是**最大的牌**（最大的{{t:flush}}，通常帶 A），
- 對手有會付錢的**強牌**，
- 對手後手有**很多{{t:chips|籌碼}}**（{{t:spr}}高），
- 你的擊中**不顯眼**（例如卡順比{{t:board|公共牌}}上的第三張紅心更不明顯）。

反向隱含賠率對你不利：當你的{{t:draw}}聽的是小{{t:flush|同花}}，或是聽{{t:straight|順子}}而{{t:board|公共牌}}上可能出現{{t:flush}}時，有時你擊中了仍然會輸，而且是在大{{t:pot|底池}}裡輸。

:::note 這些原則的來源
隱含賠率的計算是根據{{t:expected-value|期望值}}的精確計算。隱含賠率何時成立的條件，以及反向隱含賠率，則是來自教學資料的經驗法則。
:::
