---
id: m4.l2
module: m4
order: 2
title: "Défendre la grosse blinde"
sub: "Prix du call et défense large"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "Le Bouton {{t:open|a ouvert}} à {{n:pf.open-size}}, la {{t:small-blind|petite blinde}} {{t:fold|s'est couchée}}. De quel pourcentage d'équité avez-vous besoin en {{t:big-blind|grosse blinde}} pour que {{t:call|suivre}} soit rentable (sans tenir compte du jeu après le flop) ? Saisissez un nombre."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Vous ajoutez {{n:bb.call.vs-btn}} dans un {{t:pot}} qui contient {{n:bb.pot-after.vs-btn}} une fois que vous avez {{t:call|suivi}} : {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} donne environ {{n:eq.bb-vs-btn-open}}. Il ne vous faudrait la moitié que si le {{t:pot}} ne contenait que la {{t:bet|mise}} de l'adversaire ; les blindes dans le {{t:pot}} améliorent le prix."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "La {{t:small-blind|petite blinde}} {{t:open|a ouvert}} à {{n:pf.open-size-sb}}. De combien d'équité avez-vous besoin en {{t:big-blind|grosse blinde}} pour {{t:call|suivre}} ?"
    table: { position: BB }
    options:
      - { text: "Environ {{n:eq.bb-vs-sb-open}}", correct: true, why: "Vous ajoutez {{n:bb.call.vs-sb}} dans un {{t:pot}} qui contient {{n:bb.pot-after.vs-sb}} une fois que vous avez {{t:call|suivi}} : cela fait environ {{n:eq.bb-vs-sb-open}}. Le prix est moins bon que face au Bouton, mais en revanche vous avez la {{t:position}} après le flop." }
      - { text: "Environ {{n:eq.bb-vs-btn-open}}", why: "C'est le prix face à une {{t:open|ouverture}} du Bouton à {{n:pf.open-size}}. La {{t:small-blind|petite blinde}} {{t:open|ouvre}} avec une taille plus grande, donc vous payez plus." }
      - { text: "Environ la moitié", why: "Il vous faudrait la moitié de l'équité si le {{t:pot}} ne contenait que la {{t:bet|mise}} de l'adversaire. Ici, il contient aussi les blindes, donc le prix est meilleur." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Pourquoi ne {{t:call|suivez-vous}} pas, en {{t:big-blind|grosse blinde}}, avec chaque main qui a environ {{n:eq.bb-vs-btn-open}} d'équité face à la {{t:range}} du Bouton ?"
    table: { position: BB }
    options:
      - { text: "Parce que {{t:out-of-position|hors de position}} vous ne réaliserez pas toute votre équité", correct: true, why: "L'équité est la chance de gagner si la main est jouée jusqu'au bout sans {{t:bet|mises}}. {{t:out-of-position|Hors de position}}, vous {{t:fold|coucherez}} souvent votre main avant le showdown, donc les mains faibles dépareillées réalisent moins que ce qu'indique leur équité." }
      - { text: "Parce que le Bouton a toujours une main forte", why: "Le Bouton {{t:open|ouvre}} très large, c'est pourquoi la défense de la {{t:big-blind|BB}} est large." }
      - { text: "Parce qu'il faut économiser ses {{t:chips|jetons}}", why: "Ce qui compte, c'est l'{{t:expected-value|espérance de gain}}, pas d'économiser ses {{t:chips|jetons}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "Le Bouton {{t:open|a ouvert}} à {{n:pf.open-size}}, la {{t:small-blind|petite blinde}} {{t:fold|s'est couchée}}. Vous avez QQ en {{t:big-blind|grosse blinde}}. Que faites-vous ?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet à {{n:pf.3bet.oop-total}}", correct: true, why: "QQ est une main de {{t:value|valeur}}. {{t:out-of-position|Hors de position}}, vous {{t:raise|relancez}} à environ {{n:pf.3bet.size-oop}} l'{{t:open|ouverture}}, pour que le Bouton ne {{t:call|suive}} pas à bas prix {{t:in-position|en position}}." }
      - { text: "3-bet à {{n:pf.3bet.ip-total}}", sizeError: true, why: "Bonne action, mais c'est la taille pour un joueur {{t:in-position|en position}} ({{n:pf.3bet.size-ip}} l'{{t:open|ouverture}}). {{t:out-of-position|Hors de position}}, vous {{t:raise|relancez}} plus : à {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Suivre}}", why: "Vous perdez de la valeur : avec QQ, vous voulez construire le {{t:pot}} avant le flop, pas jouer un petit {{t:pot}} {{t:out-of-position|hors de position}}." }
      - { text: "{{t:fold|Se coucher}}", why: "QQ est l'une des meilleures mains préflop. {{t:fold|Se coucher}} est une grosse erreur." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "Le Bouton {{t:open|a ouvert}} à {{n:pf.open-size}}, la {{t:small-blind|petite blinde}} {{t:fold|s'est couchée}}. Coloriez les mains avec lesquelles vous défendez la {{t:big-blind|grosse blinde}} (en {{t:call|suivant}} ou en 3-bettant)."
---
La {{t:big-blind|grosse blinde}} a déjà une blinde entière dans le {{t:pot}}, donc face à une {{t:open|ouverture}} elle n'a que peu à ajouter. Quand le Bouton {{t:open|ouvre}} à {{n:pf.open-size}} et que la {{t:small-blind|petite blinde}} {{t:fold|se couche}}, il vous faut seulement environ {{n:eq.bb-vs-btn-open}} d'équité pour {{t:call|suivre}}. C'est pourquoi la {{t:big-blind|grosse blinde}} défend le plus large de toutes les {{t:position|positions}}.

## Le prix ne fait pas tout

L'équité indique à quelle fréquence vous gagnez si vous arrivez tous les deux au showdown sans autres {{t:bet|mises}}. {{t:out-of-position|Hors de position}}, vous vous {{t:fold|coucherez}} souvent après le flop, donc les mains faibles dépareillées réalisent moins que leur équité. Les mains assorties, les {{t:connectors|connecteurs}} et les {{t:pair|paires}} moyennes réalisent davantage, c'est pourquoi, dans la grille, vous défendez plus volontiers avec elles.

```range
vs-open.bb-vs-btn
```

Les solutions de solveurs publiées défendent ici environ {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} des mains ({{t:call|suivre}} et 3-bet confondus). Le solveur de l'application, dont provient la grille, défend ici plus large que les solutions publiées.

## Face à la {{t:small-blind|petite blinde}}

La {{t:small-blind|petite blinde}} {{t:open|ouvre}} avec une taille plus grande, à {{n:pf.open-size-sb}}, donc il vous faut environ {{n:eq.bb-vs-sb-open}} d'équité pour {{t:call|suivre}}. Le prix est moins bon, mais vous avez la {{t:position}} après le flop, donc vous défendez toujours large : plus de la moitié des mains.

```range
vs-open.bb-vs-sb
```

Une solution de solveur publiée défend ici environ {{n:pf.bb-def.vs-sb.pub}} des mains. Le solveur de l'application, dont provient la grille, défend ici plus serré que la solution publiée.

:::note Comment {{t:raise|relancer}} depuis la {{t:big-blind|grosse blinde}}
Les grilles montrent avec quoi défendre, pas comment : 3-bet et {{t:call|suivre}} y sont réunis, car la composition des 3-bets de la {{t:big-blind|grosse blinde}} dans le solveur de l'application diffère des résultats publiés d'autres solveurs. Face au Bouton, un 3-bet depuis la {{t:big-blind|grosse blinde}} fait environ {{n:pf.3bet.size-oop}} l'{{t:open|ouverture}}. Vous 3-bettez vos mains les plus fortes (TT+, AQ+, AJs+) plus des {{t:bluff|bluffs}} pris en bas de la {{t:range}} avec laquelle vous {{t:call|suivez}} : A5s, parfois A4s, et des {{t:connectors|connecteurs}} assortis. Avec les {{t:pair|paires}} moyennes et petites, KQo et les as dépareillés, vous {{t:call|suivez}} généralement. Face à la {{t:small-blind|petite blinde}}, vous avez la {{t:position}}, donc vous {{t:raise|relancez}} moins, environ {{n:pf.3bet.size-ip}} l'{{t:open|ouverture}}. Vous 3-bettez alors surtout pour la {{t:value|valeur}} (TT+, AJs+, une partie des AQo et KQ), et vous {{t:call|suivez}} généralement avec A5s et les {{t:connectors|connecteurs}} assortis.
:::
