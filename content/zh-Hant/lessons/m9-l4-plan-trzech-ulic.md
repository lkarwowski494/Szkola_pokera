---
id: m9.l4
module: m9
order: 4
title: "三條街的計畫"
sub: "一手牌能撐幾條街的價值"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。你在{{t:dry|乾燥}}的翻牌擊中暗三條。這手牌能撐幾條街的{{t:value|價值}}？"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "三條街", correct: true, why: "{{t:dry|乾燥}}翻牌上的暗三條幾乎總是最好的牌。每一條{{t:street|街}}，對手較差的牌（例如 K、7、{{t:pair}}）都還可能付錢，所以你計畫在翻牌、轉牌和河牌都{{t:bet}}。" }
      - { text: "一條街", why: "太少了：牌這麼強，只{{t:bet}}一次會把大部分價值留在{{t:board|牌桌上}}。拿著 K 的對手會付錢不只一次。" }
      - { text: "零條：我{{t:check|過牌}}，以免嚇跑對手", why: "每條{{t:street|街}}都{{t:check|過牌}}無法做大{{t:pot|底池}}。暗三條希望{{t:pot}}變大，因為它通常會在攤牌時獲勝。" }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}，{{t:spr}}約 {{n:spr.srp}}。你有{{t:top-pair|頂對}}配最好的踢腳。該怎麼計畫？"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "通常兩條街的{{t:value|價值}}，不打算為整個籌碼而戰", correct: true, why: "沒錯：較差的 K 和 8 通常會付一到兩次{{t:bet|下注}}。當{{t:pot|底池}}裡的錢變得非常多，付錢的主要是比一{{t:pair|對}}更強的牌。{{t:spr}}約 {{n:spr.srp}} 時，只有{{t:bet|下注}}大於{{t:pot}}，整個籌碼才會投入。" }
      - { text: "三條{{t:street|街}}都大額{{t:bet|下注}}直到全下", why: "{{t:spr}}約 {{n:spr.srp}} 時，這代表每條{{t:street|街}}都要{{t:bet|下注}}約 {{n:geo.srp.3}} 個{{t:pot|底池}}。到了河牌，留在{{t:pot|底池}}裡的主要是{{t:two-pair}}和暗三條，它們都贏一{{t:pair|對}}。" }
      - { text: "一條{{t:street}}或零條", why: "太謹慎了：{{t:dry|乾燥}}翻牌上配最好踢腳的{{t:top-pair}}能贏對手很多手牌。通常能撐兩條街的{{t:value|價值}}。" }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。你有中間{{t:pair|對子}}。這手牌能撐幾條街的{{t:value|價值}}？"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "一條或零條：常常只要打到攤牌就夠了", correct: true, why: "沒錯：中間{{t:pair}}能贏{{t:bluff|詐唬}}和較弱的{{t:pair|對子}}，但會付好幾次{{t:bet|下注}}的較差牌不多。計畫：最多一次小額{{t:bet}}，或{{t:check}}後{{t:call|跟注}}。" }
      - { text: "兩條，像{{t:top-pair}}一樣", why: "中間{{t:pair}}輸給每一手 K。第二次{{t:bet|下注}}之後，付錢的主要是贏它的牌。" }
      - { text: "三條，免得對手追到", why: "用中間{{t:pair|對子}}下三次{{t:bet|注}}，付錢的主要是更好的牌：較差的牌在第一或第二次{{t:bet|下注}}後就{{t:fold|棄牌}}了。" }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "4-bet 後的{{t:pot|底池}}，{{t:spr}}約 {{n:spr.4bet}}。你有{{t:top-pair|頂對}}配最好的踢腳。這手牌能撐兩條街的{{t:value|價值}}。該怎麼計畫？"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "兩次各約 {{n:geo.4bet.2}} {{t:pot|底池}}的{{t:bet|下注}}：轉牌時整個籌碼投入", correct: true, why: "沒錯：{{t:spr}}約 {{n:spr.4bet}} 時，兩條{{t:street|街}}就足以投入整個籌碼。在這裡，{{t:top-pair|頂對}}的兩條街{{t:value|價值}}就等於為整個籌碼而戰。" }
      - { text: "小額{{t:bet}}，面對全下就{{t:fold}}", why: "{{t:spr}}約 {{n:spr.4bet}} 時，拿帶 A 的{{t:top-pair|頂對}}面對全下{{t:fold}}會放棄太多：你只需要約 {{n:eq.jam.4bet}} 的勝率，自己{{t:bet|下注}}之後需要的更少。" }
      - { text: "每條{{t:street|街}}都{{t:check|過牌}}，以控制{{t:pot|底池}}", why: "控制{{t:pot|底池}}在{{t:spr}}高時才有意義。這裡{{t:pot}}相對於籌碼已經很大，而較差的牌（AQ、QQ、JJ）很樂意投入剩下的籌碼。" }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "3-bet {{t:pot|底池}}，你有{{t:position|位置}}，{{t:spr}}約 {{n:spr.3bet-ip}}。你有暗三條，想在河牌前投入整個籌碼。該走哪條路線？"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "翻牌、轉牌、河牌都{{t:bet|下注}}，每次約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}", correct: true, why: "沒錯：{{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}} 和 {{n:geo.3bet-ip.river}} 加起來是 {{n:geo.3bet-ip.total}}，也就是整個籌碼。對手每條{{t:street|街}}都付出{{t:pot|底池}}中合理的一部分。" }
      - { text: "每條{{t:street|街}}都{{t:bet|下注}} 1/3 {{t:pot|底池}}", sizeError: true, why: "路線對，尺寸錯：三次各 1/3 {{t:pot|底池}}的{{t:bet|下注}}只投入 {{n:spr.3bet-ip.stack}} 中的約 {{n:g3b.third.total}}。全籌碼計畫需要約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}。" }
      - { text: "翻牌和轉牌{{t:check|過牌}}，河牌全下", why: "河牌全下整個籌碼，會是比{{t:pot}}大好幾倍的{{t:bet|下注}}。對手只會用非常強的牌付錢，而本來會付三次較小{{t:bet|下注}}的較差牌會{{t:fold|棄牌}}。" }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "為什麼三條{{t:street|街}}的計畫最好在翻牌就定好？"
    options:
      - { text: "因為翻牌的尺寸決定之後能投入多少", correct: true, why: "沒錯：{{t:pot}}是以乘法成長的。翻牌小額{{t:bet}}會讓轉牌和河牌的{{t:pot|底池}}很小，之後不靠非常大的{{t:bet|下注}}就很難投入整個籌碼。" }
      - { text: "因為之後不能改變計畫", why: "情況改變時（例如轉牌出現危險牌）你就會改變計畫。重點是讓第一次{{t:bet}}符合目標：要幾條街的{{t:value|價值}}，以及是否打整個籌碼。" }
      - { text: "因為對手看得到你的計畫", why: "對手不知道你的計畫。計畫是幫助你選擇尺寸，讓最後{{t:pot|底池}}裡的金額剛好是這手牌能承受的。" }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "單次加注的{{t:pot|底池}}，{{t:spr}}約 {{n:spr.srp}}。你有{{t:top-pair|頂對}}配好的踢腳。你會用約 {{n:geo.srp.3}} {{t:pot|底池}}的幾何尺寸下注嗎？"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "不會：那是打整個籌碼的尺寸，而這手牌通常能撐兩條{{t:street|街}}", correct: true, why: "沒錯：幾何尺寸是用來投入整個籌碼的。{{t:bet|下注}}大於{{t:pot}}時，較差的牌就不再付錢，留下的是比一{{t:pair|對}}更強的牌。" }
      - { text: "會：我總是用幾何尺寸下注", why: "幾何尺寸適合全籌碼計畫。{{t:spr}}約 {{n:spr.srp}} 時，{{t:top-pair|頂對}}通常沒有這種計畫。" }
      - { text: "不會：有{{t:top-pair|頂對}}我總是{{t:check|過牌}}", why: "{{t:top-pair|頂對}}想要{{t:bet|下注}}拿價值，只是尺寸較小，通常是兩條{{t:street|街}}，而不是打整個籌碼。" }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}：{{t:pot|底池}}有 {{n:ex.pot}}，雙方籌碼各 {{n:commit.stack}}。你在翻牌和轉牌各下注約 {{n:geo.spr2.2}} {{t:pot|底池}}，對手{{t:call|跟注}}。剩下的籌碼呢？"
    options:
      - { text: "轉牌之後，整個籌碼都在{{t:pot|底池}}裡", correct: true, why: "沒錯：翻牌 {{n:geo.spr2.flop}} 加轉牌 {{n:geo.spr2.turn}}，合計 {{n:geo.spr2.total}}。所以{{t:spr}}為 {{n:spr.commit}} 時，{{t:top-pair|頂對}}的兩條街{{t:value|價值}}就足以打整個籌碼。" }
      - { text: "大約剩一半留到河牌", why: "{{t:pot|底池}}以乘法成長：翻牌後裡面約有 {{n:geo.spr2.flop-after}}，轉牌約 {{n:geo.spr2.2}} 的{{t:bet}}就是約 {{n:geo.spr2.turn}}，也就是剩下的籌碼。" }
      - { text: "幾乎整個籌碼都還在", why: "{{t:spr}}為 {{n:spr.commit}} 時，籌碼只有 {{n:spr.commit}} 個{{t:pot|底池}}。兩次各約 {{n:geo.spr2.2}} {{t:pot|底池}}的{{t:bet|下注}}就投入了全部 {{n:geo.spr2.total}}。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
好的計畫從翻牌開始，在你{{t:bet|下出}}第一筆{{t:bet|注}}之前。問問自己：我的手牌能撐幾條街的{{t:value|價值}}？我想為整個籌碼而戰嗎？答案取決於手牌強度和{{t:spr}}。

## 幾條街的{{t:value|價值}}

每過一條{{t:street|街}}，對手較差的牌就會{{t:fold|棄牌}}，留在{{t:pot|底池}}裡的主要是比你強的牌。所以越強的牌能承受越多次{{t:bet|下注}}：

| 手牌 | {{t:value|價值}}街數（通常） |
|---|---|
| 非常強：暗三條、{{t:straight}}、大的{{t:two-pair}} | 三條 |
| 配好踢腳的{{t:top-pair|頂對}}、{{t:overpair}} | 兩條；對手會用較弱的牌付錢時，可打第三條 |
| 較弱的{{t:pair}}（中對、小對） | 一條或零條 |

表中的{{t:street|街}}數只是簡化：很多取決於{{t:board|公共牌}}的{{t:texture|牌面結構}}、轉牌和河牌，以及對手。

## 把手牌和{{t:spr}}結合起來

- **能撐三條{{t:street|街}}的牌，{{t:spr}}區間允許打整個籌碼，而且你想打整個籌碼：** 從翻牌開始用幾何尺寸下注（{{t:in-position}}的 3-bet {{t:pot|底池}}中約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}）。
- **能撐兩條{{t:street|街}}的牌，{{t:spr}}低：** {{t:spr}}約 {{n:spr.commit}} 時，兩次各約 {{n:geo.spr2.2}} {{t:pot|底池}}的{{t:bet|下注}}就已經是整個籌碼，所以你是在打整個籌碼。
- **能撐兩條{{t:street|街}}的牌，{{t:spr}}高：** 在單次加注的{{t:pot|底池}}中（{{t:spr}}約 {{n:spr.srp}}），你下注拿價值，但不打算投入整個籌碼。

三條街的{{t:value|價值}}不等於為整個籌碼而戰。大的{{t:two-pair}}能撐三條{{t:street|街}}，但在單次加注的{{t:pot|底池}}中（{{t:spr}}約 {{n:spr.srp}}，高於 {{n:spr.zone.deep}}）通常不會打整個籌碼：在這個區間，打整個籌碼的是暗三條、{{t:straight}}和更強的牌（{{t:spr}}區間見第一課）。

## 路線

路線就是接下來各條{{t:street|街}}的行動計畫。幾條基本路線：

- **{{t:bet}}、{{t:bet}}、{{t:bet}}：** 能撐三條街{{t:value|價值}}的牌，
- **{{t:bet}}、{{t:bet}}、{{t:check}}：** 能撐兩條{{t:street|街}}的牌，河牌打到攤牌，
- **{{t:bet}}或{{t:check}}，之後{{t:check}}並{{t:call|跟注}}：** 想便宜打到攤牌的較弱{{t:pair}}。

## 翻牌的尺寸決定後續

{{t:pot|底池}}以乘法成長，所以翻牌小額{{t:bet}}會讓後面幾條{{t:street|街}}的{{t:pot|底池}}都很小。在 3-bet {{t:pot|底池}}中，三次各 1/3 {{t:pot|底池}}的{{t:bet|下注}}只從 {{n:spr.3bet-ip.stack}} 的籌碼中投入約 {{n:g3b.third.total}}，而三次各約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}的{{t:bet|下注}}則投入整個籌碼。

:::note 計畫不是定案
到了轉牌和河牌，你要重新檢視計畫：危險的牌可能減少{{t:value|價值}}街數。轉牌和河牌怎麼打，請見 M7 和 M8 模組。各類手牌的{{t:value|價值}}街數是經驗法則，綜合自數份訓練教材：在單次加注的{{t:pot|底池}}中，{{t:spr}}太高，許多{{t:top-pair|頂對}}很難順利拿到三條街的{{t:value|價值}}。
:::
