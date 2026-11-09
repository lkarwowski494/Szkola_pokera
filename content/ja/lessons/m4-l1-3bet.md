---
id: m4.l1
module: m4
order: 1
title: "誰かが先にオープンしたとき"
sub: "フォールド、コール、それとも3ベット"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "{{t:cutoff|CO}}が{{n:pf.open-size}}に{{t:open|オープン}}しました。ボタンから{{t:raise|レイズ}}したいです。いくらまでにしますか？"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "{{n:pf.3bet.ip-total}}まで", correct: true, why: "{{t:in-position|インポジション}}では、{{t:open|オープン}}の約{{n:pf.3bet.size-ip}}まで{{t:raise|レイズ}}します。これが標準で、フロップでのスタックと{{t:pot|ポット}}の比率を良い状態に保てます。" }
      - { text: "{{n:pf.3bet.too-small}}まで", why: "小さすぎます。相手はほぼどんなハンドでも、とても安く{{t:call|コール}}してプレイを続けられます。" }
      - { text: "{{n:pf.3bet.too-big}}まで", why: "{{t:in-position}}でのプレイとしては大きすぎます。リスクが増えるうえ、相手のより強いハンドはどのみち{{t:fold|フォールド}}しません。" }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "ボタンが{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}は{{t:fold|フォールド}}しました。{{t:big-blind|ビッグブラインド}}から{{t:raise|レイズ}}したいです。いくらまでにしますか？"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "{{n:pf.3bet.oop-total}}まで", correct: true, why: "{{t:out-of-position|アウトオブポジション}}では、{{t:open|オープン}}の約{{n:pf.3bet.size-oop}}まで{{t:raise|レイズ}}します。大きめのサイズにすると、ボタンに{{t:in-position}}での安い{{t:call}}をさせません。" }
      - { text: "{{n:pf.3bet.ip-total}}まで", why: "それは{{t:in-position}}のプレイヤー向けのサイズです。{{t:out-of-position|アウトオブポジション}}では、相手に良すぎる価格を与えてしまいます。" }
      - { text: "{{t:call|コール}}するだけ", why: "KKならすぐに{{t:pot|ポット}}を大きくしたいです。プリフロップで2番目に強いハンドです。" }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "ボタンが{{n:pf.open-size}}に{{t:open|オープン}}しました。あなたは{{t:small-blind|スモールブラインド}}です。標準的なプランはどれですか？"
    table: { position: SB }
    options:
      - { text: "{{t:raise|レイズ}}か{{t:fold|フォールド}}", correct: true, why: "{{t:call|コール}}すると{{t:out-of-position}}でプレイすることになり、後ろにはまだ{{t:big-blind}}がいます。後方ポジションからの{{t:open|オープン}}に対して、ソルバーは{{t:small-blind|スモールブラインド}}からほぼ必ず{{t:raise|レイズ}}か{{t:fold|フォールド}}を選びます。" }
      - { text: "ブラインドの半分をすでに{{t:pot|ポット}}に入れているので、広く{{t:call|コール}}する", why: "ブラインドの半分は大した額ではありません。{{t:big-blind|ビッグブラインド}}を後ろに残した{{t:out-of-position}}での{{t:call|コール}}は、{{t:equity-realization|エクイティ実現}}が低くなります。ショーダウン前に{{t:fold|フォールド}}することが多いため、獲得できる{{t:pot|ポット}}の割合が、ハンドのエクイティが示すより小さくなります。" }
      - { text: "常に{{t:fold|フォールド}}", why: "タイトすぎます。ボタンは非常に広く{{t:open|オープン}}するので、強いハンドと一部の{{t:bluff|ブラフ}}で{{t:raise|レイズ}}する価値があります。" }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "あなたは{{t:big-blind|ビッグブラインド}}で、ボタンからの{{t:open|オープン}}に直面しています。次のうち、{{t:bluff}}としての典型的な3ベットはどのハンドですか？"
    table: { position: BB }
    options:
      - { text: "スーテッドのA5", correct: true, why: "相手のAAとAKをブロックし、{{t:call|コール}}された後も{{t:flush}}や{{t:straight|ストレート}}になるチャンスがあります。{{t:call|コール}}{{t:range|レンジ}}の下の方からの典型的な{{t:bluff}}です。{{t:big-blind|ビッグブラインド}}からは、最も強いハンドに加えてこうした{{t:bluff|ブラフ}}を3ベットします。" }
      - { text: "オフスートのK7", why: "このハンドは{{t:call|コール}}でディフェンスします。3ベットとしては重要なものを何もブロックせず、相手に{{t:call|コール}}されるとうまく機能しません。" }
      - { text: "{{t:pair|ペア}} 22", why: "最も小さい{{t:pair|ペア}}は{{t:call|コール}}でディフェンスします。セット（{{t:pocket-pair|ポケットペア}}、つまり2枚の{{t:hole-cards|ホールカード}}でできた{{t:pair|ペア}}による{{t:three-of-a-kind|スリーカード}}）を引いたときに利益を生みます。これらで3ベットすると、4ベットに弱くなります。" }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
誰かが先に{{t:open|オープン}}したとき、選択肢は3つあります。{{t:fold|フォールド}}する、{{t:call|コール}}する、もう一度{{t:raise|レイズ}}する、です。この再度の{{t:raise}}は3ベットと呼ばれます。ハンドの中で3回目の{{t:bet}}（ブラインド、{{t:open}}、{{t:raise}}）だからです。

## 3ベットのサイズ

{{t:in-position|インポジション}}では、{{t:open|オープン}}の約{{n:pf.3bet.size-ip}}まで{{t:raise|レイズ}}します。つまり{{n:pf.open-size}}の{{t:open|オープン}}なら{{n:pf.3bet.ip-total}}までです。{{t:out-of-position|アウトオブポジション}}、たとえば{{t:cutoff|CO}}やボタンからの{{t:open|オープン}}に対してブラインドからなら、{{t:open|オープン}}の約{{n:pf.3bet.size-oop}}、つまり{{n:pf.3bet.oop-total}}までです。{{t:out-of-position}}で大きめのサイズにすると、相手に安い{{t:call}}をさせません。安く{{t:call}}できれば、相手はその後{{t:position|ポジション}}の優位を持ってプレイできてしまいます。

## {{t:position|ポジション}}で{{t:call|コール}}するかが決まる

公開されているソルバーの解によると、{{t:cutoff|CO}}からの{{t:open|オープン}}に対して、ボタンは通常ハンドの約{{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}}を3ベットし、{{t:call|コール}}は約{{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}にとどまります。{{t:utg}}からの{{t:open|オープン}}（この解では最小サイズの{{n:pf.open-size.solver-utg}}まで）に対しては、{{t:call|コール}}が3ベットよりやや多くなります。約{{n:pf.call-freq.btn-vs-utg}}対{{n:pf.3bet-freq.btn-vs-utg}}です。{{t:utg}}の{{t:range|レンジ}}は強いので、3ベットは4ベットを受けることが多くなり、その場で{{t:pot|ポット}}を獲得できることは少なくなります。

```range
vs-open.btn-vs-co
```

グリッドが示すのは、ボタンがどのハンドをプレイするか（3ベットまたは{{t:call|コール}}）と、どのハンドを{{t:fold|フォールド}}するかだけです。3ベットと{{t:call|コール}}の配分は、上の数字で覚えてください。このアプリのソルバーはこのスポットでほとんど{{t:call|コール}}しないため、その配分を再現しません。A8s、98s、44など十数ハンドでは、アプリのソルバーのプレイが公開されている解と異なるため、練習問題ではそれらを採点しません。

{{t:small-blind|スモールブラインド}}からは、ほぼ必ず{{t:raise|レイズ}}か{{t:fold|フォールド}}です。{{t:call|コール}}すると{{t:out-of-position}}でプレイすることになり、後ろの{{t:big-blind}}はまだ{{t:raise|レイズ}}できます。{{t:out-of-position|アウトオブポジション}}では、ハンドの**{{t:equity-realization|エクイティ実現}}**が悪くなります。ショーダウン前に{{t:fold|フォールド}}することが多くなり、{{t:bet|ベット}}で{{t:pot|ポット}}を獲得するのも難しくなるため、獲得できる{{t:pot|ポット}}の割合が、エクイティが示すより小さくなります。

```range
vs-open.sb-vs-btn
```

公開されているソルバーの解によると、ボタンに対する{{t:small-blind}}はほとんど何も{{t:call|コール}}しません。ハンドの約{{n:pf.3bet-freq.sb-vs-btn}}を3ベットし（{{t:range|レンジ}}の上位で、77+、AJo+、KQo、A5s、A4s、T9sなど）、残りは{{t:fold|フォールド}}します。このアプリのソルバーはここでハンドの{{n:solver.3bet.sb-vs-btn}}を3ベットし、その中には55と66の{{t:pair|ペア}}も含まれます。これらは公開されている解でも頻繁に3ベットされます。アプリのソルバーのわずかな{{t:call|コール}}は、グリッドでは{{t:fold}}として数えます。ATo、T9s、A4sなどいくつかのハンドでは、アプリのソルバーのプレイが公開されている解と異なるため、練習問題ではそれらを採点しません。

## {{t:range|レンジ}}は{{t:linear|リニア}}か{{t:polarized|ポラライズ}}か

{{t:cutoff|CO}}からの{{t:open|オープン}}に対して{{t:position|ポジション}}がある場合、主に上から最も強いハンドを3ベットし、スーテッドのエース（A5s、A4s）で{{t:bluff|ブラフ}}をいくつか加えます。中程度のハンド（例：77–99、AJs、ATs、スーテッドの{{t:connectors|コネクター}}）は混合でプレイし、一部は3ベット、一部は{{t:call|コール}}します。相手は{{t:call|コール}}することが多いので、{{t:call|コール}}された後の{{t:pot|ポット}}でうまく機能するハンドを持ちたいのです。このような{{t:range}}の呼び方は情報源によって異なります。{{t:linear|リニア}}（最も強いハンドから順に下へ組み立てたもの）と呼ぶものもあれば、{{t:polarized|ポラライズ}}（主に非常に強いハンドと{{t:bluff|ブラフ}}で構成され、中程度のハンドがほとんどないもの）と呼ぶものもあります。より重要なのは、どのハンドを3ベットし、どのハンドを{{t:call|コール}}するかです。

ボタンに対して{{t:big-blind|ビッグブラインド}}からは、最も強いハンド（TT+、AQ+、AJs+）に加えて、{{t:call|コール}}{{t:range|レンジ}}の下の方からの{{t:bluff|ブラフ}}を3ベットします。A5s、ときにはA4s、そしてスーテッドの{{t:connectors|コネクター}}です。スーテッドのエースは相手のAAとAKをブロックし、{{t:call}}されても、まだ{{t:flush}}や{{t:straight|ストレート}}を作れます。中程度や小さな{{t:pair|ペア}}、KQo、オフスートのエース（AJo–A9o）は、通常{{t:call|コール}}するだけです。{{t:big-blind|ビッグブラインド}}からは安く参加でき、アクションを締めくくれるので、これらのハンドは{{t:call|コール}}したほうが多く稼げます。構成は{{t:rake|レーキ}}と3ベットのサイズによって変わるため、99、KQo、AJoはプレイの仕方が分かれます。{{t:small-blind|スモールブラインド}}の{{t:open|オープン}}に対しては、主に{{t:value|バリュー}}目的で3ベットし（TT+、AJs+、AQoとKQの一部）、A5sとスーテッドの{{t:connectors|コネクター}}は通常{{t:call|コール}}します。

{{t:small-blind|スモールブラインド}}からのプレイは異なります。3ベットか{{t:fold}}で、3ベットには{{t:range|レンジ}}の上位を入れます。

:::note このルールの根拠
ボタンと{{t:small-blind|スモールブラインド}}のグリッドはアプリのソルバーによるもので、情報源とおおむね一致しています（{{t:small-blind|スモールブラインド}}では、練習問題で採点しないいくつかのハンドを除きます）。{{t:big-blind|ビッグブラインド}}からの3ベットの仕方は、複数の独立した情報源にある、他のソルバーの公開結果に基づくルールで学びます。アプリのソルバーにおける{{t:big-blind|ビッグブラインド}}の3ベットの構成は、それらとは異なります。
:::
