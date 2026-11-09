---
id: m7.l2
module: m7
order: 2
title: "Polarization"
sub: "Big bet: strong hands and semi-bluffs"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Which turn betting {{t:range}} is {{t:polarized}}?"
    options:
      - { text: "Sets, {{t:two-pair}} and {{t:draw|draws}}, no medium {{t:pair|pairs}}", correct: true, why: "Yes: a {{t:polarized}} {{t:range}} has two poles, very strong hands and {{t:semi-bluff|semi-bluffs}}. The middle, meaning medium hands, isn't in it: those hands {{t:check}}." }
      - { text: "{{t:top-pair|Top pairs}}, medium {{t:pair|pairs}} and weaker {{t:pair|pairs}}", why: "There's no pole here: very strong hands and {{t:semi-bluff|semi-bluffs}} are missing, and it's just {{t:pair|pairs}} from the top down. This is closer to a {{t:linear}} {{t:range}}, which bets mainly with value hands, usually with a small size, not a big one on the turn." }
      - { text: "Only {{t:bluff|bluffs}}", why: "Your opponent will easily spot a {{t:range}} with no strong hands and will {{t:call}}. A {{t:polarized}} {{t:range}} combines {{t:bluff|bluffs}} with very strong hands." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "On the {{t:dry}} [[Ks 7d 2c]] flop, you bet small with almost all your hands: from sets down to weak {{t:pair|pairs}}. What is this betting {{t:range}} called?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Linear}}", correct: true, why: "Yes: strong and medium hands bet together, with a small size. That's the M5 plan on a {{t:dry}}, high flop where you have the {{t:range-advantage}}." }
      - { text: "{{t:polarized|Polarized}}", why: "A {{t:polarized}} {{t:range}} has no medium hands: only very strong hands and {{t:bluff|bluffs}} bet. Here weak {{t:pair|pairs}} bet too." }
      - { text: "Capped", why: "A capped {{t:range}} is one that's missing the strongest hands. You bet with sets too." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Why doesn't a medium {{t:pair}} like a big bet on the turn?"
    options:
      - { text: "Because worse hands will {{t:fold}} and better ones will pay", correct: true, why: "Yes: a big bet with a medium {{t:pair}} only makes money when a worse hand pays, and those hands usually {{t:fold}} to a big bet. What's left are {{t:call|calls}} from hands that beat you." }
      - { text: "Because a big bet is always a {{t:bluff}}", why: "No: the strongest hands also {{t:bet}} big. The problem for a medium {{t:pair}} is who pays it off." }
      - { text: "Because a medium {{t:pair}} can't win", why: "It can: it beats {{t:bluff|bluffs}} and worse {{t:pair|pairs}}. That's why it {{t:check|checks}} and gets to showdown cheaply." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "You {{t:open|opened}} from the Button, and the {{t:big-blind}} {{t:call|called}} your flop c-bet. The turn is a deuce. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:check|checks}}. You have a set. What do you do?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Bet {{n:ex.bet.three-quarters}}", correct: true, why: "Yes: your opponent may have a {{t:draw}} to a {{t:flush}} (two hearts) and to a {{t:straight}} (e.g. 65, T9). Against a 3/4-{{t:pot}} bet, a {{t:flush-draw}} needs {{n:eq.bet-three-quarters}} equity, and the {{t:flush}} comes in about {{n:odds.flush.turn-river}} of the time. Against your set they have even less: [[4h]] and [[2h]] give you a {{t:full-house}}, so they have {{n:outs.flush.vs-set}} clean outs left, about {{n:odds.flush.vs-set}}. They're paying too much." }
      - { text: "Bet {{n:ex.bet.quarter}}", sizeError: true, why: "Right action, wrong size: against a 1/4-{{t:pot}} bet, a {{t:draw}} needs only {{n:eq.bet-quarter}} equity, so it gets a good price. With a very strong hand on a {{t:board}} with a {{t:flush-draw}}, you bet big." }
      - { text: "{{t:check|Check}}", why: "A free card is a gift to {{t:draw|draws}}, and you don't build the {{t:pot}} before the river. A set on a {{t:board}} with a {{t:flush-draw}} bets." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "You {{t:open|opened}} from the Button, and the {{t:big-blind}} {{t:call|called}} your flop c-bet. The turn is a three. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:check|checks}}. What do you do?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Bet {{n:ex.bet.three-quarters}}", correct: true, why: "Yes: a {{t:flush-draw}} with two high cards is a good {{t:semi-bluff}}. You bet the same big size as your strong hands, so your opponent can't tell a {{t:bluff}} from value." }
      - { text: "Bet {{n:ex.bet.quarter}}", sizeError: true, why: "Right action, wrong size: your opponent will {{t:call}} a bet this cheap with any {{t:pair}}, and a {{t:semi-bluff}} makes money mainly from {{t:fold|folds}}. If your small bets meant {{t:draw|draws}} and your big bets meant strong hands, your opponent could easily exploit it." }
      - { text: "{{t:check|Check}}", correct: true, why: "Also fine: you see the river for free and hit your {{t:flush}} {{n:odds.flush.turn-river}} of the time. Betting is usually better, though, because a {{t:draw}} with high cards is one of the best {{t:semi-bluff|semi-bluffs}}, and by {{t:check|checking}} you give up winning the {{t:pot}} right away." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "You {{t:open|opened}} from the Button, and the {{t:big-blind}} {{t:call|called}} your flop c-bet. The turn is a five. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:check|checks}}. What do you do?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "{{t:top-pair|Top pair}} with a weak kicker is a medium hand. A big bet gets paid mostly by better kings (AK, KQ, KJ), and worse hands will {{t:fold}}. By {{t:check|checking}}, you get to showdown cheaply." }
      - { text: "Bet {{n:ex.bet.three-quarters}}", why: "A big bet fits a {{t:polarized}} {{t:range}}. With this hand you mostly get paid by hands that beat you." }
      - { text: "Bet {{n:ex.bet.pot}}", why: "An even bigger {{t:pot}} with a medium-strength hand: worse hands will almost always {{t:fold}}, and better ones will pay." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. The {{t:pot}} is {{n:ex.pot}}, and you bet {{n:ex.bet.three-quarters}} with a very strong hand. What percentage of equity does an opponent with a {{t:draw}} need to {{t:call}}? Enter a number."
    answer: eq.bet-three-quarters
    explanation: "Your opponent puts {{n:ex.bet.three-quarters}} into a {{t:pot}} that, after the {{t:call}}, is {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. A {{t:flush-draw}} has about {{n:odds.flush.turn-river}} on the turn, so they're paying too much."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. You have a set and bet only {{n:ex.bet.quarter}} into a {{t:pot}} of {{n:ex.pot}}. Your opponent has a {{t:flush-draw}} (about {{n:odds.flush.turn-river}} by the river). What follows from this?"
    options:
      - { text: "They get a good price: they need only {{n:eq.bet-quarter}}", correct: true, why: "Yes: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, less than their {{n:odds.flush.turn-river}}. {{t:call|Calling}} is profitable for them, and your small bet gives away some of your value." }
      - { text: "They have to {{t:fold}} because they need {{n:eq.bet-three-quarters}}", why: "That's what they'd need against a 3/4-{{t:pot}} bet. Against a 1/4-{{t:pot}} bet, {{n:eq.bet-quarter}} is enough." }
      - { text: "The price doesn't matter, because you beat them anyway", why: "You beat them now, but about {{n:odds.flush.turn-river}} of the time they win on the river. Your bet size decides whether they pay too much or too little for that chance." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "On the turn, your opponent has an {{t:oesd}}: about {{n:odds.oesd.turn-river}} by the river. From what size of your bet are they paying too much (counting only pot odds)?"
    options:
      - { text: "From as little as 1/3 {{t:pot}}: they need {{n:eq.bet-third}}", correct: true, why: "Yes: {{n:eq.bet-third}} is more than {{n:odds.oesd.turn-river}}. On the turn, {{t:draw|draws}} have only one card to come, so even a medium bet gives them a bad price." }
      - { text: "Only from a full {{t:pot}}: they need {{n:eq.bet-pot}}", why: "Against a full-{{t:pot}} bet they pay far too much, but already at 1/3 {{t:pot}} they need {{n:eq.bet-third}}, more than their {{n:odds.oesd.turn-river}}." }
      - { text: "Never, a {{t:draw}} can always {{t:call}}", why: "A {{t:draw}} {{t:call|calls}} only with a good price or with implied odds (next lesson). On the turn it has about {{n:odds.oesd.turn-river}}, so most bets give it a bad price." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. The {{t:pot}} is {{n:ex.pot}}, and you bet the whole {{t:pot}}: {{n:ex.bet.pot}}. What percentage of equity does your opponent need to {{t:call}}? Enter a number."
    answer: eq.bet-pot
    explanation: "Your opponent puts {{n:ex.bet.pot}} into a {{t:pot}} that, after the {{t:call}}, is {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Neither a {{t:flush}} draw (about {{n:odds.flush.turn-river}}) nor an open-ended {{t:straight}} draw (about {{n:odds.oesd.turn-river}}) has that kind of chance."
---
On the flop you often bet small with almost your whole {{t:range}}. On the turn your betting {{t:range}} changes: it keeps very strong hands and {{t:semi-bluff|semi-bluffs}}, while medium hands {{t:check}}. We call this kind of {{t:range}} {{t:polarized}}.

## Two kinds of {{t:range}}

- **{{t:linear|Linear}}:** you bet from the strongest hands down, medium hands included. Usually with a small size, e.g. a c-bet of {{n:cbet.size.small}} of the {{t:pot}} on [[Ks 7d 2c]].
- **{{t:polarized|Polarized}}:** the two poles bet, very strong hands (sets, {{t:two-pair}}, {{t:straight|straights}}, flushes) and {{t:semi-bluff|semi-bluffs}} ({{t:draw|draws}}). There are no medium hands in it.

In general, a {{t:polarized}} {{t:range}} is very strong hands plus {{t:bluff|bluffs}}. On the turn, the {{t:bluff|bluffs}} are usually {{t:semi-bluff|semi-bluffs}}; on the river (M8), they're hands with no chance at showdown.

## Why you polarize on the turn

Your opponent {{t:call|called}} the flop, so they usually have a {{t:pair}} or a {{t:draw}}, sometimes high cards with a backdoor (M6). A medium hand gains nothing from a second bet: worse hands {{t:fold}} and better ones pay. Strong hands want to build the {{t:pot}} before the river, and {{t:semi-bluff|semi-bluffs}} need {{t:fold|folds}} and have outs when they get {{t:call|called}}.

## {{t:polarized|Polarized}} {{t:range}}, big bet

A {{t:polarized}} {{t:range}} bets big, e.g. 3/4 of the {{t:pot}}. Strong hands extract more {{t:chips}}, and {{t:semi-bluff|semi-bluffs}} win right away more often. Medium hands {{t:check}}. When {{t:bluff|bluffs}} and strong hands bet the same size, your opponent doesn't know what you have.

## The price for {{t:draw|draws}}

On the turn, a {{t:draw}} has only one card to come. A big bet makes it pay too much:

| Your bet | Opponent needs | {{t:flush|Flush}} has | Open-ended {{t:straight}} has |
|---|---|---|---|
| 1/4 {{t:pot}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 {{t:pot}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 {{t:pot}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 {{t:pot}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| Full {{t:pot}} | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Against a 1/4-{{t:pot}} bet, a {{t:flush-draw}} gets a good price. At 1/3 {{t:pot}}, the price is almost equal to the {{t:flush}}'s chance ({{n:eq.bet-third}} vs {{n:odds.flush.turn-river}}), and from 1/2 {{t:pot}} up, the {{t:flush}} pays clearly too much, unless it's counting on implied odds (next lesson). The {{t:draw}} exercises in this lesson count only pot odds.

:::note Where these rules come from
The concepts of {{t:polarized}} and {{t:linear}} {{t:range|ranges}} and the rule "a {{t:polarized}} {{t:range}} bets big, medium hands {{t:check}}" come from training materials and are a heuristic here; so is the advice to bet big with a strong, vulnerable hand. Solvers also use small sizes on the turn. The 3/4-{{t:pot}} size is an example for practice, not the only good size. The prices in the table are the app's exact calculations.
:::
