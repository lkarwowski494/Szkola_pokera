---
id: m7.l1
module: m7
order: 1
title: "Segundo barril"
sub: "Cuándo apostar por segunda vez en el turn"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}}. En el flop [[Jd 7c 3s]] {{t:bet|apostaste}} un c-bet y el rival {{t:call|igualó}}. ¿Qué carta del turn ayuda más a tu {{t:second-barrel|segundo barril}}?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Sí: el as conecta con muchas manos de tu {{t:range|rango}} de {{t:open|apertura}} (AK, AQ, AJ), y la {{t:big-blind|ciega grande}} {{t:call|igualó}} el flop sobre todo con {{t:pair|parejas}} y {{t:draw|proyectos}}. Cada {{t:pair|pareja}} suya baja un puesto." }
      - { text: "[[8h]]", why: "No: el ocho conecta con el flop. Da {{t:straight|escalera}} a T9 y {{t:two-pair|doble pareja}} a 87, manos que la {{t:big-blind|ciega grande}} defiende mucho. Es más bien una carta para el rival." }
      - { text: "[[3h]]", why: "No es la peor, pero cambia poco: rara vez mejora tu {{t:range|rango}}, y el rival con {{t:pair|pareja}} sigue teniendo {{t:pair|pareja}}. El as le da mucho más a tu {{t:second-barrel|segundo barril}}." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "¿Por qué un as en el turn tras el flop [[Jd 7c 3s]] le viene bien al {{t:second-barrel|segundo barril}} de quien {{t:open|abre}} desde el Button?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Conecta con tu AK y tu AQ, y la {{t:pair|pareja}} del rival pasa a ser la segunda o la tercera {{t:pair|pareja}}", correct: true, why: "Sí: una carta alta conecta más a menudo con el {{t:range|rango}} de quien {{t:open|abre}}, y el rival que {{t:call|igualó}} el flop con {{t:pair|pareja}} de jotas o de sietes tiene ahora una mano más débil respecto a la {{t:board|mesa}}." }
      - { text: "Porque ante un as el rival siempre se {{t:fold|retira}}", why: "No siempre: el rival con un as o con un set pagará. El as aumenta la probabilidad de {{t:fold|retirada}}, pero no garantiza nada." }
      - { text: "Porque el as completa los {{t:draw|proyectos}} del rival", why: "No: en esta {{t:board|mesa}} el as no completa ningún {{t:flush|color}} ni ninguna {{t:straight|escalera}} que pueda tener el rival. Ayuda porque encaja con tu {{t:range|rango}}." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}}. En el flop {{t:bet|apostaste}} un c-bet y el rival {{t:call|igualó}}. El turn es un siete. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "Un siete en una {{t:board|mesa}} con nueve y seis da {{t:straight|escalera}} a T8 y 85 y {{t:two-pair|doble pareja}} a 76 y 97, manos que la {{t:big-blind|ciega grande}} defiende. Tú no tienes {{t:pair|pareja}} ni {{t:draw|proyecto}}. Renuncias al {{t:bluff|farol}} y ves una carta gratis." }
      - { text: "Apuesto {{n:ex.bet.three-quarters}}", why: "Esta carta encaja con el {{t:range|rango}} del rival, no con el tuyo, y no tienes outs a una mano fuerte. Haz el {{t:second-barrel|segundo barril}} de {{t:bluff|farol}} en cartas que te ayudan y con manos que pueden mejorar." }
      - { text: "Apuesto {{n:ex.bet.pot}}", why: "Un {{t:bluff|farol}} grande en una carta que favorece al rival arriesga mucho: tendría que {{t:fold|retirarse}} más a menudo que en el {{n:alpha.bet-pot}} de los casos, y tras {{t:call|igualar}} el flop tiene muchas {{t:pair|parejas}} y {{t:draw|proyectos}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}} tu c-bet en el flop. El turn es un as. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Apuesto {{n:ex.bet.three-quarters}}", correct: true, why: "Buen {{t:second-barrel|segundo barril}}: el as encaja con tu {{t:range|rango}} y tienes un gutshot a {{t:straight|escalera}} (un diez). Si el rival se {{t:fold|retira}} con su {{t:pair|pareja}}, ganas en el acto, y si {{t:call|iguala}}, aún puedes ligar." }
      - { text: "Apuesto {{n:ex.bet.quarter}}", sizeError: true, why: "Buena acción, mal tamaño: una apuesta tan barata el rival la {{t:call|igualará}} con cualquier {{t:pair|pareja}}, y este {{t:bluff|farol}} gana sobre todo con las {{t:fold|retiradas}}. En una carta que te ayuda, apuesta fuerte, igual que con manos fuertes." }
      - { text: "{{t:check|Paso}}", correct: true, why: "También vale: tienes outs y verás el river gratis, así que {{t:check|pasar}} no es un error. En un ejemplo publicado de solver, un gutshot a la {{t:straight|escalera}} máxima {{t:check|pasó}} en el turn. Las dos jugadas son correctas." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}} tu c-bet en el flop. El turn es un dos. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "No tienes {{t:pair|pareja}} ni {{t:draw|proyecto}}: tres corazones son poco con una sola carta por salir, y para la {{t:straight|escalera}} te faltan dos cartas. El dos no cambia nada, y el rival {{t:call|igualó}} el flop en una {{t:board|mesa}} con rey, así que a menudo tiene {{t:pair|pareja}}. Renuncias al {{t:bluff|farol}}." }
      - { text: "Apuesto {{n:ex.bet.three-quarters}}", why: "Un {{t:bluff|farol}} sin outs solo gana si el rival se {{t:fold|retira}}. Tras {{t:call|igualar}} el flop tiene muchas {{t:pair|parejas}} (reyes, ochos) que no se {{t:fold|retirarán}} ante un dos en blanco." }
      - { text: "{{t:fold|Me retiro}}", why: "El rival {{t:check|pasa}}, así que puedes {{t:check|pasar}} gratis (regla del módulo 1). La {{t:fold|retirada}} entrega el {{t:pot|bote}} sin motivo." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:bet|Apuestas}} un {{t:second-barrel|segundo barril}} con {{t:flush-draw|proyecto de color}} y el rival {{t:call|iguala}}. ¿Qué posibilidades te quedan?"
    options:
      - { text: "Aprox. {{n:odds.flush.turn-river}} de ligar {{t:flush|color}} en el river", correct: true, why: "Sí: es tu segunda forma de ganar. {{n:outs.flush}} outs entre {{n:cards.unseen.turn}} cartas desconocidas. Por eso el {{t:semi-bluff|semifarol}} es mejor que el {{t:bluff|farol}} sin outs." }
      - { text: "Ninguna, el {{t:bluff|farol}} ha fallado", why: "Un {{t:bluff|farol}} sin outs ya no tiene opciones, pero tú tienes {{t:draw|proyecto}}: un {{t:flush|color}} en el river gana aunque te hayan {{t:call|igualado}}." }
      - { text: "Aprox. {{n:odds.flush.flop-river}}", why: "Eso tenías en el flop, con dos cartas por salir. En el turn queda una: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}} tu c-bet en el flop. El turn es un dos. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "Una {{t:pair|pareja}} de nueves es una mano media: gana a los {{t:bluff|faroles}}, pero pierde contra cualquier rey. Ante una segunda apuesta, el rival se {{t:fold|retirará}} con las manos peores y pagará con reyes. {{t:check|Pasando}}, mantienes el {{t:pot|bote}} pequeño y llegas al showdown." }
      - { text: "Apuesto {{n:ex.bet.three-quarters}}", why: "El rival ya {{t:call|igualó}} el flop en una {{t:board|mesa}} con rey. Las manos peores (ochos, treses) se {{t:fold|retirarán}} o pagarán una vez, y las mejores pagarán siempre. Esa apuesta hace ganar dinero a las manos mejores." }
      - { text: "Apuesto para saber dónde estoy", why: "Apostar «para obtener información» es un error frecuente: la pagas, porque las manos mejores no te dejarán escapar de todos modos, y las peores huirán. Apuestas por {{t:value|valor}} o de {{t:bluff|farol}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Abriste}} desde el Button y la {{t:big-blind|ciega grande}} {{t:call|igualó}} tu c-bet en el flop. El turn es un dos. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:check|pasa}}. ¿Qué haces?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Apuesto por {{t:value|valor}}", correct: true, why: "La {{t:top-pair|pareja mayor}} con el mejor kicker es una mano fuerte. El rival {{t:call|igualó}} el flop, así que a menudo tiene un rey peor u ochos, que pagarán otra vez." }
      - { text: "{{t:check|Paso}}, el rival no tiene nada de todos modos", why: "El rival {{t:call|igualó}} el flop, así que a menudo tiene {{t:pair|pareja}}. {{t:check|Pasando}}, pierdes una {{t:bet|apuesta}} que te habría pagado una mano peor." }
      - { text: "Apuesto all-in", why: "Las {{t:pair|parejas}} peores rara vez pagarán todo el stack. Elige un tamaño que te paguen los reyes más débiles y los ochos." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "¿Con qué manos {{t:bet|apuestas}} con más frecuencia un {{t:second-barrel|segundo barril}} en el turn?"
    options:
      - { text: "Con manos fuertes y {{t:draw|proyectos}}; las manos medias {{t:check|pasan}}", correct: true, why: "Sí: las manos fuertes quieren cobrar, los {{t:draw|proyectos}} ganan de dos formas y las manos medias no ganan nada con otra {{t:bet|apuesta}}." }
      - { text: "Con todas, para no perder la {{t:initiative|iniciativa}}", why: "La {{t:initiative|iniciativa}} por sí sola no gana. El rival {{t:call|igualó}} el flop, así que tiene un {{t:range|rango}} más fuerte, y las manos sin outs y las {{t:pair|parejas}} medias pierden apostando sin parar." }
      - { text: "Solo con las manos más fuertes", why: "Entonces el rival se retiraría cada vez que apuestas y pagaría solo cuando te gana. Los {{t:draw|proyectos}} son {{t:semi-bluff|semifaroles}} naturales." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.pot}}, {{t:bluff|vas de farol}} con una mano que casi nunca ganará y {{t:bet|apuestas}} {{n:ex.bet.three-quarters}}. ¿Con qué frecuencia tiene que {{t:fold|retirarse}} el rival para que este {{t:bluff|farol}} llegue al punto de equilibrio? Escribe el número en porcentaje."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = apuesta ÷ ({{t:pot|bote}} + apuesta) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Con outs necesitas menos {{t:fold|retiradas}}, porque parte de las veces que te {{t:call|igualen}} ganarás igualmente en el river."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "¿Por qué, tras {{t:call|igualar}} el c-bet, el {{t:range|rango}} del rival en el turn es más fuerte que en el flop?"
    options:
      - { text: "Porque con las manos más débiles se {{t:fold|retiró}} en el flop", correct: true, why: "Sí: ante un c-bet se {{t:fold|retiran}} las manos sin {{t:pair|pareja}} y sin {{t:draw|proyecto}}. Quedan {{t:pair|parejas}} y {{t:draw|proyectos}}, así que el {{t:second-barrel|segundo barril}} se enfrenta a un {{t:range|rango}} más fuerte que la primera apuesta." }
      - { text: "Porque el turn siempre le ayuda", why: "No: el turn es aleatorio y a veces te ayuda a ti (p. ej., un as). Lo que refuerza el {{t:range|rango}} del rival es su propia decisión en el flop." }
      - { text: "No lo es, tiene el mismo {{t:range|rango}} que antes del flop", why: "Cada decisión filtra parte de las manos. Quien {{t:call|iguala}} una {{t:bet|apuesta}} suele haber ligado algo o tener {{t:draw|proyecto}}." }
---
Un {{t:second-barrel|segundo barril}} es la segunda {{t:bet|apuesta}} del jugador que {{t:raise|subió}} antes del flop: c-bet en el flop, el rival {{t:call|iguala}} y después otra apuesta en el turn. En el turn no solo te preguntas «¿tengo mano?», sino también «¿esta carta me ayuda a mí o al rival?».

## El rival {{t:call|igualó}}, así que es más fuerte

Ante un c-bet, el rival se {{t:fold|retira}} con las manos sin {{t:pair|pareja}} y sin {{t:draw|proyecto}}. Quien {{t:call|igualó}} suele tener {{t:pair|pareja}} o {{t:draw|proyecto}}, a veces cartas altas con backdoor (como en la defensa del M6). Por eso el {{t:second-barrel|segundo barril}} se enfrenta a un {{t:range|rango}} más fuerte que el primero y no vuelves a apostar con todo.

## Qué carta ayuda

- **Una carta alta en una {{t:board|mesa}} más baja** (as, rey) suele ayudar a quien {{t:open|abre}}: conecta con su AK, AQ, KQ, y cada {{t:pair|pareja}} del rival baja un puesto. En esas cartas apuestas por segunda vez más a menudo, también de {{t:bluff|farol}}.
- **Una carta baja que conecta con la {{t:board|mesa}}**, p. ej. un siete en [[9h 6c 2d]], ayuda a la {{t:big-blind|ciega grande}}: da {{t:straight|escaleras}} y {{t:two-pair|dobles parejas}} a las manos que más defiende.
- **Una carta en blanco**, p. ej. un dos en [[Kd 8c 3s]], cambia poco. Decide tu mano.

## Con qué apostar por segunda vez

Apuestas con manos fuertes (por {{t:value|valor}}) y con {{t:draw|proyectos}} (como {{t:semi-bluff|semifarol}}). El {{t:semi-bluff|semifarol}} gana de dos formas: si el rival se {{t:fold|retira}} o si ligas en el river. Con manos sin {{t:pair|pareja}} y sin outs renuncias más a menudo, porque solo ganan si el rival se retira, salvo que bloqueen las manos con las que el rival pagaría. Cuando el rival puede responder con una {{t:raise|subida}}, el solver también {{t:bluff|va de farol}} con manos sin outs.

Un {{t:bluff|farol}} sin opciones llega al punto de equilibrio cuando el rival se {{t:fold|retira}} en apuesta ÷ ({{t:pot|bote}} + apuesta) de los casos (alpha del M6). Con una apuesta de 3/4 del {{t:pot|bote}} es {{n:alpha.bet-three-quarters}}; con medio {{t:pot|bote}}, {{n:alpha.bet-half}}.

## Las manos medias {{t:check|pasan}}

La {{t:second-pair|segunda pareja}} o la {{t:top-pair|pareja mayor}} con kicker débil gana a los {{t:bluff|faroles}}, pero pierde contra {{t:pair|parejas}} mejores. Ante una segunda apuesta, las manos peores se {{t:fold|retirarán}} y las mejores pagarán. {{t:check|Pasas}}, mantienes el {{t:pot|bote}} pequeño y llegas al showdown.

:::note De dónde salen estas reglas
Las orientaciones generales (las cartas altas suelen favorecer el {{t:second-barrel|segundo barril}}, {{t:bluff|faroles}} con outs en lugar de sin outs, las manos medias {{t:check|pasan}}) son heurísticas de materiales de formación y análisis de solvers. Se aplican a stacks de aprox. {{n:format.stack}}. Es una simplificación: el solver también {{t:bluff|va de farol}} con parte de las manos sin outs cuando bloquean el valor del rival o cuando el rival puede responder con una {{t:raise|subida}}. La app no indica con qué frecuencia apostar en porcentajes, porque esas cifras dependen de la mano concreta en los resultados de los solvers.
:::
