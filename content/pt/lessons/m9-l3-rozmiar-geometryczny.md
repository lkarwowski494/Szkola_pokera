---
id: m9.l3
module: m9
order: 3
title: "Tamanho geométrico"
sub: "A mesma fração do pote até ao all-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "No {{t:pot|pote}} há {{n:ex.pot}}. Aposta o {{t:pot|pote}} inteiro ({{n:ex.bet.pot}}) e o adversário {{t:call|paga}}. Quanto há agora no {{t:pot|pote}}? Introduza um número."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} e um {{t:call|pagamento}} multiplicam o {{t:pot|pote}} por três. Em geral: uma {{t:bet|aposta}} de f do {{t:pot|pote}} e um {{t:call|pagamento}} multiplicam o {{t:pot|pote}} por (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "No {{t:pot|pote}} há {{n:ex.pot}}. No flop, no turn e no river aposta o {{t:pot|pote}} inteiro ({{n:ex.bet.pot}}, depois {{n:geo.ex.turn}}, depois {{n:geo.ex.river}}), e o adversário {{t:call|paga}} sempre. Quanto coloca cada um no total? Introduza um número."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. O {{t:pot|pote}} cresce de {{n:ex.pot}} para {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} e {{n:geo.ex.river-after}}. Três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} levam, portanto, ao all-in com um {{t:spr}} de {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Com que {{t:spr}} três {{t:bet|apostas}} de meio {{t:pot|pote}} (flop, turn, river, todas pagas) colocam exatamente todo o stack?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Pote}} de {{n:ex.pot}}: {{t:bet|apostas}} de {{n:ex.bet.half}}, {{n:geo.half.turn}} e {{n:geo.half.river}} somam {{n:geo.half.total}}, ou seja, um stack de {{n:geo.half.stack}}. Pela fórmula: (1 + 2·{{n:ex.frac.half}}) elevado ao cubo = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Com um {{t:spr}} de {{n:spr.zone.deep}} é preciso apostar o {{t:pot|pote}} inteiro em cada {{t:street|ronda}}. {{t:bet|Apostas}} de meio {{t:pot|pote}} colocariam então apenas {{n:geo.half.total}} de {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Com um {{t:spr}} de {{n:spr.commit}}, três {{t:bet|apostas}} de meio {{t:pot|pote}} são demasiado: o stack acaba logo no river, antes de {{t:bet|apostar}} um meio {{t:pot|pote}} completo. Este plano corresponde a um {{t:spr}} de {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pote}} com uma só subida: no flop há {{n:bb.pot-after.vs-btn}}, e cada um tem {{n:spr.srp.stack}} atrás. Aposta meio {{t:pot|pote}} no flop, no turn e no river, e o adversário {{t:call|paga}} sempre. Quanto coloca no total?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. A maior parte do stack fica atrás do {{t:pot|pote}}: com um {{t:spr}} de cerca de {{n:spr.srp}}, meio {{t:pot|pote}} é pouco para jogar por todo o stack." }
      - { text: "{{n:spr.srp.stack}}, ou seja, todo o stack", why: "O {{t:pot|pote}} cresce apenas para {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} e assim por diante. Três {{t:bet|apostas}} de meio {{t:pot|pote}} colocam no total {{n:srp.half.total}}, longe de todo o stack." }
      - { text: "{{n:srp.potbet.total}}", why: "É o que colocariam três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} inteiro ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). {{t:bet|Apostas}} de meio {{t:pot|pote}} dão apenas {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pote}} com uma só subida, {{t:spr}} de cerca de {{n:spr.srp}}. Que tamanho constante de {{t:bet|aposta}} no flop, no turn e no river coloca todo o stack?"
    options:
      - { text: "Cerca de {{n:geo.srp.3}} do {{t:pot|pote}}, ou seja, mais do que o {{t:pot|pote}} inteiro", correct: true, why: "Sim: mesmo três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} colocam apenas {{n:srp.potbet.total}} de um stack de {{n:spr.srp.stack}}. Todo o stack só entra com cerca de {{n:geo.srp.3}} do {{t:pot|pote}} em cada {{t:street|ronda}}." }
      - { text: "Cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}", why: "Isso basta num {{t:pot|pote}} de 3-bet ({{t:spr}} de cerca de {{n:spr.3bet-ip}}). Num {{t:pot|pote}} com uma só subida, o {{t:spr}} é de cerca de {{n:spr.srp}}, por isso as {{t:bet|apostas}} têm de ser maiores do que o {{t:pot|pote}}." }
      - { text: "Cerca de {{n:cbet.size.small}} do {{t:pot|pote}}", why: "Três {{t:bet|apostas}} destas colocam apenas uma pequena parte do stack. Com um {{t:spr}} de cerca de {{n:spr.srp}} é preciso cerca de {{n:geo.srp.3}} do {{t:pot|pote}} em cada {{t:street|ronda}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pote}} de 3-bet, tem {{t:position|posição}}, {{t:spr}} de cerca de {{n:spr.3bet-ip}}. Tem uma mão muito forte e quer colocar todo o stack até ao river com {{t:bet|apostas}} iguais. Quanto aposta no flop?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Sim: (1 + 2f) elevado ao cubo = 1 + 2·{{n:spr.3bet-ip}} dá f ≈ {{n:geo.3bet-ip.3}}. {{t:bet|Apostas}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}} somam {{n:geo.3bet-ip.total}}, ou seja, todo o stack." }
      - { text: "{{n:cbet.size.small}} do {{t:pot|pote}} ({{n:g3b.third.flop}})", sizeError: true, why: "Ação certa, tamanho errado: três {{t:bet|apostas}} de 1/3 do {{t:pot|pote}} colocam apenas cerca de {{n:g3b.third.total}} de {{n:spr.3bet-ip.stack}}. O plano «todo o stack até ao river» exige cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}." }
      - { text: "{{t:check|Passo}} e, no river, vou all-in", why: "No river, um all-in de {{n:spr.3bet-ip.stack}} num {{t:pot|pote}} de {{n:vs3bet.pot-after}} é uma {{t:bet|aposta}} muitas vezes maior do que o {{t:pot|pote}}: o adversário só a pagará com uma mão muito forte. {{t:bet|Apostas}} iguais em três {{t:street|rondas}} dão-lhe a oportunidade de colocar dinheiro aos poucos." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pote}} após o seu 3-bet a partir do {{t:big-blind|big blind}}, {{t:spr}} de cerca de {{n:spr.3bet-oop}}. Quer colocar todo o stack até ao river com {{t:bet|apostas}} iguais. Que fração do {{t:pot|pote}} em cada {{t:street|ronda}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:geo.3bet-oop.3}} do {{t:pot|pote}}", correct: true, why: "Sim: com um {{t:spr}} de cerca de {{n:spr.3bet-oop}}, (1 + 2f) elevado ao cubo = 1 + 2·{{n:spr.3bet-oop}}, por isso f ≈ {{n:geo.3bet-oop.3}}. Um {{t:spr}} mais baixo do que após um 3-bet {{t:in-position|em posição}}, logo também um tamanho menor." }
      - { text: "Cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}", sizeError: true, why: "Perto, mas esse é o tamanho para um {{t:spr}} de cerca de {{n:spr.3bet-ip}}. Com um {{t:spr}} de cerca de {{n:spr.3bet-oop}} basta cerca de {{n:geo.3bet-oop.3}} do {{t:pot|pote}}, e com {{t:bet|apostas}} maiores faltará stack no river para uma {{t:bet|aposta}} completa." }
      - { text: "Cerca de {{n:geo.4bet.3}} do {{t:pot|pote}}", sizeError: true, why: "Isso basta após um 4-bet ({{t:spr}} de cerca de {{n:spr.4bet}}). Com um {{t:spr}} de cerca de {{n:spr.3bet-oop}}, três {{t:bet|apostas}} destas deixam de fora uma parte considerável do stack." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pote}} após um 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Quer colocar todo o stack em duas {{t:bet|apostas}}: no flop e no turn. Quanto aposta no flop?"
    options:
      - { text: "Cerca de {{n:geo.4bet.2}} do {{t:pot|pote}}", correct: true, why: "Sim: para duas {{t:street|rondas}}, (1 + 2f) ao quadrado = 1 + 2·{{n:spr.4bet}}, por isso f ≈ {{n:geo.4bet.2}}. Após a {{t:bet|aposta}} e o {{t:call|pagamento}}, resta exatamente o valor de uma {{t:bet|aposta}} do mesmo tamanho no turn." }
      - { text: "Cerca de {{n:geo.4bet.3}} do {{t:pot|pote}}", sizeError: true, why: "Esse é o tamanho para três {{t:street|rondas}}. Com duas {{t:bet|apostas}} de {{n:geo.4bet.3}} do {{t:pot|pote}}, parte do stack fica para o river." }
      - { text: "All-in de imediato ({{n:spr.4bet.stack}})", why: "É um plano para uma {{t:street|ronda}}, não para duas. Uma {{t:bet|aposta}} de cerca de {{n:spr.4bet}} {{t:pot|potes}} de imediato dá ao adversário apenas uma decisão: {{t:call|pagar}} tudo ou {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "O que significa o tamanho geométrico?"
    options:
      - { text: "A mesma fração do {{t:pot|pote}} em cada {{t:street|ronda}}, de modo que a última {{t:bet|aposta}} seja all-in", correct: true, why: "Sim: uma {{t:bet|aposta}} de f e um {{t:call|pagamento}} multiplicam o {{t:pot|pote}} por (1 + 2f) em cada {{t:street|ronda}}. O tamanho escolhe-se de modo que, após a última {{t:bet|aposta}}, todo o stack esteja no {{t:pot|pote}}." }
      - { text: "Sempre uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} inteiro", why: "O {{t:pot|pote}} inteiro só é geométrico com um único {{t:spr}} (p. ex., {{n:spr.zone.deep}} para três {{t:street|rondas}}). Com um {{t:spr}} de cerca de {{n:spr.3bet-ip}} basta cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}." }
      - { text: "{{t:bet|Apostas}} cada vez maiores em percentagem: pequena no flop, grande no river", why: "Os montantes crescem porque o {{t:pot|pote}} cresce, mas a fração do {{t:pot|pote}} é a mesma em cada {{t:street|ronda}}. Num {{t:pot|pote}} de 3-bet são {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}}, sempre cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}." }
---
Antes de {{t:bet|fazer}} uma {{t:bet|aposta}} no flop, convém saber quanto dinheiro é possível colocar até ao river. Uma {{t:bet|aposta}} e um {{t:call|pagamento}} não acrescentam ao {{t:pot|pote}} um montante fixo: multiplicam-no.

## Como cresce o {{t:pot|pote}}

Uma {{t:bet|aposta}} de f do {{t:pot|pote}} e um {{t:call|pagamento}} multiplicam o {{t:pot|pote}} por (1 + 2f). Com uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} inteiro, o {{t:pot|pote}} triplica:

| {{t:street|Ronda}} | {{t:pot|Pote}} antes da {{t:bet|aposta}} | {{t:bet|Aposta}} ({{t:pot|pote}} inteiro) | {{t:pot|Pote}} após o {{t:call|pagamento}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Cada jogador colocou {{n:geo.ex.total}}, ou seja, {{n:spr.zone.deep}} {{t:pot|potes}}. Três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} levam, portanto, ao all-in exatamente com um {{t:spr}} de {{n:spr.zone.deep}}. Daí vem o limiar da zona mais alta de {{t:spr}} da primeira lição.

## A fórmula

O tamanho geométrico é a mesma fração f do {{t:pot|pote}} em cada {{t:street|ronda}}, escolhida de modo que a última {{t:bet|aposta}} seja all-in. Para n {{t:street|rondas}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Exemplo: com um {{t:spr}} de {{n:geo.half.spr}}, três {{t:bet|apostas}} de meio {{t:pot|pote}} colocam todo o stack: {{n:ex.bet.half}}, {{n:geo.half.turn}} e {{n:geo.half.river}}, no total {{n:geo.half.total}} com um {{t:pot|pote}} de {{n:ex.pot}}.

## Tamanhos para {{t:pot|potes}} típicos

| {{t:pot|Pote}} | {{t:spr}} | Três {{t:street|rondas}} | Duas {{t:street|rondas}} |
|---|---|---|---|
| {{t:open|Abertura}} e {{t:call|pagamento}} | {{n:spr.srp}} | {{n:geo.srp.3}} do {{t:pot|pote}} | – |
| 3-bet {{t:in-position|em posição}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} do {{t:pot|pote}} | – |
| 3-bet a partir do {{t:big-blind|big blind}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} do {{t:pot|pote}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} do {{t:pot|pote}} | {{n:geo.4bet.2}} do {{t:pot|pote}} |

Num {{t:pot|pote}} de 3-bet {{t:in-position|em posição}}, isto significa {{t:bet|apostas}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}}, no total {{n:geo.3bet-ip.total}}, ou seja, todo o stack.

## O {{t:pot|pote}} com uma só subida é profundo

Com um {{t:spr}} de cerca de {{n:spr.srp}}, três {{t:bet|apostas}} de meio {{t:pot|pote}} colocam apenas {{n:srp.half.total}}, e três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} colocam {{n:srp.potbet.total}} de um stack de {{n:spr.srp.stack}}. Todo o stack só entra com {{t:bet|apostas}} maiores do que o {{t:pot|pote}}. Por isso, num {{t:pot|pote}} destes, jogar por todo o stack acontece sobretudo com mãos muito fortes.

:::note Quando é útil
O tamanho geométrico é útil quando quer colocar todo o stack até ao river, ou seja, com uma mão muito forte. Nem todas as mãos querem jogar por todo o stack: quantas {{t:value|rondas de valor}} uma mão aguenta é o tema da próxima lição. A fórmula é pura matemática. Os módulos anteriores indicam tamanhos ajustados à {{t:texture|textura}} do flop; o tamanho geométrico é um ponto de referência para um plano de todo o stack.
:::
