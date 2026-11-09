---
id: m10.l1
module: m10
order: 1
title: "HUDのスタッツ"
sub: "VPIPとPFRが測るもの、必要なハンド数"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "あなたは{{t:big-blind|ビッグブラインド}}です。2人のプレイヤーがリンプし、あなたは{{t:check|チェック}}してフロップを見ます。このハンドであなたの{{t:vpip}}は上がりますか？"
    options:
      - { text: "いいえ。自分の意思では{{t:chips|チップ}}を1枚も追加していません", correct: true, why: "{{t:vpip}}が数えるのは、フロップ前の自発的な投入、つまり{{t:call}}か{{t:raise}}だけです。{{t:big-blind|ビッグブラインド}}は強制的な支払いで、{{t:check}}には何もかかりません。" }
      - { text: "はい。フロップをプレイするので、プレイしたハンドとして数えられます", why: "フロップを見るだけでは足りません。{{t:vpip}}が上がるのは、フロップ前に自分で{{t:chips|チップ}}を追加したときだけです。" }
      - { text: "はい。{{t:pfr}}も上がります", why: "{{t:pfr}}が上がるのは、フロップ前に{{t:raise|レイズ}}したときだけです。ここでは誰も{{t:raise|レイズ}}しておらず、あなたは{{t:check|チェック}}しただけです。" }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "友人がメモを見せてくれました。相手は{{t:vpip}} {{n:hud.ex.wrong.vpip}}、{{t:pfr}} {{n:hud.ex.wrong.pfr}}です。これをどう考えますか？"
    options:
      - { text: "ありえません。{{t:pfr}}が{{t:vpip}}より大きくなることはありません", correct: true, why: "フロップ前の{{t:raise|レイズ}}はすべて自発的な投入でもあるので、両方のスタッツに数えられます。{{t:pfr}}は常に{{t:vpip}}以下です。友人が数字を取り違えています。" }
      - { text: "ほとんど{{t:call|コール}}しない、非常にアグレッシブなプレイヤーです", why: "まったく{{t:call|コール}}しないプレイヤーは、{{t:pfr}}が{{t:vpip}}と等しくなりますが、上回ることはありません。{{t:pfr}}のほうが大きいなら記録ミスです。" }
      - { text: "パッシブなプレイヤーです", why: "パッシブさは、{{t:pfr}}が{{t:vpip}}よりずっと小さいことに表れます。大きいことではありません。" }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "相手は{{t:vpip}} {{n:mda.rec.vpip}}、{{t:pfr}} {{n:mda.rec.pfr}}です。プレイはするが{{t:raise|レイズ}}しないハンドで、相手は何をしていますか？"
    options:
      - { text: "{{t:call|コール}}かリンプです。差の{{n:mda.rec.gap}}がそのハンドです", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}。これらのハンドは{{t:raise|レイズ}}せずに{{t:pot|ポット}}に入れています。リンプするか、他のプレイヤーの{{t:open|オープン}}に{{t:call|コール}}しています。" }
      - { text: "フロップ前に{{t:fold|フォールド}}しています", why: "フロップ前にフォールドしたハンドは、{{t:vpip}}にまったく数えられません。{{t:vpip}} − {{t:pfr}}の差は、{{t:raise|レイズ}}せずにプレイしたハンドです。" }
      - { text: "{{t:all-in|オールイン}}でプレイしています", why: "フロップ前のオールインも{{t:raise|レイズ}}なので、{{t:pfr}}が上がるはずです。差は、{{t:call|コール}}しただけか、リンプしただけのハンドです。" }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "{{n:hud.se.ex.n}}ハンド後、相手の{{t:vpip}}は{{n:hud.se.ex.p}}です。この数値の標準誤差は何パーセントポイントですか？数値を入力してください。"
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}。約{{n:var.conf95}}の信頼度で、本当の{{t:vpip}}は ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}} の範囲にあります。"
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "{{n:hud.se.ex.n}}ハンド後、相手の{{t:vpip}}は{{n:hud.se.ex.p}}です。相手の本当の{{t:vpip}}について何がわかりますか？"
    options:
      - { text: "約{{n:var.conf95}}の信頼度で、{{n:hud.ci.ex.low}}から{{n:hud.ci.ex.high}}の間にあります", correct: true, why: "標準誤差は約{{n:hud.se.ex}}で、{{n:var.conf95}}区間は誤差の ± {{n:var.z95}} 倍、つまり ± {{n:hud.ci.ex}} です。相手が極端なタイプではないことはわかりますが、数ポイントしか違わないタイプはまだ区別できません。" }
      - { text: "ちょうど{{n:hud.se.ex.p}}です", why: "{{n:hud.se.ex.n}}ハンドはまだ小さいサンプルです。誤差は約{{n:hud.se.ex}}で、{{n:var.conf95}}区間は ± {{n:hud.ci.ex}} です。" }
      - { text: "何もわかりません。千ハンドに届くまで、スタッツに意味はありません", why: "言い過ぎです。{{n:hud.ci.ex.low}}から{{n:hud.ci.ex.high}}の区間でも、非常にタイトなプレイヤーと非常にルースなプレイヤーはすでに除外できます。足りないのは精度だけです。" }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "数百ハンド後、相手には3ベットに対応する機会が{{n:hud.se.f3b.n}}回あり、そのうち{{n:hud.se.f3b.p}}で{{t:fold|フォールド}}しました。相手のフォールド・トゥ・3ベットについて何がわかりますか？"
    options:
      - { text: "ほとんど何もわかりません。約{{n:var.conf95}}の信頼度で、{{n:hud.ci.f3b.low}}から{{n:hud.ci.f3b.high}}の間です", correct: true, why: "数えるのは機会で、ハンドではありません。誤差は √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}} で、{{n:var.conf95}}区間は ± {{n:hud.ci.f3b}} です。この区間には、ほぼいつもディフェンスするプレイヤーも、ほぼいつも{{t:fold|フォールド}}するプレイヤーも収まります。" }
      - { text: "サンプルが数百ハンドあるので、ちょうど{{n:hud.se.f3b.p}}の割合で{{t:fold|フォールド}}します", why: "数百ハンドでも、このスタッツの機会は{{n:hud.se.f3b.n}}回しかありません。誤差は機会の数から計算し、約{{n:hud.se.f3b}}になります。" }
      - { text: "{{t:fold|フォールド}}しすぎです。{{n:hud.f3b.low}}を超えるのはミスだからです", why: "{{n:hud.se.f3b.p}}は「{{n:hud.f3b.low}}を超える」値ではありません。また、{{n:hud.se.f3b.n}}回の機会では誤差は約{{n:hud.se.f3b}}です。このようなサンプルからは結論を出せません。" }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "新しい相手で、{{t:hud|HUD}}には{{n:hud.ex.few.hands}}ハンド分のデータ：{{t:vpip}} {{n:hud.ex.few.vpip}}、{{t:pfr}} {{n:hud.ex.few.pfr}}。この相手にどうプレイしますか？"
    options:
      - { text: "未知のプレイヤーとして、ベースラインどおりにプレイします。ハンドは集め続けます", correct: true, why: "約{{n:hud.hands.random}}ハンド未満では、スタッツは偶然に左右されます。良いカードが数回続くだけで、このような{{t:vpip}}になります。プレイヤーのタイプは約{{n:hud.hands.random}}–{{n:hud.hands.rough.high}}ハンドで大まかに見え、{{t:vpip}}と{{t:pfr}}は約{{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}ハンドで安定します。" }
      - { text: "{{t:maniac|マニアック}}として扱い、広く{{t:call|コール}}します", why: "{{t:maniac|マニアック}}、つまり非常にルースでアグレッシブなプレイヤーは、可能性の一つにすぎません。{{n:hud.ex.few.hands}}ハンドでは、どのタイプでもありえます。偶然を根拠に広く{{t:call|コール}}すると、相手が普通の{{t:regular|レギュラー}}、つまりそれなりに堅実にプレイする常連だったときに損をします。" }
      - { text: "{{t:nit|ニット}}として扱います。ほとんどのプレイヤーはニットだからです", why: "それもわかりません。{{t:nit}}、つまり非常にタイトなプレイヤーは、タイプの一つにすぎません。サンプルがなければ読みはないので、ベースラインに戻ります。" }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "信頼できるようになるまでに、最も多くのハンドが必要なスタッツはどれですか？"
    options:
      - { text: "フォールド・トゥ・3ベット", correct: true, why: "フォールド・トゥ・3ベットの機会は、相手が{{t:open|オープン}}して3ベットを受けたときにしか生じず、まれです。そのため、{{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}ハンドではなく、約{{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}ハンドが必要です。" }
      - { text: "{{t:vpip}}", why: "{{t:vpip}}はすべてのハンドに機会があるので、最も早く安定します。約{{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}ハンドで安定します。" }
      - { text: "{{t:pfr}}", why: "{{t:pfr}}も{{t:vpip}}と同じく、プレイヤーが{{t:raise|レイズ}}できるすべてのハンドに機会があるので、早く安定します。" }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "あなたのサイトでは、テーブルで{{t:hud|HUD}}ソフトを使うことが禁止されています。どうしますか？"
    options:
      - { text: "{{t:hud|HUD}}なしでプレイし、{{t:session|セッション}}後に自分のハンドデータベースと常連相手のメモを見直します", correct: true, why: "サイトの規約には従う義務があります。禁止されたソフトを使うと、アカウントを閉鎖されるおそれがあります。自分のハンド履歴のスタッツはプレイ後に見直せますし、テーブルで独自のスタッツを表示するサイトもあります。" }
      - { text: "有利になるので、禁止されていても{{t:hud|HUD}}を使います", why: "規約に違反すると、サイトはアカウントを閉鎖し、資金を没収することがあります。その優位性には見合いません。" }
      - { text: "{{t:hud|HUD}}なしではできないので、{{t:exploit|エクスプロイト}}をあきらめます", why: "できます。{{t:session|セッション}}後のハンドレビューから得た読みや、あなたの{{t:stakes|ステークス}}のプレイヤー層のデータからも、ベースラインからどちらにずらすべきかがわかります。" }
---
{{t:exploit|エクスプロイト}}とは、モジュール3–9のベースラインから、相手のミスにつけ込む方向へずらすことです。どちらにずらすかを知るには、データが必要です。オンラインでは{{t:hud}}がそれを提供します。ハンドを記録し、テーブルにいる各相手のスタッツを表示するソフトです。

## {{t:vpip}}と{{t:pfr}}

最も重要な2つの数値は、フロップ前のプレイを表します。

- **{{t:vpip}}**：プレイヤーがフロップ前に自分の意思で{{t:chips|チップ}}を{{t:pot|ポット}}に入れた、つまり{{t:call|コール}}か{{t:raise|レイズ}}をしたハンドの割合です。ブラインドは強制なので数えません。
- **{{t:pfr}}**：プレイヤーがフロップ前に{{t:raise|レイズ}}した、つまり{{t:open|オープン}}、3ベット、4ベットをしたハンドの割合です。

{{t:raise|レイズ}}はすべて自発的な投入でもあるので、{{t:pfr}}が{{t:vpip}}を超えることはありません。{{t:vpip}} − {{t:pfr}}の差は、プレイヤーが{{t:call|コール}}しただけか、リンプしただけのハンドです。{{t:vpip}} {{n:mda.rec.vpip}}、{{t:pfr}} {{n:mda.rec.pfr}}のプレイヤーは多くのハンドをプレイしますが、全ハンドの{{n:mda.rec.gap}}では{{t:raise|レイズ}}せずに{{t:pot|ポット}}に参加しています。

## その他のスタッツ

| スタッツ | 何を測るか | 機会 |
|---|---|---|
| 3ベット | 他のプレイヤーの{{t:open|オープン}}にどれくらい{{t:raise|レイズ}}するか | 前のプレイヤーが{{t:open|オープン}}した |
| フォールド・トゥ・3ベット | 3ベットにどれくらい{{t:fold|フォールド}}するか | {{t:open|オープン}}して3ベットを受けた |
| Cベット | 自分の{{t:raise|レイズ}}の後、フロップでどれくらいベットするか | フロップ前の{{t:aggressor|アグレッサー}}だった |
| フォールド・トゥ・Cベット | Cベットにどれくらい{{t:fold|フォールド}}するか | Cベットを受けた |
| {{t:wtsd}} | フロップ後にどれくらいショーダウンまで行くか | フロップを見た |

最後の列が重要です。スタッツが変わるのは、相手に機会があるときだけです。{{t:vpip}}はすべてのハンドに機会がありますが、フォールド・トゥ・3ベットは、相手が{{t:open|オープン}}して3ベットを受けたときだけです。

## 必要なハンド数

各ハンドは相手の戦略からのランダムなサンプルなので、スタッツにはサンプル平均と同じように誤差があります。誤差はサンプル平均の誤差の式で計算します（モジュール12では、同じ式で{{t:winrate}}の誤差を計算します）。

```formula
誤差 = √(p × (1 − p) ÷ n)
{{n:var.conf95}}区間 = p ± {{n:var.z95}} × 誤差
```

ここでpは割合（例：{{t:vpip}}）、nは機会の数です。{{n:hud.se.ex.n}}ハンドで{{t:vpip}}が{{n:hud.se.ex.p}}なら、誤差は約{{n:hud.se.ex}}なので、本当の{{t:vpip}}は約{{n:var.conf95}}の信頼度で**{{n:hud.ci.ex.low}}から{{n:hud.ci.ex.high}}の間**にあります。フォールド・トゥ・3ベットが{{n:hud.se.f3b.n}}回の機会のうち{{n:hud.se.f3b.p}}なら、区間は{{n:hud.ci.f3b.low}}から{{n:hud.ci.f3b.high}}で、ほとんど何もわかりません。

コーチたちは似たような目安を示しています。

- 約{{n:hud.hands.random}}ハンド未満では、スタッツは偶然に左右されます。未知のプレイヤーとしてプレイします。
- プレイヤーのタイプは{{n:hud.hands.random}}–{{n:hud.hands.rough.high}}ハンドで大まかに見え、{{t:vpip}}と{{t:pfr}}は約{{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}ハンドで安定します。
- 3ベットには約{{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}}ハンド、フォールド・トゥ・3ベットには約{{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}ハンドが必要で、ターンとリバーのスタッツにはさらに多く必要です。

:::note サイトが{{t:hud|HUD}}を禁止している場合
一部のサイト（トレーニング教材によると、低{{t:stakes|ステークス}}の大手サイトも含む）は、テーブルでの{{t:hud|HUD}}ソフトの使用を禁止しています。その場合は、{{t:session|セッション}}後に自分のハンド履歴を見直し、常連相手のメモを取り、自分の{{t:stakes|ステークス}}のプレイヤー層のデータ（レッスン2）を活用します。サンプル数の目安は、異なるハンド数を示す2つのトレーニング教材によるものです。誤差の式は計算によるものです。
:::
