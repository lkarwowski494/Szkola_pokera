# Pakiet kontroli (a), fr: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:7
NOWE:     prompt: "Vous gagnez en moyenne {{n:var.wr.typical.high}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} et vous allez jouer {{n:exam.m12.hands.k}} mille mains ({{n:exam.m12.blocks}} blocs de 100). Dans quel intervalle votre résultat se situera-t-il avec environ {{n:var.conf95}} de confiance ?"
STARE:     prompt: "Vous gagnez en moyenne {{n:var.wr.typical.high}} avec un {{t:standard-deviation|écart type}} de {{n:var.sd}} et vous allez jouer {{n:exam.m12.hands.k}} mille mains ({{n:exam.m12.blocks}} blocs de 100). Dans quel intervalle votre résultat se situera-t-il avec environ {{n:var.conf95}} de confiance ?"

## [2] exams/m12.yaml:9
NOWE:       - { text: "D'environ {{n:exam.m12.ci.low.bi}} à environ {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Vous attendez {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, soit {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. L'{{t:standard-deviation|écart-type}} du résultat est de {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, soit environ {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Intervalle : {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}." }
STARE:       - { text: "D'environ {{n:exam.m12.ci.low.bi}} à environ {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Vous attendez {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, soit {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. L'{{t:standard-deviation|écart type}} du résultat est de {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, soit environ {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Intervalle : {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}." }

## [3] exams/m12.yaml:10
NOWE:       - { text: "Exactement {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}", why: "{{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}, c'est le résultat attendu, c'est-à-dire la moyenne. L'{{t:standard-deviation|écart-type}} du résultat après {{n:exam.m12.hands.k}} mille mains est d'environ {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}} : le résultat réel peut donc être loin de la moyenne." }
STARE:       - { text: "Exactement {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}", why: "{{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}, c'est le résultat attendu, c'est-à-dire la moyenne. L'{{t:standard-deviation|écart type}} du résultat après {{n:exam.m12.hands.k}} mille mains est d'environ {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}} : le résultat réel peut donc être loin de la moyenne." }

## [4] exams/m12.yaml:16
NOWE:     prompt: "Après {{n:exam.m12.hands.k}} mille mains, votre winrate est de {{n:var.wr.typical.high}} et votre {{t:standard-deviation|écart-type}} de {{n:var.sd}}. Que savez-vous de votre vrai winrate ?"
STARE:     prompt: "Après {{n:exam.m12.hands.k}} mille mains, votre winrate est de {{n:var.wr.typical.high}} et votre {{t:standard-deviation|écart type}} de {{n:var.sd}}. Que savez-vous de votre vrai winrate ?"

## [5] exams/m12.yaml:25
NOWE:     prompt: "Vous jouez de manière agressive et votre {{t:standard-deviation|écart-type}} est de {{n:var.sd.high}}. Vous voulez connaître votre winrate à ± {{n:var.target}} près avec {{n:var.conf95}} de confiance. De combien de mains avez-vous besoin ?"
STARE:     prompt: "Vous jouez de manière agressive et votre {{t:standard-deviation|écart type}} est de {{n:var.sd.high}}. Vous voulez connaître votre winrate à ± {{n:var.target}} près avec {{n:var.conf95}} de confiance. De combien de mains avez-vous besoin ?"

## [6] exams/m12.yaml:27
NOWE:       - { text: "Environ {{n:exam.m12.need.hands.k}} mille", correct: true, why: "Blocs = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, soit environ {{n:exam.m12.need.hands.k}} mille mains. Un {{t:standard-deviation|écart-type}} plus élevé exige un échantillon beaucoup plus grand." }
STARE:       - { text: "Environ {{n:exam.m12.need.hands.k}} mille", correct: true, why: "Blocs = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, soit environ {{n:exam.m12.need.hands.k}} mille mains. Un {{t:standard-deviation|écart type}} plus élevé exige un échantillon beaucoup plus grand." }

## [7] exams/m12.yaml:28
NOWE:       - { text: "Environ {{n:var.need.hands.k}} mille, autant qu'avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}}", why: "L'{{t:standard-deviation|écart-type}} est au carré dans la formule : avec {{n:var.sd.high}} au lieu de {{n:var.sd}}, il vous faut nettement plus de mains, environ {{n:exam.m12.need.hands.k}} mille." }
STARE:       - { text: "Environ {{n:var.need.hands.k}} mille, autant qu'avec un {{t:standard-deviation|écart type}} de {{n:var.sd}}", why: "L'{{t:standard-deviation|écart type}} est au carré dans la formule : avec {{n:var.sd.high}} au lieu de {{n:var.sd}}, il vous faut nettement plus de mains, environ {{n:exam.m12.need.hands.k}} mille." }

## [8] exams/m12.yaml:34
NOWE:     prompt: "Vous avez changé de style de jeu et, après {{n:exam.m12.style.hands.k}} mille mains, vous êtes à {{n:exam.m12.style.wr}}. Votre {{t:standard-deviation|écart-type}} est de {{n:var.sd}}. Est-ce la preuve que le nouveau style est meilleur ?"
STARE:     prompt: "Vous avez changé de style de jeu et, après {{n:exam.m12.style.hands.k}} mille mains, vous êtes à {{n:exam.m12.style.wr}}. Votre {{t:standard-deviation|écart type}} est de {{n:var.sd}}. Est-ce la preuve que le nouveau style est meilleur ?"

## [9] exams/m12.yaml:45
NOWE:       - { text: "Il était mauvais, malgré le gain", correct: true, why: "Il vous fallait {{n:eq.bet-half}} d'équité, et un {{t:flush-draw|tirage couleur}} rentre à la river dans environ {{n:odds.flush.turn-river}} des cas. Votre adversaire est à tapis, il ne vous paiera donc plus rien ensuite. Sur de nombreuses répétitions, un tel {{t:call|call}} perd." }
STARE:       - { text: "Il était mauvais, malgré le gain", correct: true, why: "Il vous fallait {{n:eq.bet-half}} d'equity, et un {{t:flush-draw|tirage couleur}} rentre à la river dans environ {{n:odds.flush.turn-river}} des cas. Votre adversaire est à tapis, il ne vous paiera donc plus rien ensuite. Sur de nombreuses répétitions, un tel {{t:call|call}} perd." }

## [10] exams/m12.yaml:46
NOWE:       - { text: "Il était bon, car vous avez gagné le {{t:pot|pot}}", why: "Le résultat d'une seule main ne change pas le prix. L'évaluation porte sur la décision avec les informations dont vous disposiez : {{n:odds.flush.turn-river}} d'équité face aux {{n:eq.bet-half}} nécessaires." }
STARE:       - { text: "Il était bon, car vous avez gagné le {{t:pot|pot}}", why: "Le résultat d'une seule main ne change pas le prix. L'évaluation porte sur la décision avec les informations dont vous disposiez : {{n:odds.flush.turn-river}} d'equity face aux {{n:eq.bet-half}} nécessaires." }

## [11] exams/m12.yaml:56
NOWE:       - { text: "Le tilt de l'erreur", why: "Le tilt de l'erreur, c'est la colère contre vos propres erreurs. Ici, vous savez que vous avez bien joué." }
STARE:       - { text: "Le tilt d'erreur", why: "Le tilt d'erreur, c'est la colère contre vos propres erreurs. Ici, vous savez que vous avez bien joué." }

## [12] exams/m12.yaml:71
NOWE:     prompt: "Vous gagnez {{n:dd.wr-low}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} et vous avez {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Quel est le risque de perdre toute votre bankroll si vous ne descendez jamais de {{t:stakes|limite}} ?"
STARE:     prompt: "Vous gagnez {{n:dd.wr-low}} avec un {{t:standard-deviation|écart type}} de {{n:var.sd}} et vous avez {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Quel est le risque de perdre toute votre bankroll si vous ne descendez jamais de {{t:stakes|limite}} ?"

## [13] exams/m12.yaml:89
NOWE:     prompt: "Votre winrate s'avère deux fois plus faible que prévu, et votre {{t:standard-deviation|écart-type}} ne change pas. De combien de {{t:buy-in|buy-ins}} avez-vous besoin pour que votre {{t:risk-of-ruin|risque de ruine}} reste le même ?"
STARE:     prompt: "Votre winrate s'avère deux fois plus faible que prévu, et votre {{t:standard-deviation|écart type}} ne change pas. De combien de {{t:buy-in|buy-ins}} avez-vous besoin pour que votre {{t:risk-of-ruin|risque de ruine}} reste le même ?"

## [14] exams/m12.yaml:93
NOWE:       - { text: "Quatre fois plus", why: "C'est l'{{t:standard-deviation|écart-type}} qui est au carré, pas le winrate. Le winrate et la bankroll forment un produit, donc deux fois plus de {{t:buy-in|buy-ins}} suffisent." }
STARE:       - { text: "Quatre fois plus", why: "C'est l'{{t:standard-deviation|écart type}} qui est au carré, pas le winrate. Le winrate et la bankroll forment un produit, donc deux fois plus de {{t:buy-in|buy-ins}} suffisent." }

## [15] lessons/m12-l1-wariancja.md:65
NOWE:       - { text: "Presque toujours, environ {{n:dd.p.small.100k}}", correct: true, why: "Une simulation de {{n:var.hands.k}} mille mains avec ces paramètres produit un tel {{t:downswing}} dans environ {{n:dd.p.small.100k}} des parcours. Un {{t:downswing|downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} est une composante normale du jeu d'un joueur gagnant." }
STARE:       - { text: "Presque toujours, environ {{n:dd.p.small.100k}}", correct: true, why: "Une simulation de {{n:var.hands.k}} mille mains avec ces paramètres produit un tel {{t:downswing}} dans environ {{n:dd.p.small.100k}} des parcours. Un {{t:downswing|downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} fait normalement partie du jeu d'un joueur gagnant." }

## [16] lessons/m12-l2-decyzja-wynik.md:16
NOWE:       - { text: "Elle était mauvaise, il fallait jouer plus prudemment", why: "C'est juger d'après le résultat. Si la carte de la river avait été différente, la même décision aurait paru excellente. La décision dépend de ce que vous saviez avant la carte : env. {{n:pf.aa-vs-kk}} d'équité." }
STARE:       - { text: "Elle était mauvaise, il fallait jouer plus prudemment", why: "C'est juger d'après le résultat. Si la carte de la river avait été différente, la même décision aurait paru excellente. La décision dépend de ce que vous saviez avant la carte : env. {{n:pf.aa-vs-kk}} d'equity." }

## [17] lessons/m12-l2-decyzja-wynik.md:17
NOWE:       - { text: "Impossible à juger, puisque vous avez perdu", why: "Si : vous calculez l'équité au moment de la décision. Le résultat d'une seule main n'y ajoute rien." }
STARE:       - { text: "Impossible à juger, puisque vous avez perdu", why: "Si : vous calculez l'equity au moment de la décision. Le résultat d'une seule main n'y ajoute rien." }

## [18] lessons/m12-l2-decyzja-wynik.md:31
NOWE:       - { text: "Il était bon", correct: true, why: "Il vous fallait {{n:eq.bet-quarter}} d'équité et vous en aviez env. {{n:odds.flush.turn-river}}. Un tel {{t:call|call}} rapporte sur le long terme, même s'il perd dans la plupart des mains prises isolément." }
STARE:       - { text: "Il était bon", correct: true, why: "Il vous fallait {{n:eq.bet-quarter}} d'equity et vous en aviez env. {{n:odds.flush.turn-river}}. Un tel {{t:call|call}} rapporte sur le long terme, même s'il perd dans la plupart des mains prises isolément." }

## [19] lessons/m12-l2-decyzja-wynik.md:40
NOWE:       - { text: "Il était mauvais, malgré le gain", correct: true, why: "Il vous fallait {{n:eq.bet-pot}} d'équité et vous en aviez env. {{n:odds.flush.turn-river}}. Vous avez gagné cette fois, mais sur de nombreuses répétitions, un tel {{t:call|call}} perd." }
STARE:       - { text: "Il était mauvais, malgré le gain", correct: true, why: "Il vous fallait {{n:eq.bet-pot}} d'equity et vous en aviez env. {{n:odds.flush.turn-river}}. Vous avez gagné cette fois, mais sur de nombreuses répétitions, un tel {{t:call|call}} perd." }

## [20] lessons/m12-l2-decyzja-wynik.md:49
NOWE:       - { text: "Avec les informations dont je disposais, la décision avait-elle une {{t:expected-value|EV}} positive ?", correct: true, why: "C'est la seule question qui distingue une erreur de la malchance. Vous calculez le prix, l'équité face à la {{t:range|range}} de l'adversaire et ce que vous saviez au moment de la décision." }
STARE:       - { text: "Avec les informations dont je disposais, la décision avait-elle une {{t:expected-value|EV}} positive ?", correct: true, why: "C'est la seule question qui distingue une erreur de la malchance. Vous calculez le prix, l'equity face à la {{t:range|range}} de l'adversaire et ce que vous saviez au moment de la décision." }

## [21] lessons/m12-l2-decyzja-wynik.md:67
NOWE:       - { text: "Non, trois {{t:session|sessions}}, c'est trop peu ; vous jugez les nouveaux coups en revoyant vos mains", correct: true, why: "Même un énorme écart de niveau (les {{n:skill.pct}} meilleurs contre les {{n:skill.pct}} les plus faibles) ne prend l'avantage dans env. {{n:skill.ahead}} des cas qu'après env. {{n:skill.hands}} mains. L'écart entre vos deux styles est bien plus petit." }
STARE:       - { text: "Non, trois {{t:session|sessions}}, c'est trop peu ; vous jugez les nouveaux coups en revoyant vos mains", correct: true, why: "Même un énorme écart de niveau (les {{n:skill.pct}} meilleurs contre les {{n:skill.pct}} plus faibles) ne prend l'avantage dans env. {{n:skill.ahead}} des cas qu'après env. {{n:skill.hands}} mains. L'écart entre vos deux styles est bien plus petit." }

## [22] lessons/m12-l2-decyzja-wynik.md:68
NOWE:       - { text: "Oui, le résultat montre ce qui marche", why: "Le résultat de quelques {{t:session|sessions}} est surtout du bruit. Avec un {{t:standard-deviation|écart-type}} d'env. {{n:var.sd}}, même {{n:var.hands.k}} mille mains laissent une erreur d'env. ± {{n:var.ci.wr}}." }
STARE:       - { text: "Oui, le résultat montre ce qui marche", why: "Le résultat de quelques {{t:session|sessions}} est surtout du bruit. Avec un {{t:standard-deviation|écart type}} d'env. {{n:var.sd}}, même {{n:var.hands.k}} milliers de mains laissent une erreur d'env. ± {{n:var.ci.wr}}." }

## [23] lessons/m12-l2-decyzja-wynik.md:74
NOWE:     prompt: "Une étude portant sur des millions de mains en ligne a montré à partir de quand la compétence commence à l'emporter sur la chance. Qu'a-t-on mesuré exactement ?"
STARE:     prompt: "Une étude portant sur des millions de mains en ligne a montré à partir de quand le talent commence à l'emporter sur la chance. Qu'a-t-on mesuré exactement ?"

## [24] lessons/m12-l2-decyzja-wynik.md:76
NOWE:       - { text: "Les {{n:skill.pct}} meilleurs joueurs devancent les {{n:skill.pct}} les plus faibles dans env. {{n:skill.ahead}} des cas après env. {{n:skill.hands}} mains", correct: true, why: "C'est ainsi que le définissent les auteurs de l'étude (2015). Il s'agit d'une comparaison entre groupes extrêmes : pour des écarts de niveau plus faibles, il faut beaucoup plus de mains." }
STARE:       - { text: "Les {{n:skill.pct}} meilleurs joueurs devancent les {{n:skill.pct}} plus faibles dans env. {{n:skill.ahead}} des cas après env. {{n:skill.hands}} mains", correct: true, why: "C'est ainsi que le définissent les auteurs de l'étude (2015). Il s'agit d'une comparaison entre groupes extrêmes : pour des écarts de niveau plus faibles, il faut beaucoup plus de mains." }

## [25] lessons/m12-l2-decyzja-wynik.md:77
NOWE:       - { text: "Après env. {{n:skill.hands}} mains, tout bon joueur est gagnant", why: "L'étude compare des groupes extrêmes de joueurs ; elle ne dit pas quand un bon joueur donné sera gagnant. Cela dépend du winrate et de l'{{t:standard-deviation|écart-type}} (leçon sur la {{t:variance|variance}})." }
STARE:       - { text: "Après env. {{n:skill.hands}} mains, tout bon joueur est gagnant", why: "L'étude compare des groupes extrêmes de joueurs ; elle ne dit pas quand un bon joueur donné sera gagnant. Cela dépend du winrate et de l'{{t:standard-deviation|écart type}} (leçon sur la {{t:variance|variance}})." }

## [26] lessons/m12-l2-decyzja-wynik.md:85
NOWE:       - { text: "Vous notez ces {{t:call|calls}} comme des erreurs à corriger", correct: true, why: "Gagner ne change pas le prix. Si le {{t:call|call}} exigeait plus d'équité que vous n'en aviez, c'était une erreur, même s'il a payé." }
STARE:       - { text: "Vous notez ces {{t:call|calls}} comme des erreurs à corriger", correct: true, why: "Gagner ne change pas le prix. Si le {{t:call|call}} exigeait plus d'equity que vous n'en aviez, c'était une erreur, même s'il a payé." }

## [27] lessons/m12-l2-decyzja-wynik.md:106
NOWE: 2. Calculez le prix et l'équité face à la {{t:range|range}} de l'adversaire (M2, M6).
STARE: 2. Calculez le prix et l'equity face à la {{t:range|range}} de l'adversaire (M2, M6).

## [28] lessons/m12-l2-decyzja-wynik.md:112
NOWE: Dans une étude portant sur env. {{n:skill.sample.m}} millions de mains en ligne (étude de 2015), la compétence ne commençait à l'emporter qu'après env. **{{n:skill.hands}}** mains. Cela signifie que les {{n:skill.pct}} meilleurs joueurs devançaient les {{n:skill.pct}} les plus faibles dans env. {{n:skill.ahead}} des comparaisons. Pour des écarts de niveau plus faibles, il faut plusieurs fois plus de mains. Le résultat de quelques {{t:session|sessions}} ne dit donc pas quel style de jeu est le meilleur.
STARE: Dans une étude portant sur env. {{n:skill.sample.m}} millions de mains en ligne (étude de 2015), le talent ne commençait à l'emporter qu'après env. **{{n:skill.hands}}** mains. Cela signifie que les {{n:skill.pct}} meilleurs joueurs devançaient les {{n:skill.pct}} plus faibles dans env. {{n:skill.ahead}} des comparaisons. Pour des écarts de niveau plus faibles, il faut plusieurs fois plus de mains. Le résultat de quelques {{t:session|sessions}} ne dit donc pas quel style de jeu est le meilleur.

## [29] lessons/m12-l3-tilt.md:22
NOWE:     prompt: "Le même adversaire relance sur vos blindes pour la quatrième fois d'affilée. Vous décidez que la prochaine fois, vous {{t:raise|relancerez}} contre lui avec n'importe quelle main, pour lui montrer. De quel type de tilt s'agit-il ?"
STARE:     prompt: "Le même adversaire relance sur vos blinds pour la quatrième fois d'affilée. Vous décidez que la prochaine fois, vous {{t:raise|relancerez}} contre lui avec n'importe quelle main, pour lui montrer. De quel type de tilt s'agit-il ?"

## [30] lessons/m12-l3-tilt.md:78
NOWE:       - { text: "Par rédiger votre profil : ce qui déclenche votre tilt, ce que vous pensez et ressentez, comment votre jeu change", correct: true, why: "Chaque joueur tilte un peu différemment et pour des raisons différentes. Le profil permet de reconnaître les signaux avant que le tilt ne grandisse : on ne peut pas contrôler ce qu'on ne comprend pas." }
STARE:       - { text: "Par rédiger votre profil : ce qui vous déclenche, ce que vous pensez et ressentez, comment votre jeu change", correct: true, why: "Chaque joueur tilte un peu différemment et pour des raisons différentes. Le profil permet de reconnaître les signaux avant que le tilt ne grandisse : on ne peut pas contrôler ce qu'on ne comprend pas." }

## [31] lessons/m12-l3-tilt.md:130
NOWE: Votre niveau de jeu varie : de votre meilleur jeu (A-game) à votre pire jeu (C-game). Le progrès ressemble au déplacement d'une chenille : un pas en avant à l'avant, quand votre meilleur jeu s'améliore, et un pas à l'arrière, quand votre pire jeu devient moins catastrophique. C'est le C-game qui coûte le plus, alors commencez par lui.
STARE: Votre jeu a un écart : de votre meilleur jeu (A-game) à votre pire jeu (C-game). Le progrès ressemble au déplacement d'une chenille : un pas en avant à l'avant, quand votre meilleur jeu s'améliore, et un pas à l'arrière, quand votre pire jeu devient moins catastrophique. C'est le C-game qui coûte le plus, alors commencez par lui.

## [32] lessons/m12-l3-tilt.md:133
NOWE: Si vous jouez plus longtemps que prévu, cherchez à vous refaire ou jouez avec de l'argent que vous ne pouvez pas vous permettre de perdre, lisez l'encadré « Jeu responsable » dans la leçon sur la bankroll.
STARE: Si vous jouez plus longtemps que prévu, cherchez à vous refaire ou jouez avec de l'argent que vous ne pouvez pas vous permettre de perdre, lisez la fiche sur le jeu responsable dans la leçon sur la bankroll.

## [33] lessons/m12-l4-bankroll.md:20
NOWE:     prompt: "Vous gagnez {{n:var.wr.typical.high}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} et vous avez {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). Quel est le risque de perdre toute votre bankroll ?"
STARE:     prompt: "Vous gagnez {{n:var.wr.typical.high}} avec un {{t:standard-deviation|écart type}} de {{n:var.sd}} et vous avez {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). Quel est le risque de perdre toute votre bankroll ?"

## [34] lessons/m12-l4-bankroll.md:29
NOWE:     prompt: "La même bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}, un {{t:standard-deviation|écart-type}} de {{n:var.sd}}, mais un winrate de seulement {{n:var.wr.typical.low}}. Quel est le risque de perdre la bankroll ?"
STARE:     prompt: "La même bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}, un {{t:standard-deviation|écart type}} de {{n:var.sd}}, mais un winrate de seulement {{n:var.wr.typical.low}}. Quel est le risque de perdre la bankroll ?"

## [35] lessons/m12-l4-bankroll.md:38
NOWE:     prompt: "Vous avez {{n:br.bi.base}} {{t:buy-in|buy-ins}}, un {{t:standard-deviation|écart-type}} de {{n:var.sd}}, mais vous ne connaissez pas encore votre winrate. Que savez-vous du risque de perdre toute votre bankroll ?"
STARE:     prompt: "Vous avez {{n:br.bi.base}} {{t:buy-in|buy-ins}}, un {{t:standard-deviation|écart type}} de {{n:var.sd}}, mais vous ne connaissez pas encore votre winrate. Que savez-vous du risque de perdre toute votre bankroll ?"

## [36] lessons/m12-l4-bankroll.md:51
NOWE:       - { text: "Vous montez à une {{t:stakes|limite}} supérieure pour vous refaire plus vite", why: "C'est du tilt de désespoir. Une {{t:stakes|limite}} plus élevée avec une bankroll plus petite en {{t:buy-in|buy-ins}} augmente fortement le {{t:risk-of-ruin|risque de ruine}}." }
STARE:       - { text: "Vous montez à une {{t:stakes|limite}} supérieure pour vous refaire plus vite", why: "C'est du tilt par désespoir. Une {{t:stakes|limite}} plus élevée avec une bankroll plus petite en {{t:buy-in|buy-ins}} augmente fortement le {{t:risk-of-ruin|risque de ruine}}." }

## [37] lessons/m12-l4-bankroll.md:77
NOWE:       - { text: "Elle le protège de la ruine", why: "La formule du risque ne fonctionne qu'avec un winrate positif. Un joueur perdant perd sa bankroll à coup sûr, simplement plus lentement avec une bankroll plus grande." }
STARE:       - { text: "Elle le protège de la faillite", why: "La formule du risque ne fonctionne qu'avec un winrate positif. Un joueur perdant perd sa bankroll à coup sûr, simplement plus lentement avec une bankroll plus grande." }

## [38] lessons/m12-l4-bankroll.md:123
NOWE: La formule est une approximation qui suppose un winrate et un SD constants. Le winrate et le SD s'expriment en bb/100, la bankroll en bb. Avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} :
STARE: La formule est une approximation qui suppose un winrate et un SD constants. Le winrate et le SD s'expriment en bb/100, la bankroll en bb. Avec un {{t:standard-deviation|écart type}} de {{n:var.sd}} :

## [39] rules.yaml R-M12-003
NOWE:
```
- id: R-M12-003
  module: m12
  if: "vous voulez savoir combien vous gagnez vraiment"
  then: "vous accumulez des centaines de milliers de mains : une précision de ± {{n:var.target}} avec {{n:var.conf95}} de certitude exige environ {{n:var.need.hands.k}} mille mains"
  because: "l'erreur d'estimation diminue avec la racine carrée du nombre de mains : nombre de blocs de 100 mains nécessaires = ({{n:var.z95}} × SD ÷ précision)²"
  level: math
  source: "calcul : (1,96 × 80 ÷ 2)² blocs ; cohérent avec l'ordre de grandeur du document 08 (environ 615 000 mains)"
  sources: [{ kind: math }]
```
STARE:
```
- id: R-M12-003
  module: m12
  if: "vous voulez savoir combien vous gagnez vraiment"
  then: "vous accumulez des centaines de milliers de mains : une précision de ± {{n:var.target}} avec {{n:var.conf95}} de certitude exige environ {{n:var.need.hands.k}} mille mains"
  because: "l'erreur d'estimation diminue avec la racine carrée du nombre de mains : nombre de blocs de 100 mains nécessaires = ({{n:var.z95}} × SD ÷ précision)²"
  level: math
  source: "calcul : (1,96 × 80 ÷ 2)² blocs ; cohérent avec l'ordre de grandeur du document 08 (environ 615 mille mains)"
  sources: [{ kind: math }]
```

## [40] rules.yaml R-M12-005
NOWE:
```
- id: R-M12-005
  module: m12
  if: "le résultat de quelques {{t:session|sessions}} vous pousse à changer de stratégie"
  then: "vous ne la changez qu'après avoir revu vos mains, et non sur la seule base du résultat"
  because: "même les {{n:skill.pct}} de joueurs les plus forts ne devancent les {{n:skill.pct}} les plus faibles dans environ {{n:skill.ahead}} des cas qu'après environ {{n:skill.hands}} mains, et des écarts de niveau plus petits demandent beaucoup plus de mains"
  level: heuristic
  source: "van Loon, van den Assem et van Dolder (2015), Beyond Chance? The Persistence of Performance in Online Poker, PLoS ONE 10(3)"
  sources: [{ kind: study }]
```
STARE:
```
- id: R-M12-005
  module: m12
  if: "le résultat de quelques {{t:session|sessions}} vous pousse à changer de stratégie"
  then: "vous ne la changez qu'après avoir revu vos mains, et non sur la seule base du résultat"
  because: "même les {{n:skill.pct}} meilleurs joueurs ne devancent les {{n:skill.pct}} plus faibles dans environ {{n:skill.ahead}} des cas qu'après environ {{n:skill.hands}} mains, et des écarts de niveau plus petits demandent beaucoup plus de mains"
  level: heuristic
  source: "van Loon, van den Assem et van Dolder (2015), Beyond Chance? The Persistence of Performance in Online Poker, PLoS ONE 10(3)"
  sources: [{ kind: study }]
```
