---
id: m7.l1
module: m7
order: 1
title: "セカンドバレル"
sub: "ターンで2回目のベットを打つとき"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。[[Jd 7c 3s]]のフロップであなたはCベットを{{t:bet|ベット}}し、相手は{{t:call|コール}}しました。ターンのどのカードが、あなたの{{t:second-barrel|セカンドバレル}}を最も助けますか？"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "はい：エースはあなたの{{t:open|オープン}}{{t:range|レンジ}}の多くのハンド（AK、AQ、AJ）にヒットします。一方、{{t:big-blind}}は主に{{t:pair|ペア}}や{{t:draw|ドロー}}でフロップを{{t:call|コール}}していました。相手の{{t:pair}}はすべて1段階下がります。" }
      - { text: "[[8h]]", why: "いいえ：8はフロップとつながります。T9には{{t:straight|ストレート}}、87には{{t:two-pair}}ができ、どちらも{{t:big-blind}}が多くディフェンスするハンドです。むしろ相手に有利なカードです。" }
      - { text: "[[3h]]", why: "最悪ではありませんが、ほとんど何も変わりません。あなたの{{t:range}}が強くなることはまれで、{{t:pair|ペア}}を持つ相手は依然として{{t:pair|ペア}}のままです。エースのほうが、あなたの{{t:second-barrel|セカンドバレル}}にずっと多くをもたらします。" }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "[[Jd 7c 3s]]のフロップの後、ターンのエースが、ボタンから{{t:open|オープン}}したプレイヤーの{{t:second-barrel|セカンドバレル}}に有利に働くのはなぜですか？"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "あなたのAKやAQにヒットし、相手の{{t:pair}}は2番目か3番目の{{t:pair|ペア}}になるから", correct: true, why: "はい：高いカードは{{t:open|オープン}}したプレイヤーの{{t:range}}にヒットしやすく、Jや7の{{t:pair|ペア}}でフロップを{{t:call|コール}}した相手は、{{t:board|ボード}}に対して弱いハンドになっています。" }
      - { text: "エースが落ちると相手は必ず{{t:fold|フォールド}}するから", why: "必ずではありません：エースやセットを持つ相手は払ってきます。エースは{{t:fold}}の可能性を高めますが、何も保証しません。" }
      - { text: "エースが相手の{{t:draw|ドロー}}を完成させるから", why: "いいえ：この{{t:board|ボード}}では、エースは相手が持ちうる{{t:flush|フラッシュ}}も{{t:straight|ストレート}}も完成させません。あなたの{{t:range|レンジ}}に合うから助けになるのです。" }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。フロップでCベットを{{t:bet|ベット}}し、相手は{{t:call|コール}}しました。ターンは7です。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しています。どうしますか？"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|チェック}}", correct: true, why: "9と6のある{{t:board|ボード}}に落ちた7は、T8と85に{{t:straight|ストレート}}を、76と97に{{t:two-pair}}を与えます。どれも{{t:big-blind}}がディフェンスするハンドです。あなたには{{t:pair|ペア}}も{{t:draw|ドロー}}もありません。{{t:bluff}}はあきらめ、無料で次のカードを見ます。" }
      - { text: "{{n:ex.bet.three-quarters}}をベット", why: "このカードはあなたではなく相手の{{t:range|レンジ}}に合っており、あなたには強いハンドへのアウツがありません。{{t:bluff|ブラフ}}の{{t:second-barrel|セカンドバレル}}は、あなたを助けるカードで、改善しうるハンドで打ちましょう。" }
      - { text: "{{n:ex.bet.pot}}をベット", why: "相手に有利なカードでの大きな{{t:bluff}}はリスクが大きいです。相手が{{n:alpha.bet-pot}}より高い頻度で{{t:fold|フォールド}}しなければならず、しかもフロップを{{t:call|コール}}した相手には{{t:pair|ペア}}や{{t:draw|ドロー}}が多くあります。" }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}がフロップのCベットを{{t:call|コール}}しました。ターンはエースです。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しています。どうしますか？"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "{{n:ex.bet.three-quarters}}をベット", correct: true, why: "良い{{t:second-barrel}}です：エースはあなたの{{t:range|レンジ}}に合い、あなたには{{t:straight|ストレート}}へのガットショット（10）があります。相手が{{t:pair|ペア}}を{{t:fold|フォールド}}すればすぐに勝ち、{{t:call|コール}}されてもまだヒットする可能性があります。" }
      - { text: "{{n:ex.bet.quarter}}をベット", sizeError: true, why: "アクションは正しいですが、サイズが違います：これほど安いベットなら、相手はどんな{{t:pair|ペア}}でも{{t:call|コール}}します。この{{t:bluff}}は主に{{t:fold|フォールド}}で利益を得るものです。あなたを助けるカードでは、強いハンドと同じように大きくベットしましょう。" }
      - { text: "{{t:check|チェック}}", correct: true, why: "これも良い選択です：アウツがあり、リバーを無料で見られるので、{{t:check}}はミスではありません。公開されているソルバーの例では、ナッツ{{t:straight|ストレート}}へのガットショットはターンで{{t:check|チェック}}していました。どちらのプレイも正解です。" }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}がフロップのCベットを{{t:call|コール}}しました。ターンは2です。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しています。どうしますか？"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|チェック}}", correct: true, why: "あなたには{{t:pair|ペア}}も{{t:draw|ドロー}}もありません：残り1枚でハート3枚では足りず、{{t:straight|ストレート}}には2枚足りません。2は何も変えず、相手はKのある{{t:board|ボード}}でフロップを{{t:call|コール}}しているので、{{t:pair|ペア}}を持っていることが多いです。{{t:bluff}}はあきらめます。" }
      - { text: "{{n:ex.bet.three-quarters}}をベット", why: "アウツのない{{t:bluff|ブラフ}}は、相手が{{t:fold|フォールド}}したときにしか勝てません。フロップを{{t:call|コール}}した相手には{{t:pair|ペア}}（K、8）が多くあり、ブランクの2では{{t:fold|フォールド}}しません。" }
      - { text: "{{t:fold|フォールド}}", why: "相手が{{t:check|チェック}}しているので、無料で{{t:check|チェック}}できます（モジュール1のルール）。{{t:fold|フォールド}}は理由もなく{{t:pot|ポット}}を手放すことになります。" }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:flush-draw|フラッシュドロー}}で{{t:second-barrel|セカンドバレル}}を{{t:bet|ベット}}し、相手が{{t:call|コール}}しました。まだどれくらいのチャンスがありますか？"
    options:
      - { text: "リバーで{{t:flush}}を引く確率は約{{n:odds.flush.turn-river}}", correct: true, why: "はい：これが2つ目の勝ち筋です。見えていない{{n:cards.unseen.turn}}枚のうち{{n:outs.flush}}枚がアウツです。だから{{t:semi-bluff}}は、アウツのない{{t:bluff|ブラフ}}より優れています。" }
      - { text: "ゼロ。{{t:bluff}}は失敗した", why: "アウツのない{{t:bluff|ブラフ}}ならもうチャンスはありませんが、あなたには{{t:draw}}があります：リバーで{{t:flush}}ができれば、{{t:call|コール}}されていても勝てます。" }
      - { text: "約{{n:odds.flush.flop-river}}", why: "それは残り2枚あったフロップでの確率です。ターンでは残り1枚なので、{{n:odds.flush.turn-river}}です。" }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}がフロップのCベットを{{t:call|コール}}しました。ターンは2です。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しています。どうしますか？"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|チェック}}", correct: true, why: "9の{{t:pair|ペア}}はミディアムハンドです：{{t:bluff|ブラフ}}には勝ちますが、どのKにも負けます。2回目のベットに対して、相手は弱いハンドを{{t:fold|フォールド}}し、Kなら払ってきます。{{t:check|チェック}}すれば{{t:pot|ポット}}を小さく保ち、ショーダウンまで行けます。" }
      - { text: "{{n:ex.bet.three-quarters}}をベット", why: "相手はKのある{{t:board|ボード}}ですでにフロップを{{t:call|コール}}しています。弱いハンド（8や3）は{{t:fold|フォールド}}するか1回だけ払い、強いハンドは必ず払います。このようなベットで得をするのは強いハンドのほうです。" }
      - { text: "自分の立ち位置を確かめるためにベット", why: "「情報のため」のベットはよくあるミスです：その情報に代金を払うことになります。強いハンドはどのみち降りず、弱いハンドは逃げるからです。ベットは{{t:value|バリュー}}のためか、{{t:bluff}}として打ちます。" }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}がフロップのCベットを{{t:call|コール}}しました。ターンは2です。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しています。どうしますか？"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:value|バリュー}}でベット", correct: true, why: "最高のキッカーの{{t:top-pair|トップペア}}は強いハンドです。相手はフロップを{{t:call|コール}}しているので、弱いKや8を持っていることが多く、もう1回払ってくれます。" }
      - { text: "{{t:check|チェック}}。どうせ相手は何も持っていない", why: "相手はフロップを{{t:call|コール}}しているので、{{t:pair|ペア}}を持っていることが多いです。{{t:check|チェック}}すると、弱いハンドが払ってくれたはずの{{t:bet}}を逃します。" }
      - { text: "オールイン", why: "弱い{{t:pair|ペア}}がスタック全部を払うことはまれです。弱いKや8から払ってもらえるサイズを選びましょう。" }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "ターンで{{t:second-barrel|セカンドバレル}}を最もよく{{t:bet|ベット}}するのは、どのハンドですか？"
    options:
      - { text: "強いハンドと{{t:draw|ドロー}}。ミディアムハンドは{{t:check|チェック}}", correct: true, why: "はい：強いハンドは払ってもらいたく、{{t:draw|ドロー}}は2通りで勝てます。ミディアムハンドは次の{{t:bet|ベット}}で得るものがありません。" }
      - { text: "すべてのハンド。{{t:initiative|イニシアチブ}}を失わないため", why: "{{t:initiative|イニシアチブ}}だけでは勝てません。相手はフロップを{{t:call|コール}}しているので{{t:range}}が強くなっており、アウツのないハンドやミディアム{{t:pair|ペア}}は打ち続けると損をします。" }
      - { text: "最も強いハンドだけ", why: "それでは相手は、あなたがベットするたびにフォールドし、あなたに勝っているときだけ払うようになります。{{t:draw|ドロー}}は自然な{{t:semi-bluff|セミブラフ}}です。" }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "ターンです。{{t:pot|ポット}}は{{n:ex.pot}}で、ほとんど勝てないハンドで{{t:bluff|ブラフ}}し、{{n:ex.bet.three-quarters}}を{{t:bet|ベット}}します。この{{t:bluff}}が損益ゼロになるには、相手はどれくらいの頻度で{{t:fold|フォールド}}する必要がありますか？数値をパーセントで入力してください。"
    answer: alpha.bet-three-quarters
    explanation: "アルファ = ベット ÷ ({{t:pot}} + ベット) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}。アウツがあれば、必要な{{t:fold|フォールド}}は少なくなります。{{t:call|コール}}されても、その一部はリバーで勝てるからです。"
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Cベットを{{t:call|コール}}された後、ターンでの相手の{{t:range}}がフロップより強いのはなぜですか？"
    options:
      - { text: "最も弱いハンドをフロップで{{t:fold|フォールド}}したから", correct: true, why: "はい：Cベットに対しては、{{t:pair|ペア}}も{{t:draw|ドロー}}もないハンドが{{t:fold|フォールド}}します。残るのは{{t:pair|ペア}}と{{t:draw|ドロー}}なので、{{t:second-barrel}}は1回目より強い{{t:range}}を相手にすることになります。" }
      - { text: "ターンは必ず相手を助けるから", why: "いいえ：ターンはランダムで、あなたを助けることもあります（例：エース）。相手の{{t:range|レンジ}}を強くするのは、フロップでの相手自身の判断です。" }
      - { text: "強くない。プリフロップと同じ{{t:range}}のまま", why: "どの判断でも、一部のハンドがふるい落とされます。{{t:bet}}を{{t:call|コール}}したプレイヤーは、たいてい何かにヒットしているか、{{t:draw}}を持っています。" }
---
{{t:second-barrel|セカンドバレル}}とは、プリフロップで{{t:raise|レイズ}}したプレイヤーの2回目の{{t:bet}}です。フロップでCベット、{{t:call}}、そしてターンでベット、という流れです。ターンでは「ハンドがあるか」だけでなく、「このカードは自分と相手のどちらを助けるか」も考えます。

## 相手は{{t:call|コール}}した、だから強くなっている

Cベットに対して、相手は{{t:pair|ペア}}も{{t:draw|ドロー}}もないハンドを{{t:fold|フォールド}}します。{{t:call|コール}}したプレイヤーはたいてい{{t:pair|ペア}}か{{t:draw}}を持っており、ときにはバックドアのある高いカードを持っています（M6のディフェンスと同様）。そのため{{t:second-barrel}}は1回目より強い{{t:range}}を相手にすることになり、何でも2回目のベットを打つわけではありません。

## どのカードが助けになるか

- **低い{{t:board|ボード}}に落ちる高いカード**（A、K）は、たいてい{{t:open|オープン}}したプレイヤーを助けます：そのプレイヤーのAK、AQ、KQにヒットし、相手の{{t:pair}}はすべて1段階下がります。こうしたカードでは、{{t:bluff|ブラフ}}も含めて、2回目のベットをより多く打ちます。
- **{{t:board|ボード}}とつながる低いカード**（例：[[9h 6c 2d]]に落ちる7）は{{t:big-blind|ビッグブラインド}}を助けます：ビッグブラインドが最も多くディフェンスするハンドに、{{t:straight|ストレート}}や{{t:two-pair}}を与えます。
- **ブランクカード**（例：[[Kd 8c 3s]]に落ちる2）は、ほとんど何も変えません。決め手はあなたのハンドです。

## 2回目のベットを打つハンド

強いハンド（{{t:value|バリュー}}）と{{t:draw|ドロー}}（{{t:semi-bluff}}）でベットします。{{t:semi-bluff|セミブラフ}}は2通りで勝てます：相手が{{t:fold|フォールド}}したときと、リバーでヒットしたときです。{{t:pair|ペア}}もアウツもないハンドは、フォールドでしか勝てないので、あきらめることが多くなります。ただし、相手が払ってくるハンドをブロックしている場合は別です。相手が{{t:raise|レイズ}}で反撃できる状況では、ソルバーはアウツのないハンドでも{{t:bluff|ブラフ}}します。

勝つ見込みのない{{t:bluff|ブラフ}}は、相手がベット ÷ ({{t:pot}} + ベット)の頻度で{{t:fold|フォールド}}すると損益ゼロになります（M6のアルファ）。{{t:pot|ポット}}の3/4のベットなら{{n:alpha.bet-three-quarters}}、{{t:pot|ポット}}の半分なら{{n:alpha.bet-half}}です。

## ミディアムハンドは{{t:check|チェック}}

{{t:second-pair|セカンドペア}}や弱いキッカーの{{t:top-pair}}は、{{t:bluff|ブラフ}}には勝ちますが、より強い{{t:pair|ペア}}には負けます。2回目のベットに対して、弱いハンドは{{t:fold|フォールド}}し、強いハンドは払ってきます。{{t:check|チェック}}して{{t:pot|ポット}}を小さく保ち、ショーダウンまで行きます。

:::note これらのルールの出典
基本的な方向性（高いカードはたいてい{{t:second-barrel|セカンドバレル}}に有利、{{t:bluff|ブラフ}}はアウツなしよりアウツありで打つ、ミディアムハンドは{{t:check|チェック}}）は、トレーニング教材とソルバー分析から得たヒューリスティックです。スタックが約{{n:format.stack}}の場合に当てはまります。これは単純化です：ソルバーは、相手の{{t:value|バリュー}}をブロックしている場合や、相手が{{t:raise|レイズ}}で反撃できる場合には、アウツのないハンドの一部でも{{t:bluff|ブラフ}}します。ベットの頻度はソルバーの結果では具体的なハンドによって異なるため、アプリではパーセントで示していません。
:::
