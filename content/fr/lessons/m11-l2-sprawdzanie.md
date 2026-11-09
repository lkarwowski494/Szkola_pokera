---
id: m11.l2
module: m11
order: 2
title: "Suivre un all-in"
sub: "De combien d'équité vous avez besoin et pourquoi vous suivez plus serré"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Vous avez {{n:m11.depth.10}} en {{t:big-blind|grosse blinde}}, sans ante. La {{t:small-blind|petite blinde}} a fait all-in pour {{n:m11.depth.10}}. De quel pourcentage d'équité avez-vous besoin pour qu'un {{t:call|call}} soit rentable ? Saisissez un nombre."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Votre blinde est déjà dans le {{t:pot|pot}}, vous ajoutez donc {{n:m11.call.10.cost}}. Après le {{t:call|call}}, le {{t:pot|pot}} est de {{n:m11.call.10.pot}} : {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Même spot, mais les stacks sont de {{n:m11.depth.5}} chacun. De combien d'équité avez-vous besoin pour {{t:call|suivre}} l'all-in ?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Vous ajoutez {{n:m11.call.5.cost}} à un {{t:pot|pot}} qui est de {{n:m11.call.5.pot}} après le {{t:call|call}} : {{n:m11.call.5.eq}}. Avec un stack plus court, la blinde représente une plus grande part du stack, donc le prix est meilleur." }
      - { text: "{{n:m11.call.10.eq}}", why: "C'est le prix à {{n:m11.depth.10}}. À {{n:m11.depth.5}}, votre blinde représente une plus grande part de votre stack entier, il vous faut donc moins : {{n:m11.call.5.eq}}." }
      - { text: "La moitié", why: "Il vous faudrait la moitié si vous mettiez tout votre stack. La blinde est déjà dans le {{t:pot|pot}}, vous n'ajoutez donc que {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacks de {{n:m11.depth.15}} chacun, la {{t:small-blind|petite blinde}} a fait all-in. De combien d'équité avez-vous besoin pour {{t:call|suivre}} ?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Vous ajoutez {{n:m11.call.15.cost}} à un {{t:pot|pot}} de {{n:m11.call.15.pot}} : {{n:m11.call.15.eq}}. Plus le stack est profond, plus on se rapproche de la moitié." }
      - { text: "{{n:m11.call.5.eq}}", why: "C'est le prix à {{n:m11.depth.5}}. À {{n:m11.depth.15}}, la blinde représente une plus petite part du stack, donc le prix monte à {{n:m11.call.15.eq}}." }
      - { text: "Plus de la moitié", why: "Même avec un stack très profond, le prix ne dépasse pas la moitié : vous avez toujours votre blinde dans le {{t:pot|pot}}." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "Vous avez {{n:m11.depth.10}} en {{t:big-blind|grosse blinde}}, la {{t:small-blind|petite blinde}} a fait all-in. Coloriez les mains avec lesquelles vous {{t:call|suivez}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "À {{n:m11.depth.10}}, le solveur fait all-in depuis la {{t:small-blind|petite blinde}} avec sept-six assortis (76s). Vous avez cette main en {{t:big-blind|grosse blinde}} et c'est la {{t:small-blind|petite blinde}} qui a fait all-in. Que faites-vous ?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "Je {{t:fold|me couche}}", correct: true, why: "L'all-in avec 76s est rentable surtout parce que l'adversaire {{t:fold|se couche}}. En {{t:call|suivant}}, vous ne gagnez qu'à l'abattage, et contre une {{t:range|range}} d'all-in qui contient beaucoup de hautes cartes et de {{t:pair|paires}}. Le solveur {{t:fold|se couche}} avec cette main." }
      - { text: "Je {{t:call|suis}}, car depuis la {{t:small-blind|petite blinde}} je ferais all-in avec", why: "Le {{t:call|call}} est une autre situation : vous n'avez pas de fold equity, et la {{t:range|range}} adverse est plus forte qu'une range aléatoire. Pour {{t:call|suivre}}, il vous faut une main plus forte." }
      - { text: "Je {{t:call|suis}}, car une main assortie se développe bien", why: "Après un all-in, il n'y a plus de jeu où la main pourrait se développer. Seule compte l'équité jusqu'à l'abattage." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Grosse blinde}}, la {{t:small-blind|petite blinde}} a fait all-in. Vous avez une {{t:pair|paire}} de deux. À {{n:m11.depth.10}}, le solveur {{t:call|suit}}. Et à {{n:m11.depth.15}} ?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "Il {{t:fold|se couche}}", correct: true, why: "À {{n:m11.depth.15}}, le prix monte à {{n:m11.call.15.eq}}, et la {{t:range|range}} d'all-in est plus serrée (env. {{n:m11.push.15}} mains), donc la {{t:pair|paire}} de deux tombe plus souvent sur une {{t:pair|paire}} supérieure. La {{t:range|range}} de {{t:call|call}} passe d'env. {{n:m11.call.10}} à env. {{n:m11.call.15}} mains." }
      - { text: "Il {{t:call|suit}}, car une {{t:pair|paire}} est toujours favorite", why: "Une {{t:pair|paire}} de deux contre deux cartes plus hautes, c'est à peu près pile ou face, et contre toute {{t:pair|paire}} supérieure elle est nettement outsider. Avec un stack plus profond, l'adversaire {{t:shove|fait tapis}} avec moins de mains faibles, donc les {{t:pair|paires}} constituent une plus grande part de sa {{t:range|range}}." }
      - { text: "Il {{t:call|suit}}, car plus le stack est profond, plus on suit large", why: "C'est l'inverse : plus le stack est profond, plus le {{t:call|call}} coûte cher et plus la {{t:range|range}} de {{t:call|call}} est serrée." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "À {{n:m11.depth.10}}, la {{t:small-blind|petite blinde}} fait all-in avec env. {{n:m11.push.10}} mains, mais la {{t:big-blind|grosse blinde}} ne {{t:call|suit}} qu'avec env. {{n:m11.call.10}}. Pourquoi ?"
    options:
      - { text: "Celui qui suit n'a pas de fold equity et joue contre une {{t:range|range}} plus forte qu'une range aléatoire", correct: true, why: "Un all-in gagne aussi quand l'adversaire {{t:fold|se couche}}. Un {{t:call|call}} ne gagne qu'à l'abattage, et contre des mains déjà sélectionnées. D'où la vieille règle : pour {{t:call|suivre}}, il faut une meilleure main que pour faire all-in en premier." }
      - { text: "La {{t:big-blind|grosse blinde}} paie plus", why: "Les deux risquent le même stack, et la {{t:big-blind|BB}} a déjà sa blinde dans le {{t:pot|pot}}, elle ajoute donc même moins." }
      - { text: "Le solveur se trompe", why: "C'est l'équilibre d'un jeu où l'on fait all-in ou l'on {{t:fold|se couche}} : aucun joueur ne peut gagner plus en changeant seulement sa propre {{t:range|range}}. La différence vient de la fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "La partie se joue avec {{t:bb-ante|big blind ante}}. Vous avez {{n:m11.depth.10}} en {{t:big-blind|grosse blinde}} et avez payé une ante de {{n:m11.ante}}. La {{t:small-blind|petite blinde}} a fait all-in. De combien d'équité avez-vous besoin pour {{t:call|suivre}} ?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Vous ajoutez le même montant ({{n:m11.call.10.cost}}), mais le {{t:pot|pot}} contient aussi l'ante : après le {{t:call|call}}, {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. C'est pourquoi, avec ante, vous {{t:call|suivez}} plus large : env. {{n:m11.call.10-ante}} mains au lieu de {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "C'est le prix sans ante. L'ante reste dans le {{t:pot|pot}}, donc pour le même complément vous gagnez plus : {{n:m11.call.10-ante.eq}}." }
      - { text: "Plus que sans ante, car vous avez mis davantage", why: "L'ante est de l'argent déjà dépensé. Seuls comptent ce que vous devez encore ajouter et ce que vous pouvez gagner." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "Trois joueurs, stacks de {{n:m11.depth.3max}} chacun. Le Bouton a fait all-in, la {{t:small-blind|petite blinde}} a {{t:call|suivi}}. En {{t:big-blind|grosse blinde}}, il ne vous faut que {{n:m11.3max.bb-two.eq}} d'équité. {{t:call|Suivez}}-vous plus large que lorsque le Bouton était seul à faire all-in ?"
    table: { position: BB }
    options:
      - { text: "Non, plus serré", correct: true, why: "Le prix est meilleur, mais vous jouez contre deux {{t:range|ranges}}, dont celle du joueur qui a suivi et qui a une main forte. Le solveur {{t:call|suit}} ici avec env. {{n:m11.3max.call.bb-two}} mains, et quand seul le Bouton est all-in, avec env. {{n:m11.3max.call.bb}}." }
      - { text: "Oui, car le prix est bien meilleur", why: "Un meilleur prix ne suffit pas : contre deux adversaires, l'équité des mains plus faibles chute vite. Le solveur ne {{t:call|suit}} qu'avec env. {{n:m11.3max.call.bb-two}} mains." }
      - { text: "Pareil, car seule votre main compte", why: "Ce qui compte, c'est l'équité face aux mains adverses. Celui qui suit l'all-in du Bouton a une {{t:range|range}} plus forte que le Bouton, vous {{t:call|suivez}} donc plus serré." }
---
Quand un adversaire fait all-in et que vous êtes en {{t:big-blind|grosse blinde}}, la décision est simple dans sa forme : vous {{t:call|suivez}} ou vous vous {{t:fold|couchez}}. Après un {{t:call|call}}, il n'y a plus de jeu, donc seuls comptent le prix et votre équité face à la {{t:range|range}} d'all-in.

## Le prix d'un {{t:call|call}}

Votre blinde est déjà dans le {{t:pot|pot}}. Avec un stack de {{n:m11.depth.10}}, vous ajoutez {{n:m11.call.10.cost}}, et le {{t:pot|pot}} après le {{t:call|call}} est de {{n:m11.call.10.pot}}.

```formula
équité nécessaire = complément ÷ pot après le call
```

| Stack | Complément | {{t:pot|Pot}} après le {{t:call|call}} | Équité nécessaire |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Plus le stack est court, meilleur est le prix, car votre blinde représente une plus grande part de votre stack entier.

## Vous {{t:call|suivez}} plus serré que vous ne {{t:shove|faites tapis}}

En faisant all-in en premier, vous gagnez aussi quand l'adversaire {{t:fold|se couche}}. En {{t:call|suivant}}, vous ne gagnez qu'à l'abattage, et contre des mains que l'adversaire a choisies pour faire all-in. C'est pourquoi, pour {{t:call|suivre}}, il vous faut une meilleure main que pour faire all-in en premier (dans la littérature, on parle de « gap concept »).

```range
call.bb-10
```

À {{n:m11.depth.10}}, la {{t:small-blind|petite blinde}} fait all-in avec env. {{n:m11.push.10}} mains, et la {{t:big-blind|grosse blinde}} {{t:call|suit}} avec env. {{n:m11.call.10}}. Des mains comme [[7s 6s]], vous {{t:shove|faites tapis}} avec depuis la {{t:small-blind|petite blinde}}, mais vous vous {{t:fold|couchez}} avec face à un all-in : sans fold equity, elles ont trop peu d'équité contre les hautes cartes et les {{t:pair|paires}}. À titre de comparaison, la table d'un site de formation donne à {{n:m11.depth.10}} une {{t:range|range}} de {{t:call|call}} de {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Un stack plus profond signifie un {{t:call|call}} plus cher et une {{t:range|range}} d'all-in adverse plus serrée, donc vous {{t:call|suivez}} moins souvent : env. {{n:m11.call.15}} à {{n:m11.depth.15}}, et à {{n:m11.depth.5}} jusqu'à env. {{n:m11.call.5}}.

## Quand quelqu'un parle encore après vous

À trois joueurs et avec des stacks de {{n:m11.depth.3max}} chacun, la {{t:small-blind|petite blinde}} ne {{t:call|suit}} l'all-in du Bouton qu'avec env. {{n:m11.3max.call.sb}} mains, bien qu'il lui faille {{n:m11.3max.sb.eq}} d'équité. La {{t:big-blind|grosse blinde}}, dans la même situation, quand la {{t:small-blind|petite blinde}} s'est {{t:fold|couchée}}, ajoute {{n:m11.3max.bb.cost}} à un {{t:pot|pot}} de {{n:m11.3max.bb.pot}}, a besoin de {{n:m11.3max.bb.eq}} d'équité et {{t:call|suit}} avec env. {{n:m11.3max.call.bb}}. La différence vient surtout du joueur qui parle après vous (les prix diffèrent peu) : la {{t:small-blind|petite blinde}} peut {{t:call|suivre}} et tomber sur une main encore plus forte de la {{t:big-blind|grosse blinde}}.

```range
call.sb-vs-btn-3max
```

Quand deux joueurs sont déjà all-in, le prix descend à {{n:m11.3max.bb-two.eq}}, et pourtant la {{t:big-blind|grosse blinde}} ne {{t:call|suit}} qu'avec env. {{n:m11.3max.call.bb-two}} mains. Contre deux {{t:range|ranges}}, dont l'une a déjà {{t:call|suivi}} l'all-in, les mains plus faibles perdent vite de l'équité.

```range
call.bb-vs-two-3max
```

## Avec une ante, vous {{t:call|suivez}} plus large

L'ante reste dans le {{t:pot|pot}}, donc pour le même complément vous gagnez plus : à {{n:m11.depth.10}} avec une {{t:bb-ante|big blind ante}} de {{n:m11.ante}}, il vous faut {{n:m11.call.10-ante.eq}} au lieu de {{n:m11.call.10.eq}}. Avec une ante, l'adversaire {{t:shove|fait}} aussi {{t:shove|tapis}} plus large, donc le solveur {{t:call|suit}} avec env. {{n:m11.call.10-ante}} mains.

```range
call.bb-10-ante
```

:::note {{t:range|Ranges}} de cette leçon
Les grilles concernent le jeu à deux : la {{t:small-blind|petite blinde}} contre la {{t:big-blind|grosse blinde}} quand tous les autres se sont {{t:fold|couchés}}, et elles comptent des {{t:chips|jetons}}, pas de l'argent. Quand, en {{t:tournament|tournoi}}, les {{t:payout|gains}} comptent, vous {{t:call|suivez}} encore plus serré (leçon suivante).
:::
