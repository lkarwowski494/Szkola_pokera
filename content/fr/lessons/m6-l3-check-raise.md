---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Quand relancer un c-bet, et à combien"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} 1/3 du {{t:pot}} en c-bet. Que faites-vous ?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Une {{t:two-pair|double paire}} sur un flop bas et {{t:connected|connecté}} est une main à jouer {{t:value|pour la value}}. Sur ces flops, la {{t:big-blind|grosse blinde}} a dans sa {{t:range|range}} des {{t:straight|quintes}} et des {{t:two-pair|doubles paires}}, et le Bouton n'a pas l'{{t:nuts-advantage|avantage de nuts}}. En {{t:raise|relançant}}, vous construisez le {{t:pot}} et faites payer les {{t:pair|paires}} et les {{t:draw|tirages}}." }
      - { text: "{{t:call|Suivre}}", correct: true, why: "Bien aussi : sur un flop très {{t:connected|connecté}}, le solveur se contente de {{t:call|suivre}} avec une partie des {{t:two-pair|doubles paires}}. Le check-raise construit plus souvent le {{t:pot}} et protège la main." }
      - { text: "{{t:fold|Se coucher}}", why: "Une {{t:two-pair|double paire}} est l'une des mains les plus fortes sur ce flop. {{t:fold|Se coucher}} est une grosse erreur." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Le {{t:pot}} est de {{n:ex.third.pot}}, et le Bouton {{t:bet|mise}} {{n:ex.third.bet}} en c-bet. Vous avez un set et voulez faire un check-raise. À combien {{t:raise|relancez-vous}} ?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "À {{n:xr.example}}", correct: true, why: "Cela fait {{n:xr.mult.example}} le c-bet. Le Bouton doit ajouter {{n:xr.example.extra}} et a besoin d'environ {{n:eq.vs-xr.example}} d'équité : les {{t:pair|paires}} inférieures et les {{t:draw|tirages}} faibles (gutshot) n'ont pas la cote, tandis que les tirages {{t:flush|couleur}} et les {{t:oesd|tirages quinte bilatéraux}} paieront dans un {{t:pot}} déjà gros." }
      - { text: "À {{n:xr.too-small}}", sizeError: true, why: "Bonne action, mais taille trop petite : le Bouton n'ajoute que {{n:xr.too-small.extra}} et a besoin d'environ {{n:eq.vs-xr.too-small}} d'équité. Le moindre {{t:flush-draw|tirage couleur}} ou tirage {{t:straight|quinte}} paiera presque gratuitement." }
      - { text: "{{t:call|Suivre}}", why: "Sur un flop avec deux cœurs et des cartes de {{t:straight|quinte}}, vous perdez de la valeur et de la protection : beaucoup de cartes au turn arrêteront l'action ou battront votre main. Un set veut construire le {{t:pot}} tout de suite." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Le {{t:pot}} est de {{n:ex.third.pot}}, et le Bouton {{t:bet|mise}} {{n:ex.third.bet}} en c-bet. Vous faites un check-raise à {{n:xr.mult.example}} le c-bet. À combien {{t:raise|relancez-vous}} ? Saisissez le nombre de {{t:chips|jetons}}."
    table: { position: BB }
    answer: xr.example
    explanation: "Le c-bet est de {{n:ex.third.bet}}, donc {{n:xr.mult.example}} le c-bet, c'est {{n:xr.example}}. La taille du check-raise se calcule à partir du c-bet, pas du {{t:pot}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Le {{t:pot}} était de {{n:ex.third.pot}}, le Bouton a {{t:bet|misé}} {{n:ex.third.bet}}, et vous avez {{t:raise|relancé}} à {{n:xr.example}}. De quel pourcentage d'équité le Bouton a-t-il besoin pour {{t:call|suivre}} ? Saisissez le nombre."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "Le Bouton ajoute {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}. Le {{t:pot}} est alors de {{n:xr.example.pot-after}}, et après qu'il a {{t:call|suivi}}, de {{n:xr.example.extra}} de plus. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Le {{t:pot}} était de {{n:ex.third.pot}}, le Bouton a {{t:bet|misé}} {{n:ex.third.bet}}, et vous n'avez {{t:raise|relancé}} qu'à {{n:xr.too-small}}. De combien d'équité le Bouton a-t-il besoin pour {{t:call|suivre}} ?"
    table: { position: BB }
    options:
      - { text: "Environ {{n:eq.vs-xr.too-small}}", correct: true, why: "Il ajoute {{n:xr.too-small.extra}} dans un {{t:pot}} de {{n:xr.too-small.pot-after}} : {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. À ce prix-là, il paiera avec presque n'importe quelle main ; c'est pourquoi la {{t:raise|relance}} doit être plusieurs fois plus grosse que le c-bet." }
      - { text: "Environ {{n:eq.vs-xr.example}}", why: "C'est ce dont il aurait besoin face à une {{t:raise|relance}} à {{n:xr.example}}. À {{n:xr.too-small}}, il n'ajoute que {{n:xr.too-small.extra}}." }
      - { text: "Environ {{n:eq.bet-third}}", why: "C'est ce dont vous aviez besoin pour {{t:call|suivre}} le c-bet. Après le check-raise, vous calculez le prix du Bouton : il ajoute {{n:xr.too-small.extra}} dans un {{t:pot}} de {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} 1/3 du {{t:pot}} en c-bet. Que faites-vous ?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Un {{t:draw|tirage}} à la meilleure {{t:flush|couleur}} est un bon {{t:semi-bluff}} : vous gagnez quand le Bouton {{t:fold|se couche}}, et s'il paie, vous avez encore {{n:outs.flush}} outs (environ {{n:odds.flush.flop-turn}} au turn)." }
      - { text: "{{t:call|Suivre}}", correct: true, why: "Bien aussi : vous touchez la {{t:flush|couleur}} au turn dans environ {{n:odds.flush.flop-turn}} des cas, presque autant que le prix de {{n:eq.bet-third}}, et quand vous touchez la meilleure {{t:flush|couleur}}, vous gagnez davantage (cotes implicites). Les {{t:draw|tirages}} forts se jouent des deux façons, pour que votre check-raise ne représente pas uniquement des mains fortes." }
      - { text: "{{t:fold|Se coucher}}", why: "Grosse erreur : avec {{n:outs.flush}} outs, vous touchez la meilleure {{t:flush|couleur}} au turn dans environ {{n:odds.flush.flop-turn}} des cas, presque autant que le prix de {{n:eq.bet-third}}, et quand vous touchez, vous gagnez davantage (cotes implicites). En plus, vous pouvez faire un check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} 1/3 du {{t:pot}} en c-bet. Que faites-vous ?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Un {{t:oesd|tirage quinte bilatéral}} ({{n:outs.oesd}} outs) face à un petit c-bet, qui offre une occasion bon marché de {{t:raise|relancer}}. En {{t:raise|relançant}}, vous pouvez gagner tout de suite, et si vous êtes {{t:call|suivi}}, vous pouvez encore toucher." }
      - { text: "{{t:call|Suivre}}", correct: true, why: "Bien aussi : vous touchez la {{t:straight|quinte}} au turn dans environ {{n:odds.oesd.flop-turn}} des cas, un peu moins que le prix de {{n:eq.bet-third}}, mais quand vous touchez, vous gagnez davantage (cotes implicites), et si personne ne {{t:bet|mise}} au turn, vous voyez aussi la river gratuitement. Vous {{t:call|suivez}} avec une partie des {{t:draw|tirages}} forts, pour que les mains avec lesquelles vous {{t:call|suivez}} ne soient pas toutes faibles." }
      - { text: "{{t:fold|Se coucher}}", why: "Trop serré : avec {{n:outs.oesd}} outs, vous touchez la {{t:straight|quinte}} au turn dans environ {{n:odds.oesd.flop-turn}} des cas, à peine moins que le prix de {{n:eq.bet-third}} ; les cotes implicites et la chance d'une river gratuite font le reste. En plus, vous pouvez faire un check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} 1/3 du {{t:pot}} en c-bet. Que faites-vous ?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "Une {{t:top-pair|top paire}} avec un kicker faible est une main pour {{t:call|suivre}}. Elle bat les {{t:bluff|bluffs}} du Bouton, et en {{t:call|suivant}}, vous les maintenez dans le coup." }
      - { text: "Check-raise", why: "En général, vous {{t:call|suivez}}. Après une {{t:raise|relance}}, ce sont surtout des mains meilleures et des {{t:draw|tirages}} qui vous paient ; le check-raise avec une telle main est un coup rare du solveur face aux petits c-bets." }
      - { text: "{{t:fold|Se coucher}}", why: "Une {{t:top-pair|top paire}} face à un petit c-bet, c'est nettement trop fort pour {{t:fold|se coucher}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Vous défendez la {{t:big-blind|grosse blinde}} contre l'{{t:open|ouverture}} du Bouton. Au flop, vous {{t:check|checkez}}, et le Bouton {{t:bet|mise}} 1/3 du {{t:pot}} en c-bet. Que faites-vous ?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Se coucher}}", correct: true, why: "Vous n'avez ni {{t:pair|paire}} ni {{t:flush-draw|tirage couleur}} ; vous n'avez qu'un faible {{t:straight-draw|tirage quinte}} backdoor (il vous faut deux cartes précises), et aucune de vos cartes n'est plus haute que le board. Sur les flops avec un as, vous vous {{t:fold|couchez}} plus souvent avec ce genre de mains." }
      - { text: "Check-raise en {{t:bluff}}", why: "Les {{t:bluff|bluffs}} en check-raise se font surtout avec des {{t:draw|tirages}} (tirages {{t:flush|couleur}}, {{t:oesd|tirages quinte bilatéraux}}) qui gagnent aussi quand ils touchent. Cette main n'a qu'un faible {{t:draw|tirage}} backdoor, et le Bouton a ici beaucoup d'as et de rois qui ne {{t:fold|se coucheront}} pas." }
      - { text: "{{t:call|Suivre}}", why: "Le prix est bon, mais cette main ne touchera presque rien : même une {{t:pair|paire}} de six ou de cinq perd contre la plupart des mains avec lesquelles le Bouton continuera de payer." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Face à quel c-bet du Bouton faites-vous un check-raise plus souvent ?"
    table: { position: BB }
    options:
      - { text: "1/4 du {{t:pot}}", correct: true, why: "Un petit c-bet offre une occasion bon marché de {{t:raise|relancer}}, et le Bouton {{t:bet|mise}} ainsi avec une {{t:range|range}} large contenant beaucoup de mains faibles. Face à un gros c-bet, vous {{t:raise|relancez}} moins souvent et plus serré : surtout des sets et des {{t:two-pair|doubles paires}}, moins de {{t:bluff|bluffs}}." }
      - { text: "Tout le {{t:pot}}", why: "Face à un gros c-bet, la {{t:raise|relance}} coûte cher, et la {{t:range|range}} du Bouton est plus forte. Vous {{t:call|suivez}} ou vous vous {{t:fold|couchez}} plus souvent." }
      - { text: "Aussi souvent", why: "Face aux petits c-bets, vous {{t:raise|relancez}} plus souvent et plus large ; face aux gros, moins souvent, surtout avec les mains les plus fortes." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Vous jouez contre un Bouton qui ne {{t:fold|se couche}} presque jamais au flop. Il {{t:bet|mise}} 1/3 du {{t:pot}} en c-bet. Que faites-vous ?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "Avec un gutshot et une carte haute, {{t:call|suivre}} est un bon choix au prix de {{n:eq.bet-third}}. Un check-raise en {{t:bluff}} rapporte quand l'adversaire {{t:fold|se couche}}, or celui-ci ne {{t:fold|se couche}} presque jamais, donc la {{t:raise|relance}} perd son principal atout." }
      - { text: "Check-raise", why: "Les {{t:bluff|bluffs}} en check-raise se font surtout avec des {{t:draw|tirages}} forts, et un gutshot n'en fait pas partie. En plus, un {{t:bluff}} rapporte quand l'adversaire {{t:fold|se couche}}, or celui-ci ne {{t:fold|se couche}} presque jamais : contre lui, vous {{t:raise|relancez}} surtout {{t:value|pour la value}}." }
      - { text: "{{t:fold|Se coucher}}", why: "Trop serré : un {{t:draw|tirage}} avec une carte haute se défend à un si bon prix, quel que soit votre adversaire." }
---
Le check-raise, c'est un {{t:check}}, puis une {{t:raise|relance}} de la {{t:bet|mise}} adverse. Depuis la {{t:big-blind|grosse blinde}}, c'est une arme importante face aux c-bets (la plupart du temps, vous choisissez de toute façon entre {{t:call|suivre}} et vous {{t:fold|coucher}}) : sans elle, le Bouton pourrait faire un c-bet à moindre coût avec presque n'importe quelle main.

## Pourquoi {{t:raise|relancer}}

Vous faites un check-raise pour deux raisons :

- **{{t:value|pour la value}}** : vous avez une main très forte ({{t:two-pair|double paire}}, set) et voulez construire le {{t:pot}},
- **en {{t:semi-bluff}}** : vous avez un {{t:draw|tirage}} ({{t:flush|couleur}}, {{t:oesd|tirage quinte bilatéral}}) qui gagne de deux façons : quand le Bouton {{t:fold|se couche}} ou quand vous touchez.

Avec les mains moyennes, par exemple une {{t:top-pair|top paire}} avec un kicker faible, vous {{t:call|suivez}} en général : après une {{t:raise|relance}}, les mains plus faibles du Bouton {{t:fold|se coucheront}} plus souvent, et les meilleures paieront. C'est une simplification : face aux petits c-bets, le solveur {{t:raise|relance}} aussi une partie des {{t:top-pair|top paires}} et des {{t:pair|paires}} faibles pour se protéger. À l'inverse, avec une {{t:two-pair|double paire}} sur un flop très {{t:connected|connecté}}, le solveur se contente souvent de {{t:call|suivre}}.

## Quand plus souvent

- **Face à un petit c-bet.** La {{t:raise|relance}} coûte peu, et le Bouton {{t:bet|mise}} petit avec une {{t:range|range}} large. Face à un gros c-bet, vous {{t:raise|relancez}} moins souvent et plus serré : surtout des sets et des {{t:two-pair|doubles paires}}, moins de {{t:bluff|bluffs}}.
- **Sur les flops bas et {{t:connected|connectés}}** (p. ex. [[7h 6d 5s]]). La {{t:big-blind|grosse blinde}} défend beaucoup de mains basses, qui touchent ici des {{t:straight|quintes}} et des {{t:two-pair|doubles paires}}, donc le Bouton n'a pas ici l'{{t:nuts-advantage|avantage de nuts}}.
- **Moins souvent sur les flops hauts favorables au Bouton**, p. ex. K-J-T ou A-A-K : là, c'est lui qui a le plus de mains très fortes.

## Quelle taille

La taille du check-raise se calcule à partir du c-bet. Exemple : le {{t:pot}} est de {{n:ex.third.pot}}, le c-bet de {{n:ex.third.bet}}. Un check-raise à {{n:xr.mult.example}} le c-bet, c'est une {{t:raise|relance}} à {{n:xr.example}} : le Bouton ajoute {{n:xr.example.extra}} et a besoin d'environ **{{n:eq.vs-xr.example}}** d'équité. Une {{t:raise|relance}} à seulement {{n:xr.too-small}} lui donne un prix d'environ **{{n:eq.vs-xr.too-small}}** : il paiera avec presque n'importe quelle main ayant le moindre {{t:draw|tirage}}. C'est pourquoi vous {{t:raise|relancez}} à environ {{n:xr.mult.low}}–{{n:xr.mult.example}} le c-bet, d'autant plus que le c-bet est petit, et non au minimum.

:::note Un adversaire qui ne {{t:fold|se couche}} pas
Un {{t:bluff}} en check-raise rapporte quand l'adversaire {{t:fold|se couche}} (souvenez-vous de l'alpha de la première leçon). Face à un joueur qui ne {{t:fold|se couche}} presque jamais au flop, vous {{t:raise|relancez}} surtout {{t:value|pour la value}}, et gardez vos {{t:bluff|bluffs}} pour les {{t:draw|tirages}} les plus forts.
:::
