---
id: m9.l2
module: m9
order: 2
title: "コミットメント"
sub: "スタック全部をかけてプレイするとき"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "フロップ、{{t:spr}} {{n:spr.commit}}：{{t:pot|ポット}}は{{n:ex.pot}}、スタックはそれぞれ{{n:commit.stack}}です。{{t:pot|ポット}}全額（{{n:ex.bet.pot}}）をベットすると、相手がオールインしました。追加で{{n:commit.after-pot.call}}を支払います。{{t:call|コール}}に必要なエクイティはいくつですか？パーセントで数値を入力してください。"
    answer: eq.commit.after-pot
    explanation: "相手の上乗せ分を除くと、{{t:pot|ポット}}には{{n:ex.pot.after-pot-call}}あります（{{t:pot}}、あなたの{{t:bet}}、それに合わせた相手の額）。追加で{{n:commit.after-pot.call}}を支払うので、必要なエクイティ = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}です。このような{{t:bet|ベット}}の後は、あなたはコミットしています。{{t:fold}}は通常割に合いません。"
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "フロップ、{{t:spr}} {{n:spr.commit}}：{{t:pot|ポット}}は{{n:ex.pot}}、スタックはそれぞれ{{n:commit.stack}}です。{{t:pot|ポット}}の半分（{{n:ex.bet.half}}）をベットすると、相手がオールインしました。追加で{{n:commit.after-half.call}}を支払います。{{t:call|コール}}に必要なエクイティはいくつですか？パーセントで数値を入力してください。"
    answer: eq.commit.after-half
    explanation: "相手の上乗せ分を除くと、{{t:pot|ポット}}には{{n:ex.half.total}}あります（{{t:pot}}、あなたの{{t:bet}}、それに合わせた相手の額）。追加で{{n:commit.after-half.call}}を支払います：{{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}。すぐにオールインされる場合（{{n:eq.jam.spr2}}）より少なくて済みます。すでにお金の一部を入れているからです。"
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "フロップ、{{t:spr}} {{n:spr.commit}}。{{t:top-pair|トップペア}}を持っていて、{{t:pot|ポット}}全額をベットすると、相手がオールインしました。{{t:call|コール}}には{{n:eq.commit.after-pot}}のエクイティが必要です。どうしますか？"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|コール}}する", correct: true, why: "はい。価格はとても良いです。低い{{t:spr}}では、相手は{{t:draw|ドロー}}や弱いクイーンでもオールインしてくるので、エース付きの{{t:top-pair}}は通常{{n:eq.commit.after-pot}}を大きく上回るエクイティがあります。はっきり負けるのは{{t:two-pair|ツーペア}}とセットだけです。" }
      - { text: "オールインは強い手を示すので{{t:fold|フォールド}}する", why: "{{t:fold|フォールド}}すると、すでに多く入れた{{t:pot|ポット}}を手放すことになります。勝つ必要があるのは5回に1回、つまり{{n:eq.commit.after-pot}}だけです。ここで{{t:fold|フォールド}}するつもりだったなら、{{t:pot|ポット}}全額をベットしないほうが良かったのです。" }
      - { text: "{{t:spr}}が低いので{{t:fold|フォールド}}する", why: "低い{{t:spr}}は逆に働きます。オールインに対する価格が良くなるので、スタック全部をかけてプレイしやすくなります。" }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "あなたが{{t:bet|ベット}}した後のスタックの残りが、そのベットを{{t:call|コール}}された後の{{t:pot}}より少なくなるとします。意味のないプランはどれですか？"
    options:
      - { text: "{{t:bet|ベット}}して、相手がオールインしたら{{t:fold}}", correct: true, why: "はい、このプランは誤りです。このような{{t:bet|ベット}}の後、オールインを{{t:call|コール}}するのに必要なエクイティはごくわずかです（{{t:spr}} {{n:spr.commit}}で{{t:pot|ポット}}サイズの{{t:bet|ベット}}なら、わずか{{n:eq.commit.after-pot}}）。それでも{{t:fold|フォールド}}するなら、{{t:bet}}は{{t:chips}}を差し出すだけです。" }
      - { text: "すぐにオールイン", why: "強い手なら合理的なプランです。どのみちスタック全部をかけてプレイするので、すぐに全部入れます。" }
      - { text: "{{t:check|チェック}}", why: "スタック全部をかけたくないときにも合理的です。後で{{t:fold|フォールド}}しにくくなるようなお金を入れずに済みます。" }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "4ベット後の{{t:pot|ポット}}、{{t:spr}}は約{{n:spr.4bet}}。ベストキッカーで{{t:top-pair|トップペア}}をヒットしました。どんなプランにしますか？"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "スタック全部をかけてプレイする", correct: true, why: "はい。{{t:spr}}約{{n:spr.4bet}}では、オールインに必要なエクイティは約{{n:eq.jam.4bet}}だけで、エース付きの{{t:top-pair}}はここでとても強い手です。全部入れるつもりでベットするか{{t:call|コール}}します。" }
      - { text: "慎重にプレイし、大きな{{t:bet}}には{{t:fold|フォールド}}する", why: "これほど低い{{t:spr}}で{{t:fold}}を{{t:top-pair|トップペア}}で選ぶと、手放すものが大きすぎます。4ベット後の相手はAQ、QQ、JJなど、あなたの手に負ける手も持っています。" }
      - { text: "小さくベットして、オールインには{{t:fold|フォールド}}する", why: "これは低い{{t:spr}}での{{t:bet}}と{{t:fold}}のプランです。{{t:bet|ベット}}の後はオールインに対する価格がさらに良くなり、{{t:fold}}はすでにお金を入れた{{t:pot|ポット}}を手放すことになります。" }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:spr}}が約{{n:spr.commit}}のとき、なぜ{{t:top-pair}}は通常スタック全部をかけてプレイするのですか？"
    options:
      - { text: "オールインに必要なエクイティは約{{n:eq.jam.spr2}}で、{{t:pot|ポット}}の約{{n:geo.spr2.2}}の{{t:bet|ベット}}2回でスタック全部が入るから", correct: true, why: "はい。価格が良く、スタックを入れるには2ストリートの{{t:value|バリュー}}で足ります。{{t:top-pair}}は通常それくらいには耐えられます。しきい値自体はヒューリスティックです。相手が何でプレイするかも重要です。" }
      - { text: "{{t:top-pair}}は必ず勝つから", why: "必ずではありません。相手が{{t:two-pair}}やセットを持っていることもあります。ただし低い{{t:spr}}では、より弱い手や{{t:draw|ドロー}}も十分なお金を入れてくれ、価格も良いのです。" }
      - { text: "{{t:spr}} {{n:spr.commit}}では、ルール上{{t:fold|フォールド}}できないから", why: "{{t:fold|フォールド}}はいつでもできます。ポイントは、{{t:fold}}は通常、得るものより失うもののほうが大きいということです。オールインに必要なエクイティは約{{n:eq.jam.spr2}}だけです。" }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "シングルレイズの{{t:pot|ポット}}、スタックはそれぞれ{{n:format.stack}}、{{t:spr}}は約{{n:spr.srp}}。良いキッカーで{{t:top-pair|トップペア}}をヒットしました。この手をどう扱いますか？"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "バリューの手として扱うが、通常はスタック全部をかける手ではない", correct: true, why: "はい。{{t:spr}}約{{n:spr.srp}}では、{{t:pot}}より大きい{{t:bet|ベット}}を何回か重ねて初めてスタック全部が入ります。それだけ入れてくる相手が、{{t:pair}}1つより弱い手を持っていることはまれです。" }
      - { text: "{{t:top-pair}}は強いので、スタック全部をかけてプレイする", why: "{{t:spr}} {{n:spr.commit}}ならそうですが、ここでは{{t:spr}}は約{{n:spr.srp}}です。{{t:pot|ポット}}にスタック全部が入るとき、相手は通常{{t:two-pair}}、セット、またはより強い{{t:pair|ペア}}を持っています。" }
      - { text: "相手の最初の{{t:bet}}に{{t:fold|フォールド}}する", why: "慎重すぎます。良いキッカーの{{t:top-pair}}はこのフロップでは強い手です。ポイントは、この手でスタック全部の{{t:pot|ポット}}を作らないことであって、{{t:fold}}することではありません。" }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "4ベット後の{{t:pot|ポット}}、{{t:spr}}は約{{n:spr.4bet}}。ジャックの{{t:pair|ペア}}を持っていて、フロップにはエースとキングがあります。相手がオールインしました。「低い{{t:spr}}ではスタックをかけてプレイする」というルールはどうなりますか？"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "この手には当てはまらない。{{t:board|ボード}}の高いカード2枚より低い{{t:pair}}だから", correct: true, why: "はい。このルールは{{t:top-pair|トップペア}}以上の手についてのものです。4ベット後の相手はエースかキングを持っていることが多く、あなたのジャックは高いカードで作られたどの{{t:pair|ペア}}にも負けます。良い価格（{{n:eq.jam.4bet}}）でも、ここでは{{t:fold|フォールド}}することが多くなります。" }
      - { text: "当てはまる。低い{{t:spr}}では何でも{{t:call|コール}}する", why: "低い{{t:spr}}は良い価格をもたらしますが、弱い手を強い手に変えるわけではありません。相手がより強い{{t:pair|ペア}}を持っていることが多いなら、{{n:eq.jam.4bet}}のエクイティでも多すぎる場合があります。" }
      - { text: "当てはまる。ただし{{t:position|ポジション}}がある場合だけ", why: "{{t:position|ポジション}}は、あなたが何でプレイしているかを変えません。このルールは{{t:top-pair|トップペア}}以上の手が対象です。" }
---
コミットメント（英語ではcommitment）とは、あなたのスタックに対して{{t:pot|ポット}}にすでに多くのお金が入っていて、オールインに{{t:fold}}することがほとんど割に合わない状況のことです。前のレッスンの{{t:spr}}は、フロップの開始時点ですでにどれだけその状況に近いかを示します。

## {{t:bet|ベット}}の後は、価格がさらに良くなる

例：{{t:spr}} {{n:spr.commit}}、{{t:pot|ポット}}は{{n:ex.pot}}、スタックはそれぞれ{{n:commit.stack}}です。相手がすぐにオールインした場合、必要なエクイティは{{n:eq.jam.spr2}}です。先にあなたがベットしていれば、必要なエクイティは少なくなります：

| 相手のオールイン前のあなたの{{t:bet}} | 追加で支払う額 | 必要なエクイティ |
|---|---|---|
| なし（相手がすぐにオールイン） | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| {{t:pot|ポット}}の半分（{{n:ex.bet.half}}） | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| {{t:pot}}全額（{{n:ex.bet.pot}}） | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## {{t:bet|ベット}}して{{t:fold|フォールド}}するプランは立てない

あなたが{{t:bet|ベット}}した後のスタックの残りが、そのベットを{{t:call|コール}}された後の{{t:pot}}より少なくなるなら、{{t:bet}}してオールインに{{t:fold}}するのは通常意味がありません。その場合、オールインを{{t:call|コール}}するのに必要なエクイティは、{{t:pot|ポット}}サイズの{{t:bet|ベット}}を{{t:call|コール}}するのに必要なエクイティ（{{n:eq.bet-pot}}）より少ないからです。合理的な選択肢は2つです：スタック全部をかけてプレイする（ベットするかオールインする）か、{{t:check|チェック}}するかです。

## 低い{{t:spr}}：{{t:top-pair}}はスタックをかけてプレイする

ルール：**フロップの{{t:spr}}が約{{n:spr.zone.low}}より低いとき、{{t:top-pair}}以上の手は通常スタック全部をかけてプレイします**（前のレッスンの{{t:spr}}のゾーン）。例の{{t:spr}} {{n:spr.commit}}はこのゾーンに入り、そこでの計算はこのルールを裏付けます：

- オールインに必要なエクイティは最大でも約{{n:eq.jam.spr2}}で、自分で{{t:bet|ベット}}した後はさらに少なくなります。
- {{t:pot|ポット}}の約{{n:geo.spr2.2}}の{{t:bet|ベット}}2回でスタック全部が入ります。{{t:pot|ポット}}が{{n:ex.pot}}なら、フロップで{{n:geo.spr2.flop}}、ターンで{{n:geo.spr2.turn}}、合計{{n:geo.spr2.total}}です。
- {{t:top-pair}}は通常、2ストリートの{{t:value|バリュー}}に耐えられます（3{{t:street|ストリート}}のプランについてのレッスン）。

ただし、計算で正確なしきい値が決まるわけではありません。{{t:top-pair}}に十分なエクイティがあるかどうかは、相手が何でプレイするかによります。だからこれはヒューリスティックであって、厳密な法則ではありません。このルールは{{t:top-pair|トップペア}}以上の手が対象です。{{t:board|ボード}}の高いカードより低い{{t:pair}}は条件を満たしません。

## 高い{{t:spr}}：{{t:pair}}1つはより慎重に

シングルレイズの{{t:pot|ポット}}では、{{t:spr}}は約{{n:spr.srp}}です。リバーまでにスタック全部を入れるには、各{{t:street|ストリート}}で{{t:pot|ポット}}より多くベットしなければなりません（ジオメトリックサイズについてのレッスン）。それだけのお金を入れてくる相手が、{{t:pair}}1つより弱い手を持っていることはまれです。だから、このような{{t:pot|ポット}}で{{t:pair|ペア}}1つを持っているときはバリューでプレイしますが、通常はスタック全部をかけてプレイするプランは立てません。

:::note これらのルールの出典
約{{n:spr.zone.low}}という境界は、トレーニング教材と公開されたソルバー分析に基づいています（{{t:spr}}約{{n:spr.commit}}では、すべての{{t:top-pair}}以上の手がスタックをかけてプレイします）。高い{{t:spr}}で{{t:pair|ペア}}1つを慎重に扱うことは、トレーニング教材とソルバー分析で裏付けられています。このレッスンの価格とサイズの数値は純粋な数学です。
:::
