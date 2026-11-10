---
id: m10.l1
module: m10
order: 1
title: "HUD 통계"
sub: "VPIP와 PFR이 측정하는 것과 필요한 핸드 수"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "{{t:big-blind|빅 블라인드}}에 있습니다. 두 플레이어가 림프하고, 당신은 {{t:check|체크}}해서 플롭을 봅니다. 이 핸드로 당신의 {{t:vpip}}가 올라갑니까?"
    options:
      - { text: "아니요: {{t:chips|칩}}을 하나도 자발적으로 넣지 않았습니다", correct: true, why: "{{t:vpip}}는 플롭 전의 자발적인 투입, 즉 {{t:call|콜}}이나 {{t:raise|레이즈}}만 셉니다. {{t:big-blind|빅 블라인드}}는 의무 투입이고, {{t:check|체크}}에는 비용이 들지 않습니다." }
      - { text: "예: 플롭을 플레이하므로 플레이한 핸드로 셉니다", why: "플롭을 보는 것만으로는 부족합니다. {{t:vpip}}는 플롭 전에 직접 {{t:chips|칩}}을 넣을 때만 올라갑니다." }
      - { text: "예, 그리고 {{t:pfr}}도 올라갑니다", why: "{{t:pfr}}은 플롭 전에 {{t:raise|레이즈}}할 때만 올라갑니다. 여기서는 아무도 {{t:raise|레이즈}}하지 않았고, 당신은 {{t:check|체크}}만 했습니다." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "친구가 메모를 보여 줍니다: 상대의 {{t:vpip}}는 {{n:hud.ex.wrong.vpip}}, {{t:pfr}}은 {{n:hud.ex.wrong.pfr}}입니다. 어떻게 생각하십니까?"
    options:
      - { text: "불가능합니다: {{t:pfr}}은 {{t:vpip}}보다 클 수 없습니다", correct: true, why: "플롭 전의 모든 {{t:raise|레이즈}}는 자발적인 투입이기도 하므로 두 통계에 모두 포함됩니다. {{t:pfr}}은 항상 {{t:vpip}} 이하입니다. 친구가 숫자를 혼동했습니다." }
      - { text: "{{t:call|콜}}을 거의 하지 않는 매우 공격적인 플레이어입니다", why: "{{t:call|콜}}을 전혀 하지 않는 플레이어는 {{t:pfr}}이 {{t:vpip}}와 같지만, 더 크지는 않습니다. {{t:pfr}}이 더 크다면 기록 오류입니다." }
      - { text: "패시브한 플레이어입니다", why: "패시브함은 {{t:pfr}}이 {{t:vpip}}보다 훨씬 작을 때 드러나며, 클 때가 아닙니다." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "상대의 {{t:vpip}}는 {{n:mda.rec.vpip}}, {{t:pfr}}은 {{n:mda.rec.pfr}}입니다. 플레이하지만 {{t:raise|레이즈}}하지 않는 핸드로 상대는 무엇을 합니까?"
    options:
      - { text: "{{t:call|콜}}하거나 림프합니다: 그 차이가 {{n:mda.rec.gap}}만큼의 핸드입니다", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. 이 핸드들은 {{t:raise|레이즈}} 없이 {{t:pot|팟}}에 넣습니다: 림프하거나 다른 플레이어의 {{t:open|오픈}}에 {{t:call|콜}}합니다." }
      - { text: "플롭 전에 {{t:fold|폴드}}합니다", why: "플롭 전에 폴드한 핸드는 {{t:vpip}}에 전혀 포함되지 않습니다. {{t:vpip}} − {{t:pfr}}의 차이는 {{t:raise|레이즈}} 없이 플레이한 핸드입니다." }
      - { text: "{{t:all-in|올인}}으로 플레이합니다", why: "플롭 전 올인도 {{t:raise|레이즈}}이므로 {{t:pfr}}을 올리게 됩니다. 차이는 {{t:call|콜}}만 했거나 림프한 핸드입니다." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "{{n:hud.se.ex.n}}핸드 후 상대의 {{t:vpip}}는 {{n:hud.se.ex.p}}입니다. 이 수치의 표준 오차는 몇 퍼센트포인트입니까? 숫자를 입력하세요."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. 약 {{n:var.conf95}}의 신뢰도로 실제 {{t:vpip}}는 ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}} 범위 안에 있습니다."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "{{n:hud.se.ex.n}}핸드 후 상대의 {{t:vpip}}는 {{n:hud.se.ex.p}}입니다. 상대의 실제 {{t:vpip}}에 대해 무엇을 알 수 있습니까?"
    options:
      - { text: "약 {{n:var.conf95}}의 신뢰도로 {{n:hud.ci.ex.low}}에서 {{n:hud.ci.ex.high}} 사이에 있습니다", correct: true, why: "표준 오차는 약 {{n:hud.se.ex}}이고, {{n:var.conf95}} 구간은 ± 오차의 {{n:var.z95}}배, 즉 ± {{n:hud.ci.ex}}입니다. 상대가 극단적인 플레이어가 아니라는 것은 알 수 있지만, 몇 포인트 차이 나는 유형은 아직 구별할 수 없습니다." }
      - { text: "정확히 {{n:hud.se.ex.p}}입니다", why: "{{n:hud.se.ex.n}}핸드는 여전히 작은 표본입니다: 오차는 약 {{n:hud.se.ex}}이고, {{n:var.conf95}} 구간은 ± {{n:hud.ci.ex}}입니다." }
      - { text: "아무것도 모릅니다: 천 핸드 전에는 통계에 의미가 없습니다", why: "과장입니다. {{n:hud.ci.ex.low}}에서 {{n:hud.ci.ex.high}}까지의 구간만으로도 매우 타이트한 플레이어와 매우 루즈한 플레이어는 배제됩니다. 부족한 것은 정밀도뿐입니다." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "수백 핸드 후, 상대는 3벳에 대응할 기회가 {{n:hud.se.f3b.n}}번 있었고 그중 {{n:hud.se.f3b.p}}의 경우에 {{t:fold|폴드}}했습니다. 상대의 폴드 투 3벳에 대해 무엇을 알 수 있습니까?"
    options:
      - { text: "거의 없습니다: 약 {{n:var.conf95}}의 신뢰도로 {{n:hud.ci.f3b.low}}에서 {{n:hud.ci.f3b.high}} 사이입니다", correct: true, why: "세는 것은 핸드가 아니라 기회입니다. 오차는 √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}이고, {{n:var.conf95}} 구간은 ± {{n:hud.ci.f3b}}입니다. 이 구간에는 거의 항상 방어하는 플레이어도, 거의 항상 {{t:fold|폴드}}하는 플레이어도 들어갑니다." }
      - { text: "표본이 수백 핸드이므로 정확히 {{n:hud.se.f3b.p}}의 경우에 {{t:fold|폴드}}합니다", why: "수백 핸드는 이 통계에서 기회 {{n:hud.se.f3b.n}}번에 불과합니다. 오차는 기회 수로 계산하며, 약 {{n:hud.se.f3b}}입니다." }
      - { text: "{{n:hud.f3b.low}} 초과는 실수이므로 너무 자주 {{t:fold|폴드}}합니다", why: "{{n:hud.se.f3b.p}}의 폴드율은 ‘{{n:hud.f3b.low}} 초과’가 아니며, 기회 {{n:hud.se.f3b.n}}번에서는 오차가 약 {{n:hud.se.f3b}}입니다. 이런 표본으로는 결론을 내릴 수 없습니다." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "새 상대, {{t:hud|HUD}}에 {{n:hud.ex.few.hands}}핸드: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. 이 상대를 어떻게 상대합니까?"
    options:
      - { text: "모르는 플레이어처럼 기본 전략대로 플레이하고, 핸드를 계속 모읍니다", correct: true, why: "약 {{n:hud.hands.random}}핸드 미만에서는 통계가 우연입니다: 좋은 카드가 몇 번 연속으로 들어오면 이런 {{t:vpip}}가 나옵니다. 플레이어 유형은 약 {{n:hud.hands.random}}–{{n:hud.hands.rough.high}}핸드 후에 대략 보이고, {{t:vpip}}와 {{t:pfr}}은 약 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}핸드 후에 안정됩니다." }
      - { text: "{{t:maniac|매니악}}처럼 상대합니다: 넓게 {{t:call|콜}}합니다", why: "{{t:maniac|매니악}}, 즉 매우 루즈하고 공격적인 플레이어는 가능성 중 하나일 뿐입니다: {{n:hud.ex.few.hands}}핸드 후에는 어떤 유형이든 될 수 있습니다. 우연에 근거해 넓게 {{t:call|콜}}하면, 상대가 평범한 {{t:regular|레귤러}}, 즉 꽤 탄탄하게 플레이하는 단골 플레이어로 밝혀질 때 손해를 봅니다." }
      - { text: "대부분의 플레이어가 닛이므로 {{t:nit|닛}}처럼 상대합니다", why: "그것도 알 수 없습니다: {{t:nit|닛}}, 즉 매우 타이트한 플레이어는 여러 유형 중 하나일 뿐입니다. 표본이 없으면 리드도 없으므로 기본 전략으로 돌아갑니다." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "신뢰할 수 있으려면 가장 많은 핸드가 필요한 통계는 무엇입니까?"
    options:
      - { text: "폴드 투 3벳", correct: true, why: "폴드 투 3벳의 기회는 상대가 {{t:open|오픈}}하고 3벳을 받았을 때만 생기며, 이는 드뭅니다. 그래서 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}핸드가 아니라 약 {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}핸드가 필요합니다." }
      - { text: "{{t:vpip}}", why: "{{t:vpip}}는 모든 핸드에서 기회가 있으므로 가장 빨리 안정됩니다: 약 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}핸드 후입니다." }
      - { text: "{{t:pfr}}", why: "{{t:pfr}}도 {{t:vpip}}처럼 플레이어가 {{t:raise|레이즈}}할 수 있는 모든 핸드에서 기회가 있으므로 빨리 안정됩니다." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "이용하는 사이트가 테이블에서 {{t:hud|HUD}} 프로그램 사용을 금지합니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:hud|HUD}} 없이 플레이하고, {{t:session|세션}} 후에 내 핸드 데이터베이스와 단골 상대에 대한 메모를 검토합니다", correct: true, why: "사이트 약관은 구속력이 있습니다: 금지된 프로그램을 쓰면 계정이 폐쇄될 위험이 있습니다. 자신의 핸드 히스토리 통계는 플레이 후에 검토할 수 있고, 일부 사이트는 테이블에서 자체 통계를 보여 줍니다." }
      - { text: "이점이 있으므로 금지에도 불구하고 {{t:hud|HUD}}를 사용합니다", why: "약관을 위반하면 사이트가 계정을 폐쇄하고 자금을 동결할 수 있습니다. 그 이점은 이런 대가를 치를 가치가 없습니다." }
      - { text: "{{t:hud|HUD}} 없이는 불가능하므로 {{t:exploit|익스플로잇}}을 포기합니다", why: "가능합니다: {{t:session|세션}} 후 핸드 검토에서 얻은 리드와 자신의 {{t:stakes|스테이크}} 플레이어 풀 데이터도 기본 전략에서 어느 방향으로 벗어날지 알려 줍니다." }
---
{{t:exploit|익스플로잇}}은 모듈 3–9의 기본 전략에서 상대의 실수 쪽으로 벗어나는 것입니다. 어느 방향으로 벗어날지 알려면 데이터가 필요합니다. 온라인에서는 {{t:hud|HUD}}가 데이터를 제공합니다: 핸드를 기록하고 테이블에 있는 모든 상대의 통계를 보여 주는 프로그램입니다.

## {{t:vpip}}와 {{t:pfr}}

가장 중요한 두 숫자는 플롭 전 플레이를 나타냅니다:

- **{{t:vpip}}**: 플레이어가 플롭 전에 자발적으로 {{t:pot|팟}}에 {{t:chips|칩}}을 넣는, 즉 {{t:call|콜}}이나 {{t:raise|레이즈}}를 하는 핸드의 비율입니다. 블라인드는 의무이므로 포함되지 않습니다.
- **{{t:pfr}}**: 플레이어가 플롭 전에 {{t:raise|레이즈}}하는, 즉 {{t:open|오픈}}하거나 3벳 또는 4벳하는 핸드의 비율입니다.

모든 {{t:raise|레이즈}}는 자발적인 투입이기도 하므로 {{t:pfr}}은 절대 {{t:vpip}}를 넘지 않습니다. {{t:vpip}} − {{t:pfr}}의 차이는 플레이어가 {{t:call|콜}}만 했거나 림프한 핸드입니다. {{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}인 플레이어는 많은 핸드를 플레이하지만, 전체 핸드의 {{n:mda.rec.gap}}에서는 {{t:raise|레이즈}} 없이 {{t:pot|팟}}에 들어갑니다.

## 기타 통계

| 통계 | 측정하는 것 | 기회 |
|---|---|---|
| 3벳 | 다른 플레이어의 {{t:open|오픈}}에 얼마나 자주 {{t:raise|레이즈}}하는가 | 앞에서 누군가 {{t:open|오픈}}했을 때 |
| 폴드 투 3벳 | 3벳에 얼마나 자주 {{t:fold|폴드}}하는가 | {{t:open|오픈}}했다가 3벳을 받았을 때 |
| C벳 | 자신의 {{t:raise|레이즈}} 후 플롭에서 얼마나 자주 베팅하는가 | 플롭 전 {{t:aggressor|어그레서}}였을 때 |
| 폴드 투 C벳 | C벳에 얼마나 자주 {{t:fold|폴드}}하는가 | C벳을 받았을 때 |
| {{t:wtsd}} | 플롭 후 얼마나 자주 쇼다운까지 가는가 | 플롭을 봤을 때 |

마지막 열이 중요합니다: 통계는 상대에게 기회가 있을 때만 변합니다. {{t:vpip}}는 모든 핸드에서 기회가 있지만, 폴드 투 3벳은 상대가 {{t:open|오픈}}하고 3벳을 받았을 때만 기회가 있습니다.

## 필요한 핸드 수

각 핸드는 상대 전략에서 뽑은 무작위 표본이므로, 통계에는 모든 표본 평균처럼 오차가 있습니다. 오차는 표본 평균의 오차 공식으로 계산합니다(모듈 12에서 같은 공식으로 {{t:winrate|윈레이트}}의 오차를 계산합니다):

```formula
오차 = √(p × (1 − p) ÷ n)
{{n:var.conf95}} 구간 = p ± {{n:var.z95}} × 오차
```

여기서 p는 비율(예: {{t:vpip}}), n은 기회 수입니다. {{t:vpip}} {{n:hud.se.ex.p}}인 {{n:hud.se.ex.n}}핸드 후 오차는 약 {{n:hud.se.ex}}이므로, 실제 {{t:vpip}}는 약 {{n:var.conf95}}의 신뢰도로 **{{n:hud.ci.ex.low}}에서 {{n:hud.ci.ex.high}} 사이**에 있습니다. 기회 {{n:hud.se.f3b.n}}번 중 폴드 투 3벳 {{n:hud.se.f3b.p}}의 구간은 {{n:hud.ci.f3b.low}}에서 {{n:hud.ci.f3b.high}}까지입니다: 거의 아무 정보도 없습니다.

코치들은 비슷한 기준을 제시합니다:

- 약 {{n:hud.hands.random}}핸드 미만에서는 통계가 우연입니다. 모르는 플레이어를 상대하듯 플레이합니다;
- 플레이어 유형은 {{n:hud.hands.random}}–{{n:hud.hands.rough.high}}핸드 후에 대략 보이고, {{t:vpip}}와 {{t:pfr}}은 약 {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}핸드 후에 안정됩니다;
- 3벳은 약 {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}}핸드, 폴드 투 3벳은 약 {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}핸드가 필요하고, 턴과 리버 통계는 그보다 더 많이 필요합니다.

:::note 사이트가 {{t:hud|HUD}}를 금지할 때
일부 사이트(교육 자료에 따르면 낮은 {{t:stakes|스테이크}}의 대형 사이트도 포함)는 테이블에서 {{t:hud|HUD}} 프로그램을 금지합니다. 그럴 때는 {{t:session|세션}} 후 자신의 핸드 히스토리를 검토하고, 단골 상대에 대한 메모를 남기고, 자신의 {{t:stakes|스테이크}} 플레이어 풀 데이터를 활용합니다(레슨 2). 표본 기준은 서로 다른 핸드 수를 제시하는 두 교육 자료에서 가져온 것입니다. 오차 공식은 수학적 계산입니다.
:::
