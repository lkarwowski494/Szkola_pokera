---
id: m3.l2
module: m3
order: 2
title: "スターティングハンド"
sub: "フロップ前にどのカードをプレイするか"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "どちらのハンドが強いですか？"
    options:
      - { text: "A♥ K♥（同じスート）", correct: true, why: "ランクは同じですが、同じスートのハンドには{{t:flush}}で勝つという別の道もあります。" }
      - { text: "A♥ K♣（異なるスート）", why: "スートが異なると、{{t:flush}}のチャンスを失います。" }
      - { text: "同じ強さ", why: "惜しいですが、少し違います。カードのスートは重要です。" }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "まだ誰もゲームに参加していません。どうしますか？"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "オフスートの7-2は最も弱いハンドの一つです。カード同士が離れすぎていて一緒に{{t:straight|ストレート}}を作れず、{{t:flush}}になることもまれで、{{t:pair}}ができてもキッカーが弱いからです。最悪のハンドと呼ばれることが多いですが、ランダムなハンドに対する計算では、オフスートの3-2など、さらに成績の悪いハンドもあります。" }
      - { text: "驚かせるために{{t:raise|レイズ}}", why: "{{t:bluff|ブラフ}}（相手により良いハンドを{{t:fold|フォールド}}させるために弱いハンドでプレイすること）を、最も弱いハンドの一つで、後ろにまだ4人のプレイヤーがいる状況でプリフロップに行うと、長期的には負けます。" }
      - { text: "安いので{{t:call|コール}}", why: "弱いハンドでの「安い」参加の一つ一つが積み重なって、大きな損失になります。" }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "前のプレイヤーが{{t:raise|レイズ}}しました。どうしますか？"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "もう一度{{t:raise|レイズ}}（3ベット）", correct: true, why: "あなたは考えうる最強のハンドを持っています。できるだけ多く賭けて、相手の数を減らしたいところです。" }
      - { text: "{{t:call|コール}}だけ", why: "上級者は相手を惑わすために時々そうしますが、原則としては価値を失い、他のプレイヤーを安く参加させてしまいます。" }
      - { text: "{{t:fold|フォールド}}", why: "エースのペアをプリフロップで{{t:fold|フォールド}}することは決してありません。他のどのハンドに対しても有利で、例えばKKに対しては約{{n:pf.aa-vs-kk}}の勝率があります。" }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "全員があなたまで{{t:fold|フォールド}}しました。どうしますか？"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|レイズ}}", correct: true, why: "スーテッドのQJは、{{t:position|ポジション}}からブラインドを攻めるのにとても良いハンドです。{{t:straight|ストレート}}、フラッシュ、高い{{t:pair|ペア}}を作ります。" }
      - { text: "{{t:fold|フォールド}}", why: "ボタンでは、このハンドは{{t:fold|フォールド}}するには良すぎます。" }
      - { text: "{{t:call|コール}}", why: "{{t:raise|レイズ}}するほうが良いです。すぐにブラインドを獲得するチャンスがあり、{{t:initiative|イニシアチブ}}を持ってプレイできます。" }
---
初心者は、弱いハンドを多くプレイしすぎることで、お金の大半を失います。最初の段階で良いハンド選びをすることが、負けを止める最も早い方法です。

## ハンドのグループ

- **最強**: [[As Ah]]、[[Ks Kh]]、[[Qs Qh]]、そしてスーテッドとオフスートのAK（例：[[As Ks]]と[[As Kd]]）。{{t:raise|レイズ}}します。前に誰かが{{t:raise|レイズ}}していたら、通常は{{t:value|バリュー}}のためにもう一度{{t:raise|レイズ}}（3ベット）します。つまり、相手により弱いハンドで{{t:call|コール}}してもらうためです。
- **強い**: JJ、TT、AQ、スーテッドのAJ、スーテッドのKQ。
- **投機的**: 小さな{{t:pair|ペア}}と、同じスートの連続したカード（例：[[7h 6h]]）。{{t:late-position|レイトポジション}}で有効です。
- **弱い**: つながりのない、低い、オフスートのカード（例：[[9c 3d]]）。{{t:fold|フォールド}}します。

:::note {{t:combo|コンボ}}はいくつあるか
スターティングハンドは全部で{{n:combos.total}}{{t:combo|コンボ}}ありますが、種類は{{n:combos.kinds}}種類しかありません。{{t:pair|ペア}}が{{n:combos.kinds.pair}}、スーテッドのハンドが{{n:combos.kinds.suited}}、オフスートのハンドが{{n:combos.kinds.offsuit}}です。各{{t:pair}}は{{n:combos.pair}}{{t:combo|コンボ}}、スーテッドのハンドは{{n:combos.suited}}、オフスートのハンドは{{n:combos.offsuit}}です。そのため、オフスートのAKはスーテッドのAKの3倍の頻度で出現します。
:::

上のグループは、始めるための簡略化です。各{{t:position|ポジション}}の正確な{{t:open|オープン}}{{t:range|レンジ}}は、次のレッスンで{{t:range|レンジ}}のグリッドを使って学びます。
