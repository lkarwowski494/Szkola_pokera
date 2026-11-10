---
id: m0.l1
module: m0
order: 1
title: "핸드 순위"
sub: "무엇이 무엇을 이기나"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "누가 이깁니까: {{t:flush|플러시}}입니까, {{t:straight|스트레이트}}입니까?"
    options:
      - { text: "{{t:flush|플러시}}", correct: true, why: "{{t:flush|플러시}}가 순위가 더 높습니다. 같은 무늬 5장을 모으는 것이 연속된 5장을 모으는 것보다 어렵습니다." }
      - { text: "{{t:straight|스트레이트}}", why: "초보자가 자주 하는 실수입니다. {{t:straight|스트레이트}}는 {{t:flush|플러시}}보다 한 단계 아래입니다." }
      - { text: "무승부", why: "서로 다른 핸드는 절대 비기지 않습니다. 순위가 높은 핸드가 항상 이깁니다." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "나는 {{t:full-house|풀하우스}}, 상대는 {{t:flush|플러시}}입니다. 누가 이깁니까?"
    options:
      - { text: "나, {{t:full-house|풀하우스}}가 {{t:flush|플러시}}를 이깁니다", correct: true, why: "{{t:full-house|풀하우스}}({{t:three-of-a-kind|트리플}}과 {{t:pair|페어}})는 4위, {{t:flush|플러시}}는 5위입니다. 위에서부터 순서: 스트레이트 플러시, {{t:four-of-a-kind|포카드}}, {{t:full-house|풀하우스}}, {{t:flush|플러시}}, {{t:straight|스트레이트}}." }
      - { text: "상대, {{t:flush|플러시}}가 {{t:full-house|풀하우스}}를 이깁니다", why: "반대입니다. {{t:full-house|풀하우스}}가 더 드물기 때문에 더 강합니다." }
      - { text: "카드 높이에 따라 다릅니다", why: "카드 높이는 같은 종류의 핸드끼리일 때만 중요합니다." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "어느 쪽이 더 강합니까: {{t:two-pair|투 페어}}입니까, {{t:three-of-a-kind|트리플}}입니까?"
    options:
      - { text: "{{t:three-of-a-kind|트리플}}", correct: true, why: "{{t:three-of-a-kind|트리플}}은 7위, {{t:two-pair|투 페어}}는 8위입니다. {{t:two-pair|투 페어}}가 카드가 더 많아 “보여서” 헷갈리기 쉽습니다." }
      - { text: "{{t:two-pair|투 페어}}", why: "{{t:two-pair|투 페어}}는 {{t:three-of-a-kind|트리플}}보다 한 단계 아래입니다." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "나와 상대 모두 킹 {{t:pair|페어}}입니다. 누가 이깁니까?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "나", correct: true, why: "{{t:pair|페어}}가 같으므로 키커가 결정합니다: 내 에이스가 상대의 퀸을 이깁니다. 그래서 AK가 KQ보다 훨씬 좋습니다." }
      - { text: "상대", why: "상대의 퀸은 내 에이스보다 낮습니다." }
      - { text: "{{t:split-pot|스플릿 팟}}", why: "가장 좋은 5장이 똑같을 때만 팟을 나눕니다. 여기서는 키커가 다릅니다: 에이스 대 퀸." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "{{t:board|보드}}에 {{t:straight|스트레이트}}가 깔려 있습니다. 누가 이깁니까?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|스플릿 팟}}", correct: true, why: "두 플레이어 모두 가장 좋은 5장은 {{t:board|보드}}의 {{t:straight|스트레이트}}입니다. 에이스 {{t:pair|페어}}는 {{t:straight|스트레이트}}보다 약하므로 아무것도 더해 주지 않습니다. 이것이 “{{t:playing-the-board|보드 플레이}}”입니다." }
      - { text: "나, 에이스 {{t:pair|페어}}가 있으니까", why: "에이스 {{t:pair|페어}}는 그냥 {{t:pair|페어}}일 뿐입니다. {{t:board|보드}}의 {{t:straight|스트레이트}}가 더 강하므로 상대와 마찬가지로 그것으로 플레이합니다." }
      - { text: "상대", why: "상대가 더 높은 {{t:straight|스트레이트}}를 만들려면 10이 필요합니다." }
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
텍사스 홀덤에서는 **{{t:hole-cards|홀 카드}} 2장**을 받고, {{t:board|보드}}에는 **{{t:community-cards|커뮤니티 카드}} 5장**이 깔립니다. 이 7장 중 **5**장으로 가장 좋은 핸드를 만듭니다. 더 강한 핸드가 {{t:pot|팟}} 전체를 가져갑니다.

## 강한 순서대로 본 순위

| | 핸드 | 예시 |
|---|---|---|
| 1 | {{t:royal-flush|로열 플러시}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|스트레이트 플러시}}: {{t:straight-flush|같은 무늬로 된 스트레이트}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|포카드}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|풀하우스}}: {{t:three-of-a-kind|트리플}}과 {{t:pair|페어}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|플러시}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|스트레이트}} (연속된 5장) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|트리플}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|투 페어}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|페어}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|하이카드}} | [[Ac Qd 9s 6h 3c]] |

:::note 키커
먼저 핸드의 순위를 비교합니다: {{t:three-of-a-kind|트리플}}은 {{t:two-pair|투 페어}}를 이깁니다. 같은 핸드라면 그 높이가 결정합니다: 킹 {{t:pair|페어}}는 퀸 {{t:pair|페어}}를 이기고, {{t:pair|페어}}가 두 개일 때는 높은 {{t:pair|페어}}부터 비교합니다. 핸드의 핵심이 똑같을 때만(같은 {{t:pair|페어}}, {{t:three-of-a-kind|트리플}} 또는 같은 {{t:two-pair|투 페어}}) 나머지 카드, 즉 키커가 결정합니다: 가장 높은 키커부터 보고, 같으면 그다음 키커를 봅니다. 가장 좋은 5장에 들어간 키커만 셉니다. 양쪽의 5장이 똑같으면 {{t:split-pot|스플릿 팟}}이 됩니다.
:::

에이스는 {{t:straight|스트레이트}}의 가장 낮은 카드가 될 수도 있습니다: [[5h 4s 3c 2d Ah]]는 가장 낮은 {{t:straight|스트레이트}}로, {{t:wheel|휠}}이라고 부릅니다.

내 가장 좋은 핸드가 {{t:community-cards|커뮤니티 카드}}만으로 이루어지고 {{t:hole-cards|홀 카드}}가 아무것도 더해 주지 않으면 {{t:playing-the-board|보드 플레이}}라고 합니다: 잘해야 {{t:split-pot|스플릿 팟}}입니다.
