---
id: m6.l3
module: m6
order: 3
title: "체크레이즈"
sub: "C벳을 언제, 얼마까지 레이즈할까"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크하자}} 버튼이 {{t:pot|팟}}의 1/3 크기로 C벳을 {{t:bet|벳합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "체크레이즈", correct: true, why: "낮고 {{t:connected|커넥티드한}} 플롭의 {{t:two-pair|투 페어}}는 {{t:value|밸류}} 핸드입니다. 이런 플롭에서는 {{t:big-blind|빅 블라인드}}가 버튼보다 가장 강한 조합을 더 많이 가집니다. {{t:raise|레이즈}}로 {{t:pot|팟}}을 키우고 {{t:pair|페어}}와 {{t:draw|드로우}}가 돈을 내게 만듭니다." }
      - { text: "{{t:call|콜}}", correct: true, why: "이것도 좋습니다. 매우 {{t:connected|커넥티드한}} 플롭에서는 솔버가 {{t:two-pair|투 페어}}의 일부를 {{t:call|콜}}만 합니다. 체크레이즈가 더 자주 {{t:pot|팟}}을 키우고 핸드를 보호합니다." }
      - { text: "{{t:fold|폴드}}", why: "{{t:two-pair|투 페어}}는 이 플롭에서 가장 강한 핸드 중 하나입니다. {{t:fold|폴드}}는 큰 실수입니다." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|팟}}은 {{n:ex.third.pot}}입니다. 버튼이 {{n:ex.third.bet}} 크기로 C벳을 {{t:bet|벳합니다}}. 셋을 가지고 있어 체크레이즈를 하려고 합니다. 얼마까지 {{t:raise|레이즈하시겠습니까}}?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "{{n:xr.example}}까지", correct: true, why: "C벳의 {{n:xr.mult.example}} 크기입니다. 버튼은 {{n:xr.example.extra}}만큼 더 내야 하고 약 {{n:eq.vs-xr.example}}의 에퀴티가 필요합니다. 더 약한 {{t:pair|페어}}와 약한 {{t:draw|드로우}}(거트샷)는 가격이 맞지 않고, {{t:flush|플러시}} 드로우와 {{t:oesd|OESD}}는 이제 큰 {{t:pot|팟}}에 돈을 내게 됩니다." }
      - { text: "{{n:xr.too-small}}까지", sizeError: true, why: "액션은 맞지만 사이즈가 너무 작습니다. 버튼은 {{n:xr.too-small.extra}}만큼만 더 내면 되고 약 {{n:eq.vs-xr.too-small}}의 에퀴티가 필요합니다. 모든 {{t:flush-draw|플러시 드로우}}나 {{t:straight|스트레이트}} 드로우가 거의 공짜로 따라옵니다." }
      - { text: "{{t:call|콜}}", why: "하트 두 장과 {{t:straight|스트레이트}}로 이어지는 카드가 깔린 플롭에서는 밸류와 보호를 잃습니다. 많은 턴 카드가 액션을 멈추게 하거나 핸드를 역전합니다. 셋은 지금 바로 {{t:pot|팟}}을 키우고 싶은 핸드입니다." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|팟}}은 {{n:ex.third.pot}}입니다. 버튼이 {{n:ex.third.bet}} 크기로 C벳을 {{t:bet|벳합니다}}. C벳의 {{n:xr.mult.example}} 크기로 체크레이즈합니다. 얼마까지 {{t:raise|레이즈합니까}}? {{t:chips|칩}} 수를 입력하세요."
    table: { position: BB }
    answer: xr.example
    explanation: "C벳이 {{n:ex.third.bet}}이므로, C벳의 {{n:xr.mult.example}} 크기는 {{n:xr.example}}입니다. 체크레이즈 사이즈는 {{t:pot|팟}}이 아니라 C벳을 기준으로 계산합니다."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|팟}}이 {{n:ex.third.pot}}인 상황에서 버튼이 {{n:ex.third.bet}}만큼 {{t:bet|벳했고}}, {{n:xr.example}}까지 {{t:raise|레이즈했습니다}}. 버튼이 {{t:call|콜하려면}} 에퀴티가 몇 퍼센트 필요합니까? 숫자를 입력하세요."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "버튼은 {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}만큼 더 냅니다. 그 시점의 {{t:pot|팟}}은 {{n:xr.example.pot-after}}이고, 버튼이 {{t:call|콜하면}} {{n:xr.example.extra}}만큼 더 커집니다. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|팟}}이 {{n:ex.third.pot}}인 상황에서 버튼이 {{n:ex.third.bet}}만큼 {{t:bet|벳했고}}, {{n:xr.too-small}}까지만 {{t:raise|레이즈했습니다}}. 버튼이 {{t:call|콜하려면}} 에퀴티가 얼마나 필요합니까?"
    table: { position: BB }
    options:
      - { text: "약 {{n:eq.vs-xr.too-small}}", correct: true, why: "{{t:pot|팟}} {{n:xr.too-small.pot-after}}에 {{n:xr.too-small.extra}}만큼 더 냅니다: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. 이렇게 싸면 거의 모든 핸드로 콜하므로, {{t:raise|레이즈}}는 C벳보다 몇 배 커야 합니다." }
      - { text: "약 {{n:eq.vs-xr.example}}", why: "{{n:xr.example}}까지의 {{t:raise|레이즈}}에 필요한 에퀴티입니다. {{n:xr.too-small}}까지라면 {{n:xr.too-small.extra}}만큼만 더 내면 됩니다." }
      - { text: "약 {{n:eq.bet-third}}", why: "직접 C벳에 {{t:call|콜할}} 때 필요했던 에퀴티입니다. 체크레이즈 후에는 버튼의 가격을 계산합니다. 버튼은 {{t:pot|팟}} {{n:xr.too-small.pot-after}}에 {{n:xr.too-small.extra}}만큼 더 냅니다." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크하자}} 버튼이 {{t:pot|팟}}의 1/3 크기로 C벳을 {{t:bet|벳합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "체크레이즈", correct: true, why: "최고의 {{t:flush|플러시}}를 노리는 {{t:draw|드로우}}는 좋은 {{t:semi-bluff|세미 블러프}}입니다. 버튼이 {{t:fold|폴드하면}} 이기고, 콜하더라도 여전히 {{n:outs.flush}}개의 아웃(턴에서 약 {{n:odds.flush.flop-turn}})이 있습니다." }
      - { text: "{{t:call|콜}}", correct: true, why: "이것도 좋습니다. 턴에서 약 {{n:odds.flush.flop-turn}}의 확률로 {{t:flush|플러시}}를 맞히는데, 이는 가격 {{n:eq.bet-third}}에 거의 맞먹고, 최고의 {{t:flush|플러시}}를 맞히면 더 많이 이깁니다(임플라이드 오즈). 강한 {{t:draw|드로우}}는 두 방식 모두로 플레이해서, 체크레이즈가 강한 핸드만 의미하지 않게 합니다." }
      - { text: "{{t:fold|폴드}}", why: "큰 실수입니다. {{n:outs.flush}}개의 아웃으로 턴에서 약 {{n:odds.flush.flop-turn}}의 확률로 최고의 {{t:flush|플러시}}를 맞히는데, 이는 가격 {{n:eq.bet-third}}에 거의 맞먹고, 맞히면 더 많이 이깁니다(임플라이드 오즈). 게다가 체크레이즈도 할 수 있습니다." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크하자}} 버튼이 {{t:pot|팟}}의 1/3 크기로 C벳을 {{t:bet|벳합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "체크레이즈", correct: true, why: "{{t:oesd|OESD}}({{n:outs.oesd}}개의 아웃)이고, 상대의 작은 C벳은 싸게 {{t:raise|레이즈할}} 기회를 줍니다. {{t:raise|레이즈}}로 바로 이길 수 있고, {{t:call|콜}}을 받아도 여전히 맞힐 수 있습니다." }
      - { text: "{{t:call|콜}}", correct: true, why: "이것도 좋습니다. 턴에서 약 {{n:odds.oesd.flop-turn}}의 확률로 {{t:straight|스트레이트}}를 맞히는데, 가격 {{n:eq.bet-third}}보다 조금 낮지만 맞히면 더 많이 이기고(임플라이드 오즈), 턴에서 아무도 {{t:bet|벳하지}} 않으면 리버도 공짜로 봅니다. 강한 {{t:draw|드로우}}의 일부는 {{t:call|콜해서}} {{t:call|콜}}이 약한 핸드로만 이루어지지 않게 합니다." }
      - { text: "{{t:fold|폴드}}", why: "너무 타이트합니다. {{n:outs.oesd}}개의 아웃으로 턴에서 약 {{n:odds.oesd.flop-turn}}의 확률로 {{t:straight|스트레이트}}를 맞히는데, 가격 {{n:eq.bet-third}}보다 크게 낮지 않습니다. 나머지는 임플라이드 오즈와 공짜 리버 가능성이 채워 줍니다. 게다가 체크레이즈도 할 수 있습니다." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크하자}} 버튼이 {{t:pot|팟}}의 1/3 크기로 C벳을 {{t:bet|벳합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|콜}}", correct: true, why: "키커가 약한 {{t:top-pair|탑 페어}}는 {{t:call|콜}}하는 핸드입니다. 버튼의 {{t:bluff|블러프}}를 이기며, {{t:call|콜}}로 그 블러프를 게임에 남겨 둡니다." }
      - { text: "체크레이즈", why: "보통은 {{t:call|콜합니다}}. {{t:raise|레이즈}}하면 주로 더 좋은 핸드와 {{t:draw|드로우}}가 돈을 냅니다. 이런 핸드로 하는 체크레이즈는 작은 C벳에 대한 솔버의 드문 플레이입니다." }
      - { text: "{{t:fold|폴드}}", why: "{{t:top-pair|탑 페어}}는 작은 C벳에 {{t:fold|폴드하기에는}} 분명히 너무 강합니다." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어합니다. 플롭에서 {{t:check|체크하자}} 버튼이 {{t:pot|팟}}의 1/3 크기로 C벳을 {{t:bet|벳합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|폴드}}", correct: true, why: "{{t:pair|페어}}도 {{t:flush-draw|플러시 드로우}}도 없습니다. 약한 백도어 {{t:straight-draw|스트레이트 드로우}}(특정 카드 두 장이 필요)만 있고, 보드보다 높은 카드도 없습니다. 에이스가 있는 플롭에서는 이런 핸드를 더 많이 {{t:fold|폴드합니다}}." }
      - { text: "{{t:bluff|블러프}}로 체크레이즈", why: "체크레이즈 {{t:bluff|블러프}}는 주로 맞혔을 때도 이기는 {{t:draw|드로우}}({{t:flush|플러시}} 드로우, {{t:oesd|OESD}})로 합니다. 이 핸드는 약한 백도어 {{t:draw|드로우}}뿐이고, 버튼은 여기서 {{t:fold|폴드하지}} 않을 에이스와 킹을 많이 가지고 있습니다." }
      - { text: "{{t:call|콜}}", why: "가격은 좋지만 이 핸드는 거의 아무것도 맞히지 못합니다. 6이나 5 {{t:pair|페어}}조차 버튼이 계속 돈을 낼 대부분의 핸드에 집니다." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "버튼의 어떤 C벳을 상대로 체크레이즈를 더 자주 합니까?"
    table: { position: BB }
    options:
      - { text: "{{t:pot|팟}}의 1/4", correct: true, why: "작은 C벳은 싸게 {{t:raise|레이즈할}} 기회를 주고, 버튼은 약한 핸드가 많은 넓은 {{t:range|레인지}}로 작은 C벳을 {{t:bet|벳합니다}}. 큰 C벳에는 더 드물고 좁게 {{t:raise|레이즈합니다}}. 주로 셋과 {{t:two-pair|투 페어}}이고, {{t:bluff|블러프}}는 더 적습니다." }
      - { text: "{{t:pot|팟}} 전체", why: "큰 C벳에는 {{t:raise|레이즈}} 비용이 크고, 버튼의 {{t:range|레인지}}도 더 강합니다. 더 자주 {{t:call|콜하거나}} {{t:fold|폴드합니다}}." }
      - { text: "똑같이 자주", why: "작은 C벳에는 더 자주, 더 넓게 {{t:raise|레이즈하고}}, 큰 C벳에는 더 드물게, 주로 가장 강한 핸드로 레이즈합니다." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "플롭에서 거의 {{t:fold|폴드하지}} 않는 버튼과 플레이합니다. 버튼이 {{t:pot|팟}}의 1/3 크기로 C벳을 {{t:bet|벳합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|콜}}", correct: true, why: "하이 카드가 있는 거트샷은 {{n:eq.bet-third}}의 가격이면 좋은 {{t:call|콜}}입니다. {{t:bluff|블러프}} 체크레이즈는 {{t:fold|폴드}}에서 수익을 내는데, 이 상대는 거의 {{t:fold|폴드하지}} 않으므로 {{t:raise|레이즈}}의 주된 장점이 사라집니다." }
      - { text: "체크레이즈", why: "체크레이즈 {{t:bluff|블러프}}는 주로 강한 {{t:draw|드로우}}로 하며, 거트샷은 여기에 속하지 않습니다. 게다가 {{t:bluff|블러프}}는 {{t:fold|폴드}}에서 수익을 내는데, 이 상대는 거의 {{t:fold|폴드하지}} 않습니다. 이런 상대에게는 주로 {{t:value|밸류}}로 {{t:raise|레이즈합니다}}." }
      - { text: "{{t:fold|폴드}}", why: "너무 타이트합니다. 하이 카드가 있는 {{t:draw|드로우}}는 이렇게 좋은 가격이라면 상대가 누구든 방어할 가치가 있습니다." }
---
체크레이즈는 {{t:check|체크}} 후 상대의 {{t:bet|벳}}에 {{t:raise|레이즈}}하는 것입니다. {{t:big-blind|빅 블라인드}}에서는 C벳에 맞서는 중요한 무기입니다(대부분은 어차피 {{t:call|콜}}과 {{t:fold|폴드}} 중에서 고릅니다). 이것이 없으면 버튼은 거의 모든 핸드로 싸게 C벳을 할 수 있습니다.

## {{t:raise|레이즈}}하는 이유

체크레이즈를 하는 이유는 두 가지입니다.

- **{{t:value|밸류}}를 위해**: 매우 강한 핸드({{t:two-pair|투 페어}}, 셋)로 {{t:pot|팟}}을 키우고 싶을 때,
- **{{t:semi-bluff|세미 블러프}}로**: 두 가지 방식으로 이기는 {{t:draw|드로우}}({{t:flush|플러시}} 드로우, {{t:oesd|OESD}})가 있을 때. 버튼이 {{t:fold|폴드하거나}} 내가 맞히면 이깁니다.

키커가 약한 {{t:top-pair|탑 페어}} 같은 중간 핸드는 보통 {{t:call|콜합니다}}. {{t:raise|레이즈}}하면 버튼의 더 약한 핸드는 더 자주 {{t:fold|폴드하고}}, 더 강한 핸드는 돈을 냅니다. 이는 단순화한 설명입니다. 작은 C벳에는 솔버도 보호를 위해 일부 {{t:top-pair|탑 페어}}와 약한 {{t:pair|페어}}로 {{t:raise|레이즈합니다}}. 반대로 매우 {{t:connected|커넥티드한}} 플롭에서 {{t:two-pair|투 페어}}는 솔버가 {{t:call|콜}}만 하는 경우가 많습니다.

## 더 자주 할 때

- **작은 C벳에 맞설 때.** {{t:raise|레이즈}} 비용이 싸고, 버튼은 넓은 {{t:range|레인지}}로 작은 C벳을 {{t:bet|벳합니다}}. 큰 C벳에는 더 드물고 좁게 {{t:raise|레이즈합니다}}. 주로 셋과 {{t:two-pair|투 페어}}이고, {{t:bluff|블러프}}는 더 적습니다.
- **낮고 {{t:connected|커넥티드한}} 플롭에서** (예: [[7h 6d 5s]]). {{t:big-blind|빅 블라인드}}는 낮은 핸드를 많이 방어하므로, 보통 여기서 버튼보다 {{t:two-pair|투 페어}}와 {{t:straight|스트레이트}}가 더 많습니다. 즉 {{t:nuts-advantage|넛 어드밴티지}}가 있습니다.
- **버튼에게 유리한 높은 플롭에서는 덜 자주**, 예: K-J-T 또는 A-A-K. 그곳에서는 버튼이 가장 강한 핸드를 더 많이 가집니다.

## 사이즈

체크레이즈 사이즈는 C벳을 기준으로 계산합니다. 예: {{t:pot|팟}}은 {{n:ex.third.pot}}, C벳은 {{n:ex.third.bet}}입니다. C벳의 {{n:xr.mult.example}} 크기로 하는 체크레이즈는 {{n:xr.example}}까지의 {{t:raise|레이즈}}입니다. 버튼은 {{n:xr.example.extra}}만큼 더 내야 하고 약 **{{n:eq.vs-xr.example}}**의 에퀴티가 필요합니다. {{n:xr.too-small}}까지만 {{t:raise|레이즈}}하면 버튼에게 약 **{{n:eq.vs-xr.too-small}}**의 가격을 주게 되어, 버튼은 {{t:draw|드로우}}가 조금이라도 있는 거의 모든 핸드로 콜합니다. 그래서 최소 레이즈가 아니라 C벳의 약 {{n:xr.mult.low}}–{{n:xr.mult.example}} 크기로 {{t:raise|레이즈하고}}, C벳이 작을수록 더 크게 레이즈합니다.

:::note {{t:fold|폴드하지}} 않는 상대
체크레이즈 {{t:bluff|블러프}}는 {{t:fold|폴드}}에서 수익을 냅니다(첫 번째 레슨의 알파를 떠올려 보세요). 플롭에서 거의 {{t:fold|폴드하지}} 않는 플레이어에게는 주로 {{t:value|밸류}}로 {{t:raise|레이즈하고}}, {{t:bluff|블러프}}는 가장 강한 {{t:draw|드로우}}에만 남겨 둡니다.
:::
