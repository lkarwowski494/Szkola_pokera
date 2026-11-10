---
id: m7.l4
module: m7
order: 4
title: "Probe bet e defesa"
sub: "Quando o rival dá check ou aposta pela segunda vez"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "O Button {{t:open|abriu}} e você {{t:call|pagou}} no {{t:big-blind|big blind}}. No flop, vocês dois dão check. No turn, você aposta primeiro. Como se chama essa {{t:bet|aposta}}?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Sim: probe bet é uma {{t:bet|aposta}} {{t:out-of-position|fora de posição}} no turn depois que o {{t:aggressor|agressor}} do pré-flop não fez c-bet e {{t:check|deu check}}." }
      - { text: "C-bet", why: "O c-bet é {{t:bet|apostado}} pelo jogador que {{t:raise|aumentou}} antes do flop. Você só {{t:call|pagou}}." }
      - { text: "Check-raise", why: "Check-raise é um {{t:check|check}} seguido de um {{t:raise|aumento}} sobre a {{t:bet|aposta}} do rival. Aqui você aposta primeiro e não {{t:raise|aumenta}} a aposta de ninguém." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Por que, depois do {{t:check|check}} do Button no flop, você pode apostar no turn com mais frequência do que o normal?"
    table: { position: BB }
    options:
      - { text: "Porque o Button apostaria com muitas mãos fortes, então depois do {{t:check|check}} ele tem menos delas", correct: true, why: "Sim: mãos fortes costumam fazer c-bet. Depois do {{t:check|check}}, o {{t:range|range}} do Button tem mais mãos médias e fracas, e você pode atacá-lo com uma {{t:bet|aposta}}." }
      - { text: "Porque o {{t:check|check}} sempre significa que o Button não tem nada", why: "Nem sempre: o Button às vezes {{t:check|dá check}} com uma mão forte para te pegar. Mas ele tem menos delas do que quando aposta." }
      - { text: "Porque no turn é você quem tem {{t:position|posição}}", why: "Não: o Button age depois de você em toda {{t:street|street}}. O probe bet você {{t:bet|aposta}} {{t:out-of-position|fora de posição}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "O Button {{t:check|deu check}} no flop. Em qual {{t:board|board}} você {{t:bet|aposta}} o probe bet com mais frequência do {{t:big-blind|big blind}}?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Sim: cartas baixas acertam com mais frequência a defesa ampla do {{t:big-blind|big blind}} ({{t:pair|pares}} pequenos, {{t:connectors|conectores}}), e o Button, depois do {{t:check|check}}, raramente tem uma mão forte aqui." }
      - { text: "[[Ac Kd 8h Js]]", why: "Em um {{t:board|board}} alto, a {{t:range-advantage|vantagem de range}} é do Button: muitos dos ases e reis dele acertaram. Aqui você {{t:bet|aposta}} o probe bet com menos frequência." }
      - { text: "Nos dois com a mesma frequência", why: "A {{t:texture|textura}} importa, assim como no c-bet do M5: em boards baixos você aposta com mais frequência, em boards altos, com menos." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, vocês dois {{t:check|deram check}}. O turn é um três. Você age primeiro. O que você faz?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Aposto (probe bet)", correct: true, why: "Você tem um {{t:oesd|OESD}} (um quatro ou um nove) em um {{t:board|board}} baixo, que combina com o seu {{t:range|range}}. Você ganha quando o Button {{t:fold|desiste}} e, quando ele {{t:call|paga}}, ainda tem {{n:outs.oesd}} outs." }
      - { text: "{{t:check|Dou check}}", correct: true, why: "Também está certo: com um {{t:draw|draw}} você pode ver o river de graça se o Button também {{t:check|der check}}. Ainda assim, o probe bet costuma ser melhor, porque o Button, depois do {{t:check|check}} no flop, tem um {{t:range|range}} fraco, e você tem um {{t:semi-bluff|semiblefe}} forte." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}}, então você pode {{t:check|dar check}} de graça (regra do módulo 1). {{t:fold|Desistir}} entrega o {{t:pot|pote}} sem motivo." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, vocês dois {{t:check|deram check}}. O turn é um três. Você age primeiro. O que você faz?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Aposto (probe bet)", correct: true, why: "{{t:top-pair|Top pair}} é uma boa mão para probe bet: {{t:pair|pares}} mais fracos e cartas altas do Button vão te pagar, e com a {{t:bet|aposta}} você não dá a essas mãos uma carta grátis." }
      - { text: "{{t:check|Dou check}}", why: "O Button, depois do {{t:check|check}} no flop, muitas vezes tem cartas altas sem {{t:pair|par}}. Se ele {{t:check|der check}} de novo, ganha uma carta grátis que pode te superar, e você não lucra com as mãos mais fracas dele." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}}, então você pode {{t:check|dar check}} de graça. E com {{t:top-pair|top pair}} você quer apostar." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, vocês dois {{t:check|deram check}}. O turn é um valete. Você age primeiro. O que você faz?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Dou check}}", correct: true, why: "Você não tem {{t:pair|par}} nem {{t:draw|draw}}, e o {{t:board|board}} alto favorece o {{t:range|range}} do Button. Um probe bet sem outs em um {{t:board|board}} assim só ganha quando o Button {{t:fold|desiste}}, e ele tem muitos ases, reis e valetes aqui." }
      - { text: "Aposto (probe bet)", why: "Você {{t:bet|aposta}} o probe bet com mais frequência em boards baixos e com mãos que têm {{t:pair|par}} ou outs. Aqui você não tem nem uma coisa nem outra." }
      - { text: "{{t:fold|Desisto}}", why: "Você pode {{t:check|dar check}} de graça, então {{t:fold|desistir}} não traz nada (regra do módulo 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Você defende o {{t:big-blind|big blind}}. Você {{t:call|pagou}} o c-bet do Button no flop. O turn é um dois, você {{t:check|dá check}} e o Button {{t:bet|aposta}} {{n:ex.bet.three-quarters}} em um {{t:pot|pote}} de {{n:ex.pot}}. O que você faz?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você só tem um gutshot (um valete): cerca de {{n:odds.gutshot.turn-river}} no river, e precisa de {{n:eq.bet-three-quarters}}. Sem {{t:pair|par}} e com uma carta por vir, essa mão não se defende contra um {{t:second-barrel|second barrel}}." }
      - { text: "{{t:call|Pago}}", why: "O preço é várias vezes maior que a sua chance: {{n:eq.bet-three-quarters}} contra cerca de {{n:odds.gutshot.turn-river}}. As implied odds não cobrem uma diferença dessas." }
      - { text: "Check-raise", why: "O {{t:second-barrel|second barrel}} é um {{t:range|range}} mais forte que o c-bet: o Button tem com mais frequência um rei ou uma mão melhor, que não vai {{t:fold|desistir}}. Com {{n:outs.gutshot}} outs, é um {{t:bluff|blefe}} caro." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Você defende o {{t:big-blind|big blind}}. Você {{t:call|pagou}} o c-bet do Button no flop. O turn é um rei, você {{t:check|dá check}} e o Button {{t:bet|aposta}} só {{n:ex.bet.quarter}} em um {{t:pot|pote}} de {{n:ex.pot}}. O que você faz?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Você tem um {{t:oesd|OESD}} (um valete ou um seis): cerca de {{n:odds.oesd.turn-river}}. A aposta pequena exige só {{n:eq.bet-quarter}}, ou seja, quase exatamente isso, e, se acertar, você ainda pode ganhar mais no river." }
      - { text: "{{t:fold|Desisto}}", why: "Com uma aposta tão pequena, o preço é quase igual à sua chance ({{n:eq.bet-quarter}} contra cerca de {{n:odds.oesd.turn-river}}), e as implied odds inclinam a decisão para o {{t:call|pagamento}}." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Você arrisca o stack inteiro com uma mão que ainda não tem nada, e o Button com um rei não vai {{t:fold|desistir}}. Com um preço tão bom, basta {{t:call|pagar}}." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Você defende o {{t:big-blind|big blind}}. Você {{t:call|pagou}} o c-bet do Button no flop. O turn é um cinco, você {{t:check|dá check}} e o Button {{t:bet|aposta}} {{n:ex.bet.three-quarters}} em um {{t:pot|pote}} de {{n:ex.pot}}. O que você faz?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "{{t:top-pair|Top pair}} é demais para {{t:fold|desistir}} numa carta neutra: ganha de {{t:semi-bluff|semiblefes}} e de reis mais fracos. Você precisa de {{n:eq.bet-three-quarters}}, e contra o {{t:range|range}} de {{t:second-barrel|second barrel}} um {{t:pair|par}} desses costuma ter isso." }
      - { text: "{{t:fold|Desisto}}", why: "Apertado demais. O {{t:second-barrel|second barrel}} é mais forte que o c-bet, mas o Button também o {{t:bet|aposta}} com {{t:draw|draws}} e {{t:bluff|blefes}}. {{t:top-pair|Top pair}} ganha de todos eles." }
      - { text: "{{t:raise|Aumento}}", why: "Depois de um {{t:raise|aumento}}, as mãos piores {{t:fold|desistem}}, e pagam os reis melhores e os sets. {{t:top-pair|Top pair}} com kicker médio não é mão para {{t:raise|aumentar}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Por que contra um {{t:second-barrel|second barrel}} você defende mais apertado do que contra um c-bet no flop?"
    table: { position: BB }
    options:
      - { text: "Porque o rival {{t:bet|aposta}} o {{t:second-barrel|second barrel}} com um {{t:range|range}} mais estreito e geralmente com um tamanho maior, e os {{t:draw|draws}} já têm só uma carta", correct: true, why: "Sim: o rival abandona parte dos {{t:bluff|blefes}} no turn, uma aposta maior reduz o {{t:mdf|MDF}} (com 3/4 do {{t:pot|pote}}, {{n:mdf.bet-three-quarters}}), e os seus {{t:draw|draws}} perdem metade das chances. Com {{t:pair|pares}} fracos e mãos sem outs, você {{t:fold|desiste}} com mais frequência do que no flop." }
      - { text: "Porque no turn é preciso economizar {{t:chips|fichas}}", why: "O que conta é o {{t:expected-value|valor esperado}} de cada decisão, não economizar. Você defende mais apertado porque o rival aposta com mãos mais fortes." }
      - { text: "Não, você defende mais amplo porque já colocou muitas {{t:chips|fichas}}", why: "O que você já colocou não volta. Você decide com base no preço agora e na força do {{t:range|range}} do rival." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. O rival {{t:bet|aposta}} {{n:ex.bet.three-quarters}} em um {{t:pot|pote}} de {{n:ex.pot}}. Quanto é o {{t:mdf|MDF}}? Digite o número em porcentagem."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf|MDF}} = {{t:pot|pote}} ÷ ({{t:pot|pote}} + aposta) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. Em um exemplo publicado de turn, o solver defendeu, em média, perto do {{t:mdf|MDF}}; {{t:out-of-position|fora de posição}}, às vezes você defende menos (no flop e no turn). Quando você sabe que o rival {{t:bluff|blefa}} com menos frequência, você {{t:fold|desiste}} com mais frequência (o cálculo está no M8, na lição sobre pegar {{t:bluff|blefes}})."
---
No turn, você vai encontrar duas situações novas: o Button não fez c-bet e {{t:check|deu check}}, ou fez c-bet e aposta pela segunda vez. Na primeira, você mesmo pode atacar; na segunda, você se defende de forma mais apertada do que no flop.

## Probe bet

Probe bet é uma {{t:bet|aposta}} {{t:out-of-position|fora de posição}} no turn depois que o {{t:aggressor|agressor}} do pré-flop {{t:check|deu check}} no flop. O Button faria c-bet com muitas mãos fortes, então, depois do {{t:check|check}}, ele tem menos delas. O {{t:range|range}} dele está mais fraco, e você pode atacá-lo.

- **Com mais frequência em boards baixos**, por exemplo [[8c 5d 2s 3h]]: cartas baixas acertam a sua defesa ampla.
- **Com menos frequência em boards altos**, por exemplo [[Ac Kd 8h Js]]: a {{t:range-advantage|vantagem de range}} continua com o Button.

## Com o que fazer probe bet

- **{{t:pair|Pares}}** que querem ser pagos pelas cartas altas do Button e não querem dar a ele uma carta grátis,
- **{{t:draw|draws}} fortes**, que ganham de duas formas.

Mãos sem {{t:pair|par}} e sem outs {{t:check|dão check}}.

## Defesa contra o {{t:second-barrel|second barrel}}

Quando você {{t:call|pagou}} o c-bet e o Button aposta pela segunda vez, o {{t:range|range}} dele está mais estreito e mais forte do que no flop: ele abandonou parte dos {{t:bluff|blefes}}. Os seus {{t:draw|draws}} já têm só uma carta. Por isso:

- {{t:draw|draws}} {{t:call|pagam}} só com um bom preço ou com implied odds (lição anterior),
- mãos sem outs e os {{t:pair|pares}} mais fracos {{t:fold|desistem}} com mais frequência,
- {{t:top-pair|top pair}} geralmente continua {{t:call|pagando}}.

O {{t:mdf|MDF}} continua sendo o ponto de referência: com uma aposta de 3/4 do {{t:pot|pote}}, ele é de {{n:mdf.bet-three-quarters}}. Em um exemplo publicado de turn, o solver defendeu, em média, perto desse valor; {{t:out-of-position|fora de posição}}, às vezes você defende menos. Você também defende menos quando o rival {{t:bluff|blefa}} com menos frequência do que o {{t:mdf|MDF}} pressupõe.

:::note De onde vêm estas regras
As regras de probe bet e de defesa contra o {{t:second-barrel|second barrel}} são heurísticas de materiais de treinamento e de análises de solvers. A defesa no turn perto do {{t:mdf|MDF}} aparece em um exemplo publicado de solver. O aplicativo não informa frequências em porcentagem, porque as fontes variam conforme o board. Números sobre com o que os jogadores de microlimites {{t:bet|apostam}} probe bets exigem uma fonte com a população descrita (amostra, {{t:stakes|limites}}, sites), por isso não estão aqui.
:::
