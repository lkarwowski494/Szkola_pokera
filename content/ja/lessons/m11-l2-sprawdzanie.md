---
id: m11.l2
module: m11
order: 2
title: "オールインへのコール"
sub: "必要なエクイティと、より狭くコールする理由"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "{{t:big-blind|ビッグブラインド}}で{{n:m11.depth.10}}を持っています。アンティはありません。{{t:small-blind|スモールブラインド}}が{{n:m11.depth.10}}でオールインしました。{{t:call|コール}}が利益になるには、何パーセントのエクイティが必要ですか？数字を入力してください。"
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "あなたのブラインドはすでに{{t:pot|ポット}}に入っているので、追加するのは{{n:m11.call.10.cost}}です。{{t:call|コール}}後の{{t:pot|ポット}}は{{n:m11.call.10.pot}}です：{{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}。"
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "同じ場面ですが、スタックはそれぞれ{{n:m11.depth.5}}です。オールインを{{t:call|コール}}するには、どれだけのエクイティが必要ですか？"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "{{t:call|コール}}後に{{n:m11.call.5.pot}}になる{{t:pot|ポット}}へ{{n:m11.call.5.cost}}を追加するので、{{n:m11.call.5.eq}}です。スタックが短いと、ブラインドがスタックに占める割合が大きくなるので、価格が良くなります。" }
      - { text: "{{n:m11.call.10.eq}}", why: "それは{{n:m11.depth.10}}のときの価格です。{{n:m11.depth.5}}では、あなたのブラインドがスタック全体に占める割合が大きいので、必要なエクイティはもっと少なく、{{n:m11.call.5.eq}}です。" }
      - { text: "半分", why: "スタック全体を追加で入れるなら、半分が必要です。ブラインドはすでに{{t:pot|ポット}}に入っているので、追加するのは{{n:m11.call.5.cost}}だけです。" }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "スタックはそれぞれ{{n:m11.depth.15}}で、{{t:small-blind|スモールブラインド}}がオールインしました。{{t:call|コール}}するには、どれだけのエクイティが必要ですか？"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "{{n:m11.call.15.pot}}の{{t:pot|ポット}}に{{n:m11.call.15.cost}}を追加するので、{{n:m11.call.15.eq}}です。スタックが深いほど、半分に近づきます。" }
      - { text: "{{n:m11.call.5.eq}}", why: "それは{{n:m11.depth.5}}のときの価格です。{{n:m11.depth.15}}では、ブラインドがスタックに占める割合が小さいので、価格は{{n:m11.call.15.eq}}まで上がります。" }
      - { text: "半分より多い", why: "スタックがとても深くても、価格が半分を超えることはありません。{{t:pot|ポット}}には常に自分のブラインドが入っているからです。" }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "{{t:big-blind|ビッグブラインド}}で{{n:m11.depth.10}}を持っていて、{{t:small-blind|スモールブラインド}}がオールインしました。{{t:call|コール}}するハンドを塗ってください。"
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "{{n:m11.depth.10}}では、ソルバーは{{t:small-blind|スモールブラインド}}から同じスートの7と6（76s）でオールインします。あなたは{{t:big-blind|ビッグブラインド}}でこのハンドを持っていて、{{t:small-blind|スモールブラインド}}がオールインしました。どうしますか？"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|フォールド}}します", correct: true, why: "76sでのオールインが利益になるのは、主に相手の{{t:fold|フォールド}}のおかげです。{{t:call|コール}}すると、勝てるのはショーダウンだけで、しかも相手は高いカードや{{t:pair|ペア}}を多く含むオールインの{{t:range|レンジ}}です。ソルバーはこのハンドを{{t:fold|フォールド}}します。" }
      - { text: "{{t:call|コール}}します。{{t:small-blind|スモールブラインド}}からならこのハンドでオールインするからです", why: "{{t:call|コール}}は別の状況です。フォールドエクイティがなく、相手の{{t:range|レンジ}}はランダムより強いからです。{{t:call|コール}}するには、より強いハンドが必要です。" }
      - { text: "{{t:call|コール}}します。同じスートのハンドはよく発展するからです", why: "オールインの後には、ハンドが発展するようなその後のプレイがありません。重要なのはショーダウンまでのエクイティだけです。" }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|ビッグブラインド}}で、{{t:small-blind|スモールブラインド}}がオールインしました。あなたは2の{{t:pair|ペア}}を持っています。{{n:m11.depth.10}}ではソルバーは{{t:call|コール}}します。では{{n:m11.depth.15}}ではどうですか？"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|フォールド}}します", correct: true, why: "{{n:m11.depth.15}}では価格が{{n:m11.call.15.eq}}まで上がり、オールインの{{t:range|レンジ}}も狭くなる（約{{n:m11.push.15}}のハンド）ので、2の{{t:pair|ペア}}がより高い{{t:pair|ペア}}にぶつかることが多くなります。{{t:call|コール}}の{{t:range|レンジ}}は約{{n:m11.call.10}}から約{{n:m11.call.15}}のハンドに減ります。" }
      - { text: "{{t:call|コール}}します。{{t:pair|ペア}}は常に有利だからです", why: "2の{{t:pair|ペア}}は2枚の高いカードに対してほぼコイントスで、より高い{{t:pair|ペア}}に対しては明らかに不利です。スタックが深いと相手が{{t:shove|プッシュ}}する弱いハンドは減るので、相手の{{t:range|レンジ}}に占める{{t:pair|ペア}}の割合が大きくなります。" }
      - { text: "{{t:call|コール}}します。スタックが深いほど広くなるからです", why: "逆です。スタックが深いほど{{t:call|コール}}のコストは高くなり、{{t:call|コール}}の{{t:range|レンジ}}は狭くなります。" }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "{{n:m11.depth.10}}では、{{t:small-blind|スモールブラインド}}は約{{n:m11.push.10}}のハンドでオールインしますが、{{t:big-blind|ビッグブラインド}}が{{t:call|コール}}するのは約{{n:m11.call.10}}だけです。なぜですか？"
    options:
      - { text: "コールする側にはフォールドエクイティがなく、ランダムより強い{{t:range|レンジ}}を相手にプレイするから", correct: true, why: "オールインは、相手が{{t:fold|フォールド}}したときにも勝ちます。{{t:call|コール}}が勝つのはショーダウンだけで、しかも相手はすでに選び抜かれたハンドです。そこから昔からのルールが生まれました：{{t:call|コール}}するには、最初にオールインするより良いハンドが必要です。" }
      - { text: "{{t:big-blind|ビッグブラインド}}のほうが多く払うから", why: "どちらも同じスタックを賭けていて、{{t:big-blind|BB}}はすでに自分のブラインドを{{t:pot|ポット}}に入れているので、追加する額はむしろ少なくなります。" }
      - { text: "ソルバーが間違っているから", why: "これはオールインか{{t:fold|フォールド}}かのゲームの均衡です。どのプレイヤーも、自分の{{t:range|レンジ}}だけを変えて得をすることはできません。差はフォールドエクイティから生まれます。" }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "{{t:bb-ante|ビッグブラインドアンティ}}ありのゲームです。{{t:big-blind|ビッグブラインド}}で{{n:m11.depth.10}}を持っていて、アンティ{{n:m11.ante}}を支払いました。{{t:small-blind|スモールブラインド}}がオールインしました。{{t:call|コール}}するには、どれだけのエクイティが必要ですか？"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "追加する額は同じ（{{n:m11.call.10.cost}}）ですが、{{t:pot|ポット}}にはアンティも入っています。{{t:call|コール}}後は{{n:m11.call.10-ante.pot}}です。{{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}。だからアンティがあると、より広く{{t:call|コール}}します：{{n:m11.call.10}}ではなく約{{n:m11.call.10-ante}}のハンドです。" }
      - { text: "{{n:m11.call.10.eq}}", why: "それはアンティなしの価格です。アンティは{{t:pot|ポット}}に残るので、同じ追加額でより多く勝てます：{{n:m11.call.10-ante.eq}}。" }
      - { text: "アンティなしより多い。より多く支払ったから", why: "アンティはすでに使ったお金です。重要なのは、あといくら追加するかと、いくら勝てるかだけです。" }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "3人で、スタックはそれぞれ{{n:m11.depth.3max}}です。ボタンがオールインし、{{t:small-blind|スモールブラインド}}が{{t:call|コール}}しました。{{t:big-blind|ビッグブラインド}}のあなたに必要なエクイティは{{n:m11.3max.bb-two.eq}}だけです。ボタンだけがオールインしたときより広く{{t:call|コール}}しますか？"
    table: { position: BB }
    options:
      - { text: "いいえ、より狭くします", correct: true, why: "価格は良くなりますが、2つの{{t:range|レンジ}}を相手にプレイすることになり、そのうち1人は強いハンドを持つコールした側です。ここでソルバーが{{t:call|コール}}するのは約{{n:m11.3max.call.bb-two}}のハンドで、オールインがボタンだけのときは約{{n:m11.3max.call.bb}}です。" }
      - { text: "はい、価格がずっと良いから", why: "価格が良いだけでは足りません。2人の相手に対しては、弱いハンドのエクイティがすぐに下がります。ソルバーが{{t:call|コール}}するのは約{{n:m11.3max.call.bb-two}}のハンドだけです。" }
      - { text: "同じ。重要なのは自分のハンドだけだから", why: "重要なのは相手のハンドに対するエクイティです。ボタンのオールインにコールしたプレイヤーはボタンより強い{{t:range|レンジ}}を持っているので、より狭く{{t:call|コール}}します。" }
---
相手がオールインし、あなたが{{t:big-blind|ビッグブラインド}}にいるとき、判断の形はシンプルです：{{t:call|コール}}するか{{t:fold|フォールド}}するかです。{{t:call|コール}}した後にはもうプレイが続かないので、重要なのは価格と、オールインの{{t:range|レンジ}}に対するあなたのエクイティだけです。

## {{t:call|コール}}の価格

あなたのブラインドはすでに{{t:pot|ポット}}に入っています。スタックが{{n:m11.depth.10}}なら、追加するのは{{n:m11.call.10.cost}}で、{{t:call|コール}}後の{{t:pot|ポット}}は{{n:m11.call.10.pot}}です。

```formula
必要なエクイティ = 追加額 ÷ コール後のポット
```

| スタック | 追加額 | {{t:call|コール}}後の{{t:pot|ポット}} | 必要なエクイティ |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

スタックが短いほど、価格は良くなります。あなたのブラインドがスタック全体に占める割合が大きくなるからです。

## {{t:shove|プッシュ}}より狭く{{t:call|コール}}する

最初にオールインすれば、相手が{{t:fold|フォールド}}したときにも勝てます。{{t:call|コール}}すると、勝てるのはショーダウンだけで、しかも相手がオールインのために選んだハンドが相手です。だから{{t:call|コール}}するには、最初にオールインするより良いハンドが必要です（文献では「gap concept」と呼ばれます）。

```range
call.bb-10
```

{{n:m11.depth.10}}では、{{t:small-blind|スモールブラインド}}は約{{n:m11.push.10}}のハンドでオールインし、{{t:big-blind|ビッグブラインド}}は約{{n:m11.call.10}}で{{t:call|コール}}します。[[7s 6s]]のようなハンドは、{{t:small-blind|スモールブラインド}}からは{{t:shove|プッシュ}}しますが、オールインに対しては{{t:fold|フォールド}}します。フォールドエクイティがないと、高いカードや{{t:pair|ペア}}に対してエクイティが足りないからです。参考までに、あるトレーニングサイトの表では、{{n:m11.depth.10}}での{{t:call|コール}}の{{t:range|レンジ}}は{{n:m11.ext.call.10}}とされています。

```range
call.bb-15
```

```range
call.bb-5
```

スタックが深いほど{{t:call|コール}}は高くつき、相手のオールインの{{t:range|レンジ}}も狭くなるので、{{t:call|コール}}する回数は減ります：{{n:m11.depth.15}}では約{{n:m11.call.15}}、{{n:m11.depth.5}}では約{{n:m11.call.5}}にもなります。

## 後ろにまだ誰かいるとき

3人で、スタックがそれぞれ{{n:m11.depth.3max}}のとき、{{t:small-blind|スモールブラインド}}はボタンのオールインを約{{n:m11.3max.call.sb}}のハンドでしか{{t:call|コール}}しません。必要なエクイティは{{n:m11.3max.sb.eq}}なのにです。同じ状況で{{t:small-blind|スモールブラインド}}が{{t:fold|フォールド}}したとき、{{t:big-blind|ビッグブラインド}}は{{n:m11.3max.bb.pot}}の{{t:pot|ポット}}に{{n:m11.3max.bb.cost}}を追加し、必要なエクイティは{{n:m11.3max.bb.eq}}で、約{{n:m11.3max.call.bb}}で{{t:call|コール}}します。この差は主に後ろのプレイヤーから生まれます（価格の差はわずかです）：{{t:small-blind|スモールブラインド}}は{{t:call|コール}}して、{{t:big-blind|ビッグブラインド}}のさらに強いハンドにぶつかることがあります。

```range
call.sb-vs-btn-3max
```

すでに2人がオールインしているとき、価格は{{n:m11.3max.bb-two.eq}}まで下がりますが、それでも{{t:big-blind|ビッグブラインド}}が{{t:call|コール}}するのは約{{n:m11.3max.call.bb-two}}のハンドだけです。2つの{{t:range|レンジ}}、しかもそのうち1つはすでにオールインを{{t:call|コール}}しているレンジが相手だと、弱いハンドはすぐにエクイティを失います。

```range
call.bb-vs-two-3max
```

## アンティがあると広く{{t:call|コール}}する

アンティは{{t:pot|ポット}}に残るので、同じ追加額でより多く勝てます：{{n:m11.depth.10}}で{{t:bb-ante|ビッグブラインドアンティ}}が{{n:m11.ante}}なら、必要なのは{{n:m11.call.10.eq}}ではなく{{n:m11.call.10-ante.eq}}です。アンティがあると相手もより広く{{t:shove|プッシュ}}するので、ソルバーは約{{n:m11.call.10-ante}}のハンドで{{t:call|コール}}します。

```range
call.bb-10-ante
```

:::note このレッスンの{{t:range|レンジ}}
グリッドは2人でのプレイを対象にしています：ほかの全員が{{t:fold|フォールド}}した後の、{{t:small-blind|スモールブラインド}}対{{t:big-blind|ビッグブラインド}}です。また、お金ではなく{{t:chips|チップ}}で計算しています。{{t:tournament|トーナメント}}で{{t:payout|賞金}}が重要になるときは、さらに狭く{{t:call|コール}}します（次のレッスン）。
:::
