---
id: m3.l1
module: m3
order: 1
title: "La posición en la mesa"
sub: "Por qué importa tu asiento"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "¿Qué {{t:position}} es la mejor?"
    options:
      - { text: "Botón ({{t:button|BTN}})", correct: true, why: "Desde el flop, el botón actúa el último, así que siempre conoce las decisiones de los rivales antes de tomar la suya." }
      - { text: "{{t:big-blind|Ciega grande}}", why: "La {{t:big-blind|BB}} paga menos por entrar porque ya ha puesto dinero, pero desde el flop actúa de las primeras." }
      - { text: "{{t:utg|UTG}}", why: "{{t:utg|UTG}} actúa primero preflop y tiene detrás a todos los jugadores de la mesa. Es el sitio más difícil para abrir." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Todos antes que tú se han {{t:fold|retirado}}. ¿Qué haces?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "K9 de distinto palo queda fuera del {{t:range|rango}} de {{t:open|apertura}} de {{t:utg|UTG}}, es decir, fuera de la lista de manos con las que {{t:open|abres}} desde esta {{t:position|posición}}. Detrás de ti hay cinco jugadores y a menudo alguien tiene un rey con mejor kicker." }
      - { text: "{{t:raise|Subo}}", why: "Desde {{t:utg|UTG}} solo {{t:open|abres}} aprox. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} de las manos. K9o liga un rey con facilidad y pierde contra KQ o AK." }
      - { text: "Completo la {{t:big-blind|ciega grande}}", why: "Limitarte a pagar (limp) desde {{t:utg|UTG}} es un mal hábito. O la mano merece una {{t:raise|subida}}, o te {{t:fold|retiras}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "La misma mano, pero estás en el botón y todos antes que tú se han {{t:fold|retirado}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Subo}}", correct: true, why: "Solo quedan las ciegas y después del flop tienes {{t:position|posición}}. En el botón {{t:open|abres}} aprox. {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} de las manos, y K9o entra ahí." }
      - { text: "{{t:fold|Me retiro}}", why: "Demasiado prudente. Contra las ciegas solas, esta mano es lo bastante buena, y la {{t:position}} le añade valor." }
      - { text: "Completo la {{t:big-blind|ciega grande}}", why: "El limp cede la {{t:initiative|iniciativa}}. Una {{t:raise|subida}} a menudo se lleva las ciegas de inmediato." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "¿Por qué ayuda actuar el último?"
    options:
      - { text: "Sé lo que han hecho los rivales antes de decidir", correct: true, why: "Cada acción de un rival es información. El último es quien más tiene y puede {{t:check|pasar}} barato o llevarse el {{t:pot|bote}} cuando los demás muestran debilidad." }
      - { text: "Recibo mejores cartas", why: "Las cartas son aleatorias, sea cual sea la {{t:position|posición}}." }
      - { text: "Pago ciegas más pequeñas", why: "En el botón no pagas ciegas, pero esa no es la ventaja principal. Lo más importante es la información." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
El botón del crupier (**{{t:button|BTN}}**, botón) se mueve en cada mano. De él depende el orden de actuación. Desde el flop, el botón actúa **el último**, y eso es una ventaja enorme: ves lo que han hecho todos los demás antes de decidir tú. Quien actúa antes que un rival después del flop juega {{t:out-of-position}}: decide sin conocer su jugada.

## {{t:position|Posiciones}} en una mesa de 6 jugadores

| {{t:position|Posición}} | Cuándo actúa | Con qué amplitud {{t:open|abrir}} |
|---|---|---|
| {{t:utg|UTG}} | Primero preflop | aprox. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} de las manos |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Después de {{t:utg|UTG}}; {{t:cutoff|CO}}, justo antes del botón | cada vez más amplio |
| {{t:button|BTN}} | El último desde el flop | aprox. {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} de las manos |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Últimas preflop, primeras desde el flop | La {{t:small-blind|SB}} {{t:open|abre}} cuando todos se {{t:fold|retiran}} (lección sobre {{t:range|rangos}}); la defensa de ciegas, en el módulo M4 |

**{{t:hijack|HJ}}** (Hijack) se sienta después de {{t:utg|UTG}}, dos puestos antes del botón, y **{{t:cutoff|CO}}** (Cutoff), justo antes del botón. Son {{t:position|posiciones}} intermedias: detrás de ellas hay menos jugadores que detrás de {{t:utg|UTG}}, así que desde ellas {{t:open|abres}} más amplio, pero aún más cerrado que desde el botón.

:::note Tamaño de {{t:open|apertura}}
{{t:open|Abres}} con una {{t:raise|subida}} a {{n:pf.open-size}} desde cualquier {{t:position|posición}}, y desde la {{t:small-blind|ciega pequeña}}, a {{n:pf.open-size-sb}}. Es una simplificación: en las soluciones de los solvers, las {{t:open|aperturas}} desde las {{t:early-position|primeras posiciones}} son algo más pequeñas (p. ej., {{n:pf.open-size.solver-utg}} desde {{t:utg|UTG}} y {{n:pf.open-size.solver-co}} desde {{t:cutoff|CO}}), pero un único tamaño es más fácil de aprender. Cuando entras el primero, no te limitas a completar la ciega (eso es un {{t:limp}}, es decir, entrar solo {{t:call|igualando}} la {{t:big-blind|ciega grande}}): una {{t:raise}} puede ganar el {{t:pot|bote}} de inmediato y te da la {{t:initiative|iniciativa}}, porque quien {{t:raise|subió}} el último suele hacer la siguiente {{t:bet|apuesta}}.
:::
