---
id: m9.l4
module: m9
order: 4
title: "A three-street plan"
sub: "How many streets of value a hand can take"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}}. You flopped a set on a {{t:dry}} flop. How many streets of {{t:value}} can this hand take?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Three", correct: true, why: "A set on a {{t:dry}} flop is almost always best. On every {{t:street}}, your opponent's worse hands (e.g. a king, a seven, a {{t:pair}}) can still pay, so you plan to {{t:bet}} the flop, turn and river." }
      - { text: "One", why: "Too few: with a hand this strong, a single {{t:bet}} leaves most of the value on the {{t:board}}. An opponent with a king will pay more than once." }
      - { text: "None: I {{t:check}} so I don't scare off my opponent", why: "{{t:check|Checking}} on every {{t:street|street}} doesn't build the {{t:pot}}. A set wants the {{t:pot}} to grow, because it usually wins at showdown." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}}; the {{t:spr}} is about {{n:spr.srp}}. You have {{t:top-pair}} with the best kicker. What's the plan?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Usually two streets of {{t:value}}, with no plan to play for the whole stack", correct: true, why: "Yes: worse kings and eights usually pay one or two {{t:bet|bets}}. Once there is a lot of money in the {{t:pot}}, mostly hands better than one {{t:pair}} pay. At a {{t:spr}} of about {{n:spr.srp}}, the whole stack would only go in with {{t:bet|bets}} bigger than the {{t:pot}}." }
      - { text: "Three {{t:street|streets}} of big {{t:bet|bets}} until all-in", why: "At a {{t:spr}} of about {{n:spr.srp}}, that means {{t:bet|bets}} of about {{n:geo.srp.3}} of the {{t:pot}} on every {{t:street}}. By the river, the {{t:pot}} will be left mostly with {{t:two-pair}} and sets, which beat one {{t:pair}}." }
      - { text: "One {{t:street}} or none", why: "Too cautious: {{t:top-pair}} with the best kicker on a {{t:dry}} flop beats many of your opponent's hands. It can usually take two streets of {{t:value}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}}. You have middle {{t:pair}}. How many streets of {{t:value}} can this hand take?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "One or none: getting to showdown is often enough", correct: true, why: "Yes: middle {{t:pair}} beats {{t:bluff|bluffs}} and weaker {{t:pair|pairs}}, but few worse hands will pay several {{t:bet|bets}}. The plan: at most one small {{t:bet}}, or {{t:check}} and {{t:call}}." }
      - { text: "Two, like {{t:top-pair}}", why: "Middle {{t:pair}} loses to every king. After the second {{t:bet}}, mostly hands that beat it pay." }
      - { text: "Three, so my opponent doesn't draw out", why: "Three {{t:bet|bets}} with middle {{t:pair}} get paid mostly by better hands: worse hands {{t:fold}} after the first or second {{t:bet}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "4-bet {{t:pot}}, {{t:spr}} about {{n:spr.4bet}}. You have {{t:top-pair}} with the best kicker. The hand can take two streets of {{t:value}}. What's the plan?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Two {{t:bet|bets}} of about {{n:geo.4bet.2}} of the {{t:pot}}: the whole stack goes in on the turn", correct: true, why: "Yes: at a {{t:spr}} of about {{n:spr.4bet}}, two {{t:street|streets}} are enough to get the whole stack in. Here, two streets of {{t:value}} with {{t:top-pair}} means playing for the whole stack." }
      - { text: "Small {{t:bet}}, then {{t:fold}} to an all-in", why: "At a {{t:spr}} of about {{n:spr.4bet}}, {{t:fold|folding}} {{t:top-pair}} with an ace to an all-in gives up too much: you need only about {{n:eq.jam.4bet}} equity, and even less after your own {{t:bet}}." }
      - { text: "I {{t:check}} on every {{t:street}} to control the {{t:pot}}", why: "{{t:pot|Pot}} control makes sense at a high {{t:spr}}. Here the {{t:pot}} is already big relative to the stack, and worse hands (AQ, QQ, JJ) will happily put in the rest." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "3-bet {{t:pot}}, you have {{t:position}}, {{t:spr}} about {{n:spr.3bet-ip}}. You have a set and want to get the whole stack in by the river. Which line?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Bet}} the flop, turn and river, each time about {{n:geo.3bet-ip.3}} of the {{t:pot}}", correct: true, why: "Yes: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} and {{n:geo.3bet-ip.river}} add up to {{n:geo.3bet-ip.total}}, i.e. the whole stack. On every {{t:street}}, your opponent pays a reasonable share of the {{t:pot}}." }
      - { text: "{{t:bet|Bet}} 1/3 {{t:pot}} on every {{t:street}}", sizeError: true, why: "Good line, wrong size: three {{t:bet|bets}} of 1/3 {{t:pot}} put in only about {{n:g3b.third.total}} of {{n:spr.3bet-ip.stack}}. A whole-stack plan needs about {{n:geo.3bet-ip.3}} of the {{t:pot}}." }
      - { text: "I {{t:check}} the flop and turn, then go all-in on the river", why: "On the river, an all-in for the whole stack would be a {{t:bet}} several times bigger than the {{t:pot}}. Your opponent will pay it only with a very strong hand, and worse hands that would have paid three smaller {{t:bet|bets}} will {{t:fold}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Why should you set your three-{{t:street}} plan already on the flop?"
    options:
      - { text: "Because the flop size determines how much you can get in later", correct: true, why: "Yes: the {{t:pot}} grows by multiplication. A small {{t:bet}} on the flop leaves a small {{t:pot}} for the turn and river, so later it's hard to get the whole stack in without very big {{t:bet|bets}}." }
      - { text: "Because you can't change the plan later", why: "You change the plan when the situation changes (e.g. a scary card on the turn). The point is for your first {{t:bet}} to fit the goal: how many streets of {{t:value}}, and whether you're playing for the whole stack." }
      - { text: "Because your opponent can see your plan", why: "Your opponent doesn't know your plan. The plan helps you choose a size so that by the end the {{t:pot}} holds as much as your hand can take." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "Single-raised {{t:pot}}, {{t:spr}} about {{n:spr.srp}}. You have {{t:top-pair}} with a good kicker. Do you bet the geometric size of about {{n:geo.srp.3}} of the {{t:pot}}?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "No: that's a whole-stack size, and this hand can usually take two {{t:street|streets}}", correct: true, why: "Yes: the geometric size is for getting the whole stack in. With {{t:bet|bets}} bigger than the {{t:pot}}, worse hands stop paying, and the hands that remain are better than one {{t:pair}}." }
      - { text: "Yes: I always bet geometrically", why: "The geometric size fits a whole-stack plan. {{t:top-pair|Top pair}} at a {{t:spr}} of about {{n:spr.srp}} usually doesn't have that plan." }
      - { text: "No: with {{t:top-pair}} I always {{t:check}}", why: "{{t:top-pair|Top pair}} wants {{t:bet|bets}} for value, just smaller ones and usually over two {{t:street|streets}}, not for the whole stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr|Stack-to-pot ratio}} {{n:spr.commit}}: the {{t:pot}} is {{n:ex.pot}}, stacks are {{n:commit.stack}} each. You bet about {{n:geo.spr2.2}} of the {{t:pot}} on the flop and on the turn, and your opponent {{t:call|calls}}. What about the rest of the stack?"
    options:
      - { text: "After the turn, the whole stack is in the {{t:pot}}", correct: true, why: "Yes: {{n:geo.spr2.flop}} on the flop and {{n:geo.spr2.turn}} on the turn add up to {{n:geo.spr2.total}}. That's why at a {{t:spr}} of {{n:spr.commit}}, two streets of {{t:value}} with {{t:top-pair}} are enough to play for the whole stack." }
      - { text: "About half is left for the river", why: "The {{t:pot}} grows by multiplication: after the flop it holds about {{n:geo.spr2.flop-after}}, and a {{t:bet}} of about {{n:geo.spr2.2}} on the turn is about {{n:geo.spr2.turn}}, i.e. the rest of the stack." }
      - { text: "Almost the whole stack is left", why: "At a {{t:spr}} of {{n:spr.commit}}, the stack is only {{n:spr.commit}} {{t:pot|pots}}. Two {{t:bet|bets}} of about {{n:geo.spr2.2}} of the {{t:pot}} put in the full {{n:geo.spr2.total}}." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
A good plan starts on the flop, before you make your first {{t:bet}}. Ask yourself: how many streets of {{t:value}} can my hand take, and do I want to play for the whole stack? The answer combines hand strength with the {{t:spr}}.

## How many streets of {{t:value}}

With each {{t:street}}, your opponent's worse hands {{t:fold}}, and the {{t:pot}} is left mostly with hands better than yours. That's why a stronger hand can take more {{t:bet|bets}}:

| Hand | Streets of {{t:value}} (usually) |
|---|---|
| Very strong: set, {{t:straight}}, high {{t:two-pair}} | Three |
| {{t:top-pair|Top pair}} with a good kicker, {{t:overpair}} | Two; a third when your opponent pays with weaker hands |
| Weaker {{t:pair}} (middle, low) | One or none |

The numbers of {{t:street|streets}} in the table are a simplification: a lot depends on the {{t:texture}} of the {{t:board}}, the turn and river cards, and your opponent.

## Combine the hand with the {{t:spr}}

- **A three-{{t:street}} hand, the {{t:spr}} zone allows playing for stacks, and you want the whole stack:** bet the geometric size from the flop (in a 3-bet {{t:pot}} {{t:in-position}}, about {{n:geo.3bet-ip.3}} of the {{t:pot}}).
- **A two-{{t:street}} hand at a low {{t:spr}}:** at a {{t:spr}} of about {{n:spr.commit}}, two {{t:bet|bets}} of about {{n:geo.spr2.2}} of the {{t:pot}} are already the whole stack, so you're playing for stacks.
- **A two-{{t:street}} hand at a high {{t:spr}}:** in a single-raised {{t:pot}} ({{t:spr}} about {{n:spr.srp}}), you bet for value but don't plan to get the whole stack in.

Three streets of {{t:value}} is not the same as playing for the whole stack. High {{t:two-pair}} can take three {{t:street|streets}}, but in a single-raised {{t:pot}} ({{t:spr}} about {{n:spr.srp}}, above {{n:spr.zone.deep}}) it usually doesn't play for the whole stack: in this zone, sets, {{t:straight|straights}} and better hands play for stacks ({{t:spr}} zones from the first lesson).

## Lines

A line is a plan of actions over the following {{t:street|streets}}. A few basic ones:

- **{{t:bet}}, {{t:bet}}, {{t:bet}}:** a hand for three streets of {{t:value}},
- **{{t:bet}}, {{t:bet}}, {{t:check}}:** a hand for two {{t:street|streets}}; on the river you get to showdown,
- **{{t:bet}} or {{t:check}}, then {{t:check}} and {{t:call}}:** a weaker {{t:pair}} that wants to reach showdown cheaply.

## The flop size sets the rest

The {{t:pot}} grows by multiplication, so a small {{t:bet}} on the flop leaves a small {{t:pot}} for the following {{t:street|streets}}. In a 3-bet {{t:pot}}, three {{t:bet|bets}} of 1/3 {{t:pot}} put in only about {{n:g3b.third.total}} of a {{n:spr.3bet-ip.stack}} stack, while three {{t:bet|bets}} of about {{n:geo.3bet-ip.3}} of the {{t:pot}} put in the whole stack.

:::note A plan isn't set in stone
On the turn and river, you reassess the plan: a scary card can reduce the number of streets of {{t:value}}. Modules M7 and M8 teach how to play the turn and river. The number of streets of {{t:value}} for hand classes is a heuristic, a synthesis of several training materials: in a single-raised {{t:pot}}, the {{t:spr}} is too high for many {{t:top-pair|top pairs}} to comfortably collect three streets of {{t:value}}.
:::
