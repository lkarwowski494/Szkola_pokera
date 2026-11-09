---
id: m8.l1
module: m8
order: 1
title: "Value bet à la river"
sub: "Misez quand des mains moins bonnes paient"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River : toutes les cartes sont déjà sur le {{t:board|board}}. À quoi bon miser ?"
    options:
      - { text: "Pour que des mains moins bonnes paient ou que de meilleures {{t:fold|se couchent}}", correct: true, why: "À la river, il n'y a plus de cartes à découvrir, donc une mise n'a que deux buts : la value (des mains moins bonnes paient) ou le {{t:bluff|bluff}} (de meilleures {{t:fold|se couchent}}). Une mise qui ne fait ni l'un ni l'autre ne fait que coûter." }
      - { text: "Pour ôter à l'adversaire sa chance de toucher", why: "C'est une raison de miser au flop et au turn. À la river, l'adversaire ne touchera plus rien : sa main est finale." }
      - { text: "Pour vérifier si ma main est la meilleure", why: "Une mise n'est pas une question. Quand vous misez avec une main moyenne, les mains moins bonnes {{t:fold|se couchent}} généralement et les meilleures paient, donc vous « vous renseignez » avec votre propre argent. Vous le saurez gratuitement en {{t:check|checkant}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, l'adversaire {{t:check|checke}}. Vous estimez qu'il paiera votre mise dans {{n:value.ex.calls}} cas : {{n:value.ex.many}} fois avec une main moins bonne, {{n:value.ex.few}} fois avec une meilleure. Il ne peut pas vous {{t:raise|relancer}}. Misez-vous ?"
    options:
      - { text: "Oui, c'est une mise {{t:value|de value}}", correct: true, why: "Vous gagnez la mise {{n:value.ex.many}} fois et la perdez {{n:value.ex.few}} fois : il vous reste {{n:value.ex.net}} mises net. Plus de {{n:value.threshold}} des {{t:call|calls}} viennent de mains moins bonnes, donc miser rapporte plus que {{t:check|checker}}." }
      - { text: "Non, car il paiera parfois avec une meilleure main", why: "Une meilleure main paiera toujours dans une partie des cas. Ce qui compte, c'est s'il y a plus de {{t:call|calls}} de mains moins bonnes que de meilleures : ici, {{n:value.ex.many}} contre {{n:value.ex.few}}." }
      - { text: "Seulement si l'adversaire n'a jamais de meilleure main", why: "Vous ne miseriez alors qu'avec les nuts et laisseriez beaucoup de value. Il suffit que plus de {{n:value.threshold}} des {{t:call|calls}} viennent de mains moins bonnes." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, l'adversaire {{t:check|checke}}. Il paiera votre mise dans {{n:value.ex.calls}} cas : {{n:value.ex.few}} fois avec une main moins bonne, {{n:value.ex.many}} fois avec une meilleure. Les mains moins bonnes de l'adversaire qui {{t:fold|se coucheront}} auraient de toute façon perdu contre vous au showdown. Que faites-vous ?"
    options:
      - { text: "Je {{t:check|checke}}", correct: true, why: "La mise gagnerait {{n:value.ex.few}} fois et perdrait {{n:value.ex.many}} fois : vous perdez {{n:value.ex.net}} mises net. En {{t:check|checkant}}, vous remportez le {{t:pot|pot}} contre les mêmes mains moins bonnes, simplement sans rien payer aux meilleures." }
      - { text: "Je mise, car j'ai une main correcte", why: "La force de la main ne suffit pas à elle seule. Ce qui compte, c'est qui paie : ici, la plupart des {{t:call|calls}} viennent de meilleures mains, donc la mise perd." }
      - { text: "Je mise gros pour que les meilleures mains {{t:fold|se couchent}}", why: "Ce serait un {{t:bluff|bluff}} avec une main qui gagne souvent au showdown. Les meilleures mains {{t:fold|se couchent}} rarement à la river, et après avoir {{t:check|checké}}, vous battrez de toute façon les moins bonnes." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. {{n:value.ex.many}} mains moins bonnes et {{n:value.ex.few}} meilleures vont {{t:call|suivre}} votre mise. Combien de mises gagnez-vous net sur ces {{n:value.ex.calls}} {{t:call|calls}} ? Saisissez un nombre."
    answer: value.ex.net
    explanation: "Chaque {{t:call|call}} avec une main moins bonne est une mise gagnée, chaque call avec une meilleure, une mise perdue : {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. Vous gagneriez aussi le {{t:pot|pot}} contre les mains moins bonnes en {{t:check|checkant}}, donc vous ne comptez que les mises."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Button, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Vous avez misé au flop et au turn, et vous avez reçu un {{t:call|call}} à chaque fois. River, la {{t:big-blind|grosse blinde}} {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Je mise {{t:value|pour la value}}", correct: true, why: "{{t:top-pair|Top paire}} avec le meilleur kicker. Un adversaire qui a {{t:call|suivi}} deux {{t:street|streets}} a beaucoup de rois plus faibles (KQ, KJ, KT) et de neuf, et il y avait peu de {{t:draw|tirages}} sur ce {{t:board|board}}. Les mains moins bonnes paieront bien plus souvent que les meilleures ({{t:two-pair|double paire}}, sets). En général, une {{t:top-pair|top paire}} supporte deux {{t:value|streets de value}} (M9) ; ici, une troisième, car l'adversaire paie avec des rois plus faibles." }
      - { text: "Je {{t:check|checke}}, car l'adversaire pouvait avoir un set", why: "C'est possible, mais rare. En {{t:check|checkant}}, vous perdez la mise de tous les rois plus faibles avec lesquels il paierait. Vous comptez qui va {{t:call|suivre}}, pas s'il existe une meilleure main." }
      - { text: "Je {{t:check|checke}} pour que l'adversaire bluffe", why: "Un adversaire qui a {{t:call|suivi}} deux fois a surtout des {{t:pair|paires}} et {{t:bluff|bluffe}} rarement après votre {{t:check|check}}. Vous gagnerez plus sûrement en misant contre ses rois plus faibles." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Button, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Au flop, vous avez fait un c-bet et reçu un {{t:call|call}} ; au turn, vous avez {{t:check|checké}} tous les deux. River, la {{t:big-blind|grosse blinde}} {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "Je {{t:check|checke}}", correct: true, why: "Une {{t:second-pair|deuxième paire}} avec un kicker faible bat les {{t:draw|tirages}} ratés et les {{t:pair|paires}} plus faibles, mais ces mains {{t:fold|se coucheront}} face à une mise. Ce sont surtout les rois et les meilleurs dix qui paieront. Vous {{t:check|checkez}} et voyez le showdown gratuitement." }
      - { text: "Je mise {{t:value|pour la value}}", why: "Qui va payer ? Les mains sans {{t:pair|paire}} {{t:fold|se coucheront}}, et les rois et les meilleurs dix vont {{t:call|suivre}}. La plupart des {{t:call|calls}} viendraient de mains meilleures que la vôtre." }
      - { text: "Je mise gros en {{t:bluff|bluff}}", why: "Votre main gagne souvent au showdown. En {{t:bluff|bluffant}}, vous renoncez à ce gain : les mains moins bonnes {{t:fold|se coucheraient}} de toute façon, et les rois {{t:fold|se couchent}} rarement." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Button, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Au flop, vous avez fait un c-bet et reçu un {{t:call|call}} ; au turn, vous avez {{t:check|checké}} tous les deux. River, la {{t:big-blind|grosse blinde}} {{t:check|checke}}. Vous avez une {{t:top-pair|top paire}} avec un kicker dix. Quelles mains paieront une petite mise tout en étant moins bonnes que la vôtre ?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Les huit, les quatre et les dames avec un kicker plus faible", correct: true, why: "Ces mains ont suivi au flop et ont une {{t:pair|paire}}, donc elles paieront souvent une petite mise. Vous perdez contre une dame avec un meilleur kicker, les {{t:two-pair|doubles paires}}, les sets et les {{t:straight|quintes}} (A5, 65), mais il y a plus de {{t:call|calls}} de mains moins bonnes." }
      - { text: "Les mains sans {{t:pair|paire}}", why: "Une main sans {{t:pair|paire}} paie rarement une mise à la river ; une hauteur As paie parfois, mais il y a ici beaucoup plus de {{t:pair|paires}} moins bonnes." }
      - { text: "Aucune, seules les meilleures mains paient", why: "Trop prudent : la {{t:big-blind|grosse blinde}} défend beaucoup de {{t:pair|paires}} inférieures à la dame. Après le {{t:check|check}} au turn, sa {{t:range|range}} en contient pas mal." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Même situation : vous avez une {{t:top-pair|top paire}} avec un kicker dix, la {{t:big-blind|grosse blinde}} checke à la river. Le {{t:pot|pot}} est de {{n:ex.pot}}. Que faites-vous ?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Mise de {{n:ex.bet.quarter}}, soit 1/4 du {{t:pot|pot}}", correct: true, why: "Thin value : vous battez à peine plus de la moitié des mains qui paieront. Les huit, les quatre et les dames plus faibles vont {{t:call|suivre}} une petite mise, donc il reste plus de {{t:call|calls}} de mains moins bonnes que de meilleures." }
      - { text: "Mise de {{n:ex.bet.pot}}, soit tout le {{t:pot|pot}}", sizeError: true, why: "Bonne action, mauvaise taille : face à une mise de la taille du {{t:pot|pot}}, les huit et les quatre {{t:fold|se coucheront}}, et ce sont surtout les meilleures dames, les {{t:two-pair|doubles paires}} et les sets qui paieront. La plupart des {{t:call|calls}} sont alors meilleurs que vous. La thin value se mise petit." }
      - { text: "Je {{t:check|checke}}", why: "Vous perdez de la value : l'adversaire a beaucoup de {{t:pair|paires}} inférieures qui paieront une petite mise. {{t:check|Checker}}, c'est laisser filer cet argent." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Un ami dit : « À la river, avec une {{t:pair|paire}} moyenne, je mise pour voir où j'en suis. » Qu'est-ce qui ne va pas dans cette idée ?"
    options:
      - { text: "Les mains moins bonnes {{t:fold|se coucheront}}, et les meilleures paieront", correct: true, why: "Après une telle mise, les mains que vous battez {{t:fold|se couchent}}, et celles contre lesquelles vous perdez paient ou {{t:raise|relancent}}. Vous obtenez l'information gratuitement en {{t:check|checkant}}, car, comme vous avez la {{t:position|position}}, l'adversaire montrera ses cartes au showdown." }
      - { text: "Rien, c'est un bon moyen d'obtenir de l'information", why: "Ici, l'information coûte une mise que vous perdez généralement. Après avoir {{t:check|checké}}, vous verrez la main de l'adversaire sans rien payer de plus." }
      - { text: "La mise devrait être plus grosse", why: "Une mise plus grosse aggrave les choses : encore plus de mains moins bonnes {{t:fold|se coucheront}}, et les meilleures paieront toujours." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Votre {{t:flush-draw|tirage couleur}} n'est pas rentré. À la river, vous envisagez de miser. De quel type de mise s'agirait-il ?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Un {{t:bluff|bluff}}", correct: true, why: "Vous n'avez qu'une hauteur Dame. Aucune main qui vous {{t:call|suit}} ne sera moins bonne, donc la mise ne peut gagner que si l'adversaire {{t:fold|se couche}}. C'est un {{t:bluff|bluff}} (le choix des {{t:bluff|bluffs}} est traité dans les leçons suivantes)." }
      - { text: "Une mise {{t:value|de value}}", why: "Une mise {{t:value|de value}} exige que des mains moins bonnes paient. Avec seulement une hauteur Dame, presque rien de moins bon ne vous {{t:call|suivra}}." }
      - { text: "Thin value", why: "La thin value, c'est une mise avec une main qui bat à peine plus de la moitié des {{t:call|calls}}. Votre main ne bat presque aucun {{t:call|call}}." }
---
À la river, toutes les cartes sont déjà sur le {{t:board|board}}. Personne ne touchera plus rien, donc une mise ne peut faire que deux choses : faire payer une main moins bonne (**value**) ou pousser une meilleure à {{t:fold|se coucher}} (**{{t:bluff|bluff}}**). Dans cette leçon, vous travaillerez la value ; dans les suivantes, les {{t:bluff|bluffs}} et le call.

## Le seuil : plus de la moitié des {{t:call|calls}}

Quand vous misez en {{t:position|position}} et que l'adversaire ne peut que {{t:call|suivre}} ou {{t:fold|se coucher}}, vous ne comptez que les mains avec lesquelles il paiera :

```formula
mise de value : calls de mains moins bonnes > calls de mains meilleures
```

Chaque {{t:call|call}} avec une main moins bonne rapporte une mise. Chaque {{t:call|call}} avec une meilleure main coûte une mise. Quand l'adversaire {{t:fold|se couche}} avec une main moins bonne, vous gagnez le même {{t:pot|pot}} qu'après un {{t:check|check}}. C'est pourquoi une mise rapporte quand plus de **{{n:value.threshold}}** des mains qui paient sont moins bonnes que la vôtre.

Exemple : sur {{n:value.ex.calls}} {{t:call|calls}}, {{n:value.ex.many}} viennent de mains moins bonnes et {{n:value.ex.few}} de meilleures. Vous gagnez {{n:value.ex.net}} mises net. Si la proportion était inverse, vous perdriez autant.

## Qui va payer

Vous ne vous demandez pas « ai-je une bonne main ? », mais « avec quoi l'adversaire va-t-il payer ? ». Passer en revue sa {{t:range|range}} aide :

- les mains sans {{t:pair|paire}} paient rarement ; une hauteur As, qui bat les {{t:bluff|bluffs}}, paie parfois,
- les {{t:pair|paires}} inférieures et les kickers plus faibles paient souvent une petite mise,
- les meilleures mains paieront toujours, et parfois {{t:raise|relanceront}}.

Quand l'adversaire peut vous {{t:raise|relancer}} et que vous devriez alors {{t:fold|vous coucher}}, le seuil est encore plus élevé : la mise ne rapporte qu'avec une nette majorité de {{t:call|calls}} de mains moins bonnes.

## Thin value : petit, mais payant

La thin value (valeur fine) est une mise avec une main qui bat à peine plus de la moitié des {{t:call|calls}}, par ex. une {{t:top-pair|top paire}} avec un kicker moyen. Vous faites cette mise **plus petite** qu'avec une main forte, en général env. 1/4–1/2 du {{t:pot|pot}} : les {{t:pair|paires}} plus faibles paieront aussi une petite mise, mais face à une grosse, elles {{t:fold|se coucheront}} et il ne restera que les meilleures mains.

C'est une simplification : sans risque de check-raise, un solveur mise la thin value jusqu'à env. 1/4 du {{t:pot|pot}}, et avec ce risque, en {{t:position|position}}, il descend rarement sous 1/2 {{t:pot|pot}}.

## Une main moyenne {{t:check|checke}}

Vous avez une main moyenne {{t:in-position|en position}}, par ex. une {{t:second-pair|deuxième paire}}. Les mains moins bonnes de l'adversaire {{t:fold|se coucheront}} face à une mise, et les meilleures paieront. La mise transforme alors votre main en {{t:bluff|bluff}}. Vous {{t:check|checkez}} : vous gagnerez le showdown contre les mains moins bonnes sans rien payer aux meilleures.

:::note D'où viennent ces règles
Le seuil de plus de la moitié des {{t:call|calls}} relève des mathématiques pures (mise {{t:in-position|en position}}, sans {{t:raise|relance}} et sans rake). La taille de la thin value et le {{t:check|check}} avec une main moyenne proviennent d'analyses de solveur publiées ({{t:tournament|tournois}} avec des stacks plus courts) et de supports de formation.
:::
