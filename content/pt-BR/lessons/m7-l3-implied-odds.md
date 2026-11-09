---
id: m7.l3
module: m7
order: 3
title: "Projetos e implied odds"
sub: "Quanto você precisa ganhar depois"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "No flop você tinha cerca de {{n:odds.flush.flop-river}} de chance de fazer um {{t:flush}} até o river. O turn não ajudou. Quanto você tem agora?"
    options:
      - { text: "Cerca de {{n:odds.flush.turn-river}}", correct: true, why: "Sim: resta uma carta. {{n:outs.flush}} outs em {{n:cards.unseen.turn}} cartas desconhecidas dão {{n:odds.flush.turn-river}}, mais ou menos metade da chance do flop." }
      - { text: "Ainda cerca de {{n:odds.flush.flop-river}}, porque o número de outs é o mesmo", why: "O número de outs é o mesmo, mas há menos cartas por vir. {{n:odds.flush.flop-river}} conta duas cartas, e no turn resta uma." }
      - { text: "Não dá para calcular sem calculadora", why: "Dá: a regra do 2 e do 4 do M2. Uma carta, então outs × 2: aproximadamente {{n:odds.flush.rule-turn}}. Exatamente {{n:odds.flush.turn-river}}." }
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
    prompt: "Turn. Quantos outs você tem para {{t:flush}} ou {{t:straight|sequência}}? Digite um número."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Para o {{t:flush}}, {{n:outs.flush}} copas; para a {{t:straight|sequência}}, toda dama e todo sete, ou seja, {{n:outs.oesd}} cartas. A dama de copas e o sete de copas já foram contados no flush, então você subtrai {{n:draw.combo.overlap}}: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. Há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:ex.bet.three-quarters}}. O que você faz?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Você tem {{n:outs.combo}} outs, ou seja, cerca de {{n:odds.combo.turn-river}} no river. Você precisa de {{n:eq.bet-three-quarters}}, então {{t:call|pagar}} compensa mesmo sem implied odds." }
      - { text: "{{t:fold|Desisto}}, porque um {{t:draw|projeto}} no turn é pouco", why: "Com um {{t:draw|projeto}} comum, a esse preço, o certo é mesmo {{t:fold|desistir}}, mas um projeto de {{t:flush}} junto com um de {{t:straight|sequência}} dá cerca de {{n:odds.combo.turn-river}}, mais que os {{n:eq.bet-three-quarters}} necessários." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Há {{n:ex.third.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:io.flush.bet}}. Você tem um {{t:flush-draw|projeto de flush}}: {{n:outs.flush}} outs em {{n:cards.unseen.turn}} cartas. Quantas {{t:chips|fichas}} a mais você precisa ganhar no river, quando acertar, para que {{t:call|pagar}} fique no zero a zero? Digite um número."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Você precisa de {{n:io.flush.eq}} de equity e tem cerca de {{n:odds.flush.turn-river}}. Em {{n:cards.unseen.turn}} rivers possíveis, você acerta {{n:outs.flush}} vezes e erra {{n:miss.flush.turn}} vezes, perdendo {{n:io.flush.bet}} em cada uma. Então cada acerto precisa render {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. Há {{n:io.flush.pot-after-bet}} no {{t:pot|pote}}, faltam {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Há {{n:io.oesd.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:io.oesd.bet}}. Você tem um {{t:oesd}}: {{n:outs.oesd}} outs, {{n:miss.oesd.turn}} cartas que não acertam. Quanto a mais você precisa ganhar no river, quando acertar?"
    options:
      - { text: "Cerca de {{n:io.oesd.extra}}", correct: true, why: "Cada acerto precisa render {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. Há {{n:io.oesd.pot-after-bet}} no {{t:pot|pote}}, então faltam {{n:io.oesd.extra}}." }
      - { text: "Cerca de {{n:io.oesd.need}}", why: "É quanto você precisa ganhar no total em cada acerto. Parte disso já está no {{t:pot|pote}} ({{n:io.oesd.pot-after-bet}}), então faltam mais {{n:io.oesd.extra}}." }
      - { text: "Nada, o preço basta", why: "Você precisa de {{n:eq.bet-half}} de equity e tem cerca de {{n:odds.oesd.turn-river}}. O {{t:pot|pote}} sozinho não basta; faltam {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Há {{n:ex.third.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:io.flush.bet}}. Cada um de vocês ainda tem {{n:io.flush.stack}} atrás, e o adversário paga de bom grado com um {{t:pair|par}} de ases. O que você faz?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "O preço sozinho não basta ({{n:io.flush.eq}} contra cerca de {{n:odds.flush.turn-river}}), mas, quando acertar, você só precisa ganhar mais {{n:io.flush.extra}}. Você tem um {{t:draw|projeto}} para o melhor {{t:flush}} (o ás de copas está na {{t:board|mesa}}, então o {{t:flush}} de rei é o mais alto), o adversário tem muitas {{t:chips|fichas}} atrás, e um jogador com {{t:pair|par}} de ases muitas vezes paga uma aposta assim no river. O acerto vai ficar visível (terceira copas), mas o adversário com {{t:pair|par}} de ases muitas vezes paga mesmo assim; por isso as implied odds aqui são menores do que com um acerto escondido." }
      - { text: "{{t:fold|Desisto}}, porque {{n:odds.flush.turn-river}} é menos que {{n:io.flush.eq}}", why: "As pot odds dizem “{{t:fold|desistir}}”, mas você está ignorando as implied odds. Faltam só {{n:io.flush.extra}}, e o adversário tem {{n:io.flush.stack}} atrás e uma mão que vai pagar." }
      - { text: "{{t:raise|Aumento}} all-in", why: "O adversário com {{t:pair|par}} de ases provavelmente vai {{t:call|pagar}}, e aí você tem só cerca de {{n:odds.flush.turn-river}}. É melhor ver o river barato e ganhar mais quando acertar." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:ex.bet.half}}. Você tem um gutshot. Depois de acertar, você precisaria ganhar mais {{n:io.gut.extra}}, mas o adversário só tem {{n:io.gut.stack}} atrás. O que você faz?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "O gutshot dá cerca de {{n:odds.gutshot.turn-river}}, e você precisa de {{n:eq.bet-half}}. As implied odds não vão ajudar: mesmo que o adversário coloque todos os seus {{n:io.gut.stack}}, isso não cobre os {{n:io.gut.extra}} que faltam." }
      - { text: "{{t:call|Pago}}, por causa das implied odds", why: "Implied odds são as {{t:chips|fichas}} que o adversário ainda pode pagar a você. Ele tem só {{n:io.gut.stack}}, e você precisa de {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Um {{t:bluff|blefe}} all-in com {{n:outs.gutshot}} outs arrisca tudo. Um adversário que {{t:bet|apostou}} meio {{t:pot|pote}} com um stack tão pequeno muitas vezes já não vai {{t:fold|desistir}}." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. Há {{n:ex.pot}} no {{t:pot|pote}}, e um adversário cauteloso {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. O que você faz?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você precisa de {{n:eq.bet-pot}} e tem cerca de {{n:odds.flush.turn-river}}. Além disso, seu {{t:flush}} é baixo: quando cair uma copas, um adversário com dama ou valete de copas tem um {{t:flush}} melhor, e é aí que você perde mais (implied odds reversas)." }
      - { text: "{{t:call|Pago}}, por causa das implied odds", why: "As implied odds aqui são fracas: um {{t:flush}} feito pode perder para um mais alto, e todo mundo vê a terceira copas na {{t:board|mesa}}. Também falta muito: o preço é {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Aumento}}", why: "Um adversário cauteloso que {{t:bet|aposta}} o {{t:pot|pote}} inteiro numa {{t:board|mesa}} com ás e rei raramente vai {{t:fold|desistir}}. Você arrisca muito com uma mão que pode perder mesmo acertando." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "Quando as implied odds são maiores?"
    options:
      - { text: "Quando você tem um {{t:draw|projeto}} para a melhor mão e o adversário tem uma mão forte e muitas {{t:chips|fichas}} atrás", correct: true, why: "Sim: assim, quando acerta, você ganha, e o adversário tem fichas para pagar e uma mão com que pagar você." }
      - { text: "Quando o adversário tem poucas {{t:chips|fichas}} ({{t:spr}} baixo)", why: "Ao contrário: com {{t:spr}} baixo, o adversário não tem mais o que pagar, então as implied odds são pequenas." }
      - { text: "Quando você tem um {{t:draw|projeto}} para um {{t:flush}} baixo", why: "Isso são implied odds reversas: às vezes você acerta e ainda perde, e num {{t:pot|pote}} grande." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "No início do turn há {{n:ex.pot}} no {{t:pot|pote}}, e o menor dos stacks de vocês é {{n:spr.stack.high}}. Quanto é o {{t:spr}}?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = stack ÷ {{t:pot|pote}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. O adversário tem vários {{t:pot|potes}} atrás, então as implied odds podem ser grandes." }
      - { text: "{{n:spr.low}}", why: "Seria isso com um stack de {{n:spr.stack.low}}. Aqui o stack é {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "Esse é o {{t:pot|pote}}. O {{t:spr}} é uma razão: o stack dividido pelo {{t:pot|pote}}." }
---
No turn resta só uma carta. A chance do seu {{t:draw|projeto}} cai mais ou menos pela metade, e o preço da próxima carta costuma subir. Por isso, no turn você calcula com mais precisão e faz uma nova pergunta: quanto posso ganhar depois, se acertar?

## Uma carta até o fim

| {{t:draw|Projeto}} | Outs | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:straight|Sequência}} aberta | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Flush}} + {{t:straight|sequência}} aberta | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Com a regra do 2 e do 4 do M2, você multiplica os outs por 2. Quando dois {{t:draw|projetos}} têm cartas em comum, você as conta uma vez só.

## Implied odds

Implied odds (odds implícitas) são as {{t:chips|fichas}} que você vai ganhar no river quando acertar. Exemplo: há {{n:ex.third.pot}} no {{t:pot|pote}}, o adversário {{t:bet|aposta}} {{n:io.flush.bet}}, e você tem um {{t:flush-draw|projeto de flush}}. Você precisa de {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} de equity e tem cerca de {{n:odds.flush.turn-river}}. O {{t:pot|pote}} sozinho não basta.

Em {{n:cards.unseen.turn}} rivers possíveis, você acerta {{n:outs.flush}} vezes e erra {{n:miss.flush.turn}} vezes. Para ficar no zero a zero, cada acerto precisa render o quanto custam os erros:

```formula
ganho necessário = valor a pagar × (cartas que não acertam ÷ outs)
```

Aqui: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. Há {{n:io.flush.pot-after-bet}} no {{t:pot|pote}}, então no river você precisa receber, em média, mais **{{n:io.flush.extra}}**.

## {{t:spr}}: quantas {{t:chips|fichas}} o adversário tem atrás

O {{t:spr}} (stack em relação ao {{t:pot|pote}}) é o {{t:effective-stack|stack efetivo}}, ou seja, o menor dos dois, dividido pelo {{t:pot|pote}} no início da {{t:street|rodada}}. Dá para calcular o {{t:spr}} em qualquer {{t:street|rodada}}; aqui você o calcula no turn. Com um {{t:pot|pote}} de {{n:ex.pot}} e um stack de {{n:spr.stack.high}}, o {{t:spr}} é {{n:spr.high}}, ou seja, o adversário ainda tem vários {{t:pot|potes}} atrás; com um stack de {{n:spr.stack.low}}, é só {{n:spr.low}}. As implied odds não podem ser maiores que as {{t:chips|fichas}} que o adversário ainda tem à sua frente. Com {{t:spr}} baixo, quase só as pot odds importam. Mais sobre o {{t:spr}} no módulo “Plano da mão” (M9), que planeja a mão de acordo com o {{t:spr}} do flop.

## Quando as implied odds são reais

- você tem um {{t:draw|projeto}} para a **melhor mão** (o {{t:flush}} mais alto possível, geralmente com o ás),
- o adversário tem uma **mão forte** com a qual vai pagar,
- o adversário tem **muitas {{t:chips|fichas}}** atrás ({{t:spr}} alto),
- o acerto **não chama atenção** (p. ex., um gutshot é menos visível que uma terceira copas na {{t:board|mesa}}).

Implied odds reversas jogam contra você: quando você tem um {{t:draw|projeto}} para um {{t:flush}} baixo ou para uma {{t:straight|sequência}} e um {{t:flush}} pode cair na {{t:board|mesa}}, às vezes você acerta e ainda perde, e num {{t:pot|pote}} grande.

:::note De onde vêm estas regras
O cálculo das implied odds é uma conta exata baseada no {{t:expected-value|valor esperado}}. As condições para as implied odds serem reais e as implied odds reversas são heurísticas de materiais de treinamento.
:::
