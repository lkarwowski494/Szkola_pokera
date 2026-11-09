---
id: m7.l4
module: m7
order: 4
title: "探測下注與防守"
sub: "當對手過牌或第二次下注"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "按鈕位{{t:open|開池}}，你在{{t:big-blind|大盲位}}{{t:call|跟注}}。翻牌時你們都過牌。轉牌時你先下注。這種{{t:bet}}叫什麼？"
    table: { position: BB }
    options:
      - { text: "探測下注", correct: true, why: "對：探測下注是翻牌前的{{t:aggressor}}沒有打 C-bet 而是{{t:check|過牌}}之後，你在轉牌{{t:out-of-position}}時的{{t:bet}}。" }
      - { text: "C-bet", why: "C-bet 是由翻牌前{{t:raise|加注}}的玩家{{t:bet|下注}}。你只是{{t:call|跟注}}。" }
      - { text: "過牌加注", why: "過牌加注是先{{t:check}}，再對對手的{{t:bet|下注}}{{t:raise}}。這裡你是先下注，沒有{{t:raise|加注}}任何人。" }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "為什麼按鈕位在翻牌{{t:check|過牌}}後，你在轉牌可以比平常更常下注？"
    table: { position: BB }
    options:
      - { text: "因為按鈕位拿很多強牌都會下注，所以{{t:check|過牌}}後他的強牌比較少", correct: true, why: "對：強牌通常會打 C-bet。按鈕位{{t:check|過牌}}後的{{t:range|範圍}}有較多中等牌和弱牌，你可以用{{t:bet|下注}}攻擊它。" }
      - { text: "因為{{t:check}}一定代表按鈕位什麼都沒有", why: "不一定：按鈕位有時會拿強牌{{t:check|過牌}}來設陷阱抓你。不過這種強牌比他下注時少。" }
      - { text: "因為轉牌時是你有{{t:position|位置}}", why: "不對：每一{{t:street|輪}}按鈕位都在你之後行動。探測{{t:bet|下注}}是在{{t:out-of-position}}時做的。" }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "按鈕位在翻牌{{t:check|過牌}}。在哪個{{t:board|牌面}}上，你從{{t:big-blind|大盲位}}更常做探測{{t:bet|下注}}？"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "對：低牌更常擊中{{t:big-blind|大盲位}}寬廣的防守（小{{t:pair|對子}}、{{t:connectors|連張}}），而按鈕位{{t:check|過牌}}後在這裡很少有強牌。" }
      - { text: "[[Ac Kd 8h Js]]", why: "在高牌{{t:board|牌面}}上，{{t:range-advantage|範圍優勢}}在按鈕位：他的很多 A 和 K 都擊中了。這裡你較少做探測{{t:bet|下注}}。" }
      - { text: "兩者一樣常", why: "{{t:texture|牌面結構}}很重要，就像 M5 的 C-bet：低牌面你更常下注，高牌面較少。" }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "你在{{t:big-blind}}防守按鈕位的{{t:open|開池}}。翻牌時你們都{{t:check|過牌}}了。轉牌是 3。你先行動。你怎麼做？"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "下注（探測下注）", correct: true, why: "你有{{t:oesd}}（4 或 9），而且是在符合你{{t:range|範圍}}的低{{t:board|牌面}}上。按鈕位{{t:fold|棄牌}}你就贏，他{{t:call|跟注}}的話你仍有 {{n:outs.oesd}} 張補牌。" }
      - { text: "{{t:check|過牌}}", correct: true, why: "也可以：拿著{{t:draw|聽牌}}，如果按鈕位也{{t:check|過牌}}，你就能免費看河牌。不過探測下注通常更好，因為按鈕位在翻牌{{t:check|過牌}}後{{t:range}}偏弱，而你有很強的{{t:semi-bluff}}。" }
      - { text: "{{t:fold|棄牌}}", why: "沒有人{{t:bet|下注}}，所以你可以免費{{t:check|過牌}}（第 1 單元的規則）。{{t:fold|棄牌}}會無故放棄{{t:pot|底池}}。" }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "你在{{t:big-blind}}防守按鈕位的{{t:open|開池}}。翻牌時你們都{{t:check|過牌}}了。轉牌是 3。你先行動。你怎麼做？"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "下注（探測下注）", correct: true, why: "{{t:top-pair|頂對}}很適合做探測下注：按鈕位較弱的{{t:pair|對子}}和高牌會付錢給你，而且{{t:bet|下注}}就不會讓他們免費看牌。" }
      - { text: "{{t:check|過牌}}", why: "按鈕位在翻牌{{t:check|過牌}}後，常常是沒有{{t:pair|對子}}的高牌。如果他再次{{t:check|過牌}}，就能免費拿到一張可能打敗你的牌，而你也賺不到他較弱牌的錢。" }
      - { text: "{{t:fold|棄牌}}", why: "沒有人{{t:bet|下注}}，所以你可以免費{{t:check|過牌}}。而且拿著{{t:top-pair|頂對}}你會想下注。" }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "你在{{t:big-blind}}防守按鈕位的{{t:open|開池}}。翻牌時你們都{{t:check|過牌}}了。轉牌是 J。你先行動。你怎麼做？"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "你沒有{{t:pair|對子}}也沒有{{t:draw|聽牌}}，而高{{t:board}}有利於按鈕位的{{t:range|範圍}}。在這種{{t:board|牌面}}上沒有補牌的探測下注，只有在按鈕位{{t:fold|棄牌}}時才會贏，而他在這裡有很多 A、K 和 J。" }
      - { text: "下注（探測下注）", why: "探測{{t:bet|下注}}比較常用在低牌面，以及有{{t:pair|對子}}或補牌的手牌。這裡你兩者都沒有。" }
      - { text: "{{t:fold|棄牌}}", why: "你可以免費{{t:check|過牌}}，所以{{t:fold}}沒有任何好處（第 1 單元的規則）。" }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "你在{{t:big-blind}}防守。你在翻牌{{t:call|跟注}}了按鈕位的 C-bet。轉牌是 2，你{{t:check|過牌}}，按鈕位在 {{n:ex.pot}} 的{{t:pot|底池}}中{{t:bet|下注}} {{n:ex.bet.three-quarters}}。你怎麼做？"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你只有卡順聽牌（J）：河牌約 {{n:odds.gutshot.turn-river}} 的機會，而你需要 {{n:eq.bet-three-quarters}}。沒有{{t:pair|對子}}、只剩一張牌要發，這手牌擋不住{{t:second-barrel|第二槍}}。" }
      - { text: "{{t:call|跟注}}", why: "價格比你的機會高好幾倍：{{n:eq.bet-three-quarters}} 對上約 {{n:odds.gutshot.turn-river}}。隱含賠率補不了這麼大的差距。" }
      - { text: "過牌加注", why: "{{t:second-barrel|第二槍}}的{{t:range}}比 C-bet 更強：按鈕位更常有 K 或更好的牌，不會{{t:fold|棄牌}}。只有 {{n:outs.gutshot}} 張補牌，這是很貴的{{t:bluff}}。" }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "你在{{t:big-blind}}防守。你在翻牌{{t:call|跟注}}了按鈕位的 C-bet。轉牌是 K，你{{t:check|過牌}}，按鈕位在 {{n:ex.pot}} 的{{t:pot|底池}}中只{{t:bet|下注}} {{n:ex.bet.quarter}}。你怎麼做？"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "你有{{t:oesd}}（J 或 6）：約 {{n:odds.oesd.turn-river}}。小注只需要 {{n:eq.bet-quarter}}，幾乎剛好相等，而且中牌後你還能在河牌再贏一些。" }
      - { text: "{{t:fold|棄牌}}", why: "下注這麼小，價格幾乎等於你的機會（{{n:eq.bet-quarter}} 對上約 {{n:odds.oesd.turn-river}}），而隱含賠率讓決定傾向{{t:call}}。" }
      - { text: "{{t:raise|加注}}全下", why: "你用一手還沒成牌的牌押上全部籌碼，而按鈕位拿 K 不會{{t:fold|棄牌}}。價格這麼好，{{t:call|跟注}}就夠了。" }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "你在{{t:big-blind}}防守。你在翻牌{{t:call|跟注}}了按鈕位的 C-bet。轉牌是 5，你{{t:check|過牌}}，按鈕位在 {{n:ex.pot}} 的{{t:pot|底池}}中{{t:bet|下注}} {{n:ex.bet.three-quarters}}。你怎麼做？"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "{{t:top-pair|頂對}}太強，不該在空白牌上{{t:fold|棄牌}}：它能贏{{t:semi-bluff|半詐唬}}和較弱的 K。你需要 {{n:eq.bet-three-quarters}}，而對上{{t:second-barrel|第二槍}}的{{t:range|範圍}}，這種{{t:pair}}通常有這麼多勝率。" }
      - { text: "{{t:fold|棄牌}}", why: "太緊了。{{t:second-barrel|第二槍}}比 C-bet 強，但按鈕位也會用{{t:draw|聽牌}}和{{t:bluff|詐唬}}來{{t:bet|下注}}。{{t:top-pair|頂對}}全都贏。" }
      - { text: "{{t:raise|加注}}", why: "{{t:raise|加注}}之後，較差的牌會{{t:fold|棄牌}}，而更好的 K 和暗三條會付錢。中等踢腳的{{t:top-pair|頂對}}不是適合{{t:raise|加注}}的牌。" }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "為什麼對上{{t:second-barrel|第二槍}}時，你的防守要比對上翻牌 C-bet 時更緊？"
    table: { position: BB }
    options:
      - { text: "因為對手用更窄的{{t:range|範圍}}{{t:bet|下注}}開{{t:second-barrel|第二槍}}，尺寸通常也更大，而{{t:draw|聽牌}}只剩一張牌", correct: true, why: "對：對手在轉牌會放棄一部分{{t:bluff|詐唬}}，較大的下注會降低{{t:mdf}}（3/4 {{t:pot|底池}}時為 {{n:mdf.bet-three-quarters}}），而你的{{t:draw|聽牌}}機會少了一半。弱{{t:pair|對子}}和沒有補牌的手牌，你會比翻牌時更常{{t:fold|棄牌}}。" }
      - { text: "因為轉牌時要省{{t:chips}}", why: "重要的是每個決定的{{t:expected-value}}，而不是節省。你防守更緊，是因為對手用更強的牌下注。" }
      - { text: "不，你要防守更寬，因為你已經投入很多{{t:chips|籌碼}}", why: "已經投入的不會回來。你要根據現在的價格和對手{{t:range|範圍}}的強度做決定。" }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "轉牌。對手在 {{n:ex.pot}} 的{{t:pot|底池}}中{{t:bet|下注}} {{n:ex.bet.three-quarters}}。{{t:mdf}} 是多少？請輸入百分比數字。"
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + 下注) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}。在一個已發表的轉牌範例中，求解器平均防守接近{{t:mdf}}；{{t:out-of-position}}時，你有時會防守得少一些（翻牌和轉牌都是）。當你知道對手較少{{t:bluff|詐唬}}時，就更常{{t:fold|棄牌}}（計算方式在 M8 關於抓{{t:bluff|詐唬}}的那一課）。"
---
在轉牌你會遇到兩種新情況：按鈕位沒有打 C-bet 而是{{t:check|過牌}}，或是他打了 C-bet 並第二次下注。第一種情況你可以主動出擊，第二種情況你的防守要比翻牌時更緊。

## 探測下注

探測下注是翻牌前的{{t:aggressor}}在翻牌{{t:check|過牌}}之後，你在轉牌{{t:out-of-position}}時的{{t:bet}}。按鈕位拿很多強牌都會打 C-bet，所以{{t:check|過牌}}後他的強牌比較少。他的{{t:range}}較弱，你可以攻擊它。

- **低牌面更常做**，例如 [[8c 5d 2s 3h]]：低牌會擊中你寬廣的防守。
- **高牌面較少做**，例如 [[Ac Kd 8h Js]]：{{t:range-advantage}}仍在按鈕位那邊。

## 用什麼牌做探測下注

- **{{t:pair|對子}}**：想從按鈕位的高牌拿到付錢，也不想讓他免費看牌，
- **強{{t:draw|聽牌}}**：有兩種贏法。

沒有{{t:pair|對子}}也沒有補牌的手牌就{{t:check|過牌}}。

## 對抗{{t:second-barrel|第二槍}}的防守

當你{{t:call|跟注}}了 C-bet，而按鈕位第二次下注，他的{{t:range}}會比翻牌時更窄也更強：他已經放棄了一部分{{t:bluff|詐唬}}。你的{{t:draw|聽牌}}只剩一張牌。因此：

- {{t:draw|聽牌}}只在價格好或有隱含賠率時才{{t:call|跟注}}（上一課），
- 沒有補牌的手牌和最弱的{{t:pair|對子}}更常{{t:fold|棄牌}}，
- {{t:top-pair}}通常仍然{{t:call|跟注}}。

{{t:mdf}}仍是參考基準：面對 3/4 {{t:pot|底池}}的下注時是 {{n:mdf.bet-three-quarters}}。在一個已發表的轉牌範例中，求解器平均防守接近這個數值；{{t:out-of-position}}時，你有時會防守得少一些。當對手{{t:bluff|詐唬}}的頻率低於{{t:mdf}}的假設時，你也會防守得少一些。

:::note 這些規則從哪來
探測下注和對抗{{t:second-barrel|第二槍}}的防守規則，是來自教學資料和求解器分析的經驗法則。轉牌防守接近{{t:mdf}}，是由一個已發表的求解器範例呈現的。App 不提供百分比頻率，因為不同來源依牌面而有差異。關於微注玩家用哪些牌{{t:bet|下注}}探測的數據，需要有描述族群的來源（樣本、{{t:stakes|級別}}、平台），所以這裡不列出。
:::
