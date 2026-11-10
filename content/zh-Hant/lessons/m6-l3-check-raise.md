---
id: m6.l3
module: m6
order: 3
title: "過牌加注"
sub: "何時對 c-bet 加注、加到多少"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "你在{{t:big-blind|大盲}}位防守按鈕位的{{t:open|開池}}。翻牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}} 1/3 {{t:pot|底池}}的 c-bet。你怎麼做？"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "過牌加注", correct: true, why: "在低張、{{t:connected|相連}}的翻牌上，{{t:two-pair|兩對}}是打{{t:value|價值}}的牌。在這類翻牌上，{{t:big-blind|大盲}}的{{t:range|範圍}}裡有{{t:straight|順子}}和{{t:two-pair|兩對}}，而按鈕位沒有{{t:nuts-advantage|堅果優勢}}。用{{t:raise|加注}}做大{{t:pot|底池}}，讓{{t:pair|對子}}和{{t:draw|聽牌}}付錢。" }
      - { text: "{{t:call|跟注}}", correct: true, why: "也不錯：在非常{{t:connected|相連}}的翻牌上，求解器拿部分{{t:two-pair|兩對}}只會{{t:call|跟注}}。過牌加注更常能做大{{t:pot|底池}}並保護你的牌。" }
      - { text: "{{t:fold|棄牌}}", why: "{{t:two-pair|兩對}}是這個翻牌上最強的牌之一。{{t:fold|棄牌}}是大錯。" }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|底池}}有 {{n:ex.third.pot}}，按鈕位{{t:bet|下注}} {{n:ex.third.bet}} 作為 c-bet。你有暗三條，想要過牌加注。你要{{t:raise|加注}}到多少？"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "加到 {{n:xr.example}}", correct: true, why: "這是 c-bet 的 {{n:xr.mult.example}}。按鈕位要再補 {{n:xr.example.extra}}，需要約 {{n:eq.vs-xr.example}} 的權益：較差的{{t:pair|對子}}和弱{{t:draw|聽牌}}（卡順）價格不夠，而{{t:flush|同花}}聽牌和{{t:oesd|兩頭順聽牌}}就得付錢進入大{{t:pot|底池}}。" }
      - { text: "加到 {{n:xr.too-small}}", sizeError: true, why: "動作對，但尺寸太小：按鈕位只需再補 {{n:xr.too-small.extra}}，需要約 {{n:eq.vs-xr.too-small}} 的權益。任何{{t:flush-draw|同花聽牌}}或{{t:straight|順子}}聽牌幾乎不用代價就會跟。" }
      - { text: "{{t:call|跟注}}", why: "翻牌有兩張紅心，又有能成{{t:straight|順子}}的牌，跟注會讓你失去價值和保護：轉牌很多牌會讓行動停下，或打敗你的牌。暗三條要馬上做大{{t:pot|底池}}。" }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|底池}}有 {{n:ex.third.pot}}，按鈕位{{t:bet|下注}} {{n:ex.third.bet}} 作為 c-bet。你過牌加注到 c-bet 的 {{n:xr.mult.example}}。你要{{t:raise|加注}}到多少？請輸入{{t:chips|籌碼}}數。"
    table: { position: BB }
    answer: xr.example
    explanation: "c-bet 是 {{n:ex.third.bet}}，所以 c-bet 的 {{n:xr.mult.example}} 就是 {{n:xr.example}}。過牌加注的尺寸以 c-bet 計算，而不是以{{t:pot|底池}}計算。"
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|底池}}原本有 {{n:ex.third.pot}}，按鈕位{{t:bet|下注}} {{n:ex.third.bet}}，你{{t:raise|加注}}到 {{n:xr.example}}。按鈕位需要百分之多少的權益才能{{t:call|跟注}}？請輸入數字。"
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "按鈕位要補 {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}。此時{{t:pot|底池}}有 {{n:xr.example.pot-after}}，他{{t:call|跟注}}後再多 {{n:xr.example.extra}}。{{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}。"
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|底池}}原本有 {{n:ex.third.pot}}，按鈕位{{t:bet|下注}} {{n:ex.third.bet}}，你只{{t:raise|加注}}到 {{n:xr.too-small}}。按鈕位需要多少權益才能{{t:call|跟注}}？"
    table: { position: BB }
    options:
      - { text: "約 {{n:eq.vs-xr.too-small}}", correct: true, why: "他要補 {{n:xr.too-small.extra}}，進入 {{n:xr.too-small.pot-after}} 的{{t:pot|底池}}：{{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}。這麼便宜，他幾乎任何牌都會跟，所以{{t:raise|加注}}要比 c-bet 大好幾倍。" }
      - { text: "約 {{n:eq.vs-xr.example}}", why: "這是你{{t:raise|加注}}到 {{n:xr.example}} 時他需要的權益。加到 {{n:xr.too-small}} 時，他只要補 {{n:xr.too-small.extra}}。" }
      - { text: "約 {{n:eq.bet-third}}", why: "這是你{{t:call|跟注}} c-bet 所需的權益。過牌加注後，你要算的是按鈕位的價格：他要補 {{n:xr.too-small.extra}}，進入 {{n:xr.too-small.pot-after}} 的{{t:pot|底池}}。" }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "你在{{t:big-blind|大盲}}位防守按鈕位的{{t:open|開池}}。翻牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}} 1/3 {{t:pot|底池}}的 c-bet。你怎麼做？"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "過牌加注", correct: true, why: "聽最大{{t:flush|同花}}的{{t:draw|聽牌}}是很好的{{t:semi-bluff|半詐唬}}：按鈕位{{t:fold|棄牌}}你就贏，他跟注的話你仍有 {{n:outs.flush}} 張補牌（轉牌約 {{n:odds.flush.flop-turn}}）。" }
      - { text: "{{t:call|跟注}}", correct: true, why: "也不錯：轉牌你約有 {{n:odds.flush.flop-turn}} 會中{{t:flush|同花}}，幾乎等於 {{n:eq.bet-third}} 的價格，而且中了最大{{t:flush|同花}}之後能贏更多（隱含賠率）。強{{t:draw|聽牌}}兩種打法都要用，你的過牌加注才不會只代表強牌。" }
      - { text: "{{t:fold|棄牌}}", why: "大錯：有 {{n:outs.flush}} 張補牌，轉牌你約有 {{n:odds.flush.flop-turn}} 會中最大{{t:flush|同花}}，幾乎等於 {{n:eq.bet-third}} 的價格，中了之後還能贏更多（隱含賠率）。而且你還可以過牌加注。" }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "你在{{t:big-blind|大盲}}位防守按鈕位的{{t:open|開池}}。翻牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}} 1/3 {{t:pot|底池}}的 c-bet。你怎麼做？"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "過牌加注", correct: true, why: "{{t:oesd|兩頭順聽牌}}（{{n:outs.oesd}} 張補牌）面對小 c-bet，正好有便宜的{{t:raise|加注}}機會。{{t:raise|加注}}可以讓你馬上贏，被{{t:call|跟注}}時你仍可能中牌。" }
      - { text: "{{t:call|跟注}}", correct: true, why: "也不錯：轉牌你約有 {{n:odds.oesd.flop-turn}} 會中{{t:straight|順子}}，比 {{n:eq.bet-third}} 的價格略低，但中了之後能贏更多（隱含賠率），而且轉牌如果沒人{{t:bet|下注}}，你還能免費看河牌。部分強{{t:draw|聽牌}}要{{t:call|跟注}}，你的{{t:call|跟注}}才不會全是弱牌。" }
      - { text: "{{t:fold|棄牌}}", why: "太緊：有 {{n:outs.oesd}} 張補牌，轉牌你約有 {{n:odds.oesd.flop-turn}} 會中{{t:straight|順子}}，只比 {{n:eq.bet-third}} 的價格低一點；其餘由隱含賠率和免費看河牌的機會補足。而且你還可以過牌加注。" }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "你在{{t:big-blind|大盲}}位防守按鈕位的{{t:open|開池}}。翻牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}} 1/3 {{t:pot|底池}}的 c-bet。你怎麼做？"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "踢腳弱的{{t:top-pair|頂對}}是用來{{t:call|跟注}}的牌。它贏得了按鈕位的{{t:bluff|詐唬}}，{{t:call|跟注}}能讓這些詐唬留在牌局中。" }
      - { text: "過牌加注", why: "通常你會{{t:call|跟注}}。{{t:raise|加注}}之後，付錢給你的主要是更好的牌和{{t:draw|聽牌}}；拿這種牌過牌加注，是求解器面對小 c-bet 時很少用的打法。" }
      - { text: "{{t:fold|棄牌}}", why: "面對小 c-bet，{{t:top-pair|頂對}}絕對強到不該{{t:fold|棄牌}}。" }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "你在{{t:big-blind|大盲}}位防守按鈕位的{{t:open|開池}}。翻牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}} 1/3 {{t:pot|底池}}的 c-bet。你怎麼做？"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你沒有{{t:pair|對子}}，也沒有{{t:flush-draw|同花聽牌}}；只有很弱的後門{{t:straight-draw|順子聽牌}}（需要兩張特定的牌），而且你的兩張牌都不比公共牌大。在有 A 的翻牌上，這類牌你要更常{{t:fold|棄牌}}。" }
      - { text: "以{{t:bluff|詐唬}}過牌加注", why: "過牌加注的{{t:bluff|詐唬}}主要用{{t:draw|聽牌}}（{{t:flush|同花}}、{{t:oesd|兩頭順聽牌}}），它們中牌後也能贏。這手牌只有很弱的後門{{t:draw|聽牌}}，而按鈕位在這裡有很多不會{{t:fold|棄牌}}的 A 和 K。" }
      - { text: "{{t:call|跟注}}", why: "價格不錯，但這手牌幾乎什麼都中不了：就算中了 6 或 5 的{{t:pair|對子}}，也會輸給按鈕位會繼續付錢的大多數牌。" }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "面對按鈕位哪一種 c-bet，你會更常過牌加注？"
    table: { position: BB }
    options:
      - { text: "1/4 {{t:pot|底池}}", correct: true, why: "小 c-bet 給你便宜的{{t:raise|加注}}機會，而按鈕位會用很寬、含很多弱牌的{{t:range|範圍}}打這種注。面對大 c-bet，你{{t:raise|加注}}得更少也更窄：主要是暗三條和{{t:two-pair|兩對}}，{{t:bluff|詐唬}}較少。" }
      - { text: "整個{{t:pot|底池}}", why: "面對大 c-bet，{{t:raise|加注}}代價很高，而且按鈕位的{{t:range|範圍}}更強。你更常{{t:call|跟注}}或{{t:fold|棄牌}}。" }
      - { text: "一樣常", why: "面對小 c-bet，你{{t:raise|加注}}得更頻繁也更寬；面對大 c-bet 則較少，主要用最強的牌。" }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "你對上一個翻牌幾乎從不{{t:fold|棄牌}}的按鈕位。他{{t:bet|下注}} 1/3 {{t:pot|底池}}的 c-bet。你怎麼做？"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "帶高張的卡順聽牌，在 {{n:eq.bet-third}} 的價格下是不錯的{{t:call|跟注}}。用{{t:bluff|詐唬}}過牌加注靠對手{{t:fold|棄牌}}賺錢，而這個對手幾乎不{{t:fold|棄牌}}，所以{{t:raise|加注}}失去了主要優勢。" }
      - { text: "過牌加注", why: "過牌加注的{{t:bluff|詐唬}}主要用強{{t:draw|聽牌}}，卡順聽牌不算在內。再說{{t:bluff|詐唬}}靠對手{{t:fold|棄牌}}賺錢，而這個對手幾乎不{{t:fold|棄牌}}：面對他，你主要為了{{t:value|價值}}而{{t:raise|加注}}。" }
      - { text: "{{t:fold|棄牌}}", why: "太緊：價格這麼好，帶高張的{{t:draw|聽牌}}值得防守，不管你對上的是誰。" }
---
過牌加注就是先{{t:check|過牌}}，再{{t:raise|加注}}對手的{{t:bet|下注}}。在{{t:big-blind|大盲}}位，這是對付 c-bet 的重要武器（多數時候你仍是在{{t:call|跟注}}和{{t:fold|棄牌}}之間選擇）：少了它，按鈕位幾乎任何牌都能便宜地 c-bet。

## 為什麼要{{t:raise|加注}}

過牌加注有兩個理由：

- **為了{{t:value|價值}}**：你有很強的牌（{{t:two-pair|兩對}}、暗三條），想做大{{t:pot|底池}}，
- **作為{{t:semi-bluff|半詐唬}}**：你有{{t:draw|聽牌}}（{{t:flush|同花}}、{{t:oesd|兩頭順聽牌}}），有兩種贏法：按鈕位{{t:fold|棄牌}}，或你中牌。

中等牌，例如踢腳弱的{{t:top-pair|頂對}}，通常{{t:call|跟注}}：{{t:raise|加注}}之後，按鈕位較差的牌更常{{t:fold|棄牌}}，較好的牌則會付錢。這是簡化說法：面對小 c-bet，求解器也會為了保護而{{t:raise|加注}}部分{{t:top-pair|頂對}}和弱{{t:pair|對子}}。反過來，在非常{{t:connected|相連}}的翻牌上，求解器拿{{t:two-pair|兩對}}常常只{{t:call|跟注}}。

## 什麼時候更常用

- **面對小 c-bet。** {{t:raise|加注}}很便宜，而按鈕位用很寬的{{t:range|範圍}}打小 c-bet。面對大 c-bet，你{{t:raise|加注}}得更少也更窄：主要是暗三條和{{t:two-pair|兩對}}，{{t:bluff|詐唬}}較少。
- **在低張、{{t:connected|相連}}的翻牌上**（例如 [[7h 6d 5s]]）。{{t:big-blind|大盲}}會防守很多小牌，這些牌在這裡會擊中{{t:straight|順子}}和{{t:two-pair|兩對}}，所以按鈕位在這裡沒有{{t:nuts-advantage|堅果優勢}}。
- **在對按鈕位有利的高張翻牌上較少用**，例如 K-J-T 或 A-A-K：在那裡，最強的牌是他比較多。

## 尺寸多大

過牌加注的尺寸以 c-bet 計算。例如：{{t:pot|底池}}有 {{n:ex.third.pot}}，c-bet 是 {{n:ex.third.bet}}。過牌加注到 c-bet 的 {{n:xr.mult.example}}，就是{{t:raise|加注}}到 {{n:xr.example}}：按鈕位要補 {{n:xr.example.extra}}，需要約 **{{n:eq.vs-xr.example}}** 的權益。只{{t:raise|加注}}到 {{n:xr.too-small}}，給他的價格約 **{{n:eq.vs-xr.too-small}}**：只要有任何{{t:draw|聽牌}}，他幾乎都會跟。所以你要{{t:raise|加注}}到 c-bet 的約 {{n:xr.mult.low}}–{{n:xr.mult.example}}，c-bet 越小就加越多，而不是最小加注。

:::note 不{{t:fold|棄牌}}的對手
過牌加注的{{t:bluff|詐唬}}靠對手{{t:fold|棄牌}}賺錢（回想第一課的 alpha）。面對翻牌幾乎從不{{t:fold|棄牌}}的玩家，你主要為了{{t:value|價值}}而{{t:raise|加注}}，{{t:bluff|詐唬}}則留給最強的{{t:draw|聽牌}}。
:::
