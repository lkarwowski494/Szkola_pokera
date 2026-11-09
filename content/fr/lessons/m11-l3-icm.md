---
id: m11.l3
module: m11
order: 3
title: "L'ICM et le bubble factor"
sub: "Les jetons ne sont pas de l'argent"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Il reste trois joueurs, deux places sont payées. Stacks : {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} et {{n:m11.icm.a.s3}} {{t:chips|jetons}}. Selon l'{{t:icm}}, quelle est la chance du plus petit stack de prendre la 1re place ? Saisissez le nombre en pourcentage."
    answer: m11.icm.a.chips3
    explanation: "Chance de 1re place = stack ÷ tous les {{t:chips|jetons}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Mêmes stacks ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). Le gros stack a pris la 1re place. Quelle est maintenant la chance du plus petit stack de prendre la 2e place ?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Il reste deux joueurs avec {{n:m11.icm.a.rest1}} {{t:chips|jetons}}, dont le petit stack possède {{n:m11.icm.a.s3}} : {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "C'est la chance de 1re place, calculée sur tous les {{t:chips|jetons}}. Quand le vainqueur sort du calcul, vous divisez seulement par les {{t:chips|jetons}} des joueurs restants : {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "C'est la chance totale du {{t:short-stack|short stack}} de prendre la 2e place, sur les deux vainqueurs possibles. La question porte sur le cas où le gros stack a gagné." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Paiements}} : {{n:m11.icm.a.p1}} du {{t:prize-pool|prize pool}} pour la 1re place et {{n:m11.icm.a.p2}} pour la 2e. Stacks {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Selon l'{{t:icm}}, combien vaut le plus petit stack (en pourcentage du {{t:prize-pool|prize pool}}) ? Saisissez un nombre."
    answer: m11.icm.a.eq3
    explanation: "Chance de 1re place {{n:m11.icm.a.chips3}}, de 2e place {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Équité = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, plus que ses {{n:m11.icm.a.chips3}} des {{t:chips|jetons}}."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "Le gros stack détient {{n:m11.icm.a.chips1}} des {{t:chips|jetons}} en jeu. Selon l'{{t:icm}}, combien vaut-il en argent ?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, soit moins que sa part des {{t:chips|jetons}}", correct: true, why: "Le gros stack peut gagner au maximum {{n:m11.icm.a.p1}} du {{t:prize-pool|prize pool}}, alors qu'il a une chance de remporter tous les {{t:chips|jetons}}. C'est pourquoi les {{t:chips|jetons}} du leader valent moins que leur part, et ceux du {{t:short-stack|short stack}} plus ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, autant que sa part des {{t:chips|jetons}}", why: "Ce serait le cas si le vainqueur prenait tout le {{t:prize-pool|prize pool}}. Avec des {{t:payout|paiements}} de {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}}, chaque {{t:chips|jeton}} du gros stack vaut moins : {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, car il va presque sûrement gagner", why: "Il n'a que {{n:m11.icm.a.chips1}} de chances de prendre la 1re place, et le reste de son {{t:tournament-equity|équité de tournoi}} vient de la 2e place. Au total : {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bulle}} : quatre joueurs, trois places payées. En {{t:call|suivant}} un all-in, vous perdez {{n:m11.bf.loss}} du {{t:prize-pool|prize pool}} si vous perdez, et vous gagnez {{n:m11.bf.gain}} si vous gagnez. Quel est le bubble factor ? Saisissez un nombre avec deux décimales."
    answer: m11.bf.value
    explanation: "Bubble factor = perte ÷ gain = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Perdre fait presque une fois et demie plus mal que gagner n'aide."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Le bubble factor est de {{n:m11.bf.value}}. De combien d'équité avez-vous besoin pour que {{t:call|suivre}} l'all-in soit rentable ? Saisissez le nombre en pourcentage."
    answer: m11.bf.req
    explanation: "Équité nécessaire = BF ÷ (BF + 1), soit perte ÷ (perte + gain) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. Dans une partie aux {{t:chips|jetons}}, {{n:m11.bf.req-chips}} suffirait."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Dans une partie aux {{t:chips|jetons}}, {{n:m11.bf.req-chips}} d'équité suffit pour {{t:call|suivre}} cet all-in, mais selon l'{{t:icm}} il vous faut {{n:m11.bf.req}}. Comment s'appelle la différence ?"
    options:
      - { text: "{{t:risk-premium|Prime de risque}} ({{n:m11.bf.premium}})", correct: true, why: "La {{t:risk-premium|prime de risque}} est l'équité supplémentaire que l'{{t:icm}} exige au-delà du prix en {{t:chips|jetons}} : {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "Le bubble factor est le rapport entre la perte et le gain ({{n:m11.bf.value}}). Il sert à calculer l'équité nécessaire, et la différence par rapport à une partie aux {{t:chips|jetons}} est la {{t:risk-premium|prime de risque}}." }
      - { text: "Fold equity", why: "La fold equity est le gain tiré des {{t:fold|folds}} de l'adversaire. Quand vous {{t:call|suivez}} un all-in, vous n'en avez pas." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bulle}}, l'exemple de la leçon. Votre main a env. {{n:m11.bf.example-eq}} d'équité contre la {{t:range|range}} d'all-in de l'adversaire. Dans une partie aux {{t:chips|jetons}}, {{t:call|suivre}} serait rentable, car {{n:m11.bf.req-chips}} suffit. Que faites-vous ici ?"
    options:
      - { text: "{{t:fold|Je me couche}}", correct: true, why: "Selon l'{{t:icm}}, il vous faut ici {{n:m11.bf.req}} d'équité. Une main qui gagne moins souvent perd de l'argent, même si elle serait gagnante en {{t:chips|jetons}}." }
      - { text: "{{t:call|Je suis}}, car c'est rentable en {{t:chips|jetons}}", why: "Dans un {{t:tournament|tournoi}} avec des {{t:payout|paiements}}, c'est l'argent qui compte, pas les {{t:chips|jetons}}. Perdre vous coûte {{n:m11.bf.loss}} du {{t:prize-pool|prize pool}}, alors que gagner ne vous rapporte que {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Je suis}}, car je gagne plus d'une fois sur deux", why: "Une main à {{n:m11.bf.example-eq}} gagne plus d'une fois sur deux, et pourtant elle est trop faible ici : le seuil est de {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Bulle}} du {{t:tournament|tournoi}}. Vous avez le plus gros stack de la table et vous {{t:cover|couvrez}} tout le monde. Le stack moyen se couche très souvent face à vous. Qu'en déduire ?"
    options:
      - { text: "Vous pouvez {{t:shove|faire tapis}} plus large, car les adversaires {{t:call|suivent}} serré", correct: true, why: "En {{t:call|suivant}}, le stack moyen risque d'être éliminé juste avant les prix, il lui faut donc beaucoup d'équité. Vous, en cas de défaite, ne perdez qu'une partie de votre stack. Les adversaires {{t:call|suivent}} serré, donc vous remportez plus souvent le {{t:pot|pot}} sans combat." }
      - { text: "Vous jouez plus serré pour ne pas perdre la tête", why: "Le leader prend le moins de risques à la table. Jouer serré lui fait abandonner son principal avantage : la pression sur les stacks moyens." }
      - { text: "Rien, car l'{{t:icm}} ne concerne que les {{t:short-stack|short stacks}}", why: "L'{{t:icm}} concerne tout le monde : il change l'équité dont chacun a besoin pour {{t:call|suivre}}, et cela dépend de toute la répartition des stacks." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "Que suppose le modèle {{t:icm}} ?"
    options:
      - { text: "Que tout le monde joue aussi bien et que seuls les stacks déterminent les places", correct: true, why: "L'{{t:icm}} convertit uniquement les stacks en chances d'occuper chaque place. Il ignore la {{t:position|position}}, la hausse des blindes et les écarts de niveau." }
      - { text: "Que le meilleur joueur gagne plus souvent", why: "Au contraire : l'{{t:icm}} suppose un niveau égal. Il ne tient aucun compte de l'avantage d'un joueur." }
      - { text: "Que le joueur en {{t:big-blind|grosse blinde}} a moins de chances", why: "L'{{t:icm}} ignore la {{t:position|position}} et les blindes : il ne regarde que les stacks. C'est l'une de ses limites." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
Dans une partie d'argent (cash), un {{t:chips|jeton}} est de l'argent : un jeton gagné et un jeton perdu valent autant. En {{t:tournament|tournoi}}, ce n'est pas le cas. Les prix vont aux premières places, et le vainqueur ne remporte pas tout le {{t:prize-pool|prize pool}}, bien qu'il remporte tous les {{t:chips|jetons}}. C'est pourquoi il faut convertir les {{t:chips|jetons}} en argent.

## {{t:icm}} : un stack en argent

Le modèle des {{t:chips|jetons}} indépendants ({{t:icm}}) convertit les stacks en chances d'occuper chaque place. Il suppose que tout le monde joue aussi bien, si bien que seuls les stacks déterminent l'ordre d'arrivée.

```formula
chance de 1re place = votre stack ÷ tous les jetons
```

La chance de 2e place se calcule de la même façon, mais séparément pour chaque vainqueur possible : vous retirez ses {{t:chips|jetons}} et divisez par ce qui reste. L'{{t:tournament-equity|équité de tournoi}} d'un stack, c'est-à-dire sa part attendue du {{t:prize-pool|prize pool}}, est la somme : chance d'une place × {{t:payout|paiement}} de cette place.

## Exemple : trois joueurs dans la {{t:bubble|bulle}}

Deux places sont payées : {{n:m11.icm.a.p1}} et {{n:m11.icm.a.p2}} du {{t:prize-pool|prize pool}}. Stacks : {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} et {{n:m11.icm.a.s3}} {{t:chips|jetons}}.

- Le {{t:short-stack|short stack}} gagne le {{t:tournament|tournoi}} avec une chance de {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Pour la 2e place : si le gros stack gagne ({{n:m11.icm.a.chips1}}), le petit stack finit deuxième avec une chance de {{n:m11.icm.a.second3.via1}} ; si le stack moyen gagne ({{n:m11.icm.a.chips2}}), avec une chance de {{n:m11.icm.a.second3.via2}}. Au total : {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (les composantes sont arrondies).
- Équité : {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** du {{t:prize-pool|prize pool}}.

| Stack | Part des {{t:chips|jetons}} | Équité selon l'{{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

Le {{t:short-stack|short stack}} vaut plus que ses {{t:chips|jetons}}, et le gros stack moins : le leader ne peut pas obtenir plus que le prix de la 1re place.

## Bubble factor : perdre fait plus mal

Quatre joueurs, trois places payées : {{n:m11.bf.p1}}, {{n:m11.bf.p2}} et {{n:m11.bf.p3}}. Stacks {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (vous), {{n:m11.bf.s3}} et {{n:m11.bf.s4}}. Le joueur à {{n:m11.bf.s3}} fait all-in, et vous le {{t:cover|couvrez}}, c'est-à-dire que vous avez plus de {{t:chips|jetons}}. Pour simplifier, nous ignorons les blindes dans le {{t:pot|pot}}.

- Pour l'instant, votre stack vaut {{n:m11.bf.eq.now}} du {{t:prize-pool|prize pool}}.
- Si vous gagnez : vous avez {{n:m11.bf.win}}, l'adversaire est éliminé et tout le monde est dans les places payées. Votre équité monte à {{n:m11.bf.eq.win}}, soit **{{n:m11.bf.gain}}** de plus.
- Si vous perdez : il vous reste {{n:m11.bf.lose}}, et votre équité tombe à {{n:m11.bf.eq.lose}}, soit **{{n:m11.bf.loss}}** de moins.

```formula
bubble factor = perte en cas de défaite ÷ gain en cas de victoire
```

Ici, {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. L'application utilise cette définition (perte ÷ gain) : dans une partie aux {{t:chips|jetons}}, où la perte est égale au gain, le bubble factor vaut un. Certains tableaux push/fold calculent le bubble factor autrement, sur une autre échelle : ne comparez donc pas directement leurs chiffres avec ceux-ci. On en déduit l'équité nécessaire :

```formula
équité nécessaire = BF ÷ (BF + 1)
```

On obtient **{{n:m11.bf.req}}**. Dans une partie aux {{t:chips|jetons}}, vous risquez {{n:m11.bf.s3}} pour gagner {{n:m11.bf.s3}}, donc {{n:m11.bf.req-chips}} suffirait. La différence, {{n:m11.bf.premium}}, est la **{{t:risk-premium|prime de risque}}**.

La même tendance apparaît dans un équilibre publié pour trois joueurs à stacks égaux (article scientifique de 2008) : quand le bouton et la {{t:small-blind|petite blinde}} sont déjà all-in, la {{t:big-blind|grosse blinde}} {{t:call|suit}} avec {{n:m11.jamfold3.overcall.single}} des mains dans une donne isolée, mais dans un {{t:tournament|tournoi}} avec des {{t:payout|paiements}} seulement avec {{n:m11.jamfold3.overcall.tourn}}, soit uniquement les {{t:pocket-pair|paires servies}} les plus hautes et AKs.

:::note Qui {{t:call|suit}} serré
Un stack moyen dans la {{t:bubble|bulle}} ou en {{t:final-table|table finale}} (la dernière table d'un {{t:tournament|tournoi}}, où se jouent les prix les plus élevés) {{t:call|suit}} les all-in de façon bien plus serrée que dans une partie aux {{t:chips|jetons}}. Un gros stack qui {{t:cover|couvre}} ses adversaires risque moins et peut en profiter : {{t:shove|faire tapis}} plus large, car les adversaires doivent {{t:fold|se coucher}}. Le bubble factor dépend de tous les stacks de la table : on ne le calcule donc pas à la table, on s'entraîne sur des exemples pour développer son intuition.
:::

## Limites de l'{{t:icm}}

L'{{t:icm}} ne tient pas compte de la {{t:position|position}}, de la hausse des blindes ni du niveau des joueurs. C'est une approximation, et non une évaluation exacte d'un {{t:tournament|tournoi}}.
