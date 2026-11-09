---
id: m10.l2
module: m10
order: 2
title: "Tipos de jugadores"
sub: "Nit, reg, jugador pasivo, maníaco"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "Tras {{n:hud.ex.reg.hands}} manos, tu rival tiene un {{t:vpip}} de {{n:hud.ex.passive.vpip}} y un {{t:pfr}} de {{n:hud.ex.passive.pfr}}. ¿Qué dice esto de su juego antes del flop?"
    options:
      - { text: "Es pasivo: con la mayoría de manos solo {{t:call|iguala}} o hace limp", correct: true, why: "La diferencia {{t:vpip}} − {{t:pfr}} es de {{n:hud.ex.passive.gap}} puntos, por encima del umbral de {{n:hud.gap.passive}}. Juega bastantes manos, pero mete la mayoría en el {{t:pot|bote}} sin {{t:raise|subir}}." }
      - { text: "Es agresivo, porque juega muchas manos", why: "El número de manos ({{t:vpip}}) dice lo suelto que juega, no lo agresivo que es. La agresión la indican el {{t:pfr}} y la diferencia entre ambos." }
      - { text: "Es un {{t:nit}}", why: "Un {{t:nit}} juega hasta alrededor del {{n:hud.vpip.nit-max}} de las manos; este jugador juega claramente más." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "Según los datos de población de micro límites online (NL25), los {{t:recreational|jugadores recreativos}} llegan al showdown en el {{n:mda.rec.wtsd}} de los casos y ganan el {{n:mda.rec.wsd}} de los showdowns; los {{t:regular|regulares}}, el {{n:mda.reg.wtsd}} y el {{n:mda.reg.wsd}}. ¿Qué se deduce de esto?"
    options:
      - { text: "Los {{t:recreational|jugadores recreativos}} pagan hasta el final más a menudo y pierden más a menudo: {{t:call|igualan}} con manos más débiles", correct: true, why: "Llegan al showdown más a menudo y lo ganan menos, así que llegan con manos más débiles. Contra ellos apuestas {{t:value|por valor}} con más manos y {{t:bluff|faroleas}} menos." }
      - { text: "Los {{t:recreational|jugadores recreativos}} {{t:bluff|farolean}} más a menudo", why: "Estas cifras hablan de con qué frecuencia llegan al showdown y con qué, no de {{t:bluff|faroles}}. Ganan menos showdowns porque {{t:call|igualan}} con manos más débiles." }
      - { text: "Nada: una diferencia de pocos puntos es ruido", why: "Son datos de toda la población del {{t:stakes|límite}} durante {{n:mda.period.months}} meses, no de unas decenas de manos de un solo jugador. La diferencia se mantiene en NL25, NL50 y NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Apostaste en el flop y en el turn, y tu rival {{t:call|igualó}}. Es un {{t:recreational|jugador recreativo}} pasivo ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} manos). {{t:check|Pasa}}. ¿Qué haces con {{t:top-pair|pareja mayor}} y el segundo mejor kicker?"
    options:
      - { text: "Apuesto {{t:value|por valor}}", correct: true, why: "Este tipo de jugador {{t:call|iguala}} hasta el final con reyes más débiles, ochos y {{t:pair|parejas}} de mano. Más de la mitad de sus {{t:call|pagos}} son manos peores que la tuya, así que la apuesta gana dinero (el umbral del módulo 8)." }
      - { text: "{{t:check|Paso}} para no toparme con una mano mejor", why: "Contra un jugador que {{t:call|iguala}} con manos más débiles, {{t:check|pasar}} es renunciar a valor. Las manos mejores pagarán a veces, pero hay más {{t:call|pagos}} de manos peores." }
      - { text: "Apuesto todo el {{t:pot|bote}} como {{t:bluff|farol}}", why: "Con {{t:top-pair|pareja mayor}} esto no es un {{t:bluff|farol}}: le ganas a muchas de las manos que {{t:call|igualarán}}. La apuesta es {{t:value|por valor}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, tu {{t:straight-draw|proyecto de escalera}} no ha entrado. Tu rival es un {{t:recreational|jugador recreativo}} pasivo ({{t:wtsd}} {{n:mda.rec.wtsd}}) que {{t:call|igualó}} en el flop y en el turn. {{t:check|Pasa}}. ¿Qué haces?"
    options:
      - { text: "{{t:check|Paso}} y renuncio al {{t:pot|bote}}", correct: true, why: "Un {{t:bluff|farol}} solo gana dinero cuando el rival {{t:fold|se retira}} más a menudo que el {{t:alpha}} de tu apuesta. Un jugador que {{t:call|igualó}} dos {{t:street|calles}} y llega a menudo al showdown rara vez {{t:fold|se retira}} en el river." }
      - { text: "Apuesto fuerte, porque no tengo valor en el showdown", why: "En la base (módulo 8) un {{t:bluff|farol}} así puede ser bueno, pero contra este jugador faltan {{t:fold|retiradas}}: el {{t:bluff|farol}} pierde dinero." }
      - { text: "Apuesto poco para que el {{t:bluff|farol}} sea más barato", why: "Una apuesta menor necesita menos {{t:fold|retiradas}}, pero una mano que {{t:call|igualó}} dos {{t:street|calles}} normalmente {{t:call|igualará}} también una apuesta pequeña. Mejor renunciar al {{t:pot|bote}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "{{t:open|Abres}} desde el {{t:cutoff|CO}}. En el Button hay un {{t:nit}}: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} manos. Te hace 3-bet. ¿Qué haces con AJo?"
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Quien juega tan pocas manos hace 3-bet sobre todo con las más fuertes: AQ, AK y {{t:pair|parejas}} altas, que dominan a AJ. Contra él {{t:fold|te retiras}} más a menudo que en la base del módulo 4." }
      - { text: "{{t:call|Igualo}}, porque AJ es una mano fuerte", why: "AJ es fuerte contra un {{t:range|rango}} amplio. Contra el 3-bet de un jugador con un {{t:vpip}} de {{n:hud.ex.nit.vpip}}, a menudo está dominada y fuera de {{t:position|posición}}." }
      - { text: "Hago 4-bet", why: "Un 4-bet con AJ contra un {{t:nit}} juega contra un {{t:range|rango}} que lo domina y que rara vez {{t:fold|se retira}}. No es ni {{t:value|valor}} ni un buen {{t:bluff|farol}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Estás en el Button y todos {{t:fold|se han retirado}}. En la {{t:big-blind|ciega grande}} hay un {{t:nit}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} tras {{n:hud.ex.reg.hands}} manos). ¿Cómo ajustas tu {{t:open|apertura}}?"
    options:
      - { text: "{{t:open|Abro}} más amplio que en la base", correct: true, why: "Un {{t:nit}} defiende la ciega de forma estrecha, así que tu {{t:open|apertura}} gana al instante más a menudo, incluso con una mano débil." }
      - { text: "{{t:open|Abro}} más cerrado, porque el {{t:nit}} tiene manos fuertes", why: "Un {{t:nit}} tiene manos fuertes cuando juega. En la {{t:big-blind|ciega grande}} lo más habitual es que {{t:fold|se retire}}, y ese es tu beneficio." }
      - { text: "Sin cambios: el tipo de jugador no influye en el robo de ciegas", why: "Sí influye. El beneficio del robo depende de la frecuencia con la que la ciega {{t:fold|se retira}}, y un {{t:nit}} {{t:fold|se retira}} a menudo." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "Tu rival es un {{t:maniac|maníaco}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} tras {{n:hud.ex.reg.hands}} manos. Ha apostado en todas las {{t:street|calles}} y en el river {{t:bet|apuesta}} todo el {{t:pot|bote}}. ¿Qué haces con {{t:top-pair|pareja mayor}} y un kicker débil?"
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Contra un jugador que {{t:bluff|farolea}} más que en la base, las manos marginales para {{t:call|igualar}} ganan dinero. La {{t:pair|pareja}} máxima le gana a sus {{t:bluff|faroles}} y a parte de su valor." }
      - { text: "{{t:fold|Me retiro}}, porque una apuesta de todo el {{t:pot|bote}} indica una mano fuerte", why: "En un jugador que juega casi todas las manos {{t:raise|subiendo}} y apuesta en todas las {{t:street|calles}}, una apuesta grande incluye muchos {{t:bluff|faroles}}. Si {{t:fold|te retiras}}, le pagas por ser agresivo." }
      - { text: "{{t:raise|Subo}} all-in", why: "Una {{t:raise|subida}} hace que los {{t:bluff|faroles}} {{t:fold|se retiren}} y que las manos mejores {{t:call|igualen}}. Con una mano que caza {{t:bluff|faroles}}, basta con {{t:call|igualar}}." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Juegas contra un {{t:maniac|maníaco}}. En el turn tienes una mano débil sin opciones de mejorar, y él {{t:check|pasa}}. ¿Qué haces?"
    options:
      - { text: "{{t:check|Paso}}: {{t:bluff|farolear}} a un {{t:maniac|maníaco}} rara vez funciona", correct: true, why: "Un {{t:maniac|maníaco}} rara vez {{t:fold|se retira}} y a menudo {{t:raise|sube}}. Contra él ganas dinero {{t:call|igualando}} con manos más fuertes, no con {{t:bluff|faroles}}." }
      - { text: "Apuesto, porque que un {{t:maniac|maníaco}} {{t:check|pase}} indica debilidad", why: "Puede ser, pero un {{t:maniac|maníaco}} a menudo {{t:raise|sube}} con cualquier mano. Un {{t:bluff|farol}} necesita {{t:fold|retiradas}}, y él da pocas." }
      - { text: "Apuesto all-in para que no pueda {{t:raise|subir}}", why: "Arriesgas todo tu stack para ganar un {{t:pot|bote}} pequeño contra un jugador que rara vez {{t:fold|se retira}}. Es la forma más cara de {{t:bluff|farolear}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Las estadísticas de la lección anterior forman unos cuantos perfiles típicos. El tipo de jugador te dice hacia dónde se aparta de la base: juega demasiado pocas manos, demasiadas manos, {{t:call|iguala}} demasiado a menudo o {{t:raise|sube}} demasiado a menudo.

## Dos cifras, cuatro tipos

El tipo lo lees a partir del {{t:vpip}} y de la diferencia {{t:vpip}} − {{t:pfr}} (6-max, al menos unas {{n:hud.hands.vpip.low}} manos):

| Tipo | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Fallo respecto a la base |
|---|---|---|---|
| {{t:nit|Nit}} | hasta aprox. {{n:hud.vpip.nit-max}} | pequeña | juega demasiado pocas manos |
| {{t:regular|Regular}} ({{t:tag}}, {{t:lag}}) | aprox. {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | pequeña | cerca de la base |
| {{t:recreational|jugador recreativo}} pasivo | desde aprox. {{n:hud.vpip.loose}} | más de {{n:hud.gap.passive}} puntos | demasiadas manos, {{t:call|iguala}} demasiado a menudo |
| {{t:maniac|maníaco}} | desde aprox. {{n:hud.vpip.loose}} | hasta aprox. {{n:hud.gap.aggressive}} puntos | demasiadas manos, {{t:raise|sube}} demasiado a menudo |

Al jugador pasivo con una diferencia grande también se le llama {{t:calling-station}}. Entre los tipos hay zonas de transición (p. ej., un {{t:vpip}} de entre el diez y el veinte por ciento o un jugador suelto con una diferencia de pocos puntos): ahí no asignas un tipo, sino que miras más estadísticas.

## Qué dicen los datos de población

Una base de datos pública de estadísticas da las estadísticas medias de los jugadores de una gran sala online, NL25 6-max, de todas las manos de los últimos {{n:mda.period.months}} meses. En ella, los {{t:regular|regulares}} son jugadores con un {{t:vpip}} de {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} y un resultado superior a {{n:mda.reg.def.wr}}, y los {{t:recreational|jugadores recreativos}}, los que tienen un {{t:vpip}} superior a {{n:mda.rec.def}} y un resultado inferior a {{n:mda.rec.def.wr}}:

| Estadística | {{t:regular|Regulares}} | {{t:recreational|Jugadores recreativos}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Showdowns ganados | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Resultado | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

Los {{t:recreational|jugadores recreativos}} tienen una diferencia {{t:vpip}} − {{t:pfr}} de {{n:mda.rec.gap.pp}} puntos, es decir, son pasivos. Llegan al showdown más a menudo y lo ganan menos: {{t:call|igualan}} con manos más débiles. Además, rara vez {{t:fold|se retiran}} ante un 3-bet. En NL50 y NL100 las cifras son casi iguales.

## El {{t:recreational|jugador recreativo}} pasivo

La base del módulo 8 no cambia: apuestas {{t:value|por valor}} cuando más de la mitad de las manos que {{t:call|igualarán}} son peores, y un {{t:bluff|farol}} gana dinero cuando el rival {{t:fold|se retira}} más a menudo que el {{t:alpha}}. Lo que cambia es el rival: {{t:call|iguala}} con más manos débiles. Por eso:

- apuestas {{t:value|por valor}} con más manos, también más finas, p. ej., {{t:top-pair|pareja mayor}} con un kicker más débil en tres {{t:street|calles}};
- {{t:bluff|faroleas}} menos a menudo, sobre todo en el river: faltan las {{t:fold|retiradas}} con las que el {{t:bluff|farol}} tendría que ganar dinero.

## {{t:nit|Nit}} y {{t:maniac|maníaco}}

**El {{t:nit}}** juega solo manos fuertes. Cuando {{t:raise|sube}} o hace 3-bet, las manos de la parte baja de tu {{t:range|rango}} de {{t:call|pago}} están dominadas más a menudo, así que con ellas {{t:fold|te retiras}} más a menudo que en la base del módulo 4. Cuando está en la ciega, robas más a menudo, porque rara vez defiende.

**El {{t:maniac|maníaco}}** juega muchas manos y {{t:raise|sube}} con casi todas. Sus apuestas contienen más {{t:bluff|faroles}} que en la base, así que {{t:call|igualas}} con las manos marginales para {{t:call|igualar}}, con manos muy fuertes le dejas apostar y tú no {{t:bluff|faroleas}}: rara vez {{t:fold|se retira}}.

:::note De dónde salen estos umbrales
Los umbrales de los tipos son convenciones de entrenadores (dos materiales de formación, cash 6-max online): tomamos la parte común o un intervalo que abarca ambas fuentes. Los datos de población proceden de una base de datos pública de estadísticas (una gran sala online, NL25–NL100, todas las manos de los {{n:mda.period.months}} meses anteriores a octubre de 2026; la página no indica el número de manos). Identificar a un {{t:nit}} o a un {{t:maniac|maníaco}} se basa en las estadísticas de un rival concreto, no en datos de toda la población, así que requiere una muestra.
:::
