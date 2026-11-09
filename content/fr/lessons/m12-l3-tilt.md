---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Repérez-le avant qu'il ne prenne les commandes de vos décisions"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Pour la troisième fois en une heure, un adversaire touche à la river une carte qui le sauve. Vous avez l'impression que le jeu est injuste et que quelqu'un s'acharne sur vous. De quel type de tilt s'agit-il, selon la classification de cette leçon ?"
    options:
      - { text: "Tilt d'injustice", correct: true, why: "Les bad beats, les coolers et les cartes touchées par l'adversaire à la river donnent l'impression que le poker est injuste. C'est un déclencheur typique du tilt d'injustice." }
      - { text: "Tilt de l'erreur", why: "Le tilt de l'erreur concerne vos propres erreurs. Ici, c'est le sort qui vous met en colère, pas votre décision." }
      - { text: "Tilt de désespoir", why: "Le désespoir, c'est un fort besoin de se refaire (longues {{t:session|sessions}}, {{t:stakes|limites}} plus élevées). Ici, il s'agit pour l'instant du sentiment d'être lésé." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Le même adversaire relance sur vos blinds pour la quatrième fois d'affilée. Vous décidez que la prochaine fois, vous {{t:raise|relancerez}} contre lui avec n'importe quelle main, pour lui montrer. De quel type de tilt s'agit-il ?"
    options:
      - { text: "Tilt de vengeance", correct: true, why: "Le manque de respect, l'agressivité constante de l'adversaire et l'envie de « lui montrer » sont des déclencheurs du tilt de vengeance. C'est le désir de revanche qui commence à décider, et non le calcul." }
      - { text: "Tilt du sentiment que la victoire vous est due", why: "Ce type vient de la conviction que vous méritez de gagner parce que vous êtes meilleur. Ici, il s'agit de prendre sa revanche sur un adversaire précis." }
      - { text: "Ce n'est pas du tilt, juste une adaptation à un adversaire agressif", why: "S'adapter, c'est défendre plus large avec des mains réfléchies. « N'importe quelle main, pour lui montrer », c'est de l'émotion, pas de la stratégie." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Vous êtes dans le rouge et vous pensez : « Encore une heure, et si ça ne va pas, je passe à une {{t:stakes|limite}} supérieure et je récupère tout d'un coup. » De quel type de tilt s'agit-il ?"
    options:
      - { text: "Tilt de désespoir", correct: true, why: "Le besoin de se refaire mène à des {{t:session|sessions}} très longues, à forcer l'action et à des sauts vers des {{t:stakes|limites}} plus élevées. C'est le signal qu'il faut arrêter de jouer." }
      - { text: "Tilt de la haine de la défaite", why: "C'est proche, mais ici s'ajoute un plan pour récupérer les pertes avec une {{t:stakes|limite}} plus élevée et en jouant plus longtemps. Ce sont des traits du désespoir." }
      - { text: "Un plan raisonnable, car une {{t:stakes|limite}} plus élevée permettra de récupérer les pertes plus vite", why: "Une {{t:stakes|limite}} plus élevée augmente aussi les fluctuations, et vous prenez vos décisions dans un mauvais état. Monter après une perte est exactement l'inverse d'une gestion prudente de la {{t:bankroll|bankroll}} (leçon sur la bankroll et le risque)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "Vous avez {{t:fold|couché}} la meilleure main et, depuis, vous n'arrivez pas à arrêter d'y penser. Vous êtes en colère contre vous-même et vous jouez de plus en plus mal. De quel type de tilt s'agit-il ?"
    options:
      - { text: "Tilt de l'erreur", correct: true, why: "La colère contre vos propres erreurs, c'est le tilt de l'erreur. Sa source est généralement l'attente irréaliste de ne pas faire d'erreurs pendant l'apprentissage." }
      - { text: "Tilt d'injustice", why: "Ici, vous n'accusez pas le sort, mais vous-même. C'est du tilt de l'erreur." }
      - { text: "Tilt de vengeance", why: "La vengeance vise un adversaire. Ici, la colère porte sur votre décision." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Vous perdez contre un joueur qui, selon vous, joue très mal, et vous pensez : « Moi, j'étudie, lui non, je devrais le battre. » De quel type de tilt s'agit-il ?"
    options:
      - { text: "Tilt du sentiment que la victoire vous est due", correct: true, why: "Croire que vous méritez de gagner pour une raison ou une autre fait paraître la victoire comme votre propriété. Quand un adversaire qui « ne la mérite pas » vous la prend, le tilt apparaît." }
      - { text: "Tilt de la haine de la défaite", why: "Ce type concerne le fait de perdre en général. Ici, l'essentiel est la conviction que la victoire vous est due." }
      - { text: "Tilt de l'erreur", why: "Il ne s'agit pas de votre erreur, mais du sentiment que vous méritez de gagner." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Après un bad beat, vous sentez la colère monter, mais vous jouez encore correctement. Que faites-vous ?"
    options:
      - { text: "Vous réagissez maintenant : une respiration et une phrase préparée, par ex. « C'est la {{t:variance|variance}}, je continue à bien jouer »", correct: true, why: "Le tilt se corrige tant qu'il est petit et que vous pouvez encore réfléchir. Quand il grandit, il coupe la capacité de réfléchir et le contrôle devient impossible." }
      - { text: "Vous continuez à jouer jusqu'à remarquer votre première erreur", why: "À ce moment-là, le tilt est déjà plus fort et plus difficile à arrêter. Le plus facile est de réagir aux premiers signaux." }
      - { text: "Vous étouffez la colère et faites comme si elle n'existait pas", why: "Mieux vaut reconnaître l'émotion et répondre à sa cause par une pensée précise. Le simple fait de l'étouffer n'en supprime pas la cause." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Depuis une demi-heure, vous jouez des mains que vous {{t:fold|couchez}} d'habitude et vous ne pensez qu'à vous refaire. Que faites-vous ?"
    options:
      - { text: "Vous mettez fin à la {{t:session|session}}", correct: true, why: "Ce sont des signaux que vous n'arrivez plus à retrouver une pensée claire. Le but est alors d'arrêter le plus vite possible, et non de regagner l'argent perdu." }
      - { text: "Vous continuez, mais seulement avec les meilleures mains", why: "Dans cet état, il est difficile de tenir ses résolutions, car l'émotion décide à votre place. Il est plus sûr d'arrêter." }
      - { text: "Vous montez de {{t:stakes|limite}} pour vous refaire plus vite", why: "C'est le tilt de désespoir à l'état pur. Une {{t:stakes|limite}} plus élevée avec de moins bonnes décisions accélère les pertes." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Vous voulez repérer le tilt plus tôt. Par quoi commencez-vous ?"
    options:
      - { text: "Par rédiger votre profil : ce qui vous déclenche, ce que vous pensez et ressentez, comment votre jeu change", correct: true, why: "Chaque joueur tilte un peu différemment et pour des raisons différentes. Le profil permet de reconnaître les signaux avant que le tilt ne grandisse : on ne peut pas contrôler ce qu'on ne comprend pas." }
      - { text: "Par jouer à des {{t:stakes|limites}} plus élevées pour vous endurcir", why: "Plus de pression n'apprend pas à reconnaître le tilt. Vous devez d'abord savoir à quoi il ressemble chez vous." }
      - { text: "Par éviter tous les adversaires qui vous énervent", why: "On ne peut pas éviter les déclencheurs, car il y aura toujours des bad beats et des adversaires agressifs. Le but est de reconnaître votre réaction et d'y répondre." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Votre jeu connaît des bons et des mauvais jours. Où se trouve le progrès durable le plus rapide ?"
    options:
      - { text: "Dans l'amélioration de votre pire jeu (C-game)", correct: true, why: "Le progrès ressemble au déplacement d'une chenille : un pas en avant à l'avant (un meilleur A-game) et un pas à l'arrière (un C-game moins catastrophique). Éliminer vos pires erreurs libère aussi de l'attention pour apprendre de nouvelles choses." }
      - { text: "Uniquement dans le perfectionnement de votre meilleur jeu (A-game)", why: "Le A-game compte, mais c'est le C-game qui coûte le plus. Sans améliorer vos pires jours, le progrès gagné à l'avant se perd facilement à l'arrière." }
      - { text: "Nulle part, la forme est une question de chance", why: "L'écart de forme peut être réduit : les joueurs qui contrôlent bien le tilt ont une distribution plus étroite de leur niveau de jeu (revue de 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Comment vérifiez-vous si votre travail sur le {{t:mental-game|jeu mental}}, c'est-à-dire la gestion du tilt, des émotions et de la concentration, porte ses fruits ?"
    options:
      - { text: "Vous comparez vos pires {{t:session|sessions}} avec vos pires sessions précédentes", correct: true, why: "Comparez ce qui est comparable : votre pire jeu avec votre pire jeu antérieur. Le progrès se voit aussi quand vous reconnaissez le tilt plus vite et mettez fin à la {{t:session|session}} plus tôt." }
      - { text: "Vous regardez vos résultats de la semaine dernière", why: "Une semaine de résultats, c'est surtout de la {{t:variance|variance}} (leçon sur la {{t:variance|variance}}). La qualité de votre jeu les pires jours en dit plus." }
      - { text: "Vous comparez votre meilleure {{t:session|session}} avec la pire", why: "Cette comparaison montre seulement l'écart, pas le progrès. Comparez votre pire jeu avec votre pire jeu antérieur." }
---
Le tilt est une perte de contrôle sous l'effet d'émotions négatives, généralement après des bad beats ou une longue série de pertes. Il se termine par de mauvaises décisions et une perte bien plus importante que d'habitude. Ce n'est pas rare : dans une enquête par questionnaire, {{n:tilt.severe}} des joueurs ont reconnu avoir subi un tilt sévère au moins une fois au cours des six derniers mois.

## Sept types de tilt

Un ouvrage reconnu de psychologie du poker décrit le tilt comme un problème de colère et distingue {{n:tilt.types}} types :

| Type | Ce qui le déclenche |
|---|---|
| La mauvaise passe | Les autres types de tilt reviennent si souvent que l'esprit n'a pas le temps de se réinitialiser avant la {{t:session|session}} suivante |
| L'injustice | Bad beats, coolers, cartes touchées par l'adversaire à la river |
| La haine de la défaite | La défaite elle-même, même quand vous savez que c'est la {{t:variance|variance}} |
| L'erreur | Vos propres erreurs |
| Le sentiment que la victoire vous est due | La conviction que vous méritez de gagner |
| La vengeance | Manque de respect, agressivité constante de l'adversaire |
| Le désespoir | Besoin de se refaire : marathons, {{t:stakes|limites}} plus élevées |

## Reconnaissez les signaux

Chacun tilte un peu différemment. Rédigez votre **profil de tilt** : ce qui le déclenche, ce que vous pensez et ressentez à ce moment-là, ce que vous faites à la table (par ex. vous {{t:call|suivez}} trop large, vous {{t:raise|relancez}} par vengeance). Mieux vous connaissez vos signaux, plus tôt vous les repérerez.

## Réagissez tant que vous pouvez réfléchir

Quand le tilt grandit, il coupe la capacité de réfléchir. C'est pourquoi vous réagissez aux premiers signaux :

1. Une respiration, qui vous donne un instant de recul par rapport à l'émotion.
2. Une phrase préparée, qui répond à la cause, par ex. « Les joueurs plus faibles doivent parfois gagner, c'est la {{t:variance|variance}}. Je continue à bien jouer. »
3. Si vous n'arrivez plus à réfléchir clairement, vous mettez fin à la {{t:session|session}}. Arrêter plus tôt, pour une bonne raison, est aussi un progrès.

## A-game et C-game

Votre jeu a un écart : de votre meilleur jeu (A-game) à votre pire jeu (C-game). Le progrès ressemble au déplacement d'une chenille : un pas en avant à l'avant, quand votre meilleur jeu s'améliore, et un pas à l'arrière, quand votre pire jeu devient moins catastrophique. C'est le C-game qui coûte le plus, alors commencez par lui.

:::note Quand c'est plus que du tilt
Si vous jouez plus longtemps que prévu, cherchez à vous refaire ou jouez avec de l'argent que vous ne pouvez pas vous permettre de perdre, lisez la fiche sur le jeu responsable dans la leçon sur la bankroll.
:::
