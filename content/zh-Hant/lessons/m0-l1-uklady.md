---
id: m0.l1
module: m0
order: 1
title: "牌型大小"
sub: "誰大過誰"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "誰贏：{{t:flush|同花}}還是{{t:straight|順子}}？"
    options:
      - { text: "{{t:flush|同花}}", correct: true, why: "{{t:flush|同花}}的排名較高。湊齊 5 張同一花色的牌，比湊齊 5 張連續的牌更難。" }
      - { text: "{{t:straight|順子}}", why: "這是新手常犯的錯誤。{{t:straight|順子}}比{{t:flush}}低一級。" }
      - { text: "平手", why: "不同牌型永遠不會平手。排名較高的牌型一定贏。" }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "你有{{t:full-house|葫蘆}}，對手有{{t:flush}}。誰贏？"
    options:
      - { text: "你，{{t:full-house}}大過{{t:flush}}", correct: true, why: "{{t:full-house|葫蘆}}（{{t:three-of-a-kind}}加{{t:pair}}）排第 4，{{t:flush}}排第 5。由高到低的順序：同花順、{{t:four-of-a-kind}}、{{t:full-house}}、{{t:flush}}、{{t:straight}}。" }
      - { text: "對手，{{t:flush}}大過{{t:full-house|葫蘆}}", why: "剛好相反。{{t:full-house|葫蘆}}比較少見，所以比較大。" }
      - { text: "要看牌的點數", why: "只有在牌型相同時，才會比較牌的點數。" }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "哪個比較大：{{t:two-pair|兩對}}還是{{t:three-of-a-kind|三條}}？"
    options:
      - { text: "{{t:three-of-a-kind|三條}}", correct: true, why: "{{t:three-of-a-kind|三條}}排第 7，{{t:two-pair}}排第 8。這很容易搞混，因為{{t:two-pair}}「看起來」牌比較多。" }
      - { text: "{{t:two-pair|兩對}}", why: "{{t:two-pair|兩對}}比{{t:three-of-a-kind}}低一級。" }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "你們都有{{t:pair|一對}} K。誰贏？"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "你", correct: true, why: "{{t:pair|對子}}相同，所以由踢腳牌決定：你的 A 大過對手的 Q。所以 AK 比 KQ 好得多。" }
      - { text: "對手", why: "對手的 Q 比你的 A 小。" }
      - { text: "{{t:split-pot|平分底池}}", why: "只有最好的五張牌完全相同時才會平分。這裡踢腳牌分出了高下：A 對 Q。" }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "{{t:board|牌面}}上是{{t:straight}}。誰贏？"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|平分底池}}", correct: true, why: "兩位玩家最好的五張牌都是{{t:board|牌面}}上的{{t:straight}}。{{t:pair|一對}} A 比{{t:straight}}小，所以沒有任何幫助。這就是「{{t:playing-the-board}}」的情況。" }
      - { text: "你，因為你有{{t:pair|一對}} A", why: "{{t:pair|一對}} A 只是{{t:pair|一對}}。{{t:board|牌面}}上的{{t:straight|順子}}比較大，所以你用它來比牌，跟對手一樣。" }
      - { text: "對手", why: "對手要有一張 10 才能組成更大的{{t:straight|順子}}。" }
  - kind: generated
    id: m0.l1.g1
    family: m0.who-wins
    rules: [R-M0-001]
    generator: whoWins
    count: 3
  - kind: generated
    id: m0.l1.g2
    family: m0.kicker
    rules: [R-M0-002]
    generator: whoWinsKicker
    count: 2
  - kind: generated
    id: m0.l1.g3
    family: m0.best-hand
    rules: [R-M0-001]
    generator: bestHand
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar hands
  - kind: generated
    id: m0.l1.g-vocab-hands
    family: vocab.hands
    generator: vocab
    params: { area: hands, dir: both }
    count: 4
---
在德州撲克中，你會拿到 **2 張{{t:hole-cards}}**，{{t:board}}上會發出 **5 張{{t:community-cards|公共牌}}**。你要從這 7 張牌中，組出由 **5** 張牌構成的最好牌型。牌型較大的一方贏得整個{{t:pot|底池}}。

## 由大到小的排名

| | 牌型 | 範例 |
|---|---|---|
| 1 | {{t:royal-flush|皇家同花順}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|同花順}}：{{t:straight-flush|同一花色的順子}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|四條}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|葫蘆}}：{{t:three-of-a-kind}}加{{t:pair}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|同花}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|順子}}（5 張連續） | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|三條}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|兩對}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|一對}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|高牌}} | [[Ac Qd 9s 6h 3c]] |

:::note 踢腳牌
先比較牌型的排名：{{t:three-of-a-kind}}大過{{t:two-pair}}。牌型相同時，比牌型本身的點數：{{t:pair|一對}} K 大過{{t:pair|一對}} Q；兩邊都是{{t:two-pair|兩對}}時，先比較大的那{{t:pair|一對}}。只有在牌型核心完全相同時（同樣的{{t:pair}}、{{t:three-of-a-kind}}，或同樣的{{t:two-pair}}），才由其餘的牌，也就是踢腳牌來決定：先比最大的一張，若仍平手再比下一張。只有最好五張牌裡的踢腳牌才算數。如果雙方的五張牌完全相同，{{t:split-pot|就平分底池}}。
:::

A 可以當作{{t:straight|順子}}中最小的牌：[[5h 4s 3c 2d Ah]] 是最小的{{t:straight}}，稱為{{t:wheel}}。

當你最好的牌型完全由{{t:community-cards|公共牌}}組成，{{t:hole-cards}}沒有任何幫助時，就叫做{{t:playing-the-board|打公牌}}：最好的結果是你們{{t:split-pot|平分底池}}。
