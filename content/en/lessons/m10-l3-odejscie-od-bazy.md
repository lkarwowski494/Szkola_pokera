---
id: m10.l3
module: m10
order: 3
title: "Deviating from the baseline"
sub: "Which hands and how far"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "You know the opponent {{t:bluff|bluffs}} a little more often in this line than in equilibrium. Which hands do you change your decision with first?"
    options:
      - { text: "Hands that mix {{t:call}} and {{t:fold}} in the baseline: now you always {{t:call}}", correct: true, why: "In equilibrium these hands are indifferent, because the opponent has exactly as many {{t:bluff|bluffs}} as needed. Even a small surplus of {{t:bluff|bluffs}} makes {{t:call}} earn more than {{t:fold}}." }
      - { text: "The weakest hands, which always {{t:fold}} in the baseline", why: "These hands lose even to some of the {{t:bluff|bluffs}} or need a much larger surplus. They only change when the opponent deviates far from equilibrium." }
      - { text: "The strongest hands: now you {{t:raise}} them", why: "You keep playing the strongest hands anyway. The change starts with hands on the edge of the decision." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "In a published solver example, the opponent {{t:bluff|bluffs}} with about {{n:overbluff.lock}} of their river bets instead of about {{n:overbluff.base}}. How does your response to their bet with hands that catch {{t:bluff|bluffs}} change?"
    options:
      - { text: "You stop {{t:fold|folding}}: hands that mixed in the baseline now always {{t:call}}", correct: true, why: "That was enough for the defense to switch to pure {{t:call|calling}} in the solution with the opponent's strategy locked. Indifferent hands react to the smallest surplus of {{t:bluff|bluffs}}." }
      - { text: "Almost nothing: a few points is too little to change anything", why: "For indifferent hands, a few points is a lot: in equilibrium, {{t:call}} and {{t:fold}} give them the same result, so any surplus of {{t:bluff|bluffs}} tips the balance toward {{t:call|calling}}." }
      - { text: "You start {{t:raise|raising}} with hands that catch {{t:bluff|bluffs}}", why: "{{t:raise|Raising}} folds out the opponent's {{t:bluff|bluffs}}, while better hands {{t:call}}. A hand that catches {{t:bluff|bluffs}} earns by {{t:call|calling}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "You know the opponent {{t:bluff|bluffs}} less often in a given line than in equilibrium. What do you do with a hand that catches {{t:bluff|bluffs}} and that sometimes {{t:call|calls}} and sometimes {{t:fold|folds}} in the baseline?"
    options:
      - { text: "I always {{t:fold}}", correct: true, why: "When there are fewer {{t:bluff|bluffs}} than equilibrium requires, indifferent hands lose by {{t:call|calling}}. Solver result: with too few {{t:bluff|bluffs}}, you always {{t:fold}}." }
      - { text: "I always {{t:call}} so the opponent can't exploit me with {{t:bluff|bluffs}}", why: "An opponent who {{t:bluff|bluffs}} too rarely can't exploit your {{t:fold|folding}}. You exploit their mistake by {{t:fold|folding}}." }
      - { text: "I play as in the baseline, half and half", why: "Mixing only makes sense when both decisions give the same result. With too few {{t:bluff|bluffs}}, {{t:fold|folding}} gives more." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "You {{t:bet}} {{n:cbet.ex.small}} as a c-bet into a {{t:pot}} of {{n:ex.pot}}, with no hand at all. How often must the opponent {{t:fold}} for this {{t:bluff}} to break even? Enter a percentage."
    answer: alpha.cbet.small
    explanation: "The threshold is bet ÷ ({{t:pot}} + bet) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. An opponent with fold to c-bet clearly above this number {{t:fold|folds}} often enough that a c-bet earns even with no hand."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "The opponent has fold to c-bet of {{n:hud.ex.fcb.high}} over {{n:hud.ex.reg.hands}} hands. You hit nothing on a {{t:dry}} flop. Is a 1/3-{{t:pot}} c-bet with no hand profitable?"
    options:
      - { text: "Yes: the opponent {{t:fold|folds}} more often than {{n:alpha.cbet.small}}, so the c-bet earns immediately", correct: true, why: "A 1/3-{{t:pot}} c-bet breaks even at {{n:alpha.cbet.small}} {{t:fold|folds}}. The opponent {{t:fold|folds}} much more often, so the c-bet earns before you even count your hand's equity. Fold to c-bet combines all sizes and tables, so it's an approximation." }
      - { text: "No: you don't bet without a hand", why: "A {{t:bluff}} doesn't need a hand, it needs {{t:fold|folds}}. When the opponent {{t:fold|folds}} more often than {{n:alpha.cbet.small}}, the c-bet earns with any hand." }
      - { text: "Only with a large size, because a small one doesn't fold out hands", why: "A bigger bet needs more {{t:fold|folds}}: at 3/4 {{t:pot}}, as much as {{n:alpha.cbet.big}}. When the opponent {{t:fold|folds}} often anyway, a small c-bet does it more cheaply." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "The opponent has fold to c-bet of {{n:hud.ex.fcb.low}} over {{n:hud.ex.reg.hands}} hands. You missed the flop and have no {{t:draw}}. You're considering a 3/4-{{t:pot}} c-bet. What do you do?"
    options:
      - { text: "I {{t:check}}: this opponent {{t:fold|folds}} less often than a big c-bet needs", correct: true, why: "A 3/4-{{t:pot}} c-bet only breaks even at {{n:alpha.cbet.big}} {{t:fold|folds}}, and the opponent {{t:fold|folds}} {{n:hud.ex.fcb.low}} of the time. With no hand and no outs, this {{t:bluff}} loses." }
      - { text: "I bet, because a c-bet is standard", why: "A c-bet with no hand is only good when the opponent {{t:fold|folds}} often enough or when the hand has equity. Here you have neither." }
      - { text: "I go all-in to force a {{t:fold}}", why: "The bigger the bet, the more {{t:fold|folds}} it needs. An opponent who rarely {{t:fold|folds}} won't {{t:fold}} more often because you {{t:bet}} more." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "A {{t:recreational}} with fold to 3-bet of {{n:mda.rec.f3b}} {{t:open|opens}} from the {{t:cutoff}}. You're on the Button. In the baseline, KJs sometimes {{t:call|calls}}, and A5s is sometimes a 3-bet {{t:bluff}}. How do you play against this player?"
    options:
      - { text: "I 3-bet KJs for {{t:value}}, and I don't 3-bet A5s as a {{t:bluff}}", correct: true, why: "A player who rarely {{t:fold|folds}} to a 3-bet often {{t:call|calls}} with weaker hands, so stronger hands earn by 3-betting. A 3-bet {{t:bluff}} only earns immediately at more than {{n:alpha.vs-3bet-ip-size}} {{t:fold|folds}}, and this player {{t:fold|folds}} {{n:mda.rec.f3b}} of the time." }
      - { text: "I 3-bet A5s, because a {{t:bluff}} with a {{t:blocker}} is a good 3-bet", why: "In the baseline, yes, against an opponent who {{t:fold|folds}} about half the time. This one {{t:fold|folds}} {{n:mda.rec.f3b}} of the time, so the {{t:bluff}} almost always plays a big {{t:pot}} with a weak hand." }
      - { text: "I just {{t:call}} with KJs so I don't scare the opponent away", why: "Against a player who {{t:call|calls}} 3-bets with weaker hands, a 3-bet with KJs builds a bigger {{t:pot}} with a better hand and with {{t:position}}. That's better than just a {{t:call}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "According to population data from online micro stakes (NL25), {{t:regular|regulars}} {{t:fold}} to a 3-bet {{n:mda.reg.f3b}} of the time, and {{t:recreational|recreational players}} {{n:mda.rec.f3b}}. A 3-bet in {{t:position}} to {{n:pf.3bet.ip-total}} earns with no hand at more than {{n:alpha.vs-3bet-ip-size}} {{t:fold|folds}}. What follows from this?"
    options:
      - { text: "Against {{t:recreational|recreational players}} you 3-bet with almost no {{t:bluff|bluffs}}; against {{t:regular|regulars}} {{t:bluff|bluffs}} stay, but only with hands that have equity", correct: true, why: "Neither group {{t:fold|folds}} often enough for a 3-bet to earn with no hand. 3-bet {{t:bluff|bluffs}} in the baseline live on postflop equity and on {{t:fold|folds}}; against a player who {{t:fold|folds}} {{n:mda.rec.f3b}} of the time, mostly equity remains, so you 3-bet a {{t:linear}} {{t:range}}." }
      - { text: "You 3-bet everyone with any hand, because everyone {{t:fold|folds}} a lot", why: "Nobody here {{t:fold|folds}} more often than {{n:alpha.vs-3bet-ip-size}}. 3-betting every hand would lose." }
      - { text: "Against {{t:recreational|recreational players}} you stop 3-betting altogether", why: "The opposite: a player who {{t:call|calls}} 3-bets with weaker hands pays off your strong hands. You change what you 3-bet with, you don't give up 3-betting." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "After {{n:hud.ex.mid.hands}} hands, the opponent looks loose and passive, but the sample is small. How far do you deviate from the baseline?"
    options:
      - { text: "A little, in the direction of the read, and only with borderline hands", correct: true, why: "The direction is visible even in a small sample, but the numbers have a large error. You shift hands on the edge of the decision toward the read and play the rest as in the baseline until the sample grows." }
      - { text: "All the way: I immediately play a maximally {{t:exploit|exploitative}} strategy against them", why: "With a small sample, the read may be wrong. A large deviation from the baseline is itself exploitable: the baseline is the strategy least vulnerable to exploitation." }
      - { text: "Not at all, until I have a thousand hands", why: "Too cautious. The direction of the read at {{n:hud.ex.mid.hands}} hands already means something, and you can shift borderline hands cheaply." }
---
{{t:exploit|Exploiting}} doesn't replace the baseline; it shifts it. First you know how equilibrium is played (modules 3–9), then the data shows you which way the opponent deviates from it, and you shift your own play the same way. The question is: which hands, and how far.

## Start with {{t:mixed-hand|mixing hands}}

In equilibrium, some hands play two actions, e.g. sometimes they {{t:call}} and sometimes they {{t:fold}}. They do this because both actions give the same result: the opponent has exactly enough {{t:bluff|bluffs}} to make the hand indifferent. These are the hands that react first to the opponent's mistake:

- the opponent {{t:bluff|bluffs}} too often: {{t:mixed-hand|mixing hands}} always {{t:call}};
- the opponent {{t:bluff|bluffs}} too rarely: {{t:mixed-hand|mixing hands}} always {{t:fold}}.

It doesn't take much. In a published solver example (the Button bets the river after a bet, {{t:check}}, bet line), changing the opponent's {{t:bluff|bluffs}} from about {{n:overbluff.base}} to about {{n:overbluff.lock}} switched the {{t:big-blind}}'s defense to pure {{t:call|calling}}. Hands that always {{t:fold}} or always continue in the baseline only change their decision when the opponent deviates far from equilibrium.

## The {{t:bluff}} threshold

{{t:alpha}} from module 6 tells you whether a {{t:bluff}} with no hand pays off:

```formula
A {{t:bluff}} earns when the opponent {{t:fold|folds}} more often than: bet ÷ (pot + bet)
```

For a 1/3-{{t:pot}} c-bet that's {{n:alpha.cbet.small}}; for 3/4 {{t:pot}}, {{n:alpha.cbet.big}}. Fold to c-bet from the {{t:hud}} shows whether the opponent is above or below this threshold. It's an approximation: the stat combines all sizes and flops, and your hand usually still has some equity. On a flop that hits the opponent's {{t:range}}, they {{t:fold}} less often than average.

Players in the online micro-stakes population (NL25) {{t:fold}} to a flop c-bet {{n:mda.all.fcb}} of the time on average. That's not necessarily a mistake: the solver {{t:out-of-position}} on the flop also {{t:fold|folds}} more often than the {{t:mdf}} implies (module 6). So a population average above the threshold doesn't by itself justify a c-bet with no hand; you need a read on the specific opponent or a flop that doesn't hit their {{t:range}}.

## 3-betting a player who doesn't {{t:fold}}

A 3-bet in {{t:position}} to {{n:pf.3bet.ip-total}} earns with no hand at all only when the opponent {{t:fold|folds}} more often than {{n:alpha.vs-3bet-ip-size}} (module 4). Data from the online micro-stakes population (NL25):

| Group | Fold to 3-bet |
|---|---|
| {{t:regular|Regulars}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Recreational players}} | {{n:mda.rec.f3b}} |

In the baseline, 3-bet {{t:bluff|bluffs}} live on {{t:fold|folds}} and on postflop equity. Against a player who {{t:fold|folds}} {{n:mda.rec.f3b}} of the time, there are almost no {{t:fold|folds}}, but they {{t:call}} with weaker hands. That's why you 3-bet them with a {{t:linear}} {{t:range}}: more strong hands for {{t:value}}, almost no {{t:bluff|bluffs}}. Coaches in two training materials put this boundary at fold to 3-bet of about {{n:hud.f3b.low}}.

## Small sample, small deviation

The smaller the sample, the larger the stat's error (lesson 1). With a small sample, you shift only borderline hands and only in the direction of the read. A large deviation, across your whole {{t:range}}, only makes sense with a large sample and a clear mistake by the opponent. Deviating from the baseline is itself a mistake that a good opponent can exploit.

:::note Sources
The {{t:mixed-hand}} principle comes from a published solver analysis with the opponent's strategy locked (a solver solution, not population data). The {{t:alpha}} thresholds are arithmetic. Population fold to 3-bet and fold to c-bet come from a public stats database (one large online site, NL25–NL100, {{n:mda.period.months}} months before October 2026). The fold to 3-bet boundary and the “small sample, small deviation” principle are recommendations from two training materials.
:::
