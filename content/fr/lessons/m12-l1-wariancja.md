---
id: m12.l1
module: m12
order: 1
title: "La variance en chiffres"
sub: "Ce que dit un résultat sur des milliers de mains"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Vous gagnez en moyenne {{n:var.wr.ex}} et allez jouer {{n:var.hands.k}} mille mains. À combien de {{t:buy-in|buy-ins}} (de {{n:format.stack}} chacun) s'élève votre résultat attendu ? Saisissez un nombre."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} mille mains font {{n:var.blocks}} blocs de 100 mains. Résultat attendu = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, soit {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. C'est une moyenne : votre résultat réel peut en être très éloigné."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "L'{{t:standard-deviation|écart-type}} de votre jeu est de {{n:var.sd}}. Quel est l'{{t:standard-deviation|écart-type}} de votre résultat après {{n:var.hands.k}} mille mains ({{n:var.blocks}} blocs de 100 mains) ?"
    options:
      - { text: "Environ {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "L'{{t:standard-deviation|écart-type}} croît avec la racine carrée du nombre de blocs : {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, soit environ {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
      - { text: "Environ {{n:var.sd.wrong.bi}} {{t:buy-in|buy-ins}}", why: "C'est ce que vous obtenez en multipliant l'{{t:standard-deviation|écart-type}} par le nombre de blocs. Les fluctuations aléatoires se compensent en partie, donc vous multipliez par la racine carrée : {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Environ {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "C'est le résultat attendu à {{n:var.wr.ex}}, et non son {{t:standard-deviation|écart-type}}. L'{{t:standard-deviation|écart-type}} est d'environ {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Vous gagnez {{n:var.wr.ex}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}}. Dans quel intervalle se situera votre résultat après {{n:var.hands.k}} mille mains, avec une confiance d'environ {{n:var.conf95}} ?"
    options:
      - { text: "D'environ {{n:var.ci.low.bi}} à environ {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Résultat attendu {{n:var.exp.bi}} {{t:buy-in|buy-ins}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Même un joueur nettement gagnant peut être presque à zéro après {{n:var.hands.k}} mille mains." }
      - { text: "D'environ {{n:var.ci68.low.bi}} à environ {{n:var.ci68.high.bi}} {{t:buy-in|buy-ins}}", why: "C'est l'intervalle d'un seul {{t:standard-deviation|écart-type}} : il ne couvre qu'environ 2 résultats sur 3. Pour {{n:var.conf95}}, vous prenez {{n:var.z95}} {{t:standard-deviation|écarts-types}} : d'environ {{n:var.ci.low.bi}} à environ {{n:var.ci.high.bi}}." }
      - { text: "Exactement {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "Ce n'est que la moyenne. Le résultat oscille autour d'elle de plusieurs dizaines de {{t:buy-in|buy-ins}} dans les deux sens." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Après {{n:var.hands.k}} mille mains ({{n:var.blocks}} blocs de 100) avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} : quelle est l'erreur type de votre winrate en bb/100 ? Prenez √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Saisissez un nombre."
    answer: var.se.wr
    explanation: "Erreur type = SD ÷ √(nombre de blocs) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. L'intervalle à {{n:var.conf95}} est de ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Après {{n:var.hands.k}} mille mains, votre résultat est de {{n:var.wr.ex}}, {{t:standard-deviation|écart-type}} {{n:var.sd}}. Que savez-vous de votre vrai winrate ?"
    options:
      - { text: "Avec une confiance d'environ {{n:var.conf95}}, il se situe entre environ {{n:var.wr.ci.low}} et environ {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Après {{n:var.hands.k}} mille mains, vous savez seulement que vous ne perdez probablement pas." }
      - { text: "Il est de {{n:var.wr.ex}}, car l'échantillon est grand", why: "{{n:var.hands.k}} mille mains, cela paraît beaucoup, mais avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}}, l'erreur est encore d'environ ± {{n:var.ci.wr}}." }
      - { text: "Rien, au poker le résultat relève du pur hasard", why: "C'est exagéré. L'échantillon resserre l'intervalle, mais lentement : l'erreur diminue avec la racine carrée du nombre de mains." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Vous voulez connaître votre winrate à ± {{n:var.target}} près avec une confiance de {{n:var.conf95}}. L'{{t:standard-deviation|écart-type}} est de {{n:var.sd}}. Combien de mains vous faut-il ?"
    options:
      - { text: "Environ {{n:var.need.hands.k}} mille", correct: true, why: "Blocs = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Cela fait environ {{n:var.need.hands.k}} mille mains." }
      - { text: "Environ {{n:var.hands.k}} mille", why: "Après {{n:var.hands.k}} mille mains, l'erreur est d'environ ± {{n:var.ci.wr}}. Pour la réduire à ± {{n:var.target}}, il vous faut environ {{n:var.need.hands.k}} mille mains." }
      - { text: "Environ {{n:var.need.blocks}} mains", why: "C'est le nombre de blocs de 100 mains. Il y a cent fois plus de mains : environ {{n:var.need.hands.k}} mille." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Un joueur gagne {{n:var.wr.ex}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}}. À quelle fréquence, sur {{n:var.hands.k}} mille mains, connaîtra-t-il un {{t:downswing}} d'au moins {{n:dd.bi.small}} {{t:buy-in|buy-ins}} depuis son point le plus haut ?"
    options:
      - { text: "Presque toujours, environ {{n:dd.p.small.100k}}", correct: true, why: "Une simulation de {{n:var.hands.k}} mille mains avec ces paramètres produit un tel {{t:downswing}} dans environ {{n:dd.p.small.100k}} des parcours. Un {{t:downswing|downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} est une composante normale du jeu d'un joueur gagnant." }
      - { text: "Dans environ {{n:dd.p.small.20k}} des cas", why: "C'est le chiffre pour un échantillon plus court, {{n:dd.hands.short.k}} mille mains. Sur {{n:var.hands.k}} mille mains, les occasions d'un {{t:downswing}} profond sont bien plus nombreuses : environ {{n:dd.p.small.100k}}." }
      - { text: "Rarement, environ {{n:var.p.lose}}", why: "C'est la fréquence, faible, à laquelle un joueur à {{n:var.wr.ex}} termine {{n:var.hands.k}} mille mains dans le rouge. Un {{t:downswing|downswing}} en cours de route, c'est autre chose : il arrive presque toujours." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Deux joueurs, {{t:standard-deviation|écart-type}} {{n:var.sd}}, {{n:var.hands.k}} mille mains. L'un gagne {{n:var.wr.ex}}, l'autre {{n:dd.wr-low}}. À quelle fréquence chacun d'eux subira-t-il un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} ?"
    options:
      - { text: "Le premier dans environ {{n:dd.p.big.100k}}, le second dans environ {{n:dd.p.big.100k.wr-low}} des cas", correct: true, why: "Un winrate plus faible tire moins fort le résultat vers le haut, donc les {{t:downswing|downswings}} sont plus profonds et plus fréquents. À {{n:dd.wr-low}}, typique des joueurs gagnants en micro-limites, un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} survient dans plus d'un échantillon sur deux." }
      - { text: "Aussi souvent l'un que l'autre, car l'{{t:standard-deviation|écart-type}} est le même", why: "L'{{t:standard-deviation|écart-type}} détermine les fluctuations, mais le winrate détermine la vitesse à laquelle le résultat s'en éloigne. À {{n:dd.wr-low}}, un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} survient dans environ {{n:dd.p.big.100k.wr-low}} des échantillons, à {{n:var.wr.ex}} dans environ {{n:dd.p.big.100k}}." }
      - { text: "Aucun des deux : un {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} n'arrive qu'aux joueurs perdants", why: "Faux. Même un joueur à {{n:var.wr.ex}} en subit un dans environ {{n:dd.p.big.100k}} des échantillons de {{n:var.hands.k}} mille mains." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Depuis un mois, vous êtes en perte de {{n:dd.bi.small}} {{t:buy-in|buy-ins}}. Qu'en conclure ?"
    options:
      - { text: "Le {{t:downswing}} seul ne prouve rien ; revoyez vos décisions dans les mains perdues", correct: true, why: "Un {{t:downswing|downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} sur {{n:var.hands.k}} mille mains touche presque tous les joueurs gagnant de {{n:dd.wr-low}} à {{n:var.wr.ex}} (simulation avec SD {{n:var.sd}}). C'est l'analyse de vos décisions qui dit si vous jouez bien, pas le résultat seul." }
      - { text: "Vous jouez mal et devez changer tout votre style de jeu", why: "Des {{t:downswing|downswings}} de cette ampleur arrivent aux joueurs gagnant {{n:var.wr.ex}} (SD {{n:var.sd}}) dans environ {{n:dd.p.small.100k}} des échantillons de {{n:var.hands.k}} mille mains. Changer de style à cause du seul résultat, c'est réagir au bruit." }
      - { text: "C'est forcément de la malchance, vous n'avez rien à revoir", why: "Un {{t:downswing|downswing}} peut aussi venir d'erreurs. Le résultat ne distingue pas la malchance d'une erreur, mais l'analyse des mains, si." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "Quel {{t:standard-deviation|écart-type}} est typique en cash game 6-max No-Limit Hold'em ?"
    options:
      - { text: "Environ {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "C'est ce qu'indiquent les calculateurs de {{t:variance|variance}}. La valeur typique la plus souvent retenue est d'environ {{n:var.sd}}. Un style agressif donne un {{t:standard-deviation|écart-type}} plus élevé." }
      - { text: "Environ {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "C'est le winrate typique des joueurs gagnants en micro-limites. L'{{t:standard-deviation|écart-type}} est plusieurs dizaines de fois plus grand que le winrate, c'est pourquoi les résultats varient autant." }
      - { text: "Environ {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}} par 100 mains", why: "C'est l'{{t:standard-deviation|écart-type}} du résultat après {{n:var.hands.k}} mille mains, et non par 100 mains." }
---
Votre résultat au poker est la somme de deux choses : la qualité de votre jeu et la chance. Les deux composantes se mesurent. Le winrate indique combien vous gagnez en moyenne, et l'{{t:standard-deviation|écart-type}}, à quel point le résultat fluctue autour de cette moyenne.

## Deux nombres en bb/100

Le **winrate** est le gain moyen pour 100 mains en {{t:big-blind|grosses blindes}}. Les joueurs gagnants en micro-limites ont généralement {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

**L'{{t:standard-deviation|écart-type}} (SD)** est la dispersion typique du résultat pour 100 mains. En cash game 6-max, il est généralement de {{n:var.sd.low}}–{{n:var.sd.high}}, et on retient {{n:var.sd}} comme valeur typique. L'{{t:standard-deviation|écart-type}} est plusieurs dizaines de fois plus grand que le winrate, donc le résultat d'une {{t:session|session}}, voire d'un mois, en dit très peu.

## Le résultat sur de nombreuses mains

Divisez le nombre de mains par 100 pour obtenir le nombre de blocs.

```formula
résultat attendu = winrate × nombre de blocs
écart-type du résultat = SD × √(nombre de blocs)
intervalle à {{n:var.conf95}} = résultat attendu ± {{n:var.z95}} × écart-type du résultat
```

Exemple : {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} mille mains, soit {{n:var.blocks}} blocs. Vous pouvez attendre {{n:var.exp.bb}}, soit {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. L'{{t:standard-deviation|écart-type}} du résultat est de {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, soit environ {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}. Avec une confiance de {{n:var.conf95}}, vous terminerez entre environ **{{n:var.ci.low.bi}} et {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}**. Le résultat attendu se situe environ {{n:var.z.lose}} {{t:standard-deviation|écarts-types}} au-dessus de zéro, donc la probabilité d'être dans le rouge après {{n:var.hands.k}} mille mains est d'environ {{n:var.p.lose}}.

## Combien de mains pour connaître votre winrate

Le même calcul fonctionne en sens inverse. L'erreur d'estimation du winrate diminue avec la racine carrée du nombre de mains :

```formula
erreur du winrate = SD ÷ √(nombre de blocs)
blocs nécessaires = ({{n:var.z95}} × SD ÷ précision)²
```

Après {{n:var.hands.k}} mille mains, l'erreur est d'environ {{n:var.se.wr}}, donc l'intervalle à {{n:var.conf95}} est de ± {{n:var.ci.wr}}. Un résultat de {{n:var.wr.ex}} signifie alors seulement que votre vrai winrate se situe quelque part entre environ {{n:var.wr.ci.low}} et {{n:var.wr.ci.high}}. Pour connaître votre winrate à ± {{n:var.target}} près, il vous faut environ **{{n:var.need.hands.k}} mille mains**.

## Les {{t:downswing|downswings}} sont normaux

Un {{t:downswing|downswing}} est une baisse du résultat depuis son point le plus haut. Simulation d'un joueur à {{n:var.wr.ex}} avec SD {{n:var.sd}} :

| {{t:downswing|Downswing}} depuis le sommet | Sur {{n:dd.hands.short.k}} mille mains | Sur {{n:var.hands.k}} mille mains | Sur {{n:var.hands.k}} mille mains à {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-ins}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-ins}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note D'où viennent ces chiffres
Résultats de simulation : des milliers de parcours de {{n:var.hands.k}} mille mains chacun, avec un résultat aléatoire pour chaque bloc. Les vrais {{t:downswing|downswings}} peuvent être un peu plus profonds, car le résultat change à chaque main, et non toutes les 100 mains. Conclusion : un {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} ne prouve pas que vous jouez mal.
:::

Ce sont des repères généraux, pas une garantie de résultat. Si le jeu échappe à votre contrôle, consultez l'écran « Aide ».
