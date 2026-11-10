---
id: m3.l2
module: m3
order: 2
title: "Mains de départ"
sub: "Quelles cartes jouer avant le flop"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Quelle main est la plus forte ?"
    options:
      - { text: "A♥ K♥ (même couleur)", correct: true, why: "Les rangs sont les mêmes, mais la main assortie a une façon de plus de gagner : la {{t:flush|couleur}}." }
      - { text: "A♥ K♣ (couleurs différentes)", why: "Avec des couleurs différentes, vous perdez la possibilité de faire une {{t:flush|couleur}}." }
      - { text: "Elles sont égales", why: "Presque, mais pas tout à fait. La couleur des cartes compte." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Personne n'est encore entré dans le coup. Que faites-vous ?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Je me couche}}", correct: true, why: "Le 7-2 dépareillé est l'une des mains les plus faibles : les cartes sont trop éloignées l'une de l'autre pour former ensemble une {{t:straight|quinte}}, elles donnent rarement une {{t:flush|couleur}}, et une {{t:pair|paire}} touchée a un kicker faible. On l'appelle souvent la pire main, même si, d'après les calculs face à une main aléatoire, certaines autres, par ex. le 3-2 dépareillé, s'en sortent encore plus mal." }
      - { text: "{{t:raise|Je relance}} pour surprendre", why: "Un {{t:bluff|bluff}} (jouer une main faible pour que les adversaires {{t:fold|couchent}} de meilleures mains) préflop avec l'une des mains les plus faibles, alors que quatre joueurs doivent encore parler après vous, est perdant sur le long terme." }
      - { text: "{{t:call|Je suis}}, parce que ça ne coûte pas cher", why: "Chaque entrée « pas chère » avec une main faible s'additionne en grosses pertes." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "Le joueur avant vous a {{t:raise|relancé}}. Que faites-vous ?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Je relance}} à nouveau (3-bet)", correct: true, why: "Vous avez la meilleure main possible. Vous voulez mettre le plus possible dans le pot et réduire le nombre d'adversaires." }
      - { text: "Je me contente de {{t:call|suivre}}", why: "Les joueurs avancés jouent parfois ainsi pour brouiller les pistes, mais en règle générale vous perdez de la valeur et laissez entrer les autres à bas prix." }
      - { text: "{{t:fold|Je me couche}}", why: "Vous ne {{t:fold|couchez}} jamais des As préflop. Ils sont favoris face à toute autre main, par ex. face à KK ils ont environ {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Tout le monde s'est {{t:fold|couché}} jusqu'à vous. Que faites-vous ?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Je relance}}", correct: true, why: "QJ assortis est une très bonne main pour attaquer les blindes en {{t:position|position}} : elle touche des {{t:straight|quintes}}, des couleurs et des {{t:pair|paires}} hautes." }
      - { text: "{{t:fold|Je me couche}}", why: "Au Bouton, cette main est trop bonne pour être {{t:fold|couchée}}." }
      - { text: "{{t:call|Je suis}}", why: "Mieux vaut {{t:raise|relancer}} : vous avez une chance de remporter les blindes tout de suite et vous jouez avec l'{{t:initiative|initiative}}." }
---
Les débutants perdent la plus grande partie de leur argent en jouant trop de mains faibles. Bien choisir ses mains de départ est le moyen le plus rapide d'arrêter de perdre.

## Groupes de mains

- **Les plus fortes** : [[As Ah]], [[Ks Kh]], [[Qs Qh]] ainsi que AK assortis et dépareillés, par ex. [[As Ks]] et [[As Kd]]. Vous {{t:raise|relancez}}, et si quelqu'un a {{t:raise|relancé}} avant vous, vous {{t:raise|relancez}} généralement à nouveau (3-bet) {{t:value|pour la valeur}}, c'est-à-dire pour que l'adversaire {{t:call|suive}} avec une main plus faible.
- **Fortes** : JJ, TT, AQ, AJ assortis, KQ assortis.
- **Spéculatives** : les petites {{t:pair|paires}} et les cartes consécutives de même couleur, par ex. [[7h 6h]]. Bonnes en {{t:late-position|position tardive}}.
- **Faibles** : éloignées, basses, dépareillées, par ex. [[9c 3d]]. {{t:fold|Couchez-vous}}.

:::note Combien de {{t:combo|combinaisons}}
Il existe au total {{n:combos.total}} {{t:combo|combinaisons}} de mains de départ, mais seulement {{n:combos.kinds}} types : {{n:combos.kinds.pair}} {{t:pair|paires}}, {{n:combos.kinds.suited}} mains assorties et {{n:combos.kinds.offsuit}} dépareillées. Chaque {{t:pair|paire}} représente {{n:combos.pair}} {{t:combo|combinaisons}}, une main assortie {{n:combos.suited}} et une main dépareillée {{n:combos.offsuit}}. C'est pourquoi AK dépareillés sort trois fois plus souvent que AK assortis.
:::

Les groupes ci-dessus sont une simplification pour débuter. Vous découvrirez dans la prochaine leçon les {{t:range|ranges}} d'{{t:open|ouverture}} exactes pour chaque {{t:position|position}}, dans une grille de {{t:range|ranges}}.
