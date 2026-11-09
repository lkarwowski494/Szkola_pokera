---
id: m8.l4
module: m8
order: 4
title: "Bluffs fangen"
sub: "Mit welchen Händen du am River callst"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Du verteidigst den {{t:big-blind}}. Am River {{t:check|checkst}} du, und der Button {{t:bet|setzt}} den ganzen {{t:pot|Pot}}. Die Pik sind nicht gekommen. Welche Rolle spielt dein {{t:pair}} Neunen?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-Catcher: gewinnt nur gegen {{t:bluff|Bluffs}}", correct: true, why: "Für den ganzen {{t:pot|Pot}} setzt der Button {{t:value|auf Value}} mindestens mit einem König und {{t:bluff|blufft}} vor allem mit verpassten {{t:draw|Draws}}. Dein {{t:pair}} verliert gegen jede seiner {{t:value|Value}}-Hände und gewinnt gegen jeden {{t:bluff|Bluff}}." }
      - { text: "Eine {{t:value|Value}}-Hand", why: "Eine {{t:value|Value}}-Hand gewinnt gegen Hände, die bezahlen oder selbst {{t:value|auf Value}} setzen. Ein {{t:pair|Paar}} Neunen verliert gegen jeden König und jede bessere Hand des Buttons." }
      - { text: "Eine chancenlose Hand", why: "Ein {{t:pair|Paar}} Neunen gewinnt gegen verpasste {{t:draw|Draws}}, und genau mit denen {{t:bluff|blufft}} der Button. Es hat Chancen, aber nur gegen {{t:bluff|Bluffs}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} den ganzen {{t:pot|Pot}}: {{n:ex.bet.pot}}. Du hast einen Bluff-Catcher. Wie viel Prozent seiner Bets müssen mindestens {{t:bluff|Bluffs}} sein, damit sich ein {{t:call}} lohnt? Gib eine Zahl ein."
    answer: eq.bet-pot
    explanation: "Deine Equity ist der Anteil der {{t:bluff|Bluffs}} an seinen Bets. Du zahlst {{n:ex.bet.pot}}, um den {{t:pot|Pot}} nach deinem {{t:call|Call}} zu gewinnen: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. Das ist dieselbe Zahl wie der Anteil der {{t:bluff|Bluffs}} im Gleichgewicht aus der vorigen Lektion."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Dein Gegner {{t:bet|setzt}} einen halben {{t:pot|Pot}}. Du hast einen Bluff-Catcher und schätzt, dass etwa {{n:catch.ex.bluffs-low}} seiner Bets {{t:bluff|Bluffs}} sind. Was machst du?"
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Du brauchst {{n:eq.bet-half}} Equity, aber dein Bluff-Catcher gewinnt nur in {{n:catch.ex.bluffs-low}} der Fälle. Ein {{t:call|Call}} verliert." }
      - { text: "Ich {{t:call|calle}}, weil die {{t:mdf}} {{n:mdf.bet-half}} beträgt", why: "Die {{t:mdf}} schützt dich vor einem Gegner, der oft genug {{t:bluff|blufft}}. Wenn es zu wenige {{t:bluff|Bluffs}} gibt, verschenkt {{t:call|Callen}} mit Bluff-Catchern Geld." }
      - { text: "Ich {{t:raise|raise}}", why: "Deine Hand gewinnt nur gegen {{t:bluff|Bluffs}}. Nach einem {{t:raise|Raise}} {{t:fold|folden}} die {{t:bluff|Bluffs}}, und die {{t:value|Value}}-Hände zahlen: Du verlierst mehr." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Dein Gegner {{t:bet|setzt}} den ganzen {{t:pot|Pot}}. Du hast einen Bluff-Catcher und schätzt, dass etwa {{n:catch.ex.bluffs-high}} seiner Bets {{t:bluff|Bluffs}} sind. Was machst du?"
    options:
      - { text: "Ich {{t:call|calle}}", correct: true, why: "Du brauchst {{n:eq.bet-pot}} Equity, und die {{t:bluff|Bluffs}} machen {{n:catch.ex.bluffs-high}} aus. Dein Gegner {{t:bluff|blufft}} mehr, als es dem Gleichgewicht entspricht, also verdient ein {{t:call}} Geld." }
      - { text: "Ich {{t:fold|folde}}, weil die Bet groß ist", why: "Eine große Bet erhöht den Preis auf {{n:eq.bet-pot}}, aber es gibt mehr {{t:bluff|Bluffs}}. Entscheidend ist der Vergleich dieser beiden Zahlen, nicht die Betgröße allein." }
      - { text: "Ich {{t:raise|raise}} All-in", why: "Mit einem Bluff-Catcher {{t:raise|raist}} du nicht: Die {{t:bluff|Bluffs}} {{t:fold|folden}}, und es zahlen nur Hände, die besser sind als deine." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "Dein Gegner setzt am River den ganzen {{t:pot|Pot}} und {{t:bluff|blufft}} genau in {{n:bluff.share.bet-pot}} der Fälle. Wie viel verdienst du, wenn du mit einem Bluff-Catcher {{t:call|callst}}?"
    options:
      - { text: "Nichts: {{t:call}} und {{t:fold}} kommen aufs Gleiche heraus", correct: true, why: "Ein {{t:bluff|Bluff}}-Anteil von {{n:eq.bet-pot}} ist genau der Preis eines {{t:call|Calls}}. Die Gewinne gegen {{t:bluff|Bluffs}} gleichen die Verluste gegen Value aus, also lässt dich dein Gegner weder mit einem {{t:call|Call}} noch mit einem {{t:fold|Fold}} etwas verdienen." }
      - { text: "Ich verdiene, weil es viele {{t:bluff|Bluffs}} gibt", why: "Es gibt genau so viele, wie der Preis beträgt. Du verdienst erst, wenn dein Gegner öfter als in {{n:eq.bet-pot}} der Fälle {{t:bluff|blufft}}." }
      - { text: "Ich verliere, weil es mehr Value als {{t:bluff|Bluffs}} gibt", why: "Es gibt mehr Value, aber wenn du {{t:call|callst}}, riskierst du {{n:ex.bet.pot}}, um {{n:ex.pot}} + {{n:ex.bet.pot}} zu gewinnen. Bei diesem Anteil an {{t:bluff|Bluffs}} gleicht sich beides aus." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Die Pik sind nicht gekommen. Am River {{t:check|checkst}} du, und der Button {{t:bet|setzt}} den ganzen {{t:pot|Pot}}. Du hast {{t:top-pair|Top Pair}} mit einer Zehn als Kicker. Mit welcher dieser beiden Hände ist ein {{t:call}} besser?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Ohne Pik blockst du keine verpassten {{t:flush-draw|Flush-Draws}}, also die wichtigsten {{t:bluff|Bluffs}} des Buttons (z. B. Zehn-Bube in Pik). In seiner {{t:range|Range}} bleiben mehr {{t:bluff|Bluffs}}, gegen die du gewinnst." }
      - { text: "[[Kc Ts]]", why: "Die Pik-Zehn nimmt dem Button einen Teil der verpassten {{t:draw|Draws}}, mit denen er {{t:bluff|blufft}} (z. B. Bube-Zehn in Pik). Ihm bleibt relativ mehr Value, also ist ein {{t:call}} schlechter." }
      - { text: "Kein Unterschied", why: "Die Stärke beim Showdown ist gleich, aber das Pik in deiner Hand blockt {{t:bluff|Bluffs}} des Buttons. Das ändert, wogegen du wirklich spielst." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Am River kam das dritte Herz. Du {{t:check|checkst}}, und der Button {{t:bet|setzt}} den ganzen {{t:pot|Pot}}. Du hast ein {{t:pair|Paar}} Neunen. Mit welcher dieser beiden Hände ist ein {{t:call}} besser?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "Das Herz-Ass blockt den {{t:flush|Flush}} mit Ass, eine der stärksten {{t:value|Value}}-Hände des Buttons. Wenn du seinen Value blockst, bleiben unter seinen Bets mehr {{t:bluff|Bluffs}}." }
      - { text: "[[Ad 9c]]", why: "Dasselbe {{t:pair|Paar}}, aber du blockst keinen {{t:flush|Flush}}. Der Button hat alle seine Flushes, gegen die du verlierst." }
      - { text: "Kein Unterschied", why: "Beim Showdown sind beide Hände gleich stark, aber das Herz-Ass nimmt dem Button einen Teil seiner {{t:value|Value}}-Hände." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Die Pik sind nicht gekommen. Am River {{t:check|checkst}} du, und der Button {{t:bet|setzt}} einen halben {{t:pot|Pot}}. Was machst du?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Du hast nur eine Sieben als höchste Karte. Du verlierst sogar gegen die meisten {{t:bluff|Bluffs}} des Buttons (Dame mit Pik, Bube mit Pik), also ist das kein Bluff-Catcher. Du verteidigst mit anderen Händen." }
      - { text: "Ich {{t:call|calle}}, weil der Preis gut ist", why: "Der Preis ({{n:eq.bet-half}}) hilft keiner Hand, die gegen fast alles verliert, sogar gegen {{t:bluff|Bluffs}}." }
      - { text: "Ich {{t:raise|raise}} als {{t:bluff}}", why: "Ein {{t:raise|Raise}} als {{t:bluff}} am River ist ein fortgeschrittener und riskanter Spielzug. Einfacher und besser ist es, eine chancenlose Hand wegzuwerfen." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. Dein Gegner {{t:bet|setzt}} einen halben {{t:pot|Pot}}. Die {{t:mdf}} beträgt {{n:mdf.bet-half}}. Welche Hände verteidigst du zuerst?"
    options:
      - { text: "Die besten Bluff-Catcher: Sie gewinnen gegen {{t:bluff|Bluffs}} und haben gute {{t:blocker|Blocker}}", correct: true, why: "Du verteidigst Hände, die gegen {{t:bluff|Bluffs}} gewinnen, und unter Händen ähnlicher Stärke wählst du die, die den Value des Gegners blocken und seine {{t:bluff|Bluffs}} nicht blocken. Du {{t:fold|foldest}} Hände, die sogar gegen {{t:bluff|Bluffs}} verlieren." }
      - { text: "Zufällige {{n:mdf.bet-half}} der {{t:range|Range}}", why: "Die {{t:mdf}} sagt, wie viel du verteidigst, nicht womit. Eine zufällige Verteidigung zahlt mit Händen, die nie gewinnen." }
      - { text: "Nur {{t:value|Value}}-Hände", why: "Dann verteidigst du zu wenig, und dein Gegner verdient Geld, indem er mit beliebigen Karten {{t:bluff|blufft}}. Bis zur {{t:mdf}} füllst du mit den besten Bluff-Catchern auf." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Warum {{t:call|callst}} du mit einem Bluff-Catcher am River, statt zu {{t:raise|raisen}}?"
    options:
      - { text: "Weil nach einem {{t:raise|Raise}} die {{t:bluff|Bluffs}} {{t:fold|folden}} und nur bessere Hände zahlen", correct: true, why: "Deine Hand gewinnt nur gegen {{t:bluff|Bluffs}}. Ein {{t:raise|Raise}} drängt genau diese Hände hinaus und lässt die übrig, gegen die du verlierst." }
      - { text: "Weil {{t:raise|Raisen}} am River nicht erlaubt ist", why: "Es ist erlaubt. Nur macht ein {{t:raise}} deinen Bluff-Catcher zu einem {{t:bluff|Bluff}} gegen Hände, die nicht {{t:fold|folden}}." }
      - { text: "Weil ein {{t:call}} immer billiger ist", why: "Es geht nicht um die Kosten, sondern darum, wer im Spiel bleibt. Nach einem {{t:raise|Raise}} bleiben die Hände, die dich schlagen." }
---
Jetzt sitzt du auf der anderen Seite: Dein Gegner setzt am River, und du hast eine mittelstarke Hand. Meistens ist das ein **Bluff-Catcher**, also eine Hand, die gegen jede {{t:value|Value}}-Hand des Gegners verliert, aber gegen seine {{t:bluff|Bluffs}} gewinnt.

## Deine Equity sind seine {{t:bluff|Bluffs}}

Ein Bluff-Catcher gewinnt genau dann, wenn dein Gegner {{t:bluff|blufft}}. Seine Equity ist also der Anteil der {{t:bluff|Bluffs}} an den Bets des Gegners. Du {{t:call|callst}}, wenn dieser Anteil größer ist als die benötigte Equity aus M2:

| Bet des Gegners | Benötigte Equity (mindestens so viele {{t:bluff|Bluffs}}) |
|---|---|
| 1/3 {{t:pot|Pot}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|Pot}} | {{n:eq.bet-half}} |
| Ganzer {{t:pot}} | {{n:eq.bet-pot}} |

Wenn dein Gegner genau im Verhältnis aus der vorigen Lektion {{t:bluff|blufft}} ({{n:bluff.share.bet-pot}} bei einer Bet über den ganzen {{t:pot|Pot}}), kommt ein {{t:call}} auf null heraus. {{t:bluff|Blufft}} er öfter, {{t:call|callst}} du; seltener, {{t:fold|foldest}} du. Die Zahlen gelten ohne Rake; Rake erhöht die benötigte Equity etwas.

## Wie viel verteidigen und womit

Wie viel du verteidigst, sagt dir die {{t:mdf}} aus M6: gegen eine Bet über einen halben {{t:pot|Pot}} etwa **{{n:mdf.bet-half}}** deiner {{t:range|Range}}. Diese Lektion beantwortet die zweite Frage: **mit welchen Händen**. Du {{t:call|callst}} mit den besten Bluff-Catchern: Unter Händen ähnlicher Stärke wählst du die mit besseren {{t:blocker|Blockern}}; du {{t:fold|foldest}} Hände, die sogar gegen {{t:bluff|Bluffs}} verlieren.

Ein besserer Bluff-Catcher:

- gewinnt gegen mehr {{t:bluff|Bluffs}} (ein {{t:pair}} ist besser als nur eine hohe Karte),
- blockt die {{t:value|Value}}-Hände des Gegners,
- blockt seine {{t:bluff|Bluffs}} nicht.

## {{t:blocker|Blocker}} beim {{t:call|Callen}}

Das ist das Spiegelbild der vorigen Lektion. Wenn die Pik nicht gekommen sind, {{t:bluff|blufft}} dein Gegner mit verpassten {{t:flush-draw|Flush-Draws}}. Ein Pik in deiner Hand nimmt ihm einen Teil seiner {{t:bluff|Bluffs}}, also ist ein {{t:call}} schlechter. Wenn der {{t:flush}} angekommen ist, nimmt ihm das Ass dieser Farbe in deiner Hand die stärksten Flushes, also ist ein {{t:call}} besser.

## Raise nicht mit einem Bluff-Catcher

Nach einem {{t:raise|Raise}} {{t:fold|folden}} die {{t:bluff|Bluffs}}, und es zahlen nur Hände, die dich schlagen. Mit einem Bluff-Catcher {{t:call|callst}} oder {{t:fold|foldest}} du.

:::note Wenn dein Gegner selten {{t:bluff|blufft}}
Diese Regeln setzen einen Gegner voraus, der ungefähr im Gleichgewicht {{t:bluff|blufft}}. Gegen einen Spieler, der mit einer großen Bet am River selten {{t:bluff|blufft}}, {{t:fold|foldest}} du öfter, als die {{t:mdf}} angibt: Wenn es weniger {{t:bluff|Bluffs}} gibt, als der Preis verlangt, verliert ein {{t:call}} (die Rechnung aus dieser Lektion). Die Regeln zur Auswahl von Bluff-Catchern nach {{t:blocker|Blockern}} stammen aus Trainingsmaterialien und Solver-Analysen (Spiel am River, {{t:blocker|Blocker}}): Unter Bluff-Catchern (Händen, die ohnehin nur gegen {{t:bluff|Bluffs}} gewinnen) wählt der Solver seine {{t:call|Calls}} eher nach {{t:blocker|Blockern}} als nach der reinen Handstärke.
:::
