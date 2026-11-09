---
id: m6.l2
module: m6
order: 2
title: "Call or fold"
sub: "Defending against a c-bet out of position"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. The {{t:pot}} is {{n:ex.third.pot}}, and the Button {{t:bet|bets}} {{n:ex.third.bet}} as a c-bet. How much equity do you need to {{t:call}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "You put in {{n:ex.third.bet}} to a {{t:pot}} that will hold {{n:ex.third.total}} after your {{t:call}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. A small c-bet gives a very good price." }
      - { text: "{{n:alpha.bet-third}}", why: "That's alpha: how often the Button's {{t:bluff}} has to work. For required equity, add your own {{t:call}} to the denominator too." }
      - { text: "{{n:mdf.bet-third}}", why: "That's {{t:mdf}}, a share of your {{t:range}}, not the equity of a single hand. Besides, on the flop {{t:out-of-position}} you defend a little less than {{t:mdf}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. The {{t:pot}} is {{n:ex.pot}}, and the Button {{t:bet|bets}} {{n:ex.bet.three-quarters}} as a c-bet. What percentage of equity do you need to {{t:call}}? Enter a number."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "You put in {{n:ex.bet.three-quarters}} to a {{t:pot}} that will hold {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}} after your {{t:call}}. {{n:ex.bet.three-quarters}} ÷ this sum = {{n:eq.bet-three-quarters}}. That's almost twice as much as against a 1/4-{{t:pot}} c-bet ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "Same hand on the same flop. One time the Button {{t:bet|bets}} 1/3 {{t:pot}}, another time the full {{t:pot}}. How does your defense change?"
    table: { position: BB }
    options:
      - { text: "Against a full-{{t:pot}} bet you defend a narrower {{t:range}}", correct: true, why: "A bigger bet means a worse price: the required equity rises from {{n:eq.bet-third}} to {{n:eq.bet-pot}}, and {{t:mdf}} drops from {{n:mdf.bet-third}} to {{n:mdf.bet-pot}}. You now {{t:fold}} the weakest hands that called the small bet." }
      - { text: "You defend the same way, because it's the same hand", why: "Same hand, different price. Against a {{t:pot}}-sized bet you need {{n:eq.bet-pot}} equity instead of {{n:eq.bet-third}}." }
      - { text: "Against a full-{{t:pot}} bet you defend wider, because a big bet is more often a {{t:bluff}}", why: "There's no such rule. A big bet usually means a {{t:polarized}} {{t:range}} (very strong hands and {{t:bluff|bluffs}}), and in any case a worse price for you." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "You defend the {{t:big-blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} 1/3 {{t:pot}} as a c-bet. What do you do?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Middle {{t:pair}} beats all of the Button's {{t:bluff|bluffs}} (hands without a {{t:pair}}), and you only need {{n:eq.bet-third}} equity to {{t:call}}. A standard defense." }
      - { text: "{{t:fold|Fold}}", why: "Too tight. Against a small c-bet you {{t:fold}} the weakest hands with no {{t:pair}} and no {{t:draw}}, not a {{t:pair}}." }
      - { text: "Check-raise", why: "You usually {{t:call}}. After a {{t:raise}} you mostly get paid by better hands and {{t:draw|draws}}; check-raising this kind of hand is a rare solver play against small c-bets." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "You defend the {{t:big-blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} 3/4 {{t:pot}} as a c-bet. What do you do?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You have no {{t:pair}} and no {{t:draw}} (no spade, and a {{t:straight}} is far away). Against a big c-bet you need {{n:eq.bet-three-quarters}} equity, and {{t:out-of-position}} you'll rarely get to showdown with just high cards. A {{t:pair}} of queens or jacks won't always win either." }
      - { text: "{{t:call|Call}}", why: "Tempting, because the queen and jack are higher than the board. But bare high cards aren't enough at this price: on the turn you'll often face another bet and {{t:fold}}." }
      - { text: "Check-raise", why: "Hands with a {{t:draw}}, which have a second way to win, are better suited to a {{t:bluff}}. This hand has none." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "You defend the {{t:big-blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} 1/3 {{t:pot}} as a c-bet. What do you do?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Two high cards plus a backdoor {{t:flush-draw}} (three spades: you need a spade on both the turn and the river). At a price of {{n:eq.bet-third}} that's enough to {{t:call}}." }
      - { text: "Check-raise", why: "Usually not. You check-raise mainly with your strongest hands and {{t:draw|draws}} ({{t:flush}}, {{t:oesd}}). A backdoor {{t:flush-draw}} is weak: when the Button calls, you're usually left with just high cards. You {{t:call}} with this hand." }
      - { text: "{{t:fold|Fold}}", why: "Too tight against a small c-bet. The backdoor {{t:draw}} and two high cards give enough equity at a price of {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "You defend the {{t:big-blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} 1/3 {{t:pot}} as a c-bet. What do you do?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "You have a gutshot to a {{t:straight}} (a queen) and a king higher than the board. {{t:call|Calling}} buys one card: you hit the gutshot on the turn about {{n:odds.gutshot.flop-turn}} of the time, and the king adds a few outs to {{t:top-pair}}. Together that's less than the price of {{n:eq.bet-third}}, but when you hit the {{t:straight}} you'll win more (implied odds), and the king alone sometimes beats the Button's {{t:bluff|bluffs}}. Against a small c-bet that's enough to {{t:call}}." }
      - { text: "{{t:fold|Fold}}", why: "Too tight: a {{t:draw}} plus a high card is enough against a small c-bet." }
      - { text: "Check-raise all-in", why: "You risk your whole stack with a hand that doesn't have anything yet. That size pushes out weaker hands, and only better ones pay." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "You defend the {{t:big-blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} 1/3 {{t:pot}} as a c-bet. What do you do?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You have no {{t:pair}} and no {{t:flush-draw}}; you have only a weak backdoor {{t:straight-draw}} (you need two specific cards), and none of your cards is higher than the board. On an ace-king flop the Button has lots of strong hands. The price is good, but this hand will almost never realize it." }
      - { text: "{{t:call|Call}}, because {{t:mdf}} is {{n:mdf.bet-third}}", why: "{{t:mdf}} is a reference point for your whole {{t:range}}, not a reason to pay with your weakest hands. On the flop {{t:out-of-position}} you can defend a little less than {{t:mdf}}." }
      - { text: "Check-raise", why: "On an ace-king flop the {{t:range-advantage}} is with the Button, and you have no {{t:draw}} to give you a second way to win." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Why don't you {{t:call}} on the flop {{t:out-of-position}} with every hand whose equity is even slightly higher than the price?"
    table: { position: BB }
    options:
      - { text: "Because you won't realize all of your equity", correct: true, why: "Equity is your chance when the hand goes to showdown with no further {{t:bet|bets}}. {{t:out-of-position|Out of position}} you act first on the turn and river and will often {{t:fold}} to another bet. Weak hands then realize less than their equity." }
      - { text: "Because the Button always has a strong hand on the flop", why: "The Button {{t:open|opens}} and c-bets wide, including with {{t:bluff|bluffs}}. The problem is your {{t:position}}, not their strength." }
      - { text: "Because you should save {{t:chips}} for better spots", why: "What matters is the {{t:expected-value}} of each decision, not saving {{t:chips}}." }
---
In M5 you played the c-bet as the {{t:aggressor}}. Now you're on the other side: you defend the {{t:big-blind}}, check on the flop, and the Button {{t:bet|bets}} a c-bet. Remember from M5: a c-bet is a {{t:bet}} by the player who {{t:raise|raised}} preflop, and {{t:range-advantage}} depends on the flop's {{t:texture}}.

## The price of a c-bet

First, work out how much equity you need (the formula from M2). A small c-bet gives a great price, a big one a clearly worse one.

| Button's c-bet | Required equity | {{t:mdf}} |
|---|---|---|
| 1/4 {{t:pot}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 {{t:pot}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 {{t:pot}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 {{t:pot}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| Full {{t:pot}} | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

{{t:mdf}} shows the direction: the bigger the bet, the fewer hands you defend. On the flop {{t:out-of-position}} you can defend a little less than {{t:mdf}}, because the Button's {{t:bluff|bluffs}} still have equity, but you don't {{t:fold}} en masse to a small c-bet.

## You realize less {{t:out-of-position}}

Equity is your chance when you play to the end with no further {{t:bet|bets}}. {{t:out-of-position|Out of position}} you act first on every {{t:street}}, so you'll often {{t:fold}} before you see showdown. Weak hands with no {{t:draw}} realize less than their equity suggests. Suited hands, {{t:connectors}} and {{t:pair|pairs}} realize more, because they make strong hands or are already winning.

## What you {{t:call}} with

Against a small c-bet (about 1/3 {{t:pot}}) you continue with:

- almost any {{t:pair}}, including middle and bottom pair,
- {{t:flush-draw|flush draws}} and {{t:straight}} draws, including a gutshot with a high card,
- high cards with a backdoor {{t:draw}}, e.g. three cards of one suit,
- usually also ace-high.

Remember from M2: a {{t:call}} of a {{t:bet}} on the flop buys one card, so you compare a {{t:draw}} with your chance on the turn. That chance is sometimes a little lower than the price of a small c-bet. {{t:call|Calling}} still pays off when you'll win more after hitting than what's in the {{t:pot}} now (so-called implied odds, which you'll calculate in M7), or when the hand sometimes wins without hitting, e.g. thanks to a high card.

## What you {{t:fold}}

- hands with no {{t:pair}} and no {{t:draw}} that have no ace and no cards higher than the board; on ace-high flops you {{t:fold}} more of them,
- usually two high cards with no {{t:draw}} when the c-bet is big (though on {{t:dry}} king-high flops the solver {{t:call|calls}} with many hands with an ace); you'd rather {{t:call}} when you have a backdoor {{t:draw}}, ideally to the nut {{t:flush}}.

As the c-bet grows, the next-weakest hands move from {{t:call|calling}} to folding.
