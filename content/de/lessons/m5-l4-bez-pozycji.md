---
id: m5.l4
module: m5
order: 4
title: "Ohne Position und gegen mehrere Gegner"
sub: "Wann du öfter checkst"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Du hast aus dem {{t:cutoff|CO}} {{t:open|eröffnet}}, der Button hat {{t:call|gecallt}}, die Blinds haben {{t:fold|gefoldet}}. Der Flop ist mittelhoch und {{t:connected|verbunden}}. Du bist zuerst dran. Welcher Plan ist hier richtig?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Ich checke}} öfter als {{t:in-position}}", correct: true, why: "Ja: Der Button hat mit {{t:position|Position}} {{t:call|gecallt}}, also hat er eine starke {{t:range|Range}}, und ein mittelhoher, {{t:connected|verbundener}} Flop trifft seine {{t:pair|Paare}} und {{t:connectors|Connectors}} gut. {{t:out-of-position|Out of Position}} {{t:check|checkst}} du hier sehr oft, auch mit starken Händen." }
      - { text: "C-Bet oft und klein, wie am Button", why: "Das ist der Plan {{t:in-position}} auf einem {{t:dry|trockenen}}, hohen Flop. Hier hast du keine {{t:position|Position}}, und der Flop begünstigt deine {{t:range|Range}} nicht." }
      - { text: "C-Bet mit allen Händen, um die {{t:initiative|Initiative}} nicht zu verlieren", why: "Die {{t:initiative|Initiative}} gewinnt nicht von allein: Die {{t:range|Range}} des Buttons ist hier stark, und nach jeder {{t:bet|Bet}} bist du auch am Turn und am River zuerst dran." }
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Warum spielst du {{t:out-of-position}} seltener eine C-Bet als {{t:in-position}}?"
    options:
      - { text: "Weil der Gegner {{t:in-position}} deine Aktion auf jeder {{t:street|Street}} sieht und seine {{t:range|Range}} nach dem {{t:call|Call}} stark ist", correct: true, why: "Ja: Ein Spieler, der mit {{t:position|Position}} {{t:call|callt}}, hat schwache Hände {{t:fold|gefoldet}} und die stärksten oft {{t:raise|geraist}}. Ihm bleiben mittlere und gute Hände, und dazu ist er als Letzter dran." }
      - { text: "Weil eine C-Bet {{t:out-of-position}} verboten ist", why: "Nein: Die Regeln erlauben dir, von jedem Platz aus zu setzen. Es geht darum, dass sich eine C-Bet {{t:out-of-position}} seltener lohnt." }
      - { text: "Weil du {{t:out-of-position}} immer die schwächere Hand hast", why: "Nein: Deine Hand hängt nicht von der {{t:position|Position}} ab. Was sich ändert, ist, wie leicht du ihre Equity realisierst." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Du hast aus dem {{t:cutoff|CO}} {{t:open|eröffnet}}, der Button hat {{t:call|gecallt}}, die Blinds haben {{t:fold|gefoldet}}. Du hast {{t:top-pair|Top Pair}} mit dem besten Kicker auf einem {{t:dry|trockenen}} Flop. Du bist zuerst dran. Was tust du?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|Ich checke}} (um die {{t:bet|Bet}} des Buttons zu {{t:call|callen}})", correct: true, why: "Ja: Der Button hat mit {{t:position|Position}} {{t:call|gecallt}}, also ist seine {{t:range|Range}} stark, und auf diesem Flop {{t:check|checkt}} der Solver {{t:out-of-position}} mit fast seiner gesamten {{t:range|Range}}, auch mit {{t:top-pair|Top Pair}} und bestem Kicker. Nach dem {{t:check|Check}} {{t:call|callst}} du die {{t:bet|Bet}} des Buttons." }
      - { text: "C-Bet {{n:cbet.size.small}} des {{t:pot|Pots}}", why: "Zu oft: In dieser Situation setzt der Solver in weniger als {{n:cbet.oop.a94.bet}} der Fälle. {{t:top-pair|Top Pair}} mit dem besten Kicker spielst du mit {{t:check|Check}} und {{t:call|Call}}." }
      - { text: "C-Bet {{n:cbet.size.big}} des {{t:pot|Pots}}", why: "Zu oft: In dieser Situation setzt der Solver in weniger als {{n:cbet.oop.a94.bet}} der Fälle. {{t:top-pair|Top Pair}} mit dem besten Kicker spielst du mit {{t:check|Check}} und {{t:call|Call}}." }
      - { text: "{{t:fold|Fold}}", why: "Noch hat niemand {{t:bet|gesetzt}}, also bringt ein {{t:fold|Fold}} nichts: Du kannst kostenlos {{t:check|checken}} (Regel aus Modul 1). Diese Hand spielst du mit {{t:check|Check}} und {{t:call|Call}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Du hast aus dem {{t:cutoff|CO}} {{t:open|eröffnet}}, der Button und der {{t:big-blind|Big Blind}} haben {{t:call|gecallt}}. Am Flop {{t:check|checkt}} der {{t:big-blind|Big Blind}}, und der Button ist nach dir dran. Du hast nur hohe Karten ohne {{t:draw|Draw}}. Was tust du?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Ich checke}}", correct: true, why: "Ja: Gegen zwei Gegner gewinnt eine Hand ohne {{t:pair|Paar}} und ohne {{t:draw|Draw}} selten den {{t:pot|Pot}} mit einer {{t:bet|Bet}}. Einer der beiden hat diesen Flop eher getroffen." }
      - { text: "Kleine C-Bet, wie im Heads-up", why: "Gegen zwei Gegner muss ein {{t:bluff|Bluff}} bei beiden durchkommen, und beide verfehlen gleichzeitig viel seltener als einer." }
      - { text: "Große C-Bet, um beide rauszudrängen", why: "Ein großer {{t:bluff|Bluff}} gegen zwei Gegner riskiert viel, und die Chance, dass beide {{t:fold|folden}}, ist klein. Auf diesem Flop haben sie viele {{t:pair|Paare}} und {{t:draw|Draws}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Du hast aus dem {{t:cutoff|CO}} {{t:open|eröffnet}}, der Button und der {{t:big-blind|Big Blind}} haben {{t:call|gecallt}}. Der {{t:big-blind|Big Blind}} {{t:check|checkt}}. Du hast {{t:top-pair|Top Pair}} mit gutem Kicker. Was tust du?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Ich checke}}", correct: true, why: "Ja: In einem {{t:pot|Pot}} mit mehreren Spielern {{t:check|checkt}} der Solver auf einem {{t:dry|trockenen}} Flop sehr oft, selbst mit sehr starken Händen, weil zwei {{t:call|Caller}} zusammen den Flop öfter getroffen haben." }
      - { text: "Ich setze auf {{t:value|Value}}", why: "Gegen zwei Gegner {{t:check|checkt}} der Solver auf einem {{t:dry|trockenen}} Flop selbst mit einer sehr starken Hand; du setzt selten und klein, vor allem wenn der Flop deine {{t:range|Range}} gut trifft." }
      - { text: "{{t:fold|Ich folde}}", why: "Niemand hat {{t:bet|gesetzt}}, also kannst du kostenlos {{t:check|checken}}. Ein {{t:fold|Fold}} hieße, einen {{t:pot|Pot}} aufzugeben, in dem du wahrscheinlich vorne liegst." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Eine Hand ohne {{t:pair|Paar}} verfehlt den Flop in etwa {{n:flop.miss.unpaired}} der Fälle. Wie oft verfehlen zwei solche Hände (vier verschiedene Ränge) gleichzeitig?"
    options:
      - { text: "Etwa {{n:flop.miss.two}}", correct: true, why: "Ja: Du rechnest genauso wie für eine Hand, nur gibt es mehr Karten, die ein Paar bilden: {{n:pair.outs.two-hands}} von {{n:cards.unseen.two-hands}} unbekannten (ohne deine Karten). Die Chance, dass keine der {{n:cards.board.flop}} Flopkarten darunter ist, liegt bei etwa {{n:flop.miss.two}}: Beide verfehlen seltener als in der Hälfte der Fälle." }
      - { text: "Etwa {{n:flop.miss.unpaired}}, genauso wie eine", why: "Nein: Jeder weitere Gegner ist eine weitere Chance, dass jemand getroffen hat. Die Chance, dass alle verfehlen, sinkt mit jedem Spieler." }
      - { text: "Etwa {{n:flop.hit.unpaired}}", why: "Das ist die Chance, dass eine Hand ohne {{t:pair|Paar}} am Flop ein {{t:pair|Paar}} trifft. Die Frage betrifft den Fall, dass beide verfehlen." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Wiederholung {{t:in-position}}: Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind|Big Blind}} hat {{t:call|gecallt}} und {{t:check|checkt}} am Flop. Welcher Plan passt zu diesem Flop?"
    position: BTN
    options:
      check: "{{t:check|Ich checke}} öfter, C-Bet seltener als sonst"
      small: "C-Bet oft und klein: {{n:cbet.size.small}} des {{t:pot|Pots}} ({{n:cbet.btn.small}})"
      big: "C-Bet oft und groß: {{n:cbet.size.big}} des {{t:pot|Pots}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Zu vorsichtig: Auf einem {{t:dry|trockenen}}, hohen Flop hast du den {{t:range-advantage|Range-Vorteil}}, und der Gegner hat meist verfehlt. Wenn du {{t:check|checkst}}, gibst du ihm eine Freikarte."
          small: "Ja: Ein {{t:dry|trockener}}, hoher Flop begünstigt dich. Eine kleine {{t:bet|Bet}} reicht, damit der Gegner schwache Hände {{t:fold|foldet}}, und schlechtere {{t:pair|Paare}} {{t:call|callen}} sie trotzdem."
          big: "Richtige Aktion, falsche Größe: Auf einem {{t:dry|trockenen}} Flop hat der Gegner wenige {{t:draw|Draws}}, und Hände, die verfehlt haben, {{t:fold|folden}} auch gegen eine kleine {{t:bet|Bet}}. Eine größere {{t:bet|Bet}} bringt nicht mehr Hände zum {{t:fold|Folden}}, riskiert aber mehr. Setze etwa {{n:cbet.size.small}} des {{t:pot|Pots}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Ja: Ein niedriger Flop mit nah beieinanderliegenden Karten trifft die {{t:range|Range}} des {{t:big-blind|Big Blinds}}: Er hat hier {{t:straight|Straßen}} und {{t:two-pair|zwei Paare}}, und du hast keinen {{t:nuts-advantage|Nuts-Vorteil}}. Du spielst seltener C-Bets als auf hohen Flops: Viele Hände {{t:check|checken}}, gesetzt wird vor allem mit starken Händen und starken {{t:draw|Draws}}."
          small: "Zu oft: Auf einem niedrigen Flop mit nah beieinanderliegenden Karten hast du keinen {{t:nuts-advantage|Nuts-Vorteil}}. Häufige C-Bets, selbst kleine, geben dem {{t:big-blind|Big Blind}} die Gelegenheit zum {{t:raise|Raise}} (Check-Raise) mit seinen stärksten Händen."
          big: "Zu oft und zu teuer: Der {{t:big-blind|Big Blind}} hat hier {{t:straight|Straßen}} und {{t:two-pair|zwei Paare}} in seiner {{t:range|Range}}. Eine häufige große C-Bet riskiert viel, wenn du selbst meist nur hohe Karten hast."
    count: 3
---
Bisher hast du {{t:in-position}} gegen einen Gegner gespielt. {{t:out-of-position|Out of Position}} und gegen mehrere Spieler spielst du seltener C-Bets.

## {{t:out-of-position|Out of Position}}

Wenn du aus dem {{t:cutoff|CO}} {{t:open|eröffnest}} und der Button {{t:call|callt}}, bist du nach dem Flop auf jeder {{t:street|Street}} zuerst dran. Die {{t:range|Range}} des Buttons ist dabei stark: Schwache Hände hat er {{t:fold|gefoldet}} und einen Teil der stärksten {{t:raise|geraist}}, also bleiben ihm mittlere und gute Hände. Eine solche {{t:range|Range}}, ohne die stärksten Hände und vor allem aus mittleren bestehend, ist {{t:condensed|kondensiert}}. Deshalb {{t:check|checkst}} du {{t:out-of-position}} viel öfter, oft mit deiner gesamten {{t:range|Range}}, auch mit starken Händen: Du spielst sie mit einem {{t:call|Call}} oder einem Check-Raise. Du setzt vor allem auf Flops, die deine {{t:range|Range}} sehr stark begünstigen, z. B. K-Q-6. {{t:check|Checken}} {{t:out-of-position}} heißt nicht, die Hand aufzugeben: Viele dieser Hände {{t:call|callen}} die {{t:bet|Bet}} des Gegners.

## Gegen mehrere Gegner

Jeder weitere Gegner ist eine weitere Chance, dass jemand den Flop getroffen hat. Eine Hand ohne {{t:pair|Paar}} verfehlt den Flop in etwa {{n:flop.miss.unpaired}} der Fälle, zwei gleichzeitig aber nur noch in etwa {{n:flop.miss.two}}. Ein {{t:bluff|Bluff}} muss bei allen durchkommen, also verzichtest du gegen mehrere Gegner vor allem auf {{t:bluff|Bluffs}}. Du setzt selten und klein, vor allem auf Flops, die deine {{t:range|Range}} gut treffen; auf einem {{t:dry|trockenen}} Flop {{t:check|checkst}} du oft selbst mit einer sehr starken Hand.

:::note Woher diese Regeln stammen
Die Regeln dieser Lektion stammen aus veröffentlichten Solver-Ergebnissen (C-Bet {{t:out-of-position}}, C-Bet auf Flops mit Ass und in {{t:pot|Pots}} mit mehreren Spielern) sowie aus Trainingsmaterialien ({{t:pot|Pots}} mit mehreren Spielern). Das sind Heuristiken: Die App gibt keine Frequenzen in Prozent an. Die Chance, dass zwei Hände gleichzeitig verfehlen, ist eine exakte Berechnung für zwei Hände mit vier verschiedenen Rängen; deine Karten lässt sie außer Acht, genau wie die Zahl für eine Hand.
:::
