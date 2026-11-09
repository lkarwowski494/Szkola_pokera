---
id: m6.l2
module: m6
order: 2
title: "コールかフォールドか"
sub: "アウトオブポジションでのCベットへのディフェンス"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "フロップ。{{t:pot|ポット}}は{{n:ex.third.pot}}で、ボタンがCベットとして{{n:ex.third.bet}}を{{t:bet|ベット}}します。{{t:call|コール}}するにはどれだけのエクイティが必要ですか？"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "{{n:ex.third.bet}}を支払い、{{t:call|コール}}後に{{n:ex.third.total}}になる{{t:pot|ポット}}を狙います。{{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}。小さいCベットはとても良い価格です。" }
      - { text: "{{n:alpha.bet-third}}", why: "これはアルファです。ボタンの{{t:bluff|ブラフ}}がどれくらいの頻度で成功する必要があるかを示します。必要エクイティを求めるときは、分母に自分の{{t:call|コール}}も加えます。" }
      - { text: "{{n:mdf.bet-third}}", why: "これは{{t:mdf}}、つまり{{t:range|レンジ}}のうちの割合で、1つのハンドのエクイティではありません。それに、フロップで{{t:out-of-position|アウトオブポジション}}のときは{{t:mdf}}より少し少なくディフェンスします。" }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "フロップ。{{t:pot|ポット}}は{{n:ex.pot}}で、ボタンがCベットとして{{n:ex.bet.three-quarters}}を{{t:bet|ベット}}します。{{t:call|コール}}するには何%のエクイティが必要ですか？数値を入力してください。"
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "{{n:ex.bet.three-quarters}}を支払い、{{t:call|コール}}後の{{t:pot|ポット}}は{{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}になります。{{n:ex.bet.three-quarters}} ÷ この合計 = {{n:eq.bet-three-quarters}}。1/4{{t:pot|ポット}}のCベット（{{n:eq.bet-quarter}}）に対する場合のほぼ2倍です。"
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "同じフロップで同じハンドです。ボタンが1/3{{t:pot|ポット}}を{{t:bet|ベット}}する場合と、{{t:pot|ポット}}全額をベットする場合があります。あなたのディフェンスはどう変わりますか？"
    table: { position: BB }
    options:
      - { text: "{{t:pot|ポット}}全額に対しては狭い{{t:range|レンジ}}でディフェンスします", correct: true, why: "ベットが大きいほど価格は悪くなります。必要エクイティは{{n:eq.bet-third}}から{{n:eq.bet-pot}}に上がり、{{t:mdf}}は{{n:mdf.bet-third}}から{{n:mdf.bet-pot}}に下がります。小さいベットにはコールしていた最も弱いハンドを、今度は{{t:fold|フォールド}}します。" }
      - { text: "同じハンドなので同じようにディフェンスします", why: "ハンドは同じでも価格が違います。{{t:pot|ポット}}サイズのベットに対しては、{{n:eq.bet-third}}ではなく{{n:eq.bet-pot}}のエクイティが必要です。" }
      - { text: "{{t:pot|ポット}}全額に対しては広くディフェンスします。大きいベットは{{t:bluff|ブラフ}}であることが多いからです", why: "そのようなルールはありません。大きいベットは通常{{t:polarized|ポラライズした}}{{t:range|レンジ}}（非常に強いハンドと{{t:bluff|ブラフ}}）を意味し、いずれにしてもあなたにとって価格が悪くなります。" }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind|ビッグブラインド}}でディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンがCベットとして1/3{{t:pot|ポット}}を{{t:bet|ベット}}します。どうしますか？"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "ミドル{{t:pair|ペア}}はボタンのすべての{{t:bluff|ブラフ}}（{{t:pair|ペア}}のないハンド）に勝ち、{{t:call|コール}}に必要なエクイティは{{n:eq.bet-third}}だけです。標準的なディフェンスです。" }
      - { text: "{{t:fold|フォールド}}", why: "タイトすぎます。小さいCベットに対して{{t:fold|フォールド}}するのは、{{t:pair|ペア}}も{{t:draw|ドロー}}もない最も弱いハンドで、{{t:pair|ペア}}ではありません。" }
      - { text: "チェックレイズ", why: "通常は{{t:call|コール}}します。{{t:raise|レイズ}}すると、払ってくるのは主により強いハンドと{{t:draw|ドロー}}です。小さいCベットに対してこのようなハンドでチェックレイズするのは、ソルバーでもまれなプレイです。" }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind|ビッグブラインド}}でディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンがCベットとして3/4{{t:pot|ポット}}を{{t:bet|ベット}}します。どうしますか？"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "{{t:pair|ペア}}も{{t:draw|ドロー}}もありません（スペードがなく、{{t:straight|ストレート}}も遠いです）。大きいCベットに対しては{{n:eq.bet-three-quarters}}のエクイティが必要で、{{t:out-of-position|アウトオブポジション}}ではハイカードだけでショーダウンまでたどり着くことはめったにありません。クイーンやジャックの{{t:pair|ペア}}になっても、必ず勝てるとは限りません。" }
      - { text: "{{t:call|コール}}", why: "クイーンとジャックはボードより高いので、コールしたくなります。しかし、この価格ではハイカードだけでは足りません。ターンでまたベットされて{{t:fold|フォールド}}することがよくあります。" }
      - { text: "チェックレイズ", why: "{{t:bluff|ブラフ}}には、勝つための2つ目の道がある{{t:draw|ドロー}}付きのハンドのほうが向いています。このハンドにはそれがまったくありません。" }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind|ビッグブラインド}}でディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンがCベットとして1/3{{t:pot|ポット}}を{{t:bet|ベット}}します。どうしますか？"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "ハイカード2枚に加えて、バックドアの{{t:flush-draw|フラッシュドロー}}があります（スペード3枚。ターンとリバーの両方でスペードが必要です）。{{n:eq.bet-third}}の価格なら、{{t:call|コール}}するのに十分です。" }
      - { text: "チェックレイズ", why: "通常はしません。チェックレイズは主に最も強いハンドと{{t:draw|ドロー}}（{{t:flush|フラッシュ}}、{{t:oesd|オープンエンド・ストレートドロー}}）で行います。バックドアの{{t:flush-draw|フラッシュドロー}}は弱く、ボタンにコールされると、たいていハイカードだけが残ります。このハンドは{{t:call|コール}}します。" }
      - { text: "{{t:fold|フォールド}}", why: "小さいCベットに対してはタイトすぎます。バックドアの{{t:draw|ドロー}}とハイカード2枚があれば、{{n:eq.bet-third}}の価格で十分なエクイティがあります。" }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind|ビッグブラインド}}でディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンがCベットとして1/3{{t:pot|ポット}}を{{t:bet|ベット}}します。どうしますか？"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "{{t:straight|ストレート}}へのガットショット（クイーン）と、ボードより高いキングがあります。{{t:call|コール}}で買えるのはカード1枚です。ガットショットがターンで当たる確率は約{{n:odds.gutshot.flop-turn}}で、キングは{{t:top-pair|トップペア}}へのアウツを数枚加えます。合わせても{{n:eq.bet-third}}の価格より低いですが、{{t:straight|ストレート}}が完成すればより多く勝てます（インプライドオッズ）。また、キング単体でもボタンの{{t:bluff|ブラフ}}に勝つことがあります。小さいCベットに対しては、これで{{t:call|コール}}に十分です。" }
      - { text: "{{t:fold|フォールド}}", why: "タイトすぎます。{{t:draw|ドロー}}とハイカードがあれば、小さいCベットに対して十分です。" }
      - { text: "チェックレイズ・オールイン", why: "まだ何もできていないハンドで、スタック全部を危険にさらすことになります。このサイズでは弱いハンドは降りてしまい、払ってくるのは強いハンドだけです。" }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind|ビッグブラインド}}でディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンがCベットとして1/3{{t:pot|ポット}}を{{t:bet|ベット}}します。どうしますか？"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "{{t:pair|ペア}}も{{t:flush-draw|フラッシュドロー}}もありません。あるのは弱いバックドアの{{t:straight-draw|ストレートドロー}}だけで（特定のカードが2枚必要）、ボードより高いカードもありません。エースとキングのあるフロップでは、ボタンは強いハンドを多く持っています。価格は良いものの、このハンドがそれを実現することはほとんどありません。" }
      - { text: "{{t:mdf}}が{{n:mdf.bet-third}}なので{{t:call|コール}}", why: "{{t:mdf}}は{{t:range|レンジ}}全体の目安であり、最も弱いハンドで払う理由にはなりません。フロップで{{t:out-of-position|アウトオブポジション}}のときは、{{t:mdf}}より少し少なくディフェンスしてかまいません。" }
      - { text: "チェックレイズ", why: "エースとキングのあるフロップでは{{t:range-advantage|レンジアドバンテージ}}はボタン側にあり、あなたには勝つための2つ目の道となる{{t:draw|ドロー}}もありません。" }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "フロップで{{t:out-of-position|アウトオブポジション}}のとき、エクイティが価格を少しでも上回るハンドをすべて{{t:call|コール}}しないのはなぜですか？"
    table: { position: BB }
    options:
      - { text: "エクイティをすべて実現できないから", correct: true, why: "エクイティとは、これ以上{{t:bet|ベット}}がない状態でショーダウンまで進んだときの勝つ確率です。{{t:out-of-position|アウトオブポジション}}ではターンとリバーで先にアクションし、次のベットに{{t:fold|フォールド}}することがよくあります。そのため弱いハンドは、自分のエクイティより少ない分しか実現できません。" }
      - { text: "ボタンはフロップで常に強いハンドを持っているから", why: "ボタンは広く{{t:open|オープン}}し、{{t:bluff|ブラフ}}も含めて広くCベットします。問題はあなたの{{t:position|ポジション}}で、相手の強さではありません。" }
      - { text: "よりよい機会のために{{t:chips|チップ}}を温存すべきだから", why: "大切なのは各判断の{{t:expected-value|期待値}}で、{{t:chips|チップ}}を温存することではありません。" }
---
M5では{{t:aggressor|アグレッサー}}としてCベットを打ちました。今回は反対側です。{{t:big-blind|ビッグブラインド}}でディフェンスし、フロップでチェックすると、ボタンがCベットを{{t:bet|ベット}}してきます。M5の復習：Cベットとは、プリフロップで{{t:raise|レイズ}}したプレイヤーによる{{t:bet|ベット}}で、{{t:range-advantage|レンジアドバンテージ}}はフロップの{{t:texture|テクスチャー}}によって決まります。

## Cベットの価格

まず、必要なエクイティを計算します（M2の公式）。小さいCベットはとても良い価格、大きいCベットははっきり悪い価格になります。

| ボタンのCベット | 必要エクイティ | {{t:mdf}} |
|---|---|---|
| 1/4{{t:pot|ポット}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3{{t:pot|ポット}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2{{t:pot|ポット}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4{{t:pot|ポット}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| {{t:pot|ポット}}全額 | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

{{t:mdf}}は方向性を示します。ベットが大きいほど、ディフェンスするハンドは少なくなります。フロップで{{t:out-of-position|アウトオブポジション}}のときは、{{t:mdf}}より少し少なくディフェンスしてかまいません。ボタンの{{t:bluff|ブラフ}}にもまだエクイティがあるからです。ただし、小さいCベットに大量に{{t:fold|フォールド}}することはありません。

## {{t:out-of-position|アウトオブポジション}}では実現できるエクイティが減る

エクイティとは、これ以上{{t:bet|ベット}}がない状態で最後までプレイしたときの勝つ確率です。{{t:out-of-position|アウトオブポジション}}ではどの{{t:street|ストリート}}でも先にアクションするため、ショーダウンを見る前に{{t:fold|フォールド}}することがよくあります。{{t:draw|ドロー}}のない弱いハンドは、エクイティから見込まれるより少なくしか実現できません。スーテッドのハンド、{{t:connectors|コネクター}}、{{t:pair|ペア}}は、強い役ができたり、すでに勝っていたりするので、より多く実現できます。

## 何で{{t:call|コール}}するか

小さいCベット（約1/3{{t:pot|ポット}}）に対しては、次のハンドで続行します。

- ミドルペアやボトムペアを含む、ほぼすべての{{t:pair|ペア}}
- {{t:flush-draw|フラッシュドロー}}と{{t:straight|ストレート}}ドロー（ハイカード付きのガットショットも含む）
- バックドアの{{t:draw|ドロー}}があるハイカード（例：同じスートのカードが3枚）
- 通常はエースハイも

M2の復習：フロップで{{t:bet|ベット}}に{{t:call|コール}}すると買えるのはカード1枚なので、{{t:draw|ドロー}}はターンで当たる確率と比べます。この確率は、小さいCベットの価格より少し低いこともあります。それでも、当たったときに今{{t:pot|ポット}}にある額より多く勝てる場合（いわゆるインプライドオッズ。M7で計算します）や、ハイカードなどで当たらなくても勝つことがある場合は、{{t:call|コール}}する価値があります。

## 何で{{t:fold|フォールド}}するか

- {{t:pair|ペア}}も{{t:draw|ドロー}}もなく、エースもボードより高いカードもないハンド。エースのあるフロップでは、こうしたハンドをより多く{{t:fold|フォールド}}します
- Cベットが大きいときは、通常{{t:draw|ドロー}}のないハイカード2枚（ただし、キングのある{{t:dry|ドライ}}なフロップでは、ソルバーはエースを含むハンドの多くで{{t:call|コール}}します）。{{t:call|コール}}するなら、バックドアの{{t:draw|ドロー}}、できればナッツ{{t:flush|フラッシュ}}へのドローがあるときです

Cベットが大きくなるにつれて、次に弱いハンドから順に{{t:call|コール}}からフォールドに移ります。
