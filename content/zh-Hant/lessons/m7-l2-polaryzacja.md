---
id: m7.l2
module: m7
order: 2
title: "極化"
sub: "大注：強牌與半詐唬"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "轉牌上哪一種下注{{t:range}}是{{t:polarized}}的？"
    options:
      - { text: "暗三、{{t:two-pair}}和{{t:draw|聽牌}}，沒有中等{{t:pair|對子}}", correct: true, why: "沒錯：{{t:range}}{{t:polarized}}有兩極：非常強的牌和{{t:semi-bluff|半詐唬}}。中間，也就是中等牌，不在其中：這些牌會{{t:check|過牌}}。" }
      - { text: "{{t:top-pair|頂對}}、中等{{t:pair|對子}}和較弱的{{t:pair|對子}}", why: "這裡沒有任何一極：缺少非常強的牌和{{t:semi-bluff|半詐唬}}，只有由上而下的{{t:pair|對子}}。這比較接近{{t:linear|線性}}{{t:range|範圍}}：主要用有價值的牌下注，通常用小尺寸，而不是在轉牌下大注。" }
      - { text: "只有{{t:bluff|詐唬}}", why: "沒有強牌的{{t:range|範圍}}很容易被對手識破，他會一直{{t:call|跟注}}。{{t:polarized|極化}}{{t:range}}把{{t:bluff|詐唬}}和非常強的牌結合在一起。" }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "在{{t:dry|乾燥}}的翻牌 [[Ks 7d 2c]] 上，你幾乎用所有牌都下小注：從暗三到弱{{t:pair|對子}}。這種下注{{t:range}}叫什麼？"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|線性}}", correct: true, why: "沒錯：強牌和中等牌一起下注，用小尺寸。這是 M5 的打法，用在你有{{t:range-advantage|範圍優勢}}的{{t:dry|乾燥}}高牌翻牌面上。" }
      - { text: "{{t:polarized|極化}}", why: "{{t:polarized|極化}}{{t:range}}沒有中等牌：只有非常強的牌和{{t:bluff|詐唬}}會下注。這裡連弱{{t:pair|對子}}也下注了。" }
      - { text: "封頂", why: "封頂{{t:range}}是指缺少最強牌的範圍。你連暗三也下注了。" }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "為什麼中等{{t:pair}}不喜歡在轉牌下大注？"
    options:
      - { text: "因為較差的牌會{{t:fold|棄牌}}，而較好的牌會付錢", correct: true, why: "沒錯：用中等{{t:pair|對子}}下大注，只有在較差的牌付錢時才賺錢，而這類牌面對大注通常會{{t:fold|棄牌}}。剩下的{{t:call|跟注}}都來自贏你的牌。" }
      - { text: "因為大注一定是{{t:bluff|詐唬}}", why: "不對：最強的牌也會{{t:bet|下}}大注。中等{{t:pair|對子}}的問題在於誰會付錢給它。" }
      - { text: "因為中等{{t:pair}}贏不了", why: "贏得了：它能贏{{t:bluff|詐唬}}和較差的{{t:pair|對子}}。所以它會{{t:check|過牌}}，便宜地進入攤牌。" }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}了翻牌的 c-bet。轉牌是一張 2。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你有暗三。你怎麼做？"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "下注 {{n:ex.bet.three-quarters}}", correct: true, why: "沒錯：對手可能有{{t:draw}}，聽{{t:flush|同花}}（兩張紅心）和{{t:straight|順子}}（例如 65、T9）。面對 3/4 {{t:pot|底池}}的下注，{{t:flush-draw}}需要 {{n:eq.bet-three-quarters}} 的權益，而{{t:flush}}成牌的機率約 {{n:odds.flush.turn-river}}。對上你的暗三，他的機會更小：[[4h]] 和 [[2h]] 會讓你拿到{{t:full-house|葫蘆}}，所以他只剩 {{n:outs.flush.vs-set}} 張乾淨的 outs，約 {{n:odds.flush.vs-set}}。他付得太貴了。" }
      - { text: "下注 {{n:ex.bet.quarter}}", sizeError: true, why: "行動對，尺寸錯：面對 1/4 {{t:pot|底池}}的下注，{{t:draw}}只需要 {{n:eq.bet-quarter}} 的權益，所以拿到好價格。在有{{t:flush-draw|同花聽牌}}的{{t:board|公共牌}}上拿著非常強的牌，你要下大注。" }
      - { text: "{{t:check|過牌}}", why: "免費牌是送給{{t:draw|聽牌}}的禮物，而且你沒有在河牌前做大{{t:pot|底池}}。在有{{t:flush-draw|同花聽牌}}的{{t:board|公共牌}}上，暗三要下注。" }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}了翻牌的 c-bet。轉牌是一張 3。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "下注 {{n:ex.bet.three-quarters}}", correct: true, why: "沒錯：帶兩張高牌的{{t:flush-draw}}是很好的{{t:semi-bluff}}。你用和強牌相同的大尺寸下注，所以對手分不出{{t:bluff|詐唬}}和價值牌。" }
      - { text: "下注 {{n:ex.bet.quarter}}", sizeError: true, why: "行動對，尺寸錯：這麼便宜的下注，對手用任何{{t:pair|對子}}都會{{t:call|跟注}}，而{{t:semi-bluff}}主要靠對手{{t:fold|棄牌}}賺錢。如果你的小注代表{{t:draw|聽牌}}、大注代表強牌，對手很容易利用這一點。" }
      - { text: "{{t:check|過牌}}", correct: true, why: "也可以：你能免費看河牌，有 {{n:odds.flush.turn-river}} 的機率中{{t:flush}}。不過下注通常更好，因為帶高牌的{{t:draw}}是最好的{{t:semi-bluff|半詐唬}}之一，而{{t:check|過牌}}就等於放棄立刻贏下{{t:pot|底池}}。" }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "你在按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}了翻牌的 c-bet。轉牌是一張 5。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:check|過牌}}。你怎麼做？"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "帶弱踢腳的{{t:top-pair|頂對}}是中等牌。面對大注，付錢的主要是更好的 K（AK、KQ、KJ），較差的牌則會{{t:fold|棄牌}}。{{t:check|過牌}}，你就能便宜地進入攤牌。" }
      - { text: "下注 {{n:ex.bet.three-quarters}}", why: "大注適合{{t:polarized|極化}}{{t:range|範圍}}。拿這手牌，付錢給你的主要是贏你的牌。" }
      - { text: "下注 {{n:ex.bet.pot}}", why: "用中等強度的牌做出更大的{{t:pot}}：較差的牌幾乎總會{{t:fold|棄牌}}，較好的牌則會付錢。" }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.pot}}，你拿非常強的牌下注 {{n:ex.bet.three-quarters}}。拿著{{t:draw|聽牌}}的對手需要多少百分比的權益才能{{t:call|跟注}}？請輸入數字。"
    answer: eq.bet-three-quarters
    explanation: "對手要投入 {{n:ex.bet.three-quarters}}，{{t:call|跟注}}後{{t:pot|底池}}是 {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}：{{n:eq.bet-three-quarters}}。{{t:flush-draw|同花聽牌}}在轉牌約有 {{n:odds.flush.turn-river}}，所以他付得太貴了。"
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "轉牌。你有暗三，只往 {{n:ex.pot}} 的{{t:pot|底池}}下注 {{n:ex.bet.quarter}}。對手有{{t:flush-draw}}（到河牌約 {{n:odds.flush.turn-river}}）。這代表什麼？"
    options:
      - { text: "他拿到好價格：只需要 {{n:eq.bet-quarter}}", correct: true, why: "沒錯：{{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}，低於他的 {{n:odds.flush.turn-river}}。{{t:call|跟注}}對他有利可圖，而你的小注讓出了一部分價值。" }
      - { text: "他必須{{t:fold|棄牌}}，因為他需要 {{n:eq.bet-three-quarters}}", why: "那是面對 3/4 {{t:pot|底池}}下注時需要的勝率。面對 1/4 {{t:pot|底池}}的下注，他只要 {{n:eq.bet-quarter}} 就夠了。" }
      - { text: "價格不重要，因為你反正贏他", why: "你現在贏他，但他約有 {{n:odds.flush.turn-river}} 的機率在河牌贏你。下注尺寸決定他為這個機會付得太多還是太少。" }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "對手在轉牌有{{t:oesd}}：到河牌約 {{n:odds.oesd.turn-river}}。你下注多大時，他就付得太貴了（只計算底池賠率）？"
    options:
      - { text: "從 1/3 {{t:pot|底池}}起就是：他需要 {{n:eq.bet-third}}", correct: true, why: "沒錯：{{n:eq.bet-third}} 高於 {{n:odds.oesd.turn-river}}。在轉牌，{{t:draw|聽牌}}只剩一張牌，所以即使是中等下注也會給它們差的價格。" }
      - { text: "要到整個{{t:pot|底池}}才會：他需要 {{n:eq.bet-pot}}", why: "面對整個{{t:pot|底池}}的下注，他付得遠遠太貴，但在 1/3 {{t:pot|底池}}時他就需要 {{n:eq.bet-third}}，已經高於他的 {{n:odds.oesd.turn-river}}。" }
      - { text: "永遠不會，{{t:draw}}總是可以{{t:call|跟注}}", why: "{{t:draw|聽牌}}只有在價格好或有隱含賠率（下一課）時才會{{t:call|跟注}}。它在轉牌約有 {{n:odds.oesd.turn-river}}，所以大多數下注對它來說都是差的價格。" }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "轉牌。{{t:pot|底池}}有 {{n:ex.pot}}，你下注整個{{t:pot|底池}}：{{n:ex.bet.pot}}。對手需要多少百分比的權益才能{{t:call|跟注}}？請輸入數字。"
    answer: eq.bet-pot
    explanation: "對手要投入 {{n:ex.bet.pot}}，{{t:call|跟注}}後{{t:pot|底池}}是 {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}：{{n:eq.bet-pot}}。無論是{{t:flush}}聽牌（約 {{n:odds.flush.turn-river}}）還是兩頭{{t:straight}}聽牌（約 {{n:odds.oesd.turn-river}}），都沒有這麼高的機會。"
---
在翻牌，你常用幾乎整個{{t:range|範圍}}下小注。到了轉牌，下注{{t:range}}會改變：留下非常強的牌和{{t:semi-bluff|半詐唬}}，中等牌則{{t:check|過牌}}。我們把這種{{t:range}}稱為{{t:polarized|極化}}。

## 兩種{{t:range|範圍}}

- **{{t:linear|線性}}：** 從最強的牌往下下注，連中等牌一起。通常用小尺寸，例如在 [[Ks 7d 2c]] 上用 {{n:cbet.size.small}} {{t:pot|底池}}的 c-bet。
- **{{t:polarized|極化}}：** 兩極下注：非常強的牌（暗三、{{t:two-pair}}、{{t:straight|順子}}、同花）和{{t:semi-bluff|半詐唬}}（{{t:draw|聽牌}}）。其中沒有中等牌。

一般來說，{{t:range}}{{t:polarized}}由非常強的牌和{{t:bluff|詐唬}}組成。在轉牌，{{t:bluff|詐唬}}通常是{{t:semi-bluff|半詐唬}}；在河牌（M8），則是攤牌時毫無勝算的牌。

## 為什麼要在轉牌極化

對手{{t:call|跟注}}了翻牌，所以通常有{{t:pair|對子}}或{{t:draw}}，有時是帶後門的高牌（M6）。中等牌下第二注什麼也得不到：較差的牌{{t:fold|棄牌}}，較好的牌付錢。強牌想在河牌前做大{{t:pot|底池}}，{{t:semi-bluff|半詐唬}}則需要對手{{t:fold|棄牌}}，而且被{{t:call}}時還有 outs。

## {{t:polarized}}{{t:range|範圍}}，大注

{{t:polarized}}{{t:range|範圍}}下大注，例如 3/4 {{t:pot|底池}}。強牌能榨取更多{{t:chips|籌碼}}，{{t:semi-bluff|半詐唬}}更常直接贏下底池。中等牌{{t:check|過牌}}。當{{t:bluff|詐唬}}和強牌用相同尺寸下注，對手就不知道你拿的是什麼。

## {{t:draw|聽牌}}的價格

在轉牌，{{t:draw}}只剩一張牌。大注會讓它付得太貴：

| 你的下注 | 對手需要 | {{t:flush|同花}}有 | 兩頭{{t:straight|順子}}有 |
|---|---|---|---|
| 1/4 {{t:pot|底池}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 {{t:pot|底池}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 {{t:pot|底池}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 {{t:pot|底池}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 整個{{t:pot}} | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

面對 1/4 {{t:pot|底池}}的下注，{{t:flush-draw}}拿到好價格。在 1/3 {{t:pot|底池}}時，價格幾乎等於{{t:flush|同花}}的機率（{{n:eq.bet-third}} 對 {{n:odds.flush.turn-river}}），而從 1/2 {{t:pot|底池}}起，{{t:flush}}明顯付得太貴，除非它指望隱含賠率（下一課）。本課的{{t:draw|聽牌}}題目只計算底池賠率。

:::note 這些原則從哪裡來
{{t:polarized|極化}}和{{t:linear|線性}}{{t:range|範圍}}的概念，以及「{{t:polarized}}{{t:range}}下大注，中等牌{{t:check|過牌}}」這條原則，都來自訓練教材，在這裡屬於經驗法則；用強而脆弱的牌下大注的建議也是如此。求解器在轉牌也會使用小尺寸。3/4 {{t:pot|底池}}只是練習用的例子，不是唯一好的尺寸。表格中的價格是本 App 的精確計算。
:::
