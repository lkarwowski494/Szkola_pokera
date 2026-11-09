---
id: m12.l2
module: m12
order: 2
title: "決策與結果"
sub: "評估打法，而不是河牌"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "翻牌前你拿著{{t:pair|一對}} A 把整個籌碼全押進去，對手拿著{{t:pair|一對}} K {{t:call|跟注}}。河牌發出一張 K，你輸了。你如何評價自己的決策？"
    options:
      - { text: "非常好", correct: true, why: "AA 對上 KK 約有 {{n:pf.aa-vs-kk}} 的情況會贏。約 {{n:res.kk-wins}} 的情況會輸，這是打牌的成本，不是錯誤。每一次你都會做同樣的選擇。" }
      - { text: "很差，應該打得更謹慎", why: "這是用結果評判。如果河牌換成另一張，同樣的決策看起來就會很棒。決策取決於你在這張牌發出之前知道什麼：約 {{n:pf.aa-vs-kk}} 的勝率。" }
      - { text: "無法評估，因為你輸了", why: "可以評估：你計算做決策當下的勝率。單一手牌的結果不會增加任何資訊。" }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "翻牌前全下時，AA 對上 KK 約有 {{n:pf.aa-vs-kk}} 的情況會贏。即使做了最好的決策，你仍會在百分之多少的情況下輸掉？請輸入數字。"
    answer: res.kk-wins
    explanation: "全部減去 {{n:pf.aa-vs-kk}}，約為 {{n:res.kk-wins}}。大約每五到六次，就有一次好的決策以輸牌收場。"
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "轉牌。你有乾淨的{{t:flush-draw|同花聽牌}}（{{n:outs.flush}} 張補牌），{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:bet|下注}} {{n:ex.bet.quarter}}。你{{t:call|跟注}}，{{t:flush|同花}}沒有成，你輸掉 {{n:ex.bet.quarter}}。你如何評價這次{{t:call|跟注}}？"
    options:
      - { text: "是好的", correct: true, why: "你需要 {{n:eq.bet-quarter}} 的勝率，而你約有 {{n:odds.flush.turn-river}}。這樣的{{t:call|跟注}}長期下來會賺錢，雖然在大多數單手牌中會輸。" }
      - { text: "很差，因為{{t:flush|同花}}沒有成", why: "{{t:flush|同花}}只有約 {{n:odds.flush.turn-river}} 的情況會成，所以沒中是最可能的結果。你依照價格評估決策，而這個價格是好的。" }
      - { text: "只有{{t:flush|同花}}成了才算好", why: "這正是用結果評判的定義。同一個決策的品質，不會因為之後發出的牌而改變。" }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "轉牌。乾淨的{{t:flush-draw|同花聽牌}}，{{t:pot|底池}}有 {{n:ex.pot}}，對手{{t:bet|下注}}整個{{t:pot|底池}}：{{n:ex.bet.pot}}。你{{t:call|跟注}}，河牌{{t:flush|同花}}成了。你如何評價這次{{t:call|跟注}}？"
    options:
      - { text: "很差，儘管贏了", correct: true, why: "你需要 {{n:eq.bet-pot}} 的勝率，而你約有 {{n:odds.flush.turn-river}}。這次你贏了，但重複很多次之後，這樣的{{t:call|跟注}}會虧損。" }
      - { text: "是好的，因為你贏了{{t:pot|底池}}", why: "贏了不會讓決策變好。在 {{n:eq.bet-pot}} 的價格和約 {{n:odds.flush.turn-river}} 的機會下，這次{{t:call|跟注}}長期會虧損。" }
      - { text: "是好的，因為{{t:flush|同花}}是最大的牌", why: "中牌後的牌力不會改變價格。重要的是比較：{{n:odds.flush.turn-river}} 的機會對上所需的 {{n:eq.bet-pot}}。" }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "你在檢討一手輸掉的牌。哪個問題最重要？"
    options:
      - { text: "以我當時擁有的資訊，這個決策的 {{t:expected-value|EV}} 是正的嗎？", correct: true, why: "這是唯一能區分錯誤和運氣差的問題。你計算價格、對上對手{{t:range|範圍}}的勝率，以及你在做決策當下知道的資訊。" }
      - { text: "如果我{{t:fold|棄牌}}，對手會拿到哪張牌？", why: "未來的牌不會改變決策的品質。只有你當時知道的資訊才算數。" }
      - { text: "我在這手牌輸了多少？", why: "損失的大小反映的是{{t:pot|底池}}，而不是決策。大輸可能來自好的決策，小輸也可能來自錯誤。" }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "朋友問你同一個打法在兩手牌中的表現：一手贏了，另一手輸了。你覺得他第一次打得比較好。這是怎麼回事？"
    options:
      - { text: "這是結果偏誤：你依照結局來評判決策", correct: true, why: "在心理學研究中，結果好的時候，人們會給同一個決策較高的評價，即使他們認為結果不該有影響。在得知結果之前先評估會有幫助。" }
      - { text: "第一個決策比較好，因為它奏效了", why: "既然打法相同，決策就相同。不同的只有結果，也就是運氣。" }
      - { text: "第二個決策比較好，因為它教人謙虛", why: "評價不會因結果而往任何一個方向改變。同樣的決策就有同樣的品質。" }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "連續三場{{t:session|牌局}}你打得比平常更積極，而且贏了。這能證明新風格比較好嗎？"
    options:
      - { text: "不能，三場{{t:session|牌局}}太少；你在手牌檢討中評估新打法", correct: true, why: "即使技術差距非常大（前 {{n:skill.pct}} 對上後 {{n:skill.pct}}），也要在約 {{n:skill.hands}} 手牌之後，才會在約 {{n:skill.ahead}} 的情況下領先。你兩種風格之間的差異要小得多。" }
      - { text: "能，結果顯示了什麼有效", why: "幾場{{t:session|牌局}}的結果主要是雜訊。在{{t:standard-deviation|標準差}}約 {{n:var.sd}} 的情況下，即使打了 {{n:var.hands.k}} 千手牌，誤差仍約有 ± {{n:var.ci.wr}}。" }
      - { text: "能，如果你贏得比平常多", why: "小樣本裡贏得更多，仍然是小樣本。你用計算和手牌檢討來評估打法。" }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "一項針對數百萬手線上牌局的研究，顯示了技術何時開始勝過運氣。具體測量的是什麼？"
    options:
      - { text: "前 {{n:skill.pct}} 的玩家在約 {{n:skill.hands}} 手牌後，約有 {{n:skill.ahead}} 的情況領先後 {{n:skill.pct}} 的玩家", correct: true, why: "這是研究作者（2015）的定義。這是極端族群的比較：技術差距較小時，需要的手牌數要多得多。" }
      - { text: "約 {{n:skill.hands}} 手牌後，每個好玩家都會獲利", why: "研究比較的是極端的玩家族群，並沒有說明單一好玩家何時會獲利。那取決於贏率和{{t:standard-deviation|標準差}}（見關於{{t:variance|變異數}}的課程）。" }
      - { text: "約 {{n:skill.hands}} 手牌後，運氣就不再重要", why: "運氣永遠重要。研究只說明，最強玩家對最弱玩家的優勢，何時開始在多數比較中勝出。" }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "你靠兩次價格不划算、卻在河牌中牌的跟注，贏了這場{{t:session|牌局}}。{{t:session|牌局}}結束後你會怎麼做？"
    options:
      - { text: "把這些{{t:call|跟注}}記錄為需要修正的錯誤", correct: true, why: "贏了不會改變價格。如果這次{{t:call|跟注}}需要的勝率比你擁有的多，那就是錯誤，即使它帶來了回報。" }
      - { text: "什麼都不做，這場{{t:session|牌局}}贏了", why: "贏的{{t:session|牌局}}裡的錯誤一樣代價高昂，只是更難察覺。只檢討輸的牌局，會漏掉一半的錯誤。" }
      - { text: "認定你看穿對手的能力比計算顯示的更好", why: "兩次中牌太少，不足以推論你看穿對手的能力。最簡單的解釋是{{t:variance|變異數}}。" }
---
撲克給你的回饋常常會騙人。好的決策可能會輸，壞的決策可能會贏。如果你用結果來評判自己的打法，就是在從隨機訊號中學習。

## Resulting：用結果評判

玩家稱之為 *resulting*：你以為結果的好壞能告訴你決策的好壞。心理學家把同樣的現象稱為**結果偏誤**。在一項經典心理學研究（1988）中，結果有利時，人們會認為同一個決策比較好，也認為做決策的人比較有能力。即使他們自己認為不該把結果納入考量，仍然會這樣做。

## 好的決策也會輸

拿{{t:pair|一對}} A 對上{{t:pair|一對}} K 全下，是最好的決策，但仍有約 **{{n:res.kk-wins}}** 的情況會輸。另一方面，在轉牌用{{t:flush-draw|同花聽牌}}{{t:call|跟注}}整個{{t:pot|底池}}的下注是差的（你需要 {{n:eq.bet-pot}}，你約有 {{n:odds.flush.turn-river}}），但大約每五次仍會贏一次。

```formula
決策品質 = 以你在做決策當下擁有的資訊計算的 EV
```

## 如何檢討一手牌

1. 遮住結果。只評估你在做決策當下知道的資訊。
2. 計算價格，以及對上對手{{t:range|範圍}}的勝率（M2、M6）。
3. 檢查這個打法是否符合課程中的規則。
4. 也要檢討贏的手牌：帶來回報的錯誤，代價一樣高昂。

## 結果什麼時候開始有意義

在一項約 {{n:skill.sample.m}} 百萬手線上牌局的研究中（2015 年的研究），技術要到約 **{{n:skill.hands}}** 手牌之後才開始勝過運氣。這表示前 {{n:skill.pct}} 的玩家在約 {{n:skill.ahead}} 的比較中領先後 {{n:skill.pct}} 的玩家。技術差距較小時，需要的手牌數要多好幾倍。所以幾場{{t:session|牌局}}的結果，無法告訴你哪種打法風格比較好。

:::note 本 App 的評分方式
因此，App 評估的是你的決策，而不是這手牌的結果。當結果和決策不一致時，請相信計算。
:::
