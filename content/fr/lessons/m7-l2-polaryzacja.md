---
id: m7.l2
module: m7
order: 2
title: "Polarisation"
sub: "Grosse mise : mains fortes et semi-bluffs"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Quelle {{t:range}} de mise au turn est {{t:polarized|polarisée}} ?"
    options:
      - { text: "Sets, {{t:two-pair|doubles paires}} et {{t:draw|tirages}}, sans {{t:pair|paires}} moyennes", correct: true, why: "Oui : une {{t:range}} {{t:polarized|polarisée}} a deux pôles, les mains très fortes et les {{t:semi-bluff|semi-bluffs}}. Le milieu, c'est-à-dire les mains moyennes, n'en fait pas partie : ces mains {{t:check|checkent}}." }
      - { text: "{{t:top-pair|Top paires}}, {{t:pair|paires}} moyennes et {{t:pair|paires}} plus faibles", why: "Ici, il n'y a aucun pôle : il manque les mains très fortes et les {{t:semi-bluff|semi-bluffs}}, il n'y a que des {{t:pair|paires}}, de la plus haute à la plus basse. Cela ressemble davantage à une {{t:range}} {{t:linear|linéaire}}, qui mise surtout des mains de valeur, généralement avec une petite taille, et non une grosse au turn." }
      - { text: "Uniquement des {{t:bluff|bluffs}}", why: "L'adversaire repérera facilement une {{t:range}} sans mains fortes et {{t:call|suivra}}. Une {{t:range}} {{t:polarized|polarisée}} associe des {{t:bluff|bluffs}} à des mains très fortes." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Sur le flop {{t:dry|sec}} [[Ks 7d 2c]], vous avez misé petit avec presque toutes vos mains : du set aux {{t:pair|paires}} faibles. Comment s'appelle une telle {{t:range}} de mise ?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Linéaire}}", correct: true, why: "Oui : les mains fortes et moyennes misent ensemble, avec une petite taille. C'est le plan du M5 sur un flop {{t:dry|sec}} et haut, où vous avez l'{{t:range-advantage|avantage de range}}." }
      - { text: "{{t:polarized|Polarisée}}", why: "Une {{t:range}} {{t:polarized|polarisée}} n'a pas de mains moyennes : seules les mains très fortes et les {{t:bluff|bluffs}} misent. Ici, les {{t:pair|paires}} faibles ont misé aussi." }
      - { text: "Plafonnée", why: "Une {{t:range}} plafonnée est celle à laquelle il manque les mains les plus fortes. Vous avez aussi misé avec des sets." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Pourquoi une {{t:pair|paire}} moyenne n'aime-t-elle pas une grosse mise au turn ?"
    options:
      - { text: "Parce que les mains moins bonnes {{t:fold|se coucheront}} et que les meilleures paieront", correct: true, why: "Oui : une grosse mise avec une {{t:pair|paire}} moyenne ne rapporte que si une main moins bonne paie, or ces mains {{t:fold|se couchent}} généralement face à une grosse mise. Il ne reste pour {{t:call|suivre}} que les mains qui vous battent." }
      - { text: "Parce qu'une grosse mise est toujours un {{t:bluff}}", why: "Non : les mains les plus fortes {{t:bet|misent}} gros aussi. Le problème d'une {{t:pair|paire}} moyenne, c'est de savoir qui va la payer." }
      - { text: "Parce qu'une {{t:pair|paire}} moyenne ne peut pas gagner", why: "Si, elle peut : elle bat les {{t:bluff|bluffs}} et les {{t:pair|paires}} moins bonnes. C'est pourquoi elle {{t:check|checke}} et va à l'abattage à moindre coût." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} votre c-bet au flop. Le turn est un deux. Il y a {{n:ex.pot}} dans le {{t:pot}}, l'adversaire {{t:check|checke}}. Vous avez un set. Que faites-vous ?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Je mise {{n:ex.bet.three-quarters}}", correct: true, why: "Oui : l'adversaire peut avoir un {{t:draw|tirage}} {{t:flush|couleur}} (deux cœurs) et un tirage {{t:straight|quinte}} (p. ex. 65, T9). Face à une mise de 3/4 du {{t:pot}}, un {{t:flush-draw|tirage couleur}} a besoin de {{n:eq.bet-three-quarters}} d'équité, et la {{t:flush|couleur}} rentre dans env. {{n:odds.flush.turn-river}} des cas. Contre votre set, il a encore moins : [[4h]] et [[2h]] vous donnent un {{t:full-house|full}}, il lui reste donc {{n:outs.flush.vs-set}} outs propres, env. {{n:odds.flush.vs-set}}. Il paie trop cher." }
      - { text: "Je mise {{n:ex.bet.quarter}}", sizeError: true, why: "Bonne action, mauvaise taille : face à une mise de 1/4 du {{t:pot}}, un {{t:draw|tirage}} n'a besoin que de {{n:eq.bet-quarter}} d'équité, il obtient donc un bon prix. Avec une main très forte sur un {{t:board}} avec {{t:flush-draw|tirage couleur}}, vous misez gros." }
      - { text: "Je {{t:check|checke}}", why: "Une carte gratuite est un cadeau pour les {{t:draw|tirages}}, et vous ne construisez pas le {{t:pot}} avant la river. Un set sur un {{t:board}} avec {{t:flush-draw|tirage couleur}} mise." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} votre c-bet au flop. Le turn est un trois. Il y a {{n:ex.pot}} dans le {{t:pot}}, l'adversaire {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Je mise {{n:ex.bet.three-quarters}}", correct: true, why: "Oui : un {{t:flush-draw|tirage couleur}} avec deux cartes hautes est un bon {{t:semi-bluff}}. Vous misez avec la même grosse taille que vos mains fortes, donc l'adversaire ne distinguera pas le {{t:bluff}} de la valeur." }
      - { text: "Je mise {{n:ex.bet.quarter}}", sizeError: true, why: "Bonne action, mauvaise taille : une mise aussi bon marché, l'adversaire la {{t:call|suivra}} avec n'importe quelle {{t:pair|paire}}, alors qu'un {{t:semi-bluff}} gagne surtout quand l'adversaire {{t:fold|se couche}}. Si vos petites mises signifiaient des {{t:draw|tirages}} et vos grosses des mains fortes, l'adversaire l'exploiterait facilement." }
      - { text: "Je {{t:check|checke}}", correct: true, why: "Bien aussi : vous verrez la river gratuitement et toucherez votre {{t:flush|couleur}} dans {{n:odds.flush.turn-river}} des cas. Miser est toutefois généralement meilleur, car un {{t:draw|tirage}} avec des cartes hautes est l'un des meilleurs {{t:semi-bluff|semi-bluffs}}, et en {{t:check|checkant}}, vous renoncez à remporter le {{t:pot}} tout de suite." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} votre c-bet au flop. Le turn est un cinq. Il y a {{n:ex.pot}} dans le {{t:pot}}, l'adversaire {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "Je {{t:check|checke}}", correct: true, why: "Une {{t:top-pair|top paire}} avec un kicker faible est une main moyenne. Face à une grosse mise, ce sont surtout de meilleurs rois qui paieront (AK, KQ, KJ), et les mains moins bonnes {{t:fold|se coucheront}}. En {{t:check|checkant}}, vous allez à l'abattage à moindre coût." }
      - { text: "Je mise {{n:ex.bet.three-quarters}}", why: "La grosse mise convient à une {{t:range}} {{t:polarized|polarisée}}. Avec cette main, vous êtes surtout payé par des mains qui vous battent." }
      - { text: "Je mise {{n:ex.bet.pot}}", why: "Un {{t:pot}} encore plus gros avec une main de force moyenne : les mains moins bonnes {{t:fold|se coucheront}} presque toujours, et les meilleures paieront." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Il y a {{n:ex.pot}} dans le {{t:pot}}, vous misez {{n:ex.bet.three-quarters}} avec une main très forte. De quel pourcentage d'équité un adversaire avec un {{t:draw|tirage}} a-t-il besoin pour {{t:call|suivre}} ? Saisissez un nombre."
    answer: eq.bet-three-quarters
    explanation: "L'adversaire ajoute {{n:ex.bet.three-quarters}} à un {{t:pot}} qui, s'il {{t:call|suit}}, atteint {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}} : {{n:eq.bet-three-quarters}}. Un {{t:flush-draw|tirage couleur}} a env. {{n:odds.flush.turn-river}} au turn, il paie donc trop cher."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Vous avez un set et ne misez que {{n:ex.bet.quarter}} dans un {{t:pot}} de {{n:ex.pot}}. L'adversaire a un {{t:flush-draw|tirage couleur}} (env. {{n:odds.flush.turn-river}} d'ici la river). Qu'en déduire ?"
    options:
      - { text: "Il obtient un bon prix : il n'a besoin que de {{n:eq.bet-quarter}}", correct: true, why: "Oui : {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, moins que ses {{n:odds.flush.turn-river}}. {{t:call|Suivre}} est rentable pour lui, et votre petite mise lui cède une partie de votre valeur." }
      - { text: "Il doit {{t:fold|se coucher}}, car il a besoin de {{n:eq.bet-three-quarters}}", why: "C'est ce qu'il lui faudrait face à une mise de 3/4 du {{t:pot}}. Face à une mise de 1/4 du {{t:pot}}, {{n:eq.bet-quarter}} lui suffit." }
      - { text: "Le prix n'a pas d'importance, car vous le battez de toute façon", why: "Vous le battez maintenant, mais dans env. {{n:odds.flush.turn-river}} des cas, il gagnera à la river. La taille de la mise détermine s'il paie cette chance trop cher ou pas assez." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Au turn, l'adversaire a un {{t:oesd|tirage par les deux bouts}} : env. {{n:odds.oesd.turn-river}} d'ici la river. À partir de quelle mise de votre part paie-t-il trop cher (en ne comptant que les cotes du pot) ?"
    options:
      - { text: "Dès 1/3 du {{t:pot}} : il a besoin de {{n:eq.bet-third}}", correct: true, why: "Oui : {{n:eq.bet-third}}, c'est plus que {{n:odds.oesd.turn-river}}. Au turn, il ne reste qu'une carte à venir pour les {{t:draw|tirages}}, donc même une mise moyenne leur donne un mauvais prix." }
      - { text: "Seulement à partir du {{t:pot}} entier : il a besoin de {{n:eq.bet-pot}}", why: "Face à une mise du {{t:pot}} entier, il paie beaucoup trop cher, mais dès 1/3 du {{t:pot}}, il a besoin de {{n:eq.bet-third}}, plus que ses {{n:odds.oesd.turn-river}}." }
      - { text: "Jamais, un {{t:draw|tirage}} peut toujours {{t:call|suivre}}", why: "Un {{t:draw|tirage}} ne {{t:call|suit}} qu'avec un bon prix ou des cotes implicites (leçon suivante). Au turn, il a env. {{n:odds.oesd.turn-river}}, donc la plupart des mises lui donnent un mauvais prix." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Il y a {{n:ex.pot}} dans le {{t:pot}}, vous misez tout le {{t:pot}} : {{n:ex.bet.pot}}. De quel pourcentage d'équité l'adversaire a-t-il besoin pour {{t:call|suivre}} ? Saisissez un nombre."
    answer: eq.bet-pot
    explanation: "L'adversaire ajoute {{n:ex.bet.pot}} à un {{t:pot}} qui, s'il {{t:call|suit}}, atteint {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} : {{n:eq.bet-pot}}. Ni la {{t:flush|couleur}} (env. {{n:odds.flush.turn-river}}) ni la {{t:straight|quinte}} par les deux bouts (env. {{n:odds.oesd.turn-river}}) n'ont une telle chance."
---
Au flop, vous avez souvent misé petit avec presque toute votre {{t:range}}. Au turn, la {{t:range}} de mise change : elle conserve les mains très fortes et les {{t:semi-bluff|semi-bluffs}}, tandis que les mains moyennes {{t:check|checkent}}. On dit qu'une telle {{t:range}} est {{t:polarized|polarisée}}.

## Deux types de {{t:range}}

- **{{t:linear|Linéaire}} :** vous misez des mains les plus fortes vers le bas, moyennes comprises. Généralement avec une petite taille, p. ex. un c-bet de {{n:cbet.size.small}} du {{t:pot}} sur [[Ks 7d 2c]].
- **{{t:polarized|Polarisée}} :** les deux pôles misent, les mains très fortes (sets, {{t:two-pair|doubles paires}}, {{t:straight|quintes}}, couleurs) et les {{t:semi-bluff|semi-bluffs}} ({{t:draw|tirages}}). Elle ne contient pas de mains moyennes.

En général, une {{t:range}} {{t:polarized|polarisée}}, ce sont des mains très fortes et des {{t:bluff|bluffs}}. Au turn, les {{t:bluff|bluffs}} sont généralement des {{t:semi-bluff|semi-bluffs}}, et à la river (M8), des mains sans chance à l'abattage.

## Pourquoi polariser au turn

L'adversaire a {{t:call|suivi}} au flop, il a donc généralement une {{t:pair|paire}} ou un {{t:draw|tirage}}, parfois des cartes hautes avec un backdoor (M6). Une main moyenne ne gagne rien à une deuxième mise : les mains moins bonnes {{t:fold|se couchent}} et les meilleures paient. Les mains fortes veulent construire le {{t:pot}} avant la river, et les {{t:semi-bluff|semi-bluffs}} ont besoin que l'adversaire {{t:fold|se couche}} et ont des outs quand ils sont {{t:call|suivis}}.

## {{t:range|Range}} {{t:polarized|polarisée}}, grosse mise

Une {{t:range}} {{t:polarized|polarisée}} mise gros, p. ex. 3/4 du {{t:pot}}. Les mains fortes soutirent plus de {{t:chips|jetons}}, et les {{t:semi-bluff|semi-bluffs}} gagnent plus souvent tout de suite. Les mains moyennes {{t:check|checkent}}. Quand les {{t:bluff|bluffs}} et les mains fortes misent avec la même taille, l'adversaire ne sait pas ce que vous avez.

## Le prix pour les {{t:draw|tirages}}

Au turn, un {{t:draw|tirage}} n'a plus qu'une carte à venir. Une grosse mise lui fait payer trop cher :

| Votre mise | L'adversaire a besoin de | La {{t:flush|couleur}} a | La {{t:straight|quinte}} par les deux bouts a |
|---|---|---|---|
| 1/4 du {{t:pot}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 du {{t:pot}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 du {{t:pot}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 du {{t:pot}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| Tout le {{t:pot}} | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Face à une mise de 1/4 du {{t:pot}}, un {{t:flush-draw|tirage couleur}} obtient un bon prix. À 1/3 du {{t:pot}}, le prix est presque égal à la chance de la {{t:flush|couleur}} ({{n:eq.bet-third}} contre {{n:odds.flush.turn-river}}), et à partir de 1/2 du {{t:pot}}, la {{t:flush|couleur}} paie nettement trop cher, à moins de compter sur des cotes implicites (leçon suivante). Les exercices avec {{t:draw|tirage}} de cette leçon ne comptent que les cotes du pot.

:::note D'où viennent ces règles
Les notions de {{t:range}} {{t:polarized|polarisée}} et {{t:linear|linéaire}} ainsi que la règle « une {{t:range}} {{t:polarized|polarisée}} mise gros, les mains moyennes {{t:check|checkent}} » proviennent de supports de formation et sont ici une heuristique ; la recommandation de miser gros avec une main forte et vulnérable aussi. Au turn, le solver utilise aussi de petites tailles. La taille de 3/4 du {{t:pot}} est un exemple pour l'entraînement, et non la seule bonne taille. Les prix du tableau sont des calculs exacts de l'application.
:::
