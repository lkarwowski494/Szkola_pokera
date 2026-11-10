---
id: m6.l1
module: m6
order: 1
title: "MDF와 알파"
sub: "상대가 베팅할 때 얼마나 방어해야 할까"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "리버. {{t:pot|팟}}은 {{n:ex.third.pot}}입니다. 상대가 {{n:ex.third.bet}} {{t:bet|베팅}}합니다. 상대의 승산 없는 {{t:bluff|블러프}}가 자동으로 이익을 내지 못하게 하려면 {{t:range|레인지}}의 최소 몇 %를 방어해야({{t:call|콜}} 또는 {{t:raise|레이즈}}) 합니까? 숫자를 퍼센트로 입력하세요."
    answer: mdf.bet-third
    explanation: "{{t:mdf|MDF}} = {{t:pot|팟}} ÷ ({{t:pot|팟}} + 베팅) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. 상대는 {{n:ex.third.bet}}의 리스크로 {{n:ex.third.pot}} 획득을 노리므로, {{n:alpha.bet-third}}보다 자주 {{t:fold|폴드}}하면 상대의 {{t:bluff|블러프}}는 이익을 냅니다."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "리버. {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다: {{n:ex.bet.pot}}. {{t:mdf|MDF}}는 얼마입니까? 숫자를 퍼센트로 입력하세요."
    answer: mdf.bet-pot
    explanation: "{{t:mdf|MDF}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. {{t:pot|팟}} 크기의 베팅에서는 {{t:bluff|블러프}}가 얻을 수 있는 만큼을 걸기 때문에, 두 번에 한 번만 {{t:fold|폴드}}해도 블러프는 본전이 됩니다."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "리버. {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{t:pot|팟}}의 절반을 {{t:bet|베팅}}합니다: {{n:ex.bet.half}}. {{t:mdf|MDF}}는 얼마입니까?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. 승산 없는 {{t:bluff|블러프}}가 이익을 내지 못하게 하려면 {{t:range|레인지}}에서 이만큼을 방어합니다." }
      - { text: "{{n:alpha.bet-half}}", why: "이것은 알파입니다: 상대의 {{t:bluff|블러프}}가 얼마나 자주 성공해야 하는지를 나타냅니다. {{t:mdf|MDF}}는 전체에서 그 나머지, 즉 {{n:mdf.bet-half}}입니다." }
      - { text: "{{n:eq.bet-half}}", why: "이것은 한 핸드로 {{t:call|콜}}하는 데 필요한 에퀴티입니다(M2에서 배운 내용). {{t:mdf|MDF}}는 {{t:range|레인지}} 전체 중 어느 정도를 방어하는지를 알려 줍니다." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "리버. {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{t:pot|팟}}보다 많이 {{t:bet|베팅}}합니다: {{n:ex.bet.overbet}}. {{t:mdf|MDF}}는 얼마입니까?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. 베팅이 클수록 방어해야 하는 {{t:range|레인지}}의 비율은 작아집니다." }
      - { text: "{{n:alpha.bet-overbet}}", why: "이것은 알파입니다: {{n:ex.bet.overbet}}짜리 {{t:bluff|블러프}}가 이만큼 자주 성공해야 합니다. 방어하는 것은 나머지, 즉 {{n:mdf.bet-overbet}}입니다." }
      - { text: "{{n:eq.bet-overbet}}", why: "이것은 {{t:call|콜}}에 필요한 에퀴티입니다: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). 다른 숫자, 다른 질문입니다." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "리버. 승산 없는 핸드로 {{t:bluff|블러프}}합니다: {{t:pot|팟}}은 {{n:ex.pot}}, {{n:ex.bet.half}} {{t:bet|베팅}}합니다. {{t:bluff|블러프}}가 본전이 되려면 상대가 얼마나 자주 {{t:fold|폴드}}해야 합니까? 숫자를 퍼센트로 입력하세요."
    answer: alpha.bet-half
    explanation: "알파 = 베팅 ÷ ({{t:pot|팟}} + 베팅) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. {{n:ex.bet.half}}의 리스크로 {{n:ex.pot}} 획득을 노립니다: 상대가 이보다 자주 {{t:fold|폴드}}하면 {{t:bluff|블러프}}는 이익을 냅니다."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "리버. {{t:bluff|블러프}}합니다: {{t:pot|팟}}은 {{n:ex.pot}}, {{n:ex.bet.three-quarters}} {{t:bet|베팅}}합니다. {{t:bluff|블러프}}가 이익이 되려면 상대가 얼마나 자주 {{t:fold|폴드}}해야 합니까?"
    options:
      - { text: "{{n:alpha.bet-three-quarters}}보다 자주", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. 이것이 {{t:pot|팟}}의 3/4 베팅에 대한 알파입니다." }
      - { text: "{{n:mdf.bet-three-quarters}}보다 자주", why: "이것은 {{t:mdf|MDF}}, 즉 상대가 방어해야 하는 비율입니다. 알파는 {{t:bluff|블러프}}가 이익을 내기 시작하기 전까지 상대가 {{t:fold|폴드}}할 수 있는 비율입니다: {{n:alpha.bet-three-quarters}}." }
      - { text: "{{n:eq.bet-three-quarters}}보다 자주", why: "이것은 상대가 {{t:call|콜}}하는 데 필요한 에퀴티입니다. {{t:bluff|블러프}}의 기준은 분모에 상대의 {{t:call|콜}}을 넣지 않고 계산합니다: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "{{t:pot|팟}}은 {{n:ex.pot}}입니다. 승산 없는 {{t:bluff|블러프}}에서 상대가 더 드물게 {{t:fold|폴드}}해도 되는 쪽은 어느 것입니까: {{n:ex.bet.quarter}} 베팅입니까, {{n:ex.bet.pot}} 베팅입니까?"
    options:
      - { text: "{{n:ex.bet.quarter}}: {{t:fold|폴드}} 비율 {{n:alpha.bet-quarter}} 초과면 충분", correct: true, why: "작은 {{t:bluff|블러프}}는 리스크가 작습니다: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. {{t:pot|팟}} 전체를 거는 {{t:bluff|블러프}}는 {{t:fold|폴드}} 비율이 {{n:alpha.bet-pot}} 초과여야 합니다." }
      - { text: "{{n:ex.bet.pot}}: {{t:fold|폴드}} 비율 {{n:alpha.bet-quarter}} 초과면 충분", why: "반대입니다. 베팅이 클수록 리스크도 크므로 상대가 더 자주 {{t:fold|폴드}}해야 합니다: {{t:pot|팟}} 전체라면 {{n:alpha.bet-pot}} 초과입니다." }
      - { text: "둘 다 같습니다", why: "알파는 크기에 따라 달라집니다: {{n:ex.bet.quarter}}에서는 {{n:alpha.bet-quarter}}, {{n:ex.bet.pot}}에서는 {{n:alpha.bet-pot}}입니다." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "리버, 상대가 {{t:pot|팟}}의 1/3을 {{t:bet|베팅}}합니다. {{t:mdf|MDF}}는 {{n:mdf.bet-third}}입니다. 그리고 {{t:call|콜}}하려면 에퀴티가 {{n:eq.bet-third}} 필요합니다. 이 두 숫자를 어떻게 함께 이해해야 합니까?"
    options:
      - { text: "{{t:mdf|MDF}}는 {{t:range|레인지}} 전체에, 에퀴티는 한 핸드에 적용됩니다", correct: true, why: "{{t:mdf|MDF}}는 상대가 아무 카드로나 {{t:bluff|블러프}}할 수 없도록 전체 핸드 중 어느 정도를 방어할지를 알려 줍니다. 필요 에퀴티는 상대가 실제로 {{t:bet|베팅}}하는 핸드를 상대로 특정 핸드의 {{t:call|콜}}이 이익인지를 알려 줍니다." }
      - { text: "둘 중 하나가 잘못 계산되었습니다", why: "둘 다 맞습니다: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}, {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. 서로 다른 질문에 답합니다." }
      - { text: "에퀴티가 {{n:mdf.bet-third}} 이상일 때 {{t:call|콜}}합니다", why: "개념을 혼동했습니다. {{t:call|콜}}에는 에퀴티 {{n:eq.bet-third}}면 충분합니다. {{n:mdf.bet-third}}는 {{t:range|레인지}}의 비율이지, 한 핸드의 승률이 아닙니다." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "플롭. {{t:big-blind|빅 블라인드}}를 방어하는 중이고, 버튼이 {{t:pot|팟}}의 1/3 크기 C벳을 {{t:bet|베팅}}합니다. {{t:mdf|MDF}}는 {{n:mdf.bet-third}}입니다. 그만큼 많은 핸드를 꼭 방어해야 합니까?"
    table: { position: BB }
    options:
      - { text: "아니요, 조금 덜 방어해도 됩니다", correct: true, why: "{{t:mdf|MDF}}는 승산이 전혀 없는 {{t:bluff|블러프}}를 전제로 합니다. 플롭에서 버튼의 {{t:bluff|블러프}}에는 아직 에퀴티가 있고({{t:draw|드로우}}, 높은 카드), {{t:out-of-position|아웃 오브 포지션}}에서는 약한 핸드의 에퀴티를 모두 실현하지 못합니다. 그래서 {{t:mdf|MDF}}보다 조금 덜 방어해도 되지만, 작은 C벳에 대량으로 {{t:fold|폴드}}하지는 않습니다." }
      - { text: "네, 그렇지 않으면 버튼이 어떤 핸드로든 이익을 냅니다", why: "리버라면 그렇습니다. 플롭에서 버튼은 승산 없는 핸드로 {{t:bluff|블러프}}하는 것이 아닙니다: {{t:call|콜}}을 받아도 맞출 수 있습니다. {{t:mdf|MDF}}는 기준점이지 의무가 아닙니다." }
      - { text: "아니요, 아직 플롭이니 더 많이 방어합니다", why: "반대입니다. 남은 {{t:street|스트리트}}는 {{t:in-position|인 포지션}}에서 베팅한 쪽에 유리하므로, 더 많이가 아니라 더 적게 방어합니다." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "여러 이전 핸드를 통해 {{t:bluff|블러프}}를 거의 하지 않는다고 알고 있는 플레이어가 리버에서 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다. 약한 키커의 킹 {{t:pair|페어}}를 가지고 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "여러 이전 핸드를 통해 이 플레이어가 {{t:bluff|블러프}}를 거의 하지 않는다는 것을 알고 있습니다. {{t:bluff|블러프}}가 부족하면 내 {{t:pair|페어}}는 주로 더 좋은 핸드(KQ, 셋)에 돈을 내주게 됩니다. 이런 플레이어를 상대로는 {{t:mdf|MDF}}가 가리키는 것보다 더 자주 {{t:fold|폴드}}합니다." }
      - { text: "{{t:call|콜}}합니다. {{t:mdf|MDF}}에 따르면 {{n:mdf.bet-pot}}를 방어해야 하니까요", why: "{{t:mdf|MDF}}는 충분히 자주 {{t:bluff|블러프}}하는 플레이어로부터 나를 보호합니다. 이 플레이어는 그렇지 않으므로, {{t:mdf|MDF}}를 고수하면 그에게 돈을 내주게 됩니다." }
      - { text: "올인으로 {{t:raise|레이즈}}합니다", why: "더 좋은 핸드는 돈을 내고, 더 나쁜 핸드는 {{t:fold|폴드}}합니다. 약한 키커의 {{t:pair|페어}}는 {{t:raise|레이즈}}할 핸드가 아닙니다." }
---
상대가 {{t:bet|베팅}}하면 “이 핸드가 이길 수 있을까?”만 묻지 않습니다. 이 상황에서 가질 수 있는 모든 핸드, 즉 자신의 {{t:range|레인지}}도 봅니다. 두 숫자가 그중 얼마를 방어할지, 그리고 상대의 {{t:bluff|블러프}}가 얼마나 자주 성공해야 하는지 알려 줍니다.

## 알파: {{t:bluff|블러프}}는 얼마나 자주 성공해야 하는가

승산 없는 {{t:bluff|블러프}}는 상대가 {{t:fold|폴드}}할 때만 이깁니다. 베팅액을 걸고 {{t:pot|팟}}을 노립니다.

```formula
알파 = 베팅 ÷ (팟 + 베팅)
```

예: {{t:pot|팟}}은 {{n:ex.pot}}, {{n:ex.bet.half}} {{t:bet|베팅}}합니다. 알파 = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. 상대가 이보다 자주 {{t:fold|폴드}}하면, 핸드가 전혀 없어도 {{t:bluff|블러프}}는 이익을 냅니다.

## {{t:mdf|MDF}}: 얼마나 방어해야 하는가

{{t:mdf|MDF}}(최소 방어 빈도)는 알파의 이면입니다. 이보다 적은 핸드를 방어하면({{t:call|콜}} 또는 {{t:raise|레이즈}}), 상대는 아무 카드로나 {{t:bluff|블러프}}해서 이익을 냅니다.

```formula
MDF = 팟 ÷ (팟 + 베팅)
```

리버 예: {{t:pot|팟}}은 {{n:ex.third.pot}}, 상대가 {{n:ex.third.bet}}, 즉 {{t:pot|팟}}의 1/3을 {{t:bet|베팅}}합니다. {{t:mdf|MDF}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| 상대의 베팅 | {{t:mdf|MDF}} | 알파 | 필요 에퀴티 |
|---|---|---|---|
| {{t:pot|팟}}의 1/4 | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| {{t:pot|팟}}의 1/3 | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| {{t:pot|팟}}의 1/2 | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| {{t:pot|팟}}의 3/4 | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| {{t:pot|팟}} 전체 | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf|MDF}}는 필요 에퀴티가 아닙니다

M2의 필요 에퀴티는 **한 핸드**에 관한 것입니다: 그 핸드로 {{t:call|콜}}하는 것이 이익인지를 봅니다. {{t:mdf|MDF}}는 **{{t:range|레인지}} 전체**에 관한 것입니다: 그중 얼마를 방어하는지를 봅니다. 리버에서 {{t:pot|팟}}의 1/3 베팅을 받으면 {{t:mdf|MDF}}는 핸드의 약 {{n:mdf.bet-third}}를 방어하라고 알려 주고, 개별 {{t:call|콜}}은 그 핸드가 적어도 {{n:eq.bet-third}}의 확률로 이길 때 이익입니다.

## 플롭에서 {{t:out-of-position|아웃 오브 포지션}}이면 덜 방어합니다

{{t:mdf|MDF}}는 상대의 {{t:bluff|블러프}}에 승산이 전혀 없다고 전제합니다. 이것이 사실에 가장 가까운 곳은 {{t:draw|드로우}}가 더 이상 개선되지 않는 리버입니다. 플롭에서는 {{t:bluff|블러프}}에 아직 에퀴티가 있습니다: {{t:draw|드로우}}와 높은 카드는 개선될 수 있습니다. 게다가 {{t:out-of-position|아웃 오브 포지션}}에서는 약한 핸드의 에퀴티를 모두 실현하지 못합니다. 그래서 플롭에서 {{t:out-of-position|아웃 오브 포지션}}이라면 {{t:mdf|MDF}}보다 적게 방어해도 되고(수비 측에 불리한 플롭에서는 확실히 더 적게), 이를 의무가 아닌 기준점으로 삼습니다. 그렇다고 작은 C벳에 대량으로 {{t:fold|폴드}}하지는 않습니다. 한 턴 예시에서 솔버는 평균적으로 {{t:mdf|MDF}}에 가깝게 방어했습니다.

:::note 상대가 {{t:bluff|블러프}}를 거의 하지 않을 때
{{t:mdf|MDF}}는 충분히 자주 {{t:bluff|블러프}}하는 플레이어로부터 나를 보호합니다. 관찰을 통해 특정 플레이어가 리버의 큰 베팅으로 {{t:bluff|블러프}}하는 일이 너무 드물다는 것을 알고 있다면, 그 플레이어를 상대로는 {{t:mdf|MDF}}가 가리키는 것보다 더 자주 {{t:fold|폴드}}합니다: 약한 {{t:pair|페어}}로 {{t:call|콜}}하면 주로 더 좋은 핸드에 돈을 내주게 됩니다. 이것은 {{t:exploit|익스플로잇}}이지, 모든 상대에게 쓰는 전략이 아닙니다(자세한 내용은 모듈 10에서).
:::
