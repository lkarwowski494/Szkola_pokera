---
id: m7.l1
module: m7
order: 1
title: "세컨드 배럴"
sub: "턴에서 두 번째로 베팅할 때"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind}}가 {{t:call|콜했습니다}}. [[Jd 7c 3s]] 플롭에서 C벳을 {{t:bet|베팅했고}} 상대가 {{t:call|콜했습니다}}. 턴의 어떤 카드가 당신의 {{t:second-barrel|세컨드 배럴}}에 가장 도움이 됩니까?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "맞습니다: 에이스는 당신의 {{t:open|오픈}} {{t:range|레인지}}에 있는 많은 핸드(AK, AQ, AJ)에 맞고, {{t:big-blind}}는 플롭을 주로 {{t:pair|페어}}와 {{t:draw|드로우}}로 {{t:call|콜했습니다}}. 상대의 모든 {{t:pair}}가 한 단계씩 내려갑니다." }
      - { text: "[[8h]]", why: "아닙니다: 8은 플롭과 연결됩니다. T9에는 {{t:straight|스트레이트}}를, 87에는 {{t:two-pair}}를 만들어 주는데, 모두 {{t:big-blind}}가 많이 방어하는 핸드입니다. 오히려 상대에게 유리한 카드입니다." }
      - { text: "[[3h]]", why: "최악은 아니지만 바뀌는 것이 거의 없습니다: 당신의 {{t:range}}를 좀처럼 개선하지 않고, {{t:pair|페어}}를 가진 상대는 여전히 {{t:pair|페어}}입니다. 에이스가 당신의 {{t:second-barrel|세컨드 배럴}}에 훨씬 더 많은 것을 줍니다." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "[[Jd 7c 3s]] 플롭 이후 턴의 에이스가 버튼에서 {{t:open|오픈한}} 플레이어의 {{t:second-barrel|세컨드 배럴}}에 유리한 이유는 무엇입니까?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "당신의 AK와 AQ에 맞고, 상대의 {{t:pair}}는 두 번째나 세 번째 {{t:pair|페어}}가 됩니다", correct: true, why: "맞습니다: 높은 카드는 {{t:open|오프너}}의 {{t:range}}에 더 자주 맞고, 잭이나 7 {{t:pair|페어}}로 플롭을 {{t:call|콜한}} 상대는 이제 {{t:board|보드}} 대비 더 약한 핸드를 갖게 됩니다." }
      - { text: "에이스가 나오면 상대는 항상 {{t:fold|폴드하기}} 때문입니다", why: "항상은 아닙니다: 에이스나 셋을 가진 상대는 돈을 냅니다. 에이스는 {{t:fold}} 가능성을 높이지만 아무것도 보장하지 않습니다." }
      - { text: "에이스가 상대의 {{t:draw|드로우}}를 완성하기 때문입니다", why: "아닙니다: 이 {{t:board|보드}}에서 에이스는 상대가 가질 수 있는 어떤 {{t:flush|플러시}}나 {{t:straight|스트레이트}}도 완성하지 않습니다. 당신의 {{t:range|레인지}}에 맞기 때문에 도움이 됩니다." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind}}가 {{t:call|콜했습니다}}. 플롭에서 C벳을 {{t:bet|베팅했고}} 상대가 {{t:call|콜했습니다}}. 턴은 7입니다. {{t:pot|팟}} 규모는 {{n:ex.pot}}입니다. 상대는 {{t:check|체크합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|체크합니다}}", correct: true, why: "9와 6이 있는 {{t:board|보드}}에 7이 나오면 T8과 85에는 {{t:straight|스트레이트}}, 76과 97에는 {{t:two-pair}}가 되는데, 모두 {{t:big-blind}}가 방어하는 핸드입니다. 당신은 {{t:pair|페어}}도 {{t:draw|드로우}}도 없습니다. {{t:bluff}}를 포기하고 무료 카드를 받습니다." }
      - { text: "{{n:ex.bet.three-quarters}} 베팅합니다", why: "이 카드는 당신이 아니라 상대의 {{t:range|레인지}}에 맞고, 당신에게는 강한 핸드로 가는 아웃이 없습니다. {{t:bluff|블러프}}로 하는 {{t:second-barrel|세컨드 배럴}}은 당신에게 도움이 되는 카드에서, 개선될 수 있는 핸드로 하세요." }
      - { text: "{{n:ex.bet.pot}} 베팅합니다", why: "상대에게 유리한 카드에서의 큰 {{t:bluff}}는 위험이 큽니다: 상대가 {{n:alpha.bet-pot}}보다 더 자주 {{t:fold|폴드해야}} 하는데, 플롭을 {{t:call|콜한}} 뒤라 {{t:pair|페어}}와 {{t:draw|드로우}}가 많습니다." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind}}가 플롭 C벳을 {{t:call|콜했습니다}}. 턴은 에이스입니다. {{t:pot|팟}} 규모는 {{n:ex.pot}}입니다. 상대는 {{t:check|체크합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "{{n:ex.bet.three-quarters}} 베팅합니다", correct: true, why: "좋은 {{t:second-barrel}}입니다: 에이스는 당신의 {{t:range|레인지}}에 맞고, 당신은 {{t:straight|스트레이트}}로 가는 거트샷(10)이 있습니다. 상대가 {{t:pair|페어}}를 {{t:fold|폴드하면}} 바로 이기고, {{t:call|콜하더라도}} 여전히 맞힐 수 있습니다." }
      - { text: "{{n:ex.bet.quarter}} 베팅합니다", sizeError: true, why: "액션은 맞지만 사이즈가 틀렸습니다: 이렇게 싼 베팅은 상대가 어떤 {{t:pair|페어}}로든 {{t:call|콜하고}}, 이 {{t:bluff}}는 주로 {{t:fold|폴드}}로 수익을 냅니다. 당신에게 도움이 되는 카드에서는 강한 핸드와 마찬가지로 크게 베팅하세요." }
      - { text: "{{t:check|체크합니다}}", correct: true, why: "이것도 좋습니다: 아웃이 있고 리버를 무료로 볼 수 있으니 {{t:check}}는 실수가 아닙니다. 공개된 솔버 예시에서 넛 {{t:straight|스트레이트}}로 가는 거트샷은 턴에서 {{t:check|체크했습니다}}. 두 플레이 모두 옳습니다." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind}}가 플롭 C벳을 {{t:call|콜했습니다}}. 턴은 2입니다. {{t:pot|팟}} 규모는 {{n:ex.pot}}입니다. 상대는 {{t:check|체크합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|체크합니다}}", correct: true, why: "당신은 {{t:pair|페어}}도 {{t:draw|드로우}}도 없습니다: 카드가 한 장 남은 상황에서 하트 세 장으로는 부족하고, {{t:straight|스트레이트}}까지는 두 장이 모자랍니다. 2는 아무것도 바꾸지 않고, 상대는 킹이 있는 {{t:board|보드}}에서 플롭을 {{t:call|콜했으니}} {{t:pair|페어}}를 가진 경우가 많습니다. {{t:bluff}}를 포기합니다." }
      - { text: "{{n:ex.bet.three-quarters}} 베팅합니다", why: "아웃 없는 {{t:bluff|블러프}}는 상대가 {{t:fold|폴드할}} 때만 이깁니다. 플롭을 {{t:call|콜한}} 상대에게는 {{t:pair|페어}}(킹, 8)가 많고, 이런 핸드는 빈 카드인 2에서 {{t:fold|폴드하지}} 않습니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "상대가 {{t:check|체크하니}} 당신도 무료로 {{t:check|체크할}} 수 있습니다(모듈 1의 규칙). {{t:fold|폴드}}는 이유 없이 {{t:pot|팟}}을 내줍니다." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:flush-draw|플러시 드로우}}로 {{t:second-barrel|세컨드 배럴}}을 {{t:bet|베팅했는데}} 상대가 {{t:call|콜합니다}}. 아직 어떤 승산이 있습니까?"
    options:
      - { text: "리버에서 {{t:flush}}를 맞힐 확률 약 {{n:odds.flush.turn-river}}", correct: true, why: "맞습니다: 이것이 이기는 두 번째 방법입니다. 보이지 않는 카드 {{n:cards.unseen.turn}}장 중 아웃 {{n:outs.flush}}장입니다. 그래서 {{t:semi-bluff}}가 아웃 없는 {{t:bluff|블러프}}보다 낫습니다." }
      - { text: "없습니다, {{t:bluff}}가 실패했습니다", why: "아웃 없는 {{t:bluff|블러프}}라면 더 이상 승산이 없지만, 당신에게는 {{t:draw}}가 있습니다: 리버에서 {{t:flush}}가 되면 {{t:call|콜}}을 받았더라도 이깁니다." }
      - { text: "약 {{n:odds.flush.flop-river}}", why: "그것은 카드가 두 장 남아 있던 플롭에서의 확률입니다. 턴에서는 한 장이 남았습니다: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind}}가 플롭 C벳을 {{t:call|콜했습니다}}. 턴은 2입니다. {{t:pot|팟}} 규모는 {{n:ex.pot}}입니다. 상대는 {{t:check|체크합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|체크합니다}}", correct: true, why: "9 {{t:pair|페어}}는 중간 핸드입니다: {{t:bluff|블러프}}는 이기지만 모든 킹에게 집니다. 두 번째 베팅에 상대는 더 약한 핸드를 {{t:fold|폴드하고}} 킹으로는 돈을 냅니다. {{t:check|체크하면}} {{t:pot|팟}}을 작게 유지하고 쇼다운까지 갑니다." }
      - { text: "{{n:ex.bet.three-quarters}} 베팅합니다", why: "상대는 이미 킹이 있는 {{t:board|보드}}에서 플롭을 {{t:call|콜했습니다}}. 더 약한 핸드(8, 3)는 {{t:fold|폴드하거나}} 한 번 돈을 내고, 더 강한 핸드는 항상 돈을 냅니다. 이런 베팅은 더 강한 핸드에게 돈을 벌어 줍니다." }
      - { text: "내 위치를 확인하려고 베팅합니다", why: "“정보를 위한” 베팅은 흔한 실수입니다: 정보에 돈을 내는 셈인데, 더 강한 핸드는 어차피 당신을 놓아주지 않고 더 약한 핸드는 도망갑니다. 베팅은 {{t:value|밸류}}를 위해서 또는 {{t:bluff}}로 합니다." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind}}가 플롭 C벳을 {{t:call|콜했습니다}}. 턴은 2입니다. {{t:pot|팟}} 규모는 {{n:ex.pot}}입니다. 상대는 {{t:check|체크합니다}}. 어떻게 하시겠습니까?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:value|밸류}}로 베팅합니다", correct: true, why: "베스트 키커의 {{t:top-pair|탑 페어}}는 강한 핸드입니다. 상대는 플롭을 {{t:call|콜했으니}} 더 약한 킹이나 8을 가진 경우가 많고, 이런 핸드는 한 번 더 돈을 냅니다." }
      - { text: "상대는 어차피 아무것도 없으니 {{t:check|체크합니다}}", why: "상대는 플롭을 {{t:call|콜했으니}} {{t:pair|페어}}를 가진 경우가 많습니다. {{t:check|체크하면}} 더 약한 핸드가 지불했을 {{t:bet}}을 잃습니다." }
      - { text: "올인합니다", why: "더 약한 {{t:pair|페어}}는 스택 전체를 좀처럼 지불하지 않습니다. 더 약한 킹과 8에게서 돈을 받을 수 있는 사이즈를 고르세요." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "턴에서 어떤 핸드로 가장 자주 {{t:second-barrel|세컨드 배럴}}을 {{t:bet|베팅합니까}}?"
    options:
      - { text: "강한 핸드와 {{t:draw|드로우}}; 중간 핸드는 {{t:check|체크합니다}}", correct: true, why: "맞습니다: 강한 핸드는 돈을 받길 원하고, {{t:draw|드로우}}는 두 가지 방법으로 이기며, 중간 핸드는 추가 {{t:bet|베팅}}으로 얻는 것이 없습니다." }
      - { text: "{{t:initiative|주도권}}을 잃지 않도록 모든 핸드로", why: "{{t:initiative|주도권}}만으로는 이기지 못합니다. 상대는 플롭을 {{t:call|콜했으니}} 더 강한 {{t:range}}를 가지고 있고, 아웃 없는 핸드와 중간 {{t:pair|페어}}는 계속 베팅하면 손해를 봅니다." }
      - { text: "가장 강한 핸드로만", why: "그러면 상대는 당신이 베팅할 때마다 폴드하고, 당신에게 이길 때만 돈을 낼 것입니다. {{t:draw|드로우}}는 자연스러운 {{t:semi-bluff|세미 블러프}}입니다." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "턴입니다. {{t:pot|팟}} 규모는 {{n:ex.pot}}입니다. 거의 이기지 못할 핸드로 {{t:bluff|블러프하며}} {{n:ex.bet.three-quarters}} {{t:bet|베팅합니다}}. 이 {{t:bluff}}가 본전이 되려면 상대가 얼마나 자주 {{t:fold|폴드해야}} 합니까? 퍼센트로 숫자를 입력하세요."
    answer: alpha.bet-three-quarters
    explanation: "알파 = 베팅 ÷ ({{t:pot}} + 베팅) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. 아웃이 있으면 {{t:call|콜}}을 받은 경우 중 일부는 어차피 리버에서 이기므로 더 적은 {{t:fold|폴드}}로도 충분합니다."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "C벳에 {{t:call|콜한}} 뒤 턴에서 상대의 {{t:range}}가 플롭보다 강한 이유는 무엇입니까?"
    options:
      - { text: "가장 약한 핸드를 플롭에서 {{t:fold|폴드했기}} 때문입니다", correct: true, why: "맞습니다: C벳에는 {{t:pair|페어}}도 {{t:draw|드로우}}도 없는 핸드가 {{t:fold|폴드합니다}}. {{t:pair|페어}}와 {{t:draw|드로우}}가 남으므로 {{t:second-barrel}}은 첫 번째 베팅보다 강한 {{t:range}}를 상대합니다." }
      - { text: "턴이 항상 상대를 돕기 때문입니다", why: "아닙니다: 턴은 무작위이고 때로는 당신을 돕습니다(예: 에이스). 상대의 {{t:range|레인지}}를 강하게 만드는 것은 플롭에서 내린 상대 자신의 결정입니다." }
      - { text: "강하지 않습니다, 프리플롭과 같은 {{t:range}}입니다", why: "모든 결정은 일부 핸드를 걸러 냅니다. {{t:bet}}에 {{t:call|콜한}} 플레이어는 보통 무언가에 맞았거나 {{t:draw}}가 있습니다." }
---
{{t:second-barrel|세컨드 배럴}}은 프리플롭에서 {{t:raise|레이즈한}} 플레이어의 두 번째 {{t:bet}}입니다: 플롭 C벳, {{t:call}}, 그다음 턴 베팅. 턴에서는 “핸드가 있는가”뿐 아니라 “이 카드가 나에게 도움이 되는가, 상대에게 도움이 되는가”도 묻습니다.

## 상대가 {{t:call|콜했으니}} 더 강합니다

C벳에 상대는 {{t:pair|페어}}도 {{t:draw|드로우}}도 없는 핸드를 {{t:fold|폴드합니다}}. {{t:call|콜한}} 플레이어는 보통 {{t:pair|페어}}나 {{t:draw}}를 가지고 있고, 때로는 백도어가 있는 높은 카드입니다(M6의 방어처럼). 그래서 {{t:second-barrel}}은 첫 번째 베팅보다 강한 {{t:range}}를 상대하며, 모든 핸드로 두 번째 베팅을 하지는 않습니다.

## 어떤 카드가 도움이 되는가

- **낮은 {{t:board|보드}}에 나온 높은 카드**(에이스, 킹)는 보통 {{t:open|오프너}}에게 도움이 됩니다: 오프너의 AK, AQ, KQ에 맞고, 상대의 모든 {{t:pair}}가 한 단계씩 내려갑니다. 이런 카드에서는 {{t:bluff|블러프}}를 포함해 두 번째 베팅을 더 자주 합니다.
- **{{t:board|보드}}와 연결되는 낮은 카드**, 예를 들어 [[9h 6c 2d]]에 나온 7은 {{t:big-blind|빅 블라인드}}에게 도움이 됩니다: 빅 블라인드가 가장 많이 방어하는 핸드에 {{t:straight|스트레이트}}와 {{t:two-pair}}를 만들어 줍니다.
- **빈 카드**, 예를 들어 [[Kd 8c 3s]]에 나온 2는 바뀌는 것이 거의 없습니다. 당신의 핸드가 결정합니다.

## 무엇으로 두 번째 베팅을 하는가

강한 핸드({{t:value|밸류}})와 {{t:draw|드로우}}({{t:semi-bluff}})로 베팅합니다. {{t:semi-bluff|세미 블러프}}는 두 가지 방법으로 이깁니다: 상대가 {{t:fold|폴드할}} 때, 또는 리버에서 맞혔을 때입니다. {{t:pair|페어}}도 아웃도 없는 핸드는 상대가 폴드할 때만 이기므로 더 자주 포기합니다. 단, 상대가 돈을 낼 핸드를 블로킹한다면 예외입니다. 상대가 {{t:raise|레이즈}}로 대응할 수 있을 때는 솔버가 아웃 없는 핸드로도 {{t:bluff|블러프합니다}}.

승산 없는 {{t:bluff|블러프}}는 상대가 베팅 ÷ ({{t:pot}} + 베팅)의 비율로 {{t:fold|폴드할}} 때 본전입니다(M6의 알파). {{t:pot|팟}}의 3/4 베팅이면 {{n:alpha.bet-three-quarters}}, {{t:pot|팟}}의 절반 베팅이면 {{n:alpha.bet-half}}입니다.

## 중간 핸드는 {{t:check|체크합니다}}

{{t:second-pair|세컨드 페어}}나 약한 키커의 {{t:top-pair}}는 {{t:bluff|블러프}}는 이기지만 더 강한 {{t:pair|페어}}에게는 집니다. 두 번째 베팅에 더 약한 핸드는 {{t:fold|폴드하고}} 더 강한 핸드는 돈을 냅니다. {{t:check|체크해서}} {{t:pot|팟}}을 작게 유지하고 쇼다운까지 갑니다.

:::note 이 규칙의 출처
일반적인 방향(높은 카드는 보통 {{t:second-barrel|세컨드 배럴}}에 유리하다, {{t:bluff|블러프}}는 아웃 없는 핸드보다 아웃 있는 핸드로 한다, 중간 핸드는 {{t:check|체크한다}})은 교육 자료와 솔버 분석에서 나온 휴리스틱입니다. 약 {{n:format.stack}} 스택에 적용됩니다. 이는 단순화한 것입니다: 솔버는 상대의 {{t:value|밸류}}를 블로킹하거나 상대가 {{t:raise|레이즈}}로 대응할 수 있을 때 아웃 없는 핸드 일부로도 {{t:bluff|블러프합니다}}. 이런 수치는 솔버 결과에서 구체적인 핸드에 따라 달라지므로 앱은 베팅 빈도를 퍼센트로 제시하지 않습니다.
:::
