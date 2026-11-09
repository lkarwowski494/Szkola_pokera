---
id: m11.l1
module: m11
order: 1
title: "ショートスタック：オールインかフォールドか"
sub: "レイズがオールインに変わるとき"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|トーナメント}}です。スタックは{{n:m11.depth.10}}で、前のプレイヤー全員が{{t:fold|フォールド}}しました。シンプルで、情報源で裏付けられているゲームプランはどれですか？"
    options:
      - { text: "オールインか{{t:fold}}", correct: true, why: "約{{n:m11.thr.pushfold}}以下では、情報源はそろってプッシュ／フォールドを推奨しています。レイズしてから相手の{{t:raise|レイズ}}に{{t:fold}}すると、スタックを失いすぎます。オールインなら、相手から最も多くの{{t:fold|フォールド}}を引き出せます。" }
      - { text: "{{n:pf.open-size}}にレイズし、{{t:raise|レイズ}}されたら判断する", why: "そのサイズでレイズすると、{{t:pot|ポット}}に入れずに手元に残るチップはわずかになり、オールインの{{t:raise|レイズ}}を受けたら結局ほぼ{{t:call|コール}}せざるを得ません。相手は{{t:fold|フォールド}}する必要がなく、あなたはフォールドエクイティを失います。" }
      - { text: "ブラインドに{{t:call|コール}}して（リンプ）フロップを見る", why: "リンプでは{{t:pot|ポット}}をすぐに獲得するチャンスがありません。すべてのアクションを選べるソルバーはときどきリンプしますが、それは上級者向けの戦略です。シンプルで安全なプランはオールインか{{t:fold}}です。" }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "スタックは{{n:m11.thr.raise}}以上で、最初に{{t:open|オープン}}します。プレイしたいハンドではどうしますか？"
    options:
      - { text: "通常はレイズする（例：ミニマムレイズ）", correct: true, why: "約{{n:m11.thr.raise}}を超えるなら、情報源は通常のレイズを推奨しています。{{t:raise}}に{{t:fold|フォールド}}したり、フロップ後にプレイしたりする余裕がまだあります。" }
      - { text: "常にオールイン", why: "これほど大きなスタックでのオールインは、ブラインドを得るだけのために大きなリスクを負います。弱いハンドは{{t:fold|フォールド}}し、強いハンドだけが払ってきます。" }
      - { text: "{{n:m11.thr.pushfold}}のときと同じくプッシュ／フォールド", why: "プッシュ／フォールドは{{t:short-stack|ショートスタック}}のための手段です。約{{n:m11.thr.pushfold}}まで、弱めのハンドなら約{{n:m11.thr.upper}}までです。" }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "持ち{{t:chips|チップ}}は{{n:m11.m.stack}}です。ブラインドは{{n:m11.m.sb}}/{{n:m11.m.bb}}で、{{t:big-blind}}がさらにアンティ{{n:m11.m.ante}}を支払います。あなたのMはいくつですか？"
    answer: m11.m.value
    explanation: "M = スタック ÷ ({{t:small-blind}} + {{t:big-blind}} + アンティ) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}。これが、プレイせずに耐えられる周回数です。{{t:big-blind|ビッグブラインド}}換算では{{n:m11.m.bbs}}ですが、Mはアンティも計算に入れます。"
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "あなたのMは約{{n:m11.m.example}}まで下がりました。Mのゾーンモデルでは、これについて何と言っていますか？"
    options:
      - { text: "{{t:red-zone|レッドゾーン}}：オールインか{{t:fold}}のみ。できれば最初に参加する", correct: true, why: "Mが約{{n:m11.m.red}}以下では、残された選択肢はオールインか{{t:fold}}だけです。最初に参加すれば、全員が{{t:fold|フォールド}}するチャンスがあります。" }
      - { text: "{{t:green-zone|グリーンゾーン}}：通常どおりプレイする", why: "スタックに余裕があり自由にプレイできる{{t:green-zone|グリーンゾーン}}は、Mが約{{n:m11.m.green}}になってから始まります。Mが約{{n:m11.m.example}}なら、スタックが持つのは{{n:m11.m.example}}周分です。" }
      - { text: "どうせ時間はあるので、エースを待つ", why: "Mが約{{n:m11.m.example}}では、強いハンドが来る前にブラインドでスタックが削られてしまいます。より広い{{t:range|レンジ}}でオールインする必要があります。" }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "{{t:small-blind|スモールブラインド}}でスタックは{{n:m11.depth.10}}、全員が{{t:fold|フォールド}}しました。オールインするハンドを塗ってください。"
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|スモールブラインド}}で、全員が{{t:fold|フォールド}}し、手札はK2oです。{{n:m11.depth.10}}ならソルバーはこのハンドでオールインします。では{{n:m11.depth.15}}ではどうでしょう？"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "{{n:m11.depth.15}}ではブラインドに対するリスクが大きくなるため、オールインの{{t:range}}は約{{n:m11.push.10}}から約{{n:m11.push.15}}のハンドに狭まります。K2oはそこから外れます。" }
      - { text: "オールイン。キングは強いカードだから", why: "{{n:m11.depth.15}}では、K2oは{{t:call|コール}}する側の{{t:range|レンジ}}にある、より強いキングやエースにぶつかることが多すぎます。ソルバーはこのハンドを{{t:fold|フォールド}}します。" }
      - { text: "オールイン。スタックが深いほど広く打つから", why: "逆です。スタックが深いほど、オールインの{{t:range}}は狭くなります。最も広く{{t:shove|プッシュ}}するのは、ごく浅い{{t:short-stack|ショートスタック}}のときです。" }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|スモールブラインド}}、{{n:m11.depth.10}}、アンティなし。まったく勝ち目のないハンドでのオールインが損益ゼロになるには、{{t:big-blind}}は100回中何回{{t:fold|フォールド}}する必要がありますか？"
    options:
      - { text: "{{n:m11.push.10.alpha}}超", correct: true, why: "{{n:m11.push.10.win}}を得るために{{n:m11.push.10.risk}}をリスクにさらします。{{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}})は約{{n:m11.push.10.alpha}}です。相手はそこまで{{t:fold|フォールド}}しないので、オールインが利益になるのは、相手が{{t:call|コール}}したときにもエクイティがあるハンドだけです。" }
      - { text: "半分超", why: "勝てる額と同じだけをリスクにさらすなら、半分で足ります。ここでは{{n:m11.push.10.risk}}をリスクにさらし、得られるのは{{n:m11.push.10.win}}ブラインドだけです。" }
      - { text: "ときどき{{t:fold|フォールド}}すれば十分", why: "{{t:call}}されるたびに、勝ち目のないハンドはスタック全体を失います。エクイティがなければ、非常に高い頻度の{{t:fold|フォールド}}が必要です。{{n:m11.push.10.alpha}}超です。" }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:short-stack|ショートスタック}}のとき、ほかの誰かがオールインするのを待って{{t:call|コール}}するよりも、自分から先にオールインしたいのはなぜですか？"
    options:
      - { text: "オールインには2通りの勝ち方があるから", correct: true, why: "先に参加すれば、全員が{{t:fold|フォールド}}したときに{{t:pot|ポット}}を獲得するか、ショーダウンで勝ちます。{{t:call|コール}}する場合は、ショーダウンでしか勝てません。" }
      - { text: "オールインのほうが常にエクイティが高いから", why: "ハンドのエクイティは、誰が先に参加したかでは変わりません。違いは、オールインなら相手に{{t:fold|フォールド}}する機会を与える点です。" }
      - { text: "オールインへの{{t:call|コール}}は禁止されているから", why: "{{t:call|コール}}してもかまいませんが、{{t:call|コール}}するにはより強いハンドが必要です（{{t:call|コール}}のレッスンを参照）。" }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "同じ{{n:m11.depth.10}}のスタックで{{t:small-blind|スモールブラインド}}にいますが、{{t:bb-ante}}ありのゲームです。{{t:big-blind}}がアンティ{{n:m11.ante}}を支払いました。オールインの{{t:range}}はどう変わりますか？"
    options:
      - { text: "広がる：{{n:m11.push.10}}ではなく約{{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}", correct: true, why: "アンティによって、相手が{{t:fold|フォールド}}したときに獲得する{{t:pot|ポット}}が大きくなります。{{n:m11.push.10.win}}ではなく{{n:m11.push.10.win-ante}}です。勝ち目のないハンドでも、必要な{{t:fold|フォールド}}は{{n:m11.push.10.alpha-ante}}超で済むため、より多くのオールインが利益になります。" }
      - { text: "狭まる。相手は{{t:pot|ポット}}により多く出しているので、より頻繁に{{t:call|コール}}するから", why: "相手は確かに広く{{t:call|コール}}しますが、獲得できる{{t:pot}}が大きくなる効果のほうが上回ります。均衡は約{{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}のハンドです。" }
      - { text: "変わらない", why: "アンティはリスクとリワードの比率を変えます。アンティなしでは約{{n:m11.push.10}}、アンティありでは約{{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}です。" }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
{{t:tournament|トーナメント}}ではブラインドは上がっていきますが、スタックは増えません。遅かれ早かれスタックが少なくなりすぎて、通常のレイズが機能しなくなります。そこで使うのが**プッシュ／フォールド**戦略です。プレイするハンドはすべて{{t:shove|プッシュ}}、つまりオールインし、それ以外は{{t:fold|フォールド}}します。

## オールインか{{t:fold}}にするとき

スタックは{{t:big-blind|ビッグブラインド}}単位で数えます。情報源は1つの点で一致しています。約**{{n:m11.thr.pushfold}}以下**では、ほぼオールインか{{t:fold}}だけでプレイします。

| スタック | 通常の選択 |
|---|---|
| 約{{n:m11.thr.pushfold}}以下 | オールインか{{t:fold}} |
| {{n:m11.thr.pushfold}}から{{n:m11.thr.upper}} | 弱めと中程度のハンドはプッシュ／フォールド |
| 約{{n:m11.thr.raise}}超 | 通常のレイズ |

なぜレイズではないのでしょうか？ {{n:m11.depth.10}}で{{n:pf.open-size}}にレイズすると、{{t:pot|ポット}}に入れずに手元に残るチップはごくわずかになり、オールインの{{t:raise}}を受けたら結局ほぼ{{t:call|コール}}せざるを得ません。相手はあなたが{{t:fold|フォールド}}しないと分かっているので、恐れる必要がありません。すぐにオールインすれば、スタックから最も多くの**フォールドエクイティ**、つまり相手が{{t:fold|フォールド}}することによる利益を引き出せます。

:::note 簡略化
プッシュ／フォールドは簡略化された戦略です。リンプや小さなレイズも選べるソルバーは、{{n:m11.depth.10}}で一部のハンドをリンプしたり、ミニマムレイズしたりします。それでも、オールインか{{t:fold}}はシンプルで大きなミスをしにくく、情報源も出発点として推奨しています。
:::

## M：何周耐えられるか

よく使われるトーナメントのモデルでは、{{t:short-stack}}を別の方法で測ります。**M**は、スタックをテーブルのプレイヤーが1周するコストで割ったものです。

```formula
M = スタック ÷ (スモールブラインド + ビッグブラインド + アンティ)
```

例：持ち{{t:chips|チップ}}が{{n:m11.m.stack}}、ブラインドが{{n:m11.m.sb}}/{{n:m11.m.bb}}、{{t:bb-ante}}が{{n:m11.m.ante}}の場合、M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**です。{{t:big-blind|ビッグブラインド}}換算では{{n:m11.m.bbs}}ですが、Mはアンティも考慮します。Mが約{{n:m11.m.red}}以下（{{t:red-zone}}）では、残された選択肢はオールインか{{t:fold}}だけです。

## スタックが浅いほど広く

このレッスンのグリッドは、このアプリのソルバーが最もシンプルな状況で計算したものです。全員が{{t:fold|フォールド}}し、あなたは{{t:small-blind|スモールブラインド}}から{{t:big-blind|ビッグブラインド}}と対戦し、どちらもオールインか{{t:fold|フォールド}}しかできません。

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

{{n:m11.depth.15}}では約{{n:m11.push.15}}のハンドで、{{n:m11.depth.10}}では約{{n:m11.push.10}}で、{{n:m11.depth.5}}では約{{n:m11.nash.push.5}}–{{n:m11.push.5}}でオールインします。ブラインドに対するリスクが小さいほど、利益になるハンドは増えます。比較として、あるトレーニングサイトの表では{{n:m11.depth.10}}で{{n:m11.ext.push.10}}となっています。この差はソルバーの検証許容範囲内で、傾向は同じです。

## 3人の場合：後ろの相手が多いほど狭く

ボタンからプレイすると、後ろには1人ではなく2人のプレイヤーがいます。どちらも強いハンドを持っている可能性があるため、2人とも{{t:fold|フォールド}}することは少なくなります。3人でスタックがそれぞれ{{n:m11.depth.3max}}の場合、ボタンは約{{n:m11.3max.push.btn}}のハンドでオールインし、{{t:small-blind}}はボタンが{{t:fold|フォールド}}したとき約{{n:m11.3max.push.sb}}でオールインします。

```range
push.btn-3max
```

```range
push.sb-3max
```

この2つのグリッドは、同じ状況について公表されている均衡の結果（2008年の研究論文：ボタン{{n:m11.jamfold3.btn}}）と照合しました。結果が異なる数少ないハンドは、ドリルには使っていません。

## 2通りの勝ち方

オールインは、相手が{{t:fold|フォールド}}したとき、または相手が{{t:call|コール}}してショーダウンで負けたときに勝ちます。相手の{{t:fold}}だけで十分なことはめったにありません。{{n:m11.depth.10}}では{{n:m11.push.10.win}}ブラインドを得るために{{n:m11.push.10.risk}}をリスクにさらすので、勝ち目のないハンドなら{{n:m11.push.10.alpha}}超のケースで{{t:fold|フォールド}}してもらう必要があります。だからこそ、フォールドエクイティと、相手が{{t:call|コール}}したときのハンドのエクイティの両方が重要です。

## アンティで{{t:range}}が広がる

アンティとは、配札前に{{t:pot|ポット}}に入る追加の{{t:chips}}です。{{t:bb-ante}}では{{t:big-blind}}がアンティ{{n:m11.ante}}を支払うため、オールインで得られるのは{{n:m11.push.10.win}}ではなく{{n:m11.push.10.win-ante}}になり、リスクは変わりません。このストラクチャーでは、{{t:range|レンジ}}は約{{n:m11.push.10}}から約{{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}のハンドに広がります（アプリのソルバーと独立した均衡計算の差は1ポイント未満です）。

```range
push.sb-10-ante
```
