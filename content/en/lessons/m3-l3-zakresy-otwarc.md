---
id: m3.l3
module: m3
order: 3
title: "Opening ranges"
sub: "What to enter with first, position by position"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "Everyone before you has {{t:fold|folded}}, and you're on the Button. Paint the hands you {{t:open}} with."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "You're first to act ({{t:utg|UTG}}). Paint the hands you {{t:open}} with."
---
An {{t:open|opening}} {{t:range}} is the list of hands you {{t:raise}} with when everyone before you has {{t:fold|folded}}. The grids below were calculated by this app's preflop solver for play at a 6-player table with {{n:format.stack}} stacks.

## How to read the grid

Each cell is one kind of hand. Above the diagonal are suited hands (e.g. AKs), below it offsuit hands (e.g. AKo), and on the diagonal {{t:pair|pairs}}. A green cell is a {{t:raise}}, an empty one is a {{t:fold}}. A partly filled cell means the solver plays the hand only some of the time. If it {{t:open|opens}} the hand at a frequency between {{n:range.mixed.low}} and {{n:range.mixed.high}} (these thresholds are an app setting), it's a {{t:mixed-hand}}: in drills we then accept both answers. An action the solver plays less often than {{n:range.mixed.low}} of the time, but at least {{n:range.mixed.min}}, is treated by the drills as acceptable: it's not a mistake, but the review of that task will come back sooner. An action the solver plays less often than {{n:range.mixed.min}} of the time is rated by the drills as an inaccuracy (that's what the rating scale published by the solver's site calls such moves), and an action the solver never plays is rated as a mistake.

## From the first {{t:position}} to the Button

```range
rfi.utg
```

From {{t:utg|UTG}}, the solver {{t:open|opens}} {{n:solver.rfi.utg}} of hands. Professional sources give {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

With each {{t:position}} closer to the Button, the {{t:range}} grows: the {{t:hijack|HJ}} {{t:open|opens}} {{n:solver.rfi.hj}}, and the {{t:cutoff|CO}} as much as {{n:solver.rfi.co}} of hands.

```range
rfi.btn
```

On the Button, the solver {{t:open|opens}} as much as {{n:solver.rfi.btn}} of hands, because only the blinds are left and you'll have {{t:position}} after the flop.

```range
rfi.sb
```

The {{t:small-blind}} plays only against the {{t:big-blind}}, so it {{t:open|opens}} about as wide as the Button: around {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} of hands, even though it acts first after the flop. At micro {{t:stakes}}, from the {{t:small-blind}} you either {{t:raise}} or {{t:fold}}, without completing to the {{t:big-blind}}: the {{t:rake}} taken from the {{t:pot}} reduces the profit from completing. This is a simplification: some solver solutions complete with some hands from the {{t:small-blind}}. The app's solver {{t:open|opens}} {{n:solver.rfi.sb}} of hands from here, which is within the interval given by the sources.

:::note At a 9-player table
At a 9-player table, there are three more {{t:position|positions}} before the {{t:hijack|HJ}}: {{t:utg|UTG}}, {{t:utg|UTG}}+1 and {{t:utg|UTG}}+2, followed by the LJ. Eight players then sit behind {{t:utg|UTG}}, so from {{t:utg|UTG}}, {{t:utg|UTG}}+1 and {{t:utg|UTG}}+2 you {{t:open}} tighter than from {{t:utg|UTG}} at a 6-player table: more players sit behind you. When those three players {{t:fold}}, the LJ plays like {{t:utg|UTG}} at a 6-player table, and the later {{t:position|positions}} play the same as in the grids above. For the early {{t:position|positions}} at a 9-player table, we give only the direction: we haven't yet checked the numbers or the composition of these {{t:range|ranges}} against published solver solutions.
:::

:::note How to remember
Don't memorize {{n:combos.kinds}} cells. Remember the boundaries: which {{t:pair|pairs}}, which suited aces, and from which card the offsuit hands start. The drills below deal hands from the edge of the {{t:range}} more often.
:::

These {{t:range|ranges}} come from a model that simplifies postflop play, so in a dozen or so hands at the edge of the {{t:range}} they differ from professional charts, sometimes in one direction, sometimes in the other. These are mainly gapped suited hands (e.g. 75s, 97s) and weak offsuit hands (e.g. A4o, K7o). The drills don't grade these hands.
