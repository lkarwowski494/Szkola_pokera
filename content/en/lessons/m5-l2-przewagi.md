---
id: m5.l2
module: m5
order: 2
title: "Who the flop favors"
sub: "Range advantage and nuts advantage"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}}. Flop: [[Ks 7d 2c]]. Who has the {{t:range-advantage}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "You, the {{t:open|opener}} from the Button", correct: true, why: "Yes: your {{t:range}} contains all KK, AK and KQ. The {{t:big-blind}} would raise the strongest of them before the flop, and their wide defense is mostly hands that missed here." }
      - { text: "The {{t:big-blind}}", why: "No: the {{t:big-blind}} has more weak hands because they defended wide. They have a king with a good kicker less often than you." }
      - { text: "Nobody, the flop is random", why: "The flop is random, but {{t:range|ranges}} are not. The same flop fits better with the {{t:range}} that contains more high cards." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}}. Flop: [[7s 6h 5d]]. Who more often has a very strong hand here ({{t:two-pair}} or a {{t:straight}})?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "The {{t:big-blind}}", correct: true, why: "Yes: the {{t:big-blind}} defends many suited {{t:connectors}} and hands with a six or a seven. From the Button you have more high cards that missed here. This is the {{t:big-blind}}'s {{t:nuts-advantage}}." }
      - { text: "You, the {{t:open|opener}} from the Button", why: "No: your {{t:range}} is full of high cards. You have more {{t:overpair|overpairs}} ({{t:pocket-pair|pocket pairs}} higher than every card on the {{t:board}}, e.g. TT, JJ), but fewer {{t:two-pair|two pairs}} and {{t:straight|straights}}; you both have a similar number of sets (three of a kind with a {{t:pocket-pair}})." }
      - { text: "Both equally often", why: "No: the {{t:range|ranges}} differ in makeup. The {{t:big-blind}}'s wide defense has many small cards, and your {{t:range}} has high ones." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Why does a {{t:big-blind}} who only {{t:call|called}} your {{t:open}} rarely have AA or AK on an [[Ad 8s 3c]] flop?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Because with these hands they usually {{t:raise}} before the flop (3-bet)", correct: true, why: "Yes: the {{t:big-blind}} plays their strongest hands with a 3-bet, so after just a {{t:call}} their {{t:range}} has few of the best hands. Your {{t:range}} has all of them." }
      - { text: "Because the {{t:big-blind}} never plays aces", why: "No: the {{t:big-blind}} defends many aces, e.g. A5 or A9. They mainly lack the strongest ones, which they would raise." }
      - { text: "Because there is already an ace on the flop", why: "The ace on the {{t:board}} reduces the number of ace {{t:combo|combos}} in both {{t:range|ranges}}, but it doesn't create a difference between them. The difference comes from the decisions before the flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "You have the {{t:range-advantage}}, but your opponent has as many of the strongest hands as you. What size do you tend to bet?"
    options:
      - { text: "Small, and often", correct: true, why: "Yes: the {{t:range-advantage}} says you can bet often. Without a {{t:nuts-advantage}}, a big {{t:bet}} risks a lot against your opponent's strongest hands, and weaker hands {{t:fold}} to a small one anyway." }
      - { text: "Big, because you have the advantage", why: "No: a big size is decided by the {{t:nuts-advantage}}, meaning more of the strongest hands. You don't have it here." }
      - { text: "Always {{t:check}}", why: "Too cautious: the {{t:range-advantage}} is a reason to bet often, just small." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Your {{t:range}} has many more of the strongest hands than your opponent's {{t:range}}. What does that give you?"
    options:
      - { text: "You can bet big, because you will rarely run into a better hand", correct: true, why: "Yes: that's the {{t:nuts-advantage}}. A big {{t:bet}} extracts more from your opponent's medium hands, and a {{t:raise}} from a better hand is rare." }
      - { text: "You must always bet small", why: "No: you choose a small size when you only have the {{t:range-advantage}}. The {{t:nuts-advantage}} lets you bet bigger." }
      - { text: "Nothing, only your hand matters", why: "Your hand matters, but your opponent sees only your {{t:range}}. The {{t:bet}} size is chosen to fit many hands at once." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Your opponent has two cards of different rank, e.g. [[Jc Td]]. In what percentage of cases will the flop pair neither of them? Enter a number."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Of the {{n:cards.unseen.preflop}} unknown cards, only {{n:pair.outs.unpaired}} make a {{t:pair}}: the three remaining jacks and the three remaining tens. The flop is {{n:cards.board.flop}} cards, and the chance that none of them is one of those {{n:pair.outs.unpaired}} is about {{n:flop.miss.unpaired}}. So you hit a {{t:pair}} only about {{n:flop.hit.unpaired}} of the time."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "A hand without a {{t:pair}} misses a {{t:pair}} on the flop about {{n:flop.miss.unpaired}} of the time. What does this mean for the c-bet?"
    options:
      - { text: "Your opponent often has nothing, so even a small {{t:bet}} often wins the {{t:pot}} right away", correct: true, why: "Yes: this is the basis of the c-bet. A miss doesn't always mean a {{t:fold}} (your opponent may have a {{t:draw}} or high cards), but there are many weak hands in their {{t:range}}." }
      - { text: "Your opponent will {{t:fold}} exactly {{n:flop.miss.unpaired}} of the time", why: "No: an opponent without a {{t:pair}} sometimes {{t:call|calls}} with a {{t:draw}} or a high card, and sometimes holds a {{t:pair}} in their hand. It's only an approximation of how often the flop missed them." }
      - { text: "You also miss just as often, so a c-bet makes no sense", why: "No: you also miss often, but your opponent doesn't know when. Your {{t:range}} as the {{t:aggressor}} (the player who {{t:raise|raised}} last before the flop) is stronger on many flops, and a {{t:bet}} wins the {{t:pot}} when your opponent {{t:fold|folds}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "And in what percentage of cases will the flop pair at least one of the two cards of a hand without a {{t:pair}}? Enter a number."
    answer: flop.hit.unpaired
    explanation: "This is the complement of the previous number: {{n:prob.certain}} minus {{n:flop.miss.unpaired}} is about {{n:flop.hit.unpaired}}, or roughly one flop in three."
---
Before the flop, the players' {{t:range|ranges}} look different. The {{t:open|opener}} from the Button has many high cards. The {{t:big-blind}} defends very wide, but usually {{t:raise|raises}} the strongest hands (AA, KK, AK), so after just a {{t:call}} they have few of them. The flop fits one of these {{t:range|ranges}} better, and that decides who can bet often.

## {{t:range-advantage|Range advantage}}

You have the {{t:range-advantage}} when, on a given flop, your hands are on average stronger than your opponent's hands. On [[Ks 7d 2c]] after an {{t:open}} from the Button, you are the one with more kings with a good kicker and more high {{t:pair|pairs}}. The {{t:big-blind}} has many hands here that missed.

On a low, {{t:connected}} flop, e.g. [[7s 6h 5d]], the {{t:range-advantage}} almost disappears, and the {{t:big-blind}} more often has the strongest hands: they defend many suited {{t:connectors}} and hands with a six or a seven, so they more often have {{t:two-pair}} or a {{t:straight}}.

## {{t:nuts-advantage|Nuts advantage}}

The {{t:nuts-advantage}} means having more of the strongest hands (the “{{t:nuts}}”) in your {{t:range}}. The {{t:range-advantage}} tells you how often you can bet. The {{t:nuts-advantage}} tells you how much: when you have many more of the strongest hands than your opponent, you can bet with a bigger size. When you only have the {{t:range-advantage}}, you bet small.

## Your opponent usually misses

A hand without a {{t:pair}}, e.g. [[Jc Td]], misses a {{t:pair}} on the flop about {{n:flop.miss.unpaired}} of the time. Of the {{n:cards.unseen.preflop}} unknown cards, only {{n:pair.outs.unpaired}} pair its cards. Sources often give about {{n:flop.hit.one-pair}}: that is the chance of exactly one {{t:pair}}; including {{t:two-pair}} and {{t:three-of-a-kind}}, the hit rate is about {{n:flop.hit.unpaired}}. That's why a {{t:bet}} on the flop often wins the {{t:pot}} right away, even when you hit nothing yourself. A miss doesn't always mean a {{t:fold}}: your opponent may have a {{t:draw}} or two high cards.

:::note Where these principles come from
The concepts of {{t:range-advantage}} and {{t:nuts-advantage}} come from game theory materials based on solver results (a glossary of terms and an article on c-bet sizes). The numbers in this lesson are the app's exact calculations.
:::
