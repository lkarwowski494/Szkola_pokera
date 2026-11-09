---
id: m8.l1
module: m8
order: 1
title: "Apuesta de valor en el river"
sub: "Apuesta cuando pagan manos peores"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: todas las cartas ya están en la {{t:board|mesa}}. ¿Para qué apostar?"
    options:
      - { text: "Para que paguen manos peores o para que las mejores se {{t:fold|retiren}}", correct: true, why: "En el river ya no quedan cartas por salir, así que una apuesta solo tiene dos objetivos: valor (pagan manos peores) o {{t:bluff|farol}} (se {{t:fold|retiran}} las mejores). Una apuesta que no consigue ninguna de las dos cosas solo te cuesta dinero." }
      - { text: "Para quitarle al rival la posibilidad de ligar", why: "Ese es un motivo para apostar en el flop y en el turn. En el river el rival ya no va a ligar nada: su mano es definitiva." }
      - { text: "Para comprobar si mi mano es la mejor", why: "Una apuesta no es una pregunta. Cuando apuestas con una mano media, las manos peores suelen {{t:fold|retirarse}} y pagan las mejores, así que lo «averiguas» con tu propio dinero. Gratis lo averiguarás si {{t:check|pasas}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, el rival {{t:check|pasa}}. Calculas que pagará tu apuesta en {{n:value.ex.calls}} casos: {{n:value.ex.many}} veces con una mano peor y {{n:value.ex.few}} con una mejor. No puede {{t:raise|subirte}}. ¿Apuestas?"
    options:
      - { text: "Sí, es una apuesta de {{t:value|valor}}", correct: true, why: "Ganas la apuesta {{n:value.ex.many}} veces y la pierdes {{n:value.ex.few}}: te quedan {{n:value.ex.net}} apuestas netas. Más de {{n:value.threshold}} de los {{t:call|pagos}} son manos peores, así que apostar gana más que {{t:check|pasar}}." }
      - { text: "No, porque a veces pagará con una mano mejor", why: "Una mano mejor siempre pagará en parte de los casos. Lo que importa es si hay más {{t:call|pagos}} de manos peores que de mejores: aquí son {{n:value.ex.many}} contra {{n:value.ex.few}}." }
      - { text: "Solo si el rival nunca tiene una mano mejor", why: "Entonces solo apostarías con las nuts y dejarías escapar mucho valor. Basta con que más de {{n:value.threshold}} de los {{t:call|pagos}} sean manos peores." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, el rival {{t:check|pasa}}. Pagará tu apuesta en {{n:value.ex.calls}} casos: {{n:value.ex.few}} veces con una mano peor y {{n:value.ex.many}} con una mejor. Las manos peores del rival que se {{t:fold|retiren}} perderían contra ti en el showdown de todos modos. ¿Qué haces?"
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "La apuesta ganaría {{n:value.ex.few}} veces y perdería {{n:value.ex.many}}: pierdes {{n:value.ex.net}} apuestas netas. Si {{t:check|pasas}}, ganas el {{t:pot|bote}} contra las mismas manos peores, solo que sin pagar de más a las mejores." }
      - { text: "Apuesto, porque tengo una mano decente", why: "La fuerza de la mano por sí sola no basta. Lo que importa es quién paga: aquí la mayoría de los {{t:call|pagos}} son de manos mejores, así que la apuesta pierde." }
      - { text: "Apuesto fuerte para que las manos mejores se {{t:fold|retiren}}", why: "Eso sería un {{t:bluff|farol}} con una mano que a menudo gana en el showdown. Las manos mejores rara vez se {{t:fold|retiran}} en el river, y si {{t:check|pasas}}, ganarás igualmente a las peores." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. {{n:value.ex.many}} manos peores y {{n:value.ex.few}} mejores {{t:call|igualarán}} tu apuesta. ¿Cuántas apuestas netas ganarás con estos {{n:value.ex.calls}} {{t:call|pagos}}? Escribe un número."
    answer: value.ex.net
    explanation: "Cada {{t:call|pago}} con una mano peor es una apuesta ganada y cada uno con una mano mejor, una apuesta perdida: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. El {{t:pot|bote}} contra las manos peores también lo ganarías {{t:check|pasando}}, así que solo cuentas las apuestas."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}}. Apostaste en el flop y en el turn, y las dos veces te {{t:call|igualaron}}. River, la {{t:big-blind|ciega grande}} {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Apuesto por {{t:value|valor}}", correct: true, why: "{{t:top-pair|Pareja mayor}} con el mejor kicker. Un rival que ha {{t:call|igualado}} dos {{t:street|calles}} tiene muchos reyes más débiles (KQ, KJ, KT) y nueves, y en esta {{t:board|mesa}} había pocos {{t:draw|proyectos}}. Las manos peores pagarán mucho más a menudo que las mejores ({{t:two-pair|doble pareja}}, sets). Normalmente la {{t:top-pair|pareja mayor}} aguanta dos {{t:value|calles de valor}} (M9); aquí, una tercera, porque el rival paga con reyes más débiles." }
      - { text: "{{t:check|Paso}}, porque el rival podría tener un set", why: "Podría, pero rara vez. Si {{t:check|pasas}}, pierdes la apuesta que te pagarían todos los reyes más débiles. Cuentas quién va a {{t:call|igualar}}, no si existe una mano mejor." }
      - { text: "{{t:check|Paso}} para que el rival farolee", why: "Un rival que ha {{t:call|igualado}} dos veces tiene sobre todo {{t:pair|parejas}} y rara vez {{t:bluff|farolea}} después de que {{t:check|pases}}. Ganarás de forma más segura apostando contra sus reyes más débiles." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}}. En el flop hiciste c-bet y te {{t:call|igualaron}}; en el turn ambos {{t:check|pasasteis}}. River, la {{t:big-blind|ciega grande}} {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "La {{t:second-pair|segunda pareja}} con kicker débil gana a los {{t:draw|proyectos}} fallados y a {{t:pair|parejas}} más débiles, pero esas manos se {{t:fold|retirarán}} ante una apuesta. Pagarán sobre todo los reyes y los dieces mejores. {{t:check|Pasas}} y ves el showdown gratis." }
      - { text: "Apuesto por {{t:value|valor}}", why: "¿Quién pagará? Las manos sin {{t:pair|pareja}} se {{t:fold|retirarán}}, y los reyes y los dieces mejores {{t:call|igualarán}}. La mayoría de los {{t:call|pagos}} serían de manos mejores que la tuya." }
      - { text: "Apuesto fuerte como {{t:bluff|farol}}", why: "Tu mano gana a menudo en el showdown. Si {{t:bluff|faroleas}}, renuncias a esa victoria: las manos peores se {{t:fold|retirarían}} de todos modos y los reyes rara vez se {{t:fold|retiran}}." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}}. En el flop hiciste c-bet y te {{t:call|igualaron}}; en el turn ambos {{t:check|pasasteis}}. River, la {{t:big-blind|ciega grande}} {{t:check|pasa}}. Tienes {{t:top-pair|pareja mayor}} con kicker de diez. ¿Qué manos pagarán una apuesta pequeña y serán peores que la tuya?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Ochos, cuatros y damas con peor kicker", correct: true, why: "Estas manos pagaron el flop y tienen {{t:pair|pareja}}, así que a menudo pagarán una apuesta pequeña. Pierdes contra una dama con mejor kicker, {{t:two-pair|doble pareja}}, sets y {{t:straight|escaleras}} (A5, 65), pero hay más {{t:call|pagos}} de manos peores." }
      - { text: "Manos sin {{t:pair|pareja}}", why: "Una mano sin {{t:pair|pareja}} rara vez paga una apuesta en el river; a veces paga un as alto, pero aquí hay muchas más {{t:pair|parejas}} peores." }
      - { text: "Ninguna, solo pagan manos mejores", why: "Demasiado prudente: la {{t:big-blind|ciega grande}} defiende muchas {{t:pair|parejas}} por debajo de la dama. Tras {{t:check|pasar}} en el turn, su {{t:range|rango}} contiene bastantes." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Misma situación: tienes {{t:top-pair|pareja mayor}} con kicker de diez y la {{t:big-blind|ciega grande}} pasa en el river. En el {{t:pot|bote}} hay {{n:ex.pot}}. ¿Qué haces?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Apuesta de {{n:ex.bet.quarter}}, es decir, 1/4 del {{t:pot|bote}}", correct: true, why: "Thin value: ganas a poco más de la mitad de las manos que pagarán. Los ochos, los cuatros y las damas más débiles {{t:call|igualarán}} una apuesta pequeña, así que sigue habiendo más {{t:call|pagos}} de manos peores que de mejores." }
      - { text: "Apuesta de {{n:ex.bet.pot}}, es decir, el {{t:pot|bote}} entero", sizeError: true, why: "Acción correcta, tamaño equivocado: ante una apuesta del tamaño del {{t:pot|bote}}, los ochos y los cuatros se {{t:fold|retirarán}} y pagarán sobre todo damas mejores, {{t:two-pair|dobles parejas}} y sets. Entonces la mayoría de los {{t:call|pagos}} son mejores que tu mano. El thin value se apuesta pequeño." }
      - { text: "{{t:check|Paso}}", why: "Pierdes valor: el rival tiene muchas {{t:pair|parejas}} más bajas que pagarían una apuesta pequeña. {{t:check|Pasando}} regalas ese dinero." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Un amigo dice: «En el river, con una {{t:pair|pareja}} media, apuesto para ver dónde estoy». ¿Qué falla en esta idea?"
    options:
      - { text: "Las manos peores se {{t:fold|retirarán}} y las mejores pagarán", correct: true, why: "Tras una apuesta así, las manos a las que ganas se {{t:fold|retiran}}, y las que te ganan pagan o {{t:raise|suben}}. La información la consigues gratis si {{t:check|pasas}}, porque con {{t:position|posición}} el rival enseñará sus cartas en el showdown." }
      - { text: "Nada, es una buena forma de obtener información", why: "Aquí la información te cuesta una apuesta que normalmente pierdes. Si {{t:check|pasas}}, verás la mano del rival sin pagar de más." }
      - { text: "La apuesta debería ser más grande", why: "Una apuesta más grande lo empeora: aún más manos peores se {{t:fold|retirarán}} y las mejores seguirán pagando." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Tu {{t:flush-draw|proyecto de color}} no ha entrado. En el river te planteas apostar. ¿Qué tipo de apuesta sería?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Farol}}", correct: true, why: "Solo tienes la dama como carta más alta. Ninguna mano que te {{t:call|iguale}} será peor, así que la apuesta solo puede ganar si el rival se {{t:fold|retira}}. Es un {{t:bluff|farol}} (cómo elegir los {{t:bluff|faroles}} lo verás en próximas lecciones)." }
      - { text: "Apuesta de {{t:value|valor}}", why: "Una apuesta de {{t:value|valor}} requiere que paguen manos peores. Con solo la dama como carta más alta, casi nada peor te {{t:call|igualará}}." }
      - { text: "Thin value", why: "El thin value es una apuesta con una mano que gana a poco más de la mitad de los {{t:call|pagos}}. Tu mano no gana a casi ningún {{t:call|pago}}." }
---
En el river todas las cartas ya están en la {{t:board|mesa}}. Nadie va a ligar nada, así que una apuesta solo puede conseguir dos cosas: que pague una mano peor (**valor**) o que se {{t:fold|retire}} una mejor (**{{t:bluff|farol}}**). En esta lección verás el valor; en las siguientes, los {{t:bluff|faroles}} y cuándo pagar.

## El umbral: más de la mitad de los {{t:call|pagos}}

Cuando apuestas con {{t:position|posición}} y el rival solo puede {{t:call|igualar}} o {{t:fold|retirarse}}, cuentas únicamente las manos con las que pagará:

```formula
apuesta de valor: pagos de manos peores > pagos de manos mejores
```

Cada {{t:call|pago}} con una mano peor gana una apuesta. Cada {{t:call|pago}} con una mano mejor pierde una apuesta. Cuando el rival se {{t:fold|retira}} con una mano peor, ganas el mismo {{t:pot|bote}} que si {{t:check|pasas}}. Por eso la apuesta gana dinero cuando más de **{{n:value.threshold}}** de las manos que pagan son peores que la tuya.

Ejemplo: de {{n:value.ex.calls}} {{t:call|pagos}}, {{n:value.ex.many}} son de manos peores y {{n:value.ex.few}} de mejores. Ganas {{n:value.ex.net}} apuestas netas. Si la proporción fuera la inversa, perderías lo mismo.

## Quién pagará

No te preguntas «¿tengo una buena mano?», sino «¿con qué pagará el rival?». Ayuda repasar su {{t:range|rango}}:

- las manos sin {{t:pair|pareja}} rara vez pagan; a veces paga un as alto, que gana a los {{t:bluff|faroles}},
- las {{t:pair|parejas}} más bajas y los kickers más débiles suelen pagar una apuesta pequeña,
- las manos mejores pagarán siempre y, a veces, {{t:raise|subirán}}.

Cuando el rival puede {{t:raise|subirte}} y entonces tendrías que {{t:fold|retirarte}}, el umbral es aún más alto: la apuesta solo gana dinero si hay claramente más {{t:call|pagos}} de manos peores que de mejores.

## Thin value: poco, pero cobrado

El thin value (valor fino) es una apuesta con una mano que gana a poco más de la mitad de los {{t:call|pagos}}, p. ej., con {{t:top-pair|pareja mayor}} y kicker medio. Esta apuesta la haces **más pequeña** que con una mano fuerte, normalmente de alrededor de 1/4–1/2 del {{t:pot|bote}}: una apuesta pequeña también la pagarán {{t:pair|parejas}} más débiles, pero ante una grande se {{t:fold|retirarán}} y solo quedarán manos mejores.

Es una simplificación: sin riesgo de check-raise, un solver apuesta thin value incluso de alrededor de 1/4 del {{t:pot|bote}}, y con ese riesgo, con {{t:position|posición}}, rara vez baja de 1/2 del {{t:pot|bote}}.

## Una mano media {{t:check|pasa}}

Tienes una mano media {{t:in-position|en posición}}, p. ej., {{t:second-pair|segunda pareja}}. Las manos peores del rival se {{t:fold|retirarán}} ante una apuesta y pagarán las mejores. Entonces la apuesta convierte tu mano en un {{t:bluff|farol}}. {{t:check|Pasas}}: ganarás el showdown contra las manos peores sin pagar de más a las mejores.

:::note De dónde salen estas reglas
El umbral de más de la mitad de los {{t:call|pagos}} es matemática pura (apuesta {{t:in-position|en posición}}, sin {{t:raise|subida}} y sin rake). El tamaño del thin value y {{t:check|pasar}} con una mano media proceden de análisis de solver publicados ({{t:tournament|torneos}} con stacks más cortos) y de materiales de formación.
:::
