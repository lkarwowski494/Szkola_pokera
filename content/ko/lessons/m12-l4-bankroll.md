---
id: m12.l4
module: m12
order: 4
title: "뱅크롤과 위험"
sub: "바이인 단위로 계산하는 분산과 스테이크를 내려야 할 때"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "{{t:buy-in|바이인}}은 {{n:format.stack}}입니다. {{n:br.bi.base}} {{t:buy-in|바이인}}의 뱅크롤은 몇 bb입니까? 숫자를 입력하세요."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. 뱅크롤은 지금 플레이하는 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 단위로 계산합니다."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "{{t:standard-deviation|표준편차}} {{n:var.sd}}에서 윈레이트 {{n:var.wr.typical.high}}로 이기고 있고, {{n:br.bi.base}} {{t:buy-in|바이인}}({{n:br.base.bb}})을 가지고 있습니다. 뱅크롤 전체를 잃을 위험은 얼마입니까?"
    options:
      - { text: "약 {{n:ror.base}}", correct: true, why: "지수는 2 × 윈레이트 × 뱅크롤 ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}이므로 RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}입니다. 이는 {{t:stakes|스테이크}}를 한 번도 내리지 않을 경우 언젠가 뱅크롤 전체를 잃을 확률입니다." }
      - { text: "약 {{n:ror.half}}", why: "뱅크롤이 절반인 {{n:br.bi.move-down}} {{t:buy-in|바이인}}일 때의 결과입니다. {{n:br.bi.base}}에서는 지수가 두 배이므로 위험은 약 {{n:ror.base}}로 줄어듭니다." }
      - { text: "이기는 플레이어이므로 0", why: "이기는 플레이어도 뱅크롤 전체보다 깊은 {{t:downswing|다운스윙}}을 겪을 수 있습니다. 위험은 뱅크롤이 클수록 줄어들지만 절대 0이 되지는 않습니다." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "뱅크롤은 똑같이 {{n:br.bi.base}} {{t:buy-in|바이인}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}이지만 윈레이트는 {{n:var.wr.typical.low}}에 불과합니다. 뱅크롤을 잃을 위험은 얼마입니까?"
    options:
      - { text: "약 {{n:ror.base.wr-min}}", correct: true, why: "윈레이트는 지수에 들어 있습니다. {{n:var.wr.typical.high}} 대신 {{n:var.wr.typical.low}}이면 지수가 삼분의 일로 줄어들고, 위험은 약 {{n:ror.base}}에서 약 {{n:ror.base.wr-min}}로 커집니다." }
      - { text: "뱅크롤이 같으므로 약 {{n:ror.base}}", why: "위험은 윈레이트 × 뱅크롤의 곱에 따라 달라집니다. 윈레이트가 낮으면 뱅크롤이 작은 것과 같은 효과가 있어 약 {{n:ror.base.wr-min}}가 나옵니다." }
      - { text: "약 {{n:ror.base.wr-ex}}", why: "윈레이트 {{n:var.wr.ex}}일 때의 결과입니다. {{n:var.wr.typical.low}}에서는 위험이 수십 배 커서 약 {{n:ror.base.wr-min}}입니다." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "{{n:br.bi.base}} {{t:buy-in|바이인}}을 가지고 있고 {{t:standard-deviation|표준편차}}는 {{n:var.sd}}이지만, 아직 자신의 윈레이트를 모릅니다. 뱅크롤 전체를 잃을 위험에 대해 무엇을 알 수 있습니까?"
    options:
      - { text: "윈레이트에 따라 다릅니다: {{n:var.wr.typical.high}}에서는 약 {{n:ror.base}}, {{n:var.wr.typical.low}}에서는 약 {{n:ror.base.wr-min}}", correct: true, why: "윈레이트는 지수에서 뱅크롤과 나란히 있습니다. 윈레이트를 모르면 위험도 알 수 없으며, 윈레이트가 낮으면 같은 뱅크롤로도 위험이 몇 배 커집니다." }
      - { text: "뱅크롤에만 달려 있으므로 약 {{n:ror.base}}", why: "그 값은 {{n:var.wr.typical.high}}일 때만 나옵니다. {{n:var.wr.typical.low}}에서는 같은 뱅크롤로 약 {{n:ror.base.wr-min}}가 됩니다." }
      - { text: "{{n:br.bi.base}} {{t:buy-in|바이인}}은 많으므로 0", why: "윈레이트가 플러스이면 위험은 뱅크롤이 클수록 줄어들지만 절대 0이 되지는 않습니다. {{n:var.wr.typical.low}}에서는 여전히 약 {{n:ror.base.wr-min}}입니다." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "{{n:br.bi.base}} {{t:buy-in|바이인}}으로 이 {{t:stakes|스테이크}}를 시작했습니다. {{t:downswing|다운스윙}} 후 {{n:br.ex.below}}가 남았습니다. 어떻게 하겠습니까?"
    options:
      - { text: "{{t:stakes|스테이크}}를 한 단계 내립니다", correct: true, why: "계획한 뱅크롤의 절반({{n:br.bi.move-down}}) 아래로 떨어졌습니다. 그 정도 {{t:buy-in|바이인}}으로는 남은 뱅크롤을 잃을 위험이 {{n:br.bi.base}}일 때보다 몇 배 높습니다(윈레이트 {{n:var.wr.typical.high}}, SD {{n:var.sd}} 기준). 두 배 낮은 {{t:stakes|스테이크}}에서는 같은 뱅크롤이 그 스테이크의 {{t:buy-in|바이인}}으로 세면 다시 계획한 수에 거의 가깝습니다." }
      - { text: "단지 {{t:variance|분산}}일 뿐이니 계속 플레이합니다", why: "아마 {{t:variance|분산}}인 것은 맞지만, 바로 그것으로부터 지켜 주는 것이 {{t:stakes|스테이크}}를 내리는 일입니다. {{n:br.ex.below}} {{t:buy-in|바이인}}으로는 다음 {{t:downswing|다운스윙}}이 모든 것을 가져갈 수 있습니다." }
      - { text: "빨리 만회하려고 더 높은 {{t:stakes|스테이크}}로 올라갑니다", why: "절박함 틸트입니다. {{t:buy-in|바이인}} 기준으로 뱅크롤이 더 작은 상태에서 더 높은 {{t:stakes|스테이크}}로 가면 {{t:risk-of-ruin|파산 위험}}이 급격히 커집니다." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "{{n:br.bi.base}} {{t:buy-in|바이인}}으로 이 {{t:stakes|스테이크}}를 시작해 {{n:dd.bi.small}}을 잃었습니다. 지금은 {{n:br.ex.after-dd}}이 있습니다. 어떻게 하겠습니까?"
    options:
      - { text: "{{t:stakes|스테이크}}에 남아 진 핸드의 결정을 검토합니다", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|바이인}}은 여전히 가장 늦은 하향 기준인 {{n:br.bi.move-down}}보다 많습니다. 시뮬레이션에서 이런 {{t:downswing|다운스윙}}은 {{n:var.hands.k}},000핸드 동안 {{n:var.wr.ex}}로 이기는 플레이어의 약 {{n:dd.p.small.100k}}에게 일어나며, 핸드 검토로 실수 때문인지 확인할 수 있습니다." }
      - { text: "바로 {{t:stakes|스테이크}}를 내립니다", correct: true, why: "이것도 좋은 결정입니다. 일부 자료는 {{n:dd.bi.small}} {{t:buy-in|바이인}}을 잃은 시점에 이미 내리라고 권합니다. 뱅크롤 절반보다 일찍 내리는 것은 실수가 아니지만, 더 늦게 내리는 것은 실수입니다." }
      - { text: "다시 {{n:br.bi.base}}을 맞추려고 외부에서 {{t:buy-in|바이인}}을 추가합니다", why: "{{t:downswing|다운스윙}}이 올 때마다 돈을 보태면 위험의 한도라는 뱅크롤의 의미가 흐려집니다. 기준은 미리 정하고 그것을 지킵니다." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "현재 {{t:stakes|스테이크}}의 {{n:br.bi.base}} {{t:buy-in|바이인}}, 즉 뱅크롤로 정한 만큼을 가지고 있습니다. 더 높은 {{t:stakes|스테이크}}는 {{t:buy-in|바이인}}이 두 배입니다. 올라가겠습니까?"
    options:
      - { text: "아니요, 더 높은 {{t:stakes|스테이크}}에서는 계획한 뱅크롤의 절반에 불과합니다", correct: true, why: "뱅크롤은 옮겨 가려는 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 단위로 계산합니다. 지금의 {{n:br.bi.base}} {{t:buy-in|바이인}}은 그곳에서 {{n:br.bi.move-down}}이며, 정확히 하향 기준입니다." }
      - { text: "네, 잘 풀리고 있으니까요", why: "좋은 한 달은 대부분 {{t:variance|분산}}입니다({{t:variance|분산}}에 관한 레슨). 올라갈지는 새 {{t:stakes|스테이크}}에서의 뱅크롤에 달려 있습니다." }
      - { text: "네, 이미 {{n:br.bi.base}} {{t:buy-in|바이인}}이 있으니까요", why: "현재 {{t:stakes|스테이크}}의 {{n:br.bi.base}} {{t:buy-in|바이인}}은 두 배 높은 {{t:stakes|스테이크}}에서는 {{n:br.bi.move-down}}에 불과합니다." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "어떤 플레이어가 자신의 {{t:stakes|스테이크}}에서 평균적으로 지고 있지만 뱅크롤은 매우 큽니다. 이것이 그에게 무엇을 줍니까?"
    options:
      - { text: "손실을 뒤로 미룰 뿐입니다", correct: true, why: "윈레이트가 마이너스이면 결과는 평균적으로 줄어들므로, 뱅크롤 크기와 상관없이 언젠가는 뱅크롤을 잃습니다. 뱅크롤은 {{t:variance|분산}}으로부터 지켜 줄 뿐, 약한 플레이로부터 지켜 주지는 않습니다." }
      - { text: "파산으로부터 지켜 줍니다", why: "위험 공식은 윈레이트가 플러스일 때만 성립합니다. 지는 플레이어는 반드시 뱅크롤을 잃으며, 뱅크롤이 크면 더 천천히 잃을 뿐입니다." }
      - { text: "더 높은 {{t:stakes|스테이크}}에서 플레이할 수 있게 해 줍니다", why: "윈레이트가 마이너스일 때 더 높은 {{t:stakes|스테이크}}는 손실을 앞당길 뿐입니다." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "이제 막 시작했습니다. 공부와 플레이에 시간을 어떻게 나누겠습니까?"
    options:
      - { text: "공부 약 {{n:study.beginner}}", correct: true, why: "처음에는 따라잡아야 할 것이 가장 많으므로 공부의 비중이 더 큽니다." }
      - { text: "공부 약 {{n:study.min}}", why: "이미 이기고 있는 플레이어의 하한선입니다. 처음에는 공부의 비중이 더 커야 합니다." }
      - { text: "플레이만 합니다. 공부는 경험과 함께 따라옵니다", why: "게임 결과는 약한 피드백입니다(결정과 결과에 관한 레슨). 설명이 있는 공부와 핸드 분석이 더 빨리 가르쳐 줍니다." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "이미 자신의 {{t:stakes|스테이크}}에서 이기고 있습니다. 시간을 어떻게 나누겠습니까?"
    options:
      - { text: "대략 반반, 단 공부는 절대 {{n:study.min}} 미만으로 하지 않습니다", correct: true, why: "이기고 있을 때도 이상적인 공부 비중은 약 {{n:study.winner}}이며, 최소는 {{n:study.min}}입니다." }
      - { text: "이기고 있으니 플레이만 합니다", why: "이기고 있을 때도 공부 시간은 {{n:study.min}} 아래로 내리지 않습니다." }
      - { text: "처음처럼 공부 약 {{n:study.beginner}}", why: "더 높은 {{t:stakes|스테이크}}를 준비하고 있다면 그래도 됩니다. 단순히 자신의 스테이크에서 이기고 있다면 약 {{n:study.winner}}이면 충분합니다." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "게임이 통제에서 벗어나고 있을 수 있다는 신호는 무엇입니까?"
    options:
      - { text: "진 뒤에 손실을 되찾으려고 다시 플레이합니다", correct: true, why: "손실을 되찾으려는 플레이는 진단 기준에 나열된 도박 문제의 신호 중 하나입니다. 자신에게서 이런 신호를 발견하면 ‘책임감 있는 게임’ 안내에 있는 연락처를 이용하세요." }
      - { text: "{{t:session|세션}} 후 진 핸드를 분석합니다", why: "건강한 공부 습관입니다. 문제의 신호로는 손실을 되찾으려는 플레이, 계획보다 긴 플레이, 빌린 돈으로 하는 플레이 등이 있습니다." }
      - { text: "계획대로 {{t:session|세션}}을 끝냅니다", why: "게임을 잘 통제하고 있는 것입니다. 문제의 신호는 계획보다 긴 플레이나 손실을 되찾고 싶은 욕구일 것입니다." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
뱅크롤은 오직 포커 플레이에만 쓰도록 따로 떼어 둔 자금 전체입니다. 이 레슨에서는 뱅크롤을 돈이 아니라 **{{t:buy-in|바이인}}** 단위로 계산합니다. {{t:buy-in|바이인}} 하나는 지금 플레이하는 {{t:stakes|스테이크}}에서 {{n:format.stack}}의 풀 스택입니다.

## {{t:risk-of-ruin|파산 위험}}

같은 {{t:stakes|스테이크}}에서 계속 플레이할 때 언젠가 뱅크롤 전체를 잃을 확률입니다.

```formula
RoR = e^(−2 × 윈레이트 × 뱅크롤 ÷ SD²)
```

이 공식은 윈레이트와 SD가 일정하다고 가정한 근사치입니다. 윈레이트와 SD는 bb/100으로, 뱅크롤은 bb로 넣습니다. {{t:standard-deviation|표준편차}} {{n:var.sd}}일 때:

| 윈레이트 | {{n:br.bi.move-down}} {{t:buy-in|바이인}} | {{n:br.bi.base}} {{t:buy-in|바이인}} | {{n:br.bi.beginner}} {{t:buy-in|바이인}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## 위험을 좌우하는 것

공식에서 윈레이트와 뱅크롤은 나란히 놓여 있습니다. 윈레이트가 절반이면 같은 위험을 위해 두 배의 뱅크롤이 필요합니다. 그래서 같은 수의 {{t:buy-in|바이인}}이라도 어떤 플레이어에게는 다른 플레이어보다 위험이 몇 배 작습니다. 처음에는 윈레이트를 알 수 없으며, 이를 추정하려면 매우 많은 핸드가 필요합니다({{t:variance|분산}}에 관한 레슨). 윈레이트가 마이너스이면 어떤 뱅크롤도 도움이 되지 않습니다. 뱅크롤은 {{t:variance|분산}}으로부터 지켜 줄 뿐, 약한 플레이로부터 지켜 주지는 않기 때문입니다.

## {{t:stakes|스테이크}}를 내려야 할 때

기준을 미리 정하세요. 늦어도 뱅크롤이 계획한 {{t:buy-in|바이인}} 수의 **절반**으로 떨어지면(예: {{n:br.bi.base}}에서 {{n:br.bi.move-down}}로) {{t:stakes|스테이크}}를 한 단계 내립니다. 자료에 따라 기준은 절반부터 뱅크롤 전체까지 다양하며, 절반이 그중 가장 늦은 기준입니다. 두 배 낮은 {{t:stakes|스테이크}}에서는 같은 뱅크롤이 그 스테이크의 {{t:buy-in|바이인}}으로 세면 다시 계획한 수에 거의 가깝습니다. 다시 올라가는 것은 빨라도 더 높은 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 기준으로 뱅크롤을 전부 갖췄을 때입니다. 일부 자료는 {{n:dd.bi.small}} {{t:buy-in|바이인}}을 잃은 시점에 더 일찍 내리라고 권합니다. 절반 기준 전에 내리는 것은 실수가 아닙니다.

## 공부와 플레이

처음에는 시간의 약 {{n:study.beginner}}를 공부에, 나머지를 플레이에 씁니다. 자신의 {{t:stakes|스테이크}}에서 이기고 있다면 이상적인 비중은 약 {{n:study.winner}}이지만, 공부가 {{n:study.min}} 미만이 되어서는 안 됩니다.

:::note 책임감 있는 게임
게임이 통제에서 벗어나고 있다는 신호의 예: 계획보다 오래 플레이합니다. 진 뒤에 손실을 되찾으려고 다시 플레이합니다. 잃어서는 안 되는 돈으로 플레이하거나 플레이하려고 돈을 빌립니다. 걱정을 잊으려고 플레이합니다. 가까운 사람들에게 플레이하는 것을 숨깁니다.

도움을 받을 수 있는 곳:

{{helplines}}
:::
