---
id: m11.l3
module: m11
order: 3
title: "ICM 與泡沫係數"
sub: "籌碼不等於錢"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "剩下三位玩家，前兩名有獎金。籌碼量：{{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}} 和 {{n:m11.icm.a.s3}} {{t:chips|籌碼}}。依 {{t:icm}}，最短籌碼拿到第 1 名的機率是多少？請輸入百分比數字。"
    answer: m11.icm.a.chips3
    explanation: "第 1 名機率 = 籌碼量 ÷ 所有{{t:chips|籌碼}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}。"
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "同樣的籌碼量（{{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}}、{{n:m11.icm.a.s3}}）。大籌碼拿下第 1 名。現在最短籌碼拿到第 2 名的機率是多少？"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "剩下兩位玩家共有 {{n:m11.icm.a.rest1}} {{t:chips|籌碼}}，其中短籌碼有 {{n:m11.icm.a.s3}}：{{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}。" }
      - { text: "{{n:m11.icm.a.chips3}}", why: "這是第 1 名的機率，是用所有{{t:chips|籌碼}}算的。贏家退出計算後，只要除以其餘玩家的{{t:chips|籌碼}}：{{n:m11.icm.a.rest1}}。" }
      - { text: "{{n:m11.icm.a.second3}}", why: "這是{{t:short-stack|短籌碼}}在兩種可能贏家下合計拿到第 2 名的機率。題目問的是大籌碼贏了的情況。" }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|獎金}}：第 1 名拿{{t:prize-pool|獎金池}}的 {{n:m11.icm.a.p1}}，第 2 名拿 {{n:m11.icm.a.p2}}。籌碼量 {{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}}、{{n:m11.icm.a.s3}}。依 {{t:icm}}，最短籌碼值多少（佔{{t:prize-pool|獎金池}}的百分比）？請輸入數字。"
    answer: m11.icm.a.eq3
    explanation: "第 1 名機率 {{n:m11.icm.a.chips3}}，第 2 名機率 {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}。權益 = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}，多於它的 {{n:m11.icm.a.chips3}} {{t:chips|籌碼}}。"
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "大籌碼持有場上 {{n:m11.icm.a.chips1}} 的{{t:chips|籌碼}}。依 {{t:icm}}，換算成錢值多少？"
    options:
      - { text: "{{n:m11.icm.a.eq1}}，也就是低於{{t:chips|籌碼}}佔比", correct: true, why: "大籌碼最多只能贏得{{t:prize-pool|獎金池}}的 {{n:m11.icm.a.p1}}，儘管它有機會拿下所有{{t:chips|籌碼}}。因此領先者的{{t:chips|籌碼}}價值低於其佔比，而{{t:short-stack|短籌碼}}的則較高（{{n:m11.icm.a.eq3}}）。" }
      - { text: "{{n:m11.icm.a.chips1}}，與{{t:chips|籌碼}}佔比相同", why: "如果贏家能拿走整個{{t:prize-pool|獎金池}}，才會是這樣。在 {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}} 的{{t:payout|獎金}}分配下，大籌碼的每一枚{{t:chips|籌碼}}都比較不值錢：{{n:m11.icm.a.eq1}}。" }
      - { text: "{{n:m11.icm.a.p1}}，因為它幾乎一定會贏", why: "它拿第 1 名的機率只有 {{n:m11.icm.a.chips1}}，其餘的{{t:tournament-equity|錦標賽權益}}則來自第 2 名。合計 {{n:m11.icm.a.eq1}}。" }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|泡沫}}：四位玩家，前三名有獎金。你{{t:call|跟注}}全下時，輸了會失去{{t:prize-pool|獎金池}}的 {{n:m11.bf.loss}}，贏了則增加 {{n:m11.bf.gain}}。泡沫係數是多少？請輸入小數點後兩位的數字。"
    answer: m11.bf.value
    explanation: "泡沫係數 = 損失 ÷ 獲利 = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}。輸的傷害幾乎是贏的幫助的一倍半。"
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "泡沫係數是 {{n:m11.bf.value}}。你需要多少權益，{{t:call|跟注}}全下才划算？請輸入百分比數字。"
    answer: m11.bf.req
    explanation: "所需權益 = BF ÷ (BF + 1)，也就是 損失 ÷ (損失 + 獲利) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}。在以{{t:chips|籌碼}}計價的遊戲中，{{n:m11.bf.req-chips}} 就夠了。"
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "在以{{t:chips|籌碼}}計價的遊戲中，{{t:call|跟注}}這次全下只需要 {{n:m11.bf.req-chips}} 權益，但依 {{t:icm}} 你需要 {{n:m11.bf.req}}。這個差距叫什麼？"
    options:
      - { text: "{{t:risk-premium|風險溢價}}（{{n:m11.bf.premium}}）", correct: true, why: "{{t:risk-premium|風險溢價}}是 {{t:icm}} 在{{t:chips|籌碼}}價格之外額外要求的權益：{{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}。" }
      - { text: "泡沫係數", why: "泡沫係數是損失與獲利的比值（{{n:m11.bf.value}}）。你用它算出所需權益，而與以{{t:chips|籌碼}}計價的遊戲之間的差距就是{{t:risk-premium|風險溢價}}。" }
      - { text: "棄牌權益", why: "棄牌權益是對手{{t:fold|棄牌}}帶來的獲利。{{t:call|跟注}}全下時，你沒有這個。" }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|泡沫}}，課程中的例子。你的手牌對對手全下的{{t:range|範圍}}約有 {{n:m11.bf.example-eq}} 權益。在以{{t:chips|籌碼}}計價的遊戲中，{{t:call|跟注}}會划算，因為 {{n:m11.bf.req-chips}} 就夠了。這裡你怎麼做？"
    options:
      - { text: "{{t:fold|棄牌}}", correct: true, why: "依 {{t:icm}}，這裡你需要 {{n:m11.bf.req}} 權益。贏的機率比這更低的手牌會虧錢，即使以{{t:chips|籌碼}}計算是正收益。" }
      - { text: "{{t:call|跟注}}，因為以{{t:chips|籌碼}}來看有獲利", why: "在有{{t:payout|獎金}}的{{t:tournament|錦標賽}}中，重要的是錢，不是{{t:chips|籌碼}}。輸了會讓你失去{{t:prize-pool|獎金池}}的 {{n:m11.bf.loss}}，贏了只多 {{n:m11.bf.gain}}。" }
      - { text: "{{t:call|跟注}}，因為我贏的機率超過一半", why: "有 {{n:m11.bf.example-eq}} 的手牌贏的次數超過一半，但在這裡仍然太弱：門檻是 {{n:m11.bf.req}}。" }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:tournament|錦標賽}}的{{t:bubble|泡沫}}。你是桌上籌碼最多的人，{{t:cover|覆蓋}}所有人。中籌碼經常對你棄牌。這代表什麼？"
    options:
      - { text: "你可以更寬地{{t:shove|推全下}}，因為對手{{t:call|跟注}}很緊", correct: true, why: "中籌碼{{t:call|跟注}}時，要冒著在進入獎金圈前出局的風險，所以需要很多權益。你輸了只會損失部分籌碼。對手{{t:call|跟注}}很緊，所以你更常不經對抗就拿下{{t:pot|底池}}。" }
      - { text: "打得更緊，以免失去領先", why: "領先者在桌上風險最小。打得緊等於放棄他的主要優勢：對中籌碼施壓。" }
      - { text: "沒有影響，因為 {{t:icm}} 只適用於{{t:short-stack|短籌碼}}", why: "{{t:icm}} 適用於所有人：它會改變每個人{{t:call|跟注}}所需的權益，而這取決於整體的籌碼分布。" }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "{{t:icm}} 模型假設了什麼？"
    options:
      - { text: "所有人實力相同，名次只由籌碼量決定", correct: true, why: "{{t:icm}} 只把籌碼量換算成拿到各名次的機率。它不考慮{{t:position|位置}}、上升的盲注，也不考慮實力差距。" }
      - { text: "較強的玩家更常贏", why: "正好相反：{{t:icm}} 假設實力相同。它完全不考慮玩家的優勢。" }
      - { text: "{{t:big-blind|大盲}}位置的玩家機率較低", why: "{{t:icm}} 不考慮{{t:position|位置}}或盲注：它只看籌碼量。這是它的限制之一。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
在現金局（cash）裡，{{t:chips|籌碼}}就是錢：贏來的和輸掉的價值相同。在{{t:tournament|錦標賽}}裡卻不是這樣。獎金只發給前幾名，而且冠軍雖然拿走所有{{t:chips|籌碼}}，卻拿不走整個{{t:prize-pool|獎金池}}。因此{{t:chips|籌碼}}必須換算成錢。

## {{t:icm}}：籌碼量值多少錢

獨立{{t:chips|籌碼}}模型（{{t:icm}}）把籌碼量換算成拿到每個名次的機率。它假設所有人實力相同，所以名次順序只由籌碼量決定。

```formula
第 1 名機率 = 你的籌碼量 ÷ 所有籌碼
```

第 2 名的機率也用同樣方法算，但要針對每個可能的冠軍分開計算：扣掉冠軍的{{t:chips|籌碼}}，再除以剩下的部分。一個籌碼量的{{t:tournament-equity|錦標賽權益}}，也就是它在{{t:prize-pool|獎金池}}中的預期佔比，是以下各項的總和：名次機率 × 該名次的{{t:payout|獎金}}。

## 例子：{{t:bubble|泡沫}}階段的三位玩家

前兩名有獎金：{{t:prize-pool|獎金池}}的 {{n:m11.icm.a.p1}} 和 {{n:m11.icm.a.p2}}。籌碼量：{{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}} 和 {{n:m11.icm.a.s3}} {{t:chips|籌碼}}。

- {{t:short-stack|短籌碼}}贏得{{t:tournament|錦標賽}}的機率是 {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**。
- 第 2 名：如果大籌碼贏（{{n:m11.icm.a.chips1}}），短籌碼拿第二的機率是 {{n:m11.icm.a.second3.via1}}；如果中籌碼贏（{{n:m11.icm.a.chips2}}），機率是 {{n:m11.icm.a.second3.via2}}。合計 {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}**（各項已四捨五入）。
- 權益：{{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{t:prize-pool|獎金池}}的 **{{n:m11.icm.a.eq3}}**。

| 籌碼量 | {{t:chips|籌碼}}佔比 | 依 {{t:icm}} 的權益 |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

{{t:short-stack|短籌碼}}的價值高於它的{{t:chips|籌碼}}，大籌碼則較低：領先者拿到的不會超過第 1 名的獎金。

## 泡沫係數：輸的傷害更大

四位玩家，前三名有獎金：{{n:m11.bf.p1}}、{{n:m11.bf.p2}} 和 {{n:m11.bf.p3}}。籌碼量 {{n:m11.bf.s1}}、{{n:m11.bf.s2}}（你）、{{n:m11.bf.s3}} 和 {{n:m11.bf.s4}}。持有 {{n:m11.bf.s3}} 的玩家全下，你{{t:cover|覆蓋}}他，也就是你的{{t:chips|籌碼}}比較多。為了簡化，我們忽略{{t:pot|底池}}裡的盲注。

- 現在你的籌碼量值{{t:prize-pool|獎金池}}的 {{n:m11.bf.eq.now}}。
- 如果你贏：你有 {{n:m11.bf.win}}，對手出局，所有人都進入獎金圈。你的權益升到 {{n:m11.bf.eq.win}}，也就是增加 **{{n:m11.bf.gain}}**。
- 如果你輸：你剩下 {{n:m11.bf.lose}}，權益降到 {{n:m11.bf.eq.lose}}，也就是減少 **{{n:m11.bf.loss}}**。

```formula
泡沫係數 = 輸時的損失 ÷ 贏時的獲利
```

這裡 {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**。本 App 採用這個定義（損失 ÷ 獲利）：在以{{t:chips|籌碼}}計價的遊戲中，損失等於獲利，泡沫係數就是一。有些 push/fold 表的泡沫係數算法不同、尺度也不同，所以別把它們的數字直接拿來和這裡比較。由泡沫係數可以得出所需權益：

```formula
所需權益 = BF ÷ (BF + 1)
```

結果是 **{{n:m11.bf.req}}**。在以{{t:chips|籌碼}}計價的遊戲中，你冒險投入 {{n:m11.bf.s3}} 來贏 {{n:m11.bf.s3}}，所以 {{n:m11.bf.req-chips}} 就夠了。兩者的差距 {{n:m11.bf.premium}}，就是**{{t:risk-premium|風險溢價}}**。

已發表的三人等籌碼均衡解（2008 年的研究論文）也呈現同樣的方向：當 Button 和{{t:small-blind|小盲}}都已全下時，{{t:big-blind|大盲}}在單手牌局中會用 {{n:m11.jamfold3.overcall.single}} 的手牌{{t:call|跟注}}，但在有{{t:payout|獎金}}的{{t:tournament|錦標賽}}中只用 {{n:m11.jamfold3.overcall.tourn}}，也就是只有最高的{{t:pocket-pair|口袋對}}和 AKs。

:::note 誰{{t:call|跟注}}很緊
在{{t:bubble|泡沫}}階段或{{t:final-table|決賽桌}}（{{t:tournament|錦標賽}}的最後一桌，爭奪最高獎金的地方），中籌碼{{t:call|跟注}}全下會比在以{{t:chips|籌碼}}計價的遊戲中緊得多。{{t:cover|覆蓋}}對手的大籌碼風險較小，可以利用這一點：更寬地{{t:shove|推全下}}，因為對手不得不{{t:fold|棄牌}}。泡沫係數取決於桌上所有人的籌碼量，所以不是在牌桌上當場計算，而是透過例子練習，培養出感覺。
:::

## {{t:icm}} 的限制

{{t:icm}} 不考慮{{t:position|位置}}、上升的盲注，也不考慮玩家的實力。它只是近似值，不是{{t:tournament|錦標賽}}的精確估值。
