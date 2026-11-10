---
id: m5.l3
module: m5
order: 3
title: "How often and how much"
sub: "C-bet in position"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}} and {{t:check|checks}} on the flop. Which plan fits this flop?"
    position: BTN
    options:
      check: "{{t:check|Check}} more often, c-bet less often than usual"
      small: "C-bet often and small: {{n:cbet.size.small}} of the {{t:pot}} ({{n:cbet.btn.small}})"
      big: "C-bet often and big: {{n:cbet.size.big}} of the {{t:pot}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Too cautious: on a {{t:dry}}, high flop you have the {{t:range-advantage}}, and your opponent usually missed. By {{t:check|checking}}, you give them a free card."
          small: "Yes: a {{t:dry}}, high flop favors you. A small {{t:bet}} is enough to make your opponent {{t:fold}} weak hands, and worse {{t:pair|pairs}} will still {{t:call}} it."
          big: "Right action, wrong size: on a {{t:dry}} flop your opponent has few {{t:draw|draws}}, and hands that missed will {{t:fold}} to a small {{t:bet}} too. A bigger {{t:bet}} gets roughly the same hands to {{t:fold}}, but risks more. Bet about {{n:cbet.size.small}} of the {{t:pot}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Too cautious: you have the {{t:range-advantage}}, and on a {{t:paired}} flop a {{t:draw}} is hard to come by, so an opponent without a {{t:pair}} can rarely pay even a small {{t:bet}}."
          small: "Yes: on a {{t:paired}} flop you bet often and small. An opponent without a {{t:pair}} rarely has anything to {{t:call}} with, and both players can have {{t:three-of-a-kind}}, so there's no reason to risk more."
          big: "Right action, wrong size: on a {{t:paired}} flop either of you can have {{t:three-of-a-kind}}, so a big {{t:bet}} doesn't pay off, and your opponent's weak hands will {{t:fold}} to a small one too. About {{n:cbet.size.small}} of the {{t:pot}} is enough."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Yes: a low flop with cards close together hits the {{t:big-blind}}'s {{t:range}}: they have {{t:straight|straights}} and {{t:two-pair|two pair}} here, and you don't have a {{t:nuts-advantage}}. You c-bet less often than on high flops: many hands {{t:check}}, and it's mainly strong hands and strong {{t:draw|draws}} that bet."
          small: "Too often: on a low flop with cards close together, you don't have a {{t:nuts-advantage}}. Frequent c-bets, even small ones, give the {{t:big-blind}} the chance to {{t:raise}} after {{t:check|checking}} first (check-raise) with their strongest hands."
          big: "Too often and too expensive: the {{t:big-blind}} has {{t:straight|straights}} and {{t:two-pair|two pair}} in their {{t:range}} here. A frequent big c-bet risks a lot when you yourself usually have only high cards."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}} and {{t:check|checks}}. You have a {{t:pair}} of kings with a jack. What do you do?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} of the {{t:pot}})", correct: true, why: "Yes: {{t:top-pair}} (a {{t:pair}} with the highest card on the {{t:board}}) on a {{t:dry}} flop. A small {{t:bet}} gets a {{t:call}} from sevens, deuces and weaker kings, and your opponent has almost no {{t:draw|draws}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} of the {{t:pot}})", sizeError: true, why: "Right action, wrong size: on a {{t:dry}} flop your opponent has no {{t:draw|draws}}, and hands that missed will {{t:fold}} to a small {{t:bet}} too. A bigger {{t:bet}} gets roughly the same hands to {{t:fold}}, but risks more. Bet about {{n:cbet.size.small}} of the {{t:pot}}." }
      - { text: "{{t:check|Check}}", why: "You lose value: your opponent has many weaker {{t:pair|pairs}} and ace-high hands that would pay a small {{t:bet}}. On a {{t:dry}} flop with {{t:top-pair}}, you bet." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}} and {{t:check|checks}}. You have a set of jacks on a flop with many {{t:draw|draws}}. What do you do?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} of the {{t:pot}})", correct: true, why: "Yes: your opponent has many {{t:flush-draw|flush draws}} and {{t:straight}} draws (e.g. QT, AQ, two hearts). A big {{t:bet}} makes them pay a lot for the next card." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} of the {{t:pot}})", sizeError: true, why: "Right action, wrong size: a small {{t:bet}} gives your opponent's {{t:draw|draws}} a cheap card, and your set can lose to a flush or a {{t:straight}}. With many {{t:draw|draws}}, bet big." }
      - { text: "{{t:check|Check}} so as not to scare off your opponent", why: "With many {{t:draw|draws}}, a free card is a gift to them. With a very strong hand, you build the {{t:pot}} right away." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}} and {{t:check|checks}}. The flop is {{t:paired}}. Which plan fits?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet often and small", correct: true, why: "Yes: you have the {{t:range-advantage}}, and on a {{t:paired}} flop a {{t:draw}} is hard to come by, so an opponent without a {{t:pair}} can rarely pay even a small {{t:bet}}. You also have more high {{t:pair|pairs}}, e.g. AA and KK, which the {{t:big-blind}} usually doesn't have after just {{t:call|calling}}." }
      - { text: "C-bet often and big", sizeError: true, why: "Right action, wrong size: either of you can have {{t:three-of-a-kind}}, so a big {{t:bet}} doesn't pay off, and an opponent without a {{t:pair}} will {{t:fold}} to a small one too. Bet often and small." }
      - { text: "{{t:check|Check}} more often than bet", why: "Too cautious: a {{t:paired}}, high flop favors you, and your opponent usually has nothing here." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "You {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}} and {{t:check|checks}}. The flop is {{t:monotone}}. Which plan fits?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet less often than usual and small", correct: true, why: "Yes: either player may already have a {{t:flush}}, so your {{t:nuts-advantage}} is smaller than on a regular high flop. You bet less often and with a small size, so you don't build a big {{t:pot}} against a flush." }
      - { text: "C-bet often and big so {{t:draw|draws}} pay", why: "On a {{t:monotone}} flop a big {{t:pot}} is dangerous: your opponent may have a made {{t:flush}}, and your hands without a heart hold up poorly." }
      - { text: "Always {{t:check}}", why: "Too cautious: a high flop still favors you, and some hands (e.g. with a high heart) are happy to bet small." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "There is {{n:ex.pot}} in the {{t:pot}}. You bet {{n:cbet.ex.small}} with no hand. What percentage of the time must your opponent {{t:fold}} for this {{t:bet}} to break even? Enter a number."
    answer: alpha.cbet.small
    explanation: "You risk {{n:cbet.ex.small}} to win {{n:ex.pot}}. The threshold is bet ÷ ({{t:pot}} + bet): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Your opponent misses the flop much more often, which is why a small c-bet pays off so often."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "There is {{n:ex.pot}} in the {{t:pot}}. You bet {{n:cbet.ex.big}} with no hand. What percentage of the time must your opponent {{t:fold}} for this {{t:bet}} to break even? Enter a number."
    answer: alpha.cbet.big
    explanation: "You risk {{n:cbet.ex.big}} to win {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. A big {{t:bluff}} has to work much more often than a small one ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Why, on a {{t:dry}} flop, does a c-bet of {{n:cbet.size.small}} of the {{t:pot}} with a hand that has no chance pay off more often than a c-bet of {{n:cbet.size.big}} of the {{t:pot}}?"
    options:
      - { text: "Because a small {{t:bet}} needs a fold only {{n:alpha.cbet.small}} of the time, and a big one {{n:alpha.cbet.big}}", correct: true, why: "Yes: on a {{t:dry}} flop your opponent's weakest hands (no {{t:pair}} and no {{t:draw}}) {{t:fold}} to both sizes, so a small {{t:bet}} achieves the same effect more cheaply." }
      - { text: "Because a small {{t:bet}} always gets a {{t:fold}}", why: "No: your opponent {{t:call|calls}} a small {{t:bet}} with any {{t:pair}}. A small {{t:bet}} simply risks less, so it needs fewer {{t:fold|folds}}." }
      - { text: "Because a big {{t:bet}} is always a mistake", why: "No: on a {{t:wet}} flop and with the {{t:nuts-advantage}}, a big {{t:bet}} is sometimes best. On a {{t:dry}} flop, though, it gives you nothing in return for the greater risk." }
---
A c-bet (continuation {{t:bet}}) is a {{t:bet}} on the flop by the player who made the last {{t:raise}} before the flop. In this lesson you play {{t:in-position}}: you {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}} and {{t:check|checks}} on the flop. The {{t:pot}} on the flop is {{n:bb.pot-after.vs-btn}}. There are two questions: how often to bet and how much.

## {{t:dry|Dry}}, high flop: often and small

On a flop like [[Ks 7d 2c]] you have the {{t:range-advantage}}, and your opponent has almost no {{t:draw|draws}}. You bet often and small, about {{n:cbet.size.small}} of the {{t:pot}}, i.e. about {{n:cbet.btn.small}}. A small {{t:bet}} is enough to make your opponent {{t:fold}} hands that missed, and worse {{t:pair|pairs}} will still {{t:call}} it. A bigger {{t:bet}} gets roughly the same hands to {{t:fold}}, but risks more.

A typical small c-bet is about {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} of the {{t:pot}}, and a big one about {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (training materials); solvers usually use {{n:cbet.size.small}} and {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, and on some flops also an {{t:overbet}}, i.e. a {{t:bet}} larger than the whole {{t:pot}} (published solver results).

## Flop with many {{t:draw|draws}}: less often, but bigger

On a flop like [[Kh Jh 7c]] your opponent has many {{t:flush-draw|flush draws}} and {{t:straight}} draws, but a {{t:straight}} isn't possible yet. Strong hands and strong {{t:draw|draws}} bet a bigger size, e.g. {{n:cbet.size.big}} of the {{t:pot}}, so that {{t:draw|draws}} pay a lot for the next card. Medium hands without a {{t:draw}} {{t:check}} more often. When a {{t:straight}} is already possible, e.g. on [[Jh Th 8c]], your opponent may have it, so solvers bet a smaller size there.

## {{t:paired|Paired}} and {{t:monotone}}

On a {{t:paired}} flop, e.g. [[Qd Qs 6h]], you have the {{t:range-advantage}}, and a {{t:draw}} is hard to come by, so an opponent without a {{t:pair}} can rarely {{t:call}}. You bet often and small: a big {{t:bet}} doesn't pay off, because either of you can have {{t:three-of-a-kind}}. On a {{t:monotone}} flop, e.g. [[Kh 8h 3h]], anyone may already have a {{t:flush}}, so you bet less often than usual and small.

Note: “{{t:wet}}” doesn't mean “big bet”. In the app, a {{t:monotone}} flop is always {{t:wet}}, yet the solver bets on it rarely and with a small size (published solver results). Size grows with {{t:wetness}} only up to a point: on the {{t:wet|wettest}} flops, such as [[Qd 8d 7d]], it drops again. The bigger size from the previous section applies to flops with many {{t:draw|draws}} on which a {{t:straight}} isn't possible yet (in the app, usually medium ones).

## Low with cards close together: you {{t:check}} more often

On [[7s 6h 5d]] the {{t:big-blind}} has {{t:straight|straights}} and {{t:two-pair|two pair}} in their {{t:range}}, and you don't have a {{t:nuts-advantage}} (lesson on advantages). The same goes for other low {{t:connected}} and {{t:semi-connected}} flops. You c-bet less often than on high flops: many hands {{t:check}}, and it's mainly very strong hands and strong {{t:draw|draws}} that bet.

## How often your opponent must {{t:fold}}

A {{t:bet}} with no hand breaks even when your opponent {{t:fold|folds}} bet ÷ ({{t:pot}} + bet) of the time. At {{n:cbet.size.small}} of the {{t:pot}} that's {{n:alpha.cbet.small}}; at {{n:cbet.size.big}} of the {{t:pot}} it's already {{n:alpha.cbet.big}}. An unpaired hand misses the flop about {{n:flop.miss.unpaired}} of the time, which is why a small c-bet pays off so often.

:::note Where these rules come from
The directions ({{t:dry}} flop: small and often; many {{t:draw|draws}} without a made {{t:straight}}: bigger and less often; {{t:straight}} already possible: smaller; {{t:paired}}: small; {{t:monotone}}: less often and small) are general rules from training materials and published solver results, labeled as heuristics. The sizes {{n:cbet.size.small}} and {{n:cbet.size.big}} of the {{t:pot}} are examples from the ranges given above (training materials on bet sizing; published solver results). The app doesn't give how often to bet as percentages, because such numbers come from solver results.
:::
