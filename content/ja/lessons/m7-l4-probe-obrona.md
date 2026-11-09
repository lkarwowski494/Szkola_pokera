---
id: m7.l4
module: m7
order: 4
title: "プローブベットとディフェンス"
sub: "相手がチェックしたとき、または2回目のベットをしてきたとき"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "ボタンが{{t:open|オープン}}し、あなたは{{t:big-blind|ビッグブラインド}}で{{t:call|コール}}しました。フロップでは2人ともチェックしました。ターンではあなたが先にベットします。この{{t:bet}}は何と呼ばれますか？"
    table: { position: BB }
    options:
      - { text: "プローブベット", correct: true, why: "はい。プローブベットとは、プリフロップの{{t:aggressor}}がCベットをせずに{{t:check|チェック}}したあと、ターンで{{t:out-of-position}}から打つ{{t:bet}}のことです。" }
      - { text: "Cベット", why: "Cベットは、フロップ前に{{t:raise|レイズ}}したプレイヤーが打つ{{t:bet|ベット}}です。あなたは{{t:call|コール}}しただけです。" }
      - { text: "チェックレイズ", why: "チェックレイズとは、{{t:check}}したあと相手の{{t:bet|ベット}}に{{t:raise}}することです。ここではあなたが先にベットしており、誰にも{{t:raise|レイズ}}していません。" }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "フロップでボタンが{{t:check|チェック}}したあと、ターンでいつもより頻繁にベットできるのはなぜですか？"
    table: { position: BB }
    options:
      - { text: "ボタンは強い手の多くでベットするので、{{t:check|チェック}}したあとは強い手が少ないから", correct: true, why: "はい。強い手は通常Cベットします。{{t:check|チェック}}したあとのボタンの{{t:range|レンジ}}には中程度の手や弱い手が多く、あなたは{{t:bet|ベット}}でそこを攻められます。" }
      - { text: "{{t:check}}は、ボタンが何も持っていないことを必ず意味するから", why: "必ずではありません。ボタンはあなたを罠にかけるため、強い手で{{t:check|チェック}}することもあります。ただし、ベットするときよりは強い手が少なくなります。" }
      - { text: "ターンではあなたが{{t:position|ポジション}}を持っているから", why: "いいえ。ボタンはどの{{t:street|ストリート}}でもあなたの後に行動します。プローブベットは{{t:out-of-position}}から打つ{{t:bet|ベット}}です。" }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "ボタンはフロップで{{t:check|チェック}}しました。{{t:big-blind|ビッグブラインド}}からプローブ{{t:bet|ベット}}を打つ頻度が高いのは、どちらの{{t:board|ボード}}ですか？"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "はい。低いカードは{{t:big-blind|ビッグブラインド}}の広いディフェンス（小さな{{t:pair|ペア}}、{{t:connectors|コネクター}}）にヒットしやすく、{{t:check|チェック}}したあとのボタンがここで強い手を持っていることはまれです。" }
      - { text: "[[Ac Kd 8h Js]]", why: "高い{{t:board|ボード}}では、{{t:range-advantage|レンジアドバンテージ}}はボタンにあります。ボタンのAやKの多くがヒットしているからです。ここではプローブ{{t:bet|ベット}}を打つ頻度は低くなります。" }
      - { text: "どちらも同じ頻度", why: "{{t:texture|テクスチャー}}は重要です。M5のCベットと同じく、低いボードではより頻繁に、高いボードではより少なくベットします。" }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind}}をディフェンスしています。フロップでは2人とも{{t:check|チェック}}しました。ターンは3です。あなたが先に行動します。どうしますか？"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "ベット（プローブベット）", correct: true, why: "{{t:oesd}}（4か9）があり、低い{{t:board|ボード}}はあなたの{{t:range|レンジ}}に合っています。ボタンが{{t:fold|フォールド}}すれば勝ちで、{{t:call|コール}}されてもまだ{{n:outs.oesd}}枚のアウツがあります。" }
      - { text: "{{t:check|チェック}}", correct: true, why: "これも良い選択です。{{t:draw|ドロー}}なら、ボタンも{{t:check|チェック}}すればリバーを無料で見られます。それでも通常はプローブベットのほうが優れています。フロップで{{t:check|チェック}}したボタンの{{t:range}}は弱く、あなたは強い{{t:semi-bluff}}を持っているからです。" }
      - { text: "{{t:fold|フォールド}}", why: "誰も{{t:bet|ベット}}していないので、無料で{{t:check|チェック}}できます（モジュール1のルール）。{{t:fold|フォールド}}すると、理由なく{{t:pot|ポット}}を手放すことになります。" }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind}}をディフェンスしています。フロップでは2人とも{{t:check|チェック}}しました。ターンは3です。あなたが先に行動します。どうしますか？"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "ベット（プローブベット）", correct: true, why: "{{t:top-pair|トップペア}}はプローブベットに向いた手です。ボタンの弱い{{t:pair|ペア}}やハイカードが払ってくれますし、{{t:bet|ベット}}すれば無料のカードを与えずに済みます。" }
      - { text: "{{t:check|チェック}}", why: "フロップで{{t:check|チェック}}したボタンは、{{t:pair|ペア}}のないハイカードを持っていることがよくあります。再び{{t:check|チェック}}されると、ボタンはあなたを逆転しうるカードを無料で引け、あなたは相手の弱い手から稼げません。" }
      - { text: "{{t:fold|フォールド}}", why: "誰も{{t:bet|ベット}}していないので、無料で{{t:check|チェック}}できます。それに{{t:top-pair|トップペア}}ならベットしたいところです。" }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "ボタンの{{t:open|オープン}}に対して{{t:big-blind}}をディフェンスしています。フロップでは2人とも{{t:check|チェック}}しました。ターンはJです。あなたが先に行動します。どうしますか？"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|チェック}}", correct: true, why: "{{t:pair|ペア}}も{{t:draw|ドロー}}もなく、高い{{t:board}}はボタンの{{t:range|レンジ}}に有利です。このような{{t:board|ボード}}でアウツのないプローブベットが勝つのはボタンが{{t:fold|フォールド}}したときだけですが、ボタンはここでA、K、Jを多く持っています。" }
      - { text: "ベット（プローブベット）", why: "プローブ{{t:bet|ベット}}は、低いボードで、{{t:pair|ペア}}かアウツのある手でより頻繁に打ちます。ここではどちらもありません。" }
      - { text: "{{t:fold|フォールド}}", why: "無料で{{t:check|チェック}}できるので、{{t:fold}}しても何も得られません（モジュール1のルール）。" }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "{{t:big-blind}}をディフェンスしています。フロップでボタンのCベットに{{t:call|コール}}しました。ターンは2で、あなたが{{t:check|チェック}}すると、ボタンは{{n:ex.pot}}の{{t:pot|ポット}}に{{n:ex.bet.three-quarters}}を{{t:bet|ベット}}しました。どうしますか？"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "ガットショット（J）しかありません。リバーで約{{n:odds.gutshot.turn-river}}ですが、必要なのは{{n:eq.bet-three-quarters}}です。{{t:pair|ペア}}がなく残りカードが1枚では、この手は{{t:second-barrel|セカンドバレル}}に対して守れません。" }
      - { text: "{{t:call|コール}}", why: "価格はあなたの勝率の数倍です（{{n:eq.bet-three-quarters}}対約{{n:odds.gutshot.turn-river}}）。インプライドオッズでもこれほどの差は埋まりません。" }
      - { text: "チェックレイズ", why: "{{t:second-barrel|セカンドバレル}}はCベットより強い{{t:range}}です。ボタンはKやそれより強い手を持っていることが多く、それらは{{t:fold|フォールド}}しません。{{n:outs.gutshot}}枚のアウツでは高くつく{{t:bluff}}です。" }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "{{t:big-blind}}をディフェンスしています。フロップでボタンのCベットに{{t:call|コール}}しました。ターンはKで、あなたが{{t:check|チェック}}すると、ボタンは{{n:ex.pot}}の{{t:pot|ポット}}に{{n:ex.bet.quarter}}だけ{{t:bet|ベット}}しました。どうしますか？"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "{{t:oesd}}（Jか6）があり、約{{n:odds.oesd.turn-river}}です。小さなベットに必要なのは{{n:eq.bet-quarter}}だけで、ほぼちょうど同じです。さらに完成すれば、リバーでもまだ稼げます。" }
      - { text: "{{t:fold|フォールド}}", why: "これほど小さなベットでは、価格はあなたの勝率とほぼ同じで（{{n:eq.bet-quarter}}対約{{n:odds.oesd.turn-river}}）、インプライドオッズが判断を{{t:call}}に傾けます。" }
      - { text: "オールインで{{t:raise|レイズ}}", why: "まだ何もできていない手でスタック全体を危険にさらすことになり、ボタンはKを持っていれば{{t:fold|フォールド}}しません。これほど良い価格なら{{t:call|コール}}で十分です。" }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "{{t:big-blind}}をディフェンスしています。フロップでボタンのCベットに{{t:call|コール}}しました。ターンは5で、あなたが{{t:check|チェック}}すると、ボタンは{{n:ex.pot}}の{{t:pot|ポット}}に{{n:ex.bet.three-quarters}}を{{t:bet|ベット}}しました。どうしますか？"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "{{t:top-pair|トップペア}}は、ブランクカードで{{t:fold|フォールド}}するには強すぎます。{{t:semi-bluff|セミブラフ}}や弱いKに勝っています。必要なのは{{n:eq.bet-three-quarters}}で、{{t:second-barrel|セカンドバレル}}の{{t:range|レンジ}}に対して、このような{{t:pair}}は通常それだけの勝率があります。" }
      - { text: "{{t:fold|フォールド}}", why: "タイトすぎます。{{t:second-barrel|セカンドバレル}}はCベットより強いですが、ボタンは{{t:draw|ドロー}}や{{t:bluff|ブラフ}}でも{{t:bet|ベット}}してきます。{{t:top-pair|トップペア}}はそれらすべてに勝っています。" }
      - { text: "{{t:raise|レイズ}}", why: "{{t:raise|レイズ}}すると、弱い手は{{t:fold|フォールド}}し、強いKやセットが払ってきます。キッカーが中程度の{{t:top-pair|トップペア}}は{{t:raise|レイズ}}する手ではありません。" }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "フロップのCベットに対してより、{{t:second-barrel|セカンドバレル}}に対してのほうが狭くディフェンスするのはなぜですか？"
    table: { position: BB }
    options:
      - { text: "相手は{{t:second-barrel|セカンドバレル}}をより狭い{{t:range|レンジ}}で、通常はより大きなサイズで{{t:bet|ベット}}し、{{t:draw|ドロー}}には残りカードが1枚しかないから", correct: true, why: "はい。相手はターンで{{t:bluff|ブラフ}}の一部をあきらめ、大きなベットは{{t:mdf}}を下げ（{{t:pot|ポット}}の3/4なら{{n:mdf.bet-three-quarters}}）、あなたの{{t:draw|ドロー}}は勝つチャンスが半分になります。弱い{{t:pair|ペア}}やアウツのない手は、フロップより頻繁に{{t:fold|フォールド}}します。" }
      - { text: "ターンでは{{t:chips}}を節約する必要があるから", why: "重要なのは節約ではなく、各判断の{{t:expected-value}}です。狭くディフェンスするのは、相手がより強い手でベットしてくるからです。" }
      - { text: "いいえ、すでに多くの{{t:chips|チップ}}を払っているので、より広くディフェンスする", why: "すでに払った分は戻ってきません。判断は、今の価格と相手の{{t:range|レンジ}}の強さにもとづいて行います。" }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "ターンです。相手は{{n:ex.pot}}の{{t:pot|ポット}}に{{n:ex.bet.three-quarters}}を{{t:bet|ベット}}しました。{{t:mdf}}はいくつですか？パーセントで数値を入力してください。"
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + ベット) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}。公開されているターンの例では、ソルバーは平均して{{t:mdf}}に近い頻度でディフェンスしていました。{{t:out-of-position}}では、それより少なくディフェンスすることもあります（フロップでもターンでも）。相手が{{t:bluff|ブラフ}}する頻度が低いとわかっているときは、より頻繁に{{t:fold|フォールド}}します（計算はM8の、{{t:bluff|ブラフ}}キャッチのレッスンで扱います）。"
---
ターンでは、2つの新しい状況に出会います。ボタンがCベットをせずに{{t:check|チェック}}した場合と、Cベットをしたうえで2回目のベットをしてきた場合です。前者では自分から攻めることができ、後者ではフロップより狭くディフェンスします。

## プローブベット

プローブベットとは、プリフロップの{{t:aggressor}}がフロップで{{t:check|チェック}}したあと、ターンで{{t:out-of-position}}から打つ{{t:bet}}のことです。ボタンは強い手の多くでCベットしていたはずなので、{{t:check|チェック}}したあとは強い手が少なくなります。ボタンの{{t:range}}は弱くなっており、あなたはそこを攻められます。

- **低いボードではより頻繁に**。例：[[8c 5d 2s 3h]]。低いカードはあなたの広いディフェンスにヒットします。
- **高いボードではより少なく**。例：[[Ac Kd 8h Js]]。{{t:range-advantage}}はボタン側に残ります。

## プローブベットに使う手

- **{{t:pair|ペア}}**：ボタンのハイカードから払ってもらいたく、無料のカードを与えたくない手。
- **強い{{t:draw|ドロー}}**：2通りの方法で勝てる手。

{{t:pair|ペア}}もアウツもない手は{{t:check|チェック}}します。

## {{t:second-barrel|セカンドバレル}}に対するディフェンス

Cベットに{{t:call|コール}}したあと、ボタンが2回目のベットをしてきた場合、その{{t:range}}はフロップより狭く、強くなっています。ブラフの一部をあきらめているからです。あなたの{{t:draw|ドロー}}には、残りカードが1枚しかありません。そのため、

- {{t:draw|ドロー}}は、良い価格のときか、インプライドオッズがあるときだけ{{t:call|コール}}します（前のレッスン）。
- アウツのない手や最も弱い{{t:pair|ペア}}は、より頻繁に{{t:fold|フォールド}}します。
- {{t:top-pair}}は、通常はまだ{{t:call|コール}}します。

{{t:mdf}}は引き続き基準になります。{{t:pot|ポット}}の3/4のベットに対しては{{n:mdf.bet-three-quarters}}です。公開されているターンの例では、ソルバーは平均してこの値に近い頻度でディフェンスしていました。{{t:out-of-position}}では、それより少なくディフェンスすることもあります。また、相手が{{t:mdf}}の想定より{{t:bluff|ブラフ}}する頻度が低いときも、ディフェンスを減らします。

:::note これらのルールの出典
プローブベットと{{t:second-barrel|セカンドバレル}}へのディフェンスに関するルールは、トレーニング教材やソルバー分析から得られた経験則です。ターンで{{t:mdf}}に近い頻度でディフェンスすることは、公開されているソルバーの例で示されています。出典によってボードごとに数値が異なるため、アプリでは頻度をパーセントで示していません。マイクロ{{t:stakes|ステークス}}のプレイヤーがどんな手でプローブベットを{{t:bet|ベット}}しているかに関する数値には、母集団（サンプル、{{t:stakes|ステークス}}、サイト）が明記された出典が必要なため、ここには載せていません。
:::
