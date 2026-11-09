---
id: m12.l1
module: m12
order: 1
title: "La varianza en números"
sub: "Qué dice un resultado de miles de manos"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Ganas de media {{n:var.wr.ex}} y vas a jugar {{n:var.hands.k}} mil manos. ¿Cuántos {{t:buy-in|buy-ins}} (de {{n:format.stack}} cada uno) es tu resultado esperado? Escribe un número."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} mil manos son {{n:var.blocks}} bloques de 100 manos. Resultado esperado = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, es decir, {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. Es una media: el resultado real puede alejarse mucho de ella."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "La {{t:standard-deviation|desviación estándar}} de tu juego es {{n:var.sd}}. ¿Cuál es la {{t:standard-deviation|desviación}} del resultado tras {{n:var.hands.k}} mil manos ({{n:var.blocks}} bloques de 100 manos)?"
    options:
      - { text: "Unos {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "La {{t:standard-deviation|desviación}} crece con la raíz cuadrada del número de bloques: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, es decir, unos {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
      - { text: "Unos {{n:var.sd.wrong.bi}} {{t:buy-in|buy-ins}}", why: "Es lo que sale si multiplicas la {{t:standard-deviation|desviación}} por el número de bloques. Las oscilaciones aleatorias se compensan en parte, así que multiplicas por la raíz cuadrada: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Unos {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "Es el resultado esperado con {{n:var.wr.ex}}, no su {{t:standard-deviation|desviación}}. La {{t:standard-deviation|desviación}} es de unos {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Ganas {{n:var.wr.ex}} con una {{t:standard-deviation|desviación}} de {{n:var.sd}}. ¿En qué intervalo estará tu resultado tras {{n:var.hands.k}} mil manos con aproximadamente un {{n:var.conf95}} de confianza?"
    options:
      - { text: "De unos {{n:var.ci.low.bi}} a unos {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Resultado esperado de {{n:var.exp.bi}} {{t:buy-in|buy-ins}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Incluso un jugador claramente ganador puede estar casi a cero tras {{n:var.hands.k}} mil manos." }
      - { text: "De unos {{n:var.ci68.low.bi}} a unos {{n:var.ci68.high.bi}} {{t:buy-in|buy-ins}}", why: "Es el intervalo de una {{t:standard-deviation|desviación}}: solo abarca unos 2 de cada 3 resultados. Para el {{n:var.conf95}} tomas {{n:var.z95}} {{t:standard-deviation|desviaciones}}: de unos {{n:var.ci.low.bi}} a unos {{n:var.ci.high.bi}}." }
      - { text: "Exactamente {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "Eso es solo la media. El resultado oscila a su alrededor varias decenas de {{t:buy-in|buy-ins}} en ambos sentidos." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Tras {{n:var.hands.k}} mil manos ({{n:var.blocks}} bloques de 100) con una {{t:standard-deviation|desviación}} de {{n:var.sd}}: ¿cuál es el error estándar de tu winrate en bb/100? Toma √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Escribe un número."
    answer: var.se.wr
    explanation: "Error estándar = SD ÷ √(número de bloques) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. El intervalo del {{n:var.conf95}} es ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Tras {{n:var.hands.k}} mil manos, tu resultado es {{n:var.wr.ex}}, con una {{t:standard-deviation|desviación}} de {{n:var.sd}}. ¿Qué sabes de tu winrate real?"
    options:
      - { text: "Con aproximadamente un {{n:var.conf95}} de confianza, está entre unos {{n:var.wr.ci.low}} y unos {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Tras {{n:var.hands.k}} mil manos solo sabes que probablemente no pierdes." }
      - { text: "Es {{n:var.wr.ex}}, porque la muestra es grande", why: "{{n:var.hands.k}} mil manos parecen muchas, pero con una {{t:standard-deviation|desviación}} de {{n:var.sd}} el error sigue siendo de unos ± {{n:var.ci.wr}}." }
      - { text: "Nada, en el póker el resultado es pura suerte", why: "Es una exageración. La muestra estrecha el intervalo, solo que despacio: el error disminuye con la raíz cuadrada del número de manos." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Quieres conocer tu winrate con una precisión de ± {{n:var.target}} y un {{n:var.conf95}} de confianza. La {{t:standard-deviation|desviación}} es de {{n:var.sd}}. ¿Cuántas manos necesitas?"
    options:
      - { text: "Unas {{n:var.need.hands.k}} mil", correct: true, why: "Bloques = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Son unas {{n:var.need.hands.k}} mil manos." }
      - { text: "Unas {{n:var.hands.k}} mil", why: "Tras {{n:var.hands.k}} mil manos, el error es de unos ± {{n:var.ci.wr}}. Para reducirlo a ± {{n:var.target}}, necesitas unas {{n:var.need.hands.k}} mil manos." }
      - { text: "Unas {{n:var.need.blocks}} manos", why: "Ese es el número de bloques de 100 manos. Hay cien veces más manos: unas {{n:var.need.hands.k}} mil." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Un jugador gana {{n:var.wr.ex}} con una {{t:standard-deviation|desviación}} de {{n:var.sd}}. ¿Con qué frecuencia sufrirá, en {{n:var.hands.k}} mil manos, un {{t:downswing}} de al menos {{n:dd.bi.small}} {{t:buy-in|buy-ins}} desde su punto más alto?"
    options:
      - { text: "Casi siempre, aprox. el {{n:dd.p.small.100k}}", correct: true, why: "Una simulación de {{n:var.hands.k}} mil manos con estos parámetros da un {{t:downswing}} así en aprox. el {{n:dd.p.small.100k}} de las ejecuciones. Un {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} es parte normal del juego de un jugador ganador." }
      - { text: "En aprox. el {{n:dd.p.small.20k}} de los casos", why: "Eso sale con una muestra más corta, de {{n:dd.hands.short.k}} mil manos. En {{n:var.hands.k}} mil manos hay muchas más ocasiones para un {{t:downswing}} profundo: aprox. el {{n:dd.p.small.100k}}." }
      - { text: "Rara vez, aprox. el {{n:var.p.lose}}", why: "Así de rara vez un jugador de {{n:var.wr.ex}} termina {{n:var.hands.k}} mil manos en pérdidas. Un {{t:downswing}} por el camino es otra cosa: ocurre casi siempre." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Dos jugadores, {{t:standard-deviation|desviación}} de {{n:var.sd}}, {{n:var.hands.k}} mil manos. Uno gana {{n:var.wr.ex}} y el otro {{n:dd.wr-low}}. ¿Con qué frecuencia sufrirá cada uno un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}}?"
    options:
      - { text: "El primero en aprox. el {{n:dd.p.big.100k}} y el segundo en aprox. el {{n:dd.p.big.100k.wr-low}} de los casos", correct: true, why: "Un winrate más bajo tira menos del resultado hacia arriba, así que los {{t:downswing|downswings}} son más profundos y más frecuentes. Con {{n:dd.wr-low}}, típico de los ganadores en microlímites, un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} ocurre en más de la mitad de las muestras." }
      - { text: "Los dos con la misma frecuencia, porque la {{t:standard-deviation|desviación}} es la misma", why: "La {{t:standard-deviation|desviación}} determina las oscilaciones, pero el winrate determina lo rápido que el resultado se aleja de ellas. Con {{n:dd.wr-low}}, un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} ocurre en aprox. el {{n:dd.p.big.100k.wr-low}} de las muestras; con {{n:var.wr.ex}}, en aprox. el {{n:dd.p.big.100k}}." }
      - { text: "Ninguno: un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} solo les pasa a los jugadores perdedores", why: "Falso. Incluso un jugador de {{n:var.wr.ex}} lo sufre en aprox. el {{n:dd.p.big.100k}} de las muestras de {{n:var.hands.k}} mil manos." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Llevas un mes con {{n:dd.bi.small}} {{t:buy-in|buy-ins}} en negativo. ¿Qué se deduce de esto?"
    options:
      - { text: "El {{t:downswing}} por sí solo no demuestra nada; revisas tus decisiones en las manos perdidas", correct: true, why: "Un {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} en {{n:var.hands.k}} mil manos le llega a casi cualquier jugador que gane entre {{n:dd.wr-low}} y {{n:var.wr.ex}} (simulación con SD {{n:var.sd}}). Si juegas bien te lo dice la revisión de tus decisiones, no el resultado por sí solo." }
      - { text: "Juegas mal y tienes que cambiar todo tu estilo de juego", why: "Los {{t:downswing|downswings}} de este tamaño les ocurren a los jugadores que ganan {{n:var.wr.ex}} (SD {{n:var.sd}}) en aprox. el {{n:dd.p.small.100k}} de las muestras de {{n:var.hands.k}} mil manos. Cambiar de estilo solo por el resultado es reaccionar al ruido." }
      - { text: "Seguro que tienes mala suerte, no tienes que revisar nada", why: "Un {{t:downswing}} también puede deberse a errores. El resultado no distingue la mala suerte de un error, pero la revisión de las manos sí puede hacerlo." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "¿Qué {{t:standard-deviation|desviación estándar}} es típica en el cash game 6-max de No-Limit Hold'em?"
    options:
      - { text: "Aprox. {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "Es lo que indican las calculadoras de {{t:variance|varianza}}. Lo más habitual es tomar como valor típico unos {{n:var.sd}}. Un estilo agresivo da una {{t:standard-deviation|desviación}} más alta." }
      - { text: "Aprox. {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "Es el winrate típico de los jugadores ganadores en microlímites. La {{t:standard-deviation|desviación}} es varias decenas de veces mayor que el winrate, y por eso los resultados oscilan tanto." }
      - { text: "Unos {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}} cada 100 manos", why: "Esa es la {{t:standard-deviation|desviación}} del resultado tras {{n:var.hands.k}} mil manos, no cada 100 manos." }
---
Tu resultado en el póker es la suma de dos cosas: lo bien que juegas y la suerte. Ambos componentes se pueden medir. El winrate indica cuánto ganas de media, y la {{t:standard-deviation|desviación estándar}}, cuánto oscila el resultado alrededor de esa media.

## Dos números en bb/100

El **winrate** es la ganancia media cada 100 manos en {{t:big-blind|ciegas grandes}}. Los jugadores ganadores en microlímites suelen tener {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

La **{{t:standard-deviation|desviación estándar}} (SD)** es la dispersión típica del resultado cada 100 manos. En el cash game 6-max suele ser de {{n:var.sd.low}}–{{n:var.sd.high}}, y como valor típico se toma {{n:var.sd}}. La {{t:standard-deviation|desviación}} es varias decenas de veces mayor que el winrate, así que el resultado de una {{t:session|sesión}}, o incluso de un mes, dice muy poco.

## El resultado tras muchas manos

Divide el número de manos entre 100 y obtendrás el número de bloques.

```formula
resultado esperado = winrate × número de bloques
desviación del resultado = SD × √(número de bloques)
intervalo del {{n:var.conf95}} = resultado esperado ± {{n:var.z95}} × desviación del resultado
```

Ejemplo: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} mil manos, es decir, {{n:var.blocks}} bloques. Esperas {{n:var.exp.bb}}, es decir, {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. La {{t:standard-deviation|desviación}} del resultado es {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, es decir, unos {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}. Con un {{n:var.conf95}} de confianza, terminarás entre unos **{{n:var.ci.low.bi}} y {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}**. El resultado esperado está unas {{n:var.z.lose}} {{t:standard-deviation|desviaciones}} por encima de cero, así que la probabilidad de estar en pérdidas tras {{n:var.hands.k}} mil manos es de aprox. el {{n:var.p.lose}}.

## Cuántas manos hacen falta para conocer tu winrate

El mismo cálculo funciona a la inversa. El error al estimar el winrate disminuye con la raíz cuadrada del número de manos:

```formula
error del winrate = SD ÷ √(número de bloques)
bloques necesarios = ({{n:var.z95}} × SD ÷ precisión)²
```

Tras {{n:var.hands.k}} mil manos, el error es de unos {{n:var.se.wr}}, así que el intervalo del {{n:var.conf95}} es ± {{n:var.ci.wr}}. Un resultado de {{n:var.wr.ex}} solo significa entonces que tu winrate real está en algún punto entre unos {{n:var.wr.ci.low}} y {{n:var.wr.ci.high}}. Para conocer tu winrate con una precisión de ± {{n:var.target}}, necesitas unas **{{n:var.need.hands.k}} mil manos**.

## Los {{t:downswing|downswings}} son normales

Un {{t:downswing}} es una caída del resultado desde su punto más alto. Simulación de un jugador de {{n:var.wr.ex}} con SD {{n:var.sd}}:

| {{t:downswing|Downswing}} desde el máximo | En {{n:dd.hands.short.k}} mil manos | En {{n:var.hands.k}} mil manos | En {{n:var.hands.k}} mil manos con {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-ins}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-ins}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note De dónde salen estos números
Resultados de una simulación: miles de ejecuciones de {{n:var.hands.k}} mil manos cada una, con un resultado aleatorio para cada bloque. Los {{t:downswing|downswings}} reales pueden ser algo más profundos, porque el resultado cambia con cada mano, no cada 100 manos. Conclusión: un {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} no demuestra que juegues mal.
:::

Son orientaciones generales, no una garantía de resultados. Si el juego deja de estar bajo control, consulta la pantalla «Ayuda».
