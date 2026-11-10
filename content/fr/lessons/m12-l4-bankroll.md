---
id: m12.l4
module: m12
order: 4
title: "Bankroll et risque"
sub: "La variance mesurée en buy-ins et quand descendre de limite"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "Un {{t:buy-in|buy-in}} correspond à {{n:format.stack}}. Combien de bb représente une bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}} ? Saisissez un nombre."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Vous comptez votre bankroll en {{t:buy-in|buy-ins}} de la {{t:stakes|limite}} à laquelle vous jouez."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Vous gagnez {{n:var.wr.typical.high}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} et vous avez {{n:br.bi.base}} {{t:buy-in|buy-ins}} ({{n:br.base.bb}}). Quel est le risque de perdre toute votre bankroll ?"
    options:
      - { text: "Environ {{n:ror.base}}", correct: true, why: "L'exposant vaut 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, donc RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. C'est la probabilité de perdre un jour toute votre bankroll si vous ne descendez jamais de {{t:stakes|limite}}." }
      - { text: "Environ {{n:ror.half}}", why: "C'est le résultat avec la moitié de la bankroll, {{n:br.bi.move-down}} {{t:buy-in|buy-ins}}. Avec {{n:br.bi.base}}, l'exposant est deux fois plus grand, donc le risque tombe à environ {{n:ror.base}}." }
      - { text: "Zéro, car le joueur est gagnant", why: "Un joueur gagnant peut lui aussi subir un {{t:downswing}} plus profond que toute sa bankroll. Le risque diminue quand la bankroll augmente, mais il ne tombe jamais à zéro." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "La même bankroll de {{n:br.bi.base}} {{t:buy-in|buy-ins}}, un {{t:standard-deviation|écart-type}} de {{n:var.sd}}, mais un winrate de seulement {{n:var.wr.typical.low}}. Quel est le risque de perdre la bankroll ?"
    options:
      - { text: "Environ {{n:ror.base.wr-min}}", correct: true, why: "Le winrate figure dans l'exposant : à {{n:var.wr.typical.low}} au lieu de {{n:var.wr.typical.high}}, l'exposant est trois fois plus petit, et le risque passe d'environ {{n:ror.base}} à environ {{n:ror.base.wr-min}}." }
      - { text: "Environ {{n:ror.base}}, car la bankroll est la même", why: "Le risque dépend du produit winrate × bankroll. Un winrate plus faible agit comme une bankroll plus petite : on obtient environ {{n:ror.base.wr-min}}." }
      - { text: "Environ {{n:ror.base.wr-ex}}", why: "C'est le résultat avec un winrate de {{n:var.wr.ex}}. À {{n:var.wr.typical.low}}, le risque est plusieurs dizaines de fois plus élevé : environ {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Vous avez {{n:br.bi.base}} {{t:buy-in|buy-ins}}, un {{t:standard-deviation|écart-type}} de {{n:var.sd}}, mais vous ne connaissez pas encore votre winrate. Que savez-vous du risque de perdre toute votre bankroll ?"
    options:
      - { text: "Il dépend du winrate : à {{n:var.wr.typical.high}} environ {{n:ror.base}}, à {{n:var.wr.typical.low}} environ {{n:ror.base.wr-min}}", correct: true, why: "Le winrate figure dans l'exposant à côté de la bankroll. Sans winrate connu, vous ne connaissez pas non plus le risque, et avec un winrate faible, la même bankroll donne un risque plusieurs fois plus élevé." }
      - { text: "Environ {{n:ror.base}}, car il ne dépend que de la bankroll", why: "On n'obtient ce résultat qu'à {{n:var.wr.typical.high}}. À {{n:var.wr.typical.low}}, la même bankroll donne environ {{n:ror.base.wr-min}}." }
      - { text: "Zéro, car {{n:br.bi.base}} {{t:buy-in|buy-ins}}, c'est beaucoup", why: "Avec un winrate positif, le risque diminue quand la bankroll augmente, mais il ne tombe jamais à zéro. À {{n:var.wr.typical.low}}, il est encore d'environ {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Vous avez commencé à cette {{t:stakes|limite}} avec {{n:br.bi.base}} {{t:buy-in|buy-ins}}. Après un {{t:downswing}}, vous avez {{n:br.ex.below}}. Que faites-vous ?"
    options:
      - { text: "Vous descendez d'une {{t:stakes|limite}}", correct: true, why: "Vous êtes passé sous la moitié de la bankroll prévue ({{n:br.bi.move-down}}). Avec ce nombre de {{t:buy-in|buy-ins}}, le risque de perdre le reste est plusieurs fois plus élevé qu'avec {{n:br.bi.base}} (avec un winrate de {{n:var.wr.typical.high}} et un SD de {{n:var.sd}}). À une {{t:stakes|limite}} deux fois plus basse, la même bankroll représente de nouveau presque le nombre complet de {{t:buy-in|buy-ins}} de cette limite." }
      - { text: "Vous continuez, car ce n'est que de la {{t:variance}}", why: "Il est vrai que c'est probablement de la {{t:variance}}, mais c'est justement contre elle que protège la descente de {{t:stakes|limite}}. Avec {{n:br.ex.below}} {{t:buy-in|buy-ins}}, un nouveau {{t:downswing}} peut tout emporter." }
      - { text: "Vous montez à une {{t:stakes|limite}} supérieure pour vous refaire plus vite", why: "C'est du tilt de désespoir. Une {{t:stakes|limite}} plus élevée avec une bankroll plus petite en {{t:buy-in|buy-ins}} augmente fortement le {{t:risk-of-ruin|risque de ruine}}." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Vous avez commencé à cette {{t:stakes|limite}} avec {{n:br.bi.base}} {{t:buy-in|buy-ins}} et vous en avez perdu {{n:dd.bi.small}}. Vous en avez maintenant {{n:br.ex.after-dd}}. Que faites-vous ?"
    options:
      - { text: "Vous restez à cette {{t:stakes|limite}} et vous revoyez vos décisions dans les mains perdues", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-ins}}, c'est encore plus que le seuil de descente le plus tardif, {{n:br.bi.move-down}}. Dans une simulation, un tel {{t:downswing}} touche environ {{n:dd.p.small.100k}} des joueurs qui gagnent {{n:var.wr.ex}} sur {{n:var.hands.k}} mille mains, et revoir les mains permet de vérifier s'il ne s'agit pas d'erreurs." }
      - { text: "Vous descendez de {{t:stakes|limite}} tout de suite", correct: true, why: "C'est aussi une bonne décision : certaines sources conseillent de descendre dès la perte de {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Descendre avant la moitié de la bankroll n'est pas une erreur, descendre plus tard en est une." }
      - { text: "Vous remettez des {{t:buy-in|buy-ins}} de l'extérieur pour revenir à {{n:br.bi.base}}", why: "Renflouer après chaque {{t:downswing}} vide de son sens la bankroll en tant que plafond de risque. Vous fixez le seuil à l'avance et vous vous y tenez." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Vous avez {{n:br.bi.base}} {{t:buy-in|buy-ins}} de votre {{t:stakes|limite}} actuelle, soit la bankroll que vous vous êtes fixée. La {{t:stakes|limite}} supérieure a un {{t:buy-in}} deux fois plus élevé. Montez-vous ?"
    options:
      - { text: "Non, à la {{t:stakes|limite}} supérieure, ce n'est que la moitié de la bankroll prévue", correct: true, why: "Vous comptez votre bankroll en {{t:buy-in|buy-ins}} de la {{t:stakes|limite}} à laquelle vous voulez passer. Vos {{n:br.bi.base}} {{t:buy-in|buy-ins}} y représentent {{n:br.bi.move-down}}, soit exactement le seuil de descente." }
      - { text: "Oui, car tout va bien pour vous", why: "Un bon mois, c'est surtout de la {{t:variance}} (leçon sur la {{t:variance}}). Monter dépend de votre bankroll à la nouvelle {{t:stakes|limite}}." }
      - { text: "Oui, car vous avez déjà {{n:br.bi.base}} {{t:buy-in|buy-ins}}", why: "{{n:br.bi.base}} {{t:buy-in|buy-ins}} de la {{t:stakes|limite}} actuelle ne représentent que {{n:br.bi.move-down}} à une {{t:stakes|limite}} deux fois plus élevée." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Un joueur perd en moyenne à sa {{t:stakes|limite}}, mais il a une bankroll énorme. Qu'est-ce que cela lui apporte ?"
    options:
      - { text: "Cela ne fait que retarder la perte", correct: true, why: "Avec un winrate négatif, les résultats baissent en moyenne, donc tôt ou tard il perdra sa bankroll, quelle que soit sa taille. La bankroll protège contre la {{t:variance}}, pas contre le mauvais jeu." }
      - { text: "Elle le protège de la ruine", why: "La formule du risque ne fonctionne qu'avec un winrate positif. Un joueur perdant perd sa bankroll à coup sûr, simplement plus lentement avec une bankroll plus grande." }
      - { text: "Elle lui permet de jouer à des {{t:stakes|limites}} plus élevées", why: "Une {{t:stakes|limite}} plus élevée avec un winrate négatif ne fait qu'accélérer la perte." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Vous débutez. Comment répartissez-vous votre temps entre l'étude et le jeu ?"
    options:
      - { text: "Environ {{n:study.beginner}} d'étude", correct: true, why: "Au début, vous avez le plus à rattraper, donc l'étude prédomine." }
      - { text: "Environ {{n:study.min}} d'étude", why: "C'est le plancher pour un joueur déjà gagnant. Au début, l'étude devrait prédominer." }
      - { text: "Uniquement le jeu, l'apprentissage viendra avec l'expérience", why: "Le résultat d'une partie est un mauvais retour d'information (leçon sur la décision et le résultat). Étudier avec des explications et analyser des mains permet d'apprendre plus vite." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Vous êtes déjà gagnant à votre {{t:stakes|limite}}. Comment répartissez-vous votre temps ?"
    options:
      - { text: "À peu près moitié-moitié, mais jamais moins de {{n:study.min}} d'étude", correct: true, why: "Même quand vous gagnez, l'idéal est d'environ {{n:study.winner}} d'étude, et le minimum est de {{n:study.min}}." }
      - { text: "Uniquement le jeu, puisque vous gagnez", why: "Même quand vous gagnez, vous ne descendez pas sous {{n:study.min}} de votre temps consacré à l'étude." }
      - { text: "Environ {{n:study.beginner}} d'étude, comme au début", why: "C'est possible si vous vous préparez à des {{t:stakes|limites}} plus élevées. Si vous gagnez simplement à la vôtre, environ {{n:study.winner}} suffit." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Quel signe indique que le jeu pourrait échapper à votre contrôle ?"
    options:
      - { text: "Après une perte, vous retournez jouer pour récupérer vos pertes", correct: true, why: "Chercher à récupérer ses pertes est l'un des signes d'un problème avec les jeux d'argent cités dans les critères diagnostiques. Si vous reconnaissez de tels signes chez vous, utilisez les contacts de l'encadré « Jeu responsable »." }
      - { text: "Vous analysez les mains perdues après une {{t:session}}", why: "C'est une saine habitude d'apprentissage. Parmi les signes d'un problème : chercher à récupérer ses pertes, jouer plus longtemps que prévu et jouer avec de l'argent emprunté." }
      - { text: "Vous terminez la {{t:session}} comme prévu", why: "C'est un bon contrôle du jeu. Un signe de problème serait de jouer plus longtemps que prévu ou d'éprouver le besoin de vous refaire." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
La bankroll est la totalité de la réserve destinée exclusivement au poker. Dans cette leçon, vous la comptez en **{{t:buy-in|buy-ins}}**, et non en argent : un {{t:buy-in}} correspond à un stack complet de {{n:format.stack}} à la {{t:stakes|limite}} à laquelle vous jouez.

## {{t:risk-of-ruin|Risque de ruine}}

C'est la probabilité de perdre un jour toute votre bankroll si vous continuez à jouer à la même {{t:stakes|limite}} :

```formula
RoR = e^(−2 × winrate × bankroll ÷ SD²)
```

La formule est une approximation qui suppose un winrate et un SD constants. Le winrate et le SD s'expriment en bb/100, la bankroll en bb. Avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} :

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|buy-ins}} | {{n:br.bi.base}} {{t:buy-in|buy-ins}} | {{n:br.bi.beginner}} {{t:buy-in|buy-ins}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## Ce dont dépend le risque

Le winrate et la bankroll figurent côte à côte dans la formule : un winrate deux fois plus faible exige une bankroll deux fois plus grande pour le même risque. C'est pourquoi le même nombre de {{t:buy-in|buy-ins}} donne à un joueur un risque plusieurs fois plus faible qu'à un autre. Au début, votre winrate est inconnu, et il faut un très grand nombre de mains pour l'estimer (leçon sur la {{t:variance}}). Avec un winrate négatif, aucune bankroll ne vous aidera, car elle protège contre la {{t:variance}}, pas contre le mauvais jeu.

## Quand descendre de {{t:stakes|limite}}

Fixez le seuil à l'avance : vous descendez d'une {{t:stakes|limite}} au plus tard lorsque votre bankroll tombe à la **moitié** du nombre de {{t:buy-in|buy-ins}} prévu, par ex. de {{n:br.bi.base}} à {{n:br.bi.move-down}}. Les sources donnent des seuils allant de la moitié à la totalité de la bankroll ; la moitié est le plus tardif d'entre eux. À une {{t:stakes|limite}} deux fois plus basse, la même bankroll représente de nouveau presque le nombre complet de {{t:buy-in|buy-ins}} de cette limite. Vous remontez au plus tôt lorsque vous avez une bankroll complète en {{t:buy-in|buy-ins}} de la {{t:stakes|limite}} supérieure. Certaines sources conseillent de descendre plus tôt, dès la perte de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} : descendre avant le seuil de la moitié n'est pas une erreur.

## Étude et jeu

Au début, vous consacrez environ {{n:study.beginner}} de votre temps à l'étude et le reste au jeu. Quand vous gagnez à votre {{t:stakes|limite}}, l'idéal est d'environ {{n:study.winner}}, mais jamais moins de {{n:study.min}} d'étude.

:::note Jeu responsable
Quelques signes que le jeu échappe à votre contrôle : vous jouez plus longtemps que prévu ; après une perte, vous revenez pour récupérer vos pertes ; vous jouez avec de l'argent que vous ne pouvez pas vous permettre de perdre, ou vous empruntez pour jouer ; vous jouez pour fuir vos soucis ; vous cachez votre jeu à vos proches.

Où trouver de l'aide :

{{helplines}}
:::
