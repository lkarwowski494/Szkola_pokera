---
id: m12.l1
module: m12
order: 1
title: "数字で見る分散"
sub: "数千ハンドの結果から何がわかるか"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "平均{{n:var.wr.ex}}で勝っていて、これから{{n:var.hands.k}}kハンドをプレイします。期待収支は何{{t:buy-in|バイイン}}（各{{n:format.stack}}）ですか？数字を入力してください。"
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}}kハンドは、100ハンドのブロック{{n:var.blocks}}個分です。期待収支 = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}、つまり{{n:var.exp.bi}}{{t:buy-in|バイイン}}です。これは平均値です。実際の収支はここから大きく外れることがあります。"
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "あなたのプレイの{{t:standard-deviation|標準偏差}}は{{n:var.sd}}です。{{n:var.hands.k}}kハンド後（100ハンドのブロック{{n:var.blocks}}個）の収支の{{t:standard-deviation|標準偏差}}はいくつですか？"
    options:
      - { text: "約{{n:var.sd.result.bi}}{{t:buy-in|バイイン}}", correct: true, why: "{{t:standard-deviation|標準偏差}}はブロック数の平方根に比例して大きくなります：{{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}、つまり約{{n:var.sd.result.bi}}{{t:buy-in|バイイン}}です。" }
      - { text: "約{{n:var.sd.wrong.bi}}{{t:buy-in|バイイン}}", why: "{{t:standard-deviation|標準偏差}}にブロック数を掛けるとこの値になります。ランダムな振れは部分的に打ち消し合うので、平方根を掛けます：{{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}。" }
      - { text: "約{{n:var.exp.bi}}{{t:buy-in|バイイン}}", why: "これは{{n:var.wr.ex}}での期待収支で、その{{t:standard-deviation|標準偏差}}ではありません。{{t:standard-deviation|標準偏差}}は約{{n:var.sd.result.bi}}{{t:buy-in|バイイン}}です。" }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "{{t:standard-deviation|標準偏差}}{{n:var.sd}}で{{n:var.wr.ex}}勝っています。{{n:var.hands.k}}kハンド後の収支は、約{{n:var.conf95}}の確率でどの範囲に入りますか？"
    options:
      - { text: "約{{n:var.ci.low.bi}}〜約{{n:var.ci.high.bi}}{{t:buy-in|バイイン}}", correct: true, why: "期待収支{{n:var.exp.bi}}{{t:buy-in|バイイン}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}。はっきり勝っているプレイヤーでも、{{n:var.hands.k}}kハンド後にほぼプラマイゼロということがあります。" }
      - { text: "約{{n:var.ci68.low.bi}}〜約{{n:var.ci68.high.bi}}{{t:buy-in|バイイン}}", why: "これは1{{t:standard-deviation|標準偏差}}の範囲で、結果の約3回に2回しか含みません。{{n:var.conf95}}なら{{n:var.z95}}{{t:standard-deviation|標準偏差}}分を取ります：約{{n:var.ci.low.bi}}〜約{{n:var.ci.high.bi}}です。" }
      - { text: "ちょうど{{n:var.exp.bi}}{{t:buy-in|バイイン}}", why: "これは平均にすぎません。収支はその周りを上下に数十{{t:buy-in|バイイン}}振れます。" }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "{{n:var.hands.k}}kハンド（100ハンドのブロック{{n:var.blocks}}個）、{{t:standard-deviation|標準偏差}}{{n:var.sd}}の場合、bb/100でのウィンレートの標準誤差はいくつですか？√{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}として計算してください。数字を入力してください。"
    answer: var.se.wr
    explanation: "標準誤差 = SD ÷ √(ブロック数) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}。{{n:var.conf95}}の範囲は ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}です。"
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "{{n:var.hands.k}}kハンド後の収支は{{n:var.wr.ex}}、{{t:standard-deviation|標準偏差}}は{{n:var.sd}}です。本当のウィンレートについて何がわかりますか？"
    options:
      - { text: "約{{n:var.conf95}}の確率で、約{{n:var.wr.ci.low}}〜約{{n:var.wr.ci.high}}の間にある", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}。{{n:var.hands.k}}kハンド後にわかるのは、おそらく負けてはいないということだけです。" }
      - { text: "サンプルが大きいので、{{n:var.wr.ex}}である", why: "{{n:var.hands.k}}kハンドは多く聞こえますが、{{t:standard-deviation|標準偏差}}{{n:var.sd}}では誤差はまだ約± {{n:var.ci.wr}}あります。" }
      - { text: "何もわからない。ポーカーの結果は完全に運だから", why: "言い過ぎです。サンプルは範囲を狭めますが、そのペースは遅く、誤差はハンド数の平方根に比例して小さくなります。" }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "ウィンレートを{{n:var.conf95}}の確率で± {{n:var.target}}の精度で知りたいとします。{{t:standard-deviation|標準偏差}}は{{n:var.sd}}です。何ハンド必要ですか？"
    options:
      - { text: "約{{n:var.need.hands.k}}k", correct: true, why: "ブロック数 = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}。約{{n:var.need.hands.k}}kハンドです。" }
      - { text: "約{{n:var.hands.k}}k", why: "{{n:var.hands.k}}kハンド後の誤差は約± {{n:var.ci.wr}}です。± {{n:var.target}}まで小さくするには、約{{n:var.need.hands.k}}kハンドが必要です。" }
      - { text: "約{{n:var.need.blocks}}ハンド", why: "これは100ハンドのブロック数です。ハンド数はその100倍、約{{n:var.need.hands.k}}kです。" }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "{{t:standard-deviation|標準偏差}}{{n:var.sd}}で{{n:var.wr.ex}}勝っているプレイヤーがいます。{{n:var.hands.k}}kハンドの間に、最高点から{{n:dd.bi.small}}{{t:buy-in|バイイン}}以上の{{t:downswing|ダウンスウィング}}はどのくらいの頻度で起こりますか？"
    options:
      - { text: "ほぼ必ず、約{{n:dd.p.small.100k}}", correct: true, why: "この条件で{{n:var.hands.k}}kハンドをシミュレーションすると、約{{n:dd.p.small.100k}}の試行でこの規模の{{t:downswing|ダウンスウィング}}が起こります。{{n:dd.bi.small}}{{t:buy-in|バイイン}}の{{t:downswing|ダウンスウィング}}は、勝っているプレイヤーのゲームでも普通に起こることです。" }
      - { text: "約{{n:dd.p.small.20k}}のケース", why: "これはより短いサンプル、{{n:dd.hands.short.k}}kハンドでの値です。{{n:var.hands.k}}kハンドでは深い{{t:downswing|ダウンスウィング}}が起こる機会がずっと多く、約{{n:dd.p.small.100k}}になります。" }
      - { text: "まれ、約{{n:var.p.lose}}", why: "これは{{n:var.wr.ex}}のプレイヤーが{{n:var.hands.k}}kハンドをマイナスで終える頻度です。途中の{{t:downswing|ダウンスウィング}}は別物で、ほぼ必ず起こります。" }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "プレイヤーが2人、{{t:standard-deviation|標準偏差}}{{n:var.sd}}、{{n:var.hands.k}}kハンド。1人は{{n:var.wr.ex}}、もう1人は{{n:dd.wr-low}}で勝っています。それぞれが{{n:dd.bi.big}}{{t:buy-in|バイイン}}の{{t:downswing|ダウンスウィング}}に見舞われる頻度は？"
    options:
      - { text: "1人目は約{{n:dd.p.big.100k}}、2人目は約{{n:dd.p.big.100k.wr-low}}のケース", correct: true, why: "ウィンレートが低いと収支を押し上げる力が弱いため、{{t:downswing|ダウンスウィング}}はより深く、より頻繁になります。マイクロステークスで勝っているプレイヤーに典型的な{{n:dd.wr-low}}では、{{n:dd.bi.big}}{{t:buy-in|バイイン}}の{{t:downswing|ダウンスウィング}}がサンプルの半分以上で起こります。" }
      - { text: "{{t:standard-deviation|標準偏差}}が同じなので、どちらも同じ頻度", why: "{{t:standard-deviation|標準偏差}}は振れ幅を決めますが、収支がその振れからどれだけ速く抜け出すかを決めるのはウィンレートです。{{n:dd.wr-low}}では{{n:dd.bi.big}}{{t:buy-in|バイイン}}の{{t:downswing|ダウンスウィング}}が約{{n:dd.p.big.100k.wr-low}}のサンプルで、{{n:var.wr.ex}}では約{{n:dd.p.big.100k}}で起こります。" }
      - { text: "どちらも起こらない。{{n:dd.bi.big}}{{t:buy-in|バイイン}}の{{t:downswing|ダウンスウィング}}は負けているプレイヤーにしか起こらない", why: "違います。{{n:var.wr.ex}}のプレイヤーでも、{{n:var.hands.k}}kハンドのサンプルの約{{n:dd.p.big.100k}}でこれに見舞われます。" }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "1か月前から{{n:dd.bi.small}}{{t:buy-in|バイイン}}のマイナスです。ここから何が言えますか？"
    options:
      - { text: "{{t:downswing|ダウンスウィング}}だけでは何も決まらない。負けたハンドでの判断を見直す", correct: true, why: "{{n:var.hands.k}}kハンドで{{n:dd.bi.small}}{{t:buy-in|バイイン}}の{{t:downswing|ダウンスウィング}}は、{{n:dd.wr-low}}〜{{n:var.wr.ex}}で勝っているほぼすべてのプレイヤーに起こります（SD {{n:var.sd}}でのシミュレーション）。うまくプレイできているかを示すのは判断の見直しであって、収支だけではありません。" }
      - { text: "プレイが悪いので、スタイルを全面的に変えるべき", why: "この規模の{{t:downswing|ダウンスウィング}}は、{{n:var.wr.ex}}（SD {{n:var.sd}}）で勝っているプレイヤーにも、{{n:var.hands.k}}kハンドのサンプルの約{{n:dd.p.small.100k}}で起こります。収支だけを理由にスタイルを変えるのは、ノイズに反応することです。" }
      - { text: "間違いなく運が悪いだけで、何も見直す必要はない", why: "{{t:downswing|ダウンスウィング}}はミスから生じることもあります。収支では不運とミスを区別できませんが、ハンドの見直しならできます。" }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "6-maxノーリミットホールデムのキャッシュゲームで典型的な{{t:standard-deviation|標準偏差}}はどれですか？"
    options:
      - { text: "約{{n:var.sd.low}}〜{{n:var.sd.high}}", correct: true, why: "{{t:variance|分散}}計算ツールではこの値が示されます。典型値としては約{{n:var.sd}}が最もよく使われます。アグレッシブなスタイルほど{{t:standard-deviation|標準偏差}}は高くなります。" }
      - { text: "約{{n:var.wr.typical.low}}〜{{n:var.wr.typical.high}}", why: "これはマイクロステークスで勝っているプレイヤーの典型的なウィンレートです。{{t:standard-deviation|標準偏差}}はウィンレートの数十倍も大きく、そのため結果が大きく上下します。" }
      - { text: "100ハンドあたり約{{n:var.sd.result.bi}}{{t:buy-in|バイイン}}", why: "これは{{n:var.hands.k}}kハンド後の収支の{{t:standard-deviation|標準偏差}}で、100ハンドあたりの値ではありません。" }
---
ポーカーの収支は、どれだけうまくプレイするかと、運の2つの合計です。どちらも測ることができます。ウィンレートは平均でどれだけ勝っているかを、{{t:standard-deviation|標準偏差}}は収支がその平均の周りでどれだけ上下するかを表します。

## bb/100で表す2つの数字

**ウィンレート**は、100ハンドあたりの平均利益を{{t:big-blind|ビッグブラインド}}で表したものです。マイクロステークスで勝っているプレイヤーは、通常{{n:var.wr.typical.low}}〜{{n:var.wr.typical.high}}です。

**{{t:standard-deviation|標準偏差}}（SD）**は、100ハンドあたりの収支の典型的なばらつきです。6-maxのキャッシュゲームでは通常{{n:var.sd.low}}〜{{n:var.sd.high}}で、典型値として{{n:var.sd}}がよく使われます。{{t:standard-deviation|標準偏差}}はウィンレートの数十倍も大きいため、1回の{{t:session|セッション}}、さらには1か月の収支からわかることはごくわずかです。

## 多くのハンドをプレイした後の収支

ハンド数を100で割ると、ブロック数になります。

```formula
期待収支 = ウィンレート × ブロック数
収支の標準偏差 = SD × √(ブロック数)
{{n:var.conf95}}の範囲 = 期待収支 ± {{n:var.z95}} × 収支の標準偏差
```

例：{{n:var.wr.ex}}、SD {{n:var.sd}}、{{n:var.hands.k}}kハンド、つまり{{n:var.blocks}}ブロック。期待収支は{{n:var.exp.bb}}、つまり{{n:var.exp.bi}}{{t:buy-in|バイイン}}です。収支の{{t:standard-deviation|標準偏差}}は{{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}、つまり約{{n:var.sd.result.bi}}{{t:buy-in|バイイン}}です。{{n:var.conf95}}の確率で、収支は約**{{n:var.ci.low.bi}}〜{{n:var.ci.high.bi}}{{t:buy-in|バイイン}}**の間に収まります。期待収支はゼロより約{{n:var.z.lose}}{{t:standard-deviation|標準偏差}}上にあるので、{{n:var.hands.k}}kハンド後にマイナスになっている確率は約{{n:var.p.lose}}です。

## ウィンレートを知るには何ハンド必要か

同じ計算は逆向きにも使えます。ウィンレートの推定誤差は、ハンド数の平方根に比例して小さくなります。

```formula
ウィンレートの誤差 = SD ÷ √(ブロック数)
必要なブロック数 = ({{n:var.z95}} × SD ÷ 精度)²
```

{{n:var.hands.k}}kハンド後の誤差は約{{n:var.se.wr}}なので、{{n:var.conf95}}の範囲は± {{n:var.ci.wr}}です。このとき{{n:var.wr.ex}}という結果が意味するのは、本当のウィンレートが約{{n:var.wr.ci.low}}〜{{n:var.wr.ci.high}}のどこかにあるということだけです。ウィンレートを± {{n:var.target}}の精度で知るには、約**{{n:var.need.hands.k}}kハンド**が必要です。

## {{t:downswing|ダウンスウィング}}は普通のこと

{{t:downswing|ダウンスウィング}}とは、収支が最高点から下がることです。SD {{n:var.sd}}、{{n:var.wr.ex}}のプレイヤーのシミュレーション：

| 最高点からの{{t:downswing|ダウンスウィング}} | {{n:dd.hands.short.k}}kハンド | {{n:var.hands.k}}kハンド | {{n:var.hands.k}}kハンド（{{n:dd.wr-low}}の場合） |
|---|---|---|---|
| {{n:dd.bi.small}}{{t:buy-in|バイイン}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}}{{t:buy-in|バイイン}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note この数字の出どころ
シミュレーションの結果です。各ブロックの収支をランダムに決め、{{n:var.hands.k}}kハンドのプレイを数千回試行しました。実際の{{t:downswing|ダウンスウィング}}はもう少し深くなることがあります。収支は100ハンドごとではなく、1ハンドごとに変わるからです。結論：{{n:dd.bi.small}}{{t:buy-in|バイイン}}の{{t:downswing|ダウンスウィング}}は、プレイが悪いことの証明にはなりません。
:::

これは一般的な目安であり、結果を保証するものではありません。プレイをコントロールできなくなってきたら、「ヘルプ」画面を確認してください。
