---
id: m8.l4
module: m8
order: 4
title: "Cazar faroles"
sub: "Con qué manos igualar en el river"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Defiendes la {{t:big-blind|ciega grande}}. En el river {{t:check|pasas}} y el Button {{t:bet|apuesta}} el {{t:pot|bote}} entero. Las picas no han entrado. ¿Qué papel tiene tu {{t:pair|pareja}} de nueves?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: solo gana a los {{t:bluff|faroles}}", correct: true, why: "Por el {{t:pot|bote}} entero, el Button apuesta {{t:value|por valor}} con al menos un rey y {{t:bluff|va de farol}} sobre todo con {{t:draw|proyectos}} fallados. Tu {{t:pair|pareja}} pierde contra todas sus manos {{t:value|de valor}} y gana a todos sus {{t:bluff|faroles}}." }
      - { text: "Una mano {{t:value|de valor}}", why: "Una mano {{t:value|de valor}} gana a manos que pagan o apuestan {{t:value|por valor}}. La {{t:pair|pareja}} de nueves pierde contra cualquier rey y cualquier mano mejor del Button." }
      - { text: "Una mano sin opciones", why: "La {{t:pair|pareja}} de nueves gana a los {{t:draw|proyectos}} fallados, y con esos el Button {{t:bluff|va de farol}}. Tiene opciones, pero solo contra {{t:bluff|faroles}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} el {{t:pot|bote}} entero: {{n:ex.bet.pot}}. Tienes un bluff-catcher. ¿Qué porcentaje mínimo de sus apuestas tienen que ser {{t:bluff|faroles}} para que {{t:call|igualar}} sea rentable? Escribe un número."
    answer: eq.bet-pot
    explanation: "Tu equity es la proporción de {{t:bluff|faroles}} entre sus apuestas. Pones {{n:ex.bet.pot}} para ganar el {{t:pot|bote}} tras {{t:call|igualar}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. Es la misma cifra que la proporción de {{t:bluff|faroles}} en equilibrio de la lección anterior."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. El rival {{t:bet|apuesta}} medio {{t:pot|bote}}. Tienes un bluff-catcher y calculas que los {{t:bluff|faroles}} son alrededor del {{n:catch.ex.bluffs-low}} de sus apuestas. ¿Qué haces?"
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Necesitas un {{n:eq.bet-half}} de equity, y tu bluff-catcher solo gana en el {{n:catch.ex.bluffs-low}} de los casos. {{t:call|Igualar}} pierde dinero." }
      - { text: "{{t:call|Igualo}}, porque la {{t:mdf}} es del {{n:mdf.bet-half}}", why: "La {{t:mdf}} te protege frente a un rival que {{t:bluff|va de farol}} con suficiente frecuencia. Cuando hay demasiado pocos {{t:bluff|faroles}}, {{t:call|igualar}} con bluff-catchers regala dinero." }
      - { text: "{{t:raise|Subo}}", why: "Tu mano solo gana a los {{t:bluff|faroles}}. Tras {{t:raise|subir}}, los {{t:bluff|faroles}} {{t:fold|se retiran}} y pagan las manos {{t:value|de valor}}: pierdes más." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. El rival {{t:bet|apuesta}} el {{t:pot|bote}} entero. Tienes un bluff-catcher y calculas que los {{t:bluff|faroles}} son alrededor del {{n:catch.ex.bluffs-high}} de sus apuestas. ¿Qué haces?"
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Necesitas un {{n:eq.bet-pot}} de equity, y los {{t:bluff|faroles}} son el {{n:catch.ex.bluffs-high}}. El rival {{t:bluff|va de farol}} más de lo que marca el equilibrio, así que {{t:call|igualar}} gana dinero." }
      - { text: "{{t:fold|Me retiro}}, porque la apuesta es grande", why: "Una apuesta grande sube el precio al {{n:eq.bet-pot}}, pero hay más {{t:bluff|faroles}}. Lo que cuenta es comparar estas dos cifras, no el tamaño de la apuesta por sí solo." }
      - { text: "{{t:raise|Subo}} all-in", why: "Con un bluff-catcher no se {{t:raise|sube}}: los {{t:bluff|faroles}} {{t:fold|se retiran}} y solo pagan manos mejores que la tuya." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "El rival apuesta el {{t:pot|bote}} entero en el river y {{t:bluff|va de farol}} exactamente en el {{n:bluff.share.bet-pot}} de los casos. ¿Cuánto ganas {{t:call|igualando}} con un bluff-catcher?"
    options:
      - { text: "Nada: {{t:call|igualar}} y {{t:fold|retirarse}} dan lo mismo", correct: true, why: "Una proporción de {{t:bluff|faroles}} igual al {{n:eq.bet-pot}} es exactamente el precio de {{t:call|igualar}}. Lo que ganas contra los {{t:bluff|faroles}} compensa lo que pierdes contra el valor, así que el rival no te deja ganar ni {{t:call|igualando}} ni {{t:fold|retirándote}}." }
      - { text: "Gano, porque hay muchos {{t:bluff|faroles}}", why: "Hay exactamente tantos como marca el precio. Solo ganas cuando el rival {{t:bluff|va de farol}} en más del {{n:eq.bet-pot}} de los casos." }
      - { text: "Pierdo, porque hay más valor que {{t:bluff|faroles}}", why: "Hay más valor, pero al {{t:call|igualar}} arriesgas {{n:ex.bet.pot}} para ganar {{n:ex.pot}} + {{n:ex.bet.pot}}. Con esta proporción de {{t:bluff|faroles}}, las dos cosas se compensan." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Las picas no han entrado. En el river {{t:check|pasas}} y el Button {{t:bet|apuesta}} el {{t:pot|bote}} entero. Tienes {{t:top-pair|pareja mayor}} con un diez. ¿Con cuál de estas dos manos es mejor {{t:call|igualar}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Sin picas no bloqueas los {{t:flush-draw|proyectos de color}} fallados, es decir, los principales {{t:bluff|faroles}} del Button (p. ej., diez y jota de picas). En su {{t:range|rango}} quedan más {{t:bluff|faroles}} a los que ganas." }
      - { text: "[[Kc Ts]]", why: "El diez de picas le quita al Button parte de los {{t:draw|proyectos}} fallados con los que {{t:bluff|va de farol}} (p. ej., jota y diez de picas). Le queda relativamente más valor, así que {{t:call|igualar}} es peor." }
      - { text: "Da igual", why: "La fuerza en el showdown es la misma, pero la pica de tu mano bloquea {{t:bluff|faroles}} del Button. Eso cambia contra qué juegas realmente." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "En el river ha salido el tercer corazón. {{t:check|Pasas}} y el Button {{t:bet|apuesta}} el {{t:pot|bote}} entero. Tienes {{t:pair|pareja}} de nueves. ¿Con cuál de estas dos manos es mejor {{t:call|igualar}}?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "El as de corazones bloquea el {{t:flush|color}} al as, una de las manos {{t:value|de valor}} más fuertes del Button. Cuando bloqueas su valor, entre sus apuestas quedan más {{t:bluff|faroles}}." }
      - { text: "[[Ad 9c]]", why: "La misma {{t:pair|pareja}}, pero no bloqueas ningún {{t:flush|color}}. El Button tiene todos sus colores, contra los que pierdes." }
      - { text: "Da igual", why: "En el showdown las dos manos son igual de fuertes, pero el as de corazones le quita al Button parte de sus manos {{t:value|de valor}}." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Las picas no han entrado. En el river {{t:check|pasas}} y el Button {{t:bet|apuesta}} medio {{t:pot|bote}}. ¿Qué haces?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Solo tienes un siete como carta más alta. Pierdes incluso contra la mayoría de los {{t:bluff|faroles}} del Button (dama con picas, jota con picas), así que no es un bluff-catcher. Defiendes con otras manos." }
      - { text: "{{t:call|Igualo}}, porque el precio es bueno", why: "El precio ({{n:eq.bet-half}}) no ayuda a una mano que pierde contra casi todo, incluso contra los {{t:bluff|faroles}}." }
      - { text: "{{t:raise|Subo}} de {{t:bluff|farol}}", why: "{{t:raise|Subir}} de {{t:bluff|farol}} en el river es una jugada avanzada y arriesgada. Lo más sencillo y mejor es tirar una mano sin opciones." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. El rival {{t:bet|apuesta}} medio {{t:pot|bote}}. La {{t:mdf}} es del {{n:mdf.bet-half}}. ¿Qué manos defiendes primero?"
    options:
      - { text: "Los mejores bluff-catchers: ganan a los {{t:bluff|faroles}} y tienen buenos {{t:blocker|bloqueadores}}", correct: true, why: "Defiendes manos que ganan a los {{t:bluff|faroles}} y, entre manos de fuerza parecida, eliges las que bloquean el valor del rival y no bloquean sus {{t:bluff|faroles}}. {{t:fold|Te retiras}} con las manos que pierden incluso contra los {{t:bluff|faroles}}." }
      - { text: "Un {{n:mdf.bet-half}} aleatorio de tu {{t:range|rango}}", why: "La {{t:mdf}} te dice cuánto defender, no con qué. Defender al azar paga con manos que nunca ganarán." }
      - { text: "Solo manos {{t:value|de valor}}", why: "Entonces defiendes demasiado poco y el rival gana dinero {{t:bluff|yendo de farol}} con cualquier mano. Para llegar a la {{t:mdf}}, añades los mejores bluff-catchers." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "¿Por qué con un bluff-catcher en el river {{t:call|igualas}} y no {{t:raise|subes}}?"
    options:
      - { text: "Porque tras {{t:raise|subir}}, los {{t:bluff|faroles}} {{t:fold|se retiran}} y solo pagan manos mejores", correct: true, why: "Tu mano solo gana a los {{t:bluff|faroles}}. {{t:raise|Subir}} echa justo esas manos y deja las que te ganan." }
      - { text: "Porque en el river no está permitido {{t:raise|subir}}", why: "Sí está permitido. Simplemente, {{t:raise|subir}} con un bluff-catcher lo convierte en un {{t:bluff|farol}} frente a manos que no se van a {{t:fold|retirar}}." }
      - { text: "Porque {{t:call|igualar}} siempre es más barato", why: "No se trata del coste, sino de quién sigue en la mano. Tras {{t:raise|subir}}, siguen las manos que te ganan." }
---
Ahora estás al otro lado: es el rival quien apuesta en el river y tú tienes una mano media. Lo más habitual es que sea un **bluff-catcher**, es decir, una mano que pierde contra todas las manos {{t:value|de valor}} del rival, pero gana a sus {{t:bluff|faroles}}.

## Tu equity son sus {{t:bluff|faroles}}

Un bluff-catcher gana exactamente cuando el rival {{t:bluff|va de farol}}. Por eso su equity es la proporción de {{t:bluff|faroles}} entre las apuestas del rival. {{t:call|Igualas}} cuando es mayor que la equity necesaria del M2:

| Apuesta del rival | Equity necesaria ({{t:bluff|faroles}} como mínimo) |
|---|---|
| 1/3 del {{t:pot|bote}} | {{n:eq.bet-third}} |
| 1/2 del {{t:pot|bote}} | {{n:eq.bet-half}} |
| {{t:pot|Bote}} entero | {{n:eq.bet-pot}} |

Cuando el rival {{t:bluff|va de farol}} exactamente en la proporción de la lección anterior ({{n:bluff.share.bet-pot}} con una apuesta del {{t:pot|bote}} entero), {{t:call|igualar}} queda a cero. Cuando {{t:bluff|va de farol}} más a menudo, {{t:call|igualas}}; cuando menos, {{t:fold|te retiras}}. Las cifras no incluyen el rake; el rake sube un poco la equity necesaria.

## Cuánto defender y con qué

Cuánto defender te lo dice la {{t:mdf}} del M6: ante una apuesta de medio {{t:pot|bote}}, aprox. el **{{n:mdf.bet-half}}** de tu {{t:range|rango}}. Esta lección responde a la segunda pregunta: **con qué manos**. {{t:call|Igualas}} con los mejores bluff-catchers: entre manos de fuerza parecida, eliges las que tienen mejores {{t:blocker|bloqueadores}}; {{t:fold|te retiras}} con las manos que pierden incluso contra los {{t:bluff|faroles}}.

Un bluff-catcher mejor:

- gana a más {{t:bluff|faroles}} (una {{t:pair|pareja}} es mejor que una simple carta alta),
- bloquea las manos {{t:value|de valor}} del rival,
- no bloquea sus {{t:bluff|faroles}}.

## {{t:blocker|Bloqueadores}} al {{t:call|igualar}}

Es el espejo de la lección anterior. Cuando las picas no han entrado, el rival {{t:bluff|va de farol}} con {{t:flush-draw|proyectos de color}} fallados. Una pica en tu mano le quita parte de sus {{t:bluff|faroles}}, así que {{t:call|igualar}} es peor. Cuando el {{t:flush|color}} ha entrado, el as de ese palo en tu mano le quita sus colores más fuertes, así que {{t:call|igualar}} es mejor.

## No subas con un bluff-catcher

Tras {{t:raise|subir}}, los {{t:bluff|faroles}} {{t:fold|se retiran}} y solo pagan las manos que te ganan. Con un bluff-catcher, {{t:call|igualas}} o {{t:fold|te retiras}}.

:::note Cuando el rival rara vez {{t:bluff|va de farol}}
Estas reglas suponen un rival que {{t:bluff|va de farol}} más o menos en equilibrio. Contra un jugador que rara vez {{t:bluff|va de farol}} con una apuesta grande en el river, {{t:fold|te retiras}} más a menudo de lo que indica la {{t:mdf}}: cuando hay menos {{t:bluff|faroles}} de los que exige el precio, {{t:call|igualar}} pierde dinero (el cálculo de esta lección). Las reglas para elegir bluff-catchers según los {{t:blocker|bloqueadores}} proceden de materiales de formación y análisis de solvers (juego en el river, {{t:blocker|bloqueadores}}): entre los bluff-catchers (manos que de todos modos solo ganan a los {{t:bluff|faroles}}), el solver elige con qué {{t:call|igualar}} más según los {{t:blocker|bloqueadores}} que según la fuerza de la mano por sí sola.
:::
