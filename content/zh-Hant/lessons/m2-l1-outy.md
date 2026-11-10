---
id: m2.l1
module: m2
order: 1
title: "補牌與機率"
sub: "2 與 4 法則"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "你有幾張{{t:flush|同花}}補牌？"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "你有 {{n:draw.flush.seen}} 張紅心（手中 2 張，{{t:board|公共牌}}上 2 張）。整副牌有 {{n:cards.per-suit}} 張紅心，所以還剩 {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}} 張。" }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} 是整副牌所有的紅心，但其中 {{n:draw.flush.seen}} 張你已經看到了。" }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} 是你已經有的紅心。我們算的是你需要的牌。" }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "你有幾張{{t:straight|順子}}補牌？"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "你有 6-7-8-9。任何一張 5 和任何一張 10 都能讓你成{{t:straight|順子}}：{{n:draw.oesd.ranks}} 種點數 × {{n:cards.suits}} 種花色 = {{n:outs.oesd}} 張牌。" }
      - { text: "{{n:outs.gutshot}}", why: "中間缺一張牌時（gutshot）才是這個數字。這裡的{{t:straight}}兩頭都開。" }
      - { text: "{{n:draw.oesd.ranks}}", why: "兩種點數（5 和 10），但每種都有四種花色。" }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "轉牌，你有 {{n:outs.flush}} 張{{t:flush|同花}}補牌。你在河牌中牌的機率是多少？"
    options:
      - { text: "約 {{n:odds.flush.turn-river}}", correct: true, why: "還有一張牌要發：{{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}（近似值）。精確來說是 {{n:cards.unseen.turn}} 張未知牌中的 {{n:outs.flush}} 張，也就是 {{n:odds.flush.turn-river}}。" }
      - { text: "約 {{n:odds.flush.flop-river}}", why: "這是翻牌時的機率，那時還有兩張牌要發。到了轉牌只剩一張。" }
      - { text: "約 {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} 代表每兩張未知牌就有一張能讓你成{{t:flush}}。實際上只有 {{n:cards.unseen.turn}} 張中的 {{n:outs.flush}} 張可以。" }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "翻牌時你有 gutshot（{{n:outs.gutshot}} 張補牌）。到河牌為止中牌的機率是多少？"
    options:
      - { text: "約 {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}}（近似值）。精確值是 {{n:odds.gutshot.flop-river}}。不過只有在你不必再面對任何{{t:bet|下注}}就能看到兩張牌時（全下），才有這個機率。對手在翻牌{{t:bet|下注}}時，你只為一張牌付錢：此時機率約 {{n:odds.gutshot.flop-turn}}。" }
      - { text: "約 {{n:odds.gutshot.rule-turn}}", why: "這是一張牌時的近似機率（{{n:outs.gutshot}} × 2）。題目問的是兩張牌：轉牌和河牌。" }
      - { text: "約 {{n:odds.oesd.flop-river}}", why: "這是有 {{n:outs.oesd}} 張補牌時的機率。gutshot 只有 {{n:outs.gutshot}} 張。" }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "翻牌。你有{{t:flush-draw}}，對手{{t:bet|下注}}。你要拿{{t:call|跟注}}的價格和哪個中牌機率比較？"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "約 {{n:odds.flush.flop-turn}}，轉牌的機率", correct: true, why: "{{t:call|跟注}}只買到一張牌。到了轉牌，對手可能再次{{t:bet|下注}}，河牌你得另外付錢。{{n:cards.unseen.flop}} 張中的 {{n:outs.flush}} 張約為 {{n:odds.flush.flop-turn}}。" }
      - { text: "約 {{n:odds.flush.flop-river}}，到河牌的機率", why: "只有在你確定不必再面對任何{{t:bet|下注}}就能看到兩張牌時，也就是全下時，才有這個機率。面對翻牌的一般{{t:bet}}，你只買到一張牌。" }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "轉牌。你有 {{n:outs.flush}} 張{{t:flush|同花}}補牌。依照 2 與 4 法則，河牌中牌的機率是百分之多少？請輸入數字。"
    answer: odds.flush.rule-turn
    explanation: "還有一張牌要發，所以乘以 2：{{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}（近似值）。精確值：{{n:cards.unseen.turn}} 張牌中的 {{n:outs.flush}} 張，也就是 {{n:odds.flush.turn-river}}。"
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
**補牌**是能讓你的手牌變成很可能獲勝的那張牌。計算補牌，不用計算機就能快速估算機率。

## 常見的{{t:draw|聽牌}}

- **{{t:flush-draw|同花聽牌}}**（同一花色 {{n:draw.flush.seen}} 張，差一張成{{t:flush|同花}}）：**{{n:outs.flush}} 張補牌**。一種花色有 {{n:cards.per-suit}} 張，你看到了 {{n:draw.flush.seen}} 張。
- **{{t:oesd|兩頭順子聽牌}}**，例如 [[8c 9d]] 在 [[6s 7h Kd]] 的{{t:board|公共牌}}上：**{{n:outs.oesd}} 張補牌**，也就是四張 5 和四張 10。
- **{{t:straight|順子}}中間缺一張（gutshot）**，例如 5-6-8-9 少了 7：**{{n:outs.gutshot}} 張補牌**。

## 2 與 4 法則

這個法則不用計算機就能給你近似機率：把補牌數乘以 2 或 4。精確機率請看下表。

```formula
機率 ≈ 補牌 × 2   （還有一張牌要發）
機率 ≈ 補牌 × 4   （兩張牌，僅限你不必再面對下注就能看到兩張時）
```

| {{t:draw|聽牌}} | 補牌 | 翻牌 → 轉牌 | 翻牌 → 河牌（全下） | 轉牌 → 河牌 |
|---|---|---|---|---|
| {{t:flush|同花}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|兩頭順子聽牌}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## 一張牌還是兩張？

對手在翻牌{{t:bet|下注}}時，你的{{t:call}}只買到一張牌：轉牌。到了轉牌，對手可能再次{{t:bet|下注}}，河牌你得另外付錢。所以面對翻牌的{{t:bet|下注}}，你要算的是**下一張牌**的機率（× 2）：{{t:flush|同花}}是 {{n:cards.unseen.flop}} 張中的 {{n:outs.flush}} 張，約 {{n:odds.flush.flop-turn}}。只有在你確定不必再面對任何{{t:bet|下注}}就能看到兩張牌時，也就是有人全下時，才用**到河牌**的機率（× 4，{{t:flush|同花}}約 {{n:odds.flush.flop-river}}）。

:::note 這些數字從哪來
在轉牌時，有 {{n:cards.unseen.turn}} 張牌你不知道（{{n:cards.deck}} 張減去你的 {{n:cards.hole}} 張和{{t:board|公共牌}}上的 {{n:cards.board.turn}} 張）。成{{t:flush|同花}}的機率是 {{n:cards.unseen.turn}} 張中的 {{n:outs.flush}} 張。只要補牌不超過 {{n:rule24.outs.max}} 張，2 與 4 法則的誤差最多約 {{n:rule24.error.max.pp}} 個百分點。
:::
