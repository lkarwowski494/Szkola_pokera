---
id: m10.l2
module: m10
order: 2
title: "Types de joueurs"
sub: "Nit, reg, joueur passif, maniaque"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "Après {{n:hud.ex.reg.hands}} mains, votre adversaire a un {{t:vpip}} de {{n:hud.ex.passive.vpip}} et un {{t:pfr}} de {{n:hud.ex.passive.pfr}}. Qu’est-ce que cela dit de son jeu avant le flop ?"
    options:
      - { text: "Il est passif : avec la plupart de ses mains, il se contente de {{t:call|suivre}} ou de limper", correct: true, why: "L’écart {{t:vpip}} − {{t:pfr}} est de {{n:hud.ex.passive.gap}} points, au-dessus du seuil de {{n:hud.gap.passive}}. Il joue un assez grand nombre de mains, mais met la plupart d’entre elles dans le {{t:pot}} sans {{t:raise|relance}}." }
      - { text: "Il est agressif, parce qu’il joue beaucoup de mains", why: "Le nombre de mains ({{t:vpip}}) indique à quel point il joue large, pas à quel point il est agressif. L’agressivité se lit dans le {{t:pfr}} et dans l’écart entre les deux." }
      - { text: "C’est un {{t:nit}}", why: "Un {{t:nit}} joue jusqu’à environ {{n:hud.vpip.nit-max}} des mains ; ce joueur en joue nettement plus." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "D’après les données de population des micro-limites en ligne (NL25), les {{t:recreational|joueurs récréatifs}} vont jusqu’au showdown dans {{n:mda.rec.wtsd}} des cas et remportent {{n:mda.rec.wsd}} des showdowns ; les {{t:regular|regs}}, {{n:mda.reg.wtsd}} et {{n:mda.reg.wsd}}. Qu’en conclure ?"
    options:
      - { text: "Les {{t:recreational|joueurs récréatifs}} paient plus souvent jusqu’au bout et perdent plus souvent : ils {{t:call|suivent}} avec des mains plus faibles", correct: true, why: "Ils vont plus souvent au showdown et le gagnent moins souvent, donc ils y arrivent avec des mains plus faibles. Contre eux, vous misez plus de mains {{t:value|pour la valeur}} et vous {{t:bluff|bluffez}} moins." }
      - { text: "Les {{t:recreational|joueurs récréatifs}} {{t:bluff|bluffent}} plus souvent", why: "Ces chiffres indiquent à quelle fréquence ils vont au showdown et avec quoi, pas leurs {{t:bluff|bluffs}}. Ils gagnent moins de showdowns parce qu’ils {{t:call|suivent}} avec des mains plus faibles." }
      - { text: "Rien : un écart de quelques points, c’est du bruit", why: "Ce sont des données sur toute la population de cette {{t:stakes|limite}} sur {{n:mda.period.months}} mois, et non sur quelques dizaines de mains d’un seul joueur. La différence est cohérente en NL25, NL50 et NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Vous avez misé au flop et au turn, votre adversaire a {{t:call|suivi}}. C’est un {{t:recreational|joueur récréatif}} passif ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} mains). Il {{t:check|checke}}. Que faites-vous avec une {{t:top-pair|top paire}} et le deuxième meilleur kicker ?"
    options:
      - { text: "Je mise {{t:value|pour la valeur}}", correct: true, why: "Ce type de joueur {{t:call|suit}} jusqu’au bout avec des rois plus faibles, des huit et des {{t:pair|paires}} servies. Plus de la moitié des mains avec lesquelles il {{t:call|suit}} sont moins bonnes que la vôtre, donc la mise rapporte (le seuil du module 8)." }
      - { text: "Je {{t:check|checke}} pour ne pas tomber sur une meilleure main", why: "Contre un joueur qui {{t:call|suit}} avec des mains plus faibles, un {{t:check}} laisse filer de la valeur. Les meilleures mains paieront parfois, mais les mains moins bonnes qui {{t:call|suivent}} sont plus nombreuses." }
      - { text: "Je mise tout le {{t:pot}} en {{t:bluff}}", why: "Avec une {{t:top-pair|top paire}}, ce n’est pas un {{t:bluff}} : vous battez beaucoup des mains qui vont {{t:call|suivre}}. La mise est {{t:value|pour la valeur}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, {{t:straight-draw|tirage quinte}} manqué. Votre adversaire est un {{t:recreational|joueur récréatif}} passif ({{t:wtsd}} {{n:mda.rec.wtsd}}), il a {{t:call|suivi}} au flop et au turn. Il {{t:check|checke}}. Que faites-vous ?"
    options:
      - { text: "Je {{t:check|checke}} et j’abandonne le {{t:pot}}", correct: true, why: "Un {{t:bluff}} ne rapporte que si l’adversaire {{t:fold|se couche}} plus souvent que l’{{t:alpha}} de votre mise. Un joueur qui a {{t:call|suivi}} sur deux {{t:street|streets}} et va souvent au showdown {{t:fold|se couche}} rarement à la river." }
      - { text: "Je mise gros, parce que je n’ai pas de valeur au showdown", why: "Dans la stratégie de base (module 8), un tel {{t:bluff}} peut être bon, mais ce joueur ne {{t:fold|se couche}} pas assez souvent : le {{t:bluff}} perd de l’argent." }
      - { text: "Je mise petit pour que le {{t:bluff}} coûte moins cher", why: "Une mise plus petite exige que l’adversaire {{t:fold|se couche}} moins souvent, mais une main qui a {{t:call|suivi}} sur deux {{t:street|streets}} {{t:call|suivra}} généralement aussi une petite mise. Mieux vaut abandonner le {{t:pot}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "Vous {{t:open|ouvrez}} depuis le {{t:cutoff|CO}}. Un {{t:nit}} est au Bouton : {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} mains. Il vous 3-bette. Que faites-vous avec AJo ?"
    options:
      - { text: "Je {{t:fold|me couche}}", correct: true, why: "Quelqu’un qui joue si peu de mains 3-bette surtout avec les plus fortes : AQ, AK et les hautes {{t:pair|paires}}, qui dominent AJ. Contre lui, vous {{t:fold|vous couchez}} plus souvent que dans la stratégie de base du module 4." }
      - { text: "Je {{t:call|suis}}, parce que AJ est une main forte", why: "AJ est fort contre une {{t:range}} large. Face au 3-bet d’un joueur à {{t:vpip}} {{n:hud.ex.nit.vpip}}, il est souvent dominé et hors de {{t:position}}." }
      - { text: "Je 4-bette", why: "4-better AJ contre un {{t:nit}}, c’est jouer contre une {{t:range}} qui le domine et {{t:fold|se couche}} rarement. Ce n’est ni de la {{t:value|valeur}}, ni un bon {{t:bluff}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Vous êtes au Bouton, tout le monde {{t:fold|s’est couché}}. Un {{t:nit}} est en {{t:big-blind|grosse blinde}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} après {{n:hud.ex.reg.hands}} mains). Comment ajustez-vous votre {{t:open|ouverture}} ?"
    options:
      - { text: "J’{{t:open|ouvre}} plus large que dans la stratégie de base", correct: true, why: "Un {{t:nit}} défend sa blinde de façon serrée, donc votre {{t:open|ouverture}} gagne plus souvent tout de suite, même avec une main faible." }
      - { text: "J’{{t:open|ouvre}} plus serré, parce que le {{t:nit}} a des mains fortes", why: "Un {{t:nit}} a des mains fortes quand il joue. En {{t:big-blind|grosse blinde}}, il {{t:fold|se couche}} le plus souvent, et c’est votre profit." }
      - { text: "Aucun changement : le type de joueur n’influe pas sur le vol de blindes", why: "Si, il influe. Le profit du vol dépend de la fréquence à laquelle la blinde {{t:fold|se couche}}, et un {{t:nit}} {{t:fold|se couche}} souvent." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "Votre adversaire est un {{t:maniac|maniaque}} : {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} après {{n:hud.ex.reg.hands}} mains. Il a misé à chaque {{t:street}}, et à la river il {{t:bet|mise}} tout le {{t:pot}}. Que faites-vous avec une {{t:top-pair|top paire}} et un kicker faible ?"
    options:
      - { text: "Je {{t:call|suis}}", correct: true, why: "Contre un joueur qui {{t:bluff|bluffe}} plus que dans la stratégie de base, les mains limites pour {{t:call|suivre}} rapportent. Une top {{t:pair|paire}} bat ses {{t:bluff|bluffs}} et une partie de ses mains de valeur." }
      - { text: "Je {{t:fold|me couche}}, parce qu’une mise de tout le {{t:pot}} signifie une main forte", why: "Chez un joueur qui joue presque chaque main en {{t:raise|relançant}} et mise à chaque {{t:street}}, une grosse mise contient beaucoup de {{t:bluff|bluffs}}. En vous {{t:fold|couchant}}, vous le payez pour son agressivité." }
      - { text: "Je {{t:raise|relance}} all-in", why: "Une {{t:raise|relance}} fait {{t:fold|coucher}} les {{t:bluff|bluffs}} et {{t:call|suivre}} les meilleures mains. Avec une main qui attrape les {{t:bluff|bluffs}}, {{t:call|suivre}} suffit." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Vous jouez contre un {{t:maniac|maniaque}}. Au turn, vous avez une main faible sans chance de s’améliorer, et il {{t:check|checke}}. Que faites-vous ?"
    options:
      - { text: "Je {{t:check|checke}} : {{t:bluff|bluffer}} un {{t:maniac|maniaque}} marche rarement", correct: true, why: "Un {{t:maniac|maniaque}} {{t:fold|se couche}} rarement et {{t:raise|relance}} souvent. Contre lui, vous gagnez de l’argent en {{t:call|suivant}} avec des mains plus fortes, pas en {{t:bluff|bluffant}}." }
      - { text: "Je mise, parce que le {{t:check}} d’un {{t:maniac|maniaque}} signifie de la faiblesse", why: "C’est possible, mais un {{t:maniac|maniaque}} {{t:raise|relance}} souvent avec n’importe quelle main. Un {{t:bluff}} a besoin que l’adversaire {{t:fold|se couche}}, ce qu’il fait rarement." }
      - { text: "Je mise all-in pour qu’il ne puisse pas {{t:raise|relancer}}", why: "Vous risquez tout votre stack pour gagner un petit {{t:pot}}, contre un joueur qui {{t:fold|se couche}} rarement. C’est la façon la plus chère de {{t:bluff|bluffer}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Les statistiques de la leçon précédente dessinent quelques profils typiques. Le type de joueur vous dit dans quel sens il s’écarte de la stratégie de base : il joue trop peu de mains, trop de mains, {{t:call|suit}} trop souvent ou {{t:raise|relance}} trop souvent.

## Deux chiffres, quatre types

Vous lisez le type à partir du {{t:vpip}} et de l’écart {{t:vpip}} − {{t:pfr}} (6-max, au moins environ {{n:hud.hands.vpip.low}} mains) :

| Type | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Erreur par rapport à la base |
|---|---|---|---|
| {{t:nit|Nit}} | jusqu’à environ {{n:hud.vpip.nit-max}} | faible | joue trop peu de mains |
| {{t:regular|Reg}} ({{t:tag}}, {{t:lag}}) | environ {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | faible | proche de la base |
| {{t:recreational|joueur récréatif}} passif | à partir d’environ {{n:hud.vpip.loose}} | plus de {{n:hud.gap.passive}} points | trop de mains, {{t:call|suit}} trop souvent |
| {{t:maniac|maniaque}} | à partir d’environ {{n:hud.vpip.loose}} | jusqu’à environ {{n:hud.gap.aggressive}} points | trop de mains, {{t:raise|relance}} trop souvent |

Le joueur passif avec un grand écart est aussi appelé une {{t:calling-station}}. Entre les types, il existe des zones de transition (par ex. un {{t:vpip}} d’une quinzaine de pour cent, ou un joueur large avec un écart de quelques points) : là, vous n’attribuez pas de type, vous regardez d’autres statistiques.

## Ce que disent les données de population

Une base de statistiques publique donne les statistiques moyennes des joueurs d’une grande room en ligne, NL25 6-max, sur toutes les mains des {{n:mda.period.months}} derniers mois. Les {{t:regular|regs}} y sont les joueurs avec un {{t:vpip}} de {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} et un winrate supérieur à {{n:mda.reg.def.wr}}, et les {{t:recreational|joueurs récréatifs}} ceux avec un {{t:vpip}} supérieur à {{n:mda.rec.def}} et un winrate inférieur à {{n:mda.rec.def.wr}} :

| Statistique | {{t:regular|Regs}} | {{t:recreational|Joueurs récréatifs}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Showdowns gagnés | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Winrate | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

Les {{t:recreational|joueurs récréatifs}} ont un écart {{t:vpip}} − {{t:pfr}} de {{n:mda.rec.gap.pp}} points : ils sont donc passifs. Ils vont plus souvent au showdown et le gagnent moins souvent : ils {{t:call|suivent}} avec des mains plus faibles. De plus, ils {{t:fold|se couchent}} rarement face à un 3-bet. En NL50 et NL100, les chiffres sont presque identiques.

## Le {{t:recreational|joueur récréatif}} passif

La stratégie de base du module 8 ne change pas : vous misez {{t:value|pour la valeur}} quand plus de la moitié des mains qui vont {{t:call|suivre}} sont moins bonnes, et un {{t:bluff}} rapporte quand l’adversaire {{t:fold|se couche}} plus souvent que l’{{t:alpha}}. C’est l’adversaire qui change : il {{t:call|suit}} avec davantage de mains faibles. Donc :

- vous misez plus de mains {{t:value|pour la valeur}}, y compris plus fines, par ex. une {{t:top-pair|top paire}} avec un kicker plus faible sur trois {{t:street|streets}} ;
- vous {{t:bluff|bluffez}} moins souvent, surtout à la river : l’adversaire ne {{t:fold|se couche}} pas assez souvent pour que le {{t:bluff}} rapporte.

## Le {{t:nit|nit}} et le {{t:maniac|maniaque}}

**Le {{t:nit|nit}}** ne joue que des mains fortes. Quand il {{t:raise|relance}} ou 3-bette, les mains du bas de la {{t:range}} avec laquelle vous {{t:call|suivez}} sont plus souvent dominées, donc vous vous {{t:fold|couchez}} avec elles plus souvent que dans la stratégie de base du module 4. Quand il est en blinde, vous volez plus souvent, car il défend rarement.

**Le {{t:maniac|maniaque}}** joue beaucoup de mains et en {{t:raise|relance}} presque toutes. Ses mises contiennent plus de {{t:bluff|bluffs}} que dans la stratégie de base, donc vous {{t:call|suivez}} avec les mains limites, avec des mains très fortes vous le laissez miser, et vous-même ne {{t:bluff|bluffez}} pas : il {{t:fold|se couche}} rarement.

:::note D’où viennent ces seuils
Les seuils des types sont des conventions de coachs (deux supports de formation, cash game 6-max en ligne) : nous prenons leur partie commune ou un intervalle couvrant les deux sources. Les données de population proviennent d’une base de statistiques publique (une grande room en ligne, NL25–NL100, toutes les mains des {{n:mda.period.months}} mois précédant octobre 2026 ; le site n’indique pas le nombre de mains). Identifier un {{t:nit|nit}} ou un {{t:maniac|maniaque}} repose sur les statistiques d’un adversaire précis, et non sur des données sur toute la population : cela demande donc un échantillon.
:::
