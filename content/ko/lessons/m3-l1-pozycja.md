---
id: m3.l1
module: m3
order: 1
title: "테이블에서의 포지션"
sub: "자리가 중요한 이유"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "어떤 {{t:position}}이 가장 좋습니까?"
    options:
      - { text: "버튼 ({{t:button|BTN}})", correct: true, why: "플롭부터 버튼은 마지막에 행동하므로, 자신이 결정하기 전에 항상 상대의 결정을 알 수 있습니다." }
      - { text: "{{t:big-blind|빅 블라인드}}", why: "{{t:big-blind|BB}}는 이미 돈을 냈기 때문에 참여 비용이 적지만, 플롭부터는 가장 먼저 행동하는 쪽에 속합니다." }
      - { text: "{{t:utg}}", why: "{{t:utg}}는 프리플롭에서 가장 먼저 행동하며, 테이블의 모든 플레이어가 뒤에 있습니다. 오픈하기 가장 어려운 자리입니다." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "앞의 모든 플레이어가 {{t:fold|폴드}}했습니다. 어떻게 하시겠습니까?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "오프수트 K9은 {{t:utg}} {{t:open|오픈}} {{t:range|레인지}}, 즉 이 {{t:position|포지션}}에서 {{t:open|오픈}}하는 핸드 목록에 들어가지 않습니다. 뒤에 다섯 명의 플레이어가 있고, 누군가 더 좋은 키커의 킹을 가진 경우가 많습니다." }
      - { text: "{{t:raise|레이즈}}합니다", why: "{{t:utg}}에서는 핸드의 약 {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}만 {{t:open|오픈}}합니다. K9o는 킹을 맞추기 쉽지만 KQ나 AK에 집니다." }
      - { text: "{{t:big-blind|빅 블라인드}} 금액만 맞춥니다", why: "{{t:utg}}에서 금액만 맞추는 것(림프)은 나쁜 습관입니다. 핸드가 {{t:raise|레이즈}}할 가치가 있거나, 아니면 {{t:fold|폴드}}합니다." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "같은 핸드지만 버튼에 있고, 앞의 모든 플레이어가 {{t:fold|폴드}}했습니다."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|레이즈}}합니다", correct: true, why: "블라인드만 남았고, 플롭 이후에는 {{t:position|포지션}}을 가집니다. 버튼에서는 핸드의 약 {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}}를 {{t:open|오픈}}하며, K9o는 여기에 포함됩니다." }
      - { text: "{{t:fold|폴드}}합니다", why: "너무 신중합니다. 블라인드만 상대한다면 이 핸드는 충분히 좋고, {{t:position}}이 가치를 더해 줍니다." }
      - { text: "{{t:big-blind|빅 블라인드}} 금액만 맞춥니다", why: "림프는 {{t:initiative|주도권}}을 내줍니다. {{t:raise|레이즈}}는 블라인드를 바로 가져오는 경우가 많습니다." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "마지막에 행동하는 것이 왜 도움이 됩니까?"
    options:
      - { text: "결정하기 전에 상대가 무엇을 했는지 압니다", correct: true, why: "상대의 모든 액션은 정보입니다. 마지막 플레이어가 가장 많은 정보를 가지며, 싸게 {{t:check|체크}}하거나 다른 플레이어가 약함을 보이면 {{t:pot|팟}}을 가져올 수 있습니다." }
      - { text: "더 좋은 카드를 받습니다", why: "카드는 {{t:position|포지션}}과 관계없이 무작위입니다." }
      - { text: "블라인드를 더 적게 냅니다", why: "버튼에서는 블라인드를 내지 않지만, 그것이 주된 장점은 아닙니다. 가장 중요한 것은 정보입니다." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
딜러 버튼(**{{t:button|BTN}}**, Button)은 핸드마다 이동합니다. 버튼에 따라 행동 순서가 정해집니다. 플롭부터 버튼은 **마지막**에 행동하며, 이는 큰 이점입니다. 직접 결정하기 전에 다른 모든 플레이어가 무엇을 했는지 볼 수 있습니다. 플롭 이후 상대보다 먼저 행동하는 플레이어는 {{t:out-of-position}}으로 플레이합니다. 즉, 상대의 플레이를 모른 채 결정합니다.

## 6인 테이블의 {{t:position|포지션}}

| {{t:position|포지션}} | 행동 시점 | {{t:open|오픈}} 범위 |
|---|---|---|
| {{t:utg}} | 프리플롭에서 첫 번째 | 핸드의 약 {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | {{t:utg}} 다음; {{t:cutoff|CO}}는 버튼 바로 앞 | 점점 넓게 |
| {{t:button|BTN}} | 플롭부터 마지막 | 핸드의 약 {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | 프리플롭에서 마지막, 플롭부터 첫 번째 | 모두 {{t:fold|폴드}}하면 {{t:small-blind|SB}}가 {{t:open|오픈}}합니다({{t:range|레인지}} 레슨); 블라인드 방어는 M4 모듈에서 다룹니다 |

**{{t:hijack|HJ}}**(Hijack)는 {{t:utg}} 다음, 버튼보다 두 자리 앞에 앉고, **{{t:cutoff|CO}}**(Cutoff)는 버튼 바로 앞에 앉습니다. 이들은 중간 {{t:position|포지션}}입니다. 뒤에 있는 플레이어가 {{t:utg}}보다 적으므로 이 자리에서는 더 넓게 {{t:open|오픈}}하지만, 버튼보다는 여전히 좁게 오픈합니다.

:::note {{t:open|오픈}} 사이즈
모든 {{t:position|포지션}}에서 {{n:pf.open-size}}로 {{t:raise|레이즈}}해 {{t:open|오픈}}하고, {{t:small-blind|스몰 블라인드}}에서는 {{n:pf.open-size-sb}}로 오픈합니다. 이는 단순화한 것입니다. 솔버 솔루션에서는 {{t:early-position|얼리 포지션}}의 {{t:open|오픈}}이 조금 더 작지만(예: {{t:utg}}에서 {{n:pf.open-size.solver-utg}}, {{t:cutoff|CO}}에서 {{n:pf.open-size.solver-co}}), 한 가지 사이즈가 배우기 더 쉽습니다. 처음으로 참여할 때는 블라인드 금액만 내지 않습니다(이것이 {{t:limp}}, 즉 {{t:big-blind|빅 블라인드}}에 단순히 {{t:call|콜}}해서 참여하는 것입니다). {{t:raise}}는 {{t:pot|팟}}을 바로 가져올 수 있고 {{t:initiative|주도권}}을 줍니다. 마지막으로 {{t:raise|레이즈}}한 플레이어가 보통 다음 {{t:bet|베팅}}을 하기 때문입니다.
:::
