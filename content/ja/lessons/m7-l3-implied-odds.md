---
id: m7.l3
module: m7
order: 3
title: "ドローとインプライドオッズ"
sub: "あとでいくら勝つ必要があるか"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "フロップでは、リバーまでに{{t:flush|フラッシュ}}になる確率は約{{n:odds.flush.flop-river}}でした。ターンでは完成しませんでした。今の確率はどれくらいですか？"
    options:
      - { text: "約{{n:odds.flush.turn-river}}", correct: true, why: "そのとおりです。残りは1枚です。見えていない{{n:cards.unseen.turn}}枚のうちアウツが{{n:outs.flush}}枚なので{{n:odds.flush.turn-river}}、フロップでの確率のおよそ半分です。" }
      - { text: "アウツの数が同じなので、今も約{{n:odds.flush.flop-river}}", why: "アウツの数は同じですが、これから開くカードが減っています。{{n:odds.flush.flop-river}}は2枚分の確率で、ターンでは残り1枚です。" }
      - { text: "電卓なしでは計算できない", why: "できます。M2の2と4のルールを使います。残り1枚なのでアウツ×2で、およそ{{n:odds.flush.rule-turn}}です。正確には{{n:odds.flush.turn-river}}です。" }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "ターン。{{t:flush|フラッシュ}}か{{t:straight|ストレート}}になるアウツは何枚ありますか？数字を入力してください。"
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "{{t:flush|フラッシュ}}にはハートが{{n:outs.flush}}枚、{{t:straight|ストレート}}にはすべてのクイーンとすべての7、つまり{{n:outs.oesd}}枚です。ハートのクイーンとハートの7はすでにフラッシュに数えているので、{{n:draw.combo.overlap}}を引きます：{{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}。"
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "ターン。{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{n:ex.bet.three-quarters}}を{{t:bet|ベット}}します。どうしますか？"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "アウツは{{n:outs.combo}}枚、つまりリバーで約{{n:odds.combo.turn-river}}です。必要なのは{{n:eq.bet-three-quarters}}なので、インプライドオッズがなくても{{t:call|コール}}で利益が出ます。" }
      - { text: "ターンの{{t:draw|ドロー}}では足りないので{{t:fold|フォールド}}", why: "普通の{{t:draw|ドロー}}なら、この価格では確かに{{t:fold|フォールド}}です。しかし{{t:flush|フラッシュ}}と{{t:straight|ストレート}}を同時に狙えると約{{n:odds.combo.turn-river}}になり、必要な{{n:eq.bet-three-quarters}}を上回ります。" }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "ターン。{{t:pot|ポット}}は{{n:ex.third.pot}}で、相手が{{n:io.flush.bet}}を{{t:bet|ベット}}します。あなたは{{t:flush-draw|フラッシュドロー}}で、{{n:cards.unseen.turn}}枚のうちアウツは{{n:outs.flush}}枚です。{{t:call|コール}}を損益ゼロにするには、完成したときにリバーで追加で何{{t:chips|チップ}}勝つ必要がありますか？数字を入力してください。"
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "必要なエクイティは{{n:io.flush.eq}}で、あなたのエクイティは約{{n:odds.flush.turn-river}}です。考えられる{{n:cards.unseen.turn}}通りのリバーのうち、{{n:outs.flush}}回は完成し、{{n:miss.flush.turn}}回は外れて、そのたびに{{n:io.flush.bet}}を失います。したがって、完成するたびに{{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}を得る必要があります。{{t:pot|ポット}}には{{n:io.flush.pot-after-bet}}あるので、不足分は{{n:io.flush.extra}}です。"
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "ターン。{{t:pot|ポット}}は{{n:io.oesd.pot}}で、相手が{{n:io.oesd.bet}}を{{t:bet|ベット}}します。あなたは{{t:oesd|オープンエンド・ストレートドロー}}で、アウツは{{n:outs.oesd}}枚、外れるカードは{{n:miss.oesd.turn}}枚です。完成したとき、リバーで追加でいくら勝つ必要がありますか？"
    options:
      - { text: "約{{n:io.oesd.extra}}", correct: true, why: "完成するたびに{{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}を得る必要があります。{{t:pot|ポット}}には{{n:io.oesd.pot-after-bet}}あるので、不足分は{{n:io.oesd.extra}}です。" }
      - { text: "約{{n:io.oesd.need}}", why: "それは完成するたびに合計で勝つ必要がある額です。その一部はすでに{{t:pot|ポット}}にある（{{n:io.oesd.pot-after-bet}}）ので、追加の不足分は{{n:io.oesd.extra}}です。" }
      - { text: "不要。価格だけで十分", why: "必要なエクイティは{{n:eq.bet-half}}で、あなたのエクイティは約{{n:odds.oesd.turn-river}}です。{{t:pot|ポット}}だけでは足りず、{{n:io.oesd.extra}}不足しています。" }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "ターン。{{t:pot|ポット}}は{{n:ex.third.pot}}で、相手が{{n:io.flush.bet}}を{{t:bet|ベット}}します。2人ともまだ{{n:io.flush.stack}}ずつ残っていて、相手はエースの{{t:pair|ペア}}で喜んで支払います。どうしますか？"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "価格だけでは足りません（{{n:io.flush.eq}}に対して約{{n:odds.flush.turn-river}}）が、完成すればあと{{n:io.flush.extra}}勝つだけで済みます。あなたは最強の{{t:flush|フラッシュ}}への{{t:draw|ドロー}}を持っています（ハートのエースが{{t:board|ボード}}に出ているので、キングを使った{{t:flush|フラッシュ}}が最も強い）。相手には{{t:chips|チップ}}がたくさん残っていて、エースの{{t:pair|ペア}}を持つプレイヤーはリバーでこのくらいのベットによく支払います。完成は見えてしまいます（3枚目のハート）が、エースの{{t:pair|ペア}}の相手はそれでもよく支払います。そのため、ここでのインプライドオッズは目立たない完成のときより小さくなります。" }
      - { text: "{{n:odds.flush.turn-river}}は{{n:io.flush.eq}}より低いので{{t:fold|フォールド}}", why: "ポットオッズは「{{t:fold|フォールド}}」を示しますが、インプライドオッズを見落としています。不足分は{{n:io.flush.extra}}だけで、相手には{{n:io.flush.stack}}が残っていて、支払う手も持っています。" }
      - { text: "オールインで{{t:raise|レイズ}}", why: "エースの{{t:pair|ペア}}の相手はおそらく{{t:call|コール}}し、そうなるとあなたの勝率は約{{n:odds.flush.turn-river}}しかありません。安くリバーを見て、完成したときに多く勝つほうがよいです。" }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "ターン。{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{n:ex.bet.half}}を{{t:bet|ベット}}します。あなたはガットショットです。完成したらあと{{n:io.gut.extra}}勝つ必要がありますが、相手の残りは{{n:io.gut.stack}}しかありません。どうしますか？"
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "ガットショットは約{{n:odds.gutshot.turn-river}}で、必要なのは{{n:eq.bet-half}}です。インプライドオッズは助けになりません。相手が{{n:io.gut.stack}}をすべて入れても、不足している{{n:io.gut.extra}}には届きません。" }
      - { text: "インプライドオッズがあるので{{t:call|コール}}", why: "インプライドオッズとは、相手がこれからあなたに支払う可能性のある{{t:chips|チップ}}です。相手には{{n:io.gut.stack}}しかなく、あなたに必要なのは{{n:io.gut.extra}}です。" }
      - { text: "オールインで{{t:raise|レイズ}}", why: "アウツ{{n:outs.gutshot}}枚でのオールインの{{t:bluff|ブラフ}}は、すべてを危険にさらします。これほど少ないスタックで{{t:pot|ポット}}の半分を{{t:bet|ベット}}した相手は、もう{{t:fold|フォールド}}しないことが多いです。" }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "ターン。{{t:pot|ポット}}は{{n:ex.pot}}で、慎重な相手が{{t:pot|ポット}}全額の{{n:ex.bet.pot}}を{{t:bet|ベット}}します。どうしますか？"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "必要なのは{{n:eq.bet-pot}}で、あなたは約{{n:odds.flush.turn-river}}です。さらに、あなたの{{t:flush|フラッシュ}}は低いです。ハートが落ちたとき、ハートのクイーンかジャックを持つ相手はより強い{{t:flush|フラッシュ}}になり、そのときに最も大きく負けます（リバースインプライドオッズ）。" }
      - { text: "インプライドオッズがあるので{{t:call|コール}}", why: "ここのインプライドオッズは弱いです。完成した{{t:flush|フラッシュ}}がより高いフラッシュに負けることがあり、{{t:board|ボード}}に出た3枚目のハートは誰にでも見えます。不足分もとても大きく、価格は{{n:eq.bet-pot}}です。" }
      - { text: "{{t:raise|レイズ}}", why: "エースとキングのある{{t:board|ボード}}で{{t:pot|ポット}}全額を{{t:bet|ベット}}する慎重な相手は、めったに{{t:fold|フォールド}}しません。完成しても負けることがある手で、大きなリスクを取ることになります。" }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "インプライドオッズが最も大きいのはどんなときですか？"
    options:
      - { text: "最強の手への{{t:draw|ドロー}}があり、相手が強い手を持ち、{{t:chips|チップ}}も多く残っているとき", correct: true, why: "そのとおりです。そのときは完成すれば勝てて、相手には支払うためのチップも手もあります。" }
      - { text: "相手の{{t:chips|チップ}}が少ないとき（{{t:spr|SPR}}が低い）", why: "逆です。{{t:spr|SPR}}が低いと、相手にはもう追加で支払うものがないので、インプライドオッズは小さくなります。" }
      - { text: "低い{{t:flush|フラッシュ}}への{{t:draw|ドロー}}があるとき", why: "それはリバースインプライドオッズです。完成してもなお負けることがあり、しかも大きな{{t:pot|ポット}}で負けます。" }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "ターンの開始時、{{t:pot|ポット}}は{{n:ex.pot}}で、2人のスタックのうち小さいほうは{{n:spr.stack.high}}です。{{t:spr|SPR}}はいくつですか？"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr|SPR}} = スタック ÷ {{t:pot|ポット}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}。相手には{{t:pot|ポット}}数個分のチップが残っているので、インプライドオッズは大きくなり得ます。" }
      - { text: "{{n:spr.low}}", why: "それはスタックが{{n:spr.stack.low}}の場合です。ここではスタックは{{n:spr.stack.high}}です。" }
      - { text: "{{n:ex.pot}}", why: "それは{{t:pot|ポット}}です。{{t:spr|SPR}}は比率で、スタックを{{t:pot|ポット}}で割ったものです。" }
---
ターンでは、残りのカードは1枚だけです。{{t:draw|ドロー}}が完成する確率はおよそ半分に下がり、次のカードを見る価格はたいてい上がります。そのためターンでは、より正確に計算し、新しい問いを立てます。完成したら、あとでいくら勝てるか？

## 残り1枚

| {{t:draw|ドロー}} | アウツ | フロップ → リバー | ターン → リバー |
|---|---|---|---|
| {{t:flush|フラッシュ}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| オープンエンドの{{t:straight|ストレート}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| ガットショット | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|フラッシュ}} + オープンエンドの{{t:straight|ストレート}} | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

M2の2と4のルールでは、アウツに2を掛けます。2つの{{t:draw|ドロー}}に共通するカードがあるときは、そのカードを1回だけ数えます。

## インプライドオッズ

インプライドオッズ（隠れたオッズ）とは、完成したときにリバーで勝ち取る{{t:chips|チップ}}のことです。例：{{t:pot|ポット}}は{{n:ex.third.pot}}で、相手が{{n:io.flush.bet}}を{{t:bet|ベット}}し、あなたは{{t:flush-draw|フラッシュドロー}}です。必要なエクイティは{{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}}で、あなたのエクイティは約{{n:odds.flush.turn-river}}です。{{t:pot|ポット}}だけでは足りません。

考えられる{{n:cards.unseen.turn}}通りのリバーのうち、{{n:outs.flush}}回は完成し、{{n:miss.flush.turn}}回は外れます。損益ゼロにするには、完成するたびに、外れたときの損失と同じ額を得る必要があります。

```formula
必要な獲得額 = コール額 × (外れるカード ÷ アウツ)
```

ここでは：{{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**。{{t:pot|ポット}}には{{n:io.flush.pot-after-bet}}あるので、リバーでさらに平均**{{n:io.flush.extra}}**を得る必要があります。

## {{t:spr|SPR}}：相手にどれだけ{{t:chips|チップ}}が残っているか

{{t:spr|SPR}}（スタック対{{t:pot|ポット}}比）は、{{t:effective-stack|エフェクティブスタック}}、つまり2人のうち小さいほうのスタックを、その{{t:street|ストリート}}開始時の{{t:pot|ポット}}で割ったものです。{{t:spr|SPR}}はどの{{t:street|ストリート}}でも計算できます。ここではターンで計算します。{{t:pot|ポット}}が{{n:ex.pot}}でスタックが{{n:spr.stack.high}}なら{{t:spr|SPR}}は{{n:spr.high}}で、相手にはまだ{{t:pot|ポット}}数個分が残っています。スタックが{{n:spr.stack.low}}なら、わずか{{n:spr.low}}です。インプライドオッズは、相手の手元に残っている{{t:chips|チップ}}より大きくはなりません。{{t:spr|SPR}}が低いときは、ほぼポットオッズだけが重要です。{{t:spr|SPR}}について詳しくは、フロップの{{t:spr|SPR}}に基づいてハンドを計画する「ハンドの計画」モジュール（M9）で扱います。

## インプライドオッズが本物になるとき

- **最強の手**への{{t:draw|ドロー}}がある（考えられる最も高い{{t:flush|フラッシュ}}、たいていはエースを使うもの）
- 相手が支払ってくれる**強い手**を持っている
- 相手に**多くの{{t:chips|チップ}}**が残っている（{{t:spr|SPR}}が高い）
- 完成が**目立たない**（例：ガットショットは、{{t:board|ボード}}に出る3枚目のハートより気づかれにくい）

リバースインプライドオッズはあなたに不利に働きます。低い{{t:flush|フラッシュ}}への{{t:draw|ドロー}}があるとき、または{{t:board|ボード}}に{{t:flush|フラッシュ}}ができ得る状況で{{t:straight|ストレート}}への{{t:draw|ドロー}}があるときは、完成してもなお負けることがあり、しかも大きな{{t:pot|ポット}}で負けます。

:::note これらのルールの根拠
インプライドオッズの計算は、{{t:expected-value|期待値}}に基づく正確な計算です。インプライドオッズが本物になる条件と、リバースインプライドオッズは、トレーニング教材によるヒューリスティックです。
:::
