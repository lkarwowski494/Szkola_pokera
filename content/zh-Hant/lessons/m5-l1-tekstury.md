---
id: m5.l1
module: m5
order: 1
title: "翻牌的牌面結構"
sub: "高低、花色、連接性"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "以下哪個翻牌是{{t:connected|連張}}翻牌，也就是現在就可能有{{t:straight|順子}}？"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "對：9、7、6 落在連續五個點數之內。例如 85 或 T8 就能組成{{t:straight|順子}}。" }
      - { text: "[[Ks 8d 3c]]", why: "不對：3 到 K 距離太遠。這裡任何兩張牌都組不成{{t:straight|順子}}。" }
      - { text: "[[Qd Qs 9h]]", why: "不對：這是{{t:paired|成對}}翻牌。手上兩張牌加上{{t:board|公共牌}}上的{{t:pair|一對}}，不可能組成{{t:straight|順子}}，因為{{t:straight|順子}}需要五個不同點數。" }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "翻牌是{{t:monotone|單色}}的：三張牌都是同一花色。這代表什麼？"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "手上有兩張該花色牌的玩家已經有{{t:flush|同花}}", correct: true, why: "對：{{t:board|公共牌}}上三張紅心加上手上兩張，就是五張同花色的牌。手上只有一張紅心的玩家則有{{t:flush-draw|同花聽牌}}。" }
      - { text: "還沒有人可能有{{t:flush|同花}}", why: "不對：{{t:flush|同花}}需要五張牌，而{{t:board|公共牌}}上已經有三張。手上有兩張就夠了。" }
      - { text: "{{t:flush|同花}}要到轉牌才有可能", why: "不對：那是{{t:two-tone|雙色}}翻牌的情況。在{{t:monotone|單色}}翻牌上，現在就可能已經有{{t:flush|同花}}。" }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "你拿到 [[Ac Kd]]，翻牌是 [[Ks 7d 2c]]。為什麼在這種翻牌上，帶好踢腳的{{t:pair|一對}}比在{{t:wet|濕潤}}翻牌上更安全？"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "因為對手沒有任何{{t:draw|聽牌}}，所以後面的牌很少改變誰領先", correct: true, why: "對：翻牌是{{t:rainbow|彩虹}}面，也不可能有{{t:straight|順子}}。現在落後的對手通常補牌很少：只有幾張牌能讓他做成{{t:three-of-a-kind|三條}}或{{t:two-pair|兩對}}；沒有{{t:pair|一對}}的話，則需要連續兩張好牌。" }
      - { text: "因為在{{t:dry|乾燥}}翻牌上對手一定會{{t:fold|棄牌}}", why: "不對：手上有 7、2 或較弱 K 的對手可能會{{t:call|跟注}}。{{t:dry|乾燥}}翻牌說明的是{{t:draw|聽牌}}的情況，而不是對手會不會{{t:fold|棄牌}}。" }
      - { text: "因為{{t:pair|一對}} K 一定能贏到河牌", why: "不對：對手現在可能已經有 set（暗三條）或{{t:two-pair|兩對}}。{{t:dry|乾燥}}翻牌只是降低有人追上你的風險。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
翻牌後，每位玩家已經看到自己七張牌中的五張。{{t:board|公共牌}}上的三張牌和玩家手牌的契合程度，稱為翻牌的{{t:texture|牌面結構}}。{{t:texture|牌面結構}}決定誰比較常擊中，以及是否值得下注。在學習持續下注（c-bet，也就是翻牌前{{t:raise|加注}}後，在翻牌圈的{{t:bet|下注}}）之前，先學會從四個面向解讀翻牌。

## 高低

看最高的那張牌。**高**翻牌的最高牌是 A、K 或 Q，例如 [[Ks 7d 2c]]。**中**翻牌的最高牌是 J 或 10，例如 [[Jh 8c 4d]]。**低**翻牌的最高牌是 9 或更小，例如 [[7s 6h 5d]]。

## 花色

**{{t:rainbow|彩虹}}**翻牌有三種不同花色：還沒有人有{{t:flush-draw|同花聽牌}}。**{{t:two-tone|雙色}}**翻牌有兩張同花色的牌，例如 [[Jh Th 8c]]：玩家手上兩張該花色的牌就構成{{t:flush-draw|同花聽牌}}。**{{t:monotone|單色}}**翻牌的三張牌都是同一花色，例如 [[Kh 8h 3h]]：{{t:flush|同花}}可能已經成形。

## 點數

**{{t:paired|成對}}**翻牌有兩張相同點數的牌，例如 [[Qd Qs 6h]]。在這種翻牌上，沒有人能用手上兩張牌組成{{t:straight|順子}}，不過有時可能出現{{t:straight-draw|順子聽牌}}（例如在 Q-Q-9 上）。

**{{t:connected|連張}}**翻牌的三個不同點數落在連續五個點數之內，所以現在就可能有{{t:straight|順子}}：例如在 [[9h 7d 6c]] 上，85 和 T8 都能組成{{t:straight|順子}}。A 也可以當 1 用，所以 [[Ah 5d 3c]] 也是{{t:connected|連張}}翻牌。

**{{t:semi-connected|半連張}}**翻牌只有兩張牌落在連續五個點數之內。還沒有人有{{t:straight|順子}}，但可能有人有{{t:straight-draw|順子聽牌}}（兩頭或卡順）：例如在 [[Kh Qd 4c]] 上，JT 就有。這種翻牌很多，因為只要兩張牌點數相近就夠了。

**{{t:disconnected|不連張}}**翻牌的牌彼此相距很遠，任何兩張都無法落在連續五個點數之內，例如 [[Ks 8d 3c]]。這裡連{{t:straight-draw|順子聽牌}}都沒有人有。這種翻牌很少。

## {{t:dry|乾燥}}還是{{t:wet|濕潤}}

我們計算{{t:wetness|濕潤度}}點數，也就是翻牌對{{t:draw|聽牌}}以及強力的同花和{{t:straight|順子}}牌型有多有利：

- 現在就有多種方式組成{{t:straight|順子}}，也就是手上至少有兩組不同的兩個點數組合能成順（在 [[9h 8d 7c]] 上，JT、T6 和 65 都可以）：{{n:tex.points.straight.made}} 分，
- 只有一種方式能組成{{t:straight|順子}}（在 [[Ah Kd Tc]] 上只有 QJ，在 [[Ah 4d 2c]] 上只有 53）：{{n:tex.points.straight.made-one}} 分，
- 只有{{t:straight-draw|順子聽牌}}（{{t:semi-connected|半連張}}翻牌，或有兩張點數相近的{{t:paired|成對}}翻牌）：{{n:tex.points.straight.draw}} 分，
- 兩張同花色的牌：{{n:tex.points.suits.two-tone}} 分；三張同花色的牌：{{n:tex.points.suits.monotone}} 分。

**{{t:dry|乾燥}}**翻牌少於 {{n:tex.threshold.medium}} 分，**{{t:wet|濕潤}}**翻牌至少 {{n:tex.threshold.wet}} 分，介於兩者之間的是**中等**翻牌。

| 翻牌 | 花色 | {{t:straight|順子}} | 合計 | {{t:texture|牌面結構}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|乾燥}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|乾燥}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|乾燥}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|乾燥}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | 中等 |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | 中等 |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|濕潤}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|濕潤}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|濕潤}} |

已成的{{t:straight|順子}}比單純的{{t:draw|聽牌}}分量更重，因為它現在就改變了強弱關係。有多種方式可成的{{t:straight|順子}}比只有一種方式可成的{{t:straight|順子}}分量更重：在 [[9h 8d 7c]] 上，很多手牌有{{t:straight|順子}}或{{t:oesd|兩頭順子聽牌}}；而在 [[Ah Kd Tc]] 上，只有 QJ 能組成{{t:straight|順子}}，也沒有人有兩頭{{t:draw|聽牌}}。所以三種花色的 A-K-T 雖然是{{t:connected|連張}}翻牌，仍屬中等。

{{t:two-tone|雙色}}的 [[Kh 7h 2c]] 是帶有一個{{t:flush-draw|同花聽牌}}的{{t:dry|乾燥}}翻牌：沒有{{t:straight|順子}}，也沒有{{t:straight-draw|順子聽牌}}。{{t:monotone|單色}}翻牌一定是{{t:wet|濕潤}}的：在 [[Kh 8h 3h]] 上有{{t:flush|同花}}或{{t:flush-draw|同花聽牌}}的手牌，比在 [[9h 8d 7c]] 上有{{t:straight|順子}}或{{t:oesd|兩頭順子聽牌}}的手牌更多。

在{{t:dry|乾燥}}翻牌上，領先者通常會一路領先到河牌。在{{t:wet|濕潤}}翻牌上，後面的牌常常改變強弱關係，所以翻牌時最好的手牌比較不安全。

:::note 這些定義從何而來
{{t:dry|乾燥}}和{{t:wet|濕潤}}這兩個概念來自撲克文獻：教學資料舉例的{{t:dry|乾燥}}翻牌有三種花色的 K-7-2、A-9-4 和 A-A-6，{{t:wet|濕潤}}翻牌則有 9-8-7、Q-J-T 和 T-9-5-4。點數和精確的界線（例如中翻牌從 10 開始）是本 App 採用的約定，目的是讓每個翻牌都能得到明確的評估。資料來源沒有提供點數門檻，也沒有規定既不{{t:dry|乾燥}}也不{{t:wet|濕潤}}的翻牌該怎麼稱呼。依照這個約定，{{t:dry|乾燥}}翻牌約佔所有翻牌的 {{n:tex.share.dry}}，中等約佔 {{n:tex.share.medium}}，{{t:wet|濕潤}}約佔 {{n:tex.share.wet}}；這是本 App 定義得出的結果，不是文獻中的數字。
:::
