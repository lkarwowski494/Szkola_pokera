---
id: m5.l3
module: m5
order: 3
title: "多常下注、下多大"
sub: "有位置的 C-bet"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}，翻牌時{{t:check|過牌}}。哪個打法適合這個翻牌？"
    position: BTN
    options:
      check: "較常{{t:check|過牌}}，C-bet 比平常少"
      small: "常 C-bet、下小注：{{t:pot|底池}}的 {{n:cbet.size.small}}（{{n:cbet.btn.small}}）"
      big: "常 C-bet、下大注：{{t:pot|底池}}的 {{n:cbet.size.big}}（{{n:cbet.btn.big}}）"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "太保守：在{{t:dry|乾燥}}的高牌翻牌上，你有{{t:range-advantage|範圍優勢}}，而對手通常沒中。{{t:check|過牌}}等於送他一張免費牌。"
          small: "對：{{t:dry|乾燥}}的高牌翻牌對你有利。小{{t:bet}}就足以讓對手{{t:fold|棄掉}}弱牌，而較差的{{t:pair|對子}}仍會{{t:call|跟注}}。"
          big: "動作對，尺寸錯：在{{t:dry|乾燥}}翻牌上，對手的{{t:draw|聽牌}}很少，沒中的牌面對小{{t:bet}}也會{{t:fold|棄牌}}。較大的{{t:bet}}能讓大致相同的牌{{t:fold|棄牌}}，風險卻更高。下注約{{t:pot|底池}}的 {{n:cbet.size.small}}。"
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "太保守：你有{{t:range-advantage|範圍優勢}}，而在{{t:paired|成對}}翻牌上很難有{{t:draw|聽牌}}，所以沒有{{t:pair|對子}}的對手連小{{t:bet}}都很少付得起。"
          small: "對：在{{t:paired|成對}}翻牌上，你常下注、下小注。沒有{{t:pair|對子}}的對手很少有牌能{{t:call|跟注}}，而兩位玩家都可能有{{t:three-of-a-kind|三條}}，所以沒理由冒更大的風險。"
          big: "動作對，尺寸錯：在{{t:paired|成對}}翻牌上，你們任何一方都可能有{{t:three-of-a-kind|三條}}，所以大{{t:bet}}不划算，而對手的弱牌面對小注也會{{t:fold|棄牌}}。約{{t:pot|底池}}的 {{n:cbet.size.small}} 就夠了。"
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "對：牌張相近的低牌翻牌對{{t:big-blind|大盲}}有利，他在這裡更常有{{t:two-pair|兩對}}或{{t:straight|順子}}。你 C-bet 的頻率比高牌翻牌低：很多牌{{t:check|過牌}}，下注的主要是強牌和強{{t:draw|聽牌}}。"
          small: "太常了：在牌張相近的低牌翻牌上，擁有{{t:nuts-advantage|堅果優勢}}的是{{t:big-blind|大盲}}。頻繁的 C-bet 即使是小注，也讓他有機會用最強的牌先{{t:check|過牌}}再{{t:raise|加注}}（check-raise）。"
          big: "太常也太貴：{{t:big-blind|大盲}}在這裡更常擊中{{t:two-pair|兩對}}或{{t:straight|順子}}。你自己通常只有高牌時，頻繁的大 C-bet 風險很高。"
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}後{{t:check|過牌}}。你有 K 的{{t:pair|對子}}，搭配 J。你怎麼做？"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}}（{{t:pot|底池}}的 {{n:cbet.size.small}}）", correct: true, why: "對：{{t:dry|乾燥}}翻牌上的{{t:top-pair|頂對}}（和{{t:board|公共牌}}最大牌成對的{{t:pair|對子}}）。小{{t:bet}}會得到 7、2 和較弱 K 的{{t:call|跟注}}，而對手幾乎沒有{{t:draw|聽牌}}。" }
      - { text: "C-bet {{n:cbet.btn.big}}（{{t:pot|底池}}的 {{n:cbet.size.big}}）", sizeError: true, why: "動作對，尺寸錯：在{{t:dry|乾燥}}翻牌上，對手沒有{{t:draw|聽牌}}，沒中的牌面對小{{t:bet}}也會{{t:fold|棄牌}}。較大的{{t:bet}}能讓大致相同的牌{{t:fold|棄牌}}，風險卻更高。下注約{{t:pot|底池}}的 {{n:cbet.size.small}}。" }
      - { text: "{{t:check|過牌}}", why: "你損失了價值：對手有很多較弱的{{t:pair|對子}}和 A 高牌，會付一個小{{t:bet}}。在{{t:dry|乾燥}}翻牌上拿{{t:top-pair|頂對}}，你要下注。" }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}後{{t:check|過牌}}。在{{t:draw|聽牌}}很多的翻牌上，你有 J 的暗三條。你怎麼做？"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}}（{{t:pot|底池}}的 {{n:cbet.size.big}}）", correct: true, why: "對：對手有很多{{t:flush-draw|同花聽牌}}和{{t:straight|順子}}聽牌（例如 QT、AQ、兩張紅心）。大{{t:bet}}讓他們為下一張牌付出高昂代價。" }
      - { text: "C-bet {{n:cbet.btn.small}}（{{t:pot|底池}}的 {{n:cbet.size.small}}）", sizeError: true, why: "動作對，尺寸錯：小{{t:bet}}讓對手的{{t:draw|聽牌}}便宜看到下一張牌，而你的暗三條可能輸給同花或{{t:straight|順子}}。{{t:draw|聽牌}}很多時，要下大注。" }
      - { text: "{{t:check|過牌}}，免得嚇跑對手", why: "{{t:draw|聽牌}}很多時，免費牌就是送給它們的禮物。拿很強的牌，要馬上做大{{t:pot|底池}}。" }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}後{{t:check|過牌}}。翻牌{{t:paired|成對}}。哪個打法適合？"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "常 C-bet、下小注", correct: true, why: "對：你有{{t:range-advantage|範圍優勢}}，而在{{t:paired|成對}}翻牌上很難有{{t:draw|聽牌}}，所以沒有{{t:pair|對子}}的對手連小{{t:bet}}都很少付得起。你也有更多高{{t:pair|對子}}，例如 AA 和 KK，而只{{t:call|跟注}}的{{t:big-blind}}通常沒有這些牌。" }
      - { text: "常 C-bet、下大注", sizeError: true, why: "動作對，尺寸錯：你們任何一方都可能有{{t:three-of-a-kind|三條}}，所以大{{t:bet}}不划算，而沒有{{t:pair|對子}}的對手面對小注也會{{t:fold|棄牌}}。要常下注、下小注。" }
      - { text: "較常{{t:check|過牌}}，較少下注", why: "太保守：{{t:paired|成對}}的高牌翻牌對你有利，對手在這裡通常什麼都沒有。" }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}後{{t:check|過牌}}。翻牌是{{t:monotone|單色}}。哪個打法適合？"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet 比平常少，並下小注", correct: true, why: "對：任何一位玩家都可能已經有{{t:flush|同花}}，所以你的{{t:nuts-advantage|堅果優勢}}比一般高牌翻牌小。你下注較少、用小尺寸，免得在對方可能有同花時做大{{t:pot|底池}}。" }
      - { text: "常 C-bet、下大注，讓{{t:draw|聽牌}}付錢", why: "在{{t:monotone|單色}}翻牌上，大{{t:pot|底池}}很危險：對手可能已經成了{{t:flush|同花}}，而你沒有紅心的牌很難撐住。" }
      - { text: "一律{{t:check|過牌}}", why: "太保守：高牌翻牌仍對你有利，而部分牌（例如帶高紅心的牌）很適合下小注。" }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:pot|底池}}裡有 {{n:ex.pot}}。你沒有任何牌力，下注 {{n:cbet.ex.small}}。對手要有多少百分比的時候{{t:fold|棄牌}}，這個{{t:bet}}才能打平？請輸入數字。"
    answer: alpha.cbet.small
    explanation: "你冒 {{n:cbet.ex.small}} 的風險去贏 {{n:ex.pot}}。門檻是 下注 ÷（{{t:pot|底池}} + 下注）：{{n:cbet.ex.small}} ÷（{{n:ex.pot}} + {{n:cbet.ex.small}}）= {{n:alpha.cbet.small}}。對手沒中翻牌的頻率高得多，所以小 C-bet 才會這麼常有利可圖。"
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:pot|底池}}裡有 {{n:ex.pot}}。你沒有任何牌力，下注 {{n:cbet.ex.big}}。對手要有多少百分比的時候{{t:fold|棄牌}}，這個{{t:bet}}才能打平？請輸入數字。"
    answer: alpha.cbet.big
    explanation: "你冒 {{n:cbet.ex.big}} 的風險去贏 {{n:ex.pot}}：{{n:cbet.ex.big}} ÷（{{n:ex.pot}} + {{n:cbet.ex.big}}）= {{n:alpha.cbet.big}}。大{{t:bluff|詐唬}}成功的頻率必須比小的（{{n:alpha.cbet.small}}）高得多。"
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "為什麼在{{t:dry|乾燥}}翻牌上，拿毫無勝算的牌下{{t:pot|底池}} {{n:cbet.size.small}} 的 C-bet，比下{{t:pot|底池}} {{n:cbet.size.big}} 的 C-bet 更常有利可圖？"
    options:
      - { text: "因為小{{t:bet}}只需要對手在 {{n:alpha.cbet.small}} 的情況下棄牌，大注則需要 {{n:alpha.cbet.big}}", correct: true, why: "對：在{{t:dry|乾燥}}翻牌上，對手最弱的牌（沒有{{t:pair|對子}}也沒有{{t:draw|聽牌}}）面對兩種尺寸都會{{t:fold|棄牌}}，所以小{{t:bet}}能用更低的成本達到同樣效果。" }
      - { text: "因為小{{t:bet}}總是會讓對手{{t:fold|棄牌}}", why: "不對：對手會用任何{{t:pair|對子}}{{t:call|跟注}}小{{t:bet}}。小{{t:bet}}只是風險較小，所以需要的{{t:fold|棄牌}}較少。" }
      - { text: "因為大{{t:bet}}永遠是錯的", why: "不對：在{{t:wet|濕潤}}翻牌上、而且有{{t:nuts-advantage|堅果優勢}}時，大{{t:bet}}有時是最好的選擇。不過在{{t:dry|乾燥}}翻牌上，它承擔更大的風險，卻換不到任何好處。" }
---
C-bet（持續{{t:bet|下注}}）是翻牌前最後一個{{t:raise|加注}}的玩家在翻牌時的{{t:bet}}。這一課你是{{t:in-position|有位置}}的一方：你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}，翻牌時{{t:check|過牌}}。翻牌時的{{t:pot|底池}}是 {{n:bb.pot-after.vs-btn}}。問題有兩個：多常下注，以及下多大。

## {{t:dry|乾燥}}的高牌翻牌：常下注、下小注

在像 [[Ks 7d 2c]] 這樣的翻牌上，你有{{t:range-advantage|範圍優勢}}，而對手幾乎沒有{{t:draw|聽牌}}。你常下注、下小注，約{{t:pot|底池}}的 {{n:cbet.size.small}}，也就是約 {{n:cbet.btn.small}}。小{{t:bet}}就足以讓對手{{t:fold|棄掉}}沒中的牌，而較差的{{t:pair|對子}}仍會{{t:call|跟注}}。較大的{{t:bet}}能讓大致相同的牌{{t:fold|棄牌}}，風險卻更高。

典型的小 C-bet 約為{{t:pot|底池}}的 {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}}，大 C-bet 約為 {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}}（教學資料）；求解器通常使用 {{n:cbet.size.small}} 和 {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}，在部分翻牌上也會使用{{t:overbet|超池下注}}，也就是比整個{{t:pot|底池}}還大的{{t:bet|下注}}（已發表的求解器結果）。

## {{t:draw|聽牌}}很多的翻牌：下注較少，但下得更大

在像 [[Kh Jh 7c]] 這樣的翻牌上，對手有很多{{t:flush-draw|同花聽牌}}和{{t:straight|順子}}聽牌，但還不可能成{{t:straight|順子}}。強牌和強{{t:draw|聽牌}}用較大的尺寸下注，例如{{t:pot|底池}}的 {{n:cbet.size.big}}，讓{{t:draw|聽牌}}為下一張牌付出高昂代價。沒有{{t:draw|聽牌}}的中等牌較常{{t:check|過牌}}。當{{t:straight|順子}}已經可能成立時，例如在 [[Jh Th 8c]] 上，對手可能已經有了，所以求解器在那裡用較小的尺寸下注。

## {{t:paired|成對}}與{{t:monotone|單色}}

在{{t:paired|成對}}翻牌上，例如 [[Qd Qs 6h]]，你有{{t:range-advantage|範圍優勢}}，而且很難有{{t:draw|聽牌}}，所以沒有{{t:pair|對子}}的對手很少能{{t:call|跟注}}。你常下注、下小注：大{{t:bet}}不划算，因為你們任何一方都可能有{{t:three-of-a-kind|三條}}。在{{t:monotone|單色}}翻牌上，例如 [[Kh 8h 3h]]，任何人都可能已經有{{t:flush|同花}}，所以你下注比平常少，並下小注。

注意：「{{t:wet|濕潤}}」不等於「下大注」。在本 App 中，{{t:monotone|單色}}翻牌一律算是{{t:wet|濕潤}}的，但求解器在這種翻牌上很少下注，而且用小尺寸（已發表的求解器結果）。下注尺寸只會隨{{t:wetness|濕潤度}}增加到某個程度：在最{{t:wet|濕潤}}的翻牌上，例如 [[Qd 8d 7d]]，尺寸又會變小。上一節提到的較大尺寸，適用於{{t:draw|聽牌}}很多、但還不可能成{{t:straight|順子}}的翻牌（在本 App 中通常是中等濕潤度的翻牌）。

## 牌張相近的低牌翻牌：較常{{t:check|過牌}}

在 [[7s 6h 5d]] 上，更常有{{t:two-pair|兩對}}或{{t:straight|順子}}的是{{t:big-blind|大盲}}（見關於優勢的課程）。其他{{t:connected|連張}}和{{t:semi-connected|半連張}}的低牌翻牌也一樣。你 C-bet 的頻率比高牌翻牌低：很多牌{{t:check|過牌}}，下注的主要是非常強的牌和強{{t:draw|聽牌}}。

## 對手要{{t:fold|棄牌}}多少才夠

沒有任何牌力的{{t:bet|下注}}，在對手{{t:fold|棄牌}}的比例達到 下注 ÷（{{t:pot|底池}} + 下注）時打平。下{{t:pot|底池}}的 {{n:cbet.size.small}} 時是 {{n:alpha.cbet.small}}，下{{t:pot|底池}}的 {{n:cbet.size.big}} 時就要 {{n:alpha.cbet.big}}。沒有{{t:pair|對子}}的手牌約有 {{n:flop.miss.unpaired}} 的情況沒中翻牌，所以小 C-bet 才會這麼常有利可圖。

:::note 這些原則從哪裡來
這些方向（{{t:dry|乾燥}}翻牌：下小注、常下注；{{t:draw|聽牌}}很多但還沒成{{t:straight|順子}}：下大一點、下注較少；{{t:straight|順子}}已經可能成立：下小一點；{{t:paired|成對}}：下小注；{{t:monotone|單色}}：下注較少、下小注）是來自教學資料和已發表求解器結果的一般原則，標示為經驗法則。{{t:pot|底池}}的 {{n:cbet.size.small}} 和 {{n:cbet.size.big}} 這兩種尺寸，是取自上面所列範圍的例子（關於下注尺寸的教學資料；已發表的求解器結果）。本 App 不以百分比說明多常下注，因為這類數字來自求解器的結果。
:::
