---
id: m1.l1
module: m1
order: 1
title: "一手牌的流程"
sub: "盲注、各條街與可用的動作"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "現在是翻牌，你前面沒有人{{t:bet|下注}}。你可以怎麼做？"
    options:
      - { text: "{{t:check|過牌}}或{{t:bet|下注}}", correct: true, why: "你前面沒有{{t:bet|下注}}時，你有兩個選擇：免費讓這輪過去，或是自己{{t:bet|下注}}。" }
      - { text: "{{t:call|跟注}}", why: "沒有東西可以{{t:call|跟}}，因為沒有人下過任何注。" }
      - { text: "{{t:raise|加注}}", why: "只有別人{{t:bet|下注}}之後才能{{t:raise|加注}}。一輪中的第一筆{{t:bet|注}}稱為 bet。" }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "翻牌時會出現幾張{{t:community-cards|公共牌}}？"
    options:
      - { text: "3", correct: true, why: "翻牌是一次發三張。之後轉牌和河牌各再加一張。" }
      - { text: "1", why: "轉牌和河牌才是一次發一張。" }
      - { text: "5", why: "要到河牌，五張{{t:community-cards|公共牌}}才會全部發出。" }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "對手{{t:bet|下注}} 20 個{{t:chips|籌碼}}。你的手牌很弱，不想再玩下去。你會怎麼做？"
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "有人{{t:bet|下注}}而你不想付錢時，就{{t:fold|棄牌}}。你只會損失已經投入的部分。" }
      - { text: "{{t:check|過牌}}", why: "有{{t:bet|下注}}需要{{t:call|跟注}}時，不能過牌。" }
      - { text: "{{t:call|跟注}}", why: "{{t:call|跟注}}要花 20 個{{t:chips|籌碼}}。既然你不想玩，這就是損失。" }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "哪一個{{t:betting-round|下注輪}}是最後一輪？"
    options:
      - { text: "河牌", correct: true, why: "河牌是第五張{{t:community-cards|公共牌}}。如果河牌下注結束後還剩至少兩位玩家，他們就要亮出手牌（攤牌）。" }
      - { text: "轉牌", why: "轉牌是第四張牌，之後還有河牌。" }
      - { text: "翻牌", why: "翻牌是第一個有{{t:community-cards|公共牌}}的下注輪。" }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "你在{{t:big-blind|大盲注}}，其他人都{{t:fold|棄牌}}了，{{t:small-blind|小盲注}}只補齊了差額。你的手牌很弱。你會怎麼做？"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "你的{{t:big-blind|大盲注}}算作一筆{{t:bet|下注}}，而{{t:small-blind|小盲注}}只是跟平。沒有人{{t:raise|加注}}，所以你可以免費看翻牌。不用花錢的時候，手牌弱不是棄牌的理由。" }
      - { text: "{{t:fold|棄牌}}", why: "可以免費{{t:check|過牌}}時卻{{t:fold|棄牌}}，純粹是損失。" }
      - { text: "{{t:raise|加注}}", why: "拿 7-2 沒有什麼可以發展的；{{t:check|過牌}}能讓你免費看翻牌。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
每一手牌都有固定的順序。首先由兩位玩家投入強制下注，也就是**盲注**：{{t:small-blind|小盲注}}和{{t:big-blind|大盲注}}。這樣{{t:pot|底池}}裡永遠有東西可以爭。

翻牌前，{{t:big-blind|大盲注}}算作一筆{{t:bet|下注}}：想玩的人至少要{{t:call|跟注}}。翻牌前由{{t:big-blind|大盲注}}最後行動。如果沒有人{{t:raise|加注}}，他可以{{t:check|過牌}}，不用再付錢就看翻牌。

## 四個{{t:betting-round|下注輪}}

1. **翻牌前**：你只有自己的 2 張牌。
2. **翻牌**：3 張{{t:community-cards|公共牌}}發到{{t:board|牌面}}上。
3. **轉牌**：第四張牌。
4. **河牌**：第五張，也是最後一張牌。

如果河牌下注結束後還有至少兩位玩家在局中，他們就要亮出手牌。這就是**攤牌**：牌型最好的人贏得{{t:pot|底池}}。如果在這之前除了一人以外全部{{t:fold|棄牌}}，這位玩家不用亮牌就贏得{{t:pot|底池}}。

## 可用的動作

- **{{t:check|過牌}}**：你不投入任何籌碼。只有在這一輪你前面沒有人{{t:bet|下注}}或{{t:raise|加注}}時才可以（翻牌前，若沒有人{{t:raise|加注}}，{{t:big-blind|大盲注}}可以{{t:check|過牌}}）。
- **{{t:bet|下注}}**：一輪中的第一筆{{t:bet|注}}。之後課程的公式中，我們簡寫為「bet」。
- **{{t:call|跟注}}**：你補齊到對手{{t:bet|下注}}的金額。
- **{{t:raise|加注}}**：你把別人的{{t:bet|下注}}再加大。
- **{{t:fold|棄牌}}**：你丟掉手牌，並損失已經投入的部分。

:::note 重點整理
如果有人{{t:bet|下注}}，你可以{{t:fold|棄牌}}、{{t:call|跟注}}或{{t:raise|加注}}。如果沒有人{{t:bet|下注}}，你可以{{t:check|過牌}}或{{t:bet|下注}}。
:::

:::note 全下與{{t:side-pot|邊池}}
你{{t:bet|下注}}的金額不能超過你面前的籌碼。當你投入全部{{t:chips|籌碼}}，你就是**全下（all-in）**：之後不再參與下注，剩下的{{t:community-cards|公共牌}}會一路發完。你從每位對手身上最多只能贏到你自己投入的金額。如果其他人繼續加碼爭奪更多，超出的部分會放進**{{t:side-pot|邊池}}**，只有他們能爭奪。
:::
