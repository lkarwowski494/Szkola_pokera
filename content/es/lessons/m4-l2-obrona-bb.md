---
id: m4.l2
module: m4
order: 2
title: "Defensa de la ciega grande"
sub: "El precio de igualar y una defensa amplia"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "El Button {{t:open|abrió}} a {{n:pf.open-size}} y la {{t:small-blind|ciega pequeña}} {{t:fold|se retiró}}. ¿Qué porcentaje de equity necesitas en la {{t:big-blind|ciega grande}} para que {{t:call|igualar}} sea rentable (sin tener en cuenta el juego después del flop)? Escribe un número."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Pones {{n:bb.call.vs-btn}} más en un {{t:pot|bote}} que, tras {{t:call|igualar}}, tiene {{n:bb.pot-after.vs-btn}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} es aprox. {{n:eq.bb-vs-btn-open}}. Solo necesitarías la mitad si en el {{t:pot|bote}} estuviera únicamente la {{t:bet|apuesta}} del rival; las ciegas en el {{t:pot|bote}} mejoran el precio."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "La {{t:small-blind|ciega pequeña}} {{t:open|abrió}} a {{n:pf.open-size-sb}}. ¿Cuánta equity necesitas en la {{t:big-blind|ciega grande}} para {{t:call|igualar}}?"
    table: { position: BB }
    options:
      - { text: "Aprox. {{n:eq.bb-vs-sb-open}}", correct: true, why: "Pones {{n:bb.call.vs-sb}} más en un {{t:pot|bote}} que, tras {{t:call|igualar}}, tiene {{n:bb.pot-after.vs-sb}}: es aprox. {{n:eq.bb-vs-sb-open}}. El precio es peor que contra el Button, pero a cambio después del flop tienes {{t:position|posición}}." }
      - { text: "Aprox. {{n:eq.bb-vs-btn-open}}", why: "Ese es el precio contra una {{t:open|apertura}} del Button a {{n:pf.open-size}}. La {{t:small-blind|ciega pequeña}} {{t:open|abre}} con un tamaño mayor, así que pagas más." }
      - { text: "Aprox. la mitad", why: "Necesitarías la mitad de la equity si en el {{t:pot|bote}} estuviera solo la {{t:bet|apuesta}} del rival. Aquí también están las ciegas, así que el precio es mejor." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "¿Por qué en la {{t:big-blind|ciega grande}} no {{t:call|igualas}} con todas las manos que tienen aprox. {{n:eq.bb-vs-btn-open}} de equity contra el {{t:range|rango}} del Button?"
    table: { position: BB }
    options:
      - { text: "Porque {{t:out-of-position|fuera de posición}} no realizarás toda tu equity", correct: true, why: "La equity es la probabilidad de ganar si se juega hasta el final sin {{t:bet|apuestas}}. {{t:out-of-position|Fuera de posición}} a menudo {{t:fold|te retirarás}} antes del showdown, así que las manos débiles de distinto palo realizan menos de lo que indica su equity." }
      - { text: "Porque el Button siempre tiene una mano fuerte", why: "El Button {{t:open|abre}} muy amplio; por eso la defensa de la {{t:big-blind|BB}} es amplia." }
      - { text: "Porque hay que ahorrar {{t:chips|fichas}}", why: "Lo que cuenta es el {{t:expected-value|valor esperado}}, no ahorrar {{t:chips|fichas}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "El Button {{t:open|abrió}} a {{n:pf.open-size}} y la {{t:small-blind|ciega pequeña}} {{t:fold|se retiró}}. Tienes QQ en la {{t:big-blind|ciega grande}}. ¿Qué haces?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet a {{n:pf.3bet.oop-total}}", correct: true, why: "QQ es una mano {{t:value|de valor}}. {{t:out-of-position|Fuera de posición}} {{t:raise|subes}} a aprox. {{n:pf.3bet.size-oop}} la {{t:open|apertura}}, para que el Button no {{t:call|iguale}} barato {{t:in-position|en posición}}." }
      - { text: "3-bet a {{n:pf.3bet.ip-total}}", sizeError: true, why: "La acción es buena, pero ese es el tamaño para un jugador {{t:in-position|en posición}} ({{n:pf.3bet.size-ip}} la {{t:open|apertura}}). {{t:out-of-position|Fuera de posición}} {{t:raise|subes}} más: a {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Igualo}}", why: "Pierdes valor: con QQ quieres hacer crecer el {{t:pot|bote}} antes del flop, no jugar un {{t:pot|bote}} pequeño {{t:out-of-position|fuera de posición}}." }
      - { text: "{{t:fold|Me retiro}}", why: "QQ es una de las mejores manos preflop. {{t:fold|Retirarse}} es un gran error." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "El Button {{t:open|abrió}} a {{n:pf.open-size}} y la {{t:small-blind|ciega pequeña}} {{t:fold|se retiró}}. Pinta las manos con las que defiendes la {{t:big-blind|ciega grande}} ({{t:call|igualando}} o con 3-bet)."
---
La {{t:big-blind|ciega grande}} ya tiene una ciega entera en el {{t:pot|bote}}, así que ante una {{t:open|apertura}} paga poco más. Cuando el Button {{t:open|abre}} a {{n:pf.open-size}} y la {{t:small-blind|ciega pequeña}} {{t:fold|se retira}}, para {{t:call|igualar}} solo necesitas aprox. {{n:eq.bb-vs-btn-open}} de equity. Por eso la {{t:big-blind|ciega grande}} es la que defiende más amplio de todas las {{t:position|posiciones}}.

## El precio no lo es todo

La equity indica con qué frecuencia ganas si ambos llegáis al showdown sin más {{t:bet|apuestas}}. {{t:out-of-position|Fuera de posición}} a menudo {{t:fold|te retirarás}} después del flop, así que las manos débiles de distinto palo realizan menos que su equity. Las manos del mismo palo, los {{t:connectors|conectores}} y las {{t:pair|parejas}} medias realizan más; por eso en la tabla defiendes con ellas más a menudo.

```range
vs-open.bb-vs-btn
```

Las soluciones de solver publicadas defienden aquí aprox. {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} de las manos ({{t:call|igualar}} y 3-bet juntos). El solver de la aplicación, del que sale la tabla, defiende aquí más amplio que las soluciones publicadas.

## Contra la {{t:small-blind|ciega pequeña}}

La {{t:small-blind|ciega pequeña}} {{t:open|abre}} con un tamaño mayor, a {{n:pf.open-size-sb}}, así que para {{t:call|igualar}} necesitas aprox. {{n:eq.bb-vs-sb-open}} de equity. El precio es peor, pero después del flop tienes {{t:position|posición}}, así que sigues defendiendo amplio: más de la mitad de las manos.

```range
vs-open.bb-vs-sb
```

La solución de solver publicada defiende aquí aprox. {{n:pf.bb-def.vs-sb.pub}} de las manos. El solver de la aplicación, del que sale la tabla, defiende aquí más cerrado que la solución publicada.

:::note Cómo {{t:raise|subir}} desde la {{t:big-blind|ciega grande}}
Las tablas muestran con qué defender, no cómo: el 3-bet y el {{t:call|igualar}} aparecen juntos, porque la composición de los 3-bets desde la {{t:big-blind|ciega grande}} en el solver de la aplicación difiere de los resultados publicados de otros solvers. Contra el Button, el 3-bet desde la {{t:big-blind|ciega grande}} es de aprox. {{n:pf.3bet.size-oop}} la {{t:open|apertura}}. Haces 3-bet con tus manos más fuertes (TT+, AQ+, AJs+) y con {{t:bluff|faroles}} de la parte baja del {{t:range|rango}} con el que {{t:call|igualas}}: A5s, a veces A4s, y {{t:connectors|conectores}} del mismo palo. Con las {{t:pair|parejas}} medias y pequeñas, KQo y los ases de distinto palo normalmente {{t:call|igualas}}. Contra la {{t:small-blind|ciega pequeña}} tienes {{t:position|posición}}, así que {{t:raise|subes}} menos, aprox. {{n:pf.3bet.size-ip}} la {{t:open|apertura}}. Entonces haces 3-bet sobre todo {{t:value|por valor}} (TT+, AJs+, parte de AQo y KQ), y con A5s y {{t:connectors|conectores}} del mismo palo normalmente {{t:call|igualas}}.
:::
