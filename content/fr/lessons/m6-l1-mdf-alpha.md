---
id: m6.l1
module: m6
order: 1
title: "MDF et alpha"
sub: "Combien défendre quand l'adversaire mise"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Le {{t:pot}} contient {{n:ex.third.pot}}, votre adversaire {{t:bet|mise}} {{n:ex.third.bet}}. Quelle part minimale de votre {{t:range}} devez-vous défendre ({{t:call|suivre}} ou {{t:raise|relancer}}) pour que son {{t:bluff}} sans aucune chance ne soit pas rentable d'office ? Saisissez un pourcentage."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + mise) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. Votre adversaire risque {{n:ex.third.bet}} pour gagner {{n:ex.third.pot}}, donc son {{t:bluff}} est rentable si vous vous {{t:fold|couchez}} dans plus de {{n:alpha.bet-third}} des cas."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Le {{t:pot}} contient {{n:ex.pot}}, votre adversaire {{t:bet|mise}} tout le {{t:pot}} : {{n:ex.bet.pot}}. Quelle est la {{t:mdf}} ? Saisissez un pourcentage."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Avec une mise de la taille du {{t:pot}}, le {{t:bluff}} risque autant qu'il peut gagner : il suffit donc que vous vous {{t:fold|couchiez}} une fois sur deux pour qu'il soit à l'équilibre."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Le {{t:pot}} contient {{n:ex.pot}}, votre adversaire {{t:bet|mise}} la moitié du {{t:pot}} : {{n:ex.bet.half}}. Quelle est la {{t:mdf}} ?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. C'est la part de votre {{t:range}} que vous défendez pour qu'un {{t:bluff}} sans aucune chance ne soit pas rentable." }
      - { text: "{{n:alpha.bet-half}}", why: "C'est l'alpha : la fréquence à laquelle le {{t:bluff}} adverse doit réussir. La {{t:mdf}} en est le complément, soit {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "C'est l'équité requise pour {{t:call|suivre}} avec une seule main (vue en M2). La {{t:mdf}} indique quelle part de toute votre {{t:range}} vous défendez." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Le {{t:pot}} contient {{n:ex.pot}}, votre adversaire {{t:bet|mise}} plus que le {{t:pot}} : {{n:ex.bet.overbet}}. Quelle est la {{t:mdf}} ?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Plus la mise est grosse, plus la part de votre {{t:range}} à défendre est petite." }
      - { text: "{{n:alpha.bet-overbet}}", why: "C'est l'alpha : la fréquence à laquelle un {{t:bluff}} de {{n:ex.bet.overbet}} doit réussir. Vous défendez le reste, soit {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "C'est l'équité requise pour {{t:call|suivre}} : {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Autre nombre, autre question." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Vous {{t:bluff|bluffez}} avec une main sans aucune chance : le {{t:pot}} contient {{n:ex.pot}}, vous {{t:bet|misez}} {{n:ex.bet.half}}. À quelle fréquence votre adversaire doit-il se {{t:fold|coucher}} pour que le {{t:bluff}} soit à l'équilibre ? Saisissez un pourcentage."
    answer: alpha.bet-half
    explanation: "Alpha = mise ÷ ({{t:pot}} + mise) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Vous risquez {{n:ex.bet.half}} pour gagner {{n:ex.pot}} : si votre adversaire se {{t:fold|couche}} plus souvent, le {{t:bluff}} est rentable."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Vous {{t:bluff|bluffez}} : le {{t:pot}} contient {{n:ex.pot}}, vous {{t:bet|misez}} {{n:ex.bet.three-quarters}}. À quelle fréquence votre adversaire doit-il se {{t:fold|coucher}} pour que le {{t:bluff}} soit rentable ?"
    options:
      - { text: "Dans plus de {{n:alpha.bet-three-quarters}} des cas", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. C'est l'alpha pour une mise de 3/4 du {{t:pot}}." }
      - { text: "Dans plus de {{n:mdf.bet-three-quarters}} des cas", why: "C'est la {{t:mdf}}, c'est-à-dire ce que votre adversaire devrait défendre. L'alpha est la part avec laquelle il peut se {{t:fold|coucher}} avant que votre {{t:bluff}} ne devienne rentable : {{n:alpha.bet-three-quarters}}." }
      - { text: "Dans plus de {{n:eq.bet-three-quarters}} des cas", why: "C'est l'équité dont votre adversaire a besoin pour {{t:call|suivre}}. Le seuil du {{t:bluff}} se calcule sans son {{t:call|call}} au dénominateur : {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "Le {{t:pot}} contient {{n:ex.pot}}. Quel {{t:bluff}} sans aucune chance exige le moins d'{{t:fold|abandons}} de votre adversaire : celui à {{n:ex.bet.quarter}} ou celui à {{n:ex.bet.pot}} ?"
    options:
      - { text: "Celui à {{n:ex.bet.quarter}} : plus de {{n:alpha.bet-quarter}} d'{{t:fold|abandons}} suffisent", correct: true, why: "Un petit {{t:bluff}} risque peu : {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. Un {{t:bluff}} de tout le {{t:pot}} exige plus de {{n:alpha.bet-pot}} d'{{t:fold|abandons}}." }
      - { text: "Celui à {{n:ex.bet.pot}} : plus de {{n:alpha.bet-quarter}} d'{{t:fold|abandons}} suffisent", why: "C'est l'inverse. Une mise plus grosse risque davantage, donc votre adversaire doit se {{t:fold|coucher}} plus souvent : plus de {{n:alpha.bet-pot}} pour tout le {{t:pot}}." }
      - { text: "Les deux en exigent autant", why: "L'alpha dépend de la taille : {{n:alpha.bet-quarter}} à {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} à {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, votre adversaire {{t:bet|mise}} 1/3 du {{t:pot}}. La {{t:mdf}} est de {{n:mdf.bet-third}}, et il vous faut {{n:eq.bet-third}} d'équité pour {{t:call|suivre}}. Comment concilier ces deux nombres ?"
    options:
      - { text: "La {{t:mdf}} concerne toute votre {{t:range}}, l'équité une seule main", correct: true, why: "La {{t:mdf}} indique quelle part de toutes vos mains vous défendez pour que votre adversaire ne puisse pas {{t:bluff|bluffer}} avec n'importe quelles cartes. L'équité requise indique s'il est rentable de {{t:call|suivre}} avec une main précise face à ce avec quoi votre adversaire {{t:bet|mise}} réellement." }
      - { text: "L'un des deux est mal calculé", why: "Les deux sont justes : {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} et {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Ils répondent à des questions différentes." }
      - { text: "Vous {{t:call|suivez}} quand vous avez au moins {{n:mdf.bet-third}} d'équité", why: "C'est une confusion de notions. Pour {{t:call|suivre}}, {{n:eq.bet-third}} d'équité suffisent. {{n:mdf.bet-third}} est une part de votre {{t:range}}, et non les chances d'une seule main." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Vous défendez votre {{t:big-blind|grosse blinde}}, le Bouton {{t:bet|mise}} un c-bet de 1/3 du {{t:pot}}. La {{t:mdf}} est de {{n:mdf.bet-third}}. Devez-vous défendre autant de mains ?"
    table: { position: BB }
    options:
      - { text: "Non, vous pouvez défendre un peu moins", correct: true, why: "La {{t:mdf}} suppose un {{t:bluff}} sans aucune chance. Au flop, les {{t:bluff|bluffs}} du Bouton ont encore de l'équité ({{t:draw|tirages}}, cartes hautes), et {{t:out-of-position|hors de position}}, vous ne réaliserez pas toute l'équité de vos mains faibles. C'est pourquoi vous pouvez défendre un peu moins que la {{t:mdf}}, mais vous ne vous {{t:fold|couchez}} pas massivement face à un petit c-bet." }
      - { text: "Oui, sinon le Bouton gagne de l'argent avec n'importe quelle main", why: "Ce serait le cas à la river. Au flop, le Bouton ne {{t:bluff|bluffe}} pas avec une main sans aucune chance : même si vous le {{t:call|suivez}}, il peut toucher. La {{t:mdf}} est un repère, pas une obligation." }
      - { text: "Non, vous défendez plus, car ce n'est que le flop", why: "C'est l'inverse. Les {{t:street|streets}} à venir avantagent le miseur {{t:in-position|en position}}, donc vous défendez moins, pas plus." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Un joueur dont vous savez, grâce à de nombreuses mains précédentes, qu'il {{t:bluff|bluffe}} rarement {{t:bet|mise}} tout le {{t:pot}} à la river. Vous avez une {{t:pair|paire}} de rois avec un kicker faible. Que faites-vous ?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Je me couche}}", correct: true, why: "Vous savez, grâce à de nombreuses mains précédentes, que ce joueur {{t:bluff|bluffe}} rarement. Quand les {{t:bluff|bluffs}} manquent, votre {{t:pair|paire}} paie surtout des mains meilleures (KQ, sets). Face à un tel joueur, vous vous {{t:fold|couchez}} plus souvent que ne l'indique la {{t:mdf}}." }
      - { text: "{{t:call|Je paie}}, car la {{t:mdf}} impose de défendre {{n:mdf.bet-pot}}", why: "La {{t:mdf}} vous protège contre un joueur qui {{t:bluff|bluffe}} assez souvent. Ce joueur ne le fait pas, donc s'en tenir à la {{t:mdf}} revient à lui donner de l'argent." }
      - { text: "{{t:raise|Je relance}} all-in", why: "Les mains meilleures paieront, les moins bonnes se {{t:fold|coucheront}}. Une {{t:pair|paire}} avec un kicker faible n'est pas une main pour {{t:raise|relancer}}." }
---
Quand votre adversaire {{t:bet|mise}}, vous ne vous demandez pas seulement « cette main peut-elle gagner ? ». Vous regardez aussi toutes les mains que vous pouvez avoir dans cette situation, c'est-à-dire votre {{t:range}}. Deux nombres indiquent combien d'entre elles défendre et à quelle fréquence le {{t:bluff}} adverse doit réussir.

## Alpha : à quelle fréquence un {{t:bluff}} doit réussir

Un {{t:bluff}} sans aucune chance ne gagne que si votre adversaire se {{t:fold|couche}}. Vous risquez la mise pour gagner le {{t:pot}}.

```formula
alpha = mise ÷ (pot + mise)
```

Exemple : le {{t:pot}} contient {{n:ex.pot}}, vous {{t:bet|misez}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Si votre adversaire se {{t:fold|couche}} plus souvent, votre {{t:bluff}} est rentable même sans aucune main.

## La {{t:mdf}} : combien vous devez défendre

La {{t:mdf}} (fréquence minimale de défense) est le revers de l'alpha. Si vous défendez ({{t:call|suivez}} ou {{t:raise|relancez}}) moins de mains, votre adversaire gagne de l'argent en {{t:bluff|bluffant}} avec n'importe quelles cartes.

```formula
MDF = pot ÷ (pot + mise)
```

Exemple à la river : le {{t:pot}} contient {{n:ex.third.pot}}, votre adversaire {{t:bet|mise}} {{n:ex.third.bet}}, soit 1/3 du {{t:pot}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Mise adverse | {{t:mdf}} | Alpha | Équité requise |
|---|---|---|---|
| 1/4 du {{t:pot}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 du {{t:pot}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 du {{t:pot}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 du {{t:pot}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Tout le {{t:pot}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## La {{t:mdf}} n'est pas l'équité requise

L'équité requise vue en M2 concerne **une seule main** : est-il rentable de {{t:call|suivre}} avec elle ? La {{t:mdf}} concerne **toute votre {{t:range}}** : quelle part vous en défendez. Face à une mise de 1/3 du {{t:pot}} à la river, la {{t:mdf}} suggère de défendre environ {{n:mdf.bet-third}} de vos mains, tandis que {{t:call|suivre}} avec une main donnée est rentable si elle gagne dans au moins {{n:eq.bet-third}} des cas.

## Au flop, {{t:out-of-position|hors de position}}, vous défendez moins

La {{t:mdf}} suppose que le {{t:bluff}} adverse n'a aucune chance. C'est à la river que c'est le plus proche de la réalité, car les {{t:draw|tirages}} ne peuvent plus s'améliorer. Au flop, les {{t:bluff|bluffs}} ont encore de l'équité : les {{t:draw|tirages}} et les cartes hautes peuvent s'améliorer. De plus, {{t:out-of-position|hors de position}}, vous ne réaliserez pas toute l'équité de vos mains faibles. C'est pourquoi, au flop {{t:out-of-position|hors de position}}, vous pouvez défendre moins que la {{t:mdf}} (nettement moins sur les flops défavorables au défenseur) et la considérer comme un repère, pas comme une obligation ; vous ne vous {{t:fold|couchez}} toutefois pas massivement face aux petits c-bets. Dans un exemple au turn, le solveur défendait en moyenne près de la {{t:mdf}}.

:::note Quand l'adversaire {{t:bluff|bluffe}} rarement
La {{t:mdf}} vous protège contre un joueur qui {{t:bluff|bluffe}} assez souvent. Si vous savez, par observation, qu'un joueur précis {{t:bluff|bluffe}} trop rarement avec de grosses mises à la river, face à lui vous vous {{t:fold|couchez}} plus souvent que ne l'indique la {{t:mdf}} : {{t:call|suivre}} avec une {{t:pair|paire}} plus faible paie surtout des mains meilleures. C'est de l'{{t:exploit|exploitation}}, pas une stratégie à appliquer contre tout le monde (plus de détails dans le module 10).
:::
