---
id: m7.l4
module: m7
order: 4
title: "Probe bet y defensa"
sub: "Cuando el rival pasa o apuesta por segunda vez"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "El Button {{t:open|abrió}} y tú {{t:call|igualaste}} desde la {{t:big-blind|ciega grande}}. En el flop los dos pasáis. En el turn apuestas primero. ¿Cómo se llama esta {{t:bet|apuesta}}?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Sí: el probe bet es una {{t:bet|apuesta}} {{t:out-of-position}} en el turn después de que el {{t:aggressor}} antes del flop no hiciera c-bet y {{t:check|pasara}}." }
      - { text: "C-bet", why: "El c-bet lo {{t:bet|apuesta}} el jugador que {{t:raise|subió}} antes del flop. Tú solo {{t:call|igualaste}}." }
      - { text: "Check-raise", why: "El check-raise es {{t:check|pasar}} y después {{t:raise|subir}} la {{t:bet|apuesta}} del rival. Aquí apuestas primero y no {{t:raise|subes}} a nadie." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "¿Por qué, después de que el Button {{t:check|pase}} en el flop, puedes apostar en el turn más a menudo de lo habitual?"
    table: { position: BB }
    options:
      - { text: "Porque con muchas manos fuertes el Button habría apostado, así que tras {{t:check|pasar}} tiene menos", correct: true, why: "Sí: las manos fuertes suelen hacer c-bet. El {{t:range|rango}} del Button tras {{t:check|pasar}} tiene más manos medias y débiles, y puedes atacarlo con una {{t:bet|apuesta}}." }
      - { text: "Porque {{t:check|pasar}} siempre significa que el Button no tiene nada", why: "No siempre: el Button a veces {{t:check|pasa}} con una mano fuerte para atraparte. Pero tiene menos que cuando apuesta." }
      - { text: "Porque en el turn eres tú quien tiene {{t:position|posición}}", why: "No: el Button habla después de ti en cada {{t:street|calle}}. El probe bet lo {{t:bet|apuestas}} {{t:out-of-position}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "El Button {{t:check|pasó}} en el flop. ¿En qué {{t:board|mesa}} {{t:bet|apuestas}} más a menudo un probe bet desde la {{t:big-blind|ciega grande}}?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Sí: las cartas bajas conectan más a menudo con la defensa amplia de la {{t:big-blind|ciega grande}} (pequeñas {{t:pair|parejas}}, {{t:connectors|conectores}}), y el Button tras {{t:check|pasar}} rara vez tiene aquí una mano fuerte." }
      - { text: "[[Ac Kd 8h Js]]", why: "En una {{t:board|mesa}} alta, la {{t:range-advantage|ventaja de rango}} la tiene el Button: muchos de sus ases y reyes han ligado. Aquí {{t:bet|apuestas}} el probe bet con menos frecuencia." }
      - { text: "En las dos con la misma frecuencia", why: "La {{t:texture|textura}} importa, igual que con el c-bet en M5: en mesas bajas apuestas más a menudo; en las altas, menos." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop los dos {{t:check|pasasteis}}. El turn es un tres. Hablas primero. ¿Qué haces?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Apuesto (probe bet)", correct: true, why: "Tienes un {{t:oesd|proyecto de escalera abierta}} (un cuatro o un nueve) en una {{t:board|mesa}} baja que encaja con tu {{t:range|rango}}. Ganas si el Button {{t:fold|se retira}}, y si {{t:call|iguala}}, aún tienes {{n:outs.oesd}} outs." }
      - { text: "{{t:check|Paso}}", correct: true, why: "También vale: con un {{t:draw|proyecto}} puedes ver el river gratis si el Button también {{t:check|pasa}}. Aun así, el probe bet suele ser mejor, porque el Button, tras {{t:check|pasar}} en el flop, tiene un {{t:range|rango}} débil, y tú tienes un {{t:semi-bluff|semifarol}} fuerte." }
      - { text: "{{t:fold|Me retiro}}", why: "Nadie ha {{t:bet|apostado}}, así que puedes {{t:check|pasar}} gratis (regla del módulo 1). {{t:fold|Retirarte}} entrega el {{t:pot|bote}} sin motivo." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop los dos {{t:check|pasasteis}}. El turn es un tres. Hablas primero. ¿Qué haces?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Apuesto (probe bet)", correct: true, why: "La {{t:top-pair|pareja mayor}} es una buena mano para un probe bet: te pagarán las {{t:pair|parejas}} más débiles y las cartas altas del Button, y con la {{t:bet|apuesta}} no les das una carta gratis." }
      - { text: "{{t:check|Paso}}", why: "El Button, tras {{t:check|pasar}} en el flop, a menudo tiene cartas altas sin {{t:pair|pareja}}. Si vuelve a {{t:check|pasar}}, recibe una carta gratis que puede superarte, y tú no ganas nada con sus manos más débiles." }
      - { text: "{{t:fold|Me retiro}}", why: "Nadie ha {{t:bet|apostado}}, así que puedes {{t:check|pasar}} gratis. Y con {{t:top-pair|pareja mayor}} quieres apostar." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Defiendes la {{t:big-blind|ciega grande}} contra la {{t:open|apertura}} del Button. En el flop los dos {{t:check|pasasteis}}. El turn es una jota. Hablas primero. ¿Qué haces?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "No tienes {{t:pair|pareja}} ni {{t:draw|proyecto}}, y la {{t:board|mesa}} alta favorece al {{t:range|rango}} del Button. Un probe bet sin outs en una {{t:board|mesa}} así solo gana si el Button {{t:fold|se retira}}, y aquí tiene muchos ases, reyes y jotas." }
      - { text: "Apuesto (probe bet)", why: "El probe bet lo {{t:bet|apuestas}} más a menudo en mesas bajas y con manos que tienen {{t:pair|pareja}} u outs. Aquí no tienes ni lo uno ni lo otro." }
      - { text: "{{t:fold|Me retiro}}", why: "Puedes {{t:check|pasar}} gratis, así que {{t:fold|retirarte}} no aporta nada (regla del módulo 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Defiendes la {{t:big-blind|ciega grande}}. {{t:call|Igualaste}} el c-bet del Button en el flop. El turn es un dos, {{t:check|pasas}} y el Button {{t:bet|apuesta}} {{n:ex.bet.three-quarters}} en un {{t:pot|bote}} de {{n:ex.pot}}. ¿Qué haces?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Solo tienes un gutshot (una jota): aprox. {{n:odds.gutshot.turn-river}} en el river, y necesitas {{n:eq.bet-three-quarters}}. Sin {{t:pair|pareja}} y con una sola carta por salir, esta mano no se defiende contra un {{t:second-barrel|segundo barril}}." }
      - { text: "{{t:call|Igualo}}", why: "El precio es varias veces mayor que tu probabilidad: {{n:eq.bet-three-quarters}} frente a aprox. {{n:odds.gutshot.turn-river}}. Las implied odds no cubrirán semejante diferencia." }
      - { text: "Check-raise", why: "El {{t:second-barrel|segundo barril}} es un {{t:range|rango}} más fuerte que el c-bet: el Button tiene más a menudo un rey o una mano mejor que no {{t:fold|se retirará}}. Con {{n:outs.gutshot}} outs es un {{t:bluff|farol}} caro." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Defiendes la {{t:big-blind|ciega grande}}. {{t:call|Igualaste}} el c-bet del Button en el flop. El turn es un rey, {{t:check|pasas}} y el Button {{t:bet|apuesta}} solo {{n:ex.bet.quarter}} en un {{t:pot|bote}} de {{n:ex.pot}}. ¿Qué haces?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Tienes un {{t:oesd|proyecto de escalera abierta}} (una jota o un seis): aprox. {{n:odds.oesd.turn-river}}. La apuesta pequeña exige solo {{n:eq.bet-quarter}}, es decir, casi exactamente eso, y si ligas aún puedes ganar más en el river." }
      - { text: "{{t:fold|Me retiro}}", why: "Con una apuesta tan pequeña, el precio es casi igual a tu probabilidad ({{n:eq.bet-quarter}} frente a aprox. {{n:odds.oesd.turn-river}}), y las implied odds inclinan la decisión hacia {{t:call|igualar}}." }
      - { text: "{{t:raise|Subo}} all-in", why: "Arriesgas todo tu stack con una mano que todavía no tiene nada, y el Button con un rey no {{t:fold|se retirará}}. Con un precio tan bueno basta con {{t:call|igualar}}." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Defiendes la {{t:big-blind|ciega grande}}. {{t:call|Igualaste}} el c-bet del Button en el flop. El turn es un cinco, {{t:check|pasas}} y el Button {{t:bet|apuesta}} {{n:ex.bet.three-quarters}} en un {{t:pot|bote}} de {{n:ex.pot}}. ¿Qué haces?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "La {{t:top-pair|pareja mayor}} es demasiado para {{t:fold|retirarse}} con una carta blanca: gana a los {{t:semi-bluff|semifaroles}} y a los reyes más débiles. Necesitas {{n:eq.bet-three-quarters}}, y contra el {{t:range|rango}} de un {{t:second-barrel|segundo barril}} una {{t:pair|pareja}} así suele tener eso." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado. El {{t:second-barrel|segundo barril}} es más fuerte que el c-bet, pero el Button también lo {{t:bet|apuesta}} con {{t:draw|proyectos}} y {{t:bluff|faroles}}. La {{t:top-pair|pareja mayor}} les gana a todos." }
      - { text: "{{t:raise|Subo}}", why: "Tras una {{t:raise|subida}}, las manos peores {{t:fold|se retirarán}} y pagarán los reyes mejores y los sets. Una {{t:top-pair|pareja mayor}} con kicker medio no es una mano para {{t:raise|subir}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "¿Por qué contra un {{t:second-barrel|segundo barril}} defiendes más cerrado que contra un c-bet en el flop?"
    table: { position: BB }
    options:
      - { text: "Porque el rival {{t:bet|apuesta}} el {{t:second-barrel|segundo barril}} con un {{t:range|rango}} más estrecho y normalmente con un tamaño mayor, y los {{t:draw|proyectos}} ya solo tienen una carta", correct: true, why: "Sí: el rival abandona parte de sus {{t:bluff|faroles}} en el turn, una apuesta mayor reduce la {{t:mdf|MDF}} (con 3/4 del {{t:pot|bote}}, {{n:mdf.bet-three-quarters}}), y tus {{t:draw|proyectos}} pierden la mitad de sus opciones. Con las {{t:pair|parejas}} débiles y las manos sin outs {{t:fold|te retiras}} más a menudo que en el flop." }
      - { text: "Porque en el turn hay que ahorrar {{t:chips|fichas}}", why: "Lo que cuenta es el {{t:expected-value|valor esperado}} de cada decisión, no ahorrar. Defiendes más cerrado porque el rival apuesta con manos más fuertes." }
      - { text: "No, defiendes más amplio porque ya has metido muchas {{t:chips|fichas}}", why: "Lo que ya has metido no vuelve. Decides según el precio actual y la fuerza del {{t:range|rango}} del rival." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. El rival {{t:bet|apuesta}} {{n:ex.bet.three-quarters}} en un {{t:pot|bote}} de {{n:ex.pot}}. ¿Cuál es la {{t:mdf|MDF}}? Escribe el número en porcentaje."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot|bote}} ÷ ({{t:pot|bote}} + apuesta) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. En un ejemplo publicado del turn, el solver defendió de media cerca de la {{t:mdf|MDF}}; {{t:out-of-position}} a veces defiendes menos (en el flop y en el turn). Cuando sabes que el rival {{t:bluff|farolea}} menos a menudo, {{t:fold|te retiras}} más a menudo (el cálculo está en M8, en la lección sobre cazar {{t:bluff|faroles}})."
---
En el turn te encontrarás dos situaciones nuevas: el Button no hizo c-bet y {{t:check|pasó}}, o hizo c-bet y apuesta por segunda vez. En la primera puedes atacar tú; en la segunda, defiendes más cerrado que en el flop.

## Probe bet

El probe bet es una {{t:bet|apuesta}} {{t:out-of-position}} en el turn después de que el {{t:aggressor}} antes del flop {{t:check|pasara}} en el flop. Con muchas manos fuertes, el Button habría hecho c-bet, así que tras {{t:check|pasar}} tiene menos. Su {{t:range|rango}} es más débil y puedes atacarlo.

- **Más a menudo en mesas bajas**, p. ej., [[8c 5d 2s 3h]]: las cartas bajas conectan con tu defensa amplia.
- **Menos a menudo en las altas**, p. ej., [[Ac Kd 8h Js]]: la {{t:range-advantage|ventaja de rango}} sigue del lado del Button.

## Con qué hacer probe bet

- **{{t:pair|Parejas}}** que quieren cobrar de las cartas altas del Button y no quieren darle una carta gratis,
- **{{t:draw|proyectos}} fuertes**, que ganan de dos maneras.

Las manos sin {{t:pair|pareja}} y sin outs {{t:check|pasan}}.

## Defensa contra el {{t:second-barrel|segundo barril}}

Cuando has {{t:call|igualado}} el c-bet y el Button apuesta por segunda vez, su {{t:range|rango}} es más estrecho y más fuerte que en el flop: ha abandonado parte de sus {{t:bluff|faroles}}. Tus {{t:draw|proyectos}} ya solo tienen una carta. Por eso:

- los {{t:draw|proyectos}} solo {{t:call|igualan}} con un buen precio o con implied odds (lección anterior),
- las manos sin outs y las {{t:pair|parejas}} más débiles {{t:fold|se retiran}} más a menudo,
- la {{t:top-pair|pareja mayor}} normalmente sigue {{t:call|igualando}}.

La {{t:mdf|MDF}} sigue siendo el punto de referencia: con una apuesta de 3/4 del {{t:pot|bote}} es {{n:mdf.bet-three-quarters}}. En un ejemplo publicado del turn, el solver defendió de media cerca de ese valor; {{t:out-of-position}} a veces defiendes menos. También defiendes menos cuando el rival {{t:bluff|farolea}} menos a menudo de lo que supone la {{t:mdf|MDF}}.

:::note De dónde salen estas reglas
Las reglas del probe bet y de la defensa contra el {{t:second-barrel|segundo barril}} son heurísticas de materiales de formación y de análisis de solvers. La defensa en el turn cerca de la {{t:mdf|MDF}} la muestra un ejemplo publicado de solver. La aplicación no da frecuencias en porcentaje porque las fuentes varían según la mesa. Las cifras sobre con qué {{t:bet|apuestan}} probe bets los jugadores de microlímites requieren una fuente con la población descrita (muestra, {{t:stakes|límites}}, salas), así que aquí no aparecen.
:::
