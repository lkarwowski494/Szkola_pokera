---
id: m9.l4
module: m9
order: 4
title: "Un plan sur trois streets"
sub: "Combien de streets de valeur une main peut supporter"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Button et la {{t:big-blind}} a {{t:call|suivi}}. Vous avez touché un set sur un flop {{t:dry|sec}}. Combien de {{t:value|streets de valeur}} cette main peut-elle supporter ?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Trois", correct: true, why: "Un set sur un flop {{t:dry|sec}} est presque toujours la meilleure main. À chaque {{t:street|street}}, les mains plus faibles de l'adversaire (p. ex. un roi, un sept, une {{t:pair}}) peuvent encore payer, donc vous prévoyez de {{t:bet|miser}} au flop, au turn et à la river." }
      - { text: "Une", why: "Trop peu : avec une main aussi forte, une seule {{t:bet|mise}} laisse sur le {{t:board|board}} l'essentiel de la valeur. Un adversaire avec un roi paiera plus d'une fois." }
      - { text: "Aucune : je {{t:check|checke}} pour ne pas effrayer l'adversaire", why: "{{t:check|Checker}} à toutes les {{t:street|streets}} ne fait pas grossir le {{t:pot|pot}}. Un set veut que le {{t:pot}} grossisse, car il gagne généralement au showdown." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Button, la {{t:big-blind}} a {{t:call|suivi}}, {{t:spr}} d'environ {{n:spr.srp}}. Vous avez la {{t:top-pair|top paire}} avec le meilleur kicker. Quel plan ?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Généralement deux {{t:value|streets de valeur}}, sans prévoir de jouer tout le stack", correct: true, why: "Oui : les rois et les huit plus faibles paient généralement une ou deux {{t:bet|mises}}. Quand il y a beaucoup d'argent dans le {{t:pot|pot}}, ce sont surtout des mains meilleures qu'une seule {{t:pair|paire}} qui paient. Avec un {{t:spr}} d'environ {{n:spr.srp}}, tout le stack n'entrerait qu'avec des {{t:bet|mises}} plus grosses que le {{t:pot}}." }
      - { text: "Trois {{t:street|streets}} de grosses {{t:bet|mises}} jusqu'à l'all-in", why: "Avec un {{t:spr}} d'environ {{n:spr.srp}}, cela fait des {{t:bet|mises}} d'environ {{n:geo.srp.3}} du {{t:pot|pot}} à chaque {{t:street|street}}. À la river, il restera dans le {{t:pot|pot}} surtout des {{t:two-pair|doubles paires}} et des sets, qui battent une seule {{t:pair|paire}}." }
      - { text: "Une {{t:street}} ou aucune", why: "Trop prudent : la {{t:top-pair}} avec le meilleur kicker sur un flop {{t:dry|sec}} bat beaucoup de mains de l'adversaire. Elle supporte généralement deux {{t:value|streets de valeur}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Button, la {{t:big-blind}} a {{t:call|suivi}}. Vous avez une {{t:pair|paire}} intermédiaire. Combien de {{t:value|streets de valeur}} cette main peut-elle supporter ?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Une ou aucune : arriver au showdown suffit souvent", correct: true, why: "Oui : la {{t:pair}} intermédiaire bat les {{t:bluff|bluffs}} et les {{t:pair|paires}} plus faibles, mais les mains plus faibles qui paieront plusieurs {{t:bet|mises}} sont rares. Le plan : au plus une petite {{t:bet}}, ou {{t:check}} puis {{t:call}}." }
      - { text: "Deux, comme la {{t:top-pair}}", why: "La {{t:pair}} intermédiaire perd contre chaque roi. Après la deuxième {{t:bet|mise}}, ce sont surtout des mains qui la battent qui paient." }
      - { text: "Trois, pour que l'adversaire ne touche pas", why: "Trois {{t:bet|mises}} avec une {{t:pair|paire}} intermédiaire profitent surtout aux mains meilleures : les mains plus faibles {{t:fold|se couchent}} dès la première ou la deuxième {{t:bet|mise}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Pot}} 4-bet, {{t:spr}} d'environ {{n:spr.4bet}}. Vous avez la {{t:top-pair|top paire}} avec le meilleur kicker. La main supporte deux {{t:value|streets de valeur}}. Quel plan ?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Deux {{t:bet|mises}} d'environ {{n:geo.4bet.2}} du {{t:pot|pot}} : tout le stack entre au turn", correct: true, why: "Oui : avec un {{t:spr}} d'environ {{n:spr.4bet}}, deux {{t:street|streets}} suffisent pour mettre tout le stack. Ici, deux {{t:value|streets de valeur}} avec la {{t:top-pair|top paire}}, c'est jouer tout le stack." }
      - { text: "Petite {{t:bet|mise}}, puis {{t:fold|se coucher}} face à un all-in", why: "Avec un {{t:spr}} d'environ {{n:spr.4bet}}, {{t:fold|se coucher}} face à un all-in avec la {{t:top-pair|top paire}} avec un as, c'est abandonner trop : il vous suffit d'environ {{n:eq.jam.4bet}} d'équité, et encore moins après votre propre {{t:bet|mise}}." }
      - { text: "Je {{t:check|checke}} à chaque {{t:street|street}} pour contrôler le {{t:pot|pot}}", why: "Le contrôle du {{t:pot|pot}} a du sens avec un {{t:spr}} élevé. Ici, le {{t:pot}} est déjà gros par rapport au stack, et les mains plus faibles (AQ, QQ, JJ) mettront volontiers le reste." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Pot}} 3-bet, vous avez la {{t:position}}, {{t:spr}} d'environ {{n:spr.3bet-ip}}. Vous avez un set et voulez mettre tout le stack d'ici la river. Quelle ligne ?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Mise}} au flop, au turn et à la river, chaque fois d'environ {{n:geo.3bet-ip.3}} du {{t:pot|pot}}", correct: true, why: "Oui : {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} et {{n:geo.3bet-ip.river}} font au total {{n:geo.3bet-ip.total}}, soit tout le stack. À chaque {{t:street|street}}, l'adversaire paie une part raisonnable du {{t:pot|pot}}." }
      - { text: "{{t:bet|Mise}} de 1/3 du {{t:pot|pot}} à chaque {{t:street|street}}", sizeError: true, why: "Bonne ligne, mauvaise taille : trois {{t:bet|mises}} de 1/3 du {{t:pot|pot}} ne mettent qu'environ {{n:g3b.third.total}} sur {{n:spr.3bet-ip.stack}}. Un plan pour tout le stack demande environ {{n:geo.3bet-ip.3}} du {{t:pot|pot}}." }
      - { text: "Je {{t:check|checke}} au flop et au turn, puis all-in à la river", why: "À la river, un all-in pour tout le stack serait une {{t:bet|mise}} plusieurs fois plus grosse que le {{t:pot}}. L'adversaire ne la paiera qu'avec une main très forte, et les mains plus faibles qui auraient payé trois {{t:bet|mises}} plus petites {{t:fold|se coucheront}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Pourquoi vaut-il mieux fixer le plan sur trois {{t:street|streets}} dès le flop ?"
    options:
      - { text: "Parce que la taille au flop détermine combien on pourra mettre ensuite", correct: true, why: "Oui : le {{t:pot}} grossit par multiplication. Une petite {{t:bet}} au flop laisse un petit {{t:pot|pot}} au turn et à la river, donc il est ensuite difficile de mettre tout le stack sans de très grosses {{t:bet|mises}}." }
      - { text: "Parce qu'on n'a pas le droit de changer de plan ensuite", why: "Vous changez de plan quand la situation change (p. ex. une carte menaçante au turn). L'idée est que votre première {{t:bet}} corresponde à l'objectif : combien de {{t:value|streets de valeur}}, et faut-il jouer tout le stack." }
      - { text: "Parce que l'adversaire voit votre plan", why: "L'adversaire ne connaît pas votre plan. Le plan vous aide, vous, à choisir la taille pour qu'à la fin il y ait dans le {{t:pot|pot}} autant que la main peut supporter." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Pot}} à une seule relance, {{t:spr}} d'environ {{n:spr.srp}}. Vous avez la {{t:top-pair|top paire}} avec un bon kicker. Misez-vous la taille géométrique d'environ {{n:geo.srp.3}} du {{t:pot|pot}} ?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "Non : c'est une taille pour tout le stack, et cette main supporte généralement deux {{t:street|streets}}", correct: true, why: "Oui : la taille géométrique sert à mettre tout le stack. Avec des {{t:bet|mises}} plus grosses que le {{t:pot}}, les mains plus faibles cessent de payer, et il reste les mains meilleures qu'une seule {{t:pair|paire}}." }
      - { text: "Oui : je mise toujours de façon géométrique", why: "La taille géométrique correspond à un plan pour tout le stack. La {{t:top-pair|top paire}} avec un {{t:spr}} d'environ {{n:spr.srp}} n'a généralement pas ce plan." }
      - { text: "Non : avec la {{t:top-pair|top paire}}, je {{t:check|checke}} toujours", why: "La {{t:top-pair|top paire}} veut des {{t:bet|mises}} de valeur, simplement plus petites et généralement sur deux {{t:street|streets}}, et non pour tout le stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}} : {{n:ex.pot}} dans le {{t:pot|pot}}, stacks de {{n:commit.stack}} chacun. Vous misez environ {{n:geo.spr2.2}} du {{t:pot|pot}} au flop et au turn, l'adversaire {{t:call|suit}}. Qu'en est-il du reste du stack ?"
    options:
      - { text: "Après le turn, tout le stack est dans le {{t:pot|pot}}", correct: true, why: "Oui : {{n:geo.spr2.flop}} au flop et {{n:geo.spr2.turn}} au turn font au total {{n:geo.spr2.total}}. C'est pourquoi, avec un {{t:spr}} de {{n:spr.commit}}, deux {{t:value|streets de valeur}} avec la {{t:top-pair|top paire}} suffisent pour jouer tout le stack." }
      - { text: "Il reste à peu près la moitié pour la river", why: "Le {{t:pot|pot}} grossit par multiplication : après le flop, il contient environ {{n:geo.spr2.flop-after}}, et une {{t:bet|mise}} d'environ {{n:geo.spr2.2}} au turn représente environ {{n:geo.spr2.turn}}, soit le reste du stack." }
      - { text: "Il reste presque tout le stack", why: "Avec un {{t:spr}} de {{n:spr.commit}}, le stack ne vaut que {{n:spr.commit}} {{t:pot|pots}}. Deux {{t:bet|mises}} d'environ {{n:geo.spr2.2}} du {{t:pot|pot}} mettent la totalité des {{n:geo.spr2.total}}." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Un bon plan commence au flop, avant de {{t:bet|placer}} votre première {{t:bet|mise}}. Demandez-vous : combien de {{t:value|streets de valeur}} ma main peut-elle supporter, et est-ce que je veux jouer tout le stack ? La réponse associe la force de la main au {{t:spr}}.

## Combien de {{t:value|streets de valeur}}

À chaque {{t:street|street}}, les mains plus faibles de l'adversaire {{t:fold|se couchent}}, et il reste dans le {{t:pot|pot}} surtout des mains meilleures que la vôtre. C'est pourquoi une main plus forte supporte plus de {{t:bet|mises}} :

| Main | {{t:value|Streets de valeur}} (généralement) |
|---|---|
| Très forte : set, {{t:straight|quinte}}, {{t:two-pair|double paire}} haute | Trois |
| {{t:top-pair|Top paire}} avec un bon kicker, {{t:overpair|overpaire}} | Deux ; une troisième quand l'adversaire paie avec des mains plus faibles |
| {{t:pair|Paire}} plus faible (intermédiaire, basse) | Une ou aucune |

Les nombres de {{t:street|streets}} du tableau sont une simplification : beaucoup dépend de la {{t:texture}} du {{t:board}}, des cartes du turn et de la river, ainsi que de l'adversaire.

## Associez la main au {{t:spr}}

- **Main sur trois {{t:street|streets}}, la zone de {{t:spr}} permet de jouer le stack et vous voulez tout le stack :** misez la taille géométrique dès le flop (dans un {{t:pot|pot}} 3-bet {{t:in-position}}, environ {{n:geo.3bet-ip.3}} du {{t:pot|pot}}).
- **Main sur deux {{t:street|streets}} avec un {{t:spr}} bas :** avec un {{t:spr}} d'environ {{n:spr.commit}}, deux {{t:bet|mises}} d'environ {{n:geo.spr2.2}} du {{t:pot|pot}} représentent déjà tout le stack, donc vous jouez le stack.
- **Main sur deux {{t:street|streets}} avec un {{t:spr}} élevé :** dans un {{t:pot|pot}} à une seule relance ({{t:spr}} d'environ {{n:spr.srp}}), vous misez pour la valeur, mais sans prévoir de mettre tout le stack.

Trois {{t:value|streets de valeur}}, ce n'est pas la même chose que jouer tout le stack. Une {{t:two-pair|double paire}} haute supporte trois {{t:street|streets}}, mais dans un {{t:pot|pot}} à une seule relance ({{t:spr}} d'environ {{n:spr.srp}}, au-dessus de {{n:spr.zone.deep}}), elle ne joue généralement pas tout le stack : dans cette zone, ce sont le set, la {{t:straight|quinte}} et les mains meilleures qui jouent le stack (zones de {{t:spr}} de la première leçon).

## Lignes

Une ligne est un plan d'actions sur les {{t:street|streets}} successives. Quelques lignes de base :

- **{{t:bet}}, {{t:bet}}, {{t:bet}} :** main pour trois {{t:value|streets de valeur}},
- **{{t:bet}}, {{t:bet}}, {{t:check}} :** main pour deux {{t:street|streets}}, à la river vous allez au showdown,
- **{{t:bet}} ou {{t:check}}, puis {{t:check}} et {{t:call}} :** {{t:pair|paire}} plus faible qui veut arriver au showdown à moindre coût.

## La taille au flop fixe la suite

Le {{t:pot|pot}} grossit par multiplication, donc une petite {{t:bet}} au flop laisse un petit {{t:pot|pot}} pour les {{t:street|streets}} suivantes. Dans un {{t:pot|pot}} 3-bet, trois {{t:bet|mises}} de 1/3 du {{t:pot|pot}} ne mettent qu'environ {{n:g3b.third.total}} d'un stack de {{n:spr.3bet-ip.stack}}, alors que trois {{t:bet|mises}} d'environ {{n:geo.3bet-ip.3}} du {{t:pot|pot}} mettent tout le stack.

:::note Un plan n'est pas un verdict
Au turn et à la river, vous réévaluez le plan : une carte menaçante peut réduire le nombre de {{t:value|streets de valeur}}. Les modules M7 et M8 enseignent comment jouer le turn et la river. Le nombre de {{t:value|streets de valeur}} par classe de mains est une heuristique, une synthèse de plusieurs supports de formation : dans un {{t:pot|pot}} à une seule relance, le {{t:spr}} est trop élevé pour que beaucoup de {{t:top-pair|top paires}} récoltent confortablement trois {{t:value|streets de valeur}}.
:::
