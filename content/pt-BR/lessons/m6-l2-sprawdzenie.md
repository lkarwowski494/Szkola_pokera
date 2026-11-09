---
id: m6.l2
module: m6
order: 2
title: "Pagar ou desistir"
sub: "Defesa contra c-bet fora de posição"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. No {{t:pot|pote}} há {{n:ex.third.pot}}, e o Button {{t:bet|aposta}} {{n:ex.third.bet}} de c-bet. De quanta equity você precisa para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Você paga {{n:ex.third.bet}} para um {{t:pot|pote}} que, depois de você {{t:call|pagar}}, terá {{n:ex.third.total}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Uma c-bet pequena dá um preço muito bom." }
      - { text: "{{n:alpha.bet-third}}", why: "Isso é o alpha: com que frequência o {{t:bluff|blefe}} do Button precisa funcionar. No denominador da equity necessária, some também o seu {{t:call|pagamento}}." }
      - { text: "{{n:mdf.bet-third}}", why: "Isso é o {{t:mdf}}, ou seja, uma parte do {{t:range}}, e não a equity de uma única mão. Aliás, no flop {{t:out-of-position}} você defende um pouco menos que o {{t:mdf}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. No {{t:pot|pote}} há {{n:ex.pot}}, e o Button {{t:bet|aposta}} {{n:ex.bet.three-quarters}} de c-bet. De quantos por cento de equity você precisa para {{t:call|pagar}}? Digite um número."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Você paga {{n:ex.bet.three-quarters}} para um {{t:pot|pote}} que, depois de você {{t:call|pagar}}, terá {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}. {{n:ex.bet.three-quarters}} ÷ essa soma = {{n:eq.bet-three-quarters}}. É quase o dobro do que contra uma c-bet de 1/4 do {{t:pot|pote}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "A mesma mão no mesmo flop. Uma vez o Button {{t:bet|aposta}} 1/3 do {{t:pot|pote}}, outra vez o {{t:pot|pote}} inteiro. Como muda a sua defesa?"
    table: { position: BB }
    options:
      - { text: "Contra o {{t:pot|pote}} inteiro você defende com um {{t:range}} mais estreito", correct: true, why: "Uma aposta maior significa um preço pior: a equity necessária sobe de {{n:eq.bet-third}} para {{n:eq.bet-pot}}, e o {{t:mdf}} cai de {{n:mdf.bet-third}} para {{n:mdf.bet-pot}}. Agora você {{t:fold|desiste}} das mãos mais fracas que pagavam a aposta pequena." }
      - { text: "Você defende do mesmo jeito, porque é a mesma mão", why: "A mão é a mesma, mas o preço é outro. Contra uma aposta do tamanho do {{t:pot|pote}}, você precisa de {{n:eq.bet-pot}} de equity em vez de {{n:eq.bet-third}}." }
      - { text: "Contra o {{t:pot|pote}} inteiro você defende mais amplo, porque aposta grande é com mais frequência {{t:bluff|blefe}}", why: "Não existe essa regra. Uma aposta grande geralmente indica um {{t:range}} {{t:polarized|polarizado}} (mãos muito fortes e {{t:bluff|blefes}}) e, de qualquer forma, um preço pior para você." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Você defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop você {{t:check|dá check}}, e o Button {{t:bet|aposta}} 1/3 do {{t:pot|pote}} de c-bet. O que você faz?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "O {{t:pair|par}} do meio vence todos os {{t:bluff|blefes}} do Button (mãos sem {{t:pair|par}}), e para {{t:call|pagar}} você precisa de apenas {{n:eq.bet-third}} de equity. Defesa padrão." }
      - { text: "{{t:fold|Desisto}}", why: "Apertado demais. Contra uma c-bet pequena você {{t:fold|desiste}} das mãos mais fracas sem {{t:pair|par}} e sem {{t:draw|projeto}}, e não de um {{t:pair|par}}." }
      - { text: "Check-raise", why: "Normalmente você {{t:call|paga}}. Depois de um {{t:raise|aumento}}, quem paga você são principalmente mãos melhores e {{t:draw|projetos}}; dar check-raise com uma mão assim é uma jogada rara do solver contra c-bets pequenas." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Você defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop você {{t:check|dá check}}, e o Button {{t:bet|aposta}} 3/4 do {{t:pot|pote}} de c-bet. O que você faz?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você não tem {{t:pair|par}} nem {{t:draw|projeto}} (nenhuma carta de espadas, e a {{t:straight|sequência}} está longe). Contra uma c-bet grande você precisa de {{n:eq.bet-three-quarters}} de equity, e {{t:out-of-position}} raramente chegará ao showdown só com cartas altas. Um {{t:pair|par}} de damas ou de valetes também nem sempre vai ganhar." }
      - { text: "{{t:call|Pago}}", why: "É tentador, porque a dama e o valete são mais altos que a mesa. Mas cartas altas sozinhas não bastam a esse preço: no turn você muitas vezes vai enfrentar outra aposta e {{t:fold|desistir}}." }
      - { text: "Check-raise", why: "Para um {{t:bluff|blefe}}, servem melhor as mãos com {{t:draw|projeto}}, que têm um segundo caminho para ganhar. Esta mão não tem nenhum." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Você defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop você {{t:check|dá check}}, e o Button {{t:bet|aposta}} 1/3 do {{t:pot|pote}} de c-bet. O que você faz?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Duas cartas altas mais um {{t:flush-draw|projeto de flush}} adicional (backdoor: três espadas, você precisa de espadas no turn e no river). Ao preço de {{n:eq.bet-third}}, isso basta para {{t:call|pagar}}." }
      - { text: "Check-raise", why: "Normalmente não. Você dá check-raise principalmente com as mãos mais fortes e com {{t:draw|projetos}} ({{t:flush}}, {{t:oesd}}). Um {{t:flush-draw|projeto de flush}} adicional é fraco: quando o Button paga, você geralmente fica só com cartas altas. Com esta mão você {{t:call|paga}}." }
      - { text: "{{t:fold|Desisto}}", why: "Apertado demais contra uma c-bet pequena. O {{t:draw|projeto}} adicional e as duas cartas altas dão equity suficiente ao preço de {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Você defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop você {{t:check|dá check}}, e o Button {{t:bet|aposta}} 1/3 do {{t:pot|pote}} de c-bet. O que você faz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Você tem um gutshot para {{t:straight|sequência}} (dama) e um rei mais alto que a mesa. {{t:call|Pagar}} compra uma carta: você acerta o gutshot no turn em cerca de {{n:odds.gutshot.flop-turn}}, e o rei acrescenta alguns outs para {{t:top-pair|par mais alto}}. Somado, isso é menos que o preço de {{n:eq.bet-third}}, mas, ao acertar a {{t:straight|sequência}}, você ganha mais (implied odds), e o rei sozinho às vezes vence os {{t:bluff|blefes}} do Button. Contra uma c-bet pequena, isso basta para {{t:call|pagar}}." }
      - { text: "{{t:fold|Desisto}}", why: "Apertado demais: {{t:draw|projeto}} mais carta alta é suficiente contra uma c-bet pequena." }
      - { text: "Check-raise all-in", why: "Você arrisca o stack inteiro com uma mão que ainda não tem nada. Esse tamanho expulsa as mãos mais fracas, e só as melhores pagam." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Você defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop você {{t:check|dá check}}, e o Button {{t:bet|aposta}} 1/3 do {{t:pot|pote}} de c-bet. O que você faz?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você não tem {{t:pair|par}} nem {{t:flush-draw|projeto de flush}}; tem só um fraco {{t:straight-draw|projeto de sequência}} adicional (precisa de duas cartas específicas), e nenhuma das suas cartas é mais alta que a mesa. Num flop com ás e rei, o Button tem muitas mãos fortes. O preço é bom, mas esta mão quase nunca vai realizá-lo." }
      - { text: "{{t:call|Pago}}, porque o {{t:mdf}} é de {{n:mdf.bet-third}}", why: "O {{t:mdf}} é um ponto de referência para todo o {{t:range}}, e não um motivo para pagar com as mãos mais fracas. No flop {{t:out-of-position}} você pode defender um pouco menos que o {{t:mdf}}." }
      - { text: "Check-raise", why: "Num flop com ás e rei, a {{t:range-advantage}} está do lado do Button, e você não tem {{t:draw|projeto}} que dê um segundo caminho para ganhar." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Por que, {{t:out-of-position}}, você não {{t:call|paga}} no flop com toda mão cuja equity seja pelo menos um pouco maior que o preço?"
    table: { position: BB }
    options:
      - { text: "Porque você não vai realizar toda a equity", correct: true, why: "Equity é a chance numa mão jogada até o showdown sem mais {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}} você age primeiro no turn e no river e muitas vezes vai {{t:fold|desistir}} diante de outra aposta. Mãos fracas então realizam menos que a sua equity." }
      - { text: "Porque o Button sempre tem mão forte no flop", why: "O Button {{t:open|abre}} e faz c-bet com muitas mãos, inclusive com {{t:bluff|blefes}}. O problema é a sua {{t:position|posição}}, não a força dele." }
      - { text: "Porque é preciso guardar {{t:chips|fichas}} para oportunidades melhores", why: "O que conta é o {{t:expected-value|valor esperado}} de cada decisão, não economizar {{t:chips|fichas}}." }
---
No M5 você jogou a c-bet como {{t:aggressor|agressor}}. Agora você está do outro lado: defende o {{t:big-blind}}, dá check no flop, e o Button {{t:bet|aposta}} uma c-bet. Lembre-se do M5: c-bet é uma {{t:bet|aposta}} do jogador que {{t:raise|aumentou}} no pré-flop, e a {{t:range-advantage}} depende da {{t:texture|textura}} do flop.

## O preço da c-bet

Primeiro, você calcula de quanta equity precisa (a fórmula do M2). Uma c-bet pequena dá um ótimo preço; uma grande, um preço bem pior.

| C-bet do Button | Equity necessária | {{t:mdf}} |
|---|---|---|
| 1/4 do {{t:pot|pote}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 do {{t:pot|pote}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 do {{t:pot|pote}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 do {{t:pot|pote}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

O {{t:mdf}} mostra a direção: quanto maior a aposta, menos mãos você defende. No flop {{t:out-of-position}} você pode defender um pouco menos que o {{t:mdf}}, porque os {{t:bluff|blefes}} do Button ainda têm equity, mas diante de uma c-bet pequena você não {{t:fold|desiste}} em massa.

## {{t:out-of-position|Fora de posição}} você realiza menos

Equity é a chance numa mão jogada até o fim sem mais {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}} você age primeiro em cada {{t:street|rodada}}, então muitas vezes vai {{t:fold|desistir}} antes de ver o showdown. Mãos fracas sem {{t:draw|projeto}} realizam menos do que a equity indica. Mãos do mesmo naipe, {{t:connectors|conectores}} e {{t:pair|pares}} realizam mais, porque formam jogos fortes ou já estão ganhando.

## Com o que você {{t:call|paga}}

Contra uma c-bet pequena (cerca de 1/3 do {{t:pot|pote}}), você continua com:

- quase qualquer {{t:pair|par}}, inclusive o do meio e o mais baixo,
- {{t:flush-draw|projetos de flush}} e de {{t:straight|sequência}}, inclusive gutshot com carta alta,
- cartas altas com {{t:draw|projeto}} adicional (backdoor), por exemplo três cartas do mesmo naipe,
- geralmente também com ás como carta mais alta.

Lembre-se do M2: {{t:call|pagar}} uma {{t:bet|aposta}} no flop compra uma carta, então você compara o {{t:draw|projeto}} com a chance no turn. Essa chance às vezes é um pouco menor que o preço de uma c-bet pequena. {{t:call|Pagar}} ainda compensa quando, ao acertar, você ganha mais do que há agora no {{t:pot|pote}} (as chamadas implied odds, que você vai calcular no M7), ou quando a mão às vezes ganha sem acertar, por exemplo graças a uma carta alta.

## Do que você {{t:fold|desiste}}

- de mãos sem {{t:pair|par}} e sem {{t:draw|projeto}} que não têm ás nem cartas mais altas que a mesa; em flops com ás, você {{t:fold|desiste}} de mais delas,
- geralmente de duas cartas altas sem {{t:draw|projeto}}, quando a c-bet é grande (embora em flops {{t:dry|secos}} com rei o solver {{t:call|pague}} com muitas mãos com ás); você prefere {{t:call|pagar}} quando tem um {{t:draw|projeto}} adicional, de preferência para o {{t:flush}} mais alto.

Quando a c-bet cresce, as próximas mãos mais fracas passam de {{t:call|pagar}} para desistir.
