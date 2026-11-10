---
id: m12.l1
module: m12
order: 1
title: "숫자로 보는 분산"
sub: "수천 핸드의 결과가 알려 주는 것"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "평균 윈레이트가 {{n:var.wr.ex}}이고 앞으로 {{n:var.hands.k}},000핸드를 플레이합니다. 기대 결과는 {{t:buy-in|바이인}}(1개당 {{n:format.stack}}) 몇 개입니까? 숫자를 입력하세요."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}},000핸드는 100핸드 블록 {{n:var.blocks}}개입니다. 기대 결과 = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, 즉 {{t:buy-in|바이인}} {{n:var.exp.bi}}개입니다. 이는 평균입니다. 실제 결과는 평균에서 크게 벗어날 수 있습니다."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "게임의 {{t:standard-deviation|표준편차}}가 {{n:var.sd}}입니다. {{n:var.hands.k}},000핸드(100핸드 블록 {{n:var.blocks}}개) 후 결과의 {{t:standard-deviation|표준편차}}는 얼마입니까?"
    options:
      - { text: "약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}", correct: true, why: "{{t:standard-deviation|표준편차}}는 블록 수의 제곱근에 비례해 커집니다: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, 즉 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}입니다." }
      - { text: "약 {{n:var.sd.wrong.bi}} {{t:buy-in|바이인}}", why: "{{t:standard-deviation|표준편차}}에 블록 수를 곱하면 이 값이 나옵니다. 무작위 변동은 일부 서로 상쇄되므로 제곱근을 곱합니다: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "약 {{n:var.exp.bi}} {{t:buy-in|바이인}}", why: "이는 윈레이트 {{n:var.wr.ex}}일 때의 기대 결과이지, 그 {{t:standard-deviation|표준편차}}가 아닙니다. {{t:standard-deviation|표준편차}}는 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}입니다." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "윈레이트 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}} {{n:var.sd}}입니다. {{n:var.hands.k}},000핸드 후 결과는 약 {{n:var.conf95}} 신뢰도로 어느 구간에 들어갑니까?"
    options:
      - { text: "약 {{n:var.ci.low.bi}}~약 {{n:var.ci.high.bi}} {{t:buy-in|바이인}}", correct: true, why: "기대 결과 {{n:var.exp.bi}} {{t:buy-in|바이인}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. 확실히 이기는 플레이어라도 {{n:var.hands.k}},000핸드 후 거의 본전일 수 있습니다." }
      - { text: "약 {{n:var.ci68.low.bi}}~약 {{n:var.ci68.high.bi}} {{t:buy-in|바이인}}", why: "이는 {{t:standard-deviation|표준편차}} 1개 구간으로, 결과 3개 중 약 2개만 포함합니다. {{n:var.conf95}} 구간에는 {{t:standard-deviation|표준편차}} {{n:var.z95}}개를 적용합니다: 약 {{n:var.ci.low.bi}}~약 {{n:var.ci.high.bi}}." }
      - { text: "정확히 {{n:var.exp.bi}} {{t:buy-in|바이인}}", why: "이는 평균일 뿐입니다. 결과는 평균을 중심으로 위아래로 수십 {{t:buy-in|바이인}}씩 변동합니다." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "{{t:standard-deviation|표준편차}} {{n:var.sd}}로 {{n:var.hands.k}},000핸드(100핸드 블록 {{n:var.blocks}}개)를 플레이한 후, bb/100 단위 윈레이트의 표준오차는 얼마입니까? √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}으로 계산하세요. 숫자를 입력하세요."
    answer: var.se.wr
    explanation: "표준오차 = SD ÷ √(블록 수) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. {{n:var.conf95}} 구간은 ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}입니다."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "{{n:var.hands.k}},000핸드 후 결과는 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 실제 윈레이트에 대해 무엇을 알 수 있습니까?"
    options:
      - { text: "약 {{n:var.conf95}} 신뢰도로 약 {{n:var.wr.ci.low}}~약 {{n:var.wr.ci.high}} 사이에 있다", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. {{n:var.hands.k}},000핸드 후에는 아마 지고 있지 않다는 것만 알 수 있습니다." }
      - { text: "표본이 크므로 {{n:var.wr.ex}}이다", why: "{{n:var.hands.k}},000핸드는 많아 보이지만, {{t:standard-deviation|표준편차}}가 {{n:var.sd}}이면 오차는 여전히 약 ± {{n:var.ci.wr}}입니다." }
      - { text: "아무것도 알 수 없다. 포커의 결과는 순전히 운이다", why: "과장입니다. 표본은 구간을 좁히지만 느리게 좁힙니다: 오차는 핸드 수의 제곱근에 반비례해 줄어듭니다." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "{{n:var.conf95}} 신뢰도에서 ± {{n:var.target}} 정확도로 윈레이트를 알고 싶습니다. {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 몇 핸드가 필요합니까?"
    options:
      - { text: "약 {{n:var.need.hands.k}},000핸드", correct: true, why: "블록 = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. 즉 약 {{n:var.need.hands.k}},000핸드입니다." }
      - { text: "약 {{n:var.hands.k}},000핸드", why: "{{n:var.hands.k}},000핸드 후 오차는 약 ± {{n:var.ci.wr}}입니다. 이를 ± {{n:var.target}}로 줄이려면 약 {{n:var.need.hands.k}},000핸드가 필요합니다." }
      - { text: "약 {{n:var.need.blocks}}핸드", why: "이는 100핸드 블록의 수입니다. 핸드 수는 그 100배, 즉 약 {{n:var.need.hands.k}},000입니다." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "윈레이트 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}} {{n:var.sd}}인 플레이어가 있습니다. {{n:var.hands.k}},000핸드 동안 최고점에서 {{t:buy-in|바이인}} {{n:dd.bi.small}}개 이상 떨어지는 {{t:downswing}}을 얼마나 자주 겪습니까?"
    options:
      - { text: "거의 항상, 약 {{n:dd.p.small.100k}}", correct: true, why: "이 조건으로 {{n:var.hands.k}},000핸드를 시뮬레이션하면 약 {{n:dd.p.small.100k}}의 실행에서 이런 {{t:downswing}}이 나타납니다. {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing|다운스윙}}은 이기는 플레이어의 게임에서 정상적인 일부입니다." }
      - { text: "약 {{n:dd.p.small.20k}}의 경우", why: "이는 더 짧은 표본인 {{n:dd.hands.short.k}},000핸드의 수치입니다. {{n:var.hands.k}},000핸드에서는 깊은 {{t:downswing}}이 올 기회가 훨씬 많아 약 {{n:dd.p.small.100k}}입니다." }
      - { text: "드물다, 약 {{n:var.p.lose}}", why: "이는 윈레이트 {{n:var.wr.ex}}인 플레이어가 {{n:var.hands.k}},000핸드를 마이너스로 마치는 드문 확률입니다. 도중의 {{t:downswing|다운스윙}}은 다른 문제로, 거의 항상 일어납니다." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "두 플레이어, {{t:standard-deviation|표준편차}} {{n:var.sd}}, {{n:var.hands.k}},000핸드. 한 명은 윈레이트 {{n:var.wr.ex}}, 다른 한 명은 {{n:dd.wr-low}}로 이깁니다. 각자 {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}을 얼마나 자주 겪습니까?"
    options:
      - { text: "첫 번째는 약 {{n:dd.p.big.100k}}, 두 번째는 약 {{n:dd.p.big.100k.wr-low}}의 경우", correct: true, why: "윈레이트가 낮으면 결과를 위로 끌어올리는 힘이 약해서 {{t:downswing|다운스윙}}이 더 깊고 잦아집니다. 마이크로 스테이크에서 이기는 플레이어에게 흔한 {{n:dd.wr-low}}에서는 {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}이 표본의 절반 이상에서 일어납니다." }
      - { text: "{{t:standard-deviation|표준편차}}가 같으므로 둘 다 같은 빈도로 겪는다", why: "{{t:standard-deviation|표준편차}}는 변동을 결정하지만, 윈레이트는 결과가 변동에서 얼마나 빨리 벗어나는지를 결정합니다. {{n:dd.wr-low}}에서는 {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}이 약 {{n:dd.p.big.100k.wr-low}}의 표본에서, {{n:var.wr.ex}}에서는 약 {{n:dd.p.big.100k}}의 표본에서 일어납니다." }
      - { text: "둘 다 겪지 않는다. {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}은 지는 플레이어에게만 일어난다", why: "사실이 아닙니다. 윈레이트 {{n:var.wr.ex}}인 플레이어도 {{n:var.hands.k}},000핸드 표본의 약 {{n:dd.p.big.100k}}에서 이를 겪습니다." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "한 달째 {{t:buy-in|바이인}} {{n:dd.bi.small}}개만큼 마이너스입니다. 이것은 무엇을 의미합니까?"
    options:
      - { text: "{{t:downswing}}만으로는 아무것도 단정할 수 없다. 진 핸드에서 내린 결정을 검토한다", correct: true, why: "{{n:var.hands.k}},000핸드 동안 {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing|다운스윙}}은 윈레이트 {{n:dd.wr-low}}~{{n:var.wr.ex}}로 이기는 거의 모든 플레이어에게 찾아옵니다(SD {{n:var.sd}} 시뮬레이션). 잘하고 있는지는 결과 자체가 아니라 결정 검토로 알 수 있습니다." }
      - { text: "플레이가 나쁘므로 스타일 전체를 바꿔야 한다", why: "이 정도 크기의 {{t:downswing|다운스윙}}은 윈레이트 {{n:var.wr.ex}}(SD {{n:var.sd}})로 이기는 플레이어에게도 {{n:var.hands.k}},000핸드 표본의 약 {{n:dd.p.small.100k}}에서 일어납니다. 결과만 보고 스타일을 바꾸는 것은 노이즈에 반응하는 것입니다." }
      - { text: "분명 운이 나쁜 것이므로 검토할 필요가 없다", why: "{{t:downswing|다운스윙}}은 실수 때문에 생길 수도 있습니다. 결과로는 불운과 실수를 구별할 수 없지만, 핸드 검토로는 구별할 수 있습니다." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "6-max 노리밋 홀덤 캐시 게임에서 일반적인 {{t:standard-deviation}}는 얼마입니까?"
    options:
      - { text: "약 {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "{{t:variance|분산}} 계산기들이 이렇게 제시합니다. 일반적인 값으로는 약 {{n:var.sd}}를 가장 많이 씁니다. 공격적인 스타일은 더 높은 {{t:standard-deviation|표준편차}}를 만듭니다." }
      - { text: "약 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "이는 마이크로 스테이크에서 이기는 플레이어의 일반적인 윈레이트입니다. {{t:standard-deviation|표준편차}}는 윈레이트보다 수십 배 크며, 그래서 결과가 그렇게 크게 출렁입니다." }
      - { text: "100핸드당 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}", why: "이는 100핸드당이 아니라 {{n:var.hands.k}},000핸드 후 결과의 {{t:standard-deviation|표준편차}}입니다." }
---
포커의 결과는 두 가지의 합입니다. 얼마나 잘 플레이하는지, 그리고 운입니다. 두 요소 모두 측정할 수 있습니다. 윈레이트는 평균적으로 얼마나 이기는지를, {{t:standard-deviation}}는 결과가 그 평균을 중심으로 얼마나 크게 출렁이는지를 알려 줍니다.

## bb/100 단위의 두 숫자

**윈레이트**는 100핸드당 평균 수익을 {{t:big-blind|빅 블라인드}} 단위로 나타낸 것입니다. 마이크로 스테이크에서 이기는 플레이어는 보통 {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}입니다.

**{{t:standard-deviation|표준편차}}(SD)**는 100핸드당 결과의 일반적인 퍼짐 정도입니다. 6-max 캐시 게임에서는 보통 {{n:var.sd.low}}–{{n:var.sd.high}}이며, 일반적인 값으로는 {{n:var.sd}}를 씁니다. {{t:standard-deviation|표준편차}}는 윈레이트보다 수십 배 크기 때문에, {{t:session|세션}} 하나, 심지어 한 달의 결과도 알려 주는 것이 매우 적습니다.

## 많은 핸드를 플레이한 후의 결과

핸드 수를 100으로 나누면 블록 수가 나옵니다.

```formula
기대 결과 = 윈레이트 × 블록 수
결과의 표준편차 = SD × √(블록 수)
{{n:var.conf95}} 구간 = 기대 결과 ± {{n:var.z95}} × 결과의 표준편차
```

예: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}},000핸드, 즉 {{n:var.blocks}}블록입니다. 기대 결과는 {{n:var.exp.bb}}, 즉 {{t:buy-in|바이인}} {{n:var.exp.bi}}개입니다. 결과의 {{t:standard-deviation|표준편차}}는 {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, 즉 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}입니다. {{n:var.conf95}} 신뢰도로 결과는 약 **{{n:var.ci.low.bi}}~{{n:var.ci.high.bi}} {{t:buy-in|바이인}}** 사이가 됩니다. 기대 결과는 0보다 약 {{n:var.z.lose}} {{t:standard-deviation|표준편차}} 위에 있으므로, {{n:var.hands.k}},000핸드 후 마이너스일 확률은 약 {{n:var.p.lose}}입니다.

## 윈레이트를 알려면 몇 핸드가 필요한가

같은 계산을 반대로 적용할 수도 있습니다. 윈레이트 추정 오차는 핸드 수의 제곱근에 반비례해 줄어듭니다.

```formula
윈레이트 오차 = SD ÷ √(블록 수)
필요한 블록 수 = ({{n:var.z95}} × SD ÷ 정확도)²
```

{{n:var.hands.k}},000핸드 후 오차는 약 {{n:var.se.wr}}이므로, {{n:var.conf95}} 구간은 ± {{n:var.ci.wr}}입니다. 이때 {{n:var.wr.ex}}라는 결과는 실제 윈레이트가 약 {{n:var.wr.ci.low}}~{{n:var.wr.ci.high}} 사이 어딘가에 있다는 뜻일 뿐입니다. ± {{n:var.target}} 정확도로 윈레이트를 알려면 약 **{{n:var.need.hands.k}},000핸드**가 필요합니다.

## {{t:downswing|다운스윙}}은 정상입니다

{{t:downswing|다운스윙}}은 최고점에서 결과가 떨어지는 것입니다. 윈레이트 {{n:var.wr.ex}}, SD {{n:var.sd}}인 플레이어의 시뮬레이션:

| 최고점 대비 {{t:downswing|다운스윙}} | {{n:dd.hands.short.k}},000핸드 | {{n:var.hands.k}},000핸드 | {{n:dd.wr-low}}일 때 {{n:var.hands.k}},000핸드 |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|바이인}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|바이인}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note 이 수치의 출처
시뮬레이션 결과입니다. 각 블록의 결과를 무작위로 정해 {{n:var.hands.k}},000핸드씩 수천 번 실행했습니다. 실제 결과는 100핸드마다가 아니라 핸드마다 바뀌므로, 실제 {{t:downswing|다운스윙}}은 조금 더 깊을 수 있습니다. 결론: {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing}}이 플레이를 못한다는 증거는 아닙니다.
:::

이는 일반적인 안내이며 결과를 보장하지 않습니다. 플레이를 통제하기 어려워지면 '도움말' 화면을 확인하세요.
