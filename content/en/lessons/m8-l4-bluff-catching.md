---
id: m8.l4
module: m8
order: 4
title: "Catching bluffs"
sub: "Which hands to call with on the river"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "You're defending the {{t:big-blind}}. On the river you {{t:check}}, and the Button {{t:bet|bets}} the full {{t:pot}}. The spades missed. What role does your {{t:pair}} of nines play?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: it beats only {{t:bluff|bluffs}}", correct: true, why: "For the full {{t:pot}}, the Button bets for {{t:value}} with at least a king and {{t:bluff|bluffs}} mostly with missed {{t:draw|draws}}. Your {{t:pair}} loses to every one of their {{t:value}} hands and beats every {{t:bluff}}." }
      - { text: "A {{t:value}} hand", why: "A {{t:value}} hand beats hands that pay off or bet for {{t:value}}. A {{t:pair}} of nines loses to every king and every better hand the Button has." }
      - { text: "A hand with no chance", why: "A {{t:pair}} of nines beats missed {{t:draw|draws}}, and those are what the Button {{t:bluff|bluffs}} with. It has a chance, but only against {{t:bluff|bluffs}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. The {{t:pot}} is {{n:ex.pot}}, and your opponent {{t:bet|bets}} the full {{t:pot}}: {{n:ex.bet.pot}}. You have a bluff-catcher. What is the minimum percentage of their bets that must be {{t:bluff|bluffs}} for a {{t:call}} to be profitable? Enter a number."
    answer: eq.bet-pot
    explanation: "Your equity is the share of {{t:bluff|bluffs}} among their bets. You put in {{n:ex.bet.pot}} to win the {{t:pot}} after your {{t:call}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. This is the same number as the share of {{t:bluff|bluffs}} at equilibrium from the previous lesson."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Your opponent {{t:bet|bets}} half the {{t:pot}}. You have a bluff-catcher and estimate that {{t:bluff|bluffs}} make up about {{n:catch.ex.bluffs-low}} of their bets. What do you do?"
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You need {{n:eq.bet-half}} equity, and your bluff-catcher wins only {{n:catch.ex.bluffs-low}} of the time. {{t:call|Calling}} loses." }
      - { text: "{{t:call|Call}}, because {{t:mdf}} is {{n:mdf.bet-half}}", why: "{{t:mdf|Minimum defense frequency}} protects you against an opponent who {{t:bluff|bluffs}} often enough. When there are too few {{t:bluff|bluffs}}, {{t:call|calling}} with bluff-catchers gives money away." }
      - { text: "{{t:raise|Raise}}", why: "Your hand beats only {{t:bluff|bluffs}}. After a {{t:raise}}, the {{t:bluff|bluffs}} {{t:fold}} and the {{t:value}} hands pay: you lose more." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Your opponent {{t:bet|bets}} the full {{t:pot}}. You have a bluff-catcher and estimate that {{t:bluff|bluffs}} make up about {{n:catch.ex.bluffs-high}} of their bets. What do you do?"
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "You need {{n:eq.bet-pot}} equity, and {{t:bluff|bluffs}} make up {{n:catch.ex.bluffs-high}}. Your opponent {{t:bluff|bluffs}} more than the equilibrium amount, so a {{t:call}} makes money." }
      - { text: "{{t:fold|Fold}}, because the bet is big", why: "A big bet pushes the price up to {{n:eq.bet-pot}}, but there are more {{t:bluff|bluffs}} than that. What counts is comparing these two numbers, not the bet size alone." }
      - { text: "{{t:raise|Raise}} all-in", why: "A bluff-catcher doesn't {{t:raise}}: the {{t:bluff|bluffs}} {{t:fold}}, and only hands better than yours pay." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "Your opponent bets the full {{t:pot}} on the river and {{t:bluff|bluffs}} exactly {{n:bluff.share.bet-pot}} of the time. How much do you make by {{t:call|calling}} with a bluff-catcher?"
    options:
      - { text: "Nothing: {{t:call|calling}} and {{t:fold|folding}} come out the same", correct: true, why: "A {{t:bluff}} share equal to {{n:eq.bet-pot}} is exactly the price of a {{t:call}}. Wins against {{t:bluff|bluffs}} offset losses to {{t:value}}, so your opponent lets you profit neither by {{t:call|calling}} nor by {{t:fold|folding}}." }
      - { text: "I make money, because there are many {{t:bluff|bluffs}}", why: "There are exactly as many as the price. You only make money when your opponent {{t:bluff|bluffs}} more often than {{n:eq.bet-pot}}." }
      - { text: "I lose, because there is more {{t:value}} than {{t:bluff|bluffs}}", why: "There is more {{t:value}}, but by {{t:call|calling}} you risk {{n:ex.bet.pot}} to win {{n:ex.pot}} + {{n:ex.bet.pot}}. With this share of {{t:bluff|bluffs}}, the two balance out." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "The spades missed. On the river you {{t:check}}, and the Button {{t:bet|bets}} the full {{t:pot}}. You have {{t:top-pair}} with a ten kicker. With which of these two hands is a {{t:call}} better?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Without spades you don't block missed {{t:flush-draw|flush draws}}, the Button's main {{t:bluff|bluffs}} (e.g. ten-jack of spades). More {{t:bluff|bluffs}} that you beat remain in their {{t:range}}." }
      - { text: "[[Kc Ts]]", why: "The ten of spades takes away some of the missed {{t:draw|draws}} the Button {{t:bluff|bluffs}} with (e.g. jack-ten of spades). They're left with relatively more {{t:value}}, so a {{t:call}} is worse." }
      - { text: "No difference", why: "Showdown strength is the same, but the spade in your hand blocks the Button's {{t:bluff|bluffs}}. That changes what you're really up against." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "The third heart came on the river. You {{t:check}}, and the Button {{t:bet|bets}} the full {{t:pot}}. You have a {{t:pair}} of nines. With which of these two hands is a {{t:call}} better?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "The ace of hearts blocks the ace-high {{t:flush}}, one of the Button's strongest {{t:value}} hands. When you block their {{t:value}}, more {{t:bluff|bluffs}} remain among their bets." }
      - { text: "[[Ad 9c]]", why: "The same {{t:pair}}, but you don't block any {{t:flush}}. The Button has all their flushes, which beat you." }
      - { text: "No difference", why: "At showdown both hands are equally strong, but the ace of hearts takes away some of the Button's {{t:value}} hands." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "The spades missed. On the river you {{t:check}}, and the Button {{t:bet|bets}} half the {{t:pot}}. What do you do?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "You have only seven high. You lose even to most of the Button's {{t:bluff|bluffs}} (queen with spades, jack with spades), so this isn't a bluff-catcher. You defend with other hands." }
      - { text: "{{t:call|Call}}, because the price is good", why: "The price ({{n:eq.bet-half}}) won't help a hand that loses to almost everything, even to {{t:bluff|bluffs}}." }
      - { text: "{{t:raise|Raise}} as a {{t:bluff}}", why: "{{t:raise|Raising}} as a {{t:bluff}} on the river is an advanced and risky play. Folding a hand with no chance is simpler and better." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. Your opponent {{t:bet|bets}} half the {{t:pot}}. {{t:mdf|Minimum defense frequency}} is {{n:mdf.bet-half}}. Which hands do you defend first?"
    options:
      - { text: "The best bluff-catchers: they beat {{t:bluff|bluffs}} and have good {{t:blocker|blockers}}", correct: true, why: "You defend hands that beat {{t:bluff|bluffs}}, and among hands of similar strength you choose those that block your opponent's {{t:value}} and don't block their {{t:bluff|bluffs}}. You {{t:fold}} hands that lose even to {{t:bluff|bluffs}}." }
      - { text: "A random {{n:mdf.bet-half}} of your {{t:range}}", why: "{{t:mdf|Minimum defense frequency}} tells you how much to defend, not with what. Random defense pays with hands that will never win." }
      - { text: "Only {{t:value}} hands", why: "Then you defend too little, and your opponent makes money by {{t:bluff|bluffing}} with any cards. To reach {{t:mdf}}, you add the best bluff-catchers." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Why do you {{t:call}} with a bluff-catcher on the river rather than {{t:raise}}?"
    options:
      - { text: "Because after a {{t:raise}}, the {{t:bluff|bluffs}} {{t:fold}} and only better hands pay", correct: true, why: "Your hand beats only {{t:bluff|bluffs}}. A {{t:raise}} pushes out exactly those hands and keeps the ones you lose to." }
      - { text: "Because you're not allowed to {{t:raise}} on the river", why: "You are. It's just that a {{t:raise}} with a bluff-catcher turns it into a {{t:bluff}} against hands that won't {{t:fold}}." }
      - { text: "Because a {{t:call}} is always cheaper", why: "It's not about cost but about who stays in the hand. After a {{t:raise}}, the hands that remain are the ones that beat you." }
---
Now you're on the other side: your opponent bets on the river, and you have a medium-strength hand. Most often it will be a **bluff-catcher**: a hand that loses to every one of your opponent's {{t:value}} hands but beats their {{t:bluff|bluffs}}.

## Your equity is their {{t:bluff|bluffs}}

A bluff-catcher wins exactly when your opponent {{t:bluff|bluffs}}. So its equity is the share of {{t:bluff|bluffs}} among your opponent's bets. You {{t:call}} when that share is greater than the required equity from M2:

| Opponent's bet | Required equity ({{t:bluff|bluffs}} at least) |
|---|---|
| 1/3 {{t:pot}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot}} | {{n:eq.bet-half}} |
| Full {{t:pot}} | {{n:eq.bet-pot}} |

When your opponent {{t:bluff|bluffs}} in exactly the proportion from the previous lesson ({{n:bluff.share.bet-pot}} with a full-{{t:pot}} bet), a {{t:call}} breaks even. When they {{t:bluff}} more often, you {{t:call}}; when less often, you {{t:fold}}. The numbers exclude rake; rake slightly increases the required equity.

## How much to defend, and with what

How much to defend comes from {{t:mdf}} in M6: against a half-{{t:pot}} bet, about **{{n:mdf.bet-half}}** of your {{t:range}}. This lesson answers the second question: **with which hands**. You {{t:call}} with the best bluff-catchers: among hands of similar strength you choose those with better {{t:blocker|blockers}}; you {{t:fold}} hands that lose even to {{t:bluff|bluffs}}.

A better bluff-catcher:

- beats more {{t:bluff|bluffs}} (a {{t:pair}} is better than just a high card),
- blocks your opponent's {{t:value}} hands,
- doesn't block their {{t:bluff|bluffs}}.

## {{t:blocker|Blockers}} when {{t:call|calling}}

This mirrors the previous lesson. When the spades miss, your opponent {{t:bluff|bluffs}} with missed {{t:flush-draw|flush draws}}. A spade in your hand takes away some of their {{t:bluff|bluffs}}, so a {{t:call}} is worse. When the {{t:flush}} comes in, the ace of that suit in your hand takes away their strongest flushes, so a {{t:call}} is better.

## Don't raise with a bluff-catcher

After a {{t:raise}}, the {{t:bluff|bluffs}} {{t:fold}} and only hands that beat you pay. With a bluff-catcher, you {{t:call}} or {{t:fold}}.

:::note When your opponent rarely {{t:bluff|bluffs}}
These rules assume an opponent who {{t:bluff|bluffs}} roughly at equilibrium. Against a player who rarely {{t:bluff|bluffs}} with a big river bet, you {{t:fold}} more often than {{t:mdf}} suggests: when there are fewer {{t:bluff|bluffs}} than the price requires, a {{t:call}} loses (the math from this lesson). The rules for choosing bluff-catchers by {{t:blocker|blockers}} come from training materials and solver analyses (river play, {{t:blocker|blockers}}): among bluff-catchers (hands that beat only {{t:bluff|bluffs}} anyway), the solver chooses its {{t:call|calls}} more by {{t:blocker|blockers}} than by hand strength alone.
:::
