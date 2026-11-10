# Pakiet kontroli (a), es: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] lessons/m12-l2-decyzja-wynik.md:68
NOWE:       - { text: "Sí, el resultado muestra lo que funciona", why: "El resultado de unas pocas {{t:session|sesiones}} es sobre todo ruido. Con una {{t:standard-deviation|desviación estándar}} de alrededor de {{n:var.sd}}, incluso {{n:var.hands.k}} mil manos dejan un error de alrededor de ± {{n:var.ci.wr}}." }
STARE:       - { text: "Sí, el resultado muestra lo que funciona", why: "El resultado de unas pocas {{t:session|sesiones}} es sobre todo ruido. Con una {{t:standard-deviation|desviación típica}} de alrededor de {{n:var.sd}}, incluso {{n:var.hands.k}} mil manos dejan un error de alrededor de ± {{n:var.ci.wr}}." }

## [2] lessons/m12-l2-decyzja-wynik.md:77
NOWE:       - { text: "Tras unas {{n:skill.hands}} manos, todo buen jugador va ganando", why: "El estudio compara grupos extremos de jugadores; no dice cuándo un buen jugador concreto irá ganando. Eso depende del winrate y de la {{t:standard-deviation|desviación estándar}} (lección sobre la {{t:variance|varianza}})." }
STARE:       - { text: "Tras unas {{n:skill.hands}} manos, todo buen jugador va ganando", why: "El estudio compara grupos extremos de jugadores; no dice cuándo un buen jugador concreto irá ganando. Eso depende del winrate y de la {{t:standard-deviation|desviación típica}} (lección sobre la {{t:variance|varianza}})." }

## [3] lessons/m12-l3-tilt.md:33
NOWE:       - { text: "Tilt por desesperación", correct: true, why: "La necesidad de recuperar lo perdido lleva a {{t:session|sesiones}} muy largas, a forzar la acción y a saltos a {{t:stakes|límites}} más altos. Es la señal para dejar de jugar." }
STARE:       - { text: "Tilt por desesperación", correct: true, why: "La necesidad de recuperar lo perdido lleva a {{t:session|sesiones}} muy largas, a forzar la acción y a saltos de {{t:stakes|límite}}. Es la señal para dejar de jugar." }

## [4] lessons/m12-l3-tilt.md:100
NOWE: El tilt es la pérdida de control bajo el efecto de emociones negativas, normalmente después de bad beats o de una larga racha de pérdidas. Acaba en malas decisiones y en pérdidas mucho mayores de lo habitual. No es algo raro: en un estudio por encuesta, el {{n:tilt.severe}} de los jugadores admitió haber sufrido un tilt fuerte al menos una vez en los últimos seis meses.
STARE: El tilt es la pérdida de control bajo el efecto de emociones negativas, normalmente después de bad beats o de una larga racha de pérdidas. Acaba en malas decisiones y en pérdidas mucho mayores de lo habitual. No es algo raro: en un estudio por encuesta, {{n:tilt.severe}} de los jugadores admitió haber sufrido un tilt fuerte al menos una vez en los últimos seis meses.

## [5] lessons/m12-l4-bankroll.md:58
NOWE:       - { text: "Te quedas en el {{t:stakes|límite}} y revisas tus decisiones en las manos perdidas", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}} siguen siendo más que el umbral de bajada más tardío, {{n:br.bi.move-down}}. En una simulación, un {{t:downswing}} así le ocurre a aprox. el {{n:dd.p.small.100k}} de los jugadores que ganan {{n:var.wr.ex}} en {{n:var.hands.k}} mil manos, y revisar las manos permite comprobar si no se debe a errores." }
STARE:       - { text: "Te quedas en el {{t:stakes|límite}} y revisas tus decisiones en las manos perdidas", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}} siguen siendo más que el umbral de bajada más tardío, {{n:br.bi.move-down}}. En una simulación, un {{t:downswing}} así le ocurre a aprox. {{n:dd.p.small.100k}} de los jugadores que ganan {{n:var.wr.ex}} en {{n:var.hands.k}} mil manos, y revisar las manos permite comprobar si no se debe a errores." }

## [6] lessons/m12-l4-bankroll.md:77
NOWE:       - { text: "Lo protege de la ruina", why: "La fórmula del riesgo solo funciona con un winrate positivo. Un jugador perdedor perderá el bankroll con total seguridad, solo que más despacio cuanto mayor sea el bankroll." }
STARE:       - { text: "Lo protege de la bancarrota", why: "La fórmula del riesgo solo funciona con un winrate positivo. Un jugador perdedor perderá el bankroll con total seguridad, solo que más despacio cuanto mayor sea el bankroll." }

## [7] lessons/m12-l4-bankroll.md:85
NOWE:       - { text: "Aprox. {{n:study.beginner}} de estudio", correct: true, why: "Al principio es cuando más te queda por aprender, así que predomina el estudio." }
STARE:       - { text: "Aprox. {{n:study.beginner}} de estudio", correct: true, why: "Al principio es cuando más tienes que recuperar, así que predomina el estudio." }

## [8] lessons/m12-l4-bankroll.md:95
NOWE:       - { text: "Solo jugar, ya que ganas", why: "Aunque ganes, no dedicas al estudio menos del {{n:study.min}} del tiempo." }
STARE:       - { text: "Solo jugar, ya que ganas", why: "Aunque ganes, no bajas de {{n:study.min}} del tiempo dedicado al estudio." }

## [9] lessons/m12-l4-bankroll.md:113
NOWE: El bankroll es toda la reserva destinada exclusivamente a jugar al póker. En esta lección lo cuentas en **{{t:buy-in|buy-ins}}**, no en dinero: un {{t:buy-in}} es un stack completo de {{n:format.stack}} en el {{t:stakes|límite}} en el que juegas.
STARE: El bankroll es toda la reserva destinada exclusivamente a jugar al póquer. En esta lección lo cuentas en **{{t:buy-in|buy-ins}}**, no en dinero: un {{t:buy-in}} es un stack completo de {{n:format.stack}} en el {{t:stakes|límite}} en el que juegas.

## [10] lessons/m12-l4-bankroll.md:141
NOWE: Al principio dedicas aprox. el {{n:study.beginner}} del tiempo al estudio y el resto, a jugar. Cuando ganas en tu {{t:stakes|límite}}, lo ideal es aprox. {{n:study.winner}}, pero nunca menos de {{n:study.min}} de estudio.
STARE: Al principio dedicas aprox. {{n:study.beginner}} del tiempo al estudio y el resto, a jugar. Cuando ganas en tu {{t:stakes|límite}}, lo ideal es aprox. {{n:study.winner}}, pero nunca menos de {{n:study.min}} de estudio.

## [11] rules.yaml R-M12-007
NOWE:
```
- id: R-M12-007
  module: m12
  if: "tras una serie de pérdidas ya no eres capaz de valorar las decisiones con calma (p. ej. solo piensas en recuperar lo perdido o juegas manos con las que normalmente te {{t:fold|retiras}})"
  then: "terminas la {{t:session|sesión}}"
  because: "seguir jugando en ese estado es jugar a tu peor nivel (C-game), y el objetivo es parar a tiempo, antes de perder la capacidad de pensar con claridad"
  level: heuristic
  source: "Tendler y Carter, The Mental Game of Poker (2011), fragmento «Inchworm» (fragmento publicado en línea): «quit sooner when it's no longer possible to recover a solid thought process»"
  sources: [{ kind: book }]
```
STARE:
```
- id: R-M12-007
  module: m12
  if: "tras una serie de pérdidas ya no eres capaz de valorar las decisiones con calma (p. ej. solo piensas en recuperarte o juegas manos con las que normalmente te {{t:fold|retiras}})"
  then: "terminas la {{t:session|sesión}}"
  because: "seguir jugando en ese estado es jugar a tu peor nivel (C-game), y el objetivo es parar a tiempo, antes de perder la capacidad de pensar con claridad"
  level: heuristic
  source: "Tendler y Carter, The Mental Game of Poker (2011), fragmento «Inchworm» (fragmento publicado en línea): «quit sooner when it's no longer possible to recover a solid thought process»"
  sources: [{ kind: book }]
```
