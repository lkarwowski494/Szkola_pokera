---
id: m12.l2
module: m12
order: 2
title: "Decisión frente a resultado"
sub: "Juzga la jugada, no la carta del river"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Preflop metes todo tu stack con una {{t:pair|pareja}} de ases y el rival {{t:call|iguala}} con una {{t:pair|pareja}} de reyes. En el river cae un rey y pierdes. ¿Cómo valoras tu decisión?"
    options:
      - { text: "Fue muy buena", correct: true, why: "AA gana a KK alrededor del {{n:pf.aa-vs-kk}} de las veces. Perder alrededor del {{n:res.kk-wins}} de las veces es el coste de jugar, no un error. Cada vez harías lo mismo." }
      - { text: "Fue mala, tenías que haber jugado con más cuidado", why: "Eso es juzgar por el resultado. Si la carta del river hubiera sido otra, la misma decisión parecería excelente. La decisión depende de lo que sabías antes de la carta: alrededor del {{n:pf.aa-vs-kk}} de equity." }
      - { text: "No se puede valorar porque has perdido", why: "Sí se puede: calculas la equity en el momento de decidir. El resultado de una sola mano no aporta nada." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA gana a KK all-in preflop alrededor del {{n:pf.aa-vs-kk}} de las veces. ¿En qué porcentaje de los casos pierdes pese a tomar la mejor decisión posible? Escribe un número."
    answer: res.kk-wins
    explanation: "El total menos {{n:pf.aa-vs-kk}} da alrededor del {{n:res.kk-wins}}. Más o menos una vez de cada cinco o seis, una buena decisión termina en derrota."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Tienes un {{t:flush-draw|proyecto de color}} limpio ({{n:outs.flush}} outs), en el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} {{n:ex.bet.quarter}}. {{t:call|Igualas}}, el {{t:flush|color}} no entra y pierdes {{n:ex.bet.quarter}}. ¿Cómo valoras el {{t:call|pago}}?"
    options:
      - { text: "Fue bueno", correct: true, why: "Necesitabas {{n:eq.bet-quarter}} de equity y tenías alrededor de {{n:odds.flush.turn-river}}. Un {{t:call|pago}} así gana dinero a largo plazo, aunque pierda en la mayoría de las manos sueltas." }
      - { text: "Fue malo porque el {{t:flush|color}} no entró", why: "El {{t:flush|color}} solo entra alrededor del {{n:odds.flush.turn-river}} de las veces, así que fallar era el resultado más probable. La decisión se juzga por el precio, y el precio era bueno." }
      - { text: "Solo habría sido bueno si el {{t:flush|color}} hubiera entrado", why: "Esa es la definición de juzgar por el resultado. La misma decisión no cambia de calidad según la carta que cayó después." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. {{t:flush-draw|Proyecto de color}} limpio, en el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} todo el {{t:pot|bote}}: {{n:ex.bet.pot}}. {{t:call|Igualas}} y el {{t:flush|color}} entra en el river. ¿Cómo valoras el {{t:call|pago}}?"
    options:
      - { text: "Fue malo, pese a ganar", correct: true, why: "Necesitabas {{n:eq.bet-pot}} de equity y tenías alrededor de {{n:odds.flush.turn-river}}. Esta vez has ganado, pero con muchas repeticiones un {{t:call|pago}} así pierde." }
      - { text: "Fue bueno porque ganaste el {{t:pot|bote}}", why: "Ganar no mejora la decisión. Con un precio de {{n:eq.bet-pot}} y una probabilidad de alrededor de {{n:odds.flush.turn-river}}, ese {{t:call|pago}} pierde a largo plazo." }
      - { text: "Fue bueno porque el {{t:flush|color}} es la mejor mano", why: "La fuerza de la mano tras ligar no cambia el precio. Lo que cuenta es la comparación: {{n:odds.flush.turn-river}} de probabilidad frente a {{n:eq.bet-pot}} necesario." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Analizas una mano perdida. ¿Qué pregunta es la más importante?"
    options:
      - { text: "Con la información que tenía, ¿la decisión tenía {{t:expected-value|EV}} positivo?", correct: true, why: "Es la única pregunta que distingue un error de la mala suerte. Calculas el precio, la equity frente al {{t:range|rango}} del rival y lo que sabías en el momento de decidir." }
      - { text: "¿Qué carta habría recibido el rival si me hubiera {{t:fold|retirado}}?", why: "Una carta futura no cambia la calidad de la decisión. Solo cuenta lo que sabías en ese momento." }
      - { text: "¿Cuánto he perdido en esta mano?", why: "El tamaño de la pérdida habla del {{t:pot|bote}}, no de la decisión. Una pérdida grande puede venir de una buena decisión, y una pequeña, de un error." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Un amigo te pregunta por la misma jugada en dos manos: en una ganó y en la otra perdió. Te parece que la primera vez jugó mejor. ¿Qué está pasando?"
    options:
      - { text: "Es el sesgo de resultado: juzgas la decisión por cómo terminó", correct: true, why: "En estudios psicológicos, la gente valoraba mejor la misma decisión cuando el resultado era bueno, incluso si pensaba que el resultado no debía importar. Ayuda valorar antes de conocer el resultado." }
      - { text: "La primera decisión fue mejor porque funcionó", why: "Si la jugada es la misma, la decisión es la misma. Solo cambia el resultado, es decir, la suerte." }
      - { text: "La segunda decisión fue mejor porque enseña humildad", why: "La valoración no depende del resultado en ningún sentido. La misma decisión tiene la misma calidad." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Durante tres {{t:session|sesiones}} has jugado más agresivo de lo habitual y has ganado. ¿Es una prueba de que el nuevo estilo es mejor?"
    options:
      - { text: "No, tres {{t:session|sesiones}} son muy pocas; las jugadas nuevas las valoras en la revisión de manos", correct: true, why: "Incluso una diferencia de habilidad enorme (el mejor {{n:skill.pct}} frente al peor {{n:skill.pct}}) solo se pone por delante en alrededor del {{n:skill.ahead}} de los casos tras unas {{n:skill.hands}} manos. La diferencia entre tus dos estilos es mucho menor." }
      - { text: "Sí, el resultado muestra lo que funciona", why: "El resultado de unas pocas {{t:session|sesiones}} es sobre todo ruido. Con una {{t:standard-deviation|desviación estándar}} de alrededor de {{n:var.sd}}, incluso {{n:var.hands.k}} mil manos dejan un error de alrededor de ± {{n:var.ci.wr}}." }
      - { text: "Sí, si has ganado más de lo habitual", why: "Una ganancia mayor con una muestra pequeña sigue siendo una muestra pequeña. Las jugadas se valoran con los números y la revisión de manos." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Un estudio de millones de manos online mostró cuándo la habilidad empieza a pesar más que la suerte. ¿Qué se midió exactamente?"
    options:
      - { text: "El mejor {{n:skill.pct}} de los jugadores supera al peor {{n:skill.pct}} en alrededor del {{n:skill.ahead}} de los casos tras unas {{n:skill.hands}} manos", correct: true, why: "Así lo definen los autores del estudio (2015). Es una comparación entre grupos extremos: con diferencias de habilidad menores hacen falta muchas más manos." }
      - { text: "Tras unas {{n:skill.hands}} manos, todo buen jugador va ganando", why: "El estudio compara grupos extremos de jugadores; no dice cuándo un buen jugador concreto irá ganando. Eso depende del winrate y de la {{t:standard-deviation|desviación estándar}} (lección sobre la {{t:variance|varianza}})." }
      - { text: "Tras unas {{n:skill.hands}} manos, la suerte deja de importar", why: "La suerte siempre importa. El estudio solo dice cuándo la ventaja de los mejores sobre los peores empieza a ganar en la mayoría de las comparaciones." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Has ganado una {{t:session|sesión}} gracias a dos pagos sin buen precio que ligaron en el river. ¿Qué haces después de la {{t:session|sesión}}?"
    options:
      - { text: "Anotas esos {{t:call|pagos}} como errores que corregir", correct: true, why: "Ganar no cambia el precio. Si el {{t:call|pago}} requería más equity de la que tenías, fue un error, aunque saliera bien." }
      - { text: "Nada, la {{t:session|sesión}} fue ganadora", why: "Los errores en {{t:session|sesiones}} ganadoras cuestan lo mismo, solo que son más difíciles de ver. Analizar solo las derrotas deja fuera la mitad de los errores." }
      - { text: "Concluyes que lees a los rivales mejor de lo que dicen los números", why: "Dos aciertos son muy pocos para sacar conclusiones sobre tu lectura de los rivales. La explicación más sencilla es la {{t:variance|varianza}}." }
---
El póker da una retroalimentación que a menudo miente. Una buena decisión puede perder y una mala, ganar. Si juzgas tu juego por los resultados, aprendes de señales aleatorias.

## Resulting: juzgar por el resultado

Los jugadores lo llaman *resulting*: das por hecho que la calidad del resultado te dice la calidad de la decisión. Los psicólogos describen el mismo fenómeno como **sesgo de resultado**. En un estudio psicológico clásico (1988), la gente valoraba la misma decisión como mejor, y a quien decidía como más competente, cuando el resultado era favorable. Lo hacían incluso cuando ellos mismos pensaban que no debían tener en cuenta el resultado.

## Las buenas decisiones también pierden

Ir all-in con una {{t:pair|pareja}} de ases contra una {{t:pair|pareja}} de reyes es la mejor decisión posible, y aun así pierde alrededor del **{{n:res.kk-wins}}** de las veces. Por otro lado, {{t:call|igualar}} con un {{t:flush-draw|proyecto de color}} una apuesta de todo el {{t:pot|bote}} en el turn es malo (necesitas {{n:eq.bet-pot}}, tienes alrededor de {{n:odds.flush.turn-river}}), y aun así gana más o menos una vez de cada cinco.

```formula
calidad de la decisión = EV con la información que tenías en el momento de decidir
```

## Cómo analizar una mano

1. Tapa el resultado. Valora solo lo que sabías en el momento de decidir.
2. Calcula el precio y la equity frente al {{t:range|rango}} del rival (M2, M6).
3. Comprueba si la jugada cumple las reglas del curso.
4. Analiza también las manos ganadas: los errores que salieron bien cuestan lo mismo.

## Cuándo el resultado empieza a significar algo

En un estudio de alrededor de {{n:skill.sample.m}} millones de manos online (un estudio de 2015), la habilidad solo empezaba a pesar más tras unas **{{n:skill.hands}}** manos. Esto significa que el mejor {{n:skill.pct}} de los jugadores superaba al peor {{n:skill.pct}} en alrededor del {{n:skill.ahead}} de las comparaciones. Con diferencias de habilidad menores hacen falta muchas veces más manos. Por eso, el resultado de unas pocas {{t:session|sesiones}} no te dice qué estilo de juego es mejor.

:::note La evaluación en esta aplicación
Por eso la aplicación evalúa tus decisiones, no el resultado de la mano. Cuando el resultado y la decisión no coinciden, fíate de los números.
:::
