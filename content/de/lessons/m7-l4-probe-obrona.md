---
id: m7.l4
module: m7
order: 4
title: "Probe Bet und Verteidigung"
sub: "Wenn der Gegner checkt oder zum zweiten Mal setzt"
rules: [R-M7-011, R-M7-012, R-M7-013]
drills:
  - kind: choice
    id: m7.l4.q-probe-def
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Der Button hat {{t:open|eröffnet}}, du hast im {{t:big-blind|Big Blind}} {{t:call|gecallt}}. Auf dem Flop checkt ihr beide. Am Turn setzt du als Erster. Wie heißt diese {{t:bet}}?"
    table: { position: BB }
    options:
      - { text: "Probe Bet", correct: true, why: "Ja: Ein Probe Bet ist eine {{t:bet}} {{t:out-of-position}} am Turn, nachdem der Preflop-{{t:aggressor}} keinen C-Bet gemacht und {{t:check|gecheckt}} hat." }
      - { text: "C-Bet", why: "Einen C-Bet {{t:bet|setzt}} der Spieler, der vor dem Flop {{t:raise|geraist}} hat. Du hast nur {{t:call|gecallt}}." }
      - { text: "Check-Raise", why: "Ein Check-Raise ist ein {{t:check}} und danach ein {{t:raise}} gegen den {{t:bet|Bet}} des Gegners. Hier setzt du als Erster und {{t:raise|raist}} niemanden." }
  - kind: choice
    id: m7.l4.q-probe-why
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Warum kannst du nach einem {{t:check}} des Buttons auf dem Flop am Turn öfter setzen als sonst?"
    table: { position: BB }
    options:
      - { text: "Weil der Button mit vielen starken Händen setzen würde und nach einem {{t:check}} deshalb weniger davon hat", correct: true, why: "Ja: Mit starken Händen macht man meist einen C-Bet. Die {{t:range}} des Buttons enthält nach einem {{t:check}} mehr mittlere und schwache Hände, und du kannst sie mit einer {{t:bet}} angreifen." }
      - { text: "Weil ein {{t:check}} immer bedeutet, dass der Button nichts hat", why: "Nicht immer: Der Button {{t:check|checkt}} manchmal mit einer starken Hand, um dich in eine Falle zu locken. Davon hat er aber weniger als dann, wenn er setzt." }
      - { text: "Weil du am Turn {{t:position}} hast", why: "Nein: Der Button handelt auf jeder {{t:street}} nach dir. Einen Probe Bet {{t:bet|setzt}} du {{t:out-of-position}}." }
  - kind: choice
    id: m7.l4.q-probe-board
    family: m7.probe.concept
    rules: [R-M7-011]
    prompt: "Der Button hat auf dem Flop {{t:check|gecheckt}}. Auf welchem {{t:board}} {{t:bet|setzt}} du aus dem {{t:big-blind|Big Blind}} öfter einen Probe Bet?"
    table: { position: BB }
    options:
      - { text: "[[8c 5d 2s 3h]]", correct: true, why: "Ja: Niedrige Karten treffen die breite Verteidigung des {{t:big-blind|Big Blinds}} öfter (kleine {{t:pair|Paare}}, {{t:connectors}}), und der Button hat nach einem {{t:check}} hier selten eine starke Hand." }
      - { text: "[[Ac Kd 8h Js]]", why: "Auf einem hohen {{t:board}} hat der Button den {{t:range-advantage}}: Viele seiner Asse und Könige haben getroffen. Hier {{t:bet|setzt}} du seltener einen Probe Bet." }
      - { text: "Auf beiden gleich oft", why: "Die {{t:texture}} spielt eine Rolle, genau wie beim C-Bet in M5: Auf niedrigen Boards setzt du öfter, auf hohen seltener." }
  - kind: choice
    id: m7.l4.q-probe-oesd
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open}} des Buttons. Auf dem Flop habt ihr beide {{t:check|gecheckt}}. Der Turn ist eine Drei. Du bist zuerst dran. Was machst du?"
    table: { hand: "7h 6h", position: BB, board: "8c 5d 2s 3h" }
    options:
      - { text: "Ich setze (Probe Bet)", correct: true, why: "Du hast einen {{t:oesd}} (Vier oder Neun) auf einem niedrigen {{t:board}}, das zu deiner {{t:range}} passt. Du gewinnst, wenn der Button {{t:fold|foldet}}, und wenn er {{t:call|callt}}, hast du immer noch {{n:outs.oesd}} Outs." }
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Auch gut: Mit einem {{t:draw}} kannst du den River gratis sehen, wenn der Button auch {{t:check|checkt}}. Ein Probe Bet ist aber meist besser, weil der Button nach einem {{t:check}} auf dem Flop eine schwache {{t:range}} hat und du einen starken {{t:semi-bluff}} hast." }
      - { text: "Ich {{t:fold|folde}}", why: "Niemand hat {{t:bet|gesetzt}}, also kannst du gratis {{t:check|checken}} (Regel aus Modul 1). Ein {{t:fold}} gibt den {{t:pot}} ohne Grund auf." }
  - kind: choice
    id: m7.l4.q-probe-value
    family: m7.probe.play
    rules: [R-M7-012]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open}} des Buttons. Auf dem Flop habt ihr beide {{t:check|gecheckt}}. Der Turn ist eine Drei. Du bist zuerst dran. Was machst du?"
    table: { hand: "9c 8d", position: BB, board: "8h 5c 2d 3s" }
    options:
      - { text: "Ich setze (Probe Bet)", correct: true, why: "{{t:top-pair}} ist eine gute Hand für einen Probe Bet: Schwächere {{t:pair|Paare}} und hohe Karten des Buttons zahlen dich aus, und mit einer {{t:bet}} gibst du ihnen keine Freikarte." }
      - { text: "Ich {{t:check|checke}}", why: "Der Button hat nach einem {{t:check}} auf dem Flop oft hohe Karten ohne {{t:pair}}. Wenn er wieder {{t:check|checkt}}, bekommt er eine Freikarte, die dich schlagen kann, und du verdienst nichts an seinen schwächeren Händen." }
      - { text: "Ich {{t:fold|folde}}", why: "Niemand hat {{t:bet|gesetzt}}, also kannst du gratis {{t:check|checken}}. Und mit {{t:top-pair}} willst du setzen." }
  - kind: choice
    id: m7.l4.q-probe-air
    family: m7.probe.play
    rules: [R-M7-011, R-M7-012]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open}} des Buttons. Auf dem Flop habt ihr beide {{t:check|gecheckt}}. Der Turn ist ein Bube. Du bist zuerst dran. Was machst du?"
    table: { hand: "6d 4c", position: BB, board: "Ac Kd 8h Js" }
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Du hast weder ein {{t:pair}} noch einen {{t:draw}}, und das hohe {{t:board}} begünstigt die {{t:range}} des Buttons. Ein Probe Bet ohne Outs auf so einem {{t:board}} gewinnt nur, wenn der Button {{t:fold|foldet}}, und er hat hier viele Asse, Könige und Buben." }
      - { text: "Ich setze (Probe Bet)", why: "Einen Probe Bet {{t:bet|setzt}} du öfter auf niedrigen Boards und mit Händen, die ein {{t:pair}} oder Outs haben. Hier hast du weder das eine noch das andere." }
      - { text: "Ich {{t:fold|folde}}", why: "Du kannst gratis {{t:check|checken}}, also bringt ein {{t:fold}} nichts (Regel aus Modul 1)." }
  - kind: choice
    id: m7.l4.q-def-gutshot
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Du verteidigst den {{t:big-blind}}. Du hast den C-Bet des Buttons auf dem Flop {{t:call|gecallt}}. Der Turn ist eine Zwei, du {{t:check|checkst}}, und der Button {{t:bet|setzt}} {{n:ex.bet.three-quarters}} in einen {{t:pot}} von {{n:ex.pot}}. Was machst du?"
    table: { hand: "Qc Td", position: BB, board: "Kh 9s 4d 2c" }
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Du hast nur einen Gutshot (Bube): ca. {{n:odds.gutshot.turn-river}} am River, brauchst aber {{n:eq.bet-three-quarters}}. Ohne {{t:pair}} und mit nur noch einer Karte kann sich diese Hand nicht gegen einen {{t:second-barrel}} verteidigen." }
      - { text: "Ich {{t:call|calle}}", why: "Der Preis ist ein Mehrfaches deiner Chance: {{n:eq.bet-three-quarters}} gegenüber ca. {{n:odds.gutshot.turn-river}}. Implied Odds gleichen so einen Unterschied nicht aus." }
      - { text: "Check-Raise", why: "Ein {{t:second-barrel}} steht für eine stärkere {{t:range}} als ein C-Bet: Der Button hat öfter einen König oder eine bessere Hand, die nicht {{t:fold|foldet}}. Mit {{n:outs.gutshot}} Outs ist das ein teurer {{t:bluff}}." }
  - kind: choice
    id: m7.l4.q-def-oesd-small
    family: m7.defend.turn
    rules: [R-M7-013, R-M7-007]
    prompt: "Du verteidigst den {{t:big-blind}}. Du hast den C-Bet des Buttons auf dem Flop {{t:call|gecallt}}. Der Turn ist ein König, du {{t:check|checkst}}, und der Button {{t:bet|setzt}} nur {{n:ex.bet.quarter}} in einen {{t:pot}} von {{n:ex.pot}}. Was machst du?"
    table: { hand: "Ts 9s", position: BB, board: "8d 7c 2h Kc" }
    options:
      - { text: "Ich {{t:call|calle}}", correct: true, why: "Du hast einen {{t:oesd}} (Bube oder Sechs): ca. {{n:odds.oesd.turn-river}}. Der kleine Bet erfordert nur {{n:eq.bet-quarter}}, also fast genau so viel, und wenn du triffst, kannst du am River noch zusätzlich gewinnen." }
      - { text: "Ich {{t:fold|folde}}", why: "Bei einem so kleinen Bet ist der Preis fast gleich deiner Chance ({{n:eq.bet-quarter}} gegenüber ca. {{n:odds.oesd.turn-river}}), und die Implied Odds geben den Ausschlag für einen {{t:call}}." }
      - { text: "Ich {{t:raise|raise}} all-in", why: "Du riskierst deinen ganzen Stack mit einer Hand, die noch nichts hat, und der Button {{t:fold|foldet}} mit einem König nicht. Bei so einem guten Preis reicht es zu {{t:call|callen}}." }
  - kind: choice
    id: m7.l4.q-def-top-pair
    family: m7.defend.turn
    rules: [R-M7-013]
    prompt: "Du verteidigst den {{t:big-blind}}. Du hast den C-Bet des Buttons auf dem Flop {{t:call|gecallt}}. Der Turn ist eine Fünf, du {{t:check|checkst}}, und der Button {{t:bet|setzt}} {{n:ex.bet.three-quarters}} in einen {{t:pot}} von {{n:ex.pot}}. Was machst du?"
    table: { hand: "Kd Tc", position: BB, board: "Ks 7d 2c 5h" }
    options:
      - { text: "Ich {{t:call|calle}}", correct: true, why: "{{t:top-pair}} ist zu stark, um auf einer leeren Karte zu {{t:fold|folden}}: Es schlägt {{t:semi-bluff|Semi-Bluffs}} und schwächere Könige. Du brauchst {{n:eq.bet-three-quarters}}, und gegen die {{t:range}} eines {{t:second-barrel|Second Barrels}} hat so ein {{t:pair}} meist so viel." }
      - { text: "Ich {{t:fold|folde}}", why: "Zu tight. Ein {{t:second-barrel}} ist stärker als ein C-Bet, aber der Button {{t:bet|setzt}} ihn auch mit {{t:draw|Draws}} und {{t:bluff|Bluffs}}. {{t:top-pair}} schlägt sie alle." }
      - { text: "Ich {{t:raise|raise}}", why: "Nach einem {{t:raise}} {{t:fold|folden}} schlechtere Hände, und bessere Könige und Sets zahlen. {{t:top-pair}} mit mittlerem Kicker ist keine Hand zum {{t:raise|Raisen}}." }
  - kind: choice
    id: m7.l4.q-def-why
    family: m7.defend.concept
    rules: [R-M7-013]
    prompt: "Warum verteidigst du gegen einen {{t:second-barrel}} enger als gegen einen C-Bet auf dem Flop?"
    table: { position: BB }
    options:
      - { text: "Weil der Gegner den {{t:second-barrel}} mit einer engeren {{t:range}} und meist größer {{t:bet|setzt}} und {{t:draw|Draws}} nur noch eine Karte haben", correct: true, why: "Ja: Einen Teil seiner {{t:bluff|Bluffs}} gibt der Gegner am Turn auf, ein größerer Bet senkt die {{t:mdf}} (bei 3/4 {{t:pot}} {{n:mdf.bet-three-quarters}}), und deine {{t:draw|Draws}} verlieren die Hälfte ihrer Chancen. Schwache {{t:pair|Paare}} und Hände ohne Outs {{t:fold|foldest}} du öfter als auf dem Flop." }
      - { text: "Weil man am Turn {{t:chips}} sparen muss", why: "Es zählt der {{t:expected-value}} jeder Entscheidung, nicht das Sparen. Du verteidigst enger, weil der Gegner mit stärkeren Händen setzt." }
      - { text: "Gar nicht, du verteidigst breiter, weil du schon viele {{t:chips}} investiert hast", why: "Was du schon investiert hast, kommt nicht zurück. Du entscheidest anhand des aktuellen Preises und der Stärke der gegnerischen {{t:range}}." }
  - kind: numeric
    id: m7.l4.n-mdf-turn
    family: m7.defend.math
    rules: [R-M6-001]
    prompt: "Turn. Der Gegner {{t:bet|setzt}} {{n:ex.bet.three-quarters}} in einen {{t:pot}} von {{n:ex.pot}}. Wie hoch ist die {{t:mdf}}? Gib die Zahl in Prozent ein."
    table: { position: BB }
    answer: mdf.bet-three-quarters
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + Bet) = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:mdf.bet-three-quarters}}. In einem veröffentlichten Turn-Beispiel verteidigte der Solver im Schnitt nahe an der {{t:mdf}}; {{t:out-of-position}} verteidigst du manchmal weniger (auf dem Flop und am Turn). Wenn du weißt, dass der Gegner seltener {{t:bluff|blufft}}, {{t:fold|foldest}} du öfter (die Rechnung kommt in M8, in der Lektion übers Fangen von {{t:bluff|Bluffs}})."
---
Am Turn triffst du auf zwei neue Situationen: Der Button hat keinen C-Bet gemacht und {{t:check|gecheckt}}, oder er hat einen C-Bet gemacht und setzt zum zweiten Mal. Im ersten Fall kannst du selbst angreifen, im zweiten verteidigst du enger als auf dem Flop.

## Probe Bet

Ein Probe Bet ist eine {{t:bet}} {{t:out-of-position}} am Turn, nachdem der Preflop-{{t:aggressor}} auf dem Flop {{t:check|gecheckt}} hat. Mit vielen starken Händen hätte der Button einen C-Bet gemacht, also hat er nach dem {{t:check}} weniger davon. Seine {{t:range}} ist schwächer, und du kannst sie angreifen.

- **Öfter auf niedrigen Boards**, z. B. [[8c 5d 2s 3h]]: Niedrige Karten treffen deine breite Verteidigung.
- **Seltener auf hohen**, z. B. [[Ac Kd 8h Js]]: Der {{t:range-advantage}} bleibt beim Button.

## Womit du Probe Bets setzt

- mit **{{t:pair|Paaren}}**, die von den hohen Karten des Buttons bezahlt werden und ihm keine Freikarte geben wollen,
- mit **starken {{t:draw|Draws}}**, die auf zwei Arten gewinnen.

Hände ohne {{t:pair}} und ohne Outs {{t:check|checken}}.

## Verteidigung gegen einen {{t:second-barrel}}

Wenn du einen C-Bet {{t:call|gecallt}} hast und der Button zum zweiten Mal setzt, ist seine {{t:range}} enger und stärker als auf dem Flop: Einen Teil seiner {{t:bluff|Bluffs}} hat er aufgegeben. Deine {{t:draw|Draws}} haben nur noch eine Karte. Deshalb:

- {{t:draw|Draws}} {{t:call|callen}} nur bei einem guten Preis oder mit Implied Odds (vorige Lektion),
- Hände ohne Outs und die schwächsten {{t:pair|Paare}} {{t:fold|folden}} öfter,
- {{t:top-pair}} {{t:call|callt}} meist weiterhin.

Die {{t:mdf}} bleibt der Bezugspunkt: Bei einem Bet von 3/4 {{t:pot}} liegt sie bei {{n:mdf.bet-three-quarters}}. In einem veröffentlichten Turn-Beispiel verteidigte der Solver im Schnitt nahe an diesem Wert; {{t:out-of-position}} verteidigst du manchmal weniger. Weniger verteidigst du auch dann, wenn der Gegner seltener {{t:bluff|blufft}}, als die {{t:mdf}} annimmt.

:::note Woher diese Regeln stammen
Die Regeln zum Probe Bet und zur Verteidigung gegen einen {{t:second-barrel}} sind Heuristiken aus Trainingsmaterialien und Solver-Analysen. Die Verteidigung am Turn nahe an der {{t:mdf}} zeigt ein veröffentlichtes Solver-Beispiel. Die App nennt keine Frequenzen in Prozent, weil die Quellen je nach Board voneinander abweichen. Zahlen dazu, womit Spieler auf Mikrolimits Probe Bets {{t:bet|setzen}}, erfordern eine Quelle mit beschriebener Population (Stichprobe, {{t:stakes|Limits}}, Pokerräume), deshalb stehen sie hier nicht.
:::
