---
id: m8.l1
module: m8
order: 1
title: "River value bet"
sub: "Bet when worse hands pay"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: all the cards are already on the {{t:board}}. Why bet at all?"
    options:
      - { text: "So that worse hands pay or better hands {{t:fold}}", correct: true, why: "On the river there are no more cards to come, so a bet has only two goals: value (worse hands pay) or a {{t:bluff}} (better hands {{t:fold}}). A bet that does neither only costs you." }
      - { text: "To take away the opponent's chance to draw", why: "That's a reason to bet on the flop and turn. On the river the opponent won't draw anything: their hand is final." }
      - { text: "To find out whether my hand is best", why: "A bet is not a question. When you bet a medium hand, worse hands usually {{t:fold}} and better ones pay, so you “find out” with your own money. You can find out for free by {{t:check|checking}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, your opponent {{t:check|checks}}. You estimate they'll call your bet in {{n:value.ex.calls}} cases: {{n:value.ex.many}} times with a worse hand, {{n:value.ex.few}} times with a better one. They can't {{t:raise}} you. Do you bet?"
    options:
      - { text: "Yes, it's a {{t:value}} bet", correct: true, why: "You win the bet {{n:value.ex.many}} times and lose it {{n:value.ex.few}} times: that's {{n:value.ex.net}} bets net. More than {{n:value.threshold}} of the {{t:call|calls}} are worse hands, so betting earns more than a {{t:check}}." }
      - { text: "No, because they'll sometimes call with a better hand", why: "A better hand will always call some of the time. What matters is whether there are more worse {{t:call|calls}} than better ones: here it's {{n:value.ex.many}} to {{n:value.ex.few}}." }
      - { text: "Only if the opponent never has a better hand", why: "Then you'd bet only the nuts and give up a lot of value. It's enough that more than {{n:value.threshold}} of the {{t:call|calls}} are worse hands." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, your opponent {{t:check|checks}}. They'll call your bet in {{n:value.ex.calls}} cases: {{n:value.ex.few}} times with a worse hand, {{n:value.ex.many}} times with a better one. The opponent's worse hands that {{t:fold}} would lose to you at showdown anyway. What do you do?"
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "The bet would win {{n:value.ex.few}} times and lose {{n:value.ex.many}} times: you lose {{n:value.ex.net}} bets net. By {{t:check|checking}}, you win the {{t:pot}} against the same worse hands, just without paying off the better ones." }
      - { text: "Bet, because I have a decent hand", why: "Hand strength alone isn't enough. What matters is who pays: here most {{t:call|calls}} are better hands, so the bet loses." }
      - { text: "Bet big so better hands {{t:fold}}", why: "That would be a {{t:bluff}} with a hand that often wins at showdown. Better hands rarely {{t:fold}} on the river, and after {{t:check|checking}} you'll beat the worse ones anyway." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. {{n:value.ex.many}} worse hands and {{n:value.ex.few}} better ones will {{t:call}} your bet. How many bets do you win net on these {{n:value.ex.calls}} {{t:call|calls}}? Enter a number."
    answer: value.ex.net
    explanation: "Each {{t:call}} with a worse hand is one bet won, each with a better hand is one bet lost: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. You'd also win the {{t:pot}} against worse hands after {{t:check|checking}}, so you count only the bets."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}}. You bet the flop and turn and got a {{t:call}} each time. River, the {{t:big-blind}} {{t:check|checks}}. What do you do?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Bet for {{t:value}}", correct: true, why: "{{t:top-pair|Top pair}} with the best kicker. An opponent who {{t:call|called}} two {{t:street|streets}} has plenty of weaker kings (KQ, KJ, KT) and nines, and there were few {{t:draw|draws}} on this {{t:board}}. Worse hands will pay much more often than better ones ({{t:two-pair}}, sets). Usually {{t:top-pair}} can take two {{t:value|streets of value}} (M9); here a third, because the opponent pays with weaker kings." }
      - { text: "{{t:check|Check}}, because the opponent could have a set", why: "They could, but rarely. By {{t:check|checking}}, you lose a bet from all the weaker kings they would pay with. You count who will {{t:call}}, not whether a better hand exists." }
      - { text: "{{t:check|Check}} so the opponent bluffs", why: "An opponent who {{t:call|called}} twice has mostly {{t:pair|pairs}} and rarely {{t:bluff|bluffs}} after your {{t:check}}. You'll earn more reliably by betting into their weaker kings." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}}. You c-bet the flop and got a {{t:call}}, then you both {{t:check|checked}} the turn. River, the {{t:big-blind}} {{t:check|checks}}. What do you do?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "{{t:second-pair|Second pair}} with a weak kicker beats missed {{t:draw|draws}} and weaker {{t:pair|pairs}}, but those hands will {{t:fold}} to a bet. Mostly kings and better tens will pay. You {{t:check}} and see the showdown for free." }
      - { text: "Bet for {{t:value}}", why: "Who will pay? Hands without a {{t:pair}} will {{t:fold}}, and kings and better tens will {{t:call}}. Most {{t:call|calls}} would be better than your hand." }
      - { text: "Bet big as a {{t:bluff}}", why: "Your hand often wins at showdown. By {{t:bluff|bluffing}}, you give up that win: worse hands would {{t:fold}} anyway, and kings rarely {{t:fold}}." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}}. You c-bet the flop and got a {{t:call}}, then you both {{t:check|checked}} the turn. River, the {{t:big-blind}} {{t:check|checks}}. You have {{t:top-pair}} with a ten kicker. Which hands will pay a small bet and be worse than yours?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Eights, fours, and queens with a weaker kicker", correct: true, why: "These hands called the flop and have a {{t:pair}}, so they'll often pay a small bet. You lose to a queen with a better kicker, {{t:two-pair}}, sets, and {{t:straight|straights}} (A5, 65), but there are more worse {{t:call|calls}}." }
      - { text: "Hands without a {{t:pair}}", why: "A hand without a {{t:pair}} rarely pays a river bet; ace-high sometimes pays, but there are many more worse {{t:pair|pairs}} here." }
      - { text: "None, only better hands pay", why: "Too cautious: the {{t:big-blind}} defends many {{t:pair|pairs}} lower than a queen. After the {{t:check}} on the turn, their {{t:range}} contains plenty of them." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Same situation: you have {{t:top-pair}} with a ten kicker, the {{t:big-blind}} checks on the river. The {{t:pot}} is {{n:ex.pot}}. What do you do?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Bet {{n:ex.bet.quarter}}, i.e. 1/4 {{t:pot}}", correct: true, why: "Thin value: you beat just over half of the hands that will pay. Eights, fours, and weaker queens will {{t:call}} a small bet, so there are still more worse {{t:call|calls}} than better ones." }
      - { text: "Bet {{n:ex.bet.pot}}, i.e. the full {{t:pot}}", sizeError: true, why: "Right action, wrong size: eights and fours will {{t:fold}} to a {{t:pot}}-sized bet, and mostly better queens, {{t:two-pair}}, and sets will pay. Then most {{t:call|calls}} are better than you. Bet thin value small." }
      - { text: "{{t:check|Check}}", why: "You lose value: the opponent has many lower {{t:pair|pairs}} that will pay a small bet. {{t:check|Checking}} gives that money away." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "A friend says: “On the river with a medium {{t:pair}}, I bet to see where I'm at.” What's wrong with this idea?"
    options:
      - { text: "Worse hands will {{t:fold}}, and better ones will pay", correct: true, why: "After a bet like that, the hands you beat {{t:fold}}, and the ones you lose to pay or {{t:raise}}. You get the information for free by {{t:check|checking}}, because with {{t:position}} the opponent will show their cards at showdown." }
      - { text: "Nothing, it's a good way to get information", why: "Here the information costs a bet you usually lose. After {{t:check|checking}}, you'll see the opponent's hand without paying extra." }
      - { text: "The bet should be bigger", why: "A bigger bet makes it worse: even more worse hands will {{t:fold}}, and better ones will still pay." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Your {{t:flush-draw}} missed. On the river you're considering a bet. What kind of bet would it be?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "A {{t:bluff}}", correct: true, why: "You have only queen-high. No hand that {{t:call|calls}} you will be worse, so the bet can win only if the opponent {{t:fold|folds}}. That's a {{t:bluff}} (choosing {{t:bluff|bluffs}} is covered in later lessons)." }
      - { text: "A {{t:value}} bet", why: "A {{t:value}} bet requires worse hands to pay. With just queen-high, almost nothing worse will {{t:call}} you." }
      - { text: "Thin value", why: "Thin value is a bet with a hand that beats just over half of the {{t:call|calls}}. Your hand beats almost no {{t:call|calls}}." }
---
On the river all the cards are already on the {{t:board}}. Nobody will draw anything, so a bet can do only two things: make a worse hand pay (**value**) or make a better hand {{t:fold}} (**{{t:bluff}}**). This lesson covers value; the next ones cover {{t:bluff|bluffs}} and calling.

## The threshold: more than half of the {{t:call|calls}}

When you bet {{t:position|in position}} and the opponent can only {{t:call}} or {{t:fold}}, you count only the hands they'll pay with:

```formula
value bet: worse calls > better calls
```

Each {{t:call}} with a worse hand wins one bet. Each {{t:call}} with a better hand loses one bet. When the opponent {{t:fold|folds}} a worse hand, you win the same {{t:pot}} as after a {{t:check}}. That's why a bet makes money when more than **{{n:value.threshold}}** of the hands that pay are worse than yours.

Example: out of {{n:value.ex.calls}} {{t:call|calls}}, {{n:value.ex.many}} are worse hands and {{n:value.ex.few}} are better. Net, you win {{n:value.ex.net}} bets. If the ratio were reversed, you'd lose the same amount.

## Who will pay

You don't ask “do I have a good hand” but “what will the opponent pay with”. Going through their {{t:range}} helps:

- hands without a {{t:pair}} rarely pay; sometimes ace-high pays, which beats {{t:bluff|bluffs}},
- lower {{t:pair|pairs}} and weaker kickers often pay a small bet,
- better hands will always pay, and sometimes {{t:raise}}.

When the opponent can {{t:raise}} you and you'd then have to {{t:fold}}, the threshold is even higher: the bet makes money only when worse {{t:call|calls}} clearly outnumber better ones.

## Thin value: small, but paid

Thin value is a bet with a hand that beats just over half of the {{t:call|calls}}, e.g. {{t:top-pair}} with a medium kicker. You make this bet **smaller** than with a strong hand, usually about 1/4–1/2 {{t:pot}}: weaker {{t:pair|pairs}} will also pay a small bet, but they'll {{t:fold}} to a big one, leaving only better hands.

This is a simplification: with no check-raise risk, a solver bets thin value as small as about 1/4 {{t:pot}}, and with that risk, {{t:position|in position}} it rarely goes below 1/2 {{t:pot}}.

## A medium hand {{t:check|checks}}

You have a medium hand {{t:in-position}}, e.g. {{t:second-pair}}. The opponent's worse hands will {{t:fold}} to a bet, and better ones will pay. A bet then turns your hand into a {{t:bluff}}. You {{t:check}}: you'll win the showdown against worse hands without paying off better ones.

:::note Where these rules come from
The more-than-half-of-the-{{t:call|calls}} threshold is pure math (a bet {{t:in-position}}, no {{t:raise}}, and no rake). The thin value sizing and {{t:check|checking}} a medium hand come from published solver analyses ({{t:tournament|tournaments}} with shorter stacks) and from training materials.
:::
