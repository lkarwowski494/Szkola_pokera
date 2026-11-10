---
id: m8.l3
module: m8
order: 3
title: "ブロッカー"
sub: "どのハンドでブラフするか"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "{{t:blocker|ブロッカー}}とは何ですか？"
    options:
      - { text: "自分のハンドにあり、相手のあるハンドの{{t:combo|コンボ}}を減らすカード", correct: true, why: "あなたが持っているカードを、相手は持てません。あなたがエースを持っていれば、相手のエースは減ります。エースの{{t:pair|ペア}}も、AKも、エースを含むフラッシュも減ります。" }
      - { text: "{{t:board|ボード}}にあり、{{t:draw|ドロー}}を台無しにするカード", why: "{{t:board|ボード}}のカードについて俗にそう言うこともありますが、この意味での{{t:blocker|ブロッカー}}は自分のハンドにあるカードです。{{t:board|ボード}}のカードは両方のプレイヤーに見えています。" }
      - { text: "相手の大きなベットを止めるための小さなベット", why: "それはいわゆるブロッキングベットで、別のものです。{{t:blocker|ブロッカー}}は、相手の{{t:combo|コンボ}}の数を減らす、自分のハンドにあるカードです。" }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "何も情報がなければ、AKは{{n:combos.unpaired}}{{t:combo|コンボ}}あります。あなたはキングを持っています（エースはなし）。相手が持ちうるAKは何{{t:combo|コンボ}}ですか？数字を入力してください。"
    answer: combos.unpaired.one-blocked
    explanation: "エースは{{n:cards.suits}}枚あり、キングは1枚があなたの手にあるので残り{{n:pair.outs.per-rank}}枚です。{{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}。1枚のカードで{{t:combo|コンボ}}のちょうど4分の1が消えます。"
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "エースの{{t:pair|ペア}}は{{n:combos.pair}}{{t:combo|コンボ}}あります。あなたはエースを1枚持っています。相手が持ちうるエースの{{t:pair|ペア}}は何{{t:combo|コンボ}}ですか？数字を入力してください。"
    answer: combos.pair.one-blocked
    explanation: "残りのエースは{{n:pair.outs.per-rank}}枚で、3枚のカードから作れる{{t:pair|ペア}}は{{n:combos.pair.one-blocked}}通りだけです。手の中のエース1枚で、AAの{{t:combo|コンボ}}が半分消えます。"
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "あなたは[[Ah Kc]]を持っています。相手が持ちうるAKは何{{t:combo|コンボ}}ですか？"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "残りはエース{{n:pair.outs.per-rank}}枚とキング{{n:pair.outs.per-rank}}枚です。{{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}。" }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "それはエースだけ、またはキングだけを持っている場合の数です。あなたは両方のランクをブロックしています。" }
      - { text: "{{n:combos.unpaired}}", why: "それは自分のカードを見る前に、デッキにあるAKの{{t:combo|コンボ}}の数です。あなたのエースとキングは、相手の手にはありえません。" }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "リバーで3枚目のハートが落ち、{{t:flush|フラッシュ}}が可能になりました。{{t:big-blind|ビッグブラインド}}は{{t:check|チェック}}しました。あなたの手はエースハイだけで、ブラフしたいと考えています。どちらのハンドのほうが良い{{t:bluff|ブラフ}}になりますか？"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "ハートのエースは、相手の最も強いフラッシュをブロックします。相手はエースを含む{{t:flush|フラッシュ}}を持てず、それは必ず払ってくるハンドです。相手が{{t:call|コール}}できるハンドが減るので、{{t:bluff|ブラフ}}が成功しやすくなります。" }
      - { text: "[[Ad 3c]]", why: "ショーダウンでの強さは同じですが、どの{{t:flush|フラッシュ}}もブロックしていません。相手は払ってくるフラッシュをすべて持ったままです。" }
      - { text: "違いはない。どちらもエースハイだけ", why: "ショーダウンではその通りですが、{{t:bluff|ブラフ}}としては違います。ハートのエースは、確実に払ってくる相手のフラッシュの数を減らします。" }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "スペードの{{t:flush-draw|フラッシュドロー}}は外れました。{{t:big-blind|ビッグブラインド}}はリバーでチェックしました。どちらのハンドもクイーンとエイトだけです。どちらでブラフするほうが良いですか？"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "スペードがないので、相手の外れた{{t:draw|ドロー}}をブロックしません。それらはあなたのベットに{{t:fold|フォールド}}するハンドです。両ハンドのそれ以外のカードは同じです。" }
      - { text: "[[Qd 8s]]", why: "スペードのエイトは、相手が{{t:fold|フォールド}}するはずの外れた{{t:flush-draw|フラッシュドロー}}の一部（例：[[8s 7s]]）をブロックします。相手には、払ってくるハンドが相対的に多く残ります。" }
      - { text: "違いはない", why: "違いはエイトのスートにあります。手の中のスペードは、相手がフォールドするハンドの一部を奪います。" }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "同じ状況です。スペードは外れ、{{t:big-blind|ビッグブラインド}}は{{t:check|チェック}}しました。あなたの手は次の2つのうちどちらかです。どちらで{{t:bluff|ブラフ}}し、どちらで{{t:check|チェック}}しますか？"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qc Jd]]で{{t:bluff|ブラフ}}し、[[9c 8c]]で{{t:check|チェック}}する", correct: true, why: "9の{{t:pair|ペア}}は、{{t:check|チェック}}した後、外れた{{t:draw|ドロー}}に勝ちます。クイーンとジャックはほぼすべてのハンドに負けるので、{{t:bluff|ブラフ}}でしか{{t:pot|ポット}}を獲れません。" }
      - { text: "[[9c 8c]]で{{t:bluff|ブラフ}}し、[[Qc Jd]]で{{t:check|チェック}}する", why: "逆です。9の{{t:pair|ペア}}で{{t:bluff|ブラフ}}するとショーダウンでの勝ちを手放し、クイーンとジャックで{{t:check|チェック}}すると戦わずに{{t:pot|ポット}}を手放します。" }
      - { text: "両方で{{t:bluff|ブラフ}}する", why: "9の{{t:pair|ペア}}に{{t:bluff|ブラフ}}は必要ありません。{{t:check|チェック}}した後、多くのハンドに勝てます。{{t:bluff|ブラフ}}するのは、ショーダウンバリューのないハンドです。" }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "ショーダウンバリューのないハンドの中から、リバーの{{t:bluff|ブラフ}}を選びます。手の中のどのカードが最も役立ちますか？"
    options:
      - { text: "相手が払ってくるハンドに含まれるカード", correct: true, why: "相手のバリューをブロックします。相手の強いハンドが減るので、相手にフォールドするハンドが残ることが多くなります。" }
      - { text: "外れた{{t:draw|ドロー}}のスートのカード", why: "そのカードは、相手が{{t:fold|フォールド}}するハンドをブロックします。その場合、{{t:bluff|ブラフ}}が成功しにくくなります。" }
      - { text: "ボードに関係なく、最も高いカード", why: "高いカードはショーダウンで少し強さを与えますが、何をブロックしているかについては何も教えてくれません。相手のどのハンドが払ってくるかを見てください。" }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "リバーで3枚目のハートが落ちました。{{t:big-blind|ビッグブラインド}}は{{t:check|チェック}}しました。あなたは9の{{t:pair|ペア}}とハートのエースを持っています。どうしますか？"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|チェック}}", correct: true, why: "9の{{t:pair|ペア}}は、{{t:check|チェック}}した後、{{t:pair|ペア}}のない相手のハンドの多くに勝ちます。{{t:blocker|ブロッカー}}があっても、ショーダウンバリューのあるハンドは良い{{t:bluff|ブラフ}}にはなりません。まず勝ち目のないハンドを選び、{{t:blocker|ブロッカー}}を見るのはその後です。" }
      - { text: "ハートのエースがあるので{{t:bluff|ブラフ}}としてベット", why: "ハートのエースは良い{{t:blocker|ブロッカー}}ですが、9の{{t:pair|ペア}}で{{t:bluff|ブラフ}}すると損をします。弱いハンドはどうせ{{t:fold|フォールド}}し、フラッシュやキングは払ってきます。" }
      - { text: "{{t:value|バリュー}}でベット", why: "もっと弱いハンドで誰が払ってくるでしょうか？フラッシュが可能な{{t:board|ボード}}では、9の{{t:pair|ペア}}より弱いハンドはほぼ必ず{{t:fold|フォールド}}します。" }
---
前回のレッスンでは、{{t:bluff|ブラフ}}がいくつ必要か、そしてショーダウンで勝ち目のないハンドで{{t:bluff|ブラフ}}することを確認しました。そうしたハンドは、必要な数より多いことがよくあります。そのとき選択を決めるのが**{{t:blocker|ブロッカー}}**です。

## {{t:blocker|ブロッカー}}

あなたが持っているカードを、相手は持てません。そのため、相手はそのカードを含むハンドの{{t:combo|コンボ}}が少なくなります。

| 相手のハンド | {{t:blocker|ブロッカー}}なし | そのランクのカードを1枚持っている |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

エースとキングの両方を持っていれば、相手のAKは{{n:combos.unpaired.both-blocked}}{{t:combo|コンボ}}だけです。

## 相手が払ってくるハンドをブロックする

良い{{t:bluff|ブラフ}}は、相手が**{{t:call|コール}}**してくるハンドに含まれるカードを持っています。例：リバーで3枚目のハートが落ちました。手の中にハートのエースがあれば、相手はエースを含む{{t:flush|フラッシュ}}、つまり必ず払ってくるハンドを持っていません。相手にはフォールドするハンドがより多く残ります。

## 相手が{{t:fold|フォールド}}するハンドをブロックしない

{{t:flush-draw|フラッシュドロー}}が**外れた**とき、相手は外れた{{t:draw|ドロー}}を{{t:fold|フォールド}}します。あなたがそのスートのカードを持っていると、そうしたハンドが減るので、あなたの{{t:bluff|ブラフ}}が払ってくるハンドに当たることが多くなります。似た2つの{{t:bluff|ブラフ}}なら、外れた{{t:draw|ドロー}}のスートのカードを含まないほうを選びます。

## まずショーダウンでの強さ

順序は決まっています。まず{{t:check|チェック}}した後に勝てるハンドを除き、残りの中から最も良い{{t:blocker|ブロッカー}}を持つ{{t:bluff|ブラフ}}を選びます。良い{{t:blocker|ブロッカー}}があっても、ショーダウンで勝てる{{t:pair|ペア}}は{{t:bluff|ブラフ}}にはなりません。{{t:blocker|ブロッカー}}は似たハンド同士の選択を傾けるものです。効果自体は小さいので、決め手になるのはハンドの強さが同程度のときだけです（次のレッスンの{{t:call|コール}}の選択でも同じです）。

:::note このルールの根拠
{{t:combo|コンボ}}の数は組み合わせ論によるものです。{{t:blocker|ブロッカー}}に基づいて{{t:bluff|ブラフ}}を選ぶルールは、カリキュラム、トレーニング教材、ソルバーの分析に基づいています。ほかの{{t:bluff|ブラフ}}が足りないときは、ソルバーは外れたフラッシュでも{{t:bluff|ブラフ}}します。
:::
