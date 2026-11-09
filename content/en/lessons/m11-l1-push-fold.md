---
id: m11.l1
module: m11
order: 1
title: "Short stack: all-in or fold"
sub: "When a raise turns into an all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Tournament}}. You have {{n:m11.depth.10}}, and everyone before you has {{t:fold|folded}}. Which game plan is simple and proven in the sources?"
    options:
      - { text: "All-in or {{t:fold}}", correct: true, why: "At about {{n:m11.thr.pushfold}} or less, sources agree on push/fold. Raising and then folding to a {{t:raise}} would give up too much of your stack, while an all-in gets the most {{t:fold|folds}} out of your opponent." }
      - { text: "Raise to {{n:pf.open-size}}, then decide after a {{t:raise}}", why: "After a raise like that you have little left behind the {{t:pot}}, so facing an all-in {{t:raise}} you are almost forced to {{t:call}} anyway. Your opponent doesn't have to {{t:fold}}, and you lose fold equity." }
      - { text: "{{t:call|Call}} the blind (limp) and see the flop", why: "A limp gives you no chance to win the {{t:pot}} right away. Solvers with the full choice of actions sometimes limp, but that's an advanced strategy; the simple, safe plan is all-in or {{t:fold}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "You have {{n:m11.thr.raise}} or more and you {{t:open}} first. What do you do with a hand you want to play?"
    options:
      - { text: "Usually raise (e.g., a min-raise)", correct: true, why: "Above about {{n:m11.thr.raise}}, sources recommend a regular raise: you still have room to {{t:fold}} to a {{t:raise}} or play after the flop." }
      - { text: "Always all-in", why: "Going all-in with such a big stack risks a lot to win only the blinds. Weaker hands {{t:fold}}, and better ones pay you off." }
      - { text: "Push/fold, just like at {{n:m11.thr.pushfold}}", why: "Push/fold is a tool for a {{t:short-stack}}: up to about {{n:m11.thr.pushfold}}, and for weaker hands up to about {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "You have {{n:m11.m.stack}} {{t:chips}}. The blinds are {{n:m11.m.sb}}/{{n:m11.m.bb}}, and the {{t:big-blind}} also posts an ante of {{n:m11.m.ante}}. What is your M?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind}} + {{t:big-blind}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. That's how many orbits you survive without playing. In {{t:big-blind|big blinds}} it's {{n:m11.m.bbs}}, but M also counts the ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Your M has dropped to about {{n:m11.m.example}}. What does the M zone model say about this?"
    options:
      - { text: "{{t:red-zone|Red zone}}: only all-in or {{t:fold}}, preferably first in", correct: true, why: "At an M of about {{n:m11.m.red}} or lower, all you have left is all-in or {{t:fold}}. Going in first gives you a chance that everyone {{t:fold|folds}}." }
      - { text: "{{t:green-zone|Green zone}}: you play normally", why: "The {{t:green-zone}}, where your stack lets you play freely, starts only at an M of about {{n:m11.m.green}}. At an M of about {{n:m11.m.example}}, your stack lasts {{n:m11.m.example}} orbits." }
      - { text: "Wait for aces, since you have time anyway", why: "At an M of about {{n:m11.m.example}}, the blinds will eat your stack before you get a strong hand. You need to go all-in with a wider {{t:range}}." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "You have {{n:m11.depth.10}} in the {{t:small-blind}}, and everyone has {{t:fold|folded}}. Paint the hands you go all-in with."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Small blind}}, everyone has {{t:fold|folded}}, and you have K2o. At {{n:m11.depth.10}} the solver goes all-in with this hand. What about at {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "At {{n:m11.depth.15}} you risk more relative to the blinds, so the all-in {{t:range}} narrows from about {{n:m11.push.10}} to about {{n:m11.push.15}} hands. K2o drops out of it." }
      - { text: "All-in, because a king is a strong card", why: "At {{n:m11.depth.15}}, K2o too often runs into a better king or an ace in the {{t:call|calling}} {{t:range}}. The solver {{t:fold|folds}} it." }
      - { text: "All-in, because the deeper the stack, the wider", why: "It's the opposite: the deeper the stack, the narrower the all-in {{t:range}}. You {{t:shove}} widest with a very {{t:short-stack}}." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Small blind}}, {{n:m11.depth.10}}, no ante. How many times out of a hundred would the {{t:big-blind}} have to {{t:fold}} for an all-in to break even with a hand that has no chance at all?"
    options:
      - { text: "More than {{n:m11.push.10.alpha}}", correct: true, why: "You risk {{n:m11.push.10.risk}} to win {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) is about {{n:m11.push.10.alpha}}. Your opponent doesn't {{t:fold}} that often, so an all-in pays off only with a hand that also has equity when the opponent {{t:call|calls}}." }
      - { text: "More than half", why: "Half would be enough if you risked as much as you can win. Here you risk {{n:m11.push.10.risk}} and win only {{n:m11.push.10.win}} blinds." }
      - { text: "It's enough if they {{t:fold}} sometimes", why: "Every {{t:call}} costs a hand with no chance its whole stack. Without equity you need very frequent {{t:fold|folds}}: more than {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Why, with a {{t:short-stack}}, do you prefer to go all-in first rather than wait for someone else to go all-in and then {{t:call}}?"
    options:
      - { text: "Because an all-in wins in two ways", correct: true, why: "Going in first, you win the {{t:pot}} when everyone {{t:fold|folds}}, or you win at showdown. When {{t:call|calling}}, you win only at showdown." }
      - { text: "Because an all-in always has more equity", why: "A hand's equity doesn't depend on who went in first. The difference is that an all-in gives your opponent a chance to {{t:fold}}." }
      - { text: "Because {{t:call|calling}} an all-in is not allowed", why: "You're allowed to {{t:call}}, but to {{t:call}} you need a stronger hand (see the lesson on {{t:call|calling}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "Same {{n:m11.depth.10}} stack in the {{t:small-blind}}, but the game is played with a {{t:bb-ante}}: the {{t:big-blind}} has posted an ante of {{n:m11.ante}}. How does the all-in {{t:range}} change?"
    options:
      - { text: "It grows: about {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} instead of {{n:m11.push.10}}", correct: true, why: "The ante increases the {{t:pot}} you win when your opponent {{t:fold|folds}}: {{n:m11.push.10.win-ante}} instead of {{n:m11.push.10.win}}. A hand with no chance now needs only more than {{n:m11.push.10.alpha-ante}} {{t:fold|folds}}, so more all-ins pay off." }
      - { text: "It shrinks, because the opponent has more in the {{t:pot}} and will {{t:call}} more often", why: "The opponent does {{t:call}} wider, but the bigger {{t:pot}} to win outweighs that. The equilibrium is about {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} hands." }
      - { text: "It doesn't change", why: "The ante changes the risk-to-reward ratio. Without the ante it's about {{n:m11.push.10}}; with the ante, about {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
In a {{t:tournament}}, the blinds go up but your stack doesn't. Sooner or later it gets so small that a regular raise stops working. That's when the **push/fold** strategy comes in: with every hand you play, you {{t:shove}}, meaning you go all-in, and you {{t:fold}} the rest.

## When to go all-in or {{t:fold}}

You count your stack in {{t:big-blind|big blinds}}. Sources agree on one thing: at about **{{n:m11.thr.pushfold}} or less**, you play almost exclusively all-in or {{t:fold}}.

| Stack | What you usually do |
|---|---|
| about {{n:m11.thr.pushfold}} or less | all-in or {{t:fold}} |
| from {{n:m11.thr.pushfold}} to {{n:m11.thr.upper}} | push/fold with weaker and medium hands |
| more than about {{n:m11.thr.raise}} | regular raise |

Why not raise? When you have {{n:m11.depth.10}} and raise to {{n:pf.open-size}}, you have so little left behind the {{t:pot}} that facing an all-in {{t:raise}} you almost have to {{t:call}} anyway. Your opponent knows you won't {{t:fold}}, so they have nothing to fear. Going all-in right away squeezes the most **fold equity** out of your stack, that is, the profit from your opponent {{t:fold|folding}}.

:::note Simplification
Push/fold is a simplification. Solvers that can also choose a limp or a small raise limp or min-raise some hands at {{n:m11.depth.10}}. Still, all-in or {{t:fold}} is simple, it's hard to make a big mistake with it, and sources recommend it as a starting point.
:::

## M: how many orbits you survive

A popular tournament model measures a {{t:short-stack}} differently: **M** is your stack divided by the cost of one orbit of the players at the table.

```formula
M = stack ÷ (small blind + big blind + ante)
```

Example: you have {{n:m11.m.stack}} {{t:chips}}, blinds of {{n:m11.m.sb}}/{{n:m11.m.bb}}, and a {{t:bb-ante}} of {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. In {{t:big-blind|big blinds}} that's {{n:m11.m.bbs}}, but M also accounts for the ante. At an M of about {{n:m11.m.red}} or lower (the {{t:red-zone}}), all you have left is all-in or {{t:fold}}.

## The shorter the stack, the wider

The grids in this lesson were calculated by this app's solver for the simplest situation: everyone has {{t:fold|folded}}, you play from the {{t:small-blind}} against the {{t:big-blind}}, and each player can only go all-in or {{t:fold}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

At {{n:m11.depth.15}} you go all-in with about {{n:m11.push.15}} hands, at {{n:m11.depth.10}} with about {{n:m11.push.10}}, and at {{n:m11.depth.5}} with about {{n:m11.nash.push.5}}–{{n:m11.push.5}}. The less you risk relative to the blinds, the more hands are profitable. For comparison, a chart from a training site gives {{n:m11.ext.push.10}} at {{n:m11.depth.10}}; the difference is within the solver's validation tolerance, and the direction is the same.

## Three players: the more opponents behind you, the tighter

When you play from the Button, there are two players behind you, not one. Either of them can have a strong hand, so both of them {{t:fold|folding}} happens less often. With three players and stacks of {{n:m11.depth.3max}} each, the Button goes all-in with about {{n:m11.3max.push.btn}} hands, and the {{t:small-blind}}, when the Button has {{t:fold|folded}}, with about {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

We checked these two grids against a published equilibrium result for the same situation (a 2008 research paper: Button {{n:m11.jamfold3.btn}}). The few hands where the results differ are not used in the drills.

## Two ways to win

An all-in wins when your opponent {{t:fold|folds}}, or when they {{t:call}} and lose at showdown. Your opponent's {{t:fold}} alone is rarely enough: at {{n:m11.depth.10}} you risk {{n:m11.push.10.risk}} to win {{n:m11.push.10.win}} blinds, so a hand with no chance would need {{t:fold|folds}} in more than {{n:m11.push.10.alpha}} of cases. That's why both fold equity and your hand's equity when your opponent {{t:call|calls}} matter.

## The ante widens the {{t:range}}

The ante is extra {{t:chips}} in the {{t:pot}} before the deal. With a {{t:bb-ante}}, the {{t:big-blind}} posts an ante of {{n:m11.ante}}, so an all-in wins {{n:m11.push.10.win-ante}} instead of {{n:m11.push.10.win}}, while the risk stays the same. In this structure the {{t:range}} grows from about {{n:m11.push.10}} to about {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} hands (the app's solver and an independent equilibrium calculation differ by a fraction of a point).

```range
push.sb-10-ante
```
