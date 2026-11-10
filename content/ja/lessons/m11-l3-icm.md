---
id: m11.l3
module: m11
order: 3
title: "ICMとバブルファクター"
sub: "チップはお金ではありません"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "残りは3人で、入賞は2位までです。スタックは{{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}}、{{n:m11.icm.a.s3}}{{t:chips|チップ}}です。{{t:icm}}によると、最も短いスタックが1位になる確率はいくらですか？パーセントで入力してください。"
    answer: m11.icm.a.chips3
    explanation: "1位の確率 = スタック ÷ 全{{t:chips|チップ}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}。"
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "同じスタックです（{{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}}、{{n:m11.icm.a.s3}}）。ビッグスタックが1位になりました。最も短いスタックが2位になる確率は、今いくらですか？"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "残りは2人で{{n:m11.icm.a.rest1}}{{t:chips|チップ}}、そのうち短いスタックは{{n:m11.icm.a.s3}}を持っています：{{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}。" }
      - { text: "{{n:m11.icm.a.chips3}}", why: "それは全{{t:chips|チップ}}から計算した1位の確率です。勝者が計算から外れたら、残ったプレイヤーの{{t:chips}}だけで割ります：{{n:m11.icm.a.rest1}}。" }
      - { text: "{{n:m11.icm.a.second3}}", why: "それは、考えられる2人の勝者の両方の場合を合わせた{{t:short-stack|ショートスタック}}の2位の確率の合計です。問題はビッグスタックが勝った場合についてです。" }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|賞金}}：1位に{{t:prize-pool|プライズプール}}の{{n:m11.icm.a.p1}}、2位に{{n:m11.icm.a.p2}}。スタックは{{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}}、{{n:m11.icm.a.s3}}です。{{t:icm}}によると、最も短いスタックの価値は（{{t:prize-pool|プライズプール}}に対するパーセントで）いくらですか？数値を入力してください。"
    answer: m11.icm.a.eq3
    explanation: "1位の確率は{{n:m11.icm.a.chips3}}、2位は{{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}。エクイティ = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}で、{{t:chips|チップ}}の持ち分{{n:m11.icm.a.chips3}}より多くなります。"
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "ビッグスタックは場にある{{t:chips|チップ}}の{{n:m11.icm.a.chips1}}を持っています。{{t:icm}}によると、お金としての価値はいくらですか？"
    options:
      - { text: "{{n:m11.icm.a.eq1}}、つまり{{t:chips|チップ}}の持ち分より少ない", correct: true, why: "ビッグスタックはすべての{{t:chips}}を獲得する可能性があっても、得られるのは最大で{{t:prize-pool|プライズプール}}の{{n:m11.icm.a.p1}}です。そのため、リーダーの{{t:chips}}は持ち分より価値が低く、{{t:short-stack|ショートスタック}}の方は高くなります（{{n:m11.icm.a.eq3}}）。" }
      - { text: "{{n:m11.icm.a.chips1}}、{{t:chips|チップ}}の持ち分と同じ", why: "勝者が{{t:prize-pool|プライズプール}}全体を取るならそうなります。{{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}}の{{t:payout|賞金}}では、ビッグスタックの{{t:chips|チップ}}は1枚ごとの価値が低くなります：{{n:m11.icm.a.eq1}}。" }
      - { text: "{{n:m11.icm.a.p1}}、ほぼ確実に勝つから", why: "1位になる確率は{{n:m11.icm.a.chips1}}しかなく、残りの{{t:tournament-equity|トーナメントエクイティ}}は2位から得ます。合計は{{n:m11.icm.a.eq1}}です。" }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|バブル}}：4人で、入賞は3位までです。オールインを{{t:call|コール}}すると、負けた場合は{{t:prize-pool|プライズプール}}の{{n:m11.bf.loss}}を失い、勝った場合は{{n:m11.bf.gain}}を得ます。バブルファクターはいくらですか？小数点以下2桁で入力してください。"
    answer: m11.bf.value
    explanation: "バブルファクター = 損失 ÷ 利得 = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}。負けの痛みは、勝ちの恩恵のほぼ1.5倍です。"
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "バブルファクターは{{n:m11.bf.value}}です。オールインへの{{t:call|コール}}が利益になるには、どれだけのエクイティが必要ですか？パーセントで入力してください。"
    answer: m11.bf.req
    explanation: "必要なエクイティ = BF ÷ (BF + 1)、つまり損失 ÷ (損失 + 利得) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}。{{t:chips}}のゲームなら{{n:m11.bf.req-chips}}で足ります。"
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:chips}}のゲームでは、このオールインを{{t:call|コール}}するには{{n:m11.bf.req-chips}}のエクイティで足りますが、{{t:icm}}によると{{n:m11.bf.req}}必要です。この差は何と呼ばれますか？"
    options:
      - { text: "{{t:risk-premium|リスクプレミアム}}（{{n:m11.bf.premium}}）", correct: true, why: "{{t:risk-premium|リスクプレミアム}}とは、{{t:chips|チップ}}での価格を上回って{{t:icm}}が要求する追加のエクイティです：{{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}。" }
      - { text: "バブルファクター", why: "バブルファクターは損失と利得の比（{{n:m11.bf.value}}）です。そこから必要なエクイティを計算し、{{t:chips}}のゲームとの差が{{t:risk-premium}}です。" }
      - { text: "フォールドエクイティ", why: "フォールドエクイティは相手の{{t:fold|フォールド}}から得る利益です。オールインを{{t:call|コール}}するときには、それはありません。" }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|バブル}}、レッスンの例です。あなたのハンドは、相手のオールインの{{t:range|レンジ}}に対して約{{n:m11.bf.example-eq}}のエクイティがあります。{{t:chips}}のゲームなら{{n:m11.bf.req-chips}}で足りるので、{{t:call}}は利益になります。ここではどうしますか？"
    options:
      - { text: "{{t:fold|フォールドする}}", correct: true, why: "{{t:icm}}によると、ここでは{{n:m11.bf.req}}のエクイティが必要です。それより勝つ頻度が低いハンドは、{{t:chips|チップ}}ではプラスでも、お金では損をします。" }
      - { text: "{{t:call|コールする}}。{{t:chips|チップ}}では利益だから", why: "{{t:payout|賞金}}のある{{t:tournament|トーナメント}}で重要なのはお金で、{{t:chips}}ではありません。負けると{{t:prize-pool|プライズプール}}の{{n:m11.bf.loss}}を失い、勝っても得るのは{{n:m11.bf.gain}}だけです。" }
      - { text: "{{t:call|コールする}}。半分以上勝てるから", why: "{{n:m11.bf.example-eq}}のハンドは半分より多く勝ちますが、それでもここでは弱すぎます：基準は{{n:m11.bf.req}}です。" }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:tournament|トーナメント}}の{{t:bubble|バブル}}です。あなたはテーブルで最大のスタックを持ち、全員を{{t:cover|カバー}}しています。ミドルスタックはあなたに対して非常によくフォールドします。ここから何が言えますか？"
    options:
      - { text: "相手は狭く{{t:call|コール}}するので、より広く{{t:shove|プッシュ}}できる", correct: true, why: "ミドルスタックは{{t:call|コール}}すると入賞直前で敗退するリスクがあるため、多くのエクイティが必要です。あなたは負けてもスタックの一部を失うだけです。相手は狭く{{t:call|コール}}するので、争わずに{{t:pot|ポット}}を獲得することが増えます。" }
      - { text: "リードを失わないよう、よりタイトにプレイする", why: "リーダーはテーブルで最もリスクが小さい立場です。タイトにプレイすると、最大の強みであるミドルスタックへのプレッシャーを手放すことになります。" }
      - { text: "何も変わらない。{{t:icm}}は{{t:short-stack|ショートスタック}}にしか関係しないから", why: "{{t:icm}}は全員に関係します：各プレイヤーが{{t:call|コール}}に必要なエクイティを変え、それはスタックの分布全体に左右されます。" }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "{{t:icm}}モデルは何を前提としていますか？"
    options:
      - { text: "全員が同じくらい上手で、順位を決めるのはスタックだけだということ", correct: true, why: "{{t:icm}}はスタックだけを各順位に入る確率に換算します。{{t:position|ポジション}}、上がっていくブラインド、腕前の差は考慮しません。" }
      - { text: "上手なプレイヤーほどよく勝つということ", why: "逆です：{{t:icm}}は腕前が等しいと仮定します。プレイヤーの優位はまったく考慮しません。" }
      - { text: "{{t:big-blind|ビッグブラインド}}のプレイヤーは確率が低いということ", why: "{{t:icm}}は{{t:position|ポジション}}もブラインドも考慮せず、スタックだけを見ます。これはその限界の一つです。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
お金をかけたゲーム（キャッシュ）では、{{t:chips|チップ}}はお金そのものです：勝った1枚も負けた1枚も同じ価値です。{{t:tournament|トーナメント}}ではそうではありません。賞金は上位の数名に支払われ、勝者はすべての{{t:chips}}を手にしても、{{t:prize-pool|プライズプール}}全体を手にするわけではありません。そのため、{{t:chips}}をお金に換算する必要があります。

## {{t:icm}}：お金で見たスタック

独立{{t:chips|チップ}}モデル（{{t:icm}}）は、スタックを各順位に入る確率に換算します。全員が同じくらい上手だと仮定するので、順位を決めるのはスタックだけです。

```formula
1位の確率 = 自分のスタック ÷ 全チップ
```

2位の確率も同じように計算しますが、考えられる勝者ごとに別々に計算します：その勝者の{{t:chips}}を差し引き、残りで割ります。スタックの{{t:tournament-equity|トーナメントエクイティ}}、つまり{{t:prize-pool|プライズプール}}のうち期待される取り分は、「順位の確率 × その順位の{{t:payout}}」の合計です。

## 例：{{t:bubble|バブル}}の3人

入賞は2位までで、{{t:prize-pool|プライズプール}}の{{n:m11.icm.a.p1}}と{{n:m11.icm.a.p2}}です。スタックは{{n:m11.icm.a.s1}}、{{n:m11.icm.a.s2}}、{{n:m11.icm.a.s3}}{{t:chips|チップ}}です。

- {{t:short-stack|ショートスタック}}が{{t:tournament}}に勝つ確率は{{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**です。
- 2位：ビッグスタックが勝った場合（{{n:m11.icm.a.chips1}}）、短いスタックが2位になる確率は{{n:m11.icm.a.second3.via1}}、ミドルスタックが勝った場合（{{n:m11.icm.a.chips2}}）は{{n:m11.icm.a.second3.via2}}です。合計{{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}**（各項は四捨五入しています）。
- エクイティ：{{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{t:prize-pool|プライズプール}}の**{{n:m11.icm.a.eq3}}**。

| スタック | {{t:chips|チップ}}の持ち分 | {{t:icm}}によるエクイティ |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

{{t:short-stack|ショートスタック}}は自分の{{t:chips}}以上の価値があり、ビッグスタックはそれ以下です：リーダーが得られるのは1位の賞金までです。

## バブルファクター：負けの痛みは大きい

4人で、入賞は3位まで：{{n:m11.bf.p1}}、{{n:m11.bf.p2}}、{{n:m11.bf.p3}}です。スタックは{{n:m11.bf.s1}}、{{n:m11.bf.s2}}（あなた）、{{n:m11.bf.s3}}、{{n:m11.bf.s4}}。{{n:m11.bf.s3}}のプレイヤーがオールインし、あなたはその相手を{{t:cover|カバー}}しています。つまり、あなたの方が{{t:chips|チップ}}を多く持っています。簡単にするため、{{t:pot|ポット}}内のブラインドは無視します。

- 現在、あなたのスタックの価値は{{t:prize-pool|プライズプール}}の{{n:m11.bf.eq.now}}です。
- 勝った場合：スタックは{{n:m11.bf.win}}になり、相手は敗退し、全員が入賞します。エクイティは{{n:m11.bf.eq.win}}に上がり、**{{n:m11.bf.gain}}**増えます。
- 負けた場合：残りは{{n:m11.bf.lose}}で、エクイティは{{n:m11.bf.eq.lose}}に下がり、**{{n:m11.bf.loss}}**減ります。

```formula
バブルファクター = 負けたときの損失 ÷ 勝ったときの利得
```

ここでは{{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**です。このアプリはこの定義（損失 ÷ 利得）を使います：損失と利得が等しい{{t:chips}}のゲームでは、バブルファクターは1です。プッシュ/フォールド表の中には、バブルファクターを別の方法・別のスケールで計算するものがあるので、その数値をここの数値と直接比べないでください。ここから必要なエクイティが求まります：

```formula
必要なエクイティ = BF ÷ (BF + 1)
```

結果は**{{n:m11.bf.req}}**です。{{t:chips}}のゲームなら{{n:m11.bf.s3}}を賭けて{{n:m11.bf.s3}}を得るので、{{n:m11.bf.req-chips}}で足ります。その差{{n:m11.bf.premium}}が**{{t:risk-premium}}**です。

同じ傾向は、スタックが等しい3人について公開された均衡（2008年の研究論文）にも見られます：ボタンと{{t:small-blind}}がすでにオールインしているとき、{{t:big-blind}}は単一のハンドでは{{n:m11.jamfold3.overcall.single}}のハンドで{{t:call|コール}}しますが、{{t:payout|賞金}}のある{{t:tournament|トーナメント}}では{{n:m11.jamfold3.overcall.tourn}}だけ、つまり最も高い{{t:pocket-pair|ポケットペア}}とAKsだけです。

:::note 狭く{{t:call|コール}}するのは誰か
{{t:bubble|バブル}}や{{t:final-table|ファイナルテーブル}}（{{t:tournament|トーナメント}}の最後のテーブルで、最高額の賞金をかけてプレイします）のミドルスタックは、{{t:chips}}のゲームよりもずっと狭くオールインを{{t:call|コール}}します。相手を{{t:cover|カバー}}しているビッグスタックはリスクが小さく、それを利用できます：相手は{{t:fold|フォールド}}せざるを得ないので、より広く{{t:shove|プッシュ}}できます。バブルファクターはテーブルの全スタックに左右されるため、テーブルで計算するのではなく、感覚を養うために例で練習します。
:::

## {{t:icm}}の限界

{{t:icm}}は{{t:position|ポジション}}、上がっていくブラインド、プレイヤーの腕前を考慮しません。これは近似であり、{{t:tournament|トーナメント}}の正確な評価ではありません。
