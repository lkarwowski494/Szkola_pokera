---
id: m11.l3
module: m11
order: 3
title: "ICM과 버블 팩터"
sub: "칩은 돈이 아닙니다"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "세 명이 남았고 두 자리까지 상금을 받습니다. 스택: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}} {{t:chips|칩}}. {{t:icm}}에 따르면 가장 작은 스택이 1위를 할 확률은 얼마입니까? 퍼센트로 숫자를 입력하세요."
    answer: m11.icm.a.chips3
    explanation: "1위 확률 = 스택 ÷ 전체 {{t:chips}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "스택은 같습니다({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). 큰 스택이 1위를 했습니다. 이제 가장 작은 스택이 2위를 할 확률은 얼마입니까?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "남은 두 명의 칩은 모두 {{n:m11.icm.a.rest1}} {{t:chips|칩}}이고, 그중 작은 스택의 칩은 {{n:m11.icm.a.s3}}입니다: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "이것은 전체 {{t:chips}}으로 계산한 1위 확률입니다. 우승자를 계산에서 빼면 남은 플레이어들의 {{t:chips}}만으로 나눕니다: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "이것은 가능한 두 우승자를 모두 고려한 {{t:short-stack|숏 스택}}의 2위 확률 합계입니다. 질문은 큰 스택이 우승한 경우를 묻고 있습니다." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|페이아웃}}: 1위는 {{t:prize-pool|상금 풀}}의 {{n:m11.icm.a.p1}}, 2위는 {{n:m11.icm.a.p2}}입니다. 스택은 {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}입니다. {{t:icm}}에 따르면 가장 작은 스택의 가치는 얼마입니까({{t:prize-pool|상금 풀}} 대비 퍼센트)? 숫자를 입력하세요."
    answer: m11.icm.a.eq3
    explanation: "1위 확률 {{n:m11.icm.a.chips3}}, 2위 확률 {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. 에퀴티 = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}. 보유한 {{t:chips|칩}} 비율 {{n:m11.icm.a.chips3}}보다 많습니다."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "큰 스택이 가진 {{t:chips|칩}}은 게임 내 전체 칩의 {{n:m11.icm.a.chips1}}입니다. {{t:icm}}에 따르면 돈으로는 얼마의 가치가 있습니까?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, 즉 {{t:chips|칩}} 비율보다 적습니다", correct: true, why: "큰 스택은 모든 {{t:chips}}을 딸 가능성이 있지만, 받을 수 있는 것은 최대 {{t:prize-pool|상금 풀}}의 {{n:m11.icm.a.p1}}입니다. 그래서 선두의 {{t:chips}}은 비율보다 가치가 낮고, {{t:short-stack|숏 스택}}의 칩은 가치가 더 높습니다({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, {{t:chips|칩}} 비율과 같습니다", why: "우승자가 {{t:prize-pool|상금 풀}} 전체를 가져간다면 그렇습니다. {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}} {{t:payout|페이아웃}}에서는 큰 스택의 {{t:chips|칩}} 하나하나의 가치가 더 낮습니다: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, 거의 확실히 우승하기 때문입니다", why: "1위 확률은 {{n:m11.icm.a.chips1}}뿐이고, 나머지 {{t:tournament-equity|토너먼트 에퀴티}}는 2위에서 나옵니다. 합계 {{n:m11.icm.a.eq1}}입니다." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|버블}}: 네 명이 남았고 세 자리까지 상금을 받습니다. 올인에 {{t:call|콜하면}} 질 때 잃는 것은 {{t:prize-pool|상금 풀}}의 {{n:m11.bf.loss}}, 이길 때 얻는 것은 {{n:m11.bf.gain}}입니다. 버블 팩터는 얼마입니까? 소수점 둘째 자리까지 숫자를 입력하세요."
    answer: m11.bf.value
    explanation: "버블 팩터 = 손실 ÷ 이득 = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. 지는 것의 타격이 이기는 것의 도움보다 거의 1.5배 큽니다."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "버블 팩터는 {{n:m11.bf.value}}입니다. 올인에 대한 {{t:call|콜}}이 이득이 되려면 에퀴티가 얼마나 필요합니까? 퍼센트로 숫자를 입력하세요."
    answer: m11.bf.req
    explanation: "필요 에퀴티 = BF ÷ (BF + 1), 즉 손실 ÷ (손실 + 이득) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. {{t:chips}} 기준 게임이라면 {{n:m11.bf.req-chips}}만 있어도 충분했을 것입니다."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:chips}} 기준 게임에서는 이 올인을 {{t:call|콜하는}} 데 {{n:m11.bf.req-chips}} 에퀴티면 충분하지만, {{t:icm}}에 따르면 필요한 에퀴티는 {{n:m11.bf.req}}입니다. 이 차이를 무엇이라고 합니까?"
    options:
      - { text: "{{t:risk-premium|리스크 프리미엄}}({{n:m11.bf.premium}})", correct: true, why: "{{t:risk-premium|리스크 프리미엄}}은 {{t:icm}}이 {{t:chips|칩}} 기준 가격 이상으로 요구하는 추가 에퀴티입니다: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "버블 팩터", why: "버블 팩터는 손실 대 이득의 비율입니다({{n:m11.bf.value}}). 이것으로 필요 에퀴티를 계산하며, {{t:chips}} 기준 게임과의 차이가 {{t:risk-premium}}입니다." }
      - { text: "폴드 에퀴티", why: "폴드 에퀴티는 상대의 {{t:fold|폴드}}로 얻는 이익입니다. 올인에 {{t:call|콜할}} 때는 폴드 에퀴티가 없습니다." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|버블}}, 레슨의 예시입니다. 당신의 핸드는 상대의 올인 {{t:range|레인지}}에 대해 약 {{n:m11.bf.example-eq}} 에퀴티를 가집니다. {{t:chips}} 기준 게임이라면 {{n:m11.bf.req-chips}}만 있으면 되므로 {{t:call|콜}}이 이득이었을 것입니다. 여기서는 어떻게 하겠습니까?"
    options:
      - { text: "{{t:fold|폴드합니다}}", correct: true, why: "{{t:icm}}에 따르면 여기서는 {{n:m11.bf.req}} 에퀴티가 필요합니다. 그보다 덜 자주 이기는 핸드는 {{t:chips|칩}}으로는 이득이라도 돈을 잃습니다." }
      - { text: "{{t:call|콜합니다}}. {{t:chips|칩}}으로는 이득이니까요", why: "{{t:payout|페이아웃}}이 있는 {{t:tournament|토너먼트}}에서는 {{t:chips}}이 아니라 돈이 중요합니다. 지면 잃는 것은 {{t:prize-pool|상금 풀}}의 {{n:m11.bf.loss}}이고, 이겨도 얻는 것은 {{n:m11.bf.gain}}뿐입니다." }
      - { text: "{{t:call|콜합니다}}. 절반 넘게 이기니까요", why: "{{n:m11.bf.example-eq}} 에퀴티의 핸드는 절반보다 자주 이기지만, 여기서는 여전히 너무 약합니다: 기준선은 {{n:m11.bf.req}}입니다." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:tournament|토너먼트}} {{t:bubble|버블}}입니다. 당신은 테이블에서 가장 큰 스택을 가지고 있고 모두를 {{t:cover|커버합니다}}. 중간 스택은 당신에게 매우 자주 폴드합니다. 이로부터 무엇을 알 수 있습니까?"
    options:
      - { text: "상대들이 타이트하게 {{t:call|콜하므로}} 더 넓게 {{t:shove|푸시할}} 수 있습니다", correct: true, why: "중간 스택은 {{t:call|콜할}} 때 상금 직전에 탈락할 위험을 지므로 많은 에퀴티가 필요합니다. 당신은 져도 스택의 일부만 잃습니다. 상대들이 타이트하게 {{t:call|콜하므로}} 싸움 없이 {{t:pot|팟}}을 가져가는 경우가 더 많아집니다." }
      - { text: "선두를 잃지 않도록 더 타이트하게 플레이합니다", why: "선두는 테이블에서 위험이 가장 적습니다. 타이트하게 플레이하면 가장 큰 강점인 중간 스택에 대한 압박을 버리게 됩니다." }
      - { text: "아무것도 없습니다. {{t:icm}}은 {{t:short-stack|숏 스택}}에만 해당하니까요", why: "{{t:icm}}은 모두에게 해당합니다: 각자 {{t:call|콜하는}} 데 필요한 에퀴티를 바꾸며, 이는 전체 스택 분포에 따라 달라집니다." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "{{t:icm}} 모델은 무엇을 가정합니까?"
    options:
      - { text: "모두가 똑같이 잘 플레이하고, 순위는 스택만으로 결정된다는 것", correct: true, why: "{{t:icm}}은 스택만으로 각 순위에 들 확률을 계산합니다. {{t:position|포지션}}, 올라가는 블라인드, 실력 차이는 알지 못합니다." }
      - { text: "더 잘하는 플레이어가 더 자주 이긴다는 것", why: "반대입니다: {{t:icm}}은 실력이 같다고 가정합니다. 플레이어의 실력 우위는 전혀 고려하지 않습니다." }
      - { text: "{{t:big-blind|빅 블라인드}}에 있는 플레이어의 확률이 더 낮다는 것", why: "{{t:icm}}은 {{t:position|포지션}}도 블라인드도 모릅니다: 스택만 봅니다. 이것이 한계 중 하나입니다." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
돈을 걸고 하는 게임(캐시)에서는 {{t:chips|칩}}이 곧 돈입니다: 딴 칩과 잃은 칩의 가치가 같습니다. {{t:tournament|토너먼트}}에서는 그렇지 않습니다. 상금은 상위 몇 자리에만 돌아가고, 우승자는 모든 {{t:chips}}을 가져가지만 {{t:prize-pool|상금 풀}} 전체를 가져가지는 않습니다. 그래서 {{t:chips}}을 돈으로 환산해야 합니다.

## {{t:icm}}: 돈으로 본 스택

독립 {{t:chips|칩}} 모델({{t:icm}})은 스택을 각 순위에 들 확률로 환산합니다. 모두가 똑같이 잘 플레이한다고 가정하므로, 순위는 스택만으로 결정됩니다.

```formula
1위 확률 = 내 스택 ÷ 전체 칩
```

2위 확률도 같은 방식으로 계산하지만, 가능한 우승자마다 따로 계산합니다: 그 우승자의 {{t:chips}}을 빼고 남은 칩으로 나눕니다. 스택의 {{t:tournament-equity|토너먼트 에퀴티}}, 즉 {{t:prize-pool|상금 풀}}에서 기대되는 몫은 다음의 합입니다: 순위 확률 × 해당 순위의 {{t:payout}}.

## 예시: {{t:bubble|버블}}의 세 플레이어

두 자리까지 상금을 받습니다: {{t:prize-pool|상금 풀}}의 {{n:m11.icm.a.p1}}, {{n:m11.icm.a.p2}}. 스택: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}} {{t:chips|칩}}.

- {{t:short-stack|숏 스택}}이 {{t:tournament}}에서 우승할 확률은 {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**입니다.
- 2위: 큰 스택이 우승하면({{n:m11.icm.a.chips1}}) 작은 스택이 2위를 할 확률은 {{n:m11.icm.a.second3.via1}}, 중간 스택이 우승하면({{n:m11.icm.a.chips2}}) {{n:m11.icm.a.second3.via2}}입니다. 합계 {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}**입니다(각 항은 반올림한 값입니다).
- 에퀴티: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{t:prize-pool|상금 풀}}의 **{{n:m11.icm.a.eq3}}**.

| 스택 | {{t:chips|칩}} 비율 | {{t:icm}} 기준 에퀴티 |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

{{t:short-stack|숏 스택}}은 보유한 {{t:chips}}보다 가치가 높고, 큰 스택은 낮습니다: 선두는 1위 상금보다 많이 받을 수 없습니다.

## 버블 팩터: 지는 쪽이 더 아픕니다

네 명이 남았고 세 자리까지 상금을 받습니다: {{n:m11.bf.p1}}, {{n:m11.bf.p2}}, {{n:m11.bf.p3}}. 스택은 {{n:m11.bf.s1}}, {{n:m11.bf.s2}}(당신), {{n:m11.bf.s3}}, {{n:m11.bf.s4}}입니다. 스택이 {{n:m11.bf.s3}}인 플레이어가 올인하고, 당신은 그를 {{t:cover|커버합니다}}. 즉 당신이 더 많은 {{t:chips|칩}}을 가지고 있습니다. 간단히 하기 위해 {{t:pot|팟}}의 블라인드는 무시합니다.

- 지금 당신의 스택 가치는 {{t:prize-pool|상금 풀}}의 {{n:m11.bf.eq.now}}입니다.
- 이기면: 당신의 스택은 {{n:m11.bf.win}}이 되고, 상대는 탈락하며, 모두가 상금권에 듭니다. 에퀴티는 {{n:m11.bf.eq.win}}까지 올라 **{{n:m11.bf.gain}}** 늘어납니다.
- 지면: 남는 스택은 {{n:m11.bf.lose}}이고, 에퀴티는 {{n:m11.bf.eq.lose}}까지 떨어져 **{{n:m11.bf.loss}}** 줄어듭니다.

```formula
버블 팩터 = 졌을 때의 손실 ÷ 이겼을 때의 이득
```

여기서는 {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**입니다. 이 앱은 이 정의(손실 ÷ 이득)를 사용합니다: 손실과 이득이 같은 {{t:chips}} 기준 게임에서는 버블 팩터가 1입니다. 일부 푸시/폴드 표는 버블 팩터를 다른 방식, 다른 척도로 계산하므로 그 숫자를 여기 숫자와 직접 비교하지 마세요. 버블 팩터에서 필요 에퀴티가 나옵니다:

```formula
필요 에퀴티 = BF ÷ (BF + 1)
```

결과는 **{{n:m11.bf.req}}**입니다. {{t:chips}} 기준 게임에서는 거는 칩({{n:m11.bf.s3}})과 따는 칩({{n:m11.bf.s3}})이 같으므로 {{n:m11.bf.req-chips}}만 있어도 충분했을 것입니다. 그 차이({{n:m11.bf.premium}})가 **{{t:risk-premium}}**입니다.

같은 방향은 스택이 같은 세 플레이어에 대해 발표된 균형(2008년 연구 논문)에서도 보입니다: 버튼과 {{t:small-blind}}가 이미 올인한 상황에서 {{t:big-blind}}는 단일 핸드 게임에서는 {{n:m11.jamfold3.overcall.single}}의 핸드로 {{t:call|콜하지만}}, {{t:payout|페이아웃}}이 있는 {{t:tournament|토너먼트}}에서는 {{n:m11.jamfold3.overcall.tourn}}만으로, 즉 최상위 {{t:pocket-pair|포켓 페어}}와 AKs만으로 콜합니다.

:::note 누가 타이트하게 {{t:call|콜하는가}}
{{t:bubble|버블}}이나 {{t:final-table|파이널 테이블}}(가장 큰 상금을 놓고 겨루는 {{t:tournament|토너먼트}}의 마지막 테이블)에 있는 중간 스택은 {{t:chips}} 기준 게임보다 훨씬 타이트하게 올인에 {{t:call|콜합니다}}. 상대를 {{t:cover|커버하는}} 큰 스택은 위험이 적어 이를 활용할 수 있습니다: 상대가 {{t:fold|폴드해야}} 하므로 더 넓게 {{t:shove|푸시할}} 수 있습니다. 버블 팩터는 테이블의 모든 스택에 따라 달라지므로 테이블에서 계산하는 것이 아니라, 감각을 기르기 위해 예시로 연습합니다.
:::

## {{t:icm}}의 한계

{{t:icm}}은 {{t:position|포지션}}, 올라가는 블라인드, 플레이어의 실력을 고려하지 않습니다. 이는 근사치일 뿐 {{t:tournament|토너먼트}}의 정확한 가치 평가가 아닙니다.
