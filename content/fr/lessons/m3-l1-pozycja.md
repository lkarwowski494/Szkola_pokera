---
id: m3.l1
module: m3
order: 1
title: "La position à la table"
sub: "Pourquoi votre place compte"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "Quelle {{t:position}} est la meilleure ?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "À partir du flop, le Bouton parle en dernier : il connaît donc toujours les décisions des adversaires avant de prendre la sienne." }
      - { text: "{{t:big-blind|Grosse blinde}}", why: "La {{t:big-blind|BB}} paie moins cher pour entrer, car elle a déjà mis de l’argent, mais à partir du flop elle parle parmi les premiers." }
      - { text: "{{t:utg}}", why: "{{t:utg}} parle en premier au preflop et a tous les autres joueurs de la table derrière lui. C’est la place la plus difficile pour ouvrir." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Tous les joueurs avant vous se sont {{t:fold|couchés}}. Que faites-vous ?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Je me couche}}", correct: true, why: "K9 dépareillé est hors de la {{t:range|range}} d’{{t:open|ouverture}} depuis {{t:utg}}, c’est-à-dire hors de la liste des mains avec lesquelles vous {{t:open|ouvrez}} depuis cette {{t:position|position}}. Cinq joueurs sont derrière vous, et souvent l’un d’eux a un roi avec un meilleur kicker." }
      - { text: "{{t:raise|Je relance}}", why: "Depuis {{t:utg}}, vous {{t:open|ouvrez}} seulement environ {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} des mains. K9o touche facilement un roi et perd contre KQ ou AK." }
      - { text: "Je complète la {{t:big-blind|grosse blinde}}", why: "Se contenter de compléter (limp) depuis {{t:utg}} est une mauvaise habitude. Soit la main vaut une {{t:raise|relance}}, soit vous vous {{t:fold|couchez}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Même main, mais vous êtes au Bouton et tous les joueurs avant vous se sont {{t:fold|couchés}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Je relance}}", correct: true, why: "Il ne reste que les blindes, et après le flop vous avez la {{t:position|position}}. Au Bouton, vous {{t:open|ouvrez}} environ {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} des mains, et K9o en fait partie." }
      - { text: "{{t:fold|Je me couche}}", why: "Trop prudent. Contre les seules blindes, cette main est assez bonne, et la {{t:position}} lui ajoute de la valeur." }
      - { text: "Je complète la {{t:big-blind|grosse blinde}}", why: "Le limp abandonne l’{{t:initiative|initiative}}. Une {{t:raise|relance}} remporte souvent les blindes immédiatement." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Pourquoi parler en dernier aide-t-il ?"
    options:
      - { text: "Je sais ce qu’ont fait les adversaires avant de décider", correct: true, why: "Chaque action d’un adversaire est une information. Le dernier à parler en a le plus et peut {{t:check|checker}} à peu de frais ou s’emparer du {{t:pot|pot}} quand les autres montrent de la faiblesse." }
      - { text: "Je reçois de meilleures cartes", why: "Les cartes sont aléatoires, quelle que soit la {{t:position|position}}." }
      - { text: "Je paie des blindes plus petites", why: "Au Bouton, vous ne payez pas de blindes, mais ce n’est pas le principal avantage. Le plus important, c’est l’information." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
Le bouton du donneur (**{{t:button|BTN}}**, Button) se déplace à chaque main. C’est lui qui détermine l’ordre de parole. À partir du flop, le Bouton parle **en dernier**, et c’est un énorme avantage : vous voyez ce que tous les autres ont fait avant de décider vous-même. Celui qui agit avant un adversaire après le flop joue {{t:out-of-position}} : il décide sans connaître son action.

## Les {{t:position|positions}} à une table à 6 joueurs

| {{t:position|Position}} | Quand elle parle | Avec quelle largeur {{t:open|ouvrir}} |
|---|---|---|
| {{t:utg}} | En premier au preflop | environ {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} des mains |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Après {{t:utg}} ; {{t:cutoff|CO}} juste avant le Bouton | de plus en plus large |
| {{t:button|BTN}} | En dernier à partir du flop | environ {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} des mains |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | En dernier au preflop, en premier à partir du flop | La {{t:small-blind|SB}} {{t:open|ouvre}} quand tout le monde s’est {{t:fold|couché}} (leçon sur les {{t:range|ranges}}) ; défense des blindes dans le module M4 |

Le **{{t:hijack|HJ}}** (Hijack) est assis après {{t:utg}}, deux places avant le Bouton, et le **{{t:cutoff|CO}}** (Cutoff) juste avant le Bouton. Ce sont les {{t:position|positions}} intermédiaires : il y a moins de joueurs derrière elles que derrière {{t:utg}}, donc vous {{t:open|ouvrez}} plus large depuis ces places, mais toujours plus serré que depuis le Bouton.

:::note Taille de l’{{t:open|ouverture}}
Vous {{t:open|ouvrez}} par une {{t:raise|relance}} à {{n:pf.open-size}} depuis chaque {{t:position|position}}, et à {{n:pf.open-size-sb}} depuis la {{t:small-blind|petite blinde}}. C’est une simplification : dans les solutions des solveurs, les {{t:open|ouvertures}} depuis les {{t:early-position|premières positions}} sont un peu plus petites (par ex. {{n:pf.open-size.solver-utg}} depuis {{t:utg}} et {{n:pf.open-size.solver-co}} depuis le {{t:cutoff|CO}}), mais une taille unique est plus facile à apprendre. Quand vous entrez en premier, vous ne vous contentez pas de payer la blinde (c’est un {{t:limp}}, c’est-à-dire entrer en {{t:call|suivant}} simplement la {{t:big-blind|grosse blinde}}) : une {{t:raise}} peut remporter le {{t:pot|pot}} immédiatement et vous donne l’{{t:initiative|initiative}}, car celui qui a {{t:raise|relancé}} en dernier fait généralement la {{t:bet|mise}} suivante.
:::
