---
id: m8.l4
module: m8
order: 4
title: "Attraper les bluffs"
sub: "Avec quelles mains payer à la river"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}}. À la river, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} la totalité du {{t:pot|pot}}. Les piques ne sont pas rentrés. Quel rôle joue votre {{t:pair|paire}} de neuf ?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher : elle ne bat que les {{t:bluff|bluffs}}", correct: true, why: "Pour la totalité du {{t:pot|pot}}, le Bouton mise {{t:value|pour la value}} avec au moins un roi et {{t:bluff|bluffe}} surtout avec des {{t:draw|tirages}} ratés. Votre {{t:pair|paire}} perd contre chacune de ses mains {{t:value|de value}} et bat chacun de ses {{t:bluff|bluffs}}." }
      - { text: "Une main {{t:value|de value}}", why: "Une main {{t:value|de value}} bat les mains qui paient ou qui misent {{t:value|pour la value}}. Une {{t:pair|paire}} de neuf perd contre chaque roi et contre toute main meilleure du Bouton." }
      - { text: "Une main sans aucune chance", why: "Une {{t:pair|paire}} de neuf bat les {{t:draw|tirages}} ratés, et c'est avec eux que le Bouton {{t:bluff|bluffe}}. Elle a des chances, mais seulement contre les {{t:bluff|bluffs}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Il y a {{n:ex.pot}} dans le {{t:pot|pot}}, et l'adversaire {{t:bet|mise}} la totalité du {{t:pot|pot}} : {{n:ex.bet.pot}}. Vous avez un bluff-catcher. Quel pourcentage minimum de ses mises doit être des {{t:bluff|bluffs}} pour que {{t:call|payer}} soit rentable ? Saisissez un nombre."
    answer: eq.bet-pot
    explanation: "Votre équité, c'est la part de {{t:bluff|bluffs}} dans ses mises. Vous ajoutez {{n:ex.bet.pot}} pour remporter le {{t:pot|pot}} après avoir {{t:call|payé}} : {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. C'est le même nombre que la part de {{t:bluff|bluffs}} à l'équilibre vue dans la leçon précédente."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. L'adversaire {{t:bet|mise}} la moitié du {{t:pot|pot}}. Vous avez un bluff-catcher et vous estimez que les {{t:bluff|bluffs}} représentent environ {{n:catch.ex.bluffs-low}} de ses mises. Que faites-vous ?"
    options:
      - { text: "{{t:fold|Je me couche}}", correct: true, why: "Il vous faut {{n:eq.bet-half}} d'équité, et votre bluff-catcher ne gagne que dans {{n:catch.ex.bluffs-low}} des cas. {{t:call|Payer}} est perdant." }
      - { text: "{{t:call|Je paie}}, car la {{t:mdf|MDF}} est de {{n:mdf.bet-half}}", why: "La {{t:mdf|MDF}} protège contre un adversaire qui {{t:bluff|bluffe}} assez souvent. Quand il y a trop peu de {{t:bluff|bluffs}}, {{t:call|payer}} avec des bluff-catchers revient à donner de l'argent." }
      - { text: "{{t:raise|Je relance}}", why: "Votre main ne bat que les {{t:bluff|bluffs}}. Après une {{t:raise|relance}}, les {{t:bluff|bluffs}} {{t:fold|se couchent}} et les mains {{t:value|de value}} paient : vous perdez davantage." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. L'adversaire {{t:bet|mise}} la totalité du {{t:pot|pot}}. Vous avez un bluff-catcher et vous estimez que les {{t:bluff|bluffs}} représentent environ {{n:catch.ex.bluffs-high}} de ses mises. Que faites-vous ?"
    options:
      - { text: "{{t:call|Je paie}}", correct: true, why: "Il vous faut {{n:eq.bet-pot}} d'équité, et les {{t:bluff|bluffs}} représentent {{n:catch.ex.bluffs-high}}. L'adversaire {{t:bluff|bluffe}} plus que l'équilibre, donc {{t:call|payer}} rapporte." }
      - { text: "{{t:fold|Je me couche}}, car la mise est grosse", why: "Une grosse mise fait monter le prix à {{n:eq.bet-pot}}, mais il y a plus de {{t:bluff|bluffs}} que cela. Ce qui compte, c'est la comparaison de ces deux nombres, pas la seule taille de la mise." }
      - { text: "{{t:raise|Je relance}} all-in", why: "Un bluff-catcher ne {{t:raise|relance}} pas : les {{t:bluff|bluffs}} {{t:fold|se couchent}}, et seules les mains meilleures que la vôtre paient." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "L'adversaire mise la totalité du {{t:pot|pot}} à la river et {{t:bluff|bluffe}} exactement dans {{n:bluff.share.bet-pot}} des cas. Combien gagnez-vous en {{t:call|payant}} avec un bluff-catcher ?"
    options:
      - { text: "Rien : {{t:call|payer}} ou {{t:fold|se coucher}} revient au même", correct: true, why: "Une part de {{t:bluff|bluffs}} égale à {{n:eq.bet-pot}} correspond exactement au prix pour {{t:call|payer}}. Les gains contre les {{t:bluff|bluffs}} compensent les pertes contre la value, donc l'adversaire ne vous laisse gagner ni {{t:call|en payant}}, ni {{t:fold|en vous couchant}}." }
      - { text: "Je gagne, car il y a beaucoup de {{t:bluff|bluffs}}", why: "Il y en a exactement autant que le prix l'exige. Vous ne gagnez que lorsque l'adversaire {{t:bluff|bluffe}} plus souvent que {{n:eq.bet-pot}}." }
      - { text: "Je perds, car il y a plus de value que de {{t:bluff|bluffs}}", why: "Il y a plus de value, mais en {{t:call|payant}}, vous risquez {{n:ex.bet.pot}} pour gagner {{n:ex.pot}} + {{n:ex.bet.pot}}. Avec une telle part de {{t:bluff|bluffs}}, ces deux éléments s'équilibrent." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Les piques ne sont pas rentrés. À la river, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} la totalité du {{t:pot|pot}}. Vous avez {{t:top-pair|top paire}} avec un dix en kicker. Avec laquelle de ces deux mains est-il préférable de {{t:call|payer}} ?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Sans pique, vous ne bloquez pas les {{t:flush-draw|tirages couleur}} ratés, c'est-à-dire les principaux {{t:bluff|bluffs}} du Bouton (p. ex. dix-valet à pique). Il reste dans sa {{t:range|range}} davantage de {{t:bluff|bluffs}} que vous battez." }
      - { text: "[[Kc Ts]]", why: "Le dix de pique retire au Bouton une partie des {{t:draw|tirages}} ratés avec lesquels il {{t:bluff|bluffe}} (p. ex. valet-dix à pique). Il lui reste proportionnellement plus de value, donc {{t:call|payer}} est moins bon." }
      - { text: "Aucune différence", why: "La force au showdown est la même, mais le pique dans votre main bloque des {{t:bluff|bluffs}} du Bouton. Cela change ce contre quoi vous jouez vraiment." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "La troisième carte à cœur est tombée à la river. Vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} la totalité du {{t:pot|pot}}. Vous avez une {{t:pair|paire}} de neuf. Avec laquelle de ces deux mains est-il préférable de {{t:call|payer}} ?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "L'as de cœur bloque la {{t:flush|couleur}} à l'as, l'une des mains {{t:value|de value}} les plus fortes du Bouton. Quand vous bloquez sa value, il reste davantage de {{t:bluff|bluffs}} parmi ses mises." }
      - { text: "[[Ad 9c]]", why: "La même {{t:pair|paire}}, mais vous ne bloquez aucune {{t:flush|couleur}}. Le Bouton a toutes ses couleurs, contre lesquelles vous perdez." }
      - { text: "Aucune différence", why: "Au showdown, les deux mains sont aussi fortes l'une que l'autre, mais l'as de cœur retire au Bouton une partie de ses mains {{t:value|de value}}." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Les piques ne sont pas rentrés. À la river, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} la moitié du {{t:pot|pot}}. Que faites-vous ?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Je me couche}}", correct: true, why: "Vous n'avez que hauteur sept. Vous perdez même contre la plupart des {{t:bluff|bluffs}} du Bouton (dame avec des piques, valet avec des piques), donc ce n'est pas un bluff-catcher. Vous défendez avec d'autres mains." }
      - { text: "{{t:call|Je paie}}, car le prix est bon", why: "Le prix ({{n:eq.bet-half}}) n'aidera pas une main qui perd contre presque tout, même contre les {{t:bluff|bluffs}}." }
      - { text: "{{t:raise|Je relance}} en {{t:bluff|bluff}}", why: "{{t:raise|Relancer}} en {{t:bluff|bluff}} à la river est un coup avancé et risqué. Il est plus simple et meilleur de se coucher avec une main sans chance." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. L'adversaire {{t:bet|mise}} la moitié du {{t:pot|pot}}. La {{t:mdf|MDF}} est de {{n:mdf.bet-half}}. Quelles mains défendez-vous en priorité ?"
    options:
      - { text: "Les meilleurs bluff-catchers : ils battent les {{t:bluff|bluffs}} et ont de bons {{t:blocker|bloqueurs}}", correct: true, why: "Vous défendez les mains qui battent les {{t:bluff|bluffs}}, et parmi les mains de force similaire, vous choisissez celles qui bloquent la value de l'adversaire et ne bloquent pas ses {{t:bluff|bluffs}}. Vous {{t:fold|vous couchez}} avec les mains qui perdent même contre les {{t:bluff|bluffs}}." }
      - { text: "{{n:mdf.bet-half}} de la {{t:range|range}} au hasard", why: "La {{t:mdf|MDF}} indique combien défendre, pas avec quoi. Une défense au hasard paie avec des mains qui ne gagneront jamais." }
      - { text: "Seulement les mains {{t:value|de value}}", why: "Vous défendez alors trop peu, et l'adversaire gagne de l'argent en {{t:bluff|bluffant}} avec n'importe quelles cartes. Pour atteindre la {{t:mdf|MDF}}, vous ajoutez les meilleurs bluff-catchers." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Pourquoi {{t:call|payer}} avec un bluff-catcher à la river plutôt que {{t:raise|relancer}} ?"
    options:
      - { text: "Parce qu'après une {{t:raise|relance}}, les {{t:bluff|bluffs}} {{t:fold|se couchent}} et seules les mains meilleures paient", correct: true, why: "Votre main ne bat que les {{t:bluff|bluffs}}. La {{t:raise|relance}} fait sortir justement ces mains et garde celles contre lesquelles vous perdez." }
      - { text: "Parce qu'il est interdit de {{t:raise|relancer}} à la river", why: "C'est permis. Simplement, une {{t:raise|relance}} avec un bluff-catcher le transforme en {{t:bluff|bluff}} face à des mains qui ne {{t:fold|se coucheront}} pas." }
      - { text: "Parce que {{t:call|payer}} coûte toujours moins cher", why: "Il ne s'agit pas du coût, mais de qui reste dans le coup. Après une {{t:raise|relance}}, il reste les mains qui vous battent." }
---
Vous êtes maintenant de l'autre côté : c'est l'adversaire qui mise à la river, et vous avez une main moyenne. Le plus souvent, ce sera un **bluff-catcher**, c'est-à-dire une main qui perd contre chacune des mains {{t:value|de value}} de l'adversaire, mais qui bat ses {{t:bluff|bluffs}}.

## Votre équité, ce sont ses {{t:bluff|bluffs}}

Un bluff-catcher gagne exactement quand l'adversaire {{t:bluff|bluffe}}. Son équité est donc la part de {{t:bluff|bluffs}} dans les mises de l'adversaire. Vous {{t:call|payez}} quand cette part dépasse l'équité nécessaire vue en M2 :

| Mise de l'adversaire | Équité nécessaire ({{t:bluff|bluffs}} au minimum) |
|---|---|
| 1/3 du {{t:pot|pot}} | {{n:eq.bet-third}} |
| 1/2 du {{t:pot|pot}} | {{n:eq.bet-half}} |
| {{t:pot|Pot}} entier | {{n:eq.bet-pot}} |

Quand l'adversaire {{t:bluff|bluffe}} exactement dans la proportion de la leçon précédente ({{n:bluff.share.bet-pot}} pour une mise de la totalité du {{t:pot|pot}}), {{t:call|payer}} ne rapporte rien et ne coûte rien. Quand il {{t:bluff|bluffe}} plus souvent, vous {{t:call|payez}} ; quand il bluffe plus rarement, vous {{t:fold|vous couchez}}. Les chiffres sont hors rake ; le rake augmente un peu l'équité nécessaire.

## Combien défendre, et avec quoi

Combien défendre, c'est la {{t:mdf|MDF}} vue en M6 qui l'indique : face à une mise de la moitié du {{t:pot|pot}}, environ **{{n:mdf.bet-half}}** de la {{t:range|range}}. Cette leçon répond à la seconde question : **avec quelles mains**. Vous {{t:call|payez}} avec les meilleurs bluff-catchers : parmi les mains de force similaire, vous choisissez celles qui ont de meilleurs {{t:blocker|bloqueurs}} ; vous {{t:fold|vous couchez}} avec les mains qui perdent même contre les {{t:bluff|bluffs}}.

Un meilleur bluff-catcher :

- bat davantage de {{t:bluff|bluffs}} (une {{t:pair|paire}} vaut mieux qu'une simple carte haute),
- bloque les mains {{t:value|de value}} de l'adversaire,
- ne bloque pas ses {{t:bluff|bluffs}}.

## Les {{t:blocker|bloqueurs}} quand vous {{t:call|payez}}

C'est le miroir de la leçon précédente. Quand les piques ne sont pas rentrés, l'adversaire {{t:bluff|bluffe}} avec des {{t:flush-draw|tirages couleur}} ratés. Un pique dans votre main lui retire une partie de ses {{t:bluff|bluffs}}, donc {{t:call|payer}} est moins bon. Quand la {{t:flush|couleur}} est rentrée, l'as de cette couleur dans votre main lui retire ses couleurs les plus fortes, donc {{t:call|payer}} est meilleur.

## Ne relancez pas avec un bluff-catcher

Après une {{t:raise|relance}}, les {{t:bluff|bluffs}} {{t:fold|se couchent}} et seules les mains qui vous battent paient. Avec un bluff-catcher, vous {{t:call|payez}} ou vous {{t:fold|vous couchez}}.

:::note Quand l'adversaire {{t:bluff|bluffe}} rarement
Ces règles supposent un adversaire qui {{t:bluff|bluffe}} à peu près à l'équilibre. Face à un joueur qui {{t:bluff|bluffe}} rarement avec une grosse mise à la river, vous {{t:fold|vous couchez}} plus souvent que ne l'indique la {{t:mdf|MDF}} : quand il y a moins de {{t:bluff|bluffs}} que le prix ne l'exige, {{t:call|payer}} est perdant (le calcul de cette leçon). Les règles de choix des bluff-catchers selon les {{t:blocker|bloqueurs}} proviennent de supports de formation et d'analyses de solveurs (jeu à la river, {{t:blocker|bloqueurs}}) : parmi les bluff-catchers (des mains qui, de toute façon, ne battent que les {{t:bluff|bluffs}}), le solveur choisit les mains avec lesquelles il {{t:call|paie}} davantage selon les {{t:blocker|bloqueurs}} que selon la seule force de la main.
:::
