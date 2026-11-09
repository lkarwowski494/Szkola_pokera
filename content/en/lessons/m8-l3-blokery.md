---
id: m8.l3
module: m8
order: 3
title: "Blockers"
sub: "Which hand to bluff with"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "What is a {{t:blocker}}?"
    options:
      - { text: "A card in your hand that leaves your opponent with fewer {{t:combo|combos}} of some hand", correct: true, why: "Your opponent can't hold a card you're holding. When you have an ace, your opponent has fewer aces: fewer {{t:pair|pairs}} of aces, fewer AK, fewer flushes with the ace." }
      - { text: "A card on the {{t:board}} that ruins a {{t:draw}}", why: "People sometimes say this casually about cards on the {{t:board}}, but a {{t:blocker}} in this sense is a card in your hand. Both players see the cards on the {{t:board}}." }
      - { text: "A small bet meant to stop a big bet from your opponent", why: "That's a so-called blocking bet, a different thing. A {{t:blocker}} is a card in your hand that reduces the number of your opponent's {{t:combo|combos}}." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "With no other information, AK has {{n:combos.unpaired}} {{t:combo|combos}}. You hold a king (no ace). How many AK {{t:combo|combos}} can your opponent have? Enter the number."
    answer: combos.unpaired.one-blocked
    explanation: "There are {{n:cards.suits}} aces, and {{n:pair.outs.per-rank}} kings are left, because one is yours: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. One card removes a full quarter of the {{t:combo|combos}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "A {{t:pair}} of aces has {{n:combos.pair}} {{t:combo|combos}}. You hold one ace. How many {{t:combo|combos}} of a {{t:pair}} of aces can your opponent have? Enter the number."
    answer: combos.pair.one-blocked
    explanation: "There are {{n:pair.outs.per-rank}} aces left, and three cards can make only {{n:combos.pair.one-blocked}} {{t:pair|pairs}}. One ace in your hand removes half of the AA {{t:combo|combos}}."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "You hold [[Ah Kc]]. How many AK {{t:combo|combos}} can your opponent have?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "There are {{n:pair.outs.per-rank}} aces and {{n:pair.outs.per-rank}} kings left: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "That's how many there would be if you held only the ace or only the king. You block both ranks." }
      - { text: "{{n:combos.unpaired}}", why: "That's how many AK {{t:combo|combos}} there are in the deck before you see your cards. Your ace and your king can't be in your opponent's hand." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "On the river, a third heart came and a {{t:flush}} is possible. The {{t:big-blind}} {{t:check|checks}}. You have nothing but ace high and want to bluff. Which hand makes the better {{t:bluff}}?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "The ace of hearts blocks your opponent's strongest flushes: they can't have a {{t:flush}} with the ace, and that's a hand that will always pay. Your opponent has fewer hands to {{t:call}} with, so the {{t:bluff}} works more often." }
      - { text: "[[Ad 3c]]", why: "Same strength at showdown, but you don't block any {{t:flush}}. Your opponent keeps all their flushes, and they will pay with them." }
      - { text: "No difference, both are just ace high", why: "At showdown, yes, but as a {{t:bluff}}, no. The ace of hearts reduces the number of your opponent's flushes that will surely pay." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "The spade {{t:flush-draw}} missed. The big blind checks on the river. Both hands have only queen-eight. Which one is better to bluff with?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "With no spades, you don't block your opponent's missed {{t:draw|draws}}, and those are hands that will {{t:fold}} to your bet. The other cards in both hands are the same." }
      - { text: "[[Qd 8s]]", why: "The eight of spades blocks some missed {{t:flush-draw|flush draws}} (e.g. [[8s 7s]]) that your opponent would have {{t:fold|folded}}. They're left with relatively more hands that will pay." }
      - { text: "No difference", why: "The difference is the suit of the eight. A spade in your hand takes away some of the hands your opponent would fold." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "Same situation: the spades missed, the {{t:big-blind}} {{t:check|checks}}. You have one of two hands. Which one do you {{t:bluff}} with, and which one do you {{t:check}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Bluff}} with [[Qc Jd]], {{t:check}} with [[9c 8c]]", correct: true, why: "A {{t:pair}} of nines beats missed {{t:draw|draws}} after a {{t:check}}. Queen-jack loses to almost every hand, so only a {{t:bluff}} can win the {{t:pot}}." }
      - { text: "{{t:bluff|Bluff}} with [[9c 8c]], {{t:check}} with [[Qc Jd]]", why: "It's the other way around. A {{t:bluff}} with a {{t:pair}} of nines gives up a win at showdown, and a {{t:check}} with queen-jack gives up the {{t:pot}} without a fight." }
      - { text: "{{t:bluff|Bluff}} with both", why: "A {{t:pair}} of nines doesn't need a {{t:bluff}}: it beats many hands after a {{t:check}}. You {{t:bluff}} with hands that have no showdown value." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "You're choosing a river {{t:bluff}} from hands with no showdown value. Which card in your hand helps the most?"
    options:
      - { text: "A card from the hands your opponent will pay with", correct: true, why: "You block their value: they have fewer strong hands, so more often they're left with a hand to fold." }
      - { text: "A card in the suit of the missed {{t:draw}}", why: "It blocks hands your opponent will {{t:fold}}. The {{t:bluff}} then works less often." }
      - { text: "The highest card, regardless of the board", why: "A high card gives a bit of strength at showdown, but it says nothing about what you block. Look at which of your opponent's hands will pay." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "On the river, a third heart came. The {{t:big-blind}} {{t:check|checks}}. You have a {{t:pair}} of nines and the ace of hearts. What do you do?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "A {{t:pair}} of nines beats many of your opponent's hands without a {{t:pair}} after a {{t:check}}. A {{t:blocker}} doesn't turn a hand with showdown value into a good {{t:bluff}}: first you pick hands with no chance, and only then do you look at {{t:blocker|blockers}}." }
      - { text: "Bet as a {{t:bluff}}, since you have the ace of hearts", why: "The ace of hearts is a good {{t:blocker}}, but with a {{t:pair}} of nines you lose by {{t:bluff|bluffing}}: worse hands would {{t:fold}} anyway, and flushes and kings will pay." }
      - { text: "Bet for {{t:value}}", why: "Who will pay with a worse hand? On a {{t:board}} where a flush is possible, hands weaker than a {{t:pair}} of nines will almost always {{t:fold}}." }
---
In the previous lesson, you worked out how many {{t:bluff|bluffs}} you need and that you {{t:bluff}} with hands that have no chance at showdown. Often there are more such hands than you need. That's when **{{t:blocker|blockers}}** decide.

## {{t:blocker|Blocker}}

Your opponent can't hold a card you're holding. That's why they have fewer {{t:combo|combos}} of hands containing that card:

| Opponent's hand | Without a {{t:blocker}} | You hold one card of that rank |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

When you hold both the ace and the king, your opponent has only {{n:combos.unpaired.both-blocked}} AK {{t:combo|combos}}.

## Block the hands your opponent will pay with

A good {{t:bluff}} has a card from the hands your opponent will **{{t:call}}** with. Example: on the river, a third heart came. The ace of hearts in your hand means your opponent doesn't have a {{t:flush}} with the ace, a hand that always pays. They're left with more hands to fold.

## Don't block the hands your opponent will {{t:fold}}

When the {{t:flush-draw}} **misses**, your opponent will {{t:fold}} their missed {{t:draw|draws}}. If you have a card in that suit, they have fewer of them, so your {{t:bluff}} runs into a hand that will pay more often. Of two similar {{t:bluff|bluffs}}, you choose the one with no cards in the suit of the missed {{t:draw}}.

## Showdown strength first

The order is fixed: first you set aside hands that can win after a {{t:check}}, and only from the rest do you choose {{t:bluff|bluffs}} with the best {{t:blocker|blockers}}. A good {{t:blocker}} won't make a {{t:bluff}} out of a {{t:pair}} that would win at showdown. {{t:blocker|Blockers}} tip the choice between similar hands; the effect itself is small, so it only decides when the hands are of similar strength (the same goes for choosing {{t:call|calls}} in the next lesson).

:::note Where these rules come from
The {{t:combo}} counts are combinatorics. The rules for choosing {{t:bluff|bluffs}} by {{t:blocker|blockers}} come from the curriculum and from training materials and solver analyses. When there aren't enough other {{t:bluff|bluffs}}, the solver also {{t:bluff|bluffs}} with missed flushes.
:::
