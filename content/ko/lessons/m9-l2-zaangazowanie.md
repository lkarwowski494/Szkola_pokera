---
id: m9.l2
module: m9
order: 2
title: "팟 커밋"
sub: "스택 전부를 걸고 플레이할 때"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "플롭, {{t:spr}} {{n:spr.commit}}: {{t:pot|팟}}은 {{n:ex.pot}}, 스택은 각각 {{n:commit.stack}}입니다. {{t:pot|팟}} 전체({{n:ex.bet.pot}})를 베팅하자 상대가 올인합니다. 추가로 내야 할 금액은 {{n:commit.after-pot.call}}입니다. {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까? 퍼센트로 숫자를 입력하세요."
    answer: eq.commit.after-pot
    explanation: "상대의 추가 금액을 빼면 {{t:pot|팟}}에 있는 금액은 {{n:ex.pot.after-pot-call}}입니다({{t:pot}}, 내 {{t:bet}}, 그리고 상대가 맞춘 금액). 추가 금액이 {{n:commit.after-pot.call}}이므로 필요한 에퀴티 = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}입니다. 이런 {{t:bet|베팅}} 후에는 커밋된 상태입니다. {{t:fold}}는 보통 이득이 되지 않습니다."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "플롭, {{t:spr}} {{n:spr.commit}}: {{t:pot|팟}}은 {{n:ex.pot}}, 스택은 각각 {{n:commit.stack}}입니다. {{t:pot|팟}}의 절반({{n:ex.bet.half}})을 베팅하자 상대가 올인합니다. 추가로 내야 할 금액은 {{n:commit.after-half.call}}입니다. {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까? 퍼센트로 숫자를 입력하세요."
    answer: eq.commit.after-half
    explanation: "상대의 추가 금액을 빼면 {{t:pot|팟}}에 있는 금액은 {{n:ex.half.total}}입니다({{t:pot}}, 내 {{t:bet}}, 그리고 상대가 맞춘 금액). 추가 금액은 {{n:commit.after-half.call}}입니다: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. 바로 올인을 받을 때({{n:eq.jam.spr2}})보다 적습니다. 이미 돈의 일부를 넣었기 때문입니다."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "플롭, {{t:spr}} {{n:spr.commit}}. {{t:top-pair|탑 페어}}를 들고 {{t:pot|팟}} 전체를 베팅했는데 상대가 올인합니다. {{t:call|콜}}하려면 {{n:eq.commit.after-pot}}의 에퀴티가 필요합니다. 어떻게 하겠습니까?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|콜합니다}}", correct: true, why: "맞습니다. 가격이 매우 좋습니다. {{t:spr}}이 낮으면 상대는 {{t:draw|드로}}나 더 약한 퀸으로도 올인하므로, 에이스 키커의 {{t:top-pair}}는 보통 {{n:eq.commit.after-pot}}보다 훨씬 많은 에퀴티를 가집니다. 확실히 지는 상대는 {{t:two-pair|투 페어}}와 셋뿐입니다." }
      - { text: "{{t:fold|폴드합니다}}. 올인은 강한 핸드를 뜻하니까요", why: "{{t:fold|폴드}}하면 이미 많이 넣은 {{t:pot|팟}}을 포기하게 됩니다. 다섯 번에 한 번, 즉 {{n:eq.commit.after-pot}}의 확률로만 이기면 됩니다. 여기서 {{t:fold|폴드}}할 생각이었다면 {{t:pot|팟}} 전체를 베팅하지 않는 편이 나았습니다." }
      - { text: "{{t:fold|폴드합니다}}. {{t:spr}}이 낮으니까요", why: "낮은 {{t:spr}}은 반대로 작용합니다. 올인 가격이 더 좋으므로 스택 전부를 걸고 플레이하기가 더 쉽습니다." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "내 {{t:bet|베팅}} 후 스택에 남는 금액이 그 베팅이 {{t:call|콜}}된 뒤의 {{t:pot}}보다 적습니다. 의미 없는 플랜은 무엇입니까?"
    options:
      - { text: "{{t:bet|베팅}} 후 상대가 올인하면 {{t:fold}}", correct: true, why: "맞습니다. 이 플랜은 실수입니다. 이런 {{t:bet|베팅}} 후에는 올인에 {{t:call|콜}}하는 데 필요한 에퀴티가 매우 적습니다({{t:spr}} {{n:spr.commit}}에서 {{t:pot|팟}} 크기 {{t:bet|베팅}}이면 {{n:eq.commit.after-pot}}뿐). 어차피 {{t:fold|폴드}}한다면 {{t:bet}}은 {{t:chips}}만 내주는 셈입니다." }
      - { text: "바로 올인", why: "강한 핸드라면 합리적인 플랜입니다. 어차피 스택 전부를 걸고 플레이하므로 바로 넣는 것입니다." }
      - { text: "{{t:check|체크}}", why: "스택 전부를 걸고 싶지 않을 때 역시 합리적입니다. 나중에 {{t:fold|폴드}}하기 어려워질 돈을 넣지 않기 때문입니다." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "4벳 이후의 {{t:pot|팟}}, {{t:spr}} 약 {{n:spr.4bet}}. 최고 키커로 {{t:top-pair|탑 페어}}를 맞혔습니다. 어떤 플랜으로 가겠습니까?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "스택 전부를 걸고 플레이합니다", correct: true, why: "맞습니다. {{t:spr}} 약 {{n:spr.4bet}}에서는 올인에 약 {{n:eq.jam.4bet}}의 에퀴티만 있으면 되고, 에이스 키커의 {{t:top-pair}}는 여기서 매우 강합니다. 전부 넣는다는 플랜으로 베팅하거나 {{t:call|콜합니다}}." }
      - { text: "조심스럽게 플레이하고 큰 {{t:bet}}에는 {{t:fold|폴드합니다}}", why: "이렇게 낮은 {{t:spr}}에서 {{t:top-pair|탑 페어}}를 {{t:fold}}하면 너무 많이 포기하게 됩니다. 4벳 후 상대에게는 AQ, QQ, JJ 등 내 핸드에 지는 핸드도 있습니다." }
      - { text: "작게 베팅하고 올인에는 {{t:fold|폴드합니다}}", why: "낮은 {{t:spr}}에서의 {{t:bet}} 후 {{t:fold}} 플랜입니다. {{t:bet|베팅}} 후에는 올인 가격이 더 좋아지고, {{t:fold}}는 이미 돈을 넣은 {{t:pot|팟}}을 포기하는 것입니다." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:spr}} 약 {{n:spr.commit}}에서 {{t:top-pair}}가 보통 스택 전부를 걸고 플레이하는 이유는 무엇입니까?"
    options:
      - { text: "올인에 약 {{n:eq.jam.spr2}}의 에퀴티가 필요하고, {{t:pot|팟}}의 약 {{n:geo.spr2.2}} 크기 {{t:bet|베팅}} 두 번으로 스택 전부가 들어가기 때문", correct: true, why: "맞습니다. 가격이 좋고, 스택을 넣는 데 {{t:value|밸류}} 두 스트리트면 충분합니다. {{t:top-pair}}는 보통 그 정도는 버팁니다. 기준값 자체는 휴리스틱입니다. 상대가 어떤 핸드로 플레이하는지도 중요합니다." }
      - { text: "{{t:top-pair}}는 항상 이기기 때문", why: "항상은 아닙니다. 상대가 {{t:two-pair}}나 셋을 가진 경우도 있습니다. 하지만 낮은 {{t:spr}}에서는 더 약한 핸드와 {{t:draw|드로}}도 충분한 돈을 넣고, 가격도 좋습니다." }
      - { text: "{{t:spr}} {{n:spr.commit}}에서는 규칙상 {{t:fold|폴드}}할 수 없기 때문", why: "{{t:fold|폴드}}는 언제든 할 수 있습니다. 요점은 {{t:fold}}가 보통 얻는 것보다 잃는 것이 많다는 점입니다. 올인에 약 {{n:eq.jam.spr2}}의 에퀴티만 있으면 됩니다." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "싱글 레이즈 {{t:pot|팟}}, 스택 {{n:format.stack}}, {{t:spr}} 약 {{n:spr.srp}}. 좋은 키커로 {{t:top-pair|탑 페어}}를 맞혔습니다. 이 핸드를 어떻게 다루겠습니까?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "밸류 핸드로 다루지만, 보통 스택 전부를 걸 핸드는 아닙니다", correct: true, why: "맞습니다. {{t:spr}} 약 {{n:spr.srp}}에서는 {{t:pot}}보다 큰 {{t:bet|베팅}}을 여러 번 해야 비로소 스택 전부가 들어갑니다. 그만큼 돈을 넣는 상대가 원 {{t:pair}}보다 약한 핸드를 가진 경우는 드뭅니다." }
      - { text: "{{t:top-pair}}가 강하니 스택 전부를 걸고 플레이합니다", why: "{{t:spr}} {{n:spr.commit}}에서라면 그렇지만, 여기서는 {{t:spr}}이 약 {{n:spr.srp}}입니다. {{t:pot|팟}}에 스택 전부가 들어가 있을 때 상대는 보통 {{t:two-pair}}, 셋 또는 더 높은 {{t:pair|페어}}를 가지고 있습니다." }
      - { text: "상대의 첫 {{t:bet}}에 {{t:fold|폴드합니다}}", why: "너무 소극적입니다. 좋은 키커의 {{t:top-pair}}는 이 플롭에서 강한 핸드입니다. 요점은 {{t:fold}}가 아니라, 이 핸드로 스택 전부가 걸린 {{t:pot|팟}}을 만들지 않는 것입니다." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "4벳 이후의 {{t:pot|팟}}, {{t:spr}} 약 {{n:spr.4bet}}. 잭 {{t:pair|페어}}를 들고 있고, 플롭에는 에이스와 킹이 있습니다. 상대가 올인합니다. ‘낮은 {{t:spr}}에서는 스택을 걸고 플레이한다’는 규칙은 어떻게 됩니까?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "이 핸드에는 해당하지 않습니다. {{t:board|보드}}의 높은 카드 두 장보다 낮은 {{t:pair}}이기 때문입니다", correct: true, why: "맞습니다. 이 규칙은 {{t:top-pair|탑 페어}} 이상의 핸드에 관한 것입니다. 4벳 후 상대는 에이스나 킹을 가진 경우가 많고, 내 잭은 높은 카드로 만든 모든 {{t:pair|페어}}에 집니다. 좋은 가격({{n:eq.jam.4bet}})에도 불구하고 여기서는 {{t:fold|폴드}}하는 경우가 더 많습니다." }
      - { text: "해당합니다. 낮은 {{t:spr}}에서는 무엇이든 {{t:call|콜합니다}}", why: "낮은 {{t:spr}}은 좋은 가격을 주지만, 약한 핸드를 강한 핸드로 바꾸지는 않습니다. 상대가 더 높은 {{t:pair|페어}}를 가진 경우가 많다면 {{n:eq.jam.4bet}}의 에퀴티조차 너무 많을 수 있습니다." }
      - { text: "해당하지만, {{t:position|포지션}}이 있을 때만입니다", why: "{{t:position|포지션}}은 어떤 핸드로 플레이하는지를 바꾸지 않습니다. 이 규칙은 {{t:top-pair|탑 페어}} 이상의 핸드에 적용됩니다." }
---
팟 커밋(영어: commitment)은 내 스택에 비해 {{t:pot|팟}}에 이미 돈이 너무 많이 들어가 있어서, 올인에 {{t:fold}}하는 것이 거의 절대 이득이 되지 않는 상황입니다. 이전 레슨의 {{t:spr}}은 플롭이 시작될 때 이미 이 상태에 얼마나 가까운지를 알려 줍니다.

## {{t:bet|베팅}} 후에는 가격이 더 좋아집니다

예: {{t:spr}} {{n:spr.commit}}, {{t:pot|팟}}은 {{n:ex.pot}}, 스택은 각각 {{n:commit.stack}}입니다. 상대가 바로 올인하면 {{n:eq.jam.spr2}}의 에퀴티가 필요합니다. 내가 먼저 베팅하면 필요한 에퀴티가 줄어듭니다.

| 상대의 올인 전 내 {{t:bet}} | 추가 금액 | 필요한 에퀴티 |
|---|---|---|
| 없음(상대가 바로 올인) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| {{t:pot|팟}}의 절반({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| {{t:pot|팟}} 전체({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## {{t:bet|베팅}} 후 {{t:fold|폴드}}를 계획하지 마세요

내 {{t:bet|베팅}} 후 스택에 남는 금액이 그 베팅이 {{t:call|콜}}된 뒤의 {{t:pot}}보다 적다면, {{t:bet}} 후 올인에 {{t:fold}}하는 것은 보통 의미가 없습니다. 이때 올인에 {{t:call|콜}}하는 데 필요한 에퀴티는 {{t:pot|팟}} 크기 {{t:bet|베팅}}에 {{t:call|콜}}하는 데 필요한 에퀴티({{n:eq.bet-pot}})보다 적기 때문입니다. 합리적인 길은 두 가지입니다. 스택 전부를 걸고 플레이하거나(베팅 또는 올인) {{t:check|체크}}하는 것입니다.

## 낮은 {{t:spr}}: {{t:top-pair}}는 스택을 걸고 플레이합니다

규칙: **플롭에서 {{t:spr}}이 약 {{n:spr.zone.low}}보다 낮으면 {{t:top-pair}} 이상의 핸드는 보통 스택 전부를 걸고 플레이합니다**(이전 레슨의 {{t:spr}} 구간). 예시의 {{t:spr}} {{n:spr.commit}}은 이 구간에 속하며, 이때의 계산이 규칙을 뒷받침합니다.

- 올인에는 최대 약 {{n:eq.jam.spr2}}의 에퀴티가 필요하고, 내가 먼저 {{t:bet|베팅}}했다면 더 적게 필요합니다.
- {{t:pot|팟}}의 약 {{n:geo.spr2.2}} 크기 {{t:bet|베팅}} 두 번으로 스택 전부가 들어갑니다. {{t:pot|팟}}이 {{n:ex.pot}}일 때 플롭에서 {{n:geo.spr2.flop}}, 턴에서 {{n:geo.spr2.turn}}, 합계 {{n:geo.spr2.total}}입니다.
- {{t:top-pair}}는 보통 {{t:value|밸류}} 두 스트리트를 버팁니다(세 {{t:street|스트리트}} 플랜에 관한 레슨).

하지만 계산이 정확한 기준값을 정해 주지는 않습니다. {{t:top-pair}}의 에퀴티가 충분한지는 상대가 어떤 핸드로 플레이하는지에 달려 있습니다. 그래서 이것은 엄격한 법칙이 아니라 휴리스틱입니다. 이 규칙은 {{t:top-pair|탑 페어}} 이상의 핸드에 적용됩니다. {{t:board|보드}}의 높은 카드보다 낮은 {{t:pair}}는 해당하지 않습니다.

## 높은 {{t:spr}}: 원 {{t:pair}}는 더 조심스럽게

싱글 레이즈 {{t:pot|팟}}에서 {{t:spr}}은 약 {{n:spr.srp}}입니다. 리버까지 스택 전부를 넣으려면 모든 {{t:street|스트리트}}에서 {{t:pot}}보다 크게 베팅해야 합니다(지오메트릭 사이즈에 관한 레슨). 그만큼 돈을 넣는 상대가 원 {{t:pair}}보다 약한 핸드를 가진 경우는 드뭅니다. 그래서 이런 {{t:pot|팟}}에서 원 {{t:pair|페어}}로는 밸류를 노리지만, 보통 스택 전부를 걸고 플레이할 계획은 세우지 않습니다.

:::note 이 원칙들의 출처
약 {{n:spr.zone.low}}라는 경계는 교육 자료와 공개된 솔버 분석에서 나온 것입니다({{t:spr}} 약 {{n:spr.commit}}에서는 모든 {{t:top-pair}} 이상의 핸드가 스택을 걸고 플레이합니다). 높은 {{t:spr}}에서 원 {{t:pair|페어}}를 조심스럽게 플레이해야 한다는 점은 교육 자료와 솔버 분석이 뒷받침합니다. 이 레슨의 가격과 사이즈 수치는 순수한 수학입니다.
:::
