---
id: m4.l3
module: m4
order: 3
title: "3ベットを受けたとき"
sub: "フォールド、コール、それとも4ベット"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "{{t:cutoff|CO}}から{{n:pf.open-size}}に{{t:open|オープン}}し、ボタンが{{n:pf.3bet.ip-total}}に{{t:raise|レイズ}}、ブラインドは{{t:fold|フォールド}}しました。ボタンがどんなハンドの3ベットでも利益を出せる状態にしないためには、{{t:open|オープン}}{{t:range|レンジ}}の少なくともどれだけを続ける（{{t:call|コール}}または4ベットする）必要がありますか？"
    table: { position: CO }
    options:
      - { text: "{{t:open|オープン}}{{t:range|レンジ}}の約{{n:mdf.vs-3bet-ip-size}}", correct: true, why: "ボタンは{{n:vs3bet.win}}を得るために{{n:pf.3bet.ip-total}}をリスクにさらしています。あなたが{{n:alpha.vs-3bet-ip-size}}より高い頻度で{{t:fold|フォールド}}すると、最も弱いハンドでも相手の3ベットは利益になります。" }
      - { text: "{{t:range|レンジ}}の約半分", why: "最低限としては多すぎます。計算上は{{n:mdf.vs-3bet-ip-size}}で足ります。ソルバーの解やチャートによれば、{{t:open|オープン}}した側は{{t:open|オープン}}の約{{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}を{{t:fold|フォールド}}するので、続けるのは{{t:range|レンジ}}の半分未満です。" }
      - { text: "常に、どのハンドでも", why: "それではボタンの{{t:range|レンジ}}に負けるハンドで3ベットに払うことになります。{{t:open|オープン}}のうち最も弱い部分は{{t:fold|フォールド}}するのが正解です。" }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:cutoff|CO}}から{{n:pf.open-size}}に{{t:open|オープン}}し、ボタンが{{n:pf.3bet.ip-total}}に{{t:raise|レイズ}}、ブラインドは{{t:fold|フォールド}}しました。どうしますか？"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "オフスートのKJは{{t:out-of-position}}ではAK、AJ、KQにドミネートされていることが多く、フロップ後も扱いにくいハンドです。トレーニング教材はここで{{t:fold}}を推奨しています。" }
      - { text: "{{t:call|コール}}", why: "ハイカードなので魅力的ですが、{{t:out-of-position}}ではこのハンドは{{t:equity-realization|エクイティ実現}}の効率が悪く、より強いキッカーに負けることがよくあります。" }
      - { text: "4ベット", why: "KJoは{{t:value|バリュー}}で4ベットするには弱すぎ、{{t:bluff}}としてもボタンが続けるハンドをブロックしません。" }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:cutoff|CO}}から{{n:pf.open-size}}に{{t:open|オープン}}し、ボタンが{{n:pf.3bet.ip-total}}に{{t:raise|レイズ}}、ブラインドは{{t:fold|フォールド}}しました。どうしますか？"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "4ベット", correct: true, why: "AKは通常4ベットします。スタックを入れたいハンドで、相手のAAとKKをブロックし、AQ、KQ、より弱いエースをドミネートしています。" }
      - { text: "{{t:call|コール}}", why: "AKを時々{{t:call|コール}}するソースもありますが、通常は4ベットします。{{t:out-of-position}}で{{t:call|コール}}すると{{t:initiative|イニシアチブ}}とバリューを失います。" }
      - { text: "{{t:fold|フォールド}}", why: "AKはプリフロップで最も強いハンドの一つです。ここでの{{t:fold|フォールド}}は大きなミスです。" }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "ボタンから{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}は{{t:fold|フォールド}}、{{t:big-blind}}が{{n:pf.3bet.oop-total}}に{{t:raise|レイズ}}しました。どうしますか？"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "スーテッドの{{t:connectors|コネクター}}は{{t:in-position}}でうまく{{t:equity-realization|エクイティを実現}}できます。{{t:straight|ストレート}}やフラッシュを作れ、外れたときはフロップで簡単に{{t:fold|フォールド}}できます。" }
      - { text: "{{t:fold|フォールド}}", why: "{{t:in-position|インポジション}}なら、このハンドは守るのに十分プレイしやすいです。{{t:fold|フォールド}}はタイトすぎます。" }
      - { text: "4ベット", why: "{{t:bluff}}としては、AAとAKをブロックするスーテッドのエースの方が適しています。87sはフロップを見たいハンドです。" }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "ボタンから{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}は{{t:fold|フォールド}}、{{t:big-blind}}が{{n:pf.3bet.oop-total}}に{{t:raise|レイズ}}しました。どうしますか？"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "あるソースによれば、大きな3ベットに対しては{{t:in-position}}でも最も低い{{t:pair|ペア}}は{{t:fold|フォールド}}します。主にセットを引いたときに利益を出すハンドで、価格が高すぎるからです。別のソースは{{t:in-position}}での{{t:call|コール}}を認めています。" }
      - { text: "{{t:position|ポジション}}があるので{{t:call|コール}}", why: "{{t:position|ポジション}}は助けになりますが、{{n:pf.3bet.oop-total}}への3ベットに対しては、セットを引く必要があるハンドには価格が高すぎます。" }
      - { text: "4ベット", why: "33の{{t:pair|ペア}}は4ベットするハンドではありません。バリューにも良い{{t:bluff}}にもなりません。" }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:cutoff|CO}}から{{n:pf.open-size}}に{{t:open|オープン}}し、ボタンが{{n:pf.3bet.ip-total}}に{{t:raise|レイズ}}、ブラインドは{{t:fold|フォールド}}しました。どうしますか？"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "4ベット", correct: true, why: "あるソースはQQ（およびJJ）を大半のケースで4ベットします。ボタンは多くの弱い{{t:pair|ペア}}やエースで続けるからです。" }
      - { text: "{{t:call|コール}}", correct: true, why: "これも良いプレイです。別のソースは、ボタンの弱いハンドを降ろさないようにQQを{{t:call|コール}}{{t:range|レンジ}}に入れています。ソースによって異なるため、どちらのプレイも良い選択です。" }
      - { text: "{{t:fold|フォールド}}", why: "QQはプリフロップで3番目に強いハンドです。{{t:fold|フォールド}}は大きなミスです。" }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:cutoff|CO}}から{{n:pf.open-size}}に{{t:open|オープン}}し、ボタンが{{n:pf.3bet.ip-total}}に{{t:raise|レイズ}}、ブラインドは{{t:fold|フォールド}}しました。どうしますか？"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "強いスーテッドのエースは{{t:call|コール}}{{t:range|レンジ}}の基本です。AAとAKをブロックし、フラッシュや良い{{t:pair|ペア}}を作れます。" }
      - { text: "{{t:fold|フォールド}}", why: "タイトすぎます。AJsは3ベットに対して守るのに最も適したハンドの一つです。" }
      - { text: "{{t:value|バリュー}}で4ベット", why: "AJsはスタック全体を賭けて戦いたいほど強くありません。ボタンのより強いハンドにドミネートされます。" }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "ボタンから{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:small-blind}}が{{n:pf.3bet.oop-total}}に{{t:raise|レイズ}}、{{t:big-blind}}は{{t:fold|フォールド}}しました。KKを持っていて4ベットしたいです。いくらにしますか？"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "約{{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}に", correct: true, why: "{{t:in-position|インポジション}}では、4ベットは3ベットの約{{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}}です。{{t:small-blind}}が{{t:call|コール}}すると、{{t:pot|ポット}}は約{{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}}（デッドの{{t:big-blind|ビッグブラインド}}を含む）になり、スタックには{{t:pot|ポット}}の約{{n:spr.4bet.high}}–{{n:spr.4bet}}倍が残ります。" }
      - { text: "{{n:pf.4bet.too-small}}に", why: "小さすぎます。相手に{{t:out-of-position}}で{{t:call}}するとても良い価格を与えてしまいます。" }
      - { text: "{{n:format.stack}}でオールイン", why: "スタックが{{n:format.stack}}のとき、オールインすると、相手が4ベットにコールしたはずの弱いハンドを降ろしてしまいます。利益が減ります。" }
---
3ベットは、あなたの{{t:open}}に対する相手の反応です。選択肢は3つあります。{{t:fold|フォールド}}する、{{t:call|コール}}する、もう一度{{t:raise|レイズ}}する、つまり4ベットするかです。

:::note これらのルールの出典
このレッスンは、アプリのソルバーではなく、複数のソースのトレーニング教材と他のソルバーの公開結果に基づいています。3ベットに対するプレイについては、アプリのソルバーはまだ検証されていないため、ルールはヒューリスティックとして表示されています。
:::

## どれだけ続けるか

{{t:cutoff|CO}}からのあなたの{{t:open}}に対してボタンが{{n:pf.3bet.ip-total}}に{{t:raise|レイズ}}すると、ボタンは{{n:vs3bet.win}}を得るためにその額をリスクにさらします。あなたが{{n:alpha.vs-3bet-ip-size}}より高い頻度で{{t:fold|フォールド}}すると、相手の3ベットはどのハンドでも利益になります。したがって、{{t:open|オープン}}{{t:range|レンジ}}の少なくとも約{{n:mdf.vs-3bet-ip-size}}を続ける必要があります。

公開されたソルバーの解（{{t:cutoff|CO}}対ボタンの{{n:pf.3bet.ip-total}}への3ベット）によれば、{{t:open|オープン}}した側は{{t:open|オープン}}の約{{n:pf.vs3bet.pub1.fold}}を{{t:fold|フォールド}}し、約{{n:pf.vs3bet.pub1.call}}を{{t:call|コール}}し、約{{n:pf.vs3bet.pub1.4bet}}を4ベットします。別のソースの簡略化されたチャートでは約{{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}です。ここでは両方のソースに近い範囲を採用します。{{t:fold}}は約{{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}、{{t:call}}は約{{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}、4ベットは約{{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}です。{{t:fold|フォールド}}の上限は{{n:alpha.vs-3bet-ip-size}}のしきい値のすぐ下にあります。これより多くフォールドすると、ボタンの3ベットはどのハンドでも利益になってしまいます。{{t:call|コール}}するには約{{n:eq.call-3bet-ip-size}}のエクイティが必要です。{{t:call|コール}}後に{{n:vs3bet.pot-after}}になる{{t:pot|ポット}}に、{{n:vs3bet.call}}を追加で払うからです。

## {{t:out-of-position|アウトオブポジション}}では慎重に選ぶ

{{t:out-of-position|アウトオブポジション}}では、フロップ後にうまくプレイできるハンドで{{t:call|コール}}します。主にスーテッドのハイカード（KQs、QJs）、強いスーテッドのエース、ミドルとハイの{{t:pair|ペア}}、そしてスーテッドの{{t:connectors|コネクター}}の一部です。KJo、ATo、QToのような弱いオフスートのハンドはドミネートされていることが多いので、{{t:fold|フォールド}}します。

## {{t:in-position|インポジション}}では広く守る

{{t:in-position|インポジション}}では、66からTTまでの{{t:pair|ペア}}やスーテッドの{{t:connectors|コネクター}}（T9s、98s、87s）でも{{t:call|コール}}します。あるソースによれば、大きな3ベットに対しては{{t:in-position}}でも最も低い{{t:pair|ペア}}は{{t:fold|フォールド}}します。主にセットを引いたときに利益を出すハンドで、価格が高すぎるからです。別のソースは{{t:in-position}}での{{t:call|コール}}を認めています。

## 4ベット

AA、KK、AKは通常{{t:value|バリュー}}で4ベットします。AKについては時々{{t:call|コール}}するソースもあります。QQとJJはソースによってプレイが異なり、一方は主に4ベットし、もう一方は{{t:call|コール}}します。{{t:bluff}}としては、A5sのようなスーテッドのエースが最適です。相手のAAとAKをブロックし、{{t:call|コール}}されても{{t:flush}}や{{t:straight|ストレート}}を作るチャンスがあります。4ベットのサイズは、{{t:in-position}}では3ベットの約{{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}}、{{t:out-of-position}}では{{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}}です。たとえば、ボタンから{{t:small-blind|スモールブラインド}}の{{n:pf.3bet.oop-total}}への3ベットに4ベットする場合（{{t:big-blind}}は{{t:fold|フォールド}}済み）、{{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}に{{t:raise|レイズ}}します。{{t:cutoff|CO}}からボタンの{{n:pf.3bet.ip-total}}への3ベットに4ベットする場合は、約{{n:pf.4bet.oop-example.low}}に{{t:raise|レイズ}}します。{{t:call|コール}}された後、スタックには{{t:pot|ポット}}の約{{n:spr.4bet.high}}–{{n:spr.4bet.oop}}倍が残るので、強いハンドなら残りを簡単に入れられます。
