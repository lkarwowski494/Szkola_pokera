---
id: m13.l2
module: m13
order: 2
title: "Reviews from play and targeted training"
sub: "What happens to your mistakes"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "In a game you had A♥ K♥ on a Q♥ 7♥ 2♣ {{t:board}} and made a mistake. In the review you see A♠ K♠ on a Q♠ 7♠ 2♦ {{t:board}}. Is the correct decision the same?"
    options:
      - { text: "Yes: all suits were changed with a single swap", correct: true, why: "Hearts became spades and clubs became diamonds, everywhere at once. You still have an ace-high {{t:flush-draw}} and the same hand strength, so the decision doesn't change." }
      - { text: "No: spades are stronger than hearts", why: "In Texas Hold'em all suits are equal: what matters is only whether cards share a suit, not which suit it is." }
      - { text: "Can't tell, you have to work it out again", why: "You don't: swapping all suits at once preserves every hand and every {{t:draw}}. This is exact, not an approximation." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Which of these changes does NOT preserve the decision from this spot: K♥ Q♥ on a J♥ 8♥ 3♠ {{t:board}}?"
    options:
      - { text: "K♥ Q♥ on a J♠ 8♠ 3♥ {{t:board}}", correct: true, why: "Here the suits were changed only on the {{t:board}}: your hearts no longer match the {{t:board}} and the {{t:flush-draw}} is gone. This is a different spot." }
      - { text: "K♠ Q♠ on a J♠ 8♠ 3♥ {{t:board}}", why: "This is a single swap for all cards (hearts ↔ spades), so the decision is the same." }
      - { text: "K♦ Q♦ on a J♦ 8♦ 3♠ {{t:board}}", why: "This is a single swap (hearts → diamonds) for all cards, so the decision is the same." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Which decisions from the report become review cards?"
    options:
      - { text: "Mistakes, inaccuracies and decisions made after the time ran out", correct: true, why: "Yes. An acceptable decision isn't a mistake, so it doesn't create a card. The same rule with the same hand class in the same spot gives one card, not several." }
      - { text: "All graded decisions", why: "Aligned and acceptable decisions don't need fixing, and reviews are meant to train what went wrong." }
      - { text: "Only mistakes, not inaccuracies", why: "An inaccuracy (e.g. the right action with the wrong size) counts like a mistake, so it also comes back in reviews." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "Within {{n:game.recall.days}} days you made {{n:game.recall.count}} mistakes in the same spot family (e.g. defending the {{t:big-blind|big blind}} against the Button). What will the app do?"
    options:
      - { text: "Bring the whole family back into reviews: new hands from that spot", correct: true, why: "Yes: a single spot is repeated by its card, and a recurring mistake in one family brings back tasks from the whole family, with new hands." }
      - { text: "Nothing, the mistake cards are enough", why: "A card repeats one specific spot. A recurring mistake in a family means it's worth practicing more broadly." }
      - { text: "Lock that module's area", why: "An area unlocked after the lessons stays available. The app only adds reviews." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "After a {{t:session}} of a few dozen hands, you count that you entered the pot in almost half of them. What does this tell you?"
    options:
      - { text: "Nothing yet: the sample is too small", correct: true, why: "Even {{t:vpip}} is read after about {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} hands. From one {{t:session}} you can judge individual decisions, but not your frequencies." }
      - { text: "You play too loose and need to change it", why: "Maybe, maybe not: a few dozen hands is too few to tell your style apart from the run of the cards. Look at the grade of each decision to enter the pot." }
      - { text: "You play well, because you won many hands", why: "The result says nothing about decision quality, and one {{t:session}} says nothing about frequencies." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "In a {{t:session}} you faced a 4-bet twice and {{t:fold|folded}} both times. Do you now know that you {{t:fold}} to 4-bets too often?"
    options:
      - { text: "No: opportunities are what count, and two is too few", correct: true, why: "One coach looks at a stat only after about {{n:hud.opps.look}} opportunities and becomes confident at about {{n:hud.opps.sure}}. Two opportunities are noise; judge each of those decisions on its own." }
      - { text: "Yes: you {{t:fold}} in every situation", why: "Two out of two looks like “always”, but with two opportunities even a strategy that {{t:fold|folds}} half the time will often produce that result." }
      - { text: "Yes, if it happened in one {{t:session}}", why: "One {{t:session}} adds nothing: the number of opportunities is still small." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "When does the “Flop: c-bet” game area unlock?"
    options:
      - { text: "After completing all lessons in the module", correct: true, why: "Yes: the area deals only spots from the module, so it unlocks once you know its rules. Free play is available from the start." }
      - { text: "After winning a few {{t:session|sessions}}", why: "Results in {{t:chips}} don't unlock anything: they're mostly noise." }
      - { text: "Right away, like free play", why: "Free play is available from day one, and areas only after the module's lessons." }
---
Every mistake from the report comes back to you in reviews. This lesson shows how.

## The same spot in different suits

Mistakes, inaccuracies and decisions made after the time ran out become review cards. A card shows the same spot: the same {{t:position|positions}}, actions and sizes, the same card ranks. Only the suits change: the app swaps them with a single swap for all cards at once, e.g. hearts to spades and spades to hearts.

Such a swap doesn't change the strength of any hand or any {{t:draw}}, because what matters is only whether cards share a suit. So the correct decision is the same, and you learn to recognize the spot rather than memorize a picture.

The same rule with the same hand class in the same spot gives one card, not several. New cards from play enter reviews within a daily limit; the rest wait for the following days.

## When a mistake repeats

If within {{n:game.recall.days}} days you have at least {{n:game.recall.count}} mistakes or inaccuracies in the same spot family, the app brings the whole family back into reviews: tasks with new hands from that spot. Decision mistakes count, not lost hands. These thresholds are starting values that we will adjust based on app usage data.

## Targeted training

A game area is one course module. It unlocks after you complete all lessons in the module and deals only spots from it, e.g. a c-bet after an {{t:open}} from the Button. From the report you can go straight to the area where you made the most mistakes.

## One {{t:session}} is not a statistic

The report doesn't show your frequencies, e.g. how often you enter the pot. Even {{t:vpip}} is read after about {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} hands, and rare spots come up only a few times in a {{t:session}}. One coach advises counting opportunities, not hands: they look at a stat at about {{n:hud.opps.look}} opportunities and become confident at about {{n:hud.opps.sure}}.

:::note Where these rules come from
The suit swap is exact: hand rankings don't distinguish suits. Hand samples as in the {{t:exploit}} module (two training materials); number of opportunities: a training material on sample size for {{t:hud}} stats. The review thresholds are app settings, with no source.
:::
