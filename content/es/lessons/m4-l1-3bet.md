---
id: m4.l1
module: m4
order: 1
title: "Cuando alguien abre antes que tú"
sub: "Retirarte, igualar o hacer 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "El {{t:cutoff|CO}} ha {{t:open|abierto}} a {{n:pf.open-size}}. Quieres {{t:raise|subir}} desde el botón. ¿Hasta cuánto?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "A {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|En posición}} {{t:raise|subes}} a aprox. {{n:pf.3bet.size-ip}} la {{t:open|apertura}}. Es el estándar y deja una buena relación entre el stack y el {{t:pot|bote}} en el flop." }
      - { text: "A {{n:pf.3bet.too-small}}", why: "Demasiado poco: el rival obtiene un precio excelente para {{t:call|igualar}} con casi cualquier mano y seguir jugando." }
      - { text: "A {{n:pf.3bet.too-big}}", why: "Demasiado para jugar {{t:in-position|en posición}}: arriesgas más y, aun así, las mejores manos del rival no se van a {{t:fold|retirar}}." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "El botón ha {{t:open|abierto}} a {{n:pf.open-size}} y la {{t:small-blind|ciega pequeña}} se ha {{t:fold|retirado}}. Quieres {{t:raise|subir}} desde la {{t:big-blind|ciega grande}}. ¿Hasta cuánto?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "A {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Fuera de posición}} {{t:raise|subes}} a aprox. {{n:pf.3bet.size-oop}} la {{t:open|apertura}}. Un tamaño mayor le quita al botón la opción de {{t:call|igualar}} barato {{t:in-position|en posición}}." }
      - { text: "A {{n:pf.3bet.ip-total}}", why: "Es el tamaño para un jugador {{t:in-position|en posición}}. {{t:out-of-position|Fuera de posición}} le das al rival un precio demasiado bueno." }
      - { text: "Solo {{t:call|igualo}}", why: "Con KK quieres hacer crecer el {{t:pot|bote}} de inmediato: es la segunda mejor mano preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "El botón ha {{t:open|abierto}} a {{n:pf.open-size}}. Estás en la {{t:small-blind|ciega pequeña}}. ¿Qué plan es el estándar?"
    table: { position: SB }
    options:
      - { text: "{{t:raise|Subo}} o me {{t:fold|retiro}}", correct: true, why: "Si {{t:call|igualas}}, juegas {{t:out-of-position|fuera de posición}} y aún tienes detrás la {{t:big-blind|ciega grande}}. Desde la {{t:small-blind|ciega pequeña}}, frente a {{t:open|aperturas}} de posiciones tardías, los solvers casi siempre {{t:raise|suben}} o se {{t:fold|retiran}}." }
      - { text: "{{t:call|Igualo}} con muchas manos, porque ya tengo media ciega en el {{t:pot|bote}}", why: "Media ciega es poco. Al {{t:call|igualar}} {{t:out-of-position|fuera de posición}} con la {{t:big-blind|ciega grande}} detrás, {{t:equity-realization|realizas mal la equity}}: ganas una parte del {{t:pot|bote}} menor de la que indica la equity de la mano, porque a menudo te {{t:fold|retiras}} antes del showdown." }
      - { text: "Siempre me {{t:fold|retiro}}", why: "Demasiado cerrado: el botón {{t:open|abre}} muy amplio, así que conviene {{t:raise|subir}} con manos fuertes y con parte de los {{t:bluff|faroles}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Estás en la {{t:big-blind|ciega grande}} frente a una {{t:open|apertura}} del botón. ¿Cuál de estas manos es un 3-bet típico como {{t:bluff|farol}}?"
    table: { position: BB }
    options:
      - { text: "A5 del mismo palo", correct: true, why: "Bloquea AA y AK del rival y, si te {{t:call|igualan}}, tiene opciones de {{t:flush|color}} y de {{t:straight|escalera}}. Es un {{t:bluff|farol}} típico de la parte baja del {{t:range|rango}} con el que {{t:call|igualas}}: desde la {{t:big-blind|ciega grande}} haces 3-bet con las manos más fuertes más {{t:bluff|faroles}} como este." }
      - { text: "K7 de palos distintos", why: "Con esta mano te defiendes {{t:call|igualando}}. Como 3-bet no bloquea nada importante y juega mal cuando el rival {{t:call|iguala}}." }
      - { text: "{{t:pair|Pareja}} de 22", why: "Las {{t:pair|parejas}} más bajas se defienden {{t:call|igualando}}: ganan cuando ligan un set (un {{t:three-of-a-kind|trío}} con una {{t:pocket-pair|pareja de mano}}, es decir, una {{t:pair|pareja}} formada por tus dos {{t:hole-cards|cartas propias}}), y un 3-bet con ellas aguanta mal un 4-bet." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
Cuando alguien antes que tú ha {{t:open|abierto}}, tienes tres opciones: te {{t:fold|retiras}}, {{t:call|igualas}} o vuelves a {{t:raise|subir}}. Esa nueva {{t:raise|subida}} se llama 3-bet, porque es la tercera {{t:bet|apuesta}} de la mano (ciega, {{t:open|apertura}}, {{t:raise|subida}}).

## Tamaño del 3-bet

{{t:in-position|En posición}} {{t:raise|subes}} a aprox. {{n:pf.3bet.size-ip}} la {{t:open|apertura}}; es decir, con una {{t:open|apertura}} a {{n:pf.open-size}}, hasta {{n:pf.3bet.ip-total}}. {{t:out-of-position|Fuera de posición}}, por ejemplo desde las ciegas frente a una {{t:open|apertura}} del {{t:cutoff|CO}} o del botón, a aprox. {{n:pf.3bet.size-oop}} la {{t:open|apertura}}, es decir, {{n:pf.3bet.oop-total}}. Un tamaño mayor {{t:out-of-position|fuera de posición}} le quita al rival la opción de {{t:call|igualar}} barato y jugar después con la ventaja de la {{t:position|posición}}.

## La {{t:position|posición}} decide si {{t:call|igualar}}

Según las soluciones de solver publicadas, el botón frente a una {{t:open|apertura}} del {{t:cutoff|CO}} suele hacer 3-bet con aprox. un {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} de las manos y solo {{t:call|iguala}} con aprox. un {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Frente a una {{t:open|apertura}} de {{t:utg|UTG}} (en esta solución, mínima, a {{n:pf.open-size.solver-utg}}), ya se {{t:call|iguala}} algo más a menudo de lo que se hace 3-bet: aprox. {{n:pf.call-freq.btn-vs-utg}} frente a {{n:pf.3bet-freq.btn-vs-utg}}. El {{t:range|rango}} de {{t:utg|UTG}} es fuerte, así que el 3-bet recibe más a menudo un 4-bet y gana menos veces el {{t:pot|bote}} de inmediato.

```range
vs-open.btn-vs-co
```

La cuadrícula solo muestra qué manos juega el botón (con 3-bet o {{t:call|igualando}}) y con cuáles se {{t:fold|retira}}. El reparto entre hacer 3-bet e {{t:call|igualar}} apréndelo con las cifras de arriba: el solver de la aplicación casi nunca {{t:call|iguala}} en este spot, así que no reproduce ese reparto. En más de una decena de manos, p. ej. A8s, 98s y 44, el solver de la aplicación juega distinto de las soluciones publicadas, así que los ejercicios no las evalúan.

Desde la {{t:small-blind|ciega pequeña}} casi siempre {{t:raise|subes}} o te {{t:fold|retiras}}. {{t:call|Igualar}} significa jugar {{t:out-of-position|fuera de posición}}, y la {{t:big-blind|ciega grande}}, que está detrás de ti, aún puede {{t:raise|subir}}. {{t:out-of-position|Fuera de posición}}, una mano **{{t:equity-realization|realiza peor su equity}}**: gana una parte del {{t:pot|bote}} menor de la que indica su equity, porque te {{t:fold|retiras}} más a menudo antes del showdown y te cuesta más ganar el {{t:pot|bote}} con una {{t:bet|apuesta}}.

```range
vs-open.sb-vs-btn
```

Según la solución de solver publicada, la {{t:small-blind|ciega pequeña}} frente al botón casi no {{t:call|iguala}}: hace 3-bet con aprox. un {{n:pf.3bet-freq.sb-vs-btn}} de las manos, la parte alta de su {{t:range|rango}} (entre otras, 77+, AJo+, KQo, A5s, A4s, T9s), y con el resto se {{t:fold|retira}}. El solver de la aplicación hace aquí 3-bet con un {{n:solver.3bet.sb-vs-btn}} de las manos, incluidas las {{t:pair|parejas}} 55 y 66, con las que la solución publicada también hace 3-bet a menudo; la cuadrícula cuenta como {{t:fold|retirada}} las pocas manos con las que {{t:call|iguala}}. En algunas manos, p. ej. ATo, T9s y A4s, el solver de la aplicación juega distinto de las soluciones publicadas, así que los ejercicios no las evalúan.

## {{t:range|Rango}} {{t:linear|lineal}} o {{t:polarized|polarizado}}

Con {{t:position|posición}} frente a una {{t:open|apertura}} del {{t:cutoff|CO}}, haces 3-bet sobre todo con las mejores manos, desde arriba, y añades algunos {{t:bluff|faroles}} con ases del mismo palo (A5s, A4s), mientras que las manos medias (p. ej. 77–99, AJs, ATs, {{t:connectors|conectores}} del mismo palo) las juegas de forma mixta: con unas haces 3-bet y con otras {{t:call|igualas}}. El rival {{t:call|iguala}} a menudo, así que quieres una mano que juegue bien en el {{t:pot|bote}} después de que te {{t:call|igualen}}. Las fuentes llaman a este {{t:range|rango}} de formas distintas: unas, {{t:linear|lineal}} (construido desde las manos más fuertes hacia abajo); otras, {{t:polarized|polarizado}} (formado sobre todo por manos muy fuertes y {{t:bluff|faroles}}, casi sin manos medias); lo más importante es con qué manos haces 3-bet y con cuáles {{t:call|igualas}}.

Desde la {{t:big-blind|ciega grande}} frente al botón haces 3-bet con las manos más fuertes (TT+, AQ+, AJs+) más {{t:bluff|faroles}} de la parte baja del {{t:range|rango}} con el que {{t:call|igualas}}: A5s, a veces A4s, y {{t:connectors|conectores}} del mismo palo. Los ases del mismo palo bloquean AA y AK del rival y, si les {{t:call|igualan}}, aún pueden ligar {{t:flush|color}} o {{t:straight|escalera}}. Con las {{t:pair|parejas}} medias y bajas, KQo y los ases de palos distintos (AJo–A9o) normalmente solo {{t:call|igualas}}: desde la {{t:big-blind|ciega grande}} entras barato y cierras la acción, así que estas manos ganan más {{t:call|igualando}}. La composición depende del {{t:rake|rake}} y del tamaño del 3-bet, así que 99, KQo y AJo a veces se juegan de formas distintas. Frente a una {{t:open|apertura}} de la {{t:small-blind|ciega pequeña}} haces 3-bet sobre todo por {{t:value|valor}} (TT+, AJs+, parte de AQo y KQ), y con A5s y los {{t:connectors|conectores}} del mismo palo normalmente {{t:call|igualas}}.

Desde la {{t:small-blind|ciega pequeña}} juegas de otra forma: 3-bet o {{t:fold|retirada}}, con la parte alta del {{t:range|rango}} en el 3-bet.

:::note De dónde salen estas reglas
Las cuadrículas del botón y de la {{t:small-blind|ciega pequeña}} proceden del solver de la aplicación y coinciden aproximadamente con las fuentes (en la {{t:small-blind|ciega pequeña}}, salvo algunas manos que los ejercicios no evalúan). Cómo hacer 3-bet desde la {{t:big-blind|ciega grande}} lo enseña una regla basada en resultados publicados de otros solvers, procedentes de varias fuentes independientes: la composición de los 3-bets desde la {{t:big-blind|ciega grande}} en el solver de la aplicación difiere de ellos.
:::
