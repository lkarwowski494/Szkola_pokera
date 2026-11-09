---
id: m11.l3
module: m11
order: 3
title: "ICM and bubble factor"
sub: "Chips are not money"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Three players remain and two places are paid. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} and {{n:m11.icm.a.s3}} {{t:chips}}. According to the {{t:icm}}, what is the shortest stack's chance of 1st place? Enter a percentage."
    answer: m11.icm.a.chips3
    explanation: "Chance of 1st place = stack ÷ all {{t:chips}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Same stacks ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). The big stack took 1st place. What is the shortest stack's chance of 2nd place now?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Two players remain with {{n:m11.icm.a.rest1}} {{t:chips}}, of which the short one has {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "That is the chance of 1st place, counted from all {{t:chips}}. Once the winner is out of the count, divide only by the remaining players' {{t:chips}}: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "That is the {{t:short-stack}}'s total chance of 2nd place across both possible winners. The question is about the case where the big stack won." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Payouts}}: {{n:m11.icm.a.p1}} of the {{t:prize-pool}} for 1st place and {{n:m11.icm.a.p2}} for 2nd. Stacks {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. According to the {{t:icm}}, what is the shortest stack worth (as a percentage of the {{t:prize-pool}})? Enter a number."
    answer: m11.icm.a.eq3
    explanation: "Chance of 1st place {{n:m11.icm.a.chips3}}, of 2nd place {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, more than its {{n:m11.icm.a.chips3}} of the {{t:chips}}."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "The big stack holds {{n:m11.icm.a.chips1}} of the {{t:chips}} in play. According to the {{t:icm}}, what is it worth in money?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, i.e. less than its share of {{t:chips}}", correct: true, why: "The big stack can win at most {{n:m11.icm.a.p1}} of the {{t:prize-pool}}, even though it has a chance at all the {{t:chips}}. That is why the leader's {{t:chips}} are worth less than their share, and the {{t:short-stack}}'s are worth more ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, the same as its share of {{t:chips}}", why: "That would be true if the winner took the whole {{t:prize-pool}}. With {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}} {{t:payout|payouts}}, each of the big stack's {{t:chips}} is worth less: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, because it will almost certainly win", why: "It has only a {{n:m11.icm.a.chips1}} chance of 1st place; the rest of its equity comes from 2nd place. Total: {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bubble}}: four players, three places paid. If you {{t:call}} an all-in, you lose {{n:m11.bf.loss}} of the {{t:prize-pool}} when you lose and gain {{n:m11.bf.gain}} when you win. What is the bubble factor? Enter a number with two decimal places."
    answer: m11.bf.value
    explanation: "Bubble factor = loss ÷ gain = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Losing hurts almost one and a half times more than winning helps."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "The bubble factor is {{n:m11.bf.value}}. How much equity do you need for a {{t:call}} of the all-in to pay off? Enter a percentage."
    answer: m11.bf.req
    explanation: "Required equity = BF ÷ (BF + 1), i.e. loss ÷ (loss + gain) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. In a game for {{t:chips}}, {{n:m11.bf.req-chips}} would be enough."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "In a game for {{t:chips}}, {{n:m11.bf.req-chips}} equity is enough to {{t:call}} this all-in, but according to the {{t:icm}} you need {{n:m11.bf.req}}. What is the difference called?"
    options:
      - { text: "{{t:risk-premium|Risk premium}} ({{n:m11.bf.premium}})", correct: true, why: "{{t:risk-premium|Risk premium}} is the extra equity the {{t:icm}} requires above the price in {{t:chips}}: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "The bubble factor is the ratio of loss to gain ({{n:m11.bf.value}}). You use it to calculate the required equity, and the difference compared with a game for {{t:chips}} is the {{t:risk-premium}}." }
      - { text: "Fold equity", why: "Fold equity is the profit from an opponent's {{t:fold|folds}}. When you {{t:call}} an all-in, you don't have any." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bubble}}, the example from the lesson. Your hand has about {{n:m11.bf.example-eq}} equity against your opponent's all-in {{t:range}}. In a game for {{t:chips}}, a {{t:call}} would pay off, because {{n:m11.bf.req-chips}} is enough. What do you do here?"
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "According to the {{t:icm}}, you need {{n:m11.bf.req}} equity here. A hand that wins less often loses money, even though it would be profitable in {{t:chips}}." }
      - { text: "{{t:call|Call}}, because it's profitable in {{t:chips}}", why: "In a {{t:tournament}} with {{t:payout|payouts}}, money matters, not {{t:chips}}. Losing costs you {{n:m11.bf.loss}} of the {{t:prize-pool}}, while winning gives you only {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Call}}, because I win more than half the time", why: "A hand with {{n:m11.bf.example-eq}} wins more than half the time, yet it's still too weak here: the threshold is {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:tournament|Tournament}} {{t:bubble}}. You have the biggest stack at the table and {{t:cover}} everyone. The medium stack folds to you very often. What follows from this?"
    options:
      - { text: "You can {{t:shove}} wider, because your opponents {{t:call}} tight", correct: true, why: "When the medium stack calls, it risks busting just before the prizes, so it needs a lot of equity. When you lose, you lose only part of your stack. Your opponents {{t:call}} tight, so you take down the {{t:pot}} uncontested more often." }
      - { text: "You play tighter so you don't lose the lead", why: "The leader has the least risk at the table. Playing tight gives up their main edge: pressure on the medium stacks." }
      - { text: "Nothing, because the {{t:icm}} only applies to {{t:short-stack|short stacks}}", why: "The {{t:icm}} applies to everyone: it changes how much equity each player needs to {{t:call}}, and that depends on the whole distribution of stacks." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "What does the {{t:icm}} assume?"
    options:
      - { text: "That everyone plays equally well and only stacks decide the finishing places", correct: true, why: "The {{t:icm}} converts stacks alone into chances of finishing in each place. It knows nothing about {{t:position}}, rising blinds or skill edges." }
      - { text: "That the better player wins more often", why: "The opposite: the {{t:icm}} assumes equal skill. It doesn't account for a player's edge at all." }
      - { text: "That the player in the {{t:big-blind}} has lower chances", why: "The {{t:icm}} knows nothing about {{t:position}} or blinds: it looks only at stacks. That is one of its limitations." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
In a game for money (cash), a {{t:chips|chip}} is money: one won and one lost are worth the same. In a {{t:tournament}}, that is not the case. Prizes go to the first few places, and the winner doesn't take the whole {{t:prize-pool}}, even though they take all the {{t:chips}}. That is why {{t:chips}} have to be converted into money.

## {{t:icm}}: a stack in money

The Independent {{t:chips|Chip}} Model ({{t:icm}}) converts stacks into chances of finishing in each place. It assumes everyone plays equally well, so only stacks decide the order of finish.

```formula
chance of 1st place = your stack ÷ all chips
```

You calculate the chance of 2nd place the same way, but separately for each possible winner: subtract their {{t:chips}} and divide by what remains. A stack's {{t:tournament-equity}}, i.e. its expected share of the {{t:prize-pool}}, is the sum of: chance of a place × {{t:payout}} for that place.

## Example: three players on the {{t:bubble}}

Two places are paid: {{n:m11.icm.a.p1}} and {{n:m11.icm.a.p2}} of the {{t:prize-pool}}. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} and {{n:m11.icm.a.s3}} {{t:chips}}.

- The {{t:short-stack}} wins the {{t:tournament}} with a chance of {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- For 2nd place: if the big stack wins ({{n:m11.icm.a.chips1}}), the short stack finishes second with a chance of {{n:m11.icm.a.second3.via1}}; if the medium stack wins ({{n:m11.icm.a.chips2}}), with a chance of {{n:m11.icm.a.second3.via2}}. Total: {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (the components are rounded).
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** of the {{t:prize-pool}}.

| Stack | Share of {{t:chips}} | Equity according to the {{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

The {{t:short-stack}} is worth more than its {{t:chips}}, and the big one less: the leader can't get more than the prize for 1st place.

## Bubble factor: losing hurts more

Four players, three places paid: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} and {{n:m11.bf.p3}}. Stacks {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (you), {{n:m11.bf.s3}} and {{n:m11.bf.s4}}. The player with {{n:m11.bf.s3}} goes all-in, and you {{t:cover}} them, meaning you have more {{t:chips}}. For simplicity, we ignore the blinds in the {{t:pot}}.

- Right now your stack is worth {{n:m11.bf.eq.now}} of the {{t:prize-pool}}.
- If you win: you have {{n:m11.bf.win}}, your opponent is out, and everyone is in the money. Your equity rises to {{n:m11.bf.eq.win}}, i.e. by **{{n:m11.bf.gain}}**.
- If you lose: you're left with {{n:m11.bf.lose}}, and your equity drops to {{n:m11.bf.eq.lose}}, i.e. by **{{n:m11.bf.loss}}**.

```formula
bubble factor = loss when you lose ÷ gain when you win
```

Here {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. The app uses this definition (loss ÷ gain): in a game for {{t:chips}}, where the loss equals the gain, the bubble factor is one. Some push/fold charts calculate the bubble factor differently, on a different scale, so don't compare their numbers directly with these. The required equity follows from it:

```formula
required equity = BF ÷ (BF + 1)
```

That comes to **{{n:m11.bf.req}}**. In a game for {{t:chips}}, you risk {{n:m11.bf.s3}} to win {{n:m11.bf.s3}}, so {{n:m11.bf.req-chips}} would be enough. The difference, {{n:m11.bf.premium}}, is the **{{t:risk-premium}}**.

The same direction shows up in a published equilibrium for three players with equal stacks (a 2008 research paper): when the Button and the {{t:small-blind}} are already all-in, the {{t:big-blind}} {{t:call|calls}} with {{n:m11.jamfold3.overcall.single}} of hands in a single-hand game, but in a {{t:tournament}} with {{t:payout|payouts}} with only {{n:m11.jamfold3.overcall.tourn}}, i.e. only the highest {{t:pocket-pair|pocket pairs}} and AKs.

:::note Who {{t:call|calls}} tight
A medium stack on the {{t:bubble}} or at the {{t:final-table}} (the last table of a {{t:tournament}}, where the top prizes are played for) {{t:call|calls}} all-ins much tighter than in a game for {{t:chips}}. A big stack that {{t:cover|covers}} its opponents risks less and can exploit this: {{t:shove}} wider, because the opponents have to {{t:fold}}. The bubble factor depends on all the stacks at the table, so it isn't calculated at the table; instead, practice it on examples to build a feel for it.
:::

## Limitations of the {{t:icm}}

The {{t:icm}} doesn't account for {{t:position}}, rising blinds or players' skill. It is an approximation, not an exact valuation of a {{t:tournament}}.
