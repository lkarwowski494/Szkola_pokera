---
id: m10.l3
module: m10
order: 3
title: "偏離基準策略"
sub: "用哪些手牌、偏離多遠"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "你知道對手在這條路線中{{t:bluff|詐唬}}的頻率比均衡時稍高。你會先改變哪些手牌的決策？"
    options:
      - { text: "基準策略中在{{t:call|跟注}}與{{t:fold|棄牌}}之間混合的手牌：現在一律{{t:call|跟注}}", correct: true, why: "在均衡中，這些手牌是無差異的，因為對手的{{t:bluff|詐唬}}剛好是所需的數量。只要{{t:bluff|詐唬}}稍微多一點，{{t:call|跟注}}的收益就會高於{{t:fold|棄牌}}。" }
      - { text: "最弱的手牌，也就是基準策略中一律{{t:fold|棄牌}}的手牌", why: "這些手牌甚至會輸給部分{{t:bluff|詐唬}}，或需要{{t:bluff|詐唬}}多出更多才行。只有在對手大幅偏離均衡時，它們才會改變。" }
      - { text: "最強的手牌：現在改為{{t:raise|加注}}", why: "最強的手牌本來就會繼續玩下去。改變是從處於決策邊緣的手牌開始。" }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "在一個已公開的 solver 範例中，對手在河牌的下注有約{{n:overbluff.lock}}是{{t:bluff|詐唬}}，而不是約{{n:overbluff.base}}。面對他的下注，你用抓{{t:bluff|詐唬}}的手牌應對時，有什麼改變？"
    options:
      - { text: "不再{{t:fold|棄牌}}：基準策略中混合的手牌，現在一律{{t:call|跟注}}", correct: true, why: "這樣就足以讓鎖定對手策略的解中，防守轉為純{{t:call|跟注}}。無差異的手牌會對最小的{{t:bluff|詐唬}}過量做出反應。" }
      - { text: "幾乎不變：幾個百分點太少，改變不了什麼", why: "對無差異的手牌來說，幾個百分點已經很多：在均衡中，{{t:call|跟注}}與{{t:fold|棄牌}}對它們的結果相同，所以任何{{t:bluff|詐唬}}過量都會讓天平倒向{{t:call|跟注}}。" }
      - { text: "開始用抓{{t:bluff|詐唬}}的手牌{{t:raise|加注}}", why: "{{t:raise|加注}}會逼走對手的{{t:bluff|詐唬}}，而更好的手牌會{{t:call|跟注}}。抓{{t:bluff|詐唬}}的手牌靠{{t:call|跟注}}賺錢。" }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "你知道對手在某條路線中{{t:bluff|詐唬}}的頻率低於均衡。一手抓{{t:bluff|詐唬}}的牌，在基準策略中有時{{t:call|跟注}}、有時{{t:fold|棄牌}}，你會怎麼打？"
    options:
      - { text: "一律{{t:fold|棄牌}}", correct: true, why: "當{{t:bluff|詐唬}}少於均衡所需，無差異的手牌{{t:call|跟注}}就會虧損。solver 的結果：{{t:bluff|詐唬}}不足時，一律{{t:fold|棄牌}}。" }
      - { text: "一律{{t:call|跟注}}，以免對手用{{t:bluff|詐唬}}占我便宜", why: "{{t:bluff|詐唬}}太少的對手，無法利用你的{{t:fold|棄牌}}。是你藉由{{t:fold|棄牌}}利用他的錯誤。" }
      - { text: "照基準策略打，一半一半", why: "只有兩種決策結果相同時，混合才有意義。{{t:bluff|詐唬}}不足時，{{t:fold|棄牌}}的收益更高。" }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "你在{{n:ex.pot}}的{{t:pot|底池}}中{{t:bet|下注}}{{n:cbet.ex.small}}作為 c-bet，手上完全沒有牌。對手必須多常{{t:fold|棄牌}}，這個{{t:bluff|詐唬}}才能損益兩平？請輸入百分比。"
    answer: alpha.cbet.small
    explanation: "門檻是 下注 ÷ ({{t:pot|底池}} + 下注) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}。fold to c-bet 明顯高於這個數字的對手，{{t:fold|棄牌}}頻率高到即使沒有牌，c-bet 也能賺錢。"
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "對手在{{n:hud.ex.reg.hands}}手牌中的 fold to c-bet 為{{n:hud.ex.fcb.high}}。你在{{t:dry|乾燥}}的翻牌上什麼都沒中。沒有牌時下 1/3 {{t:pot|底池}}的 c-bet 划算嗎？"
    options:
      - { text: "划算：對手{{t:fold|棄牌}}的頻率高於{{n:alpha.cbet.small}}，所以 c-bet 立即獲利", correct: true, why: "1/3 {{t:pot|底池}}的 c-bet 在{{t:fold|棄牌}}率{{n:alpha.cbet.small}}時損益兩平。對手{{t:fold|棄牌}}的頻率高得多，所以在你計算手牌的權益之前，c-bet 就已經獲利。fold to c-bet 綜合了所有下注尺度和牌桌，因此只是近似值。" }
      - { text: "不划算：沒有牌就不下注", why: "{{t:bluff|詐唬}}不需要牌，需要的是對手{{t:fold|棄牌}}。當對手{{t:fold|棄牌}}的頻率高於{{n:alpha.cbet.small}}，c-bet 用任何手牌都能賺錢。" }
      - { text: "只用大尺度，因為小注逼不走手牌", why: "下注越大，需要的{{t:fold|棄牌}}越多：3/4 {{t:pot|底池}}時高達{{n:alpha.cbet.big}}。如果對手本來就常{{t:fold|棄牌}}，小 c-bet 能用更低的成本做到。" }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "對手在{{n:hud.ex.reg.hands}}手牌中的 fold to c-bet 為{{n:hud.ex.fcb.low}}。你沒中翻牌，也沒有{{t:draw|聽牌}}。你考慮下 3/4 {{t:pot|底池}}的 c-bet。你怎麼做？"
    options:
      - { text: "{{t:check|過牌}}：這位對手{{t:fold|棄牌}}的頻率低於大 c-bet 所需", correct: true, why: "3/4 {{t:pot|底池}}的 c-bet 要到{{n:alpha.cbet.big}}的{{t:fold|棄牌}}率才損益兩平，而對手的{{t:fold|棄牌}}率是{{n:hud.ex.fcb.low}}。沒有牌也沒有 outs，這種{{t:bluff|詐唬}}會虧損。" }
      - { text: "下注，因為 c-bet 是標準打法", why: "沒有牌的 c-bet，只有在對手{{t:fold|棄牌}}夠頻繁，或手牌有權益時才是好的。這裡兩者都沒有。" }
      - { text: "全下，逼對手{{t:fold|棄牌}}", why: "下注越大，需要的{{t:fold|棄牌}}越多。很少{{t:fold|棄牌}}的對手，不會因為你{{t:bet|下注}}更多就更常{{t:fold|棄牌}}。" }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "一位 fold to 3-bet 為{{n:mda.rec.f3b}}的{{t:recreational|娛樂玩家}}從{{t:cutoff|關煞位}}{{t:open|開池}}。你在按鈕位。在基準策略中，KJs 有時{{t:call|跟注}}，A5s 有時用來 3-bet {{t:bluff|詐唬}}。面對這位玩家你怎麼打？"
    options:
      - { text: "KJs 3-bet 拿{{t:value|價值}}，A5s 不拿來 3-bet {{t:bluff|詐唬}}", correct: true, why: "面對 3-bet 很少{{t:fold|棄牌}}的玩家，常會用較弱的手牌{{t:call|跟注}}，所以較強的手牌靠 3-bet 賺錢。3-bet {{t:bluff|詐唬}}要在{{t:fold|棄牌}}率超過{{n:alpha.vs-3bet-ip-size}}時才會立即獲利，而這位玩家的{{t:fold|棄牌}}率是{{n:mda.rec.f3b}}。" }
      - { text: "3-bet A5s，因為帶{{t:blocker|阻擋牌}}的{{t:bluff|詐唬}}是好的 3-bet", why: "在基準策略中是這樣，那是面對約一半時候會{{t:fold|棄牌}}的對手。這位對手的{{t:fold|棄牌}}率是{{n:mda.rec.f3b}}，所以這個{{t:bluff|詐唬}}幾乎總是拿弱牌打大{{t:pot|底池}}。" }
      - { text: "KJs 只{{t:call|跟注}}，以免嚇跑對手", why: "面對會用較弱手牌{{t:call|跟注}} 3-bet 的玩家，用 KJs 3-bet 能以更好的手牌、在有{{t:position|位置}}的情況下做大{{t:pot|底池}}。這比單純{{t:call|跟注}}更好。" }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "根據線上微注級別（NL25）的族群數據，{{t:regular|常規玩家}}面對 3-bet 的{{t:fold|棄牌}}率為{{n:mda.reg.f3b}}，{{t:recreational|娛樂玩家}}則為{{n:mda.rec.f3b}}。有{{t:position|位置}}時 3-bet 到{{n:pf.3bet.ip-total}}，要在{{t:fold|棄牌}}率超過{{n:alpha.vs-3bet-ip-size}}時，沒有牌也能獲利。這代表什麼？"
    options:
      - { text: "面對{{t:recreational|娛樂玩家}}，3-bet 時幾乎不帶{{t:bluff|詐唬}}；面對{{t:regular|常規玩家}}，{{t:bluff|詐唬}}保留，但只用有權益的手牌", correct: true, why: "沒有任何族群{{t:fold|棄牌}}頻繁到讓 3-bet 在沒有牌時也能獲利。基準策略中的 3-bet {{t:bluff|詐唬}}靠翻牌後的權益和對手{{t:fold|棄牌}}獲利；面對{{t:fold|棄牌}}率{{n:mda.rec.f3b}}的玩家，主要只剩權益，所以你用{{t:linear|線性}}{{t:range|範圍}} 3-bet。" }
      - { text: "用任何手牌 3-bet 所有人，因為大家都很常{{t:fold|棄牌}}", why: "這裡沒有人{{t:fold|棄牌}}的頻率高於{{n:alpha.vs-3bet-ip-size}}。用任何手牌 3-bet 都會虧損。" }
      - { text: "面對{{t:recreational|娛樂玩家}}，完全不再 3-bet", why: "正好相反：會用較弱手牌{{t:call|跟注}} 3-bet 的玩家，會付錢給你的強牌。你改變的是 3-bet 的組成，而不是放棄 3-bet。" }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "{{n:hud.ex.mid.hands}}手牌後，對手看起來鬆而被動，但樣本很小。你要偏離基準策略多遠？"
    options:
      - { text: "稍微偏離，朝讀牌的方向，而且只用邊緣手牌", correct: true, why: "小樣本中就能看出方向，但數字誤差很大。把處於決策邊緣的手牌朝讀牌方向調整，其餘照基準策略打，直到樣本變大。" }
      - { text: "全力偏離：立刻用最大程度的{{t:exploit|剝削}}對付他", why: "樣本小時，讀牌可能是錯的。大幅偏離基準策略本身就會被利用：基準策略是最不容易被利用的策略。" }
      - { text: "完全不偏離，直到我有一千手牌", why: "太保守了。{{n:hud.ex.mid.hands}}手牌時的讀牌方向已經有意義，而且你能以很低的成本調整邊緣手牌。" }
---
{{t:exploit|剝削}}不是取代基準策略，而是移動它。你先知道均衡怎麼打（模組 3–9），再從數據看出對手往哪個方向偏離，然後把自己的打法往同一個方向移動。問題在於：用哪些手牌、偏離多遠。

## 先從{{t:mixed-hand|混合手牌}}開始

在均衡中，有些手牌會採取兩種行動，例如有時{{t:call|跟注}}、有時{{t:fold|棄牌}}。這樣做是因為兩種行動的結果相同：對手的{{t:bluff|詐唬}}數量剛好讓這手牌無差異。最先對對手錯誤做出反應的，就是這些手牌：

- 對手{{t:bluff|詐唬}}太多：{{t:mixed-hand|混合手牌}}一律{{t:call|跟注}}；
- 對手{{t:bluff|詐唬}}太少：{{t:mixed-hand|混合手牌}}一律{{t:fold|棄牌}}。

不需要太大的差距。在一個已公開的 solver 範例中（按鈕位在下注、{{t:check|過牌}}、下注的路線後於河牌下注），對手的{{t:bluff|詐唬}}從約{{n:overbluff.base}}變為約{{n:overbluff.lock}}，就讓{{t:big-blind|大盲}}的防守轉為純{{t:call|跟注}}。基準策略中一律{{t:fold|棄牌}}或一律繼續的手牌，只有在對手大幅偏離均衡時才會改變決策。

## 用門檻計算{{t:bluff|詐唬}}

沒有牌的{{t:bluff|詐唬}}是否划算，看模組 6 的{{t:alpha|alpha}}：

```formula
當對手{{t:fold|棄牌}}的頻率高於以下數值時，{{t:bluff|詐唬}}獲利：下注 ÷ (底池 + 下注)
```

1/3 {{t:pot|底池}}的 c-bet 是{{n:alpha.cbet.small}}，3/4 {{t:pot|底池}}是{{n:alpha.cbet.big}}。{{t:hud|HUD}}上的 fold to c-bet 能顯示對手在門檻之上還是之下。這只是近似值：這項數據綜合了所有下注尺度和翻牌，而且你的手牌通常還有一些權益。在擊中對手{{t:range|範圍}}的翻牌上，他{{t:fold|棄牌}}的頻率會低於平均。

線上微注級別（NL25）族群的玩家，面對翻牌 c-bet 平均有{{n:mda.all.fcb}}會{{t:fold|棄牌}}。這不一定是錯誤：solver 在翻牌{{t:out-of-position|無位置}}時，{{t:fold|棄牌}}的頻率也會高於{{t:mdf|MDF}}所示（模組 6）。因此，光是族群平均高於門檻，並不足以支持沒有牌時的 c-bet；你需要對特定對手的讀牌，或是沒有擊中他{{t:range|範圍}}的翻牌。

## 3-bet 不{{t:fold|棄牌}}的玩家

有{{t:position|位置}}時 3-bet 到{{n:pf.3bet.ip-total}}，只有在對手{{t:fold|棄牌}}的頻率高於{{n:alpha.vs-3bet-ip-size}}時，完全沒有牌也能獲利（模組 4）。線上微注級別（NL25）的族群數據：

| 族群 | Fold to 3-bet |
|---|---|
| {{t:regular|常規玩家}} | {{n:mda.reg.f3b}} |
| {{t:recreational|娛樂玩家}} | {{n:mda.rec.f3b}} |

在基準策略中，3-bet {{t:bluff|詐唬}}靠對手{{t:fold|棄牌}}和翻牌後的權益獲利。面對{{t:fold|棄牌}}率{{n:mda.rec.f3b}}的玩家，幾乎沒有{{t:fold|棄牌}}可賺，但他會用較弱的手牌{{t:call|跟注}}。所以你用{{t:linear|線性}}{{t:range|範圍}} 3-bet 他：更多強牌拿{{t:value|價值}}，幾乎不帶{{t:bluff|詐唬}}。兩份教學資料中的教練把這條界線定在 fold to 3-bet 約{{n:hud.f3b.low}}。

## 小樣本，小偏離

樣本越小，數據的誤差越大（第 1 課）。樣本小時，你只調整邊緣手牌，而且只朝讀牌的方向調整。大幅偏離、涵蓋整個{{t:range|範圍}}，只有在樣本夠大且對手錯誤明顯時才有意義。偏離基準策略本身就是一種錯誤，好的對手可以加以利用。

:::note 資料來源
{{t:mixed-hand|混合手牌}}的原則來自一份已公開、鎖定對手策略的 solver 分析（solver 的解，不是族群數據）。{{t:alpha|alpha}}門檻是計算結果。族群的 fold to 3-bet 與 fold to c-bet 來自公開的統計資料庫（一個大型線上平台，NL25–NL100，2026 年 10 月之前的{{n:mda.period.months}}個月）。fold to 3-bet 的界線與「小樣本，小偏離」原則，是兩份教學資料中的建議。
:::
