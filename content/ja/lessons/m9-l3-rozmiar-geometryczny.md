---
id: m9.l3
module: m9
order: 3
title: "ジオメトリックサイズ"
sub: "オールインまで同じポット比率"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "{{t:pot|ポット}}は{{n:ex.pot}}です。{{t:pot|ポット}}全額（{{n:ex.bet.pot}}）をベットし、相手が{{t:call|コール}}します。今、{{t:pot|ポット}}はいくらですか？数字を入力してください。"
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}。{{t:pot|ポット}}サイズの{{t:bet|ベット}}と{{t:call|コール}}で、{{t:pot|ポット}}は3倍になります。一般に、{{t:pot|ポット}}のf倍の{{t:bet|ベット}}と{{t:call|コール}}で、{{t:pot|ポット}}は(1 + 2f)倍になります。"
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "{{t:pot|ポット}}は{{n:ex.pot}}です。フロップ、ターン、リバーで{{t:pot|ポット}}全額をベットし（{{n:ex.bet.pot}}、次に{{n:geo.ex.turn}}、次に{{n:geo.ex.river}}）、相手は毎回{{t:call|コール}}します。それぞれが合計いくら入れますか？数字を入力してください。"
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}。{{t:pot|ポット}}は{{n:ex.pot}}から{{n:ex.pot.after-pot-call}}、{{n:geo.ex.turn-after}}、{{n:geo.ex.river-after}}と増えます。つまり、{{t:pot|ポット}}サイズの{{t:bet|ベット}}3回で、{{t:spr}} {{n:spr.zone.deep}}のときにオールインになります。"
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "{{t:spr}}がいくつのとき、ハーフ{{t:pot|ポット}}の{{t:bet|ベット}}3回（フロップ、ターン、リバー、すべてコールされる）でちょうどスタック全額が入りますか？"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|ポット}}{{n:ex.pot}}の場合、{{t:bet|ベット}}{{n:ex.bet.half}}、{{n:geo.half.turn}}、{{n:geo.half.river}}で合計{{n:geo.half.total}}、つまりスタック{{n:geo.half.stack}}です。式では、(1 + 2·{{n:ex.frac.half}})の3乗 = 1 + 2·{{n:geo.half.spr}}です。" }
      - { text: "{{n:spr.zone.deep}}", why: "{{t:spr}} {{n:spr.zone.deep}}では、毎{{t:street|ストリート}}{{t:pot|ポット}}全額をベットする必要があります。ハーフ{{t:pot|ポット}}の{{t:bet|ベット}}では、{{n:geo.ex.stack}}のうち{{n:geo.half.total}}しか入りません。" }
      - { text: "{{n:spr.commit}}", why: "{{t:spr}} {{n:spr.commit}}では、ハーフ{{t:pot|ポット}}の{{t:bet|ベット}}3回は多すぎます。リバーでハーフ{{t:pot|ポット}}を満額{{t:bet|ベット}}する前にスタックが尽きます。合うのは{{t:spr}} {{n:geo.half.spr}}です。" }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "シングルレイズド{{t:pot|ポット}}：フロップでは{{n:bb.pot-after.vs-btn}}あり、お互いの後ろに{{n:spr.srp.stack}}あります。フロップ、ターン、リバーでハーフ{{t:pot|ポット}}をベットし、相手は毎回{{t:call|コール}}します。合計いくら入れますか？"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}。スタックの大半は{{t:pot|ポット}}の外に残ります。{{t:spr}}約{{n:spr.srp}}では、ハーフ{{t:pot|ポット}}ではスタック全額をかけて戦うには小さすぎます。" }
      - { text: "{{n:spr.srp.stack}}、つまりスタック全額", why: "{{t:pot|ポット}}は{{n:srp.half.flop-after}}、{{n:srp.half.turn-after}}…としか増えません。ハーフ{{t:pot|ポット}}の{{t:bet|ベット}}3回で入るのは合計{{n:srp.half.total}}で、スタック全額には遠く及びません。" }
      - { text: "{{n:srp.potbet.total}}", why: "それは{{t:pot|ポット}}全額の{{t:bet|ベット}}3回（{{n:srp.potbet.flop}}、{{n:srp.potbet.turn}}、{{n:srp.potbet.river}}）で入る額です。ハーフ{{t:pot|ポット}}の{{t:bet|ベット}}では{{n:srp.half.total}}だけです。" }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "シングルレイズド{{t:pot|ポット}}、{{t:spr}}約{{n:spr.srp}}。フロップ、ターン、リバーで毎回同じ{{t:bet|ベット}}サイズにするなら、どのサイズでスタック全額が入りますか？"
    options:
      - { text: "約{{n:geo.srp.3}}{{t:pot|ポット}}、つまり{{t:pot|ポット}}全額より大きい", correct: true, why: "そうです。{{t:pot|ポット}}サイズの{{t:bet|ベット}}3回でも、スタック{{n:spr.srp.stack}}のうち{{n:srp.potbet.total}}しか入りません。スタック全額が入るのは、毎{{t:street|ストリート}}約{{n:geo.srp.3}}{{t:pot|ポット}}のときです。" }
      - { text: "約{{n:geo.3bet-ip.3}}{{t:pot|ポット}}", why: "それで足りるのは3ベット{{t:pot|ポット}}（{{t:spr}}約{{n:spr.3bet-ip}}）です。シングルレイズド{{t:pot|ポット}}では{{t:spr}}は約{{n:spr.srp}}なので、{{t:bet|ベット}}は{{t:pot|ポット}}より大きくなければなりません。" }
      - { text: "約{{n:cbet.size.small}}{{t:pot|ポット}}", why: "そのような{{t:bet|ベット}}3回では、スタックのわずかな部分しか入りません。{{t:spr}}約{{n:spr.srp}}では、毎{{t:street|ストリート}}約{{n:geo.srp.3}}{{t:pot|ポット}}が必要です。" }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "3ベット{{t:pot|ポット}}で、あなたは{{t:position|ポジション}}があり、{{t:spr}}は約{{n:spr.3bet-ip}}です。非常に強いハンドを持っていて、均等な{{t:bet|ベット}}でリバーまでにスタック全額を入れたいです。フロップでいくらベットしますか？"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "約{{n:geo.3bet-ip.3}}{{t:pot|ポット}}（{{n:geo.3bet-ip.flop}}）", correct: true, why: "そうです。(1 + 2f)の3乗 = 1 + 2·{{n:spr.3bet-ip}}から f ≈ {{n:geo.3bet-ip.3}}です。{{t:bet|ベット}}{{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}}、{{n:geo.3bet-ip.river}}で合計{{n:geo.3bet-ip.total}}、つまりスタック全額です。" }
      - { text: "{{n:cbet.size.small}}{{t:pot|ポット}}（{{n:g3b.third.flop}}）", sizeError: true, why: "アクションは正しいですが、サイズが違います。1/3{{t:pot|ポット}}の{{t:bet|ベット}}3回では、{{n:spr.3bet-ip.stack}}のうち約{{n:g3b.third.total}}しか入りません。「リバーまでにスタック全額」というプランには、約{{n:geo.3bet-ip.3}}{{t:pot|ポット}}が必要です。" }
      - { text: "{{t:check|チェック}}して、リバーでオールイン", why: "リバーで{{t:pot|ポット}}{{n:vs3bet.pot-after}}に対する{{n:spr.3bet-ip.stack}}のオールインは、{{t:pot|ポット}}の何倍もの{{t:bet|ベット}}です。相手がそれを払うのは非常に強いハンドのときだけです。3つの{{t:street|ストリート}}で均等に{{t:bet|ベット}}すれば、相手が少しずつお金を入れる機会を作れます。" }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:big-blind|ビッグブラインド}}からあなたが3ベットした後の{{t:pot|ポット}}で、{{t:spr}}は約{{n:spr.3bet-oop}}です。均等な{{t:bet|ベット}}でリバーまでにスタック全額を入れたいです。各{{t:street|ストリート}}で{{t:pot|ポット}}のどれくらいの比率にしますか？"
    table: { position: BB }
    options:
      - { text: "約{{n:geo.3bet-oop.3}}{{t:pot|ポット}}", correct: true, why: "そうです。{{t:spr}}約{{n:spr.3bet-oop}}では(1 + 2f)の3乗 = 1 + 2·{{n:spr.3bet-oop}}なので、f ≈ {{n:geo.3bet-oop.3}}です。{{t:in-position|インポジション}}での3ベット後より{{t:spr}}が低いので、サイズも小さくなります。" }
      - { text: "約{{n:geo.3bet-ip.3}}{{t:pot|ポット}}", sizeError: true, why: "惜しいですが、それは{{t:spr}}約{{n:spr.3bet-ip}}用のサイズです。{{t:spr}}約{{n:spr.3bet-oop}}なら約{{n:geo.3bet-oop.3}}{{t:pot|ポット}}で足ります。それより大きい{{t:bet|ベット}}では、リバーで満額の{{t:bet|ベット}}をするスタックが足りなくなります。" }
      - { text: "約{{n:geo.4bet.3}}{{t:pot|ポット}}", sizeError: true, why: "それで足りるのは4ベット後（{{t:spr}}約{{n:spr.4bet}}）です。{{t:spr}}約{{n:spr.3bet-oop}}では、そのような{{t:bet|ベット}}3回だとスタックのかなりの部分が残ります。" }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "4ベット後の{{t:pot|ポット}}で、{{t:spr}}は約{{n:spr.4bet}}です。フロップとターンの2回の{{t:bet|ベット}}でスタック全額を入れたいです。フロップでいくらベットしますか？"
    options:
      - { text: "約{{n:geo.4bet.2}}{{t:pot|ポット}}", correct: true, why: "そうです。2{{t:street|ストリート}}なら(1 + 2f)の2乗 = 1 + 2·{{n:spr.4bet}}なので、f ≈ {{n:geo.4bet.2}}です。{{t:bet|ベット}}と{{t:call|コール}}の後には、ターンで同じサイズの{{t:bet|ベット}}をする額がちょうど残ります。" }
      - { text: "約{{n:geo.4bet.3}}{{t:pot|ポット}}", sizeError: true, why: "それは3{{t:street|ストリート}}用のサイズです。{{n:geo.4bet.3}}{{t:pot|ポット}}の{{t:bet|ベット}}2回では、スタックの一部がリバーまで残ります。" }
      - { text: "すぐにオールイン（{{n:spr.4bet.stack}}）", why: "それは2{{t:street|ストリート}}ではなく、1{{t:street|ストリート}}のプランです。いきなり約{{n:spr.4bet}}{{t:pot|ポット}}の{{t:bet|ベット}}をすると、相手の判断は1つだけになります。全額{{t:call|コール}}するか、{{t:fold|フォールド}}するかです。" }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "ジオメトリックサイズとはどういう意味ですか？"
    options:
      - { text: "毎{{t:street|ストリート}}{{t:pot|ポット}}に対して同じ比率で、最後の{{t:bet|ベット}}がオールインになるサイズ", correct: true, why: "そうです。fの{{t:bet|ベット}}と{{t:call|コール}}で、{{t:pot|ポット}}は{{t:street|ストリート}}ごとに(1 + 2f)倍になります。最後の{{t:bet|ベット}}の後にスタック全額が{{t:pot|ポット}}に入るように、サイズを選びます。" }
      - { text: "常に{{t:pot|ポット}}全額の{{t:bet|ベット}}", why: "{{t:pot|ポット}}全額がジオメトリックになるのは、ある1つの{{t:spr}}のときだけです（例：3{{t:street|ストリート}}なら{{n:spr.zone.deep}}）。{{t:spr}}約{{n:spr.3bet-ip}}なら、約{{n:geo.3bet-ip.3}}{{t:pot|ポット}}で足ります。" }
      - { text: "比率がだんだん大きくなる{{t:bet|ベット}}：フロップで小さく、リバーで大きく", why: "金額が増えるのは{{t:pot|ポット}}が増えるからで、{{t:pot|ポット}}に対する比率は毎{{t:street|ストリート}}同じです。3ベット{{t:pot|ポット}}では{{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}}、{{n:geo.3bet-ip.river}}で、いずれも約{{n:geo.3bet-ip.3}}{{t:pot|ポット}}です。" }
---
フロップで{{t:bet|ベット}}する前に、リバーまでにいくら入れられるかを知っておくと役立ちます。{{t:bet|ベット}}と{{t:call|コール}}は{{t:pot|ポット}}に一定額を足すのではなく、{{t:pot|ポット}}を掛け算で増やします。

## {{t:pot|ポット}}の増え方

{{t:pot|ポット}}のf倍の{{t:bet|ベット}}と{{t:call|コール}}で、{{t:pot|ポット}}は(1 + 2f)倍になります。{{t:pot|ポット}}全額の{{t:bet|ベット}}なら、{{t:pot|ポット}}は3倍になります。

| {{t:street|ストリート}} | {{t:bet|ベット}}前の{{t:pot|ポット}} | {{t:bet|ベット}}（{{t:pot|ポット}}全額） | {{t:call|コール}}後の{{t:pot|ポット}} |
|---|---|---|---|
| フロップ | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| ターン | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| リバー | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

各プレイヤーは{{n:geo.ex.total}}、つまり{{n:spr.zone.deep}}{{t:pot|ポット}}分を入れました。つまり、{{t:pot|ポット}}サイズの{{t:bet|ベット}}3回で、ちょうど{{t:spr}} {{n:spr.zone.deep}}のときにオールインになります。これが、最初のレッスンで扱った{{t:spr}}の最も高いゾーンの境目の理由です。

## 式

ジオメトリックサイズとは、毎{{t:street|ストリート}}{{t:pot|ポット}}に対して同じ比率fで、最後の{{t:bet|ベット}}がオールインになるように選んだサイズです。n{{t:street|ストリート}}の場合：

```formula
(1 + 2f)^n = 1 + 2·SPR
```

例：{{t:spr}} {{n:geo.half.spr}}では、ハーフ{{t:pot|ポット}}の{{t:bet|ベット}}3回でスタック全額が入ります。{{t:pot|ポット}}{{n:ex.pot}}のとき、{{n:ex.bet.half}}、{{n:geo.half.turn}}、{{n:geo.half.river}}で合計{{n:geo.half.total}}です。

## よくある{{t:pot|ポット}}でのサイズ

| {{t:pot|ポット}} | {{t:spr}} | 3{{t:street|ストリート}} | 2{{t:street|ストリート}} |
|---|---|---|---|
| {{t:open|オープン}}と{{t:call|コール}} | {{n:spr.srp}} | {{n:geo.srp.3}}{{t:pot|ポット}} | – |
| {{t:in-position|インポジション}}の3ベット | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}}{{t:pot|ポット}} | – |
| {{t:big-blind|ビッグブラインド}}からの3ベット | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}}{{t:pot|ポット}} | – |
| 4ベット | {{n:spr.4bet}} | {{n:geo.4bet.3}}{{t:pot|ポット}} | {{n:geo.4bet.2}}{{t:pot|ポット}} |

{{t:in-position|インポジション}}の3ベット{{t:pot|ポット}}では、{{t:bet|ベット}}は{{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}}、{{n:geo.3bet-ip.river}}で、合計{{n:geo.3bet-ip.total}}、つまりスタック全額です。

## シングルレイズド{{t:pot|ポット}}はディープ

{{t:spr}}約{{n:spr.srp}}では、ハーフ{{t:pot|ポット}}の{{t:bet|ベット}}3回で入るのは{{n:srp.half.total}}だけで、{{t:pot|ポット}}サイズの{{t:bet|ベット}}3回でもスタック{{n:spr.srp.stack}}のうち{{n:srp.potbet.total}}です。スタック全額が入るのは、{{t:pot|ポット}}より大きい{{t:bet|ベット}}のときだけです。そのため、このような{{t:pot|ポット}}でスタック全額をかけて戦うのは、主に非常に強いハンドのときです。

:::note いつ役立つか
ジオメトリックサイズが役立つのは、リバーまでにスタック全額を入れたいとき、つまり非常に強いハンドのときです。すべてのハンドがスタック全額をかけて戦いたいわけではありません。ハンドが何ストリート分の{{t:value|バリュー}}に耐えられるかは、次のレッスンで扱います。この式は純粋な数学です。これまでのモジュールではフロップの{{t:texture|テクスチャー}}に合わせたサイズを紹介しました。ジオメトリックサイズは、スタック全額を入れるプランのための基準点です。
:::
