---
id: m11.l2
module: m11
order: 2
title: "Pagar un all-in"
sub: "Cuánta equity necesitas y por qué pagas más ajustado"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Tienes {{n:m11.depth.10}} en la {{t:big-blind|ciega grande}}, sin ante. La {{t:small-blind|ciega pequeña}} ha ido all-in por {{n:m11.depth.10}}. ¿Qué porcentaje de equity necesitas para que {{t:call|igualar}} sea rentable? Escribe un número."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Tu ciega ya está en el {{t:pot|bote}}, así que pones {{n:m11.call.10.cost}} más. El {{t:pot|bote}} tras el {{t:call|pago}} es de {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "La misma situación, pero los stacks son de {{n:m11.depth.5}} cada uno. ¿Cuánta equity necesitas para {{t:call|igualar}} el all-in?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Pones {{n:m11.call.5.cost}} más en un {{t:pot|bote}} que tras el {{t:call|pago}} es de {{n:m11.call.5.pot}}: {{n:m11.call.5.eq}}. Con un stack más corto, la ciega es una parte mayor del stack, así que el precio es mejor." }
      - { text: "{{n:m11.call.10.eq}}", why: "Ese es el precio con {{n:m11.depth.10}}. Con {{n:m11.depth.5}}, tu ciega es una parte mayor de todo tu stack, así que necesitas menos: {{n:m11.call.5.eq}}." }
      - { text: "La mitad", why: "Necesitarías la mitad si pusieras todo tu stack. La ciega ya está en el {{t:pot|bote}}, así que solo pones {{n:m11.call.5.cost}} más." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacks de {{n:m11.depth.15}} cada uno, y la {{t:small-blind|ciega pequeña}} ha ido all-in. ¿Cuánta equity necesitas para {{t:call|igualar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Pones {{n:m11.call.15.cost}} más en un {{t:pot|bote}} de {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. Cuanto más profundo el stack, más cerca de la mitad." }
      - { text: "{{n:m11.call.5.eq}}", why: "Ese es el precio con {{n:m11.depth.5}}. Con {{n:m11.depth.15}}, la ciega es una parte menor del stack, así que el precio sube a {{n:m11.call.15.eq}}." }
      - { text: "Más de la mitad", why: "Incluso con un stack muy profundo, el precio no supera la mitad: siempre tienes tu ciega en el {{t:pot|bote}}." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "Tienes {{n:m11.depth.10}} en la {{t:big-blind|ciega grande}}, y la {{t:small-blind|ciega pequeña}} ha ido all-in. Pinta las manos con las que {{t:call|igualas}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Con {{n:m11.depth.10}}, el solver va all-in desde la {{t:small-blind|ciega pequeña}} con siete-seis del mismo palo (76s). Tú tienes esta mano en la {{t:big-blind|ciega grande}} y es la {{t:small-blind|ciega pequeña}} la que ha ido all-in. ¿Qué haces?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Ir all-in con 76s es rentable sobre todo gracias a las {{t:fold|retiradas}} del rival. Al {{t:call|igualar}}, solo ganas en el showdown, y contra un {{t:range|rango}} de all-in con muchas cartas altas y {{t:pair|parejas}}. El solver {{t:fold|tira}} esta mano." }
      - { text: "{{t:call|Igualo}}, porque desde la {{t:small-blind|ciega pequeña}} iría all-in con ella", why: "{{t:call|Igualar}} es otra situación: no tienes fold equity y el {{t:range|rango}} del rival es más fuerte que uno aleatorio. Para {{t:call|igualar}} necesitas una mano más fuerte." }
      - { text: "{{t:call|Igualo}}, porque una mano del mismo palo se desarrolla bien", why: "Tras un all-in no hay más juego en el que la mano pueda desarrollarse. Solo cuenta la equity hasta el showdown." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Ciega grande}}, y la {{t:small-blind|ciega pequeña}} ha ido all-in. Tienes una {{t:pair|pareja}} de doses. Con {{n:m11.depth.10}}, el solver {{t:call|iguala}}. ¿Y con {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Se retira}}", correct: true, why: "Con {{n:m11.depth.15}}, el precio sube a {{n:m11.call.15.eq}} y el {{t:range|rango}} de all-in es más estrecho (aprox. {{n:m11.push.15}} de las manos), así que la {{t:pair|pareja}} de doses se topa más a menudo con una {{t:pair|pareja}} más alta. El {{t:range|rango}} de {{t:call|pago}} baja de aprox. {{n:m11.call.10}} a aprox. {{n:m11.call.15}} de las manos." }
      - { text: "{{t:call|Iguala}}, porque una {{t:pair|pareja}} siempre es favorita", why: "Una {{t:pair|pareja}} de doses contra dos cartas más altas es más o menos un cara o cruz, y contra cualquier {{t:pair|pareja}} más alta va claramente por detrás. Con un stack más profundo, el rival {{t:shove|hace push}} con menos manos débiles, así que las {{t:pair|parejas}} son una parte mayor de su {{t:range|rango}}." }
      - { text: "{{t:call|Iguala}}, porque cuanto más profundo el stack, más amplio", why: "Al revés: cuanto más profundo el stack, más cuesta {{t:call|igualar}} y más estrecho es el {{t:range|rango}} de {{t:call|pago}}." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Con {{n:m11.depth.10}}, la {{t:small-blind|ciega pequeña}} va all-in con aprox. {{n:m11.push.10}} de las manos, pero la {{t:big-blind|ciega grande}} solo {{t:call|iguala}} con aprox. {{n:m11.call.10}}. ¿Por qué?"
    options:
      - { text: "Quien paga no tiene fold equity y juega contra un {{t:range|rango}} más fuerte que uno aleatorio", correct: true, why: "Un all-in también gana cuando el rival {{t:fold|se retira}}. {{t:call|Igualar}} solo gana en el showdown, y contra manos que ya han pasado una selección. De ahí la vieja regla: para {{t:call|igualar}} necesitas una mano mejor que para ir all-in primero." }
      - { text: "La {{t:big-blind|ciega grande}} paga más", why: "Ambos arriesgan el mismo stack, y la {{t:big-blind|BB}} ya tiene su ciega en el {{t:pot|bote}}, así que incluso pone menos." }
      - { text: "El solver se equivoca", why: "Es el equilibrio de un juego de all-in o {{t:fold|retirada}}: ningún jugador gana más cambiando solo su propio {{t:range|rango}}. La diferencia viene de la fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Se juega con {{t:bb-ante|big blind ante}}. Tienes {{n:m11.depth.10}} en la {{t:big-blind|ciega grande}} y has puesto un ante de {{n:m11.ante}}. La {{t:small-blind|ciega pequeña}} ha ido all-in. ¿Cuánta equity necesitas para {{t:call|igualar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Pones lo mismo ({{n:m11.call.10.cost}}), pero en el {{t:pot|bote}} también está el ante: tras el {{t:call|pago}}, {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Por eso con ante {{t:call|igualas}} más amplio: aprox. {{n:m11.call.10-ante}} de las manos en lugar de {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "Ese es el precio sin ante. El ante se queda en el {{t:pot|bote}}, así que por la misma cantidad ganas más: {{n:m11.call.10-ante.eq}}." }
      - { text: "Más que sin ante, porque has puesto más", why: "El ante es dinero ya gastado. Solo cuenta cuánto más pones y cuánto puedes ganar." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "Tres jugadores, stacks de {{n:m11.depth.3max}} cada uno. El Button ha ido all-in y la {{t:small-blind|ciega pequeña}} ha {{t:call|igualado}}. En la {{t:big-blind|ciega grande}} solo necesitas {{n:m11.3max.bb-two.eq}} de equity. ¿{{t:call|Igualas}} más amplio que cuando solo el Button ha ido all-in?"
    table: { position: BB }
    options:
      - { text: "No, más ajustado", correct: true, why: "El precio es mejor, pero juegas contra dos {{t:range|rangos}}, incluido el de quien ha pagado y tiene una mano fuerte. Aquí el solver {{t:call|iguala}} con aprox. {{n:m11.3max.call.bb-two}} de las manos, y cuando solo el Button está all-in, con aprox. {{n:m11.3max.call.bb}}." }
      - { text: "Sí, porque el precio es mucho mejor", why: "Un precio mejor no basta: contra dos rivales, la equity de las manos más débiles cae rápido. El solver solo {{t:call|iguala}} con aprox. {{n:m11.3max.call.bb-two}} de las manos." }
      - { text: "Igual, porque solo cuenta tu mano", why: "Cuenta la equity contra las manos de los rivales. Quien paga el all-in del Button tiene un {{t:range|rango}} más fuerte que el Button, así que {{t:call|igualas}} más ajustado." }
---
Cuando un rival va all-in y tú estás en la {{t:big-blind|ciega grande}}, la decisión es sencilla en su forma: {{t:call|igualas}} o te {{t:fold|retiras}}. Tras {{t:call|igualar}} ya no hay más juego, así que solo cuentan el precio y tu equity contra el {{t:range|rango}} de all-in.

## El precio de {{t:call|igualar}}

Tu ciega ya está en el {{t:pot|bote}}. Con un stack de {{n:m11.depth.10}}, pones {{n:m11.call.10.cost}} más, y el {{t:pot|bote}} tras el {{t:call|pago}} es de {{n:m11.call.10.pot}}.

```formula
equity necesaria = cantidad a poner ÷ bote tras el pago
```

| Stack | A poner | {{t:pot|Bote}} tras el {{t:call|pago}} | Equity necesaria |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Cuanto más corto el stack, mejor el precio, porque tu ciega es una parte mayor de todo tu stack.

## {{t:call|Igualas}} más ajustado de lo que {{t:shove|haces push}}

Si vas all-in primero, también ganas cuando el rival {{t:fold|se retira}}. Al {{t:call|igualar}}, solo ganas en el showdown, y contra manos que el rival ha elegido para ir all-in. Por eso para {{t:call|igualar}} necesitas una mano mejor que para ir all-in primero (en la literatura se le llama «gap concept»).

```range
call.bb-10
```

Con {{n:m11.depth.10}}, la {{t:small-blind|ciega pequeña}} va all-in con aprox. {{n:m11.push.10}} de las manos, y la {{t:big-blind|ciega grande}} {{t:call|iguala}} con aprox. {{n:m11.call.10}}. Manos como [[7s 6s]] las {{t:shove|empujas}} desde la {{t:small-blind|ciega pequeña}}, pero las {{t:fold|tiras}} ante un all-in: sin fold equity tienen muy poca equity contra cartas altas y {{t:pair|parejas}}. Como comparación, una tabla de una web de formación da con {{n:m11.depth.10}} un {{t:range|rango}} de {{t:call|pago}} de {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Un stack más profundo significa {{t:call|igualar}} más caro y un {{t:range|rango}} de all-in del rival más estrecho, así que {{t:call|igualas}} con menos frecuencia: aprox. {{n:m11.call.15}} con {{n:m11.depth.15}}, y con {{n:m11.depth.5}} hasta aprox. {{n:m11.call.5}}.

## Cuando aún queda alguien detrás de ti

Con tres jugadores y stacks de {{n:m11.depth.3max}} cada uno, la {{t:small-blind|ciega pequeña}} {{t:call|iguala}} el all-in del Button solo con aprox. {{n:m11.3max.call.sb}} de las manos, aunque necesita {{n:m11.3max.sb.eq}} de equity. La {{t:big-blind|ciega grande}}, en la misma situación y cuando la {{t:small-blind|ciega pequeña}} se ha {{t:fold|retirado}}, pone {{n:m11.3max.bb.cost}} más en un {{t:pot|bote}} de {{n:m11.3max.bb.pot}}, necesita {{n:m11.3max.bb.eq}} de equity y {{t:call|iguala}} con aprox. {{n:m11.3max.call.bb}}. La diferencia viene sobre todo del jugador que tienes detrás (los precios apenas difieren): la {{t:small-blind|ciega pequeña}} puede {{t:call|igualar}} y toparse con una mano aún más fuerte de la {{t:big-blind|ciega grande}}.

```range
call.sb-vs-btn-3max
```

Cuando ya hay dos jugadores all-in, el precio baja a {{n:m11.3max.bb-two.eq}}, pero aun así la {{t:big-blind|ciega grande}} solo {{t:call|iguala}} con aprox. {{n:m11.3max.call.bb-two}} de las manos. Contra dos {{t:range|rangos}}, uno de los cuales ya ha {{t:call|igualado}} el all-in, las manos más débiles pierden equity rápido.

```range
call.bb-vs-two-3max
```

## Con ante, {{t:call|igualas}} más amplio

El ante se queda en el {{t:pot|bote}}, así que por la misma cantidad ganas más: con {{n:m11.depth.10}} y un {{t:bb-ante|big blind ante}} de {{n:m11.ante}}, necesitas {{n:m11.call.10-ante.eq}} en lugar de {{n:m11.call.10.eq}}. Con ante, el rival también {{t:shove|hace push}} más amplio, así que el solver {{t:call|iguala}} con aprox. {{n:m11.call.10-ante}} de las manos.

```range
call.bb-10-ante
```

:::note {{t:range|Rangos}} de esta lección
Las cuadrículas se refieren al juego entre dos jugadores: la {{t:small-blind|ciega pequeña}} contra la {{t:big-blind|ciega grande}} cuando todos los demás se han {{t:fold|retirado}}, y cuentan {{t:chips|fichas}}, no dinero. Cuando en un {{t:tournament|torneo}} cuentan los {{t:payout|premios}}, {{t:call|igualas}} aún más ajustado (próxima lección).
:::
