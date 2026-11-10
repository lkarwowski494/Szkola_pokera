---
id: m13.l3
module: m13
order: 3
title: "Revisión de manos de partidas reales"
sub: "Qué revisar y cómo"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Durante una partida en vivo te toca una mano en la que no sabes qué hacer. ¿Qué haces con ella después?"
    options:
      - { text: "La apunto brevemente y la reviso después de la {{t:session|sesión}}", correct: true, why: "Sí: durante la partida solo marcas la mano y la analizas después, con la cabeza despejada. El juicio bajo el efecto de las emociones puede ser erróneo." }
      - { text: "La analizo en el momento, mientras la recuerdo", why: "Basta con una nota breve para no olvidarla. El análisis completo lo haces después, con la cabeza despejada." }
      - { text: "Nada, lo que cuenta es la siguiente mano", why: "Merece la pena revisar las manos en las que no sabías qué hacer. Márcalas y vuelve a ellas después de la {{t:session|sesión}}." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Acabas de perder un {{t:pot|bote}} grande y estás alterado. ¿Cuándo es mejor revisar esta mano?"
    options:
      - { text: "Al cabo de unas horas o al día siguiente", correct: true, why: "Sí: el mejor momento para revisar es unas horas o unos días después de la {{t:session|sesión}}, con la cabeza despejada. Justo después de perder es fácil confundir una buena decisión con un error, o al revés." }
      - { text: "Enseguida, para no olvidar los detalles", why: "Los detalles los apuntas enseguida, pero la valoración la aplazas. Con las emociones a flor de piel, la valoración está teñida por el resultado." }
      - { text: "Nunca, porque es mala suerte", why: "Puede que sea mala suerte o puede que sea un error. Solo lo sabrás revisándola cuando se calmen las emociones." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "¿Cuál de estas manos merece menos un análisis largo?"
    options:
      - { text: "Un set pierde contra un set mayor en una {{t:board|mesa}} {{t:dry|seca}}; ambos metisteis todo el stack", correct: true, why: "Sí: es un cooler. Ningún jugador razonable {{t:fold|se retiraría}} aquí con un set. Los coolers le pasan a todo el mundo y enseñan poco." }
      - { text: "Un {{t:pot|bote}} grande perdido en el que, en el river, no sabías si {{t:call|igualar}}", why: "Es un buen candidato para revisar: un {{t:pot|bote}} grande y una decisión difícil." }
      - { text: "Un {{t:pot|bote}} mediano en el que el rival te superó y te sentiste perdido", why: "Merece la pena revisar manos así: sentiste que algo salió mal, y conviene ver qué." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Has perdido un {{t:pot|bote}} grande, pero crees que jugaste bien. ¿Merece la pena revisarlo?"
    options:
      - { text: "Sí: en un {{t:pot|bote}} grande las decisiones son las que más pesan, aunque hayas jugado bien", correct: true, why: "Sí: los {{t:pot|botes}} grandes, sobre todo los perdidos, son las decisiones de mayor peso. Aunque hayas jugado bien, merece la pena saber por qué. Solo te saltas los coolers evidentes." }
      - { text: "No: si jugué bien, no hay nada que buscar", why: "La seguridad sin revisión sigue siendo solo una primera reacción. Un {{t:pot|bote}} grande es un buen motivo para revisarlo." }
      - { text: "Solo si perdí contra una mano poco común", why: "El tipo de mano del rival no es lo que decide. Lo que cuenta es si la decisión fue difícil o el {{t:pot|bote}} grande." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Empiezas a revisar una decisión en el river. ¿Qué haces primero?"
    options:
      - { text: "Apunto mi primera reacción, p. ej. «es fácil {{t:call|igualar}}», y solo después hago cuentas", correct: true, why: "Sí: comparar la primera reacción con las cuentas muestra dónde te engaña la intuición. Con el tiempo, la intuición mejora." }
      - { text: "Calculo la {{t:equity}} enseguida", why: "Las cuentas son necesarias, pero sin la primera reacción por escrito no verás dónde se equivoca la intuición." }
      - { text: "Miro qué cartas tenía el rival", why: "Las cartas del rival en el showdown son el resultado, no información del momento de la decisión. Valoras la decisión frente a sus manos posibles." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Estás revisando la decisión de {{t:call|igualar}} en el river. Incluso con una suposición pesimista sobre el {{t:range|rango}} del rival (pocos {{t:bluff|faroles}}), tienes suficiente {{t:equity}}. ¿Y ahora qué?"
    options:
      - { text: "Puedo terminar: la decisión es buena con cualquier suposición razonable", correct: true, why: "Sí: las suposiciones extremas marcan el intervalo. Si la decisión es buena incluso con la pesimista, la realista también la confirmará." }
      - { text: "Aún tengo que calcular el caso realista", why: "No hace falta: la suposición realista está entre las extremas y, como ambas llevan a la misma conclusión, el resultado no cambiará." }
      - { text: "Cambio a una suposición optimista, porque la pesimista es exagerada", why: "Empiezas por los extremos para marcar el intervalo. Si la pesimista da un buen resultado, la optimista, con más razón." }
---
La aplicación revisa por ti las manos de las partidas contra bots. Las manos jugadas fuera de la aplicación las revisas tú. Esta lección reúne consejos de entrenadores.

## Marca durante la partida, analiza después de la {{t:session|sesión}}

Durante la partida solo marcas las manos que te parecieron interesantes, difíciles o raras: basta con una nota breve. Lo mejor es revisarlas unas horas o unos días después de la {{t:session|sesión}}, con la cabeza despejada. El peor momento es justo después de una gran pérdida o cuando estás cansado.

## Qué revisar

- Los {{t:pot|botes}} grandes, sobre todo los perdidos: ahí es donde más pesan las decisiones.
- Las manos en las que no sabías qué hacer o sentiste que el rival te superó.
- También las ganadas: un error que salió bien cuesta lo mismo (lección sobre decisión y resultado).

No dedicas mucho tiempo a los coolers ni a los bad beats. Un cooler es una mano en la que se encuentran dos manos fuertes y ninguna podía razonablemente {{t:fold|retirarse}}, p. ej. un set contra un set mayor. Estas manos le pasan a todo el mundo y enseñan poco.

## Cómo revisar una decisión

1. Apunta la mano: {{t:position|posiciones}}, stacks, acciones y tamaños en cada {{t:street|calle}}.
2. Apunta tu primera reacción: si la decisión parece fácil o difícil.
3. Calcula: el precio, la {{t:equity}} y lo que sabías en el momento de la decisión.
4. Comprueba la decisión con tres suposiciones sobre el {{t:range|rango}} del rival: optimista, pesimista y realista. Si es buena incluso con la pesimista, puedes terminar.
5. Apunta la diferencia entre la primera reacción y las cuentas. Con el tiempo, la intuición mejora.

:::note De dónde salen estas reglas
Tres materiales formativos sobre la revisión de manos: cuándo y qué revisar; coolers y bad beats; primera reacción y tres suposiciones sobre el rival. Son heurísticas de entrenadores, no resultados de un solver.
:::
