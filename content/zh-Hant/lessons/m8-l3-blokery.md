---
id: m8.l3
module: m8
order: 3
title: "阻擋牌"
sub: "該用哪一手牌詐唬"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "什麼是{{t:blocker|阻擋牌}}？"
    options:
      - { text: "你手中的一張牌，讓對手某種牌的{{t:combo|組合}}變少", correct: true, why: "你拿著的牌，對手不可能有。你有一張 A 時，對手的 A 就變少：A 的{{t:pair|對子}}變少、AK 變少、帶 A 的同花也變少。" }
      - { text: "{{t:board|公共牌}}上破壞{{t:draw|聽牌}}的牌", why: "口語上有時會這樣說{{t:board|公共牌}}上的牌，但這裡說的{{t:blocker|阻擋牌}}是你手中的牌。{{t:board|公共牌}}兩位玩家都看得到。" }
      - { text: "用來阻止對手下大注的小額下注", why: "那是所謂的 blocking bet，是另一回事。{{t:blocker|阻擋牌}}是你手中的一張牌，會減少對手的{{t:combo|組合}}數量。" }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "在沒有任何資訊時，AK 有 {{n:combos.unpaired}} 種{{t:combo|組合}}。你拿著一張 K（沒有 A）。對手可能有幾種 AK {{t:combo|組合}}？請輸入數字。"
    answer: combos.unpaired.one-blocked
    explanation: "A 有 {{n:cards.suits}} 張，K 剩 {{n:pair.outs.per-rank}} 張，因為有一張在你手上：{{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}。一張牌就移除了整整四分之一的{{t:combo|組合}}。"
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "{{t:pair|一對}} A 有 {{n:combos.pair}} 種{{t:combo|組合}}。你拿著一張 A。對手可能有幾種{{t:pair|一對}} A 的{{t:combo|組合}}？請輸入數字。"
    answer: combos.pair.one-blocked
    explanation: "A 剩 {{n:pair.outs.per-rank}} 張，三張牌只能組成 {{n:combos.pair.one-blocked}} 種{{t:pair|對子}}。你手中的一張 A 就移除了一半的 AA {{t:combo|組合}}。"
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "你拿著 [[Ah Kc]]。對手可能有幾種 AK {{t:combo|組合}}？"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "A 剩 {{n:pair.outs.per-rank}} 張，K 也剩 {{n:pair.outs.per-rank}} 張：{{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}。" }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "如果你只拿著 A 或只拿著 K，才會是這個數字。你兩種點數都阻擋了。" }
      - { text: "{{n:combos.unpaired}}", why: "這是你看到自己的牌之前，整副牌裡 AK {{t:combo|組合}}的數量。你的 A 和你的 K 不可能在對手手上。" }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "河牌來了第三張紅心，{{t:flush|同花}}成為可能。{{t:big-blind|大盲}}{{t:check|過牌}}。你手上只有 A 高牌，想要詐唬。哪一手牌拿來{{t:bluff|詐唬}}比較好？"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "紅心 A 阻擋了對手最強的同花：他不可能有帶 A 的{{t:flush|同花}}，而那是一定會付錢的牌。對手能{{t:call|跟注}}的牌變少，所以{{t:bluff|詐唬}}更常成功。" }
      - { text: "[[Ad 3c]]", why: "攤牌時強度一樣，但你沒有阻擋任何{{t:flush|同花}}。對手所有的同花都還在，他會用這些牌付錢。" }
      - { text: "沒差，兩手都只是 A 高牌", why: "攤牌時是這樣，但拿來{{t:bluff|詐唬}}就不是。紅心 A 會減少對手一定會付錢的同花數量。" }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "黑桃{{t:flush-draw|同花聽牌}}沒中。{{t:big-blind|大盲}}在河牌過牌。兩手牌都只有 Q8。用哪一手詐唬比較好？"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "沒有黑桃，你就不會阻擋對手沒中的{{t:draw|聽牌}}，而這些牌面對你的下注會{{t:fold|棄牌}}。兩手牌其餘的牌都一樣。" }
      - { text: "[[Qd 8s]]", why: "黑桃 8 阻擋了一部分沒中的{{t:flush-draw|同花聽牌}}（例如 [[8s 7s]]），對手本來會拿這些牌{{t:fold|棄牌}}。他相對剩下更多會付錢的牌。" }
      - { text: "沒差", why: "差別在 8 的花色。你手中的黑桃拿走了對手一部分會棄掉的牌。" }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "同樣的情況：黑桃沒中，{{t:big-blind|大盲}}{{t:check|過牌}}。你拿著兩手牌的其中一手。哪一手你{{t:bluff|詐唬}}，哪一手你{{t:check|過牌}}？"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "用 [[Qc Jd]] {{t:bluff|詐唬}}，用 [[9c 8c]] {{t:check|過牌}}", correct: true, why: "{{t:pair|一對}} 9 在{{t:check|過牌}}後能贏沒中的{{t:draw|聽牌}}。QJ 幾乎輸給所有牌，所以只有靠{{t:bluff|詐唬}}才能贏下{{t:pot|底池}}。" }
      - { text: "用 [[9c 8c]] {{t:bluff|詐唬}}，用 [[Qc Jd]] {{t:check|過牌}}", why: "剛好相反。用{{t:pair|一對}} 9 {{t:bluff|詐唬}}，等於放棄攤牌時的勝利；用 QJ {{t:check|過牌}}，等於不戰而放棄{{t:pot|底池}}。" }
      - { text: "兩手都{{t:bluff|詐唬}}", why: "{{t:pair|一對}} 9 不需要{{t:bluff|詐唬}}：{{t:check|過牌}}後它能贏很多牌。你要用沒有攤牌價值的牌來{{t:bluff|詐唬}}。" }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "你要從沒有攤牌價值的牌中挑選河牌的{{t:bluff|詐唬}}。手中哪種牌最有幫助？"
    options:
      - { text: "對手會拿來付錢的那些牌中的一張", correct: true, why: "你阻擋了他的價值牌：他的強牌變少，所以更常只剩下要棄掉的牌。" }
      - { text: "沒中的{{t:draw|聽牌}}那個花色的牌", why: "它阻擋的是對手會{{t:fold|棄掉}}的牌。這樣{{t:bluff|詐唬}}就比較少成功。" }
      - { text: "最大的牌，不管公共牌如何", why: "大牌在攤牌時有一點強度，但完全無法說明你阻擋了什麼。要看對手哪些牌會付錢。" }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "河牌來了第三張紅心。{{t:big-blind|大盲}}{{t:check|過牌}}。你有{{t:pair|一對}} 9 和紅心 A。你會怎麼做？"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|過牌}}", correct: true, why: "{{t:pair|一對}} 9 在{{t:check|過牌}}後能贏對手很多沒有{{t:pair|對子}}的牌。{{t:blocker|阻擋牌}}不會把有攤牌價值的牌變成好的{{t:bluff|詐唬}}：先挑出沒機會贏的牌，之後才看{{t:blocker|阻擋牌}}。" }
      - { text: "下注當作{{t:bluff|詐唬}}，因為我有紅心 A", why: "紅心 A 是很好的{{t:blocker|阻擋牌}}，但拿著{{t:pair|一對}} 9 {{t:bluff|詐唬}}會讓你虧：比較差的牌本來就會{{t:fold|棄牌}}，而同花和 K 會付錢。" }
      - { text: "下注拿{{t:value|價值}}", why: "誰會用更差的牌付錢？在可能成同花的{{t:board|公共牌}}上，比{{t:pair|一對}} 9 弱的牌幾乎都會{{t:fold|棄牌}}。" }
---
上一課你已經算出需要多少{{t:bluff|詐唬}}，也知道要用攤牌時沒機會贏的牌來{{t:bluff|詐唬}}。這種牌常常比你需要的還多。這時就由 **{{t:blocker|阻擋牌}}** 來決定。

## {{t:blocker|阻擋牌}}

你拿著的牌，對手不可能有。所以他含有這張牌的牌型{{t:combo|組合}}就變少了：

| 對手的牌 | 沒有{{t:blocker|阻擋牌}} | 你拿著一張該點數的牌 |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

當你同時拿著 A 和 K，對手只有 {{n:combos.unpaired.both-blocked}} 種 AK {{t:combo|組合}}。

## 阻擋對手會拿來付錢的牌

好的{{t:bluff|詐唬}}手中有一張對手會拿來 **{{t:call|跟注}}** 的牌。例如：河牌來了第三張紅心。你手中的紅心 A 代表對手沒有帶 A 的{{t:flush|同花}}，也就是一定會付錢的牌。他剩下更多要棄掉的牌。

## 不要阻擋對手會{{t:fold|棄掉}}的牌

當{{t:flush-draw|同花聽牌}}**沒中**，對手會{{t:fold|棄掉}}他沒中的{{t:draw|聽牌}}。如果你有這個花色的牌，他這類牌就變少，所以你的{{t:bluff|詐唬}}更常碰上會付錢的牌。在兩個類似的{{t:bluff|詐唬}}之中，選手中不帶沒中{{t:draw|聽牌}}花色的那一手。

## 先看攤牌強度

順序是固定的：先把{{t:check|過牌}}後能贏的牌放到一邊，再從剩下的牌中挑出{{t:blocker|阻擋牌}}最好的{{t:bluff|詐唬}}。好的{{t:blocker|阻擋牌}}不會讓攤牌能贏的{{t:pair|對子}}變成{{t:bluff|詐唬}}。{{t:blocker|阻擋牌}}會讓你在類似的牌之間做出取捨；它本身的效果很小，所以只有在牌力相近時才會成為關鍵（下一課挑選{{t:call|跟注}}時也一樣）。

:::note 這些規則從哪裡來
{{t:combo|組合}}數量來自組合數學。依{{t:blocker|阻擋牌}}挑選{{t:bluff|詐唬}}的規則來自教學大綱，以及教學資料和求解器分析。當其他{{t:bluff|詐唬}}不夠時，求解器也會用沒中的同花聽牌來{{t:bluff|詐唬}}。
:::
