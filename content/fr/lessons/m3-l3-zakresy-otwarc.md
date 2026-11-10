---
id: m3.l3
module: m3
order: 3
title: "Ranges d'ouverture"
sub: "Avec quoi entrer en premier, position par position"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "Tous les joueurs avant vous se sont {{t:fold|couchés}}, vous êtes au Bouton. Coloriez les mains avec lesquelles vous {{t:open|ouvrez}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Vous parlez en premier ({{t:utg|UTG}}). Coloriez les mains avec lesquelles vous {{t:open|ouvrez}}."
---
Une {{t:range|range}} d'{{t:open|ouverture}} est la liste des mains avec lesquelles vous {{t:raise|relancez}} lorsque tous les joueurs avant vous se sont {{t:fold|couchés}}. Les grilles ci-dessous ont été calculées par le solveur préflop de cette application pour une table à 6 joueurs et des tapis de {{n:format.stack}}.

## Comment lire la grille

Chaque case correspond à un type de main. Au-dessus de la diagonale se trouvent les mains assorties (p. ex. AKs), en dessous les mains dépareillées (p. ex. AKo), et sur la diagonale les {{t:pair|paires}}. Une case verte signifie {{t:raise|relancer}}, une case vide {{t:fold|se coucher}}. Une case partiellement remplie signifie que le solveur ne joue la main que parfois. S'il l'{{t:open|ouvre}} à une fréquence comprise entre {{n:range.mixed.low}} et {{n:range.mixed.high}} (ces seuils sont un réglage de l'application), c'est une {{t:mixed-hand|main mixte}} : dans les exercices, nous acceptons alors les deux réponses. Une action que le solveur joue moins souvent que dans {{n:range.mixed.low}} des cas, mais au moins dans {{n:range.mixed.min}}, est considérée par les exercices comme acceptable : ce n'est pas une erreur, mais la révision de cet exercice reviendra plus tôt. Une action que le solveur joue moins souvent que dans {{n:range.mixed.min}} des cas est notée par les exercices comme une imprécision (c'est ainsi que l'échelle de notation publiée par le site du solveur appelle ces coups), et une action que le solveur ne joue jamais, comme une erreur.

## De la première {{t:position|position}} jusqu'au Bouton

```range
rfi.utg
```

Depuis {{t:utg|UTG}}, le solveur {{t:open|ouvre}} {{n:solver.rfi.utg}} des mains. Les sources professionnelles indiquent {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

À chaque {{t:position|position}} plus proche du Bouton, la {{t:range|range}} s'élargit : le {{t:hijack|HJ}} {{t:open|ouvre}} {{n:solver.rfi.hj}}, et le {{t:cutoff|CO}} déjà {{n:solver.rfi.co}} des mains.

```range
rfi.btn
```

Au Bouton, le solveur {{t:open|ouvre}} déjà {{n:solver.rfi.btn}} des mains, car il ne reste que les blindes et vous aurez la {{t:position|position}} après le flop.

```range
rfi.sb
```

La {{t:small-blind|petite blinde}} ne joue plus que contre la {{t:big-blind|grosse blinde}}, elle {{t:open|ouvre}} donc à peu près aussi large que le Bouton : environ {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} des mains, bien qu'elle parle en premier après le flop. En {{t:stakes|micro-limites}}, depuis la {{t:small-blind|petite blinde}}, vous {{t:raise|relancez}} ou vous vous {{t:fold|couchez}}, sans compléter la {{t:big-blind|grosse blinde}} : le {{t:rake|rake}} prélevé sur le {{t:pot|pot}} réduit le gain obtenu en complétant. C'est une simplification : certaines solutions de solveurs complètent avec une partie des mains depuis la {{t:small-blind|petite blinde}}. Le solveur de l'application {{t:open|ouvre}} d'ici {{n:solver.rfi.sb}} des mains, soit dans l'intervalle donné par les sources.

:::note À une table à 9 joueurs
À une table à 9 joueurs, il y a encore trois {{t:position|positions}} avant le {{t:hijack|HJ}} : {{t:utg|UTG}}, {{t:utg|UTG}}+1 et {{t:utg|UTG}}+2, suivies du LJ. Huit joueurs sont alors assis derrière {{t:utg|UTG}}, donc depuis {{t:utg|UTG}}, {{t:utg|UTG}}+1 et {{t:utg|UTG}}+2, vous {{t:open|ouvrez}} plus serré que depuis {{t:utg|UTG}} à une table à 6 joueurs : davantage de joueurs sont assis derrière vous. Lorsque ces trois joueurs se sont {{t:fold|couchés}}, le LJ joue comme {{t:utg|UTG}} à une table à 6 joueurs, et les {{t:position|positions}} suivantes de la même façon que dans les grilles ci-dessus. Pour les premières {{t:position|positions}} à une table à 9 joueurs, nous n'indiquons que la tendance : nous n'avons encore vérifié ni les chiffres ni la composition de ces {{t:range|ranges}} par rapport aux solutions de solveurs publiées.
:::

:::note Comment retenir
N'apprenez pas les {{n:combos.kinds}} cases par cœur. Retenez les limites : quelles {{t:pair|paires}}, quels as assortis et à partir de quelle carte commencent les mains dépareillées. Les exercices ci-dessous tirent justement plus souvent les mains situées à la limite de la {{t:range|range}}.
:::

Ces {{t:range|ranges}} proviennent d'un modèle qui simplifie le jeu après le flop ; c'est pourquoi, pour une bonne dizaine de mains à la limite de la {{t:range|range}}, elles diffèrent des tableaux professionnels, tantôt dans un sens, tantôt dans l'autre. Il s'agit surtout de mains assorties avec un trou (p. ex. 75s, 97s) et de mains dépareillées faibles (p. ex. A4o, K7o). Les exercices ne notent pas ces mains.
