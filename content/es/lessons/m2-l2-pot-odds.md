---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "Cuándo compensa pagar"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.third.pot}}. Tu rival {{t:bet|apuesta}} {{n:ex.third.bet}}. ¿Cuánta equity necesitas para {{t:call|igualar}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "El {{t:pot|bote}} tras la {{t:bet|apuesta}} es de {{n:ex.third.pot-after-bet}}, tú pones {{n:ex.third.bet}}, en total {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Eso es lo que necesitas ante una {{t:bet|apuesta}} del tamaño del {{t:pot|bote}}. Aquí la {{t:bet|apuesta}} es 1/3 del {{t:pot|bote}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "Eso es {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Suma también tu {{t:call|pago}} al denominador." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Tienes un {{t:flush-draw|proyecto de color}}. En el {{t:pot|bote}} hay {{n:ex.pot}} y tu rival {{t:bet|apuesta}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Necesitas {{n:eq.bet-pot}}. El {{t:flush|color}} te da {{n:outs.flush}} outs, es decir, aprox. {{n:odds.flush.turn-river}}. Aunque sumes los {{n:pair.outs.per-rank}} ases que te dan {{t:pair|pareja}} de ases (en total {{n:outs.flush-ace}} outs, aprox. {{n:odds.flush-ace.turn-river}}), sigue siendo claramente menos que {{n:eq.bet-pot}}. Un {{t:call|pago}} así pierde a largo plazo." }
      - { text: "{{t:call|Igualo}}", why: "Tienta, porque tienes {{t:draw|proyecto}} al mejor {{t:flush|color}} y un as también puede ayudar, pero incluso aprox. {{n:odds.flush-ace.turn-river}} es menos que {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Subo}} all-in", why: "Entre jugadores avanzados a veces es una jugada válida, pero sin un buen motivo arriesgas todo tu stack (todas las {{t:chips|fichas}} que tienes delante) con una mano que todavía no tiene nada." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "La misma mano, pero tu rival {{t:bet|apuesta}} solo {{n:ex.bet.quarter}} en un {{t:pot|bote}} de {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Necesitas {{n:eq.bet-quarter}} y tienes aprox. {{n:odds.flush.turn-river}}, y con los ases aún más. Una {{t:bet|apuesta}} pequeña te da un buen precio." }
      - { text: "{{t:fold|Me retiro}}", why: "Es demasiado barato para {{t:fold|retirarte}}: {{n:odds.flush.turn-river}} es más que el {{n:eq.bet-quarter}} que necesitas, y con los ases aún más." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Tu rival {{t:bet|apuesta}} medio {{t:pot|bote}}. ¿Cuánta equity necesitas?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Bote}} {{n:ex.pot}}, {{t:bet|apuesta}} {{n:ex.bet.half}}. Pones {{n:ex.bet.half}} para un total de {{n:ex.half.total}}, es decir, {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Error frecuente: {{n:ex.wrong.half}} es la {{t:bet|apuesta}} dividida entre el {{t:pot|bote}} antes de la {{t:bet|apuesta}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Lo que pones lo divides entre todo el {{t:pot|bote}} tras tu {{t:call|pago}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "Eso es lo que necesitas ante una {{t:bet|apuesta}} del tamaño de todo el {{t:pot|bote}}." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "Tu rival {{t:bet|apuesta}} todo el {{t:pot|bote}}. ¿Qué porcentaje de equity necesitas para {{t:call|igualar}}? Escribe un número."
    answer: eq.bet-pot
    explanation: "{{t:pot|Bote}} {{n:ex.pot}}, {{t:bet|apuesta}} {{n:ex.bet.pot}}. Pones {{n:ex.bet.pot}} en un {{t:pot|bote}} que, tras tu {{t:call|pago}}, tiene {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Divides lo que pones entre todo el {{t:pot|bote}}: {{n:eq.bet-pot}}, es decir, un tercio."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Cuando tu rival {{t:bet|apuesta}} y tú tienes un {{t:draw|proyecto}}, la pregunta es: ¿el precio es bueno? Comparas dos números: **con qué frecuencia tienes que ganar** y **con qué frecuencia ganas de verdad**.

:::note Equity frente a probabilidad de ligar
La **equity** es tu parte del {{t:pot|bote}}: con qué frecuencia ganarás si la mano llega al showdown sin más {{t:bet|apuestas}}. La **probabilidad de ligar** de la lección sobre outs es solo la probabilidad de que salga un out. Con un {{t:draw|proyecto}} puro, que solo gana si liga, la probabilidad de ligar en las cartas que de verdad verás por ese precio es una aproximación de la equity. Ante una {{t:bet|apuesta}} en el flop, es la probabilidad con una carta, no hasta el river.
:::

## Con qué frecuencia tienes que ganar

```formula
equity necesaria = pago ÷ bote tras tu pago
bote tras tu pago = bote antes de la apuesta + apuesta + pago
```

Ejemplo: en el {{t:pot|bote}} hay {{n:ex.pot}} y tu rival {{t:bet|apuesta}} {{n:ex.bet.half}}. El {{t:pot|bote}} tiene ahora {{n:ex.half.pot-after-bet}}, tú pones {{n:ex.bet.half}}, así que el {{t:pot|bote}} tras tu {{t:call|pago}} es de {{n:ex.half.total}}. Necesitas {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Chuleta rápida

| {{t:bet|Apuesta}} del rival | Equity necesaria |
|---|---|
| Todo el {{t:pot|bote}} | {{n:eq.bet-pot}} |
| Medio {{t:pot|bote}} | {{n:eq.bet-half}} |
| Un cuarto del {{t:pot|bote}} | {{n:eq.bet-quarter}} |

:::note La decisión
Si tu equity es mayor que la necesaria, {{t:call|igualas}}. Si es menor, {{t:fold|te retiras}}. Esto se deduce del {{t:expected-value|valor esperado}}: el {{t:expected-value|EV}} de un {{t:call|pago}} = equity × {{t:pot|bote}} tras tu {{t:call|pago}} − {{t:call|pago}}, y es negativo exactamente cuando la equity es menor que la necesaria. Este único cálculo elimina la mayoría de los errores caros de principiante. Por ahora dejas de lado las {{t:implied-odds|probabilidades implícitas}}, es decir, las {{t:chips|fichas}} que esperas ganar más adelante en la mano si ligas tu jugada; volverán en módulos posteriores.
:::
