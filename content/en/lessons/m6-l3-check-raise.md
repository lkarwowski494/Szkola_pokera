---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "When to raise a c-bet and to how much"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "You defend the {{t:big-blind|big blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} a 1/3-{{t:pot}} c-bet. What do you do?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:two-pair|Two pair}} on a low, {{t:connected}} flop is a hand for {{t:value}}. On flops like this, the {{t:big-blind|big blind}} has {{t:straight|straights}} and {{t:two-pair|two pair}} in its {{t:range}}, and the Button usually doesn't have a {{t:nuts-advantage}}. By {{t:raise|raising}}, you build the {{t:pot}} and make {{t:pair|pairs}} and {{t:draw|draws}} pay." }
      - { text: "{{t:call|Call}}", correct: true, why: "Also good: on a very {{t:connected}} flop, the solver just {{t:call|calls}} with some {{t:two-pair}} hands. A check-raise builds the {{t:pot}} and protects your hand more often." }
      - { text: "{{t:fold|Fold}}", why: "{{t:two-pair|Two pair}} is one of the strongest hands on this flop. {{t:fold|Folding}} is a big mistake." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "The {{t:pot}} is {{n:ex.third.pot}}, and the Button {{t:bet|bets}} {{n:ex.third.bet}} as a c-bet. You have a set and want to check-raise. What do you {{t:raise}} to?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "To {{n:xr.example}}", correct: true, why: "That's {{n:xr.mult.example}} the c-bet. The Button has to put in {{n:xr.example.extra}} more and needs about {{n:eq.vs-xr.example}} equity: worse {{t:pair|pairs}} and weak {{t:draw|draws}} (gutshots) don't have the price, while {{t:flush}} draws and {{t:oesd|open-ended straight draws}} will pay into a big {{t:pot}}." }
      - { text: "To {{n:xr.too-small}}", sizeError: true, why: "Right action, but the size is too small: the Button only puts in {{n:xr.too-small.extra}} more and needs about {{n:eq.vs-xr.too-small}} equity. Any {{t:flush-draw}} or {{t:straight}} draw will pay almost for free." }
      - { text: "{{t:call|Call}}", why: "On a flop with two hearts and {{t:straight}} cards, you give up value and protection: many turn cards will stop the action or beat your hand. A set wants to build the {{t:pot}} right away." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "The {{t:pot}} is {{n:ex.third.pot}}, and the Button {{t:bet|bets}} {{n:ex.third.bet}} as a c-bet. You check-raise to {{n:xr.mult.example}} the c-bet. What do you {{t:raise}} to? Enter the number of {{t:chips}}."
    table: { position: BB }
    answer: xr.example
    explanation: "The c-bet is {{n:ex.third.bet}}, so {{n:xr.mult.example}} the c-bet is {{n:xr.example}}. You size a check-raise from the c-bet, not from the {{t:pot}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "The {{t:pot}} was {{n:ex.third.pot}}, the Button {{t:bet}} {{n:ex.third.bet}}, and you {{t:raise|raised}} to {{n:xr.example}}. What percentage of equity does the Button need to {{t:call}}? Enter the number."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "The Button puts in {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}} more. The {{t:pot}} is then {{n:xr.example.pot-after}}, and after the Button's {{t:call}} it's {{n:xr.example.extra}} more. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "The {{t:pot}} was {{n:ex.third.pot}}, the Button {{t:bet}} {{n:ex.third.bet}}, and you {{t:raise|raised}} only to {{n:xr.too-small}}. How much equity does the Button need to {{t:call}}?"
    table: { position: BB }
    options:
      - { text: "About {{n:eq.vs-xr.too-small}}", correct: true, why: "The Button puts in {{n:xr.too-small.extra}} more to a {{t:pot}} of {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. At a price this cheap, the Button will call with almost any hand, which is why your {{t:raise}} should be several times bigger than the c-bet." }
      - { text: "About {{n:eq.vs-xr.example}}", why: "That's what the Button would need against a {{t:raise}} to {{n:xr.example}}. Against {{n:xr.too-small}}, the Button only puts in {{n:xr.too-small.extra}} more." }
      - { text: "About {{n:eq.bet-third}}", why: "That's what you needed to {{t:call}} the c-bet. After the check-raise, you calculate the Button's price: the Button puts in {{n:xr.too-small.extra}} more to a {{t:pot}} of {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "You defend the {{t:big-blind|big blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} a 1/3-{{t:pot}} c-bet. What do you do?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "A {{t:draw}} to the best {{t:flush}} is a good {{t:semi-bluff}}: you win when the Button {{t:fold|folds}}, and when the Button calls, you still have {{n:outs.flush}} outs (about {{n:odds.flush.flop-turn}} on the turn)." }
      - { text: "{{t:call|Call}}", correct: true, why: "Also good: you hit the {{t:flush}} on the turn about {{n:odds.flush.flop-turn}} of the time, almost as much as the price of {{n:eq.bet-third}}, and when you hit the best {{t:flush}}, you win more (implied odds). You play strong {{t:draw|draws}} both ways so that your check-raise doesn't represent only strong hands." }
      - { text: "{{t:fold|Fold}}", why: "A big mistake: with {{n:outs.flush}} outs, you hit the best {{t:flush}} on the turn about {{n:odds.flush.flop-turn}} of the time, almost as much as the price of {{n:eq.bet-third}}, and when you hit, you win more (implied odds). On top of that, you can check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "You defend the {{t:big-blind|big blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} a 1/3-{{t:pot}} c-bet. What do you do?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "An {{t:oesd}} ({{n:outs.oesd}} outs) against a small c-bet, which gives you a cheap chance to {{t:raise}}. By {{t:raise|raising}}, you can win right away, and if you get a {{t:call}}, you can still hit." }
      - { text: "{{t:call|Call}}", correct: true, why: "Also good: you hit the {{t:straight}} on the turn about {{n:odds.oesd.flop-turn}} of the time, a bit less than the price of {{n:eq.bet-third}}, but when you hit, you win more (implied odds), and if nobody {{t:bet|bets}} the turn, you also see the river for free. You {{t:call}} with some strong {{t:draw|draws}} so that your {{t:call|calls}} aren't all weak." }
      - { text: "{{t:fold|Fold}}", why: "Too tight: with {{n:outs.oesd}} outs, you hit the {{t:straight}} on the turn about {{n:odds.oesd.flop-turn}} of the time, not much less than the price of {{n:eq.bet-third}}; implied odds and the chance of a free river make up the rest. On top of that, you can check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "You defend the {{t:big-blind|big blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} a 1/3-{{t:pot}} c-bet. What do you do?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "{{t:top-pair|Top pair}} with a weak kicker is a {{t:call|calling}} hand. It beats the Button's {{t:bluff|bluffs}}, and by {{t:call|calling}}, you keep them in the game." }
      - { text: "Check-raise", why: "You usually {{t:call}}. After a {{t:raise}}, you mostly get paid by better hands and {{t:draw|draws}}; check-raising with a hand like this is a rare solver play against small c-bets." }
      - { text: "{{t:fold|Fold}}", why: "{{t:top-pair|Top pair}} against a small c-bet is far too strong to {{t:fold}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "You defend the {{t:big-blind|big blind}} against the Button's {{t:open}}. On the flop you {{t:check}}, and the Button {{t:bet|bets}} a 1/3-{{t:pot}} c-bet. What do you do?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You have no {{t:pair}} and no {{t:flush-draw}}; you only have a weak backdoor {{t:straight-draw}} (you need two specific cards), and neither of your cards is higher than the board. On ace-high flops, you {{t:fold}} more hands like this." }
      - { text: "Check-raise as a {{t:bluff}}", why: "You make check-raise {{t:bluff|bluffs}} mostly with {{t:draw|draws}} ({{t:flush}} draws, {{t:oesd|open-ended straight draws}}) that also win when they hit. This hand only has a weak backdoor {{t:draw}}, and the Button has lots of aces and kings here that won't {{t:fold}}." }
      - { text: "{{t:call|Call}}", why: "The price is good, but this hand will hit almost nothing: even a {{t:pair}} of sixes or fives loses to most hands the Button will keep paying with." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Against which Button c-bet do you check-raise more often?"
    table: { position: BB }
    options:
      - { text: "1/4 {{t:pot}}", correct: true, why: "A small c-bet gives you a cheap chance to {{t:raise}}, and the Button {{t:bet|bets}} it with a wide {{t:range}} that includes many weak hands. Against a big c-bet, you {{t:raise}} less often and narrower: mostly sets and {{t:two-pair}}, fewer {{t:bluff|bluffs}}." }
      - { text: "Full {{t:pot}}", why: "Against a big c-bet, a {{t:raise}} costs a lot, and the Button's {{t:range}} is stronger. You {{t:call}} or {{t:fold}} more often." }
      - { text: "Equally often", why: "Against small c-bets, you {{t:raise}} more often and wider; against big ones, less often, mostly with your strongest hands." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "You're playing against a Button who almost never {{t:fold|folds}} on the flop. The Button {{t:bet|bets}} a 1/3-{{t:pot}} c-bet. What do you do?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "A gutshot with a high card is a good {{t:call}} at a price of {{n:eq.bet-third}}. A check-raise {{t:bluff}} makes money from {{t:fold|folds}}, and this opponent hardly ever {{t:fold|folds}}, so the {{t:raise}} loses its main advantage." }
      - { text: "Check-raise", why: "You make check-raise {{t:bluff|bluffs}} mostly with strong {{t:draw|draws}}, and a gutshot isn't one of them. On top of that, a {{t:bluff}} makes money from {{t:fold|folds}}, and this opponent hardly ever {{t:fold|folds}}: against this player, you {{t:raise}} mostly for {{t:value}}." }
      - { text: "{{t:fold|Fold}}", why: "Too tight: a {{t:draw}} with a high card is worth defending at such a good price, no matter who you're playing against." }
---
A check-raise is a {{t:check}} followed by a {{t:raise}} of your opponent's {{t:bet}}. From the {{t:big-blind|big blind}}, it's an important weapon against c-bets (most of the time you're still choosing between a {{t:call}} and a {{t:fold}}): without it, the Button could c-bet cheaply with almost any hand.

## Why {{t:raise}}

You check-raise for two reasons:

- **for {{t:value}}**: you have a very strong hand ({{t:two-pair}}, a set) and want to build the {{t:pot}},
- **as a {{t:semi-bluff}}**: you have a {{t:draw}} ({{t:flush}} draw, {{t:oesd}}) that wins two ways: when the Button {{t:fold|folds}} or when you hit.

You usually {{t:call}} with medium hands, such as {{t:top-pair}} with a weak kicker: after a {{t:raise}}, the Button's worse hands {{t:fold}} more often, and better ones pay. This is a simplification: against small c-bets, the solver also {{t:raise|raises}} some {{t:top-pair}} hands and weak {{t:pair|pairs}} for protection. Conversely, the solver often just {{t:call|calls}} with {{t:two-pair}} on a very {{t:connected}} flop.

## When more often

- **Against a small c-bet.** A {{t:raise}} is cheap, and the Button {{t:bet|bets}} a small c-bet with a wide {{t:range}}. Against a big c-bet, you {{t:raise}} less often and narrower: mostly sets and {{t:two-pair}}, fewer {{t:bluff|bluffs}}.
- **On low, {{t:connected}} flops** (e.g. [[7h 6d 5s]]). The {{t:big-blind|big blind}} defends many low hands, which hit {{t:straight|straights}} and {{t:two-pair|two pair}} here, so the Button usually doesn't have a {{t:nuts-advantage}} here.
- **Less often on high flops that favor the Button**, e.g. K-J-T or A-A-K: there, the Button has more of the strongest hands.

## What size

You size a check-raise from the c-bet. Example: the {{t:pot}} is {{n:ex.third.pot}}, and the c-bet is {{n:ex.third.bet}}. A check-raise to {{n:xr.mult.example}} the c-bet is a {{t:raise}} to {{n:xr.example}}: the Button puts in {{n:xr.example.extra}} more and needs about **{{n:eq.vs-xr.example}}** equity. A {{t:raise}} to only {{n:xr.too-small}} gives the Button a price of about **{{n:eq.vs-xr.too-small}}**: the Button will call with almost any hand that has any {{t:draw}}. That's why you {{t:raise}} to about {{n:xr.mult.low}}–{{n:xr.mult.example}} the c-bet, more the smaller the c-bet is, and not the minimum.

:::note An opponent who doesn't {{t:fold}}
A check-raise {{t:bluff}} makes money from {{t:fold|folds}} (remember alpha from the first lesson). Against a player who almost never {{t:fold|folds}} on the flop, you {{t:raise}} mostly for {{t:value}} and save your {{t:bluff|bluffs}} for the strongest {{t:draw|draws}}.
:::
