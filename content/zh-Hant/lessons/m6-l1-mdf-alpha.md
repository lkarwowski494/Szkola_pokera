---
id: m6.l1
module: m6
order: 1
title: "MDF 與 alpha"
sub: "對手下注時，該防守多少"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "河牌。{{t:pot|底池}}裡有 {{n:ex.third.pot}}，對手{{t:bet|下注}} {{n:ex.third.bet}}。你至少要防守（{{t:call|跟注}}或{{t:raise|加注}}）{{t:range|範圍}}中的多少比例，他毫無勝算的{{t:bluff}}才不會自動獲利？請輸入百分比數字。"
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + 下注額) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}。對手冒 {{n:ex.third.bet}} 的風險去贏 {{n:ex.third.pot}}，所以只要你{{t:fold|棄牌}}的頻率高於 {{n:alpha.bet-third}}，他的{{t:bluff}}就會獲利。"
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "河牌。{{t:pot|底池}}裡有 {{n:ex.pot}}，對手{{t:bet|下注}}整個{{t:pot|底池}}：{{n:ex.bet.pot}}。{{t:mdf}} 是多少？請輸入百分比數字。"
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}。下注一個{{t:pot|底池}}大小時，{{t:bluff}}冒的風險和能贏的一樣多，所以只要你每兩次{{t:fold|棄牌}}一次，它就能打平。"
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "河牌。{{t:pot|底池}}裡有 {{n:ex.pot}}，對手{{t:bet|下注}}半個{{t:pot|底池}}：{{n:ex.bet.half}}。{{t:mdf}} 是多少？"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}。你要防守{{t:range|範圍}}中這麼多的比例，毫無勝算的{{t:bluff}}才不會獲利。" }
      - { text: "{{n:alpha.bet-half}}", why: "這是 alpha：對手的{{t:bluff}}需要成功的頻率。{{t:mdf}} 是剩下的部分，也就是 {{n:mdf.bet-half}}。" }
      - { text: "{{n:eq.bet-half}}", why: "這是用單一手牌{{t:call|跟注}}所需的權益（見 M2）。{{t:mdf}} 告訴你要防守整個{{t:range|範圍}}中的多少比例。" }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "河牌。{{t:pot|底池}}裡有 {{n:ex.pot}}，對手{{t:bet|下注}}超過{{t:pot|底池}}：{{n:ex.bet.overbet}}。{{t:mdf}} 是多少？"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}。下注越大，你需要防守的{{t:range|範圍}}比例就越小。" }
      - { text: "{{n:alpha.bet-overbet}}", why: "這是 alpha：下注 {{n:ex.bet.overbet}} 的{{t:bluff}}需要成功的頻率。剩下的由你防守，也就是 {{n:mdf.bet-overbet}}。" }
      - { text: "{{n:eq.bet-overbet}}", why: "這是{{t:call|跟注}}所需的權益：{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}})。不同的數字，回答不同的問題。" }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "河牌。你用毫無勝算的手牌{{t:bluff|詐唬}}：{{t:pot|底池}}裡有 {{n:ex.pot}}，你{{t:bet|下注}} {{n:ex.bet.half}}。對手要多常{{t:fold|棄牌}}，{{t:bluff}}才能打平？請輸入百分比數字。"
    answer: alpha.bet-half
    explanation: "Alpha = 下注額 ÷ ({{t:pot}} + 下注額) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}。你冒 {{n:ex.bet.half}} 的風險去贏 {{n:ex.pot}}：只要對手{{t:fold|棄牌}}的頻率更高，{{t:bluff}}就會獲利。"
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "河牌。你{{t:bluff|詐唬}}：{{t:pot|底池}}裡有 {{n:ex.pot}}，你{{t:bet|下注}} {{n:ex.bet.three-quarters}}。對手要多常{{t:fold|棄牌}}，{{t:bluff}}才划算？"
    options:
      - { text: "高於 {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}。這就是下注 3/4 {{t:pot|底池}}時的 alpha。" }
      - { text: "高於 {{n:mdf.bet-three-quarters}}", why: "這是 {{t:mdf}}，也就是對手應該防守的比例。Alpha 是在你的{{t:bluff}}開始獲利之前，他可以{{t:fold|棄牌}}的比例：{{n:alpha.bet-three-quarters}}。" }
      - { text: "高於 {{n:eq.bet-three-quarters}}", why: "這是對手{{t:call|跟注}}所需的權益。計算{{t:bluff|詐唬}}的門檻時，分母不含他的{{t:call|跟注}}：{{n:alpha.bet-three-quarters}}。" }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "{{t:pot|底池}}裡有 {{n:ex.pot}}。哪一個毫無勝算的{{t:bluff}}需要對手較少的{{t:fold|棄牌}}：下注 {{n:ex.bet.quarter}} 還是下注 {{n:ex.bet.pot}}？"
    options:
      - { text: "下注 {{n:ex.bet.quarter}}：只要超過 {{n:alpha.bet-quarter}} 的{{t:fold|棄牌}}就夠了", correct: true, why: "小額{{t:bluff}}冒的風險小：{{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}。下注整個{{t:pot|底池}}的{{t:bluff|詐唬}}需要超過 {{n:alpha.bet-pot}} 的{{t:fold|棄牌}}。" }
      - { text: "下注 {{n:ex.bet.pot}}：只要超過 {{n:alpha.bet-quarter}} 的{{t:fold|棄牌}}就夠了", why: "正好相反。下注越大，冒的風險越大，所以對手必須更常{{t:fold|棄牌}}：下注整個{{t:pot|底池}}時要超過 {{n:alpha.bet-pot}}。" }
      - { text: "兩者需要的一樣多", why: "Alpha 取決於下注大小：下注 {{n:ex.bet.quarter}} 時是 {{n:alpha.bet-quarter}}，下注 {{n:ex.bet.pot}} 時是 {{n:alpha.bet-pot}}。" }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "河牌，對手{{t:bet|下注}} 1/3 {{t:pot|底池}}。{{t:mdf}} 是 {{n:mdf.bet-third}}，而你需要 {{n:eq.bet-third}} 的權益才能{{t:call|跟注}}。這兩個數字要怎麼兼顧？"
    options:
      - { text: "{{t:mdf}} 針對整個{{t:range|範圍}}，權益針對單一手牌", correct: true, why: "{{t:mdf}} 告訴你要防守所有手牌中的多少比例，讓對手無法拿任意兩張牌{{t:bluff|詐唬}}。所需權益則告訴你，面對對手實際{{t:bet|下注}}的牌，用某一手特定的牌{{t:call}}是否划算。" }
      - { text: "其中一個算錯了", why: "兩個都正確：{{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}，以及 {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}。它們回答的是不同的問題。" }
      - { text: "當你至少有 {{n:mdf.bet-third}} 的權益時就{{t:call|跟注}}", why: "這混淆了兩個概念。{{t:call|跟注}}只需要 {{n:eq.bet-third}} 的權益。{{n:mdf.bet-third}} 是{{t:range|範圍}}的比例，不是單一手牌的勝算。" }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "翻牌。你在{{t:big-blind}}防守，按鈕位以 1/3 {{t:pot|底池}}{{t:bet|下注}} c-bet。{{t:mdf}} 是 {{n:mdf.bet-third}}。你真的必須防守這麼多手牌嗎？"
    table: { position: BB }
    options:
      - { text: "不用，你可以防守稍微少一點", correct: true, why: "{{t:mdf}} 假設{{t:bluff}}完全沒有勝算。在翻牌圈，按鈕位的{{t:bluff|詐唬}}還有權益（{{t:draw|聽牌}}、高張），而你{{t:out-of-position}}無法實現弱牌的全部權益。所以你可以防守得比 {{t:mdf}} 稍微少一點，但面對小額 c-bet 不會大量{{t:fold|棄牌}}。" }
      - { text: "對，否則按鈕位拿任何手牌都能獲利", why: "在河牌確實會這樣。在翻牌圈，按鈕位並不是拿毫無勝算的手牌在{{t:bluff|詐唬}}：就算你{{t:call|跟注}}，他還是可能中牌。{{t:mdf}} 是參考點，不是義務。" }
      - { text: "不用，你要防守更多，因為才翻牌而已", why: "正好相反。後面的{{t:street|街}}對{{t:in-position}}下注的一方有利，所以你要防守得更少，不是更多。" }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "你從之前的許多手牌中得知，這名玩家很少{{t:bluff|詐唬}}；他在河牌{{t:bet|下注}}整個{{t:pot|底池}}。你拿著一{{t:pair|對}} K，踢腳很弱。你怎麼做？"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你從之前的許多手牌中得知，這名玩家很少{{t:bluff|詐唬}}。當{{t:bluff|詐唬}}不夠多時，你的{{t:pair}}主要是在付錢給更好的牌（KQ、暗三條）。面對這種玩家，你{{t:fold|棄牌}}的頻率要比 {{t:mdf}} 所示的更高。" }
      - { text: "{{t:call|跟注}}，因為 {{t:mdf}} 要求防守 {{n:mdf.bet-pot}}", why: "{{t:mdf}} 是用來防範{{t:bluff|詐唬}}夠頻繁的玩家。這名玩家不會這樣做，所以死守 {{t:mdf}} 等於把錢送給他。" }
      - { text: "{{t:raise|加注}} all-in", why: "更好的牌會付錢，更差的牌會{{t:fold|棄牌}}。弱踢腳的{{t:pair|對子}}不是適合{{t:raise|加注}}的牌。" }
---
對手{{t:bet|下注}}時，你不只要問「這手牌能不能贏」。你也要看看在這個情況下你可能拿到的所有手牌，也就是你的{{t:range}}。有兩個數字會告訴你：其中要防守多少，以及對手的{{t:bluff}}需要多常成功。

## Alpha：{{t:bluff}}需要多常成功

毫無勝算的{{t:bluff|詐唬}}只有在對手{{t:fold|棄牌}}時才會贏。你冒下注額的風險去贏{{t:pot|底池}}。

```formula
alpha = 下注額 ÷ (底池 + 下注額)
```

例子：{{t:pot|底池}}裡有 {{n:ex.pot}}，你{{t:bet|下注}} {{n:ex.bet.half}}。Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**。如果對手{{t:fold|棄牌}}的頻率更高，就算你什麼牌都沒有，你的{{t:bluff}}也會獲利。

## {{t:mdf}}：你必須防守多少

{{t:mdf}}（最低防守頻率）是 alpha 的另一面。如果你防守（{{t:call|跟注}}或{{t:raise|加注}}）的手牌比這更少，對手拿任意兩張牌{{t:bluff|詐唬}}都能獲利。

```formula
MDF = 底池 ÷ (底池 + 下注額)
```

河牌的例子：{{t:pot|底池}}裡有 {{n:ex.third.pot}}，對手{{t:bet|下注}} {{n:ex.third.bet}}，也就是 1/3 {{t:pot|底池}}。{{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**。

| 對手下注 | {{t:mdf}} | Alpha | 所需權益 |
|---|---|---|---|
| 1/4 {{t:pot|底池}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 {{t:pot|底池}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|底池}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 {{t:pot|底池}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| 整個{{t:pot}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf}} 不是所需權益

M2 的所需權益針對的是**單一手牌**：用它{{t:call}}是否划算。{{t:mdf}} 針對的是**整個{{t:range|範圍}}**：其中要防守多少比例。在河牌面對 1/3 {{t:pot|底池}}的下注時，{{t:mdf}} 建議你防守約 {{n:mdf.bet-third}} 的手牌，而單次{{t:call}}只要那手牌至少有 {{n:eq.bet-third}} 的機會獲勝就划算。

## 在翻牌圈{{t:out-of-position}}時，你防守得更少

{{t:mdf}} 假設對手的{{t:bluff}}完全沒有勝算。這在河牌最接近事實，因為{{t:draw|聽牌}}已經不會再改善。在翻牌圈，{{t:bluff|詐唬}}還有權益：{{t:draw|聽牌}}和高張都可能改善。此外，你{{t:out-of-position}}時無法實現弱牌的全部權益。所以在翻牌圈{{t:out-of-position}}時，你可以防守得比 {{t:mdf}} 少（在對防守方不利的翻牌上明顯更少），並把它當成參考點，而不是義務；不過面對小額 c-bet，你不會大量{{t:fold|棄牌}}。在一個轉牌的例子中，solver 的平均防守頻率接近 {{t:mdf}}。

:::note 當對手很少{{t:bluff|詐唬}}時
{{t:mdf}} 是用來防範{{t:bluff|詐唬}}夠頻繁的玩家。如果你從觀察中得知，某位玩家在河牌用大額下注{{t:bluff|詐唬}}的次數太少，面對他時你{{t:fold|棄牌}}的頻率要比 {{t:mdf}} 所示的更高：用較弱的{{t:pair|對子}}{{t:call|跟注}}，主要是在付錢給更好的牌。這是{{t:exploit|剝削}}，不是對付所有人的策略（詳見第 10 單元）。
:::
