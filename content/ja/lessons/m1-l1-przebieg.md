---
id: m1.l1
module: m1
order: 1
title: "ハンドの流れ"
sub: "ブラインド、ストリート、選べるアクション"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "フロップで、あなたより前に誰も{{t:bet|ベット}}していません。何ができますか？"
    options:
      - { text: "{{t:check|チェック}}または{{t:bet|ベット}}", correct: true, why: "あなたより前に{{t:bet|ベット}}がなければ、選択肢は2つです。無料で次に回すか、自分で{{t:bet|ベット}}するかです。" }
      - { text: "{{t:call|コール}}", why: "誰も何も{{t:bet|ベット}}していないので、{{t:call|コール}}するものがありません。" }
      - { text: "{{t:raise|レイズ}}", why: "{{t:raise|レイズ}}できるのは他の人の{{t:bet}}だけです。ラウンドで最初の{{t:bet}}は「bet」です。" }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "フロップでは{{t:community-cards|コミュニティカード}}が何枚出ますか？"
    options:
      - { text: "3", correct: true, why: "フロップは一度に3枚です。その後、ターンとリバーで1枚ずつ加わります。" }
      - { text: "1", why: "1枚ずつ出るのはターンとリバーです。" }
      - { text: "5", why: "{{t:community-cards|コミュニティカード}}が5枚になるのは、リバーになってからです。" }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "相手が20{{t:chips|チップ}}を{{t:bet|ベット}}しました。あなたの手は弱く、これ以上プレイしたくありません。どうしますか？"
    options:
      - { text: "{{t:fold|フォールド}}する", correct: true, why: "{{t:bet}}があり、払いたくないときは{{t:fold|フォールド}}します。失うのは、すでに出した分だけです。" }
      - { text: "{{t:check|チェック}}する", why: "{{t:call|コール}}すべき{{t:bet}}があるときは、チェックできません。" }
      - { text: "{{t:call|コール}}する", why: "{{t:call|コール}}には20{{t:chips|チップ}}かかります。プレイしたくないなら、それは損です。" }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "最後の{{t:betting-round}}はどれですか？"
    options:
      - { text: "リバー", correct: true, why: "リバーは5枚目の{{t:community-cards|コミュニティカード}}です。リバーのベッティングの後に2人以上が残っていれば、カードを公開します（ショーダウン）。" }
      - { text: "ターン", why: "ターンは4枚目のカードです。その後にまだリバーがあります。" }
      - { text: "フロップ", why: "フロップは{{t:community-cards|コミュニティカード}}が出る最初のラウンドです。" }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "あなたは{{t:big-blind|ビッグブラインド}}です。全員が{{t:fold|フォールド}}し、{{t:small-blind}}は不足分を払っただけです。手は弱いです。どうしますか？"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|チェック}}する", correct: true, why: "あなたの{{t:big-blind}}は{{t:bet}}と同じ扱いで、{{t:small-blind}}はそれに合わせただけです。誰も{{t:raise|レイズ}}していないので、無料でフロップを見られます。何もかからないのなら、弱い手はフォールドする理由になりません。" }
      - { text: "{{t:fold|フォールド}}する", why: "無料で{{t:check|チェック}}できるのに{{t:fold|フォールド}}するのは、まったくの損です。" }
      - { text: "{{t:raise|レイズ}}する", why: "7-2では組み立てるものがありません。{{t:check}}すれば無料でフロップを見られます。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
どのハンドも決まった順序で進みます。まず2人のプレイヤーが強制的な賭け金、つまり**ブラインド**を出します。{{t:small-blind}}と{{t:big-blind}}です。これにより、{{t:pot|ポット}}には常に争うものがあります。

フロップ前は、{{t:big-blind}}は{{t:bet}}と同じ扱いです。プレイしたい人は、少なくともそれを{{t:call|コール}}しなければなりません。フロップ前は{{t:big-blind|ビッグブラインド}}が最後にアクションします。誰も{{t:raise|レイズ}}していなければ、{{t:check|チェック}}して追加の支払いなしでフロップを見られます。

## 4つの{{t:betting-round|ベッティングラウンド}}

1. **プリフロップ**：手元にあるのは自分の2枚のカードだけです。
2. **フロップ**：{{t:board}}に3枚の{{t:community-cards}}が出ます。
3. **ターン**：4枚目のカードです。
4. **リバー**：5枚目、最後のカードです。

リバーのベッティングの後に2人以上がまだ残っていれば、カードを公開します。これが**ショーダウン**で、最も強い役が{{t:pot|ポット}}を獲得します。それより前に1人を除く全員が{{t:fold|フォールド}}した場合は、その1人がカードを見せずに{{t:pot|ポット}}を獲得します。

## 選べるアクション

- **{{t:check|チェック}}**：何も出しません。このラウンドで、あなたより前に誰も{{t:bet|ベット}}も{{t:raise|レイズ}}もしていないときだけ選べます（フロップ前は、誰も{{t:raise|レイズ}}していなければ{{t:big-blind|ビッグブラインド}}が{{t:check|チェック}}できます）。
- **{{t:bet|ベット}}**：ラウンドで最初の{{t:bet}}です。以降のレッスンの式では、短く「bet」と書きます。
- **{{t:call|コール}}**：相手の{{t:bet|ベット}}と同じ額を出します。
- **{{t:raise|レイズ}}**：他の人の{{t:bet}}を引き上げます。
- **{{t:fold|フォールド}}**：カードを捨て、すでに出した分を失います。

:::note 覚えておきましょう
誰かが{{t:bet|ベット}}していれば、{{t:fold|フォールド}}、{{t:call|コール}}、{{t:raise|レイズ}}のどれかを選べます。誰も{{t:bet|ベット}}していなければ、{{t:check|チェック}}か{{t:bet|ベット}}を選べます。
:::

:::note オールインと{{t:side-pot}}
手元にある以上の額は{{t:bet|ベット}}できません。{{t:chips}}をすべて出すと**オールイン**です。それ以降はベッティングに参加せず、残りの{{t:community-cards}}は最後まで配られます。各相手から獲得できるのは、最大でも自分が出した額までです。ほかのプレイヤーがさらに多くの額で続ける場合、超過分は**{{t:side-pot|サイドポット}}**に入り、それを争うのはそのプレイヤーたちだけです。
:::
