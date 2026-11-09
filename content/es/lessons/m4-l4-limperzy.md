---
id: m4.l4
module: m4
order: 4
title: "Limpers"
sub: "Aislamiento: tamaño y rango"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un jugador antes que tú solo ha igualado la {{t:big-blind|ciega grande}} (limp). Quieres {{t:raise|subir}} desde el botón. ¿A cuánto?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "A {{n:pf.iso.one-limper}}", correct: true, why: "Base de {{n:pf.iso.base}} más {{n:pf.iso.per-limper}} por el limper. Este tamaño le quita al limper el buen precio." }
      - { text: "A {{n:pf.min-raise}}", why: "Una {{t:raise|subida}} mínima le da al limper un precio excelente y casi nunca gana el {{t:pot|bote}} de inmediato." }
      - { text: "A {{n:pf.open-size}}, como una {{t:open|apertura}} normal", why: "El limper ya ha puesto una ciega, así que el {{t:pot|bote}} es mayor. La {{t:raise|subida}} tiene que ser mayor que una {{t:open|apertura}} normal." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Dos jugadores antes que tú solo han igualado la {{t:big-blind|ciega grande}}. Quieres {{t:raise|subir}} desde el {{t:cutoff|CO}}. ¿A cuánto?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "A {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} más {{n:pf.iso.per-limper}} por cada uno de los dos limpers." }
      - { text: "A {{n:pf.iso.one-limper}}", why: "Ese es el tamaño contra un limper. Cada uno adicional suma {{n:pf.iso.per-limper}}." }
      - { text: "Solo pago", why: "AQ del mismo palo es una mano para {{t:raise|subir}} {{t:value|por valor}}. Pagar cede la {{t:initiative|iniciativa}} y deja entrar a todos barato." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un jugador hace limp y todos pasan hasta ti, que estás en la {{t:small-blind|ciega pequeña}}. Quieres {{t:raise|subir}}. ¿A cuánto?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "A {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Fuera de posición}} añades además {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} más {{n:pf.iso.per-limper}} por el limper más {{n:pf.iso.oop-extra}}." }
      - { text: "A {{n:pf.iso.one-limper}}", why: "Ese es el tamaño {{t:in-position|en posición}}. {{t:out-of-position|Fuera de posición}} {{t:raise|subes}} un poco más para que el rival {{t:fold|se retire}} más a menudo o pague más caro." }
      - { text: "Solo pago", why: "Con KK siempre construyes el {{t:pot|bote}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un jugador antes que tú solo ha igualado la {{t:big-blind|ciega grande}} (limp). Estás en el botón. ¿Qué haces?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|Subo}} a {{n:pf.iso.one-limper}}", correct: true, why: "AJ es una mano para {{t:isolation|aislar}}: domina muchas de las manos con las que hace limp un jugador más débil, y después del flop tienes {{t:position|posición}}. Tamaño: {{n:pf.iso.base}} más {{n:pf.iso.per-limper}} por el limper." }
      - { text: "{{t:raise|Subo}} a {{n:pf.min-raise}}", sizeError: true, why: "Buena acción, pero una {{t:raise|subida}} mínima le da al limper un precio excelente, así que casi nunca {{t:fold|se retirará}} y no juegas mano a mano contra él. {{t:raise|Subes}} a {{n:pf.iso.one-limper}}." }
      - { text: "Pago", why: "Cedes la {{t:initiative|iniciativa}} y dejas entrar a las ciegas barato. Con una mano que domina al limper, quieres construir el {{t:pot|bote}}." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado cerrado: contra un limper, el botón {{t:isolation|aísla}} aprox. {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} de las manos, y AJ entra en ese rango con margen." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Tres jugadores antes que tú solo han igualado la {{t:big-blind|ciega grande}}. Estás en el botón. ¿Qué haces?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Pago", correct: true, why: "Contra muchos limpers, los {{t:connectors|conectores}} del mismo palo son manos especulativas: ves el flop barato {{t:in-position|en posición}} y puedes ligar una mano grande. Una de las fuentes recomienda pagar aquí; otra aconseja evitarlo, así que también aceptamos {{t:fold|retirarse}}." }
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "También es correcto: una de las fuentes aconseja no pagar, sino {{t:raise|subir}} o {{t:fold|retirarse}}, y 76s no sirve para {{t:raise|subir}} {{t:value|por valor}}. Otra fuente recomienda pagar, así que aceptamos ambas jugadas." }
      - { text: "{{t:raise|Subo}} a {{n:pf.iso.two-limpers}}", why: "Con tres limpers, una {{t:raise|subida}} de {{t:bluff|farol}} rara vez se lleva el {{t:pot|bote}}, y el tamaño debería ser aún mayor. 76s no sirve para {{t:raise|subir}} {{t:value|por valor}}." }
---
El limp consiste en entrar en la mano simplemente igualando la {{t:big-blind|ciega grande}}. Los profesionales rara vez hacen limp como primeros en entrar (regla del módulo 3), así que los limpers en microlímites suelen ser jugadores más débiles. {{t:raise|Subir}} a un limper se llama {{t:isolation|aislamiento}}: quieres jugar mano a mano contra él, a ser posible {{t:in-position|en posición}}.

:::note De dónde salen estas reglas
El solver de la aplicación no juega limps, así que esta lección se basa en materiales de formación. Las reglas están marcadas como heurísticas.
:::

## Tamaño del {{t:isolation|aislamiento}}

Online {{t:raise|subes}} a {{n:pf.iso.base}} más {{n:pf.iso.per-limper}} por cada limper: contra uno, a {{n:pf.iso.one-limper}}; contra dos, a {{n:pf.iso.two-limpers}}. {{t:out-of-position|Fuera de posición}} añades además {{n:pf.iso.oop-extra}}. Nunca hagas una subida mínima: el limper tendría un precio excelente y casi nunca {{t:fold|se retiraría}}.

## {{t:range|Rango}} de {{t:isolation|aislamiento}}

En el botón, contra un limper, {{t:isolation|aíslas}} con un rango amplio, aprox. {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} de las manos: {{t:pair|parejas}} medias y altas, ases del mismo palo, ases fuertes de distinto palo, cartas altas y parte de los {{t:connectors|conectores}} del mismo palo. Cuanto más temprana sea tu {{t:position|posición}} y más limpers haya, más estrecho será tu {{t:range|rango}}: contra tres limpers {{t:raise|subes}} sobre todo {{t:value|por valor}}.

Las manos especulativas, como las {{t:pair|parejas}} pequeñas y los {{t:connectors|conectores}} del mismo palo, puedes pagarlas {{t:in-position|en posición}} contra muchos limpers. Aquí las fuentes difieren: una recomienda pagar y la otra aconseja evitarlo; en los ejercicios aceptamos ambas jugadas, pagar y {{t:fold|retirarse}}.
