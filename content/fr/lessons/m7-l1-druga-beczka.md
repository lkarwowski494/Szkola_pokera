---
id: m7.l1
module: m7
order: 1
title: "Second barrel"
sub: "Quand miser une deuxième fois à la turn"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton et la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Sur le flop [[Jd 7c 3s]], vous avez {{t:bet|misé}} un c-bet et elle a {{t:call|suivi}}. Quelle carte à la turn aide le plus votre {{t:second-barrel|second barrel}} ?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Oui : un as touche beaucoup de mains de votre {{t:range|range}} d'{{t:open|ouverture}} (AK, AQ, AJ), alors que la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} le flop surtout avec des {{t:pair|paires}} et des {{t:draw|tirages}}. Chacune de ses {{t:pair|paires}} descend d'un cran." }
      - { text: "[[8h]]", why: "Non : le huit se connecte au flop. Il donne une {{t:straight|quinte}} à T9 et {{t:two-pair|deux paires}} à 87, des mains que la {{t:big-blind|grosse blinde}} défend beaucoup. C'est plutôt une carte pour elle." }
      - { text: "[[3h]]", why: "Pas la pire, mais elle change peu de choses : elle améliore rarement votre {{t:range|range}}, et un adversaire avec une {{t:pair|paire}} a toujours une {{t:pair|paire}}. L'as apporte beaucoup plus à votre {{t:second-barrel|second barrel}}." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Pourquoi un as à la turn après un flop [[Jd 7c 3s]] sert-il bien le {{t:second-barrel|second barrel}} de l'{{t:open|ouvreur}} au Bouton ?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Il touche vos AK et AQ, et la {{t:pair|paire}} de l'adversaire devient la deuxième ou la troisième {{t:pair|paire}}", correct: true, why: "Oui : une carte haute touche plus souvent la {{t:range|range}} de l'{{t:open|ouvreur}}, et un adversaire qui a {{t:call|suivi}} le flop avec une {{t:pair|paire}} de valets ou de sept a maintenant une main plus faible par rapport au {{t:board|board}}." }
      - { text: "Parce que sur un as, l'adversaire {{t:fold|se couche}} toujours", why: "Pas toujours : un adversaire avec un as ou un set paiera. L'as augmente les chances qu'il {{t:fold|se couche}}, mais ne garantit rien." }
      - { text: "Parce que l'as complète les {{t:draw|tirages}} de l'adversaire", why: "Non : sur ce {{t:board|board}}, l'as ne complète aucune {{t:flush|couleur}} ni aucune {{t:straight|quinte}} que l'adversaire pourrait avoir. Il aide parce qu'il correspond à votre {{t:range|range}}." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton et la {{t:big-blind|grosse blinde}} a {{t:call|suivi}}. Au flop, vous avez {{t:bet|misé}} un c-bet et elle a {{t:call|suivi}}. La turn est un sept. Le {{t:pot|pot}} contient {{n:ex.pot}} et l'adversaire {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Je checke}}", correct: true, why: "Un sept sur un {{t:board|board}} avec un neuf et un six donne une {{t:straight|quinte}} à T8 et 85 et {{t:two-pair|deux paires}} à 76 et 97, des mains que la {{t:big-blind|grosse blinde}} défend. Vous n'avez ni {{t:pair|paire}} ni {{t:draw|tirage}}. Vous renoncez au {{t:bluff|bluff}} et prenez une carte gratuite." }
      - { text: "Je mise {{n:ex.bet.three-quarters}}", why: "Cette carte correspond à la {{t:range|range}} de l'adversaire, pas à la vôtre, et vous n'avez pas d'outs vers une main forte. Tirez un {{t:second-barrel|second barrel}} en {{t:bluff|bluff}} sur les cartes qui vous aident et avec des mains qui peuvent s'améliorer." }
      - { text: "Je mise {{n:ex.bet.pot}}", why: "Un gros {{t:bluff|bluff}} sur une carte qui favorise l'adversaire risque beaucoup : il devrait {{t:fold|se coucher}} plus souvent que dans {{n:alpha.bet-pot}} des cas, et après avoir {{t:call|suivi}} le flop, il a beaucoup de {{t:pair|paires}} et de {{t:draw|tirages}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton et la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} votre c-bet au flop. La turn est un as. Le {{t:pot|pot}} contient {{n:ex.pot}} et l'adversaire {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Je mise {{n:ex.bet.three-quarters}}", correct: true, why: "Un bon {{t:second-barrel|second barrel}} : l'as correspond à votre {{t:range|range}}, et vous avez un gutshot vers une {{t:straight|quinte}} (un dix). Si l'adversaire {{t:fold|couche}} une {{t:pair|paire}}, vous gagnez tout de suite, et s'il {{t:call|suit}}, vous pouvez encore toucher." }
      - { text: "Je mise {{n:ex.bet.quarter}}", sizeError: true, why: "Bonne action, mauvaise taille : une mise aussi bon marché, l'adversaire la {{t:call|suivra}} avec n'importe quelle {{t:pair|paire}}, et ce {{t:bluff|bluff}} gagne surtout grâce aux {{t:fold|folds}}. Sur une carte qui vous aide, misez gros, comme avec les mains fortes." }
      - { text: "{{t:check|Je checke}}", correct: true, why: "C'est bien aussi : vous avez des outs et vous verrez la river gratuitement, donc {{t:check|checker}} n'est pas une erreur. Dans un exemple de solveur publié, un gutshot vers la {{t:straight|quinte}} max a {{t:check|checké}} la turn. Les deux jeux sont corrects." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton et la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} votre c-bet au flop. La turn est un deux. Le {{t:pot|pot}} contient {{n:ex.pot}} et l'adversaire {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Je checke}}", correct: true, why: "Vous n'avez ni {{t:pair|paire}} ni {{t:draw|tirage}} : trois cœurs, c'est trop peu avec une seule carte à venir, et il vous manque deux cartes pour une {{t:straight|quinte}}. Le deux ne change rien, et l'adversaire a {{t:call|suivi}} le flop sur un {{t:board|board}} avec un roi, donc il a souvent une {{t:pair|paire}}. Vous renoncez au {{t:bluff|bluff}}." }
      - { text: "Je mise {{n:ex.bet.three-quarters}}", why: "Un {{t:bluff|bluff}} sans outs ne gagne que si l'adversaire {{t:fold|se couche}}. Après avoir {{t:call|suivi}} le flop, il a beaucoup de {{t:pair|paires}} (rois, huit) qui ne {{t:fold|se coucheront}} pas sur un deux neutre." }
      - { text: "{{t:fold|Je me couche}}", why: "L'adversaire {{t:check|checke}}, donc vous pouvez {{t:check|checker}} gratuitement (règle du module 1). {{t:fold|Se coucher}} abandonne le {{t:pot|pot}} sans raison." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Vous {{t:bet|misez}} un {{t:second-barrel|second barrel}} avec un {{t:flush-draw|tirage couleur}} et l'adversaire {{t:call|suit}}. Quelles chances vous reste-t-il ?"
    options:
      - { text: "Env. {{n:odds.flush.turn-river}} de toucher la {{t:flush|couleur}} à la river", correct: true, why: "Oui : c'est votre deuxième façon de gagner. {{n:outs.flush}} outs parmi {{n:cards.unseen.turn}} cartes inconnues. C'est pourquoi un {{t:semi-bluff|semi-bluff}} vaut mieux qu'un {{t:bluff|bluff}} sans outs." }
      - { text: "Aucune, le {{t:bluff|bluff}} a échoué", why: "Un {{t:bluff|bluff}} sans outs n'a plus aucune chance, mais vous avez un {{t:draw|tirage}} : une {{t:flush|couleur}} à la river gagne même s'il a {{t:call|suivi}}." }
      - { text: "Env. {{n:odds.flush.flop-river}}", why: "C'est ce que vous aviez au flop, avec deux cartes à venir. À la turn, il en reste une : {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton et la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} votre c-bet au flop. La turn est un deux. Le {{t:pot|pot}} contient {{n:ex.pot}} et l'adversaire {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Je checke}}", correct: true, why: "Une {{t:pair|paire}} de neuf est une main moyenne : elle bat les {{t:bluff|bluffs}}, mais perd contre chaque roi. Face à une deuxième mise, l'adversaire {{t:fold|couchera}} les mains moins bonnes et paiera avec ses rois. En {{t:check|checkant}}, vous gardez un petit {{t:pot|pot}} et allez jusqu'au showdown." }
      - { text: "Je mise {{n:ex.bet.three-quarters}}", why: "L'adversaire a déjà {{t:call|suivi}} le flop sur un {{t:board|board}} avec un roi. Les mains moins bonnes (huit, trois) {{t:fold|se coucheront}} ou paieront une fois, et les meilleures paieront toujours. Une telle mise fait gagner de l'argent aux mains meilleures." }
      - { text: "Je mise pour voir où j'en suis", why: "Miser « pour l'information » est une erreur fréquente : vous la payez, car les meilleures mains ne vous laisseront de toute façon pas passer, et les moins bonnes fuiront. Vous misez pour la {{t:value|value}} ou en {{t:bluff|bluff}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton et la {{t:big-blind|grosse blinde}} a {{t:call|suivi}} votre c-bet au flop. La turn est un deux. Le {{t:pot|pot}} contient {{n:ex.pot}} et l'adversaire {{t:check|checke}}. Que faites-vous ?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Je mise pour la {{t:value|value}}", correct: true, why: "Une {{t:top-pair|top paire}} avec le meilleur kicker est une main forte. L'adversaire a {{t:call|suivi}} le flop, donc il a souvent un roi plus faible ou des huit, qui paieront encore une fois." }
      - { text: "{{t:check|Je checke}}, l'adversaire n'a rien de toute façon", why: "L'adversaire a {{t:call|suivi}} le flop, donc il a souvent une {{t:pair|paire}}. En {{t:check|checkant}}, vous perdez une {{t:bet|mise}} qu'une main moins bonne aurait payée." }
      - { text: "Je mise all-in", why: "Les {{t:pair|paires}} moins bonnes paieront rarement un stack entier. Choisissez une taille qui sera payée par les rois plus faibles et les huit." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Avec quelles mains {{t:bet|misez}}-vous le plus souvent un {{t:second-barrel|second barrel}} à la turn ?"
    options:
      - { text: "Les mains fortes et les {{t:draw|tirages}} ; les mains moyennes {{t:check|checkent}}", correct: true, why: "Oui : les mains fortes veulent être payées, les {{t:draw|tirages}} gagnent de deux façons, et les mains moyennes ne gagnent rien à une {{t:bet|mise}} supplémentaire." }
      - { text: "Toutes, pour ne pas perdre l'{{t:initiative|initiative}}", why: "L'{{t:initiative|initiative}} seule ne fait pas gagner. L'adversaire a {{t:call|suivi}} le flop, donc il a une {{t:range|range}} plus forte, et les mains sans outs et les {{t:pair|paires}} moyennes perdent à miser sans arrêt." }
      - { text: "Seulement les mains les plus fortes", why: "Alors l'adversaire se coucherait chaque fois que vous misez et ne paierait que lorsqu'il vous bat. Les {{t:draw|tirages}} sont des {{t:semi-bluff|semi-bluffs}} naturels." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. Le {{t:pot|pot}} contient {{n:ex.pot}}, vous {{t:bluff|bluffez}} avec une main qui ne gagnera presque jamais et vous {{t:bet|misez}} {{n:ex.bet.three-quarters}}. À quelle fréquence l'adversaire doit-il {{t:fold|se coucher}} pour que ce {{t:bluff|bluff}} soit à l'équilibre ? Saisissez le nombre en pourcentage."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = mise ÷ ({{t:pot|pot}} + mise) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Avec des outs, il vous faut moins de {{t:fold|folds}}, car vous gagnerez de toute façon une partie des {{t:call|calls}} à la river."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Pourquoi la {{t:range|range}} de l'adversaire à la turn est-elle plus forte qu'au flop quand il a {{t:call|suivi}} le c-bet ?"
    options:
      - { text: "Parce qu'il a {{t:fold|couché}} ses mains les plus faibles au flop", correct: true, why: "Oui : face à un c-bet, les mains sans {{t:pair|paire}} et sans {{t:draw|tirage}} {{t:fold|se couchent}}. Il reste les {{t:pair|paires}} et les {{t:draw|tirages}}, donc le {{t:second-barrel|second barrel}} affronte une {{t:range|range}} plus forte que la première mise." }
      - { text: "Parce que la turn l'aide toujours", why: "Non : la turn est aléatoire et vous aide parfois (p. ex. un as). C'est sa propre décision au flop qui renforce la {{t:range|range}} de l'adversaire." }
      - { text: "Elle ne l'est pas, il a la même {{t:range|range}} qu'avant le flop", why: "Chaque décision élimine une partie des mains. Celui qui a {{t:call|suivi}} une {{t:bet|mise}} a généralement touché quelque chose ou a un {{t:draw|tirage}}." }
---
Le {{t:second-barrel|second barrel}} est la deuxième {{t:bet|mise}} du joueur qui a {{t:raise|relancé}} avant le flop : un c-bet au flop, un {{t:call|call}}, puis une mise à la turn. À la turn, vous ne vous demandez pas seulement « ai-je une main ? », mais aussi « cette carte m'aide-t-elle, ou aide-t-elle l'adversaire ? ».

## L'adversaire a {{t:call|suivi}}, donc il est plus fort

Face à un c-bet, l'adversaire {{t:fold|couche}} les mains sans {{t:pair|paire}} et sans {{t:draw|tirage}}. Celui qui a {{t:call|suivi}} a généralement une {{t:pair|paire}} ou un {{t:draw|tirage}}, parfois des cartes hautes avec un backdoor (comme dans la défense du M6). C'est pourquoi le {{t:second-barrel|second barrel}} affronte une {{t:range|range}} plus forte que la première mise, et vous ne misez pas une deuxième fois avec tout.

## Quelle carte aide

- **Une carte haute sur un {{t:board|board}} plus bas** (as, roi) aide généralement l'{{t:open|ouvreur}} : elle touche ses AK, AQ, KQ, et chaque {{t:pair|paire}} de l'adversaire descend d'un cran. Sur ces cartes, vous misez une deuxième fois plus souvent, y compris en {{t:bluff|bluff}}.
- **Une carte basse qui se connecte au {{t:board|board}}**, p. ex. un sept sur [[9h 6c 2d]], aide la {{t:big-blind|grosse blinde}} : elle donne des {{t:straight|quintes}} et {{t:two-pair|deux paires}} aux mains qu'elle défend le plus.
- **Une carte neutre**, p. ex. un deux sur [[Kd 8c 3s]], change peu de choses. C'est votre main qui décide.

## Avec quoi miser une deuxième fois

Vous misez avec les mains fortes (pour la {{t:value|value}}) et les {{t:draw|tirages}} (en {{t:semi-bluff|semi-bluff}}). Un {{t:semi-bluff|semi-bluff}} gagne de deux façons : quand l'adversaire {{t:fold|se couche}} ou quand vous touchez à la river. Avec les mains sans {{t:pair|paire}} et sans outs, vous renoncez plus souvent, car elles ne gagnent que si l'adversaire se couche, sauf si elles bloquent les mains avec lesquelles l'adversaire paiera. Quand l'adversaire peut répondre par une {{t:raise|relance}}, le solveur {{t:bluff|bluffe}} aussi avec des mains sans outs.

Un {{t:bluff|bluff}} sans chance est à l'équilibre quand l'adversaire {{t:fold|se couche}} dans mise ÷ ({{t:pot|pot}} + mise) des cas (l'alpha du M6). Avec une mise de 3/4 du {{t:pot|pot}}, c'est {{n:alpha.bet-three-quarters}} ; avec une mise d'un demi-{{t:pot|pot}}, {{n:alpha.bet-half}}.

## Les mains moyennes {{t:check|checkent}}

Une {{t:second-pair|deuxième paire}} ou une {{t:top-pair|top paire}} avec un kicker faible bat les {{t:bluff|bluffs}}, mais perd contre les {{t:pair|paires}} meilleures. Face à une deuxième mise, les mains moins bonnes {{t:fold|se coucheront}} et les meilleures paieront. Vous {{t:check|checkez}}, gardez un petit {{t:pot|pot}} et allez jusqu'au showdown.

:::note D'où viennent ces règles
Les grandes orientations (les cartes hautes favorisent généralement le {{t:second-barrel|second barrel}}, des {{t:bluff|bluffs}} avec des outs plutôt que sans outs, les mains moyennes {{t:check|checkent}}) sont des heuristiques issues de supports de formation et d'analyses de solvers. Elles s'appliquent à des stacks d'env. {{n:format.stack}}. C'est une simplification : le solveur {{t:bluff|bluffe}} aussi avec une partie des mains sans outs quand elles bloquent la {{t:value|value}} de l'adversaire ou quand l'adversaire peut répondre par une {{t:raise|relance}}. L'application n'indique pas à quelle fréquence miser en pourcentage, car ces chiffres dépendent de la donne précise dans les résultats des solvers.
:::
