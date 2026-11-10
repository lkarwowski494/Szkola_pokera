---
id: m9.l3
module: m9
order: 3
title: "幾何下注尺寸"
sub: "每條街都下底池的同一比例，直到全下"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "{{t:pot|底池}}裡有 {{n:ex.pot}}。你下注整個{{t:pot|底池}}（{{n:ex.bet.pot}}），對手{{t:call|跟注}}。現在{{t:pot|底池}}裡有多少？請輸入數字。"
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}。一次{{t:pot|底池}}大小的{{t:bet|下注}}加上{{t:call}}，會讓{{t:pot|底池}}乘以三。一般來說：{{t:pot|底池}} f 比例的{{t:bet}}加上{{t:call}}，會讓{{t:pot|底池}}乘以 (1 + 2f)。"
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "{{t:pot|底池}}裡有 {{n:ex.pot}}。你在翻牌、轉牌和河牌都下注整個{{t:pot|底池}}（{{n:ex.bet.pot}}，接著 {{n:geo.ex.turn}}，再來 {{n:geo.ex.river}}），對手每次都{{t:call|跟注}}。你們每人總共投入多少？請輸入數字。"
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}。{{t:pot|底池}}從 {{n:ex.pot}} 成長到 {{n:ex.pot.after-pot-call}}、{{n:geo.ex.turn-after}} 和 {{n:geo.ex.river-after}}。因此三次{{t:pot|底池}}大小的{{t:bet|下注}}，會在 {{t:spr}} 為 {{n:spr.zone.deep}} 時全下。"
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "在 {{t:spr}} 為多少時，三次半個{{t:pot|底池}}的{{t:bet|下注}}（翻牌、轉牌、河牌，每次都被跟注）剛好投入整個籌碼？"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|底池}} {{n:ex.pot}}：{{t:bet|下注}} {{n:ex.bet.half}}、{{n:geo.half.turn}} 和 {{n:geo.half.river}}，合計 {{n:geo.half.total}}，也就是籌碼 {{n:geo.half.stack}}。用公式算：(1 + 2·{{n:ex.frac.half}}) 的三次方 = 1 + 2·{{n:geo.half.spr}}。" }
      - { text: "{{n:spr.zone.deep}}", why: "在 {{t:spr}} {{n:spr.zone.deep}} 時，每條{{t:street|街}}都得下注整個{{t:pot|底池}}。這時半個{{t:pot|底池}}的{{t:bet|下注}}只會投入 {{n:geo.ex.stack}} 中的 {{n:geo.half.total}}。" }
      - { text: "{{n:spr.commit}}", why: "在 {{t:spr}} {{n:spr.commit}} 時，三次半個{{t:pot|底池}}的{{t:bet|下注}}太多了：還沒{{t:bet|下注}}滿半個{{t:pot|底池}}，籌碼就在河牌用完了。符合的是 {{t:spr}} {{n:geo.half.spr}}。" }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "單次加注{{t:pot|底池}}：翻牌時有 {{n:bb.pot-after.vs-btn}}，你們每人後手 {{n:spr.srp.stack}}。你在翻牌、轉牌和河牌都下注半個{{t:pot|底池}}，對手每次都{{t:call|跟注}}。你總共會投入多少？"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}。大部分籌碼仍留在{{t:pot|底池}}外：在 {{t:spr}} 約 {{n:spr.srp}} 時，半個{{t:pot|底池}}太小，不足以打到整個籌碼。" }
      - { text: "{{n:spr.srp.stack}}，也就是整個籌碼", why: "{{t:pot|底池}}只會成長到 {{n:srp.half.flop-after}}、{{n:srp.half.turn-after}}，依此類推。三次半個{{t:pot|底池}}的{{t:bet|下注}}合計投入 {{n:srp.half.total}}，離整個籌碼還很遠。" }
      - { text: "{{n:srp.potbet.total}}", why: "這是三次整個{{t:pot|底池}}大小的{{t:bet|下注}}會投入的金額（{{n:srp.potbet.flop}}、{{n:srp.potbet.turn}}、{{n:srp.potbet.river}}）。半個{{t:pot|底池}}的{{t:bet|下注}}只投入 {{n:srp.half.total}}。" }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "單次加注{{t:pot|底池}}，{{t:spr}} 約 {{n:spr.srp}}。在翻牌、轉牌和河牌使用多大的固定{{t:bet|下注}}尺寸，才能投入整個籌碼？"
    options:
      - { text: "約 {{n:geo.srp.3}} {{t:pot|底池}}，比整個{{t:pot}}還多", correct: true, why: "對：即使三次{{t:pot|底池}}大小的{{t:bet|下注}}，也只投入籌碼 {{n:spr.srp.stack}} 中的 {{n:srp.potbet.total}}。每條{{t:street|街}}要下約 {{n:geo.srp.3}} {{t:pot|底池}}，整個籌碼才會投入。" }
      - { text: "約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}", why: "這在 3-bet {{t:pot|底池}}就夠了（{{t:spr}} 約 {{n:spr.3bet-ip}}）。在單次加注{{t:pot|底池}}中，{{t:spr}} 約 {{n:spr.srp}}，所以{{t:bet|下注}}必須比{{t:pot}}更大。" }
      - { text: "約 {{n:cbet.size.small}} {{t:pot|底池}}", why: "三次這樣的{{t:bet|下注}}只會投入一小部分籌碼。在 {{t:spr}} 約 {{n:spr.srp}} 時，每條{{t:street|街}}需要約 {{n:geo.srp.3}} {{t:pot|底池}}。" }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "3-bet {{t:pot|底池}}，你有{{t:position|位置}}，{{t:spr}} 約 {{n:spr.3bet-ip}}。你拿到非常強的牌，想用相同的{{t:bet|下注}}到河牌為止投入整個籌碼。翻牌你下注多少？"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}（{{n:geo.3bet-ip.flop}}）", correct: true, why: "對：(1 + 2f) 的三次方 = 1 + 2·{{n:spr.3bet-ip}}，得出 f ≈ {{n:geo.3bet-ip.3}}。{{t:bet|下注}} {{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}} 和 {{n:geo.3bet-ip.river}}，合計 {{n:geo.3bet-ip.total}}，也就是整個籌碼。" }
      - { text: "{{n:cbet.size.small}} {{t:pot|底池}}（{{n:g3b.third.flop}}）", sizeError: true, why: "行動對了，尺寸錯了：三次 1/3 {{t:pot|底池}}的{{t:bet|下注}}只會投入 {{n:spr.3bet-ip.stack}} 中約 {{n:g3b.third.total}}。要達成「到河牌為止投入整個籌碼」的計畫，需要約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}。" }
      - { text: "{{t:check|過牌}}，到河牌再全下", why: "河牌時把 {{n:spr.3bet-ip.stack}} 全下到 {{n:vs3bet.pot-after}} 的{{t:pot|底池}}裡，是比{{t:pot}}大好幾倍的{{t:bet}}：對手只會用非常強的牌付錢。三條{{t:street|街}}都用相同的{{t:bet|下注}}，讓他有機會一點一點把錢投入。" }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "你從{{t:big-blind|大盲}} 3-bet 後的{{t:pot|底池}}，{{t:spr}} 約 {{n:spr.3bet-oop}}。你想用相同的{{t:bet|下注}}到河牌為止投入整個籌碼。每條{{t:street|街}}要下{{t:pot|底池}}的多少比例？"
    table: { position: BB }
    options:
      - { text: "約 {{n:geo.3bet-oop.3}} {{t:pot|底池}}", correct: true, why: "對：在 {{t:spr}} 約 {{n:spr.3bet-oop}} 時，(1 + 2f) 的三次方 = 1 + 2·{{n:spr.3bet-oop}}，所以 f ≈ {{n:geo.3bet-oop.3}}。{{t:spr}} 比{{t:in-position}} 3-bet 後低，所以尺寸也較小。" }
      - { text: "約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}", sizeError: true, why: "接近，但這是 {{t:spr}} 約 {{n:spr.3bet-ip}} 時的尺寸。在 {{t:spr}} 約 {{n:spr.3bet-oop}} 時，約 {{n:geo.3bet-oop.3}} {{t:pot|底池}}就夠了；{{t:bet|下注}}更大的話，到河牌會不夠籌碼下完整的{{t:bet}}。" }
      - { text: "約 {{n:geo.4bet.3}} {{t:pot|底池}}", sizeError: true, why: "這在 4-bet 後就夠了（{{t:spr}} 約 {{n:spr.4bet}}）。在 {{t:spr}} 約 {{n:spr.3bet-oop}} 時，三次這樣的{{t:bet|下注}}會留下相當一部分籌碼。" }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "4-bet 後的{{t:pot|底池}}，{{t:spr}} 約 {{n:spr.4bet}}。你想用兩次{{t:bet|下注}}投入整個籌碼：翻牌一次、轉牌一次。翻牌你下注多少？"
    options:
      - { text: "約 {{n:geo.4bet.2}} {{t:pot|底池}}", correct: true, why: "對：兩條{{t:street|街}}時，(1 + 2f) 的平方 = 1 + 2·{{n:spr.4bet}}，所以 f ≈ {{n:geo.4bet.2}}。{{t:bet|下注}}並被{{t:call|跟注}}後，剩下的籌碼正好等於轉牌同樣比例的{{t:bet}}。" }
      - { text: "約 {{n:geo.4bet.3}} {{t:pot|底池}}", sizeError: true, why: "這是三條{{t:street|街}}的尺寸。用兩次各 {{n:geo.4bet.3}} {{t:pot|底池}}的{{t:bet|下注}}，會有部分籌碼留到河牌。" }
      - { text: "直接全下（{{n:spr.4bet.stack}}）", why: "這是一條{{t:street|街}}的計畫，不是兩條。直接下約 {{n:spr.4bet}} 個{{t:pot|底池}}的{{t:bet|下注}}，只給對手一個決定：{{t:call|跟注}}全部，或{{t:fold|棄牌}}。" }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "幾何下注尺寸是什麼意思？"
    options:
      - { text: "每條{{t:street|街}}都下{{t:pot|底池}}的同一比例，讓最後一次{{t:bet}}剛好是全下", correct: true, why: "對：每條{{t:street|街}}上，f 的{{t:bet}}加上{{t:call}}會讓{{t:pot|底池}}乘以 (1 + 2f)。你選擇的尺寸，要讓最後一次{{t:bet|下注}}後，整個籌碼都進入{{t:pot|底池}}。" }
      - { text: "永遠下整個{{t:pot|底池}}大小的{{t:bet}}", why: "整個{{t:pot}}只有在某一個 {{t:spr}} 下才是幾何尺寸（例如三條{{t:street|街}}時的 {{n:spr.zone.deep}}）。在 {{t:spr}} 約 {{n:spr.3bet-ip}} 時，約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}就夠了。" }
      - { text: "{{t:bet|下注}}比例越來越大：翻牌小、河牌大", why: "金額會變大是因為{{t:pot}}變大，但每條{{t:street|街}}下的{{t:pot|底池}}比例都一樣。在 3-bet {{t:pot|底池}}中是 {{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}} 和 {{n:geo.3bet-ip.river}}，每次都約 {{n:geo.3bet-ip.3}} {{t:pot|底池}}。" }
---
在翻牌{{t:bet|下注}}之前，最好先知道到河牌為止能投入多少錢。{{t:bet|下注}}和{{t:call}}不是讓{{t:pot|底池}}增加固定金額，而是讓它倍數成長。

## {{t:pot}}怎麼成長

{{t:pot|底池}} f 比例的{{t:bet|下注}}加上{{t:call}}，會讓{{t:pot|底池}}乘以 (1 + 2f)。如果{{t:bet|下注}}整個{{t:pot|底池}}，{{t:pot}}會變成三倍：

| {{t:street|街}} | {{t:bet|下注}}前的{{t:pot|底池}} | {{t:bet|下注}}（整個{{t:pot}}） | {{t:call|跟注}}後的{{t:pot|底池}} |
|---|---|---|---|
| 翻牌 | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| 轉牌 | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| 河牌 | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

每位玩家投入了 {{n:geo.ex.total}}，也就是 {{n:spr.zone.deep}} 個{{t:pot|底池}}。因此三次{{t:pot|底池}}大小的{{t:bet|下注}}，正好在 {{t:spr}} 為 {{n:spr.zone.deep}} 時全下。第一課中最高 {{t:spr}} 區間的門檻就是這樣來的。

## 公式

幾何下注尺寸，就是每條{{t:street|街}}都下{{t:pot|底池}}的同一比例 f，並讓最後一次{{t:bet}}剛好是全下。打 n 條{{t:street|街}}時：

```formula
(1 + 2f)^n = 1 + 2·SPR
```

例子：在 {{t:spr}} {{n:geo.half.spr}} 時，三次半個{{t:pot|底池}}的{{t:bet|下注}}會投入整個籌碼：{{n:ex.bet.half}}、{{n:geo.half.turn}} 和 {{n:geo.half.river}}，在{{t:pot|底池}}為 {{n:ex.pot}} 時合計 {{n:geo.half.total}}。

## 常見{{t:pot|底池}}的尺寸

| {{t:pot|底池}} | {{t:spr}} | 三條{{t:street|街}} | 兩條{{t:street|街}} |
|---|---|---|---|
| {{t:open|開池}}後{{t:call}} | {{n:spr.srp}} | {{n:geo.srp.3}} {{t:pot|底池}} | – |
| {{t:in-position}} 3-bet | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} {{t:pot|底池}} | – |
| 從{{t:big-blind|大盲}} 3-bet | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} {{t:pot|底池}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} {{t:pot|底池}} | {{n:geo.4bet.2}} {{t:pot|底池}} |

在{{t:in-position}}的 3-bet {{t:pot|底池}}中，這代表{{t:bet|下注}} {{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}} 和 {{n:geo.3bet-ip.river}}，合計 {{n:geo.3bet-ip.total}}，也就是整個籌碼。

## 單次加注{{t:pot|底池}}很深

在 {{t:spr}} 約 {{n:spr.srp}} 時，三次半個{{t:pot|底池}}的{{t:bet|下注}}只投入 {{n:srp.half.total}}，而三次{{t:pot|底池}}大小的{{t:bet|下注}}也只投入籌碼 {{n:spr.srp.stack}} 中的 {{n:srp.potbet.total}}。只有{{t:bet|下注}}比{{t:pot}}更大時，整個籌碼才會投入。所以在這種{{t:pot|底池}}裡，打到整個籌碼主要發生在非常強的牌上。

:::note 什麼時候用得上
當你想到河牌為止投入整個籌碼時，也就是拿到非常強的牌時，幾何下注尺寸就派得上用場。不是每手牌都想打到整個籌碼：一手牌能承受幾條街的{{t:value|價值}}下注，是下一課的主題。這個公式純粹是數學。前面的模組提供了依翻牌{{t:texture|牌面結構}}調整的尺寸；幾何下注尺寸則是整個籌碼計畫的參考點。
:::
