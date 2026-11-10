---
id: m4.l4
module: m4
order: 4
title: "リンパー"
sub: "アイソレーション：サイズとレンジ"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "あなたより前のプレイヤー1人が{{t:big-blind}}にコールしただけです（リンプ）。ボタンから{{t:raise|レイズ}}したいと考えています。いくらまでにしますか？"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "{{n:pf.iso.one-limper}}まで", correct: true, why: "基本の{{n:pf.iso.base}}に、リンパー1人につき{{n:pf.iso.per-limper}}を加えます。このサイズなら、リンパーから有利な価格を奪えます。" }
      - { text: "{{n:pf.min-raise}}まで", why: "最小の{{t:raise}}はリンパーに非常に良い価格を与え、その場で{{t:pot|ポット}}を獲得することはほとんどありません。" }
      - { text: "通常の{{t:open}}と同じ{{n:pf.open-size}}まで", why: "リンパーはすでにブラインド分を入れているので、{{t:pot}}は大きくなっています。{{t:raise|レイズ}}は通常の{{t:open}}より大きくする必要があります。" }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "あなたより前のプレイヤー2人が{{t:big-blind}}にコールしただけです。{{t:cutoff|CO}}から{{t:raise|レイズ}}したいと考えています。いくらまでにしますか？"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "{{n:pf.iso.two-limpers}}まで", correct: true, why: "{{n:pf.iso.base}}に、2人のリンパーそれぞれにつき{{n:pf.iso.per-limper}}を加えます。" }
      - { text: "{{n:pf.iso.one-limper}}まで", why: "それはリンパー1人に対するサイズです。リンパーが1人増えるごとに{{n:pf.iso.per-limper}}を加えます。" }
      - { text: "コールだけする", why: "スーテッドのAQは{{t:value|バリュー}}のために{{t:raise|レイズ}}するハンドです。コールすると{{t:initiative|イニシアチブ}}を手放し、全員を安く参加させてしまいます。" }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "1人がリンプし、{{t:small-blind|スモールブラインド}}のあなたまで全員がフォールドしました。{{t:raise|レイズ}}したいと考えています。いくらまでにしますか？"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "{{n:pf.iso.one-limper-oop}}まで", correct: true, why: "{{t:out-of-position|アウトオブポジション}}では、さらに{{n:pf.iso.oop-extra}}を加えます。{{n:pf.iso.base}}に、リンパー1人につき{{n:pf.iso.per-limper}}と、さらに{{n:pf.iso.oop-extra}}を加えた額です。" }
      - { text: "{{n:pf.iso.one-limper}}まで", why: "それは{{t:in-position}}のサイズです。{{t:out-of-position|アウトオブポジション}}では少し大きめに{{t:raise|レイズ}}し、相手がより多く{{t:fold|フォールド}}するか、より高く払うようにします。" }
      - { text: "コールだけする", why: "KKなら常に{{t:pot|ポット}}を大きくしていきます。" }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "あなたより前のプレイヤー1人が{{t:big-blind}}にコールしただけです（リンプ）。あなたはボタンです。どうしますか？"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{n:pf.iso.one-limper}}まで{{t:raise|レイズ}}", correct: true, why: "AJは{{t:isolation|アイソレーション}}に向いたハンドです。弱いプレイヤーがリンプする多くのハンドをドミネートしており、フロップ以降は{{t:position|ポジション}}もあります。サイズは{{n:pf.iso.base}}に、リンパー1人につき{{n:pf.iso.per-limper}}を加えます。" }
      - { text: "{{n:pf.min-raise}}まで{{t:raise|レイズ}}", sizeError: true, why: "アクションは正しいですが、最小の{{t:raise}}はリンパーに非常に良い価格を与えるため、相手はほとんど{{t:fold|フォールド}}せず、1対1の勝負になりません。{{n:pf.iso.one-limper}}まで{{t:raise|レイズ}}します。" }
      - { text: "コール", why: "{{t:initiative|イニシアチブ}}を手放し、ブラインドを安く参加させてしまいます。リンパーをドミネートするハンドなら、{{t:pot|ポット}}を大きくしたいところです。" }
      - { text: "{{t:fold|フォールド}}", why: "タイトすぎます。リンパー1人に対して、ボタンは約{{n:pf.iso.btn.low}}～{{n:pf.iso.btn.high}}のハンドで{{t:isolation|アイソレーション}}を行い、AJは余裕でその中に入ります。" }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "あなたより前のプレイヤー3人が{{t:big-blind}}にコールしただけです。あなたはボタンです。どうしますか？"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "コール", correct: true, why: "リンパーが多い場面では、スーテッドの{{t:connectors}}はスペキュレイティブハンドです。{{t:in-position}}で安くフロップを見られ、大きな役を作れる可能性があります。ある情報源はここでのコールを推奨していますが、別の情報源は避けるよう勧めているため、{{t:fold}}も正解とします。" }
      - { text: "{{t:fold|フォールド}}", correct: true, why: "これも正解です。ある情報源はコールせず、{{t:raise|レイズ}}か{{t:fold|フォールド}}を選ぶよう勧めており、76sは{{t:value|バリュー}}のために{{t:raise|レイズ}}するハンドではありません。別の情報源はコールを推奨しているため、どちらのプレイも正解とします。" }
      - { text: "{{n:pf.iso.two-limpers}}まで{{t:raise|レイズ}}", why: "リンパーが3人いると、{{t:bluff}}の{{t:raise|レイズ}}で{{t:pot|ポット}}を獲得できることはまれで、サイズもさらに大きくする必要があります。76sは{{t:value|バリュー}}のために{{t:raise|レイズ}}するハンドではありません。" }
---
リンプとは、{{t:big-blind|ビッグブラインド}}にコールするだけでハンドに参加することです。プロが最初にリンプで参加することはまれなので（モジュール3のルール）、マイクロステークスのリンパーはたいてい弱いプレイヤーです。リンパーに対する{{t:raise|レイズ}}を{{t:isolation|アイソレーション}}と呼びます。リンパーと1対1で、できれば{{t:in-position}}でプレイすることが狙いです。

:::note これらのルールの出典
このアプリのソルバーはリンプをプレイしないため、このレッスンはトレーニング教材に基づいています。ルールはヒューリスティックとして表示されています。
:::

## {{t:isolation|アイソレーション}}のサイズ

オンラインでは、{{n:pf.iso.base}}にリンパー1人につき{{n:pf.iso.per-limper}}を加えた額まで{{t:raise|レイズ}}します。1人なら{{n:pf.iso.one-limper}}まで、2人なら{{n:pf.iso.two-limpers}}までです。{{t:out-of-position|アウトオブポジション}}では、さらに{{n:pf.iso.oop-extra}}を加えます。ミニマムレイズは絶対にしないでください。リンパーに非常に良い価格を与えてしまい、ほとんど{{t:fold|フォールド}}されなくなります。

## {{t:isolation|アイソレーション}}の{{t:range|レンジ}}

ボタンでリンパー1人に対しては、約{{n:pf.iso.btn.low}}～{{n:pf.iso.btn.high}}のハンドで広く{{t:isolation|アイソレーション}}します。中位から上位の{{t:pair|ペア}}、スーテッドのA、強いオフスートのA、ハイカード、スーテッドの{{t:connectors|コネクター}}の一部です。{{t:position}}が早いほど、またリンパーが多いほど{{t:range}}は狭くなります。リンパーが3人なら、主に{{t:value|バリュー}}のために{{t:raise|レイズ}}します。

小さな{{t:pair|ペア}}やスーテッドの{{t:connectors|コネクター}}のようなスペキュレイティブハンドは、リンパーが多いときに{{t:in-position}}ならコールしてもかまいません。ここは情報源によって見解が分かれます。一方はコールを推奨し、もう一方は避けるよう勧めています。ドリルでは、コールと{{t:fold}}のどちらのプレイも正解とします。
