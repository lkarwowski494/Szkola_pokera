---
id: m4.l4
module: m4
order: 4
title: "Limpeurs"
sub: "Isolation : taille et range"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un joueur avant vous a seulement payé la {{t:big-blind|big blind}} (limp). Vous voulez {{t:raise|relancer}} depuis le Bouton. À combien ?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "À {{n:pf.iso.one-limper}}", correct: true, why: "Base {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} par limpeur. Cette taille retire au limpeur son bon prix." }
      - { text: "À {{n:pf.min-raise}}", why: "Une {{t:raise|relance}} minimale donne au limpeur un excellent prix et ne remporte presque jamais le {{t:pot|pot}} immédiatement." }
      - { text: "À {{n:pf.open-size}}, comme une {{t:open|ouverture}} normale", why: "Le limpeur a déjà mis une blinde, donc le {{t:pot|pot}} est plus gros. La {{t:raise|relance}} doit être plus grosse qu'une {{t:open|ouverture}} normale." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Deux joueurs avant vous ont seulement payé la {{t:big-blind|big blind}}. Vous voulez {{t:raise|relancer}} depuis le {{t:cutoff|CO}}. À combien ?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "À {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} pour chacun des deux limpeurs." }
      - { text: "À {{n:pf.iso.one-limper}}", why: "C'est la taille face à un limpeur. Chaque limpeur supplémentaire ajoute {{n:pf.iso.per-limper}}." }
      - { text: "Je paie seulement", why: "AQ assortis est une main à {{t:raise|relancer}} {{t:value|pour la value}}. Payer cède l'{{t:initiative|initiative}} et laisse tout le monde entrer à bon marché." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un joueur limpe, tout le monde se couche jusqu'à vous en {{t:small-blind|small blind}}. Vous voulez {{t:raise|relancer}}. À combien ?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "À {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Hors de position}}, vous ajoutez encore {{n:pf.iso.oop-extra}} : {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} par limpeur plus {{n:pf.iso.oop-extra}}." }
      - { text: "À {{n:pf.iso.one-limper}}", why: "C'est la taille {{t:in-position|en position}}. {{t:out-of-position|Hors de position}}, vous {{t:raise|relancez}} un peu plus, pour que l'adversaire {{t:fold|se couche}} plus souvent ou paie plus cher." }
      - { text: "Je paie seulement", why: "Avec KK, vous construisez toujours le {{t:pot|pot}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Un joueur avant vous a seulement payé la {{t:big-blind|big blind}} (limp). Vous êtes au Bouton. Que faites-vous ?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "Je {{t:raise|relance}} à {{n:pf.iso.one-limper}}", correct: true, why: "AJ est une main d'{{t:isolation|isolation}} : elle domine beaucoup de mains avec lesquelles un joueur plus faible limpe, et après le flop vous avez la {{t:position|position}}. Taille : {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} par limpeur." }
      - { text: "Je {{t:raise|relance}} à {{n:pf.min-raise}}", sizeError: true, why: "Bonne action, mais une {{t:raise|relance}} minimale donne au limpeur un excellent prix, donc il ne {{t:fold|se couchera}} presque jamais et vous ne jouez pas en tête-à-tête contre lui. Vous {{t:raise|relancez}} à {{n:pf.iso.one-limper}}." }
      - { text: "Je paie", why: "Vous cédez l'{{t:initiative|initiative}} et laissez entrer les blinds à bon marché. Avec une main qui domine le limpeur, vous voulez construire le {{t:pot|pot}}." }
      - { text: "Je {{t:fold|me couche}}", why: "Trop serré : face à un limpeur, le Bouton {{t:isolation|isole}} environ {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} des mains, et AJ y entre largement." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Trois joueurs avant vous ont seulement payé la {{t:big-blind|big blind}}. Vous êtes au Bouton. Que faites-vous ?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Je paie", correct: true, why: "Face à plusieurs limpeurs, les {{t:connectors|connecteurs}} assortis sont des mains spéculatives : vous voyez le flop à bon marché {{t:in-position|en position}} et pouvez toucher une grosse main. Une source recommande ici de payer ; une autre conseille de l'éviter, donc nous acceptons aussi de {{t:fold|se coucher}}." }
      - { text: "Je {{t:fold|me couche}}", correct: true, why: "Également correct : une source conseille de ne pas payer, mais de {{t:raise|relancer}} ou de {{t:fold|se coucher}}, et 76s ne se prête pas à une {{t:raise|relance}} {{t:value|pour la value}}. Une autre source recommande de payer, donc nous acceptons les deux coups." }
      - { text: "Je {{t:raise|relance}} à {{n:pf.iso.two-limpers}}", why: "Avec trois limpeurs, une {{t:raise|relance}} en {{t:bluff|bluff}} remporte rarement le {{t:pot|pot}}, et la taille devrait être encore plus grosse. 76s ne se prête pas à une {{t:raise|relance}} {{t:value|pour la value}}." }
---
Le limp consiste à entrer dans le coup en payant seulement la {{t:big-blind|big blind}}. Les professionnels limpent rarement en premier (règle du module 3), donc les limpeurs aux micro-limites sont généralement des joueurs plus faibles. {{t:raise|Relancer}} un limpeur s'appelle une {{t:isolation|isolation}} : vous voulez jouer contre lui en tête-à-tête, idéalement {{t:in-position|en position}}.

:::note D'où viennent ces règles
Le solveur de l'application ne joue pas les limps, donc cette leçon s'appuie sur des supports de formation. Les règles sont marquées comme heuristiques.
:::

## Taille de l'{{t:isolation|isolation}}

En ligne, vous {{t:raise|relancez}} à {{n:pf.iso.base}} plus {{n:pf.iso.per-limper}} par limpeur : face à un, à {{n:pf.iso.one-limper}} ; face à deux, à {{n:pf.iso.two-limpers}}. {{t:out-of-position|Hors de position}}, vous ajoutez encore {{n:pf.iso.oop-extra}}. Ne relancez jamais au minimum : le limpeur obtiendrait un excellent prix et ne {{t:fold|se coucherait}} presque jamais.

## {{t:range|Range}} d'{{t:isolation|isolation}}

Au Bouton face à un limpeur, vous {{t:isolation|isolez}} large, environ {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} des mains : {{t:pair|paires}} moyennes et hautes, as assortis, as forts dépareillés, cartes hautes et une partie des {{t:connectors|connecteurs}} assortis. Plus votre {{t:position|position}} est précoce et plus il y a de limpeurs, plus votre {{t:range|range}} est étroite : face à trois limpeurs, vous {{t:raise|relancez}} surtout {{t:value|pour la value}}.

Avec des mains spéculatives, comme les petites {{t:pair|paires}} et les {{t:connectors|connecteurs}} assortis, vous pouvez payer face à plusieurs limpeurs {{t:in-position|en position}}. Ici, les sources divergent : l'une recommande de payer, l'autre conseille de l'éviter ; dans les exercices, nous acceptons les deux coups, payer et {{t:fold|se coucher}}.
