---
id: m2.l1
module: m2
order: 1
title: "Outs and odds"
sub: "The rule of 2 and 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "How many outs do you have to a {{t:flush}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "You have {{n:draw.flush.seen}} hearts (2 in your hand, 2 on the {{t:board}}). The deck has {{n:cards.per-suit}} hearts, so {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}} remain." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} is all the hearts in the deck, but you already see {{n:draw.flush.seen}}." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} is the hearts you already have. We count the cards you need." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "How many outs do you have to a {{t:straight}}?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "You have 6-7-8-9. Any five and any ten gives you a {{t:straight}}: {{n:draw.oesd.ranks}} ranks × {{n:cards.suits}} suits = {{n:outs.oesd}} cards." }
      - { text: "{{n:outs.gutshot}}", why: "That's how many you'd have with one missing card in the middle (gutshot). Here the {{t:straight}} is open on both ends." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Two card ranks (five and ten), but each comes in four suits." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, you have {{n:outs.flush}} outs to a {{t:flush}}. What is the chance you hit on the river?"
    options:
      - { text: "About {{n:odds.flush.turn-river}}", correct: true, why: "One card to come: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (approximation). Exactly {{n:outs.flush}} of {{n:cards.unseen.turn}} unseen cards, which is {{n:odds.flush.turn-river}}." }
      - { text: "About {{n:odds.flush.flop-river}}", why: "That's the chance on the flop, with two cards to come. On the turn, only one is left." }
      - { text: "About {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} would mean every other unseen card gives you a {{t:flush}}. Only {{n:outs.flush}} of {{n:cards.unseen.turn}} do." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "On the flop you have a gutshot ({{n:outs.gutshot}} outs). What is the chance of hitting by the river?"
    options:
      - { text: "About {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (approximation). Exactly {{n:odds.gutshot.flop-river}}. But you only get that when you see both cards without further {{t:bet|bets}} (all-in). When your opponent {{t:bet|bets}} on the flop, you pay for one card: then the chance is about {{n:odds.gutshot.flop-turn}}." }
      - { text: "About {{n:odds.gutshot.rule-turn}}", why: "That's the approximate chance with one card ({{n:outs.gutshot}} × 2). The question is about both cards: the turn and the river." }
      - { text: "About {{n:odds.oesd.flop-river}}", why: "That's what you'd have with {{n:outs.oesd}} outs. A gutshot has only {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. You have a {{t:flush-draw}}, and your opponent {{t:bet|bets}}. Which chance of hitting do you compare the price of a {{t:call}} with?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "About {{n:odds.flush.flop-turn}}, the chance on the turn", correct: true, why: "A {{t:call}} buys only one card. On the turn your opponent can {{t:bet}} again, and you'll pay for the river separately. {{n:outs.flush}} of {{n:cards.unseen.flop}} is about {{n:odds.flush.flop-turn}}." }
      - { text: "About {{n:odds.flush.flop-river}}, the chance by the river", why: "You only get that when you're sure to see both cards without further {{t:bet|bets}}, i.e. when someone is all-in. Against a normal {{t:bet}} on the flop, you're buying one card." }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn. You have {{n:outs.flush}} outs to a {{t:flush}}. What percentage chance of hitting on the river does the rule of 2 and 4 give? Enter a number."
    answer: odds.flush.rule-turn
    explanation: "One card to come, so you multiply by 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (approximation). Exactly: {{n:outs.flush}} of {{n:cards.unseen.turn}} cards, which is {{n:odds.flush.turn-river}}."
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
An **out** is a card that improves your hand to a likely winner. Counting outs lets you quickly estimate your chances without a calculator.

## Common {{t:draw|draws}}

- **{{t:flush-draw|Flush draw}}** ({{n:draw.flush.seen}} cards of one suit, one short of a {{t:flush}}): **{{n:outs.flush}} outs**. A suit has {{n:cards.per-suit}} cards, and you see {{n:draw.flush.seen}}.
- **{{t:oesd|Open-ended straight draw}}**, e.g. [[8c 9d]] on a [[6s 7h Kd]] {{t:board}}: **{{n:outs.oesd}} outs**, i.e. four fives and four tens.
- **An inside {{t:straight}} draw (gutshot)**, e.g. 5-6-8-9 without the seven: **{{n:outs.gutshot}} outs**.

## The rule of 2 and 4

The rule gives you an approximate chance without a calculator: multiply your outs by 2 or 4. The exact odds are in the table below.

```formula
chance ≈ outs × 2   (one card to come)
chance ≈ outs × 4   (two cards, only if you see both without further bets)
```

| {{t:draw|Draw}} | Outs | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|Open-ended straight draw}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## One card or two?

When your opponent {{t:bet|bets}} on the flop, your {{t:call}} buys only one card: the turn. On the turn your opponent can {{t:bet}} again, and you'll pay for the river separately. That's why, facing a {{t:bet}} on the flop, you count the chance for the **next card** (× 2): for a {{t:flush}} that's {{n:outs.flush}} of {{n:cards.unseen.flop}}, or about {{n:odds.flush.flop-turn}}. Use the chance **by the river** (× 4, about {{n:odds.flush.flop-river}} for a {{t:flush}}) only when you're sure to see both cards without further {{t:bet|bets}}, i.e. when someone is all-in.

:::note Where these numbers come from
On the turn there are {{n:cards.unseen.turn}} cards you don't know ({{n:cards.deck}} minus your {{n:cards.hole}} and the {{n:cards.board.turn}} on the {{t:board}}). The chance of hitting a {{t:flush}} is {{n:outs.flush}} of {{n:cards.unseen.turn}}. The rule of 2 and 4 is off by at most about {{n:rule24.error.max.pp}} percentage points, as long as you have no more than {{n:rule24.outs.max}} outs.
:::
