---
id: m5.l1
module: m5
order: 1
title: "フロップのテクスチャー"
sub: "高さ、スート、つながり"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "次のうち{{t:connected|コネクテッド}}なフロップ、つまりすでに{{t:straight|ストレート}}が可能なフロップはどれですか？"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "はい。9、7、6は連続する5つのランクの中に収まります。例えば85やT8で{{t:straight|ストレート}}になります。" }
      - { text: "[[Ks 8d 3c]]", why: "いいえ。3からキングまでは離れすぎています。ここではどの2枚でも{{t:straight|ストレート}}になりません。" }
      - { text: "[[Qd Qs 9h]]", why: "いいえ。このフロップは{{t:paired|ペアボード}}です。手札2枚と{{t:board|ボード}}上の{{t:pair|ペア}}では{{t:straight|ストレート}}は作れません。{{t:straight|ストレート}}には5つの異なるランクが必要だからです。" }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "フロップは{{t:monotone|モノトーン}}です。3枚すべてが同じスートです。これは何を意味しますか？"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "そのスートのカードを2枚持つプレイヤーはすでに{{t:flush|フラッシュ}}です", correct: true, why: "はい。{{t:board|ボード}}にハートが3枚、手札に2枚で、同じスートが5枚になります。ハートを1枚持つプレイヤーは{{t:flush-draw|フラッシュドロー}}です。" }
      - { text: "まだ誰も{{t:flush|フラッシュ}}を持つことはできません", why: "いいえ。{{t:flush|フラッシュ}}には5枚必要ですが、3枚はすでに{{t:board|ボード}}に出ています。手札に2枚あれば十分です。" }
      - { text: "{{t:flush|フラッシュ}}はターン以降でないと可能になりません", why: "いいえ。それは{{t:two-tone|ツートーン}}のフロップの場合です。{{t:monotone|モノトーン}}のフロップでは、すでに{{t:flush|フラッシュ}}が完成している可能性があります。" }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "あなたの手札は[[Ac Kd]]、フロップは[[Ks 7d 2c]]です。このようなフロップでは、良いキッカーの{{t:pair|ペア}}が{{t:wet|ウェット}}なフロップよりも安全なのはなぜですか？"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "相手には{{t:draw|ドロー}}がまったくないので、この先のカードでリードが入れ替わることは少ないから", correct: true, why: "はい。フロップは{{t:rainbow|レインボー}}で、{{t:straight|ストレート}}も不可能です。今負けている相手のアウツは通常わずかです。{{t:three-of-a-kind|スリーカード}}や{{t:two-pair|ツーペア}}になる数枚のカードだけで、{{t:pair|ペア}}がなければ良いカードが2枚続けて必要です。" }
      - { text: "{{t:dry|ドライ}}なフロップでは相手は必ず{{t:fold|フォールド}}するから", why: "いいえ。7、2、または弱いキングを持つ相手は{{t:call|コール}}することがあります。{{t:dry|ドライ}}なフロップが示すのは{{t:draw|ドロー}}についてであり、相手が{{t:fold|フォールド}}するかどうかではありません。" }
      - { text: "キングの{{t:pair|ペア}}は必ずリバーまで勝ち続けるから", why: "いいえ。相手はすでにセットや{{t:two-pair|ツーペア}}を持っているかもしれません。{{t:dry|ドライ}}なフロップは、誰かに追いつかれるリスクを減らすだけです。" }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
フロップの後、各プレイヤーには自分の7枚のうち5枚がすでに見えています。{{t:board|ボード}}の3枚がプレイヤーのハンドとどう噛み合うかを、フロップの{{t:texture|テクスチャー}}と呼びます。{{t:texture|テクスチャー}}によって、誰がヒットしやすいか、ベットする価値があるかが決まります。Cベット（プリフロップで{{t:raise|レイズ}}した後のフロップでの{{t:bet|ベット}}）を学ぶ前に、4つの軸でフロップを読めるようになりましょう。

## 高さ

一番高いカードを見ます。**ハイ**フロップは一番高いカードがエース、キング、クイーンのいずれかです。例：[[Ks 7d 2c]]。**ミドル**フロップは一番高いカードがジャックか10です。例：[[Jh 8c 4d]]。**ロー**フロップは一番高いカードが9以下です。例：[[7s 6h 5d]]。

## スート

**{{t:rainbow|レインボー}}**のフロップは3つとも異なるスートです。まだ誰も{{t:flush-draw|フラッシュドロー}}を持っていません。**{{t:two-tone|ツートーン}}**のフロップは2枚が同じスートです。例：[[Jh Th 8c]]。そのスートのカードを2枚持つプレイヤーは{{t:flush-draw|フラッシュドロー}}になります。**{{t:monotone|モノトーン}}**のフロップは3枚すべてが同じスートです。例：[[Kh 8h 3h]]。{{t:flush|フラッシュ}}がすでに完成している可能性があります。

## ランク

**{{t:paired|ペアボード}}**のフロップは同じランクのカードが2枚あります。例：[[Qd Qs 6h]]。このフロップでは手札2枚で{{t:straight|ストレート}}を持つ人はいませんが、{{t:straight-draw|ストレートドロー}}は可能な場合があります（例：Q-Q-9）。

**{{t:connected|コネクテッド}}**なフロップは、3つの異なるランクが連続する5つのランクの中に収まっているので、すでに{{t:straight|ストレート}}が可能です。[[9h 7d 6c]]では、例えば85やT8で{{t:straight|ストレート}}になります。エースは1としても数えるので、[[Ah 5d 3c]]も{{t:connected|コネクテッド}}です。

**{{t:semi-connected|セミコネクテッド}}**なフロップは、フロップのカードのうち2枚だけが連続する5つのランクの中に収まっています。まだ誰も{{t:straight|ストレート}}を持っていませんが、{{t:straight-draw|ストレートドロー}}（オープンエンドまたはガットショット）を持っている人がいるかもしれません。[[Kh Qd 4c]]では、例えばJTがそれに当たります。近いカードが2枚あれば十分なので、このようなフロップは多くあります。

**{{t:disconnected|ディスコネクテッド}}**なフロップは、カード同士が離れていて、どの2枚も連続する5つのランクに収まりません。例：[[Ks 8d 3c]]。ここでは{{t:straight-draw|ストレートドロー}}すら誰も持っていません。このようなフロップは少数です。

## {{t:dry|ドライ}}か{{t:wet|ウェット}}か

{{t:wetness|ウェット度}}のポイント、つまりフロップが{{t:draw|ドロー}}や、フラッシュ・{{t:straight|ストレート}}のような強い役にどれだけ向いているかを数えます。

- すでに{{t:straight|ストレート}}が複数の方法で可能、つまり手札の2つのランクの組み合わせが少なくとも2通りある（[[9h 8d 7c]]ではJT、T6、65で完成）：{{n:tex.points.straight.made}}点
- {{t:straight|ストレート}}が1通りだけ可能（[[Ah Kd Tc]]ではQJのみ、[[Ah 4d 2c]]では53のみ）：{{n:tex.points.straight.made-one}}点
- {{t:straight-draw|ストレートドロー}}のみ（{{t:semi-connected|セミコネクテッド}}なフロップ、または近いカードが2枚ある{{t:paired|ペアボード}}）：{{n:tex.points.straight.draw}}点
- 同じスートが2枚：{{n:tex.points.suits.two-tone}}点、同じスートが3枚：{{n:tex.points.suits.monotone}}点

**{{t:dry|ドライ}}**なフロップは{{n:tex.threshold.medium}}点未満、**{{t:wet|ウェット}}**なフロップは{{n:tex.threshold.wet}}点以上で、その間が**中間**です。

| フロップ | スート | {{t:straight|ストレート}} | 合計 | {{t:texture|テクスチャー}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|ドライ}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|ドライ}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|ドライ}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|ドライ}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | 中間 |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | 中間 |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|ウェット}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|ウェット}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|ウェット}} |

完成した{{t:straight|ストレート}}は、{{t:draw|ドロー}}だけの場合より重く数えます。今この時点で力関係を変えるからです。複数の方法で可能な{{t:straight|ストレート}}は、1通りだけ可能な{{t:straight|ストレート}}より重く数えます。[[9h 8d 7c]]では多くのハンドが{{t:straight|ストレート}}か{{t:oesd|OESD}}を持ちますが、[[Ah Kd Tc]]では{{t:straight|ストレート}}になるのはQJだけで、オープンエンドの{{t:draw|ドロー}}は誰も持っていません。そのため、3スートのA-K-Tは{{t:connected|コネクテッド}}でも中間になります。

{{t:two-tone|ツートーン}}の[[Kh 7h 2c]]は、{{t:flush-draw|フラッシュドロー}}が1つある{{t:dry|ドライ}}なフロップです。{{t:straight|ストレート}}も{{t:straight-draw|ストレートドロー}}もありません。{{t:monotone|モノトーン}}のフロップは常に{{t:wet|ウェット}}です。[[Kh 8h 3h]]で{{t:flush|フラッシュ}}か{{t:flush-draw|フラッシュドロー}}を持つハンドは、[[9h 8d 7c]]で{{t:straight|ストレート}}か{{t:oesd|OESD}}を持つハンドより多いからです。

{{t:dry|ドライ}}なフロップでは、リードしている人は通常リバーまでリードを保ちます。{{t:wet|ウェット}}なフロップでは、この先のカードで力関係がよく変わるので、フロップで最強のハンドもそれほど安全ではありません。

:::note これらの定義の出典
{{t:dry|ドライ}}と{{t:wet|ウェット}}という概念はポーカーの文献に由来します。教材では、例えば3スートのK-7-2、A-9-4、A-A-6が{{t:dry|ドライ}}、9-8-7、Q-J-T、T-9-5-4が{{t:wet|ウェット}}の例として挙げられています。ポイントと正確な境界（例えばミドルフロップは10から始まること）は、どのフロップも一義的に判定できるようにアプリで採用した取り決めです。出典にはポイントの境界はなく、{{t:dry|ドライ}}でも{{t:wet|ウェット}}でもないフロップを何と呼ぶかも決まっていません。この取り決めでは、全フロップのうち{{t:dry|ドライ}}が約{{n:tex.share.dry}}、中間が約{{n:tex.share.medium}}、{{t:wet|ウェット}}が約{{n:tex.share.wet}}です。これはアプリの定義から出た結果であり、文献の数値ではありません。
:::
