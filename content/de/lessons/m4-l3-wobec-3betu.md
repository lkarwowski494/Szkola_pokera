---
id: m4.l3
module: m4
order: 3
title: "Wenn du eine 3-Bet bekommst"
sub: "Fold, Call oder 4-Bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "Du hast aus dem {{t:cutoff|CO}} auf {{n:pf.open-size}} {{t:open|eröffnet}}, der Button hat auf {{n:pf.3bet.ip-total}} {{t:raise|geraist}}, die Blinds haben {{t:fold|gefoldet}}. Welchen Anteil der {{t:range|Range}}, mit der du {{t:open|eröffnest}}, musst du mindestens weiterspielen ({{t:call|callen}} oder 4-betten), damit der Button mit seiner 3-Bet nicht mit jeder Hand Gewinn macht?"
    table: { position: CO }
    options:
      - { text: "Etwa {{n:mdf.vs-3bet-ip-size}} der {{t:range|Range}}, mit der du {{t:open|eröffnest}}", correct: true, why: "Der Button riskiert {{n:pf.3bet.ip-total}}, um {{n:vs3bet.win}} zu gewinnen. Wenn du öfter als {{n:alpha.vs-3bet-ip-size}} {{t:fold|foldest}}, macht seine 3-Bet sogar mit der schlechtesten Hand Gewinn." }
      - { text: "Etwa die Hälfte der {{t:range|Range}}", why: "Zu viel für ein Minimum: Mathematisch reichen {{n:mdf.vs-3bet-ip-size}}. Laut Solver-Lösungen und Tabellen {{t:fold|foldet}} der {{t:open|Eröffnende}} etwa {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} seiner {{t:open|Opens}} und spielt also mit weniger als der Hälfte der {{t:range|Range}} weiter." }
      - { text: "Immer, mit jeder Hand", why: "Dann bezahlst du 3-Bets mit Händen, die gegen die {{t:range|Range}} des Buttons verlieren. Ein {{t:fold|Fold}} mit dem schwächsten Teil deiner {{t:open|Opens}} ist richtig." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Du hast aus dem {{t:cutoff|CO}} auf {{n:pf.open-size}} {{t:open|eröffnet}}, der Button hat auf {{n:pf.3bet.ip-total}} {{t:raise|geraist}}, die Blinds haben {{t:fold|gefoldet}}. Was machst du?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Offsuit-KJ ist {{t:out-of-position|ohne Position}} oft von AK, AJ und KQ dominiert und nach dem Flop schwer zu spielen. Trainingsmaterialien empfehlen hier einen {{t:fold|Fold}}." }
      - { text: "Ich {{t:call|calle}}", why: "Das ist verlockend, weil es hohe Karten sind, aber {{t:out-of-position|ohne Position}} hat diese Hand eine schwache {{t:equity-realization|Equity-Realisierung}} und verliert oft gegen einen besseren Kicker." }
      - { text: "Ich 4-bette", why: "KJo ist zu schwach für eine 4-Bet {{t:value|auf Value}}, und als {{t:bluff|Bluff}} blockt die Hand nicht die Hände, mit denen der Button weiterspielt." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Du hast aus dem {{t:cutoff|CO}} auf {{n:pf.open-size}} {{t:open|eröffnet}}, der Button hat auf {{n:pf.3bet.ip-total}} {{t:raise|geraist}}, die Blinds haben {{t:fold|gefoldet}}. Was machst du?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "Ich 4-bette", correct: true, why: "AK 4-bettest du meistens: Die Hand will den Stack reinbringen, blockt AA und KK des Gegners und dominiert AQ, KQ und schwächere Asse." }
      - { text: "Ich {{t:call|calle}}", why: "Manche Quellen {{t:call|callen}} AK manchmal, meistens spielst du aber die 4-Bet: {{t:out-of-position|Ohne Position}} verlierst du nach einem {{t:call|Call}} die {{t:initiative|Initiative}} und Value." }
      - { text: "Ich {{t:fold|folde}}", why: "AK ist preflop eine der besten Hände. Ein {{t:fold|Fold}} ist hier ein großer Fehler." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Du hast vom Button auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:small-blind|Small Blind}} hat {{t:fold|gefoldet}}, der {{t:big-blind|Big Blind}} hat auf {{n:pf.3bet.oop-total}} {{t:raise|geraist}}. Was machst du?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "Ich {{t:call|calle}}", correct: true, why: "Ein suited {{t:connectors|Connector}} hat {{t:in-position|in Position}} eine gute {{t:equity-realization|Equity-Realisierung}}: Er trifft {{t:straight|Straßen}} und Flushes, und wenn er verfehlt, kannst du ihn am Flop leicht {{t:fold|folden}}." }
      - { text: "Ich {{t:fold|folde}}", why: "{{t:in-position|In Position}} ist diese Hand spielbar genug, um sie zu verteidigen. Ein {{t:fold|Fold}} wäre zu tight." }
      - { text: "Ich 4-bette", why: "Als {{t:bluff|Bluff}} eignen sich suited Asse besser, weil sie AA und AK blocken. 87s sieht lieber einen Flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Du hast vom Button auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:small-blind|Small Blind}} hat {{t:fold|gefoldet}}, der {{t:big-blind|Big Blind}} hat auf {{n:pf.3bet.oop-total}} {{t:raise|geraist}}. Was machst du?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Laut einer Quelle {{t:fold|foldest}} du die niedrigsten {{t:pair|Paare}} gegen eine große 3-Bet sogar {{t:in-position|in Position}}: Sie verdienen vor allem dann, wenn sie ein Set treffen, und der Preis ist zu hoch. Eine andere Quelle lässt zu, sie {{t:in-position|in Position}} zu {{t:call|callen}}." }
      - { text: "Ich {{t:call|calle}}, weil ich {{t:position|Position}} habe", why: "{{t:position|Position}} hilft, aber bei einer 3-Bet auf {{n:pf.3bet.oop-total}} ist der Preis zu hoch für eine Hand, die ein Set treffen muss." }
      - { text: "Ich 4-bette", why: "Ein {{t:pair|Paar}} 33 ist keine Hand für eine 4-Bet: weder Value noch ein guter {{t:bluff|Bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Du hast aus dem {{t:cutoff|CO}} auf {{n:pf.open-size}} {{t:open|eröffnet}}, der Button hat auf {{n:pf.3bet.ip-total}} {{t:raise|geraist}}, die Blinds haben {{t:fold|gefoldet}}. Was machst du?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "Ich 4-bette", correct: true, why: "Eine Quelle 4-bettet QQ (und JJ) in der großen Mehrheit der Fälle: Der Button spielt mit vielen schwächeren {{t:pair|Paaren}} und Assen weiter." }
      - { text: "Ich {{t:call|calle}}", correct: true, why: "Ebenfalls ein guter Spielzug: Eine andere Quelle nimmt QQ in die {{t:range|Range}} zum {{t:call|Callen}} auf, um schwächere Hände des Buttons nicht zum Folden zu bringen. Die Quellen unterscheiden sich, daher sind beide Spielzüge gut." }
      - { text: "Ich {{t:fold|folde}}", why: "QQ ist preflop die drittbeste Hand. Ein {{t:fold|Fold}} ist ein großer Fehler." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Du hast aus dem {{t:cutoff|CO}} auf {{n:pf.open-size}} {{t:open|eröffnet}}, der Button hat auf {{n:pf.3bet.ip-total}} {{t:raise|geraist}}, die Blinds haben {{t:fold|gefoldet}}. Was machst du?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "Ich {{t:call|calle}}", correct: true, why: "Ein starkes suited Ass ist die Grundlage der {{t:range|Range}} zum {{t:call|Callen}}: Es blockt AA und AK und trifft Flushes und gute {{t:pair|Paare}}." }
      - { text: "Ich {{t:fold|folde}}", why: "Zu tight: AJs gehört zu den besten Händen, um sich gegen eine 3-Bet zu verteidigen." }
      - { text: "Ich 4-bette {{t:value|auf Value}}", why: "AJs ist zu schwach, um um den ganzen Stack spielen zu wollen. Die besseren Hände des Buttons dominieren die Hand." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "Du hast vom Button auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:small-blind|Small Blind}} hat auf {{n:pf.3bet.oop-total}} {{t:raise|geraist}}, der {{t:big-blind|Big Blind}} hat {{t:fold|gefoldet}}. Du hast KK und willst 4-betten. Auf wie viel?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "Auf etwa {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|In Position}} beträgt eine 4-Bet etwa {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} der 3-Bet. Wenn der {{t:small-blind|Small Blind}} {{t:call|callt}}, liegen etwa {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} im {{t:pot|Pot}} (mit dem toten {{t:big-blind|Big Blind}}), und in den Stacks bleibt etwa {{n:spr.4bet.high}}–{{n:spr.4bet}}-mal so viel, wie im {{t:pot|Pot}} liegt." }
      - { text: "Auf {{n:pf.4bet.too-small}}", why: "Zu wenig: Du gibst dem Gegner einen sehr guten Preis für einen {{t:call|Call}} {{t:out-of-position|ohne Position}}." }
      - { text: "All-in für {{n:format.stack}}", why: "Bei Stacks von {{n:format.stack}} drängt ein All-in die schwächeren Hände heraus, mit denen der Gegner eine 4-Bet bezahlt hätte. Du verdienst weniger." }
---
Eine 3-Bet ist die Antwort des Gegners auf dein {{t:open|Open}}. Du hast drei Möglichkeiten: Du {{t:fold|foldest}}, {{t:call|callst}} oder {{t:raise|raist}} noch einmal, das heißt, du 4-bettest.

:::note Woher diese Regeln stammen
Diese Lektion basiert auf Trainingsmaterialien aus mehreren Quellen und veröffentlichten Ergebnissen anderer Solver, nicht auf dem Solver der App. Für das Spiel gegen eine 3-Bet ist der Solver der App noch nicht validiert, deshalb sind die Regeln als Heuristiken gekennzeichnet.
:::

## Wie viel du weiterspielst

Wenn der Button dein {{t:open|Open}} aus dem {{t:cutoff|CO}} auf {{n:pf.3bet.ip-total}} {{t:raise|raist}}, riskiert er so viel, um {{n:vs3bet.win}} zu gewinnen. Wenn du öfter als {{n:alpha.vs-3bet-ip-size}} {{t:fold|foldest}}, macht seine 3-Bet mit jeder Hand Gewinn. Du musst also mindestens etwa {{n:mdf.vs-3bet-ip-size}} der {{t:range|Range}}, mit der du {{t:open|eröffnest}}, weiterspielen.

Laut einer veröffentlichten Solver-Lösung ({{t:cutoff|CO}} gegen eine 3-Bet des Buttons auf {{n:pf.3bet.ip-total}}) {{t:fold|foldet}} der {{t:open|Eröffnende}} etwa {{n:pf.vs3bet.pub1.fold}} seiner {{t:open|Opens}}, {{t:call|callt}} etwa {{n:pf.vs3bet.pub1.call}} und 4-bettet etwa {{n:pf.vs3bet.pub1.4bet}}; vereinfachte Tabellen aus einer anderen Quelle ergeben etwa {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. Wir verwenden Bereiche, die nahe an beiden Quellen liegen: {{t:fold|Fold}} etwa {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call|Call}} etwa {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-Bet etwa {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. Die Obergrenze für {{t:fold|Folds}} liegt knapp unter der Schwelle von {{n:alpha.vs-3bet-ip-size}}: Würdest du öfter folden, würde die 3-Bet des Buttons mit jeder Hand Gewinn machen. Für einen {{t:call|Call}} brauchst du etwa {{n:eq.call-3bet-ip-size}} Equity: Du zahlst {{n:vs3bet.call}} in einen {{t:pot|Pot}}, der nach dem {{t:call|Call}} {{n:vs3bet.pot-after}} enthält.

## {{t:out-of-position|Ohne Position}} wählst du vorsichtig

{{t:out-of-position|Ohne Position}} {{t:call|callst}} du mit Händen, die nach dem Flop gut spielbar sind: vor allem suited hohe Karten (KQs, QJs), starke suited Asse, mittlere und hohe {{t:pair|Paare}} sowie ein Teil der suited {{t:connectors|Connectors}}. Schwächere offsuit Hände wie KJo, ATo oder QTo sind oft dominiert, deshalb {{t:fold|foldest}} du sie.

## {{t:in-position|In Position}} verteidigst du breiter

{{t:in-position|In Position}} {{t:call|callst}} du auch mit {{t:pair|Paaren}} von 66 bis TT und suited {{t:connectors|Connectors}} (T9s, 98s, 87s). Laut einer Quelle {{t:fold|foldest}} du die niedrigsten {{t:pair|Paare}} gegen eine große 3-Bet sogar {{t:in-position|in Position}}: Sie verdienen vor allem dann, wenn sie ein Set treffen, und der Preis ist zu hoch. Eine andere Quelle lässt zu, sie {{t:in-position|in Position}} zu {{t:call|callen}}.

## 4-Bet

AA, KK und AK 4-bettest du meistens {{t:value|auf Value}}; AK {{t:call|callen}} manche Quellen manchmal. QQ und JJ spielen die Quellen unterschiedlich: Eine 4-bettet meistens, die andere {{t:call|callt}}. Als {{t:bluff|Bluff}} eignen sich suited Asse wie A5s am besten: Sie blocken AA und AK des Gegners und haben nach einem {{t:call|Call}} Chancen auf einen {{t:flush|Flush}} und eine {{t:straight|Straße}}. Eine 4-Bet beträgt etwa {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} der 3-Bet {{t:in-position|in Position}} und {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position|ohne Position}}. Wenn du zum Beispiel vom Button gegen eine 3-Bet des {{t:small-blind|Small Blinds}} auf {{n:pf.3bet.oop-total}} 4-bettest (der {{t:big-blind|Big Blind}} hat {{t:fold|gefoldet}}), {{t:raise|raist}} du auf {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; wenn du aus dem {{t:cutoff|CO}} gegen eine 3-Bet des Buttons auf {{n:pf.3bet.ip-total}} 4-bettest, {{t:raise|raist}} du auf etwa {{n:pf.4bet.oop-example.low}}. Nach einem {{t:call|Call}} bleibt in den Stacks etwa {{n:spr.4bet.high}}–{{n:spr.4bet.oop}}-mal so viel, wie im {{t:pot|Pot}} liegt, sodass gute Hände den Rest leicht reinbringen.
