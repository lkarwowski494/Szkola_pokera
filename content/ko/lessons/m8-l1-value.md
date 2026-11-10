---
id: m8.l1
module: m8
order: 1
title: "리버 밸류 벳"
sub: "더 약한 핸드가 지불할 때 벳하세요"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "리버: 모든 카드가 이미 {{t:board|보드}}에 깔려 있습니다. 애초에 왜 벳을 할까요?"
    options:
      - { text: "더 약한 핸드가 지불하게 하거나 더 강한 핸드가 {{t:fold|폴드}}하게 하려고", correct: true, why: "리버에는 더 이상 공개될 카드가 없으므로 벳의 목적은 두 가지뿐입니다: 밸류(더 약한 핸드가 지불함) 또는 {{t:bluff}}(더 강한 핸드가 {{t:fold|폴드}}함). 둘 중 어느 것도 하지 못하는 벳은 비용만 듭니다." }
      - { text: "상대가 카드를 받아 핸드를 완성할 기회를 빼앗으려고", why: "그건 플롭과 턴에서 벳하는 이유입니다. 리버에서는 상대가 더 이상 아무것도 받지 못합니다: 상대의 핸드는 이미 완성되었습니다." }
      - { text: "내 핸드가 가장 강한지 확인하려고", why: "벳은 질문이 아닙니다. 중간 핸드로 벳하면 더 약한 핸드는 보통 {{t:fold|폴드}}하고 더 강한 핸드가 지불하므로, 자기 돈을 내고 “알아내는” 셈입니다. {{t:check|체크}}하면 공짜로 알 수 있습니다." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "리버, 상대가 {{t:check|체크}}합니다. 상대가 당신의 벳에 {{n:value.ex.calls}}번 지불할 것으로 추정합니다: {{n:value.ex.many}}번은 더 약한 핸드로, {{n:value.ex.few}}번은 더 강한 핸드로. 상대는 당신에게 {{t:raise|레이즈}}할 수 없습니다. 벳합니까?"
    options:
      - { text: "네, {{t:value|밸류}} 벳입니다", correct: true, why: "벳을 {{n:value.ex.many}}번 이기고 {{n:value.ex.few}}번 집니다: 순이익은 {{n:value.ex.net}}벳입니다. {{t:call|콜}} 중 더 약한 핸드가 {{n:value.threshold}} 초과이므로 벳이 {{t:check}}보다 더 많이 법니다." }
      - { text: "아니요, 가끔 더 강한 핸드로 지불하니까요", why: "더 강한 핸드는 항상 일정 비율로 지불합니다. 중요한 것은 더 약한 핸드의 {{t:call|콜}}이 더 강한 핸드의 콜보다 많은지입니다: 여기서는 {{n:value.ex.many}} 대 {{n:value.ex.few}}입니다." }
      - { text: "상대가 절대 더 강한 핸드를 갖고 있지 않을 때만", why: "그러면 너츠로만 벳하게 되어 많은 밸류를 놓칩니다. {{t:call|콜}} 중 더 약한 핸드가 {{n:value.threshold}} 초과이기만 하면 충분합니다." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "리버, 상대가 {{t:check|체크}}합니다. 상대는 당신의 벳에 {{n:value.ex.calls}}번 지불합니다: {{n:value.ex.few}}번은 더 약한 핸드로, {{n:value.ex.many}}번은 더 강한 핸드로. {{t:fold|폴드}}할 상대의 더 약한 핸드는 어차피 쇼다운에서 당신에게 집니다. 어떻게 하시겠습니까?"
    options:
      - { text: "{{t:check|체크}}합니다", correct: true, why: "벳은 {{n:value.ex.few}}번 이기고 {{n:value.ex.many}}번 집니다: 순손실은 {{n:value.ex.net}}벳입니다. {{t:check|체크}}하면 같은 더 약한 핸드를 상대로 {{t:pot|팟}}을 이기고, 더 강한 핸드에 추가로 지불하지도 않습니다." }
      - { text: "괜찮은 핸드가 있으니 벳합니다", why: "핸드의 강도만으로는 충분하지 않습니다. 중요한 것은 누가 지불하느냐입니다: 여기서는 {{t:call|콜}}의 대부분이 더 강한 핸드이므로 벳은 손해입니다." }
      - { text: "더 강한 핸드가 {{t:fold|폴드}}하도록 크게 벳합니다", why: "그건 쇼다운에서 자주 이기는 핸드로 하는 {{t:bluff}}입니다. 더 강한 핸드는 리버에서 좀처럼 {{t:fold|폴드}}하지 않고, {{t:check|체크}}하면 어차피 더 약한 핸드는 이깁니다." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "리버. 당신의 벳에 더 약한 핸드 {{n:value.ex.many}}개와 더 강한 핸드 {{n:value.ex.few}}개가 {{t:call|콜}}합니다. 이 {{n:value.ex.calls}}번의 {{t:call|콜}}에서 순수하게 몇 벳을 벌까요? 숫자를 입력하세요."
    answer: value.ex.net
    explanation: "더 약한 핸드의 {{t:call}} 하나는 이긴 벳 하나, 더 강한 핸드의 콜 하나는 진 벳 하나입니다: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. 더 약한 핸드를 상대로는 {{t:check|체크}}해도 {{t:pot|팟}}을 이기므로 벳만 계산합니다."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "버튼에서 {{t:open|오픈}}했고 {{t:big-blind}}가 {{t:call|콜}}했습니다. 플롭과 턴에서 벳했고 매번 {{t:call}}을 받았습니다. 리버에서 {{t:big-blind}}가 {{t:check|체크}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "{{t:value|밸류}} 벳합니다", correct: true, why: "최고 키커의 {{t:top-pair|탑 페어}}입니다. 두 {{t:street|스트리트}}를 {{t:call|콜}}한 상대에게는 더 약한 킹(KQ, KJ, KT)과 9 페어가 많고, 이 {{t:board|보드}}에는 {{t:draw|드로우}}가 적었습니다. 더 약한 핸드가 더 강한 핸드({{t:two-pair}}, 셋)보다 훨씬 자주 지불합니다. 보통 {{t:top-pair}}는 두 {{t:value|밸류 스트리트}}를 감당합니다(M9). 여기서는 상대가 더 약한 킹으로 지불하므로 세 번째 스트리트까지 벳합니다." }
      - { text: "상대가 셋일 수 있으니 {{t:check|체크}}합니다", why: "그럴 수는 있지만 드뭅니다. {{t:check|체크}}하면 상대가 지불했을 모든 더 약한 킹에게서 받을 벳을 잃습니다. 따져야 할 것은 누가 {{t:call|콜}}할지이지, 더 강한 핸드가 존재하는지가 아닙니다." }
      - { text: "상대가 블러프하도록 {{t:check|체크}}합니다", why: "두 번 {{t:call|콜}}한 상대는 주로 {{t:pair|페어}}를 갖고 있고, 당신이 {{t:check|체크}}한 뒤 좀처럼 {{t:bluff|블러프}}하지 않습니다. 상대의 더 약한 킹을 상대로 벳하는 편이 더 확실하게 법니다." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "버튼에서 {{t:open|오픈}}했고 {{t:big-blind}}가 {{t:call|콜}}했습니다. 플롭에서 C벳을 했고 {{t:call}}을 받았으며, 턴에서는 둘 다 {{t:check|체크}}했습니다. 리버에서 {{t:big-blind}}가 {{t:check|체크}}합니다. 어떻게 하시겠습니까?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|체크}}합니다", correct: true, why: "약한 키커의 {{t:second-pair|세컨드 페어}}는 빗나간 {{t:draw|드로우}}와 더 약한 {{t:pair|페어}}를 이기지만, 그런 핸드는 벳에 {{t:fold|폴드}}합니다. 지불하는 건 주로 킹과 더 강한 10입니다. {{t:check|체크}}하면 쇼다운을 공짜로 볼 수 있습니다." }
      - { text: "{{t:value|밸류}} 벳합니다", why: "누가 지불할까요? {{t:pair|페어}}가 없는 핸드는 {{t:fold|폴드}}하고, 킹과 더 강한 10은 {{t:call|콜}}합니다. {{t:call|콜}}의 대부분이 당신의 핸드보다 강할 것입니다." }
      - { text: "{{t:bluff}}로 크게 벳합니다", why: "당신의 핸드는 쇼다운에서 자주 이깁니다. {{t:bluff|블러프}}하면 그 승리를 내주게 됩니다: 더 약한 핸드는 어차피 {{t:fold|폴드}}했을 것이고, 킹은 좀처럼 {{t:fold|폴드}}하지 않습니다." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "버튼에서 {{t:open|오픈}}했고 {{t:big-blind}}가 {{t:call|콜}}했습니다. 플롭에서 C벳을 했고 {{t:call}}을 받았으며, 턴에서는 둘 다 {{t:check|체크}}했습니다. 리버에서 {{t:big-blind}}가 {{t:check|체크}}합니다. 10 키커의 {{t:top-pair|탑 페어}}를 갖고 있습니다. 어떤 핸드가 작은 벳에 지불하면서 당신의 핸드보다 약할까요?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "8 페어, 4 페어, 그리고 더 약한 키커의 퀸", correct: true, why: "이 핸드들은 플롭에서 콜했고 {{t:pair|페어}}를 갖고 있으므로 작은 벳에 자주 지불합니다. 더 강한 키커의 퀸, {{t:two-pair|투 페어}}, 셋, {{t:straight|스트레이트}}(A5, 65)에는 지지만, 더 약한 핸드의 {{t:call|콜}}이 더 많습니다." }
      - { text: "{{t:pair|페어}}가 없는 핸드", why: "{{t:pair|페어}}가 없는 핸드는 리버 벳에 좀처럼 지불하지 않습니다. 가끔 에이스 하이가 지불하지만, 여기서는 더 약한 {{t:pair|페어}}가 훨씬 많습니다." }
      - { text: "없습니다, 더 강한 핸드만 지불합니다", why: "지나치게 신중합니다: {{t:big-blind}}는 퀸보다 낮은 {{t:pair|페어}}를 많이 방어합니다. 턴에서 {{t:check|체크}}된 뒤 상대의 {{t:range}}에는 그런 핸드가 꽤 많습니다." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "같은 상황입니다: 10 키커의 {{t:top-pair|탑 페어}}를 갖고 있고, 리버에서 {{t:big-blind}}가 체크합니다. {{t:pot|팟}}은 {{n:ex.pot}}입니다. 어떻게 하시겠습니까?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "{{n:ex.bet.quarter}} 벳, 즉 {{t:pot|팟}}의 1/4", correct: true, why: "씬 밸류: 지불하는 핸드의 절반을 조금 넘게 이깁니다. 작은 벳에는 8 페어, 4 페어, 더 약한 퀸이 {{t:call|콜}}하므로 더 약한 핸드의 {{t:call|콜}}이 더 강한 핸드의 콜보다 여전히 많습니다." }
      - { text: "{{n:ex.bet.pot}} 벳, 즉 {{t:pot|팟}} 전체", sizeError: true, why: "액션은 맞지만 사이즈가 틀렸습니다: {{t:pot|팟}} 사이즈 벳에는 8 페어와 4 페어가 {{t:fold|폴드}}하고, 주로 더 강한 퀸, {{t:two-pair}}, 셋이 지불합니다. 그러면 {{t:call|콜}}의 대부분이 당신보다 강합니다. 씬 밸류는 작게 벳합니다." }
      - { text: "{{t:check|체크}}합니다", why: "밸류를 놓칩니다: 상대에게는 작은 벳에 지불할 더 낮은 {{t:pair|페어}}가 많습니다. {{t:check|체크}}하면 그 돈을 내주게 됩니다." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "친구가 말합니다: “리버에서 중간 {{t:pair|페어}}면 내가 어디쯤인지 확인하려고 벳해.” 이 생각의 문제는 무엇일까요?"
    options:
      - { text: "더 약한 핸드는 {{t:fold|폴드}}하고 더 강한 핸드는 지불합니다", correct: true, why: "그런 벳을 하면 당신이 이기는 핸드는 {{t:fold|폴드}}하고, 당신이 지는 핸드는 지불하거나 {{t:raise|레이즈}}합니다. {{t:position|포지션}}이 있으면 상대가 쇼다운에서 카드를 보여 주므로, {{t:check|체크}}하면 정보를 공짜로 얻습니다." }
      - { text: "문제없습니다, 정보를 얻는 좋은 방법입니다", why: "여기서 정보의 대가는 보통 지는 벳 하나입니다. {{t:check|체크}}하면 추가로 지불하지 않고 상대의 핸드를 볼 수 있습니다." }
      - { text: "벳이 더 커야 합니다", why: "벳이 커지면 상황이 더 나빠집니다: 더 약한 핸드가 더 많이 {{t:fold|폴드}}하고, 더 강한 핸드는 여전히 지불합니다." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "{{t:flush-draw}}가 완성되지 않았습니다. 리버에서 벳을 고려하고 있습니다. 이건 어떤 벳일까요?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|블러프}}", correct: true, why: "가장 높은 카드가 퀸뿐입니다. 당신에게 {{t:call|콜}}하는 핸드 중 더 약한 핸드는 없으므로, 벳은 상대가 {{t:fold|폴드}}할 때만 이길 수 있습니다. 이것은 {{t:bluff}}입니다({{t:bluff|블러프}} 선택은 다음 레슨들에서 다룹니다)." }
      - { text: "{{t:value|밸류}} 벳", why: "{{t:value|밸류}} 벳은 더 약한 핸드가 지불해야 성립합니다. 퀸 하이만으로는 더 약한 핸드가 당신에게 {{t:call|콜}}하는 경우가 거의 없습니다." }
      - { text: "씬 밸류", why: "씬 밸류는 {{t:call|콜}}의 절반을 조금 넘게 이기는 핸드로 하는 벳입니다. 당신의 핸드는 거의 어떤 {{t:call|콜}}도 이기지 못합니다." }
---
리버에서는 모든 카드가 이미 {{t:board|보드}}에 깔려 있습니다. 누구도 더 이상 카드를 받지 않으므로 벳이 할 수 있는 일은 두 가지뿐입니다: 더 약한 핸드가 지불하게 하거나(**밸류**), 더 강한 핸드가 {{t:fold|폴드}}하게 하는 것(**{{t:bluff}}**)입니다. 이 레슨에서는 밸류를 다루고, 다음 레슨들에서 {{t:bluff|블러프}}와 콜을 다룹니다.

## 기준: {{t:call|콜}}의 절반 초과

{{t:position|포지션}}을 갖고 벳하고 상대가 {{t:call|콜}}하거나 {{t:fold|폴드}}하는 것만 가능할 때는, 상대가 지불할 핸드만 셉니다:

```formula
밸류 벳: 더 약한 핸드의 콜 > 더 강한 핸드의 콜
```

더 약한 핸드의 {{t:call}}은 각각 벳 하나를 이깁니다. 더 강한 핸드의 {{t:call}}은 각각 벳 하나를 잃습니다. 상대가 더 약한 핸드로 {{t:fold|폴드}}하면 {{t:check|체크}}했을 때와 같은 {{t:pot|팟}}을 이깁니다. 그래서 지불하는 핸드 중 **{{n:value.threshold}}** 초과가 당신의 핸드보다 약할 때 벳이 이익을 냅니다.

예: {{t:call|콜}} {{n:value.ex.calls}}번 중 {{n:value.ex.many}}번은 더 약한 핸드, {{n:value.ex.few}}번은 더 강한 핸드입니다. 순이익은 {{n:value.ex.net}}벳입니다. 비율이 반대라면 같은 만큼 잃습니다.

## 누가 지불할까

“내 핸드가 좋은가”가 아니라 “상대가 무엇으로 지불할까”를 묻습니다. 상대의 {{t:range}}를 하나씩 살펴보면 도움이 됩니다:

- {{t:pair|페어}}가 없는 핸드는 좀처럼 지불하지 않습니다. 가끔 {{t:bluff|블러프}}를 이기는 에이스 하이가 지불합니다.
- 더 낮은 {{t:pair|페어}}와 더 약한 키커는 작은 벳에 자주 지불합니다.
- 더 강한 핸드는 항상 지불하고, 가끔 {{t:raise|레이즈}}합니다.

상대가 당신에게 {{t:raise|레이즈}}할 수 있고 그때 당신이 {{t:fold|폴드}}해야 한다면 기준은 더 높아집니다: 더 약한 핸드의 {{t:call|콜}}이 확실히 더 많을 때만 벳이 이익을 냅니다.

## 씬 밸류: 작지만 돈을 받는 벳

씬 밸류(얇은 밸류)는 {{t:call|콜}}의 절반을 조금 넘게 이기는 핸드로 하는 벳입니다. 예를 들어 중간 키커의 {{t:top-pair|탑 페어}}입니다. 이 벳은 강한 핸드일 때보다 **작게**, 보통 {{t:pot|팟}}의 약 1/4–1/2로 합니다: 작은 벳에는 더 약한 {{t:pair|페어}}도 지불하지만, 큰 벳에는 {{t:fold|폴드}}해서 더 강한 핸드만 남습니다.

이것은 단순화한 설명입니다: 체크레이즈 위험이 없으면 솔버는 씬 밸류를 {{t:pot|팟}}의 약 1/4까지 작게 벳하고, 그 위험이 있으면 {{t:position|포지션}}을 갖고 있을 때 {{t:pot|팟}}의 1/2 아래로는 좀처럼 내려가지 않습니다.

## 중간 핸드는 {{t:check|체크}}합니다

{{t:in-position|인 포지션}}에서 중간 핸드, 예를 들어 {{t:second-pair|세컨드 페어}}를 갖고 있습니다. 상대의 더 약한 핸드는 벳에 {{t:fold|폴드}}하고, 더 강한 핸드는 지불합니다. 그러면 벳은 당신의 핸드를 {{t:bluff}}로 바꿔 버립니다. {{t:check|체크}}합니다: 더 강한 핸드에 추가로 지불하지 않고 쇼다운에서 더 약한 핸드를 이깁니다.

:::note 이 원칙의 출처
{{t:call|콜}}의 절반 초과라는 기준은 순수한 수학입니다({{t:in-position|인 포지션}} 벳, {{t:raise|레이즈}} 없음, 레이크 없음). 씬 밸류 사이즈와 중간 핸드의 {{t:check}}는 공개된 솔버 분석(스택이 더 짧은 {{t:tournament|토너먼트}})과 트레이닝 자료에서 나온 것입니다.
:::
