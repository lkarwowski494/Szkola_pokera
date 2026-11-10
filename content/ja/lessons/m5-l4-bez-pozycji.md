---
id: m5.l4
module: m5
order: 4
title: "アウトオブポジションと複数の相手"
sub: "チェックを増やす場面"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:cutoff|CO}}から{{t:open|オープン}}し、ボタンが{{t:call|コール}}、ブラインドは{{t:fold|フォールド}}しました。フロップはミドルで{{t:connected}}です。あなたが先にアクションします。どのプランが合いますか？"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:in-position}}のときより多く{{t:check|チェック}}する", correct: true, why: "はい。ボタンは{{t:position|ポジション}}を持って{{t:call|コール}}したので{{t:range}}が強く、ミドルで{{t:connected}}なフロップは相手の{{t:pair|ペア}}や{{t:connectors|コネクター}}によくヒットします。{{t:out-of-position|アウトオブポジション}}では、強いハンドでもここでは非常に頻繁に{{t:check|チェック}}します。" }
      - { text: "ボタンのときのように、高頻度・小さめにCベットする", why: "それは{{t:dry|ドライ}}でハイカードのフロップで{{t:in-position}}のときのプランです。ここでは{{t:position|ポジション}}がなく、フロップもあなたの{{t:range|レンジ}}に有利ではありません。" }
      - { text: "{{t:initiative|イニシアチブ}}を失わないよう、全ハンドでCベットする", why: "{{t:initiative|イニシアチブ}}だけでは勝てません。ここではボタンの{{t:range}}が強く、どの{{t:bet|ベット}}の後でも、ターンとリバーであなたが先にアクションすることになります。" }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "なぜ{{t:out-of-position}}では{{t:in-position}}よりCベットの頻度が低いのですか？"
    options:
      - { text: "{{t:in-position}}の相手は各{{t:street|ストリート}}であなたのアクションを見ることができ、{{t:call|コール}}後の相手の{{t:range}}は強いから", correct: true, why: "はい。{{t:position|ポジション}}を持って{{t:call|コール}}するプレイヤーは、弱いハンドを{{t:fold|フォールド}}し、最も強いハンドはしばしば{{t:raise|レイズ}}しています。残るのは中程度から良いハンドで、しかも最後にアクションします。" }
      - { text: "{{t:out-of-position}}でのCベットは禁止されているから", why: "いいえ。ルール上はどの席からでもベットできます。要点は、{{t:out-of-position}}でのCベットが割に合う場面が少ないことです。" }
      - { text: "{{t:out-of-position}}では常にハンドが弱いから", why: "いいえ。ハンドは{{t:position|ポジション}}に左右されません。変わるのは、そのエクイティをどれだけ実現しやすいかです。" }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:cutoff|CO}}から{{t:open|オープン}}し、ボタンが{{t:call|コール}}、ブラインドは{{t:fold|フォールド}}しました。{{t:dry|ドライ}}なフロップで、最高のキッカーの{{t:top-pair|トップペア}}を持っています。あなたが先にアクションします。どうしますか？"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|チェック}}する（ボタンの{{t:bet}}に{{t:call|コール}}するため）", correct: true, why: "はい。ボタンは{{t:position|ポジション}}を持って{{t:call|コール}}したので{{t:range}}が強く、このフロップではソルバーは{{t:out-of-position}}でほぼ{{t:range|レンジ}}全体で{{t:check|チェック}}します。最高のキッカーの{{t:top-pair|トップペア}}も同様です。{{t:check|チェック}}した後は、ボタンの{{t:bet}}に{{t:call|コール}}します。" }
      - { text: "{{t:pot|ポット}}の{{n:cbet.size.small}}でCベット", why: "頻度が高すぎます。この状況でソルバーがベットするのは{{n:cbet.oop.a94.bet}}未満です。最高のキッカーの{{t:top-pair|トップペア}}は、{{t:check|チェック}}と{{t:call|コール}}でプレイします。" }
      - { text: "{{t:pot|ポット}}の{{n:cbet.size.big}}でCベット", why: "頻度が高すぎます。この状況でソルバーがベットするのは{{n:cbet.oop.a94.bet}}未満です。最高のキッカーの{{t:top-pair|トップペア}}は、{{t:check|チェック}}と{{t:call|コール}}でプレイします。" }
      - { text: "{{t:fold|フォールド}}", why: "まだ誰も{{t:bet|ベット}}していないので、{{t:fold}}しても何も得られません。無料で{{t:check|チェック}}できます（モジュール1のルール）。このハンドは{{t:check|チェック}}と{{t:call|コール}}でプレイします。" }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:cutoff|CO}}から{{t:open|オープン}}し、ボタンと{{t:big-blind}}が{{t:call|コール}}しました。フロップで{{t:big-blind}}は{{t:check|チェック}}し、ボタンはあなたの後にアクションします。あなたは{{t:draw|ドロー}}のないハイカードだけです。どうしますか？"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|チェック}}する", correct: true, why: "はい。2人の相手に対して、{{t:pair|ペア}}も{{t:draw|ドロー}}もないハンドが{{t:bet|ベット}}で{{t:pot|ポット}}を獲得できることはまれです。2人のうちどちらかがこのフロップにヒットしていることの方が多いです。" }
      - { text: "ヘッズアップのときのように小さくCベット", why: "2人の相手に対しては、{{t:bluff}}が2人の両方に通らなければなりません。2人が同時に外す頻度は、1人が外す頻度よりずっと低いです。" }
      - { text: "2人とも降ろすために大きくCベット", why: "2人の相手への大きな{{t:bluff}}はリスクが大きく、2人とも{{t:fold|フォールド}}する確率は低いです。このフロップでは、相手には多くの{{t:pair|ペア}}や{{t:draw|ドロー}}があります。" }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:cutoff|CO}}から{{t:open|オープン}}し、ボタンと{{t:big-blind}}が{{t:call|コール}}しました。{{t:big-blind|ビッグブラインド}}は{{t:check|チェック}}します。あなたは良いキッカーの{{t:top-pair|トップペア}}を持っています。どうしますか？"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|チェック}}する", correct: true, why: "はい。{{t:dry|ドライ}}なフロップのマルチウェイ{{t:pot|ポット}}では、ソルバーは非常に強いハンドでも非常に頻繁に{{t:check|チェック}}します。2人の{{t:call|コーラー}}を合わせると、フロップにヒットしていることの方が多いからです。" }
      - { text: "{{t:value|バリュー}}でベットする", why: "2人の相手に対して{{t:dry|ドライ}}なフロップでは、ソルバーは非常に強いハンドでも{{t:check|チェック}}します。ベットするのはまれで小さく、主にフロップがあなたの{{t:range}}によくヒットしているときです。" }
      - { text: "{{t:fold|フォールド}}する", why: "誰も{{t:bet|ベット}}していないので、無料で{{t:check|チェック}}できます。{{t:fold|フォールド}}すると、おそらくリードしている{{t:pot|ポット}}を手放すことになります。" }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "{{t:pair|ペア}}のないハンド1つがフロップを外す確率は約{{n:flop.miss.unpaired}}です。そのようなハンド2つ（4つの異なるランク）が同時に外す確率はどれくらいですか？"
    options:
      - { text: "約{{n:flop.miss.two}}", correct: true, why: "はい。計算方法は1ハンドのときと同じで、ペアになるカードが増えるだけです。未知のカード{{n:cards.unseen.two-hands}}枚（あなたのカードを除く）のうち{{n:pair.outs.two-hands}}枚です。フロップの{{n:cards.board.flop}}枚のどれもその中に含まれない確率は約{{n:flop.miss.two}}で、2人とも外すのは半分未満です。" }
      - { text: "約{{n:flop.miss.unpaired}}、1つの場合と同じ", why: "いいえ。相手が1人増えるごとに、誰かがヒットしている可能性も増えます。全員が外す確率は、プレイヤーが増えるごとに下がります。" }
      - { text: "約{{n:flop.hit.unpaired}}", why: "それは{{t:pair|ペア}}のないハンド1つがフロップで{{t:pair|ペア}}を作る確率です。問われているのは、2つとも外す確率です。" }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "{{t:in-position}}の復習：ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}して、フロップで{{t:check|チェック}}しました。このフロップに合うプランはどれですか？"
    position: BTN
    options:
      check: "多めに{{t:check|チェック}}し、Cベットは普段より少なくする"
      small: "高頻度・小さめにCベット：{{t:pot|ポット}}の{{n:cbet.size.small}}（{{n:cbet.btn.small}}）"
      big: "高頻度・大きめにCベット：{{t:pot|ポット}}の{{n:cbet.size.big}}（{{n:cbet.btn.big}}）"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "慎重すぎます。{{t:dry|ドライ}}でハイカードのフロップでは、あなたに{{t:range-advantage|レンジアドバンテージ}}があり、相手はたいてい外しています。{{t:check|チェック}}すると、相手にフリーカードを与えます。"
          small: "はい。{{t:dry}}でハイカードのフロップはあなたに有利です。小さな{{t:bet}}で相手に弱いハンドを{{t:fold|フォールド}}させるには十分で、より弱い{{t:pair|ペア}}はそれでも{{t:call|コール}}してきます。"
          big: "アクションは正しいですが、サイズが違います。{{t:dry|ドライ}}なフロップでは相手の{{t:draw|ドロー}}は少なく、外したハンドは小さな{{t:bet}}にも{{t:fold|フォールド}}します。大きな{{t:bet}}にしても{{t:fold|フォールド}}するハンドは増えず、リスクだけが大きくなります。{{t:pot|ポット}}の約{{n:cbet.size.small}}でベットしましょう。"
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "はい。カード同士が近い低いフロップは{{t:big-blind|ビッグブラインド}}の{{t:range|レンジ}}に当たります。相手は小さいカードのハンドを多くディフェンスしていて、あなたの高いカードはここで外れています。{{t:connected|コネクテッド}}なフロップでは相手に{{t:straight|ストレート}}と{{t:two-pair|ツーペア}}もあるので、あなたにはたいてい{{t:nuts-advantage|ナッツアドバンテージ}}がありません。ハイカードのフロップよりCベットの頻度は低く、多くのハンドが{{t:check|チェック}}し、ベットするのは主に強いハンドと強い{{t:draw|ドロー}}です。"
          small: "頻度が高すぎます。カード同士が近い低いフロップは{{t:big-blind|ビッグブラインド}}の{{t:range|レンジ}}に当たり、{{t:connected|コネクテッド}}なフロップではあなたにはたいてい{{t:nuts-advantage|ナッツアドバンテージ}}がありません。小さくても頻繁なCベットは、{{t:big-blind|ビッグブラインド}}に最も強いハンドで{{t:raise|レイズ}}（チェックレイズ）する機会を与えます。"
          big: "頻度が高すぎ、コストも大きすぎます。このフロップは{{t:big-blind|ビッグブラインド}}の{{t:range|レンジ}}に当たり、{{t:connected|コネクテッド}}なフロップでは相手に{{t:straight|ストレート}}と{{t:two-pair|ツーペア}}もあります。自分はたいていハイカードしかないのに頻繁に大きなCベットをすると、リスクが大きくなります。"
    count: 3
---
これまでは1人の相手に対して{{t:in-position}}でプレイしてきました。{{t:out-of-position|アウトオブポジション}}のときや複数の相手に対しては、Cベットの頻度を下げます。

## {{t:out-of-position|アウトオブポジション}}

{{t:cutoff|CO}}から{{t:open|オープン}}してボタンが{{t:call|コール}}すると、フロップ以降はすべての{{t:street|ストリート}}であなたが先にアクションします。しかもボタンの{{t:range|レンジ}}は強いです。弱いハンドは{{t:fold|フォールド}}し、最も強いハンドの一部は{{t:raise|レイズ}}しているので、残るのは中程度から良いハンドです。このように最も強いハンドがなく、主に中程度のハンドで構成された{{t:range|レンジ}}は{{t:condensed|コンデンスド}}です。そのため{{t:out-of-position}}では、ずっと多く{{t:check|チェック}}し、しばしば{{t:range|レンジ}}全体で、強いハンドでも{{t:check|チェック}}します。それらは{{t:call|コール}}かチェックレイズでプレイします。ベットするのは主に、あなたの{{t:range|レンジ}}に非常に強く有利なフロップ（例：K-Q-6）です。{{t:out-of-position}}での{{t:check|チェック}}は、ハンドを諦めることではありません。これらのハンドの多くは、相手の{{t:bet}}に{{t:call|コール}}します。

## 複数の相手に対して

相手が1人増えるごとに、誰かがフロップにヒットしている可能性も増えます。{{t:pair|ペア}}のないハンド1つがフロップを外す確率は約{{n:flop.miss.unpaired}}ですが、2つ同時だと約{{n:flop.miss.two}}にすぎません。{{t:bluff|ブラフ}}は全員を通らなければならないので、複数の相手に対しては主に{{t:bluff|ブラフ}}をやめます。ベットするのはまれで小さく、主にあなたの{{t:range}}によくヒットするフロップです。{{t:dry|ドライ}}なフロップでは、非常に強いハンドでもしばしば{{t:check|チェック}}します。

:::note このルールの出典
このレッスンのルールは、公開されているソルバーの結果（{{t:out-of-position}}でのCベット、エースハイのフロップとマルチウェイ{{t:pot|ポット}}でのCベット）と、トレーニング教材（マルチウェイ{{t:pot}}）に基づいています。これらはヒューリスティクスであり、アプリは頻度をパーセントで示しません。2つのハンドが同時に外す確率は、4つの異なるランクを持つ2ハンドについての正確な計算です。1ハンドの数値と同様に、あなたのカードは考慮していません。
:::
