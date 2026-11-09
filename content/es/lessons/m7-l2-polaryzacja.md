---
id: m7.l2
module: m7
order: 2
title: "Polarización"
sub: "Apuesta grande: manos fuertes y semifaroles"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "¿Qué {{t:range|rango}} de apuesta en el turn es {{t:polarized|polarizado}}?"
    options:
      - { text: "Sets, {{t:two-pair|dobles parejas}} y {{t:draw|proyectos}}, sin {{t:pair|parejas}} medias", correct: true, why: "Sí: un {{t:range|rango}} {{t:polarized|polarizado}} tiene dos polos: manos muy fuertes y {{t:semi-bluff|semifaroles}}. El centro, es decir, las manos medias, no está en él: esas manos {{t:check|pasan}}." }
      - { text: "{{t:top-pair|Parejas mayores}}, {{t:pair|parejas}} medias y {{t:pair|parejas}} más débiles", why: "Aquí no hay ningún polo: faltan las manos muy fuertes y los {{t:semi-bluff|semifaroles}}; solo hay {{t:pair|parejas}} de arriba abajo. Esto se parece más a un {{t:range|rango}} {{t:linear|lineal}}, que apuesta sobre todo con manos de valor, normalmente con un tamaño pequeño, y no grande en el turn." }
      - { text: "Solo {{t:bluff|faroles}}", why: "El rival detectará fácilmente un {{t:range|rango}} sin manos fuertes y {{t:call|igualará}}. Un {{t:range|rango}} {{t:polarized|polarizado}} combina {{t:bluff|faroles}} con manos muy fuertes." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "En el flop {{t:dry|seco}} [[Ks 7d 2c]] apostaste poco con casi todas tus manos: desde sets hasta {{t:pair|parejas}} débiles. ¿Cómo se llama este {{t:range|rango}} de apuesta?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Lineal}}", correct: true, why: "Sí: las manos fuertes y las medias apuestan juntas, con un tamaño pequeño. Es el plan del M5 en un flop {{t:dry|seco}} y alto, donde tienes {{t:range-advantage|ventaja de rango}}." }
      - { text: "{{t:polarized|Polarizado}}", why: "Un {{t:range|rango}} {{t:polarized|polarizado}} no tiene manos medias: solo apuestan las manos muy fuertes y los {{t:bluff|faroles}}. Aquí también apostaron {{t:pair|parejas}} débiles." }
      - { text: "Limitado", why: "Un {{t:range|rango}} limitado es aquel al que le faltan las manos más fuertes. Tú también apostaste con sets." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "¿Por qué a una {{t:pair|pareja}} media no le gusta una apuesta grande en el turn?"
    options:
      - { text: "Porque las manos peores {{t:fold|se retirarán}} y pagarán las mejores", correct: true, why: "Sí: una apuesta grande con una {{t:pair|pareja}} media solo gana dinero cuando paga una mano peor, y esas manos suelen {{t:fold|retirarse}} ante una apuesta grande. Lo que queda es que te {{t:call|igualen}} manos que te ganan." }
      - { text: "Porque una apuesta grande siempre es un {{t:bluff|farol}}", why: "No: las manos más fuertes también {{t:bet|apuestan}} grande. El problema de la {{t:pair|pareja}} media es quién la paga." }
      - { text: "Porque una {{t:pair|pareja}} media no puede ganar", why: "Sí puede: gana a los {{t:bluff|faroles}} y a las {{t:pair|parejas}} peores. Por eso {{t:check|pasa}} y llega barata al showdown." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "{{t:open|Abriste}} desde el Botón y la {{t:big-blind|ciega grande}} {{t:call|igualó}} tu c-bet en el flop. El turn es un dos. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. Tienes un set. ¿Qué haces?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Apuesto {{n:ex.bet.three-quarters}}", correct: true, why: "Sí: el rival puede tener {{t:draw|proyecto}} de {{t:flush|color}} (dos corazones) y de {{t:straight|escalera}} (p. ej., 65, T9). Ante una apuesta de 3/4 del {{t:pot|bote}}, un {{t:flush-draw|proyecto de color}} necesita un {{n:eq.bet-three-quarters}} de equity, y el {{t:flush|color}} llega en aprox. el {{n:odds.flush.turn-river}} de los casos. Contra tu set tiene aún menos: [[4h]] y [[2h]] te dan {{t:full-house|full}}, así que le quedan {{n:outs.flush.vs-set}} outs limpios, aprox. el {{n:odds.flush.vs-set}}. Paga demasiado." }
      - { text: "Apuesto {{n:ex.bet.quarter}}", sizeError: true, why: "Buena acción, mal tamaño: con una apuesta de 1/4 del {{t:pot|bote}}, el {{t:draw|proyecto}} solo necesita un {{n:eq.bet-quarter}} de equity, así que recibe un buen precio. Con una mano muy fuerte en una {{t:board|mesa}} con {{t:flush-draw|proyecto de color}}, apuestas grande." }
      - { text: "{{t:check|Paso}}", why: "Una carta gratis es un regalo para los {{t:draw|proyectos}}, y no construyes el {{t:pot|bote}} antes del river. Un set en una {{t:board|mesa}} con {{t:flush-draw|proyecto de color}} apuesta." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "{{t:open|Abriste}} desde el Botón y la {{t:big-blind|ciega grande}} {{t:call|igualó}} tu c-bet en el flop. El turn es un tres. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Apuesto {{n:ex.bet.three-quarters}}", correct: true, why: "Sí: un {{t:flush-draw|proyecto de color}} con dos cartas altas es un buen {{t:semi-bluff|semifarol}}. Apuestas con el mismo tamaño grande que las manos fuertes, así que el rival no distingue el {{t:bluff|farol}} del valor." }
      - { text: "Apuesto {{n:ex.bet.quarter}}", sizeError: true, why: "Buena acción, mal tamaño: una apuesta tan barata el rival la {{t:call|igualará}} con cualquier {{t:pair|pareja}}, y el {{t:semi-bluff|semifarol}} gana sobre todo cuando el rival {{t:fold|se retira}}. Si tus apuestas pequeñas significaran {{t:draw|proyectos}} y las grandes manos fuertes, el rival lo aprovecharía fácilmente." }
      - { text: "{{t:check|Paso}}", correct: true, why: "También está bien: verás el river gratis y ligarás el {{t:flush|color}} en el {{n:odds.flush.turn-river}} de los casos. Aun así, apostar suele ser mejor, porque un {{t:draw|proyecto}} con cartas altas es uno de los mejores {{t:semi-bluff|semifaroles}}, y al {{t:check|pasar}} renuncias a ganar el {{t:pot|bote}} de inmediato." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "{{t:open|Abriste}} desde el Botón y la {{t:big-blind|ciega grande}} {{t:call|igualó}} tu c-bet en el flop. El turn es un cinco. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "Una {{t:top-pair|pareja mayor}} con kicker débil es una mano media. Ante una apuesta grande pagarán sobre todo reyes mejores (AK, KQ, KJ), y las manos peores {{t:fold|se retirarán}}. {{t:check|Pasando}}, llegas barato al showdown." }
      - { text: "Apuesto {{n:ex.bet.three-quarters}}", why: "Una apuesta grande encaja con un {{t:range|rango}} {{t:polarized|polarizado}}. Con esta mano te pagan sobre todo manos que te ganan." }
      - { text: "Apuesto {{n:ex.bet.pot}}", why: "Un {{t:pot|bote}} aún mayor con una mano de fuerza media: las manos peores casi siempre {{t:fold|se retirarán}} y las mejores pagarán." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.pot}} y apuestas {{n:ex.bet.three-quarters}} con una mano muy fuerte. ¿Qué porcentaje de equity necesita un rival con {{t:draw|proyecto}} para {{t:call|igualar}}? Escribe un número."
    answer: eq.bet-three-quarters
    explanation: "El rival pone {{n:ex.bet.three-quarters}} en un {{t:pot|bote}} que, tras {{t:call|igualar}}, tiene {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}: {{n:eq.bet-three-quarters}}. Un {{t:flush-draw|proyecto de color}} tiene en el turn aprox. un {{n:odds.flush.turn-river}}, así que paga demasiado."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Tienes un set y apuestas solo {{n:ex.bet.quarter}} en un {{t:pot|bote}} de {{n:ex.pot}}. El rival tiene {{t:flush-draw|proyecto de color}} (aprox. un {{n:odds.flush.turn-river}} hasta el river). ¿Qué se deduce de esto?"
    options:
      - { text: "Recibe un buen precio: solo necesita un {{n:eq.bet-quarter}}", correct: true, why: "Sí: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, menos que su {{n:odds.flush.turn-river}}. {{t:call|Igualar}} le sale rentable, y a ti la apuesta pequeña te hace regalar parte del valor." }
      - { text: "Tiene que {{t:fold|retirarse}} porque necesita un {{n:eq.bet-three-quarters}}", why: "Eso necesitaría ante una apuesta de 3/4 del {{t:pot|bote}}. Ante una apuesta de 1/4 del {{t:pot|bote}} le basta un {{n:eq.bet-quarter}}." }
      - { text: "El precio no importa, porque de todos modos le ganas", why: "Ahora le ganas, pero en aprox. el {{n:odds.flush.turn-river}} de los casos ganará en el river. El tamaño de la apuesta decide si paga demasiado o demasiado poco por esa posibilidad." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "En el turn el rival tiene un {{t:oesd|proyecto de escalera abierta}}: aprox. un {{n:odds.oesd.turn-river}} hasta el river. ¿A partir de qué apuesta tuya paga demasiado (contando solo las pot odds)?"
    options:
      - { text: "Ya desde 1/3 del {{t:pot|bote}}: necesita un {{n:eq.bet-third}}", correct: true, why: "Sí: {{n:eq.bet-third}} es más que {{n:odds.oesd.turn-river}}. En el turn a los {{t:draw|proyectos}} solo les queda una carta, así que incluso una apuesta media les da un mal precio." }
      - { text: "Solo desde el {{t:pot|bote}} entero: necesita un {{n:eq.bet-pot}}", why: "Con el {{t:pot|bote}} entero paga muchísimo de más, pero ya con 1/3 del {{t:pot|bote}} necesita un {{n:eq.bet-third}}, más que su {{n:odds.oesd.turn-river}}." }
      - { text: "Nunca, un {{t:draw|proyecto}} siempre puede {{t:call|igualar}}", why: "Un {{t:draw|proyecto}} solo {{t:call|iguala}} con buen precio o con implied odds (próxima lección). En el turn tiene aprox. un {{n:odds.oesd.turn-river}}, así que la mayoría de las apuestas le dan un mal precio." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.pot}} y apuestas el {{t:pot|bote}} entero: {{n:ex.bet.pot}}. ¿Qué porcentaje de equity necesita el rival para {{t:call|igualar}}? Escribe un número."
    answer: eq.bet-pot
    explanation: "El rival pone {{n:ex.bet.pot}} en un {{t:pot|bote}} que, tras {{t:call|igualar}}, tiene {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}: {{n:eq.bet-pot}}. Ni el {{t:flush|color}} (aprox. {{n:odds.flush.turn-river}}) ni la {{t:straight|escalera}} abierta (aprox. {{n:odds.oesd.turn-river}}) tienen tantas posibilidades."
---
En el flop a menudo apostabas poco con casi todo tu {{t:range|rango}}. En el turn el {{t:range|rango}} de apuesta cambia: se quedan en él las manos muy fuertes y los {{t:semi-bluff|semifaroles}}, mientras que las manos medias {{t:check|pasan}}. A este {{t:range|rango}} lo llamamos {{t:polarized|polarizado}}.

## Dos tipos de {{t:range|rango}}

- **{{t:linear|Lineal}}:** apuestas desde las manos más fuertes hacia abajo, incluidas las medias. Normalmente con un tamaño pequeño, p. ej., un c-bet de {{n:cbet.size.small}} del {{t:pot|bote}} en [[Ks 7d 2c]].
- **{{t:polarized|Polarizado}}:** apuestan los dos polos: manos muy fuertes (sets, {{t:two-pair|dobles parejas}}, {{t:straight|escaleras}}, colores) y {{t:semi-bluff|semifaroles}} ({{t:draw|proyectos}}). En él no hay manos medias.

En general, un {{t:range|rango}} {{t:polarized|polarizado}} son manos muy fuertes y {{t:bluff|faroles}}. En el turn, los {{t:bluff|faroles}} suelen ser {{t:semi-bluff|semifaroles}}, y en el river (M8), manos sin opciones en el showdown.

## Por qué polarizas en el turn

El rival {{t:call|igualó}} el flop, así que suele tener una {{t:pair|pareja}} o un {{t:draw|proyecto}}, y a veces cartas altas con backdoor (M6). Una mano media no gana nada con una segunda apuesta: las manos peores {{t:fold|se retiran}} y las mejores pagan. Las manos fuertes quieren construir el {{t:pot|bote}} antes del river, y los {{t:semi-bluff|semifaroles}} necesitan que el rival {{t:fold|se retire}} y tienen outs cuando les {{t:call|igualan}}.

## {{t:range|Rango}} {{t:polarized|polarizado}}, apuesta grande

Un {{t:range|rango}} {{t:polarized|polarizado}} apuesta grande, p. ej., 3/4 del {{t:pot|bote}}. Las manos fuertes sacan más {{t:chips|fichas}}, y los {{t:semi-bluff|semifaroles}} ganan de inmediato más a menudo. Las manos medias {{t:check|pasan}}. Cuando los {{t:bluff|faroles}} y las manos fuertes apuestan con el mismo tamaño, el rival no sabe qué tienes.

## El precio para los {{t:draw|proyectos}}

En el turn, al {{t:draw|proyecto}} solo le queda una carta. Una apuesta grande le obliga a pagar demasiado:

| Tu apuesta | El rival necesita | El {{t:flush|color}} tiene | La {{t:straight|escalera}} abierta tiene |
|---|---|---|---|
| 1/4 del {{t:pot|bote}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 del {{t:pot|bote}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 del {{t:pot|bote}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 del {{t:pot|bote}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| {{t:pot|Bote}} entero | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Con una apuesta de 1/4 del {{t:pot|bote}}, el {{t:flush-draw|proyecto de color}} tiene buen precio. Con 1/3 del {{t:pot|bote}}, el precio casi iguala la probabilidad del {{t:flush|color}} ({{n:eq.bet-third}} frente a {{n:odds.flush.turn-river}}), y a partir de 1/2 del {{t:pot|bote}}, el {{t:flush|color}} paga claramente demasiado, salvo que cuente con implied odds (próxima lección). Los ejercicios con {{t:draw|proyecto}} de esta lección cuentan solo las pot odds.

:::note De dónde salen estas reglas
Los conceptos de {{t:range|rango}} {{t:polarized|polarizado}} y {{t:linear|lineal}}, y la regla «un {{t:range|rango}} {{t:polarized|polarizado}} apuesta grande, las manos medias {{t:check|pasan}}», proceden de materiales de formación y aquí son una heurística; también lo es la recomendación de apostar grande con una mano fuerte y vulnerable. El solver también usa tamaños pequeños en el turn. El tamaño de 3/4 del {{t:pot|bote}} es un ejemplo para practicar, no el único tamaño bueno. Los precios de la tabla son cálculos exactos de la aplicación.
:::
