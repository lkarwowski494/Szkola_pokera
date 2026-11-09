---
id: m8.l3
module: m8
order: 3
title: "Bloqueadores"
sub: "Com qual mão blefar"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "O que é um {{t:blocker|bloqueador}}?"
    options:
      - { text: "Uma carta na sua mão que faz o adversário ter menos {{t:combo|combos}} de alguma mão", correct: true, why: "O adversário não pode ter uma carta que está com você. Quando você tem um ás, o adversário tem menos ases: menos {{t:pair|pares}} de ases, menos AK, menos flushes com o ás." }
      - { text: "Uma carta no {{t:board|board}} que estraga um {{t:draw|projeto}}", why: "Às vezes se fala assim, informalmente, das cartas no {{t:board|board}}, mas {{t:blocker|bloqueador}}, neste sentido, é uma carta na sua mão. As cartas no {{t:board|board}} são vistas pelos dois jogadores." }
      - { text: "Uma aposta pequena para impedir uma aposta grande do adversário", why: "Essa é a chamada blocking bet, outra coisa. {{t:blocker|Bloqueador}} é uma carta na mão que reduz o número de {{t:combo|combos}} do adversário." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Sem nenhuma informação, AK tem {{n:combos.unpaired}} {{t:combo|combos}}. Você tem um rei (sem ás). Quantos {{t:combo|combos}} de AK o adversário pode ter? Digite o número."
    answer: combos.unpaired.one-blocked
    explanation: "Há {{n:cards.suits}} ases, e restaram {{n:pair.outs.per-rank}} reis, porque um está com você: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Uma única carta elimina um quarto inteiro dos {{t:combo|combos}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Um {{t:pair|par}} de ases tem {{n:combos.pair}} {{t:combo|combos}}. Você tem um ás. Quantos {{t:combo|combos}} de {{t:pair|par}} de ases o adversário pode ter? Digite o número."
    answer: combos.pair.one-blocked
    explanation: "Restaram {{n:pair.outs.per-rank}} ases, e com três cartas só dá para formar {{n:combos.pair.one-blocked}} {{t:pair|pares}}. Um ás na sua mão elimina metade dos {{t:combo|combos}} de AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Você tem [[Ah Kc]]. Quantos {{t:combo|combos}} de AK o adversário pode ter?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Restaram {{n:pair.outs.per-rank}} ases e {{n:pair.outs.per-rank}} reis: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Esse seria o número se você tivesse só o ás ou só o rei. Você bloqueia os dois valores." }
      - { text: "{{n:combos.unpaired}}", why: "Esse é o número de {{t:combo|combos}} de AK no baralho antes de você ver suas cartas. Seu ás e seu rei não podem estar com o adversário." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "No river caiu a terceira carta de copas, e um {{t:flush|flush}} é possível. O {{t:big-blind|big blind}} {{t:check|dá check}}. Você tem só ás alto e quer blefar. Com qual mão o {{t:bluff|blefe}} é melhor?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "O ás de copas bloqueia os flushes mais fortes do adversário: ele não pode ter {{t:flush|flush}} com o ás, e essa é uma mão que sempre vai pagar. O adversário tem menos mãos para {{t:call|pagar}}, então o {{t:bluff|blefe}} funciona com mais frequência." }
      - { text: "[[Ad 3c]]", why: "A mesma força no showdown, mas você não bloqueia nenhum {{t:flush|flush}}. O adversário fica com todos os flushes dele, com os quais vai pagar." }
      - { text: "Tanto faz, as duas são só ás alto", why: "No showdown, sim, mas como {{t:bluff|blefe}}, não. O ás de copas reduz o número de flushes do adversário que certamente vão pagar." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "O {{t:flush-draw|projeto de flush}} de espadas não entrou. O {{t:big-blind|big blind}} dá check no river. As duas mãos têm só dama-oito. Com qual é melhor blefar?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Sem espadas, você não bloqueia os {{t:draw|projetos}} perdidos do adversário, e essas são mãos que vão {{t:fold|desistir}} diante da sua aposta. As outras cartas das duas mãos são iguais." }
      - { text: "[[Qd 8s]]", why: "O oito de espadas bloqueia parte dos {{t:flush-draw|projetos de flush}} perdidos (ex.: [[8s 7s]]) com os quais o adversário {{t:fold|desistiria}}. Sobram para ele, proporcionalmente, mais mãos com as quais vai pagar." }
      - { text: "Tanto faz", why: "A diferença está no naipe do oito. Uma espada na sua mão tira do adversário parte das mãos com as quais ele desistiria." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "A mesma situação: as espadas não entraram, o {{t:big-blind|big blind}} {{t:check|dá check}}. Você tem uma de duas mãos. Com qual você {{t:bluff|blefa}} e com qual {{t:check|dá check}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Blefo}} com [[Qc Jd]], {{t:check|dou check}} com [[9c 8c]]", correct: true, why: "O {{t:pair|par}} de noves ganha dos {{t:draw|projetos}} perdidos depois do {{t:check|check}}. Dama-valete perde para quase qualquer mão, então só um {{t:bluff|blefe}} pode ganhar o {{t:pot|pote}}." }
      - { text: "{{t:bluff|Blefo}} com [[9c 8c]], {{t:check|dou check}} com [[Qc Jd]]", why: "É o contrário. Um {{t:bluff|blefe}} com o {{t:pair|par}} de noves abre mão de uma vitória no showdown, e o {{t:check|check}} com dama-valete entrega o {{t:pot|pote}} sem luta." }
      - { text: "{{t:bluff|Blefo}} com as duas", why: "O {{t:pair|par}} de noves não precisa de {{t:bluff|blefe}}: ganha de muitas mãos depois do {{t:check|check}}. Você {{t:bluff|blefa}} com mãos sem valor de showdown." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Você está escolhendo um {{t:bluff|blefe}} no river entre mãos sem valor de showdown. Qual carta na mão ajuda mais?"
    options:
      - { text: "Uma carta das mãos com as quais o adversário vai pagar", correct: true, why: "Você bloqueia o valor dele: ele tem menos mãos fortes, então com mais frequência fica com uma mão para desistir." }
      - { text: "Uma carta do naipe do {{t:draw|projeto}} perdido", why: "Ela bloqueia mãos com as quais o adversário vai {{t:fold|desistir}}. Aí o {{t:bluff|blefe}} funciona com menos frequência." }
      - { text: "A carta mais alta, independentemente do board", why: "Uma carta alta dá um pouco de força no showdown, mas não diz nada sobre o que você bloqueia. Veja quais mãos do adversário vão pagar." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "No river caiu a terceira carta de copas. O {{t:big-blind|big blind}} {{t:check|dá check}}. Você tem um {{t:pair|par}} de noves e o ás de copas. O que você faz?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Dou check}}", correct: true, why: "Depois do {{t:check|check}}, o {{t:pair|par}} de noves ganha de muitas mãos do adversário sem {{t:pair|par}}. Um {{t:blocker|bloqueador}} não transforma uma mão com valor de showdown em um bom {{t:bluff|blefe}}: primeiro você escolhe as mãos sem chance, e só depois olha os {{t:blocker|bloqueadores}}." }
      - { text: "Aposto como {{t:bluff|blefe}}, porque tenho o ás de copas", why: "O ás de copas é um bom {{t:blocker|bloqueador}}, mas com um {{t:pair|par}} de noves você perde ao {{t:bluff|blefar}}: mãos piores {{t:fold|desistiriam}} de qualquer jeito, e flushes e reis vão pagar." }
      - { text: "Aposto {{t:value|por valor}}", why: "Quem vai pagar com uma mão pior? Num {{t:board|board}} com flush possível, mãos mais fracas que um {{t:pair|par}} de noves quase sempre vão {{t:fold|desistir}}." }
---
Na lição anterior, você definiu quantos {{t:bluff|blefes}} precisa e que {{t:bluff|blefa}} com mãos sem chance no showdown. Muitas vezes há mais mãos assim do que o necessário. Aí quem decide a escolha são os **{{t:blocker|bloqueadores}}**.

## {{t:blocker|Bloqueador}}

O adversário não pode ter uma carta que está com você. Por isso, ele tem menos {{t:combo|combos}} de mãos com essa carta:

| Mão do adversário | Sem {{t:blocker|bloqueador}} | Você tem uma carta desse valor |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Quando você tem o ás e também o rei, o adversário tem só {{n:combos.unpaired.both-blocked}} {{t:combo|combos}} de AK.

## Bloqueie as mãos com as quais o adversário vai pagar

Um bom {{t:bluff|blefe}} tem uma carta das mãos com as quais o adversário vai **{{t:call|pagar}}**. Exemplo: no river caiu a terceira carta de copas. O ás de copas na sua mão significa que o adversário não tem {{t:flush|flush}} com o ás, ou seja, uma mão que sempre paga. Sobram para ele mais mãos para desistir.

## Não bloqueie as mãos com as quais o adversário vai {{t:fold|desistir}}

Quando o {{t:flush-draw|projeto de flush}} **não entra**, o adversário vai {{t:fold|desistir}} dos {{t:draw|projetos}} perdidos dele. Se você tem uma carta desse naipe, ele tem menos deles, então o seu {{t:bluff|blefe}} vai encontrar com mais frequência uma mão que vai pagar. Entre dois {{t:bluff|blefes}} parecidos, escolha o que não tem cartas do naipe do {{t:draw|projeto}} perdido.

## Primeiro, a força no showdown

A ordem é fixa: primeiro você separa as mãos que podem ganhar depois do {{t:check|check}}, e só entre as restantes escolhe os {{t:bluff|blefes}} com os melhores {{t:blocker|bloqueadores}}. Um bom {{t:blocker|bloqueador}} não transforma em {{t:bluff|blefe}} um {{t:pair|par}} que ganharia no showdown. Os {{t:blocker|bloqueadores}} pesam na escolha entre mãos parecidas; o efeito em si é pequeno, então só decide quando as mãos têm força parecida (o mesmo vale para a escolha dos {{t:call|calls}} na próxima lição).

:::note De onde vêm estas regras
Os números de {{t:combo|combos}} vêm da combinatória. As regras para escolher {{t:bluff|blefes}} pelos {{t:blocker|bloqueadores}} vêm do currículo do curso, de materiais de treinamento e de análises de solvers. Quando faltam outros {{t:bluff|blefes}}, o solver também {{t:bluff|blefa}} com flushes perdidos.
:::
