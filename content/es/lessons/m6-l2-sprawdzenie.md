---
id: m6.l2
module: m6
order: 2
title: "Pagar o retirarse"
sub: "Defensa contra un c-bet sin posición"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. En el {{t:pot|bote}} hay {{n:ex.third.pot}} y el Button {{t:bet|apuesta}} un c-bet de {{n:ex.third.bet}}. ¿Cuánta equity necesitas para {{t:call|igualar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Pones {{n:ex.third.bet}} en un {{t:pot|bote}} que, tras {{t:call|igualar}}, tendrá {{n:ex.third.total}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Un c-bet pequeño da un precio muy bueno." }
      - { text: "{{n:alpha.bet-third}}", why: "Eso es alpha: con qué frecuencia tiene que funcionar el {{t:bluff|farol}} del Button. En el denominador de la equity necesaria suma también lo que pones al {{t:call|igualar}}." }
      - { text: "{{n:mdf.bet-third}}", why: "Eso es la {{t:mdf|MDF}}, es decir, una parte del {{t:range|rango}}, no la equity de una mano. Además, en el flop {{t:out-of-position|sin posición}} defiendes algo menos que la {{t:mdf|MDF}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. En el {{t:pot|bote}} hay {{n:ex.pot}} y el Button {{t:bet|apuesta}} un c-bet de {{n:ex.bet.three-quarters}}. ¿Qué porcentaje de equity necesitas para {{t:call|igualar}}? Escribe un número."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Pones {{n:ex.bet.three-quarters}} en un {{t:pot|bote}} que, tras {{t:call|igualar}}, tendrá {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}. {{n:ex.bet.three-quarters}} ÷ esa suma = {{n:eq.bet-three-quarters}}. Es casi el doble que frente a un c-bet de 1/4 del {{t:pot|bote}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "La misma mano en el mismo flop. Una vez el Button {{t:bet|apuesta}} 1/3 del {{t:pot|bote}}, otra vez el {{t:pot|bote}} entero. ¿Cómo cambia tu defensa?"
    table: { position: BB }
    options:
      - { text: "Frente al {{t:pot|bote}} entero defiendes con un {{t:range|rango}} más estrecho", correct: true, why: "Una apuesta mayor es un precio peor: la equity necesaria sube de {{n:eq.bet-third}} a {{n:eq.bet-pot}}, y la {{t:mdf|MDF}} baja de {{n:mdf.bet-third}} a {{n:mdf.bet-pot}}. Las manos más débiles que pagaban la apuesta pequeña ahora las {{t:fold|tiras}}." }
      - { text: "Defiendes igual, porque es la misma mano", why: "La mano es la misma, pero el precio no. Ante una apuesta del tamaño del {{t:pot|bote}} necesitas {{n:eq.bet-pot}} de equity en lugar de {{n:eq.bet-third}}." }
      - { text: "Frente al {{t:pot|bote}} entero defiendes más amplio, porque una apuesta grande es más a menudo un {{t:bluff|farol}}", why: "No existe tal regla. Una apuesta grande suele indicar un {{t:range|rango}} {{t:polarized|polarizado}} (manos muy fuertes y {{t:bluff|faroles}}) y, en cualquier caso, un precio peor para ti." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop {{t:check|pasas}} y el Button {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "La {{t:pair|pareja}} media gana a todos los {{t:bluff|faroles}} del Button (manos sin {{t:pair|pareja}}), y para {{t:call|igualar}} solo necesitas {{n:eq.bet-third}} de equity. Defensa estándar." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado. Frente a un c-bet pequeño {{t:fold|tiras}} las manos más débiles sin {{t:pair|pareja}} y sin {{t:draw|proyecto}}, no una {{t:pair|pareja}}." }
      - { text: "Check-raise", why: "Normalmente {{t:call|igualas}}. Tras una {{t:raise|subida}} te pagan sobre todo manos mejores y {{t:draw|proyectos}}; hacer check-raise con una mano así es una jugada rara del solver frente a c-bets pequeños." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop {{t:check|pasas}} y el Button {{t:bet|apuesta}} un c-bet de 3/4 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "No tienes {{t:pair|pareja}} ni {{t:draw|proyecto}} (ninguna pica, y la {{t:straight|escalera}} queda lejos). Frente a un c-bet grande necesitas {{n:eq.bet-three-quarters}} de equity, y {{t:out-of-position|sin posición}} rara vez llegarás al showdown solo con cartas altas. Una {{t:pair|pareja}} de damas o de jotas tampoco ganará siempre." }
      - { text: "{{t:call|Igualo}}", why: "Tienta, porque la dama y la jota son más altas que la mesa. Pero las cartas altas solas no bastan a este precio: en el turn a menudo te encontrarás otra apuesta y te {{t:fold|retirarás}}." }
      - { text: "Check-raise", why: "Para un {{t:bluff|farol}} son mejores las manos con {{t:draw|proyecto}}, que tienen una segunda forma de ganar. Esta mano no tiene ninguna." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop {{t:check|pasas}} y el Button {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Dos cartas altas más un {{t:flush-draw|proyecto de color}} adicional (backdoor: tres picas; necesitas pica en el turn y en el river). Con un precio de {{n:eq.bet-third}}, basta para {{t:call|igualar}}." }
      - { text: "Check-raise", why: "Normalmente no. El check-raise lo haces sobre todo con las manos más fuertes y {{t:draw|proyectos}} ({{t:flush|color}}, {{t:oesd|proyecto abierto de escalera}}). Un {{t:flush-draw|proyecto de color}} adicional es débil: cuando el Button paga, normalmente te quedas solo con cartas altas. Esta mano la {{t:call|igualas}}." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado frente a un c-bet pequeño. El {{t:draw|proyecto}} adicional y dos cartas altas dan suficiente equity con un precio de {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop {{t:check|pasas}} y el Button {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Tienes un gutshot a {{t:straight|escalera}} (una dama) y un rey más alto que la mesa. {{t:call|Igualar}} te compra una carta: el gutshot lo ligas en el turn aproximadamente un {{n:odds.gutshot.flop-turn}} de las veces, y el rey añade unos cuantos outs a {{t:top-pair|pareja mayor}}. En total es menos que el precio de {{n:eq.bet-third}}, pero si ligas la {{t:straight|escalera}} ganarás más (implied odds), y el rey por sí solo a veces gana a los {{t:bluff|faroles}} del Button. Frente a un c-bet pequeño, basta para {{t:call|igualar}}." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado: un {{t:draw|proyecto}} más una carta alta es suficiente frente a un c-bet pequeño." }
      - { text: "Check-raise all-in", why: "Arriesgas todo tu stack con una mano que todavía no tiene nada. Ese tamaño echa a las manos más débiles, y solo pagan las mejores." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop {{t:check|pasas}} y el Button {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "No tienes {{t:pair|pareja}} ni {{t:flush-draw|proyecto de color}}; solo tienes un débil {{t:straight-draw|proyecto de escalera}} adicional (necesitas dos cartas concretas), y ninguna de tus cartas es más alta que la mesa. En un flop con as y rey, el Button tiene muchas manos fuertes. El precio es bueno, pero esta mano casi nunca lo realizará." }
      - { text: "{{t:call|Igualo}}, porque la {{t:mdf|MDF}} es {{n:mdf.bet-third}}", why: "La {{t:mdf|MDF}} es un punto de referencia para todo el {{t:range|rango}}, no un motivo para pagar con las manos más débiles. En el flop {{t:out-of-position|sin posición}} puedes defender algo menos que la {{t:mdf|MDF}}." }
      - { text: "Check-raise", why: "En un flop con as y rey, la {{t:range-advantage|ventaja de rango}} es del Button, y tú no tienes un {{t:draw|proyecto}} que te dé una segunda forma de ganar." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "¿Por qué {{t:out-of-position|sin posición}} no {{t:call|igualas}} en el flop con cualquier mano cuya equity sea aunque sea un poco superior al precio?"
    table: { position: BB }
    options:
      - { text: "Porque no realizarás toda tu equity", correct: true, why: "La equity es tu probabilidad si se juega hasta el showdown sin más {{t:bet|apuestas}}. {{t:out-of-position|Sin posición}} hablas primero en el turn y en el river, y a menudo te {{t:fold|retirarás}} ante otra apuesta. Las manos débiles realizan entonces menos que su equity." }
      - { text: "Porque el Button siempre tiene una mano fuerte en el flop", why: "El Button {{t:open|abre}} y hace c-bet con muchas manos, también con {{t:bluff|faroles}}. El problema es tu {{t:position|posición}}, no su fuerza." }
      - { text: "Porque hay que guardar {{t:chips|fichas}} para mejores ocasiones", why: "Lo que cuenta es el {{t:expected-value|valor esperado}} de cada decisión, no ahorrar {{t:chips|fichas}}." }
---
En M5 jugaste el c-bet como {{t:aggressor|agresor}}. Ahora estás al otro lado: defiendes la {{t:big-blind|ciega grande}}, pasas en el flop y el Button {{t:bet|apuesta}} un c-bet. Recuerda de M5: un c-bet es una {{t:bet|apuesta}} del jugador que {{t:raise|subió}} preflop, y la {{t:range-advantage|ventaja de rango}} depende de la {{t:texture|textura}} del flop.

## El precio del c-bet

Primero calculas cuánta equity necesitas (la fórmula de M2). Un c-bet pequeño da un precio excelente; uno grande, uno claramente peor.

| C-bet del Button | Equity necesaria | {{t:mdf|MDF}} |
|---|---|---|
| 1/4 del {{t:pot|bote}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 del {{t:pot|bote}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 del {{t:pot|bote}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 del {{t:pot|bote}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| {{t:pot|Bote}} entero | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

La {{t:mdf|MDF}} indica la dirección: cuanto mayor es la apuesta, menos manos defiendes. En el flop {{t:out-of-position|sin posición}} puedes defender algo menos que la {{t:mdf|MDF}}, porque los {{t:bluff|faroles}} del Button aún tienen equity, pero ante un c-bet pequeño no {{t:fold|tiras}} manos en masa.

## {{t:out-of-position|Sin posición}} realizas menos

La equity es tu probabilidad si juegas hasta el final sin más {{t:bet|apuestas}}. {{t:out-of-position|Sin posición}} hablas primero en cada {{t:street|calle}}, así que a menudo te {{t:fold|retirarás}} antes de ver el showdown. Las manos débiles sin {{t:draw|proyecto}} realizan menos de lo que indica su equity. Las manos del mismo palo, los {{t:connectors|conectores}} y las {{t:pair|parejas}} realizan más, porque ligan jugadas fuertes o ya van ganando.

## Con qué {{t:call|igualas}}

Frente a un c-bet pequeño (aprox. 1/3 del {{t:pot|bote}}) continúas con:

- casi cualquier {{t:pair|pareja}}, también la media y la mínima,
- {{t:flush-draw|proyectos de color}} y de {{t:straight|escalera}}, también un gutshot con carta alta,
- cartas altas con un {{t:draw|proyecto}} adicional (backdoor), p. ej. tres cartas del mismo palo,
- normalmente también con as como carta más alta.

Recuerda de M2: {{t:call|igualar}} una {{t:bet|apuesta}} en el flop te compra una carta, así que comparas el {{t:draw|proyecto}} con tu probabilidad en el turn. Esa probabilidad a veces es algo menor que el precio de un c-bet pequeño. Aun así, {{t:call|igualar}} compensa cuando, si ligas, ganarás más de lo que hay ahora en el {{t:pot|bote}} (las llamadas implied odds, que calcularás en M7), o cuando la mano a veces gana sin ligar, p. ej. gracias a una carta alta.

## Con qué te {{t:fold|retiras}}

- con manos sin {{t:pair|pareja}} y sin {{t:draw|proyecto}} que no tienen as ni cartas más altas que la mesa; en flops con as {{t:fold|tiras}} más de ellas,
- normalmente con dos cartas altas sin {{t:draw|proyecto}} cuando el c-bet es grande (aunque en flops {{t:dry|secos}} con rey el solver {{t:call|iguala}} con muchas manos con as); más bien {{t:call|igualas}} cuando tienes un {{t:draw|proyecto}} adicional, mejor aún al {{t:flush|color}} máximo.

Cuando el c-bet crece, las siguientes manos más débiles pasan de {{t:call|igualar}} a retirarse.
