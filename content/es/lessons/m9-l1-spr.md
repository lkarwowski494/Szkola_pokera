---
id: m9.l1
module: m9
order: 1
title: "SPR: stack respecto al bote"
sub: "Cuánto dinero queda detrás del bote"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Abriste}} desde el botón a {{n:pf.open-size}}, la {{t:big-blind|ciega grande}} {{t:call|igualó}} y los stacks son de {{n:format.stack}}. En el flop hay {{n:bb.pot-after.vs-btn}} en el {{t:pot|bote}} y te quedan {{n:spr.srp.stack}} detrás. ¿Cuánto es el {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Aprox. {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. El stack detrás del {{t:pot|bote}} es más de diez veces mayor que el {{t:pot|bote}}: es el {{t:spr}} típico tras una {{t:open|apertura}} y un {{t:call|call}}." }
      - { text: "Aprox. {{n:spr.srp.wrong-full}}", why: "Eso sale con el stack completo de {{n:format.stack}}. Tus {{n:pf.open-size}} ya están en el {{t:pot|bote}}, así que solo cuentas lo que queda: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Aprox. {{n:spr.3bet-ip}}", why: "Ese es el {{t:spr}} tras un 3-bet y un {{t:call|call}}. En un {{t:pot|bote}} con una sola subida el {{t:pot|bote}} es mucho menor, así que el {{t:spr}} es de aprox. {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "El {{t:cutoff|CO}} {{t:open|abrió}} a {{n:pf.open-size}}, tú {{t:raise|subiste}} (3-bet) desde el botón a {{n:pf.3bet.ip-total}}, el {{t:cutoff|CO}} {{t:call|igualó}} y las ciegas {{t:fold|se retiraron}}. En el flop hay {{n:vs3bet.pot-after}} en el {{t:pot|bote}} y te quedan {{n:spr.3bet-ip.stack}} detrás. ¿Cuánto es el {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Aprox. {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Tras un 3-bet el {{t:pot|bote}} es tres veces mayor que tras una {{t:open|apertura}} normal, así que el {{t:spr}} baja de aprox. {{n:spr.srp}} a aprox. {{n:spr.3bet-ip}}." }
      - { text: "Aprox. {{n:spr.3bet-ip.wrong-full}}", why: "Eso sale con el stack completo de {{n:format.stack}}. Tu 3-bet de {{n:pf.3bet.ip-total}} ya está en el {{t:pot|bote}}, así que solo divides lo que queda: {{n:spr.3bet-ip.stack}}." }
      - { text: "Aprox. {{n:spr.srp}}", why: "Ese es el {{t:spr}} en un {{t:pot|bote}} con una sola subida. Tras un 3-bet el {{t:pot|bote}} es mucho mayor y el stack detrás de él, menor, así que el {{t:spr}} baja a aprox. {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "El botón {{t:open|abrió}}, tú {{t:raise|subiste}} (3-bet) desde la {{t:big-blind|ciega grande}} a {{n:pf.3bet.oop-total}} y el botón {{t:call|igualó}}. En el flop hay {{n:spr.3bet-oop.pot}} en el {{t:pot|bote}} y te quedan {{n:spr.3bet-oop.stack}} detrás. ¿Cuánto es el {{t:spr}}?"
    table: { position: BB }
    options:
      - { text: "Aprox. {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Fuera de posición}} el 3-bet es mayor, así que el {{t:pot|bote}} crece más y el {{t:spr}} es más bajo que tras un 3-bet {{t:in-position|en posición}} ({{n:spr.3bet-ip}})." }
      - { text: "Aprox. {{n:spr.3bet-ip}}", why: "Ese es el {{t:spr}} tras un 3-bet {{t:in-position|en posición}} a {{n:pf.3bet.ip-total}}. Tu 3-bet a {{n:pf.3bet.oop-total}} hace un {{t:pot|bote}} mayor, así que el {{t:spr}} es más bajo: aprox. {{n:spr.3bet-oop}}." }
      - { text: "Aprox. {{n:spr.4bet}}", why: "Un {{t:spr}} tan bajo solo lo da un 4-bet. Tras un 3-bet a {{n:pf.3bet.oop-total}} sale aprox. {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacks de {{n:format.stack}}. ¿En qué {{t:pot|bote}} es más bajo el {{t:spr}} en el flop?"
    options:
      - { text: "En un {{t:pot|bote}} con 4-bet y {{t:call|call}}", correct: true, why: "Sí: cuando el botón hace 4-bet a {{n:pf.4bet.example.low}} contra el 3-bet de la {{t:small-blind|ciega pequeña}}, la {{t:small-blind|ciega pequeña}} {{t:call|iguala}} y la {{t:big-blind|ciega grande}} ya {{t:fold|se retiró}}, en el {{t:pot|bote}} hay {{n:spr.4bet.pot}} y detrás solo quedan {{n:spr.4bet.stack}}. El {{t:spr}} es de aprox. {{n:spr.4bet}}." }
      - { text: "En un {{t:pot|bote}} con 3-bet y {{t:call|call}}", why: "Tras un 3-bet el {{t:spr}} es de aprox. {{n:spr.3bet-ip}} {{t:in-position|en posición}} y de aprox. {{n:spr.3bet-oop}} {{t:out-of-position|fuera de posición}}. Un 4-bet lo baja todavía más: a aprox. {{n:spr.4bet}}." }
      - { text: "En un {{t:pot|bote}} con una sola subida", why: "Al revés: aquí el {{t:spr}} es el más alto, aprox. {{n:spr.srp}}, porque el {{t:pot|bote}} en el flop es pequeño." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "¿Por qué tras un 3-bet el {{t:spr}} en el flop es mucho más bajo que tras una {{t:open|apertura}} normal?"
    options:
      - { text: "El {{t:pot|bote}} se multiplica varias veces y el stack detrás de él apenas disminuye", correct: true, why: "Sí: el {{t:pot|bote}} crece de {{n:bb.pot-after.vs-btn}} a {{n:vs3bet.pot-after}}, mientras que el stack detrás solo baja de {{n:spr.srp.stack}} a {{n:spr.3bet-ip.stack}}. El cociente baja de aprox. {{n:spr.srp}} a aprox. {{n:spr.3bet-ip}}." }
      - { text: "Porque tras un 3-bet los jugadores tienen stacks más pequeños", why: "Solo un poco más pequeños: {{n:spr.3bet-ip.stack}} en lugar de {{n:spr.srp.stack}}. Lo que hace bajar el {{t:spr}} es que el {{t:pot|bote}} es tres veces mayor." }
      - { text: "Porque el 3-bet te da {{t:position|posición}}", why: "La {{t:position|posición}} depende de tu asiento en la mesa, no del 3-bet. El {{t:spr}} es solo el stack detrás del {{t:pot|bote}} dividido entre el {{t:pot|bote}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Abriste}} desde el botón a {{n:pf.open-size}} y tienes {{n:format.stack}}. La {{t:big-blind|ciega grande}} solo tiene {{n:spr.short.stack}} e {{t:call|iguala}}. {{t:pot|Bote}} en el flop: {{n:bb.pot-after.vs-btn}}. ¿Cuánto es el {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Aprox. {{n:spr.short}}", correct: true, why: "Calculas con el {{t:effective-stack|stack efectivo}}, es decir, el menor de los dos: a tu rival le quedan {{n:spr.short.behind}}, así que {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Además de lo que ya hay en el {{t:pot|bote}}, cada uno de vosotros puede meter como mucho {{n:spr.short.behind}} más." }
      - { text: "Aprox. {{n:spr.srp}}", why: "Así sería si tu rival también tuviera {{n:format.stack}}. Solo podéis jugaros el stack menor, así que el {{t:spr}} es de aprox. {{n:spr.short}}." }
      - { text: "No se puede calcular porque los stacks son distintos", why: "Sí se puede: tomas el stack menor (el efectivo). A tu rival le quedan {{n:spr.short.behind}}, así que el {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "¿Cuándo calculas el {{t:spr}} que te dice cómo jugar la mano después del flop?"
    options:
      - { text: "En el flop, antes de que alguien haga una {{t:bet|apuesta}}", correct: true, why: "Sí: el {{t:spr}} se puede calcular en cualquier {{t:street|calle}} (en M7 lo calculaste en el turn), pero para el plan de la mano tomas el stack detrás del {{t:pot|bote}} dividido entre el {{t:pot|bote}} al empezar el flop. Así sabes cuántos {{t:pot|botes}} quedan por jugar en tres {{t:street|calles}}." }
      - { text: "Antes de la mano, antes de que alguien {{t:raise|suba}}", why: "Antes del flop todavía no sabes lo grande que será el {{t:pot|bote}}. El {{t:spr}} depende precisamente de lo que pasó antes del flop: tras una {{t:open|apertura}}, aprox. {{n:spr.srp}}; tras un 3-bet, aprox. {{n:spr.3bet-ip}}." }
      - { text: "En el river, antes de la última {{t:bet|apuesta}}", why: "En el river solo queda una decisión. El {{t:spr}} también se puede calcular ahí, pero para el plan de la mano lo más útil es el {{t:spr}} del flop, porque abarca las tres {{t:street|calles}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "{{t:raise|Subiste}} desde el botón (3-bet) y el {{t:cutoff|CO}} {{t:call|igualó}}. El {{t:spr}} en el flop es de aprox. {{n:spr.3bet-ip}}. Has ligado {{t:top-pair|pareja mayor}} con buen kicker. ¿Cómo tratas esta mano?"
    table: { position: BTN }
    options:
      - { text: "Como una mano límite: la juegas {{t:value|por valor}}, pero no siempre {{t:call|igualas}} el all-in del rival", correct: true, why: "Un {{t:spr}} de aprox. {{n:spr.3bet-ip}} está en la zona de {{n:spr.zone.low}} a {{n:spr.zone.mid}}, donde la {{t:top-pair|pareja mayor}} es una mano límite. Jugarte todo el stack depende de cómo juega el rival y de cómo es la {{t:board|mesa}}." }
      - { text: "Siempre te juegas todo el stack", why: "Normalmente eso solo pasa con un {{t:spr}} por debajo de aprox. {{n:spr.zone.low}}, p. ej., tras un 4-bet (aprox. {{n:spr.4bet}}). Con un {{t:spr}} de aprox. {{n:spr.3bet-ip}} hacen falta más {{t:bet|apuestas}} para llegar al all-in, y hasta el final pagan sobre todo manos más fuertes." }
      - { text: "Juegas con cautela, como con un {{t:spr}} muy alto", why: "Con tanta cautela juegas la {{t:top-pair|pareja mayor}} por encima de aprox. {{n:spr.zone.deep}}, p. ej., en un {{t:pot|bote}} con una sola subida (aprox. {{n:spr.srp}}). Tras un 3-bet el {{t:spr}} es mucho más bajo." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival va all-in por {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). ¿Cuánta equity necesitas para {{t:call|igualar}}? Escribe el número en porcentaje."
    answer: eq.jam.spr2
    explanation: "Pones {{n:commit.stack}} y el {{t:pot|bote}} tras el {{t:call|call}} es {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Equity necesaria = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "En el flop el rival va all-in con todo su stack ({{n:format.stack}} al principio de la mano). ¿En qué {{t:pot|bote}} necesitas menos equity para {{t:call|igualar}}?"
    options:
      - { text: "Tras un 4-bet: aprox. {{n:eq.jam.4bet}}", correct: true, why: "Con un {{t:spr}} de aprox. {{n:spr.4bet}} pones {{n:spr.4bet.stack}} para ganar un {{t:pot|bote}} de {{n:spr.4bet.pot}} y el stack del rival. Cuanto más bajo el {{t:spr}}, mejor precio." }
      - { text: "Tras un 3-bet: aprox. {{n:eq.jam.3bet-ip}}", why: "Tras un 3-bet {{t:in-position|en posición}} necesitas aprox. {{n:eq.jam.3bet-ip}}. Tras un 4-bet el {{t:pot|bote}} es mayor en relación con el stack, así que basta con aprox. {{n:eq.jam.4bet}}." }
      - { text: "Tras una {{t:open|apertura}} y un {{t:call|call}}: aprox. {{n:eq.jam.srp}}", why: "Es el peor precio de los tres: con un {{t:spr}} de aprox. {{n:spr.srp}} pones {{n:spr.srp.stack}} para ganar un {{t:pot|bote}} pequeño de {{n:bb.pot-after.vs-btn}} y el stack del rival." }
---
Antes del flop decides cuánto dinero entra en el {{t:pot|bote}}. Después del flop lo que cuenta es cuánto queda todavía detrás. Un solo número une las dos cosas: el {{t:spr}}.

## Qué es el {{t:spr}}

El {{t:spr}} (en inglés, stack-to-pot ratio) es la relación entre el stack y el {{t:pot|bote}} al principio de una {{t:street|calle}}. Se puede calcular en cualquier {{t:street|calle}} (en M7 lo calculaste en el turn), pero para el plan de la mano tomas el {{t:spr}} del flop, antes de que alguien haga una {{t:bet|apuesta}}.

```formula
SPR = stack efectivo ÷ bote en el flop
```

El {{t:effective-stack|stack efectivo}} es el menor de los dos stacks, sin contar lo que ya está en el {{t:pot|bote}}. Es lo máximo que cualquiera de los dos jugadores puede añadir todavía al {{t:pot|bote}}: además del {{t:pot|bote}}, no puedes ganarle al rival más que el {{t:effective-stack|stack efectivo}}, y eso es lo máximo que aún puedes perder.

Ejemplo: {{t:open|abriste}} desde el botón a {{n:pf.open-size}} y la {{t:big-blind|ciega grande}} {{t:call|igualó}}. El {{t:pot|bote}} en el flop es de {{n:bb.pot-after.vs-btn}} y te quedan {{n:spr.srp.stack}} detrás. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## El preflop fija el {{t:spr}}

Cada {{t:raise|subida}} antes del flop multiplica varias veces el {{t:pot|bote}}, mientras que el stack detrás de él disminuye mucho más despacio. Por eso el {{t:spr}} depende mucho de lo que pasó antes del flop.

| {{t:pot|Bote}} (stacks de {{n:format.stack}}) | {{t:pot|Bote}} en el flop | Stack detrás del {{t:pot|bote}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Apertura}} y {{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position|en posición}} y {{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet desde la {{t:big-blind|ciega grande}} y {{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-bet del botón contra el 3-bet de la {{t:small-blind|ciega pequeña}} y {{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Zonas de {{t:spr}}

Las zonas de {{t:spr}} las calculas con el {{t:spr}} del flop. Cuanto más alto es el {{t:spr}}, más fuerte tiene que ser la mano para jugarte todo el stack:

| {{t:spr}} | Con qué te juegas normalmente todo el stack |
|---|---|
| por debajo de {{n:spr.zone.low}} | {{t:top-pair|Pareja mayor}} o mejor |
| de {{n:spr.zone.low}} a {{n:spr.zone.mid}} | La {{t:top-pair|pareja mayor}} es una mano límite |
| de {{n:spr.zone.mid}} a {{n:spr.zone.deep}} | {{t:two-pair|Doble pareja}} alta o mejor |
| por encima de {{n:spr.zone.deep}} | Set, {{t:straight|escalera}} o mejor |

Tras una {{t:open|apertura}} y un {{t:call|call}} ({{t:spr}} de aprox. {{n:spr.srp}}) estás en la zona más alta; tras un 3-bet (aprox. {{n:spr.3bet-ip}}), en la zona donde la {{t:top-pair|pareja mayor}} es límite, y tras un 4-bet (aprox. {{n:spr.4bet}}), en la más baja. Los umbrales son una simplificación. Las fuentes dividen las zonas de forma distinta, pero coinciden en que por debajo de aprox. {{n:spr.zone.low}} la {{t:top-pair|pareja mayor}} se juega el stack y que, con un {{t:spr}} más alto, una sola {{t:pair|pareja}} lo hace cada vez menos. El límite de {{n:spr.zone.mid}} es una convención adoptada en la aplicación. El umbral de {{n:spr.zone.deep}} sale de las cuentas: con un {{t:spr}} de {{n:spr.zone.deep}}, tres {{t:bet|apuestas}} del tamaño del {{t:pot|bote}} te llevan al all-in.

## {{t:spr}} bajo: mejor precio para el all-in

Cuando el rival va all-in con todo su stack, pones tu stack para ganar el {{t:pot|bote}} y su stack. Equity necesaria = stack ÷ ({{t:pot|bote}} + 2·stack). Con un {{t:spr}} de {{n:spr.commit}} es {{n:eq.jam.spr2}}; tras un 4-bet, aprox. {{n:eq.jam.4bet}}; tras un 3-bet, aprox. {{n:eq.jam.3bet-ip}}, y en un {{t:pot|bote}} con una sola subida, ya aprox. {{n:eq.jam.srp}}.

Cuanto más bajo es el {{t:spr}}, menos dinero queda por jugar y más fácil es meter todo el stack. Cuanto más alto, más {{t:street|calles}} y {{t:bet|apuestas}} quedan antes de que el stack entre en el {{t:pot|bote}}.

:::note De dónde salen estos números
Los {{t:pot|botes}} y los stacks salen de los tamaños del módulo sobre el juego preflop ({{t:open|apertura}} a {{n:pf.open-size}}, 3-bet a {{n:pf.3bet.ip-total}} o {{n:pf.3bet.oop-total}}, 4-bet a {{n:pf.4bet.example.low}}). El {{t:pot|bote}} tras el 4-bet es un escenario: el botón hace 4-bet al 3-bet de la {{t:small-blind|ciega pequeña}}, la {{t:small-blind|ciega pequeña}} {{t:call|iguala}} y la {{t:big-blind|ciega grande}} ya {{t:fold|se retiró}}, así que su ciega se queda en el {{t:pot|bote}}. Otro tamaño da un {{t:spr}} algo distinto, pero el orden es siempre el mismo: cuantas más {{t:raise|subidas}} antes del flop, más bajo es el {{t:spr}}.
:::
