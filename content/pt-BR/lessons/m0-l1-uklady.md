---
id: m0.l1
module: m0
order: 1
title: "Ranking de mãos"
sub: "O que vence o quê"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Quem vence: {{t:flush}} ou {{t:straight|sequência}}?"
    options:
      - { text: "{{t:flush|Flush}}", correct: true, why: "O {{t:flush}} está mais alto no ranking. É mais difícil juntar 5 cartas do mesmo naipe do que 5 cartas seguidas." }
      - { text: "{{t:straight|Sequência}}", why: "Esse é um erro comum de iniciantes. A {{t:straight|sequência}} está uma posição abaixo do {{t:flush}}." }
      - { text: "Empate", why: "Mãos diferentes nunca empatam. A mais alta no ranking sempre vence." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Você tem um {{t:full-house}}, o adversário tem um {{t:flush}}. Quem vence?"
    options:
      - { text: "Você, {{t:full-house}} vence {{t:flush}}", correct: true, why: "O {{t:full-house}} ({{t:three-of-a-kind|trinca}} e {{t:pair|par}}) está em 4º lugar, o {{t:flush}} em 5º. A ordem de cima para baixo: straight flush, {{t:four-of-a-kind|quadra}}, {{t:full-house}}, {{t:flush}}, {{t:straight|sequência}}." }
      - { text: "O adversário, {{t:flush}} vence {{t:full-house}}", why: "É o contrário. O {{t:full-house}} é mais raro, por isso é mais forte." }
      - { text: "Depende do valor das cartas", why: "O valor das cartas só conta quando as duas mãos são do mesmo tipo." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "O que é mais forte: {{t:two-pair|dois pares}} ou {{t:three-of-a-kind|trinca}}?"
    options:
      - { text: "{{t:three-of-a-kind|Trinca}}", correct: true, why: "A {{t:three-of-a-kind|trinca}} está em 7º lugar, {{t:two-pair|dois pares}} em 8º. É fácil confundir, porque {{t:two-pair|dois pares}} “parecem” ter mais cartas." }
      - { text: "{{t:two-pair|Dois pares}}", why: "{{t:two-pair|Dois pares}} estão uma posição abaixo da {{t:three-of-a-kind|trinca}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Vocês dois têm um {{t:pair|par}} de reis. Quem vence?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Você", correct: true, why: "O {{t:pair|par}} é o mesmo, então o kicker decide: seu ás vence a dama do adversário. Por isso AK é muito melhor que KQ." }
      - { text: "O adversário", why: "A dama do adversário é mais baixa que o seu ás." }
      - { text: "{{t:split-pot|Pote dividido}}", why: "O pote seria dividido se as cinco melhores cartas fossem idênticas. Aqui o kicker as diferencia: ás contra dama." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Há uma {{t:straight|sequência}} na {{t:board|mesa}}. Quem vence?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Pote dividido}}", correct: true, why: "As cinco melhores cartas dos dois jogadores são a {{t:straight|sequência}} da {{t:board|mesa}}. Um {{t:pair|par}} de ases é mais fraco que uma {{t:straight|sequência}}, então não acrescenta nada. Isso é “{{t:playing-the-board|jogar com a mesa}}”." }
      - { text: "Você, porque tem um {{t:pair|par}} de ases", why: "Um {{t:pair|par}} de ases é só um {{t:pair|par}}. A {{t:straight|sequência}} da {{t:board|mesa}} é mais forte, então você joga com ela, assim como o adversário." }
      - { text: "O adversário", why: "Para uma {{t:straight|sequência}} mais alta, o adversário precisaria de um dez." }
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
No Texas Hold'em você recebe **2 {{t:hole-cards|cartas fechadas}}**, e **5 {{t:community-cards|cartas comunitárias}}** vão para a {{t:board|mesa}}. Com essas 7 cartas você monta a melhor mão de **5**. A mão mais forte leva o {{t:pot|pote}} inteiro.

## Ranking da mão mais forte à mais fraca

| | Mão | Exemplo |
|---|---|---|
| 1 | {{t:royal-flush|Royal flush}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Straight flush}}: {{t:straight-flush|sequência do mesmo naipe}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Quadra}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full house}}: {{t:three-of-a-kind|trinca}} e {{t:pair|par}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Flush}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Sequência}} (5 seguidas) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Trinca}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Dois pares}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Par}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|Carta alta}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Primeiro se compara a categoria da mão: {{t:three-of-a-kind|trinca}} vence {{t:two-pair|dois pares}}. Com a mesma categoria, decide o valor dela: um {{t:pair|par}} de reis vence um {{t:pair|par}} de damas e, com dois {{t:pair|pares}}, compara-se primeiro o {{t:pair|par}} mais alto. Só quando o núcleo da mão é idêntico (o mesmo {{t:pair|par}}, a mesma {{t:three-of-a-kind|trinca}} ou os mesmos {{t:two-pair|dois pares}}) decidem as cartas adicionais, ou seja, os kickers: primeiro o mais alto e, em caso de empate, o seguinte. Só contam os kickers das cinco melhores cartas. Se as duas mãos de cinco cartas forem idênticas, {{t:split-pot|o pote é dividido}}.
:::

O ás pode ser a carta mais baixa de uma {{t:straight|sequência}}: [[5h 4s 3c 2d Ah]] é a {{t:straight|sequência}} mais baixa, chamada {{t:wheel}}.

Quando sua melhor mão é formada só pelas {{t:community-cards|cartas comunitárias}} e suas {{t:hole-cards|cartas fechadas}} não acrescentam nada, diz-se que você está {{t:playing-the-board|jogando com a mesa}}: na melhor das hipóteses, {{t:split-pot|vocês dividem o pote}}.
