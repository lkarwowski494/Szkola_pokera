---
id: m0.l1
module: m0
order: 1
title: "Las jugadas"
sub: "Qué gana a qué"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "¿Quién gana: {{t:flush|color}} o {{t:straight|escalera}}?"
    options:
      - { text: "{{t:flush|Color}}", correct: true, why: "El {{t:flush|color}} está más arriba en el ranking. Es más difícil reunir 5 cartas del mismo palo que 5 cartas seguidas." }
      - { text: "{{t:straight|Escalera}}", why: "Es un error frecuente de principiantes. La {{t:straight|escalera}} está un puesto por debajo del {{t:flush|color}}." }
      - { text: "Empate", why: "Dos jugadas distintas nunca empatan. La más alta en el ranking siempre gana." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Tú tienes {{t:full-house|full}} y el rival, {{t:flush|color}}. ¿Quién gana?"
    options:
      - { text: "Tú, el {{t:full-house|full}} gana al {{t:flush|color}}", correct: true, why: "El {{t:full-house|full}} ({{t:three-of-a-kind|trío}} y {{t:pair|pareja}}) está en el 4.º puesto, y el {{t:flush|color}}, en el 5.º. Orden de arriba abajo: escalera de color, {{t:four-of-a-kind|póker}}, {{t:full-house|full}}, {{t:flush|color}}, {{t:straight|escalera}}." }
      - { text: "El rival, el {{t:flush|color}} gana al {{t:full-house|full}}", why: "Al revés. El {{t:full-house|full}} es más raro, así que es más fuerte." }
      - { text: "Depende del valor de las cartas", why: "El valor de las cartas solo cuenta con el mismo tipo de jugada." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "¿Qué es más fuerte: {{t:two-pair|doble pareja}} o {{t:three-of-a-kind|trío}}?"
    options:
      - { text: "{{t:three-of-a-kind|Trío}}", correct: true, why: "El {{t:three-of-a-kind|trío}} está en el 7.º puesto, y la {{t:two-pair|doble pareja}}, en el 8.º. Es fácil confundirse, porque la {{t:two-pair|doble pareja}} «parece» tener más cartas." }
      - { text: "{{t:two-pair|Doble pareja}}", why: "La {{t:two-pair|doble pareja}} está un puesto por debajo del {{t:three-of-a-kind|trío}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Los dos tenéis {{t:pair|pareja}} de reyes. ¿Quién gana?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Tú", correct: true, why: "La {{t:pair|pareja}} es la misma, así que decide el kicker: tu as gana a la dama del rival. Por eso AK es mucho mejor que KQ." }
      - { text: "El rival", why: "La dama del rival es más baja que tu as." }
      - { text: "{{t:split-pot|Bote dividido}}", why: "El bote se dividiría si la mejor jugada de cinco cartas fuera idéntica. Aquí las separa el kicker: as contra dama." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Hay una {{t:straight|escalera}} en la {{t:board|mesa}}. ¿Quién gana?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Bote dividido}}", correct: true, why: "La mejor jugada de cinco cartas de ambos jugadores es la {{t:straight|escalera}} de la {{t:board|mesa}}. La {{t:pair|pareja}} de ases es más débil que la {{t:straight|escalera}}, así que no aporta nada. Es una situación de «{{t:playing-the-board|jugar la mesa}}»." }
      - { text: "Tú, porque tienes {{t:pair|pareja}} de ases", why: "Una {{t:pair|pareja}} de ases es solo una {{t:pair|pareja}}. La {{t:straight|escalera}} de la {{t:board|mesa}} es más fuerte, así que juegas con ella, igual que el rival." }
      - { text: "El rival", why: "Para una {{t:straight|escalera}} más alta, el rival necesitaría un diez." }
  - kind: generated
    id: m0.l1.g1
    family: m0.who-wins
    rules: [R-M0-001]
    generator: whoWins
    count: 3
  - kind: generated
    id: m0.l1.g2
    family: m0.kicker
    rules: [R-M0-002]
    generator: whoWinsKicker
    count: 2
  - kind: generated
    id: m0.l1.g3
    family: m0.best-hand
    rules: [R-M0-001]
    generator: bestHand
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar hands
  - kind: generated
    id: m0.l1.g-vocab-hands
    family: vocab.hands
    generator: vocab
    params: { area: hands, dir: both }
    count: 4
---
En Texas Hold'em recibes **2 {{t:hole-cards|cartas propias}}**, y a la {{t:board|mesa}} llegan **5 {{t:community-cards|cartas comunitarias}}**. Con estas 7 cartas formas la mejor jugada de **5**. La jugada más fuerte se lleva todo el {{t:pot|bote}}.

## Ranking, de la más fuerte a la más débil

| | Jugada | Ejemplo |
|---|---|---|
| 1 | {{t:royal-flush|Escalera real}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Escalera de color}}: una {{t:straight|escalera}} del mismo palo | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Póker}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full}}: {{t:three-of-a-kind|trío}} y {{t:pair|pareja}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Color}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Escalera}} (5 seguidas) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Trío}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Doble pareja}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Pareja}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|Carta alta}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
Primero se compara la categoría de la jugada: el {{t:three-of-a-kind|trío}} gana a la {{t:two-pair|doble pareja}}. Con la misma jugada, decide su valor: la {{t:pair|pareja}} de reyes gana a la {{t:pair|pareja}} de damas, y con {{t:two-pair|doble pareja}} se compara primero la {{t:pair|pareja}} más alta. Solo cuando el núcleo de la jugada es idéntico (la misma {{t:pair|pareja}}, el mismo {{t:three-of-a-kind|trío}} o la misma {{t:two-pair|doble pareja}}) deciden las cartas adicionales, es decir, los kickers: primero el más alto y, si hay empate, el siguiente. Solo cuentan los kickers de la mejor jugada de cinco cartas. Si las dos jugadas de cinco cartas son idénticas, {{t:split-pot|el bote se divide}}.
:::

El as puede ser la carta más baja de una {{t:straight|escalera}}: [[5h 4s 3c 2d Ah]] es la {{t:straight|escalera}} más baja, la llamada {{t:wheel|wheel}}.

Cuando tu mejor jugada son solo las {{t:community-cards|cartas comunitarias}} y tus {{t:hole-cards|cartas propias}} no aportan nada, se dice que estás {{t:playing-the-board|jugando la mesa}}: en el mejor de los casos, {{t:split-pot|os repartís el bote}}.
