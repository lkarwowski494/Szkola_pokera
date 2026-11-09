---
id: m10.l4
module: m10
order: 4
title: "レーキ"
sub: "プレイにかかるコストと、それが判断をどう変えるか"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "大手オンラインサイトのひとつでNL10 6-maxをプレイしています。低{{t:stakes|ステークス}}の典型的な勝ち組プレイヤーのウィンレートと比べて、{{t:rake}}はどれくらいの大きさですか？"
    options:
      - { text: "数倍大きい：約{{n:rake.micro.low}}–{{n:rake.micro.high}}に対して{{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "各サイトの料金体系をbb/100に換算すると、マイクロステークスでは約{{n:rake.micro.low}}–{{n:rake.micro.high}}になります。勝ち組プレイヤーは{{t:rake}}を上回る差で相手に勝つ必要があり、その超過分だけがウィンレートになります。" }
      - { text: "ほぼ同じ", why: "マイクロステークスの{{t:rake}}は約{{n:rake.micro.low}}–{{n:rake.micro.high}}、典型的なウィンレートは{{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}です。差は数倍あります。" }
      - { text: "無視できるほど小さい。サイトが取るのは{{t:pot|ポット}}の数パーセントだけだから", why: "フロップ後のすべての{{t:pot|ポット}}から取られる数パーセントは、合計すると約{{n:rake.micro.low}}–{{n:rake.micro.high}}になります。これは典型的な勝ち組プレイヤーが勝つ額より大きいです。" }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "6-maxキャッシュゲームの母集団レポートでは、NL100のプレイヤーは1人あたり平均{{n:rake.pop.nl100.loss}}負けています。この損失はどこから来ていますか？"
    options:
      - { text: "{{t:rake}}です。それがなければ、プレイヤー全体の収支はゼロになります", correct: true, why: "プレイヤー同士で対戦しているので、誰かが勝った分は誰かが負けています。平均すると、全員が失うのはサイトが取る分だけです。筆者いわく「your biggest villain is the house」。" }
      - { text: "大半のプレイヤーのプレイが下手だから", why: "下手なプレイはお金を弱いプレイヤーから強いプレイヤーへ移しますが、平均は変えません。平均を下げるのは{{t:rake}}だけです。" }
      - { text: "{{t:variance|分散}}のせい。サンプルが増えればゼロになる", why: "{{t:variance|分散}}、つまり{{t:expected-value|期待値}}を中心とした結果のばらつきは、個々のプレイヤーの結果を上下両方向に動かします。母集団全体の平均がマイナスなのは、全員が{{t:rake}}を払っているからです。" }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "同じデータの筆者による推定（ベイズ補正あり）では、{{n:rake.pop.reg.hands}}ハンド以上プレイしたプレイヤーのうち、{{t:rake|レーキ}}を差し引く前に勝っているのは約{{n:rake.pop.reg.prerake}}です。差し引いた後に勝っているのはどれくらいですか？"
    options:
      - { text: "約{{n:rake.pop.reg.postrake}}", correct: true, why: "{{t:rake}}は勝ち組のほぼ半分を消します。レーキ前は約{{n:rake.pop.reg.prerake}}、レーキ後は約{{n:rake.pop.reg.postrake}}です。だからウィンレートは常にレーキ後で計算します。" }
      - { text: "ほぼ同じで、約{{n:rake.pop.reg.prerake}}", why: "{{t:rake}}が小さければそうなります。レーキが数bb/100あると、レーキ前に勝っている多くのプレイヤーがマイナスに転落します。" }
      - { text: "ほとんどいない", why: "言い過ぎです。このグループの約{{n:rake.pop.reg.postrake}}は今も勝っています。{{t:rake}}は大きな障害ですが、勝つ道を閉ざすものではありません。" }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "なぜNL500では、bb/100で見た{{t:rake}}がマイクロステークスより数倍小さい（{{n:rake.nl500.low}}–{{n:rake.nl500.high}}）のですか？"
    options:
      - { text: "大きな{{t:pot|ポット}}ほど{{t:rake-cap|レーキ上限}}に達しやすく、そこでは上限がbb換算で小さいから", correct: true, why: "サイトは{{t:pot|ポット}}の一定割合を取りますが、ドル建ての上限を超えては取りません。マイクロステークスでは上限が何bbにもなり、{{t:pot|ポット}}がそこに達することはまれなので、満額の割合を払います。NL500では同じ上限が1bbに満たない額です。" }
      - { text: "NL500ではサイトが取る割合が小さいから", why: "割合は同程度のことが多いです（約{{n:rake.ex.pct}}）。差を生むのは{{t:rake-cap|レーキ上限}}で、高い{{t:stakes|ステークス}}では大きな{{t:pot|ポット}}からの手数料を頭打ちにします。" }
      - { text: "NL500では1時間あたりのハンド数が少ないから", why: "bb/100は100ハンドあたりの{{t:rake}}なので、プレイのペースでは変わりません。変えるのはbb換算の{{t:rake-cap|レーキ上限}}です。" }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "{{t:pot|ポット}}は{{n:ex.pot}}で、相手が{{n:ex.bet.half}}を{{t:bet|ベット}}します。サイトは{{t:pot|ポット}}の{{n:rake.ex.pct}}を取り、{{t:rake-cap|上限}}には届きません。{{t:call|コール}}するにはどれだけのエクイティが必要ですか？パーセントで入力してください。"
    answer: eq.bet-half.rake
    explanation: "{{t:call|コール}}後の{{t:pot|ポット}}は{{n:ex.half.total}}で、レーキを引くと{{n:rake.ex.pot-after}}が残ります。支払うのは{{n:ex.bet.half}}なので、必要なのは{{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}}です。レーキなしなら{{n:eq.bet-half}}です。"
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "{{t:rake|レーキ}}がなければ、{{t:pot|ポット}}の半分のベットに対する{{t:call}}には{{n:eq.bet-half}}のエクイティが必要です。{{t:rake|レーキ}}が{{n:rake.ex.pct}}のときは、どれだけ必要ですか？"
    options:
      - { text: "少し多い：約{{n:eq.bet-half.rake}}", correct: true, why: "勝ち取るのは{{t:rake}}を引いた{{t:pot|ポット}}ですが、支払いは全額です。レーキなしでぎりぎり基準を超えるハンドは、レーキありでは基準を下回ることがあります。" }
      - { text: "同じ。{{t:rake}}は両方のプレイヤーが払うから", why: "{{t:rake}}は支払額からではなく、勝ち取る{{t:pot|ポット}}から差し引かれます。基準は約{{n:eq.bet-half.rake}}に上がります。" }
      - { text: "少ない。{{t:pot}}が大きくなるから", why: "レーキ後の{{t:pot}}は大きくなるのではなく小さくなるので、より多くのエクイティが必要です：約{{n:eq.bet-half.rake}}。" }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "フロップに到達した{{t:pot|ポット}}からだけ{{t:rake}}を取るサイトでプレイしています。あなたより前の誰かが{{t:open|オープン}}し、あなたは{{t:position|ポジション}}があり、ハンドはレーキがなければ{{t:call|コール}}のボーダーラインです。{{t:rake}}で何が変わりますか？"
    options:
      - { text: "{{t:call|コール}}を減らす：{{t:call|コール}}のボーダーラインのハンドは、より多く{{t:fold|フォールド}}するか3ベットする", correct: true, why: "公開されているレーキありのソルバー解では、{{t:open|オープン}}に対して{{t:position|ポジション}}のあるプレイヤーは約{{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}}少ないハンドをプレイします。損をするのは{{t:call|コール}}そのものです。フロップ後の{{t:pot}}は{{t:rake}}を払いますが、フロップ前に3ベットで勝ち取った{{t:pot}}は払わないからです。" }
      - { text: "何も変わらない。{{t:rake}}はフロップ後のプレイにしか関係しない", why: "だからこそフロップ前の判断が変わります。{{t:call|コール}}はフロップとレーキにつながり、3ベットや{{t:fold}}はレーキなしでハンドが終わることが多いからです。" }
      - { text: "{{t:call|コール}}を増やす。フロップ後の{{t:pot|ポット}}は大きいから", why: "逆です。{{t:rake}}はまさにその{{t:pot|ポット}}の一部を取ります。レーキありのソルバーは{{t:call|コール}}が明らかに少なくなります。" }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "同じソルバー解では、レーキありのゲームで{{t:big-blind}}がミニレイズを{{t:call|コール}}するのは、レーキなしで{{t:call|コール}}するケースの約{{n:rake.solver.bb-minraise}}だけです。{{t:big-blind|ビッグブラインド}}にいるあなたにとって、これは何を意味しますか？"
    options:
      - { text: "引き続き多くのハンドでディフェンスするが、レーキなしで計算された表より狭くする", correct: true, why: "{{t:big-blind}}はすでに{{t:pot|ポット}}に{{t:chips|チップ}}を入れていて、アクションを締めくくる立場なので、今も頻繁にディフェンスします。ただし{{t:rake}}が最も弱い{{t:call|コール}}を削るので、レーキなしの表はあなたには広すぎます。" }
      - { text: "{{t:big-blind|ビッグブラインド}}を{{t:call|コール}}でディフェンスするのをやめる", why: "違います。筆者によれば、ブラインドからの{{t:call|コール}}はレーキありでも戦略の重要な一部です。変わるのはディフェンスの広さで、ディフェンスするかどうかではありません。" }
      - { text: "同じ広さでディフェンスする。{{t:big-blind|ビッグブラインド}}では{{t:rake}}は関係ないから", why: "関係あります。{{t:call|コール}}後の{{t:pot}}はフロップに到達し、{{t:rake}}を払います。だからソルバーは{{t:big-blind|ビッグブラインド}}からの{{t:call|コール}}を減らします。" }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "一部のサイトでは、フロップ前に終わる3ベットの{{t:pot|ポット}}からも{{t:rake}}を取ります。これは「3ベットはレーキを払わない」という論拠をどう変えますか？"
    options:
      - { text: "そのようなサイトではこの論拠が弱まる。3ベットも払うので、{{t:call|コール}}に対する3ベットの優位は小さくなる", correct: true, why: "ソルバーの結果は「no flop, no drop」の仕組み、つまりフロップのない{{t:pot}}にはレーキがかからない仕組みを前提としています。そのようなサイトではこのルールが3ベットのない{{t:pot|ポット}}にしか適用されないので、{{t:call|コール}}は引き続きレーキで損をしますが、3ベットもレーキを免れません。" }
      - { text: "何も変わらない。3ベットの{{t:rake}}は無視できるから", why: "特定のサイトについて計算しなければ、それはわかりません。確かなのは、3ベットがレーキを免れなくなるということだけです。" }
      - { text: "そのようなサイトでは、常に3ベットではなく{{t:call|コール}}すべき", why: "{{t:call|コール}}はフロップにつながり、これまでと同じように{{t:rake}}を払います。変わるのは、3ベットも払うようになる点だけです。" }
---
{{t:rake}}は、サイトが{{t:pot|ポット}}から取る手数料です。プレイヤー同士で対戦しているので、{{t:rake}}がなければプレイヤー全体の収支はゼロになります。レーキがあると、平均的なプレイヤーはサイトが取る分とちょうど同じだけ負け、勝ち組プレイヤーは{{t:rake}}を上回る差で相手に勝つ必要があります。

## コストはどれくらいか

サイトは{{t:pot|ポット}}の一定割合を取りますが、ドル建ての{{t:rake-cap|レーキ上限}}を超えては取りません。2大オンラインサイトのNL2–NL10では、{{t:pot|ポット}}の{{n:rake.ex.pct}}です。マイクロステークスでは{{t:pot|ポット}}が上限に達することはまれなので、満額の割合を払います。

各サイトの料金体系を比較した資料では、数百万ハンドの{{t:pot|ポット}}の分布をもとに、それをbb/100に換算しています：

| {{t:stakes|ステークス}}（6-max、2大オンラインサイト） | {{t:rake}} |
|---|---|
| NL2–NL25 | 約{{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | 約{{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

低{{t:stakes|ステークス}}の典型的な勝ち組プレイヤーのウィンレートは{{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}（モジュール12）で、サイトに払う額の数分の1です。高い{{t:stakes|ステークス}}では、同じドル建ての上限が1bbに満たない額になるので、bb/100で見た{{t:rake}}は下がります。

母集団のデータも同じことを示しています。母集団レポート（6-maxキャッシュ、NL10–NL500）では、プレイヤーは1人あたり平均で、NL10では{{n:rake.pop.nl10.loss}}、NL100では{{n:rake.pop.nl100.loss}}、NL500では{{n:rake.pop.nl500.loss}}負けています。{{n:rake.pop.reg.hands}}ハンド以上プレイしたNL100のプレイヤーのうち、筆者の推定（ベイズ補正）では、レーキを差し引く前に勝っているのは約{{n:rake.pop.reg.prerake}}、差し引いた後は約{{n:rake.pop.reg.postrake}}です（生データでは{{n:rake.pop.reg.prerake.raw}}と{{n:rake.pop.reg.postrake.raw}}）。

## レーキありの{{t:call|コール}}の基準

勝ち取るのは{{t:rake}}を引いた{{t:pot|ポット}}ですが、支払いは全額です。モジュール2で学んだ必要エクイティは上がります：

```formula
必要エクイティ = 支払額 ÷ （{{t:call|コール}}後の{{t:pot}} × (1 − {{t:rake}})）
```

{{n:ex.pot}}の{{t:pot|ポット}}に{{n:ex.bet.half}}のベット：レーキなしなら{{n:eq.bet-half}}、レーキ{{n:rake.ex.pct}}なら{{n:eq.bet-half.rake}}が必要です。1ハンドでの差は小さいですが、フロップ後のすべての{{t:pot|ポット}}に関係します。

## {{t:rake}}がフロップ前に変えること

多くのサイトでは、{{t:rake}}はフロップに到達した{{t:pot|ポット}}からだけ取られます（「no flop, no drop」）。その場合、フロップ前に勝ち取った{{t:pot}}にはレーキがかからず、{{t:call|コール}}後の{{t:pot}}は払います。公開されているレーキありのNL100のソルバー解では：

- {{t:open|オープン}}に対して{{t:position|ポジション}}のあるプレイヤーは約{{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}}少ないハンドをプレイします。主に損をするのは{{t:call|コール}}で、3ベットは少し増えます。
- {{t:big-blind}}がミニレイズを{{t:call|コール}}するのは、レーキなしの場合の約{{n:rake.solver.bb-minraise}}だけです。ただし、ブラインドからのディフェンスは今も{{t:call|コール}}が中心です。

同じ理由で、モジュール3では{{t:small-blind|スモールブラインド}}から{{t:raise|レイズ}}するか{{t:fold|フォールド}}し、{{t:big-blind|ビッグブラインド}}に合わせる支払いはしません。一部のサイトは、フロップ前に終わる3ベットの{{t:pot|ポット}}からも{{t:rake}}を取ります。そこでは3ベットもレーキを免れません。

:::note 出典
レーキの水準：2026年のオンラインサイトのレーキ比較（2大サイトの料金体系をbb/100に換算、2026年10月5日閲覧）。ほかのサイトでは数値が異なります。母集団の損失：独立した母集団レポート（6-max NLHEキャッシュ、ハンド追跡データベースのあるサイト、100ハンド以上プレイしたプレイヤー。サイトと期間は筆者が明らかにしていません）。レーキがフロップ前のプレイに与える影響：プリフロップのレイズサイズに関する公開記事、{{n:rake.solver.depth}}スタックのソルバー解。筆者は結論がほかの形式にもおおむね当てはまると書いているので、{{n:format.stack}}スタックについては簡略化です。エクイティの基準は計算によるものです。
:::
