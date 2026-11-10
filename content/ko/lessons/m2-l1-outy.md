---
id: m2.l1
module: m2
order: 1
title: "아웃과 확률"
sub: "2와 4의 법칙"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "{{t:flush|플러시}}를 만들 아웃은 몇 개입니까?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "하트가 {{n:draw.flush.seen}}장 있습니다(핸드에 2장, {{t:board|보드}}에 2장). 덱에는 하트가 {{n:cards.per-suit}}장 있으므로 {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}장이 남았습니다." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}}장은 덱에 있는 하트 전체이지만, 그중 {{n:draw.flush.seen}}장은 이미 보입니다." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}}장은 이미 가진 하트입니다. 우리가 세는 것은 필요한 카드입니다." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "{{t:straight|스트레이트}}를 만들 아웃은 몇 개입니까?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "6-7-8-9를 가지고 있습니다. 5든 10이든 어느 것이 나와도 {{t:straight|스트레이트}}가 됩니다: 랭크 {{n:draw.oesd.ranks}}개 × 무늬 {{n:cards.suits}}개 = {{n:outs.oesd}}장." }
      - { text: "{{n:outs.gutshot}}", why: "가운데 카드 한 장이 빠졌을 때(거트샷) 아웃이 그만큼입니다. 여기서는 {{t:straight|스트레이트}}가 양쪽으로 열려 있습니다." }
      - { text: "{{n:draw.oesd.ranks}}", why: "카드 랭크는 두 가지(5와 10)이지만, 각각 무늬가 네 가지입니다." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "턴, {{t:flush|플러시}} 아웃이 {{n:outs.flush}}개입니다. 리버에서 맞힐 확률은 얼마입니까?"
    options:
      - { text: "약 {{n:odds.flush.turn-river}}", correct: true, why: "남은 카드는 한 장입니다: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}(근삿값). 정확히는 모르는 카드 {{n:cards.unseen.turn}}장 중 {{n:outs.flush}}장, 즉 {{n:odds.flush.turn-river}}입니다." }
      - { text: "약 {{n:odds.flush.flop-river}}", why: "플롭에서 두 장이 남았을 때의 확률입니다. 턴에서는 한 장만 남았습니다." }
      - { text: "약 {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}}라면 모르는 카드 두 장 중 한 장이 {{t:flush|플러시}}를 만든다는 뜻입니다. 실제로는 {{n:cards.unseen.turn}}장 중 {{n:outs.flush}}장뿐입니다." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "플롭에서 거트샷(아웃 {{n:outs.gutshot}}개)이 있습니다. 리버까지 맞힐 확률은 얼마입니까?"
    options:
      - { text: "약 {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}}(근삿값). 정확히는 {{n:odds.gutshot.flop-river}}입니다. 하지만 이 확률은 추가 {{t:bet|베팅}} 없이 두 장을 모두 볼 때(올인)만 해당합니다. 상대가 플롭에서 {{t:bet|베팅}}하면 카드 한 장 값을 치르는 것이므로, 확률은 약 {{n:odds.gutshot.flop-turn}}입니다." }
      - { text: "약 {{n:odds.gutshot.rule-turn}}", why: "카드 한 장일 때의 근사 확률입니다({{n:outs.gutshot}} × 2). 질문은 턴과 리버, 두 장 모두에 관한 것입니다." }
      - { text: "약 {{n:odds.oesd.flop-river}}", why: "아웃이 {{n:outs.oesd}}개일 때의 확률입니다. 거트샷은 {{n:outs.gutshot}}개뿐입니다." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "플롭. {{t:flush-draw|플러시 드로우}}가 있고 상대가 {{t:bet|베팅}}합니다. {{t:call|콜}} 비용을 어떤 적중 확률과 비교합니까?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "약 {{n:odds.flush.flop-turn}}, 턴에서의 확률", correct: true, why: "{{t:call|콜}}로 사는 것은 카드 한 장뿐입니다. 턴에서 상대가 다시 {{t:bet|베팅}}할 수 있고, 리버 값은 따로 치르게 됩니다. {{n:cards.unseen.flop}}장 중 {{n:outs.flush}}장은 약 {{n:odds.flush.flop-turn}}입니다." }
      - { text: "약 {{n:odds.flush.flop-river}}, 리버까지의 확률", why: "이 확률은 추가 {{t:bet|베팅}} 없이 두 장을 모두 확실히 볼 때, 즉 올인일 때만 해당합니다. 플롭의 일반적인 {{t:bet|베팅}}에 대해서는 카드 한 장을 사는 것입니다." }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "턴. {{t:flush|플러시}} 아웃이 {{n:outs.flush}}개입니다. 2와 4의 법칙으로 계산하면 리버에서 맞힐 확률은 몇 퍼센트입니까? 숫자를 입력하세요."
    answer: odds.flush.rule-turn
    explanation: "남은 카드가 한 장이므로 2를 곱합니다: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}(근삿값). 정확히는 {{n:cards.unseen.turn}}장 중 {{n:outs.flush}}장, 즉 {{n:odds.flush.turn-river}}입니다."
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
**아웃**은 내 핸드를 이길 가능성이 높은 핸드로 만들어 주는 카드입니다. 아웃을 세면 계산기 없이도 확률을 빠르게 추정할 수 있습니다.

## 흔한 {{t:draw|드로우}}

- **{{t:flush-draw|플러시 드로우}}**(같은 무늬 {{n:draw.flush.seen}}장, {{t:flush|플러시}}까지 한 장 부족): **아웃 {{n:outs.flush}}개**. 한 무늬는 {{n:cards.per-suit}}장이고, 그중 {{n:draw.flush.seen}}장이 보입니다.
- **{{t:oesd|오픈엔디드 스트레이트 드로우}}**, 예: [[6s 7h Kd]] {{t:board|보드}}에서 [[8c 9d]]: **아웃 {{n:outs.oesd}}개**, 즉 5 네 장과 10 네 장입니다.
- **{{t:straight|스트레이트}} 가운데가 빈 경우(거트샷)**, 예: 7이 없는 5-6-8-9: **아웃 {{n:outs.gutshot}}개**.

## 2와 4의 법칙

이 법칙은 계산기 없이 근사 확률을 알려 줍니다: 아웃에 2 또는 4를 곱합니다. 정확한 확률은 아래 표에 있습니다.

```formula
확률 ≈ 아웃 × 2   (남은 카드 한 장)
확률 ≈ 아웃 × 4   (두 장, 추가 베팅 없이 두 장을 모두 볼 때만)
```

| {{t:draw|드로우}} | 아웃 | 플롭 → 턴 | 플롭 → 리버(올인) | 턴 → 리버 |
|---|---|---|---|---|
| {{t:flush|플러시}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|오픈엔디드 스트레이트 드로우}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| 거트샷 | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## 한 장인가, 두 장인가?

상대가 플롭에서 {{t:bet|베팅}}하면 내 {{t:call|콜}}로 사는 카드는 턴 한 장뿐입니다. 턴에서 상대가 다시 {{t:bet|베팅}}할 수 있고, 리버 값은 따로 치르게 됩니다. 그래서 플롭에서 {{t:bet|베팅}}을 받으면 **다음 카드**의 확률(× 2)을 계산합니다: {{t:flush|플러시}}라면 {{n:cards.unseen.flop}}장 중 {{n:outs.flush}}장, 즉 약 {{n:odds.flush.flop-turn}}입니다. **리버까지**의 확률(× 4, {{t:flush|플러시}}는 약 {{n:odds.flush.flop-river}})은 추가 {{t:bet|베팅}} 없이 두 장을 모두 확실히 볼 때, 즉 누군가 올인했을 때만 사용합니다.

:::note 이 숫자의 출처
턴에서 모르는 카드는 {{n:cards.unseen.turn}}장입니다({{n:cards.deck}}장에서 내 카드 {{n:cards.hole}}장과 {{t:board|보드}}의 {{n:cards.board.turn}}장을 뺀 수). {{t:flush|플러시}}를 맞힐 확률은 {{n:cards.unseen.turn}}장 중 {{n:outs.flush}}장입니다. 아웃이 {{n:rule24.outs.max}}개 이하인 한, 2와 4의 법칙의 오차는 최대 약 {{n:rule24.error.max.pp}}%포인트입니다.
:::
