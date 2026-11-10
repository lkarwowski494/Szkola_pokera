---
id: m8.l2
module: m8
order: 2
title: "Combien bluffer"
sub: "La proportion de bluffs selon la taille de la mise"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Le {{t:pot}} est de {{n:ex.pot}} et vous misez tout le {{t:pot}} : {{n:ex.bet.pot}}. Votre {{t:range}} se compose de mains très fortes et de {{t:bluff|bluffs}}. Quelle part de vos mises doit être des {{t:bluff|bluffs}} pour que votre adversaire ne puisse pas vous exploiter ? Saisissez un nombre en pourcentage."
    answer: bluff.share.bet-pot
    explanation: "Part des {{t:bluff|bluffs}} = mise ÷ ({{t:pot}} + 2·mise) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Une mise sur trois est un {{t:bluff}} : la main de l'adversaire qui ne bat que les {{t:bluff|bluffs}} ne gagne alors rien, ni en {{t:call|suivant}}, ni en {{t:fold|se couchant}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Le {{t:pot}} est de {{n:ex.pot}} et vous misez la moitié du {{t:pot}} : {{n:ex.bet.half}}. À l'équilibre, quelle part de vos mises sont des {{t:bluff|bluffs}} ? Saisissez un nombre en pourcentage."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Une mise plus petite offre à l'adversaire un meilleur prix, donc il y a moins de {{t:bluff|bluffs}} qu'avec une mise du {{t:pot}} entier ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Le {{t:pot}} est de {{n:ex.pot}} et vous misez {{n:ex.bet.three-quarters}}. À l'équilibre, quelle part de vos mises sont des {{t:bluff|bluffs}} ?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. C'est le même nombre que l'équité dont l'adversaire a besoin pour {{t:call|suivre}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "C'est alpha : la fréquence à laquelle un {{t:bluff}} isolé sans chance doit réussir. La part des {{t:bluff|bluffs}} dans votre {{t:range}} se calcule avec les deux mises au dénominateur : {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "C'est la {{t:mdf}}, c'est-à-dire la part que l'adversaire devrait défendre. La part de vos {{t:bluff|bluffs}} est de {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Le {{t:pot}} est de {{n:ex.pot}} et vous misez plus que le {{t:pot}} : {{n:ex.bet.overbet}}. À l'équilibre, quelle part de vos mises sont des {{t:bluff|bluffs}} ?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Un {{t:overbet}}, c'est-à-dire une {{t:bet|mise}} supérieure au {{t:pot}} entier, offre à l'adversaire le pire prix : vous pouvez donc y mettre le plus de {{t:bluff|bluffs}}, mais toujours moins de la moitié." }
      - { text: "{{n:alpha.bet-overbet}}", why: "C'est alpha pour cette taille : la fréquence à laquelle l'adversaire doit {{t:fold|se coucher}} pour qu'un {{t:bluff}} isolé soit rentable. La part des {{t:bluff|bluffs}} dans votre {{t:range}} est de {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "C'est la part des {{t:bluff|bluffs}} pour une mise du {{t:pot}} entier. Avec une mise de {{n:ex.bet.overbet}}, il y en a plus : {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Avec quelle mise à la river avez-vous plus de {{t:bluff|bluffs}} dans votre {{t:range}} : 1/3 du {{t:pot}} ou le {{t:pot}} entier ?"
    options:
      - { text: "Avec le {{t:pot}} entier", correct: true, why: "À 1/3 du {{t:pot}}, les {{t:bluff|bluffs}} représentent env. {{n:bluff.share.bet-third}} des mises ; au {{t:pot}} entier, env. {{n:bluff.share.bet-pot}}. Une mise plus grosse offre à l'adversaire un moins bon prix, donc son {{t:call}} a besoin de plus de {{t:bluff|bluffs}} pour être rentable." }
      - { text: "Avec 1/3 du {{t:pot}}", why: "C'est l'inverse. Une petite mise offre un bon prix à l'adversaire : pour {{t:call|suivre}}, il lui suffit d'env. {{n:bluff.share.bet-third}} de {{t:bluff|bluffs}} dans vos mises. Avec davantage de {{t:bluff|bluffs}}, il paierait avec profit." }
      - { text: "Autant", why: "La part des {{t:bluff|bluffs}} dépend de la taille : env. {{n:bluff.share.bet-third}} à 1/3 du {{t:pot}}, env. {{n:bluff.share.bet-pot}} au {{t:pot}} entier." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Vous misez tout le {{t:pot}} à la river. Alpha vaut {{n:alpha.bet-pot}} et la part des {{t:bluff|bluffs}} {{n:bluff.share.bet-pot}}. Que dit chacun de ces nombres ?"
    options:
      - { text: "Alpha : à quelle fréquence l'adversaire doit {{t:fold|se coucher}} ; part : quelle fraction de vos mises sont des {{t:bluff|bluffs}}", correct: true, why: "Alpha concerne un seul {{t:bluff}} sans chance : il rentre dans ses frais quand l'adversaire {{t:fold|se couche}} dans {{n:alpha.bet-pot}} des cas. La part des {{t:bluff|bluffs}} décrit la composition de votre {{t:range}} : une mise sur trois est un {{t:bluff}}, pour que le {{t:call}} de l'adversaire rentre dans ses frais." }
      - { text: "Ce sont deux noms pour la même chose, l'un des deux est mal calculé", why: "Les deux sont bien calculés : alpha = mise ÷ ({{t:pot}} + mise), part des {{t:bluff|bluffs}} = mise ÷ ({{t:pot}} + 2·mise). Ils répondent à des questions différentes." }
      - { text: "Alpha : combien de {{t:bluff|bluffs}} vous avez dans votre {{t:range}} ; part : à quelle fréquence l'adversaire {{t:fold|se couche}}", why: "C'est l'inverse. Alpha est le seuil de {{t:fold|folds}} de l'adversaire pour un seul {{t:bluff}}, et la part des {{t:bluff|bluffs}} est la composition de votre {{t:range}} de mises." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Pourquoi calculez-vous la part des {{t:bluff|bluffs}} dans vos mises avec la même formule que l'équité dont l'adversaire a besoin pour {{t:call|suivre}} ?"
    options:
      - { text: "Parce que la main de l'adversaire qui attrape les {{t:bluff|bluffs}} gagne exactement quand vous {{t:bluff|bluffez}}", correct: true, why: "Sa main perd contre vos mains de value et bat vos {{t:bluff|bluffs}}, donc son équité est la part des {{t:bluff|bluffs}}. Quand celle-ci est égale à l'équité requise, le {{t:call}} rentre dans ses frais et l'adversaire ne peut vous exploiter ni en suivant, ni en se couchant." }
      - { text: "C'est un hasard, les formules se ressemblent seulement", why: "Ce n'est pas un hasard. Vous choisissez la part des {{t:bluff|bluffs}} de sorte que l'équité d'une main qui attrape les {{t:bluff|bluffs}} soit égale à son prix." }
      - { text: "Parce que l'adversaire a toujours exactement l'équité requise", why: "L'adversaire a l'équité qui découle de vos mises. C'est vous qui choisissez le nombre de {{t:bluff|bluffs}} pour que le résultat soit nul." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Vous misez tout le {{t:pot}} à la river, mais vos {{t:bluff|bluffs}} représentent la moitié de vos mises, et non {{n:bluff.share.bet-pot}}. Que peut faire un adversaire attentif ?"
    options:
      - { text: "{{t:call|Suivre}} plus souvent, même avec des mains faibles qui attrapent les {{t:bluff|bluffs}}", correct: true, why: "Son {{t:call}} gagne la moitié du temps, alors qu'il n'a besoin que de {{n:eq.bet-pot}}. En payant davantage, il gagne plus sur vos {{t:bluff|bluffs}} qu'il ne perd contre vos mains de value." }
      - { text: "{{t:fold|Se coucher}} plus souvent", why: "En se couchant, il vous laisse le {{t:pot}} avec vos {{t:bluff|bluffs}}. Quand il y a trop de {{t:bluff|bluffs}}, l'adversaire gagne en {{t:call|suivant}}." }
      - { text: "Rien, la proportion n'a pas d'importance", why: "Si : avec trop de {{t:bluff|bluffs}}, chaque {{t:call}} avec une main qui attrape les {{t:bluff|bluffs}} est rentable pour l'adversaire." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "À la river, vous misez tout le {{t:pot}} presque uniquement {{t:value|en value}}, presque sans {{t:bluff|bluffs}}. Que peut faire un adversaire attentif ?"
    options:
      - { text: "{{t:fold|Se coucher}} avec toutes les mains qui ne battent que les {{t:bluff|bluffs}}", correct: true, why: "Quand les {{t:bluff|bluffs}} sont en dessous de {{n:bluff.share.bet-pot}}, un {{t:call}} avec une main qui attrape les {{t:bluff|bluffs}} perd. L'adversaire ne paie alors qu'avec de meilleures mains, et vos mises {{t:value|en value}} sont payées moins souvent." }
      - { text: "{{t:call|Suivre}} plus souvent", why: "En {{t:call|suivant}}, il paierait surtout vos mains de value. Sans {{t:bluff|bluffs}} dans votre {{t:range}}, il a intérêt à {{t:fold|se coucher}}." }
      - { text: "{{t:raise|Relancer}} avec chaque main", why: "{{t:raise|Relancer}} votre main forte sans avoir une meilleure main est une perte assurée. L'adversaire se contente de {{t:fold|se coucher}} plus souvent." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "À la river, vous misez tout le {{t:pot}} avec une {{t:range}} composée de {{n:bluff.ex.range}} {{t:combo|combos}} : de value et de {{t:bluff|bluffs}}. À l'équilibre, combien d'entre eux sont des {{t:bluff|bluffs}} ?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|bluffs}} et {{n:bluff.ex.value}} {{t:combo|combos}} {{t:value|de value}} : un {{t:bluff}} pour deux mains {{t:value|de value}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "C'est ce qu'on obtiendrait avec alpha ({{n:alpha.bet-pot}}). Alpha est le seuil de {{t:fold|folds}} pour un seul {{t:bluff}}, pas la part des {{t:bluff|bluffs}} dans votre {{t:range}}." }
      - { text: "{{n:bluff.ex.value}}", why: "C'est le nombre de {{t:combo|combos}} {{t:value|de value}}. Les {{t:bluff|bluffs}} sont deux fois moins nombreux : {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "À la river, il vous faut quelques {{t:bluff|bluffs}} pour vos mises du {{t:pot}} entier. Quelles mains choisissez-vous ?"
    options:
      - { text: "Les plus faibles, p. ex. des {{t:draw|tirages}} à la {{t:straight|quinte}} ratés ou des cartes hautes sans chance", correct: true, why: "Une main sans chance au showdown ne perd rien quand le {{t:bluff}} échoue : après un {{t:check}}, elle aurait perdu de toute façon. C'est pourquoi c'est elle qui {{t:bluff|bluffe}}." }
      - { text: "Les {{t:pair|paires}} moyennes", why: "Une {{t:pair|paire}} moyenne gagne souvent après un {{t:check}}. Si vous {{t:bluff|bluffez}} avec, les mains moins bonnes {{t:fold|se couchent}} et les meilleures paient : vous renoncez à un gain au showdown." }
      - { text: "N'importe lesquelles, tant que la proportion est respectée", why: "La proportion ne fait pas tout. Un {{t:bluff}} avec une main qui gagnerait au showdown coûte plus cher qu'un {{t:bluff}} avec une main sans chance." }
---
Dans la première leçon, vous misiez {{t:value|en value}}. Mais si vous ne misiez à la river qu'avec des mains fortes, un adversaire attentif se coucherait avec tout sauf des mains encore plus fortes, et vos mises ne seraient presque jamais payées. Les {{t:bluff|bluffs}} font qu'il est rentable pour l'adversaire de payer.

## {{t:range|Range}} {{t:polarized|polarisée}}

À la river, {{t:in-position|en position}}, vous misez souvent avec une **{{t:range}} {{t:polarized|polarisée}}** (comme en M7) : des mains très fortes {{t:value|en value}} et des {{t:bluff|bluffs}}, sans mains moyennes (celles-ci {{t:check|checkent}}, comme dans la première leçon). À la river, les {{t:bluff|bluffs}} sont des mains sans chance au showdown. L'adversaire a alors beaucoup de mains qui perdent contre vos mains de value mais battent vos {{t:bluff|bluffs}}. Ce sont les **bluff-catchers** (mains qui attrapent les {{t:bluff|bluffs}}).

## Combien de {{t:bluff|bluffs}}

Vous choisissez le nombre de {{t:bluff|bluffs}} de sorte que le bluff-catcher de l'adversaire rentre dans ses frais, qu'il {{t:call|suive}} ou qu'il {{t:fold|se couche}} :

```formula
part des bluffs = mise ÷ (pot + 2·mise)
```

C'est la même formule que celle de l'équité nécessaire pour {{t:call|suivre}}, vue en M2. Ce n'est pas un hasard : le bluff-catcher gagne exactement quand vous {{t:bluff|bluffez}}, donc son équité est la part de vos {{t:bluff|bluffs}}. Avec une mise du {{t:pot}} entier : {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, donc une mise sur trois est un {{t:bluff}}.

## Mise plus grosse, plus de {{t:bluff|bluffs}}

| Mise | Part des {{t:bluff|bluffs}} | Alpha (du M6) |
|---|---|---|
| 1/3 du {{t:pot}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 du {{t:pot}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 du {{t:pot}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| {{t:pot|Pot}} entier | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Une mise plus grosse offre à l'adversaire un moins bon prix, vous pouvez donc y inclure plus de {{t:bluff|bluffs}}. Une petite mise n'en supporte que quelques-uns.

## La part des {{t:bluff|bluffs}} n'est pas alpha

L'alpha du M6 = mise ÷ ({{t:pot}} + mise) indique à quelle fréquence l'adversaire doit {{t:fold|se coucher}} pour qu'**un seul** {{t:bluff}} sans chance rentre dans ses frais. La part des {{t:bluff|bluffs}} = mise ÷ ({{t:pot}} + 2·mise) indique quelle fraction de **toute votre {{t:range}} de mises** est constituée de {{t:bluff|bluffs}}. Avec une mise du {{t:pot}} entier, un {{t:bluff}} a besoin de plus de {{n:alpha.bet-pot}} de {{t:fold|folds}}, alors que votre {{t:range}} contient {{n:bluff.share.bet-pot}} de {{t:bluff|bluffs}}. Le second dénominateur contient une mise supplémentaire, car vous calculez le prix du {{t:call}} de l'adversaire.

## Avec quoi {{t:bluff|bluffer}}

Pour vos {{t:bluff|bluffs}}, vous choisissez vos **mains les plus faibles**, p. ex. des {{t:draw|tirages}} à la {{t:straight|quinte}} ratés ou des cartes hautes sans chance (les {{t:flush|couleurs}} ratées sont traitées dans la leçon sur les {{t:blocker|bloqueurs}}) : après un {{t:check}}, elles perdraient de toute façon, donc un {{t:bluff}} raté ne leur enlève rien. Les mains qui ont de la valeur au showdown {{t:check|checkent}}.

:::note C'est un point d'équilibre, pas une recette pour chaque adversaire
Ces proportions vous protègent contre un adversaire qui joue bien. Face à des joueurs précis, vous pouvez vous en écarter ; c'est l'objet du module sur l'{{t:exploit|exploitation}} aux micro-limites (M10). La formule de la part des {{t:bluff|bluffs}} est un calcul dans un modèle simplifié : une {{t:range}} {{t:polarized|polarisée}} contre une main qui attrape les {{t:bluff|bluffs}} (modèle jouet issu de la théorie des jeux). La recommandation de {{t:bluff|bluffer}} avec les mains les plus faibles provient de supports de formation et d'analyses de solveurs.
:::
