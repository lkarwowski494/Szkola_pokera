---
id: m9.l2
module: m9
order: 2
title: "L'engagement"
sub: "Quand vous jouez tout votre stack"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}} : le {{t:pot}} est de {{n:ex.pot}}, les stacks sont de {{n:commit.stack}} chacun. Vous misez la totalité du {{t:pot}} ({{n:ex.bet.pot}}), votre adversaire fait all-in. Vous devez ajouter {{n:commit.after-pot.call}}. De combien d'équité avez-vous besoin pour {{t:call|suivre}} ? Saisissez le nombre en pourcentage."
    answer: eq.commit.after-pot
    explanation: "Avant le supplément de l'adversaire, le {{t:pot}} contient {{n:ex.pot.after-pot-call}} (le {{t:pot}}, votre {{t:bet|mise}} et le montant qu'il a égalisé). Vous ajoutez {{n:commit.after-pot.call}}, donc équité nécessaire = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Après une telle {{t:bet|mise}}, vous êtes engagé : {{t:fold|se coucher}} n'est généralement pas rentable."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}} : le {{t:pot}} est de {{n:ex.pot}}, les stacks sont de {{n:commit.stack}} chacun. Vous misez la moitié du {{t:pot}} ({{n:ex.bet.half}}), votre adversaire fait all-in. Vous devez ajouter {{n:commit.after-half.call}}. De combien d'équité avez-vous besoin pour {{t:call|suivre}} ? Saisissez le nombre en pourcentage."
    answer: eq.commit.after-half
    explanation: "Avant le supplément de l'adversaire, le {{t:pot}} contient {{n:ex.half.total}} (le {{t:pot}}, votre {{t:bet|mise}} et le montant qu'il a égalisé). Vous ajoutez {{n:commit.after-half.call}} : {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. C'est moins qu'en cas d'all-in immédiat ({{n:eq.jam.spr2}}), car vous avez déjà mis une partie de l'argent."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Vous avez la {{t:top-pair|top paire}}, vous misez la totalité du {{t:pot}}, votre adversaire fait all-in. Pour {{t:call|suivre}}, il vous faut {{n:eq.commit.after-pot}} d'équité. Que faites-vous ?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "Je {{t:call|suis}}", correct: true, why: "Oui : le prix est très bon. Avec un {{t:spr}} bas, l'adversaire fait aussi all-in avec des {{t:draw|tirages}} et des dames plus faibles, donc la {{t:top-pair|top paire}} avec un as a généralement bien plus de {{n:eq.commit.after-pot}} d'équité. Elle ne perd nettement que contre les {{t:two-pair|doubles paires}} et les sets." }
      - { text: "Je me {{t:fold|couche}}, car l'all-in montre une main forte", why: "{{t:fold|Se coucher}} abandonne un {{t:pot}} dans lequel vous avez déjà beaucoup investi. Il vous suffit de gagner une fois sur cinq, soit dans {{n:eq.commit.after-pot}} des cas. Si vous comptiez vous {{t:fold|coucher}} ici, mieux valait ne pas miser la totalité du {{t:pot}}." }
      - { text: "Je me {{t:fold|couche}}, car le {{t:spr}} est bas", why: "Un {{t:spr}} bas agit en sens inverse : il permet de jouer plus facilement tout votre stack, car le prix de l'all-in est meilleur." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Après votre {{t:bet|mise}}, il vous resterait dans votre stack moins que ce que vaudra le {{t:pot}} une fois cette mise {{t:call|suivie}}. Quel plan n'a pas de sens ?"
    options:
      - { text: "{{t:bet|Miser}} puis se {{t:fold|coucher}} si l'adversaire fait all-in", correct: true, why: "Oui, ce plan est une erreur : après une telle {{t:bet|mise}}, il vous faut très peu d'équité pour {{t:call|suivre}} l'all-in (avec un {{t:spr}} de {{n:spr.commit}} et une {{t:bet|mise}} de la taille du {{t:pot}}, seulement {{n:eq.commit.after-pot}}). Si vous vous {{t:fold|couchez}} quand même, la {{t:bet|mise}} ne fait que donner des {{t:chips|jetons}}." }
      - { text: "All-in immédiatement", why: "C'est un plan raisonnable avec une main forte : vous jouez de toute façon tout votre stack, alors vous le mettez tout de suite." }
      - { text: "{{t:check|Check}}", why: "Raisonnable aussi quand vous ne voulez pas jouer tout votre stack : vous ne mettez pas d'argent qui rendrait ensuite difficile de vous {{t:fold|coucher}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} après un 4-bet, {{t:spr}} d'environ {{n:spr.4bet}}. Vous avez touché la {{t:top-pair|top paire}} avec le meilleur kicker. Quel plan ?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Je joue tout mon stack", correct: true, why: "Oui : avec un {{t:spr}} d'environ {{n:spr.4bet}}, il ne vous faut qu'environ {{n:eq.jam.4bet}} d'équité pour un all-in, et la {{t:top-pair|top paire}} avec un as est ici très forte. Vous misez ou vous {{t:call|suivez}} avec l'intention de tout mettre." }
      - { text: "Je joue prudemment et je me {{t:fold|couche}} sur une grosse {{t:bet|mise}}", why: "Avec un {{t:spr}} aussi bas, {{t:fold|se coucher}} avec la {{t:top-pair|top paire}} abandonne trop. Après un 4-bet, l'adversaire a aussi AQ, QQ, JJ et d'autres mains qui perdent contre la vôtre." }
      - { text: "Je mise petit et je me {{t:fold|couche}} sur un all-in", why: "C'est un plan « {{t:bet|miser}} puis {{t:fold|se coucher}} » avec un {{t:spr}} bas : après votre {{t:bet|mise}}, le prix de l'all-in sera encore meilleur, et {{t:fold|se coucher}} abandonne un {{t:pot}} dans lequel vous avez déjà mis de l'argent." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Pourquoi, avec un {{t:spr}} d'environ {{n:spr.commit}}, la {{t:top-pair|top paire}} joue-t-elle généralement tout le stack ?"
    options:
      - { text: "Parce qu'il faut environ {{n:eq.jam.spr2}} d'équité pour un all-in, et deux {{t:bet|mises}} d'environ {{n:geo.spr2.2}} du {{t:pot}} mettent tout le stack", correct: true, why: "Oui : le prix est bon, et deux {{t:value|streets de valeur}} suffisent pour mettre le stack. C'est ce que la {{t:top-pair|top paire}} supporte généralement. Le seuil lui-même est une heuristique : ce avec quoi l'adversaire joue compte aussi." }
      - { text: "Parce que la {{t:top-pair|top paire}} gagne toujours", why: "Pas toujours : parfois l'adversaire a une {{t:two-pair|double paire}} ou un set. Avec un {{t:spr}} bas, les mains moins fortes et les {{t:draw|tirages}} mettent toutefois assez d'argent, et le prix est bon." }
      - { text: "Parce qu'avec un {{t:spr}} de {{n:spr.commit}}, les règles interdisent de se {{t:fold|coucher}}", why: "Vous pouvez toujours vous {{t:fold|coucher}}. Le fait est que {{t:fold|se coucher}} coûte généralement plus qu'il ne rapporte : il ne vous faut qu'environ {{n:eq.jam.spr2}} d'équité pour un all-in." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Pot}} à une seule relance, stacks de {{n:format.stack}}, {{t:spr}} d'environ {{n:spr.srp}}. Vous avez touché la {{t:top-pair|top paire}} avec un bon kicker. Comment traitez-vous cette main ?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Comme une main de valeur, mais généralement pas pour tout le stack", correct: true, why: "Oui : avec un {{t:spr}} d'environ {{n:spr.srp}}, tout le stack n'entre qu'après plusieurs {{t:bet|mises}} plus grosses que le {{t:pot}}. Un adversaire qui met autant a rarement une main plus faible qu'une seule {{t:pair|paire}}." }
      - { text: "Je joue tout mon stack, car la {{t:top-pair|top paire}} est forte", why: "Avec un {{t:spr}} de {{n:spr.commit}}, oui, mais ici le {{t:spr}} est d'environ {{n:spr.srp}}. Quand tout le stack est dans le {{t:pot}}, l'adversaire a généralement une {{t:two-pair|double paire}}, un set ou une meilleure {{t:pair|paire}}." }
      - { text: "Je me {{t:fold|couche}} sur la première {{t:bet|mise}} de l'adversaire", why: "Trop prudent : la {{t:top-pair|top paire}} avec un bon kicker est une main forte sur ce flop. Il s'agit de ne pas construire avec elle un {{t:pot}} de la taille de tout le stack, et non de se {{t:fold|coucher}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} après un 4-bet, {{t:spr}} d'environ {{n:spr.4bet}}. Vous avez une {{t:pair|paire}} de valets, et le flop contient un as et un roi. L'adversaire fait all-in. Qu'en est-il de la règle « avec un {{t:spr}} bas, je joue tout mon stack » ?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Elle ne couvre pas cette main : c'est une {{t:pair|paire}} inférieure aux deux hautes cartes du {{t:board}}", correct: true, why: "Oui : la règle porte sur la {{t:top-pair|top paire}} et les mains meilleures. Après un 4-bet, l'adversaire a souvent un as ou un roi, et vos valets perdent contre toute {{t:pair|paire}} formée avec une haute carte. Ici, vous vous {{t:fold|couchez}} plus souvent, malgré le bon prix ({{n:eq.jam.4bet}})." }
      - { text: "Elle la couvre : avec un {{t:spr}} bas, je {{t:call|suis}} avec tout", why: "Un {{t:spr}} bas donne un bon prix, mais ne transforme pas une main faible en main forte. Quand l'adversaire a souvent une meilleure {{t:pair|paire}}, même {{n:eq.jam.4bet}} d'équité peut être trop." }
      - { text: "Elle la couvre, mais seulement si j'ai la {{t:position}}", why: "La {{t:position}} ne change pas ce avec quoi vous jouez. La règle concerne la {{t:top-pair|top paire}} et les mains meilleures." }
---
L'engagement (en anglais, commitment) est une situation où le {{t:pot}} contient déjà tant d'argent par rapport à votre stack que {{t:fold|se coucher}} face à un all-in n'est presque jamais rentable. Le {{t:spr}} de la leçon précédente vous indique à quel point vous en êtes proche dès le début du flop.

## Après une {{t:bet|mise}}, le prix est encore meilleur

Exemple : {{t:spr}} {{n:spr.commit}}, {{t:pot}} de {{n:ex.pot}}, stacks de {{n:commit.stack}} chacun. Si l'adversaire fait all-in d'emblée, il vous faut {{n:eq.jam.spr2}} d'équité. Si vous misez d'abord, il vous en faut moins :

| Votre {{t:bet|mise}} avant l'all-in de l'adversaire | Complément à payer | Équité nécessaire |
|---|---|---|
| Aucune (l'adversaire fait all-in d'emblée) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| La moitié du {{t:pot}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Tout le {{t:pot}} ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Ne prévoyez pas de {{t:bet|miser}} puis de vous {{t:fold|coucher}}

Si, après votre {{t:bet|mise}}, il vous restait dans votre stack moins que ce que vaudra le {{t:pot}} une fois cette mise {{t:call|suivie}}, {{t:bet|miser}} puis se {{t:fold|coucher}} face à un all-in n'a généralement pas de sens : pour {{t:call|suivre}} l'all-in, il vous faut alors moins d'équité que pour {{t:call|suivre}} une {{t:bet|mise}} de la taille du {{t:pot}} ({{n:eq.bet-pot}}). Vous avez deux options raisonnables : jouer tout votre stack (miser ou faire all-in) ou {{t:check|checker}}.

## {{t:spr}} bas : la {{t:top-pair|top paire}} joue le stack

Règle : **avec un {{t:spr}} au flop inférieur à environ {{n:spr.zone.low}}, la {{t:top-pair|top paire}} et les mains meilleures jouent généralement tout le stack** (zones de {{t:spr}} de la leçon précédente). L'exemple d'un {{t:spr}} de {{n:spr.commit}} se situe dans cette zone, et le calcul y soutient la règle :

- pour un all-in, il vous faut au plus environ {{n:eq.jam.spr2}} d'équité, et encore moins après votre propre {{t:bet|mise}},
- deux {{t:bet|mises}} d'environ {{n:geo.spr2.2}} du {{t:pot}} mettent tout le stack : avec un {{t:pot}} de {{n:ex.pot}}, cela fait {{n:geo.spr2.flop}} au flop et {{n:geo.spr2.turn}} au turn, soit {{n:geo.spr2.total}} au total,
- la {{t:top-pair|top paire}} supporte généralement deux {{t:value|streets de valeur}} (leçon sur le plan en trois {{t:street|streets}}).

Le calcul ne fixe cependant pas de seuil précis. Que la {{t:top-pair|top paire}} ait assez d'équité dépend de ce avec quoi l'adversaire joue. C'est pourquoi il s'agit d'une heuristique, et non d'une loi absolue. La règle concerne la {{t:top-pair|top paire}} et les mains meilleures : une {{t:pair|paire}} inférieure aux hautes cartes du {{t:board}} n'y répond pas.

## {{t:spr}} élevé : une seule {{t:pair|paire}}, plus prudemment

Dans un {{t:pot}} à une seule relance, le {{t:spr}} est d'environ {{n:spr.srp}}. Pour mettre tout le stack d'ici la river, il faudrait miser plus que le {{t:pot}} sur chaque {{t:street}} (leçon sur la taille géométrique). Un adversaire qui met autant d'argent a rarement une main plus faible qu'une seule {{t:pair|paire}}. C'est pourquoi, avec une seule {{t:pair|paire}} dans un tel {{t:pot}}, vous jouez pour la valeur, mais ne prévoyez généralement pas de jouer tout votre stack.

:::note D'où viennent ces règles
Le seuil d'environ {{n:spr.zone.low}} provient de supports de formation et d'une analyse de solveur publiée (avec un {{t:spr}} d'environ {{n:spr.commit}}, toute {{t:top-pair|top paire}} et toute main meilleure jouent le stack). La prudence avec une seule {{t:pair|paire}} à {{t:spr}} élevé est confirmée par des supports de formation et des analyses de solveurs. Les chiffres de prix et de tailles de cette leçon relèvent des mathématiques pures.
:::
