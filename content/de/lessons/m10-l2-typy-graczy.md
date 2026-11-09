---
id: m10.l2
module: m10
order: 2
title: "Spielertypen"
sub: "Nit, Reg, passiver Spieler, Maniac"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "Nach {{n:hud.ex.reg.hands}} Händen hat dein Gegner {{t:vpip}} {{n:hud.ex.passive.vpip}} und {{t:pfr}} {{n:hud.ex.passive.pfr}}. Was sagt das über sein Spiel vor dem Flop?"
    options:
      - { text: "Er ist passiv: Mit den meisten Händen {{t:call|callt}} oder limpt er nur", correct: true, why: "Die Differenz {{t:vpip}} − {{t:pfr}} beträgt {{n:hud.ex.passive.gap}} Punkte und liegt über der Schwelle von {{n:hud.gap.passive}}. Er spielt recht viele Hände, bringt die meisten davon aber ohne {{t:raise}} in den {{t:pot}}." }
      - { text: "Er ist aggressiv, weil er viele Hände spielt", why: "Die Zahl der Hände ({{t:vpip}}) zeigt, wie loose er spielt, nicht wie aggressiv. Über Aggression sagen {{t:pfr}} und die Differenz zwischen beiden etwas aus." }
      - { text: "Er ist ein {{t:nit}}", why: "Ein {{t:nit}} spielt bis etwa {{n:hud.vpip.nit-max}} der Hände; dieser Spieler spielt deutlich mehr." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "Laut Populationsdaten aus Online-Micro-Stakes (NL25) kommen {{t:recreational|Freizeitspieler}} in {{n:mda.rec.wtsd}} der Fälle zum Showdown und gewinnen {{n:mda.rec.wsd}} der Showdowns; bei {{t:regular|Regs}} sind es {{n:mda.reg.wtsd}} und {{n:mda.reg.wsd}}. Was folgt daraus?"
    options:
      - { text: "{{t:recreational|Freizeitspieler}} zahlen öfter bis zum Ende und verlieren öfter: Sie {{t:call|callen}} mit schwächeren Händen", correct: true, why: "Sie kommen öfter zum Showdown und gewinnen ihn seltener, also kommen sie mit schwächeren Händen dorthin. Gegen sie bettest du mehr Hände {{t:value|auf Value}} und {{t:bluff|bluffst}} weniger." }
      - { text: "{{t:recreational|Freizeitspieler}} {{t:bluff|bluffen}} öfter", why: "Diese Zahlen sagen etwas darüber, wie oft sie zum Showdown kommen und womit, nicht über {{t:bluff|Bluffs}}. Sie gewinnen weniger Showdowns, weil sie mit schwächeren Händen {{t:call|callen}}." }
      - { text: "Nichts: Eine Differenz von ein paar Punkten ist Rauschen", why: "Das sind Daten der gesamten Population dieses {{t:stakes|Limits}} über {{n:mda.period.months}} Monate, nicht aus ein paar Dutzend Händen eines Spielers. Der Unterschied ist bei NL25, NL50 und NL100 konsistent." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Du hast Flop und Turn gebettet, dein Gegner hat {{t:call|gecallt}}. Er ist ein passiver {{t:recreational|Freizeitspieler}} ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} Hände). Er {{t:check|checkt}}. Was machst du mit {{t:top-pair|Top Pair}} und dem zweitbesten Kicker?"
    options:
      - { text: "Ich bette {{t:value|auf Value}}", correct: true, why: "So ein Spieler {{t:call|callt}} bis zum Ende mit schwächeren Königen, Achten und Pocket-{{t:pair|Paaren}}. Mehr als die Hälfte seiner {{t:call|Calls}} sind schlechtere Hände als deine, also bringt die Bet Gewinn (Schwelle aus Modul 8)." }
      - { text: "Ich {{t:check|checke}}, um nicht in eine bessere Hand zu laufen", why: "Gegen einen Spieler, der mit schwächeren Händen {{t:call|callt}}, verschenkt ein {{t:check}} Value. Bessere Hände zahlen manchmal, aber {{t:call|Calls}} von schlechteren Händen gibt es mehr." }
      - { text: "Ich bette den ganzen {{t:pot}} als {{t:bluff}}", why: "Mit {{t:top-pair|Top Pair}} ist das kein {{t:bluff}}: Du schlägst viele Hände, die {{t:call|callen}}. Die Bet geht {{t:value|auf Value}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, dein {{t:straight-draw}} ist nicht angekommen. Dein Gegner ist ein passiver {{t:recreational|Freizeitspieler}} ({{t:wtsd}} {{n:mda.rec.wtsd}}) und hat Flop und Turn {{t:call|gecallt}}. Er {{t:check|checkt}}. Was machst du?"
    options:
      - { text: "Ich {{t:check|checke}} und gebe den {{t:pot}} auf", correct: true, why: "Ein {{t:bluff}} bringt nur dann Gewinn, wenn dein Gegner öfter {{t:fold|foldet}} als das {{t:alpha}} deiner Bet. Ein Spieler, der zwei {{t:street|Streets}} {{t:call|gecallt}} hat und oft zum Showdown kommt, {{t:fold|foldet}} am River selten." }
      - { text: "Ich bette groß, weil ich keinen Showdown-Value habe", why: "In der Basisstrategie (Modul 8) kann so ein {{t:bluff}} gut sein, aber gegen diesen Spieler fehlen die {{t:fold|Folds}}: Der {{t:bluff}} verliert." }
      - { text: "Ich bette klein, damit der {{t:bluff}} billiger ist", why: "Eine kleinere Bet braucht weniger {{t:fold|Folds}}, aber eine Hand, die zwei {{t:street|Streets}} {{t:call|gecallt}} hat, {{t:call|callt}} meist auch eine kleine Bet. Besser, du gibst den {{t:pot}} auf." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "Du {{t:open|eröffnest}} aus dem {{t:cutoff|CO}}. Am Button sitzt ein {{t:nit}}: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} Hände. Er 3-bettet dich. Was machst du mit AJo?"
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Wer so wenige Hände spielt, 3-bettet vor allem mit den stärksten: AQ, AK und hohen {{t:pair|Paaren}}, die AJ dominieren. Gegen ihn {{t:fold|foldest}} du öfter als in der Basisstrategie aus Modul 4." }
      - { text: "Ich {{t:call|calle}}, weil AJ eine starke Hand ist", why: "AJ ist stark gegen eine breite {{t:range}}. Gegen die 3-Bet eines Spielers mit {{t:vpip}} {{n:hud.ex.nit.vpip}} ist es oft dominiert und ohne {{t:position}}." }
      - { text: "Ich 4-bette", why: "Eine 4-Bet mit AJ gegen einen {{t:nit}} spielt gegen eine {{t:range}}, die AJ dominiert und selten {{t:fold|foldet}}. Das ist weder {{t:value}} noch ein guter {{t:bluff}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Du sitzt am Button, alle haben {{t:fold|gefoldet}}. Im {{t:big-blind}} sitzt ein {{t:nit}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} nach {{n:hud.ex.reg.hands}} Händen). Wie änderst du deine {{t:open|Eröffnung}}?"
    options:
      - { text: "Ich {{t:open|eröffne}} breiter als in der Basisstrategie", correct: true, why: "Ein {{t:nit}} verteidigt seinen Blind eng, daher gewinnt deine {{t:open|Eröffnung}} öfter sofort, selbst mit einer schwachen Hand." }
      - { text: "Ich {{t:open|eröffne}} enger, weil der {{t:nit}} starke Hände hat", why: "Ein {{t:nit}} hat starke Hände, wenn er spielt. Im {{t:big-blind}} {{t:fold|foldet}} er meistens, und das ist dein Gewinn." }
      - { text: "Keine Änderung: Der Spielertyp beeinflusst das Blindstehlen nicht", why: "Doch. Der Gewinn aus dem Stehlen hängt davon ab, wie oft der Blind {{t:fold|foldet}}, und ein {{t:nit}} {{t:fold|foldet}} oft." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "Dein Gegner ist ein {{t:maniac}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} nach {{n:hud.ex.reg.hands}} Händen. Er hat jede {{t:street}} gebettet, am River {{t:bet|bettet}} er den ganzen {{t:pot}}. Was machst du mit {{t:top-pair|Top Pair}} und schwachem Kicker?"
    options:
      - { text: "Ich {{t:call|calle}}", correct: true, why: "Gegen einen Spieler, der mehr {{t:bluff|blufft}} als in der Basisstrategie, bringen Hände an der Grenze zum {{t:call}} Gewinn. Top {{t:pair|Pair}} schlägt seine {{t:bluff|Bluffs}} und einen Teil seiner Value-Hände." }
      - { text: "Ich {{t:fold|folde}}, weil eine Bet über den ganzen {{t:pot}} eine starke Hand bedeutet", why: "Bei einem Spieler, der fast jede Hand mit einem {{t:raise}} spielt und jede {{t:street}} bettet, enthält eine große Bet viele {{t:bluff|Bluffs}}. Wenn du {{t:fold|foldest}}, bezahlst du ihn dafür, dass er aggressiv ist." }
      - { text: "Ich {{t:raise|raise}} all-in", why: "Ein {{t:raise}} bringt {{t:bluff|Bluffs}} zum {{t:fold|Folden}}, und bessere Hände {{t:call|callen}}. Mit einer Hand, die {{t:bluff|Bluffs}} fängt, reicht ein {{t:call}}." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Du spielst gegen einen {{t:maniac}}. Am Turn hast du eine schwache Hand ohne Chance auf Verbesserung, und er {{t:check|checkt}}. Was machst du?"
    options:
      - { text: "Ich {{t:check|checke}}: Einen {{t:maniac}} zu {{t:bluff|bluffen}} funktioniert selten", correct: true, why: "Ein {{t:maniac}} {{t:fold|foldet}} selten und {{t:raise|raist}} oft. Gegen ihn verdienst du Geld mit {{t:call|Calls}} mit stärkeren Händen, nicht mit {{t:bluff|Bluffs}}." }
      - { text: "Ich bette, weil ein {{t:check}} eines {{t:maniac|Maniacs}} Schwäche bedeutet", why: "Kann sein, aber ein {{t:maniac}} {{t:raise|raist}} oft mit jeder Hand. Ein {{t:bluff}} braucht {{t:fold|Folds}}, und davon gibt es bei ihm wenige." }
      - { text: "Ich bette all-in, damit er nicht {{t:raise|raisen}} kann", why: "Du riskierst deinen ganzen Stack, um einen kleinen {{t:pot}} zu gewinnen, gegen einen Spieler, der selten {{t:fold|foldet}}. Das ist die teuerste Art zu {{t:bluff|bluffen}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Die Stats aus der vorigen Lektion fügen sich zu einigen typischen Bildern. Der Spielertyp sagt dir, in welche Richtung ein Spieler von der Basisstrategie abweicht: Er spielt zu wenige Hände, zu viele Hände, {{t:call|callt}} zu oft oder {{t:raise|raist}} zu oft.

## Zwei Zahlen, vier Typen

Den Typ liest du an {{t:vpip}} und der Differenz {{t:vpip}} − {{t:pfr}} ab (6-max, mindestens etwa {{n:hud.hands.vpip.low}} Hände):

| Typ | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Fehler gegenüber der Basisstrategie |
|---|---|---|---|
| {{t:nit|Nit}} | bis etwa {{n:hud.vpip.nit-max}} | klein | spielt zu wenige Hände |
| {{t:regular|Reg}} ({{t:tag}}, {{t:lag}}) | etwa {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | klein | nah an der Basisstrategie |
| passiver {{t:recreational|Freizeitspieler}} | ab etwa {{n:hud.vpip.loose}} | über {{n:hud.gap.passive}} Punkte | zu viele Hände, {{t:call|callt}} zu oft |
| {{t:maniac}} | ab etwa {{n:hud.vpip.loose}} | bis etwa {{n:hud.gap.aggressive}} Punkte | zu viele Hände, {{t:raise|raist}} zu oft |

Einen passiven Spieler mit großer Differenz nennt man auch {{t:calling-station}}. Zwischen den Typen gibt es Übergangszonen (z. B. ein {{t:vpip}} im Zehnerbereich oder ein looser Spieler mit einer Differenz von ein paar Punkten): Dort ordnest du keinen Typ zu, sondern schaust dir weitere Stats an.

## Was die Populationsdaten zeigen

Eine öffentliche Statistikdatenbank liefert die Durchschnittsstats der Spieler einer großen Online-Plattform, NL25 6-max, aus allen Händen der letzten {{n:mda.period.months}} Monate. Als {{t:regular|Regs}} gelten dort Spieler mit {{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} und einer Winrate über {{n:mda.reg.def.wr}}, als {{t:recreational|Freizeitspieler}} Spieler mit {{t:vpip}} über {{n:mda.rec.def}} und einer Winrate unter {{n:mda.rec.def.wr}}:

| Stat | {{t:regular|Regs}} | {{t:recreational|Freizeitspieler}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold auf 3-Bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Gewonnene Showdowns | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Winrate | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

{{t:recreational|Freizeitspieler}} haben eine Differenz {{t:vpip}} − {{t:pfr}} von {{n:mda.rec.gap.pp}} Punkten, sind also passiv. Sie kommen öfter zum Showdown und gewinnen ihn seltener: Sie {{t:call|callen}} mit schwächeren Händen. Außerdem {{t:fold|folden}} sie selten auf eine 3-Bet. Bei NL50 und NL100 sind die Zahlen fast gleich.

## Der passive {{t:recreational|Freizeitspieler}}

Die Basisstrategie aus Modul 8 ändert sich nicht: Du bettest {{t:value|auf Value}}, wenn mehr als die Hälfte der Hände, die {{t:call|callen}}, schlechter sind, und ein {{t:bluff}} bringt Gewinn, wenn dein Gegner öfter {{t:fold|foldet}} als {{t:alpha}}. Was sich ändert, ist der Gegner: Er {{t:call|callt}} mit mehr schwächeren Händen. Deshalb:

- bettest du mehr Hände {{t:value|auf Value}}, auch dünnere, z. B. {{t:top-pair|Top Pair}} mit schwächerem Kicker über drei {{t:street|Streets}};
- {{t:bluff|bluffst}} du seltener, vor allem am River: Es fehlen die {{t:fold|Folds}}, mit denen ein {{t:bluff}} Gewinn bringen müsste.

## {{t:nit|Nit}} und {{t:maniac}}

**Der {{t:nit}}** spielt nur starke Hände. Wenn er {{t:raise|raist}} oder 3-bettet, sind die Hände am unteren Ende deiner {{t:call|Calling}}-{{t:range}} öfter dominiert, also {{t:fold|foldest}} du sie öfter als in der Basisstrategie aus Modul 4. Sitzt er im Blind, stiehlst du öfter, weil er selten verteidigt.

**Der {{t:maniac}}** spielt viele Hände und {{t:raise|raist}} fast jede. Seine Bets enthalten mehr {{t:bluff|Bluffs}} als in der Basisstrategie, also {{t:call|callst}} du mit Händen an der Grenze zum {{t:call}}, lässt ihn mit sehr starken Händen betten und {{t:bluff|bluffst}} selbst nicht: Er {{t:fold|foldet}} selten.

:::note Woher diese Schwellen kommen
Die Schwellen der Typen sind Trainerkonventionen (zwei Trainingsmaterialien, 6-max Online-Cash): Wir nehmen die Schnittmenge oder einen Bereich, der beide Quellen abdeckt. Die Populationsdaten stammen aus einer öffentlichen Statistikdatenbank (eine große Online-Plattform, NL25–NL100, alle Hände aus den {{n:mda.period.months}} Monaten vor Oktober 2026; Handzahlen gibt die Seite nicht an). Einen {{t:nit}} oder {{t:maniac}} erkennst du an den Stats eines konkreten Gegners, nicht an Daten über die ganze Population, deshalb braucht es eine Stichprobe.
:::
