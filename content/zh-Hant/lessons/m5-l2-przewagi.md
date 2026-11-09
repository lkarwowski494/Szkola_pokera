---
id: m5.l2
module: m5
order: 2
title: "翻牌對誰有利"
sub: "範圍優勢與堅果優勢"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。翻牌：[[Ks 7d 2c]]。誰有{{t:range-advantage|範圍優勢}}？"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "你，從按鈕位{{t:open|開池}}的人", correct: true, why: "對：你的{{t:range|範圍}}裡有所有的 KK、AK 和 KQ。{{t:big-blind|大盲}}拿到其中最強的牌會在翻牌前加注，而他寬鬆的防守大多是在這裡沒中的牌。" }
      - { text: "{{t:big-blind|大盲}}", why: "不對：{{t:big-blind}}防守得很寬，所以弱牌比較多。他拿到帶好踢腳的 K 的頻率比你低。" }
      - { text: "沒有人，翻牌是隨機的", why: "翻牌是隨機的，但{{t:range|範圍}}不是。同一個翻牌會更符合高牌較多的那個{{t:range|範圍}}。" }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "你從按鈕位{{t:open|開池}}，{{t:big-blind}}{{t:call|跟注}}。翻牌：[[7s 6h 5d]]。誰在這裡更常拿到非常強的牌（{{t:two-pair}}或{{t:straight}}）？"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "{{t:big-blind|大盲}}", correct: true, why: "對：{{t:big-blind}}會防守很多同花{{t:connectors|連張}}，以及帶 6 或 7 的牌。你在按鈕位則有更多在這裡沒中的高牌。這就是{{t:big-blind|大盲}}的{{t:nuts-advantage}}。" }
      - { text: "你，從按鈕位{{t:open|開池}}的人", why: "不對：你的{{t:range}}裡滿是高牌。你有更多{{t:overpair|超對}}（比{{t:board|公共牌}}上每張牌都大的{{t:pocket-pair|口袋對}}，例如 TT、JJ），但{{t:two-pair|兩對}}和{{t:straight|順子}}較少；暗三條（用{{t:pocket-pair|口袋對}}組成的三條）你們兩人差不多多。" }
      - { text: "兩人一樣常", why: "不對：{{t:range|範圍}}的組成不同。{{t:big-blind|大盲}}寬鬆的防守裡有很多小牌，而你的{{t:range}}裡多是高牌。" }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "為什麼只{{t:call|跟注}}你的{{t:open}}的{{t:big-blind}}，在 [[Ad 8s 3c]] 翻牌上很少拿到 AA 或 AK？"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "因為拿到這些牌時，他通常會在翻牌前{{t:raise|加注}}（3-bet）", correct: true, why: "對：{{t:big-blind}}會用 3-bet 來打最強的牌，所以只{{t:call|跟注}}之後，他的{{t:range}}裡最好的牌很少。你的{{t:range|範圍}}裡則全都有。" }
      - { text: "因為{{t:big-blind}}從不玩 A", why: "不對：{{t:big-blind}}會防守很多 A，例如 A5 或 A9。他缺的主要是那些他會加注的最強牌。" }
      - { text: "因為翻牌上已經有一張 A", why: "{{t:board|公共牌}}上的 A 會減少兩個{{t:range|範圍}}裡 A 的{{t:combo|組合}}數，但不會在兩者之間造成差異。差異來自翻牌前的決定。" }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "你有{{t:range-advantage|範圍優勢}}，但對手的最強牌跟你一樣多。你比較會用什麼尺寸下注？"
    options:
      - { text: "小注，而且頻繁", correct: true, why: "對：{{t:range-advantage}}代表你可以頻繁下注。沒有{{t:nuts-advantage|堅果優勢}}時，大額{{t:bet}}面對對手最強的牌風險很大，而較弱的牌面對小注反正也會{{t:fold|棄牌}}。" }
      - { text: "大注，因為你有優勢", why: "不對：決定用大尺寸的是{{t:nuts-advantage}}，也就是更多最強的牌。你在這裡沒有。" }
      - { text: "一律{{t:check|過牌}}", why: "太保守了：{{t:range-advantage}}是頻繁下注的理由，只是要下小注。" }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "你的{{t:range|範圍}}裡最強的牌比對手的{{t:range|範圍}}多得多。這對你有什麼好處？"
    options:
      - { text: "你可以下大注，因為很少會碰到更好的牌", correct: true, why: "對：這就是{{t:nuts-advantage}}。大額{{t:bet}}能從對手的中等牌拿到更多，而被更好的牌{{t:raise}}的情況很少見。" }
      - { text: "你必須一律下小注", why: "不對：只有{{t:range-advantage|範圍優勢}}時，你才選小尺寸。{{t:nuts-advantage|堅果優勢}}讓你可以下更大的注。" }
      - { text: "沒有，只有你的手牌重要", why: "你的手牌很重要，但對手只看得到你的{{t:range}}。{{t:bet|下注}}尺寸要選得能同時適用很多手牌。" }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "對手有兩張點數不同的牌，例如 [[Jc Td]]。翻牌有多少百分比的機率不會和其中任何一張成對？請輸入數字。"
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "在 {{n:cards.unseen.preflop}} 張未知的牌中，只有 {{n:pair.outs.unpaired}} 張能組成{{t:pair|對子}}：剩下的三張 J 和三張 10。翻牌有 {{n:cards.board.flop}} 張，其中沒有任何一張是這 {{n:pair.outs.unpaired}} 張的機率約為 {{n:flop.miss.unpaired}}。所以你只有約 {{n:flop.hit.unpaired}} 的機率中{{t:pair|對子}}。"
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "沒有{{t:pair|對子}}的手牌，約有 {{n:flop.miss.unpaired}} 的機率在翻牌沒中{{t:pair|對子}}。這對持續下注有什麼意義？"
    options:
      - { text: "對手常常什麼都沒有，所以即使是小額{{t:bet}}也常能直接贏下{{t:pot|底池}}", correct: true, why: "對：這是持續下注的基礎。沒中不一定代表會{{t:fold}}（對手可能有{{t:draw}}或高牌），但他的{{t:range|範圍}}裡弱牌很多。" }
      - { text: "對手剛好會在 {{n:flop.miss.unpaired}} 的情況下{{t:fold|棄牌}}", why: "不對：沒有{{t:pair|對子}}的對手有時會帶著{{t:draw|聽牌}}或高牌{{t:call|跟注}}，有時手上本來就有{{t:pair|對子}}。這只是翻牌沒中他的頻率的近似值。" }
      - { text: "你也一樣常沒中，所以持續下注沒有意義", why: "不對：你也常沒中，但對手不知道是什麼時候。你作為{{t:aggressor|主動方}}（翻牌前最後一個{{t:raise|加注}}的玩家），{{t:range}}在很多翻牌上更強，而對手{{t:fold|棄牌}}時，{{t:bet}}就能贏下{{t:pot|底池}}。" }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "那麼，翻牌有多少百分比的機率至少和沒有{{t:pair|對子}}的手牌中的一張成對？請輸入數字。"
    answer: flop.hit.unpaired
    explanation: "這是上一個數字的補數：{{n:prob.certain}} 減去 {{n:flop.miss.unpaired}} 約為 {{n:flop.hit.unpaired}}，也就是大約每三個翻牌有一個。"
---
翻牌前，玩家的{{t:range|範圍}}看起來各不相同。從按鈕位{{t:open|開池}}的人有很多高牌。{{t:big-blind|大盲}}防守得很寬，但最強的牌（AA、KK、AK）通常會{{t:raise|加注}}，所以只{{t:call|跟注}}時，這些牌很少。翻牌會更符合其中一個{{t:range|範圍}}，而這決定了誰可以頻繁下注。

## {{t:range-advantage|範圍優勢}}

當你的牌在某個翻牌上平均比對手的牌強，你就有{{t:range-advantage|範圍優勢}}。在 [[Ks 7d 2c]] 上，從按鈕位{{t:open|開池}}之後，是你有更多帶好踢腳的 K 和更多高{{t:pair|對子}}。{{t:big-blind|大盲}}在這裡有很多沒中的牌。

在低張、{{t:connected|連接}}的翻牌上，例如 [[7s 6h 5d]]，{{t:range-advantage}}幾乎消失，反而是{{t:big-blind}}更常拿到最強的牌：他會防守很多同花{{t:connectors|連張}}以及帶 6 或 7 的牌，所以更常有{{t:two-pair}}或{{t:straight|順子}}。

## {{t:nuts-advantage|堅果優勢}}

{{t:nuts-advantage|堅果優勢}}是指你的{{t:range|範圍}}裡有更多最強的牌（「{{t:nuts|堅果牌}}」）。{{t:range-advantage|範圍優勢}}告訴你可以多常下注。{{t:nuts-advantage|堅果優勢}}告訴你可以下多大：當你的最強牌比對手多得多，就可以用更大的尺寸下注。只有{{t:range-advantage|範圍優勢}}時，就下小注。

## 對手通常沒中

沒有{{t:pair|對子}}的手牌，例如 [[Jc Td]]，約有 {{n:flop.miss.unpaired}} 的機率在翻牌沒中{{t:pair|對子}}。在 {{n:cards.unseen.preflop}} 張未知的牌中，只有 {{n:pair.outs.unpaired}} 張能和它的牌成對。資料常寫約 {{n:flop.hit.one-pair}}：這是剛好中一個{{t:pair|對子}}的機率；算上{{t:two-pair|兩對}}和{{t:three-of-a-kind|三條}}，命中率約為 {{n:flop.hit.unpaired}}。所以即使你自己什麼都沒中，翻牌的{{t:bet}}也常能直接贏下{{t:pot|底池}}。沒中不一定代表會{{t:fold}}：對手可能有{{t:draw}}或兩張高牌。

:::note 這些原則從何而來
{{t:range-advantage|範圍優勢}}和{{t:nuts-advantage|堅果優勢}}的概念，來自以求解器結果為基礎的賽局理論資料（術語表和一篇關於持續下注尺寸的文章）。本課的數字是 App 的精確計算結果。
:::
