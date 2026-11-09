---
id: m5.l1
module: m5
order: 1
title: "Textura do flop"
sub: "Altura, naipes, conexão"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Qual destes flops é {{t:connected|conectado}}, ou seja, em qual deles uma {{t:straight|sequência}} já é possível agora?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Sim: o nove, o sete e o seis cabem em cinco valores consecutivos. Fazem {{t:straight|sequência}}, por exemplo, 85 ou T8." }
      - { text: "[[Ks 8d 3c]]", why: "Não: do três ao rei é longe demais. Nenhuma combinação de duas cartas faz {{t:straight|sequência}} aqui." }
      - { text: "[[Qd Qs 9h]]", why: "Não: o flop é {{t:paired|pareado}}. Com duas cartas na mão e um {{t:pair|par}} na {{t:board|mesa}}, uma {{t:straight|sequência}} é impossível, porque uma {{t:straight|sequência}} exige cinco valores diferentes." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "O flop é {{t:monotone|monocromático}}: as três cartas são do mesmo naipe. O que isso significa?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Um jogador com duas cartas desse naipe já tem {{t:flush}}", correct: true, why: "Sim: três cartas de copas na {{t:board|mesa}} e duas na mão são cinco cartas do mesmo naipe. Um jogador com uma carta de copas tem {{t:flush-draw|draw de flush}}." }
      - { text: "Ninguém pode ter {{t:flush}} ainda", why: "Não: o {{t:flush}} exige cinco cartas, e três já estão na {{t:board|mesa}}. Bastam duas na mão." }
      - { text: "O {{t:flush}} só é possível a partir do turn", why: "Não: isso vale para um flop {{t:two-tone|bicolor}}. Em um {{t:monotone|monocromático}}, o {{t:flush}} já pode estar formado agora." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Você tem [[Ac Kd]] e o flop é [[Ks 7d 2c]]. Por que, em um flop assim, um {{t:pair|par}} com bom kicker é mais seguro do que em um flop {{t:wet|molhado}}?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Porque o adversário não tem nenhum {{t:draw}}, então as próximas cartas raramente mudam quem está na frente", correct: true, why: "Sim: o flop é {{t:rainbow}} e uma {{t:straight|sequência}} não é possível. Um adversário que está atrás agora costuma ter poucos outs: algumas cartas para {{t:three-of-a-kind|trinca}} ou {{t:two-pair|dois pares}}, e sem {{t:pair|par}} ele precisa de duas cartas boas seguidas." }
      - { text: "Porque, em um flop {{t:dry|seco}}, o adversário sempre {{t:fold|desiste}}", why: "Não: um adversário com um sete, um dois ou um rei mais fraco pode {{t:call|pagar}}. Um flop {{t:dry|seco}} diz algo sobre {{t:draw|draws}}, não sobre se o adversário vai {{t:fold|desistir}}." }
      - { text: "Porque um {{t:pair|par}} de reis sempre vence até o river", why: "Não: o adversário pode já ter um set ou {{t:two-pair|dois pares}}. Um flop {{t:dry|seco}} só diminui o risco de alguém alcançar você." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Depois do flop, cada jogador já vê cinco das suas sete cartas. A forma como as três cartas na {{t:board|mesa}} se encaixam nas mãos dos jogadores é chamada de {{t:texture|textura}} do flop. Da {{t:texture|textura}} depende quem acerta com mais frequência e se vale a pena apostar. Antes de aprender o c-bet (uma {{t:bet|aposta}} no flop depois de um {{t:raise|aumento}} antes do flop), aprenda a ler o flop em quatro eixos.

## Altura

Olhamos para a carta mais alta. Um flop **alto** tem como carta mais alta um ás, um rei ou uma dama, por exemplo [[Ks 7d 2c]]. Um flop **médio** tem como carta mais alta um valete ou um dez, por exemplo [[Jh 8c 4d]]. Um flop **baixo** tem como carta mais alta um nove ou menos, por exemplo [[7s 6h 5d]].

## Naipes

Um flop **{{t:rainbow}}** tem três naipes diferentes: ninguém tem {{t:flush-draw|draw de flush}} ainda. Um flop **{{t:two-tone|bicolor}}** tem duas cartas do mesmo naipe, por exemplo [[Jh Th 8c]]: duas cartas do jogador nesse naipe dão um {{t:flush-draw|draw de flush}}. Um flop **{{t:monotone|monocromático}}** tem as três cartas do mesmo naipe, por exemplo [[Kh 8h 3h]]: o {{t:flush}} pode já estar formado.

## Valores

Um flop **{{t:paired|pareado}}** tem duas cartas do mesmo valor, por exemplo [[Qd Qs 6h]]. Nele, ninguém tem {{t:straight|sequência}} com duas cartas na mão, embora às vezes um {{t:straight-draw|draw de sequência}} seja possível (por exemplo, em Q-Q-9).

Um flop **{{t:connected|conectado}}** tem três valores diferentes dentro de cinco valores consecutivos, então uma {{t:straight|sequência}} já é possível agora: em [[9h 7d 6c]], fazem {{t:straight|sequência}}, por exemplo, 85 e T8. O ás também conta como um, então [[Ah 5d 3c]] também é {{t:connected|conectado}}.

Um flop **{{t:semi-connected|semiconectado}}** tem apenas duas das suas cartas dentro de cinco valores consecutivos. Ninguém tem {{t:straight|sequência}} ainda, mas alguém pode ter um {{t:straight-draw|draw de sequência}} (aberto ou gutshot): em [[Kh Qd 4c]], quem tem um é, por exemplo, JT. Flops assim são comuns, porque bastam duas cartas próximas uma da outra.

Um flop **{{t:disconnected|desconectado}}** tem cartas tão distantes que nenhuma combinação de duas cabe em cinco valores consecutivos, por exemplo [[Ks 8d 3c]]. Aqui ninguém tem nem mesmo um {{t:straight-draw|draw de sequência}}. Flops assim são raros.

## {{t:dry|Seco}} ou {{t:wet|molhado}}

Contamos pontos de {{t:wetness|umidade}}, ou seja, o quanto o flop favorece {{t:draw|draws}} e mãos fortes de flush e de {{t:straight|sequência}}:

- {{t:straight|sequência}} já possível de várias formas, ou seja, com pelo menos duas combinações diferentes de dois valores na mão (em [[9h 8d 7c]], fazem sequência JT, T6 e 65): {{n:tex.points.straight.made}} pts,
- {{t:straight|sequência}} possível de uma única forma (em [[Ah Kd Tc]], só QJ faz sequência; em [[Ah 4d 2c]], só 53): {{n:tex.points.straight.made-one}} pts,
- apenas {{t:straight-draw|draw de sequência}} (flop {{t:semi-connected|semiconectado}} ou {{t:paired|pareado}} com duas cartas próximas uma da outra): {{n:tex.points.straight.draw}} pts,
- duas cartas do mesmo naipe: {{n:tex.points.suits.two-tone}} pts; três cartas do mesmo naipe: {{n:tex.points.suits.monotone}} pts.

Um flop **{{t:dry|seco}}** tem menos de {{n:tex.threshold.medium}} pts, um **{{t:wet|molhado}}** tem pelo menos {{n:tex.threshold.wet}} pts, e um **intermediário** fica entre os dois.

| Flop | Naipes | {{t:straight|Sequência}} | Total | {{t:texture|Textura}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|seco}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|seco}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|seco}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|seco}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | intermediário |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | intermediário |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|molhado}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|molhado}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|molhado}} |

Uma {{t:straight|sequência}} formada pesa mais do que apenas um {{t:draw}}, porque muda o equilíbrio de forças já agora. Uma {{t:straight|sequência}} possível de várias formas pesa mais do que uma {{t:straight|sequência}} possível de uma só: em [[9h 8d 7c]], muitas mãos têm {{t:straight|sequência}} ou {{t:oesd}}, enquanto em [[Ah Kd Tc]] só QJ faz {{t:straight|sequência}} e ninguém tem {{t:draw}} aberto. Por isso, A-K-T em três naipes é intermediário, embora seja {{t:connected|conectado}}.

O {{t:two-tone|bicolor}} [[Kh 7h 2c]] é um flop {{t:dry|seco}} com um {{t:flush-draw|draw de flush}}: não há {{t:straight|sequência}} nem {{t:straight-draw|draw de sequência}}. Um flop {{t:monotone|monocromático}} é sempre {{t:wet|molhado}}: em [[Kh 8h 3h]], mais mãos têm {{t:flush}} ou {{t:flush-draw|draw de flush}} do que mãos com {{t:straight|sequência}} ou {{t:oesd}} em [[9h 8d 7c]].

Em um flop {{t:dry|seco}}, quem está na frente costuma continuar na frente até o river. Em um {{t:wet|molhado}}, as próximas cartas muitas vezes mudam o equilíbrio de forças, então a melhor mão no flop está menos segura.

:::note De onde vêm estas definições
Os conceitos de flop {{t:dry|seco}} e {{t:wet|molhado}} vêm da literatura de pôquer: os materiais de treinamento citam como {{t:dry|secos}}, por exemplo, K-7-2, A-9-4 e A-A-6 em três naipes, e como {{t:wet|molhados}} 9-8-7, Q-J-T e T-9-5-4. Os pontos e os limites exatos, como o flop médio começar no dez, são uma convenção adotada no aplicativo para que todo flop possa ser avaliado sem ambiguidade. As fontes não dão limites de pontuação e não definem como chamar os flops que não são nem {{t:dry|secos}} nem {{t:wet|molhados}}. Por essa convenção, cerca de {{n:tex.share.dry}} de todos os flops são {{t:dry|secos}}, cerca de {{n:tex.share.medium}} são intermediários e cerca de {{n:tex.share.wet}} são {{t:wet|molhados}}; isso é resultado das definições do aplicativo, não um número da literatura.
:::
