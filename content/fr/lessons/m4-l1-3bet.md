---
id: m4.l1
module: m4
order: 1
title: "Quand quelqu'un a ouvert avant vous"
sub: "Se coucher, suivre ou 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "Le {{t:cutoff|CO}} a {{t:open|ouvert}} à {{n:pf.open-size}}. Vous voulez {{t:raise|relancer}} depuis le Button. À combien ?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "À {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|En position}}, vous {{t:raise|relancez}} à environ {{n:pf.3bet.size-ip}} l'{{t:open|ouverture}}. C'est le standard, et il laisse un bon rapport tapis/{{t:pot|pot}} au flop." }
      - { text: "À {{n:pf.3bet.too-small}}", why: "Trop petit : l'adversaire obtient un excellent prix pour {{t:call|suivre}} avec presque tout et continuer à jouer." }
      - { text: "À {{n:pf.3bet.too-big}}", why: "Trop gros pour jouer {{t:in-position|en position}} : vous risquez plus, et les meilleures mains de l'adversaire ne {{t:fold|se coucheront}} pas de toute façon." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "Le Button a {{t:open|ouvert}} à {{n:pf.open-size}}, la {{t:small-blind|petite blind}} {{t:fold|s'est couchée}}. Vous voulez {{t:raise|relancer}} depuis la {{t:big-blind|grosse blind}}. À combien ?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "À {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Hors de position}}, vous {{t:raise|relancez}} à environ {{n:pf.3bet.size-oop}} l'{{t:open|ouverture}}. Une taille plus grande prive le Button d'un {{t:call|call}} bon marché {{t:in-position|en position}}." }
      - { text: "À {{n:pf.3bet.ip-total}}", why: "C'est la taille pour un joueur {{t:in-position|en position}}. {{t:out-of-position|Hors de position}}, vous donnez à l'adversaire un trop bon prix." }
      - { text: "Je me contente de {{t:call|suivre}}", why: "Avec KK, vous voulez construire le {{t:pot|pot}} tout de suite : c'est la deuxième meilleure main préflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "Le Button a {{t:open|ouvert}} à {{n:pf.open-size}}. Vous êtes à la {{t:small-blind|petite blind}}. Quel plan est le standard ?"
    table: { position: SB }
    options:
      - { text: "Je {{t:raise|relance}} ou je {{t:fold|me couche}}", correct: true, why: "Après un {{t:call|call}}, vous jouez {{t:out-of-position|hors de position}}, et la {{t:big-blind|grosse blind}} est encore derrière vous. Depuis la {{t:small-blind|petite blind}} face aux {{t:open|ouvertures}} des positions tardives, les solveurs {{t:raise|relancent}} ou {{t:fold|se couchent}} presque toujours." }
      - { text: "Je {{t:call|suis}} large, car j'ai déjà une demi-blind dans le {{t:pot|pot}}", why: "Une demi-blind, c'est peu. Un {{t:call|call}} {{t:out-of-position|hors de position}} avec la {{t:big-blind|grosse blind}} derrière vous {{t:equity-realization|réalise mal l'equity}} : vous gagnez une plus petite part du {{t:pot|pot}} que ne l'indique l'equity de votre main, car vous {{t:fold|vous couchez}} souvent avant l'abattage." }
      - { text: "Je {{t:fold|me couche}} toujours", why: "Trop serré : le Button {{t:open|ouvre}} très large, donc il vaut la peine de {{t:raise|relancer}} avec les mains fortes et une partie des {{t:bluff|bluffs}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Vous êtes à la {{t:big-blind|grosse blind}} face à une {{t:open|ouverture}} du Button. Laquelle de ces mains est un 3-bet typique en {{t:bluff|bluff}} ?"
    table: { position: BB }
    options:
      - { text: "A5 assorti", correct: true, why: "Elle bloque les AA et AK de l'adversaire, et après un {{t:call|call}}, elle a des chances de toucher une {{t:flush|couleur}} ou une {{t:straight|quinte}}. C'est un {{t:bluff|bluff}} typique du bas de votre {{t:range|range}} de {{t:call|call}} : depuis la {{t:big-blind|grosse blind}}, vous faites un 3-bet avec vos mains les plus fortes plus de tels {{t:bluff|bluffs}}." }
      - { text: "K7 dépareillé", why: "Avec cette main, vous vous défendez en {{t:call|suivant}}. En 3-bet, elle ne bloque rien d'important et joue mal quand l'adversaire {{t:call|suit}}." }
      - { text: "{{t:pair|Paire}} 22", why: "Les plus petites {{t:pair|paires}} se défendent en {{t:call|suivant}} : elles rapportent quand elles touchent un set (un {{t:three-of-a-kind|brelan}} avec une {{t:pocket-pair|paire servie}}, c'est-à-dire une {{t:pair|paire}} formée de vos deux {{t:hole-cards|cartes privatives}}), et un 3-bet avec elles supporte mal un 4-bet." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
Quand quelqu'un avant vous a {{t:open|ouvert}}, vous avez trois possibilités : {{t:fold|vous coucher}}, {{t:call|suivre}} ou {{t:raise|relancer}} encore une fois. Cette nouvelle {{t:raise|relance}} s'appelle un 3-bet, car c'est la troisième {{t:bet|mise}} de la main (blind, {{t:open|ouverture}}, {{t:raise|relance}}).

## Taille du 3-bet

{{t:in-position|En position}}, vous {{t:raise|relancez}} à environ {{n:pf.3bet.size-ip}} l'{{t:open|ouverture}}, soit, face à une {{t:open|ouverture}} à {{n:pf.open-size}}, à {{n:pf.3bet.ip-total}}. {{t:out-of-position|Hors de position}}, par exemple depuis les blinds face à une {{t:open|ouverture}} du {{t:cutoff|CO}} ou du Button, à environ {{n:pf.3bet.size-oop}} l'{{t:open|ouverture}}, soit {{n:pf.3bet.oop-total}}. Une taille plus grande {{t:out-of-position|hors de position}} prive l'adversaire d'un {{t:call|call}} bon marché, avec lequel il jouerait ensuite avec l'avantage de la {{t:position|position}}.

## La {{t:position|position}} décide s'il faut {{t:call|suivre}}

Selon les solutions de solveurs publiées, le Button face à une {{t:open|ouverture}} du {{t:cutoff|CO}} fait généralement un 3-bet avec environ {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} des mains et ne {{t:call|suit}} qu'avec environ {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Face à une {{t:open|ouverture}} d'{{t:utg|UTG}} (dans cette solution, une ouverture minimale, à {{n:pf.open-size.solver-utg}}), il y a déjà un peu plus de {{t:call|calls}} que de 3-bets : environ {{n:pf.call-freq.btn-vs-utg}} contre {{n:pf.3bet-freq.btn-vs-utg}}. La {{t:range|range}} d'{{t:utg|UTG}} est forte, donc un 3-bet se heurte plus souvent à un 4-bet et remporte moins souvent le {{t:pot|pot}} immédiatement.

```range
vs-open.btn-vs-co
```

La grille montre seulement quelles mains le Button joue (par un 3-bet ou un {{t:call|call}}) et avec lesquelles il {{t:fold|se couche}}. Apprenez la répartition entre 3-bet et {{t:call|call}} à partir des chiffres ci-dessus : le solveur de l'application ne {{t:call|suit}} presque jamais dans ce spot, il ne reproduit donc pas cette répartition. Sur une douzaine de mains, par ex. A8s, 98s et 44, le solveur de l'application joue autrement que les solutions publiées, donc les exercices ne les évaluent pas.

Depuis la {{t:small-blind|petite blind}}, vous {{t:raise|relancez}} ou {{t:fold|vous couchez}} presque toujours. Un {{t:call|call}} signifie jouer {{t:out-of-position|hors de position}}, et la {{t:big-blind|grosse blind}} derrière vous peut encore {{t:raise|relancer}}. {{t:out-of-position|Hors de position}}, une main **{{t:equity-realization|réalise moins bien son equity}}** : elle gagne une plus petite part du {{t:pot|pot}} que ne l'indique son equity, car vous {{t:fold|vous couchez}} plus souvent avant l'abattage et il vous est plus difficile de remporter le {{t:pot|pot}} par une {{t:bet|mise}}.

```range
vs-open.sb-vs-btn
```

Selon la solution de solveur publiée, la {{t:small-blind|petite blind}} face au Button ne {{t:call|suit}} presque rien : elle fait un 3-bet avec environ {{n:pf.3bet-freq.sb-vs-btn}} des mains, le haut de sa {{t:range|range}} (notamment 77+, AJo+, KQo, A5s, A4s, T9s), et {{t:fold|se couche}} avec le reste. Le solveur de l'application fait ici un 3-bet avec {{n:solver.3bet.sb-vs-btn}} des mains, dont les {{t:pair|paires}} 55 et 66, avec lesquelles la solution publiée fait aussi souvent un 3-bet ; la grille compte ses rares {{t:call|calls}} comme des {{t:fold|folds}}. Sur quelques mains, par ex. ATo, T9s et A4s, le solveur de l'application joue autrement que les solutions publiées, donc les exercices ne les évaluent pas.

## {{t:range|Range}} {{t:linear|linéaire}} ou {{t:polarized|polarisée}}

Avec la {{t:position|position}} face à une {{t:open|ouverture}} du {{t:cutoff|CO}}, vous faites surtout un 3-bet avec les meilleures mains, en partant du haut, et ajoutez quelques {{t:bluff|bluffs}} avec des as assortis (A5s, A4s), tandis que vous jouez les mains moyennes (par ex. 77–99, AJs, ATs, {{t:connectors|connecteurs}} assortis) de façon mixte : vous faites un 3-bet avec une partie et {{t:call|suivez}} avec les autres. L'adversaire {{t:call|suit}} souvent, vous voulez donc une main qui joue bien dans le {{t:pot|pot}} après un {{t:call|call}}. Les sources nomment une telle {{t:range|range}} différemment : les unes la disent {{t:linear|linéaire}} (construite des mains les plus fortes vers le bas), d'autres {{t:polarized|polarisée}} (composée surtout de mains très fortes et de {{t:bluff|bluffs}}, presque sans mains moyennes) ; ce qui compte davantage, c'est de savoir avec quelles mains vous faites un 3-bet et avec lesquelles vous {{t:call|suivez}}.

Depuis la {{t:big-blind|grosse blind}} face au Button, vous faites un 3-bet avec vos mains les plus fortes (TT+, AQ+, AJs+) plus des {{t:bluff|bluffs}} pris dans le bas de votre {{t:range|range}} de {{t:call|call}} : A5s, parfois A4s, et des {{t:connectors|connecteurs}} assortis. Les as assortis bloquent les AA et AK de l'adversaire, et quand ils reçoivent un {{t:call|call}}, ils peuvent encore toucher une {{t:flush|couleur}} ou une {{t:straight|quinte}}. Avec les {{t:pair|paires}} moyennes et petites, KQo et les as dépareillés (AJo–A9o), vous vous contentez généralement de {{t:call|suivre}} : depuis la {{t:big-blind|grosse blind}}, vous entrez à bas prix et clôturez l'action, donc ces mains rapportent davantage après un {{t:call|call}}. La composition dépend du {{t:rake|rake}} et de la taille du 3-bet, donc 99, KQo et AJo sont parfois joués de différentes manières. Face à une {{t:open|ouverture}} de la {{t:small-blind|petite blind}}, vous faites un 3-bet surtout {{t:value|pour la valeur}} (TT+, AJs+, une partie des AQo et KQ), et avec A5s et les {{t:connectors|connecteurs}} assortis, vous {{t:call|suivez}} généralement.

Depuis la {{t:small-blind|petite blind}}, vous jouez autrement : 3-bet ou {{t:fold|fold}}, avec le haut de votre {{t:range|range}} en 3-bet.

:::note D'où viennent ces règles
Les grilles du Button et de la {{t:small-blind|petite blind}} proviennent du solveur de l'application et concordent approximativement avec les sources (à la {{t:small-blind|petite blind}}, à l'exception de quelques mains que les exercices n'évaluent pas). La façon de faire un 3-bet depuis la {{t:big-blind|grosse blind}} est enseignée par une règle fondée sur les résultats publiés d'autres solveurs, issus de plusieurs sources indépendantes : la composition des 3-bets depuis la {{t:big-blind|grosse blind}} dans le solveur de l'application s'en écarte.
:::
