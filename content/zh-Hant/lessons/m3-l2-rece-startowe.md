---
id: m3.l2
module: m3
order: 2
title: "起手牌"
sub: "翻牌前該玩哪些牌"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "哪一手牌比較強？"
    options:
      - { text: "A♥ K♥（同花色）", correct: true, why: "點數相同，但同花色的手牌多了一條靠{{t:flush}}獲勝的路。" }
      - { text: "A♥ K♣（不同花色）", why: "花色不同，你就失去了成{{t:flush}}的機會。" }
      - { text: "一樣強", why: "差不多，但不完全一樣。花色是有影響的。" }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "還沒有人入池。你會怎麼做？"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "不同花色的 7-2 是最弱的手牌之一：兩張牌相距太遠，無法一起組成{{t:straight|順子}}，也很少成{{t:flush}}，就算中了{{t:pair}}，踢腳也很弱。它常被稱為最差的手牌，不過若以對抗隨機手牌來計算，其他某些手牌，例如不同花色的 3-2，表現還更差。" }
      - { text: "{{t:raise|加注}}，出其不意", why: "在翻牌前用最弱的手牌之一{{t:bluff|詐唬}}（用弱牌打，讓對手{{t:fold|棄掉}}更好的牌），而你後面還有四位玩家，長期下來會虧損。" }
      - { text: "{{t:call|跟注}}，反正很便宜", why: "每一次用弱牌「便宜」入池，累積起來就是大筆虧損。" }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "你前面的玩家{{t:raise|加注}}了。你會怎麼做？"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "再{{t:raise|加注}}（3-bet）", correct: true, why: "你拿著最好的手牌。你想盡可能多投入籌碼，並減少對手人數。" }
      - { text: "只{{t:call|跟注}}", why: "進階玩家有時會這樣打來迷惑對手，但原則上你會損失價值，還讓其他人便宜入池。" }
      - { text: "{{t:fold|棄牌}}", why: "翻牌前絕對不要{{t:fold|棄掉}}一對 A。面對其他任何手牌都是優勢方，例如對 KK 約有 {{n:pf.aa-vs-kk}}。" }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "所有人都{{t:fold|棄牌}}到你。你會怎麼做？"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|加注}}", correct: true, why: "同花色 QJ 是在有{{t:position|位置}}時攻擊盲注的很好的牌：能成{{t:straight|順子}}、同花和高{{t:pair|對子}}。" }
      - { text: "{{t:fold|棄牌}}", why: "在按鈕位，這手牌好到不該{{t:fold}}。" }
      - { text: "{{t:call|跟注}}", why: "最好{{t:raise|加注}}：你有機會立刻拿下盲注，並帶著{{t:initiative|主動權}}打牌。" }
---
新手大部分的錢，都是因為玩太多弱牌而輸掉的。起手時好好挑牌，是停止輸錢最快的方法。

## 手牌分組

- **最強**：[[As Ah]]、[[Ks Kh]]、[[Qs Qh]]，以及同花色和不同花色的 AK，例如 [[As Ks]] 和 [[As Kd]]。你要{{t:raise|加注}}；如果有人在你之前已經{{t:raise|加注}}，你通常會為了{{t:value|價值}}再{{t:raise|加注}}（3-bet），也就是讓對手用較弱的手牌{{t:call|跟注}}。
- **強**：JJ、TT、AQ、同花色 AJ、同花色 KQ。
- **投機**：小{{t:pair|對子}}和同花色的連張，例如 [[7h 6h]]。適合在{{t:late-position|後位}}玩。
- **弱**：不連張、點數小、不同花色，例如 [[9c 3d]]。{{t:fold|棄牌}}。

:::note {{t:combo|組合}}有多少
起手牌總共有 {{n:combos.total}} 個{{t:combo|組合}}，但只有 {{n:combos.kinds}} 種類型：{{n:combos.kinds.pair}} 種{{t:pair|對子}}、{{n:combos.kinds.suited}} 種同花色手牌，以及 {{n:combos.kinds.offsuit}} 種不同花色手牌。每種{{t:pair}}有 {{n:combos.pair}} 個{{t:combo|組合}}，同花色手牌有 {{n:combos.suited}} 個，不同花色手牌有 {{n:combos.offsuit}} 個。因此，不同花色 AK 出現的頻率是同花色 AK 的三倍。
:::

上面的分組是入門用的簡化版。各個{{t:position|位置}}精確的{{t:open|開池}}{{t:range|範圍}}會以{{t:range|範圍}}表格呈現，你會在下一課學到。
