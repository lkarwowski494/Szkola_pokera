---
id: m0.l1
module: m0
order: 1
title: "I punti"
sub: "Cosa batte cosa"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Chi vince: {{t:flush|colore}} o {{t:straight|scala}}?"
    options:
      - { text: "{{t:flush|Colore}}", correct: true, why: "Il {{t:flush|colore}} è più in alto nella classifica. È più difficile avere 5 carte dello stesso seme che 5 carte in sequenza." }
      - { text: "{{t:straight|Scala}}", why: "È un errore comune dei principianti. La {{t:straight|scala}} è una posizione sotto il {{t:flush|colore}}." }
      - { text: "Pareggio", why: "Punti diversi non pareggiano mai. Vince sempre quello più alto in classifica." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Tu hai un {{t:full-house|full}}, l'avversario un {{t:flush|colore}}. Chi vince?"
    options:
      - { text: "Tu, il {{t:full-house|full}} batte il {{t:flush|colore}}", correct: true, why: "Il {{t:full-house|full}} ({{t:three-of-a-kind|tris}} e {{t:pair|coppia}}) è al 4° posto, il {{t:flush|colore}} al 5°. Ordine dall'alto: scala colore, {{t:four-of-a-kind|poker}}, {{t:full-house|full}}, {{t:flush|colore}}, {{t:straight|scala}}." }
      - { text: "L'avversario, il {{t:flush|colore}} batte il {{t:full-house|full}}", why: "Al contrario. Il {{t:full-house|full}} è più raro, quindi più forte." }
      - { text: "Dipende dal valore delle carte", why: "Il valore delle carte conta solo quando il tipo di punto è lo stesso." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Cosa è più forte: {{t:two-pair|doppia coppia}} o {{t:three-of-a-kind|tris}}?"
    options:
      - { text: "{{t:three-of-a-kind|Tris}}", correct: true, why: "Il {{t:three-of-a-kind|tris}} è al 7° posto, la {{t:two-pair|doppia coppia}} all'8°. È facile confondersi, perché la {{t:two-pair|doppia coppia}} “sembra” fatta di più carte." }
      - { text: "{{t:two-pair|Doppia coppia}}", why: "La {{t:two-pair|doppia coppia}} è una posizione sotto il {{t:three-of-a-kind|tris}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Avete entrambi una {{t:pair|coppia}} di re. Chi vince?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Tu", correct: true, why: "La {{t:pair|coppia}} è la stessa, quindi decide il kicker: il tuo asso batte la donna dell'avversario. Per questo AK è molto meglio di KQ." }
      - { text: "L'avversario", why: "La donna dell'avversario è più bassa del tuo asso." }
      - { text: "{{t:split-pot|Piatto diviso}}", why: "Il piatto si dividerebbe se le migliori cinquine fossero identiche. Qui le distingue il kicker: asso contro donna." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Sul {{t:board|board}} c'è una {{t:straight|scala}}. Chi vince?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Piatto diviso}}", correct: true, why: "La migliore cinquina di entrambi i giocatori è la {{t:straight|scala}} sul {{t:board|board}}. Una {{t:pair|coppia}} d'assi è più debole di una {{t:straight|scala}}, quindi non aggiunge nulla. È il caso del “{{t:playing-the-board|giocare il board}}”." }
      - { text: "Tu, perché hai una {{t:pair|coppia}} d'assi", why: "Una {{t:pair|coppia}} d'assi è solo una {{t:pair|coppia}}. La {{t:straight|scala}} sul {{t:board|board}} è più forte, quindi giochi quella, proprio come l'avversario." }
      - { text: "L'avversario", why: "Per una {{t:straight|scala}} più alta all'avversario servirebbe un dieci." }
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
In Texas Hold'em ricevi **2 {{t:hole-cards|carte personali}}** e sul {{t:board|board}} arrivano **5 {{t:community-cards|carte comuni}}**. Con queste 7 carte formi il miglior punto di **5**. Il punto più forte vince l'intero {{t:pot|piatto}}.

## Classifica dal più forte

| | Punto | Esempio |
|---|---|---|
| 1 | {{t:royal-flush|Scala reale}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Scala colore}}: una {{t:straight-flush|scala tutta dello stesso seme}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Poker}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full}}: {{t:three-of-a-kind|tris}} e {{t:pair|coppia}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Colore}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Scala}} (5 in sequenza) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Tris}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Doppia coppia}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Coppia}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|Carta alta}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Prima si confronta il rango del punto: il {{t:three-of-a-kind|tris}} batte la {{t:two-pair|doppia coppia}}. A parità di punto decide il suo valore: una {{t:pair|coppia}} di re batte una {{t:pair|coppia}} di donne, e con due {{t:pair|coppie}} si confronta prima la {{t:pair|coppia}} più alta. Solo quando il nucleo del punto è identico (stessa {{t:pair|coppia}}, stesso {{t:three-of-a-kind|tris}} o stessa {{t:two-pair|doppia coppia}}) decidono le carte aggiuntive, cioè i kicker: prima il più alto e, in caso di parità, il successivo. Contano solo i kicker della migliore cinquina. Se le due cinquine sono identiche, {{t:split-pot|il piatto viene diviso}}.
:::

L'asso può essere la carta più bassa di una {{t:straight|scala}}: [[5h 4s 3c 2d Ah]] è la {{t:straight|scala}} più bassa, chiamata {{t:wheel|wheel}}.

Quando il tuo miglior punto è formato solo dalle {{t:community-cards|carte comuni}} e le tue {{t:hole-cards|carte personali}} non aggiungono nulla, si parla di {{t:playing-the-board|giocare il board}}: nel migliore dei casi {{t:split-pot|vi dividete il piatto}}.
