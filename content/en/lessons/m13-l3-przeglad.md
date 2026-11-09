---
id: m13.l3
module: m13
order: 3
title: "Reviewing hands from real play"
sub: "What to review and how"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "During a live game, you play a hand where you don't know what to do. What do you do with it later?"
    options:
      - { text: "Make a short note and review it after the {{t:session}}", correct: true, why: "Yes: during play you only mark the hand and analyze it later, with a clear head. Judgment under emotion can be wrong." }
      - { text: "Analyze it right away while I still remember it", why: "A short note is enough so you don't forget. Do the full analysis later, with a clear head." }
      - { text: "Nothing, only the next hand matters", why: "Hands where you didn't know what to do are worth reviewing. Mark them and come back to them after the {{t:session}}." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "You just lost a big {{t:pot}} and you're upset. When is the best time to review this hand?"
    options:
      - { text: "A few hours later or the next day", correct: true, why: "Yes: the best time to review is a few hours or days after the {{t:session}}, with a clear head. Right after a loss, it's easy to mistake a good decision for an error, or the other way around." }
      - { text: "Right away, so I don't forget the details", why: "Write down the details right away, but postpone the judgment. When you're emotional, your judgment is colored by the result." }
      - { text: "Never, it was just bad luck", why: "Maybe it was bad luck, maybe it was a mistake. You'll only find out by reviewing it once your emotions have settled." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Which of these hands is least worth analyzing at length?"
    options:
      - { text: "A set lost to a higher set on a {{t:dry}} {{t:board}}; you both got your stacks in", correct: true, why: "Yes: that's a cooler. No reasonable player would {{t:fold}} a set here. Coolers happen to everyone and teach little." }
      - { text: "A big lost {{t:pot}} where you didn't know whether to {{t:call}} on the river", why: "This is a good candidate for review: a big {{t:pot}} and a hard decision." }
      - { text: "A medium {{t:pot}} where your opponent outplayed you and you felt lost", why: "Hands like this are worth reviewing: you felt something went wrong, and it's worth seeing what." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "You lost a big {{t:pot}}, but you think you played it well. Is it worth reviewing?"
    options:
      - { text: "Yes: decisions in a big {{t:pot}} carry the most weight, even if you played well", correct: true, why: "Yes: big {{t:pot|pots}}, especially lost ones, are the decisions with the most weight. Even if you played well, it's worth knowing why. You skip only obvious coolers." }
      - { text: "No: if I played well, there's nothing to look for", why: "Certainty without a review is still just a first reaction. A big {{t:pot}} is a good reason to review it." }
      - { text: "Only if I lost to a rare hand", why: "The type of hand your opponent had doesn't decide it. What matters is whether the decision was hard or the {{t:pot}} was big." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "You're starting to review a river decision. What do you do first?"
    options:
      - { text: "Write down my first reaction, e.g. “easy {{t:call}}”, and only then do the math", correct: true, why: "Yes: comparing your first reaction with the math shows where your intuition misleads you. Over time, your intuition improves." }
      - { text: "Calculate {{t:equity}} right away", why: "The math is necessary, but without a written first reaction you won't see where your intuition is wrong." }
      - { text: "Look at what cards my opponent had", why: "Your opponent's cards from the showdown are the result, not information you had at the moment of the decision. Judge the decision against their possible hands." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "You're reviewing a river {{t:call}}. Even with a pessimistic assumption about your opponent's {{t:range}} (few {{t:bluff|bluffs}}), you have enough {{t:equity}}. What next?"
    options:
      - { text: "I can stop: the decision is good under any reasonable assumption", correct: true, why: "Yes: the extreme assumptions set the bounds. If the decision is good even under the pessimistic one, the realistic assumption will confirm it too." }
      - { text: "I still need to calculate the realistic case", why: "You don't: the realistic assumption lies between the extremes, and since both lead to the same conclusion, the result won't change." }
      - { text: "Switch to an optimistic assumption, because the pessimistic one is exaggerated", why: "You start with the extremes to set the bounds. If the pessimistic one gives a good result, the optimistic one will all the more." }
---
The app reviews hands from games against bots for you. Hands played outside the app you review yourself. This lesson collects coaches' tips.

## Mark during play, analyze after the {{t:session}}

During play, you only mark hands that seemed interesting, hard, or strange: a short note is enough. It's best to review a few hours or days after the {{t:session}}, with a clear head. The worst time is right after a big loss or when you're tired.

## What to review

- Big {{t:pot|pots}}, especially lost ones: that's where decisions carry the most weight.
- Hands where you didn't know what to do, or felt your opponent outplayed you.
- Wins too: a mistake that paid off costs just as much (see the lesson on decisions and results).

Don't spend much time on coolers and bad beats. A cooler is a hand where two strong hands meet and neither could reasonably {{t:fold}}, e.g. a set against a higher set. Hands like these happen to everyone and teach little.

## How to review a decision

1. Write down the hand: {{t:position|positions}}, stacks, actions, and sizes on each {{t:street}}.
2. Write down your first reaction: whether the decision seems easy or hard.
3. Calculate: the price, {{t:equity}}, and what you knew at the moment of the decision.
4. Check the decision under three assumptions about your opponent's {{t:range}}: optimistic, pessimistic, and realistic. If it's good even under the pessimistic one, you can stop.
5. Write down the difference between your first reaction and the math. Over time, your intuition improves.

:::note Where these rules come from
Three training materials on reviewing hands: when and what to review; coolers and bad beats; first reaction and three assumptions about the opponent. These are coaches' heuristics, not solver results.
:::
