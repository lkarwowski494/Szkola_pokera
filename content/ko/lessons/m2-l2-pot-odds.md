---
id: m2.l2
module: m2
order: 2
title: "팟 오즈"
sub: "콜이 이득이 되는 경우"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "{{t:pot|팟}}은 {{n:ex.third.pot}}입니다. 상대가 {{n:ex.third.bet}} {{t:bet|베팅합니다}}. {{t:call|콜하려면}} 에퀴티가 얼마나 필요합니까?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "{{t:bet|베팅}} 후 {{t:pot|팟}}은 {{n:ex.third.pot-after-bet}}입니다. 여기에 {{n:ex.third.bet}}만큼 더 내면 합계는 {{n:ex.third.total}}입니다. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "{{t:pot|팟}} 크기의 {{t:bet|베팅}}에서 필요한 값입니다. 여기서는 {{t:bet|베팅}}이 {{t:pot|팟}}의 1/3입니다." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "{{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}의 값입니다. 분모에 내 {{t:call|콜}}도 더하세요." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "턴입니다. {{t:flush-draw|플러시 드로우}}가 있습니다. {{t:pot|팟}}은 {{n:ex.pot}}, 상대가 {{n:ex.bet.pot}} {{t:bet|베팅합니다}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|폴드합니다}}", correct: true, why: "필요한 에퀴티는 {{n:eq.bet-pot}}입니다. {{t:flush|플러시}} 아웃은 {{n:outs.flush}}개로, 약 {{n:odds.flush.turn-river}}입니다. 에이스 {{t:pair|페어}}를 만들어 주는 에이스 {{n:pair.outs.per-rank}}장을 더해도(총 아웃 {{n:outs.flush-ace}}개, 약 {{n:odds.flush-ace.turn-river}}) 여전히 {{n:eq.bet-pot}}보다 확실히 낮습니다. 이런 {{t:call|콜}}은 장기적으로 손해입니다." }
      - { text: "{{t:call|콜합니다}}", why: "가장 강한 {{t:flush|플러시}}를 노리는 {{t:draw|드로우}}가 있고 에이스도 도움이 될 수 있어 끌리지만, 약 {{n:odds.flush-ace.turn-river}}도 {{n:eq.bet-pot}}보다 낮습니다." }
      - { text: "올인 {{t:raise|레이즈합니다}}", why: "숙련자에게는 하나의 플레이가 되기도 하지만, 확실한 이유 없이 하면 아직 아무것도 없는 핸드로 스택 전체(앞에 놓인 모든 {{t:chips|칩}})를 위험에 빠뜨리게 됩니다." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "같은 핸드지만, 상대가 {{t:pot|팟}} {{n:ex.pot}}에 {{n:ex.bet.quarter}}만 {{t:bet|베팅합니다}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|콜합니다}}", correct: true, why: "필요한 에퀴티는 {{n:eq.bet-quarter}}이고, 가진 에퀴티는 약 {{n:odds.flush.turn-river}}입니다. 에이스까지 세면 더 높습니다. 작은 {{t:bet|베팅}}은 좋은 가격을 줍니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "{{t:fold|폴드하기}}에는 너무 쌉니다. {{n:odds.flush.turn-river}}만으로도 필요한 {{n:eq.bet-quarter}}보다 높고, 에이스까지 세면 더 높습니다." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "상대가 {{t:pot|팟}}의 절반을 {{t:bet|베팅합니다}}. 에퀴티가 얼마나 필요합니까?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|팟}} {{n:ex.pot}}, {{t:bet|베팅}} {{n:ex.bet.half}}. 합계 {{n:ex.half.total}} 중 {{n:ex.bet.half}}만큼 내므로 {{n:eq.bet-half}}입니다." }
      - { text: "{{n:ex.wrong.half}}", why: "흔한 실수입니다. {{n:ex.wrong.half}} 값은 {{t:bet|베팅}} 금액을 {{t:bet|베팅}} 전 {{t:pot|팟}}으로 나눈 값입니다({{n:ex.bet.half}} ÷ {{n:ex.pot}}). 추가로 내는 금액은 내 {{t:call|콜}} 후의 전체 {{t:pot|팟}}으로 나눕니다: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "전체 {{t:pot|팟}} 크기의 {{t:bet|베팅}}에서 필요한 값입니다." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "상대가 {{t:pot|팟}} 전체를 {{t:bet|베팅합니다}}. {{t:call|콜하려면}} 에퀴티가 몇 퍼센트 필요합니까? 숫자를 입력하세요."
    answer: eq.bet-pot
    explanation: "{{t:pot|팟}} {{n:ex.pot}}, {{t:bet|베팅}} {{n:ex.bet.pot}}. 내 {{t:call|콜}} 후 {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}인 {{t:pot|팟}}에 {{n:ex.bet.pot}}만큼 냅니다. 추가로 내는 금액을 전체 {{t:pot|팟}}으로 나누면 {{n:eq.bet-pot}}, 즉 3분의 1입니다."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
상대가 {{t:bet|베팅하고}} 내가 {{t:draw|드로우}}를 가지고 있을 때, 질문은 이것입니다. 가격이 좋은가? 두 숫자를 비교합니다. **얼마나 이겨야 하는지**와 **실제로 얼마나 이기는지**입니다.

:::note 에퀴티와 적중 확률
**에퀴티**는 {{t:pot|팟}} 중 내 몫입니다. 더 이상의 {{t:bet|베팅}} 없이 핸드가 쇼다운까지 갔을 때 얼마나 자주 이기는지를 뜻합니다. 아웃 레슨에서 배운 **적중 확률**은 아웃이 나올 확률일 뿐입니다. 적중해야만 이기는 순수한 {{t:draw|드로우}}라면, 이 가격으로 실제로 보게 될 카드에서의 적중 확률이 에퀴티의 근삿값입니다. 플롭에서 {{t:bet|베팅}}을 받았다면 이는 리버까지가 아니라 카드 한 장에 대한 확률입니다.
:::

## 얼마나 이겨야 하는지

```formula
필요한 에퀴티 = 콜 ÷ 내 콜 후의 팟
내 콜 후의 팟 = 베팅 전 팟 + 베팅 + 콜
```

예: {{t:pot|팟}}은 {{n:ex.pot}}, 상대가 {{n:ex.bet.half}} {{t:bet|베팅합니다}}. 이제 {{t:pot|팟}}은 {{n:ex.half.pot-after-bet}}입니다. 여기에 {{n:ex.bet.half}}만큼 더 내므로 내 {{t:call|콜}} 후의 {{t:pot|팟}}은 {{n:ex.half.total}}입니다. 필요한 에퀴티는 {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**입니다.

## 빠른 요약표

| 상대의 {{t:bet|베팅}} | 필요한 에퀴티 |
|---|---|
| {{t:pot|팟}} 전체 | {{n:eq.bet-pot}} |
| {{t:pot|팟}}의 절반 | {{n:eq.bet-half}} |
| {{t:pot|팟}}의 4분의 1 | {{n:eq.bet-quarter}} |

:::note 결정
내 에퀴티가 필요한 에퀴티보다 크면 {{t:call|콜합니다}}. 작으면 {{t:fold|폴드합니다}}. 이는 {{t:expected-value|기댓값}}에서 나옵니다. {{t:call|콜}}의 {{t:expected-value|EV}} = 에퀴티 × 내 {{t:call|콜}} 후의 {{t:pot|팟}} − {{t:call|콜}}이며, 이 값은 에퀴티가 필요한 값보다 작을 때, 그리고 그때에만 음수가 됩니다. 이 계산 하나로 초보자가 저지르는 값비싼 실수 대부분이 사라집니다. 지금은 {{t:implied-odds|임플라이드 오즈}}, 즉 내 핸드를 완성했을 때 그 핸드에서 나중에 얻을 것으로 예상되는 {{t:chips|칩}}은 고려하지 않습니다. 이후 모듈에서 다시 다룹니다.
:::
