---
id: m10.l3
module: m10
order: 3
title: "S'écarter de la base"
sub: "Avec quelles mains et jusqu'où"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Vous savez que, dans cette ligne, l'adversaire {{t:bluff|bluffe}} un peu plus souvent qu'à l'équilibre. Avec quelles mains changez-vous d'abord votre décision ?"
    options:
      - { text: "Avec les mains qui, dans la base, mélangent {{t:call|suivre}} et {{t:fold|se coucher}} : désormais, vous {{t:call|suivez}} toujours", correct: true, why: "À l'équilibre, ces mains sont indifférentes, car l'adversaire a exactement autant de {{t:bluff|bluffs}} qu'il faut. Même un petit surplus de {{t:bluff|bluffs}} fait que {{t:call|suivre}} rapporte plus que {{t:fold|se coucher}}." }
      - { text: "Avec les mains les plus faibles, qui, dans la base, {{t:fold|se couchent}} toujours", why: "Ces mains perdent même contre une partie des {{t:bluff|bluffs}}, ou ont besoin d'un surplus bien plus important. Elles ne changent que lorsque l'adversaire s'écarte fortement de l'équilibre." }
      - { text: "Avec les mains les plus fortes : désormais, vous les {{t:raise|relancez}}", why: "Avec les mains les plus fortes, vous continuez de toute façon. Le changement commence par les mains à la limite de la décision." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Dans un exemple de solver publié, l'adversaire {{t:bluff|bluffe}} à la river avec environ {{n:overbluff.lock}} de ses mises au lieu d'environ {{n:overbluff.base}}. Comment change votre réponse à sa mise avec les mains qui attrapent les {{t:bluff|bluffs}} ?"
    options:
      - { text: "Vous cessez de {{t:fold|vous coucher}} : les mains qui mélangeaient dans la base {{t:call|suivent}} désormais toujours", correct: true, why: "Cela a suffi pour que, dans la solution où la stratégie de l'adversaire est verrouillée, la défense ne fasse plus que {{t:call|suivre}}. Les mains indifférentes réagissent au moindre surplus de {{t:bluff|bluffs}}." }
      - { text: "Presque rien : quelques points, c'est trop peu pour changer quoi que ce soit", why: "Pour des mains indifférentes, quelques points, c'est beaucoup : à l'équilibre, {{t:call|suivre}} et {{t:fold|se coucher}} leur rapportent la même chose, donc tout surplus de {{t:bluff|bluffs}} fait pencher la décision vers {{t:call|suivre}}." }
      - { text: "Vous commencez à {{t:raise|relancer}} avec les mains qui attrapent les {{t:bluff|bluffs}}", why: "La {{t:raise|relance}} fait coucher les {{t:bluff|bluffs}} de l'adversaire, et ce sont les mains meilleures qui {{t:call|suivent}}. Une main qui attrape les {{t:bluff|bluffs}} gagne en {{t:call|suivant}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Vous savez que, dans une ligne donnée, l'adversaire {{t:bluff|bluffe}} moins souvent qu'à l'équilibre. Que faites-vous avec une main qui attrape les {{t:bluff|bluffs}} et qui, dans la base, {{t:call|suit}} parfois et {{t:fold|se couche}} parfois ?"
    options:
      - { text: "Je {{t:fold|me couche}} toujours", correct: true, why: "Quand il y a moins de {{t:bluff|bluffs}} que ne l'exige l'équilibre, les mains indifférentes perdent en {{t:call|suivant}}. Résultat du solver : face à un manque de {{t:bluff|bluffs}}, vous {{t:fold|vous couchez}} toujours." }
      - { text: "Je {{t:call|paie}} toujours, pour que l'adversaire ne m'exploite pas avec des {{t:bluff|bluffs}}", why: "Un adversaire qui {{t:bluff|bluffe}} trop rarement ne pourra pas exploiter le fait que vous {{t:fold|vous couchiez}}. C'est vous qui exploitez son erreur en {{t:fold|vous couchant}}." }
      - { text: "Je joue comme dans la base, moitié-moitié", why: "Mélanger n'a de sens que lorsque les deux décisions rapportent la même chose. Face à un manque de {{t:bluff|bluffs}}, {{t:fold|se coucher}} rapporte davantage." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "Vous {{t:bet|misez}} un c-bet de {{n:cbet.ex.small}} dans un {{t:pot}} de {{n:ex.pot}}, sans aucune main. À quelle fréquence l'adversaire doit-il {{t:fold|se coucher}} pour que ce {{t:bluff}} atteigne le point mort ? Saisissez un pourcentage."
    answer: alpha.cbet.small
    explanation: "Le seuil est mise ÷ ({{t:pot}} + mise) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Un adversaire dont le fold to c-bet est nettement au-dessus de ce chiffre {{t:fold|se couche}} assez souvent pour que le c-bet rapporte même sans main."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "L'adversaire a un fold to c-bet de {{n:hud.ex.fcb.high}} sur {{n:hud.ex.reg.hands}} mains. Sur un flop {{t:dry|sec}}, vous n'avez rien touché. Un c-bet de 1/3 du {{t:pot}} sans main est-il rentable ?"
    options:
      - { text: "Oui : l'adversaire {{t:fold|se couche}} plus souvent que {{n:alpha.cbet.small}}, donc le c-bet rapporte immédiatement", correct: true, why: "Un c-bet de 1/3 du {{t:pot}} atteint le point mort quand l'adversaire {{t:fold|se couche}} dans {{n:alpha.cbet.small}} des cas. L'adversaire {{t:fold|se couche}} bien plus souvent, donc le c-bet rapporte avant même que vous comptiez l'équité de votre main. Le fold to c-bet regroupe toutes les tailles et toutes les tables, c'est donc une approximation." }
      - { text: "Non : sans main, vous ne misez pas", why: "Un {{t:bluff}} n'a pas besoin d'une main, il a besoin de {{t:fold|folds}}. Quand l'adversaire {{t:fold|se couche}} plus souvent que {{n:alpha.cbet.small}}, le c-bet rapporte avec n'importe quelle main." }
      - { text: "Seulement avec une grande taille, car une petite ne fait pas coucher de mains", why: "Une mise plus grosse a besoin de plus de {{t:fold|folds}} : à 3/4 du {{t:pot}}, jusqu'à {{n:alpha.cbet.big}}. Quand l'adversaire {{t:fold|se couche}} souvent de toute façon, un petit c-bet obtient le même résultat à moindre coût." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "L'adversaire a un fold to c-bet de {{n:hud.ex.fcb.low}} sur {{n:hud.ex.reg.hands}} mains. Vous avez raté le flop et n'avez pas de {{t:draw|tirage}}. Vous envisagez un c-bet de 3/4 du {{t:pot}}. Que faites-vous ?"
    options:
      - { text: "Je {{t:check|checke}} : cet adversaire {{t:fold|se couche}} moins souvent que ce qu'exige un gros c-bet", correct: true, why: "Un c-bet de 3/4 du {{t:pot}} n'atteint le point mort qu'à {{n:alpha.cbet.big}} de {{t:fold|folds}}, or l'adversaire {{t:fold|se couche}} dans {{n:hud.ex.fcb.low}} des cas. Sans main et sans outs, un tel {{t:bluff}} perd." }
      - { text: "Je mise, car le c-bet est la norme", why: "Un c-bet sans main n'est bon que si l'adversaire {{t:fold|se couche}} assez souvent ou si la main a de l'équité. Ici, vous n'avez ni l'un ni l'autre." }
      - { text: "Je mise all-in pour forcer un {{t:fold}}", why: "Plus la mise est grosse, plus elle a besoin de {{t:fold|folds}}. Un adversaire qui {{t:fold|se couche}} rarement ne {{t:fold|se couchera}} pas plus souvent parce que vous avez {{t:bet|misé}} davantage." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "Un {{t:recreational|joueur récréatif}} avec un fold to 3-bet de {{n:mda.rec.f3b}} {{t:open|ouvre}} depuis le {{t:cutoff|cutoff}}. Vous êtes au bouton. Dans la base, KJs {{t:call|suit}} parfois, et A5s est parfois un {{t:bluff}} en 3-bet. Comment jouez-vous contre ce joueur ?"
    options:
      - { text: "Je 3-bette KJs pour la {{t:value|valeur}}, et je ne 3-bette pas A5s en {{t:bluff}}", correct: true, why: "Un joueur qui {{t:fold|se couche}} rarement face à un 3-bet {{t:call|suit}} souvent avec des mains plus faibles, donc les mains plus fortes gagnent à 3-better. Un {{t:bluff}} en 3-bet ne rapporte immédiatement qu'au-delà de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|folds}}, or ce joueur {{t:fold|se couche}} dans {{n:mda.rec.f3b}} des cas." }
      - { text: "Je 3-bette A5s, car un {{t:bluff}} avec un {{t:blocker|bloqueur}} est un bon 3-bet", why: "Dans la base, oui, contre un adversaire qui {{t:fold|se couche}} environ une fois sur deux. Celui-ci {{t:fold|se couche}} dans {{n:mda.rec.f3b}} des cas, donc le {{t:bluff}} joue presque toujours un gros {{t:pot}} avec une main faible." }
      - { text: "Je me contente de {{t:call|suivre}} avec KJs, pour ne pas effrayer l'adversaire", why: "Contre un joueur qui {{t:call|suit}} les 3-bets avec des mains plus faibles, un 3-bet avec KJs construit un plus gros {{t:pot}} avec une meilleure main et avec la {{t:position}}. C'est mieux que de simplement {{t:call|suivre}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Selon les données de population des micro-limites en ligne (NL25), les {{t:regular|regs}} {{t:fold|se couchent}} face à un 3-bet dans {{n:mda.reg.f3b}} des cas, et les {{t:recreational|joueurs récréatifs}} dans {{n:mda.rec.f3b}}. Un 3-bet en {{t:position}} à {{n:pf.3bet.ip-total}} rapporte sans main au-delà de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|folds}}. Qu'en déduisez-vous ?"
    options:
      - { text: "Contre les {{t:recreational|joueurs récréatifs}}, vous 3-bettez presque sans {{t:bluff|bluffs}} ; contre les {{t:regular|regs}}, les {{t:bluff|bluffs}} restent, mais seulement avec des mains qui ont de l'équité", correct: true, why: "Aucun groupe ne {{t:fold|se couche}} assez souvent pour qu'un 3-bet rapporte sans main. Dans la base, les {{t:bluff|bluffs}} en 3-bet vivent de l'équité après le flop et des {{t:fold|folds}} ; contre un joueur qui {{t:fold|se couche}} dans {{n:mda.rec.f3b}} des cas, il reste surtout l'équité, donc vous 3-bettez avec une {{t:range}} {{t:linear|linéaire}}." }
      - { text: "Vous 3-bettez tout le monde avec n'importe quelle main, car tout le monde {{t:fold|se couche}} beaucoup", why: "Personne ici ne {{t:fold|se couche}} plus souvent que {{n:alpha.vs-3bet-ip-size}}. 3-better avec n'importe quelle main serait perdant." }
      - { text: "Contre les {{t:recreational|joueurs récréatifs}}, vous arrêtez complètement de 3-better", why: "Au contraire : un joueur qui {{t:call|suit}} les 3-bets avec des mains plus faibles paie vos mains fortes. Vous changez la composition de votre 3-bet, vous n'y renoncez pas." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Après {{n:hud.ex.mid.hands}} mains, l'adversaire semble loose et passif, mais l'échantillon est petit. Jusqu'où vous écartez-vous de la base ?"
    options:
      - { text: "Un peu, dans le sens de la lecture, et seulement avec les mains limites", correct: true, why: "Le sens est déjà visible sur un petit échantillon, mais les chiffres ont une grande marge d'erreur. Vous décalez les mains à la limite de la décision dans le sens de la lecture, et vous jouez le reste comme dans la base, jusqu'à ce que l'échantillon grandisse." }
      - { text: "À fond : je joue immédiatement contre lui en {{t:exploit|exploitation}} maximale", why: "Sur un petit échantillon, la lecture peut être fausse. Un grand écart par rapport à la base est lui-même exploitable : la base est la stratégie la moins vulnérable à l'exploitation." }
      - { text: "Pas du tout, tant que je n'ai pas mille mains", why: "Trop prudent. Le sens de la lecture sur {{n:hud.ex.mid.hands}} mains veut déjà dire quelque chose, et vous pouvez décaler les mains limites à peu de frais." }
---
L'{{t:exploit|exploitation}} ne remplace pas la base, elle la décale. D'abord, vous savez comment on joue à l'équilibre (modules 3–9), puis les données vous montrent dans quel sens l'adversaire s'en écarte, et vous décalez votre propre jeu dans le même sens. La question est : avec quelles mains, et jusqu'où.

## D'abord les {{t:mixed-hand|mains mixtes}}

À l'équilibre, certaines mains jouent deux actions, p. ex. elles {{t:call|suivent}} parfois et {{t:fold|se couchent}} parfois. Elles le font parce que les deux actions rapportent la même chose : l'adversaire a exactement assez de {{t:bluff|bluffs}} pour que la main soit indifférente. Ce sont ces mains qui réagissent en premier à l'erreur de l'adversaire :

- l'adversaire {{t:bluff|bluffe}} trop souvent : les {{t:mixed-hand|mains mixtes}} {{t:call|suivent}} toujours ;
- l'adversaire {{t:bluff|bluffe}} trop rarement : les {{t:mixed-hand|mains mixtes}} {{t:fold|se couchent}} toujours.

Il en faut peu. Dans un exemple de solver publié (le bouton mise à la river après une ligne mise, {{t:check}}, mise), faire passer les {{t:bluff|bluffs}} de l'adversaire d'environ {{n:overbluff.base}} à environ {{n:overbluff.lock}} a fait basculer la défense de la {{t:big-blind|grosse blinde}} : elle ne fait plus que {{t:call|suivre}}. Les mains qui, dans la base, {{t:fold|se couchent}} toujours ou continuent toujours ne changent de décision que lorsque l'adversaire s'écarte fortement de l'équilibre.

## Le {{t:bluff}} calculé avec un seuil

Si un {{t:bluff}} sans main est rentable, c'est l'{{t:alpha}} du module 6 qui vous le dit :

```formula
Un {{t:bluff}} rapporte quand l'adversaire {{t:fold|se couche}} plus souvent que : mise ÷ (pot + mise)
```

Pour un c-bet de 1/3 du {{t:pot}}, c'est {{n:alpha.cbet.small}} ; pour 3/4 du {{t:pot}}, {{n:alpha.cbet.big}}. Le fold to c-bet du {{t:hud}} montre si l'adversaire est au-dessus ou en dessous de ce seuil. C'est une approximation : la statistique regroupe toutes les tailles et tous les flops, et votre main a généralement encore un peu d'équité. Sur un flop qui touche la {{t:range}} de l'adversaire, il {{t:fold|se couche}} moins souvent qu'en moyenne.

Les joueurs de la population des micro-limites en ligne (NL25) {{t:fold|se couchent}} face à un c-bet au flop dans {{n:mda.all.fcb}} des cas en moyenne. Ce n'est pas forcément une erreur : le solver {{t:out-of-position|hors de position}} au flop {{t:fold|se couche}} lui aussi plus souvent que ne l'indique la {{t:mdf}} (module 6). C'est pourquoi une moyenne de population au-dessus du seuil ne justifie pas à elle seule un c-bet sans main ; il vous faut une lecture de l'adversaire concerné ou un flop qui ne touche pas sa {{t:range}}.

## 3-better un joueur qui ne {{t:fold|se couche}} pas

Un 3-bet en {{t:position}} à {{n:pf.3bet.ip-total}} ne rapporte sans aucune main que si l'adversaire {{t:fold|se couche}} plus souvent que {{n:alpha.vs-3bet-ip-size}} (module 4). Données de la population des micro-limites en ligne (NL25) :

| Groupe | Fold to 3-bet |
|---|---|
| {{t:regular|Regs}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Joueurs récréatifs}} | {{n:mda.rec.f3b}} |

Dans la base, les {{t:bluff|bluffs}} en 3-bet vivent des {{t:fold|folds}} et de l'équité après le flop. Contre un joueur qui {{t:fold|se couche}} dans {{n:mda.rec.f3b}} des cas, il n'y a presque pas de {{t:fold|folds}}, mais en revanche il {{t:call|suit}} avec des mains plus faibles. C'est pourquoi vous le 3-bettez avec une {{t:range}} {{t:linear|linéaire}} : davantage de mains fortes pour la {{t:value|valeur}}, presque sans {{t:bluff|bluffs}}. Dans deux supports de formation, des coachs placent cette limite à un fold to 3-bet d'environ {{n:hud.f3b.low}}.

## Petit échantillon, petit écart

Plus l'échantillon est petit, plus l'erreur de la statistique est grande (leçon 1). Sur un petit échantillon, vous ne décalez que les mains limites, et seulement dans le sens de la lecture. Un grand écart, avec toute votre {{t:range}}, n'a de sens qu'avec un grand échantillon et une erreur nette de l'adversaire. S'écarter de la base est en soi une erreur qu'un bon adversaire peut exploiter.

:::note Sources
Le principe des {{t:mixed-hand|mains mixtes}} provient d'une analyse de solver publiée, avec la stratégie de l'adversaire verrouillée (une solution de solver, pas des données de population). Les seuils d'{{t:alpha}} relèvent du calcul. Les fold to 3-bet et fold to c-bet de la population proviennent d'une base de statistiques publique (une grande room en ligne, NL25–NL100, {{n:mda.period.months}} mois avant octobre 2026). La limite de fold to 3-bet et le principe « petit échantillon, petit écart » sont des recommandations issues de deux supports de formation.
:::
