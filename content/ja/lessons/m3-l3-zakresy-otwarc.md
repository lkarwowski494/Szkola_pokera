---
id: m3.l3
module: m3
order: 3
title: "オープンレンジ"
sub: "最初に参加するときのハンドをポジションごとに"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "あなたより前の全員が{{t:fold|フォールド}}し、あなたはボタンにいます。{{t:open|オープン}}するハンドを塗ってください。"
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "あなたが最初にアクションします（{{t:utg}}）。{{t:open|オープン}}するハンドを塗ってください。"
---
{{t:open|オープン}}{{t:range|レンジ}}とは、あなたより前の全員が{{t:fold|フォールド}}したときに{{t:raise|レイズ}}するハンドのリストです。以下のグリッドは、このアプリのプリフロップソルバーが、6人テーブルでスタック{{n:format.stack}}のゲームについて計算したものです。

## グリッドの読み方

各マスは1種類のハンドを表します。対角線より上はスーテッドハンド（例：AKs）、下はオフスーツハンド（例：AKo）、対角線上は{{t:pair|ペア}}です。緑のマスは{{t:raise}}、空のマスは{{t:fold}}です。一部だけ塗られたマスは、ソルバーがそのハンドをときどきしかプレイしないことを意味します。{{n:range.mixed.low}}から{{n:range.mixed.high}}の頻度で{{t:open|オープン}}する場合（このしきい値はアプリの設定です）、それは{{t:mixed-hand|ミックスハンド}}で、練習問題ではどちらの答えも正解とします。ソルバーがプレイする頻度が{{n:range.mixed.low}}未満でも{{n:range.mixed.min}}以上のアクションは、練習問題では許容範囲として扱います。ミスではありませんが、その問題の復習は早めに戻ってきます。ソルバーがプレイする頻度が{{n:range.mixed.min}}未満のアクションは、練習問題では不正確と評価し（ソルバーのサイトが公開している評価基準では、こうした手をそう呼んでいます）、ソルバーがまったくプレイしないアクションはミスと評価します。

## 最初の{{t:position|ポジション}}からボタンまで

```range
rfi.utg
```

{{t:utg}}からは、ソルバーはハンドの{{n:solver.rfi.utg}}を{{t:open|オープン}}します。プロの情報源では{{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}とされています。

```range
rfi.hj
```

```range
rfi.co
```

{{t:position|ポジション}}がボタンに1つ近づくごとに、{{t:range}}は広がります。{{t:hijack|HJ}}は{{n:solver.rfi.hj}}、{{t:cutoff|CO}}では{{n:solver.rfi.co}}ものハンドを{{t:open|オープン}}します。

```range
rfi.btn
```

ボタンでは、ソルバーは{{n:solver.rfi.btn}}ものハンドを{{t:open|オープン}}します。残っているのはブラインドだけで、フロップ後は{{t:position|ポジション}}があるからです。

```range
rfi.sb
```

{{t:small-blind|スモールブラインド}}は{{t:big-blind|ビッグブラインド}}とだけ対戦するので、フロップ後は先にアクションするにもかかわらず、ボタンと同じくらい広く{{t:open|オープン}}します。ハンドの約{{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}}です。マイクロ{{t:stakes|ステークス}}では、{{t:small-blind|スモールブラインド}}からは{{t:raise|レイズ}}か{{t:fold|フォールド}}のどちらかにし、{{t:big-blind|ビッグブラインド}}の額まで差額を払って参加することはしません。{{t:pot|ポット}}から差し引かれる{{t:rake}}が、差額を払って参加する利益を減らすからです。これは単純化です。ソルバーの解の中には、{{t:small-blind|スモールブラインド}}から一部のハンドで差額を払って参加するものもあります。アプリのソルバーはここから{{n:solver.rfi.sb}}のハンドを{{t:open|オープン}}しており、これは情報源の範囲内です。

:::note 9人テーブルの場合
9人テーブルでは、{{t:hijack|HJ}}の前にさらに3つの{{t:position|ポジション}}があります。{{t:utg}}、{{t:utg|UTG}}+1、{{t:utg|UTG}}+2で、その後にLJが続きます。このとき{{t:utg}}の後ろには8人のプレイヤーがいるので、{{t:utg}}、{{t:utg|UTG}}+1、{{t:utg|UTG}}+2からは、6人テーブルの{{t:utg}}よりもタイトに{{t:open|オープン}}します。後ろにいるプレイヤーが多いからです。この3人が{{t:fold|フォールド}}したら、LJは6人テーブルの{{t:utg}}と同じようにプレイし、それ以降の{{t:position|ポジション}}も上のグリッドと同じようにプレイします。9人テーブルの前方の{{t:position|ポジション}}については、方向性だけを示します。これらの{{t:range|レンジ}}の数値や構成は、公開されているソルバーの解とまだ照合していません。
:::

:::note 覚え方
{{n:combos.kinds}}マスを丸暗記しないでください。境界を覚えましょう。どの{{t:pair|ペア}}、どのスーテッドのエース、そしてオフスーツハンドはどのカードから始まるかです。以下の練習問題では、まさに{{t:range|レンジ}}の境界にあるハンドがより多く出題されます。
:::

これらの{{t:range|レンジ}}はフロップ後のプレイを単純化したモデルから得られたものなので、{{t:range|レンジ}}の境界にある十数個のハンドではプロのチャートと異なり、その違いはどちらの方向にもあります。主にギャップのあるスーテッドハンド（例：75s、97s）と、弱いオフスーツハンド（例：A4o、K7o）です。練習問題ではこれらのハンドは採点しません。
