---
id: m10.l4
module: m10
order: 4
title: "레이크"
sub: "플레이 비용은 얼마이고 결정에 무엇이 달라지는가"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "대형 온라인 사이트 중 한 곳에서 NL10 6-max를 플레이합니다. 낮은 {{t:stakes|스테이크}}에서 이기는 평범한 플레이어의 윈레이트와 비교하면 {{t:rake}}는 얼마나 큽니까?"
    options:
      - { text: "몇 배 큽니다: 약 {{n:rake.micro.low}}–{{n:rake.micro.high}} 대 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "사이트들의 레이크 요금표를 bb/100으로 환산하면 마이크로 스테이크에서 약 {{n:rake.micro.low}}–{{n:rake.micro.high}}가 나옵니다. 이기는 플레이어는 상대들을 {{t:rake}}보다 더 큰 차이로 이겨야 하며, 그 초과분만이 윈레이트가 됩니다." }
      - { text: "거의 같습니다", why: "마이크로 스테이크의 {{t:rake}}는 약 {{n:rake.micro.low}}–{{n:rake.micro.high}}이고, 평범한 윈레이트는 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}입니다. 차이는 몇 배입니다." }
      - { text: "무시할 만큼 작습니다. 사이트가 {{t:pot|팟}}의 몇 퍼센트만 가져가기 때문입니다", why: "플롭 이후 모든 {{t:pot|팟}}에서 가져가는 몇 퍼센트가 모이면 약 {{n:rake.micro.low}}–{{n:rake.micro.high}}가 됩니다. 이는 이기는 평범한 플레이어가 버는 것보다 많습니다." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "6-max 캐시 게임 플레이어 집단에 관한 보고서에서 NL100의 모든 플레이어는 평균 {{n:rake.pop.nl100.loss}}의 손실을 봅니다. 이 손실은 어디서 옵니까?"
    options:
      - { text: "{{t:rake}}입니다: 레이크가 없다면 플레이어 전체로는 손익이 0이 됩니다", correct: true, why: "플레이어들은 서로를 상대로 플레이하므로 한 사람이 따는 만큼 다른 사람이 잃습니다. 평균적으로 모두가 잃는 것은 사이트가 가져가는 몫뿐입니다. 저자: ‘your biggest villain is the house’." }
      - { text: "대부분의 플레이어가 서투르게 플레이하기 때문입니다", why: "서투른 플레이는 약한 플레이어에게서 더 나은 플레이어에게로 돈을 옮길 뿐 평균은 바꾸지 않습니다. 평균을 낮추는 것은 {{t:rake}}뿐입니다." }
      - { text: "{{t:variance|분산}} 때문입니다: 표본이 더 커지면 0이 됩니다", why: "{{t:variance|분산}}, 즉 {{t:expected-value|기댓값}}을 중심으로 결과가 흩어지는 정도는 개별 플레이어의 결과에 양방향으로 작용합니다. 전체 집단의 평균이 음수인 것은 모두가 {{t:rake}}를 내기 때문입니다." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "같은 데이터를 다룬 저자의 추정(베이즈 보정 적용)에 따르면, {{n:rake.pop.reg.hands}} 핸드 이상 플레이한 플레이어 중 약 {{n:rake.pop.reg.prerake}}가 {{t:rake|레이크}} 공제 전에 이깁니다. 공제 후에는 얼마나 이깁니까?"
    options:
      - { text: "약 {{n:rake.pop.reg.postrake}}", correct: true, why: "{{t:rake}}는 이기는 플레이어의 거의 절반을 없앱니다: 레이크 전 약 {{n:rake.pop.reg.prerake}}, 레이크 후 약 {{n:rake.pop.reg.postrake}}. 그래서 윈레이트는 항상 레이크를 뺀 뒤 계산합니다." }
      - { text: "거의 같습니다. 약 {{n:rake.pop.reg.prerake}}", why: "{{t:rake}}가 작다면 그렇겠지요. 레이크가 몇 bb/100이면 레이크 전에 이기던 많은 플레이어가 0 아래로 내려갑니다." }
      - { text: "거의 아무도 없습니다", why: "과장입니다: 이 그룹의 약 {{n:rake.pop.reg.postrake}}는 여전히 이깁니다. {{t:rake}}는 큰 장애물이지만 이기는 길을 막지는 않습니다." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "NL500에서 bb/100 기준 {{t:rake}}가 마이크로 스테이크보다 몇 배 작은({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) 이유는 무엇입니까?"
    options:
      - { text: "더 큰 {{t:pot|팟}}이 {{t:rake-cap|레이크 캡}}에 더 자주 도달하는데, 그곳에서는 그 상한이 bb로 환산하면 작기 때문입니다", correct: true, why: "사이트는 {{t:pot|팟}}의 일정 비율을 가져가지만 달러로 정한 상한을 넘지는 않습니다. 마이크로 스테이크에서는 상한이 여러 bb에 해당해 {{t:pot|팟}}이 거기까지 가는 일이 드물므로 비율 전체를 냅니다. NL500에서는 같은 상한이 1bb의 일부에 불과합니다." }
      - { text: "NL500에서는 사이트가 더 작은 비율을 가져가기 때문입니다", why: "비율은 비슷한 경우가 많습니다(약 {{n:rake.ex.pct}}). 차이를 만드는 것은 {{t:rake-cap|레이크 캡}}으로, 높은 {{t:stakes|스테이크}}에서는 이것이 큰 {{t:pot|팟}}의 수수료를 잘라 냅니다." }
      - { text: "NL500에서는 시간당 플레이하는 핸드가 더 적기 때문입니다", why: "bb/100은 100핸드당 {{t:rake}}를 계산하므로 게임 속도로는 달라지지 않습니다. 이를 바꾸는 것은 bb로 표현한 {{t:rake-cap|레이크 캡}}입니다." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "{{t:pot|팟}}은 {{n:ex.pot}}이고, 상대가 {{n:ex.bet.half}} {{t:bet|베팅합니다}}. 사이트는 {{t:pot|팟}}의 {{n:rake.ex.pct}}를 가져가며, 도달할 만한 {{t:rake-cap|레이크 캡}}은 없습니다. {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까? 퍼센트로 입력하세요."
    answer: eq.bet-half.rake
    explanation: "{{t:call|콜}}하면 {{t:pot|팟}}은 {{n:ex.half.total}}이고, 레이크를 뺀 뒤 남는 금액은 {{n:rake.ex.pot-after}}입니다. 추가로 내는 금액은 {{n:ex.bet.half}}이므로, 레이크가 없을 때의 {{n:eq.bet-half}} 대신 {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}}가 필요합니다."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "{{t:rake|레이크}}가 없으면 하프 {{t:pot|팟}} 베팅에 {{t:call}}하는 데 {{n:eq.bet-half}}의 에퀴티가 필요합니다. {{t:rake|레이크}}가 {{n:rake.ex.pct}}일 때는 얼마가 필요합니까?"
    options:
      - { text: "조금 더 필요합니다: 약 {{n:eq.bet-half.rake}}", correct: true, why: "{{t:rake}}를 뺀 {{t:pot|팟}}을 가져가지만, 추가 금액은 전부 냅니다. 레이크가 없을 때 기준선 바로 위에 있던 핸드가 레이크가 있으면 이미 기준선 아래일 수 있습니다." }
      - { text: "같습니다. 두 플레이어 모두 {{t:rake}}를 내기 때문입니다", why: "{{t:rake}}는 이기는 {{t:pot|팟}}에서 빠지는 것이지, 추가로 내는 금액에서 빠지는 것이 아닙니다. 기준선은 약 {{n:eq.bet-half.rake}}로 올라갑니다." }
      - { text: "더 적게 필요합니다. {{t:pot}}이 더 크기 때문입니다", why: "레이크를 뺀 {{t:pot}}은 커지는 것이 아니라 작아지므로 에퀴티가 더 필요합니다: 약 {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "플롭까지 가는 {{t:pot|팟}}에서만 {{t:rake}}를 가져가는 사이트에서 플레이합니다. 앞에서 누군가 {{t:open|오픈}}했고, 레이크가 없다면 {{t:call|콜}}할지 말지 경계에 있을 핸드를 들고 {{t:position|포지션}}에 있습니다. {{t:rake}}는 무엇을 바꿉니까?"
    options:
      - { text: "{{t:call|콜}}을 덜 합니다: {{t:call|콜}} 경계에 있는 핸드는 더 자주 {{t:fold|폴드}}하거나 3벳합니다", correct: true, why: "레이크를 반영해 공개된 솔버 솔루션에서 {{t:open|오픈}}을 마주한 {{t:position|포지션}}의 플레이어는 약 {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} 더 적은 핸드를 플레이합니다. 손해를 보는 것은 {{t:call|콜}} 자체입니다. 플롭 이후의 {{t:pot}}은 {{t:rake}}를 내지만, 플롭 전에 3벳으로 이긴 {{t:pot}}은 내지 않기 때문입니다." }
      - { text: "아무것도 바뀌지 않습니다: {{t:rake}}는 플롭 이후 플레이에만 해당합니다", why: "바로 그래서 플롭 전 결정이 바뀝니다: {{t:call|콜}}은 플롭과 레이크로 이어지지만, 3벳이나 {{t:fold}}는 레이크 없이 핸드를 끝내는 경우가 많습니다." }
      - { text: "{{t:call|콜}}을 더 자주 합니다. 플롭 이후 {{t:pot|팟}}이 크기 때문입니다", why: "반대입니다: {{t:rake}}는 바로 그런 {{t:pot|팟}}의 일부를 가져갑니다. 레이크를 반영한 솔버는 {{t:call|콜}}을 눈에 띄게 덜 합니다." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "같은 솔버 솔루션에서 레이크가 있는 게임의 {{t:big-blind}}는 민레이즈에 대해, 레이크가 없을 때 {{t:call|콜}}하는 경우의 약 {{n:rake.solver.bb-minraise}}에서만 {{t:call|콜}}합니다. {{t:big-blind|빅 블라인드}}에 있는 당신에게 이것은 무엇을 의미합니까?"
    options:
      - { text: "여전히 많은 핸드를 방어하지만, 레이크 없이 계산한 표보다는 좁게 방어합니다", correct: true, why: "{{t:big-blind}}는 이미 {{t:pot|팟}}에 {{t:chips|칩}}을 넣었고 액션을 마무리하므로 여전히 자주 방어합니다. 하지만 {{t:rake}}가 가장 약한 {{t:call|콜}}을 잘라 내므로 레이크 없는 표는 당신에게 너무 넓습니다." }
      - { text: "{{t:big-blind|빅 블라인드}}를 {{t:call|콜}}로 방어하는 것을 그만둡니다", why: "아닙니다: 저자에 따르면 블라인드에서의 {{t:call|콜}}은 레이크가 있어도 전략의 중요한 부분으로 남습니다. 바뀌는 것은 방어의 폭이지, 방어를 하느냐 마느냐가 아닙니다." }
      - { text: "똑같이 넓게 방어합니다. {{t:big-blind|빅 블라인드}}에서는 {{t:rake}}가 상관없기 때문입니다", why: "상관있습니다: {{t:call|콜}} 후의 {{t:pot}}은 플롭까지 가서 {{t:rake}}를 냅니다. 그래서 솔버는 {{t:big-blind|빅 블라인드}}에서 {{t:call|콜}}을 덜 합니다." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "일부 사이트에서는 플롭 전에 끝나는 3벳 {{t:pot|팟}}에서도 {{t:rake}}를 가져갑니다. 이것은 ‘3벳은 레이크를 내지 않는다’는 논거에 무엇을 바꿉니까?"
    options:
      - { text: "그런 사이트에서는 이 논거가 약해집니다: 3벳도 레이크를 내므로 {{t:call|콜}}에 대한 3벳의 이점이 작아집니다", correct: true, why: "솔버 결과는 플롭 없이 끝난 {{t:pot}}에 레이크가 붙지 않는 ‘no flop, no drop’ 구조에 해당합니다. 그런 사이트에서는 이 규칙이 3벳 없는 {{t:pot|팟}}에만 적용되므로, {{t:call|콜}}은 여전히 레이크로 손해를 보지만 3벳도 레이크에서 자유롭지 않습니다." }
      - { text: "아무것도 바뀌지 않습니다. 3벳에서 떼는 {{t:rake}}는 무시할 만하기 때문입니다", why: "특정 사이트에 대해 계산해 보지 않고는 알 수 없습니다. 확실한 것은 3벳이 더 이상 레이크에서 자유롭지 않다는 것뿐입니다." }
      - { text: "그런 사이트에서는 항상 3벳 대신 {{t:call|콜}}해야 합니다", why: "{{t:call|콜}}은 전과 똑같이 플롭으로 이어지고 {{t:rake}}를 냅니다. 바뀌는 것은 3벳도 레이크를 낸다는 점뿐입니다." }
---
{{t:rake}}는 사이트가 {{t:pot|팟}}에서 떼어 가는 수수료입니다. 플레이어들은 서로를 상대로 플레이하므로, {{t:rake}}가 없다면 전체로는 손익이 0이 됩니다. 레이크가 있으면 평균적인 플레이어는 사이트가 가져가는 만큼 정확히 잃고, 이기는 플레이어는 상대들을 {{t:rake}}보다 더 큰 차이로 이겨야 합니다.

## 비용은 얼마인가

사이트는 {{t:pot|팟}}의 일정 비율을 가져가지만, 달러로 정한 {{t:rake-cap|레이크 캡}}을 넘지는 않습니다. 가장 큰 두 온라인 사이트에서 NL2–NL10은 {{t:pot|팟}}의 {{n:rake.ex.pct}}입니다. 마이크로 스테이크에서는 {{t:pot|팟}}이 상한에 도달하는 일이 드물어 비율 전체를 냅니다.

사이트 레이크 요금표 비교 자료는 수백만 핸드의 {{t:pot|팟}} 분포를 바탕으로 요금표를 bb/100으로 환산합니다:

| {{t:stakes|스테이크}} (6-max, 가장 큰 두 온라인 사이트) | {{t:rake}} |
|---|---|
| NL2–NL25 | 약 {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | 약 {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

낮은 {{t:stakes|스테이크}}에서 이기는 평범한 플레이어의 윈레이트는 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}입니다(모듈 12). 사이트에 내는 금액보다 몇 배 적습니다. 더 높은 {{t:stakes|스테이크}}에서는 같은 달러 상한이 1bb의 일부에 불과하므로 bb/100 기준 {{t:rake}}가 줄어듭니다.

플레이어 집단 데이터도 같은 사실을 보여 줍니다. 집단 보고서(6-max 캐시, NL10–NL500)에서 모든 플레이어는 평균적으로 NL10에서 {{n:rake.pop.nl10.loss}}, NL100에서 {{n:rake.pop.nl100.loss}}, NL500에서 {{n:rake.pop.nl500.loss}}의 손실을 봅니다. {{n:rake.pop.reg.hands}} 핸드 이상 플레이한 NL100 플레이어 중, 저자의 추정(베이즈 보정)에 따르면 레이크 공제 전에는 약 {{n:rake.pop.reg.prerake}}가 이기고, 공제 후에는 약 {{n:rake.pop.reg.postrake}}가 이깁니다(원자료로는 {{n:rake.pop.reg.prerake.raw}}와 {{n:rake.pop.reg.postrake.raw}}).

## 레이크가 있을 때의 {{t:call|콜}} 기준선

{{t:rake}}를 뺀 {{t:pot|팟}}을 가져가지만, 추가 금액은 전부 냅니다. 모듈 2에서 배운 필요 에퀴티가 올라갑니다:

```formula
필요 에퀴티 = 추가 금액 ÷ ({{t:call|콜}} 후 {{t:pot}} × (1 − {{t:rake}}))
```

{{n:ex.pot}} {{t:pot|팟}}에 {{n:ex.bet.half}} 베팅: 레이크가 없으면 {{n:eq.bet-half}}, 레이크가 {{n:rake.ex.pct}}이면 {{n:eq.bet-half.rake}}가 필요합니다. 한 핸드에서는 차이가 작지만, 플롭 이후의 모든 {{t:pot|팟}}에 적용됩니다.

## {{t:rake}}가 플롭 전에 바꾸는 것

많은 사이트에서는 플롭까지 가는 {{t:pot|팟}}에서만 {{t:rake}}를 가져갑니다(‘no flop, no drop’). 이 경우 플롭 전에 이긴 {{t:pot}}에는 레이크가 붙지 않고, {{t:call|콜}} 후의 {{t:pot}}은 레이크를 냅니다. 레이크를 반영해 공개된 NL100 솔버 솔루션에서는:

- {{t:open|오픈}}을 마주한 {{t:position|포지션}}의 플레이어가 약 {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} 더 적은 핸드를 플레이합니다. 주로 {{t:call|콜}}이 줄고, 3벳은 조금 늘어납니다.
- {{t:big-blind}}는 민레이즈에 대해 레이크가 없을 때의 약 {{n:rake.solver.bb-minraise}}에서만 {{t:call|콜}}합니다. 그래도 블라인드 방어는 여전히 {{t:call|콜}}을 바탕으로 합니다.

같은 이유로 모듈 3에서 {{t:small-blind|스몰 블라인드}}에서는 {{t:big-blind|빅 블라인드}}까지 채워 넣지 않고 {{t:raise|레이즈}}하거나 {{t:fold|폴드}}합니다. 일부 사이트는 플롭 전에 끝나는 3벳 {{t:pot|팟}}에서도 {{t:rake}}를 가져갑니다. 그런 곳에서는 3벳도 레이크에서 자유롭지 않습니다.

:::note 출처
레이크 수준: 2026년 온라인 사이트 레이크 비교 자료(가장 큰 두 사이트의 요금표를 bb/100으로 환산, 2026년 10월 5일 확인). 다른 사이트는 수치가 다릅니다. 집단 손실: 독립적인 플레이어 집단 보고서(6-max NLHE 캐시, 핸드 추적 데이터베이스가 있는 사이트, 100핸드 이상 플레이한 플레이어. 저자는 사이트와 기간을 밝히지 않음). 레이크가 플롭 전 플레이에 미치는 영향: 플롭 전 레이즈 크기에 관해 공개된 글, {{n:rake.solver.depth}} 스택 솔버 솔루션. 저자는 결론이 다른 형식에도 대체로 적용된다고 쓰므로, {{n:format.stack}} 스택에 대해서는 단순화입니다. 에퀴티 기준선은 계산 결과입니다.
:::
