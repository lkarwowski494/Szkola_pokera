---
id: m3.l2
module: m3
order: 2
title: "Starting hands"
sub: "Which cards to play before the flop"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Which hand is stronger?"
    options:
      - { text: "A♥ K♥ (same suit)", correct: true, why: "The ranks are the same, but the suited hand has an extra way to win with a {{t:flush}}." }
      - { text: "A♥ K♣ (different suits)", why: "With different suits, you lose the chance of a {{t:flush}}." }
      - { text: "They're equal", why: "Almost, but not quite. The suits matter." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "No one has entered the pot yet. What do you do?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Offsuit 7-2 is one of the weakest hands: the cards are too far apart to make a {{t:straight}} together, they rarely make a {{t:flush}}, and a {{t:pair}} you hit has a weak kicker. It's often called the worst hand, although by the math against a random hand some others, e.g. offsuit 3-2, do even worse." }
      - { text: "{{t:raise|Raise}} to surprise them", why: "A {{t:bluff}} (playing a weak hand so that your opponents {{t:fold}} better ones) preflop with one of the weakest hands, with four players still behind you, loses in the long run." }
      - { text: "{{t:call|Call}}, because it's cheap", why: "Every “cheap” entry with a weak hand adds up to big losses." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "The player before you {{t:raise|raised}}. What do you do?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Raise}} again (3-bet)", correct: true, why: "You have the best possible hand. You want to put in as much as possible and reduce the number of opponents." }
      - { text: "Just {{t:call}}", why: "Advanced players sometimes do this to mislead, but as a rule you lose value and let others in cheaply." }
      - { text: "{{t:fold|Fold}}", why: "You never {{t:fold}} aces preflop. They're the favorite against every other hand, e.g. against KK they have about {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Everyone has {{t:fold|folded}} to you. What do you do?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Raise}}", correct: true, why: "Suited QJ is a very good hand for attacking the blinds from {{t:position}}: it makes {{t:straight|straights}}, flushes and high {{t:pair|pairs}}." }
      - { text: "{{t:fold|Fold}}", why: "On the Button, this hand is too good to {{t:fold}}." }
      - { text: "{{t:call|Call}}", why: "It's better to {{t:raise}}: you have a chance to win the blinds right away, and you play with the {{t:initiative}}." }
---
Beginners lose most of their money by playing too many weak hands. Good starting hand selection is the fastest way to stop losing.

## Hand groups

- **Strongest**: [[As Ah]], [[Ks Kh]], [[Qs Qh]], plus AK suited and offsuit, e.g. [[As Ks]] and [[As Kd]]. You {{t:raise}}, and when someone has {{t:raise|raised}} before you, you usually {{t:raise}} again (3-bet) {{t:value|for value}}, meaning so that your opponent {{t:call|calls}} with a weaker hand.
- **Strong**: JJ, TT, AQ, suited AJ, suited KQ.
- **Speculative**: small {{t:pair|pairs}} and suited connected cards, e.g. [[7h 6h]]. Good in {{t:late-position}}.
- **Weak**: unconnected, low, offsuit, e.g. [[9c 3d]]. {{t:fold|Fold}}.

:::note How many {{t:combo|combos}}
There are {{n:combos.total}} starting hand {{t:combo|combos}} in total, but only {{n:combos.kinds}} types: {{n:combos.kinds.pair}} {{t:pair|pairs}}, {{n:combos.kinds.suited}} suited hands and {{n:combos.kinds.offsuit}} offsuit hands. Each {{t:pair}} is {{n:combos.pair}} {{t:combo|combos}}, a suited hand is {{n:combos.suited}}, and an offsuit hand is {{n:combos.offsuit}}. That's why offsuit AK comes up three times as often as suited AK.
:::

The groups above are a simplification to get you started. You'll learn the exact {{t:open|opening}} {{t:range|ranges}} for each {{t:position}}, in a {{t:range}} grid, in the next lesson.
