---
id: m7.l3
module: m7
order: 3
title: "Draws and implied odds"
sub: "How much you need to win later"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "On the flop you had about {{n:odds.flush.flop-river}} to make a {{t:flush}} by the river. The turn didn't help. What are your chances now?"
    options:
      - { text: "About {{n:odds.flush.turn-river}}", correct: true, why: "Yes: one card is left. {{n:outs.flush}} outs out of {{n:cards.unseen.turn}} unseen cards is {{n:odds.flush.turn-river}}, roughly half the chance you had on the flop." }
      - { text: "Still about {{n:odds.flush.flop-river}}, because the number of outs is the same", why: "The number of outs is the same, but fewer cards are left to come. {{n:odds.flush.flop-river}} counts two cards, and on the turn only one is left." }
      - { text: "You can't work it out without a calculator", why: "You can: the rule of 2 and 4 from M2. One card, so outs × 2: roughly {{n:odds.flush.rule-turn}}. Exactly {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. How many outs do you have to a {{t:flush}} or a {{t:straight}}? Enter a number."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "For the {{t:flush}}, {{n:outs.flush}} hearts; for the {{t:straight}}, every queen and every seven, i.e. {{n:outs.oesd}} cards. The queen of hearts and the seven of hearts are already counted in the flush, so subtract {{n:draw.combo.overlap}}: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} {{n:ex.bet.three-quarters}}. What do you do?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "You have {{n:outs.combo}} outs, i.e. about {{n:odds.combo.turn-river}} on the river. You need {{n:eq.bet-three-quarters}}, so a {{t:call}} is profitable even without implied odds." }
      - { text: "{{t:fold|Fold}}, because a {{t:draw}} on the turn isn't enough", why: "A plain {{t:draw}} really is a {{t:fold}} at this price, but a {{t:flush}} draw combined with a {{t:straight}} draw gives about {{n:odds.combo.turn-river}}, more than the {{n:eq.bet-three-quarters}} you need." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. The {{t:pot}} is {{n:ex.third.pot}}, and your opponent {{t:bet|bets}} {{n:io.flush.bet}}. You have a {{t:flush-draw}}: {{n:outs.flush}} outs out of {{n:cards.unseen.turn}} cards. How many {{t:chips}} do you need to win in addition on the river when you hit for the {{t:call}} to break even? Enter a number."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "You need {{n:io.flush.eq}} equity, and you have about {{n:odds.flush.turn-river}}. Out of {{n:cards.unseen.turn}} possible rivers, you hit {{n:outs.flush}} times and miss {{n:miss.flush.turn}} times, losing {{n:io.flush.bet}} each time. So each hit must bring in {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. The {{t:pot}} holds {{n:io.flush.pot-after-bet}}, so {{n:io.flush.extra}} is missing."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. The {{t:pot}} is {{n:io.oesd.pot}}, and your opponent {{t:bet|bets}} {{n:io.oesd.bet}}. You have an {{t:oesd}}: {{n:outs.oesd}} outs, {{n:miss.oesd.turn}} cards that miss. How much do you need to win in addition on the river when you hit?"
    options:
      - { text: "About {{n:io.oesd.extra}}", correct: true, why: "Each hit must bring in {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. The {{t:pot}} holds {{n:io.oesd.pot-after-bet}}, so {{n:io.oesd.extra}} is missing." }
      - { text: "About {{n:io.oesd.need}}", why: "That's how much you need to win in total on each hit. Part of it is already in the {{t:pot}} ({{n:io.oesd.pot-after-bet}}), so {{n:io.oesd.extra}} is still missing." }
      - { text: "Nothing, the price is good enough", why: "You need {{n:eq.bet-half}} equity, and you have about {{n:odds.oesd.turn-river}}. The {{t:pot}} alone isn't enough; {{n:io.oesd.extra}} is missing." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. The {{t:pot}} is {{n:ex.third.pot}}, and your opponent {{t:bet|bets}} {{n:io.flush.bet}}. Each of you still has {{n:io.flush.stack}} behind, and your opponent happily pays off with a {{t:pair}} of aces. What do you do?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "The price alone isn't enough ({{n:io.flush.eq}} vs. about {{n:odds.flush.turn-river}}), but when you hit you only need to win another {{n:io.flush.extra}}. You have a {{t:draw}} to the best {{t:flush}} (the ace of hearts is on the {{t:board}}, so the king-high {{t:flush}} is the highest), your opponent has plenty of {{t:chips}} behind, and a player with a {{t:pair}} of aces will often pay a bet like that on the river. Your hit will be visible (a third heart), but an opponent with a {{t:pair}} of aces will often pay anyway; that's why the implied odds here are smaller than with a hidden hit." }
      - { text: "{{t:fold|Fold}}, because {{n:odds.flush.turn-river}} is less than {{n:io.flush.eq}}", why: "Pot odds say “{{t:fold}}”, but you're ignoring implied odds. Only {{n:io.flush.extra}} is missing, and your opponent has {{n:io.flush.stack}} behind and a hand that will pay." }
      - { text: "{{t:raise|Raise}} all-in", why: "An opponent with a {{t:pair}} of aces will likely {{t:call}}, and then you only have about {{n:odds.flush.turn-river}}. It's better to see the river cheaply and win more when you hit." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} {{n:ex.bet.half}}. You have a gutshot. After hitting you'd need to win another {{n:io.gut.extra}}, but your opponent has only {{n:io.gut.stack}} left behind. What do you do?"
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "A gutshot gives about {{n:odds.gutshot.turn-river}}, and you need {{n:eq.bet-half}}. Implied odds won't help: even if your opponent puts in all {{n:io.gut.stack}}, it won't cover the missing {{n:io.gut.extra}}." }
      - { text: "{{t:call|Call}}, because of implied odds", why: "Implied odds are the {{t:chips}} your opponent can still pay you. They only have {{n:io.gut.stack}}, and you need {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Raise}} all-in", why: "An all-in {{t:bluff}} with {{n:outs.gutshot}} outs risks everything. An opponent who {{t:bet}} half the {{t:pot}} with such a small stack often won't {{t:fold}} anymore." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. The {{t:pot}} is {{n:ex.pot}}, and a cautious opponent {{t:bet|bets}} the whole {{t:pot}}: {{n:ex.bet.pot}}. What do you do?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You need {{n:eq.bet-pot}}, and you have about {{n:odds.flush.turn-river}}. On top of that, your {{t:flush}} is low: when a heart comes, an opponent with the queen or jack of hearts has a better {{t:flush}}, and that's when you lose the most (reverse implied odds)." }
      - { text: "{{t:call|Call}}, because of implied odds", why: "The implied odds here are poor: a made {{t:flush}} can lose to a higher one, and everyone can see a third heart on the {{t:board}}. A lot is missing, too: the price is {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Raise}}", why: "A cautious opponent who {{t:bet|bets}} the whole {{t:pot}} on a {{t:board}} with an ace and a king will rarely {{t:fold}}. You're risking a lot with a hand that can lose even when it hits." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "When are implied odds the biggest?"
    options:
      - { text: "When you have a {{t:draw}} to the best hand, and your opponent has a strong hand and plenty of {{t:chips}} behind", correct: true, why: "Yes: then you win when you hit, and your opponent has both the chips and the hand to pay you." }
      - { text: "When your opponent has few {{t:chips}} (low {{t:spr}})", why: "The opposite: with a low {{t:spr}}, your opponent has nothing left to pay, so implied odds are small." }
      - { text: "When you have a {{t:draw}} to a low {{t:flush}}", why: "That's reverse implied odds: sometimes you hit and still lose, and in a big {{t:pot}}." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "At the start of the turn, the {{t:pot}} is {{n:ex.pot}}, and the smaller of your two stacks is {{n:spr.stack.high}}. What is the {{t:spr}}?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = stack ÷ {{t:pot}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. Your opponent has several {{t:pot|pots}} behind, so implied odds can be big." }
      - { text: "{{n:spr.low}}", why: "That's what it would be with a {{n:spr.stack.low}} stack. Here the stack is {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "That's the {{t:pot}}. The {{t:spr}} is a ratio: the stack divided by the {{t:pot}}." }
---
On the turn, only one card is left to come. The chance of your {{t:draw}} drops by roughly half, and the price of the next card usually goes up. That's why on the turn you count more precisely and ask a new question: how much can I win later if I hit?

## One card to go

| {{t:draw|Draw}} | Outs | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| Open-ended {{t:straight}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Flush}} + open-ended {{t:straight}} | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

With the rule of 2 and 4 from M2, multiply your outs by 2. When two {{t:draw|draws}} share cards, count those cards once.

## Implied odds

Implied odds are the {{t:chips}} you'll win on the river when you hit. Example: the {{t:pot}} is {{n:ex.third.pot}}, your opponent {{t:bet|bets}} {{n:io.flush.bet}}, and you have a {{t:flush-draw}}. You need {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} equity, and you have about {{n:odds.flush.turn-river}}. The {{t:pot}} alone isn't enough.

Out of {{n:cards.unseen.turn}} possible rivers, you hit {{n:outs.flush}} times and miss {{n:miss.flush.turn}} times. To break even, each hit must bring in as much as the misses cost:

```formula
required win = amount to call × (cards that miss ÷ outs)
```

Here: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. The {{t:pot}} holds {{n:io.flush.pot-after-bet}}, so on the river you need to get another **{{n:io.flush.extra}}** on average.

## {{t:spr}}: how many {{t:chips}} your opponent has behind

The {{t:spr}} (stack-to-{{t:pot}} ratio) is the {{t:effective-stack}}, i.e. the smaller of the two stacks, divided by the {{t:pot}} at the start of the {{t:street}}. You can calculate the {{t:spr}} on any {{t:street}}; here you calculate it on the turn. With a {{t:pot}} of {{n:ex.pot}} and a stack of {{n:spr.stack.high}}, the {{t:spr}} is {{n:spr.high}}, meaning your opponent still has several {{t:pot|pots}} behind; with a stack of {{n:spr.stack.low}}, it's only {{n:spr.low}}. Implied odds can't be larger than the {{t:chips}} your opponent still has in front of them. With a low {{t:spr}}, almost only pot odds matter. More on the {{t:spr}} in the “Hand Planning” module (M9), which plans the hand around the {{t:spr}} on the flop.

## When implied odds are real

- you have a {{t:draw}} to the **best hand** (the highest possible {{t:flush}}, usually with the ace),
- your opponent has a **strong hand** they'll pay off with,
- your opponent has **plenty of {{t:chips}}** behind (high {{t:spr}}),
- your hit **doesn't stand out** (e.g. a gutshot is less visible than a third heart on the {{t:board}}).

Reverse implied odds work against you: when you have a {{t:draw}} to a low {{t:flush}}, or to a {{t:straight}} while a {{t:flush}} can come on the {{t:board}}, sometimes you hit and still lose, and in a big {{t:pot}}.

:::note Where these rules come from
The implied odds calculation is an exact calculation based on {{t:expected-value}}. The conditions for when implied odds are real, and reverse implied odds, are heuristics from training materials.
:::
