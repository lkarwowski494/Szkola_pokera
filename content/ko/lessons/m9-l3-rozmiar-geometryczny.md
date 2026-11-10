---
id: m9.l3
module: m9
order: 3
title: "기하학적 사이즈"
sub: "올인까지 같은 팟 비율"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "{{t:pot|팟}}은 {{n:ex.pot}}입니다. {{t:pot|팟}} 전체({{n:ex.bet.pot}})를 베팅하고 상대가 {{t:call|콜}}합니다. 지금 {{t:pot|팟}}에는 얼마가 있습니까? 숫자를 입력하세요."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. {{t:pot|팟}} 크기의 {{t:bet|베팅}}과 {{t:call}}은 {{t:pot|팟}}을 세 배로 만듭니다. 일반적으로, {{t:pot|팟}}의 f만큼의 {{t:bet}}과 {{t:call}}은 {{t:pot|팟}}을 (1 + 2f)배로 만듭니다."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "{{t:pot|팟}}은 {{n:ex.pot}}입니다. 플롭, 턴, 리버에서 {{t:pot|팟}} 전체({{n:ex.bet.pot}}, 다음 {{n:geo.ex.turn}}, 그다음 {{n:geo.ex.river}})를 베팅하고, 상대는 매번 {{t:call|콜}}합니다. 각자 총 얼마를 넣습니까? 숫자를 입력하세요."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. {{t:pot|팟}}은 {{n:ex.pot}}에서 {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}}, {{n:geo.ex.river-after}}로 커집니다. 따라서 {{t:pot|팟}} 크기 {{t:bet|베팅}} 세 번이면 {{t:spr}} {{n:spr.zone.deep}}에서 올인이 됩니다."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "어떤 {{t:spr}}에서 하프 {{t:pot|팟}} {{t:bet|베팅}} 세 번(플롭, 턴, 리버, 매번 콜을 받음)으로 정확히 스택 전부가 들어갑니까?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|팟}} {{n:ex.pot}}: {{n:ex.bet.half}}, {{n:geo.half.turn}}, {{n:geo.half.river}}의 {{t:bet|베팅}}을 합하면 {{n:geo.half.total}}, 즉 스택 {{n:geo.half.stack}}입니다. 공식으로는 (1 + 2·{{n:ex.frac.half}})의 세제곱 = 1 + 2·{{n:geo.half.spr}}입니다." }
      - { text: "{{n:spr.zone.deep}}", why: "{{t:spr}} {{n:spr.zone.deep}}에서는 모든 {{t:street|스트리트}}에서 {{t:pot|팟}} 전체를 베팅해야 합니다. 그러면 하프 {{t:pot|팟}} {{t:bet|베팅}}으로는 {{n:geo.ex.stack}} 중 {{n:geo.half.total}}만 들어갑니다." }
      - { text: "{{n:spr.commit}}", why: "{{t:spr}} {{n:spr.commit}}에서 하프 {{t:pot|팟}} {{t:bet|베팅}} 세 번은 너무 많습니다. 하프 {{t:pot|팟}}을 온전히 {{t:bet|베팅}}하기 전에 리버에서 이미 스택이 바닥납니다. 이 계획은 {{t:spr}} {{n:geo.half.spr}}에 맞습니다." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "싱글 레이즈 {{t:pot|팟}}: 플롭 시점에 {{n:bb.pot-after.vs-btn}}, 각자 남은 스택은 {{n:spr.srp.stack}}입니다. 플롭, 턴, 리버에서 하프 {{t:pot|팟}}을 베팅하고, 상대는 항상 {{t:call|콜}}합니다. 총 얼마를 넣게 됩니까?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. 스택 대부분이 {{t:pot|팟}} 밖에 남습니다. {{t:spr}} 약 {{n:spr.srp}}에서 하프 {{t:pot|팟}}은 스택 전부를 걸고 플레이하기에 너무 작습니다." }
      - { text: "{{n:spr.srp.stack}}, 즉 스택 전부", why: "{{t:pot|팟}}은 {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} 등으로만 커집니다. 하프 {{t:pot|팟}} {{t:bet|베팅}} 세 번으로 들어가는 금액은 총 {{n:srp.half.total}}로, 스택 전부와는 거리가 멉니다." }
      - { text: "{{n:srp.potbet.total}}", why: "이는 {{t:pot|팟}} 전체 크기의 {{t:bet|베팅}} 세 번({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}})으로 들어갈 금액입니다. 하프 {{t:pot|팟}} {{t:bet|베팅}}으로는 {{n:srp.half.total}}뿐입니다." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "싱글 레이즈 {{t:pot|팟}}, {{t:spr}} 약 {{n:spr.srp}}. 플롭, 턴, 리버에서 어떤 고정 {{t:bet|베팅}} 사이즈를 써야 스택 전부가 들어갑니까?"
    options:
      - { text: "약 {{n:geo.srp.3}} {{t:pot|팟}}, 즉 {{t:pot}} 전체보다 큼", correct: true, why: "맞습니다. {{t:pot|팟}} 크기 {{t:bet|베팅}} 세 번으로도 {{n:spr.srp.stack}} 스택 중 {{n:srp.potbet.total}}만 들어갑니다. 모든 {{t:street|스트리트}}에서 약 {{n:geo.srp.3}} {{t:pot|팟}}이어야 비로소 스택 전부가 들어갑니다." }
      - { text: "약 {{n:geo.3bet-ip.3}} {{t:pot|팟}}", why: "이 정도는 3벳 {{t:pot|팟}}({{t:spr}} 약 {{n:spr.3bet-ip}})에서 충분합니다. 싱글 레이즈 {{t:pot|팟}}에서는 {{t:spr}} 값이 약 {{n:spr.srp}}이므로 {{t:bet|베팅}}이 {{t:pot}}보다 커야 합니다." }
      - { text: "약 {{n:cbet.size.small}} {{t:pot|팟}}", why: "이런 {{t:bet|베팅}} 세 번으로는 스택의 작은 일부만 들어갑니다. {{t:spr}} 약 {{n:spr.srp}}에서는 모든 {{t:street|스트리트}}에서 약 {{n:geo.srp.3}} {{t:pot|팟}}이 필요합니다." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "3벳 {{t:pot|팟}}, {{t:position|포지션}}을 가지고 있고, {{t:spr}} 약 {{n:spr.3bet-ip}}. 아주 강한 핸드로 같은 크기의 {{t:bet|베팅}}을 이어 리버까지 스택 전부를 넣고 싶습니다. 플롭에서 얼마를 베팅합니까?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "약 {{n:geo.3bet-ip.3}} {{t:pot|팟}}({{n:geo.3bet-ip.flop}})", correct: true, why: "맞습니다. (1 + 2f)의 세제곱 = 1 + 2·{{n:spr.3bet-ip}}에서 f ≈ {{n:geo.3bet-ip.3}}입니다. {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}}, {{n:geo.3bet-ip.river}}의 {{t:bet|베팅}}을 합하면 {{n:geo.3bet-ip.total}}, 즉 스택 전부입니다." }
      - { text: "{{n:cbet.size.small}} {{t:pot|팟}}({{n:g3b.third.flop}})", sizeError: true, why: "액션은 좋지만 사이즈가 틀렸습니다. 1/3 {{t:pot|팟}} {{t:bet|베팅}} 세 번으로는 {{n:spr.3bet-ip.stack}} 중 약 {{n:g3b.third.total}}만 들어갑니다. ‘리버까지 스택 전부’ 계획에는 약 {{n:geo.3bet-ip.3}} {{t:pot|팟}}이 필요합니다." }
      - { text: "{{t:check|체크}}하고 리버에서 올인", why: "리버에서 {{t:pot|팟}} {{n:vs3bet.pot-after}}에 {{n:spr.3bet-ip.stack}} 올인은 {{t:pot}}보다 몇 배나 큰 {{t:bet}}입니다. 상대는 아주 강한 핸드로만 이를 콜할 것입니다. 세 {{t:street|스트리트}}에 걸친 같은 크기의 {{t:bet|베팅}}은 상대에게 돈을 조금씩 넣을 기회를 줍니다." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:big-blind|빅 블라인드}}에서 3벳한 뒤의 {{t:pot|팟}}, {{t:spr}} 약 {{n:spr.3bet-oop}}. 같은 크기의 {{t:bet|베팅}}으로 리버까지 스택 전부를 넣고 싶습니다. 각 {{t:street|스트리트}}에서 {{t:pot|팟}}의 어느 비율로 베팅합니까?"
    table: { position: BB }
    options:
      - { text: "약 {{n:geo.3bet-oop.3}} {{t:pot|팟}}", correct: true, why: "맞습니다. {{t:spr}} 약 {{n:spr.3bet-oop}}에서 (1 + 2f)의 세제곱 = 1 + 2·{{n:spr.3bet-oop}}이므로 f ≈ {{n:geo.3bet-oop.3}}입니다. {{t:in-position}} 3벳 이후보다 {{t:spr}} 값이 낮으므로 사이즈도 더 작습니다." }
      - { text: "약 {{n:geo.3bet-ip.3}} {{t:pot|팟}}", sizeError: true, why: "근접하지만 이것은 {{t:spr}} 약 {{n:spr.3bet-ip}}용 사이즈입니다. {{t:spr}} 약 {{n:spr.3bet-oop}}에서는 약 {{n:geo.3bet-oop.3}} {{t:pot|팟}}으로 충분하며, 더 큰 {{t:bet|베팅}}을 하면 리버에서 온전한 {{t:bet}}을 할 스택이 모자랍니다." }
      - { text: "약 {{n:geo.4bet.3}} {{t:pot|팟}}", sizeError: true, why: "이 정도는 4벳 이후({{t:spr}} 약 {{n:spr.4bet}})에 충분합니다. {{t:spr}} 약 {{n:spr.3bet-oop}}에서 이런 {{t:bet|베팅}} 세 번은 스택의 상당 부분을 남깁니다." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "4벳 이후의 {{t:pot|팟}}, {{t:spr}} 약 {{n:spr.4bet}}. 플롭과 턴, 두 번의 {{t:bet|베팅}}으로 스택 전부를 넣고 싶습니다. 플롭에서 얼마를 베팅합니까?"
    options:
      - { text: "약 {{n:geo.4bet.2}} {{t:pot|팟}}", correct: true, why: "맞습니다. 두 {{t:street|스트리트}}라면 (1 + 2f)의 제곱 = 1 + 2·{{n:spr.4bet}}이므로 f ≈ {{n:geo.4bet.2}}입니다. {{t:bet|베팅}}과 {{t:call|콜}} 이후에는 턴에서 같은 크기의 {{t:bet}}을 할 만큼이 정확히 남습니다." }
      - { text: "약 {{n:geo.4bet.3}} {{t:pot|팟}}", sizeError: true, why: "이것은 세 {{t:street|스트리트}}용 사이즈입니다. {{n:geo.4bet.3}} {{t:pot|팟}}씩 {{t:bet|베팅}} 두 번이면 스택 일부가 리버까지 남습니다." }
      - { text: "바로 올인({{n:spr.4bet.stack}})", why: "이것은 두 스트리트가 아니라 한 {{t:street|스트리트}}용 계획입니다. 바로 약 {{n:spr.4bet}} {{t:pot|팟}} 크기의 {{t:bet|베팅}}을 하면 상대에게는 결정이 하나뿐입니다. 전부 {{t:call|콜}}하거나 {{t:fold|폴드}}하는 것입니다." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "기하학적 사이즈란 무엇을 뜻합니까?"
    options:
      - { text: "모든 {{t:street|스트리트}}에서 {{t:pot|팟}}의 같은 비율로, 마지막 {{t:bet}}이 올인이 되도록 함", correct: true, why: "맞습니다. 모든 {{t:street|스트리트}}에서 f 크기의 {{t:bet}}과 {{t:call}}은 {{t:pot|팟}}을 (1 + 2f)배로 만듭니다. 마지막 {{t:bet|베팅}} 이후 스택 전부가 {{t:pot|팟}}에 들어가도록 사이즈를 고릅니다." }
      - { text: "항상 {{t:pot|팟}} 전체 크기의 {{t:bet}}", why: "{{t:pot}} 전체는 한 가지 {{t:spr}}에서만 기하학적입니다(예: 세 {{t:street|스트리트}}라면 {{n:spr.zone.deep}}). {{t:spr}} 약 {{n:spr.3bet-ip}}에서는 약 {{n:geo.3bet-ip.3}} {{t:pot|팟}}으로 충분합니다." }
      - { text: "비율이 점점 커지는 {{t:bet|베팅}}: 플롭에서 작게, 리버에서 크게", why: "{{t:pot}}이 커지므로 금액은 늘어나지만, {{t:pot|팟}} 대비 비율은 모든 {{t:street|스트리트}}에서 같습니다. 3벳 {{t:pot|팟}}에서는 {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}}, {{n:geo.3bet-ip.river}}로, 매번 약 {{n:geo.3bet-ip.3}} {{t:pot|팟}}입니다." }
---
플롭에서 {{t:bet}}을 하기 전에, 리버까지 얼마의 돈을 넣을 수 있는지 알아 두면 좋습니다. {{t:bet|베팅}}과 {{t:call}}은 {{t:pot|팟}}에 고정 금액을 더하는 것이 아니라 팟을 몇 배로 키웁니다.

## {{t:pot}}이 커지는 방식

{{t:pot|팟}}의 f만큼의 {{t:bet|베팅}}과 {{t:call}}은 {{t:pot|팟}}을 (1 + 2f)배로 만듭니다. {{t:pot|팟}} 전체 크기의 {{t:bet|베팅}}이면 {{t:pot}}은 세 배가 됩니다.

| {{t:street|스트리트}} | {{t:bet|베팅}} 전 {{t:pot|팟}} | {{t:bet|베팅}}({{t:pot}} 전체) | {{t:call|콜}} 후 {{t:pot|팟}} |
|---|---|---|---|
| 플롭 | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| 턴 | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| 리버 | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

각 플레이어는 {{n:geo.ex.total}}, 즉 {{t:pot|팟}}의 {{n:spr.zone.deep}}배를 넣었습니다. 따라서 {{t:pot|팟}} 크기 {{t:bet|베팅}} 세 번이면 정확히 {{t:spr}} {{n:spr.zone.deep}}에서 올인이 됩니다. 첫 번째 레슨에서 본 가장 높은 {{t:spr}} 구간의 기준점이 여기서 나옵니다.

## 공식

기하학적 사이즈는 모든 {{t:street|스트리트}}에서 {{t:pot|팟}}의 같은 비율 f를 쓰되, 마지막 {{t:bet}}이 올인이 되도록 고른 것입니다. n개의 {{t:street|스트리트}}에 대해:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

예: {{t:spr}} {{n:geo.half.spr}}에서는 하프 {{t:pot|팟}} {{t:bet|베팅}} 세 번으로 스택 전부가 들어갑니다. {{t:pot|팟}} {{n:ex.pot}}에서 {{n:ex.bet.half}}, {{n:geo.half.turn}}, {{n:geo.half.river}}, 합계 {{n:geo.half.total}}입니다.

## 일반적인 {{t:pot|팟}}별 사이즈

| {{t:pot|팟}} | {{t:spr}} | 세 {{t:street|스트리트}} | 두 {{t:street|스트리트}} |
|---|---|---|---|
| {{t:open|오픈}}과 {{t:call}} | {{n:spr.srp}} | {{n:geo.srp.3}} {{t:pot|팟}} | – |
| {{t:in-position}} 3벳 | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} {{t:pot|팟}} | – |
| {{t:big-blind|빅 블라인드}}에서 3벳 | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} {{t:pot|팟}} | – |
| 4벳 | {{n:spr.4bet}} | {{n:geo.4bet.3}} {{t:pot|팟}} | {{n:geo.4bet.2}} {{t:pot|팟}} |

{{t:in-position}} 3벳 {{t:pot|팟}}에서는 {{t:bet|베팅}}이 {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}}, {{n:geo.3bet-ip.river}}로, 합계 {{n:geo.3bet-ip.total}}, 즉 스택 전부입니다.

## 싱글 레이즈 {{t:pot|팟}}은 깊습니다

{{t:spr}} 약 {{n:spr.srp}}에서 하프 {{t:pot|팟}} {{t:bet|베팅}} 세 번으로는 {{n:srp.half.total}}만, {{t:pot|팟}} 크기 {{t:bet|베팅}} 세 번으로는 {{n:spr.srp.stack}} 스택 중 {{n:srp.potbet.total}}만 들어갑니다. 스택 전부는 {{t:pot}}보다 큰 {{t:bet|베팅}}으로만 들어갑니다. 그래서 이런 {{t:pot|팟}}에서 스택 전부를 건 승부는 주로 아주 강한 핸드로 일어납니다.

:::note 언제 유용한가
기하학적 사이즈는 리버까지 스택 전부를 넣고 싶을 때, 즉 아주 강한 핸드일 때 유용합니다. 모든 핸드가 스택 전부를 걸고 싶어 하지는 않습니다. 핸드가 몇 스트리트 분량의 {{t:value|밸류}}를 감당할 수 있는지는 다음 레슨에서 다룹니다. 공식은 순수한 수학입니다. 앞선 모듈에서는 플롭 {{t:texture|텍스처}}에 맞춘 사이즈를 제시합니다. 기하학적 사이즈는 스택 전부를 거는 계획의 기준점입니다.
:::
