---
id: m12.l4
module: m12
order: 4
title: "バンクロールとリスク"
sub: "バイイン数で測る分散と、ステークスを下げるタイミング"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "{{t:buy-in|バイイン}}は{{n:format.stack}}です。{{n:br.bi.base}}{{t:buy-in|バイイン}}のバンクロールは何bbですか？数値を入力してください。"
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}。バンクロールは、プレイしている{{t:stakes|ステークス}}の{{t:buy-in|バイイン}}数で数えます。"
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "ウィンレートは{{n:var.wr.typical.high}}、{{t:standard-deviation|標準偏差}}は{{n:var.sd}}で、{{n:br.bi.base}}{{t:buy-in|バイイン}}（{{n:br.base.bb}}）を持っています。バンクロールをすべて失うリスクはどのくらいですか？"
    options:
      - { text: "約{{n:ror.base}}", correct: true, why: "指数は 2 × ウィンレート × バンクロール ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}} なので、RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}} です。これは、{{t:stakes|ステークス}}を一度も下げない場合に、いつかバンクロールをすべて失う確率です。" }
      - { text: "約{{n:ror.half}}", why: "これはバンクロールが半分、つまり{{n:br.bi.move-down}}{{t:buy-in|バイイン}}の場合の値です。{{n:br.bi.base}}なら指数は2倍になるので、リスクは約{{n:ror.base}}まで下がります。" }
      - { text: "ゼロ。勝っているプレイヤーだから", why: "勝っているプレイヤーでも、バンクロール全体より深い{{t:downswing|ダウンスウィング}}に見舞われることがあります。リスクはバンクロールが大きいほど小さくなりますが、ゼロにはなりません。" }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "同じ{{n:br.bi.base}}{{t:buy-in|バイイン}}のバンクロール、{{t:standard-deviation|標準偏差}}{{n:var.sd}}ですが、ウィンレートは{{n:var.wr.typical.low}}しかありません。バンクロールを失うリスクはどのくらいですか？"
    options:
      - { text: "約{{n:ror.base.wr-min}}", correct: true, why: "ウィンレートは指数に入っています。{{n:var.wr.typical.high}}ではなく{{n:var.wr.typical.low}}だと指数は3分の1になり、リスクは約{{n:ror.base}}から約{{n:ror.base.wr-min}}に上がります。" }
      - { text: "約{{n:ror.base}}。バンクロールが同じだから", why: "リスクはウィンレート × バンクロールの積で決まります。ウィンレートが低いのはバンクロールが小さいのと同じ働きをし、結果は約{{n:ror.base.wr-min}}になります。" }
      - { text: "約{{n:ror.base.wr-ex}}", why: "これはウィンレート{{n:var.wr.ex}}の場合の値です。{{n:var.wr.typical.low}}ではリスクは数十倍大きく、約{{n:ror.base.wr-min}}です。" }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "{{n:br.bi.base}}{{t:buy-in|バイイン}}、{{t:standard-deviation|標準偏差}}{{n:var.sd}}ですが、自分のウィンレートはまだわかりません。バンクロールをすべて失うリスクについて何がわかりますか？"
    options:
      - { text: "ウィンレート次第：{{n:var.wr.typical.high}}なら約{{n:ror.base}}、{{n:var.wr.typical.low}}なら約{{n:ror.base.wr-min}}", correct: true, why: "ウィンレートはバンクロールと並んで指数に入っています。ウィンレートがわからなければリスクもわからず、ウィンレートが低いと同じバンクロールでもリスクは数倍大きくなります。" }
      - { text: "約{{n:ror.base}}。バンクロールだけで決まるから", why: "その値になるのは{{n:var.wr.typical.high}}の場合だけです。{{n:var.wr.typical.low}}では、同じバンクロールで約{{n:ror.base.wr-min}}になります。" }
      - { text: "ゼロ。{{n:br.bi.base}}{{t:buy-in|バイイン}}は多いから", why: "ウィンレートがプラスなら、リスクはバンクロールが大きいほど小さくなりますが、ゼロにはなりません。{{n:var.wr.typical.low}}では、まだ約{{n:ror.base.wr-min}}です。" }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "{{n:br.bi.base}}{{t:buy-in|バイイン}}でこの{{t:stakes|ステークス}}を始めました。{{t:downswing|ダウンスウィング}}の後、残りは{{n:br.ex.below}}です。どうしますか？"
    options:
      - { text: "{{t:stakes|ステークス}}を1段階下げる", correct: true, why: "想定したバンクロールの半分（{{n:br.bi.move-down}}）を下回りました。この{{t:buy-in|バイイン}}数では、残りを失うリスクは{{n:br.bi.base}}のときより数倍大きくなります（ウィンレート{{n:var.wr.typical.high}}、SD {{n:var.sd}}の場合）。半分の{{t:stakes|ステークス}}なら、同じバンクロールがそこでの{{t:buy-in|バイイン}}数でほぼ満額に戻ります。" }
      - { text: "プレイを続ける。ただの{{t:variance|分散}}だから", why: "おそらく{{t:variance|分散}}なのは確かですが、まさにそれから守ってくれるのが{{t:stakes|ステークス}}を下げることです。{{n:br.ex.below}}{{t:buy-in|バイイン}}では、次の{{t:downswing|ダウンスウィング}}ですべてを失うおそれがあります。" }
      - { text: "早く取り戻すために上の{{t:stakes|ステークス}}に移る", why: "それは焦りによるティルトです。{{t:buy-in|バイイン}}数で見たバンクロールが小さいまま上の{{t:stakes|ステークス}}に移ると、{{t:risk-of-ruin|破産リスク}}が急激に高まります。" }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "{{n:br.bi.base}}{{t:buy-in|バイイン}}でこの{{t:stakes|ステークス}}を始め、{{n:dd.bi.small}}を失いました。今は{{n:br.ex.after-dd}}です。どうしますか？"
    options:
      - { text: "この{{t:stakes|ステークス}}にとどまり、負けたハンドでの判断を見直す", correct: true, why: "{{n:br.ex.after-dd}}{{t:buy-in|バイイン}}は、最も遅い下げのライン{{n:br.bi.move-down}}をまだ上回っています。シミュレーションでは、{{n:var.wr.ex}}で勝っているプレイヤーの約{{n:dd.p.small.100k}}が{{n:var.hands.k}}千ハンドの間にこの程度の{{t:downswing|ダウンスウィング}}を経験します。ハンドを見直すことで、ミスが原因でないかを確認できます。" }
      - { text: "すぐに{{t:stakes|ステークス}}を下げる", correct: true, why: "これも良い判断です。{{n:dd.bi.small}}{{t:buy-in|バイイン}}を失った時点で下げるよう勧める情報源もあります。バンクロールが半分になる前に下げるのはミスではありませんが、それより後に下げるのはミスです。" }
      - { text: "外から{{t:buy-in|バイイン}}を補充して{{n:br.bi.base}}に戻す", why: "{{t:downswing|ダウンスウィング}}のたびに補充すると、リスクの上限というバンクロールの意味がなくなります。ラインは事前に決めて、それを守ります。" }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "現在の{{t:stakes|ステークス}}で{{n:br.bi.base}}{{t:buy-in|バイイン}}、つまりバンクロールとして想定した分を持っています。上の{{t:stakes|ステークス}}は{{t:buy-in|バイイン}}が2倍です。上に移りますか？"
    options:
      - { text: "いいえ。上の{{t:stakes|ステークス}}では想定したバンクロールの半分しかない", correct: true, why: "バンクロールは、移りたい{{t:stakes|ステークス}}の{{t:buy-in|バイイン}}数で数えます。あなたの{{n:br.bi.base}}{{t:buy-in|バイイン}}はそこでは{{n:br.bi.move-down}}で、ちょうど下げるラインです。" }
      - { text: "はい。調子がいいから", why: "好調な1か月は主に{{t:variance|分散}}によるものです（{{t:variance|分散}}のレッスン）。上に移れるかどうかは、新しい{{t:stakes|ステークス}}でのバンクロールで決まります。" }
      - { text: "はい。すでに{{n:br.bi.base}}{{t:buy-in|バイイン}}あるから", why: "現在の{{t:stakes|ステークス}}の{{n:br.bi.base}}{{t:buy-in|バイイン}}は、2倍の{{t:stakes|ステークス}}では{{n:br.bi.move-down}}にすぎません。" }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "あるプレイヤーは自分の{{t:stakes|ステークス}}で平均して負けていますが、バンクロールは非常に大きいです。それによって何が得られますか？"
    options:
      - { text: "損失を先延ばしにするだけ", correct: true, why: "ウィンレートがマイナスなら結果は平均して下がっていくので、大きさに関係なく、遅かれ早かれバンクロールを失います。バンクロールは{{t:variance|分散}}から守るものであり、弱いプレイから守るものではありません。" }
      - { text: "破産から守ってくれる", why: "リスクの式はウィンレートがプラスのときにしか成り立ちません。負けているプレイヤーは確実にバンクロールを失います。バンクロールが大きいほど、そのペースが遅くなるだけです。" }
      - { text: "上の{{t:stakes|ステークス}}でプレイできる", why: "ウィンレートがマイナスのまま上の{{t:stakes|ステークス}}に移っても、損失が早まるだけです。" }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "始めたばかりです。学習とプレイに時間をどう配分しますか？"
    options:
      - { text: "学習を約{{n:study.beginner}}", correct: true, why: "最初は補うべきことが最も多いので、学習を中心にします。" }
      - { text: "学習を約{{n:study.min}}", why: "それはすでに勝っているプレイヤーの下限です。最初は学習を中心にすべきです。" }
      - { text: "プレイだけ。学びは経験からついてくる", why: "ゲームの結果は弱いフィードバックです（判断と結果のレッスン）。解説付きの学習とハンド分析のほうが早く上達できます。" }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "すでに自分の{{t:stakes|ステークス}}で勝っています。時間をどう配分しますか？"
    options:
      - { text: "おおよそ半々。ただし学習は決して{{n:study.min}}を下回らない", correct: true, why: "勝っているときも、理想は学習約{{n:study.winner}}で、最低でも{{n:study.min}}です。" }
      - { text: "勝っているのだからプレイだけ", why: "勝っているときでも、学習に充てる時間を{{n:study.min}}より少なくはしません。" }
      - { text: "最初と同じく学習を約{{n:study.beginner}}", why: "上の{{t:stakes|ステークス}}に向けて準備しているなら、それでもかまいません。今の{{t:stakes|ステークス}}で勝っているだけなら、約{{n:study.winner}}で十分です。" }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "プレイがコントロールできなくなりつつある可能性を示すサインはどれですか？"
    options:
      - { text: "負けた後、損失を取り戻すためにプレイに戻る", correct: true, why: "損失を取り戻そうとすることは、診断基準に挙げられているギャンブル問題のサインの一つです。自分にこうしたサインがあると気づいたら、責任あるプレイのカードにある連絡先を利用してください。" }
      - { text: "{{t:session|セッション}}の後に負けたハンドを分析する", why: "それは健全な学習習慣です。問題のサインには、損失を取り戻そうとすること、予定より長くプレイすること、借りたお金でプレイすることなどがあります。" }
      - { text: "予定どおりに{{t:session|セッション}}を終える", why: "それはプレイをうまく管理できている証拠です。問題のサインは、予定より長くプレイすることや、負けを取り戻したくなることです。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
バンクロールとは、ポーカーのプレイだけに充てる資金全体のことです。このレッスンでは、金額ではなく **{{t:buy-in|バイイン}}** の数で数えます。1{{t:buy-in|バイイン}}は、プレイしている{{t:stakes|ステークス}}でのフルスタック{{n:format.stack}}です。

## {{t:risk-of-ruin|破産リスク}}

同じ{{t:stakes|ステークス}}でプレイを続けた場合に、いつかバンクロールをすべて失う確率です。

```formula
RoR = e^(−2 × ウィンレート × バンクロール ÷ SD²)
```

この式は、ウィンレートとSDが一定であると仮定した近似です。ウィンレートとSDはbb/100で、バンクロールはbbで入力します。{{t:standard-deviation|標準偏差}}が{{n:var.sd}}の場合：

| ウィンレート | {{n:br.bi.move-down}}{{t:buy-in|バイイン}} | {{n:br.bi.base}}{{t:buy-in|バイイン}} | {{n:br.bi.beginner}}{{t:buy-in|バイイン}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## リスクを決めるもの

式の中でウィンレートとバンクロールは並んでいます。ウィンレートが半分なら、同じリスクにするにはバンクロールが2倍必要です。そのため、同じ{{t:buy-in|バイイン}}数でも、あるプレイヤーのリスクは別のプレイヤーより数倍小さくなります。最初はウィンレートがわからず、推定するには非常に多くのハンドが必要です（{{t:variance|分散}}のレッスン）。ウィンレートがマイナスなら、どんなバンクロールも役に立ちません。バンクロールは{{t:variance|分散}}から守るものであり、弱いプレイから守るものではないからです。

## {{t:stakes|ステークス}}を下げるタイミング

ラインは事前に決めておきます。バンクロールが想定した{{t:buy-in|バイイン}}数の **半分** まで減ったら、遅くともその時点で{{t:stakes|ステークス}}を1段階下げます。たとえば{{n:br.bi.base}}から{{n:br.bi.move-down}}になったときです。情報源によってラインは半分から満額までさまざまで、半分はその中で最も遅いラインです。半分の{{t:stakes|ステークス}}なら、同じバンクロールがそこでの{{t:buy-in|バイイン}}数でほぼ満額に戻ります。上に戻るのは、早くても上の{{t:stakes|ステークス}}の{{t:buy-in|バイイン}}数で満額のバンクロールがそろってからです。{{n:dd.bi.small}}{{t:buy-in|バイイン}}を失った時点で早めに下げるよう勧める情報源もあります。半分のラインより前に下げるのはミスではありません。

## 学習とプレイ

最初は時間の約{{n:study.beginner}}を学習に充て、残りをプレイに充てます。自分の{{t:stakes|ステークス}}で勝てるようになったら、理想は約{{n:study.winner}}ですが、学習は決して{{n:study.min}}を下回らないようにします。

:::note 責任あるプレイ
プレイがコントロールできなくなりつつあるサインの例：予定より長くプレイしている。負けた後、損失を取り戻すためにプレイに戻る。失ってはいけないお金でプレイする、またはプレイのためにお金を借りる。悩みから逃れるためにプレイする。身近な人にプレイを隠している。

相談先：

{{helplines}}
:::
