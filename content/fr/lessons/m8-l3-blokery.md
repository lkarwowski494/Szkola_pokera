---
id: m8.l3
module: m8
order: 3
title: "Bloqueurs"
sub: "Avec quelle main bluffer"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "Qu'est-ce qu'un {{t:blocker|bloqueur}} ?"
    options:
      - { text: "Une carte de votre main qui fait que l'adversaire a moins de {{t:combo|combinaisons}} d'une main donnée", correct: true, why: "L'adversaire ne peut pas avoir une carte que vous tenez. Si vous avez un as, l'adversaire a moins d'as : moins de {{t:pair|paires}} d'as, moins de AK, moins de couleurs à l'as." }
      - { text: "Une carte du {{t:board|board}} qui gâche un {{t:draw|tirage}}", why: "On le dit parfois familièrement des cartes du {{t:board|board}}, mais un {{t:blocker|bloqueur}} au sens où on l'entend ici est une carte de votre main. Les deux joueurs voient les cartes du {{t:board|board}}." }
      - { text: "Une petite mise destinée à empêcher une grosse mise de l'adversaire", why: "C'est ce qu'on appelle un blocking bet, autre chose. Un {{t:blocker|bloqueur}} est une carte de votre main qui réduit le nombre de {{t:combo|combinaisons}} de l'adversaire." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Sans aucune information, AK a {{n:combos.unpaired}} {{t:combo|combinaisons}}. Vous tenez un roi (sans as). Combien de {{t:combo|combinaisons}} de AK l'adversaire peut-il avoir ? Saisissez le nombre."
    answer: combos.unpaired.one-blocked
    explanation: "Il y a {{n:cards.suits}} as, et il reste {{n:pair.outs.per-rank}} rois, car l'un d'eux est dans votre main : {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Une seule carte supprime tout un quart des {{t:combo|combinaisons}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Une {{t:pair|paire}} d'as a {{n:combos.pair}} {{t:combo|combinaisons}}. Vous tenez un as. Combien de {{t:combo|combinaisons}} de {{t:pair|paire}} d'as l'adversaire peut-il avoir ? Saisissez le nombre."
    answer: combos.pair.one-blocked
    explanation: "Il reste {{n:pair.outs.per-rank}} as, et avec trois cartes on ne peut former que {{n:combos.pair.one-blocked}} {{t:pair|paires}}. Un as dans votre main supprime la moitié des {{t:combo|combinaisons}} de AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Vous tenez [[Ah Kc]]. Combien de {{t:combo|combinaisons}} de AK l'adversaire peut-il avoir ?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Il reste {{n:pair.outs.per-rank}} as et {{n:pair.outs.per-rank}} rois : {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "Ce serait le cas si vous teniez seulement l'as ou seulement le roi. Vous bloquez les deux rangs." }
      - { text: "{{n:combos.unpaired}}", why: "C'est le nombre de {{t:combo|combinaisons}} de AK dans le paquet avant que vous voyiez vos cartes. Votre as et votre roi ne peuvent pas être dans la main de l'adversaire." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "À la river, un troisième cœur est tombé et une {{t:flush|couleur}} est possible. La {{t:big-blind|grosse blinde}} {{t:check|checke}}. Vous n'avez qu'une hauteur as et voulez bluffer. Avec quelle main le {{t:bluff|bluff}} est-il meilleur ?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "L'as de cœur bloque les couleurs les plus fortes de l'adversaire : il ne peut pas avoir de {{t:flush|couleur}} à l'as, et c'est une main qui paiera toujours. L'adversaire a moins de mains pour {{t:call|suivre}}, donc le {{t:bluff|bluff}} fonctionnera plus souvent." }
      - { text: "[[Ad 3c]]", why: "Même force au showdown, mais vous ne bloquez aucune {{t:flush|couleur}}. L'adversaire garde toutes ses couleurs, avec lesquelles il paiera." }
      - { text: "Aucune différence, les deux ne sont que hauteur as", why: "Au showdown, oui, mais comme {{t:bluff|bluff}}, non. L'as de cœur réduit le nombre de couleurs de l'adversaire qui paieront à coup sûr." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "Le {{t:flush-draw|tirage couleur}} à pique n'est pas rentré. La {{t:big-blind|grosse blinde}} checke à la river. Les deux mains n'ont que dame-huit. Avec laquelle vaut-il mieux bluffer ?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Sans pique, vous ne bloquez pas les {{t:draw|tirages}} manqués de l'adversaire, et ce sont des mains qui {{t:fold|se coucheront}} sur votre mise. Les autres cartes des deux mains sont identiques." }
      - { text: "[[Qd 8s]]", why: "Le huit de pique bloque une partie des {{t:flush-draw|tirages couleur}} manqués (p. ex. [[8s 7s]]) avec lesquels l'adversaire {{t:fold|se serait couché}}. Il lui reste relativement plus de mains avec lesquelles il paiera." }
      - { text: "Aucune différence", why: "La différence tient à la couleur du huit. Un pique dans votre main enlève à l'adversaire une partie des mains avec lesquelles il se coucherait." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "Même situation : les piques ne sont pas rentrés, la {{t:big-blind|grosse blinde}} {{t:check|checke}}. Vous avez l'une de deux mains. Avec laquelle {{t:bluff|bluffez}}-vous, et avec laquelle {{t:check|checkez}}-vous ?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Je {{t:bluff|bluffe}} avec [[Qc Jd]], je {{t:check|checke}} avec [[9c 8c]]", correct: true, why: "Une {{t:pair|paire}} de neuf bat les {{t:draw|tirages}} manqués après un {{t:check|check}}. Dame-valet perd contre presque toutes les mains, donc seul un {{t:bluff|bluff}} peut remporter le {{t:pot|pot}}." }
      - { text: "Je {{t:bluff|bluffe}} avec [[9c 8c]], je {{t:check|checke}} avec [[Qc Jd]]", why: "C'est l'inverse. Un {{t:bluff|bluff}} avec une {{t:pair|paire}} de neuf abandonne une victoire au showdown, et un {{t:check|check}} avec dame-valet abandonne le {{t:pot|pot}} sans combattre." }
      - { text: "Je {{t:bluff|bluffe}} avec les deux", why: "Une {{t:pair|paire}} de neuf n'a pas besoin de {{t:bluff|bluff}} : elle bat beaucoup de mains après un {{t:check|check}}. Vous {{t:bluff|bluffez}} avec des mains sans valeur au showdown." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Vous choisissez un {{t:bluff|bluff}} à la river parmi des mains sans valeur au showdown. Quelle carte de votre main aide le plus ?"
    options:
      - { text: "Une carte des mains avec lesquelles l'adversaire paiera", correct: true, why: "Vous bloquez sa valeur : il a moins de mains fortes, donc il lui reste plus souvent une main avec laquelle se coucher." }
      - { text: "Une carte de la couleur du {{t:draw|tirage}} manqué", why: "Elle bloque des mains avec lesquelles l'adversaire {{t:fold|se couchera}}. Le {{t:bluff|bluff}} fonctionne alors moins souvent." }
      - { text: "La carte la plus haute, quel que soit le board", why: "Une carte haute donne un peu de force au showdown, mais ne dit rien de ce que vous bloquez. Regardez quelles mains de l'adversaire paieront." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "À la river, un troisième cœur est tombé. La {{t:big-blind|grosse blinde}} {{t:check|checke}}. Vous avez une {{t:pair|paire}} de neuf et l'as de cœur. Que faites-vous ?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "Je {{t:check|checke}}", correct: true, why: "Après un {{t:check|check}}, une {{t:pair|paire}} de neuf bat beaucoup de mains de l'adversaire sans {{t:pair|paire}}. Un {{t:blocker|bloqueur}} ne transforme pas une main qui a de la valeur au showdown en bon {{t:bluff|bluff}} : vous choisissez d'abord les mains sans chance, et seulement ensuite vous regardez les {{t:blocker|bloqueurs}}." }
      - { text: "Je mise en {{t:bluff|bluff}}, car j'ai l'as de cœur", why: "L'as de cœur est un bon {{t:blocker|bloqueur}}, mais avec une {{t:pair|paire}} de neuf, vous perdez en {{t:bluff|bluffant}} : les mains plus faibles {{t:fold|se coucheraient}} de toute façon, et les couleurs et les rois paieront." }
      - { text: "Je mise {{t:value|pour la valeur}}", why: "Qui paiera avec une main plus faible ? Sur un {{t:board|board}} où une couleur est possible, les mains plus faibles qu'une {{t:pair|paire}} de neuf {{t:fold|se coucheront}} presque toujours." }
---
Dans la leçon précédente, vous avez établi combien de {{t:bluff|bluffs}} il vous faut et que vous {{t:bluff|bluffez}} avec des mains sans chance au showdown. Souvent, ces mains sont plus nombreuses que nécessaire. C'est alors que les **{{t:blocker|bloqueurs}}** tranchent.

## {{t:blocker|Bloqueur}}

L'adversaire ne peut pas avoir une carte que vous tenez. C'est pourquoi il a moins de {{t:combo|combinaisons}} de mains contenant cette carte :

| Main de l'adversaire | Sans {{t:blocker|bloqueur}} | Vous tenez une carte de ce rang |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Si vous tenez à la fois l'as et le roi, l'adversaire n'a que {{n:combos.unpaired.both-blocked}} {{t:combo|combinaisons}} de AK.

## Bloquez les mains avec lesquelles l'adversaire paiera

Un bon {{t:bluff|bluff}} contient une carte des mains avec lesquelles l'adversaire **{{t:call|suivra}}**. Exemple : à la river, un troisième cœur est tombé. L'as de cœur dans votre main signifie que l'adversaire n'a pas de {{t:flush|couleur}} à l'as, c'est-à-dire une main qui paie toujours. Il lui reste plus de mains avec lesquelles se coucher.

## Ne bloquez pas les mains avec lesquelles l'adversaire {{t:fold|se couchera}}

Quand le {{t:flush-draw|tirage couleur}} **ne rentre pas**, l'adversaire {{t:fold|se couchera}} avec ses {{t:draw|tirages}} manqués. Si vous avez une carte de cette couleur, il en a moins, donc votre {{t:bluff|bluff}} tombera plus souvent sur une main qui paiera. Entre deux {{t:bluff|bluffs}} similaires, vous choisissez celui qui n'a pas de carte dans la couleur du {{t:draw|tirage}} manqué.

## D'abord la force au showdown

L'ordre est fixe : vous mettez d'abord de côté les mains qui peuvent gagner après un {{t:check|check}}, et c'est seulement parmi les autres que vous choisissez les {{t:bluff|bluffs}} avec les meilleurs {{t:blocker|bloqueurs}}. Un bon {{t:blocker|bloqueur}} ne fera pas un {{t:bluff|bluff}} d'une {{t:pair|paire}} qui gagnerait au showdown. Les {{t:blocker|bloqueurs}} font pencher le choix entre des mains similaires ; l'effet en lui-même est faible, il ne tranche donc que lorsque les mains sont de force similaire (de même pour le choix des mains avec lesquelles {{t:call|suivre}} dans la leçon suivante).

:::note D'où viennent ces règles
Les nombres de {{t:combo|combinaisons}} relèvent de la combinatoire. Les règles de choix des {{t:bluff|bluffs}} selon les {{t:blocker|bloqueurs}} proviennent du programme d'enseignement ainsi que de supports de formation et d'analyses de solveurs. Quand il manque d'autres {{t:bluff|bluffs}}, le solveur {{t:bluff|bluffe}} aussi avec des tirages couleur manqués.
:::
