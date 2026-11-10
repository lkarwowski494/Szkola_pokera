---
id: m4.l2
module: m4
order: 2
title: "ビッグブラインドのディフェンス"
sub: "コールの価格と広いディフェンス"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "ボタンが{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}は{{t:fold|フォールド}}しました。{{t:big-blind}}で{{t:call}}が利益になるには、エクイティが何パーセント必要ですか（フロップ以降のプレイは考慮しません）？数値を入力してください。"
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "{{n:bb.call.vs-btn}}を追加で支払い、{{t:call}}後の{{t:pot}}は{{n:bb.pot-after.vs-btn}}になります。{{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}}で約{{n:eq.bb-vs-btn-open}}です。半分が必要になるのは、{{t:pot}}に相手の{{t:bet}}しかない場合だけです。{{t:pot}}にあるブラインドが価格を改善します。"
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "{{t:small-blind}}が{{n:pf.open-size-sb}}に{{t:open|オープン}}しました。{{t:big-blind}}で{{t:call}}するには、どれだけのエクイティが必要ですか？"
    table: { position: BB }
    options:
      - { text: "約{{n:eq.bb-vs-sb-open}}", correct: true, why: "{{n:bb.call.vs-sb}}を追加で支払い、{{t:call}}後の{{t:pot}}は{{n:bb.pot-after.vs-sb}}になります。これで約{{n:eq.bb-vs-sb-open}}です。価格はボタン相手より悪いですが、その代わりフロップ以降は{{t:position}}があります。" }
      - { text: "約{{n:eq.bb-vs-btn-open}}", why: "これはボタンからの{{n:pf.open-size}}への{{t:open}}に対する価格です。{{t:small-blind}}はより大きなサイズで{{t:open}}するので、支払う額が増えます。" }
      - { text: "約半分", why: "エクイティが半分必要なのは、{{t:pot}}に相手の{{t:bet}}しかない場合です。ここではブラインドも入っているので、価格はより良くなります。" }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "{{t:big-blind}}で、ボタンの{{t:range}}に対して約{{n:eq.bb-vs-btn-open}}のエクイティがあるハンドをすべて{{t:call}}しないのはなぜですか？"
    table: { position: BB }
    options:
      - { text: "{{t:out-of-position}}ではエクイティをすべて実現できないから", correct: true, why: "エクイティは、{{t:bet}}なしで最後までプレイした場合の勝つ確率です。{{t:out-of-position}}ではショーダウン前にハンドを{{t:fold}}することが多いため、弱いオフスートのハンドはエクイティが示すほど実現できません。" }
      - { text: "ボタンは常に強いハンドを持っているから", why: "ボタンは非常に広く{{t:open}}するため、{{t:big-blind|BB}}のディフェンスは広くなります。" }
      - { text: "{{t:chips}}を節約する必要があるから", why: "重要なのは{{t:expected-value}}であり、{{t:chips}}の節約ではありません。" }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "ボタンが{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}は{{t:fold|フォールド}}しました。あなたは{{t:big-blind}}でQQを持っています。どうしますか？"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "{{n:pf.3bet.oop-total}}に3ベット", correct: true, why: "QQは{{t:value}}のためのハンドです。{{t:out-of-position}}では{{t:open}}の約{{n:pf.3bet.size-oop}}に{{t:raise}}し、ボタンが{{t:in-position}}で安く{{t:call}}できないようにします。" }
      - { text: "{{n:pf.3bet.ip-total}}に3ベット", sizeError: true, why: "良いアクションですが、これは{{t:in-position}}のプレイヤー向けのサイズです（{{t:open}}の{{n:pf.3bet.size-ip}}）。{{t:out-of-position}}ではより大きく、{{n:pf.3bet.oop-total}}まで{{t:raise}}します。" }
      - { text: "{{t:call|コール}}", why: "バリューを失います。QQではフロップ前に{{t:pot}}を大きくしたいのであって、{{t:out-of-position}}で小さな{{t:pot}}をプレイしたいわけではありません。" }
      - { text: "{{t:fold|フォールド}}", why: "QQはプリフロップで最強クラスのハンドの一つです。{{t:fold}}は大きなミスです。" }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "ボタンが{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}は{{t:fold|フォールド}}しました。{{t:big-blind}}をディフェンスするハンド（{{t:call}}または3ベット）を塗ってください。"
---
{{t:big-blind}}はすでに{{t:pot}}にブラインド全額を入れているため、{{t:open}}に対して追加で支払う額はわずかです。ボタンが{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}が{{t:fold|フォールド}}した場合、{{t:call}}に必要なエクイティは約{{n:eq.bb-vs-btn-open}}だけです。そのため、{{t:big-blind}}はすべての{{t:position}}の中で最も広くディフェンスします。

## 価格がすべてではない

エクイティは、両者がそれ以上の{{t:bet}}なしでショーダウンまで進んだ場合に、どれくらいの頻度で勝つかを示します。{{t:out-of-position}}ではフロップ後に{{t:fold}}することが多いため、弱いオフスートのハンドはエクイティほど実現できません。スーテッドのハンド、{{t:connectors}}、中程度の{{t:pair}}はより多く実現できるため、グリッドではこれらでより積極的にディフェンスします。

```range
vs-open.bb-vs-btn
```

公開されているソルバーの解では、ここでハンドの約{{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}}をディフェンスします（{{t:call}}と3ベットの合計）。グリッドの元になっているアプリのソルバーは、ここで公開されている解より広くディフェンスします。

## {{t:small-blind}}に対して

{{t:small-blind}}はより大きなサイズ、{{n:pf.open-size-sb}}で{{t:open}}するため、{{t:call}}には約{{n:eq.bb-vs-sb-open}}のエクイティが必要です。価格は悪くなりますが、フロップ後は{{t:position}}があるため、引き続き広く、ハンドの半分以上でディフェンスします。

```range
vs-open.bb-vs-sb
```

公開されているソルバーの解では、ここでハンドの約{{n:pf.bb-def.vs-sb.pub}}をディフェンスします。グリッドの元になっているアプリのソルバーは、ここで公開されている解より狭くディフェンスします。

:::note {{t:big-blind}}からの{{t:raise}}の仕方
グリッドは何でディフェンスするかを示しますが、どうディフェンスするかは示しません。3ベットと{{t:call}}は合算されています。アプリのソルバーにおける{{t:big-blind}}からの3ベットの構成が、他のソルバーの公開結果と異なるためです。ボタンに対しては、{{t:big-blind}}からの3ベットは{{t:open}}の約{{n:pf.3bet.size-oop}}です。最も強いハンド（TT+、AQ+、AJs+）に加え、{{t:bluff}}として、{{t:call}}する{{t:range}}の下位にあるA5s、時々A4s、スーテッド{{t:connectors}}を3ベットします。中程度と小さな{{t:pair}}、KQo、オフスートのエースは通常{{t:call}}します。{{t:small-blind}}に対しては{{t:position}}があるため、より小さく、{{t:open}}の約{{n:pf.3bet.size-ip}}に{{t:raise}}します。その場合は主に{{t:value}}のために3ベットし（TT+、AJs+、AQoとKQの一部）、A5sとスーテッド{{t:connectors}}は通常{{t:call}}します。
:::
