---
id: m3.l1
module: m3
order: 1
title: "Position at the table"
sub: "Why your seat matters"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "Which {{t:position}} is the best?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "From the flop on, the Button acts last, so it always knows the opponents' decisions before making its own." }
      - { text: "{{t:big-blind|Big blind}}", why: "The {{t:big-blind|BB}} pays less to enter because it has already put money in, but from the flop on it acts among the first." }
      - { text: "{{t:utg|UTG}}", why: "{{t:utg|UTG}} acts first preflop and has the whole table behind it. It's the hardest spot to open from." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Everyone before you has {{t:fold|folded}}. What do you do?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Offsuit K9 is outside the {{t:utg|UTG}} {{t:open|opening}} {{t:range}}, the list of hands you {{t:open}} with from this {{t:position}}. Five players are behind you, and someone often has a king with a better kicker." }
      - { text: "{{t:raise|Raise}}", why: "From {{t:utg|UTG}} you {{t:open}} only about {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} of hands. K9o easily hits a king and loses to KQ or AK." }
      - { text: "Call the {{t:big-blind}}", why: "Just calling (a limp) from {{t:utg|UTG}} is a bad habit. Either the hand is worth a {{t:raise}}, or you {{t:fold}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Same hand, but you're on the Button and everyone before you has {{t:fold|folded}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Raise}}", correct: true, why: "Only the blinds are left, and after the flop you have {{t:position}}. On the Button you {{t:open}} about {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} of hands, and K9o is within that." }
      - { text: "{{t:fold|Fold}}", why: "Too cautious. Against just the blinds this hand is good enough, and {{t:position}} adds to its value." }
      - { text: "Call the {{t:big-blind}}", why: "A limp gives up the {{t:initiative}}. A {{t:raise}} often wins the blinds right away." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Why does acting last help?"
    options:
      - { text: "I know what the opponents did before I decide", correct: true, why: "Every opponent action is information. The last player has the most of it and can {{t:check}} cheaply or take the {{t:pot}} when others show weakness." }
      - { text: "I get better cards", why: "Cards are random regardless of {{t:position}}." }
      - { text: "I pay smaller blinds", why: "On the Button you don't pay blinds, but that isn't the main advantage. The most important thing is information." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
The dealer button (**{{t:button|BTN}}**, Button) moves every hand. It determines the order of action. From the flop on, the Button acts **last**, and that's a huge advantage: you see what everyone else did before you decide. Whoever acts before an opponent after the flop plays {{t:out-of-position}}: they decide without knowing the opponent's move.

## {{t:position|Positions}} at a 6-handed table

| {{t:position|Position}} | When it acts | How wide to {{t:open}} |
|---|---|---|
| {{t:utg|UTG}} | First preflop | about {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} of hands |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | After {{t:utg|UTG}}; {{t:cutoff|CO}} right before the Button | wider and wider |
| {{t:button|BTN}} | Last from the flop on | about {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} of hands |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Last preflop, first from the flop on | {{t:small-blind|SB}} {{t:open|opens}} when everyone {{t:fold|folds}} (lesson on {{t:range|ranges}}); blind defense in module M4 |

**{{t:hijack|HJ}}** (Hijack) sits after {{t:utg|UTG}}, two seats before the Button, and **{{t:cutoff|CO}}** (Cutoff) sits right before the Button. These are middle {{t:position|positions}}: fewer players are behind them than behind {{t:utg|UTG}}, so you {{t:open}} wider from them, but still tighter than from the Button.

:::note {{t:open|Open}} size
You {{t:open}} with a {{t:raise}} to {{n:pf.open-size}} from every {{t:position}}, and from the {{t:small-blind}} to {{n:pf.open-size-sb}}. This is a simplification: in solver solutions, {{t:open|opens}} from {{t:early-position|early positions}} are slightly smaller (e.g. {{n:pf.open-size.solver-utg}} from {{t:utg|UTG}} and {{n:pf.open-size.solver-co}} from {{t:cutoff|CO}}), but one size is easier to learn. When you're first in, don't just pay the blind (that's a {{t:limp}}, entering by simply making a {{t:call}} of the {{t:big-blind}}): a {{t:raise}} can win the {{t:pot}} right away and gives you the {{t:initiative}}, because whoever {{t:raise|raised}} last usually makes the next {{t:bet}}.
:::
