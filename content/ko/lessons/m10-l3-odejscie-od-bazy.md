---
id: m10.l3
module: m10
order: 3
title: "기본 전략에서 벗어나기"
sub: "어떤 핸드로, 얼마나 멀리"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "상대가 이 라인에서 균형보다 조금 더 자주 {{t:bluff|블러프}}한다는 것을 알고 있습니다. 어떤 핸드부터 결정을 바꿉니까?"
    options:
      - { text: "기본 전략에서 {{t:call}}과 {{t:fold}}를 섞는 핸드: 이제 항상 {{t:call|콜}}합니다", correct: true, why: "균형에서 이 핸드들은 무차별합니다. 상대가 필요한 만큼 정확히 {{t:bluff|블러프}}를 가지고 있기 때문입니다. {{t:bluff|블러프}}가 조금만 많아도 {{t:call}}이 {{t:fold}}보다 더 많이 법니다." }
      - { text: "기본 전략에서 항상 {{t:fold|폴드}}하는 가장 약한 핸드", why: "이 핸드들은 {{t:bluff|블러프}} 중 일부에도 지거나, 훨씬 큰 초과분이 필요합니다. 상대가 균형에서 크게 벗어나야 비로소 바뀝니다." }
      - { text: "가장 강한 핸드: 이제 {{t:raise|레이즈}}합니다", why: "가장 강한 핸드는 어차피 계속 플레이합니다. 변화는 결정의 경계에 있는 핸드에서 시작됩니다." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "공개된 솔버 예시에서 상대는 리버 베팅 중 약 {{n:overbluff.base}} 대신 약 {{n:overbluff.lock}}를 {{t:bluff|블러프}}로 합니다. {{t:bluff|블러프}}를 잡는 핸드로 상대의 베팅에 대응하는 방식은 어떻게 바뀝니까?"
    options:
      - { text: "{{t:fold|폴드}}를 멈춥니다: 기본 전략에서 섞던 핸드가 이제 항상 {{t:call|콜}}합니다", correct: true, why: "상대 전략을 고정한 솔버 해에서 방어가 순수 {{t:call|콜}}로 바뀌는 데는 이것으로 충분했습니다. 무차별한 핸드는 아주 작은 {{t:bluff|블러프}} 초과에도 반응합니다." }
      - { text: "거의 바뀌지 않습니다: 몇 포인트로는 무언가를 바꾸기에 부족합니다", why: "무차별한 핸드에게 몇 포인트는 큽니다. 균형에서 {{t:call}}과 {{t:fold}}의 결과가 같으므로, {{t:bluff|블러프}}가 조금이라도 많으면 {{t:call|콜}} 쪽으로 기웁니다." }
      - { text: "{{t:bluff|블러프}}를 잡는 핸드로 {{t:raise|레이즈}}하기 시작합니다", why: "{{t:raise|레이즈}}는 상대의 {{t:bluff|블러프}}를 폴드시키고, 더 좋은 핸드는 {{t:call|콜}}합니다. {{t:bluff|블러프}}를 잡는 핸드는 {{t:call|콜}}로 수익을 냅니다." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "상대가 특정 라인에서 균형보다 덜 자주 {{t:bluff|블러프}}한다는 것을 알고 있습니다. 기본 전략에서 가끔 {{t:call|콜}}하고 가끔 {{t:fold|폴드}}하는, {{t:bluff|블러프}}를 잡는 핸드로 무엇을 합니까?"
    options:
      - { text: "항상 {{t:fold|폴드}}합니다", correct: true, why: "{{t:bluff|블러프}}가 균형이 요구하는 것보다 적으면 무차별한 핸드는 {{t:call|콜}}해서 손해를 봅니다. 솔버 결과: {{t:bluff|블러프}}가 부족하면 항상 {{t:fold|폴드}}합니다." }
      - { text: "상대가 {{t:bluff|블러프}}로 저를 이용하지 못하도록 항상 {{t:call|콜}}합니다", why: "{{t:bluff|블러프}}를 너무 드물게 하는 상대는 당신의 {{t:fold|폴드}}를 이용하지 못합니다. {{t:fold|폴드}}해서 상대의 실수를 이용하는 쪽은 당신입니다." }
      - { text: "기본 전략처럼 반반으로 플레이합니다", why: "섞는 것은 두 결정의 결과가 같을 때만 의미가 있습니다. {{t:bluff|블러프}}가 부족하면 {{t:fold}}의 결과가 더 좋습니다." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "핸드가 전혀 없이 {{n:ex.pot}} {{t:pot|팟}}에 c-bet으로 {{n:cbet.ex.small}}를 {{t:bet|베팅}}합니다. 이 {{t:bluff}}가 본전이 되려면 상대가 얼마나 자주 {{t:fold|폴드}}해야 합니까? 퍼센트를 입력하세요."
    answer: alpha.cbet.small
    explanation: "기준점은 베팅 ÷ ({{t:pot}} + 베팅) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}입니다. fold to c-bet이 이 수치보다 확실히 높은 상대는 충분히 자주 {{t:fold|폴드}}하므로, 핸드가 없어도 c-bet이 수익을 냅니다."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "상대의 fold to c-bet은 {{n:hud.ex.reg.hands}}핸드 기준 {{n:hud.ex.fcb.high}}입니다. {{t:dry|드라이}} 플롭에서 아무것도 맞지 않았습니다. 핸드 없이 {{t:pot|팟}}의 1/3 c-bet을 하면 수익이 납니까?"
    options:
      - { text: "예: 상대가 {{n:alpha.cbet.small}}보다 자주 {{t:fold|폴드}}하므로 c-bet이 즉시 수익을 냅니다", correct: true, why: "{{t:pot|팟}}의 1/3 c-bet은 {{t:fold|폴드}} {{n:alpha.cbet.small}}에서 본전입니다. 상대는 훨씬 더 자주 {{t:fold|폴드}}하므로, 핸드의 에퀴티를 계산하기 전에 이미 c-bet이 수익을 냅니다. fold to c-bet은 모든 사이즈와 테이블을 합친 수치이므로 근사치입니다." }
      - { text: "아니요: 핸드 없이는 베팅하지 않습니다", why: "{{t:bluff}}에 필요한 것은 핸드가 아니라 {{t:fold|폴드}}입니다. 상대가 {{n:alpha.cbet.small}}보다 자주 {{t:fold|폴드}}하면 c-bet은 어떤 핸드로도 수익을 냅니다." }
      - { text: "큰 사이즈로만 합니다. 작은 사이즈는 핸드를 폴드시키지 못하기 때문입니다", why: "베팅이 클수록 더 많은 {{t:fold|폴드}}가 필요합니다. {{t:pot|팟}}의 3/4이면 무려 {{n:alpha.cbet.big}}입니다. 상대가 어차피 자주 {{t:fold|폴드}}한다면 작은 c-bet이 더 적은 비용으로 같은 일을 합니다." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "상대의 fold to c-bet은 {{n:hud.ex.reg.hands}}핸드 기준 {{n:hud.ex.fcb.low}}입니다. 플롭을 맞히지 못했고 {{t:draw|드로우}}도 없습니다. {{t:pot|팟}}의 3/4 c-bet을 고려하고 있습니다. 어떻게 합니까?"
    options:
      - { text: "{{t:check|체크}}합니다: 이 상대는 큰 c-bet에 필요한 것보다 덜 자주 {{t:fold|폴드}}합니다", correct: true, why: "{{t:pot|팟}}의 3/4 c-bet은 {{t:fold|폴드}}가 {{n:alpha.cbet.big}}는 되어야 본전인데, 상대는 {{n:hud.ex.fcb.low}} 비율로 {{t:fold|폴드}}합니다. 핸드도 아웃도 없으면 이런 {{t:bluff}}는 손해입니다." }
      - { text: "c-bet은 표준이므로 베팅합니다", why: "핸드 없는 c-bet은 상대가 충분히 자주 {{t:fold|폴드}}하거나 핸드에 에퀴티가 있을 때만 좋습니다. 여기에는 둘 다 없습니다." }
      - { text: "{{t:fold|폴드}}를 강요하려고 올인합니다", why: "베팅이 클수록 더 많은 {{t:fold|폴드}}가 필요합니다. 드물게 {{t:fold|폴드}}하는 상대는 당신이 더 많이 {{t:bet|베팅}}했다고 더 자주 {{t:fold|폴드}}하지 않습니다." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "fold to 3-bet이 {{n:mda.rec.f3b}}인 {{t:recreational|레크리에이션 플레이어}}가 {{t:cutoff|컷오프}}에서 {{t:open|오픈}}합니다. 당신은 버튼에 있습니다. 기본 전략에서 KJs는 가끔 {{t:call|콜}}하고, A5s는 때때로 3-bet {{t:bluff|블러프}}가 됩니다. 이 플레이어를 상대로 어떻게 플레이합니까?"
    options:
      - { text: "KJs는 {{t:value|밸류}}로 3-bet하고, A5s는 {{t:bluff|블러프}}로 3-bet하지 않습니다", correct: true, why: "3-bet에 드물게 {{t:fold|폴드}}하는 플레이어는 더 약한 핸드로 자주 {{t:call|콜}}하므로, 더 강한 핸드가 3-bet으로 수익을 냅니다. 3-bet {{t:bluff|블러프}}는 {{t:fold|폴드}}가 {{n:alpha.vs-3bet-ip-size}}를 넘어야 즉시 수익을 내는데, 이 플레이어는 {{n:mda.rec.f3b}} 비율로 {{t:fold|폴드}}합니다." }
      - { text: "A5s를 3-bet합니다. {{t:blocker|블로커}}가 있는 {{t:bluff}}는 좋은 3-bet이기 때문입니다", why: "기본 전략에서, 즉 약 절반의 경우에 {{t:fold|폴드}}하는 상대에게는 그렇습니다. 이 상대는 {{n:mda.rec.f3b}} 비율로 {{t:fold|폴드}}하므로, 이 {{t:bluff}}는 거의 항상 약한 핸드로 큰 {{t:pot|팟}}을 플레이하게 됩니다." }
      - { text: "상대를 쫓아내지 않도록 KJs로 {{t:call|콜}}만 합니다", why: "더 약한 핸드로 3-bet에 {{t:call|콜}}하는 플레이어를 상대로는, KJs로 3-bet하면 더 좋은 핸드와 {{t:position|포지션}}을 가지고 더 큰 {{t:pot|팟}}을 만듭니다. 그냥 {{t:call}}하는 것보다 낫습니다." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "온라인 마이크로 스테이크(NL25) 모집단 데이터에 따르면 {{t:regular|레귤러}}는 3-bet에 {{n:mda.reg.f3b}}, {{t:recreational|레크리에이션 플레이어}}는 {{n:mda.rec.f3b}} 비율로 {{t:fold|폴드}}합니다. {{n:pf.3bet.ip-total}}까지의 {{t:position|포지션}} 3-bet은 {{t:fold|폴드}}가 {{n:alpha.vs-3bet-ip-size}}를 넘으면 핸드 없이도 수익을 냅니다. 여기서 무엇을 알 수 있습니까?"
    options:
      - { text: "{{t:recreational|레크리에이션 플레이어}}에게는 {{t:bluff|블러프}} 거의 없이 3-bet하고, {{t:regular|레귤러}}에게는 {{t:bluff|블러프}}를 남기되 에퀴티가 있는 핸드로만 합니다", correct: true, why: "어느 그룹도 핸드 없는 3-bet이 수익을 낼 만큼 자주 {{t:fold|폴드}}하지 않습니다. 기본 전략의 3-bet {{t:bluff|블러프}}는 플롭 이후 에퀴티와 {{t:fold|폴드}}로 수익을 냅니다. {{n:mda.rec.f3b}} 비율로 {{t:fold|폴드}}하는 플레이어를 상대로는 주로 에퀴티가 남으므로 {{t:linear|리니어}} {{t:range|레인지}}로 3-bet합니다." }
      - { text: "모두가 많이 {{t:fold|폴드}}하므로 누구에게나 아무 핸드로 3-bet합니다", why: "여기서 {{n:alpha.vs-3bet-ip-size}}보다 자주 {{t:fold|폴드}}하는 사람은 없습니다. 모든 핸드로 3-bet하면 손해를 봅니다." }
      - { text: "{{t:recreational|레크리에이션 플레이어}}에게는 3-bet을 완전히 그만둡니다", why: "반대입니다. 더 약한 핸드로 3-bet에 {{t:call|콜}}하는 플레이어는 당신의 강한 핸드에 돈을 지불합니다. 3-bet을 포기하는 것이 아니라 3-bet의 구성을 바꿉니다." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "{{n:hud.ex.mid.hands}}핸드 후 상대는 루즈하고 패시브해 보이지만, 표본이 작습니다. 기본 전략에서 얼마나 멀리 벗어납니까?"
    options:
      - { text: "조금, 리드 방향으로, 경계 핸드로만 벗어납니다", correct: true, why: "방향은 작은 표본에서도 보이지만, 수치의 오차가 큽니다. 결정의 경계에 있는 핸드는 리드 방향으로 옮기고, 나머지는 표본이 커질 때까지 기본 전략대로 플레이합니다." }
      - { text: "끝까지: 즉시 상대에게 최대한의 {{t:exploit|익스플로잇}}으로 플레이합니다", why: "표본이 작으면 리드가 틀릴 수 있습니다. 기본 전략에서 크게 벗어나는 것 자체가 이용당할 수 있습니다. 기본 전략은 이용당하기 가장 어려운 전략입니다." }
      - { text: "천 핸드가 쌓일 때까지 전혀 벗어나지 않습니다", why: "너무 조심스럽습니다. {{n:hud.ex.mid.hands}}핸드에서의 리드 방향도 이미 의미가 있고, 경계 핸드는 적은 비용으로 옮길 수 있습니다." }
---
{{t:exploit|익스플로잇}}은 기본 전략을 대체하지 않고, 기본 전략을 옮길 뿐입니다. 먼저 균형에서 어떻게 플레이하는지 알고(모듈 3–9), 그다음 데이터에서 상대가 균형에서 어느 방향으로 벗어나는지 보고, 자신의 플레이를 같은 방향으로 옮깁니다. 질문은 이것입니다. 어떤 핸드로, 얼마나 멀리.

## 먼저 {{t:mixed-hand|혼합 핸드}}

균형에서 일부 핸드는 두 가지 액션을 플레이합니다. 예를 들어 가끔 {{t:call|콜}}하고 가끔 {{t:fold|폴드}}합니다. 두 액션의 결과가 같기 때문입니다. 상대가 그 핸드를 무차별하게 만들 만큼 정확히 {{t:bluff|블러프}}를 가지고 있습니다. 상대의 실수에 가장 먼저 반응하는 것이 바로 이 핸드들입니다.

- 상대가 너무 자주 {{t:bluff|블러프}}합니다: {{t:mixed-hand|혼합 핸드}}는 항상 {{t:call|콜}}합니다.
- 상대가 너무 드물게 {{t:bluff|블러프}}합니다: {{t:mixed-hand|혼합 핸드}}는 항상 {{t:fold|폴드}}합니다.

많이 필요하지 않습니다. 공개된 솔버 예시(버튼이 베팅, {{t:check}}, 베팅 라인 뒤 리버에서 베팅)에서 상대의 {{t:bluff|블러프}}를 약 {{n:overbluff.base}}에서 약 {{n:overbluff.lock}}로 바꾸자 {{t:big-blind|빅 블라인드}}의 방어가 순수 {{t:call|콜}}로 바뀌었습니다. 기본 전략에서 항상 {{t:fold|폴드}}하거나 항상 계속 플레이하는 핸드는 상대가 균형에서 크게 벗어나야 비로소 결정을 바꿉니다.

## 기준점으로 계산하는 {{t:bluff|블러프}}

핸드 없는 {{t:bluff}}가 수익이 나는지는 모듈 6의 {{t:alpha}}가 알려 줍니다.

```formula
{{t:bluff}}는 상대가 다음보다 자주 {{t:fold|폴드}}할 때 수익을 냅니다: 베팅 ÷ (팟 + 베팅)
```

{{t:pot|팟}}의 1/3 c-bet이면 {{n:alpha.cbet.small}}, {{t:pot|팟}}의 3/4이면 {{n:alpha.cbet.big}}입니다. {{t:hud}}의 fold to c-bet은 상대가 이 기준점보다 위에 있는지 아래에 있는지 보여 줍니다. 이것은 근사치입니다. 이 통계는 모든 사이즈와 플롭을 합친 것이고, 당신의 핸드에는 보통 에퀴티가 조금 더 있습니다. 상대의 {{t:range}}에 맞는 플롭에서는 상대가 평균보다 덜 자주 {{t:fold|폴드}}합니다.

온라인 마이크로 스테이크(NL25) 모집단의 플레이어는 플롭 c-bet에 평균 {{n:mda.all.fcb}} 비율로 {{t:fold|폴드}}합니다. 이것이 반드시 실수는 아닙니다. 솔버도 플롭에서 {{t:out-of-position}}일 때는 {{t:mdf}}가 가리키는 것보다 더 자주 {{t:fold|폴드}}합니다(모듈 6). 그래서 모집단 평균이 기준점보다 높다는 것만으로는 핸드 없는 c-bet이 정당화되지 않습니다. 특정 상대에 대한 리드나, 상대의 {{t:range}}에 맞지 않는 플롭이 필요합니다.

## {{t:fold|폴드}}하지 않는 플레이어에게 하는 3-bet

{{n:pf.3bet.ip-total}}까지의 {{t:position|포지션}} 3-bet은 상대가 {{n:alpha.vs-3bet-ip-size}}보다 자주 {{t:fold|폴드}}할 때 비로소 핸드 없이도 수익을 냅니다(모듈 4). 온라인 마이크로 스테이크(NL25) 모집단 데이터:

| 그룹 | Fold to 3-bet |
|---|---|
| {{t:regular|레귤러}} | {{n:mda.reg.f3b}} |
| {{t:recreational|레크리에이션 플레이어}} | {{n:mda.rec.f3b}} |

기본 전략에서 3-bet {{t:bluff|블러프}}는 {{t:fold|폴드}}와 플롭 이후 에퀴티로 수익을 냅니다. {{n:mda.rec.f3b}} 비율로 {{t:fold|폴드}}하는 플레이어를 상대로는 {{t:fold|폴드}}가 거의 없는 대신, 그 플레이어는 더 약한 핸드로 {{t:call|콜}}합니다. 그래서 이 플레이어에게는 {{t:linear|리니어}} {{t:range|레인지}}로 3-bet합니다. {{t:value|밸류}}용 강한 핸드를 더 많이 넣고, {{t:bluff|블러프}}는 거의 넣지 않습니다. 두 교육 자료의 코치들은 이 경계를 fold to 3-bet 약 {{n:hud.f3b.low}}로 잡습니다.

## 작은 표본, 작은 이탈

표본이 작을수록 통계의 오차가 큽니다(레슨 1). 표본이 작을 때는 경계 핸드만, 리드 방향으로만 옮깁니다. {{t:range|레인지}} 전체에 걸친 큰 이탈은 표본이 크고 상대의 실수가 뚜렷할 때만 의미가 있습니다. 기본 전략에서 벗어나는 것 자체가 좋은 상대가 이용할 수 있는 실수입니다.

:::note 출처
{{t:mixed-hand|혼합 핸드}} 원칙은 상대 전략을 고정한 공개 솔버 분석에서 나왔습니다(솔버 해이며, 모집단 데이터가 아닙니다). {{t:alpha}} 기준점은 계산입니다. 모집단의 fold to 3-bet과 fold to c-bet은 공개 통계 데이터베이스에서 나왔습니다(대형 온라인 사이트 한 곳, NL25–NL100, 2026년 10월 이전 {{n:mda.period.months}}개월). fold to 3-bet 경계와 ‘작은 표본, 작은 이탈’ 원칙은 두 교육 자료의 권장 사항입니다.
:::
