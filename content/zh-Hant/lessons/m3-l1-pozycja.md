---
id: m3.l1
module: m3
order: 1
title: "牌桌上的位置"
sub: "為什麼座位很重要"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "哪個{{t:position}}最好？"
    options:
      - { text: "按鈕位（{{t:button|BTN}}）", correct: true, why: "從翻牌開始，按鈕位最後行動，所以總能在自己做決定前知道對手的決定。" }
      - { text: "{{t:big-blind|大盲}}", why: "{{t:big-blind|BB}} 因為已經投入盲注，入池花費較少，但從翻牌開始，它是最先行動的人之一。" }
      - { text: "{{t:utg}}", why: "{{t:utg}} 翻牌前第一個行動，後面還有牌桌上的所有玩家。這是最難開池的位置。" }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "你前面的人都{{t:fold|棄牌}}了。你怎麼做？"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "不同花的 K9 不在 {{t:utg}} 的{{t:open|開池}}{{t:range|範圍}}內，也就是不在你從這個{{t:position|位置}}會{{t:open|開池}}的手牌清單裡。你後面還有五位玩家，常常有人拿著 K 而且踢腳更好。" }
      - { text: "{{t:raise|加注}}", why: "在 {{t:utg}} 你只{{t:open|開池}}約 {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} 的手牌。K9o 很容易中 K，然後輸給 KQ 或 AK。" }
      - { text: "補齊{{t:big-blind|大盲}}", why: "在 {{t:utg}} 只補齊盲注（limp）是不好的習慣。這手牌要嘛值得{{t:raise|加注}}，要嘛你就{{t:fold|棄牌}}。" }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "同一手牌，但你在按鈕位，而且前面的人都{{t:fold|棄牌}}了。"
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|加注}}", correct: true, why: "只剩下盲注位，而且翻牌後你有{{t:position|位置}}。在按鈕位你{{t:open|開池}}約 {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} 的手牌，K9o 就在其中。" }
      - { text: "{{t:fold|棄牌}}", why: "太保守了。只對上盲注位時，這手牌已經夠好，而且{{t:position}}還會增加它的價值。" }
      - { text: "補齊{{t:big-blind|大盲}}", why: "溜入會交出{{t:initiative|主動權}}。{{t:raise|加注}}常常能直接拿下盲注。" }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "為什麼最後行動有幫助？"
    options:
      - { text: "我在做決定前就知道對手做了什麼", correct: true, why: "對手的每個動作都是資訊。最後行動的人掌握最多資訊，可以便宜地{{t:check|過牌}}，或在別人示弱時拿下{{t:pot|底池}}。" }
      - { text: "我會拿到比較好的牌", why: "不管在哪個{{t:position|位置}}，牌都是隨機的。" }
      - { text: "我付的盲注比較小", why: "在按鈕位你不用付盲注，但這不是主要優勢。最重要的是資訊。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
莊家按鈕（**{{t:button|BTN}}**，Button）每一手牌都會移動，它決定了行動順序。從翻牌開始，按鈕位**最後**行動，這是巨大的優勢：你在自己做決定前，就能看到其他所有人做了什麼。翻牌後比對手先行動的人，就是在{{t:out-of-position}}的情況下打牌：要在不知道對手動作的情況下做決定。

## 6 人桌的{{t:position|位置}}

| {{t:position|位置}} | 何時行動 | {{t:open|開池}}範圍多寬 |
|---|---|---|
| {{t:utg}} | 翻牌前第一個 | 約 {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} 的手牌 |
| {{t:hijack|HJ}}、{{t:cutoff|CO}} | 在 {{t:utg}} 之後；{{t:cutoff|CO}} 緊接在按鈕位之前 | 越來越寬 |
| {{t:button|BTN}} | 從翻牌開始最後 | 約 {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} 的手牌 |
| {{t:small-blind|SB}}、{{t:big-blind|BB}} | 翻牌前最後，從翻牌開始最先 | 所有人都{{t:fold|棄牌}}時，{{t:small-blind|SB}} 會{{t:open|開池}}（見{{t:range|範圍}}課程）；盲注防守見模組 M4 |

**{{t:hijack|HJ}}**（Hijack）坐在 {{t:utg}} 之後、按鈕位前兩個座位，**{{t:cutoff|CO}}**（Cutoff）則緊接在按鈕位之前。這些是中間{{t:position|位置}}：後面的玩家比 {{t:utg}} 後面少，所以你從這裡{{t:open|開池}}得更寬，但仍比按鈕位緊。

:::note {{t:open|開池}}尺寸
你從每個{{t:position|位置}}都以{{t:raise|加注}}到 {{n:pf.open-size}} 來{{t:open|開池}}，從{{t:small-blind|小盲}}則加注到 {{n:pf.open-size-sb}}。這是簡化做法：在求解器的解中，{{t:early-position|前位}}的{{t:open|開池}}會稍小一些（例如 {{t:utg}} 為 {{n:pf.open-size.solver-utg}}、{{t:cutoff|CO}} 為 {{n:pf.open-size.solver-co}}），但單一尺寸比較容易學。第一個入池時，你不會只補齊盲注（那是{{t:limp}}，也就是只靠{{t:call|跟注}}{{t:big-blind|大盲}}入池）：{{t:raise}}可以直接贏下{{t:pot|底池}}，並讓你取得{{t:initiative|主動權}}，因為最後{{t:raise|加注}}的人通常會做下一次{{t:bet|下注}}。
:::
