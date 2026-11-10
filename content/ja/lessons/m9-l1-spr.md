---
id: m9.l1
module: m9
order: 1
title: "SPR：スタックとポットの比"
sub: "ポットの後ろにいくら残っているか"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "ボタンから{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。スタックは各{{n:format.stack}}です。フロップで{{t:pot|ポット}}は{{n:bb.pot-after.vs-btn}}、あなたの残りは{{n:spr.srp.stack}}です。{{t:spr}}はいくつですか？"
    table: { position: BTN }
    options:
      - { text: "約{{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}。{{t:pot|ポット}}の後ろのスタックは{{t:pot}}の十数倍あります。これが{{t:open|オープン}}と{{t:call|コール}}の後の典型的な{{t:spr}}です。" }
      - { text: "約{{n:spr.srp.wrong-full}}", why: "それはスタック全体の{{n:format.stack}}で計算した値です。あなたの{{n:pf.open-size}}はすでに{{t:pot|ポット}}に入っているので、残っている分だけで計算します：{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}。" }
      - { text: "約{{n:spr.3bet-ip}}", why: "それは3ベットと{{t:call|コール}}の後の{{t:spr}}です。レイズが1回の{{t:pot|ポット}}では{{t:pot}}がずっと小さいので、{{t:spr}}は約{{n:spr.srp}}です。" }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:cutoff|CO}}が{{n:pf.open-size}}に{{t:open|オープン}}し、あなたはボタンから{{n:pf.3bet.ip-total}}に{{t:raise|レイズ}}（3ベット）、{{t:cutoff|CO}}が{{t:call|コール}}し、ブラインドは{{t:fold|フォールド}}しました。フロップで{{t:pot|ポット}}は{{n:vs3bet.pot-after}}、あなたの残りは{{n:spr.3bet-ip.stack}}です。{{t:spr}}はいくつですか？"
    table: { position: BTN }
    options:
      - { text: "約{{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}。3ベット後の{{t:pot}}は通常の{{t:open|オープン}}後の3倍になるので、{{t:spr}}は約{{n:spr.srp}}から約{{n:spr.3bet-ip}}に下がります。" }
      - { text: "約{{n:spr.3bet-ip.wrong-full}}", why: "それはスタック全体の{{n:format.stack}}で計算した値です。あなたの{{n:pf.3bet.ip-total}}の3ベットはすでに{{t:pot|ポット}}に入っているので、割るのは残っている分だけです：{{n:spr.3bet-ip.stack}}。" }
      - { text: "約{{n:spr.srp}}", why: "それはレイズが1回の{{t:pot|ポット}}での{{t:spr}}です。3ベット後は{{t:pot}}がずっと大きく、その後ろのスタックは小さいので、{{t:spr}}は約{{n:spr.3bet-ip}}に下がります。" }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "ボタンが{{t:open|オープン}}し、あなたは{{t:big-blind|ビッグブラインド}}から{{n:pf.3bet.oop-total}}に{{t:raise|レイズ}}（3ベット）、ボタンが{{t:call|コール}}しました。フロップで{{t:pot|ポット}}は{{n:spr.3bet-oop.pot}}、あなたの残りは{{n:spr.3bet-oop.stack}}です。{{t:spr}}はいくつですか？"
    table: { position: BB }
    options:
      - { text: "約{{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}。{{t:out-of-position|アウトオブポジション}}では3ベットが大きいので、{{t:pot}}がより大きくなり、{{t:spr}}は{{t:in-position}}での3ベット後（{{n:spr.3bet-ip}}）より低くなります。" }
      - { text: "約{{n:spr.3bet-ip}}", why: "それは{{t:in-position}}で{{n:pf.3bet.ip-total}}に3ベットした後の{{t:spr}}です。あなたの{{n:pf.3bet.oop-total}}への3ベットは{{t:pot|ポット}}をより大きくするので、{{t:spr}}はもっと低く、約{{n:spr.3bet-oop}}です。" }
      - { text: "約{{n:spr.4bet}}", why: "そこまで低い{{t:spr}}になるのは4ベットの場合だけです。{{n:pf.3bet.oop-total}}への3ベット後は約{{n:spr.3bet-oop}}になります。" }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "スタックは各{{n:format.stack}}です。フロップの{{t:spr}}が最も低いのはどの{{t:pot|ポット}}ですか？"
    options:
      - { text: "4ベットと{{t:call|コール}}の後の{{t:pot|ポット}}", correct: true, why: "そのとおりです。{{t:small-blind|スモールブラインド}}の3ベットに対してボタンが{{n:pf.4bet.example.low}}に4ベットし、{{t:small-blind}}が{{t:call|コール}}、{{t:big-blind}}は{{t:fold|フォールド}}済みの場合、{{t:pot|ポット}}は{{n:spr.4bet.pot}}で、その後ろには{{n:spr.4bet.stack}}しか残りません。{{t:spr}}は約{{n:spr.4bet}}です。" }
      - { text: "3ベットと{{t:call|コール}}の後の{{t:pot|ポット}}", why: "3ベット後の{{t:spr}}は、{{t:in-position}}で約{{n:spr.3bet-ip}}、{{t:out-of-position}}で約{{n:spr.3bet-oop}}です。4ベットはさらに下げて、約{{n:spr.4bet}}にします。" }
      - { text: "レイズが1回の{{t:pot|ポット}}", why: "逆です。ここでは{{t:spr}}が最も高く約{{n:spr.srp}}です。フロップの{{t:pot}}が小さいからです。" }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "3ベット後のフロップの{{t:spr}}が、通常の{{t:open|オープン}}後よりずっと低いのはなぜですか？"
    options:
      - { text: "{{t:pot|ポット}}は数倍に増えるが、その後ろのスタックは少ししか減らない", correct: true, why: "そのとおりです。{{t:pot}}は{{n:bb.pot-after.vs-btn}}から{{n:vs3bet.pot-after}}に増えますが、その後ろのスタックは{{n:spr.srp.stack}}から{{n:spr.3bet-ip.stack}}に減るだけです。比は約{{n:spr.srp}}から約{{n:spr.3bet-ip}}に下がります。" }
      - { text: "3ベット後はプレイヤーのスタックが小さくなるから", why: "少し小さくなるだけです：{{n:spr.srp.stack}}ではなく{{n:spr.3bet-ip.stack}}。{{t:spr}}が下がる決め手は、{{t:pot}}が3倍になることです。" }
      - { text: "3ベットで{{t:position|ポジション}}が得られるから", why: "{{t:position|ポジション}}はテーブルの席で決まり、3ベットでは決まりません。{{t:spr}}は単に{{t:pot|ポット}}の後ろのスタックを{{t:pot|ポット}}で割ったものです。" }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "ボタンから{{n:pf.open-size}}に{{t:open|オープン}}しました。あなたのスタックは{{n:format.stack}}です。{{t:big-blind|ビッグブラインド}}は{{n:spr.short.stack}}しか持っておらず、{{t:call|コール}}します。フロップの{{t:pot|ポット}}：{{n:bb.pot-after.vs-btn}}。{{t:spr}}はいくつですか？"
    table: { position: BTN }
    options:
      - { text: "約{{n:spr.short}}", correct: true, why: "{{t:effective-stack|エフェクティブスタック}}、つまり2人のうち小さいほうのスタックで計算します。相手の残りは{{n:spr.short.behind}}なので、{{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}。すでに{{t:pot|ポット}}に入っている分以外に、2人とも追加で入れられるのは最大{{n:spr.short.behind}}です。" }
      - { text: "約{{n:spr.srp}}", why: "それは相手も{{n:format.stack}}持っている場合です。プレイできるのは小さいほうのスタックまでなので、{{t:spr}}は約{{n:spr.short}}です。" }
      - { text: "スタックが違うので計算できない", why: "計算できます。小さいほうのスタック（エフェクティブ）を使います。相手の残りは{{n:spr.short.behind}}なので、{{t:spr}} ≈ {{n:spr.short}}です。" }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "フロップ以降のハンドの進め方を決める{{t:spr}}は、いつ計算しますか？"
    options:
      - { text: "フロップで、誰かが{{t:bet|ベット}}する前", correct: true, why: "そのとおりです。{{t:spr}}はどの{{t:street|ストリート}}でも計算できます（M7ではターンで計算しました）が、ハンドの計画には、フロップ開始時の{{t:pot|ポット}}の後ろのスタックを{{t:pot|ポット}}で割ったものを使います。これで、3つの{{t:street|ストリート}}で何{{t:pot|ポット}}分をプレイできるかがわかります。" }
      - { text: "ハンドの前、誰かが{{t:raise|レイズ}}する前", why: "フロップ前には、{{t:pot}}がどれだけ大きくなるかまだわかりません。{{t:spr}}はまさにフロップ前に起きたことで決まります：{{t:open|オープン}}後は約{{n:spr.srp}}、3ベット後は約{{n:spr.3bet-ip}}です。" }
      - { text: "リバーで、最後の{{t:bet|ベット}}の前", why: "リバーで残る判断は1つだけです。{{t:spr}}はそこでも計算できますが、ハンドの計画に最も役立つのはフロップの{{t:spr}}です。3つの{{t:street|ストリート}}すべてをカバーするからです。" }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "ボタンから{{t:raise|レイズ}}（3ベット）し、{{t:cutoff|CO}}が{{t:call|コール}}しました。フロップの{{t:spr}}は約{{n:spr.3bet-ip}}です。良いキッカーで{{t:top-pair|トップペア}}をヒットしました。このハンドをどう扱いますか？"
    table: { position: BTN }
    options:
      - { text: "ボーダーラインのハンドとして：{{t:value|バリュー}}目的でプレイするが、相手のオールインに必ず{{t:call|コール}}するわけではない", correct: true, why: "約{{n:spr.3bet-ip}}の{{t:spr}}は{{n:spr.zone.low}}～{{n:spr.zone.mid}}のゾーンにあり、そこでは{{t:top-pair}}はボーダーラインのハンドです。スタック全体を懸けるかどうかは、相手のプレイと{{t:board}}の状況で決まります。" }
      - { text: "常にスタック全体を懸けてプレイする", why: "通常そうなるのは{{t:spr}}が約{{n:spr.zone.low}}未満のとき、例えば4ベット後（約{{n:spr.4bet}}）です。{{t:spr}}が約{{n:spr.3bet-ip}}ではオールインまでにより多くの{{t:bet|ベット}}が必要で、最後まで払ってくるのは主により強いハンドです。" }
      - { text: "非常に高い{{t:spr}}のときのように慎重にプレイする", why: "{{t:top-pair|トップペア}}をそこまで慎重にプレイするのは約{{n:spr.zone.deep}}超のとき、例えばレイズが1回の{{t:pot|ポット}}（約{{n:spr.srp}}）です。3ベット後の{{t:spr}}はずっと低くなります。" }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "フロップ。{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{n:commit.stack}}でオールインしました（{{t:spr}} {{n:spr.commit}}）。{{t:call|コール}}に必要なエクイティはいくつですか？パーセントで数値を入力してください。"
    answer: eq.jam.spr2
    explanation: "あなたは{{n:commit.stack}}を支払い、{{t:call|コール}}後の{{t:pot}}は{{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}になります。必要エクイティ = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}。"
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "フロップで相手がスタック全体（ハンド開始時{{n:format.stack}}）でオールインしました。{{t:call|コール}}に必要なエクイティが最も少ないのはどの{{t:pot|ポット}}ですか？"
    options:
      - { text: "4ベット後：約{{n:eq.jam.4bet}}", correct: true, why: "{{t:spr}}が約{{n:spr.4bet}}なら、{{n:spr.4bet.stack}}を支払って{{n:spr.4bet.pot}}の{{t:pot|ポット}}と相手のスタックを獲得できます。{{t:spr}}が低いほど、価格は良くなります。" }
      - { text: "3ベット後：約{{n:eq.jam.3bet-ip}}", why: "{{t:in-position}}での3ベット後は約{{n:eq.jam.3bet-ip}}必要です。4ベット後はスタックに対して{{t:pot}}が大きいので、約{{n:eq.jam.4bet}}で足ります。" }
      - { text: "{{t:open|オープン}}と{{t:call|コール}}の後：約{{n:eq.jam.srp}}", why: "3つの中で最も悪い価格です。{{t:spr}}が約{{n:spr.srp}}では、{{n:spr.srp.stack}}を支払って、{{n:bb.pot-after.vs-btn}}の小さな{{t:pot|ポット}}と相手のスタックを獲得することになります。" }
---
フロップ前には、{{t:pot|ポット}}にいくら入るかを決めます。フロップ後に重要なのは、その後ろにまだいくら残っているかです。この2つを結びつけるのが1つの数値、{{t:spr}}です。

## {{t:spr}}とは

{{t:spr}}（英語：stack-to-pot ratio）は、{{t:street|ストリート}}開始時のスタックと{{t:pot|ポット}}の比です。どの{{t:street|ストリート}}でも計算できます（M7ではターンで計算しました）が、ハンドの計画には、誰かが{{t:bet|ベット}}する前のフロップの{{t:spr}}を使います。

```formula
SPR = エフェクティブスタック ÷ フロップのポット
```

{{t:effective-stack|エフェクティブスタック}}とは、2つのスタックのうち小さいほうで、すでに{{t:pot|ポット}}に入っている分は含みません。これが、各プレイヤーがこれから{{t:pot|ポット}}に追加できる最大額です。{{t:pot|ポット}}以外に相手から{{t:effective-stack}}より多くは勝てず、これから失いうる最大額もこの額です。

例：ボタンから{{n:pf.open-size}}に{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。フロップの{{t:pot|ポット}}は{{n:bb.pot-after.vs-btn}}、あなたの残りは{{n:spr.srp.stack}}です。{{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**。

## プリフロップが{{t:spr}}を決める

フロップ前の{{t:raise}}は、そのたびに{{t:pot|ポット}}を数倍に大きくしますが、その後ろのスタックはずっとゆっくりしか減りません。そのため、{{t:spr}}はフロップ前に起きたことに大きく左右されます。

| {{t:pot|ポット}}（スタック{{n:format.stack}}） | フロップの{{t:pot|ポット}} | {{t:pot|ポット}}の後ろのスタック | {{t:spr}} |
|---|---|---|---|
| {{t:open|オープン}}と{{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| {{t:in-position}}での3ベットと{{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| {{t:big-blind|ビッグブラインド}}からの3ベットと{{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| {{t:small-blind|スモールブラインド}}の3ベットへのボタンの4ベットと{{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## {{t:spr}}のゾーン

{{t:spr}}のゾーンは、フロップの{{t:spr}}で判断します。{{t:spr}}が高いほど、スタック全体を懸けてプレイするのに強いハンドが必要になります：

| {{t:spr}} | 通常スタック全体を懸けるハンド |
|---|---|
| {{n:spr.zone.low}}未満 | {{t:top-pair}}以上 |
| {{n:spr.zone.low}}～{{n:spr.zone.mid}} | {{t:top-pair}}はボーダーライン |
| {{n:spr.zone.mid}}～{{n:spr.zone.deep}} | 高い{{t:two-pair}}以上 |
| {{n:spr.zone.deep}}超 | セット、{{t:straight}}以上 |

{{t:open|オープン}}と{{t:call|コール}}の後（{{t:spr}}約{{n:spr.srp}}）は最も高いゾーン、3ベット後（約{{n:spr.3bet-ip}}）は{{t:top-pair}}がボーダーラインになるゾーン、4ベット後（約{{n:spr.4bet}}）は最も低いゾーンです。しきい値は簡略化したものです。ゾーンの分け方は情報源によって異なりますが、約{{n:spr.zone.low}}未満では{{t:top-pair}}でスタックを懸け、{{t:spr}}が高くなるほど1つの{{t:pair}}でスタックを懸けることは少なくなる、という点では一致しています。{{n:spr.zone.mid}}の境界は、このアプリで採用している取り決めです。{{n:spr.zone.deep}}のしきい値は計算から来ています：{{t:spr}}が{{n:spr.zone.deep}}なら、{{t:pot|ポット}}サイズの{{t:bet|ベット}}3回でオールインになります。

## 低い{{t:spr}}：オールインへの価格が良くなる

相手がスタック全体でオールインしたとき、あなたは自分のスタックを支払って、{{t:pot|ポット}}と相手のスタックを獲得します。必要エクイティ = スタック ÷ ({{t:pot}} + 2·スタック)。{{t:spr}}が{{n:spr.commit}}なら{{n:eq.jam.spr2}}、4ベット後は約{{n:eq.jam.4bet}}、3ベット後は約{{n:eq.jam.3bet-ip}}、レイズが1回の{{t:pot|ポット}}では約{{n:eq.jam.srp}}にもなります。

{{t:spr}}が低いほど、プレイする残りのお金が少なく、スタック全体を入れやすくなります。高いほど、スタックが{{t:pot|ポット}}に入るまでに多くの{{t:street|ストリート}}と{{t:bet|ベット}}が残ります。

:::note 数値の出どころ
{{t:pot|ポット}}とスタックは、プリフロップのモジュールのサイズに基づいています（{{t:open}} {{n:pf.open-size}}、3ベットは{{n:pf.3bet.ip-total}}または{{n:pf.3bet.oop-total}}、4ベットは{{n:pf.4bet.example.low}}）。4ベット後の{{t:pot|ポット}}は次のシナリオです：ボタンが{{t:small-blind|スモールブラインド}}の3ベットに4ベットし、{{t:small-blind}}が{{t:call|コール}}、{{t:big-blind}}は{{t:fold|フォールド}}済みで、そのブラインドは{{t:pot|ポット}}に残ります。サイズが違えば{{t:spr}}も少し変わりますが、順序は常に同じです：フロップ前の{{t:raise|レイズ}}が多いほど、{{t:spr}}は低くなります。
:::
