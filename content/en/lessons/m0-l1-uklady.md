---
id: m0.l1
module: m0
order: 1
title: "Hand rankings"
sub: "What beats what"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Which wins: a {{t:flush}} or a {{t:straight}}?"
    options:
      - { text: "{{t:flush|Flush}}", correct: true, why: "A {{t:flush}} ranks higher. It's harder to get 5 cards of one suit than 5 cards in a row." }
      - { text: "{{t:straight|Straight}}", why: "This is a common beginner mistake. A {{t:straight}} ranks one place below a {{t:flush}}." }
      - { text: "Tie", why: "Different hands never tie. The higher-ranked hand always wins." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "You have a {{t:full-house}}, your opponent has a {{t:flush}}. Who wins?"
    options:
      - { text: "You, a {{t:full-house}} beats a {{t:flush}}", correct: true, why: "A {{t:full-house}} ({{t:three-of-a-kind}} and a {{t:pair}}) ranks 4th, a {{t:flush}} 5th. Order from the top: straight flush, {{t:four-of-a-kind}}, {{t:full-house}}, {{t:flush}}, {{t:straight}}." }
      - { text: "Your opponent, a {{t:flush}} beats a {{t:full-house}}", why: "It's the other way around. A {{t:full-house}} is rarer, so it's stronger." }
      - { text: "It depends on the card ranks", why: "Card ranks only matter when both hands are the same type." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Which is stronger: {{t:two-pair}} or {{t:three-of-a-kind}}?"
    options:
      - { text: "{{t:three-of-a-kind|Three of a kind}}", correct: true, why: "{{t:three-of-a-kind|Three of a kind}} ranks 7th, {{t:two-pair}} 8th. It's easy to mix up, because {{t:two-pair}} “looks” like more cards." }
      - { text: "{{t:two-pair|Two pair}}", why: "{{t:two-pair|Two pair}} ranks one place below {{t:three-of-a-kind}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "You both have a {{t:pair}} of kings. Who wins?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "You", correct: true, why: "The {{t:pair}} is the same, so the kicker decides: your ace beats your opponent's queen. That's why AK is much better than KQ." }
      - { text: "Your opponent", why: "Your opponent's queen is lower than your ace." }
      - { text: "{{t:split-pot|Split pot}}", why: "The pot would be split only with an identical best five. Here the kicker separates them: ace versus queen." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "There's a {{t:straight}} on the {{t:board}}. Who wins?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Split pot}}", correct: true, why: "Both players' best five is the {{t:straight}} on the {{t:board}}. A {{t:pair}} of aces is weaker than a {{t:straight}}, so it adds nothing. This is “{{t:playing-the-board}}”." }
      - { text: "You, because you have a {{t:pair}} of aces", why: "A {{t:pair}} of aces is just a {{t:pair}}. The {{t:straight}} on the {{t:board}} is stronger, so you play it, just like your opponent." }
      - { text: "Your opponent", why: "Your opponent would need a ten for a higher {{t:straight}}." }
  - kind: generated
    id: m0.l1.g1
    family: m0.who-wins
    rules: [R-M0-001]
    generator: whoWins
    count: 3
  - kind: generated
    id: m0.l1.g2
    family: m0.kicker
    rules: [R-M0-002]
    generator: whoWinsKicker
    count: 2
  - kind: generated
    id: m0.l1.g3
    family: m0.best-hand
    rules: [R-M0-001]
    generator: bestHand
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar hands
  - kind: generated
    id: m0.l1.g-vocab-hands
    family: vocab.hands
    generator: vocab
    params: { area: hands, dir: both }
    count: 4
---
In Texas Hold'em you get **2 {{t:hole-cards}}**, and **5 {{t:community-cards}}** are dealt to the {{t:board}}. From these 7 cards you make the best hand of **5**. The stronger hand wins the whole {{t:pot}}.

## Rankings from strongest

| | Hand | Example |
|---|---|---|
| 1 | {{t:royal-flush|Royal flush}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Straight flush}}: a {{t:straight}} in one suit | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Four of a kind}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full house}}: {{t:three-of-a-kind}} and a {{t:pair}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Flush}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Straight}} (5 in a row) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Three of a kind}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Two pair}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Pair}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|High card}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
First compare the hand rankings: {{t:three-of-a-kind}} beats {{t:two-pair}}. With the same hand type, its rank decides: a {{t:pair}} of kings beats a {{t:pair}} of queens, and with {{t:two-pair}} you compare the higher {{t:pair}} first. Only when the core of the hand is identical (the same {{t:pair}}, {{t:three-of-a-kind}} or the same {{t:two-pair}}) do the extra cards, the kickers, decide: the highest first, then the next one if it's still tied. Only kickers in the best five count. If both fives are identical, it's a {{t:split-pot}}.
:::

An ace can be the lowest card of a {{t:straight}}: [[5h 4s 3c 2d Ah]] is the lowest {{t:straight}}, called a {{t:wheel}}.

When your best hand is made only of the {{t:community-cards}} and your {{t:hole-cards}} add nothing, you're {{t:playing-the-board}}: at best, it's a {{t:split-pot}}.
