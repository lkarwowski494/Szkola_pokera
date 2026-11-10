# Pakiet kontroli (a), ko: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:7
NOWE:     prompt: "평균 윈레이트는 {{n:var.wr.typical.high}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}이고, 앞으로 {{n:exam.m12.hands.k}},000핸드(100핸드 블록 {{n:exam.m12.blocks}}개)를 플레이합니다. 약 {{n:var.conf95}} 신뢰도로 결과는 어떤 범위에 들어갑니까?"
STARE:     prompt: "평균 윈레이트는 {{n:var.wr.typical.high}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}이고, 앞으로 {{n:exam.m12.hands.k}}천 핸드(100핸드 블록 {{n:exam.m12.blocks}}개)를 플레이합니다. 약 {{n:var.conf95}} 신뢰도로 결과는 어떤 범위에 들어갑니까?"

## [2] exams/m12.yaml:10
NOWE:       - { text: "정확히 {{n:exam.m12.exp.bi}} {{t:buy-in|바이인}}", why: "{{n:exam.m12.exp.bi}} {{t:buy-in|바이인}}은 기대 결과, 즉 평균입니다. {{n:exam.m12.hands.k}},000핸드 후 결과의 {{t:standard-deviation|표준편차}}는 약 {{n:exam.m12.sd.bi}} {{t:buy-in|바이인}}이므로 실제 결과는 평균과 크게 다를 수 있습니다." }
STARE:       - { text: "정확히 {{n:exam.m12.exp.bi}} {{t:buy-in|바이인}}", why: "{{n:exam.m12.exp.bi}} {{t:buy-in|바이인}}은 기대 결과, 즉 평균입니다. {{n:exam.m12.hands.k}}천 핸드 후 결과의 {{t:standard-deviation|표준편차}}는 약 {{n:exam.m12.sd.bi}} {{t:buy-in|바이인}}이므로 실제 결과는 평균과 크게 다를 수 있습니다." }

## [3] exams/m12.yaml:16
NOWE:     prompt: "{{n:exam.m12.hands.k}},000핸드 후 윈레이트는 {{n:var.wr.typical.high}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 진짜 윈레이트에 대해 무엇을 알 수 있습니까?"
STARE:     prompt: "{{n:exam.m12.hands.k}}천 핸드 후 윈레이트는 {{n:var.wr.typical.high}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 진짜 윈레이트에 대해 무엇을 알 수 있습니까?"

## [4] exams/m12.yaml:18
NOWE:       - { text: "약 {{n:var.conf95}} 신뢰도로 약 {{n:exam.m12.wr.ci.low}}와 약 {{n:exam.m12.wr.ci.high}} 사이에 있습니다", correct: true, why: "윈레이트의 오차는 SD ÷ √(블록 수) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}입니다. 범위: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}. {{n:exam.m12.hands.k}},000핸드 후에는 이기고 있는지조차 알 수 없습니다." }
STARE:       - { text: "약 {{n:var.conf95}} 신뢰도로 약 {{n:exam.m12.wr.ci.low}}와 약 {{n:exam.m12.wr.ci.high}} 사이에 있습니다", correct: true, why: "윈레이트의 오차는 SD ÷ √(블록 수) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}입니다. 범위: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}. {{n:exam.m12.hands.k}}천 핸드 후에는 이기고 있는지조차 알 수 없습니다." }

## [5] exams/m12.yaml:19
NOWE:       - { text: "큰 표본에서 결과가 플러스이므로 이기고 있다는 것", why: "{{n:exam.m12.hands.k}},000핸드는 윈레이트를 판단하기에 작은 표본입니다. {{n:var.conf95}} 범위는 약 {{n:exam.m12.wr.ci.low}}에서 약 {{n:exam.m12.wr.ci.high}}까지이므로 지는 플레이도 포함합니다." }
STARE:       - { text: "큰 표본에서 결과가 플러스이므로 이기고 있다는 것", why: "{{n:exam.m12.hands.k}}천 핸드는 윈레이트를 판단하기에 작은 표본입니다. {{n:var.conf95}} 범위는 약 {{n:exam.m12.wr.ci.low}}에서 약 {{n:exam.m12.wr.ci.high}}까지이므로 지는 플레이도 포함합니다." }

## [6] exams/m12.yaml:20
NOWE:       - { text: "표본이 크므로 {{n:var.wr.typical.high}}에 매우 가깝다는 것", why: "{{n:exam.m12.hands.k}},000핸드로는 그렇게 좁은 범위를 얻을 수 없습니다. 계산하면 {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ ± {{n:exam.m12.ci.wr}}입니다." }
STARE:       - { text: "표본이 크므로 {{n:var.wr.typical.high}}에 매우 가깝다는 것", why: "{{n:exam.m12.hands.k}}천 핸드로는 그렇게 좁은 범위를 얻을 수 없습니다. 계산하면 {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ ± {{n:exam.m12.ci.wr}}입니다." }

## [7] exams/m12.yaml:27
NOWE:       - { text: "약 {{n:exam.m12.need.hands.k}},000핸드", correct: true, why: "블록 수 = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, 즉 약 {{n:exam.m12.need.hands.k}},000핸드입니다. {{t:standard-deviation|표준편차}}가 높을수록 훨씬 큰 표본이 필요합니다." }
STARE:       - { text: "약 {{n:exam.m12.need.hands.k}}천 핸드", correct: true, why: "블록 수 = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, 즉 약 {{n:exam.m12.need.hands.k}}천 핸드입니다. {{t:standard-deviation|표준편차}}가 높을수록 훨씬 큰 표본이 필요합니다." }

## [8] exams/m12.yaml:28
NOWE:       - { text: "약 {{n:var.need.hands.k}},000핸드, {{t:standard-deviation|표준편차}}가 {{n:var.sd}}일 때와 같습니다", why: "{{t:standard-deviation|표준편차}}는 공식에서 제곱되므로 {{n:var.sd}} 대신 {{n:var.sd.high}}이면 확실히 더 많은 핸드가 필요합니다. 약 {{n:exam.m12.need.hands.k}},000핸드입니다." }
STARE:       - { text: "약 {{n:var.need.hands.k}}천 핸드, {{t:standard-deviation|표준편차}}가 {{n:var.sd}}일 때와 같습니다", why: "{{t:standard-deviation|표준편차}}는 공식에서 제곱되므로 {{n:var.sd}} 대신 {{n:var.sd.high}}이면 확실히 더 많은 핸드가 필요합니다. 약 {{n:exam.m12.need.hands.k}}천 핸드입니다." }

## [9] exams/m12.yaml:34
NOWE:     prompt: "플레이 스타일을 바꿨고 {{n:exam.m12.style.hands.k}},000핸드 후 결과는 {{n:exam.m12.style.wr}}입니다. {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 이것이 새 스타일이 더 낫다는 증거입니까?"
STARE:     prompt: "플레이 스타일을 바꿨고 {{n:exam.m12.style.hands.k}}천 핸드 후 결과는 {{n:exam.m12.style.wr}}입니다. {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 이것이 새 스타일이 더 낫다는 증거입니까?"

## [10] exams/m12.yaml:37
NOWE:       - { text: "그렇습니다. {{n:exam.m12.style.wr}}은 일반적인 윈레이트보다 훨씬 높습니다", why: "{{n:exam.m12.style.hands.k}},000핸드에서 {{n:var.conf95}} 범위는 약 ± {{n:exam.m12.style.ci}}입니다. 작은 표본의 높은 결과는 대부분 {{t:variance}}입니다." }
STARE:       - { text: "그렇습니다. {{n:exam.m12.style.wr}}은 일반적인 윈레이트보다 훨씬 높습니다", why: "{{n:exam.m12.style.hands.k}}천 핸드에서 {{n:var.conf95}} 범위는 약 ± {{n:exam.m12.style.ci}}입니다. 작은 표본의 높은 결과는 대부분 {{t:variance}}입니다." }

## [11] exams/m12.yaml:38
NOWE:       - { text: "대부분의 {{t:session|세션}}에서 이겼다면 그렇습니다", why: "이긴 {{t:session|세션}}의 수는 같은 결과를 여러 조각으로 나눈 것일 뿐입니다. 여전히 {{n:exam.m12.style.hands.k}},000핸드에 기반하며 결정이 더 나은지는 알려 주지 않습니다." }
STARE:       - { text: "대부분의 {{t:session|세션}}에서 이겼다면 그렇습니다", why: "이긴 {{t:session|세션}}의 수는 같은 결과를 여러 조각으로 나눈 것일 뿐입니다. 여전히 {{n:exam.m12.style.hands.k}}천 핸드에 기반하며 결정이 더 나은지는 알려 주지 않습니다." }

## [12] exams/m12.yaml:43
NOWE:     prompt: "턴입니다. 깨끗한 {{t:flush-draw}}가 있고 {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{n:ex.bet.half}}으로 올인했고 더 이상 얻을 수 있는 칩은 없습니다. {{t:call|콜}}했고 리버에 {{t:flush}}가 완성되어 이겼습니다. 이 {{t:call}}을 어떻게 평가합니까?"
STARE:     prompt: "턴입니다. 깨끗한 {{t:flush-draw}}가 있고 {{t:pot|팟}}은 {{n:ex.pot}}입니다. 상대가 {{n:ex.bet.half}}로 올인했고 더 이상 얻을 수 있는 칩은 없습니다. {{t:call|콜}}했고 리버에 {{t:flush}}가 완성되어 이겼습니다. 이 {{t:call}}을 어떻게 평가합니까?"

## [13] exams/m12.yaml:54
NOWE:       - { text: "패배 혐오 틸트", correct: true, why: "{{t:variance}} 때문임을 알면서도 진 것 자체가 계기입니다. 운도, 자신도, 상대도 탓하지 않습니다." }
STARE:       - { text: "지는 것을 싫어해서 생기는 틸트", correct: true, why: "{{t:variance}} 때문임을 알면서도 진 것 자체가 계기입니다. 운도, 자신도, 상대도 탓하지 않습니다." }

## [14] exams/m12.yaml:55
NOWE:       - { text: "불공정 틸트", why: "이 유형은 포커가 불공정하다는 느낌에서 시작됩니다. 배드 비트, 쿨러, 상대가 리버에 맞히는 경우 등입니다. 여기서는 모든 일이 정상적으로 진행되었음을 알고 있고, 화가 나는 것은 진 것 자체입니다." }
STARE:       - { text: "불공정함 때문에 생기는 틸트", why: "이 유형은 포커가 불공정하다는 느낌에서 시작됩니다. 배드 빗, 쿨러, 상대가 리버에 맞히는 경우 등입니다. 여기서는 모든 일이 정상적으로 진행되었음을 알고 있고, 화가 나는 것은 진 것 자체입니다." }

## [15] exams/m12.yaml:56
NOWE:       - { text: "실수 틸트", why: "실수 틸트는 자신의 실수에 대한 분노입니다. 여기서는 잘 플레이했다는 것을 알고 있습니다." }
STARE:       - { text: "실수 때문에 생기는 틸트", why: "실수 틸트는 자신의 실수에 대한 분노입니다. 여기서는 잘 플레이했다는 것을 알고 있습니다." }

## [16] exams/m12.yaml:80
NOWE:     prompt: "뱅크롤을 {{n:br.bi.beginner}} {{t:buy-in|바이인}}으로 정했습니다. {{t:downswing|다운스윙}} 후 {{n:exam.m12.md.now}}가 남았습니다. 어떻게 합니까?"
STARE:     prompt: "뱅크롤을 {{n:br.bi.beginner}} {{t:buy-in|바이인}}으로 정했습니다. {{t:downswing|다운스윙}} 후 {{n:exam.m12.md.now}}이 남았습니다. 어떻게 합니까?"

## [17] exams/m12.yaml:82
NOWE:       - { text: "{{t:stakes|스테이크}}를 한 단계 내립니다", correct: true, why: "내려가는 기준은 정해 둔 {{t:buy-in|바이인}} 수의 절반입니다. {{n:br.bi.beginner}}이면 {{n:exam.m12.md.half}}입니다. 남은 것은 {{n:exam.m12.md.now}}로 그보다 적습니다. 두 배 낮은 {{t:stakes|스테이크}}에서는 같은 뱅크롤이 다시 그 스테이크의 {{t:buy-in|바이인}} 수를 거의 채웁니다. 이것은 일반적인 안내입니다. 플레이가 통제되지 않는다면 '도움말' 화면을 확인하세요." }
STARE:       - { text: "{{t:stakes|스테이크}}를 한 단계 내립니다", correct: true, why: "내려가는 기준은 정해 둔 {{t:buy-in|바이인}} 수의 절반입니다. {{n:br.bi.beginner}}이면 {{n:exam.m12.md.half}}입니다. 남은 것은 {{n:exam.m12.md.now}}으로 그보다 적습니다. 두 배 낮은 {{t:stakes|스테이크}}에서는 같은 뱅크롤이 다시 그 스테이크의 {{t:buy-in|바이인}} 수를 거의 채웁니다. 이것은 일반적인 안내입니다. 플레이가 통제되지 않는다면 '도움말' 화면을 확인하세요." }

## [18] exams/m12.yaml:83
NOWE:       - { text: "{{n:exam.m12.md.now}}가 기준 {{n:br.bi.move-down}}보다 많으므로 그대로 있습니다", why: "기준 {{n:br.bi.move-down}}는 {{n:br.bi.base}} {{t:buy-in|바이인}} 뱅크롤의 절반입니다. 기준은 직접 정한 뱅크롤로 계산합니다. {{n:br.bi.beginner}}으로 정했으므로 늦어도 {{n:exam.m12.md.half}}에서 내려갑니다." }
STARE:       - { text: "{{n:exam.m12.md.now}}이 기준 {{n:br.bi.move-down}}보다 많으므로 그대로 있습니다", why: "기준 {{n:br.bi.move-down}}은 {{n:br.bi.base}} {{t:buy-in|바이인}} 뱅크롤의 절반입니다. 기준은 직접 정한 뱅크롤로 계산합니다. {{n:br.bi.beginner}}으로 정했으므로 늦어도 {{n:exam.m12.md.half}}에서 내려갑니다." }

## [19] helplines.yaml:27
NOWE:     info: '도박의 영향을 받는 누구에게나 실질적인 조언과 정서적 지원을 온라인으로 무료 제공합니다. 비밀이 보장됩니다.'
STARE:     info: '도박의 영향을 받는 누구에게나 무료 실질적 조언과 정서적 지원을 온라인으로 제공합니다. 비밀이 보장됩니다.'

## [20] lessons/m12-l1-wariancja.md:13
NOWE:     prompt: "평균 윈레이트가 {{n:var.wr.ex}}이고 앞으로 {{n:var.hands.k}},000핸드를 플레이합니다. 기대 결과는 {{t:buy-in|바이인}}(1개당 {{n:format.stack}}) 몇 개입니까? 숫자를 입력하세요."
STARE:     prompt: "평균 윈레이트가 {{n:var.wr.ex}}이고 앞으로 {{n:var.hands.k}}k 핸드를 플레이합니다. 기대 결과는 {{t:buy-in|바이인}}(1개당 {{n:format.stack}}) 몇 개입니까? 숫자를 입력하세요."

## [21] lessons/m12-l1-wariancja.md:15
NOWE:     explanation: "{{n:var.hands.k}},000핸드는 100핸드 블록 {{n:var.blocks}}개입니다. 기대 결과 = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, 즉 {{t:buy-in|바이인}} {{n:var.exp.bi}}개입니다. 이는 평균입니다. 실제 결과는 평균에서 크게 벗어날 수 있습니다."
STARE:     explanation: "{{n:var.hands.k}}k 핸드는 100핸드 블록 {{n:var.blocks}}개입니다. 기대 결과 = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, 즉 {{t:buy-in|바이인}} {{n:var.exp.bi}}개입니다. 이는 평균입니다. 실제 결과는 평균에서 크게 벗어날 수 있습니다."

## [22] lessons/m12-l1-wariancja.md:20
NOWE:     prompt: "게임의 {{t:standard-deviation|표준편차}}가 {{n:var.sd}}입니다. {{n:var.hands.k}},000핸드(100핸드 블록 {{n:var.blocks}}개) 후 결과의 {{t:standard-deviation|표준편차}}는 얼마입니까?"
STARE:     prompt: "게임의 {{t:standard-deviation|표준편차}}가 {{n:var.sd}}입니다. {{n:var.hands.k}}k 핸드(100핸드 블록 {{n:var.blocks}}개) 후 결과의 {{t:standard-deviation|표준편차}}는 얼마입니까?"

## [23] lessons/m12-l1-wariancja.md:29
NOWE:     prompt: "윈레이트 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}} {{n:var.sd}}입니다. {{n:var.hands.k}},000핸드 후 결과는 약 {{n:var.conf95}} 신뢰도로 어느 구간에 들어갑니까?"
STARE:     prompt: "윈레이트 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}} {{n:var.sd}}입니다. {{n:var.hands.k}}k 핸드 후 결과는 약 {{n:var.conf95}} 신뢰도로 어느 구간에 들어갑니까?"

## [24] lessons/m12-l1-wariancja.md:31
NOWE:       - { text: "약 {{n:var.ci.low.bi}}~약 {{n:var.ci.high.bi}} {{t:buy-in|바이인}}", correct: true, why: "기대 결과 {{n:var.exp.bi}} {{t:buy-in|바이인}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. 확실히 이기는 플레이어라도 {{n:var.hands.k}},000핸드 후 거의 본전일 수 있습니다." }
STARE:       - { text: "약 {{n:var.ci.low.bi}}~약 {{n:var.ci.high.bi}} {{t:buy-in|바이인}}", correct: true, why: "기대 결과 {{n:var.exp.bi}} {{t:buy-in|바이인}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. 확실히 이기는 플레이어라도 {{n:var.hands.k}}k 핸드 후 거의 본전일 수 있습니다." }

## [25] lessons/m12-l1-wariancja.md:38
NOWE:     prompt: "{{t:standard-deviation|표준편차}} {{n:var.sd}}로 {{n:var.hands.k}},000핸드(100핸드 블록 {{n:var.blocks}}개)를 플레이한 후, bb/100 단위 윈레이트의 표준오차는 얼마입니까? √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}으로 계산하세요. 숫자를 입력하세요."
STARE:     prompt: "{{t:standard-deviation|표준편차}} {{n:var.sd}}로 {{n:var.hands.k}}k 핸드(100핸드 블록 {{n:var.blocks}}개)를 플레이한 후, bb/100 단위 윈레이트의 표준오차는 얼마입니까? √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}로 계산하세요. 숫자를 입력하세요."

## [26] lessons/m12-l1-wariancja.md:45
NOWE:     prompt: "{{n:var.hands.k}},000핸드 후 결과는 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 실제 윈레이트에 대해 무엇을 알 수 있습니까?"
STARE:     prompt: "{{n:var.hands.k}}k 핸드 후 결과는 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 실제 윈레이트에 대해 무엇을 알 수 있습니까?"

## [27] lessons/m12-l1-wariancja.md:47
NOWE:       - { text: "약 {{n:var.conf95}} 신뢰도로 약 {{n:var.wr.ci.low}}~약 {{n:var.wr.ci.high}} 사이에 있다", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. {{n:var.hands.k}},000핸드 후에는 아마 지고 있지 않다는 것만 알 수 있습니다." }
STARE:       - { text: "약 {{n:var.conf95}} 신뢰도로 약 {{n:var.wr.ci.low}}~약 {{n:var.wr.ci.high}} 사이에 있다", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. {{n:var.hands.k}}k 핸드 후에는 아마 지고 있지 않다는 것만 알 수 있습니다." }

## [28] lessons/m12-l1-wariancja.md:48
NOWE:       - { text: "표본이 크므로 {{n:var.wr.ex}}이다", why: "{{n:var.hands.k}},000핸드는 많아 보이지만, {{t:standard-deviation|표준편차}}가 {{n:var.sd}}이면 오차는 여전히 약 ± {{n:var.ci.wr}}입니다." }
STARE:       - { text: "표본이 크므로 {{n:var.wr.ex}}이다", why: "{{n:var.hands.k}}k 핸드는 많아 보이지만, {{t:standard-deviation|표준편차}}가 {{n:var.sd}}이면 오차는 여전히 약 ± {{n:var.ci.wr}}입니다." }

## [29] lessons/m12-l1-wariancja.md:49
NOWE:       - { text: "아무것도 알 수 없다. 포커의 결과는 순전히 운이다", why: "과장입니다. 표본은 구간을 좁히지만 느리게 좁힙니다: 오차는 핸드 수의 제곱근에 반비례해 줄어듭니다." }
STARE:       - { text: "아무것도 알 수 없다. 포커의 결과는 순전히 운이다", why: "과장입니다. 표본은 구간을 좁히지만 느리게 좁힙니다: 오차는 핸드 수의 제곱근에 비례해 줄어듭니다." }

## [30] lessons/m12-l1-wariancja.md:56
NOWE:       - { text: "약 {{n:var.need.hands.k}},000핸드", correct: true, why: "블록 = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. 즉 약 {{n:var.need.hands.k}},000핸드입니다." }
STARE:       - { text: "약 {{n:var.need.hands.k}}k", correct: true, why: "블록 = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. 즉 약 {{n:var.need.hands.k}}k 핸드입니다." }

## [31] lessons/m12-l1-wariancja.md:57
NOWE:       - { text: "약 {{n:var.hands.k}},000핸드", why: "{{n:var.hands.k}},000핸드 후 오차는 약 ± {{n:var.ci.wr}}입니다. 이를 ± {{n:var.target}}로 줄이려면 약 {{n:var.need.hands.k}},000핸드가 필요합니다." }
STARE:       - { text: "약 {{n:var.hands.k}}k", why: "{{n:var.hands.k}}k 핸드 후 오차는 약 ± {{n:var.ci.wr}}입니다. 이를 ± {{n:var.target}}로 줄이려면 약 {{n:var.need.hands.k}}k 핸드가 필요합니다." }

## [32] lessons/m12-l1-wariancja.md:58
NOWE:       - { text: "약 {{n:var.need.blocks}}핸드", why: "이는 100핸드 블록의 수입니다. 핸드 수는 그 100배, 즉 약 {{n:var.need.hands.k}},000입니다." }
STARE:       - { text: "약 {{n:var.need.blocks}}핸드", why: "이는 100핸드 블록의 수입니다. 핸드 수는 그 100배, 즉 약 {{n:var.need.hands.k}}k입니다." }

## [33] lessons/m12-l1-wariancja.md:63
NOWE:     prompt: "윈레이트 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}} {{n:var.sd}}인 플레이어가 있습니다. {{n:var.hands.k}},000핸드 동안 최고점에서 {{t:buy-in|바이인}} {{n:dd.bi.small}}개 이상 떨어지는 {{t:downswing}}을 얼마나 자주 겪습니까?"
STARE:     prompt: "윈레이트 {{n:var.wr.ex}}, {{t:standard-deviation|표준편차}} {{n:var.sd}}인 플레이어가 있습니다. {{n:var.hands.k}}k 핸드 동안 최고점에서 {{t:buy-in|바이인}} {{n:dd.bi.small}}개 이상 떨어지는 {{t:downswing}}을 얼마나 자주 겪습니까?"

## [34] lessons/m12-l1-wariancja.md:65
NOWE:       - { text: "거의 항상, 약 {{n:dd.p.small.100k}}", correct: true, why: "이 조건으로 {{n:var.hands.k}},000핸드를 시뮬레이션하면 약 {{n:dd.p.small.100k}}의 실행에서 이런 {{t:downswing}}이 나타납니다. {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing|다운스윙}}은 이기는 플레이어의 게임에서 정상적인 일부입니다." }
STARE:       - { text: "거의 항상, 약 {{n:dd.p.small.100k}}", correct: true, why: "이 조건으로 {{n:var.hands.k}}k 핸드를 시뮬레이션하면 약 {{n:dd.p.small.100k}}의 실행에서 이런 {{t:downswing}}이 나타납니다. {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing|다운스윙}}은 이기는 플레이어의 게임에서 정상적인 일부입니다." }

## [35] lessons/m12-l1-wariancja.md:66
NOWE:       - { text: "약 {{n:dd.p.small.20k}}의 경우", why: "이는 더 짧은 표본인 {{n:dd.hands.short.k}},000핸드의 수치입니다. {{n:var.hands.k}},000핸드에서는 깊은 {{t:downswing}}이 올 기회가 훨씬 많아 약 {{n:dd.p.small.100k}}입니다." }
STARE:       - { text: "약 {{n:dd.p.small.20k}}의 경우", why: "이는 더 짧은 표본인 {{n:dd.hands.short.k}}k 핸드의 수치입니다. {{n:var.hands.k}}k 핸드에서는 깊은 {{t:downswing}}이 올 기회가 훨씬 많아 약 {{n:dd.p.small.100k}}입니다." }

## [36] lessons/m12-l1-wariancja.md:67
NOWE:       - { text: "드물다, 약 {{n:var.p.lose}}", why: "이는 윈레이트 {{n:var.wr.ex}}인 플레이어가 {{n:var.hands.k}},000핸드를 마이너스로 마치는 드문 확률입니다. 도중의 {{t:downswing|다운스윙}}은 다른 문제로, 거의 항상 일어납니다." }
STARE:       - { text: "드물다, 약 {{n:var.p.lose}}", why: "이는 윈레이트 {{n:var.wr.ex}}인 플레이어가 {{n:var.hands.k}}k 핸드를 마이너스로 마치는 드문 확률입니다. 도중의 {{t:downswing|다운스윙}}은 다른 문제로, 거의 항상 일어납니다." }

## [37] lessons/m12-l1-wariancja.md:72
NOWE:     prompt: "두 플레이어, {{t:standard-deviation|표준편차}} {{n:var.sd}}, {{n:var.hands.k}},000핸드. 한 명은 윈레이트 {{n:var.wr.ex}}, 다른 한 명은 {{n:dd.wr-low}}로 이깁니다. 각자 {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}을 얼마나 자주 겪습니까?"
STARE:     prompt: "두 플레이어, {{t:standard-deviation|표준편차}} {{n:var.sd}}, {{n:var.hands.k}}k 핸드. 한 명은 윈레이트 {{n:var.wr.ex}}, 다른 한 명은 {{n:dd.wr-low}}로 이깁니다. 각자 {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}을 얼마나 자주 겪습니까?"

## [38] lessons/m12-l1-wariancja.md:76
NOWE:       - { text: "둘 다 겪지 않는다. {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}은 지는 플레이어에게만 일어난다", why: "사실이 아닙니다. 윈레이트 {{n:var.wr.ex}}인 플레이어도 {{n:var.hands.k}},000핸드 표본의 약 {{n:dd.p.big.100k}}에서 이를 겪습니다." }
STARE:       - { text: "둘 다 겪지 않는다. {{t:buy-in|바이인}} {{n:dd.bi.big}}개 규모의 {{t:downswing}}은 지는 플레이어에게만 일어난다", why: "사실이 아닙니다. 윈레이트 {{n:var.wr.ex}}인 플레이어도 {{n:var.hands.k}}k 핸드 표본의 약 {{n:dd.p.big.100k}}에서 이를 겪습니다." }

## [39] lessons/m12-l1-wariancja.md:83
NOWE:       - { text: "{{t:downswing}}만으로는 아무것도 단정할 수 없다. 진 핸드에서 내린 결정을 검토한다", correct: true, why: "{{n:var.hands.k}},000핸드 동안 {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing|다운스윙}}은 윈레이트 {{n:dd.wr-low}}~{{n:var.wr.ex}}로 이기는 거의 모든 플레이어에게 찾아옵니다(SD {{n:var.sd}} 시뮬레이션). 잘하고 있는지는 결과 자체가 아니라 결정 검토로 알 수 있습니다." }
STARE:       - { text: "{{t:downswing}}만으로는 아무것도 단정할 수 없다. 진 핸드에서 내린 결정을 검토한다", correct: true, why: "{{n:var.hands.k}}k 핸드 동안 {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing|다운스윙}}은 윈레이트 {{n:dd.wr-low}}~{{n:var.wr.ex}}로 이기는 거의 모든 플레이어에게 찾아옵니다(SD {{n:var.sd}} 시뮬레이션). 잘하고 있는지는 결과 자체가 아니라 결정 검토로 알 수 있습니다." }

## [40] lessons/m12-l1-wariancja.md:84
NOWE:       - { text: "플레이가 나쁘므로 스타일 전체를 바꿔야 한다", why: "이 정도 크기의 {{t:downswing|다운스윙}}은 윈레이트 {{n:var.wr.ex}}(SD {{n:var.sd}})로 이기는 플레이어에게도 {{n:var.hands.k}},000핸드 표본의 약 {{n:dd.p.small.100k}}에서 일어납니다. 결과만 보고 스타일을 바꾸는 것은 노이즈에 반응하는 것입니다." }
STARE:       - { text: "플레이가 나쁘므로 스타일 전체를 바꿔야 한다", why: "이 정도 크기의 {{t:downswing|다운스윙}}은 윈레이트 {{n:var.wr.ex}}(SD {{n:var.sd}})로 이기는 플레이어에게도 {{n:var.hands.k}}k 핸드 표본의 약 {{n:dd.p.small.100k}}에서 일어납니다. 결과만 보고 스타일을 바꾸는 것은 노이즈에 반응하는 것입니다." }

## [41] lessons/m12-l1-wariancja.md:94
NOWE:       - { text: "100핸드당 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}", why: "이는 100핸드당이 아니라 {{n:var.hands.k}},000핸드 후 결과의 {{t:standard-deviation|표준편차}}입니다." }
STARE:       - { text: "100핸드당 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}", why: "이는 100핸드당이 아니라 {{n:var.hands.k}}k 핸드 후 결과의 {{t:standard-deviation|표준편차}}입니다." }

## [42] lessons/m12-l1-wariancja.md:114
NOWE: 예: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}},000핸드, 즉 {{n:var.blocks}}블록입니다. 기대 결과는 {{n:var.exp.bb}}, 즉 {{t:buy-in|바이인}} {{n:var.exp.bi}}개입니다. 결과의 {{t:standard-deviation|표준편차}}는 {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, 즉 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}입니다. {{n:var.conf95}} 신뢰도로 결과는 약 **{{n:var.ci.low.bi}}~{{n:var.ci.high.bi}} {{t:buy-in|바이인}}** 사이가 됩니다. 기대 결과는 0보다 약 {{n:var.z.lose}} {{t:standard-deviation|표준편차}} 위에 있으므로, {{n:var.hands.k}},000핸드 후 마이너스일 확률은 약 {{n:var.p.lose}}입니다.
STARE: 예: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}}k 핸드, 즉 {{n:var.blocks}}블록입니다. 기대 결과는 {{n:var.exp.bb}}, 즉 {{t:buy-in|바이인}} {{n:var.exp.bi}}개입니다. 결과의 {{t:standard-deviation|표준편차}}는 {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, 즉 약 {{n:var.sd.result.bi}} {{t:buy-in|바이인}}입니다. {{n:var.conf95}} 신뢰도로 결과는 약 **{{n:var.ci.low.bi}}~{{n:var.ci.high.bi}} {{t:buy-in|바이인}}** 사이가 됩니다. 기대 결과는 0보다 약 {{n:var.z.lose}} {{t:standard-deviation|표준편차}} 위에 있으므로, {{n:var.hands.k}}k 핸드 후 마이너스일 확률은 약 {{n:var.p.lose}}입니다.

## [43] lessons/m12-l1-wariancja.md:118
NOWE: 같은 계산을 반대로 적용할 수도 있습니다. 윈레이트 추정 오차는 핸드 수의 제곱근에 반비례해 줄어듭니다.
STARE: 같은 계산을 반대로 적용할 수도 있습니다. 윈레이트 추정 오차는 핸드 수의 제곱근에 비례해 줄어듭니다.

## [44] lessons/m12-l1-wariancja.md:125
NOWE: {{n:var.hands.k}},000핸드 후 오차는 약 {{n:var.se.wr}}이므로, {{n:var.conf95}} 구간은 ± {{n:var.ci.wr}}입니다. 이때 {{n:var.wr.ex}}라는 결과는 실제 윈레이트가 약 {{n:var.wr.ci.low}}~{{n:var.wr.ci.high}} 사이 어딘가에 있다는 뜻일 뿐입니다. ± {{n:var.target}} 정확도로 윈레이트를 알려면 약 **{{n:var.need.hands.k}},000핸드**가 필요합니다.
STARE: {{n:var.hands.k}}k 핸드 후 오차는 약 {{n:var.se.wr}}이므로, {{n:var.conf95}} 구간은 ± {{n:var.ci.wr}}입니다. 이때 {{n:var.wr.ex}}라는 결과는 실제 윈레이트가 약 {{n:var.wr.ci.low}}~{{n:var.wr.ci.high}} 사이 어딘가에 있다는 뜻일 뿐입니다. ± {{n:var.target}} 정확도로 윈레이트를 알려면 약 **{{n:var.need.hands.k}}k 핸드**가 필요합니다.

## [45] lessons/m12-l1-wariancja.md:131
NOWE: | 최고점 대비 {{t:downswing|다운스윙}} | {{n:dd.hands.short.k}},000핸드 | {{n:var.hands.k}},000핸드 | {{n:dd.wr-low}}일 때 {{n:var.hands.k}},000핸드 |
STARE: | 최고점 대비 {{t:downswing|다운스윙}} | {{n:dd.hands.short.k}}k 핸드 | {{n:var.hands.k}}k 핸드 | {{n:dd.wr-low}}일 때 {{n:var.hands.k}}k 핸드 |

## [46] lessons/m12-l1-wariancja.md:137
NOWE: 시뮬레이션 결과입니다. 각 블록의 결과를 무작위로 정해 {{n:var.hands.k}},000핸드씩 수천 번 실행했습니다. 실제 결과는 100핸드마다가 아니라 핸드마다 바뀌므로, 실제 {{t:downswing|다운스윙}}은 조금 더 깊을 수 있습니다. 결론: {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing}}이 플레이를 못한다는 증거는 아닙니다.
STARE: 시뮬레이션 결과입니다. 각 블록의 결과를 무작위로 정해 {{n:var.hands.k}}k 핸드씩 수천 번 실행했습니다. 실제 결과는 100핸드마다가 아니라 핸드마다 바뀌므로, 실제 {{t:downswing|다운스윙}}은 조금 더 깊을 수 있습니다. 결론: {{t:buy-in|바이인}} {{n:dd.bi.small}}개 규모의 {{t:downswing}}이 플레이를 못한다는 증거는 아닙니다.

## [47] lessons/m12-l2-decyzja-wynik.md:68
NOWE:       - { text: "네, 결과가 무엇이 통하는지 보여 줍니다", why: "몇 {{t:session|세션}}의 결과는 대부분 노이즈입니다. 약 {{n:var.sd}}의 {{t:standard-deviation|표준편차}}에서는 {{n:var.hands.k}},000핸드도 약 ± {{n:var.ci.wr}}의 오차를 남깁니다." }
STARE:       - { text: "네, 결과가 무엇이 통하는지 보여 줍니다", why: "몇 {{t:session|세션}}의 결과는 대부분 노이즈입니다. 약 {{n:var.sd}}의 {{t:standard-deviation|표준편차}}에서는 {{n:var.hands.k}}천 핸드도 약 ± {{n:var.ci.wr}}의 오차를 남깁니다." }

## [48] lessons/m12-l3-tilt.md:35
NOWE:       - { text: "합리적인 계획입니다. 더 높은 {{t:stakes|스테이크}}가 손실을 더 빨리 만회해 주니까요", why: "더 높은 {{t:stakes|스테이크}}는 변동 폭도 키우고, 결정은 나쁜 상태에서 내리게 됩니다. 손실 후 스테이크를 올리는 것은 신중한 {{t:bankroll|뱅크롤}} 관리와 정반대입니다(뱅크롤과 위험 레슨)." }
STARE:       - { text: "합리적인 계획입니다. 더 높은 {{t:stakes|스테이크}}가 손실을 더 빨리 만회해 주니까요", why: "더 높은 {{t:stakes|스테이크}}는 변동 폭도 키우고, 결정은 나쁜 상태에서 내리게 됩니다. 손실 후 스테이크를 올리는 것은 신중한 {{t:bankroll|뱅크롤}} 관리와 정반대입니다(뱅크롤과 리스크 레슨)." }

## [49] lessons/m12-l4-bankroll.md:32
NOWE:       - { text: "뱅크롤이 같으므로 약 {{n:ror.base}}", why: "위험은 윈레이트 × 뱅크롤의 곱에 따라 달라집니다. 윈레이트가 낮으면 뱅크롤이 작은 것과 같은 효과가 있어 약 {{n:ror.base.wr-min}}가 나옵니다." }
STARE:       - { text: "뱅크롤이 같으므로 약 {{n:ror.base}}", why: "위험은 윈레이트 × 뱅크롤의 곱에 따라 달라집니다. 윈레이트가 낮으면 뱅크롤이 작은 것과 같은 효과가 있어 약 {{n:ror.base.wr-min}}이 나옵니다." }

## [50] lessons/m12-l4-bankroll.md:41
NOWE:       - { text: "뱅크롤에만 달려 있으므로 약 {{n:ror.base}}", why: "그 값은 {{n:var.wr.typical.high}}일 때만 나옵니다. {{n:var.wr.typical.low}}에서는 같은 뱅크롤로 약 {{n:ror.base.wr-min}}가 됩니다." }
STARE:       - { text: "뱅크롤에만 달려 있으므로 약 {{n:ror.base}}", why: "그 값은 {{n:var.wr.typical.high}}일 때만 나옵니다. {{n:var.wr.typical.low}}에서는 같은 뱅크롤로 약 {{n:ror.base.wr-min}}이 됩니다." }

## [51] lessons/m12-l4-bankroll.md:47
NOWE:     prompt: "{{n:br.bi.base}} {{t:buy-in|바이인}}으로 이 {{t:stakes|스테이크}}를 시작했습니다. {{t:downswing|다운스윙}} 후 {{n:br.ex.below}}가 남았습니다. 어떻게 하겠습니까?"
STARE:     prompt: "{{n:br.bi.base}} {{t:buy-in|바이인}}으로 이 {{t:stakes|스테이크}}를 시작했습니다. {{t:downswing|다운스윙}} 후 {{n:br.ex.below}}이 남았습니다. 어떻게 하겠습니까?"

## [52] lessons/m12-l4-bankroll.md:51
NOWE:       - { text: "빨리 만회하려고 더 높은 {{t:stakes|스테이크}}로 올라갑니다", why: "절박함 틸트입니다. {{t:buy-in|바이인}} 기준으로 뱅크롤이 더 작은 상태에서 더 높은 {{t:stakes|스테이크}}로 가면 {{t:risk-of-ruin|파산 위험}}이 급격히 커집니다." }
STARE:       - { text: "빨리 만회하려고 더 높은 {{t:stakes|스테이크}}로 올라갑니다", why: "절박함에서 오는 틸트입니다. {{t:buy-in|바이인}} 기준으로 뱅크롤이 더 작은 상태에서 더 높은 {{t:stakes|스테이크}}로 가면 {{t:risk-of-ruin|파산 위험}}이 급격히 커집니다." }

## [53] lessons/m12-l4-bankroll.md:58
NOWE:       - { text: "{{t:stakes|스테이크}}에 남아 진 핸드의 결정을 검토합니다", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|바이인}}은 여전히 가장 늦은 하향 기준인 {{n:br.bi.move-down}}보다 많습니다. 시뮬레이션에서 이런 {{t:downswing|다운스윙}}은 {{n:var.hands.k}},000핸드 동안 {{n:var.wr.ex}}로 이기는 플레이어의 약 {{n:dd.p.small.100k}}에게 일어나며, 핸드 검토로 실수 때문인지 확인할 수 있습니다." }
STARE:       - { text: "{{t:stakes|스테이크}}에 남아 진 핸드의 결정을 검토합니다", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|바이인}}은 여전히 가장 늦은 하향 기준인 {{n:br.bi.move-down}}보다 많습니다. 시뮬레이션에서 이런 {{t:downswing|다운스윙}}은 {{n:var.hands.k}}k 핸드 동안 {{n:var.wr.ex}}로 이기는 플레이어의 약 {{n:dd.p.small.100k}}에게 일어나며, 핸드 검토로 실수 때문인지 확인할 수 있습니다." }

## [54] lessons/m12-l4-bankroll.md:102
NOWE:       - { text: "진 뒤에 손실을 되찾으려고 다시 플레이합니다", correct: true, why: "손실을 되찾으려는 플레이는 진단 기준에 나열된 도박 문제의 신호 중 하나입니다. 자신에게서 이런 신호를 발견하면 ‘책임감 있는 게임’ 안내에 있는 연락처를 이용하세요." }
STARE:       - { text: "진 뒤에 손실을 되찾으려고 다시 플레이합니다", correct: true, why: "손실을 되찾으려는 플레이는 진단 기준에 나열된 도박 문제의 신호 중 하나입니다. 자신에게서 이런 신호를 발견하면 이 레슨 끝의 ‘책임감 있는 게임’ 안내에 있는 연락처를 이용하세요." }

## [55] lessons/m12-l4-bankroll.md:137
NOWE: 기준을 미리 정하세요. 늦어도 뱅크롤이 계획한 {{t:buy-in|바이인}} 수의 **절반**으로 떨어지면(예: {{n:br.bi.base}}에서 {{n:br.bi.move-down}}로) {{t:stakes|스테이크}}를 한 단계 내립니다. 자료에 따라 기준은 절반부터 뱅크롤 전체까지 다양하며, 절반이 그중 가장 늦은 기준입니다. 두 배 낮은 {{t:stakes|스테이크}}에서는 같은 뱅크롤이 그 스테이크의 {{t:buy-in|바이인}}으로 세면 다시 계획한 수에 거의 가깝습니다. 다시 올라가는 것은 빨라도 더 높은 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 기준으로 뱅크롤을 전부 갖췄을 때입니다. 일부 자료는 {{n:dd.bi.small}} {{t:buy-in|바이인}}을 잃은 시점에 더 일찍 내리라고 권합니다. 절반 기준 전에 내리는 것은 실수가 아닙니다.
STARE: 기준을 미리 정하세요. 늦어도 뱅크롤이 계획한 {{t:buy-in|바이인}} 수의 **절반**으로 떨어지면(예: {{n:br.bi.base}}에서 {{n:br.bi.move-down}}으로) {{t:stakes|스테이크}}를 한 단계 내립니다. 자료에 따라 기준은 절반부터 뱅크롤 전체까지 다양하며, 절반이 그중 가장 늦은 기준입니다. 두 배 낮은 {{t:stakes|스테이크}}에서는 같은 뱅크롤이 그 스테이크의 {{t:buy-in|바이인}}으로 세면 다시 계획한 수에 거의 가깝습니다. 다시 올라가는 것은 빨라도 더 높은 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 기준으로 뱅크롤을 전부 갖췄을 때입니다. 일부 자료는 {{n:dd.bi.small}} {{t:buy-in|바이인}}을 잃은 시점에 더 일찍 내리라고 권합니다. 절반 기준 전에 내리는 것은 실수가 아닙니다.

## [56] lessons/m12-l4-bankroll.md:141
NOWE: 처음에는 시간의 약 {{n:study.beginner}}를 공부에, 나머지를 플레이에 씁니다. 자신의 {{t:stakes|스테이크}}에서 이기고 있다면 이상적인 비중은 약 {{n:study.winner}}이지만, 공부가 {{n:study.min}} 미만이 되어서는 안 됩니다.
STARE: 처음에는 시간의 약 {{n:study.beginner}}을 공부에, 나머지를 플레이에 씁니다. 자신의 {{t:stakes|스테이크}}에서 이기고 있다면 이상적인 비중은 약 {{n:study.winner}}이지만, 공부가 {{n:study.min}} 미만이 되어서는 안 됩니다.

## [57] rules.yaml R-M12-003
NOWE:
```
- id: R-M12-003
  module: m12
  if: "실제로 얼마나 이기는지 알고 싶을 때"
  then: "수십만 핸드를 모읍니다: {{n:var.conf95}} 신뢰도로 ± {{n:var.target}} 정확도를 얻으려면 약 {{n:var.need.hands.k}},000핸드가 필요합니다"
  because: "추정 오차는 핸드 수의 제곱근에 반비례해 줄어듭니다: 필요한 100핸드 블록 수 = ({{n:var.z95}} × SD ÷ 정확도)²"
  level: math
  source: "계산: (1.96 × 80 ÷ 2)² 블록; 문서 08의 규모와 일치(약 615,000핸드)"
  sources: [{ kind: math }]
```
STARE:
```
- id: R-M12-003
  module: m12
  if: "실제로 얼마나 이기는지 알고 싶을 때"
  then: "수십만 핸드를 모읍니다: {{n:var.conf95}} 신뢰도로 ± {{n:var.target}} 정확도를 얻으려면 약 {{n:var.need.hands.k}},000핸드가 필요합니다"
  because: "추정 오차는 핸드 수의 제곱근에 비례해 줄어듭니다: 필요한 100핸드 블록 수 = ({{n:var.z95}} × SD ÷ 정확도)²"
  level: math
  source: "계산: (1.96 × 80 ÷ 2)² 블록; 문서 08의 규모와 일치(약 615,000핸드)"
  sources: [{ kind: math }]
```

## [58] rules.yaml R-M12-007
NOWE:
```
- id: R-M12-007
  module: m12
  if: "연패 후 더 이상 차분하게 결정을 평가하지 못할 때(예: 본전 찾을 생각만 하거나, 평소라면 {{t:fold|폴드}}할 핸드를 플레이할 때)"
  then: "{{t:session|세션}}을 끝냅니다"
  because: "이 상태로 계속하는 것은 자신의 가장 낮은 수준(C-게임)으로 플레이하는 것이며, 목표는 명확하게 생각하는 능력을 잃기 전에 일찍 그만두는 것입니다"
  level: heuristic
  source: "Tendler와 Carter, The Mental Game of Poker(2011), “Inchworm” 발췌(온라인 공개 발췌): “quit sooner when it's no longer possible to recover a solid thought process”"
  sources: [{ kind: book }]
```
STARE:
```
- id: R-M12-007
  module: m12
  if: "연패 후 더 이상 차분하게 결정을 평가하지 못할 때(예: 본전 찾을 생각만 하거나, 평소라면 {{t:fold|폴드}}할 핸드를 플레이할 때)"
  then: "{{t:session|세션}}을 끝냅니다"
  because: "이 상태로 계속하는 것은 가장 낮은 수준(C-게임)으로 플레이하는 것이며, 목표는 명확하게 생각하는 능력을 잃기 전에 일찍 그만두는 것입니다"
  level: heuristic
  source: "Tendler와 Carter, The Mental Game of Poker(2011), “Inchworm” 발췌(온라인 공개 발췌): “quit sooner when it's no longer possible to recover a solid thought process”"
  sources: [{ kind: book }]
```

## [59] rules.yaml R-M12-011
NOWE:
```
- id: R-M12-011
  module: m12
  if: "뱅크롤이 계획한 {{t:buy-in|바이인}} 수의 절반으로 떨어질 때({{n:br.bi.base}}에서 {{n:br.bi.move-down}}로)"
  then: "늦어도 그때 {{t:stakes|스테이크}}를 한 단계 내리고, 빨라도 상위 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 기준으로 뱅크롤이 다 찼을 때 다시 올립니다"
  because: "{{n:var.hands.k}},000핸드 동안 {{n:dd.bi.small}} {{t:buy-in|바이인}}의 {{t:downswing|다운스윙}}은 윈레이트 {{n:dd.wr-low}}~{{n:var.wr.ex}}로 이기는 거의 모든 플레이어에게 일어나며(SD {{n:var.sd}} 시뮬레이션), 일부 출처는 이 정도 손실에서 이미 내리라고 권합니다. 또 {{n:br.bi.move-down}} {{t:buy-in|바이인}}에서는 나머지를 잃을 위험이 약 {{n:ror.base}}에서 약 {{n:ror.half}}로 커집니다(윈레이트 {{n:var.wr.typical.high}}, SD {{n:var.sd}} 기준)"
  level: heuristic
  source: "교육 사이트, Bankroll Management(“half the roll, which is the point to move down a stake”); 교육 사이트, Poker Bankroll Management Strategy(3bb/100에서 30 바이인일 때 내림, 즉 뱅크롤이 다 찬 상태 기준); 포커 계산기 사이트, Risk of Ruin Formula for Poker Players(“Losing 10 should trigger a move down”); 파산 위험 계산과 다운스윙 시뮬레이션"
  sources: [{ kind: training }, { kind: training }, { kind: training }, { kind: math }]
```
STARE:
```
- id: R-M12-011
  module: m12
  if: "뱅크롤이 계획한 {{t:buy-in|바이인}} 수의 절반으로 떨어질 때({{n:br.bi.base}}에서 {{n:br.bi.move-down}}으로)"
  then: "늦어도 그때 {{t:stakes|스테이크}}를 한 단계 내리고, 빨라도 상위 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 기준으로 뱅크롤이 다 찼을 때 다시 올립니다"
  because: "{{n:var.hands.k}},000핸드 동안 {{n:dd.bi.small}} {{t:buy-in|바이인}}의 {{t:downswing|다운스윙}}은 윈레이트 {{n:dd.wr-low}}~{{n:var.wr.ex}}로 이기는 거의 모든 플레이어에게 일어나며(SD {{n:var.sd}} 시뮬레이션), 일부 출처는 이 정도 손실에서 이미 내리라고 권합니다. 또 {{n:br.bi.move-down}} {{t:buy-in|바이인}}에서는 나머지를 잃을 위험이 약 {{n:ror.base}}에서 약 {{n:ror.half}}로 커집니다(윈레이트 {{n:var.wr.typical.high}}, SD {{n:var.sd}} 기준)"
  level: heuristic
  source: "교육 사이트, Bankroll Management(“half the roll, which is the point to move down a stake”); 교육 사이트, Poker Bankroll Management Strategy(3bb/100에서 30 바이인일 때 내림, 즉 뱅크롤이 다 찬 상태 기준); 포커 계산기 사이트, Risk of Ruin Formula for Poker Players(“Losing 10 should trigger a move down”); 파산 위험 계산과 다운스윙 시뮬레이션"
  sources: [{ kind: training }, { kind: training }, { kind: training }, { kind: math }]
```
