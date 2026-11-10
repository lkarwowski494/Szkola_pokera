---
id: m10.l2
module: m10
order: 2
title: "플레이어 유형"
sub: "니트, 레귤러, 패시브 플레이어, 매니악"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "{{n:hud.ex.reg.hands}}핸드 후 상대의 {{t:vpip}}는 {{n:hud.ex.passive.vpip}}, {{t:pfr}}은 {{n:hud.ex.passive.pfr}}입니다. 이것은 상대의 프리플롭 플레이에 대해 무엇을 말해 줍니까?"
    options:
      - { text: "패시브합니다: 대부분의 핸드에서 {{t:call|콜}}이나 림프만 합니다", correct: true, why: "{{t:vpip}} − {{t:pfr}} 차이는 {{n:hud.ex.passive.gap}}포인트로, 기준인 {{n:hud.gap.passive}}를 넘습니다. 꽤 많은 핸드를 플레이하지만, 대부분은 {{t:raise|레이즈}} 없이 {{t:pot|팟}}에 넣습니다." }
      - { text: "많은 핸드를 플레이하므로 어그레시브합니다", why: "핸드 수({{t:vpip}})는 얼마나 루즈하게 플레이하는지를 말해 줄 뿐, 얼마나 어그레시브한지는 말해 주지 않습니다. 공격성은 {{t:pfr}}과 두 수치의 차이로 알 수 있습니다." }
      - { text: "{{t:nit|니트}}입니다", why: "{{t:nit}}는 약 {{n:hud.vpip.nit-max}}까지의 핸드만 플레이합니다. 이 플레이어는 그보다 분명히 많이 플레이합니다." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "온라인 마이크로 스테이크(NL25) 모집단 데이터에 따르면 {{t:recreational|레크리에이션 플레이어}}는 {{n:mda.rec.wtsd}}의 경우에 쇼다운까지 가고 쇼다운의 {{n:mda.rec.wsd}}를 이깁니다. {{t:regular|레귤러}}는 각각 {{n:mda.reg.wtsd}}와 {{n:mda.reg.wsd}}입니다. 여기서 무엇을 알 수 있습니까?"
    options:
      - { text: "{{t:recreational|레크리에이션 플레이어}}는 끝까지 더 자주 돈을 내고 더 자주 집니다: 더 약한 핸드로 {{t:call|콜}}합니다", correct: true, why: "쇼다운까지 더 자주 가지만 이기는 경우는 더 드물기 때문에, 더 약한 핸드로 그곳까지 갑니다. 이런 상대에게는 더 많은 핸드로 {{t:value|밸류}} 베팅을 하고, {{t:bluff|블러프}}는 줄입니다." }
      - { text: "{{t:recreational|레크리에이션 플레이어}}는 더 자주 {{t:bluff|블러프}}합니다", why: "이 수치는 얼마나 자주, 어떤 핸드로 쇼다운까지 가는지를 말해 줄 뿐, {{t:bluff|블러프}}에 대해서는 말해 주지 않습니다. 더 약한 핸드로 {{t:call|콜}}하기 때문에 쇼다운을 덜 이깁니다." }
      - { text: "아무것도 없습니다: 몇 포인트 차이는 노이즈입니다", why: "이것은 한 플레이어의 수십 핸드가 아니라 {{n:mda.period.months}}개월 동안 해당 {{t:stakes|스테이크}} 전체 모집단의 데이터입니다. 이 차이는 NL25, NL50, NL100에서 일관됩니다." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "리버입니다. 플롭과 턴에서 베팅했고 상대는 {{t:call|콜}}했습니다. 상대는 패시브한 {{t:recreational|레크리에이션 플레이어}}입니다({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}}핸드). 상대가 {{t:check|체크}}합니다. {{t:top-pair|탑 페어}}와 두 번째로 좋은 키커로 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:value|밸류}}로 베팅합니다", correct: true, why: "이런 플레이어는 더 약한 킹, 8, 포켓 {{t:pair|페어}}로 끝까지 {{t:call|콜}}합니다. 상대가 {{t:call|콜}}하는 핸드의 절반 이상이 내 핸드보다 약하므로 베팅이 이익입니다(모듈 8의 기준)." }
      - { text: "더 좋은 핸드에 걸리지 않도록 {{t:check|체크}}합니다", why: "더 약한 핸드로 {{t:call|콜}}하는 플레이어를 상대로 {{t:check}}는 밸류를 포기하는 것입니다. 더 좋은 핸드가 가끔 돈을 내겠지만, 더 약한 핸드의 {{t:call|콜}}이 더 많습니다." }
      - { text: "{{t:bluff|블러프}}로 {{t:pot|팟}} 전체를 베팅합니다", why: "{{t:top-pair|탑 페어}}라면 이것은 {{t:bluff}}가 아닙니다: {{t:call|콜}}할 많은 핸드를 이깁니다. 이 베팅은 {{t:value|밸류}} 베팅입니다." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "리버, {{t:straight-draw}}가 맞지 않았습니다. 상대는 패시브한 {{t:recreational|레크리에이션 플레이어}}({{t:wtsd}} {{n:mda.rec.wtsd}})이고 플롭과 턴에서 {{t:call|콜}}했습니다. 상대가 {{t:check|체크}}합니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:check|체크}}하고 {{t:pot|팟}}을 포기합니다", correct: true, why: "{{t:bluff}}는 상대가 베팅의 {{t:alpha}}보다 더 자주 {{t:fold|폴드}}할 때만 이익입니다. 두 {{t:street|스트리트}}에서 {{t:call|콜}}했고 쇼다운까지 자주 가는 플레이어는 리버에서 {{t:fold|폴드}}하는 일이 드뭅니다." }
      - { text: "쇼다운 밸류가 없으므로 크게 베팅합니다", why: "기본 전략(모듈 8)에서는 이런 {{t:bluff}}가 좋을 때도 있지만, 이 플레이어를 상대로는 {{t:fold|폴드}}가 부족합니다: {{t:bluff|블러프}}는 손해입니다." }
      - { text: "{{t:bluff}}를 더 싸게 하려고 작게 베팅합니다", why: "작은 베팅은 필요한 {{t:fold|폴드}}가 더 적지만, 두 {{t:street|스트리트}}에서 {{t:call|콜}}한 핸드는 보통 작은 베팅에도 {{t:call|콜}}합니다. {{t:pot|팟}}을 포기하는 편이 낫습니다." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "{{t:cutoff|CO}}에서 {{t:open|오픈}}합니다. 버튼에는 {{t:nit}}가 앉아 있습니다: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}}핸드. 그가 3벳합니다. AJo로 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "이렇게 적은 핸드를 플레이하는 사람은 주로 가장 강한 핸드로 3벳합니다: AJ를 도미네이트하는 AQ, AK, 높은 {{t:pair|페어}}입니다. 이런 상대에게는 모듈 4의 기본 전략보다 더 자주 {{t:fold|폴드}}합니다." }
      - { text: "AJ는 강한 핸드이므로 {{t:call|콜}}합니다", why: "AJ는 넓은 {{t:range|레인지}}를 상대로는 강합니다. {{t:vpip}} {{n:hud.ex.nit.vpip}}인 플레이어의 3벳을 상대로는 자주 도미네이트당하고 {{t:position|포지션}}도 없습니다." }
      - { text: "4벳합니다", why: "{{t:nit|니트}}를 상대로 AJ로 4벳하면 AJ를 도미네이트하고 {{t:fold|폴드}}도 드문 {{t:range|레인지}}와 맞서게 됩니다. {{t:value}}도 아니고 좋은 {{t:bluff}}도 아닙니다." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "버튼에 있고 모두 {{t:fold|폴드}}했습니다. {{t:big-blind|빅 블라인드}}에는 {{t:nit}}가 앉아 있습니다({{n:hud.ex.reg.hands}}핸드 후 {{t:vpip}} {{n:hud.ex.nit.vpip}}). {{t:open|오픈}}을 어떻게 조정하시겠습니까?"
    options:
      - { text: "기본 전략보다 넓게 {{t:open|오픈}}합니다", correct: true, why: "{{t:nit}}는 블라인드를 좁게 방어하므로, 약한 핸드로도 {{t:open}}이 바로 이기는 경우가 더 많습니다." }
      - { text: "{{t:nit}}는 강한 핸드를 가지고 있으므로 더 좁게 {{t:open|오픈}}합니다", why: "{{t:nit}}가 강한 핸드를 가진 것은 플레이할 때입니다. {{t:big-blind|빅 블라인드}}에서는 대부분 {{t:fold|폴드}}하며, 그것이 바로 이익입니다." }
      - { text: "변화 없습니다: 플레이어 유형은 블라인드 스틸에 영향을 주지 않습니다", why: "영향을 줍니다. 스틸의 이익은 블라인드가 얼마나 자주 {{t:fold|폴드}}하는지에 달려 있고, {{t:nit}}는 자주 {{t:fold|폴드}}합니다." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "상대는 {{t:maniac|매니악}}입니다: {{n:hud.ex.reg.hands}}핸드 후 {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}}. 모든 {{t:street|스트리트}}에서 베팅했고, 리버에서 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다. {{t:top-pair|탑 페어}}와 약한 키커로 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:call|콜}}합니다", correct: true, why: "기본 전략보다 더 많이 {{t:bluff|블러프}}하는 플레이어를 상대로는 {{t:call|콜}} 경계에 있는 핸드가 이익을 냅니다. 탑 {{t:pair}}는 그의 {{t:bluff|블러프}}와 밸류 핸드 일부를 이깁니다." }
      - { text: "{{t:pot|팟}} 전체 베팅은 강한 핸드를 뜻하므로 {{t:fold|폴드}}합니다", why: "거의 모든 핸드를 {{t:raise|레이즈}}로 플레이하고 모든 {{t:street|스트리트}}에서 베팅하는 플레이어의 큰 베팅에는 {{t:bluff|블러프}}가 많이 들어 있습니다. {{t:fold|폴드}}하면 그가 어그레시브하다는 이유로 그에게 돈을 내주는 셈입니다." }
      - { text: "올인으로 {{t:raise|레이즈}}합니다", why: "{{t:raise|레이즈}}하면 {{t:bluff|블러프}}는 {{t:fold|폴드}}하고 더 좋은 핸드는 {{t:call|콜}}합니다. {{t:bluff|블러프}}를 잡는 핸드라면 {{t:call}}로 충분합니다." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "{{t:maniac|매니악}}과 플레이하고 있습니다. 턴에서 개선될 가능성이 없는 약한 핸드를 가지고 있고, 상대는 {{t:check|체크}}합니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:check|체크}}합니다: {{t:maniac|매니악}}을 상대로 한 {{t:bluff|블러프}}는 거의 통하지 않습니다", correct: true, why: "{{t:maniac|매니악}}은 {{t:fold|폴드}}하는 일이 드물고 자주 {{t:raise|레이즈}}합니다. 그를 상대로는 {{t:bluff|블러프}}가 아니라 더 강한 핸드로 {{t:call|콜}}해서 돈을 법니다." }
      - { text: "{{t:maniac|매니악}}의 {{t:check}}는 약함을 뜻하므로 베팅합니다", why: "그럴 수도 있지만, {{t:maniac|매니악}}은 어떤 핸드로든 자주 {{t:raise|레이즈}}합니다. {{t:bluff|블러프}}에는 {{t:fold|폴드}}가 필요한데, 그에게는 그런 {{t:fold|폴드}}가 적습니다." }
      - { text: "그가 {{t:raise|레이즈}}하지 못하도록 올인 베팅합니다", why: "{{t:fold|폴드}}가 드문 플레이어를 상대로 작은 {{t:pot|팟}}을 이기려고 스택 전체를 겁니다. 가장 비싼 {{t:bluff|블러프}} 방법입니다." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
이전 레슨의 통계는 몇 가지 전형적인 모습으로 정리됩니다. 플레이어 유형은 그 플레이어가 기본 전략에서 어느 방향으로 벗어나는지 알려 줍니다: 너무 적은 핸드를 플레이하는지, 너무 많은 핸드를 플레이하는지, 너무 자주 {{t:call|콜}}하는지, 너무 자주 {{t:raise|레이즈}}하는지입니다.

## 두 수치, 네 가지 유형

유형은 {{t:vpip}}와 {{t:vpip}} − {{t:pfr}} 차이로 판단합니다(6-max, 최소 약 {{n:hud.hands.vpip.low}}핸드):

| 유형 | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | 기본 전략 대비 실수 |
|---|---|---|---|
| {{t:nit|니트}} | 약 {{n:hud.vpip.nit-max}}까지 | 작음 | 너무 적은 핸드를 플레이 |
| {{t:regular|레귤러}} ({{t:tag}}, {{t:lag}}) | 약 {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | 작음 | 기본 전략에 가까움 |
| 패시브 {{t:recreational|레크리에이션 플레이어}} | 약 {{n:hud.vpip.loose}}부터 | {{n:hud.gap.passive}}포인트 초과 | 너무 많은 핸드, 너무 잦은 {{t:call|콜}} |
| {{t:maniac|매니악}} | 약 {{n:hud.vpip.loose}}부터 | 약 {{n:hud.gap.aggressive}}포인트까지 | 너무 많은 핸드, 너무 잦은 {{t:raise|레이즈}} |

차이가 큰 패시브 플레이어는 {{t:calling-station}}이라고도 합니다. 유형 사이에는 전이 구간이 있습니다(예: {{t:vpip}}가 10%대이거나, 차이가 몇 포인트인 루즈한 플레이어). 이런 경우에는 유형을 정하지 않고 다른 통계를 더 살펴봅니다.

## 모집단 데이터가 말해 주는 것

공개 통계 데이터베이스는 대형 온라인 사이트 한 곳의 NL25 6-max 플레이어 평균 통계를 최근 {{n:mda.period.months}}개월 동안의 모든 핸드를 기준으로 제공합니다. 여기서 {{t:regular|레귤러}}는 {{t:vpip}}가 {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}}이고 윈레이트가 {{n:mda.reg.def.wr}}을 넘는 플레이어이고, {{t:recreational|레크리에이션 플레이어}}는 {{t:vpip}}가 {{n:mda.rec.def}}를 넘고 윈레이트가 {{n:mda.rec.def.wr}} 미만인 플레이어입니다:

| 통계 | {{t:regular|레귤러}} | {{t:recreational|레크리에이션 플레이어}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| 폴드 투 3벳 | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| 쇼다운 승리 | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| 윈레이트 | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

{{t:recreational|레크리에이션 플레이어}}의 {{t:vpip}} − {{t:pfr}} 차이는 {{n:mda.rec.gap.pp}}포인트이므로 패시브합니다. 쇼다운까지 더 자주 가고 이기는 경우는 더 드뭅니다: 더 약한 핸드로 {{t:call|콜}}합니다. 3벳에 {{t:fold|폴드}}하는 일도 드뭅니다. NL50과 NL100에서도 수치는 거의 같습니다.

## 패시브 {{t:recreational|레크리에이션 플레이어}}

모듈 8의 기본 전략은 바뀌지 않습니다: {{t:call|콜}}할 핸드의 절반 이상이 더 약한 핸드일 때 {{t:value|밸류}} 베팅을 하고, {{t:bluff}}는 상대가 {{t:alpha}}보다 더 자주 {{t:fold|폴드}}할 때 이익입니다. 바뀌는 것은 상대입니다: 더 많은 약한 핸드로 {{t:call|콜}}합니다. 따라서:

- 더 많은 핸드로, 더 얇은 핸드까지 {{t:value|밸류}} 베팅을 합니다. 예: 약한 키커의 {{t:top-pair|탑 페어}}로 세 {{t:street|스트리트}} 베팅;
- {{t:bluff|블러프}}는 덜 자주 합니다. 특히 리버에서 그렇습니다: {{t:bluff}}로 이익을 내는 데 필요한 {{t:fold|폴드}}가 부족합니다.

## {{t:nit|니트}}와 {{t:maniac|매니악}}

**{{t:nit|니트}}**는 강한 핸드만 플레이합니다. 그가 {{t:raise|레이즈}}하거나 3벳하면 {{t:call|콜}} {{t:range|레인지}} 아래쪽 핸드가 더 자주 도미네이트당하므로, 모듈 4의 기본 전략보다 그 핸드들로 더 자주 {{t:fold|폴드}}합니다. 그가 블라인드에 있으면 방어가 드물기 때문에 더 자주 스틸합니다.

**{{t:maniac|매니악}}**은 많은 핸드를 플레이하고 거의 모든 핸드를 {{t:raise|레이즈}}합니다. 그의 베팅에는 기본 전략보다 더 많은 {{t:bluff|블러프}}가 들어 있으므로, {{t:call|콜}} 경계에 있는 핸드로는 {{t:call|콜}}하고, 아주 강한 핸드로는 그가 베팅하게 두며, 직접 {{t:bluff|블러프}}하지 않습니다: 그는 {{t:fold|폴드}}하는 일이 드뭅니다.

:::note 이 기준은 어디서 왔나
유형 기준은 코치들의 관례입니다(교육 자료 두 가지, 6-max 온라인 캐시): 두 자료의 공통 부분이나 두 자료를 모두 포함하는 범위를 택합니다. 모집단 데이터는 공개 통계 데이터베이스에서 가져왔습니다(대형 온라인 사이트 한 곳, NL25–NL100, 2026년 10월 이전 {{n:mda.period.months}}개월 동안의 모든 핸드. 핸드 수는 사이트에서 제공하지 않습니다). {{t:nit|니트}}와 {{t:maniac|매니악}}의 유형 판단은 모집단 전체 데이터가 아니라 특정 상대의 통계에 근거하므로 표본이 필요합니다.
:::
