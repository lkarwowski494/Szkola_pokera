---
id: m8.l1
module: m8
order: 1
title: "Value Bet am River"
sub: "Bette, wenn schlechtere Hände zahlen"
rules: [R-M8-001, R-M8-002, R-M8-003]
drills:
  - kind: choice
    id: m8.l1.q-why-bet
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "River: Alle Karten liegen schon auf dem {{t:board|Board}}. Wozu überhaupt betten?"
    options:
      - { text: "Damit schlechtere Hände zahlen oder bessere {{t:fold|folden}}", correct: true, why: "Am River kommen keine Karten mehr, also hat eine Bet nur zwei Ziele: Value (schlechtere Hände zahlen) oder ein {{t:bluff|Bluff}} (bessere Hände {{t:fold|folden}}). Eine Bet, die keins von beidem schafft, kostet nur." }
      - { text: "Um dem Gegner die Chance zu nehmen, noch etwas zu treffen", why: "Das ist ein Grund für eine Bet am Flop und Turn. Am River trifft der Gegner nichts mehr: Seine Hand steht fest." }
      - { text: "Um herauszufinden, ob meine Hand die beste ist", why: "Eine Bet ist keine Frage. Wenn du eine mittlere Hand bettest, {{t:fold|folden}} schlechtere Hände meist, und bessere zahlen, also „findest du es heraus“ mit deinem eigenen Geld. Kostenlos findest du es heraus, wenn du {{t:check|checkst}}." }
  - kind: choice
    id: m8.l1.q-threshold-yes
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, dein Gegner {{t:check|checkt}}. Du schätzt, dass er deine Bet in {{n:value.ex.calls}} Fällen zahlt: {{n:value.ex.many}}-mal mit einer schlechteren Hand, {{n:value.ex.few}}-mal mit einer besseren. {{t:raise|Raisen}} kann er dich nicht. Bettest du?"
    options:
      - { text: "Ja, das ist eine Bet auf {{t:value|Value}}", correct: true, why: "Du gewinnst die Bet {{n:value.ex.many}}-mal und verlierst sie {{n:value.ex.few}}-mal: Netto bleiben {{n:value.ex.net}} Bets. Mehr als {{n:value.threshold}} der {{t:call|Calls}} sind schlechtere Hände, also bringt die Bet mehr als ein {{t:check|Check}}." }
      - { text: "Nein, weil er manchmal mit einer besseren Hand zahlt", why: "Eine bessere Hand zahlt immer in einem Teil der Fälle. Entscheidend ist, ob es mehr schlechtere {{t:call|Calls}} als bessere gibt: Hier sind es {{n:value.ex.many}} zu {{n:value.ex.few}}." }
      - { text: "Nur, wenn der Gegner nie eine bessere Hand hat", why: "Dann würdest du nur die Nuts betten und viel Value verschenken. Es reicht, dass mehr als {{n:value.threshold}} der {{t:call|Calls}} schlechtere Hände sind." }
  - kind: choice
    id: m8.l1.q-threshold-no
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River, dein Gegner {{t:check|checkt}}. Er zahlt deine Bet in {{n:value.ex.calls}} Fällen: {{n:value.ex.few}}-mal mit einer schlechteren Hand, {{n:value.ex.many}}-mal mit einer besseren. Die schlechteren Hände des Gegners, die {{t:fold|folden}}, würden beim Showdown ohnehin gegen dich verlieren. Was tust du?"
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Die Bet würde {{n:value.ex.few}}-mal gewinnen und {{n:value.ex.many}}-mal verlieren: Netto verlierst du {{n:value.ex.net}} Bets. Nach einem {{t:check|Check}} gewinnst du den {{t:pot|Pot}} gegen dieselben schlechteren Hände, nur ohne an die besseren auszuzahlen." }
      - { text: "Ich bette, weil ich eine ordentliche Hand habe", why: "Die Handstärke allein reicht nicht. Entscheidend ist, wer zahlt: Hier sind die meisten {{t:call|Calls}} bessere Hände, also verliert die Bet." }
      - { text: "Ich bette groß, damit bessere Hände {{t:fold|folden}}", why: "Das wäre ein {{t:bluff|Bluff}} mit einer Hand, die oft beim Showdown gewinnt. Bessere Hände {{t:fold|folden}} am River selten, und nach einem {{t:check|Check}} schlägst du die schlechteren ohnehin." }
  - kind: numeric
    id: m8.l1.n-net
    family: m8.value.threshold
    rules: [R-M8-001]
    prompt: "River. {{n:value.ex.many}} schlechtere Hände und {{n:value.ex.few}} bessere {{t:call|callen}} deine Bet. Wie viele Bets gewinnst du netto bei diesen {{n:value.ex.calls}} {{t:call|Calls}}? Gib eine Zahl ein."
    answer: value.ex.net
    explanation: "Jeder {{t:call|Call}} mit einer schlechteren Hand ist eine gewonnene Bet, jeder mit einer besseren eine verlorene: {{n:value.ex.many}} − {{n:value.ex.few}} = {{n:value.ex.net}}. Den {{t:pot|Pot}} würdest du gegen schlechtere Hände auch nach einem {{t:check|Check}} gewinnen, also zählst du nur die Bets."
  - kind: choice
    id: m8.l1.q-top-pair-top-kicker
    family: m8.value.spot
    rules: [R-M8-001]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind|Big Blind}} hat {{t:call|gecallt}}. Du hast am Flop und Turn gebettet und jedes Mal einen {{t:call|Call}} bekommen. River, der {{t:big-blind|Big Blind}} {{t:check|checkt}}. Was tust du?"
    table: { hand: "Ah Kd", board: "Ks 9c 4d 2h 7s", position: BTN }
    options:
      - { text: "Ich bette auf {{t:value|Value}}", correct: true, why: "{{t:top-pair|Top Pair}} mit dem besten Kicker. Ein Gegner, der zwei {{t:street|Streets}} {{t:call|gecallt}} hat, hat viele schwächere Könige (KQ, KJ, KT) und Neunen, und {{t:draw|Draws}} gab es auf diesem {{t:board|Board}} wenige. Schlechtere Hände zahlen deutlich öfter als bessere ({{t:two-pair|Two Pair}}, Sets). Normalerweise verträgt {{t:top-pair|Top Pair}} zwei {{t:value|Value-Streets}} (M9); hier eine dritte, weil der Gegner mit schwächeren Königen zahlt." }
      - { text: "Ich {{t:check|checke}}, weil der Gegner ein Set haben könnte", why: "Könnte er, aber selten. Wenn du {{t:check|checkst}}, verlierst du eine Bet von all den schwächeren Königen, mit denen er zahlen würde. Du zählst, wer {{t:call|callt}}, nicht, ob eine bessere Hand existiert." }
      - { text: "Ich {{t:check|checke}}, damit der Gegner blufft", why: "Ein Gegner, der zweimal {{t:call|gecallt}} hat, hat meist {{t:pair|Paare}} und {{t:bluff|blufft}} nach deinem {{t:check|Check}} selten. Sicherer verdienst du, wenn du in seine schwächeren Könige bettest." }
  - kind: choice
    id: m8.l1.q-second-pair
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind|Big Blind}} hat {{t:call|gecallt}}. Am Flop hast du eine C-Bet gespielt und einen {{t:call|Call}} bekommen, am Turn habt ihr beide {{t:check|gecheckt}}. River, der {{t:big-blind|Big Blind}} {{t:check|checkt}}. Was tust du?"
    table: { hand: "Tc 9c", board: "Kd Th 5s 3c 2d", position: BTN }
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "{{t:second-pair|Second Pair}} mit schwachem Kicker schlägt verpasste {{t:draw|Draws}} und schwächere {{t:pair|Paare}}, aber diese Hände {{t:fold|folden}} auf eine Bet. Zahlen werden vor allem Könige und bessere Zehnen. Du {{t:check|checkst}} und siehst den Showdown kostenlos." }
      - { text: "Ich bette auf {{t:value|Value}}", why: "Wer zahlt? Hände ohne {{t:pair|Paar}} {{t:fold|folden}}, und Könige und bessere Zehnen {{t:call|callen}}. Die meisten {{t:call|Calls}} wären besser als deine Hand." }
      - { text: "Ich bette groß als {{t:bluff|Bluff}}", why: "Deine Hand gewinnt oft beim Showdown. Wenn du {{t:bluff|bluffst}}, gibst du diesen Gewinn auf: Schlechtere Hände würden ohnehin {{t:fold|folden}}, und Könige {{t:fold|folden}} selten." }
  - kind: choice
    id: m8.l1.q-who-calls
    family: m8.value.concept
    rules: [R-M8-001, R-M8-003]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind|Big Blind}} hat {{t:call|gecallt}}. Am Flop hast du eine C-Bet gespielt und einen {{t:call|Call}} bekommen, am Turn habt ihr beide {{t:check|gecheckt}}. River, der {{t:big-blind|Big Blind}} {{t:check|checkt}}. Du hast {{t:top-pair|Top Pair}} mit Zehner-Kicker. Welche Hände zahlen eine kleine Bet und sind schlechter als deine?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Achten, Vieren und Damen mit schwächerem Kicker", correct: true, why: "Diese Hände haben den Flop gecallt und haben ein {{t:pair|Paar}}, also zahlen sie oft eine kleine Bet. Du verlierst gegen eine Dame mit besserem Kicker, {{t:two-pair|Two Pair}}, Sets und {{t:straight|Straßen}} (A5, 65), aber es gibt mehr schlechtere {{t:call|Calls}}." }
      - { text: "Hände ohne {{t:pair|Paar}}", why: "Eine Hand ohne {{t:pair|Paar}} zahlt selten eine Bet am River; manchmal zahlt Ass-high, aber schlechtere {{t:pair|Paare}} gibt es hier viel mehr." }
      - { text: "Keine, es zahlen nur bessere Hände", why: "Zu vorsichtig: Der {{t:big-blind|Big Blind}} verteidigt viele {{t:pair|Paare}} unterhalb der Dame. Nach dem {{t:check|Check}} am Turn enthält seine {{t:range|Range}} reichlich davon." }
  - kind: choice
    id: m8.l1.q-thin-size
    family: m8.value.size
    rules: [R-M8-003]
    prompt: "Gleiche Situation: Du hast {{t:top-pair|Top Pair}} mit Zehner-Kicker, der {{t:big-blind|Big Blind}} checkt am River. Im {{t:pot|Pot}} sind {{n:ex.pot}}. Was tust du?"
    table: { hand: "Qd Td", board: "Qs 8h 4c 3d 2s", position: BTN }
    options:
      - { text: "Bet {{n:ex.bet.quarter}}, also 1/4 {{t:pot|Pot}}", correct: true, why: "Thin Value: Du schlägst nur knapp mehr als die Hälfte der Hände, die zahlen. Eine kleine Bet {{t:call|callen}} Achten, Vieren und schwächere Damen, also bleiben mehr schlechtere {{t:call|Calls}} als bessere." }
      - { text: "Bet {{n:ex.bet.pot}}, also der ganze {{t:pot|Pot}}", sizeError: true, why: "Richtige Aktion, falsche Größe: Auf eine Bet in Höhe des {{t:pot|Pots}} {{t:fold|folden}} Achten und Vieren, und zahlen werden vor allem bessere Damen, {{t:two-pair|Two Pair}} und Sets. Dann sind die meisten {{t:call|Calls}} besser als du. Thin Value bettest du klein." }
      - { text: "Ich {{t:check|checke}}", why: "Du verlierst Value: Der Gegner hat viele niedrigere {{t:pair|Paare}}, die eine kleine Bet zahlen. Ein {{t:check|Check}} verschenkt dieses Geld." }
  - kind: choice
    id: m8.l1.q-where-am-i
    family: m8.value.check
    rules: [R-M8-002]
    prompt: "Ein Freund sagt: „Am River bette ich mit einem mittleren {{t:pair|Paar}}, um zu sehen, wo ich stehe.“ Was ist an dieser Idee falsch?"
    options:
      - { text: "Schlechtere Hände {{t:fold|folden}}, und bessere zahlen", correct: true, why: "Nach so einer Bet {{t:fold|folden}} die Hände, die du schlägst, und die, gegen die du verlierst, zahlen oder {{t:raise|raisen}}. Die Information bekommst du kostenlos mit einem {{t:check|Check}}, denn mit {{t:position|Position}} zeigt der Gegner beim Showdown seine Karten." }
      - { text: "Nichts, das ist ein guter Weg, an Informationen zu kommen", why: "Die Information kostet hier eine Bet, die du meist verlierst. Nach einem {{t:check|Check}} siehst du die Hand des Gegners, ohne draufzuzahlen." }
      - { text: "Die Bet sollte größer sein", why: "Eine größere Bet macht es schlimmer: Noch mehr schlechtere Hände {{t:fold|folden}}, und bessere zahlen weiterhin." }
  - kind: choice
    id: m8.l1.q-busted-draw
    family: m8.value.concept
    rules: [R-M8-001]
    prompt: "Dein {{t:flush-draw|Flush Draw}} ist nicht angekommen. Am River überlegst du eine Bet. Was für eine Bet wäre das?"
    table: { hand: "Qs Js", board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Ein {{t:bluff|Bluff}}", correct: true, why: "Deine höchste Karte ist nur die Dame. Keine Hand, die dich {{t:call|callt}}, ist schlechter, also kann die Bet nur gewinnen, wenn der Gegner {{t:fold|foldet}}. Das ist ein {{t:bluff|Bluff}} (die Auswahl von {{t:bluff|Bluffs}} kommt in späteren Lektionen)." }
      - { text: "Eine Bet auf {{t:value|Value}}", why: "Eine Bet auf {{t:value|Value}} setzt voraus, dass schlechtere Hände zahlen. Mit nur einer Dame {{t:call|callt}} dich fast nichts Schlechteres." }
      - { text: "Thin Value", why: "Thin Value ist eine Bet mit einer Hand, die knapp mehr als die Hälfte der {{t:call|Calls}} schlägt. Deine Hand schlägt fast keinen {{t:call|Call}}." }
---
Am River liegen alle Karten schon auf dem {{t:board|Board}}. Niemand trifft mehr etwas, also kann eine Bet nur zwei Dinge bewirken: dass eine schlechtere Hand zahlt (**Value**) oder dass eine bessere {{t:fold|foldet}} (**{{t:bluff|Bluff}}**). In dieser Lektion geht es um Value, in den nächsten um {{t:bluff|Bluffs}} und ums Callen.

## Die Schwelle: mehr als die Hälfte der {{t:call|Calls}}

Wenn du aus {{t:position|Position}} bettest und der Gegner nur {{t:call|callen}} oder {{t:fold|folden}} kann, zählst du nur die Hände, mit denen er zahlt:

```formula
Value-Bet: schlechtere Calls > bessere Calls
```

Jeder {{t:call|Call}} mit einer schlechteren Hand gewinnt eine Bet. Jeder {{t:call|Call}} mit einer besseren verliert eine Bet. Wenn der Gegner eine schlechtere Hand {{t:fold|foldet}}, gewinnst du denselben {{t:pot|Pot}} wie nach einem {{t:check|Check}}. Deshalb verdient eine Bet Geld, wenn mehr als **{{n:value.threshold}}** der Hände, die zahlen, schlechter sind als deine.

Beispiel: Von {{n:value.ex.calls}} {{t:call|Calls}} kommen {{n:value.ex.many}} von schlechteren Händen und {{n:value.ex.few}} von besseren. Netto gewinnst du {{n:value.ex.net}} Bets. Wäre das Verhältnis umgekehrt, würdest du genauso viel verlieren.

## Wer zahlt

Du fragst nicht „Habe ich eine gute Hand?“, sondern „Womit zahlt der Gegner?“. Dabei hilft es, seine {{t:range|Range}} durchzugehen:

- Hände ohne {{t:pair|Paar}} zahlen selten; manchmal zahlt Ass-high, das {{t:bluff|Bluffs}} schlägt,
- niedrigere {{t:pair|Paare}} und schwächere Kicker zahlen oft eine kleine Bet,
- bessere Hände zahlen immer und {{t:raise|raisen}} manchmal.

Wenn der Gegner dich {{t:raise|raisen}} kann und du dann {{t:fold|folden}} müsstest, liegt die Schwelle noch höher: Die Bet verdient nur Geld, wenn die schlechteren {{t:call|Calls}} klar überwiegen.

## Thin Value: klein, aber bezahlt

Thin Value (dünner Value) ist eine Bet mit einer Hand, die knapp mehr als die Hälfte der {{t:call|Calls}} schlägt, z. B. {{t:top-pair|Top Pair}} mit mittlerem Kicker. Diese Bet machst du **kleiner** als mit einer starken Hand, meist etwa 1/4–1/2 {{t:pot|Pot}}: Eine kleine Bet zahlen auch schwächere {{t:pair|Paare}}, auf eine große {{t:fold|folden}} sie, und es bleiben nur bessere Hände.

Das ist eine Vereinfachung: Ohne Check-Raise-Risiko bettet ein Solver Thin Value sogar mit etwa 1/4 {{t:pot|Pot}}, mit diesem Risiko geht er aus {{t:position|Position}} selten unter 1/2 {{t:pot|Pot}}.

## Eine mittlere Hand {{t:check|checkt}}

Du hast {{t:in-position|in Position}} eine mittlere Hand, z. B. {{t:second-pair|Second Pair}}. Die schlechteren Hände des Gegners {{t:fold|folden}} auf eine Bet, und bessere zahlen. Eine Bet macht deine Hand dann zu einem {{t:bluff|Bluff}}. Du {{t:check|checkst}}: Du gewinnst den Showdown gegen schlechtere Hände, ohne an bessere auszuzahlen.

:::note Woher diese Regeln kommen
Die Schwelle von mehr als der Hälfte der {{t:call|Calls}} ist reine Mathematik (Bet {{t:in-position|in Position}}, ohne {{t:raise|Raise}} und ohne Rake). Die Thin-Value-Größe und das {{t:check|Checken}} mit einer mittleren Hand stammen aus veröffentlichten Solver-Analysen ({{t:tournament|Turniere}} mit kürzeren Stacks) und aus Trainingsmaterialien.
:::
