---
id: m5.l2
module: m5
order: 2
title: "플롭은 누구에게 유리할까"
sub: "레인지 우위와 너츠 우위"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind|빅 블라인드}}가 {{t:call|콜했습니다}}. 플롭: [[Ks 7d 2c]]. {{t:range-advantage|레인지 우위}}는 누구에게 있습니까?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "버튼에서 {{t:open|오픈한}} 당신", correct: true, why: "맞습니다. 당신의 {{t:range|레인지}}에는 KK, AK, KQ가 모두 들어 있습니다. {{t:big-blind|빅 블라인드}}라면 그중 가장 강한 핸드는 플롭 전에 레이즈했을 것이고, 넓은 방어 범위는 대부분 여기서 빗나간 핸드입니다." }
      - { text: "{{t:big-blind|빅 블라인드}}", why: "아닙니다. {{t:big-blind|빅 블라인드}}는 넓게 방어했기 때문에 약한 핸드가 더 많습니다. 좋은 키커를 가진 킹은 당신보다 덜 자주 가지고 있습니다." }
      - { text: "아무도 없습니다. 플롭은 무작위입니다", why: "플롭은 무작위지만 {{t:range|레인지}}는 그렇지 않습니다. 같은 플롭이라도 높은 카드가 더 많은 {{t:range|레인지}}에 더 잘 맞습니다." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "버튼에서 {{t:open|오픈했고}} {{t:big-blind|빅 블라인드}}가 {{t:call|콜했습니다}}. 플롭: [[7s 6h 5d]]. 여기서 매우 강한 핸드({{t:two-pair|투 페어}} 또는 {{t:straight|스트레이트}})를 더 자주 가진 쪽은 누구입니까?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "{{t:big-blind|빅 블라인드}}", correct: true, why: "맞습니다. {{t:big-blind|빅 블라인드}}는 수딧 {{t:connectors|커넥터}}와 6이나 7이 든 핸드를 많이 방어합니다. 버튼의 당신은 여기서 빗나간 높은 카드가 더 많습니다. 이것이 {{t:big-blind|빅 블라인드}}의 {{t:nuts-advantage|너츠 우위}}입니다." }
      - { text: "버튼에서 {{t:open|오픈한}} 당신", why: "아닙니다. 당신의 {{t:range|레인지}}는 높은 카드로 가득합니다. {{t:overpair|오버페어}}({{t:board|보드}}의 모든 카드보다 높은 {{t:pocket-pair|포켓 페어}}, 예: TT, JJ)는 더 많지만 {{t:two-pair|투 페어}}와 {{t:straight|스트레이트}}는 더 적습니다. 셋({{t:pocket-pair|포켓 페어}}로 만든 트리플)은 두 사람 모두 비슷하게 많이 가지고 있습니다." }
      - { text: "두 사람 모두 똑같이 자주", why: "아닙니다. 두 {{t:range|레인지}}는 구성이 다릅니다. {{t:big-blind|빅 블라인드}}의 넓은 방어 범위에는 낮은 카드가 많고, 당신의 {{t:range|레인지}}에는 높은 카드가 많습니다." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "당신의 {{t:open|오픈}}에 {{t:call|콜}}만 한 {{t:big-blind|빅 블라인드}}가 [[Ad 8s 3c]] 플롭에서 AA나 AK를 가진 경우가 드문 이유는 무엇입니까?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "이런 핸드로는 대개 플롭 전에 {{t:raise|레이즈}}(3벳)하기 때문에", correct: true, why: "맞습니다. {{t:big-blind|빅 블라인드}}는 가장 강한 핸드를 3벳으로 플레이하므로, {{t:call|콜}}만 한 뒤의 {{t:range|레인지}}에는 최고의 핸드가 적습니다. 당신의 {{t:range|레인지}}에는 그런 핸드가 모두 있습니다." }
      - { text: "{{t:big-blind|빅 블라인드}}는 에이스를 절대 플레이하지 않기 때문에", why: "아닙니다. {{t:big-blind|빅 블라인드}}는 A5나 A9 같은 에이스를 많이 방어합니다. 주로 빠져 있는 것은 레이즈했을 가장 강한 핸드입니다." }
      - { text: "플롭에 이미 에이스가 한 장 있기 때문에", why: "{{t:board|보드}}의 에이스는 양쪽 {{t:range|레인지}}에서 에이스 {{t:combo|콤보}} 수를 줄이지만, 둘 사이에 차이를 만들지는 않습니다. 차이는 플롭 전의 결정에서 생깁니다." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "당신에게 {{t:range-advantage|레인지 우위}}가 있지만, 상대도 가장 강한 핸드를 당신만큼 가지고 있습니다. 어떤 크기로 베팅하는 편입니까?"
    options:
      - { text: "작게, 그리고 자주", correct: true, why: "맞습니다. {{t:range-advantage|레인지 우위}}는 자주 베팅할 수 있다는 뜻입니다. {{t:nuts-advantage|너츠 우위}}가 없으면 큰 {{t:bet|베팅}}은 상대의 가장 강한 핸드에 맞서 큰 위험을 지게 되고, 약한 핸드는 작은 베팅에도 어차피 {{t:fold|폴드}}합니다." }
      - { text: "크게, 우위가 있으니까", why: "아닙니다. 큰 크기를 결정하는 것은 {{t:nuts-advantage|너츠 우위}}, 즉 가장 강한 핸드가 더 많은 것입니다. 여기서는 그것이 없습니다." }
      - { text: "항상 {{t:check|체크}}합니다", why: "너무 신중합니다. {{t:range-advantage|레인지 우위}}는 자주 베팅할 이유입니다. 다만 작게 베팅합니다." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "당신의 {{t:range|레인지}}에는 상대의 {{t:range|레인지}}보다 가장 강한 핸드가 훨씬 많습니다. 이것은 당신에게 무엇을 줍니까?"
    options:
      - { text: "더 좋은 핸드를 만나는 일이 드물어서 크게 베팅할 수 있습니다", correct: true, why: "맞습니다. 이것이 {{t:nuts-advantage|너츠 우위}}입니다. 큰 {{t:bet|베팅}}은 상대의 중간 핸드에서 더 많이 뽑아내고, 더 좋은 핸드에게 {{t:raise|레이즈}}를 받는 일은 드뭅니다." }
      - { text: "항상 작게 베팅해야 합니다", why: "아닙니다. 작은 크기는 {{t:range-advantage|레인지 우위}}만 있을 때 고릅니다. {{t:nuts-advantage|너츠 우위}}가 있으면 더 크게 베팅할 수 있습니다." }
      - { text: "아무것도 없습니다. 중요한 것은 당신의 핸드뿐입니다", why: "당신의 핸드도 중요하지만 상대는 당신의 {{t:range|레인지}}만 볼 수 있습니다. {{t:bet|베팅}} 크기는 여러 핸드에 한꺼번에 맞도록 고릅니다." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "상대가 [[Jc Td]]처럼 랭크가 다른 카드 두 장을 가지고 있습니다. 플롭이 둘 중 어느 카드와도 페어를 이루지 않는 경우는 몇 퍼센트입니까? 숫자를 입력하세요."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "알 수 없는 카드 {{n:cards.unseen.preflop}}장 중 {{t:pair|페어}}를 만드는 카드는 {{n:pair.outs.unpaired}}장뿐입니다. 남은 잭 세 장과 10 세 장입니다. 플롭은 {{n:cards.board.flop}}장이고, 그중 어느 것도 이 {{n:pair.outs.unpaired}}장에 속하지 않을 확률은 약 {{n:flop.miss.unpaired}}입니다. 따라서 {{t:pair|페어}}를 맞히는 경우는 약 {{n:flop.hit.unpaired}}에 불과합니다."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "{{t:pair|페어}}가 없는 핸드는 플롭에서 약 {{n:flop.miss.unpaired}}의 경우 {{t:pair|페어}}를 맞히지 못합니다. 이것은 c-bet에 어떤 의미가 있습니까?"
    options:
      - { text: "상대에게 아무것도 없는 경우가 많아서, 작은 {{t:bet|베팅}}으로도 {{t:pot|팟}}을 바로 가져오는 일이 많습니다", correct: true, why: "맞습니다. 이것이 c-bet의 기본입니다. 빗나갔다고 항상 {{t:fold|폴드}}하는 것은 아니지만(상대가 {{t:draw|드로우}}나 높은 카드를 가지고 있을 수 있습니다), 상대의 {{t:range|레인지}}에는 약한 핸드가 많습니다." }
      - { text: "상대는 정확히 {{n:flop.miss.unpaired}}의 경우 {{t:fold|폴드}}합니다", why: "아닙니다. {{t:pair|페어}}가 없는 상대도 때로는 {{t:draw|드로우}}나 높은 카드로 {{t:call|콜}}하고, 때로는 핸드에 이미 {{t:pair|페어}}를 들고 있습니다. 이 숫자는 플롭이 상대에게 맞지 않은 빈도의 근사치일 뿐입니다." }
      - { text: "당신도 똑같이 자주 빗나가므로 c-bet은 의미가 없습니다", why: "아닙니다. 당신도 자주 빗나가지만 상대는 그것이 언제인지 모릅니다. {{t:aggressor|어그레서}}(플롭 전에 마지막으로 {{t:raise|레이즈}}한 플레이어)로서 당신의 {{t:range|레인지}}는 많은 플롭에서 더 강하고, 상대가 {{t:fold|폴드}}하면 {{t:bet|베팅}}으로 {{t:pot|팟}}을 가져옵니다." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "그렇다면 플롭이 {{t:pair|페어}}가 없는 핸드의 두 카드 중 적어도 한 장과 페어를 이루는 경우는 몇 퍼센트입니까? 숫자를 입력하세요."
    answer: flop.hit.unpaired
    explanation: "앞의 숫자의 나머지입니다. {{n:prob.certain}}에서 {{n:flop.miss.unpaired}}를 빼면 약 {{n:flop.hit.unpaired}}, 즉 대략 플롭 세 번에 한 번입니다."
---
플롭 전에는 플레이어들의 {{t:range|레인지}}가 서로 다릅니다. 버튼에서 {{t:open|오픈한}} 플레이어는 높은 카드가 많습니다. {{t:big-blind|빅 블라인드}}는 매우 넓게 방어하지만 가장 강한 핸드(AA, KK, AK)는 대개 {{t:raise|레이즈}}하므로, {{t:call|콜}}만 한 뒤에는 그런 핸드가 적습니다. 플롭은 이 {{t:range|레인지}} 중 한쪽에 더 잘 맞고, 그것이 누가 자주 베팅할 수 있는지를 결정합니다.

## {{t:range-advantage|레인지 우위}}

어떤 플롭에서 당신의 핸드가 평균적으로 상대의 핸드보다 강하면 당신에게 {{t:range-advantage|레인지 우위}}가 있습니다. 버튼에서 {{t:open|오픈}}한 뒤 [[Ks 7d 2c]]에서는 좋은 키커를 가진 킹과 높은 {{t:pair|페어}}를 더 많이 가진 쪽이 당신입니다. {{t:big-blind|빅 블라인드}}는 여기서 빗나간 핸드가 많습니다.

[[7s 6h 5d]]처럼 낮고 {{t:connected|연결된}} 플롭에서는 {{t:range-advantage|레인지 우위}}가 거의 사라지고, 가장 강한 핸드는 {{t:big-blind|빅 블라인드}}가 더 자주 가집니다. 수딧 {{t:connectors|커넥터}}와 6이나 7이 든 핸드를 많이 방어하므로 {{t:two-pair|투 페어}}나 {{t:straight|스트레이트}}를 더 자주 가집니다.

## {{t:nuts-advantage|너츠 우위}}

{{t:nuts-advantage|너츠 우위}}는 {{t:range|레인지}}에 가장 강한 핸드(“{{t:nuts|너츠}}”)가 더 많은 것을 말합니다. {{t:range-advantage|레인지 우위}}는 얼마나 자주 베팅할 수 있는지를 알려 줍니다. {{t:nuts-advantage|너츠 우위}}는 얼마나 크게 베팅할지를 알려 줍니다. 상대보다 가장 강한 핸드가 훨씬 많으면 더 큰 크기로 베팅할 수 있습니다. {{t:range-advantage|레인지 우위}}만 있으면 작게 베팅합니다.

## 상대는 대개 빗나갑니다

[[Jc Td]]처럼 {{t:pair|페어}}가 없는 핸드는 플롭에서 약 {{n:flop.miss.unpaired}}의 경우 {{t:pair|페어}}를 맞히지 못합니다. 알 수 없는 카드 {{n:cards.unseen.preflop}}장 중 이 핸드의 카드와 페어를 이루는 카드는 {{n:pair.outs.unpaired}}장뿐입니다. 자료에서는 흔히 약 {{n:flop.hit.one-pair}}라고 하는데, 이는 정확히 {{t:pair|페어}} 하나가 될 확률입니다. {{t:two-pair|투 페어}}와 {{t:three-of-a-kind|트리플}}까지 포함하면 맞힐 확률은 약 {{n:flop.hit.unpaired}}입니다. 그래서 플롭에서의 {{t:bet|베팅}}은 당신이 아무것도 맞히지 못했을 때도 {{t:pot|팟}}을 바로 가져오는 경우가 많습니다. 빗나갔다고 항상 {{t:fold|폴드}}하는 것은 아닙니다. 상대가 {{t:draw|드로우}}나 높은 카드 두 장을 가지고 있을 수 있습니다.

:::note 이 원칙의 출처
{{t:range-advantage|레인지 우위}}와 {{t:nuts-advantage|너츠 우위}}라는 개념은 솔버 결과에 기반한 게임 이론 자료(용어 사전과 c-bet 크기에 관한 글)에서 나왔습니다. 이 레슨의 숫자는 앱이 정확하게 계산한 값입니다.
:::
