---
id: m3.l3
module: m3
order: 3
title: "오픈 레인지"
sub: "가장 먼저 참여할 때 어떤 핸드로 들어갈지, 포지션별로"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "앞의 모든 플레이어가 {{t:fold|폴드했고}}, 당신은 버튼에 있습니다. {{t:open|오픈하는}} 핸드를 칠하세요."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "당신이 가장 먼저 액션합니다({{t:utg|UTG}}). {{t:open|오픈하는}} 핸드를 칠하세요."
---
{{t:open|오픈}} {{t:range|레인지}}는 앞의 모든 플레이어가 {{t:fold|폴드했을}} 때 {{t:raise|레이즈하는}} 핸드의 목록입니다. 아래 그리드는 이 앱의 프리플롭 솔버가 6인 테이블 게임과 {{n:format.stack}} 스택을 기준으로 계산했습니다.

## 그리드 읽는 법

각 칸은 한 종류의 핸드입니다. 대각선보다 위쪽은 같은 무늬 핸드(예: AKs), 아래쪽은 다른 무늬 핸드(예: AKo)이고, 대각선 칸에는 {{t:pair|페어}}가 있습니다. 초록색 칸은 {{t:raise}}, 빈 칸은 {{t:fold}}입니다. 일부만 채워진 칸은 솔버가 그 핸드를 가끔만 플레이한다는 뜻입니다. 솔버가 그 핸드를 {{n:range.mixed.low}}에서 {{n:range.mixed.high}} 사이의 빈도로 {{t:open|오픈한다면}}(이 기준값은 앱 설정입니다) {{t:mixed-hand|혼합 핸드}}이며, 연습 문제에서는 이때 두 답을 모두 정답으로 인정합니다. 솔버가 {{n:range.mixed.low}}보다 드물게, 하지만 최소 {{n:range.mixed.min}}의 빈도로 플레이하는 액션은 연습 문제에서 허용 가능한 것으로 봅니다. 실수는 아니지만, 그 문제의 복습이 더 빨리 돌아옵니다. 솔버가 {{n:range.mixed.min}}보다 드물게 플레이하는 액션은 연습 문제에서 부정확한 플레이로 평가하고(솔버 사이트가 공개한 평가 척도가 이런 수를 그렇게 부릅니다), 솔버가 전혀 플레이하지 않는 액션은 실수로 평가합니다.

## 첫 {{t:position|포지션}}부터 버튼까지

```range
rfi.utg
```

{{t:utg|UTG}}에서 솔버는 {{n:solver.rfi.utg}}의 핸드를 {{t:open|오픈합니다}}. 전문 자료는 {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}를 제시합니다.

```range
rfi.hj
```

```range
rfi.co
```

버튼에 한 {{t:position|포지션}}씩 가까워질수록 {{t:range}}가 넓어집니다. {{t:hijack|HJ}}는 {{n:solver.rfi.hj}}, {{t:cutoff|CO}}는 벌써 {{n:solver.rfi.co}}의 핸드를 {{t:open|오픈합니다}}.

```range
rfi.btn
```

버튼에서 솔버는 무려 {{n:solver.rfi.btn}}의 핸드를 {{t:open|오픈합니다}}. 남은 것은 블라인드뿐이고, 플롭 이후에는 {{t:position|포지션}}을 갖기 때문입니다.

```range
rfi.sb
```

{{t:small-blind|스몰 블라인드}}는 이제 {{t:big-blind|빅 블라인드}}만 상대하므로, 플롭 이후 먼저 액션하는데도 버튼과 비슷하게 넓게 {{t:open|오픈합니다}}. 약 {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}}의 핸드입니다. {{t:stakes|마이크로 스테이크}}에서는 {{t:small-blind|스몰 블라인드}}에서 {{t:big-blind|빅 블라인드}}까지 금액을 맞춰 넣지 않고 {{t:raise|레이즈하거나}} {{t:fold|폴드합니다}}. {{t:pot|팟}}에서 떼는 {{t:rake}}가 금액을 맞춰 넣는 플레이의 수익을 줄이기 때문입니다. 이는 단순화입니다. 일부 솔버 해법은 {{t:small-blind|스몰 블라인드}}에서 일부 핸드로 금액을 맞춰 넣습니다. 이 앱의 솔버는 여기서 {{n:solver.rfi.sb}}의 핸드를 {{t:open|오픈하며}}, 이는 자료가 제시한 범위 안에 있습니다.

:::note 9인 테이블에서
9인 테이블에서는 {{t:hijack|HJ}} 앞에 {{t:position|포지션}}이 세 개 더 있습니다. {{t:utg|UTG}}, {{t:utg|UTG}}+1, {{t:utg|UTG}}+2이고, 그 뒤에 LJ가 있습니다. 이때 {{t:utg|UTG}} 뒤에는 여덟 명이 앉아 있으므로, {{t:utg|UTG}}, {{t:utg|UTG}}+1, {{t:utg|UTG}}+2에서는 6인 테이블의 {{t:utg|UTG}}보다 더 좁게 {{t:open|오픈합니다}}. 뒤에 앉은 플레이어가 더 많기 때문입니다. 이 세 플레이어가 {{t:fold|폴드하면}} LJ는 6인 테이블의 {{t:utg|UTG}}처럼 플레이하고, 그 이후 {{t:position|포지션}}은 위 그리드와 똑같이 플레이합니다. 9인 테이블의 얼리 {{t:position|포지션}}에 대해서는 방향만 제시합니다. 이 {{t:range|레인지}}의 수치와 구성은 아직 공개된 솔버 해법과 대조해 확인하지 않았습니다.
:::

:::note 기억하는 법
{{n:combos.kinds}}개 칸을 통째로 외우지 마세요. 경계를 기억하세요. 어떤 {{t:pair|페어}}, 어떤 같은 무늬 에이스, 그리고 다른 무늬 핸드가 어느 카드부터 시작하는지입니다. 아래 연습 문제는 바로 {{t:range|레인지}} 경계에 있는 핸드를 더 자주 냅니다.
:::

이 {{t:range|레인지}}는 플롭 이후 플레이를 단순화한 모델에서 나왔기 때문에, {{t:range|레인지}} 경계에 있는 십여 개 핸드에서 전문 차트와 다르며, 때로는 한쪽으로, 때로는 다른 쪽으로 차이가 납니다. 주로 간격이 있는 같은 무늬 핸드(예: 75s, 97s)와 약한 다른 무늬 핸드(예: A4o, K7o)입니다. 연습 문제는 이 핸드들을 채점하지 않습니다.
