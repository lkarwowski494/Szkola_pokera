---
id: m2.l2
module: m2
order: 2
title: "ポットオッズ"
sub: "コールが得になるとき"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "{{t:pot|ポット}}は{{n:ex.third.pot}}です。相手が{{n:ex.third.bet}}を{{t:bet|ベット}}します。{{t:call|コール}}するには、どれだけのエクイティが必要ですか？"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "{{t:bet|ベット}}後の{{t:pot|ポット}}は{{n:ex.third.pot-after-bet}}で、あなたが{{n:ex.third.bet}}を支払うので、合計は{{n:ex.third.total}}です。{{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}です。" }
      - { text: "{{n:eq.bet-pot}}", why: "これは{{t:pot|ポット}}サイズの{{t:bet|ベット}}に対して必要な値です。ここでは{{t:bet}}は{{t:pot|ポット}}の1/3です。" }
      - { text: "{{n:eq.bet-third.no-call}}", why: "これは{{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}です。分母には自分の{{t:call}}も加えてください。" }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "ターンです。あなたは{{t:flush-draw}}を持っています。{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{n:ex.bet.pot}}を{{t:bet|ベット}}します。"
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "必要なのは{{n:eq.bet-pot}}です。{{t:flush|フラッシュ}}のアウツは{{n:outs.flush}}枚で、約{{n:odds.flush.turn-river}}です。エースの{{t:pair|ペア}}になる{{n:pair.outs.per-rank}}枚のエースを加えても（合計{{n:outs.flush-ace}}アウツ、約{{n:odds.flush-ace.turn-river}}）、まだ{{n:eq.bet-pot}}よりはっきり少ないです。このような{{t:call}}は長期的に損をします。" }
      - { text: "{{t:call|コール}}", why: "最強の{{t:flush|フラッシュ}}への{{t:draw}}があり、エースも助けになりうるので魅力的ですが、約{{n:odds.flush-ace.turn-river}}でも{{n:eq.bet-pot}}より少ないです。" }
      - { text: "オールインに{{t:raise|レイズ}}", why: "上級者なら有効なプレイになることもありますが、十分な理由がなければ、まだ何もできていないハンドでスタック全体（目の前にある{{t:chips|チップ}}すべて）を危険にさらすことになります。" }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "同じハンドですが、相手は{{n:ex.pot}}の{{t:pot|ポット}}に{{n:ex.bet.quarter}}しか{{t:bet|ベット}}しません。"
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "必要なのは{{n:eq.bet-quarter}}で、あなたには約{{n:odds.flush.turn-river}}あり、エースを含めればさらに多くなります。小さな{{t:bet}}は良い価格を与えてくれます。" }
      - { text: "{{t:fold|フォールド}}", why: "{{t:fold|フォールド}}するには安すぎます。{{n:odds.flush.turn-river}}は必要な{{n:eq.bet-quarter}}より多く、エースを含めればさらに多くなります。" }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "相手が{{t:pot|ポット}}の半分を{{t:bet|ベット}}します。どれだけのエクイティが必要ですか？"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|ポット}}は{{n:ex.pot}}、{{t:bet}}は{{n:ex.bet.half}}です。合計{{n:ex.half.total}}に対して{{n:ex.bet.half}}を支払うので、{{n:eq.bet-half}}です。" }
      - { text: "{{n:ex.wrong.half}}", why: "よくある間違いです。{{n:ex.wrong.half}}は{{t:bet}}を{{t:bet|ベット}}前の{{t:pot|ポット}}で割った値です（{{n:ex.bet.half}} ÷ {{n:ex.pot}}）。支払う額は、あなたの{{t:call|コール}}後の{{t:pot|ポット}}全体で割ります：{{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}。" }
      - { text: "{{n:eq.bet-pot}}", why: "これは{{t:pot|ポット}}全体の大きさの{{t:bet|ベット}}に対して必要な値です。" }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "相手が{{t:pot|ポット}}全体を{{t:bet|ベット}}します。{{t:call|コール}}するには何%のエクイティが必要ですか？数字を入力してください。"
    answer: eq.bet-pot
    explanation: "{{t:pot|ポット}}は{{n:ex.pot}}、{{t:bet}}は{{n:ex.bet.pot}}です。あなたは{{n:ex.bet.pot}}を支払い、あなたの{{t:call|コール}}後の{{t:pot|ポット}}は{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}になります。支払う額を{{t:pot|ポット}}全体で割ると{{n:eq.bet-pot}}、つまり3分の1です。"
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
相手が{{t:bet|ベット}}し、あなたが{{t:draw}}を持っているとき、問題は「その価格は割に合うか」です。2つの数字を比べます。**どれだけ勝つ必要があるか**と、**実際にどれだけ勝てるか**です。

:::note エクイティとヒットする確率
**エクイティ**は{{t:pot|ポット}}のうちあなたの取り分です。これ以上{{t:bet|ベット}}がなくハンドがショーダウンまで進んだときに、どれくらいの頻度で勝てるかを表します。アウツのレッスンで学んだ**ヒットする確率**は、アウツが出る確率にすぎません。ヒットしたときだけ勝てる純粋な{{t:draw|ドロー}}なら、この価格で実際に見られるカードでヒットする確率が、エクイティの近似になります。フロップでの{{t:bet|ベット}}に対しては、リバーまでではなく、カード1枚でヒットする確率です。
:::

## どれだけ勝つ必要があるか

```formula
必要なエクイティ = コール額 ÷ コール後のポット
コール後のポット = ベット前のポット + ベット + コール額
```

例：{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{n:ex.bet.half}}を{{t:bet|ベット}}します。{{t:pot|ポット}}は今{{n:ex.half.pot-after-bet}}になり、あなたが{{n:ex.bet.half}}を支払うので、あなたの{{t:call|コール}}後の{{t:pot}}は{{n:ex.half.total}}です。必要なのは{{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**です。

## 早見表

| 相手の{{t:bet|ベット}} | 必要なエクイティ |
|---|---|
| {{t:pot}}全体 | {{n:eq.bet-pot}} |
| {{t:pot|ポット}}の半分 | {{n:eq.bet-half}} |
| {{t:pot|ポット}}の4分の1 | {{n:eq.bet-quarter}} |

:::note 判断
あなたのエクイティが必要な値より大きければ{{t:call|コール}}します。小さければ{{t:fold|フォールド}}します。これは{{t:expected-value|期待値}}から導かれます。{{t:call|コール}}の{{t:expected-value|EV}} = エクイティ × あなたの{{t:call|コール}}後の{{t:pot}} − {{t:call}}で、これはエクイティが必要な値より小さいとき、かつそのときに限りマイナスになります。この1つの計算で、初心者の高くつくミスの大半をなくせます。今のところは{{t:implied-odds}}、つまり役が完成した場合に、同じハンドの中でその後に勝てると見込める{{t:chips|チップ}}は考えません。これは後のモジュールで改めて扱います。
:::
