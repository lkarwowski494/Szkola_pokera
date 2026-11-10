---
id: m8.l2
module: m8
order: 2
title: "블러프는 얼마나 해야 할까"
sub: "벳 크기에 따른 블러프 비율"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "리버입니다. {{t:pot|팟}}은 {{n:ex.pot}}입니다. {{t:pot|팟}} 전체를 벳합니다: {{n:ex.bet.pot}}. 당신의 {{t:range|레인지}}는 매우 강한 핸드와 {{t:bluff|블러프}}로 이루어져 있습니다. 상대가 당신을 이용할 수 없으려면 벳 중 어느 정도가 {{t:bluff|블러프}}여야 할까요? 퍼센트로 숫자를 입력하세요."
    answer: bluff.share.bet-pot
    explanation: "{{t:bluff|블러프}} 비율 = 벳 ÷ ({{t:pot|팟}} + 2·벳) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. 벳 세 번 중 한 번이 {{t:bluff|블러프}}입니다. 그러면 {{t:bluff|블러프}}에만 이기는 상대의 핸드는 {{t:call|콜}}로도, {{t:fold|폴드}}로도 이득을 보지 못합니다."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "리버입니다. {{t:pot|팟}}은 {{n:ex.pot}}입니다. {{t:pot|팟}}의 절반을 벳합니다: {{n:ex.bet.half}}. 균형 상태에서 당신의 벳 중 {{t:bluff|블러프}}의 비율은 얼마입니까? 퍼센트로 숫자를 입력하세요."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. 더 작은 벳은 상대에게 더 좋은 가격을 주므로, {{t:pot|팟}} 전체 벳({{n:bluff.share.bet-pot}})보다 {{t:bluff|블러프}}가 적습니다."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "리버입니다. {{t:pot|팟}}은 {{n:ex.pot}}이고, 벳은 {{n:ex.bet.three-quarters}}입니다. 균형 상태에서 당신의 벳 중 {{t:bluff|블러프}}의 비율은 얼마입니까?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. 상대가 {{t:call|콜}}하는 데 필요한 에퀴티와 같은 숫자입니다." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "이것은 알파입니다. 가능성이 없는 단일 {{t:bluff|블러프}}가 얼마나 자주 성공해야 하는지를 나타냅니다. {{t:range|레인지}}에서 {{t:bluff|블러프}}의 비율은 분모에 두 벳을 모두 넣어 계산합니다: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "이것은 {{t:mdf|MDF}}, 즉 상대가 얼마나 방어해야 하는지입니다. 당신의 {{t:bluff|블러프}} 비율은 {{n:bluff.share.bet-three-quarters}}입니다." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "리버입니다. {{t:pot|팟}}은 {{n:ex.pot}}입니다. {{t:pot|팟}}보다 많이 벳합니다: {{n:ex.bet.overbet}}. 균형 상태에서 당신의 벳 중 {{t:bluff|블러프}}의 비율은 얼마입니까?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. {{t:overbet|오버벳}}, 즉 {{t:pot|팟}} 전체보다 큰 {{t:bet|벳}}은 상대에게 가장 나쁜 가격을 주므로 {{t:bluff|블러프}}를 가장 많이 넣을 수 있지만, 그래도 절반보다는 적습니다." }
      - { text: "{{n:alpha.bet-overbet}}", why: "이 크기에 대한 알파입니다. 단일 {{t:bluff|블러프}}가 이득이 되려면 상대가 얼마나 자주 {{t:fold|폴드}}해야 하는지를 나타냅니다. {{t:range|레인지}}에서 {{t:bluff|블러프}}의 비율은 {{n:bluff.share.bet-overbet}}입니다." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "이것은 {{t:pot|팟}} 전체 벳에서의 {{t:bluff|블러프}} 비율입니다. {{n:ex.bet.overbet}} 벳에서는 더 많습니다: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "리버에서 어느 벳일 때 {{t:range|레인지}}에 {{t:bluff|블러프}}가 더 많습니까? {{t:pot|팟}}의 1/3인가요, {{t:pot|팟}} 전체인가요?"
    options:
      - { text: "{{t:pot|팟}} 전체", correct: true, why: "{{t:pot|팟}}의 1/3에서는 {{t:bluff|블러프}}가 벳의 약 {{n:bluff.share.bet-third}}, {{t:pot|팟}} 전체에서는 약 {{n:bluff.share.bet-pot}}입니다. 더 큰 벳은 상대에게 더 나쁜 가격을 주므로, 상대의 {{t:call|콜}}이 이득이 되려면 {{t:bluff|블러프}}가 더 많아야 합니다." }
      - { text: "{{t:pot|팟}}의 1/3", why: "반대입니다. 작은 벳은 상대에게 좋은 가격을 줍니다. {{t:call|콜}}하려면 당신의 벳 중 {{t:bluff|블러프}}가 약 {{n:bluff.share.bet-third}}만 있으면 됩니다. {{t:bluff|블러프}}가 더 많으면 상대는 이익을 보며 지불할 것입니다." }
      - { text: "같습니다", why: "{{t:bluff|블러프}} 비율은 크기에 따라 달라집니다: {{t:pot|팟}}의 1/3에서는 약 {{n:bluff.share.bet-third}}, {{t:pot|팟}} 전체에서는 약 {{n:bluff.share.bet-pot}}입니다." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "리버에서 {{t:pot|팟}} 전체를 벳합니다. 알파는 {{n:alpha.bet-pot}}, {{t:bluff|블러프}} 비율은 {{n:bluff.share.bet-pot}}입니다. 각 숫자는 무엇을 말해 줍니까?"
    options:
      - { text: "알파: 상대가 얼마나 자주 {{t:fold|폴드}}해야 하는지, 비율: 벳 중 어느 부분이 {{t:bluff|블러프}}인지", correct: true, why: "알파는 가능성이 없는 단일 {{t:bluff|블러프}}에 관한 것입니다. 상대가 {{n:alpha.bet-pot}}의 경우에 {{t:fold|폴드}}하면 본전이 됩니다. {{t:bluff|블러프}} 비율은 당신 {{t:range|레인지}}의 구성을 나타냅니다. 상대의 {{t:call|콜}}이 본전이 되도록 벳 세 번 중 한 번이 {{t:bluff|블러프}}입니다." }
      - { text: "같은 것을 가리키는 두 이름이고, 둘 중 하나가 잘못 계산되었습니다", why: "둘 다 올바르게 계산되었습니다: 알파 = 벳 ÷ ({{t:pot|팟}} + 벳), {{t:bluff|블러프}} 비율 = 벳 ÷ ({{t:pot|팟}} + 2·벳). 서로 다른 질문에 답합니다." }
      - { text: "알파: {{t:range|레인지}}에 {{t:bluff|블러프}}가 얼마나 있는지, 비율: 상대가 얼마나 자주 {{t:fold|폴드}}하는지", why: "반대입니다. 알파는 단일 {{t:bluff|블러프}}에 대한 상대의 {{t:fold|폴드}} 기준점이고, {{t:bluff|블러프}} 비율은 당신의 벳 {{t:range|레인지}} 구성입니다." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "당신의 벳에서 {{t:bluff|블러프}} 비율을 상대가 {{t:call|콜}}하는 데 필요한 에퀴티와 같은 공식으로 계산하는 이유는 무엇입니까?"
    options:
      - { text: "{{t:bluff|블러프}}를 잡는 상대의 핸드는 정확히 당신이 {{t:bluff|블러프}}할 때 이기기 때문입니다", correct: true, why: "상대의 핸드는 당신의 밸류에는 지고 {{t:bluff|블러프}}에는 이기므로, 그 에퀴티는 {{t:bluff|블러프}} 비율과 같습니다. 이 비율이 필요한 에퀴티와 같으면 {{t:call|콜}}은 본전이 되고, 상대는 콜로도 폴드로도 당신을 이용할 수 없습니다." }
      - { text: "우연입니다. 공식이 비슷해 보일 뿐입니다", why: "우연이 아닙니다. {{t:bluff|블러프}}를 잡는 핸드의 에퀴티가 그 가격과 같아지도록 {{t:bluff|블러프}} 비율을 정하는 것입니다." }
      - { text: "상대가 항상 정확히 필요한 만큼의 에퀴티를 가지고 있기 때문입니다", why: "상대의 에퀴티는 당신의 벳에 따라 정해집니다. 본전이 되도록 {{t:bluff|블러프}}의 수를 정하는 것은 당신입니다." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "리버에서 {{t:pot|팟}} 전체를 벳하는데, 당신의 벳 중 {{t:bluff|블러프}}가 {{n:bluff.share.bet-pot}}이 아니라 절반입니다. 주의 깊은 상대는 무엇을 할 수 있습니까?"
    options:
      - { text: "{{t:bluff|블러프}}를 잡는 약한 핸드로도 더 자주 {{t:call|콜}}합니다", correct: true, why: "상대의 {{t:call|콜}}은 절반의 경우에 이기지만, 필요한 것은 {{n:eq.bet-pot}}뿐입니다. 더 많이 지불할수록 밸류에 잃는 것보다 당신의 {{t:bluff|블러프}}로 버는 것이 더 많습니다." }
      - { text: "더 자주 {{t:fold|폴드}}합니다", why: "폴드하면 {{t:bluff|블러프}}를 가진 당신에게 {{t:pot|팟}}을 내줍니다. {{t:bluff|블러프}}가 너무 많으면 상대는 {{t:call|콜}}해서 이익을 봅니다." }
      - { text: "아무것도 하지 않습니다. 비율은 중요하지 않습니다", why: "중요합니다. {{t:bluff|블러프}}가 너무 많으면 {{t:bluff|블러프}}를 잡는 핸드로 하는 모든 {{t:call|콜}}이 상대에게 이득이 됩니다." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "리버에서 거의 {{t:value|밸류}}로만 {{t:pot|팟}} 전체를 벳하고, {{t:bluff|블러프}}는 거의 없습니다. 주의 깊은 상대는 무엇을 할 수 있습니까?"
    options:
      - { text: "{{t:bluff|블러프}}에만 이기는 모든 핸드를 {{t:fold|폴드}}합니다", correct: true, why: "{{t:bluff|블러프}}가 {{n:bluff.share.bet-pot}}보다 적으면, {{t:bluff|블러프}}를 잡는 핸드로 하는 {{t:call|콜}}은 손해입니다. 그러면 상대는 더 좋은 핸드로만 지불하고, 당신의 {{t:value|밸류}} 벳은 보상을 받는 일이 줄어듭니다." }
      - { text: "더 자주 {{t:call|콜}}합니다", why: "{{t:call|콜}}하면 주로 당신의 밸류에 지불하게 됩니다. 당신의 {{t:range|레인지}}에 {{t:bluff|블러프}}가 없으면 {{t:fold|폴드}}하는 편이 낫습니다." }
      - { text: "모든 핸드로 {{t:raise|레이즈}}합니다", why: "더 좋은 핸드 없이 당신의 강한 핸드에 {{t:raise|레이즈}}하는 것은 확실한 손해입니다. 상대는 그냥 더 자주 {{t:fold|폴드}}합니다." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "리버에서 밸류와 {{t:bluff|블러프}}로 이루어진 {{n:bluff.ex.range}}개 {{t:combo|콤보}}의 {{t:range|레인지}}로 {{t:pot|팟}} 전체를 벳합니다. 균형 상태에서 그중 {{t:bluff|블러프}}는 몇 개입니까?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{t:bluff|블러프}} {{n:bluff.ex.bluffs}}개, {{t:value|밸류}} {{t:combo|콤보}} {{n:bluff.ex.value}}개입니다. {{t:value|밸류}} 핸드 두 개당 {{t:bluff|블러프}} 하나입니다." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "알파({{n:alpha.bet-pot}})로 계산하면 이렇게 나옵니다. 알파는 단일 {{t:bluff|블러프}}의 {{t:fold|폴드}} 기준점이지, {{t:range|레인지}}에서 {{t:bluff|블러프}}의 비율이 아닙니다." }
      - { text: "{{n:bluff.ex.value}}", why: "이것은 {{t:value|밸류}} {{t:combo|콤보}}의 수입니다. {{t:bluff|블러프}}는 그 절반입니다: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "리버에서 {{t:pot|팟}} 전체 벳에 쓸 {{t:bluff|블러프}}가 몇 개 필요합니다. 어떤 핸드를 고릅니까?"
    options:
      - { text: "가장 약한 핸드, 예를 들어 맞지 않은 {{t:straight|스트레이트}} {{t:draw|드로우}}나 가능성 없는 하이 카드", correct: true, why: "쇼다운에서 가능성이 없는 핸드는 {{t:bluff|블러프}}가 실패해도 잃을 것이 없습니다. {{t:check|체크}}하더라도 어차피 졌을 것입니다. 그래서 이 핸드로 {{t:bluff|블러프}}합니다." }
      - { text: "중간 {{t:pair|페어}}", why: "중간 {{t:pair|페어}}는 {{t:check|체크}} 후에 자주 이깁니다. 이 핸드로 {{t:bluff|블러프}}하면 더 약한 핸드는 {{t:fold|폴드}}하고 더 강한 핸드는 지불합니다. 쇼다운에서의 승리를 내주는 셈입니다." }
      - { text: "비율만 맞으면 아무 핸드나", why: "비율이 전부는 아닙니다. 쇼다운에서 이길 핸드로 하는 {{t:bluff|블러프}}는 가능성 없는 핸드로 하는 {{t:bluff|블러프}}보다 비용이 더 큽니다." }
---
첫 번째 레슨에서는 {{t:value|밸류}}로 벳했습니다. 하지만 리버에서 강한 핸드로만 벳한다면, 주의 깊은 상대는 더 강한 핸드가 아닌 한 모두 폴드할 것이고 당신의 벳은 거의 보상을 받지 못할 것입니다. {{t:bluff|블러프}}가 있기 때문에 상대가 지불할 가치가 생깁니다.

## {{t:polarized|폴라라이즈드}} {{t:range|레인지}}

리버에서 {{t:in-position|인 포지션}}일 때는 흔히 **{{t:polarized|폴라라이즈드}} {{t:range|레인지}}**로 벳합니다(M7에서처럼). 즉 매우 강한 {{t:value|밸류}} 핸드와 {{t:bluff|블러프}}로 구성되고, 중간 핸드는 없습니다(중간 핸드는 첫 번째 레슨에서처럼 {{t:check|체크}}합니다). 리버에서 {{t:bluff|블러프}}는 쇼다운에서 가능성이 없는 핸드입니다. 그러면 상대에게는 당신의 밸류에는 지지만 {{t:bluff|블러프}}에는 이기는 핸드가 많습니다. 이것이 **블러프 캐처**({{t:bluff|블러프}}를 잡는 핸드)입니다.

## {{t:bluff|블러프}}는 몇 개

{{t:bluff|블러프}}의 수는 상대의 블러프 캐처가 {{t:call|콜}}하든 {{t:fold|폴드}}하든 본전이 되도록 정합니다:

```formula
블러프 비율 = 벳 ÷ (팟 + 2·벳)
```

이것은 M2에서 배운 {{t:call|콜}}에 필요한 에퀴티 공식과 같습니다. 우연이 아닙니다. 블러프 캐처는 정확히 당신이 {{t:bluff|블러프}}할 때 이기므로, 그 에퀴티는 당신의 {{t:bluff|블러프}} 비율입니다. {{t:pot|팟}} 전체 벳에서는 {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, 즉 벳 세 번 중 한 번이 {{t:bluff|블러프}}입니다.

## 벳이 클수록 {{t:bluff|블러프}}도 많아집니다

| 벳 | {{t:bluff|블러프}} 비율 | 알파(M6) |
|---|---|---|
| {{t:pot|팟}}의 1/3 | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| {{t:pot|팟}}의 1/2 | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| {{t:pot|팟}}의 3/4 | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| {{t:pot|팟}} 전체 | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| {{t:pot|팟}}의 1.5배 | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

더 큰 벳은 상대에게 더 나쁜 가격을 주므로 {{t:bluff|블러프}}를 더 많이 넣을 수 있습니다. 작은 벳은 몇 개밖에 감당하지 못합니다.

## {{t:bluff|블러프}} 비율은 알파가 아닙니다

M6의 알파 = 벳 ÷ ({{t:pot|팟}} + 벳)은 가능성 없는 **단일** {{t:bluff|블러프}}가 본전이 되려면 상대가 얼마나 자주 {{t:fold|폴드}}해야 하는지를 알려 줍니다. {{t:bluff|블러프}} 비율 = 벳 ÷ ({{t:pot|팟}} + 2·벳)은 **벳 {{t:range|레인지}} 전체** 중 어느 부분이 {{t:bluff|블러프}}인지를 알려 줍니다. {{t:pot|팟}} 전체 벳에서 {{t:bluff|블러프}}는 {{n:alpha.bet-pot}}보다 많은 {{t:fold|폴드}}가 필요하지만, {{t:range|레인지}}에서 {{t:bluff|블러프}}의 비율은 {{n:bluff.share.bet-pot}}입니다. 두 번째 분모에 벳이 하나 더 있는 이유는 상대의 {{t:call|콜}} 가격을 계산하기 때문입니다.

## 무엇으로 {{t:bluff|블러프}}할까

{{t:bluff|블러프}}에는 **가장 약한 핸드**를 고릅니다. 예를 들어 맞지 않은 {{t:straight|스트레이트}} {{t:draw|드로우}}나 가능성 없는 하이 카드입니다(맞지 않은 {{t:flush|플러시}}는 {{t:blocker|블로커}} 레슨에서 다룹니다). 이런 핸드는 {{t:check|체크}}해도 어차피 질 것이므로, {{t:bluff|블러프}}가 실패해도 잃는 것이 없습니다. 쇼다운 밸류가 있는 핸드는 {{t:check|체크}}합니다.

:::note 이것은 균형점이지, 모든 상대에게 통하는 처방이 아닙니다
이 비율은 잘하는 상대로부터 당신을 보호합니다. 특정 플레이어를 상대로는 이 비율에서 벗어날 수 있으며, 이는 마이크로 스테이크 {{t:exploit|익스플로잇}} 모듈(M10)에서 다룹니다. {{t:bluff|블러프}} 비율 공식은 단순화된 모델에서의 계산입니다: {{t:bluff|블러프}}를 잡는 핸드에 맞선 {{t:polarized|폴라라이즈드}} {{t:range|레인지}}(게임 이론의 장난감 모델). 가장 약한 핸드로 {{t:bluff|블러프}}하라는 권장은 교육 자료와 솔버 분석에서 나온 것입니다.
:::
