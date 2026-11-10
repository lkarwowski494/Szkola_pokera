---
id: m5.l1
module: m5
order: 1
title: "플롭 텍스처"
sub: "높이, 무늬, 연결성"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "다음 중 {{t:connected|커넥티드}} 플롭, 즉 지금 바로 {{t:straight|스트레이트}}가 가능한 플롭은 무엇입니까?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "맞습니다. 9, 7, 6은 연속된 다섯 랭크 안에 들어갑니다. 예를 들어 85나 T8이 {{t:straight|스트레이트}}를 만듭니다." }
      - { text: "[[Ks 8d 3c]]", why: "아닙니다. 3에서 K까지는 너무 멉니다. 여기서는 어떤 두 장으로도 {{t:straight|스트레이트}}가 되지 않습니다." }
      - { text: "[[Qd Qs 9h]]", why: "아닙니다. {{t:paired|페어드}} 플롭입니다. 손에 든 두 장과 {{t:board|보드}}의 {{t:pair|페어}}로는 {{t:straight|스트레이트}}가 불가능합니다. {{t:straight|스트레이트}}에는 서로 다른 다섯 랭크가 필요하기 때문입니다." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "플롭이 {{t:monotone|모노톤}}입니다. 세 장 모두 같은 무늬입니다. 이것은 무엇을 뜻합니까?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "그 무늬 카드 두 장을 가진 플레이어는 이미 {{t:flush|플러시}}를 가지고 있습니다", correct: true, why: "맞습니다. {{t:board|보드}}의 하트 세 장과 손의 두 장을 합치면 같은 무늬 다섯 장입니다. 하트 한 장을 가진 플레이어는 {{t:flush-draw|플러시 드로우}}를 가지고 있습니다." }
      - { text: "아직 아무도 {{t:flush|플러시}}를 가질 수 없습니다", why: "아닙니다. {{t:flush|플러시}}에는 다섯 장이 필요한데, 세 장은 이미 {{t:board|보드}}에 깔려 있습니다. 손에 두 장만 있으면 됩니다." }
      - { text: "{{t:flush|플러시}}는 턴부터 가능합니다", why: "아닙니다. 그것은 {{t:two-tone|투톤}} 플롭의 경우입니다. {{t:monotone|모노톤}} 플롭에서는 {{t:flush|플러시}}가 지금 이미 완성되어 있을 수 있습니다." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "[[Ac Kd]]를 들고 있고 플롭은 [[Ks 7d 2c]]입니다. 이런 플롭에서 좋은 키커를 가진 {{t:pair|페어}}가 {{t:wet|웻}} 플롭에서보다 더 안전한 이유는 무엇입니까?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "상대에게 {{t:draw|드로우}}가 전혀 없어서, 이후 카드가 앞선 사람을 바꾸는 일이 드물기 때문입니다", correct: true, why: "맞습니다. 플롭은 {{t:rainbow|레인보우}}이고 {{t:straight|스트레이트}}는 불가능합니다. 지금 지고 있는 상대는 보통 아웃이 적습니다. {{t:three-of-a-kind|트리플}}이나 {{t:two-pair|투 페어}}가 되는 카드 몇 장뿐이고, {{t:pair|페어}}가 없으면 좋은 카드 두 장이 연달아 나와야 합니다." }
      - { text: "{{t:dry|드라이}} 플롭에서는 상대가 항상 {{t:fold|폴드}}하기 때문입니다", why: "아닙니다. 7이나 2, 또는 더 약한 K를 가진 상대는 {{t:call|콜}}할 수 있습니다. {{t:dry|드라이}} 플롭은 {{t:draw|드로우}}에 관해 알려 줄 뿐, 상대가 {{t:fold|폴드}}할지는 알려 주지 않습니다." }
      - { text: "K {{t:pair|페어}}는 항상 리버까지 이기기 때문입니다", why: "아닙니다. 상대가 이미 셋이나 {{t:two-pair|투 페어}}를 가지고 있을 수 있습니다. {{t:dry|드라이}} 플롭은 누군가 따라잡을 위험을 줄여 줄 뿐입니다." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
플롭이 나오면 모든 플레이어는 자신의 일곱 장 중 다섯 장을 이미 보게 됩니다. {{t:board|보드}}의 카드 세 장이 플레이어들의 핸드와 어떻게 맞물리는지를 플롭의 {{t:texture|텍스처}}라고 합니다. {{t:texture|텍스처}}에 따라 누가 더 자주 맞혔는지, 베팅할 가치가 있는지가 달라집니다. c-bet(프리플롭 {{t:raise|레이즈}} 후 플롭에서 하는 {{t:bet|베팅}})을 배우기 전에 플롭을 네 가지 축으로 읽는 법을 익히세요.

## 높이

가장 높은 카드를 봅니다. **높은** 플롭은 가장 높은 카드가 A, K 또는 Q입니다. 예: [[Ks 7d 2c]]. **중간 높이** 플롭은 가장 높은 카드가 J 또는 10입니다. 예: [[Jh 8c 4d]]. **낮은** 플롭은 가장 높은 카드가 9 이하입니다. 예: [[7s 6h 5d]].

## 무늬

**{{t:rainbow|레인보우}}** 플롭은 무늬가 세 가지 모두 다릅니다. 아직 아무도 {{t:flush-draw|플러시 드로우}}를 가지고 있지 않습니다. **{{t:two-tone|투톤}}** 플롭은 같은 무늬 카드가 두 장입니다. 예: [[Jh Th 8c]]. 플레이어가 그 무늬 카드 두 장을 들고 있으면 {{t:flush-draw|플러시 드로우}}가 됩니다. **{{t:monotone|모노톤}}** 플롭은 세 장 모두 같은 무늬입니다. 예: [[Kh 8h 3h]]. {{t:flush|플러시}}가 이미 완성되어 있을 수 있습니다.

## 랭크

**{{t:paired|페어드}}** 플롭은 같은 랭크 카드가 두 장입니다. 예: [[Qd Qs 6h]]. 이 플롭에서는 손에 든 두 장으로 {{t:straight|스트레이트}}를 가진 사람이 없지만, {{t:straight-draw|스트레이트 드로우}}는 가능할 때가 있습니다(예: Q-Q-9).

**{{t:connected|커넥티드}}** 플롭은 서로 다른 세 랭크가 연속된 다섯 랭크 안에 들어 있어서, 지금 바로 {{t:straight|스트레이트}}가 가능합니다. 예를 들어 [[9h 7d 6c]]에서는 85와 T8이 {{t:straight|스트레이트}}를 만듭니다. A는 1로도 계산되므로 [[Ah 5d 3c]]도 {{t:connected|커넥티드}}입니다.

**{{t:semi-connected|세미 커넥티드}}** 플롭은 연속된 다섯 랭크 안에 자기 카드가 두 장만 들어 있습니다. 아직 {{t:straight|스트레이트}}를 가진 사람은 없지만, 누군가 {{t:straight-draw|스트레이트 드로우}}(양방 또는 거트샷)를 가지고 있을 수 있습니다. 예를 들어 [[Kh Qd 4c]]에서는 JT가 이를 만듭니다. 서로 가까운 카드 두 장만 있으면 되므로 이런 플롭은 많습니다.

**{{t:disconnected|디스커넥티드}}** 플롭은 카드가 서로 멀리 떨어져 있어서 어떤 두 장도 연속된 다섯 랭크 안에 들어가지 않습니다. 예: [[Ks 8d 3c]]. 여기서는 아무도 {{t:straight-draw|스트레이트 드로우}}조차 가지고 있지 않습니다. 이런 플롭은 많지 않습니다.

## {{t:dry|드라이}}인가, {{t:wet|웻}}인가

{{t:wetness|웻 정도}} 점수를 셉니다. 즉 플롭이 {{t:draw|드로우}}와 강한 플러시, {{t:straight|스트레이트}}에 얼마나 유리한지를 봅니다.

- 지금 이미 여러 방법으로 가능한 {{t:straight|스트레이트}}, 즉 손에 든 두 랭크의 서로 다른 조합이 두 가지 이상으로 만들어지는 경우([[9h 8d 7c]]에서는 JT, T6, 65가 만듭니다): {{n:tex.points.straight.made}}점,
- 한 가지 방법으로만 가능한 {{t:straight|스트레이트}}([[Ah Kd Tc]]에서는 QJ만, [[Ah 4d 2c]]에서는 53만 만듭니다): {{n:tex.points.straight.made-one}}점,
- {{t:straight-draw|스트레이트 드로우}}만 가능한 경우({{t:semi-connected|세미 커넥티드}} 플롭, 또는 서로 가까운 카드 두 장이 있는 {{t:paired|페어드}} 플롭): {{n:tex.points.straight.draw}}점,
- 같은 무늬 카드 두 장: {{n:tex.points.suits.two-tone}}점, 같은 무늬 카드 세 장: {{n:tex.points.suits.monotone}}점.

**{{t:dry|드라이}}** 플롭은 {{n:tex.threshold.medium}}점 미만, **{{t:wet|웻}}** 플롭은 {{n:tex.threshold.wet}}점 이상이며, **중간**은 그 사이입니다.

| 플롭 | 무늬 | {{t:straight|스트레이트}} | 합계 | {{t:texture|텍스처}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|드라이}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|드라이}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|드라이}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|드라이}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | 중간 |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | 중간 |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|웻}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|웻}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|웻}} |

완성된 {{t:straight|스트레이트}}는 {{t:draw|드로우}}만 있는 것보다 비중이 큽니다. 지금 바로 힘의 균형을 바꾸기 때문입니다. 여러 방법으로 가능한 {{t:straight|스트레이트}}는 한 가지 방법으로만 가능한 {{t:straight|스트레이트}}보다 비중이 큽니다. [[9h 8d 7c]]에서는 많은 핸드가 {{t:straight|스트레이트}}나 {{t:oesd|양방 스트레이트 드로우}}를 가지고 있지만, [[Ah Kd Tc]]에서는 QJ만 {{t:straight|스트레이트}}를 만들고 양방 {{t:draw|드로우}}를 가진 사람은 없습니다. 그래서 무늬가 세 가지인 A-K-T는 {{t:connected|커넥티드}}이지만 중간입니다.

{{t:two-tone|투톤}} [[Kh 7h 2c]]는 {{t:flush-draw|플러시 드로우}}가 하나 있는 {{t:dry|드라이}} 플롭입니다. {{t:straight|스트레이트}}도 {{t:straight-draw|스트레이트 드로우}}도 없습니다. {{t:monotone|모노톤}} 플롭은 항상 {{t:wet|웻}}입니다. [[Kh 8h 3h]]에서 {{t:flush|플러시}}나 {{t:flush-draw|플러시 드로우}}를 가진 핸드는 [[9h 8d 7c]]에서 {{t:straight|스트레이트}}나 {{t:oesd|양방 스트레이트 드로우}}를 가진 핸드보다 많습니다.

{{t:dry|드라이}} 플롭에서는 앞선 사람이 보통 리버까지 앞서 있습니다. {{t:wet|웻}} 플롭에서는 이후 카드가 힘의 균형을 자주 바꾸므로, 플롭에서 가장 좋은 핸드도 덜 안전합니다.

:::note 이 정의는 어디에서 왔을까요
{{t:dry|드라이}}와 {{t:wet|웻}}이라는 개념은 포커 문헌에서 나왔습니다. 교육 자료에서는 {{t:dry|드라이}}의 예로 무늬가 세 가지인 K-7-2, A-9-4, A-A-6을, {{t:wet|웻}}의 예로 9-8-7, Q-J-T, T-9-5-4를 듭니다. 점수와 정확한 경계(예: 중간 높이 플롭이 10부터 시작한다는 것)는 모든 플롭을 명확하게 평가할 수 있도록 앱에서 정한 약속입니다. 출처들은 점수 경계를 제시하지 않으며, {{t:dry|드라이}}도 {{t:wet|웻}}도 아닌 플롭을 무엇이라 부를지도 정하지 않습니다. 이 약속에 따르면 전체 플롭 중 {{t:dry|드라이}}는 약 {{n:tex.share.dry}}, 중간은 약 {{n:tex.share.medium}}, {{t:wet|웻}}은 약 {{n:tex.share.wet}}입니다. 이는 앱의 정의에서 나온 결과이며, 문헌에 있는 수치가 아닙니다.
:::
