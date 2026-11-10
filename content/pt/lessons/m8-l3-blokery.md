---
id: m8.l3
module: m8
order: 3
title: "Bloqueadores"
sub: "Com que mão fazer bluff"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "O que é um {{t:blocker|bloqueador}}?"
    options:
      - { text: "Uma carta na sua mão que faz com que o adversário tenha menos {{t:combo|combinações}} de uma determinada mão", correct: true, why: "O adversário não pode ter uma carta que está na sua mão. Quando tem um ás, o adversário tem menos ases: menos {{t:pair|pares}} de ases, menos AK, menos flushes com ás." }
      - { text: "Uma carta na {{t:board|mesa}} que estraga um {{t:draw|draw}}", why: "Por vezes diz-se isto informalmente sobre cartas na {{t:board|mesa}}, mas um {{t:blocker|bloqueador}} neste sentido é uma carta na sua mão. As cartas na {{t:board|mesa}} são vistas por ambos os jogadores." }
      - { text: "Uma aposta pequena destinada a travar uma aposta grande do adversário", why: "Isso é a chamada blocking bet, outra coisa. Um {{t:blocker|bloqueador}} é uma carta na mão que reduz o número de {{t:combo|combinações}} do adversário." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Sem qualquer informação, AK tem {{n:combos.unpaired}} {{t:combo|combinações}}. Tem um rei na mão (sem ás). Quantas {{t:combo|combinações}} de AK pode ter o adversário? Introduza o número."
    answer: combos.unpaired.one-blocked
    explanation: "Há {{n:cards.suits}} ases e restam {{n:pair.outs.per-rank}} reis, porque um está na sua mão: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Uma só carta elimina um quarto inteiro das {{t:combo|combinações}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Um {{t:pair|par}} de ases tem {{n:combos.pair}} {{t:combo|combinações}}. Tem um ás na mão. Quantas {{t:combo|combinações}} de {{t:pair|par}} de ases pode ter o adversário? Introduza o número."
    answer: combos.pair.one-blocked
    explanation: "Restam {{n:pair.outs.per-rank}} ases, e com três cartas só se podem formar {{n:combos.pair.one-blocked}} {{t:pair|pares}}. Um ás na sua mão elimina metade das {{t:combo|combinações}} de AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Tem [[Ah Kc]]. Quantas {{t:combo|combinações}} de AK pode ter o adversário?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Restam {{n:pair.outs.per-rank}} ases e {{n:pair.outs.per-rank}} reis: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Seriam essas se tivesse apenas o ás ou apenas o rei. Bloqueia ambos os valores." }
      - { text: "{{n:combos.unpaired}}", why: "É o número de {{t:combo|combinações}} de AK no baralho antes de ver as suas cartas. O seu ás e o seu rei não podem estar na mão do adversário." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "No river saiu a terceira carta de copas e um {{t:flush|flush}} é possível. O {{t:big-blind}} {{t:check|passa}}. Tem apenas ás alto e quer fazer bluff. Com que mão o {{t:bluff}} é melhor?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "O ás de copas bloqueia os flushes mais fortes do adversário: ele não pode ter {{t:flush|flush}} com ás, e essa é uma mão que paga sempre. O adversário tem menos mãos para {{t:call|pagar}}, por isso o {{t:bluff}} resulta mais vezes." }
      - { text: "[[Ad 3c]]", why: "A mesma força no showdown, mas não bloqueia nenhum {{t:flush|flush}}. O adversário mantém todos os seus flushes, com as quais vai pagar." }
      - { text: "É indiferente, ambas são apenas ás alto", why: "No showdown sim, mas como {{t:bluff}} não. O ás de copas reduz o número de flushes do adversário que pagam de certeza." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "O {{t:flush-draw|flush draw}} em espadas não entrou. O {{t:big-blind}} passa no river. Ambas as mãos têm apenas dama e oito. Com qual é melhor fazer bluff?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Sem espadas, não bloqueia os {{t:draw|draws}} falhados do adversário, e essas são mãos que vão {{t:fold|desistir}} perante a sua aposta. As restantes cartas das duas mãos são iguais." }
      - { text: "[[Qd 8s]]", why: "O oito de espadas bloqueia parte dos {{t:flush-draw|flush draws}} falhados (p. ex. [[8s 7s]]) com os quais o adversário {{t:fold|desistiria}}. Restam-lhe relativamente mais mãos com as quais vai pagar." }
      - { text: "É indiferente", why: "A diferença está no naipe do oito. Uma espada na sua mão retira ao adversário parte das mãos com que desistiria." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "A mesma situação: as espadas não entraram, o {{t:big-blind}} {{t:check|passa}}. Tem uma de duas mãos. Com qual faz {{t:bluff}} e com qual {{t:check|passa}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Faço {{t:bluff}} com [[Qc Jd]], {{t:check|passo}} com [[9c 8c]]", correct: true, why: "O {{t:pair|par}} de noves ganha aos {{t:draw|draws}} falhados depois de {{t:check|passar}}. Dama e valete perdem contra quase todas as mãos, por isso só com {{t:bluff}} podem ganhar o {{t:pot|pote}}." }
      - { text: "Faço {{t:bluff}} com [[9c 8c]], {{t:check|passo}} com [[Qc Jd]]", why: "É ao contrário. Um {{t:bluff}} com {{t:pair|par}} de noves abdica de uma vitória no showdown, e {{t:check|passar}} com dama e valete entrega o {{t:pot|pote}} sem luta." }
      - { text: "Faço {{t:bluff}} com ambas", why: "O {{t:pair|par}} de noves não precisa de {{t:bluff}}: ganha a muitas mãos depois de {{t:check|passar}}. Faz-se {{t:bluff}} com mãos sem valor no showdown." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Está a escolher um {{t:bluff}} no river entre mãos sem valor no showdown. Que carta na mão ajuda mais?"
    options:
      - { text: "Uma carta das mãos com que o adversário vai pagar", correct: true, why: "Bloqueia o valor dele: tem menos mãos fortes, por isso fica mais vezes com uma mão para desistir." }
      - { text: "Uma carta do naipe do {{t:draw|draw}} falhado", why: "Essa carta bloqueia mãos com as quais o adversário vai {{t:fold|desistir}}. O {{t:bluff}} resulta então menos vezes." }
      - { text: "A carta mais alta, independentemente da mesa", why: "Uma carta alta dá alguma força no showdown, mas não diz nada sobre o que bloqueia. Veja que mãos do adversário vão pagar." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "No river saiu a terceira carta de copas. O {{t:big-blind}} {{t:check|passa}}. Tem {{t:pair|par}} de noves e o ás de copas. O que faz?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "O {{t:pair|par}} de noves, depois de {{t:check|passar}}, ganha a muitas mãos do adversário sem {{t:pair|par}}. Um {{t:blocker|bloqueador}} não transforma uma mão com valor no showdown num bom {{t:bluff}}: primeiro escolhem-se as mãos sem hipóteses e só depois se olha para os {{t:blocker|bloqueadores}}." }
      - { text: "Aposto como {{t:bluff}}, porque tenho o ás de copas", why: "O ás de copas é um bom {{t:blocker|bloqueador}}, mas com {{t:pair|par}} de noves perde ao fazer {{t:bluff}}: as mãos piores {{t:fold|desistiriam}} de qualquer forma, e os flushes e os reis vão pagar." }
      - { text: "Aposto {{t:value|por valor}}", why: "Quem vai pagar com uma mão pior? Numa {{t:board|mesa}} com flush possível, as mãos mais fracas do que um {{t:pair|par}} de noves vão quase sempre {{t:fold|desistir}}." }
---
Na lição anterior, determinou quantos {{t:bluff|bluffs}} são necessários e que se faz {{t:bluff}} com mãos sem hipóteses no showdown. Muitas vezes há mais mãos dessas do que o necessário. Nesse caso, a escolha é decidida pelos **{{t:blocker|bloqueadores}}**.

## {{t:blocker|Bloqueador}}

O adversário não pode ter uma carta que está na sua mão. Por isso, tem menos {{t:combo|combinações}} de mãos com essa carta:

| Mão do adversário | Sem {{t:blocker|bloqueador}} | Tem uma carta desse valor |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Quando tem o ás e o rei, o adversário tem apenas {{n:combos.unpaired.both-blocked}} {{t:combo|combinações}} de AK.

## Bloqueie as mãos com que o adversário vai pagar

Um bom {{t:bluff}} tem uma carta das mãos com que o adversário vai **{{t:call|pagar}}**. Exemplo: no river saiu a terceira carta de copas. O ás de copas na sua mão significa que o adversário não tem {{t:flush|flush}} com ás, ou seja, uma mão que paga sempre. Restam-lhe mais mãos para desistir.

## Não bloqueie as mãos com que o adversário vai {{t:fold|desistir}}

Quando o {{t:flush-draw|flush draw}} **não entra**, o adversário vai {{t:fold|desistir}} com os seus {{t:draw|draws}} falhados. Se tiver uma carta desse naipe, ele tem menos dessas mãos, por isso o seu {{t:bluff}} encontra mais vezes uma mão que vai pagar. Entre dois {{t:bluff|bluffs}} semelhantes, escolhe aquele sem cartas do naipe do {{t:draw|draw}} falhado.

## Primeiro, a força no showdown

A ordem é fixa: primeiro põe de parte as mãos que podem ganhar depois de {{t:check|passar}}, e só entre as restantes escolhe os {{t:bluff|bluffs}} com os melhores {{t:blocker|bloqueadores}}. Um bom {{t:blocker|bloqueador}} não faz de um {{t:pair|par}} que ganharia o showdown um {{t:bluff}}. Os {{t:blocker|bloqueadores}} inclinam a escolha entre mãos semelhantes; o efeito em si é pequeno, por isso só decide quando as mãos têm força semelhante (o mesmo se aplica à escolha das mãos para {{t:call|pagar}} na próxima lição).

:::note De onde vêm estas regras
Os números de {{t:combo|combinações}} resultam da combinatória. As regras de escolha dos {{t:bluff|bluffs}} segundo os {{t:blocker|bloqueadores}} provêm do programa de ensino, bem como de materiais de formação e de análises de solvers. Quando faltam outros {{t:bluff|bluffs}}, o solver também faz {{t:bluff}} com flushes falhados.
:::
