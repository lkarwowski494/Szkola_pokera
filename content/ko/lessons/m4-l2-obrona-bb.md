---
id: m4.l2
module: m4
order: 2
title: "빅 블라인드 방어"
sub: "콜 가격과 넓은 방어"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "버튼이 {{n:pf.open-size}}로 {{t:open|오픈}}했고, {{t:small-blind}}는 {{t:fold|폴드}}했습니다. {{t:big-blind|빅 블라인드}}에서 {{t:call}}이 이득이 되려면 에퀴티가 몇 퍼센트 필요합니까(플롭 이후 플레이는 고려하지 않음)? 숫자를 입력하세요."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "추가로 내는 금액은 {{n:bb.call.vs-btn}}이고, {{t:call|콜}}한 뒤 {{t:pot|팟}}은 {{n:bb.pot-after.vs-btn}}입니다. {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}}는 약 {{n:eq.bb-vs-btn-open}}입니다. {{t:pot|팟}}에 상대의 {{t:bet}}만 있을 때에만 절반이 필요합니다. {{t:pot|팟}}에 있는 블라인드가 가격을 좋게 만듭니다."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "{{t:small-blind|스몰 블라인드}}가 {{n:pf.open-size-sb}}로 {{t:open|오픈}}했습니다. {{t:big-blind|빅 블라인드}}에서 {{t:call|콜}}하려면 에퀴티가 얼마나 필요합니까?"
    table: { position: BB }
    options:
      - { text: "약 {{n:eq.bb-vs-sb-open}}", correct: true, why: "추가로 내는 금액은 {{n:bb.call.vs-sb}}이고, {{t:call|콜}}한 뒤 {{t:pot|팟}}은 {{n:bb.pot-after.vs-sb}}입니다. 약 {{n:eq.bb-vs-sb-open}}입니다. 버튼을 상대할 때보다 가격은 나쁘지만, 그 대신 플롭 이후 {{t:position|포지션}}을 가집니다." }
      - { text: "약 {{n:eq.bb-vs-btn-open}}", why: "이것은 버튼의 {{n:pf.open-size}} {{t:open|오픈}}에 대한 가격입니다. {{t:small-blind|스몰 블라인드}}는 더 큰 사이즈로 {{t:open|오픈}}하므로 더 많이 내야 합니다." }
      - { text: "약 절반", why: "{{t:pot|팟}}에 상대의 {{t:bet}}만 있다면 에퀴티가 절반 필요합니다. 여기서는 블라인드도 들어 있으므로 가격이 더 좋습니다." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "{{t:big-blind|빅 블라인드}}에서 버튼의 {{t:range|레인지}}를 상대로 에퀴티가 약 {{n:eq.bb-vs-btn-open}}인 핸드를 모두 {{t:call|콜}}하지 않는 이유는 무엇입니까?"
    table: { position: BB }
    options:
      - { text: "{{t:out-of-position}}에서는 에퀴티를 전부 실현하지 못하기 때문에", correct: true, why: "에퀴티는 {{t:bet|베팅}} 없이 끝까지 플레이했을 때의 승률입니다. {{t:out-of-position|아웃 오브 포지션}}에서는 쇼다운 전에 핸드를 {{t:fold|폴드}}하는 경우가 많아서, 약한 오프수트 핸드는 에퀴티가 보여 주는 것보다 적게 실현합니다." }
      - { text: "버튼은 항상 강한 핸드를 가지고 있기 때문에", why: "버튼은 매우 넓게 {{t:open|오픈}}합니다. 그래서 {{t:big-blind|BB}}의 방어가 넓습니다." }
      - { text: "{{t:chips}}을 아껴야 하기 때문에", why: "중요한 것은 {{t:chips|칩}}을 아끼는 것이 아니라 {{t:expected-value}}입니다." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "버튼이 {{n:pf.open-size}}로 {{t:open|오픈}}했고, {{t:small-blind}}는 {{t:fold|폴드}}했습니다. {{t:big-blind|빅 블라인드}}에서 QQ를 가지고 있습니다. 어떻게 하시겠습니까?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "{{n:pf.3bet.oop-total}}까지 3벳", correct: true, why: "QQ는 {{t:value|밸류}} 핸드입니다. {{t:out-of-position|아웃 오브 포지션}}에서는 {{t:open|오픈}}의 약 {{n:pf.3bet.size-oop}}로 {{t:raise|레이즈}}해서, 버튼이 {{t:in-position}}에서 싸게 {{t:call|콜}}하지 못하게 합니다." }
      - { text: "{{n:pf.3bet.ip-total}}까지 3벳", sizeError: true, why: "액션은 맞지만, 이것은 {{t:in-position}} 플레이어의 사이즈입니다({{t:open|오픈}}의 {{n:pf.3bet.size-ip}}). {{t:out-of-position|아웃 오브 포지션}}에서는 더 크게, {{n:pf.3bet.oop-total}}까지 {{t:raise|레이즈}}합니다." }
      - { text: "{{t:call|콜}}", why: "밸류를 잃습니다. QQ로는 플롭 전에 {{t:pot|팟}}을 키워야 하며, {{t:out-of-position}}에서 작은 {{t:pot|팟}}을 플레이하면 안 됩니다." }
      - { text: "{{t:fold|폴드}}", why: "QQ는 프리플롭에서 가장 좋은 핸드 중 하나입니다. {{t:fold|폴드}}는 큰 실수입니다." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "버튼이 {{n:pf.open-size}}로 {{t:open|오픈}}했고, {{t:small-blind}}는 {{t:fold|폴드}}했습니다. {{t:big-blind}}를 방어하는 핸드({{t:call|콜}} 또는 3벳)를 칠하세요."
---
{{t:big-blind|빅 블라인드}}는 이미 {{t:pot|팟}}에 블라인드 전체를 넣어 두었으므로, {{t:open|오픈}}에 맞서 조금만 더 내면 됩니다. 버튼이 {{n:pf.open-size}}로 {{t:open|오픈}}하고 {{t:small-blind}}가 {{t:fold|폴드}}하면, {{t:call|콜}}하는 데 에퀴티가 약 {{n:eq.bb-vs-btn-open}}만 있으면 됩니다. 그래서 {{t:big-blind}}는 모든 {{t:position|포지션}} 중에서 가장 넓게 방어합니다.

## 가격이 전부는 아닙니다

에퀴티는 두 사람 모두 추가 {{t:bet|베팅}} 없이 쇼다운까지 갔을 때 얼마나 자주 이기는지를 알려 줍니다. {{t:out-of-position|아웃 오브 포지션}}에서는 플롭 이후 {{t:fold|폴드}}하는 경우가 많아서, 약한 오프수트 핸드는 에퀴티보다 적게 실현합니다. 수티드 핸드, {{t:connectors|커넥터}}, 중간 {{t:pair|페어}}는 더 많이 실현하므로, 그리드에서는 이런 핸드로 더 적극적으로 방어합니다.

```range
vs-open.bb-vs-btn
```

공개된 솔버 솔루션은 여기서 핸드의 약 {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}}를 방어합니다({{t:call|콜}}과 3벳 합계). 이 그리드의 출처인 앱의 솔버는 여기서 공개된 솔루션보다 넓게 방어합니다.

## {{t:small-blind|스몰 블라인드}}를 상대할 때

{{t:small-blind|스몰 블라인드}}는 더 큰 사이즈인 {{n:pf.open-size-sb}}로 {{t:open|오픈}}하므로, {{t:call|콜}}하는 데 에퀴티가 약 {{n:eq.bb-vs-sb-open}} 필요합니다. 가격은 더 나쁘지만 플롭 이후 {{t:position|포지션}}을 가지므로, 여전히 넓게 방어합니다. 핸드의 절반이 넘습니다.

```range
vs-open.bb-vs-sb
```

공개된 솔버 솔루션은 여기서 핸드의 약 {{n:pf.bb-def.vs-sb.pub}}를 방어합니다. 이 그리드의 출처인 앱의 솔버는 여기서 공개된 솔루션보다 좁게 방어합니다.

:::note {{t:big-blind|빅 블라인드}}에서 {{t:raise|레이즈}}하는 법
그리드는 어떤 핸드로 방어할지를 보여 줄 뿐, 어떻게 방어할지는 보여 주지 않습니다. 3벳과 {{t:call|콜}}이 합쳐져 있는데, 앱의 솔버에서 {{t:big-blind|빅 블라인드}}의 3벳 구성이 다른 솔버의 공개된 결과와 다르기 때문입니다. 버튼을 상대로 {{t:big-blind|빅 블라인드}}에서 하는 3벳은 {{t:open|오픈}}의 약 {{n:pf.3bet.size-oop}}입니다. 가장 강한 핸드(TT+, AQ+, AJs+)에 더해 {{t:call|콜}} {{t:range|레인지}} 하단의 {{t:bluff|블러프}}로 3벳합니다. A5s, 때로는 A4s, 그리고 수티드 {{t:connectors|커넥터}}입니다. 중간 및 작은 {{t:pair|페어}}, KQo, 오프수트 에이스는 보통 {{t:call|콜}}합니다. {{t:small-blind|스몰 블라인드}}를 상대할 때는 {{t:position|포지션}}을 가지므로 더 작게, {{t:open|오픈}}의 약 {{n:pf.3bet.size-ip}}로 {{t:raise|레이즈}}합니다. 이때는 주로 {{t:value|밸류}}로 3벳하고(TT+, AJs+, AQo와 KQ의 일부), A5s와 수티드 {{t:connectors|커넥터}}는 보통 {{t:call|콜}}합니다.
:::
