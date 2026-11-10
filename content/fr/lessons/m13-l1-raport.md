---
id: m13.l1
module: m13
order: 1
title: "Comment lire le rapport de partie"
sub: "Décision, résultat et niveaux d'évaluation"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Vous partez à tapis avec une {{t:equity}} de {{n:m13.eq.example}} et vous perdez. Dans quel pourcentage de ces mains perdez-vous malgré une bonne décision ? Saisissez un nombre."
    answer: m13.lose.example
    explanation: "Vous perdez dans 1 − e des mains : le total moins {{n:m13.eq.example}} donne {{n:m13.lose.example}}. Cette défaite ne dit rien de la décision."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Vous partez à tapis dix fois avec une {{t:equity}} de {{n:m13.eq.example}}. Combien de ces mains perdrez-vous en moyenne ? Saisissez un nombre."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Si vous perdez deux fois de suite, cela reste compatible avec le calcul."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Vous avez une {{t:equity}} de {{n:m13.eq.example2}} dans un tapis. Dans quel pourcentage de ces mains perdez-vous ? Saisissez un nombre."
    answer: m13.lose.example2
    explanation: "Le total moins {{n:m13.eq.example2}} donne {{n:m13.lose.example2}} : vous perdez à peu près une main sur trois de ce type, et la décision reste bonne."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Dans ce spot, le solveur joue votre main à peu près à parts égales : {{t:raise|relancer}} ou {{t:fold|se coucher}}. {{t:fold|Vous vous êtes couché}}. Comment le rapport va-t-il l'évaluer ?"
    options:
      - { text: "Conforme", correct: true, why: "Oui : une action jouée par le solveur dans au moins {{n:range.mixed.low}} des cas est conforme. À l'équilibre, un joueur ne mélange que des coups de même {{t:expected-value|espérance de gain}}, donc les deux sont corrects." }
      - { text: "Erreur, car il fallait {{t:raise|relancer}}", why: "Non : avec une {{t:mixed-hand|main mixte}}, les deux coups ont la même {{t:expected-value|espérance de gain}}. Le rapport ne pénalise pas le choix de l'un d'eux." }
      - { text: "Non évaluée", why: "Non : le spot a un résultat de solveur, donc la décision est évaluée. « Non évaluée » s'applique à une décision pour laquelle l'application n'a pas de règle vérifiable." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Le solveur joue votre main {{t:raise|en relançant}} dans environ {{n:range.mixed.high}} des cas, et {{t:call|en suivant}} dans les autres. {{t:call|Vous avez suivi}}. Quel verdict ?"
    options:
      - { text: "Conforme", correct: true, why: "Oui : {{t:call|suivre}}, joué dans environ {{n:range.mixed.low}} des cas, ne passe pas sous le seuil de « conforme » ({{n:range.mixed.low}}). C'est une {{t:mixed-hand|main mixte}}." }
      - { text: "Acceptable", why: "Est acceptable une action jouée dans au moins {{n:range.mixed.min}}, mais moins souvent que dans {{n:range.mixed.low}} des cas. Ici, {{t:call|suivre}} atteint le seuil de « conforme »." }
      - { text: "Erreur", why: "Une erreur est une action que le solveur ne joue jamais. Une action jouée moins souvent que dans {{n:range.mixed.min}} des cas est une imprécision." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "Dans un spot où le solveur joue un 3-bet, vous faites un 3-bet, mais d'une taille différente de celle que recommande la règle. Quel verdict ?"
    options:
      - { text: "Imprécision", correct: true, why: "Oui : bonne action, mauvaise taille. Cela compte comme une erreur et revient dans les révisions, mais le rapport affiche une explication distincte sur la taille." }
      - { text: "Conforme", why: "L'action est bonne, mais la taille compte : un 3-bet trop petit offre un bon prix à l'adversaire, un 3-bet trop gros risque plus que nécessaire." }
      - { text: "Erreur", why: "C'est une mauvaise action qui reçoit « erreur ». Une bonne action avec une mauvaise taille est un niveau distinct : l'imprécision." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Rapport : « 14 décisions évaluées sur 30 ». Que signifient les autres décisions ?"
    options:
      - { text: "L'application n'avait pour elles ni règle vérifiable ni résultat de solveur", correct: true, why: "Oui : « non évaluée » ne veut pas dire « bien ». Ces décisions pouvaient être bonnes ou mauvaises ; le rapport ne le sait pas et le dit clairement." }
      - { text: "Elles étaient bonnes, donc le rapport ne les affiche pas", why: "Non : le rapport compte les bonnes décisions comme conformes. « Non évaluée » signifie une absence d'évaluation, pas un compliment." }
      - { text: "Elles étaient trop faciles pour être évaluées", why: "Ce n'est pas une question de difficulté. Sont évaluées les décisions pour lesquelles l'application dispose d'une règle avec condition ou d'un spot de solveur." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Après la {{t:session|session}}, vous avez gagné beaucoup de {{t:chips|jetons}}, mais le rapport affiche cinq erreurs. Qu'est-ce qui en dit le plus sur votre jeu ?"
    options:
      - { text: "L'évaluation des décisions", correct: true, why: "Oui : quelques dizaines de mains, c'est trop peu pour que le résultat signifie quelque chose. Même après des milliers de mains, le résultat reste en grande partie du bruit, et chaque erreur a son coût, quelle que soit l'issue de la main." }
      - { text: "Le résultat en {{t:chips|jetons}}", why: "Le résultat d'une courte {{t:session|session}} dépend surtout des cartes. C'est justement pour cela que le rapport l'affiche dans une police plus petite." }
      - { text: "Les deux autant", why: "Un résultat sur quelques dizaines de mains ne dit presque rien du niveau de jeu. Une décision évaluée par une règle ou par un solveur en dit bien plus." }
---
Le rapport de fin de {{t:session|session}} évalue vos décisions, et non ce que vous avez gagné. Cette leçon explique comment le lire.

## La décision, pas le résultat

Dans le module sur le mental game, vous avez appris ce principe : on juge une décision d'après les informations dont on disposait au moment de la prendre, et non d'après le résultat de la main. Le rapport l'applique à la lettre : il évalue la situation telle qu'elle était avant votre action, sans voir les cartes de vos adversaires ni les cartes tombées ensuite.

Perdre avec la meilleure main reste compatible avec le calcul. L'{{t:equity|équité}} est la part de victoires sur de nombreuses répétitions de la même situation. Avec une {{t:equity}} de {{n:m13.eq.example}}, vous perdez environ {{n:m13.lose.example}} des mains, soit en moyenne {{n:m13.lose.of-ten}} sur {{n:m13.ten}}.

```formula
probabilité de perdre = 1 − équité
```

## Niveaux d'évaluation

- **Conforme** : action recommandée par la règle, ou jouée par le solveur dans au moins {{n:range.mixed.low}} des cas (ce seuil est un réglage de l'application).
- **Acceptable** : le solveur la joue rarement (au moins {{n:range.mixed.min}}, mais moins souvent que {{n:range.mixed.low}}), ou la règle parle de fréquence (« souvent », « moins souvent ») et vous avez choisi l'option la moins fréquente. Ce n'est pas une erreur.
- **Imprécision** : bonne action mais mauvaise taille, ou action que le solveur joue, mais moins souvent que dans {{n:range.mixed.min}} des cas. Elle compte comme une erreur : c'est un réglage de l'application, pas de la théorie.
- **Erreur** : action contraire à une règle formulée de façon catégorique, ou action que le solveur ne joue jamais.
- **Non évaluée** : l'application n'a pas de règle vérifiable pour cette décision. Cela ne veut pas dire « bien ».
- **Temps dépassé** : la limite de temps étant activée, l'application a joué à votre place. Cette décision ne compte pas dans l'évaluation, mais elle revient dans les révisions.

En haut du rapport figure le décompte « X décisions évaluées sur Y ». Après le flop, beaucoup de décisions restent non évaluées, car la plupart des règles du turn et de la river portent sur les fréquences de toute la {{t:range|range}}, et non sur une seule main.

## {{t:mixed-hand|Main mixte}}

Quand le solveur joue votre main de deux façons, les deux sont correctes. La théorie de l'équilibre l'explique par le principe d'indifférence : un joueur ne mélange que des coups qui ont la même {{t:expected-value|espérance de gain}}. C'est pourquoi le rapport ne pénalise pas le choix de l'un d'eux, et classe le coup le moins fréquent comme acceptable lorsque le solveur le joue dans au moins {{n:range.mixed.min}} des cas ; en dessous, c'est une imprécision (réglage de l'application).

## Résultat en {{t:chips|jetons}}

Le résultat se trouve en bas du rapport, en petits caractères. D'après le calcul de la leçon sur la {{t:variance|variance}}, après environ {{n:m13.noise.hands.k}} milliers de mains, l'intervalle à {{n:var.conf95}} du winrate est d'environ ± {{n:m13.noise.ci}} ; le résultat est donc presque uniquement du bruit : un joueur gagnant peut être en négatif, et un joueur perdant largement en positif. Une {{t:session|session}} compte quelques dizaines de mains, donc son résultat ne dit presque rien de votre jeu.

:::note D'où viennent ces règles
Principe d'indifférence : documents sur les bases de la théorie de l'équilibre. Seuil du coup rare et appellation « imprécision » : document sur l'évaluation de son propre jeu par rapport à un solveur. Le seuil de {{n:range.mixed.low}} est un réglage de l'application, sans source. La {{t:variance|variance}} du résultat et la probabilité de perdre relèvent du calcul.
:::
