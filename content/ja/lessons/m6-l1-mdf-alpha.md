---
id: m6.l1
module: m6
order: 1
title: "MDFとアルファ"
sub: "相手がベットしたとき、どれだけ守るか"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.third.pot}}で、相手が{{n:ex.third.bet}}を{{t:bet|ベット}}しました。相手の勝ち目のない{{t:bluff|ブラフ}}が自動的に利益を出さないようにするには、{{t:range|レンジ}}の少なくともどれだけの割合を守る（{{t:call|コール}}または{{t:raise|レイズ}}する）必要がありますか？パーセントで入力してください。"
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + ベット) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}。相手は{{n:ex.third.pot}}を獲得するために{{n:ex.third.bet}}をリスクにさらすので、あなたが{{n:alpha.bet-third}}より高い頻度で{{t:fold|フォールド}}すると、相手の{{t:bluff|ブラフ}}は利益を出します。"
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{t:pot|ポット}}全額の{{n:ex.bet.pot}}を{{t:bet|ベット}}しました。{{t:mdf}}はいくつですか？パーセントで入力してください。"
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}。{{t:pot|ポット}}サイズのベットでは、{{t:bluff|ブラフ}}は獲得できる額と同じだけをリスクにさらすので、あなたが半分の確率で{{t:fold|フォールド}}すれば収支はゼロになります。"
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{t:pot|ポット}}の半分の{{n:ex.bet.half}}を{{t:bet|ベット}}しました。{{t:mdf}}はいくつですか？"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}。勝ち目のない{{t:bluff|ブラフ}}が利益を出さないように、{{t:range|レンジ}}のこれだけを守ります。" }
      - { text: "{{n:alpha.bet-half}}", why: "これはアルファ、つまり相手の{{t:bluff|ブラフ}}が成功しなければならない頻度です。{{t:mdf}}は全体からの残り、つまり{{n:mdf.bet-half}}です。" }
      - { text: "{{n:eq.bet-half}}", why: "これは単一のハンドで{{t:call|コール}}するのに必要なエクイティです（M2より）。{{t:mdf}}は、{{t:range|レンジ}}全体のうちどれだけの割合を守るかを示します。" }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{t:pot|ポット}}を超える{{n:ex.bet.overbet}}を{{t:bet|ベット}}しました。{{t:mdf}}はいくつですか？"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}。ベットが大きいほど、守らなければならない{{t:range|レンジ}}の割合は小さくなります。" }
      - { text: "{{n:alpha.bet-overbet}}", why: "これはアルファ、つまり{{n:ex.bet.overbet}}の{{t:bluff|ブラフ}}が成功しなければならない頻度です。あなたは残りの{{n:mdf.bet-overbet}}を守ります。" }
      - { text: "{{n:eq.bet-overbet}}", why: "これは{{t:call|コール}}に必要なエクイティです：{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}})。数字も問いも別物です。" }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "リバー。勝ち目のないハンドで{{t:bluff|ブラフ}}します。{{t:pot|ポット}}は{{n:ex.pot}}で、あなたは{{n:ex.bet.half}}を{{t:bet|ベット}}します。{{t:bluff|ブラフ}}の収支がゼロになるには、相手はどれくらいの頻度で{{t:fold|フォールド}}する必要がありますか？パーセントで入力してください。"
    answer: alpha.bet-half
    explanation: "アルファ = ベット ÷ ({{t:pot}} + ベット) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}。あなたは{{n:ex.pot}}を獲得するために{{n:ex.bet.half}}をリスクにさらします。相手がこれより高い頻度で{{t:fold|フォールド}}すれば、{{t:bluff|ブラフ}}は利益を出します。"
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "リバー。あなたは{{t:bluff|ブラフ}}します。{{t:pot|ポット}}は{{n:ex.pot}}で、{{n:ex.bet.three-quarters}}を{{t:bet|ベット}}します。{{t:bluff|ブラフ}}が利益を出すには、相手はどれくらいの頻度で{{t:fold|フォールド}}する必要がありますか？"
    options:
      - { text: "{{n:alpha.bet-three-quarters}}より高い頻度", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}。3/4{{t:pot|ポット}}のベットのアルファはこの値です。" }
      - { text: "{{n:mdf.bet-three-quarters}}より高い頻度", why: "これは{{t:mdf}}、つまり相手が守るべき量です。アルファは、あなたの{{t:bluff|ブラフ}}が利益を出し始める前に相手が{{t:fold|フォールド}}できる割合で、{{n:alpha.bet-three-quarters}}です。" }
      - { text: "{{n:eq.bet-three-quarters}}より高い頻度", why: "これは相手が{{t:call|コール}}するのに必要なエクイティです。{{t:bluff|ブラフ}}の基準値は、分母に相手の{{t:call|コール}}を入れずに計算します：{{n:alpha.bet-three-quarters}}。" }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "{{t:pot|ポット}}は{{n:ex.pot}}です。勝ち目のない{{t:bluff|ブラフ}}で、相手の{{t:fold|フォールド}}が少なくて済むのはどちらですか？{{n:ex.bet.quarter}}のベットですか、{{n:ex.bet.pot}}のベットですか？"
    options:
      - { text: "{{n:ex.bet.quarter}}：{{n:alpha.bet-quarter}}を超える{{t:fold|フォールド}}で十分", correct: true, why: "小さな{{t:bluff|ブラフ}}はリスクが小さいです：{{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}。{{t:pot|ポット}}全額の{{t:bluff|ブラフ}}には、{{n:alpha.bet-pot}}を超える{{t:fold|フォールド}}が必要です。" }
      - { text: "{{n:ex.bet.pot}}：{{n:alpha.bet-quarter}}を超える{{t:fold|フォールド}}で十分", why: "逆です。ベットが大きいほどリスクも大きいので、相手はより高い頻度で{{t:fold|フォールド}}する必要があります。{{t:pot|ポット}}全額なら{{n:alpha.bet-pot}}超です。" }
      - { text: "どちらも同じ", why: "アルファはサイズによって変わります：{{n:ex.bet.quarter}}では{{n:alpha.bet-quarter}}、{{n:ex.bet.pot}}では{{n:alpha.bet-pot}}です。" }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "リバーで、相手が1/3{{t:pot|ポット}}を{{t:bet|ベット}}しました。{{t:mdf}}は{{n:mdf.bet-third}}で、{{t:call|コール}}に必要なエクイティは{{n:eq.bet-third}}です。この二つの数字をどう両立させますか？"
    options:
      - { text: "{{t:mdf}}は{{t:range|レンジ}}全体、エクイティは単一のハンドに関するもの", correct: true, why: "{{t:mdf}}は、相手がどんなカードでも{{t:bluff|ブラフ}}できるようにならないよう、自分の全ハンドのうちどれだけの割合を守るかを示します。必要エクイティは、相手が実際に{{t:bet|ベット}}してくるハンドに対して、特定のハンドでの{{t:call|コール}}が利益になるかどうかを示します。" }
      - { text: "どちらかの計算が間違っている", why: "どちらも正しいです：{{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}、および{{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}。それぞれ異なる問いに答えています。" }
      - { text: "エクイティが{{n:mdf.bet-third}}以上あれば{{t:call|コール}}する", why: "概念の混同です。{{t:call|コール}}には{{n:eq.bet-third}}のエクイティで十分です。{{n:mdf.bet-third}}は{{t:range|レンジ}}の割合であり、単一のハンドのエクイティではありません。" }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "フロップ。あなたは{{t:big-blind|ビッグブラインド}}でディフェンスしていて、ボタンがCベットとして1/3{{t:pot|ポット}}を{{t:bet|ベット}}しました。{{t:mdf}}は{{n:mdf.bet-third}}です。これほど多くのハンドを守る必要がありますか？"
    table: { position: BB }
    options:
      - { text: "いいえ、少し少なく守ってかまいません", correct: true, why: "{{t:mdf}}は、まったく勝ち目のない{{t:bluff|ブラフ}}を前提としています。フロップでは、ボタンの{{t:bluff|ブラフ}}にはまだエクイティ（{{t:draw|ドロー}}、高いカード）があり、{{t:out-of-position|アウトオブポジション}}のあなたは弱いハンドのエクイティをすべて実現できません。そのため{{t:mdf}}より少し少なく守ってかまいませんが、小さなCベットに対して大量に{{t:fold|フォールド}}はしません。" }
      - { text: "はい、そうしないとボタンはどんなハンドでも利益を出します", why: "リバーならそうなります。フロップでは、ボタンは勝ち目のないハンドで{{t:bluff|ブラフ}}しているわけではありません。あなたが{{t:call|コール}}しても、ボタンはまだヒットする可能性があります。{{t:mdf}}は目安であり、義務ではありません。" }
      - { text: "いいえ、まだフロップなのでもっと多く守ります", why: "逆です。この先の{{t:street|ストリート}}は{{t:in-position|インポジション}}でベットする側に有利に働くので、守る量は増やすのではなく減らします。" }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "過去の多くのハンドから、めったに{{t:bluff|ブラフ}}しないとわかっているプレイヤーが、リバーで{{t:pot|ポット}}全額を{{t:bet|ベット}}しました。あなたはキッカーの弱いキングの{{t:pair|ペア}}を持っています。どうしますか？"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "過去の多くのハンドから、このプレイヤーがめったに{{t:bluff|ブラフ}}しないことがわかっています。{{t:bluff|ブラフ}}が足りないと、あなたの{{t:pair|ペア}}は主により強いハンド（KQ、セット）に支払うことになります。このようなプレイヤーに対しては、{{t:mdf}}が示すよりも高い頻度で{{t:fold|フォールド}}します。" }
      - { text: "{{t:mdf}}では{{n:mdf.bet-pot}}守るべきなので{{t:call|コール}}", why: "{{t:mdf}}は、十分な頻度で{{t:bluff|ブラフ}}するプレイヤーからあなたを守るものです。このプレイヤーはそうしないので、{{t:mdf}}に固執すると相手にお金を渡すことになります。" }
      - { text: "オールインに{{t:raise|レイズ}}", why: "より強いハンドはコールし、より弱いハンドは{{t:fold|フォールド}}します。キッカーの弱い{{t:pair|ペア}}は{{t:raise|レイズ}}するハンドではありません。" }
---
相手が{{t:bet|ベット}}したとき、「このハンドで勝てるか」だけを考えるのではありません。この状況で自分が持ちうるすべてのハンド、つまり自分の{{t:range|レンジ}}にも目を向けます。二つの数字が、そのうちどれだけを守るべきか、そして相手の{{t:bluff|ブラフ}}がどれくらいの頻度で成功しなければならないかを教えてくれます。

## アルファ：{{t:bluff|ブラフ}}が成功しなければならない頻度

勝ち目のない{{t:bluff|ブラフ}}は、相手が{{t:fold|フォールド}}したときにしか勝てません。{{t:pot|ポット}}を獲得するために、ベット額をリスクにさらします。

```formula
アルファ = ベット ÷ (ポット + ベット)
```

例：{{t:pot|ポット}}は{{n:ex.pot}}で、あなたは{{n:ex.bet.half}}を{{t:bet|ベット}}します。アルファ = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**。相手がこれより高い頻度で{{t:fold|フォールド}}すれば、ハンドがまったくなくてもあなたの{{t:bluff|ブラフ}}は利益を出します。

## {{t:mdf}}：どれだけ守る必要があるか

{{t:mdf}}（最小ディフェンス頻度）は、アルファの裏返しです。守る（{{t:call|コール}}または{{t:raise|レイズ}}する）ハンドがこれより少ないと、相手はどんなカードでも{{t:bluff|ブラフ}}して利益を出せます。

```formula
MDF = ポット ÷ (ポット + ベット)
```

リバーの例：{{t:pot|ポット}}は{{n:ex.third.pot}}で、相手は{{n:ex.third.bet}}、つまり1/3{{t:pot|ポット}}を{{t:bet|ベット}}します。{{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**。

| 相手のベット | {{t:mdf}} | アルファ | 必要エクイティ |
|---|---|---|---|
| 1/4{{t:pot|ポット}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3{{t:pot|ポット}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2{{t:pot|ポット}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4{{t:pot|ポット}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| {{t:pot|ポット}}全額 | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf}}は必要エクイティとは違う

M2の必要エクイティは**単一のハンド**に関するもので、そのハンドで{{t:call|コール}}すると利益になるかどうかを示します。{{t:mdf}}は**{{t:range|レンジ}}全体**に関するもので、そのうちどれだけの割合を守るかを示します。リバーで1/3{{t:pot|ポット}}のベットに対しては、{{t:mdf}}は約{{n:mdf.bet-third}}のハンドを守るよう示しますが、個々の{{t:call|コール}}は、そのハンドが少なくとも{{n:eq.bet-third}}の確率で勝つなら利益になります。

## フロップの{{t:out-of-position|アウトオブポジション}}では守る量を減らす

{{t:mdf}}は、相手の{{t:bluff|ブラフ}}にまったく勝ち目がないことを前提としています。これが最も実態に近いのはリバーで、そこでは{{t:draw|ドロー}}はもう改善しません。フロップでは{{t:bluff|ブラフ}}にまだエクイティがあり、{{t:draw|ドロー}}や高いカードが改善する可能性があります。さらに、{{t:out-of-position|アウトオブポジション}}では自分の弱いハンドのエクイティをすべて実現することはできません。そのため、フロップの{{t:out-of-position|アウトオブポジション}}では{{t:mdf}}より少なく守ってかまいません（ディフェンス側に不利なフロップでは、はっきり少なく）。{{t:mdf}}は義務ではなく目安として扱います。ただし、小さなCベットに対して大量に{{t:fold|フォールド}}はしません。あるターンの例では、ソルバーは平均して{{t:mdf}}に近い量を守っていました。

:::note 相手がめったに{{t:bluff|ブラフ}}しないとき
{{t:mdf}}は、十分な頻度で{{t:bluff|ブラフ}}するプレイヤーからあなたを守るものです。観察から、特定のプレイヤーがリバーの大きなベットで{{t:bluff|ブラフ}}する頻度が低すぎるとわかっている場合、そのプレイヤーに対しては{{t:mdf}}が示すよりも高い頻度で{{t:fold|フォールド}}します。弱い{{t:pair|ペア}}での{{t:call|コール}}は、主により強いハンドに支払うことになるからです。これは{{t:exploit|エクスプロイト}}であり、誰に対しても使う戦略ではありません（詳しくはモジュール10で）。
:::
