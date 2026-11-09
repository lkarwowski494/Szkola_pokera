---
id: m7.l3
module: m7
order: 3
title: "Tirages et implied odds"
sub: "Combien il vous faut gagner ensuite"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "Au flop, vous aviez environ {{n:odds.flush.flop-river}} de chances de toucher une {{t:flush|couleur}} d'ici la river. Le turn ne vous a pas aidé. Combien avez-vous maintenant ?"
    options:
      - { text: "Environ {{n:odds.flush.turn-river}}", correct: true, why: "Oui : il reste une carte. {{n:outs.flush}} outs sur {{n:cards.unseen.turn}} cartes inconnues, cela fait {{n:odds.flush.turn-river}}, à peu près la moitié de vos chances au flop." }
      - { text: "Toujours environ {{n:odds.flush.flop-river}}, car le nombre d'outs est le même", why: "Le nombre d'outs est le même, mais il reste moins de cartes à dévoiler. {{n:odds.flush.flop-river}} compte deux cartes, et au turn il n'en reste qu'une." }
      - { text: "Impossible de le calculer sans calculatrice", why: "C'est possible : la règle du 2 et du 4 vue en M2. Une seule carte, donc outs × 2 : environ {{n:odds.flush.rule-turn}}. Exactement {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. Combien d'outs avez-vous pour une {{t:flush|couleur}} ou une {{t:straight|quinte}} ? Saisissez un nombre."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Pour la {{t:flush|couleur}}, {{n:outs.flush}} cœurs ; pour la {{t:straight|quinte}}, chaque dame et chaque sept, soit {{n:outs.oesd}} cartes. La dame de cœur et le sept de cœur sont déjà comptés dans la couleur, donc vous retirez {{n:draw.combo.overlap}} : {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. Le {{t:pot}} contient {{n:ex.pot}}, votre adversaire {{t:bet|mise}} {{n:ex.bet.three-quarters}}. Que faites-vous ?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "Vous avez {{n:outs.combo}} outs, soit environ {{n:odds.combo.turn-river}} à la river. Il vous faut {{n:eq.bet-three-quarters}}, donc {{t:call|suivre}} est rentable même sans implied odds." }
      - { text: "{{t:fold|Se coucher}}, car un {{t:draw|tirage}} au turn ne suffit pas", why: "Avec un simple {{t:draw|tirage}}, à ce prix, il faut effectivement {{t:fold|se coucher}}, mais le tirage {{t:flush|couleur}} combiné au tirage {{t:straight|quinte}} donne environ {{n:odds.combo.turn-river}}, plus que les {{n:eq.bet-three-quarters}} nécessaires." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Le {{t:pot}} contient {{n:ex.third.pot}}, votre adversaire {{t:bet|mise}} {{n:io.flush.bet}}. Vous avez un {{t:flush-draw|tirage couleur}} : {{n:outs.flush}} outs sur {{n:cards.unseen.turn}} cartes. Combien de {{t:chips|jetons}} devez-vous gagner en plus à la river quand vous touchez pour que {{t:call|suivre}} soit à l'équilibre ? Saisissez un nombre."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Il vous faut {{n:io.flush.eq}} d'équité, et vous en avez environ {{n:odds.flush.turn-river}}. Sur {{n:cards.unseen.turn}} rivers possibles, vous touchez {{n:outs.flush}} fois et vous ratez {{n:miss.flush.turn}} fois, en perdant {{n:io.flush.bet}} à chaque fois. Chaque carte gagnante doit donc rapporter {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}}. Le {{t:pot}} contient {{n:io.flush.pot-after-bet}}, il manque {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Le {{t:pot}} contient {{n:io.oesd.pot}}, votre adversaire {{t:bet|mise}} {{n:io.oesd.bet}}. Vous avez un {{t:oesd|tirage quinte par les deux bouts}} : {{n:outs.oesd}} outs, {{n:miss.oesd.turn}} cartes qui ne touchent pas. Combien devez-vous gagner en plus à la river quand vous touchez ?"
    options:
      - { text: "Environ {{n:io.oesd.extra}}", correct: true, why: "Chaque carte gagnante doit rapporter {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}}. Le {{t:pot}} contient {{n:io.oesd.pot-after-bet}}, donc il manque {{n:io.oesd.extra}}." }
      - { text: "Environ {{n:io.oesd.need}}", why: "C'est ce que vous devez gagner au total à chaque fois que vous touchez. Une partie se trouve déjà dans le {{t:pot}} ({{n:io.oesd.pot-after-bet}}), donc il manque encore {{n:io.oesd.extra}}." }
      - { text: "Rien, le prix suffit", why: "Il vous faut {{n:eq.bet-half}} d'équité, et vous avez environ {{n:odds.oesd.turn-river}}. Le {{t:pot}} seul ne suffit pas, il manque {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Le {{t:pot}} contient {{n:ex.third.pot}}, votre adversaire {{t:bet|mise}} {{n:io.flush.bet}}. Il vous reste encore {{n:io.flush.stack}} chacun, et votre adversaire paie volontiers avec une {{t:pair|paire}} d'as. Que faites-vous ?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "Le prix seul ne suffit pas ({{n:io.flush.eq}} contre environ {{n:odds.flush.turn-river}}), mais si vous touchez, il suffit de gagner encore {{n:io.flush.extra}}. Vous avez un {{t:draw|tirage}} à la meilleure {{t:flush|couleur}} (l'as de cœur est sur le {{t:board|tableau}}, donc la {{t:flush|couleur}} au roi est la plus haute), votre adversaire a beaucoup de {{t:chips|jetons}} derrière lui, et un joueur avec une {{t:pair|paire}} d'as paiera souvent une telle mise à la river. Votre touche sera visible (un troisième cœur), mais un adversaire avec une {{t:pair|paire}} d'as paiera souvent quand même ; c'est pourquoi les implied odds sont ici plus faibles qu'avec une touche cachée." }
      - { text: "{{t:fold|Se coucher}}, car {{n:odds.flush.turn-river}}, c'est moins que {{n:io.flush.eq}}", why: "Les pot odds disent « {{t:fold|se coucher}} », mais vous oubliez les implied odds. Il ne manque que {{n:io.flush.extra}}, et votre adversaire a {{n:io.flush.stack}} derrière lui et une main qui paiera." }
      - { text: "{{t:raise|Relancer}} à tapis", why: "Un adversaire avec une {{t:pair|paire}} d'as va plutôt {{t:call|suivre}}, et vous n'avez alors qu'environ {{n:odds.flush.turn-river}}. Mieux vaut voir la river à bas prix et gagner davantage quand vous touchez." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Le {{t:pot}} contient {{n:ex.pot}}, votre adversaire {{t:bet|mise}} {{n:ex.bet.half}}. Vous avez un gutshot. Si vous touchez, il vous faudrait gagner encore {{n:io.gut.extra}}, mais il ne reste à votre adversaire que {{n:io.gut.stack}}. Que faites-vous ?"
    options:
      - { text: "{{t:fold|Se coucher}}", correct: true, why: "Un gutshot donne environ {{n:odds.gutshot.turn-river}}, et il vous faut {{n:eq.bet-half}}. Les implied odds n'y changeront rien : même si votre adversaire met la totalité de ses {{n:io.gut.stack}}, cela ne couvrira pas les {{n:io.gut.extra}} manquants." }
      - { text: "{{t:call|Suivre}}, grâce aux implied odds", why: "Les implied odds, ce sont les {{t:chips|jetons}} que votre adversaire peut encore vous payer. Il n'en a que {{n:io.gut.stack}}, et il vous faut {{n:io.gut.extra}}." }
      - { text: "{{t:raise|Relancer}} à tapis", why: "Un {{t:bluff}} à tapis avec {{n:outs.gutshot}} outs, c'est risquer tout. Un adversaire qui a {{t:bet|misé}} la moitié du {{t:pot}} avec un tapis aussi petit ne va souvent plus {{t:fold|se coucher}}." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. Le {{t:pot}} contient {{n:ex.pot}}, un adversaire prudent {{t:bet|mise}} tout le {{t:pot}} : {{n:ex.bet.pot}}. Que faites-vous ?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Se coucher}}", correct: true, why: "Il vous faut {{n:eq.bet-pot}}, et vous avez environ {{n:odds.flush.turn-river}}. De plus, votre {{t:flush|couleur}} est basse : quand un cœur tombe, un adversaire avec la dame ou le valet de cœur a une meilleure {{t:flush|couleur}}, et c'est là que vous perdez le plus (implied odds inversées)." }
      - { text: "{{t:call|Suivre}}, grâce aux implied odds", why: "Les implied odds sont faibles ici : une {{t:flush|couleur}} touchée peut perdre contre une plus haute, et tout le monde voit un troisième cœur sur le {{t:board|tableau}}. Il manque aussi beaucoup : le prix est de {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Relancer}}", why: "Un adversaire prudent qui {{t:bet|mise}} tout le {{t:pot}} sur un {{t:board|tableau}} avec un as et un roi va rarement {{t:fold|se coucher}}. Vous risquez beaucoup avec une main qui peut perdre même en touchant." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "Quand les implied odds sont-elles les plus élevées ?"
    options:
      - { text: "Quand vous avez un {{t:draw|tirage}} à la meilleure main, que votre adversaire a une main forte et beaucoup de {{t:chips|jetons}} derrière lui", correct: true, why: "Oui : vous gagnez alors quand vous touchez, et votre adversaire a à la fois les jetons et la main pour vous payer." }
      - { text: "Quand votre adversaire a peu de {{t:chips|jetons}} ({{t:spr}} faible)", why: "C'est l'inverse : avec un {{t:spr}} faible, votre adversaire n'a plus grand-chose à rajouter, donc les implied odds sont faibles." }
      - { text: "Quand vous avez un {{t:draw|tirage}} à une {{t:flush|couleur}} basse", why: "Ce sont des implied odds inversées : parfois vous touchez et perdez quand même, et dans un gros {{t:pot}}." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "Au début du turn, le {{t:pot}} contient {{n:ex.pot}}, et le plus petit de vos deux tapis est de {{n:spr.stack.high}}. Combien vaut le {{t:spr}} ?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr}} = tapis ÷ {{t:pot}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. Votre adversaire a plusieurs {{t:pot|pots}} derrière lui, donc les implied odds peuvent être élevées." }
      - { text: "{{n:spr.low}}", why: "Ce serait le cas avec un tapis de {{n:spr.stack.low}}. Ici, le tapis est de {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "Ça, c'est le {{t:pot}}. Le {{t:spr}} est un ratio : le tapis divisé par le {{t:pot}}." }
---
Au turn, il ne reste plus qu'une carte à venir. Les chances de votre {{t:draw|tirage}} baissent à peu près de moitié, et le prix de la carte suivante augmente généralement. C'est pourquoi, au turn, vous calculez plus précisément et vous posez une nouvelle question : combien puis-je gagner ensuite si je touche ?

## Plus qu'une carte

| {{t:draw|Tirage}} | Outs | Flop → river | Turn → river |
|---|---|---|---|
| {{t:flush|Couleur}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:straight|Quinte}} par les deux bouts | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Couleur}} + {{t:straight|quinte}} par les deux bouts | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Avec la règle du 2 et du 4 vue en M2, vous multipliez les outs par 2. Quand deux {{t:draw|tirages}} ont des cartes en commun, vous ne les comptez qu'une fois.

## Implied odds

Les implied odds (cotes implicites) sont les {{t:chips|jetons}} que vous gagnerez à la river si vous touchez. Exemple : le {{t:pot}} contient {{n:ex.third.pot}}, votre adversaire {{t:bet|mise}} {{n:io.flush.bet}}, vous avez un {{t:flush-draw|tirage couleur}}. Il vous faut {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} d'équité, et vous avez environ {{n:odds.flush.turn-river}}. Le {{t:pot}} seul ne suffit pas.

Sur {{n:cards.unseen.turn}} rivers possibles, vous touchez {{n:outs.flush}} fois et vous ratez {{n:miss.flush.turn}} fois. Pour être à l'équilibre, chaque carte gagnante doit rapporter autant que ce que coûtent les cartes ratées :

```formula
gain nécessaire = montant à payer × (cartes qui ne touchent pas ÷ outs)
```

Ici : {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. Le {{t:pot}} contient {{n:io.flush.pot-after-bet}}, donc à la river vous devez encore récupérer en moyenne **{{n:io.flush.extra}}**.

## {{t:spr}} : combien de {{t:chips|jetons}} votre adversaire a derrière lui

Le {{t:spr}} (rapport tapis/{{t:pot}}) est le {{t:effective-stack|tapis effectif}}, c'est-à-dire le plus petit des deux, divisé par le {{t:pot}} au début du {{t:street|tour d'enchères}}. Vous pouvez calculer le {{t:spr}} à chaque {{t:street|tour d'enchères}} ; ici, vous le calculez au turn. Avec un {{t:pot}} de {{n:ex.pot}} et un tapis de {{n:spr.stack.high}}, le {{t:spr}} vaut {{n:spr.high}} : votre adversaire a donc encore plusieurs {{t:pot|pots}} derrière lui ; avec un tapis de {{n:spr.stack.low}}, il ne vaut que {{n:spr.low}}. Les implied odds ne peuvent pas dépasser les {{t:chips|jetons}} que votre adversaire a encore devant lui. Avec un {{t:spr}} faible, ce sont presque exclusivement les pot odds qui comptent. Pour en savoir plus sur le {{t:spr}}, voir le module « Planifier la main » (M9), qui planifie la main en fonction du {{t:spr}} au flop.

## Quand les implied odds sont réelles

- vous avez un {{t:draw|tirage}} à la **meilleure main** (la {{t:flush|couleur}} la plus haute possible, généralement à l'as),
- votre adversaire a une **main forte** avec laquelle il paiera,
- votre adversaire a **beaucoup de {{t:chips|jetons}}** derrière lui ({{t:spr}} élevé),
- votre touche **ne saute pas aux yeux** (p. ex. un gutshot est moins visible qu'un troisième cœur sur le {{t:board|tableau}}).

Les implied odds inversées jouent contre vous : quand vous avez un {{t:draw|tirage}} à une {{t:flush|couleur}} basse, ou à une {{t:straight|quinte}} alors qu'une {{t:flush|couleur}} peut tomber sur le {{t:board|tableau}}, parfois vous touchez et perdez quand même, et dans un gros {{t:pot}}.

:::note D'où viennent ces règles
Le calcul des implied odds est un calcul exact fondé sur la {{t:expected-value|valeur espérée}}. Les conditions dans lesquelles les implied odds sont réelles, ainsi que les implied odds inversées, sont des heuristiques issues de supports de formation.
:::
