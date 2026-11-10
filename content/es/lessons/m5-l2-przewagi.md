---
id: m5.l2
module: m5
order: 2
title: "A quién favorece el flop"
sub: "Ventaja de rango y ventaja de nuts"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "Has {{t:open|abierto}} desde el Button y la {{t:big-blind}} ha {{t:call|igualado}}. Flop: [[Ks 7d 2c]]. ¿Quién tiene la {{t:range-advantage|ventaja de rango}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Tú, que has {{t:open|abierto}} desde el Button", correct: true, why: "Sí: en tu {{t:range|rango}} están todas las KK, AK y KQ. La {{t:big-blind|ciega grande}} habría subido las más fuertes antes del flop, y su defensa amplia son, en su mayoría, manos que aquí han fallado." }
      - { text: "La {{t:big-blind|ciega grande}}", why: "No: la {{t:big-blind}} tiene más manos débiles porque ha defendido de forma amplia. Tiene rey con buen kicker con menos frecuencia que tú." }
      - { text: "Nadie, el flop es aleatorio", why: "El flop es aleatorio, pero los {{t:range|rangos}} no. El mismo flop encaja mejor con el {{t:range|rango}} que tiene más cartas altas." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "Has {{t:open|abierto}} desde el Button y la {{t:big-blind}} ha {{t:call|igualado}}. Flop: [[7s 6h 5d]]. ¿Quién tiene aquí con más frecuencia una mano muy fuerte ({{t:two-pair}} o {{t:straight}})?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "La {{t:big-blind|ciega grande}}", correct: true, why: "Sí: la {{t:big-blind}} defiende muchos {{t:connectors|conectores}} del mismo palo y manos con un seis o un siete. Tú, desde el Button, tienes más cartas altas que aquí han fallado. Es la {{t:nuts-advantage}} de la {{t:big-blind|ciega grande}}." }
      - { text: "Tú, que has {{t:open|abierto}} desde el Button", why: "No: tu {{t:range}} está lleno de cartas altas. Tienes más {{t:overpair|overpairs}} ({{t:pocket-pair|parejas de mano}} más altas que cualquier carta de la {{t:board|mesa}}, p. ej., TT, JJ), pero menos {{t:two-pair|dobles parejas}} y {{t:straight|escaleras}}; de sets (tríos con {{t:pocket-pair|pareja de mano}}) tenéis una cantidad parecida." }
      - { text: "Los dos con la misma frecuencia", why: "No: los {{t:range|rangos}} tienen una composición distinta. La defensa amplia de la {{t:big-blind|ciega grande}} tiene muchas cartas bajas, y tu {{t:range}}, altas." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "¿Por qué la {{t:big-blind}}, que solo ha {{t:call|igualado}} tu {{t:open}}, rara vez tiene AA o AK en un flop [[Ad 8s 3c]]?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Porque con esas manos lo más habitual es que {{t:raise|suba}} antes del flop (3-bet)", correct: true, why: "Sí: la {{t:big-blind}} juega sus manos más fuertes con 3-bet, así que, tras solo {{t:call|igualar}}, su {{t:range}} tiene pocas de las mejores manos. Tú las tienes todas en tu {{t:range|rango}}." }
      - { text: "Porque la {{t:big-blind}} nunca juega ases", why: "No: la {{t:big-blind}} defiende muchos ases, p. ej., A5 o A9. Le faltan sobre todo los más fuertes, con los que habría subido." }
      - { text: "Porque en el flop ya hay un as", why: "El as de la {{t:board|mesa}} reduce el número de {{t:combo|combos}} de ases en ambos {{t:range|rangos}}, pero no crea una diferencia entre ellos. La diferencia viene de las decisiones antes del flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Tienes la {{t:range-advantage|ventaja de rango}}, pero tu rival tiene tantas manos de las más fuertes como tú. ¿Con qué tamaño sueles apostar?"
    options:
      - { text: "Pequeño, y a menudo", correct: true, why: "Sí: la {{t:range-advantage}} indica que puedes apostar a menudo. Sin {{t:nuts-advantage|ventaja de nuts}}, una {{t:bet}} grande arriesga mucho contra las manos más fuertes del rival, y las manos más débiles se {{t:fold|retiran}} igualmente ante una pequeña." }
      - { text: "Grande, porque tienes ventaja", why: "No: el tamaño grande lo decide la {{t:nuts-advantage}}, es decir, tener más manos de las más fuertes. Aquí no la tienes." }
      - { text: "Siempre {{t:check|paso}}", why: "Demasiado prudente: la {{t:range-advantage}} es un motivo para apostar a menudo, solo que pequeño." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "En tu {{t:range|rango}} hay muchas más manos de las más fuertes que en el {{t:range|rango}} del rival. ¿Qué te aporta eso?"
    options:
      - { text: "Puedes apostar grande, porque rara vez te encontrarás con una mano mejor", correct: true, why: "Sí: es la {{t:nuts-advantage}}. Una {{t:bet}} grande saca más de las manos medias del rival, y una {{t:raise|subida}} de una mano mejor es poco frecuente." }
      - { text: "Siempre debes apostar pequeño", why: "No: eliges un tamaño pequeño cuando solo tienes la {{t:range-advantage|ventaja de rango}}. La {{t:nuts-advantage|ventaja de nuts}} te permite apostar más." }
      - { text: "Nada, solo cuenta tu mano", why: "Tu mano es importante, pero el rival solo ve tu {{t:range}}. El tamaño de la {{t:bet|apuesta}} se elige de forma que encaje con muchas manos a la vez." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Tu rival tiene dos cartas de distinto valor, p. ej., [[Jc Td]]. ¿En qué porcentaje de los casos el flop no emparejará ninguna de ellas? Escribe un número."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "De las {{n:cards.unseen.preflop}} cartas desconocidas, solo {{n:pair.outs.unpaired}} dan {{t:pair|pareja}}: las tres jotas y los tres dieces que quedan. El flop son {{n:cards.board.flop}} cartas, y la probabilidad de que ninguna sea una de esas {{n:pair.outs.unpaired}} es de aprox. {{n:flop.miss.unpaired}}. Por tanto, solo ligarás {{t:pair|pareja}} en aprox. el {{n:flop.hit.unpaired}} de los casos."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Una mano sin {{t:pair|pareja}} no liga {{t:pair|pareja}} en el flop en aprox. el {{n:flop.miss.unpaired}} de los casos. ¿Qué implica esto para el c-bet?"
    options:
      - { text: "El rival a menudo no tiene nada, así que incluso una {{t:bet}} pequeña a menudo gana el {{t:pot|bote}} al momento", correct: true, why: "Sí: es la base del c-bet. Fallar no siempre significa {{t:fold|retirarse}} (el rival puede tener un {{t:draw|proyecto}} o cartas altas), pero en su {{t:range|rango}} hay muchas manos débiles." }
      - { text: "El rival se {{t:fold|retirará}} exactamente en el {{n:flop.miss.unpaired}} de los casos", why: "No: un rival sin {{t:pair|pareja}} a veces {{t:call|iguala}} con un {{t:draw|proyecto}} o con una carta alta, y a veces tiene {{t:pair|pareja}} de mano. Es solo una aproximación de la frecuencia con la que el flop no le ha conectado." }
      - { text: "Tú también fallas con la misma frecuencia, así que el c-bet no tiene sentido", why: "No: tú también fallas a menudo, pero el rival no sabe cuándo. Tu {{t:range}} como {{t:aggressor|agresor}} (el jugador que {{t:raise|subió}} el último antes del flop) es más fuerte en muchos flops, y una {{t:bet}} gana el {{t:pot|bote}} cuando el rival se {{t:fold|retira}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "¿Y en qué porcentaje de los casos el flop emparejará al menos una de las dos cartas de una mano sin {{t:pair|pareja}}? Escribe un número."
    answer: flop.hit.unpaired
    explanation: "Es el complemento del número anterior: {{n:prob.certain}} menos {{n:flop.miss.unpaired}} da aprox. {{n:flop.hit.unpaired}}, es decir, más o menos uno de cada tres flops."
---
Antes del flop, los {{t:range|rangos}} de los jugadores son distintos. Quien {{t:open|abre}} desde el Button tiene muchas cartas altas. La {{t:big-blind|ciega grande}} defiende de forma muy amplia, pero normalmente {{t:raise|sube}} con las manos más fuertes (AA, KK, AK), así que, tras solo {{t:call|igualar}}, tiene pocas. El flop encaja mejor con uno de estos {{t:range|rangos}}, y eso decide quién puede apostar a menudo.

## {{t:range-advantage|Ventaja de rango}}

Tienes {{t:range-advantage|ventaja de rango}} cuando, en un flop concreto, tus manos son de media más fuertes que las del rival. En [[Ks 7d 2c]], tras una {{t:open|apertura}} desde el Button, eres tú quien tiene más reyes con buen kicker y más {{t:pair|parejas}} altas. La {{t:big-blind|ciega grande}} tiene aquí muchas manos que han fallado.

En un flop bajo y {{t:connected|conectado}}, p. ej., [[7s 6h 5d]], la {{t:range-advantage}} casi desaparece, y es la {{t:big-blind}} quien tiene más a menudo las manos más fuertes: defiende muchos {{t:connectors|conectores}} del mismo palo y manos con un seis o un siete, así que tiene más a menudo {{t:two-pair}} o {{t:straight|escalera}}.

## {{t:nuts-advantage|Ventaja de nuts}}

La {{t:nuts-advantage|ventaja de nuts}} consiste en tener más manos de las más fuertes (los «{{t:nuts|nuts}}») en tu {{t:range|rango}}. La {{t:range-advantage|ventaja de rango}} indica con qué frecuencia puedes apostar. La {{t:nuts-advantage|ventaja de nuts}} indica cuánto: cuando tienes muchas más manos de las más fuertes que el rival, puedes apostar con un tamaño mayor. Cuando solo tienes {{t:range-advantage|ventaja de rango}}, apuestas pequeño.

## El rival suele fallar

Una mano sin {{t:pair|pareja}}, p. ej., [[Jc Td]], no liga {{t:pair|pareja}} en el flop en aprox. el {{n:flop.miss.unpaired}} de los casos. De las {{n:cards.unseen.preflop}} cartas desconocidas, solo {{n:pair.outs.unpaired}} emparejan sus cartas. Las fuentes suelen dar aprox. {{n:flop.hit.one-pair}}: es la probabilidad de exactamente una {{t:pair|pareja}}; contando {{t:two-pair|dobles parejas}} y {{t:three-of-a-kind|tríos}}, la probabilidad de ligar es de aprox. {{n:flop.hit.unpaired}}. Por eso una {{t:bet}} en el flop a menudo gana el {{t:pot|bote}} al momento, incluso cuando tú no has ligado nada. Fallar no siempre significa {{t:fold|retirarse}}: el rival puede tener un {{t:draw|proyecto}} o dos cartas altas.

:::note De dónde salen estas reglas
Los conceptos de {{t:range-advantage|ventaja de rango}} y {{t:nuts-advantage|ventaja de nuts}} proceden de materiales de teoría de juegos basados en resultados de solvers (un glosario de conceptos y un artículo sobre tamaños de c-bet). Las cifras de esta lección son cálculos exactos de la aplicación.
:::
