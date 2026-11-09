---
id: m12.l4
module: m12
order: 4
title: "Bankroll and Risk"
sub: "Variance measured in buy-ins and when to move down in stakes"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "A {{t:buy-in}} is {{n:format.stack}}. How many bb is a bankroll of {{n:br.bi.base}} {{t:buy-in|buy-ins}}? Enter a number."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. You count your bankroll in {{t:buy-in|buy-ins}} for the {{t:stakes}} you play."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "You win {{n:var.wr.typical.high}} with a {{t:standard-deviation}} of {{n:var.sd}}, and you have {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). What is the risk of losing your entire bankroll?"
    options:
      - { text: "About {{n:ror.base}}", correct: true, why: "The exponent is 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, so RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. This is the chance that you ever lose your entire bankroll if you never move down in {{t:stakes}}." }
      - { text: "About {{n:ror.half}}", why: "That's the result with half the bankroll, {{n:br.bi.move-down}} {{t:buy-in|buy-ins}}. With {{n:br.bi.base}}, the exponent is twice as large, so the risk drops to about {{n:ror.base}}." }
      - { text: "Zero, because the player is winning", why: "A winning player can also hit a {{t:downswing}} deeper than the entire bankroll. Risk decreases as the bankroll grows, but it never drops to zero." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "The same bankroll of {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation}} {{n:var.sd}}, but a winrate of only {{n:var.wr.typical.low}}. What is the risk of losing the bankroll?"
    options:
      - { text: "About {{n:ror.base.wr-min}}", correct: true, why: "Winrate is in the exponent: at {{n:var.wr.typical.low}} instead of {{n:var.wr.typical.high}}, the exponent is three times smaller, and the risk rises from about {{n:ror.base}} to about {{n:ror.base.wr-min}}." }
      - { text: "About {{n:ror.base}}, because the bankroll is the same", why: "Risk depends on the product winrate × bankroll. A lower winrate works like a smaller bankroll: the result is about {{n:ror.base.wr-min}}." }
      - { text: "About {{n:ror.base.wr-ex}}", why: "That's the result at a winrate of {{n:var.wr.ex}}. At {{n:var.wr.typical.low}}, the risk is dozens of times higher: about {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "You have {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation}} {{n:var.sd}}, but you don't know your winrate yet. What do you know about the risk of losing your entire bankroll?"
    options:
      - { text: "It depends on winrate: at {{n:var.wr.typical.high}} about {{n:ror.base}}, at {{n:var.wr.typical.low}} about {{n:ror.base.wr-min}}", correct: true, why: "Winrate is in the exponent next to the bankroll. Without a known winrate, you don't know the risk either, and at a low winrate the same bankroll gives several times higher risk." }
      - { text: "About {{n:ror.base}}, because it depends only on the bankroll", why: "That's the result only at {{n:var.wr.typical.high}}. At {{n:var.wr.typical.low}}, the same bankroll gives about {{n:ror.base.wr-min}}." }
      - { text: "Zero, because {{n:br.bi.base}} {{t:buy-in|buy-ins}} is a lot", why: "With a positive winrate, risk decreases as the bankroll grows, but it never drops to zero. At {{n:var.wr.typical.low}}, it's still about {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "You started at these {{t:stakes}} with {{n:br.bi.base}} {{t:buy-in|buy-ins}}. After a {{t:downswing}}, you have {{n:br.ex.below}}. What do you do?"
    options:
      - { text: "Move down one level of {{t:stakes}}", correct: true, why: "You've dropped below half of your planned bankroll ({{n:br.bi.move-down}}). With that many {{t:buy-in|buy-ins}}, the risk of losing the rest is several times higher than with {{n:br.bi.base}} (at a winrate of {{n:var.wr.typical.high}} and SD {{n:var.sd}}). At {{t:stakes}} half as high, the same bankroll is again nearly the full number of {{t:buy-in|buy-ins}} for those stakes." }
      - { text: "Keep playing, because it's just {{t:variance}}", why: "It's true that it's probably {{t:variance}}, but moving down in {{t:stakes}} is exactly what protects you from it. With {{n:br.ex.below}} {{t:buy-in|buy-ins}}, another {{t:downswing}} can take everything." }
      - { text: "Move up to higher {{t:stakes}} to win it back faster", why: "That's desperation tilt. Higher {{t:stakes}} with a smaller bankroll in {{t:buy-in|buy-ins}} sharply increases the {{t:risk-of-ruin|risk of ruin}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "You started at these {{t:stakes}} with {{n:br.bi.base}} {{t:buy-in|buy-ins}} and lost {{n:dd.bi.small}}. You now have {{n:br.ex.after-dd}}. What do you do?"
    options:
      - { text: "Stay at these {{t:stakes}} and review your decisions in the hands you lost", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}} is still more than the latest move-down threshold, {{n:br.bi.move-down}}. In a simulation, a {{t:downswing}} like this hits about {{n:dd.p.small.100k}} of players winning {{n:var.wr.ex}} over {{n:var.hands.k}} thousand hands, and reviewing hands checks whether mistakes are behind it." }
      - { text: "Move down in {{t:stakes}} right away", correct: true, why: "This is also a good decision: some sources advise moving down after losing just {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Moving down earlier than at half the bankroll is not a mistake, but moving down later is." }
      - { text: "Add {{t:buy-in|buy-ins}} from outside to get back to {{n:br.bi.base}}", why: "Topping up after every {{t:downswing}} defeats the purpose of the bankroll as a risk limit. You set the threshold in advance and stick to it." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "You have {{n:br.bi.base}} {{t:buy-in|buy-ins}} at your current {{t:stakes}}, which is what you set as your bankroll. The higher {{t:stakes}} have a {{t:buy-in}} twice as large. Do you move up?"
    options:
      - { text: "No, at the higher {{t:stakes}} it's only half of your planned bankroll", correct: true, why: "You count your bankroll in {{t:buy-in|buy-ins}} of the {{t:stakes}} you want to move to. Your {{n:br.bi.base}} {{t:buy-in|buy-ins}} are {{n:br.bi.move-down}} there, which is exactly the move-down threshold." }
      - { text: "Yes, because it's going well", why: "A good month is mostly {{t:variance}} (the lesson on {{t:variance}}). Moving up depends on your bankroll at the new {{t:stakes}}." }
      - { text: "Yes, because you already have {{n:br.bi.base}} {{t:buy-in|buy-ins}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-ins}} at your current {{t:stakes}} is only {{n:br.bi.move-down}} at {{t:stakes}} twice as high." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "A player loses on average at their {{t:stakes}} but has a huge bankroll. What does that give them?"
    options:
      - { text: "It only delays the loss", correct: true, why: "With a negative winrate, results go down on average, so sooner or later they'll lose the bankroll regardless of its size. A bankroll protects against {{t:variance}}, not against poor play." }
      - { text: "It protects them from going broke", why: "The risk formula works only with a positive winrate. A losing player is certain to lose the bankroll, just more slowly with a bigger bankroll." }
      - { text: "It lets them play higher {{t:stakes}}", why: "Higher {{t:stakes}} with a negative winrate only speeds up the loss." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "You're just starting out. How do you split your time between studying and playing?"
    options:
      - { text: "About {{n:study.beginner}} studying", correct: true, why: "At the start, you have the most to catch up on, so studying takes priority." }
      - { text: "About {{n:study.min}} studying", why: "That's the lower limit for a player who is already winning. At the start, studying should take priority." }
      - { text: "Only playing; learning will come with experience", why: "Game results are weak feedback (the lesson on decisions and results). Studying with explanations and hand analysis teach you faster." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "You're already winning at your {{t:stakes}}. How do you split your time?"
    options:
      - { text: "Roughly half and half, but never less than {{n:study.min}} studying", correct: true, why: "Even when you're winning, the ideal is about {{n:study.winner}} studying, and the minimum is {{n:study.min}}." }
      - { text: "Only playing, since you're winning", why: "Even when you're winning, you don't go below {{n:study.min}} of your time spent studying." }
      - { text: "About {{n:study.beginner}} studying, like at the start", why: "You can, if you're preparing for higher {{t:stakes}}. If you're simply winning at your own, about {{n:study.winner}} is enough." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Which sign suggests that your playing may be getting out of control?"
    options:
      - { text: "After a loss, you go back to playing to win back your losses", correct: true, why: "Chasing losses is one of the signs of a gambling problem listed in diagnostic criteria. If you recognize such signs in yourself, use the contacts on the responsible gaming card." }
      - { text: "You analyze the hands you lost after a {{t:session}}", why: "That's a healthy study habit. Signs of a problem include chasing losses, playing longer than planned, and playing with borrowed money." }
      - { text: "You end the {{t:session}} as planned", why: "That's good control over your play. A sign of a problem would be playing longer than planned or needing to win your losses back." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
A bankroll is your entire reserve set aside solely for playing poker. In this lesson, you count it in **{{t:buy-in|buy-ins}}**, not in money: one {{t:buy-in}} is a full stack of {{n:format.stack}} at the {{t:stakes}} you play.

## {{t:risk-of-ruin|Risk of ruin}}

This is the probability that you'll ever lose your entire bankroll if you keep playing at the same {{t:stakes}}:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

The formula is an approximation assuming a constant winrate and SD. Enter winrate and SD in bb/100 and the bankroll in bb. With a {{t:standard-deviation}} of {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} | {{n:br.bi.base}} {{t:buy-in|buy-ins}} | {{n:br.bi.beginner}} {{t:buy-in|buy-ins}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## What risk depends on

Winrate and bankroll sit side by side in the formula: a winrate half as high requires a bankroll twice as large for the same risk. That's why the same number of {{t:buy-in|buy-ins}} gives one player several times lower risk than another. Your winrate is unknown at first, and estimating it takes a great many hands (the lesson on {{t:variance}}). With a negative winrate, no bankroll will help, because it protects against {{t:variance}}, not against poor play.

## When to move down in {{t:stakes}}

Set the threshold in advance: move down one level of {{t:stakes}} at the latest when your bankroll drops to **half** of your planned number of {{t:buy-in|buy-ins}}, e.g., from {{n:br.bi.base}} to {{n:br.bi.move-down}}. Sources give thresholds ranging from half to the full bankroll; half is the latest of them. At {{t:stakes}} half as high, the same bankroll is again nearly the full number of {{t:buy-in|buy-ins}} for those stakes. Move back up no earlier than when you have a full bankroll in {{t:buy-in|buy-ins}} of the higher {{t:stakes}}. Some sources advise moving down earlier, after losing just {{n:dd.bi.small}} {{t:buy-in|buy-ins}}: moving down before the half threshold is not a mistake.

## Studying and playing

At the start, spend about {{n:study.beginner}} of your time studying and the rest playing. Once you're winning at your {{t:stakes}}, the ideal is about {{n:study.winner}}, but never less than {{n:study.min}} studying.

:::note Responsible gaming
Some signs that your playing is getting out of control: you play longer than you planned; after a loss, you go back to win back your losses; you play with money you can't afford to lose, or you borrow money to play; you play to escape your worries; you hide your playing from those close to you.

Where to find help:

{{helplines}}
:::
