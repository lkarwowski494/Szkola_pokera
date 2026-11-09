---
id: m8.l2
module: m8
order: 2
title: "要詐唬多少"
sub: "詐唬比例與下注尺寸"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "河牌。{{t:pot|底池}}有 {{n:ex.pot}}，你下注整個{{t:pot|底池}}：{{n:ex.bet.pot}}。你的{{t:range|範圍}}由非常強的牌和{{t:bluff|詐唬}}組成。你的下注中應該有多少比例是{{t:bluff|詐唬}}，對手才無法利用你？請輸入百分比。"
    answer: bluff.share.bet-pot
    explanation: "{{t:bluff|詐唬}}佔比 = 下注 ÷ ({{t:pot|底池}} + 2·下注) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}。每三次下注就有一次是{{t:bluff|詐唬}}：這時對手那手只贏得了{{t:bluff|詐唬}}的牌，不論{{t:call|跟注}}還是{{t:fold|棄牌}}都賺不到錢。"
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "河牌。{{t:pot|底池}}有 {{n:ex.pot}}，你下注半個{{t:pot|底池}}：{{n:ex.bet.half}}。在均衡狀態下，你的下注中有多少比例是{{t:bluff|詐唬}}？請輸入百分比。"
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}。下注較小會給對手較好的價格，所以{{t:bluff|詐唬}}比下注整個{{t:pot|底池}}時少（{{n:bluff.share.bet-pot}}）。"
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "河牌。{{t:pot|底池}}有 {{n:ex.pot}}，你下注 {{n:ex.bet.three-quarters}}。在均衡狀態下，你的下注中有多少比例是{{t:bluff|詐唬}}？"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}。這個數字和對手{{t:call|跟注}}所需的勝率相同。" }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "這是 alpha：一次毫無勝算的{{t:bluff|詐唬}}需要多常成功。{{t:range|範圍}}中的{{t:bluff|詐唬}}佔比，要把兩筆下注都放進分母來算：{{n:bluff.share.bet-three-quarters}}。" }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "這是{{t:mdf|最低防守頻率}}，也就是對手應該防守多少。你的{{t:bluff|詐唬}}佔比是 {{n:bluff.share.bet-three-quarters}}。" }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "河牌。{{t:pot|底池}}有 {{n:ex.pot}}，你下注超過{{t:pot|底池}}：{{n:ex.bet.overbet}}。在均衡狀態下，你的下注中有多少比例是{{t:bluff|詐唬}}？"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}。{{t:overbet|超池下注}}，也就是比整個{{t:pot|底池}}還大的{{t:bet|下注}}，給對手最差的價格，所以其中可以有最多的{{t:bluff|詐唬}}，但仍然少於一半。" }
      - { text: "{{n:alpha.bet-overbet}}", why: "這是這個尺寸的 alpha：對手需要多常{{t:fold|棄牌}}，一次{{t:bluff|詐唬}}才划算。{{t:range|範圍}}中的{{t:bluff|詐唬}}佔比是 {{n:bluff.share.bet-overbet}}。" }
      - { text: "{{n:bluff.share.bet-pot}}", why: "這是下注整個{{t:pot|底池}}時的{{t:bluff|詐唬}}佔比。下注 {{n:ex.bet.overbet}} 時詐唬更多：{{n:bluff.share.bet-overbet}}。" }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "河牌下注哪種尺寸時，你的{{t:range|範圍}}中有更多{{t:bluff|詐唬}}：1/3 {{t:pot|底池}}還是整個{{t:pot|底池}}？"
    options:
      - { text: "整個{{t:pot|底池}}", correct: true, why: "下注 1/3 {{t:pot|底池}}時，{{t:bluff|詐唬}}約佔下注的 {{n:bluff.share.bet-third}}；下注整個{{t:pot|底池}}時約佔 {{n:bluff.share.bet-pot}}。下注越大，給對手的價格越差，所以他的{{t:call|跟注}}需要更多{{t:bluff|詐唬}}才划算。" }
      - { text: "1/3 {{t:pot|底池}}", why: "剛好相反。小注給對手好價格：只要你的下注中約有 {{n:bluff.share.bet-third}} 是{{t:bluff|詐唬}}，他就可以{{t:call|跟注}}。{{t:bluff|詐唬}}再多一點，他跟注就有利可圖。" }
      - { text: "一樣多", why: "{{t:bluff|詐唬}}佔比取決於尺寸：1/3 {{t:pot|底池}}時約 {{n:bluff.share.bet-third}}，整個{{t:pot|底池}}時約 {{n:bluff.share.bet-pot}}。" }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "你在河牌下注整個{{t:pot|底池}}。Alpha 是 {{n:alpha.bet-pot}}，{{t:bluff|詐唬}}佔比是 {{n:bluff.share.bet-pot}}。這兩個數字各代表什麼？"
    options:
      - { text: "Alpha：對手需要多常{{t:fold|棄牌}}；佔比：你的下注中有多少是{{t:bluff|詐唬}}", correct: true, why: "Alpha 針對的是一次毫無勝算的{{t:bluff|詐唬}}：當對手有 {{n:alpha.bet-pot}} 的時候{{t:fold|棄牌}}，它就打平。{{t:bluff|詐唬}}佔比描述的是你{{t:range|範圍}}的組成：每三次下注有一次是{{t:bluff|詐唬}}，讓對手的{{t:call|跟注}}打平。" }
      - { text: "這是同一件事的兩個名稱，其中一個算錯了", why: "兩個都算得正確：alpha = 下注 ÷ ({{t:pot|底池}} + 下注)，{{t:bluff|詐唬}}佔比 = 下注 ÷ ({{t:pot|底池}} + 2·下注)。它們回答的是不同的問題。" }
      - { text: "Alpha：你的{{t:range|範圍}}中有多少{{t:bluff|詐唬}}；佔比：對手多常{{t:fold|棄牌}}", why: "剛好相反。Alpha 是單次{{t:bluff|詐唬}}所需的對手{{t:fold|棄牌}}門檻，{{t:bluff|詐唬}}佔比則是你下注{{t:range|範圍}}的組成。" }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "為什麼你下注中的{{t:bluff|詐唬}}佔比，和對手{{t:call|跟注}}所需的勝率用同一個公式計算？"
    options:
      - { text: "因為對手的抓詐唬牌剛好在你{{t:bluff|詐唬}}時贏", correct: true, why: "他的牌輸給你的價值牌、贏過你的{{t:bluff|詐唬}}，所以它的勝率就是{{t:bluff|詐唬}}佔比。當這個佔比等於所需勝率時，{{t:call|跟注}}剛好打平，對手不管跟注還是棄牌都無法利用你。" }
      - { text: "這是巧合，公式只是看起來很像", why: "這不是巧合。你選擇{{t:bluff|詐唬}}佔比，就是要讓抓詐唬牌的勝率等於它的價格。" }
      - { text: "因為對手總是剛好擁有所需的勝率", why: "對手的勝率取決於你的下注。是你調整{{t:bluff|詐唬}}的數量，讓結果剛好打平。" }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "你在河牌下注整個{{t:pot|底池}}，但你的下注有一半是{{t:bluff|詐唬}}，而不是 {{n:bluff.share.bet-pot}}。細心的對手可以怎麼做？"
    options:
      - { text: "更常{{t:call|跟注}}，甚至用很弱的抓詐唬牌", correct: true, why: "他的{{t:call|跟注}}有一半的時候會贏，但只需要 {{n:eq.bet-pot}}。多跟注的話，他從你的{{t:bluff|詐唬}}賺到的，比輸給你價值牌的還多。" }
      - { text: "更常{{t:fold|棄牌}}", why: "棄牌等於讓你的{{t:bluff|詐唬}}拿走{{t:pot|底池}}。{{t:bluff|詐唬}}太多時，對手靠{{t:call|跟注}}獲利。" }
      - { text: "什麼都不用做，比例不重要", why: "比例很重要：{{t:bluff|詐唬}}太多時，對手每一次用抓詐唬牌{{t:call|跟注}}都有利可圖。" }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "你在河牌下注整個{{t:pot|底池}}時幾乎只為了{{t:value|價值}}，幾乎沒有{{t:bluff|詐唬}}。細心的對手可以怎麼做？"
    options:
      - { text: "把所有只贏得了{{t:bluff|詐唬}}的牌都{{t:fold|棄掉}}", correct: true, why: "當{{t:bluff|詐唬}}少於 {{n:bluff.share.bet-pot}} 時，用抓詐唬牌{{t:call|跟注}}會虧損。這時對手只用更好的牌付錢，你的{{t:value|價值}}下注就更少拿到報酬。" }
      - { text: "更常{{t:call|跟注}}", why: "{{t:call|跟注}}的話，他大多是在付錢給你的價值牌。你的{{t:range|範圍}}裡沒有{{t:bluff|詐唬}}，他最好{{t:fold|棄牌}}。" }
      - { text: "每手牌都{{t:raise|加注}}", why: "沒有更好的牌卻對你的強牌{{t:raise|加注}}，必定虧損。對手只要更常{{t:fold|棄牌}}就好。" }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "你在河牌用由 {{n:bluff.ex.range}} 個{{t:combo|組合}}構成的{{t:range|範圍}}下注整個{{t:pot|底池}}，其中有價值牌和{{t:bluff|詐唬}}。在均衡狀態下，其中有幾個是{{t:bluff|詐唬}}？"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} 個{{t:bluff|詐唬}}，加上 {{n:bluff.ex.value}} 個{{t:value|價值}}{{t:combo|組合}}：每兩手{{t:value|價值}}牌配一次{{t:bluff|詐唬}}。" }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "這是用 alpha（{{n:alpha.bet-pot}}）算出的結果。Alpha 是單次{{t:bluff|詐唬}}的{{t:fold|棄牌}}門檻，不是{{t:range|範圍}}中的{{t:bluff|詐唬}}佔比。" }
      - { text: "{{n:bluff.ex.value}}", why: "這是{{t:value|價值}}{{t:combo|組合}}的數量。{{t:bluff|詐唬}}只有一半：{{n:bluff.ex.bluffs}}。" }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "在河牌，你需要一些{{t:bluff|詐唬}}來搭配下注整個{{t:pot|底池}}。你會選哪些牌？"
    options:
      - { text: "最弱的牌，例如沒中的{{t:straight|順子}}{{t:draw|聽牌}}或毫無勝算的高牌", correct: true, why: "攤牌時毫無勝算的牌，{{t:bluff|詐唬}}失敗也沒有損失：{{t:check|過牌}}後反正也會輸。所以由它來{{t:bluff|詐唬}}。" }
      - { text: "中等{{t:pair|對子}}", why: "中等{{t:pair|對子}}在{{t:check|過牌}}後常常會贏。用它{{t:bluff|詐唬}}時，較差的牌會{{t:fold|棄牌}}，較好的牌會付錢：你放棄了攤牌時的勝利。" }
      - { text: "任何牌都可以，只要比例對", why: "比例不是全部。用攤牌能贏的牌{{t:bluff|詐唬}}，代價比用毫無勝算的牌{{t:bluff|詐唬}}更高。" }
---
在第一課，你是為了{{t:value|價值}}而下注。但如果你在河牌只用強牌下注，細心的對手會棄掉除了更強的牌以外的所有牌，你的下注幾乎永遠拿不到報酬。{{t:bluff|詐唬}}讓對手覺得付錢是值得的。

## {{t:polarized|極化}}{{t:range|範圍}}

在河牌{{t:in-position|有位置}}時，你常常用 **{{t:polarized|極化}}{{t:range|範圍}}** 下注（如 M7）：為了{{t:value|價值}}的非常強的牌，加上{{t:bluff|詐唬}}，沒有中等牌（中等牌會{{t:check|過牌}}，如第一課）。在河牌，{{t:bluff|詐唬}}就是攤牌時毫無勝算的牌。這時對手會有很多輸給你的價值牌、但贏過{{t:bluff|詐唬}}的牌。這些就是 **抓詐唬牌**（bluff-catcher，用來抓{{t:bluff|詐唬}}的牌）。

## 要有多少{{t:bluff|詐唬}}

你調整{{t:bluff|詐唬}}的數量，讓對手的抓詐唬牌不論{{t:call|跟注}}還是{{t:fold|棄牌}}都剛好打平：

```formula
詐唬佔比 = 下注 ÷ (底池 + 2·下注)
```

這和 M2 裡{{t:call|跟注}}所需勝率的公式相同。這不是巧合：抓詐唬牌剛好在你{{t:bluff|詐唬}}時贏，所以它的勝率就是你的{{t:bluff|詐唬}}佔比。下注整個{{t:pot|底池}}時：{{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**，也就是每三次下注有一次是{{t:bluff|詐唬}}。

## 下注越大，{{t:bluff|詐唬}}越多

| 下注 | {{t:bluff|詐唬}}佔比 | Alpha（出自 M6） |
|---|---|---|
| 1/3 {{t:pot|底池}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 {{t:pot|底池}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 {{t:pot|底池}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| 整個{{t:pot|底池}} | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1.5 倍{{t:pot|底池}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

下注越大，給對手的價格越差，所以可以包含更多{{t:bluff|詐唬}}。小注只能容納少數幾個。

## {{t:bluff|詐唬}}佔比不是 alpha

M6 的 alpha = 下注 ÷ ({{t:pot|底池}} + 下注)，告訴你對手需要多常{{t:fold|棄牌}}，**單次**毫無勝算的{{t:bluff|詐唬}}才能打平。{{t:bluff|詐唬}}佔比 = 下注 ÷ ({{t:pot|底池}} + 2·下注)，告訴你**整個下注{{t:range|範圍}}**中有多少是{{t:bluff|詐唬}}。下注整個{{t:pot|底池}}時，一次{{t:bluff|詐唬}}需要超過 {{n:alpha.bet-pot}} 的{{t:fold|棄牌}}，而你的{{t:range|範圍}}中有 {{n:bluff.share.bet-pot}} 是{{t:bluff|詐唬}}。第二個分母多了一筆下注，因為你算的是對手{{t:call|跟注}}的價格。

## 用什麼牌{{t:bluff|詐唬}}

{{t:bluff|詐唬}}時要選**最弱的牌**，例如沒中的{{t:straight|順子}}{{t:draw|聽牌}}或毫無勝算的高牌（沒中的{{t:flush|同花}}會在{{t:blocker|阻擋牌}}那一課說明）：它們{{t:check|過牌}}後反正也會輸，所以{{t:bluff|詐唬}}失敗也不會讓它們損失什麼。有攤牌價值的牌就{{t:check|過牌}}。

:::note 這是均衡點，不是對付每個對手的公式
這些比例能保護你不被打得好的對手利用。面對特定玩家時，你可以偏離這些比例；這部分會在微注級別{{t:exploit|剝削}}的模組（M10）中說明。{{t:bluff|詐唬}}佔比公式是簡化模型中的計算：{{t:polarized|極化}}{{t:range|範圍}}對上抓詐唬牌（賽局理論中的玩具模型）。用最弱的牌{{t:bluff|詐唬}}的建議，來自教學資料和求解器分析。
:::
