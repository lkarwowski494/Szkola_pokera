---
id: m9.l1
module: m9
order: 1
title: "SPR: stack to pot"
sub: "How much money is left behind the pot"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|You opened}} from the Button to {{n:pf.open-size}}, the {{t:big-blind}} {{t:call|called}}, stacks are {{n:format.stack}}. On the flop the {{t:pot}} is {{n:bb.pot-after.vs-btn}}, and you have {{n:spr.srp.stack}} left behind. What is the {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "About {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. The stack behind the {{t:pot}} is more than ten times bigger than the {{t:pot}}: this is a typical {{t:spr}} after an {{t:open}} and a {{t:call}}." }
      - { text: "About {{n:spr.srp.wrong-full}}", why: "That is what you get from the full {{n:format.stack}} stack. Your {{n:pf.open-size}} is already in the {{t:pot}}, so you only count what is left: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "About {{n:spr.3bet-ip}}", why: "That is the {{t:spr}} after a 3-bet and a {{t:call}}. In a single-raised {{t:pot}} the {{t:pot}} is much smaller, so the {{t:spr}} is about {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "The {{t:cutoff|CO}} {{t:open|opened}} to {{n:pf.open-size}}, you {{t:raise|raised}} (3-bet) from the Button to {{n:pf.3bet.ip-total}}, the {{t:cutoff|CO}} {{t:call|called}}, and the blinds {{t:fold|folded}}. On the flop the {{t:pot}} is {{n:vs3bet.pot-after}}, and you have {{n:spr.3bet-ip.stack}} behind. What is the {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "About {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. After a 3-bet the {{t:pot}} is three times bigger than after a regular {{t:open}}, so the {{t:spr}} drops from about {{n:spr.srp}} to about {{n:spr.3bet-ip}}." }
      - { text: "About {{n:spr.3bet-ip.wrong-full}}", why: "That is what you get from the full {{n:format.stack}} stack. Your 3-bet of {{n:pf.3bet.ip-total}} is already in the {{t:pot}}, so you only divide what is left: {{n:spr.3bet-ip.stack}}." }
      - { text: "About {{n:spr.srp}}", why: "That is the {{t:spr}} in a single-raised {{t:pot}}. After a 3-bet the {{t:pot}} is much bigger and the stack behind it is smaller, so the {{t:spr}} drops to about {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "The Button {{t:open|opened}}, you {{t:raise|raised}} (3-bet) from the {{t:big-blind}} to {{n:pf.3bet.oop-total}}, and the Button {{t:call|called}}. On the flop the {{t:pot}} is {{n:spr.3bet-oop.pot}}, and you have {{n:spr.3bet-oop.stack}} behind. What is the {{t:spr}}?"
    table: { position: BB }
    options:
      - { text: "About {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Out of position}} the 3-bet is bigger, so the {{t:pot}} grows more and the {{t:spr}} is lower than after a 3-bet {{t:in-position}} ({{n:spr.3bet-ip}})." }
      - { text: "About {{n:spr.3bet-ip}}", why: "That is the {{t:spr}} after a 3-bet {{t:in-position}} to {{n:pf.3bet.ip-total}}. Your 3-bet to {{n:pf.3bet.oop-total}} makes a bigger {{t:pot}}, so the {{t:spr}} is lower: about {{n:spr.3bet-oop}}." }
      - { text: "About {{n:spr.4bet}}", why: "Only a 4-bet gives a {{t:spr}} that low. After a 3-bet to {{n:pf.3bet.oop-total}} it comes out to about {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacks are {{n:format.stack}}. In which {{t:pot}} is the {{t:spr}} on the flop the lowest?"
    options:
      - { text: "In a 4-bet and called {{t:pot}}", correct: true, why: "Yes: when the Button 4-bets to {{n:pf.4bet.example.low}} against the {{t:small-blind}}'s 3-bet, the {{t:small-blind}} {{t:call|calls}}, and the {{t:big-blind}} has {{t:fold|folded}}, the {{t:pot}} is {{n:spr.4bet.pot}} with only {{n:spr.4bet.stack}} behind it. The {{t:spr}} is about {{n:spr.4bet}}." }
      - { text: "In a 3-bet and called {{t:pot}}", why: "After a 3-bet the {{t:spr}} is about {{n:spr.3bet-ip}} {{t:in-position}} and about {{n:spr.3bet-oop}} {{t:out-of-position}}. A 4-bet lowers it even further: to about {{n:spr.4bet}}." }
      - { text: "In a single-raised {{t:pot}}", why: "The opposite: here the {{t:spr}} is the highest, about {{n:spr.srp}}, because the {{t:pot}} on the flop is small." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Why is the {{t:spr}} on the flop much lower after a 3-bet than after a regular {{t:open}}?"
    options:
      - { text: "The {{t:pot}} grows several times over, while the stack behind it shrinks only a little", correct: true, why: "Yes: the {{t:pot}} grows from {{n:bb.pot-after.vs-btn}} to {{n:vs3bet.pot-after}}, while the stack behind it only drops from {{n:spr.srp.stack}} to {{n:spr.3bet-ip.stack}}. The ratio falls from about {{n:spr.srp}} to about {{n:spr.3bet-ip}}." }
      - { text: "Because after a 3-bet the players have smaller stacks", why: "Only slightly smaller: {{n:spr.3bet-ip.stack}} instead of {{n:spr.srp.stack}}. What drives the drop in the {{t:spr}} is that the {{t:pot}} is three times bigger." }
      - { text: "Because a 3-bet gives you {{t:position}}", why: "{{t:position|Position}} depends on your seat at the table, not on the 3-bet. The {{t:spr}} is just the stack behind the {{t:pot}} divided by the {{t:pot}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|You opened}} from the Button to {{n:pf.open-size}}; you have {{n:format.stack}}. The {{t:big-blind}} has only {{n:spr.short.stack}} and {{t:call|calls}}. {{t:pot|Pot}} on the flop: {{n:bb.pot-after.vs-btn}}. What is the {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "About {{n:spr.short}}", correct: true, why: "You calculate from the {{t:effective-stack}}, the smaller of the two: your opponent has {{n:spr.short.behind}} left, so {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Beyond what is already in the {{t:pot}}, each of you can put in at most {{n:spr.short.behind}} more." }
      - { text: "About {{n:spr.srp}}", why: "That would be true if your opponent also had {{n:format.stack}}. You can only play for the smaller stack, so the {{t:spr}} is about {{n:spr.short}}." }
      - { text: "It can't be calculated because the stacks are different", why: "It can: you take the smaller stack (the effective one). Your opponent has {{n:spr.short.behind}} left, so the {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "When do you calculate the {{t:spr}} that tells you how to play the hand after the flop?"
    options:
      - { text: "On the flop, before anyone makes a {{t:bet}}", correct: true, why: "Yes: you can calculate the {{t:spr}} on any {{t:street}} (in M7 you calculated it on the turn), but for your hand plan you take the stack behind the {{t:pot}} divided by the {{t:pot}} at the start of the flop. Then you know how many {{t:pot|pots}} are left to play over three {{t:street|streets}}." }
      - { text: "Before the hand, before anyone {{t:raise|raises}}", why: "Before the flop you don't yet know how big the {{t:pot}} will be. The {{t:spr}} depends precisely on what happened before the flop: about {{n:spr.srp}} after an {{t:open}}, about {{n:spr.3bet-ip}} after a 3-bet." }
      - { text: "On the river, before the last {{t:bet}}", why: "On the river only one decision is left. You can calculate the {{t:spr}} there too, but the flop {{t:spr}} is the most useful for your hand plan, because it covers all three {{t:street|streets}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "You {{t:raise|raised}} from the Button (3-bet), and the {{t:cutoff|CO}} {{t:call|called}}. The {{t:spr}} on the flop is about {{n:spr.3bet-ip}}. You hit {{t:top-pair}} with a good kicker. How do you treat this hand?"
    table: { position: BTN }
    options:
      - { text: "As a borderline hand: you play it for {{t:value}}, but you don't always {{t:call}} your opponent's all-in", correct: true, why: "A {{t:spr}} of about {{n:spr.3bet-ip}} is in the zone from {{n:spr.zone.low}} to {{n:spr.zone.mid}}, where {{t:top-pair}} is a borderline hand. Whether to play for your whole stack depends on how your opponent plays and what the {{t:board}} looks like." }
      - { text: "You always play for your whole stack", why: "That is usually true only at a {{t:spr}} below about {{n:spr.zone.low}}, e.g. after a 4-bet (about {{n:spr.4bet}}). At a {{t:spr}} of about {{n:spr.3bet-ip}} it takes more {{t:bet|bets}} to get all-in, and mostly stronger hands pay all the way." }
      - { text: "You play carefully, as at a very high {{t:spr}}", why: "You play {{t:top-pair}} that carefully above about {{n:spr.zone.deep}}, e.g. in a single-raised {{t:pot}} (about {{n:spr.srp}}). After a 3-bet the {{t:spr}} is much lower." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. The {{t:pot}} is {{n:ex.pot}}, and your opponent goes all-in for {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). How much equity do you need to {{t:call}}? Enter the number as a percentage."
    answer: eq.jam.spr2
    explanation: "You put in {{n:commit.stack}}, and the {{t:pot}} after the {{t:call}} is {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Required equity = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "On the flop your opponent goes all-in for their whole stack ({{n:format.stack}} at the start of the hand). In which {{t:pot}} do you need the least equity to {{t:call}}?"
    options:
      - { text: "After a 4-bet: about {{n:eq.jam.4bet}}", correct: true, why: "At a {{t:spr}} of about {{n:spr.4bet}} you put in {{n:spr.4bet.stack}} to win the {{n:spr.4bet.pot}} {{t:pot}} and your opponent's stack. The lower the {{t:spr}}, the better the price." }
      - { text: "After a 3-bet: about {{n:eq.jam.3bet-ip}}", why: "After a 3-bet {{t:in-position}} you need about {{n:eq.jam.3bet-ip}}. After a 4-bet the {{t:pot}} is bigger relative to the stack, so about {{n:eq.jam.4bet}} is enough." }
      - { text: "After an {{t:open}} and a {{t:call}}: about {{n:eq.jam.srp}}", why: "This is the worst price of the three: at a {{t:spr}} of about {{n:spr.srp}} you put in {{n:spr.srp.stack}} to win the small {{n:bb.pot-after.vs-btn}} {{t:pot}} and your opponent's stack." }
---
Before the flop you decide how much money goes into the {{t:pot}}. After the flop what matters is how much is still left behind it. One number connects the two: the {{t:spr}}.

## What is the {{t:spr}}

The {{t:spr}} (stack-to-pot ratio) is the ratio of the stack to the {{t:pot}} at the start of a {{t:street}}. You can calculate it on any {{t:street}} (in M7 you calculated it on the turn), but for your hand plan you take the flop {{t:spr}}, before anyone makes a {{t:bet}}.

```formula
SPR = effective stack ÷ pot on the flop
```

The {{t:effective-stack}} is the smaller of the two stacks, not counting what is already in the {{t:pot}}. That is the most either player can still add to the {{t:pot}}: beyond the {{t:pot}}, you can't win more than the {{t:effective-stack}} from your opponent, and that is the most you can still lose.

Example: {{t:open|you opened}} from the Button to {{n:pf.open-size}}, and the {{t:big-blind}} {{t:call|called}}. The {{t:pot}} on the flop is {{n:bb.pot-after.vs-btn}}, and you have {{n:spr.srp.stack}} left behind. {{t:spr|Stack-to-pot ratio}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## Preflop sets the {{t:spr}}

Each {{t:raise}} before the flop makes the {{t:pot}} several times bigger, while the stack behind it shrinks much more slowly. That is why the {{t:spr}} depends heavily on what happened before the flop.

| {{t:pot|Pot}} ({{n:format.stack}} stacks) | {{t:pot|Pot}} on the flop | Stack behind the {{t:pot}} | {{t:spr|Stack-to-pot ratio}} |
|---|---|---|---|
| {{t:open|Open}} and {{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position}} and {{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet from the {{t:big-blind}} and {{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| Button 4-bet vs. a {{t:small-blind}} 3-bet and {{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## {{t:spr|Stack-to-pot ratio}} zones

You determine the {{t:spr}} zones from the flop {{t:spr}}. The higher the {{t:spr}}, the stronger the hand you need to play for your whole stack:

| {{t:spr|Stack-to-pot ratio}} | What you usually play for your whole stack with |
|---|---|
| below {{n:spr.zone.low}} | {{t:top-pair|Top pair}} and better |
| from {{n:spr.zone.low}} to {{n:spr.zone.mid}} | {{t:top-pair|Top pair}} is a borderline hand |
| from {{n:spr.zone.mid}} to {{n:spr.zone.deep}} | High {{t:two-pair}} and better |
| above {{n:spr.zone.deep}} | A set, a {{t:straight}} and better |

After an {{t:open}} and a {{t:call}} ({{t:spr}} about {{n:spr.srp}}) you are in the highest zone, after a 3-bet (about {{n:spr.3bet-ip}}) in the zone where {{t:top-pair}} is borderline, and after a 4-bet (about {{n:spr.4bet}}) in the lowest. The thresholds are a simplification. Sources divide the zones differently, but they agree that below about {{n:spr.zone.low}} {{t:top-pair}} plays for stacks, and at a higher {{t:spr}} a single {{t:pair}} does so less and less often. The {{n:spr.zone.mid}} boundary is a convention adopted in this app. The {{n:spr.zone.deep}} threshold comes from the math: at a {{t:spr}} of {{n:spr.zone.deep}}, three {{t:pot}}-sized {{t:bet|bets}} get you all-in.

## Low {{t:spr}}: a better price on an all-in

When your opponent goes all-in for their whole stack, you put in your stack to win the {{t:pot}} and their stack. Required equity = stack ÷ ({{t:pot}} + 2·stack). At a {{t:spr}} of {{n:spr.commit}} that is {{n:eq.jam.spr2}}, after a 4-bet about {{n:eq.jam.4bet}}, after a 3-bet about {{n:eq.jam.3bet-ip}}, and in a single-raised {{t:pot}} as much as about {{n:eq.jam.srp}}.

The lower the {{t:spr}}, the less money is left to play for and the easier it is to put in your whole stack. The higher it is, the more {{t:street|streets}} and {{t:bet|bets}} remain before the stack goes into the {{t:pot}}.

:::note Where these numbers come from
The {{t:pot|pots}} and stacks come from the sizes in the module on preflop play ({{t:open}} {{n:pf.open-size}}, 3-bet to {{n:pf.3bet.ip-total}} or {{n:pf.3bet.oop-total}}, 4-bet to {{n:pf.4bet.example.low}}). The 4-bet {{t:pot}} is a scenario: the Button 4-bets the {{t:small-blind}}'s 3-bet, the {{t:small-blind}} {{t:call|calls}}, and the {{t:big-blind}} has {{t:fold|folded}}, leaving their blind in the {{t:pot}}. A different size gives a slightly different {{t:spr}}, but the order is always the same: the more {{t:raise|raises}} before the flop, the lower the {{t:spr}}.
:::
