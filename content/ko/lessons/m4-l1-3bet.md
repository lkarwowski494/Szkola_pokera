---
id: m4.l1
module: m4
order: 1
title: "누군가 앞에서 오픈했을 때"
sub: "폴드, 콜 또는 3벳"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "{{t:cutoff|CO}}가 {{n:pf.open-size}}로 {{t:open|오픈}}했습니다. 버튼에서 {{t:raise|레이즈}}하려고 합니다. 얼마까지 올릴까요?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "{{n:pf.3bet.ip-total}}까지", correct: true, why: "{{t:in-position|인 포지션}}에서는 {{t:open|오픈}} 금액의 약 {{n:pf.3bet.size-ip}}로 {{t:raise|레이즈}}합니다. 이것이 표준이며, 플롭에서 스택 대비 {{t:pot|팟}} 비율을 좋게 남겨 줍니다." }
      - { text: "{{n:pf.3bet.too-small}}까지", why: "너무 작습니다: 상대는 거의 모든 핸드로 {{t:call|콜}}하고 계속 플레이할 수 있는 아주 좋은 가격을 얻습니다." }
      - { text: "{{n:pf.3bet.too-big}}까지", why: "{{t:in-position}}에서 플레이하기에는 너무 큽니다: 더 많은 위험을 감수하지만, 상대의 더 좋은 핸드는 어차피 {{t:fold|폴드}}하지 않습니다." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "버튼이 {{n:pf.open-size}}로 {{t:open|오픈}}했고, {{t:small-blind}}는 {{t:fold|폴드}}했습니다. {{t:big-blind|빅 블라인드}}에서 {{t:raise|레이즈}}하려고 합니다. 얼마까지 올릴까요?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "{{n:pf.3bet.oop-total}}까지", correct: true, why: "{{t:out-of-position|아웃 오브 포지션}}에서는 {{t:open|오픈}} 금액의 약 {{n:pf.3bet.size-oop}}로 {{t:raise|레이즈}}합니다. 더 큰 사이즈는 버튼이 {{t:in-position}}에서 싸게 {{t:call}}할 기회를 빼앗습니다." }
      - { text: "{{n:pf.3bet.ip-total}}까지", why: "이것은 {{t:in-position}} 플레이어를 위한 사이즈입니다. {{t:out-of-position|아웃 오브 포지션}}에서는 상대에게 너무 좋은 가격을 줍니다." }
      - { text: "{{t:call|콜}}만 합니다", why: "KK라면 곧바로 {{t:pot|팟}}을 키우고 싶습니다: 프리플롭에서 두 번째로 좋은 핸드입니다." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "버튼이 {{n:pf.open-size}}로 {{t:open|오픈}}했습니다. 당신은 {{t:small-blind|스몰 블라인드}}에 있습니다. 어떤 계획이 표준입니까?"
    table: { position: SB }
    options:
      - { text: "{{t:raise|레이즈}}하거나 {{t:fold|폴드}}합니다", correct: true, why: "{{t:call|콜}}하면 {{t:out-of-position}}에서 플레이하게 되고, 뒤에 아직 {{t:big-blind}}가 남아 있습니다. 레이트 포지션의 {{t:open|오픈}}에 맞서 {{t:small-blind|스몰 블라인드}}에서 솔버는 거의 항상 {{t:raise|레이즈}}하거나 {{t:fold|폴드}}합니다." }
      - { text: "이미 블라인드의 절반이 {{t:pot|팟}}에 들어가 있으니 넓게 {{t:call|콜}}합니다", why: "블라인드의 절반은 적은 금액입니다. {{t:big-blind|빅 블라인드}}를 뒤에 두고 {{t:out-of-position}}에서 하는 {{t:call|콜}}은 {{t:equity-realization|에퀴티 실현}}이 나쁩니다: 쇼다운 전에 자주 {{t:fold|폴드}}하기 때문에, 핸드의 에퀴티가 나타내는 것보다 {{t:pot|팟}}에서 더 작은 몫을 가져갑니다." }
      - { text: "항상 {{t:fold|폴드}}합니다", why: "너무 타이트합니다: 버튼은 매우 넓게 {{t:open|오픈}}하므로, 강한 핸드와 일부 {{t:bluff|블러프}}로 {{t:raise|레이즈}}할 가치가 있습니다." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "당신은 버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}에 있습니다. 다음 중 {{t:bluff}}로 하는 전형적인 3벳 핸드는 무엇입니까?"
    table: { position: BB }
    options:
      - { text: "A5 수티드", correct: true, why: "상대의 AA와 AK를 블록하고, {{t:call|콜}}을 받은 뒤에도 {{t:flush}}나 {{t:straight|스트레이트}}를 만들 가능성이 있습니다. {{t:call|콜}} {{t:range|레인지}} 하단에서 나오는 전형적인 {{t:bluff}}입니다: {{t:big-blind|빅 블라인드}}에서는 가장 강한 핸드와 이런 {{t:bluff|블러프}}를 3벳합니다." }
      - { text: "K7 오프수트", why: "이 핸드는 {{t:call|콜}}로 방어합니다. 3벳으로는 중요한 것을 아무것도 블록하지 못하고, 상대가 {{t:call|콜}}하면 잘 플레이되지 않습니다." }
      - { text: "{{t:pair|페어}} 22", why: "가장 작은 {{t:pair|페어}}는 {{t:call|콜}}로 방어합니다: 셋({{t:pocket-pair|포켓 페어}}, 즉 두 장의 {{t:hole-cards|홀 카드}}로 이루어진 {{t:pair|페어}}로 만든 {{t:three-of-a-kind|트리플}})을 맞히면 돈을 벌고, 이 핸드로 3벳하면 4벳에 잘 대처하지 못합니다." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
누군가 당신 앞에서 {{t:open|오픈}}했다면 선택지는 세 가지입니다: {{t:fold|폴드}}하거나, {{t:call|콜}}하거나, 한 번 더 {{t:raise|레이즈}}할 수 있습니다. 다시 하는 {{t:raise}}를 3벳이라고 부르는데, 핸드에서 세 번째 {{t:bet}}이기 때문입니다(블라인드, {{t:open}}, {{t:raise}}).

## 3벳 사이즈

{{t:in-position|인 포지션}}에서는 {{t:open|오픈}} 금액의 약 {{n:pf.3bet.size-ip}}까지 {{t:raise|레이즈}}합니다. 즉 {{n:pf.open-size}} {{t:open|오픈}}이라면 {{n:pf.3bet.ip-total}}까지입니다. {{t:out-of-position|아웃 오브 포지션}}에서는, 예를 들어 {{t:cutoff|CO}}나 버튼의 {{t:open|오픈}}에 맞서 블라인드에서 플레이할 때는, {{t:open|오픈}} 금액의 약 {{n:pf.3bet.size-oop}}, 즉 {{n:pf.3bet.oop-total}}까지 올립니다. {{t:out-of-position}}에서 더 큰 사이즈를 쓰면 상대에게서 싼 {{t:call}} 기회를 빼앗습니다. 그렇게 콜하면 상대는 이후 {{t:position|포지션}} 우위를 안고 플레이하게 됩니다.

## {{t:position|포지션}}이 {{t:call|콜}} 여부를 결정합니다

공개된 솔버 솔루션에 따르면, {{t:cutoff|CO}}의 {{t:open|오픈}}에 맞선 버튼은 보통 핸드의 약 {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}}를 3벳하고, {{t:call|콜}}은 약 {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}에 불과합니다. {{t:utg|UTG}}의 {{t:open|오픈}}(이 솔루션에서는 {{n:pf.open-size.solver-utg}}까지의 최소 오픈)에 맞서면 {{t:call|콜}}이 3벳보다 이미 약간 더 많습니다: 약 {{n:pf.call-freq.btn-vs-utg}} 대 {{n:pf.3bet-freq.btn-vs-utg}}입니다. {{t:utg|UTG}} {{t:range|레인지}}는 강하기 때문에, 3벳은 4벳을 더 자주 맞고 {{t:pot|팟}}을 바로 가져가는 경우는 더 드뭅니다.

```range
vs-open.btn-vs-co
```

그리드는 버튼이 어떤 핸드를 플레이하는지(3벳 또는 {{t:call|콜}}로), 어떤 핸드를 {{t:fold|폴드}}하는지만 보여 줍니다. 3벳과 {{t:call|콜}}의 비율은 위의 숫자로 익히세요: 앱의 솔버는 이 스팟에서 거의 {{t:call|콜}}하지 않으므로 이 비율을 재현하지 않습니다. A8s, 98s, 44 등 십여 개 핸드에서는 앱의 솔버가 공개된 솔루션과 다르게 플레이하므로, 드릴에서 이 핸드들은 채점하지 않습니다.

{{t:small-blind|스몰 블라인드}}에서는 거의 항상 {{t:raise|레이즈}}하거나 {{t:fold|폴드}}합니다. {{t:call|콜}}은 {{t:out-of-position}}에서 플레이한다는 뜻이고, 뒤에 있는 {{t:big-blind}}가 아직 {{t:raise|레이즈}}할 수 있습니다. {{t:out-of-position|아웃 오브 포지션}}에서는 핸드가 **{{t:equity-realization|에퀴티 실현}}** 측면에서 더 불리합니다: 쇼다운 전에 더 자주 {{t:fold|폴드}}하게 되고 {{t:bet|베팅}}으로 {{t:pot|팟}}을 가져가기도 더 어렵기 때문에, 핸드의 에퀴티가 나타내는 것보다 {{t:pot|팟}}에서 더 작은 몫을 가져갑니다.

```range
vs-open.sb-vs-btn
```

공개된 솔버 솔루션에 따르면 버튼에 맞선 {{t:small-blind}}는 거의 아무것도 {{t:call|콜}}하지 않습니다: 핸드의 약 {{n:pf.3bet-freq.sb-vs-btn}}, 즉 {{t:range|레인지}}의 상단(77+, AJo+, KQo, A5s, A4s, T9s 등)을 3벳하고 나머지는 {{t:fold|폴드}}합니다. 앱의 솔버는 여기서 핸드의 {{n:solver.3bet.sb-vs-btn}}를 3벳하며, 여기에는 공개된 솔루션도 자주 3벳하는 {{t:pair|페어}} 55와 66이 포함됩니다. 앱 솔버의 드문 {{t:call|콜}}은 그리드에서 {{t:fold}}로 계산됩니다. ATo, T9s, A4s 등 몇몇 핸드에서는 앱의 솔버가 공개된 솔루션과 다르게 플레이하므로, 드릴에서 이 핸드들은 채점하지 않습니다.

## {{t:linear}} 또는 {{t:polarized}} {{t:range|레인지}}

{{t:cutoff|CO}}의 {{t:open|오픈}}에 맞서 {{t:position|포지션}}이 있을 때는 주로 위에서부터 가장 좋은 핸드를 3벳하고, 수티드 에이스(A5s, A4s)로 몇 개의 {{t:bluff|블러프}}를 더합니다. 중간 핸드(예: 77–99, AJs, ATs, 수티드 {{t:connectors|커넥터}})는 섞어서 플레이합니다: 일부는 3벳하고 일부는 {{t:call|콜}}합니다. 상대가 자주 {{t:call|콜}}하므로, {{t:call|콜}}을 받은 뒤의 {{t:pot|팟}}에서 잘 플레이되는 핸드를 원합니다. 이런 {{t:range}}를 부르는 이름은 출처마다 다릅니다: 어떤 곳은 {{t:linear|리니어}}(가장 강한 핸드부터 아래로 구성), 다른 곳은 {{t:polarized|폴라라이즈드}}(주로 매우 강한 핸드와 {{t:bluff|블러프}}로 구성되고 중간 핸드는 거의 없음)라고 부릅니다. 더 중요한 것은 어떤 핸드를 3벳하고 어떤 핸드를 {{t:call|콜}}하는지입니다.

버튼에 맞서 {{t:big-blind|빅 블라인드}}에서는 가장 강한 핸드(TT+, AQ+, AJs+)와 함께 {{t:call|콜}} {{t:range|레인지}} 하단의 {{t:bluff|블러프}}를 3벳합니다: A5s, 때로는 A4s, 그리고 수티드 {{t:connectors|커넥터}}입니다. 수티드 에이스는 상대의 AA와 AK를 블록하고, {{t:call}}을 받아도 여전히 {{t:flush}}나 {{t:straight|스트레이트}}를 만들 수 있습니다. 중간 및 작은 {{t:pair|페어}}, KQo, 오프수트 에이스(AJo–A9o)는 보통 {{t:call|콜}}만 합니다: {{t:big-blind|빅 블라인드}}에서는 싸게 들어가고 액션을 닫으므로, 이 핸드들은 {{t:call|콜}}한 뒤에 더 많이 법니다. 구성은 {{t:rake|레이크}}와 3벳 사이즈에 따라 달라지므로, 99, KQo, AJo는 여러 방식으로 플레이되기도 합니다. {{t:small-blind|스몰 블라인드}}의 {{t:open|오픈}}에 맞서서는 주로 {{t:value|밸류}}를 위해 3벳하고(TT+, AJs+, 일부 AQo와 KQ), A5s와 수티드 {{t:connectors|커넥터}}는 보통 {{t:call|콜}}합니다.

{{t:small-blind|스몰 블라인드}}에서는 다르게 플레이합니다: 3벳 또는 {{t:fold}} 중 하나이며, 3벳에는 {{t:range|레인지}}의 상단을 넣습니다.

:::note 이 규칙의 출처
버튼과 {{t:small-blind|스몰 블라인드}}의 그리드는 앱의 솔버에서 나온 것이며 출처들과 대체로 일치합니다({{t:small-blind|스몰 블라인드}}에서는 드릴이 채점하지 않는 몇몇 핸드를 제외하고). {{t:big-blind|빅 블라인드}}에서 3벳하는 방법은 여러 독립적인 출처에서 공개한 다른 솔버들의 결과에 기반한 규칙으로 배웁니다: 앱 솔버의 {{t:big-blind|빅 블라인드}} 3벳 구성은 그것들과 다릅니다.
:::
