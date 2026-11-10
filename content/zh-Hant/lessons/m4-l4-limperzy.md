---
id: m4.l4
module: m4
order: 4
title: "溜入玩家"
sub: "隔離加注：尺度與範圍"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "你前面有一位玩家只跟了{{t:big-blind|大盲}}（溜入）。你想在按鈕位{{t:raise|加注}}。要加到多少？"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "加到 {{n:pf.iso.one-limper}}", correct: true, why: "基礎 {{n:pf.iso.base}}，每位溜入玩家再加 {{n:pf.iso.per-limper}}。這個尺度讓溜入玩家拿不到好價格。" }
      - { text: "加到 {{n:pf.min-raise}}", why: "最小{{t:raise|加注}}給溜入玩家極好的價格，而且幾乎從來無法立刻贏下{{t:pot|底池}}。" }
      - { text: "加到 {{n:pf.open-size}}，跟一般{{t:open|開池}}一樣", why: "溜入玩家已經投入一個盲注，所以{{t:pot|底池}}更大。{{t:raise|加注}}必須比一般{{t:open|開池}}更大。" }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "你前面有兩位玩家只跟了{{t:big-blind|大盲}}。你想在{{t:cutoff|CO}}{{t:raise|加注}}。要加到多少？"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "加到 {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}}，兩位溜入玩家每位各再加 {{n:pf.iso.per-limper}}。" }
      - { text: "加到 {{n:pf.iso.one-limper}}", why: "這是面對一位溜入玩家的尺度。每多一位就再加 {{n:pf.iso.per-limper}}。" }
      - { text: "只跟注", why: "同花 AQ 是要{{t:value|為價值}}{{t:raise|加注}}的牌。跟注會交出{{t:initiative|主動權}}，讓所有人便宜入池。" }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "一位玩家溜入，其他人都棄牌到你，你在{{t:small-blind|小盲}}。你想{{t:raise|加注}}。要加到多少？"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "加到 {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|無位置}}時要再多加 {{n:pf.iso.oop-extra}}：{{n:pf.iso.base}}，每位溜入玩家加 {{n:pf.iso.per-limper}}，再加 {{n:pf.iso.oop-extra}}。" }
      - { text: "加到 {{n:pf.iso.one-limper}}", why: "這是{{t:in-position|有位置}}時的尺度。{{t:out-of-position|無位置}}時{{t:raise|加注}}要多一點，讓對手更常{{t:fold|棄牌}}，或付出更高的代價。" }
      - { text: "只跟注", why: "拿 KK 你永遠要做大{{t:pot|底池}}。" }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "你前面有一位玩家只跟了{{t:big-blind|大盲}}（溜入）。你在按鈕位。你怎麼做？"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|加注}}到 {{n:pf.iso.one-limper}}", correct: true, why: "AJ 是適合{{t:isolation|隔離加注}}的牌：它壓制許多較弱玩家用來溜入的牌，而且翻牌後你有{{t:position|位置}}。尺度：{{n:pf.iso.base}}，每位溜入玩家加 {{n:pf.iso.per-limper}}。" }
      - { text: "{{t:raise|加注}}到 {{n:pf.min-raise}}", sizeError: true, why: "動作正確，但最小{{t:raise|加注}}給溜入玩家極好的價格，所以他幾乎從不{{t:fold|棄牌}}，你也無法和他單挑。要{{t:raise|加注}}到 {{n:pf.iso.one-limper}}。" }
      - { text: "跟注", why: "你交出{{t:initiative|主動權}}，讓盲注便宜入池。拿著壓制溜入玩家的牌，你要做大{{t:pot|底池}}。" }
      - { text: "{{t:fold|棄牌}}", why: "太緊了：面對一位溜入玩家，按鈕位大約用 {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} 的牌{{t:isolation|隔離加注}}，AJ 綽綽有餘地落在其中。" }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "你前面有三位玩家只跟了{{t:big-blind|大盲}}。你在按鈕位。你怎麼做？"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "跟注", correct: true, why: "面對多位溜入玩家，同花{{t:connectors|連張}}是投機牌：你可以{{t:in-position|有位置}}便宜看翻牌，並有機會擊中大牌。有一個來源建議這裡跟注；另一個建議避免，所以我們也接受{{t:fold|棄牌}}。" }
      - { text: "{{t:fold|棄牌}}", correct: true, why: "同樣正確：有一個來源建議不要跟注，而是{{t:raise|加注}}或{{t:fold|棄牌}}，而 76s 不適合{{t:value|為價值}}{{t:raise|加注}}。另一個來源建議跟注，所以兩種打法我們都接受。" }
      - { text: "{{t:raise|加注}}到 {{n:pf.iso.two-limpers}}", why: "面對三位溜入玩家，用{{t:raise|加注}}{{t:bluff|詐唬}}很少能拿下{{t:pot|底池}}，而且尺度還應該更大。76s 不適合{{t:value|為價值}}{{t:raise|加注}}。" }
---
溜入（limp）是只跟{{t:big-blind|大盲}}進入這手牌。職業玩家很少第一個溜入（第 3 單元的規則），所以微級別的溜入玩家通常是較弱的玩家。對溜入玩家{{t:raise|加注}}稱為{{t:isolation|隔離加注}}：你想和他單挑，最好是{{t:in-position|有位置}}。

:::note 這些規則從哪裡來
App 的求解器不打溜入，所以這堂課以訓練教材為依據。這些規則標示為經驗法則。
:::

## {{t:isolation|隔離加注}}的尺度

線上你要{{t:raise|加注}}到 {{n:pf.iso.base}}，每位溜入玩家再加 {{n:pf.iso.per-limper}}：面對一位加到 {{n:pf.iso.one-limper}}，面對兩位加到 {{n:pf.iso.two-limpers}}。{{t:out-of-position|無位置}}時再多加 {{n:pf.iso.oop-extra}}。絕對不要最小加注：溜入玩家會拿到極好的價格，幾乎從不{{t:fold|棄牌}}。

## {{t:isolation|隔離加注}}的{{t:range|範圍}}

在按鈕位面對一位溜入玩家，你可以寬鬆地{{t:isolation|隔離加注}}，大約 {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} 的牌：中高{{t:pair|對子}}、同花 A、強的不同花 A、高張牌，以及部分同花{{t:connectors|連張}}。{{t:position|位置}}越前、溜入玩家越多，{{t:range|範圍}}就越窄：面對三位溜入玩家，你{{t:raise|加注}}主要是{{t:value|為了價值}}。

投機牌，例如小{{t:pair|對子}}和同花{{t:connectors|連張}}，面對多位溜入玩家時可以{{t:in-position|有位置}}跟注。這裡各來源看法不同：一個建議跟注，另一個建議避免；在練習中兩種打法我們都接受，跟注和{{t:fold|棄牌}}。
