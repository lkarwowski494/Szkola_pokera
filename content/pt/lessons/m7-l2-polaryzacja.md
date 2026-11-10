---
id: m7.l2
module: m7
order: 2
title: "Polarização"
sub: "Aposta grande: mãos fortes e semi-bluffs"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Que {{t:range|range}} de aposta no turn é {{t:polarized|polarizado}}?"
    options:
      - { text: "Sets, {{t:two-pair|dois pares}} e {{t:draw|draws}}, sem {{t:pair|pares}} médios", correct: true, why: "Sim: um {{t:range|range}} {{t:polarized|polarizado}} tem dois polos, mãos muito fortes e {{t:semi-bluff|semi-bluffs}}. O meio, ou seja, as mãos médias, não está nele: essas mãos {{t:check|passam}}." }
      - { text: "{{t:top-pair|Top pairs}}, {{t:pair|pares}} médios e {{t:pair|pares}} mais fracos", why: "Aqui não há nenhum polo: faltam mãos muito fortes e {{t:semi-bluff|semi-bluffs}}, há apenas {{t:pair|pares}} de cima para baixo. Isto está mais próximo de um {{t:range|range}} {{t:linear|linear}}, que aposta sobretudo com mãos de valor, normalmente com um tamanho pequeno, e não grande no turn." }
      - { text: "Apenas {{t:bluff|bluffs}}", why: "Um {{t:range|range}} sem mãos fortes é facilmente reconhecido pelo adversário, que vai {{t:call|pagar}}. Um {{t:range|range}} {{t:polarized|polarizado}} combina {{t:bluff|bluffs}} com mãos muito fortes." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "No flop {{t:dry|seco}} [[Ks 7d 2c]], apostou pouco com quase todas as mãos: desde o set até {{t:pair|pares}} fracos. Como se chama este {{t:range|range}} de aposta?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Linear}}", correct: true, why: "Sim: as mãos fortes e médias apostam juntas, com um tamanho pequeno. É o plano do M5 num flop {{t:dry|seco}} e alto, em que tem {{t:range-advantage|vantagem de range}}." }
      - { text: "{{t:polarized|Polarizado}}", why: "Um {{t:range|range}} {{t:polarized|polarizado}} não tem mãos médias: apostam apenas mãos muito fortes e {{t:bluff|bluffs}}. Aqui também apostaram {{t:pair|pares}} fracos." }
      - { text: "Limitado", why: "Um {{t:range|range}} limitado é aquele em que faltam as mãos mais fortes. Também apostou com sets." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Porque é que um {{t:pair|par}} médio não gosta de uma aposta grande no turn?"
    options:
      - { text: "Porque as mãos piores vão {{t:fold|desistir}} e as melhores vão pagar", correct: true, why: "Sim: uma aposta grande com um {{t:pair|par}} médio só ganha dinheiro quando uma mão pior paga, e essas mãos normalmente {{t:fold|desistem}} perante uma aposta grande. Restam os {{t:call|pagamentos}} de mãos que batem a sua." }
      - { text: "Porque uma aposta grande é sempre um {{t:bluff|bluff}}", why: "Não: as mãos mais fortes também {{t:bet|apostam}} grande. O problema do {{t:pair|par}} médio está em quem lhe vai pagar." }
      - { text: "Porque um {{t:pair|par}} médio não pode ganhar", why: "Pode: ganha a {{t:bluff|bluffs}} e a {{t:pair|pares}} piores. Por isso {{t:check|passa}} e chega barato ao showdown." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind|big blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. Tem um set. O que faz?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Aposto {{n:ex.bet.three-quarters}}", correct: true, why: "Sim: o adversário pode ter um {{t:flush-draw|flush draw}} (duas copas) e de {{t:straight|sequência}} (p. ex. 65, T9). Perante uma aposta de 3/4 do {{t:pot|pote}}, um {{t:flush-draw|flush draw}} precisa de {{n:eq.bet-three-quarters}} de equity, e o {{t:flush|flush}} entra em cerca de {{n:odds.flush.turn-river}} dos casos. Contra o seu set tem ainda menos: [[4h]] e [[2h]] dão-lhe a si um {{t:full-house|full house}}, por isso ao adversário restam {{n:outs.flush.vs-set}} outs limpos, cerca de {{n:odds.flush.vs-set}}. Está a pagar demasiado." }
      - { text: "Aposto {{n:ex.bet.quarter}}", sizeError: true, why: "Ação certa, tamanho errado: perante uma aposta de 1/4 do {{t:pot|pote}}, o {{t:draw|draw}} precisa apenas de {{n:eq.bet-quarter}} de equity, por isso recebe um bom preço. Com uma mão muito forte numa {{t:board|mesa}} com {{t:flush-draw|flush draw}}, aposta grande." }
      - { text: "{{t:check|Passo}}", why: "Uma carta grátis é um presente para os {{t:draw|draws}}, e não constrói o {{t:pot|pote}} antes do river. Um set numa {{t:board|mesa}} com {{t:flush-draw|flush draw}} aposta." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind|big blind}} {{t:call|pagou}} o c-bet no flop. O turn é um três. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. O que faz?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Aposto {{n:ex.bet.three-quarters}}", correct: true, why: "Sim: um {{t:flush-draw|flush draw}} com duas cartas altas é um bom {{t:semi-bluff|semi-bluff}}. Aposta com o mesmo tamanho grande que as mãos fortes, por isso o adversário não distingue o {{t:bluff|bluff}} do valor." }
      - { text: "Aposto {{n:ex.bet.quarter}}", sizeError: true, why: "Ação certa, tamanho errado: o adversário vai {{t:call|pagar}} uma aposta tão barata com qualquer {{t:pair|par}}, e um {{t:semi-bluff|semi-bluff}} ganha sobretudo com as {{t:fold|desistências}}. Se as suas apostas pequenas significassem {{t:draw|draws}} e as grandes mãos fortes, o adversário aproveitaria isso facilmente." }
      - { text: "{{t:check|Passo}}", correct: true, why: "Também está bem: vê o river de graça e acerta o {{t:flush|flush}} em {{n:odds.flush.turn-river}} dos casos. Ainda assim, apostar é normalmente melhor, porque um {{t:draw|draw}} com cartas altas é um dos melhores {{t:semi-bluff|semi-bluffs}}, e ao {{t:check|passar}} abdica de ganhar o {{t:pot|pote}} de imediato." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind|big blind}} {{t:call|pagou}} o c-bet no flop. O turn é um cinco. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. O que faz?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Um {{t:top-pair|top pair}} com kicker fraco é uma mão média. Uma aposta grande será paga sobretudo por reis melhores (AK, KQ, KJ), e as mãos piores vão {{t:fold|desistir}}. Ao {{t:check|passar}}, chega barato ao showdown." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "Uma aposta grande combina com um {{t:range|range}} {{t:polarized|polarizado}}. Com esta mão ganha sobretudo com mãos que batem a sua." }
      - { text: "Aposto {{n:ex.bet.pot}}", why: "Um {{t:pot|pote}} ainda maior com uma mão de força média: as mãos piores quase sempre vão {{t:fold|desistir}}, e as melhores vão pagar." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.pot}} e aposta {{n:ex.bet.three-quarters}} com uma mão muito forte. De que percentagem de equity precisa um adversário com um {{t:draw|draw}} para {{t:call|pagar}}? Introduza um número."
    answer: eq.bet-three-quarters
    explanation: "O adversário acrescenta {{n:ex.bet.three-quarters}} a um {{t:pot|pote}} que, depois de {{t:call|pagar}}, tem {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. Um {{t:flush-draw|flush draw}} tem no turn cerca de {{n:odds.flush.turn-river}}, por isso está a pagar demasiado."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Tem um set e aposta apenas {{n:ex.bet.quarter}} num {{t:pot|pote}} de {{n:ex.pot}}. O adversário tem um {{t:flush-draw|flush draw}} (cerca de {{n:odds.flush.turn-river}} até ao river). O que daí resulta?"
    options:
      - { text: "Recebe um bom preço: precisa apenas de {{n:eq.bet-quarter}}", correct: true, why: "Sim: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, menos do que os {{n:odds.flush.turn-river}} que ele tem. {{t:call|Pagar}} compensa-lhe, e a sua aposta pequena cede parte do valor." }
      - { text: "Tem de {{t:fold|desistir}}, porque precisa de {{n:eq.bet-three-quarters}}", why: "Precisaria disso perante uma aposta de 3/4 do {{t:pot|pote}}. Perante uma aposta de 1/4 do {{t:pot|pote}}, bastam-lhe {{n:eq.bet-quarter}}." }
      - { text: "O preço não importa, porque de qualquer forma tem a melhor mão", why: "Agora tem a melhor mão, mas em cerca de {{n:odds.flush.turn-river}} dos casos o adversário ganha no river. O tamanho da aposta decide se ele paga demasiado ou demasiado pouco por essa hipótese." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "No turn, o adversário tem um {{t:oesd|draw de sequência aberto}}: cerca de {{n:odds.oesd.turn-river}} até ao river. A partir de que aposta sua está ele a pagar demasiado (contando apenas as pot odds)?"
    options:
      - { text: "Já a partir de 1/3 do {{t:pot|pote}}: precisa de {{n:eq.bet-third}}", correct: true, why: "Sim: {{n:eq.bet-third}} é mais do que {{n:odds.oesd.turn-river}}. No turn, os {{t:draw|draws}} têm apenas uma carta por vir, por isso até uma aposta média lhes dá um mau preço." }
      - { text: "Só a partir do {{t:pot|pote}} inteiro: precisa de {{n:eq.bet-pot}}", why: "Com o {{t:pot|pote}} inteiro paga muito mais do que devia, mas já com 1/3 do {{t:pot|pote}} precisa de {{n:eq.bet-third}}, mais do que os {{n:odds.oesd.turn-river}} que tem." }
      - { text: "Nunca, um {{t:draw|draw}} pode sempre {{t:call|pagar}}", why: "Um {{t:draw|draw}} só {{t:call|paga}} com um bom preço ou com implied odds (próxima lição). No turn tem cerca de {{n:odds.oesd.turn-river}}, por isso a maioria das apostas é para ele um mau preço." }
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
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.pot}} e aposta o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. De que percentagem de equity precisa o adversário para {{t:call|pagar}}? Introduza um número."
    answer: eq.bet-pot
    explanation: "O adversário acrescenta {{n:ex.bet.pot}} a um {{t:pot|pote}} que, depois de {{t:call|pagar}}, tem {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Nem o {{t:flush|flush}} (cerca de {{n:odds.flush.turn-river}}) nem a {{t:straight|sequência}} aberta (cerca de {{n:odds.oesd.turn-river}}) têm essa hipótese."
---
No flop apostou muitas vezes pouco com quase todo o seu {{t:range|range}}. No turn, o {{t:range|range}} de aposta muda: ficam nele mãos muito fortes e {{t:semi-bluff|semi-bluffs}}, enquanto as mãos médias {{t:check|passam}}. A este {{t:range|range}} chamamos {{t:polarized|polarizado}}.

## Dois tipos de {{t:range|range}}

- **{{t:linear|Linear}}:** aposta desde as mãos mais fortes para baixo, incluindo as médias. Normalmente com um tamanho pequeno, p. ex. c-bet de {{n:cbet.size.small}} do {{t:pot|pote}} em [[Ks 7d 2c]].
- **{{t:polarized|Polarizado}}:** apostam os dois polos, mãos muito fortes (sets, {{t:two-pair|dois pares}}, {{t:straight|sequências}}, flushes) e {{t:semi-bluff|semi-bluffs}} ({{t:draw|draws}}). Não tem mãos médias.

Em geral, um {{t:range|range}} {{t:polarized|polarizado}} são mãos muito fortes e {{t:bluff|bluffs}}. No turn, os {{t:bluff|bluffs}} são normalmente {{t:semi-bluff|semi-bluffs}}, e no river (M8) mãos sem hipóteses no showdown.

## Porque polariza no turn

O adversário {{t:call|pagou}} o flop, por isso tem normalmente um {{t:pair|par}} ou um {{t:draw|draw}}, por vezes cartas altas com backdoor (M6). Uma mão média não ganha nada com uma segunda aposta: as mãos piores {{t:fold|desistem}} e as melhores pagam. As mãos fortes querem construir o {{t:pot|pote}} antes do river, e os {{t:semi-bluff|semi-bluffs}} precisam de {{t:fold|desistências}} e têm outs quando são {{t:call|pagos}}.

## {{t:range|Range}} {{t:polarized|polarizado}}, aposta grande

Um {{t:range|range}} {{t:polarized|polarizado}} aposta grande, p. ex. 3/4 do {{t:pot|pote}}. As mãos fortes extraem mais {{t:chips|fichas}}, e os {{t:semi-bluff|semi-bluffs}} ganham de imediato com mais frequência. As mãos médias {{t:check|passam}}. Quando os {{t:bluff|bluffs}} e as mãos fortes apostam com o mesmo tamanho, o adversário não sabe qual é a sua mão.

## O preço para os {{t:draw|draws}}

No turn, um {{t:draw|draw}} tem apenas uma carta por vir. Uma aposta grande obriga-o a pagar demasiado:

| A sua aposta | O adversário precisa de | O {{t:flush|flush}} tem | A {{t:straight|sequência}} aberta tem |
|---|---|---|---|
| 1/4 do {{t:pot|pote}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 do {{t:pot|pote}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 do {{t:pot|pote}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 do {{t:pot|pote}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Perante uma aposta de 1/4 do {{t:pot|pote}}, um {{t:flush-draw|flush draw}} tem um bom preço. Com 1/3 do {{t:pot|pote}}, o preço é quase igual à hipótese do {{t:flush|flush}} ({{n:eq.bet-third}} contra {{n:odds.flush.turn-river}}), e a partir de 1/2 do {{t:pot|pote}} o {{t:flush|flush}} paga claramente demasiado, a não ser que conte com implied odds (próxima lição). Os exercícios com {{t:draw|draw}} nesta lição contam apenas as pot odds.

:::note De onde vêm estas regras
Os conceitos de {{t:range|range}} {{t:polarized|polarizado}} e {{t:linear|linear}} e a regra «um {{t:range|range}} {{t:polarized|polarizado}} aposta grande, as mãos médias {{t:check|passam}}» vêm de materiais de formação e são aqui uma heurística; a recomendação de apostar grande com uma mão forte e vulnerável também. O solver no turn também usa tamanhos pequenos. O tamanho de 3/4 do {{t:pot|pote}} é um exemplo para exercícios, e não o único tamanho bom. Os preços na tabela são cálculos exatos da aplicação.
:::
