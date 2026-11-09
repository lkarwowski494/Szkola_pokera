---
id: m10.l1
module: m10
order: 1
title: "HUD statistics"
sub: "What VPIP and PFR measure and how many hands you need"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "You are in the {{t:big-blind|big blind}}. Two players limp, you {{t:check}} and see the flop. Does this hand increase your {{t:vpip}}?"
    options:
      - { text: "No: you didn't voluntarily put in a single {{t:chips|chip}}", correct: true, why: "{{t:vpip}} counts only voluntary preflop contributions: a {{t:call}} or a {{t:raise}}. The {{t:big-blind|big blind}} is a forced bet, and a {{t:check}} costs nothing." }
      - { text: "Yes: you play the flop, so the hand counts as played", why: "Seeing the flop isn't enough. {{t:vpip}} goes up only when you put in {{t:chips}} yourself before the flop." }
      - { text: "Yes, and it raises your {{t:pfr}} too", why: "{{t:pfr}} goes up only when you {{t:raise}} before the flop. Here nobody raised, and you only {{t:check|checked}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "A friend shows you a note: an opponent has {{t:vpip}} {{n:hud.ex.wrong.vpip}} and {{t:pfr}} {{n:hud.ex.wrong.pfr}}. What do you make of it?"
    options:
      - { text: "It's impossible: {{t:pfr}} can't be higher than {{t:vpip}}", correct: true, why: "Every preflop {{t:raise}} is also a voluntary contribution, so it counts in both stats. {{t:pfr}} is always at most equal to {{t:vpip}}; your friend mixed up the numbers." }
      - { text: "It's a very aggressive player who almost never {{t:call|calls}}", why: "A player who never {{t:call|calls}} has {{t:pfr}} equal to {{t:vpip}}, but not higher. A higher {{t:pfr}} means a recording error." }
      - { text: "It's a passive player", why: "Passivity shows when {{t:pfr}} is much lower than {{t:vpip}}, not higher." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "An opponent has {{t:vpip}} {{n:mda.rec.vpip}} and {{t:pfr}} {{n:mda.rec.pfr}}. What does he do with the hands he plays but doesn't {{t:raise}}?"
    options:
      - { text: "He {{t:call|calls}} or limps: that's the {{n:mda.rec.gap}} difference", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. He puts these hands into the {{t:pot}} without a {{t:raise}}: he limps or {{t:call|calls}} other players' {{t:open|opens}}." }
      - { text: "He {{t:fold|folds}} them before the flop", why: "Hands folded before the flop don't count toward {{t:vpip}} at all. The {{t:vpip}} − {{t:pfr}} difference is hands played without a {{t:raise}}." }
      - { text: "He plays them {{t:all-in}}", why: "A preflop all-in is also a {{t:raise}}, so it would increase {{t:pfr}}. The difference is hands that were only {{t:call|called}} or limped." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "After {{n:hud.se.ex.n}} hands, an opponent has {{t:vpip}} {{n:hud.se.ex.p}}. What is the standard error of this number in percentage points? Enter a number."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. With about {{n:var.conf95}} confidence, the true {{t:vpip}} lies within ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "After {{n:hud.se.ex.n}} hands, an opponent's {{t:vpip}} is {{n:hud.se.ex.p}}. What do you know about his true {{t:vpip}}?"
    options:
      - { text: "With about {{n:var.conf95}} confidence it lies between {{n:hud.ci.ex.low}} and {{n:hud.ci.ex.high}}", correct: true, why: "The standard error is about {{n:hud.se.ex}}, and the {{n:var.conf95}} interval is ± {{n:var.z95}} errors, i.e. ± {{n:hud.ci.ex}}. You know the opponent isn't extreme, but you can't yet tell apart types that differ by a few points." }
      - { text: "It is exactly {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} hands is still a small sample: the error is about {{n:hud.se.ex}}, and the {{n:var.conf95}} interval is ± {{n:hud.ci.ex}}." }
      - { text: "Nothing: before a thousand hands, stats mean nothing", why: "That's an exaggeration. An interval from {{n:hud.ci.ex.low}} to {{n:hud.ci.ex.high}} already rules out a very tight or a very loose player. Only precision is missing." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "After a few hundred hands, an opponent has had {{n:hud.se.f3b.n}} chances to respond to a 3-bet and {{t:fold|folded}} in {{n:hud.se.f3b.p}} of them. What do you know about his fold to 3-bet?"
    options:
      - { text: "Almost nothing: with about {{n:var.conf95}} confidence it's between {{n:hud.ci.f3b.low}} and {{n:hud.ci.f3b.high}}", correct: true, why: "Opportunities count, not hands. The error is √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, and the {{n:var.conf95}} interval is ± {{n:hud.ci.f3b}}. That interval fits both a player who almost always defends and one who almost always {{t:fold|folds}}." }
      - { text: "He {{t:fold|folds}} exactly {{n:hud.se.f3b.p}} of the time, because the sample has a few hundred hands", why: "A few hundred hands is only {{n:hud.se.f3b.n}} opportunities for this stat. You calculate the error from opportunities: it comes out to about {{n:hud.se.f3b}}." }
      - { text: "He {{t:fold|folds}} too often, because above {{n:hud.f3b.low}} is a mistake", why: "{{n:hud.se.f3b.p}} isn't “above {{n:hud.f3b.low}}”, and with {{n:hud.se.f3b.n}} opportunities the error is about {{n:hud.se.f3b}}. You can't draw a conclusion from a sample like this." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "A new opponent, {{n:hud.ex.few.hands}} hands in the {{t:hud}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. How do you play against him?"
    options:
      - { text: "As against an unknown player, using the baseline; I keep collecting hands", correct: true, why: "Below about {{n:hud.hands.random}} hands, stats are random: a few good hands in a row produce a {{t:vpip}} like this. The player type shows roughly after about {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} hands, and {{t:vpip}} and {{t:pfr}} stabilize after about {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "As against a {{t:maniac}}: I {{t:call}} wide", why: "A {{t:maniac}}, a very loose and aggressive player, is only one possibility: after {{n:hud.ex.few.hands}} hands it could be any type. Calling wide based on chance costs you when the opponent turns out to be an ordinary {{t:regular}}, a frequent player who plays fairly solidly." }
      - { text: "As against a {{t:nit}}, because most players are {{t:nit|nits}}", why: "You don't know that either: a {{t:nit}}, a very tight player, is just one of the types. Without a sample there's no read, so you go back to the baseline." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Which stat needs the most hands to be reliable?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "An opportunity for fold to 3-bet comes up only when the opponent {{t:open|opened}} and faced a 3-bet, which is rare. That's why you need about {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} hands instead of {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "{{t:vpip}} has an opportunity in every hand, so it stabilizes fastest: after about {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} hands." }
      - { text: "{{t:pfr}}", why: "{{t:pfr}}, like {{t:vpip}}, has an opportunity in every hand where the player can {{t:raise}}, so it stabilizes quickly." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "Your site bans {{t:hud}} software at the table. What do you do?"
    options:
      - { text: "I play without a {{t:hud}}, and after the {{t:session}} I review my hand database and notes on regular opponents", correct: true, why: "The site's terms are binding: banned software can get your account closed. You can review stats from your own hand history after playing, and some sites show their own stats at the table." }
      - { text: "I use a {{t:hud}} despite the ban, because it gives an edge", why: "For breaking the terms, the site can close your account and withhold your funds. The edge isn't worth it." }
      - { text: "I give up on {{t:exploit|exploits}}, because without a {{t:hud}} they're impossible", why: "They're possible: reads from reviewing hands after the {{t:session}} and population data for your {{t:stakes}} also show which way to deviate from the baseline." }
---
An {{t:exploit}} is a deviation from the baseline of modules 3–9 toward an opponent's mistake. To know which way to deviate, you need data. Online, a {{t:hud}} provides it: software that records hands and shows stats for every opponent at the table.

## {{t:vpip}} and {{t:pfr}}

The two most important numbers describe preflop play:

- **{{t:vpip}}**: the percentage of hands in which a player voluntarily puts {{t:chips}} into the {{t:pot}} before the flop, i.e. {{t:call|calls}} or {{t:raise|raises}}. Blinds don't count, because they are forced.
- **{{t:pfr}}**: the percentage of hands in which a player {{t:raise|raises}} before the flop: {{t:open|opens}}, 3-bets or 4-bets.

Every {{t:raise}} is also a voluntary contribution, so {{t:pfr}} never exceeds {{t:vpip}}. The {{t:vpip}} − {{t:pfr}} difference is the hands the player only {{t:call|called}} or limped. A player with {{t:vpip}} {{n:mda.rec.vpip}} and {{t:pfr}} {{n:mda.rec.pfr}} plays many hands, but in {{n:mda.rec.gap}} of all hands enters the {{t:pot}} without a {{t:raise}}.

## Other stats

| Stat | What it measures | Opportunity |
|---|---|---|
| 3-bet | how often he {{t:raise|raises}} someone else's {{t:open}} | someone before him {{t:open|opened}} |
| Fold to 3-bet | how often he {{t:fold|folds}} to a 3-bet | he {{t:open|opened}} and faced a 3-bet |
| C-bet | how often he bets the flop after his own {{t:raise}} | he was the preflop {{t:aggressor}} |
| Fold to c-bet | how often he {{t:fold|folds}} to a c-bet | he faced a c-bet |
| {{t:wtsd}} | how often he goes to showdown after the flop | he saw the flop |

The last column matters: a stat changes only when the opponent has an opportunity. {{t:vpip}} has an opportunity in every hand, while fold to 3-bet only when the opponent {{t:open|opened}} and faced a 3-bet.

## How many hands you need

Each hand is a random sample of the opponent's strategy, so a stat has an error like any sample mean. You calculate it with the formula for the error of a sample mean (in module 12 you'll use the same formula to calculate the error of your {{t:winrate}}):

```formula
error = √(p × (1 − p) ÷ n)
{{n:var.conf95}} interval = p ± {{n:var.z95}} × error
```

Here p is the percentage (e.g. {{t:vpip}}), and n is the number of opportunities. After {{n:hud.se.ex.n}} hands with {{t:vpip}} {{n:hud.se.ex.p}}, the error is about {{n:hud.se.ex}}, so with about {{n:var.conf95}} confidence the true {{t:vpip}} lies between **{{n:hud.ci.ex.low}} and {{n:hud.ci.ex.high}}**. A fold to 3-bet of {{n:hud.se.f3b.p}} from {{n:hud.se.f3b.n}} opportunities gives an interval from {{n:hud.ci.f3b.low}} to {{n:hud.ci.f3b.high}}: almost nothing.

Coaches give similar thresholds:

- below about {{n:hud.hands.random}} hands, stats are random; play as against an unknown player;
- the player type shows roughly after {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} hands, and {{t:vpip}} and {{t:pfr}} stabilize after about {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}};
- 3-bet needs about {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} hands, fold to 3-bet about {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}, and turn and river stats even more.

:::note When the site bans a {{t:hud}}
Some sites (according to training materials, including large sites at low {{t:stakes}}) ban {{t:hud}} software at the table. Then you review your own hand history after the {{t:session}}, keep notes on regular opponents and use population data for your {{t:stakes}} (lesson 2). The sample thresholds come from two training materials that give different numbers of hands. The error formula is a calculation.
:::
