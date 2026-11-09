---
id: m3.l3
module: m3
order: 3
title: "Rangos de apertura"
sub: "Con qué entrar primero, posición por posición"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "Todos los que hablan antes que tú se han {{t:fold|retirado}} y estás en el Botón. Pinta las manos con las que {{t:open|abres}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Eres el primero en hablar ({{t:utg}}). Pinta las manos con las que {{t:open|abres}}."
---
Un {{t:range|rango}} de {{t:open|apertura}} es la lista de manos con las que {{t:raise|subes}} cuando todos los que hablan antes que tú se han {{t:fold|retirado}}. Las cuadrículas de abajo las ha calculado el solver preflop de esta aplicación para partidas en mesa de 6 jugadores y stacks de {{n:format.stack}}.

## Cómo leer la cuadrícula

Cada casilla es un tipo de mano. Por encima de la diagonal están las manos del mismo palo (p. ej., AKs); por debajo, las de distinto palo (p. ej., AKo), y en la diagonal, las {{t:pair|parejas}}. Una casilla verde significa {{t:raise|subir}}, y una vacía, {{t:fold|retirarse}}. Una casilla rellena solo en parte significa que el solver juega la mano solo a veces. Si la {{t:open|abre}} con una frecuencia de entre {{n:range.mixed.low}} y {{n:range.mixed.high}} (estos umbrales son un ajuste de la aplicación), es una {{t:mixed-hand|mano mixta}}: en los ejercicios damos entonces por buenas las dos respuestas. Una acción que el solver juega en menos del {{n:range.mixed.low}} de los casos, pero al menos en el {{n:range.mixed.min}}, los ejercicios la consideran aceptable: no es un error, pero el repaso de esta tarea volverá antes. Una acción que el solver juega en menos del {{n:range.mixed.min}} de los casos, los ejercicios la califican como imprecisión (así llama a estas jugadas la escala de valoración publicada por la web del solver), y una acción que el solver no juega nunca, como error.

## De la primera {{t:position|posición}} al Botón

```range
rfi.utg
```

Desde {{t:utg}}, el solver {{t:open|abre}} el {{n:solver.rfi.utg}} de las manos. Las fuentes profesionales indican {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

Con cada {{t:position|posición}} más cerca del Botón, el {{t:range|rango}} crece: el {{t:hijack|HJ}} {{t:open|abre}} el {{n:solver.rfi.hj}}, y el {{t:cutoff|CO}}, ya el {{n:solver.rfi.co}} de las manos.

```range
rfi.btn
```

En el Botón, el solver {{t:open|abre}} ya el {{n:solver.rfi.btn}} de las manos, porque solo quedan las ciegas y después del flop tienes {{t:position|posición}}.

```range
rfi.sb
```

La {{t:small-blind|ciega pequeña}} ya solo juega contra la {{t:big-blind|ciega grande}}, así que {{t:open|abre}} casi tan amplio como el Botón: aprox. el {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} de las manos, aunque después del flop habla primero. En {{t:stakes|microlímites}}, desde la {{t:small-blind|ciega pequeña}} o {{t:raise|subes}} o te {{t:fold|retiras}}, sin completar hasta la {{t:big-blind|ciega grande}}: el {{t:rake}} que se cobra del {{t:pot|bote}} reduce la ganancia de completar. Es una simplificación: algunas soluciones de solvers completan con parte de las manos desde la {{t:small-blind|ciega pequeña}}. El solver de la aplicación {{t:open|abre}} desde aquí el {{n:solver.rfi.sb}} de las manos, es decir, dentro del intervalo de las fuentes.

:::note En una mesa de 9 jugadores
En una mesa de 9 jugadores, antes del {{t:hijack|HJ}} hay tres {{t:position|posiciones}} más: {{t:utg}}, {{t:utg|UTG}}+1 y {{t:utg|UTG}}+2, y después de ellas, el LJ. Detrás de {{t:utg}} se sientan entonces ocho jugadores, así que desde {{t:utg}}, {{t:utg|UTG}}+1 y {{t:utg|UTG}}+2 {{t:open|abres}} más cerrado que desde {{t:utg}} en una mesa de 6 jugadores: detrás de ti hay más jugadores. Cuando esos tres jugadores se {{t:fold|retiran}}, el LJ juega como {{t:utg}} en una mesa de 6 jugadores, y las {{t:position|posiciones}} siguientes, igual que en las cuadrículas de arriba. Para las {{t:position|posiciones}} tempranas en una mesa de 9 jugadores solo indicamos la tendencia: todavía no hemos contrastado las cifras ni la composición de estos {{t:range|rangos}} con soluciones de solvers publicadas.
:::

:::note Cómo recordarlo
No te aprendas de memoria las {{n:combos.kinds}} casillas. Memoriza los límites: qué {{t:pair|parejas}}, qué ases del mismo palo y a partir de qué carta empiezan las manos de distinto palo. Los ejercicios de abajo sacan con más frecuencia precisamente las manos del límite del {{t:range|rango}}.
:::

Estos {{t:range|rangos}} proceden de un modelo que simplifica el juego postflop, por eso en una docena larga de manos del límite del {{t:range|rango}} difieren de las tablas profesionales, unas veces en un sentido y otras en el otro. Son sobre todo manos del mismo palo con hueco (p. ej., 75s, 97s) y manos débiles de distinto palo (p. ej., A4o, K7o). Los ejercicios no evalúan estas manos.
