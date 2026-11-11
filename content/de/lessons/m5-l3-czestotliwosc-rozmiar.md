---
id: m5.l3
module: m5
order: 3
title: "Wie oft und wie viel"
sub: "C-Bet in Position"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}} und {{t:check|checkt}} am Flop. Welcher Plan passt zu diesem Flop?"
    position: BTN
    options:
      check: "Ich {{t:check|checke}} öfter, C-Bet seltener als sonst"
      small: "C-Bet oft und klein: {{n:cbet.size.small}} des {{t:pot|Pots}} ({{n:cbet.btn.small}})"
      big: "C-Bet oft und groß: {{n:cbet.size.big}} des {{t:pot|Pots}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Zu vorsichtig: Auf einem {{t:dry|trockenen}}, hohen Flop hast du den {{t:range-advantage|Range-Vorteil}}, und dein Gegner hat meist nichts getroffen. Wenn du {{t:check|checkst}}, gibst du ihm eine Freikarte."
          small: "Ja: Ein {{t:dry|trockener}}, hoher Flop begünstigt dich. Eine kleine {{t:bet|Bet}} reicht, damit dein Gegner schwache Hände {{t:fold|foldet}}, und schlechtere {{t:pair|Paare}} {{t:call|callen}} sie trotzdem."
          big: "Richtige Aktion, falsche Größe: Auf einem {{t:dry|trockenen}} Flop hat dein Gegner wenige {{t:draw|Draws}}, und Hände, die nichts getroffen haben, {{t:fold|folden}} auch auf eine kleine {{t:bet|Bet}}. Eine größere {{t:bet|Bet}} bringt ungefähr dieselben Hände zum {{t:fold|Folden}}, riskiert aber mehr. Bette etwa {{n:cbet.size.small}} des {{t:pot|Pots}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Zu vorsichtig: Du hast den {{t:range-advantage|Range-Vorteil}}, und auf einem {{t:paired|gepaarten}} Flop ist ein {{t:draw}} kaum zu bekommen, also kann ein Gegner ohne {{t:pair|Paar}} selten auch nur eine kleine {{t:bet|Bet}} bezahlen."
          small: "Ja: Auf einem {{t:paired|gepaarten}} Flop bettest du oft und klein. Ein Gegner ohne {{t:pair|Paar}} hat selten etwas zum {{t:call|Callen}}, und einen {{t:three-of-a-kind|Drilling}} können beide Spieler haben, also gibt es keinen Grund, mehr zu riskieren."
          big: "Richtige Aktion, falsche Größe: Auf einem {{t:paired|gepaarten}} Flop kann jeder von euch einen {{t:three-of-a-kind|Drilling}} haben, also lohnt sich eine große {{t:bet|Bet}} nicht, und die schwachen Hände deines Gegners {{t:fold|folden}} auch auf eine kleine. Etwa {{n:cbet.size.small}} des {{t:pot|Pots}} reichen."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        sizeDown: { ranks: [connected] }
        why:
          check: "Ja: Ein niedriger Flop mit nah beieinanderliegenden Karten trifft die {{t:range|Range}} des {{t:big-blind|Big Blinds}}: Er verteidigt viele Hände mit kleinen Karten, und deine hohen Karten haben hier verfehlt. Auf einem {{t:connected|verbundenen}} Flop hat er auch {{t:straight|Straßen}} und {{t:two-pair|zwei Paare}}, also hast du meist keinen {{t:nuts-advantage|Nuts-Vorteil}}. Du c-bettest seltener als auf hohen Flops: Viele Hände {{t:check|checken}}, und es betten vor allem starke Hände und starke {{t:draw|Draws}}."
          small: "Zu oft: Ein niedriger Flop mit nah beieinanderliegenden Karten trifft die {{t:range|Range}} des {{t:big-blind|Big Blinds}}, und auf einem {{t:connected|verbundenen}} hast du meist keinen {{t:nuts-advantage|Nuts-Vorteil}}. Häufige C-Bets, selbst kleine, geben dem {{t:big-blind|Big Blind}} die Gelegenheit, mit seinen stärksten Händen nach vorherigem {{t:check|Checken}} zu {{t:raise|raisen}} (Check-Raise)."
          big: "Zu oft und zu teuer: Dieser Flop trifft die {{t:range|Range}} des {{t:big-blind|Big Blinds}}, und auf einem {{t:connected|verbundenen}} hat er auch {{t:straight|Straßen}} und {{t:two-pair|zwei Paare}}. Eine häufige große C-Bet riskiert viel, wenn du selbst meist nur hohe Karten hast."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}} und {{t:check|checkt}}. Du hast ein {{t:pair|Paar}} Könige mit Bube. Was tust du?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-Bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} des {{t:pot|Pots}})", correct: true, why: "Ja: {{t:top-pair}} (ein {{t:pair|Paar}} mit der höchsten Karte auf dem {{t:board}}) auf einem {{t:dry|trockenen}} Flop. Eine kleine {{t:bet|Bet}} bekommt einen {{t:call}} von Siebenen, Zweien und schwächeren Königen, und dein Gegner hat fast keine {{t:draw|Draws}}." }
      - { text: "C-Bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} des {{t:pot|Pots}})", sizeError: true, why: "Richtige Aktion, falsche Größe: Auf einem {{t:dry|trockenen}} Flop hat dein Gegner keine {{t:draw|Draws}}, und Hände, die nichts getroffen haben, {{t:fold|folden}} auch auf eine kleine {{t:bet|Bet}}. Eine größere {{t:bet|Bet}} bringt ungefähr dieselben Hände zum {{t:fold|Folden}}, riskiert aber mehr. Bette etwa {{n:cbet.size.small}} des {{t:pot|Pots}}." }
      - { text: "Ich {{t:check|checke}}", why: "Du verschenkst Value: Dein Gegner hat viele schwächere {{t:pair|Paare}} und Hände mit Ass, die eine kleine {{t:bet|Bet}} bezahlen würden. Auf einem {{t:dry|trockenen}} Flop mit {{t:top-pair}} bettest du." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}} und {{t:check|checkt}}. Du hast ein Set Buben auf einem Flop mit vielen {{t:draw|Draws}}. Was tust du?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-Bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} des {{t:pot|Pots}})", correct: true, why: "Ja: Dein Gegner hat viele {{t:flush-draw|Flush-Draws}} und Draws auf eine {{t:straight|Straße}} (z. B. QT, AQ, zwei Herz). Eine große {{t:bet|Bet}} lässt sie teuer für die nächste Karte bezahlen." }
      - { text: "C-Bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} des {{t:pot|Pots}})", sizeError: true, why: "Richtige Aktion, falsche Größe: Eine kleine {{t:bet|Bet}} gibt den {{t:draw|Draws}} deines Gegners eine billige Karte, und dein Set kann gegen einen Flush oder eine {{t:straight|Straße}} verlieren. Bei vielen {{t:draw|Draws}} bette groß." }
      - { text: "Ich {{t:check|checke}}, um den Gegner nicht zu verscheuchen", why: "Bei vielen {{t:draw|Draws}} ist eine Freikarte ein Geschenk für sie. Mit einer sehr starken Hand baust du den {{t:pot|Pot}} sofort auf." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}} und {{t:check|checkt}}. Der Flop ist {{t:paired|gepaart}}. Welcher Plan ist hier richtig?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-Bet oft und klein", correct: true, why: "Ja: Du hast den {{t:range-advantage|Range-Vorteil}}, und auf einem {{t:paired|gepaarten}} Flop ist ein {{t:draw}} kaum zu bekommen, also kann ein Gegner ohne {{t:pair|Paar}} selten auch nur eine kleine {{t:bet|Bet}} bezahlen. Du hast auch mehr hohe {{t:pair|Paare}}, z. B. AA und KK, die der {{t:big-blind}} nach einem bloßen {{t:call}} meist nicht hat." }
      - { text: "C-Bet oft und groß", sizeError: true, why: "Richtige Aktion, falsche Größe: Einen {{t:three-of-a-kind|Drilling}} kann jeder von euch haben, also lohnt sich eine große {{t:bet|Bet}} nicht, und ein Gegner ohne {{t:pair|Paar}} {{t:fold|foldet}} auch auf eine kleine. Bette oft und klein." }
      - { text: "Ich {{t:check|checke}} öfter, als ich bette", why: "Zu vorsichtig: Ein {{t:paired|gepaarter}}, hoher Flop begünstigt dich, und dein Gegner hat hier meist nichts." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}} und {{t:check|checkt}}. Der Flop ist {{t:monotone|monoton}}. Welcher Plan ist hier richtig?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-Bet seltener als sonst und klein", correct: true, why: "Ja: Einen {{t:flush}} kann schon jeder Spieler haben, also ist dein {{t:nuts-advantage|Nuts-Vorteil}} kleiner als auf einem gewöhnlichen hohen Flop. Du bettest seltener und mit kleiner Größe, um keinen großen {{t:pot|Pot}} gegen einen Flush aufzubauen." }
      - { text: "C-Bet oft und groß, damit {{t:draw|Draws}} bezahlen", why: "Auf einem {{t:monotone|monotonen}} Flop ist ein großer {{t:pot}} gefährlich: Dein Gegner kann schon einen fertigen {{t:flush}} haben, und deine Hände ohne Herz halten schlecht stand." }
      - { text: "Ich {{t:check|checke}} immer", why: "Zu vorsichtig: Ein hoher Flop begünstigt dich weiterhin, und ein Teil der Hände (z. B. mit hohem Herz) bettet gern klein." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Im {{t:pot|Pot}} sind {{n:ex.pot}}. Du bettest {{n:cbet.ex.small}} ohne jede Hand. In wie viel Prozent der Fälle muss dein Gegner {{t:fold|folden}}, damit diese {{t:bet|Bet}} plus/minus null ergibt? Gib eine Zahl ein."
    answer: alpha.cbet.small
    explanation: "Du riskierst {{n:cbet.ex.small}}, um {{n:ex.pot}} zu gewinnen. Die Schwelle ist Bet ÷ ({{t:pot}} + Bet): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Dein Gegner verfehlt den Flop viel öfter, deshalb lohnt sich eine kleine C-Bet so oft."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Im {{t:pot|Pot}} sind {{n:ex.pot}}. Du bettest {{n:cbet.ex.big}} ohne jede Hand. In wie viel Prozent der Fälle muss dein Gegner {{t:fold|folden}}, damit diese {{t:bet|Bet}} plus/minus null ergibt? Gib eine Zahl ein."
    answer: alpha.cbet.big
    explanation: "Du riskierst {{n:cbet.ex.big}}, um {{n:ex.pot}} zu gewinnen: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Ein großer {{t:bluff}} muss viel öfter funktionieren als ein kleiner ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Warum lohnt sich auf einem {{t:dry|trockenen}} Flop eine C-Bet von {{n:cbet.size.small}} des {{t:pot|Pots}} mit einer chancenlosen Hand öfter als eine C-Bet von {{n:cbet.size.big}} des {{t:pot|Pots}}?"
    options:
      - { text: "Weil eine kleine {{t:bet|Bet}} nur in {{n:alpha.cbet.small}} der Fälle einen Fold braucht, eine große in {{n:alpha.cbet.big}}", correct: true, why: "Ja: Auf einem {{t:dry|trockenen}} Flop {{t:fold|folden}} die schwächsten Hände deines Gegners (ohne {{t:pair|Paar}} und ohne {{t:draw}}) auf beide Größen, also erreicht eine kleine {{t:bet|Bet}} denselben Effekt billiger." }
      - { text: "Weil eine kleine {{t:bet|Bet}} immer einen {{t:fold}} bekommt", why: "Nein: Dein Gegner {{t:call|callt}} eine kleine {{t:bet|Bet}} mit jedem {{t:pair|Paar}}. Eine kleine {{t:bet|Bet}} riskiert einfach weniger, deshalb braucht sie weniger {{t:fold|Folds}}." }
      - { text: "Weil eine große {{t:bet|Bet}} immer ein Fehler ist", why: "Nein: Auf einem {{t:wet|nassen}} Flop und mit dem {{t:nuts-advantage|Nuts-Vorteil}} ist eine große {{t:bet|Bet}} manchmal am besten. Auf einem {{t:dry|trockenen}} Flop bringt sie dir für das größere Risiko aber nichts." }
---
Eine C-Bet (Continuation {{t:bet|Bet}}) ist eine {{t:bet|Bet}} am Flop von dem Spieler, der vor dem Flop zuletzt {{t:raise|geraist}} hat. In dieser Lektion spielst du {{t:in-position}}: Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}} und {{t:check|checkt}} am Flop. Der {{t:pot|Pot}} am Flop beträgt {{n:bb.pot-after.vs-btn}}. Es gibt zwei Fragen: wie oft du betten sollst und wie viel.

## {{t:dry|Trockener}}, hoher Flop: oft und klein

Auf einem Flop wie [[Ks 7d 2c]] hast du den {{t:range-advantage|Range-Vorteil}}, und dein Gegner hat fast keine {{t:draw|Draws}}. Du bettest oft und klein, etwa {{n:cbet.size.small}} des {{t:pot|Pots}}, also etwa {{n:cbet.btn.small}}. Eine kleine {{t:bet|Bet}} reicht, damit dein Gegner Hände {{t:fold|foldet}}, die nichts getroffen haben, und schlechtere {{t:pair|Paare}} {{t:call|callen}} sie trotzdem. Eine größere {{t:bet|Bet}} bringt ungefähr dieselben Hände zum {{t:fold|Folden}}, riskiert aber mehr.

Eine typische kleine C-Bet liegt bei etwa {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} des {{t:pot|Pots}}, eine große bei etwa {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (Trainingsmaterialien); Solver verwenden meist {{n:cbet.size.small}} und {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, auf einem Teil der Flops auch eine {{t:overbet}}, also eine {{t:bet|Bet}}, die größer ist als der ganze {{t:pot|Pot}} (veröffentlichte Solver-Ergebnisse).

## Flop mit vielen {{t:draw|Draws}}: seltener, aber größer

Auf einem Flop wie [[Kh Jh 7c]] hat dein Gegner viele {{t:flush-draw|Flush-Draws}} und Draws auf eine {{t:straight|Straße}}, aber eine {{t:straight}} ist noch nicht möglich. Starke Hände und starke {{t:draw|Draws}} betten größer, z. B. {{n:cbet.size.big}} des {{t:pot|Pots}}, damit {{t:draw|Draws}} teuer für die nächste Karte bezahlen. Mittlere Hände ohne {{t:draw}} {{t:check|checken}} öfter. Wenn eine {{t:straight}} schon möglich ist, z. B. auf [[Jh Th 8c]], kann dein Gegner sie haben, deshalb betten Solver dort mit kleinerer Größe.

## {{t:paired|Gepaart}} und {{t:monotone|monoton}}

Auf einem {{t:paired|gepaarten}} Flop, z. B. [[Qd Qs 6h]], hast du den {{t:range-advantage|Range-Vorteil}}, und ein {{t:draw}} ist kaum zu bekommen, also kann ein Gegner ohne {{t:pair|Paar}} selten {{t:call|callen}}. Du bettest oft und klein: Eine große {{t:bet|Bet}} lohnt sich nicht, weil jeder von euch einen {{t:three-of-a-kind|Drilling}} haben kann. Auf einem {{t:monotone|monotonen}} Flop, z. B. [[Kh 8h 3h]], kann schon jeder einen {{t:flush}} haben, also bettest du seltener als sonst und klein.

Achtung: „{{t:wet|nass}}“ heißt nicht „große Bet“. Ein {{t:monotone|monotoner}} Flop ist in der App immer {{t:wet|nass}}, trotzdem bettet der Solver auf ihm selten und mit kleiner Größe (veröffentlichte Solver-Ergebnisse). Die Größe wächst mit der {{t:wetness|Nässe}} nur bis zu einem gewissen Punkt: Auf den {{t:wet|nassesten}} Flops wie [[Qd 8d 7d]] sinkt sie wieder. Die größere Bet-Größe aus dem vorigen Abschnitt gilt für Flops mit vielen {{t:draw|Draws}}, auf denen eine {{t:straight}} noch nicht möglich ist (in der App meist mittelnasse).

## Niedrig mit nah beieinanderliegenden Karten: Du {{t:check|checkst}} öfter

Auf [[7s 6h 5d]] hat der {{t:big-blind}} {{t:straight|Straßen}} und {{t:two-pair|zwei Paare}} in seiner {{t:range|Range}}, und du hast keinen {{t:nuts-advantage|Nuts-Vorteil}} (Lektion über Vorteile). Meist ist es auf anderen niedrigen {{t:connected|verbundenen}} Flops ähnlich. Auf einem niedrigen {{t:semi-connected|halb verbundenen}} Flop gibt es noch keine {{t:straight|Straße}}, aber der Flop trifft trotzdem Hände mit kleinen Karten, von denen der {{t:big-blind|Big Blind}} viele verteidigt, und deine hohen Karten haben verfehlt. Du c-bettest seltener als auf hohen Flops: Viele Hände {{t:check|checken}}, und es betten vor allem sehr starke Hände und starke {{t:draw|Draws}}.

## Wie oft dein Gegner {{t:fold|folden}} muss

Eine {{t:bet|Bet}} ohne jede Hand ergibt plus/minus null, wenn dein Gegner in Bet ÷ ({{t:pot}} + Bet) der Fälle {{t:fold|foldet}}. Bei {{n:cbet.size.small}} des {{t:pot|Pots}} sind das {{n:alpha.cbet.small}}, bei {{n:cbet.size.big}} des {{t:pot|Pots}} schon {{n:alpha.cbet.big}}. Eine Hand ohne {{t:pair|Paar}} verfehlt den Flop in etwa {{n:flop.miss.unpaired}} der Fälle, deshalb lohnt sich eine kleine C-Bet so oft.

:::note Woher diese Regeln kommen
Die Richtungen ({{t:dry|trockener}} Flop: klein und oft; viele {{t:draw|Draws}} ohne fertige {{t:straight|Straße}}: größer und seltener; {{t:straight}} schon möglich: kleiner; {{t:paired|gepaart}}: klein; {{t:monotone|monoton}}: seltener und klein) sind allgemeine Regeln aus Trainingsmaterialien und veröffentlichten Solver-Ergebnissen, als Heuristiken gekennzeichnet. Die Größen {{n:cbet.size.small}} und {{n:cbet.size.big}} des {{t:pot|Pots}} sind Beispiele aus den oben genannten Spannen (Trainingsmaterialien zu Bet-Größen; veröffentlichte Solver-Ergebnisse). Die App gibt nicht in Prozent an, wie oft du betten sollst, weil solche Zahlen aus Solver-Ergebnissen stammen.
:::
