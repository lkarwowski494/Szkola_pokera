---
id: m9.l3
module: m9
order: 3
title: "Tamanho geométrico"
sub: "A mesma fração do pote até o all-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Há {{n:ex.pot}} no {{t:pot|pote}}. Você aposta o {{t:pot|pote}} inteiro ({{n:ex.bet.pot}}) e o rival {{t:call|paga}}. Quanto há agora no {{t:pot|pote}}? Digite um número."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} e um {{t:call}} multiplicam o {{t:pot|pote}} por três. Em geral: uma {{t:bet}} de f do {{t:pot|pote}} e um {{t:call}} multiplicam o {{t:pot|pote}} por (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Há {{n:ex.pot}} no {{t:pot|pote}}. No flop, no turn e no river, você aposta o {{t:pot|pote}} inteiro ({{n:ex.bet.pot}}, depois {{n:geo.ex.turn}}, depois {{n:geo.ex.river}}), e o rival {{t:call|paga}} todas as vezes. Quanto cada um de vocês coloca no total? Digite um número."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. O {{t:pot|pote}} cresce de {{n:ex.pot}} para {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} e {{n:geo.ex.river-after}}. Assim, três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} levam ao all-in com {{t:spr}} de {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Com qual {{t:spr}} três {{t:bet|apostas}} de meio {{t:pot|pote}} (flop, turn, river, todas pagas) colocam exatamente o stack inteiro?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Pote}} de {{n:ex.pot}}: {{t:bet|apostas}} de {{n:ex.bet.half}}, {{n:geo.half.turn}} e {{n:geo.half.river}} somam {{n:geo.half.total}}, ou seja, um stack de {{n:geo.half.stack}}. Pela fórmula: (1 + 2·{{n:ex.frac.half}}) elevado ao cubo = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Com {{t:spr}} de {{n:spr.zone.deep}}, é preciso apostar o {{t:pot|pote}} inteiro em cada {{t:street|rua}}. {{t:bet|Apostas}} de meio {{t:pot|pote}} colocariam então só {{n:geo.half.total}} de {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Com {{t:spr}} de {{n:spr.commit}}, três {{t:bet|apostas}} de meio {{t:pot|pote}} são demais: o stack acaba já no river, antes que você consiga {{t:bet|apostar}} meio {{t:pot|pote}} completo. O {{t:spr}} que serve é {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pote}} com apenas um aumento: no flop há {{n:bb.pot-after.vs-btn}}, e cada um de vocês tem {{n:spr.srp.stack}} atrás. Você aposta meio {{t:pot|pote}} no flop, no turn e no river, e o rival sempre {{t:call|paga}}. Quanto você coloca no total?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. A maior parte do stack fica fora do {{t:pot|pote}}: com {{t:spr}} de cerca de {{n:spr.srp}}, meio {{t:pot|pote}} é pouco para jogar pelo stack inteiro." }
      - { text: "{{n:spr.srp.stack}}, ou seja, o stack inteiro", why: "O {{t:pot|pote}} cresce só para {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} e assim por diante. Três {{t:bet|apostas}} de meio {{t:pot|pote}} colocam no total {{n:srp.half.total}}, longe do stack inteiro." }
      - { text: "{{n:srp.potbet.total}}", why: "Isso é o que três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} inteiro colocariam ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). {{t:bet|Apostas}} de meio {{t:pot|pote}} dão só {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pote}} com apenas um aumento, {{t:spr}} de cerca de {{n:spr.srp}}. Qual tamanho fixo de {{t:bet|aposta}} no flop, no turn e no river coloca o stack inteiro?"
    options:
      - { text: "Cerca de {{n:geo.srp.3}} do {{t:pot|pote}}, ou seja, mais que o {{t:pot}} inteiro", correct: true, why: "Sim: mesmo três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} colocam só {{n:srp.potbet.total}} de um stack de {{n:spr.srp.stack}}. O stack inteiro só entra com cerca de {{n:geo.srp.3}} do {{t:pot|pote}} em cada {{t:street|rua}}." }
      - { text: "Cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}", why: "Isso basta num {{t:pot|pote}} com 3-bet ({{t:spr}} de cerca de {{n:spr.3bet-ip}}). Num {{t:pot|pote}} com apenas um aumento, o {{t:spr}} é de cerca de {{n:spr.srp}}, então as {{t:bet|apostas}} precisam ser maiores que o {{t:pot}}." }
      - { text: "Cerca de {{n:cbet.size.small}} do {{t:pot|pote}}", why: "Três {{t:bet|apostas}} assim colocariam só uma pequena parte do stack. Com {{t:spr}} de cerca de {{n:spr.srp}}, é preciso cerca de {{n:geo.srp.3}} do {{t:pot|pote}} em cada {{t:street|rua}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pote}} com 3-bet, você tem {{t:position|posição}}, {{t:spr}} de cerca de {{n:spr.3bet-ip}}. Você tem uma mão muito forte e quer colocar o stack inteiro até o river com {{t:bet|apostas}} iguais. Quanto você aposta no flop?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Sim: (1 + 2f) elevado ao cubo = 1 + 2·{{n:spr.3bet-ip}} dá f ≈ {{n:geo.3bet-ip.3}}. {{t:bet|Apostas}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}} somam {{n:geo.3bet-ip.total}}, ou seja, o stack inteiro." }
      - { text: "{{n:cbet.size.small}} do {{t:pot|pote}} ({{n:g3b.third.flop}})", sizeError: true, why: "Ação certa, tamanho errado: três {{t:bet|apostas}} de 1/3 do {{t:pot|pote}} colocam só cerca de {{n:g3b.third.total}} de {{n:spr.3bet-ip.stack}}. Para o plano “stack inteiro até o river”, é preciso cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}." }
      - { text: "{{t:check|Passo}} e vou all-in no river", why: "No river, um all-in de {{n:spr.3bet-ip.stack}} num {{t:pot|pote}} de {{n:vs3bet.pot-after}} é uma {{t:bet}} muitas vezes maior que o {{t:pot}}: o rival só vai pagar com uma mão muito forte. {{t:bet|Apostas}} iguais em três {{t:street|ruas}} dão a ele a chance de colocar dinheiro aos poucos." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pote}} depois do seu 3-bet do {{t:big-blind|big blind}}, {{t:spr}} de cerca de {{n:spr.3bet-oop}}. Você quer colocar o stack inteiro até o river com {{t:bet|apostas}} iguais. Que fração do {{t:pot|pote}} em cada {{t:street|rua}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:geo.3bet-oop.3}} do {{t:pot|pote}}", correct: true, why: "Sim: com {{t:spr}} de cerca de {{n:spr.3bet-oop}}, (1 + 2f) elevado ao cubo = 1 + 2·{{n:spr.3bet-oop}}, então f ≈ {{n:geo.3bet-oop.3}}. Um {{t:spr}} menor que depois de um 3-bet {{t:in-position}}, então também um tamanho menor." }
      - { text: "Cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}", sizeError: true, why: "Perto, mas esse é o tamanho para {{t:spr}} de cerca de {{n:spr.3bet-ip}}. Com {{t:spr}} de cerca de {{n:spr.3bet-oop}}, basta cerca de {{n:geo.3bet-oop.3}} do {{t:pot|pote}}, e com {{t:bet|apostas}} maiores vai faltar stack para uma {{t:bet}} completa no river." }
      - { text: "Cerca de {{n:geo.4bet.3}} do {{t:pot|pote}}", sizeError: true, why: "Isso basta depois de um 4-bet ({{t:spr}} de cerca de {{n:spr.4bet}}). Com {{t:spr}} de cerca de {{n:spr.3bet-oop}}, três {{t:bet|apostas}} assim deixam uma boa parte do stack de fora." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pote}} depois de um 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Você quer colocar o stack inteiro em duas {{t:bet|apostas}}: no flop e no turn. Quanto você aposta no flop?"
    options:
      - { text: "Cerca de {{n:geo.4bet.2}} do {{t:pot|pote}}", correct: true, why: "Sim: para duas {{t:street|ruas}}, (1 + 2f) ao quadrado = 1 + 2·{{n:spr.4bet}}, então f ≈ {{n:geo.4bet.2}}. Depois da {{t:bet|aposta}} e do {{t:call}}, sobra exatamente o valor de uma {{t:bet}} igual no turn." }
      - { text: "Cerca de {{n:geo.4bet.3}} do {{t:pot|pote}}", sizeError: true, why: "Esse é o tamanho para três {{t:street|ruas}}. Com duas {{t:bet|apostas}} de {{n:geo.4bet.3}} do {{t:pot|pote}}, parte do stack fica para o river." }
      - { text: "All-in de imediato ({{n:spr.4bet.stack}})", why: "Esse é um plano para uma {{t:street|rua}}, não para duas. Uma {{t:bet|aposta}} de cerca de {{n:spr.4bet}} {{t:pot|potes}} de imediato dá ao rival só uma decisão: {{t:call|pagar}} tudo ou {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "O que significa tamanho geométrico?"
    options:
      - { text: "A mesma fração do {{t:pot|pote}} em cada {{t:street|rua}}, de modo que a última {{t:bet}} seja all-in", correct: true, why: "Sim: uma {{t:bet}} de f e um {{t:call}} multiplicam o {{t:pot|pote}} por (1 + 2f) em cada {{t:street|rua}}. Você escolhe o tamanho para que, depois da última {{t:bet|aposta}}, o stack inteiro esteja no {{t:pot|pote}}." }
      - { text: "Sempre uma {{t:bet}} do tamanho do {{t:pot|pote}} inteiro", why: "O {{t:pot}} inteiro só é geométrico com um único {{t:spr}} (por ex., {{n:spr.zone.deep}} para três {{t:street|ruas}}). Com {{t:spr}} de cerca de {{n:spr.3bet-ip}}, basta cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}." }
      - { text: "{{t:bet|Apostas}} cada vez maiores em porcentagem: pequena no flop, grande no river", why: "Os valores crescem porque o {{t:pot}} cresce, mas a fração do {{t:pot|pote}} é a mesma em cada {{t:street|rua}}. Num {{t:pot|pote}} com 3-bet, são {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}}, cada vez cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}." }
---
Antes de {{t:bet|apostar}} uma {{t:bet}} no flop, vale saber quanto dinheiro dá para colocar até o river. Uma {{t:bet|aposta}} e um {{t:call}} não somam um valor fixo ao {{t:pot|pote}}: eles o multiplicam.

## Como o {{t:pot}} cresce

Uma {{t:bet|aposta}} de f do {{t:pot|pote}} e um {{t:call}} multiplicam o {{t:pot|pote}} por (1 + 2f). Com uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} inteiro, o {{t:pot}} triplica:

| {{t:street|Rua}} | {{t:pot|Pote}} antes da {{t:bet|aposta}} | {{t:bet|Aposta}} ({{t:pot}} inteiro) | {{t:pot|Pote}} depois do {{t:call}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Cada jogador colocou {{n:geo.ex.total}}, ou seja, {{n:spr.zone.deep}} {{t:pot|potes}}. Assim, três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} levam ao all-in exatamente com {{t:spr}} de {{n:spr.zone.deep}}. Daí vem o limite da zona mais alta de {{t:spr}} da primeira lição.

## A fórmula

Tamanho geométrico é a mesma fração f do {{t:pot|pote}} em cada {{t:street|rua}}, escolhida de modo que a última {{t:bet}} seja all-in. Para n {{t:street|ruas}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Exemplo: com {{t:spr}} de {{n:geo.half.spr}}, três {{t:bet|apostas}} de meio {{t:pot|pote}} colocam o stack inteiro: {{n:ex.bet.half}}, {{n:geo.half.turn}} e {{n:geo.half.river}}, no total {{n:geo.half.total}} com um {{t:pot|pote}} de {{n:ex.pot}}.

## Tamanhos para {{t:pot|potes}} típicos

| {{t:pot|Pote}} | {{t:spr}} | Três {{t:street|ruas}} | Duas {{t:street|ruas}} |
|---|---|---|---|
| {{t:open|Abertura}} e {{t:call}} | {{n:spr.srp}} | {{n:geo.srp.3}} do {{t:pot|pote}} | – |
| 3-bet {{t:in-position}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} do {{t:pot|pote}} | – |
| 3-bet do {{t:big-blind|big blind}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} do {{t:pot|pote}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} do {{t:pot|pote}} | {{n:geo.4bet.2}} do {{t:pot|pote}} |

Num {{t:pot|pote}} com 3-bet {{t:in-position}}, isso significa {{t:bet|apostas}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}}, no total {{n:geo.3bet-ip.total}}, ou seja, o stack inteiro.

## O {{t:pot|pote}} com apenas um aumento é profundo

Com {{t:spr}} de cerca de {{n:spr.srp}}, três {{t:bet|apostas}} de meio {{t:pot|pote}} colocam só {{n:srp.half.total}}, e três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} colocam {{n:srp.potbet.total}} de um stack de {{n:spr.srp.stack}}. O stack inteiro só entra com {{t:bet|apostas}} maiores que o {{t:pot}}. Por isso, num {{t:pot|pote}} assim, jogar pelo stack inteiro acontece principalmente com mãos muito fortes.

:::note Quando isso é útil
O tamanho geométrico é útil quando você quer colocar o stack inteiro até o river, ou seja, com uma mão muito forte. Nem toda mão quer jogar pelo stack inteiro: quantas ruas de {{t:value|valor}} uma mão aguenta é o tema da próxima lição. A fórmula é pura matemática. Os módulos anteriores trazem tamanhos ajustados à {{t:texture|textura}} do flop; o tamanho geométrico é um ponto de referência para um plano com o stack inteiro.
:::
