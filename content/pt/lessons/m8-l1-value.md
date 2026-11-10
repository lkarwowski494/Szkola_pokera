---
id: m8.l1
module: m8
order: 1
title: "Aposta de valor no river"
sub: "Aposte quando pagam mãos piores"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: todas as cartas já estão na {{t:board|mesa}}. Para que apostar, afinal?"
    options:
      - { text: "Para que mãos piores paguem ou para que mãos melhores {{t:fold|desistam}}", correct: true, why: "No river já não há cartas por sair, por isso a aposta tem apenas dois objetivos: valor (mãos piores pagam) ou {{t:bluff}} (mãos melhores {{t:fold|desistem}}). Uma aposta que não faz nenhuma destas coisas apenas custa." }
      - { text: "Para tirar ao adversário a hipótese de completar a mão", why: "Esse é um motivo para apostar no flop e no turn. No river, o adversário já não vai completar nada: a mão dele está feita." }
      - { text: "Para verificar se a minha mão é a melhor", why: "Uma aposta não é uma pergunta. Quando aposta com uma mão média, as mãos piores normalmente {{t:fold|desistem}} e quem paga são as melhores, pelo que «fica a saber» à custa do seu próprio dinheiro. De graça, fica a saber depois de {{t:check|passar}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, o adversário {{t:check|passa}}. Estima que pagará a sua aposta em {{n:value.ex.calls}} casos: {{n:value.ex.many}} vezes com uma mão pior, {{n:value.ex.few}} vezes com uma melhor. O adversário não pode {{t:raise|aumentar}}. Aposta?"
    options:
      - { text: "Sim, é uma aposta {{t:value|de valor}}", correct: true, why: "Ganha a aposta {{n:value.ex.many}} vezes e perde-a {{n:value.ex.few}} vezes: em termos líquidos, ficam {{n:value.ex.net}} apostas. Mais de {{n:value.threshold}} dos {{t:call|pagamentos}} são mãos piores, por isso apostar rende mais do que {{t:check}}." }
      - { text: "Não, porque às vezes pagará com uma mão melhor", why: "Uma mão melhor pagará sempre numa parte dos casos. O que conta é se há mais {{t:call|pagamentos}} com mãos piores do que com melhores: aqui são {{n:value.ex.many}} para {{n:value.ex.few}}." }
      - { text: "Só se o adversário nunca tiver uma mão melhor", why: "Nesse caso apostaria apenas com as nuts e abdicaria de muito valor. Basta que mais de {{n:value.threshold}} dos {{t:call|pagamentos}} sejam mãos piores." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, o adversário {{t:check|passa}}. Pagará a sua aposta em {{n:value.ex.calls}} casos: {{n:value.ex.few}} vezes com uma mão pior, {{n:value.ex.many}} vezes com uma melhor. As mãos piores do adversário que {{t:fold|desistirem}} perderiam de qualquer forma contra si no showdown. O que faz?"
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "A aposta ganharia {{n:value.ex.few}} vezes e perderia {{n:value.ex.many}} vezes: em termos líquidos, perde {{n:value.ex.net}} apostas. Depois de {{t:check|passar}}, ganha o {{t:pot|pote}} contra as mesmas mãos piores, só que sem pagar às melhores." }
      - { text: "Aposto, porque tenho uma mão razoável", why: "A força da mão, por si só, não chega. O que conta é quem paga: aqui a maioria dos {{t:call|pagamentos}} são mãos melhores, por isso a aposta perde." }
      - { text: "Aposto alto para que as mãos melhores {{t:fold|desistam}}", why: "Isso seria um {{t:bluff}} com uma mão que ganha muitas vezes no showdown. As mãos melhores raramente {{t:fold|desistem}} no river e, depois de {{t:check|passar}}, ganhará de qualquer forma às piores." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. A sua aposta vai ser {{t:call|paga}} por {{n:value.ex.many}} mãos piores e {{n:value.ex.few}} melhores. Quantas apostas ganha em termos líquidos nestes {{n:value.ex.calls}} {{t:call|pagamentos}}? Introduza um número."
    answer: value.ex.net
    explanation: "Cada {{t:call}} com uma mão pior é uma aposta ganha e cada um com uma mão melhor é uma aposta perdida: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. Ganharia o {{t:pot|pote}} contra as mãos piores também depois de {{t:check|passar}}, por isso conta apenas as apostas."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. Apostou no flop e no turn e recebeu sempre um {{t:call}}. River, o {{t:big-blind}} {{t:check|passa}}. O que faz?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Aposto {{t:value|por valor}}", correct: true, why: "{{t:top-pair|Top pair}} com o melhor kicker. Um adversário que {{t:call|pagou}} duas {{t:street|rondas}} tem muitos reis mais fracos (KQ, KJ, KT) e noves, e havia poucos {{t:draw|draws}} nesta {{t:board|mesa}}. As mãos piores vão pagar muito mais vezes do que as melhores ({{t:two-pair}}, sets). Normalmente, o {{t:top-pair}} aguenta duas {{t:value|rondas de valor}} (M9); aqui, uma terceira, porque o adversário paga com reis mais fracos." }
      - { text: "{{t:check|Passo}}, porque o adversário podia ter um set", why: "Podia, mas raramente. Ao {{t:check|passar}}, perde a aposta de todos os reis mais fracos com que ele pagaria. Conta quem vai {{t:call|pagar}}, e não se existe uma mão melhor." }
      - { text: "{{t:check|Passo}} para que o adversário faça bluff", why: "Um adversário que {{t:call|pagou}} duas vezes tem sobretudo {{t:pair|pares}} e raramente {{t:bluff|faz bluff}} quando lhe {{t:check|passa}} a ação. Ganhará de forma mais segura apostando contra os reis mais fracos dele." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. No flop fez c-bet e recebeu um {{t:call}}; no turn, ambos {{t:check|passaram}}. River, o {{t:big-blind}} {{t:check|passa}}. O que faz?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "O {{t:second-pair|segundo par}} com kicker fraco ganha a {{t:draw|draws}} falhados e a {{t:pair|pares}} mais fracos, mas essas mãos vão {{t:fold|desistir}} perante uma aposta. Pagarão sobretudo reis e dez melhores. {{t:check|Passa}} e vê o showdown de graça." }
      - { text: "Aposto {{t:value|por valor}}", why: "Quem vai pagar? As mãos sem {{t:pair|par}} vão {{t:fold|desistir}}, e os reis e os dez melhores vão {{t:call|pagar}}. A maioria dos {{t:call|pagamentos}} seria de mãos melhores do que a sua." }
      - { text: "Aposto alto como {{t:bluff}}", why: "A sua mão ganha muitas vezes no showdown. Ao {{t:bluff|fazer bluff}}, abdica dessa vitória: as mãos piores {{t:fold|desistiriam}} de qualquer forma, e os reis raramente {{t:fold|desistem}}." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. No flop fez c-bet e recebeu um {{t:call}}; no turn, ambos {{t:check|passaram}}. River, o {{t:big-blind}} {{t:check|passa}}. Tem {{t:top-pair|top pair}} com kicker dez. Que mãos pagarão uma aposta pequena e serão piores do que a sua?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Oitos, quatros e damas com kicker mais fraco", correct: true, why: "Estas mãos pagaram o flop e têm {{t:pair|par}}, por isso vão pagar muitas vezes uma aposta pequena. Perde contra uma dama com melhor kicker, {{t:two-pair|dois pares}}, sets e {{t:straight|sequências}} (A5, 65), mas há mais {{t:call|pagamentos}} piores." }
      - { text: "Mãos sem {{t:pair|par}}", why: "Uma mão sem {{t:pair|par}} raramente paga uma aposta no river; às vezes paga com ás alto, mas aqui há muito mais {{t:pair|pares}} piores." }
      - { text: "Nenhuma, só pagam mãos melhores", why: "Demasiado cauteloso: o {{t:big-blind}} defende muitos {{t:pair|pares}} abaixo da dama. Depois de {{t:check|passarem}} no turn, o {{t:range}} dele inclui bastantes." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "A mesma situação: tem {{t:top-pair|top pair}} com kicker dez e o {{t:big-blind}} passa no river. No {{t:pot|pote}} estão {{n:ex.pot}}. O que faz?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Aposta de {{n:ex.bet.quarter}}, ou seja, 1/4 do {{t:pot|pote}}", correct: true, why: "Thin value: ganha a pouco mais de metade das mãos que vão pagar. Uma aposta pequena vai ser {{t:call|paga}} por oitos, quatros e damas mais fracas, por isso continua a haver mais {{t:call|pagamentos}} piores do que melhores." }
      - { text: "Aposta de {{n:ex.bet.pot}}, ou seja, o {{t:pot|pote}} inteiro", sizeError: true, why: "Ação certa, tamanho errado: perante uma aposta do tamanho do {{t:pot|pote}}, os oitos e os quatros vão {{t:fold|desistir}} e pagarão sobretudo damas melhores, {{t:two-pair}} e sets. Nesse caso, a maioria dos {{t:call|pagamentos}} é melhor do que a sua mão. Thin value aposta-se pequeno." }
      - { text: "{{t:check|Passo}}", why: "Perde valor: o adversário tem muitos {{t:pair|pares}} mais baixos que pagariam uma aposta pequena. {{t:check|Passar}} deita esse dinheiro fora." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Um colega diz: «No river, com um {{t:pair|par}} médio, aposto para perceber onde estou». O que está errado nesta ideia?"
    options:
      - { text: "As mãos piores vão {{t:fold|desistir}} e as melhores vão pagar", correct: true, why: "Depois de uma aposta destas, as mãos a que ganha {{t:fold|desistem}} e aquelas contra as quais perde pagam ou {{t:raise|aumentam}}. Obtém a informação de graça depois de {{t:check|passar}}, porque, como tem {{t:position|posição}}, o adversário mostrará as cartas no showdown." }
      - { text: "Nada, é uma boa forma de obter informação", why: "Aqui a informação custa uma aposta que normalmente perde. Depois de {{t:check|passar}}, verá a mão do adversário sem pagar mais." }
      - { text: "A aposta devia ser maior", why: "Uma aposta maior piora a situação: ainda mais mãos piores vão {{t:fold|desistir}}, e as melhores continuarão a pagar." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "O seu {{t:flush-draw}} não entrou. No river, pondera apostar. Que tipo de aposta seria?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Bluff}}", correct: true, why: "Tem apenas a dama como carta mais alta. Nenhuma mão que {{t:call|pague}} a sua aposta será pior, por isso a aposta só pode ganhar se o adversário {{t:fold|desistir}}. É um {{t:bluff}} (a escolha de {{t:bluff|bluffs}} fica para as próximas lições)." }
      - { text: "Aposta {{t:value|de valor}}", why: "Uma aposta {{t:value|de valor}} exige que paguem mãos piores. Só com a dama, quase nada pior vai {{t:call|pagar}}." }
      - { text: "Thin value", why: "Thin value é uma aposta com uma mão que ganha a pouco mais de metade dos {{t:call|pagamentos}}. A sua mão não ganha a quase nenhum {{t:call|pagamento}}." }
---
No river, todas as cartas já estão na {{t:board|mesa}}. Ninguém vai completar nada, por isso uma aposta só pode fazer duas coisas: levar uma mão pior a pagar (**valor**) ou levar uma mão melhor a {{t:fold|desistir}} (**{{t:bluff}}**). Nesta lição trata do valor; nas seguintes, de {{t:bluff|bluffs}} e de pagar apostas.

## O limiar: mais de metade dos {{t:call|pagamentos}}

Quando aposta com {{t:position|posição}} e o adversário só pode {{t:call|pagar}} ou {{t:fold|desistir}}, conta apenas as mãos com que ele vai pagar:

```formula
aposta de valor: pagamentos piores > pagamentos melhores
```

Cada {{t:call}} com uma mão pior ganha uma aposta. Cada {{t:call}} com uma mão melhor perde uma aposta. Quando o adversário {{t:fold|desiste}} com uma mão pior, ganha o mesmo {{t:pot|pote}} que ganharia depois de {{t:check|passar}}. Por isso, a aposta dá lucro quando mais de **{{n:value.threshold}}** das mãos que vão pagar são piores do que a sua.

Exemplo: em {{n:value.ex.calls}} {{t:call|pagamentos}}, {{n:value.ex.many}} são mãos piores e {{n:value.ex.few}} são melhores. Em termos líquidos, ganha {{n:value.ex.net}} apostas. Se a proporção fosse a inversa, perderia o mesmo.

## Quem vai pagar

Não pergunta «tenho uma boa mão?», mas sim «com que mãos vai o adversário pagar?». Ajuda percorrer o {{t:range}} dele:

- as mãos sem {{t:pair|par}} raramente pagam; às vezes paga um ás alto, que ganha aos {{t:bluff|bluffs}},
- os {{t:pair|pares}} mais baixos e os kickers mais fracos pagam muitas vezes uma aposta pequena,
- as mãos melhores pagam sempre e, às vezes, {{t:raise|aumentam}}.

Quando o adversário pode {{t:raise|aumentar}} e, nesse caso, teria de {{t:fold|desistir}}, o limiar é ainda mais alto: a aposta só dá lucro com uma clara vantagem de {{t:call|pagamentos}} piores.

## Thin value: pouco, mas pago

Thin value (valor fino) é uma aposta com uma mão que ganha a pouco mais de metade dos {{t:call|pagamentos}}, p. ex. com {{t:top-pair|top pair}} e kicker médio. Esta aposta faz-se **mais pequena** do que com uma mão forte, normalmente cerca de 1/4–1/2 do {{t:pot|pote}}: uma aposta pequena também é paga por {{t:pair|pares}} mais fracos, mas perante uma grande estes {{t:fold|desistem}} e ficam apenas as mãos melhores.

Isto é uma simplificação: sem risco de check-raise, o solver aposta thin value até cerca de 1/4 do {{t:pot|pote}}; com esse risco, com {{t:position|posição}}, raramente desce abaixo de 1/2 do {{t:pot|pote}}.

## Uma mão média {{t:check|passa}}

Tem uma mão média {{t:in-position}}, p. ex. o {{t:second-pair|segundo par}}. As mãos piores do adversário {{t:fold|desistem}} perante uma aposta e as melhores pagam. Nesse caso, a aposta transforma a sua mão num {{t:bluff}}. {{t:check|Passa}}: ganha o showdown contra as mãos piores sem pagar às melhores.

:::note De onde vêm estas regras
O limiar de mais de metade dos {{t:call|pagamentos}} é pura matemática (aposta {{t:in-position}}, sem {{t:raise|aumento}} e sem rake). O tamanho do thin value e {{t:check}} com uma mão média vêm de análises de solver publicadas ({{t:tournament|torneios}} com stacks mais curtos) e de materiais de formação.
:::
