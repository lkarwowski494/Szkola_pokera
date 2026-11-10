---
id: m5.l2
module: m5
order: 2
title: "À qui profite le flop"
sub: "Avantage de range et avantage de nuts"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Flop : [[Ks 7d 2c]]. Qui a l'{{t:range-advantage|avantage de range}} ?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Vous, qui avez {{t:open|ouvert}} depuis le Bouton", correct: true, why: "Oui : votre {{t:range|range}} contient toutes les KK, AK et KQ. La {{t:big-blind|grosse blinde}} aurait relancé les plus fortes d'entre elles avant le flop, et sa défense large se compose surtout de mains qui ont raté ici." }
      - { text: "La {{t:big-blind|grosse blinde}}", why: "Non : la {{t:big-blind|grosse blinde}} a plus de mains faibles, car elle a défendu large. Elle a un roi avec un bon kicker moins souvent que vous." }
      - { text: "Personne, le flop est aléatoire", why: "Le flop est aléatoire, mais les {{t:range|ranges}} ne le sont pas. Un même flop correspond mieux à la {{t:range|range}} qui contient plus de cartes hautes." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Flop : [[7s 6h 5d]]. Avez-vous ici l'{{t:nuts-advantage|avantage de nuts}}, c'est-à-dire nettement plus de mains parmi les plus fortes que l'adversaire ?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "Non : la {{t:big-blind|grosse blinde}} a ici aussi des {{t:straight|quintes}} et des {{t:two-pair|doubles paires}}", correct: true, why: "Exact : la {{t:big-blind|grosse blinde}} défend beaucoup de {{t:connectors|connecteurs}} assortis et de mains avec un six ou un sept, qui touchent ici des {{t:straight|quintes}} et des {{t:two-pair|doubles paires}}. Vos cartes hautes ont raté ici, donc vous n'avez pas nettement plus de mains parmi les plus fortes." }
      - { text: "Oui, car vous avez {{t:open|ouvert}} avant le flop", why: "Non : l'{{t:open|ouverture}} vous donne un avantage sur les flops hauts. Sur un flop bas et {{t:connected|connecté}}, vos cartes hautes ont raté, et la {{t:range|range}} de l'adversaire touche ici des {{t:straight|quintes}} et des {{t:two-pair|doubles paires}}." }
      - { text: "Oui, car vous avez plus de {{t:pair|paires}} hautes", why: "Non : vous avez plus d'{{t:overpair|overpaires}} ({{t:pocket-pair|paires servies}} plus hautes que chaque carte du {{t:board|board}}, p. ex. TT, JJ), mais sur un tel flop, une {{t:overpair|overpaire}} ne fait pas partie des mains les plus fortes : elle perd contre une {{t:straight|quinte}}, un set et une {{t:two-pair|double paire}}." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Pourquoi la {{t:big-blind|grosse blinde}}, qui a seulement {{t:call|suivi}} votre {{t:open|ouverture}}, a-t-elle rarement AA ou AK sur un flop [[Ad 8s 3c]] ?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Parce qu'avec ces mains, elle {{t:raise|relance}} le plus souvent avant le flop (3-bet)", correct: true, why: "Oui : la {{t:big-blind|grosse blinde}} joue ses mains les plus fortes en 3-bet, donc quand elle a seulement {{t:call|suivi}}, sa {{t:range|range}} contient peu des meilleures mains. Vous, vous les avez toutes dans votre {{t:range|range}}." }
      - { text: "Parce que la {{t:big-blind|grosse blinde}} ne joue jamais d'as", why: "Non : la {{t:big-blind|grosse blinde}} défend beaucoup d'as, p. ex. A5 ou A9. Il lui manque surtout les plus forts, qu'elle aurait relancés." }
      - { text: "Parce qu'il y a déjà un as sur le flop", why: "L'as du {{t:board|board}} réduit le nombre de {{t:combo|combinaisons}} d'as dans les deux {{t:range|ranges}}, mais il ne crée pas de différence entre elles. La différence vient des décisions prises avant le flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Vous avez l'{{t:range-advantage|avantage de range}}, mais votre adversaire a autant de mains parmi les plus fortes que vous. Avec quelle taille misez-vous plutôt ?"
    options:
      - { text: "Petit, et souvent", correct: true, why: "Oui : l'{{t:range-advantage|avantage de range}} indique que vous pouvez miser souvent. Sans {{t:nuts-advantage|avantage de nuts}}, une grosse {{t:bet|mise}} risque beaucoup face aux mains les plus fortes de l'adversaire, et les mains plus faibles se {{t:fold|couchent}} de toute façon face à une petite." }
      - { text: "Gros, car vous avez l'avantage", why: "Non : c'est l'{{t:nuts-advantage|avantage de nuts}} qui justifie une grosse taille, c'est-à-dire avoir plus de mains parmi les plus fortes. Ici, vous ne l'avez pas." }
      - { text: "Toujours {{t:check|checker}}", why: "Trop prudent : l'{{t:range-advantage|avantage de range}} est une raison de miser souvent, simplement petit." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Votre {{t:range|range}} contient beaucoup plus de mains parmi les plus fortes que la {{t:range|range}} de l'adversaire. Qu'est-ce que cela vous apporte ?"
    options:
      - { text: "Vous pouvez miser gros, car vous tomberez rarement sur une meilleure main", correct: true, why: "Oui : c'est l'{{t:nuts-advantage|avantage de nuts}}. Une grosse {{t:bet|mise}} tire davantage des mains moyennes de l'adversaire, et une {{t:raise|relance}} venant d'une meilleure main est rare." }
      - { text: "Vous devez toujours miser petit", why: "Non : vous choisissez une petite taille quand vous avez seulement l'{{t:range-advantage|avantage de range}}. L'{{t:nuts-advantage|avantage de nuts}} vous permet de miser plus gros." }
      - { text: "Rien, seule votre main compte", why: "Votre main est importante, mais l'adversaire ne voit que votre {{t:range|range}}. La taille de la {{t:bet|mise}} se choisit de façon à convenir à beaucoup de mains à la fois." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Votre adversaire a deux cartes de rangs différents, p. ex. [[Jc Td]]. Dans quel pourcentage des cas le flop n'apparie-t-il aucune des deux ? Entrez un nombre."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Sur les {{n:cards.unseen.preflop}} cartes inconnues, seules {{n:pair.outs.unpaired}} donnent une {{t:pair|paire}} : les trois valets et les trois dix restants. Le flop compte {{n:cards.board.flop}} cartes, et la probabilité qu'aucune ne fasse partie de ces {{n:pair.outs.unpaired}} est d'environ {{n:flop.miss.unpaired}}. Vous touchez donc une {{t:pair|paire}} seulement dans environ {{n:flop.hit.unpaired}} des cas."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Une main sans {{t:pair|paire}} ne touche pas de {{t:pair|paire}} au flop dans environ {{n:flop.miss.unpaired}} des cas. Qu'est-ce que cela implique pour le c-bet ?"
    options:
      - { text: "L'adversaire n'a souvent rien, donc même une petite {{t:bet|mise}} remporte souvent le {{t:pot|pot}} immédiatement", correct: true, why: "Oui : c'est la base du c-bet. Rater ne signifie pas toujours se {{t:fold|coucher}} (l'adversaire peut avoir un {{t:draw|tirage}} ou des cartes hautes), mais sa {{t:range|range}} contient beaucoup de mains faibles." }
      - { text: "L'adversaire se {{t:fold|couchera}} exactement dans {{n:flop.miss.unpaired}} des cas", why: "Non : un adversaire sans {{t:pair|paire}} {{t:call|suit}} parfois avec un {{t:draw|tirage}} ou une carte haute, et a parfois une {{t:pair|paire}} en main. Ce n'est qu'une approximation de la fréquence à laquelle le flop l'a raté." }
      - { text: "Vous ratez aussi souvent que lui, donc le c-bet n'a pas de sens", why: "Non : vous ratez souvent vous aussi, mais l'adversaire ne sait pas quand. Votre {{t:range|range}} d'{{t:aggressor|agresseur}} (le joueur qui a {{t:raise|relancé}} en dernier avant le flop) est plus forte sur beaucoup de flops, et une {{t:bet|mise}} remporte le {{t:pot|pot}} quand l'adversaire se {{t:fold|couche}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Et dans quel pourcentage des cas le flop apparie-t-il au moins l'une des deux cartes d'une main sans {{t:pair|paire}} ? Entrez un nombre."
    answer: flop.hit.unpaired
    explanation: "C'est le complément du nombre précédent : {{n:prob.certain}} moins {{n:flop.miss.unpaired}} donne environ {{n:flop.hit.unpaired}}, soit à peu près un flop sur trois."
---
Avant le flop, les {{t:range|ranges}} des joueurs sont différentes. Le joueur qui {{t:open|ouvre}} depuis le Bouton a beaucoup de cartes hautes. La {{t:big-blind|grosse blinde}} défend très large, mais elle {{t:raise|relance}} le plus souvent ses mains les plus fortes (AA, KK, AK) : quand elle a seulement {{t:call|suivi}}, elle en a donc peu. Le flop correspond mieux à l'une de ces {{t:range|ranges}}, et c'est ce qui décide qui peut miser souvent.

## {{t:range-advantage|Avantage de range}}

Vous avez l'{{t:range-advantage|avantage de range}} quand, sur un flop donné, vos mains sont en moyenne plus fortes que celles de l'adversaire. Sur [[Ks 7d 2c]], après une {{t:open|ouverture}} depuis le Bouton, c'est vous qui avez le plus de rois avec un bon kicker et le plus de {{t:pair|paires}} hautes. La {{t:big-blind|grosse blinde}} a ici beaucoup de mains qui ont raté.

Sur un flop bas et {{t:connected|connecté}}, p. ex. [[7s 6h 5d]], l'{{t:range-advantage|avantage de range}} disparaît presque. La {{t:big-blind|grosse blinde}} défend beaucoup de {{t:connectors|connecteurs}} assortis et de mains avec un six ou un sept, qui touchent ici des {{t:straight|quintes}} et des {{t:two-pair|doubles paires}}, et vos cartes hautes ont raté.

## {{t:nuts-advantage|Avantage de nuts}}

L'{{t:nuts-advantage|avantage de nuts}}, c'est avoir plus de mains parmi les plus fortes (les « {{t:nuts|nuts}} ») dans sa {{t:range|range}}. L'{{t:range-advantage|avantage de range}} indique à quelle fréquence vous pouvez miser. L'{{t:nuts-advantage|avantage de nuts}} indique combien : quand vous avez beaucoup plus de mains parmi les plus fortes que l'adversaire, vous pouvez miser avec une taille plus grosse. Quand vous avez seulement l'{{t:range-advantage|avantage de range}}, vous misez petit.

## L'adversaire rate le plus souvent

Une main sans {{t:pair|paire}}, p. ex. [[Jc Td]], ne touche pas de {{t:pair|paire}} au flop dans environ {{n:flop.miss.unpaired}} des cas. Sur les {{n:cards.unseen.preflop}} cartes inconnues, seules {{n:pair.outs.unpaired}} apparient ses cartes. Les sources donnent souvent environ {{n:flop.hit.one-pair}} : c'est la probabilité d'exactement une {{t:pair|paire}} ; en comptant la {{t:two-pair|double paire}} et le {{t:three-of-a-kind|brelan}}, la main touche dans environ {{n:flop.hit.unpaired}} des cas. C'est pourquoi une {{t:bet|mise}} au flop remporte souvent le {{t:pot|pot}} immédiatement, même quand vous n'avez rien touché vous-même. Rater ne signifie pas toujours se {{t:fold|coucher}} : l'adversaire peut avoir un {{t:draw|tirage}} ou deux cartes hautes.

:::note D'où viennent ces principes
Les notions d'{{t:range-advantage|avantage de range}} et d'{{t:nuts-advantage|avantage de nuts}} viennent de supports de théorie des jeux fondés sur les résultats de solveurs (un glossaire des notions et un article sur les tailles de c-bet). Les nombres de cette leçon sont des calculs exacts de l'application.
:::
