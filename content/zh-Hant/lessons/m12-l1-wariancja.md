---
id: m12.l1
module: m12
order: 1
title: "用數字看變異數"
sub: "數千手牌的結果能告訴你多少"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "你平均贏 {{n:var.wr.ex}}，接下來要打 {{n:var.hands.k}} 千手牌。你的預期結果是多少個{{t:buy-in|買入}}（每個 {{n:format.stack}}）？請輸入數字。"
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} 千手牌等於 {{n:var.blocks}} 個 100 手的區塊。預期結果 = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}，也就是 {{n:var.exp.bi}} 個{{t:buy-in|買入}}。這是平均值：實際結果可能與它相差很遠。"
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "你打法的{{t:standard-deviation|標準差}}是 {{n:var.sd}}。打完 {{n:var.hands.k}} 千手牌（{{n:var.blocks}} 個 100 手的區塊）後，結果的{{t:standard-deviation|標準差}}是多少？"
    options:
      - { text: "約 {{n:var.sd.result.bi}} 個{{t:buy-in|買入}}", correct: true, why: "{{t:standard-deviation|標準差}}隨區塊數的平方根增加：{{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}，也就是約 {{n:var.sd.result.bi}} 個{{t:buy-in|買入}}。" }
      - { text: "約 {{n:var.sd.wrong.bi}} 個{{t:buy-in|買入}}", why: "把{{t:standard-deviation|標準差}}乘以區塊數，就會得到這個數字。隨機波動會部分互相抵銷，所以要乘以平方根：{{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}。" }
      - { text: "約 {{n:var.exp.bi}} 個{{t:buy-in|買入}}", why: "這是贏率 {{n:var.wr.ex}} 時的預期結果，不是它的{{t:standard-deviation|標準差}}。{{t:standard-deviation|標準差}}約為 {{n:var.sd.result.bi}} 個{{t:buy-in|買入}}。" }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "你的贏率是 {{n:var.wr.ex}}，{{t:standard-deviation|標準差}}為 {{n:var.sd}}。打完 {{n:var.hands.k}} 千手牌後，你的結果有約 {{n:var.conf95}} 的把握會落在哪個區間？"
    options:
      - { text: "約 {{n:var.ci.low.bi}} 到約 {{n:var.ci.high.bi}} 個{{t:buy-in|買入}}", correct: true, why: "預期結果 {{n:var.exp.bi}} 個{{t:buy-in|買入}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}。即使是明顯贏錢的玩家，打完 {{n:var.hands.k}} 千手牌後也可能幾乎打平。" }
      - { text: "約 {{n:var.ci68.low.bi}} 到約 {{n:var.ci68.high.bi}} 個{{t:buy-in|買入}}", why: "這是一個{{t:standard-deviation|標準差}}的區間：只涵蓋約 3 個結果中的 2 個。要達到 {{n:var.conf95}}，就要取 {{n:var.z95}} 個{{t:standard-deviation|標準差}}：約 {{n:var.ci.low.bi}} 到約 {{n:var.ci.high.bi}}。" }
      - { text: "剛好 {{n:var.exp.bi}} 個{{t:buy-in|買入}}", why: "這只是平均值。結果會在它上下各波動數十個{{t:buy-in|買入}}。" }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "打完 {{n:var.hands.k}} 千手牌（{{n:var.blocks}} 個 100 手的區塊），{{t:standard-deviation|標準差}}為 {{n:var.sd}}：你的贏率標準誤是多少 bb/100？取 √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}。請輸入數字。"
    answer: var.se.wr
    explanation: "標準誤 = SD ÷ √（區塊數） = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}。{{n:var.conf95}} 區間為 ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}。"
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "打完 {{n:var.hands.k}} 千手牌後，你的結果是 {{n:var.wr.ex}}，{{t:standard-deviation|標準差}}為 {{n:var.sd}}。你對自己真正的贏率知道些什麼？"
    options:
      - { text: "有約 {{n:var.conf95}} 的把握，它介於約 {{n:var.wr.ci.low}} 與約 {{n:var.wr.ci.high}} 之間", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}。打完 {{n:var.hands.k}} 千手牌後，你只知道自己大概沒有在輸。" }
      - { text: "就是 {{n:var.wr.ex}}，因為樣本很大", why: "{{n:var.hands.k}} 千手牌聽起來很多，但在{{t:standard-deviation|標準差}} {{n:var.sd}} 下，誤差仍約為 ± {{n:var.ci.wr}}。" }
      - { text: "什麼都不知道，撲克的結果純粹是運氣", why: "太誇張了。樣本確實會縮小區間，只是很慢：誤差隨手數的平方根縮小。" }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "你想以 {{n:var.conf95}} 的把握，把贏率掌握到 ± {{n:var.target}} 的精確度。{{t:standard-deviation|標準差}}為 {{n:var.sd}}。你需要打多少手牌？"
    options:
      - { text: "約 {{n:var.need.hands.k}} 千手", correct: true, why: "區塊數 = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}。也就是約 {{n:var.need.hands.k}} 千手牌。" }
      - { text: "約 {{n:var.hands.k}} 千手", why: "打完 {{n:var.hands.k}} 千手牌後，誤差約為 ± {{n:var.ci.wr}}。要把它縮小到 ± {{n:var.target}}，你需要約 {{n:var.need.hands.k}} 千手牌。" }
      - { text: "約 {{n:var.need.blocks}} 手", why: "這是 100 手區塊的數量。手數是它的一百倍：約 {{n:var.need.hands.k}} 千手。" }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "某位玩家贏率 {{n:var.wr.ex}}，{{t:standard-deviation|標準差}}為 {{n:var.sd}}。在 {{n:var.hands.k}} 千手牌中，他多常會遇到從最高點下跌至少 {{n:dd.bi.small}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}？"
    options:
      - { text: "幾乎每次，約 {{n:dd.p.small.100k}}", correct: true, why: "以這些參數模擬 {{n:var.hands.k}} 千手牌，約 {{n:dd.p.small.100k}} 的模擬會出現這樣的{{t:downswing|下風期}}。{{n:dd.bi.small}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}是贏錢玩家打牌時的正常現象。" }
      - { text: "約 {{n:dd.p.small.20k}} 的情況", why: "這是較短樣本（{{n:dd.hands.short.k}} 千手牌）的數字。在 {{n:var.hands.k}} 千手牌中，出現深度{{t:downswing|下風期}}的機會多得多：約 {{n:dd.p.small.100k}}。" }
      - { text: "很少，約 {{n:var.p.lose}}", why: "這是贏率 {{n:var.wr.ex}} 的玩家打完 {{n:var.hands.k}} 千手牌後最終虧損的機率，就是這麼低。途中出現{{t:downswing|下風期}}是另一回事：幾乎一定會發生。" }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "兩位玩家，{{t:standard-deviation|標準差}} {{n:var.sd}}，{{n:var.hands.k}} 千手牌。一位贏率 {{n:var.wr.ex}}，另一位 {{n:dd.wr-low}}。他們各自多常會遇到 {{n:dd.bi.big}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}？"
    options:
      - { text: "第一位約 {{n:dd.p.big.100k}}，第二位約 {{n:dd.p.big.100k.wr-low}} 的情況", correct: true, why: "贏率較低，把結果往上拉的力量較弱，所以{{t:downswing|下風期}}更深、也更頻繁。在 {{n:dd.wr-low}}（微注級別贏錢玩家的典型贏率）下，{{n:dd.bi.big}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}在超過一半的樣本中出現。" }
      - { text: "兩人一樣常，因為{{t:standard-deviation|標準差}}相同", why: "{{t:standard-deviation|標準差}}決定波動幅度，但贏率決定結果多快擺脫波動。贏率 {{n:dd.wr-low}} 時，{{n:dd.bi.big}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}約在 {{n:dd.p.big.100k.wr-low}} 的樣本中出現，贏率 {{n:var.wr.ex}} 時約為 {{n:dd.p.big.100k}}。" }
      - { text: "都不會：{{n:dd.bi.big}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}只會發生在輸家身上", why: "錯。即使是贏率 {{n:var.wr.ex}} 的玩家，在 {{n:var.hands.k}} 千手牌的樣本中也約有 {{n:dd.p.big.100k}} 會遇到。" }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "你已經連續一個月處於虧損 {{n:dd.bi.small}} 個{{t:buy-in|買入}}的狀態。這代表什麼？"
    options:
      - { text: "單看{{t:downswing|下風期}}什麼也證明不了；檢視你在輸掉的手牌中所做的決策", correct: true, why: "在 {{n:var.hands.k}} 千手牌中，贏率介於 {{n:dd.wr-low}} 到 {{n:var.wr.ex}} 的贏錢玩家，幾乎每位都會遇到 {{n:dd.bi.small}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}（以 SD {{n:var.sd}} 模擬）。你打得好不好，要看決策檢討，而不是只看結果。" }
      - { text: "你打得很差，必須改變整個打法", why: "這種規模的{{t:downswing|下風期}}，在贏率 {{n:var.wr.ex}}（SD {{n:var.sd}}）的玩家身上，約有 {{n:dd.p.small.100k}} 的 {{n:var.hands.k}} 千手牌樣本會出現。只因結果就改變打法，等於是在對雜訊做反應。" }
      - { text: "你一定只是運氣不好，什麼都不用檢視", why: "{{t:downswing|下風期}}也可能來自失誤。結果無法區分運氣差和失誤，但手牌回顧可以。" }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "6 人桌無限注德州撲克現金局，典型的{{t:standard-deviation|標準差}}是多少？"
    options:
      - { text: "約 {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "{{t:variance|變異數}}計算器給出的就是這個範圍。最常被當作典型值的是約 {{n:var.sd}}。打法越激進，{{t:standard-deviation|標準差}}越高。" }
      - { text: "約 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "這是微注級別贏錢玩家的典型贏率。{{t:standard-deviation|標準差}}比贏率大數十倍，所以結果才會波動這麼大。" }
      - { text: "每 100 手約 {{n:var.sd.result.bi}} 個{{t:buy-in|買入}}", why: "這是打完 {{n:var.hands.k}} 千手牌後結果的{{t:standard-deviation|標準差}}，不是每 100 手的。" }
---
你在撲克中的結果是兩件事的總和：你打得多好，以及運氣。這兩個部分都能測量。贏率告訴你平均贏多少，而{{t:standard-deviation|標準差}}告訴你結果在這個平均值周圍波動得多厲害。

## 兩個以 bb/100 表示的數字

**贏率**是每 100 手牌的平均獲利，以{{t:big-blind|大盲注}}計算。微注級別的贏錢玩家通常是 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}。

**{{t:standard-deviation|標準差}}（SD）**是每 100 手牌結果的典型離散程度。在 6 人桌現金局中通常是 {{n:var.sd.low}}–{{n:var.sd.high}}，一般以 {{n:var.sd}} 作為典型值。{{t:standard-deviation|標準差}}比贏率大數十倍，所以一個{{t:session|場次}}、甚至一個月的結果，能說明的事情都很少。

## 打很多手牌之後的結果

把手數除以 100，就得到區塊數。

```formula
預期結果 = 贏率 × 區塊數
結果的標準差 = SD × √（區塊數）
{{n:var.conf95}} 區間 = 預期結果 ± {{n:var.z95}} × 結果的標準差
```

範例：{{n:var.wr.ex}}，SD {{n:var.sd}}，{{n:var.hands.k}} 千手牌，也就是 {{n:var.blocks}} 個區塊。你的預期結果是 {{n:var.exp.bb}}，也就是 {{n:var.exp.bi}} 個{{t:buy-in|買入}}。結果的{{t:standard-deviation|標準差}}是 {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}，也就是約 {{n:var.sd.result.bi}} 個{{t:buy-in|買入}}。你有 {{n:var.conf95}} 的把握，最後會落在約 **{{n:var.ci.low.bi}} 到 {{n:var.ci.high.bi}} 個{{t:buy-in|買入}}**之間。預期結果約在零之上 {{n:var.z.lose}} 個{{t:standard-deviation|標準差}}，所以打完 {{n:var.hands.k}} 千手牌後處於虧損的機率約為 {{n:var.p.lose}}。

## 要打多少手牌才能知道你的贏率

同樣的算法也能反過來用。估計贏率的誤差，會隨手數的平方根縮小：

```formula
贏率誤差 = SD ÷ √（區塊數）
所需區塊數 = （{{n:var.z95}} × SD ÷ 精確度）²
```

打完 {{n:var.hands.k}} 千手牌後，誤差約為 {{n:var.se.wr}}，所以 {{n:var.conf95}} 區間是 ± {{n:var.ci.wr}}。這時 {{n:var.wr.ex}} 的結果只代表你真正的贏率大約介於 {{n:var.wr.ci.low}} 到 {{n:var.wr.ci.high}} 之間。要把贏率掌握到 ± {{n:var.target}} 的精確度，你需要約 **{{n:var.need.hands.k}} 千手牌**。

## {{t:downswing|下風期}}很正常

{{t:downswing|下風期}}是指結果從最高點往下掉。以下是贏率 {{n:var.wr.ex}}、SD {{n:var.sd}} 玩家的模擬結果：

| 從高點算起的{{t:downswing|下風期}} | {{n:dd.hands.short.k}} 千手牌內 | {{n:var.hands.k}} 千手牌內 | {{n:var.hands.k}} 千手牌內（贏率 {{n:dd.wr-low}}） |
|---|---|---|---|
| {{n:dd.bi.small}} 個{{t:buy-in|買入}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} 個{{t:buy-in|買入}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note 這些數字從何而來
模擬結果：數千次模擬，每次 {{n:var.hands.k}} 千手牌，每個區塊的結果隨機產生。實際的{{t:downswing|下風期}}可能會稍微更深，因為結果每一手都在變化，而不是每 100 手才變一次。結論：{{n:dd.bi.small}} 個{{t:buy-in|買入}}的{{t:downswing|下風期}}並不能證明你打得不好。
:::

以上是一般性的建議，不保證任何結果。如果打牌開始失控，請查看「協助」畫面。
