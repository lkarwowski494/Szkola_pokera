---
id: m10.l3
module: m10
order: 3
title: "Desviarse de la base"
sub: "Con qué manos y hasta dónde"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Sabes que, en esta línea, el rival {{t:bluff|farolea}} un poco más a menudo que en equilibrio. ¿Con qué manos cambias primero tu decisión?"
    options:
      - { text: "Con las manos que en la base mezclan {{t:call|igualar}} y {{t:fold|retirarse}}: ahora siempre {{t:call|igualas}}", correct: true, why: "En equilibrio, estas manos son indiferentes, porque el rival tiene exactamente los {{t:bluff|faroles}} necesarios. Basta un pequeño exceso de {{t:bluff|faroles}} para que {{t:call|igualar}} gane más que {{t:fold|retirarse}}." }
      - { text: "Con las manos más débiles, que en la base siempre se {{t:fold|retiran}}", why: "Estas manos pierden incluso contra parte de los {{t:bluff|faroles}} o necesitan un exceso mucho mayor. Solo cambian cuando el rival se aleja mucho del equilibrio." }
      - { text: "Con las manos más fuertes: ahora las {{t:raise|subes}}", why: "Las manos más fuertes las sigues jugando de todos modos. El cambio empieza por las manos que están en el límite de la decisión." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "En un ejemplo de solver publicado, el rival {{t:bluff|farolea}} en el river con aprox. {{n:overbluff.lock}} de sus apuestas en lugar de aprox. {{n:overbluff.base}}. ¿Cómo cambia tu respuesta a su apuesta con manos que cazan {{t:bluff|faroles}}?"
    options:
      - { text: "Dejas de {{t:fold|retirarte}}: las manos que en la base mezclaban ahora siempre {{t:call|igualan}}", correct: true, why: "Eso bastó para que, en la solución con la estrategia del rival bloqueada, la defensa pasara a {{t:call|igualar}} siempre. Las manos indiferentes reaccionan al menor exceso de {{t:bluff|faroles}}." }
      - { text: "Casi nada: unos pocos puntos son demasiado poco para cambiar algo", why: "Para las manos indiferentes, unos pocos puntos es mucho: en equilibrio, {{t:call|igualar}} y {{t:fold|retirarse}} les dan lo mismo, así que cualquier exceso de {{t:bluff|faroles}} inclina la balanza hacia {{t:call|igualar}}." }
      - { text: "Empiezas a {{t:raise|subir}} con manos que cazan {{t:bluff|faroles}}", why: "Con una {{t:raise|subida}}, el rival abandona sus {{t:bluff|faroles}} y te {{t:call|igualan}} las manos mejores. Una mano que caza {{t:bluff|faroles}} gana al {{t:call|igualar}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Sabes que, en una línea concreta, el rival {{t:bluff|farolea}} menos a menudo que en equilibrio. ¿Qué haces con una mano que caza {{t:bluff|faroles}} y que en la base a veces {{t:call|iguala}} y a veces se {{t:fold|retira}}?"
    options:
      - { text: "Siempre me {{t:fold|retiro}}", correct: true, why: "Cuando hay menos {{t:bluff|faroles}} de los que exige el equilibrio, las manos indiferentes pierden al {{t:call|igualar}}. Resultado del solver: con déficit de {{t:bluff|faroles}}, siempre te {{t:fold|retiras}}." }
      - { text: "Siempre {{t:call|igualo}}, para que el rival no me explote con {{t:bluff|faroles}}", why: "Un rival que {{t:bluff|farolea}} demasiado poco no puede aprovechar que te {{t:fold|retires}}. Eres tú quien aprovecha su error al {{t:fold|retirarte}}." }
      - { text: "Juego como en la base, mitad y mitad", why: "Mezclar solo tiene sentido cuando ambas decisiones dan lo mismo. Con déficit de {{t:bluff|faroles}}, {{t:fold|retirarse}} da más." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "{{t:bet|Apuestas}} una c-bet de {{n:cbet.ex.small}} a un {{t:pot|bote}} de {{n:ex.pot}}, sin ninguna mano. ¿Con qué frecuencia tiene que {{t:fold|retirarse}} el rival para que este {{t:bluff|farol}} salga a cero? Escribe un porcentaje."
    answer: alpha.cbet.small
    explanation: "El umbral es apuesta ÷ ({{t:pot|bote}} + apuesta) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Un rival con un fold to c-bet claramente por encima de esta cifra se {{t:fold|retira}} con la frecuencia suficiente para que la c-bet gane incluso sin mano."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "El rival tiene un fold to c-bet de {{n:hud.ex.fcb.high}} en {{n:hud.ex.reg.hands}} manos. En un flop {{t:dry|seco}} no has ligado nada. ¿Es rentable una c-bet de 1/3 del {{t:pot|bote}} sin mano?"
    options:
      - { text: "Sí: el rival se {{t:fold|retira}} más a menudo que {{n:alpha.cbet.small}}, así que la c-bet gana de inmediato", correct: true, why: "Una c-bet de 1/3 del {{t:pot|bote}} sale a cero con {{n:alpha.cbet.small}} de {{t:fold|retiradas}}. El rival se {{t:fold|retira}} mucho más a menudo, así que la c-bet gana antes de que cuentes la equity de tu mano. El fold to c-bet junta todos los tamaños y mesas, así que es una aproximación." }
      - { text: "No: sin mano no apuestas", why: "Un {{t:bluff|farol}} no necesita mano, necesita {{t:fold|retiradas}}. Cuando el rival se {{t:fold|retira}} más a menudo que {{n:alpha.cbet.small}}, la c-bet gana con cualquier mano." }
      - { text: "Solo con un tamaño grande, porque uno pequeño no hace que el rival tire manos", why: "Una apuesta mayor necesita más {{t:fold|retiradas}}: con 3/4 del {{t:pot|bote}}, nada menos que {{n:alpha.cbet.big}}. Si el rival se {{t:fold|retira}} a menudo de todos modos, una c-bet pequeña lo consigue más barato." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "El rival tiene un fold to c-bet de {{n:hud.ex.fcb.low}} en {{n:hud.ex.reg.hands}} manos. No has ligado el flop y no tienes {{t:draw|proyecto}}. Te planteas una c-bet de 3/4 del {{t:pot|bote}}. ¿Qué haces?"
    options:
      - { text: "{{t:check|Paso}}: este rival se {{t:fold|retira}} menos a menudo de lo que necesita una c-bet grande", correct: true, why: "Una c-bet de 3/4 del {{t:pot|bote}} solo sale a cero con {{n:alpha.cbet.big}} de {{t:fold|retiradas}}, y el rival se {{t:fold|retira}} el {{n:hud.ex.fcb.low}} de las veces. Sin mano y sin outs, este {{t:bluff|farol}} pierde." }
      - { text: "Apuesto, porque la c-bet es lo estándar", why: "Una c-bet sin mano solo es buena cuando el rival se {{t:fold|retira}} lo bastante a menudo o cuando la mano tiene equity. Aquí no se da ni una cosa ni la otra." }
      - { text: "Voy all-in para forzar la {{t:fold|retirada}}", why: "Cuanto mayor es la apuesta, más {{t:fold|retiradas}} necesita. Un rival que rara vez se {{t:fold|retira}} no se va a {{t:fold|retirar}} más a menudo porque hayas {{t:bet|apostado}} más." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "Un {{t:recreational|jugador recreativo}} con un fold to 3-bet de {{n:mda.rec.f3b}} {{t:open|abre}} desde el {{t:cutoff|cutoff}}. Estás en el botón. En la base, KJs a veces {{t:call|iguala}} y A5s es a veces un 3-bet de {{t:bluff|farol}}. ¿Cómo juegas contra este jugador?"
    options:
      - { text: "Hago 3-bet con KJs por {{t:value|valor}} y no hago 3-bet con A5s como {{t:bluff|farol}}", correct: true, why: "Un jugador que rara vez se {{t:fold|retira}} ante un 3-bet a menudo {{t:call|iguala}} con manos más débiles, así que las manos más fuertes ganan haciendo 3-bet. Un {{t:bluff|farol}} con 3-bet solo gana de inmediato con más de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|retiradas}}, y este jugador se {{t:fold|retira}} el {{n:mda.rec.f3b}} de las veces." }
      - { text: "Hago 3-bet con A5s, porque un {{t:bluff|farol}} con {{t:blocker|bloqueador}} es un buen 3-bet", why: "En la base sí, contra un rival que se {{t:fold|retira}} aprox. la mitad de las veces. Este se {{t:fold|retira}} el {{n:mda.rec.f3b}} de las veces, así que el {{t:bluff|farol}} casi siempre juega un {{t:pot|bote}} grande con una mano débil." }
      - { text: "Solo {{t:call|pago}} con KJs para no espantar al rival", why: "Contra un jugador que {{t:call|iguala}} 3-bets con manos más débiles, el 3-bet con KJs construye un {{t:pot|bote}} más grande con mejor mano y con {{t:position|posición}}. Es mejor que limitarse a {{t:call|igualar}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Según datos de la población de microlímites online (NL25), los {{t:regular|regulares}} se {{t:fold|retiran}} ante un 3-bet el {{n:mda.reg.f3b}} de las veces, y los {{t:recreational|jugadores recreativos}}, el {{n:mda.rec.f3b}}. Un 3-bet en {{t:position|posición}} a {{n:pf.3bet.ip-total}} gana sin mano con más de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|retiradas}}. ¿Qué se deduce de esto?"
    options:
      - { text: "Contra {{t:recreational|jugadores recreativos}} haces 3-bet casi sin {{t:bluff|faroles}}; contra {{t:regular|regulares}} los {{t:bluff|faroles}} se mantienen, pero solo con manos que tienen equity", correct: true, why: "Ningún grupo se {{t:fold|retira}} tan a menudo como para que un 3-bet gane sin mano. En la base, los {{t:bluff|faroles}} de 3-bet viven de la equity postflop y de las {{t:fold|retiradas}}; contra un jugador que se {{t:fold|retira}} el {{n:mda.rec.f3b}} de las veces queda sobre todo la equity, así que haces 3-bet con un {{t:range|rango}} {{t:linear|lineal}}." }
      - { text: "Haces 3-bet a todo el mundo con cualquier mano, porque todos se {{t:fold|retiran}} mucho", why: "Aquí nadie se {{t:fold|retira}} más a menudo que {{n:alpha.vs-3bet-ip-size}}. Hacer 3-bet con cualquier mano perdería." }
      - { text: "Contra {{t:recreational|jugadores recreativos}} dejas de hacer 3-bet por completo", why: "Al contrario: un jugador que {{t:call|iguala}} 3-bets con manos más débiles les da dinero a tus manos fuertes. Cambias la composición del 3-bet, no renuncias a él." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Tras {{n:hud.ex.mid.hands}} manos, el rival parece suelto y pasivo, pero la muestra es pequeña. ¿Hasta dónde te desvías de la base?"
    options:
      - { text: "Un poco, en la dirección de la lectura y solo con manos límite", correct: true, why: "La dirección ya se ve en una muestra pequeña, pero las cifras tienen un error grande. Desplazas hacia la lectura las manos que están en el límite de la decisión y juegas el resto como en la base hasta que la muestra crezca." }
      - { text: "A fondo: juego contra él de inmediato con la máxima {{t:exploit|explotación}}", why: "Con una muestra pequeña, la lectura puede ser errónea. Una gran desviación de la base es explotable en sí misma: la base es la estrategia menos vulnerable a la explotación." }
      - { text: "Nada, hasta que tenga mil manos", why: "Demasiado prudente. La dirección de la lectura con {{n:hud.ex.mid.hands}} manos ya significa algo, y puedes desplazar las manos límite a bajo coste." }
---
La {{t:exploit|explotación}} no sustituye a la base, sino que la desplaza. Primero sabes cómo se juega en equilibrio (módulos 3–9), luego los datos te muestran hacia dónde se aleja el rival de él, y desplazas tu propio juego en la misma dirección. La pregunta es: con qué manos y hasta dónde.

## Primero, las {{t:mixed-hand|manos mixtas}}

En equilibrio, algunas manos juegan dos acciones; p. ej., a veces {{t:call|igualan}} y a veces se {{t:fold|retiran}}. Lo hacen porque ambas acciones dan lo mismo: el rival tiene exactamente los {{t:bluff|faroles}} necesarios para que la mano sea indiferente. Son estas manos las que reaccionan primero al error del rival:

- el rival {{t:bluff|farolea}} demasiado a menudo: las {{t:mixed-hand|manos mixtas}} siempre {{t:call|igualan}};
- el rival {{t:bluff|farolea}} demasiado poco: las {{t:mixed-hand|manos mixtas}} siempre se {{t:fold|retiran}}.

Basta con poco. En un ejemplo de solver publicado (el botón apuesta en el river tras la secuencia apuesta, {{t:check|pasar}}, apuesta), cambiar los {{t:bluff|faroles}} del rival de aprox. {{n:overbluff.base}} a aprox. {{n:overbluff.lock}} hizo que la defensa de la {{t:big-blind|ciega grande}} pasara a {{t:call|igualar}} siempre. Las manos que en la base siempre se {{t:fold|retiran}} o siempre continúan solo cambian de decisión cuando el rival se aleja mucho del equilibrio.

## El {{t:bluff|farol}} medido con un umbral

Si un {{t:bluff|farol}} sin mano es rentable te lo dice el {{t:alpha|alfa}} del módulo 6:

```formula
Un {{t:bluff|farol}} gana cuando el rival se {{t:fold|retira}} más a menudo que: apuesta ÷ (bote + apuesta)
```

Con una c-bet de 1/3 del {{t:pot|bote}} es {{n:alpha.cbet.small}}; con 3/4 del {{t:pot|bote}}, {{n:alpha.cbet.big}}. El fold to c-bet del {{t:hud|HUD}} muestra si el rival está por encima o por debajo de este umbral. Es una aproximación: la estadística junta todos los tamaños y flops, y tu mano suele tener todavía algo de equity. En un flop que conecta con el {{t:range|rango}} del rival, este se {{t:fold|retira}} menos a menudo que la media.

Los jugadores de la población de microlímites online (NL25) se {{t:fold|retiran}} ante la c-bet en el flop, de media, el {{n:mda.all.fcb}} de las veces. No tiene por qué ser un error: también el solver {{t:out-of-position|fuera de posición}} en el flop se {{t:fold|retira}} más a menudo de lo que indica la {{t:mdf|MDF}} (módulo 6). Por eso, que la media de la población esté por encima del umbral no justifica por sí solo una c-bet sin mano; necesitas una lectura del rival concreto o un flop que no conecte con su {{t:range|rango}}.

## 3-bet contra un jugador que no se {{t:fold|retira}}

Un 3-bet en {{t:position|posición}} a {{n:pf.3bet.ip-total}} gana sin ninguna mano solo cuando el rival se {{t:fold|retira}} más a menudo que {{n:alpha.vs-3bet-ip-size}} (módulo 4). Datos de la población de microlímites online (NL25):

| Grupo | Fold to 3-bet |
|---|---|
| {{t:regular|Regulares}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Jugadores recreativos}} | {{n:mda.rec.f3b}} |

En la base, los {{t:bluff|faroles}} de 3-bet viven de las {{t:fold|retiradas}} y de la equity postflop. Contra un jugador que se {{t:fold|retira}} el {{n:mda.rec.f3b}} de las veces casi no hay {{t:fold|retiradas}}; en cambio, {{t:call|iguala}} con manos más débiles. Por eso le haces 3-bet con un {{t:range|rango}} {{t:linear|lineal}}: más manos fuertes por {{t:value|valor}}, casi sin {{t:bluff|faroles}}. Los entrenadores de dos materiales formativos sitúan este límite en un fold to 3-bet de aprox. {{n:hud.f3b.low}}.

## Muestra pequeña, desviación pequeña

Cuanto menor es la muestra, mayor es el error de la estadística (lección 1). Con una muestra pequeña, solo desplazas las manos límite y solo en la dirección de la lectura. Una desviación grande, con todo el {{t:range|rango}}, solo tiene sentido con una muestra grande y un error claro del rival. Desviarse de la base es en sí mismo un error que un buen rival puede aprovechar.

:::note Fuentes
El principio de las {{t:mixed-hand|manos mixtas}} procede de un análisis de solver publicado con la estrategia del rival bloqueada (una solución de solver, no datos de población). Los umbrales de {{t:alpha|alfa}} son aritmética. El fold to 3-bet y el fold to c-bet de la población proceden de una base de datos pública de estadísticas (una gran sala online, NL25–NL100, {{n:mda.period.months}} meses antes de octubre de 2026). El límite de fold to 3-bet y el principio «muestra pequeña, desviación pequeña» son recomendaciones de dos materiales formativos.
:::
