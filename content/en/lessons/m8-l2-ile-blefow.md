---
id: m8.l2
module: m8
order: 2
title: "How much to bluff"
sub: "The ratio of bluffs to bet size"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}} and you bet the full {{t:pot}}: {{n:ex.bet.pot}}. Your {{t:range}} is very strong hands and {{t:bluff|bluffs}}. What share of your bets should be {{t:bluff|bluffs}} so your opponent can't exploit you? Enter a percentage."
    answer: bluff.share.bet-pot
    explanation: "{{t:bluff|Bluff}} share = bet ÷ ({{t:pot}} + 2·bet) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. One bet in three is a {{t:bluff}}: then your opponent's hand that only beats {{t:bluff|bluffs}} gains nothing by {{t:call|calling}} or by {{t:fold|folding}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}} and you bet half the {{t:pot}}: {{n:ex.bet.half}}. At equilibrium, what share of your bets are {{t:bluff|bluffs}}? Enter a percentage."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. A smaller bet gives your opponent a better price, so you have fewer {{t:bluff|bluffs}} than with a full-{{t:pot}} bet ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}} and you bet {{n:ex.bet.three-quarters}}. At equilibrium, what share of your bets are {{t:bluff|bluffs}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. This is the same number as the equity your opponent needs to {{t:call}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "That's alpha: how often a single {{t:bluff}} with no chance has to work. You calculate the {{t:bluff}} share of your {{t:range}} with both bets in the denominator: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "That's the {{t:mdf}}, i.e. how much your opponent should defend. The share of your {{t:bluff|bluffs}} is {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}} and you bet more than the {{t:pot}}: {{n:ex.bet.overbet}}. At equilibrium, what share of your bets are {{t:bluff|bluffs}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. An {{t:overbet}}, i.e. a {{t:bet}} larger than the whole {{t:pot}}, gives your opponent the worst price, so it can contain the most {{t:bluff|bluffs}}, but still fewer than half." }
      - { text: "{{n:alpha.bet-overbet}}", why: "That's alpha for this size: how often your opponent must {{t:fold}} for a single {{t:bluff}} to pay off. The {{t:bluff}} share of your {{t:range}} is {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "That's the {{t:bluff}} share for a full-{{t:pot}} bet. With a bet of {{n:ex.bet.overbet}} there are more of them: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "With which river bet do you have more {{t:bluff|bluffs}} in your {{t:range}}: 1/3 {{t:pot}} or full {{t:pot}}?"
    options:
      - { text: "With full {{t:pot}}", correct: true, why: "At 1/3 {{t:pot}}, {{t:bluff|bluffs}} are about {{n:bluff.share.bet-third}} of bets; at full {{t:pot}}, about {{n:bluff.share.bet-pot}}. A bigger bet gives your opponent a worse price, so their {{t:call}} needs more {{t:bluff|bluffs}} to pay off." }
      - { text: "With 1/3 {{t:pot}}", why: "The other way around. A small bet gives your opponent a good price: to {{t:call}}, they only need about {{n:bluff.share.bet-third}} {{t:bluff|bluffs}} among your bets. With more {{t:bluff|bluffs}}, they would call at a profit." }
      - { text: "The same", why: "The {{t:bluff}} share depends on size: about {{n:bluff.share.bet-third}} at 1/3 {{t:pot}}, about {{n:bluff.share.bet-pot}} at full {{t:pot}}." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "You bet the full {{t:pot}} on the river. Alpha is {{n:alpha.bet-pot}} and the {{t:bluff}} share is {{n:bluff.share.bet-pot}}. What does each number tell you?"
    options:
      - { text: "Alpha: how often your opponent must {{t:fold}}; share: what part of your bets are {{t:bluff|bluffs}}", correct: true, why: "Alpha is about a single {{t:bluff}} with no chance: it breaks even when your opponent {{t:fold|folds}} {{n:alpha.bet-pot}} of the time. The {{t:bluff}} share describes the makeup of your {{t:range}}: one bet in three is a {{t:bluff}}, so your opponent's {{t:call}} breaks even." }
      - { text: "They're two names for the same thing; one is miscalculated", why: "Both are calculated correctly: alpha = bet ÷ ({{t:pot}} + bet), {{t:bluff}} share = bet ÷ ({{t:pot}} + 2·bet). They answer different questions." }
      - { text: "Alpha: how many {{t:bluff|bluffs}} you have in your {{t:range}}; share: how often your opponent {{t:fold|folds}}", why: "The other way around. Alpha is your opponent's {{t:fold}} threshold for a single {{t:bluff}}, and the {{t:bluff}} share is the makeup of your betting {{t:range}}." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Why do you calculate the {{t:bluff}} share of your bets with the same formula as the equity your opponent needs to {{t:call}}?"
    options:
      - { text: "Because your opponent's bluff-catching hand wins exactly when you {{t:bluff}}", correct: true, why: "Their hand loses to your {{t:value}} and beats your {{t:bluff|bluffs}}, so its equity is your {{t:bluff}} share. When that share equals the required equity, the {{t:call}} breaks even and your opponent can't exploit you by calling or by folding." }
      - { text: "It's a coincidence; the formulas only look similar", why: "It's not a coincidence. You choose the {{t:bluff}} share so that the equity of a bluff-catching hand equals its price." }
      - { text: "Because your opponent always has exactly the required equity", why: "Your opponent has whatever equity your bets give them. You are the one who picks the number of {{t:bluff|bluffs}} so it breaks even." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "You bet the full {{t:pot}} on the river, but half of your bets are {{t:bluff|bluffs}}, not {{n:bluff.share.bet-pot}}. What can an attentive opponent do?"
    options:
      - { text: "{{t:call}} more often, even with weak bluff-catchers", correct: true, why: "Their {{t:call}} wins half the time but only needs {{n:eq.bet-pot}}. By calling more, they win more against your {{t:bluff|bluffs}} than they lose to your {{t:value}}." }
      - { text: "{{t:fold}} more often", why: "Folding hands you the {{t:pot}} with your {{t:bluff|bluffs}}. When there are too many {{t:bluff|bluffs}}, your opponent profits by {{t:call|calling}}." }
      - { text: "Nothing; the ratio doesn't matter", why: "It does: with too many {{t:bluff|bluffs}}, every {{t:call}} with a bluff-catcher is profitable for your opponent." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "On the river you bet the full {{t:pot}} almost only for {{t:value}}, with almost no {{t:bluff|bluffs}}. What can an attentive opponent do?"
    options:
      - { text: "{{t:fold}} every hand that only beats {{t:bluff|bluffs}}", correct: true, why: "When {{t:bluff|bluffs}} are below {{n:bluff.share.bet-pot}}, a {{t:call}} with a bluff-catcher loses. Your opponent then only pays with better hands, and your {{t:value}} bets get paid less often." }
      - { text: "{{t:call}} more often", why: "By {{t:call|calling}}, they would mostly pay off your {{t:value}}. With no {{t:bluff|bluffs}} in your {{t:range}}, they're better off {{t:fold|folding}}." }
      - { text: "{{t:raise}} with every hand", why: "{{t:raise|Raising}} your strong hand without a better holding is a sure loss. Your opponent simply {{t:fold|folds}} more often." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "On the river you bet the full {{t:pot}} with a {{t:range}} of {{n:bluff.ex.range}} {{t:combo|combos}}: {{t:value}} and {{t:bluff|bluffs}}. At equilibrium, how many of them are {{t:bluff|bluffs}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|bluffs}} and {{n:bluff.ex.value}} {{t:value}} {{t:combo|combos}}: one {{t:bluff}} for every two {{t:value}} hands." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "That's what you'd get from alpha ({{n:alpha.bet-pot}}). Alpha is the {{t:fold}} threshold for a single {{t:bluff}}, not the {{t:bluff}} share of your {{t:range}}." }
      - { text: "{{n:bluff.ex.value}}", why: "That's the number of {{t:value}} {{t:combo|combos}}. There are half as many {{t:bluff|bluffs}}: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "On the river you need a few {{t:bluff|bluffs}} for your full-{{t:pot}} bets. Which hands do you choose?"
    options:
      - { text: "The weakest, e.g. missed {{t:straight}} {{t:draw|draws}} or high cards with no chance", correct: true, why: "A hand with no chance at showdown loses nothing when the {{t:bluff}} fails: after {{t:check|checking}} it would lose anyway. That's why it {{t:bluff|bluffs}}." }
      - { text: "Medium {{t:pair|pairs}}", why: "A medium {{t:pair}} often wins after {{t:check|checking}}. When you {{t:bluff}} with it, worse hands {{t:fold}} and better ones pay: you give up a showdown win." }
      - { text: "Any, as long as the ratio is right", why: "The ratio isn't everything. A {{t:bluff}} with a hand that would win at showdown costs more than a {{t:bluff}} with a hand that has no chance." }
---
In the first lesson you bet for {{t:value}}. But if you only bet strong hands on the river, an attentive opponent would fold everything except even stronger hands, and your bets would almost never get paid. {{t:bluff|Bluffs}} make it worthwhile for your opponent to pay.

## {{t:polarized|Polarized}} {{t:range}}

On the river {{t:in-position}}, you often bet a **{{t:polarized}} {{t:range}}** (as in M7): very strong hands for {{t:value}} and {{t:bluff|bluffs}}, with no medium hands (those {{t:check}}, as in the first lesson). On the river, your {{t:bluff|bluffs}} are hands with no chance at showdown. Your opponent then has many hands that lose to your {{t:value}} but beat your {{t:bluff|bluffs}}. These are **bluff-catchers** (hands that catch {{t:bluff|bluffs}}).

## How many {{t:bluff|bluffs}}

You choose the number of {{t:bluff|bluffs}} so that your opponent's bluff-catcher breaks even whether they {{t:call}} or {{t:fold}}:

```formula
bluff share = bet ÷ (pot + 2·bet)
```

This is the same formula as the equity needed to {{t:call}} from M2. It's not a coincidence: a bluff-catcher wins exactly when you {{t:bluff}}, so its equity is the share of your {{t:bluff|bluffs}}. With a full-{{t:pot}} bet: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, so one bet in three is a {{t:bluff}}.

## Bigger bet, more {{t:bluff|bluffs}}

| Bet | {{t:bluff|Bluff}} share | Alpha (from M6) |
|---|---|---|
| 1/3 {{t:pot}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 {{t:pot}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 {{t:pot}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| Full {{t:pot}} | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1.5 {{t:pot|pots}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

A bigger bet gives your opponent a worse price, so it can contain more {{t:bluff|bluffs}}. A small bet can only carry a few.

## {{t:bluff|Bluff}} share is not alpha

Alpha from M6 = bet ÷ ({{t:pot}} + bet) tells you how often your opponent must {{t:fold}} for **a single** {{t:bluff}} with no chance to break even. {{t:bluff|Bluff}} share = bet ÷ ({{t:pot}} + 2·bet) tells you what part of your **entire betting {{t:range}}** is {{t:bluff|bluffs}}. With a full-{{t:pot}} bet, a {{t:bluff}} needs more than {{n:alpha.bet-pot}} {{t:fold|folds}}, while your {{t:range}} contains {{n:bluff.share.bet-pot}} {{t:bluff|bluffs}}. The second denominator has an extra bet because you're calculating the price of your opponent's {{t:call}}.

## What to {{t:bluff}} with

For {{t:bluff|bluffs}}, choose your **weakest hands**, e.g. missed {{t:straight}} {{t:draw|draws}} or high cards with no chance (missed {{t:flush|flushes}} are covered in the lesson on {{t:blocker|blockers}}): after {{t:check|checking}} they would lose anyway, so a failed {{t:bluff}} costs them nothing. Hands with showdown value {{t:check}}.

:::note This is an equilibrium point, not a recipe for every opponent
These ratios protect you against an opponent who plays well. Against specific players you can deviate from them; that's covered in the module on microstakes {{t:exploit|exploits}} (M10). The {{t:bluff}} share formula is a calculation in a simplified model: a {{t:polarized}} {{t:range}} against a bluff-catching hand (a toy model from game theory). The advice to {{t:bluff}} with your weakest hands comes from training materials and solver analyses.
:::
