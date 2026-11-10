---
id: m0.l1
module: m0
order: 1
title: "Les combinaisons"
sub: "Qui bat quoi"
rules: [R-M0-001, R-M0-002, R-M0-003]
drills:
  - kind: choice
    id: m0.l1.q1
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Qui gagne : une {{t:flush|couleur}} ou une {{t:straight|quinte}} ?"
    options:
      - { text: "{{t:flush|Couleur}}", correct: true, why: "La {{t:flush|couleur}} est plus haute dans le classement. Il est plus difficile de réunir 5 cartes de la même couleur que 5 cartes qui se suivent." }
      - { text: "{{t:straight|Quinte}}", why: "C'est une erreur fréquente chez les débutants. La {{t:straight|quinte}} est une place en dessous de la {{t:flush|couleur}}." }
      - { text: "Égalité", why: "Deux combinaisons différentes ne sont jamais à égalité. La plus haute dans le classement gagne toujours." }
  - kind: choice
    id: m0.l1.q2
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Vous avez un {{t:full-house|full}}, votre adversaire une {{t:flush|couleur}}. Qui gagne ?"
    options:
      - { text: "Vous, le {{t:full-house|full}} bat la {{t:flush|couleur}}", correct: true, why: "Le {{t:full-house|full}} ({{t:three-of-a-kind|brelan}} et {{t:pair|paire}}) est à la 4e place, la {{t:flush|couleur}} à la 5e. Ordre en partant du haut : quinte flush, {{t:four-of-a-kind|carré}}, {{t:full-house|full}}, {{t:flush|couleur}}, {{t:straight|quinte}}." }
      - { text: "L'adversaire, la {{t:flush|couleur}} bat le {{t:full-house|full}}", why: "C'est l'inverse. Le {{t:full-house|full}} est plus rare, donc plus fort." }
      - { text: "Ça dépend de la hauteur des cartes", why: "La hauteur des cartes ne compte que pour deux combinaisons du même type." }
  - kind: choice
    id: m0.l1.q3
    family: m0.ranking
    rules: [R-M0-001]
    prompt: "Qu'est-ce qui est plus fort : {{t:two-pair|deux paires}} ou un {{t:three-of-a-kind|brelan}} ?"
    options:
      - { text: "{{t:three-of-a-kind|Brelan}}", correct: true, why: "Le {{t:three-of-a-kind|brelan}} est à la 7e place, les {{t:two-pair|deux paires}} à la 8e. On les confond facilement, car {{t:two-pair|deux paires}} « semblent » faire plus de cartes." }
      - { text: "{{t:two-pair|Deux paires}}", why: "Les {{t:two-pair|deux paires}} sont une place en dessous du {{t:three-of-a-kind|brelan}}." }
  - kind: choice
    id: m0.l1.q4
    family: m0.kicker
    rules: [R-M0-002]
    prompt: "Vous avez tous les deux une {{t:pair|paire}} de rois. Qui gagne ?"
    table: { hand: "As Kd", opp: "Kc Qh", board: "Ks 9d 5c 2h 7s" }
    options:
      - { text: "Vous", correct: true, why: "La {{t:pair|paire}} est la même, c'est donc le kicker qui décide : votre as bat la dame de l'adversaire. C'est pourquoi AK est bien meilleur que KQ." }
      - { text: "L'adversaire", why: "La dame de l'adversaire est plus basse que votre as." }
      - { text: "{{t:split-pot|Partage du pot}}", why: "Il y aurait partage si les deux meilleures mains de cinq cartes étaient identiques. Ici, le kicker les départage : as contre dame." }
  - kind: choice
    id: m0.l1.q5
    family: m0.board-plays
    rules: [R-M0-003]
    prompt: "Il y a une {{t:straight|quinte}} sur le {{t:board|board}}. Qui gagne ?"
    table: { hand: "Ac Ad", opp: "Kc 2d", board: "5h 6h 7c 8d 9s" }
    options:
      - { text: "{{t:split-pot|Partage du pot}}", correct: true, why: "La meilleure main de cinq cartes des deux joueurs est la {{t:straight|quinte}} du {{t:board|board}}. La {{t:pair|paire}} d'as est plus faible que la {{t:straight|quinte}}, elle n'apporte donc rien. C'est le cas où l'on « {{t:playing-the-board|joue le board}} »." }
      - { text: "Vous, car vous avez une {{t:pair|paire}} d'as", why: "Une {{t:pair|paire}} d'as n'est qu'une {{t:pair|paire}}. La {{t:straight|quinte}} du {{t:board|board}} est plus forte, vous jouez donc avec elle, tout comme l'adversaire." }
      - { text: "L'adversaire", why: "Pour une {{t:straight|quinte}} plus haute, l'adversaire aurait besoin d'un dix." }
  - kind: generated
    id: m0.l1.g1
    family: m0.who-wins
    rules: [R-M0-001]
    generator: whoWins
    count: 3
  - kind: generated
    id: m0.l1.g2
    family: m0.kicker
    rules: [R-M0-002]
    generator: whoWinsKicker
    count: 2
  - kind: generated
    id: m0.l1.g3
    family: m0.best-hand
    rules: [R-M0-001]
    generator: bestHand
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar hands
  - kind: generated
    id: m0.l1.g-vocab-hands
    family: vocab.hands
    generator: vocab
    params: { area: hands, dir: both }
    count: 4
---
Au Texas Hold'em, vous recevez **2 {{t:hole-cards|cartes privatives}}**, et **5 {{t:community-cards|cartes communes}}** arrivent sur le {{t:board|board}}. Avec ces 7 cartes, vous formez la meilleure combinaison de **5**. La combinaison la plus forte remporte tout le {{t:pot|pot}}.

## Classement, de la plus forte à la plus faible

| | Combinaison | Exemple |
|---|---|---|
| 1 | {{t:royal-flush|Quinte flush royale}} | [[As Ks Qs Js Ts]] |
| 2 | {{t:straight-flush|Quinte flush}} : {{t:straight-flush|quinte dans une seule couleur}} | [[9h 8h 7h 6h 5h]] |
| 3 | {{t:four-of-a-kind|Carré}} | [[Qs Qh Qd Qc 4s]] |
| 4 | {{t:full-house|Full}} : {{t:three-of-a-kind|brelan}} et {{t:pair|paire}} | [[Ks Kd Kc 7h 7s]] |
| 5 | {{t:flush|Couleur}} | [[Ad Jd 8d 6d 2d]] |
| 6 | {{t:straight|Quinte}} (5 cartes qui se suivent) | [[Tc 9d 8s 7h 6c]] |
| 7 | {{t:three-of-a-kind|Brelan}} | [[8s 8h 8d Kc 3s]] |
| 8 | {{t:two-pair|Deux paires}} | [[Jh Jc 5s 5d Ac]] |
| 9 | {{t:pair|Paire}} | [[9c 9d Ah 7s 4c]] |
| 10 | {{t:high-card|Carte haute}} | [[Ac Qd 9s 6h 3c]] |

:::note Kicker
On compare d'abord le rang de la combinaison : un {{t:three-of-a-kind|brelan}} bat {{t:two-pair|deux paires}}. À combinaison égale, c'est sa hauteur qui décide : une {{t:pair|paire}} de rois bat une {{t:pair|paire}} de dames, et avec deux {{t:pair|paires}}, on compare d'abord la {{t:pair|paire}} la plus haute. Ce n'est que lorsque le cœur de la combinaison est identique (même {{t:pair|paire}}, même {{t:three-of-a-kind|brelan}} ou mêmes {{t:two-pair|deux paires}}) que les cartes d'accompagnement, les kickers, décident : d'abord la plus haute, puis, en cas d'égalité, la suivante. Seuls les kickers de la meilleure main de cinq cartes comptent. Si les deux mains de cinq cartes sont identiques, {{t:split-pot|le pot est partagé}}.
:::

L'as peut être la carte la plus basse d'une {{t:straight|quinte}} : [[5h 4s 3c 2d Ah]] est la {{t:straight|quinte}} la plus basse, appelée {{t:wheel|wheel}}.

Lorsque votre meilleure combinaison est composée uniquement des {{t:community-cards|cartes communes}} et que vos {{t:hole-cards|cartes privatives}} n'apportent rien, on dit que vous {{t:playing-the-board|jouez le board}} : au mieux, {{t:split-pot|vous vous partagez le pot}}.
