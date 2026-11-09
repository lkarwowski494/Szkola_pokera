---
id: m11.l2
module: m11
order: 2
title: "Calling an all-in"
sub: "How much equity you need and why you call tighter"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "You have {{n:m11.depth.10}} in the {{t:big-blind}}, no ante. The {{t:small-blind}} went all-in for {{n:m11.depth.10}}. What percentage of equity do you need for a {{t:call}} to be profitable? Enter a number."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Your blind is already in the {{t:pot}}, so you add {{n:m11.call.10.cost}}. After the {{t:call}}, the {{t:pot}} is {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Same spot, but the stacks are {{n:m11.depth.5}} each. How much equity do you need to {{t:call}} the all-in?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "You add {{n:m11.call.5.cost}} to a {{t:pot}} that is {{n:m11.call.5.pot}} after the {{t:call}}: {{n:m11.call.5.eq}}. With a shorter stack, the blind is a bigger part of the stack, so the price is better." }
      - { text: "{{n:m11.call.10.eq}}", why: "That's the price at {{n:m11.depth.10}}. At {{n:m11.depth.5}}, your blind is a bigger part of your whole stack, so you need less: {{n:m11.call.5.eq}}." }
      - { text: "Half", why: "You would need half if you were putting in your whole stack. The blind is already in the {{t:pot}}, so you only add {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacks are {{n:m11.depth.15}} each, and the {{t:small-blind}} went all-in. How much equity do you need to {{t:call}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "You add {{n:m11.call.15.cost}} to a {{t:pot}} of {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. The deeper the stack, the closer to half." }
      - { text: "{{n:m11.call.5.eq}}", why: "That's the price at {{n:m11.depth.5}}. At {{n:m11.depth.15}}, the blind is a smaller part of the stack, so the price rises to {{n:m11.call.15.eq}}." }
      - { text: "More than half", why: "Even with a very deep stack, the price never exceeds half: you always have your blind in the {{t:pot}}." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "You have {{n:m11.depth.10}} in the {{t:big-blind}}, and the {{t:small-blind}} went all-in. Paint the hands you {{t:call}} with."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "At {{n:m11.depth.10}}, the solver goes all-in from the {{t:small-blind}} with suited seven-six (76s). You have this hand in the {{t:big-blind}}, and the {{t:small-blind}} went all-in. What do you do?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Going all-in with 76s is profitable mainly thanks to your opponent's {{t:fold|folds}}. When you {{t:call}}, you win only at showdown, and against an all-in {{t:range}} with lots of high cards and {{t:pair|pairs}}. The solver {{t:fold|folds}} this hand." }
      - { text: "{{t:call|Call}}, because I'd go all-in with it from the {{t:small-blind}}", why: "A {{t:call}} is a different situation: you have no fold equity, and your opponent's {{t:range}} is stronger than random. To {{t:call}}, you need a stronger hand." }
      - { text: "{{t:call|Call}}, because a suited hand develops well", why: "After an all-in, there's no further play in which the hand could develop. Only equity to showdown counts." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Big blind}}, and the {{t:small-blind}} went all-in. You have a {{t:pair}} of twos. At {{n:m11.depth.10}}, the solver {{t:call|calls}}. What about at {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Folds}}", correct: true, why: "At {{n:m11.depth.15}}, the price rises to {{n:m11.call.15.eq}}, and the all-in {{t:range}} is narrower (about {{n:m11.push.15}} hands), so a {{t:pair}} of twos runs into a higher {{t:pair}} more often. The {{t:call|calling}} {{t:range}} drops from about {{n:m11.call.10}} to about {{n:m11.call.15}} hands." }
      - { text: "{{t:call|Calls}}, because a {{t:pair}} is always the favorite", why: "A {{t:pair}} of twos against two higher cards is roughly a coin flip, and against any higher {{t:pair}} it's a clear underdog. With a deeper stack, the opponent {{t:shove|shoves}} fewer weak hands, so {{t:pair|pairs}} make up a larger part of their {{t:range}}." }
      - { text: "{{t:call|Calls}}, because the deeper the stack, the wider", why: "The opposite: the deeper the stack, the more a {{t:call}} costs and the narrower the {{t:call|calling}} {{t:range}}." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "At {{n:m11.depth.10}}, the {{t:small-blind}} goes all-in with about {{n:m11.push.10}} hands, but the {{t:big-blind}} {{t:call|calls}} with only about {{n:m11.call.10}}. Why?"
    options:
      - { text: "The caller has no fold equity and plays against a {{t:range}} stronger than random", correct: true, why: "An all-in also wins when the opponent {{t:fold|folds}}. A {{t:call}} wins only at showdown, and against hands that have already been selected. Hence the old rule: you need a better hand to {{t:call}} than to go all-in first." }
      - { text: "The {{t:big-blind}} pays more", why: "Both risk the same stack, and the {{t:big-blind|BB}} already has its blind in the {{t:pot}}, so it adds even less." }
      - { text: "The solver is wrong", why: "This is the equilibrium of an all-in-or-{{t:fold}} game: no player can profit by changing only their own {{t:range}}. The difference comes from fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "The game is played with a {{t:bb-ante}}. You have {{n:m11.depth.10}} in the {{t:big-blind}} and posted an ante of {{n:m11.ante}}. The {{t:small-blind}} went all-in. How much equity do you need to {{t:call}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "You add the same amount ({{n:m11.call.10.cost}}), but the {{t:pot}} also contains the ante: after the {{t:call}}, it's {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. That's why with an ante you {{t:call}} wider: about {{n:m11.call.10-ante}} hands instead of {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "That's the price without an ante. The ante stays in the {{t:pot}}, so for the same amount you win more: {{n:m11.call.10-ante.eq}}." }
      - { text: "More than without an ante, because you put in more", why: "The ante is money already spent. All that counts is how much more you add and how much you can win." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "Three players, stacks of {{n:m11.depth.3max}} each. The Button went all-in, and the {{t:small-blind}} {{t:call|called}}. In the {{t:big-blind}}, you need only {{n:m11.3max.bb-two.eq}} equity. Do you {{t:call}} wider than when the Button alone went all-in?"
    table: { position: BB }
    options:
      - { text: "No, tighter", correct: true, why: "The price is better, but you're playing against two {{t:range|ranges}}, including a caller who has a strong hand. The solver {{t:call|calls}} here with about {{n:m11.3max.call.bb-two}} hands, and when only the Button is all-in, with about {{n:m11.3max.call.bb}}." }
      - { text: "Yes, because the price is much better", why: "A better price isn't enough: against two opponents, the equity of weaker hands drops quickly. The solver {{t:call|calls}} with only about {{n:m11.3max.call.bb-two}} hands." }
      - { text: "The same, because only your hand matters", why: "What matters is equity against your opponents' hands. A player who calls the Button's all-in has a {{t:range}} stronger than the Button's, so you {{t:call}} tighter." }
---
When an opponent goes all-in and you're in the {{t:big-blind}}, the decision is simple in form: you {{t:call}} or you {{t:fold}}. After a {{t:call}}, there's no further play, so only the price and your equity against the all-in {{t:range}} matter.

## The price of a {{t:call}}

Your blind is already in the {{t:pot}}. With a stack of {{n:m11.depth.10}}, you add {{n:m11.call.10.cost}}, and the {{t:pot}} after the {{t:call}} is {{n:m11.call.10.pot}}.

```formula
required equity = amount to add ÷ pot after the call
```

| Stack | To add | {{t:pot|Pot}} after the {{t:call}} | Required equity |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

The shorter the stack, the better the price, because your blind is a larger part of your whole stack.

## You {{t:call}} tighter than you {{t:shove}}

When you go all-in first, you also win when your opponent {{t:fold|folds}}. When you {{t:call}}, you win only at showdown, and against hands your opponent chose to go all-in with. That's why you need a better hand to {{t:call}} than to go all-in first (in the literature, this is called the “gap concept”).

```range
call.bb-10
```

At {{n:m11.depth.10}}, the {{t:small-blind}} goes all-in with about {{n:m11.push.10}} hands, while the {{t:big-blind}} {{t:call|calls}} with about {{n:m11.call.10}}. Hands like [[7s 6s]] you {{t:shove}} from the {{t:small-blind}}, but you {{t:fold}} them against an all-in: without fold equity, they have too little equity against high cards and {{t:pair|pairs}}. For comparison, a table from a training site gives a {{t:call|calling}} {{t:range}} of {{n:m11.ext.call.10}} at {{n:m11.depth.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

A deeper stack means a more expensive {{t:call}} and a narrower all-in {{t:range}} from your opponent, so you {{t:call}} less often: about {{n:m11.call.15}} at {{n:m11.depth.15}}, and at {{n:m11.depth.5}} as many as about {{n:m11.call.5}}.

## When someone is still behind you

With three players and stacks of {{n:m11.depth.3max}} each, the {{t:small-blind}} {{t:call|calls}} the Button's all-in with only about {{n:m11.3max.call.sb}} hands, even though it needs {{n:m11.3max.sb.eq}} equity. The {{t:big-blind}} in the same situation, when the {{t:small-blind}} has {{t:fold|folded}}, adds {{n:m11.3max.bb.cost}} to a {{t:pot}} of {{n:m11.3max.bb.pot}}, needs {{n:m11.3max.bb.eq}} equity and {{t:call|calls}} with about {{n:m11.3max.call.bb}}. The difference comes mainly from the player behind you (the prices differ only slightly): the {{t:small-blind}} may {{t:call}} and run into an even stronger hand from the {{t:big-blind}}.

```range
call.sb-vs-btn-3max
```

When two players are already all-in, the price drops to {{n:m11.3max.bb-two.eq}}, yet the {{t:big-blind}} {{t:call|calls}} with only about {{n:m11.3max.call.bb-two}} hands. Against two {{t:range|ranges}}, one of which has already {{t:call|called}} the all-in, weaker hands lose equity quickly.

```range
call.bb-vs-two-3max
```

## With an ante, you {{t:call}} wider

The ante stays in the {{t:pot}}, so for the same amount you win more: at {{n:m11.depth.10}} with a {{t:bb-ante}} of {{n:m11.ante}}, you need {{n:m11.call.10-ante.eq}} instead of {{n:m11.call.10.eq}}. With an ante, your opponent also {{t:shove|shoves}} wider, so the solver {{t:call|calls}} with about {{n:m11.call.10-ante}} hands.

```range
call.bb-10-ante
```

:::note {{t:range|Ranges}} in this lesson
The grids cover two-player play: the {{t:small-blind}} against the {{t:big-blind}} when everyone else has {{t:fold|folded}}, and they count {{t:chips}}, not money. When {{t:payout|payouts}} matter in a {{t:tournament}}, you {{t:call}} even tighter (next lesson).
:::
