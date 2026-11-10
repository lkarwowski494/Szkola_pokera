---
id: m8.l3
module: m8
order: 3
title: "블로커"
sub: "어떤 핸드로 블러프할지"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "{{t:blocker}}란 무엇입니까?"
    options:
      - { text: "내 핸드에 있어서 상대가 어떤 핸드의 {{t:combo|콤보}}를 더 적게 갖게 되는 카드", correct: true, why: "내가 쥔 카드는 상대가 가질 수 없습니다. 내가 에이스를 들고 있으면 상대의 에이스가 줄어듭니다. 에이스 {{t:pair|페어}}도, AK도, 에이스가 들어간 플러시도 적어집니다." }
      - { text: "{{t:board|보드}}에 깔려 {{t:draw}}를 망치는 카드", why: "{{t:board|보드}}의 카드를 두고 흔히 이렇게 말하기도 하지만, 이 의미의 {{t:blocker}}는 내 핸드에 있는 카드입니다. {{t:board|보드}}의 카드는 두 플레이어 모두 봅니다." }
      - { text: "상대의 큰 벳을 막기 위한 작은 벳", why: "그것은 이른바 블로킹 벳으로, 다른 개념입니다. {{t:blocker|블로커}}는 상대의 {{t:combo|콤보}} 수를 줄이는, 내 핸드의 카드입니다." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "아무 정보가 없을 때 AK의 {{t:combo|콤보}}는 {{n:combos.unpaired}}개입니다. 내가 킹을 들고 있습니다(에이스는 없음). 상대가 가질 수 있는 AK {{t:combo|콤보}}는 몇 개입니까? 숫자를 입력하세요."
    answer: combos.unpaired.one-blocked
    explanation: "에이스는 {{n:cards.suits}}장이고, 킹은 한 장이 내 손에 있으므로 {{n:pair.outs.per-rank}}장 남았습니다: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. 카드 한 장이 {{t:combo|콤보}}의 4분의 1을 통째로 없앱니다."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "에이스 {{t:pair|페어}}의 {{t:combo|콤보}}는 {{n:combos.pair}}개입니다. 내가 에이스 한 장을 들고 있습니다. 상대가 가질 수 있는 에이스 {{t:pair|페어}} {{t:combo|콤보}}는 몇 개입니까? 숫자를 입력하세요."
    answer: combos.pair.one-blocked
    explanation: "에이스는 {{n:pair.outs.per-rank}}장 남았고, 카드 세 장으로는 {{t:pair|페어}}를 {{n:combos.pair.one-blocked}}개만 만들 수 있습니다. 내 핸드의 에이스 한 장이 AA {{t:combo|콤보}}의 절반을 없앱니다."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "[[Ah Kc]]를 들고 있습니다. 상대가 가질 수 있는 AK {{t:combo|콤보}}는 몇 개입니까?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "에이스 {{n:pair.outs.per-rank}}장과 킹 {{n:pair.outs.per-rank}}장이 남았습니다: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "에이스만 또는 킹만 들고 있을 때의 개수입니다. 지금은 두 랭크를 모두 블록합니다." }
      - { text: "{{n:combos.unpaired}}", why: "내 카드를 보기 전 덱에 있는 AK {{t:combo|콤보}} 수입니다. 내 에이스와 내 킹은 상대 손에 있을 수 없습니다." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "리버에 세 번째 하트가 나와 {{t:flush}}가 가능해졌습니다. {{t:big-blind|빅 블라인드}}가 {{t:check|체크}}합니다. 내 핸드는 에이스 하이뿐이고, 블러프를 하려고 합니다. 어느 핸드가 더 좋은 {{t:bluff}}입니까?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "하트 에이스는 상대의 가장 강한 플러시를 블록합니다. 상대는 에이스 {{t:flush|플러시}}를 가질 수 없는데, 이는 언제나 돈을 낼 핸드입니다. 상대가 {{t:call|콜}}할 핸드가 줄어들므로 {{t:bluff}}가 더 자주 통합니다." }
      - { text: "[[Ad 3c]]", why: "쇼다운에서의 강도는 같지만 어떤 {{t:flush|플러시}}도 블록하지 못합니다. 상대에게는 돈을 낼 플러시가 모두 그대로 남습니다." }
      - { text: "차이 없음, 둘 다 에이스 하이일 뿐", why: "쇼다운에서는 그렇지만 {{t:bluff}}로서는 아닙니다. 하트 에이스는 확실히 돈을 낼 상대의 플러시 수를 줄입니다." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "스페이드 {{t:flush-draw|플러시 드로우}}가 완성되지 않았습니다. {{t:big-blind|빅 블라인드}}가 리버에서 체크합니다. 두 핸드 모두 퀸-에이트뿐입니다. 어느 쪽으로 블러프하는 것이 더 좋습니까?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "스페이드가 없으면 상대의 실패한 {{t:draw|드로우}}를 블록하지 않습니다. 그 핸드들은 내 벳에 {{t:fold|폴드}}할 핸드입니다. 두 핸드의 나머지 카드는 같습니다." }
      - { text: "[[Qd 8s]]", why: "스페이드 에이트는 상대가 {{t:fold|폴드}}했을 실패한 {{t:flush-draw|플러시 드로우}}의 일부(예: [[8s 7s]])를 블록합니다. 그러면 상대에게는 돈을 낼 핸드가 상대적으로 더 많이 남습니다." }
      - { text: "차이 없음", why: "차이는 에이트의 무늬에 있습니다. 내 핸드의 스페이드는 상대가 폴드할 핸드의 일부를 빼앗습니다." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "같은 상황입니다. 스페이드는 완성되지 않았고 {{t:big-blind}}가 {{t:check|체크}}합니다. 두 핸드 중 하나를 들고 있습니다. 어느 핸드로 {{t:bluff|블러프}}하고, 어느 핸드로 {{t:check|체크}}합니까?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qc Jd]]로 {{t:bluff|블러프}}, [[9c 8c]]로 {{t:check|체크}}", correct: true, why: "나인 {{t:pair|페어}}는 {{t:check|체크}} 후 실패한 {{t:draw|드로우}}를 이깁니다. 퀸-잭은 거의 모든 핸드에 지므로 {{t:bluff|블러프}}로만 {{t:pot|팟}}을 가져올 수 있습니다." }
      - { text: "[[9c 8c]]로 {{t:bluff|블러프}}, [[Qc Jd]]로 {{t:check|체크}}", why: "반대입니다. 나인 {{t:pair|페어}}로 {{t:bluff|블러프}}하면 쇼다운에서의 승리를 포기하고, 퀸-잭으로 {{t:check}}하면 싸워 보지도 않고 {{t:pot|팟}}을 내줍니다." }
      - { text: "둘 다 {{t:bluff|블러프}}", why: "나인 {{t:pair|페어}}에는 {{t:bluff|블러프}}가 필요 없습니다. {{t:check|체크}} 후 많은 핸드를 이깁니다. {{t:bluff|블러프}}는 쇼다운 밸류가 없는 핸드로 합니다." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "쇼다운 밸류가 없는 핸드 중에서 리버 {{t:bluff}}를 고르고 있습니다. 핸드의 어떤 카드가 가장 도움이 됩니까?"
    options:
      - { text: "상대가 돈을 낼 핸드에 들어가는 카드", correct: true, why: "상대의 밸류를 블록합니다. 상대의 강한 핸드가 줄어들므로 폴드할 핸드만 남는 경우가 더 많아집니다." }
      - { text: "실패한 {{t:draw|드로우}}와 같은 무늬의 카드", why: "이 카드는 상대가 {{t:fold|폴드}}할 핸드를 블록합니다. 그러면 {{t:bluff|블러프}}가 덜 자주 통합니다." }
      - { text: "보드와 상관없이 가장 높은 카드", why: "높은 카드는 쇼다운에서 약간의 강도를 주지만, 무엇을 블록하는지는 알려 주지 않습니다. 상대의 어떤 핸드가 돈을 낼지 보세요." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "리버에 세 번째 하트가 나왔습니다. {{t:big-blind|빅 블라인드}}가 {{t:check|체크}}합니다. 나인 {{t:pair|페어}}와 하트 에이스를 들고 있습니다. 어떻게 하겠습니까?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|체크}}", correct: true, why: "나인 {{t:pair|페어}}는 {{t:check|체크}} 후 {{t:pair|페어}}가 없는 상대의 많은 핸드를 이깁니다. {{t:blocker|블로커}}가 있다고 해서 쇼다운 밸류가 있는 핸드가 좋은 {{t:bluff}}가 되지는 않습니다. 먼저 승산이 없는 핸드를 고르고, 그다음에야 {{t:blocker|블로커}}를 봅니다." }
      - { text: "하트 에이스가 있으니 {{t:bluff}}로 벳", why: "하트 에이스는 좋은 {{t:blocker}}지만, 나인 {{t:pair|페어}}로 {{t:bluff|블러프}}하면 손해입니다. 더 약한 핸드는 어차피 {{t:fold|폴드}}했을 것이고, 플러시와 킹은 돈을 냅니다." }
      - { text: "{{t:value|밸류}}로 벳", why: "더 약한 핸드로 누가 돈을 내겠습니까? 플러시가 가능한 {{t:board|보드}}에서 나인 {{t:pair|페어}}보다 약한 핸드는 거의 항상 {{t:fold|폴드}}합니다." }
---
지난 레슨에서 {{t:bluff|블러프}}가 몇 개 필요한지, 그리고 쇼다운에서 승산이 없는 핸드로 {{t:bluff|블러프}}한다는 것을 정했습니다. 그런 핸드가 필요한 것보다 많은 경우가 흔합니다. 그때 선택을 가르는 것이 **{{t:blocker|블로커}}**입니다.

## {{t:blocker|블로커}}

내가 쥔 카드는 상대가 가질 수 없습니다. 그래서 상대는 그 카드가 들어간 핸드의 {{t:combo|콤보}}를 더 적게 가집니다:

| 상대의 핸드 | {{t:blocker|블로커}} 없음 | 그 랭크의 카드를 한 장 들고 있을 때 |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

에이스와 킹을 모두 들고 있으면 상대의 AK {{t:combo|콤보}}는 {{n:combos.unpaired.both-blocked}}개뿐입니다.

## 상대가 돈을 낼 핸드를 블록하세요

좋은 {{t:bluff}}는 상대가 **{{t:call|콜}}**할 핸드에 들어가는 카드를 가지고 있습니다. 예: 리버에 세 번째 하트가 나왔습니다. 내 핸드의 하트 에이스는 상대에게 에이스 {{t:flush|플러시}}, 즉 언제나 돈을 내는 핸드가 없다는 뜻입니다. 상대에게는 폴드할 핸드가 더 많이 남습니다.

## 상대가 {{t:fold|폴드}}할 핸드는 블록하지 마세요

{{t:flush-draw}}가 **완성되지 않으면** 상대는 실패한 {{t:draw|드로우}}를 {{t:fold|폴드}}합니다. 내가 그 무늬의 카드를 가지고 있으면 그런 핸드가 줄어들어, 내 {{t:bluff}}가 돈을 낼 핸드를 만나는 일이 더 잦아집니다. 비슷한 {{t:bluff|블러프}} 두 개 중에서는 실패한 {{t:draw|드로우}}와 같은 무늬의 카드가 없는 쪽을 고릅니다.

## 쇼다운 강도가 먼저

순서는 정해져 있습니다. 먼저 {{t:check|체크}} 후 이길 수 있는 핸드를 따로 빼 두고, 나머지 중에서만 가장 좋은 {{t:blocker|블로커}}를 가진 {{t:bluff|블러프}}를 고릅니다. 좋은 {{t:blocker}}가 있어도 쇼다운에서 이길 {{t:pair|페어}}를 {{t:bluff|블러프}}로 만들지는 않습니다. {{t:blocker|블로커}}는 비슷한 핸드 사이에서 선택을 기울게 합니다. 효과 자체는 작으므로 핸드의 강도가 비슷할 때에만 결정적입니다(다음 레슨의 {{t:call|콜}} 선택도 마찬가지입니다).

:::note 이 원칙의 출처
{{t:combo|콤보}} 수는 조합론입니다. {{t:blocker|블로커}}에 따른 {{t:bluff|블러프}} 선택 원칙은 교육 과정과 훈련 자료, 솔버 분석에서 나왔습니다. 다른 {{t:bluff|블러프}}가 부족하면 솔버는 실패한 플러시로도 {{t:bluff|블러프}}합니다.
:::
