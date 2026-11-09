---
id: m1.l1
module: m1
order: 1
title: "Déroulement d'une main"
sub: "Blindes, streets et actions possibles"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "C'est le flop et personne avant vous n'a {{t:bet|misé}}. Que pouvez-vous faire ?"
    options:
      - { text: "{{t:check|Checker}} ou {{t:bet|miser}}", correct: true, why: "Sans {{t:bet|mise}} avant vous, vous avez deux options : laisser passer gratuitement ou {{t:bet|miser}} vous-même." }
      - { text: "{{t:call|Suivre}}", why: "Il n'y a rien à {{t:call|suivre}}, car personne n'a rien {{t:bet|misé}}." }
      - { text: "{{t:raise|Relancer}}", why: "On ne peut {{t:raise|relancer}} que la {{t:bet|mise}} de quelqu'un d'autre. La première {{t:bet|mise}} d'un tour s'appelle un bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Combien de {{t:community-cards|cartes communes}} apparaissent au flop ?"
    options:
      - { text: "3", correct: true, why: "Le flop, ce sont trois cartes d'un coup. Ensuite, le turn et la river en ajoutent une chacun." }
      - { text: "1", why: "Le turn et la river arrivent une carte à la fois." }
      - { text: "5", why: "Les cinq {{t:community-cards|cartes communes}} ne sont présentes qu'à la river." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "Votre adversaire a {{t:bet|misé}} 20 {{t:chips|jetons}}. Vous avez une main faible et ne voulez pas continuer. Que faites-vous ?"
    options:
      - { text: "Je {{t:fold|me couche}}", correct: true, why: "Quand il y a une {{t:bet|mise}} et que vous ne voulez pas payer, vous vous {{t:fold|couchez}}. Vous ne perdez que ce que vous avez déjà mis." }
      - { text: "Je {{t:check|checke}}", why: "Le check n'est pas possible quand il y a une {{t:bet|mise}} à {{t:call|suivre}}." }
      - { text: "Je {{t:call|suis}}", why: "{{t:call|Suivre}} coûte 20 {{t:chips|jetons}}. Puisque vous ne voulez pas jouer, c'est une perte." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Quel {{t:betting-round|tour d'enchères}} est le dernier ?"
    options:
      - { text: "River", correct: true, why: "La river est la cinquième {{t:community-cards|carte commune}}. S'il reste au moins deux joueurs après les enchères à la river, ils dévoilent leurs cartes (showdown)." }
      - { text: "Turn", why: "Le turn est la quatrième carte. La river vient encore après." }
      - { text: "Flop", why: "Le flop est le premier tour avec des {{t:community-cards|cartes communes}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Vous êtes de {{t:big-blind|grosse blinde}}, tout le monde s'est {{t:fold|couché}} et la {{t:small-blind|petite blinde}} a seulement complété. Vous avez une main faible. Que faites-vous ?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "Je {{t:check|checke}}", correct: true, why: "Votre {{t:big-blind|grosse blinde}} compte comme une {{t:bet|mise}}, et la {{t:small-blind|petite blinde}} n'a fait que l'égaler. Personne n'a {{t:raise|relancé}}, donc vous verrez le flop gratuitement. Une main faible n'est pas une raison de se coucher quand cela ne coûte rien." }
      - { text: "Je {{t:fold|me couche}}", why: "{{t:fold|Se coucher}} alors que vous pouvez {{t:check|checker}} gratuitement, c'est une perte pure et simple." }
      - { text: "Je {{t:raise|relance}}", why: "Avec 7-2, vous n'avez rien sur quoi construire ; un {{t:check|check}} vous donne un flop gratuit." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
Chaque main suit un ordre fixe. D'abord, deux joueurs versent des mises obligatoires, les **blindes** : la {{t:small-blind|petite blinde}} et la {{t:big-blind|grosse blinde}}. Ainsi, il y a toujours quelque chose à jouer dans le {{t:pot|pot}}.

Avant le flop, la {{t:big-blind|grosse blinde}} compte comme une {{t:bet|mise}} : qui veut jouer doit au moins la {{t:call|suivre}}. La {{t:big-blind|grosse blinde}} parle en dernier avant le flop. Si personne n'a {{t:raise|relancé}}, elle peut {{t:check|checker}} et voir le flop sans rien ajouter.

## Les quatre {{t:betting-round|tours d'enchères}}

1. **Preflop** : vous n'avez que vos 2 cartes.
2. **Flop** : 3 {{t:community-cards|cartes communes}} arrivent sur le {{t:board|tableau}}.
3. **Turn** : la quatrième carte.
4. **River** : la cinquième et dernière carte.

S'il reste au moins deux joueurs dans le coup après les enchères à la river, ils dévoilent leurs cartes. C'est le **showdown** : la meilleure combinaison remporte le {{t:pot|pot}}. Si tous les joueurs sauf un se {{t:fold|couchent}} avant, ce joueur remporte le {{t:pot|pot}} sans montrer ses cartes.

## Actions possibles

- **{{t:check|Checker}}** : vous ne mettez rien. Seulement si, dans ce tour, personne avant vous n'a {{t:bet|misé}} ni {{t:raise|relancé}} (avant le flop, la {{t:big-blind|grosse blinde}} peut {{t:check|checker}} si personne n'a {{t:raise|relancé}}).
- **{{t:bet|Miser}}** : la première {{t:bet|mise}} d'un tour. Dans les formules des leçons suivantes, nous écrivons simplement « bet ».
- **{{t:call|Suivre}}** : vous égalez la {{t:bet|mise}} de votre adversaire.
- **{{t:raise|Relancer}}** : vous augmentez la {{t:bet|mise}} de quelqu'un d'autre.
- **Se {{t:fold|coucher}}** : vous jetez vos cartes et perdez ce que vous avez déjà mis.

:::note À retenir
Si quelqu'un a {{t:bet|misé}}, vous pouvez vous {{t:fold|coucher}}, {{t:call|suivre}} ou {{t:raise|relancer}}. Si personne n'a {{t:bet|misé}}, vous pouvez {{t:check|checker}} ou {{t:bet|miser}}.
:::

:::note All-in et {{t:side-pot|pot secondaire}}
Vous ne pouvez pas {{t:bet|miser}} plus que ce que vous avez devant vous. Quand vous mettez tous vos {{t:chips|jetons}}, vous êtes **all-in** : vous ne participez plus aux enchères, et les {{t:community-cards|cartes communes}} restantes sont distribuées jusqu'au bout. Contre chaque adversaire, vous pouvez gagner au maximum ce que vous avez vous-même mis. Si les autres continuent à jouer pour plus, l'excédent va dans un **{{t:side-pot|pot secondaire}}**, que seuls eux se disputent.
:::
