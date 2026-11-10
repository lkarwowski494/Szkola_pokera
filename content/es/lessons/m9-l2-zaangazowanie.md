---
id: m9.l2
module: m9
order: 2
title: "Compromiso"
sub: "Cuando juegas por todo el stack"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: en el {{t:pot|bote}} hay {{n:ex.pot}} y los stacks son de {{n:commit.stack}}. Apuestas todo el {{t:pot|bote}} ({{n:ex.bet.pot}}) y tu rival va all-in. Tienes que poner {{n:commit.after-pot.call}} más. ¿Cuánta equity necesitas para {{t:call|igualar}}? Escribe el número en porcentaje."
    answer: eq.commit.after-pot
    explanation: "Antes del exceso del rival, en el {{t:pot|bote}} hay {{n:ex.pot.after-pot-call}} (el {{t:pot|bote}}, tu {{t:bet|apuesta}} y lo que él iguala). Pones {{n:commit.after-pot.call}} más, así que la equity necesaria = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Tras una {{t:bet|apuesta}} así estás comprometido: {{t:fold|retirarte}} no suele compensar."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: en el {{t:pot|bote}} hay {{n:ex.pot}} y los stacks son de {{n:commit.stack}}. Apuestas medio {{t:pot|bote}} ({{n:ex.bet.half}}) y tu rival va all-in. Tienes que poner {{n:commit.after-half.call}} más. ¿Cuánta equity necesitas para {{t:call|igualar}}? Escribe el número en porcentaje."
    answer: eq.commit.after-half
    explanation: "Antes del exceso del rival, en el {{t:pot|bote}} hay {{n:ex.half.total}} (el {{t:pot|bote}}, tu {{t:bet|apuesta}} y lo que él iguala). Pones {{n:commit.after-half.call}} más: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. Es menos que ante un all-in directo ({{n:eq.jam.spr2}}), porque ya has puesto parte del dinero."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Tienes {{t:top-pair|pareja mayor}}, apuestas todo el {{t:pot|bote}} y tu rival va all-in. Para {{t:call|igualar}} necesitas {{n:eq.commit.after-pot}} de equity. ¿Qué haces?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Sí: el precio es muy bueno. Con un {{t:spr}} bajo, el rival también va all-in con {{t:draw|proyectos}} y damas más débiles, así que la {{t:top-pair|pareja mayor}} con as suele tener mucho más de {{n:eq.commit.after-pot}} de equity. Solo pierde claramente contra {{t:two-pair|dobles parejas}} y sets." }
      - { text: "{{t:fold|Me retiro}}, porque el all-in muestra una mano fuerte", why: "{{t:fold|Retirarte}} entrega un {{t:pot|bote}} en el que ya has puesto bastante. Solo necesitas ganar una vez de cada cinco, es decir, el {{n:eq.commit.after-pot}} de las veces. Si pensabas {{t:fold|retirarte}} aquí, era mejor no apostar todo el {{t:pot|bote}}." }
      - { text: "{{t:fold|Me retiro}}, porque el {{t:spr}} es bajo", why: "Un {{t:spr}} bajo funciona al revés: con él es más fácil jugar por todo el stack, porque el precio del all-in es mejor." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Después de tu {{t:bet|apuesta}} te quedaría en el stack menos de lo que sumaría el {{t:pot|bote}} cuando te la {{t:call|igualen}}. ¿Qué plan no tiene sentido?"
    options:
      - { text: "{{t:bet|Apostar}} y {{t:fold|retirarte}} si el rival va all-in", correct: true, why: "Sí, este plan es un error: tras una {{t:bet|apuesta}} así necesitas muy poca equity para {{t:call|igualar}} el all-in (con {{t:spr}} {{n:spr.commit}} y una {{t:bet|apuesta}} del tamaño del {{t:pot|bote}}, solo {{n:eq.commit.after-pot}}). Si te {{t:fold|retiras}} de todos modos, la {{t:bet|apuesta}} solo regala {{t:chips|fichas}}." }
      - { text: "All-in directamente", why: "Es un plan razonable con una mano fuerte: de todos modos juegas por todo el stack, así que lo metes directamente." }
      - { text: "{{t:check|Pasar}}", why: "También es razonable cuando no quieres jugar por todo el stack: no metes dinero con el que luego te costaría {{t:fold|retirarte}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Bote}} tras un 4-bet, {{t:spr}} de aprox. {{n:spr.4bet}}. Has ligado {{t:top-pair|pareja mayor}} con el mejor kicker. ¿Qué plan sigues?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Juego por todo el stack", correct: true, why: "Sí: con un {{t:spr}} de aprox. {{n:spr.4bet}} solo necesitas aprox. {{n:eq.jam.4bet}} de equity para el all-in, y la {{t:top-pair|pareja mayor}} con as es aquí muy fuerte. Apuestas o {{t:call|igualas}} con el plan de meterlo todo." }
      - { text: "Juego con cautela y {{t:fold|me retiro}} ante una {{t:bet|apuesta}} grande", why: "Con un {{t:spr}} tan bajo, {{t:fold|retirarte}} con {{t:top-pair|pareja mayor}} cede demasiado. Tras un 4-bet el rival también tiene AQ, QQ, JJ y otras manos que pierden contra la tuya." }
      - { text: "Apuesto poco y {{t:fold|me retiro}} ante el all-in", why: "Es el plan de {{t:bet|apostar}} y {{t:fold|retirarse}} con un {{t:spr}} bajo: tras la {{t:bet|apuesta}}, el precio del all-in será aún mejor, y {{t:fold|retirarte}} entrega un {{t:pot|bote}} en el que ya has metido dinero." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "¿Por qué con un {{t:spr}} de aprox. {{n:spr.commit}} la {{t:top-pair|pareja mayor}} suele jugar por todo el stack?"
    options:
      - { text: "Porque para el all-in necesitas aprox. {{n:eq.jam.spr2}} de equity, y dos {{t:bet|apuestas}} de aprox. {{n:geo.spr2.2}} del {{t:pot|bote}} meten todo el stack", correct: true, why: "Sí: el precio es bueno y para meter el stack bastan dos {{t:value|calles de valor}}. Eso la {{t:top-pair|pareja mayor}} suele aguantarlo. El umbral en sí es una heurística: también cuenta con qué juega el rival." }
      - { text: "Porque la {{t:top-pair|pareja mayor}} siempre gana", why: "No siempre: a veces el rival tiene {{t:two-pair|doble pareja}} o un set. Aun así, con un {{t:spr}} bajo, las manos peores y los {{t:draw|proyectos}} meten suficiente dinero, y el precio es bueno." }
      - { text: "Porque con {{t:spr}} {{n:spr.commit}} las reglas no permiten {{t:fold|retirarse}}", why: "Siempre puedes {{t:fold|retirarte}}. La cuestión es que {{t:fold|retirarte}} suele costar más de lo que aporta: para el all-in solo necesitas aprox. {{n:eq.jam.spr2}} de equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Bote}} con una sola subida, stacks de {{n:format.stack}}, {{t:spr}} de aprox. {{n:spr.srp}}. Has ligado {{t:top-pair|pareja mayor}} con buen kicker. ¿Cómo tratas esta mano?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Como mano de valor, pero normalmente no para todo el stack", correct: true, why: "Sí: con un {{t:spr}} de aprox. {{n:spr.srp}}, todo el stack solo entra tras varias {{t:bet|apuestas}} mayores que el {{t:pot|bote}}. Un rival que mete tanto rara vez tiene una mano peor que una {{t:pair|pareja}}." }
      - { text: "Juego por todo el stack, porque la {{t:top-pair|pareja mayor}} es fuerte", why: "Con {{t:spr}} {{n:spr.commit}}, sí, pero aquí el {{t:spr}} es de aprox. {{n:spr.srp}}. Cuando todo el stack está en el {{t:pot|bote}}, el rival suele tener {{t:two-pair|doble pareja}}, un set o una {{t:pair|pareja}} mejor." }
      - { text: "{{t:fold|Me retiro}} ante la primera {{t:bet|apuesta}} del rival", why: "Demasiado prudente: la {{t:top-pair|pareja mayor}} con buen kicker es una mano fuerte en este flop. La idea es no construir con ella un {{t:pot|bote}} por todo el stack, no {{t:fold|retirarte}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Bote}} tras un 4-bet, {{t:spr}} de aprox. {{n:spr.4bet}}. Tienes {{t:pair|pareja}} de jotas, y en el flop hay un as y un rey. El rival va all-in. ¿Qué pasa con la regla «con un {{t:spr}} bajo juego por el stack»?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "No cubre esta mano: es una {{t:pair|pareja}} más baja que las dos cartas altas de la {{t:board|mesa}}", correct: true, why: "Sí: la regla habla de la {{t:top-pair|pareja mayor}} y de manos mejores. Tras un 4-bet el rival a menudo tiene un as o un rey, y tus jotas pierden contra cualquier {{t:pair|pareja}} hecha con una carta alta. Aquí te {{t:fold|retiras}} más a menudo, a pesar del buen precio ({{n:eq.jam.4bet}})." }
      - { text: "Sí la cubre: con un {{t:spr}} bajo {{t:call|igualo}} con todo", why: "Un {{t:spr}} bajo da buen precio, pero no convierte una mano débil en una fuerte. Cuando el rival tiene a menudo una {{t:pair|pareja}} mejor, incluso {{n:eq.jam.4bet}} de equity puede ser demasiado." }
      - { text: "Sí la cubre, pero solo si tengo {{t:position|posición}}", why: "La {{t:position|posición}} no cambia con qué juegas. La regla se refiere a la {{t:top-pair|pareja mayor}} y a manos mejores." }
---
El compromiso (en inglés, commitment) es una situación en la que en el {{t:pot|bote}} ya hay tanto dinero en relación con tu stack que {{t:fold|retirarte}} ante un all-in casi nunca compensa. El {{t:spr}} de la lección anterior te dice lo cerca que estás de ello ya al empezar el flop.

## Tras una {{t:bet|apuesta}}, el precio es aún mejor

Ejemplo: {{t:spr}} {{n:spr.commit}}, en el {{t:pot|bote}} hay {{n:ex.pot}} y los stacks son de {{n:commit.stack}}. Si el rival va all-in directamente, necesitas {{n:eq.jam.spr2}} de equity. Si apuestas tú primero, necesitas menos:

| Tu {{t:bet|apuesta}} antes del all-in del rival | Pago | Equity necesaria |
|---|---|---|
| Ninguna (el rival va all-in directamente) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Medio {{t:pot|bote}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Todo el {{t:pot|bote}} ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## No planees {{t:bet|apostar}} y {{t:fold|retirarte}}

Si después de tu {{t:bet|apuesta}} te quedara en el stack menos de lo que sumaría el {{t:pot|bote}} cuando te la {{t:call|igualen}}, {{t:bet|apostar}} y {{t:fold|retirarte}} ante el all-in no suele tener sentido: para {{t:call|igualar}} el all-in necesitas entonces menos equity que para {{t:call|igualar}} una {{t:bet|apuesta}} del tamaño del {{t:pot|bote}} ({{n:eq.bet-pot}}). Tienes dos caminos razonables: jugar por todo el stack (apostar o ir all-in) o {{t:check|pasar}}.

## {{t:spr}} bajo: la {{t:top-pair|pareja mayor}} juega por el stack

Regla: **con un {{t:spr}} en el flop inferior a aprox. {{n:spr.zone.low}}, la {{t:top-pair|pareja mayor}} y las manos mejores suelen jugar por todo el stack** (las zonas de {{t:spr}} de la lección anterior). El ejemplo de {{t:spr}} {{n:spr.commit}} está en esta zona, y las cuentas con él respaldan la regla:

- para el all-in necesitas como mucho aprox. {{n:eq.jam.spr2}} de equity, y tras tu propia {{t:bet|apuesta}}, aún menos,
- dos {{t:bet|apuestas}} de aprox. {{n:geo.spr2.2}} del {{t:pot|bote}} meten todo el stack: con un {{t:pot|bote}} de {{n:ex.pot}}, son {{n:geo.spr2.flop}} en el flop y {{n:geo.spr2.turn}} en el turn, {{n:geo.spr2.total}} en total,
- la {{t:top-pair|pareja mayor}} suele aguantar dos {{t:value|calles de valor}} (lección sobre el plan para tres {{t:street|calles}}).

Sin embargo, las cuentas no fijan un umbral exacto. Que la {{t:top-pair|pareja mayor}} tenga suficiente equity depende de con qué juegue el rival. Por eso es una heurística y no una ley rígida. La regla se refiere a la {{t:top-pair|pareja mayor}} y a manos mejores: una {{t:pair|pareja}} más baja que las cartas altas de la {{t:board|mesa}} no la cumple.

## {{t:spr}} alto: con una {{t:pair|pareja}}, más cautela

En un {{t:pot|bote}} con una sola subida, el {{t:spr}} es de aprox. {{n:spr.srp}}. Para meter todo el stack hasta el river habría que apostar más que el {{t:pot|bote}} en cada {{t:street|calle}} (lección sobre el tamaño geométrico). Un rival que mete tanto dinero rara vez tiene una mano peor que una {{t:pair|pareja}}. Por eso, con una sola {{t:pair|pareja}} en un {{t:pot|bote}} así juegas por valor, pero normalmente no planeas jugar por todo el stack.

:::note De dónde salen estas reglas
El umbral de aprox. {{n:spr.zone.low}} procede de materiales de formación y de un análisis de solver publicado (con un {{t:spr}} de aprox. {{n:spr.commit}}, toda {{t:top-pair|pareja mayor}} y toda mano mejor juega por el stack). La cautela con una sola {{t:pair|pareja}} con un {{t:spr}} alto la confirman materiales de formación y análisis de solvers. Las cifras de precio y de tamaños de esta lección son matemática pura.
:::
