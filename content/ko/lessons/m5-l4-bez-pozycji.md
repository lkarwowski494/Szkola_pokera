---
id: m5.l4
module: m5
order: 4
title: "아웃 오브 포지션과 여러 상대"
sub: "체크를 더 자주 해야 할 때"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:cutoff|CO}}에서 {{t:open|오픈했고}}, 버튼이 {{t:call|콜했으며}}, 블라인드는 {{t:fold|폴드했습니다}}. 플롭은 중간 높이이고 {{t:connected}}입니다. 당신이 먼저 행동합니다. 여기서 맞는 플랜은 무엇입니까?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:in-position}}일 때보다 더 자주 {{t:check|체크합니다}}", correct: true, why: "맞습니다. 버튼은 {{t:position|포지션}}을 가진 채 {{t:call|콜했으므로}} 강한 {{t:range}}를 가지고 있고, 중간 높이의 {{t:connected}} 플롭은 버튼의 {{t:pair|페어}}와 {{t:connectors|커넥터}}에 잘 맞습니다. {{t:out-of-position|아웃 오브 포지션}}에서는 여기서 강한 핸드로도 매우 자주 {{t:check|체크합니다}}." }
      - { text: "버튼에서처럼 자주, 작게 C벳", why: "그것은 {{t:dry|드라이하고}} 높은 플롭에서 {{t:in-position}}일 때의 플랜입니다. 여기서는 {{t:position|포지션}}이 없고, 플롭도 당신의 {{t:range|레인지}}에 유리하지 않습니다." }
      - { text: "{{t:initiative|주도권}}을 잃지 않도록 모든 핸드로 C벳", why: "{{t:initiative|주도권}}만으로는 이기지 못합니다. 여기서는 버튼의 {{t:range}}가 강하고, 당신은 {{t:bet|베팅}}할 때마다 턴과 리버에서도 먼저 행동합니다." }
  - kind: cbet
    id: m5.l4.c-oop
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:hijack|HJ}}에서 {{t:open|오픈했고}}, 버튼이 {{t:call|콜했으며}}, 나머지는 모두 {{t:fold|폴드했습니다}}. 당신이 먼저 행동합니다. 이 플롭에는 어떤 플랜이 맞습니까?"
    position: HJ
    options:
      check: "{{t:check|체크합니다}}"
      small: "작은 C벳: {{t:pot|팟}}의 {{n:cbet.size.small}}"
      big: "큰 C벳: {{t:pot|팟}}의 {{n:cbet.size.big}}"
    cases:
      - when: { height: [low], ranks: [connected, semi-connected, disconnected] }
        best: check
        rule: R-M5-012
        why:
          check: "맞습니다. {{t:pair|페어}}가 없는 낮은 플롭(가장 높은 카드가 9 이하)에서는 솔버가 이 상황에서 {{t:range|레인지}} 전체로 {{t:check|체크합니다}}. 당신의 넓은 {{t:range}}에는 여기서 빗나간 높은 카드가 많은 반면, {{t:position|포지션}}을 가진 채 {{t:call|콜한}} 버튼은 가망 없는 핸드가 더 적습니다."
          small: "너무 자주 합니다. {{t:pair|페어}}가 없는 낮은 플롭에서 솔버는 이 상황에서 C벳을 하지 않고, 강한 핸드까지 포함해 {{t:range|레인지}} 전체로 {{t:check|체크합니다}}. 버튼이 {{t:bet|베팅하면}}, 강한 핸드 일부는 {{t:check|체크}}한 뒤 {{t:raise|레이즈합니다}}(체크레이즈)."
          big: "너무 자주 하고 너무 비쌉니다. {{t:pair|페어}}가 없는 낮은 플롭에서 솔버는 이 상황에서 C벳을 하지 않고, 강한 핸드까지 포함해 {{t:range|레인지}} 전체로 {{t:check|체크합니다}}. 버튼이 {{t:bet|베팅하면}}, 강한 핸드 일부는 {{t:check|체크}}한 뒤 {{t:raise|레이즈합니다}}(체크레이즈)."
    count: 3
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "왜 {{t:out-of-position}}에서는 {{t:in-position}}일 때보다 C벳을 덜 자주 합니까?"
    options:
      - { text: "{{t:in-position}}인 상대는 모든 {{t:street|스트리트}}에서 당신의 행동을 보고, {{t:call|콜}} 후 상대의 {{t:range}}는 강하기 때문에", correct: true, why: "맞습니다. {{t:position|포지션}}을 가지고 {{t:call|콜하는}} 플레이어는 약한 핸드를 {{t:fold|폴드했고}}, 가장 강한 핸드는 자주 {{t:raise|레이즈했습니다}}. 남은 것은 중간 핸드와 좋은 핸드이며, 게다가 마지막에 행동합니다." }
      - { text: "{{t:out-of-position}}에서 C벳은 금지되어 있기 때문에", why: "아닙니다. 규칙상 어느 자리에서든 베팅할 수 있습니다. 요점은 {{t:out-of-position}}에서 하는 C벳이 이득이 되는 경우가 더 드물다는 것입니다." }
      - { text: "{{t:out-of-position}}에서는 항상 더 약한 핸드를 가지고 있기 때문에", why: "아닙니다. 당신의 핸드는 {{t:position|포지션}}에 따라 달라지지 않습니다. 달라지는 것은 그 핸드의 에퀴티를 얼마나 쉽게 실현하느냐입니다." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:cutoff|CO}}에서 {{t:open|오픈했고}}, 버튼이 {{t:call|콜했으며}}, 블라인드는 {{t:fold|폴드했습니다}}. 당신은 {{t:dry|드라이한}} 플롭에서 최고 키커의 {{t:top-pair|탑 페어}}를 가지고 있습니다. 당신이 먼저 행동합니다. 어떻게 하시겠습니까?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|체크합니다}} (버튼의 {{t:bet}}에 {{t:call|콜하기}} 위해)", correct: true, why: "맞습니다. 버튼은 {{t:position|포지션}}을 가진 채 {{t:call|콜했으므로}} 버튼의 {{t:range}}는 강하고, 이 플롭에서 솔버는 {{t:out-of-position}}에서 거의 모든 {{t:range|레인지}}로 {{t:check|체크하며}}, 최고 키커의 {{t:top-pair|탑 페어}}도 마찬가지입니다. {{t:check|체크}} 후에는 버튼의 {{t:bet}}에 {{t:call|콜합니다}}." }
      - { text: "{{t:pot|팟}}의 {{n:cbet.size.small}} C벳", why: "너무 자주입니다. 이 상황에서 솔버는 {{n:cbet.oop.a94.bet}} 미만의 빈도로 베팅합니다. 최고 키커의 {{t:top-pair|탑 페어}}는 {{t:check|체크}}와 {{t:call|콜}}로 플레이합니다." }
      - { text: "{{t:pot|팟}}의 {{n:cbet.size.big}} C벳", why: "너무 자주입니다. 이 상황에서 솔버는 {{n:cbet.oop.a94.bet}} 미만의 빈도로 베팅합니다. 최고 키커의 {{t:top-pair|탑 페어}}는 {{t:check|체크}}와 {{t:call|콜}}로 플레이합니다." }
      - { text: "{{t:fold|폴드}}", why: "아직 아무도 {{t:bet|베팅하지}} 않았으므로 {{t:fold}}는 아무 이득이 없습니다. 무료로 {{t:check|체크할}} 수 있습니다(모듈 1의 규칙). 이 핸드는 {{t:check|체크}}와 {{t:call|콜}}로 플레이합니다." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:cutoff|CO}}에서 {{t:open|오픈했고}}, 버튼과 {{t:big-blind}}가 {{t:call|콜했습니다}}. 플롭에서 {{t:big-blind}}가 {{t:check|체크하고}}, 버튼은 당신 다음에 행동합니다. 당신은 {{t:draw|드로우}} 없이 높은 카드만 가지고 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|체크합니다}}", correct: true, why: "맞습니다. 두 상대를 상대로 {{t:pair|페어}}도 {{t:draw|드로우}}도 없는 핸드는 {{t:bet|베팅}}으로 {{t:pot|팟}}을 가져오는 경우가 드뭅니다. 두 명 중 누군가가 이 플롭에 맞았을 가능성이 더 높습니다." }
      - { text: "1대1 게임에서처럼 작은 C벳", why: "두 상대를 상대로 하는 {{t:bluff}}는 두 사람을 모두 통과해야 하고, 두 사람이 동시에 빗나가는 경우는 한 사람이 빗나가는 경우보다 훨씬 드뭅니다." }
      - { text: "둘 다 밀어내기 위한 큰 C벳", why: "두 상대를 상대로 한 큰 {{t:bluff}}는 위험이 크고, 두 사람 모두 {{t:fold|폴드할}} 가능성은 작습니다. 이 플롭에서 그들은 많은 {{t:pair|페어}}와 {{t:draw|드로우}}를 가지고 있습니다." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:cutoff|CO}}에서 {{t:open|오픈했고}}, 버튼과 {{t:big-blind}}가 {{t:call|콜했습니다}}. {{t:big-blind|빅 블라인드}}가 {{t:check|체크합니다}}. 당신은 좋은 키커의 {{t:top-pair|탑 페어}}를 가지고 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|체크합니다}}", correct: true, why: "맞습니다. {{t:dry|드라이한}} 플롭의 멀티웨이 {{t:pot|팟}}에서 솔버는 매우 강한 핸드로도 아주 자주 {{t:check|체크합니다}}. 두 명의 {{t:call|콜러}}가 합쳐서 플롭에 맞았을 가능성이 더 높기 때문입니다." }
      - { text: "{{t:value|밸류}}를 위해 베팅합니다", why: "{{t:dry|드라이한}} 플롭에서 두 상대를 상대로 솔버는 매우 강한 핸드로도 {{t:check|체크합니다}}. 베팅은 드물게, 작게 하며, 주로 플롭이 당신의 {{t:range}}에 잘 맞을 때입니다." }
      - { text: "{{t:fold|폴드합니다}}", why: "아무도 {{t:bet|베팅하지}} 않았으므로 무료로 {{t:check|체크할}} 수 있습니다. {{t:fold|폴드}}는 아마 당신이 앞서 있는 {{t:pot|팟}}을 포기하는 것입니다." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "{{t:pair|페어}}가 없는 핸드 하나가 플롭에 빗나가는 경우는 약 {{n:flop.miss.unpaired}}입니다. 그런 핸드 두 개(서로 다른 랭크 네 개)가 동시에 빗나가는 경우는 얼마나 됩니까?"
    options:
      - { text: "약 {{n:flop.miss.two}}", correct: true, why: "맞습니다. 핸드 하나일 때와 똑같이 계산하되, 페어를 만드는 카드가 더 많을 뿐입니다. 알 수 없는 카드 {{n:cards.unseen.two-hands}}장(당신의 카드 제외) 중 {{n:pair.outs.two-hands}}장입니다. 플롭 카드 {{n:cards.board.flop}}장 중 어느 것도 그 안에 없을 확률은 약 {{n:flop.miss.two}}입니다. 즉 두 사람이 모두 빗나가는 경우는 절반이 안 됩니다." }
      - { text: "약 {{n:flop.miss.unpaired}}, 핸드 하나와 같음", why: "아닙니다. 상대가 한 명 늘 때마다 누군가 맞았을 가능성이 하나 더 생깁니다. 모두가 빗나갈 확률은 플레이어가 늘 때마다 줄어듭니다." }
      - { text: "약 {{n:flop.hit.unpaired}}", why: "그것은 {{t:pair|페어}}가 없는 핸드 하나가 플롭에서 {{t:pair|페어}}를 맞힐 확률입니다. 질문은 두 핸드가 모두 빗나가는 경우에 관한 것입니다." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "{{t:in-position}} 복습: 버튼에서 {{t:open|오픈했고}}, {{t:big-blind}}가 {{t:call|콜한}} 뒤 플롭에서 {{t:check|체크합니다}}. 이 플롭에 맞는 플랜은 무엇입니까?"
    position: BTN
    options:
      check: "더 자주 {{t:check|체크하고}}, C벳은 평소보다 덜 합니다"
      small: "자주, 작게 C벳: {{t:pot|팟}}의 {{n:cbet.size.small}} ({{n:cbet.btn.small}})"
      big: "자주, 크게 C벳: {{t:pot|팟}}의 {{n:cbet.size.big}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected], oesdPossible: false }
        best: small
        rule: R-M5-007
        why:
          check: "너무 조심스럽습니다. {{t:dry|드라이하고}} 높은 플롭에서는 당신이 {{t:range-advantage|레인지 우위}}를 가지고 있고, 상대는 보통 빗나갔습니다. {{t:check|체크하면}} 상대에게 무료 카드를 줍니다."
          small: "맞습니다. {{t:dry|드라이하고}} 높은 플롭은 당신에게 유리합니다. 작은 {{t:bet}}만으로도 상대가 약한 핸드를 {{t:fold|폴드하게}} 만들기에 충분하고, 더 약한 {{t:pair|페어}}는 여전히 {{t:call|콜할}} 것입니다."
          big: "좋은 액션, 잘못된 사이즈입니다. {{t:dry|드라이한}} 플롭에서 상대는 {{t:draw|드로우}}가 적고, 빗나간 핸드는 작은 {{t:bet}}에도 {{t:fold|폴드합니다}}. 더 큰 {{t:bet}}은 더 많은 핸드를 {{t:fold|폴드시키지}} 못하면서 위험은 더 큽니다. {{t:pot|팟}}의 약 {{n:cbet.size.small}}로 베팅하세요."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "맞습니다. 카드가 서로 가까운 낮은 플롭은 {{t:big-blind|빅 블라인드}}의 {{t:range|레인지}}에 맞습니다. 빅 블라인드는 작은 카드로 된 핸드를 많이 방어하고, 당신의 높은 카드는 여기서 빗나갔습니다. {{t:connected|커넥티드}} 플롭에서는 빅 블라인드에게 {{t:straight|스트레이트}}와 {{t:two-pair|투 페어}}도 있으므로, 당신에게는 보통 {{t:nuts-advantage|넛 우위}}가 없습니다. 높은 플롭보다 C벳을 덜 자주 합니다. 많은 핸드가 {{t:check|체크하고}}, 주로 강한 핸드와 강한 {{t:draw|드로우}}가 베팅합니다."
          small: "너무 자주입니다. 카드가 서로 가까운 낮은 플롭은 {{t:big-blind|빅 블라인드}}의 {{t:range|레인지}}에 맞고, {{t:connected|커넥티드}} 플롭에서는 당신에게 보통 {{t:nuts-advantage|넛 우위}}가 없습니다. 작더라도 잦은 C벳은 {{t:big-blind|빅 블라인드}}에게 가장 강한 핸드로 {{t:raise|레이즈}}(체크레이즈)할 기회를 줍니다."
          big: "너무 자주, 너무 비쌉니다. 이 플롭은 {{t:big-blind|빅 블라인드}}의 {{t:range|레인지}}에 맞고, {{t:connected|커넥티드}} 플롭에서는 빅 블라인드에게 {{t:straight|스트레이트}}와 {{t:two-pair|투 페어}}도 있습니다. 당신이 보통 높은 카드만 가지고 있을 때 잦은 큰 C벳은 위험이 큽니다."
    count: 3
---
지금까지는 한 명의 상대를 상대로 {{t:in-position}}에서 플레이했습니다. {{t:out-of-position|아웃 오브 포지션}}일 때와 여러 플레이어를 상대할 때는 C벳을 덜 자주 합니다.

## {{t:out-of-position|아웃 오브 포지션}}

{{t:cutoff|CO}}에서 {{t:open|오픈하고}} 버튼이 {{t:call|콜하면}}, 플롭 이후 모든 {{t:street|스트리트}}에서 당신이 먼저 행동합니다. 게다가 버튼의 {{t:range|레인지}}는 강합니다. 약한 핸드는 {{t:fold|폴드했고}} 가장 강한 핸드 중 일부는 {{t:raise|레이즈했으므로}}, 중간 핸드와 좋은 핸드가 남았습니다. 이처럼 가장 강한 핸드가 빠지고 주로 중간 핸드로 이루어진 {{t:range|레인지}}는 {{t:condensed|컨덴스드}} 레인지입니다. 그래서 {{t:out-of-position}}에서는 훨씬 더 자주 {{t:check|체크하며}}, 종종 {{t:range|레인지}} 전체로, 강한 핸드로도 체크합니다. 이런 핸드는 {{t:call|콜}}이나 체크레이즈로 플레이합니다. 베팅은 주로 당신의 {{t:range|레인지}}에 매우 크게 유리한 플롭, 예를 들어 K-Q-6에서 합니다. {{t:out-of-position}}에서 {{t:check|체크}}한다고 해서 핸드를 포기하는 것은 아닙니다. 이런 핸드 중 다수는 상대의 {{t:bet}}에 {{t:call|콜합니다}}.

## 여러 상대를 상대할 때

상대가 한 명 늘 때마다 누군가 플롭에 맞았을 가능성이 하나 더 생깁니다. {{t:pair|페어}}가 없는 핸드 하나가 플롭에 빗나가는 경우는 약 {{n:flop.miss.unpaired}}이지만, 두 핸드가 동시에 빗나가는 경우는 약 {{n:flop.miss.two}}뿐입니다. {{t:bluff|블러프}}는 모든 상대를 통과해야 하므로, 여러 상대를 상대할 때는 주로 {{t:bluff|블러프}}를 포기합니다. 베팅은 드물게, 작게 하며, 주로 당신의 {{t:range}}에 잘 맞는 플롭에서 합니다. {{t:dry|드라이한}} 플롭에서는 매우 강한 핸드로도 자주 {{t:check|체크합니다}}.

:::note 이 규칙의 출처
이 레슨의 규칙은 공개된 솔버 결과({{t:out-of-position}}에서의 C벳, 에이스가 있는 플롭과 멀티웨이 {{t:pot|팟}}에서의 C벳)와 교육 자료(멀티웨이 {{t:pot}})에서 나온 것입니다. 이것은 휴리스틱입니다. 앱은 빈도를 퍼센트로 제시하지 않습니다. 두 핸드가 동시에 빗나갈 확률은 서로 다른 랭크 네 개로 이루어진 두 핸드에 대한 정확한 계산이며, 핸드 하나에 대한 수치와 마찬가지로 당신의 카드는 계산에서 제외합니다.
:::
