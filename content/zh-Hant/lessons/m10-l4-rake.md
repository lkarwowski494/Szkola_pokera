---
id: m10.l4
module: m10
order: 4
title: "抽水"
sub: "玩牌要付多少成本，又會如何改變你的決策"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "你在一家大型線上平台玩 NL10 6-max。和低{{t:stakes|級別}}典型贏家的贏率相比，{{t:rake}}有多大？"
    options:
      - { text: "大好幾倍：約 {{n:rake.micro.low}}–{{n:rake.micro.high}}，對比 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "把各平台的抽水規則換算成 bb/100，微級別約為 {{n:rake.micro.low}}–{{n:rake.micro.high}}。贏家贏對手的幅度必須大於{{t:rake}}，多出來的部分才是他的贏率。" }
      - { text: "差不多", why: "微級別的{{t:rake}}約為 {{n:rake.micro.low}}–{{n:rake.micro.high}}，典型贏率則是 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}。差距有好幾倍。" }
      - { text: "小到可以忽略，因為平台只抽{{t:pot|底池}}的幾個百分點", why: "每個翻牌後的{{t:pot|底池}}都抽幾個百分點，累積起來約為 {{n:rake.micro.low}}–{{n:rake.micro.high}}。這比典型贏家贏的還多。" }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "在一份 6-max 現金局玩家群體報告中，NL100 每位玩家平均輸 {{n:rake.pop.nl100.loss}}。這個損失從何而來？"
    options:
      - { text: "就是{{t:rake}}：沒有它，玩家整體會打平", correct: true, why: "玩家彼此對戰，一人贏的就是另一人輸的。平均而言，所有人輸掉的只有平台抽走的部分。作者說：「your biggest villain is the house」。" }
      - { text: "因為大多數玩家打得很差", why: "打得差會讓錢從較弱的玩家流向較強的玩家，但不會改變平均值。只有{{t:rake}}會拉低平均值。" }
      - { text: "來自{{t:variance|變異數}}：樣本更大時會回到零", why: "{{t:variance|變異數}}，也就是結果在{{t:expected-value|期望值}}周圍的分散程度，會讓個別玩家的結果往兩個方向偏。整個群體的平均是負的，因為人人都要付{{t:rake}}。" }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "根據同一份資料作者的估計（經貝氏校正），在至少有 {{n:rake.pop.reg.hands}} 手牌的玩家中，約 {{n:rake.pop.reg.prerake}} 在扣除{{t:rake|抽水}}前是贏的。扣除後有多少人是贏的？"
    options:
      - { text: "約 {{n:rake.pop.reg.postrake}}", correct: true, why: "{{t:rake}}讓贏家少了將近一半：扣抽水前約 {{n:rake.pop.reg.prerake}}，扣抽水後約 {{n:rake.pop.reg.postrake}}。所以贏率一律要用扣抽水後的數字計算。" }
      - { text: "幾乎一樣多，約 {{n:rake.pop.reg.prerake}}", why: "如果{{t:rake}}很小，確實會這樣。但抽水達到好幾 bb/100 時，許多扣抽水前是贏的玩家會跌到零以下。" }
      - { text: "幾乎沒有人", why: "言過其實：這群人中約 {{n:rake.pop.reg.postrake}} 仍然是贏的。{{t:rake}}是很大的障礙，但並沒有斷絕贏錢的路。" }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "為什麼在 NL500，以 bb/100 計的{{t:rake}}（{{n:rake.nl500.low}}–{{n:rake.nl500.high}}）比微級別小好幾倍？"
    options:
      - { text: "因為較大的{{t:pot|底池}}更常觸及{{t:rake-cap|抽水上限}}，而這個上限在那裡換算成 bb 很小", correct: true, why: "平台抽取{{t:pot|底池}}的一定百分比，但不超過以美元計的上限。在微級別，上限相當於很多 bb，{{t:pot|底池}}很少觸及，所以你付的是全額百分比。在 NL500，同樣的上限還不到 1 bb。" }
      - { text: "因為在 NL500 平台抽的百分比較小", why: "百分比往往差不多（約 {{n:rake.ex.pct}}）。造成差異的是{{t:rake-cap|抽水上限}}，在高{{t:stakes|級別}}它會壓低大{{t:pot|底池}}的抽水。" }
      - { text: "因為在 NL500 每小時玩的手數較少", why: "bb/100 算的是每 100 手的{{t:rake}}，所以遊戲節奏不會改變它。改變它的是以 bb 表示的{{t:rake-cap|抽水上限}}。" }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:bet|下注}} {{n:ex.bet.half}}。平台抽取{{t:pot|底池}}的 {{n:rake.ex.pct}}，且觸及不到{{t:rake-cap|上限}}。你需要多少權益才能{{t:call|跟注}}？請輸入百分比。"
    answer: eq.bet-half.rake
    explanation: "{{t:call|跟注}}後{{t:pot|底池}}有 {{n:ex.half.total}}，扣掉抽水後剩 {{n:rake.ex.pot-after}}。你要補 {{n:ex.bet.half}}，所以需要 {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}}，而不是沒有抽水時的 {{n:eq.bet-half}}。"
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "沒有{{t:rake|抽水}}時，面對半{{t:pot|底池}}下注的{{t:call}}需要 {{n:eq.bet-half}} 權益。{{t:rake|抽水}}為 {{n:rake.ex.pct}} 時需要多少？"
    options:
      - { text: "多一點：約 {{n:eq.bet-half.rake}}", correct: true, why: "你贏得的是扣除{{t:rake}}後的{{t:pot|底池}}，付出的卻是全額。不計抽水時剛好高於門檻的牌，計入抽水後可能已經低於門檻。" }
      - { text: "一樣，因為兩位玩家都要付{{t:rake}}", why: "{{t:rake}}是從你贏得的{{t:pot|底池}}中扣除，而不是從你補的金額中扣。門檻會升到約 {{n:eq.bet-half.rake}}。" }
      - { text: "較少，因為{{t:pot}}更大", why: "扣抽水後的{{t:pot}}是變小而不是變大，所以你需要更多權益：約 {{n:eq.bet-half.rake}}。" }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "你在一家只對打到翻牌的{{t:pot|底池}}收取{{t:rake}}的平台上玩。你前面有人{{t:open|開池}}，你有{{t:position|位置}}，手上的牌在沒有抽水時正處於{{t:call|跟注}}的邊緣。{{t:rake}}會改變什麼？"
    options:
      - { text: "較少{{t:call|跟注}}：處於{{t:call|跟注}}邊緣的牌更常{{t:fold|棄牌}}或 3-bet", correct: true, why: "在已發表的含抽水求解器解中，有{{t:position|位置}}的玩家面對{{t:open|開池}}時少玩約 {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} 的牌。吃虧的是{{t:call|跟注}}本身，因為翻牌後的{{t:pot}}要付{{t:rake}}，而翻牌前靠 3-bet 贏下的{{t:pot}}不用。" }
      - { text: "沒有改變：{{t:rake}}只影響翻牌後的打法", why: "正因如此，它才會改變翻牌前的決策：{{t:call|跟注}}會打到翻牌並被抽水，而 3-bet 或{{t:fold}}常常在沒有抽水的情況下就結束這手牌。" }
      - { text: "更常{{t:call|跟注}}，因為翻牌後的{{t:pot|底池}}很大", why: "正好相反：{{t:rake}}抽走的正是這些{{t:pot|底池}}的一部分。含抽水的求解器{{t:call|跟注}}明顯較少。" }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "在同一批求解器解中，含抽水時，{{t:big-blind}}面對最小加注，在不含抽水時會{{t:call|跟注}}的情況中，只有約 {{n:rake.solver.bb-minraise}} 仍然{{t:call|跟注}}。這對你在{{t:big-blind|大盲}}時意味著什麼？"
    options:
      - { text: "仍然防守很多牌，但比不含抽水算出的表格更緊", correct: true, why: "{{t:big-blind}}仍然常防守，因為它已有{{t:chips|籌碼}}在{{t:pot|底池}}裡，而且能結束這輪行動。但{{t:rake}}會砍掉最弱的{{t:call|跟注}}，所以不含抽水的表格對你來說太寬。" }
      - { text: "不再用{{t:call|跟注}}防守{{t:big-blind|大盲}}", why: "不對：作者認為，含抽水時從盲注位{{t:call|跟注}}仍是策略的重要部分。改變的是防守的寬度，而不是要不要防守。" }
      - { text: "照樣防得一樣寬，因為在{{t:big-blind|大盲}}時{{t:rake}}不影響", why: "會影響：{{t:call|跟注}}後{{t:pot}}會打到翻牌並被收取{{t:rake}}。所以求解器在{{t:big-blind|大盲}}{{t:call|跟注}}較少。" }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "有些平台對翻牌前就結束的 3-bet {{t:pot|底池}}也收取{{t:rake}}。這對「3-bet 不用付抽水」的論點有什麼影響？"
    options:
      - { text: "在這種平台上，這個論點會變弱：3-bet 也要付，所以 3-bet 相對{{t:call|跟注}}的優勢較小", correct: true, why: "求解器的結果適用於「no flop, no drop」結構，也就是沒打到翻牌的{{t:pot}}不收抽水。在這種平台上，這條規則只涵蓋沒有 3-bet 的{{t:pot|底池}}，所以{{t:call|跟注}}仍會因抽水吃虧，但 3-bet 也不再免抽水。" }
      - { text: "沒有影響，因為 3-bet 的{{t:rake}}小到可以忽略", why: "沒有針對特定平台計算，我們無法得知。唯一確定的是 3-bet 不再免抽水。" }
      - { text: "在這種平台上應該一律{{t:call|跟注}}而不是 3-bet", why: "{{t:call|跟注}}會打到翻牌，並和以前一樣付{{t:rake}}。唯一的改變是 3-bet 也要付。" }
---
{{t:rake}}是平台從{{t:pot|底池}}中收取的費用。玩家彼此對戰，所以如果沒有{{t:rake}}，玩家整體會打平。有了抽水，平均玩家輸掉的剛好就是平台抽走的金額，而贏家贏對手的幅度必須大於{{t:rake}}。

## 要付多少

平台抽取{{t:pot|底池}}的一定百分比，但不超過以美元計的{{t:rake-cap|抽水上限}}。在兩家最大的線上平台，NL2–NL10 是{{t:pot|底池}}的 {{n:rake.ex.pct}}。在微級別，{{t:pot|底池}}很少觸及上限，所以你付的是全額百分比。

一份平台抽水規則的比較，依據數百萬手牌的{{t:pot|底池}}分布，把這些規則換算成 bb/100：

| {{t:stakes|級別}}（6-max，兩家最大的線上平台） | {{t:rake}} |
|---|---|
| NL2–NL25 | 約 {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | 約 {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

低{{t:stakes|級別}}的典型贏家贏率是 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}（第 12 單元）：比他付給平台的少好幾倍。在較高{{t:stakes|級別}}，同樣以美元計的上限還不到 1 bb，所以以 bb/100 計的{{t:rake}}會下降。

玩家群體資料也顯示同樣的結果。在一份玩家群體報告中（6-max 現金局，NL10–NL500），每位玩家平均在 NL10 輸 {{n:rake.pop.nl10.loss}}、在 NL100 輸 {{n:rake.pop.nl100.loss}}、在 NL500 輸 {{n:rake.pop.nl500.loss}}。根據作者的估計（貝氏校正），在至少有 {{n:rake.pop.reg.hands}} 手牌的 NL100 玩家中，約 {{n:rake.pop.reg.prerake}} 在扣除抽水前是贏的，扣除後約為 {{n:rake.pop.reg.postrake}}（原始資料中為 {{n:rake.pop.reg.prerake.raw}} 和 {{n:rake.pop.reg.postrake.raw}}）。

## 含抽水的{{t:call|跟注}}門檻

你贏得的是扣除{{t:rake}}後的{{t:pot|底池}}，付出的卻是全額。第 2 單元的所需權益因此提高：

```formula
所需權益 = 補注金額 ÷ ({{t:call|跟注}}後的{{t:pot}} × (1 − {{t:rake}}))
```

在 {{n:ex.pot}} 的{{t:pot|底池}}中下注 {{n:ex.bet.half}}：沒有抽水時你需要 {{n:eq.bet-half}}，抽水 {{n:rake.ex.pct}} 時需要 {{n:eq.bet-half.rake}}。單一手牌中差異不大，但每個翻牌後的{{t:pot|底池}}都會受影響。

## {{t:rake}}對翻牌前的影響

在許多平台上，{{t:rake}}只對打到翻牌的{{t:pot|底池}}收取（「no flop, no drop」）。這時翻牌前贏下的{{t:pot}}不用付抽水，而{{t:call|跟注}}後的{{t:pot}}要付。在已發表的 NL100 含抽水求解器解中：

- 有{{t:position|位置}}的玩家面對{{t:open|開池}}時少玩約 {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} 的牌；吃虧的主要是{{t:call|跟注}}，3-bet 則稍微增加；
- {{t:big-blind}}面對最小加注，在不含抽水時會{{t:call|跟注}}的情況中，只有約 {{n:rake.solver.bb-minraise}} 仍然{{t:call|跟注}}，不過盲注位的防守仍以{{t:call|跟注}}為主。

基於同樣的理由，第 3 單元中你在{{t:small-blind|小盲}}{{t:raise|加注}}或{{t:fold|棄牌}}，不補齊到{{t:big-blind|大盲}}。有些平台對翻牌前就結束的 3-bet {{t:pot|底池}}也收取{{t:rake}}；在那裡，3-bet 並不免抽水。

:::note 資料來源
抽水水準：2026 年線上平台抽水比較（兩家最大平台的抽水規則換算成 bb/100，2026 年 10 月 5 日查閱）；其他平台的數字不同。玩家群體損失：一份獨立的玩家群體報告（6-max NLHE 現金局，使用手牌追蹤資料庫的平台，至少有 100 手牌的玩家；作者未說明是哪些平台及期間）。抽水對翻牌前打法的影響：一篇已發表的翻牌前加注尺度文章，{{n:rake.solver.depth}} 籌碼深度的求解器解；作者表示結論大致適用於其他賽制，因此用於 {{n:format.stack}} 籌碼深度屬於簡化。權益門檻是計算結果。
:::
