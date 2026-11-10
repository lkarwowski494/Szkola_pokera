---
id: m7.l3
module: m7
order: 3
title: "Draws e implied odds"
sub: "Quanto tem de ganhar depois"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "No flop tinha cerca de {{n:odds.flush.flop-river}} de hipóteses de fazer {{t:flush|flush}} até ao river. O turn não ajudou. Quantas hipóteses tem agora?"
    options:
      - { text: "Cerca de {{n:odds.flush.turn-river}}", correct: true, why: "Sim: resta uma carta. {{n:outs.flush}} outs em {{n:cards.unseen.turn}} cartas desconhecidas dão {{n:odds.flush.turn-river}}, mais ou menos metade da hipótese do flop." }
      - { text: "Continua a ser cerca de {{n:odds.flush.flop-river}}, porque há o mesmo número de outs", why: "Há o mesmo número de outs, mas menos cartas por revelar. {{n:odds.flush.flop-river}} conta com duas cartas, e no turn resta uma." }
      - { text: "Não é possível calcular sem calculadora", why: "É possível: a regra do 2 e do 4 do M2. Uma carta, portanto outs × 2: aproximadamente {{n:odds.flush.rule-turn}}. Exatamente, {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. Quantos outs tem para {{t:flush|flush}} ou {{t:straight|sequência}}? Introduza o número."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Para o {{t:flush|flush}}, {{n:outs.flush}} copas; para a {{t:straight|sequência}}, todas as damas e todos os setes, ou seja, {{n:outs.oesd}} cartas. A dama de copas e o sete de copas já estão contados no flush, por isso subtrai {{n:draw.combo.overlap}}: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:bet|aposta}} {{n:ex.bet.three-quarters}}. O que faz?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Tem {{n:outs.combo}} outs, ou seja, cerca de {{n:odds.combo.turn-river}} no river. Precisa de {{n:eq.bet-three-quarters}}, por isso {{t:call|pagar}} compensa mesmo sem implied odds." }
      - { text: "{{t:fold|Desisto}}, porque um {{t:draw|draw}} no turn não chega", why: "A este preço, um {{t:draw|draw}} simples é de facto para {{t:fold|desistir}}, mas {{t:flush|flush}} e {{t:straight|sequência}} em conjunto dão cerca de {{n:odds.combo.turn-river}}, mais do que os {{n:eq.bet-three-quarters}} necessários." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.third.pot}} e o adversário {{t:bet|aposta}} {{n:io.flush.bet}}. Tem um {{t:flush-draw|flush draw}}: {{n:outs.flush}} outs em {{n:cards.unseen.turn}} cartas. Quantas {{t:chips|fichas}} tem de ganhar adicionalmente no river, quando acerta, para que {{t:call|pagar}} fique em equilíbrio? Introduza o número."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Precisa de {{n:io.flush.eq}} de equity e tem cerca de {{n:odds.flush.turn-river}}. Em {{n:cards.unseen.turn}} rivers possíveis, acerta {{n:outs.flush}} vezes e falha {{n:miss.flush.turn}} vezes, perdendo {{n:io.flush.bet}} de cada vez. Cada acerto tem, portanto, de render {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. No {{t:pot|pote}} há {{n:io.flush.pot-after-bet}}; faltam {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. No {{t:pot|pote}} há {{n:io.oesd.pot}} e o adversário {{t:bet|aposta}} {{n:io.oesd.bet}}. Tem um {{t:oesd|draw de sequência aberto}}: {{n:outs.oesd}} outs, {{n:miss.oesd.turn}} cartas que falham. Quanto tem de ganhar adicionalmente no river, quando acerta?"
    options:
      - { text: "Cerca de {{n:io.oesd.extra}}", correct: true, why: "Cada acerto tem de render {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. No {{t:pot|pote}} há {{n:io.oesd.pot-after-bet}}, por isso faltam {{n:io.oesd.extra}}." }
      - { text: "Cerca de {{n:io.oesd.need}}", why: "É quanto tem de ganhar no total em cada acerto. Parte disso já está no {{t:pot|pote}} ({{n:io.oesd.pot-after-bet}}), por isso faltam ainda {{n:io.oesd.extra}}." }
      - { text: "Nada, o preço chega", why: "Precisa de {{n:eq.bet-half}} de equity e tem cerca de {{n:odds.oesd.turn-river}}. O {{t:pot|pote}} por si só não chega; faltam {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.third.pot}} e o adversário {{t:bet|aposta}} {{n:io.flush.bet}}. Ambos têm ainda {{n:io.flush.stack}} atrás, e o adversário paga de bom grado com um {{t:pair|par}} de ases. O que faz?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "O preço por si só não chega ({{n:io.flush.eq}} contra cerca de {{n:odds.flush.turn-river}}), mas, quando acerta, basta ganhar mais {{n:io.flush.extra}}. Tem um {{t:draw|draw}} para o melhor {{t:flush|flush}} (o ás de copas está na {{t:board|mesa}}, por isso o {{t:flush|flush}} ao rei é a mais alta), o adversário tem muitas {{t:chips|fichas}} atrás e um jogador com um {{t:pair|par}} de ases paga muitas vezes uma aposta destas no river. O acerto será visível (terceira copa), mas o adversário com um {{t:pair|par}} de ases muitas vezes paga na mesma; por isso, as implied odds aqui são menores do que com um acerto escondido." }
      - { text: "{{t:fold|Desisto}}, porque {{n:odds.flush.turn-river}} é menos do que {{n:io.flush.eq}}", why: "As pot odds dizem «{{t:fold|desistir}}», mas está a ignorar as implied odds. Faltam apenas {{n:io.flush.extra}}, e o adversário tem {{n:io.flush.stack}} atrás e uma mão que vai pagar." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Um adversário com um {{t:pair|par}} de ases provavelmente {{t:call|paga}}, e nesse caso tem apenas cerca de {{n:odds.flush.turn-river}}. É melhor ver o river barato e ganhar mais quando acerta." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:bet|aposta}} {{n:ex.bet.half}}. Tem um gutshot. Depois de acertar, teria de ganhar mais {{n:io.gut.extra}}, mas o adversário tem apenas {{n:io.gut.stack}} atrás. O que faz?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "O gutshot dá cerca de {{n:odds.gutshot.turn-river}} e precisa de {{n:eq.bet-half}}. As implied odds não ajudam: mesmo que o adversário pague tudo o que lhe resta ({{n:io.gut.stack}}), não cobre o que falta ({{n:io.gut.extra}})." }
      - { text: "{{t:call|Pago}}, por causa das implied odds", why: "As implied odds são as {{t:chips|fichas}} que o adversário ainda lhe pode pagar. Ele tem apenas {{n:io.gut.stack}}, e são precisos {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Um {{t:bluff}} all-in com {{n:outs.gutshot}} outs arrisca tudo. Um adversário que {{t:bet|apostou}} metade do {{t:pot|pote}} com um stack tão pequeno muitas vezes já não {{t:fold|desiste}}." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.pot}} e um adversário cauteloso {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. O que faz?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Precisa de {{n:eq.bet-pot}} e tem cerca de {{n:odds.flush.turn-river}}. Além disso, o seu {{t:flush|flush}} é baixa: quando sair uma copa, um adversário com a dama ou o valete de copas tem um {{t:flush|flush}} melhor, e é aí que perde mais (implied odds inversas)." }
      - { text: "{{t:call|Pago}}, por causa das implied odds", why: "Aqui as implied odds são fracas: um {{t:flush|flush}} feito pode perder para uma mais alta, e toda a gente vê a terceira copa na {{t:board|mesa}}. Também falta muito: o preço é {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Aumento}}", why: "Um adversário cauteloso que {{t:bet|aposta}} o {{t:pot|pote}} inteiro numa {{t:board|mesa}} com ás e rei raramente {{t:fold|desiste}}. Arrisca muito com uma mão que, mesmo acertando, pode perder." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "Quando são as implied odds maiores?"
    options:
      - { text: "Quando tem um {{t:draw|draw}} para a melhor mão e o adversário tem uma mão forte e muitas {{t:chips|fichas}} atrás", correct: true, why: "Sim: nesse caso, quando acerta, ganha, e o adversário tem fichas e mão para lhe pagar." }
      - { text: "Quando o adversário tem poucas {{t:chips|fichas}} ({{t:spr}} baixo)", why: "Pelo contrário: com um {{t:spr}} baixo, o adversário já não tem o que pagar a mais, por isso as implied odds são pequenas." }
      - { text: "Quando tem um {{t:draw|draw}} para um {{t:flush|flush}} baixo", why: "Isso são implied odds inversas: às vezes acerta e continua a perder, e num {{t:pot|pote}} grande." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "No início do turn, há {{n:ex.pot}} no {{t:pot|pote}} e o menor dos dois stacks é {{n:spr.stack.high}}. Quanto é o {{t:spr}}?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = stack ÷ {{t:pot|pote}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. O adversário tem vários {{t:pot|potes}} atrás, por isso as implied odds podem ser grandes." }
      - { text: "{{n:spr.low}}", why: "Seria esse o valor com um stack de {{n:spr.stack.low}}. Aqui o stack é {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "Isso é o {{t:pot|pote}}. O {{t:spr}} é uma razão: o stack dividido pelo {{t:pot|pote}}." }
---
No turn resta apenas uma carta. A hipótese do {{t:draw|draw}} cai mais ou menos para metade, e o preço da carta seguinte costuma subir. Por isso, no turn calcula com mais precisão e faz uma nova pergunta: quanto posso ganhar depois, se acertar?

## Uma carta até ao fim

| {{t:draw|Draw}} | Outs | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:straight|Sequência}} aberta | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Flush}} + {{t:straight|sequência}} aberta | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Com a regra do 2 e do 4 do M2, multiplica os outs por 2. Quando dois {{t:draw|draws}} partilham cartas, conta-as uma só vez.

## Implied odds

As implied odds (probabilidades implícitas) são as {{t:chips|fichas}} que ganhará no river quando acertar. Exemplo: no {{t:pot|pote}} há {{n:ex.third.pot}}, o adversário {{t:bet|aposta}} {{n:io.flush.bet}}, e a sua mão é um {{t:flush-draw|flush draw}}. Precisa de {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} de equity e tem cerca de {{n:odds.flush.turn-river}}. O {{t:pot|pote}} por si só não chega.

Em {{n:cards.unseen.turn}} rivers possíveis, acerta {{n:outs.flush}} vezes e falha {{n:miss.flush.turn}} vezes. Para ficar em equilíbrio, cada acerto tem de render tanto quanto custam as falhas:

```formula
ganho necessário = montante a pagar × (cartas que falham ÷ outs)
```

Aqui: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. No {{t:pot|pote}} há {{n:io.flush.pot-after-bet}}, por isso no river tem de receber ainda, em média, mais **{{n:io.flush.extra}}**.

## {{t:spr}}: quantas {{t:chips|fichas}} o adversário tem atrás

O {{t:spr}} (stack em relação ao {{t:pot|pote}}) é o {{t:effective-stack|stack efetivo}}, ou seja, o menor dos dois, dividido pelo {{t:pot|pote}} no início da {{t:street|ronda}}. O {{t:spr}} pode ser calculado em qualquer {{t:street|ronda}}; aqui calcula-o no turn. Com um {{t:pot|pote}} de {{n:ex.pot}} e um stack de {{n:spr.stack.high}}, o {{t:spr}} é {{n:spr.high}}, ou seja, o adversário tem ainda vários {{t:pot|potes}} atrás; com um stack de {{n:spr.stack.low}}, é apenas {{n:spr.low}}. As implied odds não podem ser maiores do que as {{t:chips|fichas}} que o adversário ainda tem à sua frente. Com um {{t:spr}} baixo, contam quase só as pot odds. Mais sobre o {{t:spr}} no módulo «Plano da mão» (M9), que planeia a mão de acordo com o {{t:spr}} do flop.

## Quando as implied odds são reais

- tem um {{t:draw|draw}} para a **melhor mão** (o {{t:flush|flush}} mais alto possível, normalmente com o ás),
- o adversário tem uma **mão forte**, com a qual vai pagar,
- o adversário tem **muitas {{t:chips|fichas}}** atrás ({{t:spr}} alto),
- o acerto **não salta à vista** (p. ex., um gutshot é menos visível do que uma terceira copa na {{t:board|mesa}}).

As implied odds inversas jogam contra si: quando tem um {{t:draw|draw}} para um {{t:flush|flush}} baixo ou para uma {{t:straight|sequência}} e pode sair um {{t:flush|flush}} na {{t:board|mesa}}, às vezes acerta e continua a perder, e num {{t:pot|pote}} grande.

:::note De onde vêm estas regras
O cálculo das implied odds é um cálculo exato a partir do {{t:expected-value|valor esperado}}. As condições em que as implied odds são reais e as implied odds inversas são heurísticas de materiais de formação.
:::
