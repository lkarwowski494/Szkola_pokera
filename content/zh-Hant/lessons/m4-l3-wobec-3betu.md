---
id: m4.l3
module: m4
order: 3
title: "面對 3-bet"
sub: "棄牌、跟注還是 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "你在{{t:cutoff|CO}}{{t:open|開池}}到 {{n:pf.open-size}}，按鈕位{{t:raise|加注}}到 {{n:pf.3bet.ip-total}}，盲注位都{{t:fold|棄牌}}。你至少要用多少比例的{{t:open|開池}}{{t:range|範圍}}繼續（{{t:call|跟注}}或 4-bet），按鈕位才無法拿任何手牌 3-bet 都獲利？"
    table: { position: CO }
    options:
      - { text: "約 {{n:mdf.vs-3bet-ip-size}} 的{{t:open|開池}}{{t:range|範圍}}", correct: true, why: "按鈕位冒險投入 {{n:pf.3bet.ip-total}}，是為了贏 {{n:vs3bet.win}}。如果你{{t:fold|棄牌}}的頻率高於 {{n:alpha.vs-3bet-ip-size}}，他的 3-bet 即使拿最差的手牌也能獲利。" }
      - { text: "約一半的{{t:range|範圍}}", why: "作為最低限度太多了：從數學上看，{{n:mdf.vs-3bet-ip-size}} 就夠了。根據求解器解答和圖表，{{t:open|開池者}}約有 {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} 的{{t:open|開池}}會{{t:fold|棄牌}}，所以繼續的部分不到{{t:range|範圍}}的一半。" }
      - { text: "永遠繼續，任何手牌都是", why: "這樣你會用輸給按鈕位{{t:range|範圍}}的手牌去付 3-bet。把{{t:open|開池}}中最弱的部分{{t:fold|棄掉}}才是正確的。" }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "你在{{t:cutoff|CO}}{{t:open|開池}}到 {{n:pf.open-size}}，按鈕位{{t:raise|加注}}到 {{n:pf.3bet.ip-total}}，盲注位都{{t:fold|棄牌}}。你怎麼做？"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "不同花的 KJ 在{{t:out-of-position}}時常被 AK、AJ 和 KQ 壓制，翻牌後也很難打。教學資料建議這裡{{t:fold}}。" }
      - { text: "{{t:call|跟注}}", why: "因為是高牌所以很誘人，但{{t:out-of-position}}時這手牌{{t:equity-realization|實現權益}}的能力很差，而且常輸給更好的踢腳。" }
      - { text: "4-bet", why: "KJo 太弱，不適合{{t:value|為了價值}} 4-bet；當作{{t:bluff}}，它也阻擋不了按鈕位會繼續的手牌。" }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "你在{{t:cutoff|CO}}{{t:open|開池}}到 {{n:pf.open-size}}，按鈕位{{t:raise|加注}}到 {{n:pf.3bet.ip-total}}，盲注位都{{t:fold|棄牌}}。你怎麼做？"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "4-bet", correct: true, why: "AK 通常要 4-bet：它想把整手籌碼打進去，能阻擋對手的 AA 和 KK，並壓制 AQ、KQ 和較弱的 A。" }
      - { text: "{{t:call|跟注}}", why: "部分資料來源有時會{{t:call|跟注}} AK，但通常你會 4-bet：{{t:out-of-position}}時，{{t:call|跟注}}後你會失去{{t:initiative|主動權}}和價值。" }
      - { text: "{{t:fold|棄牌}}", why: "AK 是翻牌前最好的手牌之一。在這裡{{t:fold|棄牌}}是大錯。" }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "你在按鈕位{{t:open|開池}}到 {{n:pf.open-size}}，{{t:small-blind}}{{t:fold|棄牌}}，{{t:big-blind}}{{t:raise|加注}}到 {{n:pf.3bet.oop-total}}。你怎麼做？"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "同花{{t:connectors|連張}}在{{t:in-position}}時能很好地{{t:equity-realization|實現權益}}：能做成{{t:straight|順子}}和同花，沒中時也很容易在翻牌{{t:fold|棄掉}}。" }
      - { text: "{{t:fold|棄牌}}", why: "{{t:in-position|有位置}}時，這手牌的可玩性足以防守。{{t:fold|棄牌}}會太緊。" }
      - { text: "4-bet", why: "當作{{t:bluff}}，同花 A 更適合，因為它們能阻擋 AA 和 AK。87s 更想看翻牌。" }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "你在按鈕位{{t:open|開池}}到 {{n:pf.open-size}}，{{t:small-blind}}{{t:fold|棄牌}}，{{t:big-blind}}{{t:raise|加注}}到 {{n:pf.3bet.oop-total}}。你怎麼做？"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "根據其中一個資料來源，面對大尺寸的 3-bet，即使{{t:in-position}}，最小的{{t:pair|對子}}也要{{t:fold|棄掉}}：它們主要靠中暗三條獲利，而價格太高。另一個資料來源則允許{{t:in-position}}時{{t:call|跟注}}它們。" }
      - { text: "{{t:call|跟注}}，因為我有{{t:position|位置}}", why: "{{t:position|位置}}有幫助，但面對到 {{n:pf.3bet.oop-total}} 的 3-bet，對一手必須中暗三條的牌來說，價格太高。" }
      - { text: "4-bet", why: "{{t:pair|對子}} 33 不是 4-bet 的手牌：既不是價值牌，也不是好的{{t:bluff}}。" }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "你在{{t:cutoff|CO}}{{t:open|開池}}到 {{n:pf.open-size}}，按鈕位{{t:raise|加注}}到 {{n:pf.3bet.ip-total}}，盲注位都{{t:fold|棄牌}}。你怎麼做？"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "4-bet", correct: true, why: "其中一個資料來源在絕大多數情況下會 4-bet QQ（和 JJ）：按鈕位會用許多較弱的{{t:pair|對子}}和 A 繼續。" }
      - { text: "{{t:call|跟注}}", correct: true, why: "也是好打法：另一個資料來源把 QQ 放在{{t:call|跟注}}{{t:range|範圍}}裡，以免把按鈕位較弱的手牌打跑。資料來源看法不同，所以兩種打法都好。" }
      - { text: "{{t:fold|棄牌}}", why: "QQ 是翻牌前第三好的手牌。{{t:fold|棄牌}}是大錯。" }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "你在{{t:cutoff|CO}}{{t:open|開池}}到 {{n:pf.open-size}}，按鈕位{{t:raise|加注}}到 {{n:pf.3bet.ip-total}}，盲注位都{{t:fold|棄牌}}。你怎麼做？"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "強同花 A 是{{t:call|跟注}}{{t:range|範圍}}的核心：能阻擋 AA 和 AK，還能做成同花和好的{{t:pair|對子}}。" }
      - { text: "{{t:fold|棄牌}}", why: "太緊了：AJs 是防守 3-bet 最好的手牌之一。" }
      - { text: "{{t:value|為了價值}} 4-bet", why: "AJs 太弱，不值得為整手籌碼而戰。按鈕位更好的手牌會壓制它。" }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "你在按鈕位{{t:open|開池}}到 {{n:pf.open-size}}，{{t:small-blind}}{{t:raise|加注}}到 {{n:pf.3bet.oop-total}}，{{t:big-blind}}{{t:fold|棄牌}}。你拿到 KK，想 4-bet。要加到多少？"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "約 {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|有位置}}時，4-bet 約為 3-bet 的 {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}}。如果{{t:small-blind}}{{t:call|跟注}}，{{t:pot|底池}}約有 {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}}（含死掉的{{t:big-blind|大盲}}），而後手籌碼約剩{{t:pot|底池}}的 {{n:spr.4bet.high}}–{{n:spr.4bet}} 倍。" }
      - { text: "{{n:pf.4bet.too-small}}", why: "太小了：你給對手{{t:out-of-position}}{{t:call}}的價格非常好。" }
      - { text: "全下 {{n:format.stack}}", why: "在 {{n:format.stack}} 的籌碼深度下，全下會把對手本來會跟 4-bet 的較弱手牌打跑。你會贏得更少。" }
---
3-bet 是對手對你{{t:open}}的回應。你有三種選擇：{{t:fold|棄牌}}、{{t:call|跟注}}，或再{{t:raise|加注}}一次，也就是 4-bet。

:::note 這些規則的來源
本課根據多個來源的教學資料，以及其他求解器公布的結果，而不是本 App 的求解器。本 App 的求解器在面對 3-bet 的情境下尚未通過驗證，因此這些規則標示為經驗法則。
:::

## 要繼續多少

當按鈕位把你在{{t:cutoff|CO}}的{{t:open}}{{t:raise|加注}}到 {{n:pf.3bet.ip-total}}，他冒險投入這麼多，是為了贏 {{n:vs3bet.win}}。如果你{{t:fold|棄牌}}的頻率高於 {{n:alpha.vs-3bet-ip-size}}，他的 3-bet 用任何手牌都能獲利。所以你至少要用約 {{n:mdf.vs-3bet-ip-size}} 的{{t:open|開池}}{{t:range|範圍}}繼續。

根據一份公布的求解器解答（{{t:cutoff|CO}}面對按鈕位到 {{n:pf.3bet.ip-total}} 的 3-bet），{{t:open|開池者}}約有 {{n:pf.vs3bet.pub1.fold}} 的{{t:open|開池}}會{{t:fold|棄牌}}，約 {{n:pf.vs3bet.pub1.call}} 會{{t:call|跟注}}，約 {{n:pf.vs3bet.pub1.4bet}} 會 4-bet；另一個來源的簡化圖表則約為 {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}。我們採用接近這兩個來源的區間：{{t:fold}}約 {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}，{{t:call}}約 {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}，4-bet 約 {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}。{{t:fold|棄牌}}的上限剛好低於 {{n:alpha.vs-3bet-ip-size}} 這個門檻：如果棄牌更頻繁，按鈕位的 3-bet 用任何手牌都能獲利。要{{t:call|跟注}}，你需要約 {{n:eq.call-3bet-ip-size}} 的權益：你補 {{n:vs3bet.call}} 進{{t:pot|底池}}，{{t:call|跟注}}後底池會有 {{n:vs3bet.pot-after}}。

## {{t:out-of-position|沒有位置}}時要謹慎選擇

{{t:out-of-position|沒有位置}}時，你用翻牌後好打的手牌{{t:call|跟注}}：主要是同花高牌（KQs、QJs）、強同花 A、中等和高的{{t:pair|對子}}，以及部分同花{{t:connectors|連張}}。較弱的不同花手牌，例如 KJo、ATo 或 QTo，常被壓制，所以要{{t:fold|棄掉}}。

## {{t:in-position|有位置}}時防守更寬

{{t:in-position|有位置}}時，你也會用 66 到 TT 的{{t:pair|對子}}和同花{{t:connectors|連張}}（T9s、98s、87s）{{t:call|跟注}}。根據其中一個資料來源，面對大尺寸的 3-bet，即使{{t:in-position}}，最小的{{t:pair|對子}}也要{{t:fold|棄掉}}：它們主要靠中暗三條獲利，而價格太高。另一個資料來源則允許{{t:in-position}}時{{t:call|跟注}}它們。

## 4-bet

AA、KK 和 AK 通常要{{t:value|為了價值}} 4-bet；部分資料來源有時會{{t:call|跟注}} AK。QQ 和 JJ 各來源打法不同：一個主要 4-bet，另一個{{t:call|跟注}}。當作{{t:bluff}}，最好的是同花 A，例如 A5s：它們能阻擋對手的 AA 和 AK，被{{t:call|跟注}}後還有機會做成{{t:flush}}和{{t:straight|順子}}。4-bet 的尺寸在{{t:in-position}}時約為 3-bet 的 {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}}，{{t:out-of-position}}時約為 {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}}。例如，你在按鈕位面對{{t:small-blind|小盲}}到 {{n:pf.3bet.oop-total}} 的 3-bet 要 4-bet 時（{{t:big-blind}}已{{t:fold|棄牌}}），你{{t:raise|加注}}到 {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}；你在{{t:cutoff|CO}}面對按鈕位到 {{n:pf.3bet.ip-total}} 的 3-bet 要 4-bet 時，你{{t:raise|加注}}到約 {{n:pf.4bet.oop-example.low}}。{{t:call|跟注}}後，後手籌碼約剩{{t:pot|底池}}的 {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} 倍，所以好牌很容易把剩下的籌碼打進去。
