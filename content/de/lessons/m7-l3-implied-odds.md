---
id: m7.l3
module: m7
order: 3
title: "Draws und Implied Odds"
sub: "Wie viel du später gewinnen musst"
rules: [R-M7-007, R-M7-008, R-M7-009, R-M7-010]
drills:
  - kind: choice
    id: m7.l3.q-turn-odds
    family: m7.draw.odds
    rules: [R-M7-007]
    prompt: "Am Flop hattest du ca. {{n:odds.flush.flop-river}} Chance auf einen {{t:flush|Flush}} bis zum River. Der Turn hat nicht geholfen. Wie viel hast du jetzt?"
    options:
      - { text: "Ca. {{n:odds.flush.turn-river}}", correct: true, why: "Ja: Es ist noch eine Karte übrig. {{n:outs.flush}} Outs aus {{n:cards.unseen.turn}} unbekannten Karten ergeben {{n:odds.flush.turn-river}}, ungefähr die Hälfte der Chance vom Flop." }
      - { text: "Immer noch ca. {{n:odds.flush.flop-river}}, weil es gleich viele Outs gibt", why: "Es gibt gleich viele Outs, aber weniger Karten, die noch kommen. {{n:odds.flush.flop-river}} rechnet mit zwei Karten, am Turn ist nur noch eine übrig." }
      - { text: "Das lässt sich ohne Rechner nicht ausrechnen", why: "Doch: mit der 2-und-4-Regel aus M2. Eine Karte, also Outs × 2: ungefähr {{n:odds.flush.rule-turn}}. Genau {{n:odds.flush.turn-river}}." }
  - kind: generated
    id: m7.l3.g-outs-turn
    family: m7.draw.odds
    rules: [R-M7-007]
    generator: outs
    params: { kind: oesd, street: turn }
    count: 2
  - kind: numeric
    id: m7.l3.n-combo-outs
    family: m7.draw.outs
    rules: [R-M7-007]
    prompt: "Turn. Wie viele Outs hast du auf einen {{t:flush|Flush}} oder eine {{t:straight|Straße}}? Gib eine Zahl ein."
    table: { hand: "Jh Th", board: "9h 8c 2h 3s" }
    answer: outs.combo
    explanation: "Für den {{t:flush|Flush}} {{n:outs.flush}} Herz, für die {{t:straight|Straße}} jede Dame und jede Sieben, also {{n:outs.oesd}} Karten. Herz-Dame und Herz-Sieben sind beim Flush schon mitgezählt, also ziehst du {{n:draw.combo.overlap}} ab: {{n:outs.combo.raw}} − {{n:draw.combo.overlap}} = {{n:outs.combo}}."
  - kind: choice
    id: m7.l3.q-combo-call
    family: m7.draw.call
    rules: [R-M7-007]
    prompt: "Turn. Im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.bet.three-quarters}}. Was tust du?"
    table: { hand: "Jh Th", position: BB, board: "9h 8c 2h 3s" }
    options:
      - { text: "{{t:call|Callen}}", correct: true, why: "Du hast {{n:outs.combo}} Outs, also ca. {{n:odds.combo.turn-river}} am River. Du brauchst {{n:eq.bet-three-quarters}}, also lohnt sich ein {{t:call|Call}} auch ohne Implied Odds." }
      - { text: "{{t:fold|Folden}}, weil ein {{t:draw|Draw}} am Turn zu wenig ist", why: "Ein normaler {{t:draw|Draw}} ist bei diesem Preis tatsächlich ein {{t:fold|Fold}}, aber {{t:flush|Flush}} und {{t:straight|Straße}} zusammen ergeben ca. {{n:odds.combo.turn-river}}, mehr als die nötigen {{n:eq.bet-three-quarters}}." }
  - kind: numeric
    id: m7.l3.n-implied-flush
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, dein Gegner {{t:bet|setzt}} {{n:io.flush.bet}}. Du hast einen {{t:flush-draw|Flush-Draw}}: {{n:outs.flush}} Outs aus {{n:cards.unseen.turn}} Karten. Wie viele {{t:chips|Chips}} musst du am River zusätzlich gewinnen, wenn du triffst, damit du mit dem {{t:call|Call}} bei null rauskommst? Gib eine Zahl ein."
    table: { hand: "Kh Jh", board: "Ah 8h 3c 2s" }
    answer: io.flush.extra
    explanation: "Du brauchst {{n:io.flush.eq}} Equity und hast ca. {{n:odds.flush.turn-river}}. Bei {{n:cards.unseen.turn}} möglichen Rivern triffst du {{n:outs.flush}}-mal und verfehlst {{n:miss.flush.turn}}-mal, und jedes Mal verlierst du {{n:io.flush.bet}}. Jeder Treffer muss also {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = {{n:io.flush.need}} bringen. Im {{t:pot|Pot}} sind {{n:io.flush.pot-after-bet}}, es fehlen {{n:io.flush.extra}}."
  - kind: choice
    id: m7.l3.q-implied-oesd
    family: m7.implied.math
    rules: [R-M7-008]
    prompt: "Turn. Im {{t:pot|Pot}} sind {{n:io.oesd.pot}}, dein Gegner {{t:bet|setzt}} {{n:io.oesd.bet}}. Du hast einen {{t:oesd|OESD}}: {{n:outs.oesd}} Outs, {{n:miss.oesd.turn}} Karten, die nicht treffen. Wie viel musst du am River zusätzlich gewinnen, wenn du triffst?"
    options:
      - { text: "Ca. {{n:io.oesd.extra}}", correct: true, why: "Jeder Treffer muss {{n:io.oesd.bet}} × {{n:miss.oesd.turn}} ÷ {{n:outs.oesd}} = {{n:io.oesd.need}} bringen. Im {{t:pot|Pot}} sind {{n:io.oesd.pot-after-bet}}, also fehlen {{n:io.oesd.extra}}." }
      - { text: "Ca. {{n:io.oesd.need}}", why: "So viel musst du bei jedem Treffer insgesamt gewinnen. Ein Teil davon liegt schon im {{t:pot|Pot}} ({{n:io.oesd.pot-after-bet}}), also fehlen zusätzlich {{n:io.oesd.extra}}." }
      - { text: "Nichts, der Preis reicht", why: "Du brauchst {{n:eq.bet-half}} Equity und hast ca. {{n:odds.oesd.turn-river}}. Der {{t:pot|Pot}} allein reicht nicht, es fehlen {{n:io.oesd.extra}}." }
  - kind: choice
    id: m7.l3.q-nut-implied
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, dein Gegner {{t:bet|setzt}} {{n:io.flush.bet}}. Hinter jedem von euch liegen noch {{n:io.flush.stack}}, und dein Gegner zahlt gern mit einem {{t:pair|Paar}} Asse. Was tust du?"
    table: { hand: "Kh Jh", position: BB, board: "Ah 8h 3c 2s" }
    options:
      - { text: "{{t:call|Callen}}", correct: true, why: "Der Preis allein reicht nicht ({{n:io.flush.eq}} gegenüber ca. {{n:odds.flush.turn-river}}), aber nach einem Treffer musst du nur noch {{n:io.flush.extra}} gewinnen. Du hast einen {{t:draw|Draw}} auf den besten {{t:flush|Flush}} (das Herz-Ass liegt auf dem {{t:board|Board}}, also ist der {{t:flush|Flush}} mit dem König der höchste), hinter deinem Gegner liegen viele {{t:chips|Chips}}, und ein Spieler mit einem {{t:pair|Paar}} Asse zahlt so eine Bet am River oft. Der Treffer wird sichtbar sein (drittes Herz), aber ein Gegner mit einem {{t:pair|Paar}} Asse zahlt oft trotzdem; deshalb sind die Implied Odds hier kleiner als bei einem versteckten Treffer." }
      - { text: "{{t:fold|Folden}}, weil {{n:odds.flush.turn-river}} weniger ist als {{n:io.flush.eq}}", why: "Die Pot Odds sagen „{{t:fold|Fold}}“, aber du übersiehst die Implied Odds. Es fehlen nur {{n:io.flush.extra}}, und dein Gegner hat noch {{n:io.flush.stack}} hinter sich und eine Hand, die zahlt." }
      - { text: "All-in {{t:raise|raisen}}", why: "Ein Gegner mit einem {{t:pair|Paar}} Asse wird eher {{t:call|callen}}, und dann hast du nur ca. {{n:odds.flush.turn-river}}. Besser, du siehst den River günstig und gewinnst mehr, wenn du triffst." }
  - kind: choice
    id: m7.l3.q-gutshot-short
    family: m7.implied.when
    rules: [R-M7-008, R-M7-009]
    prompt: "Turn. Im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.bet.half}}. Du hast einen Gutshot. Nach einem Treffer müsstest du noch {{n:io.gut.extra}} gewinnen, aber dein Gegner hat nur noch {{n:io.gut.stack}} hinter sich. Was tust du?"
    options:
      - { text: "{{t:fold|Folden}}", correct: true, why: "Ein Gutshot bringt ca. {{n:odds.gutshot.turn-river}}, und du brauchst {{n:eq.bet-half}}. Implied Odds helfen nicht: Selbst wenn dein Gegner alle {{n:io.gut.stack}} einzahlt, deckt das die fehlenden {{n:io.gut.extra}} nicht." }
      - { text: "{{t:call|Callen}}, wegen der Implied Odds", why: "Implied Odds sind die {{t:chips|Chips}}, die dein Gegner dir noch zahlen kann. Er hat nur {{n:io.gut.stack}}, und du brauchst {{n:io.gut.extra}}." }
      - { text: "All-in {{t:raise|raisen}}", why: "Ein All-in-{{t:bluff|Bluff}} mit {{n:outs.gutshot}} Outs riskiert alles. Ein Gegner, der mit so einem kleinen Stack einen halben {{t:pot|Pot}} {{t:bet|gesetzt}} hat, {{t:fold|foldet}} oft nicht mehr." }
  - kind: choice
    id: m7.l3.q-reverse
    family: m7.implied.when
    rules: [R-M7-010]
    prompt: "Turn. Im {{t:pot|Pot}} sind {{n:ex.pot}}, ein vorsichtiger Gegner {{t:bet|setzt}} den ganzen {{t:pot|Pot}}: {{n:ex.bet.pot}}. Was tust du?"
    table: { hand: "6h 5h", position: BB, board: "Ah Kh 9c 2d" }
    options:
      - { text: "{{t:fold|Folden}}", correct: true, why: "Du brauchst {{n:eq.bet-pot}} und hast ca. {{n:odds.flush.turn-river}}. Außerdem ist dein {{t:flush|Flush}} niedrig: Wenn ein Herz kommt, hat ein Gegner mit Herz-Dame oder Herz-Bube einen besseren {{t:flush|Flush}}, und dann verlierst du am meisten (umgekehrte Implied Odds)." }
      - { text: "{{t:call|Callen}}, wegen der Implied Odds", why: "Die Implied Odds sind hier schwach: Ein getroffener {{t:flush|Flush}} kann gegen einen höheren verlieren, und ein drittes Herz auf dem {{t:board|Board}} sieht jeder. Außerdem fehlt sehr viel: Der Preis liegt bei {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Raisen}}", why: "Ein vorsichtiger Gegner, der auf einem {{t:board|Board}} mit Ass und König den ganzen {{t:pot|Pot}} {{t:bet|setzt}}, {{t:fold|foldet}} selten. Du riskierst viel mit einer Hand, die selbst bei einem Treffer verlieren kann." }
  - kind: choice
    id: m7.l3.q-when-implied
    family: m7.implied.when
    rules: [R-M7-009, R-M7-010]
    prompt: "Wann sind Implied Odds am größten?"
    options:
      - { text: "Wenn du einen {{t:draw|Draw}} auf die beste Hand hast und dein Gegner eine starke Hand und viele {{t:chips|Chips}} hinter sich hat", correct: true, why: "Ja: Dann gewinnst du nach einem Treffer, und dein Gegner hat die Chips und die Hand, um dich auszuzahlen." }
      - { text: "Wenn dein Gegner wenige {{t:chips|Chips}} hat (niedrige {{t:spr|SPR}})", why: "Umgekehrt: Bei niedriger {{t:spr|SPR}} hat dein Gegner nichts mehr nachzuzahlen, also sind die Implied Odds klein." }
      - { text: "Wenn du einen {{t:draw|Draw}} auf einen niedrigen {{t:flush|Flush}} hast", why: "Das sind umgekehrte Implied Odds: Manchmal triffst du und verlierst trotzdem, und zwar in einem großen {{t:pot|Pot}}." }
  - kind: choice
    id: m7.l3.q-spr
    family: m7.spr
    rules: [R-M7-009]
    prompt: "Zu Beginn des Turns sind im {{t:pot|Pot}} {{n:ex.pot}}, und der kleinere eurer Stacks beträgt {{n:spr.stack.high}}. Wie hoch ist die {{t:spr|SPR}}?"
    options:
      - { text: "{{n:spr.high}}", correct: true, why: "{{t:spr|SPR}} = Stack ÷ {{t:pot|Pot}} = {{n:spr.stack.high}} ÷ {{n:ex.pot}} = {{n:spr.high}}. Hinter deinem Gegner liegen mehrere {{t:pot|Pots}}, also können die Implied Odds groß sein." }
      - { text: "{{n:spr.low}}", why: "So viel wäre es bei einem Stack von {{n:spr.stack.low}}. Hier beträgt der Stack {{n:spr.stack.high}}." }
      - { text: "{{n:ex.pot}}", why: "Das ist der {{t:pot|Pot}}. Die {{t:spr|SPR}} ist ein Verhältnis: der Stack geteilt durch den {{t:pot|Pot}}." }
---
Am Turn kommt nur noch eine Karte. Die Chance deines {{t:draw|Draws}} sinkt ungefähr um die Hälfte, und der Preis für die nächste Karte steigt meist. Deshalb rechnest du am Turn genauer und stellst eine neue Frage: Wie viel kann ich später gewinnen, wenn ich treffe?

## Noch eine Karte bis zum Ende

| {{t:draw|Draw}} | Outs | Flop → River | Turn → River |
|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| Offene {{t:straight|Straße}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |
| {{t:flush|Flush}} + offene {{t:straight|Straße}} | {{n:outs.combo}} | – | {{n:odds.combo.turn-river}} |

Mit der 2-und-4-Regel aus M2 multiplizierst du die Outs mit 2. Wenn zwei {{t:draw|Draws}} gemeinsame Karten haben, zählst du diese einmal.

## Implied Odds

Implied Odds (versteckte Chancen) sind die {{t:chips|Chips}}, die du am River gewinnst, wenn du triffst. Beispiel: Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, dein Gegner {{t:bet|setzt}} {{n:io.flush.bet}}, du hast einen {{t:flush-draw|Flush-Draw}}. Du brauchst {{n:io.flush.bet}} ÷ {{n:io.flush.total}} = {{n:io.flush.eq}} Equity und hast ca. {{n:odds.flush.turn-river}}. Der {{t:pot|Pot}} allein reicht nicht.

Bei {{n:cards.unseen.turn}} möglichen Rivern triffst du {{n:outs.flush}}-mal und verfehlst {{n:miss.flush.turn}}-mal. Um bei null rauszukommen, muss jeder Treffer so viel bringen, wie die Fehlschläge kosten:

```formula
nötiger Gewinn = zu zahlender Betrag × (nicht treffende Karten ÷ Outs)
```

Hier: {{n:io.flush.bet}} × {{n:miss.flush.turn}} ÷ {{n:outs.flush}} = **{{n:io.flush.need}}**. Im {{t:pot|Pot}} sind {{n:io.flush.pot-after-bet}}, also musst du am River im Schnitt noch **{{n:io.flush.extra}}** bekommen.

## {{t:spr|SPR}}: wie viele {{t:chips|Chips}} hinter deinem Gegner liegen

Die {{t:spr|SPR}} (Stack-zu-{{t:pot|Pot}}-Verhältnis) ist der {{t:effective-stack|effektive Stack}}, also der kleinere der beiden Stacks, geteilt durch den {{t:pot|Pot}} zu Beginn der {{t:street|Street}}. Die {{t:spr|SPR}} kannst du auf jeder {{t:street|Street}} berechnen; hier berechnest du sie am Turn. Bei einem {{t:pot|Pot}} von {{n:ex.pot}} und einem Stack von {{n:spr.stack.high}} beträgt die {{t:spr|SPR}} {{n:spr.high}}, das heißt, hinter deinem Gegner liegen noch mehrere {{t:pot|Pots}}; bei einem Stack von {{n:spr.stack.low}} nur {{n:spr.low}}. Implied Odds können nicht größer sein als die {{t:chips|Chips}}, die dein Gegner noch vor sich hat. Bei niedriger {{t:spr|SPR}} zählen fast nur die Pot Odds. Mehr zur {{t:spr|SPR}} im Modul „Handplanung“ (M9), das die Hand nach der {{t:spr|SPR}} am Flop plant.

## Wann Implied Odds echt sind

- du hast einen {{t:draw|Draw}} auf die **beste Hand** (den höchstmöglichen {{t:flush|Flush}}, meist mit dem Ass),
- dein Gegner hat eine **starke Hand**, mit der er zahlt,
- hinter deinem Gegner liegen **viele {{t:chips|Chips}}** (hohe {{t:spr|SPR}}),
- dein Treffer **fällt nicht auf** (z. B. ist ein Gutshot weniger sichtbar als ein drittes Herz auf dem {{t:board|Board}}).

Umgekehrte Implied Odds wirken gegen dich: Wenn du einen {{t:draw|Draw}} auf einen niedrigen {{t:flush|Flush}} hast oder auf eine {{t:straight|Straße}}, während auf dem {{t:board|Board}} ein {{t:flush|Flush}} kommen kann, triffst du manchmal und verlierst trotzdem, und zwar in einem großen {{t:pot|Pot}}.

:::note Woher diese Regeln stammen
Die Rechnung der Implied Odds ist eine exakte Berechnung auf Basis des {{t:expected-value|Erwartungswerts}}. Die Bedingungen, wann Implied Odds echt sind, sowie umgekehrte Implied Odds sind Heuristiken aus Trainingsmaterialien.
:::
