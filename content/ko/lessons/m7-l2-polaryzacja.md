---
id: m7.l2
module: m7
order: 2
title: "폴라라이제이션"
sub: "큰 베팅: 강한 핸드와 세미 블러프"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "턴의 베팅 {{t:range|레인지}} 중 {{t:polarized|폴라라이즈드}} 레인지는 어느 것입니까?"
    options:
      - { text: "셋, {{t:two-pair|투 페어}}, {{t:draw|드로우}}. 중간 {{t:pair|페어}}는 없음", correct: true, why: "맞습니다. {{t:polarized|폴라라이즈드}} {{t:range|레인지}}에는 두 극단이 있습니다. 매우 강한 핸드와 {{t:semi-bluff|세미 블러프}}입니다. 가운데, 즉 중간 핸드는 여기에 없습니다. 이런 핸드는 {{t:check|체크}}합니다." }
      - { text: "{{t:top-pair|탑 페어}}, 중간 {{t:pair|페어}}, 더 약한 {{t:pair|페어}}", why: "여기에는 극단이 하나도 없습니다. 매우 강한 핸드와 {{t:semi-bluff|세미 블러프}}가 빠져 있고, 위에서 아래로 {{t:pair|페어}}만 있습니다. 이는 {{t:linear|리니어}} {{t:range|레인지}}에 더 가깝습니다. 리니어 레인지는 주로 밸류 핸드로 베팅하며, 턴의 큰 사이즈가 아니라 보통 작은 사이즈를 씁니다." }
      - { text: "{{t:bluff|블러프}}만", why: "강한 핸드가 없는 {{t:range|레인지}}는 상대가 쉽게 알아채고 {{t:call|콜}}할 것입니다. {{t:polarized|폴라라이즈드}} {{t:range|레인지}}는 {{t:bluff|블러프}}와 매우 강한 핸드를 함께 담습니다." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "{{t:dry|드라이한}} 플롭 [[Ks 7d 2c]]에서 셋부터 약한 {{t:pair|페어}}까지 거의 모든 핸드로 작게 베팅했습니다. 이런 베팅 {{t:range|레인지}}를 무엇이라고 합니까?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|리니어}}", correct: true, why: "맞습니다. 강한 핸드와 중간 핸드가 함께, 작은 사이즈로 베팅합니다. {{t:range-advantage|레인지 우위}}가 있는 {{t:dry|드라이한}} 하이 플롭에서 쓰는 M5의 플랜입니다." }
      - { text: "{{t:polarized|폴라라이즈드}}", why: "{{t:polarized|폴라라이즈드}} {{t:range|레인지}}에는 중간 핸드가 없습니다. 매우 강한 핸드와 {{t:bluff|블러프}}만 베팅합니다. 여기서는 약한 {{t:pair|페어}}도 베팅했습니다." }
      - { text: "캡드", why: "캡드 {{t:range|레인지}}는 가장 강한 핸드가 빠진 레인지입니다. 당신은 셋으로도 베팅했습니다." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "중간 {{t:pair|페어}}는 왜 턴의 큰 베팅을 좋아하지 않습니까?"
    options:
      - { text: "더 나쁜 핸드는 {{t:fold|폴드}}하고, 더 좋은 핸드는 돈을 내기 때문에", correct: true, why: "맞습니다. 중간 {{t:pair|페어}}로 하는 큰 베팅은 더 나쁜 핸드가 돈을 낼 때만 이익이 되는데, 그런 핸드는 큰 베팅에 보통 {{t:fold|폴드}}합니다. 남는 것은 당신을 이기는 핸드의 {{t:call|콜}}입니다." }
      - { text: "큰 베팅은 항상 {{t:bluff|블러프}}이기 때문에", why: "아닙니다. 가장 강한 핸드도 크게 {{t:bet|베팅}}합니다. 중간 {{t:pair|페어}}의 문제는 누가 돈을 내 주느냐입니다." }
      - { text: "중간 {{t:pair|페어}}는 이길 수 없기 때문에", why: "이길 수 있습니다. {{t:bluff|블러프}}와 더 약한 {{t:pair|페어}}를 이깁니다. 그래서 {{t:check|체크}}하고 싸게 쇼다운까지 갑니다." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "버튼에서 {{t:open|오픈}}했고, {{t:big-blind|빅 블라인드}}가 플롭 c-bet을 {{t:call|콜}}했습니다. 턴은 2입니다. {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{t:check|체크}}합니다. 당신은 셋을 가지고 있습니다. 어떻게 하겠습니까?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "{{n:ex.bet.three-quarters}} 베팅", correct: true, why: "맞습니다. 상대는 {{t:flush|플러시}}(하트 두 장)와 {{t:straight|스트레이트}}(예: 65, T9)로 가는 {{t:draw|드로우}}를 가지고 있을 수 있습니다. {{t:pot|팟}}의 3/4 베팅에서 {{t:flush-draw|플러시 드로우}}에게 필요한 에퀴티는 {{n:eq.bet-three-quarters}}이고, {{t:flush|플러시}}는 약 {{n:odds.flush.turn-river}}의 확률로 완성됩니다. 당신의 셋을 상대로는 더 적습니다. [[4h]]와 [[2h]]는 당신에게 {{t:full-house|풀하우스}}를 만들어 주므로, 상대에게 남은 클린 아웃은 {{n:outs.flush.vs-set}}장, 약 {{n:odds.flush.vs-set}}입니다. 상대는 너무 비싸게 지불합니다." }
      - { text: "{{n:ex.bet.quarter}} 베팅", sizeError: true, why: "액션은 맞지만 사이즈가 틀렸습니다. {{t:pot|팟}}의 1/4 베팅에서는 {{t:draw|드로우}}에게 필요한 에퀴티가 {{n:eq.bet-quarter}}뿐이므로 좋은 가격을 받습니다. {{t:flush-draw|플러시 드로우}}가 있는 {{t:board|보드}}에서 매우 강한 핸드로는 크게 베팅합니다." }
      - { text: "{{t:check|체크}}", why: "공짜 카드는 {{t:draw|드로우}}에게 주는 선물이고, 리버 전에 {{t:pot|팟}}을 키우지도 못합니다. {{t:flush-draw|플러시 드로우}}가 있는 {{t:board|보드}}에서 셋은 베팅합니다." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "버튼에서 {{t:open|오픈}}했고, {{t:big-blind|빅 블라인드}}가 플롭 c-bet을 {{t:call|콜}}했습니다. 턴은 3입니다. {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{t:check|체크}}합니다. 어떻게 하겠습니까?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "{{n:ex.bet.three-quarters}} 베팅", correct: true, why: "맞습니다. 하이 카드 두 장이 있는 {{t:flush-draw|플러시 드로우}}는 좋은 {{t:semi-bluff|세미 블러프}}입니다. 강한 핸드와 같은 큰 사이즈로 베팅하므로 상대는 {{t:bluff|블러프}}와 밸류를 구별하지 못합니다." }
      - { text: "{{n:ex.bet.quarter}} 베팅", sizeError: true, why: "액션은 맞지만 사이즈가 틀렸습니다. 이렇게 싼 베팅은 상대가 어떤 {{t:pair|페어}}로든 {{t:call|콜}}할 것이고, {{t:semi-bluff|세미 블러프}}는 주로 {{t:fold|폴드}}로 이익을 냅니다. 당신의 작은 베팅이 {{t:draw|드로우}}를, 큰 베팅이 강한 핸드를 뜻한다면 상대는 이를 쉽게 이용할 것입니다." }
      - { text: "{{t:check|체크}}", correct: true, why: "이것도 괜찮습니다. 공짜로 리버를 보고 {{n:odds.flush.turn-river}}의 확률로 {{t:flush|플러시}}를 완성합니다. 하지만 보통은 베팅이 더 좋습니다. 하이 카드가 있는 {{t:draw|드로우}}는 가장 좋은 {{t:semi-bluff|세미 블러프}} 중 하나이고, {{t:check|체크}}하면 {{t:pot|팟}}을 바로 이길 기회를 포기하기 때문입니다." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "버튼에서 {{t:open|오픈}}했고, {{t:big-blind|빅 블라인드}}가 플롭 c-bet을 {{t:call|콜}}했습니다. 턴은 5입니다. {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{t:check|체크}}합니다. 어떻게 하겠습니까?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|체크}}", correct: true, why: "키커가 약한 {{t:top-pair|탑 페어}}는 중간 핸드입니다. 큰 베팅에는 주로 더 좋은 킹(AK, KQ, KJ)이 돈을 내고, 더 나쁜 핸드는 {{t:fold|폴드}}합니다. {{t:check|체크}}하면 싸게 쇼다운까지 갑니다." }
      - { text: "{{n:ex.bet.three-quarters}} 베팅", why: "큰 베팅은 {{t:polarized|폴라라이즈드}} {{t:range|레인지}}에 어울립니다. 이 핸드로는 주로 당신을 이기는 핸드에게서 돈을 받습니다." }
      - { text: "{{n:ex.bet.pot}} 베팅", why: "중간 강도의 핸드로 {{t:pot|팟}}을 더 크게 키우는 것입니다. 더 나쁜 핸드는 거의 항상 {{t:fold|폴드}}하고, 더 좋은 핸드는 돈을 냅니다." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:ex.pot}}이고, 매우 강한 핸드로 {{n:ex.bet.three-quarters}}만큼 베팅합니다. {{t:draw|드로우}}를 가진 상대가 {{t:call|콜}}하려면 몇 퍼센트의 에퀴티가 필요합니까? 숫자를 입력하세요."
    answer: eq.bet-three-quarters
    explanation: "상대는 {{t:pot|팟}}에 {{n:ex.bet.three-quarters}}만큼 넣어야 하고, {{t:call|콜}} 후 팟은 {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}가 됩니다. 따라서 {{n:eq.bet-three-quarters}}입니다. 턴에서 {{t:flush-draw|플러시 드로우}}의 확률은 약 {{n:odds.flush.turn-river}}이므로 상대는 너무 비싸게 지불합니다."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "턴입니다. 셋을 가지고 있고, {{n:ex.pot}} {{t:pot|팟}}에 {{n:ex.bet.quarter}}만 베팅합니다. 상대는 {{t:flush-draw|플러시 드로우}}(리버까지 약 {{n:odds.flush.turn-river}})를 가지고 있습니다. 여기서 무엇을 알 수 있습니까?"
    options:
      - { text: "좋은 가격을 받습니다. 필요한 에퀴티는 {{n:eq.bet-quarter}}뿐입니다", correct: true, why: "맞습니다. {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}로, 상대의 {{n:odds.flush.turn-river}}보다 적습니다. 상대에게는 {{t:call|콜}}이 이득이고, 당신의 작은 베팅은 밸류의 일부를 내줍니다." }
      - { text: "필요한 에퀴티가 {{n:eq.bet-three-quarters}}이므로 {{t:fold|폴드}}해야 합니다", why: "그건 {{t:pot|팟}}의 3/4 베팅일 때 필요한 값입니다. {{t:pot|팟}}의 1/4 베팅에서는 {{n:eq.bet-quarter}}면 충분합니다." }
      - { text: "어차피 당신이 이기고 있으므로 가격은 중요하지 않습니다", why: "지금은 이기고 있지만, 약 {{n:odds.flush.turn-river}}의 확률로 상대가 리버에서 이깁니다. 베팅 사이즈가 그 기회에 상대가 너무 많이 지불하는지, 너무 적게 지불하는지를 결정합니다." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "턴에서 상대가 {{t:oesd|오픈엔디드 스트레이트 드로우}}를 가지고 있습니다. 리버까지 약 {{n:odds.oesd.turn-river}}입니다. 당신의 베팅이 얼마부터 상대가 너무 비싸게 지불하는 것입니까(팟 오즈만 계산)?"
    options:
      - { text: "벌써 {{t:pot|팟}}의 1/3부터입니다. 필요한 에퀴티는 {{n:eq.bet-third}}입니다", correct: true, why: "맞습니다. {{n:eq.bet-third}}는 {{n:odds.oesd.turn-river}}보다 큽니다. 턴에서는 {{t:draw|드로우}}에게 남은 카드가 한 장뿐이므로, 중간 베팅만으로도 나쁜 가격을 줍니다." }
      - { text: "{{t:pot|팟}} 전체 베팅부터입니다. 필요한 에퀴티는 {{n:eq.bet-pot}}입니다", why: "{{t:pot|팟}} 전체 베팅에서는 훨씬 비싸게 지불하지만, {{t:pot|팟}}의 1/3에서 이미 {{n:eq.bet-third}}가 필요해 자신의 {{n:odds.oesd.turn-river}}보다 많습니다." }
      - { text: "절대 아닙니다. {{t:draw|드로우}}는 언제든 {{t:call|콜}}할 수 있습니다", why: "{{t:draw|드로우}}는 가격이 좋거나 임플라이드 오즈가 있을 때만 {{t:call|콜}}합니다(다음 레슨). 턴에서는 약 {{n:odds.oesd.turn-river}}이므로 대부분의 베팅은 드로우에게 나쁜 가격입니다." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "턴입니다. {{t:pot|팟}}은 {{n:ex.pot}}이고, {{t:pot|팟}} 전체인 {{n:ex.bet.pot}}만큼 베팅합니다. 상대가 {{t:call|콜}}하려면 몇 퍼센트의 에퀴티가 필요합니까? 숫자를 입력하세요."
    answer: eq.bet-pot
    explanation: "상대는 {{t:pot|팟}}에 {{n:ex.bet.pot}}만큼 넣어야 하고, {{t:call|콜}} 후 팟은 {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}가 됩니다. 따라서 {{n:eq.bet-pot}}입니다. {{t:flush|플러시}} 드로우(약 {{n:odds.flush.turn-river}})도, 오픈엔디드 {{t:straight|스트레이트}} 드로우(약 {{n:odds.oesd.turn-river}})도 그만큼의 확률은 없습니다."
---
플롭에서는 거의 모든 {{t:range|레인지}}로 작게 베팅하는 경우가 많았습니다. 턴에서는 베팅 {{t:range|레인지}}가 바뀝니다. 매우 강한 핸드와 {{t:semi-bluff|세미 블러프}}가 남고, 중간 핸드는 {{t:check|체크}}합니다. 이런 {{t:range|레인지}}를 {{t:polarized|폴라라이즈드}} 레인지라고 합니다.

## 두 가지 {{t:range|레인지}}

- **{{t:linear|리니어}}:** 가장 강한 핸드부터 아래로, 중간 핸드까지 함께 베팅합니다. 보통 작은 사이즈로 베팅합니다. 예: [[Ks 7d 2c]]에서 {{t:pot|팟}}의 {{n:cbet.size.small}} c-bet.
- **{{t:polarized|폴라라이즈드}}:** 두 극단이 베팅합니다. 매우 강한 핸드(셋, {{t:two-pair|투 페어}}, {{t:straight|스트레이트}}, 플러시)와 {{t:semi-bluff|세미 블러프}}({{t:draw|드로우}})입니다. 중간 핸드는 없습니다.

일반적으로 {{t:polarized|폴라라이즈드}} {{t:range|레인지}}는 매우 강한 핸드와 {{t:bluff|블러프}}로 이루어집니다. 턴에서 {{t:bluff|블러프}}는 보통 {{t:semi-bluff|세미 블러프}}이고, 리버(M8)에서는 쇼다운에서 이길 가능성이 없는 핸드입니다.

## 턴에서 폴라라이즈하는 이유

상대가 플롭에서 {{t:call|콜}}했으므로, 보통 {{t:pair|페어}}나 {{t:draw|드로우}}를, 때로는 백도어가 있는 하이 카드(M6)를 가지고 있습니다. 중간 핸드는 두 번째 베팅으로 얻는 것이 없습니다. 더 나쁜 핸드는 {{t:fold|폴드}}하고, 더 좋은 핸드는 돈을 냅니다. 강한 핸드는 리버 전에 {{t:pot|팟}}을 키우고 싶어 하고, {{t:semi-bluff|세미 블러프}}는 {{t:fold|폴드}}가 필요하며 {{t:call|콜}}을 받아도 아웃이 있습니다.

## {{t:polarized|폴라라이즈드}} {{t:range|레인지}}, 큰 베팅

{{t:polarized|폴라라이즈드}} {{t:range|레인지}}는 크게 베팅합니다. 예: {{t:pot|팟}}의 3/4. 강한 핸드는 더 많은 {{t:chips|칩}}을 얻어 내고, {{t:semi-bluff|세미 블러프}}는 바로 이기는 경우가 많아집니다. 중간 핸드는 {{t:check|체크}}합니다. {{t:bluff|블러프}}와 강한 핸드가 같은 사이즈로 베팅하면 상대는 당신의 핸드를 알 수 없습니다.

## {{t:draw|드로우}}의 가격

턴에서 {{t:draw|드로우}}에게 남은 카드는 한 장뿐입니다. 큰 베팅은 드로우가 너무 비싸게 지불하게 만듭니다.

| 당신의 베팅 | 상대에게 필요한 에퀴티 | {{t:flush|플러시}}의 확률 | 오픈엔디드 {{t:straight|스트레이트}}의 확률 |
|---|---|---|---|
| {{t:pot|팟}}의 1/4 | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|팟}}의 1/3 | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|팟}}의 1/2 | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|팟}}의 3/4 | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|팟}} 전체 | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

{{t:pot|팟}}의 1/4 베팅에서는 {{t:flush-draw|플러시 드로우}}가 좋은 가격을 받습니다. {{t:pot|팟}}의 1/3에서는 가격이 {{t:flush|플러시}}의 확률과 거의 같고({{n:eq.bet-third}} 대 {{n:odds.flush.turn-river}}), {{t:pot|팟}}의 1/2 이상부터는 {{t:flush|플러시}}가 분명히 너무 비싸게 지불합니다. 단, 임플라이드 오즈를 기대하는 경우(다음 레슨)는 예외입니다. 이 레슨의 {{t:draw|드로우}} 문제는 팟 오즈만 계산합니다.

:::note 이 원칙의 출처
{{t:polarized|폴라라이즈드}} {{t:range|레인지}}와 {{t:linear|리니어}} {{t:range|레인지}}의 개념, 그리고 “{{t:polarized|폴라라이즈드}} {{t:range|레인지}}는 크게 베팅하고, 중간 핸드는 {{t:check|체크}}한다”는 원칙은 교육 자료에서 나온 것으로, 여기서는 휴리스틱입니다. 강하지만 취약한 핸드로 크게 베팅하라는 권장도 마찬가지입니다. 솔버는 턴에서 작은 사이즈도 사용합니다. {{t:pot|팟}}의 3/4 사이즈는 연습용 예시일 뿐, 유일하게 좋은 사이즈는 아닙니다. 표의 가격은 앱이 정확히 계산한 값입니다.
:::
