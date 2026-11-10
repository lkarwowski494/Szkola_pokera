---
id: m9.l1
module: m9
order: 1
title: "SPR : rapport stack/pot"
sub: "Combien d'argent reste derrière le pot"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Vous avez ouvert}} depuis le Button à {{n:pf.open-size}}, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}, stacks de {{n:format.stack}}. Au flop, le {{t:pot}} contient {{n:bb.pot-after.vs-btn}}, et il vous reste {{n:spr.srp.stack}} derrière. Quel est le {{t:spr}} ?"
    table: { position: BTN }
    options:
      - { text: "Environ {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. Le stack derrière le {{t:pot}} est plus de dix fois plus grand que le {{t:pot}} : c'est un {{t:spr}} typique après une {{t:open|ouverture}} {{t:call|suivie}}." }
      - { text: "Environ {{n:spr.srp.wrong-full}}", why: "C'est ce que donne le stack complet de {{n:format.stack}}. Vos {{n:pf.open-size}} sont déjà dans le {{t:pot}}, vous ne comptez donc que ce qui reste : {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Environ {{n:spr.3bet-ip}}", why: "C'est le {{t:spr}} après un 3-bet {{t:call|suivi}}. Dans un {{t:pot}} à une seule relance, le {{t:pot}} est bien plus petit, donc le {{t:spr}} est d'environ {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Le {{t:cutoff|CO}} a {{t:open|ouvert}} à {{n:pf.open-size}}, vous avez {{t:raise|relancé}} (3-bet) depuis le Button à {{n:pf.3bet.ip-total}}, le {{t:cutoff|CO}} a {{t:call|suivi}}, les blindes {{t:fold|se sont couchées}}. Au flop, le {{t:pot}} contient {{n:vs3bet.pot-after}}, et il vous reste {{n:spr.3bet-ip.stack}} derrière. Quel est le {{t:spr}} ?"
    table: { position: BTN }
    options:
      - { text: "Environ {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Après un 3-bet, le {{t:pot}} est trois fois plus grand qu'après une {{t:open|ouverture}} normale, donc le {{t:spr}} passe d'environ {{n:spr.srp}} à environ {{n:spr.3bet-ip}}." }
      - { text: "Environ {{n:spr.3bet-ip.wrong-full}}", why: "C'est ce que donne le stack complet de {{n:format.stack}}. Votre 3-bet à {{n:pf.3bet.ip-total}} est déjà dans le {{t:pot}}, vous ne divisez donc que ce qui reste : {{n:spr.3bet-ip.stack}}." }
      - { text: "Environ {{n:spr.srp}}", why: "C'est le {{t:spr}} dans un {{t:pot}} à une seule relance. Après un 3-bet, le {{t:pot}} est bien plus grand et le stack derrière lui plus petit, donc le {{t:spr}} descend à environ {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Le Button a {{t:open|ouvert}}, vous avez {{t:raise|relancé}} (3-bet) depuis la {{t:big-blind|grosse blinde}} à {{n:pf.3bet.oop-total}}, le Button a {{t:call|suivi}}. Au flop, le {{t:pot}} contient {{n:spr.3bet-oop.pot}}, il vous reste {{n:spr.3bet-oop.stack}} derrière. Quel est le {{t:spr}} ?"
    table: { position: BB }
    options:
      - { text: "Environ {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Hors de position}}, le 3-bet est plus gros, donc le {{t:pot}} grossit davantage et le {{t:spr}} est plus bas qu'après un 3-bet {{t:in-position|en position}} ({{n:spr.3bet-ip}})." }
      - { text: "Environ {{n:spr.3bet-ip}}", why: "C'est le {{t:spr}} après un 3-bet {{t:in-position|en position}} à {{n:pf.3bet.ip-total}}. Votre 3-bet à {{n:pf.3bet.oop-total}} crée un {{t:pot}} plus gros, donc le {{t:spr}} est plus bas : environ {{n:spr.3bet-oop}}." }
      - { text: "Environ {{n:spr.4bet}}", why: "Seul un 4-bet donne un {{t:spr}} aussi bas. Après un 3-bet à {{n:pf.3bet.oop-total}}, on obtient environ {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacks de {{n:format.stack}}. Dans quel {{t:pot}} le {{t:spr}} au flop est-il le plus bas ?"
    options:
      - { text: "Dans un {{t:pot}} après un 4-bet {{t:call|suivi}}", correct: true, why: "Oui : quand le Button 4-bette à {{n:pf.4bet.example.low}} sur le 3-bet de la {{t:small-blind|petite blinde}}, que la {{t:small-blind|petite blinde}} {{t:call|suit}} et que la {{t:big-blind|grosse blinde}} {{t:fold|s'est couchée}}, le {{t:pot}} contient {{n:spr.4bet.pot}}, avec seulement {{n:spr.4bet.stack}} derrière. Le {{t:spr}} est d'environ {{n:spr.4bet}}." }
      - { text: "Dans un {{t:pot}} après un 3-bet {{t:call|suivi}}", why: "Après un 3-bet, le {{t:spr}} est d'environ {{n:spr.3bet-ip}} {{t:in-position|en position}} et d'environ {{n:spr.3bet-oop}} {{t:out-of-position|hors de position}}. Un 4-bet le fait baisser encore plus : à environ {{n:spr.4bet}}." }
      - { text: "Dans un {{t:pot}} à une seule relance", why: "C'est l'inverse : ici, le {{t:spr}} est le plus élevé, environ {{n:spr.srp}}, car le {{t:pot}} au flop est petit." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Pourquoi, après un 3-bet, le {{t:spr}} au flop est-il bien plus bas qu'après une {{t:open|ouverture}} normale ?"
    options:
      - { text: "Le {{t:pot}} est multiplié plusieurs fois, alors que le stack derrière lui diminue peu", correct: true, why: "Oui : le {{t:pot}} passe de {{n:bb.pot-after.vs-btn}} à {{n:vs3bet.pot-after}}, alors que le stack derrière lui ne descend que de {{n:spr.srp.stack}} à {{n:spr.3bet-ip.stack}}. Le rapport passe d'environ {{n:spr.srp}} à environ {{n:spr.3bet-ip}}." }
      - { text: "Parce qu'après un 3-bet, les joueurs ont des stacks plus petits", why: "À peine plus petits : {{n:spr.3bet-ip.stack}} au lieu de {{n:spr.srp.stack}}. Ce qui fait baisser le {{t:spr}}, c'est que le {{t:pot}} est trois fois plus grand." }
      - { text: "Parce que le 3-bet donne la {{t:position}}", why: "La {{t:position}} dépend de la place à la table, pas du 3-bet. Le {{t:spr}} n'est que le stack derrière le {{t:pot}} divisé par le {{t:pot}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Vous avez ouvert}} depuis le Button à {{n:pf.open-size}}, vous avez {{n:format.stack}}. La {{t:big-blind|grosse blinde}} n'a que {{n:spr.short.stack}} et {{t:call|suit}}. {{t:pot|Pot}} au flop : {{n:bb.pot-after.vs-btn}}. Quel est le {{t:spr}} ?"
    table: { position: BTN }
    options:
      - { text: "Environ {{n:spr.short}}", correct: true, why: "Vous calculez à partir du {{t:effective-stack|stack effectif}}, c'est-à-dire le plus petit des deux : il reste {{n:spr.short.behind}} à l'adversaire, donc {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Au-delà de ce qui est déjà dans le {{t:pot}}, chacun de vous peut encore mettre au maximum {{n:spr.short.behind}}." }
      - { text: "Environ {{n:spr.srp}}", why: "Ce serait le cas si l'adversaire avait lui aussi {{n:format.stack}}. Vous ne pouvez jouer que pour le plus petit stack, donc le {{t:spr}} est d'environ {{n:spr.short}}." }
      - { text: "Impossible à calculer, car les stacks sont différents", why: "C'est possible : vous prenez le plus petit stack (l'effectif). Il reste {{n:spr.short.behind}} à l'adversaire, donc le {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Quand calculez-vous le {{t:spr}} qui vous indique comment jouer le coup après le flop ?"
    options:
      - { text: "Au flop, avant que quelqu'un ne fasse une {{t:bet|mise}}", correct: true, why: "Oui : on peut calculer le {{t:spr}} sur chaque {{t:street}} (dans le M7, vous l'avez calculé au turn), mais pour le plan du coup, vous prenez le stack derrière le {{t:pot}} divisé par le {{t:pot}} au début du flop. Vous savez alors combien de {{t:pot|pots}} il reste à jouer sur trois {{t:street|streets}}." }
      - { text: "Avant le coup, avant que quelqu'un ne {{t:raise|relance}}", why: "Avant le flop, vous ne savez pas encore quelle taille aura le {{t:pot}}. Le {{t:spr}} dépend justement de ce qui s'est passé avant le flop : environ {{n:spr.srp}} après une {{t:open|ouverture}}, environ {{n:spr.3bet-ip}} après un 3-bet." }
      - { text: "À la river, avant la dernière {{t:bet|mise}}", why: "À la river, il ne reste qu'une décision. On peut y calculer le {{t:spr}} aussi, mais pour le plan du coup, le {{t:spr}} du flop est le plus utile, car il couvre les trois {{t:street|streets}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "Vous avez {{t:raise|relancé}} depuis le Button (3-bet), le {{t:cutoff|CO}} a {{t:call|suivi}}. Le {{t:spr}} au flop est d'environ {{n:spr.3bet-ip}}. Vous avez touché {{t:top-pair|top paire}} avec un bon kicker. Comment traitez-vous cette main ?"
    table: { position: BTN }
    options:
      - { text: "Comme une main limite : vous la jouez pour la {{t:value|valeur}}, mais vous ne {{t:call|suivez}} pas toujours l'all-in de l'adversaire", correct: true, why: "Un {{t:spr}} d'environ {{n:spr.3bet-ip}} se situe dans la zone de {{n:spr.zone.low}} à {{n:spr.zone.mid}}, où la {{t:top-pair|top paire}} est une main limite. La décision de jouer tout le stack dépend du jeu de l'adversaire et de l'aspect du {{t:board}}." }
      - { text: "Vous jouez toujours pour tout le stack", why: "C'est généralement le cas seulement avec un {{t:spr}} inférieur à environ {{n:spr.zone.low}}, p. ex. après un 4-bet (environ {{n:spr.4bet}}). Avec un {{t:spr}} d'environ {{n:spr.3bet-ip}}, il faut plus de {{t:bet|mises}} pour arriver à l'all-in, et ce sont surtout des mains plus fortes qui paient jusqu'au bout." }
      - { text: "Vous jouez prudemment, comme avec un {{t:spr}} très élevé", why: "Vous jouez la {{t:top-pair|top paire}} aussi prudemment au-delà d'environ {{n:spr.zone.deep}}, p. ex. dans un {{t:pot}} à une seule relance (environ {{n:spr.srp}}). Après un 3-bet, le {{t:spr}} est bien plus bas." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. Le {{t:pot}} contient {{n:ex.pot}}, l'adversaire fait all-in pour {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). De combien d'équité avez-vous besoin pour {{t:call|suivre}} ? Saisissez le nombre en pourcentage."
    answer: eq.jam.spr2
    explanation: "Vous ajoutez {{n:commit.stack}}, et une fois que vous avez {{t:call|suivi}}, le {{t:pot}} s'élève à {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Équité nécessaire = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Au flop, l'adversaire fait all-in pour tout son stack ({{n:format.stack}} au début du coup). Dans quel {{t:pot}} vous faut-il le moins d'équité pour {{t:call|suivre}} ?"
    options:
      - { text: "Après un 4-bet : environ {{n:eq.jam.4bet}}", correct: true, why: "Avec un {{t:spr}} d'environ {{n:spr.4bet}}, vous ajoutez {{n:spr.4bet.stack}} pour gagner le {{t:pot}} de {{n:spr.4bet.pot}} et le stack de l'adversaire. Plus le {{t:spr}} est bas, meilleur est le prix." }
      - { text: "Après un 3-bet : environ {{n:eq.jam.3bet-ip}}", why: "Après un 3-bet {{t:in-position|en position}}, il vous faut environ {{n:eq.jam.3bet-ip}}. Après un 4-bet, le {{t:pot}} est plus gros par rapport au stack, donc environ {{n:eq.jam.4bet}} suffit." }
      - { text: "Après une {{t:open|ouverture}} {{t:call|suivie}} : environ {{n:eq.jam.srp}}", why: "C'est le pire prix des trois : avec un {{t:spr}} d'environ {{n:spr.srp}}, vous ajoutez {{n:spr.srp.stack}} pour gagner le petit {{t:pot}} de {{n:bb.pot-after.vs-btn}} et le stack de l'adversaire." }
---
Avant le flop, vous décidez combien d'argent ira dans le {{t:pot}}. Après le flop, ce qui compte, c'est combien il en reste derrière. Un seul nombre relie les deux : le {{t:spr}}.

## Qu'est-ce que le {{t:spr}}

Le {{t:spr}} (angl. stack-to-pot ratio) est le rapport entre le stack et le {{t:pot}} au début d'une {{t:street}}. Vous pouvez le calculer sur chaque {{t:street}} (dans le M7, vous l'avez calculé au turn), mais pour le plan du coup, vous prenez le {{t:spr}} du flop, avant que quelqu'un ne fasse une {{t:bet|mise}}.

```formula
SPR = stack effectif ÷ pot au flop
```

Le {{t:effective-stack|stack effectif}} est le plus petit des deux stacks, sans compter ce qui est déjà dans le {{t:pot}}. C'est le maximum que chaque joueur peut encore ajouter au {{t:pot}} : au-delà du {{t:pot}}, vous ne pouvez pas gagner plus que le {{t:effective-stack|stack effectif}} à l'adversaire, et c'est le maximum que vous pouvez encore perdre.

Exemple : {{t:open|vous avez ouvert}} depuis le Button à {{n:pf.open-size}}, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Le {{t:pot}} au flop est de {{n:bb.pot-after.vs-btn}}, il vous reste {{n:spr.srp.stack}} derrière. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## Le préflop fixe le {{t:spr}}

Chaque {{t:raise|relance}} avant le flop multiplie le {{t:pot}} plusieurs fois, alors que le stack derrière lui diminue bien plus lentement. C'est pourquoi le {{t:spr}} dépend fortement de ce qui s'est passé avant le flop.

| {{t:pot|Pot}} (stacks de {{n:format.stack}}) | {{t:pot|Pot}} au flop | Stack derrière le {{t:pot}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Ouverture}} {{t:call|suivie}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position|en position}} {{t:call|suivi}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet depuis la {{t:big-blind|grosse blinde}} {{t:call|suivi}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-bet du Button sur le 3-bet de la {{t:small-blind|petite blinde}}, {{t:call|suivi}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Zones de {{t:spr}}

Vous déterminez les zones de {{t:spr}} à partir du {{t:spr}} au flop. Plus le {{t:spr}} est élevé, plus la main doit être forte pour jouer tout le stack :

| {{t:spr}} | Avec quoi vous jouez généralement tout le stack |
|---|---|
| inférieur à {{n:spr.zone.low}} | {{t:top-pair|top paire}} et mieux |
| de {{n:spr.zone.low}} à {{n:spr.zone.mid}} | la {{t:top-pair|top paire}} est une main limite |
| de {{n:spr.zone.mid}} à {{n:spr.zone.deep}} | {{t:two-pair|double paire}} haute et mieux |
| supérieur à {{n:spr.zone.deep}} | set, {{t:straight|quinte}} et mieux |

Après une {{t:open|ouverture}} {{t:call|suivie}} ({{t:spr}} d'environ {{n:spr.srp}}), vous êtes dans la zone la plus haute ; après un 3-bet (environ {{n:spr.3bet-ip}}), dans la zone où la {{t:top-pair|top paire}} est limite ; et après un 4-bet (environ {{n:spr.4bet}}), dans la plus basse. Les seuils sont une simplification. Les sources découpent les zones différemment, mais s'accordent pour dire qu'en dessous d'environ {{n:spr.zone.low}}, la {{t:top-pair|top paire}} joue pour le stack, et qu'avec un {{t:spr}} plus élevé, une seule {{t:pair|paire}} le fait de plus en plus rarement. La limite de {{n:spr.zone.mid}} est une convention adoptée dans l'application. Le seuil de {{n:spr.zone.deep}} découle du calcul : avec un {{t:spr}} de {{n:spr.zone.deep}}, trois {{t:bet|mises}} de la taille du {{t:pot}} mènent à l'all-in.

## {{t:spr}} bas : meilleur prix sur un all-in

Quand l'adversaire fait all-in pour tout son stack, vous ajoutez votre stack pour gagner le {{t:pot}} et son stack. Équité nécessaire = stack ÷ ({{t:pot}} + 2·stack). Avec un {{t:spr}} de {{n:spr.commit}}, cela donne {{n:eq.jam.spr2}} ; après un 4-bet, environ {{n:eq.jam.4bet}} ; après un 3-bet, environ {{n:eq.jam.3bet-ip}} ; et dans un {{t:pot}} à une seule relance, déjà environ {{n:eq.jam.srp}}.

Plus le {{t:spr}} est bas, moins il reste d'argent à jouer et plus il est facile de mettre tout son stack. Plus il est élevé, plus il reste de {{t:street|streets}} et de {{t:bet|mises}} avant que le stack n'arrive dans le {{t:pot}}.

:::note D'où viennent ces chiffres
Les {{t:pot|pots}} et les stacks viennent des tailles du module sur le jeu avant le flop ({{t:open|ouverture}} {{n:pf.open-size}}, 3-bet à {{n:pf.3bet.ip-total}} ou {{n:pf.3bet.oop-total}}, 4-bet à {{n:pf.4bet.example.low}}). Le {{t:pot}} après 4-bet est un scénario : le Button 4-bette le 3-bet de la {{t:small-blind|petite blinde}}, la {{t:small-blind|petite blinde}} {{t:call|suit}}, et la {{t:big-blind|grosse blinde}} {{t:fold|s'est couchée}}, sa blinde restant dans le {{t:pot}}. Une autre taille donne un {{t:spr}} un peu différent, mais l'ordre est toujours le même : plus il y a de {{t:raise|relances}} avant le flop, plus le {{t:spr}} est bas.
:::
