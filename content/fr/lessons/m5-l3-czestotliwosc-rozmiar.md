---
id: m5.l3
module: m5
order: 3
title: "À quelle fréquence et combien"
sub: "C-bet en position"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} et {{t:check|checke}} au flop. Quel plan convient à ce flop ?"
    position: BTN
    options:
      check: "Je {{t:check|checke}} plus souvent, c-bet moins souvent que d'habitude"
      small: "C-bet souvent et petit : {{n:cbet.size.small}} du {{t:pot|pot}} ({{n:cbet.btn.small}})"
      big: "C-bet souvent et gros : {{n:cbet.size.big}} du {{t:pot|pot}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Trop prudent : sur un flop {{t:dry|sec}} et haut, vous avez l'{{t:range-advantage|avantage de range}}, et l'adversaire a généralement raté. En {{t:check|checkant}}, vous lui donnez une carte gratuite."
          small: "Oui : un flop {{t:dry|sec}} et haut vous est favorable. Une petite {{t:bet|mise}} suffit pour que l'adversaire {{t:fold|couche}} ses mains faibles, et des {{t:pair|paires}} moins bonnes la {{t:call|suivront}} encore."
          big: "Bonne action, mauvaise taille : sur un flop {{t:dry|sec}}, l'adversaire a peu de {{t:draw|tirages}}, et les mains qui ont raté se {{t:fold|coucheront}} aussi face à une petite {{t:bet|mise}}. Une {{t:bet|mise}} plus grosse fera {{t:fold|coucher}} à peu près les mêmes mains, mais risque davantage. Misez environ {{n:cbet.size.small}} du {{t:pot|pot}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Trop prudent : vous avez l'{{t:range-advantage|avantage de range}}, et sur un flop {{t:paired|pairé}} un {{t:draw|tirage}} est rare, donc un adversaire sans {{t:pair|paire}} peut rarement payer même une petite {{t:bet|mise}}."
          small: "Oui : sur un flop {{t:paired|pairé}}, vous misez souvent et petit. Un adversaire sans {{t:pair|paire}} a rarement de quoi {{t:call|suivre}}, et les deux joueurs peuvent avoir un {{t:three-of-a-kind|brelan}}, donc il n'y a aucune raison de risquer plus."
          big: "Bonne action, mauvaise taille : sur un flop {{t:paired|pairé}}, chacun de vous peut avoir un {{t:three-of-a-kind|brelan}}, donc une grosse {{t:bet|mise}} n'est pas rentable, et les mains faibles de l'adversaire se {{t:fold|coucheront}} aussi face à une petite. Environ {{n:cbet.size.small}} du {{t:pot|pot}} suffit."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Oui : un flop bas aux cartes proches favorise la {{t:big-blind|grosse blinde}}, qui a ici plus souvent une {{t:two-pair|double paire}} ou une {{t:straight|quinte}}. Vous faites des c-bets moins souvent que sur les flops hauts : beaucoup de mains {{t:check|checkent}}, et ce sont surtout les mains fortes et les gros {{t:draw|tirages}} qui misent."
          small: "Trop souvent : sur un flop bas aux cartes proches, c'est la {{t:big-blind|grosse blinde}} qui a l'{{t:nuts-advantage|avantage de nuts}}. Des c-bets fréquents, même petits, lui donnent l'occasion de {{t:raise|relancer}} après avoir d'abord {{t:check|checké}} (check-raise) avec ses mains les plus fortes."
          big: "Trop souvent et trop cher : la {{t:big-blind|grosse blinde}} a ici plus souvent touché une {{t:two-pair|double paire}} ou une {{t:straight|quinte}}. Un gros c-bet fréquent risque beaucoup alors que vous n'avez le plus souvent que des cartes hautes."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} et {{t:check|checke}}. Vous avez une {{t:pair|paire}} de rois avec un valet. Que faites-vous ?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} du {{t:pot|pot}})", correct: true, why: "Oui : {{t:top-pair|top paire}} (une {{t:pair|paire}} avec la carte la plus haute du {{t:board|board}}) sur un flop {{t:dry|sec}}. Une petite {{t:bet|mise}} sera {{t:call|suivie}} par les sept, les deux et les rois plus faibles, et l'adversaire n'a presque aucun {{t:draw|tirage}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} du {{t:pot|pot}})", sizeError: true, why: "Bonne action, mauvaise taille : sur un flop {{t:dry|sec}}, l'adversaire n'a pas de {{t:draw|tirages}}, et les mains qui ont raté se {{t:fold|coucheront}} aussi face à une petite {{t:bet|mise}}. Une {{t:bet|mise}} plus grosse fera {{t:fold|coucher}} à peu près les mêmes mains, mais risque davantage. Misez environ {{n:cbet.size.small}} du {{t:pot|pot}}." }
      - { text: "Je {{t:check|checke}}", why: "Vous perdez de la valeur : l'adversaire a beaucoup de {{t:pair|paires}} plus faibles et de mains hauteur as qui paieraient une petite {{t:bet|mise}}. Sur un flop {{t:dry|sec}} avec une {{t:top-pair|top paire}}, vous misez." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} et {{t:check|checke}}. Vous avez un set de valets sur un flop avec beaucoup de {{t:draw|tirages}}. Que faites-vous ?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} du {{t:pot|pot}})", correct: true, why: "Oui : l'adversaire a beaucoup de {{t:flush-draw|tirages couleur}} et de tirages {{t:straight|quinte}} (p. ex. QT, AQ, deux cœurs). Une grosse {{t:bet|mise}} les fait payer cher la carte suivante." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} du {{t:pot|pot}})", sizeError: true, why: "Bonne action, mauvaise taille : une petite {{t:bet|mise}} donne une carte bon marché aux {{t:draw|tirages}} de l'adversaire, et votre set peut perdre contre une couleur ou une {{t:straight|quinte}}. Avec beaucoup de {{t:draw|tirages}}, misez gros." }
      - { text: "Je {{t:check|checke}} pour ne pas effrayer l'adversaire", why: "Avec beaucoup de {{t:draw|tirages}}, une carte gratuite leur fait un cadeau. Avec une main très forte, vous construisez le {{t:pot|pot}} tout de suite." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} et {{t:check|checke}}. Le flop est {{t:paired|pairé}}. Quel plan convient ?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet souvent et petit", correct: true, why: "Oui : vous avez l'{{t:range-advantage|avantage de range}}, et sur un flop {{t:paired|pairé}} un {{t:draw|tirage}} est rare, donc un adversaire sans {{t:pair|paire}} peut rarement payer même une petite {{t:bet|mise}}. Vous avez aussi plus de {{t:pair|paires}} hautes, p. ex. AA et KK, que la {{t:big-blind|grosse blinde}} n'a généralement pas après avoir simplement {{t:call|suivi}}." }
      - { text: "C-bet souvent et gros", sizeError: true, why: "Bonne action, mauvaise taille : chacun de vous peut avoir un {{t:three-of-a-kind|brelan}}, donc une grosse {{t:bet|mise}} n'est pas rentable, et un adversaire sans {{t:pair|paire}} se {{t:fold|couchera}} aussi face à une petite. Misez souvent et petit." }
      - { text: "Je {{t:check|checke}} plus souvent que je ne mise", why: "Trop prudent : un flop {{t:paired|pairé}} et haut vous est favorable, et l'adversaire n'a généralement rien ici." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} et {{t:check|checke}}. Le flop est {{t:monotone|monochrome}}. Quel plan convient ?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet moins souvent que d'habitude et petit", correct: true, why: "Oui : chacun des joueurs peut déjà avoir une {{t:flush|couleur}}, donc votre {{t:nuts-advantage|avantage de nuts}} est plus faible que sur un flop haut ordinaire. Vous misez moins souvent et petit, pour ne pas construire un gros {{t:pot|pot}} contre une couleur." }
      - { text: "C-bet souvent et gros pour que les {{t:draw|tirages}} paient", why: "Sur un flop {{t:monotone|monochrome}}, un gros {{t:pot|pot}} est dangereux : l'adversaire peut avoir une {{t:flush|couleur}} déjà faite, et vos mains sans cœur résistent mal." }
      - { text: "Je {{t:check|checke}} toujours", why: "Trop prudent : un flop haut vous reste favorable, et une partie des mains (p. ex. avec un cœur haut) misent volontiers petit." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Il y a {{n:ex.pot}} dans le {{t:pot|pot}}. Vous misez {{n:cbet.ex.small}} sans aucune main. Dans quel pourcentage des cas l'adversaire doit-il se {{t:fold|coucher}} pour que cette {{t:bet|mise}} soit à l'équilibre ? Entrez un nombre."
    answer: alpha.cbet.small
    explanation: "Vous risquez {{n:cbet.ex.small}} pour gagner {{n:ex.pot}}. Le seuil est mise ÷ ({{t:pot|pot}} + mise) : {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. L'adversaire rate le flop bien plus souvent, c'est pourquoi un petit c-bet est si souvent rentable."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Il y a {{n:ex.pot}} dans le {{t:pot|pot}}. Vous misez {{n:cbet.ex.big}} sans aucune main. Dans quel pourcentage des cas l'adversaire doit-il se {{t:fold|coucher}} pour que cette {{t:bet|mise}} soit à l'équilibre ? Entrez un nombre."
    answer: alpha.cbet.big
    explanation: "Vous risquez {{n:cbet.ex.big}} pour gagner {{n:ex.pot}} : {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Un gros {{t:bluff|bluff}} doit réussir bien plus souvent qu'un petit ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Pourquoi, sur un flop {{t:dry|sec}}, un c-bet de {{n:cbet.size.small}} du {{t:pot|pot}} avec une main sans chance est-il plus souvent rentable qu'un c-bet de {{n:cbet.size.big}} du {{t:pot|pot}} ?"
    options:
      - { text: "Parce qu'une petite {{t:bet|mise}} ne doit faire {{t:fold|coucher}} l'adversaire que dans {{n:alpha.cbet.small}} des cas, et une grosse dans {{n:alpha.cbet.big}}", correct: true, why: "Oui : sur un flop {{t:dry|sec}}, les mains les plus faibles de l'adversaire (sans {{t:pair|paire}} et sans {{t:draw|tirage}}) se {{t:fold|couchent}} face aux deux tailles, donc une petite {{t:bet|mise}} obtient le même effet à moindre coût." }
      - { text: "Parce qu'une petite {{t:bet|mise}} fait toujours {{t:fold|coucher}} l'adversaire", why: "Non : l'adversaire {{t:call|suit}} une petite {{t:bet|mise}} avec n'importe quelle {{t:pair|paire}}. Une petite {{t:bet|mise}} risque simplement moins, donc elle a besoin que l'adversaire se {{t:fold|couche}} moins souvent." }
      - { text: "Parce qu'une grosse {{t:bet|mise}} est toujours une erreur", why: "Non : sur un flop {{t:wet|humide}} et avec l'{{t:nuts-advantage|avantage de nuts}}, une grosse {{t:bet|mise}} est parfois la meilleure option. Sur un flop {{t:dry|sec}}, en revanche, elle n'apporte rien en échange du risque plus grand." }
---
Un c-bet ({{t:bet|mise}} de continuation) est une {{t:bet|mise}} au flop du joueur qui a fait la dernière {{t:raise|relance}} avant le flop. Dans cette leçon, vous jouez {{t:in-position|en position}} : vous avez {{t:open|ouvert}} depuis le Bouton, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} et {{t:check|checke}} au flop. Le {{t:pot|pot}} au flop est de {{n:bb.pot-after.vs-btn}}. Deux questions se posent : à quelle fréquence miser et combien.

## Flop {{t:dry|sec}} et haut : souvent et petit

Sur un flop comme [[Ks 7d 2c]], vous avez l'{{t:range-advantage|avantage de range}}, et l'adversaire n'a presque aucun {{t:draw|tirage}}. Vous misez souvent et petit, environ {{n:cbet.size.small}} du {{t:pot|pot}}, soit environ {{n:cbet.btn.small}}. Une petite {{t:bet|mise}} suffit pour que l'adversaire {{t:fold|couche}} les mains qui ont raté, et des {{t:pair|paires}} moins bonnes la {{t:call|suivront}} encore. Une {{t:bet|mise}} plus grosse fera {{t:fold|coucher}} à peu près les mêmes mains, mais risque davantage.

Un petit c-bet typique fait environ {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} du {{t:pot|pot}}, et un gros environ {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (supports de formation) ; les solvers utilisent généralement {{n:cbet.size.small}} et {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, et sur certains flops aussi un {{t:overbet|overbet}}, c'est-à-dire une {{t:bet|mise}} supérieure à tout le {{t:pot|pot}} (résultats de solvers publiés).

## Flop avec beaucoup de {{t:draw|tirages}} : moins souvent, mais plus gros

Sur un flop comme [[Kh Jh 7c]], l'adversaire a beaucoup de {{t:flush-draw|tirages couleur}} et de tirages {{t:straight|quinte}}, mais une {{t:straight|quinte}} n'est pas encore possible. Les mains fortes et les gros {{t:draw|tirages}} misent avec une taille plus grande, p. ex. {{n:cbet.size.big}} du {{t:pot|pot}}, pour que les {{t:draw|tirages}} paient cher la carte suivante. Les mains moyennes sans {{t:draw|tirage}} {{t:check|checkent}} plus souvent. Quand une {{t:straight|quinte}} est déjà possible, p. ex. sur [[Jh Th 8c]], l'adversaire peut l'avoir, donc les solvers y misent avec une taille plus petite.

## {{t:paired|Pairé}} et {{t:monotone|monochrome}}

Sur un flop {{t:paired|pairé}}, p. ex. [[Qd Qs 6h]], vous avez l'{{t:range-advantage|avantage de range}}, et un {{t:draw|tirage}} est rare, donc un adversaire sans {{t:pair|paire}} peut rarement {{t:call|suivre}}. Vous misez souvent et petit : une grosse {{t:bet|mise}} n'est pas rentable, car chacun de vous peut avoir un {{t:three-of-a-kind|brelan}}. Sur un flop {{t:monotone|monochrome}}, p. ex. [[Kh 8h 3h]], n'importe qui peut déjà avoir une {{t:flush|couleur}}, donc vous misez moins souvent que d'habitude et petit.

Attention : « {{t:wet|humide}} » ne veut pas dire « grosse mise ». Dans l'application, un flop {{t:monotone|monochrome}} est toujours {{t:wet|humide}}, et pourtant le solver y mise rarement et avec une petite taille (résultats de solvers publiés). La taille augmente avec l'{{t:wetness|humidité}} seulement jusqu'à un certain point : sur les flops les plus {{t:wet|humides}}, comme [[Qd 8d 7d]], elle diminue de nouveau. La taille plus grande de la section précédente concerne les flops avec beaucoup de {{t:draw|tirages}} sur lesquels une {{t:straight|quinte}} n'est pas encore possible (dans l'application, généralement intermédiaires).

## Bas aux cartes proches : vous {{t:check|checkez}} plus souvent

Sur [[7s 6h 5d]], c'est la {{t:big-blind|grosse blinde}} qui a plus souvent une {{t:two-pair|double paire}} ou une {{t:straight|quinte}} (leçon sur les avantages). De même sur les autres flops bas {{t:connected|connectés}} et {{t:semi-connected|semi-connectés}}. Vous faites des c-bets moins souvent que sur les flops hauts : beaucoup de mains {{t:check|checkent}}, et ce sont surtout les mains très fortes et les gros {{t:draw|tirages}} qui misent.

## À quelle fréquence l'adversaire doit se {{t:fold|coucher}}

Une {{t:bet|mise}} sans aucune main est à l'équilibre lorsque l'adversaire se {{t:fold|couche}} dans mise ÷ ({{t:pot|pot}} + mise) des cas. À {{n:cbet.size.small}} du {{t:pot|pot}}, cela fait {{n:alpha.cbet.small}} ; à {{n:cbet.size.big}} du {{t:pot|pot}}, déjà {{n:alpha.cbet.big}}. Une main non pairée rate le flop dans environ {{n:flop.miss.unpaired}} des cas, c'est pourquoi un petit c-bet est si souvent rentable.

:::note D'où viennent ces règles
Les orientations (flop {{t:dry|sec}} : petit et souvent ; beaucoup de {{t:draw|tirages}} sans {{t:straight|quinte}} faite : plus gros et moins souvent ; {{t:straight|quinte}} déjà possible : plus petit ; {{t:paired|pairé}} : petit ; {{t:monotone|monochrome}} : moins souvent et petit) sont des règles générales tirées de supports de formation et de résultats de solvers publiés, signalées comme heuristiques. Les tailles {{n:cbet.size.small}} et {{n:cbet.size.big}} du {{t:pot|pot}} sont des exemples tirés des fourchettes indiquées plus haut (supports de formation sur la taille des mises ; résultats de solvers publiés). L'application n'indique pas à quelle fréquence miser en pourcentage, car ces chiffres proviennent de résultats de solvers.
:::
