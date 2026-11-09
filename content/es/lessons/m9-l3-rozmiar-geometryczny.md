---
id: m9.l3
module: m9
order: 3
title: "Tamaño geométrico"
sub: "La misma fracción del bote hasta el all-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.pot}}. Apuestas todo el {{t:pot|bote}} ({{n:ex.bet.pot}}) y el rival {{t:call|iguala}}. ¿Cuánto hay ahora en el {{t:pot|bote}}? Escribe un número."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Una {{t:bet|apuesta}} del tamaño del {{t:pot|bote}}, si te la {{t:call|igualan}}, multiplica el {{t:pot|bote}} por tres. En general: una {{t:bet|apuesta}} de f del {{t:pot|bote}}, si te la {{t:call|igualan}}, multiplica el {{t:pot|bote}} por (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.pot}}. En el flop, el turn y el river apuestas todo el {{t:pot|bote}} ({{n:ex.bet.pot}}, luego {{n:geo.ex.turn}}, luego {{n:geo.ex.river}}) y el rival {{t:call|iguala}} cada vez. ¿Cuánto mete en total cada uno de vosotros? Escribe un número."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. El {{t:pot|bote}} crece de {{n:ex.pot}} a {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} y {{n:geo.ex.river-after}}. Así que tres {{t:bet|apuestas}} del tamaño del {{t:pot|bote}} llevan al all-in con un {{t:spr}} de {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "¿Con qué {{t:spr}} tres {{t:bet|apuestas}} de medio {{t:pot|bote}} (flop, turn, river, todas igualadas) meten exactamente todo el stack?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Bote}} de {{n:ex.pot}}: las {{t:bet|apuestas}} de {{n:ex.bet.half}}, {{n:geo.half.turn}} y {{n:geo.half.river}} suman {{n:geo.half.total}}, es decir, un stack de {{n:geo.half.stack}}. Por la fórmula: (1 + 2·{{n:ex.frac.half}}) al cubo = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Con un {{t:spr}} de {{n:spr.zone.deep}} hay que apostar todo el {{t:pot|bote}} en cada {{t:street|calle}}. Las {{t:bet|apuestas}} de medio {{t:pot|bote}} meterían entonces solo {{n:geo.half.total}} de {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Con un {{t:spr}} de {{n:spr.commit}}, tres {{t:bet|apuestas}} de medio {{t:pot|bote}} son demasiado: el stack se acabará ya en el river, antes de que {{t:bet|apuestes}} medio {{t:pot|bote}} completo. Ese plan corresponde a un {{t:spr}} de {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Bote}} con una sola subida: en el flop hay {{n:bb.pot-after.vs-btn}} y cada uno tiene {{n:spr.srp.stack}} detrás. Apuestas medio {{t:pot|bote}} en el flop, el turn y el river, y el rival siempre {{t:call|iguala}}. ¿Cuánto metes en total?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. La mayor parte del stack se queda fuera del {{t:pot|bote}}: con un {{t:spr}} de aprox. {{n:spr.srp}}, medio {{t:pot|bote}} es demasiado poco para jugar por todo el stack." }
      - { text: "{{n:spr.srp.stack}}, es decir, todo el stack", why: "El {{t:pot|bote}} solo crece hasta {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} y así sucesivamente. Tres {{t:bet|apuestas}} de medio {{t:pot|bote}} meten en total {{n:srp.half.total}}, lejos de todo el stack." }
      - { text: "{{n:srp.potbet.total}}", why: "Eso meterían tres {{t:bet|apuestas}} del tamaño de todo el {{t:pot|bote}} ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). Las {{t:bet|apuestas}} de medio {{t:pot|bote}} dan solo {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Bote}} con una sola subida, {{t:spr}} de aprox. {{n:spr.srp}}. ¿Qué tamaño fijo de {{t:bet|apuesta}} en el flop, el turn y el river mete todo el stack?"
    options:
      - { text: "Aprox. {{n:geo.srp.3}} del {{t:pot|bote}}, es decir, más que todo el {{t:pot|bote}}", correct: true, why: "Sí: incluso tres {{t:bet|apuestas}} del tamaño del {{t:pot|bote}} meten solo {{n:srp.potbet.total}} de un stack de {{n:spr.srp.stack}}. Todo el stack solo entra con aprox. {{n:geo.srp.3}} del {{t:pot|bote}} en cada {{t:street|calle}}." }
      - { text: "Aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}", why: "Eso basta en un {{t:pot|bote}} con 3-bet ({{t:spr}} de aprox. {{n:spr.3bet-ip}}). En un {{t:pot|bote}} con una sola subida el {{t:spr}} es de aprox. {{n:spr.srp}}, así que las {{t:bet|apuestas}} tienen que ser mayores que el {{t:pot|bote}}." }
      - { text: "Aprox. {{n:cbet.size.small}} del {{t:pot|bote}}", why: "Tres {{t:bet|apuestas}} así meterán solo una pequeña parte del stack. Con un {{t:spr}} de aprox. {{n:spr.srp}} hace falta aprox. {{n:geo.srp.3}} del {{t:pot|bote}} en cada {{t:street|calle}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Bote}} con 3-bet, tienes {{t:position|posición}}, {{t:spr}} de aprox. {{n:spr.3bet-ip}}. Tienes una mano muy fuerte y quieres meter todo el stack hasta el river con {{t:bet|apuestas}} iguales. ¿Cuánto apuestas en el flop?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Sí: (1 + 2f) al cubo = 1 + 2·{{n:spr.3bet-ip}} da f ≈ {{n:geo.3bet-ip.3}}. Las {{t:bet|apuestas}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} y {{n:geo.3bet-ip.river}} suman {{n:geo.3bet-ip.total}}, es decir, todo el stack." }
      - { text: "{{n:cbet.size.small}} del {{t:pot|bote}} ({{n:g3b.third.flop}})", sizeError: true, why: "Buena acción, tamaño equivocado: tres {{t:bet|apuestas}} de 1/3 del {{t:pot|bote}} meterán solo aprox. {{n:g3b.third.total}} de {{n:spr.3bet-ip.stack}}. Para el plan «todo el stack hasta el river» hace falta aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}." }
      - { text: "{{t:check|Paso}} y en el river voy all-in", why: "Un all-in de {{n:spr.3bet-ip.stack}} en el river con un {{t:pot|bote}} de {{n:vs3bet.pot-after}} es una {{t:bet|apuesta}} muchas veces mayor que el {{t:pot|bote}}: el rival solo la pagará con una mano muy fuerte. Las {{t:bet|apuestas}} iguales en tres {{t:street|calles}} le dan la oportunidad de meter dinero poco a poco." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Bote}} tras tu 3-bet desde la {{t:big-blind|ciega grande}}, {{t:spr}} de aprox. {{n:spr.3bet-oop}}. Quieres meter todo el stack hasta el river con {{t:bet|apuestas}} iguales. ¿Qué fracción del {{t:pot|bote}} en cada {{t:street|calle}}?"
    table: { position: BB }
    options:
      - { text: "Aprox. {{n:geo.3bet-oop.3}} del {{t:pot|bote}}", correct: true, why: "Sí: con un {{t:spr}} de aprox. {{n:spr.3bet-oop}}, (1 + 2f) al cubo = 1 + 2·{{n:spr.3bet-oop}}, así que f ≈ {{n:geo.3bet-oop.3}}. Un {{t:spr}} más bajo que tras un 3-bet {{t:in-position|en posición}}, así que también un tamaño menor." }
      - { text: "Aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}", sizeError: true, why: "Cerca, pero ese es el tamaño para un {{t:spr}} de aprox. {{n:spr.3bet-ip}}. Con un {{t:spr}} de aprox. {{n:spr.3bet-oop}} basta aprox. {{n:geo.3bet-oop.3}} del {{t:pot|bote}}, y con {{t:bet|apuestas}} mayores en el river no te quedará stack para una {{t:bet|apuesta}} completa." }
      - { text: "Aprox. {{n:geo.4bet.3}} del {{t:pot|bote}}", sizeError: true, why: "Eso basta tras un 4-bet ({{t:spr}} de aprox. {{n:spr.4bet}}). Con un {{t:spr}} de aprox. {{n:spr.3bet-oop}}, tres {{t:bet|apuestas}} así dejarán fuera una buena parte del stack." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Bote}} tras un 4-bet, {{t:spr}} de aprox. {{n:spr.4bet}}. Quieres meter todo el stack en dos {{t:bet|apuestas}}: en el flop y en el turn. ¿Cuánto apuestas en el flop?"
    options:
      - { text: "Aprox. {{n:geo.4bet.2}} del {{t:pot|bote}}", correct: true, why: "Sí: para dos {{t:street|calles}}, (1 + 2f) al cuadrado = 1 + 2·{{n:spr.4bet}}, así que f ≈ {{n:geo.4bet.2}}. Después de que te {{t:call|igualen}} la {{t:bet|apuesta}}, queda exactamente lo que mide una {{t:bet|apuesta}} del mismo tamaño en el turn." }
      - { text: "Aprox. {{n:geo.4bet.3}} del {{t:pot|bote}}", sizeError: true, why: "Ese es el tamaño para tres {{t:street|calles}}. Con dos {{t:bet|apuestas}} de {{n:geo.4bet.3}} del {{t:pot|bote}}, parte del stack quedará para el river." }
      - { text: "All-in directamente ({{n:spr.4bet.stack}})", why: "Ese es un plan para una {{t:street|calle}}, no para dos. Una {{t:bet|apuesta}} de aprox. {{n:spr.4bet}} {{t:pot|botes}} de golpe le da al rival una sola decisión: {{t:call|igualar}} todo o {{t:fold|retirarse}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "¿Qué significa el tamaño geométrico?"
    options:
      - { text: "La misma fracción del {{t:pot|bote}} en cada {{t:street|calle}}, de modo que la última {{t:bet|apuesta}} sea all-in", correct: true, why: "Sí: una {{t:bet|apuesta}} de f, si te la {{t:call|igualan}}, multiplica el {{t:pot|bote}} por (1 + 2f) en cada {{t:street|calle}}. Eliges el tamaño para que, tras la última {{t:bet|apuesta}}, todo el stack esté en el {{t:pot|bote}}." }
      - { text: "Siempre una {{t:bet|apuesta}} del tamaño de todo el {{t:pot|bote}}", why: "Todo el {{t:pot|bote}} es geométrico solo con un {{t:spr}} concreto (p. ej., {{n:spr.zone.deep}} para tres {{t:street|calles}}). Con un {{t:spr}} de aprox. {{n:spr.3bet-ip}} basta aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}." }
      - { text: "{{t:bet|Apuestas}} cada vez mayores en porcentaje: pequeña en el flop, grande en el river", why: "Las cantidades crecen porque crece el {{t:pot|bote}}, pero la fracción del {{t:pot|bote}} es la misma en cada {{t:street|calle}}. En un {{t:pot|bote}} con 3-bet son {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} y {{n:geo.3bet-ip.river}}, cada vez aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}." }
---
Antes de {{t:bet|hacer}} una {{t:bet|apuesta}} en el flop, conviene saber cuánto dinero se puede meter hasta el river. Una {{t:bet|apuesta}}, si te la {{t:call|igualan}}, no suma al {{t:pot|bote}} una cantidad fija, sino que lo multiplica.

## Cómo crece el {{t:pot|bote}}

Una {{t:bet|apuesta}} de f del {{t:pot|bote}}, si te la {{t:call|igualan}}, multiplica el {{t:pot|bote}} por (1 + 2f). Con una {{t:bet|apuesta}} del tamaño de todo el {{t:pot|bote}}, el {{t:pot|bote}} se triplica:

| {{t:street|Calle}} | {{t:pot|Bote}} antes de la {{t:bet|apuesta}} | {{t:bet|Apuesta}} (todo el {{t:pot|bote}}) | {{t:pot|Bote}} tras {{t:call|igualar}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Cada jugador ha metido {{n:geo.ex.total}}, es decir, {{n:spr.zone.deep}} {{t:pot|botes}}. Así que tres {{t:bet|apuestas}} del tamaño del {{t:pot|bote}} llevan al all-in exactamente con un {{t:spr}} de {{n:spr.zone.deep}}. De ahí sale el umbral de la zona más alta de {{t:spr}} de la primera lección.

## La fórmula

El tamaño geométrico es la misma fracción f del {{t:pot|bote}} en cada {{t:street|calle}}, elegida para que la última {{t:bet|apuesta}} sea all-in. Para n {{t:street|calles}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Ejemplo: con un {{t:spr}} de {{n:geo.half.spr}}, tres {{t:bet|apuestas}} de medio {{t:pot|bote}} meten todo el stack: {{n:ex.bet.half}}, {{n:geo.half.turn}} y {{n:geo.half.river}}, en total {{n:geo.half.total}} con un {{t:pot|bote}} de {{n:ex.pot}}.

## Tamaños para los {{t:pot|botes}} habituales

| {{t:pot|Bote}} | {{t:spr}} | Tres {{t:street|calles}} | Dos {{t:street|calles}} |
|---|---|---|---|
| {{t:open|Apertura}} {{t:call|igualada}} | {{n:spr.srp}} | {{n:geo.srp.3}} del {{t:pot|bote}} | – |
| 3-bet {{t:in-position|en posición}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} del {{t:pot|bote}} | – |
| 3-bet desde la {{t:big-blind|ciega grande}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} del {{t:pot|bote}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} del {{t:pot|bote}} | {{n:geo.4bet.2}} del {{t:pot|bote}} |

En un {{t:pot|bote}} con 3-bet {{t:in-position|en posición}}, son {{t:bet|apuestas}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} y {{n:geo.3bet-ip.river}}, en total {{n:geo.3bet-ip.total}}, es decir, todo el stack.

## Un {{t:pot|bote}} con una sola subida es profundo

Con un {{t:spr}} de aprox. {{n:spr.srp}}, tres {{t:bet|apuestas}} de medio {{t:pot|bote}} meten solo {{n:srp.half.total}}, y tres {{t:bet|apuestas}} del tamaño del {{t:pot|bote}}, {{n:srp.potbet.total}} de un stack de {{n:spr.srp.stack}}. Todo el stack solo entra con {{t:bet|apuestas}} mayores que el {{t:pot|bote}}. Por eso, en un {{t:pot|bote}} así, jugar por todo el stack ocurre sobre todo con manos muy fuertes.

:::note Cuándo resulta útil
El tamaño geométrico resulta útil cuando quieres meter todo el stack hasta el river, es decir, con una mano muy fuerte. No todas las manos quieren jugar por todo el stack: cuántas {{t:value|calles de valor}} aguanta una mano es el tema de la siguiente lección. La fórmula es pura matemática. Los módulos anteriores dan tamaños ajustados a la {{t:texture|textura}} del flop; el tamaño geométrico es un punto de referencia para un plan por todo el stack.
:::
