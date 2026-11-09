---
id: m3.l2
module: m3
order: 2
title: "Manos iniciales"
sub: "Qué cartas jugar antes del flop"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "¿Qué mano es más fuerte?"
    options:
      - { text: "A♥ K♥ (mismo palo)", correct: true, why: "Los valores son los mismos, pero la mano del mismo palo tiene una vía extra para ganar con un {{t:flush|color}}." }
      - { text: "A♥ K♣ (palos distintos)", why: "Con palos distintos pierdes la opción de ligar {{t:flush|color}}." }
      - { text: "Son iguales", why: "Casi, pero no del todo. El palo de las cartas importa." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Nadie ha entrado todavía en la mano. ¿Qué haces?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "7-2 de distinto palo es una de las manos más débiles: las cartas están demasiado separadas para formar juntas una {{t:straight|escalera}}, rara vez dan {{t:flush|color}} y la {{t:pair|pareja}} que ligues tiene un kicker débil. A menudo se la llama la peor mano, aunque según los cálculos frente a una mano aleatoria algunas otras, p. ej. 3-2 de distinto palo, salen aún peor." }
      - { text: "{{t:raise|Subo}} para sorprender", why: "Un {{t:bluff|farol}} (jugar una mano débil para que tus rivales se {{t:fold|retiren}} con manos mejores) preflop con una de las manos más débiles, cuando aún quedan cuatro jugadores detrás de ti, pierde a largo plazo." }
      - { text: "{{t:call|Igualo}}, porque es barato", why: "Cada entrada «barata» con una mano débil acaba sumando grandes pérdidas." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "El jugador antes que tú ha {{t:raise|subido}}. ¿Qué haces?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Vuelvo a subir}} (3-bet)", correct: true, why: "Tienes la mejor mano posible. Quieres meter todo lo posible y reducir el número de rivales." }
      - { text: "Solo {{t:call|igualo}}", why: "Los jugadores avanzados a veces lo hacen para despistar, pero como norma pierdes valor y dejas entrar a otros barato." }
      - { text: "{{t:fold|Me retiro}}", why: "Con ases nunca te {{t:fold|retiras}} preflop. Son favoritos frente a cualquier otra mano; p. ej., frente a KK tienen aprox. {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Todos se han {{t:fold|retirado}} hasta ti. ¿Qué haces?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Subo}}", correct: true, why: "QJ del mismo palo es una muy buena mano para atacar las ciegas desde {{t:position|posición}}: liga {{t:straight|escaleras}}, colores y {{t:pair|parejas}} altas." }
      - { text: "{{t:fold|Me retiro}}", why: "En el Button, esta mano es demasiado buena para {{t:fold|retirarse}}." }
      - { text: "{{t:call|Igualo}}", why: "Es mejor {{t:raise|subir}}: tienes la opción de llevarte las ciegas de inmediato y juegas con la {{t:initiative|iniciativa}}." }
---
Los principiantes pierden la mayor parte de su dinero jugando demasiadas manos débiles. Seleccionar bien las manos iniciales es la forma más rápida de dejar de perder.

## Grupos de manos

- **Las más fuertes**: [[As Ah]], [[Ks Kh]], [[Qs Qh]] y AK del mismo palo y de distinto palo, p. ej. [[As Ks]] y [[As Kd]]. {{t:raise|Subes}}, y cuando alguien ha {{t:raise|subido}} antes que tú, normalmente {{t:raise|vuelves a subir}} (3-bet) {{t:value|por valor}}, es decir, para que tu rival {{t:call|iguale}} con una mano peor.
- **Fuertes**: JJ, TT, AQ, AJ del mismo palo, KQ del mismo palo.
- **Especulativas**: {{t:pair|parejas}} pequeñas y cartas consecutivas del mismo palo, p. ej. [[7h 6h]]. Buenas en {{t:late-position|posición tardía}}.
- **Débiles**: separadas, bajas y de distinto palo, p. ej. [[9c 3d]]. Te {{t:fold|retiras}}.

:::note Cuántos {{t:combo|combos}} hay
En total hay {{n:combos.total}} {{t:combo|combos}} de manos iniciales, pero solo {{n:combos.kinds}} tipos: {{n:combos.kinds.pair}} {{t:pair|parejas}}, {{n:combos.kinds.suited}} manos del mismo palo y {{n:combos.kinds.offsuit}} de distinto palo. Cada {{t:pair|pareja}} son {{n:combos.pair}} {{t:combo|combos}}; una mano del mismo palo, {{n:combos.suited}}, y una de distinto palo, {{n:combos.offsuit}}. Por eso AK de distinto palo sale tres veces más a menudo que AK del mismo palo.
:::

Los grupos de arriba son una simplificación para empezar. Los {{t:range|rangos}} exactos de {{t:open|apertura}} para cada {{t:position|posición}}, en una tabla de {{t:range|rangos}}, los verás en la próxima lección.
