---
id: m3.l3
module: m3
order: 3
title: "開池範圍"
sub: "第一個入池時該用哪些手牌，逐個位置看"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "你前面的玩家都已{{t:fold|棄牌}}，你在按鈕位。請塗出你會用來{{t:open|開池}}的手牌。"
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "你是第一個行動的人（{{t:utg|UTG}}）。請塗出你會用來{{t:open|開池}}的手牌。"
---
{{t:open|開池}}{{t:range|範圍}}是指在你前面的玩家都已{{t:fold|棄牌}}時，你會用來{{t:raise|加注}}的手牌清單。下方的表格由本 App 的翻牌前求解器計算，適用於 6 人桌、籌碼量為 {{n:format.stack}} 的牌局。

## 如何閱讀表格

每個格子代表一種手牌。對角線上方是同花色手牌（例如 AKs），下方是不同花色手牌（例如 AKo），對角線上則是{{t:pair|對子}}。綠色格子代表{{t:raise}}，空白格子代表{{t:fold}}。部分填色的格子表示求解器只在某些時候玩這手牌。如果它{{t:open|開池}}這手牌的頻率介於 {{n:range.mixed.low}} 到 {{n:range.mixed.high}} 之間（這些門檻是 App 的設定），這就是{{t:mixed-hand|混合手牌}}：在練習中兩種答案都算對。求解器採取頻率低於 {{n:range.mixed.low}}、但至少 {{n:range.mixed.min}} 的行動，練習會視為可接受：這不算錯誤，但這道題的複習會更快再出現。求解器採取頻率低於 {{n:range.mixed.min}} 的行動，練習會評為不精確（求解器網站公布的評分標準就是這樣稱呼這類打法），而求解器完全不採取的行動則評為錯誤。

## 從第一個{{t:position|位置}}到按鈕位

```range
rfi.utg
```

在 {{t:utg|UTG}}，求解器會{{t:open|開池}} {{n:solver.rfi.utg}} 的手牌。專業資料給出的數字是 {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}。

```range
rfi.hj
```

```range
rfi.co
```

每往按鈕位靠近一個{{t:position|位置}}，{{t:range}}就會變大：{{t:hijack|HJ}} {{t:open|開池}} {{n:solver.rfi.hj}}，{{t:cutoff|CO}} 則已達 {{n:solver.rfi.co}} 的手牌。

```range
rfi.btn
```

在按鈕位，求解器{{t:open|開池}}的手牌已達 {{n:solver.rfi.btn}}，因為後面只剩盲注位，而且翻牌後你擁有{{t:position|位置}}優勢。

```range
rfi.sb
```

{{t:small-blind|小盲}}只需要對抗{{t:big-blind|大盲}}，所以{{t:open|開池}}的寬度和按鈕位差不多：約 {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} 的手牌，即使翻牌後它是第一個行動。在微{{t:stakes|級別}}，你在{{t:small-blind|小盲}}要嘛{{t:raise|加注}}，要嘛{{t:fold|棄牌}}，不要補到{{t:big-blind|大盲}}：從{{t:pot|底池}}收取的{{t:rake}}會降低補注的獲利。這是一種簡化：有些求解器的解法會用{{t:small-blind|小盲}}的部分手牌補注。本 App 的求解器在這個位置{{t:open|開池}} {{n:solver.rfi.sb}} 的手牌，落在資料給出的區間內。

:::note 在 9 人桌
在 9 人桌，{{t:hijack|HJ}} 前面還有三個{{t:position|位置}}：{{t:utg|UTG}}、{{t:utg|UTG}}+1 和 {{t:utg|UTG}}+2，接著是 LJ。這時 {{t:utg|UTG}} 後面坐著八名玩家，所以在 {{t:utg|UTG}}、{{t:utg|UTG}}+1 和 {{t:utg|UTG}}+2，你{{t:open|開池}}要比 6 人桌的 {{t:utg|UTG}} 更緊：因為你後面的玩家更多。當這三名玩家都{{t:fold|棄牌}}後，LJ 的打法就像 6 人桌的 {{t:utg|UTG}}，之後的{{t:position|位置}}則和上方表格相同。對於 9 人桌的前段{{t:position|位置}}，我們只提供方向：這些{{t:range|範圍}}的數字和組成，我們還沒有和已公布的求解器解法核對過。
:::

:::note 如何記住
別死背 {{n:combos.kinds}} 個格子。記住邊界就好：哪些{{t:pair|對子}}、哪些同花色 A，以及不同花色手牌從哪張牌開始。下方的練習會更常抽到{{t:range|範圍}}邊界上的手牌。
:::

這些{{t:range|範圍}}來自一個簡化翻牌後打法的模型，因此在{{t:range|範圍}}邊界上的十幾手牌中，會和專業表格有差異，有時偏向一邊，有時偏向另一邊。這些主要是有間隔的同花色手牌（例如 75s、97s）和較弱的不同花色手牌（例如 A4o、K7o）。練習不會評分這些手牌。
