---
id: m7.l4
module: m7
order: 4
title: "프로브 벳과 방어"
sub: "상대가 체크하거나 두 번째로 베팅할 때"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "버튼이 {{t:open|오픈}}했고, 당신은 {{t:big-blind|빅 블라인드}}에서 {{t:call|콜}}했습니다. 플롭에서 둘 다 체크합니다. 턴에서 당신이 먼저 베팅합니다. 이 {{t:bet|베팅}}을 무엇이라고 할까요?"
    table: { position: BB }
    options:
      - { text: "프로브 벳", correct: true, why: "맞습니다. 프로브 벳은 프리플롭 {{t:aggressor|어그레서}}가 C벳을 하지 않고 {{t:check|체크}}한 뒤, 턴에서 {{t:out-of-position|아웃 오브 포지션}}에서 하는 {{t:bet|베팅}}입니다." }
      - { text: "C벳", why: "C벳은 프리플롭에서 {{t:raise|레이즈}}한 플레이어가 {{t:bet|베팅}}하는 것입니다. 당신은 {{t:call|콜}}만 했습니다." }
      - { text: "체크 레이즈", why: "체크 레이즈는 {{t:check|체크}}한 뒤 상대의 {{t:bet|베팅}}에 {{t:raise|레이즈}}하는 것입니다. 여기서는 당신이 먼저 베팅하므로 아무에게도 {{t:raise|레이즈}}하지 않습니다." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "플롭에서 버튼이 {{t:check|체크}}한 뒤에는 왜 턴에서 평소보다 더 자주 베팅할 수 있을까요?"
    table: { position: BB }
    options:
      - { text: "버튼은 강한 핸드 다수로 베팅했을 것이므로, {{t:check|체크}}한 뒤에는 그런 핸드가 더 적기 때문에", correct: true, why: "맞습니다. 강한 핸드는 보통 C벳을 합니다. {{t:check|체크}}한 뒤 버튼의 {{t:range|레인지}}에는 중간 핸드와 약한 핸드가 더 많고, 당신은 {{t:bet|베팅}}으로 이를 공격할 수 있습니다." }
      - { text: "{{t:check|체크}}는 항상 버튼에게 아무것도 없다는 뜻이기 때문에", why: "항상 그렇지는 않습니다. 버튼은 당신을 잡으려고 강한 핸드로 {{t:check|체크}}할 때도 있습니다. 다만 베팅할 때보다는 그런 핸드가 적습니다." }
      - { text: "턴에서는 당신에게 {{t:position|포지션}}이 있기 때문에", why: "아닙니다. 버튼은 모든 {{t:street|스트리트}}에서 당신보다 나중에 행동합니다. 프로브 {{t:bet|벳}}은 {{t:out-of-position|아웃 오브 포지션}}에서 합니다." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "버튼이 플롭에서 {{t:check|체크}}했습니다. 어느 {{t:board|보드}}에서 {{t:big-blind|빅 블라인드}}로 프로브 {{t:bet|벳}}을 더 자주 할까요?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "맞습니다. 낮은 카드는 넓게 방어하는 {{t:big-blind|빅 블라인드}}의 핸드(작은 {{t:pair|페어}}, {{t:connectors|커넥터}})에 더 자주 맞고, {{t:check|체크}}한 버튼이 여기서 강한 핸드를 가진 경우는 드뭅니다." }
      - { text: "[[Ac Kd 8h Js]]", why: "높은 {{t:board|보드}}에서는 버튼에게 {{t:range-advantage|레인지 우위}}가 있습니다. 버튼의 에이스와 킹 중 다수가 맞았습니다. 여기서는 프로브 {{t:bet|벳}}을 더 드물게 합니다." }
      - { text: "둘 다 같은 빈도로", why: "M5의 C벳과 마찬가지로 {{t:texture|텍스처}}가 중요합니다. 낮은 보드에서는 더 자주, 높은 보드에서는 더 드물게 베팅합니다." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어하고 있습니다. 플롭에서 둘 다 {{t:check|체크}}했습니다. 턴은 3입니다. 당신이 먼저 행동합니다. 어떻게 하시겠습니까?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "베팅합니다(프로브 벳)", correct: true, why: "당신의 {{t:range|레인지}}에 잘 맞는 낮은 {{t:board|보드}}에서 {{t:oesd|양방향 스트레이트 드로우}}(4 또는 9)를 가지고 있습니다. 버튼이 {{t:fold|폴드}}하면 이기고, {{t:call|콜}}해도 여전히 아웃이 {{n:outs.oesd}}개 있습니다." }
      - { text: "{{t:check|체크}}합니다", correct: true, why: "이것도 괜찮습니다. {{t:draw|드로우}}가 있으면 버튼도 {{t:check|체크}}할 경우 리버를 무료로 볼 수 있습니다. 하지만 보통은 프로브 벳이 더 낫습니다. 플롭에서 {{t:check|체크}}한 버튼의 {{t:range|레인지}}는 약하고, 당신은 강한 {{t:semi-bluff|세미 블러프}}를 가지고 있기 때문입니다." }
      - { text: "{{t:fold|폴드}}합니다", why: "아무도 {{t:bet|베팅}}하지 않았으므로 무료로 {{t:check|체크}}할 수 있습니다(모듈 1의 원칙). {{t:fold|폴드}}하면 이유 없이 {{t:pot|팟}}을 포기하게 됩니다." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어하고 있습니다. 플롭에서 둘 다 {{t:check|체크}}했습니다. 턴은 3입니다. 당신이 먼저 행동합니다. 어떻게 하시겠습니까?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "베팅합니다(프로브 벳)", correct: true, why: "{{t:top-pair|탑 페어}}는 프로브 벳에 좋은 핸드입니다. 버튼의 더 약한 {{t:pair|페어}}와 높은 카드가 당신에게 돈을 내줄 것이고, {{t:bet|베팅}}하면 그들에게 무료 카드를 주지 않습니다." }
      - { text: "{{t:check|체크}}합니다", why: "플롭에서 {{t:check|체크}}한 버튼은 {{t:pair|페어}} 없는 높은 카드를 가진 경우가 많습니다. 버튼이 다시 {{t:check|체크}}하면 당신을 이길 수 있는 무료 카드를 받게 되고, 당신은 버튼의 더 약한 핸드에서 수익을 내지 못합니다." }
      - { text: "{{t:fold|폴드}}합니다", why: "아무도 {{t:bet|베팅}}하지 않았으므로 무료로 {{t:check|체크}}할 수 있습니다. 그리고 {{t:top-pair|탑 페어}}라면 베팅하고 싶은 핸드입니다." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "버튼의 {{t:open|오픈}}에 맞서 {{t:big-blind|빅 블라인드}}를 방어하고 있습니다. 플롭에서 둘 다 {{t:check|체크}}했습니다. 턴은 잭입니다. 당신이 먼저 행동합니다. 어떻게 하시겠습니까?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|체크}}합니다", correct: true, why: "{{t:pair|페어}}도 {{t:draw|드로우}}도 없고, 높은 {{t:board|보드}}는 버튼의 {{t:range|레인지}}에 유리합니다. 이런 {{t:board|보드}}에서 아웃 없이 하는 프로브 벳은 버튼이 {{t:fold|폴드}}할 때만 이기는데, 여기서 버튼에게는 에이스, 킹, 잭이 많습니다." }
      - { text: "베팅합니다(프로브 벳)", why: "프로브 {{t:bet|벳}}은 낮은 보드에서, 그리고 {{t:pair|페어}}나 아웃이 있는 핸드로 더 자주 합니다. 여기에는 둘 다 없습니다." }
      - { text: "{{t:fold|폴드}}합니다", why: "무료로 {{t:check|체크}}할 수 있으므로 {{t:fold|폴드}}해서 얻는 것이 없습니다(모듈 1의 원칙)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "{{t:big-blind|빅 블라인드}}를 방어하고 있습니다. 플롭에서 버튼의 C벳을 {{t:call|콜}}했습니다. 턴은 2이고, 당신이 {{t:check|체크}}하자 버튼이 {{t:pot|팟}} {{n:ex.pot}}에 {{n:ex.bet.three-quarters}}만큼 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "거트샷(잭)만 있습니다. 리버에서 맞을 확률은 약 {{n:odds.gutshot.turn-river}}인데, 필요한 것은 {{n:eq.bet-three-quarters}}입니다. {{t:pair|페어}}가 없고 남은 카드가 한 장뿐이라 이 핸드로는 {{t:second-barrel|세컨드 배럴}}을 방어할 수 없습니다." }
      - { text: "{{t:call|콜}}합니다", why: "가격이 당신의 확률보다 몇 배나 높습니다. {{n:eq.bet-three-quarters}} 대 약 {{n:odds.gutshot.turn-river}}입니다. 임플라이드 오즈로도 이런 차이는 메워지지 않습니다." }
      - { text: "체크 레이즈", why: "{{t:second-barrel|세컨드 배럴}}은 C벳보다 강한 {{t:range|레인지}}입니다. 버튼은 {{t:fold|폴드}}하지 않을 킹이나 더 좋은 핸드를 더 자주 가지고 있습니다. 아웃 {{n:outs.gutshot}}개로는 비싼 {{t:bluff|블러프}}입니다." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "{{t:big-blind|빅 블라인드}}를 방어하고 있습니다. 플롭에서 버튼의 C벳을 {{t:call|콜}}했습니다. 턴은 킹이고, 당신이 {{t:check|체크}}하자 버튼이 {{t:pot|팟}} {{n:ex.pot}}에 {{n:ex.bet.quarter}}만 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|콜}}합니다", correct: true, why: "{{t:oesd|양방향 스트레이트 드로우}}(잭 또는 6)가 있습니다. 확률은 약 {{n:odds.oesd.turn-river}}입니다. 작은 베팅에는 {{n:eq.bet-quarter}}만 필요하니 거의 정확히 그만큼이고, 맞으면 리버에서 더 따낼 수도 있습니다." }
      - { text: "{{t:fold|폴드}}합니다", why: "이렇게 작은 베팅에서는 가격이 당신의 확률과 거의 같고({{n:eq.bet-quarter}} 대 약 {{n:odds.oesd.turn-river}}), 임플라이드 오즈 덕분에 결정은 {{t:call|콜}} 쪽으로 기웁니다." }
      - { text: "올인으로 {{t:raise|레이즈}}합니다", why: "아직 아무것도 완성되지 않은 핸드로 스택 전체를 걸게 되고, 킹을 가진 버튼은 {{t:fold|폴드}}하지 않습니다. 이렇게 좋은 가격이라면 {{t:call|콜}}로 충분합니다." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "{{t:big-blind|빅 블라인드}}를 방어하고 있습니다. 플롭에서 버튼의 C벳을 {{t:call|콜}}했습니다. 턴은 5이고, 당신이 {{t:check|체크}}하자 버튼이 {{t:pot|팟}} {{n:ex.pot}}에 {{n:ex.bet.three-quarters}}만큼 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|콜}}합니다", correct: true, why: "{{t:top-pair|탑 페어}}는 블랭크 카드에서 {{t:fold|폴드}}하기에는 너무 강합니다. {{t:semi-bluff|세미 블러프}}와 더 약한 킹을 이깁니다. 필요한 것은 {{n:eq.bet-three-quarters}}이고, {{t:second-barrel|세컨드 배럴}} {{t:range|레인지}}를 상대로 이런 {{t:pair|페어}}는 보통 그만큼은 됩니다." }
      - { text: "{{t:fold|폴드}}합니다", why: "너무 타이트합니다. {{t:second-barrel|세컨드 배럴}}은 C벳보다 강하지만, 버튼은 {{t:draw|드로우}}와 {{t:bluff|블러프}}로도 {{t:bet|베팅}}합니다. {{t:top-pair|탑 페어}}는 이 모두를 이깁니다." }
      - { text: "{{t:raise|레이즈}}합니다", why: "{{t:raise|레이즈}}하면 더 약한 핸드는 {{t:fold|폴드}}하고, 더 강한 킹과 셋이 돈을 냅니다. 중간 키커의 {{t:top-pair|탑 페어}}는 {{t:raise|레이즈}}할 핸드가 아닙니다." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "왜 플롭의 C벳보다 {{t:second-barrel|세컨드 배럴}}에 맞서 더 좁게 방어할까요?"
    table: { position: BB }
    options:
      - { text: "상대가 {{t:second-barrel|세컨드 배럴}}을 더 좁은 {{t:range|레인지}}로, 보통 더 큰 사이즈로 {{t:bet|베팅}}하고, {{t:draw|드로우}}에는 남은 카드가 한 장뿐이기 때문에", correct: true, why: "맞습니다. 상대는 턴에서 {{t:bluff|블러프}} 일부를 포기하고, 더 큰 베팅은 {{t:mdf|MDF}}를 낮추며(3/4 {{t:pot|팟}}에서는 {{n:mdf.bet-three-quarters}}), 당신의 {{t:draw|드로우}}는 확률의 절반을 잃습니다. 약한 {{t:pair|페어}}와 아웃 없는 핸드는 플롭보다 더 자주 {{t:fold|폴드}}합니다." }
      - { text: "턴에서는 {{t:chips|칩}}을 아껴야 하기 때문에", why: "중요한 것은 아끼는 것이 아니라 각 결정의 {{t:expected-value|기대값}}입니다. 상대가 더 강한 핸드로 베팅하기 때문에 더 좁게 방어합니다." }
      - { text: "아닙니다. 이미 {{t:chips|칩}}을 많이 넣었으므로 더 넓게 방어합니다", why: "이미 넣은 것은 돌아오지 않습니다. 결정은 현재의 가격과 상대 {{t:range|레인지}}의 강도를 바탕으로 내립니다." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "턴입니다. 상대가 {{t:pot|팟}} {{n:ex.pot}}에 {{n:ex.bet.three-quarters}}만큼 {{t:bet|베팅}}합니다. {{t:mdf|MDF}}는 얼마입니까? 퍼센트 단위의 숫자를 입력하세요."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf|MDF}} = {{t:pot|팟}} ÷ ({{t:pot|팟}} + 베팅) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. 공개된 턴 예시에서 솔버는 평균적으로 {{t:mdf|MDF}}에 가깝게 방어했습니다. {{t:out-of-position|아웃 오브 포지션}}에서는 더 적게 방어할 때도 있습니다(플롭과 턴 모두). 상대가 더 드물게 {{t:bluff|블러프}}한다는 것을 알면 더 자주 {{t:fold|폴드}}합니다(계산은 M8의 {{t:bluff|블러프}} 캐치 레슨에서 다룹니다)."
---
턴에서는 두 가지 새로운 상황을 만납니다. 버튼이 C벳을 하지 않고 {{t:check|체크}}했거나, C벳을 한 뒤 두 번째로 베팅하는 경우입니다. 첫 번째 상황에서는 직접 공격할 수 있고, 두 번째 상황에서는 플롭보다 더 좁게 방어합니다.

## 프로브 벳

프로브 벳은 프리플롭 {{t:aggressor|어그레서}}가 플롭에서 {{t:check|체크}}한 뒤, 턴에서 {{t:out-of-position|아웃 오브 포지션}}에서 하는 {{t:bet|베팅}}입니다. 버튼은 강한 핸드 다수로 C벳을 했을 것이므로, {{t:check|체크}}한 뒤에는 그런 핸드가 더 적습니다. 버튼의 {{t:range|레인지}}는 더 약하고, 당신은 이를 공격할 수 있습니다.

- **낮은 보드에서 더 자주**, 예: [[8c 5d 2s 3h]]: 낮은 카드가 넓게 방어하는 당신의 핸드에 맞습니다.
- **높은 보드에서 더 드물게**, 예: [[Ac Kd 8h Js]]: {{t:range-advantage|레인지 우위}}가 버튼 쪽에 남아 있습니다.

## 프로브 벳에 쓸 핸드

- 버튼의 높은 카드에게서 돈을 받고 싶고 무료 카드는 주고 싶지 않은 **{{t:pair|페어}}**,
- 두 가지 방식으로 이기는 **강한 {{t:draw|드로우}}**.

{{t:pair|페어}}도 아웃도 없는 핸드는 {{t:check|체크}}합니다.

## {{t:second-barrel|세컨드 배럴}}에 대한 방어

C벳을 {{t:call|콜}}했는데 버튼이 두 번째로 베팅하면, 버튼의 {{t:range|레인지}}는 플롭보다 좁고 강합니다. {{t:bluff|블러프}} 일부를 포기했기 때문입니다. 당신의 {{t:draw|드로우}}에는 남은 카드가 한 장뿐입니다. 따라서:

- {{t:draw|드로우}}는 좋은 가격이거나 임플라이드 오즈가 있을 때만 {{t:call|콜}}합니다(이전 레슨),
- 아웃 없는 핸드와 가장 약한 {{t:pair|페어}}는 더 자주 {{t:fold|폴드}}합니다,
- {{t:top-pair|탑 페어}}는 보통 여전히 {{t:call|콜}}합니다.

{{t:mdf|MDF}}는 여전히 기준점입니다. 3/4 {{t:pot|팟}} 베팅에서는 {{n:mdf.bet-three-quarters}}입니다. 공개된 턴 예시에서 솔버는 평균적으로 이 값에 가깝게 방어했습니다. {{t:out-of-position|아웃 오브 포지션}}에서는 더 적게 방어할 때도 있습니다. 상대가 {{t:mdf|MDF}}의 가정보다 더 드물게 {{t:bluff|블러프}}할 때도 더 적게 방어합니다.

:::note 이 원칙의 출처
프로브 벳과 {{t:second-barrel|세컨드 배럴}} 방어 원칙은 교육 자료와 솔버 분석에서 나온 휴리스틱입니다. 턴에서 {{t:mdf|MDF}}에 가깝게 방어한다는 점은 공개된 솔버 예시가 보여 줍니다. 출처마다 보드에 따라 수치가 다르기 때문에 앱에서는 빈도를 퍼센트로 제시하지 않습니다. 마이크로 스테이크 플레이어가 어떤 핸드로 프로브 {{t:bet|벳}}을 하는지에 관한 수치는 모집단(표본, {{t:stakes|스테이크}}, 사이트)이 명시된 출처가 필요하므로 여기에는 싣지 않았습니다.
:::
