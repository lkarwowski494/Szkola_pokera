---
id: m13.l3
module: m13
order: 3
title: "Revoir les mains de vraies parties"
sub: "Quoi revoir et comment"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Pendant une partie en live, vous tombez sur une main où vous ne savez pas quoi faire. Qu'en faites-vous ensuite ?"
    options:
      - { text: "Je la note brièvement et je la revois après la {{t:session|session}}", correct: true, why: "Oui : pendant le jeu, vous vous contentez de marquer la main, et vous l'analysez plus tard, à tête reposée. Un jugement sous le coup de l'émotion est parfois mauvais." }
      - { text: "Je l'analyse tout de suite, tant que je m'en souviens", why: "Une courte note suffit pour ne pas oublier. L'analyse complète, vous la faites plus tard, à tête reposée." }
      - { text: "Rien, seule la main suivante compte", why: "Les mains où vous ne saviez pas quoi faire valent la peine d'être revues. Marquez-les et revenez-y après la {{t:session|session}}." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Vous venez de perdre un gros {{t:pot|pot}} et vous êtes énervé. Quand vaut-il mieux revoir cette main ?"
    options:
      - { text: "Quelques heures plus tard ou le lendemain", correct: true, why: "Oui : le meilleur moment pour revoir une main, c'est quelques heures ou quelques jours après la {{t:session|session}}, à tête reposée. Juste après une perte, on prend facilement une bonne décision pour une erreur, ou l'inverse." }
      - { text: "Tout de suite, pour ne pas oublier les détails", why: "Les détails, vous les notez tout de suite, mais vous reportez le jugement. Sous le coup de l'émotion, le jugement est teinté par le résultat." }
      - { text: "Jamais, c'est de la malchance", why: "C'est peut-être de la malchance, ou peut-être une erreur. Vous ne le saurez qu'en revoyant la main, une fois les émotions retombées." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Laquelle de ces mains mérite le moins une longue analyse ?"
    options:
      - { text: "Un set perd contre un set supérieur sur un {{t:board|board}} {{t:dry|sec}} ; vous avez tous les deux mis tout votre tapis", correct: true, why: "Oui : c'est un cooler. Aucun joueur raisonnable ne {{t:fold|se coucherait}} ici avec un set. Les coolers arrivent à tout le monde et apprennent peu de choses." }
      - { text: "Un gros {{t:pot|pot}} perdu où, à la river, vous ne saviez pas s'il fallait {{t:call|suivre}}", why: "C'est un bon candidat pour la revue : un gros {{t:pot|pot}} et une décision difficile." }
      - { text: "Un {{t:pot|pot}} moyen où l'adversaire vous a surclassé et où vous vous êtes senti perdu", why: "Ces mains-là valent la peine d'être revues : vous avez senti que quelque chose n'allait pas, et il vaut la peine de voir quoi." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Vous avez perdu un gros {{t:pot|pot}}, mais vous pensez avoir bien joué. Vaut-il la peine de le revoir ?"
    options:
      - { text: "Oui : dans un gros {{t:pot|pot}}, les décisions pèsent le plus, même si vous avez bien joué", correct: true, why: "Oui : les gros {{t:pot|pots}}, surtout perdus, sont les décisions qui pèsent le plus. Même si vous avez bien joué, il vaut la peine de savoir pourquoi. Vous n'écartez que les coolers évidents." }
      - { text: "Non : si j'ai bien joué, il n'y a rien à chercher", why: "Une certitude sans revue n'est encore qu'une première réaction. Un gros {{t:pot|pot}} est une bonne raison de le revoir." }
      - { text: "Seulement si j'ai perdu contre une main rare", why: "Ce n'est pas le type de main de l'adversaire qui décide. Ce qui compte, c'est si la décision était difficile ou le {{t:pot|pot}} gros." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Vous commencez à revoir une décision à la river. Que faites-vous d'abord ?"
    options:
      - { text: "Je note ma première réaction, p. ex. « {{t:call|call}} facile », et seulement ensuite je calcule", correct: true, why: "Oui : comparer la première réaction au calcul montre où votre intuition vous trompe. Avec le temps, l'intuition s'améliore." }
      - { text: "Je calcule tout de suite l'{{t:equity|équité}}", why: "Le calcul est nécessaire, mais sans première réaction notée, vous ne verrez pas où l'intuition se trompe." }
      - { text: "Je regarde quelles cartes avait l'adversaire", why: "Les cartes de l'adversaire au showdown sont le résultat, pas une information disponible au moment de la décision. Vous jugez la décision par rapport à ses mains possibles." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Vous revoyez un {{t:call|call}} à la river. Même avec une hypothèse pessimiste sur la {{t:range|range}} de l'adversaire (peu de {{t:bluff|bluffs}}), vous avez assez d'{{t:equity|équité}}. Et ensuite ?"
    options:
      - { text: "Je peux m'arrêter : la décision est bonne avec toute hypothèse raisonnable", correct: true, why: "Oui : les hypothèses extrêmes délimitent un intervalle. Si la décision est bonne même avec l'hypothèse pessimiste, l'hypothèse réaliste la confirmera aussi." }
      - { text: "Je dois encore calculer le cas réaliste", why: "Pas besoin : l'hypothèse réaliste se situe entre les extrêmes, et puisque les deux mènent à la même conclusion, le résultat ne changera pas." }
      - { text: "Je passe à une hypothèse optimiste, car la pessimiste est exagérée", why: "Vous commencez par les extrêmes pour délimiter l'intervalle. Si la pessimiste donne un bon résultat, l'optimiste à plus forte raison." }
---
L'application revoit pour vous les mains jouées contre des bots. Les mains jouées en dehors de l'application, vous les revoyez vous-même. Cette leçon rassemble des conseils de coachs.

## Marquez pendant le jeu, analysez après la {{t:session|session}}

Pendant le jeu, vous vous contentez de marquer les mains qui vous ont semblé intéressantes, difficiles ou étranges : une courte note suffit. Le mieux est de revoir les mains quelques heures ou quelques jours après la {{t:session|session}}, à tête reposée. Le pire moment, c'est juste après une grosse perte ou quand vous êtes fatigué.

## Quoi revoir

- Les gros {{t:pot|pots}}, surtout perdus : c'est là que les décisions pèsent le plus.
- Les mains où vous ne saviez pas quoi faire, ou où vous avez senti que l'adversaire vous surclassait.
- Les mains gagnées aussi : une erreur qui a payé coûte tout autant (leçon sur la décision et le résultat).

Ne passez pas beaucoup de temps sur les coolers et les bad beats. Un cooler est une main où deux mains fortes se rencontrent et où aucune ne pouvait raisonnablement {{t:fold|se coucher}}, p. ex. un set contre un set supérieur. Ces mains arrivent à tout le monde et apprennent peu de choses.

## Comment revoir une décision

1. Notez la main : les {{t:position|positions}}, les stacks, les actions et les tailles de mise à chaque {{t:street|street}}.
2. Notez votre première réaction : la décision vous semble-t-elle facile ou difficile ?
3. Calculez : le prix, l'{{t:equity|équité}} et ce que vous saviez au moment de la décision.
4. Vérifiez la décision avec trois hypothèses sur la {{t:range|range}} de l'adversaire : optimiste, pessimiste et réaliste. Si elle est bonne même avec l'hypothèse pessimiste, vous pouvez vous arrêter.
5. Notez l'écart entre votre première réaction et le calcul. Avec le temps, l'intuition s'améliore.

:::note D'où viennent ces règles
Trois supports de formation sur la revue des mains : quand et quoi revoir ; les coolers et les bad beats ; la première réaction et les trois hypothèses sur l'adversaire. Ce sont des heuristiques de coachs, pas des résultats de solveur.
:::
