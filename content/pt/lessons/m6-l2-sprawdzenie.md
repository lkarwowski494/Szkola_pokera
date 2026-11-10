---
id: m6.l2
module: m6
order: 2
title: "Pagar ou desistir"
sub: "Defesa contra um c-bet fora de posição"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. No {{t:pot|pote}} estão {{n:ex.third.pot}}, e o Button {{t:bet|aposta}} um c-bet de {{n:ex.third.bet}}. Quanta equity precisa para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Acrescenta {{n:ex.third.bet}} a um {{t:pot|pote}} que, depois de {{t:call|pagar}}, terá {{n:ex.third.total}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Um c-bet pequeno dá um preço muito bom." }
      - { text: "{{n:alpha.bet-third}}", why: "Isto é o alpha: a frequência com que o {{t:bluff|bluff}} do Button tem de resultar. No denominador da equity necessária, some também o seu próprio {{t:call|pagamento}}." }
      - { text: "{{n:mdf.bet-third}}", why: "Isto é o {{t:mdf|MDF}}, ou seja, uma parte do {{t:range|range}}, e não a equity de uma única mão. Além disso, no flop {{t:out-of-position|fora de posição}} defende um pouco menos do que o {{t:mdf|MDF}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. No {{t:pot|pote}} estão {{n:ex.pot}}, e o Button {{t:bet|aposta}} um c-bet de {{n:ex.bet.three-quarters}}. Que percentagem de equity precisa para {{t:call|pagar}}? Introduza um número."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Acrescenta {{n:ex.bet.three-quarters}} a um {{t:pot|pote}} que, depois de {{t:call|pagar}}, terá {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}. {{n:ex.bet.three-quarters}} ÷ esta soma = {{n:eq.bet-three-quarters}}. É quase o dobro do que contra um c-bet de 1/4 do {{t:pot|pote}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "A mesma mão no mesmo flop. Uma vez o Button {{t:bet|aposta}} 1/3 do {{t:pot|pote}}, outra vez o {{t:pot|pote}} inteiro. Como muda a sua defesa?"
    table: { position: BB }
    options:
      - { text: "Contra o {{t:pot|pote}} inteiro defende com um {{t:range|range}} mais estreito", correct: true, why: "Uma aposta maior significa um preço pior: a equity necessária sobe de {{n:eq.bet-third}} para {{n:eq.bet-pot}}, e o {{t:mdf|MDF}} desce de {{n:mdf.bet-third}} para {{n:mdf.bet-pot}}. Agora {{t:fold|desiste}} com as mãos mais fracas que pagavam a aposta pequena." }
      - { text: "Defende da mesma forma, porque é a mesma mão", why: "A mão é a mesma, mas o preço é outro. Contra uma aposta do tamanho do {{t:pot|pote}} precisa de {{n:eq.bet-pot}} de equity em vez de {{n:eq.bet-third}}." }
      - { text: "Contra o {{t:pot|pote}} inteiro defende de forma mais ampla, porque uma aposta grande é mais vezes {{t:bluff|bluff}}", why: "Não existe tal regra. Uma aposta grande costuma significar um {{t:range|range}} {{t:polarized|polarizado}} (mãos muito fortes e {{t:bluff|bluffs}}) e, em qualquer caso, um preço pior para si." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop {{t:check|passa}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "O {{t:pair|par}} do meio ganha a todos os {{t:bluff|bluffs}} do Button (mãos sem {{t:pair|par}}), e para {{t:call|pagar}} precisa apenas de {{n:eq.bet-third}} de equity. Uma defesa padrão." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado. Contra um c-bet pequeno {{t:fold|desiste}} com as mãos mais fracas sem {{t:pair|par}} e sem {{t:draw|draw}}, não com um {{t:pair|par}}." }
      - { text: "Check-raise", why: "Normalmente {{t:call|paga}}. Depois de um {{t:raise|aumento}}, pagam-lhe sobretudo mãos melhores e {{t:draw|draws}}; o check-raise com uma mão destas é uma jogada rara do solver contra c-bets pequenos." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop {{t:check|passa}}, e o Button {{t:bet|aposta}} um c-bet de 3/4 do {{t:pot|pote}}. O que faz?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Não tem {{t:pair|par}} nem {{t:draw|draw}} (nenhuma espada, e a {{t:straight|sequência}} está longe). Contra um c-bet grande precisa de {{n:eq.bet-three-quarters}} de equity, e {{t:out-of-position|fora de posição}} raramente chegará ao showdown só com cartas altas. Um {{t:pair|par}} de damas ou de valetes também nem sempre ganha." }
      - { text: "{{t:call|Pago}}", why: "É tentador, porque a dama e o valete são mais altos do que as cartas da mesa. Mas cartas altas sozinhas não chegam a este preço: no turn enfrentará muitas vezes outra aposta e acabará por {{t:fold|desistir}}." }
      - { text: "Check-raise", why: "Para fazer {{t:bluff|bluff}} servem melhor as mãos com {{t:draw|draw}}, que têm uma segunda forma de ganhar. Esta mão não tem nenhuma." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop {{t:check|passa}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Duas cartas altas mais um {{t:flush-draw|flush draw}} adicional (backdoor: três espadas, precisa de uma espada no turn e outra no river). Ao preço de {{n:eq.bet-third}}, isso chega para {{t:call|pagar}}." }
      - { text: "Check-raise", why: "Normalmente não. Faz check-raise sobretudo com as mãos e os {{t:draw|draws}} mais fortes ({{t:flush|flush}}, {{t:oesd|OESD}}). Um {{t:flush-draw|flush draw}} adicional é fraco: quando o Button paga, normalmente fica só com cartas altas. Com esta mão, {{t:call|paga}}." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado contra um c-bet pequeno. O {{t:draw|draw}} adicional e duas cartas altas dão equity suficiente ao preço de {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop {{t:check|passa}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Tem um gutshot para {{t:straight|sequência}} (dama) e um rei mais alto do que a mesa. {{t:call|Pagar}} compra uma carta: acerta o gutshot no turn em cerca de {{n:odds.gutshot.flop-turn}} das vezes, e o rei acrescenta alguns outs para {{t:top-pair|top pair}}. No total, isso é menos do que o preço de {{n:eq.bet-third}}, mas, se completar a {{t:straight|sequência}}, ganhará mais (implied odds), e o rei sozinho às vezes ganha aos {{t:bluff|bluffs}} do Button. Contra um c-bet pequeno, isso chega para {{t:call|pagar}}." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado: um {{t:draw|draw}} mais uma carta alta é suficiente contra um c-bet pequeno." }
      - { text: "Check-raise all-in", why: "Arrisca o stack inteiro com uma mão que ainda não tem nada. Este tamanho afasta as mãos mais fracas, e só pagam as melhores." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop {{t:check|passa}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Não tem {{t:pair|par}} nem {{t:flush-draw|flush draw}}; tem apenas um {{t:straight-draw|draw de sequência}} adicional fraco (precisa de duas cartas concretas), e nenhuma das suas cartas é mais alta do que a mesa. Num flop com ás e rei, o Button tem muitas mãos fortes. O preço é bom, mas esta mão quase nunca o realizará." }
      - { text: "{{t:call|Pago}}, porque o {{t:mdf|MDF}} é de {{n:mdf.bet-third}}", why: "O {{t:mdf|MDF}} é um ponto de referência para todo o {{t:range|range}}, e não uma razão para pagar com as mãos mais fracas. No flop {{t:out-of-position|fora de posição}} pode defender um pouco menos do que o {{t:mdf|MDF}}." }
      - { text: "Check-raise", why: "Num flop com ás e rei, a {{t:range-advantage|vantagem de range}} está do lado do Button, e não tem nenhum {{t:draw|draw}} que lhe dê uma segunda forma de ganhar." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Porque é que, {{t:out-of-position|fora de posição}}, não {{t:call|paga}} no flop com qualquer mão cuja equity seja nem que seja ligeiramente superior ao preço?"
    table: { position: BB }
    options:
      - { text: "Porque não realizará toda a equity", correct: true, why: "A equity é a probabilidade de ganhar se a mão for até ao showdown sem mais {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}}, fala primeiro no turn e no river e muitas vezes {{t:fold|desistirá}} perante outra aposta. As mãos fracas realizam então menos do que a sua equity." }
      - { text: "Porque o Button tem sempre uma mão forte no flop", why: "O Button {{t:open|abre}} e faz c-bet de forma ampla, incluindo com {{t:bluff|bluffs}}. O problema é a sua {{t:position|posição}}, não a força dele." }
      - { text: "Porque é preciso poupar {{t:chips|fichas}} para melhores oportunidades", why: "O que conta é o {{t:expected-value|valor esperado}} de cada decisão, não poupar {{t:chips|fichas}}." }
---
No M5 jogou o c-bet como {{t:aggressor|agressor}}. Agora está do outro lado: defende o {{t:big-blind|big blind}}, passa no flop, e o Button {{t:bet|aposta}} um c-bet. Lembre-se do M5: o c-bet é uma {{t:bet|aposta}} do jogador que {{t:raise|aumentou}} no preflop, e a {{t:range-advantage|vantagem de range}} depende da {{t:texture|textura}} do flop.

## O preço do c-bet

Primeiro, calcula quanta equity precisa (a fórmula do M2). Um c-bet pequeno dá um ótimo preço; um grande, um preço claramente pior.

| C-bet do Button | Equity necessária | {{t:mdf|MDF}} |
|---|---|---|
| 1/4 do {{t:pot|pote}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 do {{t:pot|pote}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 do {{t:pot|pote}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 do {{t:pot|pote}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

O {{t:mdf|MDF}} mostra a direção: quanto maior a aposta, menos mãos defende. No flop {{t:out-of-position|fora de posição}} pode defender um pouco menos do que o {{t:mdf|MDF}}, porque os {{t:bluff|bluffs}} do Button ainda têm equity, mas contra um c-bet pequeno não {{t:fold|desiste}} em massa.

## {{t:out-of-position|Fora de posição}} realiza menos

A equity é a probabilidade de ganhar se a mão for até ao fim sem mais {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}} fala primeiro em cada {{t:street|ronda}}, por isso muitas vezes {{t:fold|desistirá}} antes de ver o showdown. As mãos fracas sem {{t:draw|draw}} realizam menos do que a sua equity indicaria. As mãos do mesmo naipe, os {{t:connectors|conectores}} e os {{t:pair|pares}} realizam mais, porque formam combinações fortes ou já estão a ganhar.

## Com que {{t:call|paga}}

Contra um c-bet pequeno (cerca de 1/3 do {{t:pot|pote}}) continua com:

- quase qualquer {{t:pair|par}}, incluindo o par do meio e o mais baixo,
- {{t:flush-draw|flush draws}} e de {{t:straight|sequência}}, incluindo um gutshot com uma carta alta,
- cartas altas com um {{t:draw|draw}} adicional (backdoor), p. ex. três cartas do mesmo naipe,
- normalmente também com um ás como carta mais alta.

Lembre-se do M2: {{t:call|pagar}} uma {{t:bet|aposta}} no flop compra uma carta, por isso compara o {{t:draw|draw}} com a probabilidade no turn. Essa probabilidade é por vezes um pouco inferior ao preço de um c-bet pequeno. {{t:call|Pagar}} compensa mesmo assim quando, depois de acertar, ganhará mais do que o que está agora no {{t:pot|pote}} (as chamadas implied odds, que calculará no M7), ou quando a mão por vezes ganha sem acertar, p. ex. graças a uma carta alta.

## Com que {{t:fold|desiste}}

- mãos sem {{t:pair|par}} e sem {{t:draw|draw}} que não têm ás nem cartas mais altas do que a mesa; em flops com ás {{t:fold|desiste}} com mais delas,
- normalmente duas cartas altas sem {{t:draw|draw}} quando o c-bet é grande (embora em flops {{t:dry|secos}} com rei o solver {{t:call|pague}} com muitas mãos com ás); {{t:call|paga}} de preferência quando tem um {{t:draw|draw}} adicional, idealmente para o {{t:flush|flush}} mais alto.

À medida que o c-bet aumenta, as mãos mais fracas seguintes passam do {{t:call|pagamento}} para a desistência.
