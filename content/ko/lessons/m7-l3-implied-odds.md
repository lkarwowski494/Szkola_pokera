---
id: m7.l3
module: m7
order: 3
title: "드로우와 임플라이드 오즈"
sub: "나중에 얼마나 더 이겨야 할까요"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "플롭에서는 리버까지 {{t:flush|플러시}}를 완성할 확률이 약 {{n:odds.flush.flop-river}}였습니다. 턴은 도움이 되지 않았습니다. 지금 확률은 얼마입니까?"
    options:
      - { text: "약 {{n:odds.flush.turn-river}}", correct: true, why: "맞습니다. 남은 카드는 한 장입니다. 보이지 않는 카드 {{n:cards.unseen.turn}}장 중 아웃 {{n:outs.flush}}장이면 {{n:odds.flush.turn-river}}이며, 플롭에서의 확률의 대략 절반입니다." }
      - { text: "아웃 수가 같으므로 여전히 약 {{n:odds.flush.flop-river}}", why: "아웃 수는 같지만 공개될 카드가 줄었습니다. {{n:odds.flush.flop-river}}의 확률은 카드 두 장을 기준으로 한 것이고, 턴에서는 한 장만 남았습니다." }
      - { text: "계산기 없이는 계산할 수 없습니다", why: "계산할 수 있습니다. M2의 2와 4의 법칙을 쓰세요. 카드가 한 장이므로 아웃 × 2, 대략 {{n:odds.flush.rule-turn}}입니다. 정확히는 {{n:odds.flush.turn-river}}입니다." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "턴입니다. {{t:flush|플러시}} 또는 {{t:straight|스트레이트}}를 만들 아웃은 몇 장입니까? 숫자를 입력하세요."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "{{t:flush|플러시}} 아웃은 하트 {{n:outs.flush}}장, {{t:straight|스트레이트}} 아웃은 모든 퀸과 모든 7, 즉 {{n:outs.oesd}}장입니다. 하트 퀸과 하트 7은 이미 플러시에 포함되어 있으므로 {{n:draw.combo.overlap}}장을 뺍니다: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:ex.pot}}이고, 상대가 {{n:ex.bet.three-quarters}} {{t:bet|베팅합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|콜합니다}}", correct: true, why: "아웃이 {{n:outs.combo}}장, 즉 리버까지 약 {{n:odds.combo.turn-river}}입니다. 필요한 확률은 {{n:eq.bet-three-quarters}}이므로 임플라이드 오즈 없이도 {{t:call|콜}}이 이득입니다." }
      - { text: "턴의 {{t:draw|드로우}}로는 부족하므로 {{t:fold|폴드합니다}}", why: "일반적인 {{t:draw|드로우}}라면 이 가격에서는 실제로 {{t:fold|폴드}}해야 하지만, {{t:flush|플러시}}와 {{t:straight|스트레이트}}를 함께 노리면 확률은 약 {{n:odds.combo.turn-river}}이며, 필요한 {{n:eq.bet-three-quarters}}보다 높습니다." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:ex.third.pot}}이고, 상대가 {{n:io.flush.bet}} {{t:bet|베팅합니다}}. {{t:flush-draw|플러시 드로우}}입니다: {{n:cards.unseen.turn}}장 중 아웃 {{n:outs.flush}}장. {{t:call|콜}}이 본전이 되려면 적중했을 때 리버에서 {{t:chips|칩}}을 추가로 얼마나 더 이겨야 합니까? 숫자를 입력하세요."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "필요한 에퀴티는 {{n:io.flush.eq}}이고, 가진 에퀴티는 약 {{n:odds.flush.turn-river}}입니다. 가능한 리버 {{n:cards.unseen.turn}}장 중 {{n:outs.flush}}번 적중하고 {{n:miss.flush.turn}}번 빗나가며, 빗나갈 때마다 {{n:io.flush.bet}}씩 잃습니다. 따라서 적중 한 번마다 벌어야 하는 금액은 {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}입니다. {{t:pot|팟}}에 있는 금액은 {{n:io.flush.pot-after-bet}}이므로 부족한 금액은 {{n:io.flush.extra}}입니다."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:io.oesd.pot}}이고, 상대가 {{n:io.oesd.bet}} {{t:bet|베팅합니다}}. {{t:oesd|양방향 스트레이트 드로우}}입니다: 아웃 {{n:outs.oesd}}장, 빗나가는 카드 {{n:miss.oesd.turn}}장. 적중했을 때 리버에서 추가로 얼마나 더 이겨야 합니까?"
    options:
      - { text: "약 {{n:io.oesd.extra}}", correct: true, why: "적중 한 번마다 벌어야 하는 금액은 {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}입니다. {{t:pot|팟}}에 있는 금액은 {{n:io.oesd.pot-after-bet}}이므로 부족한 금액은 {{n:io.oesd.extra}}입니다." }
      - { text: "약 {{n:io.oesd.need}}", why: "그것은 적중할 때마다 총 벌어야 하는 금액입니다. 그중 일부({{n:io.oesd.pot-after-bet}})는 이미 {{t:pot|팟}}에 있으므로 추가로 부족한 금액은 {{n:io.oesd.extra}}입니다." }
      - { text: "없습니다. 가격만으로 충분합니다", why: "필요한 에퀴티는 {{n:eq.bet-half}}이고, 가진 에퀴티는 약 {{n:odds.oesd.turn-river}}입니다. {{t:pot|팟}}만으로는 부족하며, 부족한 금액은 {{n:io.oesd.extra}}입니다." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:ex.third.pot}}이고, 상대가 {{n:io.flush.bet}} {{t:bet|베팅합니다}}. 두 사람 모두 아직 {{n:io.flush.stack}}씩 남아 있고, 상대는 에이스 {{t:pair|페어}}로 기꺼이 돈을 지불합니다. 어떻게 하시겠습니까?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|콜합니다}}", correct: true, why: "가격만으로는 부족하지만({{n:io.flush.eq}} 대 약 {{n:odds.flush.turn-river}}), 적중하면 {{n:io.flush.extra}}만 더 이기면 됩니다. 가장 높은 {{t:flush|플러시}}를 노리는 {{t:draw|드로우}}이고(하트 에이스가 {{t:board|보드}}에 있으므로 킹 하이 {{t:flush|플러시}}가 가장 높습니다), 상대에게는 {{t:chips|칩}}이 많이 남아 있으며, 에이스 {{t:pair|페어}}를 가진 플레이어는 리버에서 이런 베팅에 자주 돈을 지불합니다. 적중은 눈에 보이지만(세 번째 하트), 에이스 {{t:pair|페어}}를 가진 상대는 그래도 자주 지불합니다. 그래서 여기서의 임플라이드 오즈는 숨겨진 적중일 때보다 작습니다." }
      - { text: "{{n:odds.flush.turn-river}}의 확률로는 {{n:io.flush.eq}}에 못 미치므로 {{t:fold|폴드합니다}}", why: "팟 오즈는 ‘{{t:fold|폴드}}’라고 하지만, 임플라이드 오즈를 무시하고 있습니다. 부족한 금액은 {{n:io.flush.extra}}뿐이고, 상대에게는 {{n:io.flush.stack}}의 스택과 돈을 지불할 핸드가 있습니다." }
      - { text: "올인 {{t:raise|레이즈합니다}}", why: "에이스 {{t:pair|페어}}를 가진 상대는 아마 {{t:call|콜할}} 것이고, 그러면 확률은 약 {{n:odds.flush.turn-river}}뿐입니다. 리버를 싸게 보고 적중했을 때 더 많이 이기는 편이 낫습니다." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:ex.pot}}이고, 상대가 {{n:ex.bet.half}} {{t:bet|베팅합니다}}. 거트샷입니다. 적중한 뒤 더 이겨야 하는 금액은 {{n:io.gut.extra}}인데, 상대에게 남은 스택은 {{n:io.gut.stack}}뿐입니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:fold|폴드합니다}}", correct: true, why: "거트샷의 확률은 약 {{n:odds.gutshot.turn-river}}이고, 필요한 확률은 {{n:eq.bet-half}}입니다. 임플라이드 오즈도 도움이 되지 않습니다. 상대가 남은 {{n:io.gut.stack}} 전부를 넣어도 부족한 {{n:io.gut.extra}}만큼을 채우지 못합니다." }
      - { text: "임플라이드 오즈가 있으므로 {{t:call|콜합니다}}", why: "임플라이드 오즈는 상대가 앞으로 더 지불할 수 있는 {{t:chips|칩}}입니다. 상대에게는 {{n:io.gut.stack}}뿐인데, 필요한 금액은 {{n:io.gut.extra}}입니다." }
      - { text: "올인 {{t:raise|레이즈합니다}}", why: "아웃 {{n:outs.gutshot}}장으로 하는 올인 {{t:bluff|블러프}}는 모든 것을 겁니다. 이렇게 적은 스택으로 {{t:pot|팟}}의 절반을 {{t:bet|베팅한}} 상대는 더는 {{t:fold|폴드하지}} 않는 경우가 많습니다." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:ex.pot}}이고, 신중한 상대가 {{t:pot|팟}} 전체를 {{t:bet|베팅합니다}}: {{n:ex.bet.pot}}. 어떻게 하시겠습니까?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|폴드합니다}}", correct: true, why: "필요한 확률은 {{n:eq.bet-pot}}이고, 가진 확률은 약 {{n:odds.flush.turn-river}}입니다. 게다가 이 {{t:flush|플러시}}는 낮습니다. 하트가 나오면 하트 퀸이나 하트 잭을 가진 상대가 더 높은 {{t:flush|플러시}}를 가지게 되고, 그때 가장 많이 잃습니다(리버스 임플라이드 오즈)." }
      - { text: "임플라이드 오즈가 있으므로 {{t:call|콜합니다}}", why: "여기서는 임플라이드 오즈가 나쁩니다. 완성된 {{t:flush|플러시}}가 더 높은 플러시에 질 수 있고, {{t:board|보드}}의 세 번째 하트는 누구나 봅니다. 부족한 몫도 매우 큽니다. 가격은 {{n:eq.bet-pot}}입니다." }
      - { text: "{{t:raise|레이즈합니다}}", why: "에이스와 킹이 있는 {{t:board|보드}}에서 {{t:pot|팟}} 전체를 {{t:bet|베팅하는}} 신중한 상대는 좀처럼 {{t:fold|폴드하지}} 않습니다. 적중해도 질 수 있는 핸드로 많은 것을 거는 셈입니다." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "임플라이드 오즈가 가장 클 때는 언제입니까?"
    options:
      - { text: "가장 좋은 핸드를 노리는 {{t:draw|드로우}}가 있고, 상대에게 강한 핸드와 많은 {{t:chips|칩}}이 있을 때", correct: true, why: "맞습니다. 그러면 적중했을 때 이기고, 상대에게는 지불할 칩도, 지불할 핸드도 있습니다." }
      - { text: "상대의 {{t:chips|칩}}이 적을 때(낮은 {{t:spr|SPR}})", why: "반대입니다. {{t:spr|SPR}}이 낮으면 상대가 더 지불할 것이 남아 있지 않으므로 임플라이드 오즈가 작습니다." }
      - { text: "낮은 {{t:flush|플러시}}를 노리는 {{t:draw|드로우}}가 있을 때", why: "그것은 리버스 임플라이드 오즈입니다. 적중하고도 질 때가 있고, 그것도 큰 {{t:pot|팟}}에서입니다." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "턴이 시작될 때 {{t:pot|팟}}은 {{n:ex.pot}}이고, 두 사람의 스택 중 작은 쪽은 {{n:spr.stack.high}}입니다. {{t:spr|SPR}}은 얼마입니까?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr|SPR}} = 스택 ÷ {{t:pot|팟}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. 상대에게 {{t:pot|팟}} 몇 개 분량이 남아 있으므로 임플라이드 오즈가 클 수 있습니다." }
      - { text: "{{n:spr.low}}", why: "스택이 {{n:spr.stack.low}}일 때의 값입니다. 여기서 스택은 {{n:spr.stack.high}}입니다." }
      - { text: "{{n:ex.pot}}", why: "그것은 {{t:pot|팟}}입니다. {{t:spr|SPR}}은 비율, 즉 스택을 {{t:pot|팟}}으로 나눈 값입니다." }
---
턴에서는 남은 카드가 한 장뿐입니다. {{t:draw|드로우}}의 확률은 대략 절반으로 줄고, 다음 카드의 가격은 보통 올라갑니다. 그래서 턴에서는 더 정확하게 계산하고 새로운 질문을 던집니다. 적중하면 나중에 얼마나 이길 수 있을까?

## 남은 카드 한 장

| {{t:draw|드로우}} | 아웃 | 플롭 → 리버 | 턴 → 리버 |
|---|---|---|---|
| {{t:flush|플러시}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| 양방향 {{t:straight|스트레이트}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| 거트샷 | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|플러시}} + 양방향 {{t:straight|스트레이트}} | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

M2의 2와 4의 법칙을 쓰면 아웃에 2를 곱합니다. 두 {{t:draw|드로우}}에 겹치는 카드가 있으면 그 카드는 한 번만 셉니다.

## 임플라이드 오즈

임플라이드 오즈(숨은 오즈)는 적중했을 때 리버에서 이길 {{t:chips|칩}}입니다. 예: {{t:pot|팟}}은 {{n:ex.third.pot}}이고, 상대가 {{n:io.flush.bet}} {{t:bet|베팅하며}}, 당신은 {{t:flush-draw|플러시 드로우}}를 가지고 있습니다. 필요한 에퀴티는 {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}}이고, 가진 에퀴티는 약 {{n:odds.flush.turn-river}}입니다. {{t:pot|팟}}만으로는 부족합니다.

가능한 리버 {{n:cards.unseen.turn}}장 중 {{n:outs.flush}}번 적중하고 {{n:miss.flush.turn}}번 빗나갑니다. 본전이 되려면 적중 한 번마다 빗나감의 비용만큼 벌어야 합니다:

```formula
필요한 수익 = 콜 금액 × (빗나가는 카드 ÷ 아웃)
```

여기서는: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. {{t:pot|팟}}에 있는 금액은 {{n:io.flush.pot-after-bet}}이므로, 리버에서 추가로 받아야 하는 금액은 평균 **{{n:io.flush.extra}}**입니다.

## {{t:spr|SPR}}: 상대에게 남은 {{t:chips|칩}}

{{t:spr|SPR}}(스택 대 {{t:pot|팟}} 비율)은 {{t:effective-stack|유효 스택}}, 즉 두 스택 중 작은 쪽을 {{t:street|스트리트}}가 시작될 때의 {{t:pot|팟}}으로 나눈 값입니다. {{t:spr|SPR}}은 어느 {{t:street|스트리트}}에서나 계산할 수 있으며, 여기서는 턴에서 계산합니다. {{t:pot|팟}}이 {{n:ex.pot}}이고 스택이 {{n:spr.stack.high}}이면 {{t:spr|SPR}}은 {{n:spr.high}}이며, 상대에게 아직 {{t:pot|팟}} 몇 개 분량이 남아 있다는 뜻입니다. 스택이 {{n:spr.stack.low}}이면 {{n:spr.low}}에 불과합니다. 임플라이드 오즈는 상대가 아직 앞에 가지고 있는 {{t:chips|칩}}보다 클 수 없습니다. {{t:spr|SPR}}이 낮으면 거의 팟 오즈만 중요합니다. {{t:spr|SPR}}에 대해서는 “핸드 계획” 모듈(M9)에서 더 다룹니다. 이 모듈은 플롭의 {{t:spr|SPR}}에 따라 핸드를 계획합니다.

## 임플라이드 오즈가 실제로 존재할 때

- **가장 좋은 핸드**를 노리는 {{t:draw|드로우}}가 있고(가능한 가장 높은 {{t:flush|플러시}}, 보통 에이스 포함),
- 상대에게 돈을 지불할 **강한 핸드**가 있고,
- 상대에게 **{{t:chips|칩}}이 많이** 남아 있고(높은 {{t:spr|SPR}}),
- 적중이 **눈에 잘 띄지 않을 때**(예: 거트샷은 {{t:board|보드}}의 세 번째 하트보다 덜 눈에 띕니다).

리버스 임플라이드 오즈는 당신에게 불리하게 작용합니다. 낮은 {{t:flush|플러시}}를 노리는 {{t:draw|드로우}}가 있거나, {{t:board|보드}}에 {{t:flush|플러시}}가 완성될 수 있는데 {{t:straight|스트레이트}}를 노리는 {{t:draw|드로우}}가 있을 때는 적중하고도 질 때가 있고, 그것도 큰 {{t:pot|팟}}에서입니다.

:::note 이 원칙의 출처
임플라이드 오즈 계산은 {{t:expected-value|기댓값}}에서 나온 정확한 계산입니다. 임플라이드 오즈가 실제로 존재하는 조건과 리버스 임플라이드 오즈는 교육 자료에서 가져온 휴리스틱입니다.
:::
