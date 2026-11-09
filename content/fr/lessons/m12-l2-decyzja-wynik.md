---
id: m12.l2
module: m12
order: 2
title: "Décision et résultat"
sub: "Jugez le coup, pas la carte de la river"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Préflop, vous mettez tout votre tapis avec une {{t:pair|paire}} d'as, et l'adversaire {{t:call|suit}} avec une {{t:pair|paire}} de rois. Un roi tombe à la river et vous perdez. Comment jugez-vous votre décision ?"
    options:
      - { text: "Elle était très bonne", correct: true, why: "AA bat KK dans env. {{n:pf.aa-vs-kk}} des cas. Perdre dans env. {{n:res.kk-wins}} des cas est le coût du jeu, pas une erreur. À chaque fois, vous faites la même chose." }
      - { text: "Elle était mauvaise, il fallait jouer plus prudemment", why: "C'est juger d'après le résultat. Si la carte de la river avait été différente, la même décision aurait paru excellente. La décision dépend de ce que vous saviez avant la carte : env. {{n:pf.aa-vs-kk}} d'equity." }
      - { text: "Impossible à juger, puisque vous avez perdu", why: "Si : vous calculez l'equity au moment de la décision. Le résultat d'une seule main n'y ajoute rien." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA bat KK à tapis préflop dans env. {{n:pf.aa-vs-kk}} des cas. Dans quel pourcentage des cas perdez-vous malgré la meilleure décision possible ? Saisissez un nombre."
    answer: res.kk-wins
    explanation: "Le total moins {{n:pf.aa-vs-kk}} donne env. {{n:res.kk-wins}}. En gros, une fois sur cinq ou six, une bonne décision se solde par une perte."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Vous avez un {{t:flush-draw|tirage couleur}} propre ({{n:outs.flush}} outs), il y a {{n:ex.pot}} dans le {{t:pot|pot}}, l'adversaire {{t:bet|mise}} {{n:ex.bet.quarter}}. Vous {{t:call|suivez}}, la {{t:flush|couleur}} ne rentre pas et vous perdez {{n:ex.bet.quarter}}. Comment jugez-vous ce {{t:call|call}} ?"
    options:
      - { text: "Il était bon", correct: true, why: "Il vous fallait {{n:eq.bet-quarter}} d'equity et vous en aviez env. {{n:odds.flush.turn-river}}. Un tel {{t:call|call}} rapporte sur le long terme, même s'il perd dans la plupart des mains prises isolément." }
      - { text: "Il était mauvais, car la {{t:flush|couleur}} n'est pas rentrée", why: "La {{t:flush|couleur}} ne rentre que dans env. {{n:odds.flush.turn-river}} des cas, donc la manquer était le résultat le plus probable. Vous jugez la décision d'après le prix, et le prix était bon." }
      - { text: "Bon seulement si la {{t:flush|couleur}} était rentrée", why: "C'est la définition même du jugement d'après le résultat. Une même décision ne change pas de qualité selon la carte tombée ensuite." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. {{t:flush-draw|Tirage couleur}} propre, il y a {{n:ex.pot}} dans le {{t:pot|pot}}, l'adversaire {{t:bet|mise}} tout le {{t:pot|pot}} : {{n:ex.bet.pot}}. Vous {{t:call|suivez}} et la {{t:flush|couleur}} rentre à la river. Comment jugez-vous ce {{t:call|call}} ?"
    options:
      - { text: "Il était mauvais, malgré le gain", correct: true, why: "Il vous fallait {{n:eq.bet-pot}} d'equity et vous en aviez env. {{n:odds.flush.turn-river}}. Vous avez gagné cette fois, mais sur de nombreuses répétitions, un tel {{t:call|call}} perd." }
      - { text: "Il était bon, car vous avez gagné le {{t:pot|pot}}", why: "Gagner n'améliore pas la décision. Avec un prix de {{n:eq.bet-pot}} et une chance d'env. {{n:odds.flush.turn-river}}, ce {{t:call|call}} perd sur le long terme." }
      - { text: "Il était bon, car la {{t:flush|couleur}} est la meilleure main", why: "La force de la main une fois touchée ne change pas le prix. Ce qui compte, c'est la comparaison : {{n:odds.flush.turn-river}} de chances contre {{n:eq.bet-pot}} nécessaires." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Vous analysez une main perdue. Quelle question est la plus importante ?"
    options:
      - { text: "Avec les informations dont je disposais, la décision avait-elle une {{t:expected-value|EV}} positive ?", correct: true, why: "C'est la seule question qui distingue une erreur de la malchance. Vous calculez le prix, l'equity face à la {{t:range|range}} de l'adversaire et ce que vous saviez au moment de la décision." }
      - { text: "Quelle carte l'adversaire aurait-il reçue si je m'étais {{t:fold|couché}} ?", why: "Une carte future ne change pas la qualité de la décision. Seul compte ce que vous saviez à ce moment-là." }
      - { text: "Combien ai-je perdu dans cette main ?", why: "L'ampleur de la perte renseigne sur le {{t:pot|pot}}, pas sur la décision. Une grosse perte peut venir d'une bonne décision, une petite d'une erreur." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Un ami vous interroge sur le même coup joué dans deux mains : il a gagné l'une et perdu l'autre. Vous avez l'impression qu'il a mieux joué la première fois. Que se passe-t-il ?"
    options:
      - { text: "C'est le biais du résultat : vous jugez la décision d'après la façon dont elle s'est terminée", correct: true, why: "Dans des études de psychologie, les gens jugeaient la même décision meilleure quand le résultat était bon, même s'ils estimaient que le résultat ne devait pas compter. Juger avant de connaître le résultat aide." }
      - { text: "La première décision était meilleure, car elle a marché", why: "Si le coup est le même, la décision est la même. Seul le résultat diffère, c'est-à-dire le hasard." }
      - { text: "La seconde décision était meilleure, car elle apprend l'humilité", why: "Le jugement ne dépend du résultat dans aucun sens. Une même décision a la même qualité." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Pendant trois {{t:session|sessions}}, vous avez joué plus agressivement que d'habitude et vous avez gagné. Est-ce la preuve que le nouveau style est meilleur ?"
    options:
      - { text: "Non, trois {{t:session|sessions}}, c'est trop peu ; vous jugez les nouveaux coups en revoyant vos mains", correct: true, why: "Même un énorme écart de niveau (les {{n:skill.pct}} meilleurs contre les {{n:skill.pct}} plus faibles) ne prend l'avantage dans env. {{n:skill.ahead}} des cas qu'après env. {{n:skill.hands}} mains. L'écart entre vos deux styles est bien plus petit." }
      - { text: "Oui, le résultat montre ce qui marche", why: "Le résultat de quelques {{t:session|sessions}} est surtout du bruit. Avec un {{t:standard-deviation|écart type}} d'env. {{n:var.sd}}, même {{n:var.hands.k}} milliers de mains laissent une erreur d'env. ± {{n:var.ci.wr}}." }
      - { text: "Oui, si vous avez gagné plus que d'habitude", why: "Un gain plus important sur un petit échantillon reste un petit échantillon. Vous jugez les coups par le calcul et la revue des mains." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Une étude portant sur des millions de mains en ligne a montré à partir de quand le talent commence à l'emporter sur la chance. Qu'a-t-on mesuré exactement ?"
    options:
      - { text: "Les {{n:skill.pct}} meilleurs joueurs devancent les {{n:skill.pct}} plus faibles dans env. {{n:skill.ahead}} des cas après env. {{n:skill.hands}} mains", correct: true, why: "C'est ainsi que le définissent les auteurs de l'étude (2015). Il s'agit d'une comparaison entre groupes extrêmes : pour des écarts de niveau plus faibles, il faut beaucoup plus de mains." }
      - { text: "Après env. {{n:skill.hands}} mains, tout bon joueur est gagnant", why: "L'étude compare des groupes extrêmes de joueurs ; elle ne dit pas quand un bon joueur donné sera gagnant. Cela dépend du winrate et de l'{{t:standard-deviation|écart type}} (leçon sur la {{t:variance|variance}})." }
      - { text: "Après env. {{n:skill.hands}} mains, la chance cesse de compter", why: "La chance compte toujours. L'étude dit seulement à partir de quand l'avantage des meilleurs sur les moins bons commence à l'emporter dans la majorité des comparaisons." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Vous avez gagné une {{t:session|session}} grâce à deux calls sans bon prix, qui ont touché à la river. Que faites-vous après la {{t:session|session}} ?"
    options:
      - { text: "Vous notez ces {{t:call|calls}} comme des erreurs à corriger", correct: true, why: "Gagner ne change pas le prix. Si le {{t:call|call}} exigeait plus d'equity que vous n'en aviez, c'était une erreur, même s'il a payé." }
      - { text: "Rien, la {{t:session|session}} était gagnante", why: "Les erreurs commises dans des {{t:session|sessions}} gagnantes coûtent tout autant, elles sont seulement plus difficiles à repérer. N'analyser que les pertes laisse de côté la moitié des erreurs." }
      - { text: "Vous concluez que vous lisez vos adversaires mieux que ne l'indique le calcul", why: "Deux coups touchés, c'est trop peu pour tirer des conclusions sur la lecture des adversaires. L'explication la plus simple, c'est la {{t:variance|variance}}." }
---
Le poker vous renvoie un retour qui ment souvent. Une bonne décision peut perdre, et une mauvaise gagner. Si vous jugez votre jeu d'après les résultats, vous apprenez à partir de signaux aléatoires.

## Resulting : juger d'après le résultat

Les joueurs appellent cela le *resulting* : vous supposez que la qualité du résultat vous renseigne sur la qualité de la décision. Les psychologues décrivent le même phénomène sous le nom de **biais du résultat**. Dans une étude de psychologie classique (1988), les gens jugeaient la même décision meilleure, et la personne qui l'avait prise plus compétente, quand le résultat était favorable. Ils le faisaient même lorsqu'ils estimaient eux-mêmes ne pas devoir tenir compte du résultat.

## Une bonne décision perd aussi

Aller à tapis avec une {{t:pair|paire}} d'as contre une {{t:pair|paire}} de rois est la meilleure décision possible, et pourtant elle perd dans env. **{{n:res.kk-wins}}** des cas. À l'inverse, un {{t:call|call}} avec un {{t:flush-draw|tirage couleur}} pour tout le {{t:pot|pot}} à la turn est mauvais (il vous faut {{n:eq.bet-pot}}, vous avez env. {{n:odds.flush.turn-river}}), et pourtant il gagne environ une fois sur cinq.

```formula
qualité de la décision = EV avec les informations que vous aviez au moment de la décision
```

## Comment analyser une main

1. Masquez le résultat. Ne jugez que ce que vous saviez au moment de la décision.
2. Calculez le prix et l'equity face à la {{t:range|range}} de l'adversaire (M2, M6).
3. Vérifiez si le coup respecte les règles du cours.
4. Analysez aussi les mains gagnées : les erreurs qui ont payé coûtent tout autant.

## Quand le résultat commence à signifier quelque chose

Dans une étude portant sur env. {{n:skill.sample.m}} millions de mains en ligne (étude de 2015), le talent ne commençait à l'emporter qu'après env. **{{n:skill.hands}}** mains. Cela signifie que les {{n:skill.pct}} meilleurs joueurs devançaient les {{n:skill.pct}} plus faibles dans env. {{n:skill.ahead}} des comparaisons. Pour des écarts de niveau plus faibles, il faut plusieurs fois plus de mains. Le résultat de quelques {{t:session|sessions}} ne dit donc pas quel style de jeu est le meilleur.

:::note L'évaluation dans cette application
C'est pourquoi l'application évalue vos décisions, et non le résultat de la main. Quand le résultat et la décision divergent, fiez-vous au calcul.
:::
