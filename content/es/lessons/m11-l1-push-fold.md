---
id: m11.l1
module: m11
order: 1
title: "Stack corto: all-in o retirarse"
sub: "Cuando la subida se convierte en all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Torneo}}. Tienes {{n:m11.depth.10}} y todos los que hablan antes que tú se han {{t:fold|retirado}}. ¿Qué plan de juego es sencillo y está respaldado por las fuentes?"
    options:
      - { text: "All-in o {{t:fold|retirarte}}", correct: true, why: "Con unas {{n:m11.thr.pushfold}} o menos, las fuentes coinciden en recomendar push/fold. Subir y {{t:fold|retirarte}} ante una {{t:raise|resubida}} te haría perder demasiado stack, y el all-in es lo que más {{t:fold|retiradas}} le saca al rival." }
      - { text: "Subir a {{n:pf.open-size}} y, ante una {{t:raise|resubida}}, decidir", why: "Tras una subida así te queda poco detrás del {{t:pot|bote}}, así que ante una {{t:raise|resubida}} all-in te ves casi obligado a {{t:call|igualar}}. El rival no tiene por qué {{t:fold|retirarse}} y tú pierdes fold equity." }
      - { text: "{{t:call|Igualo}} la ciega (limp) y veo el flop", why: "El limp no te da la opción de llevarte el {{t:pot|bote}} de inmediato. Los solvers con todas las acciones disponibles a veces hacen limp, pero es una estrategia para jugadores avanzados; el plan sencillo y seguro es all-in o {{t:fold|retirarte}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Tienes {{n:m11.thr.raise}} o más y eres el primero en {{t:open|abrir}}. ¿Qué haces con una mano que quieres jugar?"
    options:
      - { text: "Normalmente subo (p. ej., una subida mínima)", correct: true, why: "Con más de unas {{n:m11.thr.raise}}, las fuentes recomiendan una subida normal: aún tienes margen para {{t:fold|retirarte}} ante una {{t:raise|resubida}} o jugar después del flop." }
      - { text: "Siempre all-in", why: "Ir all-in con un stack tan grande arriesga mucho para ganar solo las ciegas. Las manos peores se te {{t:fold|retiran}} y las mejores te pagan." }
      - { text: "Push/fold, igual que con {{n:m11.thr.pushfold}}", why: "El push/fold es una herramienta para el {{t:short-stack|stack corto}}: hasta unas {{n:m11.thr.pushfold}} y, con manos más débiles, hasta unas {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Tienes {{n:m11.m.stack}} {{t:chips|fichas}}. Las ciegas son {{n:m11.m.sb}}/{{n:m11.m.bb}} y la {{t:big-blind|ciega grande}} pone además un ante de {{n:m11.m.ante}}. ¿Cuál es tu M?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind|ciega pequeña}} + {{t:big-blind|ciega grande}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. Son las vueltas que aguantas sin jugar. En {{t:big-blind|ciegas grandes}} son {{n:m11.m.bbs}}, pero la M también cuenta el ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Tu M ha bajado a unos {{n:m11.m.example}}. ¿Qué dice de esto el modelo de zonas de M?"
    options:
      - { text: "{{t:red-zone|Zona roja}}: solo all-in o {{t:fold|retirarte}}, mejor como primero en entrar", correct: true, why: "Con una M de unos {{n:m11.m.red}} o menos, solo te queda all-in o {{t:fold|retirarte}}. Entrar el primero te da la opción de que todos se {{t:fold|retiren}}." }
      - { text: "{{t:green-zone|Zona verde}}: juegas con normalidad", why: "La {{t:green-zone|zona verde}}, en la que el stack te permite jugar con libertad, no empieza hasta una M de unos {{n:m11.m.green}}. Con una M de unos {{n:m11.m.example}}, el stack te dura {{n:m11.m.example}} vueltas." }
      - { text: "Esperas a tener ases, porque tiempo tienes", why: "Con una M de unos {{n:m11.m.example}}, las ciegas se comerán tu stack antes de que te llegue una mano fuerte. Tienes que ir all-in con un {{t:range|rango}} más amplio." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Tienes {{n:m11.depth.10}} en la {{t:small-blind|ciega pequeña}} y todos se han {{t:fold|retirado}}. Pinta las manos con las que vas all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Ciega pequeña}}, todos se han {{t:fold|retirado}} y tienes K2o. Con {{n:m11.depth.10}}, el solver va all-in con esta mano. ¿Y con {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "Se {{t:fold|retira}}", correct: true, why: "Con {{n:m11.depth.15}} arriesgas más en relación con las ciegas, así que el {{t:range|rango}} de all-in se estrecha de aprox. el {{n:m11.push.10}} a aprox. el {{n:m11.push.15}} de las manos. K2o se queda fuera." }
      - { text: "All-in, porque el rey es una carta fuerte", why: "Con {{n:m11.depth.15}}, K2o se encuentra demasiado a menudo con un rey mejor o un as en el {{t:range|rango}} de {{t:call|pago}}. El solver la {{t:fold|tira}}." }
      - { text: "All-in, porque cuanto más profundo el stack, más amplio", why: "Al revés: cuanto más profundo el stack, más estrecho el {{t:range|rango}} de all-in. Haces {{t:shove|push}} con más manos con un {{t:short-stack|stack muy corto}}." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Ciega pequeña}}, {{n:m11.depth.10}}, sin ante. ¿Cuántas veces de cada cien tendría que {{t:fold|retirarse}} la {{t:big-blind|ciega grande}} para que un all-in con una mano sin ninguna opción quede a cero?"
    options:
      - { text: "Más del {{n:m11.push.10.alpha}}", correct: true, why: "Arriesgas {{n:m11.push.10.risk}} para ganar {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) es aprox. el {{n:m11.push.10.alpha}}. El rival no se {{t:fold|retira}} tanto, así que el all-in solo es rentable con una mano que también tenga equity cuando el rival {{t:call|iguala}}." }
      - { text: "Más de la mitad", why: "La mitad bastaría si arriesgaras lo mismo que puedes ganar. Aquí arriesgas {{n:m11.push.10.risk}} y ganas solo {{n:m11.push.10.win}} ciegas." }
      - { text: "Basta con que se {{t:fold|retire}} a veces", why: "Cada {{t:call|pago}} le cuesta todo el stack a una mano sin opciones. Sin equity necesitas {{t:fold|retiradas}} muy frecuentes: más del {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "¿Por qué, con un {{t:short-stack|stack corto}}, prefieres ir all-in el primero en lugar de esperar a que otro vaya all-in y {{t:call|igualar}}?"
    options:
      - { text: "Porque el all-in gana de dos maneras", correct: true, why: "Entrando el primero, te llevas el {{t:pot|bote}} cuando todos se {{t:fold|retiran}} o ganas en el showdown. {{t:call|Igualando}}, solo ganas en el showdown." }
      - { text: "Porque el all-in siempre tiene más equity", why: "La equity de una mano no depende de quién entró primero. La diferencia es que el all-in le da al rival la opción de {{t:fold|retirarse}}." }
      - { text: "Porque está prohibido {{t:call|igualar}} un all-in", why: "{{t:call|Igualar}} está permitido, pero para {{t:call|igualar}} necesitas una mano más fuerte (lección sobre {{t:call|igualar}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "El mismo stack de {{n:m11.depth.10}} en la {{t:small-blind|ciega pequeña}}, pero se juega con {{t:bb-ante|ante de ciega grande}}: la {{t:big-blind|ciega grande}} ha puesto un ante de {{n:m11.ante}}. ¿Cómo cambia el {{t:range|rango}} de all-in?"
    options:
      - { text: "Crece: aprox. {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} en lugar de {{n:m11.push.10}}", correct: true, why: "El ante aumenta el {{t:pot|bote}} que te llevas cuando el rival se {{t:fold|retira}}: {{n:m11.push.10.win-ante}} en lugar de {{n:m11.push.10.win}}. Una mano sin opciones ya solo necesita más del {{n:m11.push.10.alpha-ante}} de {{t:fold|retiradas}}, así que son rentables más all-ins." }
      - { text: "Se reduce, porque el rival tiene más en el {{t:pot|bote}} y {{t:call|igualará}} más a menudo", why: "Es cierto que el rival {{t:call|iguala}} con más manos, pero pesa más el {{t:pot|bote}} mayor que puedes ganar. El equilibrio está en aprox. el {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} de las manos." }
      - { text: "No cambia", why: "El ante cambia la relación entre riesgo y recompensa. Sin ante, aprox. el {{n:m11.push.10}}; con ante, aprox. el {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
En un {{t:tournament|torneo}}, las ciegas suben y tu stack no. Tarde o temprano te queda tan poco que la subida normal deja de funcionar. Ahí entra la estrategia **push/fold**: con cada mano que juegas haces {{t:shove|push}}, es decir, vas all-in, y con el resto te {{t:fold|retiras}}.

## Cuándo ir all-in o {{t:fold|retirarte}}

El stack se cuenta en {{t:big-blind|ciegas grandes}}. Las fuentes coinciden en una cosa: con unas **{{n:m11.thr.pushfold}} o menos**, ya juegas casi exclusivamente all-in o te {{t:fold|retiras}}.

| Stack | Qué sueles hacer |
|---|---|
| unas {{n:m11.thr.pushfold}} o menos | all-in o {{t:fold|retirarte}} |
| de {{n:m11.thr.pushfold}} a {{n:m11.thr.upper}} | push/fold con manos débiles y medias |
| más de unas {{n:m11.thr.raise}} | subida normal |

¿Por qué no subir? Si tienes {{n:m11.depth.10}} y subes a {{n:pf.open-size}}, te queda tan poco detrás del {{t:pot|bote}} que, ante una {{t:raise|resubida}} all-in, casi tienes que {{t:call|igualar}} de todos modos. El rival sabe que no te vas a {{t:fold|retirar}}, así que no tiene nada que temer. Ir all-in directamente le saca a tu stack la máxima **fold equity**, es decir, el beneficio de que el rival se {{t:fold|retire}}.

:::note Simplificación
El push/fold es una simplificación. Los solvers que también pueden elegir limp o una subida pequeña, con {{n:m11.depth.10}}, hacen limp o subida mínima con parte de las manos. Aun así, all-in o {{t:fold|retirarse}} es sencillo, es difícil cometer un error grave con él y las fuentes lo recomiendan como punto de partida.
:::

## M: cuántas vueltas aguantas

Un modelo de torneo muy extendido mide el {{t:short-stack|stack corto}} de otra forma: la **M** es tu stack dividido entre lo que cuesta una vuelta completa de los jugadores de la mesa.

```formula
M = stack ÷ (ciega pequeña + ciega grande + ante)
```

Ejemplo: tienes {{n:m11.m.stack}} {{t:chips|fichas}}, ciegas de {{n:m11.m.sb}}/{{n:m11.m.bb}} y {{t:bb-ante|ante de ciega grande}} de {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. En {{t:big-blind|ciegas grandes}} son {{n:m11.m.bbs}}, pero la M también tiene en cuenta el ante. Con una M de unos {{n:m11.m.red}} o menos ({{t:red-zone|zona roja}}), ya solo te queda all-in o {{t:fold|retirarte}}.

## Cuanto más corto el stack, más amplio

Las cuadrículas de esta lección las ha calculado el solver de esta app para la situación más sencilla: todos se han {{t:fold|retirado}}, juegas desde la {{t:small-blind|ciega pequeña}} contra la {{t:big-blind|ciega grande}} y cada uno solo puede ir all-in o {{t:fold|retirarse}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Con {{n:m11.depth.15}} vas all-in con aprox. el {{n:m11.push.15}} de las manos; con {{n:m11.depth.10}}, con aprox. el {{n:m11.push.10}}, y con {{n:m11.depth.5}}, ya con aprox. el {{n:m11.nash.push.5}}–{{n:m11.push.5}}. Cuanto menos arriesgas en relación con las ciegas, más manos son rentables. Como comparación, una tabla de una web de formación da {{n:m11.ext.push.10}} con {{n:m11.depth.10}}; la diferencia está dentro de la tolerancia de validación del solver y la tendencia es la misma.

## Tres jugadores: cuantos más rivales detrás, más estrecho

Cuando juegas desde el Button, detrás de ti quedan dos jugadores, no uno. Cualquiera de ellos puede tener una mano fuerte, así que las {{t:fold|retiradas}} de ambos son menos frecuentes. Con tres jugadores y stacks de {{n:m11.depth.3max}} cada uno, el Button va all-in con aprox. el {{n:m11.3max.push.btn}} de las manos, y la {{t:small-blind|ciega pequeña}}, cuando el Button se ha {{t:fold|retirado}}, con aprox. el {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Hemos contrastado estas dos cuadrículas con un resultado de equilibrio publicado para la misma situación (un artículo científico de 2008: Button {{n:m11.jamfold3.btn}}). Las pocas manos en las que los resultados difieren no se usan en los ejercicios.

## Dos maneras de ganar

El all-in gana cuando el rival se {{t:fold|retira}}, o cuando {{t:call|iguala}} y pierde en el showdown. La {{t:fold|retirada}} del rival por sí sola rara vez basta: con {{n:m11.depth.10}} arriesgas {{n:m11.push.10.risk}} para llevarte {{n:m11.push.10.win}} ciegas, así que una mano sin opciones necesitaría {{t:fold|retiradas}} en más del {{n:m11.push.10.alpha}} de los casos. Por eso cuentan tanto la fold equity como la equity de la mano cuando el rival {{t:call|iguala}}.

## El ante amplía el {{t:range|rango}}

El ante son {{t:chips|fichas}} adicionales en el {{t:pot|bote}} antes del reparto. Con {{t:bb-ante|ante de ciega grande}}, la {{t:big-blind|ciega grande}} pone un ante de {{n:m11.ante}}, así que el all-in se lleva {{n:m11.push.10.win-ante}} en lugar de {{n:m11.push.10.win}}, y el riesgo sigue siendo el mismo. En esta estructura, el {{t:range|rango}} crece de aprox. el {{n:m11.push.10}} a aprox. el {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} de las manos (el solver de la app y un cálculo de equilibrio independiente difieren en una fracción de punto).

```range
push.sb-10-ante
```
