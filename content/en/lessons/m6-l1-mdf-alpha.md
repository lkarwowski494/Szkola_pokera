---
id: m6.l1
module: m6
order: 1
title: "MDF and alpha"
sub: "How much to defend when your opponent bets"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. The {{t:pot}} is {{n:ex.third.pot}}, and your opponent {{t:bet|bets}} {{n:ex.third.bet}}. What is the minimum share of your {{t:range}} you must defend ({{t:call}} or {{t:raise}}) so that their no-equity {{t:bluff}} doesn't profit automatically? Enter a percentage."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + bet) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. Your opponent risks {{n:ex.third.bet}} to win {{n:ex.third.pot}}, so their {{t:bluff}} profits when you {{t:fold}} more often than {{n:alpha.bet-third}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} the full {{t:pot}}: {{n:ex.bet.pot}}. What is the {{t:mdf}}? Enter a percentage."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. With a {{t:pot}}-sized bet, a {{t:bluff}} risks as much as it can win, so it only needs you to {{t:fold}} half the time to break even."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} half the {{t:pot}}: {{n:ex.bet.half}}. What is the {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. That's how much of your {{t:range}} you defend so that a no-equity {{t:bluff}} doesn't profit." }
      - { text: "{{n:alpha.bet-half}}", why: "That's alpha: how often your opponent's {{t:bluff}} must work. {{t:mdf}} is the remainder, i.e. {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "That's the equity needed to {{t:call}} with one hand (from M2). {{t:mdf}} tells you what share of your whole {{t:range}} you defend." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} more than the {{t:pot}}: {{n:ex.bet.overbet}}. What is the {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. The bigger the bet, the smaller the share of your {{t:range}} you must defend." }
      - { text: "{{n:alpha.bet-overbet}}", why: "That's alpha: how often a {{t:bluff}} of {{n:ex.bet.overbet}} must work. You defend the rest, i.e. {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "That's the equity needed to {{t:call}}: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Different number, different question." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. You {{t:bluff}} with a hand that has no equity: the {{t:pot}} is {{n:ex.pot}}, and you {{t:bet}} {{n:ex.bet.half}}. How often must your opponent {{t:fold}} for the {{t:bluff}} to break even? Enter a percentage."
    answer: alpha.bet-half
    explanation: "Alpha = bet ÷ ({{t:pot}} + bet) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. You risk {{n:ex.bet.half}} to win {{n:ex.pot}}: if your opponent {{t:fold|folds}} more often, the {{t:bluff}} profits."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. You {{t:bluff}}: the {{t:pot}} is {{n:ex.pot}}, and you {{t:bet}} {{n:ex.bet.three-quarters}}. How often must your opponent {{t:fold}} for the {{t:bluff}} to be profitable?"
    options:
      - { text: "More often than {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. That's alpha for a 3/4-{{t:pot}} bet." }
      - { text: "More often than {{n:mdf.bet-three-quarters}}", why: "That's the {{t:mdf}}, i.e. how much your opponent should defend. Alpha is the share they can {{t:fold}} before your {{t:bluff}} starts to profit: {{n:alpha.bet-three-quarters}}." }
      - { text: "More often than {{n:eq.bet-three-quarters}}", why: "That's the equity your opponent needs to {{t:call}}. You calculate the {{t:bluff}} threshold without their {{t:call}} in the denominator: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "The {{t:pot}} is {{n:ex.pot}}. Which no-equity {{t:bluff}} needs fewer {{t:fold|folds}} from your opponent: one for {{n:ex.bet.quarter}} or one for {{n:ex.bet.pot}}?"
    options:
      - { text: "For {{n:ex.bet.quarter}}: just over {{n:alpha.bet-quarter}} {{t:fold|folds}} is enough", correct: true, why: "A small {{t:bluff}} risks little: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. A {{t:bluff}} for the full {{t:pot}} needs over {{n:alpha.bet-pot}} {{t:fold|folds}}." }
      - { text: "For {{n:ex.bet.pot}}: just over {{n:alpha.bet-quarter}} {{t:fold|folds}} is enough", why: "The other way around. A bigger bet risks more, so your opponent must {{t:fold}} more often: over {{n:alpha.bet-pot}} with the full {{t:pot}}." }
      - { text: "Both need the same", why: "Alpha depends on the size: {{n:alpha.bet-quarter}} at {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} at {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, your opponent {{t:bet|bets}} 1/3 {{t:pot}}. The {{t:mdf}} is {{n:mdf.bet-third}}, and you need {{n:eq.bet-third}} equity to {{t:call}}. How do you reconcile these two numbers?"
    options:
      - { text: "{{t:mdf}} applies to your whole {{t:range}}, equity to a single hand", correct: true, why: "{{t:mdf}} tells you what share of all your hands you defend so that your opponent can't {{t:bluff}} with any two cards. Required equity tells you whether a {{t:call}} with a specific hand is profitable against what your opponent actually {{t:bet|bets}} with." }
      - { text: "One of them is miscalculated", why: "Both are correct: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} and {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. They answer different questions." }
      - { text: "You {{t:call}} when you have at least {{n:mdf.bet-third}} equity", why: "This mixes up the concepts. {{n:eq.bet-third}} equity is enough to {{t:call}}. {{n:mdf.bet-third}} is a share of your {{t:range}}, not one hand's chance." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. You defend the {{t:big-blind}}, and the Button {{t:bet|bets}} a 1/3-{{t:pot}} c-bet. The {{t:mdf}} is {{n:mdf.bet-third}}. Do you have to defend that many hands?"
    table: { position: BB }
    options:
      - { text: "No, you can defend slightly less", correct: true, why: "{{t:mdf}} assumes a {{t:bluff}} with no equity at all. On the flop, the Button's {{t:bluff|bluffs}} still have equity ({{t:draw|draws}}, high cards), and {{t:out-of-position}} you won't realize all the equity of your weak hands. That's why you can defend slightly less than the {{t:mdf}}, but you don't {{t:fold}} en masse to a small c-bet." }
      - { text: "Yes, otherwise the Button profits with any hand", why: "That would be true on the river. On the flop, the Button isn't {{t:bluff|bluffing}} with a hand that has no equity: even if you {{t:call}}, they can still hit. {{t:mdf}} is a reference point, not an obligation." }
      - { text: "No, you defend more because it's only the flop", why: "The other way around. Future {{t:street|streets}} favor the bettor {{t:in-position}}, so you defend less, not more." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "You know from many previous hands that this player rarely {{t:bluff|bluffs}}. On the river, they {{t:bet}} the full {{t:pot}}. You have a {{t:pair}} of kings with a weak kicker. What do you do?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You know from many previous hands that this player rarely {{t:bluff|bluffs}}. When {{t:bluff|bluffs}} are missing, your {{t:pair}} mostly pays off better hands (KQ, sets). Against such a player, you {{t:fold}} more often than the {{t:mdf}} suggests." }
      - { text: "{{t:call|Call}}, because the {{t:mdf}} says to defend {{n:mdf.bet-pot}}", why: "{{t:mdf}} protects you against a player who {{t:bluff|bluffs}} often enough. This player doesn't, so sticking to the {{t:mdf}} hands them money." }
      - { text: "{{t:raise|Raise}} all-in", why: "Better hands will pay, worse ones will {{t:fold}}. A {{t:pair}} with a weak kicker isn't a hand to {{t:raise}} with." }
---
When your opponent {{t:bet|bets}}, you don't just ask "can this hand win?" You also look at all the hands you could have in this spot, that is, your {{t:range}}. Two numbers tell you how many of them to defend and how often your opponent's {{t:bluff}} must work.

## Alpha: how often a {{t:bluff}} must work

A {{t:bluff}} with no equity wins only when your opponent {{t:fold|folds}}. You risk the bet to win the {{t:pot}}.

```formula
alpha = bet ÷ (pot + bet)
```

Example: the {{t:pot}} is {{n:ex.pot}}, and you {{t:bet}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. If your opponent {{t:fold|folds}} more often, your {{t:bluff}} profits even with no hand at all.

## {{t:mdf}}: how much you must defend

{{t:mdf}} (minimum defense frequency) is the flip side of alpha. If you defend ({{t:call}} or {{t:raise}}) fewer hands, your opponent profits by {{t:bluff|bluffing}} with any two cards.

```formula
MDF = pot ÷ (pot + bet)
```

River example: the {{t:pot}} is {{n:ex.third.pot}}, and your opponent {{t:bet|bets}} {{n:ex.third.bet}}, that is, 1/3 {{t:pot}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Opponent's bet | {{t:mdf}} | Alpha | Required equity |
|---|---|---|---|
| 1/4 {{t:pot}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 {{t:pot}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 {{t:pot}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Full {{t:pot}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf}} is not required equity

Required equity from M2 applies to **a single hand**: whether a {{t:call}} with it is profitable. {{t:mdf}} applies to **your whole {{t:range}}**: what share of it you defend. Facing a 1/3-{{t:pot}} bet on the river, the {{t:mdf}} suggests defending about {{n:mdf.bet-third}} of your hands, while a single {{t:call}} is profitable when the hand wins at least {{n:eq.bet-third}} of the time.

## {{t:out-of-position|Out of position}} on the flop, you defend less

{{t:mdf}} assumes your opponent's {{t:bluff}} has no equity at all. That is closest to true on the river, where {{t:draw|draws}} can no longer improve. On the flop, {{t:bluff|bluffs}} still have equity: {{t:draw|draws}} and high cards can improve. On top of that, {{t:out-of-position}} you won't realize all the equity of your weak hands. That's why on the flop {{t:out-of-position}} you can defend less than the {{t:mdf}} (clearly less on flops that are bad for the defender) and treat it as a reference point, not an obligation; still, you don't {{t:fold}} en masse to small c-bets. In one turn example, the solver defended close to the {{t:mdf}} on average.

:::note When your opponent rarely {{t:bluff|bluffs}}
{{t:mdf}} protects you against a player who {{t:bluff|bluffs}} often enough. If you know from observation that a specific player {{t:bluff|bluffs}} too rarely with big river bets, you {{t:fold}} more often against them than the {{t:mdf}} suggests: {{t:call|calling}} with a weaker {{t:pair}} mostly pays off better hands. That's an {{t:exploit}}, not a strategy against everyone (more in module 10).
:::
