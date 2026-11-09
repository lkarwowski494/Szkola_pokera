---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "Quand suivre est rentable"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Le {{t:pot|pot}} est de {{n:ex.third.pot}}. Votre adversaire {{t:bet|mise}} {{n:ex.third.bet}}. De combien d'equity avez-vous besoin pour {{t:call|suivre}} ?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Le {{t:pot|pot}} après la {{t:bet|mise}} est de {{n:ex.third.pot-after-bet}}, vous ajoutez {{n:ex.third.bet}}, soit {{n:ex.third.total}} au total. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "C'est ce qu'il vous faut face à une {{t:bet|mise}} de la taille du {{t:pot|pot}}. Ici, la {{t:bet|mise}} vaut 1/3 du {{t:pot|pot}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "C'est {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Ajoutez aussi au dénominateur ce que vous payez pour {{t:call|suivre}}." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Vous avez un {{t:flush-draw|tirage couleur}}. Le {{t:pot|pot}} est de {{n:ex.pot}}, votre adversaire {{t:bet|mise}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Se coucher}}", correct: true, why: "Il vous faut {{n:eq.bet-pot}}. La {{t:flush|couleur}} vous donne {{n:outs.flush}} outs, soit environ {{n:odds.flush.turn-river}}. Même si vous ajoutez les {{n:pair.outs.per-rank}} as qui vous donnent une {{t:pair|paire}} d'as ({{n:outs.flush-ace}} outs au total, environ {{n:odds.flush-ace.turn-river}}), cela reste nettement inférieur à {{n:eq.bet-pot}}. {{t:call|Suivre}} dans ce cas est perdant sur le long terme." }
      - { text: "{{t:call|Suivre}}", why: "C'est tentant, car vous avez un {{t:draw|tirage}} vers la meilleure {{t:flush|couleur}} et un as pourrait aussi aider, mais même environ {{n:odds.flush-ace.turn-river}}, c'est moins que {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Relancer}} à tapis", why: "Chez les joueurs avancés, cela peut être un coup jouable, mais sans bonne raison vous risquez tout votre tapis (tous les {{t:chips|jetons}} que vous avez devant vous) avec une main qui n'a encore rien." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Même main, mais votre adversaire ne {{t:bet|mise}} que {{n:ex.bet.quarter}} dans un {{t:pot|pot}} de {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Suivre}}", correct: true, why: "Il vous faut {{n:eq.bet-quarter}} et vous avez environ {{n:odds.flush.turn-river}}, et encore plus avec les as. Une petite {{t:bet|mise}} vous offre un bon prix." }
      - { text: "{{t:fold|Se coucher}}", why: "Trop bon marché pour {{t:fold|se coucher}} : {{n:odds.flush.turn-river}}, c'est plus que les {{n:eq.bet-quarter}} nécessaires, et encore plus avec les as." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Votre adversaire {{t:bet|mise}} la moitié du {{t:pot|pot}}. De combien d'equity avez-vous besoin ?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Pot}} de {{n:ex.pot}}, {{t:bet|mise}} de {{n:ex.bet.half}}. Vous ajoutez {{n:ex.bet.half}} pour un total de {{n:ex.half.total}}, soit {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Erreur fréquente : {{n:ex.wrong.half}}, c'est la {{t:bet|mise}} divisée par le {{t:pot|pot}} d'avant la {{t:bet|mise}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Divisez ce que vous ajoutez par le {{t:pot|pot}} entier après avoir {{t:call|suivi}} : {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "C'est ce qu'il vous faut face à une {{t:bet|mise}} de la taille du {{t:pot|pot}} entier." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "Votre adversaire {{t:bet|mise}} tout le {{t:pot|pot}}. De quel pourcentage d'equity avez-vous besoin pour {{t:call|suivre}} ? Saisissez un nombre."
    answer: eq.bet-pot
    explanation: "{{t:pot|Pot}} de {{n:ex.pot}}, {{t:bet|mise}} de {{n:ex.bet.pot}}. Vous ajoutez {{n:ex.bet.pot}} à un {{t:pot|pot}} qui, une fois que vous avez {{t:call|suivi}}, contient {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Vous divisez ce que vous ajoutez par le {{t:pot|pot}} entier : {{n:eq.bet-pot}}, soit un tiers."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Quand votre adversaire {{t:bet|mise}} et que vous avez un {{t:draw|tirage}}, la question est : le prix est-il bon ? Vous comparez deux nombres : **à quelle fréquence vous devez gagner** et **à quelle fréquence vous gagnez réellement**.

:::note Equity et chance de toucher
**L'equity** est votre part du {{t:pot|pot}} : la fréquence à laquelle vous gagnerez si la main va jusqu'au showdown sans autres {{t:bet|mises}}. La **chance de toucher** vue dans la leçon sur les outs n'est que la probabilité qu'un out tombe. Avec un {{t:draw|tirage}} pur, qui ne gagne que s'il touche, la chance de toucher sur les cartes que vous verrez réellement pour ce prix est une approximation de l'equity. Face à une {{t:bet|mise}} au flop, c'est la chance sur une seule carte, et non jusqu'à la river.
:::

## À quelle fréquence vous devez gagner

```formula
equity nécessaire = montant pour suivre ÷ pot après avoir suivi
pot après avoir suivi = pot avant la mise + mise + montant pour suivre
```

Exemple : le {{t:pot|pot}} est de {{n:ex.pot}}, votre adversaire {{t:bet|mise}} {{n:ex.bet.half}}. Le {{t:pot|pot}} est maintenant de {{n:ex.half.pot-after-bet}}, vous ajoutez {{n:ex.bet.half}}, donc après avoir {{t:call|suivi}}, le {{t:pot|pot}} est de {{n:ex.half.total}}. Il vous faut {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Aide-mémoire rapide

| {{t:bet|Mise}} de l'adversaire | Equity nécessaire |
|---|---|
| {{t:pot|Pot}} entier | {{n:eq.bet-pot}} |
| Moitié du {{t:pot|pot}} | {{n:eq.bet-half}} |
| Quart du {{t:pot|pot}} | {{n:eq.bet-quarter}} |

:::note La décision
Si votre equity est supérieure à l'equity nécessaire, vous {{t:call|suivez}}. Si elle est inférieure, vous vous {{t:fold|couchez}}. Cela découle de l'{{t:expected-value|espérance de gain}} : l'{{t:expected-value|EV}} du fait de {{t:call|suivre}} = equity × {{t:pot|pot}} après avoir {{t:call|suivi}} − montant pour {{t:call|suivre}}, et cette valeur est négative exactement lorsque l'equity est inférieure à l'equity nécessaire. Ce seul calcul élimine la plupart des erreurs coûteuses des débutants. Pour l'instant, vous laissez de côté les {{t:implied-odds|cotes implicites}}, c'est-à-dire les {{t:chips|jetons}} que vous comptez gagner plus tard dans la main si vous touchez votre combinaison ; elles reviendront dans les modules suivants.
:::
