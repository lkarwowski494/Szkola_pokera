---
id: m9.l1
module: m9
order: 1
title: "SPR：籌碼與底池的比例"
sub: "底池後面還剩多少錢"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "你在按鈕位{{t:open|開池}}到 {{n:pf.open-size}}，{{t:big-blind}}{{t:call|跟注}}，雙方籌碼各 {{n:format.stack}}。翻牌時{{t:pot|底池}}有 {{n:bb.pot-after.vs-btn}}，你還剩 {{n:spr.srp.stack}}。{{t:spr}} 是多少？"
    table: { position: BTN }
    options:
      - { text: "約 {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}。{{t:pot|底池}}後面的籌碼是{{t:pot}}的十幾倍：這是{{t:open|開池}}後被{{t:call|跟注}}時典型的 {{t:spr}}。" }
      - { text: "約 {{n:spr.srp.wrong-full}}", why: "這是用整個 {{n:format.stack}} 籌碼算出來的。你的 {{n:pf.open-size}} 已經在{{t:pot|底池}}裡，所以只算剩下的部分：{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}。" }
      - { text: "約 {{n:spr.3bet-ip}}", why: "這是 3-bet 後被{{t:call|跟注}}時的 {{t:spr}}。在單次加注的{{t:pot|底池}}中，{{t:pot}}小得多，所以 {{t:spr}} 約 {{n:spr.srp}}。" }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:cutoff|CO}} {{t:open|開池}}到 {{n:pf.open-size}}，你在按鈕位{{t:raise|加注}}（3-bet）到 {{n:pf.3bet.ip-total}}，{{t:cutoff|CO}} {{t:call|跟注}}，兩個盲注位{{t:fold|棄牌}}。翻牌時{{t:pot|底池}}有 {{n:vs3bet.pot-after}}，你還剩 {{n:spr.3bet-ip.stack}}。{{t:spr}} 是多少？"
    table: { position: BTN }
    options:
      - { text: "約 {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}。3-bet 後的{{t:pot}}是一般{{t:open|開池}}後的三倍，所以 {{t:spr}} 從約 {{n:spr.srp}} 降到約 {{n:spr.3bet-ip}}。" }
      - { text: "約 {{n:spr.3bet-ip.wrong-full}}", why: "這是用整個 {{n:format.stack}} 籌碼算出來的。你 {{n:pf.3bet.ip-total}} 的 3-bet 已經在{{t:pot|底池}}裡，所以只拿剩下的來除：{{n:spr.3bet-ip.stack}}。" }
      - { text: "約 {{n:spr.srp}}", why: "這是單次加注{{t:pot|底池}}的 {{t:spr}}。3-bet 後{{t:pot}}大得多，後面的籌碼也更少，所以 {{t:spr}} 降到約 {{n:spr.3bet-ip}}。" }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "按鈕位{{t:open|開池}}，你在{{t:big-blind|大盲}}{{t:raise|加注}}（3-bet）到 {{n:pf.3bet.oop-total}}，按鈕位{{t:call|跟注}}。翻牌時{{t:pot|底池}}有 {{n:spr.3bet-oop.pot}}，你還剩 {{n:spr.3bet-oop.stack}}。{{t:spr}} 是多少？"
    table: { position: BB }
    options:
      - { text: "約 {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}。{{t:out-of-position|沒有位置}}時 3-bet 尺寸較大，所以{{t:pot}}長得更多，{{t:spr}} 也比{{t:in-position}}時 3-bet 後（{{n:spr.3bet-ip}}）更低。" }
      - { text: "約 {{n:spr.3bet-ip}}", why: "這是{{t:in-position}}時 3-bet 到 {{n:pf.3bet.ip-total}} 後的 {{t:spr}}。你 3-bet 到 {{n:pf.3bet.oop-total}} 會做出更大的{{t:pot|底池}}，所以 {{t:spr}} 更低：約 {{n:spr.3bet-oop}}。" }
      - { text: "約 {{n:spr.4bet}}", why: "要 4-bet 才會出現這麼低的 {{t:spr}}。3-bet 到 {{n:pf.3bet.oop-total}} 後算出來約 {{n:spr.3bet-oop}}。" }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "雙方籌碼各 {{n:format.stack}}。哪一種{{t:pot|底池}}的翻牌 {{t:spr}} 最低？"
    options:
      - { text: "4-bet 後被{{t:call|跟注}}的{{t:pot|底池}}", correct: true, why: "沒錯：按鈕位面對{{t:small-blind|小盲}}的 3-bet 時 4-bet 到 {{n:pf.4bet.example.low}}，{{t:small-blind}}{{t:call|跟注}}，{{t:big-blind}}已經{{t:fold|棄牌}}，此時{{t:pot|底池}}有 {{n:spr.4bet.pot}}，後面只剩 {{n:spr.4bet.stack}}。{{t:spr}} 約 {{n:spr.4bet}}。" }
      - { text: "3-bet 後被{{t:call|跟注}}的{{t:pot|底池}}", why: "3-bet 後，{{t:in-position}}時 {{t:spr}} 約 {{n:spr.3bet-ip}}，{{t:out-of-position}}時約 {{n:spr.3bet-oop}}。4-bet 會讓它再降得更低：約 {{n:spr.4bet}}。" }
      - { text: "單次加注的{{t:pot|底池}}", why: "正好相反：這裡的 {{t:spr}} 最高，約 {{n:spr.srp}}，因為翻牌時的{{t:pot}}很小。" }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "為什麼 3-bet 後的翻牌 {{t:spr}} 比一般{{t:open|開池}}後低很多？"
    options:
      - { text: "{{t:pot|底池}}變大好幾倍，但後面的籌碼只少了一點", correct: true, why: "沒錯：{{t:pot}}從 {{n:bb.pot-after.vs-btn}} 增加到 {{n:vs3bet.pot-after}}，後面的籌碼卻只從 {{n:spr.srp.stack}} 減少到 {{n:spr.3bet-ip.stack}}。比值從約 {{n:spr.srp}} 降到約 {{n:spr.3bet-ip}}。" }
      - { text: "因為 3-bet 後玩家的籌碼變少了", why: "只少了一點：{{n:spr.3bet-ip.stack}}，而不是 {{n:spr.srp.stack}}。讓 {{t:spr}} 下降的關鍵是{{t:pot}}變成三倍大。" }
      - { text: "因為 3-bet 會讓你取得{{t:position|位置}}", why: "{{t:position|位置}}取決於你在牌桌上的座位，和 3-bet 無關。{{t:spr}} 只是{{t:pot|底池}}後面的籌碼除以{{t:pot|底池}}。" }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "你在按鈕位{{t:open|開池}}到 {{n:pf.open-size}}，你有 {{n:format.stack}}。{{t:big-blind|大盲}}只有 {{n:spr.short.stack}}，他{{t:call|跟注}}。翻牌{{t:pot|底池}}：{{n:bb.pot-after.vs-btn}}。{{t:spr}} 是多少？"
    table: { position: BTN }
    options:
      - { text: "約 {{n:spr.short}}", correct: true, why: "要用{{t:effective-stack|有效籌碼}}來算，也就是兩人中較小的那一份：對手還剩 {{n:spr.short.behind}}，所以 {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}。除了已經在{{t:pot|底池}}裡的錢，你們每人最多只能再投入 {{n:spr.short.behind}}。" }
      - { text: "約 {{n:spr.srp}}", why: "如果對手也有 {{n:format.stack}}，才會是這樣。你們只能爭奪較小的那份籌碼，所以 {{t:spr}} 約 {{n:spr.short}}。" }
      - { text: "籌碼不一樣，所以算不出來", why: "算得出來：取較小的那份籌碼（有效籌碼）。對手還剩 {{n:spr.short.behind}}，所以 {{t:spr}} ≈ {{n:spr.short}}。" }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "用來決定翻牌後怎麼打這手牌的 {{t:spr}}，要在什麼時候算？"
    options:
      - { text: "在翻牌、還沒有人{{t:bet|下注}}之前", correct: true, why: "沒錯：每一{{t:street|條街}}都能算 {{t:spr}}（在 M7 你是在轉牌算的），但規劃這手牌時，要用翻牌開始時{{t:pot|底池}}後面的籌碼除以{{t:pot|底池}}。這樣你就知道接下來三{{t:street|條街}}還剩幾個{{t:pot|底池}}可以打。" }
      - { text: "在發牌前、還沒有人{{t:raise|加注}}之前", why: "翻牌前你還不知道{{t:pot}}會有多大。{{t:spr}} 正是取決於翻牌前發生了什麼：{{t:open|開池}}後約 {{n:spr.srp}}，3-bet 後約 {{n:spr.3bet-ip}}。" }
      - { text: "在河牌、最後一次{{t:bet|下注}}之前", why: "到了河牌只剩一個決定。那時也能算 {{t:spr}}，但規劃這手牌最有用的是翻牌的 {{t:spr}}，因為它涵蓋全部三{{t:street|條街}}。" }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "你在按鈕位{{t:raise|加注}}（3-bet），{{t:cutoff|CO}} {{t:call|跟注}}。翻牌 {{t:spr}} 約 {{n:spr.3bet-ip}}。你中了{{t:top-pair|頂對}}，踢腳也不錯。你怎麼看待這手牌？"
    table: { position: BTN }
    options:
      - { text: "當成邊緣牌：打{{t:value|價值}}，但對手全下時不一定{{t:call|跟注}}", correct: true, why: "約 {{n:spr.3bet-ip}} 的 {{t:spr}} 落在 {{n:spr.zone.low}} 到 {{n:spr.zone.mid}} 的區間，在這個區間{{t:top-pair}}是邊緣牌。要不要打光整個籌碼，取決於對手怎麼打，以及{{t:board}}的樣子。" }
      - { text: "一律打光整個籌碼", why: "通常要 {{t:spr}} 低於約 {{n:spr.zone.low}} 才會這樣，例如 4-bet 後（約 {{n:spr.4bet}}）。{{t:spr}} 約 {{n:spr.3bet-ip}} 時，需要更多次{{t:bet|下注}}才會全下，而會一路付錢到底的大多是更強的牌。" }
      - { text: "像 {{t:spr}} 很高時一樣小心打", why: "{{t:spr}} 高於約 {{n:spr.zone.deep}} 時，你才會這麼小心地打{{t:top-pair|頂對}}，例如在單次加注的{{t:pot|底池}}（約 {{n:spr.srp}}）。3-bet 後的 {{t:spr}} 低得多。" }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "翻牌。{{t:pot|底池}}有 {{n:ex.pot}}，對手全下 {{n:commit.stack}}（{{t:spr}} {{n:spr.commit}}）。你需要多少權益才能{{t:call|跟注}}？請輸入百分比數字。"
    answer: eq.jam.spr2
    explanation: "你要補 {{n:commit.stack}}，{{t:call|跟注}}後{{t:pot}}是 {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}。所需權益 = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}。"
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "翻牌時對手把整個籌碼全下（這手牌開始時是 {{n:format.stack}}）。在哪一種{{t:pot|底池}}裡，你{{t:call|跟注}}所需的權益最少？"
    options:
      - { text: "4-bet 後：約 {{n:eq.jam.4bet}}", correct: true, why: "{{t:spr}} 約 {{n:spr.4bet}} 時，你補 {{n:spr.4bet.stack}}，就能贏下 {{n:spr.4bet.pot}} 的{{t:pot|底池}}加上對手的籌碼。{{t:spr}} 越低，價格越好。" }
      - { text: "3-bet 後：約 {{n:eq.jam.3bet-ip}}", why: "{{t:in-position}}時 3-bet 後，你需要約 {{n:eq.jam.3bet-ip}}。4-bet 後{{t:pot}}相對籌碼更大，所以約 {{n:eq.jam.4bet}} 就夠了。" }
      - { text: "{{t:open|開池}}並被{{t:call|跟注}}後：約 {{n:eq.jam.srp}}", why: "這是三者中最差的價格：{{t:spr}} 約 {{n:spr.srp}} 時，你要補 {{n:spr.srp.stack}}，才能贏下 {{n:bb.pot-after.vs-btn}} 的小{{t:pot|底池}}加上對手的籌碼。" }
---
翻牌前，你決定有多少錢進入{{t:pot|底池}}。翻牌後，重要的是底池後面還剩多少。有一個數字把這兩件事連起來：{{t:spr}}。

## 什麼是 {{t:spr}}

{{t:spr}}（英文 stack-to-pot ratio）是某一{{t:street|條街}}開始時，籌碼與{{t:pot|底池}}的比例。每一{{t:street|條街}}都能算（在 M7 你是在轉牌算的），但規劃這手牌時，要用翻牌的 {{t:spr}}，也就是在任何人{{t:bet|下注}}、還沒有{{t:bet}}之前。

```formula
SPR = 有效籌碼 ÷ 翻牌底池
```

{{t:effective-stack|有效籌碼}}是兩份籌碼中較小的那一份，不含已經在{{t:pot|底池}}裡的錢。這是每位玩家最多還能放進{{t:pot|底池}}的金額：除了{{t:pot|底池}}之外，你從對手那裡最多只能贏到{{t:effective-stack}}，你最多也只會再輸掉這麼多。

範例：你在按鈕位{{t:open|開池}}到 {{n:pf.open-size}}，{{t:big-blind}}{{t:call|跟注}}。翻牌{{t:pot|底池}}是 {{n:bb.pot-after.vs-btn}}，你還剩 {{n:spr.srp.stack}}。{{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**。

## 翻牌前決定了 {{t:spr}}

翻牌前每一次{{t:raise}}都會讓{{t:pot|底池}}變大好幾倍，後面的籌碼卻減少得慢很多。所以 {{t:spr}} 很大程度取決於翻牌前發生了什麼。

| {{t:pot|底池}}（籌碼各 {{n:format.stack}}） | 翻牌{{t:pot|底池}} | {{t:pot|底池}}後面的籌碼 | {{t:spr}} |
|---|---|---|---|
| {{t:open|開池}}並{{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| {{t:in-position}} 3-bet 並{{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| {{t:big-blind|大盲}} 3-bet 並{{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 按鈕位對{{t:small-blind|小盲}}的 3-bet 做 4-bet 並{{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## {{t:spr}} 區間

{{t:spr}} 區間是用翻牌的 {{t:spr}} 來判斷。{{t:spr}} 越高，你需要越強的牌才能打光整個籌碼：

| {{t:spr}} | 通常拿什麼牌打光整個籌碼 |
|---|---|
| 低於 {{n:spr.zone.low}} | {{t:top-pair}}及更強的牌 |
| {{n:spr.zone.low}} 到 {{n:spr.zone.mid}} | {{t:top-pair}}是邊緣牌 |
| {{n:spr.zone.mid}} 到 {{n:spr.zone.deep}} | 高{{t:two-pair}}及更強的牌 |
| 高於 {{n:spr.zone.deep}} | 暗三條、{{t:straight}}及更強的牌 |

{{t:open|開池}}並被{{t:call|跟注}}後（{{t:spr}} 約 {{n:spr.srp}}），你在最高的區間；3-bet 後（約 {{n:spr.3bet-ip}}），你在{{t:top-pair}}屬於邊緣牌的區間；4-bet 後（約 {{n:spr.4bet}}），你在最低的區間。這些門檻是簡化的說法。各方資料劃分區間的方式不同，但都同意：低於約 {{n:spr.zone.low}} 時，{{t:top-pair}}會打光籌碼；{{t:spr}} 越高，單單一{{t:pair|對}}就越少這麼做。{{n:spr.zone.mid}} 這條界線是本 App 採用的約定。{{n:spr.zone.deep}} 這個門檻來自計算：{{t:spr}} 為 {{n:spr.zone.deep}} 時，連續三次{{t:pot|底池}}大小的{{t:bet|下注}}就會全下。

## 低 {{t:spr}}：面對全下時價格更好

對手把整個籌碼全下時，你要補上你的籌碼，才能贏下{{t:pot|底池}}和他的籌碼。所需權益 = 籌碼 ÷ ({{t:pot}} + 2·籌碼)。{{t:spr}} 為 {{n:spr.commit}} 時是 {{n:eq.jam.spr2}}，4-bet 後約 {{n:eq.jam.4bet}}，3-bet 後約 {{n:eq.jam.3bet-ip}}，而在單次加注的{{t:pot|底池}}裡已經高達約 {{n:eq.jam.srp}}。

{{t:spr}} 越低，剩下可以打的錢越少，也越容易把整個籌碼投進去。{{t:spr}} 越高，籌碼進入{{t:pot|底池}}之前還剩越多{{t:street|條街}}和{{t:bet|下注}}。

:::note 這些數字從哪來
這些{{t:pot|底池}}和籌碼來自翻牌前模組中的尺寸（{{t:open}} {{n:pf.open-size}}、3-bet 到 {{n:pf.3bet.ip-total}} 或 {{n:pf.3bet.oop-total}}、4-bet 到 {{n:pf.4bet.example.low}}）。4-bet 後的{{t:pot|底池}}是這個情境：按鈕位對{{t:small-blind|小盲}}的 3-bet 做 4-bet，{{t:small-blind}}{{t:call|跟注}}，{{t:big-blind}}已經{{t:fold|棄牌}}，他的盲注留在{{t:pot|底池}}裡。尺寸不同，{{t:spr}} 會略有不同，但順序永遠一樣：翻牌前{{t:raise|加注}}越多次，{{t:spr}} 越低。
:::
