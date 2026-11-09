---
id: m7.l1
module: m7
order: 1
title: "Second barrel"
sub: "When to bet again on the turn"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}}. On the [[Jd 7c 3s]] flop you {{t:bet}} a c-bet and they {{t:call|called}}. Which turn card helps your {{t:second-barrel}} the most?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Yes: an ace hits many hands in your {{t:open}} {{t:range}} (AK, AQ, AJ), while the {{t:big-blind}} {{t:call|called}} the flop mostly with {{t:pair|pairs}} and {{t:draw|draws}}. Every {{t:pair}} they have drops one place lower." }
      - { text: "[[8h]]", why: "No: the eight connects with the flop. It makes a {{t:straight}} for T9 and {{t:two-pair}} for 87, hands the {{t:big-blind}} defends a lot. It's more their card." }
      - { text: "[[3h]]", why: "Not the worst, but it changes little: it rarely improves your {{t:range}}, and an opponent with a {{t:pair}} still has a {{t:pair}}. The ace gives your {{t:second-barrel}} much more." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Why does an ace on the turn after a [[Jd 7c 3s]] flop serve the {{t:second-barrel}} of the Button {{t:open|opener}} well?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "It hits your AK and AQ, and the opponent's {{t:pair}} becomes the second or third {{t:pair}}", correct: true, why: "Yes: a high card hits the {{t:open|opener}}'s {{t:range}} more often, and an opponent who {{t:call|called}} the flop with a {{t:pair}} of jacks or sevens now has a weaker hand relative to the {{t:board}}." }
      - { text: "Because the opponent always {{t:fold|folds}} to an ace", why: "Not always: an opponent with an ace or a set will pay. The ace increases the chance of a {{t:fold}}, but it guarantees nothing." }
      - { text: "Because the ace completes the opponent's {{t:draw|draws}}", why: "No: on this {{t:board}} the ace completes no {{t:flush}} or {{t:straight}} the opponent could have. It helps because it fits your {{t:range}}." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}}. On the flop you {{t:bet}} a c-bet and they {{t:call|called}}. The turn is a seven. The {{t:pot}} is {{n:ex.pot}} and the opponent {{t:check|checks}}. What do you do?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "A seven on a {{t:board}} with a nine and a six gives a {{t:straight}} to T8 and 85 and {{t:two-pair}} to 76 and 97, hands the {{t:big-blind}} defends. You have no {{t:pair}} and no {{t:draw}}. You give up the {{t:bluff}} and take a free card." }
      - { text: "Bet {{n:ex.bet.three-quarters}}", why: "This card fits the opponent's {{t:range}}, not yours, and you have no outs to a strong hand. Fire a {{t:second-barrel}} as a {{t:bluff}} on cards that help you and with hands that can improve." }
      - { text: "Bet {{n:ex.bet.pot}}", why: "A big {{t:bluff}} on a card that favors the opponent risks a lot: they would have to {{t:fold}} more often than {{n:alpha.bet-pot}} of the time, and after {{t:call|calling}} the flop they have many {{t:pair|pairs}} and {{t:draw|draws}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}} your c-bet on the flop. The turn is an ace. The {{t:pot}} is {{n:ex.pot}} and the opponent {{t:check|checks}}. What do you do?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Bet {{n:ex.bet.three-quarters}}", correct: true, why: "A good {{t:second-barrel}}: the ace fits your {{t:range}}, and you have a gutshot to a {{t:straight}} (a ten). When the opponent {{t:fold|folds}} a {{t:pair}}, you win right away, and when they {{t:call|call}}, you can still hit." }
      - { text: "Bet {{n:ex.bet.quarter}}", sizeError: true, why: "Right action, wrong size: the opponent will {{t:call}} such a cheap bet with any {{t:pair}}, and this {{t:bluff}} earns mainly from {{t:fold|folds}}. On a card that helps you, bet big, just as you do with strong hands." }
      - { text: "{{t:check|Check}}", correct: true, why: "Also fine: you have outs and will see the river for free, so a {{t:check}} is not a mistake. In a published solver example, a gutshot to the nut {{t:straight}} {{t:check|checked}} the turn. Both plays are correct." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}} your c-bet on the flop. The turn is a deuce. The {{t:pot}} is {{n:ex.pot}} and the opponent {{t:check|checks}}. What do you do?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "You have no {{t:pair}} and no {{t:draw}}: three hearts are not enough with one card to come, and you are two cards short of a {{t:straight}}. The deuce changes nothing, and the opponent {{t:call|called}} the flop on a {{t:board}} with a king, so they often have a {{t:pair}}. You give up the {{t:bluff}}." }
      - { text: "Bet {{n:ex.bet.three-quarters}}", why: "A {{t:bluff}} with no outs wins only when the opponent {{t:fold|folds}}. After {{t:call|calling}} the flop they have many {{t:pair|pairs}} (kings, eights) that won't {{t:fold}} on a blank deuce." }
      - { text: "{{t:fold|Fold}}", why: "The opponent {{t:check|checks}}, so you can {{t:check}} for free (rule from module 1). A {{t:fold}} gives up the {{t:pot}} for no reason." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "You {{t:bet}} a {{t:second-barrel}} with a {{t:flush-draw}} and the opponent {{t:call|calls}}. What chances do you still have?"
    options:
      - { text: "About {{n:odds.flush.turn-river}} to hit a {{t:flush}} on the river", correct: true, why: "Yes: that's your second way to win. {{n:outs.flush}} outs among {{n:cards.unseen.turn}} unseen cards. That's why a {{t:semi-bluff}} is better than a {{t:bluff}} with no outs." }
      - { text: "None, the {{t:bluff}} failed", why: "A {{t:bluff}} with no outs has no chance left, but you have a {{t:draw}}: a {{t:flush}} on the river wins despite the {{t:call}}." }
      - { text: "About {{n:odds.flush.flop-river}}", why: "That's what you had on the flop, with two cards to come. On the turn one card is left: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}} your c-bet on the flop. The turn is a deuce. The {{t:pot}} is {{n:ex.pot}} and the opponent {{t:check|checks}}. What do you do?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "A {{t:pair}} of nines is a medium hand: it beats {{t:bluff|bluffs}} but loses to every king. Facing a second bet, the opponent will {{t:fold}} worse hands and pay with kings. By {{t:check|checking}}, you keep the {{t:pot}} small and get to showdown." }
      - { text: "Bet {{n:ex.bet.three-quarters}}", why: "The opponent has already {{t:call|called}} the flop on a {{t:board}} with a king. Worse hands (eights, threes) will {{t:fold}} or pay once, and better hands will always pay. Such a bet makes money for the better hands." }
      - { text: "Bet to find out where you stand", why: "Betting “for information” is a common mistake: you pay for it, because better hands won't let you off anyway, and worse ones will run. You bet for {{t:value}} or as a {{t:bluff}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "You {{t:open|opened}} from the Button and the {{t:big-blind}} {{t:call|called}} your c-bet on the flop. The turn is a deuce. The {{t:pot}} is {{n:ex.pot}} and the opponent {{t:check|checks}}. What do you do?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Bet for {{t:value}}", correct: true, why: "{{t:top-pair|Top pair}} with the best kicker is a strong hand. The opponent {{t:call|called}} the flop, so they often have a weaker king or eights, which will pay once more." }
      - { text: "{{t:check|Check}}, the opponent has nothing anyway", why: "The opponent {{t:call|called}} the flop, so they often have a {{t:pair}}. By {{t:check|checking}}, you lose a {{t:bet}} that a worse hand would have paid." }
      - { text: "Bet all-in", why: "Worse {{t:pair|pairs}} will rarely pay off a whole stack. Choose a size that gets paid by weaker kings and eights." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Which hands do you most often {{t:bet}} a {{t:second-barrel}} with on the turn?"
    options:
      - { text: "Strong hands and {{t:draw|draws}}; medium hands {{t:check}}", correct: true, why: "Yes: strong hands want to get paid, {{t:draw|draws}} win in two ways, and medium hands gain nothing from another {{t:bet}}." }
      - { text: "All of them, so you don't lose the {{t:initiative}}", why: "{{t:initiative|Initiative}} alone doesn't win. The opponent {{t:call|called}} the flop, so they have a stronger {{t:range}}, and hands with no outs and medium {{t:pair|pairs}} lose by betting nonstop." }
      - { text: "Only the strongest hands", why: "Then the opponent would fold every time you bet and pay only when they beat you. {{t:draw|Draws}} are natural {{t:semi-bluff|semi-bluffs}}." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. The {{t:pot}} is {{n:ex.pot}}, you {{t:bluff}} with a hand that will almost never win, and you {{t:bet}} {{n:ex.bet.three-quarters}}. How often must the opponent {{t:fold}} for this {{t:bluff}} to break even? Enter the number as a percentage."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = bet ÷ ({{t:pot}} + bet) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. With outs you need fewer {{t:fold|folds}}, because you will still win some of the {{t:call|calls}} on the river."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Why is the opponent's {{t:range}} on the turn stronger than on the flop after they {{t:call|call}} the c-bet?"
    options:
      - { text: "Because they {{t:fold|folded}} the weakest hands on the flop", correct: true, why: "Yes: hands with no {{t:pair}} and no {{t:draw}} {{t:fold}} to a c-bet. {{t:pair|Pairs}} and {{t:draw|draws}} remain, so the {{t:second-barrel}} faces a stronger {{t:range}} than the first bet." }
      - { text: "Because the turn always helps them", why: "No: the turn is random and sometimes helps you (e.g. an ace). The opponent's {{t:range}} is strengthened by their own decision on the flop." }
      - { text: "It isn't; they have the same {{t:range}} as before the flop", why: "Every decision filters out some hands. Whoever {{t:call|called}} a {{t:bet}} usually hit something or has a {{t:draw}}." }
---
A {{t:second-barrel}} is the second {{t:bet}} from the player who {{t:raise|raised}} before the flop: a c-bet on the flop, a {{t:call}}, and then a bet on the turn. On the turn you ask not only “do I have a hand?” but also “does this card help me or my opponent?”

## The opponent {{t:call|called}}, so they are stronger

Facing a c-bet, the opponent {{t:fold|folds}} hands with no {{t:pair}} and no {{t:draw}}. Whoever {{t:call|called}} usually has a {{t:pair}} or a {{t:draw}}, sometimes high cards with a backdoor (as in defense in M6). That's why the {{t:second-barrel}} faces a stronger {{t:range}} than the first bet, and you don't bet a second time with everything.

## Which card helps

- **A high card on a lower {{t:board}}** (ace, king) usually helps the {{t:open|opener}}: it hits their AK, AQ, KQ, and every {{t:pair}} the opponent has drops one place lower. On such cards you bet a second time more often, including as a {{t:bluff}}.
- **A low card that connects with the {{t:board}}**, e.g. a seven on [[9h 6c 2d]], helps the {{t:big-blind}}: it gives {{t:straight|straights}} and {{t:two-pair}} to the hands they defend most.
- **A blank**, e.g. a deuce on [[Kd 8c 3s]], changes little. Your hand decides.

## What to bet a second time with

You bet with strong hands (for {{t:value}}) and {{t:draw|draws}} (as a {{t:semi-bluff}}). A {{t:semi-bluff}} wins in two ways: when the opponent {{t:fold|folds}} or when you hit on the river. You give up more often with hands that have no {{t:pair}} and no outs, because they win only when the opponent folds, unless they block the hands the opponent will pay with. When the opponent can respond with a {{t:raise}}, the solver also {{t:bluff|bluffs}} with hands that have no outs.

A {{t:bluff}} with no chance breaks even when the opponent {{t:fold|folds}} bet ÷ ({{t:pot}} + bet) of the time (alpha from M6). With a 3/4 {{t:pot}} bet that's {{n:alpha.bet-three-quarters}}, with a half-{{t:pot}} bet {{n:alpha.bet-half}}.

## Medium hands {{t:check}}

{{t:second-pair|Second pair}} or {{t:top-pair}} with a weak kicker beats {{t:bluff|bluffs}} but loses to better {{t:pair|pairs}}. Facing a second bet, worse hands will {{t:fold}} and better ones will pay. You {{t:check}}, keep the {{t:pot}} small, and get to showdown.

:::note Where these rules come from
The general directions (high cards usually favor the {{t:second-barrel}}, {{t:bluff|bluffs}} with outs rather than without, medium hands {{t:check}}) are heuristics from training materials and solver analyses. They apply to stacks of about {{n:format.stack}}. This is a simplification: the solver also {{t:bluff|bluffs}} with some hands that have no outs when they block the opponent's {{t:value}} or when the opponent can respond with a {{t:raise}}. The app doesn't give betting frequencies as percentages, because such numbers depend on the specific hand in solver results.
:::
