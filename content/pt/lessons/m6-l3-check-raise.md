---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Quando aumentar um c-bet e para quanto"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop faz {{t:check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:two-pair|Dois pares}} num flop baixo e {{t:connected|conectado}} é uma mão {{t:value|de valor}}. Em flops assim, o {{t:big-blind}} tem no {{t:range|range}} {{t:straight|sequências}} e {{t:two-pair|dois pares}}, e o Button normalmente não tem {{t:nuts-advantage|vantagem de nuts}}. Com o {{t:raise|aumento}}, constrói o {{t:pot|pote}} e obriga {{t:pair|pares}} e {{t:draw|draws}} a pagar." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é bom: num flop muito {{t:connected|conectado}}, o solver apenas {{t:call|paga}} com parte dos {{t:two-pair|dois pares}}. O check-raise constrói o {{t:pot|pote}} e protege a mão com mais frequência." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:two-pair|Dois pares}} é uma das mãos mais fortes neste flop. {{t:fold|Desistir}} é um erro grave." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "No {{t:pot|pote}} há {{n:ex.third.pot}}, e o Button {{t:bet|aposta}} um c-bet de {{n:ex.third.bet}}. Tem um set e quer fazer check-raise. Para quanto {{t:raise|aumenta}}?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "Para {{n:xr.example}}", correct: true, why: "Isto equivale a {{n:xr.mult.example}} o c-bet. O Button tem de acrescentar {{n:xr.example.extra}} e precisa de cerca de {{n:eq.vs-xr.example}} de equity: {{t:pair|pares}} piores e {{t:draw|draws}} fracos (gutshot) não têm preço para pagar, ao passo que os draws de {{t:flush}} e os {{t:oesd|draw de sequência abertos}} já pagarão para um {{t:pot|pote}} grande." }
      - { text: "Para {{n:xr.too-small}}", sizeError: true, why: "Boa ação, mas tamanho demasiado pequeno: o Button acrescenta apenas {{n:xr.too-small.extra}} e precisa de cerca de {{n:eq.vs-xr.too-small}} de equity. Qualquer {{t:flush-draw|flush draw}} ou de {{t:straight|sequência}} pagará quase de graça." }
      - { text: "{{t:call|Pago}}", why: "Num flop com duas copas e cartas para {{t:straight|sequência}}, perde valor e proteção: muitas cartas no turn vão parar a ação ou bater a sua mão. Um set quer construir o {{t:pot|pote}} de imediato." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "No {{t:pot|pote}} há {{n:ex.third.pot}}, e o Button {{t:bet|aposta}} um c-bet de {{n:ex.third.bet}}. Faz check-raise para {{n:xr.mult.example}} o c-bet. Para quanto {{t:raise|aumenta}}? Introduza o número de {{t:chips|fichas}}."
    table: { position: BB }
    answer: xr.example
    explanation: "O c-bet é de {{n:ex.third.bet}}, logo {{n:xr.mult.example}} o c-bet são {{n:xr.example}}. O tamanho do check-raise calcula-se a partir do c-bet, não do {{t:pot|pote}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "No {{t:pot|pote}} havia {{n:ex.third.pot}}, o Button {{t:bet|apostou}} {{n:ex.third.bet}} e a sua resposta foi um {{t:raise|aumento}} para {{n:xr.example}}. De que percentagem de equity precisa o Button para {{t:call|pagar}}? Introduza o número."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "O Button acrescenta {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}. No {{t:pot|pote}} há então {{n:xr.example.pot-after}} e, depois do {{t:call|pagamento}} dele, mais {{n:xr.example.extra}}. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "No {{t:pot|pote}} havia {{n:ex.third.pot}}, o Button {{t:bet|apostou}} {{n:ex.third.bet}} e a sua resposta foi um {{t:raise|aumento}} apenas para {{n:xr.too-small}}. De quanta equity precisa o Button para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:eq.vs-xr.too-small}}", correct: true, why: "Acrescenta {{n:xr.too-small.extra}} para um {{t:pot|pote}} de {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. A um preço tão baixo, pagará com quase qualquer mão; por isso, o {{t:raise|aumento}} deve ser várias vezes maior do que o c-bet." }
      - { text: "Cerca de {{n:eq.vs-xr.example}}", why: "É disso que precisaria contra um {{t:raise|aumento}} para {{n:xr.example}}. Com {{n:xr.too-small}}, acrescenta apenas {{n:xr.too-small.extra}}." }
      - { text: "Cerca de {{n:eq.bet-third}}", why: "Era disso que precisava para {{t:call|pagar}} o c-bet. Depois do check-raise, calcula-se o preço do Button: ele acrescenta {{n:xr.too-small.extra}} para um {{t:pot|pote}} de {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop faz {{t:check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Um {{t:draw|draw}} para o melhor {{t:flush}} é um bom {{t:semi-bluff}}: ganha quando o Button {{t:fold|desiste}} e, quando ele paga, continua a ter {{n:outs.flush}} outs (cerca de {{n:odds.flush.flop-turn}} no turn)." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é bom: acerta o {{t:flush}} no turn em cerca de {{n:odds.flush.flop-turn}} das vezes, quase tanto como o preço de {{n:eq.bet-third}}, e, ao acertar o melhor {{t:flush}}, ganha mais (implied odds). Os {{t:draw|draws}} fortes jogam-se das duas formas, para que o seu check-raise não represente apenas mãos fortes." }
      - { text: "{{t:fold|Desisto}}", why: "Erro grave: com {{n:outs.flush}} outs, acerta o melhor {{t:flush}} no turn em cerca de {{n:odds.flush.flop-turn}} das vezes, quase tanto como o preço de {{n:eq.bet-third}}, e, ao acertar, ganha mais (implied odds). Além disso, pode fazer check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop faz {{t:check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Um {{t:oesd|draw de sequência aberto}} ({{n:outs.oesd}} outs) contra um c-bet pequeno, que dá uma oportunidade barata de {{t:raise|aumentar}}. Com o {{t:raise|aumento}}, pode ganhar de imediato e, se lhe {{t:call|pagarem}}, ainda pode acertar." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é bom: acerta a {{t:straight|sequência}} no turn em cerca de {{n:odds.oesd.flop-turn}} das vezes, um pouco menos do que o preço de {{n:eq.bet-third}}, mas, ao acertar, ganha mais (implied odds) e, se ninguém {{t:bet|apostar}} no turn, vê também o river de graça. Com parte dos {{t:draw|draws}} fortes, {{t:call|paga}}, para que os seus {{t:call|pagamentos}} não sejam todos fracos." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado: com {{n:outs.oesd}} outs, acerta a {{t:straight|sequência}} no turn em cerca de {{n:odds.oesd.flop-turn}} das vezes, pouco menos do que o preço de {{n:eq.bet-third}}; o resto vem das implied odds e da hipótese de um river grátis. Além disso, pode fazer check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop faz {{t:check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "{{t:top-pair|Top pair}} com kicker fraco é uma mão para {{t:call|pagar}}. Ganha aos {{t:bluff|bluffs}} do Button e, ao {{t:call|pagar}}, mantém-nos em jogo." }
      - { text: "Check-raise", why: "Normalmente {{t:call|paga}}. Depois de um {{t:raise|aumento}}, pagam-lhe sobretudo mãos melhores e {{t:draw|draws}}; fazer check-raise com esta mão é uma jogada rara do solver contra c-bets pequenos." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:top-pair|Top pair}} contra um c-bet pequeno é claramente demasiado forte para {{t:fold|desistir}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Defende o {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop faz {{t:check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Não tem {{t:pair|par}} nem {{t:flush-draw|flush draw}}; tem apenas um fraco {{t:straight-draw|draw de sequência}} backdoor (precisa de duas cartas específicas), e nenhuma das suas cartas é mais alta do que as da mesa. Em flops com ás, {{t:fold|desiste}} de mais mãos destas." }
      - { text: "Check-raise como {{t:bluff}}", why: "Os {{t:bluff|bluffs}} em check-raise fazem-se sobretudo com {{t:draw|draws}} (de {{t:flush}}, {{t:oesd|draw de sequência abertos}}) que também ganham quando acertam. Esta mão tem apenas um fraco {{t:draw|draw}} backdoor, e o Button tem aqui muitos ases e reis que não vão {{t:fold|desistir}}." }
      - { text: "{{t:call|Pago}}", why: "O preço é bom, mas esta mão quase não acerta nada: até um {{t:pair|par}} de seis ou de cincos perde contra a maioria das mãos com que o Button continuará a pagar." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Contra que c-bet do Button faz check-raise com mais frequência?"
    table: { position: BB }
    options:
      - { text: "1/4 do {{t:pot|pote}}", correct: true, why: "Um c-bet pequeno dá uma oportunidade barata de {{t:raise|aumentar}}, e o Button faz essa {{t:bet|aposta}} com um {{t:range}} largo, com muitas mãos fracas. Contra um c-bet grande, {{t:raise|aumenta}} com menos frequência e com menos mãos: sobretudo sets e {{t:two-pair|dois pares}}, menos {{t:bluff|bluffs}}." }
      - { text: "{{t:pot|Pote}} inteiro", why: "Contra um c-bet grande, o {{t:raise|aumento}} custa muito, e o {{t:range}} do Button é mais forte. Com mais frequência {{t:call|paga}} ou {{t:fold|desiste}}." }
      - { text: "Com a mesma frequência", why: "Contra c-bets pequenos, {{t:raise|aumenta}} com mais frequência e com mais mãos; contra c-bets grandes, com menos frequência, sobretudo com as mãos mais fortes." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Joga contra um Button que no flop quase nunca {{t:fold|desiste}}. Ele {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que faz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Com um gutshot e uma carta alta, {{t:call|pagar}} compensa ao preço de {{n:eq.bet-third}}. O check-raise como {{t:bluff}} ganha com as {{t:fold|desistências}}, e este adversário quase não {{t:fold|desiste}}, por isso o {{t:raise|aumento}} perde a sua principal vantagem." }
      - { text: "Check-raise", why: "Os {{t:bluff|bluffs}} em check-raise fazem-se sobretudo com {{t:draw|draws}} fortes, e o gutshot não é um deles. Além disso, o {{t:bluff}} ganha com as {{t:fold|desistências}}, e este adversário quase não {{t:fold|desiste}}: contra ele, {{t:raise|aumenta}} sobretudo {{t:value|por valor}}." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado: um {{t:draw|draw}} com carta alta defende-se a um preço tão bom, independentemente de contra quem joga." }
---
O check-raise consiste em fazer {{t:check}} e depois um {{t:raise|aumento}} sobre a {{t:bet|aposta}} do adversário. No {{t:big-blind|big blind}}, é uma arma importante contra c-bets (na maior parte das vezes, escolhe de qualquer forma entre {{t:call|pagar}} e {{t:fold|desistir}}): sem ela, o Button poderia fazer c-bet barato com quase qualquer mão.

## Para que {{t:raise|aumentar}}

Faz check-raise por duas razões:

- **{{t:value|por valor}}**: tem uma mão muito forte ({{t:two-pair|dois pares}}, set) e quer construir o {{t:pot|pote}},
- **como {{t:semi-bluff}}**: tem um {{t:draw|draw}} ({{t:flush}}, {{t:oesd}}) que ganha de duas formas: quando o Button {{t:fold|desiste}} ou quando acerta.

Com mãos médias, p. ex. {{t:top-pair|top pair}} com kicker fraco, normalmente {{t:call|paga}}: depois de um {{t:raise|aumento}}, as mãos piores do Button {{t:fold|desistem}} com mais frequência, e as melhores pagam. Isto é uma simplificação: contra c-bets pequenos, o solver também {{t:raise|aumenta}} com parte dos {{t:top-pair|top pairs}} e dos {{t:pair|pares}} fracos, para proteção. Por outro lado, com {{t:two-pair|dois pares}} num flop muito {{t:connected|conectado}}, o solver muitas vezes apenas {{t:call|paga}}.

## Quando com mais frequência

- **Contra um c-bet pequeno.** O {{t:raise|aumento}} é barato, e o Button {{t:bet|aposta}} um c-bet pequeno com um {{t:range}} largo. Contra um c-bet grande, {{t:raise|aumenta}} com menos frequência e com menos mãos: sobretudo sets e {{t:two-pair|dois pares}}, menos {{t:bluff|bluffs}}.
- **Em flops baixos e {{t:connected|conectados}}** (p. ex. [[7h 6d 5s]]). O {{t:big-blind|big blind}} defende muitas mãos baixas, que aqui fazem {{t:straight|sequências}} e {{t:two-pair|dois pares}}, por isso o Button normalmente não tem aqui {{t:nuts-advantage|vantagem de nuts}}.
- **Com menos frequência em flops altos favoráveis ao Button**, p. ex. K-J-T ou A-A-K: aí é ele que tem mais mãos fortíssimas.

## Que tamanho

O tamanho do check-raise calcula-se a partir do c-bet. Exemplo: no {{t:pot|pote}} há {{n:ex.third.pot}}, e o c-bet é de {{n:ex.third.bet}}. Um check-raise para {{n:xr.mult.example}} o c-bet é um {{t:raise|aumento}} para {{n:xr.example}}: o Button acrescenta {{n:xr.example.extra}} e precisa de cerca de **{{n:eq.vs-xr.example}}** de equity. Um {{t:raise|aumento}} apenas para {{n:xr.too-small}} dá-lhe um preço de cerca de **{{n:eq.vs-xr.too-small}}**: pagará com quase qualquer mão que tenha algum {{t:draw|draw}}. Por isso, {{t:raise|aumenta}} para cerca de {{n:xr.mult.low}}–{{n:xr.mult.example}} o c-bet, tanto mais quanto menor for o c-bet, e não o mínimo.

:::note Adversário que não {{t:fold|desiste}}
O {{t:bluff}} em check-raise ganha com as {{t:fold|desistências}} (recorde o alpha da primeira lição). Contra um jogador que no flop quase nunca {{t:fold|desiste}}, {{t:raise|aumenta}} sobretudo {{t:value|por valor}} e reserva os {{t:bluff|bluffs}} para os {{t:draw|draws}} mais fortes.
:::
