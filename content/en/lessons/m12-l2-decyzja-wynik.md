---
id: m12.l2
module: m12
order: 2
title: "Decision vs. result"
sub: "Judge the play, not the river card"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Preflop, you get your whole stack in with a {{t:pair}} of aces, and your opponent {{t:call|calls}} with a {{t:pair}} of kings. A king falls on the river and you lose. How do you rate your decision?"
    options:
      - { text: "It was very good", correct: true, why: "AA beats KK about {{n:pf.aa-vs-kk}} of the time. Losing about {{n:res.kk-wins}} of the time is the cost of playing, not a mistake. You make the same play every time." }
      - { text: "It was bad; you should have played more carefully", why: "That's judging by the result. If the river card had been different, the same decision would look great. The decision depends on what you knew before the card: about {{n:pf.aa-vs-kk}} equity." }
      - { text: "It can't be judged because you lost", why: "It can: you calculate equity at the moment of the decision. The result of a single hand adds nothing." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA beats KK all-in preflop about {{n:pf.aa-vs-kk}} of the time. In what percentage of cases do you lose despite making the best possible decision? Enter a number."
    answer: res.kk-wins
    explanation: "The whole minus {{n:pf.aa-vs-kk}} gives about {{n:res.kk-wins}}. Roughly one time in five or six, a good decision ends in a loss."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. You have a clean {{t:flush-draw}} ({{n:outs.flush}} outs), the {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} {{n:ex.bet.quarter}}. You {{t:call}}, the {{t:flush}} doesn't come, and you lose {{n:ex.bet.quarter}}. How do you rate the {{t:call}}?"
    options:
      - { text: "It was good", correct: true, why: "You needed {{n:eq.bet-quarter}} equity and had about {{n:odds.flush.turn-river}}. A {{t:call}} like this makes money in the long run, even though it loses in most individual hands." }
      - { text: "It was bad because the {{t:flush}} didn't come", why: "The {{t:flush}} only comes in about {{n:odds.flush.turn-river}} of cases, so missing was the most likely result. You judge the decision by the price, and the price was good." }
      - { text: "It was good only if the {{t:flush}} had come", why: "That is the definition of judging by the result. The same decision doesn't change in quality depending on the card that fell later." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Clean {{t:flush-draw}}, the {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} the full {{t:pot}}: {{n:ex.bet.pot}}. You {{t:call}} and the {{t:flush}} comes on the river. How do you rate the {{t:call}}?"
    options:
      - { text: "It was bad, despite the win", correct: true, why: "You needed {{n:eq.bet-pot}} equity and had about {{n:odds.flush.turn-river}}. You won this time, but over many repetitions a {{t:call}} like this loses." }
      - { text: "It was good because you won the {{t:pot}}", why: "Winning doesn't improve the decision. At a price of {{n:eq.bet-pot}} and a chance of about {{n:odds.flush.turn-river}}, this {{t:call}} loses in the long run." }
      - { text: "It was good because the {{t:flush}} is the best hand", why: "The strength of your hand after hitting doesn't change the price. What counts is the comparison: {{n:odds.flush.turn-river}} chance versus {{n:eq.bet-pot}} needed." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "You're reviewing a hand you lost. Which question matters most?"
    options:
      - { text: "Given the information I had, did the decision have positive {{t:expected-value|EV}}?", correct: true, why: "It's the only question that separates a mistake from bad luck. You calculate the price, your equity against your opponent's {{t:range}}, and what you knew at the moment of the decision." }
      - { text: "What card would my opponent have gotten if I had {{t:fold|folded}}?", why: "A future card doesn't change the quality of the decision. Only what you knew at the time counts." }
      - { text: "How much did I lose in this hand?", why: "The size of the loss tells you about the {{t:pot}}, not about the decision. A big loss can come from a good decision, and a small one from a mistake." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "A friend asks you about the same play in two hands: they won one and lost the other. It seems to you that they played better the first time. What's happening?"
    options:
      - { text: "This is outcome bias: you're judging the decision by how it ended", correct: true, why: "In psychological studies, people rated the same decision higher when the outcome was good, even if they believed the outcome shouldn't matter. Judging before you know the result helps." }
      - { text: "The first decision was better because it worked", why: "If the play is the same, the decision is the same. Only the result differs, and that's luck." }
      - { text: "The second decision was better because it teaches humility", why: "The rating doesn't depend on the result in either direction. The same decision has the same quality." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "For three {{t:session|sessions}} you played more aggressively than usual and won. Is that proof that the new style is better?"
    options:
      - { text: "No, three {{t:session|sessions}} are too few; you judge the new plays in a hand review", correct: true, why: "Even a huge skill gap (the top {{n:skill.pct}} versus the bottom {{n:skill.pct}}) only takes the lead in about {{n:skill.ahead}} of cases after about {{n:skill.hands}} hands. The difference between your two styles is much smaller." }
      - { text: "Yes, the result shows what works", why: "Results from a few {{t:session|sessions}} are mostly noise. With a {{t:standard-deviation}} of about {{n:var.sd}}, even {{n:var.hands.k}} thousand hands leave an error of about ± {{n:var.ci.wr}}." }
      - { text: "Yes, if you won more than usual", why: "A bigger win from a small sample is still a small sample. You judge plays by the math and by hand review." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "A study of millions of online hands showed when skill starts to outweigh luck. What exactly was measured?"
    options:
      - { text: "The top {{n:skill.pct}} of players are ahead of the bottom {{n:skill.pct}} in about {{n:skill.ahead}} of cases after about {{n:skill.hands}} hands", correct: true, why: "That's how the study's authors (2015) define it. It compares extreme groups: with smaller skill differences, far more hands are needed." }
      - { text: "After about {{n:skill.hands}} hands, every good player is in profit", why: "The study compares extreme groups of players; it doesn't say when an individual good player will be in profit. That depends on winrate and {{t:standard-deviation}} (see the lesson on {{t:variance}})." }
      - { text: "After about {{n:skill.hands}} hands, luck stops mattering", why: "Luck always matters. The study only says when the edge of the best players over the worst starts winning most comparisons." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "You won a {{t:session}} thanks to two calls without a good price that hit on the river. What do you do after the {{t:session}}?"
    options:
      - { text: "You note these {{t:call|calls}} as mistakes to fix", correct: true, why: "Winning doesn't change the price. If the {{t:call}} required more equity than you had, it was a mistake, even if it paid off." }
      - { text: "Nothing, the {{t:session}} was a win", why: "Mistakes in winning {{t:session|sessions}} are just as costly, only harder to notice. Reviewing only losses misses half of the mistakes." }
      - { text: "You decide you read opponents better than the math says", why: "Two hits are too few to draw conclusions about reading opponents. The simplest explanation is {{t:variance}}." }
---
Poker gives you feedback that often lies. A good decision can lose, and a bad one can win. If you judge your play by results, you're learning from random signals.

## Resulting: judging by the result

Players call this *resulting*: you assume the quality of the result tells you the quality of the decision. Psychologists describe the same phenomenon as **outcome bias**. In a classic psychology study (1988), people rated the same decision as better, and the decision-maker as more competent, when the outcome was favorable. They did this even when they themselves believed they shouldn't take the outcome into account.

## Good decisions lose too

Going all-in with a {{t:pair}} of aces against a {{t:pair}} of kings is the best possible decision, yet it loses about **{{n:res.kk-wins}}** of the time. On the other hand, a {{t:call}} with a {{t:flush-draw}} for the full {{t:pot}} on the turn is bad (you need {{n:eq.bet-pot}}, you have about {{n:odds.flush.turn-river}}), and still it wins roughly one time in five.

```formula
decision quality = EV given the information you had at the moment of the decision
```

## How to review a hand

1. Cover the result. Judge only what you knew at the moment of the decision.
2. Calculate the price and your equity against your opponent's {{t:range}} (M2, M6).
3. Check whether the play matches the rules from the course.
4. Review winning hands too: mistakes that paid off are just as costly.

## When results start to mean something

In a study of about {{n:skill.sample.m}} million online hands (a 2015 study), skill only started to outweigh luck after about **{{n:skill.hands}}** hands. This means the top {{n:skill.pct}} of players were ahead of the bottom {{n:skill.pct}} in about {{n:skill.ahead}} of comparisons. For smaller skill differences, many times more hands are needed. So the results of a few {{t:session|sessions}} don't tell you which playing style is better.

:::note Grading in this app
That's why the app grades your decisions, not the result of the hand. When the result and the decision disagree, trust the math.
:::
