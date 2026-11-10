---
id: m6.l2
module: m6
order: 2
title: "跟注還是棄牌"
sub: "無位置時防守持續下注"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "翻牌圈。{{t:pot|底池}}裡有 {{n:ex.third.pot}}，按鈕位持續下注，{{t:bet|下注}} {{n:ex.third.bet}}。你需要多少權益才能{{t:call|跟注}}？"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "你補上 {{n:ex.third.bet}}，{{t:call|跟注}}後{{t:pot|底池}}會有 {{n:ex.third.total}}：{{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}。小額持續下注給你非常好的價格。" }
      - { text: "{{n:alpha.bet-third}}", why: "這是 alpha：按鈕位的{{t:bluff|詐唬}}需要成功的頻率。計算所需權益時，分母還要加上你自己的{{t:call|跟注}}。" }
      - { text: "{{n:mdf.bet-third}}", why: "這是{{t:mdf}}，指的是{{t:range|範圍}}中的一部分，而不是單一手牌的權益。何況在翻牌圈{{t:out-of-position|無位置}}時，你的防守會略少於{{t:mdf}}。" }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "翻牌圈。{{t:pot|底池}}裡有 {{n:ex.pot}}，按鈕位持續下注，{{t:bet|下注}} {{n:ex.bet.three-quarters}}。你需要百分之多少的權益才能{{t:call|跟注}}？請輸入數字。"
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "你補上 {{n:ex.bet.three-quarters}}，{{t:call|跟注}}後{{t:pot|底池}}會有 {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}。{{n:ex.bet.three-quarters}} ÷ 這個總和 = {{n:eq.bet-three-quarters}}。這幾乎是面對 1/4 {{t:pot|底池}}持續下注時（{{n:eq.bet-quarter}}）的兩倍。"
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "同一手牌、同一個翻牌。一次按鈕位{{t:bet|下注}} 1/3 {{t:pot|底池}}，另一次下注整個{{t:pot|底池}}。你的防守會怎麼改變？"
    table: { position: BB }
    options:
      - { text: "面對整個{{t:pot|底池}}的下注，你用較窄的{{t:range|範圍}}防守", correct: true, why: "下注越大，價格越差：所需權益從 {{n:eq.bet-third}} 升到 {{n:eq.bet-pot}}，{{t:mdf}}則從 {{n:mdf.bet-third}} 降到 {{n:mdf.bet-pot}}。原本跟小額下注的最弱手牌，現在你要{{t:fold|棄牌}}。" }
      - { text: "防守方式一樣，因為是同一手牌", why: "手牌一樣，但價格不同。面對{{t:pot|底池}}大小的下注，你需要 {{n:eq.bet-pot}} 的權益，而不是 {{n:eq.bet-third}}。" }
      - { text: "面對整個{{t:pot|底池}}的下注，你防守更寬，因為大額下注更常是{{t:bluff|詐唬}}", why: "沒有這種規則。大額下注通常代表{{t:polarized|兩極化}}的{{t:range|範圍}}（非常強的牌和{{t:bluff|詐唬}}），無論如何對你來說價格都比較差。" }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "你在{{t:big-blind|大盲注}}防守按鈕位的{{t:open|開池}}。翻牌圈你{{t:check|過牌}}，按鈕位持續下注 1/3 {{t:pot|底池}}。你怎麼做？"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "中{{t:pair|對子}}能贏按鈕位所有的{{t:bluff|詐唬}}（沒有{{t:pair|對子}}的牌），而你只需要 {{n:eq.bet-third}} 的權益就能{{t:call|跟注}}。這是標準防守。" }
      - { text: "{{t:fold|棄牌}}", why: "太緊了。面對小額持續下注，你要{{t:fold|棄掉}}的是沒有{{t:pair|對子}}也沒有{{t:draw|聽牌}}的最弱手牌，而不是{{t:pair|對子}}。" }
      - { text: "過牌加注", why: "通常你會{{t:call|跟注}}。{{t:raise|加注}}之後，付錢給你的主要是更好的牌和{{t:draw|聽牌}}；面對小額持續下注，用這種牌過牌加注是求解器很少用的打法。" }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "你在{{t:big-blind|大盲注}}防守按鈕位的{{t:open|開池}}。翻牌圈你{{t:check|過牌}}，按鈕位持續下注 3/4 {{t:pot|底池}}。你怎麼做？"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你沒有{{t:pair|對子}}，也沒有{{t:draw|聽牌}}（沒有黑桃，{{t:straight|順子}}也還很遠）。面對大額持續下注，你需要 {{n:eq.bet-three-quarters}} 的權益，而{{t:out-of-position|無位置}}時只靠高牌很少能走到攤牌。就算 Q 或 J 成了{{t:pair|對子}}，也不一定會贏。" }
      - { text: "{{t:call|跟注}}", why: "很誘人，因為 Q 和 J 都比牌面大。但在這個價格下，光有高牌不夠：轉牌圈你常會再面對一次下注，然後{{t:fold|棄牌}}。" }
      - { text: "過牌加注", why: "更適合拿來{{t:bluff|詐唬}}的是有{{t:draw|聽牌}}的牌，因為它們有第二條獲勝的路。這手牌一條都沒有。" }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "你在{{t:big-blind|大盲注}}防守按鈕位的{{t:open|開池}}。翻牌圈你{{t:check|過牌}}，按鈕位持續下注 1/3 {{t:pot|底池}}。你怎麼做？"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "兩張高牌加上後門{{t:flush-draw|同花聽牌}}（三張黑桃：轉牌和河牌都需要來黑桃）。在 {{n:eq.bet-third}} 的價格下，這足以{{t:call|跟注}}。" }
      - { text: "過牌加注", why: "通常不會。過牌加注主要用最強的牌和{{t:draw|聽牌}}（{{t:flush|同花}}、{{t:oesd|兩頭順子聽牌}}）。後門{{t:flush-draw|同花聽牌}}很弱：按鈕位跟注時，你通常只剩下高牌。這手牌你要{{t:call|跟注}}。" }
      - { text: "{{t:fold|棄牌}}", why: "面對小額持續下注太緊了。後門{{t:draw|聽牌}}加上兩張高牌，在 {{n:eq.bet-third}} 的價格下有足夠的權益。" }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "你在{{t:big-blind|大盲注}}防守按鈕位的{{t:open|開池}}。翻牌圈你{{t:check|過牌}}，按鈕位持續下注 1/3 {{t:pot|底池}}。你怎麼做？"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "你有卡{{t:straight|順}}聽牌（等 Q），還有一張比牌面大的 K。{{t:call|跟注}}買的是一張牌：轉牌中卡順的機率約 {{n:odds.gutshot.flop-turn}}，K 則再提供幾張成{{t:top-pair|頂對}}的補牌。合起來低於 {{n:eq.bet-third}} 的價格，但中{{t:straight|順子}}後你會贏得更多（隱含賠率），而且單靠 K 有時也能贏按鈕位的{{t:bluff|詐唬}}。面對小額持續下注，這足以{{t:call|跟注}}。" }
      - { text: "{{t:fold|棄牌}}", why: "太緊了：{{t:draw|聽牌}}加一張高牌，面對小額持續下注已經足夠。" }
      - { text: "過牌加注全下", why: "你用一手還什麼都沒有的牌，冒險押上整個籌碼量。這種尺寸會把較弱的牌趕走，只有更好的牌會付錢。" }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "你在{{t:big-blind|大盲注}}防守按鈕位的{{t:open|開池}}。翻牌圈你{{t:check|過牌}}，按鈕位持續下注 1/3 {{t:pot|底池}}。你怎麼做？"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你沒有{{t:pair|對子}}，也沒有{{t:flush-draw|同花聽牌}}；只有很弱的後門{{t:straight-draw|順子聽牌}}（需要兩張特定的牌），而且你沒有任何一張牌比牌面大。在 A、K 的翻牌上，按鈕位有很多強牌。價格不錯，但這手牌幾乎永遠無法實現它。" }
      - { text: "{{t:call|跟注}}，因為{{t:mdf}}是 {{n:mdf.bet-third}}", why: "{{t:mdf}}是你整個{{t:range|範圍}}的參考點，而不是用最弱的牌付錢的理由。在翻牌圈{{t:out-of-position|無位置}}時，你可以防守得略少於{{t:mdf}}。" }
      - { text: "過牌加注", why: "在 A、K 的翻牌上，{{t:range-advantage|範圍優勢}}在按鈕位那邊，而你也沒有能提供第二條獲勝之路的{{t:draw|聽牌}}。" }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "為什麼在翻牌圈{{t:out-of-position|無位置}}時，你不會用每一手權益只要稍高於價格的牌{{t:call|跟注}}？"
    table: { position: BB }
    options:
      - { text: "因為你無法實現全部的權益", correct: true, why: "權益是在沒有後續{{t:bet|下注}}、直接打到攤牌時的機會。{{t:out-of-position|無位置}}時，你在轉牌和河牌都要先行動，常會在下一次下注時{{t:fold|棄牌}}。弱牌因此實現的會少於它的權益。" }
      - { text: "因為按鈕位在翻牌圈總是有強牌", why: "按鈕位{{t:open|開池}}和持續下注都很寬，也包括{{t:bluff|詐唬}}。問題在於你的{{t:position|位置}}，而不是他的牌力。" }
      - { text: "因為要把{{t:chips|籌碼}}留給更好的機會", why: "重要的是每個決定的{{t:expected-value|期望值}}，而不是省{{t:chips|籌碼}}。" }
---
在 M5，你以{{t:aggressor|進攻方}}的身分打持續下注。現在你坐在另一邊：你在{{t:big-blind|大盲注}}防守，翻牌圈過牌，按鈕位持續下注。記住 M5 的內容：持續下注是翻牌前{{t:raise|加注}}的玩家所做的{{t:bet|下注}}，而{{t:range-advantage|範圍優勢}}取決於翻牌的{{t:texture|牌面結構}}。

## 持續下注的價格

首先，算出你需要多少權益（M2 的公式）。小額持續下注給你很好的價格，大額持續下注則明顯比較差。

| 按鈕位的持續下注 | 所需權益 | {{t:mdf}} |
|---|---|---|
| 1/4 {{t:pot|底池}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 {{t:pot|底池}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 {{t:pot|底池}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 {{t:pot|底池}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| 整個{{t:pot|底池}} | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

{{t:mdf}}指出方向：下注越大，你防守的手牌越少。在翻牌圈{{t:out-of-position|無位置}}時，你可以防守得略少於{{t:mdf}}，因為按鈕位的{{t:bluff|詐唬}}還有權益；但面對小額持續下注，你不會大量{{t:fold|棄牌}}。

## {{t:out-of-position|無位置}}時實現得較少

權益是在沒有後續{{t:bet|下注}}、一路打到最後時的機會。{{t:out-of-position|無位置}}時，你在每一條{{t:street|街}}都要先行動，所以常會在看到攤牌之前就{{t:fold|棄牌}}。沒有{{t:draw|聽牌}}的弱牌，實現的會少於權益所顯示的。同花色的牌、{{t:connectors|連張}}和{{t:pair|對子}}實現得較多，因為它們能做成強牌，或本來就已經領先。

## 用哪些牌{{t:call|跟注}}

面對小額持續下注（約 1/3 {{t:pot|底池}}），你繼續打的牌有：

- 幾乎任何{{t:pair|對子}}，包括中對和底對，
- {{t:flush-draw|同花聽牌}}和{{t:straight|順子}}聽牌，包括帶高牌的卡順聽牌，
- 帶後門{{t:draw|聽牌}}的高牌，例如三張同花色的牌，
- 通常也包括以 A 為最大牌的牌。

記住 M2 的內容：在翻牌圈{{t:call|跟注}}一個{{t:bet|下注}}買的是一張牌，所以你要拿{{t:draw|聽牌}}和轉牌的機率比較。這個機率有時會略低於小額持續下注的價格。但如果中牌後你能贏得比現在{{t:pot|底池}}裡更多的錢（也就是隱含賠率，你會在 M7 計算），或這手牌有時不用中牌也能贏，例如靠一張高牌，{{t:call|跟注}}仍然划算。

## 哪些牌{{t:fold|棄牌}}

- 沒有{{t:pair|對子}}、沒有{{t:draw|聽牌}}，也沒有 A 或比牌面大的牌；在有 A 的翻牌上，你會{{t:fold|棄掉}}更多這類牌，
- 持續下注很大時，通常也棄掉沒有{{t:draw|聽牌}}的兩張高牌（不過在 K 為最大牌的{{t:dry|乾燥}}翻牌上，求解器會用許多帶 A 的牌{{t:call|跟注}}）；你比較會在有後門{{t:draw|聽牌}}時{{t:call|跟注}}，最好是聽最大的{{t:flush|同花}}。

持續下注越大，就有越多最弱的手牌從{{t:call|跟注}}轉為棄牌。
