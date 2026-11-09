---
id: m10.l1
module: m10
order: 1
title: "Statistiques du HUD"
sub: "Ce que mesurent le VPIP et le PFR, et combien de mains il faut"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Vous êtes à la {{t:big-blind|grosse blinde}}. Deux joueurs limpent, vous {{t:check|checkez}} et voyez le flop. Cette main augmente-t-elle votre {{t:vpip}} ?"
    options:
      - { text: "Non : vous n'avez mis volontairement aucun {{t:chips|jeton}}", correct: true, why: "Le {{t:vpip}} ne compte que les mises volontaires avant le flop : {{t:call|suivre}} ou {{t:raise|relancer}}. La {{t:big-blind|grosse blinde}} est une mise obligatoire, et {{t:check|checker}} ne coûte rien." }
      - { text: "Oui : vous jouez le flop, donc la main compte comme jouée", why: "Voir le flop ne suffit pas. Le {{t:vpip}} n'augmente que lorsque vous mettez vous-même des {{t:chips|jetons}} avant le flop." }
      - { text: "Oui, et elle augmente aussi le {{t:pfr}}", why: "Le {{t:pfr}} n'augmente qu'en cas de {{t:raise|relance}} avant le flop. Ici, personne n'a {{t:raise|relancé}}, et vous avez seulement {{t:check|checké}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Un ami vous montre une note : un adversaire a un {{t:vpip}} de {{n:hud.ex.wrong.vpip}} et un {{t:pfr}} de {{n:hud.ex.wrong.pfr}}. Qu'en pensez-vous ?"
    options:
      - { text: "C'est impossible : le {{t:pfr}} ne peut pas être supérieur au {{t:vpip}}", correct: true, why: "Toute {{t:raise|relance}} avant le flop est aussi une mise volontaire, elle compte donc dans les deux statistiques. Le {{t:pfr}} est toujours au plus égal au {{t:vpip}} ; votre ami a confondu les chiffres." }
      - { text: "C'est un joueur très agressif qui ne {{t:call|suit}} presque jamais", why: "Un joueur qui ne {{t:call|suit}} jamais a un {{t:pfr}} égal à son {{t:vpip}}, mais pas supérieur. Un {{t:pfr}} supérieur signale une erreur de saisie." }
      - { text: "C'est un joueur passif", why: "La passivité se voit quand le {{t:pfr}} est bien inférieur au {{t:vpip}}, pas supérieur." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Un adversaire a un {{t:vpip}} de {{n:mda.rec.vpip}} et un {{t:pfr}} de {{n:mda.rec.pfr}}. Que fait-il des mains qu'il joue sans les {{t:raise|relancer}} ?"
    options:
      - { text: "Il {{t:call|suit}} ou limpe : c'est l'écart de {{n:mda.rec.gap}} des mains", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Ces mains, il les met dans le {{t:pot}} sans {{t:raise|relance}} : il limpe ou {{t:call|suit}} les {{t:open|ouvertures}} des autres." }
      - { text: "Il se {{t:fold|couche}} avant le flop", why: "Les mains couchées avant le flop ne comptent pas du tout dans le {{t:vpip}}. L'écart {{t:vpip}} − {{t:pfr}}, ce sont les mains jouées sans {{t:raise|relance}}." }
      - { text: "Il les joue {{t:all-in|à tapis}}", why: "Un tapis avant le flop est aussi une {{t:raise|relance}}, il augmenterait donc le {{t:pfr}}. L'écart correspond aux mains seulement {{t:call|suivies}} ou limpées." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Après {{n:hud.se.ex.n}} mains, un adversaire a un {{t:vpip}} de {{n:hud.se.ex.p}}. Quelle est l'erreur type de ce chiffre, en points de pourcentage ? Saisissez un nombre."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Avec une confiance d'environ {{n:var.conf95}}, le vrai {{t:vpip}} se situe dans une marge de ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Après {{n:hud.se.ex.n}} mains, le {{t:vpip}} d'un adversaire est de {{n:hud.se.ex.p}}. Que savez-vous de son vrai {{t:vpip}} ?"
    options:
      - { text: "Avec une confiance d'environ {{n:var.conf95}}, il se situe entre {{n:hud.ci.ex.low}} et {{n:hud.ci.ex.high}}", correct: true, why: "L'erreur type est d'environ {{n:hud.se.ex}}, et l'intervalle à {{n:var.conf95}} vaut ± {{n:var.z95}} erreurs types, soit ± {{n:hud.ci.ex}}. Vous savez que l'adversaire n'est pas extrême, mais vous ne pouvez pas encore distinguer des profils séparés de quelques points." }
      - { text: "Il vaut exactement {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} mains, c'est encore un petit échantillon : l'erreur est d'environ {{n:hud.se.ex}}, et l'intervalle à {{n:var.conf95}} vaut ± {{n:hud.ci.ex}}." }
      - { text: "Rien : avant mille mains, les statistiques ne veulent rien dire", why: "C'est exagéré. Un intervalle de {{n:hud.ci.ex.low}} à {{n:hud.ci.ex.high}} exclut déjà un joueur très serré comme un joueur très large. Il ne manque que la précision." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Après quelques centaines de mains, un adversaire a eu {{n:hud.se.f3b.n}} fois l'occasion de répondre à un 3-bet et s'est {{t:fold|couché}} dans {{n:hud.se.f3b.p}} des cas. Que savez-vous de son fold to 3-bet ?"
    options:
      - { text: "Presque rien : avec une confiance d'environ {{n:var.conf95}}, il se situe entre {{n:hud.ci.f3b.low}} et {{n:hud.ci.f3b.high}}", correct: true, why: "Ce sont les occasions qui comptent, pas les mains. L'erreur vaut √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, et l'intervalle à {{n:var.conf95}} vaut ± {{n:hud.ci.f3b}}. Cet intervalle englobe aussi bien un joueur qui défend presque toujours qu'un joueur qui se {{t:fold|couche}} presque toujours." }
      - { text: "Il se {{t:fold|couche}} exactement dans {{n:hud.se.f3b.p}} des cas, car l'échantillon compte quelques centaines de mains", why: "Quelques centaines de mains ne représentent que {{n:hud.se.f3b.n}} occasions pour cette statistique. L'erreur se calcule sur les occasions : elle est d'environ {{n:hud.se.f3b}}." }
      - { text: "Il se {{t:fold|couche}} trop souvent, car au-dessus de {{n:hud.f3b.low}}, c'est une erreur", why: "{{n:hud.se.f3b.p}}, ce n'est pas « au-dessus de {{n:hud.f3b.low}} », et avec {{n:hud.se.f3b.n}} occasions l'erreur est d'environ {{n:hud.se.f3b}}. Un tel échantillon ne permet pas de conclure." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Nouvel adversaire, {{n:hud.ex.few.hands}} mains dans le {{t:hud}} : {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. Comment jouez-vous contre lui ?"
    options:
      - { text: "Comme contre un joueur inconnu, selon la stratégie de base ; je continue à collecter des mains", correct: true, why: "En dessous d'environ {{n:hud.hands.random}} mains, les statistiques sont aléatoires : quelques bonnes cartes d'affilée suffisent à produire un tel {{t:vpip}}. Le profil du joueur se dessine grossièrement après environ {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mains, et le {{t:vpip}} et le {{t:pfr}} se stabilisent après environ {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "Comme contre un {{t:maniac|maniaque}} : je {{t:call|suis}} large", why: "Un {{t:maniac|maniaque}}, c'est-à-dire un joueur très large et agressif, n'est qu'une possibilité : après {{n:hud.ex.few.hands}} mains, ce peut être n'importe quel profil. {{t:call|Suivre}} large sur la foi du hasard coûte cher quand l'adversaire se révèle être un simple {{t:regular|régulier}}, c'est-à-dire un habitué qui joue de façon plutôt solide." }
      - { text: "Comme contre un {{t:nit}}, car la plupart des joueurs sont des {{t:nit|nits}}", why: "Cela non plus, vous ne le savez pas : un {{t:nit}}, c'est-à-dire un joueur très serré, n'est qu'un profil parmi d'autres. Sans échantillon, pas de lecture, donc vous revenez à la stratégie de base." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Quelle statistique demande le plus de mains pour être fiable ?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "L'occasion de fold to 3-bet ne se présente que lorsque l'adversaire a {{t:open|ouvert}} et reçu un 3-bet, ce qui est rare. Il vous faut donc environ {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} mains au lieu de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "Le {{t:vpip}} a une occasion à chaque main, il se stabilise donc le plus vite : après environ {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mains." }
      - { text: "{{t:pfr}}", why: "Le {{t:pfr}}, comme le {{t:vpip}}, a une occasion à chaque main où le joueur peut {{t:raise|relancer}}, il se stabilise donc vite." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "Votre site interdit les logiciels de {{t:hud}} à la table. Que faites-vous ?"
    options:
      - { text: "Je joue sans {{t:hud}}, et après la {{t:session}} j'analyse ma base de mains et mes notes sur les adversaires réguliers", correct: true, why: "Le règlement du site est contraignant : un logiciel interdit peut entraîner la fermeture du compte. Vous pouvez consulter les statistiques de votre propre historique de mains après avoir joué, et certains sites affichent leurs propres statistiques à la table." }
      - { text: "J'utilise un {{t:hud}} malgré l'interdiction, car il donne un avantage", why: "En cas d'infraction au règlement, le site peut fermer le compte et retenir les fonds. L'avantage n'en vaut pas la peine." }
      - { text: "Je renonce à l'{{t:exploit|exploitation}}, car sans {{t:hud}} elle est impossible", why: "Elle est possible : les lectures tirées de l'analyse des mains après la {{t:session}} et les données sur la population de votre {{t:stakes|limite}} montrent aussi dans quelle direction s'écarter de la stratégie de base." }
---
L'{{t:exploit|exploitation}}, c'est s'écarter de la stratégie de base des modules 3 à 9 en direction de l'erreur de l'adversaire. Pour savoir dans quelle direction s'écarter, il vous faut des données. En ligne, c'est le {{t:hud}} qui les fournit : un logiciel qui enregistre les mains et affiche les statistiques de chaque adversaire à la table.

## {{t:vpip}} et {{t:pfr}}

Les deux chiffres les plus importants décrivent le jeu avant le flop :

- **{{t:vpip}}** : le pourcentage de mains dans lesquelles un joueur met volontairement des {{t:chips|jetons}} dans le {{t:pot}} avant le flop, c'est-à-dire {{t:call|suit}} ou {{t:raise|relance}}. Les blindes ne comptent pas, car elles sont obligatoires.
- **{{t:pfr}}** : le pourcentage de mains dans lesquelles un joueur {{t:raise|relance}} avant le flop : il {{t:open|ouvre}}, 3-bette ou 4-bette.

Toute {{t:raise|relance}} est aussi une mise volontaire, donc le {{t:pfr}} ne dépasse jamais le {{t:vpip}}. L'écart {{t:vpip}} − {{t:pfr}} correspond aux mains que le joueur a seulement {{t:call|suivies}} ou limpées. Un joueur avec un {{t:vpip}} de {{n:mda.rec.vpip}} et un {{t:pfr}} de {{n:mda.rec.pfr}} joue beaucoup de mains, mais dans {{n:mda.rec.gap}} de toutes ses mains, il entre dans le {{t:pot}} sans {{t:raise|relance}}.

## Autres statistiques

| Statistique | Ce qu'elle mesure | Occasion |
|---|---|---|
| 3-bet | à quelle fréquence il {{t:raise|relance}} l'{{t:open|ouverture}} d'un autre | quelqu'un a {{t:open|ouvert}} avant lui |
| Fold to 3-bet | à quelle fréquence il se {{t:fold|couche}} face à un 3-bet | il a {{t:open|ouvert}} et reçu un 3-bet |
| C-bet | à quelle fréquence il mise au flop après sa propre {{t:raise|relance}} | il était l'{{t:aggressor|agresseur}} avant le flop |
| Fold to c-bet | à quelle fréquence il se {{t:fold|couche}} face à un c-bet | il a reçu un c-bet |
| {{t:wtsd}} | à quelle fréquence il va jusqu'au showdown après le flop | il a vu le flop |

La dernière colonne est importante : une statistique ne change que lorsque l'adversaire en a l'occasion. Le {{t:vpip}} a une occasion à chaque main, le fold to 3-bet seulement lorsque l'adversaire a {{t:open|ouvert}} et reçu un 3-bet.

## Combien de mains il faut

Chaque main est un tirage aléatoire de la stratégie de l'adversaire, donc une statistique comporte une erreur, comme toute moyenne d'échantillon. Vous la calculez avec la formule de l'erreur d'une moyenne d'échantillon (au module 12, vous utiliserez la même formule pour calculer l'erreur de votre {{t:winrate}}) :

```formula
erreur = √(p × (1 − p) ÷ n)
intervalle à {{n:var.conf95}} = p ± {{n:var.z95}} × erreur
```

Ici, p est le pourcentage (par ex. le {{t:vpip}}) et n le nombre d'occasions. Après {{n:hud.se.ex.n}} mains avec un {{t:vpip}} de {{n:hud.se.ex.p}}, l'erreur est d'environ {{n:hud.se.ex}}, donc avec une confiance d'environ {{n:var.conf95}}, le vrai {{t:vpip}} se situe entre **{{n:hud.ci.ex.low}} et {{n:hud.ci.ex.high}}**. Un fold to 3-bet de {{n:hud.se.f3b.p}} sur {{n:hud.se.f3b.n}} occasions donne un intervalle de {{n:hud.ci.f3b.low}} à {{n:hud.ci.f3b.high}} : presque rien.

Les coachs donnent des seuils similaires :

- en dessous d'environ {{n:hud.hands.random}} mains, les statistiques sont aléatoires ; vous jouez comme contre un joueur inconnu ;
- le profil du joueur se dessine grossièrement après {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mains, et le {{t:vpip}} et le {{t:pfr}} se stabilisent après environ {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} ;
- le 3-bet demande environ {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} mains, le fold to 3-bet environ {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}, et les statistiques de turn et de river encore davantage.

:::note Quand le site interdit le {{t:hud}}
Certains sites (selon les supports de formation, y compris de grands sites aux petites {{t:stakes|limites}}) interdisent les logiciels de {{t:hud}} à la table. Dans ce cas, vous analysez votre propre historique de mains après la {{t:session}}, prenez des notes sur les adversaires réguliers et utilisez les données sur la population de votre {{t:stakes|limite}} (leçon 2). Les seuils d'échantillon proviennent de deux supports de formation qui donnent des nombres de mains différents. La formule de l'erreur, elle, relève du calcul.
:::
