---
id: m10.l4
module: m10
order: 4
title: "Rake"
sub: "Ce que coûte le jeu et ce que cela change à vos décisions"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Vous jouez en NL10 6-max sur l'un des grands sites en ligne. Quelle est la taille du {{t:rake}} par rapport au winrate d'un joueur gagnant typique aux petites {{t:stakes|limites}} ?"
    options:
      - { text: "Plusieurs fois plus élevé : env. {{n:rake.micro.low}}–{{n:rake.micro.high}} contre {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Une fois les grilles de rake des sites converties en bb/100, on obtient env. {{n:rake.micro.low}}–{{n:rake.micro.high}} aux micro-limites. Un joueur gagnant doit battre ses adversaires de plus que le montant du {{t:rake}}, et seul l'excédent constitue son winrate." }
      - { text: "À peu près le même", why: "Le {{t:rake}} aux micro-limites est d'env. {{n:rake.micro.low}}–{{n:rake.micro.high}}, et un winrate typique de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. La différence est de plusieurs fois." }
      - { text: "Négligeable, car le site ne prend que quelques pour cent du {{t:pot}}", why: "Quelques pour cent de chaque {{t:pot}} après le flop font au total env. {{n:rake.micro.low}}–{{n:rake.micro.high}}. C'est plus que ce que gagne un joueur gagnant typique." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Dans un rapport sur la population en cash game 6-max, chaque joueur de NL100 perd en moyenne {{n:rake.pop.nl100.loss}}. D'où vient cette perte ?"
    options:
      - { text: "C'est le {{t:rake}} : sans lui, les joueurs termineraient ensemble à zéro", correct: true, why: "Les joueurs jouent les uns contre les autres : ce que l'un gagne, l'autre le perd. En moyenne, tous ne perdent que ce que prend le site. L'auteur : « your biggest villain is the house »." }
      - { text: "Du fait que la plupart des joueurs jouent mal", why: "Le mauvais jeu transfère l'argent des joueurs plus faibles vers les meilleurs, mais ne change pas la moyenne. Seul le {{t:rake}} fait baisser la moyenne." }
      - { text: "De la {{t:variance}} : sur un échantillon plus grand, on arrivera à zéro", why: "La {{t:variance}}, c'est-à-dire la dispersion des résultats autour de l'{{t:expected-value|espérance de gain}}, agit sur les résultats des joueurs individuels dans les deux sens. La moyenne de toute la population est négative, car tout le monde paie le {{t:rake}}." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Selon l'estimation de l'auteur de ces mêmes données (avec correction bayésienne), parmi les joueurs ayant au moins {{n:rake.pop.reg.hands}} mains, env. {{n:rake.pop.reg.prerake}} gagnent avant déduction du {{t:rake}}. Combien gagnent après sa déduction ?"
    options:
      - { text: "Env. {{n:rake.pop.reg.postrake}}", correct: true, why: "Le {{t:rake}} élimine presque la moitié des gagnants : env. {{n:rake.pop.reg.prerake}} avant rake, env. {{n:rake.pop.reg.postrake}} après. C'est pourquoi vous calculez toujours le winrate après rake." }
      - { text: "Presque autant, env. {{n:rake.pop.reg.prerake}}", why: "Ce serait le cas si le {{t:rake}} était faible. Avec un rake de plusieurs bb/100, beaucoup de joueurs gagnants avant rake passent sous zéro." }
      - { text: "Presque personne", why: "C'est exagéré : env. {{n:rake.pop.reg.postrake}} de ce groupe gagnent encore. Le {{t:rake}} est un obstacle important, mais il ne ferme pas la voie vers les gains." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Pourquoi, en NL500, le {{t:rake}} en bb/100 est-il plusieurs fois plus faible ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) qu'aux micro-limites ?"
    options:
      - { text: "Parce que les {{t:pot|pots}} plus gros atteignent plus souvent le {{t:rake-cap|plafond de rake}}, qui y est faible en bb", correct: true, why: "Le site prend un pourcentage du {{t:pot}}, mais pas plus qu'un plafond en dollars. Aux micro-limites, ce plafond représente de nombreuses bb et les {{t:pot|pots}} l'atteignent rarement : vous payez donc le pourcentage complet. En NL500, le même plafond ne représente qu'une fraction de bb." }
      - { text: "Parce qu'en NL500 le site prend un pourcentage plus faible", why: "Le pourcentage est souvent similaire (env. {{n:rake.ex.pct}}). La différence vient du {{t:rake-cap|plafond de rake}}, qui, aux {{t:stakes|limites}} élevées, réduit la commission prélevée sur les gros {{t:pot|pots}}." }
      - { text: "Parce qu'en NL500 on joue moins de mains par heure", why: "Le bb/100 mesure le {{t:rake}} pour 100 mains, donc le rythme de jeu ne le change pas. Ce qui le change, c'est le {{t:rake-cap|plafond de rake}} exprimé en bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Le {{t:pot}} contient {{n:ex.pot}}, votre adversaire {{t:bet|mise}} {{n:ex.bet.half}}. Le site prélève {{n:rake.ex.pct}} du {{t:pot}}, sans {{t:rake-cap|plafond}} à portée. De combien d'équité avez-vous besoin pour {{t:call|suivre}} ? Saisissez un pourcentage."
    answer: eq.bet-half.rake
    explanation: "Si vous {{t:call|suivez}}, le {{t:pot}} contient {{n:ex.half.total}}, et il reste {{n:rake.ex.pot-after}} après le rake. Vous payez {{n:ex.bet.half}}, il vous faut donc {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} au lieu de {{n:eq.bet-half}} sans rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Sans {{t:rake}}, {{t:call|suivre}} une mise d'un demi-{{t:pot}} demande {{n:eq.bet-half}} d'équité. Combien en faut-il avec un {{t:rake}} de {{n:rake.ex.pct}} ?"
    options:
      - { text: "Un peu plus : env. {{n:eq.bet-half.rake}}", correct: true, why: "Vous gagnez le {{t:pot}} diminué du {{t:rake}}, mais vous payez le montant entier. Une main juste au-dessus du seuil sans rake peut déjà être en dessous avec rake." }
      - { text: "Autant, car les deux joueurs paient le {{t:rake}}", why: "Le {{t:rake}} est déduit du {{t:pot}} que vous gagnez, pas du montant que vous payez. Le seuil monte à env. {{n:eq.bet-half.rake}}." }
      - { text: "Moins, car le {{t:pot}} est plus gros", why: "Après rake, le {{t:pot}} est plus petit, et non plus gros : il vous faut donc plus d'équité, env. {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Vous jouez sur un site qui ne prélève le {{t:rake}} que sur les {{t:pot|pots}} qui atteignent le flop. Quelqu'un avant vous {{t:open|ouvre}}, et vous êtes en {{t:position}} avec une main pour laquelle {{t:call|suivre}} serait limite sans rake. Que change le {{t:rake}} ?"
    options:
      - { text: "{{t:call|Suivre}} moins souvent : avec les mains limites pour {{t:call|suivre}}, {{t:fold|se coucher}} ou 3-better plus souvent", correct: true, why: "Dans les solutions de solveur publiées avec rake, les joueurs en {{t:position}} face à une {{t:open|ouverture}} jouent env. {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} de mains en moins. C'est le fait de {{t:call|suivre}} lui-même qui perd, car un {{t:pot}} après le flop paie le {{t:rake}}, alors qu'un {{t:pot}} gagné par un 3-bet avant le flop ne le paie pas." }
      - { text: "Rien : le {{t:rake}} ne concerne que le jeu après le flop", why: "C'est précisément pour cela qu'il change la décision avant le flop : {{t:call|suivre}} mène au flop et au rake, alors que 3-better ou {{t:fold|se coucher}} met souvent fin au coup sans rake." }
      - { text: "{{t:call|Suivre}} plus souvent, car les {{t:pot|pots}} après le flop sont gros", why: "C'est l'inverse : le {{t:rake}} prend une part justement de ces {{t:pot|pots}}. Le solveur avec rake {{t:call|suit}} nettement moins souvent." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Dans ces mêmes solutions de solveur, la {{t:big-blind|grosse blinde}} ne {{t:call|suit}} un min-raise en jeu avec rake que dans env. {{n:rake.solver.bb-minraise}} des cas où elle le {{t:call|suit}} sans rake. Qu'est-ce que cela implique pour vous en {{t:big-blind|grosse blinde}} ?"
    options:
      - { text: "Défendre toujours beaucoup de mains, mais plus serré que dans les tableaux calculés sans rake", correct: true, why: "La {{t:big-blind|grosse blinde}} défend toujours souvent, car elle a déjà des {{t:chips|jetons}} dans le {{t:pot}} et clôt l'action. Le {{t:rake}} supprime toutefois les décisions de {{t:call|suivre}} les plus faibles : les tableaux sans rake sont donc trop larges pour vous." }
      - { text: "Cesser de défendre la {{t:big-blind|grosse blinde}} en {{t:call|suivant}}", why: "Non : selon l'auteur, {{t:call|suivre}} depuis les blindes reste une part importante de la stratégie, y compris avec rake. Ce qui change, c'est la largeur de la défense, pas son existence." }
      - { text: "Défendre aussi large, car en {{t:big-blind|grosse blinde}} le {{t:rake}} ne compte pas", why: "Il compte : si vous {{t:call|suivez}}, le {{t:pot}} va au flop et paie le {{t:rake}}. C'est pourquoi le solveur {{t:call|suit}} moins souvent depuis la {{t:big-blind|grosse blinde}}." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Sur certains sites, le {{t:rake}} est aussi prélevé sur les {{t:pot|pots}} 3-betés qui se terminent avant le flop. Qu'est-ce que cela change à l'argument « un 3-bet ne paie pas de rake » ?"
    options:
      - { text: "Sur un tel site, cet argument s'affaiblit : le 3-bet paie aussi, donc l'avantage du 3-bet sur le fait de {{t:call|suivre}} est moindre", correct: true, why: "Le résultat du solveur concerne une structure « no flop, no drop », dans laquelle un {{t:pot}} sans flop est exempt de rake. Sur un tel site, cette règle ne couvre que les {{t:pot|pots}} sans 3-bet : {{t:call|suivre}} perd donc toujours à cause du rake, mais le 3-bet n'en est pas exempt." }
      - { text: "Rien, car le {{t:rake}} sur un 3-bet est négligeable", why: "On ne peut pas le savoir sans faire le calcul pour un site donné. La seule certitude, c'est que le 3-bet n'est plus exempt de rake." }
      - { text: "Sur un tel site, il faut toujours {{t:call|suivre}} au lieu de 3-better", why: "{{t:call|Suivre}} mène au flop et paie le {{t:rake}}, comme avant. La seule différence, c'est que le 3-bet paie aussi." }
---
Le {{t:rake}} est la commission que le site prélève sur le {{t:pot}}. Les joueurs jouent les uns contre les autres : sans {{t:rake}}, ils termineraient donc ensemble à zéro. Avec le rake, le joueur moyen perd exactement ce que prend le site, et un joueur gagnant doit battre ses adversaires de plus que le montant du {{t:rake}}.

## Ce que cela coûte

Le site prend un pourcentage du {{t:pot}}, mais pas plus qu'un {{t:rake-cap|plafond de rake}} en dollars. Sur les deux plus grands sites en ligne, en NL2–NL10, c'est {{n:rake.ex.pct}} du {{t:pot}}. Aux micro-limites, les {{t:pot|pots}} atteignent rarement le plafond : vous payez donc le pourcentage complet.

Une comparaison des grilles de rake des sites les convertit en bb/100 à partir de la distribution des {{t:pot|pots}} sur plusieurs millions de mains :

| {{t:stakes|Limite}} (6-max, deux plus grands sites en ligne) | {{t:rake}} |
|---|---|
| NL2–NL25 | env. {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | env. {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Un joueur gagnant typique aux petites {{t:stakes|limites}} a un winrate de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (module 12) : plusieurs fois moins que ce qu'il paie au site. Aux {{t:stakes|limites}} plus élevées, le même plafond en dollars ne représente qu'une fraction de bb, donc le {{t:rake}} en bb/100 baisse.

Les données de population disent la même chose. Dans le rapport sur la population (cash 6-max, NL10–NL500), chaque joueur perd en moyenne {{n:rake.pop.nl10.loss}} en NL10, {{n:rake.pop.nl100.loss}} en NL100 et {{n:rake.pop.nl500.loss}} en NL500. Parmi les joueurs de NL100 ayant au moins {{n:rake.pop.reg.hands}} mains, selon l'estimation de l'auteur (correction bayésienne), env. {{n:rake.pop.reg.prerake}} gagnent avant déduction du rake, et env. {{n:rake.pop.reg.postrake}} après déduction ({{n:rake.pop.reg.prerake.raw}} et {{n:rake.pop.reg.postrake.raw}} dans les données brutes).

## Le seuil pour {{t:call|suivre}} avec rake

Vous gagnez le {{t:pot}} diminué du {{t:rake}}, mais vous payez le montant entier. L'équité nécessaire du module 2 augmente :

```formula
équité nécessaire = montant à payer ÷ ({{t:pot}} après avoir {{t:call|suivi}} × (1 − {{t:rake}}))
```

Mise de {{n:ex.bet.half}} dans un {{t:pot}} de {{n:ex.pot}} : sans rake, il vous faut {{n:eq.bet-half}} ; avec un rake de {{n:rake.ex.pct}}, {{n:eq.bet-half.rake}}. La différence est faible sur un seul coup, mais elle s'applique à chaque {{t:pot}} après le flop.

## Ce que le {{t:rake}} change avant le flop

Sur de nombreux sites, le {{t:rake}} n'est prélevé que sur les {{t:pot|pots}} qui atteignent le flop (« no flop, no drop »). Un {{t:pot}} gagné avant le flop en est alors exempt, tandis qu'un {{t:pot}} où l'on a {{t:call|suivi}} le paie. Dans les solutions de solveur publiées pour la NL100 avec rake :

- les joueurs en {{t:position}} face à une {{t:open|ouverture}} jouent env. {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} de mains en moins ; c'est surtout le fait de {{t:call|suivre}} qui perd, et les 3-bets sont un peu plus nombreux ;
- la {{t:big-blind|grosse blinde}} ne {{t:call|suit}} un min-raise que dans env. {{n:rake.solver.bb-minraise}} des cas où elle le fait sans rake, même si la défense des blindes repose toujours sur le fait de {{t:call|suivre}}.

Pour la même raison, au module 3, depuis la {{t:small-blind|petite blinde}}, vous {{t:raise|relancez}} ou vous vous {{t:fold|couchez}}, sans compléter jusqu'à la {{t:big-blind|grosse blinde}}. Certains sites prélèvent aussi le {{t:rake}} sur les {{t:pot|pots}} 3-betés qui se terminent avant le flop ; là, le 3-bet n'en est pas exempt.

:::note Sources
Niveau du rake : comparaison du rake des sites en ligne de 2026 (grilles des deux plus grands sites converties en bb/100, consultée le 5 octobre 2026) ; d'autres sites ont d'autres chiffres. Perte de la population : rapport indépendant sur la population (cash NLHE 6-max, sites avec bases de suivi des mains, joueurs ayant au moins 100 mains ; l'auteur ne précise ni les sites ni la période). Effet du rake sur le jeu avant le flop : article publié sur les tailles de relance avant le flop, solutions de solveur pour des stacks de {{n:rake.solver.depth}} ; l'auteur écrit que les conclusions se transposent en grande partie à d'autres formats, donc pour un stack de {{n:format.stack}}, c'est une simplification. Le seuil d'équité est un calcul.
:::
