---
id: m8.l2
module: m8
order: 2
title: "ブラフはどれだけ打つか"
sub: "ブラフの比率とベットサイズ"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.pot}}で、{{t:pot|ポット}}全額の{{n:ex.bet.pot}}をベットします。あなたの{{t:range}}は非常に強いハンドと{{t:bluff|ブラフ}}です。相手につけ込まれないためには、ベットのうちどれだけを{{t:bluff|ブラフ}}にすべきですか？パーセントで入力してください。"
    answer: bluff.share.bet-pot
    explanation: "{{t:bluff|ブラフ}}の割合 = ベット ÷ ({{t:pot}} + 2·ベット) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}。3回に1回のベットが{{t:bluff}}です。こうすると、{{t:bluff|ブラフ}}にしか勝てない相手のハンドは、{{t:call|コール}}しても{{t:fold|フォールド}}しても得をしません。"
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.pot}}で、{{t:pot|ポット}}の半分の{{n:ex.bet.half}}をベットします。均衡では、ベットのうちどれだけが{{t:bluff|ブラフ}}ですか？パーセントで入力してください。"
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}。小さいベットは相手により良い価格を与えるので、{{t:bluff|ブラフ}}は{{t:pot|ポット}}全額のとき（{{n:bluff.share.bet-pot}}）より少なくなります。"
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.pot}}で、{{n:ex.bet.three-quarters}}をベットします。均衡では、ベットのうちどれだけが{{t:bluff|ブラフ}}ですか？"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}。これは相手が{{t:call|コール}}するのに必要なエクイティと同じ数字です。" }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "これはアルファ、つまり勝ち目のない1回の{{t:bluff}}がどれだけの頻度で成功する必要があるかです。{{t:range|レンジ}}に占める{{t:bluff|ブラフ}}の割合は、分母に両方のベットを入れて計算します：{{n:bluff.share.bet-three-quarters}}。" }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "これは{{t:mdf}}、つまり相手がどれだけディフェンスすべきかです。あなたの{{t:bluff|ブラフ}}の割合は{{n:bluff.share.bet-three-quarters}}です。" }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "リバー。{{t:pot|ポット}}は{{n:ex.pot}}で、{{t:pot|ポット}}より大きい{{n:ex.bet.overbet}}をベットします。均衡では、ベットのうちどれだけが{{t:bluff|ブラフ}}ですか？"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}。{{t:overbet|オーバーベット}}、つまり{{t:pot|ポット}}全体より大きい{{t:bet|ベット}}は相手に最も悪い価格を与えるので、最も多くの{{t:bluff|ブラフ}}を含められます。ただし、それでも半分未満です。" }
      - { text: "{{n:alpha.bet-overbet}}", why: "これはこのサイズのアルファ、つまり1回の{{t:bluff}}が利益になるために相手がどれだけの頻度で{{t:fold|フォールド}}する必要があるかです。{{t:range|レンジ}}に占める{{t:bluff|ブラフ}}の割合は{{n:bluff.share.bet-overbet}}です。" }
      - { text: "{{n:bluff.share.bet-pot}}", why: "これは{{t:pot|ポット}}全額のベットでの{{t:bluff|ブラフ}}の割合です。{{n:ex.bet.overbet}}のベットでは、より多くなります：{{n:bluff.share.bet-overbet}}。" }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "リバーでどちらのベットのほうが{{t:range|レンジ}}に{{t:bluff|ブラフ}}が多く入りますか？{{t:pot|ポット}}の1/3ですか、{{t:pot|ポット}}全額ですか？"
    options:
      - { text: "{{t:pot|ポット}}全額", correct: true, why: "{{t:pot|ポット}}の1/3ではベットの約{{n:bluff.share.bet-third}}が{{t:bluff|ブラフ}}、{{t:pot|ポット}}全額では約{{n:bluff.share.bet-pot}}です。大きいベットは相手に悪い価格を与えるので、相手の{{t:call}}が利益になるには、より多くの{{t:bluff|ブラフ}}が必要です。" }
      - { text: "{{t:pot|ポット}}の1/3", why: "逆です。小さいベットは相手に良い価格を与えます。相手が{{t:call|コール}}するには、あなたのベットの中に約{{n:bluff.share.bet-third}}の{{t:bluff|ブラフ}}があれば十分です。それより{{t:bluff|ブラフ}}が多いと、相手は払うことで利益を出せます。" }
      - { text: "同じ", why: "{{t:bluff|ブラフ}}の割合はサイズによって変わります：{{t:pot|ポット}}の1/3では約{{n:bluff.share.bet-third}}、{{t:pot|ポット}}全額では約{{n:bluff.share.bet-pot}}です。" }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "リバーで{{t:pot|ポット}}全額をベットします。アルファは{{n:alpha.bet-pot}}、{{t:bluff|ブラフ}}の割合は{{n:bluff.share.bet-pot}}です。それぞれの数字は何を表していますか？"
    options:
      - { text: "アルファ：相手が{{t:fold|フォールド}}すべき頻度。割合：ベットのうち{{t:bluff|ブラフ}}が占める部分", correct: true, why: "アルファは勝ち目のない1回の{{t:bluff|ブラフ}}についての数字です。相手が{{n:alpha.bet-pot}}の割合で{{t:fold|フォールド}}すれば損益ゼロになります。{{t:bluff|ブラフ}}の割合はあなたの{{t:range|レンジ}}の構成を表します。相手の{{t:call}}が損益ゼロになるよう、3回に1回のベットが{{t:bluff}}です。" }
      - { text: "同じものの2つの呼び名で、どちらかの計算が間違っている", why: "どちらも正しく計算されています：アルファ = ベット ÷ ({{t:pot}} + ベット)、{{t:bluff|ブラフ}}の割合 = ベット ÷ ({{t:pot}} + 2·ベット)。答えている問いが違うのです。" }
      - { text: "アルファ：{{t:range|レンジ}}にある{{t:bluff|ブラフ}}の数。割合：相手が{{t:fold|フォールド}}する頻度", why: "逆です。アルファは1回の{{t:bluff|ブラフ}}に対する相手の{{t:fold|フォールド}}の基準値で、{{t:bluff|ブラフ}}の割合はあなたのベット{{t:range|レンジ}}の構成です。" }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "なぜベットに占める{{t:bluff|ブラフ}}の割合を、相手が{{t:call|コール}}するのに必要なエクイティと同じ式で計算するのですか？"
    options:
      - { text: "{{t:bluff|ブラフ}}をキャッチする相手のハンドは、あなたが{{t:bluff|ブラフ}}したときにちょうど勝つから", correct: true, why: "そのハンドはあなたのバリューハンドに負け、{{t:bluff|ブラフ}}に勝つので、そのエクイティは{{t:bluff|ブラフ}}の割合と同じです。これが必要なエクイティと等しいとき、{{t:call}}は損益ゼロになり、相手はコールでもフォールドでもあなたにつけ込めません。" }
      - { text: "偶然で、式が似て見えるだけ", why: "偶然ではありません。{{t:bluff|ブラフ}}をキャッチするハンドのエクイティがその価格と等しくなるように、{{t:bluff|ブラフ}}の割合を選んでいるのです。" }
      - { text: "相手は常に必要なエクイティをちょうど持っているから", why: "相手のエクイティは、あなたのベットの内容で決まります。損益ゼロになるように{{t:bluff|ブラフ}}の数を選ぶのはあなたです。" }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "リバーで{{t:pot|ポット}}全額をベットしますが、ベットの{{n:bluff.share.bet-pot}}ではなく半分が{{t:bluff|ブラフ}}です。注意深い相手は何ができますか？"
    options:
      - { text: "{{t:bluff|ブラフ}}をキャッチする弱いハンドでも、より頻繁に{{t:call|コール}}する", correct: true, why: "相手の{{t:call}}は半分の確率で勝ちますが、必要なのは{{n:eq.bet-pot}}だけです。より多く払うことで、あなたのバリューに負けて失う分より多くを{{t:bluff|ブラフ}}から稼げます。" }
      - { text: "より頻繁に{{t:fold|フォールド}}する", why: "フォールドすれば、あなたは{{t:bluff|ブラフ}}で{{t:pot|ポット}}を獲得します。{{t:bluff|ブラフ}}が多すぎるとき、相手は{{t:call|コール}}することで利益を得ます。" }
      - { text: "何もしない。比率は関係ない", why: "関係あります。{{t:bluff|ブラフ}}が多すぎると、{{t:bluff|ブラフ}}をキャッチするハンドでの{{t:call}}はどれも相手にとって利益になります。" }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "リバーで{{t:pot|ポット}}全額を、ほぼ{{t:value|バリュー}}だけで、{{t:bluff|ブラフ}}をほとんど入れずにベットします。注意深い相手は何ができますか？"
    options:
      - { text: "{{t:bluff|ブラフ}}にしか勝てないハンドをすべて{{t:fold|フォールド}}する", correct: true, why: "{{t:bluff|ブラフ}}が{{n:bluff.share.bet-pot}}より少ないと、{{t:bluff|ブラフ}}をキャッチするハンドでの{{t:call}}は損になります。相手はより強いハンドでしか払わなくなり、あなたの{{t:value|バリュー}}ベットが支払われる回数は減ります。" }
      - { text: "より頻繁に{{t:call|コール}}する", why: "{{t:call|コール}}すると、主にあなたのバリューに払うことになります。あなたの{{t:range|レンジ}}に{{t:bluff|ブラフ}}がないなら、相手は{{t:fold|フォールド}}するほうが得です。" }
      - { text: "どのハンドでも{{t:raise|レイズ}}する", why: "より強い役を持たずにあなたの強いハンドに{{t:raise|レイズ}}するのは確実な損です。相手はただ{{t:fold|フォールド}}を増やすだけです。" }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "リバーで、バリューと{{t:bluff|ブラフ}}からなる{{n:bluff.ex.range}}{{t:combo|コンボ}}の{{t:range|レンジ}}で{{t:pot|ポット}}全額をベットします。均衡では、そのうちいくつが{{t:bluff|ブラフ}}ですか？"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}}の{{t:bluff|ブラフ}}と、{{n:bluff.ex.value}}の{{t:value|バリュー}}{{t:combo|コンボ}}です。{{t:value|バリュー}}ハンド2つにつき{{t:bluff}}1つです。" }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "アルファ（{{n:alpha.bet-pot}}）から計算するとこうなります。アルファは1回の{{t:bluff|ブラフ}}に対する{{t:fold|フォールド}}の基準値で、{{t:range|レンジ}}に占める{{t:bluff|ブラフ}}の割合ではありません。" }
      - { text: "{{n:bluff.ex.value}}", why: "これは{{t:value|バリュー}}の{{t:combo|コンボ}}の数です。{{t:bluff|ブラフ}}はその半分の{{n:bluff.ex.bluffs}}です。" }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "リバーで、{{t:pot|ポット}}全額のベットに使う{{t:bluff|ブラフ}}がいくつか必要です。どのハンドを選びますか？"
    options:
      - { text: "最も弱いハンド。例えば外れた{{t:straight|ストレート}}の{{t:draw|ドロー}}や、勝ち目のないハイカード", correct: true, why: "ショーダウンで勝ち目のないハンドは、{{t:bluff}}が失敗しても何も失いません。{{t:check|チェック}}してもどうせ負けるからです。だからこのハンドで{{t:bluff|ブラフ}}します。" }
      - { text: "ミドルの{{t:pair|ペア}}", why: "ミドルの{{t:pair}}は{{t:check|チェック}}した後によく勝ちます。それで{{t:bluff|ブラフ}}すると、弱いハンドは{{t:fold|フォールド}}し、強いハンドは払います。ショーダウンでの勝ちを手放すことになります。" }
      - { text: "比率さえ合えばどれでもよい", why: "比率がすべてではありません。ショーダウンで勝てるハンドでの{{t:bluff|ブラフ}}は、勝ち目のないハンドでの{{t:bluff}}よりコストが高くなります。" }
---
最初のレッスンでは{{t:value|バリュー}}のためにベットしました。しかし、リバーで強いハンドだけをベットしていたら、注意深い相手はさらに強いハンド以外をすべてフォールドし、あなたのベットはほとんど支払われなくなります。{{t:bluff|ブラフ}}があるからこそ、相手にとって支払う価値が生まれます。

## {{t:polarized|ポラライズド}}{{t:range|レンジ}}

リバーで{{t:in-position}}のとき、あなたはしばしば**{{t:polarized|ポラライズド}}{{t:range|レンジ}}**でベットします（M7と同様）。{{t:value|バリュー}}のための非常に強いハンドと{{t:bluff|ブラフ}}で構成され、中程度のハンドは含みません（中程度のハンドは、最初のレッスンと同様に{{t:check|チェック}}します）。リバーでは、ショーダウンで勝ち目のないハンドが{{t:bluff|ブラフ}}になります。このとき相手には、あなたのバリューには負けるが{{t:bluff|ブラフ}}には勝つハンドが多くあります。これが**ブラフキャッチャー**（{{t:bluff|ブラフ}}をキャッチするハンド）です。

## {{t:bluff|ブラフ}}の数

{{t:bluff|ブラフ}}の数は、相手のブラフキャッチャーが{{t:call|コール}}しても{{t:fold|フォールド}}しても損益ゼロになるように選びます：

```formula
ブラフの割合 = ベット ÷ (ポット + 2·ベット)
```

これはM2で学んだ、{{t:call|コール}}に必要なエクイティと同じ式です。偶然ではありません。ブラフキャッチャーはあなたが{{t:bluff|ブラフ}}したときにちょうど勝つので、そのエクイティはあなたの{{t:bluff|ブラフ}}の割合と同じです。{{t:pot|ポット}}全額のベットでは：{{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**、つまり3回に1回のベットが{{t:bluff}}です。

## ベットが大きいほど{{t:bluff|ブラフ}}は多い

| ベット | {{t:bluff|ブラフ}}の割合 | アルファ（M6より） |
|---|---|---|
| {{t:pot|ポット}}の1/3 | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| {{t:pot|ポット}}の1/2 | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| {{t:pot|ポット}}の3/4 | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| {{t:pot}}全額 | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| {{t:pot|ポット}}の1.5倍 | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

大きいベットは相手に悪い価格を与えるので、より多くの{{t:bluff|ブラフ}}を含められます。小さいベットには少ししか入れられません。

## {{t:bluff|ブラフ}}の割合はアルファではない

M6のアルファ = ベット ÷ ({{t:pot}} + ベット) は、勝ち目のない**1回の**{{t:bluff}}が損益ゼロになるために、相手がどれだけの頻度で{{t:fold|フォールド}}しなければならないかを表します。{{t:bluff|ブラフ}}の割合 = ベット ÷ ({{t:pot}} + 2·ベット) は、**ベット{{t:range|レンジ}}全体**のうちどれだけが{{t:bluff|ブラフ}}かを表します。{{t:pot|ポット}}全額のベットでは、{{t:bluff}}には{{n:alpha.bet-pot}}を超える{{t:fold|フォールド}}が必要ですが、{{t:range|レンジ}}に含まれる{{t:bluff|ブラフ}}は{{n:bluff.share.bet-pot}}です。2つ目の式の分母にベットが1つ多いのは、相手の{{t:call|コール}}の価格を計算しているからです。

## 何で{{t:bluff|ブラフ}}するか

{{t:bluff|ブラフ}}には**最も弱いハンド**を選びます。例えば外れた{{t:straight|ストレート}}の{{t:draw|ドロー}}や、勝ち目のないハイカードです（外れた{{t:flush|フラッシュ}}については{{t:blocker|ブロッカー}}のレッスンで扱います）。これらは{{t:check|チェック}}してもどうせ負けるので、{{t:bluff}}が失敗しても何も失いません。ショーダウンバリューのあるハンドは{{t:check|チェック}}します。

:::note これは均衡点であり、すべての相手に使えるレシピではありません
これらの比率は、上手な相手からあなたを守ります。特定のプレイヤーに対しては、この比率から外れることもできます。これはマイクロステークスの{{t:exploit|エクスプロイト}}に関するモジュール（M10）で扱います。{{t:bluff|ブラフ}}の割合の式は、単純化したモデルでの計算です：{{t:bluff|ブラフ}}をキャッチするハンドに対する{{t:polarized|ポラライズド}}{{t:range}}（ゲーム理論のトイモデル）。最も弱いハンドで{{t:bluff|ブラフ}}するという推奨は、トレーニング教材とソルバー分析に基づいています。
:::
