---
id: m12.l1
module: m12
order: 1
title: "Variance in numbers"
sub: "What a result over thousands of hands tells you"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "You win {{n:var.wr.ex}} on average and will play {{n:var.hands.k}}k hands. How many {{t:buy-in|buy-ins}} ({{n:format.stack}} each) is your expected result? Enter a number."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}}k hands is {{n:var.blocks}} blocks of 100 hands. Expected result = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, or {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. This is an average: your actual result can be far from it."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "The {{t:standard-deviation}} of your game is {{n:var.sd}}. What is the {{t:standard-deviation}} of your result after {{n:var.hands.k}}k hands ({{n:var.blocks}} blocks of 100 hands)?"
    options:
      - { text: "About {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "The {{t:standard-deviation}} grows with the square root of the number of blocks: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, or about {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
      - { text: "About {{n:var.sd.wrong.bi}} {{t:buy-in|buy-ins}}", why: "That is what you get if you multiply the {{t:standard-deviation}} by the number of blocks. Random swings partly cancel out, so you multiply by the square root: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "About {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "That is the expected result at {{n:var.wr.ex}}, not its {{t:standard-deviation}}. The {{t:standard-deviation}} is about {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "You win {{n:var.wr.ex}} with a {{t:standard-deviation}} of {{n:var.sd}}. In what range will your result after {{n:var.hands.k}}k hands fall with about {{n:var.conf95}} confidence?"
    options:
      - { text: "From about {{n:var.ci.low.bi}} to about {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Expected result {{n:var.exp.bi}} {{t:buy-in|buy-ins}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Even a clearly winning player can be close to break-even after {{n:var.hands.k}}k hands." }
      - { text: "From about {{n:var.ci68.low.bi}} to about {{n:var.ci68.high.bi}} {{t:buy-in|buy-ins}}", why: "That is the range of one {{t:standard-deviation}}: it covers only about 2 in 3 results. For {{n:var.conf95}}, you take {{n:var.z95}} {{t:standard-deviation|standard deviations}}: from about {{n:var.ci.low.bi}} to about {{n:var.ci.high.bi}}." }
      - { text: "Exactly {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "That is only the average. The result swings around it by dozens of {{t:buy-in|buy-ins}} in both directions." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "After {{n:var.hands.k}}k hands ({{n:var.blocks}} blocks of 100) with a {{t:standard-deviation}} of {{n:var.sd}}: what is the standard error of your winrate in bb/100? Use √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Enter a number."
    answer: var.se.wr
    explanation: "Standard error = SD ÷ √(number of blocks) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. The {{n:var.conf95}} range is ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "After {{n:var.hands.k}}k hands, your result is {{n:var.wr.ex}}, {{t:standard-deviation}} {{n:var.sd}}. What do you know about your true winrate?"
    options:
      - { text: "With about {{n:var.conf95}} confidence, it lies between about {{n:var.wr.ci.low}} and about {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. After {{n:var.hands.k}}k hands, you only know that you are probably not losing." }
      - { text: "It is {{n:var.wr.ex}}, because the sample is large", why: "{{n:var.hands.k}}k hands sounds like a lot, but with a {{t:standard-deviation}} of {{n:var.sd}}, the error is still about ± {{n:var.ci.wr}}." }
      - { text: "Nothing, results in poker are pure luck", why: "An exaggeration. The sample narrows the range, just slowly: the error shrinks with the square root of the number of hands." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "You want to know your winrate to within ± {{n:var.target}} with {{n:var.conf95}} confidence. The {{t:standard-deviation}} is {{n:var.sd}}. How many hands do you need?"
    options:
      - { text: "About {{n:var.need.hands.k}}k", correct: true, why: "Blocks = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. That is about {{n:var.need.hands.k}}k hands." }
      - { text: "About {{n:var.hands.k}}k", why: "After {{n:var.hands.k}}k hands, the error is about ± {{n:var.ci.wr}}. To reduce it to ± {{n:var.target}}, you need about {{n:var.need.hands.k}}k hands." }
      - { text: "About {{n:var.need.blocks}} hands", why: "That is the number of blocks of 100 hands. There are a hundred times more hands: about {{n:var.need.hands.k}}k." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "A player wins {{n:var.wr.ex}} with a {{t:standard-deviation}} of {{n:var.sd}}. How often over {{n:var.hands.k}}k hands will they have a {{t:downswing}} of at least {{n:dd.bi.small}} {{t:buy-in|buy-ins}} from their peak?"
    options:
      - { text: "Almost always, about {{n:dd.p.small.100k}}", correct: true, why: "A simulation of {{n:var.hands.k}}k hands with these parameters produces such a {{t:downswing}} in about {{n:dd.p.small.100k}} of runs. A {{t:downswing}} of {{n:dd.bi.small}} {{t:buy-in|buy-ins}} is a normal part of a winning player's game." }
      - { text: "In about {{n:dd.p.small.20k}} of cases", why: "That is the figure for a shorter sample, {{n:dd.hands.short.k}}k hands. Over {{n:var.hands.k}}k hands, there are many more chances for a deep {{t:downswing}}: about {{n:dd.p.small.100k}}." }
      - { text: "Rarely, about {{n:var.p.lose}}", why: "That is how rarely a {{n:var.wr.ex}} player finishes {{n:var.hands.k}}k hands in the red. A {{t:downswing}} along the way is something else: it happens almost always." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Two players, {{t:standard-deviation}} {{n:var.sd}}, {{n:var.hands.k}}k hands. One wins {{n:var.wr.ex}}, the other {{n:dd.wr-low}}. How often will each of them hit a {{t:downswing}} of {{n:dd.bi.big}} {{t:buy-in|buy-ins}}?"
    options:
      - { text: "The first in about {{n:dd.p.big.100k}}, the second in about {{n:dd.p.big.100k.wr-low}} of cases", correct: true, why: "A lower winrate pulls the result upward more weakly, so {{t:downswing|downswings}} are deeper and more frequent. At {{n:dd.wr-low}}, typical for winning players at the micro stakes, a {{t:downswing}} of {{n:dd.bi.big}} {{t:buy-in|buy-ins}} happens in more than half of the samples." }
      - { text: "Both equally often, because the {{t:standard-deviation}} is the same", why: "The {{t:standard-deviation}} determines the swings, but the winrate determines how quickly the result pulls away from them. At {{n:dd.wr-low}}, a {{t:downswing}} of {{n:dd.bi.big}} {{t:buy-in|buy-ins}} happens in about {{n:dd.p.big.100k.wr-low}} of samples, at {{n:var.wr.ex}} in about {{n:dd.p.big.100k}}." }
      - { text: "Neither: a {{t:downswing}} of {{n:dd.bi.big}} {{t:buy-in|buy-ins}} only happens to losing players", why: "Not true. Even a {{n:var.wr.ex}} player hits one in about {{n:dd.p.big.100k}} of {{n:var.hands.k}}k-hand samples." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "You have been {{n:dd.bi.small}} {{t:buy-in|buy-ins}} down for a month. What follows from this?"
    options:
      - { text: "The {{t:downswing}} alone proves nothing; review your decisions in the hands you lost", correct: true, why: "A {{t:downswing}} of {{n:dd.bi.small}} {{t:buy-in|buy-ins}} over {{n:var.hands.k}}k hands hits almost every player winning from {{n:dd.wr-low}} to {{n:var.wr.ex}} (simulation with SD {{n:var.sd}}). Whether you play well is shown by reviewing your decisions, not by the result alone." }
      - { text: "You are playing badly and must change your whole style", why: "{{t:downswing|Downswings}} of this size happen to players winning {{n:var.wr.ex}} (SD {{n:var.sd}}) in about {{n:dd.p.small.100k}} of {{n:var.hands.k}}k-hand samples. Changing your style because of the result alone is reacting to noise." }
      - { text: "You are definitely unlucky, there is nothing you need to review", why: "A {{t:downswing}} can also come from mistakes. The result cannot tell bad luck from a mistake, but a hand review can." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "What {{t:standard-deviation}} is typical for a 6-max No-Limit Hold'em cash game?"
    options:
      - { text: "About {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "That is what {{t:variance}} calculators report. About {{n:var.sd}} is most often taken as the typical value. An aggressive style gives a higher {{t:standard-deviation}}." }
      - { text: "About {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "That is the typical winrate of winning players at the micro stakes. The {{t:standard-deviation}} is dozens of times larger than the winrate, which is why results jump around so much." }
      - { text: "About {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}} per 100 hands", why: "That is the {{t:standard-deviation}} of the result after {{n:var.hands.k}}k hands, not per 100 hands." }
---
Your result in poker is the sum of two things: how well you play, and luck. Both components can be measured. Winrate tells you how much you win on average, and {{t:standard-deviation}} tells you how much the result jumps around that average.

## Two numbers in bb/100

**Winrate** is the average profit per 100 hands in {{t:big-blind|big blinds}}. Winning players at the micro stakes usually have {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

**{{t:standard-deviation|Standard deviation}} (SD)** is the typical spread of the result per 100 hands. In 6-max cash games it is usually {{n:var.sd.low}}–{{n:var.sd.high}}, and {{n:var.sd}} is taken as the typical value. The {{t:standard-deviation}} is dozens of times larger than the winrate, so the result of one {{t:session}}, or even a month, tells you very little.

## The result over many hands

Divide the number of hands by 100 to get the number of blocks.

```formula
expected result = winrate × number of blocks
standard deviation of the result = SD × √(number of blocks)
{{n:var.conf95}} range = expected result ± {{n:var.z95}} × standard deviation of the result
```

Example: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}}k hands, or {{n:var.blocks}} blocks. You expect {{n:var.exp.bb}}, or {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. The {{t:standard-deviation}} of the result is {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, or about {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}. With {{n:var.conf95}} confidence, you will finish between about **{{n:var.ci.low.bi}} and {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}**. The expected result lies about {{n:var.z.lose}} {{t:standard-deviation|standard deviations}} above zero, so the chance that you will be in the red after {{n:var.hands.k}}k hands is about {{n:var.p.lose}}.

## How many hands to know your winrate

The same calculation works in reverse. The error in estimating your winrate shrinks with the square root of the number of hands:

```formula
winrate error = SD ÷ √(number of blocks)
blocks needed = ({{n:var.z95}} × SD ÷ precision)²
```

After {{n:var.hands.k}}k hands, the error is about {{n:var.se.wr}}, so the {{n:var.conf95}} range is ± {{n:var.ci.wr}}. A result of {{n:var.wr.ex}} then only means that your true winrate lies somewhere between about {{n:var.wr.ci.low}} and {{n:var.wr.ci.high}}. To know your winrate to within ± {{n:var.target}}, you need about **{{n:var.need.hands.k}}k hands**.

## {{t:downswing|Downswings}} are normal

A {{t:downswing}} is a drop in your result from its peak. Simulation of a {{n:var.wr.ex}} player with SD {{n:var.sd}}:

| {{t:downswing|Downswing}} from peak | In {{n:dd.hands.short.k}}k hands | In {{n:var.hands.k}}k hands | In {{n:var.hands.k}}k hands at {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-ins}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-ins}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note Where these numbers come from
Simulation results: thousands of runs of {{n:var.hands.k}}k hands each, with a random result for every block. Real {{t:downswing|downswings}} can be somewhat deeper, because the result changes with every hand, not every 100 hands. Conclusion: a {{t:downswing}} of {{n:dd.bi.small}} {{t:buy-in|buy-ins}} does not prove that you are playing badly.
:::

These are general guidelines, not a guarantee of results. If your playing is getting out of control, check the "Help" screen.
