---
id: m5.l4
module: m5
order: 4
title: "Out of position and against several opponents"
sub: "When to check more often"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}}, the Button {{t:call|called}}, and the blinds {{t:fold|folded}}. The flop is middle and {{t:connected}}. You act first. Which plan fits?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Check}} more often than {{t:in-position}}", correct: true, why: "Yes: the Button {{t:call|called}} with {{t:position}}, so they have a strong {{t:range}}, and a middle, {{t:connected}} flop hits their {{t:pair|pairs}} and {{t:connectors}} well. {{t:out-of-position|Out of position}}, you {{t:check}} here very often, even with strong hands." }
      - { text: "C-bet often and small, like on the Button", why: "That's the plan {{t:in-position}} on a {{t:dry}}, high flop. Here you don't have {{t:position}}, and the flop doesn't favor your {{t:range}}." }
      - { text: "C-bet with every hand so you don't lose the {{t:initiative}}", why: "{{t:initiative|Initiative}} doesn't win on its own: the Button's {{t:range}} is strong here, and after every {{t:bet}} you also act first on the turn and river." }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Why do you c-bet less often {{t:out-of-position}} than {{t:in-position}}?"
    options:
      - { text: "Because an opponent {{t:in-position}} sees your action on every {{t:street}}, and their {{t:range}} after a {{t:call}} is strong", correct: true, why: "Yes: a player who {{t:call|calls}} with {{t:position}} {{t:fold|folded}} their weak hands and often {{t:raise|raised}} their strongest. They are left with medium and good hands, and they also act last." }
      - { text: "Because a c-bet {{t:out-of-position}} isn't allowed", why: "No: the rules let you bet from any seat. The point is that a c-bet {{t:out-of-position}} pays off less often." }
      - { text: "Because {{t:out-of-position}} you always have the weaker hand", why: "No: your hand doesn't depend on {{t:position}}. What changes is how easily you realize its equity." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}}, the Button {{t:call|called}}, and the blinds {{t:fold|folded}}. You have {{t:top-pair}} with the best kicker on a {{t:dry}} flop. You act first. What do you do?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|Check}} (to {{t:call}} the Button's {{t:bet}})", correct: true, why: "Yes: the Button {{t:call|called}} with {{t:position}}, so their {{t:range}} is strong, and on this flop the solver {{t:out-of-position}} {{t:check|checks}} almost its entire {{t:range}}, including {{t:top-pair}} with the best kicker. After {{t:check|checking}}, you {{t:call}} the Button's {{t:bet}}." }
      - { text: "C-bet {{n:cbet.size.small}} {{t:pot}}", why: "Too often: in this spot the solver bets less than {{n:cbet.oop.a94.bet}} of the time. Play {{t:top-pair}} with the best kicker by {{t:check|checking}} and {{t:call|calling}}." }
      - { text: "C-bet {{n:cbet.size.big}} {{t:pot}}", why: "Too often: in this spot the solver bets less than {{n:cbet.oop.a94.bet}} of the time. Play {{t:top-pair}} with the best kicker by {{t:check|checking}} and {{t:call|calling}}." }
      - { text: "{{t:fold|Fold}}", why: "No one has {{t:bet}} yet, so a {{t:fold}} gains nothing: you can {{t:check}} for free (rule from module 1). Play this hand by {{t:check|checking}} and {{t:call|calling}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}}, and the Button and the {{t:big-blind}} {{t:call|called}}. On the flop the {{t:big-blind}} {{t:check|checks}}, and the Button acts after you. You have only high cards and no {{t:draw}}. What do you do?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "Yes: against two opponents, a hand with no {{t:pair}} and no {{t:draw}} rarely wins the {{t:pot}} with a {{t:bet}}. One of the two is more likely to have hit this flop." }
      - { text: "Small c-bet, like heads-up", why: "Against two opponents, a {{t:bluff}} has to get through both, and both miss at once much less often than one does." }
      - { text: "Big c-bet to push both out", why: "A big {{t:bluff}} against two opponents risks a lot, and the chance that both {{t:fold}} is small. On this flop they have many {{t:pair|pairs}} and {{t:draw|draws}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}}, and the Button and the {{t:big-blind}} {{t:call|called}}. The {{t:big-blind}} {{t:check|checks}}. You have {{t:top-pair}} with a good kicker. What do you do?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "Yes: in a multiway {{t:pot}} on a {{t:dry}} flop the solver {{t:check|checks}} very often, even with very strong hands, because two {{t:call|callers}} together have more often hit the flop." }
      - { text: "Bet for {{t:value}}", why: "Against two opponents on a {{t:dry}} flop, the solver {{t:check|checks}} even with a very strong hand; you bet rarely and small, mainly when the flop hits your {{t:range}} well." }
      - { text: "{{t:fold|Fold}}", why: "No one has {{t:bet}}, so you can {{t:check}} for free. A {{t:fold}} would mean giving up a {{t:pot}} in which you are probably ahead." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "One hand with no {{t:pair}} misses the flop about {{n:flop.miss.unpaired}} of the time. How often do two such hands (four different ranks) miss at once?"
    options:
      - { text: "About {{n:flop.miss.two}}", correct: true, why: "Yes: you count the same way as for one hand, only there are more pairing cards: {{n:pair.outs.two-hands}} out of {{n:cards.unseen.two-hands}} unknown cards (excluding your cards). The chance that none of the {{n:cards.board.flop}} flop cards is among them is about {{n:flop.miss.two}}: both miss less than half the time." }
      - { text: "About {{n:flop.miss.unpaired}}, the same as one", why: "No: each additional opponent is another chance that someone hit. The chance that everyone misses shrinks with every player." }
      - { text: "About {{n:flop.hit.unpaired}}", why: "That's the chance that one hand with no {{t:pair}} makes a {{t:pair}} on the flop. The question is about both missing." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "{{t:in-position|In position}} review: you {{t:open|opened}} from the Button, the {{t:big-blind}} {{t:call|called}} and {{t:check|checks}} on the flop. Which plan fits this flop?"
    position: BTN
    options:
      check: "{{t:check|Check}} more often, c-bet less than usual"
      small: "C-bet often and small: {{n:cbet.size.small}} {{t:pot}} ({{n:cbet.btn.small}})"
      big: "C-bet often and big: {{n:cbet.size.big}} {{t:pot}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Too cautious: on a {{t:dry}}, high flop you have the {{t:range-advantage}}, and your opponent usually missed. By {{t:check|checking}}, you give them a free card."
          small: "Yes: a {{t:dry}}, high flop favors you. A small {{t:bet}} is enough to make your opponent {{t:fold}} weak hands, while worse {{t:pair|pairs}} will still {{t:call}} it."
          big: "Right action, wrong size: on a {{t:dry}} flop your opponent has few {{t:draw|draws}}, and hands that missed will {{t:fold}} to a small {{t:bet}} too. A bigger {{t:bet}} doesn't make more hands {{t:fold}}, but it risks more. Bet about {{n:cbet.size.small}} {{t:pot}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Yes: a low flop with cards close together hits the {{t:big-blind}}'s {{t:range}}: they have {{t:straight|straights}} and {{t:two-pair|two pair}} here, and you don't have a {{t:nuts-advantage}}. You c-bet less often than on high flops: many hands {{t:check}}, and mainly strong hands and strong {{t:draw|draws}} bet."
          small: "Too often: on a low flop with cards close together, you don't have a {{t:nuts-advantage}}. Frequent c-bets, even small ones, give the {{t:big-blind}} the chance to {{t:raise}} (check-raise) with their strongest hands."
          big: "Too often and too expensive: the {{t:big-blind}} has {{t:straight|straights}} and {{t:two-pair|two pair}} in their {{t:range}} here. A frequent big c-bet risks a lot when you usually have only high cards yourself."
    count: 3
---
So far you've played {{t:in-position}} against one opponent. {{t:out-of-position|Out of position}} and against several players, you c-bet less often.

## {{t:out-of-position|Out of position}}

When you {{t:open}} from the {{t:cutoff|CO}} and the Button {{t:call|calls}}, you act first on every {{t:street}} after the flop. The Button's {{t:range}} is also strong: they {{t:fold|folded}} their weak hands and {{t:raise|raised}} some of their strongest, so they're left with medium and good hands. A {{t:range}} like this, without the strongest hands and made up mostly of medium ones, is {{t:condensed}}. That's why {{t:out-of-position}} you {{t:check}} much more often, often with your entire {{t:range}}, even with strong hands: you play them with a {{t:call}} or a check-raise. You bet mainly on flops that very strongly favor your {{t:range}}, e.g. K-Q-6. {{t:check|Checking}} {{t:out-of-position}} doesn't mean giving up on the hand: many of these hands will {{t:call}} your opponent's {{t:bet}}.

## Against several opponents

Each additional opponent is another chance that someone hit the flop. One hand with no {{t:pair}} misses the flop about {{n:flop.miss.unpaired}} of the time, but two at once only about {{n:flop.miss.two}}. A {{t:bluff}} has to get through everyone, so against several opponents you mainly give up your {{t:bluff|bluffs}}. You bet rarely and small, mainly on flops that hit your {{t:range}} well; on a {{t:dry}} flop you often {{t:check}} even with a very strong hand.

:::note Where these rules come from
The rules in this lesson come from published solver results (c-bet {{t:out-of-position}}, c-bet on ace-high flops and in multiway {{t:pot|pots}}) and from training materials (multiway {{t:pot|pots}}). They are heuristics: the app doesn't give frequencies as percentages. The chance that two hands miss at once is an exact calculation for two hands with four different ranks; it leaves out your cards, just like the number for one hand.
:::
