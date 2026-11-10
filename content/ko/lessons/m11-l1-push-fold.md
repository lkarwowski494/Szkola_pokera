---
id: m11.l1
module: m11
order: 1
title: "숏 스택: 올인 아니면 폴드"
sub: "레이즈가 올인으로 바뀌는 순간"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|토너먼트}}입니다. {{n:m11.depth.10}} 스택을 가지고 있고, 앞의 모든 플레이어가 {{t:fold|폴드}}했습니다. 단순하면서 자료로 검증된 게임 플랜은 무엇일까요?"
    options:
      - { text: "올인 아니면 {{t:fold}}", correct: true, why: "약 {{n:m11.thr.pushfold}} 이하에서는 자료들이 한목소리로 푸시/폴드를 권합니다. 레이즈했다가 {{t:raise|레이즈}}를 받고 {{t:fold|폴드}}하면 스택을 너무 많이 내주게 되지만, 올인은 상대에게서 가장 많은 {{t:fold|폴드}}를 끌어냅니다." }
      - { text: "{{n:pf.open-size}}까지 레이즈하고, {{t:raise|레이즈}}를 받으면 그때 결정", why: "그렇게 레이즈하면 {{t:pot|팟}} 뒤에 남는 칩이 거의 없어서, 올인 {{t:raise|레이즈}}를 받으면 어차피 거의 {{t:call|콜}}할 수밖에 없습니다. 상대는 {{t:fold|폴드}}할 필요가 없고, 폴드 에퀴티도 잃게 됩니다." }
      - { text: "블라인드만큼 {{t:call|콜}}하고(림프) 플롭을 봅니다", why: "림프로는 {{t:pot|팟}}을 바로 가져갈 기회가 없습니다. 모든 액션을 고를 수 있는 솔버는 가끔 림프하지만, 이는 숙련자용 전략입니다. 단순하고 안전한 플랜은 올인 아니면 {{t:fold}}입니다." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "스택이 {{n:m11.thr.raise}} 이상이고 첫 번째로 {{t:open|오픈}}합니다. 플레이하고 싶은 핸드라면 어떻게 하나요?"
    options:
      - { text: "보통 레이즈합니다(예: 미니멈 레이즈)", correct: true, why: "약 {{n:m11.thr.raise}} 초과에서는 자료들이 일반적인 레이즈를 권합니다. 아직 {{t:raise}}에 {{t:fold|폴드}}하거나 플롭 이후에 플레이할 여유가 있습니다." }
      - { text: "항상 올인", why: "이렇게 큰 스택으로 올인하면 블라인드만 얻으려고 큰 위험을 집니다. 약한 핸드는 {{t:fold|폴드}}하고, 더 강한 핸드만 돈을 내고 따라옵니다." }
      - { text: "{{n:m11.thr.pushfold}} 때처럼 푸시/폴드", why: "푸시/폴드는 {{t:short-stack|숏 스택}}을 위한 도구입니다. 약 {{n:m11.thr.pushfold}}까지, 약한 핸드라면 약 {{n:m11.thr.upper}}까지입니다." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "{{n:m11.m.stack}} {{t:chips|칩}}을 가지고 있습니다. 블라인드는 {{n:m11.m.sb}}/{{n:m11.m.bb}}이고, {{t:big-blind}}는 앤티로 {{n:m11.m.ante}}만큼 더 냅니다. M은 얼마입니까?"
    answer: m11.m.value
    explanation: "M = 스택 ÷ ({{t:small-blind}} + {{t:big-blind}} + 앤티) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. 플레이하지 않고 버틸 수 있는 오빗 수입니다. {{t:big-blind|빅 블라인드}} 기준으로는 {{n:m11.m.bbs}}에 해당하지만, M은 앤티까지 계산합니다."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "M이 약 {{n:m11.m.example}}까지 떨어졌습니다. M 존 모델은 이를 어떻게 설명하나요?"
    options:
      - { text: "{{t:red-zone|레드 존}}: 올인 아니면 {{t:fold}}만, 가능하면 첫 번째로", correct: true, why: "M 약 {{n:m11.m.red}} 이하에서는 올인 아니면 {{t:fold}}만 남습니다. 먼저 들어가면 모두가 {{t:fold|폴드}}할 가능성이 생깁니다." }
      - { text: "{{t:green-zone|그린 존}}: 평소대로 플레이", why: "스택으로 자유롭게 플레이할 수 있는 {{t:green-zone|그린 존}}은 M 약 {{n:m11.m.green}}부터 시작됩니다. M 약 {{n:m11.m.example}}에서는 스택이 {{n:m11.m.example}} 오빗 분량입니다." }
      - { text: "어차피 시간이 있으니 에이스를 기다립니다", why: "M 약 {{n:m11.m.example}}에서는 강한 핸드를 기다리는 동안 블라인드가 스택을 먹어 치웁니다. 더 넓은 {{t:range|레인지}}로 올인해야 합니다." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "{{t:small-blind|스몰 블라인드}}에서 {{n:m11.depth.10}} 스택이고, 모두 {{t:fold|폴드}}했습니다. 올인할 핸드를 칠하세요."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|스몰 블라인드}}, 모두 {{t:fold|폴드}}했고 K2o를 들고 있습니다. {{n:m11.depth.10}}에서는 솔버가 이 핸드로 올인합니다. {{n:m11.depth.15}}에서는 어떨까요?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|폴드}}", correct: true, why: "{{n:m11.depth.15}}에서는 블라인드 대비 더 많은 위험을 지므로, 올인 {{t:range}}가 약 {{n:m11.push.10}}에서 약 {{n:m11.push.15}} 핸드로 좁아집니다. K2o는 여기서 빠집니다." }
      - { text: "올인, 킹은 강한 카드니까", why: "{{n:m11.depth.15}}에서 K2o는 {{t:call|콜}} {{t:range}}에 있는 더 좋은 킹이나 에이스를 너무 자주 만납니다. 솔버는 이 핸드를 {{t:fold|폴드}}합니다." }
      - { text: "올인, 스택이 깊을수록 넓게 치니까", why: "반대입니다. 스택이 깊을수록 올인 {{t:range}}는 좁아집니다. 가장 넓게 {{t:shove|푸시}}하는 것은 {{t:short-stack|숏 스택}}이 아주 짧을 때입니다." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|스몰 블라인드}}, {{n:m11.depth.10}}, 앤티 없음. 전혀 승산이 없는 핸드로 올인해서 본전이 되려면 {{t:big-blind}}가 백 번 중 몇 번 {{t:fold|폴드}}해야 할까요?"
    options:
      - { text: "{{n:m11.push.10.alpha}} 초과", correct: true, why: "{{n:m11.push.10.win}}만큼 얻기 위해 {{n:m11.push.10.risk}}만큼 위험을 집니다. {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}})을 계산하면 약 {{n:m11.push.10.alpha}}입니다. 상대는 그렇게 자주 {{t:fold|폴드}}하지 않으므로, 올인은 상대가 {{t:call|콜}}했을 때도 에퀴티가 있는 핸드로만 이익이 됩니다." }
      - { text: "절반 초과", why: "이길 수 있는 만큼만 위험을 진다면 절반이면 충분합니다. 여기서는 {{n:m11.push.10.risk}}만큼 위험을 지고 블라인드 {{n:m11.push.10.win}}만큼만 얻습니다." }
      - { text: "가끔 {{t:fold|폴드}}하기만 하면 됩니다", why: "{{t:call}}이 나올 때마다 승산 없는 핸드는 스택 전부를 잃습니다. 에퀴티가 없다면 아주 잦은 {{t:fold|폴드}}가 필요합니다. {{n:m11.push.10.alpha}} 초과입니다." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:short-stack|숏 스택}}일 때, 다른 사람이 올인하기를 기다렸다가 {{t:call|콜}}하기보다 먼저 올인하는 편이 나은 이유는 무엇일까요?"
    options:
      - { text: "올인은 두 가지 방법으로 이기기 때문에", correct: true, why: "먼저 들어가면 모두가 {{t:fold|폴드}}할 때 {{t:pot|팟}}을 가져가거나, 쇼다운에서 이깁니다. {{t:call|콜}}하면 쇼다운에서만 이길 수 있습니다." }
      - { text: "올인이 언제나 에퀴티가 더 높기 때문에", why: "핸드의 에퀴티는 누가 먼저 들어갔는지와 관계없습니다. 차이는 올인이 상대에게 {{t:fold|폴드}}할 기회를 준다는 점입니다." }
      - { text: "올인에 {{t:call|콜}}하는 것은 금지되어 있기 때문에", why: "{{t:call|콜}}해도 되지만, {{t:call|콜}}하려면 더 강한 핸드가 필요합니다({{t:call|콜}}에 관한 레슨 참고)." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "{{t:small-blind|스몰 블라인드}}에서 같은 {{n:m11.depth.10}} 스택이지만, 이번에는 {{t:bb-ante}} 방식으로 진행됩니다. {{t:big-blind}}가 앤티로 {{n:m11.ante}}만큼 냈습니다. 올인 {{t:range}}는 어떻게 달라질까요?"
    options:
      - { text: "커집니다: {{n:m11.push.10}} 대신 약 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}", correct: true, why: "앤티는 상대가 {{t:fold|폴드}}했을 때 가져가는 {{t:pot|팟}}을 키웁니다. {{n:m11.push.10.win}} 대신 {{n:m11.push.10.win-ante}}입니다. 승산 없는 핸드도 이제 {{n:m11.push.10.alpha-ante}} 초과의 {{t:fold|폴드}}만 있으면 되므로, 더 많은 올인이 이익이 됩니다." }
      - { text: "줄어듭니다. 상대가 {{t:pot|팟}}에 더 많이 넣었으니 더 자주 {{t:call|콜}}하기 때문에", why: "상대가 실제로 더 넓게 {{t:call|콜}}하긴 하지만, 가져갈 수 있는 {{t:pot}}이 커진 효과가 더 큽니다. 균형은 약 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} 핸드입니다." }
      - { text: "변하지 않습니다", why: "앤티는 위험 대비 보상 비율을 바꿉니다. 앤티가 없으면 약 {{n:m11.push.10}}, 앤티가 있으면 약 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}입니다." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
{{t:tournament|토너먼트}}에서는 블라인드는 오르지만 스택은 그대로입니다. 조만간 스택이 너무 줄어서 일반적인 레이즈가 통하지 않게 됩니다. 이때 쓰는 것이 **푸시/폴드** 전략입니다. 플레이하는 모든 핸드로 {{t:shove|푸시}}, 즉 올인하고, 나머지는 {{t:fold|폴드}}합니다.

## 올인 아니면 {{t:fold}}, 언제일까

스택은 {{t:big-blind|빅 블라인드}} 단위로 셉니다. 자료들은 한 가지에 동의합니다. 약 **{{n:m11.thr.pushfold}} 이하**에서는 거의 올인 아니면 {{t:fold}}만 합니다.

| 스택 | 보통 하는 플레이 |
|---|---|
| 약 {{n:m11.thr.pushfold}} 이하 | 올인 아니면 {{t:fold}} |
| {{n:m11.thr.pushfold}}부터 {{n:m11.thr.upper}}까지 | 약한 핸드와 중간 핸드는 푸시/폴드 |
| 약 {{n:m11.thr.raise}} 초과 | 일반적인 레이즈 |

왜 레이즈하지 않을까요? {{n:m11.depth.10}} 스택에서 {{n:pf.open-size}}까지 레이즈하면 {{t:pot|팟}} 뒤에 남는 칩이 너무 적어서, 올인 {{t:raise|레이즈}}를 받으면 어차피 거의 {{t:call|콜}}해야 합니다. 상대는 이쪽이 {{t:fold|폴드}}하지 않을 것을 알기 때문에 두려울 게 없습니다. 바로 올인하면 스택에서 **폴드 에퀴티**, 즉 상대가 {{t:fold|폴드}}해서 생기는 이익을 가장 많이 끌어낼 수 있습니다.

:::note 단순화
푸시/폴드는 단순화한 전략입니다. 림프와 작은 레이즈도 선택할 수 있는 솔버는 {{n:m11.depth.10}}에서 일부 핸드를 림프하거나 미니멈 레이즈합니다. 그래도 올인 아니면 {{t:fold}}는 단순하고, 큰 실수를 하기 어려우며, 자료들도 출발점으로 권합니다.
:::

## M: 몇 오빗을 버틸 수 있나

널리 쓰이는 토너먼트 모델은 {{t:short-stack}}을 다르게 측정합니다. **M**은 스택을 테이블의 플레이어들이 한 바퀴(오빗) 도는 데 드는 비용으로 나눈 값입니다.

```formula
M = 스택 ÷ (스몰 블라인드 + 빅 블라인드 + 앤티)
```

예: {{n:m11.m.stack}} {{t:chips|칩}}을 가지고 있고, 블라인드는 {{n:m11.m.sb}}/{{n:m11.m.bb}}, {{t:bb-ante}}는 {{n:m11.m.ante}}입니다. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. {{t:big-blind|빅 블라인드}} 기준으로는 {{n:m11.m.bbs}}에 해당하지만, M은 앤티도 반영합니다. M 약 {{n:m11.m.red}} 이하({{t:red-zone}})에서는 올인 아니면 {{t:fold}}만 남습니다.

## 스택이 짧을수록 더 넓게

이 레슨의 그리드는 이 앱의 솔버가 가장 단순한 상황을 기준으로 계산했습니다. 모두 {{t:fold|폴드}}했고, {{t:small-blind|스몰 블라인드}}에서 {{t:big-blind|빅 블라인드}}를 상대로 플레이하며, 각자 올인하거나 {{t:fold|폴드}}하는 것만 가능합니다.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

{{n:m11.depth.15}}에서는 약 {{n:m11.push.15}} 핸드로, {{n:m11.depth.10}}에서는 약 {{n:m11.push.10}}, {{n:m11.depth.5}}에서는 약 {{n:m11.nash.push.5}}–{{n:m11.push.5}}로 올인합니다. 블라인드 대비 위험이 적을수록 이익이 되는 핸드가 많아집니다. 비교하자면, 한 트레이닝 사이트의 차트는 {{n:m11.depth.10}}에서 {{n:m11.ext.push.10}} 수준을 제시합니다. 그 차이는 솔버 검증 허용 오차 안에 있으며, 방향은 같습니다.

## 3인 게임: 뒤에 상대가 많을수록 더 타이트하게

버튼에서 플레이하면 뒤에 플레이어가 한 명이 아니라 두 명 남아 있습니다. 둘 다 강한 핸드를 가질 수 있으므로, 두 명 모두 {{t:fold|폴드}}하는 경우는 더 드뭅니다. 각자 {{n:m11.depth.3max}} 스택을 가진 3인 게임에서 버튼은 약 {{n:m11.3max.push.btn}} 핸드로 올인하고, 버튼이 {{t:fold|폴드}}했을 때 {{t:small-blind}}는 약 {{n:m11.3max.push.sb}}로 올인합니다.

```range
push.btn-3max
```

```range
push.sb-3max
```

이 두 그리드는 같은 상황에 대해 발표된 균형 결과와 대조해 확인했습니다(2008년 연구 논문: 버튼 {{n:m11.jamfold3.btn}}). 결과가 다른 몇몇 핸드는 연습 문제에 쓰지 않습니다.

## 이기는 두 가지 방법

올인은 상대가 {{t:fold|폴드}}하거나, {{t:call|콜}}한 뒤 쇼다운에서 지면 이깁니다. 상대의 {{t:fold}}만으로 충분한 경우는 드뭅니다. {{n:m11.depth.10}}에서는 블라인드 {{n:m11.push.10.win}}만큼을 가져가기 위해 {{n:m11.push.10.risk}}만큼 위험을 지므로, 승산 없는 핸드라면 {{n:m11.push.10.alpha}} 초과의 비율로 {{t:fold|폴드}}가 나와야 합니다. 그래서 폴드 에퀴티와, 상대가 {{t:call|콜}}했을 때의 핸드 에퀴티 둘 다 중요합니다.

## 앤티는 {{t:range}}를 넓힙니다

앤티는 핸드 시작 전에 {{t:pot|팟}}에 들어가는 추가 {{t:chips}}입니다. {{t:bb-ante}} 방식에서는 {{t:big-blind}}가 앤티로 {{n:m11.ante}}만큼 내므로, 위험은 그대로인데 올인으로 {{n:m11.push.10.win}} 대신 {{n:m11.push.10.win-ante}}만큼 가져갑니다. 이 구조에서 {{t:range|레인지}}는 약 {{n:m11.push.10}}에서 약 {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} 핸드로 넓어집니다(앱의 솔버와 독립적인 균형 계산은 1포인트 미만의 차이만 납니다).

```range
push.sb-10-ante
```
