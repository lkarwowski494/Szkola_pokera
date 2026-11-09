---
id: m13.l1
module: m13
order: 1
title: "如何閱讀牌局報告"
sub: "決策、結果與評分等級"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "你以 {{n:m13.eq.example}} 的{{t:equity}}全下，結果輸了。這類牌局中，即使決策正確，你輸掉的比例是百分之多少？請輸入數字。"
    answer: m13.lose.example
    explanation: "你會在 1 − e 的牌局中輸掉：全部減去 {{n:m13.eq.example}} 等於 {{n:m13.lose.example}}。這次輸牌無法說明決策的好壞。"
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "你以 {{n:m13.eq.example}} 的{{t:equity}}全下十次。平均來說，這些牌局你會輸掉幾手？請輸入數字。"
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}。就算連輸兩次，也仍在計算範圍之內。"
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "你在全下時有 {{n:m13.eq.example2}} 的{{t:equity}}。這類牌局中你輸掉的比例是百分之多少？請輸入數字。"
    answer: m13.lose.example2
    explanation: "全部減去 {{n:m13.eq.example2}} 等於 {{n:m13.lose.example2}}：這類牌局你大約每三手會輸一手，而決策依然是正確的。"
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "在這個局面中，solver 對你的手牌大約各半選擇{{t:raise|加注}}或{{t:fold|棄牌}}。你選擇了{{t:fold|棄牌}}。報告會如何評分？"
    options:
      - { text: "一致", correct: true, why: "對：solver 在至少 {{n:range.mixed.low}} 的情況下採取的行動就算一致。在均衡中，玩家只會混合具有相同{{t:expected-value|期望值}}的打法，所以兩者都正確。" }
      - { text: "錯誤，因為應該{{t:raise|加注}}", why: "不對：{{t:mixed-hand|混合手牌}}的兩種打法有相同的{{t:expected-value|期望值}}。報告不會因為你選了其中一種而扣分。" }
      - { text: "未評分", why: "不對：這個局面有 solver 結果，所以決策會被評分。「未評分」是給 App 沒有可檢驗規則的決策。" }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "solver 對你的手牌約有 {{n:range.mixed.high}} 的情況選擇{{t:raise|加注}}，其餘選擇{{t:call|跟注}}。你選擇了{{t:call|跟注}}。評分結果是？"
    options:
      - { text: "一致", correct: true, why: "對：約 {{n:range.mixed.low}} 情況下採取的{{t:call}}沒有低於一致的門檻（{{n:range.mixed.low}}）。這是一手{{t:mixed-hand|混合手牌}}。" }
      - { text: "可接受", why: "可接受是指至少在 {{n:range.mixed.min}}、但少於 {{n:range.mixed.low}} 的情況下採取的行動。這裡的{{t:call}}已達到一致的門檻。" }
      - { text: "錯誤", why: "錯誤是指 solver 完全不採取的行動。採取頻率低於 {{n:range.mixed.min}} 的行動屬於不精確。" }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "在 solver 會打 3-bet 的局面中，你打了 3-bet，但尺寸和規則建議的不同。評分結果是？"
    options:
      - { text: "不精確", correct: true, why: "對：行動正確，尺寸錯誤。它會被算作錯誤，並在複習中再次出現，但報告會另外說明尺寸問題。" }
      - { text: "一致", why: "行動正確，但尺寸很重要：3-bet 太小會給對手好的賠率，太大則承擔了不必要的風險。" }
      - { text: "錯誤", why: "錯誤的行動才會被評為錯誤。行動正確但尺寸錯誤是另一個等級：不精確。" }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "報告：「已評分 30 個決策中的 14 個」。其餘的決策代表什麼？"
    options:
      - { text: "App 對它們沒有可檢驗的規則，也沒有 solver 結果", correct: true, why: "對：「未評分」不代表「正確」。這些決策可能好也可能壞；報告並不知道，也會直接說明這一點。" }
      - { text: "它們是正確的，所以報告沒有顯示", why: "不對：報告會把正確的決策算作一致。「未評分」是沒有評分，不是稱讚。" }
      - { text: "它們太簡單，不需要評分", why: "這和難度無關。被評分的決策是 App 有附條件規則或 solver 局面的決策。" }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "一場{{t:session|牌局}}結束後，你贏了不少{{t:chips|籌碼}}，但報告顯示五個錯誤。哪一項更能說明你的打法？"
    options:
      - { text: "決策評分", correct: true, why: "對：幾十手牌太少，結果說明不了什麼。即使打了幾千手，結果大多仍是雜訊，而每個錯誤都有代價，不論那手牌最後怎麼結束。" }
      - { text: "{{t:chips|籌碼}}輸贏結果", why: "短時間{{t:session|牌局}}的結果主要取決於牌運。正因如此，報告才用較小的字體顯示它。" }
      - { text: "兩者一樣重要", why: "幾十手牌的結果幾乎無法說明技術。用規則或 solver 評分的決策能說明得多。" }
---
{{t:session|牌局}}結束後的報告評的是你的決策，而不是你贏了多少。本課說明如何閱讀報告。

## 看決策，不看結果

在心態模組中，你學過這個原則：評估決策時，依據的是你做決定當下擁有的資訊，而不是那手牌的結果。報告完全照這個原則執行：它評估你行動之前的情況，看不到對手的牌，也看不到之後發出的牌。

拿著較好的牌輸掉，仍在計算範圍之內。{{t:equity|權益}}是同一情況重複多次時贏的比例。以 {{n:m13.eq.example}} 的{{t:equity}}，你約有 {{n:m13.lose.example}} 的牌局會輸，也就是平均每 {{n:m13.ten}} 手輸 {{n:m13.lose.of-ten}} 手。

```formula
輸的機率 = 1 − 權益
```

## 評分等級

- **一致**：規則建議的行動，或 solver 在至少 {{n:range.mixed.low}} 的情況下採取的行動（這個門檻是 App 的設定）。
- **可接受**：solver 很少採取（至少 {{n:range.mixed.min}}，但少於 {{n:range.mixed.low}}），或規則講的是頻率（「經常」、「較少」），而你選了頻率較低的選項。這不是錯誤。
- **不精確**：行動正確但尺寸錯誤，或 solver 會採取、但頻率低於 {{n:range.mixed.min}} 的行動。它會被算作錯誤：這是 App 的設定，不是理論。
- **錯誤**：違反明確規則的行動，或 solver 完全不採取的行動。
- **未評分**：App 對這個決策沒有可檢驗的規則。這不代表「正確」。
- **逾時**：開啟時間限制時，App 替你做了行動。這類決策不計入評分，但會在複習中再次出現。

報告最上方會顯示「已評分 Y 個決策中的 X 個」。翻牌後有許多決策未評分，因為轉牌和河牌的規則大多講的是整個{{t:range|範圍}}的頻率，而不是單一手牌。

## {{t:mixed-hand|混合手牌}}

當 solver 對你的手牌有兩種打法時，兩者都正確。均衡理論用無差異原則解釋這一點：玩家只會混合具有相同{{t:expected-value|期望值}}的打法。因此報告不會因為你選了其中一種而扣分；當 solver 至少在 {{n:range.mixed.min}} 的情況下採取頻率較低的打法時，報告會將它標為可接受，更低則屬於不精確（App 的設定）。

## {{t:chips|籌碼}}輸贏結果

結果顯示在報告最下方，字體較小。根據{{t:variance|變異數}}一課的計算，打了約 {{n:m13.noise.hands.k}} 千手牌後，winrate 的 {{n:var.conf95}} 區間約為 ± {{n:m13.noise.ci}}，所以結果幾乎全是雜訊：贏家可能是負的，輸家也可能大幅領先。一場{{t:session|牌局}}只有幾十手牌，所以結果幾乎說明不了你的打法。

:::note 這些原則的出處
無差異原則：均衡理論基礎的相關資料。罕見打法的門檻與「不精確」這個名稱：對照 solver 評估自己打法的相關資料。{{n:range.mixed.low}} 的門檻是 App 的設定，沒有出處。結果的{{t:variance|變異數}}和輸的機率是計算得出的。
:::
