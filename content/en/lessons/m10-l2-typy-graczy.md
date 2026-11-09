---
id: m10.l2
module: m10
order: 2
title: "Player types"
sub: "Nit, reg, passive player, maniac"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "After {{n:hud.ex.reg.hands}} hands, your opponent has {{t:vpip}} {{n:hud.ex.passive.vpip}} and {{t:pfr}} {{n:hud.ex.passive.pfr}}. What does this say about his play before the flop?"
    options:
      - { text: "He's passive: with most hands he only {{t:call|calls}} or limps", correct: true, why: "The {{t:vpip}} − {{t:pfr}} gap is {{n:hud.ex.passive.gap}} points, above the {{n:hud.gap.passive}} threshold. He plays quite a lot of hands, but puts most of them into the {{t:pot}} without a {{t:raise}}." }
      - { text: "He's aggressive, because he plays a lot of hands", why: "The number of hands ({{t:vpip}}) tells you how loose he plays, not how aggressive. Aggression is shown by {{t:pfr}} and the gap between the two." }
      - { text: "He's a {{t:nit}}", why: "A {{t:nit}} plays up to about {{n:hud.vpip.nit-max}} of hands; this player plays clearly more." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "According to population data from online micro stakes (NL25), {{t:recreational|recreational players}} reach showdown in {{n:mda.rec.wtsd}} of cases and win {{n:mda.rec.wsd}} of showdowns; {{t:regular|regulars}}, {{n:mda.reg.wtsd}} and {{n:mda.reg.wsd}}. What follows from this?"
    options:
      - { text: "{{t:recreational|Recreational players}} pay to the end more often and lose more often: they {{t:call}} with weaker hands", correct: true, why: "They reach showdown more often and win it less often, so they get there with weaker hands. Against them you bet more hands for {{t:value}} and {{t:bluff}} less." }
      - { text: "{{t:recreational|Recreational players}} {{t:bluff}} more often", why: "These numbers are about how often they reach showdown and with what, not about {{t:bluff|bluffs}}. They win fewer showdowns because they {{t:call}} with weaker hands." }
      - { text: "Nothing: a gap of a few points is noise", why: "This is data from the whole population at these {{t:stakes}} over {{n:mda.period.months}} months, not from a few dozen hands of one player. The difference is consistent at NL25, NL50 and NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. You bet the flop and turn, and your opponent {{t:call|called}}. He's a passive {{t:recreational}} ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} hands). He {{t:check|checks}}. What do you do with {{t:top-pair}} and the second-best kicker?"
    options:
      - { text: "Bet for {{t:value}}", correct: true, why: "This kind of player {{t:call|calls}} to the end with weaker kings, eights and pocket {{t:pair|pairs}}. More than half of his {{t:call|calls}} are hands worse than yours, so the bet makes money (the threshold from module 8)." }
      - { text: "{{t:check|Check}} to avoid running into a better hand", why: "Against a player who {{t:call|calls}} with weaker hands, a {{t:check}} gives up value. Better hands will sometimes pay, but there are more {{t:call|calls}} from worse hands." }
      - { text: "Bet the whole {{t:pot}} as a {{t:bluff}}", why: "With {{t:top-pair}} this isn't a {{t:bluff}}: you beat many of the hands that will {{t:call}}. The bet is for {{t:value}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, your {{t:straight-draw}} missed. Your opponent is a passive {{t:recreational}} ({{t:wtsd}} {{n:mda.rec.wtsd}}) who {{t:call|called}} the flop and turn. He {{t:check|checks}}. What do you do?"
    options:
      - { text: "{{t:check|Check}} and give up the {{t:pot}}", correct: true, why: "A {{t:bluff}} makes money only when your opponent {{t:fold|folds}} more often than the {{t:alpha}} of your bet. A player who {{t:call|called}} two {{t:street|streets}} and often reaches showdown rarely {{t:fold|folds}} on the river." }
      - { text: "Bet big, since you have no showdown value", why: "In the baseline (module 8) a {{t:bluff}} like this can be good, but against this player there aren't enough {{t:fold|folds}}: the {{t:bluff}} loses money." }
      - { text: "Bet small to make the {{t:bluff}} cheaper", why: "A smaller bet needs fewer {{t:fold|folds}}, but a hand that {{t:call|called}} two {{t:street|streets}} will usually {{t:call}} a small bet too. Better to give up the {{t:pot}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "You {{t:open}} from the {{t:cutoff|CO}}. A {{t:nit}} is on the Button: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} hands. He 3-bets you. What do you do with AJo?"
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Someone who plays this few hands 3-bets mostly with the strongest ones: AQ, AK and high {{t:pair|pairs}}, which dominate AJ. Against him you {{t:fold}} more often than in the baseline from module 4." }
      - { text: "{{t:call|Call}}, because AJ is a strong hand", why: "AJ is strong against a wide {{t:range}}. Against a 3-bet from a player with {{t:vpip}} {{n:hud.ex.nit.vpip}}, it is often dominated and out of {{t:position}}." }
      - { text: "4-bet", why: "A 4-bet with AJ against a {{t:nit}} plays against a {{t:range}} that dominates it and rarely {{t:fold|folds}}. It's neither {{t:value}} nor a good {{t:bluff}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "You're on the Button and everyone has {{t:fold|folded}}. A {{t:nit}} is in the {{t:big-blind}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} after {{n:hud.ex.reg.hands}} hands). How do you adjust your {{t:open|opening}}?"
    options:
      - { text: "{{t:open|Open}} wider than in the baseline", correct: true, why: "A {{t:nit}} defends his blind narrowly, so your {{t:open}} wins immediately more often, even with a weak hand." }
      - { text: "{{t:open|Open}} tighter, because the {{t:nit}} has strong hands", why: "A {{t:nit}} has strong hands when he plays. In the {{t:big-blind}} he usually {{t:fold|folds}}, and that's your profit." }
      - { text: "No change: player type doesn't affect blind stealing", why: "It does. Profit from stealing depends on how often the blind {{t:fold|folds}}, and a {{t:nit}} {{t:fold|folds}} often." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "Your opponent is a {{t:maniac}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} after {{n:hud.ex.reg.hands}} hands. He bet every {{t:street}}, and on the river he {{t:bet|bets}} the whole {{t:pot}}. What do you do with {{t:top-pair}} and a weak kicker?"
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Against a player who {{t:bluff|bluffs}} more than in the baseline, borderline {{t:call|calling}} hands make money. Top {{t:pair}} beats his {{t:bluff|bluffs}} and part of his value." }
      - { text: "{{t:fold|Fold}}, because a bet of the whole {{t:pot}} means a strong hand", why: "From a player who plays almost every hand with a {{t:raise}} and bets every {{t:street}}, a big bet contains a lot of {{t:bluff|bluffs}}. By {{t:fold|folding}}, you pay him for being aggressive." }
      - { text: "{{t:raise|Raise}} all-in", why: "A {{t:raise}} makes {{t:bluff|bluffs}} {{t:fold}} and better hands {{t:call}}. With a hand that catches {{t:bluff|bluffs}}, a {{t:call}} is enough." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "You're playing against a {{t:maniac}}. On the turn you have a weak hand with no chance to improve, and he {{t:check|checks}}. What do you do?"
    options:
      - { text: "{{t:check|Check}}: {{t:bluff|bluffing}} a {{t:maniac}} rarely works", correct: true, why: "A {{t:maniac}} rarely {{t:fold|folds}} and often {{t:raise|raises}}. You make money against him by {{t:call|calling}} with stronger hands, not by {{t:bluff|bluffing}}." }
      - { text: "Bet, because a {{t:maniac}}'s {{t:check}} means weakness", why: "It might, but a {{t:maniac}} often {{t:raise|raises}} with any hand. A {{t:bluff}} needs {{t:fold|folds}}, and he gives few of them." }
      - { text: "Bet all-in so he can't {{t:raise}}", why: "You risk your whole stack to win a small {{t:pot}} against a player who rarely {{t:fold|folds}}. It's the most expensive way to {{t:bluff}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
The stats from the previous lesson add up to a few typical pictures. A player type tells you which way a player departs from the baseline: he plays too few hands, too many hands, {{t:call|calls}} too often or {{t:raise|raises}} too often.

## Two numbers, four types

You read the type from {{t:vpip}} and the {{t:vpip}} − {{t:pfr}} gap (6-max, at least about {{n:hud.hands.vpip.low}} hands):

| Type | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Leak vs. baseline |
|---|---|---|---|
| {{t:nit|Nit}} | up to about {{n:hud.vpip.nit-max}} | small | plays too few hands |
| {{t:regular|Regular}} ({{t:tag}}, {{t:lag}}) | about {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | small | close to the baseline |
| passive {{t:recreational}} | from about {{n:hud.vpip.loose}} | over {{n:hud.gap.passive}} points | too many hands, {{t:call|calls}} too often |
| {{t:maniac}} | from about {{n:hud.vpip.loose}} | up to about {{n:hud.gap.aggressive}} points | too many hands, {{t:raise|raises}} too often |

A passive player with a large gap is also called a {{t:calling-station}}. Between the types there are transition zones (e.g. a {{t:vpip}} in the teens, or a loose player with a gap of a few points): there you don't assign a type, you look at further stats instead.

## What the population data says

A public stats database gives the average stats of players at one large online site, NL25 6-max, from all hands over the last {{n:mda.period.months}} months. In it, {{t:regular|regulars}} are players with {{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} and a win rate above {{n:mda.reg.def.wr}}, and {{t:recreational|recreational players}} are those with {{t:vpip}} over {{n:mda.rec.def}} and a win rate below {{n:mda.rec.def.wr}}:

| Stat | {{t:regular|Regulars}} | {{t:recreational|Recreational players}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Showdowns won | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Win rate | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

{{t:recreational|Recreational players}} have a {{t:vpip}} − {{t:pfr}} gap of {{n:mda.rec.gap.pp}} points, so they are passive. They reach showdown more often and win it less often: they {{t:call}} with weaker hands. They also rarely {{t:fold}} to a 3-bet. At NL50 and NL100 the numbers are almost the same.

## The passive {{t:recreational}}

The baseline from module 8 doesn't change: you bet for {{t:value}} when more than half of the hands that will {{t:call}} are worse, and a {{t:bluff}} makes money when your opponent {{t:fold|folds}} more often than {{t:alpha}}. What changes is the opponent: he {{t:call|calls}} with more weak hands. So:

- you bet more hands for {{t:value}}, including thinner ones, e.g. {{t:top-pair}} with a weaker kicker on three {{t:street|streets}};
- you {{t:bluff}} less often, especially on the river: the {{t:fold|folds}} a {{t:bluff}} would need to make money aren't there.

## {{t:nit|Nit}} and {{t:maniac}}

**The {{t:nit}}** plays only strong hands. When he {{t:raise|raises}} or 3-bets, the hands at the bottom of your {{t:call|calling}} {{t:range}} are more often dominated, so you {{t:fold}} them more often than in the baseline from module 4. When he's in the blind, you steal more often, because he rarely defends.

**The {{t:maniac}}** plays a lot of hands and {{t:raise|raises}} almost all of them. His bets contain more {{t:bluff|bluffs}} than in the baseline, so you {{t:call}} with borderline {{t:call|calling}} hands, let him bet when you have very strong hands, and don't {{t:bluff}} yourself: he rarely {{t:fold|folds}}.

:::note Where these thresholds come from
The type thresholds are coaching conventions (two training materials, 6-max online cash): we take their overlap or a range that covers both sources. The population data comes from a public stats database (one large online site, NL25–NL100, all hands from the {{n:mda.period.months}} months before October 2026; the site doesn't give hand counts). Reading a {{t:nit}} or a {{t:maniac}} relies on the stats of a specific opponent, not on data about the whole population, so it requires a sample.
:::
