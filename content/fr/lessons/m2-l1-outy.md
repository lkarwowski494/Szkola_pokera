---
id: m2.l1
module: m2
order: 1
title: "Outs et chances"
sub: "La règle du 2 et du 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Combien d'outs avez-vous pour la {{t:flush|couleur}} ?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Vous avez {{n:draw.flush.seen}} cœurs (2 en main, 2 sur le {{t:board|board}}). Le paquet compte {{n:cards.per-suit}} cœurs, il en reste donc {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}}, ce sont tous les cœurs du paquet, mais vous en voyez déjà {{n:draw.flush.seen}}." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}}, ce sont les cœurs que vous avez déjà. On compte les cartes dont vous avez besoin." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Combien d'outs avez-vous pour la {{t:straight|quinte}} ?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Vous avez 6-7-8-9. Chaque cinq et chaque dix vous donnent la {{t:straight|quinte}} : {{n:draw.oesd.ranks}} hauteurs × {{n:cards.suits}} couleurs = {{n:outs.oesd}} cartes." }
      - { text: "{{n:outs.gutshot}}", why: "C'est ce que vous auriez avec une seule carte manquante au milieu (gutshot). Ici, la {{t:straight}} est ouverte des deux côtés." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Deux hauteurs de cartes (le cinq et le dix), mais chacune existe en quatre couleurs." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, vous avez {{n:outs.flush}} outs pour la {{t:flush|couleur}}. Quelle chance avez-vous de toucher à la river ?"
    options:
      - { text: "Environ {{n:odds.flush.turn-river}}", correct: true, why: "Une carte à venir : {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (approximation). Exactement {{n:outs.flush}} sur {{n:cards.unseen.turn}} cartes inconnues, soit {{n:odds.flush.turn-river}}." }
      - { text: "Environ {{n:odds.flush.flop-river}}", why: "C'est la chance au flop, quand deux cartes restent à venir. Au turn, il n'en reste qu'une." }
      - { text: "Environ {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} voudrait dire qu'une carte inconnue sur deux vous donne la {{t:flush}}. Seules {{n:outs.flush}} sur {{n:cards.unseen.turn}} la donnent." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Au flop, vous avez un gutshot ({{n:outs.gutshot}} outs). Quelle chance avez-vous de toucher d'ici la river ?"
    options:
      - { text: "Environ {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (approximation). Exactement {{n:odds.gutshot.flop-river}}. Mais vous n'avez cette chance que si vous voyez les deux cartes sans autres {{t:bet|mises}} (all-in). Quand l'adversaire {{t:bet|mise}} au flop, vous payez pour une seule carte : la chance est alors d'environ {{n:odds.gutshot.flop-turn}}." }
      - { text: "Environ {{n:odds.gutshot.rule-turn}}", why: "C'est l'approximation de la chance avec une seule carte ({{n:outs.gutshot}} × 2). La question porte sur les deux cartes : le turn et la river." }
      - { text: "Environ {{n:odds.oesd.flop-river}}", why: "C'est ce que vous auriez avec {{n:outs.oesd}} outs. Un gutshot n'en a que {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Vous avez un {{t:flush-draw}}, et l'adversaire {{t:bet|mise}}. À quelle chance de toucher comparez-vous le prix du {{t:call|call}} ?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Environ {{n:odds.flush.flop-turn}}, la chance au turn", correct: true, why: "Le {{t:call|call}} n'achète qu'une seule carte. Au turn, l'adversaire peut {{t:bet|miser}} à nouveau, et vous paierez la river séparément. {{n:outs.flush}} sur {{n:cards.unseen.flop}}, c'est environ {{n:odds.flush.flop-turn}}." }
      - { text: "Environ {{n:odds.flush.flop-river}}, la chance d'ici la river", why: "Vous n'avez cette chance que si vous êtes sûr de voir les deux cartes sans autres {{t:bet|mises}}, c'est-à-dire en cas d'all-in. En payant une {{t:bet}} normale au flop, vous achetez une seule carte." }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn. Vous avez {{n:outs.flush}} outs pour la {{t:flush|couleur}}. Quel pourcentage de chance de toucher à la river donne la règle du 2 et du 4 ? Entrez un nombre."
    answer: odds.flush.rule-turn
    explanation: "Une carte à venir, donc vous multipliez par 2 : {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (approximation). Exactement : {{n:outs.flush}} sur {{n:cards.unseen.turn}} cartes, soit {{n:odds.flush.turn-river}}."
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
Un **out** est une carte qui améliore votre main en une main probablement gagnante. Compter les outs permet d'estimer rapidement vos chances sans calculatrice.

## {{t:draw|Tirages}} typiques

- **{{t:flush-draw|Tirage couleur}}** ({{n:draw.flush.seen}} cartes de la même couleur, il en manque une pour la {{t:flush|couleur}}) : **{{n:outs.flush}} outs**. Une couleur compte {{n:cards.per-suit}} cartes, et vous en voyez {{n:draw.flush.seen}}.
- **{{t:oesd|Tirage quinte par les deux bouts}}**, p. ex. [[8c 9d]] sur un {{t:board|board}} [[6s 7h Kd]] : **{{n:outs.oesd}} outs**, soit quatre cinq et quatre dix.
- **Trou dans la {{t:straight|quinte}} (gutshot)**, p. ex. 5-6-8-9 sans le sept : **{{n:outs.gutshot}} outs**.

## La règle du 2 et du 4

La règle donne une approximation de la chance sans calculatrice : vous multipliez les outs par 2 ou par 4. Les chances exactes figurent dans le tableau ci-dessous.

```formula
chance ≈ outs × 2   (une carte à venir)
chance ≈ outs × 4   (deux cartes, seulement si vous voyez les deux sans autres mises)
```

| {{t:draw|Tirage}} | Outs | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| {{t:flush|Couleur}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|Tirage quinte par les deux bouts}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## Une carte ou deux ?

Quand l'adversaire {{t:bet|mise}} au flop, votre {{t:call}} n'achète qu'une seule carte : le turn. Au turn, l'adversaire peut {{t:bet|miser}} à nouveau, et vous paierez la river séparément. C'est pourquoi, face à une {{t:bet|mise}} au flop, vous comptez la chance pour la **carte suivante** (× 2) : pour la {{t:flush|couleur}}, c'est {{n:outs.flush}} sur {{n:cards.unseen.flop}}, soit environ {{n:odds.flush.flop-turn}}. Vous ne prenez la chance **d'ici la river** (× 4, environ {{n:odds.flush.flop-river}} pour la {{t:flush|couleur}}) que si vous êtes sûr de voir les deux cartes sans autres {{t:bet|mises}}, c'est-à-dire quand quelqu'un est all-in.

:::note D'où viennent ces chiffres
Au turn, vous ne connaissez pas {{n:cards.unseen.turn}} cartes ({{n:cards.deck}} moins vos {{n:cards.hole}} et les {{n:cards.board.turn}} du {{t:board|board}}). La chance de toucher la {{t:flush|couleur}} est de {{n:outs.flush}} sur {{n:cards.unseen.turn}}. La règle du 2 et du 4 se trompe au plus d'environ {{n:rule24.error.max.pp}} points de pourcentage, tant que vous n'avez pas plus de {{n:rule24.outs.max}} outs.
:::
