---
id: m2.l1
module: m2
order: 1
title: "Outs y probabilidades"
sub: "Regla del 2 y el 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "¿Cuántos outs tienes para {{t:flush|color}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Tienes {{n:draw.flush.seen}} corazones (2 en la mano y 2 en la {{t:board|mesa}}). La baraja tiene {{n:cards.per-suit}} corazones, así que quedan {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} son todos los corazones de la baraja, pero {{n:draw.flush.seen}} ya los ves." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} son los corazones que ya tienes. Contamos las cartas que necesitas." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "¿Cuántos outs tienes para {{t:straight|escalera}}?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Tienes 6-7-8-9. Cualquier cinco y cualquier diez te dan {{t:straight|escalera}}: {{n:draw.oesd.ranks}} valores × {{n:cards.suits}} palos = {{n:outs.oesd}} cartas." }
      - { text: "{{n:outs.gutshot}}", why: "Esos serían los outs si faltara una carta en medio (gutshot). Aquí la {{t:straight|escalera}} está abierta por los dos lados." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Son dos valores de carta (el cinco y el diez), pero cada uno tiene cuatro palos." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, tienes {{n:outs.flush}} outs para {{t:flush|color}}. ¿Qué probabilidad tienes de ligarlo en el river?"
    options:
      - { text: "Aprox. {{n:odds.flush.turn-river}}", correct: true, why: "Queda una carta por salir: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (aproximación). Exactamente, {{n:outs.flush}} de {{n:cards.unseen.turn}} cartas desconocidas, es decir, {{n:odds.flush.turn-river}}." }
      - { text: "Aprox. {{n:odds.flush.flop-river}}", why: "Esa es la probabilidad en el flop, cuando quedan dos cartas por salir. En el turn solo queda una." }
      - { text: "Aprox. {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} significaría que una de cada dos cartas desconocidas te da {{t:flush|color}}. Solo te lo dan {{n:outs.flush}} de {{n:cards.unseen.turn}}." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "En el flop tienes un gutshot ({{n:outs.gutshot}} outs). ¿Qué probabilidad tienes de ligarlo hasta el river?"
    options:
      - { text: "Aprox. {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (aproximación). Exactamente, {{n:odds.gutshot.flop-river}}. Pero solo la tienes si ves las dos cartas sin más {{t:bet|apuestas}} (all-in). Si el rival {{t:bet|apuesta}} en el flop, pagas por una carta: entonces la probabilidad es de aprox. {{n:odds.gutshot.flop-turn}}." }
      - { text: "Aprox. {{n:odds.gutshot.rule-turn}}", why: "Esa es la probabilidad aproximada con una carta ({{n:outs.gutshot}} × 2). La pregunta se refiere a las dos cartas: el turn y el river." }
      - { text: "Aprox. {{n:odds.oesd.flop-river}}", why: "Eso tendrías con {{n:outs.oesd}} outs. Un gutshot solo tiene {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Tienes {{t:flush-draw|proyecto de color}} y el rival {{t:bet|apuesta}}. ¿Con qué probabilidad de ligar comparas el precio de {{t:call|igualar}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Aprox. {{n:odds.flush.flop-turn}}, la probabilidad en el turn", correct: true, why: "{{t:call|Igualar}} solo te compra una carta. En el turn el rival puede volver a {{t:bet|apostar}} y el river lo pagarás aparte. {{n:outs.flush}} de {{n:cards.unseen.flop}} es aprox. {{n:odds.flush.flop-turn}}." }
      - { text: "Aprox. {{n:odds.flush.flop-river}}, la probabilidad hasta el river", why: "Solo la tienes si seguro que ves las dos cartas sin más {{t:bet|apuestas}}, es decir, con un all-in. Ante una {{t:bet|apuesta}} normal en el flop compras una carta." }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn. Tienes {{n:outs.flush}} outs para {{t:flush|color}}. ¿Qué porcentaje de probabilidad de ligarlo en el river da la regla del 2 y el 4? Escribe un número."
    answer: odds.flush.rule-turn
    explanation: "Queda una carta por salir, así que multiplicas por 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (aproximación). Exactamente: {{n:outs.flush}} de {{n:cards.unseen.turn}} cartas, es decir, {{n:odds.flush.turn-river}}."
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
Un **out** es una carta que convierte tu mano en una probable ganadora. Contar los outs te permite estimar rápido tus probabilidades sin calculadora.

## {{t:draw|Proyectos}} habituales

- **{{t:flush-draw|Proyecto de color}}** ({{n:draw.flush.seen}} cartas del mismo palo, te falta una para el {{t:flush|color}}): **{{n:outs.flush}} outs**. Cada palo tiene {{n:cards.per-suit}} cartas y ves {{n:draw.flush.seen}}.
- **{{t:oesd|Proyecto de escalera abierta}}**, p. ej. [[8c 9d]] con la {{t:board|mesa}} [[6s 7h Kd]]: **{{n:outs.oesd}} outs**, es decir, cuatro cincos y cuatro dieces.
- **Hueco en la {{t:straight|escalera}} (gutshot)**, p. ej. 5-6-8-9 sin el siete: **{{n:outs.gutshot}} outs**.

## Regla del 2 y el 4

La regla te da una probabilidad aproximada sin calculadora: multiplicas los outs por 2 o por 4. Las probabilidades exactas están en la tabla de abajo.

```formula
probabilidad ≈ outs × 2   (una carta por salir)
probabilidad ≈ outs × 4   (dos cartas, solo si ves ambas sin más apuestas)
```

| {{t:draw|Proyecto}} | Outs | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| {{t:flush|Color}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|Proyecto de escalera abierta}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## ¿Una carta o dos?

Si el rival {{t:bet|apuesta}} en el flop, al {{t:call|pagar}} solo compras una carta: el turn. En el turn el rival puede volver a {{t:bet|apostar}} y el river lo pagarás aparte. Por eso, ante una {{t:bet|apuesta}} en el flop, calculas la probabilidad para la **siguiente carta** (× 2): para el {{t:flush|color}} son {{n:outs.flush}} de {{n:cards.unseen.flop}}, es decir, aprox. {{n:odds.flush.flop-turn}}. La probabilidad **hasta el river** (× 4, aprox. {{n:odds.flush.flop-river}} para el {{t:flush|color}}) solo la usas cuando seguro que verás las dos cartas sin más {{t:bet|apuestas}}, es decir, cuando alguien está all-in.

:::note De dónde salen estos números
En el turn hay {{n:cards.unseen.turn}} cartas que no conoces ({{n:cards.deck}} menos tus {{n:cards.hole}} y las {{n:cards.board.turn}} de la {{t:board|mesa}}). La probabilidad de ligar el {{t:flush|color}} es de {{n:outs.flush}} entre {{n:cards.unseen.turn}}. La regla del 2 y el 4 se equivoca como mucho en unos {{n:rule24.error.max.pp}} puntos porcentuales, siempre que no tengas más de {{n:rule24.outs.max}} outs.
:::
