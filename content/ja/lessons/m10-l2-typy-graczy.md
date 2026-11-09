---
id: m10.l2
module: m10
order: 2
title: "プレイヤータイプ"
sub: "ニット、レギュラー、パッシブなプレイヤー、マニアック"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "{{n:hud.ex.reg.hands}}ハンド後、相手の{{t:vpip}}は{{n:hud.ex.passive.vpip}}、{{t:pfr}}は{{n:hud.ex.passive.pfr}}です。これはフロップ前のプレイについて何を示していますか？"
    options:
      - { text: "パッシブです：ほとんどのハンドで{{t:call|コール}}するかリンプするだけです", correct: true, why: "{{t:vpip}} − {{t:pfr}} の差は{{n:hud.ex.passive.gap}}ポイントで、しきい値の{{n:hud.gap.passive}}を超えています。かなり多くのハンドをプレイしますが、その大半を{{t:raise|レイズ}}せずに{{t:pot|ポット}}に入れています。" }
      - { text: "多くのハンドをプレイするのでアグレッシブです", why: "ハンドの数（{{t:vpip}}）が示すのは、どれだけルースにプレイするかであって、どれだけアグレッシブかではありません。アグレッションを示すのは{{t:pfr}}と、両者の差です。" }
      - { text: "{{t:nit}}です", why: "{{t:nit}}がプレイするのは約{{n:hud.vpip.nit-max}}のハンドまでです。このプレイヤーは明らかにそれより多くプレイしています。" }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "オンラインのマイクロステークス（NL25）の母集団データによると、{{t:recreational|レクリエーショナルプレイヤー}}は{{n:mda.rec.wtsd}}のケースでショーダウンに到達し、ショーダウンの{{n:mda.rec.wsd}}に勝っています。{{t:regular|レギュラー}}はそれぞれ{{n:mda.reg.wtsd}}と{{n:mda.reg.wsd}}です。ここから何が言えますか？"
    options:
      - { text: "{{t:recreational|レクリエーショナルプレイヤー}}は最後まで払うことが多く、負けることも多い：より弱いハンドで{{t:call|コール}}しています", correct: true, why: "ショーダウンに到達する頻度が高く、勝つ頻度が低いので、より弱いハンドでそこまで行っています。彼らに対しては、より多くのハンドで{{t:value|バリュー}}ベットし、{{t:bluff|ブラフ}}を減らします。" }
      - { text: "{{t:recreational|レクリエーショナルプレイヤー}}はより頻繁に{{t:bluff|ブラフ}}します", why: "これらの数字が示すのは、どれだけ頻繁に、どんなハンドでショーダウンに到達するかであって、{{t:bluff|ブラフ}}についてではありません。ショーダウンに勝つ回数が少ないのは、より弱いハンドで{{t:call|コール}}しているからです。" }
      - { text: "何も言えない：数ポイントの差はノイズです", why: "これはその{{t:stakes|ステークス}}の母集団全体の{{n:mda.period.months}}か月分のデータで、1人のプレイヤーの数十ハンドではありません。差はNL25、NL50、NL100で一貫しています。" }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "リバー。あなたはフロップとターンでベットし、相手は{{t:call|コール}}しました。相手はパッシブな{{t:recreational|レクリエーショナルプレイヤー}}（{{t:vpip}} {{n:mda.rec.vpip}}、{{t:pfr}} {{n:mda.rec.pfr}}、{{n:hud.ex.reg.hands}}ハンド）です。相手は{{t:check|チェック}}しました。セカンドキッカーの{{t:top-pair|トップペア}}でどうしますか？"
    options:
      - { text: "{{t:value|バリュー}}でベットする", correct: true, why: "このタイプのプレイヤーは、より弱いキング、8、ポケット{{t:pair|ペア}}で最後まで{{t:call|コール}}します。彼の{{t:call|コール}}の半分以上があなたより弱いハンドなので、ベットは利益になります（モジュール8のしきい値）。" }
      - { text: "より強いハンドにぶつからないよう{{t:check|チェック}}する", why: "より弱いハンドで{{t:call|コール}}するプレイヤーに対して、{{t:check}}はバリューを手放します。強いハンドが払うこともありますが、弱いハンドの{{t:call|コール}}のほうが多いです。" }
      - { text: "{{t:bluff}}として{{t:pot|ポット}}全額をベットする", why: "{{t:top-pair|トップペア}}なら、これは{{t:bluff}}ではありません：{{t:call|コール}}してくる多くのハンドに勝っています。ベットは{{t:value|バリュー}}のためです。" }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "リバー、{{t:straight-draw}}が外れました。相手はパッシブな{{t:recreational|レクリエーショナルプレイヤー}}（{{t:wtsd}} {{n:mda.rec.wtsd}}）で、フロップとターンで{{t:call|コール}}しました。相手は{{t:check|チェック}}しました。どうしますか？"
    options:
      - { text: "{{t:check|チェック}}して{{t:pot|ポット}}をあきらめる", correct: true, why: "{{t:bluff}}が利益になるのは、相手があなたのベットの{{t:alpha}}より高い頻度で{{t:fold|フォールド}}するときだけです。2つの{{t:street|ストリート}}を{{t:call|コール}}し、ショーダウンに行くことが多いプレイヤーは、リバーでめったに{{t:fold|フォールド}}しません。" }
      - { text: "ショーダウンでのバリューがないので大きくベットする", why: "ベースライン（モジュール8）ではこうした{{t:bluff}}が有効なこともありますが、このプレイヤーに対しては{{t:fold|フォールド}}が足りません：{{t:bluff|ブラフ}}は損をします。" }
      - { text: "{{t:bluff}}を安くするために小さくベットする", why: "小さいベットに必要な{{t:fold|フォールド}}は少なくなりますが、2つの{{t:street|ストリート}}を{{t:call|コール}}したハンドは、たいてい小さいベットにも{{t:call|コール}}します。{{t:pot|ポット}}をあきらめるほうが良いです。" }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "{{t:cutoff|CO}}から{{t:open|オープン}}します。ボタンには{{t:nit}}がいます：{{t:vpip}} {{n:hud.ex.nit.vpip}}、{{t:pfr}} {{n:hud.ex.nit.pfr}}、{{n:hud.ex.reg.hands}}ハンド。彼があなたに3ベットしました。AJoでどうしますか？"
    options:
      - { text: "{{t:fold|フォールド}}", correct: true, why: "これほど少ないハンドしかプレイしないプレイヤーが3ベットするのは、主に最も強いハンド、つまりAJをドミネートするAQ、AK、高い{{t:pair|ペア}}です。彼に対しては、モジュール4のベースラインより多く{{t:fold|フォールド}}します。" }
      - { text: "AJは強いハンドなので{{t:call|コール}}", why: "AJは広い{{t:range|レンジ}}に対しては強いです。{{t:vpip}} {{n:hud.ex.nit.vpip}}のプレイヤーの3ベットに対しては、しばしばドミネートされており、{{t:position|ポジション}}もありません。" }
      - { text: "4ベット", why: "{{t:nit|ニット}}に対するAJの4ベットは、AJをドミネートし、めったに{{t:fold|フォールド}}しない{{t:range|レンジ}}と戦うことになります。{{t:value}}でも、良い{{t:bluff}}でもありません。" }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "あなたはボタンにいて、全員が{{t:fold|フォールド}}しました。{{t:big-blind|ビッグブラインド}}には{{t:nit}}がいます（{{n:hud.ex.reg.hands}}ハンド後に{{t:vpip}} {{n:hud.ex.nit.vpip}}）。{{t:open|オープン}}をどう調整しますか？"
    options:
      - { text: "ベースラインより広く{{t:open|オープン}}する", correct: true, why: "{{t:nit}}はブラインドを狭くしかディフェンスしないので、弱いハンドでも、あなたの{{t:open}}がその場で勝つことが多くなります。" }
      - { text: "{{t:nit}}は強いハンドを持っているので狭く{{t:open|オープン}}する", why: "{{t:nit}}が強いハンドを持っているのは、プレイするときです。{{t:big-blind|ビッグブラインド}}ではたいてい{{t:fold|フォールド}}し、それがあなたの利益になります。" }
      - { text: "変えない：プレイヤータイプはブラインドスチールに影響しない", why: "影響します。スチールの利益はブラインドがどれだけ頻繁に{{t:fold|フォールド}}するかで決まり、{{t:nit}}は頻繁に{{t:fold|フォールド}}します。" }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "相手は{{t:maniac|マニアック}}です：{{n:hud.ex.reg.hands}}ハンド後に{{t:vpip}} {{n:hud.ex.maniac.vpip}}、{{t:pfr}} {{n:hud.ex.maniac.pfr}}。すべての{{t:street|ストリート}}でベットし、リバーでは{{t:pot|ポット}}全額を{{t:bet|ベット}}してきました。弱いキッカーの{{t:top-pair|トップペア}}でどうしますか？"
    options:
      - { text: "{{t:call|コール}}", correct: true, why: "ベースラインより多く{{t:bluff|ブラフ}}するプレイヤーに対しては、{{t:call|コール}}のボーダーラインにあるハンドが利益になります。トップ{{t:pair}}は彼の{{t:bluff|ブラフ}}と、バリューハンドの一部に勝ちます。" }
      - { text: "{{t:pot|ポット}}全額のベットは強いハンドを意味するので{{t:fold|フォールド}}", why: "ほぼすべてのハンドを{{t:raise|レイズ}}でプレイし、すべての{{t:street|ストリート}}でベットするプレイヤーの大きなベットには、{{t:bluff|ブラフ}}が多く含まれます。{{t:fold|フォールド}}すれば、彼のアグレッシブさに報酬を払うことになります。" }
      - { text: "オールインに{{t:raise|レイズ}}", why: "{{t:raise|レイズ}}すると、{{t:bluff|ブラフ}}は{{t:fold|フォールド}}し、より強いハンドが{{t:call|コール}}してきます。{{t:bluff|ブラフ}}を捕まえるハンドなら{{t:call}}で十分です。" }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "{{t:maniac|マニアック}}とプレイしています。ターンで改善の見込みがない弱いハンドを持っており、相手は{{t:check|チェック}}しました。どうしますか？"
    options:
      - { text: "{{t:check|チェック}}：{{t:maniac|マニアック}}への{{t:bluff|ブラフ}}はめったに成功しない", correct: true, why: "{{t:maniac|マニアック}}はめったに{{t:fold|フォールド}}せず、よく{{t:raise|レイズ}}します。彼から利益を得るのは、より強いハンドでの{{t:call|コール}}であって、{{t:bluff|ブラフ}}ではありません。" }
      - { text: "{{t:maniac|マニアック}}の{{t:check}}は弱さを意味するのでベットする", why: "そうかもしれませんが、{{t:maniac|マニアック}}はどんなハンドでもよく{{t:raise|レイズ}}します。{{t:bluff|ブラフ}}には{{t:fold|フォールド}}が必要ですが、彼の{{t:fold|フォールド}}は少ないです。" }
      - { text: "{{t:raise|レイズ}}されないようにオールインでベットする", why: "めったに{{t:fold|フォールド}}しないプレイヤーに対し、小さな{{t:pot|ポット}}を取るためにスタック全体をリスクにさらすことになります。最も高くつく{{t:bluff}}のやり方です。" }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
前のレッスンのスタッツは、いくつかの典型的なパターンにまとまります。プレイヤータイプは、そのプレイヤーがベースラインからどちらにずれているかを示します：プレイするハンドが少なすぎる、多すぎる、{{t:call|コール}}が多すぎる、または{{t:raise|レイズ}}が多すぎる、のいずれかです。

## 2つの数字、4つのタイプ

タイプは{{t:vpip}}と、{{t:vpip}} − {{t:pfr}} の差から読み取ります（6-max、少なくとも約{{n:hud.hands.vpip.low}}ハンド）：

| タイプ | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | ベースラインとのずれ |
|---|---|---|---|
| {{t:nit|ニット}} | 約{{n:hud.vpip.nit-max}}まで | 小さい | プレイするハンドが少なすぎる |
| {{t:regular}}（{{t:tag}}、{{t:lag}}） | 約{{n:hud.vpip.reg.low}}～{{n:hud.vpip.reg.high}} | 小さい | ベースラインに近い |
| パッシブな{{t:recreational|レクリエーショナルプレイヤー}} | 約{{n:hud.vpip.loose}}から | {{n:hud.gap.passive}}ポイント超 | ハンドが多すぎ、{{t:call|コール}}が多すぎる |
| {{t:maniac|マニアック}} | 約{{n:hud.vpip.loose}}から | 約{{n:hud.gap.aggressive}}ポイントまで | ハンドが多すぎ、{{t:raise|レイズ}}が多すぎる |

差が大きいパッシブなプレイヤーは{{t:calling-station}}とも呼ばれます。タイプの間には中間ゾーンがあります（例：{{t:vpip}}が10%台、または差が数ポイントのルースなプレイヤー）。そこではタイプを決めず、ほかのスタッツを見ます。

## 母集団データが示すこと

公開のスタッツデータベースには、ある大手オンラインサイトのNL25 6-maxで、直近{{n:mda.period.months}}か月の全ハンドから集計したプレイヤーの平均スタッツが載っています。そこでは{{t:regular|レギュラー}}は{{t:vpip}}が{{n:mda.reg.def.low}}～{{n:mda.reg.def.high}}で成績が{{n:mda.reg.def.wr}}を上回るプレイヤー、{{t:recreational|レクリエーショナルプレイヤー}}は{{t:vpip}}が{{n:mda.rec.def}}を超え、成績が{{n:mda.rec.def.wr}}を下回るプレイヤーです：

| スタッツ | {{t:regular|レギュラー}} | {{t:recreational|レクリエーショナルプレイヤー}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| ショーダウン勝率 | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| 成績 | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

{{t:recreational|レクリエーショナルプレイヤー}}の{{t:vpip}} − {{t:pfr}} の差は{{n:mda.rec.gap.pp}}ポイントで、つまりパッシブです。ショーダウンに到達する頻度が高く、勝つ頻度は低い：より弱いハンドで{{t:call|コール}}しています。また、3ベットに{{t:fold|フォールド}}することもめったにありません。NL50とNL100でも数字はほぼ同じです。

## パッシブな{{t:recreational|レクリエーショナルプレイヤー}}

モジュール8のベースラインは変わりません：{{t:call|コール}}してくるハンドの半分以上が弱いハンドなら{{t:value|バリュー}}でベットし、相手が{{t:alpha}}より高い頻度で{{t:fold|フォールド}}するなら{{t:bluff}}は利益になります。変わるのは相手です：より多くの弱いハンドで{{t:call|コール}}してきます。だから：

- より多くのハンドで、より薄いハンドも含めて{{t:value|バリュー}}ベットします。例：弱めのキッカーの{{t:top-pair|トップペア}}で3つの{{t:street|ストリート}}にわたって；
- {{t:bluff|ブラフ}}を減らします。特にリバーでは：{{t:bluff}}が利益を出すのに必要な{{t:fold|フォールド}}がありません。

## {{t:nit|ニット}}と{{t:maniac|マニアック}}

**{{t:nit|ニット}}**は強いハンドしかプレイしません。彼が{{t:raise|レイズ}}や3ベットをしてきたとき、あなたの{{t:call|コール}}{{t:range|レンジ}}の下のほうのハンドはドミネートされていることが多くなるので、モジュール4のベースラインより多く{{t:fold|フォールド}}します。彼がブラインドにいるときは、めったにディフェンスしないので、より多くスチールします。

**{{t:maniac|マニアック}}**は多くのハンドをプレイし、そのほぼすべてを{{t:raise|レイズ}}します。彼のベットにはベースラインより多くの{{t:bluff|ブラフ}}が含まれるので、{{t:call|コール}}のボーダーラインにあるハンドは{{t:call|コール}}し、非常に強いハンドでは彼にベットさせ、自分からは{{t:bluff|ブラフ}}しません：彼はめったに{{t:fold|フォールド}}しないからです。

:::note しきい値の出典
タイプのしきい値はコーチたちの慣例です（2つのトレーニング教材、6-maxオンラインキャッシュ）：両者の共通部分、または両方の出典をカバーする範囲を採用しています。母集団データは公開のスタッツデータベースによるものです（ある大手オンラインサイト、NL25～NL100、2026年10月までの{{n:mda.period.months}}か月の全ハンド。ハンド数はサイトに記載されていません）。{{t:nit|ニット}}や{{t:maniac|マニアック}}の判断は、母集団全体のデータではなく特定の相手のスタッツに基づくため、サンプルが必要です。
:::
