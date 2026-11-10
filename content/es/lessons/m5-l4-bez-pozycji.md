---
id: m5.l4
module: m5
order: 4
title: "Fuera de posición y contra varios rivales"
sub: "Cuándo pasar más a menudo"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}}, el Button {{t:call|ha igualado}} y las ciegas {{t:fold|se han retirado}}. El flop es medio y {{t:connected|conectado}}. Hablas primero. ¿Qué plan es el adecuado aquí?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Paso}} más a menudo que {{t:in-position|en posición}}", correct: true, why: "Sí: el Button {{t:call|ha igualado}} con {{t:position|posición}}, así que tiene un {{t:range|rango}} fuerte, y un flop medio y {{t:connected|conectado}} conecta bien con sus {{t:pair|parejas}} y {{t:connectors|conectores}}. {{t:out-of-position|Fuera de posición}}, aquí {{t:check|pasas}} muy a menudo, también con manos fuertes." }
      - { text: "C-bet a menudo y pequeño, como en el Button", why: "Ese es el plan {{t:in-position|en posición}} en un flop {{t:dry|seco}} y alto. Aquí no tienes {{t:position|posición}} y el flop no favorece a tu {{t:range|rango}}." }
      - { text: "C-bet con todas las manos para no perder la {{t:initiative|iniciativa}}", why: "La {{t:initiative|iniciativa}} no gana por sí sola: el {{t:range|rango}} del Button aquí es fuerte y, tras cada {{t:bet|apuesta}}, también hablas primero en el turn y el river." }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "¿Por qué haces c-bet con menos frecuencia {{t:out-of-position|fuera de posición}} que {{t:in-position|en posición}}?"
    options:
      - { text: "Porque el rival {{t:in-position|en posición}} ve tu acción en cada {{t:street|calle}} y su {{t:range|rango}} tras {{t:call|igualar}} es fuerte", correct: true, why: "Sí: el jugador que {{t:call|iguala}} con {{t:position|posición}} {{t:fold|se ha retirado}} con las manos débiles y a menudo ha {{t:raise|subido}} con las más fuertes. Le quedan manos medias y buenas y, además, habla el último." }
      - { text: "Porque el c-bet {{t:out-of-position|fuera de posición}} está prohibido", why: "No: las reglas permiten apostar desde cualquier sitio. La cuestión es que el c-bet {{t:out-of-position|fuera de posición}} compensa con menos frecuencia." }
      - { text: "Porque {{t:out-of-position|fuera de posición}} siempre tienes la mano más débil", why: "No: tu mano no depende de la {{t:position|posición}}. Lo que cambia es la facilidad con la que realizas su equity." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}}, el Button {{t:call|ha igualado}} y las ciegas {{t:fold|se han retirado}}. Tienes {{t:top-pair|pareja mayor}} con el mejor kicker en un flop {{t:dry|seco}}. Hablas primero. ¿Qué haces?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|Paso}} (para {{t:call|igualar}} la {{t:bet|apuesta}} del Button)", correct: true, why: "Sí: el Button {{t:call|ha igualado}} con {{t:position|posición}}, así que su {{t:range|rango}} es fuerte, y en este flop el solver {{t:out-of-position|fuera de posición}} {{t:check|pasa}} con casi todo su {{t:range|rango}}, también con {{t:top-pair|pareja mayor}} y el mejor kicker. Tras {{t:check|pasar}}, {{t:call|igualas}} la {{t:bet|apuesta}} del Button." }
      - { text: "C-bet de {{n:cbet.size.small}} del {{t:pot|bote}}", why: "Demasiado a menudo: en esta situación el solver apuesta en menos del {{n:cbet.oop.a94.bet}} de los casos. La {{t:top-pair|pareja mayor}} con el mejor kicker la juegas {{t:check|pasando}} e {{t:call|igualando}}." }
      - { text: "C-bet de {{n:cbet.size.big}} del {{t:pot|bote}}", why: "Demasiado a menudo: en esta situación el solver apuesta en menos del {{n:cbet.oop.a94.bet}} de los casos. La {{t:top-pair|pareja mayor}} con el mejor kicker la juegas {{t:check|pasando}} e {{t:call|igualando}}." }
      - { text: "{{t:fold|Me retiro}}", why: "Nadie ha {{t:bet|apostado}} todavía, así que {{t:fold|retirarte}} no te aporta nada: puedes {{t:check|pasar}} gratis (regla del módulo 1). Esta mano la juegas {{t:check|pasando}} e {{t:call|igualando}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}} y han {{t:call|igualado}} el Button y la {{t:big-blind|ciega grande}}. En el flop, la {{t:big-blind|ciega grande}} {{t:check|pasa}} y el Button habla después de ti. Solo tienes cartas altas, sin {{t:draw|proyecto}}. ¿Qué haces?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "Sí: contra dos rivales, una mano sin {{t:pair|pareja}} y sin {{t:draw|proyecto}} rara vez gana el {{t:pot|bote}} con una {{t:bet|apuesta}}. Es más probable que uno de los dos haya ligado este flop." }
      - { text: "C-bet pequeño, como en el mano a mano", why: "Contra dos rivales, el {{t:bluff|farol}} tiene que pasar por los dos, y los dos fallan a la vez mucho menos a menudo que uno solo." }
      - { text: "C-bet grande para echar a los dos", why: "Un {{t:bluff|farol}} grande contra dos rivales arriesga mucho, y la probabilidad de que los dos {{t:fold|se retiren}} es pequeña. En este flop tienen muchas {{t:pair|parejas}} y {{t:draw|proyectos}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}} y han {{t:call|igualado}} el Button y la {{t:big-blind|ciega grande}}. La {{t:big-blind|ciega grande}} {{t:check|pasa}}. Tienes {{t:top-pair|pareja mayor}} con buen kicker. ¿Qué haces?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "Sí: en un {{t:pot|bote}} multijugador en un flop {{t:dry|seco}}, el solver {{t:check|pasa}} muy a menudo, incluso con manos muy fuertes, porque entre dos jugadores que {{t:call|igualan}} es más probable que alguno haya ligado el flop." }
      - { text: "Apuesto {{t:value|por valor}}", why: "Contra dos rivales en un flop {{t:dry|seco}}, el solver {{t:check|pasa}} incluso con una mano muy fuerte; apuestas rara vez y poco, sobre todo cuando el flop conecta bien con tu {{t:range|rango}}." }
      - { text: "{{t:fold|Me retiro}}", why: "Nadie ha {{t:bet|apostado}}, así que puedes {{t:check|pasar}} gratis. {{t:fold|Retirarte}} sería regalar un {{t:pot|bote}} en el que probablemente vas por delante." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Una mano sin {{t:pair|pareja}} falla el flop en torno al {{n:flop.miss.unpaired}} de los casos. ¿Con qué frecuencia fallan a la vez dos manos así (cuatro valores distintos)?"
    options:
      - { text: "Aprox. {{n:flop.miss.two}}", correct: true, why: "Sí: calculas igual que para una mano, solo que hay más cartas que emparejan: {{n:pair.outs.two-hands}} de {{n:cards.unseen.two-hands}} desconocidas (sin contar tus cartas). La probabilidad de que ninguna de las {{n:cards.board.flop}} cartas del flop esté entre ellas es de aprox. {{n:flop.miss.two}}: los dos fallan menos de la mitad de las veces." }
      - { text: "Aprox. {{n:flop.miss.unpaired}}, igual que una", why: "No: cada rival adicional es otra posibilidad de que alguien haya ligado. La probabilidad de que fallen todos disminuye con cada jugador." }
      - { text: "Aprox. {{n:flop.hit.unpaired}}", why: "Esa es la probabilidad de que una mano sin {{t:pair|pareja}} ligue {{t:pair|pareja}} en el flop. La pregunta trata de que fallen las dos." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Repaso {{t:in-position|en posición}}: {{t:open|has abierto}} desde el Button, la {{t:big-blind|ciega grande}} {{t:call|ha igualado}} y en el flop {{t:check|pasa}}. ¿Qué plan encaja con este flop?"
    position: BTN
    options:
      check: "{{t:check|Paso}} más a menudo, c-bet menos de lo habitual"
      small: "C-bet a menudo y pequeño: {{n:cbet.size.small}} del {{t:pot|bote}} ({{n:cbet.btn.small}})"
      big: "C-bet a menudo y grande: {{n:cbet.size.big}} del {{t:pot|bote}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Demasiado prudente: en un flop {{t:dry|seco}} y alto tienes {{t:range-advantage|ventaja de rango}} y el rival normalmente ha fallado. Si {{t:check|pasas}}, le das una carta gratis."
          small: "Sí: un flop {{t:dry|seco}} y alto te favorece. Una {{t:bet|apuesta}} pequeña basta para que el rival {{t:fold|se retire}} con manos débiles, y las {{t:pair|parejas}} peores seguirán {{t:call|igualándola}}."
          big: "Buena acción, mal tamaño: en un flop {{t:dry|seco}} el rival tiene pocos {{t:draw|proyectos}}, y las manos que han fallado {{t:fold|se retirarán}} también ante una {{t:bet|apuesta}} pequeña. Una {{t:bet|apuesta}} mayor no hará que {{t:fold|se retiren}} más manos, pero arriesga más. Apuesta en torno al {{n:cbet.size.small}} del {{t:pot|bote}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Sí: un flop bajo con cartas cercanas entre sí favorece a la {{t:big-blind|ciega grande}}, que aquí tiene más a menudo {{t:two-pair|doble pareja}} o {{t:straight|escalera}}. Haces c-bet con menos frecuencia que en flops altos: muchas manos {{t:check|pasan}} y apuestan sobre todo las manos fuertes y los {{t:draw|proyectos}} fuertes."
          small: "Demasiado a menudo: en un flop bajo con cartas cercanas entre sí es la {{t:big-blind|ciega grande}} quien tiene la {{t:nuts-advantage|ventaja de nuts}}. Los c-bets frecuentes, incluso pequeños, le dan ocasión de {{t:raise|subir}} (check-raise) con sus manos más fuertes."
          big: "Demasiado a menudo y demasiado caro: la {{t:big-blind|ciega grande}} ha ligado aquí más a menudo {{t:two-pair|doble pareja}} o {{t:straight|escalera}}. Un c-bet grande y frecuente arriesga mucho cuando tú normalmente solo tienes cartas altas."
    count: 3
---
Hasta ahora has jugado {{t:in-position|en posición}} contra un solo rival. {{t:out-of-position|Fuera de posición}} y contra varios jugadores haces c-bet con menos frecuencia.

## {{t:out-of-position|Fuera de posición}}

Cuando {{t:open|abres}} desde el {{t:cutoff|CO}} y el Button {{t:call|iguala}}, después del flop hablas primero en cada {{t:street|calle}}. Además, el {{t:range|rango}} del Button es fuerte: {{t:fold|se ha retirado}} con las manos débiles y ha {{t:raise|subido}} con parte de las más fuertes, así que le quedan manos medias y buenas. Un {{t:range|rango}} así, sin las manos más fuertes y compuesto sobre todo por manos medias, está {{t:condensed|condensado}}. Por eso, {{t:out-of-position|fuera de posición}} {{t:check|pasas}} mucho más a menudo, muchas veces con todo tu {{t:range|rango}}, también con manos fuertes: las jugarás {{t:call|igualando}} o con check-raise. Apuestas sobre todo en flops que favorecen muchísimo a tu {{t:range|rango}}, p. ej., K-Q-6. {{t:check|Pasar}} {{t:out-of-position|fuera de posición}} no significa renunciar a la mano: muchas de estas manos {{t:call|igualarán}} la {{t:bet|apuesta}} del rival.

## Contra varios rivales

Cada rival adicional es otra posibilidad de que alguien haya ligado el flop. Una mano sin {{t:pair|pareja}} falla el flop en torno al {{n:flop.miss.unpaired}} de los casos, pero dos a la vez solo en torno al {{n:flop.miss.two}}. El {{t:bluff|farol}} tiene que pasar por todos, así que contra varios rivales renuncias sobre todo a los {{t:bluff|faroles}}. Apuestas rara vez y poco, sobre todo en flops que conectan bien con tu {{t:range|rango}}; en un flop {{t:dry|seco}} {{t:check|pasas}} a menudo incluso con una mano muy fuerte.

:::note De dónde salen estas reglas
Las reglas de esta lección proceden de resultados publicados de solvers (c-bet {{t:out-of-position|fuera de posición}}, c-bet en flops con as y en {{t:pot|botes}} multijugador) y de materiales de formación ({{t:pot|botes}} multijugador). Son heurísticas: la aplicación no da frecuencias en porcentajes. La probabilidad de que dos manos fallen a la vez es un cálculo exacto para dos manos con cuatro valores distintos; no tiene en cuenta tus cartas, igual que la cifra para una mano.
:::
