---
id: m6.l1
module: m6
order: 1
title: "MDF y alpha"
sub: "Cuánto defender cuando el rival apuesta"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.third.pot}} y el rival {{t:bet|apuesta}} {{n:ex.third.bet}}. ¿Qué parte mínima de tu {{t:range|rango}} debes defender ({{t:call|igualar}} o {{t:raise|subir}}) para que su {{t:bluff|farol}} sin opciones no gane dinero automáticamente? Escribe un porcentaje."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot|bote}} ÷ ({{t:pot|bote}} + apuesta) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. El rival arriesga {{n:ex.third.bet}} para ganar {{n:ex.third.pot}}, así que su {{t:bluff|farol}} gana dinero cuando te {{t:fold|retiras}} en más del {{n:alpha.bet-third}} de los casos."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} todo el {{t:pot|bote}}: {{n:ex.bet.pot}}. ¿Cuánto es el {{t:mdf}}? Escribe un porcentaje."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Con una apuesta del tamaño del {{t:pot|bote}}, el {{t:bluff|farol}} arriesga lo mismo que puede ganar, así que basta con que te {{t:fold|retires}} la mitad de las veces para que quede a cero."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} medio {{t:pot|bote}}: {{n:ex.bet.half}}. ¿Cuánto es el {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. Esa es la parte de tu {{t:range|rango}} que defiendes para que un {{t:bluff|farol}} sin opciones no gane dinero." }
      - { text: "{{n:alpha.bet-half}}", why: "Eso es alpha: con qué frecuencia debe funcionar el {{t:bluff|farol}} del rival. El {{t:mdf}} es lo que falta hasta el total, es decir, {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "Eso es la equity necesaria para {{t:call|igualar}} con una sola mano (del M2). El {{t:mdf}} indica qué parte de todo tu {{t:range|rango}} defiendes." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} más que el {{t:pot|bote}}: {{n:ex.bet.overbet}}. ¿Cuánto es el {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Cuanto mayor es la apuesta, menor es la parte de tu {{t:range|rango}} que debes defender." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Eso es alpha: con esa frecuencia debe funcionar un {{t:bluff|farol}} de {{n:ex.bet.overbet}}. Tú defiendes el resto, es decir, {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "Eso es la equity necesaria para {{t:call|igualar}}: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Otro número, otra pregunta." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Faroleas}} con una mano sin opciones: en el {{t:pot|bote}} hay {{n:ex.pot}} y {{t:bet|apuestas}} {{n:ex.bet.half}}. ¿Con qué frecuencia debe {{t:fold|retirarse}} el rival para que el {{t:bluff|farol}} quede a cero? Escribe un porcentaje."
    answer: alpha.bet-half
    explanation: "Alpha = apuesta ÷ ({{t:pot|bote}} + apuesta) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Arriesgas {{n:ex.bet.half}} para ganar {{n:ex.pot}}: si el rival se {{t:fold|retira}} con más frecuencia, el {{t:bluff|farol}} gana dinero."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Faroleas}}: en el {{t:pot|bote}} hay {{n:ex.pot}} y {{t:bet|apuestas}} {{n:ex.bet.three-quarters}}. ¿Con qué frecuencia debe {{t:fold|retirarse}} el rival para que el {{t:bluff|farol}} sea rentable?"
    options:
      - { text: "En más del {{n:alpha.bet-three-quarters}} de los casos", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Ese es el alpha de una apuesta de 3/4 del {{t:pot|bote}}." }
      - { text: "En más del {{n:mdf.bet-three-quarters}} de los casos", why: "Eso es el {{t:mdf}}, es decir, cuánto debería defender el rival. Alpha es la parte con la que puede {{t:fold|retirarse}} antes de que tu {{t:bluff|farol}} empiece a ganar dinero: {{n:alpha.bet-three-quarters}}." }
      - { text: "En más del {{n:eq.bet-three-quarters}} de los casos", why: "Eso es la equity que necesita el rival para {{t:call|igualar}}. El umbral del {{t:bluff|farol}} lo calculas sin su {{t:call|igualada}} en el denominador: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.pot}}. ¿Qué {{t:bluff|farol}} sin opciones necesita menos {{t:fold|retiradas}} del rival: uno de {{n:ex.bet.quarter}} o uno de {{n:ex.bet.pot}}?"
    options:
      - { text: "El de {{n:ex.bet.quarter}}: basta con más del {{n:alpha.bet-quarter}} de {{t:fold|retiradas}}", correct: true, why: "Un {{t:bluff|farol}} pequeño arriesga poco: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. Un {{t:bluff|farol}} por todo el {{t:pot|bote}} necesita más del {{n:alpha.bet-pot}} de {{t:fold|retiradas}}." }
      - { text: "El de {{n:ex.bet.pot}}: basta con más del {{n:alpha.bet-quarter}} de {{t:fold|retiradas}}", why: "Al revés. Una apuesta mayor arriesga más, así que el rival debe {{t:fold|retirarse}} con más frecuencia: con todo el {{t:pot|bote}}, más del {{n:alpha.bet-pot}}." }
      - { text: "Los dos necesitan lo mismo", why: "Alpha depende del tamaño: {{n:alpha.bet-quarter}} con {{n:ex.bet.quarter}} y {{n:alpha.bet-pot}} con {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, el rival {{t:bet|apuesta}} 1/3 del {{t:pot|bote}}. El {{t:mdf}} es {{n:mdf.bet-third}} y para {{t:call|igualar}} necesitas {{n:eq.bet-third}} de equity. ¿Cómo se concilian estos dos números?"
    options:
      - { text: "El {{t:mdf}} se refiere a todo tu {{t:range|rango}}; la equity, a una sola mano", correct: true, why: "El {{t:mdf}} indica qué parte de todas tus manos defiendes para que el rival no pueda {{t:bluff|farolear}} con cualquier carta. La equity necesaria indica si {{t:call|igualar}} con una mano concreta es rentable frente a aquello con lo que el rival {{t:bet|apuesta}} de verdad." }
      - { text: "Uno de los dos está mal calculado", why: "Los dos son correctos: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} y {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Responden a preguntas distintas." }
      - { text: "{{t:call|Igualas}} cuando tienes al menos {{n:mdf.bet-third}} de equity", why: "Mezcla de conceptos. Para {{t:call|igualar}} basta con {{n:eq.bet-third}} de equity. {{n:mdf.bet-third}} es una parte del {{t:range|rango}}, no la probabilidad de una sola mano." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Defiendes la {{t:big-blind|ciega grande}} y el botón {{t:bet|apuesta}} un c-bet de 1/3 del {{t:pot|bote}}. El {{t:mdf}} es {{n:mdf.bet-third}}. ¿Tienes que defender tantas manos?"
    table: { position: BB }
    options:
      - { text: "No, puedes defender algo menos", correct: true, why: "El {{t:mdf}} supone un {{t:bluff|farol}} sin ninguna opción. En el flop, los {{t:bluff|faroles}} del botón aún tienen equity ({{t:draw|proyectos}}, cartas altas) y tú, {{t:out-of-position|fuera de posición}}, no realizarás toda la equity de tus manos débiles. Por eso puedes defender algo menos que el {{t:mdf}}, pero ante un c-bet pequeño no te {{t:fold|retiras}} en masa." }
      - { text: "Sí, si no, el botón gana dinero con cualquier mano", why: "En el river sería así. En el flop, el botón no {{t:bluff|farolea}} con una mano sin opciones: aunque lo {{t:call|iguales}}, puede ligar. El {{t:mdf}} es un punto de referencia, no una obligación." }
      - { text: "No, defiendes más porque solo es el flop", why: "Al revés. Las {{t:street|calles}} futuras favorecen al que apuesta {{t:in-position|en posición}}, así que defiendes menos, no más." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Un jugador que, por muchas manos anteriores, sabes que rara vez {{t:bluff|farolea}} {{t:bet|apuesta}} todo el {{t:pot|bote}} en el river. Tienes {{t:pair|pareja}} de reyes con un kicker débil. ¿Qué haces?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Por muchas manos anteriores sabes que este jugador rara vez {{t:bluff|farolea}}. Cuando faltan {{t:bluff|faroles}}, tu {{t:pair|pareja}} paga sobre todo a manos mejores (KQ, sets). Contra un jugador así, te {{t:fold|retiras}} con más frecuencia de lo que indica el {{t:mdf}}." }
      - { text: "{{t:call|Igualo}}, porque el {{t:mdf}} manda defender {{n:mdf.bet-pot}}", why: "El {{t:mdf}} te protege frente a un jugador que {{t:bluff|farolea}} con suficiente frecuencia. Este jugador no lo hace, así que ceñirte al {{t:mdf}} le regala dinero." }
      - { text: "{{t:raise|Subo}} all-in", why: "Las manos mejores pagarán y las peores se {{t:fold|retirarán}}. Una {{t:pair|pareja}} con kicker débil no es una mano para {{t:raise|subir}}." }
---
Cuando el rival {{t:bet|apuesta}}, no te preguntas solo «¿puede ganar esta mano?». También miras todas las manos que puedes tener en esta situación, es decir, tu {{t:range|rango}}. Dos números te dicen cuántas de ellas defender y con qué frecuencia debe funcionar el {{t:bluff|farol}} del rival.

## Alpha: con qué frecuencia debe funcionar un {{t:bluff|farol}}

Un {{t:bluff|farol}} sin opciones solo gana cuando el rival se {{t:fold|retira}}. Arriesgas la apuesta para ganar el {{t:pot|bote}}.

```formula
alpha = apuesta ÷ (bote + apuesta)
```

Ejemplo: en el {{t:pot|bote}} hay {{n:ex.pot}} y {{t:bet|apuestas}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Si el rival se {{t:fold|retira}} con más frecuencia, tu {{t:bluff|farol}} gana dinero incluso sin ninguna mano.

## {{t:mdf}}: cuánto debes defender

El {{t:mdf}} (frecuencia mínima de defensa) es la otra cara de alpha. Si defiendes ({{t:call|igualas}} o {{t:raise|subes}}) menos manos, el rival gana dinero {{t:bluff|faroleando}} con cualquier carta.

```formula
MDF = bote ÷ (bote + apuesta)
```

Ejemplo de river: en el {{t:pot|bote}} hay {{n:ex.third.pot}} y el rival {{t:bet|apuesta}} {{n:ex.third.bet}}, es decir, 1/3 del {{t:pot|bote}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Apuesta del rival | {{t:mdf}} | Alpha | Equity necesaria |
|---|---|---|---|
| 1/4 del {{t:pot|bote}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 del {{t:pot|bote}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 del {{t:pot|bote}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 del {{t:pot|bote}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Todo el {{t:pot|bote}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## El {{t:mdf}} no es la equity necesaria

La equity necesaria del M2 se refiere a **una sola mano**: si {{t:call|igualar}} con ella es rentable. El {{t:mdf}} se refiere a **todo tu {{t:range|rango}}**: qué parte de él defiendes. Ante una apuesta de 1/3 del {{t:pot|bote}} en el river, el {{t:mdf}} sugiere defender aprox. el {{n:mdf.bet-third}} de tus manos, y una {{t:call|igualada}} concreta es rentable cuando la mano gana en al menos el {{n:eq.bet-third}} de los casos.

## En el flop, {{t:out-of-position|fuera de posición}} defiendes menos

El {{t:mdf}} supone que el {{t:bluff|farol}} del rival no tiene ninguna opción. Eso se acerca más a la realidad en el river, donde los {{t:draw|proyectos}} ya no pueden mejorar. En el flop, los {{t:bluff|faroles}} aún tienen equity: los {{t:draw|proyectos}} y las cartas altas pueden mejorar. Además, {{t:out-of-position|fuera de posición}} no realizarás toda la equity de tus manos débiles. Por eso, en el flop y {{t:out-of-position|fuera de posición}}, puedes defender menos que el {{t:mdf}} (en flops malos para quien defiende, claramente menos) y lo tomas como punto de referencia, no como obligación; aun así, ante c-bets pequeños no te {{t:fold|retiras}} en masa. En un ejemplo de turn, el solver defendió de media cerca del {{t:mdf}}.

:::note Cuando el rival rara vez {{t:bluff|farolea}}
El {{t:mdf}} te protege frente a un jugador que {{t:bluff|farolea}} con suficiente frecuencia. Si sabes por observación que un jugador concreto {{t:bluff|farolea}} demasiado poco con apuestas grandes en el river, contra él te {{t:fold|retiras}} con más frecuencia de lo que indica el {{t:mdf}}: {{t:call|igualar}} con una {{t:pair|pareja}} más débil paga sobre todo a manos mejores. Eso es {{t:exploit|explotación}}, no una estrategia contra todo el mundo (más en el módulo 10).
:::
