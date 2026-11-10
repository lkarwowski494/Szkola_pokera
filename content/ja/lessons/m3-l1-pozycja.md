---
id: m3.l1
module: m3
order: 1
title: "テーブルでのポジション"
sub: "座る場所が重要な理由"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "最も有利な{{t:position}}はどれですか？"
    options:
      - { text: "ボタン（{{t:button|BTN}}）", correct: true, why: "フロップ以降、ボタンは最後にアクションするので、自分が決める前に必ず相手の判断を知ることができます。" }
      - { text: "{{t:big-blind|ビッグブラインド}}", why: "{{t:big-blind|BB}}はすでにチップを出しているので参加に必要な額は少なくなりますが、フロップ以降は最初の方にアクションします。" }
      - { text: "{{t:utg|UTG}}", why: "{{t:utg|UTG}}はプリフロップで最初にアクションし、後ろにテーブルの全員が控えています。オープンするのが最も難しい場所です。" }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "前の全員が{{t:fold|フォールド}}しました。どうしますか？"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|フォールド}}する", correct: true, why: "スーテッドでないK9は、{{t:utg|UTG}}からの{{t:open|オープン}}{{t:range|レンジ}}、つまりこの{{t:position|ポジション}}から{{t:open|オープン}}するハンドの一覧に入っていません。後ろには5人のプレイヤーがいて、より強いキッカーのキングを持っている人がよくいます。" }
      - { text: "{{t:raise|レイズ}}する", why: "{{t:utg|UTG}}から{{t:open|オープン}}するのは約{{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}のハンドだけです。K9oはキングを引きやすく、KQやAKに負けます。" }
      - { text: "{{t:big-blind|ビッグブラインド}}分だけ払う", why: "{{t:utg|UTG}}から参加額だけ払う（リンプ）のは悪い習慣です。ハンドが{{t:raise|レイズ}}に値するか、{{t:fold|フォールド}}するかのどちらかです。" }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "同じハンドですが、あなたはボタンにいて、前の全員が{{t:fold|フォールド}}しました。"
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|レイズ}}する", correct: true, why: "残っているのはブラインドだけで、フロップ以降はあなたが{{t:position|ポジション}}を持っています。ボタンでは約{{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}}のハンドを{{t:open|オープン}}し、K9oはその範囲に入ります。" }
      - { text: "{{t:fold|フォールド}}する", why: "慎重すぎます。ブラインドだけが相手ならこのハンドで十分で、{{t:position}}がさらに価値を高めます。" }
      - { text: "{{t:big-blind|ビッグブラインド}}分だけ払う", why: "リンプは{{t:initiative|イニシアチブ}}を手放します。{{t:raise|レイズ}}すれば、その場でブラインドを獲得できることがよくあります。" }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "最後にアクションすると、なぜ有利なのですか？"
    options:
      - { text: "決める前に相手の行動がわかる", correct: true, why: "相手のアクションはすべて情報です。最後のプレイヤーは最も多くの情報を持ち、安く{{t:check|チェック}}したり、他のプレイヤーが弱さを見せたときに{{t:pot|ポット}}を奪ったりできます。" }
      - { text: "より良いカードが配られる", why: "カードは{{t:position|ポジション}}に関係なくランダムです。" }
      - { text: "支払うブラインドが小さい", why: "ボタンではブラインドを払いませんが、それは主な利点ではありません。最も重要なのは情報です。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
ディーラーボタン（**{{t:button|BTN}}**、ボタン）はハンドごとに移動します。アクションの順番はこのボタンで決まります。フロップ以降、ボタンは**最後**にアクションし、これは大きな利点です。自分が決める前に、他の全員の行動を見られるからです。フロップ以降に相手より先にアクションするプレイヤーは{{t:out-of-position}}でプレイします。相手のプレイを知らないまま決めることになります。

## 6人テーブルの{{t:position|ポジション}}

| {{t:position|ポジション}} | アクションのタイミング | {{t:open|オープン}}の広さ |
|---|---|---|
| {{t:utg|UTG}} | プリフロップで最初 | 約{{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}のハンド |
| {{t:hijack|HJ}}、{{t:cutoff|CO}} | {{t:utg|UTG}}の後。{{t:cutoff|CO}}はボタンの直前 | だんだん広く |
| {{t:button|BTN}} | フロップ以降は最後 | 約{{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}}のハンド |
| {{t:small-blind|SB}}、{{t:big-blind|BB}} | プリフロップで最後、フロップ以降は最初 | 全員が{{t:fold|フォールド}}したら{{t:small-blind|SB}}が{{t:open|オープン}}します（{{t:range|レンジ}}のレッスン）。ブラインドの守り方はモジュールM4で扱います |

**{{t:hijack|HJ}}**（ハイジャック）は{{t:utg|UTG}}の後ろ、ボタンの2つ前の席で、**{{t:cutoff|CO}}**（カットオフ）はボタンの直前の席です。これらは中間の{{t:position|ポジション}}です。後ろにいるプレイヤーが{{t:utg|UTG}}より少ないので、より広く{{t:open|オープン}}しますが、ボタンよりはまだ狭くします。

:::note {{t:open|オープン}}のサイズ
どの{{t:position|ポジション}}からも{{n:pf.open-size}}への{{t:raise|レイズ}}で{{t:open|オープン}}し、{{t:small-blind|スモールブラインド}}からは{{n:pf.open-size-sb}}にします。これは単純化です。ソルバーの解では{{t:early-position|アーリーポジション}}からの{{t:open|オープン}}は少し小さくなります（例：{{t:utg|UTG}}から{{n:pf.open-size.solver-utg}}、{{t:cutoff|CO}}から{{n:pf.open-size.solver-co}}）が、サイズを1つにした方が覚えやすいです。最初に参加するときは、ブラインド分だけを払って入ることはしません（これが{{t:limp}}で、{{t:big-blind|ビッグブラインド}}に{{t:call|コール}}するだけで参加することです）。{{t:raise}}すればその場で{{t:pot|ポット}}を獲得できることがあり、{{t:initiative|イニシアチブ}}も得られます。最後に{{t:raise|レイズ}}したプレイヤーが、通常は次の{{t:bet|ベット}}をするからです。
:::
