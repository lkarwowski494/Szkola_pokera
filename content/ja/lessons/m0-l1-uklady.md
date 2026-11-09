---
id: m0.l1
module: m0
order: 1
title: "役の強さ"
sub: "どの役がどれに勝つか"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "{{t:flush|フラッシュ}}と{{t:straight|ストレート}}、勝つのはどちらですか？"
    options:
      - { text: "{{t:flush|フラッシュ}}", correct: true, why: "{{t:flush|フラッシュ}}のほうが上位です。同じスートで5枚そろえるほうが、5枚連続でそろえるより難しいからです。" }
      - { text: "{{t:straight|ストレート}}", why: "初心者によくある間違いです。{{t:straight|ストレート}}は{{t:flush}}より1つ下の順位です。" }
      - { text: "引き分け", why: "異なる役どうしが引き分けになることはありません。必ず上位の役が勝ちます。" }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "あなたは{{t:full-house|フルハウス}}、相手は{{t:flush}}です。勝つのはどちらですか？"
    options:
      - { text: "あなた。{{t:full-house}}は{{t:flush}}に勝ちます", correct: true, why: "{{t:full-house|フルハウス}}（{{t:three-of-a-kind}}と{{t:pair}}）は4位、{{t:flush}}は5位です。上から順に、ストレートフラッシュ、{{t:four-of-a-kind}}、{{t:full-house}}、{{t:flush}}、{{t:straight}}です。" }
      - { text: "相手。{{t:flush}}は{{t:full-house|フルハウス}}に勝ちます", why: "逆です。{{t:full-house|フルハウス}}のほうが出にくいので、強い役です。" }
      - { text: "カードの大きさによる", why: "カードの大きさが関係するのは、同じ種類の役どうしのときだけです。" }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "{{t:two-pair|ツーペア}}と{{t:three-of-a-kind|スリーカード}}、強いのはどちらですか？"
    options:
      - { text: "{{t:three-of-a-kind|スリーカード}}", correct: true, why: "{{t:three-of-a-kind|スリーカード}}は7位、{{t:two-pair}}は8位です。{{t:two-pair}}のほうがカードが多く「見える」ので、間違えやすいところです。" }
      - { text: "{{t:two-pair|ツーペア}}", why: "{{t:two-pair|ツーペア}}は{{t:three-of-a-kind}}より1つ下の順位です。" }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "2人ともキングの{{t:pair|ペア}}です。勝つのはどちらですか？"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "あなた", correct: true, why: "{{t:pair|ペア}}が同じなので、キッカーで決まります。あなたのエースが相手のクイーンに勝ちます。だからAKはKQよりずっと良いハンドです。" }
      - { text: "相手", why: "相手のクイーンは、あなたのエースより低いカードです。" }
      - { text: "{{t:split-pot|スプリットポット}}", why: "ポットが分けられるのは、ベストの5枚がまったく同じ場合です。ここではキッカーが違います。エース対クイーンです。" }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "{{t:board|ボード}}に{{t:straight}}ができています。勝つのはどちらですか？"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|スプリットポット}}", correct: true, why: "2人ともベストの5枚は{{t:board|ボード}}の{{t:straight}}です。エースの{{t:pair|ペア}}は{{t:straight}}より弱いので、何も加えません。これが「{{t:playing-the-board}}」の状態です。" }
      - { text: "あなた。エースの{{t:pair|ペア}}があるから", why: "エースの{{t:pair|ペア}}は、ただの{{t:pair}}です。{{t:board|ボード}}の{{t:straight|ストレート}}のほうが強いので、相手と同じくそれを使います。" }
      - { text: "相手", why: "相手がより高い{{t:straight|ストレート}}を作るには、10が必要です。" }
  - kind: generated
    id: m0.l1.g1
    family: m0.who-wins
    rules: [R-M0-001]
    generator: whoWins
    count: 3
  - kind: generated
    id: m0.l1.g2
    family: m0.kicker
    rules: [R-M0-002]
    generator: whoWinsKicker
    count: 2
  - kind: generated
    id: m0.l1.g3
    family: m0.best-hand
    rules: [R-M0-001]
    generator: bestHand
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar hands
  - kind: generated
    id: m0.l1.g-vocab-hands
    family: vocab.hands
    generator: vocab
    params: { area: hands, dir: both }
    count: 4
---
テキサスホールデムでは、**2枚の{{t:hole-cards}}**が配られ、{{t:board}}には**5枚の{{t:community-cards|コミュニティカード}}**が出ます。この7枚のうち**5枚**を使って、最も強い役を作ります。強いほうの役が{{t:pot|ポット}}をすべて獲得します。

## 強い順のランキング

| | 役 | 例 |
|---|---|---|
| 1 | {{t:royal-flush|ロイヤルフラッシュ}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|ストレートフラッシュ}}：同じスートの{{t:straight|ストレート}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|フォーカード}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|フルハウス}}：{{t:three-of-a-kind}}と{{t:pair}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|フラッシュ}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|ストレート}}（5枚連続） | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|スリーカード}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|ツーペア}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|ワンペア}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|ハイカード}} | [[Ac Qd 9s 6h 3c]] |

:::note キッカー
まず役の順位を比べます。{{t:three-of-a-kind}}は{{t:two-pair}}に勝ちます。同じ役どうしなら、その役の高さで決まります。キングの{{t:pair}}はクイーンの{{t:pair|ペア}}に勝ち、{{t:pair|ペア}}が2組ある場合は、まず高いほうの{{t:pair|ペア}}を比べます。役の中心部分がまったく同じとき（同じ{{t:pair}}、{{t:three-of-a-kind}}、または同じ{{t:two-pair}}）に限り、残りのカード、つまりキッカーで決まります。まず最も高いキッカーを比べ、それも同じなら次のキッカーを比べます。数えるのはベストの5枚に含まれるキッカーだけです。2人の5枚がまったく同じなら、{{t:split-pot|スプリットポット}}になります。
:::

エースは{{t:straight|ストレート}}の一番下のカードにもなれます。[[5h 4s 3c 2d Ah]]は最も低い{{t:straight}}で、{{t:wheel}}と呼ばれます。

ベストの役がすべて{{t:community-cards|コミュニティカード}}で、{{t:hole-cards}}が何も加えていない場合、これを{{t:playing-the-board|プレイング・ザ・ボード}}といいます。よくても{{t:split-pot|スプリットポット}}です。
