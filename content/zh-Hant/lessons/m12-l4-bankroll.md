---
id: m12.l4
module: m12
order: 4
title: "資金與風險"
sub: "以買入數衡量變異數，以及何時降級別"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "一個{{t:buy-in|買入}}是 {{n:format.stack}}。{{n:br.bi.base}} 個{{t:buy-in|買入}}的資金是多少 bb？請輸入數字。"
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}。資金要用你所打{{t:stakes|級別}}的{{t:buy-in|買入}}數來計算。"
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "你的贏率是 {{n:var.wr.typical.high}}，{{t:standard-deviation|標準差}}是 {{n:var.sd}}，資金有 {{n:br.bi.base}} 個{{t:buy-in|買入}}（{{n:br.base.bb}}）。輸光全部資金的風險是多少？"
    options:
      - { text: "約 {{n:ror.base}}", correct: true, why: "指數為 2 × 贏率 × 資金 ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}，所以 RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}。這是在你從不降{{t:stakes|級別}}的情況下，終究輸光全部資金的機率。" }
      - { text: "約 {{n:ror.half}}", why: "這是資金只有一半、也就是 {{n:br.bi.move-down}} 個{{t:buy-in|買入}}時的結果。有 {{n:br.bi.base}} 個時，指數大一倍，所以風險降到約 {{n:ror.base}}。" }
      - { text: "零，因為這位玩家是贏家", why: "贏家也可能遇到比全部資金還深的{{t:downswing|下風期}}。風險會隨資金增加而降低，但永遠不會降到零。" }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "同樣是 {{n:br.bi.base}} 個{{t:buy-in|買入}}的資金、{{t:standard-deviation|標準差}} {{n:var.sd}}，但贏率只有 {{n:var.wr.typical.low}}。輸光資金的風險是多少？"
    options:
      - { text: "約 {{n:ror.base.wr-min}}", correct: true, why: "贏率在指數裡：贏率是 {{n:var.wr.typical.low}} 而不是 {{n:var.wr.typical.high}} 時，指數只有三分之一，風險從約 {{n:ror.base}} 升到約 {{n:ror.base.wr-min}}。" }
      - { text: "約 {{n:ror.base}}，因為資金一樣", why: "風險取決於贏率 × 資金的乘積。較低的贏率效果就像較少的資金：結果約為 {{n:ror.base.wr-min}}。" }
      - { text: "約 {{n:ror.base.wr-ex}}", why: "這是贏率 {{n:var.wr.ex}} 時的結果。贏率 {{n:var.wr.typical.low}} 時，風險高出數十倍：約 {{n:ror.base.wr-min}}。" }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "你有 {{n:br.bi.base}} 個{{t:buy-in|買入}}，{{t:standard-deviation|標準差}} {{n:var.sd}}，但還不知道自己的贏率。關於輸光全部資金的風險，你知道什麼？"
    options:
      - { text: "取決於贏率：{{n:var.wr.typical.high}} 時約 {{n:ror.base}}，{{n:var.wr.typical.low}} 時約 {{n:ror.base.wr-min}}", correct: true, why: "贏率和資金一起出現在指數裡。不知道贏率，也就不知道風險；而贏率低時，同樣的資金風險會高出好幾倍。" }
      - { text: "約 {{n:ror.base}}，因為只取決於資金", why: "只有贏率 {{n:var.wr.typical.high}} 時才是這個結果。贏率 {{n:var.wr.typical.low}} 時，同樣的資金約為 {{n:ror.base.wr-min}}。" }
      - { text: "零，因為 {{n:br.bi.base}} 個{{t:buy-in|買入}}很多", why: "贏率為正時，風險會隨資金增加而降低，但永遠不會降到零。贏率 {{n:var.wr.typical.low}} 時仍約為 {{n:ror.base.wr-min}}。" }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "你帶著 {{n:br.bi.base}} 個{{t:buy-in|買入}}開始打這個{{t:stakes|級別}}。經過一段{{t:downswing|下風期}}後，你剩下 {{n:br.ex.below}}。你怎麼做？"
    options:
      - { text: "降一個{{t:stakes|級別}}", correct: true, why: "你已跌破原定資金的一半（{{n:br.bi.move-down}}）。只剩這麼多{{t:buy-in|買入}}時，輸光剩餘資金的風險比有 {{n:br.bi.base}} 個時高好幾倍（以贏率 {{n:var.wr.typical.high}}、SD {{n:var.sd}} 計算）。在低一半的{{t:stakes|級別}}，同樣的資金又幾乎是該級別完整的{{t:buy-in|買入}}數。" }
      - { text: "繼續打，因為這只是{{t:variance|變異數}}", why: "這很可能確實是{{t:variance|變異數}}，但降{{t:stakes|級別}}正是為了防範它。只剩 {{n:br.ex.below}} 個{{t:buy-in|買入}}時，下一段{{t:downswing|下風期}}就可能讓你輸光。" }
      - { text: "升到更高的{{t:stakes|級別}}，想更快贏回來", why: "這是出於絕望的上頭。以{{t:buy-in|買入}}計資金變少時還打更高的{{t:stakes|級別}}，會急遽提高{{t:risk-of-ruin|破產風險}}。" }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "你帶著 {{n:br.bi.base}} 個{{t:buy-in|買入}}開始打這個{{t:stakes|級別}}，輸掉了 {{n:dd.bi.small}}。現在你有 {{n:br.ex.after-dd}}。你怎麼做？"
    options:
      - { text: "留在這個{{t:stakes|級別}}，並檢討輸掉的那幾手牌中的決策", correct: true, why: "{{n:br.ex.after-dd}} 個{{t:buy-in|買入}}仍多於最晚的降級門檻 {{n:br.bi.move-down}}。模擬中，贏率 {{n:var.wr.ex}} 的玩家在 {{n:var.hands.k}} 千手牌內約有 {{n:dd.p.small.100k}} 會遇到這種{{t:downswing|下風期}}；檢討牌局則能確認問題是否出在失誤。" }
      - { text: "立刻降{{t:stakes|級別}}", correct: true, why: "這也是好的決定：有些資料建議輸掉 {{n:dd.bi.small}} 個{{t:buy-in|買入}}就降級。比資金剩一半時更早降級不算錯，更晚才是錯。" }
      - { text: "從外部補進{{t:buy-in|買入}}，讓資金回到 {{n:br.bi.base}}", why: "每次{{t:downswing|下風期}}後就補錢，會讓資金失去作為風險上限的意義。你要事先設好門檻並確實遵守。" }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "你有目前{{t:stakes|級別}}的 {{n:br.bi.base}} 個{{t:buy-in|買入}}，正好是你原定的資金。更高{{t:stakes|級別}}的{{t:buy-in|買入}}是兩倍。你要升級嗎？"
    options:
      - { text: "不，在更高的{{t:stakes|級別}}，這只有原定資金的一半", correct: true, why: "資金要用你想升上去的{{t:stakes|級別}}的{{t:buy-in|買入}}數來計算。你的 {{n:br.bi.base}} 個{{t:buy-in|買入}}在那裡只有 {{n:br.bi.move-down}}，正好是降級門檻。" }
      - { text: "要，因為最近打得很順", why: "一個月打得好主要是{{t:variance|變異數}}（見{{t:variance|變異數}}那一課）。能不能升級，取決於你在新{{t:stakes|級別}}的資金。" }
      - { text: "要，因為你已經有 {{n:br.bi.base}} 個{{t:buy-in|買入}}", why: "目前{{t:stakes|級別}}的 {{n:br.bi.base}} 個{{t:buy-in|買入}}，在兩倍高的{{t:stakes|級別}}只有 {{n:br.bi.move-down}}。" }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "某位玩家在自己的{{t:stakes|級別}}平均是輸的，但資金非常多。這對他有什麼用？"
    options:
      - { text: "只是把輸光的時間往後延", correct: true, why: "贏率為負時，戰績平均會往下走，所以不論資金多少，遲早都會輸光。資金防的是{{t:variance|變異數}}，不是打得差。" }
      - { text: "能保護他不破產", why: "風險公式只在贏率為正時成立。輸家必定會輸光資金，只是資金越多輸得越慢。" }
      - { text: "讓他能打更高的{{t:stakes|級別}}", why: "贏率為負時打更高的{{t:stakes|級別}}，只會輸得更快。" }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "你才剛開始。學習和打牌的時間要怎麼分配？"
    options:
      - { text: "約 {{n:study.beginner}} 用來學習", correct: true, why: "剛開始時要補的東西最多，所以學習應佔大部分。" }
      - { text: "約 {{n:study.min}} 用來學習", why: "這是已經是贏家的玩家的下限。剛開始時，學習應該佔大部分。" }
      - { text: "只打牌，學習會隨經驗而來", why: "牌局結果是很弱的回饋（見決策與結果那一課）。有解說的學習和手牌分析能讓你學得更快。" }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "你已經在自己的{{t:stakes|級別}}贏錢了。時間要怎麼分配？"
    options:
      - { text: "大約各半，但學習絕不少於 {{n:study.min}}", correct: true, why: "即使你在贏，理想是約 {{n:study.winner}} 用來學習，最低是 {{n:study.min}}。" }
      - { text: "只打牌，既然你在贏", why: "即使在贏，花在學習的時間也不低於 {{n:study.min}}。" }
      - { text: "約 {{n:study.beginner}} 用來學習，跟剛開始時一樣", why: "如果你在準備升到更高的{{t:stakes|級別}}，可以這樣做。如果只是在自己的級別贏錢，約 {{n:study.winner}} 就夠了。" }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "哪個跡象顯示你打牌可能開始失控？"
    options:
      - { text: "輸了之後又回去打，想把輸的贏回來", correct: true, why: "追輸是診斷準則中列出的賭博問題跡象之一。如果你在自己身上看到這類跡象，請使用負責任遊戲卡片上的聯絡資訊。" }
      - { text: "{{t:session|場次}}結束後分析輸掉的手牌", why: "這是健康的學習習慣。問題的跡象包括追輸、打得比計畫久，以及借錢打牌。" }
      - { text: "按照計畫結束{{t:session|場次}}", why: "這是對打牌的良好控制。問題的跡象會是打得比計畫久，或覺得非得把輸的贏回來。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
資金是你專門用來打撲克的全部準備金。這一課用**{{t:buy-in|買入}}數**來計算資金，而不是用金額：一個{{t:buy-in|買入}}就是你所打{{t:stakes|級別}}的一整個 {{n:format.stack}} 籌碼量。

## {{t:risk-of-ruin|破產風險}}

這是你一直在同一個{{t:stakes|級別}}打下去時，終究輸光全部資金的機率：

```formula
RoR = e^(−2 × 贏率 × 資金 ÷ SD²)
```

這個公式是在贏率和 SD 固定時的近似值。贏率和 SD 以 bb/100 輸入，資金以 bb 輸入。在{{t:standard-deviation|標準差}}為 {{n:var.sd}} 時：

| 贏率 | {{n:br.bi.move-down}} 個{{t:buy-in|買入}} | {{n:br.bi.base}} 個{{t:buy-in|買入}} | {{n:br.bi.beginner}} 個{{t:buy-in|買入}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## 風險取決於什麼

贏率和資金在公式中並列：贏率低一半，要達到同樣的風險，資金就得多一倍。所以同樣的{{t:buy-in|買入}}數，對某位玩家的風險可能比另一位低好幾倍。剛開始時你不知道自己的贏率，而要估出贏率需要非常多手牌（見{{t:variance|變異數}}那一課）。贏率為負時，再多資金也沒用，因為資金防的是{{t:variance|變異數}}，不是打得差。

## 何時降{{t:stakes|級別}}

事先設好門檻：最晚在資金跌到原定{{t:buy-in|買入}}數的**一半**時，就降一個{{t:stakes|級別}}，例如從 {{n:br.bi.base}} 跌到 {{n:br.bi.move-down}}。各家資料給的門檻從一半到完整資金都有；一半是其中最晚的。在低一半的{{t:stakes|級別}}，同樣的資金又幾乎是該級別完整的{{t:buy-in|買入}}數。最早要等你擁有以較高{{t:stakes|級別}}{{t:buy-in|買入}}計算的完整資金，才升回去。有些資料建議更早降級，輸掉 {{n:dd.bi.small}} 個{{t:buy-in|買入}}就降：在一半門檻之前降級不算錯。

## 學習與打牌

剛開始時，大約 {{n:study.beginner}} 的時間用來學習，其餘用來打牌。等你在自己的{{t:stakes|級別}}贏錢後，理想是約 {{n:study.winner}}，但學習絕不少於 {{n:study.min}}。

:::note 負責任遊戲
打牌開始失控的一些跡象：打得比計畫久；輸了之後又回去打，想把輸的贏回來；用輸不起的錢打牌，或借錢打牌；打牌是為了逃避煩惱；對親近的人隱瞞自己在打牌。

去哪裡尋求協助：

{{helplines}}
:::
