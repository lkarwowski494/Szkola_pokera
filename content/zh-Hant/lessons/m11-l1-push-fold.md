---
id: m11.l1
module: m11
order: 1
title: "短籌碼：全下或棄牌"
sub: "當加注變成全下"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|錦標賽}}。你有 {{n:m11.depth.10}}，前面所有人都{{t:fold|棄牌}}了。哪種打法既簡單，又有資料來源佐證？"
    options:
      - { text: "全下或{{t:fold}}", correct: true, why: "在約 {{n:m11.thr.pushfold}} 或更少時，各資料來源一致建議 push/fold。先加注、遇到{{t:raise|加注}}再{{t:fold|棄牌}}，會放掉太多籌碼；全下則能從對手身上逼出最多的{{t:fold|棄牌}}。" }
      - { text: "加注到 {{n:pf.open-size}}，被{{t:raise|加注}}後再決定", why: "這樣加注後，你在{{t:pot|底池}}之外只剩很少籌碼，所以面對全下的{{t:raise|加注}}，你幾乎還是得{{t:call|跟注}}。對手不必{{t:fold|棄牌}}，你也失去了棄牌權益。" }
      - { text: "{{t:call|跟注}}盲注（溜入），看翻牌", why: "溜入沒有機會立刻拿下{{t:pot|底池}}。能選擇所有行動的求解器有時會溜入，但那是進階策略；簡單又安全的打法是全下或{{t:fold}}。" }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "你有 {{n:m11.thr.raise}} 或更多，而且第一個{{t:open|開池}}。拿到想玩的手牌時，你會怎麼做？"
    options:
      - { text: "通常加注（例如最小加注）", correct: true, why: "超過約 {{n:m11.thr.raise}} 時，資料來源建議一般加注：你還有空間在面對{{t:raise}}時{{t:fold|棄牌}}，或在翻牌後繼續打。" }
      - { text: "永遠全下", why: "籌碼這麼多還全下，是冒很大的風險只為了贏盲注。比你弱的手牌會{{t:fold|棄牌}}，比你強的手牌才會付錢。" }
      - { text: "像在 {{n:m11.thr.pushfold}} 時一樣 push/fold", why: "Push/fold 是{{t:short-stack|短籌碼}}的工具：用到約 {{n:m11.thr.pushfold}}，較弱的手牌則用到約 {{n:m11.thr.upper}}。" }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "你有 {{n:m11.m.stack}} {{t:chips|籌碼}}。盲注是 {{n:m11.m.sb}}/{{n:m11.m.bb}}，{{t:big-blind}}還另外放 {{n:m11.m.ante}} 前注。你的 M 是多少？"
    answer: m11.m.value
    explanation: "M = 籌碼量 ÷ ({{t:small-blind}} + {{t:big-blind}} + 前注) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}。這就是你不玩牌能撐過的圈數。換算成{{t:big-blind|大盲}}是 {{n:m11.m.bbs}}，但 M 還把前注算進去。"
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "你的 M 降到約 {{n:m11.m.example}}。M 區間模型怎麼說？"
    options:
      - { text: "{{t:red-zone|紅區}}：只能全下或{{t:fold}}，最好第一個入池", correct: true, why: "M 約 {{n:m11.m.red}} 或更低時，你只剩全下或{{t:fold}}。第一個入池，就有機會讓所有人都{{t:fold|棄牌}}。" }
      - { text: "{{t:green-zone|綠區}}：正常打", why: "{{t:green-zone|綠區}}是籌碼量讓你能自由打牌的區間，要到 M 約 {{n:m11.m.green}} 才開始。M 約 {{n:m11.m.example}} 時，籌碼只夠撐 {{n:m11.m.example}} 圈。" }
      - { text: "等 A，反正還有時間", why: "M 約 {{n:m11.m.example}} 時，你還沒等到強牌，盲注就會把籌碼吃光。你得用更寬的{{t:range|範圍}}全下。" }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "你在{{t:small-blind|小盲}}有 {{n:m11.depth.10}}，所有人都{{t:fold|棄牌}}了。把你會全下的手牌塗上顏色。"
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|小盲}}，所有人都{{t:fold|棄牌}}了，你拿到 K2o。在 {{n:m11.depth.10}} 時，求解器會用這手牌全下。那在 {{n:m11.depth.15}} 呢？"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "在 {{n:m11.depth.15}} 時，相對於盲注你冒的風險更大，所以全下的{{t:range}}會從約 {{n:m11.push.10}} 縮小到約 {{n:m11.push.15}} 的手牌。K2o 就被排除在外了。" }
      - { text: "全下，因為 K 是強牌", why: "在 {{n:m11.depth.15}} 時，K2o 太常撞上{{t:call|跟注}}{{t:range|範圍}}裡更大的 K 或 A。求解器會把它{{t:fold|棄掉}}。" }
      - { text: "全下，因為籌碼越深，範圍越寬", why: "正好相反：籌碼越深，全下的{{t:range}}越窄。在籌碼非常{{t:short-stack|短}}時，你{{t:shove|推全下}}的範圍最寬。" }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|小盲}}，{{n:m11.depth.10}}，沒有前注。{{t:big-blind}}每一百次得{{t:fold|棄牌}}幾次，用完全沒勝算的手牌全下才能打平？"
    options:
      - { text: "超過 {{n:m11.push.10.alpha}}", correct: true, why: "你冒 {{n:m11.push.10.risk}} 的風險去贏 {{n:m11.push.10.win}}：{{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) 約為 {{n:m11.push.10.alpha}}。對手不會{{t:fold|棄牌}}到這麼頻繁，所以只有在對手{{t:call|跟注}}時也有權益的手牌，全下才划算。" }
      - { text: "超過一半", why: "如果你冒的風險和能贏的一樣多，一半就夠了。這裡你冒 {{n:m11.push.10.risk}} 的風險，卻只贏 {{n:m11.push.10.win}} 個盲注。" }
      - { text: "只要他偶爾{{t:fold|棄牌}}就夠了", why: "每一次{{t:call}}，都會讓沒勝算的手牌輸掉整個籌碼量。沒有權益時，你需要非常頻繁的{{t:fold|棄牌}}：超過 {{n:m11.push.10.alpha}}。" }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "為什麼拿著{{t:short-stack|短籌碼}}時，你寧可第一個全下，也不要等別人全下再{{t:call|跟注}}？"
    options:
      - { text: "因為全下有兩種贏法", correct: true, why: "第一個入池時，所有人{{t:fold|棄牌}}你就拿下{{t:pot|底池}}，或是在攤牌時贏。{{t:call|跟注}}的話，你只能在攤牌時贏。" }
      - { text: "因為全下的權益總是比較高", why: "手牌的權益和誰先入池無關。差別在於全下給了對手{{t:fold|棄牌}}的機會。" }
      - { text: "因為規則不允許{{t:call|跟注}}全下", why: "可以{{t:call|跟注}}，但{{t:call|跟注}}需要更強的手牌（見{{t:call|跟注}}的課程）。" }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "同樣在{{t:small-blind|小盲}}有 {{n:m11.depth.10}}，但這局採用{{t:bb-ante}}：{{t:big-blind}}放了 {{n:m11.ante}} 前注。全下的{{t:range}}會怎麼變？"
    options:
      - { text: "變大：約 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}，而不是 {{n:m11.push.10}}", correct: true, why: "前注讓對手{{t:fold|棄牌}}時你拿下的{{t:pot|底池}}變大：{{n:m11.push.10.win-ante}}，而不是 {{n:m11.push.10.win}}。沒勝算的手牌現在只需要超過 {{n:m11.push.10.alpha-ante}} 的{{t:fold|棄牌}}，所以有更多全下變得划算。" }
      - { text: "變小，因為對手在{{t:pot|底池}}裡投入更多，會更常{{t:call|跟注}}", why: "對手確實會{{t:call|跟注}}得更寬，但能拿下的{{t:pot}}變大，影響更大。均衡約為 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} 的手牌。" }
      - { text: "不變", why: "前注改變了風險與報酬的比例。沒有前注時約 {{n:m11.push.10}}，有前注時約 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}。" }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
在{{t:tournament|錦標賽}}裡，盲注會上升，籌碼卻不會。遲早你的籌碼會少到一般加注不再管用。這時就輪到 **push/fold** 策略上場：每一手你要玩的牌都{{t:shove|全推}}，也就是全下，其餘的都{{t:fold|棄牌}}。

## 什麼時候全下或{{t:fold}}

籌碼量用{{t:big-blind|大盲}}來算。各資料來源有一點看法一致：在約 **{{n:m11.thr.pushfold}} 或更少**時，你幾乎只會全下或{{t:fold}}。

| 籌碼量 | 通常怎麼做 |
|---|---|
| 約 {{n:m11.thr.pushfold}} 或更少 | 全下或{{t:fold}} |
| {{n:m11.thr.pushfold}} 到 {{n:m11.thr.upper}} | 較弱和中等手牌用 push/fold |
| 超過約 {{n:m11.thr.raise}} | 一般加注 |

為什麼不加注？當你有 {{n:m11.depth.10}} 並加注到 {{n:pf.open-size}}，你在{{t:pot|底池}}之外剩下的籌碼少到面對全下的{{t:raise}}時，你幾乎還是得{{t:call|跟注}}。對手知道你不會{{t:fold|棄牌}}，所以沒什麼好怕的。直接全下，能從籌碼裡榨出最多的**棄牌權益**，也就是對手{{t:fold|棄牌}}帶來的獲利。

:::note 簡化
Push/fold 是一種簡化。也能選擇溜入和小加注的求解器，在 {{n:m11.depth.10}} 時會用部分手牌溜入或最小加注。不過全下或{{t:fold}}很簡單，很難因此犯下大錯，資料來源也推薦把它當作起點。
:::

## M：你能撐過幾圈

有一種常見的錦標賽模型用另一種方式衡量{{t:short-stack}}：**M** 是你的籌碼量除以牌桌玩家打一圈的成本。

```formula
M = 籌碼量 ÷ (小盲 + 大盲 + 前注)
```

例如：你有 {{n:m11.m.stack}} {{t:chips|籌碼}}，盲注 {{n:m11.m.sb}}/{{n:m11.m.bb}}，{{t:bb-ante}} {{n:m11.m.ante}}。M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**。換算成{{t:big-blind|大盲}}是 {{n:m11.m.bbs}}，但 M 還把前注算進去。M 約 {{n:m11.m.red}} 或更低時（{{t:red-zone}}），你只剩全下或{{t:fold}}。

## 籌碼越短，範圍越寬

本課的格子由這個 App 的求解器計算，情境是最簡單的一種：所有人都{{t:fold|棄牌}}了，你從{{t:small-blind|小盲}}對{{t:big-blind|大盲}}，而且每個人都只能全下或{{t:fold|棄牌}}。

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

在 {{n:m11.depth.15}} 時，你用約 {{n:m11.push.15}} 的手牌全下；在 {{n:m11.depth.10}} 時約 {{n:m11.push.10}}；到了 {{n:m11.depth.5}} 已達約 {{n:m11.nash.push.5}}–{{n:m11.push.5}}。相對於盲注冒的風險越小，划算的手牌就越多。作為比較，某個訓練網站的表格在 {{n:m11.depth.10}} 時列出 {{n:m11.ext.push.10}}；差距在求解器驗證的容許誤差內，方向也相同。

## 三人局：後面的對手越多，範圍越緊

從按鈕位打時，你後面還有兩名玩家，而不是一名。他們每個人都可能拿到強牌，所以兩人都{{t:fold|棄牌}}的情況比較少見。三人局、每人籌碼 {{n:m11.depth.3max}} 時，按鈕位用約 {{n:m11.3max.push.btn}} 的手牌全下；按鈕位{{t:fold|棄牌}}後，{{t:small-blind}}則用約 {{n:m11.3max.push.sb}}。

```range
push.btn-3max
```

```range
push.sb-3max
```

我們用同一情境已發表的均衡結果核對過這兩張格子（2008 年的一篇學術論文：按鈕位 {{n:m11.jamfold3.btn}}）。少數結果不一致的手牌不會出現在練習中。

## 兩種贏法

全下會在對手{{t:fold|棄牌}}時贏，或在對手{{t:call|跟注}}並在攤牌輸掉時贏。光靠對手{{t:fold}}很少足夠：在 {{n:m11.depth.10}} 時，你冒 {{n:m11.push.10.risk}} 的風險去拿 {{n:m11.push.10.win}} 個盲注，所以沒勝算的手牌需要對手在超過 {{n:m11.push.10.alpha}} 的情況下{{t:fold|棄牌}}。因此棄牌權益和對手{{t:call|跟注}}時手牌的權益都很重要。

## 前注讓{{t:range}}變寬

前注是發牌前額外放進{{t:pot|底池}}的{{t:chips}}。採用{{t:bb-ante}}時，{{t:big-blind}}放 {{n:m11.ante}} 前注，所以全下能拿到 {{n:m11.push.10.win-ante}}，而不是 {{n:m11.push.10.win}}，風險卻不變。在這種結構下，{{t:range|範圍}}從約 {{n:m11.push.10}} 擴大到約 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} 的手牌（App 的求解器和一項獨立的均衡計算只差不到一個百分點）。

```range
push.sb-10-ante
```
