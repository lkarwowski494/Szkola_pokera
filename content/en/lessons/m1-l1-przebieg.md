---
id: m1.l1
module: m1
order: 1
title: "How a hand plays out"
sub: "Blinds, streets and available moves"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "It's the flop and nobody before you has {{t:bet}}. What can you do?"
    options:
      - { text: "{{t:check|Check}} or {{t:bet}}", correct: true, why: "With no {{t:bet}} before you, you have two options: let it pass for free or {{t:bet}} yourself." }
      - { text: "{{t:call|Call}}", why: "There's nothing to {{t:call}}, because nobody has {{t:bet}} anything." }
      - { text: "{{t:raise|Raise}}", why: "You can only {{t:raise}} someone else's {{t:bet}}. The first wager in a round is called a bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "How many {{t:community-cards}} appear on the flop?"
    options:
      - { text: "3", correct: true, why: "The flop is three cards at once. Then the turn and the river add one each." }
      - { text: "1", why: "The turn and the river come one card at a time." }
      - { text: "5", why: "All five {{t:community-cards}} are out only on the river." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "Your opponent {{t:bet}} 20 {{t:chips}}. You have a weak hand and don't want to keep playing. What do you do?"
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "When there's a {{t:bet}} and you don't want to pay, you {{t:fold}}. You lose only what you've already put in." }
      - { text: "{{t:check|Check}}", why: "Checking isn't possible when there's a {{t:bet}} to {{t:call}}." }
      - { text: "{{t:call|Call}}", why: "{{t:call|Calling}} costs 20 {{t:chips}}. Since you don't want to play, that's a loss." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Which {{t:betting-round}} is the last one?"
    options:
      - { text: "River", correct: true, why: "The river is the fifth {{t:community-cards|community card}}. If at least two players remain after the betting on the river, they reveal their cards (showdown)." }
      - { text: "Turn", why: "The turn is the fourth card. The river still comes after it." }
      - { text: "Flop", why: "The flop is the first round with {{t:community-cards}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "You're in the {{t:big-blind}}, everyone has {{t:fold|folded}}, and the {{t:small-blind}} only completed. You have a weak hand. What do you do?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "Your {{t:big-blind}} counts as a {{t:bet}}, and the {{t:small-blind}} only matched it. Nobody has {{t:raise|raised}}, so you see the flop for free. A weak hand is no reason to fold when it costs nothing." }
      - { text: "{{t:fold|Fold}}", why: "{{t:fold|Folding}} when you can {{t:check}} for free is a pure loss." }
      - { text: "{{t:raise|Raise}}", why: "With 7-2 you have nothing to build on; a {{t:check}} gives you a free flop." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
Every hand follows a fixed order. First, two players put in forced bets called **blinds**: the {{t:small-blind}} and the {{t:big-blind}}. This way there's always something to play for in the {{t:pot}}.

Before the flop, the {{t:big-blind}} counts as a {{t:bet}}: anyone who wants to play must at least {{t:call}} it. The {{t:big-blind}} acts last before the flop. If nobody has {{t:raise|raised}}, they can {{t:check}} and see the flop without paying more.

## Four {{t:betting-round|betting rounds}}

1. **Preflop**: you have only your 2 cards.
2. **Flop**: 3 {{t:community-cards}} go on the {{t:board}}.
3. **Turn**: the fourth card.
4. **River**: the fifth and final card.

If at least two players are still in the hand after the betting on the river, they reveal their cards. This is the **showdown**: the best hand wins the {{t:pot}}. If everyone but one player {{t:fold|folds}} earlier, that player wins the {{t:pot}} without showing their cards.

## Available moves

- **{{t:check|Check}}**: you put in nothing. Only when nobody before you has {{t:bet}} or {{t:raise|raised}} in this round (before the flop, the {{t:big-blind}} can {{t:check}} if nobody has {{t:raise|raised}}).
- **{{t:bet|Bet}}**: the first {{t:bet}} in a round. In formulas in later lessons we write it simply as “bet”.
- **{{t:call|Call}}**: you match your opponent's {{t:bet}}.
- **{{t:raise|Raise}}**: you increase someone else's {{t:bet}}.
- **{{t:fold|Fold}}**: you throw away your cards and lose what you've already put in.

:::note Remember
If someone has {{t:bet}}, you can {{t:fold}}, {{t:call}} or {{t:raise}}. If nobody has {{t:bet}}, you can {{t:check}} or {{t:bet}}.
:::

:::note All-in and the {{t:side-pot}}
You can't {{t:bet}} more than you have in front of you. When you put in all your {{t:chips}}, you're **all-in**: you take no further part in the betting, and the remaining {{t:community-cards}} are dealt out to the end. From each opponent you can win at most as much as you put in yourself. If the others keep playing for more, the excess goes into a **{{t:side-pot}}**, which only they compete for.
:::
