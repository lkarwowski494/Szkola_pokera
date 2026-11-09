---
id: m4.l3
module: m4
order: 3
title: "Face à un 3-bet"
sub: "Se coucher, suivre ou faire un 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}} à {{n:pf.open-size}}, le Bouton a {{t:raise|relancé}} à {{n:pf.3bet.ip-total}}, les blindes {{t:fold|se sont couchées}}. Quelle part de votre {{t:range|range}} d'{{t:open|ouverture}} devez-vous au minimum continuer à jouer ({{t:call|suivre}} ou faire un 4-bet) pour que le 3-bet du Bouton ne soit pas rentable avec n'importe quelle main ?"
    table: { position: CO }
    options:
      - { text: "Environ {{n:mdf.vs-3bet-ip-size}} de votre {{t:range|range}} d'{{t:open|ouverture}}", correct: true, why: "Le Bouton risque {{n:pf.3bet.ip-total}} pour gagner {{n:vs3bet.win}}. Si vous vous {{t:fold|couchez}} dans plus de {{n:alpha.vs-3bet-ip-size}} des cas, son 3-bet est rentable même avec la pire main." }
      - { text: "Environ la moitié de votre {{t:range|range}}", why: "Trop pour un minimum : mathématiquement, {{n:mdf.vs-3bet-ip-size}} suffit. D'après les solutions de solveurs et les tableaux, celui qui {{t:open|ouvre}} se {{t:fold|couche}} avec environ {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} de ses {{t:open|ouvertures}}, il continue donc avec moins de la moitié de sa {{t:range|range}}." }
      - { text: "Toujours, avec n'importe quelle main", why: "Vous payez alors des 3-bets avec des mains qui perdent contre la {{t:range|range}} du Bouton. {{t:fold|Se coucher}} avec la partie la plus faible de vos {{t:open|ouvertures}} est correct." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}} à {{n:pf.open-size}}, le Bouton a {{t:raise|relancé}} à {{n:pf.3bet.ip-total}}, les blindes {{t:fold|se sont couchées}}. Que faites-vous ?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "Je {{t:fold|me couche}}", correct: true, why: "KJ dépareillé {{t:out-of-position}} est souvent dominé par AK, AJ et KQ, et il est difficile à jouer après le flop. Les supports de formation recommandent ici de {{t:fold|se coucher}}." }
      - { text: "Je {{t:call|suis}}", why: "C'est tentant, car ce sont des cartes hautes, mais {{t:out-of-position}} cette main a du mal à {{t:equity-realization|réaliser son équité}} et perd souvent contre un meilleur kicker." }
      - { text: "Je fais un 4-bet", why: "KJo est trop faible pour un 4-bet {{t:value|pour la valeur}}, et en {{t:bluff}} il ne bloque pas les mains avec lesquelles le Bouton continue." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}} à {{n:pf.open-size}}, le Bouton a {{t:raise|relancé}} à {{n:pf.3bet.ip-total}}, les blindes {{t:fold|se sont couchées}}. Que faites-vous ?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "Je fais un 4-bet", correct: true, why: "Avec AK, vous faites généralement un 4-bet : cette main veut engager tout le tapis, bloque les AA et KK de l'adversaire et domine AQ, KQ et les as plus faibles." }
      - { text: "Je {{t:call|suis}}", why: "Certaines sources {{t:call|suivent}} parfois avec AK, mais en général vous faites un 4-bet : {{t:out-of-position}}, après avoir {{t:call|suivi}}, vous perdez l'{{t:initiative|initiative}} et de la valeur." }
      - { text: "Je {{t:fold|me couche}}", why: "AK est l'une des meilleures mains préflop. {{t:fold|Se coucher}} ici est une grosse erreur." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton à {{n:pf.open-size}}, la {{t:small-blind|petite blinde}} {{t:fold|s'est couchée}}, la {{t:big-blind|grosse blinde}} a {{t:raise|relancé}} à {{n:pf.3bet.oop-total}}. Que faites-vous ?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "Je {{t:call|suis}}", correct: true, why: "Un {{t:connectors|connecteur}} assorti {{t:in-position}} {{t:equity-realization|réalise bien son équité}} : il touche des {{t:straight|quintes}} et des couleurs, et quand il rate, il est facile de {{t:fold|se coucher}} au flop." }
      - { text: "Je {{t:fold|me couche}}", why: "{{t:in-position|En position}}, cette main est assez jouable pour être défendue. {{t:fold|Se coucher}} serait trop serré." }
      - { text: "Je fais un 4-bet", why: "En {{t:bluff}}, les as assortis conviennent mieux, car ils bloquent AA et AK. 87s préfère voir un flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton à {{n:pf.open-size}}, la {{t:small-blind|petite blinde}} {{t:fold|s'est couchée}}, la {{t:big-blind|grosse blinde}} a {{t:raise|relancé}} à {{n:pf.3bet.oop-total}}. Que faites-vous ?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "Je {{t:fold|me couche}}", correct: true, why: "Selon une source, face à un gros 3-bet, vous vous {{t:fold|couchez}} avec les plus petites {{t:pair|paires}}, même {{t:in-position}} : elles gagnent surtout en touchant un set, et le prix est trop élevé. Une autre source admet de {{t:call|suivre}} avec elles {{t:in-position}}." }
      - { text: "Je {{t:call|suis}}, car j'ai la {{t:position|position}}", why: "La {{t:position|position}} aide, mais face à un 3-bet à {{n:pf.3bet.oop-total}}, le prix est trop élevé pour une main qui doit toucher un set." }
      - { text: "Je fais un 4-bet", why: "La {{t:pair|paire}} 33 n'est pas une main de 4-bet : ce n'est ni de la valeur, ni un bon {{t:bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}} à {{n:pf.open-size}}, le Bouton a {{t:raise|relancé}} à {{n:pf.3bet.ip-total}}, les blindes {{t:fold|se sont couchées}}. Que faites-vous ?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "Je fais un 4-bet", correct: true, why: "L'une des sources fait un 4-bet avec QQ (et JJ) dans la grande majorité des cas : le Bouton continue avec beaucoup de {{t:pair|paires}} plus faibles et d'as." }
      - { text: "Je {{t:call|suis}}", correct: true, why: "Également un bon coup : une autre source place QQ dans la {{t:range|range}} de {{t:call|call}}, pour ne pas faire coucher les mains plus faibles du Bouton. Les sources divergent, donc les deux coups sont bons." }
      - { text: "Je {{t:fold|me couche}}", why: "QQ est la troisième meilleure main préflop. {{t:fold|Se coucher}} est une grosse erreur." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Vous avez {{t:open|ouvert}} depuis le {{t:cutoff|CO}} à {{n:pf.open-size}}, le Bouton a {{t:raise|relancé}} à {{n:pf.3bet.ip-total}}, les blindes {{t:fold|se sont couchées}}. Que faites-vous ?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "Je {{t:call|suis}}", correct: true, why: "Un as fort assorti est la base de la {{t:range|range}} de {{t:call|call}} : il bloque AA et AK, et touche des couleurs et de bonnes {{t:pair|paires}}." }
      - { text: "Je {{t:fold|me couche}}", why: "Trop serré : AJs fait partie des meilleures mains pour se défendre face à un 3-bet." }
      - { text: "Je fais un 4-bet {{t:value|pour la valeur}}", why: "AJs est trop faible pour vouloir jouer tout le tapis. Les meilleures mains du Bouton le dominent." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "Vous avez {{t:open|ouvert}} depuis le Bouton à {{n:pf.open-size}}, la {{t:small-blind|petite blinde}} a {{t:raise|relancé}} à {{n:pf.3bet.oop-total}}, la {{t:big-blind|grosse blinde}} {{t:fold|s'est couchée}}. Vous avez KK et voulez faire un 4-bet. À combien ?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "À environ {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|En position}}, le 4-bet fait environ {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} le montant du 3-bet. Si la {{t:small-blind|petite blinde}} {{t:call|suit}}, le {{t:pot|pot}} contient environ {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (avec la {{t:big-blind|grosse blinde}} morte), et il reste dans les tapis environ {{n:spr.4bet.high}}–{{n:spr.4bet}} fois le contenu du {{t:pot|pot}}." }
      - { text: "À {{n:pf.4bet.too-small}}", why: "Trop peu : vous offrez à l'adversaire un très bon prix pour {{t:call|suivre}} {{t:out-of-position}}." }
      - { text: "All-in pour {{n:format.stack}}", why: "Avec des tapis de {{n:format.stack}}, le all-in fait coucher les mains plus faibles avec lesquelles l'adversaire aurait payé un 4-bet. Vous gagnez moins." }
---
Le 3-bet est la réponse de l'adversaire à votre {{t:open|ouverture}}. Vous avez trois possibilités : vous {{t:fold|coucher}}, {{t:call|suivre}} ou {{t:raise|relancer}} encore une fois, c'est-à-dire faire un 4-bet.

:::note D'où viennent ces règles
Cette leçon s'appuie sur des supports de formation issus de plusieurs sources et sur des résultats publiés d'autres solveurs, et non sur le solveur de l'application. Pour le jeu face à un 3-bet, le solveur de l'application n'a pas encore été validé ; c'est pourquoi les règles sont signalées comme des heuristiques.
:::

## Avec combien de mains continuer

Quand le Bouton {{t:raise|relance}} votre {{t:open|ouverture}} du {{t:cutoff|CO}} à {{n:pf.3bet.ip-total}}, il risque cette somme pour gagner {{n:vs3bet.win}}. Si vous vous {{t:fold|couchez}} dans plus de {{n:alpha.vs-3bet-ip-size}} des cas, son 3-bet est rentable avec n'importe quelle main. Vous devez donc continuer avec au moins environ {{n:mdf.vs-3bet-ip-size}} de votre {{t:range|range}} d'{{t:open|ouverture}}.

Selon une solution de solveur publiée ({{t:cutoff|CO}} face à un 3-bet du Bouton à {{n:pf.3bet.ip-total}}), celui qui {{t:open|ouvre}} se {{t:fold|couche}} avec environ {{n:pf.vs3bet.pub1.fold}} de ses {{t:open|ouvertures}}, {{t:call|suit}} avec environ {{n:pf.vs3bet.pub1.call}} et fait un 4-bet avec environ {{n:pf.vs3bet.pub1.4bet}} ; les tableaux simplifiés d'une autre source donnent environ {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. Nous retenons des intervalles proches des deux sources : {{t:fold|se coucher}} environ {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call|suivre}} environ {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet environ {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. La limite haute pour {{t:fold|se coucher}} se situe juste sous le seuil de {{n:alpha.vs-3bet-ip-size}} : en vous couchant plus souvent, vous rendriez le 3-bet du Bouton rentable avec n'importe quelle main. Pour {{t:call|suivre}}, il vous faut environ {{n:eq.call-3bet-ip-size}} d'équité : vous ajoutez {{n:vs3bet.call}} à un {{t:pot|pot}} qui, une fois que vous avez {{t:call|suivi}}, contient {{n:vs3bet.pot-after}}.

## {{t:out-of-position|Hors de position}}, choisissez avec prudence

{{t:out-of-position|Hors de position}}, vous {{t:call|suivez}} avec des mains qui jouent bien après le flop : surtout des cartes hautes assorties (KQs, QJs), des as forts assortis, des {{t:pair|paires}} moyennes et hautes, et une partie des {{t:connectors|connecteurs}} assortis. Les mains dépareillées plus faibles, comme KJo, ATo ou QTo, sont souvent dominées, vous vous {{t:fold|couchez}} donc avec elles.

## {{t:in-position|En position}}, défendez plus large

{{t:in-position|En position}}, vous {{t:call|suivez}} aussi avec les {{t:pair|paires}} de 66 à TT et les {{t:connectors|connecteurs}} assortis (T9s, 98s, 87s). Selon une source, face à un gros 3-bet, vous vous {{t:fold|couchez}} avec les plus petites {{t:pair|paires}}, même {{t:in-position}} : elles gagnent surtout en touchant un set, et le prix est trop élevé. Une autre source admet de {{t:call|suivre}} avec elles {{t:in-position}}.

## 4-bet

Avec AA, KK et AK, vous faites généralement un 4-bet {{t:value|pour la valeur}} ; certaines sources {{t:call|suivent}} parfois avec AK. Les sources jouent QQ et JJ différemment : l'une fait surtout un 4-bet, l'autre {{t:call|suit}}. En {{t:bluff}}, les meilleurs sont les as assortis, par exemple A5s : ils bloquent les AA et AK de l'adversaire et, une fois {{t:call|suivis}}, ont une chance de toucher une {{t:flush|couleur}} ou une {{t:straight|quinte}}. La taille du 4-bet est d'environ {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} le montant du 3-bet {{t:in-position}} et de {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position}}. Par exemple, quand vous faites depuis le Bouton un 4-bet face au 3-bet de la {{t:small-blind|petite blinde}} à {{n:pf.3bet.oop-total}} (la {{t:big-blind|grosse blinde}} {{t:fold|s'est couchée}}), vous {{t:raise|relancez}} à {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}} ; quand vous faites depuis le {{t:cutoff|CO}} un 4-bet face au 3-bet du Bouton à {{n:pf.3bet.ip-total}}, vous {{t:raise|relancez}} à environ {{n:pf.4bet.oop-example.low}}. Après un {{t:call|call}}, il reste dans les tapis environ {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} fois le contenu du {{t:pot|pot}}, si bien que les bonnes mains peuvent facilement engager le reste.
