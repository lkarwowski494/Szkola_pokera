---
id: m4.l3
module: m4
order: 3
title: "Cuando recibes un 3-bet"
sub: "Retirarte, pagar o hacer 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}} a {{n:pf.open-size}}, el Button {{t:raise|ha subido}} a {{n:pf.3bet.ip-total}} y las ciegas {{t:fold|se han retirado}}. ¿Qué parte de tu {{t:range|rango}} de {{t:open|apertura}} debes continuar como mínimo ({{t:call|igualar}} o hacer 4-bet) para que el Button no gane con su 3-bet con cualquier mano?"
    table: { position: CO }
    options:
      - { text: "Aprox. {{n:mdf.vs-3bet-ip-size}} de tu {{t:range|rango}} de {{t:open|apertura}}", correct: true, why: "El Button arriesga {{n:pf.3bet.ip-total}} para ganar {{n:vs3bet.win}}. Si {{t:fold|te retiras}} en más del {{n:alpha.vs-3bet-ip-size}} de los casos, su 3-bet gana incluso con la peor mano." }
      - { text: "Aprox. la mitad de tu {{t:range|rango}}", why: "Demasiado para un mínimo: según las matemáticas basta con {{n:mdf.vs-3bet-ip-size}}. Según las soluciones de solvers y las tablas, {{t:open|quien abre}} {{t:fold|se retira}} con aprox. {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} de sus {{t:open|aperturas}}, así que continúa con menos de la mitad del {{t:range|rango}}." }
      - { text: "Siempre, con cualquier mano", why: "Entonces pagas 3-bets con manos que pierden contra el {{t:range|rango}} del Button. {{t:fold|Retirarte}} con la parte más débil de tus {{t:open|aperturas}} es lo correcto." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}} a {{n:pf.open-size}}, el Button {{t:raise|ha subido}} a {{n:pf.3bet.ip-total}} y las ciegas {{t:fold|se han retirado}}. ¿Qué haces?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "KJ de distinto palo {{t:out-of-position}} suele estar dominado por AK, AJ y KQ, y después del flop es difícil de jugar. Los materiales de formación recomiendan aquí {{t:fold}}." }
      - { text: "{{t:call|Igualo}}", why: "Tienta porque son cartas altas, pero {{t:out-of-position}} esta mano {{t:equity-realization|realiza su equity}} mal y a menudo pierde contra un kicker mejor." }
      - { text: "Hago 4-bet", why: "KJo es demasiado débil para hacer 4-bet {{t:value|por valor}}, y como {{t:bluff}} no bloquea las manos con las que continúa el Button." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}} a {{n:pf.open-size}}, el Button {{t:raise|ha subido}} a {{n:pf.3bet.ip-total}} y las ciegas {{t:fold|se han retirado}}. ¿Qué haces?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "Hago 4-bet", correct: true, why: "Con AK sueles hacer 4-bet: quiere meter el stack, bloquea AA y KK del rival y domina a AQ, KQ y ases más débiles." }
      - { text: "{{t:call|Igualo}}", why: "Algunas fuentes a veces {{t:call|igualan}} con AK, pero lo habitual es hacer 4-bet: {{t:out-of-position}}, tras {{t:call|igualar}} pierdes la {{t:initiative|iniciativa}} y valor." }
      - { text: "{{t:fold|Me retiro}}", why: "AK es una de las mejores manos preflop. {{t:fold|Retirarte}} aquí es un gran error." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "{{t:open|Has abierto}} desde el Button a {{n:pf.open-size}}, la {{t:small-blind}} {{t:fold|se ha retirado}} y la {{t:big-blind}} {{t:raise|ha subido}} a {{n:pf.3bet.oop-total}}. ¿Qué haces?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Un {{t:connectors|conector}} del mismo palo {{t:in-position}} {{t:equity-realization|realiza bien su equity}}: liga {{t:straight|escaleras}} y colores, y cuando falla, es fácil {{t:fold|retirarse}} con él en el flop." }
      - { text: "{{t:fold|Me retiro}}", why: "{{t:in-position|En posición}}, esta mano es lo bastante jugable para defenderla. {{t:fold|Retirarse}} sería demasiado cerrado." }
      - { text: "Hago 4-bet", why: "Como {{t:bluff}} funcionan mejor los ases del mismo palo, porque bloquean AA y AK. 87s prefiere ver el flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "{{t:open|Has abierto}} desde el Button a {{n:pf.open-size}}, la {{t:small-blind}} {{t:fold|se ha retirado}} y la {{t:big-blind}} {{t:raise|ha subido}} a {{n:pf.3bet.oop-total}}. ¿Qué haces?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Según una de las fuentes, ante un 3-bet grande {{t:fold|te retiras}} con las {{t:pair|parejas}} más bajas incluso {{t:in-position}}: ganan sobre todo al ligar un set y el precio es demasiado alto. Otra fuente admite {{t:call|igualar}} con ellas {{t:in-position}}." }
      - { text: "{{t:call|Igualo}}, porque tengo {{t:position|posición}}", why: "La {{t:position|posición}} ayuda, pero con un 3-bet a {{n:pf.3bet.oop-total}} el precio es demasiado alto para una mano que necesita ligar un set." }
      - { text: "Hago 4-bet", why: "Una {{t:pair|pareja}} de 33 no es mano para hacer 4-bet: ni es valor ni es un buen {{t:bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}} a {{n:pf.open-size}}, el Button {{t:raise|ha subido}} a {{n:pf.3bet.ip-total}} y las ciegas {{t:fold|se han retirado}}. ¿Qué haces?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "Hago 4-bet", correct: true, why: "Una de las fuentes hace 4-bet con QQ (y JJ) en la gran mayoría de los casos: el Button continúa con muchas {{t:pair|parejas}} y ases más débiles." }
      - { text: "{{t:call|Igualo}}", correct: true, why: "También es una buena jugada: otra fuente incluye QQ en el {{t:range|rango}} de {{t:call|pago}} para no hacer que el Button tire sus manos más débiles. Las fuentes difieren, así que ambas jugadas son buenas." }
      - { text: "{{t:fold|Me retiro}}", why: "QQ es la tercera mejor mano preflop. {{t:fold|Retirarse}} es un gran error." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:open|Has abierto}} desde el {{t:cutoff|CO}} a {{n:pf.open-size}}, el Button {{t:raise|ha subido}} a {{n:pf.3bet.ip-total}} y las ciegas {{t:fold|se han retirado}}. ¿Qué haces?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Un as fuerte del mismo palo es la base del {{t:range|rango}} de {{t:call|pago}}: bloquea AA y AK, y liga colores y buenas {{t:pair|parejas}}." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado: AJs está entre las mejores manos para defenderse de un 3-bet." }
      - { text: "Hago 4-bet {{t:value|por valor}}", why: "AJs es demasiado débil para querer jugarse todo el stack. Las manos mejores del Button lo dominan." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "{{t:open|Has abierto}} desde el Button a {{n:pf.open-size}}, la {{t:small-blind}} {{t:raise|ha subido}} a {{n:pf.3bet.oop-total}} y la {{t:big-blind}} {{t:fold|se ha retirado}}. Tienes KK y quieres hacer 4-bet. ¿A cuánto?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "A aprox. {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|En posición}}, el 4-bet es de aprox. {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} el 3-bet. Si la {{t:small-blind}} {{t:call|iguala}}, en el {{t:pot|bote}} hay aprox. {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (con la {{t:big-blind|ciega grande}} muerta), y en los stacks quedan aprox. {{n:spr.4bet.high}}–{{n:spr.4bet}} veces lo que hay en el {{t:pot|bote}}." }
      - { text: "A {{n:pf.4bet.too-small}}", why: "Demasiado poco: le das al rival un precio muy bueno para {{t:call|igualar}} {{t:out-of-position}}." }
      - { text: "All-in por {{n:format.stack}}", why: "Con stacks de {{n:format.stack}}, el all-in hace que el rival tire las manos más débiles con las que pagaría el 4-bet. Ganas menos." }
---
El 3-bet es la respuesta del rival a tu {{t:open}}. Tienes tres opciones: {{t:fold|te retiras}}, {{t:call|igualas}} o {{t:raise|vuelves a subir}}, es decir, haces 4-bet.

:::note De dónde salen estas reglas
Esta lección se basa en materiales de formación de varias fuentes y en resultados publicados de otros solvers, no en el solver de la aplicación. En el juego contra un 3-bet, el solver de la aplicación aún no ha superado la validación, por eso las reglas están marcadas como heurísticas.
:::

## Cuánto continuar

Cuando el Button {{t:raise|sube}} tu {{t:open}} desde el {{t:cutoff|CO}} a {{n:pf.3bet.ip-total}}, arriesga esa cantidad para ganar {{n:vs3bet.win}}. Si {{t:fold|te retiras}} en más del {{n:alpha.vs-3bet-ip-size}} de los casos, su 3-bet gana con cualquier mano. Por tanto, debes continuar como mínimo con aprox. {{n:mdf.vs-3bet-ip-size}} de tu {{t:range|rango}} de {{t:open|apertura}}.

Según una solución de solver publicada ({{t:cutoff|CO}} contra un 3-bet del Button a {{n:pf.3bet.ip-total}}), {{t:open|quien abre}} {{t:fold|se retira}} con aprox. {{n:pf.vs3bet.pub1.fold}} de sus {{t:open|aperturas}}, {{t:call|iguala}} con aprox. {{n:pf.vs3bet.pub1.call}} y hace 4-bet con aprox. {{n:pf.vs3bet.pub1.4bet}}; las tablas simplificadas de otra fuente dan aprox. {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. Adoptamos intervalos cercanos a ambas fuentes: {{t:fold}} aprox. {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call}} aprox. {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet aprox. {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. El límite superior de {{t:fold|retiradas}} queda justo por debajo del umbral del {{n:alpha.vs-3bet-ip-size}}: si te retiraras más a menudo, el 3-bet del Button ganaría con cualquier mano. Para {{t:call|igualar}} necesitas aprox. {{n:eq.call-3bet-ip-size}} de equity: pones {{n:vs3bet.call}} en un {{t:pot|bote}} que, tras el {{t:call|pago}}, tiene {{n:vs3bet.pot-after}}.

## {{t:out-of-position|Fuera de posición}}, elige con cuidado

{{t:out-of-position|Fuera de posición}}, {{t:call|igualas}} con manos que juegan bien después del flop: sobre todo cartas altas del mismo palo (KQs, QJs), ases fuertes del mismo palo, {{t:pair|parejas}} medias y altas y parte de los {{t:connectors|conectores}} del mismo palo. Las manos más débiles de distinto palo, como KJo, ATo o QTo, suelen estar dominadas, así que {{t:fold|te retiras}} con ellas.

## {{t:in-position|En posición}}, defiendes con más manos

{{t:in-position|En posición}}, también {{t:call|igualas}} con {{t:pair|parejas}} de 66 a TT y {{t:connectors|conectores}} del mismo palo (T9s, 98s, 87s). Según una de las fuentes, ante un 3-bet grande {{t:fold|te retiras}} con las {{t:pair|parejas}} más bajas incluso {{t:in-position}}: ganan sobre todo al ligar un set y el precio es demasiado alto. Otra fuente admite {{t:call|igualar}} con ellas {{t:in-position}}.

## 4-bet

Con AA, KK y AK sueles hacer 4-bet {{t:value|por valor}}; con AK, algunas fuentes a veces {{t:call|igualan}}. Las fuentes juegan QQ y JJ de forma distinta: una hace sobre todo 4-bet y la otra {{t:call|iguala}}. Como {{t:bluff}}, lo mejor son los ases del mismo palo, por ejemplo A5s: bloquean AA y AK del rival y, tras un {{t:call|pago}}, tienen opciones de ligar {{t:flush}} y {{t:straight|escalera}}. El tamaño del 4-bet es de aprox. {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} el 3-bet {{t:in-position}} y de {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position}}. Por ejemplo, cuando desde el Button haces 4-bet al 3-bet de la {{t:small-blind|ciega pequeña}} a {{n:pf.3bet.oop-total}} (la {{t:big-blind}} {{t:fold|se ha retirado}}), {{t:raise|subes}} a {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; cuando desde el {{t:cutoff|CO}} haces 4-bet al 3-bet del Button a {{n:pf.3bet.ip-total}}, {{t:raise|subes}} a aprox. {{n:pf.4bet.oop-example.low}}. Tras un {{t:call|pago}}, en los stacks quedan aprox. {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} veces lo que hay en el {{t:pot|bote}}, así que las buenas manos meten fácilmente el resto.
