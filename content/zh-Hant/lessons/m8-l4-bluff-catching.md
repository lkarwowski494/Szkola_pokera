---
id: m8.l4
module: m8
order: 4
title: "抓詐唬"
sub: "河牌該用哪些牌跟注"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "你在防守{{t:big-blind}}。河牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}}滿{{t:pot|底池}}。黑桃沒有成同花。你的{{t:pair|一對}} 9 扮演什麼角色？"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "抓詐唬牌：只贏{{t:bluff|詐唬}}", correct: true, why: "下注滿{{t:pot|底池}}時，按鈕位至少要有 K 才會為{{t:value|價值}}下注，而{{t:bluff|詐唬}}主要用沒中的{{t:draw|聽牌}}。你的{{t:pair|一對}}輸給他每一手{{t:value|價值}}牌，並贏他每一手{{t:bluff|詐唬}}。" }
      - { text: "{{t:value|價值}}牌", why: "{{t:value|價值}}牌要能贏那些會付錢或為{{t:value|價值}}下注的牌。{{t:pair|一對}} 9 輸給按鈕位的每一手 K 以及更好的牌。" }
      - { text: "毫無機會的牌", why: "{{t:pair|一對}} 9 能贏沒中的{{t:draw|聽牌}}，而按鈕位正是用這些牌{{t:bluff|詐唬}}。它有機會，但只對{{t:bluff|詐唬}}有效。" }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "河牌。{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:bet|下注}}滿{{t:pot|底池}}：{{n:ex.bet.pot}}。你拿著抓詐唬牌。他的下注中至少要有百分之多少是{{t:bluff|詐唬}}，{{t:call|跟注}}才划算？請輸入數字。"
    answer: eq.bet-pot
    explanation: "你的權益就是他的下注中{{t:bluff|詐唬}}所占的比例。你補上 {{n:ex.bet.pot}}，是為了贏得{{t:call|跟注}}後的{{t:pot|底池}}：{{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}。這和上一課均衡狀態下{{t:bluff|詐唬}}所占的比例是同一個數字。"
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "河牌。對手{{t:bet|下注}}半個{{t:pot|底池}}。你拿著抓詐唬牌，估計他的下注中{{t:bluff|詐唬}}約占 {{n:catch.ex.bluffs-low}}。你怎麼做？"
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你需要 {{n:eq.bet-half}} 的權益，而你的抓詐唬牌只有 {{n:catch.ex.bluffs-low}} 的情況會贏。{{t:call|跟注}}會虧損。" }
      - { text: "{{t:call|跟注}}，因為 {{t:mdf}} 是 {{n:mdf.bet-half}}", why: "{{t:mdf}} 是用來防範{{t:bluff|詐唬}}夠頻繁的對手。{{t:bluff|詐唬}}太少時，用抓詐唬牌{{t:call|跟注}}就是送錢。" }
      - { text: "{{t:raise|加注}}", why: "你的牌只贏{{t:bluff|詐唬}}。{{t:raise|加注}}後，{{t:bluff|詐唬}}會{{t:fold|棄牌}}，付錢的是{{t:value|價值}}牌：你輸得更多。" }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "河牌。對手{{t:bet|下注}}滿{{t:pot|底池}}。你拿著抓詐唬牌，估計他的下注中{{t:bluff|詐唬}}約占 {{n:catch.ex.bluffs-high}}。你怎麼做？"
    options:
      - { text: "{{t:call|跟注}}", correct: true, why: "你需要 {{n:eq.bet-pot}} 的權益，而{{t:bluff|詐唬}}占了 {{n:catch.ex.bluffs-high}}。對手{{t:bluff|詐唬}}的比例高於均衡，所以{{t:call|跟注}}能賺錢。" }
      - { text: "{{t:fold|棄牌}}，因為下注很大", why: "大額下注把價格拉高到 {{n:eq.bet-pot}}，但{{t:bluff|詐唬}}比這更多。重點是比較這兩個數字，而不只是看下注大小。" }
      - { text: "{{t:raise|加注}}全下", why: "抓詐唬牌不{{t:raise|加注}}：{{t:bluff|詐唬}}會{{t:fold|棄牌}}，付錢的只有比你好的牌。" }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "對手在河牌下注滿{{t:pot|底池}}，並且剛好有 {{n:bluff.share.bet-pot}} 的情況在{{t:bluff|詐唬}}。你用抓詐唬牌{{t:call|跟注}}能賺多少？"
    options:
      - { text: "零：{{t:call|跟注}}和{{t:fold|棄牌}}結果一樣", correct: true, why: "{{t:bluff|詐唬}}比例等於 {{n:eq.bet-pot}}，正好就是{{t:call|跟注}}的價格。贏{{t:bluff|詐唬}}的錢抵消輸給{{t:value|價值}}牌的錢，所以對手讓你{{t:call|跟注}}或{{t:fold|棄牌}}都賺不到錢。" }
      - { text: "賺錢，因為{{t:bluff|詐唬}}很多", why: "{{t:bluff|詐唬}}剛好和價格一樣多。只有對手{{t:bluff|詐唬}}的頻率高於 {{n:eq.bet-pot}}，你才會賺錢。" }
      - { text: "虧錢，因為{{t:value|價值}}牌比{{t:bluff|詐唬}}多", why: "{{t:value|價值}}牌確實比較多，但{{t:call|跟注}}時你是拿 {{n:ex.bet.pot}} 去贏 {{n:ex.pot}} + {{n:ex.bet.pot}}。在這個{{t:bluff|詐唬}}比例下，兩者正好互相抵消。" }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "黑桃沒有成同花。河牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}}滿{{t:pot|底池}}。你拿著帶 10 踢腳的{{t:top-pair|頂對}}。這兩手牌中，哪一手{{t:call|跟注}}比較好？"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "沒有黑桃，你就不會擋到沒中的{{t:flush-draw|同花聽牌}}，而這正是按鈕位主要的{{t:bluff|詐唬}}（例如黑桃 J10）。他的{{t:range|範圍}}裡會留下更多你能贏的{{t:bluff|詐唬}}。" }
      - { text: "[[Kc Ts]]", why: "黑桃 10 拿走了按鈕位一部分用來{{t:bluff|詐唬}}的沒中{{t:draw|聽牌}}（例如黑桃 J10）。他相對留下更多{{t:value|價值}}牌，所以{{t:call|跟注}}比較差。" }
      - { text: "沒差別", why: "攤牌時的強度一樣，但你手上的黑桃會擋到按鈕位的{{t:bluff|詐唬}}。這會改變你實際面對的牌。" }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "河牌發出第三張紅心。你{{t:check|過牌}}，按鈕位{{t:bet|下注}}滿{{t:pot|底池}}。你拿著{{t:pair|一對}} 9。這兩手牌中，哪一手{{t:call|跟注}}比較好？"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "紅心 A 擋住了 A 高的{{t:flush|同花}}，這是按鈕位最強的{{t:value|價值}}牌之一。當你擋住他的{{t:value|價值}}牌，他的下注中就會留下更多{{t:bluff|詐唬}}。" }
      - { text: "[[Ad 9c]]", why: "同樣是{{t:pair|一對}}，但你沒有擋到任何{{t:flush|同花}}。按鈕位所有能贏你的同花都還在。" }
      - { text: "沒差別", why: "攤牌時兩手牌一樣強，但紅心 A 拿走了按鈕位一部分{{t:value|價值}}牌。" }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "黑桃沒有成同花。河牌你{{t:check|過牌}}，按鈕位{{t:bet|下注}}半個{{t:pot|底池}}。你怎麼做？"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "你只有 7 高。你甚至輸給按鈕位大部分的{{t:bluff|詐唬}}（帶黑桃的 Q、帶黑桃的 J），所以這不是抓詐唬牌。你要用其他牌防守。" }
      - { text: "{{t:call|跟注}}，因為價格很好", why: "價格（{{n:eq.bet-half}}）幫不了一手幾乎輸給所有牌、連{{t:bluff|詐唬}}都贏不了的牌。" }
      - { text: "{{t:raise|加注}}當作{{t:bluff|詐唬}}", why: "在河牌用{{t:bluff|詐唬}}{{t:raise|加注}}是進階又有風險的打法。把毫無機會的牌{{t:fold|棄掉}}更簡單，也更好。" }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "河牌。對手{{t:bet|下注}}半個{{t:pot|底池}}。{{t:mdf}} 是 {{n:mdf.bet-half}}。你優先用哪些牌防守？"
    options:
      - { text: "最好的抓詐唬牌：能贏{{t:bluff|詐唬}}，且有好的{{t:blocker|阻擋牌}}", correct: true, why: "你用能贏{{t:bluff|詐唬}}的牌防守，在強度相近的牌中，選擇擋住對手{{t:value|價值}}牌、又不擋他{{t:bluff|詐唬}}的那些。連{{t:bluff|詐唬}}都輸的牌就{{t:fold|棄牌}}。" }
      - { text: "隨機選{{t:range|範圍}}中的 {{n:mdf.bet-half}}", why: "{{t:mdf}} 告訴你要防守多少，而不是用什麼防守。隨機防守會用永遠贏不了的牌付錢。" }
      - { text: "只用{{t:value|價值}}牌", why: "這樣你防守得太少，對手用任何牌{{t:bluff|詐唬}}都能賺錢。要達到 {{t:mdf}}，你得加上最好的抓詐唬牌。" }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "為什麼在河牌用抓詐唬牌要{{t:call|跟注}}，而不是{{t:raise|加注}}？"
    options:
      - { text: "因為{{t:raise|加注}}後，{{t:bluff|詐唬}}會{{t:fold|棄牌}}，付錢的只有更好的牌", correct: true, why: "你的牌只贏{{t:bluff|詐唬}}。{{t:raise|加注}}正好把這些牌逼走，留下你會輸的牌。" }
      - { text: "因為河牌不能{{t:raise|加注}}", why: "可以。只是用抓詐唬牌{{t:raise|加注}}，等於把它變成對付不會{{t:fold|棄牌}}的牌的{{t:bluff|詐唬}}。" }
      - { text: "因為{{t:call|跟注}}永遠比較便宜", why: "重點不是成本，而是誰留在牌局中。{{t:raise|加注}}後留下的是能贏你的牌。" }
---
現在你換到另一邊：對手在河牌下注，而你拿著中等強度的牌。這通常是一手**抓詐唬牌**，也就是輸給對手每一手{{t:value|價值}}牌、但能贏他{{t:bluff|詐唬}}的牌。

## 你的權益就是他的{{t:bluff|詐唬}}

抓詐唬牌只在對手{{t:bluff|詐唬}}時才會贏。所以它的權益，就是對手下注中{{t:bluff|詐唬}}所占的比例。當這個比例高於 M2 學到的所需權益時，你就{{t:call|跟注}}：

| 對手下注 | 所需權益（{{t:bluff|詐唬}}至少占） |
|---|---|
| 1/3 {{t:pot|底池}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|底池}} | {{n:eq.bet-half}} |
| 滿{{t:pot|底池}} | {{n:eq.bet-pot}} |

當對手{{t:bluff|詐唬}}的比例剛好和上一課一樣（滿{{t:pot|底池}}下注時為 {{n:bluff.share.bet-pot}}），{{t:call|跟注}}不賺不賠。他{{t:bluff|詐唬}}得更頻繁，你就{{t:call|跟注}}；更少，你就{{t:fold|棄牌}}。這些數字未計入抽水；抽水會讓所需權益略微提高。

## 防守多少，用什麼防守

要防守多少，看 M6 的 {{t:mdf}}：面對半個{{t:pot|底池}}的下注，約為{{t:range|範圍}}的 **{{n:mdf.bet-half}}**。這一課回答第二個問題：**用哪些牌**。你用最好的抓詐唬牌{{t:call|跟注}}：在強度相近的牌中，選擇{{t:blocker|阻擋牌}}較好的；連{{t:bluff|詐唬}}都輸的牌就{{t:fold|棄牌}}。

較好的抓詐唬牌：

- 能贏更多{{t:bluff|詐唬}}（{{t:pair|一對}}比單純的高牌好），
- 擋住對手的{{t:value|價值}}牌，
- 不擋他的{{t:bluff|詐唬}}。

## {{t:call|跟注}}時的{{t:blocker|阻擋牌}}

這是上一課的鏡像。黑桃沒有成同花時，對手會用沒中的{{t:flush-draw|同花聽牌}}{{t:bluff|詐唬}}。你手上的黑桃會拿走他一部分{{t:bluff|詐唬}}，所以{{t:call|跟注}}比較差。{{t:flush|同花}}成形時，你手上該花色的 A 會拿走他最強的同花，所以{{t:call|跟注}}比較好。

## 別用抓詐唬牌加注

{{t:raise|加注}}後，{{t:bluff|詐唬}}會{{t:fold|棄牌}}，付錢的只有能贏你的牌。拿抓詐唬牌時，你只{{t:call|跟注}}或{{t:fold|棄牌}}。

:::note 當對手很少{{t:bluff|詐唬}}時
這些規則假設對手的{{t:bluff|詐唬}}大致接近均衡。面對很少在河牌用大額下注{{t:bluff|詐唬}}的玩家，你{{t:fold|棄牌}}的頻率要比 {{t:mdf}} 指示的更高：當{{t:bluff|詐唬}}少於價格所要求的比例，{{t:call|跟注}}就會虧損（本課的計算）。依{{t:blocker|阻擋牌}}挑選抓詐唬牌的規則，來自教學資料與求解器分析（河牌打法、{{t:blocker|阻擋牌}}）：在抓詐唬牌（反正只能贏{{t:bluff|詐唬}}的牌）之中，求解器選擇{{t:call|跟注}}時，更看重{{t:blocker|阻擋牌}}，而不只是牌力本身。
:::
