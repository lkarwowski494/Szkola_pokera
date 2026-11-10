---
id: m9.l1
module: m9
order: 1
title: "SPR: 스택 대 팟"
sub: "팟 뒤에 남은 돈은 얼마인가"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "버튼에서 {{n:pf.open-size}}까지 {{t:open|오픈했고}}, {{t:big-blind}}가 {{t:call|콜했습니다}}. 스택은 각각 {{n:format.stack}}입니다. 플롭에서 {{t:pot|팟}}은 {{n:bb.pot-after.vs-btn}}, 당신의 남은 스택은 {{n:spr.srp.stack}}입니다. {{t:spr}}은 얼마입니까?"
    table: { position: BTN }
    options:
      - { text: "약 {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. {{t:pot|팟}} 뒤의 스택이 {{t:pot}}보다 십수 배 큽니다. {{t:open|오픈}}과 {{t:call|콜}} 이후의 전형적인 {{t:spr}}입니다." }
      - { text: "약 {{n:spr.srp.wrong-full}}", why: "전체 스택({{n:format.stack}})으로 계산하면 이렇게 나옵니다. {{n:pf.open-size}}의 오픈 금액은 이미 {{t:pot|팟}}에 들어가 있으므로, 남은 것만 계산합니다: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "약 {{n:spr.3bet-ip}}", why: "3벳과 {{t:call|콜}} 이후의 {{t:spr}}입니다. 싱글 레이즈 {{t:pot|팟}}에서는 {{t:pot}}이 훨씬 작으므로, {{t:spr}}은 약 {{n:spr.srp}}입니다." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:cutoff|CO}}가 {{n:pf.open-size}}까지 {{t:open|오픈했고}}, 당신은 버튼에서 {{n:pf.3bet.ip-total}}까지 {{t:raise|레이즈했습니다}}(3벳). {{t:cutoff|CO}}가 {{t:call|콜했고}}, 블라인드는 {{t:fold|폴드했습니다}}. 플롭에서 {{t:pot|팟}}은 {{n:vs3bet.pot-after}}, 당신의 남은 스택은 {{n:spr.3bet-ip.stack}}입니다. {{t:spr}}은 얼마입니까?"
    table: { position: BTN }
    options:
      - { text: "약 {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. 3벳 이후의 {{t:pot}}은 일반 {{t:open|오픈}} 이후보다 세 배 크므로, {{t:spr}}은 약 {{n:spr.srp}}에서 약 {{n:spr.3bet-ip}} 수준으로 떨어집니다." }
      - { text: "약 {{n:spr.3bet-ip.wrong-full}}", why: "전체 스택({{n:format.stack}})으로 계산하면 이렇게 나옵니다. {{n:pf.3bet.ip-total}}의 3벳은 이미 {{t:pot|팟}}에 들어가 있으므로, 남은 {{n:spr.3bet-ip.stack}}만 나눕니다." }
      - { text: "약 {{n:spr.srp}}", why: "싱글 레이즈 {{t:pot|팟}}의 {{t:spr}}입니다. 3벳 이후에는 {{t:pot}}이 훨씬 크고 그 뒤의 스택은 더 작으므로, {{t:spr}}은 약 {{n:spr.3bet-ip}} 수준으로 떨어집니다." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "버튼이 {{t:open|오픈했고}}, 당신은 {{t:big-blind|빅 블라인드}}에서 {{n:pf.3bet.oop-total}}까지 {{t:raise|레이즈했습니다}}(3벳). 버튼이 {{t:call|콜했습니다}}. 플롭에서 {{t:pot|팟}}은 {{n:spr.3bet-oop.pot}}, 당신의 남은 스택은 {{n:spr.3bet-oop.stack}}입니다. {{t:spr}}은 얼마입니까?"
    table: { position: BB }
    options:
      - { text: "약 {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|아웃 오브 포지션}}에서는 3벳이 더 크므로 {{t:pot}}이 더 많이 커지고, {{t:spr}}은 {{t:in-position}}에서 3벳한 뒤({{n:spr.3bet-ip}})보다 낮습니다." }
      - { text: "약 {{n:spr.3bet-ip}}", why: "{{t:in-position}}에서 {{n:pf.3bet.ip-total}}까지 3벳한 뒤의 {{t:spr}}입니다. {{n:pf.3bet.oop-total}}까지 하는 3벳은 더 큰 {{t:pot|팟}}을 만들므로, {{t:spr}}은 더 낮은 약 {{n:spr.3bet-oop}}입니다." }
      - { text: "약 {{n:spr.4bet}}", why: "이렇게 낮은 {{t:spr}}은 4벳이 나와야 생깁니다. {{n:pf.3bet.oop-total}}까지 3벳한 뒤에는 약 {{n:spr.3bet-oop}}입니다." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "스택은 각각 {{n:format.stack}}입니다. 어느 {{t:pot|팟}}에서 플롭의 {{t:spr}}이 가장 낮습니까?"
    options:
      - { text: "4벳 후 {{t:call|콜}}된 {{t:pot|팟}}", correct: true, why: "맞습니다: 버튼이 {{t:small-blind|스몰 블라인드}}의 3벳에 {{n:pf.4bet.example.low}}까지 4벳하고, {{t:small-blind}}가 {{t:call|콜하며}}, {{t:big-blind}}는 이미 {{t:fold|폴드한}} 경우, {{t:pot|팟}}은 {{n:spr.4bet.pot}}, 그 뒤에 남은 스택은 {{n:spr.4bet.stack}}뿐입니다. {{t:spr}}은 약 {{n:spr.4bet}}입니다." }
      - { text: "3벳 후 {{t:call|콜}}된 {{t:pot|팟}}", why: "3벳 이후 {{t:spr}}은 {{t:in-position}}에서 약 {{n:spr.3bet-ip}}, {{t:out-of-position}}에서 약 {{n:spr.3bet-oop}}입니다. 4벳은 이를 더 낮춰 약 {{n:spr.4bet}} 수준으로 만듭니다." }
      - { text: "싱글 레이즈 {{t:pot|팟}}", why: "반대입니다: 여기서는 {{t:spr}}이 가장 높은 약 {{n:spr.srp}}입니다. 플롭의 {{t:pot}}이 작기 때문입니다." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "3벳 이후 플롭의 {{t:spr}}이 일반 {{t:open|오픈}} 이후보다 훨씬 낮은 이유는 무엇입니까?"
    options:
      - { text: "{{t:pot|팟}}은 몇 배로 커지지만, 그 뒤의 스택은 조금만 줄어들기 때문", correct: true, why: "맞습니다: {{t:pot}}은 {{n:bb.pot-after.vs-btn}}에서 {{n:vs3bet.pot-after}} 수준으로 커지지만, 그 뒤의 스택은 {{n:spr.srp.stack}}에서 {{n:spr.3bet-ip.stack}} 수준으로 줄어들 뿐입니다. 비율은 약 {{n:spr.srp}}에서 약 {{n:spr.3bet-ip}} 수준으로 떨어집니다." }
      - { text: "3벳 이후에는 플레이어들의 스택이 더 작아지기 때문", why: "조금 작아질 뿐입니다: {{n:spr.srp.stack}} 대신 {{n:spr.3bet-ip.stack}}입니다. {{t:spr}}이 떨어지는 결정적인 이유는 {{t:pot}}이 세 배 크다는 점입니다." }
      - { text: "3벳이 {{t:position|포지션}}을 주기 때문", why: "{{t:position|포지션}}은 3벳이 아니라 테이블에서의 자리에 따라 정해집니다. {{t:spr}}은 단지 {{t:pot|팟}} 뒤의 스택을 {{t:pot|팟}}으로 나눈 값입니다." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "버튼에서 {{n:pf.open-size}}까지 {{t:open|오픈했고}}, 당신의 스택은 {{n:format.stack}}입니다. {{t:big-blind|빅 블라인드}}의 스택은 {{n:spr.short.stack}}뿐이고, 그가 {{t:call|콜합니다}}. 플롭의 {{t:pot|팟}}: {{n:bb.pot-after.vs-btn}}. {{t:spr}}은 얼마입니까?"
    table: { position: BTN }
    options:
      - { text: "약 {{n:spr.short}}", correct: true, why: "{{t:effective-stack|이펙티브 스택}}, 즉 두 스택 중 작은 쪽으로 계산합니다: 상대의 남은 스택이 {{n:spr.short.behind}}뿐이므로 {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}입니다. 이미 {{t:pot|팟}}에 들어간 것 외에, 두 사람 모두 최대 {{n:spr.short.behind}}까지만 더 넣을 수 있습니다." }
      - { text: "약 {{n:spr.srp}}", why: "상대의 스택도 {{n:format.stack}}일 때의 값입니다. 두 사람은 더 작은 스택만큼만 걸고 플레이할 수 있으므로, {{t:spr}}은 약 {{n:spr.short}}입니다." }
      - { text: "스택이 서로 달라서 계산할 수 없다", why: "계산할 수 있습니다: 더 작은 스택(이펙티브 스택)을 사용합니다. 상대의 남은 스택이 {{n:spr.short.behind}}뿐이므로 {{t:spr}} ≈ {{n:spr.short}}입니다." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "플롭 이후 핸드를 어떻게 플레이할지 알려 주는 {{t:spr}}은 언제 계산합니까?"
    options:
      - { text: "플롭에서, 누군가 {{t:bet|베팅}}을 {{t:bet|하기}} 전에", correct: true, why: "맞습니다: {{t:spr}}은 어느 {{t:street|스트리트}}에서나 계산할 수 있지만(M7에서는 턴에서 계산했습니다), 핸드 계획에는 플롭이 시작될 때 {{t:pot|팟}} 뒤의 스택을 {{t:pot|팟}}으로 나눈 값을 사용합니다. 그러면 세 {{t:street|스트리트}}에 걸쳐 플레이할 {{t:pot|팟}}이 몇 개 분량 남았는지 알 수 있습니다." }
      - { text: "핸드 시작 전, 누군가 {{t:raise|레이즈하기}} 전에", why: "플롭 전에는 {{t:pot}}이 얼마나 커질지 아직 모릅니다. {{t:spr}}은 바로 플롭 전에 일어난 일에 따라 달라집니다: {{t:open|오픈}} 이후 약 {{n:spr.srp}}, 3벳 이후 약 {{n:spr.3bet-ip}}." }
      - { text: "리버에서, 마지막 {{t:bet|베팅}} 전에", why: "리버에서는 결정이 하나만 남습니다. 거기서도 {{t:spr}}을 계산할 수 있지만, 핸드 계획에 가장 유용한 것은 플롭의 {{t:spr}}입니다. 세 {{t:street|스트리트}}를 모두 아우르기 때문입니다." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "버튼에서 {{t:raise|레이즈했고}}(3벳), {{t:cutoff|CO}}가 {{t:call|콜했습니다}}. 플롭의 {{t:spr}}은 약 {{n:spr.3bet-ip}}입니다. 좋은 키커와 함께 {{t:top-pair|탑 페어}}를 맞혔습니다. 이 핸드를 어떻게 다룹니까?"
    table: { position: BTN }
    options:
      - { text: "경계선 핸드로 다룹니다: {{t:value|밸류}}를 위해 플레이하지만, 상대의 올인에 항상 {{t:call|콜하지는}} 않습니다", correct: true, why: "약 {{n:spr.3bet-ip}}의 {{t:spr}}은 {{n:spr.zone.low}}에서 {{n:spr.zone.mid}} 사이 구간에 있으며, 이 구간에서 {{t:top-pair}}는 경계선 핸드입니다. 스택 전체를 걸지는 상대의 플레이 방식과 {{t:board}}의 모양에 따라 달라집니다." }
      - { text: "항상 스택 전체를 걸고 플레이합니다", why: "보통 그렇게 되는 것은 {{t:spr}}이 약 {{n:spr.zone.low}} 미만일 때뿐입니다. 예: 4벳 이후(약 {{n:spr.4bet}}). {{t:spr}}이 약 {{n:spr.3bet-ip}}일 때는 올인까지 더 많은 {{t:bet|베팅}}이 필요하고, 끝까지 돈을 내는 것은 주로 더 강한 핸드입니다." }
      - { text: "매우 높은 {{t:spr}}에서처럼 조심스럽게 플레이합니다", why: "{{t:top-pair|탑 페어}}를 그렇게 조심스럽게 플레이하는 것은 약 {{n:spr.zone.deep}} 초과일 때입니다. 예: 싱글 레이즈 {{t:pot|팟}}(약 {{n:spr.srp}}). 3벳 이후에는 {{t:spr}}이 훨씬 낮습니다." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "플롭입니다. {{t:pot|팟}}은 {{n:ex.pot}}, 상대가 {{n:commit.stack}} 올인합니다({{t:spr}} {{n:spr.commit}}). {{t:call|콜하려면}} 에퀴티가 얼마나 필요합니까? 퍼센트 숫자로 입력하세요."
    answer: eq.jam.spr2
    explanation: "추가로 {{n:commit.stack}}만큼 내고, {{t:call|콜}} 이후 {{t:pot}}은 {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}입니다. 필요한 에퀴티 = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "플롭에서 상대가 스택 전체로 올인합니다(핸드 시작 시 {{n:format.stack}}). 어느 {{t:pot|팟}}에서 {{t:call|콜하는}} 데 필요한 에퀴티가 가장 적습니까?"
    options:
      - { text: "4벳 이후: 약 {{n:eq.jam.4bet}}", correct: true, why: "{{t:spr}}이 약 {{n:spr.4bet}}일 때는 {{n:spr.4bet.stack}}만큼 내서 {{n:spr.4bet.pot}}의 {{t:pot|팟}}과 상대의 스택을 얻습니다. {{t:spr}}이 낮을수록 가격이 좋습니다." }
      - { text: "3벳 이후: 약 {{n:eq.jam.3bet-ip}}", why: "{{t:in-position}}에서 3벳한 뒤에는 약 {{n:eq.jam.3bet-ip}}가 필요합니다. 4벳 이후에는 스택 대비 {{t:pot}}이 더 크므로 약 {{n:eq.jam.4bet}}면 충분합니다." }
      - { text: "{{t:open|오픈}}과 {{t:call|콜}} 이후: 약 {{n:eq.jam.srp}}", why: "셋 중 가장 나쁜 가격입니다: {{t:spr}}이 약 {{n:spr.srp}}일 때는 {{n:spr.srp.stack}}만큼 내서 작은 {{t:pot|팟}}({{n:bb.pot-after.vs-btn}})과 상대의 스택을 얻습니다." }
---
플롭 전에는 {{t:pot|팟}}에 얼마의 돈이 들어갈지 결정합니다. 플롭 이후에는 그 뒤에 얼마가 더 남아 있는지가 중요합니다. 하나의 숫자가 이 둘을 연결합니다: {{t:spr}}.

## {{t:spr}}이란

{{t:spr}}(영어: stack-to-pot ratio)은 {{t:street|스트리트}}가 시작될 때 {{t:pot|팟}} 대비 스택의 비율입니다. 어느 {{t:street|스트리트}}에서나 계산할 수 있지만(M7에서는 턴에서 계산했습니다), 핸드 계획에는 누군가 {{t:bet|베팅}}을 {{t:bet|하기}} 전 플롭의 {{t:spr}}을 사용합니다.

```formula
SPR = 이펙티브 스택 ÷ 플롭의 팟
```

{{t:effective-stack|이펙티브 스택}}은 두 스택 중 작은 쪽이며, 이미 {{t:pot|팟}}에 들어간 금액은 제외합니다. 이것이 각 플레이어가 {{t:pot|팟}}에 더 넣을 수 있는 최대 금액입니다: {{t:pot|팟}} 외에 상대에게서 {{t:effective-stack}}보다 많이 얻을 수 없고, 더 잃을 수 있는 최대 금액도 그만큼입니다.

예: 버튼에서 {{n:pf.open-size}}까지 {{t:open|오픈했고}}, {{t:big-blind}}가 {{t:call|콜했습니다}}. 플롭의 {{t:pot|팟}}은 {{n:bb.pot-after.vs-btn}}, 당신의 남은 스택은 {{n:spr.srp.stack}}입니다. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## 프리플롭이 정하는 {{t:spr}}

플롭 전의 모든 {{t:raise}}는 {{t:pot|팟}}을 몇 배로 키우지만, 그 뒤의 스택은 훨씬 천천히 줄어듭니다. 그래서 {{t:spr}}은 플롭 전에 일어난 일에 크게 좌우됩니다.

| {{t:pot|팟}} (스택 {{n:format.stack}}) | 플롭의 {{t:pot|팟}} | {{t:pot|팟}} 뒤의 스택 | {{t:spr}} |
|---|---|---|---|
| {{t:open|오픈}}과 {{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| {{t:in-position}} 3벳과 {{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| {{t:big-blind|빅 블라인드}}의 3벳과 {{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| {{t:small-blind|스몰 블라인드}}의 3벳에 대한 버튼의 4벳과 {{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## {{t:spr}} 구간

{{t:spr}} 구간은 플롭의 {{t:spr}}으로 판단합니다. {{t:spr}}이 높을수록 스택 전체를 걸고 플레이하는 데 더 강한 핸드가 필요합니다:

| {{t:spr}} | 보통 스택 전체를 걸고 플레이하는 핸드 |
|---|---|
| {{n:spr.zone.low}} 미만 | {{t:top-pair}} 이상 |
| {{n:spr.zone.low}}에서 {{n:spr.zone.mid}} 사이 | {{t:top-pair}}는 경계선 핸드 |
| {{n:spr.zone.mid}}에서 {{n:spr.zone.deep}} 사이 | 높은 {{t:two-pair}} 이상 |
| {{n:spr.zone.deep}} 초과 | 셋, {{t:straight}} 이상 |

{{t:open|오픈}}과 {{t:call|콜}} 이후({{t:spr}} 약 {{n:spr.srp}})에는 가장 높은 구간에, 3벳 이후(약 {{n:spr.3bet-ip}})에는 {{t:top-pair}}가 경계선에 있는 구간에, 4벳 이후(약 {{n:spr.4bet}})에는 가장 낮은 구간에 있습니다. 이 기준값은 단순화한 것입니다. 자료마다 구간을 나누는 방식은 다르지만, 약 {{n:spr.zone.low}} 미만에서는 {{t:top-pair}}로 스택을 걸고 플레이하며 {{t:spr}}이 높아질수록 {{t:pair}} 하나로 그렇게 하는 경우가 점점 드물어진다는 데는 동의합니다. {{n:spr.zone.mid}}의 경계는 이 앱에서 정한 약속입니다. {{n:spr.zone.deep}}의 기준은 계산에서 나옵니다: {{t:spr}}이 {{n:spr.zone.deep}}일 때 {{t:pot|팟}} 크기의 {{t:bet|베팅}} 세 번이면 올인이 됩니다.

## 낮은 {{t:spr}}: 올인에 대한 더 좋은 가격

상대가 스택 전체로 올인하면, 당신은 스택만큼 내서 {{t:pot|팟}}과 상대의 스택을 얻습니다. 필요한 에퀴티 = 스택 ÷ ({{t:pot}} + 2·스택). {{t:spr}}이 {{n:spr.commit}}일 때는 {{n:eq.jam.spr2}}, 4벳 이후에는 약 {{n:eq.jam.4bet}}, 3벳 이후에는 약 {{n:eq.jam.3bet-ip}}, 싱글 레이즈 {{t:pot|팟}}에서는 무려 약 {{n:eq.jam.srp}}입니다.

{{t:spr}}이 낮을수록 플레이할 돈이 적게 남고 스택 전체를 넣기도 쉬워집니다. 높을수록 스택이 {{t:pot|팟}}에 들어가기 전에 남은 {{t:street|스트리트}}와 {{t:bet|베팅}}이 많아집니다.

:::note 이 숫자의 출처
{{t:pot|팟}}과 스택은 프리플롭 모듈의 사이즈에서 가져왔습니다({{t:open}} {{n:pf.open-size}}, {{n:pf.3bet.ip-total}} 또는 {{n:pf.3bet.oop-total}}까지 3벳, {{n:pf.4bet.example.low}}까지 4벳). 4벳 이후의 {{t:pot|팟}}은 다음 시나리오입니다: 버튼이 {{t:small-blind|스몰 블라인드}}의 3벳에 4벳하고, {{t:small-blind}}가 {{t:call|콜하며}}, {{t:big-blind}}는 {{t:fold|폴드해서}} 그의 블라인드가 {{t:pot|팟}}에 남습니다. 사이즈가 다르면 {{t:spr}}도 조금 달라지지만, 순서는 항상 같습니다: 플롭 전에 {{t:raise|레이즈}}가 많을수록 {{t:spr}}은 낮아집니다.
:::
