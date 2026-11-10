---
id: m1.l1
module: m1
order: 1
title: "핸드 진행 순서"
sub: "블라인드, 스트리트, 가능한 액션"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "플롭이고, 당신 앞에서 아무도 {{t:bet|베팅}}하지 않았습니다. 무엇을 할 수 있을까요?"
    options:
      - { text: "{{t:check|체크}} 또는 {{t:bet|베팅}}", correct: true, why: "앞에 {{t:bet|베팅}}이 없으면 선택지는 두 가지입니다. 무료로 넘기거나 직접 {{t:bet|베팅}}하는 것입니다." }
      - { text: "{{t:call|콜}}", why: "아무도 {{t:bet|베팅}}하지 않았으므로 {{t:call|콜}}할 것이 없습니다." }
      - { text: "{{t:raise|레이즈}}", why: "{{t:raise|레이즈}}는 다른 사람의 {{t:bet}}에만 할 수 있습니다. 라운드의 첫 {{t:bet}}은 bet이라고 합니다." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "플롭에서는 {{t:community-cards|커뮤니티 카드}}가 몇 장 나올까요?"
    options:
      - { text: "3", correct: true, why: "플롭은 카드 세 장이 한 번에 나옵니다. 그다음 턴과 리버에서 한 장씩 추가됩니다." }
      - { text: "1", why: "한 장씩 나오는 것은 턴과 리버입니다." }
      - { text: "5", why: "{{t:community-cards|커뮤니티 카드}} 다섯 장이 모두 깔리는 것은 리버에 가서입니다." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "상대가 {{t:chips|칩}} 20개를 {{t:bet|베팅}}했습니다. 당신의 핸드는 약하고 더 플레이하고 싶지 않습니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:fold|폴드}}", correct: true, why: "{{t:bet}}이 있는데 돈을 내고 싶지 않다면 {{t:fold|폴드}}합니다. 이미 낸 것만 잃습니다." }
      - { text: "{{t:check|체크}}", why: "{{t:call|콜}}해야 할 {{t:bet}}이 있을 때는 체크할 수 없습니다." }
      - { text: "{{t:call|콜}}", why: "{{t:call|콜}}하려면 {{t:chips|칩}} 20개가 듭니다. 플레이하고 싶지 않다면 손해입니다." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "마지막 {{t:betting-round}}는 무엇일까요?"
    options:
      - { text: "리버", correct: true, why: "리버는 다섯 번째 {{t:community-cards|커뮤니티 카드}}입니다. 리버 베팅 후 플레이어가 두 명 이상 남아 있으면 카드를 공개합니다(쇼다운)." }
      - { text: "턴", why: "턴은 네 번째 카드입니다. 그 뒤에 리버가 남아 있습니다." }
      - { text: "플롭", why: "플롭은 {{t:community-cards|커뮤니티 카드}}가 나오는 첫 번째 라운드입니다." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "당신은 {{t:big-blind|빅 블라인드}}이고, 모두 {{t:fold|폴드}}했으며 {{t:small-blind}}는 부족한 금액만 채웠습니다. 핸드는 약합니다. 어떻게 하시겠습니까?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|체크}}", correct: true, why: "당신의 {{t:big-blind}}는 {{t:bet}}으로 간주되고, {{t:small-blind}}는 그 금액을 맞췄을 뿐입니다. 아무도 {{t:raise|레이즈}}하지 않았으므로 플롭을 무료로 볼 수 있습니다. 비용이 들지 않는데 핸드가 약하다는 이유로 폴드할 필요는 없습니다." }
      - { text: "{{t:fold|폴드}}", why: "무료로 {{t:check|체크}}할 수 있는데 {{t:fold|폴드}}하는 것은 순전한 손해입니다." }
      - { text: "{{t:raise|레이즈}}", why: "7-2로는 만들어 갈 것이 없습니다. {{t:check}}하면 플롭을 무료로 볼 수 있습니다." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
모든 핸드는 정해진 순서대로 진행됩니다. 먼저 두 명의 플레이어가 의무적으로 내는 금액, 즉 **블라인드**를 냅니다. {{t:small-blind}}와 {{t:big-blind}}입니다. 덕분에 {{t:pot|팟}}에는 항상 걸린 것이 있습니다.

플롭 전에는 {{t:big-blind}}가 {{t:bet}}으로 간주됩니다. 플레이하려는 사람은 최소한 그 금액을 {{t:call|콜}}해야 합니다. 플롭 전에는 {{t:big-blind|빅 블라인드}}가 마지막으로 액션합니다. 아무도 {{t:raise|레이즈}}하지 않았다면 {{t:check|체크}}하고 추가로 내지 않고 플롭을 볼 수 있습니다.

## 네 번의 {{t:betting-round|베팅 라운드}}

1. **프리플롭**: 자신의 카드 2장만 있습니다.
2. **플롭**: {{t:board}}에 {{t:community-cards}} 3장이 깔립니다.
3. **턴**: 네 번째 카드입니다.
4. **리버**: 다섯 번째이자 마지막 카드입니다.

리버 베팅 후 핸드에 플레이어가 두 명 이상 남아 있으면 카드를 공개합니다. 이것이 **쇼다운**이며, 가장 높은 족보가 {{t:pot|팟}}을 가져갑니다. 그 전에 한 명을 제외한 모두가 {{t:fold|폴드}}하면, 남은 한 명이 카드를 보여 주지 않고 {{t:pot|팟}}을 가져갑니다.

## 가능한 액션

- **{{t:check|체크}}**: 아무것도 내지 않습니다. 이번 라운드에서 당신 앞에 아무도 {{t:bet|베팅}}하거나 {{t:raise|레이즈}}하지 않았을 때만 가능합니다(플롭 전에는 아무도 {{t:raise|레이즈}}하지 않았다면 {{t:big-blind|빅 블라인드}}가 {{t:check|체크}}할 수 있습니다).
- **{{t:bet|베팅}}**: 라운드의 첫 {{t:bet}}입니다. 이후 레슨의 공식에서는 간단히 „bet”이라고 씁니다.
- **{{t:call|콜}}**: 상대의 {{t:bet|베팅}} 금액에 맞춥니다.
- **{{t:raise|레이즈}}**: 다른 사람의 {{t:bet}} 금액을 올립니다.
- **{{t:fold|폴드}}**: 카드를 버리고 이미 낸 것을 잃습니다.

:::note 기억하세요
누군가 {{t:bet|베팅}}했다면 {{t:fold|폴드}}, {{t:call|콜}}, {{t:raise|레이즈}} 중 하나를 할 수 있습니다. 아무도 {{t:bet|베팅}}하지 않았다면 {{t:check|체크}}하거나 {{t:bet|베팅}}할 수 있습니다.
:::

:::note 올인과 {{t:side-pot}}
앞에 가진 것보다 많이 {{t:bet|베팅}}할 수는 없습니다. 가진 {{t:chips}}을 모두 내면 **올인**입니다. 더 이상 베팅에 참여하지 않으며, 남은 {{t:community-cards}}는 끝까지 깔립니다. 각 상대에게서는 최대 자신이 낸 만큼만 이길 수 있습니다. 다른 플레이어들이 더 큰 금액으로 계속 플레이하면, 초과분은 **{{t:side-pot|사이드 팟}}**으로 들어가고 그 팟은 그 플레이어들끼리만 다툽니다.
:::
