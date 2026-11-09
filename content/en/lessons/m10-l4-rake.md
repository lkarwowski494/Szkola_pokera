---
id: m10.l4
module: m10
order: 4
title: "Rake"
sub: "What playing costs and how it changes your decisions"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "You play NL10 6-max on one of the large online sites. How big is the {{t:rake}} compared with the win rate of a typical winning player at low {{t:stakes}}?"
    options:
      - { text: "Several times bigger: about {{n:rake.micro.low}}–{{n:rake.micro.high}} versus {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Converting the sites' rake schedules to bb/100 gives about {{n:rake.micro.low}}–{{n:rake.micro.high}} at the micro stakes. A winning player has to beat their opponents by more than the {{t:rake}}, and only the surplus is their win rate." }
      - { text: "About the same", why: "{{t:rake|Rake}} at the micro stakes is about {{n:rake.micro.low}}–{{n:rake.micro.high}}, and a typical win rate is {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. The difference is several-fold." }
      - { text: "Negligible, because the site takes only a few percent of the {{t:pot}}", why: "A few percent of every postflop {{t:pot}} adds up to about {{n:rake.micro.low}}–{{n:rake.micro.high}}. That is more than a typical winning player wins." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "In a population report on 6-max cash games, every NL100 player loses an average of {{n:rake.pop.nl100.loss}}. Where does this loss come from?"
    options:
      - { text: "It is the {{t:rake}}: without it, players would break even as a group", correct: true, why: "Players play against each other, so what one wins, another loses. On average, everyone loses only what the site takes. The author: 'your biggest villain is the house'." }
      - { text: "Most players play badly", why: "Bad play moves money from weaker players to better ones, but it doesn't change the average. Only the {{t:rake}} lowers the average." }
      - { text: "{{t:variance|Variance}}: with a bigger sample, it will come out to zero", why: "{{t:variance|Variance}}, the spread of results around the {{t:expected-value|expected value}}, affects individual players' results in both directions. The average of the whole population is negative because everyone pays {{t:rake}}." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "According to an estimate by the author of the same data (with a Bayesian correction), among players with at least {{n:rake.pop.reg.hands}} hands, about {{n:rake.pop.reg.prerake}} win before {{t:rake}} is deducted. How many win after it is deducted?"
    options:
      - { text: "About {{n:rake.pop.reg.postrake}}", correct: true, why: "{{t:rake|Rake}} takes away almost half of the winners: about {{n:rake.pop.reg.prerake}} before rake, about {{n:rake.pop.reg.postrake}} after it. That's why you always calculate win rate after rake." }
      - { text: "Almost as many, about {{n:rake.pop.reg.prerake}}", why: "If the {{t:rake}} were small, that would be true. With rake of several bb/100, many players who win before rake drop below zero." }
      - { text: "Almost nobody", why: "An exaggeration: about {{n:rake.pop.reg.postrake}} of this group still win. {{t:rake|Rake}} is a big obstacle, but it doesn't close the road to winning." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Why is the {{t:rake}} in bb/100 at NL500 several times smaller ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) than at the micro stakes?"
    options:
      - { text: "Because larger {{t:pot|pots}} reach the {{t:rake-cap}} more often, and the cap is small in bb there", correct: true, why: "The site takes a percentage of the {{t:pot}}, but no more than a cap in dollars. At the micro stakes, the cap is many bb and {{t:pot|pots}} rarely reach it, so you pay the full percentage. At NL500, the same cap is a fraction of a bb." }
      - { text: "Because at NL500 the site takes a smaller percentage", why: "The percentage is often similar (about {{n:rake.ex.pct}}). The difference comes from the {{t:rake-cap}}, which at high {{t:stakes}} cuts the fee on large {{t:pot|pots}}." }
      - { text: "Because fewer hands per hour are played at NL500", why: "bb/100 measures {{t:rake}} per 100 hands, so the pace of play doesn't change it. What changes it is the {{t:rake-cap}} expressed in bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} {{n:ex.bet.half}}. The site takes {{n:rake.ex.pct}} of the {{t:pot}}, with no {{t:rake-cap}} within reach. How much equity do you need to {{t:call}}? Enter a percentage."
    answer: eq.bet-half.rake
    explanation: "After you {{t:call}}, the {{t:pot}} is {{n:ex.half.total}}, and {{n:rake.ex.pot-after}} remains after rake. You put in {{n:ex.bet.half}}, so you need {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} instead of {{n:eq.bet-half}} without rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Without {{t:rake}}, a {{t:call}} against a half-{{t:pot}} bet needs {{n:eq.bet-half}} equity. How much does it need with {{n:rake.ex.pct}} {{t:rake}}?"
    options:
      - { text: "A bit more: about {{n:eq.bet-half.rake}}", correct: true, why: "You win the {{t:pot}} minus the {{t:rake}}, but you pay the full amount. A hand just above the threshold without rake may already be below it with rake." }
      - { text: "The same, because both players pay {{t:rake}}", why: "{{t:rake|Rake}} is subtracted from the {{t:pot}} you win, not from the amount you call. The threshold rises to about {{n:eq.bet-half.rake}}." }
      - { text: "Less, because the {{t:pot}} is bigger", why: "The {{t:pot}} after rake is smaller, not bigger, so you need more equity: about {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "You play on a site that takes {{t:rake}} only from {{t:pot|pots}} that reach the flop. Someone before you {{t:open|opens}}, and you are in {{t:position}} with a hand that would be a borderline {{t:call}} without rake. What does the {{t:rake}} change?"
    options:
      - { text: "{{t:call|Call}} less often: with borderline {{t:call|calling}} hands, {{t:fold}} or 3-bet more often", correct: true, why: "In published solver solutions with rake, players in {{t:position}} facing an {{t:open}} play about {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} fewer hands. It is the {{t:call}} itself that loses, because a postflop {{t:pot}} pays {{t:rake}}, while a {{t:pot}} won with a 3-bet before the flop doesn't." }
      - { text: "Nothing: {{t:rake}} only applies to postflop play", why: "That's exactly why it changes the preflop decision: a {{t:call}} leads to the flop and to rake, while a 3-bet or a {{t:fold}} often ends the hand without it." }
      - { text: "{{t:call|Call}} more often, because postflop {{t:pot|pots}} are big", why: "The opposite: {{t:rake}} takes a share of exactly those {{t:pot|pots}}. The solver with rake {{t:call|calls}} noticeably less often." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "In the same solver solutions, the {{t:big-blind|big blind}} {{t:call|calls}} a min-raise in a raked game in only about {{n:rake.solver.bb-minraise}} of the cases in which it {{t:call|calls}} without rake. What does this mean for you in the {{t:big-blind|big blind}}?"
    options:
      - { text: "Still defend many hands, but tighter than in charts calculated without rake", correct: true, why: "The {{t:big-blind|big blind}} still defends often, because it already has {{t:chips}} in the {{t:pot}} and closes the action. But {{t:rake}} cuts off the weakest {{t:call|calls}}, so no-rake charts are too wide for you." }
      - { text: "Stop defending the {{t:big-blind|big blind}} by {{t:call|calling}}", why: "No: according to the author, {{t:call|calling}} from the blinds remains an important part of strategy with rake too. What changes is how wide you defend, not whether you defend." }
      - { text: "Defend just as wide, because {{t:rake}} doesn't matter from the {{t:big-blind|big blind}}", why: "It does: after a {{t:call}}, the {{t:pot}} reaches the flop and pays {{t:rake}}. That's why the solver {{t:call|calls}} less often from the {{t:big-blind|big blind}}." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "On some sites, {{t:rake}} is also taken from 3-bet {{t:pot|pots}} that end before the flop. What does this change about the argument 'a 3-bet pays no rake'?"
    options:
      - { text: "On such a site, the argument weakens: the 3-bet pays too, so the advantage of a 3-bet over a {{t:call}} is smaller", correct: true, why: "The solver result applies to a 'no flop, no drop' structure, in which a {{t:pot}} without a flop is rake-free. On such a site, that rule covers only {{t:pot|pots}} without a 3-bet, so a {{t:call}} still loses to rake, but a 3-bet isn't free of it." }
      - { text: "Nothing, because the {{t:rake}} on a 3-bet is negligible", why: "We can't know that without doing the math for a specific site. The only certainty is that the 3-bet is no longer rake-free." }
      - { text: "On such a site, always {{t:call}} instead of 3-betting", why: "A {{t:call}} leads to the flop and pays {{t:rake}} just as before. The only change is that the 3-bet pays too." }
---
{{t:rake|Rake}} is the fee the site takes from the {{t:pot}}. Players play against each other, so without {{t:rake}}, they would break even as a group. With rake, the average player loses exactly what the site takes, and a winning player has to beat their opponents by more than the {{t:rake}}.

## What it costs

The site takes a percentage of the {{t:pot}}, but no more than a {{t:rake-cap}} in dollars. On the two largest online sites at NL2–NL10, it is {{n:rake.ex.pct}} of the {{t:pot}}. At the micro stakes, {{t:pot|pots}} rarely reach the cap, so you pay the full percentage.

A comparison of site rake schedules converts them to bb/100 using the distribution of {{t:pot|pots}} from several million hands:

| {{t:stakes|Stakes}} (6-max, two largest online sites) | {{t:rake|Rake}} |
|---|---|
| NL2–NL25 | about {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | about {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

A typical winning player at low {{t:stakes}} has a win rate of {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (module 12): several times less than they pay the site. At higher {{t:stakes}}, the same dollar cap is a fraction of a bb, so {{t:rake}} in bb/100 falls.

Population data say the same. In a population report (6-max cash, NL10–NL500), every player loses an average of {{n:rake.pop.nl10.loss}} at NL10, {{n:rake.pop.nl100.loss}} at NL100, and {{n:rake.pop.nl500.loss}} at NL500. Among NL100 players with at least {{n:rake.pop.reg.hands}} hands, according to the author's estimate (Bayesian correction), about {{n:rake.pop.reg.prerake}} win before rake is deducted, and about {{n:rake.pop.reg.postrake}} after it is deducted ({{n:rake.pop.reg.prerake.raw}} and {{n:rake.pop.reg.postrake.raw}} in the raw data).

## The {{t:call}} threshold with rake

You win the {{t:pot}} minus the {{t:rake}}, but you pay the full amount. The required equity from module 2 goes up:

```formula
required equity = amount to call ÷ ({{t:pot}} after the {{t:call}} × (1 − {{t:rake}}))
```

A {{n:ex.bet.half}} bet into a {{n:ex.pot}} {{t:pot}}: without rake you need {{n:eq.bet-half}}, with {{n:rake.ex.pct}} rake you need {{n:eq.bet-half.rake}}. The difference is small in a single hand, but it applies to every postflop {{t:pot}}.

## What {{t:rake}} changes before the flop

On many sites, {{t:rake}} is taken only from {{t:pot|pots}} that reach the flop ("no flop, no drop"). Then a {{t:pot}} won before the flop is free of it, while a {{t:pot}} after a {{t:call}} pays. In published NL100 solver solutions with rake:

- players in {{t:position}} facing an {{t:open}} play about {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} fewer hands; it is mainly the {{t:call}} that loses, and there are slightly more 3-bets;
- the {{t:big-blind|big blind}} {{t:call|calls}} a min-raise in only about {{n:rake.solver.bb-minraise}} of the cases it does without rake, although blind defense is still based on {{t:call|calling}}.

For the same reason, in module 3 you {{t:raise}} or {{t:fold}} from the {{t:small-blind|small blind}}, without completing to the {{t:big-blind|big blind}}. Some sites also take {{t:rake}} from 3-bet {{t:pot|pots}} that end before the flop; there, a 3-bet is not free of it.

:::note Sources
Rake levels: a 2026 comparison of online site rake (schedules of the two largest sites converted to bb/100, accessed October 5, 2026); other sites have different numbers. Population loss: an independent population report (6-max NLHE cash, sites with hand-tracking databases, players with at least 100 hands; the author does not name the sites or the period). Effect of rake on preflop play: a published article on preflop raise sizes, solver solutions for {{n:rake.solver.depth}} stacks; the author writes that the conclusions largely carry over to other formats, so for a {{n:format.stack}} stack this is a simplification. The equity threshold is a calculation.
:::
