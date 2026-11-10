---
id: m0.l1
module: m0
order: 1
title: "Combinações de cartas"
sub: "O que vence o quê"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Qual vence: um {{t:flush|flush}} ou uma {{t:straight|sequência}}?"
    options:
      - { text: "{{t:flush|Flush}}", correct: true, why: "O {{t:flush|flush}} está mais acima na hierarquia. É mais difícil juntar 5 cartas do mesmo naipe do que 5 cartas seguidas." }
      - { text: "{{t:straight|Sequência}}", why: "É um erro frequente dos principiantes. A {{t:straight|sequência}} está uma posição abaixo do {{t:flush|flush}}." }
      - { text: "Empate", why: "Combinações diferentes nunca empatam. A mais alta na hierarquia ganha sempre." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Tem um {{t:full-house|full house}} e o adversário tem um {{t:flush|flush}}. Quem vence?"
    options:
      - { text: "A sua mão: o {{t:full-house|full house}} bate o {{t:flush|flush}}", correct: true, why: "O {{t:full-house|full house}} ({{t:three-of-a-kind|trio}} e {{t:pair|par}}) está em 4.º lugar, o {{t:flush|flush}} em 5.º. Ordem a partir do topo: straight flush, {{t:four-of-a-kind|quadra}}, {{t:full-house|full house}}, {{t:flush|flush}}, {{t:straight|sequência}}." }
      - { text: "O adversário: o {{t:flush|flush}} bate o {{t:full-house|full house}}", why: "É ao contrário. O {{t:full-house|full house}} é mais raro, logo é mais forte." }
      - { text: "Depende do valor das cartas", why: "O valor das cartas só conta quando as combinações são do mesmo tipo." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "O que é mais forte: {{t:two-pair|dois pares}} ou um {{t:three-of-a-kind|trio}}?"
    options:
      - { text: "{{t:three-of-a-kind|Trio}}", correct: true, why: "O {{t:three-of-a-kind|trio}} está em 7.º lugar, os {{t:two-pair|dois pares}} em 8.º. É fácil confundir, porque os {{t:two-pair|dois pares}} «parecem» ter mais cartas." }
      - { text: "{{t:two-pair|Dois pares}}", why: "Os {{t:two-pair|dois pares}} estão uma posição abaixo do {{t:three-of-a-kind|trio}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Ambos têm um {{t:pair|par}} de reis. Quem vence?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "A sua mão", correct: true, why: "O {{t:pair|par}} é o mesmo, por isso decide o kicker: o seu ás bate a dama do adversário. É por isso que AK é muito melhor do que KQ." }
      - { text: "O adversário", why: "A dama do adversário é mais baixa do que o seu ás." }
      - { text: "{{t:split-pot|Divisão do pote}}", why: "Haveria divisão se as melhores cinco cartas fossem idênticas. Aqui o kicker faz a diferença: ás contra dama." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Há uma {{t:straight|sequência}} na {{t:board|mesa}}. Quem vence?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Divisão do pote}}", correct: true, why: "As melhores cinco cartas de ambos os jogadores são a {{t:straight|sequência}} da {{t:board|mesa}}. O {{t:pair|par}} de ases é mais fraco do que a {{t:straight|sequência}}, por isso não acrescenta nada. É a situação de «{{t:playing-the-board|jogar com a mesa}}»." }
      - { text: "A sua mão, porque tem um {{t:pair|par}} de ases", why: "Um {{t:pair|par}} de ases é apenas um {{t:pair|par}}. A {{t:straight|sequência}} da {{t:board|mesa}} é mais forte, por isso joga com ela, tal como o adversário." }
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
No Texas Hold'em recebe **2 {{t:hole-cards|cartas próprias}}** e na {{t:board|mesa}} saem **5 {{t:community-cards|cartas comunitárias}}**. Com estas 7 cartas forma a melhor combinação de **5**. A combinação mais forte ganha todo o {{t:pot|pote}}.

## Hierarquia, da mais forte

| | Combinação | Exemplo |
|---|---|---|
| 1 | {{t:royal-flush|Royal flush}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Straight flush}}: {{t:straight|sequência}} do mesmo naipe | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Quadra}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full house}}: {{t:three-of-a-kind|trio}} e {{t:pair|par}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Flush}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Sequência}} (5 seguidas) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Trio}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Dois pares}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Par}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|Carta alta}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Primeiro compara-se a categoria da combinação: o {{t:three-of-a-kind|trio}} bate os {{t:two-pair|dois pares}}. Com a mesma combinação, decide o seu valor: um {{t:pair|par}} de reis bate um {{t:pair|par}} de damas e, com {{t:two-pair|dois pares}}, compara-se primeiro o {{t:pair|par}} mais alto. Só quando o núcleo da combinação é idêntico (o mesmo {{t:pair|par}}, o mesmo {{t:three-of-a-kind|trio}} ou os mesmos {{t:two-pair|dois pares}}) decidem as cartas adicionais, ou seja, os kickers: primeiro o mais alto e, em caso de empate, o seguinte. Só contam os kickers que fazem parte das melhores cinco cartas. Se ambas as mãos de cinco cartas forem idênticas, {{t:split-pot|o pote é dividido}}.
:::

O ás pode ser a carta mais baixa de uma {{t:straight|sequência}}: [[5h 4s 3c 2d Ah]] é a {{t:straight|sequência}} mais baixa, a chamada {{t:wheel|wheel}}.

Quando a sua melhor combinação é formada apenas pelas {{t:community-cards|cartas comunitárias}} e as {{t:hole-cards|cartas próprias}} não acrescentam nada, diz-se que está a {{t:playing-the-board|jogar com a mesa}}: na melhor das hipóteses, {{t:split-pot|o pote é dividido}}.
