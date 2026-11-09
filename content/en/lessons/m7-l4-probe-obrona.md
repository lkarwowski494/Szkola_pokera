---
id: m7.l4
module: m7
order: 4
title: "Probe bet and defense"
sub: "When your opponent checks or bets a second time"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "The Button {{t:open|opened}} and you {{t:call|called}} in the {{t:big-blind}}. You both check on the flop. On the turn you bet first. What is this {{t:bet}} called?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Yes: a probe bet is a {{t:bet}} {{t:out-of-position}} on the turn after the preflop {{t:aggressor}} didn't c-bet and {{t:check|checked}}." }
      - { text: "C-bet", why: "A c-bet is a {{t:bet}} from the player who {{t:raise|raised}} before the flop. You only {{t:call|called}}." }
      - { text: "Check-raise", why: "A check-raise is a {{t:check}} followed by a {{t:raise}} of your opponent's {{t:bet}}. Here you bet first and aren't {{t:raise|raising}} anyone." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Why can you bet more often than usual on the turn after the Button's {{t:check}} on the flop?"
    table: { position: BB }
    options:
      - { text: "Because the Button would bet many strong hands, so after a {{t:check}} they have fewer of them", correct: true, why: "Yes: strong hands usually c-bet. After a {{t:check}}, the Button's {{t:range}} has more medium and weak hands, and you can attack it with a {{t:bet}}." }
      - { text: "Because a {{t:check}} always means the Button has nothing", why: "Not always: the Button sometimes {{t:check|checks}} a strong hand to trap you. But they have fewer of them than when they bet." }
      - { text: "Because on the turn you have {{t:position}}", why: "No: the Button acts after you on every {{t:street}}. You make a probe {{t:bet}} {{t:out-of-position}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "The Button {{t:check|checked}} the flop. On which {{t:board}} do you make a probe {{t:bet}} more often from the {{t:big-blind}}?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Yes: low cards hit the {{t:big-blind}}'s wide defense more often (small {{t:pair|pairs}}, {{t:connectors}}), and after a {{t:check}} the Button rarely has a strong hand here." }
      - { text: "[[Ac Kd 8h Js]]", why: "On a high {{t:board}}, the Button has the {{t:range-advantage}}: many of their aces and kings hit. Here you make a probe {{t:bet}} less often." }
      - { text: "Equally often on both", why: "{{t:texture|Texture}} matters, just like with the c-bet in M5: on low boards you bet more often, on high ones less often." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "You're defending the {{t:big-blind}} against the Button's {{t:open}}. You both {{t:check|checked}} the flop. The turn is a three. You act first. What do you do?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Bet (probe bet)", correct: true, why: "You have an {{t:oesd}} (a four or a nine) on a low {{t:board}} that suits your {{t:range}}. You win when the Button {{t:fold|folds}}, and when they {{t:call}}, you still have {{n:outs.oesd}} outs." }
      - { text: "{{t:check|Check}}", correct: true, why: "Also fine: with a {{t:draw}} you can see the river for free if the Button {{t:check|checks}} too. A probe bet is usually better, though, because after a {{t:check}} on the flop the Button has a weak {{t:range}}, and you have a strong {{t:semi-bluff}}." }
      - { text: "{{t:fold|Fold}}", why: "Nobody has {{t:bet}}, so you can {{t:check}} for free (rule from module 1). A {{t:fold}} gives up the {{t:pot}} for no reason." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "You're defending the {{t:big-blind}} against the Button's {{t:open}}. You both {{t:check|checked}} the flop. The turn is a three. You act first. What do you do?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Bet (probe bet)", correct: true, why: "{{t:top-pair|Top pair}} is a good hand for a probe bet: the Button's weaker {{t:pair|pairs}} and high cards will pay you, and with a {{t:bet}} you don't give them a free card." }
      - { text: "{{t:check|Check}}", why: "After a {{t:check}} on the flop, the Button often has high cards without a {{t:pair}}. If they {{t:check}} again, they get a free card that may beat you, and you don't earn from their weaker hands." }
      - { text: "{{t:fold|Fold}}", why: "Nobody has {{t:bet}}, so you can {{t:check}} for free. And with {{t:top-pair}} you want to bet." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "You're defending the {{t:big-blind}} against the Button's {{t:open}}. You both {{t:check|checked}} the flop. The turn is a jack. You act first. What do you do?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "You have no {{t:pair}} and no {{t:draw}}, and the high {{t:board}} favors the Button's {{t:range}}. A probe bet with no outs on a {{t:board}} like this wins only when the Button {{t:fold|folds}}, and they have many aces, kings and jacks here." }
      - { text: "Bet (probe bet)", why: "You make a probe {{t:bet}} more often on low boards and with hands that have a {{t:pair}} or outs. Here you have neither." }
      - { text: "{{t:fold|Fold}}", why: "You can {{t:check}} for free, so a {{t:fold}} gains nothing (rule from module 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "You're defending the {{t:big-blind}}. You {{t:call|called}} the Button's c-bet on the flop. The turn is a deuce, you {{t:check}}, and the Button {{t:bet|bets}} {{n:ex.bet.three-quarters}} into a {{t:pot}} of {{n:ex.pot}}. What do you do?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You only have a gutshot (a jack): about {{n:odds.gutshot.turn-river}} on the river, and you need {{n:eq.bet-three-quarters}}. With no {{t:pair}} and one card to come, this hand can't defend against a {{t:second-barrel}}." }
      - { text: "{{t:call|Call}}", why: "The price is several times higher than your chance: {{n:eq.bet-three-quarters}} versus about {{n:odds.gutshot.turn-river}}. Implied odds won't cover a gap like that." }
      - { text: "Check-raise", why: "A {{t:second-barrel}} is a stronger {{t:range}} than a c-bet: the Button more often has a king or a better hand that won't {{t:fold}}. With {{n:outs.gutshot}} outs, it's an expensive {{t:bluff}}." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "You're defending the {{t:big-blind}}. You {{t:call|called}} the Button's c-bet on the flop. The turn is a king, you {{t:check}}, and the Button {{t:bet|bets}} only {{n:ex.bet.quarter}} into a {{t:pot}} of {{n:ex.pot}}. What do you do?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "You have an {{t:oesd}} (a jack or a six): about {{n:odds.oesd.turn-river}}. The small bet requires only {{n:eq.bet-quarter}}, which is almost exactly that, and if you hit, you can still win more on the river." }
      - { text: "{{t:fold|Fold}}", why: "With a bet this small, the price is almost equal to your chance ({{n:eq.bet-quarter}} versus about {{n:odds.oesd.turn-river}}), and implied odds tip the decision toward a {{t:call}}." }
      - { text: "{{t:raise|Raise}} all-in", why: "You risk your whole stack with a hand that has nothing yet, and the Button won't {{t:fold}} a king. At such a good price, a {{t:call}} is enough." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "You're defending the {{t:big-blind}}. You {{t:call|called}} the Button's c-bet on the flop. The turn is a five, you {{t:check}}, and the Button {{t:bet|bets}} {{n:ex.bet.three-quarters}} into a {{t:pot}} of {{n:ex.pot}}. What do you do?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "{{t:top-pair|Top pair}} is too much to {{t:fold}} on a blank card: it beats {{t:semi-bluff|semi-bluffs}} and weaker kings. You need {{n:eq.bet-three-quarters}}, and against a {{t:second-barrel}} {{t:range}} a {{t:pair}} like this usually has that much." }
      - { text: "{{t:fold|Fold}}", why: "Too tight. A {{t:second-barrel}} is stronger than a c-bet, but the Button also {{t:bet|bets}} it with {{t:draw|draws}} and {{t:bluff|bluffs}}. {{t:top-pair|Top pair}} beats them all." }
      - { text: "{{t:raise|Raise}}", why: "After a {{t:raise}}, worse hands {{t:fold}}, while better kings and sets pay. {{t:top-pair|Top pair}} with a medium kicker isn't a hand to {{t:raise}} with." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Why do you defend tighter against a {{t:second-barrel}} than against a c-bet on the flop?"
    table: { position: BB }
    options:
      - { text: "Because your opponent {{t:bet|bets}} the {{t:second-barrel}} with a narrower {{t:range}} and usually a bigger size, and {{t:draw|draws}} have only one card left", correct: true, why: "Yes: your opponent gives up some {{t:bluff|bluffs}} on the turn, a bigger bet lowers the {{t:mdf}} (at 3/4 {{t:pot}} it's {{n:mdf.bet-three-quarters}}), and your {{t:draw|draws}} lose half their chances. You {{t:fold}} weak {{t:pair|pairs}} and hands without outs more often than on the flop." }
      - { text: "Because on the turn you need to save {{t:chips}}", why: "What counts is the {{t:expected-value}} of each decision, not saving. You defend tighter because your opponent bets stronger hands." }
      - { text: "No, you defend wider because you've already put in a lot of {{t:chips}}", why: "What you've already put in doesn't come back. You decide based on the price now and the strength of your opponent's {{t:range}}." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. Your opponent {{t:bet|bets}} {{n:ex.bet.three-quarters}} into a {{t:pot}} of {{n:ex.pot}}. What is the {{t:mdf}}? Enter the number as a percentage."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + bet) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. In a published turn example, the solver defended close to the {{t:mdf}} on average; {{t:out-of-position}} you sometimes defend less (on the flop and on the turn). When you know your opponent {{t:bluff|bluffs}} less often, you {{t:fold}} more often (the math is in M8, in the lesson on catching {{t:bluff|bluffs}})."
---
On the turn you'll face two new situations: the Button didn't c-bet and {{t:check|checked}}, or they c-bet and are betting a second time. In the first, you can take the initiative and bet yourself; in the second, you defend tighter than on the flop.

## Probe bet

A probe bet is a {{t:bet}} {{t:out-of-position}} on the turn after the preflop {{t:aggressor}} {{t:check|checked}} the flop. The Button would have c-bet many strong hands, so after a {{t:check}} they have fewer of them. Their {{t:range}} is weaker and you can attack it.

- **More often on low boards**, e.g. [[8c 5d 2s 3h]]: low cards hit your wide defense.
- **Less often on high ones**, e.g. [[Ac Kd 8h Js]]: the {{t:range-advantage}} stays with the Button.

## What to probe bet with

- **{{t:pair|Pairs}}** that want to get paid by the Button's high cards and don't want to give them a free card,
- **strong {{t:draw|draws}}** that win in two ways.

Hands with no {{t:pair}} and no outs {{t:check}}.

## Defending against a {{t:second-barrel}}

When you've {{t:call|called}} a c-bet and the Button bets a second time, their {{t:range}} is narrower and stronger than on the flop: they've given up some {{t:bluff|bluffs}}. Your {{t:draw|draws}} have only one card left. So:

- {{t:draw|Draws}} {{t:call}} only at a good price or with implied odds (previous lesson),
- hands without outs and the weakest {{t:pair|pairs}} {{t:fold}} more often,
- {{t:top-pair}} usually still {{t:call|calls}}.

The {{t:mdf}} remains the reference point: against a 3/4 {{t:pot}} bet it's {{n:mdf.bet-three-quarters}}. In a published turn example, the solver defended close to this value on average; {{t:out-of-position}} you sometimes defend less. You also defend less when your opponent {{t:bluff|bluffs}} less often than the {{t:mdf}} assumes.

:::note Where these rules come from
The rules for probe betting and for defending against a {{t:second-barrel}} are heuristics from training materials and solver analyses. Turn defense close to the {{t:mdf}} is shown by a published solver example. The app doesn't give frequencies as percentages because sources differ depending on the board. Figures on what microstakes players make probe bets with require a source with a described population (sample, {{t:stakes}}, sites), so they aren't included here.
:::
