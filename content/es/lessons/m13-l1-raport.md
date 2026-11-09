---
id: m13.l1
module: m13
order: 1
title: "Cómo leer el informe de la partida"
sub: "Decisión, resultado y niveles de valoración"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Vas all-in con una {{t:equity}} de {{n:m13.eq.example}} y pierdes. ¿En qué porcentaje de estas manos pierdes a pesar de haber tomado una buena decisión? Escribe un número."
    answer: m13.lose.example
    explanation: "Pierdes en 1 − e de las manos: el total menos {{n:m13.eq.example}} da {{n:m13.lose.example}}. Esta derrota no dice nada sobre la decisión."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Vas all-in diez veces con una {{t:equity}} de {{n:m13.eq.example}}. ¿Cuántas de estas manos perderás de media? Escribe un número."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Si pierdes dos veces seguidas, sigue entrando en las cuentas."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Tienes una {{t:equity}} de {{n:m13.eq.example2}} en un all-in. ¿En qué porcentaje de estas manos pierdes? Escribe un número."
    answer: m13.lose.example2
    explanation: "El total menos {{n:m13.eq.example2}} da {{n:m13.lose.example2}}: pierdes más o menos una de cada tres manos así, y la decisión sigue siendo buena."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "En este spot, el solver juega tu mano más o menos a partes iguales: {{t:raise|subida}} o {{t:fold|retirada}}. {{t:fold|Te has retirado}}. ¿Cómo lo valorará el informe?"
    options:
      - { text: "Acorde", correct: true, why: "Sí: una acción que el solver juega en al menos {{n:range.mixed.low}} de los casos es acorde. En equilibrio, el jugador solo mezcla jugadas con el mismo {{t:expected-value|valor esperado}}, así que ambas son correctas." }
      - { text: "Error, porque había que {{t:raise|subir}}", why: "No: con una {{t:mixed-hand|mano mixta}}, ambas jugadas tienen el mismo {{t:expected-value|valor esperado}}. El informe no penaliza elegir una de ellas." }
      - { text: "Sin valorar", why: "No: el spot tiene resultado del solver, así que la decisión está valorada. «Sin valorar» se asigna a una decisión para la que la aplicación no tiene una regla comprobable." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "El solver juega tu mano con {{t:raise|subida}} en aprox. {{n:range.mixed.high}} de los casos y con {{t:call|pago}} en el resto. {{t:call|Has pagado}}. ¿Cuál es el veredicto?"
    options:
      - { text: "Acorde", correct: true, why: "Sí: un {{t:call}} jugado en aprox. {{n:range.mixed.low}} de los casos no baja del umbral de acorde ({{n:range.mixed.low}}). Es una {{t:mixed-hand|mano mixta}}." }
      - { text: "Aceptable", why: "Es aceptable la acción jugada en al menos {{n:range.mixed.min}}, pero con menos frecuencia que en {{n:range.mixed.low}} de los casos. Aquí el {{t:call}} alcanza el umbral de acorde." }
      - { text: "Error", why: "Un error es una acción que el solver no juega nunca. Una acción jugada con menos frecuencia que en {{n:range.mixed.min}} de los casos es una imprecisión." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "En un spot en el que el solver juega 3-bet, haces 3-bet, pero a un tamaño distinto del que recomienda la regla. ¿Cuál es el veredicto?"
    options:
      - { text: "Imprecisión", correct: true, why: "Sí: buena acción, tamaño equivocado. Cuenta como un error y vuelve en los repasos, pero el informe muestra una explicación aparte del tamaño." }
      - { text: "Acorde", why: "La acción es buena, pero el tamaño importa: un 3-bet demasiado pequeño le da al rival un buen precio, y uno demasiado grande arriesga más de lo necesario." }
      - { text: "Error", why: "El error se asigna a una acción equivocada. Una buena acción con un tamaño equivocado es un nivel aparte: imprecisión." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Informe: «Valoradas 14 de 30 decisiones». ¿Qué significan las decisiones restantes?"
    options:
      - { text: "La aplicación no tenía para ellas una regla comprobable ni un resultado del solver", correct: true, why: "Sí: «sin valorar» no significa «bien». Esas decisiones pudieron ser buenas o malas; el informe no lo sabe y lo dice abiertamente." }
      - { text: "Fueron buenas, por eso el informe no las muestra", why: "No: el informe cuenta las decisiones buenas como acordes. «Sin valorar» es falta de valoración, no un elogio." }
      - { text: "Eran demasiado fáciles para valorarlas", why: "No es cuestión de dificultad. Se valoran las decisiones para las que la aplicación tiene una regla con condición o un spot del solver." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Tras la {{t:session|sesión}} has ganado bastantes {{t:chips|fichas}}, pero el informe muestra cinco errores. ¿Qué dice más sobre tu juego?"
    options:
      - { text: "La valoración de las decisiones", correct: true, why: "Sí: unas decenas de manos son demasiado pocas para que el resultado diga algo. Incluso tras miles de manos, el resultado es en gran parte ruido, y cada error tiene su precio independientemente de cómo terminara la mano." }
      - { text: "El resultado en {{t:chips|fichas}}", why: "El resultado de una {{t:session|sesión}} corta depende sobre todo de las cartas. Precisamente por eso el informe lo muestra con una letra más pequeña." }
      - { text: "Ambos por igual", why: "Un resultado de unas decenas de manos no dice casi nada sobre la habilidad. Una decisión valorada con una regla o con el solver dice mucho más." }
---
El informe tras la {{t:session|sesión}} valora tus decisiones, no cuánto has ganado. Esta lección explica cómo leerlo.

## Decisión, no resultado

En el módulo de mental game aprendiste el principio: valoras la decisión con la información que tenías en el momento de tomarla, no el resultado de la mano. El informe lo aplica al pie de la letra: valora la situación anterior a tu acción y no ve las cartas de los rivales ni las que salieron después.

Perder con la mejor mano entra dentro de las cuentas. La {{t:equity|equity}} es la proporción de victorias en muchas repeticiones de la misma situación. Con una {{t:equity}} de {{n:m13.eq.example}} pierdes en aprox. {{n:m13.lose.example}} de las manos, es decir, de media {{n:m13.lose.of-ten}} de cada {{n:m13.ten}}.

```formula
probabilidad de perder = 1 − equity
```

## Niveles de valoración

- **Acorde**: la acción que recomienda la regla, o la que el solver juega en al menos {{n:range.mixed.low}} de los casos (este umbral es un ajuste de la aplicación).
- **Aceptable**: el solver la juega rara vez (al menos {{n:range.mixed.min}}, pero con menos frecuencia que {{n:range.mixed.low}}) o la regla habla de frecuencia («a menudo», «con menos frecuencia») y tú elegiste la opción menos frecuente. No es un error.
- **Imprecisión**: buena acción con un tamaño equivocado, o una acción que el solver juega, pero con menos frecuencia que en {{n:range.mixed.min}} de los casos. Cuenta como un error: es un ajuste de la aplicación, no teoría.
- **Error**: una acción contraria a una regla formulada de forma categórica, o una que el solver no juega nunca.
- **Sin valorar**: la aplicación no tiene una regla comprobable para esta decisión. No significa «bien».
- **Tiempo agotado**: con el límite activado, la aplicación jugó por ti. Esa decisión no cuenta para la valoración, pero vuelve en los repasos.

En la parte superior del informe aparece el recuento «Valoradas X de Y decisiones». Después del flop muchas decisiones quedan sin valorar, porque la mayoría de las reglas del turn y el river hablan de frecuencias de todo el {{t:range|rango}}, no de una sola mano.

## {{t:mixed-hand|Mano mixta}}

Cuando el solver juega tu mano de dos maneras, ambas son correctas. La teoría del equilibrio lo explica con el principio de indiferencia: el jugador solo mezcla jugadas que tienen el mismo {{t:expected-value|valor esperado}}. Por eso el informe no penaliza elegir una de ellas y marca la jugada menos frecuente como aceptable cuando el solver la juega en al menos {{n:range.mixed.min}} de los casos; con menos frecuencia, es una imprecisión (ajuste de la aplicación).

## Resultado en {{t:chips|fichas}}

El resultado está al final del informe, en letra pequeña. Según las cuentas de la lección sobre la {{t:variance|varianza}}, tras unas {{n:m13.noise.hands.k}} mil manos el intervalo {{n:var.conf95}} del winrate es de aprox. ± {{n:m13.noise.ci}}, así que el resultado es casi puro ruido: un jugador ganador puede estar en negativo, y uno perdedor, muy en positivo. Una {{t:session|sesión}} tiene unas decenas de manos, así que el resultado no dice casi nada sobre tu juego.

:::note De dónde salen estos principios
Principio de indiferencia: materiales sobre los fundamentos de la teoría del equilibrio. El umbral de jugada infrecuente y el nombre «imprecisión»: material sobre cómo evaluar tu propio juego frente a un solver. El umbral de {{n:range.mixed.low}} es un ajuste de la aplicación, sin fuente. La {{t:variance|varianza}} del resultado y la probabilidad de perder son cálculo.
:::
