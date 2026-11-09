---
id: m4.l1
module: m4
order: 1
title: "When someone opens before you"
sub: "Fold, call or 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "The {{t:cutoff}} {{t:open|opened}} to {{n:pf.open-size}}. You want to {{t:raise}} from the Button. To what size?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "To {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|In position}}, you {{t:raise}} to about {{n:pf.3bet.size-ip}} the {{t:open}}. This is the standard, and it leaves a good stack-to-{{t:pot}} ratio on the flop." }
      - { text: "To {{n:pf.3bet.too-small}}", why: "Too small: your opponent gets a great price to {{t:call}} with almost anything and keep playing." }
      - { text: "To {{n:pf.3bet.too-big}}", why: "Too big for playing {{t:in-position}}: you risk more, and your opponent's better hands won't {{t:fold}} anyway." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "The Button {{t:open|opened}} to {{n:pf.open-size}}, and the {{t:small-blind}} {{t:fold|folded}}. You want to {{t:raise}} from the {{t:big-blind}}. To what size?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "To {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Out of position}}, you {{t:raise}} to about {{n:pf.3bet.size-oop}} the {{t:open}}. The larger size denies the Button a cheap {{t:call}} {{t:in-position}}." }
      - { text: "To {{n:pf.3bet.ip-total}}", why: "That is the size for a player {{t:in-position}}. {{t:out-of-position|Out of position}}, you give your opponent too good a price." }
      - { text: "I just {{t:call}}", why: "With KK you want to build the {{t:pot}} right away: it's the second-best hand preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "The Button {{t:open|opened}} to {{n:pf.open-size}}. You are in the {{t:small-blind}}. Which plan is standard?"
    table: { position: SB }
    options:
      - { text: "I {{t:raise}} or {{t:fold}}", correct: true, why: "After a {{t:call}}, you play {{t:out-of-position}}, and the {{t:big-blind}} is still behind you. From the {{t:small-blind}} against late-position {{t:open|opens}}, solvers almost always {{t:raise}} or {{t:fold}}." }
      - { text: "I {{t:call}} wide because I already have half a blind in the {{t:pot}}", why: "Half a blind is not much. A {{t:call}} {{t:out-of-position}} with the {{t:big-blind}} behind you gives poor {{t:equity-realization}}: you win a smaller share of the {{t:pot}} than your hand's equity suggests, because you often {{t:fold}} before showdown." }
      - { text: "I always {{t:fold}}", why: "Too tight: the Button {{t:open|opens}} very wide, so it pays to {{t:raise}} with strong hands and some {{t:bluff|bluffs}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "You are in the {{t:big-blind}} facing an {{t:open}} from the Button. Which of these hands is a typical 3-bet as a {{t:bluff}}?"
    table: { position: BB }
    options:
      - { text: "Suited A5", correct: true, why: "It blocks your opponent's AA and AK, and after a {{t:call}} it can make a {{t:flush}} or a {{t:straight}}. It's a typical {{t:bluff}} from the bottom of your {{t:call|calling}} {{t:range}}: from the {{t:big-blind}}, you 3-bet your strongest hands plus {{t:bluff|bluffs}} like this." }
      - { text: "Offsuit K7", why: "You defend with this hand by {{t:call|calling}}. As a 3-bet, it blocks nothing important and plays poorly when your opponent {{t:call|calls}}." }
      - { text: "{{t:pair|Pair}}: 22", why: "The smallest {{t:pair|pairs}} defend by {{t:call|calling}}: they win when they hit a set ({{t:three-of-a-kind}} with a {{t:pocket-pair}}, i.e. a {{t:pair}} made of your two {{t:hole-cards}}), and a 3-bet with them handles a 4-bet badly." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
When someone before you has {{t:open|opened}}, you have three options: {{t:fold}}, {{t:call}}, or {{t:raise}} again. This second {{t:raise}} is called a 3-bet because it's the third {{t:bet}} in the hand (blind, {{t:open}}, {{t:raise}}).

## 3-bet size

{{t:in-position|In position}}, you {{t:raise}} to about {{n:pf.3bet.size-ip}} the {{t:open}}, so against an {{t:open}} of {{n:pf.open-size}}, to {{n:pf.3bet.ip-total}}. {{t:out-of-position|Out of position}}, for example from the blinds against an {{t:open}} from the {{t:cutoff}} or Button, you go to about {{n:pf.3bet.size-oop}} the {{t:open}}, i.e. {{n:pf.3bet.oop-total}}. The larger size {{t:out-of-position}} denies your opponent a cheap {{t:call}} that would later let them play with the {{t:position}} advantage.

## {{t:position|Position}} decides whether to {{t:call}}

According to published solver solutions, the Button facing an {{t:open}} from the {{t:cutoff}} usually 3-bets about {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} of hands and {{t:call|calls}} only about {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Against an {{t:open}} from {{t:utg}} (a minimum {{t:open}} in this solution, to {{n:pf.open-size.solver-utg}}), there are already slightly more {{t:call|calls}} than 3-bets: about {{n:pf.call-freq.btn-vs-utg}} versus {{n:pf.3bet-freq.btn-vs-utg}}. The {{t:utg}} {{t:range}} is strong, so a 3-bet more often faces a 4-bet and less often wins the {{t:pot}} right away.

```range
vs-open.btn-vs-co
```

The grid shows only which hands the Button plays (with a 3-bet or a {{t:call}}) and which it {{t:fold|folds}}. Learn the split between 3-bet and {{t:call}} from the numbers above: the app's solver almost never {{t:call|calls}} in this spot, so it doesn't reproduce that split. In a dozen or so hands, e.g. A8s, 98s and 44, the app's solver plays differently from the published solutions, so the drills don't grade them.

From the {{t:small-blind}}, you almost always {{t:raise}} or {{t:fold}}. A {{t:call}} means playing {{t:out-of-position}}, and the {{t:big-blind}} behind you can still {{t:raise}}. {{t:out-of-position|Out of position}}, a hand has worse **{{t:equity-realization}}**: it wins a smaller share of the {{t:pot}} than its equity suggests, because you {{t:fold}} more often before showdown and find it harder to win the {{t:pot}} with a {{t:bet}}.

```range
vs-open.sb-vs-btn
```

According to the published solver solution, the {{t:small-blind}} against the Button {{t:call|calls}} almost nothing: it 3-bets about {{n:pf.3bet-freq.sb-vs-btn}} of hands, the top of its {{t:range}} (including 77+, AJo+, KQo, A5s, A4s, T9s), and {{t:fold|folds}} the rest. The app's solver 3-bets {{n:solver.3bet.sb-vs-btn}} of hands here, including {{t:pair|pairs}} 55 and 66, which the published solution also often 3-bets; the grid counts its few {{t:call|calls}} as {{t:fold|folds}}. In a few hands, e.g. ATo, T9s and A4s, the app's solver plays differently from the published solutions, so the drills don't grade them.

## {{t:linear|Linear}} or {{t:polarized}} {{t:range}}

With {{t:position}} against an {{t:open}} from the {{t:cutoff}}, you mainly 3-bet the best hands from the top and add a few {{t:bluff|bluffs}} with suited aces (A5s, A4s), while you play medium hands (e.g. 77–99, AJs, ATs, suited {{t:connectors}}) mixed: you 3-bet some and {{t:call}} with others. Your opponent often {{t:call|calls}}, so you want a hand that plays well in the {{t:pot}} after a {{t:call}}. Sources name such a {{t:range}} differently: some call it {{t:linear}} (built from the strongest hands down), others {{t:polarized}} (made up mainly of very strong hands and {{t:bluff|bluffs}}, with almost no medium ones); what matters more is which hands you 3-bet and which you {{t:call}}.

From the {{t:big-blind}} against the Button, you 3-bet your strongest hands (TT+, AQ+, AJs+) plus {{t:bluff|bluffs}} from the bottom of your {{t:call|calling}} {{t:range}}: A5s, sometimes A4s, and suited {{t:connectors}}. Suited aces block your opponent's AA and AK, and when they get a {{t:call}}, they can still make a {{t:flush}} or a {{t:straight}}. Medium and small {{t:pair|pairs}}, KQo and offsuit aces (AJo–A9o) you usually just {{t:call}} with: from the {{t:big-blind}} you get in cheaply and close the action, so these hands earn more after a {{t:call}}. The mix depends on the {{t:rake}} and the 3-bet size, so 99, KQo and AJo are played in different ways. Against an {{t:open}} from the {{t:small-blind}}, you 3-bet mainly for {{t:value}} (TT+, AJs+, some AQo and KQ), and you usually {{t:call}} with A5s and suited {{t:connectors}}.

From the {{t:small-blind}}, you play differently: 3-bet or {{t:fold}}, with the top of your {{t:range}} in the 3-bet.

:::note Where these rules come from
The Button and {{t:small-blind}} grids come from the app's solver and roughly match the sources (in the {{t:small-blind}}, apart from a few hands the drills don't grade). How to 3-bet from the {{t:big-blind}} is taught by a rule based on published results of other solvers from several independent sources: the makeup of {{t:big-blind}} 3-bets in the app's solver differs from them.
:::
