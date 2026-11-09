---
id: m7.l2
module: m7
order: 2
title: "ポラライズ"
sub: "大きなベット：強いハンドとセミブラフ"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "ターンのベットの{{t:range|レンジ}}のうち、{{t:polarized|ポラライズ}}されているのはどれですか？"
    options:
      - { text: "セット、{{t:two-pair|ツーペア}}、{{t:draw|ドロー}}。中程度の{{t:pair|ペア}}はなし", correct: true, why: "はい。{{t:polarized|ポラライズ}}された{{t:range|レンジ}}には2つの極があります。非常に強いハンドと{{t:semi-bluff|セミブラフ}}です。真ん中、つまり中程度のハンドは含まれません。それらのハンドは{{t:check|チェック}}します。" }
      - { text: "{{t:top-pair|トップペア}}、中程度の{{t:pair|ペア}}、より弱い{{t:pair|ペア}}", why: "ここには極がひとつもありません。非常に強いハンドと{{t:semi-bluff|セミブラフ}}がなく、上から下まで{{t:pair|ペア}}だけです。これは{{t:linear|リニア}}な{{t:range|レンジ}}に近く、主にバリューのあるハンドで、ターンの大きなサイズではなく、通常は小さなサイズでベットします。" }
      - { text: "{{t:bluff|ブラフ}}だけ", why: "強いハンドのない{{t:range|レンジ}}は、相手に簡単に見抜かれ、{{t:call|コール}}されます。{{t:polarized|ポラライズ}}された{{t:range|レンジ}}は、{{t:bluff|ブラフ}}と非常に強いハンドを組み合わせます。" }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "{{t:dry|ドライ}}なフロップ[[Ks 7d 2c]]で、あなたはほぼすべてのハンドで小さくベットしました。セットから弱い{{t:pair|ペア}}までです。このようなベットの{{t:range|レンジ}}は何と呼びますか？"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|リニア}}", correct: true, why: "はい。強いハンドと中程度のハンドが一緒に、小さなサイズでベットします。これは、{{t:range-advantage|レンジアドバンテージ}}がある{{t:dry|ドライ}}で高いフロップでの、M5のプランです。" }
      - { text: "{{t:polarized|ポラライズ}}", why: "{{t:polarized|ポラライズ}}された{{t:range|レンジ}}には中程度のハンドがありません。ベットするのは非常に強いハンドと{{t:bluff|ブラフ}}だけです。ここでは弱い{{t:pair|ペア}}もベットしました。" }
      - { text: "キャップされている", why: "キャップされた{{t:range|レンジ}}とは、最も強いハンドが欠けているレンジのことです。あなたはセットでもベットしました。" }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "なぜ中程度の{{t:pair|ペア}}は、ターンの大きなベットに向かないのですか？"
    options:
      - { text: "より弱いハンドは{{t:fold|フォールド}}し、より強いハンドが払うから", correct: true, why: "はい。中程度の{{t:pair|ペア}}での大きなベットが利益になるのは、より弱いハンドが払うときだけですが、そうしたハンドは大きなベットに対して通常{{t:fold|フォールド}}します。残るのは、あなたに勝っているハンドからの{{t:call|コール}}です。" }
      - { text: "大きなベットは常に{{t:bluff|ブラフ}}だから", why: "いいえ。最も強いハンドも大きく{{t:bet|ベット}}します。中程度の{{t:pair|ペア}}の問題は、誰が払ってくれるかです。" }
      - { text: "中程度の{{t:pair|ペア}}は勝てないから", why: "勝てます。{{t:bluff|ブラフ}}やより弱い{{t:pair|ペア}}には勝ちます。だから{{t:check|チェック}}して、安くショーダウンまで行きます。" }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind|ビッグブラインド}}がフロップのCベットを{{t:call|コール}}しました。ターンは2です。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しました。あなたはセットです。どうしますか？"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "{{n:ex.bet.three-quarters}}をベット", correct: true, why: "はい。相手は{{t:flush|フラッシュ}}（ハートが2枚）や{{t:straight|ストレート}}（例：65、T9）への{{t:draw|ドロー}}を持っている可能性があります。{{t:pot|ポット}}の3/4のベットに対して、{{t:flush-draw|フラッシュドロー}}には{{n:eq.bet-three-quarters}}のエクイティが必要ですが、{{t:flush|フラッシュ}}が完成するのは約{{n:odds.flush.turn-river}}です。あなたのセットに対してはさらに少なくなります。[[4h]]と[[2h]]ではあなたが{{t:full-house|フルハウス}}になるので、相手に残るクリーンなアウツは{{n:outs.flush.vs-set}}、約{{n:odds.flush.vs-set}}です。相手は払いすぎです。" }
      - { text: "{{n:ex.bet.quarter}}をベット", sizeError: true, why: "アクションは正しいですが、サイズが違います。{{t:pot|ポット}}の1/4のベットでは、{{t:draw|ドロー}}に必要なエクイティは{{n:eq.bet-quarter}}だけなので、良い価格が得られます。{{t:flush-draw|フラッシュドロー}}のある{{t:board|ボード}}で非常に強いハンドを持っているときは、大きくベットします。" }
      - { text: "{{t:check|チェック}}", why: "フリーカードは{{t:draw|ドロー}}へのプレゼントです。しかも、リバーの前に{{t:pot|ポット}}を大きくできません。{{t:flush-draw|フラッシュドロー}}のある{{t:board|ボード}}では、セットはベットします。" }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind|ビッグブラインド}}がフロップのCベットを{{t:call|コール}}しました。ターンは3です。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しました。どうしますか？"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "{{n:ex.bet.three-quarters}}をベット", correct: true, why: "はい。高いカード2枚の{{t:flush-draw|フラッシュドロー}}は良い{{t:semi-bluff|セミブラフ}}です。強いハンドと同じ大きなサイズでベットするので、相手は{{t:bluff|ブラフ}}とバリューを見分けられません。" }
      - { text: "{{n:ex.bet.quarter}}をベット", sizeError: true, why: "アクションは正しいですが、サイズが違います。これほど安いベットなら、相手はどんな{{t:pair|ペア}}でも{{t:call|コール}}しますが、{{t:semi-bluff|セミブラフ}}が利益を生むのは主に相手の{{t:fold|フォールド}}からです。もしあなたの小さなベットが{{t:draw|ドロー}}を、大きなベットが強いハンドを意味するなら、相手はそれを簡単に利用できます。" }
      - { text: "{{t:check|チェック}}", correct: true, why: "これも良い選択です。無料でリバーを見られ、{{n:odds.flush.turn-river}}の確率で{{t:flush|フラッシュ}}を完成させられます。ただし、通常はベットのほうが良いです。高いカードの{{t:draw|ドロー}}は最高の{{t:semi-bluff|セミブラフ}}のひとつであり、{{t:check|チェック}}すると、すぐに{{t:pot|ポット}}を獲得するチャンスを手放すからです。" }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "あなたはボタンから{{t:open|オープン}}し、{{t:big-blind|ビッグブラインド}}がフロップのCベットを{{t:call|コール}}しました。ターンは5です。{{t:pot|ポット}}は{{n:ex.pot}}で、相手は{{t:check|チェック}}しました。どうしますか？"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|チェック}}", correct: true, why: "キッカーの弱い{{t:top-pair|トップペア}}は中程度のハンドです。大きなベットに払うのは主により強いキング（AK、KQ、KJ）で、より弱いハンドは{{t:fold|フォールド}}します。{{t:check|チェック}}すれば、安くショーダウンまで行けます。" }
      - { text: "{{n:ex.bet.three-quarters}}をベット", why: "大きなベットは{{t:polarized|ポラライズ}}された{{t:range|レンジ}}に合うものです。このハンドでは、払ってくれるのは主にあなたに勝っているハンドです。" }
      - { text: "{{n:ex.bet.pot}}をベット", why: "中程度の強さのハンドで、さらに大きな{{t:pot|ポット}}を作ることになります。より弱いハンドはほぼ必ず{{t:fold|フォールド}}し、より強いハンドが払います。" }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "ターン。{{t:pot|ポット}}は{{n:ex.pot}}で、あなたは非常に強いハンドで{{n:ex.bet.three-quarters}}をベットします。{{t:draw|ドロー}}を持つ相手が{{t:call|コール}}するには、何パーセントのエクイティが必要ですか？数字を入力してください。"
    answer: eq.bet-three-quarters
    explanation: "相手は{{n:ex.bet.three-quarters}}を払います。{{t:call|コール}}後の{{t:pot|ポット}}は{{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}なので、{{n:eq.bet-three-quarters}}です。{{t:flush-draw|フラッシュドロー}}はターンで約{{n:odds.flush.turn-river}}なので、払いすぎです。"
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "ターン。あなたはセットで、{{n:ex.pot}}の{{t:pot|ポット}}に{{n:ex.bet.quarter}}だけベットします。相手は{{t:flush-draw|フラッシュドロー}}です（リバーまでに約{{n:odds.flush.turn-river}}）。ここから何が言えますか？"
    options:
      - { text: "良い価格が得られる：必要なのは{{n:eq.bet-quarter}}だけ", correct: true, why: "はい。{{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}で、相手の{{n:odds.flush.turn-river}}より少ないです。相手にとって{{t:call|コール}}は得になり、あなたは小さなベットでバリューの一部を手放します。" }
      - { text: "{{n:eq.bet-three-quarters}}が必要なので{{t:fold|フォールド}}するしかない", why: "それは{{t:pot|ポット}}の3/4のベットに対して必要な数字です。{{t:pot|ポット}}の1/4のベットなら、{{n:eq.bet-quarter}}で足ります。" }
      - { text: "どうせ勝っているので、価格は関係ない", why: "今は勝っていますが、約{{n:odds.flush.turn-river}}の確率で相手がリバーで勝ちます。ベットサイズによって、相手がそのチャンスに払いすぎるか、払い足りないかが決まります。" }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "ターンで相手は{{t:oesd|OESD}}を持っています。リバーまでに約{{n:odds.oesd.turn-river}}です。あなたのベットがどのサイズから、相手は払いすぎになりますか（ポットオッズだけで計算）？"
    options:
      - { text: "{{t:pot|ポット}}の1/3からもう払いすぎ：必要なのは{{n:eq.bet-third}}", correct: true, why: "はい。{{n:eq.bet-third}}は{{n:odds.oesd.turn-river}}より大きいです。ターンでは{{t:draw|ドロー}}に残るカードは1枚だけなので、中程度のベットでも悪い価格になります。" }
      - { text: "{{t:pot|ポット}}全額からでないと払いすぎにならない：必要なのは{{n:eq.bet-pot}}", why: "{{t:pot|ポット}}全額なら大きく払いすぎですが、{{t:pot|ポット}}の1/3でもすでに{{n:eq.bet-third}}が必要で、自分の{{n:odds.oesd.turn-river}}を上回ります。" }
      - { text: "払いすぎにはならない。{{t:draw|ドロー}}はいつでも{{t:call|コール}}できる", why: "{{t:draw|ドロー}}が{{t:call|コール}}するのは、価格が良いときか、インプライドオッズがあるときだけです（次のレッスン）。ターンでは約{{n:odds.oesd.turn-river}}なので、ほとんどのベットは悪い価格になります。" }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "ターン。{{t:pot|ポット}}は{{n:ex.pot}}で、あなたは{{t:pot|ポット}}全額の{{n:ex.bet.pot}}をベットします。相手が{{t:call|コール}}するには、何パーセントのエクイティが必要ですか？数字を入力してください。"
    answer: eq.bet-pot
    explanation: "相手は{{n:ex.bet.pot}}を払います。{{t:call|コール}}後の{{t:pot|ポット}}は{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}なので、{{n:eq.bet-pot}}です。{{t:flush|フラッシュ}}（約{{n:odds.flush.turn-river}}）も、オープンエンドの{{t:straight|ストレート}}（約{{n:odds.oesd.turn-river}}）も、それほどの確率はありません。"
---
フロップでは、多くの場合ほぼ{{t:range|レンジ}}全体で小さくベットしました。ターンではベットの{{t:range|レンジ}}が変わります。非常に強いハンドと{{t:semi-bluff|セミブラフ}}が残り、中程度のハンドは{{t:check|チェック}}します。このような{{t:range|レンジ}}は{{t:polarized|ポラライズ}}されていると言います。

## {{t:range|レンジ}}の2つの種類

- **{{t:linear|リニア}}：** 最も強いハンドから下へ、中程度のハンドも含めてベットします。通常は小さなサイズで、例えば[[Ks 7d 2c]]で{{t:pot|ポット}}の{{n:cbet.size.small}}のCベットです。
- **{{t:polarized|ポラライズ}}：** 2つの極がベットします。非常に強いハンド（セット、{{t:two-pair|ツーペア}}、{{t:straight|ストレート}}、フラッシュ）と{{t:semi-bluff|セミブラフ}}（{{t:draw|ドロー}}）です。中程度のハンドは含まれません。

一般に、{{t:polarized|ポラライズ}}された{{t:range|レンジ}}は、非常に強いハンドと{{t:bluff|ブラフ}}でできています。ターンの{{t:bluff|ブラフ}}は通常{{t:semi-bluff|セミブラフ}}で、リバー（M8）ではショーダウンで勝ち目のないハンドです。

## ターンでポラライズする理由

相手はフロップで{{t:call|コール}}したので、通常は{{t:pair|ペア}}か{{t:draw|ドロー}}を持っています。バックドアのある高いカードのこともあります（M6）。中程度のハンドは、2回目のベットで何も得られません。より弱いハンドは{{t:fold|フォールド}}し、より強いハンドは払うからです。強いハンドはリバーの前に{{t:pot|ポット}}を大きくしたく、{{t:semi-bluff|セミブラフ}}は相手の{{t:fold|フォールド}}を必要とし、{{t:call|コール}}されてもアウツがあります。

## {{t:polarized|ポラライズ}}された{{t:range|レンジ}}、大きなベット

{{t:polarized|ポラライズ}}された{{t:range|レンジ}}は、例えば{{t:pot|ポット}}の3/4のように大きくベットします。強いハンドはより多くの{{t:chips|チップ}}を引き出し、{{t:semi-bluff|セミブラフ}}はその場で勝つことが多くなります。中程度のハンドは{{t:check|チェック}}します。{{t:bluff|ブラフ}}と強いハンドが同じサイズでベットすれば、相手はあなたのハンドがわかりません。

## {{t:draw|ドロー}}にとっての価格

ターンでは、{{t:draw|ドロー}}に残るカードは1枚だけです。大きなベットは、ドローに払いすぎを強います。

| あなたのベット | 相手に必要なエクイティ | {{t:flush|フラッシュ}}の確率 | オープンエンドの{{t:straight|ストレート}}の確率 |
|---|---|---|---|
| {{t:pot|ポット}}の1/4 | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|ポット}}の1/3 | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|ポット}}の1/2 | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|ポット}}の3/4 | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|ポット}}全額 | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

{{t:pot|ポット}}の1/4のベットなら、{{t:flush-draw|フラッシュドロー}}にとって良い価格です。{{t:pot|ポット}}の1/3では、価格が{{t:flush|フラッシュ}}の確率とほぼ同じになり（{{n:eq.bet-third}}対{{n:odds.flush.turn-river}}）、{{t:pot|ポット}}の1/2以上では、インプライドオッズを見込まない限り（次のレッスン）、{{t:flush|フラッシュ}}は明らかに払いすぎです。このレッスンの{{t:draw|ドロー}}の問題は、ポットオッズだけで計算します。

:::note これらのルールの出どころ
{{t:polarized|ポラライズ}}と{{t:linear|リニア}}の{{t:range|レンジ}}という概念、そして「{{t:polarized|ポラライズ}}された{{t:range|レンジ}}は大きくベットし、中程度のハンドは{{t:check|チェック}}する」というルールは、トレーニング教材に由来し、ここではヒューリスティックとして扱います。強く、かつ脆弱なハンドで大きくベットするという推奨も同様です。ソルバーはターンで小さなサイズも使います。{{t:pot|ポット}}の3/4というサイズは練習用の例であり、唯一の良いサイズではありません。表の価格は、アプリによる正確な計算です。
:::
