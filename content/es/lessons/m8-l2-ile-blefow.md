---
id: m8.l2
module: m8
order: 2
title: "Cuánto farolear"
sub: "La proporción de faroles según el tamaño de la apuesta"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y apuestas todo el {{t:pot|bote}}: {{n:ex.bet.pot}}. Tu {{t:range|rango}} son manos muy fuertes y {{t:bluff|faroles}}. ¿Qué parte de tus apuestas debería ser {{t:bluff|faroles}} para que tu rival no pueda aprovecharse de ti? Escribe un número en porcentaje."
    answer: bluff.share.bet-pot
    explanation: "Proporción de {{t:bluff|faroles}} = apuesta ÷ ({{t:pot|bote}} + 2·apuesta) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Una de cada tres apuestas es un {{t:bluff|farol}}: así, la mano del rival que solo gana a los {{t:bluff|faroles}} no gana nada ni {{t:call|igualando}} ni {{t:fold|retirándose}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y apuestas medio {{t:pot|bote}}: {{n:ex.bet.half}}. En equilibrio, ¿qué parte de tus apuestas son {{t:bluff|faroles}}? Escribe un número en porcentaje."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Una apuesta menor le da al rival un precio mejor, así que hay menos {{t:bluff|faroles}} que con una apuesta de todo el {{t:pot|bote}} ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y apuestas {{n:ex.bet.three-quarters}}. En equilibrio, ¿qué parte de tus apuestas son {{t:bluff|faroles}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. Es el mismo número que la equity que necesita el rival para {{t:call|igualar}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "Eso es alpha: con qué frecuencia tiene que funcionar un solo {{t:bluff|farol}} sin opciones. La proporción de {{t:bluff|faroles}} en el {{t:range|rango}} se calcula con ambas apuestas en el denominador: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "Eso es el {{t:mdf}}, es decir, cuánto debería defender el rival. La proporción de tus {{t:bluff|faroles}} es {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y apuestas más que el {{t:pot|bote}}: {{n:ex.bet.overbet}}. En equilibrio, ¿qué parte de tus apuestas son {{t:bluff|faroles}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Una {{t:overbet|sobreapuesta}}, es decir, una {{t:bet|apuesta}} mayor que todo el {{t:pot|bote}}, le da al rival el peor precio, así que puedes incluir en ella más {{t:bluff|faroles}} que en ninguna otra, pero aun así menos de la mitad." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Eso es alpha para este tamaño: con qué frecuencia tiene que {{t:fold|retirarse}} el rival para que un solo {{t:bluff|farol}} sea rentable. La proporción de {{t:bluff|faroles}} en el {{t:range|rango}} es {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "Esa es la proporción de {{t:bluff|faroles}} con una apuesta de todo el {{t:pot|bote}}. Con una apuesta de {{n:ex.bet.overbet}} hay más: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "¿Con qué apuesta en el river tienes más {{t:bluff|faroles}} en el {{t:range|rango}}: con 1/3 del {{t:pot|bote}} o con todo el {{t:pot|bote}}?"
    options:
      - { text: "Con todo el {{t:pot|bote}}", correct: true, why: "Con 1/3 del {{t:pot|bote}}, los {{t:bluff|faroles}} son aprox. el {{n:bluff.share.bet-third}} de las apuestas; con todo el {{t:pot|bote}}, aprox. el {{n:bluff.share.bet-pot}}. Una apuesta mayor le da al rival un precio peor, así que su {{t:call|pago}} necesita más {{t:bluff|faroles}} para ser rentable." }
      - { text: "Con 1/3 del {{t:pot|bote}}", why: "Al revés. Una apuesta pequeña le da al rival un buen precio: para {{t:call|igualar}} le basta con aprox. un {{n:bluff.share.bet-third}} de {{t:bluff|faroles}} en tus apuestas. Con más {{t:bluff|faroles}}, pagaría con beneficio." }
      - { text: "Los mismos", why: "La proporción de {{t:bluff|faroles}} depende del tamaño: aprox. {{n:bluff.share.bet-third}} con 1/3 del {{t:pot|bote}} y aprox. {{n:bluff.share.bet-pot}} con todo el {{t:pot|bote}}." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Apuestas todo el {{t:pot|bote}} en el river. Alpha es {{n:alpha.bet-pot}} y la proporción de {{t:bluff|faroles}}, {{n:bluff.share.bet-pot}}. ¿Qué indica cada uno de estos números?"
    options:
      - { text: "Alpha: con qué frecuencia tiene que {{t:fold|retirarse}} el rival; proporción: qué parte de las apuestas son {{t:bluff|faroles}}", correct: true, why: "Alpha se refiere a un solo {{t:bluff|farol}} sin opciones: no gana ni pierde cuando el rival {{t:fold|se retira}} en el {{n:alpha.bet-pot}} de los casos. La proporción de {{t:bluff|faroles}} describe la composición de tu {{t:range|rango}}: una de cada tres apuestas es un {{t:bluff|farol}}, para que el {{t:call|pago}} del rival no gane ni pierda." }
      - { text: "Son dos nombres de lo mismo; uno de ellos está mal calculado", why: "Los dos están bien calculados: alpha = apuesta ÷ ({{t:pot|bote}} + apuesta) y proporción de {{t:bluff|faroles}} = apuesta ÷ ({{t:pot|bote}} + 2·apuesta). Responden a preguntas distintas." }
      - { text: "Alpha: cuántos {{t:bluff|faroles}} tienes en el {{t:range|rango}}; proporción: con qué frecuencia el rival {{t:fold|se retira}}", why: "Al revés. Alpha es el umbral de {{t:fold|retiradas}} del rival para un solo {{t:bluff|farol}}, y la proporción de {{t:bluff|faroles}} es la composición de tu {{t:range|rango}} de apuestas." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "¿Por qué calculas la proporción de {{t:bluff|faroles}} en tus apuestas con la misma fórmula que la equity que necesita el rival para {{t:call|igualar}}?"
    options:
      - { text: "Porque la mano del rival que caza {{t:bluff|faroles}} gana justo cuando {{t:bluff|faroleas}}", correct: true, why: "Su mano pierde contra tu valor y gana a los {{t:bluff|faroles}}, así que su equity es la proporción de {{t:bluff|faroles}}. Cuando esta es igual a la equity necesaria, el {{t:call|pago}} no gana ni pierde y el rival no puede aprovecharse de ti ni pagando ni retirándose." }
      - { text: "Es casualidad; las fórmulas solo se parecen", why: "No es casualidad. Eliges la proporción de {{t:bluff|faroles}} para que la equity de la mano que caza {{t:bluff|faroles}} sea igual a su precio." }
      - { text: "Porque el rival siempre tiene exactamente la equity necesaria", why: "El rival tiene la equity que resulta de tus apuestas. Eres tú quien ajusta el número de {{t:bluff|faroles}} para que el resultado sea cero." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Apuestas todo el {{t:pot|bote}} en el river, pero tus {{t:bluff|faroles}} son la mitad de tus apuestas, no el {{n:bluff.share.bet-pot}}. ¿Qué puede hacer un rival atento?"
    options:
      - { text: "{{t:call|Igualar}} más a menudo, incluso con manos débiles que cazan {{t:bluff|faroles}}", correct: true, why: "Su {{t:call|pago}} gana la mitad de las veces y solo necesita el {{n:eq.bet-pot}}. Pagando más, gana con tus {{t:bluff|faroles}} más de lo que pierde contra tu valor." }
      - { text: "{{t:fold|Retirarse}} más a menudo", why: "Retirándose, te cede el {{t:pot|bote}} cuando vas de {{t:bluff|farol}}. Cuando hay demasiados {{t:bluff|faroles}}, el rival gana {{t:call|igualando}}." }
      - { text: "Nada; la proporción no importa", why: "Sí importa: con demasiados {{t:bluff|faroles}}, cada {{t:call|pago}} con una mano que caza {{t:bluff|faroles}} es rentable para el rival." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "En el river apuestas todo el {{t:pot|bote}} casi solo {{t:value|por valor}}, casi sin {{t:bluff|faroles}}. ¿Qué puede hacer un rival atento?"
    options:
      - { text: "{{t:fold|Retirarse}} con todas las manos que solo ganan a {{t:bluff|faroles}}", correct: true, why: "Cuando los {{t:bluff|faroles}} son menos del {{n:bluff.share.bet-pot}}, el {{t:call|pago}} con una mano que caza {{t:bluff|faroles}} pierde. Entonces el rival solo paga con manos mejores, y tus apuestas {{t:value|por valor}} cobran con menos frecuencia." }
      - { text: "{{t:call|Igualar}} más a menudo", why: "{{t:call|Igualando}}, pagaría sobre todo tu valor. Sin {{t:bluff|faroles}} en tu {{t:range|rango}}, le conviene más {{t:fold|retirarse}}." }
      - { text: "{{t:raise|Subir}} con cualquier mano", why: "{{t:raise|Subir}} contra tu mano fuerte sin una jugada mejor es una pérdida segura. El rival simplemente {{t:fold|se retira}} más a menudo." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "En el river apuestas todo el {{t:pot|bote}} con un {{t:range|rango}} de {{n:bluff.ex.range}} {{t:combo|combos}}: de valor y {{t:bluff|faroles}}. En equilibrio, ¿cuántos de ellos son {{t:bluff|faroles}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|faroles}} y {{n:bluff.ex.value}} {{t:combo|combos}} {{t:value|por valor}}: un {{t:bluff|farol}} por cada dos manos {{t:value|por valor}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "Eso es lo que saldría con alpha ({{n:alpha.bet-pot}}). Alpha es el umbral de {{t:fold|retiradas}} para un solo {{t:bluff|farol}}, no la proporción de {{t:bluff|faroles}} en el {{t:range|rango}}." }
      - { text: "{{n:bluff.ex.value}}", why: "Esos son los {{t:combo|combos}} {{t:value|por valor}}. De {{t:bluff|faroles}} hay la mitad: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "En el river necesitas algunos {{t:bluff|faroles}} para tus apuestas de todo el {{t:pot|bote}}. ¿Qué manos eliges para ellos?"
    options:
      - { text: "Las más débiles, p. ej. {{t:draw|proyectos}} de {{t:straight|escalera}} fallados o cartas altas sin opciones", correct: true, why: "Una mano sin opciones en el showdown no pierde nada si el {{t:bluff|farol}} falla: tras {{t:check|pasar}}, perdería igualmente. Por eso es ella la que {{t:bluff|farolea}}." }
      - { text: "{{t:pair|Parejas}} medias", why: "Una {{t:pair|pareja}} media a menudo gana tras {{t:check|pasar}}. Si {{t:bluff|faroleas}} con ella, las manos peores {{t:fold|se retiran}} y las mejores pagan: renuncias a ganar en el showdown." }
      - { text: "Cualquiera, mientras la proporción cuadre", why: "La proporción no lo es todo. Un {{t:bluff|farol}} con una mano que ganaría en el showdown cuesta más que un {{t:bluff|farol}} con una mano sin opciones." }
---
En la primera lección apostabas {{t:value|por valor}}. Pero si en el river solo apostaras con manos fuertes, un rival atento se retiraría con todo salvo con manos aún más fuertes, y tus apuestas casi nunca cobrarían. Los {{t:bluff|faroles}} hacen que al rival le compense pagar.

## {{t:range|Rango}} {{t:polarized|polarizado}}

En el river {{t:in-position}}, a menudo apuestas con un **{{t:range|rango}} {{t:polarized|polarizado}}** (como en M7): manos muy fuertes {{t:value|por valor}} y {{t:bluff|faroles}}, sin manos medias (esas {{t:check|pasan}}, como en la primera lección). En el river, tus {{t:bluff|faroles}} son manos sin opciones en el showdown. El rival tiene entonces muchas manos que pierden contra tu valor, pero ganan a tus {{t:bluff|faroles}}. Son los **bluff-catchers** (manos que cazan {{t:bluff|faroles}}).

## Cuántos {{t:bluff|faroles}}

El número de {{t:bluff|faroles}} lo ajustas para que el bluff-catcher del rival no gane ni pierda, tanto si {{t:call|iguala}} como si {{t:fold|se retira}}:

```formula
proporción de faroles = apuesta ÷ (bote + 2·apuesta)
```

Es la misma fórmula que la de la equity necesaria para {{t:call|igualar}} de M2. No es casualidad: un bluff-catcher gana justo cuando {{t:bluff|faroleas}}, así que su equity es la proporción de tus {{t:bluff|faroles}}. Con una apuesta de todo el {{t:pot|bote}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, es decir, una de cada tres apuestas es un {{t:bluff|farol}}.

## Apuesta mayor, más {{t:bluff|faroles}}

| Apuesta | Proporción de {{t:bluff|faroles}} | Alpha (de M6) |
|---|---|---|
| 1/3 del {{t:pot|bote}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 {{t:pot|bote}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 del {{t:pot|bote}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| Todo el {{t:pot|bote}} | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot|botes}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Una apuesta mayor le da al rival un precio peor, así que puede incluir más {{t:bluff|faroles}}. Una apuesta pequeña solo admite unos pocos.

## La proporción de {{t:bluff|faroles}} no es alpha

Alpha de M6 = apuesta ÷ ({{t:pot|bote}} + apuesta) indica con qué frecuencia tiene que {{t:fold|retirarse}} el rival para que **un solo** {{t:bluff|farol}} sin opciones no gane ni pierda. La proporción de {{t:bluff|faroles}} = apuesta ÷ ({{t:pot|bote}} + 2·apuesta) indica qué parte de **todo tu {{t:range|rango}} de apuestas** son {{t:bluff|faroles}}. Con una apuesta de todo el {{t:pot|bote}}, un {{t:bluff|farol}} necesita más del {{n:alpha.bet-pot}} de {{t:fold|retiradas}}, mientras que en tu {{t:range|rango}} tienes un {{n:bluff.share.bet-pot}} de {{t:bluff|faroles}}. En el segundo denominador hay una apuesta más porque calculas el precio del {{t:call|pago}} del rival.

## Con qué {{t:bluff|farolear}}

Para los {{t:bluff|faroles}} eliges **tus manos más débiles**, p. ej. {{t:draw|proyectos}} de {{t:straight|escalera}} fallados o cartas altas sin opciones (los {{t:flush|colores}} fallados se tratan en la lección sobre {{t:blocker|bloqueadores}}): tras {{t:check|pasar}}, perderían igualmente, así que un {{t:bluff|farol}} fallido no les quita nada. Las manos con valor en el showdown {{t:check|pasan}}.

:::note Es un punto de equilibrio, no una receta para cada rival
Estas proporciones te protegen frente a un rival que juega bien. Contra jugadores concretos puedes desviarte de ellas; lo verás en el módulo sobre la {{t:exploit|explotación}} en microlímites (M10). La fórmula de la proporción de {{t:bluff|faroles}} es un cálculo en un modelo simplificado: un {{t:range|rango}} {{t:polarized|polarizado}} contra una mano que caza {{t:bluff|faroles}} (un modelo de juguete de la teoría de juegos). La recomendación de {{t:bluff|farolear}} con las manos más débiles procede de materiales de formación y de análisis de solvers.
:::
