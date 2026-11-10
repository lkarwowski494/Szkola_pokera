---
id: m7.l4
module: m7
order: 4
title: "Probe bet e defesa"
sub: "Quando o adversário passa ou aposta pela segunda vez"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "O Button {{t:open|abriu}}; está na {{t:big-blind|big blind}} e {{t:call|pagou}}. No flop, ambos fazem check. No turn, aposta primeiro. Como se chama esta {{t:bet|aposta}}?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Sim: a probe bet é uma {{t:bet|aposta}} {{t:out-of-position|fora de posição}} no turn depois de o {{t:aggressor|agressor}} pré-flop não ter feito c-bet e ter {{t:check|passado}}." }
      - { text: "C-bet", why: "O c-bet é {{t:bet|apostada}} pelo jogador que {{t:raise|aumentou}} antes do flop. Neste caso, apenas {{t:call|pagou}}." }
      - { text: "Check-raise", why: "O check-raise é um {{t:check}} seguido de um {{t:raise|aumento}} sobre a {{t:bet|aposta}} do adversário. Aqui aposta primeiro e não {{t:raise|aumenta}} a aposta de ninguém." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Porque é que, depois do {{t:check}} do Button no flop, pode apostar no turn com mais frequência do que o habitual?"
    table: { position: BB }
    options:
      - { text: "Porque o Button apostaria com muitas mãos fortes, por isso, depois do {{t:check}}, tem menos mãos destas", correct: true, why: "Sim: as mãos fortes costumam fazer c-bet. Depois do {{t:check}}, o {{t:range}} do Button tem mais mãos médias e fracas, e pode atacá-lo com uma {{t:bet|aposta}}." }
      - { text: "Porque o {{t:check}} significa sempre que o Button não tem nada", why: "Nem sempre: o Button por vezes {{t:check|passa}} com uma mão forte para o apanhar. Ainda assim, tem menos mãos destas do que quando aposta." }
      - { text: "Porque no turn tem {{t:position|posição}}", why: "Não: o Button age depois de si em todas as {{t:street|rondas}}. A probe bet é {{t:bet|apostada}} {{t:out-of-position|fora de posição}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "O Button {{t:check|passou}} no flop. Em que {{t:board|mesa}} {{t:bet|aposta}} a probe bet com mais frequência a partir da {{t:big-blind|big blind}}?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Sim: as cartas baixas ligam com mais frequência à defesa larga da {{t:big-blind|big blind}} ({{t:pair|pares}} baixos, {{t:connectors|conectores}}), e o Button, depois do {{t:check}}, raramente tem aqui uma mão forte." }
      - { text: "[[Ac Kd 8h Js]]", why: "Numa {{t:board|mesa}} alta, a {{t:range-advantage|vantagem de range}} é do Button: muitos dos seus ases e reis acertaram. Aqui {{t:bet|aposta}} a probe bet com menos frequência." }
      - { text: "Em ambos com a mesma frequência", why: "A {{t:texture|textura}} conta, tal como no c-bet do M5: nas mesas baixas aposta com mais frequência, nas altas com menos." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Defende a {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop, ambos {{t:check|passaram}}. O turn é um três. Age primeiro. O que faz?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Aposto (probe bet)", correct: true, why: "Tem um {{t:oesd}} (um quatro ou um nove) numa {{t:board|mesa}} baixa que se ajusta ao seu {{t:range}}. Ganha quando o Button {{t:fold|desiste}} e, quando ele {{t:call|paga}}, ainda tem {{n:outs.oesd}} outs." }
      - { text: "{{t:check|Passo}}", correct: true, why: "Também está bem: com um {{t:draw|draw}} pode ver o river de graça se o Button também {{t:check|passar}}. Ainda assim, a probe bet costuma ser melhor, porque o Button, depois do {{t:check}} no flop, tem um {{t:range}} fraco e a sua mão é um {{t:semi-bluff}} forte." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}}, por isso pode {{t:check|passar}} de graça (regra do módulo 1). {{t:fold|Desistir}} entrega o {{t:pot|pote}} sem motivo." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Defende a {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop, ambos {{t:check|passaram}}. O turn é um três. Age primeiro. O que faz?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Aposto (probe bet)", correct: true, why: "O {{t:top-pair|top pair}} é uma boa mão para probe bet: os {{t:pair|pares}} mais fracos e as cartas altas do Button vão pagar-lhe, e com uma {{t:bet|aposta}} não lhes dá uma carta grátis." }
      - { text: "{{t:check|Passo}}", why: "Depois do {{t:check}} no flop, o Button tem muitas vezes cartas altas sem {{t:pair|par}}. Se ele voltar a {{t:check|passar}}, recebe uma carta grátis que pode bater a sua mão; além disso, deixa de lucrar com as mãos mais fracas do Button." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}}, por isso pode {{t:check|passar}} de graça. E com um {{t:top-pair|top pair}} quer apostar." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Defende a {{t:big-blind}} contra a {{t:open|abertura}} do Button. No flop, ambos {{t:check|passaram}}. O turn é um valete. Age primeiro. O que faz?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Não tem {{t:pair|par}} nem {{t:draw|draw}}, e a {{t:board|mesa}} alta favorece o {{t:range}} do Button. Uma probe bet sem outs numa {{t:board|mesa}} destas só ganha quando o Button {{t:fold|desiste}}, e ele tem aqui muitos ases, reis e valetes." }
      - { text: "Aposto (probe bet)", why: "A probe bet é {{t:bet|apostada}} com mais frequência em mesas baixas e com mãos que têm {{t:pair|par}} ou outs. Aqui não tem nem uma coisa nem outra." }
      - { text: "{{t:fold|Desisto}}", why: "Pode {{t:check|passar}} de graça, por isso {{t:fold|desistir}} não traz nada (regra do módulo 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Defende a {{t:big-blind}}. {{t:call|Pagou}} o c-bet do Button no flop. O turn é um dois, {{t:check|passa}} e o Button {{t:bet|aposta}} {{n:ex.bet.three-quarters}} num {{t:pot|pote}} de {{n:ex.pot}}. O que faz?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Tem apenas um gutshot (valete): cerca de {{n:odds.gutshot.turn-river}} no river, e precisa de {{n:eq.bet-three-quarters}}. Sem {{t:pair|par}} e com uma só carta por sair, esta mão não se defende contra um {{t:second-barrel}}." }
      - { text: "{{t:call|Pago}}", why: "O preço é várias vezes superior à sua probabilidade: {{n:eq.bet-three-quarters}} contra cerca de {{n:odds.gutshot.turn-river}}. As implied odds não cobrem uma diferença destas." }
      - { text: "Check-raise", why: "Um {{t:second-barrel}} corresponde a um {{t:range}} mais forte do que um c-bet: o Button tem mais vezes um rei ou uma mão melhor que não vai {{t:fold|desistir}}. Com {{n:outs.gutshot}} outs, é um {{t:bluff}} caro." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Defende a {{t:big-blind}}. {{t:call|Pagou}} o c-bet do Button no flop. O turn é um rei, {{t:check|passa}} e o Button {{t:bet|aposta}} apenas {{n:ex.bet.quarter}} num {{t:pot|pote}} de {{n:ex.pot}}. O que faz?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Tem um {{t:oesd}} (valete ou seis): cerca de {{n:odds.oesd.turn-river}}. A aposta pequena exige apenas {{n:eq.bet-quarter}}, ou seja, quase exatamente isso, e, se acertar, ainda pode ganhar mais no river." }
      - { text: "{{t:fold|Desisto}}", why: "Com uma aposta tão pequena, o preço é quase igual à sua probabilidade ({{n:eq.bet-quarter}} contra cerca de {{n:odds.oesd.turn-river}}), e as implied odds fazem pender a decisão para {{t:call|pagar}}." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Arrisca o stack inteiro com uma mão que ainda não tem nada, e o Button com um rei não vai {{t:fold|desistir}}. A um preço tão bom, basta {{t:call|pagar}}." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Defende a {{t:big-blind}}. {{t:call|Pagou}} o c-bet do Button no flop. O turn é um cinco, {{t:check|passa}} e o Button {{t:bet|aposta}} {{n:ex.bet.three-quarters}} num {{t:pot|pote}} de {{n:ex.pot}}. O que faz?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "O {{t:top-pair|top pair}} vale demasiado para {{t:fold|desistir}} numa carta neutra: ganha a {{t:semi-bluff|semi-bluffs}} e a reis mais fracos. Precisa de {{n:eq.bet-three-quarters}} e, contra o {{t:range}} de {{t:second-barrel}}, um {{t:pair|par}} assim costuma ter isso." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado. O {{t:second-barrel}} é mais forte do que o c-bet, mas o Button também o {{t:bet|aposta}} com {{t:draw|draws}} e {{t:bluff|bluffs}}. O {{t:top-pair|top pair}} bate-os a todos." }
      - { text: "{{t:raise|Aumento}}", why: "Depois de um {{t:raise|aumento}}, as mãos piores {{t:fold|desistem}} e pagam os reis melhores e os sets. O {{t:top-pair|top pair}} com kicker médio não é mão para {{t:raise|aumentar}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Porque é que contra um {{t:second-barrel}} defende de forma mais apertada do que contra um c-bet no flop?"
    table: { position: BB }
    options:
      - { text: "Porque o adversário {{t:bet|aposta}} o {{t:second-barrel}} com um {{t:range}} mais estreito e, normalmente, com um tamanho maior, e os {{t:draw|draws}} já só têm uma carta", correct: true, why: "Sim: o adversário abandona parte dos {{t:bluff|bluffs}} no turn, uma aposta maior baixa o {{t:mdf}} (com 3/4 do {{t:pot|pote}}, {{n:mdf.bet-three-quarters}}), e os seus {{t:draw|draws}} perdem metade das hipóteses. {{t:fold|Desiste}} com {{t:pair|pares}} fracos e mãos sem outs com mais frequência do que no flop." }
      - { text: "Porque no turn é preciso poupar {{t:chips|fichas}}", why: "O que conta é o {{t:expected-value|valor esperado}} de cada decisão, não poupar. Defende de forma mais apertada porque o adversário aposta com mãos mais fortes." }
      - { text: "Não, defende de forma mais larga porque já investiu muitas {{t:chips|fichas}}", why: "O que já investiu não volta. Decide com base no preço atual e na força do {{t:range}} do adversário." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. O adversário {{t:bet|aposta}} {{n:ex.bet.three-quarters}} num {{t:pot|pote}} de {{n:ex.pot}}. Qual é o {{t:mdf}}? Introduza o número em percentagem."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot|pote}} ÷ ({{t:pot|pote}} + aposta) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. Num exemplo publicado de turn, o solver defendeu, em média, perto do {{t:mdf}}; {{t:out-of-position|fora de posição}}, por vezes defende menos (no flop e no turn). Quando sabe que o adversário faz {{t:bluff|bluff}} com menos frequência, {{t:fold|desiste}} mais vezes (o cálculo está no M8, na lição sobre apanhar {{t:bluff|bluffs}})."
---
No turn, vai encontrar duas situações novas: o Button não fez c-bet e {{t:check|passou}}, ou fez c-bet e aposta pela segunda vez. Na primeira, pode atacar por iniciativa própria; na segunda, defende de forma mais apertada do que no flop.

## Probe bet

A probe bet é uma {{t:bet|aposta}} {{t:out-of-position|fora de posição}} no turn depois de o {{t:aggressor|agressor}} pré-flop ter {{t:check|passado}} no flop. Com muitas mãos fortes, o Button teria feito c-bet, por isso, depois do {{t:check}}, tem menos mãos destas. O {{t:range}} dele é mais fraco e pode atacá-lo.

- **Com mais frequência em mesas baixas**, p. ex. [[8c 5d 2s 3h]]: as cartas baixas ligam com a sua defesa larga.
- **Com menos frequência em mesas altas**, p. ex. [[Ac Kd 8h Js]]: a {{t:range-advantage|vantagem de range}} fica do lado do Button.

## Com que mãos fazer probe bet

- **{{t:pair|Pares}}** que querem ser pagos pelas cartas altas do Button e não lhe querem dar uma carta grátis,
- **{{t:draw|draws}} fortes**, que ganham de duas maneiras.

As mãos sem {{t:pair|par}} e sem outs {{t:check|passam}}.

## Defesa contra um {{t:second-barrel}}

Quando {{t:call|pagou}} o c-bet e o Button aposta pela segunda vez, o {{t:range}} dele é mais estreito e mais forte do que no flop: abandonou parte dos {{t:bluff|bluffs}}. Os seus {{t:draw|draws}} já só têm uma carta. Por isso:

- os {{t:draw|draws}} só {{t:call|pagam}} com um bom preço ou com implied odds (lição anterior),
- as mãos sem outs e os {{t:pair|pares}} mais fracos {{t:fold|desistem}} com mais frequência,
- o {{t:top-pair|top pair}} normalmente continua a {{t:call|pagar}}.

O {{t:mdf}} continua a ser o ponto de referência: com uma aposta de 3/4 do {{t:pot|pote}}, é de {{n:mdf.bet-three-quarters}}. Num exemplo publicado de turn, o solver defendeu, em média, perto deste valor; {{t:out-of-position|fora de posição}}, por vezes defende menos. Também defende menos quando o adversário faz {{t:bluff|bluff}} com menos frequência do que o {{t:mdf}} pressupõe.

:::note De onde vêm estas regras
As regras da probe bet e da defesa contra o {{t:second-barrel}} são heurísticas de materiais de formação e de análises de solvers. A defesa no turn perto do {{t:mdf}} é mostrada por um exemplo publicado de solver. A aplicação não indica frequências em percentagem, porque as fontes variam consoante a mesa. Os números sobre as mãos com que os jogadores de microlimites {{t:bet|apostam}} probe bets exigem uma fonte com a população descrita (amostra, {{t:stakes|limites}}, salas), por isso não estão aqui.
:::
