---
id: m12.l4
module: m12
order: 4
title: "Bankroll y riesgo"
sub: "La varianza medida en buy-ins y cuándo bajar de límite"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "Un {{t:buy-in|buy-in}} son {{n:format.stack}}. ¿Cuántas bb tiene un bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}? Escribe un número."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Cuentas el bankroll en {{t:buy-in|buy-ins}} del {{t:stakes|límite}} en el que juegas."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Ganas {{n:var.wr.typical.high}} con una {{t:standard-deviation|desviación}} de {{n:var.sd}} y tienes {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). ¿Qué riesgo hay de perder todo el bankroll?"
    options:
      - { text: "Aprox. {{n:ror.base}}", correct: true, why: "El exponente es 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, así que RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. Es la probabilidad de que algún día pierdas todo el bankroll si nunca bajas de {{t:stakes|límite}}." }
      - { text: "Aprox. {{n:ror.half}}", why: "Eso sale con la mitad del bankroll, {{n:br.bi.move-down}} {{t:buy-in|buy-ins}}. Con {{n:br.bi.base}}, el exponente es el doble, así que el riesgo baja a aprox. {{n:ror.base}}." }
      - { text: "Cero, porque el jugador gana", why: "Un jugador ganador también puede sufrir un {{t:downswing}} más profundo que todo su bankroll. El riesgo disminuye con el bankroll, pero nunca llega a cero." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "El mismo bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desviación}} {{n:var.sd}}, pero un winrate de solo {{n:var.wr.typical.low}}. ¿Qué riesgo hay de perder el bankroll?"
    options:
      - { text: "Aprox. {{n:ror.base.wr-min}}", correct: true, why: "El winrate está en el exponente: con {{n:var.wr.typical.low}} en lugar de {{n:var.wr.typical.high}}, el exponente es tres veces menor y el riesgo sube de aprox. {{n:ror.base}} a aprox. {{n:ror.base.wr-min}}." }
      - { text: "Aprox. {{n:ror.base}}, porque el bankroll es el mismo", why: "El riesgo depende del producto winrate × bankroll. Un winrate más bajo funciona como un bankroll más pequeño: sale aprox. {{n:ror.base.wr-min}}." }
      - { text: "Aprox. {{n:ror.base.wr-ex}}", why: "Eso sale con un winrate de {{n:var.wr.ex}}. Con {{n:var.wr.typical.low}}, el riesgo es decenas de veces mayor: aprox. {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Tienes {{n:br.bi.base}} {{t:buy-in|buy-ins}}, {{t:standard-deviation|desviación}} {{n:var.sd}}, pero aún no conoces tu winrate. ¿Qué sabes del riesgo de perder todo el bankroll?"
    options:
      - { text: "Depende del winrate: con {{n:var.wr.typical.high}}, aprox. {{n:ror.base}}; con {{n:var.wr.typical.low}}, aprox. {{n:ror.base.wr-min}}", correct: true, why: "El winrate está en el exponente junto al bankroll. Si no conoces el winrate, tampoco conoces el riesgo, y con un winrate bajo el mismo bankroll da un riesgo varias veces mayor." }
      - { text: "Aprox. {{n:ror.base}}, porque solo depende del bankroll", why: "Eso sale solo con {{n:var.wr.typical.high}}. Con {{n:var.wr.typical.low}}, el mismo bankroll da aprox. {{n:ror.base.wr-min}}." }
      - { text: "Cero, porque {{n:br.bi.base}} {{t:buy-in|buy-ins}} son muchos", why: "Con un winrate positivo, el riesgo disminuye con el bankroll, pero nunca llega a cero. Con {{n:var.wr.typical.low}}, sigue siendo aprox. {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Empezaste en este {{t:stakes|límite}} con {{n:br.bi.base}} {{t:buy-in|buy-ins}}. Tras un {{t:downswing}}, tienes {{n:br.ex.below}}. ¿Qué haces?"
    options:
      - { text: "Bajas un {{t:stakes|límite}}", correct: true, why: "Has caído por debajo de la mitad del bankroll previsto ({{n:br.bi.move-down}}). Con esa cantidad de {{t:buy-in|buy-ins}}, el riesgo de perder el resto es varias veces mayor que con {{n:br.bi.base}} (con un winrate de {{n:var.wr.typical.high}} y SD {{n:var.sd}}). En un {{t:stakes|límite}} la mitad de alto, el mismo bankroll vuelve a ser casi el número completo de {{t:buy-in|buy-ins}} de ese límite." }
      - { text: "Sigues jugando, porque solo es {{t:variance|varianza}}", why: "Es cierto que probablemente sea {{t:variance|varianza}}, pero bajar de {{t:stakes|límite}} es justo lo que te protege de ella. Con {{n:br.ex.below}} {{t:buy-in|buy-ins}}, otro {{t:downswing}} puede llevárselo todo." }
      - { text: "Subes a un {{t:stakes|límite}} superior para recuperar más rápido", why: "Eso es tilt por desesperación. Un {{t:stakes|límite}} más alto con un bankroll menor en {{t:buy-in|buy-ins}} aumenta bruscamente el {{t:risk-of-ruin|riesgo de ruina}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Empezaste en este {{t:stakes|límite}} con {{n:br.bi.base}} {{t:buy-in|buy-ins}} y has perdido {{n:dd.bi.small}}. Ahora tienes {{n:br.ex.after-dd}}. ¿Qué haces?"
    options:
      - { text: "Te quedas en el {{t:stakes|límite}} y revisas tus decisiones en las manos perdidas", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}} siguen siendo más que el umbral de bajada más tardío, {{n:br.bi.move-down}}. En una simulación, un {{t:downswing}} así le ocurre a aprox. {{n:dd.p.small.100k}} de los jugadores que ganan {{n:var.wr.ex}} en {{n:var.hands.k}} mil manos, y revisar las manos permite comprobar si no se debe a errores." }
      - { text: "Bajas de {{t:stakes|límite}} enseguida", correct: true, why: "También es una buena decisión: algunas fuentes recomiendan bajar ya tras perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Bajar antes de llegar a la mitad del bankroll no es un error; hacerlo más tarde, sí." }
      - { text: "Añades {{t:buy-in|buy-ins}} de fuera para volver a tener {{n:br.bi.base}}", why: "Recargar tras cada {{t:downswing}} desvirtúa el sentido del bankroll como tope de riesgo. Fijas el umbral de antemano y lo respetas." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Tienes {{n:br.bi.base}} {{t:buy-in|buy-ins}} del {{t:stakes|límite}} actual, es decir, lo que fijaste como bankroll. El {{t:stakes|límite}} superior tiene un {{t:buy-in}} el doble de grande. ¿Subes?"
    options:
      - { text: "No, en el {{t:stakes|límite}} superior es solo la mitad del bankroll previsto", correct: true, why: "Cuentas el bankroll en {{t:buy-in|buy-ins}} del {{t:stakes|límite}} al que quieres subir. Allí tus {{n:br.bi.base}} {{t:buy-in|buy-ins}} son {{n:br.bi.move-down}}, justo el umbral de bajada." }
      - { text: "Sí, porque te va bien", why: "Un buen mes es sobre todo {{t:variance|varianza}} (lección sobre la {{t:variance|varianza}}). Subir depende del bankroll en el nuevo {{t:stakes|límite}}." }
      - { text: "Sí, porque ya tienes {{n:br.bi.base}} {{t:buy-in|buy-ins}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-ins}} del {{t:stakes|límite}} actual son solo {{n:br.bi.move-down}} en un {{t:stakes|límite}} el doble de alto." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Un jugador pierde de media en su {{t:stakes|límite}}, pero tiene un bankroll enorme. ¿De qué le sirve?"
    options:
      - { text: "Solo retrasa la pérdida", correct: true, why: "Con un winrate negativo, el resultado baja de media, así que tarde o temprano perderá el bankroll, sea cual sea su tamaño. El bankroll protege de la {{t:variance|varianza}}, no del mal juego." }
      - { text: "Lo protege de la bancarrota", why: "La fórmula del riesgo solo funciona con un winrate positivo. Un jugador perdedor perderá el bankroll con total seguridad, solo que más despacio cuanto mayor sea el bankroll." }
      - { text: "Le permite jugar en {{t:stakes|límites}} más altos", why: "Un {{t:stakes|límite}} más alto con un winrate negativo solo acelera la pérdida." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Acabas de empezar. ¿Cómo repartes el tiempo entre estudiar y jugar?"
    options:
      - { text: "Aprox. {{n:study.beginner}} de estudio", correct: true, why: "Al principio es cuando más tienes que recuperar, así que predomina el estudio." }
      - { text: "Aprox. {{n:study.min}} de estudio", why: "Es el mínimo para un jugador que ya gana. Al principio, el estudio debería predominar." }
      - { text: "Solo jugar; el aprendizaje llegará con la experiencia", why: "El resultado de la partida es un feedback pobre (lección sobre decisión y resultado). Estudiar con explicaciones y analizar manos enseña más rápido." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Ya ganas en tu {{t:stakes|límite}}. ¿Cómo repartes el tiempo?"
    options:
      - { text: "Más o menos mitad y mitad, pero nunca menos de {{n:study.min}} de estudio", correct: true, why: "También cuando ganas, lo ideal es aprox. {{n:study.winner}} de estudio, y el mínimo es {{n:study.min}}." }
      - { text: "Solo jugar, ya que ganas", why: "Aunque ganes, no bajas de {{n:study.min}} del tiempo dedicado al estudio." }
      - { text: "Aprox. {{n:study.beginner}} de estudio, como al principio", why: "Puedes, si te preparas para {{t:stakes|límites}} más altos. Si simplemente ganas en el tuyo, basta con aprox. {{n:study.winner}}." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "¿Qué señal indica que el juego puede estar dejando de estar bajo control?"
    options:
      - { text: "Después de perder, vuelves a jugar para recuperar las pérdidas", correct: true, why: "Intentar recuperar las pérdidas es una de las señales de un problema con el juego que recogen los criterios diagnósticos. Si reconoces en ti estas señales, usa los contactos de la tarjeta de juego responsable." }
      - { text: "Analizas las manos perdidas después de la {{t:session|sesión}}", why: "Es un hábito de estudio sano. Algunas señales de problema son intentar recuperar las pérdidas, jugar más tiempo del previsto y jugar con dinero prestado." }
      - { text: "Terminas la {{t:session|sesión}} según lo previsto", why: "Es un buen control del juego. Una señal de problema sería jugar más tiempo del previsto o necesitar recuperar lo perdido." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
El bankroll es toda la reserva destinada exclusivamente a jugar al póquer. En esta lección lo cuentas en **{{t:buy-in|buy-ins}}**, no en dinero: un {{t:buy-in}} es un stack completo de {{n:format.stack}} en el {{t:stakes|límite}} en el que juegas.

## {{t:risk-of-ruin|Riesgo de ruina}}

Es la probabilidad de que algún día pierdas todo el bankroll si sigues jugando en el mismo {{t:stakes|límite}}:

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

La fórmula es una aproximación con winrate y SD constantes. El winrate y la SD se indican en bb/100, y el bankroll, en bb. Con una {{t:standard-deviation|desviación}} de {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} | {{n:br.bi.base}} {{t:buy-in|buy-ins}} | {{n:br.bi.beginner}} {{t:buy-in|buy-ins}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## De qué depende el riesgo

El winrate y el bankroll van juntos en la fórmula: un winrate la mitad de alto exige un bankroll el doble de grande para el mismo riesgo. Por eso, el mismo número de {{t:buy-in|buy-ins}} da a un jugador un riesgo varias veces menor que a otro. Al principio no conoces tu winrate, y para estimarlo hacen falta muchísimas manos (lección sobre la {{t:variance|varianza}}). Con un winrate negativo, ningún bankroll te ayudará, porque protege de la {{t:variance|varianza}}, no del mal juego.

## Cuándo bajar de {{t:stakes|límite}}

Fija el umbral de antemano: bajas un {{t:stakes|límite}} como muy tarde cuando el bankroll cae a la **mitad** del número de {{t:buy-in|buy-ins}} previsto, p. ej., de {{n:br.bi.base}} a {{n:br.bi.move-down}}. Las fuentes dan umbrales que van de la mitad al bankroll completo; la mitad es el más tardío. En un {{t:stakes|límite}} la mitad de alto, el mismo bankroll vuelve a ser casi el número completo de {{t:buy-in|buy-ins}} de ese límite. Vuelves a subir, como pronto, cuando tienes un bankroll completo en {{t:buy-in|buy-ins}} del {{t:stakes|límite}} superior. Algunas fuentes recomiendan bajar antes, ya tras perder {{n:dd.bi.small}} {{t:buy-in|buy-ins}}: bajar antes del umbral de la mitad no es un error.

## Estudio y juego

Al principio dedicas aprox. {{n:study.beginner}} del tiempo al estudio y el resto, a jugar. Cuando ganas en tu {{t:stakes|límite}}, lo ideal es aprox. {{n:study.winner}}, pero nunca menos de {{n:study.min}} de estudio.

:::note Juego responsable
Algunas señales de que el juego deja de estar bajo control: juegas más tiempo del que habías previsto; después de perder, vuelves para recuperar las pérdidas; juegas con dinero que no puedes permitirte perder o pides prestado para jugar; juegas para huir de tus preocupaciones; ocultas el juego a tus seres queridos.

Dónde buscar ayuda:

{{helplines}}
:::
