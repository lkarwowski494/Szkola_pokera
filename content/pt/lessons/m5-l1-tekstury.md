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
    prompt: "Qual destes flops é {{t:connected|conectado}}, ou seja, em qual deles uma {{t:straight|sequência}} já é possível?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Sim: o nove, o sete e o seis cabem em cinco valores consecutivos. Formam uma {{t:straight|sequência}}, p. ex., 85 ou T8." }
      - { text: "[[Ks 8d 3c]]", why: "Não: do três ao rei a distância é grande demais. Nenhuma combinação de duas cartas forma aqui uma {{t:straight|sequência}}." }
      - { text: "[[Qd Qs 9h]]", why: "Não: o flop é {{t:paired|emparelhado}}. Com duas cartas na mão e um {{t:pair|par}} na {{t:board|mesa}}, uma {{t:straight|sequência}} é impossível, porque uma {{t:straight|sequência}} precisa de cinco valores diferentes." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "O flop é {{t:monotone|monocromático}}: as três cartas são do mesmo naipe. O que significa isto?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Um jogador com duas cartas desse naipe já tem {{t:flush|flush}}", correct: true, why: "Sim: três copas na {{t:board|mesa}} e duas na mão são cinco cartas do mesmo naipe. Um jogador com uma carta de copas tem um {{t:flush-draw|flush draw}}." }
      - { text: "Ninguém pode ter ainda {{t:flush|flush}}", why: "Não: o {{t:flush|flush}} precisa de cinco cartas, e três já estão na {{t:board|mesa}}. Bastam duas na mão." }
      - { text: "O {{t:flush|flush}} só é possível a partir do turn", why: "Não: isso acontece num flop {{t:two-tone|bicolor}}. Num flop {{t:monotone|monocromático}}, o {{t:flush|flush}} pode já estar feito." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Tem [[Ac Kd]] e o flop é [[Ks 7d 2c]]. Porque é que, num flop assim, um {{t:pair|par}} com um bom kicker é mais seguro do que num flop {{t:wet|molhado}}?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Porque o adversário não tem nenhum {{t:draw|draw}}, por isso as cartas seguintes raramente mudam quem vai à frente", correct: true, why: "Sim: o flop é {{t:rainbow|rainbow}} e uma {{t:straight|sequência}} não é possível. Um adversário que agora está a perder tem normalmente poucos outs: algumas cartas para {{t:three-of-a-kind|trio}} ou {{t:two-pair|dois pares}}, e sem {{t:pair|par}} precisa de duas boas cartas seguidas." }
      - { text: "Porque num flop {{t:dry|seco}} o adversário {{t:fold|desiste}} sempre", why: "Não: um adversário com um sete, um dois ou um rei mais fraco pode {{t:call|pagar}}. Um flop {{t:dry|seco}} diz algo sobre os {{t:draw|draws}}, não sobre se o adversário vai {{t:fold|desistir}}." }
      - { text: "Porque um {{t:pair|par}} de reis ganha sempre até ao river", why: "Não: o adversário pode já ter um set ou {{t:two-pair|dois pares}}. Um flop {{t:dry|seco}} apenas reduz o risco de alguém passar à frente." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Depois do flop, cada jogador já vê cinco das suas sete cartas. A forma como as três cartas na {{t:board|mesa}} se encaixam nas mãos dos jogadores chama-se {{t:texture|textura}} do flop. Da {{t:texture|textura}} depende quem acertou mais vezes e se vale a pena apostar. Antes de aprender o c-bet (uma {{t:bet|aposta}} no flop após um {{t:raise|aumento}} antes do flop), aprenda a ler o flop em quatro eixos.

## Altura

Olhamos para a carta mais alta. Um flop **alto** tem como carta mais alta um ás, um rei ou uma dama, p. ex. [[Ks 7d 2c]]. Um flop **médio** tem como carta mais alta um valete ou um dez, p. ex. [[Jh 8c 4d]]. Um flop **baixo** tem como carta mais alta um nove ou inferior, p. ex. [[7s 6h 5d]].

## Naipes

Um flop **{{t:rainbow|rainbow}}** tem três naipes diferentes: ninguém tem ainda um {{t:flush-draw|flush draw}}. Um flop **{{t:two-tone|bicolor}}** tem duas cartas do mesmo naipe, p. ex. [[Jh Th 8c]]: duas cartas do jogador nesse naipe dão um {{t:flush-draw|flush draw}}. Um flop **{{t:monotone|monocromático}}** tem as três cartas do mesmo naipe, p. ex. [[Kh 8h 3h]]: o {{t:flush|flush}} pode já estar feito.

## Valores

Um flop **{{t:paired|emparelhado}}** tem duas cartas do mesmo valor, p. ex. [[Qd Qs 6h]]. Ninguém tem nele uma {{t:straight|sequência}} com duas cartas na mão, embora um {{t:straight-draw|draw de sequência}} seja por vezes possível (p. ex. em Q-Q-9).

Um flop **{{t:connected|conectado}}** tem três valores diferentes dentro de cinco consecutivos, por isso uma {{t:straight|sequência}} já é possível: em [[9h 7d 6c]], p. ex., 85 e T8 formam uma {{t:straight|sequência}}. O ás também conta como um, por isso [[Ah 5d 3c]] também é {{t:connected|conectado}}.

Um flop **{{t:semi-connected|semiconectado}}** tem apenas duas das suas cartas dentro de cinco valores consecutivos. Ainda ninguém tem {{t:straight|sequência}}, mas alguém pode ter um {{t:straight-draw|draw de sequência}} (aberto ou gutshot): em [[Kh Qd 4c]], tem-no p. ex. JT. Há muitos flops assim, porque bastam duas cartas próximas uma da outra.

Um flop **{{t:disconnected|desconectado}}** tem cartas tão afastadas que nenhuma combinação de duas cabe em cinco valores consecutivos, p. ex. [[Ks 8d 3c]]. Aqui ninguém tem sequer um {{t:straight-draw|draw de sequência}}. Há poucos flops assim.

## {{t:dry|Seco}} ou {{t:wet|molhado}}

Contamos pontos de {{t:wetness|humidade}}, ou seja, o quanto o flop favorece os {{t:draw|draws}} e as mãos fortes de {{t:flush|flush}} e de {{t:straight|sequência}}:

- uma {{t:straight|sequência}} já possível de várias formas, ou seja, com pelo menos dois conjuntos diferentes de dois valores na mão (em [[9h 8d 7c]] formam-na JT, T6 e 65): {{n:tex.points.straight.made}} pts,
- uma {{t:straight|sequência}} possível de uma só forma (em [[Ah Kd Tc]] só QJ a forma, em [[Ah 4d 2c]] só 53): {{n:tex.points.straight.made-one}} pts,
- apenas um {{t:straight-draw|draw de sequência}} (flop {{t:semi-connected|semiconectado}} ou {{t:paired|emparelhado}} com duas cartas próximas uma da outra): {{n:tex.points.straight.draw}} pts,
- duas cartas do mesmo naipe: {{n:tex.points.suits.two-tone}} pts; três cartas do mesmo naipe: {{n:tex.points.suits.monotone}} pts.

Um flop **{{t:dry|seco}}** tem menos de {{n:tex.threshold.medium}} pts, um **{{t:wet|molhado}}** pelo menos {{n:tex.threshold.wet}} pts, e um **intermédio** fica entre os dois.

| Flop | Naipes | {{t:straight|Sequência}} | Total | {{t:texture|Textura}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|seco}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|seco}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|seco}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|seco}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | intermédio |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | intermédio |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|molhado}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|molhado}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|molhado}} |

Uma {{t:straight|sequência}} feita pesa mais do que um {{t:draw|draw}} sozinho, porque altera já o equilíbrio de forças. Uma {{t:straight|sequência}} possível de várias formas pesa mais do que uma {{t:straight|sequência}} possível de uma só forma: em [[9h 8d 7c]] muitas mãos têm {{t:straight|sequência}} ou {{t:oesd|OESD}}, enquanto em [[Ah Kd Tc]] só QJ forma uma {{t:straight|sequência}} e ninguém tem um {{t:draw|draw}} aberto. Por isso, A-K-T em três naipes é intermédio, embora seja {{t:connected|conectado}}.

O [[Kh 7h 2c]], {{t:two-tone|bicolor}}, é um flop {{t:dry|seco}} com um {{t:flush-draw|flush draw}}: não há {{t:straight|sequência}} nem {{t:straight-draw|draw de sequência}}. Um flop {{t:monotone|monocromático}} é sempre {{t:wet|molhado}}: em [[Kh 8h 3h]], mais mãos têm {{t:flush|flush}} ou {{t:flush-draw|flush draw}} do que mãos com {{t:straight|sequência}} ou {{t:oesd|OESD}} em [[9h 8d 7c]].

Num flop {{t:dry|seco}}, quem vai à frente costuma manter-se à frente até ao river. Num flop {{t:wet|molhado}}, as cartas seguintes mudam frequentemente o equilíbrio de forças, por isso a melhor mão no flop está menos segura.

:::note De onde vêm estas definições
Os conceitos de {{t:dry|seco}} e {{t:wet|molhado}} vêm da literatura de póquer: os materiais de formação apresentam como {{t:dry|secos}}, p. ex., K-7-2, A-9-4 e A-A-6 em três naipes, e como {{t:wet|molhados}} 9-8-7, Q-J-T e T-9-5-4. Os pontos e os limites exatos, p. ex. que o flop médio começa no dez, são uma convenção adotada na aplicação para que cada flop possa ser avaliado de forma inequívoca. As fontes não indicam limites de pontos nem decidem como chamar os flops que não são nem {{t:dry|secos}} nem {{t:wet|molhados}}. Segundo esta convenção, cerca de {{n:tex.share.dry}} de todos os flops são {{t:dry|secos}}, cerca de {{n:tex.share.medium}} são intermédios e cerca de {{n:tex.share.wet}} são {{t:wet|molhados}}; isto é um resultado das definições da aplicação, não um número da literatura.
:::
