---
id: m5.l3
module: m5
order: 3
title: "どのくらいの頻度で、どのくらいの大きさで"
sub: "インポジションでのCベット"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}して、フロップで{{t:check|チェック}}しています。このフロップに合うプランはどれですか？"
    position: BTN
    options:
      check: "{{t:check|チェック}}を増やし、Cベットはいつもより減らす"
      small: "Cベットを頻繁に小さく：{{t:pot|ポット}}の{{n:cbet.size.small}}（{{n:cbet.btn.small}}）"
      big: "Cベットを頻繁に大きく：{{t:pot|ポット}}の{{n:cbet.size.big}}（{{n:cbet.btn.big}}）"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "慎重すぎます：{{t:dry|ドライ}}で高いフロップでは、あなたに{{t:range-advantage|レンジアドバンテージ}}があり、相手はたいていヒットしていません。{{t:check|チェック}}すると、相手にフリーカードを与えてしまいます。"
          small: "正解です：{{t:dry}}で高いフロップはあなたに有利です。小さな{{t:bet}}で相手に弱いハンドを{{t:fold|フォールド}}させるには十分で、それより弱い{{t:pair|ペア}}はそれでも{{t:call|コール}}してきます。"
          big: "アクションは正しく、サイズが違います：{{t:dry|ドライ}}なフロップでは相手の{{t:draw|ドロー}}は少なく、ヒットしなかったハンドは小さな{{t:bet}}にも{{t:fold|フォールド}}します。大きな{{t:bet}}でも{{t:fold|フォールド}}させられるハンドはほぼ同じで、リスクだけが大きくなります。{{t:pot|ポット}}の約{{n:cbet.size.small}}をベットしてください。"
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "慎重すぎます：あなたには{{t:range-advantage|レンジアドバンテージ}}があり、{{t:paired|ペアの}}フロップでは{{t:draw}}ができにくいため、{{t:pair|ペア}}のない相手は小さな{{t:bet}}でさえ払えることがまれです。"
          small: "正解です：{{t:paired|ペアの}}フロップでは頻繁に小さくベットします。{{t:pair|ペア}}のない相手が{{t:call|コール}}できるハンドを持っていることはまれで、{{t:three-of-a-kind|スリーカード}}はどちらのプレイヤーも持ちうるため、より大きなリスクを取る理由はありません。"
          big: "アクションは正しく、サイズが違います：{{t:paired|ペアの}}フロップでは{{t:three-of-a-kind|スリーカード}}をどちらも持ちうるため、大きな{{t:bet}}は割に合わず、相手の弱いハンドは小さなベットにも{{t:fold|フォールド}}します。{{t:pot|ポット}}の約{{n:cbet.size.small}}で十分です。"
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "正解です：カード同士が近い低いフロップは{{t:big-blind|ビッグブラインド}}の{{t:range|レンジ}}に当たります。相手は小さいカードのハンドを多くディフェンスしていて、あなたの高いカードはここで外れています。{{t:connected|コネクテッド}}なフロップでは相手に{{t:straight|ストレート}}と{{t:two-pair|ツーペア}}もあるので、あなたにはたいてい{{t:nuts-advantage|ナッツアドバンテージ}}がありません。高いフロップよりCベットの頻度を下げます：多くのハンドが{{t:check|チェック}}し、ベットするのは主に強いハンドと強い{{t:draw|ドロー}}です。"
          small: "頻度が高すぎます：カード同士が近い低いフロップは{{t:big-blind|ビッグブラインド}}の{{t:range|レンジ}}に当たり、{{t:connected|コネクテッド}}なフロップではあなたにはたいてい{{t:nuts-advantage|ナッツアドバンテージ}}がありません。頻繁なCベットは、小さくても、{{t:big-blind|ビッグブラインド}}に最強のハンドで先に{{t:check|チェック}}してからの{{t:raise|レイズ}}（チェックレイズ）の機会を与えます。"
          big: "頻度が高すぎ、コストも大きすぎます：このフロップは{{t:big-blind|ビッグブラインド}}の{{t:range|レンジ}}に当たり、{{t:connected|コネクテッド}}なフロップでは相手に{{t:straight|ストレート}}と{{t:two-pair|ツーペア}}もあります。自分はたいていハイカードしかないのに、頻繁に大きなCベットを打つとリスクが大きくなります。"
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}して{{t:check|チェック}}しています。あなたはキングの{{t:pair|ペア}}とジャックを持っています。どうしますか？"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Cベット{{n:cbet.btn.small}}（{{t:pot|ポット}}の{{n:cbet.size.small}}）", correct: true, why: "正解です：{{t:dry|ドライ}}なフロップでの{{t:top-pair}}（{{t:board|ボード}}で最も高いカードとの{{t:pair|ペア}}）です。小さな{{t:bet}}なら、7、2、より弱いキングから{{t:call}}をもらえ、相手には{{t:draw|ドロー}}がほとんどありません。" }
      - { text: "Cベット{{n:cbet.btn.big}}（{{t:pot|ポット}}の{{n:cbet.size.big}}）", sizeError: true, why: "アクションは正しく、サイズが違います：{{t:dry|ドライ}}なフロップでは相手に{{t:draw|ドロー}}がなく、ヒットしなかったハンドは小さな{{t:bet}}にも{{t:fold|フォールド}}します。大きな{{t:bet}}でも{{t:fold|フォールド}}させられるハンドはほぼ同じで、リスクだけが大きくなります。{{t:pot|ポット}}の約{{n:cbet.size.small}}をベットしてください。" }
      - { text: "{{t:check|チェック}}", why: "バリューを逃しています：相手には、小さな{{t:bet}}なら払うような、より弱い{{t:pair|ペア}}やエースを含むハンドが多くあります。{{t:dry|ドライ}}なフロップで{{t:top-pair|トップペア}}ならベットします。" }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}して{{t:check|チェック}}しています。あなたは{{t:draw|ドロー}}の多いフロップでジャックのセットを持っています。どうしますか？"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "Cベット{{n:cbet.btn.big}}（{{t:pot|ポット}}の{{n:cbet.size.big}}）", correct: true, why: "正解です：相手には{{t:flush-draw|フラッシュドロー}}や{{t:straight|ストレート}}ドローが多くあります（例：QT、AQ、ハート2枚）。大きな{{t:bet}}で、次のカードに高い代償を払わせます。" }
      - { text: "Cベット{{n:cbet.btn.small}}（{{t:pot|ポット}}の{{n:cbet.size.small}}）", sizeError: true, why: "アクションは正しく、サイズが違います：小さな{{t:bet}}は相手の{{t:draw|ドロー}}に安くカードを見せることになり、あなたのセットはフラッシュや{{t:straight|ストレート}}に負けるおそれがあります。{{t:draw|ドロー}}が多いときは大きくベットしてください。" }
      - { text: "相手を怖がらせないように{{t:check|チェック}}", why: "{{t:draw|ドロー}}が多いとき、フリーカードはドローへのプレゼントです。非常に強いハンドなら、すぐに{{t:pot|ポット}}を大きくします。" }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}して{{t:check|チェック}}しています。フロップは{{t:paired|ペア}}になっています。どのプランが合っていますか？"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "Cベットを頻繁に小さく", correct: true, why: "正解です：あなたには{{t:range-advantage|レンジアドバンテージ}}があり、{{t:paired|ペアの}}フロップでは{{t:draw}}ができにくいため、{{t:pair|ペア}}のない相手は小さな{{t:bet}}でさえ払えることがまれです。また、あなたにはAAやKKなど高い{{t:pair|ペア}}も多く、{{t:big-blind}}は{{t:call|コール}}しただけの場合、たいていそれを持っていません。" }
      - { text: "Cベットを頻繁に大きく", sizeError: true, why: "アクションは正しく、サイズが違います：{{t:three-of-a-kind|スリーカード}}はどちらも持ちうるため、大きな{{t:bet}}は割に合わず、{{t:pair|ペア}}のない相手は小さなベットにも{{t:fold|フォールド}}します。頻繁に小さくベットしてください。" }
      - { text: "ベットより{{t:check|チェック}}を多くする", why: "慎重すぎます：{{t:paired|ペアの}}高いフロップはあなたに有利で、相手はここでたいてい何も持っていません。" }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}して{{t:check|チェック}}しています。フロップは{{t:monotone|モノトーン}}です。どのプランが合っていますか？"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "Cベットはいつもより少なく、小さく", correct: true, why: "正解です：すでにどちらのプレイヤーも{{t:flush}}を持っている可能性があるため、あなたの{{t:nuts-advantage}}は通常の高いフロップより小さくなります。フラッシュに対して大きな{{t:pot|ポット}}を作らないよう、頻度を下げて小さなサイズでベットします。" }
      - { text: "{{t:draw|ドロー}}に払わせるため、Cベットを頻繁に大きく", why: "{{t:monotone|モノトーン}}のフロップでは大きな{{t:pot}}は危険です：相手が完成した{{t:flush}}を持っている可能性があり、ハートを持たないあなたのハンドは守りが弱くなります。" }
      - { text: "常に{{t:check|チェック}}", why: "慎重すぎます：高いフロップは依然としてあなたに有利で、一部のハンド（例：高いハートを持つハンド）は喜んで小さくベットします。" }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:pot|ポット}}には{{n:ex.pot}}あります。あなたはハンドが何もない状態で{{n:cbet.ex.small}}をベットします。この{{t:bet}}が損益ゼロになるには、相手が何％の確率で{{t:fold|フォールド}}する必要がありますか？数字を入力してください。"
    answer: alpha.cbet.small
    explanation: "{{n:ex.pot}}を獲得するために{{n:cbet.ex.small}}をリスクにさらします。しきい値はベット ÷ ({{t:pot}} + ベット)です：{{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}。相手はこれよりはるかに高い頻度でフロップにヒットしないため、小さなCベットはこれほど頻繁に利益になります。"
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:pot|ポット}}には{{n:ex.pot}}あります。あなたはハンドが何もない状態で{{n:cbet.ex.big}}をベットします。この{{t:bet}}が損益ゼロになるには、相手が何％の確率で{{t:fold|フォールド}}する必要がありますか？数字を入力してください。"
    answer: alpha.cbet.big
    explanation: "{{n:ex.pot}}を獲得するために{{n:cbet.ex.big}}をリスクにさらします：{{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}。大きな{{t:bluff|ブラフ}}は、小さなブラフ（{{n:alpha.cbet.small}}）よりはるかに高い頻度で成功する必要があります。"
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "{{t:dry|ドライ}}なフロップで、勝ち目のないハンドによる{{t:pot|ポット}}の{{n:cbet.size.small}}のCベットが、{{t:pot|ポット}}の{{n:cbet.size.big}}のCベットより利益になることが多いのはなぜですか？"
    options:
      - { text: "小さな{{t:bet}}に必要なフォールドは{{n:alpha.cbet.small}}だけで、大きなベットでは{{n:alpha.cbet.big}}必要だから", correct: true, why: "正解です：{{t:dry|ドライ}}なフロップでは、相手の最も弱いハンド（{{t:pair|ペア}}も{{t:draw|ドロー}}もない）はどちらのサイズにも{{t:fold|フォールド}}するため、小さな{{t:bet}}なら同じ効果をより安く得られます。" }
      - { text: "小さな{{t:bet}}は必ず{{t:fold}}を引き出すから", why: "違います：相手はどんな{{t:pair|ペア}}でも小さな{{t:bet}}を{{t:call|コール}}します。小さな{{t:bet}}は単にリスクが小さいので、必要な{{t:fold|フォールド}}も少なくて済みます。" }
      - { text: "大きな{{t:bet}}は常に間違いだから", why: "違います：{{t:wet|ウェット}}なフロップや{{t:nuts-advantage|ナッツアドバンテージ}}があるときは、大きな{{t:bet}}が最善のこともあります。ただし{{t:dry|ドライ}}なフロップでは、より大きなリスクに見合うものを何ももたらしません。" }
---
Cベット（コンティニュエーション{{t:bet|ベット}}）とは、プリフロップで最後に{{t:raise|レイズ}}したプレイヤーがフロップで行う{{t:bet}}です。このレッスンでは{{t:in-position}}でプレイします：ボタンから{{t:open|オープン}}し、{{t:big-blind}}が{{t:call|コール}}して、フロップで{{t:check|チェック}}しています。フロップでの{{t:pot|ポット}}は{{n:bb.pot-after.vs-btn}}です。問題は2つ：どのくらいの頻度でベットするか、そしてどのくらいの大きさでベットするかです。

## {{t:dry|ドライ}}で高いフロップ：頻繁に小さく

[[Ks 7d 2c]]のようなフロップでは、あなたに{{t:range-advantage|レンジアドバンテージ}}があり、相手には{{t:draw|ドロー}}がほとんどありません。頻繁に小さく、{{t:pot|ポット}}の約{{n:cbet.size.small}}、つまり約{{n:cbet.btn.small}}をベットします。小さな{{t:bet}}で、相手にヒットしなかったハンドを{{t:fold|フォールド}}させるには十分で、それより弱い{{t:pair|ペア}}はそれでも{{t:call|コール}}してきます。大きな{{t:bet}}でも{{t:fold|フォールド}}させられるハンドはほぼ同じで、リスクだけが大きくなります。

典型的な小さなCベットは{{t:pot|ポット}}の約{{n:cbet.range.small.low}}–{{n:cbet.range.small.high}}、大きなCベットは約{{n:cbet.range.big.low}}–{{n:cbet.range.big.high}}です（トレーニング教材）。ソルバーは通常{{n:cbet.size.small}}と{{n:cbet.solver.big.low}}–{{n:cbet.size.big}}を使い、一部のフロップでは{{t:overbet|オーバーベット}}、つまり{{t:pot|ポット}}全体より大きな{{t:bet|ベット}}も使います（公開されているソルバーの結果）。

## {{t:draw|ドロー}}の多いフロップ：頻度は下げ、サイズは大きく

[[Kh Jh 7c]]のようなフロップでは、相手には{{t:flush-draw|フラッシュドロー}}や{{t:straight|ストレート}}ドローが多くありますが、まだ{{t:straight}}はできません。強いハンドと強い{{t:draw|ドロー}}は、{{t:draw|ドロー}}に次のカードの代償を高く払わせるため、{{t:pot|ポット}}の{{n:cbet.size.big}}などの大きなサイズでベットします。{{t:draw|ドロー}}のない中程度のハンドは{{t:check|チェック}}することが多くなります。[[Jh Th 8c]]のように{{t:straight}}がすでに可能な場合は、相手がそれを持っている可能性があるため、ソルバーはそこではより小さなサイズでベットします。

## {{t:paired|ペアボード}}と{{t:monotone}}

[[Qd Qs 6h]]のような{{t:paired|ペアの}}フロップでは、あなたに{{t:range-advantage|レンジアドバンテージ}}があり、{{t:draw}}ができにくいため、{{t:pair|ペア}}のない相手が{{t:call|コール}}できることはまれです。頻繁に小さくベットします：{{t:three-of-a-kind|スリーカード}}はどちらも持ちうるため、大きな{{t:bet}}は割に合いません。[[Kh 8h 3h]]のような{{t:monotone|モノトーン}}のフロップでは、すでに誰でも{{t:flush}}を持っている可能性があるため、いつもより頻度を下げて小さくベットします。

注意：「{{t:wet}}」は「大きなベット」という意味ではありません。アプリでは{{t:monotone|モノトーン}}のフロップは常に{{t:wet}}とされますが、それでもソルバーはそこでまれに、小さなサイズでベットします（公開されているソルバーの結果）。サイズが{{t:wetness|ウェット度}}とともに大きくなるのはある程度までです：[[Qd 8d 7d]]のような最も{{t:wet|ウェット}}なフロップでは、再び小さくなります。前のセクションの大きなサイズは、{{t:draw|ドロー}}が多く、まだ{{t:straight}}ができないフロップ（アプリでは通常、中間のもの）に当てはまります。

## カード同士が近い低いフロップ：{{t:check|チェック}}を増やす

[[7s 6h 5d]]では、{{t:big-blind}}の{{t:range|レンジ}}に{{t:straight|ストレート}}と{{t:two-pair|ツーペア}}があり、あなたには{{t:nuts-advantage|ナッツアドバンテージ}}がありません（アドバンテージのレッスン）。ほかの低い{{t:connected|コネクテッド}}なフロップでもたいてい同様です。低い{{t:semi-connected|セミコネクテッド}}なフロップではまだ{{t:straight|ストレート}}はできませんが、それでもフロップは{{t:big-blind}}が多くディフェンスする小さいカードのハンドに当たり、あなたの高いカードは外れています。高いフロップよりCベットの頻度を下げます：多くのハンドが{{t:check|チェック}}し、ベットするのは主に非常に強いハンドと強い{{t:draw|ドロー}}です。

## 相手はどのくらい{{t:fold|フォールド}}する必要があるか

ハンドが何もない{{t:bet|ベット}}は、相手がベット ÷ ({{t:pot}} + ベット)の割合で{{t:fold|フォールド}}すれば損益ゼロになります。{{t:pot|ポット}}の{{n:cbet.size.small}}なら{{n:alpha.cbet.small}}、{{t:pot|ポット}}の{{n:cbet.size.big}}ならすでに{{n:alpha.cbet.big}}です。{{t:pair|ペア}}のないハンドがフロップにヒットしない確率は約{{n:flop.miss.unpaired}}で、そのため小さなCベットはこれほど頻繁に利益になります。

:::note このルールの根拠
方向性（{{t:dry}}フロップ：小さく頻繁に、{{t:straight|ストレート}}が完成していない{{t:draw|ドロー}}の多いフロップ：大きく頻度を下げて、{{t:straight}}がすでに可能：小さく、{{t:paired|ペア}}：小さく、{{t:monotone}}：頻度を下げて小さく）は、トレーニング教材と公開されているソルバーの結果に基づく一般的なルールで、ヒューリスティックとして示しています。{{t:pot|ポット}}の{{n:cbet.size.small}}と{{n:cbet.size.big}}というサイズは、上に挙げた範囲からの例です（ベットサイズに関するトレーニング教材、公開されているソルバーの結果）。アプリがベットの頻度をパーセントで示さないのは、そのような数字がソルバーの結果に由来するためです。
:::
