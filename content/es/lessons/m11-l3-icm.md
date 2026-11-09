---
id: m11.l3
module: m11
order: 3
title: "ICM y bubble factor"
sub: "Las fichas no son dinero"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Quedan tres jugadores y cobran dos puestos. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} y {{n:m11.icm.a.s3}} {{t:chips|fichas}}. Según el {{t:icm}}, ¿qué probabilidad tiene el stack más corto de quedar 1.º? Escribe un porcentaje."
    answer: m11.icm.a.chips3
    explanation: "Probabilidad del 1.er puesto = stack ÷ todas las {{t:chips|fichas}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Los mismos stacks ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). El stack grande ha quedado 1.º. ¿Qué probabilidad tiene ahora el stack más corto de quedar 2.º?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Quedan dos jugadores con {{n:m11.icm.a.rest1}} {{t:chips|fichas}}, de las que el corto tiene {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "Esa es la probabilidad del 1.er puesto, calculada con todas las {{t:chips|fichas}}. Cuando el ganador sale del cálculo, divides solo entre las {{t:chips|fichas}} de los que quedan: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "Esa es la probabilidad total del {{t:short-stack|stack corto}} de quedar 2.º, sumando los dos posibles ganadores. La pregunta se refiere al caso en que ha ganado el stack grande." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Pagos}}: {{n:m11.icm.a.p1}} de la {{t:prize-pool|bolsa de premios}} para el 1.º y {{n:m11.icm.a.p2}} para el 2.º. Stacks {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Según el {{t:icm}}, ¿cuánto vale el stack más corto (en porcentaje de la {{t:prize-pool|bolsa de premios}})? Escribe el número."
    answer: m11.icm.a.eq3
    explanation: "Probabilidad del 1.er puesto, {{n:m11.icm.a.chips3}}; del 2.º, {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, más que su {{n:m11.icm.a.chips3}} de las {{t:chips|fichas}}."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "El stack grande tiene el {{n:m11.icm.a.chips1}} de las {{t:chips|fichas}} en juego. Según el {{t:icm}}, ¿cuánto vale en dinero?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, es decir, menos que su parte de las {{t:chips|fichas}}", correct: true, why: "El stack grande puede ganar como mucho el {{n:m11.icm.a.p1}} de la {{t:prize-pool|bolsa de premios}}, aunque tiene opciones de ganar todas las {{t:chips|fichas}}. Por eso las {{t:chips|fichas}} del líder valen menos que su parte, y las del {{t:short-stack|stack corto}}, más ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, lo mismo que su parte de las {{t:chips|fichas}}", why: "Así sería si el ganador se llevara toda la {{t:prize-pool|bolsa de premios}}. Con {{t:payout|pagos}} de {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}}, cada {{t:chips|ficha}} del stack grande vale menos: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, porque es casi seguro que gana", why: "Solo tiene un {{n:m11.icm.a.chips1}} de probabilidad de quedar 1.º, y el resto de su {{t:tournament-equity|equity de torneo}} le viene del 2.º puesto. En total, {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Burbuja}}: cuatro jugadores, cobran tres puestos. Si {{t:call|igualas}} un all-in, al perder pierdes {{n:m11.bf.loss}} de la {{t:prize-pool|bolsa de premios}} y al ganar ganas {{n:m11.bf.gain}}. ¿Cuál es el bubble factor? Escribe un número con dos decimales."
    answer: m11.bf.value
    explanation: "Bubble factor = pérdida ÷ ganancia = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Perder duele casi una vez y media más de lo que ayuda ganar."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "El bubble factor es {{n:m11.bf.value}}. ¿Cuánta equity necesitas para que {{t:call|igualar}} el all-in sea rentable? Escribe un porcentaje."
    answer: m11.bf.req
    explanation: "Equity necesaria = BF ÷ (BF + 1), es decir, pérdida ÷ (pérdida + ganancia) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. En una partida por {{t:chips|fichas}} bastaría con {{n:m11.bf.req-chips}}."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "En una partida por {{t:chips|fichas}}, para {{t:call|igualar}} este all-in basta con {{n:m11.bf.req-chips}} de equity, pero según el {{t:icm}} necesitas {{n:m11.bf.req}}. ¿Cómo se llama la diferencia?"
    options:
      - { text: "{{t:risk-premium|Prima de riesgo}} ({{n:m11.bf.premium}})", correct: true, why: "La {{t:risk-premium|prima de riesgo}} es la equity adicional que exige el {{t:icm}} por encima del precio en {{t:chips|fichas}}: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "El bubble factor es la relación entre pérdida y ganancia ({{n:m11.bf.value}}). Con él calculas la equity necesaria, y la diferencia respecto a una partida por {{t:chips|fichas}} es la {{t:risk-premium|prima de riesgo}}." }
      - { text: "Fold equity", why: "La fold equity es el beneficio que obtienes de las {{t:fold|retiradas}} del rival. Cuando {{t:call|igualas}} un all-in, no la tienes." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Burbuja}}, el ejemplo de la lección. Tu mano tiene aprox. {{n:m11.bf.example-eq}} de equity contra el {{t:range|rango}} de all-in del rival. En una partida por {{t:chips|fichas}}, {{t:call|igualar}} sería rentable, porque basta con {{n:m11.bf.req-chips}}. ¿Qué haces aquí?"
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Según el {{t:icm}}, aquí necesitas {{n:m11.bf.req}} de equity. Una mano que gana con menos frecuencia pierde dinero, aunque en {{t:chips|fichas}} saldría ganando." }
      - { text: "{{t:call|Igualo}}, porque en {{t:chips|fichas}} es rentable", why: "En un {{t:tournament|torneo}} con {{t:payout|pagos}} cuenta el dinero, no las {{t:chips|fichas}}. Perder te cuesta {{n:m11.bf.loss}} de la {{t:prize-pool|bolsa de premios}}, y ganar solo te da {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Igualo}}, porque gano más de la mitad de las veces", why: "Una mano con {{n:m11.bf.example-eq}} gana más de la mitad de las veces y, aun así, aquí es demasiado débil: el umbral es {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Burbuja}} de un {{t:tournament|torneo}}. Tienes el stack más grande de la mesa y {{t:cover|cubres}} a todos. El stack medio se retira ante ti muy a menudo. ¿Qué se deduce de esto?"
    options:
      - { text: "Puedes {{t:shove|hacer push}} con más manos, porque los rivales {{t:call|igualan}} de forma ajustada", correct: true, why: "Al {{t:call|igualar}}, el stack medio se arriesga a quedar eliminado justo antes de los premios, así que necesita mucha equity. Tú, si pierdes, solo pierdes parte de tu stack. Los rivales {{t:call|igualan}} de forma ajustada, así que te llevas el {{t:pot|bote}} sin pelea más a menudo." }
      - { text: "Juegas más ajustado para no perder el liderato", why: "El líder es quien menos riesgo tiene en la mesa. Jugar ajustado le hace renunciar a su principal ventaja: la presión sobre los stacks medios." }
      - { text: "Nada, porque el {{t:icm}} solo afecta a los {{t:short-stack|stacks cortos}}", why: "El {{t:icm}} afecta a todos: cambia cuánta equity necesita cada uno para {{t:call|igualar}}, y eso depende de toda la distribución de stacks." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "¿Qué supone el modelo {{t:icm}}?"
    options:
      - { text: "Que todos juegan igual de bien y los puestos los deciden solo los stacks", correct: true, why: "El {{t:icm}} convierte solo los stacks en probabilidades de ocupar cada puesto. No contempla la {{t:position|posición}}, las ciegas crecientes ni la ventaja de habilidad." }
      - { text: "Que el mejor jugador gana más a menudo", why: "Al contrario: el {{t:icm}} supone la misma habilidad para todos. No tiene en cuenta en absoluto la ventaja de un jugador." }
      - { text: "Que el jugador en la {{t:big-blind|ciega grande}} tiene menos probabilidades", why: "El {{t:icm}} no contempla la {{t:position|posición}} ni las ciegas: solo mira los stacks. Es una de sus limitaciones." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
En una partida por dinero (cash), una {{t:chips|ficha}} es dinero: una ganada y una perdida valen lo mismo. En un {{t:tournament|torneo}} no es así. Los premios son para los primeros puestos, y el ganador no se lleva toda la {{t:prize-pool|bolsa de premios}}, aunque se lleva todas las {{t:chips|fichas}}. Por eso hay que convertir las {{t:chips|fichas}} en dinero.

## {{t:icm}}: el stack en dinero

El modelo de {{t:chips|fichas}} independientes ({{t:icm}}) convierte los stacks en probabilidades de ocupar cada puesto. Supone que todos juegan igual de bien, así que el orden lo deciden solo los stacks.

```formula
probabilidad del 1.er puesto = tu stack ÷ todas las fichas
```

La probabilidad del 2.º puesto la calculas igual, pero por separado para cada posible ganador: restas sus {{t:chips|fichas}} y divides entre lo que queda. La {{t:tournament-equity|equity de torneo}} de un stack, es decir, su parte esperada de la {{t:prize-pool|bolsa de premios}}, es la suma de: probabilidad de un puesto × {{t:payout|pago}} de ese puesto.

## Ejemplo: tres jugadores en la {{t:bubble|burbuja}}

Cobran dos puestos: {{n:m11.icm.a.p1}} y {{n:m11.icm.a.p2}} de la {{t:prize-pool|bolsa de premios}}. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} y {{n:m11.icm.a.s3}} {{t:chips|fichas}}.

- El {{t:short-stack|stack corto}} gana el {{t:tournament|torneo}} con una probabilidad de {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Para el 2.º puesto: si gana el stack grande ({{n:m11.icm.a.chips1}}), el corto queda 2.º con una probabilidad de {{n:m11.icm.a.second3.via1}}; si gana el medio ({{n:m11.icm.a.chips2}}), con una probabilidad de {{n:m11.icm.a.second3.via2}}. En total, {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (los sumandos están redondeados).
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** de la {{t:prize-pool|bolsa de premios}}.

| Stack | Parte de las {{t:chips|fichas}} | Equity según el {{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

El {{t:short-stack|stack corto}} vale más que sus {{t:chips|fichas}}, y el grande, menos: el líder no puede llevarse más que el premio del 1.er puesto.

## Bubble factor: perder duele más

Cuatro jugadores, cobran tres puestos: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} y {{n:m11.bf.p3}}. Stacks {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (tú), {{n:m11.bf.s3}} y {{n:m11.bf.s4}}. El jugador con {{n:m11.bf.s3}} va all-in y tú lo {{t:cover|cubres}}, es decir, tienes más {{t:chips|fichas}}. Para simplificar, no tenemos en cuenta las ciegas del {{t:pot|bote}}.

- Ahora tu stack vale {{n:m11.bf.eq.now}} de la {{t:prize-pool|bolsa de premios}}.
- Si ganas: tienes {{n:m11.bf.win}}, el rival queda eliminado y todos entran en premios. Tu equity sube a {{n:m11.bf.eq.win}}, es decir, aumenta en **{{n:m11.bf.gain}}**.
- Si pierdes: te quedan {{n:m11.bf.lose}} y tu equity baja a {{n:m11.bf.eq.lose}}, es decir, disminuye en **{{n:m11.bf.loss}}**.

```formula
bubble factor = pérdida si pierdes ÷ ganancia si ganas
```

Aquí {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. La aplicación usa esta definición (pérdida ÷ ganancia): en una partida por {{t:chips|fichas}}, donde la pérdida es igual a la ganancia, el bubble factor es uno. Algunas tablas de push/fold calculan el bubble factor de otra forma, en otra escala, así que no compares sus números directamente con estos. De él se deduce la equity necesaria:

```formula
equity necesaria = BF ÷ (BF + 1)
```

Sale **{{n:m11.bf.req}}**. En una partida por {{t:chips|fichas}} arriesgas {{n:m11.bf.s3}} para ganar {{n:m11.bf.s3}}, así que bastaría con {{n:m11.bf.req-chips}}. La diferencia, {{n:m11.bf.premium}}, es la **{{t:risk-premium|prima de riesgo}}**.

La misma tendencia aparece en un equilibrio publicado para tres jugadores con stacks iguales (un artículo científico de 2008): cuando el botón y la {{t:small-blind|ciega pequeña}} ya están all-in, la {{t:big-blind|ciega grande}} {{t:call|iguala}} con {{n:m11.jamfold3.overcall.single}} de las manos en una mano aislada, pero en un {{t:tournament|torneo}} con {{t:payout|pagos}} solo con {{n:m11.jamfold3.overcall.tourn}}, es decir, solo las {{t:pocket-pair|parejas de mano}} más altas y AKs.

:::note Quién {{t:call|iguala}} ajustado
Un stack medio en la {{t:bubble|burbuja}} o en la {{t:final-table|mesa final}} (la última mesa de un {{t:tournament|torneo}}, en la que se juegan los premios más altos) {{t:call|iguala}} all-ins de forma mucho más ajustada que en una partida por {{t:chips|fichas}}. Un stack grande que {{t:cover|cubre}} a sus rivales arriesga menos y puede aprovecharlo: {{t:shove|hacer push}} con más manos, porque los rivales tienen que {{t:fold|retirarse}}. El bubble factor depende de todos los stacks de la mesa, por eso no se calcula en la mesa, sino que se practica con ejemplos para desarrollar intuición.
:::

## Limitaciones del {{t:icm}}

El {{t:icm}} no tiene en cuenta la {{t:position|posición}}, las ciegas crecientes ni la habilidad de los jugadores. Es una aproximación, no una valoración exacta de un {{t:tournament|torneo}}.
