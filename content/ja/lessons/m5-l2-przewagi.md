---
id: m5.l2
module: m5
order: 2
title: "フロップは誰に有利か"
sub: "レンジアドバンテージとナッツアドバンテージ"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。フロップ：[[Ks 7d 2c]]。{{t:range-advantage|レンジアドバンテージ}}があるのはどちらですか？"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "ボタンから{{t:open|オープン}}したあなた", correct: true, why: "はい。あなたの{{t:range|レンジ}}にはKK、AK、KQがすべて含まれます。{{t:big-blind|ビッグブラインド}}はこのうち最も強いハンドをフロップ前にレイズしていたはずで、その広いディフェンスの大半はここで外れたハンドです。" }
      - { text: "{{t:big-blind|ビッグブラインド}}", why: "いいえ。{{t:big-blind}}は広くディフェンスしたため、弱いハンドが多くなります。良いキッカーのキングを持っている頻度はあなたより低いです。" }
      - { text: "どちらでもない。フロップはランダム", why: "フロップはランダムですが、{{t:range|レンジ}}はランダムではありません。同じフロップでも、高いカードが多い{{t:range|レンジ}}のほうによく合います。" }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。フロップ：[[7s 6h 5d]]。ここであなたに{{t:nuts-advantage|ナッツアドバンテージ}}はありますか？つまり、最も強いハンドを相手よりはっきり多く持っていますか？"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "いいえ：ここでは{{t:big-blind}}も{{t:straight|ストレート}}と{{t:two-pair|ツーペア}}を持っています", correct: true, why: "そのとおりです。{{t:big-blind}}はスーテッドの{{t:connectors|コネクター}}や、6か7を含むハンドを多くディフェンスし、それらはここで{{t:straight|ストレート}}や{{t:two-pair|ツーペア}}になります。あなたの高いカードはここで外れているので、最も強いハンドをはっきり多く持ってはいません。" }
      - { text: "はい、フロップ前に{{t:open|オープン}}したからです", why: "いいえ。{{t:open|オープン}}したことで、高いフロップではあなたにアドバンテージがあります。低くて{{t:connected|コネクテッド}}なフロップではあなたの高いカードは外れ、相手の{{t:range}}はここで{{t:straight|ストレート}}や{{t:two-pair|ツーペア}}に当たります。" }
      - { text: "はい、高い{{t:pair|ペア}}を多く持っているからです", why: "いいえ。{{t:overpair|オーバーペア}}（TT、JJなど、{{t:board|ボード}}のどのカードよりも高い{{t:pocket-pair|ポケットペア}}）はあなたのほうが多いですが、このようなフロップでは{{t:overpair}}は最も強いハンドに入りません。{{t:straight|ストレート}}、セット、{{t:two-pair|ツーペア}}に負けます。" }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "あなたの{{t:open}}に{{t:call|コール}}しただけの{{t:big-blind}}が、[[Ad 8s 3c]]のフロップでAAやAKを持っていることが少ないのはなぜですか？"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "これらのハンドではたいていフロップ前に{{t:raise|レイズ}}する（3ベット）から", correct: true, why: "はい。{{t:big-blind}}は最も強いハンドを3ベットでプレイするため、{{t:call|コール}}しただけなら、その{{t:range}}には最強クラスのハンドがほとんどありません。あなたの{{t:range|レンジ}}にはそれがすべて含まれます。" }
      - { text: "{{t:big-blind}}はエースを絶対にプレイしないから", why: "いいえ。{{t:big-blind}}はA5やA9など、多くのエースをディフェンスします。欠けているのは主に、レイズしていたはずの最も強いハンドです。" }
      - { text: "フロップにすでにエースが1枚出ているから", why: "{{t:board|ボード}}のエースは、両方の{{t:range|レンジ}}でエースの{{t:combo|コンボ}}数を減らしますが、両者の差は生みません。差はフロップ前の判断から生まれます。" }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "あなたには{{t:range-advantage|レンジアドバンテージ}}がありますが、最も強いハンドの数は相手もあなたと同じです。どのくらいのサイズでベットすることが多いですか？"
    options:
      - { text: "小さく、頻繁に", correct: true, why: "はい。{{t:range-advantage}}は、頻繁にベットできることを示します。{{t:nuts-advantage|ナッツアドバンテージ}}がなければ、大きな{{t:bet}}は相手の最も強いハンドに対して大きなリスクを負います。弱いハンドは小さなベットでもどのみち{{t:fold|フォールド}}します。" }
      - { text: "大きく。有利だから", why: "いいえ。大きなサイズを決めるのは{{t:nuts-advantage}}、つまり最も強いハンドをより多く持っていることです。ここではそれがありません。" }
      - { text: "常に{{t:check|チェック}}する", why: "慎重すぎます。{{t:range-advantage}}は頻繁にベットする理由になります。ただしサイズは小さくします。" }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "あなたの{{t:range|レンジ}}には、相手の{{t:range|レンジ}}よりも最も強いハンドがずっと多く含まれています。これで何が得られますか？"
    options:
      - { text: "より良いハンドにぶつかることが少ないので、大きくベットできる", correct: true, why: "はい。それが{{t:nuts-advantage}}です。大きな{{t:bet}}は相手の中くらいのハンドからより多くを引き出し、より良いハンドから{{t:raise}}されることはまれです。" }
      - { text: "常に小さくベットしなければならない", why: "いいえ。小さいサイズを選ぶのは、{{t:range-advantage|レンジアドバンテージ}}しかないときです。{{t:nuts-advantage|ナッツアドバンテージ}}があれば、より大きくベットできます。" }
      - { text: "何もない。大事なのは自分のハンドだけ", why: "自分のハンドは大切ですが、相手に見えるのはあなたの{{t:range}}だけです。{{t:bet|ベット}}のサイズは、多くのハンドに同時に合うように選びます。" }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "相手はランクの異なる2枚のカード（例：[[Jc Td]]）を持っています。フロップでどちらのカードもペアにならないのは何パーセントのケースですか？数値を入力してください。"
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "{{n:cards.unseen.preflop}}枚の未知のカードのうち、{{t:pair|ペア}}になるのは{{n:pair.outs.unpaired}}枚だけです。残りのジャックとテンがそれぞれ3枚ずつです。フロップは{{n:cards.board.flop}}枚で、そのどれもがこの{{n:pair.outs.unpaired}}枚に含まれない確率は約{{n:flop.miss.unpaired}}です。つまり{{t:pair|ペア}}になるのは約{{n:flop.hit.unpaired}}のケースにすぎません。"
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "{{t:pair|ペア}}のないハンドは、約{{n:flop.miss.unpaired}}のケースでフロップで{{t:pair|ペア}}になりません。これはCベットにとって何を意味しますか？"
    options:
      - { text: "相手は何も持っていないことが多いので、小さな{{t:bet}}でもすぐに{{t:pot|ポット}}を獲得できることが多い", correct: true, why: "はい。これがCベットの基本です。外れても必ず{{t:fold}}するとは限りません（相手は{{t:draw}}や高いカードを持っている場合があります）が、相手の{{t:range|レンジ}}には弱いハンドが多くあります。" }
      - { text: "相手はちょうど{{n:flop.miss.unpaired}}のケースで{{t:fold|フォールド}}する", why: "いいえ。{{t:pair|ペア}}のない相手でも、{{t:draw|ドロー}}や高いカードで{{t:call|コール}}することがあり、ハンドにすでに{{t:pair|ペア}}を持っていることもあります。これはフロップが相手に当たらなかった頻度の目安にすぎません。" }
      - { text: "自分も同じくらい外すので、Cベットに意味はない", why: "いいえ。あなたも外すことは多いですが、相手にはそれがいつなのか分かりません。{{t:aggressor|アグレッサー}}（フロップ前に最後に{{t:raise|レイズ}}したプレイヤー）としてのあなたの{{t:range}}は多くのフロップで強く、相手が{{t:fold|フォールド}}すれば{{t:bet}}で{{t:pot|ポット}}を獲得できます。" }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "では、{{t:pair|ペア}}のないハンドの2枚のうち、少なくとも1枚がフロップでペアになるのは何パーセントのケースですか？数値を入力してください。"
    answer: flop.hit.unpaired
    explanation: "これは前の数値の余事象です。{{n:prob.certain}}から{{n:flop.miss.unpaired}}を引くと約{{n:flop.hit.unpaired}}、つまりおよそ3回に1回のフロップです。"
---
フロップ前、各プレイヤーの{{t:range|レンジ}}は異なります。ボタンから{{t:open|オープン}}したプレイヤーは高いカードを多く持っています。{{t:big-blind|ビッグブラインド}}は非常に広くディフェンスしますが、最も強いハンド（AA、KK、AK）はたいてい{{t:raise|レイズ}}するため、{{t:call|コール}}しただけの場合はそれらをほとんど持っていません。フロップはこれらの{{t:range|レンジ}}のどちらか一方によりよく合い、それによって誰が頻繁にベットできるかが決まります。

## {{t:range-advantage|レンジアドバンテージ}}

あるフロップで、あなたのハンドが平均して相手のハンドより強いとき、あなたには{{t:range-advantage|レンジアドバンテージ}}があります。ボタンからの{{t:open|オープン}}後の[[Ks 7d 2c]]では、良いキッカーのキングや高い{{t:pair|ペア}}を多く持っているのはあなたです。{{t:big-blind|ビッグブラインド}}は、ここで外れたハンドを多く持っています。

[[7s 6h 5d]]のような低くて{{t:connected|コネクテッド}}なフロップでは、{{t:range-advantage}}はほぼ消えます。{{t:big-blind|ビッグブラインド}}はスーテッドの{{t:connectors|コネクター}}や、6か7を含むハンドを多くディフェンスし、それらはここで{{t:straight|ストレート}}や{{t:two-pair|ツーペア}}になります。一方、あなたの高いカードは外れています。

## {{t:nuts-advantage|ナッツアドバンテージ}}

{{t:nuts-advantage|ナッツアドバンテージ}}とは、{{t:range|レンジ}}の中に最も強いハンド（「{{t:nuts|ナッツ}}」）をより多く持っていることです。{{t:range-advantage|レンジアドバンテージ}}は、どのくらい頻繁にベットできるかを示します。{{t:nuts-advantage|ナッツアドバンテージ}}は、どのくらい大きくベットできるかを示します。最も強いハンドを相手よりずっと多く持っているときは、大きめのサイズでベットできます。{{t:range-advantage|レンジアドバンテージ}}しかないときは、小さくベットします。

## 相手はたいてい外す

{{t:pair|ペア}}のないハンド（例：[[Jc Td]]）は、約{{n:flop.miss.unpaired}}のケースでフロップで{{t:pair|ペア}}になりません。{{n:cards.unseen.preflop}}枚の未知のカードのうち、そのカードとペアになるのは{{n:pair.outs.unpaired}}枚だけです。資料ではよく約{{n:flop.hit.one-pair}}という数字が挙げられますが、これはちょうど1つの{{t:pair|ペア}}になる確率です。{{t:two-pair|ツーペア}}と{{t:three-of-a-kind|スリーカード}}を含めると、当たる確率は約{{n:flop.hit.unpaired}}です。だからこそ、フロップでの{{t:bet}}は、自分が何も当たっていなくても、すぐに{{t:pot|ポット}}を獲得できることが多いのです。外れても必ず{{t:fold}}するとは限りません。相手は{{t:draw}}や高いカード2枚を持っている場合があります。

:::note これらの原則の出典
{{t:range-advantage|レンジアドバンテージ}}と{{t:nuts-advantage|ナッツアドバンテージ}}という概念は、ソルバーの結果に基づくゲーム理論の資料（用語集とCベットのサイズに関する記事）に由来します。このレッスンの数値は、アプリによる正確な計算結果です。
:::
