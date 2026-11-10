---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Cuándo subir un c-bet y a cuánto"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del botón. En el flop {{t:check|pasas}} y el botón {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:two-pair|Dobles parejas}} en un flop bajo y {{t:connected|conectado}} es una mano {{t:value|de valor}}. En flops así, la {{t:big-blind|ciega grande}} tiene más manos de las más fuertes que el botón. Al {{t:raise|subir}} construyes el {{t:pot|bote}} y haces pagar a las {{t:pair|parejas}} y a los {{t:draw|proyectos}}." }
      - { text: "{{t:call|Igualo}}", correct: true, why: "También es buena: en un flop muy {{t:connected|conectado}}, con parte de las {{t:two-pair|dobles parejas}} el solver se limita a {{t:call|igualar}}. El check-raise construye el {{t:pot|bote}} y protege la mano con más frecuencia." }
      - { text: "{{t:fold|Me retiro}}", why: "{{t:two-pair|Dobles parejas}} es una de las manos más fuertes en este flop. {{t:fold|Retirarse}} es un gran error." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.third.pot}} y el botón {{t:bet|apuesta}} un c-bet de {{n:ex.third.bet}}. Tienes un set y quieres hacer check-raise. ¿A cuánto {{t:raise|subes}}?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "A {{n:xr.example}}", correct: true, why: "Es {{n:xr.mult.example}} el c-bet. El botón tiene que poner {{n:xr.example.extra}} más y necesita aprox. {{n:eq.vs-xr.example}} de equity: las {{t:pair|parejas}} peores y los {{t:draw|proyectos}} débiles (gutshot) no tienen precio, y los proyectos de {{t:flush|color}} y los {{t:oesd|proyectos de escalera abierta}} pagarán ya en un {{t:pot|bote}} grande." }
      - { text: "A {{n:xr.too-small}}", sizeError: true, why: "Buena acción, pero tamaño demasiado pequeño: el botón solo pone {{n:xr.too-small.extra}} más y necesita aprox. {{n:eq.vs-xr.too-small}} de equity. Cualquier {{t:flush-draw|proyecto de color}} o de {{t:straight|escalera}} pagará casi gratis." }
      - { text: "{{t:call|Igualo}}", why: "En un flop con dos corazones y cartas de {{t:straight|escalera}} pierdes valor y protección: muchas cartas en el turn pararán la acción o superarán tu mano. Un set quiere construir el {{t:pot|bote}} desde ya." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.third.pot}} y el botón {{t:bet|apuesta}} un c-bet de {{n:ex.third.bet}}. Haces check-raise a {{n:xr.mult.example}} el c-bet. ¿A cuánto {{t:raise|subes}}? Escribe el número de {{t:chips|fichas}}."
    table: { position: BB }
    answer: xr.example
    explanation: "El c-bet es de {{n:ex.third.bet}}, así que {{n:xr.mult.example}} el c-bet son {{n:xr.example}}. El tamaño del check-raise lo calculas a partir del c-bet, no del {{t:pot|bote}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "En el {{t:pot|bote}} había {{n:ex.third.pot}}, el botón {{t:bet|apostó}} {{n:ex.third.bet}} y tú {{t:raise|subiste}} a {{n:xr.example}}. ¿Qué porcentaje de equity necesita el botón para {{t:call|igualar}}? Escribe el número."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "El botón pone {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}} más. En el {{t:pot|bote}} hay entonces {{n:xr.example.pot-after}} y, tras su {{t:call|igualada}}, {{n:xr.example.extra}} más. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "En el {{t:pot|bote}} había {{n:ex.third.pot}}, el botón {{t:bet|apostó}} {{n:ex.third.bet}} y tú {{t:raise|subiste}} solo a {{n:xr.too-small}}. ¿Cuánta equity necesita el botón para {{t:call|igualar}}?"
    table: { position: BB }
    options:
      - { text: "Aprox. {{n:eq.vs-xr.too-small}}", correct: true, why: "Pone {{n:xr.too-small.extra}} más en un {{t:pot|bote}} de {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. Tan barato, pagará con casi cualquier mano; por eso la {{t:raise|subida}} tiene que ser varias veces mayor que el c-bet." }
      - { text: "Aprox. {{n:eq.vs-xr.example}}", why: "Eso necesitaría frente a una {{t:raise|subida}} a {{n:xr.example}}. Con {{n:xr.too-small}} solo pone {{n:xr.too-small.extra}} más." }
      - { text: "Aprox. {{n:eq.bet-third}}", why: "Eso es lo que necesitabas tú para {{t:call|igualar}} el c-bet. Tras el check-raise calculas el precio del botón: pone {{n:xr.too-small.extra}} más en un {{t:pot|bote}} de {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del botón. En el flop {{t:check|pasas}} y el botón {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Un {{t:draw|proyecto}} al mejor {{t:flush|color}} es un buen {{t:semi-bluff|semifarol}}: ganas cuando el botón {{t:fold|se retira}} y, cuando paga, sigues teniendo {{n:outs.flush}} outs (aprox. {{n:odds.flush.flop-turn}} en el turn)." }
      - { text: "{{t:call|Igualo}}", correct: true, why: "También es buena: ligas el {{t:flush|color}} en el turn aprox. el {{n:odds.flush.flop-turn}} de las veces, casi tanto como el precio de {{n:eq.bet-third}}, y si ligas el mejor {{t:flush|color}} ganarás más (implied odds). Los {{t:draw|proyectos}} fuertes los juegas de las dos maneras, para que tu check-raise no represente solo manos fuertes." }
      - { text: "{{t:fold|Me retiro}}", why: "Un gran error: con {{n:outs.flush}} outs ligas el mejor {{t:flush|color}} en el turn aprox. el {{n:odds.flush.flop-turn}} de las veces, casi tanto como el precio de {{n:eq.bet-third}}, y si lo ligas ganarás más (implied odds). Además, puedes hacer check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del botón. En el flop {{t:check|pasas}} y el botón {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Un {{t:oesd|proyecto de escalera abierta}} ({{n:outs.oesd}} outs) frente a un c-bet pequeño, que te da una ocasión barata de {{t:raise|subir}}. {{t:raise|Subiendo}} puedes ganar de inmediato y, si te {{t:call|igualan}}, aún puedes ligar." }
      - { text: "{{t:call|Igualo}}", correct: true, why: "También es buena: ligas la {{t:straight|escalera}} en el turn aprox. el {{n:odds.oesd.flop-turn}} de las veces, algo menos que el precio de {{n:eq.bet-third}}, pero si la ligas ganarás más (implied odds) y, si nadie {{t:bet|apuesta}} en el turn, también verás el river gratis. Parte de los {{t:draw|proyectos}} fuertes los {{t:call|igualas}}, para que tus {{t:call|igualadas}} no sean todas débiles." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado: con {{n:outs.oesd}} outs ligas la {{t:straight|escalera}} en el turn aprox. el {{n:odds.oesd.flop-turn}} de las veces, no mucho menos que el precio de {{n:eq.bet-third}}; el resto lo aportan las implied odds y la opción de ver un river gratis. Además, puedes hacer check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del botón. En el flop {{t:check|pasas}} y el botón {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "{{t:top-pair|Pareja mayor}} con kicker débil es una mano para {{t:call|igualar}}. Gana a los {{t:bluff|faroles}} del botón y, {{t:call|igualando}}, los mantienes en juego." }
      - { text: "Check-raise", why: "Normalmente {{t:call|igualas}}. Tras una {{t:raise|subida}} te pagan sobre todo manos mejores y {{t:draw|proyectos}}; el check-raise con una mano así es una jugada poco frecuente del solver frente a c-bets pequeños." }
      - { text: "{{t:fold|Me retiro}}", why: "{{t:top-pair|Pareja mayor}} frente a un c-bet pequeño es, con diferencia, demasiado para {{t:fold|retirarte}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del botón. En el flop {{t:check|pasas}} y el botón {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "No tienes {{t:pair|pareja}} ni {{t:flush-draw|proyecto de color}}; solo tienes un {{t:straight-draw|proyecto de escalera}} backdoor débil (necesitas dos cartas concretas), y ninguna de tus cartas es más alta que las de la mesa. En flops con as {{t:fold|te retiras}} con más manos así." }
      - { text: "Check-raise de {{t:bluff|farol}}", why: "Los {{t:bluff|faroles}} con check-raise los haces sobre todo con {{t:draw|proyectos}} (de {{t:flush|color}}, {{t:oesd|proyectos de escalera abierta}}) que también ganan cuando ligan. Esta mano solo tiene un {{t:draw|proyecto}} backdoor débil, y el botón tiene aquí muchos ases y reyes que no {{t:fold|se retirarán}}." }
      - { text: "{{t:call|Igualo}}", why: "El precio es bueno, pero esta mano no ligará casi nada: incluso una {{t:pair|pareja}} de seises o de cincos pierde contra la mayoría de las manos con las que el botón seguirá pagando." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "¿Frente a qué c-bet del botón haces check-raise con más frecuencia?"
    table: { position: BB }
    options:
      - { text: "1/4 del {{t:pot|bote}}", correct: true, why: "Un c-bet pequeño te da una ocasión barata de {{t:raise|subir}}, y el botón lo {{t:bet|apuesta}} con un {{t:range|rango}} amplio con muchas manos débiles. Frente a un c-bet grande {{t:raise|subes}} con menos frecuencia y con un rango más ajustado: sobre todo sets y {{t:two-pair|dobles parejas}}, menos {{t:bluff|faroles}}." }
      - { text: "Todo el {{t:pot|bote}}", why: "Frente a un c-bet grande, la {{t:raise|subida}} cuesta mucho y el {{t:range|rango}} del botón es más fuerte. Con más frecuencia {{t:call|igualas}} o {{t:fold|te retiras}}." }
      - { text: "Con la misma frecuencia", why: "Frente a c-bets pequeños {{t:raise|subes}} más a menudo y con un rango más amplio; frente a los grandes, menos, sobre todo con las manos más fuertes." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Juegas contra un botón que en el flop casi nunca {{t:fold|se retira}}. {{t:bet|Apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Un gutshot con carta alta es una buena {{t:call|igualada}} con un precio de {{n:eq.bet-third}}. El check-raise de {{t:bluff|farol}} gana dinero con las {{t:fold|retiradas}}, y este rival casi no {{t:fold|se retira}}, así que la {{t:raise|subida}} pierde su principal ventaja." }
      - { text: "Check-raise", why: "Los {{t:bluff|faroles}} con check-raise los haces sobre todo con {{t:draw|proyectos}} fuertes, y un gutshot no es uno de ellos. Además, el {{t:bluff|farol}} gana dinero con las {{t:fold|retiradas}}, y este rival casi no {{t:fold|se retira}}: contra él {{t:raise|subes}} sobre todo {{t:value|por valor}}." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado: un {{t:draw|proyecto}} con carta alta se defiende con un precio tan bueno, juegues contra quien juegues." }
---
Hacer check-raise es {{t:check|pasar}} y después {{t:raise|subir}} la {{t:bet|apuesta}} del rival. Desde la {{t:big-blind|ciega grande}} es un arma importante frente a los c-bets (la mayoría de las veces eliges de todos modos entre {{t:call|igualar}} y {{t:fold|retirarte}}): sin ella, el botón podría hacer c-bet barato con casi cualquier mano.

## Por qué {{t:raise|subir}}

Haces check-raise por dos motivos:

- **{{t:value|por valor}}**: tienes una mano muy fuerte ({{t:two-pair|dobles parejas}}, set) y quieres construir el {{t:pot|bote}},
- **como {{t:semi-bluff|semifarol}}**: tienes un {{t:draw|proyecto}} (de {{t:flush|color}}, {{t:oesd|proyecto de escalera abierta}}) que gana de dos maneras: cuando el botón {{t:fold|se retira}} o cuando ligas.

Con manos medias, como {{t:top-pair|pareja mayor}} con kicker débil, normalmente {{t:call|igualas}}: tras una {{t:raise|subida}}, las manos peores del botón {{t:fold|se retiran}} más a menudo y pagan las mejores. Es una simplificación: frente a c-bets pequeños, el solver también {{t:raise|sube}} parte de las {{t:top-pair|parejas mayores}} y de las {{t:pair|parejas}} débiles como protección. Y, al revés, con {{t:two-pair|dobles parejas}} en un flop muy {{t:connected|conectado}} el solver a menudo solo {{t:call|iguala}}.

## Cuándo con más frecuencia

- **Frente a un c-bet pequeño.** La {{t:raise|subida}} es barata y el botón {{t:bet|apuesta}} el c-bet pequeño con un {{t:range|rango}} amplio. Frente a un c-bet grande {{t:raise|subes}} con menos frecuencia y con un rango más ajustado: sobre todo sets y {{t:two-pair|dobles parejas}}, menos {{t:bluff|faroles}}.
- **En flops bajos y {{t:connected|conectados}}** (p. ej., [[7h 6d 5s]]). La {{t:big-blind|ciega grande}} defiende muchas manos bajas, así que aquí suele tener más {{t:two-pair|dobles parejas}} y {{t:straight|escaleras}} que el botón, es decir, {{t:nuts-advantage|ventaja de nuts}}.
- **Con menos frecuencia en flops altos favorables al botón**, p. ej., K-J-T o A-A-K: ahí es él quien tiene más manos de las más fuertes.

## Qué tamaño

El tamaño del check-raise lo calculas a partir del c-bet. Ejemplo: en el {{t:pot|bote}} hay {{n:ex.third.pot}} y el c-bet es de {{n:ex.third.bet}}. Un check-raise a {{n:xr.mult.example}} el c-bet es una {{t:raise|subida}} a {{n:xr.example}}: el botón pone {{n:xr.example.extra}} más y necesita aprox. **{{n:eq.vs-xr.example}}** de equity. Una {{t:raise|subida}} solo a {{n:xr.too-small}} le da un precio de aprox. **{{n:eq.vs-xr.too-small}}**: pagará con casi cualquier mano que tenga algún {{t:draw|proyecto}}. Por eso {{t:raise|subes}} a aprox. {{n:xr.mult.low}}–{{n:xr.mult.example}} el c-bet, más cuanto menor sea el c-bet, y no al mínimo.

:::note Un rival que no {{t:fold|se retira}}
El {{t:bluff|farol}} con check-raise gana dinero con las {{t:fold|retiradas}} (recuerda el alpha de la primera lección). Frente a un jugador que en el flop casi nunca {{t:fold|se retira}}, {{t:raise|subes}} sobre todo {{t:value|por valor}} y guardas los {{t:bluff|faroles}} para los {{t:draw|proyectos}} más fuertes.
:::
