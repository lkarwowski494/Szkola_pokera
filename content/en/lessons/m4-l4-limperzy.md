---
id: m4.l4
module: m4
order: 4
title: "Limpers"
sub: "Isolation: size and range"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "One player ahead of you just called the {{t:big-blind}} (limp). You want to {{t:raise}} from the Button. To how much?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "To {{n:pf.iso.one-limper}}", correct: true, why: "Base {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} per limper. This size takes away the limper's good price." }
      - { text: "To {{n:pf.min-raise}}", why: "A minimum {{t:raise}} gives the limper a great price and almost never wins the {{t:pot}} right away." }
      - { text: "To {{n:pf.open-size}}, like a normal {{t:open}}", why: "The limper has already put in a blind, so the {{t:pot}} is bigger. The {{t:raise}} must be bigger than a normal {{t:open}}." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Two players ahead of you just called the {{t:big-blind}}. You want to {{t:raise}} from the {{t:cutoff|CO}}. To how much?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "To {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} for each of the two limpers." }
      - { text: "To {{n:pf.iso.one-limper}}", why: "That's the size against one limper. Each additional one adds {{n:pf.iso.per-limper}}." }
      - { text: "Just call", why: "Suited AQ is a hand to {{t:raise}} for {{t:value}}. Calling gives up the {{t:initiative}} and lets everyone in cheaply." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "One player limps and everyone folds to you in the {{t:small-blind}}. You want to {{t:raise}}. To how much?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "To {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Out of position}} you add another {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} per limper plus {{n:pf.iso.oop-extra}}." }
      - { text: "To {{n:pf.iso.one-limper}}", why: "That's the {{t:in-position}} size. {{t:out-of-position|Out of position}} you {{t:raise}} a bit more, so the opponent {{t:fold|folds}} more often or pays more." }
      - { text: "Just call", why: "With KK you always build the {{t:pot}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "One player ahead of you just called the {{t:big-blind}} (limp). You're on the Button. What do you do?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|Raise}} to {{n:pf.iso.one-limper}}", correct: true, why: "AJ is a hand for an {{t:isolation}}: it dominates many hands a weaker player limps with, and after the flop you have {{t:position}}. Size: {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} per limper." }
      - { text: "{{t:raise|Raise}} to {{n:pf.min-raise}}", sizeError: true, why: "Right action, but a minimum {{t:raise}} gives the limper a great price, so they almost never {{t:fold}} and you don't play heads-up against them. {{t:raise|Raise}} to {{n:pf.iso.one-limper}}." }
      - { text: "Call", why: "You give up the {{t:initiative}} and let the blinds in cheaply. With a hand that dominates the limper, you want to build the {{t:pot}}." }
      - { text: "{{t:fold|Fold}}", why: "Too tight: against one limper the Button {{t:isolation|isolation-raises}} about {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} of hands, and AJ fits in comfortably." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Three players ahead of you just called the {{t:big-blind}}. You're on the Button. What do you do?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Call", correct: true, why: "Against many limpers, suited {{t:connectors}} are speculative hands: you see the flop cheaply {{t:in-position}} and can hit a big hand. One source recommends calling here; another advises avoiding it, so we also accept a {{t:fold}}." }
      - { text: "{{t:fold|Fold}}", correct: true, why: "Also correct: one source advises not calling, but to {{t:raise}} or {{t:fold}} instead, and 76s isn't a hand to {{t:raise}} for {{t:value}}. Another source recommends calling, so we accept both plays." }
      - { text: "{{t:raise|Raise}} to {{n:pf.iso.two-limpers}}", why: "With three limpers, a {{t:bluff}} {{t:raise}} rarely takes down the {{t:pot}}, and the size should be even bigger. 76s isn't a hand to {{t:raise}} for {{t:value}}." }
---
A limp is entering the hand by just calling the {{t:big-blind}}. Professionals rarely limp first in (a rule from module 3), so limpers at micro stakes are usually weaker players. {{t:raise|Raising}} a limper is called an {{t:isolation}}: you want to play heads-up against them, ideally {{t:in-position}}.

:::note Where these rules come from
The app's solver doesn't play limps, so this lesson is based on training materials. The rules are marked as heuristics.
:::

## {{t:isolation|Isolation raise}} size

Online you {{t:raise}} to {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} per limper: against one to {{n:pf.iso.one-limper}}, against two to {{n:pf.iso.two-limpers}}. {{t:out-of-position|Out of position}} you add another {{n:pf.iso.oop-extra}}. Never min-raise: the limper would get a great price and almost never {{t:fold}}.

## {{t:isolation|Isolation raise}} {{t:range}}

On the Button against one limper you {{t:isolation|isolation-raise}} wide, about {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} of hands: medium and high {{t:pair|pairs}}, suited aces, strong offsuit aces, high cards and some suited {{t:connectors}}. The earlier your {{t:position}} and the more limpers, the narrower your {{t:range}}: against three limpers you {{t:raise}} mostly for {{t:value}}.

Against many limpers, you can call {{t:in-position}} with speculative hands such as small {{t:pair|pairs}} and suited {{t:connectors}}. Here the sources differ: one recommends calling, the other advises avoiding it; in the drills we accept both plays, calling and {{t:fold|folding}}.
