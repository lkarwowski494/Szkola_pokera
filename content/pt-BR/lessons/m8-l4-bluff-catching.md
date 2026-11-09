---
id: m8.l4
module: m8
order: 4
title: "Pegando blefes"
sub: "Com quais mãos pagar no river"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Você está defendendo o {{t:big-blind|big blind}}. No river, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} o {{t:pot|pote}} inteiro. As espadas não vieram. Qual é o papel do seu {{t:pair|par}} de noves?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: ganha só de {{t:bluff|blefes}}", correct: true, why: "Apostando o {{t:pot|pote}} inteiro, o Button aposta por {{t:value|valor}} com pelo menos um rei e {{t:bluff|blefa}} principalmente com {{t:draw|projetos}} furados. Seu {{t:pair|par}} perde para todas as mãos de {{t:value|valor}} dele e ganha de todos os {{t:bluff|blefes}}." }
      - { text: "Mão de {{t:value|valor}}", why: "Uma mão de {{t:value|valor}} ganha de mãos que pagam ou apostam por {{t:value|valor}}. Um {{t:pair|par}} de noves perde para qualquer rei e qualquer mão melhor do Button." }
      - { text: "Mão sem chance", why: "Um {{t:pair|par}} de noves ganha de {{t:draw|projetos}} furados, e é com eles que o Button {{t:bluff|blefa}}. Tem chance, mas só contra {{t:bluff|blefes}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. O {{t:pot|pote}} é de {{n:ex.pot}}, e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. Você tem um bluff-catcher. No mínimo, qual porcentagem das apostas dele precisa ser {{t:bluff|blefe}} para que {{t:call|pagar}} compense? Digite um número."
    answer: eq.bet-pot
    explanation: "Sua equity é a fração de {{t:bluff|blefes}} nas apostas dele. Você coloca {{n:ex.bet.pot}} para ganhar o {{t:pot|pote}} depois de {{t:call|pagar}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. É o mesmo número que a fração de {{t:bluff|blefes}} no equilíbrio da lição anterior."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. O adversário {{t:bet|aposta}} meio {{t:pot|pote}}. Você tem um bluff-catcher e estima que os {{t:bluff|blefes}} sejam cerca de {{n:catch.ex.bluffs-low}} das apostas dele. O que você faz?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você precisa de {{n:eq.bet-half}} de equity, e seu bluff-catcher ganha só em {{n:catch.ex.bluffs-low}} dos casos. {{t:call|Pagar}} dá prejuízo." }
      - { text: "{{t:call|Pago}}, porque o {{t:mdf|MDF}} é {{n:mdf.bet-half}}", why: "O {{t:mdf|MDF}} protege contra um adversário que {{t:bluff|blefa}} com frequência suficiente. Quando há poucos {{t:bluff|blefes}}, {{t:call|pagar}} com bluff-catchers é entregar dinheiro." }
      - { text: "{{t:raise|Aumento}}", why: "Sua mão ganha só de {{t:bluff|blefes}}. Depois do {{t:raise|aumento}}, os {{t:bluff|blefes}} {{t:fold|desistem}} e as mãos de {{t:value|valor}} pagam: você perde mais." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. O adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Você tem um bluff-catcher e estima que os {{t:bluff|blefes}} sejam cerca de {{n:catch.ex.bluffs-high}} das apostas dele. O que você faz?"
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Você precisa de {{n:eq.bet-pot}} de equity, e os {{t:bluff|blefes}} são {{n:catch.ex.bluffs-high}}. O adversário {{t:bluff|blefa}} mais do que o equilíbrio, então {{t:call|pagar}} dá lucro." }
      - { text: "{{t:fold|Desisto}}, porque a aposta é grande", why: "Uma aposta grande eleva o preço para {{n:eq.bet-pot}}, mas há mais {{t:bluff|blefes}} do que isso. O que conta é comparar esses dois números, e não só o tamanho da aposta." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Bluff-catcher não {{t:raise|aumenta}}: os {{t:bluff|blefes}} {{t:fold|desistem}}, e só mãos melhores que a sua pagam." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "O adversário aposta o {{t:pot|pote}} inteiro no river e {{t:bluff|blefa}} exatamente em {{n:bluff.share.bet-pot}} dos casos. Quanto você ganha {{t:call|pagando}} com um bluff-catcher?"
    options:
      - { text: "Nada: {{t:call|pagar}} e {{t:fold|desistir}} dão no mesmo", correct: true, why: "Uma fração de {{t:bluff|blefes}} igual a {{n:eq.bet-pot}} é exatamente o preço para {{t:call|pagar}}. O que você ganha contra os {{t:bluff|blefes}} compensa o que perde para o valor, então o adversário não deixa você lucrar nem {{t:call|pagando}}, nem {{t:fold|desistindo}}." }
      - { text: "Ganho, porque há muitos {{t:bluff|blefes}}", why: "Há exatamente tantos quanto o preço. Você só ganha quando o adversário {{t:bluff|blefa}} com mais frequência que {{n:eq.bet-pot}}." }
      - { text: "Perco, porque há mais valor do que {{t:bluff|blefes}}", why: "Há mais valor, mas, {{t:call|pagando}}, você arrisca {{n:ex.bet.pot}} para ganhar {{n:ex.pot}} + {{n:ex.bet.pot}}. Com essa fração de {{t:bluff|blefes}}, as duas coisas se equilibram." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "As espadas não vieram. No river, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Você tem {{t:top-pair|top pair}} com kicker dez. Com qual destas duas mãos {{t:call|pagar}} é melhor?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Sem espadas, você não bloqueia os {{t:flush-draw|projetos de flush}} furados, que são os principais {{t:bluff|blefes}} do Button (por exemplo, dez e valete de espadas). No {{t:range|range}} dele sobram mais {{t:bluff|blefes}}, dos quais você ganha." }
      - { text: "[[Kc Ts]]", why: "O dez de espadas tira do Button parte dos {{t:draw|projetos}} furados com que ele {{t:bluff|blefa}} (por exemplo, valete e dez de espadas). Sobra para ele relativamente mais valor, então {{t:call|pagar}} é pior." }
      - { text: "Tanto faz", why: "A força no showdown é a mesma, mas a espada na sua mão bloqueia os {{t:bluff|blefes}} do Button. Isso muda contra o que você está jogando de verdade." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "No river veio a terceira carta de copas. Você {{t:check|dá check}}, e o Button {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Você tem um {{t:pair|par}} de noves. Com qual destas duas mãos {{t:call|pagar}} é melhor?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "O ás de copas bloqueia o {{t:flush|flush}} com ás, uma das mãos de {{t:value|valor}} mais fortes do Button. Quando você bloqueia o valor dele, sobram mais {{t:bluff|blefes}} entre as apostas dele." }
      - { text: "[[Ad 9c]]", why: "O mesmo {{t:pair|par}}, mas você não bloqueia nenhum {{t:flush|flush}}. O Button tem todos os flushes dele, que ganham de você." }
      - { text: "Tanto faz", why: "No showdown as duas mãos são igualmente fortes, mas o ás de copas tira do Button parte das mãos de {{t:value|valor}}." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "As espadas não vieram. No river, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} meio {{t:pot|pote}}. O que você faz?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você tem só um sete como carta mais alta. Perde até para a maioria dos {{t:bluff|blefes}} do Button (dama com espadas, valete com espadas), então isso não é um bluff-catcher. Você defende com outras mãos." }
      - { text: "{{t:call|Pago}}, porque o preço é bom", why: "O preço ({{n:eq.bet-half}}) não ajuda uma mão que perde para quase tudo, até para {{t:bluff|blefes}}." }
      - { text: "{{t:raise|Aumento}} como {{t:bluff|blefe}}", why: "{{t:raise|Aumentar}} de {{t:bluff|blefe}} no river é uma jogada avançada e arriscada. Mais simples e melhor é desistir de uma mão sem chance." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. O adversário {{t:bet|aposta}} meio {{t:pot|pote}}. O {{t:mdf|MDF}} é {{n:mdf.bet-half}}. Quais mãos você defende primeiro?"
    options:
      - { text: "Os melhores bluff-catchers: ganham de {{t:bluff|blefes}} e têm bons {{t:blocker|bloqueadores}}", correct: true, why: "Você defende mãos que ganham de {{t:bluff|blefes}} e, entre mãos de força parecida, escolhe as que bloqueiam o valor do adversário e não bloqueiam os {{t:bluff|blefes}} dele. Você {{t:fold|desiste}} das mãos que perdem até para {{t:bluff|blefes}}." }
      - { text: "{{n:mdf.bet-half}} aleatórios do {{t:range|range}}", why: "O {{t:mdf|MDF}} diz quanto defender, e não com o quê. Uma defesa aleatória paga com mãos que nunca vão ganhar." }
      - { text: "Só mãos de {{t:value|valor}}", why: "Assim você defende pouco demais, e o adversário lucra {{t:bluff|blefando}} com quaisquer cartas. Para chegar ao {{t:mdf|MDF}}, você acrescenta os melhores bluff-catchers." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Por que, com um bluff-catcher no river, você {{t:call|paga}} em vez de {{t:raise|aumentar}}?"
    options:
      - { text: "Porque, depois do {{t:raise|aumento}}, os {{t:bluff|blefes}} {{t:fold|desistem}} e só mãos melhores pagam", correct: true, why: "Sua mão ganha só de {{t:bluff|blefes}}. O {{t:raise|aumento}} expulsa justamente essas mãos e mantém as que ganham de você." }
      - { text: "Porque não é permitido {{t:raise|aumentar}} no river", why: "É permitido. Só que {{t:raise|aumentar}} com um bluff-catcher o transforma em {{t:bluff|blefe}} contra mãos que não vão {{t:fold|desistir}}." }
      - { text: "Porque {{t:call|pagar}} é sempre mais barato", why: "Não é questão de custo, e sim de quem continua na mão. Depois do {{t:raise|aumento}}, ficam as mãos que ganham de você." }
---
Agora você está do outro lado: é o adversário que aposta no river, e você tem uma mão média. Na maioria das vezes, será um **bluff-catcher**, ou seja, uma mão que perde para todas as mãos de {{t:value|valor}} do adversário, mas ganha dos {{t:bluff|blefes}} dele.

## Sua equity são os {{t:bluff|blefes}} dele

Um bluff-catcher ganha exatamente quando o adversário {{t:bluff|blefa}}. Então a equity dele é a fração de {{t:bluff|blefes}} nas apostas do adversário. Você {{t:call|paga}} quando essa fração é maior que a equity necessária do M2:

| Aposta do adversário | Equity necessária ({{t:bluff|blefes}} no mínimo) |
|---|---|
| 1/3 do {{t:pot|pote}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|pote}} | {{n:eq.bet-half}} |
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} |

Quando o adversário {{t:bluff|blefa}} exatamente na proporção da lição anterior ({{n:bluff.share.bet-pot}} com aposta do {{t:pot|pote}} inteiro), {{t:call|pagar}} empata. Quando ele {{t:bluff|blefa}} com mais frequência, você {{t:call|paga}}; quando com menos, você {{t:fold|desiste}}. Os números não incluem rake; o rake aumenta um pouco a equity necessária.

## Quanto defender, e com o quê

Quanto defender, quem diz é o {{t:mdf|MDF}} do M6: contra uma aposta de meio {{t:pot|pote}}, cerca de **{{n:mdf.bet-half}}** do {{t:range|range}}. Esta lição responde à segunda pergunta: **com quais mãos**. Você {{t:call|paga}} com os melhores bluff-catchers: entre mãos de força parecida, escolhe as que têm melhores {{t:blocker|bloqueadores}}; você {{t:fold|desiste}} das mãos que perdem até para {{t:bluff|blefes}}.

Um bluff-catcher melhor:

- ganha de mais {{t:bluff|blefes}} (um {{t:pair|par}} é melhor do que só uma carta alta),
- bloqueia as mãos de {{t:value|valor}} do adversário,
- não bloqueia os {{t:bluff|blefes}} dele.

## {{t:blocker|Bloqueadores}} na hora de {{t:call|pagar}}

É o espelho da lição anterior. Quando as espadas não vêm, o adversário {{t:bluff|blefa}} com {{t:flush-draw|projetos de flush}} furados. Uma espada na sua mão tira dele parte dos {{t:bluff|blefes}}, então {{t:call|pagar}} é pior. Quando o {{t:flush|flush}} se completa, o ás desse naipe na sua mão tira dele os flushes mais fortes, então {{t:call|pagar}} é melhor.

## Não aumente com um bluff-catcher

Depois do {{t:raise|aumento}}, os {{t:bluff|blefes}} {{t:fold|desistem}}, e só pagam as mãos que ganham de você. Com um bluff-catcher, você {{t:call|paga}} ou {{t:fold|desiste}}.

:::note Quando o adversário raramente {{t:bluff|blefa}}
Estas regras pressupõem um adversário que {{t:bluff|blefa}} mais ou menos no equilíbrio. Contra um jogador que raramente {{t:bluff|blefa}} com uma aposta grande no river, você {{t:fold|desiste}} com mais frequência do que indica o {{t:mdf|MDF}}: quando há menos {{t:bluff|blefes}} do que o preço exige, {{t:call|pagar}} dá prejuízo (a conta desta lição). As regras para escolher bluff-catchers pelos {{t:blocker|bloqueadores}} vêm de materiais de treinamento e de análises de solvers (jogo no river, {{t:blocker|bloqueadores}}): entre os bluff-catchers (mãos que, de qualquer forma, só ganham de {{t:bluff|blefes}}), o solver escolhe quando {{t:call|pagar}} mais pelos {{t:blocker|bloqueadores}} do que só pela força da mão.
:::
