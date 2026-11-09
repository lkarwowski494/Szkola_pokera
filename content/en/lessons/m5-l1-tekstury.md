---
id: m5.l1
module: m5
order: 1
title: "Flop texture"
sub: "Height, suits, connectedness"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Which of these flops is {{t:connected}}, meaning a {{t:straight}} is already possible on it?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Yes: the nine, seven and six fit within five consecutive ranks. For example, 85 or T8 make a {{t:straight}}." }
      - { text: "[[Ks 8d 3c]]", why: "No: the three is too far from the king. No two cards make a {{t:straight}} here." }
      - { text: "[[Qd Qs 9h]]", why: "No: the flop is {{t:paired}}. With two cards in hand and a {{t:pair}} on the {{t:board}}, a {{t:straight}} is impossible, because a {{t:straight}} needs five different ranks." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "The flop is {{t:monotone}}: all three cards are of the same suit. What does this mean?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "A player with two cards of that suit already has a {{t:flush}}", correct: true, why: "Yes: three hearts on the {{t:board}} and two in hand make five cards of one suit. A player with one heart has a {{t:flush-draw}}." }
      - { text: "Nobody can have a {{t:flush}} yet", why: "No: a {{t:flush}} needs five cards, and three are already on the {{t:board}}. Two in hand are enough." }
      - { text: "A {{t:flush}} is only possible from the turn on", why: "No: that is the case on a {{t:two-tone}} flop. On a {{t:monotone}} one, a {{t:flush}} can already be made." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "You have [[Ac Kd]] and the flop is [[Ks 7d 2c]]. Why is a {{t:pair}} with a good kicker safer on a flop like this than on a {{t:wet}} flop?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Because your opponent has no {{t:draw}}, so later cards rarely change who is ahead", correct: true, why: "Yes: the flop is {{t:rainbow}} and a {{t:straight}} is not possible. An opponent who is behind now usually has few outs: a few cards for {{t:three-of-a-kind}} or {{t:two-pair}}, and without a {{t:pair}} they need two good cards in a row." }
      - { text: "Because on a {{t:dry}} flop your opponent always {{t:fold|folds}}", why: "No: an opponent with a seven, a deuce or a weaker king can {{t:call}}. A {{t:dry}} flop tells you about {{t:draw|draws}}, not whether your opponent will {{t:fold}}." }
      - { text: "Because a {{t:pair}} of kings always holds up until the river", why: "No: your opponent may already have a set or {{t:two-pair}}. A {{t:dry}} flop only reduces the risk that someone catches up." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
After the flop, every player already sees five of their seven cards. How the three cards on the {{t:board}} fit the players' hands is called the flop {{t:texture}}. {{t:texture|Texture}} determines who hits more often and whether betting is worthwhile. Before you learn the c-bet (a {{t:bet}} on the flop after a preflop {{t:raise}}), learn to read the flop on four axes.

## Height

Look at the highest card. A **high** flop has an ace, king or queen as its highest card, e.g. [[Ks 7d 2c]]. A **middle** flop has a jack or ten as its highest card, e.g. [[Jh 8c 4d]]. A **low** flop has a nine or lower as its highest card, e.g. [[7s 6h 5d]].

## Suits

A **{{t:rainbow}}** flop has three different suits: nobody has a {{t:flush-draw}} yet. A **{{t:two-tone}}** flop has two cards of one suit, e.g. [[Jh Th 8c]]: a player's two cards of that suit give a {{t:flush-draw}}. A **{{t:monotone}}** flop has all three cards of one suit, e.g. [[Kh 8h 3h]]: a {{t:flush}} may already be made.

## Ranks

A **{{t:paired}}** flop has two cards of the same rank, e.g. [[Qd Qs 6h]]. Nobody has a {{t:straight}} on it with two cards in hand, although a {{t:straight-draw}} is sometimes possible (e.g. on Q-Q-9).

A **{{t:connected}}** flop has three different ranks within five consecutive ones, so a {{t:straight}} is already possible: on [[9h 7d 6c]], for example, 85 and T8 make a {{t:straight}}. The ace also counts as a one, so [[Ah 5d 3c]] is {{t:connected}} too.

A **{{t:semi-connected}}** flop has only two of its cards within five consecutive ranks. Nobody has a {{t:straight}} yet, but someone may have a {{t:straight-draw}} (open-ended or gutshot): on [[Kh Qd 4c]], for example, JT has one. Such flops are common, because two cards close together are enough.

A **{{t:disconnected}}** flop has cards so far apart that no two fit within five consecutive ranks, e.g. [[Ks 8d 3c]]. Nobody has even a {{t:straight-draw}} here. Such flops are rare.

## {{t:dry|Dry}} or {{t:wet}}

We count {{t:wetness}} points, i.e. how much the flop favors {{t:draw|draws}} and strong flushes and {{t:straight|straights}}:

- a {{t:straight}} already possible in several ways, i.e. with at least two different combinations of two ranks in hand (on [[9h 8d 7c]], JT, T6 and 65 make one): {{n:tex.points.straight.made}} pts,
- a {{t:straight}} possible in only one way (on [[Ah Kd Tc]] only QJ makes one, on [[Ah 4d 2c]] only 53): {{n:tex.points.straight.made-one}} pts,
- only a {{t:straight-draw}} (a {{t:semi-connected}} flop or a {{t:paired}} one with two cards close together): {{n:tex.points.straight.draw}} pts,
- two cards of one suit: {{n:tex.points.suits.two-tone}} pts; three cards of one suit: {{n:tex.points.suits.monotone}} pts.

A **{{t:dry}}** flop has fewer than {{n:tex.threshold.medium}} pts, a **{{t:wet}}** one at least {{n:tex.threshold.wet}} pts, and a **medium** one is in between.

| Flop | Suits | {{t:straight|Straight}} | Total | {{t:texture|Texture}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | medium |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | medium |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet}} |

A made {{t:straight}} weighs more than a {{t:draw}} alone, because it changes the balance of power right now. A {{t:straight}} possible in several ways weighs more than a {{t:straight}} possible in only one way: on [[9h 8d 7c]] many hands have a {{t:straight}} or an {{t:oesd}}, while on [[Ah Kd Tc]] only QJ makes a {{t:straight}} and nobody has an open-ended {{t:draw}}. That's why A-K-T in three suits is medium, even though it is {{t:connected}}.

The {{t:two-tone}} [[Kh 7h 2c]] is a {{t:dry}} flop with one {{t:flush-draw}}: there is no {{t:straight}} or {{t:straight-draw}}. A {{t:monotone}} flop is always {{t:wet}}: on [[Kh 8h 3h]] more hands have a {{t:flush}} or {{t:flush-draw}} than have a {{t:straight}} or {{t:oesd}} on [[9h 8d 7c]].

On a {{t:dry}} flop, the leader usually stays the leader until the river. On a {{t:wet}} one, later cards often change the balance of power, so the best hand on the flop is less safe.

:::note Where these definitions come from
The terms {{t:dry}} and {{t:wet}} come from poker literature: training materials give e.g. K-7-2, A-9-4 and A-A-6 in three suits as {{t:dry}}, and 9-8-7, Q-J-T and T-9-5-4 as {{t:wet}}. The points and exact boundaries, such as a middle flop starting at a ten, are a convention adopted in the app so that every flop can be assessed unambiguously. The sources give no point thresholds and don't settle what to call flops that are neither {{t:dry}} nor {{t:wet}}. Under this convention, about {{n:tex.share.dry}} of all flops are {{t:dry}}, about {{n:tex.share.medium}} are medium, and about {{n:tex.share.wet}} are {{t:wet}}; this is a result of the app's definitions, not a figure from the literature.
:::
