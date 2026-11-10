---
id: m2.l1
module: m2
order: 1
title: "アウツと確率"
sub: "2と4のルール"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "{{t:flush|フラッシュ}}へのアウツは何枚ありますか？"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "ハートが{{n:draw.flush.seen}}枚あります（手札に2枚、{{t:board|ボード}}に2枚）。デッキにはハートが{{n:cards.per-suit}}枚あるので、残りは{{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}枚です。" }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}}はデッキにあるハートの全部ですが、そのうち{{n:draw.flush.seen}}枚はすでに見えています。" }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}}はすでに持っているハートの枚数です。数えるのは、あなたに必要なカードです。" }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "{{t:straight|ストレート}}へのアウツは何枚ありますか？"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "6-7-8-9を持っています。どの5でも、どの10でも{{t:straight|ストレート}}になります：{{n:draw.oesd.ranks}}ランク × {{n:cards.suits}}スート = {{n:outs.oesd}}枚です。" }
      - { text: "{{n:outs.gutshot}}", why: "それは真ん中のカードが1枚足りない場合（ガットショット）の枚数です。ここでは{{t:straight}}が両側に開いています。" }
      - { text: "{{n:draw.oesd.ranks}}", why: "カードのランクは2つ（5と10）ですが、それぞれに4つのスートがあります。" }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "ターンで、{{t:flush|フラッシュ}}へのアウツが{{n:outs.flush}}枚あります。リバーで引ける確率はどれくらいですか？"
    options:
      - { text: "約{{n:odds.flush.turn-river}}", correct: true, why: "残りのカードは1枚：{{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}（概算）。正確には、見えていない{{n:cards.unseen.turn}}枚のうち{{n:outs.flush}}枚、つまり{{n:odds.flush.turn-river}}です。" }
      - { text: "約{{n:odds.flush.flop-river}}", why: "それはフロップで、まだ2枚出る場合の確率です。ターンでは残り1枚です。" }
      - { text: "約{{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}}だとすると、見えていないカードの2枚に1枚で{{t:flush}}になることになります。実際には{{n:cards.unseen.turn}}枚のうち{{n:outs.flush}}枚だけです。" }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "フロップでガットショット（アウツ{{n:outs.gutshot}}枚）があります。リバーまでに引ける確率はどれくらいですか？"
    options:
      - { text: "約{{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}}（概算）。正確には{{n:odds.gutshot.flop-river}}です。ただし、この確率になるのは、それ以上の{{t:bet|ベット}}なしで2枚とも見られる場合（オールイン）だけです。相手がフロップで{{t:bet|ベット}}したら、あなたが払うのはカード1枚分です。その場合の確率は約{{n:odds.gutshot.flop-turn}}です。" }
      - { text: "約{{n:odds.gutshot.rule-turn}}", why: "それはカード1枚の場合の概算確率です（{{n:outs.gutshot}} × 2）。質問はターンとリバーの2枚についてです。" }
      - { text: "約{{n:odds.oesd.flop-river}}", why: "それはアウツが{{n:outs.oesd}}枚の場合です。ガットショットは{{n:outs.gutshot}}枚だけです。" }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "フロップ。{{t:flush-draw}}があり、相手が{{t:bet|ベット}}しています。{{t:call|コール}}の価格は、どの確率と比べますか？"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "約{{n:odds.flush.flop-turn}}、ターンで引く確率", correct: true, why: "{{t:call|コール}}で買えるのはカード1枚だけです。ターンで相手がまた{{t:bet|ベット}}するかもしれず、リバーの分は別に払うことになります。{{n:cards.unseen.flop}}枚のうち{{n:outs.flush}}枚で、約{{n:odds.flush.flop-turn}}です。" }
      - { text: "約{{n:odds.flush.flop-river}}、リバーまでの確率", why: "この確率になるのは、それ以上の{{t:bet|ベット}}なしで2枚とも確実に見られる場合、つまりオールインのときだけです。フロップでの普通の{{t:bet}}に対しては、買えるのはカード1枚です。" }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "ターン。{{t:flush|フラッシュ}}へのアウツが{{n:outs.flush}}枚あります。2と4のルールでは、リバーで引ける確率は何パーセントですか？数字を入力してください。"
    answer: odds.flush.rule-turn
    explanation: "残りのカードは1枚なので、2を掛けます：{{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}（概算）。正確には、{{n:cards.unseen.turn}}枚のうち{{n:outs.flush}}枚、つまり{{n:odds.flush.turn-river}}です。"
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
**アウツ**とは、あなたのハンドを勝てそうなハンドに改善するカードです。アウツを数えれば、計算機なしで確率をすばやく見積もれます。

## よくある{{t:draw|ドロー}}

- **{{t:flush-draw|フラッシュドロー}}**（同じスートが{{n:draw.flush.seen}}枚で、{{t:flush|フラッシュ}}まであと1枚）：**アウツ{{n:outs.flush}}枚**。1つのスートは{{n:cards.per-suit}}枚で、そのうち{{n:draw.flush.seen}}枚が見えています。
- **{{t:oesd|オープンエンド・ストレートドロー}}**、例：{{t:board|ボード}}が[[6s 7h Kd]]のときの[[8c 9d]]：**アウツ{{n:outs.oesd}}枚**、つまり5が4枚と10が4枚です。
- **{{t:straight|ストレート}}の穴（ガットショット）**、例：7がない5-6-8-9：**アウツ{{n:outs.gutshot}}枚**。

## 2と4のルール

このルールを使うと、計算機なしで確率の概算がわかります。アウツに2か4を掛けます。正確な確率は下の表にあります。

```formula
確率 ≈ アウツ × 2   （残りのカードが1枚）
確率 ≈ アウツ × 4   （カード2枚。それ以上のベットなしで2枚とも見られる場合のみ）
```

| {{t:draw|ドロー}} | アウツ | フロップ → ターン | フロップ → リバー（オールイン） | ターン → リバー |
|---|---|---|---|---|
| {{t:flush|フラッシュ}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|オープンエンド・ストレートドロー}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| ガットショット | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## カード1枚か、2枚か？

相手がフロップで{{t:bet|ベット}}したとき、あなたの{{t:call}}で買えるのはターンの1枚だけです。ターンで相手がまた{{t:bet|ベット}}するかもしれず、リバーの分は別に払うことになります。そのため、フロップで{{t:bet|ベット}}を受けたときは、**次の1枚**で引く確率（× 2）を数えます：{{t:flush|フラッシュ}}なら{{n:cards.unseen.flop}}枚のうち{{n:outs.flush}}枚、つまり約{{n:odds.flush.flop-turn}}です。**リバーまで**の確率（× 4、{{t:flush|フラッシュ}}なら約{{n:odds.flush.flop-river}}）を使うのは、それ以上の{{t:bet|ベット}}なしで2枚とも確実に見られる場合、つまり誰かがオールインしているときだけです。

:::note この数字の出どころ
ターンでは、わからないカードが{{n:cards.unseen.turn}}枚あります（{{n:cards.deck}}枚から、あなたの{{n:cards.hole}}枚と{{t:board|ボード}}の{{n:cards.board.turn}}枚を引いた数）。{{t:flush|フラッシュ}}を引く確率は{{n:cards.unseen.turn}}枚のうち{{n:outs.flush}}枚です。アウツが{{n:rule24.outs.max}}枚以下なら、2と4のルールの誤差は最大でも約{{n:rule24.error.max.pp}}パーセントポイントです。
:::
