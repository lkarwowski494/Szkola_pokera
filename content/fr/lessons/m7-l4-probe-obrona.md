---
id: m7.l4
module: m7
order: 4
title: "Probe bet et défense"
sub: "Quand l'adversaire checke ou mise une deuxième fois"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Le Bouton a {{t:open|ouvert}}, vous avez {{t:call|suivi}} de la {{t:big-blind|grosse blinde}}. Au flop, vous checkez tous les deux. Au turn, vous misez en premier. Comment s'appelle cette {{t:bet|mise}} ?"
    table: { position: BB }
    options:
      - { text: "Probe bet", correct: true, why: "Oui : un probe bet est une {{t:bet|mise}} {{t:out-of-position|hors de position}} au turn, après que l'{{t:aggressor|agresseur}} préflop n'a pas fait de c-bet et a {{t:check|checké}}." }
      - { text: "C-bet", why: "Le c-bet est {{t:bet|misé}} par le joueur qui a {{t:raise|relancé}} avant le flop. Vous avez seulement {{t:call|suivi}}." }
      - { text: "Check-raise", why: "Le check-raise, c'est un {{t:check}}, puis une {{t:raise|relance}} de la {{t:bet|mise}} adverse. Ici, vous misez en premier, vous ne {{t:raise|relancez}} personne." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Pourquoi, après le {{t:check|check}} du Bouton au flop, pouvez-vous miser au turn plus souvent que d'habitude ?"
    table: { position: BB }
    options:
      - { text: "Parce qu'avec beaucoup de mains fortes le Bouton aurait misé, donc après un {{t:check|check}} il en a moins", correct: true, why: "Oui : les mains fortes font généralement un c-bet. Après un {{t:check|check}}, la {{t:range|range}} du Bouton contient davantage de mains moyennes et faibles, et vous pouvez l'attaquer par une {{t:bet|mise}}." }
      - { text: "Parce qu'un {{t:check}} signifie toujours que le Bouton n'a rien", why: "Pas toujours : le Bouton {{t:check|checke}} parfois avec une main forte pour vous piéger. Il en a toutefois moins que lorsqu'il mise." }
      - { text: "Parce qu'au turn, c'est vous qui avez la {{t:position|position}}", why: "Non : le Bouton parle après vous à chaque {{t:street|street}}. Le probe bet, vous le {{t:bet|misez}} {{t:out-of-position|hors de position}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Le Bouton a {{t:check|checké}} au flop. Sur quel {{t:board|board}} {{t:bet|misez}}-vous plus souvent en probe bet depuis la {{t:big-blind|grosse blinde}} ?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Oui : les cartes basses touchent plus souvent la large défense de la {{t:big-blind|grosse blinde}} (petites {{t:pair|paires}}, {{t:connectors|connecteurs}}), et après un {{t:check|check}} le Bouton a rarement une main forte ici." }
      - { text: "[[Ac Kd 8h Js]]", why: "Sur un {{t:board|board}} haut, c'est le Bouton qui a l'{{t:range-advantage|avantage de range}} : beaucoup de ses as et de ses rois ont touché. Ici, vous {{t:bet|misez}} moins souvent en probe bet." }
      - { text: "Aussi souvent sur les deux", why: "La {{t:texture|texture}} compte, comme pour le c-bet en M5 : sur les boards bas, vous misez plus souvent, sur les boards hauts, moins souvent." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Vous défendez la {{t:big-blind}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous avez tous les deux {{t:check|checké}}. Le turn est un trois. Vous parlez en premier. Que faites-vous ?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Je mise (probe bet)", correct: true, why: "Vous avez un {{t:oesd}} (un quatre ou un neuf) sur un {{t:board|board}} bas qui convient à votre {{t:range|range}}. Vous gagnez si le Bouton {{t:fold|se couche}}, et s'il {{t:call|suit}}, vous avez encore {{n:outs.oesd}} outs." }
      - { text: "{{t:check|Je checke}}", correct: true, why: "Bien aussi : avec un {{t:draw|tirage}}, vous pouvez voir la river gratuitement si le Bouton {{t:check|checke}} aussi. Le probe bet est toutefois généralement meilleur, car après un {{t:check|check}} au flop le Bouton a une {{t:range}} faible, et vous avez un {{t:semi-bluff}} fort." }
      - { text: "{{t:fold|Je me couche}}", why: "Personne n'a {{t:bet|misé}}, vous pouvez donc {{t:check|checker}} gratuitement (règle du module 1). {{t:fold|Se coucher}}, c'est abandonner le {{t:pot|pot}} sans raison." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Vous défendez la {{t:big-blind}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous avez tous les deux {{t:check|checké}}. Le turn est un trois. Vous parlez en premier. Que faites-vous ?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Je mise (probe bet)", correct: true, why: "La {{t:top-pair|top paire}} est une bonne main pour un probe bet : les {{t:pair|paires}} plus faibles et les cartes hautes du Bouton vous paieront, et par une {{t:bet|mise}} vous ne leur donnez pas de carte gratuite." }
      - { text: "{{t:check|Je checke}}", why: "Après un {{t:check|check}} au flop, le Bouton a souvent des cartes hautes sans {{t:pair|paire}}. S'il {{t:check|checke}} encore, il reçoit une carte gratuite qui peut vous battre, et vous ne gagnez rien sur ses mains plus faibles." }
      - { text: "{{t:fold|Je me couche}}", why: "Personne n'a {{t:bet|misé}}, vous pouvez donc {{t:check|checker}} gratuitement. Et avec une {{t:top-pair|top paire}}, vous voulez miser." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Vous défendez la {{t:big-blind}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous avez tous les deux {{t:check|checké}}. Le turn est un valet. Vous parlez en premier. Que faites-vous ?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "{{t:check|Je checke}}", correct: true, why: "Vous n'avez ni {{t:pair|paire}} ni {{t:draw|tirage}}, et le {{t:board}} haut favorise la {{t:range|range}} du Bouton. Un probe bet sans outs sur un tel {{t:board|board}} ne gagne que si le Bouton {{t:fold|se couche}}, et il a ici beaucoup d'as, de rois et de valets." }
      - { text: "Je mise (probe bet)", why: "Vous {{t:bet|misez}} en probe bet plus souvent sur les boards bas et avec des mains qui ont une {{t:pair|paire}} ou des outs. Ici, vous n'avez ni l'un ni l'autre." }
      - { text: "{{t:fold|Je me couche}}", why: "Vous pouvez {{t:check|checker}} gratuitement, donc {{t:fold|se coucher}} ne rapporte rien (règle du module 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Vous défendez la {{t:big-blind}}. Vous avez {{t:call|suivi}} le c-bet du Bouton au flop. Le turn est un deux, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} {{n:ex.bet.three-quarters}} dans un {{t:pot|pot}} de {{n:ex.pot}}. Que faites-vous ?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "{{t:fold|Je me couche}}", correct: true, why: "Vous n'avez qu'un gutshot (un valet) : env. {{n:odds.gutshot.turn-river}} à la river, alors qu'il vous faut {{n:eq.bet-three-quarters}}. Sans {{t:pair|paire}} et avec une seule carte à venir, cette main ne se défend pas contre un {{t:second-barrel|second barrel}}." }
      - { text: "{{t:call|Je suis}}", why: "Le prix est plusieurs fois supérieur à vos chances : {{n:eq.bet-three-quarters}} contre env. {{n:odds.gutshot.turn-river}}. Les implied odds ne couvriront pas un tel écart." }
      - { text: "Check-raise", why: "Un {{t:second-barrel|second barrel}} représente une {{t:range}} plus forte qu'un c-bet : le Bouton a plus souvent un roi ou une meilleure main qui ne {{t:fold|se couchera}} pas. Avec {{n:outs.gutshot}} outs, c'est un {{t:bluff}} coûteux." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Vous défendez la {{t:big-blind}}. Vous avez {{t:call|suivi}} le c-bet du Bouton au flop. Le turn est un roi, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} seulement {{n:ex.bet.quarter}} dans un {{t:pot|pot}} de {{n:ex.pot}}. Que faites-vous ?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "{{t:call|Je suis}}", correct: true, why: "Vous avez un {{t:oesd}} (un valet ou un six) : env. {{n:odds.oesd.turn-river}}. La petite mise n'exige que {{n:eq.bet-quarter}}, soit presque exactement autant, et si vous touchez, vous pouvez encore gagner à la river." }
      - { text: "{{t:fold|Je me couche}}", why: "Avec une mise aussi petite, le prix est presque égal à vos chances ({{n:eq.bet-quarter}} contre env. {{n:odds.oesd.turn-river}}), et les implied odds font pencher la décision vers {{t:call|suivre}}." }
      - { text: "{{t:raise|Je relance}} all-in", why: "Vous risquez tout votre tapis avec une main qui n'a encore rien, et le Bouton ne {{t:fold|se couchera}} pas avec un roi. À un aussi bon prix, il suffit de {{t:call|suivre}}." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Vous défendez la {{t:big-blind}}. Vous avez {{t:call|suivi}} le c-bet du Bouton au flop. Le turn est un cinq, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} {{n:ex.bet.three-quarters}} dans un {{t:pot|pot}} de {{n:ex.pot}}. Que faites-vous ?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "{{t:call|Je suis}}", correct: true, why: "Une {{t:top-pair|top paire}}, c'est trop pour {{t:fold|se coucher}} sur une carte blanche : elle bat les {{t:semi-bluff|semi-bluffs}} et les rois plus faibles. Il vous faut {{n:eq.bet-three-quarters}}, et face à la {{t:range|range}} d'un {{t:second-barrel|second barrel}}, une telle {{t:pair|paire}} a généralement autant." }
      - { text: "{{t:fold|Je me couche}}", why: "Trop serré. Le {{t:second-barrel|second barrel}} est plus fort qu'un c-bet, mais le Bouton le {{t:bet|mise}} aussi avec des {{t:draw|tirages}} et des {{t:bluff|bluffs}}. La {{t:top-pair|top paire}} les bat tous." }
      - { text: "{{t:raise|Je relance}}", why: "Après une {{t:raise|relance}}, les mains moins bonnes {{t:fold|se couchent}}, tandis que les meilleurs rois et les sets paient. Une {{t:top-pair|top paire}} avec un kicker moyen n'est pas une main pour {{t:raise|relancer}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Pourquoi défendez-vous plus serré contre un {{t:second-barrel|second barrel}} que contre un c-bet au flop ?"
    table: { position: BB }
    options:
      - { text: "Parce que l'adversaire {{t:bet|mise}} le {{t:second-barrel|second barrel}} avec une {{t:range|range}} plus étroite et généralement une taille plus grande, et que les {{t:draw|tirages}} n'ont plus qu'une carte", correct: true, why: "Oui : l'adversaire abandonne une partie de ses {{t:bluff|bluffs}} au turn, une mise plus grosse fait baisser la {{t:mdf}} (à 3/4 du {{t:pot|pot}} : {{n:mdf.bet-three-quarters}}), et vos {{t:draw|tirages}} perdent la moitié de leurs chances. Vous {{t:fold|couchez}} les {{t:pair|paires}} faibles et les mains sans outs plus souvent qu'au flop." }
      - { text: "Parce qu'au turn, il faut économiser ses {{t:chips}}", why: "Ce qui compte, c'est l'{{t:expected-value}} de chaque décision, pas l'économie. Vous défendez plus serré parce que l'adversaire mise avec des mains plus fortes." }
      - { text: "Non, vous défendez plus large, car vous avez déjà mis beaucoup de {{t:chips|jetons}}", why: "Ce que vous avez déjà mis ne revient pas. Vous décidez en fonction du prix actuel et de la force de la {{t:range|range}} adverse." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. L'adversaire {{t:bet|mise}} {{n:ex.bet.three-quarters}} dans un {{t:pot|pot}} de {{n:ex.pot}}. Quelle est la {{t:mdf}} ? Saisissez le nombre en pourcentage."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + mise) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. Dans un exemple publié au turn, le solveur défendait en moyenne près de la {{t:mdf}} ; {{t:out-of-position|hors de position}}, il arrive que vous défendiez moins (au flop comme au turn). Quand vous savez que l'adversaire {{t:bluff|bluffe}} moins souvent, vous vous {{t:fold|couchez}} plus souvent (le calcul est en M8, dans la leçon sur la façon d'attraper les {{t:bluff|bluffs}})."
---
Au turn, vous rencontrerez deux nouvelles situations : le Bouton n'a pas fait de c-bet et a {{t:check|checké}}, ou il a fait un c-bet et mise une deuxième fois. Dans la première, vous pouvez attaquer vous-même ; dans la seconde, vous défendez plus serré qu'au flop.

## Probe bet

Le probe bet est une {{t:bet|mise}} {{t:out-of-position|hors de position}} au turn, après que l'{{t:aggressor|agresseur}} préflop a {{t:check|checké}} au flop. Avec beaucoup de mains fortes, le Bouton aurait fait un c-bet, donc après un {{t:check|check}} il en a moins. Sa {{t:range}} est plus faible et vous pouvez l'attaquer.

- **Plus souvent sur les boards bas**, p. ex. [[8c 5d 2s 3h]] : les cartes basses touchent votre large défense.
- **Moins souvent sur les boards hauts**, p. ex. [[Ac Kd 8h Js]] : l'{{t:range-advantage}} reste du côté du Bouton.

## Avec quoi faire un probe bet

- **Les {{t:pair|paires}}** qui veulent être payées par les cartes hautes du Bouton et ne veulent pas lui donner de carte gratuite,
- **les {{t:draw|tirages}} forts**, qui gagnent de deux façons.

Les mains sans {{t:pair|paire}} et sans outs {{t:check|checkent}}.

## Se défendre contre un {{t:second-barrel|second barrel}}

Quand vous avez {{t:call|suivi}} un c-bet et que le Bouton mise une deuxième fois, sa {{t:range}} est plus étroite et plus forte qu'au flop : il a abandonné une partie de ses {{t:bluff|bluffs}}. Vos {{t:draw|tirages}} n'ont plus qu'une carte. Par conséquent :

- les {{t:draw|tirages}} ne {{t:call|suivent}} qu'à un bon prix ou avec des implied odds (leçon précédente),
- les mains sans outs et les {{t:pair|paires}} les plus faibles {{t:fold|se couchent}} plus souvent,
- la {{t:top-pair}} {{t:call|suit}} généralement encore.

La {{t:mdf}} reste le point de référence : face à une mise de 3/4 du {{t:pot|pot}}, elle vaut {{n:mdf.bet-three-quarters}}. Dans un exemple publié au turn, le solveur défendait en moyenne près de cette valeur ; {{t:out-of-position|hors de position}}, il arrive que vous défendiez moins. Vous défendez aussi moins lorsque l'adversaire {{t:bluff|bluffe}} moins souvent que ne le suppose la {{t:mdf}}.

:::note D'où viennent ces règles
Les règles du probe bet et de la défense contre un {{t:second-barrel|second barrel}} sont des heuristiques issues de supports de formation et d'analyses de solvers. La défense au turn proche de la {{t:mdf}} est illustrée par un exemple de solveur publié. L'application n'indique pas de fréquences en pourcentage, car les sources diffèrent selon le board. Les chiffres sur les mains avec lesquelles les joueurs de micro-limites {{t:bet|misent}} en probe bet exigent une source décrivant la population (échantillon, {{t:stakes|limites}}, sites), c'est pourquoi ils ne figurent pas ici.
:::
