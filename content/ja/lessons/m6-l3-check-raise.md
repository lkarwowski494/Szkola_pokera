---
id: m6.l3
module: m6
order: 3
title: "チェックレイズ"
sub: "Cベットにレイズするタイミングとサイズ"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "{{t:big-blind|ビッグブラインド}}で、ボタンの{{t:open|オープン}}に対してディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンが{{t:bet|ベット}}しました。{{t:pot|ポット}}の1/3のCベットです。どうしますか？"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "チェックレイズ", correct: true, why: "低く{{t:connected|コネクトした}}フロップでの{{t:two-pair|ツーペア}}は、{{t:value|バリュー}}を狙うハンドです。こうしたフロップでは、{{t:big-blind|ビッグブラインド}}のほうがボタンより最強クラスの役を多く持っています。{{t:raise|レイズ}}で{{t:pot|ポット}}を大きくし、{{t:pair|ペア}}や{{t:draw|ドロー}}に支払わせます。" }
      - { text: "{{t:call|コール}}", correct: true, why: "これも良い選択です。非常に{{t:connected|コネクトした}}フロップでは、ソルバーは{{t:two-pair|ツーペア}}の一部を{{t:call|コール}}だけにとどめます。チェックレイズのほうが、{{t:pot|ポット}}を大きくしてハンドを守れる場面が多くなります。" }
      - { text: "{{t:fold|フォールド}}", why: "{{t:two-pair|ツーペア}}は、このフロップで最も強いハンドのひとつです。{{t:fold|フォールド}}は大きなミスです。" }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|ポット}}は{{n:ex.third.pot}}で、ボタンがCベットで{{n:ex.third.bet}}を{{t:bet|ベット}}しました。あなたはセットを持っていて、チェックレイズしたいと考えています。いくらまで{{t:raise|レイズ}}しますか？"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "{{n:xr.example}}まで", correct: true, why: "Cベットの{{n:xr.mult.example}}です。ボタンは追加で{{n:xr.example.extra}}を払う必要があり、約{{n:eq.vs-xr.example}}のエクイティが必要です。格下の{{t:pair|ペア}}や弱い{{t:draw|ドロー}}（ガットショット）には見合わない価格で、{{t:flush|フラッシュ}}狙いや{{t:oesd|OESD}}は大きくなった{{t:pot|ポット}}に支払うことになります。" }
      - { text: "{{n:xr.too-small}}まで", sizeError: true, why: "アクションは正しいですが、サイズが小さすぎます。ボタンは追加で{{n:xr.too-small.extra}}を払うだけで、必要なエクイティは約{{n:eq.vs-xr.too-small}}です。{{t:flush-draw|フラッシュドロー}}や{{t:straight|ストレート}}ドローは、どれもほぼタダ同然で支払ってきます。" }
      - { text: "{{t:call|コール}}", why: "ハートが2枚あり、{{t:straight|ストレート}}につながるカードが並ぶフロップでは、バリューとプロテクションを失います。ターンの多くのカードでアクションが止まったり、あなたのハンドが逆転されたりします。セットはすぐに{{t:pot|ポット}}を大きくしたいハンドです。" }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|ポット}}は{{n:ex.third.pot}}で、ボタンがCベットで{{n:ex.third.bet}}を{{t:bet|ベット}}しました。Cベットの{{n:xr.mult.example}}にチェックレイズします。いくらまで{{t:raise|レイズ}}しますか？{{t:chips|チップ}}の数を入力してください。"
    table: { position: BB }
    answer: xr.example
    explanation: "Cベットは{{n:ex.third.bet}}なので、Cベットの{{n:xr.mult.example}}は{{n:xr.example}}です。チェックレイズのサイズは、{{t:pot|ポット}}ではなくCベットを基準に計算します。"
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|ポット}}は{{n:ex.third.pot}}で、ボタンが{{n:ex.third.bet}}を{{t:bet|ベット}}し、あなたは{{n:xr.example}}まで{{t:raise|レイズ}}しました。ボタンが{{t:call|コール}}するには何％のエクイティが必要ですか？数字を入力してください。"
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "ボタンの追加の支払いは{{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}です。このとき{{t:pot|ポット}}は{{n:xr.example.pot-after}}で、ボタンが{{t:call|コール}}するとさらに{{n:xr.example.extra}}増えます。{{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}です。"
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "{{t:pot|ポット}}は{{n:ex.third.pot}}で、ボタンが{{n:ex.third.bet}}を{{t:bet|ベット}}し、あなたは{{n:xr.too-small}}までしか{{t:raise|レイズ}}しませんでした。ボタンが{{t:call|コール}}するには、どれだけのエクイティが必要ですか？"
    table: { position: BB }
    options:
      - { text: "約{{n:eq.vs-xr.too-small}}", correct: true, why: "{{n:xr.too-small.pot-after}}の{{t:pot|ポット}}に、追加で{{n:xr.too-small.extra}}を払います。{{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}です。これほど安ければほぼどんなハンドでも支払ってくるので、{{t:raise|レイズ}}はCベットの数倍の大きさにすべきです。" }
      - { text: "約{{n:eq.vs-xr.example}}", why: "それは{{n:xr.example}}まで{{t:raise|レイズ}}された場合に必要な値です。{{n:xr.too-small}}なら、追加の支払いは{{n:xr.too-small.extra}}だけです。" }
      - { text: "約{{n:eq.bet-third}}", why: "それは、あなたがCベットを{{t:call|コール}}するのに必要だった値です。チェックレイズの後はボタン側の価格を計算します。ボタンは{{n:xr.too-small.pot-after}}の{{t:pot|ポット}}に、追加で{{n:xr.too-small.extra}}を払います。" }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "{{t:big-blind|ビッグブラインド}}で、ボタンの{{t:open|オープン}}に対してディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンが{{t:bet|ベット}}しました。{{t:pot|ポット}}の1/3のCベットです。どうしますか？"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "チェックレイズ", correct: true, why: "最強の{{t:flush|フラッシュ}}への{{t:draw|ドロー}}は、良い{{t:semi-bluff|セミブラフ}}です。ボタンが{{t:fold|フォールド}}すれば勝ち、支払ってきても{{n:outs.flush}}アウツが残ります（ターンで約{{n:odds.flush.flop-turn}}）。" }
      - { text: "{{t:call|コール}}", correct: true, why: "これも良い選択です。ターンで{{t:flush|フラッシュ}}が完成する確率は約{{n:odds.flush.flop-turn}}で、価格の{{n:eq.bet-third}}とほぼ同じです。さらに最強の{{t:flush|フラッシュ}}が完成すれば、より多く勝てます（インプライドオッズ）。強い{{t:draw|ドロー}}は両方のプレイで使い、チェックレイズが強いハンドだけを意味しないようにします。" }
      - { text: "{{t:fold|フォールド}}", why: "大きなミスです。{{n:outs.flush}}アウツあれば、ターンで最強の{{t:flush|フラッシュ}}が完成する確率は約{{n:odds.flush.flop-turn}}で、価格の{{n:eq.bet-third}}とほぼ同じです。完成すればより多く勝てます（インプライドオッズ）。それに、チェックレイズという選択肢もあります。" }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "{{t:big-blind|ビッグブラインド}}で、ボタンの{{t:open|オープン}}に対してディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンが{{t:bet|ベット}}しました。{{t:pot|ポット}}の1/3のCベットです。どうしますか？"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "チェックレイズ", correct: true, why: "{{t:oesd|OESD}}（{{n:outs.oesd}}アウツ）で、相手は小さいCベットなので、安く{{t:raise|レイズ}}するチャンスです。{{t:raise|レイズ}}すればその場で勝つこともでき、{{t:call|コール}}されてもまだ完成の可能性があります。" }
      - { text: "{{t:call|コール}}", correct: true, why: "これも良い選択です。ターンで{{t:straight|ストレート}}が完成する確率は約{{n:odds.oesd.flop-turn}}で、価格の{{n:eq.bet-third}}より少し低いですが、完成すればより多く勝てます（インプライドオッズ）。さらに、ターンで誰も{{t:bet|ベット}}しなければリバーも無料で見られます。強い{{t:draw|ドロー}}の一部は{{t:call|コール}}に回し、あなたの{{t:call|コール}}が弱いハンドばかりにならないようにします。" }
      - { text: "{{t:fold|フォールド}}", why: "タイトすぎます。{{n:outs.oesd}}アウツあれば、ターンで{{t:straight|ストレート}}が完成する確率は約{{n:odds.oesd.flop-turn}}で、価格の{{n:eq.bet-third}}よりわずかに低いだけです。残りはインプライドオッズと、無料でリバーを見られる可能性で補えます。それに、チェックレイズという選択肢もあります。" }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "{{t:big-blind|ビッグブラインド}}で、ボタンの{{t:open|オープン}}に対してディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンが{{t:bet|ベット}}しました。{{t:pot|ポット}}の1/3のCベットです。どうしますか？"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "キッカーの弱い{{t:top-pair|トップペア}}は{{t:call|コール}}するハンドです。ボタンの{{t:bluff|ブラフ}}に勝っていて、{{t:call|コール}}すればそのブラフをゲームに残せます。" }
      - { text: "チェックレイズ", why: "通常は{{t:call|コール}}します。{{t:raise|レイズ}}すると、支払ってくるのは主に格上のハンドと{{t:draw|ドロー}}です。このようなハンドでのチェックレイズは、小さいCベットに対するソルバーのまれなプレイです。" }
      - { text: "{{t:fold|フォールド}}", why: "小さいCベットに対して、{{t:top-pair|トップペア}}は{{t:fold|フォールド}}するには明らかに強すぎます。" }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "{{t:big-blind|ビッグブラインド}}で、ボタンの{{t:open|オープン}}に対してディフェンスしています。フロップで{{t:check|チェック}}すると、ボタンが{{t:bet|ベット}}しました。{{t:pot|ポット}}の1/3のCベットです。どうしますか？"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "{{t:pair|ペア}}も{{t:flush-draw|フラッシュドロー}}もなく、あるのは弱いバックドアの{{t:straight-draw|ストレートドロー}}（特定の2枚が必要）だけで、ボードより高いカードもありません。エースのあるフロップでは、こうしたハンドをより多く{{t:fold|フォールド}}します。" }
      - { text: "{{t:bluff|ブラフ}}としてチェックレイズ", why: "チェックレイズの{{t:bluff|ブラフ}}は主に、完成しても勝てる{{t:draw|ドロー}}（{{t:flush|フラッシュ}}、{{t:oesd|OESD}}）で行います。このハンドには弱いバックドアの{{t:draw|ドロー}}しかなく、ボタンはここで{{t:fold|フォールド}}しないエースやキングを多く持っています。" }
      - { text: "{{t:call|コール}}", why: "価格は良いですが、このハンドはほとんど何も完成しません。6や5の{{t:pair|ペア}}ができても、ボタンが支払い続けるハンドの大半に負けます。" }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "ボタンのどのCベットに対して、チェックレイズの頻度が高くなりますか？"
    table: { position: BB }
    options:
      - { text: "{{t:pot|ポット}}の1/4", correct: true, why: "小さいCベットは安く{{t:raise|レイズ}}するチャンスで、ボタンは弱いハンドを多く含む広い{{t:range|レンジ}}でそれを{{t:bet|ベット}}します。大きいCベットに対しては、{{t:raise|レイズ}}の頻度を下げ、範囲も狭くします。主にセットと{{t:two-pair|ツーペア}}で、{{t:bluff|ブラフ}}は少なめです。" }
      - { text: "{{t:pot|ポット}}全額", why: "大きいCベットに対する{{t:raise|レイズ}}はコストが高く、ボタンの{{t:range|レンジ}}も強くなります。{{t:call|コール}}か{{t:fold|フォールド}}が多くなります。" }
      - { text: "同じ頻度", why: "小さいCベットには、より頻繁に、より広く{{t:raise|レイズ}}します。大きいCベットには頻度を下げ、主に最強クラスのハンドで行います。" }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "フロップでほとんど{{t:fold|フォールド}}しないボタンと対戦しています。ボタンが{{t:bet|ベット}}しました。{{t:pot|ポット}}の1/3のCベットです。どうしますか？"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "ハイカード付きのガットショットは、価格が{{n:eq.bet-third}}なら良い{{t:call|コール}}です。チェックレイズの{{t:bluff|ブラフ}}は相手の{{t:fold|フォールド}}で利益を出しますが、この相手はほとんど{{t:fold|フォールド}}しないので、{{t:raise|レイズ}}は主な利点を失います。" }
      - { text: "チェックレイズ", why: "チェックレイズの{{t:bluff|ブラフ}}は主に強い{{t:draw|ドロー}}で行いますが、ガットショットはそれに含まれません。さらに{{t:bluff|ブラフ}}は{{t:fold|フォールド}}で利益を出すものですが、この相手はほとんど{{t:fold|フォールド}}しません。この相手には主に{{t:value|バリュー}}で{{t:raise|レイズ}}します。" }
      - { text: "{{t:fold|フォールド}}", why: "タイトすぎます。これほど良い価格なら、ハイカード付きの{{t:draw|ドロー}}は、相手が誰であってもディフェンスする価値があります。" }
---
チェックレイズとは、{{t:check|チェック}}した後に、相手の{{t:bet|ベット}}に対して{{t:raise|レイズ}}することです。{{t:big-blind|ビッグブラインド}}からは、Cベットに対する重要な武器です（とはいえ、たいていは{{t:call|コール}}か{{t:fold|フォールド}}かを選ぶことになります）。これがないと、ボタンはほぼどんなハンドでも安くCベットできてしまいます。

## なぜ{{t:raise|レイズ}}するのか

チェックレイズする理由は2つあります。

- **{{t:value|バリュー}}のため**：非常に強いハンド（{{t:two-pair|ツーペア}}、セット）を持っていて、{{t:pot|ポット}}を大きくしたいとき。
- **{{t:semi-bluff|セミブラフ}}として**：{{t:draw|ドロー}}（{{t:flush|フラッシュ}}、{{t:oesd|OESD}}）があり、2通りで勝てるとき。ボタンが{{t:fold|フォールド}}したときと、あなたのハンドが完成したときです。

キッカーの弱い{{t:top-pair|トップペア}}のような中程度のハンドは、通常{{t:call|コール}}します。{{t:raise|レイズ}}すると、ボタンの格下のハンドは{{t:fold|フォールド}}しやすくなり、支払ってくるのは格上のハンドです。これは単純化した考え方です。小さいCベットに対しては、ソルバーは{{t:top-pair|トップペア}}の一部や弱い{{t:pair|ペア}}もプロテクションのために{{t:raise|レイズ}}します。逆に、非常に{{t:connected|コネクトした}}フロップでは、ソルバーは{{t:two-pair|ツーペア}}をただ{{t:call|コール}}することがよくあります。

## 頻度を上げる場面

- **小さいCベットに対して。** {{t:raise|レイズ}}が安く済み、ボタンは広い{{t:range|レンジ}}で小さいCベットを{{t:bet|ベット}}します。大きいCベットに対しては、{{t:raise|レイズ}}の頻度を下げ、範囲も狭くします。主にセットと{{t:two-pair|ツーペア}}で、{{t:bluff|ブラフ}}は少なめです。
- **低く{{t:connected|コネクトした}}フロップで**（例：[[7h 6d 5s]]）。{{t:big-blind|ビッグブラインド}}は低いハンドを多くディフェンスするので、ここではたいていボタンより{{t:two-pair|ツーペア}}や{{t:straight|ストレート}}を多く持っています。つまり{{t:nuts-advantage|ナッツアドバンテージ}}があります。
- **ボタンに有利な高いフロップでは頻度を下げます。** 例：K-J-TやA-A-K。そこでは、最強クラスのハンドをボタンのほうが多く持っています。

## サイズ

チェックレイズのサイズは、Cベットを基準に計算します。例：{{t:pot|ポット}}が{{n:ex.third.pot}}、Cベットが{{n:ex.third.bet}}の場合。Cベットの{{n:xr.mult.example}}へのチェックレイズは、{{n:xr.example}}までの{{t:raise|レイズ}}です。ボタンは追加で{{n:xr.example.extra}}を払い、約**{{n:eq.vs-xr.example}}**のエクイティが必要です。{{n:xr.too-small}}までしか{{t:raise|レイズ}}しないと、ボタンの価格は約**{{n:eq.vs-xr.too-small}}**になり、何らかの{{t:draw|ドロー}}があるハンドならほぼすべて支払ってきます。そのため、ミニマムではなく、Cベットの約{{n:xr.mult.low}}～{{n:xr.mult.example}}まで{{t:raise|レイズ}}します。Cベットが小さいほど、倍率を大きくします。

:::note {{t:fold|フォールド}}しない相手
チェックレイズの{{t:bluff|ブラフ}}は、相手の{{t:fold|フォールド}}で利益を出します（最初のレッスンのアルファを思い出してください）。フロップでほとんど{{t:fold|フォールド}}しない相手には、主に{{t:value|バリュー}}で{{t:raise|レイズ}}し、{{t:bluff|ブラフ}}は最も強い{{t:draw|ドロー}}だけに残しておきます。
:::
