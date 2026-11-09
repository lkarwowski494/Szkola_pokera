---
id: m4.l2
module: m4
order: 2
title: "Defending the big blind"
sub: "Calling price and wide defense"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "The Button {{t:open|opened}} to {{n:pf.open-size}}, the {{t:small-blind}} {{t:fold|folded}}. What percentage of equity do you need in the {{t:big-blind|big blind}} for a {{t:call}} to be profitable (ignoring play after the flop)? Enter a number."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "You put in {{n:bb.call.vs-btn}} more, into a {{t:pot}} that holds {{n:bb.pot-after.vs-btn}} after your {{t:call}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} is about {{n:eq.bb-vs-btn-open}}. You would need half only if the {{t:pot}} held nothing but your opponent's {{t:bet}}; the blinds in the {{t:pot}} improve your price."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "The {{t:small-blind}} {{t:open|opened}} to {{n:pf.open-size-sb}}. How much equity do you need in the {{t:big-blind|big blind}} to {{t:call}}?"
    table: { position: BB }
    options:
      - { text: "About {{n:eq.bb-vs-sb-open}}", correct: true, why: "You put in {{n:bb.call.vs-sb}} more, into a {{t:pot}} that holds {{n:bb.pot-after.vs-sb}} after your {{t:call}}: that is about {{n:eq.bb-vs-sb-open}}. The price is worse than against the Button, but you have {{t:position}} after the flop." }
      - { text: "About {{n:eq.bb-vs-btn-open}}", why: "That is the price against a Button {{t:open}} to {{n:pf.open-size}}. The {{t:small-blind}} {{t:open|opens}} with a bigger size, so you pay more." }
      - { text: "About half", why: "You would need half the equity if the {{t:pot}} held only your opponent's {{t:bet}}. Here it also holds the blinds, so the price is better." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Why don't you {{t:call}} in the {{t:big-blind|big blind}} with every hand that has about {{n:eq.bb-vs-btn-open}} equity against the Button's {{t:range}}?"
    table: { position: BB }
    options:
      - { text: "Because {{t:out-of-position}} you won't realize all of your equity", correct: true, why: "Equity is your chance of winning if the hand is played to the end with no {{t:bet|bets}}. {{t:out-of-position|Out of position}} you will often {{t:fold}} before showdown, so weak offsuit hands realize less than their equity suggests." }
      - { text: "Because the Button always has a strong hand", why: "The Button {{t:open|opens}} very wide, which is why {{t:big-blind|BB}} defense is wide." }
      - { text: "Because you need to save {{t:chips}}", why: "What matters is {{t:expected-value}}, not saving {{t:chips}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "The Button {{t:open|opened}} to {{n:pf.open-size}}, the {{t:small-blind}} {{t:fold|folded}}. You have QQ in the {{t:big-blind|big blind}}. What do you do?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet to {{n:pf.3bet.oop-total}}", correct: true, why: "QQ is a {{t:value}} hand. {{t:out-of-position|Out of position}} you {{t:raise}} to about {{n:pf.3bet.size-oop}} the {{t:open}}, so the Button can't {{t:call}} cheaply {{t:in-position}}." }
      - { text: "3-bet to {{n:pf.3bet.ip-total}}", sizeError: true, why: "Right action, but that is the size for a player {{t:in-position}} ({{n:pf.3bet.size-ip}} the {{t:open}}). {{t:out-of-position|Out of position}} you {{t:raise}} bigger: to {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Call}}", why: "You lose value: with QQ you want to build the {{t:pot}} before the flop, not play a small {{t:pot}} {{t:out-of-position}}." }
      - { text: "{{t:fold|Fold}}", why: "QQ is one of the best hands preflop. Folding is a big mistake." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "The Button {{t:open|opened}} to {{n:pf.open-size}}, the {{t:small-blind}} {{t:fold|folded}}. Paint the hands you defend the {{t:big-blind}} with (by {{t:call|calling}} or 3-betting)."
---
The {{t:big-blind}} already has a full blind in the {{t:pot}}, so it pays little more to face an {{t:open}}. When the Button {{t:open|opens}} to {{n:pf.open-size}} and the {{t:small-blind}} {{t:fold|folds}}, you need only about {{n:eq.bb-vs-btn-open}} equity to {{t:call}}. That is why the {{t:big-blind}} defends the widest of all {{t:position|positions}}.

## Price isn't everything

Equity tells you how often you win if you both reach showdown with no further {{t:bet|bets}}. {{t:out-of-position|Out of position}} you will often {{t:fold}} after the flop, so weak offsuit hands realize less than their equity. Suited hands, {{t:connectors}} and medium {{t:pair|pairs}} realize more, which is why the grid defends with them more readily.

```range
vs-open.bb-vs-btn
```

Published solver solutions defend about {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} of hands here ({{t:call}} and 3-bet combined). The app's solver, which the grid comes from, defends wider here than the published solutions.

## Against the {{t:small-blind}}

The {{t:small-blind}} {{t:open|opens}} with a bigger size, to {{n:pf.open-size-sb}}, so you need about {{n:eq.bb-vs-sb-open}} equity to {{t:call}}. The price is worse, but you have {{t:position}} after the flop, so you still defend wide: more than half of hands.

```range
vs-open.bb-vs-sb
```

A published solver solution defends about {{n:pf.bb-def.vs-sb.pub}} of hands here. The app's solver, which the grid comes from, defends tighter here than the published solution.

:::note How to {{t:raise}} from the {{t:big-blind}}
The grids show what to defend with, not how: 3-bet and {{t:call}} are combined, because the makeup of big blind 3-bets in the app's solver differs from published results of other solvers. Against the Button, a 3-bet from the {{t:big-blind}} is about {{n:pf.3bet.size-oop}} the {{t:open}}. You 3-bet your strongest hands (TT+, AQ+, AJs+) plus {{t:bluff|bluffs}} from the bottom of your {{t:call|calling}} {{t:range}}: A5s, sometimes A4s, and suited {{t:connectors}}. Medium and small {{t:pair|pairs}}, KQo and offsuit aces you usually {{t:call}}. Against the {{t:small-blind}} you have {{t:position}}, so you {{t:raise}} smaller, about {{n:pf.3bet.size-ip}} the {{t:open}}. You then 3-bet mainly for {{t:value}} (TT+, AJs+, some AQo and KQ), and you usually {{t:call}} with A5s and suited {{t:connectors}}.
:::
