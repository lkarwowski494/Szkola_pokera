---
id: m5.l3
module: m5
order: 3
title: "얼마나 자주, 얼마나 크게"
sub: "인 포지션 C벳"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "버튼에서 {{t:open|오픈했고}}, {{t:big-blind|빅 블라인드}}가 {{t:call|콜한}} 뒤 플롭에서 {{t:check|체크합니다}}. 이 플롭에는 어떤 플랜이 맞습니까?"
    position: BTN
    options:
      check: "더 자주 {{t:check|체크하고}}, C벳은 평소보다 덜 자주 합니다"
      small: "자주, 작게 C벳: {{t:pot|팟}}의 {{n:cbet.size.small}} ({{n:cbet.btn.small}})"
      big: "자주, 크게 C벳: {{t:pot|팟}}의 {{n:cbet.size.big}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "너무 소극적입니다. {{t:dry|드라이}}하고 높은 플롭에서는 당신에게 {{t:range-advantage|레인지 우위}}가 있고, 상대는 보통 맞추지 못했습니다. {{t:check|체크하면}} 상대에게 공짜 카드를 줍니다."
          small: "맞습니다. {{t:dry|드라이}}하고 높은 플롭은 당신에게 유리합니다. 작은 {{t:bet|베팅}}만으로도 상대가 약한 핸드를 {{t:fold|폴드하게}} 만들 수 있고, 더 약한 {{t:pair|페어}}는 여전히 {{t:call|콜합니다}}."
          big: "액션은 맞지만 사이즈가 틀렸습니다. {{t:dry|드라이}} 플롭에서는 상대에게 {{t:draw|드로우}}가 적고, 맞추지 못한 핸드는 작은 {{t:bet|베팅}}에도 {{t:fold|폴드합니다}}. 더 큰 {{t:bet|베팅}}은 대략 같은 핸드를 {{t:fold|폴드시키면서}} 위험은 더 큽니다. {{t:pot|팟}}의 약 {{n:cbet.size.small}} 크기로 베팅하세요."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "너무 소극적입니다. 당신에게 {{t:range-advantage|레인지 우위}}가 있고 {{t:paired|페어드}} 플롭에서는 {{t:draw|드로우}}가 나오기 어려우므로, {{t:pair|페어}}가 없는 상대는 작은 {{t:bet|베팅}}조차 받아 줄 수 있는 경우가 드뭅니다."
          small: "맞습니다. {{t:paired|페어드}} 플롭에서는 자주, 작게 베팅합니다. {{t:pair|페어}}가 없는 상대는 {{t:call|콜할}} 핸드가 거의 없고, {{t:three-of-a-kind|트리플}}은 두 플레이어 모두 가질 수 있으므로 더 큰 위험을 감수할 이유가 없습니다."
          big: "액션은 맞지만 사이즈가 틀렸습니다. {{t:paired|페어드}} 플롭에서는 둘 중 누구든 {{t:three-of-a-kind|트리플}}을 가질 수 있으므로 큰 {{t:bet|베팅}}은 이득이 없고, 상대의 약한 핸드는 작은 베팅에도 {{t:fold|폴드합니다}}. {{t:pot|팟}}의 약 {{n:cbet.size.small}} 정도면 충분합니다."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "맞습니다. 카드가 서로 가까운 낮은 플롭은 여기서 {{t:two-pair|투 페어}}나 {{t:straight|스트레이트}}를 더 자주 가지는 {{t:big-blind|빅 블라인드}}에게 유리합니다. 높은 플롭보다 C벳을 덜 자주 합니다. 많은 핸드가 {{t:check|체크하고}}, 주로 강한 핸드와 강한 {{t:draw|드로우}}가 베팅합니다."
          small: "너무 자주 합니다. 카드가 서로 가까운 낮은 플롭에서는 {{t:big-blind|빅 블라인드}} 쪽에 {{t:nuts-advantage|넛 우위}}가 있습니다. 작더라도 잦은 C벳은 상대에게 가장 강한 핸드로 먼저 {{t:check|체크한}} 뒤 {{t:raise|레이즈할}} 기회(체크레이즈)를 줍니다."
          big: "너무 자주, 너무 비싸게 합니다. 여기서는 {{t:big-blind|빅 블라인드}}가 {{t:two-pair|투 페어}}나 {{t:straight|스트레이트}}를 더 자주 맞췄습니다. 당신은 보통 높은 카드만 가지고 있는데, 잦은 큰 C벳은 많은 것을 걸게 됩니다."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "버튼에서 {{t:open|오픈했고}}, {{t:big-blind|빅 블라인드}}가 {{t:call|콜한}} 뒤 {{t:check|체크합니다}}. 당신은 잭 키커의 킹 {{t:pair|페어}}를 가지고 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C벳 {{n:cbet.btn.small}} ({{t:pot|팟}}의 {{n:cbet.size.small}})", correct: true, why: "맞습니다. {{t:dry|드라이}} 플롭에서 {{t:top-pair|탑 페어}}({{t:board|보드}}의 가장 높은 카드로 만든 {{t:pair|페어}})입니다. 작은 {{t:bet|베팅}}은 세븐, 듀스, 더 약한 킹에게서 {{t:call|콜}}을 받고, 상대에게는 {{t:draw|드로우}}가 거의 없습니다." }
      - { text: "C벳 {{n:cbet.btn.big}} ({{t:pot|팟}}의 {{n:cbet.size.big}})", sizeError: true, why: "액션은 맞지만 사이즈가 틀렸습니다. {{t:dry|드라이}} 플롭에서는 상대에게 {{t:draw|드로우}}가 없고, 맞추지 못한 핸드는 작은 {{t:bet|베팅}}에도 {{t:fold|폴드합니다}}. 더 큰 {{t:bet|베팅}}은 대략 같은 핸드를 {{t:fold|폴드시키면서}} 위험은 더 큽니다. {{t:pot|팟}}의 약 {{n:cbet.size.small}} 크기로 베팅하세요." }
      - { text: "{{t:check|체크합니다}}", why: "밸류를 잃습니다. 상대에게는 작은 {{t:bet|베팅}}이라면 지불할 더 약한 {{t:pair|페어}}와 에이스 하이 핸드가 많습니다. {{t:dry|드라이}} 플롭에서 {{t:top-pair|탑 페어}}라면 베팅합니다." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "버튼에서 {{t:open|오픈했고}}, {{t:big-blind|빅 블라인드}}가 {{t:call|콜한}} 뒤 {{t:check|체크합니다}}. 당신은 {{t:draw|드로우}}가 많은 플롭에서 잭 셋을 가지고 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C벳 {{n:cbet.btn.big}} ({{t:pot|팟}}의 {{n:cbet.size.big}})", correct: true, why: "맞습니다. 상대에게는 {{t:flush-draw|플러시 드로우}}와 {{t:straight|스트레이트}} 드로우가 많습니다(예: QT, AQ, 하트 두 장). 큰 {{t:bet|베팅}}은 그들이 다음 카드를 보는 데 비싼 값을 치르게 합니다." }
      - { text: "C벳 {{n:cbet.btn.small}} ({{t:pot|팟}}의 {{n:cbet.size.small}})", sizeError: true, why: "액션은 맞지만 사이즈가 틀렸습니다. 작은 {{t:bet|베팅}}은 상대의 {{t:draw|드로우}}에 싼 카드를 주고, 당신의 셋은 플러시나 {{t:straight|스트레이트}}에 질 수 있습니다. {{t:draw|드로우}}가 많을 때는 크게 베팅하세요." }
      - { text: "상대를 겁주지 않으려고 {{t:check|체크합니다}}", why: "{{t:draw|드로우}}가 많을 때 공짜 카드는 그들에게 주는 선물입니다. 매우 강한 핸드라면 바로 {{t:pot|팟}}을 키웁니다." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "버튼에서 {{t:open|오픈했고}}, {{t:big-blind|빅 블라인드}}가 {{t:call|콜한}} 뒤 {{t:check|체크합니다}}. 플롭이 {{t:paired|페어드}}입니다. 여기서는 어떤 플랜이 맞습니까?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "자주, 작게 C벳", correct: true, why: "맞습니다. 당신에게 {{t:range-advantage|레인지 우위}}가 있고 {{t:paired|페어드}} 플롭에서는 {{t:draw|드로우}}가 나오기 어려우므로, {{t:pair|페어}}가 없는 상대는 작은 {{t:bet|베팅}}조차 받아 줄 수 있는 경우가 드뭅니다. 또한 AA, KK 같은 높은 {{t:pair|페어}}도 당신이 더 많이 가지고 있는데, {{t:big-blind|빅 블라인드}}는 {{t:call|콜}}만 했다면 보통 이런 핸드가 없습니다." }
      - { text: "자주, 크게 C벳", sizeError: true, why: "액션은 맞지만 사이즈가 틀렸습니다. 둘 중 누구든 {{t:three-of-a-kind|트리플}}을 가질 수 있으므로 큰 {{t:bet|베팅}}은 이득이 없고, {{t:pair|페어}}가 없는 상대는 작은 베팅에도 {{t:fold|폴드합니다}}. 자주, 작게 베팅하세요." }
      - { text: "베팅보다 {{t:check|체크를}} 더 자주 합니다", why: "너무 소극적입니다. {{t:paired|페어드}}이고 높은 플롭은 당신에게 유리하며, 상대는 보통 여기서 아무것도 없습니다." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "버튼에서 {{t:open|오픈했고}}, {{t:big-blind|빅 블라인드}}가 {{t:call|콜한}} 뒤 {{t:check|체크합니다}}. 플롭이 {{t:monotone|모노톤}}입니다. 여기서는 어떤 플랜이 맞습니까?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "평소보다 덜 자주, 작게 C벳", correct: true, why: "맞습니다. 이미 어느 플레이어든 {{t:flush|플러시}}를 가지고 있을 수 있으므로, 당신의 {{t:nuts-advantage|넛 우위}}는 일반적인 높은 플롭보다 작습니다. 플러시를 상대로 큰 {{t:pot|팟}}을 만들지 않도록 덜 자주, 작은 사이즈로 베팅합니다." }
      - { text: "{{t:draw|드로우}}가 돈을 내도록 자주, 크게 C벳", why: "{{t:monotone|모노톤}} 플롭에서는 큰 {{t:pot|팟}}이 위험합니다. 상대가 이미 완성된 {{t:flush|플러시}}를 가지고 있을 수 있고, 하트가 없는 당신의 핸드는 잘 버티지 못합니다." }
      - { text: "항상 {{t:check|체크합니다}}", why: "너무 소극적입니다. 높은 플롭은 여전히 당신에게 유리하고, 일부 핸드(예: 높은 하트를 가진 핸드)는 기꺼이 작게 베팅합니다." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:pot|팟}}은 {{n:ex.pot}}입니다. 아무 핸드 없이 {{n:cbet.ex.small}} 베팅합니다. 이 {{t:bet|베팅}}이 본전이 되려면 상대가 몇 퍼센트의 확률로 {{t:fold|폴드해야}} 합니까? 숫자를 입력하세요."
    answer: alpha.cbet.small
    explanation: "{{n:ex.pot}} 따기 위해 {{n:cbet.ex.small}} 위험을 감수합니다. 기준은 베팅 ÷ ({{t:pot|팟}} + 베팅)입니다: {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. 상대는 이보다 훨씬 더 자주 플롭을 맞추지 못하므로, 작은 C벳이 그토록 자주 이득이 됩니다."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:pot|팟}}은 {{n:ex.pot}}입니다. 아무 핸드 없이 {{n:cbet.ex.big}} 베팅합니다. 이 {{t:bet|베팅}}이 본전이 되려면 상대가 몇 퍼센트의 확률로 {{t:fold|폴드해야}} 합니까? 숫자를 입력하세요."
    answer: alpha.cbet.big
    explanation: "{{n:ex.pot}} 따기 위해 {{n:cbet.ex.big}} 위험을 감수합니다: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. 큰 {{t:bluff|블러프}}는 작은 블러프({{n:alpha.cbet.small}})보다 훨씬 더 자주 성공해야 합니다."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:dry|드라이}} 플롭에서 승산이 없는 핸드로 하는 {{t:pot|팟}}의 {{n:cbet.size.small}} C벳이 {{t:pot|팟}}의 {{n:cbet.size.big}} C벳보다 더 자주 이득이 되는 이유는 무엇입니까?"
    options:
      - { text: "작은 {{t:bet|베팅}}은 폴드가 {{n:alpha.cbet.small}}만 필요하고, 큰 베팅은 {{n:alpha.cbet.big}} 필요하기 때문", correct: true, why: "맞습니다. {{t:dry|드라이}} 플롭에서 상대의 가장 약한 핸드({{t:pair|페어}}도 {{t:draw|드로우}}도 없는 핸드)는 두 사이즈 모두에 {{t:fold|폴드하므로}}, 작은 {{t:bet|베팅}}이 같은 효과를 더 싸게 얻습니다." }
      - { text: "작은 {{t:bet|베팅}}은 항상 {{t:fold|폴드}}를 받아 내기 때문", why: "아닙니다. 상대는 작은 {{t:bet|베팅}}에 어떤 {{t:pair|페어}}로든 {{t:call|콜합니다}}. 작은 {{t:bet|베팅}}은 단지 위험이 적어서 {{t:fold|폴드}}가 덜 필요할 뿐입니다." }
      - { text: "큰 {{t:bet|베팅}}은 항상 실수이기 때문", why: "아닙니다. {{t:wet|웻}} 플롭에서, 그리고 {{t:nuts-advantage|넛 우위}}가 있을 때는 큰 {{t:bet|베팅}}이 최선일 때가 있습니다. 하지만 {{t:dry|드라이}} 플롭에서는 더 큰 위험의 대가로 얻는 것이 없습니다." }
---
C벳(컨티뉴에이션 {{t:bet|베팅}})은 플롭 전에 마지막으로 {{t:raise|레이즈한}} 플레이어가 플롭에서 하는 {{t:bet|베팅}}입니다. 이 레슨에서 당신은 {{t:in-position|인 포지션}}으로 플레이합니다. 버튼에서 {{t:open|오픈했고}}, {{t:big-blind|빅 블라인드}}가 {{t:call|콜한}} 뒤 플롭에서 {{t:check|체크합니다}}. 플롭의 {{t:pot|팟}}은 {{n:bb.pot-after.vs-btn}}입니다. 질문은 두 가지입니다. 얼마나 자주 베팅할지, 그리고 얼마나 크게 베팅할지입니다.

## {{t:dry|드라이}}하고 높은 플롭: 자주, 작게

[[Ks 7d 2c]] 같은 플롭에서는 당신에게 {{t:range-advantage|레인지 우위}}가 있고, 상대에게는 {{t:draw|드로우}}가 거의 없습니다. 자주, 작게, {{t:pot|팟}}의 약 {{n:cbet.size.small}}, 즉 약 {{n:cbet.btn.small}} 베팅합니다. 작은 {{t:bet|베팅}}만으로도 상대가 맞추지 못한 핸드를 {{t:fold|폴드하게}} 만들 수 있고, 더 약한 {{t:pair|페어}}는 여전히 {{t:call|콜합니다}}. 더 큰 {{t:bet|베팅}}은 대략 같은 핸드를 {{t:fold|폴드시키면서}} 위험은 더 큽니다.

일반적인 작은 C벳은 {{t:pot|팟}}의 약 {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}}, 큰 C벳은 약 {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}}입니다(교육 자료). 솔버는 보통 {{n:cbet.size.small}}, 그리고 {{n:cbet.solver.big.low}}–{{n:cbet.size.big}} 사이즈를 사용하며, 일부 플롭에서는 {{t:overbet|오버벳}}, 즉 {{t:pot|팟}} 전체보다 큰 {{t:bet|베팅}}도 사용합니다(공개된 솔버 결과).

## {{t:draw|드로우}}가 많은 플롭: 덜 자주, 하지만 더 크게

[[Kh Jh 7c]] 같은 플롭에서는 상대에게 {{t:flush-draw|플러시 드로우}}와 {{t:straight|스트레이트}} 드로우가 많지만, 아직 {{t:straight|스트레이트}}는 불가능합니다. 강한 핸드와 강한 {{t:draw|드로우}}는 {{t:draw|드로우}}가 다음 카드에 비싼 값을 치르도록 더 큰 사이즈(예: {{t:pot|팟}}의 {{n:cbet.size.big}})로 베팅합니다. {{t:draw|드로우}}가 없는 중간 핸드는 더 자주 {{t:check|체크합니다}}. 이미 {{t:straight|스트레이트}}가 가능하면, 예를 들어 [[Jh Th 8c]]에서는 상대가 그것을 가지고 있을 수 있으므로 솔버는 그곳에서 더 작은 사이즈로 베팅합니다.

## {{t:paired|페어드}}와 {{t:monotone|모노톤}}

[[Qd Qs 6h]] 같은 {{t:paired|페어드}} 플롭에서는 당신에게 {{t:range-advantage|레인지 우위}}가 있고 {{t:draw|드로우}}가 나오기 어려우므로, {{t:pair|페어}}가 없는 상대는 {{t:call|콜할}} 수 있는 경우가 드뭅니다. 자주, 작게 베팅합니다. 둘 중 누구든 {{t:three-of-a-kind|트리플}}을 가질 수 있으므로 큰 {{t:bet|베팅}}은 이득이 없습니다. [[Kh 8h 3h]] 같은 {{t:monotone|모노톤}} 플롭에서는 이미 누구든 {{t:flush|플러시}}를 가지고 있을 수 있으므로, 평소보다 덜 자주, 작게 베팅합니다.

참고: “{{t:wet|웻}}”이 “큰 베팅”을 뜻하지는 않습니다. 앱에서 {{t:monotone|모노톤}} 플롭은 항상 {{t:wet|웻}}으로 분류되지만, 솔버는 그런 플롭에서 드물게, 작은 사이즈로 베팅합니다(공개된 솔버 결과). 사이즈는 {{t:wetness|웻니스}}에 따라 일정 수준까지만 커집니다. [[Qd 8d 7d]]처럼 가장 {{t:wet|웻한}} 플롭에서는 다시 작아집니다. 앞 섹션의 더 큰 사이즈는 아직 {{t:straight|스트레이트}}가 불가능하고 {{t:draw|드로우}}가 많은 플롭(앱에서는 보통 중간 단계)에 해당합니다.

## 카드가 서로 가까운 낮은 플롭: 더 자주 {{t:check|체크합니다}}

[[7s 6h 5d]]에서는 {{t:big-blind|빅 블라인드}} 쪽이 {{t:two-pair|투 페어}}나 {{t:straight|스트레이트}}를 더 자주 가집니다(우위에 관한 레슨). 다른 낮은 {{t:connected|커넥티드}} 플롭과 {{t:semi-connected|세미 커넥티드}} 플롭도 마찬가지입니다. 높은 플롭보다 C벳을 덜 자주 합니다. 많은 핸드가 {{t:check|체크하고}}, 주로 매우 강한 핸드와 강한 {{t:draw|드로우}}가 베팅합니다.

## 상대는 얼마나 자주 {{t:fold|폴드해야}} 할까

아무 핸드 없이 하는 {{t:bet|베팅}}은 상대가 베팅 ÷ ({{t:pot|팟}} + 베팅)의 확률로 {{t:fold|폴드할}} 때 본전이 됩니다. {{t:pot|팟}}의 {{n:cbet.size.small}}에서는 {{n:alpha.cbet.small}}, {{t:pot|팟}}의 {{n:cbet.size.big}}에서는 벌써 {{n:alpha.cbet.big}}입니다. {{t:pair|페어}}가 없는 핸드는 약 {{n:flop.miss.unpaired}}의 확률로 플롭을 맞추지 못하므로, 작은 C벳이 그토록 자주 이득이 됩니다.

:::note 이 원칙의 출처
방향성({{t:dry|드라이}} 플롭: 작게, 자주 / 완성된 {{t:straight|스트레이트}} 없이 {{t:draw|드로우}}가 많은 플롭: 더 크게, 덜 자주 / {{t:straight|스트레이트}}가 이미 가능한 플롭: 더 작게 / {{t:paired|페어드}}: 작게 / {{t:monotone|모노톤}}: 덜 자주, 작게)은 교육 자료와 공개된 솔버 결과에서 나온 일반 원칙이며, 휴리스틱으로 표시되어 있습니다. {{t:pot|팟}}의 {{n:cbet.size.small}} 및 {{n:cbet.size.big}} 사이즈는 위에서 제시한 범위에서 고른 예시입니다(베팅 사이즈에 관한 교육 자료, 공개된 솔버 결과). 앱은 얼마나 자주 베팅할지를 퍼센트로 제시하지 않습니다. 그런 수치는 솔버 결과에서 나오기 때문입니다.
:::
