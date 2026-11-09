---
id: m5.l1
module: m5
order: 1
title: "Texture du flop"
sub: "Hauteur, couleurs, connexion"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Lequel de ces flops est {{t:connected|connecté}}, c'est-à-dire qu'une {{t:straight|quinte}} y est déjà possible ?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Oui : le neuf, le sept et le six tiennent dans cinq rangs consécutifs. Par exemple, 85 ou T8 font une {{t:straight|quinte}}." }
      - { text: "[[Ks 8d 3c]]", why: "Non : du trois au roi, l'écart est trop grand. Aucune combinaison de deux cartes ne fait ici de {{t:straight|quinte}}." }
      - { text: "[[Qd Qs 9h]]", why: "Non : le flop est {{t:paired|pairé}}. Avec deux cartes en main et une {{t:pair|paire}} au {{t:board|tableau}}, une {{t:straight|quinte}} est impossible, car une {{t:straight|quinte}} demande cinq rangs différents." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Le flop est {{t:monotone|monocolore}} : les trois cartes sont de la même couleur. Qu'est-ce que cela signifie ?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Un joueur avec deux cartes de cette couleur a déjà une {{t:flush|couleur}}", correct: true, why: "Oui : trois cœurs au {{t:board|tableau}} et deux en main font cinq cartes de la même couleur. Un joueur avec un seul cœur a un {{t:flush-draw|tirage couleur}}." }
      - { text: "Personne ne peut encore avoir de {{t:flush|couleur}}", why: "Non : une {{t:flush|couleur}} demande cinq cartes, et trois sont déjà au {{t:board|tableau}}. Deux en main suffisent." }
      - { text: "Une {{t:flush|couleur}} n'est possible qu'à partir de la turn", why: "Non : c'est le cas sur un flop {{t:two-tone|bicolore}}. Sur un flop {{t:monotone|monocolore}}, une {{t:flush|couleur}} peut déjà être faite." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Vous avez [[Ac Kd]] et le flop est [[Ks 7d 2c]]. Pourquoi, sur un tel flop, une {{t:pair|paire}} avec un bon kicker est-elle plus sûre que sur un flop {{t:wet|wet}} ?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Parce que l'adversaire n'a aucun {{t:draw|tirage}}, donc les cartes suivantes changent rarement qui mène", correct: true, why: "Oui : le flop est {{t:rainbow|rainbow}} et aucune {{t:straight|quinte}} n'est possible. Un adversaire qui est derrière en ce moment a généralement peu d'outs : quelques cartes pour un {{t:three-of-a-kind|brelan}} ou une {{t:two-pair|double paire}}, et sans {{t:pair|paire}} il lui faut deux bonnes cartes d'affilée." }
      - { text: "Parce que sur un flop {{t:dry|sec}}, l'adversaire {{t:fold|se couche}} toujours", why: "Non : un adversaire avec un sept, un deux ou un roi plus faible peut {{t:call|suivre}}. Un flop {{t:dry|sec}} renseigne sur les {{t:draw|tirages}}, pas sur le fait que l'adversaire va {{t:fold|se coucher}} ou non." }
      - { text: "Parce qu'une {{t:pair|paire}} de rois gagne toujours jusqu'à la river", why: "Non : l'adversaire peut déjà avoir un set ou une {{t:two-pair|double paire}}. Un flop {{t:dry|sec}} réduit seulement le risque que quelqu'un vous rattrape." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Après le flop, chaque joueur voit déjà cinq de ses sept cartes. La façon dont les trois cartes du {{t:board|tableau}} s'accordent avec les mains des joueurs s'appelle la {{t:texture|texture}} du flop. De la {{t:texture|texture}} dépend qui touche le plus souvent et s'il vaut la peine de miser. Avant d'apprendre le c-bet (une {{t:bet|mise}} au flop après une {{t:raise|relance}} préflop), apprenez à lire le flop selon quatre axes.

## Hauteur

On regarde la carte la plus haute. Un flop **haut** a pour carte la plus haute un as, un roi ou une dame, par ex. [[Ks 7d 2c]]. Un flop **moyen** a pour carte la plus haute un valet ou un dix, par ex. [[Jh 8c 4d]]. Un flop **bas** a pour carte la plus haute un neuf ou moins, par ex. [[7s 6h 5d]].

## Couleurs

Un flop **{{t:rainbow|rainbow}}** a trois couleurs différentes : personne n'a encore de {{t:flush-draw|tirage couleur}}. Un flop **{{t:two-tone|bicolore}}** a deux cartes de la même couleur, par ex. [[Jh Th 8c]] : deux cartes d'un joueur dans cette couleur donnent un {{t:flush-draw|tirage couleur}}. Un flop **{{t:monotone|monocolore}}** a ses trois cartes de la même couleur, par ex. [[Kh 8h 3h]] : une {{t:flush|couleur}} peut déjà être faite.

## Rangs

Un flop **{{t:paired|pairé}}** a deux cartes du même rang, par ex. [[Qd Qs 6h]]. Personne n'y a de {{t:straight|quinte}} avec deux cartes en main, même si un {{t:straight-draw|tirage quinte}} est parfois possible (par ex. sur Q-Q-9).

Un flop **{{t:connected|connecté}}** a trois rangs différents compris dans cinq rangs consécutifs, donc une {{t:straight|quinte}} est déjà possible : sur [[9h 7d 6c]], par exemple, 85 et T8 font une {{t:straight|quinte}}. L'as compte aussi comme un un, donc [[Ah 5d 3c]] est aussi {{t:connected|connecté}}.

Un flop **{{t:semi-connected|semi-connecté}}** n'a que deux de ses cartes comprises dans cinq rangs consécutifs. Personne n'a encore de {{t:straight|quinte}}, mais quelqu'un peut avoir un {{t:straight-draw|tirage quinte}} (bilatéral ou ventral) : sur [[Kh Qd 4c]], par exemple, JT en a un. Ces flops sont nombreux, car il suffit de deux cartes proches l'une de l'autre.

Un flop **{{t:disconnected|déconnecté}}** a des cartes si éloignées qu'aucune paire de cartes ne tient dans cinq rangs consécutifs, par ex. [[Ks 8d 3c]]. Personne n'y a même un {{t:straight-draw|tirage quinte}}. Ces flops sont rares.

## {{t:dry|Sec}} ou {{t:wet|wet}}

On compte des points d'{{t:wetness|humidité}}, c'est-à-dire à quel point le flop favorise les {{t:draw|tirages}} et les mains fortes en couleur et en {{t:straight|quinte}} :

- une {{t:straight|quinte}} déjà possible de plusieurs façons, c'est-à-dire avec au moins deux combinaisons différentes de deux rangs en main (sur [[9h 8d 7c]], JT, T6 et 65 en font une) : {{n:tex.points.straight.made}} pts,
- une {{t:straight|quinte}} possible d'une seule façon (sur [[Ah Kd Tc]], seule QJ en fait une ; sur [[Ah 4d 2c]], seule 53) : {{n:tex.points.straight.made-one}} pts,
- seulement un {{t:straight-draw|tirage quinte}} (flop {{t:semi-connected|semi-connecté}} ou {{t:paired|pairé}} avec deux cartes proches l'une de l'autre) : {{n:tex.points.straight.draw}} pts,
- deux cartes de la même couleur : {{n:tex.points.suits.two-tone}} pts ; trois cartes de la même couleur : {{n:tex.points.suits.monotone}} pts.

Un flop **{{t:dry|sec}}** a moins de {{n:tex.threshold.medium}} pts, un flop **{{t:wet|wet}}** au moins {{n:tex.threshold.wet}} pts, et un flop **intermédiaire** se situe entre les deux.

| Flop | Couleurs | {{t:straight|Quinte}} | Total | {{t:texture|Texture}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|sec}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|sec}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|sec}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|sec}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | intermédiaire |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | intermédiaire |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|wet}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|wet}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|wet}} |

Une {{t:straight|quinte}} faite pèse plus qu'un simple {{t:draw|tirage}}, car elle change le rapport de force dès maintenant. Une {{t:straight|quinte}} possible de plusieurs façons pèse plus qu'une {{t:straight|quinte}} possible d'une seule : sur [[9h 8d 7c]], beaucoup de mains ont une {{t:straight|quinte}} ou un {{t:oesd|tirage quinte bilatéral}}, alors que sur [[Ah Kd Tc]], seule QJ fait une {{t:straight|quinte}} et personne n'a de {{t:draw|tirage}} bilatéral. C'est pourquoi A-K-T en trois couleurs est intermédiaire, bien qu'il soit {{t:connected|connecté}}.

Le flop {{t:two-tone|bicolore}} [[Kh 7h 2c]] est un flop {{t:dry|sec}} avec un seul {{t:flush-draw|tirage couleur}} : il n'y a ni {{t:straight|quinte}} ni {{t:straight-draw|tirage quinte}}. Un flop {{t:monotone|monocolore}} est toujours {{t:wet|wet}} : sur [[Kh 8h 3h]], plus de mains ont une {{t:flush|couleur}} ou un {{t:flush-draw|tirage couleur}} que de mains n'ont une {{t:straight|quinte}} ou un {{t:oesd|tirage quinte bilatéral}} sur [[9h 8d 7c]].

Sur un flop {{t:dry|sec}}, celui qui mène reste généralement en tête jusqu'à la river. Sur un flop {{t:wet|wet}}, les cartes suivantes changent souvent le rapport de force, donc la meilleure main au flop est moins en sécurité.

:::note D'où viennent ces définitions
Les notions de flop {{t:dry|sec}} et {{t:wet|wet}} viennent de la littérature pokérique : les supports de formation citent comme {{t:dry|secs}} par ex. K-7-2, A-9-4 et A-A-6 en trois couleurs, et comme {{t:wet|wet}} 9-8-7, Q-J-T et T-9-5-4. Les points et les limites exactes, par exemple le fait qu'un flop moyen commence au dix, sont une convention adoptée dans l'application pour que chaque flop puisse être évalué sans ambiguïté. Les sources ne donnent pas de seuils en points et ne tranchent pas la question du nom à donner aux flops ni {{t:dry|secs}} ni {{t:wet|wet}}. Selon cette convention, environ {{n:tex.share.dry}} de tous les flops sont {{t:dry|secs}}, environ {{n:tex.share.medium}} intermédiaires et environ {{n:tex.share.wet}} {{t:wet|wet}} ; c'est un résultat des définitions de l'application, pas un chiffre tiré de la littérature.
:::
