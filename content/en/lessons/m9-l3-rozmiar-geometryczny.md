---
id: m9.l3
module: m9
order: 3
title: "Geometric sizing"
sub: "The same fraction of the pot all the way to all-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "The {{t:pot}} is {{n:ex.pot}}. You bet the full {{t:pot}} ({{n:ex.bet.pot}}) and your opponent {{t:call|calls}}. How much is in the {{t:pot}} now? Enter a number."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. A {{t:pot}}-sized {{t:bet}} and a {{t:call}} multiply the {{t:pot}} by three. In general: a {{t:bet}} of fraction f of the {{t:pot}} and a {{t:call}} multiply the {{t:pot}} by (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "The {{t:pot}} is {{n:ex.pot}}. On the flop, turn and river you bet the full {{t:pot}} ({{n:ex.bet.pot}}, then {{n:geo.ex.turn}}, then {{n:geo.ex.river}}), and your opponent {{t:call|calls}} every time. How much does each of you put in in total? Enter a number."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. The {{t:pot}} grows from {{n:ex.pot}} to {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} and {{n:geo.ex.river-after}}. So three {{t:pot}}-sized {{t:bet|bets}} get all-in at a {{t:spr}} of {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "At what {{t:spr}} do three half-{{t:pot}} {{t:bet|bets}} (flop, turn, river, each called) put in exactly the whole stack?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Pot}} {{n:ex.pot}}: {{t:bet|bets}} of {{n:ex.bet.half}}, {{n:geo.half.turn}} and {{n:geo.half.river}} add up to {{n:geo.half.total}}, which is a stack of {{n:geo.half.stack}}. From the formula: (1 + 2·{{n:ex.frac.half}}) to the third power = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "At a {{t:spr}} of {{n:spr.zone.deep}} you have to bet the full {{t:pot}} on every {{t:street}}. Half-{{t:pot}} {{t:bet|bets}} would then put in only {{n:geo.half.total}} of {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "At a {{t:spr}} of {{n:spr.commit}} three half-{{t:pot}} {{t:bet|bets}} are too much: the stack runs out on the river before you can {{t:bet}} a full half {{t:pot}}. A {{t:spr}} of {{n:geo.half.spr}} is the one that fits." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "Single-raised {{t:pot}}: on the flop there is {{n:bb.pot-after.vs-btn}}, and each of you has {{n:spr.srp.stack}} behind. You bet half {{t:pot}} on the flop, turn and river, and your opponent always {{t:call|calls}}. How much do you put in in total?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. Most of the stack stays behind: at a {{t:spr}} of about {{n:spr.srp}}, half {{t:pot}} is too small to play for the whole stack." }
      - { text: "{{n:spr.srp.stack}}, the whole stack", why: "The {{t:pot}} only grows to {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} and so on. Three half-{{t:pot}} {{t:bet|bets}} put in {{n:srp.half.total}} in total, far from the whole stack." }
      - { text: "{{n:srp.potbet.total}}", why: "That is what three full-{{t:pot}} {{t:bet|bets}} would put in ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). Half-{{t:pot}} {{t:bet|bets}} give only {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "Single-raised {{t:pot}}, {{t:spr}} about {{n:spr.srp}}. What constant {{t:bet}} size on the flop, turn and river puts in the whole stack?"
    options:
      - { text: "About {{n:geo.srp.3}} {{t:pot}}, more than the full {{t:pot}}", correct: true, why: "Yes: even three {{t:pot}}-sized {{t:bet|bets}} put in only {{n:srp.potbet.total}} of a {{n:spr.srp.stack}} stack. The whole stack goes in only at about {{n:geo.srp.3}} {{t:pot}} on every {{t:street}}." }
      - { text: "About {{n:geo.3bet-ip.3}} {{t:pot}}", why: "That is enough in a 3-bet {{t:pot}} ({{t:spr}} about {{n:spr.3bet-ip}}). In a single-raised {{t:pot}} the {{t:spr}} is about {{n:spr.srp}}, so the {{t:bet|bets}} have to be bigger than the {{t:pot}}." }
      - { text: "About {{n:cbet.size.small}} {{t:pot}}", why: "Three such {{t:bet|bets}} put in only a small part of the stack. At a {{t:spr}} of about {{n:spr.srp}} you need about {{n:geo.srp.3}} {{t:pot}} on every {{t:street}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "3-bet {{t:pot}}, you have {{t:position}}, {{t:spr}} about {{n:spr.3bet-ip}}. You have a very strong hand and want to get the whole stack in by the river with equal {{t:bet|bets}}. How much do you bet on the flop?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "About {{n:geo.3bet-ip.3}} {{t:pot}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Yes: (1 + 2f) to the third power = 1 + 2·{{n:spr.3bet-ip}} gives f ≈ {{n:geo.3bet-ip.3}}. {{t:bet|Bets}} of {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} and {{n:geo.3bet-ip.river}} add up to {{n:geo.3bet-ip.total}}, the whole stack." }
      - { text: "{{n:cbet.size.small}} {{t:pot}} ({{n:g3b.third.flop}})", sizeError: true, why: "Right action, wrong size: three 1/3-{{t:pot}} {{t:bet|bets}} put in only about {{n:g3b.third.total}} of {{n:spr.3bet-ip.stack}}. The plan “whole stack in by the river” needs about {{n:geo.3bet-ip.3}} {{t:pot}}." }
      - { text: "{{t:check|Check}}, then go all-in on the river", why: "An all-in of {{n:spr.3bet-ip.stack}} into a {{t:pot}} of {{n:vs3bet.pot-after}} on the river is a {{t:bet}} many times bigger than the {{t:pot}}: your opponent will call it only with a very strong hand. Equal {{t:bet|bets}} on three {{t:street|streets}} give them a chance to put money in a little at a time." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pot}} after your 3-bet from the {{t:big-blind}}, {{t:spr}} about {{n:spr.3bet-oop}}. You want to get the whole stack in by the river with equal {{t:bet|bets}}. What fraction of the {{t:pot}} on each {{t:street}}?"
    table: { position: BB }
    options:
      - { text: "About {{n:geo.3bet-oop.3}} {{t:pot}}", correct: true, why: "Yes: at a {{t:spr}} of about {{n:spr.3bet-oop}}, (1 + 2f) to the third power = 1 + 2·{{n:spr.3bet-oop}}, so f ≈ {{n:geo.3bet-oop.3}}. A lower {{t:spr}} than after a 3-bet {{t:in-position}}, so a smaller size too." }
      - { text: "About {{n:geo.3bet-ip.3}} {{t:pot}}", sizeError: true, why: "Close, but that is the size for a {{t:spr}} of about {{n:spr.3bet-ip}}. At a {{t:spr}} of about {{n:spr.3bet-oop}}, about {{n:geo.3bet-oop.3}} {{t:pot}} is enough, and with bigger {{t:bet|bets}} you will lack the stack for a full {{t:bet}} on the river." }
      - { text: "About {{n:geo.4bet.3}} {{t:pot}}", sizeError: true, why: "That is enough after a 4-bet ({{t:spr}} about {{n:spr.4bet}}). At a {{t:spr}} of about {{n:spr.3bet-oop}}, three such {{t:bet|bets}} leave a large part of the stack behind." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pot}} after a 4-bet, {{t:spr}} about {{n:spr.4bet}}. You want to get the whole stack in with two {{t:bet|bets}}: on the flop and on the turn. How much do you bet on the flop?"
    options:
      - { text: "About {{n:geo.4bet.2}} {{t:pot}}", correct: true, why: "Yes: for two {{t:street|streets}}, (1 + 2f) squared = 1 + 2·{{n:spr.4bet}}, so f ≈ {{n:geo.4bet.2}}. After the {{t:bet}} and {{t:call}}, exactly as much is left as the same-sized {{t:bet}} on the turn." }
      - { text: "About {{n:geo.4bet.3}} {{t:pot}}", sizeError: true, why: "That is the size for three {{t:street|streets}}. With two {{t:bet|bets}} of {{n:geo.4bet.3}} {{t:pot}}, part of the stack is left for the river." }
      - { text: "All-in right away ({{n:spr.4bet.stack}})", why: "That is a plan for one {{t:street}}, not two. A {{t:bet}} of about {{n:spr.4bet}} {{t:pot|pots}} right away gives your opponent only one decision: {{t:call}} for everything or {{t:fold}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "What does geometric sizing mean?"
    options:
      - { text: "The same fraction of the {{t:pot}} on every {{t:street}}, so that the last {{t:bet}} is all-in", correct: true, why: "Yes: a {{t:bet}} of f and a {{t:call}} multiply the {{t:pot}} by (1 + 2f) on every {{t:street}}. You choose the size so that after the last {{t:bet}} the whole stack is in the {{t:pot}}." }
      - { text: "Always a full-{{t:pot}} {{t:bet}}", why: "The full {{t:pot}} is geometric only at one {{t:spr}} (e.g. {{n:spr.zone.deep}} for three {{t:street|streets}}). At a {{t:spr}} of about {{n:spr.3bet-ip}}, about {{n:geo.3bet-ip.3}} {{t:pot}} is enough." }
      - { text: "{{t:bet|Bets}} growing as a percentage: small on the flop, big on the river", why: "The amounts grow because the {{t:pot}} grows, but the fraction of the {{t:pot}} is the same on every {{t:street}}. In a 3-bet {{t:pot}} that is {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} and {{n:geo.3bet-ip.river}}, each time about {{n:geo.3bet-ip.3}} {{t:pot}}." }
---
Before you {{t:bet}} on the flop, it helps to know how much money can go in by the river. A {{t:bet}} and a {{t:call}} don't add a fixed amount to the {{t:pot}}; they multiply it.

## How the {{t:pot}} grows

A {{t:bet}} of fraction f of the {{t:pot}} and a {{t:call}} multiply the {{t:pot}} by (1 + 2f). With a full-{{t:pot}} {{t:bet}}, the {{t:pot}} triples:

| {{t:street|Street}} | {{t:pot|Pot}} before the {{t:bet}} | {{t:bet|Bet}} (full {{t:pot}}) | {{t:pot|Pot}} after the {{t:call}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Each player has put in {{n:geo.ex.total}}, which is {{n:spr.zone.deep}} {{t:pot|pots}}. So three {{t:pot}}-sized {{t:bet|bets}} get all-in at exactly a {{t:spr}} of {{n:spr.zone.deep}}. That is where the threshold of the highest {{t:spr}} zone from the first lesson comes from.

## The formula

Geometric sizing is the same fraction f of the {{t:pot}} on every {{t:street}}, chosen so that the last {{t:bet}} is all-in. For n {{t:street|streets}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Example: at a {{t:spr}} of {{n:geo.half.spr}}, three half-{{t:pot}} {{t:bet|bets}} put in the whole stack: {{n:ex.bet.half}}, {{n:geo.half.turn}} and {{n:geo.half.river}}, {{n:geo.half.total}} in total with a {{t:pot}} of {{n:ex.pot}}.

## Sizes for common {{t:pot|pots}}

| {{t:pot|Pot}} | {{t:spr}} | Three {{t:street|streets}} | Two {{t:street|streets}} |
|---|---|---|---|
| {{t:open|Open}} and {{t:call}} | {{n:spr.srp}} | {{n:geo.srp.3}} {{t:pot}} | – |
| 3-bet {{t:in-position}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} {{t:pot}} | – |
| 3-bet from the {{t:big-blind}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} {{t:pot}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} {{t:pot}} | {{n:geo.4bet.2}} {{t:pot}} |

In a 3-bet {{t:pot}} {{t:in-position}}, that means {{t:bet|bets}} of {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} and {{n:geo.3bet-ip.river}}, {{n:geo.3bet-ip.total}} in total, the whole stack.

## A single-raised {{t:pot}} is deep

At a {{t:spr}} of about {{n:spr.srp}}, three half-{{t:pot}} {{t:bet|bets}} put in only {{n:srp.half.total}}, and three {{t:pot}}-sized {{t:bet|bets}} put in {{n:srp.potbet.total}} of a {{n:spr.srp.stack}} stack. The whole stack goes in only with {{t:bet|bets}} bigger than the {{t:pot}}. That is why in such a {{t:pot}}, playing for the whole stack happens mainly with very strong hands.

:::note When this is useful
Geometric sizing is useful when you want to get the whole stack in by the river, that is, with a very strong hand. Not every hand wants to play for the whole stack: how many streets of {{t:value}} a hand can take is the topic of the next lesson. The formula is pure math. Earlier modules give sizes matched to the flop {{t:texture}}; geometric sizing is a reference point for a whole-stack plan.
:::
