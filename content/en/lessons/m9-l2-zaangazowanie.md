---
id: m9.l2
module: m9
order: 2
title: "Commitment"
sub: "When you play for the whole stack"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: the {{t:pot}} is {{n:ex.pot}}, stacks are {{n:commit.stack}} each. You bet the full {{t:pot}} ({{n:ex.bet.pot}}), and your opponent goes all-in. You have to put in {{n:commit.after-pot.call}} more. How much equity do you need to {{t:call}}? Enter the number as a percentage."
    answer: eq.commit.after-pot
    explanation: "Before your opponent's extra amount, the {{t:pot}} holds {{n:ex.pot.after-pot-call}} (the {{t:pot}}, your {{t:bet}} and your opponent's matching amount). You put in {{n:commit.after-pot.call}} more, so the equity needed = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. After a {{t:bet}} like this you are committed: {{t:fold|folding}} usually doesn't pay off."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: the {{t:pot}} is {{n:ex.pot}}, stacks are {{n:commit.stack}} each. You bet half the {{t:pot}} ({{n:ex.bet.half}}), and your opponent goes all-in. You have to put in {{n:commit.after-half.call}} more. How much equity do you need to {{t:call}}? Enter the number as a percentage."
    answer: eq.commit.after-half
    explanation: "Before your opponent's extra amount, the {{t:pot}} holds {{n:ex.half.total}} (the {{t:pot}}, your {{t:bet}} and your opponent's matching amount). You put in {{n:commit.after-half.call}} more: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. That's less than against an immediate all-in ({{n:eq.jam.spr2}}), because you've already put in part of the money."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. You have {{t:top-pair}}, you bet the full {{t:pot}}, and your opponent goes all-in. To {{t:call}} you need {{n:eq.commit.after-pot}} equity. What do you do?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Yes: the price is very good. At a low {{t:spr}} your opponent also goes all-in with {{t:draw|draws}} and weaker queens, so {{t:top-pair}} with an ace usually has much more than {{n:eq.commit.after-pot}} equity. It clearly loses only to {{t:two-pair}} and sets." }
      - { text: "{{t:fold|Fold}}, because the all-in shows a strong hand", why: "{{t:fold|Folding}} gives up a {{t:pot}} you've already put a lot into. You only need to win one time in five, that is {{n:eq.commit.after-pot}} of the time. If you planned to {{t:fold}} here, you'd have been better off not betting the full {{t:pot}}." }
      - { text: "{{t:fold|Fold}}, because the {{t:spr}} is low", why: "A low {{t:spr}} works the other way: it makes it easier to play for the whole stack, because the price on the all-in is better." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "After your {{t:bet}}, you'd have less left in your stack than the {{t:pot}} will be once the {{t:bet}} is {{t:call|called}}. Which plan makes no sense?"
    options:
      - { text: "{{t:bet|Bet}} and {{t:fold}} if your opponent goes all-in", correct: true, why: "Yes, this plan is a mistake: after a {{t:bet}} like this you need very little equity to {{t:call}} the all-in (at {{t:spr}} {{n:spr.commit}} with a {{t:pot}}-sized {{t:bet}}, only {{n:eq.commit.after-pot}}). If you {{t:fold}} anyway, the {{t:bet}} just gives away {{t:chips}}." }
      - { text: "All-in right away", why: "That's a sensible plan with a strong hand: you're playing for the whole stack anyway, so you put it in right away." }
      - { text: "{{t:check|Check}}", why: "Also sensible when you don't want to play for the whole stack: you don't put in money that would later make it hard to {{t:fold}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} after a 4-bet, {{t:spr}} about {{n:spr.4bet}}. You hit {{t:top-pair}} with the best kicker. What's your plan?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Play for the whole stack", correct: true, why: "Yes: at {{t:spr}} about {{n:spr.4bet}} you need only about {{n:eq.jam.4bet}} equity for an all-in, and {{t:top-pair}} with an ace is very strong here. You bet or {{t:call}} with a plan to get it all in." }
      - { text: "Play carefully and {{t:fold}} to a big {{t:bet}}", why: "At such a low {{t:spr}}, {{t:fold|folding}} {{t:top-pair}} gives up too much. After a 4-bet your opponent also has AQ, QQ, JJ and other hands that lose to yours." }
      - { text: "Bet small and {{t:fold}} to an all-in", why: "That's a {{t:bet}}-and-{{t:fold}} plan at a low {{t:spr}}: after your {{t:bet}} the price on the all-in gets even better, and {{t:fold|folding}} gives up a {{t:pot}} you've already put money into." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Why does {{t:top-pair}} usually play for the whole stack at {{t:spr}} about {{n:spr.commit}}?"
    options:
      - { text: "Because you need about {{n:eq.jam.spr2}} equity for an all-in, and two {{t:bet|bets}} of about {{n:geo.spr2.2}} of the {{t:pot}} get the whole stack in", correct: true, why: "Yes: the price is good, and two streets of {{t:value}} are enough to get the stack in. {{t:top-pair|Top pair}} can usually stand that much. The threshold itself is a heuristic: what your opponent plays with matters too." }
      - { text: "Because {{t:top-pair}} always wins", why: "Not always: sometimes your opponent has {{t:two-pair}} or a set. At a low {{t:spr}}, though, worse hands and {{t:draw|draws}} put in enough money, and the price is good." }
      - { text: "Because at {{t:spr}} {{n:spr.commit}} the rules don't allow you to {{t:fold}}", why: "You can always {{t:fold}}. The point is that {{t:fold|folding}} usually costs more than it gains: you need only about {{n:eq.jam.spr2}} equity for an all-in." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "A single-raised {{t:pot}}, stacks of {{n:format.stack}}, {{t:spr}} about {{n:spr.srp}}. You hit {{t:top-pair}} with a good kicker. How do you treat this hand?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "As a value hand, but usually not one for the whole stack", correct: true, why: "Yes: at {{t:spr}} about {{n:spr.srp}} the whole stack goes in only after several {{t:bet|bets}} bigger than the {{t:pot}}. An opponent who puts in that much rarely has a hand worse than one {{t:pair}}." }
      - { text: "Play for the whole stack, because {{t:top-pair}} is strong", why: "At {{t:spr}} {{n:spr.commit}}, yes, but here the {{t:spr}} is about {{n:spr.srp}}. When the whole stack is in the {{t:pot}}, your opponent usually has {{t:two-pair}}, a set or a better {{t:pair}}." }
      - { text: "{{t:fold|Fold}} to your opponent's first {{t:bet}}", why: "Too cautious: {{t:top-pair}} with a good kicker is a strong hand on this flop. The point is not to build a whole-stack {{t:pot}} with it, not to {{t:fold}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} after a 4-bet, {{t:spr}} about {{n:spr.4bet}}. You have a {{t:pair}} of jacks, and the flop has an ace and a king. Your opponent goes all-in. What about the rule “at a low {{t:spr}}, I play for the stack”?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "It doesn't cover this hand: it's a {{t:pair}} lower than both high cards on the {{t:board}}", correct: true, why: "Yes: the rule is about {{t:top-pair}} and better hands. After a 4-bet your opponent often has an ace or a king, and your jacks lose to any {{t:pair}} made with a high card. Here you {{t:fold}} more often, despite the good price ({{n:eq.jam.4bet}})." }
      - { text: "It does: at a low {{t:spr}} I {{t:call}} with everything", why: "A low {{t:spr}} gives a good price, but it doesn't turn a weak hand into a strong one. When your opponent often has a better {{t:pair}}, even {{n:eq.jam.4bet}} equity may be too much." }
      - { text: "It does, but only when I have {{t:position}}", why: "{{t:position|Position}} doesn't change what you're playing with. The rule covers {{t:top-pair}} and better hands." }
---
Commitment is a situation where there's already so much money in the {{t:pot}} relative to your stack that a {{t:fold}} to an all-in almost never pays off. The {{t:spr}} from the previous lesson tells you how close to this you already are at the start of the flop.

## After a {{t:bet}}, the price is even better

Example: {{t:spr}} {{n:spr.commit}}, the {{t:pot}} is {{n:ex.pot}}, stacks are {{n:commit.stack}} each. If your opponent goes all-in right away, you need {{n:eq.jam.spr2}} equity. If you bet first, you need less:

| Your {{t:bet}} before the opponent's all-in | Amount to call | Equity needed |
|---|---|---|
| None (opponent goes all-in right away) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Half the {{t:pot}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Full {{t:pot}} ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Don't plan to {{t:bet}} and {{t:fold}}

If after your {{t:bet}} you'd have less left in your stack than the {{t:pot}} will be once the {{t:bet}} is {{t:call|called}}, then betting and {{t:fold|folding}} to an all-in usually makes no sense: to {{t:call}} the all-in you then need less equity than to {{t:call}} a {{t:pot}}-sized {{t:bet}} ({{n:eq.bet-pot}}). You have two sensible options: play for the whole stack (bet or go all-in) or {{t:check}}.

## Low {{t:spr}}: {{t:top-pair}} plays for the stack

Rule: **when the {{t:spr}} on the flop is lower than about {{n:spr.zone.low}}, {{t:top-pair}} and better hands usually play for the whole stack** (the {{t:spr}} zones from the previous lesson). The example {{t:spr}} of {{n:spr.commit}} falls in this zone, and the math there supports the rule:

- for an all-in you need at most about {{n:eq.jam.spr2}} equity, and after your own {{t:bet}} even less,
- two {{t:bet|bets}} of about {{n:geo.spr2.2}} of the {{t:pot}} get the whole stack in: with a {{t:pot}} of {{n:ex.pot}}, that's {{n:geo.spr2.flop}} on the flop and {{n:geo.spr2.turn}} on the turn, {{n:geo.spr2.total}} in total,
- {{t:top-pair|top pair}} can usually stand two streets of {{t:value}} (the lesson on planning for three {{t:street|streets}}).

The math doesn't set an exact threshold, though. Whether {{t:top-pair}} has enough equity depends on what your opponent plays with. That's why this is a heuristic, not a hard law. The rule covers {{t:top-pair}} and better hands: a {{t:pair}} lower than the high cards on the {{t:board}} doesn't qualify.

## High {{t:spr}}: play one {{t:pair}} more carefully

In a single-raised {{t:pot}}, the {{t:spr}} is about {{n:spr.srp}}. To get the whole stack in by the river, you'd have to bet more than the {{t:pot}} on every {{t:street}} (the lesson on geometric sizing). An opponent who puts in that much money rarely has a hand worse than one {{t:pair}}. That's why with one {{t:pair}} in a {{t:pot}} like this you play for value, but usually don't plan to play for the whole stack.

:::note Where these rules come from
The threshold of about {{n:spr.zone.low}} comes from training materials and a published solver analysis (at {{t:spr}} about {{n:spr.commit}}, every {{t:top-pair}} and better hand plays for the stack). Caution with one {{t:pair}} at a high {{t:spr}} is supported by training materials and solver analyses. The price and sizing numbers in this lesson are pure math.
:::
