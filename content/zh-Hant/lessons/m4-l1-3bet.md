---
id: m4.l1
module: m4
order: 1
title: "有人在你前面開池時"
sub: "棄牌、跟注還是 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "{{t:cutoff|CO}} {{t:open|開池}}到 {{n:pf.open-size}}。你想在按鈕位{{t:raise|加注}}。要加到多少？"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "加到 {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|有位置}}時，你{{t:raise|加注}}到{{t:open|開池}}的約 {{n:pf.3bet.size-ip}}。這是標準尺度，到翻牌時能留下良好的籌碼與{{t:pot|底池}}比。" }
      - { text: "加到 {{n:pf.3bet.too-small}}", why: "太小：對手拿到極佳的價格，幾乎任何牌都能{{t:call|跟注}}並繼續打下去。" }
      - { text: "加到 {{n:pf.3bet.too-big}}", why: "以{{t:in-position}}的打法來說太大：你冒的風險更大，而對手較好的牌反正也不會{{t:fold|棄牌}}。" }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "按鈕位{{t:open|開池}}到 {{n:pf.open-size}}，{{t:small-blind}}{{t:fold|棄牌}}。你想在{{t:big-blind|大盲}}{{t:raise|加注}}。要加到多少？"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "加到 {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|無位置}}時，你{{t:raise|加注}}到{{t:open|開池}}的約 {{n:pf.3bet.size-oop}}。較大的尺度讓按鈕位無法在{{t:in-position}}廉價{{t:call}}。" }
      - { text: "加到 {{n:pf.3bet.ip-total}}", why: "這是{{t:in-position}}玩家用的尺度。{{t:out-of-position|無位置}}時，你給對手的價格太好。" }
      - { text: "只{{t:call|跟注}}", why: "拿 KK 你想立刻做大{{t:pot|底池}}：這是翻牌前第二好的牌。" }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "按鈕位{{t:open|開池}}到 {{n:pf.open-size}}。你在{{t:small-blind|小盲}}。哪個計畫是標準打法？"
    table: { position: SB }
    options:
      - { text: "{{t:raise|加注}}或{{t:fold|棄牌}}", correct: true, why: "{{t:call|跟注}}之後你要在{{t:out-of-position}}打，而且你後面還有{{t:big-blind}}。在{{t:small-blind|小盲}}面對後位的{{t:open|開池}}，求解器幾乎總是{{t:raise|加注}}或{{t:fold|棄牌}}。" }
      - { text: "大量{{t:call|跟注}}，因為我已經有半個盲注在{{t:pot|底池}}裡", why: "半個盲注不多。在{{t:out-of-position}}{{t:call|跟注}}、背後還有{{t:big-blind|大盲}}，{{t:equity-realization|權益實現}}很差：你贏得的{{t:pot|底池}}份額比手牌權益顯示的少，因為你常在攤牌前{{t:fold|棄牌}}。" }
      - { text: "一律{{t:fold|棄牌}}", why: "太緊：按鈕位{{t:open|開池}}非常寬，所以值得用強牌和部分{{t:bluff|詐唬}}牌{{t:raise|加注}}。" }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "你在{{t:big-blind|大盲}}，面對按鈕位的{{t:open|開池}}。以下哪手牌是作為{{t:bluff}}的典型 3-bet？"
    table: { position: BB }
    options:
      - { text: "同花 A5", correct: true, why: "它阻擋對手的 AA 和 AK，被{{t:call|跟注}}後還有機會做成{{t:flush}}和{{t:straight|順子}}。這是{{t:call|跟注}}{{t:range|範圍}}底部的典型{{t:bluff}}：在{{t:big-blind|大盲}}，你用最強的牌加上這類{{t:bluff|詐唬}}來 3-bet。" }
      - { text: "不同花 K7", why: "這手牌你用{{t:call|跟注}}來防守。拿來 3-bet 時，它阻擋不了任何重要的牌，對手{{t:call|跟注}}後也很難打。" }
      - { text: "{{t:pair|對子}} 22", why: "最小的{{t:pair|對子}}用{{t:call|跟注}}防守：擊中 set（用{{t:pocket-pair|口袋對}}，也就是兩張{{t:hole-cards|底牌}}組成的{{t:pair|對子}}，做成的{{t:three-of-a-kind|三條}}）時賺錢，而用它們 3-bet 很難應付 4-bet。" }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
當你前面有人{{t:open|開池}}，你有三個選擇：{{t:fold|棄牌}}、{{t:call|跟注}}，或再{{t:raise|加注}}一次。再次{{t:raise}}稱為 3-bet，因為這是這手牌中的第三次{{t:bet}}（盲注、{{t:open}}、{{t:raise}}）。

## 3-bet 的尺度

{{t:in-position|有位置}}時，你{{t:raise|加注}}到{{t:open|開池}}的約 {{n:pf.3bet.size-ip}}，也就是對手{{t:open|開池}} {{n:pf.open-size}} 時加到 {{n:pf.3bet.ip-total}}。{{t:out-of-position|無位置}}時，例如在盲注位面對 {{t:cutoff|CO}} 或按鈕位的{{t:open|開池}}，則加到{{t:open|開池}}的約 {{n:pf.3bet.size-oop}}，也就是 {{n:pf.3bet.oop-total}}。在{{t:out-of-position}}使用較大的尺度，能讓對手無法廉價{{t:call}}，否則他之後會帶著{{t:position|位置}}優勢來打。

## {{t:position|位置}}決定是否{{t:call|跟注}}

根據已公開的求解器解，按鈕位面對 {{t:cutoff|CO}} 的{{t:open|開池}}，通常 3-bet 約 {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} 的手牌，只{{t:call|跟注}}約 {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}。面對 {{t:utg|UTG}} 的{{t:open|開池}}（在這個解中是最小尺度，到 {{n:pf.open-size.solver-utg}}），{{t:call|跟注}}已經比 3-bet 略多：約 {{n:pf.call-freq.btn-vs-utg}} 對 {{n:pf.3bet-freq.btn-vs-utg}}。{{t:utg|UTG}} 的{{t:range|範圍}}很強，所以 3-bet 更常遭到 4-bet，也更少能直接贏下{{t:pot|底池}}。

```range
vs-open.btn-vs-co
```

手牌表只顯示按鈕位玩哪些牌（用 3-bet 或{{t:call|跟注}}）、哪些牌{{t:fold|棄牌}}。3-bet 與{{t:call|跟注}}之間的比例請從上面的數字學習：App 的求解器在這個情境幾乎不{{t:call|跟注}}，所以無法重現這個比例。在十幾手牌上，例如 A8s、98s 和 44，App 的求解器打法和已公開的解不同，所以練習不會評分這些牌。

在{{t:small-blind|小盲}}，你幾乎總是{{t:raise|加注}}或{{t:fold|棄牌}}。{{t:call|跟注}}意味著要在{{t:out-of-position}}打，而且你後面的{{t:big-blind}}還可能{{t:raise|加注}}。{{t:out-of-position|無位置}}時，手牌的**{{t:equity-realization|權益實現}}**較差：它贏得的{{t:pot|底池}}份額比它的權益顯示的少，因為你更常在攤牌前{{t:fold|棄牌}}，也更難靠{{t:bet|下注}}贏下{{t:pot|底池}}。

```range
vs-open.sb-vs-btn
```

根據已公開的求解器解，{{t:small-blind}}面對按鈕位幾乎不{{t:call|跟注}}：它 3-bet 約 {{n:pf.3bet-freq.sb-vs-btn}} 的手牌，也就是{{t:range|範圍}}頂端（包括 77+、AJo+、KQo、A5s、A4s、T9s），其餘{{t:fold|棄牌}}。App 的求解器在這裡 3-bet {{n:solver.3bet.sb-vs-btn}} 的手牌，其中包括{{t:pair|對子}} 55 和 66，已公開的解也常 3-bet 這兩手；它少數的{{t:call|跟注}}在手牌表中算作{{t:fold}}。在幾手牌上，例如 ATo、T9s 和 A4s，App 的求解器打法和已公開的解不同，所以練習不會評分這些牌。

## {{t:linear}}還是{{t:polarized}}{{t:range|範圍}}

在有{{t:position|位置}}、面對 {{t:cutoff|CO}} 的{{t:open|開池}}時，你主要從頂端 3-bet 最好的牌，再加上幾手同花 A 的{{t:bluff|詐唬}}（A5s、A4s），中等牌（例如 77–99、AJs、ATs、同花{{t:connectors|連張}}）則混合打：部分 3-bet，部分{{t:call|跟注}}。對手常會{{t:call|跟注}}，所以你希望手牌在被{{t:call|跟注}}後的{{t:pot|底池}}裡打得好。不同來源對這種{{t:range}}的稱呼不同：有的稱為{{t:linear|線性}}（從最強的牌往下組成），有的稱為{{t:polarized|極化}}（主要由非常強的牌和{{t:bluff|詐唬}}組成，幾乎沒有中等牌）；更重要的是哪些牌你 3-bet、哪些牌你{{t:call|跟注}}。

在{{t:big-blind|大盲}}面對按鈕位，你 3-bet 最強的牌（TT+、AQ+、AJs+），加上{{t:call|跟注}}{{t:range|範圍}}底部的{{t:bluff|詐唬}}：A5s、有時 A4s，以及同花{{t:connectors|連張}}。同花 A 阻擋對手的 AA 和 AK，被{{t:call}}時仍可能做成{{t:flush}}或{{t:straight|順子}}。中小{{t:pair|對子}}、KQo 和不同花的 A（AJo–A9o）通常只{{t:call|跟注}}：在{{t:big-blind|大盲}}你入池便宜，而且由你結束行動，所以這些牌在{{t:call|跟注}}後賺得更多。組成取決於{{t:rake|抽水}}和 3-bet 尺度，所以 99、KQo 和 AJo 的打法會有所不同。面對{{t:small-blind|小盲}}的{{t:open|開池}}，你主要為了{{t:value|價值}} 3-bet（TT+、AJs+、部分 AQo 和 KQ），A5s 和同花{{t:connectors|連張}}通常{{t:call|跟注}}。

在{{t:small-blind|小盲}}的打法不同：3-bet 或{{t:fold}}，3-bet 用的是{{t:range|範圍}}頂端的牌。

:::note 這些規則從何而來
按鈕位和{{t:small-blind|小盲}}的手牌表來自 App 的求解器，與各來源大致相符（{{t:small-blind|小盲}}除了幾手練習不評分的牌之外）。如何在{{t:big-blind|大盲}} 3-bet，是由一條規則來教，這條規則依據多個獨立來源中其他求解器的已公開結果：App 求解器在{{t:big-blind|大盲}}的 3-bet 組成與它們不同。
:::
