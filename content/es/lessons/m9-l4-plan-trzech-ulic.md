---
id: m9.l4
module: m9
order: 4
title: "Un plan para tres calles"
sub: "Cuántas calles de valor aguanta una mano"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Has abierto}} desde el botón y la {{t:big-blind|ciega grande}} {{t:call|ha igualado}}. Has ligado un set en un flop {{t:dry|seco}}. ¿Cuántas {{t:value|calles de valor}} aguanta esta mano?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Tres", correct: true, why: "Un set en un flop {{t:dry|seco}} es casi siempre la mejor mano. En cada {{t:street|calle}}, las manos peores del rival (p. ej., un rey, un siete, una {{t:pair|pareja}}) todavía pueden pagar, así que planeas {{t:bet|apostar}} en el flop, el turn y el river." }
      - { text: "Una", why: "Demasiado poco: con una mano tan fuerte, una sola {{t:bet|apuesta}} deja en la {{t:board|mesa}} la mayor parte del valor. Un rival con un rey pagará más de una vez." }
      - { text: "Ninguna: {{t:check|paso}} para no espantar al rival", why: "{{t:check|Pasar}} en todas las {{t:street|calles}} no hace crecer el {{t:pot|bote}}. Un set quiere que el {{t:pot|bote}} crezca, porque suele ganar en el showdown." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "{{t:open|Has abierto}} desde el botón y la {{t:big-blind|ciega grande}} {{t:call|ha igualado}}; el {{t:spr|SPR}} es de aprox. {{n:spr.srp}}. Tienes {{t:top-pair|pareja mayor}} con el mejor kicker. ¿Cuál es el plan?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Normalmente dos {{t:value|calles de valor}}, sin plan de jugar por todo el stack", correct: true, why: "Sí: los reyes y los ochos peores suelen pagar una o dos {{t:bet|apuestas}}. Cuando en el {{t:pot|bote}} hay muchísimo dinero, pagan sobre todo manos mejores que una {{t:pair|pareja}}. Con un {{t:spr|SPR}} de aprox. {{n:spr.srp}}, todo el stack solo entraría con {{t:bet|apuestas}} mayores que el {{t:pot|bote}}." }
      - { text: "Tres {{t:street|calles}} de {{t:bet|apuestas}} grandes hasta el all-in", why: "Con un {{t:spr|SPR}} de aprox. {{n:spr.srp}}, eso son {{t:bet|apuestas}} de aprox. {{n:geo.srp.3}} del {{t:pot|bote}} en cada {{t:street|calle}}. Al llegar al river, en el {{t:pot|bote}} quedarán sobre todo {{t:two-pair|dobles parejas}} y sets, que ganan a una {{t:pair|pareja}}." }
      - { text: "Una {{t:street|calle}} o ninguna", why: "Demasiado prudente: {{t:top-pair|pareja mayor}} con el mejor kicker en un flop {{t:dry|seco}} gana a muchas manos del rival. Normalmente aguanta dos {{t:value|calles de valor}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Has abierto}} desde el botón y la {{t:big-blind|ciega grande}} {{t:call|ha igualado}}. Tienes {{t:pair|pareja}} media. ¿Cuántas {{t:value|calles de valor}} aguanta esta mano?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Una o ninguna: a menudo basta con llegar al showdown", correct: true, why: "Sí: la {{t:pair|pareja}} media gana a los {{t:bluff|faroles}} y a {{t:pair|parejas}} más débiles, pero hay pocas manos peores que paguen varias {{t:bet|apuestas}}. El plan: como mucho una {{t:bet|apuesta}} pequeña, o {{t:check|pasar}} e {{t:call|igualar}}." }
      - { text: "Dos, como {{t:top-pair|pareja mayor}}", why: "La {{t:pair|pareja}} media pierde contra cualquier rey. Tras la segunda {{t:bet|apuesta}}, pagan sobre todo manos que la superan." }
      - { text: "Tres, para que el rival no mejore", why: "Tres {{t:bet|apuestas}} con {{t:pair|pareja}} media las pagan sobre todo manos mejores: las peores {{t:fold|se retiran}} ya tras la primera o la segunda {{t:bet|apuesta}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Bote}} con 4-bet, {{t:spr|SPR}} de aprox. {{n:spr.4bet}}. Tienes {{t:top-pair|pareja mayor}} con el mejor kicker. La mano aguanta dos {{t:value|calles de valor}}. ¿Cuál es el plan?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Dos {{t:bet|apuestas}} de aprox. {{n:geo.4bet.2}} del {{t:pot|bote}}: en el turn entra todo el stack", correct: true, why: "Sí: con un {{t:spr|SPR}} de aprox. {{n:spr.4bet}}, dos {{t:street|calles}} bastan para meter todo el stack. Aquí, dos {{t:value|calles de valor}} con {{t:top-pair|pareja mayor}} significan jugar por todo el stack." }
      - { text: "{{t:bet|Apuesta}} pequeña y {{t:fold|retirarse}} ante un all-in", why: "Con un {{t:spr|SPR}} de aprox. {{n:spr.4bet}}, {{t:fold|retirarse}} ante un all-in con {{t:top-pair|pareja mayor}} con as regala demasiado: te basta con aprox. {{n:eq.jam.4bet}} de equity, y aún menos tras tu propia {{t:bet|apuesta}}." }
      - { text: "{{t:check|Paso}} en cada {{t:street|calle}} para controlar el {{t:pot|bote}}", why: "Controlar el {{t:pot|bote}} tiene sentido con un {{t:spr|SPR}} alto. Aquí el {{t:pot|bote}} ya es grande en relación con el stack, y las manos peores (AQ, QQ, JJ) meterán el resto con gusto." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Bote}} con 3-bet, tienes {{t:position|posición}}, {{t:spr|SPR}} de aprox. {{n:spr.3bet-ip}}. Tienes un set y quieres meter todo el stack hasta el river. ¿Qué línea eliges?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Apostar}} en el flop, el turn y el river, cada vez aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}", correct: true, why: "Sí: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} y {{n:geo.3bet-ip.river}} suman {{n:geo.3bet-ip.total}}, es decir, todo el stack. En cada {{t:street|calle}}, el rival paga una parte razonable del {{t:pot|bote}}." }
      - { text: "{{t:bet|Apostar}} 1/3 del {{t:pot|bote}} en cada {{t:street|calle}}", sizeError: true, why: "Buena línea, tamaño equivocado: tres {{t:bet|apuestas}} de 1/3 del {{t:pot|bote}} solo meten aprox. {{n:g3b.third.total}} de {{n:spr.3bet-ip.stack}}. Un plan para todo el stack requiere aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}." }
      - { text: "{{t:check|Paso}} en el flop y el turn, y en el river voy all-in", why: "En el river, un all-in por todo el stack sería una {{t:bet|apuesta}} varias veces mayor que el {{t:pot|bote}}. El rival solo la pagará con una mano muy fuerte, y las manos peores que habrían pagado tres {{t:bet|apuestas}} más pequeñas {{t:fold|se retirarán}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "¿Por qué conviene fijar el plan para tres {{t:street|calles}} ya en el flop?"
    options:
      - { text: "Porque el tamaño en el flop decide cuánto se puede meter después", correct: true, why: "Sí: el {{t:pot|bote}} crece por multiplicación. Una {{t:bet|apuesta}} pequeña en el flop deja un {{t:pot|bote}} pequeño para el turn y el river, así que después cuesta meter todo el stack sin {{t:bet|apuestas}} muy grandes." }
      - { text: "Porque después no se puede cambiar el plan", why: "Cambias el plan cuando cambia la situación (p. ej., una carta peligrosa en el turn). Se trata de que la primera {{t:bet|apuesta}} encaje con el objetivo: cuántas {{t:value|calles de valor}} y si juegas por todo el stack." }
      - { text: "Porque el rival ve tu plan", why: "El rival no conoce tu plan. El plan te ayuda a ti a elegir el tamaño para que al final haya en el {{t:pot|bote}} tanto como aguante la mano." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Bote}} con una sola subida, {{t:spr|SPR}} de aprox. {{n:spr.srp}}. Tienes {{t:top-pair|pareja mayor}} con un buen kicker. ¿Apuestas con el tamaño geométrico de aprox. {{n:geo.srp.3}} del {{t:pot|bote}}?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "No: es un tamaño para todo el stack, y esta mano suele aguantar dos {{t:street|calles}}", correct: true, why: "Exacto: el tamaño geométrico sirve para meter todo el stack. Con {{t:bet|apuestas}} mayores que el {{t:pot|bote}}, las manos peores dejan de pagar y quedan las manos mejores que una {{t:pair|pareja}}." }
      - { text: "Sí: siempre apuesto con tamaño geométrico", why: "El tamaño geométrico encaja con un plan para todo el stack. La {{t:top-pair|pareja mayor}} con un {{t:spr|SPR}} de aprox. {{n:spr.srp}} normalmente no tiene ese plan." }
      - { text: "No: con {{t:top-pair|pareja mayor}} siempre {{t:check|paso}}", why: "La {{t:top-pair|pareja mayor}} quiere {{t:bet|apuestas}} de valor, solo que más pequeñas y normalmente en dos {{t:street|calles}}, no para todo el stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr|SPR}} {{n:spr.commit}}: en el {{t:pot|bote}} hay {{n:ex.pot}} y los stacks son de {{n:commit.stack}} cada uno. Apuestas aprox. {{n:geo.spr2.2}} del {{t:pot|bote}} en el flop y en el turn, y el rival {{t:call|iguala}}. ¿Qué ocurre con el resto del stack?"
    options:
      - { text: "Tras el turn, todo el stack está en el {{t:pot|bote}}", correct: true, why: "Sí: {{n:geo.spr2.flop}} en el flop y {{n:geo.spr2.turn}} en el turn suman {{n:geo.spr2.total}}. Por eso, con un {{t:spr|SPR}} de {{n:spr.commit}}, dos {{t:value|calles de valor}} con {{t:top-pair|pareja mayor}} bastan para jugar por todo el stack." }
      - { text: "Queda más o menos la mitad para el river", why: "El {{t:pot|bote}} crece por multiplicación: tras el flop hay en él aprox. {{n:geo.spr2.flop-after}}, y una {{t:bet|apuesta}} de aprox. {{n:geo.spr2.2}} en el turn son aprox. {{n:geo.spr2.turn}}, es decir, el resto del stack." }
      - { text: "Queda casi todo el stack", why: "Con un {{t:spr|SPR}} de {{n:spr.commit}}, el stack equivale solo a {{n:spr.commit}} {{t:pot|botes}}. Dos {{t:bet|apuestas}} de aprox. {{n:geo.spr2.2}} del {{t:pot|bote}} meten los {{n:geo.spr2.total}} completos." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Un buen plan empieza en el flop, antes de que hagas tu primera {{t:bet|apuesta}}. Pregúntate: ¿cuántas {{t:value|calles de valor}} aguanta mi mano y quiero jugar por todo el stack? La respuesta combina la fuerza de la mano con el {{t:spr|SPR}}.

## Cuántas {{t:value|calles de valor}}

Con cada {{t:street|calle}}, las manos peores del rival {{t:fold|se retiran}} y en el {{t:pot|bote}} quedan sobre todo manos mejores que la tuya. Por eso, una mano más fuerte aguanta más {{t:bet|apuestas}}:

| Mano | {{t:value|Calles de valor}} (normalmente) |
|---|---|
| Muy fuerte: set, {{t:straight|escalera}}, {{t:two-pair|doble pareja}} alta | Tres |
| {{t:top-pair|Pareja mayor}} con buen kicker, {{t:overpair|sobrepareja}} | Dos; una tercera si el rival paga con manos más débiles |
| {{t:pair|Pareja}} más débil (media, baja) | Una o ninguna |

El número de {{t:street|calles}} de la tabla es una simplificación: mucho depende de la {{t:texture|textura}} de la {{t:board|mesa}}, de las cartas del turn y el river y del rival.

## Combina la mano con el {{t:spr|SPR}}

- **Mano para tres {{t:street|calles}}, la zona de {{t:spr|SPR}} permite jugar por el stack y quieres todo el stack:** apuestas con tamaño geométrico desde el flop (en un {{t:pot|bote}} con 3-bet {{t:in-position|en posición}}, aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}}).
- **Mano para dos {{t:street|calles}} con {{t:spr|SPR}} bajo:** con un {{t:spr|SPR}} de aprox. {{n:spr.commit}}, dos {{t:bet|apuestas}} de aprox. {{n:geo.spr2.2}} del {{t:pot|bote}} ya son todo el stack, así que juegas por el stack.
- **Mano para dos {{t:street|calles}} con {{t:spr|SPR}} alto:** en un {{t:pot|bote}} con una sola subida ({{t:spr|SPR}} de aprox. {{n:spr.srp}}) apuestas por valor, pero no planeas meter todo el stack.

Tres {{t:value|calles de valor}} no es lo mismo que jugar por todo el stack. Una {{t:two-pair|doble pareja}} alta aguanta tres {{t:street|calles}}, pero en un {{t:pot|bote}} con una sola subida ({{t:spr|SPR}} de aprox. {{n:spr.srp}}, por encima de {{n:spr.zone.deep}}) normalmente no juega por todo el stack: en esta zona juegan por el stack los sets, las {{t:straight|escaleras}} y las manos mejores (zonas de {{t:spr|SPR}} de la primera lección).

## Líneas

Una línea es un plan de acciones para las siguientes {{t:street|calles}}. Algunas básicas:

- **{{t:bet|Apostar}}, {{t:bet|apostar}}, {{t:bet|apostar}}:** mano para tres {{t:value|calles de valor}},
- **{{t:bet|Apostar}}, {{t:bet|apostar}}, {{t:check|pasar}}:** mano para dos {{t:street|calles}}; en el river llegas al showdown,
- **{{t:bet|Apostar}} o {{t:check|pasar}}, luego {{t:check|pasar}} e {{t:call|igualar}}:** {{t:pair|pareja}} más débil que quiere llegar barata al showdown.

## El tamaño en el flop fija el resto

El {{t:pot|bote}} crece por multiplicación, así que una {{t:bet|apuesta}} pequeña en el flop deja un {{t:pot|bote}} pequeño para las siguientes {{t:street|calles}}. En un {{t:pot|bote}} con 3-bet, tres {{t:bet|apuestas}} de 1/3 del {{t:pot|bote}} solo meten aprox. {{n:g3b.third.total}} de un stack de {{n:spr.3bet-ip.stack}}, mientras que tres {{t:bet|apuestas}} de aprox. {{n:geo.3bet-ip.3}} del {{t:pot|bote}} meten todo el stack.

:::note Un plan no es una sentencia
En el turn y el river vuelves a evaluar el plan: una carta peligrosa puede reducir el número de {{t:value|calles de valor}}. Cómo jugar el turn y el river lo enseñan los módulos M7 y M8. El número de {{t:value|calles de valor}} para cada clase de manos es una heurística, una síntesis de varios materiales de formación: en un {{t:pot|bote}} con una sola subida, el {{t:spr|SPR}} es demasiado alto para que muchas {{t:top-pair|parejas mayores}} cobren cómodamente tres {{t:value|calles de valor}}.
:::
