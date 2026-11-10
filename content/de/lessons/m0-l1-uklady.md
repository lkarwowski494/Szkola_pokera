---
id: m0.l1
module: m0
order: 1
title: "Die Pokerhände"
sub: "Was schlägt was"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Was gewinnt: ein {{t:flush|Flush}} oder eine {{t:straight|Straße}}?"
    options:
      - { text: "{{t:flush|Flush}}", correct: true, why: "Der {{t:flush|Flush}} steht im Ranking höher. 5 Karten in einer Farbe zu bekommen ist schwerer als 5 Karten in Folge." }
      - { text: "{{t:straight|Straße}}", why: "Das ist ein häufiger Anfängerfehler. Die {{t:straight|Straße}} steht einen Platz unter dem {{t:flush|Flush}}." }
      - { text: "Unentschieden", why: "Verschiedene Hände sind nie unentschieden. Die im Ranking höhere gewinnt immer." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Du hast ein {{t:full-house|Full House}}, dein Gegner einen {{t:flush|Flush}}. Wer gewinnt?"
    options:
      - { text: "Du, ein {{t:full-house|Full House}} schlägt einen {{t:flush|Flush}}", correct: true, why: "Das {{t:full-house|Full House}} ({{t:three-of-a-kind|Drilling}} und {{t:pair|Paar}}) steht auf Platz 4, der {{t:flush|Flush}} auf Platz 5. Reihenfolge von oben: Straight Flush, {{t:four-of-a-kind|Vierling}}, {{t:full-house|Full House}}, {{t:flush|Flush}}, {{t:straight|Straße}}." }
      - { text: "Dein Gegner, ein {{t:flush|Flush}} schlägt ein {{t:full-house|Full House}}", why: "Umgekehrt. Das {{t:full-house|Full House}} ist seltener und deshalb stärker." }
      - { text: "Hängt von der Höhe der Karten ab", why: "Die Höhe der Karten zählt nur bei derselben Art von Hand." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Was ist stärker: {{t:two-pair|Zwei Paare}} oder ein {{t:three-of-a-kind|Drilling}}?"
    options:
      - { text: "{{t:three-of-a-kind|Drilling}}", correct: true, why: "Der {{t:three-of-a-kind|Drilling}} steht auf Platz 7, {{t:two-pair|Zwei Paare}} auf Platz 8. Man verwechselt das leicht, weil {{t:two-pair|Zwei Paare}} nach mehr Karten „aussehen“." }
      - { text: "{{t:two-pair|Zwei Paare}}", why: "{{t:two-pair|Zwei Paare}} stehen einen Platz unter dem {{t:three-of-a-kind|Drilling}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Ihr habt beide ein {{t:pair|Paar}} Könige. Wer gewinnt?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Du", correct: true, why: "Das {{t:pair|Paar}} ist gleich, also entscheidet der Kicker: Dein Ass schlägt die Dame deines Gegners. Deshalb ist AK viel besser als KQ." }
      - { text: "Dein Gegner", why: "Die Dame deines Gegners ist niedriger als dein Ass." }
      - { text: "{{t:split-pot|Split Pot}}", why: "Geteilt würde nur bei identischen besten fünf Karten. Hier unterscheidet sie der Kicker: Ass gegen Dame." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Auf dem {{t:board|Board}} liegt eine {{t:straight|Straße}}. Wer gewinnt?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Split Pot}}", correct: true, why: "Die besten fünf Karten beider Spieler sind die {{t:straight|Straße}} vom {{t:board|Board}}. Ein {{t:pair|Paar}} Asse ist schwächer als eine {{t:straight|Straße}} und bringt also nichts. Das ist „{{t:playing-the-board|das Board spielen}}“." }
      - { text: "Du, weil du ein {{t:pair|Paar}} Asse hast", why: "Ein {{t:pair|Paar}} Asse ist nur ein {{t:pair|Paar}}. Die {{t:straight|Straße}} vom {{t:board|Board}} ist stärker, also spielst du sie, genau wie dein Gegner." }
      - { text: "Dein Gegner", why: "Für eine höhere {{t:straight|Straße}} bräuchte dein Gegner eine Zehn." }
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
Beim Texas Hold'em bekommst du **2 {{t:hole-cards|Hole Cards}}**, und auf das {{t:board|Board}} kommen **5 {{t:community-cards|Gemeinschaftskarten}}**. Aus diesen 7 Karten bildest du die beste Hand aus **5**. Die stärkere Hand gewinnt den ganzen {{t:pot|Pot}}.

## Ranking von der stärksten Hand an

| | Hand | Beispiel |
|---|---|---|
| 1 | {{t:royal-flush|Royal Flush}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Straight Flush}}: {{t:straight-flush|Straße in einer Farbe}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Vierling}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full House}}: {{t:three-of-a-kind|Drilling}} und {{t:pair|Paar}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Flush}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Straße}} (5 in Folge) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Drilling}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Zwei Paare}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Paar}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|High Card}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Zuerst vergleicht man den Rang der Hand: Ein {{t:three-of-a-kind|Drilling}} schlägt {{t:two-pair|Zwei Paare}}. Bei derselben Hand entscheidet ihre Höhe: Ein {{t:pair|Paar}} Könige schlägt ein {{t:pair|Paar}} Damen, und bei zwei {{t:pair|Paaren}} vergleicht man zuerst das höhere {{t:pair|Paar}}. Erst wenn der Kern der Hand identisch ist (dasselbe {{t:pair|Paar}}, derselbe {{t:three-of-a-kind|Drilling}} oder dieselben {{t:two-pair|Zwei Paare}}), entscheiden die Beikarten, also die Kicker: zuerst der höchste, bei Gleichstand der nächste. Es zählen nur Kicker aus den besten fünf Karten. Sind beide Fünferkombinationen identisch, {{t:split-pot|wird der Pot geteilt}}.
:::

Das Ass kann die niedrigste Karte einer {{t:straight|Straße}} sein: [[5h 4s 3c 2d Ah]] ist die niedrigste {{t:straight|Straße}}, das sogenannte {{t:wheel|Wheel}}.

Wenn deine beste Hand nur aus den {{t:community-cards|Gemeinschaftskarten}} besteht und deine {{t:hole-cards|Hole Cards}} nichts beitragen, spricht man davon, {{t:playing-the-board|das Board zu spielen}}: Bestenfalls {{t:split-pot|teilt ihr den Pot}}.
