---
id: m5.l4
module: m5
order: 4
title: "Hors position et contre plusieurs adversaires"
sub: "Quand checker plus souvent"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}}, le Button a {{t:call|suivi}}, les blindes se sont {{t:fold|couchées}}. Le flop est moyen et {{t:connected|connecté}}. Vous parlez en premier. Quel plan convient ?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Checker}} plus souvent qu'{{t:in-position|en position}}", correct: true, why: "Oui : le Button a {{t:call|suivi}} avec la {{t:position}}, il a donc une {{t:range}} forte, et un flop moyen et {{t:connected|connecté}} touche bien ses {{t:pair|paires}} et ses {{t:connectors|connecteurs}}. {{t:out-of-position|Hors position}}, vous {{t:check|checkez}} ici très souvent, même avec des mains fortes." }
      - { text: "C-bet souvent et petit, comme au Button", why: "C'est le plan {{t:in-position|en position}} sur un flop {{t:dry|sec}} et haut. Ici, vous n'avez pas la {{t:position}}, et le flop ne favorise pas votre {{t:range}}." }
      - { text: "C-bet avec toutes les mains pour ne pas perdre l'{{t:initiative}}", why: "L'{{t:initiative|initiative}} ne gagne pas toute seule : la {{t:range}} du Button est forte ici, et après chaque {{t:bet|mise}}, vous parlez aussi en premier au turn et à la river." }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Pourquoi faites-vous un c-bet moins souvent {{t:out-of-position|hors position}} qu'{{t:in-position|en position}} ?"
    options:
      - { text: "Parce qu'un adversaire {{t:in-position|en position}} voit votre action à chaque {{t:street|street}}, et que sa {{t:range}} est forte une fois qu'il a {{t:call|suivi}}", correct: true, why: "Oui : un joueur qui {{t:call|suit}} avec la {{t:position}} s'est {{t:fold|couché}} avec ses mains faibles et a souvent {{t:raise|relancé}} ses plus fortes. Il lui reste des mains moyennes et bonnes, et en plus il parle en dernier." }
      - { text: "Parce qu'un c-bet {{t:out-of-position|hors position}} est interdit", why: "Non : les règles permettent de miser depuis n'importe quelle place. Le fait est qu'un c-bet {{t:out-of-position|hors position}} est moins souvent rentable." }
      - { text: "Parce qu'{{t:out-of-position|hors position}}, vous avez toujours la main la plus faible", why: "Non : votre main ne dépend pas de la {{t:position}}. Ce qui change, c'est la facilité avec laquelle vous réalisez son equity." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}}, le Button a {{t:call|suivi}}, les blindes se sont {{t:fold|couchées}}. Vous avez {{t:top-pair|top paire}} avec le meilleur kicker sur un flop {{t:dry|sec}}. Vous parlez en premier. Que faites-vous ?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|Checker}} (pour {{t:call|suivre}} la {{t:bet|mise}} du Button)", correct: true, why: "Oui : le Button a {{t:call|suivi}} avec la {{t:position}}, sa {{t:range}} est donc forte, et sur ce flop le solver {{t:out-of-position|hors position}} {{t:check|checke}} presque toute sa {{t:range}}, y compris {{t:top-pair|top paire}} avec le meilleur kicker. Après avoir {{t:check|checké}}, vous {{t:call|suivez}} la {{t:bet|mise}} du Button." }
      - { text: "C-bet de {{n:cbet.size.small}} du {{t:pot}}", why: "Trop souvent : dans cette configuration, le solver mise dans moins de {{n:cbet.oop.a94.bet}} des cas. Vous jouez {{t:top-pair|top paire}} avec le meilleur kicker en {{t:check|checkant}} et en {{t:call|suivant}}." }
      - { text: "C-bet de {{n:cbet.size.big}} du {{t:pot}}", why: "Trop souvent : dans cette configuration, le solver mise dans moins de {{n:cbet.oop.a94.bet}} des cas. Vous jouez {{t:top-pair|top paire}} avec le meilleur kicker en {{t:check|checkant}} et en {{t:call|suivant}}." }
      - { text: "{{t:fold|Se coucher}}", why: "Personne n'a encore {{t:bet|misé}}, donc {{t:fold|se coucher}} n'apporte rien : vous pouvez {{t:check|checker}} gratuitement (règle du module 1). Cette main, vous la jouez en {{t:check|checkant}} et en {{t:call|suivant}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}}, le Button et la {{t:big-blind|grosse blinde}} ont {{t:call|suivi}}. Au flop, la {{t:big-blind|grosse blinde}} {{t:check|checke}}, et le Button parle après vous. Vous n'avez que des cartes hautes, sans {{t:draw|tirage}}. Que faites-vous ?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Checker}}", correct: true, why: "Oui : contre deux adversaires, une main sans {{t:pair|paire}} et sans {{t:draw|tirage}} remporte rarement le {{t:pot}} avec une {{t:bet|mise}}. L'un des deux a plus souvent touché ce flop." }
      - { text: "Petit c-bet, comme en tête-à-tête", why: "Contre deux adversaires, le {{t:bluff}} doit passer les deux, et les deux ratent en même temps bien moins souvent qu'un seul." }
      - { text: "Gros c-bet, pour faire coucher les deux", why: "Un gros {{t:bluff}} contre deux adversaires risque beaucoup, et la probabilité que les deux {{t:fold|se couchent}} est faible. Sur ce flop, ils ont beaucoup de {{t:pair|paires}} et de {{t:draw|tirages}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}}, le Button et la {{t:big-blind|grosse blinde}} ont {{t:call|suivi}}. La {{t:big-blind|grosse blinde}} {{t:check|checke}}. Vous avez {{t:top-pair|top paire}} avec un bon kicker. Que faites-vous ?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Checker}}", correct: true, why: "Oui : dans un {{t:pot}} multiway sur un flop {{t:dry|sec}}, le solver {{t:check|checke}} très souvent, même avec des mains très fortes, car les deux joueurs qui ont {{t:call|suivi}} ont, ensemble, plus souvent touché le flop." }
      - { text: "Miser {{t:value|pour la value}}", why: "Contre deux adversaires sur un flop {{t:dry|sec}}, le solver {{t:check|checke}} même avec une main très forte ; vous misez rarement et petit, surtout quand le flop touche bien votre {{t:range}}." }
      - { text: "{{t:fold|Se coucher}}", why: "Personne n'a {{t:bet|misé}}, donc vous pouvez {{t:check|checker}} gratuitement. {{t:fold|Se coucher}} reviendrait à abandonner un {{t:pot}} dans lequel vous êtes probablement devant." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Une main sans {{t:pair|paire}} rate le flop dans env. {{n:flop.miss.unpaired}} des cas. À quelle fréquence deux mains de ce type (quatre rangs différents) ratent-elles le flop en même temps ?"
    options:
      - { text: "Env. {{n:flop.miss.two}}", correct: true, why: "Oui : vous calculez comme pour une seule main, mais il y a plus de cartes qui donnent une paire : {{n:pair.outs.two-hands}} sur {{n:cards.unseen.two-hands}} cartes inconnues (hors vos cartes). La probabilité qu'aucune des {{n:cards.board.flop}} cartes du flop n'en fasse partie est d'env. {{n:flop.miss.two}} : les deux ratent moins d'une fois sur deux." }
      - { text: "Env. {{n:flop.miss.unpaired}}, comme pour une seule", why: "Non : chaque adversaire supplémentaire est une chance de plus que quelqu'un ait touché. La probabilité que tous ratent diminue à chaque joueur." }
      - { text: "Env. {{n:flop.hit.unpaired}}", why: "C'est la probabilité qu'une main sans {{t:pair|paire}} touche une {{t:pair|paire}} au flop. La question porte sur le fait que les deux ratent." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Révision {{t:in-position|en position}} : vous avez {{t:open|ouvert}} depuis le Button, la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} et {{t:check|checke}} au flop. Quel plan convient à ce flop ?"
    position: BTN
    options:
      check: "{{t:check|Checker}} plus souvent, c-bet moins souvent que d'habitude"
      small: "C-bet souvent et petit : {{n:cbet.size.small}} du {{t:pot}} ({{n:cbet.btn.small}})"
      big: "C-bet souvent et gros : {{n:cbet.size.big}} du {{t:pot}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Trop prudent : sur un flop {{t:dry|sec}} et haut, vous avez l'{{t:range-advantage|avantage de range}}, et votre adversaire a généralement raté. En {{t:check|checkant}}, vous lui donnez une carte gratuite."
          small: "Oui : un flop {{t:dry|sec}} et haut vous favorise. Une petite {{t:bet|mise}} suffit pour que l'adversaire {{t:fold|se couche}} avec ses mains faibles, et les {{t:pair|paires}} inférieures la {{t:call|suivront}} quand même."
          big: "Bonne action, mauvaise taille : sur un flop {{t:dry|sec}}, l'adversaire a peu de {{t:draw|tirages}}, et les mains qui ont raté {{t:fold|se coucheront}} aussi face à une petite {{t:bet|mise}}. Une {{t:bet|mise}} plus grosse ne fait pas {{t:fold|coucher}} plus de mains, mais risque davantage. Misez env. {{n:cbet.size.small}} du {{t:pot}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Oui : un flop bas avec des cartes proches favorise la {{t:big-blind|grosse blinde}}, qui a plus souvent ici une {{t:two-pair|double paire}} ou une {{t:straight|quinte}}. Vous faites un c-bet moins souvent que sur les flops hauts : beaucoup de mains {{t:check|checkent}}, et ce sont surtout les mains fortes et les gros {{t:draw|tirages}} qui misent."
          small: "Trop souvent : sur un flop bas avec des cartes proches, c'est la {{t:big-blind|grosse blinde}} qui a l'{{t:nuts-advantage|avantage de nuts}}. Des c-bets fréquents, même petits, lui donnent l'occasion de {{t:raise|relancer}} (check-raise) avec ses mains les plus fortes."
          big: "Trop souvent et trop cher : la {{t:big-blind|grosse blinde}} a plus souvent touché ici une {{t:two-pair|double paire}} ou une {{t:straight|quinte}}. Un gros c-bet fréquent risque beaucoup alors que vous-même n'avez généralement que des cartes hautes."
    count: 3
---
Jusqu'ici, vous avez joué {{t:in-position|en position}} contre un seul adversaire. {{t:out-of-position|Hors position}} et contre plusieurs joueurs, vous faites un c-bet moins souvent.

## {{t:out-of-position|Hors position}}

Quand vous {{t:open|ouvrez}} depuis le {{t:cutoff|CO}} et que le Button {{t:call|suit}}, vous parlez en premier à chaque {{t:street|street}} après le flop. La {{t:range}} du Button est en plus forte : il s'est {{t:fold|couché}} avec ses mains faibles et a {{t:raise|relancé}} une partie des plus fortes, il lui reste donc des mains moyennes et bonnes. Une telle {{t:range}}, sans les mains les plus fortes et composée surtout de mains moyennes, est {{t:condensed|condensée}}. C'est pourquoi, {{t:out-of-position|hors position}}, vous {{t:check|checkez}} bien plus souvent, souvent avec toute votre {{t:range}}, y compris avec des mains fortes : vous les jouerez en {{t:call|suivant}} ou en check-raise. Vous misez surtout sur les flops qui favorisent très fortement votre {{t:range}}, p. ex. K-Q-6. {{t:check|Checker}} {{t:out-of-position|hors position}} ne signifie pas abandonner la main : beaucoup de ces mains {{t:call|suivront}} la {{t:bet|mise}} de l'adversaire.

## Contre plusieurs adversaires

Chaque adversaire supplémentaire est une chance de plus que quelqu'un ait touché le flop. Une main sans {{t:pair|paire}} rate le flop dans env. {{n:flop.miss.unpaired}} des cas, mais deux en même temps seulement dans env. {{n:flop.miss.two}}. Un {{t:bluff}} doit passer tout le monde, donc contre plusieurs adversaires, vous renoncez surtout aux {{t:bluff|bluffs}}. Vous misez rarement et petit, surtout sur les flops qui touchent bien votre {{t:range}} ; sur un flop {{t:dry|sec}}, vous {{t:check|checkez}} souvent même avec une main très forte.

:::note D'où viennent ces règles
Les règles de cette leçon proviennent de résultats de solvers publiés (c-bet {{t:out-of-position|hors position}}, c-bet sur un flop avec un as et dans un {{t:pot}} multiway) et de supports de formation ({{t:pot}} multiway). Ce sont des heuristiques : l'application n'indique pas de fréquences en pourcentage. La probabilité que deux mains ratent en même temps est un calcul exact pour deux mains de quatre rangs différents ; il ne tient pas compte de vos cartes, comme le chiffre pour une seule main.
:::
