---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "When calling pays off"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "The {{t:pot}} is {{n:ex.third.pot}}. Your opponent {{t:bet|bets}} {{n:ex.third.bet}}. How much equity do you need to {{t:call}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "The {{t:pot}} after the {{t:bet}} is {{n:ex.third.pot-after-bet}}, you put in {{n:ex.third.bet}}, for a total of {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "That's what you need against a {{t:pot}}-sized {{t:bet}}. Here the {{t:bet}} is 1/3 of the {{t:pot}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "That's {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Add your {{t:call}} to the denominator too." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. You have a {{t:flush-draw}}. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You need {{n:eq.bet-pot}}. The {{t:flush}} gives you {{n:outs.flush}} outs, about {{n:odds.flush.turn-river}}. Even if you add the {{n:pair.outs.per-rank}} aces that give you a {{t:pair}} of aces ({{n:outs.flush-ace}} outs in total, about {{n:odds.flush-ace.turn-river}}), that's still clearly less than {{n:eq.bet-pot}}. A {{t:call}} like this loses in the long run." }
      - { text: "{{t:call|Call}}", why: "It's tempting, because you have a {{t:draw}} to the best {{t:flush}} and an ace could also help, but even about {{n:odds.flush-ace.turn-river}} is less than {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Raise}} all-in", why: "Advanced players sometimes make this play, but without a good reason you're risking your whole stack (all the {{t:chips}} you have in front of you) with a hand that has nothing yet." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Same hand, but your opponent {{t:bet|bets}} only {{n:ex.bet.quarter}} into a {{t:pot}} of {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "You need {{n:eq.bet-quarter}}, and you have about {{n:odds.flush.turn-river}}, even more with the aces. A small {{t:bet}} gives you a good price." }
      - { text: "{{t:fold|Fold}}", why: "Too cheap to {{t:fold}}: {{n:odds.flush.turn-river}} is more than the {{n:eq.bet-quarter}} you need, and even more with the aces." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Your opponent {{t:bet|bets}} half the {{t:pot}}. How much equity do you need?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Pot}} {{n:ex.pot}}, {{t:bet}} {{n:ex.bet.half}}. You put in {{n:ex.bet.half}} toward a total of {{n:ex.half.total}}, which is {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "A common mistake: {{n:ex.wrong.half}} is the {{t:bet}} divided by the {{t:pot}} before the {{t:bet}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Divide what you put in by the whole {{t:pot}} after your {{t:call}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "That's what you need against a {{t:bet}} the size of the whole {{t:pot}}." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "Your opponent {{t:bet|bets}} the whole {{t:pot}}. What percentage of equity do you need to {{t:call}}? Enter a number."
    answer: eq.bet-pot
    explanation: "{{t:pot|Pot}} {{n:ex.pot}}, {{t:bet}} {{n:ex.bet.pot}}. You put {{n:ex.bet.pot}} into a {{t:pot}} that, after your {{t:call}}, holds {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Divide what you put in by the whole {{t:pot}}: {{n:eq.bet-pot}}, or one third."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
When your opponent {{t:bet|bets}} and you have a {{t:draw}}, the question is: is the price good? You compare two numbers: **how often you need to win** and **how often you actually win**.

:::note Equity vs. chance of hitting
**Equity** is your share of the {{t:pot}}: how often you'll win if the hand goes to showdown with no further {{t:bet|bets}}. The **chance of hitting** from the lesson on outs is only the probability that an out comes. With a pure {{t:draw}} that wins only when it hits, the chance of hitting on the cards you'll actually see for this price approximates your equity. Against a {{t:bet}} on the flop, that's the chance with one card, not by the river.
:::

## How often you need to win

```formula
required equity = call ÷ pot after your call
pot after your call = pot before the bet + bet + call
```

Example: the {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} {{n:ex.bet.half}}. The {{t:pot}} is now {{n:ex.half.pot-after-bet}}, you put in {{n:ex.bet.half}}, so the {{t:pot}} after your {{t:call}} is {{n:ex.half.total}}. You need {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Quick cheat sheet

| Opponent's {{t:bet}} | Required equity |
|---|---|
| Full {{t:pot}} | {{n:eq.bet-pot}} |
| Half {{t:pot}} | {{n:eq.bet-half}} |
| Quarter {{t:pot}} | {{n:eq.bet-quarter}} |

:::note The decision
If your equity is higher than required, you {{t:call}}. If it's lower, you {{t:fold}}. This follows from {{t:expected-value}}: the {{t:expected-value|EV}} of a {{t:call}} = equity × {{t:pot}} after your {{t:call}} − {{t:call}}, and that's negative exactly when your equity is below what's required. This one calculation eliminates most costly beginner mistakes. For now, you're leaving out {{t:implied-odds}}, the {{t:chips}} you expect to win later in the hand if you make your hand; they come back in later modules.
:::
