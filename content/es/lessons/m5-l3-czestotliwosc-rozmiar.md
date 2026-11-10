---
id: m5.l3
module: m5
order: 3
title: "Con qué frecuencia y cuánto"
sub: "C-bet en posición"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Has {{t:open|abierto}} desde el botón, la {{t:big-blind|ciega grande}} ha {{t:call|igualado}} y en el flop {{t:check|pasa}}. ¿Qué plan encaja con este flop?"
    position: BTN
    options:
      check: "{{t:check|Paso}} más a menudo, c-bet menos a menudo de lo habitual"
      small: "C-bet a menudo y pequeño: {{n:cbet.size.small}} del {{t:pot|bote}} ({{n:cbet.btn.small}})"
      big: "C-bet a menudo y grande: {{n:cbet.size.big}} del {{t:pot|bote}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Demasiado prudente: en un flop {{t:dry|seco}} y alto tienes la {{t:range-advantage|ventaja de rango}}, y el rival normalmente ha fallado. Si {{t:check|pasas}}, le das una carta gratis."
          small: "Sí: un flop {{t:dry|seco}} y alto te favorece. Una {{t:bet|apuesta}} pequeña basta para que el rival se {{t:fold|retire}} con las manos débiles, y las {{t:pair|parejas}} peores la seguirán {{t:call|igualando}}."
          big: "Buena acción, tamaño equivocado: en un flop {{t:dry|seco}} el rival tiene pocos {{t:draw|proyectos}}, y las manos que han fallado se {{t:fold|retirarán}} también ante una {{t:bet|apuesta}} pequeña. Una {{t:bet|apuesta}} mayor hace que se {{t:fold|retiren}} más o menos las mismas manos, pero arriesga más. Apuesta alrededor del {{n:cbet.size.small}} del {{t:pot|bote}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Demasiado prudente: tienes la {{t:range-advantage|ventaja de rango}}, y en un flop {{t:paired|emparejado}} es difícil tener un {{t:draw|proyecto}}, así que un rival sin {{t:pair|pareja}} rara vez puede pagar ni siquiera una {{t:bet|apuesta}} pequeña."
          small: "Sí: en un flop {{t:paired|emparejado}} apuestas a menudo y poco. Un rival sin {{t:pair|pareja}} rara vez tiene con qué {{t:call|igualar}}, y ambos jugadores pueden tener {{t:three-of-a-kind|trío}}, así que no hay motivo para arriesgar más."
          big: "Buena acción, tamaño equivocado: en un flop {{t:paired|emparejado}} cualquiera de los dos puede tener {{t:three-of-a-kind|trío}}, así que una {{t:bet|apuesta}} grande no compensa, y las manos débiles del rival se {{t:fold|retirarán}} también ante una pequeña. Basta con alrededor del {{n:cbet.size.small}} del {{t:pot|bote}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Sí: un flop bajo con cartas cercanas entre sí conecta con el {{t:range|rango}} de la {{t:big-blind|ciega grande}}: defiende muchas manos con cartas pequeñas, y tus cartas altas han fallado aquí. En un flop {{t:connected|conectado}} también tiene {{t:straight|escaleras}} y {{t:two-pair|dobles parejas}}, así que normalmente no tienes {{t:nuts-advantage|ventaja de nuts}}. Haces c-bet menos a menudo que en flops altos: muchas manos {{t:check|pasan}}, y apuestan sobre todo las manos fuertes y los {{t:draw|proyectos}} fuertes."
          small: "Demasiado a menudo: un flop bajo con cartas cercanas entre sí conecta con el {{t:range|rango}} de la {{t:big-blind|ciega grande}}, y en uno {{t:connected|conectado}} normalmente no tienes {{t:nuts-advantage|ventaja de nuts}}. Los c-bets frecuentes, aunque sean pequeños, dan a la {{t:big-blind|ciega grande}} la ocasión de {{t:raise|subir}} después de haber {{t:check|pasado}} (check-raise) con sus manos más fuertes."
          big: "Demasiado a menudo y demasiado caro: este flop conecta con el {{t:range|rango}} de la {{t:big-blind|ciega grande}}, y en uno {{t:connected|conectado}} también tiene {{t:straight|escaleras}} y {{t:two-pair|dobles parejas}}. Un c-bet grande y frecuente arriesga mucho cuando tú sueles tener solo cartas altas."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "Has {{t:open|abierto}} desde el botón, la {{t:big-blind|ciega grande}} ha {{t:call|igualado}} y {{t:check|pasa}}. Tienes {{t:pair|pareja}} de reyes con jota. ¿Qué haces?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} del {{t:pot|bote}})", correct: true, why: "Sí: {{t:top-pair|pareja mayor}} (una {{t:pair|pareja}} con la carta más alta de la {{t:board|mesa}}) en un flop {{t:dry|seco}}. Una {{t:bet|apuesta}} pequeña te la {{t:call|igualan}} sietes, doses y reyes más débiles, y el rival casi no tiene {{t:draw|proyectos}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} del {{t:pot|bote}})", sizeError: true, why: "Buena acción, tamaño equivocado: en un flop {{t:dry|seco}} el rival no tiene {{t:draw|proyectos}}, y las manos que han fallado se {{t:fold|retirarán}} también ante una {{t:bet|apuesta}} pequeña. Una {{t:bet|apuesta}} mayor hace que se {{t:fold|retiren}} más o menos las mismas manos, pero arriesga más. Apuesta alrededor del {{n:cbet.size.small}} del {{t:pot|bote}}." }
      - { text: "{{t:check|Paso}}", why: "Pierdes valor: el rival tiene muchas {{t:pair|parejas}} más débiles y manos con as que pagarían una {{t:bet|apuesta}} pequeña. En un flop {{t:dry|seco}} con {{t:top-pair|pareja mayor}}, apuestas." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "Has {{t:open|abierto}} desde el botón, la {{t:big-blind|ciega grande}} ha {{t:call|igualado}} y {{t:check|pasa}}. Tienes un set de jotas en un flop con muchos {{t:draw|proyectos}}. ¿Qué haces?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} del {{t:pot|bote}})", correct: true, why: "Sí: el rival tiene muchos {{t:flush-draw|proyectos de color}} y de {{t:straight|escalera}} (p. ej., QT, AQ, dos corazones). Una {{t:bet|apuesta}} grande les hace pagar caro la siguiente carta." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} del {{t:pot|bote}})", sizeError: true, why: "Buena acción, tamaño equivocado: una {{t:bet|apuesta}} pequeña da a los {{t:draw|proyectos}} del rival una carta barata, y tu set puede perder contra un color o una {{t:straight|escalera}}. Con muchos {{t:draw|proyectos}}, apuesta grande." }
      - { text: "{{t:check|Paso}} para no asustar al rival", why: "Con muchos {{t:draw|proyectos}}, una carta gratis es un regalo para ellos. Con una mano muy fuerte, construyes el {{t:pot|bote}} desde ya." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "Has {{t:open|abierto}} desde el botón, la {{t:big-blind|ciega grande}} ha {{t:call|igualado}} y {{t:check|pasa}}. El flop está {{t:paired|emparejado}}. ¿Qué plan es el correcto aquí?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet a menudo y pequeño", correct: true, why: "Sí: tienes la {{t:range-advantage|ventaja de rango}}, y en un flop {{t:paired|emparejado}} es difícil tener un {{t:draw|proyecto}}, así que un rival sin {{t:pair|pareja}} rara vez puede pagar ni siquiera una {{t:bet|apuesta}} pequeña. También tienes más {{t:pair|parejas}} altas, p. ej., AA y KK, que la {{t:big-blind|ciega grande}} normalmente no tiene tras solo {{t:call|igualar}}." }
      - { text: "C-bet a menudo y grande", sizeError: true, why: "Buena acción, tamaño equivocado: cualquiera de los dos puede tener {{t:three-of-a-kind|trío}}, así que una {{t:bet|apuesta}} grande no compensa, y un rival sin {{t:pair|pareja}} se {{t:fold|retirará}} también ante una pequeña. Apuesta a menudo y poco." }
      - { text: "{{t:check|Paso}} más a menudo de lo que apuesto", why: "Demasiado prudente: un flop {{t:paired|emparejado}} y alto te favorece, y el rival normalmente no tiene nada aquí." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "Has {{t:open|abierto}} desde el botón, la {{t:big-blind|ciega grande}} ha {{t:call|igualado}} y {{t:check|pasa}}. El flop es {{t:monotone|monocolor}}. ¿Qué plan es el correcto aquí?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet menos a menudo de lo habitual y pequeño", correct: true, why: "Sí: cualquiera de los jugadores puede tener ya {{t:flush|color}}, así que tu {{t:nuts-advantage|ventaja de nuts}} es menor que en un flop alto normal. Apuestas menos a menudo y con un tamaño pequeño, para no construir un {{t:pot|bote}} grande contra un color." }
      - { text: "C-bet a menudo y grande para que los {{t:draw|proyectos}} paguen", why: "En un flop {{t:monotone|monocolor}} un {{t:pot|bote}} grande es peligroso: el rival puede tener un {{t:flush|color}} hecho, y tus manos sin corazón se defienden mal." }
      - { text: "Siempre {{t:check|paso}}", why: "Demasiado prudente: un flop alto sigue favoreciéndote, y algunas manos (p. ej., con un corazón alto) apuestan pequeño con gusto." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.pot}}. Apuestas {{n:cbet.ex.small}} sin nada de mano. ¿Qué porcentaje de las veces tiene que {{t:fold|retirarse}} el rival para que esta {{t:bet|apuesta}} no gane ni pierda? Escribe un número."
    answer: alpha.cbet.small
    explanation: "Arriesgas {{n:cbet.ex.small}} para ganar {{n:ex.pot}}. El umbral es apuesta ÷ ({{t:pot|bote}} + apuesta): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. El rival falla el flop mucho más a menudo, por eso un c-bet pequeño compensa tan a menudo."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.pot}}. Apuestas {{n:cbet.ex.big}} sin nada de mano. ¿Qué porcentaje de las veces tiene que {{t:fold|retirarse}} el rival para que esta {{t:bet|apuesta}} no gane ni pierda? Escribe un número."
    answer: alpha.cbet.big
    explanation: "Arriesgas {{n:cbet.ex.big}} para ganar {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Un {{t:bluff|farol}} grande tiene que funcionar mucho más a menudo que uno pequeño ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "¿Por qué, en un flop {{t:dry|seco}}, un c-bet del {{n:cbet.size.small}} del {{t:pot|bote}} con una mano sin posibilidades compensa más a menudo que un c-bet del {{n:cbet.size.big}} del {{t:pot|bote}}?"
    options:
      - { text: "Porque una {{t:bet|apuesta}} pequeña necesita que el rival se retire solo el {{n:alpha.cbet.small}} de las veces, y una grande el {{n:alpha.cbet.big}}", correct: true, why: "Sí: en un flop {{t:dry|seco}} las manos más débiles del rival (sin {{t:pair|pareja}} y sin {{t:draw|proyecto}}) se {{t:fold|retiran}} ante ambos tamaños, así que una {{t:bet|apuesta}} pequeña logra el mismo efecto más barato." }
      - { text: "Porque una {{t:bet|apuesta}} pequeña siempre provoca una {{t:fold|retirada}}", why: "No: el rival {{t:call|iguala}} una {{t:bet|apuesta}} pequeña con cualquier {{t:pair|pareja}}. Una {{t:bet|apuesta}} pequeña simplemente arriesga menos, así que necesita menos {{t:fold|retiradas}}." }
      - { text: "Porque una {{t:bet|apuesta}} grande siempre es un error", why: "No: en un flop {{t:wet|húmedo}} y con la {{t:nuts-advantage|ventaja de nuts}}, una {{t:bet|apuesta}} grande a veces es lo mejor. En un flop {{t:dry|seco}}, sin embargo, no te da nada a cambio del mayor riesgo." }
---
El c-bet ({{t:bet|apuesta}} de continuación) es una {{t:bet|apuesta}} en el flop del jugador que hizo la última {{t:raise|subida}} antes del flop. En esta lección juegas {{t:in-position|en posición}}: has {{t:open|abierto}} desde el botón, la {{t:big-blind|ciega grande}} ha {{t:call|igualado}} y en el flop {{t:check|pasa}}. El {{t:pot|bote}} en el flop es de {{n:bb.pot-after.vs-btn}}. Hay dos preguntas: con qué frecuencia apostar y cuánto.

## Flop {{t:dry|seco}} y alto: a menudo y poco

En un flop como [[Ks 7d 2c]] tienes la {{t:range-advantage|ventaja de rango}}, y el rival casi no tiene {{t:draw|proyectos}}. Apuestas a menudo y poco, alrededor del {{n:cbet.size.small}} del {{t:pot|bote}}, es decir, unos {{n:cbet.btn.small}}. Una {{t:bet|apuesta}} pequeña basta para que el rival se {{t:fold|retire}} con las manos que han fallado, y las {{t:pair|parejas}} peores la seguirán {{t:call|igualando}}. Una {{t:bet|apuesta}} mayor hace que se {{t:fold|retiren}} más o menos las mismas manos, pero arriesga más.

Un c-bet pequeño típico es de alrededor del {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} del {{t:pot|bote}}, y uno grande de alrededor del {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (materiales de formación); los solvers suelen usar {{n:cbet.size.small}} y {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, y en algunos flops también un {{t:overbet}}, es decir, una {{t:bet|apuesta}} mayor que todo el {{t:pot|bote}} (resultados publicados de solvers).

## Flop con muchos {{t:draw|proyectos}}: menos a menudo, pero más grande

En un flop como [[Kh Jh 7c]] el rival tiene muchos {{t:flush-draw|proyectos de color}} y de {{t:straight|escalera}}, pero la {{t:straight|escalera}} todavía no es posible. Las manos fuertes y los {{t:draw|proyectos}} fuertes apuestan con un tamaño mayor, p. ej., el {{n:cbet.size.big}} del {{t:pot|bote}}, para que los {{t:draw|proyectos}} paguen caro la siguiente carta. Las manos medias sin {{t:draw|proyecto}} {{t:check|pasan}} más a menudo. Cuando la {{t:straight|escalera}} ya es posible, p. ej., en [[Jh Th 8c]], el rival puede tenerla, así que ahí los solvers apuestan con un tamaño menor.

## {{t:paired|Emparejado}} y {{t:monotone|monocolor}}

En un flop {{t:paired|emparejado}}, p. ej., [[Qd Qs 6h]], tienes la {{t:range-advantage|ventaja de rango}}, y es difícil tener un {{t:draw|proyecto}}, así que un rival sin {{t:pair|pareja}} rara vez puede {{t:call|igualar}}. Apuestas a menudo y poco: una {{t:bet|apuesta}} grande no compensa, porque cualquiera de los dos puede tener {{t:three-of-a-kind|trío}}. En un flop {{t:monotone|monocolor}}, p. ej., [[Kh 8h 3h]], cualquiera puede tener ya {{t:flush|color}}, así que apuestas menos a menudo de lo habitual y poco.

Atención: «{{t:wet|húmedo}}» no significa «apuesta grande». En la aplicación, un flop {{t:monotone|monocolor}} es siempre {{t:wet|húmedo}} y, aun así, el solver apuesta en él pocas veces y con un tamaño pequeño (resultados publicados de solvers). El tamaño crece con la {{t:wetness|humedad}} solo hasta cierto punto: en los flops más {{t:wet|húmedos}}, como [[Qd 8d 7d]], vuelve a bajar. El tamaño mayor de la sección anterior se aplica a los flops con muchos {{t:draw|proyectos}} en los que la {{t:straight|escalera}} todavía no es posible (en la aplicación, normalmente los intermedios).

## Bajo con cartas cercanas entre sí: {{t:check|pasas}} más a menudo

En [[7s 6h 5d]] la {{t:big-blind|ciega grande}} tiene en su {{t:range|rango}} {{t:straight|escaleras}} y {{t:two-pair|dobles parejas}}, y tú no tienes {{t:nuts-advantage|ventaja de nuts}} (lección sobre las ventajas). Normalmente ocurre lo mismo en otros flops bajos {{t:connected|conectados}}. En un flop bajo {{t:semi-connected|semiconectado}} todavía no hay {{t:straight|escalera}}, pero el flop igualmente le va bien a las manos con cartas pequeñas, que la {{t:big-blind|ciega grande}} defiende mucho, y tus cartas altas han fallado. Haces c-bet menos a menudo que en flops altos: muchas manos {{t:check|pasan}}, y apuestan sobre todo las manos muy fuertes y los {{t:draw|proyectos}} fuertes.

## Cuántas veces tiene que {{t:fold|retirarse}} el rival

Una {{t:bet|apuesta}} sin nada de mano no gana ni pierde cuando el rival se {{t:fold|retira}} en apuesta ÷ ({{t:pot|bote}} + apuesta) de los casos. Con el {{n:cbet.size.small}} del {{t:pot|bote}} es el {{n:alpha.cbet.small}}; con el {{n:cbet.size.big}} del {{t:pot|bote}}, ya el {{n:alpha.cbet.big}}. Una mano sin {{t:pair|pareja}} falla el flop en torno al {{n:flop.miss.unpaired}} de las veces, por eso un c-bet pequeño compensa tan a menudo.

:::note De dónde salen estas reglas
Las orientaciones (flop {{t:dry|seco}}: poco y a menudo; muchos {{t:draw|proyectos}} sin {{t:straight|escalera}} hecha: más grande y menos a menudo; {{t:straight|escalera}} ya posible: más pequeño; {{t:paired|emparejado}}: poco; {{t:monotone|monocolor}}: menos a menudo y poco) son reglas generales de los materiales de formación y de los resultados publicados de solvers, marcadas como heurísticas. Los tamaños del {{n:cbet.size.small}} y del {{n:cbet.size.big}} del {{t:pot|bote}} son ejemplos de los intervalos indicados arriba (materiales de formación sobre tamaños de apuesta; resultados publicados de solvers). La aplicación no indica en porcentajes con qué frecuencia apostar, porque esas cifras proceden de los resultados de solvers.
:::
