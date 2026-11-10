---
id: m10.l1
module: m10
order: 1
title: "Estadísticas del HUD"
sub: "Qué miden el VPIP y el PFR y cuántas manos necesitas"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Estás en la {{t:big-blind|ciega grande}}. Dos jugadores hacen limp, tú {{t:check|pasas}} y ves el flop. ¿Esta mano sube tu {{t:vpip}}?"
    options:
      - { text: "No: no has puesto voluntariamente ni una sola {{t:chips|ficha}}", correct: true, why: "El {{t:vpip}} solo cuenta las aportaciones voluntarias antes del flop: {{t:call|igualar}} o {{t:raise|subir}}. La {{t:big-blind|ciega grande}} es una aportación obligatoria, y {{t:check|pasar}} no cuesta nada." }
      - { text: "Sí: juegas el flop, así que la mano cuenta como jugada", why: "Ver el flop no basta. El {{t:vpip}} solo sube cuando tú mismo pones {{t:chips|fichas}} antes del flop." }
      - { text: "Sí, y también sube tu {{t:pfr}}", why: "El {{t:pfr}} solo sube cuando haces una {{t:raise|subida}} antes del flop. Aquí nadie ha {{t:raise|subido}} y tú solo has {{t:check|pasado}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Un amigo te enseña una nota: un rival tiene {{t:vpip}} {{n:hud.ex.wrong.vpip}} y {{t:pfr}} {{n:hud.ex.wrong.pfr}}. ¿Qué opinas?"
    options:
      - { text: "Es imposible: el {{t:pfr}} no puede ser mayor que el {{t:vpip}}", correct: true, why: "Toda {{t:raise|subida}} antes del flop es también una aportación voluntaria, así que cuenta en ambas estadísticas. El {{t:pfr}} es siempre como mucho igual al {{t:vpip}}; tu amigo se ha equivocado con los números." }
      - { text: "Es un jugador muy agresivo que casi nunca {{t:call|iguala}}", why: "Un jugador que nunca {{t:call|iguala}} tiene un {{t:pfr}} igual a su {{t:vpip}}, pero no mayor. Un {{t:pfr}} mayor indica un error en la anotación." }
      - { text: "Es un jugador pasivo", why: "La pasividad se ve cuando el {{t:pfr}} es mucho menor que el {{t:vpip}}, no mayor." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Un rival tiene {{t:vpip}} {{n:mda.rec.vpip}} y {{t:pfr}} {{n:mda.rec.pfr}}. ¿Qué hace con las manos que juega pero no {{t:raise|sube}}?"
    options:
      - { text: "Las {{t:call|iguala}} o hace limp: es la diferencia del {{n:mda.rec.gap}} de las manos", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Estas manos las mete en el {{t:pot|bote}} sin {{t:raise|subir}}: hace limp o {{t:call|iguala}} las {{t:open|aperturas}} de otros." }
      - { text: "Se {{t:fold|retira}} con ellas antes del flop", why: "Las manos con las que se retira antes del flop no cuentan para el {{t:vpip}} en absoluto. La diferencia {{t:vpip}} − {{t:pfr}} son las manos jugadas sin {{t:raise|subida}}." }
      - { text: "Las juega {{t:all-in}}", why: "Un all-in antes del flop también es una {{t:raise|subida}}, así que subiría el {{t:pfr}}. La diferencia son las manos que solo ha {{t:call|igualado}} o con las que ha hecho limp." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Tras {{n:hud.se.ex.n}} manos, un rival tiene {{t:vpip}} {{n:hud.se.ex.p}}. ¿Cuál es el error estándar de esta cifra en puntos porcentuales? Escribe un número."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Con aprox. un {{n:var.conf95}} de confianza, el {{t:vpip}} real está dentro de ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Tras {{n:hud.se.ex.n}} manos, el {{t:vpip}} de un rival es {{n:hud.se.ex.p}}. ¿Qué sabes de su {{t:vpip}} real?"
    options:
      - { text: "Con aprox. un {{n:var.conf95}} de confianza, está entre {{n:hud.ci.ex.low}} y {{n:hud.ci.ex.high}}", correct: true, why: "El error estándar es de aprox. {{n:hud.se.ex}}, y el intervalo del {{n:var.conf95}} es ± {{n:var.z95}} errores, es decir, ± {{n:hud.ci.ex}}. Sabes que el rival no es extremo, pero aún no puedes distinguir tipos que se diferencian en unos pocos puntos." }
      - { text: "Es exactamente {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} manos siguen siendo una muestra pequeña: el error es de aprox. {{n:hud.se.ex}}, y el intervalo del {{n:var.conf95}} es ± {{n:hud.ci.ex}}." }
      - { text: "Nada: antes de mil manos las estadísticas no significan nada", why: "Es una exageración. Un intervalo de {{n:hud.ci.ex.low}} a {{n:hud.ci.ex.high}} ya descarta a un jugador muy tight y a uno muy loose. Solo falta precisión." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Tras unos cientos de manos, un rival ha tenido {{n:hud.se.f3b.n}} ocasiones de responder a un 3-bet y se ha {{t:fold|retirado}} en el {{n:hud.se.f3b.p}} de ellas. ¿Qué sabes de su fold to 3-bet?"
    options:
      - { text: "Casi nada: con aprox. un {{n:var.conf95}} de confianza, está entre {{n:hud.ci.f3b.low}} y {{n:hud.ci.f3b.high}}", correct: true, why: "Cuentan las ocasiones, no las manos. El error es √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, y el intervalo del {{n:var.conf95}} es ± {{n:hud.ci.f3b}}. En ese intervalo cabe tanto un jugador que casi siempre defiende como uno que casi siempre se {{t:fold|retira}}." }
      - { text: "Se {{t:fold|retira}} exactamente en el {{n:hud.se.f3b.p}} de los casos, porque la muestra tiene unos cientos de manos", why: "Unos cientos de manos son solo {{n:hud.se.f3b.n}} ocasiones para esta estadística. El error se calcula a partir de las ocasiones: sale aprox. {{n:hud.se.f3b}}." }
      - { text: "Se {{t:fold|retira}} demasiado, porque por encima de {{n:hud.f3b.low}} es un error", why: "{{n:hud.se.f3b.p}} no está «por encima de {{n:hud.f3b.low}}», y con {{n:hud.se.f3b.n}} ocasiones el error es de aprox. {{n:hud.se.f3b}}. De una muestra así no puedes sacar conclusiones." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Un rival nuevo, {{n:hud.ex.few.hands}} manos en el {{t:hud|HUD}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. ¿Cómo juegas contra él?"
    options:
      - { text: "Como contra un jugador desconocido, según la base; sigo recogiendo manos", correct: true, why: "Por debajo de aprox. {{n:hud.hands.random}} manos, las estadísticas son aleatorias: unas cuantas buenas cartas seguidas dan un {{t:vpip}} así. El tipo de jugador se ve a grandes rasgos tras aprox. {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} manos, y el {{t:vpip}} y el {{t:pfr}} se estabilizan tras aprox. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "Como contra un {{t:maniac|maníaco}}: {{t:call|igualo}} con un rango amplio", why: "Un {{t:maniac|maníaco}}, es decir, un jugador muy loose y agresivo, es solo una posibilidad: tras {{n:hud.ex.few.hands}} manos puede ser cualquier tipo. {{t:call|Igualar}} con un rango amplio basándote en el azar te cuesta dinero cuando el rival resulta ser un {{t:regular|reg}} normal, es decir, un habitual que juega de forma bastante sólida." }
      - { text: "Como contra un {{t:nit}}, porque la mayoría de los jugadores son {{t:nit|nits}}", why: "Eso tampoco lo sabes: un {{t:nit}}, es decir, un jugador muy tight, es solo uno de los tipos. Sin muestra no hay lectura, así que vuelves a la base." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "¿Qué estadística necesita más manos para ser fiable?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "La ocasión para el fold to 3-bet solo aparece cuando el rival ha {{t:open|abierto}} y ha recibido un 3-bet, es decir, rara vez. Por eso necesitas aprox. {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} manos en lugar de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "El {{t:vpip}} tiene una ocasión en cada mano, así que es el que antes se estabiliza: tras aprox. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} manos." }
      - { text: "{{t:pfr}}", why: "El {{t:pfr}}, como el {{t:vpip}}, tiene una ocasión en cada mano en la que el jugador puede {{t:raise|subir}}, así que se estabiliza rápido." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "Tu sala prohíbe los programas de {{t:hud|HUD}} en la mesa. ¿Qué haces?"
    options:
      - { text: "Juego sin {{t:hud|HUD}} y, después de la {{t:session|sesión}}, reviso mi base de datos de manos y mis notas sobre los rivales habituales", correct: true, why: "El reglamento de la sala es vinculante: un programa prohibido puede hacer que te cierren la cuenta. Puedes revisar las estadísticas de tu propio historial de manos después de jugar, y algunas salas muestran sus propias estadísticas en la mesa." }
      - { text: "Uso un {{t:hud|HUD}} pese a la prohibición, porque da ventaja", why: "Por incumplir el reglamento, la sala puede cerrarte la cuenta y retener tus fondos. La ventaja no compensa." }
      - { text: "Renuncio a la {{t:exploit|explotación}}, porque sin {{t:hud|HUD}} es imposible", why: "Es posible: las lecturas de la revisión de manos después de la {{t:session|sesión}} y los datos de la población de tu {{t:stakes|límite}} también muestran hacia dónde desviarte de la base." }
---
La {{t:exploit|explotación}} consiste en desviarte de la base de los módulos 3–9 en la dirección del error del rival. Para saber hacia dónde desviarte, necesitas datos. Online te los da el {{t:hud}}: un programa que registra las manos y muestra las estadísticas de cada rival en la mesa.

## {{t:vpip}} y {{t:pfr}}

Las dos cifras más importantes describen el juego antes del flop:

- **{{t:vpip}}**: en qué porcentaje de manos el jugador mete voluntariamente {{t:chips|fichas}} en el {{t:pot|bote}} antes del flop, es decir, {{t:call|iguala}} o {{t:raise|sube}}. Las ciegas no cuentan, porque son obligatorias.
- **{{t:pfr}}**: en qué porcentaje de manos el jugador {{t:raise|sube}} antes del flop: {{t:open|abre}}, hace 3-bet o hace 4-bet.

Toda {{t:raise|subida}} es también una aportación voluntaria, así que el {{t:pfr}} nunca supera al {{t:vpip}}. La diferencia {{t:vpip}} − {{t:pfr}} son las manos que el jugador solo ha {{t:call|igualado}} o con las que ha hecho limp. Un jugador con {{t:vpip}} {{n:mda.rec.vpip}} y {{t:pfr}} {{n:mda.rec.pfr}} juega muchas manos, pero en el {{n:mda.rec.gap}} de todas las manos entra en el {{t:pot|bote}} sin {{t:raise|subir}}.

## Otras estadísticas

| Estadística | Qué mide | Ocasión |
|---|---|---|
| 3-bet | con qué frecuencia {{t:raise|sube}} la {{t:open|apertura}} de otro | alguien antes que él ha {{t:open|abierto}} |
| Fold to 3-bet | con qué frecuencia se {{t:fold|retira}} ante un 3-bet | ha {{t:open|abierto}} y ha recibido un 3-bet |
| C-bet | con qué frecuencia apuesta en el flop tras su propia {{t:raise|subida}} | ha sido el {{t:aggressor|agresor}} antes del flop |
| Fold to c-bet | con qué frecuencia se {{t:fold|retira}} ante un c-bet | ha recibido un c-bet |
| {{t:wtsd}} | con qué frecuencia llega al showdown después del flop | ha visto el flop |

La última columna es importante: una estadística solo cambia cuando el rival tiene ocasión. El {{t:vpip}} tiene ocasión en cada mano, y el fold to 3-bet solo cuando el rival ha {{t:open|abierto}} y ha recibido un 3-bet.

## Cuántas manos necesitas

Cada mano es una muestra aleatoria de la estrategia del rival, así que una estadística tiene error, como cualquier media muestral. Lo calculas con la fórmula del error de una media muestral (en el módulo 12 usarás la misma fórmula para calcular el error de tu {{t:winrate|winrate}}):

```formula
error = √(p × (1 − p) ÷ n)
intervalo del {{n:var.conf95}} = p ± {{n:var.z95}} × error
```

Aquí p es el porcentaje (p. ej., el {{t:vpip}}) y n, el número de ocasiones. Tras {{n:hud.se.ex.n}} manos con un {{t:vpip}} de {{n:hud.se.ex.p}}, el error es de aprox. {{n:hud.se.ex}}, así que, con aprox. un {{n:var.conf95}} de confianza, el {{t:vpip}} real está entre **{{n:hud.ci.ex.low}} y {{n:hud.ci.ex.high}}**. Un fold to 3-bet de {{n:hud.se.f3b.p}} en {{n:hud.se.f3b.n}} ocasiones da un intervalo de {{n:hud.ci.f3b.low}} a {{n:hud.ci.f3b.high}}: casi nada.

Los entrenadores dan umbrales parecidos:

- por debajo de aprox. {{n:hud.hands.random}} manos, las estadísticas son aleatorias; juegas como contra un jugador desconocido;
- el tipo de jugador se ve a grandes rasgos tras {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} manos, y el {{t:vpip}} y el {{t:pfr}} se estabilizan tras aprox. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}};
- el 3-bet necesita aprox. {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} manos, el fold to 3-bet aprox. {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}, y las estadísticas del turn y del river, todavía más.

:::note Cuando la sala prohíbe el {{t:hud|HUD}}
Algunas salas (según los materiales de formación, también salas grandes en {{t:stakes|límites}} bajos) prohíben los programas de {{t:hud|HUD}} en la mesa. En ese caso revisas tu propio historial de manos después de la {{t:session|sesión}}, tomas notas sobre los rivales habituales y usas los datos de la población de tu {{t:stakes|límite}} (lección 2). Los umbrales de muestra proceden de dos materiales de formación que dan cifras de manos distintas. La fórmula del error es un cálculo.
:::
