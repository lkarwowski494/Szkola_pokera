---
id: m8.l1
module: m8
order: 1
title: "Aposta de valor no river"
sub: "Aposte quando mãos piores pagarem"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: todas as cartas já estão na {{t:board|mesa}}. Por que apostar, afinal?"
    options:
      - { text: "Para que mãos piores paguem ou mãos melhores {{t:fold|desistam}}", correct: true, why: "No river não há mais cartas por vir, então a aposta tem só dois objetivos: valor (mãos piores pagam) ou {{t:bluff|blefe}} (mãos melhores {{t:fold|desistem}}). Uma aposta que não faz nenhuma das duas coisas só custa caro." }
      - { text: "Para tirar do rival a chance de completar a mão", why: "Esse é um motivo para apostar no flop e no turn. No river o rival não vai completar mais nada: a mão dele já está definida." }
      - { text: "Para saber se a minha mão é a melhor", why: "Aposta não é pergunta. Quando você aposta com uma mão média, as mãos piores costumam {{t:fold|desistir}} e as melhores pagam, então você “descobre” com o seu próprio dinheiro. Você descobre de graça ao {{t:check|passar}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, o rival {{t:check|passa}}. Você estima que ele vai pagar sua aposta em {{n:value.ex.calls}} casos: {{n:value.ex.many}} vezes com mão pior, {{n:value.ex.few}} vezes com mão melhor. Ele não pode {{t:raise|aumentar}}. Você aposta?"
    options:
      - { text: "Sim, é uma aposta por {{t:value|valor}}", correct: true, why: "Você ganha a aposta {{n:value.ex.many}} vezes e perde {{n:value.ex.few}} vezes: sobram {{n:value.ex.net}} apostas líquidas. Mais de {{n:value.threshold}} dos {{t:call|pagamentos}} são mãos piores, então apostar rende mais do que {{t:check|passar}}." }
      - { text: "Não, porque às vezes ele vai pagar com mão melhor", why: "Uma mão melhor sempre vai pagar em parte dos casos. O que importa é se há mais {{t:call|pagamentos}} com mãos piores do que com melhores: aqui são {{n:value.ex.many}} contra {{n:value.ex.few}}." }
      - { text: "Só se o rival nunca tiver mão melhor", why: "Assim você apostaria só com os nuts e deixaria muito valor na mesa. Basta que mais de {{n:value.threshold}} dos {{t:call|pagamentos}} sejam mãos piores." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, o rival {{t:check|passa}}. Ele vai pagar sua aposta em {{n:value.ex.calls}} casos: {{n:value.ex.few}} vezes com mão pior, {{n:value.ex.many}} vezes com mão melhor. As mãos piores do rival que {{t:fold|desistirem}} perderiam para você no showdown de qualquer jeito. O que você faz?"
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "A aposta ganharia {{n:value.ex.few}} vezes e perderia {{n:value.ex.many}} vezes: você perde {{n:value.ex.net}} apostas líquidas. Ao {{t:check|passar}}, você ganha o {{t:pot|pote}} contra as mesmas mãos piores, só que sem pagar a mais para as melhores." }
      - { text: "Aposto, porque tenho uma mão razoável", why: "A força da mão sozinha não basta. O que importa é quem vai pagar: aqui a maioria dos {{t:call|pagamentos}} vem de mãos melhores, então a aposta perde." }
      - { text: "Aposto alto para as mãos melhores {{t:fold|desistirem}}", why: "Isso seria um {{t:bluff|blefe}} com uma mão que muitas vezes ganha no showdown. Mãos melhores raramente {{t:fold|desistem}} no river, e depois de {{t:check|passar}} você ganha das piores de qualquer jeito." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. {{n:value.ex.many}} mãos piores e {{n:value.ex.few}} melhores vão {{t:call|pagar}} sua aposta. Quantas apostas líquidas você ganha nesses {{n:value.ex.calls}} {{t:call|pagamentos}}? Digite um número."
    answer: value.ex.net
    explanation: "Cada {{t:call|pagamento}} com mão pior é uma aposta ganha, e cada um com mão melhor é uma aposta perdida: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. Você ganharia o {{t:pot|pote}} contra as mãos piores também depois de {{t:check|passar}}, então conta só as apostas."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "Você {{t:open|abriu}} do Button, e o {{t:big-blind}} {{t:call|pagou}}. Você apostou no flop e no turn e foi {{t:call|pago}} nas duas vezes. River, o {{t:big-blind}} {{t:check|passa}}. O que você faz?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Aposto por {{t:value|valor}}", correct: true, why: "{{t:top-pair|Par mais alto}} com o melhor kicker. Um rival que {{t:call|pagou}} duas {{t:street|rodadas}} tem muitos reis mais fracos (KQ, KJ, KT) e noves, e havia poucos {{t:draw|projetos}} nesta {{t:board|mesa}}. Mãos piores vão pagar com muito mais frequência do que as melhores ({{t:two-pair|dois pares}}, sets). Normalmente o {{t:top-pair|par mais alto}} aguenta duas {{t:value|rodadas de valor}} (M9); aqui, uma terceira, porque o rival paga com reis mais fracos." }
      - { text: "{{t:check|Passo}}, porque o rival pode ter um set", why: "Pode, mas é raro. Ao {{t:check|passar}}, você perde a aposta de todos os reis mais fracos com que ele pagaria. Você conta quem vai {{t:call|pagar}}, e não se existe uma mão melhor." }
      - { text: "{{t:check|Passo}} para o rival blefar", why: "Um rival que {{t:call|pagou}} duas vezes tem principalmente {{t:pair|pares}} e raramente {{t:bluff|blefa}} depois que você {{t:check|passa}}. Você lucra com mais segurança apostando contra os reis mais fracos dele." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Você {{t:open|abriu}} do Button, e o {{t:big-blind}} {{t:call|pagou}}. No flop você fez c-bet e foi {{t:call|pago}}; no turn, os dois {{t:check|passaram}}. River, o {{t:big-blind}} {{t:check|passa}}. O que você faz?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "{{t:second-pair|Segundo par}} com kicker fraco ganha de {{t:draw|projetos}} que não entraram e de {{t:pair|pares}} mais fracos, mas essas mãos vão {{t:fold|desistir}} diante de uma aposta. Vão pagar principalmente reis e dez melhores. Você {{t:check|passa}} e vê o showdown de graça." }
      - { text: "Aposto por {{t:value|valor}}", why: "Quem vai pagar? Mãos sem {{t:pair|par}} vão {{t:fold|desistir}}, e reis e dez melhores vão {{t:call|pagar}}. A maioria dos {{t:call|pagamentos}} seria de mãos melhores que a sua." }
      - { text: "Aposto alto como {{t:bluff|blefe}}", why: "Sua mão muitas vezes ganha no showdown. Ao {{t:bluff|blefar}}, você abre mão dessa vitória: as mãos piores {{t:fold|desistiriam}} de qualquer jeito, e os reis raramente {{t:fold|desistem}}." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "Você {{t:open|abriu}} do Button, e o {{t:big-blind}} {{t:call|pagou}}. No flop você fez c-bet e foi {{t:call|pago}}; no turn, os dois {{t:check|passaram}}. River, o {{t:big-blind}} {{t:check|passa}}. Você tem {{t:top-pair|par mais alto}} com kicker dez. Quais mãos vão pagar uma aposta pequena e são piores que a sua?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Oitos, quatros e damas com kicker mais fraco", correct: true, why: "Essas mãos pagaram o flop e têm {{t:pair|par}}, então muitas vezes vão pagar uma aposta pequena. Você perde para dama com kicker melhor, {{t:two-pair|dois pares}}, sets e {{t:straight|sequências}} (A5, 65), mas há mais {{t:call|pagamentos}} com mãos piores." }
      - { text: "Mãos sem {{t:pair|par}}", why: "Uma mão sem {{t:pair|par}} raramente paga aposta no river; às vezes um ás alto paga, mas aqui há muito mais {{t:pair|pares}} piores." }
      - { text: "Nenhuma, só mãos melhores pagam", why: "Cuidado demais: o {{t:big-blind}} defende muitos {{t:pair|pares}} abaixo da dama. Depois de {{t:check|passar}} no turn, o {{t:range}} dele tem bastante deles." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Mesma situação: você tem {{t:top-pair|par mais alto}} com kicker dez, e o {{t:big-blind}} passa no river. Há {{n:ex.pot}} no {{t:pot|pote}}. O que você faz?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Aposta de {{n:ex.bet.quarter}}, ou seja, 1/4 do {{t:pot|pote}}", correct: true, why: "Thin value: você ganha de pouco mais da metade das mãos que vão pagar. Oitos, quatros e damas mais fracas vão {{t:call|pagar}} uma aposta pequena, então continua havendo mais {{t:call|pagamentos}} com mãos piores do que com melhores." }
      - { text: "Aposta de {{n:ex.bet.pot}}, ou seja, o {{t:pot|pote}} inteiro", sizeError: true, why: "Ação certa, tamanho errado: diante de uma aposta do tamanho do {{t:pot|pote}}, oitos e quatros vão {{t:fold|desistir}}, e vão pagar principalmente damas melhores, {{t:two-pair|dois pares}} e sets. Aí a maioria dos {{t:call|pagamentos}} é de mãos melhores que a sua. Aposte pouco no thin value." }
      - { text: "{{t:check|Passo}}", why: "Você perde valor: o rival tem muitos {{t:pair|pares}} mais baixos que pagariam uma aposta pequena. {{t:check|Passar}} entrega esse dinheiro." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Um amigo diz: “No river, com um {{t:pair|par}} médio, eu aposto para saber onde estou”. O que há de errado com essa ideia?"
    options:
      - { text: "Mãos piores vão {{t:fold|desistir}}, e as melhores vão pagar", correct: true, why: "Depois de uma aposta assim, as mãos que você vence {{t:fold|desistem}}, e as que vencem você pagam ou {{t:raise|aumentam}}. Você consegue a informação de graça ao {{t:check|passar}}, porque, com {{t:position|posição}}, o rival vai mostrar as cartas no showdown." }
      - { text: "Nada, é uma boa forma de obter informação", why: "Aqui a informação custa uma aposta que você geralmente perde. Depois de {{t:check|passar}}, você vê a mão do rival sem pagar nada a mais." }
      - { text: "A aposta deveria ser maior", why: "Uma aposta maior piora as coisas: ainda mais mãos piores vão {{t:fold|desistir}}, e as melhores continuam pagando." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Seu {{t:flush-draw|projeto de flush}} não entrou. No river você pensa em apostar. Que tipo de aposta seria essa?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Blefe}}", correct: true, why: "Você tem só a dama como carta mais alta. Nenhuma mão que {{t:call|pagar}} você será pior, então a aposta só ganha se o rival {{t:fold|desistir}}. É um {{t:bluff|blefe}} (a escolha dos {{t:bluff|blefes}} fica para as próximas lições)." }
      - { text: "Aposta por {{t:value|valor}}", why: "Uma aposta por {{t:value|valor}} exige que mãos piores paguem. Só com a dama, quase nada pior vai {{t:call|pagar}} você." }
      - { text: "Thin value", why: "Thin value é uma aposta com uma mão que ganha de pouco mais da metade dos {{t:call|pagamentos}}. Sua mão não ganha de quase nenhum {{t:call|pagamento}}." }
---
No river todas as cartas já estão na {{t:board|mesa}}. Ninguém vai completar mais nada, então a aposta só pode fazer duas coisas: fazer uma mão pior pagar (**valor**) ou fazer uma mão melhor {{t:fold|desistir}} (**{{t:bluff|blefe}}**). Nesta lição você vai tratar do valor; nas próximas, dos {{t:bluff|blefes}} e de pagar apostas.

## O limiar: mais da metade dos {{t:call|pagamentos}}

Quando você aposta com {{t:position|posição}} e o rival só pode {{t:call|pagar}} ou {{t:fold|desistir}}, você conta apenas as mãos com que ele vai pagar:

```formula
aposta por valor: pagamentos com mãos piores > pagamentos com mãos melhores
```

Cada {{t:call|pagamento}} com mão pior ganha uma aposta. Cada {{t:call|pagamento}} com mão melhor perde uma aposta. Quando o rival {{t:fold|desiste}} com uma mão pior, você ganha o mesmo {{t:pot|pote}} que ganharia depois de {{t:check|passar}}. Por isso a aposta dá lucro quando mais de **{{n:value.threshold}}** das mãos que vão pagar são piores que a sua.

Exemplo: de {{n:value.ex.calls}} {{t:call|pagamentos}}, {{n:value.ex.many}} são mãos piores e {{n:value.ex.few}}, melhores. No líquido, você ganha {{n:value.ex.net}} apostas. Se a proporção fosse inversa, você perderia o mesmo tanto.

## Quem vai pagar

A pergunta não é “tenho uma mão boa?”, e sim “com o que o rival vai pagar?”. Ajuda percorrer o {{t:range}} dele:

- mãos sem {{t:pair|par}} raramente pagam; às vezes paga um ás alto, que ganha dos {{t:bluff|blefes}},
- {{t:pair|pares}} mais baixos e kickers mais fracos muitas vezes pagam uma aposta pequena,
- mãos melhores sempre vão pagar e, às vezes, {{t:raise|aumentar}}.

Quando o rival pode {{t:raise|aumentar}} e você teria que {{t:fold|desistir}} nesse caso, o limiar fica ainda mais alto: a aposta só dá lucro com uma vantagem clara de {{t:call|pagamentos}} com mãos piores.

## Thin value: pouco, mas pago

Thin value (valor fino) é uma aposta com uma mão que ganha de pouco mais da metade dos {{t:call|pagamentos}}, por exemplo {{t:top-pair|par mais alto}} com kicker médio. Essa aposta você faz **menor** do que com uma mão forte, geralmente cerca de 1/4–1/2 do {{t:pot|pote}}: uma aposta pequena também é paga por {{t:pair|pares}} mais fracos, mas diante de uma grande eles vão {{t:fold|desistir}} e só vão sobrar mãos melhores.

Isto é uma simplificação: sem risco de check-raise, o solver faz thin value com apostas de até cerca de 1/4 do {{t:pot|pote}}, e com esse risco, com {{t:position|posição}}, raramente fica abaixo de 1/2 do {{t:pot|pote}}.

## Mão média {{t:check|passa}}

Você tem uma mão média {{t:in-position|em posição}}, por exemplo {{t:second-pair|segundo par}}. As mãos piores do rival vão {{t:fold|desistir}} diante de uma aposta, e as melhores vão pagar. Aí a aposta transforma sua mão em {{t:bluff|blefe}}. Você {{t:check|passa}}: ganha o showdown contra as mãos piores sem pagar a mais para as melhores.

:::note De onde vêm estas regras
O limiar de mais da metade dos {{t:call|pagamentos}} é pura matemática (aposta {{t:in-position|em posição}}, sem {{t:raise|aumento}} e sem rake). O tamanho do thin value e {{t:check|passar}} com mão média vêm de análises de solver publicadas ({{t:tournament|torneios}} com stacks mais curtos) e de materiais de treinamento.
:::
