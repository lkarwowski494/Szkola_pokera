---
id: m11.l1
module: m11
order: 1
title: "Petit stack : all-in ou se coucher"
sub: "Quand la relance devient un all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Tournoi}}. Vous avez {{n:m11.depth.10}}, et tous les joueurs avant vous se sont {{t:fold|couchés}}. Quel plan de jeu est simple et éprouvé dans les sources ?"
    options:
      - { text: "All-in ou {{t:fold}}", correct: true, why: "À environ {{n:m11.thr.pushfold}} ou moins, les sources recommandent unanimement le push/fold. Relancer puis {{t:fold|se coucher}} sur une {{t:raise|relance}} vous ferait abandonner trop de stack, alors que l'all-in pousse le plus souvent l'adversaire à {{t:fold|se coucher}}." }
      - { text: "Relancer à {{n:pf.open-size}}, puis décider après une {{t:raise|relance}}", why: "Après une telle relance, il vous reste peu derrière le {{t:pot|pot}}, donc face à une {{t:raise|relance}} all-in, vous êtes de toute façon presque obligé de {{t:call|suivre}}. L'adversaire n'a pas besoin de {{t:fold|se coucher}}, et vous perdez votre fold equity." }
      - { text: "{{t:call|Suivre}} la blinde (limp) et voir le flop", why: "Le limp ne vous donne aucune chance de remporter le {{t:pot|pot}} immédiatement. Les solveurs qui disposent de toutes les actions limpent parfois, mais c'est une stratégie pour joueurs avancés ; le plan simple et sûr, c'est all-in ou {{t:fold}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Vous avez {{n:m11.thr.raise}} ou plus et vous {{t:open|ouvrez}} le jeu en premier. Que faites-vous d'une main que vous voulez jouer ?"
    options:
      - { text: "Je relance normalement (p. ex. au minimum)", correct: true, why: "Au-delà d'environ {{n:m11.thr.raise}}, les sources recommandent une relance classique : vous avez encore de la marge pour {{t:fold|vous coucher}} sur une {{t:raise}} ou jouer après le flop." }
      - { text: "Toujours all-in", why: "Partir all-in avec un stack aussi gros, c'est risquer beaucoup pour ne gagner que les blindes. Les mains plus faibles {{t:fold|se couchent}}, et les meilleures vous paient." }
      - { text: "Push/fold comme à {{n:m11.thr.pushfold}}", why: "Le push/fold est un outil pour {{t:short-stack|short stack}} : jusqu'à environ {{n:m11.thr.pushfold}}, et pour les mains plus faibles jusqu'à environ {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Vous avez {{n:m11.m.stack}} {{t:chips|jetons}}. Les blindes sont de {{n:m11.m.sb}}/{{n:m11.m.bb}}, et la {{t:big-blind}} paie en plus une ante de {{n:m11.m.ante}}. Quel est votre M ?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind}} + {{t:big-blind}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. C'est le nombre de tours de table que vous tenez sans jouer. En {{t:big-blind|grosses blindes}}, cela fait {{n:m11.m.bbs}}, mais le M compte aussi l'ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Votre M est tombé à environ {{n:m11.m.example}}. Que dit le modèle des zones de M à ce sujet ?"
    options:
      - { text: "{{t:red-zone|Zone rouge}} : seulement all-in ou {{t:fold}}, de préférence en premier", correct: true, why: "Avec un M d'environ {{n:m11.m.red}} ou moins, il ne vous reste que all-in ou {{t:fold}}. Entrer en premier vous donne une chance que tout le monde {{t:fold|se couche}}." }
      - { text: "{{t:green-zone|Zone verte}} : vous jouez normalement", why: "La {{t:green-zone|zone verte}}, où le stack permet de jouer librement, ne commence qu'à partir d'un M d'environ {{n:m11.m.green}}. Avec un M d'environ {{n:m11.m.example}}, le stack tient {{n:m11.m.example}} tours de table." }
      - { text: "Vous attendez les as, puisque vous avez le temps", why: "Avec un M d'environ {{n:m11.m.example}}, les blindes mangeront votre stack avant que vous ne touchiez une main forte. Il faut partir all-in avec une {{t:range|range}} plus large." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Vous avez {{n:m11.depth.10}} en {{t:small-blind|petite blinde}}, et tout le monde {{t:fold|s'est couché}}. Coloriez les mains avec lesquelles vous partez all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Petite blinde}}, tout le monde {{t:fold|s'est couché}}, vous avez K2o. À {{n:m11.depth.10}}, le solveur part all-in avec cette main. Et à {{n:m11.depth.15}} ?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Se coucher}}", correct: true, why: "À {{n:m11.depth.15}}, vous risquez davantage par rapport aux blindes, donc la {{t:range}} d'all-in se resserre d'environ {{n:m11.push.10}} à environ {{n:m11.push.15}} des mains. K2o en sort." }
      - { text: "All-in, car le roi est une carte forte", why: "À {{n:m11.depth.15}}, K2o tombe trop souvent sur un meilleur roi ou un as dans la {{t:range|range}} avec laquelle l'adversaire {{t:call|suit}}. Le solveur la {{t:fold|couche}}." }
      - { text: "All-in, car plus le stack est profond, plus on joue large", why: "C'est l'inverse : plus le stack est profond, plus la {{t:range}} d'all-in est serrée. C'est avec un {{t:short-stack|short stack}} très court que vous faites {{t:shove|push}} le plus large." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Petite blinde}}, {{n:m11.depth.10}}, sans ante. Combien de fois sur cent la {{t:big-blind}} devrait-elle {{t:fold|se coucher}} pour qu'un all-in avec une main sans aucune chance ne perde ni ne gagne rien ?"
    options:
      - { text: "Plus de {{n:m11.push.10.alpha}}", correct: true, why: "Vous risquez {{n:m11.push.10.risk}} pour gagner {{n:m11.push.10.win}} : {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) font environ {{n:m11.push.10.alpha}}. L'adversaire ne {{t:fold|se couche}} pas aussi souvent, donc l'all-in n'est rentable qu'avec une main qui a aussi de l'équité quand l'adversaire {{t:call|suit}}." }
      - { text: "Plus de la moitié", why: "La moitié suffirait si vous risquiez autant que vous pouvez gagner. Ici, vous risquez {{n:m11.push.10.risk}} et ne gagnez que {{n:m11.push.10.win}} blindes." }
      - { text: "Il suffit qu'elle {{t:fold|se couche}} de temps en temps", why: "Chaque {{t:call}} coûte tout son stack à une main sans chance. Sans équité, il vous faut que l'adversaire {{t:fold|se couche}} très souvent : plus de {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Pourquoi, avec un {{t:short-stack|short stack}}, préférez-vous partir all-in en premier plutôt que d'attendre qu'un autre joueur parte all-in, puis de {{t:call|suivre}} ?"
    options:
      - { text: "Parce que l'all-in gagne de deux façons", correct: true, why: "En entrant en premier, vous remportez le {{t:pot|pot}} quand tout le monde {{t:fold|se couche}}, ou vous gagnez au showdown. En {{t:call|suivant}}, vous ne gagnez qu'au showdown." }
      - { text: "Parce que l'all-in a toujours plus d'équité", why: "L'équité d'une main ne dépend pas de qui est entré en premier. La différence, c'est que l'all-in donne à l'adversaire une chance de {{t:fold|se coucher}}." }
      - { text: "Parce qu'il est interdit de {{t:call|suivre}} un all-in", why: "Vous avez le droit de {{t:call|suivre}}, mais pour {{t:call|suivre}}, il vous faut une main plus forte (leçon sur l'action de {{t:call|suivre}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "Même stack de {{n:m11.depth.10}} en {{t:small-blind|petite blinde}}, mais la partie se joue avec {{t:bb-ante}} : la {{t:big-blind}} a payé une ante de {{n:m11.ante}}. Comment la {{t:range}} d'all-in change-t-elle ?"
    options:
      - { text: "Elle s'élargit : environ {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} au lieu de {{n:m11.push.10}}", correct: true, why: "L'ante augmente le {{t:pot|pot}} que vous remportez quand l'adversaire {{t:fold|se couche}} : {{n:m11.push.10.win-ante}} au lieu de {{n:m11.push.10.win}}. Une main sans chance n'a plus besoin que l'adversaire {{t:fold|se couche}} que dans plus de {{n:m11.push.10.alpha-ante}} des cas, donc davantage d'all-in sont rentables." }
      - { text: "Elle se resserre, car l'adversaire a plus dans le {{t:pot|pot}} et {{t:call|suivra}} plus souvent", why: "L'adversaire {{t:call|suit}} effectivement plus large, mais le {{t:pot}} plus gros à remporter l'emporte. L'équilibre se situe à environ {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} des mains." }
      - { text: "Elle ne change pas", why: "L'ante modifie le rapport entre risque et gain. Sans ante, environ {{n:m11.push.10}} ; avec ante, environ {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
En {{t:tournament|tournoi}}, les blindes augmentent, mais pas le stack. Tôt ou tard, il devient si petit qu'une relance classique ne fonctionne plus. C'est là qu'intervient la stratégie **push/fold** : avec chaque main que vous jouez, vous faites un {{t:shove|push}}, c'est-à-dire que vous partez all-in, et vous {{t:fold|couchez}} le reste.

## Quand c'est all-in ou {{t:fold}}

Vous comptez votre stack en {{t:big-blind|grosses blindes}}. Les sources s'accordent sur un point : à environ **{{n:m11.thr.pushfold}} ou moins**, vous ne jouez presque plus qu'all-in ou {{t:fold}}.

| Stack | Ce que vous faites généralement |
|---|---|
| environ {{n:m11.thr.pushfold}} ou moins | all-in ou {{t:fold}} |
| de {{n:m11.thr.pushfold}} à {{n:m11.thr.upper}} | push/fold avec les mains plus faibles et moyennes |
| plus d'environ {{n:m11.thr.raise}} | relance classique |

Pourquoi pas une relance ? Quand vous avez {{n:m11.depth.10}} et relancez à {{n:pf.open-size}}, il vous reste si peu derrière le {{t:pot|pot}} que, face à une {{t:raise}} all-in, vous devez de toute façon presque forcément {{t:call|suivre}}. L'adversaire sait que vous ne {{t:fold|vous coucherez}} pas, donc il n'a rien à craindre. Partir all-in tout de suite tire de votre stack le maximum de **fold equity**, c'est-à-dire du profit lié au fait que l'adversaire {{t:fold|se couche}}.

:::note Simplification
Le push/fold est une simplification. Les solveurs qui peuvent aussi choisir le limp ou une petite relance limpent ou relancent au minimum une partie des mains à {{n:m11.depth.10}}. All-in ou {{t:fold}} reste toutefois simple, il est difficile d'y commettre une grosse erreur, et les sources le recommandent comme point de départ.
:::

## M : combien de tours de table vous tenez

Un modèle de tournoi populaire mesure le {{t:short-stack}} autrement : le **M**, c'est le stack divisé par le coût d'un tour de table.

```formula
M = stack ÷ (petite blinde + grosse blinde + ante)
```

Exemple : vous avez {{n:m11.m.stack}} {{t:chips|jetons}}, blindes {{n:m11.m.sb}}/{{n:m11.m.bb}}, {{t:bb-ante}} {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. En {{t:big-blind|grosses blindes}}, cela fait {{n:m11.m.bbs}}, mais le M tient aussi compte de l'ante. Avec un M d'environ {{n:m11.m.red}} ou moins ({{t:red-zone}}), il ne vous reste plus que all-in ou {{t:fold}}.

## Plus le stack est court, plus on joue large

Les grilles de cette leçon ont été calculées par le solveur de cette application pour la situation la plus simple : tout le monde {{t:fold|s'est couché}}, vous jouez depuis la {{t:small-blind|petite blinde}} contre la {{t:big-blind|grosse blinde}}, et chacun ne peut que partir all-in ou {{t:fold|se coucher}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

À {{n:m11.depth.15}}, vous partez all-in avec environ {{n:m11.push.15}} des mains, à {{n:m11.depth.10}} avec environ {{n:m11.push.10}}, et à {{n:m11.depth.5}} déjà avec environ {{n:m11.nash.push.5}}–{{n:m11.push.5}}. Moins vous risquez par rapport aux blindes, plus il y a de mains rentables. À titre de comparaison, le tableau d'un site de formation indique {{n:m11.ext.push.10}} à {{n:m11.depth.10}} ; l'écart reste dans la tolérance de validation du solveur, et la tendance est la même.

## Trois joueurs : plus il y a d'adversaires derrière vous, plus c'est serré

Quand vous jouez depuis le Bouton, il reste deux joueurs derrière vous, et non un seul. Chacun d'eux peut avoir une main forte, donc il est plus rare que les deux {{t:fold|se couchent}}. À trois joueurs avec des stacks de {{n:m11.depth.3max}} chacun, le Bouton part all-in avec environ {{n:m11.3max.push.btn}} des mains, et la {{t:small-blind}}, quand le Bouton {{t:fold|s'est couché}}, avec environ {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Nous avons vérifié ces deux grilles par rapport à un résultat d'équilibre publié pour la même situation (article scientifique de 2008 : Bouton {{n:m11.jamfold3.btn}}). Les quelques mains pour lesquelles les résultats diffèrent ne figurent pas dans les exercices.

## Deux façons de gagner

Un all-in gagne quand l'adversaire {{t:fold|se couche}}, ou quand il {{t:call|suit}} et perd au showdown. Le {{t:fold}} de l'adversaire suffit rarement à lui seul : à {{n:m11.depth.10}}, vous risquez {{n:m11.push.10.risk}} pour remporter {{n:m11.push.10.win}} blindes, donc une main sans chance aurait besoin que l'adversaire {{t:fold|se couche}} dans plus de {{n:m11.push.10.alpha}} des cas. C'est pourquoi la fold equity compte, tout comme l'équité de votre main quand l'adversaire {{t:call|suit}}.

## L'ante élargit la {{t:range}}

L'ante, ce sont des {{t:chips}} supplémentaires dans le {{t:pot|pot}} avant la donne. Avec {{t:bb-ante}}, la {{t:big-blind}} paie une ante de {{n:m11.ante}}, donc un all-in remporte {{n:m11.push.10.win-ante}} au lieu de {{n:m11.push.10.win}}, alors que le risque reste le même. Dans cette structure, la {{t:range|range}} passe d'environ {{n:m11.push.10}} à environ {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} des mains (le solveur de l'application et un calcul d'équilibre indépendant diffèrent d'une fraction de point).

```range
push.sb-10-ante
```
