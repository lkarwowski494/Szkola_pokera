---
id: m7.l2
module: m7
order: 2
title: "Polarização"
sub: "Aposta grande: mãos fortes e semiblefes"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Qual {{t:range}} de aposta no turn é {{t:polarized|polarizado}}?"
    options:
      - { text: "Sets, {{t:two-pair}} e {{t:draw|projetos}}, sem {{t:pair|pares}} médios", correct: true, why: "Isso: um {{t:range}} {{t:polarized|polarizado}} tem dois polos, mãos muito fortes e {{t:semi-bluff|semiblefes}}. O meio, ou seja, as mãos médias, não está nele: essas mãos {{t:check|dão check}}." }
      - { text: "{{t:top-pair|Top pairs}}, {{t:pair|pares}} médios e {{t:pair|pares}} mais fracos", why: "Aqui não há nenhum polo: faltam mãos muito fortes e {{t:semi-bluff|semiblefes}}, são só {{t:pair|pares}} de cima para baixo. Isso está mais perto de um {{t:range}} {{t:linear}}, que aposta principalmente com mãos de valor, geralmente com tamanho pequeno, e não grande no turn." }
      - { text: "Só {{t:bluff|blefes}}", why: "O adversário reconhece facilmente um {{t:range}} sem mãos fortes e vai {{t:call|pagar}}. Um {{t:range}} {{t:polarized|polarizado}} combina {{t:bluff|blefes}} com mãos muito fortes." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "No flop {{t:dry|seco}} [[Ks 7d 2c]], você apostou pouco com quase todas as mãos: de set a {{t:pair|pares}} fracos. Como se chama esse {{t:range}} de aposta?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Linear}}", correct: true, why: "Isso: mãos fortes e médias apostam juntas, com tamanho pequeno. É o plano do M5 em flop {{t:dry|seco}} e alto, onde você tem {{t:range-advantage|vantagem de range}}." }
      - { text: "{{t:polarized|Polarizado}}", why: "Um {{t:range}} {{t:polarized|polarizado}} não tem mãos médias: só apostam mãos muito fortes e {{t:bluff|blefes}}. Aqui também apostaram {{t:pair|pares}} fracos." }
      - { text: "Limitado", why: "Um {{t:range}} limitado é aquele em que faltam as mãos mais fortes. Você também apostou com sets." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Por que um {{t:pair|par}} médio não gosta de uma aposta grande no turn?"
    options:
      - { text: "Porque mãos piores vão {{t:fold|desistir}}, e as melhores vão pagar", correct: true, why: "Isso: uma aposta grande com {{t:pair|par}} médio só dá lucro quando uma mão pior paga, e essas mãos geralmente {{t:fold|desistem}} diante de uma aposta grande. Sobram os {{t:call|pagamentos}} de mãos que ganham de você." }
      - { text: "Porque uma aposta grande é sempre {{t:bluff|blefe}}", why: "Não: as mãos mais fortes também {{t:bet|apostam}} alto. O problema do {{t:pair|par}} médio está em quem vai pagar a aposta dele." }
      - { text: "Porque um {{t:pair|par}} médio não pode ganhar", why: "Pode: ganha de {{t:bluff|blefes}} e de {{t:pair|pares}} piores. Por isso {{t:check|dá check}} e chega barato ao showdown." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "Você {{t:open|abriu}} do Button, e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. Há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:check|dá check}}. Você tem set. O que você faz?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Aposto {{n:ex.bet.three-quarters}}", correct: true, why: "Isso: o adversário pode ter {{t:draw|projeto}} de {{t:flush}} (duas copas) e de {{t:straight|sequência}} (p. ex. 65, T9). Com aposta de 3/4 do {{t:pot|pote}}, um {{t:flush-draw|projeto de flush}} precisa de {{n:eq.bet-three-quarters}} de equity, e o {{t:flush}} sai em cerca de {{n:odds.flush.turn-river}} dos casos. Contra o seu set ele tem ainda menos: [[4h]] e [[2h]] dão a você um {{t:full-house}}, então restam a ele {{n:outs.flush.vs-set}} outs limpos, cerca de {{n:odds.flush.vs-set}}. Ele paga caro demais." }
      - { text: "Aposto {{n:ex.bet.quarter}}", sizeError: true, why: "Ação certa, tamanho errado: com aposta de 1/4 do {{t:pot|pote}}, um {{t:draw|projeto}} precisa de só {{n:eq.bet-quarter}} de equity, então recebe um bom preço. Com mão muito forte em {{t:board}} com {{t:flush-draw|projeto de flush}}, você aposta alto." }
      - { text: "{{t:check|Dou check}}", why: "Uma carta grátis é um presente para os {{t:draw|projetos}}, e você não constrói o {{t:pot|pote}} antes do river. Set em {{t:board}} com {{t:flush-draw|projeto de flush}} aposta." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "Você {{t:open|abriu}} do Button, e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um três. Há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:check|dá check}}. O que você faz?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Aposto {{n:ex.bet.three-quarters}}", correct: true, why: "Isso: {{t:flush-draw|projeto de flush}} com duas cartas altas é um bom {{t:semi-bluff|semiblefe}}. Você aposta o mesmo tamanho grande das mãos fortes, então o adversário não distingue {{t:bluff|blefe}} de valor." }
      - { text: "Aposto {{n:ex.bet.quarter}}", sizeError: true, why: "Ação certa, tamanho errado: o adversário vai {{t:call|pagar}} uma aposta tão barata com qualquer {{t:pair|par}}, e o {{t:semi-bluff|semiblefe}} lucra principalmente com {{t:fold|desistências}}. Se as suas apostas pequenas significassem {{t:draw|projetos}} e as grandes, mãos fortes, o adversário exploraria isso facilmente." }
      - { text: "{{t:check|Dou check}}", correct: true, why: "Também está bom: você vê o river de graça e acerta o {{t:flush}} em {{n:odds.flush.turn-river}} dos casos. Mas apostar geralmente é melhor, porque {{t:draw|projeto}} com cartas altas é um dos melhores {{t:semi-bluff|semiblefes}}, e ao {{t:check|dar check}} você abre mão de ganhar o {{t:pot|pote}} na hora." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "Você {{t:open|abriu}} do Button, e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um cinco. Há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:check|dá check}}. O que você faz?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|Dou check}}", correct: true, why: "{{t:top-pair|Top pair}} com kicker fraco é uma mão média. Uma aposta grande vai ser paga principalmente por reis melhores (AK, KQ, KJ), e mãos piores vão {{t:fold|desistir}}. {{t:check|Dando check}}, você chega barato ao showdown." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "Aposta grande combina com {{t:range}} {{t:polarized|polarizado}}. Com esta mão você lucra principalmente com mãos que ganham de você." }
      - { text: "Aposto {{n:ex.bet.pot}}", why: "Um {{t:pot|pote}} ainda maior com mão de força média: mãos piores quase sempre vão {{t:fold|desistir}}, e as melhores vão pagar." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Há {{n:ex.pot}} no {{t:pot|pote}}, e você aposta {{n:ex.bet.three-quarters}} com mão muito forte. De quantos por cento de equity o adversário com {{t:draw|projeto}} precisa para {{t:call|pagar}}? Digite um número."
    answer: eq.bet-three-quarters
    explanation: "O adversário coloca {{n:ex.bet.three-quarters}} num {{t:pot|pote}} que, depois do {{t:call|pagamento}}, tem {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. Um {{t:flush-draw|projeto de flush}} tem no turn cerca de {{n:odds.flush.turn-river}}, então paga caro demais."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Você tem set e aposta só {{n:ex.bet.quarter}} num {{t:pot|pote}} de {{n:ex.pot}}. O adversário tem {{t:flush-draw|projeto de flush}} (cerca de {{n:odds.flush.turn-river}} até o river). O que isso significa?"
    options:
      - { text: "Ele recebe um bom preço: precisa de só {{n:eq.bet-quarter}}", correct: true, why: "Isso: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, menos que os {{n:odds.flush.turn-river}} dele. {{t:call|Pagar}} vale a pena para ele, e a sua aposta pequena entrega parte do valor." }
      - { text: "Ele tem que {{t:fold|desistir}}, porque precisa de {{n:eq.bet-three-quarters}}", why: "É disso que ele precisaria com aposta de 3/4 do {{t:pot|pote}}. Com aposta de 1/4 do {{t:pot|pote}}, bastam {{n:eq.bet-quarter}}." }
      - { text: "O preço não importa, porque você ganha dele de qualquer jeito", why: "Agora você ganha dele, mas em cerca de {{n:odds.flush.turn-river}} dos casos ele vence no river. O tamanho da aposta decide se ele paga caro demais ou barato demais por essa chance." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "No turn, o adversário tem {{t:oesd}}: cerca de {{n:odds.oesd.turn-river}} até o river. A partir de que aposta sua ele paga caro demais (contando só pot odds)?"
    options:
      - { text: "Já a partir de 1/3 do {{t:pot|pote}}: precisa de {{n:eq.bet-third}}", correct: true, why: "Isso: {{n:eq.bet-third}} é mais que {{n:odds.oesd.turn-river}}. No turn, os {{t:draw|projetos}} têm só uma carta por vir, então até uma aposta média dá a eles um preço ruim." }
      - { text: "Só a partir do {{t:pot|pote}} inteiro: precisa de {{n:eq.bet-pot}}", why: "Com o {{t:pot|pote}} inteiro ele paga muito caro, mas já com 1/3 do {{t:pot|pote}} precisa de {{n:eq.bet-third}}, mais que os {{n:odds.oesd.turn-river}} que tem." }
      - { text: "Nunca, um {{t:draw|projeto}} sempre pode {{t:call|pagar}}", why: "Um {{t:draw|projeto}} só {{t:call|paga}} com bom preço ou com implied odds (próxima lição). No turn ele tem cerca de {{n:odds.oesd.turn-river}}, então a maioria das apostas é um preço ruim para ele." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Há {{n:ex.pot}} no {{t:pot|pote}}, e você aposta o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. De quantos por cento de equity o adversário precisa para {{t:call|pagar}}? Digite um número."
    answer: eq.bet-pot
    explanation: "O adversário coloca {{n:ex.bet.pot}} num {{t:pot|pote}} que, depois do {{t:call|pagamento}}, tem {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Nem o {{t:flush}} (cerca de {{n:odds.flush.turn-river}}) nem a {{t:straight|sequência}} aberta (cerca de {{n:odds.oesd.turn-river}}) têm essa chance."
---
No flop, você muitas vezes apostava pouco com quase todo o {{t:range}}. No turn, o {{t:range}} de aposta muda: ficam nele mãos muito fortes e {{t:semi-bluff|semiblefes}}, e as mãos médias {{t:check|dão check}}. Chamamos esse {{t:range}} de {{t:polarized|polarizado}}.

## Dois tipos de {{t:range}}

- **{{t:linear|Linear}}:** você aposta das mãos mais fortes para baixo, incluindo as médias. Geralmente com tamanho pequeno, p. ex. c-bet de {{n:cbet.size.small}} do {{t:pot|pote}} em [[Ks 7d 2c]].
- **{{t:polarized|Polarizado}}:** apostam os dois polos, mãos muito fortes (sets, {{t:two-pair}}, {{t:straight|sequências}}, flushes) e {{t:semi-bluff|semiblefes}} ({{t:draw|projetos}}). Não há mãos médias nele.

Em geral, um {{t:range}} {{t:polarized|polarizado}} é formado por mãos muito fortes e {{t:bluff|blefes}}. No turn, os {{t:bluff|blefes}} costumam ser {{t:semi-bluff|semiblefes}}; no river (M8), mãos sem chance no showdown.

## Por que você polariza no turn

O adversário {{t:call|pagou}} o flop, então geralmente tem {{t:pair|par}} ou {{t:draw|projeto}}, às vezes cartas altas com backdoor (M6). Uma mão média não ganha nada com uma segunda aposta: mãos piores {{t:fold|desistem}}, e as melhores pagam. Mãos fortes querem construir o {{t:pot|pote}} antes do river, e os {{t:semi-bluff|semiblefes}} precisam de {{t:fold|desistências}} e têm outs quando são {{t:call|pagos}}.

## {{t:range|Range}} {{t:polarized|polarizado}}, aposta grande

Um {{t:range}} {{t:polarized|polarizado}} aposta alto, p. ex. 3/4 do {{t:pot|pote}}. Mãos fortes tiram mais {{t:chips|fichas}}, e os {{t:semi-bluff|semiblefes}} ganham na hora com mais frequência. Mãos médias {{t:check|dão check}}. Quando {{t:bluff|blefes}} e mãos fortes apostam o mesmo tamanho, o adversário não sabe o que você tem.

## O preço para os {{t:draw|projetos}}

No turn, um {{t:draw|projeto}} tem só uma carta por vir. Uma aposta grande o faz pagar caro demais:

| Sua aposta | O adversário precisa de | O {{t:flush|flush}} tem | A {{t:straight|sequência}} aberta tem |
|---|---|---|---|
| 1/4 do {{t:pot|pote}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 do {{t:pot|pote}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 do {{t:pot|pote}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 do {{t:pot|pote}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Com aposta de 1/4 do {{t:pot|pote}}, o {{t:flush-draw|projeto de flush}} tem um bom preço. Com 1/3 do {{t:pot|pote}}, o preço é quase igual à chance do {{t:flush}} ({{n:eq.bet-third}} contra {{n:odds.flush.turn-river}}), e a partir de 1/2 do {{t:pot|pote}} o {{t:flush}} paga claramente caro demais, a menos que conte com implied odds (próxima lição). Os exercícios com {{t:draw|projeto}} nesta lição contam só pot odds.

:::note De onde vêm estas regras
Os conceitos de {{t:range}} {{t:polarized|polarizado}} e {{t:linear}} e a regra “{{t:range}} {{t:polarized|polarizado}} aposta alto, mãos médias {{t:check|dão check}}” vêm de materiais de treinamento e aqui são uma heurística; a recomendação de apostar alto com mão forte e vulnerável também. No turn, o solver também usa tamanhos pequenos. O tamanho de 3/4 do {{t:pot|pote}} é um exemplo para praticar, e não o único tamanho bom. Os preços da tabela são cálculos exatos do aplicativo.
:::
