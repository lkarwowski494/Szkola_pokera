---
id: m13.l2
module: m13
order: 2
title: "Repasos de tus partidas y entrenamiento dirigido"
sub: "Qué pasa con tus errores"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "En una partida tenías A♥ K♥ en un {{t:board|board}} Q♥ 7♥ 2♣ y cometiste un error. En el repaso ves A♠ K♠ en un {{t:board|board}} Q♠ 7♠ 2♦. ¿La decisión correcta es la misma?"
    options:
      - { text: "Sí: todos los palos se cambiaron con un único intercambio", correct: true, why: "Los corazones pasaron a ser picas y los tréboles, diamantes, en todas partes a la vez. Sigues teniendo un {{t:flush-draw|proyecto de color}} al as y la misma fuerza de mano, así que la decisión no cambia." }
      - { text: "No: las picas son más fuertes que los corazones", why: "En Texas Hold'em todos los palos son iguales: solo importa si las cartas son del mismo palo, no de cuál." }
      - { text: "No se sabe, hay que calcularlo de nuevo", why: "No hace falta: cambiar todos los palos a la vez conserva cada jugada y cada {{t:draw|proyecto}}. Es un cálculo exacto, no una aproximación." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "¿Cuál de estos cambios NO conserva la decisión de esta situación: K♥ Q♥ en un {{t:board|board}} J♥ 8♥ 3♠?"
    options:
      - { text: "K♥ Q♥ en un {{t:board|board}} J♠ 8♠ 3♥", correct: true, why: "Aquí los palos se cambiaron solo en el {{t:board|board}}: tus corazones ya no encajan con el {{t:board|board}} y el {{t:flush-draw|proyecto de color}} ha desaparecido. Ya es otra situación." }
      - { text: "K♠ Q♠ en un {{t:board|board}} J♠ 8♠ 3♥", why: "Es un único intercambio para todas las cartas (corazones ↔ picas), así que la decisión es la misma." }
      - { text: "K♦ Q♦ en un {{t:board|board}} J♦ 8♦ 3♠", why: "Es un único intercambio (corazones → diamantes) para todas las cartas, así que la decisión es la misma." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "¿Qué decisiones del informe pasan a los repasos como tarjetas?"
    options:
      - { text: "Errores, imprecisiones y decisiones tomadas con el tiempo agotado", correct: true, why: "Sí. Una decisión aceptable no es un error, así que no crea tarjeta. La misma regla con la misma clase de mano en el mismo spot da una sola tarjeta, no varias." }
      - { text: "Todas las decisiones evaluadas", why: "Las decisiones conformes y las aceptables no necesitan corrección, y los repasos sirven para practicar lo que salió mal." }
      - { text: "Solo los errores, sin las imprecisiones", why: "Una imprecisión (p. ej., la acción correcta con el tamaño equivocado) cuenta como un error, así que también vuelve en los repasos." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "En {{n:game.recall.days}} días has cometido {{n:game.recall.count}} errores en la misma familia de spots (p. ej., defender la {{t:big-blind|ciega grande}} contra el Botón). ¿Qué hará la aplicación?"
    options:
      - { text: "Devolverá toda la familia a los repasos: manos nuevas de ese spot", correct: true, why: "Sí: una situación concreta se repite con su tarjeta, y un error que se repite en una familia devuelve ejercicios de toda la familia, con manos nuevas." }
      - { text: "Nada, las tarjetas de errores bastan", why: "Una tarjeta repite una situación concreta. Un error que se repite en una familia indica que conviene practicarla de forma más amplia." }
      - { text: "Bloqueará el área de ese módulo", why: "Un área desbloqueada tras las lecciones sigue disponible. La aplicación solo añade repasos." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Tras una {{t:session|sesión}} de unas decenas de manos, cuentas que has entrado en el bote en casi la mitad de ellas. ¿Qué se deduce de esto?"
    options:
      - { text: "Por ahora nada: la muestra es demasiado pequeña", correct: true, why: "Incluso el {{t:vpip}} se lee a partir de unas {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} manos. Con una sola {{t:session|sesión}} puedes valorar decisiones concretas, pero no tus frecuencias." }
      - { text: "Juegas demasiado suelto y tienes que cambiarlo", why: "Puede que sí, puede que no: unas decenas de manos son muy pocas para distinguir tu estilo del reparto de las cartas. Fíjate en la evaluación de cada decisión de entrar en el bote." }
      - { text: "Juegas bien, porque has ganado muchas manos", why: "El resultado no dice nada sobre la calidad de las decisiones, y una sola {{t:session|sesión}} no dice nada sobre las frecuencias." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "En una {{t:session|sesión}} te hicieron 4-bet dos veces y las dos veces te {{t:fold|retiraste}}. ¿Sabes ya que te {{t:fold|retiras}} ante 4-bet demasiado a menudo?"
    options:
      - { text: "No: cuentan las oportunidades, y dos son muy pocas", correct: true, why: "Uno de los entrenadores mira una estadística solo a partir de unas {{n:hud.opps.look}} oportunidades y gana seguridad hacia las {{n:hud.opps.sure}}. Dos oportunidades son ruido; valora cada una de esas decisiones por separado." }
      - { text: "Sí: te {{t:fold|retiras}} en todas las situaciones", why: "Dos de dos parece «siempre», pero con dos oportunidades incluso una estrategia que se {{t:fold|retira}} la mitad de las veces dará a menudo ese resultado." }
      - { text: "Sí, si ocurrió en una sola {{t:session|sesión}}", why: "Una sola {{t:session|sesión}} no añade nada: el número de oportunidades sigue siendo pequeño." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "¿Cuándo se desbloquea el área de juego «Flop: c-bet»?"
    options:
      - { text: "Al completar todas las lecciones del módulo", correct: true, why: "Sí: el área reparte solo situaciones del módulo, así que se desbloquea cuando ya conoces sus reglas. El juego libre está disponible desde el principio." }
      - { text: "Al ganar unas cuantas {{t:session|sesiones}}", why: "El resultado en {{t:chips|fichas}} no desbloquea nada: es sobre todo ruido." }
      - { text: "Desde el principio, como el juego libre", why: "El juego libre está disponible desde el primer día, y las áreas solo tras las lecciones del módulo." }
---
Cada error del informe vuelve a ti en los repasos. Esta lección te muestra cómo.

## La misma situación con otros palos

Los errores, las imprecisiones y las decisiones tomadas con el tiempo agotado se convierten en tarjetas de repaso. La tarjeta muestra la misma situación: las mismas {{t:position|posiciones}}, acciones y tamaños, los mismos valores de las cartas. Solo cambian los palos: la aplicación los cambia con un único intercambio para todas las cartas a la vez, p. ej., corazones por picas y picas por corazones.

Este intercambio no cambia la fuerza de ninguna mano ni de ningún {{t:draw|proyecto}}, porque solo importa si las cartas son del mismo palo. Por tanto, la decisión correcta es la misma, y aprendes a reconocer la situación en lugar de memorizar una imagen.

La misma regla con la misma clase de mano en el mismo spot da una sola tarjeta, no varias. Las tarjetas nuevas de tus partidas entran en los repasos dentro de un límite diario; el resto espera a los días siguientes.

## Cuando un error se repite

Si en {{n:game.recall.days}} días tienes al menos {{n:game.recall.count}} errores o imprecisiones en la misma familia de spots, la aplicación devuelve toda la familia a los repasos: ejercicios con manos nuevas de ese spot. Cuentan los errores de decisión, no las manos perdidas. Estos umbrales son valores iniciales que ajustaremos con los datos de uso de la aplicación.

## Entrenamiento dirigido

Un área de juego es un módulo del curso. Se desbloquea al completar todas las lecciones del módulo y reparte solo situaciones de ese módulo, p. ej., una c-bet tras una {{t:open|apertura}} desde el Botón. Desde el informe puedes ir directamente al área en la que tuviste más errores.

## Una {{t:session|sesión}} no es una estadística

El informe no muestra tus frecuencias, p. ej., con qué frecuencia entras en el bote. Incluso el {{t:vpip}} se lee a partir de unas {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} manos, y las situaciones poco frecuentes se dan pocas veces en una {{t:session|sesión}}. Uno de los entrenadores aconseja contar oportunidades, no manos: mira una estadística a partir de unas {{n:hud.opps.look}} oportunidades y gana seguridad hacia las {{n:hud.opps.sure}}.

:::note De dónde salen estas reglas
El intercambio de palos es un cálculo exacto: la clasificación de jugadas no distingue palos. Muestras de manos como en el módulo de {{t:exploit|explotación}} (dos materiales formativos); número de oportunidades: un material formativo sobre el tamaño de la muestra para las estadísticas del {{t:hud|HUD}}. Los umbrales de los repasos son ajustes de la aplicación, sin fuente.
:::
