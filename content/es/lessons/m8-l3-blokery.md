---
id: m8.l3
module: m8
order: 3
title: "Bloqueadores"
sub: "Con qué mano farolear"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "¿Qué es un {{t:blocker|bloqueador}}?"
    options:
      - { text: "Una carta de tu mano por la que el rival tiene menos {{t:combo|combinaciones}} de alguna mano", correct: true, why: "El rival no puede tener la carta que tienes tú. Si tienes un as, el rival tiene menos ases: menos {{t:pair|parejas}} de ases, menos AK, menos colores con el as." }
      - { text: "Una carta de la {{t:board|mesa}} que estropea un {{t:draw|proyecto}}", why: "A veces se dice así coloquialmente de las cartas de la {{t:board|mesa}}, pero un {{t:blocker|bloqueador}} en este sentido es una carta de tu mano. Las cartas de la {{t:board|mesa}} las ven los dos jugadores." }
      - { text: "Una apuesta pequeña para frenar una apuesta grande del rival", why: "Es la llamada blocking bet, otra cosa. Un {{t:blocker|bloqueador}} es una carta de tu mano que reduce el número de {{t:combo|combinaciones}} del rival." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Sin ninguna información, AK tiene {{n:combos.unpaired}} {{t:combo|combinaciones}}. Tienes un rey (sin as). ¿Cuántas {{t:combo|combinaciones}} de AK puede tener el rival? Escribe el número."
    answer: combos.unpaired.one-blocked
    explanation: "Hay {{n:cards.suits}} ases y quedan {{n:pair.outs.per-rank}} reyes, porque uno lo tienes tú: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Una sola carta elimina una cuarta parte entera de las {{t:combo|combinaciones}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Una {{t:pair|pareja}} de ases tiene {{n:combos.pair}} {{t:combo|combinaciones}}. Tienes un as. ¿Cuántas {{t:combo|combinaciones}} de {{t:pair|pareja}} de ases puede tener el rival? Escribe el número."
    answer: combos.pair.one-blocked
    explanation: "Quedan {{n:pair.outs.per-rank}} ases, y con tres cartas solo se pueden formar {{n:combos.pair.one-blocked}} {{t:pair|parejas}}. Un as en tu mano elimina la mitad de las {{t:combo|combinaciones}} de AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Tienes [[Ah Kc]]. ¿Cuántas {{t:combo|combinaciones}} de AK puede tener el rival?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Quedan {{n:pair.outs.per-rank}} ases y {{n:pair.outs.per-rank}} reyes: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Serían tantas si tuvieras solo el as o solo el rey. Bloqueas ambos valores." }
      - { text: "{{n:combos.unpaired}}", why: "Esas son las {{t:combo|combinaciones}} de AK que hay en la baraja antes de ver tus cartas. Tu as y tu rey no pueden estar en la mano del rival." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "En el river ha salido la tercera carta de corazones y es posible un {{t:flush|color}}. La {{t:big-blind|ciega grande}} {{t:check|pasa}}. Solo tienes as alto y quieres farolear. ¿Con qué mano es mejor el {{t:bluff|farol}}?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "El as de corazones bloquea los colores más fuertes del rival: no puede tener {{t:flush|color}} al as, y esa es una mano que siempre pagará. El rival tiene menos manos con las que {{t:call|igualar}}, así que el {{t:bluff|farol}} funciona más a menudo." }
      - { text: "[[Ad 3c]]", why: "La misma fuerza en el showdown, pero no bloqueas ningún {{t:flush|color}}. El rival conserva todos sus colores, con los que pagará." }
      - { text: "Da igual, las dos son solo as alto", why: "En el showdown sí, pero como {{t:bluff|farol}}, no. El as de corazones reduce el número de colores del rival que pagarán seguro." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "El {{t:flush-draw|proyecto de color}} de picas no ha entrado. La {{t:big-blind|ciega grande}} pasa en el river. Las dos manos tienen solo dama y ocho. ¿Con cuál es mejor farolear?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Sin picas no bloqueas los {{t:draw|proyectos}} fallidos del rival, y esas son manos que se {{t:fold|retirarán}} ante tu apuesta. El resto de cartas de ambas manos es igual." }
      - { text: "[[Qd 8s]]", why: "El ocho de picas bloquea parte de los {{t:flush-draw|proyectos de color}} fallidos (p. ej. [[8s 7s]]) con los que el rival se {{t:fold|retiraría}}. Le quedan, en proporción, más manos con las que pagará." }
      - { text: "Da igual", why: "La diferencia está en el palo del ocho. Una pica en tu mano le quita al rival parte de las manos con las que se retiraría." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "La misma situación: las picas no han entrado, la {{t:big-blind|ciega grande}} {{t:check|pasa}}. Tienes una de dos manos. ¿Con cuál {{t:bluff|faroleas}} y con cuál {{t:check|pasas}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "{{t:bluff|Faroleo}} con [[Qc Jd]], {{t:check|paso}} con [[9c 8c]]", correct: true, why: "La {{t:pair|pareja}} de nueves gana a los {{t:draw|proyectos}} fallidos tras {{t:check|pasar}}. Dama-jota pierde contra casi cualquier mano, así que solo con un {{t:bluff|farol}} puede ganar el {{t:pot|bote}}." }
      - { text: "{{t:bluff|Faroleo}} con [[9c 8c]], {{t:check|paso}} con [[Qc Jd]]", why: "Al revés. Un {{t:bluff|farol}} con la {{t:pair|pareja}} de nueves renuncia a ganar en el showdown, y {{t:check|pasar}} con dama-jota entrega el {{t:pot|bote}} sin pelear." }
      - { text: "{{t:bluff|Faroleo}} con las dos", why: "La {{t:pair|pareja}} de nueves no necesita un {{t:bluff|farol}}: gana a muchas manos tras {{t:check|pasar}}. {{t:bluff|Faroleas}} con manos sin valor en el showdown." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Eliges un {{t:bluff|farol}} en el river entre manos sin valor en el showdown. ¿Qué carta de tu mano ayuda más?"
    options:
      - { text: "Una carta de las manos con las que el rival pagará", correct: true, why: "Bloqueas su valor: tiene menos manos fuertes, así que más a menudo le queda una mano con la que retirarse." }
      - { text: "Una carta del palo del {{t:draw|proyecto}} fallido", why: "Esa carta bloquea manos con las que el rival se {{t:fold|retirará}}. Entonces el {{t:bluff|farol}} funciona menos a menudo." }
      - { text: "La carta más alta, sin importar la mesa", why: "Una carta alta da algo de fuerza en el showdown, pero no dice nada de lo que bloqueas. Fíjate en qué manos del rival pagarán." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "En el river ha salido la tercera carta de corazones. La {{t:big-blind|ciega grande}} {{t:check|pasa}}. Tienes {{t:pair|pareja}} de nueves y el as de corazones. ¿Qué haces?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "La {{t:pair|pareja}} de nueves gana tras {{t:check|pasar}} a muchas manos del rival sin {{t:pair|pareja}}. Un {{t:blocker|bloqueador}} no convierte una mano con valor en el showdown en un buen {{t:bluff|farol}}: primero eliges las manos sin opciones y solo después miras los {{t:blocker|bloqueadores}}." }
      - { text: "Apuesto como {{t:bluff|farol}}, porque tengo el as de corazones", why: "El as de corazones es un buen {{t:blocker|bloqueador}}, pero con {{t:pair|pareja}} de nueves pierdes al {{t:bluff|farolear}}: las manos peores se {{t:fold|retirarían}} de todos modos, y los colores y los reyes pagarán." }
      - { text: "Apuesto {{t:value|por valor}}", why: "¿Quién pagará con una mano peor? En una {{t:board|mesa}} con color posible, las manos más débiles que una {{t:pair|pareja}} de nueves casi siempre se {{t:fold|retirarán}}." }
---
En la lección anterior viste cuántos {{t:bluff|faroles}} necesitas y que {{t:bluff|faroleas}} con manos sin opciones en el showdown. A menudo hay más manos de este tipo de las que necesitas. Entonces deciden los **{{t:blocker|bloqueadores}}**.

## {{t:blocker|Bloqueador}}

El rival no puede tener la carta que tienes tú. Por eso tiene menos {{t:combo|combinaciones}} de manos con esa carta:

| Mano del rival | Sin {{t:blocker|bloqueador}} | Tienes una carta de ese valor |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Si tienes el as y también el rey, el rival solo tiene {{n:combos.unpaired.both-blocked}} {{t:combo|combinaciones}} de AK.

## Bloquea las manos con las que el rival pagará

Un buen {{t:bluff|farol}} tiene una carta de las manos con las que el rival **{{t:call|igualará}}**. Ejemplo: en el river ha salido la tercera carta de corazones. El as de corazones en tu mano significa que el rival no tiene {{t:flush|color}} al as, es decir, una mano que siempre paga. Le quedan más manos con las que retirarse.

## No bloquees las manos con las que el rival se {{t:fold|retirará}}

Cuando el {{t:flush-draw|proyecto de color}} **no entra**, el rival se {{t:fold|retirará}} con sus {{t:draw|proyectos}} fallidos. Si tienes una carta de ese palo, tiene menos, así que tu {{t:bluff|farol}} se encontrará más a menudo con una mano que pagará. De dos {{t:bluff|faroles}} parecidos, eliges el que no tiene cartas del palo del {{t:draw|proyecto}} fallido.

## Primero, la fuerza en el showdown

El orden es fijo: primero apartas las manos que pueden ganar tras {{t:check|pasar}}, y solo entre el resto eliges {{t:bluff|faroles}} con los mejores {{t:blocker|bloqueadores}}. Un buen {{t:blocker|bloqueador}} no convierte en {{t:bluff|farol}} una {{t:pair|pareja}} que ganaría en el showdown. Los {{t:blocker|bloqueadores}} inclinan la elección entre manos parecidas; el efecto en sí es pequeño, así que solo decide cuando las manos tienen una fuerza parecida (lo mismo ocurre al elegir manos para {{t:call|igualar}} en la próxima lección).

:::note De dónde salen estas reglas
Los números de {{t:combo|combinaciones}} son combinatoria. Las reglas para elegir {{t:bluff|faroles}} según los {{t:blocker|bloqueadores}} proceden del programa de estudios y de materiales de formación y análisis de solvers. Cuando faltan otros {{t:bluff|faroles}}, el solver también {{t:bluff|farolea}} con colores fallidos.
:::
