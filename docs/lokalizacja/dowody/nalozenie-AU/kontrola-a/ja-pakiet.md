# Pakiet kontroli (a), ja: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:29
NOWE:       - { text: "数万ハンドで十分", why: "誤差はハンド数の平方根に反比例してしか小さくなりません。{{n:var.sd.high}}で± {{n:var.target}}の精度なら、100ハンドのブロックが約{{n:exam.m12.need.blocks}}個必要です。" }
STARE:       - { text: "数万ハンドで十分", why: "誤差はハンド数の平方根に比例してしか小さくなりません。{{n:var.sd.high}}で± {{n:var.target}}の精度なら、100ハンドのブロックが約{{n:exam.m12.need.blocks}}個必要です。" }

## [2] exams/m12.yaml:62
NOWE:     prompt: "大きな{{t:pot|ポット}}を3回失い、直前の{{t:call|コール}}が良かったかどうかもう判断できません。損失を早く取り戻すために、上の{{t:stakes|ステークス}}に移ろうかと考えています。どうしますか？"
STARE:     prompt: "大きな{{t:pot|ポット}}を3回続けて失い、直前の{{t:call|コール}}が良かったかどうかもう判断できません。損失を早く取り戻すために、上の{{t:stakes|ステークス}}に移ろうかと考えています。どうしますか？"

## [3] lessons/m12-l1-wariancja.md:49
NOWE:       - { text: "何もわからない。ポーカーの結果は完全に運だから", why: "言い過ぎです。サンプルは範囲を狭めますが、そのペースは遅く、誤差はハンド数の平方根に反比例して小さくなります。" }
STARE:       - { text: "何もわからない。ポーカーの結果は完全に運だから", why: "言い過ぎです。サンプルは範囲を狭めますが、そのペースは遅く、誤差はハンド数の平方根に比例して小さくなります。" }

## [4] lessons/m12-l1-wariancja.md:118
NOWE: 同じ計算は逆向きにも使えます。ウィンレートの推定誤差は、ハンド数の平方根に反比例して小さくなります。
STARE: 同じ計算は逆向きにも使えます。ウィンレートの推定誤差は、ハンド数の平方根に比例して小さくなります。

## [5] lessons/m12-l2-decyzja-wynik.md:97
NOWE: キングの{{t:pair|ペア}}に対してエースの{{t:pair|ペア}}でオールインするのは最善の判断ですが、それでも約**{{n:res.kk-wins}}**のケースで負けます。一方、ターンで{{t:flush-draw|フラッシュドロー}}を持ち、{{t:pot|ポット}}全額のベットに{{t:call}}するのは悪い判断です（必要なのは{{n:eq.bet-pot}}、あるのは約{{n:odds.flush.turn-river}}）。それでも、およそ5回に1回は勝ちます。
STARE: キングの{{t:pair|ペア}}に対してエースの{{t:pair|ペア}}でオールインするのは最善の判断ですが、それでも約**{{n:res.kk-wins}}**のケースで負けます。一方、ターンで{{t:flush-draw|フラッシュドロー}}を持ち、{{t:pot|ポット}}全額に対して{{t:call}}するのは悪い判断です（必要なのは{{n:eq.bet-pot}}、あるのは約{{n:odds.flush.turn-river}}）。それでも、およそ5回に1回は勝ちます。

## [6] lessons/m12-l3-tilt.md:78
NOWE:       - { text: "プロファイルを書き出す：何がきっかけになるか、何を考え何を感じるか、プレイがどう変わるか", correct: true, why: "ティルトの仕方もその理由も、プレイヤーごとに少しずつ違います。プロファイルがあれば、ティルトが大きくなる前にサインに気づけます。理解していないものはコントロールできません。" }
STARE:       - { text: "プロフィールを書き出す：何がきっかけになるか、何を考え何を感じるか、プレイがどう変わるか", correct: true, why: "ティルトの仕方もその理由も、プレイヤーごとに少しずつ違います。プロフィールがあれば、ティルトが大きくなる前にサインに気づけます。理解していないものはコントロールできません。" }

## [7] lessons/m12-l3-tilt.md:118
NOWE: ティルトの仕方は人によって少しずつ違います。自分の**ティルトプロファイル**を書き出しましょう：何がきっかけになるか、そのとき何を考え何を感じるか、テーブルで何をするか（例：広すぎる範囲で{{t:call|コール}}する、仕返しのために{{t:raise|レイズ}}する）。自分のサインをよく知るほど、早く気づけるようになります。
STARE: ティルトの仕方は人によって少しずつ違います。自分の**ティルトプロフィール**を書き出しましょう：何がきっかけになるか、そのとき何を考え何を感じるか、テーブルで何をするか（例：広すぎる範囲で{{t:call|コール}}する、仕返しのために{{t:raise|レイズ}}する）。自分のサインをよく知るほど、早く気づけるようになります。

## [8] lessons/m12-l4-bankroll.md:141
NOWE: 最初は時間の約{{n:study.beginner}}を学習に充て、残りをプレイに充てます。自分の{{t:stakes|ステークス}}で勝てるようになったら、理想は約{{n:study.winner}}ですが、学習は決して{{n:study.min}}を下回らないようにします。
STARE: 最初は時間の約{{n:study.beginner}}を学習に充て、残りをプレイに充てます。自分の{{t:stakes|ステークス}}で勝てるようになったら、理想は約{{n:study.winner}}ですが、学習が{{n:study.min}}を下回ることはないようにします。

## [9] rules.yaml R-M12-003
NOWE:
```
- id: R-M12-003
  module: m12
  if: "本当はどれだけ勝っているのか知りたい場合"
  then: "数十万ハンドを集めます：{{n:var.conf95}}の確からしさで±{{n:var.target}}の精度を得るには、約{{n:var.need.hands.k}}kハンドが必要です"
  because: "推定誤差はハンド数の平方根に反比例して小さくなるからです：必要な100ハンドのブロック数 = ({{n:var.z95}} × SD ÷ 精度)²"
  level: math
  source: "計算：(1.96 × 80 ÷ 2)² ブロック；ドキュメント08の桁 (約61万5千ハンド) と一致"
  sources: [{ kind: math }]
```
STARE:
```
- id: R-M12-003
  module: m12
  if: "本当はどれだけ勝っているのか知りたい場合"
  then: "数十万ハンドを集めます：{{n:var.conf95}}の確からしさで±{{n:var.target}}の精度を得るには、約{{n:var.need.hands.k}}kハンドが必要です"
  because: "推定誤差はハンド数の平方根に比例してしか小さくならないからです：必要な100ハンドのブロック数 = ({{n:var.z95}} × SD ÷ 精度)²"
  level: math
  source: "計算：(1.96 × 80 ÷ 2)² ブロック；ドキュメント08の桁 (約61万5千ハンド) と一致"
  sources: [{ kind: math }]
```

## [10] rules.yaml R-M12-004
NOWE:
```
- id: R-M12-004
  module: m12
  if: "ハンドの後で自分のプレイを評価する場合"
  then: "勝ったかどうかではなく、判断（値段、エクイティ、そのとき持っていた情報）について問います"
  because: "良い判断でも一定の割合で負けるからです：AAでKKに対してオールインしても約{{n:res.kk-wins}}は負けます。それでも人は、そうすべきでないとわかっていても、結果で判断を評価してしまいます"
  level: heuristic
  source: "Baron と Hershey (1988)、Outcome bias in decision evaluation、J Pers Soc Psychol 54(4)；Annie Duke の「resulting」について (Masters in Business、Ritholtz 2018)；AA–KKのエクイティ：正確な計算 (ドキュメント08)"
  sources: [{ kind: math }, { kind: book }, { kind: study }]
```
STARE:
```
- id: R-M12-004
  module: m12
  if: "ハンドの後で自分のプレイを評価する場合"
  then: "勝ったかどうかではなく、判断（値段、エクイティ、そのとき持っていた情報）について問います"
  because: "良い判断でも定期的に負けるからです：AAでKKに対してオールインしても約{{n:res.kk-wins}}は負けます。それでも人は、そうすべきでないとわかっていても、結果で判断を評価してしまいます"
  level: heuristic
  source: "Baron と Hershey (1988)、Outcome bias in decision evaluation、J Pers Soc Psychol 54(4)；Annie Duke の「resulting」について (Masters in Business、Ritholtz 2018)；AA–KKのエクイティ：正確な計算 (ドキュメント08)"
  sources: [{ kind: math }, { kind: book }, { kind: study }]
```

## [11] rules.yaml R-M12-006
NOWE:
```
- id: R-M12-006
  module: m12
  if: "自分のプロファイルにあるティルトの最初のサイン（例：バッドビート後の怒り、相手を懲らしめたい気持ち）に気づいた場合"
  then: "すぐに対応します：深呼吸と、なぜこれが{{t:variance}}か学ぶべきミスなのかを思い出させる、用意しておいた一言です"
  because: "ティルトが大きくなると明晰に考えられなくなり、そうなるともうコントロールできないからです"
  level: heuristic
  source: "Tendler、ニュースサイトでのインタビュー (2014) (「When tilt becomes too intense, it shuts down your ability to think」、「you must begin correcting tilt when it's small」)；Tendler と Carter、The Mental Game of Poker (2011)、「injecting logic」のテクニック"
  sources: [{ kind: book }]
```
STARE:
```
- id: R-M12-006
  module: m12
  if: "自分のプロファイルにあるティルトの最初のサイン（例：バッドビート後の怒り、相手を懲らしめたい気持ち）に気づいた場合"
  then: "すぐに対応します：深呼吸と、これは{{t:variance}}か学ぶべきミスだと思い出させる、用意しておいた一言です"
  because: "ティルトが大きくなると明晰に考えられなくなり、そうなるともうコントロールできないからです"
  level: heuristic
  source: "Tendler、ニュースサイトでのインタビュー (2014) (「When tilt becomes too intense, it shuts down your ability to think」、「you must begin correcting tilt when it's small」)；Tendler と Carter、The Mental Game of Poker (2011)、「injecting logic」のテクニック"
  sources: [{ kind: book }]
```

## [12] rules.yaml R-M12-012
NOWE:
```
- id: R-M12-012
  module: m12
  if: "ポーカーの時間配分を計画する場合"
  then: "最初は時間の約{{n:study.beginner}}を勉強に充てます。自分の{{t:stakes|ステークス}}で勝てるようになったら約{{n:study.winner}}にしますが、決して{{n:study.min}}を下回らないようにします"
  because: "最初は追いつくべきことが最も多く、自分の{{t:stakes|ステークス}}で勝てるようになれば、もっとプレイできるからです"
  level: heuristic
  source: "トレーニングサイト、What should your study-to-play ratio be (Dara O'Kearney の記事)：「New players have so much catching up to do」；「Once you are beating the games you are in you can start to reduce the study and increase the grinding」"
  sources: [{ kind: training }]

# M11: turnieje i short stacki (moduł opcjonalny). Zakresy push/fold z własnego solvera (pushfold.json, heads-up mały
# blind kontra duży blind, zwalidowany z równowagą Nasha, dokument 10); progi i pojęcia z przeczytanych źródeł (raport M11).
```
STARE:
```
- id: R-M12-012
  module: m12
  if: "ポーカーの時間配分を計画する場合"
  then: "最初は時間の約{{n:study.beginner}}を勉強に充てます。自分の{{t:stakes|ステークス}}で勝てるようになったら約{{n:study.winner}}にしますが、{{n:study.min}}を下回ることはありません"
  because: "最初は追いつくべきことが最も多く、自分の{{t:stakes|ステークス}}で勝てるようになれば、もっとプレイできるからです"
  level: heuristic
  source: "トレーニングサイト、What should your study-to-play ratio be (Dara O'Kearney の記事)：「New players have so much catching up to do」；「Once you are beating the games you are in you can start to reduce the study and increase the grinding」"
  sources: [{ kind: training }]

# M11: turnieje i short stacki (moduł opcjonalny). Zakresy push/fold z własnego solvera (pushfold.json, heads-up mały
# blind kontra duży blind, zwalidowany z równowagą Nasha, dokument 10); progi i pojęcia z przeczytanych źródeł (raport M11).
```
