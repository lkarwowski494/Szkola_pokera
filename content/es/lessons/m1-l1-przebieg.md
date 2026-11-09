---
id: m1.l1
module: m1
order: 1
title: "Cómo se desarrolla una mano"
sub: "Ciegas, calles y acciones posibles"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "Estás en el flop y nadie antes que tú ha {{t:bet|apostado}}. ¿Qué puedes hacer?"
    options:
      - { text: "{{t:check|Pasar}} o {{t:bet|apostar}}", correct: true, why: "Sin ninguna {{t:bet|apuesta}} antes que tú, tienes dos opciones: seguir sin pagar nada o {{t:bet|apostar}} tú." }
      - { text: "{{t:call|Igualar}}", why: "No hay nada que {{t:call|igualar}}, porque nadie ha {{t:bet|apostado}} nada." }
      - { text: "{{t:raise|Subir}}", why: "Solo puedes {{t:raise|subir}} la {{t:bet|apuesta}} de otro. La primera {{t:bet|apuesta}} de la ronda es un bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "¿Cuántas {{t:community-cards|cartas comunitarias}} aparecen en el flop?"
    options:
      - { text: "3", correct: true, why: "El flop son tres cartas a la vez. Después, el turn y el river añaden una cada uno." }
      - { text: "1", why: "El turn y el river salen de una en una." }
      - { text: "5", why: "Las cinco {{t:community-cards|cartas comunitarias}} no están en la mesa hasta el river." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "Tu rival ha {{t:bet|apostado}} 20 {{t:chips|fichas}}. Tienes una mano débil y no quieres seguir jugando. ¿Qué haces?"
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Cuando hay una {{t:bet|apuesta}} y no quieres pagar, {{t:fold|te retiras}}. Solo pierdes lo que ya has puesto." }
      - { text: "{{t:check|Paso}}", why: "El check no es posible cuando hay una {{t:bet|apuesta}} que {{t:call|igualar}}." }
      - { text: "{{t:call|Igualo}}", why: "{{t:call|Igualar}} cuesta 20 {{t:chips|fichas}}. Si no quieres jugar, es una pérdida." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "¿Cuál es la última {{t:betting-round|ronda de apuestas}}?"
    options:
      - { text: "River", correct: true, why: "El river es la quinta {{t:community-cards|carta comunitaria}}. Si después de las apuestas del river quedan al menos dos jugadores, muestran sus cartas (showdown)." }
      - { text: "Turn", why: "El turn es la cuarta carta. Después todavía viene el river." }
      - { text: "Flop", why: "El flop es la primera ronda con {{t:community-cards|cartas comunitarias}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Estás en la {{t:big-blind|ciega grande}}, todos se han {{t:fold|retirado}} y la {{t:small-blind|ciega pequeña}} solo ha completado. Tienes una mano débil. ¿Qué haces?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|Paso}}", correct: true, why: "Tu {{t:big-blind|ciega grande}} cuenta como una {{t:bet|apuesta}}, y la {{t:small-blind|ciega pequeña}} solo la ha igualado. Nadie ha {{t:raise|subido}}, así que ves el flop gratis. Una mano débil no es motivo para retirarse cuando no cuesta nada." }
      - { text: "{{t:fold|Me retiro}}", why: "{{t:fold|Retirarte}} cuando puedes {{t:check|pasar}} gratis es una pérdida pura." }
      - { text: "{{t:raise|Subo}}", why: "Con 7-2 no tienes nada sobre lo que construir; {{t:check|pasar}} te da un flop gratis." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
Cada mano sigue un orden fijo. Primero, dos jugadores ponen apuestas obligatorias, llamadas **ciegas**: la {{t:small-blind|ciega pequeña}} y la {{t:big-blind|ciega grande}}. Así siempre hay algo por lo que jugar en el {{t:pot|bote}}.

Antes del flop, la {{t:big-blind|ciega grande}} cuenta como una {{t:bet|apuesta}}: quien quiera jugar tiene que, como mínimo, {{t:call|igualarla}}. La {{t:big-blind|ciega grande}} habla la última antes del flop. Si nadie ha {{t:raise|subido}}, puede {{t:check|pasar}} y ver el flop sin pagar más.

## Cuatro {{t:betting-round|rondas de apuestas}}

1. **Preflop**: solo tienes tus 2 cartas.
2. **Flop**: llegan a la {{t:board|mesa}} 3 {{t:community-cards|cartas comunitarias}}.
3. **Turn**: la cuarta carta.
4. **River**: la quinta y última carta.

Si después de las apuestas del river siguen en la mano al menos dos jugadores, muestran sus cartas. Es el **showdown**: la mejor jugada se lleva el {{t:pot|bote}}. Si antes todos menos uno se {{t:fold|retiran}}, ese jugador se lleva el {{t:pot|bote}} sin enseñar sus cartas.

## Acciones posibles

- **{{t:check|Paso}}**: no pones nada. Solo si en esta ronda nadie antes que tú ha {{t:bet|apostado}} ni {{t:raise|subido}} (antes del flop, la {{t:big-blind|ciega grande}} puede {{t:check|pasar}} si nadie ha {{t:raise|subido}}).
- **{{t:bet|Apuesto}}**: la primera {{t:bet|apuesta}} de la ronda. En las fórmulas de las próximas lecciones escribimos simplemente «bet».
- **{{t:call|Igualo}}**: pones lo mismo que la {{t:bet|apuesta}} del rival.
- **{{t:raise|Subo}}**: aumentas la {{t:bet|apuesta}} de otro.
- **{{t:fold|Me retiro}}**: tiras tus cartas y pierdes lo que ya has puesto.

:::note Para recordar
Si alguien ha {{t:bet|apostado}}, puedes {{t:fold|retirarte}}, {{t:call|igualar}} o {{t:raise|subir}}. Si nadie ha {{t:bet|apostado}}, puedes {{t:check|pasar}} o {{t:bet|apostar}}.
:::

:::note All-in y {{t:side-pot|bote secundario}}
No puedes {{t:bet|apostar}} más de lo que tienes delante. Cuando pones todas tus {{t:chips|fichas}}, vas **all-in**: ya no participas en las apuestas, y las {{t:community-cards|cartas comunitarias}} que faltan se reparten hasta el final. A cada rival puedes ganarle como máximo lo mismo que has puesto tú. Si los demás siguen jugando por más, el excedente va a un **{{t:side-pot|bote secundario}}**, por el que solo compiten ellos.
:::
