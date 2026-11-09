---
id: m7.l1
module: m7
order: 1
title: "Second Barrel"
sub: "Wann du am Turn ein zweites Mal setzt"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}. Am Flop [[Jd 7c 3s]] hast du eine C-Bet {{t:bet|gesetzt}}, und er hat {{t:call|gecallt}}. Welche Turnkarte hilft deinem {{t:second-barrel|Second Barrel}} am meisten?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Ja: Das Ass trifft viele Hände aus deiner {{t:range|Range}} beim {{t:open|Eröffnen}} (AK, AQ, AJ), während der {{t:big-blind}} den Flop vor allem mit {{t:pair|Paaren}} und {{t:draw|Draws}} {{t:call|gecallt}} hat. Jedes {{t:pair|Paar}}, das er hat, rutscht einen Platz nach unten." }
      - { text: "[[8h]]", why: "Nein: Die Acht verbindet sich mit dem Flop. Sie gibt T9 eine {{t:straight|Straße}} und 87 {{t:two-pair}}, also Händen, die der {{t:big-blind}} häufig verteidigt. Das ist eher seine Karte." }
      - { text: "[[3h]]", why: "Nicht die schlechteste, aber sie ändert wenig: Sie verbessert deine {{t:range}} selten, und ein Gegner mit einem {{t:pair|Paar}} hat weiterhin ein {{t:pair|Paar}}. Das Ass bringt deinem {{t:second-barrel|Second Barrel}} viel mehr." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Warum ist ein Ass am Turn nach dem Flop [[Jd 7c 3s]] gut für den {{t:second-barrel|Second Barrel}} des {{t:open|Eröffners}} vom Button?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Es trifft dein AK und AQ, und das {{t:pair|Paar}} des Gegners wird zum zweiten oder dritten {{t:pair|Paar}}", correct: true, why: "Ja: Eine hohe Karte trifft die {{t:range}} des {{t:open|Eröffners}} öfter, und ein Gegner, der den Flop mit einem {{t:pair|Paar}} Buben oder Siebenen {{t:call|gecallt}} hat, hat jetzt eine schwächere Hand im Verhältnis zum {{t:board}}." }
      - { text: "Weil der Gegner auf ein Ass immer {{t:fold|foldet}}", why: "Nicht immer: Ein Gegner mit einem Ass oder einem Set zahlt. Das Ass erhöht die Chance auf einen {{t:fold}}, garantiert aber nichts." }
      - { text: "Weil das Ass die {{t:draw|Draws}} des Gegners komplettiert", why: "Nein: Auf diesem {{t:board}} komplettiert das Ass weder einen möglichen {{t:flush}} noch eine mögliche {{t:straight|Straße}} des Gegners. Es hilft, weil es zu deiner {{t:range}} passt." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}. Am Flop hast du eine C-Bet {{t:bet|gesetzt}}, er hat {{t:call|gecallt}}. Der Turn ist eine Sieben. Im {{t:pot}} sind {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Was machst du?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Eine Sieben auf einem {{t:board}} mit Neun und Sechs gibt T8 und 85 eine {{t:straight|Straße}} und 76 und 97 {{t:two-pair}}, also Händen, die der {{t:big-blind}} verteidigt. Du hast kein {{t:pair|Paar}} und keinen {{t:draw}}. Du gibst den {{t:bluff}} auf und nimmst eine Gratiskarte." }
      - { text: "Ich setze {{n:ex.bet.three-quarters}}", why: "Diese Karte passt zur {{t:range}} des Gegners, nicht zu deiner, und du hast keine Outs auf eine starke Hand. Setz einen {{t:second-barrel|Second Barrel}} als {{t:bluff|Bluff}} auf Karten, die dir helfen, und mit Händen, die sich verbessern können." }
      - { text: "Ich setze {{n:ex.bet.pot}}", why: "Ein großer {{t:bluff}} auf einer Karte, die den Gegner begünstigt, riskiert viel: Er müsste öfter als in {{n:alpha.bet-pot}} der Fälle {{t:fold|folden}}, und nachdem er den Flop {{t:call|gecallt}} hat, hat er viele {{t:pair|Paare}} und {{t:draw|Draws}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat deine C-Bet am Flop {{t:call|gecallt}}. Der Turn ist ein Ass. Im {{t:pot}} sind {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Was machst du?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Ich setze {{n:ex.bet.three-quarters}}", correct: true, why: "Ein guter {{t:second-barrel}}: Das Ass passt zu deiner {{t:range}}, und du hast einen Gutshot auf eine {{t:straight|Straße}} (eine Zehn). Wenn der Gegner ein {{t:pair|Paar}} {{t:fold|foldet}}, gewinnst du sofort, und wenn er {{t:call|callt}}, kannst du noch treffen." }
      - { text: "Ich setze {{n:ex.bet.quarter}}", sizeError: true, why: "Richtige Aktion, falsche Größe: Eine so billige Bet {{t:call|callt}} der Gegner mit jedem {{t:pair|Paar}}, und dieser {{t:bluff}} verdient vor allem an {{t:fold|Folds}}. Auf einer Karte, die dir hilft, setzt du groß, genau wie mit starken Händen." }
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Auch gut: Du hast Outs und siehst den River gratis, also ist ein {{t:check}} kein Fehler. In einem veröffentlichten Solver-Beispiel wurde ein Gutshot auf die höchste {{t:straight|Straße}} am Turn {{t:check|gecheckt}}. Beide Spielzüge sind korrekt." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat deine C-Bet am Flop {{t:call|gecallt}}. Der Turn ist eine Zwei. Im {{t:pot}} sind {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Was machst du?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Du hast kein {{t:pair|Paar}} und keinen {{t:draw}}: Drei Herz reichen nicht, wenn nur noch eine Karte kommt, und für eine {{t:straight|Straße}} fehlen dir zwei Karten. Die Zwei ändert nichts, und der Gegner hat den Flop auf einem {{t:board}} mit König {{t:call|gecallt}}, hat also oft ein {{t:pair|Paar}}. Du gibst den {{t:bluff}} auf." }
      - { text: "Ich setze {{n:ex.bet.three-quarters}}", why: "Ein {{t:bluff}} ohne Outs gewinnt nur, wenn der Gegner {{t:fold|foldet}}. Nachdem er den Flop {{t:call|gecallt}} hat, hat er viele {{t:pair|Paare}} (Könige, Achten), die auf einer leeren Zwei nicht {{t:fold|folden}}." }
      - { text: "Ich {{t:fold|folde}}", why: "Der Gegner {{t:check|checkt}}, also kannst du gratis {{t:check|checken}} (Regel aus Modul 1). Ein {{t:fold|Fold}} gibt den {{t:pot}} ohne Grund her." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Du {{t:bet|setzt}} einen {{t:second-barrel|Second Barrel}} mit einem {{t:flush-draw|Flush-Draw}}, und der Gegner {{t:call|callt}}. Welche Chancen hast du noch?"
    options:
      - { text: "Ca. {{n:odds.flush.turn-river}}, dass du am River einen {{t:flush}} triffst", correct: true, why: "Ja: Das ist der zweite Weg zum Gewinn. {{n:outs.flush}} Outs aus {{n:cards.unseen.turn}} unbekannten Karten. Deshalb ist ein {{t:semi-bluff}} besser als ein {{t:bluff}} ohne Outs." }
      - { text: "Keine, der {{t:bluff}} ist gescheitert", why: "Ein {{t:bluff}} ohne Outs hat keine Chance mehr, aber du hast einen {{t:draw}}: Ein {{t:flush}} am River gewinnt trotz des {{t:call|Calls}}." }
      - { text: "Ca. {{n:odds.flush.flop-river}}", why: "So viel hattest du am Flop, als noch zwei Karten kamen. Am Turn ist nur noch eine übrig: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat deine C-Bet am Flop {{t:call|gecallt}}. Der Turn ist eine Zwei. Im {{t:pot}} sind {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Was machst du?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Ein {{t:pair|Paar}} Neunen ist eine mittlere Hand: Es schlägt {{t:bluff|Bluffs}}, verliert aber gegen jeden König. Auf eine zweite Bet {{t:fold|foldet}} der Gegner schlechtere Hände und zahlt mit Königen. Wenn du {{t:check|checkst}}, hältst du den {{t:pot}} klein und kommst zum Showdown." }
      - { text: "Ich setze {{n:ex.bet.three-quarters}}", why: "Der Gegner hat den Flop schon auf einem {{t:board}} mit König {{t:call|gecallt}}. Schlechtere Hände (Achten, Dreien) {{t:fold|folden}} oder zahlen einmal, bessere zahlen immer. Mit so einer Bet verdienen die besseren Hände." }
      - { text: "Ich setze, um herauszufinden, wo ich stehe", why: "Eine Bet „zur Information“ ist ein häufiger Fehler: Du bezahlst für diese Information, weil bessere Hände dich ohnehin nicht davonkommen lassen und schlechtere weglaufen. Du setzt auf {{t:value|Value}} oder als {{t:bluff}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat deine C-Bet am Flop {{t:call|gecallt}}. Der Turn ist eine Zwei. Im {{t:pot}} sind {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Was machst du?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Ich setze auf {{t:value|Value}}", correct: true, why: "{{t:top-pair|Top Pair}} mit dem besten Kicker ist eine starke Hand. Der Gegner hat den Flop {{t:call|gecallt}}, hat also oft einen schwächeren König oder Achten, die noch einmal zahlen." }
      - { text: "Ich {{t:check|checke}}, der Gegner hat sowieso nichts", why: "Der Gegner hat den Flop {{t:call|gecallt}}, hat also oft ein {{t:pair|Paar}}. Wenn du {{t:check|checkst}}, verlierst du eine {{t:bet}}, die eine schlechtere Hand bezahlt hätte." }
      - { text: "Ich setze all-in", why: "Schlechtere {{t:pair|Paare}} zahlen selten den ganzen Stack. Wähle eine Größe, die von schwächeren Königen und Achten bezahlt wird." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Mit welchen Händen {{t:bet|setzt}} du am Turn am häufigsten einen {{t:second-barrel|Second Barrel}}?"
    options:
      - { text: "Mit starken Händen und {{t:draw|Draws}}; mittlere Hände {{t:check|checken}}", correct: true, why: "Ja: Starke Hände wollen bezahlt werden, {{t:draw|Draws}} gewinnen auf zwei Wegen, und mittlere Hände gewinnen nichts durch eine weitere {{t:bet|Bet}}." }
      - { text: "Mit allen, um die {{t:initiative}} nicht zu verlieren", why: "Die {{t:initiative}} allein gewinnt nicht. Der Gegner hat den Flop {{t:call|gecallt}}, hat also eine stärkere {{t:range}}, und Hände ohne Outs sowie mittlere {{t:pair|Paare}} verlieren durch ständiges Setzen." }
      - { text: "Nur mit den stärksten Händen", why: "Dann würde der Gegner jedes Mal folden, wenn du setzt, und nur zahlen, wenn er dich schlägt. {{t:draw|Draws}} sind natürliche {{t:semi-bluff|Semi-Bluffs}}." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. Im {{t:pot}} sind {{n:ex.pot}}, du {{t:bluff|bluffst}} mit einer Hand, die fast nie gewinnt, und {{t:bet|setzt}} {{n:ex.bet.three-quarters}}. Wie oft muss der Gegner {{t:fold|folden}}, damit dieser {{t:bluff}} genau bei null herauskommt? Gib die Zahl in Prozent ein."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = Bet ÷ ({{t:pot}} + Bet) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Mit Outs brauchst du weniger {{t:fold|Folds}}, weil du einen Teil der {{t:call|Calls}} am River trotzdem gewinnst."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Warum ist die {{t:range}} des Gegners am Turn stärker als am Flop, nachdem er die C-Bet {{t:call|gecallt}} hat?"
    options:
      - { text: "Weil er die schwächsten Hände am Flop {{t:fold|gefoldet}} hat", correct: true, why: "Ja: Auf eine C-Bet werden Hände ohne {{t:pair|Paar}} und ohne {{t:draw}} {{t:fold|gefoldet}}. Übrig bleiben {{t:pair|Paare}} und {{t:draw|Draws}}, also trifft der {{t:second-barrel}} auf eine stärkere {{t:range}} als die erste Bet." }
      - { text: "Weil der Turn ihm immer hilft", why: "Nein: Der Turn ist zufällig und hilft manchmal dir (z. B. ein Ass). Die {{t:range}} des Gegners wird durch seine eigene Entscheidung am Flop stärker." }
      - { text: "Ist sie nicht, er hat dieselbe {{t:range}} wie vor dem Flop", why: "Jede Entscheidung siebt einen Teil der Hände aus. Wer eine {{t:bet}} {{t:call|gecallt}} hat, hat meist etwas getroffen oder einen {{t:draw}}." }
---
Ein {{t:second-barrel|Second Barrel}} ist die zweite {{t:bet}} des Spielers, der vor dem Flop {{t:raise|geraist}} hat: C-Bet am Flop, {{t:call}}, dann eine Bet am Turn. Am Turn fragst du nicht nur „Habe ich eine Hand?“, sondern auch „Hilft diese Karte mir oder dem Gegner?“

## Der Gegner hat {{t:call|gecallt}}, also ist er stärker

Auf eine C-Bet {{t:fold|foldet}} der Gegner Hände ohne {{t:pair|Paar}} und ohne {{t:draw}}. Wer {{t:call|gecallt}} hat, hat meist ein {{t:pair|Paar}} oder einen {{t:draw}}, manchmal hohe Karten mit Backdoor (wie bei der Verteidigung in M6). Deshalb trifft der {{t:second-barrel}} auf eine stärkere {{t:range}} als die erste Bet, und du setzt nicht mit allem ein zweites Mal.

## Welche Karte hilft

- **Eine hohe Karte auf einem niedrigeren {{t:board}}** (Ass, König) hilft meist dem {{t:open|Eröffner}}: Sie trifft sein AK, AQ, KQ, und jedes {{t:pair|Paar}} des Gegners rutscht einen Platz nach unten. Auf solchen Karten setzt du öfter ein zweites Mal, auch als {{t:bluff|Bluff}}.
- **Eine niedrige Karte, die sich mit dem {{t:board}} verbindet**, z. B. eine Sieben auf [[9h 6c 2d]], hilft dem {{t:big-blind}}: Sie gibt den Händen, die er am häufigsten verteidigt, {{t:straight|Straßen}} und {{t:two-pair}}.
- **Eine leere Karte**, z. B. eine Zwei auf [[Kd 8c 3s]], ändert wenig. Deine Hand entscheidet.

## Womit du ein zweites Mal setzt

Du setzt mit starken Händen (auf {{t:value|Value}}) und mit {{t:draw|Draws}} (als {{t:semi-bluff}}). Ein {{t:semi-bluff|Semi-Bluff}} gewinnt auf zwei Wegen: wenn der Gegner {{t:fold|foldet}} oder wenn du am River triffst. Hände ohne {{t:pair|Paar}} und ohne Outs gibst du öfter auf, weil sie nur durch einen Fold gewinnen, außer sie blocken die Hände, mit denen der Gegner zahlt. Wenn der Gegner mit einem {{t:raise|Raise}} antworten kann, {{t:bluff|blufft}} der Solver auch mit Händen ohne Outs.

Ein {{t:bluff|Bluff}} ohne Chance kommt genau bei null heraus, wenn der Gegner in Bet ÷ ({{t:pot}} + Bet) der Fälle {{t:fold|foldet}} (Alpha aus M6). Bei einer Bet von 3/4 {{t:pot}} sind das {{n:alpha.bet-three-quarters}}, bei einem halben {{t:pot}} {{n:alpha.bet-half}}.

## Mittlere Hände {{t:check|checken}}

{{t:second-pair|Second Pair}} oder {{t:top-pair}} mit schwachem Kicker schlägt {{t:bluff|Bluffs}}, verliert aber gegen bessere {{t:pair|Paare}}. Auf eine zweite Bet {{t:fold|folden}} schlechtere Hände, und bessere zahlen. Du {{t:check|checkst}}, hältst den {{t:pot}} klein und kommst zum Showdown.

:::note Woher diese Regeln kommen
Die Richtungen (hohe Karten begünstigen meist den {{t:second-barrel|Second Barrel}}, {{t:bluff|Bluffs}} mit Outs statt ohne Outs, mittlere Hände {{t:check|checken}}) sind Heuristiken aus Trainingsmaterialien und Solver-Analysen. Das gilt für Stacks von ca. {{n:format.stack}}. Es ist eine Vereinfachung: Der Solver {{t:bluff|blufft}} auch mit einem Teil der Hände ohne Outs, wenn sie die {{t:value|Value}}-Hände des Gegners blocken oder wenn der Gegner mit einem {{t:raise|Raise}} antworten kann. Die App gibt nicht in Prozent an, wie oft du setzen solltest, weil solche Zahlen in Solver-Ergebnissen von der konkreten Hand abhängen.
:::
