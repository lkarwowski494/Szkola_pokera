---
id: m9.l3
module: m9
order: 3
title: "Taille de mise géométrique"
sub: "La même fraction du pot jusqu'à l'all-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Le {{t:pot}} contient {{n:ex.pot}}. Vous misez tout le {{t:pot}} ({{n:ex.bet.pot}}) et l'adversaire {{t:call|suit}}. Combien y a-t-il maintenant dans le {{t:pot}} ? Saisissez un nombre."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Une {{t:bet|mise}} de la taille du {{t:pot}} et un {{t:call}} multiplient le {{t:pot}} par trois. En général : une {{t:bet|mise}} de f du {{t:pot}} et un {{t:call}} multiplient le {{t:pot}} par (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Le {{t:pot}} contient {{n:ex.pot}}. Au flop, au turn et à la river, vous misez tout le {{t:pot}} ({{n:ex.bet.pot}}, puis {{n:geo.ex.turn}}, puis {{n:geo.ex.river}}), et l'adversaire {{t:call|suit}} à chaque fois. Combien chacun de vous met-il au total ? Saisissez un nombre."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. Le {{t:pot}} passe de {{n:ex.pot}} à {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} et {{n:geo.ex.river-after}}. Trois {{t:bet|mises}} de la taille du {{t:pot}} mènent donc à l'all-in avec un {{t:spr}} de {{n:spr.zone.deep}}."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Avec quel {{t:spr}} trois {{t:bet|mises}} d'un demi-{{t:pot}} (flop, turn, river, chacune suivie) engagent-elles exactement tout le stack ?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Pot}} de {{n:ex.pot}} : des {{t:bet|mises}} de {{n:ex.bet.half}}, {{n:geo.half.turn}} et {{n:geo.half.river}} font au total {{n:geo.half.total}}, soit un stack de {{n:geo.half.stack}}. D'après la formule : (1 + 2·{{n:ex.frac.half}}) à la puissance trois = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Avec un {{t:spr}} de {{n:spr.zone.deep}}, il faut miser tout le {{t:pot}} sur chaque {{t:street}}. Des {{t:bet|mises}} d'un demi-{{t:pot}} n'engageraient alors que {{n:geo.half.total}} sur {{n:geo.ex.stack}}." }
      - { text: "{{n:spr.commit}}", why: "Avec un {{t:spr}} de {{n:spr.commit}}, trois {{t:bet|mises}} d'un demi-{{t:pot}}, c'est trop : le stack s'épuise dès la river, avant que vous puissiez {{t:bet|miser}} un demi-{{t:pot}} complet. C'est un {{t:spr}} de {{n:geo.half.spr}} qui convient." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pot}} à une seule relance : au flop, il y a {{n:bb.pot-after.vs-btn}}, et chacun de vous a {{n:spr.srp.stack}} derrière. Vous misez un demi-{{t:pot}} au flop, au turn et à la river, et l'adversaire {{t:call|suit}} toujours. Combien mettez-vous au total ?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. La majeure partie du stack reste en dehors du {{t:pot}} : avec un {{t:spr}} d'environ {{n:spr.srp}}, un demi-{{t:pot}} est trop peu pour jouer tout le stack." }
      - { text: "{{n:spr.srp.stack}}, soit tout le stack", why: "Le {{t:pot}} ne monte qu'à {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}}, et ainsi de suite. Trois {{t:bet|mises}} d'un demi-{{t:pot}} engagent au total {{n:srp.half.total}}, loin de tout le stack." }
      - { text: "{{n:srp.potbet.total}}", why: "C'est ce qu'engageraient trois {{t:bet|mises}} de la taille de tout le {{t:pot}} ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). Des {{t:bet|mises}} d'un demi-{{t:pot}} ne donnent que {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pot}} à une seule relance, {{t:spr}} d'environ {{n:spr.srp}}. Quelle taille de {{t:bet|mise}} constante au flop, au turn et à la river engage tout le stack ?"
    options:
      - { text: "Environ {{n:geo.srp.3}} du {{t:pot}}, soit plus que tout le {{t:pot}}", correct: true, why: "Oui : même trois {{t:bet|mises}} de la taille du {{t:pot}} n'engagent que {{n:srp.potbet.total}} d'un stack de {{n:spr.srp.stack}}. Tout le stack n'entre qu'à environ {{n:geo.srp.3}} du {{t:pot}} sur chaque {{t:street}}." }
      - { text: "Environ {{n:geo.3bet-ip.3}} du {{t:pot}}", why: "Cela suffit dans un {{t:pot}} 3-bet ({{t:spr}} d'environ {{n:spr.3bet-ip}}). Dans un {{t:pot}} à une seule relance, le {{t:spr}} est d'environ {{n:spr.srp}}, donc les {{t:bet|mises}} doivent être plus grosses que le {{t:pot}}." }
      - { text: "Environ {{n:cbet.size.small}} du {{t:pot}}", why: "Trois {{t:bet|mises}} de ce type n'engagent qu'une petite partie du stack. Avec un {{t:spr}} d'environ {{n:spr.srp}}, il faut environ {{n:geo.srp.3}} du {{t:pot}} sur chaque {{t:street}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pot}} 3-bet, vous avez la {{t:position}}, {{t:spr}} d'environ {{n:spr.3bet-ip}}. Vous avez une main très forte et voulez engager tout le stack d'ici la river avec des {{t:bet|mises}} égales. Combien misez-vous au flop ?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Environ {{n:geo.3bet-ip.3}} du {{t:pot}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Oui : (1 + 2f) à la puissance trois = 1 + 2·{{n:spr.3bet-ip}} donne f ≈ {{n:geo.3bet-ip.3}}. Des {{t:bet|mises}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} et {{n:geo.3bet-ip.river}} font au total {{n:geo.3bet-ip.total}}, soit tout le stack." }
      - { text: "{{n:cbet.size.small}} du {{t:pot}} ({{n:g3b.third.flop}})", sizeError: true, why: "Bonne action, mauvaise taille : trois {{t:bet|mises}} de 1/3 du {{t:pot}} n'engagent qu'environ {{n:g3b.third.total}} sur {{n:spr.3bet-ip.stack}}. Le plan « tout le stack d'ici la river » demande environ {{n:geo.3bet-ip.3}} du {{t:pot}}." }
      - { text: "{{t:check|Je checke}}, puis je fais all-in à la river", why: "À la river, un all-in de {{n:spr.3bet-ip.stack}} dans un {{t:pot}} de {{n:vs3bet.pot-after}} est une {{t:bet|mise}} plusieurs fois plus grosse que le {{t:pot}} : l'adversaire ne la paiera qu'avec une main très forte. Des {{t:bet|mises}} égales sur trois {{t:street|streets}} lui donnent l'occasion de mettre de l'argent petit à petit." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pot}} après votre 3-bet depuis la {{t:big-blind|grosse blinde}}, {{t:spr}} d'environ {{n:spr.3bet-oop}}. Vous voulez engager tout le stack d'ici la river avec des {{t:bet|mises}} égales. Quelle fraction du {{t:pot}} sur chaque {{t:street}} ?"
    table: { position: BB }
    options:
      - { text: "Environ {{n:geo.3bet-oop.3}} du {{t:pot}}", correct: true, why: "Oui : avec un {{t:spr}} d'environ {{n:spr.3bet-oop}}, (1 + 2f) à la puissance trois = 1 + 2·{{n:spr.3bet-oop}}, donc f ≈ {{n:geo.3bet-oop.3}}. Un {{t:spr}} plus bas qu'après un 3-bet {{t:in-position|en position}}, donc une taille plus petite aussi." }
      - { text: "Environ {{n:geo.3bet-ip.3}} du {{t:pot}}", sizeError: true, why: "Proche, mais c'est la taille pour un {{t:spr}} d'environ {{n:spr.3bet-ip}}. Avec un {{t:spr}} d'environ {{n:spr.3bet-oop}}, environ {{n:geo.3bet-oop.3}} du {{t:pot}} suffit, et avec des {{t:bet|mises}} plus grosses, il vous manquera du stack pour une {{t:bet|mise}} complète à la river." }
      - { text: "Environ {{n:geo.4bet.3}} du {{t:pot}}", sizeError: true, why: "Cela suffit après un 4-bet ({{t:spr}} d'environ {{n:spr.4bet}}). Avec un {{t:spr}} d'environ {{n:spr.3bet-oop}}, trois {{t:bet|mises}} de ce type laisseront une bonne partie du stack." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pot}} après un 4-bet, {{t:spr}} d'environ {{n:spr.4bet}}. Vous voulez engager tout le stack en deux {{t:bet|mises}} : au flop et au turn. Combien misez-vous au flop ?"
    options:
      - { text: "Environ {{n:geo.4bet.2}} du {{t:pot}}", correct: true, why: "Oui : sur deux {{t:street|streets}}, (1 + 2f) au carré = 1 + 2·{{n:spr.4bet}}, donc f ≈ {{n:geo.4bet.2}}. Après la {{t:bet|mise}} et le {{t:call}}, il reste exactement le montant d'une {{t:bet|mise}} de même taille au turn." }
      - { text: "Environ {{n:geo.4bet.3}} du {{t:pot}}", sizeError: true, why: "C'est la taille pour trois {{t:street|streets}}. En deux {{t:bet|mises}} de {{n:geo.4bet.3}} du {{t:pot}}, une partie du stack restera pour la river." }
      - { text: "All-in tout de suite ({{n:spr.4bet.stack}})", why: "C'est un plan sur une seule {{t:street}}, pas sur deux. Une {{t:bet|mise}} d'environ {{n:spr.4bet}} fois le {{t:pot}} d'emblée ne laisse à l'adversaire qu'une décision : {{t:call|suivre}} pour tout ou {{t:fold|se coucher}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Que signifie la taille de mise géométrique ?"
    options:
      - { text: "La même fraction du {{t:pot}} sur chaque {{t:street}}, de sorte que la dernière {{t:bet|mise}} soit un all-in", correct: true, why: "Oui : une {{t:bet|mise}} de f et un {{t:call}} multiplient le {{t:pot}} par (1 + 2f) sur chaque {{t:street}}. Vous choisissez la taille pour qu'après la dernière {{t:bet|mise}}, tout le stack soit dans le {{t:pot}}." }
      - { text: "Toujours une {{t:bet|mise}} de la taille de tout le {{t:pot}}", why: "Tout le {{t:pot}} n'est géométrique qu'à un seul {{t:spr}} (p. ex. {{n:spr.zone.deep}} sur trois {{t:street|streets}}). Avec un {{t:spr}} d'environ {{n:spr.3bet-ip}}, environ {{n:geo.3bet-ip.3}} du {{t:pot}} suffit." }
      - { text: "Des {{t:bet|mises}} de plus en plus grosses en pourcentage : petite au flop, grosse à la river", why: "Les montants augmentent parce que le {{t:pot}} grossit, mais la fraction du {{t:pot}} reste la même sur chaque {{t:street}}. Dans un {{t:pot}} 3-bet, cela donne {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} et {{n:geo.3bet-ip.river}}, à chaque fois environ {{n:geo.3bet-ip.3}} du {{t:pot}}." }
---
Avant de {{t:bet|miser}} au flop, il est utile de savoir combien d'argent peut entrer d'ici la river. Une {{t:bet|mise}} et un {{t:call}} n'ajoutent pas un montant fixe au {{t:pot}} : ils le multiplient.

## Comment le {{t:pot}} grossit

Une {{t:bet|mise}} de f du {{t:pot}} et un {{t:call}} multiplient le {{t:pot}} par (1 + 2f). Avec une {{t:bet|mise}} de la taille de tout le {{t:pot}}, le {{t:pot}} triple :

| {{t:street|Street}} | {{t:pot|Pot}} avant la {{t:bet|mise}} | {{t:bet|Mise}} (tout le {{t:pot}}) | {{t:pot|Pot}} après le {{t:call}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Chaque joueur a mis {{n:geo.ex.total}}, soit {{n:spr.zone.deep}} {{t:pot|pots}}. Trois {{t:bet|mises}} de la taille du {{t:pot}} mènent donc à l'all-in exactement avec un {{t:spr}} de {{n:spr.zone.deep}}. D'où le seuil de la zone de {{t:spr}} la plus haute vue dans la première leçon.

## La formule

La taille de mise géométrique, c'est la même fraction f du {{t:pot}} sur chaque {{t:street}}, choisie pour que la dernière {{t:bet|mise}} soit un all-in. Sur n {{t:street|streets}} :

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Exemple : avec un {{t:spr}} de {{n:geo.half.spr}}, trois {{t:bet|mises}} d'un demi-{{t:pot}} engagent tout le stack : {{n:ex.bet.half}}, {{n:geo.half.turn}} et {{n:geo.half.river}}, soit {{n:geo.half.total}} au total avec un {{t:pot}} de {{n:ex.pot}}.

## Tailles pour les {{t:pot|pots}} courants

| {{t:pot|Pot}} | {{t:spr}} | Trois {{t:street|streets}} | Deux {{t:street|streets}} |
|---|---|---|---|
| {{t:open|Ouverture}} et {{t:call}} | {{n:spr.srp}} | {{n:geo.srp.3}} du {{t:pot}} | – |
| 3-bet {{t:in-position|en position}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} du {{t:pot}} | – |
| 3-bet depuis la {{t:big-blind|grosse blinde}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} du {{t:pot}} | – |
| 4-bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} du {{t:pot}} | {{n:geo.4bet.2}} du {{t:pot}} |

Dans un {{t:pot}} 3-bet {{t:in-position|en position}}, cela donne des {{t:bet|mises}} de {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} et {{n:geo.3bet-ip.river}}, soit {{n:geo.3bet-ip.total}} au total, c'est-à-dire tout le stack.

## Le {{t:pot}} à une seule relance est profond

Avec un {{t:spr}} d'environ {{n:spr.srp}}, trois {{t:bet|mises}} d'un demi-{{t:pot}} n'engagent que {{n:srp.half.total}}, et trois {{t:bet|mises}} de la taille du {{t:pot}}, {{n:srp.potbet.total}} d'un stack de {{n:spr.srp.stack}}. Tout le stack n'entre qu'avec des {{t:bet|mises}} plus grosses que le {{t:pot}}. C'est pourquoi, dans un tel {{t:pot}}, on joue tout le stack surtout avec des mains très fortes.

:::note Quand est-ce utile
La taille de mise géométrique est utile quand vous voulez engager tout le stack d'ici la river, c'est-à-dire avec une main très forte. Toutes les mains ne veulent pas jouer tout le stack : combien de {{t:value|streets de valeur}} une main peut supporter, c'est le sujet de la leçon suivante. La formule, ce sont des mathématiques pures. Les modules précédents donnent des tailles adaptées à la {{t:texture}} du flop ; la taille géométrique est un point de repère pour un plan visant tout le stack.
:::
