---
id: m5.l1
module: m5
order: 1
title: "Textura del flop"
sub: "Altura, palos, conexión"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "¿Cuál de estos flops es {{t:connected}}, es decir, en cuál ya es posible una {{t:straight}}?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Sí: el nueve, el siete y el seis caben en cinco valores consecutivos. Forman {{t:straight|escalera}}, p. ej., 85 o T8." }
      - { text: "[[Ks 8d 3c]]", why: "No: del tres al rey hay demasiada distancia. Ninguna combinación de dos cartas forma aquí {{t:straight|escalera}}." }
      - { text: "[[Qd Qs 9h]]", why: "No: es un flop {{t:paired}}. Con dos cartas en la mano y una {{t:pair}} en la {{t:board}}, la {{t:straight}} es imposible, porque para una {{t:straight}} hacen falta cinco valores distintos." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "El flop es {{t:monotone}}: las tres cartas son del mismo palo. ¿Qué significa esto?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Un jugador con dos cartas de ese palo ya tiene {{t:flush}}", correct: true, why: "Sí: tres corazones en la {{t:board}} y dos en la mano son cinco cartas del mismo palo. Un jugador con un solo corazón tiene {{t:flush-draw}}." }
      - { text: "Nadie puede tener todavía {{t:flush}}", why: "No: para el {{t:flush}} hacen falta cinco cartas y tres ya están en la {{t:board}}. Bastan dos en la mano." }
      - { text: "El {{t:flush}} solo es posible a partir del turn", why: "No: eso ocurre en un flop {{t:two-tone}}. En uno {{t:monotone}}, el {{t:flush}} ya puede estar hecho." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Tienes [[Ac Kd]] y el flop es [[Ks 7d 2c]]. ¿Por qué en un flop así una {{t:pair}} con buen kicker es más segura que en un flop {{t:wet}}?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Porque el rival no tiene ningún {{t:draw}}, así que las siguientes cartas rara vez cambian quién va por delante", correct: true, why: "Sí: el flop es {{t:rainbow}} y no es posible una {{t:straight}}. Un rival que ahora va por detrás suele tener pocos outs: unas cuantas cartas para {{t:three-of-a-kind}} o {{t:two-pair}}, y sin {{t:pair}} necesita dos buenas cartas seguidas." }
      - { text: "Porque en un flop {{t:dry}} el rival siempre {{t:fold|se retira}}", why: "No: un rival con un siete, un dos o un rey peor puede {{t:call|igualar}}. Un flop {{t:dry}} te habla de los {{t:draw|proyectos}}, no de si el rival {{t:fold|se retirará}}." }
      - { text: "Porque una {{t:pair}} de reyes siempre gana hasta el river", why: "No: el rival puede tener ya un set o {{t:two-pair}}. Un flop {{t:dry}} solo reduce el riesgo de que alguien te alcance." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Después del flop, cada jugador ya ve cinco de sus siete cartas. Cómo encajan las tres cartas de la {{t:board}} con las manos de los jugadores es lo que llamamos {{t:texture}} del flop. De la {{t:texture}} depende quién conecta más a menudo y si merece la pena apostar. Antes de aprender el c-bet (una {{t:bet}} en el flop tras una {{t:raise}} antes del flop), aprende a leer el flop en cuatro ejes.

## Altura

Nos fijamos en la carta más alta. Un flop **alto** tiene como carta más alta un as, un rey o una dama, p. ej., [[Ks 7d 2c]]. Un flop **medio** tiene como carta más alta una jota o un diez, p. ej., [[Jh 8c 4d]]. Un flop **bajo** tiene como carta más alta un nueve o menos, p. ej., [[7s 6h 5d]].

## Palos

Un flop **{{t:rainbow}}** tiene tres palos distintos: nadie tiene todavía {{t:flush-draw}}. Un flop **{{t:two-tone}}** tiene dos cartas del mismo palo, p. ej., [[Jh Th 8c]]: dos cartas del jugador de ese palo dan {{t:flush-draw}}. Un flop **{{t:monotone}}** tiene las tres cartas del mismo palo, p. ej., [[Kh 8h 3h]]: el {{t:flush}} puede estar ya hecho.

## Valores

Un flop **{{t:paired}}** tiene dos cartas del mismo valor, p. ej., [[Qd Qs 6h]]. En él nadie tiene {{t:straight}} con dos cartas en la mano, aunque a veces es posible un {{t:straight-draw}} (p. ej., en Q-Q-9).

Un flop **{{t:connected}}** tiene tres valores distintos dentro de cinco consecutivos, así que ya es posible una {{t:straight}}: en [[9h 7d 6c]] forman {{t:straight|escalera}}, p. ej., 85 y T8. El as también cuenta como uno, así que [[Ah 5d 3c]] también es {{t:connected}}.

Un flop **{{t:semi-connected}}** solo tiene dos de sus cartas dentro de cinco valores consecutivos. Nadie tiene todavía {{t:straight}}, pero alguien puede tener un {{t:straight-draw}} (abierto o gutshot): en [[Kh Qd 4c]] lo tiene, p. ej., JT. Estos flops son frecuentes, porque bastan dos cartas cercanas.

Un flop **{{t:disconnected}}** tiene cartas tan separadas que no hay dos que quepan en cinco valores consecutivos, p. ej., [[Ks 8d 3c]]. Aquí nadie tiene ni siquiera un {{t:straight-draw}}. Estos flops son poco frecuentes.

## {{t:dry|Seco}} o {{t:wet}}

Contamos puntos de {{t:wetness}}, es decir, cuánto favorece el flop los {{t:draw|proyectos}} y las manos fuertes de color y de {{t:straight|escalera}}:

- {{t:straight}} ya posible de varias formas, es decir, con al menos dos combinaciones distintas de dos valores en la mano (en [[9h 8d 7c]] la forman JT, T6 y 65): {{n:tex.points.straight.made}} pts,
- {{t:straight}} posible de una sola forma (en [[Ah Kd Tc]] solo la forma QJ; en [[Ah 4d 2c]], solo 53): {{n:tex.points.straight.made-one}} pts,
- solo {{t:straight-draw}} (flop {{t:semi-connected}} o {{t:paired}} con dos cartas cercanas): {{n:tex.points.straight.draw}} pts,
- dos cartas del mismo palo: {{n:tex.points.suits.two-tone}} pts; tres cartas del mismo palo: {{n:tex.points.suits.monotone}} pts.

Un flop **{{t:dry}}** tiene menos de {{n:tex.threshold.medium}} pts; uno **{{t:wet}}**, al menos {{n:tex.threshold.wet}} pts, y uno **intermedio** está entre ambos.

| Flop | Palos | {{t:straight|Escalera}} | Total | {{t:texture|Textura}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | intermedio |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | intermedio |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet}} |

Una {{t:straight}} ya hecha pesa más que un simple {{t:draw}}, porque cambia el equilibrio de fuerzas ya. Una {{t:straight}} posible de varias formas pesa más que una {{t:straight}} posible de una sola: en [[9h 8d 7c]] muchas manos tienen {{t:straight}} u {{t:oesd}}, mientras que en [[Ah Kd Tc]] solo QJ forma {{t:straight}} y nadie tiene un {{t:draw}} abierto. Por eso A-K-T de tres palos es intermedio, aunque sea {{t:connected}}.

El flop {{t:two-tone}} [[Kh 7h 2c]] es {{t:dry}} y tiene un solo {{t:flush-draw}}: no hay {{t:straight}} ni {{t:straight-draw}}. Un flop {{t:monotone}} es siempre {{t:wet}}: en [[Kh 8h 3h]] hay más manos con {{t:flush}} o {{t:flush-draw}} que manos con {{t:straight}} u {{t:oesd}} en [[9h 8d 7c]].

En un flop {{t:dry}}, quien va por delante suele seguir por delante hasta el river. En uno {{t:wet}}, las siguientes cartas cambian a menudo el equilibrio de fuerzas, así que la mejor mano en el flop es menos segura.

:::note De dónde salen estas definiciones
Los conceptos {{t:dry}} y {{t:wet}} vienen de la literatura de póker: los materiales de formación dan como {{t:dry|secos}}, p. ej., K-7-2, A-9-4 y A-A-6 de tres palos, y como {{t:wet|húmedos}}, 9-8-7, Q-J-T y T-9-5-4. Los puntos y los límites exactos, como que un flop medio empieza en el diez, son una convención adoptada en la aplicación para que cualquier flop pueda evaluarse de forma inequívoca. Las fuentes no dan umbrales de puntos ni resuelven cómo llamar a los flops que no son ni {{t:dry|secos}} ni {{t:wet|húmedos}}. Según esta convención, son {{t:dry|secos}} alrededor del {{n:tex.share.dry}} de todos los flops; intermedios, alrededor del {{n:tex.share.medium}}, y {{t:wet|húmedos}}, alrededor del {{n:tex.share.wet}}; es un resultado de las definiciones de la aplicación, no una cifra de la literatura.
:::
