---
id: m13.l1
module: m13
order: 1
title: "How to read the game report"
sub: "Decision, result and grades"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "You go all-in with {{n:m13.eq.example}} {{t:equity}} and lose. In what percentage of such hands do you lose despite a good decision? Enter a number."
    answer: m13.lose.example
    explanation: "You lose in 1 − e of hands: the whole minus {{n:m13.eq.example}} gives {{n:m13.lose.example}}. This loss says nothing about the decision."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "You go all-in ten times with {{n:m13.eq.example}} {{t:equity}}. How many of these hands will you lose on average? Enter a number."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. If you lose twice in a row, that still fits within the math."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "You have {{n:m13.eq.example2}} {{t:equity}} in an all-in. In what percentage of such hands do you lose? Enter a number."
    answer: m13.lose.example2
    explanation: "The whole minus {{n:m13.eq.example2}} gives {{n:m13.lose.example2}}: you lose roughly one in three such hands, and the decision is still good."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "In this spot, the solver plays your hand roughly evenly: {{t:raise}} or {{t:fold}}. You chose to {{t:fold}}. How will the report rate this?"
    options:
      - { text: "Aligned", correct: true, why: "Yes: an action the solver plays in at least {{n:range.mixed.low}} of cases is aligned. In equilibrium, a player mixes only plays with the same {{t:expected-value|expected value}}, so both are correct." }
      - { text: "Mistake, because a {{t:raise}} was required", why: "No: with a {{t:mixed-hand}}, both plays have the same {{t:expected-value|expected value}}. The report doesn’t penalize choosing one of them." }
      - { text: "Ungraded", why: "No: the spot has a solver result, so the decision is graded. “Ungraded” is given to a decision for which the app has no checkable rule." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "The solver plays your hand as a {{t:raise}} in about {{n:range.mixed.high}} of cases and as a {{t:call}} in the rest. You chose to {{t:call}}. What’s the verdict?"
    options:
      - { text: "Aligned", correct: true, why: "Yes: a {{t:call}} played in about {{n:range.mixed.low}} of cases doesn’t fall below the threshold for aligned ({{n:range.mixed.low}}). This is a {{t:mixed-hand}}." }
      - { text: "Acceptable", why: "An action played in at least {{n:range.mixed.min}} but less often than in {{n:range.mixed.low}} of cases is acceptable. Here the {{t:call}} reaches the threshold for aligned." }
      - { text: "Mistake", why: "A mistake is an action the solver doesn’t play at all. An action played less often than in {{n:range.mixed.min}} of cases is an inaccuracy." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "In a spot where the solver plays a 3-bet, you 3-bet, but to a size different from the one the rule recommends. What’s the verdict?"
    options:
      - { text: "Inaccuracy", correct: true, why: "Yes: good action, wrong size. It counts as a mistake and comes back in reviews, but the report shows a separate explanation of the size." }
      - { text: "Aligned", why: "The action is good, but size matters: a 3-bet that’s too small gives the opponent a good price, and one that’s too large risks more than necessary." }
      - { text: "Mistake", why: "A wrong action gets a mistake. A good action with the wrong size is a separate level: an inaccuracy." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Report: “14 of 30 decisions graded”. What do the remaining decisions mean?"
    options:
      - { text: "The app had no checkable rule or solver result for them", correct: true, why: "Yes: “ungraded” doesn’t mean “good”. These decisions could have been good or bad; the report doesn’t know and says so directly." }
      - { text: "They were good, so the report doesn’t show them", why: "No: the report counts good decisions as aligned. “Ungraded” is a lack of a grade, not praise." }
      - { text: "They were too easy to rate", why: "It’s not about difficulty. Graded decisions are those for which the app has a rule with a condition or a solver spot." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "After a {{t:session}}, you won a lot of {{t:chips}}, but the report shows five mistakes. What says more about your play?"
    options:
      - { text: "The decision rating", correct: true, why: "Yes: a few dozen hands are too few for the result to mean anything. Even after thousands of hands, the result is largely noise, and every mistake has its cost regardless of how the hand ended." }
      - { text: "The result in {{t:chips}}", why: "The result of a short {{t:session}} depends mainly on the cards. That’s exactly why the report shows it in a smaller font." }
      - { text: "Both equally", why: "A result from a few dozen hands says almost nothing about skill. A decision graded by a rule or a solver says much more." }
---
The report after a {{t:session}} rates your decisions, not how much you won. This lesson explains how to read it.

## Decision, not result

In the mental game module, you learned the principle: you judge a decision by the information you had at the moment of the decision, not by the result of the hand. The report applies it literally: it rates the situation before your action and doesn’t see your opponents’ cards or the cards that came later.

Losing with the better hand fits within the math. {{t:equity|Equity}} is the share of wins over many repetitions of the same situation. With {{n:m13.eq.example}} {{t:equity}}, you lose about {{n:m13.lose.example}} of hands, or on average {{n:m13.lose.of-ten}} out of {{n:m13.ten}}.

```formula
chance of losing = 1 − equity
```

## Grade levels

- **Aligned**: an action the rule recommends, or one the solver plays in at least {{n:range.mixed.low}} of cases (this threshold is an app setting).
- **Acceptable**: the solver plays it rarely (at least {{n:range.mixed.min}}, but less often than {{n:range.mixed.low}}), or the rule talks about frequency (“often”, “less often”) and you chose the less frequent option. This isn’t a mistake.
- **Inaccuracy**: good action, wrong size, or an action the solver plays, but less often than in {{n:range.mixed.min}} of cases. It counts as a mistake: this is an app setting, not theory.
- **Mistake**: an action that contradicts a categorically stated rule, or one the solver doesn’t play at all.
- **Ungraded**: the app has no checkable rule for this decision. This doesn’t mean “good”.
- **Timed out**: with the time limit on, the app played for you. Such a decision doesn’t count toward the grade, but it comes back in reviews.

At the top of the report is the count “X of Y decisions graded”. After the flop, many decisions remain ungraded, because most turn and river rules talk about frequencies for the whole {{t:range}}, not about a single hand.

## {{t:mixed-hand|Mixing hand}}

When the solver plays your hand in two ways, both are correct. Equilibrium theory explains this with the indifference principle: a player mixes only plays that have the same {{t:expected-value|expected value}}. That’s why the report doesn’t penalize choosing one of them, and marks the less frequent play as acceptable when the solver plays it in at least {{n:range.mixed.min}} of cases; less often is an inaccuracy (an app setting).

## Result in {{t:chips}}

The result is at the bottom of the report, in a small font. According to the math from the {{t:variance}} lesson, after about {{n:m13.noise.hands.k}} thousand hands the {{n:var.conf95}} interval for winrate is about ± {{n:m13.noise.ci}}, so the result is almost pure noise: a winning player can be down, and a losing one can be well up. A {{t:session}} has a few dozen hands, so the result says almost nothing about your play.

:::note Where these principles come from
Indifference principle: materials on the basics of equilibrium theory. The rare-move threshold and the name “inaccuracy”: material on evaluating your own play against a solver. The {{n:range.mixed.low}} threshold is an app setting, with no source. {{t:variance|Variance}} of the result and the chance of losing are math.
:::
