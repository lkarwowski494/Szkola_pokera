---
id: m4.l2
module: m4
order: 2
title: "防守大盲"
sub: "跟注價格與寬範圍防守"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "按鈕位{{t:open|開池}}到{{n:pf.open-size}}，{{t:small-blind}}{{t:fold|棄牌}}。你在{{t:big-blind|大盲}}需要多少百分比的 equity，{{t:call}}才有利可圖（不考慮翻牌後的打法）？請輸入數字。"
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "你要再補{{n:bb.call.vs-btn}}進{{t:pot|底池}}，{{t:call|跟注}}後底池共有{{n:bb.pot-after.vs-btn}}：{{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}}約為{{n:eq.bb-vs-btn-open}}。只有當{{t:pot|底池}}裡只有對手的{{t:bet}}時，你才需要一半；{{t:pot|底池}}裡的盲注讓你的價格更好。"
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "{{t:small-blind|小盲}}{{t:open|開池}}到{{n:pf.open-size-sb}}。你在{{t:big-blind|大盲}}需要多少 equity 才能{{t:call|跟注}}？"
    table: { position: BB }
    options:
      - { text: "約{{n:eq.bb-vs-sb-open}}", correct: true, why: "你要再補{{n:bb.call.vs-sb}}進{{t:pot|底池}}，{{t:call|跟注}}後底池共有{{n:bb.pot-after.vs-sb}}：約為{{n:eq.bb-vs-sb-open}}。價格比面對按鈕位時差，但翻牌後你有{{t:position|位置}}。" }
      - { text: "約{{n:eq.bb-vs-btn-open}}", why: "這是面對按鈕位{{t:open|開池}}到{{n:pf.open-size}}時的價格。{{t:small-blind|小盲}}{{t:open|開池}}的尺寸更大，所以你要付更多。" }
      - { text: "約一半", why: "只有當{{t:pot|底池}}裡只有對手的{{t:bet}}時，你才需要一半的 equity。這裡底池裡還有盲注，所以價格更好。" }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "為什麼你在{{t:big-blind|大盲}}不會用每一手對按鈕位{{t:range|範圍}}有約{{n:eq.bb-vs-btn-open}} equity 的牌{{t:call|跟注}}？"
    table: { position: BB }
    options:
      - { text: "因為{{t:out-of-position}}時你無法實現全部 equity", correct: true, why: "Equity 是在沒有任何{{t:bet|下注}}、一路打到底時的獲勝機率。{{t:out-of-position|沒有位置}}時，你常會在攤牌前{{t:fold|棄牌}}，所以不同花的弱牌實現的比 equity 顯示的少。" }
      - { text: "因為按鈕位總是拿著強牌", why: "按鈕位{{t:open|開池}}非常寬，所以{{t:big-blind|BB}}的防守也很寬。" }
      - { text: "因為要省下{{t:chips}}", why: "重要的是{{t:expected-value}}，而不是省下{{t:chips|籌碼}}。" }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "按鈕位{{t:open|開池}}到{{n:pf.open-size}}，{{t:small-blind}}{{t:fold|棄牌}}。你在{{t:big-blind|大盲}}拿到 QQ。你怎麼做？"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet 到{{n:pf.3bet.oop-total}}", correct: true, why: "QQ 是打{{t:value|價值}}的牌。{{t:out-of-position|沒有位置}}時，你{{t:raise|加注}}到約{{n:pf.3bet.size-oop}}的{{t:open|開池}}尺寸，讓按鈕位無法{{t:in-position}}便宜地{{t:call|跟注}}。" }
      - { text: "3-bet 到{{n:pf.3bet.ip-total}}", sizeError: true, why: "動作正確，但這是{{t:in-position}}玩家的尺寸（{{n:pf.3bet.size-ip}}的{{t:open|開池}}尺寸）。{{t:out-of-position|沒有位置}}時，你要{{t:raise|加注}}得更大：到{{n:pf.3bet.oop-total}}。" }
      - { text: "{{t:call|跟注}}", why: "你會損失價值：拿 QQ 你要在翻牌前把{{t:pot|底池}}做大，而不是{{t:out-of-position}}打一個小{{t:pot|底池}}。" }
      - { text: "{{t:fold|棄牌}}", why: "QQ 是翻牌前最好的牌之一。{{t:fold|棄牌}}是大錯。" }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "按鈕位{{t:open|開池}}到{{n:pf.open-size}}，{{t:small-blind}}{{t:fold|棄牌}}。請塗出你用來防守{{t:big-blind}}的牌（{{t:call|跟注}}或 3-bet）。"
---
{{t:big-blind|大盲}}已經有一整個盲注在{{t:pot|底池}}裡，所以面對{{t:open|開池}}時只需再補一點。當按鈕位{{t:open|開池}}到{{n:pf.open-size}}、{{t:small-blind}}{{t:fold|棄牌}}時，你只需要約{{n:eq.bb-vs-btn-open}}的 equity 就能{{t:call|跟注}}。因此{{t:big-blind}}是所有{{t:position|位置}}中防守最寬的。

## 價格不是一切

Equity 告訴你：如果雙方在沒有進一步{{t:bet|下注}}的情況下打到攤牌，你多常獲勝。{{t:out-of-position|沒有位置}}時，你常會在翻牌後{{t:fold|棄牌}}，所以不同花的弱牌實現的比它們的 equity 少。同花牌、{{t:connectors|連張}}和中等{{t:pair|對子}}實現得更多，所以網格中更願意用它們防守。

```range
vs-open.bb-vs-btn
```

已發表的求解器解在這裡防守約{{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}}的牌（{{t:call}}和 3-bet 合計）。網格所依據的 App 求解器，在這裡防守得比已發表的解更寬。

## 面對{{t:small-blind|小盲}}

{{t:small-blind|小盲}}用更大的尺寸{{t:open|開池}}，到{{n:pf.open-size-sb}}，所以你需要約{{n:eq.bb-vs-sb-open}}的 equity 才能{{t:call|跟注}}。價格比較差，但翻牌後你有{{t:position|位置}}，所以仍然防守得很寬：超過一半的牌。

```range
vs-open.bb-vs-sb
```

已發表的求解器解在這裡防守約{{n:pf.bb-def.vs-sb.pub}}的牌。網格所依據的 App 求解器，在這裡防守得比已發表的解更緊。

:::note 如何從{{t:big-blind|大盲}}{{t:raise|加注}}
網格顯示的是用什麼牌防守，而不是怎麼防守：3-bet 和{{t:call}}合併在一起，因為 App 求解器中{{t:big-blind|大盲}} 3-bet 的組成，和其他求解器已發表的結果不同。面對按鈕位時，{{t:big-blind|大盲}}的 3-bet 約為{{n:pf.3bet.size-oop}}的{{t:open|開池}}尺寸。你用最強的牌 3-bet（TT+、AQ+、AJs+），再加上來自{{t:call|跟注}}{{t:range|範圍}}底部的{{t:bluff|詐唬}}：A5s、有時 A4s，以及同花{{t:connectors|連張}}。中小{{t:pair|對子}}、KQo 和不同花的 A 通常{{t:call|跟注}}。面對{{t:small-blind|小盲}}時你有{{t:position|位置}}，所以{{t:raise|加注}}得小一點，約{{n:pf.3bet.size-ip}}的{{t:open|開池}}尺寸。這時你主要打{{t:value|價值}} 3-bet（TT+、AJs+、部分 AQo 和 KQ），而 A5s 和同花{{t:connectors|連張}}通常{{t:call|跟注}}。
:::
