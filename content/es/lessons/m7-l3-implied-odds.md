---
id: m7.l3
module: m7
order: 3
title: "Proyectos e implied odds"
sub: "Cuánto tienes que ganar después"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "En el flop tenías aprox. {{n:odds.flush.flop-river}} de probabilidad de ligar {{t:flush|color}} antes del river. El turn no te ha ayudado. ¿Cuánta probabilidad tienes ahora?"
    options:
      - { text: "Aprox. {{n:odds.flush.turn-river}}", correct: true, why: "Sí: queda una carta. {{n:outs.flush}} outs de {{n:cards.unseen.turn}} cartas desconocidas son {{n:odds.flush.turn-river}}, más o menos la mitad de la probabilidad del flop." }
      - { text: "Sigue siendo aprox. {{n:odds.flush.flop-river}}, porque hay los mismos outs", why: "Hay los mismos outs, pero quedan menos cartas por salir. {{n:odds.flush.flop-river}} cuenta dos cartas, y en el turn queda una." }
      - { text: "No se puede calcular sin calculadora", why: "Sí se puede: la regla del 2 y el 4 del M2. Una carta, así que outs × 2: aproximadamente {{n:odds.flush.rule-turn}}. Exactamente, {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. ¿Cuántos outs tienes para {{t:flush|color}} o {{t:straight|escalera}}? Escribe un número."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Para el {{t:flush|color}}, {{n:outs.flush}} corazones; para la {{t:straight|escalera}}, cada reina y cada siete, es decir, {{n:outs.oesd}} cartas. La reina de corazones y el siete de corazones ya están contados en el color, así que restas {{n:draw.combo.overlap}}: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} {{n:ex.bet.three-quarters}}. ¿Qué haces?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "Tienes {{n:outs.combo}} outs, es decir, aprox. {{n:odds.combo.turn-river}} en el river. Necesitas {{n:eq.bet-three-quarters}}, así que {{t:call|igualar}} es rentable incluso sin implied odds." }
      - { text: "{{t:fold|Me retiro}}, porque un {{t:draw|proyecto}} en el turn no basta", why: "Con un {{t:draw|proyecto}} normal, a este precio, efectivamente toca {{t:fold|retirarse}}, pero un proyecto de {{t:flush|color}} y {{t:straight|escalera}} a la vez da aprox. {{n:odds.combo.turn-river}}, más que el {{n:eq.bet-three-quarters}} que necesitas." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.third.pot}} y el rival {{t:bet|apuesta}} {{n:io.flush.bet}}. Tienes {{t:flush-draw|proyecto de color}}: {{n:outs.flush}} outs de {{n:cards.unseen.turn}} cartas. ¿Cuántas {{t:chips|fichas}} más tienes que ganar en el river cuando ligues para quedar a cero al {{t:call|igualar}}? Escribe un número."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Necesitas {{n:io.flush.eq}} de equity y tienes aprox. {{n:odds.flush.turn-river}}. De {{n:cards.unseen.turn}} rivers posibles, ligas {{n:outs.flush}} veces y fallas {{n:miss.flush.turn}} veces, y cada vez pierdes {{n:io.flush.bet}}. Así que cada acierto tiene que aportar {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. En el {{t:pot|bote}} hay {{n:io.flush.pot-after-bet}}, faltan {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:io.oesd.pot}} y el rival {{t:bet|apuesta}} {{n:io.oesd.bet}}. Tienes {{t:oesd|proyecto de escalera abierta}}: {{n:outs.oesd}} outs y {{n:miss.oesd.turn}} cartas que no ligan. ¿Cuánto más tienes que ganar en el river cuando ligues?"
    options:
      - { text: "Aprox. {{n:io.oesd.extra}}", correct: true, why: "Cada acierto tiene que aportar {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. En el {{t:pot|bote}} hay {{n:io.oesd.pot-after-bet}}, así que faltan {{n:io.oesd.extra}}." }
      - { text: "Aprox. {{n:io.oesd.need}}", why: "Eso es lo que tienes que ganar en total con cada acierto. Una parte ya está en el {{t:pot|bote}} ({{n:io.oesd.pot-after-bet}}), así que faltan {{n:io.oesd.extra}} más." }
      - { text: "Nada, el precio basta", why: "Necesitas {{n:eq.bet-half}} de equity y tienes aprox. {{n:odds.oesd.turn-river}}. El {{t:pot|bote}} por sí solo no basta; faltan {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.third.pot}} y el rival {{t:bet|apuesta}} {{n:io.flush.bet}}. A cada uno de vosotros os quedan todavía {{n:io.flush.stack}} detrás, y el rival paga a gusto con una {{t:pair|pareja}} de ases. ¿Qué haces?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Igualo}}", correct: true, why: "El precio por sí solo no basta ({{n:io.flush.eq}} frente a aprox. {{n:odds.flush.turn-river}}), pero si ligas solo tienes que ganar {{n:io.flush.extra}} más. Tienes {{t:draw|proyecto}} al mejor {{t:flush|color}} (el as de corazones está en la {{t:board|mesa}}, así que el {{t:flush|color}} al rey es el más alto), el rival tiene muchas {{t:chips|fichas}} detrás, y un jugador con {{t:pair|pareja}} de ases a menudo pagará una apuesta así en el river. Tu acierto se verá (un tercer corazón), pero un rival con {{t:pair|pareja}} de ases a menudo pagará igualmente; por eso aquí las implied odds son menores que con un acierto oculto." }
      - { text: "{{t:fold|Me retiro}}, porque {{n:odds.flush.turn-river}} es menos que {{n:io.flush.eq}}", why: "Las pot odds dicen «{{t:fold|retírate}}», pero ignoras las implied odds. Solo faltan {{n:io.flush.extra}}, y el rival tiene {{n:io.flush.stack}} detrás y una mano que pagará." }
      - { text: "{{t:raise|Subo}} all-in", why: "Un rival con {{t:pair|pareja}} de ases probablemente {{t:call|igualará}}, y entonces solo tienes aprox. {{n:odds.flush.turn-river}}. Es mejor ver el river barato y ganar más cuando ligues." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} {{n:ex.bet.half}}. Tienes un gutshot. Si ligas, tendrías que ganar {{n:io.gut.extra}} más, pero al rival solo le quedan {{n:io.gut.stack}} detrás. ¿Qué haces?"
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "El gutshot da aprox. {{n:odds.gutshot.turn-river}} y necesitas {{n:eq.bet-half}}. Las implied odds no ayudarán: aunque el rival meta todo lo que tiene ({{n:io.gut.stack}}), no cubrirá lo que falta ({{n:io.gut.extra}})." }
      - { text: "{{t:call|Igualo}} por las implied odds", why: "Las implied odds son las {{t:chips|fichas}} que el rival todavía puede pagarte. Solo tiene {{n:io.gut.stack}}, y necesitas {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Subo}} all-in", why: "Un {{t:bluff|farol}} all-in con {{n:outs.gutshot}} outs lo arriesga todo. Un rival que ha {{t:bet|apostado}} medio {{t:pot|bote}} con un stack tan pequeño a menudo ya no se {{t:fold|retirará}}." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. En el {{t:pot|bote}} hay {{n:ex.pot}} y un rival prudente {{t:bet|apuesta}} todo el {{t:pot|bote}}: {{n:ex.bet.pot}}. ¿Qué haces?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Me retiro}}", correct: true, why: "Necesitas {{n:eq.bet-pot}} y tienes aprox. {{n:odds.flush.turn-river}}. Además, tu {{t:flush|color}} es bajo: cuando salga un corazón, un rival con la reina o la jota de corazones tendrá un {{t:flush|color}} mejor, y es entonces cuando más pierdes (implied odds inversas)." }
      - { text: "{{t:call|Igualo}} por las implied odds", why: "Aquí las implied odds son malas: un {{t:flush|color}} ligado puede perder contra uno más alto, y un tercer corazón en la {{t:board|mesa}} lo ve cualquiera. Además falta muchísimo: el precio es {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Subo}}", why: "Un rival prudente que {{t:bet|apuesta}} todo el {{t:pot|bote}} en una {{t:board|mesa}} con as y rey rara vez se {{t:fold|retirará}}. Arriesgas mucho con una mano que puede perder incluso ligando." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "¿Cuándo son mayores las implied odds?"
    options:
      - { text: "Cuando tienes {{t:draw|proyecto}} a la mejor mano y el rival tiene una mano fuerte y muchas {{t:chips|fichas}} detrás", correct: true, why: "Sí: entonces ganas cuando ligas, y el rival tiene fichas para pagarte y una mano con la que hacerlo." }
      - { text: "Cuando el rival tiene pocas {{t:chips|fichas}} ({{t:spr}} bajo)", why: "Al revés: con un {{t:spr}} bajo, al rival ya no le queda nada que pagar, así que las implied odds son pequeñas." }
      - { text: "Cuando tienes {{t:draw|proyecto}} a un {{t:flush|color}} bajo", why: "Eso son implied odds inversas: a veces ligas y aun así pierdes, y además en un {{t:pot|bote}} grande." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "Al principio del turn hay {{n:ex.pot}} en el {{t:pot|bote}}, y el menor de vuestros stacks es {{n:spr.stack.high}}. ¿Cuánto vale el {{t:spr}}?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = stack ÷ {{t:pot|bote}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. Al rival le quedan varios {{t:pot|botes}} detrás, así que las implied odds pueden ser grandes." }
      - { text: "{{n:spr.low}}", why: "Eso sería con un stack de {{n:spr.stack.low}}. Aquí el stack es {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "Eso es el {{t:pot|bote}}. El {{t:spr}} es una proporción: el stack dividido entre el {{t:pot|bote}}." }
---
En el turn ya solo queda una carta. La probabilidad de tu {{t:draw|proyecto}} cae más o menos a la mitad, y el precio de la siguiente carta suele subir. Por eso en el turn calculas con más precisión y te haces una pregunta nueva: ¿cuánto puedo ganar después si ligo?

## Una carta hasta el final

| {{t:draw|Proyecto}} | Outs | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Color}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:straight|Escalera}} abierta | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Color}} + {{t:straight|escalera}} abierta | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Con la regla del 2 y el 4 del M2, multiplicas los outs por 2. Cuando dos {{t:draw|proyectos}} comparten cartas, las cuentas una sola vez.

## Implied odds

Las implied odds (probabilidades implícitas) son las {{t:chips|fichas}} que ganarás en el river cuando ligues. Ejemplo: en el {{t:pot|bote}} hay {{n:ex.third.pot}}, el rival {{t:bet|apuesta}} {{n:io.flush.bet}} y tú tienes {{t:flush-draw|proyecto de color}}. Necesitas {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} de equity, y tienes aprox. {{n:odds.flush.turn-river}}. El {{t:pot|bote}} por sí solo no basta.

De {{n:cards.unseen.turn}} rivers posibles, ligas {{n:outs.flush}} veces y fallas {{n:miss.flush.turn}} veces. Para quedar a cero, cada acierto tiene que aportar lo mismo que cuestan los fallos:

```formula
ganancia necesaria = cantidad a pagar × (cartas que no ligan ÷ outs)
```

Aquí: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. En el {{t:pot|bote}} hay {{n:io.flush.pot-after-bet}}, así que en el river tienes que conseguir, de media, **{{n:io.flush.extra}}** más.

## {{t:spr}}: cuántas {{t:chips|fichas}} le quedan al rival detrás

El {{t:spr}} (stack respecto al {{t:pot|bote}}) es el {{t:effective-stack|stack efectivo}}, es decir, el menor de los dos, dividido entre el {{t:pot|bote}} al principio de la {{t:street|calle}}. El {{t:spr}} se puede calcular en cualquier {{t:street|calle}}; aquí lo calculas en el turn. Con un {{t:pot|bote}} de {{n:ex.pot}} y un stack de {{n:spr.stack.high}}, el {{t:spr}} es {{n:spr.high}}, es decir, al rival todavía le quedan varios {{t:pot|botes}} detrás; con un stack de {{n:spr.stack.low}}, solo {{n:spr.low}}. Las implied odds no pueden ser mayores que las {{t:chips|fichas}} que el rival todavía tiene delante. Con un {{t:spr}} bajo, cuentan casi exclusivamente las pot odds. Más sobre el {{t:spr}} en el módulo «Plan de la mano» (M9), que planifica la mano según el {{t:spr}} del flop.

## Cuándo las implied odds son reales

- tienes {{t:draw|proyecto}} a la **mejor mano** (el {{t:flush|color}} más alto posible, normalmente con el as),
- el rival tiene una **mano fuerte** con la que pagará,
- el rival tiene **muchas {{t:chips|fichas}}** detrás ({{t:spr}} alto),
- tu acierto **no llama la atención** (p. ej., un gutshot se ve menos que un tercer corazón en la {{t:board|mesa}}).

Las implied odds inversas juegan en tu contra: cuando tienes {{t:draw|proyecto}} a un {{t:flush|color}} bajo, o a {{t:straight|escalera}} mientras en la {{t:board|mesa}} puede llegar un {{t:flush|color}}, a veces ligas y aun así pierdes, y además en un {{t:pot|bote}} grande.

:::note De dónde salen estas reglas
El cálculo de las implied odds es un cálculo exacto basado en el {{t:expected-value|valor esperado}}. Las condiciones en las que las implied odds son reales, así como las implied odds inversas, son heurísticas de materiales de formación.
:::
