---
id: m9.l4
module: m9
order: 4
title: "3스트리트 플랜"
sub: "핸드가 감당할 수 있는 밸류 스트리트 수"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "버튼에서 {{t:open|오픈}}했고 {{t:big-blind}}가 {{t:call|콜}}했습니다. {{t:dry|드라이}} 플롭에서 셋을 맞혔습니다. 이 핸드는 {{t:value|밸류}} 스트리트를 몇 개 감당할 수 있을까요?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "세 개", correct: true, why: "{{t:dry|드라이}} 플롭의 셋은 거의 항상 가장 강한 핸드입니다. 매 {{t:street|스트리트}}마다 상대의 더 약한 핸드(예: 킹, 7, {{t:pair}})가 여전히 지불할 수 있으므로 플롭, 턴, 리버에서 {{t:bet|베팅}}을 계획합니다." }
      - { text: "한 개", why: "너무 적습니다: 이렇게 강한 핸드로 {{t:bet|베팅}}을 한 번만 하면 밸류 대부분을 {{t:board|보드}} 위에 남겨 두게 됩니다. 킹을 가진 상대는 한 번보다 더 많이 지불합니다." }
      - { text: "없음: 상대가 겁먹지 않도록 {{t:check|체크}}합니다", why: "모든 {{t:street|스트리트}}에서 {{t:check|체크}}하면 {{t:pot|팟}}을 키우지 못합니다. 셋은 보통 쇼다운에서 이기므로 {{t:pot}}이 커지기를 원합니다." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "버튼에서 {{t:open|오픈}}했고 {{t:big-blind}}가 {{t:call|콜}}했으며, {{t:spr}}은 약 {{n:spr.srp}}입니다. 최고 키커와 함께 {{t:top-pair|탑 페어}}를 들고 있습니다. 어떤 플랜을 세우나요?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "보통 {{t:value|밸류}} 두 스트리트, 스택 전체를 거는 플랜은 없음", correct: true, why: "맞습니다: 더 약한 킹과 8은 보통 {{t:bet|베팅}}을 한두 번 지불합니다. {{t:pot|팟}}에 돈이 아주 많아지면 주로 원 {{t:pair|페어}}보다 강한 핸드가 지불합니다. {{t:spr}} 약 {{n:spr.srp}}에서는 {{t:pot}}보다 큰 {{t:bet|베팅}}을 해야만 스택 전체가 들어갑니다." }
      - { text: "올인까지 세 {{t:street|스트리트}} 동안 큰 {{t:bet|베팅}}", why: "{{t:spr}} 약 {{n:spr.srp}}에서는 매 {{t:street|스트리트}}마다 {{t:pot|팟}}의 약 {{n:geo.srp.3}} 크기로 {{t:bet|베팅}}해야 합니다. 리버까지 {{t:pot|팟}}에 남는 것은 주로 원 {{t:pair|페어}}를 이기는 {{t:two-pair}}와 셋입니다." }
      - { text: "한 {{t:street|스트리트}} 또는 없음", why: "너무 조심스럽습니다: {{t:dry|드라이}} 플롭에서 최고 키커의 {{t:top-pair}}는 상대의 많은 핸드를 이깁니다. 보통 {{t:value|밸류}} 두 스트리트를 감당합니다." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "버튼에서 {{t:open|오픈}}했고 {{t:big-blind}}가 {{t:call|콜}}했습니다. 미들 {{t:pair|페어}}를 들고 있습니다. 이 핸드는 {{t:value|밸류}} 스트리트를 몇 개 감당할 수 있을까요?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "한 개 또는 없음: 쇼다운까지 가는 것으로 충분한 경우가 많습니다", correct: true, why: "맞습니다: 미들 {{t:pair}}는 {{t:bluff|블러프}}와 더 약한 {{t:pair|페어}}를 이기지만, {{t:bet|베팅}}을 여러 번 지불할 더 약한 핸드는 많지 않습니다. 플랜: 많아야 작은 {{t:bet|베팅}} 한 번, 또는 {{t:check|체크}} 후 {{t:call|콜}}." }
      - { text: "두 개, {{t:top-pair}}처럼", why: "미들 {{t:pair}}는 모든 킹에게 집니다. 두 번째 {{t:bet|베팅}} 이후에는 주로 이를 이기는 핸드가 지불합니다." }
      - { text: "세 개, 상대가 드로를 완성하지 못하도록", why: "미들 {{t:pair|페어}}로 하는 세 번의 {{t:bet|베팅}}은 주로 더 강한 핸드에게 지불받습니다: 더 약한 핸드는 첫 번째나 두 번째 {{t:bet|베팅}}에서 이미 {{t:fold|폴드}}합니다." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "4벳 {{t:pot|팟}}, {{t:spr}} 약 {{n:spr.4bet}}. 최고 키커와 함께 {{t:top-pair|탑 페어}}를 들고 있습니다. 이 핸드는 {{t:value|밸류}} 두 스트리트를 감당합니다. 어떤 플랜을 세우나요?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "{{t:pot|팟}}의 약 {{n:geo.4bet.2}}씩 {{t:bet|베팅}} 두 번: 턴에서 스택 전체가 들어갑니다", correct: true, why: "맞습니다: {{t:spr}} 약 {{n:spr.4bet}}에서는 두 {{t:street|스트리트}}면 스택 전체를 넣기에 충분합니다. 여기서 {{t:top-pair|탑 페어}}의 {{t:value|밸류}} 두 스트리트는 곧 스택 전체를 건 플레이입니다." }
      - { text: "작은 {{t:bet|베팅}} 후 올인에 {{t:fold|폴드}}", why: "{{t:spr}} 약 {{n:spr.4bet}}에서 에이스 키커의 {{t:top-pair|탑 페어}}로 올인에 {{t:fold|폴드}}하면 너무 많이 포기하는 것입니다: 필요한 에퀴티는 약 {{n:eq.jam.4bet}}뿐이고, 내가 {{t:bet|베팅}}한 뒤에는 더 적습니다." }
      - { text: "{{t:pot|팟}}을 컨트롤하려고 모든 {{t:street|스트리트}}에서 {{t:check|체크}}합니다", why: "{{t:pot|팟}} 컨트롤은 {{t:spr}}이 높을 때 의미가 있습니다. 여기서는 {{t:pot}}이 이미 스택에 비해 크고, 더 약한 핸드(AQ, QQ, JJ)가 기꺼이 나머지를 넣습니다." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "3벳 {{t:pot|팟}}이고 {{t:position|포지션}}이 있으며, {{t:spr}}은 약 {{n:spr.3bet-ip}}입니다. 셋을 들고 있고 리버까지 스택 전체를 넣고 싶습니다. 어떤 라인을 선택하나요?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "플롭, 턴, 리버에서 매번 {{t:pot|팟}}의 약 {{n:geo.3bet-ip.3}} 크기로 {{t:bet|베팅}}", correct: true, why: "맞습니다: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}}, {{n:geo.3bet-ip.river}}의 합은 {{n:geo.3bet-ip.total}}, 즉 스택 전체입니다. 상대는 매 {{t:street|스트리트}}마다 {{t:pot|팟}}의 적당한 비율을 지불합니다." }
      - { text: "매 {{t:street|스트리트}}에서 {{t:pot|팟}}의 1/3로 {{t:bet|베팅}}", sizeError: true, why: "라인은 좋지만 사이즈가 틀렸습니다: {{t:pot|팟}}의 1/3씩 세 번 {{t:bet|베팅}}하면 {{n:spr.3bet-ip.stack}} 중 약 {{n:g3b.third.total}}만 들어갑니다. 스택 전체를 넣는 플랜에는 {{t:pot|팟}}의 약 {{n:geo.3bet-ip.3}} 크기가 필요합니다." }
      - { text: "플롭과 턴에서 {{t:check|체크}}하고 리버에서 올인", why: "리버에서 스택 전체로 올인하면 {{t:pot}}보다 몇 배 큰 {{t:bet|베팅}}이 됩니다. 상대는 아주 강한 핸드로만 지불하고, 더 작은 {{t:bet|베팅}} 세 번이었다면 지불했을 더 약한 핸드는 {{t:fold|폴드}}합니다." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "왜 세 {{t:street|스트리트}} 플랜을 플롭에서 미리 정해 두는 것이 좋을까요?"
    options:
      - { text: "플롭 사이즈가 나중에 얼마를 넣을 수 있는지 결정하기 때문에", correct: true, why: "맞습니다: {{t:pot}}은 곱셈으로 커집니다. 플롭의 작은 {{t:bet|베팅}}은 턴과 리버에 작은 {{t:pot|팟}}을 남기므로, 나중에 아주 큰 {{t:bet|베팅}} 없이는 스택 전체를 넣기 어렵습니다." }
      - { text: "나중에 플랜을 바꾸면 안 되기 때문에", why: "상황이 바뀌면(예: 턴의 위험한 카드) 플랜을 바꿉니다. 핵심은 첫 {{t:bet|베팅}}이 목표, 즉 {{t:value|밸류}} 스트리트 수와 스택 전체를 걸지 여부에 맞아야 한다는 것입니다." }
      - { text: "상대가 내 플랜을 볼 수 있기 때문에", why: "상대는 내 플랜을 모릅니다. 플랜은 마지막에 {{t:pot|팟}}에 핸드가 감당할 만큼의 금액이 쌓이도록 사이즈를 고르는 데 도움이 됩니다." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "싱글 레이즈 {{t:pot|팟}}, {{t:spr}} 약 {{n:spr.srp}}. 좋은 키커와 함께 {{t:top-pair|탑 페어}}를 들고 있습니다. {{t:pot|팟}}의 약 {{n:geo.srp.3}}인 지오메트릭 사이즈로 베팅하나요?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "아니요: 스택 전체를 넣는 사이즈이고, 이 핸드는 보통 두 {{t:street|스트리트}}를 감당합니다", correct: true, why: "맞습니다: 지오메트릭 사이즈는 스택 전체를 넣기 위한 것입니다. {{t:pot}}보다 큰 {{t:bet|베팅}}에는 더 약한 핸드가 지불을 멈추고, 원 {{t:pair|페어}}보다 강한 핸드만 남습니다." }
      - { text: "예: 항상 지오메트릭 사이즈로 베팅합니다", why: "지오메트릭 사이즈는 스택 전체를 넣는 플랜에 맞습니다. {{t:spr}} 약 {{n:spr.srp}}에서 {{t:top-pair|탑 페어}}는 보통 그런 플랜을 갖지 않습니다." }
      - { text: "아니요: {{t:top-pair|탑 페어}}로는 항상 {{t:check|체크}}합니다", why: "{{t:top-pair|탑 페어}}는 밸류 {{t:bet|베팅}}을 원합니다. 다만 더 작게, 보통 두 {{t:street|스트리트}}에 걸쳐서이지 스택 전체를 노리지는 않습니다." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}: {{t:pot|팟}}은 {{n:ex.pot}}, 스택은 각각 {{n:commit.stack}}입니다. 플롭과 턴에서 {{t:pot|팟}}의 약 {{n:geo.spr2.2}} 크기로 베팅하고, 상대가 {{t:call|콜}}합니다. 남은 스택은 어떻게 되나요?"
    options:
      - { text: "턴 이후 스택 전체가 {{t:pot|팟}}에 들어가 있습니다", correct: true, why: "맞습니다: 플롭 {{n:geo.spr2.flop}}, 턴 {{n:geo.spr2.turn}}, 합계 {{n:geo.spr2.total}}입니다. 그래서 {{t:spr}} {{n:spr.commit}}에서는 {{t:top-pair|탑 페어}}의 {{t:value|밸류}} 두 스트리트로 스택 전체를 걸기에 충분합니다." }
      - { text: "리버에 절반 정도가 남습니다", why: "{{t:pot|팟}}은 곱셈으로 커집니다: 플롭 이후 팟은 약 {{n:geo.spr2.flop-after}} 규모이고, 턴에서 약 {{n:geo.spr2.2}} 크기의 {{t:bet|베팅}}은 약 {{n:geo.spr2.turn}}, 즉 남은 스택 전부입니다." }
      - { text: "스택이 거의 그대로 남습니다", why: "{{t:spr}} {{n:spr.commit}}에서 스택은 {{t:pot|팟}} {{n:spr.commit}}개 분량에 불과합니다. {{t:pot|팟}}의 약 {{n:geo.spr2.2}}씩 {{t:bet|베팅}}을 두 번 하면 {{n:geo.spr2.total}} 전부가 들어갑니다." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
좋은 플랜은 첫 {{t:bet|베팅}}을 하기 전, 플롭에서 시작됩니다. 스스로 물어보세요: 내 핸드는 {{t:value|밸류}} 스트리트를 몇 개 감당할 수 있고, 스택 전체를 걸고 싶은가? 답은 핸드의 강도와 {{t:spr}}을 함께 고려해서 나옵니다.

## {{t:value|밸류}} 스트리트는 몇 개인가

{{t:street|스트리트}}가 지날 때마다 상대의 더 약한 핸드는 {{t:fold|폴드}}하고, {{t:pot|팟}}에는 주로 내 핸드보다 강한 핸드가 남습니다. 그래서 더 강한 핸드일수록 더 많은 {{t:bet|베팅}}을 감당합니다:

| 핸드 | {{t:value|밸류}} 스트리트 (보통) |
|---|---|
| 아주 강함: 셋, {{t:straight}}, 높은 {{t:two-pair}} | 세 개 |
| 좋은 키커의 {{t:top-pair|탑 페어}}, {{t:overpair}} | 두 개; 상대가 더 약한 핸드로 지불하면 세 번째도 |
| 더 약한 {{t:pair}} (미들, 로우) | 한 개 또는 없음 |

표의 {{t:street|스트리트}} 수는 단순화한 것입니다: {{t:board|보드}}의 {{t:texture|텍스처}}, 턴과 리버 카드, 그리고 상대에 따라 많이 달라집니다.

## 핸드와 {{t:spr}}을 연결하세요

- **세 {{t:street|스트리트}}용 핸드이고, {{t:spr}} 구간이 스택을 건 플레이를 허용하며, 스택 전체를 넣고 싶을 때:** 플롭부터 지오메트릭 사이즈로 베팅합니다(3벳 {{t:pot|팟}}에서 {{t:in-position}}이라면 {{t:pot|팟}}의 약 {{n:geo.3bet-ip.3}}).
- **낮은 {{t:spr}}에서 두 {{t:street|스트리트}}용 핸드:** {{t:spr}} 약 {{n:spr.commit}}에서는 {{t:pot|팟}}의 약 {{n:geo.spr2.2}}씩 {{t:bet|베팅}} 두 번이면 이미 스택 전체이므로, 스택을 걸고 플레이합니다.
- **높은 {{t:spr}}에서 두 {{t:street|스트리트}}용 핸드:** 싱글 레이즈 {{t:pot|팟}}({{t:spr}} 약 {{n:spr.srp}})에서는 밸류 베팅을 하지만 스택 전체를 넣는 플랜은 세우지 않습니다.

{{t:value|밸류}} 세 스트리트는 스택 전체를 건 플레이와 같지 않습니다. 높은 {{t:two-pair}}는 세 {{t:street|스트리트}}를 감당하지만, 싱글 레이즈 {{t:pot|팟}}({{t:spr}} 약 {{n:spr.srp}}, {{n:spr.zone.deep}} 초과)에서는 보통 스택 전체를 걸지 않습니다: 이 구간에서 스택을 거는 핸드는 셋, {{t:straight}} 그리고 그보다 강한 핸드입니다(첫 번째 레슨의 {{t:spr}} 구간).

## 라인

라인은 이어지는 {{t:street|스트리트}}에서의 액션 계획입니다. 기본적인 라인 몇 가지:

- **{{t:bet}}, {{t:bet}}, {{t:bet}}:** {{t:value|밸류}} 세 스트리트용 핸드,
- **{{t:bet}}, {{t:bet}}, {{t:check}}:** 두 {{t:street|스트리트}}용 핸드, 리버에서는 쇼다운까지 갑니다,
- **{{t:bet}} 또는 {{t:check}}, 그다음 {{t:check}}와 {{t:call|콜}}:** 쇼다운까지 싸게 가고 싶은 더 약한 {{t:pair}}.

## 플롭 사이즈가 나머지를 정합니다

{{t:pot|팟}}은 곱셈으로 커지므로, 플롭의 작은 {{t:bet|베팅}}은 이후 {{t:street|스트리트}}에 작은 {{t:pot|팟}}을 남깁니다. 3벳 {{t:pot|팟}}에서 {{t:pot|팟}}의 1/3씩 {{t:bet|베팅}} 세 번은 {{n:spr.3bet-ip.stack}} 스택 중 약 {{n:g3b.third.total}}만 넣지만, {{t:pot|팟}}의 약 {{n:geo.3bet-ip.3}}씩 {{t:bet|베팅}} 세 번은 스택 전체를 넣습니다.

:::note 플랜은 고정된 것이 아닙니다
턴과 리버에서는 플랜을 다시 평가합니다: 위험한 카드가 나오면 {{t:value|밸류}} 스트리트 수가 줄어들 수 있습니다. 턴과 리버를 플레이하는 방법은 M7과 M8 모듈에서 배웁니다. 핸드 유형별 {{t:value|밸류}} 스트리트 수는 여러 교육 자료를 종합한 휴리스틱입니다: 싱글 레이즈 {{t:pot|팟}}에서는 {{t:spr}}이 너무 높아서 많은 {{t:top-pair|탑 페어}}가 {{t:value|밸류}} 세 스트리트를 편하게 받아 내기 어렵습니다.
:::
