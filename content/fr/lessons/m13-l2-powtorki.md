---
id: m13.l2
module: m13
order: 2
title: "Révisions issues du jeu et entraînement ciblé"
sub: "Ce que deviennent vos erreurs"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "En partie, vous aviez A♥ K♥ sur un {{t:board|board}} Q♥ 7♥ 2♣ et vous avez commis une erreur. Dans la révision, vous voyez A♠ K♠ sur un {{t:board|board}} Q♠ 7♠ 2♦. La bonne décision est-elle la même ?"
    options:
      - { text: "Oui : toutes les couleurs ont été changées par une seule permutation", correct: true, why: "Les cœurs sont devenus des piques et les trèfles des carreaux, partout à la fois. Vous avez toujours un {{t:flush-draw|tirage couleur}} par l'as et la même force de main, donc la décision ne change pas." }
      - { text: "Non : les piques sont plus forts que les cœurs", why: "Au Texas Hold'em, les couleurs sont égales : seule compte la question de savoir si les cartes sont de la même couleur, pas laquelle." }
      - { text: "Impossible à dire, il faut tout recalculer", why: "Inutile : permuter toutes les couleurs à la fois préserve chaque combinaison et chaque {{t:draw|tirage}}. C'est un calcul exact, pas une approximation." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Lequel de ces changements NE préserve PAS la décision de cette situation : K♥ Q♥ sur un {{t:board|board}} J♥ 8♥ 3♠ ?"
    options:
      - { text: "K♥ Q♥ sur un {{t:board|board}} J♠ 8♠ 3♥", correct: true, why: "Ici, les couleurs n'ont été changées que sur le {{t:board|board}} : vos cœurs ne correspondent plus au {{t:board|board}} et le {{t:flush-draw|tirage couleur}} a disparu. C'est une autre situation." }
      - { text: "K♠ Q♠ sur un {{t:board|board}} J♠ 8♠ 3♥", why: "C'est une seule permutation pour toutes les cartes (cœurs ↔ piques), donc la décision est la même." }
      - { text: "K♦ Q♦ sur un {{t:board|board}} J♦ 8♦ 3♠", why: "C'est une seule permutation (cœurs → carreaux) pour toutes les cartes, donc la décision est la même." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Quelles décisions du rapport deviennent des fiches de révision ?"
    options:
      - { text: "Les erreurs, les imprécisions et les décisions prises après la fin du temps imparti", correct: true, why: "Oui. Une décision acceptable n'est pas une erreur, donc elle ne crée pas de fiche. Une même règle avec la même classe de main dans le même spot donne une seule fiche, pas plusieurs." }
      - { text: "Toutes les décisions évaluées", why: "Les décisions conformes et acceptables n'ont pas besoin d'être corrigées, et les révisions servent à travailler ce qui s'est mal passé." }
      - { text: "Seulement les erreurs, pas les imprécisions", why: "Une imprécision (par ex. la bonne action avec une mauvaise taille) compte comme une erreur, donc elle revient aussi dans les révisions." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "En {{n:game.recall.days}} jours, vous avez commis {{n:game.recall.count}} erreurs dans la même famille de spots (par ex. la défense de la {{t:big-blind|grosse blinde}} face au Bouton). Que fera l'application ?"
    options:
      - { text: "Elle remettra toute la famille dans les révisions : de nouvelles mains de ce spot", correct: true, why: "Oui : une situation isolée est répétée par sa fiche, et une erreur récurrente dans une famille fait revenir des exercices de toute la famille, avec de nouvelles mains." }
      - { text: "Rien, les fiches d'erreurs suffisent", why: "Une fiche répète une situation précise. Une erreur récurrente dans une famille signifie qu'il vaut la peine de la travailler plus largement." }
      - { text: "Elle verrouillera la zone de ce module", why: "Une zone débloquée après les leçons reste accessible. L'application ajoute seulement des révisions." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Après une {{t:session|session}} de quelques dizaines de mains, vous constatez que vous êtes entré dans le coup dans presque la moitié d'entre elles. Qu'en conclure ?"
    options:
      - { text: "Rien pour l'instant : l'échantillon est trop petit", correct: true, why: "Même le {{t:vpip}} se lit après env. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mains. Sur une seule {{t:session|session}}, vous pouvez juger des décisions isolées, mais pas vos fréquences." }
      - { text: "Vous jouez trop large et devez changer", why: "Peut-être, peut-être pas : quelques dizaines de mains, c'est trop peu pour distinguer votre style de la distribution des cartes. Regardez l'évaluation de chaque décision d'entrer dans le coup." }
      - { text: "Vous jouez bien, car vous avez gagné beaucoup de mains", why: "Le résultat ne dit rien de la qualité des décisions, et une seule {{t:session}} ne dit rien des fréquences." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "Pendant une {{t:session|session}}, vous avez fait face à un 4-bet deux fois et vous vous êtes {{t:fold|couché}} les deux fois. Savez-vous désormais que vous vous {{t:fold|couchez}} trop souvent face au 4-bet ?"
    options:
      - { text: "Non : ce sont les occasions qui comptent, et deux, c'est trop peu", correct: true, why: "Un des entraîneurs ne regarde une statistique qu'à partir d'env. {{n:hud.opps.look}} occasions et n'en est sûr qu'à env. {{n:hud.opps.sure}}. Deux occasions, c'est du bruit ; évaluez chacune de ces décisions séparément." }
      - { text: "Oui : vous vous {{t:fold|couchez}} dans toutes les situations", why: "Deux sur deux ressemble à « toujours », mais sur deux occasions, même une stratégie qui se {{t:fold|couche}} la moitié du temps donnera souvent ce résultat." }
      - { text: "Oui, si c'était dans une seule {{t:session|session}}", why: "Une seule {{t:session}} n'ajoute rien : le nombre d'occasions reste faible." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "Quand la zone de jeu « Flop : c-bet » se débloque-t-elle ?"
    options:
      - { text: "Après avoir terminé toutes les leçons du module", correct: true, why: "Oui : la zone ne distribue que des situations du module, elle se débloque donc quand vous en connaissez déjà les règles. Le jeu libre est accessible dès le début." }
      - { text: "Après avoir gagné quelques {{t:session|sessions}}", why: "Le résultat en {{t:chips|jetons}} ne débloque rien : c'est surtout du bruit." }
      - { text: "Tout de suite, comme le jeu libre", why: "Le jeu libre est accessible dès le premier jour, et les zones seulement après les leçons du module." }
---
Chaque erreur du rapport vous revient dans les révisions. Cette leçon montre comment.

## La même situation dans d'autres couleurs

Les erreurs, les imprécisions et les décisions prises après la fin du temps imparti deviennent des fiches de révision. Une fiche montre la même situation : les mêmes {{t:position|positions}}, les mêmes actions et tailles, les mêmes rangs de cartes. Seules les couleurs changent : l'application les permute par une seule permutation pour toutes les cartes à la fois, par ex. les cœurs en piques et les piques en cœurs.

Une telle permutation ne change la force d'aucune main ni d'aucun {{t:draw|tirage}}, car seule compte la question de savoir si les cartes sont de la même couleur. La bonne décision est donc la même, et vous apprenez à reconnaître la situation plutôt qu'à mémoriser une image.

Une même règle avec la même classe de main dans le même spot donne une seule fiche, pas plusieurs. Les nouvelles fiches issues du jeu entrent dans les révisions dans la limite quotidienne ; les autres attendent les jours suivants.

## Quand une erreur se répète

Si, en {{n:game.recall.days}} jours, vous commettez au moins {{n:game.recall.count}} erreurs ou imprécisions dans la même famille de spots, l'application remet toute la famille dans les révisions : des exercices avec de nouvelles mains de ce spot. Ce sont les erreurs de décision qui comptent, pas les mains perdues. Ces seuils sont des valeurs de départ, que nous ajusterons d'après les données d'utilisation de l'application.

## Entraînement ciblé

Une zone de jeu correspond à un module du cours. Elle se débloque une fois toutes les leçons du module terminées et ne distribue que des situations de ce module, par ex. un c-bet après une {{t:open|ouverture}} depuis le Bouton. Depuis le rapport, vous passez directement à la zone où vous avez commis le plus d'erreurs.

## Une {{t:session|session}} n'est pas une statistique

Le rapport ne montre pas vos fréquences, par ex. à quelle fréquence vous entrez dans le coup. Même le {{t:vpip}} se lit après env. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mains, et les situations rares ne se présentent que quelques fois par {{t:session|session}}. Un des entraîneurs conseille de compter les occasions, pas les mains : il regarde une statistique à env. {{n:hud.opps.look}} occasions et n'en est sûr qu'à env. {{n:hud.opps.sure}}.

:::note D'où viennent ces règles
La permutation des couleurs est un calcul exact : le classement des combinaisons ne distingue pas les couleurs. Échantillons de mains comme dans le module sur l'{{t:exploit|exploitation}} (deux supports de formation) ; nombre d'occasions : un support de formation sur la taille d'échantillon pour les statistiques du {{t:hud|HUD}}. Les seuils des révisions sont des réglages de l'application, sans source.
:::
