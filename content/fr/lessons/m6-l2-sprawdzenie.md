---
id: m6.l2
module: m6
order: 2
title: "Suivre ou se coucher"
sub: "Défendre contre un c-bet hors position"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. Le {{t:pot|pot}} contient {{n:ex.third.pot}}, le Bouton {{t:bet|mise}} {{n:ex.third.bet}} en c-bet. De combien d'équité avez-vous besoin pour {{t:call|suivre}} ?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Vous payez {{n:ex.third.bet}} pour un {{t:pot|pot}} qui contiendra {{n:ex.third.total}} une fois que vous aurez {{t:call|suivi}} : {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Un petit c-bet offre un très bon prix." }
      - { text: "{{n:alpha.bet-third}}", why: "C'est l'alpha : la fréquence à laquelle le {{t:bluff|bluff}} du Bouton doit réussir. Pour l'équité requise, ajoutez aussi votre {{t:call|call}} au dénominateur." }
      - { text: "{{n:mdf.bet-third}}", why: "C'est la {{t:mdf|MDF}}, c'est-à-dire une part de votre {{t:range|range}}, et non l'équité d'une seule main. D'ailleurs, au flop {{t:out-of-position|hors position}}, vous défendez un peu moins que la {{t:mdf|MDF}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. Le {{t:pot|pot}} contient {{n:ex.pot}}, le Bouton {{t:bet|mise}} {{n:ex.bet.three-quarters}} en c-bet. Quel pourcentage d'équité vous faut-il pour {{t:call|suivre}} ? Saisissez un nombre."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Vous payez {{n:ex.bet.three-quarters}} pour un {{t:pot|pot}} qui contiendra {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}} une fois que vous aurez {{t:call|suivi}}. {{n:ex.bet.three-quarters}} ÷ cette somme = {{n:eq.bet-three-quarters}}. C'est presque deux fois plus que face à un c-bet de 1/4 du {{t:pot|pot}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "Même main sur le même flop. Une fois, le Bouton {{t:bet|mise}} 1/3 du {{t:pot|pot}}, une autre fois tout le {{t:pot|pot}}. Comment votre défense change-t-elle ?"
    table: { position: BB }
    options:
      - { text: "Face à une mise de tout le {{t:pot|pot}}, vous défendez une {{t:range|range}} plus étroite", correct: true, why: "Une mise plus grosse, c'est un moins bon prix : l'équité requise passe de {{n:eq.bet-third}} à {{n:eq.bet-pot}}, et la {{t:mdf|MDF}} baisse de {{n:mdf.bet-third}} à {{n:mdf.bet-pot}}. Les mains les plus faibles qui suivaient la petite mise, vous les {{t:fold|couchez}} désormais." }
      - { text: "Vous défendez de la même façon, car c'est la même main", why: "Même main, mais prix différent. Face à une mise de la taille du {{t:pot|pot}}, il vous faut {{n:eq.bet-pot}} d'équité au lieu de {{n:eq.bet-third}}." }
      - { text: "Face à une mise de tout le {{t:pot|pot}}, vous défendez plus large, car une grosse mise est plus souvent un {{t:bluff|bluff}}", why: "Cette règle n'existe pas. Une grosse mise indique généralement une {{t:range|range}} {{t:polarized|polarisée}} (mains très fortes et {{t:bluff|bluffs}}), et en tout cas un moins bon prix pour vous." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, le Bouton {{t:bet|mise}} 1/3 du {{t:pot|pot}} en c-bet. Que faites-vous ?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "La {{t:pair|paire}} moyenne bat tous les {{t:bluff|bluffs}} du Bouton (mains sans {{t:pair|paire}}), et il ne vous faut que {{n:eq.bet-third}} d'équité pour {{t:call|suivre}}. Une défense standard." }
      - { text: "{{t:fold|Se coucher}}", why: "Trop serré. Face à un petit c-bet, vous {{t:fold|couchez}} les mains les plus faibles sans {{t:pair|paire}} ni {{t:draw|tirage}}, pas une {{t:pair|paire}}." }
      - { text: "Check-raise", why: "En général, vous {{t:call|suivez}}. Après une {{t:raise|relance}}, ce sont surtout de meilleures mains et des {{t:draw|tirages}} qui vous paient ; check-raiser avec ce type de main est un coup rare du solveur face aux petits c-bets." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, le Bouton {{t:bet|mise}} 3/4 du {{t:pot|pot}} en c-bet. Que faites-vous ?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Se coucher}}", correct: true, why: "Vous n'avez ni {{t:pair|paire}} ni {{t:draw|tirage}} (aucun pique, et la {{t:straight|quinte}} est loin). Face à un gros c-bet, il vous faut {{n:eq.bet-three-quarters}} d'équité, et {{t:out-of-position|hors position}} vous irez rarement au showdown avec de simples cartes hautes. Une {{t:pair|paire}} de dames ou de valets ne gagnera pas toujours non plus." }
      - { text: "{{t:call|Suivre}}", why: "C'est tentant, car la dame et le valet sont plus hauts que le board. Mais des cartes hautes seules ne suffisent pas à ce prix : au turn, vous ferez souvent face à une nouvelle mise et vous vous {{t:fold|coucherez}}." }
      - { text: "Check-raise", why: "Pour un {{t:bluff|bluff}}, les mains avec un {{t:draw|tirage}}, qui ont une deuxième façon de gagner, conviennent mieux. Cette main n'en a aucune." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, le Bouton {{t:bet|mise}} 1/3 du {{t:pot|pot}} en c-bet. Que faites-vous ?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "Deux cartes hautes plus un {{t:flush-draw|tirage couleur}} supplémentaire (backdoor : trois piques, il vous faut un pique au turn et à la river). Au prix de {{n:eq.bet-third}}, cela suffit pour {{t:call|suivre}}." }
      - { text: "Check-raise", why: "En général, non. Vous check-raisez surtout avec vos mains et vos {{t:draw|tirages}} les plus forts ({{t:flush|couleur}}, {{t:oesd|tirage quinte bilatéral}}). Un {{t:flush-draw|tirage couleur}} supplémentaire est faible : quand le Bouton paie, il ne vous reste généralement que des cartes hautes. Avec cette main, vous {{t:call|suivez}}." }
      - { text: "{{t:fold|Se coucher}}", why: "Trop serré face à un petit c-bet. Le {{t:draw|tirage}} supplémentaire et deux cartes hautes donnent assez d'équité au prix de {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, le Bouton {{t:bet|mise}} 1/3 du {{t:pot|pot}} en c-bet. Que faites-vous ?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "Vous avez un gutshot à la {{t:straight|quinte}} (une dame) et un roi plus haut que le board. {{t:call|Suivre}} vous achète une carte : vous touchez le gutshot au turn dans environ {{n:odds.gutshot.flop-turn}} des cas, et le roi ajoute quelques outs vers la {{t:top-pair|top paire}}. Au total, c'est moins que le prix de {{n:eq.bet-third}}, mais si vous touchez la {{t:straight|quinte}}, vous gagnerez davantage (implied odds), et le roi seul bat parfois les {{t:bluff|bluffs}} du Bouton. Face à un petit c-bet, cela suffit pour {{t:call|suivre}}." }
      - { text: "{{t:fold|Se coucher}}", why: "Trop serré : un {{t:draw|tirage}} plus une carte haute, c'est suffisant face à un petit c-bet." }
      - { text: "Check-raise all-in", why: "Vous risquez tout votre stack avec une main qui n'a encore rien. Cette taille fait coucher les mains plus faibles, et seules les meilleures paient." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, le Bouton {{t:bet|mise}} 1/3 du {{t:pot|pot}} en c-bet. Que faites-vous ?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Se coucher}}", correct: true, why: "Vous n'avez ni {{t:pair|paire}} ni {{t:flush-draw|tirage couleur}} ; vous n'avez qu'un faible {{t:straight-draw|tirage quinte}} supplémentaire (il vous faut deux cartes précises), et aucune de vos cartes n'est plus haute que le board. Sur un flop avec un as et un roi, le Bouton a beaucoup de mains fortes. Le prix est bon, mais cette main ne le réalisera presque jamais." }
      - { text: "{{t:call|Suivre}}, car la {{t:mdf|MDF}} est de {{n:mdf.bet-third}}", why: "La {{t:mdf|MDF}} est un point de référence pour toute votre {{t:range|range}}, pas une raison de payer avec vos mains les plus faibles. Au flop {{t:out-of-position|hors position}}, vous pouvez défendre un peu moins que la {{t:mdf|MDF}}." }
      - { text: "Check-raise", why: "Sur un flop avec un as et un roi, l'{{t:range-advantage|avantage de range}} est du côté du Bouton, et vous n'avez pas de {{t:draw|tirage}} qui vous donnerait une deuxième façon de gagner." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Pourquoi ne pas {{t:call|suivre}} au flop {{t:out-of-position|hors position}} avec toute main dont l'équité dépasse, même légèrement, le prix ?"
    table: { position: BB }
    options:
      - { text: "Parce que vous ne réaliserez pas toute votre équité", correct: true, why: "L'équité, c'est votre chance si la main va au showdown sans autres {{t:bet|mises}}. {{t:out-of-position|Hors position}}, vous parlez en premier au turn et à la river, et vous vous {{t:fold|coucherez}} souvent face à une nouvelle mise. Les mains faibles réalisent alors moins que leur équité." }
      - { text: "Parce que le Bouton a toujours une main forte au flop", why: "Le Bouton {{t:open|ouvre}} et fait des c-bets large, y compris avec des {{t:bluff|bluffs}}. Le problème, c'est votre {{t:position|position}}, pas sa force." }
      - { text: "Parce qu'il faut économiser ses {{t:chips|jetons}} pour de meilleures occasions", why: "Ce qui compte, c'est l'{{t:expected-value|espérance de gain}} de chaque décision, pas l'économie de {{t:chips|jetons}}." }
---
Dans M5, vous avez joué le c-bet en tant qu'{{t:aggressor|agresseur}}. Vous êtes maintenant de l'autre côté : vous défendez la {{t:big-blind|grosse blinde}}, vous checkez au flop, et le Bouton {{t:bet|mise}} en c-bet. Rappel de M5 : un c-bet est une {{t:bet|mise}} du joueur qui a {{t:raise|relancé}} preflop, et l'{{t:range-advantage|avantage de range}} dépend de la {{t:texture|texture}} du flop.

## Le prix d'un c-bet

Calculez d'abord l'équité dont vous avez besoin (la formule de M2). Un petit c-bet offre un excellent prix, un gros un prix nettement moins bon.

| C-bet du Bouton | Équité requise | {{t:mdf|MDF}} |
|---|---|---|
| 1/4 du {{t:pot|pot}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 du {{t:pot|pot}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 du {{t:pot|pot}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 du {{t:pot|pot}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| Tout le {{t:pot|pot}} | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

La {{t:mdf|MDF}} indique la direction : plus la mise est grosse, moins vous défendez de mains. Au flop {{t:out-of-position|hors position}}, vous pouvez défendre un peu moins que la {{t:mdf|MDF}}, car les {{t:bluff|bluffs}} du Bouton ont encore de l'équité, mais face à un petit c-bet, vous ne vous {{t:fold|couchez}} pas en masse.

## {{t:out-of-position|Hors position}}, vous réalisez moins

L'équité, c'est votre chance si vous jouez jusqu'au bout sans autres {{t:bet|mises}}. {{t:out-of-position|Hors position}}, vous parlez en premier à chaque {{t:street|street}}, donc vous vous {{t:fold|coucherez}} souvent avant de voir le showdown. Les mains faibles sans {{t:draw|tirage}} réalisent moins que ne le laisse prévoir leur équité. Les mains assorties, les {{t:connectors|connecteurs}} et les {{t:pair|paires}} réalisent davantage, car elles touchent des mains fortes ou gagnent déjà.

## Avec quoi vous {{t:call|suivez}}

Face à un petit c-bet (environ 1/3 du {{t:pot|pot}}), vous continuez :

- avec presque toute {{t:pair|paire}}, y compris la paire moyenne et la plus basse,
- avec les {{t:flush-draw|tirages couleur}} et les tirages à la {{t:straight|quinte}}, y compris un gutshot avec une carte haute,
- avec des cartes hautes et un {{t:draw|tirage}} supplémentaire (backdoor), p. ex. trois cartes d'une même couleur,
- généralement aussi avec un as comme carte la plus haute.

Rappel de M2 : {{t:call|suivre}} une {{t:bet|mise}} au flop vous achète une carte, donc vous comparez un {{t:draw|tirage}} avec votre chance au turn. Cette chance est parfois un peu inférieure au prix d'un petit c-bet. {{t:call|Suivre}} reste rentable quand, après avoir touché, vous gagnerez plus que ce qui se trouve actuellement dans le {{t:pot|pot}} (ce qu'on appelle les implied odds, que vous calculerez dans M7), ou quand la main gagne parfois sans toucher, p. ex. grâce à une carte haute.

## Ce que vous {{t:fold|couchez}}

- les mains sans {{t:pair|paire}} ni {{t:draw|tirage}} qui n'ont ni as ni cartes plus hautes que le board ; sur les flops avec un as, vous en {{t:fold|couchez}} davantage,
- généralement deux cartes hautes sans {{t:draw|tirage}} quand le c-bet est gros (sur les flops {{t:dry|secs}} avec un roi, le solveur {{t:call|suit}} toutefois avec beaucoup de mains contenant un as) ; vous {{t:call|suivez}} plutôt quand vous avez un {{t:draw|tirage}} supplémentaire, idéalement vers la meilleure {{t:flush|couleur}} possible.

À mesure que le c-bet augmente, les mains suivantes parmi les plus faibles passent du {{t:call|call}} au fold.
