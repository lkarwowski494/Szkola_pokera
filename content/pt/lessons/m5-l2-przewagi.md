---
id: m5.l2
module: m5
order: 2
title: "A quem favorece o flop"
sub: "Vantagem de range e vantagem de nuts"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. Flop: [[Ks 7d 2c]]. Quem tem a {{t:range-advantage|vantagem de range}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Eu, que {{t:open|abri}} do Button", correct: true, why: "Sim: tem no seu {{t:range}} todos os KK, AK e KQ. O {{t:big-blind|big blind}} aumentaria os mais fortes antes do flop, e a defesa larga dele é sobretudo composta por mãos que aqui falharam." }
      - { text: "O {{t:big-blind|big blind}}", why: "Não: o {{t:big-blind}} tem mais mãos fracas, porque defendeu de forma larga. Tem um rei com bom kicker mais raramente do que acontece consigo." }
      - { text: "Ninguém, o flop é aleatório", why: "O flop é aleatório, mas os {{t:range|ranges}} não são. O mesmo flop encaixa melhor no {{t:range}} que contém mais cartas altas." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. Flop: [[7s 6h 5d]]. Tem aqui {{t:nuts-advantage|vantagem de nuts}}, ou seja, claramente mais mãos das mais fortes do que o adversário?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "Não: o {{t:big-blind}} também tem aqui {{t:straight|sequências}} e {{t:two-pair|dois pares}}", correct: true, why: "Certo: o {{t:big-blind}} defende muitos {{t:connectors|conectores}} do mesmo naipe e mãos com um seis ou um sete, que aqui fazem {{t:straight|sequências}} e {{t:two-pair|dois pares}}. As suas cartas altas falharam aqui, por isso não tem claramente mais mãos das mais fortes." }
      - { text: "Sim, porque {{t:open|abri}} antes do flop", why: "Não: a {{t:open|abertura}} dá-lhe vantagem nos flops altos. Num flop baixo e {{t:connected|conectado}}, as suas cartas altas falharam, e o {{t:range}} do adversário faz aqui {{t:straight|sequências}} e {{t:two-pair|dois pares}}." }
      - { text: "Sim, porque tenho mais {{t:pair|pares}} altos", why: "Não: tem mais {{t:overpair|overpairs}} ({{t:pocket-pair|pocket pairs}} mais altos do que qualquer carta da {{t:board|mesa}}, p. ex. TT, JJ), mas num flop assim um {{t:overpair}} não está entre as mãos mais fortes: perde para uma {{t:straight|sequência}}, um set e {{t:two-pair|dois pares}}." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Porque é que um {{t:big-blind}} que apenas {{t:call|pagou}} a sua {{t:open|abertura}} raramente tem AA ou AK num flop [[Ad 8s 3c]]?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Porque com estas mãos costuma {{t:raise|aumentar}} antes do flop (3-bet)", correct: true, why: "Sim: o {{t:big-blind}} joga as mãos mais fortes com 3-bet, por isso, depois de apenas {{t:call|pagar}}, o {{t:range}} dele tem poucas das melhores mãos. O seu {{t:range}} tem-nas todas." }
      - { text: "Porque o {{t:big-blind}} nunca joga ases", why: "Não: o {{t:big-blind}} defende muitos ases, p. ex. A5 ou A9. Faltam-lhe sobretudo os mais fortes, que aumentaria." }
      - { text: "Porque já há um ás no flop", why: "O ás na {{t:board|mesa}} reduz o número de {{t:combo|combinações}} de ases em ambos os {{t:range|ranges}}, mas não cria diferença entre eles. A diferença vem das decisões antes do flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Tem a {{t:range-advantage|vantagem de range}}, mas o adversário tem tantas das mãos mais fortes como as suas. Com que tamanho tende a apostar?"
    options:
      - { text: "Pequeno, e com frequência", correct: true, why: "Sim: a {{t:range-advantage|vantagem de range}} indica que pode apostar com frequência. Sem {{t:nuts-advantage|vantagem de nuts}}, uma {{t:bet|aposta}} grande arrisca muito contra as mãos mais fortes do adversário, e as mãos mais fracas {{t:fold|desistem}} de qualquer forma perante uma pequena." }
      - { text: "Grande, porque tem a vantagem", why: "Não: o tamanho grande é decidido pela {{t:nuts-advantage|vantagem de nuts}}, ou seja, mais mãos das mais fortes. Aqui não a tem." }
      - { text: "{{t:check|Passo}} sempre", why: "Demasiado cauteloso: a {{t:range-advantage|vantagem de range}} é uma razão para apostar com frequência, mas pequeno." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "O seu {{t:range}} tem muitas mais mãos das mais fortes do que o {{t:range}} do adversário. O que é que isso lhe dá?"
    options:
      - { text: "Pode apostar grande, porque raramente vai encontrar uma mão melhor", correct: true, why: "Sim: é a {{t:nuts-advantage|vantagem de nuts}}. Uma {{t:bet|aposta}} grande extrai mais das mãos médias do adversário, e um {{t:raise|aumento}} de uma mão melhor acontece raramente." }
      - { text: "Tem de apostar sempre pequeno", why: "Não: escolhe um tamanho pequeno quando tem apenas a {{t:range-advantage|vantagem de range}}. A {{t:nuts-advantage|vantagem de nuts}} permite apostar mais." }
      - { text: "Nada, só conta a sua mão", why: "A sua mão é importante, mas o adversário só vê o seu {{t:range}}. O tamanho da {{t:bet|aposta}} escolhe-se de forma a servir para muitas mãos ao mesmo tempo." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "O adversário tem duas cartas de valor diferente, p. ex. [[Jc Td]]. Em que percentagem dos casos o flop não emparelha nenhuma delas? Introduza um número."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Das {{n:cards.unseen.preflop}} cartas desconhecidas, só {{n:pair.outs.unpaired}} dão {{t:pair|par}}: os três valetes e os três dez restantes. O flop são {{n:cards.board.flop}} cartas, e a probabilidade de nenhuma delas ser uma destas {{n:pair.outs.unpaired}} é de cerca de {{n:flop.miss.unpaired}}. Assim, acerta num {{t:pair|par}} apenas em cerca de {{n:flop.hit.unpaired}} dos casos."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Uma mão sem {{t:pair|par}} não acerta num {{t:pair|par}} no flop em cerca de {{n:flop.miss.unpaired}} dos casos. O que resulta daí para o c-bet?"
    options:
      - { text: "O adversário muitas vezes não tem nada, por isso até uma {{t:bet|aposta}} pequena ganha muitas vezes o {{t:pot|pote}} de imediato", correct: true, why: "Sim: é a base do c-bet. Falhar nem sempre significa {{t:fold|desistir}} (o adversário pode ter um {{t:draw|draw}} ou cartas altas), mas há muitas mãos fracas no {{t:range}} dele." }
      - { text: "O adversário vai {{t:fold|desistir}} exatamente em {{n:flop.miss.unpaired}} dos casos", why: "Não: um adversário sem {{t:pair|par}} às vezes {{t:call|paga}} com um {{t:draw|draw}} ou com uma carta alta, e às vezes tem um {{t:pair|par}} na mão. É apenas uma aproximação da frequência com que o flop não lhe acertou." }
      - { text: "Também falha com a mesma frequência, por isso o c-bet não faz sentido", why: "Não: também falha com frequência, mas o adversário não sabe quando. O seu {{t:range}} como {{t:aggressor|agressor}} (o jogador que {{t:raise|aumentou}} por último antes do flop) é mais forte em muitos flops, e uma {{t:bet|aposta}} ganha o {{t:pot|pote}} quando o adversário {{t:fold|desiste}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "E em que percentagem dos casos o flop emparelha pelo menos uma das duas cartas de uma mão sem {{t:pair|par}}? Introduza um número."
    answer: flop.hit.unpaired
    explanation: "É o complemento do número anterior: {{n:prob.certain}} menos {{n:flop.miss.unpaired}} dá cerca de {{n:flop.hit.unpaired}}, ou seja, aproximadamente um flop em cada três."
---
Antes do flop, os {{t:range|ranges}} dos jogadores são diferentes. Quem {{t:open|abre}} do Button tem muitas cartas altas. O {{t:big-blind|big blind}} defende de forma muito larga, mas as mãos mais fortes (AA, KK, AK) normalmente {{t:raise|aumenta}}, por isso, depois de apenas {{t:call|pagar}}, tem poucas delas. O flop encaixa melhor num destes {{t:range|ranges}}, e é isso que decide quem pode apostar com frequência.

## {{t:range-advantage|Vantagem de range}}

Tem a {{t:range-advantage|vantagem de range}} quando, num dado flop, as suas mãos são em média mais fortes do que as do adversário. Em [[Ks 7d 2c]], depois de {{t:open|abrir}} do Button, é do seu lado que estão mais reis com bom kicker e mais {{t:pair|pares}} altos. O {{t:big-blind|big blind}} tem aqui muitas mãos que falharam.

Num flop baixo e {{t:connected|conectado}}, p. ex. [[7s 6h 5d]], a {{t:range-advantage}} quase desaparece. O {{t:big-blind|big blind}} defende muitos {{t:connectors|conectores}} do mesmo naipe e mãos com um seis ou um sete, que aqui fazem {{t:straight|sequências}} e {{t:two-pair|dois pares}}, e as suas cartas altas falharam.

## {{t:nuts-advantage|Vantagem de nuts}}

A {{t:nuts-advantage|vantagem de nuts}} consiste em ter mais mãos das mais fortes («{{t:nuts|nuts}}») no {{t:range}}. A {{t:range-advantage|vantagem de range}} indica com que frequência pode apostar. A {{t:nuts-advantage|vantagem de nuts}} indica quanto: quando tem muitas mais mãos das mais fortes do que o adversário, pode apostar com um tamanho maior. Quando tem apenas a {{t:range-advantage|vantagem de range}}, aposta pequeno.

## O adversário normalmente falha

Uma mão sem {{t:pair|par}}, p. ex. [[Jc Td]], não acerta num {{t:pair|par}} no flop em cerca de {{n:flop.miss.unpaired}} dos casos. Das {{n:cards.unseen.preflop}} cartas desconhecidas, só {{n:pair.outs.unpaired}} emparelham as suas cartas. As fontes indicam muitas vezes cerca de {{n:flop.hit.one-pair}}: é a probabilidade de exatamente um {{t:pair|par}}; contando com {{t:two-pair|dois pares}} e {{t:three-of-a-kind|trio}}, o acerto é de cerca de {{n:flop.hit.unpaired}}. Por isso, uma {{t:bet|aposta}} no flop ganha muitas vezes o {{t:pot|pote}} de imediato, mesmo quando não acertou em nada. Falhar nem sempre significa {{t:fold|desistir}}: o adversário pode ter um {{t:draw|draw}} ou duas cartas altas.

:::note De onde vêm estes princípios
Os conceitos de {{t:range-advantage|vantagem de range}} e de {{t:nuts-advantage|vantagem de nuts}} provêm de materiais sobre teoria dos jogos baseados em resultados de solvers (um glossário de conceitos e um artigo sobre tamanhos de c-bet). Os números desta lição são cálculos exatos da aplicação.
:::
