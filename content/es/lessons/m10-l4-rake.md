---
id: m10.l4
module: m10
order: 4
title: "Rake"
sub: "Cuánto cuesta jugar y qué cambia en tus decisiones"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Juegas NL10 6-max en una de las grandes salas online. ¿Qué tamaño tiene el {{t:rake}} en comparación con el winrate de un jugador ganador típico en {{t:stakes|límites}} bajos?"
    options:
      - { text: "Varias veces mayor: aprox. {{n:rake.micro.low}}–{{n:rake.micro.high}} frente a {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Al convertir las tablas de rake de las salas a bb/100, en microlímites sale aprox. {{n:rake.micro.low}}–{{n:rake.micro.high}}. Un jugador ganador tiene que superar a sus rivales por más de lo que supone el {{t:rake}}, y solo el excedente es su winrate." }
      - { text: "Más o menos igual", why: "El {{t:rake}} en microlímites es de aprox. {{n:rake.micro.low}}–{{n:rake.micro.high}}, y el winrate típico, de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. La diferencia es de varias veces." }
      - { text: "Insignificante, porque la sala solo se queda con un pequeño porcentaje del {{t:pot|bote}}", why: "Un pequeño porcentaje de cada {{t:pot|bote}} tras el flop suma aprox. {{n:rake.micro.low}}–{{n:rake.micro.high}}. Es más de lo que gana un jugador ganador típico." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "En un informe sobre la población de cash 6-max, cada jugador de NL100 pierde de media {{n:rake.pop.nl100.loss}}. ¿De dónde sale esa pérdida?"
    options:
      - { text: "Es el {{t:rake}}: sin él, los jugadores en conjunto quedarían a cero", correct: true, why: "Los jugadores juegan unos contra otros, así que lo que gana uno lo pierde otro. De media, todos pierden solo lo que se lleva la sala. El autor: «your biggest villain is the house»." }
      - { text: "De que la mayoría de los jugadores juega mal", why: "El mal juego traslada dinero de los jugadores más débiles a los mejores, pero no cambia la media. Solo el {{t:rake}} hace bajar la media." }
      - { text: "De la {{t:variance|varianza}}: con una muestra mayor saldrá cero", why: "La {{t:variance|varianza}}, es decir, la dispersión de los resultados en torno al {{t:expected-value|valor esperado}}, afecta a los resultados de cada jugador en ambas direcciones. La media de toda la población es negativa porque todos pagan {{t:rake}}." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Según una estimación del autor de esos mismos datos (con corrección bayesiana), entre los jugadores con al menos {{n:rake.pop.reg.hands}} manos, aprox. el {{n:rake.pop.reg.prerake}} gana antes de descontar el {{t:rake}}. ¿Cuántos ganan después de descontarlo?"
    options:
      - { text: "Aprox. el {{n:rake.pop.reg.postrake}}", correct: true, why: "El {{t:rake}} se lleva casi a la mitad de los ganadores: aprox. el {{n:rake.pop.reg.prerake}} antes del rake y aprox. el {{n:rake.pop.reg.postrake}} después. Por eso el winrate lo calculas siempre después del rake." }
      - { text: "Casi los mismos, aprox. el {{n:rake.pop.reg.prerake}}", why: "Si el {{t:rake}} fuera pequeño, así sería. Con un rake de varias bb/100, muchos jugadores que ganan antes de él bajan de cero." }
      - { text: "Casi nadie", why: "Exageración: aprox. el {{n:rake.pop.reg.postrake}} de este grupo sigue ganando. El {{t:rake}} es un gran obstáculo, pero no cierra el camino a ganar." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "¿Por qué en NL500 el {{t:rake}} en bb/100 es varias veces menor ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) que en microlímites?"
    options:
      - { text: "Porque los {{t:pot|botes}} grandes llegan más a menudo al {{t:rake-cap|tope de rake}}, que allí es pequeño en bb", correct: true, why: "La sala se queda con un porcentaje del {{t:pot|bote}}, pero no más que un tope en dólares. En microlímites, el tope equivale a muchas bb y los {{t:pot|botes}} rara vez llegan a él, así que pagas el porcentaje completo. En NL500, ese mismo tope es una fracción de bb." }
      - { text: "Porque en NL500 la sala se queda con un porcentaje menor", why: "El porcentaje suele ser parecido (aprox. {{n:rake.ex.pct}}). La diferencia la marca el {{t:rake-cap|tope de rake}}, que en {{t:stakes|límites}} altos recorta la comisión de los {{t:pot|botes}} grandes." }
      - { text: "Porque en NL500 se juegan menos manos por hora", why: "bb/100 mide el {{t:rake}} por cada 100 manos, así que el ritmo de juego no lo cambia. Lo cambia el {{t:rake-cap|tope de rake}} expresado en bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "En el {{t:pot|bote}} hay {{n:ex.pot}} y el rival {{t:bet|apuesta}} {{n:ex.bet.half}}. La sala cobra el {{n:rake.ex.pct}} del {{t:pot|bote}}, sin ningún {{t:rake-cap|tope}} al alcance. ¿Cuánta equity necesitas para {{t:call|igualar}}? Escribe el porcentaje."
    answer: eq.bet-half.rake
    explanation: "Después de {{t:call|igualar}}, en el {{t:pot|bote}} hay {{n:ex.half.total}}, y tras el rake quedan {{n:rake.ex.pot-after}}. Pagas {{n:ex.bet.half}}, así que necesitas {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} en lugar de {{n:eq.bet-half}} sin rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Sin {{t:rake}}, un {{t:call|pago}} contra una apuesta de medio {{t:pot|bote}} necesita {{n:eq.bet-half}} de equity. ¿Cuánta necesita con un {{t:rake}} del {{n:rake.ex.pct}}?"
    options:
      - { text: "Algo más: aprox. {{n:eq.bet-half.rake}}", correct: true, why: "Ganas el {{t:pot|bote}} menos el {{t:rake}}, pero pagas la cantidad completa. Una mano justo por encima del umbral sin rake puede quedar ya por debajo con rake." }
      - { text: "Lo mismo, porque el {{t:rake}} lo pagan ambos jugadores", why: "El {{t:rake}} se resta del {{t:pot|bote}} que ganas, no de lo que pagas. El umbral sube hasta aprox. {{n:eq.bet-half.rake}}." }
      - { text: "Menos, porque el {{t:pot|bote}} es mayor", why: "El {{t:pot|bote}} tras el rake es menor, no mayor, así que necesitas más equity: aprox. {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Juegas en una sala que cobra {{t:rake}} solo de los {{t:pot|botes}} que llegan al flop. Alguien antes que tú {{t:open|abre}} y tú estás en {{t:position|posición}} con una mano que sin rake sería un {{t:call|pago}} marginal. ¿Qué cambia el {{t:rake}}?"
    options:
      - { text: "{{t:call|Igualo}} menos: con las manos marginales para {{t:call|igualar}}, me {{t:fold|retiro}} o hago 3-bet más a menudo", correct: true, why: "En las soluciones de solver publicadas con rake, los jugadores en {{t:position|posición}} ante una {{t:open|apertura}} juegan aprox. {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} menos manos. Lo que pierde es el propio {{t:call|pago}}, porque el {{t:pot|bote}} tras el flop paga {{t:rake}}, y el {{t:pot|bote}} ganado con un 3-bet antes del flop no." }
      - { text: "Nada: el {{t:rake}} solo afecta al juego tras el flop", why: "Precisamente por eso cambia la decisión antes del flop: el {{t:call|pago}} lleva al flop y al rake, mientras que un 3-bet o una {{t:fold|retirada}} a menudo terminan la mano sin él." }
      - { text: "{{t:call|Igualo}} más a menudo, porque los {{t:pot|botes}} tras el flop son grandes", why: "Al revés: el {{t:rake}} se lleva parte precisamente de esos {{t:pot|botes}}. El solver con rake {{t:call|iguala}} claramente menos." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "En esas mismas soluciones de solver, la {{t:big-blind|ciega grande}} {{t:call|iguala}} un min-raise en una partida con rake solo en aprox. el {{n:rake.solver.bb-minraise}} de los casos en los que lo {{t:call|iguala}} sin rake. ¿Qué significa esto para ti en la {{t:big-blind|ciega grande}}?"
    options:
      - { text: "Sigo defendiendo muchas manos, pero de forma más ajustada que en las tablas calculadas sin rake", correct: true, why: "La {{t:big-blind|ciega grande}} sigue defendiendo a menudo, porque ya tiene {{t:chips|fichas}} en el {{t:pot|bote}} y cierra la acción. Pero el {{t:rake}} elimina los {{t:call|pagos}} más débiles, así que las tablas sin rake son demasiado amplias para ti." }
      - { text: "Dejo de defender la {{t:big-blind|ciega grande}} {{t:call|igualando}}", why: "No: según el autor, {{t:call|igualar}} desde las ciegas sigue siendo una parte importante de la estrategia también con rake. Cambia la amplitud de la defensa, no su existencia." }
      - { text: "Defiendo igual de amplio, porque desde la {{t:big-blind|ciega grande}} el {{t:rake}} no cuenta", why: "Sí cuenta: tras un {{t:call|pago}}, el {{t:pot|bote}} llega al flop y paga {{t:rake}}. Por eso el solver {{t:call|iguala}} menos desde la {{t:big-blind|ciega grande}}." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "En algunas salas, el {{t:rake}} también se cobra de los {{t:pot|botes}} con 3-bet que terminan antes del flop. ¿Qué cambia esto en el argumento «el 3-bet no paga rake»?"
    options:
      - { text: "En una sala así, el argumento se debilita: el 3-bet también paga, así que la ventaja del 3-bet sobre el {{t:call|pago}} es menor", correct: true, why: "El resultado del solver se refiere a la estructura «no flop, no drop», en la que el {{t:pot|bote}} sin flop está libre de rake. En una sala así, esa regla cubre solo los {{t:pot|botes}} sin 3-bet, así que el {{t:call|pago}} sigue perdiendo por el rake, pero el 3-bet no está libre de él." }
      - { text: "Nada, porque el {{t:rake}} de un 3-bet es insignificante", why: "No lo sabemos sin hacer el cálculo para una sala concreta. Lo único seguro es que el 3-bet deja de estar libre de rake." }
      - { text: "En una sala así hay que {{t:call|igualar}} siempre en lugar de hacer 3-bet", why: "El {{t:call|pago}} lleva al flop y paga {{t:rake}} igual que antes. Lo único que cambia es que el 3-bet también paga." }
---
El {{t:rake}} es la comisión que la sala cobra del {{t:pot|bote}}. Los jugadores juegan unos contra otros, así que, sin {{t:rake}}, en conjunto quedarían a cero. Con rake, el jugador medio pierde exactamente lo que se lleva la sala, y el ganador tiene que superar a sus rivales por más de lo que supone el {{t:rake}}.

## Cuánto cuesta

La sala se queda con un porcentaje del {{t:pot|bote}}, pero no más que el {{t:rake-cap|tope de rake}} en dólares. En las dos mayores salas online, en NL2–NL10 es el {{n:rake.ex.pct}} del {{t:pot|bote}}. En microlímites, los {{t:pot|botes}} rara vez llegan al tope, así que pagas el porcentaje completo.

Una comparativa de las tablas de rake de las salas las convierte a bb/100 a partir de la distribución de {{t:pot|botes}} de varios millones de manos:

| {{t:stakes|Límite}} (6-max, las dos mayores salas online) | {{t:rake}} |
|---|---|
| NL2–NL25 | aprox. {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | aprox. {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Un jugador ganador típico en {{t:stakes|límites}} bajos tiene un winrate de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (módulo 12): varias veces menos de lo que paga a la sala. En {{t:stakes|límites}} más altos, el mismo tope en dólares es una fracción de bb, así que el {{t:rake}} en bb/100 baja.

Los datos de población dicen lo mismo. En el informe de población (cash 6-max, NL10–NL500), cada jugador pierde de media {{n:rake.pop.nl10.loss}} en NL10, {{n:rake.pop.nl100.loss}} en NL100 y {{n:rake.pop.nl500.loss}} en NL500. Entre los jugadores de NL100 con al menos {{n:rake.pop.reg.hands}} manos, según la estimación del autor (corrección bayesiana), aprox. el {{n:rake.pop.reg.prerake}} gana antes de descontar el rake y, después de descontarlo, aprox. el {{n:rake.pop.reg.postrake}} (en los datos brutos, {{n:rake.pop.reg.prerake.raw}} y {{n:rake.pop.reg.postrake.raw}}).

## Umbral de {{t:call|pago}} con rake

Ganas el {{t:pot|bote}} menos el {{t:rake}}, pero pagas la cantidad completa. La equity necesaria del módulo 2 sube:

```formula
equity necesaria = cantidad a pagar ÷ ({{t:pot|bote}} tras el {{t:call|pago}} × (1 − {{t:rake}}))
```

Apuesta de {{n:ex.bet.half}} a un {{t:pot|bote}} de {{n:ex.pot}}: sin rake necesitas {{n:eq.bet-half}}; con un rake del {{n:rake.ex.pct}}, {{n:eq.bet-half.rake}}. La diferencia es pequeña en una sola mano, pero afecta a cada {{t:pot|bote}} tras el flop.

## Qué cambia el {{t:rake}} antes del flop

En muchas salas, el {{t:rake}} se cobra solo de los {{t:pot|botes}} que llegan al flop («no flop, no drop»). En ese caso, el {{t:pot|bote}} ganado antes del flop está libre de él, mientras que el {{t:pot|bote}} tras un {{t:call|pago}} paga. En las soluciones de solver publicadas con rake de NL100:

- los jugadores en {{t:position|posición}} ante una {{t:open|apertura}} juegan aprox. {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} menos manos; pierde sobre todo el {{t:call|pago}}, y hay algo más de 3-bets;
- la {{t:big-blind|ciega grande}} {{t:call|iguala}} un min-raise solo en aprox. el {{n:rake.solver.bb-minraise}} de los casos en que lo hace sin rake, aunque la defensa desde las ciegas sigue basándose en {{t:call|igualar}}.

Por el mismo motivo, en el módulo 3, desde la {{t:small-blind|ciega pequeña}} {{t:raise|subes}} o te {{t:fold|retiras}}, sin completar hasta la {{t:big-blind|ciega grande}}. Algunas salas cobran {{t:rake}} también de los {{t:pot|botes}} con 3-bet que terminan antes del flop; allí, el 3-bet no está libre de él.

:::note Fuentes
Nivel del rake: comparativa del rake de las salas online de 2026 (tablas de las dos mayores salas convertidas a bb/100, consultada el 5 de octubre de 2026); otras salas tienen cifras distintas. Pérdida de la población: informe independiente sobre la población (cash 6-max NLHE, salas con bases de datos de seguimiento de manos, jugadores con al menos 100 manos; el autor no indica las salas ni el periodo). Efecto del rake en el juego antes del flop: artículo publicado sobre los tamaños de subida antes del flop, soluciones de solver para stacks de {{n:rake.solver.depth}}; el autor escribe que las conclusiones se trasladan en gran medida a otros formatos, así que para un stack de {{n:format.stack}} es una simplificación. El umbral de equity es un cálculo.
:::
