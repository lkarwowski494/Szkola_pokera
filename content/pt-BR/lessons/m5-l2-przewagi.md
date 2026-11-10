---
id: m5.l2
module: m5
order: 2
title: "A quem o flop favorece"
sub: "Vantagem de range e vantagem de nuts"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}}. Flop: [[Ks 7d 2c]]. Quem tem a {{t:range-advantage|vantagem de range}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Você, que {{t:open|abriu}} do Button", correct: true, why: "Sim: você tem no seu {{t:range}} todos os KK, AK e KQ. O {{t:big-blind}} aumentaria as mais fortes delas antes do flop, e a defesa ampla dele é, na maior parte, de mãos que erraram aqui." }
      - { text: "O {{t:big-blind}}", why: "Não: o {{t:big-blind}} tem mais mãos fracas, porque defendeu de forma ampla. Ele tem um rei com bom kicker com menos frequência que você." }
      - { text: "Ninguém, o flop é aleatório", why: "O flop é aleatório, mas os {{t:range|ranges}} não são. O mesmo flop se encaixa melhor no {{t:range}} que tem mais cartas altas." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}}. Flop: [[7s 6h 5d]]. Você tem aqui {{t:nuts-advantage|vantagem de nuts}}, ou seja, claramente mais das mãos mais fortes que o adversário?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "Não: o {{t:big-blind}} também tem aqui {{t:straight|sequências}} e {{t:two-pair|dois pares}}", correct: true, why: "Isso: o {{t:big-blind}} defende muitos {{t:connectors|conectores}} do mesmo naipe e mãos com seis ou sete, que aqui fazem {{t:straight|sequências}} e {{t:two-pair|dois pares}}. Suas cartas altas erraram aqui, então você não tem claramente mais das mãos mais fortes." }
      - { text: "Sim, porque você {{t:open|abriu}} antes do flop", why: "Não: a {{t:open|abertura}} te dá vantagem em flops altos. Em um flop baixo e {{t:connected|conectado}}, suas cartas altas erraram, e o {{t:range}} do adversário acerta aqui {{t:straight|sequências}} e {{t:two-pair|dois pares}}." }
      - { text: "Sim, porque você tem mais {{t:pair|pares}} altos", why: "Não: você tem mais {{t:overpair|overpairs}} ({{t:pocket-pair|pares de mão}} maiores que qualquer carta da {{t:board|mesa}}, ex.: TT, JJ), mas num flop assim um {{t:overpair}} não está entre as mãos mais fortes: perde para {{t:straight|sequência}}, set e {{t:two-pair|dois pares}}." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Por que o {{t:big-blind}} que só {{t:call|pagou}} a sua {{t:open|abertura}} raramente tem AA ou AK no flop [[Ad 8s 3c]]?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Porque com essas mãos ele geralmente {{t:raise|aumenta}} antes do flop (3-bet)", correct: true, why: "Sim: o {{t:big-blind}} joga as mãos mais fortes com 3-bet, então, depois de só {{t:call|pagar}}, o {{t:range}} dele tem poucas das melhores mãos. O seu {{t:range}} tem todas." }
      - { text: "Porque o {{t:big-blind}} nunca joga ases", why: "Não: o {{t:big-blind}} defende muitos ases, ex.: A5 ou A9. Faltam a ele principalmente os mais fortes, que ele aumentaria." }
      - { text: "Porque já há um ás no flop", why: "O ás na {{t:board|mesa}} reduz o número de {{t:combo|combinações}} de ases nos dois {{t:range|ranges}}, mas não cria diferença entre eles. A diferença vem das decisões antes do flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Você tem a {{t:range-advantage|vantagem de range}}, mas o adversário tem tantas das mãos mais fortes quanto você. De que tamanho você tende a apostar?"
    options:
      - { text: "Pouco, e com frequência", correct: true, why: "Sim: a {{t:range-advantage}} diz que você pode apostar com frequência. Sem {{t:nuts-advantage|vantagem de nuts}}, uma {{t:bet|aposta}} grande arrisca muito contra as mãos mais fortes do adversário, e as mãos mais fracas {{t:fold|desistem}} diante de uma pequena de qualquer jeito." }
      - { text: "Muito, porque você tem a vantagem", why: "Não: o tamanho grande é decidido pela {{t:nuts-advantage}}, ou seja, por ter mais das mãos mais fortes. Aqui você não a tem." }
      - { text: "Sempre dou {{t:check}}", why: "Cauteloso demais: a {{t:range-advantage}} é um motivo para apostar com frequência, só que pouco." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "O seu {{t:range}} tem muito mais das mãos mais fortes que o {{t:range}} do adversário. O que isso lhe dá?"
    options:
      - { text: "Você pode apostar muito, porque raramente vai encontrar uma mão melhor", correct: true, why: "Sim: essa é a {{t:nuts-advantage}}. Uma {{t:bet|aposta}} grande tira mais das mãos médias do adversário, e um {{t:raise|aumento}} de uma mão melhor é raro." }
      - { text: "Você precisa sempre apostar pouco", why: "Não: você escolhe o tamanho pequeno quando tem só a {{t:range-advantage|vantagem de range}}. A {{t:nuts-advantage|vantagem de nuts}} permite apostar mais." }
      - { text: "Nada, só a sua mão importa", why: "A sua mão é importante, mas o adversário só vê o seu {{t:range}}. O tamanho da {{t:bet|aposta}} é escolhido para servir a muitas mãos ao mesmo tempo." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "O adversário tem duas cartas de valores diferentes, ex.: [[Jc Td]]. Em que porcentagem dos casos o flop não vai parear nenhuma delas? Digite um número."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Das {{n:cards.unseen.preflop}} cartas desconhecidas, só {{n:pair.outs.unpaired}} formam {{t:pair|par}}: os três valetes e os três dez restantes. O flop tem {{n:cards.board.flop}} cartas, e a chance de nenhuma delas ser uma dessas {{n:pair.outs.unpaired}} é de cerca de {{n:flop.miss.unpaired}}. Então você acerta um {{t:pair|par}} só em cerca de {{n:flop.hit.unpaired}} dos casos."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Uma mão sem {{t:pair|par}} não acerta {{t:pair|par}} no flop em cerca de {{n:flop.miss.unpaired}} dos casos. O que isso significa para o c-bet?"
    options:
      - { text: "O adversário muitas vezes não tem nada, então até uma {{t:bet|aposta}} pequena muitas vezes ganha o {{t:pot|pote}} na hora", correct: true, why: "Sim: essa é a base do c-bet. Errar nem sempre significa {{t:fold|desistir}} (o adversário pode ter um {{t:draw|projeto}} ou cartas altas), mas há muitas mãos fracas no {{t:range}} dele." }
      - { text: "O adversário vai {{t:fold|desistir}} exatamente em {{n:flop.miss.unpaired}} dos casos", why: "Não: um adversário sem {{t:pair|par}} às vezes {{t:call|paga}} com um {{t:draw|projeto}} ou com uma carta alta, e às vezes tem um {{t:pair|par}} na mão. É só uma aproximação de quantas vezes o flop não o acertou." }
      - { text: "Você também erra com a mesma frequência, então o c-bet não faz sentido", why: "Não: você também erra muitas vezes, mas o adversário não sabe quando. O seu {{t:range}} como {{t:aggressor|agressor}} (o jogador que {{t:raise|aumentou}} por último antes do flop) é mais forte em muitos flops, e a {{t:bet|aposta}} ganha o {{t:pot|pote}} quando o adversário {{t:fold|desiste}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "E em que porcentagem dos casos o flop vai parear pelo menos uma das duas cartas de uma mão sem {{t:pair|par}}? Digite um número."
    answer: flop.hit.unpaired
    explanation: "Esse é o complemento do número anterior: {{n:prob.certain}} menos {{n:flop.miss.unpaired}} dá cerca de {{n:flop.hit.unpaired}}, ou seja, mais ou menos um flop em cada três."
---
Antes do flop, os {{t:range|ranges}} dos jogadores são diferentes. Quem {{t:open|abre}} do Button tem muitas cartas altas. O {{t:big-blind}} defende de forma muito ampla, mas geralmente {{t:raise|aumenta}} com as mãos mais fortes (AA, KK, AK), então, depois de só {{t:call|pagar}}, tem poucas delas. O flop se encaixa melhor em um desses {{t:range|ranges}}, e isso decide quem pode apostar com frequência.

## {{t:range-advantage|Vantagem de range}}

Você tem a {{t:range-advantage|vantagem de range}} quando, em um determinado flop, as suas mãos são, em média, mais fortes que as do adversário. Em [[Ks 7d 2c]], depois de uma {{t:open|abertura}} do Button, é você quem tem mais reis com bom kicker e mais {{t:pair|pares}} altos. O {{t:big-blind}} tem aqui muitas mãos que erraram.

Em um flop baixo e {{t:connected|conectado}}, ex.: [[7s 6h 5d]], a {{t:range-advantage}} quase desaparece. O {{t:big-blind|big blind}} defende muitos {{t:connectors|conectores}} do mesmo naipe e mãos com seis ou sete, que aqui fazem {{t:straight|sequências}} e {{t:two-pair|dois pares}}, e suas cartas altas erraram.

## {{t:nuts-advantage|Vantagem de nuts}}

A {{t:nuts-advantage|vantagem de nuts}} é ter mais das mãos mais fortes (os “{{t:nuts}}”) no {{t:range}}. A {{t:range-advantage|vantagem de range}} diz com que frequência você pode apostar. A {{t:nuts-advantage|vantagem de nuts}} diz quanto: quando você tem muito mais das mãos mais fortes que o adversário, pode apostar com um tamanho maior. Quando você tem só a {{t:range-advantage|vantagem de range}}, aposta pouco.

## O adversário geralmente erra

Uma mão sem {{t:pair|par}}, ex.: [[Jc Td]], não acerta {{t:pair|par}} no flop em cerca de {{n:flop.miss.unpaired}} dos casos. Das {{n:cards.unseen.preflop}} cartas desconhecidas, só {{n:pair.outs.unpaired}} pareiam as cartas dela. As fontes costumam citar cerca de {{n:flop.hit.one-pair}}: essa é a chance de exatamente um {{t:pair|par}}; contando {{t:two-pair}} e {{t:three-of-a-kind|trinca}}, o acerto fica em cerca de {{n:flop.hit.unpaired}}. Por isso uma {{t:bet|aposta}} no flop muitas vezes ganha o {{t:pot|pote}} na hora, mesmo quando você não acertou nada. Errar nem sempre significa {{t:fold|desistir}}: o adversário pode ter um {{t:draw|projeto}} ou duas cartas altas.

:::note De onde vêm estes princípios
Os conceitos de {{t:range-advantage|vantagem de range}} e {{t:nuts-advantage|vantagem de nuts}} vêm de materiais sobre teoria dos jogos baseados em resultados de solvers (um glossário de termos e um artigo sobre tamanhos de c-bet). Os números desta lição são cálculos exatos do aplicativo.
:::
