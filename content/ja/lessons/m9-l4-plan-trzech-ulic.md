---
id: m9.l4
module: m9
order: 4
title: "3ストリートのプラン"
sub: "そのハンドは何ストリートのバリューに耐えられるか"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。{{t:dry|ドライ}}なフロップでセットができました。このハンドは何ストリートの{{t:value|バリュー}}に耐えられますか？"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "3ストリート", correct: true, why: "{{t:dry|ドライ}}なフロップでのセットは、ほぼ常に最強です。どの{{t:street|ストリート}}でも相手の弱いハンド（例：キング、セブン、{{t:pair}}）はまだ払う可能性があるので、フロップ、ターン、リバーで{{t:bet|ベット}}するプランを立てます。" }
      - { text: "1ストリート", why: "少なすぎます。これほど強いハンドで{{t:bet}}が1回だけでは、バリューの大半を{{t:board|ボード}}に残してしまいます。キングを持つ相手は1回より多く払います。" }
      - { text: "0ストリート：相手を逃がさないよう{{t:check|チェック}}します", why: "全{{t:street|ストリート}}で{{t:check|チェック}}しても{{t:pot|ポット}}は大きくなりません。セットは通常ショーダウンで勝つので、{{t:pot}}を大きくしたいハンドです。" }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。{{t:spr}}は約{{n:spr.srp}}です。最強キッカーの{{t:top-pair|トップペア}}を持っています。どんなプランにしますか？"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "通常は2ストリートの{{t:value|バリュー}}で、スタック全体を賭けるプランは立てない", correct: true, why: "そのとおりです。弱いキングやエイトは通常{{t:bet|ベット}}1回か2回なら払います。{{t:pot|ポット}}に入るお金が非常に多くなると、払ってくるのは主に1{{t:pair|ペア}}より強いハンドです。{{t:spr}}が約{{n:spr.srp}}だと、スタック全体が入るのは{{t:pot}}より大きい{{t:bet|ベット}}をしたときだけです。" }
      - { text: "オールインまで3{{t:street|ストリート}}大きな{{t:bet|ベット}}", why: "{{t:spr}}が約{{n:spr.srp}}の場合、各{{t:street|ストリート}}で{{t:pot|ポット}}の約{{n:geo.srp.3}}の{{t:bet|ベット}}になります。リバーまでに{{t:pot|ポット}}に残るのは、主に1{{t:pair|ペア}}に勝つ{{t:two-pair}}とセットです。" }
      - { text: "1{{t:street}}または0", why: "慎重すぎます。{{t:dry|ドライ}}なフロップでの最強キッカーの{{t:top-pair}}は、相手の多くのハンドに勝っています。通常は2ストリートの{{t:value|バリュー}}に耐えられます。" }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}しました。ミドル{{t:pair|ペア}}を持っています。このハンドは何ストリートの{{t:value|バリュー}}に耐えられますか？"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "1ストリートか0：ショーダウンまで行ければ十分なことが多い", correct: true, why: "そのとおりです。ミドル{{t:pair}}は{{t:bluff|ブラフ}}や弱い{{t:pair|ペア}}には勝ちますが、{{t:bet|ベット}}を何回も払ってくれる弱いハンドはあまりありません。プランは、多くても小さな{{t:bet}}を1回、または{{t:check}}して{{t:call|コール}}です。" }
      - { text: "2ストリート、{{t:top-pair}}と同じ", why: "ミドル{{t:pair}}はどのキングにも負けます。2回目の{{t:bet|ベット}}の後に払ってくるのは、主にこれに勝つハンドです。" }
      - { text: "3ストリート、相手に追いつかれないように", why: "ミドル{{t:pair|ペア}}での3回の{{t:bet|ベット}}に払うのは主に強いハンドです。弱いハンドは1回目か2回目の{{t:bet|ベット}}で{{t:fold|フォールド}}します。" }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "4ベット{{t:pot|ポット}}で、{{t:spr}}は約{{n:spr.4bet}}です。最強キッカーの{{t:top-pair|トップペア}}を持っています。このハンドは2ストリートの{{t:value|バリュー}}に耐えられます。どんなプランにしますか？"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "{{t:pot|ポット}}の約{{n:geo.4bet.2}}の{{t:bet|ベット}}を2回：ターンでスタック全体が入る", correct: true, why: "そのとおりです。{{t:spr}}が約{{n:spr.4bet}}なら、2{{t:street|ストリート}}でスタック全体を入れられます。ここでは{{t:top-pair|トップペア}}で2ストリートの{{t:value|バリュー}}を取ることが、スタック全体を賭けた勝負になります。" }
      - { text: "小さく{{t:bet}}し、オールインには{{t:fold}}", why: "{{t:spr}}が約{{n:spr.4bet}}のとき、エース付きの{{t:top-pair|トップペア}}でオールインに{{t:fold}}するのは失うものが大きすぎます。必要なエクイティは約{{n:eq.jam.4bet}}だけで、自分が{{t:bet|ベット}}した後はさらに少なくなります。" }
      - { text: "{{t:pot|ポット}}をコントロールするため、全{{t:street|ストリート}}で{{t:check|チェック}}", why: "{{t:pot|ポット}}コントロールが意味を持つのは{{t:spr}}が高いときです。ここでは{{t:pot}}がすでにスタックに対して大きく、弱いハンド（AQ、QQ、JJ）は喜んで残りを入れてきます。" }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "3ベット{{t:pot|ポット}}で{{t:position|ポジション}}があり、{{t:spr}}は約{{n:spr.3bet-ip}}です。セットを持っていて、リバーまでにスタック全体を入れたいです。どのラインにしますか？"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "フロップ、ターン、リバーで毎回{{t:pot|ポット}}の約{{n:geo.3bet-ip.3}}を{{t:bet|ベット}}", correct: true, why: "そのとおりです。{{n:geo.3bet-ip.flop}}、{{n:geo.3bet-ip.turn}}、{{n:geo.3bet-ip.river}}で合計{{n:geo.3bet-ip.total}}、つまりスタック全体です。相手はどの{{t:street|ストリート}}でも{{t:pot|ポット}}に対して手頃な割合を払います。" }
      - { text: "毎{{t:street|ストリート}}で{{t:pot|ポット}}の1/3を{{t:bet|ベット}}", sizeError: true, why: "ラインは良いですが、サイズが違います。{{t:pot|ポット}}の1/3の{{t:bet|ベット}}を3回では、{{n:spr.3bet-ip.stack}}のうち約{{n:g3b.third.total}}しか入りません。スタック全体を入れるプランには{{t:pot|ポット}}の約{{n:geo.3bet-ip.3}}が必要です。" }
      - { text: "フロップとターンは{{t:check|チェック}}し、リバーでオールイン", why: "リバーでスタック全体のオールインをすると、{{t:pot}}の数倍の{{t:bet|ベット}}になります。相手が払うのは非常に強いハンドのときだけで、小さめの{{t:bet|ベット}}3回なら払っていた弱いハンドは{{t:fold|フォールド}}します。" }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "3{{t:street|ストリート}}のプランをフロップの時点で決めておくべきなのはなぜですか？"
    options:
      - { text: "フロップでのサイズが、後でどれだけ入れられるかを決めるから", correct: true, why: "そのとおりです。{{t:pot}}は掛け算で大きくなります。フロップでの{{t:bet}}が小さいと、ターンとリバーの{{t:pot|ポット}}も小さいままなので、後から非常に大きな{{t:bet|ベット}}なしでスタック全体を入れるのは難しくなります。" }
      - { text: "後からプランを変えてはいけないから", why: "状況が変われば（例：ターンで危険なカードが出た）プランは変えます。大事なのは、最初の{{t:bet}}が目的、つまり何ストリートの{{t:value|バリュー}}を取るか、スタック全体を賭けるかに合っていることです。" }
      - { text: "相手にプランが見えるから", why: "相手はあなたのプランを知りません。プランは、最後に{{t:pot|ポット}}にハンドが耐えられるだけの額が入るよう、あなた自身がサイズを選ぶための助けになります。" }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "シングルレイズド{{t:pot|ポット}}で、{{t:spr}}は約{{n:spr.srp}}です。良いキッカーの{{t:top-pair|トップペア}}を持っています。{{t:pot|ポット}}の約{{n:geo.srp.3}}というジオメトリックサイズでベットしますか？"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "いいえ：それはスタック全体用のサイズで、このハンドは通常2{{t:street|ストリート}}まで", correct: true, why: "そのとおりです。ジオメトリックサイズはスタック全体を入れるためのものです。{{t:pot}}より大きい{{t:bet|ベット}}になると弱いハンドは払わなくなり、残るのは1{{t:pair|ペア}}より強いハンドです。" }
      - { text: "はい：いつもジオメトリックにベットする", why: "ジオメトリックサイズは、スタック全体を賭けるプランに合うものです。{{t:spr}}が約{{n:spr.srp}}の{{t:top-pair|トップペア}}には、通常そのようなプランはありません。" }
      - { text: "いいえ：{{t:top-pair|トップペア}}ではいつも{{t:check|チェック}}する", why: "{{t:top-pair|トップペア}}はバリューの{{t:bet|ベット}}をしたいハンドです。ただしサイズは小さめで、通常は2{{t:street|ストリート}}分であり、スタック全体ではありません。" }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}：{{t:pot|ポット}}は{{n:ex.pot}}、スタックはそれぞれ{{n:commit.stack}}です。フロップとターンで{{t:pot|ポット}}の約{{n:geo.spr2.2}}をベットし、相手は{{t:call|コール}}します。残りのスタックはどうなりますか？"
    options:
      - { text: "ターンの後、スタック全体が{{t:pot|ポット}}に入っている", correct: true, why: "そのとおりです。フロップの{{n:geo.spr2.flop}}とターンの{{n:geo.spr2.turn}}で合計{{n:geo.spr2.total}}です。だから{{t:spr}} {{n:spr.commit}}では、{{t:top-pair|トップペア}}で2ストリートの{{t:value|バリュー}}を取れば、スタック全体を賭けた勝負に十分です。" }
      - { text: "リバー用に約半分が残る", why: "{{t:pot|ポット}}は掛け算で大きくなります。フロップの後は約{{n:geo.spr2.flop-after}}になり、ターンでの約{{n:geo.spr2.2}}の{{t:bet}}は約{{n:geo.spr2.turn}}、つまり残りのスタックです。" }
      - { text: "スタックのほぼ全部が残る", why: "{{t:spr}} {{n:spr.commit}}では、スタックは{{n:spr.commit}}{{t:pot|ポット}}分しかありません。{{t:pot|ポット}}の約{{n:geo.spr2.2}}の{{t:bet|ベット}}2回で、{{n:geo.spr2.total}}すべてが入ります。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
良いプランは、最初の{{t:bet}}をする前のフロップから始まります。自分に問いかけましょう。このハンドは何ストリートの{{t:value|バリュー}}に耐えられるか、そしてスタック全体を賭けて勝負したいか。答えはハンドの強さと{{t:spr}}を組み合わせて決まります。

## 何ストリートの{{t:value|バリュー}}か

{{t:street|ストリート}}が進むごとに相手の弱いハンドは{{t:fold|フォールド}}し、{{t:pot|ポット}}に残るのは主にあなたより強いハンドになります。だから強いハンドほど多くの{{t:bet|ベット}}に耐えられます。

| ハンド | {{t:value|バリュー}}のストリート数（通常） |
|---|---|
| 非常に強い：セット、{{t:straight}}、高い{{t:two-pair}} | 3 |
| 良いキッカーの{{t:top-pair|トップペア}}、{{t:overpair}} | 2。相手が弱いハンドで払ってくるなら3 |
| 弱い{{t:pair}}（ミドル、ロー） | 1または0 |

表の{{t:street|ストリート}}数は単純化したものです。{{t:board|ボード}}の{{t:texture|テクスチャー}}、ターンとリバーのカード、そして相手によって大きく変わります。

## ハンドと{{t:spr}}を組み合わせる

- **3{{t:street|ストリート}}のハンドで、{{t:spr}}のゾーンがスタックを賭けた勝負を許し、スタック全体を入れたい場合：** フロップからジオメトリックサイズでベットします（3ベット{{t:pot|ポット}}で{{t:in-position}}なら、{{t:pot|ポット}}の約{{n:geo.3bet-ip.3}}）。
- **{{t:spr}}が低いときの2{{t:street|ストリート}}のハンド：** {{t:spr}}が約{{n:spr.commit}}なら、{{t:pot|ポット}}の約{{n:geo.spr2.2}}の{{t:bet|ベット}}2回でスタック全体になるので、スタックを賭けて勝負します。
- **{{t:spr}}が高いときの2{{t:street|ストリート}}のハンド：** シングルレイズド{{t:pot|ポット}}（{{t:spr}}約{{n:spr.srp}}）では、バリューでベットしますが、スタック全体を入れるプランは立てません。

3ストリートの{{t:value|バリュー}}は、スタック全体を賭けた勝負と同じではありません。高い{{t:two-pair}}は3{{t:street|ストリート}}に耐えられますが、シングルレイズド{{t:pot|ポット}}（{{t:spr}}約{{n:spr.srp}}、{{n:spr.zone.deep}}超）では通常スタック全体を賭けません。このゾーンでスタックを賭けて勝負するのは、セット、{{t:straight}}、それより強いハンドです（{{t:spr}}のゾーンは最初のレッスンを参照）。

## ライン

ラインとは、この先の{{t:street|ストリート}}でのアクションのプランです。基本的なものをいくつか紹介します。

- **{{t:bet}}、{{t:bet}}、{{t:bet}}：** 3ストリートの{{t:value|バリュー}}に耐えられるハンド
- **{{t:bet}}、{{t:bet}}、{{t:check}}：** 2{{t:street|ストリート}}のハンドで、リバーはショーダウンまで行く
- **{{t:bet}}または{{t:check}}、その後{{t:check}}して{{t:call|コール}}：** 安くショーダウンまで行きたい弱い{{t:pair}}

## フロップのサイズがその後を決める

{{t:pot|ポット}}は掛け算で大きくなるので、フロップでの{{t:bet}}が小さいと、その後の{{t:street|ストリート}}の{{t:pot|ポット}}も小さいままです。3ベット{{t:pot|ポット}}では、{{t:pot|ポット}}の1/3の{{t:bet|ベット}}を3回しても{{n:spr.3bet-ip.stack}}のスタックのうち約{{n:g3b.third.total}}しか入りませんが、{{t:pot|ポット}}の約{{n:geo.3bet-ip.3}}の{{t:bet|ベット}}を3回ならスタック全体が入ります。

:::note プランは絶対ではありません
ターンとリバーでは、プランを改めて見直します。危険なカードが出ると、{{t:value|バリュー}}のストリート数が減ることがあります。ターンとリバーの打ち方はモジュールM7とM8で学びます。ハンドの種類ごとの{{t:value|バリュー}}のストリート数はヒューリスティックで、複数のトレーニング教材をまとめたものです。シングルレイズド{{t:pot|ポット}}では{{t:spr}}が高すぎて、多くの{{t:top-pair|トップペア}}は3ストリートの{{t:value|バリュー}}を無理なく取ることができません。
:::
