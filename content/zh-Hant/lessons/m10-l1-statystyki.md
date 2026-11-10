---
id: m10.l1
module: m10
order: 1
title: "HUD 統計數據"
sub: "VPIP 和 PFR 衡量什麼，以及需要多少手牌"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "你在{{t:big-blind|大盲注}}位置。兩名玩家溜入，你{{t:check|過牌}}看翻牌。這手牌會提高你的 {{t:vpip}} 嗎？"
    options:
      - { text: "不會：你沒有主動投入任何一枚{{t:chips|籌碼}}", correct: true, why: "{{t:vpip}} 只計算翻牌前的主動投入：{{t:call|跟注}}或{{t:raise|加注}}。{{t:big-blind|大盲注}}是強制投入，而{{t:check|過牌}}不花任何成本。" }
      - { text: "會：你玩到翻牌，所以這手牌算有參與", why: "看到翻牌還不夠。只有你在翻牌前自己投入{{t:chips|籌碼}}，{{t:vpip}} 才會上升。" }
      - { text: "會，而且 {{t:pfr}} 也會上升", why: "只有翻牌前{{t:raise|加注}}，{{t:pfr}} 才會上升。這裡沒有人{{t:raise|加注}}，你也只是{{t:check|過牌}}。" }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "朋友給你看一則筆記：某對手的 {{t:vpip}} 是 {{n:hud.ex.wrong.vpip}}，{{t:pfr}} 是 {{n:hud.ex.wrong.pfr}}。你怎麼看？"
    options:
      - { text: "這不可能：{{t:pfr}} 不可能比 {{t:vpip}} 高", correct: true, why: "翻牌前的每一次{{t:raise|加注}}也都是主動投入，所以兩項數據都會計入。{{t:pfr}} 永遠最多等於 {{t:vpip}}；你朋友把數字弄錯了。" }
      - { text: "這是非常激進、幾乎從不{{t:call|跟注}}的玩家", why: "從不{{t:call|跟注}}的玩家，{{t:pfr}} 會等於 {{t:vpip}}，但不會更高。{{t:pfr}} 更高代表紀錄有誤。" }
      - { text: "這是被動型玩家", why: "被動的特徵是 {{t:pfr}} 遠低於 {{t:vpip}}，而不是更高。" }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "對手的 {{t:vpip}} 是 {{n:mda.rec.vpip}}，{{t:pfr}} 是 {{n:mda.rec.pfr}}。他有玩但沒有{{t:raise|加注}}的那些手牌，是怎麼玩的？"
    options:
      - { text: "{{t:call|跟注}}或溜入：這就是相差的 {{n:mda.rec.gap}} 手牌", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}。這些手牌他不經{{t:raise|加注}}就放進{{t:pot|底池}}：溜入，或{{t:call|跟注}}別人的{{t:open|開池}}。" }
      - { text: "在翻牌前{{t:fold|棄牌}}", why: "翻牌前棄掉的手牌完全不計入 {{t:vpip}}。{{t:vpip}} − {{t:pfr}} 的差距是沒有{{t:raise|加注}}就參與的手牌。" }
      - { text: "用{{t:all-in|全下}}來玩", why: "翻牌前全下也是一種{{t:raise|加注}}，所以會提高 {{t:pfr}}。差距是只{{t:call|跟注}}或溜入的手牌。" }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "{{n:hud.se.ex.n}} 手牌後，對手的 {{t:vpip}} 是 {{n:hud.se.ex.p}}。這個數字的標準誤是多少個百分點？請輸入數字。"
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}。約有 {{n:var.conf95}} 的把握，真實的 {{t:vpip}} 落在 ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}} 的範圍內。"
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "{{n:hud.se.ex.n}} 手牌後，對手的 {{t:vpip}} 是 {{n:hud.se.ex.p}}。關於他真實的 {{t:vpip}}，你知道什麼？"
    options:
      - { text: "約有 {{n:var.conf95}} 的把握落在 {{n:hud.ci.ex.low}} 到 {{n:hud.ci.ex.high}} 之間", correct: true, why: "標準誤約為 {{n:hud.se.ex}}，而 {{n:var.conf95}} 區間是 ± {{n:var.z95}} 個標準誤，也就是 ± {{n:hud.ci.ex}}。你知道這名對手並不極端，但還無法區分只差幾個百分點的類型。" }
      - { text: "剛好就是 {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} 手牌仍是小樣本：誤差約為 {{n:hud.se.ex}}，{{n:var.conf95}} 區間是 ± {{n:hud.ci.ex}}。" }
      - { text: "什麼都不知道：不到一千手牌，統計數據沒有意義", why: "言過其實。{{n:hud.ci.ex.low}} 到 {{n:hud.ci.ex.high}} 的區間已經排除了極緊和極鬆的玩家，只是還不夠精確。" }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "幾百手牌後，對手有 {{n:hud.se.f3b.n}} 次機會回應 3-bet，其中 {{n:hud.se.f3b.p}} 選擇{{t:fold|棄牌}}。關於他的面對 3-bet 棄牌率，你知道什麼？"
    options:
      - { text: "幾乎一無所知：約有 {{n:var.conf95}} 的把握落在 {{n:hud.ci.f3b.low}} 到 {{n:hud.ci.f3b.high}} 之間", correct: true, why: "算的是機會次數，不是手牌數。誤差為 √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}，{{n:var.conf95}} 區間是 ± {{n:hud.ci.f3b}}。這個區間既容得下幾乎總是防守的玩家，也容得下幾乎總是{{t:fold|棄牌}}的玩家。" }
      - { text: "他剛好有 {{n:hud.se.f3b.p}} 的情況會{{t:fold|棄牌}}，因為樣本有幾百手牌", why: "幾百手牌對這項數據來說只有 {{n:hud.se.f3b.n}} 次機會。誤差要用機會次數計算：結果約為 {{n:hud.se.f3b}}。" }
      - { text: "他{{t:fold|棄牌}}太頻繁，因為高於 {{n:hud.f3b.low}} 就是錯誤", why: "{{n:hud.se.f3b.p}} 並不是「高於 {{n:hud.f3b.low}}」，而且只有 {{n:hud.se.f3b.n}} 次機會時，誤差約為 {{n:hud.se.f3b}}。這樣的樣本無法得出結論。" }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "新對手，{{t:hud|HUD}} 裡有 {{n:hud.ex.few.hands}} 手牌：{{t:vpip}} {{n:hud.ex.few.vpip}}，{{t:pfr}} {{n:hud.ex.few.pfr}}。你怎麼跟他打？"
    options:
      - { text: "當作陌生玩家，照基準策略打；繼續累積手牌", correct: true, why: "低於約 {{n:hud.hands.random}} 手牌時，統計數據是隨機的：連續拿到幾手好牌就會出現這樣的 {{t:vpip}}。大約 {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} 手牌後能粗略看出玩家類型，{{t:vpip}} 和 {{t:pfr}} 則約在 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} 手牌後趨於穩定。" }
      - { text: "當作{{t:maniac|瘋子}}：放寬範圍{{t:call|跟注}}", why: "{{t:maniac|瘋子}}，也就是非常鬆又激進的玩家，只是其中一種可能：才 {{n:hud.ex.few.hands}} 手牌，他可能是任何類型。根據偶然結果大範圍{{t:call|跟注}}，一旦對手其實只是普通的{{t:regular|常規玩家}}，也就是打得相當紮實的固定玩家，你就會付出代價。" }
      - { text: "當作{{t:nit|岩石型玩家}}，因為大多數玩家都是岩石型玩家", why: "這你也不知道：{{t:nit|岩石型玩家}}，也就是非常緊的玩家，只是其中一種類型。沒有樣本就沒有判讀，所以你回到基準策略。" }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "哪一項統計數據需要最多手牌才可靠？"
    options:
      - { text: "面對 3-bet 棄牌率", correct: true, why: "只有在對手{{t:open|開池}}並遭到 3-bet 時，才會出現面對 3-bet 棄牌的機會，而這很少見。所以你需要約 {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} 手牌，而不是 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}。" }
      - { text: "{{t:vpip}}", why: "{{t:vpip}} 每一手牌都有機會，所以穩定得最快：約 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} 手牌後。" }
      - { text: "{{t:pfr}}", why: "{{t:pfr}} 和 {{t:vpip}} 一樣，在玩家可以{{t:raise|加注}}的每一手牌都有機會，所以很快就會穩定。" }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "你的平台禁止在牌桌上使用 {{t:hud|HUD}} 軟體。你怎麼做？"
    options:
      - { text: "不用 {{t:hud|HUD}}，並在{{t:session|場次}}結束後檢視自己的手牌資料庫和固定對手的筆記", correct: true, why: "平台規章具有約束力：使用被禁止的軟體可能導致帳號被關閉。你可以在打完後檢視自己手牌歷史的統計數據，而且有些平台會在牌桌上顯示自家的統計數據。" }
      - { text: "儘管被禁止仍使用 {{t:hud|HUD}}，因為它能帶來優勢", why: "違反規章，平台可以關閉你的帳號並扣留資金。這點優勢不值得。" }
      - { text: "放棄{{t:exploit|剝削}}，因為沒有 {{t:hud|HUD}} 就做不到", why: "做得到：{{t:session|場次}}後檢視手牌得到的判讀，以及你所在{{t:stakes|級別}}的玩家群體數據，同樣能告訴你該往哪個方向偏離基準策略。" }
---
{{t:exploit|剝削}}是從第 3–9 模組的基準策略出發，朝對手的錯誤方向偏離。想知道該往哪個方向偏離，你需要數據。在線上，這些數據由 {{t:hud}} 提供：一種會記錄牌局，並在牌桌上顯示每位對手統計數據的軟體。

## {{t:vpip}} 和 {{t:pfr}}

最重要的兩個數字描述翻牌前的打法：

- **{{t:vpip}}**：玩家在多少百分比的手牌中，於翻牌前主動把{{t:chips|籌碼}}放進{{t:pot|底池}}，也就是{{t:call|跟注}}或{{t:raise|加注}}。盲注不算，因為那是強制的。
- **{{t:pfr}}**：玩家在多少百分比的手牌中於翻牌前{{t:raise|加注}}：{{t:open|開池}}、3-bet 或 4-bet。

每一次{{t:raise|加注}}也都是主動投入，所以 {{t:pfr}} 永遠不會超過 {{t:vpip}}。{{t:vpip}} − {{t:pfr}} 的差距，就是玩家只{{t:call|跟注}}或溜入的手牌。{{t:vpip}} {{n:mda.rec.vpip}}、{{t:pfr}} {{n:mda.rec.pfr}} 的玩家玩很多手牌，但在所有手牌中有 {{n:mda.rec.gap}} 是不經{{t:raise|加注}}就進入{{t:pot|底池}}。

## 其他統計數據

| 統計數據 | 衡量內容 | 機會 |
|---|---|---|
| 3-bet | 多常{{t:raise|加注}}別人的{{t:open|開池}} | 在他之前有人{{t:open|開池}} |
| 面對 3-bet 棄牌率 | 面對 3-bet 時多常{{t:fold|棄牌}} | 他{{t:open|開池}}並遭到 3-bet |
| C-bet | 自己{{t:raise|加注}}後多常在翻牌下注 | 他是翻牌前的{{t:aggressor|主動進攻者}} |
| 面對 c-bet 棄牌率 | 面對 c-bet 時多常{{t:fold|棄牌}} | 他遭到 c-bet |
| {{t:wtsd}} | 看到翻牌後多常打到攤牌 | 他看到了翻牌 |

最後一欄很重要：只有對手有機會時，統計數據才會變動。{{t:vpip}} 每一手牌都有機會，面對 3-bet 棄牌率則只有在對手{{t:open|開池}}並遭到 3-bet 時才有機會。

## 需要多少手牌

每一手牌都是從對手策略中抽出的隨機樣本，所以統計數據和任何樣本平均數一樣都有誤差。你可以用樣本平均數的誤差公式來計算（在第 12 模組，你會用同一個公式計算{{t:winrate|贏率}}的誤差）：

```formula
誤差 = √(p × (1 − p) ÷ n)
{{n:var.conf95}} 區間 = p ± {{n:var.z95}} × 誤差
```

這裡 p 是百分比（例如 {{t:vpip}}），n 是機會次數。{{n:hud.se.ex.n}} 手牌、{{t:vpip}} {{n:hud.se.ex.p}} 時，誤差約為 {{n:hud.se.ex}}，所以約有 {{n:var.conf95}} 的把握，真實的 {{t:vpip}} 落在 **{{n:hud.ci.ex.low}} 到 {{n:hud.ci.ex.high}} 之間**。{{n:hud.se.f3b.n}} 次機會中面對 3-bet 棄牌率為 {{n:hud.se.f3b.p}}，區間是 {{n:hud.ci.f3b.low}} 到 {{n:hud.ci.f3b.high}}：幾乎一無所知。

教練們給出的門檻相近：

- 低於約 {{n:hud.hands.random}} 手牌時，統計數據是隨機的；把對方當陌生玩家來打；
- 大約 {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} 手牌後能粗略看出玩家類型，{{t:vpip}} 和 {{t:pfr}} 則約在 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} 手牌後趨於穩定；
- 3-bet 需要約 {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} 手牌，面對 3-bet 棄牌率約 {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} 手牌，轉牌和河牌的統計數據需要更多。

:::note 當平台禁止 {{t:hud|HUD}} 時
有些平台（根據教學資料，也包括低{{t:stakes|級別}}的大型平台）禁止在牌桌上使用 {{t:hud|HUD}} 軟體。這時你可以在{{t:session|場次}}結束後檢視自己的手牌歷史、記錄固定對手的筆記，並利用你所在{{t:stakes|級別}}的玩家群體數據（第 2 課）。樣本門檻來自兩份教學資料，兩者給出的手牌數不同。誤差公式則是數學計算。
:::
