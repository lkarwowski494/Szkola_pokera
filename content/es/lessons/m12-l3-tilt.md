---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Reconócelo antes de que tome tus decisiones"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Por tercera vez en una hora, un rival liga en el river la carta que lo salva. Sientes que el juego es injusto y que alguien la ha tomado contigo. ¿Qué tipo de tilt es, según la clasificación de esta lección?"
    options:
      - { text: "Tilt por injusticia", correct: true, why: "Los bad beats, los coolers y las cartas que liga el rival en el river dan la sensación de que el póker es injusto. Es el detonante típico del tilt por injusticia." }
      - { text: "Tilt por error", why: "El tilt por error tiene que ver con tus propios fallos. Aquí te enfada la suerte, no tu decisión." }
      - { text: "Tilt por desesperación", why: "La desesperación es una fuerte necesidad de recuperar lo perdido ({{t:session|sesiones}} largas, {{t:stakes|límites}} más altos). Aquí, de momento, se trata de sentirte perjudicado." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "El mismo rival sube contra tus ciegas por cuarta vez seguida. Decides que la próxima vez le {{t:raise|subirás}} con cualquier mano para darle una lección. ¿Qué tipo de tilt es?"
    options:
      - { text: "Tilt por venganza", correct: true, why: "La falta de respeto, la agresión constante del rival y las ganas de «darle una lección» son detonantes del tilt por venganza. La decisión empieza a tomarla el deseo de revancha, no el cálculo." }
      - { text: "Tilt por sentir que te lo mereces", why: "Este tipo nace de la convicción de que mereces ganar porque eres mejor. Aquí se trata de una revancha contra un rival concreto." }
      - { text: "No es tilt, sino adaptarse a un rival agresivo", why: "Adaptarse significa defender más amplio con manos bien pensadas. «Con cualquier mano para darle una lección» es emoción, no estrategia." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Vas perdiendo y piensas: «Una hora más, y si no sale, subo a un {{t:stakes|límite}} más alto y lo recupero todo de golpe». ¿Qué tipo de tilt es?"
    options:
      - { text: "Tilt por desesperación", correct: true, why: "La necesidad de recuperar lo perdido lleva a {{t:session|sesiones}} muy largas, a forzar la acción y a saltos de {{t:stakes|límite}}. Es la señal para dejar de jugar." }
      - { text: "Tilt por odio a perder", why: "Se acerca, pero aquí se suma el plan de recuperar las pérdidas con un {{t:stakes|límite}} más alto y jugando más tiempo. Esos son rasgos de la desesperación." }
      - { text: "Un plan sensato, porque un {{t:stakes|límite}} más alto recuperará antes las pérdidas", why: "Un {{t:stakes|límite}} más alto también aumenta las oscilaciones, y tomas decisiones en mal estado. Subir después de perder es justo lo contrario de una gestión prudente del {{t:bankroll}} (lección sobre bankroll y riesgo)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "{{t:fold|Te has retirado}} con la mejor mano y desde entonces no puedes dejar de pensar en ello. Te enfadas contigo mismo y juegas cada vez peor. ¿Qué tipo de tilt es?"
    options:
      - { text: "Tilt por error", correct: true, why: "El enfado por tus propios fallos es tilt por error. Su origen suele ser la expectativa poco realista de no cometer errores mientras aprendes." }
      - { text: "Tilt por injusticia", why: "Aquí no culpas a la suerte, sino a ti mismo. Es tilt por error." }
      - { text: "Tilt por venganza", why: "La venganza se dirige contra un rival. Aquí el enfado tiene que ver con tu decisión." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Pierdes contra un jugador que, en tu opinión, juega fatal, y piensas: «Yo estudio y él no, debería ganarle». ¿Qué tipo de tilt es?"
    options:
      - { text: "Tilt por sentir que te lo mereces", correct: true, why: "Creer que mereces ganar por algún motivo hace que sientas la victoria como algo tuyo. Cuando un rival que «no se lo merece» te la quita, aparece el tilt." }
      - { text: "Tilt por odio a perder", why: "Este tipo tiene que ver con perder en general. Aquí la clave es la convicción de que la victoria te corresponde." }
      - { text: "Tilt por error", why: "No se trata de un fallo tuyo, sino de la sensación de que mereces ganar." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Después de un bad beat notas que te crece el enfado, pero sigues jugando bien. ¿Qué haces?"
    options:
      - { text: "Reaccionas ya: respiras y usas una frase preparada, p. ej. «Esto es {{t:variance|varianza}}, sigue jugando bien»", correct: true, why: "El tilt se corrige mientras es pequeño y todavía puedes pensar. Cuando crece, anula tu capacidad de pensar y el control se vuelve imposible." }
      - { text: "Sigues jugando hasta notar tu primer error", why: "Para entonces el tilt ya es mayor y cuesta más frenarlo. Lo más fácil es reaccionar a las primeras señales." }
      - { text: "Reprimes el enfado y haces como si no existiera", why: "Es mejor reconocer la emoción y responder a su causa con un pensamiento concreto. Reprimirla sin más no elimina la causa." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Llevas media hora jugando manos con las que normalmente {{t:fold|te retiras}} y solo piensas en recuperar lo perdido. ¿Qué haces?"
    options:
      - { text: "Terminas la {{t:session|sesión}}", correct: true, why: "Son señales de que ya no eres capaz de recuperar la claridad mental. En ese momento el objetivo es parar cuanto antes, no recuperar el dinero." }
      - { text: "Sigues jugando, pero solo las mejores manos", why: "En este estado cuesta cumplir lo que te propones, porque la emoción decide por ti. Es más seguro parar." }
      - { text: "Subes de {{t:stakes|límite}} para recuperarlo antes", why: "Es tilt por desesperación en estado puro. Un {{t:stakes|límite}} más alto con peores decisiones acelera las pérdidas." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Quieres detectar el tilt antes. ¿Por dónde empiezas?"
    options:
      - { text: "Por escribir un perfil: qué te lo provoca, qué piensas y sientes, cómo cambia tu juego", correct: true, why: "Cada jugador entra en tilt de forma algo distinta y por motivos distintos. El perfil te permite reconocer las señales antes de que el tilt crezca: no se puede controlar lo que no se entiende." }
      - { text: "Por jugar en {{t:stakes|límites}} más altos para endurecerte", why: "Más presión no te enseña a reconocer el tilt. Primero tienes que saber cómo se manifiesta en ti." }
      - { text: "Por evitar a todos los rivales que te ponen nervioso", why: "Los detonantes no se pueden evitar, porque siempre habrá bad beats y rivales agresivos. El objetivo es reconocer tu reacción y responder a ella." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Tu juego tiene días buenos y días malos. ¿Dónde está el progreso duradero más rápido?"
    options:
      - { text: "En mejorar tu peor juego (C-game)", correct: true, why: "El progreso se parece al avance de una oruga: un paso adelante por delante (un A-game mejor) y otro por detrás (un C-game menos desastroso). Eliminar tus peores errores también libera atención para aprender cosas nuevas." }
      - { text: "Solo en pulir tu mejor juego (A-game)", why: "El A-game importa, pero el C-game es el que más cuesta. Sin mejorar tus peores días, lo que avanzas por delante se pierde fácilmente por detrás." }
      - { text: "En ninguna parte, la forma es cuestión de suerte", why: "La dispersión de la forma se puede reducir: los jugadores que controlan bien el tilt tienen una distribución más estrecha de su nivel de juego (revisión de 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "¿Cómo compruebas si tu trabajo en el {{t:mental-game|juego mental}}, es decir, en gestionar el tilt, las emociones y la concentración, da resultado?"
    options:
      - { text: "Comparas tus peores {{t:session|sesiones}} con tus peores sesiones anteriores", correct: true, why: "Compara lo parecido con lo parecido: tu peor juego con tu peor juego anterior. El progreso también se ve en que reconoces antes el tilt y terminas antes la {{t:session|sesión}}." }
      - { text: "Miras el resultado de la última semana", why: "Una semana de resultados es sobre todo {{t:variance|varianza}} (lección sobre la {{t:variance|varianza}}). La calidad de tu juego en los peores días dice más." }
      - { text: "Comparas tu mejor {{t:session|sesión}} con la peor", why: "Esa comparación solo muestra la dispersión, no el progreso. Compara tu peor juego con tu peor juego anterior." }
---
El tilt es la pérdida de control bajo el efecto de emociones negativas, normalmente después de bad beats o de una larga racha de pérdidas. Acaba en malas decisiones y en pérdidas mucho mayores de lo habitual. No es algo raro: en un estudio por encuesta, {{n:tilt.severe}} de los jugadores admitió haber sufrido un tilt fuerte al menos una vez en los últimos seis meses.

## Siete tipos de tilt

Un reconocido manual de psicología del póker describe el tilt como un problema de ira y distingue {{n:tilt.types}} tipos:

| Tipo | Qué lo provoca |
|---|---|
| Por mala racha | Los demás tipos de tilt vuelven tan a menudo que la mente no tiene tiempo de reiniciarse antes de la siguiente {{t:session|sesión}} |
| Por injusticia | Bad beats, coolers, cartas que liga el rival en el river |
| Por odio a perder | El simple hecho de perder, aunque sepas que es {{t:variance|varianza}} |
| Por error | Tus propios fallos |
| Por sentir que te lo mereces | La convicción de que mereces ganar |
| Por venganza | La falta de respeto, la agresión constante del rival |
| Por desesperación | La necesidad de recuperar lo perdido: maratones, {{t:stakes|límites}} más altos |

## Reconoce las señales

Cada uno entra en tilt de forma algo distinta. Escribe tu **perfil de tilt**: qué lo provoca, qué piensas y sientes en ese momento, qué haces en la mesa (p. ej. {{t:call|igualas}} demasiado, {{t:raise|subes}} por venganza). Cuanto mejor conozcas tus señales, antes las detectarás.

## Reacciona mientras puedas pensar

Cuando el tilt crece, anula tu capacidad de pensar. Por eso reaccionas a las primeras señales:

1. Una respiración que te da un momento de distancia de la emoción.
2. Una frase preparada que responda a la causa, p. ej. «Los jugadores más flojos tienen que ganar a veces, es {{t:variance|varianza}}. Sigue jugando bien».
3. Si ya no puedes pensar con claridad, terminas la {{t:session|sesión}}. También es progreso terminar antes, por un buen motivo.

## A-game y C-game

Tu juego tiene una dispersión: desde el mejor (A-game) hasta el peor (C-game). El progreso se parece al avance de una oruga: un paso adelante por delante, cuando tu mejor juego mejora, y otro por detrás, cuando tu peor juego se vuelve menos desastroso. El C-game es el que más cuesta, así que empiezas por él.

:::note Cuando es algo más que tilt
Si juegas más tiempo del que tenías previsto, intentas recuperar lo perdido o juegas con dinero que no puedes permitirte perder, lee la ficha sobre juego responsable en la lección sobre el bankroll.
:::
