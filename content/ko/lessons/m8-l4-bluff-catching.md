---
id: m8.l4
module: m8
order: 4
title: "블러프 잡기"
sub: "리버에서 어떤 핸드로 콜할까"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "{{t:big-blind|빅 블라인드}}를 방어하고 있습니다. 리버에서 {{t:check|체크}}했고, 버튼이 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다. 스페이드는 들어오지 않았습니다. 가진 9 {{t:pair|페어}}는 어떤 역할을 합니까?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "블러프 캐처: {{t:bluff|블러프}}에만 이깁니다", correct: true, why: "{{t:pot|팟}} 전체 크기로 버튼은 최소 K 이상으로 {{t:value|밸류}} 베팅하고, 주로 빗나간 {{t:draw|드로우}}로 {{t:bluff|블러프}}합니다. 9 {{t:pair|페어}}는 버튼의 모든 {{t:value|밸류}} 핸드에 지고 모든 {{t:bluff|블러프}}에 이깁니다." }
      - { text: "{{t:value|밸류}} 핸드", why: "{{t:value|밸류}} 핸드는 돈을 내거나 {{t:value|밸류}} 베팅하는 핸드에 이깁니다. 9 {{t:pair|페어}}는 버튼의 모든 K와 그보다 좋은 핸드에 집니다." }
      - { text: "가망 없는 핸드", why: "9 {{t:pair|페어}}는 빗나간 {{t:draw|드로우}}에 이기는데, 버튼은 바로 그런 핸드로 {{t:bluff|블러프}}합니다. 가망은 있지만 {{t:bluff|블러프}}를 상대로만 그렇습니다." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "리버. {{t:pot|팟}} 크기는 {{n:ex.pot}}, 상대는 {{t:pot|팟}} 전체({{n:ex.bet.pot}})를 {{t:bet|베팅}}합니다. 블러프 캐처를 들고 있습니다. {{t:call|콜}}이 이득이 되려면 상대 베팅 중 최소 몇 퍼센트가 {{t:bluff|블러프}}여야 합니까? 숫자를 입력하세요."
    answer: eq.bet-pot
    explanation: "에퀴티는 상대 베팅 중 {{t:bluff|블러프}}가 차지하는 비율입니다. {{t:call|콜}}한 뒤의 {{t:pot|팟}}을 얻기 위해 {{n:ex.bet.pot}}만큼 냅니다: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. 이는 이전 레슨에서 본 균형 상태의 {{t:bluff|블러프}} 비율과 같은 숫자입니다."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "리버. 상대가 {{t:pot|팟}}의 절반을 {{t:bet|베팅}}합니다. 블러프 캐처를 들고 있고, 상대 베팅 중 {{t:bluff|블러프}}가 약 {{n:catch.ex.bluffs-low}}라고 추정합니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "{{n:eq.bet-half}}의 에퀴티가 필요한데, 블러프 캐처는 {{n:catch.ex.bluffs-low}}의 경우에만 이깁니다. {{t:call|콜}}은 손해입니다." }
      - { text: "{{t:mdf|MDF}}가 {{n:mdf.bet-half}}이므로 {{t:call|콜}}합니다", why: "{{t:mdf|MDF}}는 충분히 자주 {{t:bluff|블러프}}하는 상대로부터 나를 지켜 줍니다. {{t:bluff|블러프}}가 너무 적을 때 블러프 캐처로 {{t:call|콜}}하면 돈을 내주게 됩니다." }
      - { text: "{{t:raise|레이즈}}합니다", why: "이 핸드는 {{t:bluff|블러프}}에만 이깁니다. {{t:raise|레이즈}}하면 {{t:bluff|블러프}}는 {{t:fold|폴드}}하고 {{t:value|밸류}} 핸드가 돈을 냅니다. 결국 더 많이 잃습니다." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "리버. 상대가 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다. 블러프 캐처를 들고 있고, 상대 베팅 중 {{t:bluff|블러프}}가 약 {{n:catch.ex.bluffs-high}}라고 추정합니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:call|콜}}합니다", correct: true, why: "{{n:eq.bet-pot}}의 에퀴티가 필요한데, {{t:bluff|블러프}}는 {{n:catch.ex.bluffs-high}}입니다. 상대가 균형보다 더 많이 {{t:bluff|블러프}}하므로 {{t:call|콜}}이 이득입니다." }
      - { text: "베팅이 크므로 {{t:fold|폴드}}합니다", why: "큰 베팅은 가격을 {{n:eq.bet-pot}}까지 올리지만, {{t:bluff|블러프}}는 그보다 많습니다. 중요한 것은 이 두 숫자의 비교이지, 베팅 크기 자체가 아닙니다." }
      - { text: "올인으로 {{t:raise|레이즈}}합니다", why: "블러프 캐처로는 {{t:raise|레이즈}}하지 않습니다. {{t:bluff|블러프}}는 {{t:fold|폴드}}하고, 내 핸드보다 좋은 핸드만 돈을 냅니다." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "상대가 리버에서 {{t:pot|팟}} 전체를 베팅하고, 정확히 {{n:bluff.share.bet-pot}}의 경우에 {{t:bluff|블러프}}합니다. 블러프 캐처로 {{t:call|콜}}하면 얼마를 법니까?"
    options:
      - { text: "아무것도 벌지 못합니다: {{t:call|콜}}과 {{t:fold|폴드}}의 결과가 같습니다", correct: true, why: "{{t:bluff|블러프}} 비율이 {{n:eq.bet-pot}}라면 이는 정확히 {{t:call|콜}}의 가격입니다. {{t:bluff|블러프}}에서 얻는 이익이 밸류에 지는 손실과 상쇄되므로, 상대는 {{t:call|콜}}로도 {{t:fold|폴드}}로도 이익을 내게 해 주지 않습니다." }
      - { text: "{{t:bluff|블러프}}가 많으므로 법니다", why: "블러프는 정확히 가격만큼 있습니다. 상대가 {{n:eq.bet-pot}}보다 자주 {{t:bluff|블러프}}할 때에만 이익을 냅니다." }
      - { text: "밸류가 {{t:bluff|블러프}}보다 많으므로 잃습니다", why: "밸류가 더 많은 것은 맞지만, {{t:call|콜}}하면 {{n:ex.pot}} + {{n:ex.bet.pot}}만큼을 얻기 위해 {{n:ex.bet.pot}}만큼을 겁니다. 이 정도의 {{t:bluff|블러프}} 비율에서는 두 가지가 균형을 이룹니다." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "스페이드는 들어오지 않았습니다. 리버에서 {{t:check|체크}}했고, 버튼이 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다. 10 키커의 {{t:top-pair|탑 페어}}를 들고 있습니다. 다음 두 핸드 중 어느 쪽으로 {{t:call|콜}}하는 것이 더 좋습니까?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "스페이드가 없으면 버튼의 주요 {{t:bluff|블러프}}인 빗나간 {{t:flush-draw|플러시 드로우}}(예: 스페이드 10-J)를 블로킹하지 않습니다. 버튼의 {{t:range|레인지}}에 내가 이기는 {{t:bluff|블러프}}가 더 많이 남습니다." }
      - { text: "[[Kc Ts]]", why: "스페이드 10은 버튼이 {{t:bluff|블러프}}에 쓰는 빗나간 {{t:draw|드로우}}(예: 스페이드 J-10) 일부를 없앱니다. 버튼에게 상대적으로 밸류가 더 많이 남으므로 {{t:call|콜}}이 더 나쁩니다." }
      - { text: "차이 없음", why: "쇼다운에서의 강도는 같지만, 내 핸드의 스페이드가 버튼의 {{t:bluff|블러프}}를 블로킹합니다. 그러면 실제로 상대하는 핸드가 달라집니다." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "리버에서 세 번째 하트가 나왔습니다. {{t:check|체크}}했고, 버튼이 {{t:pot|팟}} 전체를 {{t:bet|베팅}}합니다. 9 {{t:pair|페어}}를 들고 있습니다. 다음 두 핸드 중 어느 쪽으로 {{t:call|콜}}하는 것이 더 좋습니까?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "하트 A는 버튼의 가장 강한 {{t:value|밸류}} 핸드 중 하나인 A 하이 {{t:flush|플러시}}를 블로킹합니다. 상대의 밸류를 블로킹하면 상대 베팅 중 {{t:bluff|블러프}}가 더 많이 남습니다." }
      - { text: "[[Ad 9c]]", why: "같은 {{t:pair|페어}}지만 어떤 {{t:flush|플러시}}도 블로킹하지 않습니다. 버튼은 나를 이기는 플러시를 모두 가지고 있습니다." }
      - { text: "차이 없음", why: "쇼다운에서 두 핸드의 강도는 같지만, 하트 A는 버튼의 {{t:value|밸류}} 핸드 일부를 없앱니다." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "스페이드는 들어오지 않았습니다. 리버에서 {{t:check|체크}}했고, 버튼이 {{t:pot|팟}}의 절반을 {{t:bet|베팅}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|폴드}}합니다", correct: true, why: "가장 높은 카드가 7뿐입니다. 버튼의 {{t:bluff|블러프}} 대부분(스페이드를 든 Q, 스페이드를 든 J)에도 지므로 블러프 캐처가 아닙니다. 다른 핸드로 방어합니다." }
      - { text: "가격이 좋으므로 {{t:call|콜}}합니다", why: "가격({{n:eq.bet-half}})이 좋아도, {{t:bluff|블러프}}를 포함해 거의 모든 핸드에 지는 핸드에는 도움이 되지 않습니다." }
      - { text: "{{t:bluff|블러프}}로 {{t:raise|레이즈}}합니다", why: "리버에서 {{t:bluff|블러프}}로 {{t:raise|레이즈}}하는 것은 고급이면서 위험한 플레이입니다. 가망 없는 핸드는 폴드하는 것이 더 간단하고 더 좋습니다." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "리버. 상대가 {{t:pot|팟}}의 절반을 {{t:bet|베팅}}합니다. {{t:mdf|MDF}}는 {{n:mdf.bet-half}}입니다. 어떤 핸드를 가장 먼저 방어합니까?"
    options:
      - { text: "가장 좋은 블러프 캐처: {{t:bluff|블러프}}에 이기고 좋은 {{t:blocker|블로커}}를 가진 핸드", correct: true, why: "{{t:bluff|블러프}}에 이기는 핸드로 방어하고, 비슷한 강도의 핸드 중에서는 상대의 밸류를 블로킹하면서 상대의 {{t:bluff|블러프}}는 블로킹하지 않는 핸드를 고릅니다. {{t:bluff|블러프}}에도 지는 핸드는 {{t:fold|폴드}}합니다." }
      - { text: "{{t:range|레인지}}에서 무작위로 고른 {{n:mdf.bet-half}}", why: "{{t:mdf|MDF}}는 얼마나 방어할지를 알려 줄 뿐, 무엇으로 방어할지는 알려 주지 않습니다. 무작위로 방어하면 절대 이길 수 없는 핸드로 돈을 내게 됩니다." }
      - { text: "{{t:value|밸류}} 핸드만", why: "그러면 너무 적게 방어하게 되고, 상대는 아무 카드로나 {{t:bluff|블러프}}해서 이익을 냅니다. {{t:mdf|MDF}}를 채우려면 가장 좋은 블러프 캐처를 더합니다." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "리버에서 블러프 캐처로 {{t:raise|레이즈}}하지 않고 {{t:call|콜}}하는 이유는 무엇입니까?"
    options:
      - { text: "{{t:raise|레이즈}}하면 {{t:bluff|블러프}}는 {{t:fold|폴드}}하고 더 좋은 핸드만 돈을 내기 때문입니다", correct: true, why: "이 핸드는 오직 {{t:bluff|블러프}}에만 이깁니다. {{t:raise|레이즈}}는 바로 그 핸드들을 밀어내고, 내가 지는 핸드만 남깁니다." }
      - { text: "리버에서는 {{t:raise|레이즈}}가 허용되지 않기 때문입니다", why: "허용됩니다. 다만 블러프 캐처로 {{t:raise|레이즈}}하면 {{t:fold|폴드}}하지 않을 핸드를 상대로 그 핸드를 {{t:bluff|블러프}}로 바꾸는 셈입니다." }
      - { text: "{{t:call|콜}}이 항상 더 싸기 때문입니다", why: "비용의 문제가 아니라 누가 핸드에 남느냐의 문제입니다. {{t:raise|레이즈}} 후에는 나를 이기는 핸드만 남습니다." }
---
이번에는 반대편에 앉습니다. 상대가 리버에서 베팅하고, 나는 중간 강도의 핸드를 들고 있습니다. 대부분 이 핸드는 **블러프 캐처**입니다. 즉, 상대의 모든 {{t:value|밸류}} 핸드에는 지지만 상대의 {{t:bluff|블러프}}에는 이기는 핸드입니다.

## 내 에퀴티는 상대의 {{t:bluff|블러프}}입니다

블러프 캐처는 정확히 상대가 {{t:bluff|블러프}}할 때 이깁니다. 따라서 블러프 캐처의 에퀴티는 상대 베팅 중 {{t:bluff|블러프}}가 차지하는 비율입니다. 이 비율이 M2에서 배운 필요 에퀴티보다 크면 {{t:call|콜}}합니다.

| 상대의 베팅 | 필요 에퀴티 (최소 {{t:bluff|블러프}} 비율) |
|---|---|
| {{t:pot|팟}}의 1/3 | {{n:eq.bet-third}} |
| {{t:pot|팟}}의 1/2 | {{n:eq.bet-half}} |
| {{t:pot|팟}} 전체 | {{n:eq.bet-pot}} |

상대가 이전 레슨과 정확히 같은 비율로 {{t:bluff|블러프}}하면({{t:pot|팟}} 전체 베팅일 때 {{n:bluff.share.bet-pot}}) {{t:call|콜}}은 본전입니다. 더 자주 {{t:bluff|블러프}}하면 {{t:call|콜}}하고, 덜 자주 하면 {{t:fold|폴드}}합니다. 이 숫자는 레이크를 제외한 값이며, 레이크가 있으면 필요 에퀴티가 조금 올라갑니다.

## 얼마나, 그리고 무엇으로 방어할까

얼마나 방어할지는 M6의 {{t:mdf|MDF}}가 알려 줍니다. {{t:pot|팟}}의 절반 베팅에는 {{t:range|레인지}}의 약 **{{n:mdf.bet-half}}**입니다. 이 레슨은 두 번째 질문, 즉 **어떤 핸드로** 방어할지에 답합니다. 가장 좋은 블러프 캐처로 {{t:call|콜}}합니다. 비슷한 강도의 핸드 중에서는 더 좋은 {{t:blocker|블로커}}를 가진 핸드를 고르고, {{t:bluff|블러프}}에도 지는 핸드는 {{t:fold|폴드}}합니다.

더 좋은 블러프 캐처는:

- 더 많은 {{t:bluff|블러프}}에 이깁니다({{t:pair|페어}}가 하이 카드만 있는 것보다 좋습니다),
- 상대의 {{t:value|밸류}} 핸드를 블로킹합니다,
- 상대의 {{t:bluff|블러프}}는 블로킹하지 않습니다.

## {{t:call|콜}}할 때의 {{t:blocker|블로커}}

이전 레슨을 거울에 비춘 것과 같습니다. 스페이드가 들어오지 않으면 상대는 빗나간 {{t:flush-draw|플러시 드로우}}로 {{t:bluff|블러프}}합니다. 내 핸드의 스페이드는 상대의 {{t:bluff|블러프}} 일부를 없애므로 {{t:call|콜}}이 더 나빠집니다. {{t:flush|플러시}}가 완성되었다면, 내 핸드에 있는 그 무늬의 A가 상대의 가장 강한 플러시를 없애므로 {{t:call|콜}}이 더 좋아집니다.

## 블러프 캐처로 레이즈하지 마세요

{{t:raise|레이즈}}하면 {{t:bluff|블러프}}는 {{t:fold|폴드}}하고, 나를 이기는 핸드만 돈을 냅니다. 블러프 캐처로는 {{t:call|콜}}하거나 {{t:fold|폴드}}합니다.

:::note 상대가 {{t:bluff|블러프}}를 거의 하지 않을 때
이 원칙은 상대가 대체로 균형에 가깝게 {{t:bluff|블러프}}한다고 가정합니다. 리버에서 큰 베팅으로 {{t:bluff|블러프}}하는 일이 드문 플레이어를 상대로는 {{t:mdf|MDF}}가 가리키는 것보다 더 자주 {{t:fold|폴드}}합니다. {{t:bluff|블러프}}가 가격이 요구하는 것보다 적으면 {{t:call|콜}}은 손해이기 때문입니다(이 레슨의 계산). {{t:blocker|블로커}}에 따라 블러프 캐처를 고르는 원칙은 교육 자료와 솔버 분석(리버 플레이, {{t:blocker|블로커}})에서 나온 것입니다. 블러프 캐처(어차피 {{t:bluff|블러프}}에만 이기는 핸드) 사이에서 솔버는 핸드 강도 자체보다 {{t:blocker|블로커}}를 더 기준으로 {{t:call|콜}}을 고릅니다.
:::
