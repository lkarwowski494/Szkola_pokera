---
id: m2.l2
module: m2
order: 2
title: "底池賠率"
sub: "什麼時候跟注划算"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "{{t:pot|底池}}裡有 {{n:ex.third.pot}}。對手{{t:bet|下注}} {{n:ex.third.bet}}。你需要多少權益才能{{t:call|跟注}}？"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "{{t:bet|下注}}後的{{t:pot|底池}}是 {{n:ex.third.pot-after-bet}}，你再補 {{n:ex.third.bet}}，總共 {{n:ex.third.total}}。{{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}。" }
      - { text: "{{n:eq.bet-pot}}", why: "這是面對{{t:pot|底池}}大小的{{t:bet|下注}}時需要的數字。這裡的{{t:bet}}是{{t:pot|底池}}的 1/3。" }
      - { text: "{{n:eq.bet-third.no-call}}", why: "這是 {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}。分母也要加上你的{{t:call}}。" }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "轉牌。你有{{t:flush-draw}}。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:bet|下注}} {{n:ex.bet.pot}}。"
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你需要 {{n:eq.bet-pot}}。{{t:flush|同花}}有 {{n:outs.flush}} 張補牌，約 {{n:odds.flush.turn-river}}。即使再加上能讓你組成{{t:pair|一對}} A 的 {{n:pair.outs.per-rank}} 張 A（共 {{n:outs.flush-ace}} 張補牌，約 {{n:odds.flush-ace.turn-river}}），仍明顯低於 {{n:eq.bet-pot}}。這樣的{{t:call}}長期下來會虧損。" }
      - { text: "{{t:call|跟注}}", why: "很誘人，因為你有能做成最大{{t:flush|同花}}的{{t:draw}}，A 也可能有幫助，但即使約有 {{n:odds.flush-ace.turn-river}}，也還是低於 {{n:eq.bet-pot}}。" }
      - { text: "{{t:raise|加注}}全下", why: "進階玩家有時會這樣打，但沒有充分理由的話，你是拿一手還什麼都沒有的牌，去冒整個 stack（你面前所有的{{t:chips|籌碼}}）的風險。" }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "同一手牌，但對手在 {{n:ex.pot}} 的{{t:pot|底池}}中只{{t:bet|下注}} {{n:ex.bet.quarter}}。"
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "你需要 {{n:eq.bet-quarter}}，而你約有 {{n:odds.flush.turn-river}}，算上 A 還更多。小額{{t:bet}}給了你好價格。" }
      - { text: "{{t:fold|棄牌}}", why: "這麼便宜，不該{{t:fold|棄牌}}：{{n:odds.flush.turn-river}} 已高於所需的 {{n:eq.bet-quarter}}，算上 A 還更多。" }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "對手{{t:bet|下注}}半個{{t:pot|底池}}。你需要多少權益？"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|底池}} {{n:ex.pot}}，{{t:bet}} {{n:ex.bet.half}}。你補 {{n:ex.bet.half}}，總共 {{n:ex.half.total}}，也就是 {{n:eq.bet-half}}。" }
      - { text: "{{n:ex.wrong.half}}", why: "常見錯誤：{{n:ex.wrong.half}} 是{{t:bet}}除以{{t:bet|下注}}前的{{t:pot|底池}}（{{n:ex.bet.half}} ÷ {{n:ex.pot}}）。補上的金額要除以你{{t:call|跟注}}後的整個{{t:pot|底池}}：{{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}。" }
      - { text: "{{n:eq.bet-pot}}", why: "這是面對整個{{t:pot|底池}}大小的{{t:bet|下注}}時需要的數字。" }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "對手{{t:bet|下注}}整個{{t:pot|底池}}。你需要百分之多少的權益才能{{t:call|跟注}}？請輸入數字。"
    answer: eq.bet-pot
    explanation: "{{t:pot|底池}} {{n:ex.pot}}，{{t:bet}} {{n:ex.bet.pot}}。你補 {{n:ex.bet.pot}}，而你{{t:call|跟注}}後的{{t:pot|底池}}是 {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}。用補上的金額除以整個{{t:pot|底池}}：{{n:eq.bet-pot}}，也就是三分之一。"
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
當對手{{t:bet|下注}}，而你有{{t:draw}}時，問題在於：這個價格划算嗎？你要比較兩個數字：**你需要贏多少**，以及**你實際贏多少**。

:::note 權益與命中機率
**權益**是你在{{t:pot|底池}}中所占的份額：如果這手牌在沒有後續{{t:bet|下注}}的情況下打到攤牌，你會贏的頻率。補牌那一課講的**命中機率**，只是補牌出現的機率。若是只有命中才會贏的純{{t:draw|聽牌}}，在這個價格下你實際會看到的牌上的命中機率，就近似於你的權益。面對翻牌圈的{{t:bet|下注}}時，這是看一張牌的機率，而不是看到河牌的機率。
:::

## 你需要贏多少

```formula
所需權益 = 跟注額 ÷ 你跟注後的底池
你跟注後的底池 = 下注前的底池 + 下注額 + 跟注額
```

範例：{{t:pot|底池}}裡有 {{n:ex.pot}}，對手{{t:bet|下注}} {{n:ex.bet.half}}。{{t:pot|底池}}現在是 {{n:ex.half.pot-after-bet}}，你補 {{n:ex.bet.half}}，所以你{{t:call|跟注}}後的{{t:pot}}是 {{n:ex.half.total}}。你需要 {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**。

## 速查表

| 對手的{{t:bet|下注}} | 所需權益 |
|---|---|
| 整個{{t:pot|底池}} | {{n:eq.bet-pot}} |
| 半個{{t:pot|底池}} | {{n:eq.bet-half}} |
| 四分之一{{t:pot|底池}} | {{n:eq.bet-quarter}} |

:::note 決策
如果你的權益高於所需，就{{t:call|跟注}}。如果較低，就{{t:fold|棄牌}}。這來自{{t:expected-value|期望值}}：{{t:call|跟注}}的{{t:expected-value|EV}} = 權益 × 你{{t:call|跟注}}後的{{t:pot}} − {{t:call}}，而且正好在權益低於所需時為負。光是這一個計算，就能避免大多數新手代價高昂的錯誤。目前你先不考慮{{t:implied-odds}}，也就是如果你做成牌型，預期在這手牌後續還能贏到的{{t:chips|籌碼}}；後面的模組會再談到。
:::
