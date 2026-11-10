---
id: m10.l3
module: m10
order: 3
title: "Abweichen von der Basis"
sub: "Mit welchen Händen und wie weit"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Du weißt, dass der Gegner in dieser Linie etwas öfter {{t:bluff|blufft}} als im Gleichgewicht. Mit welchen Händen änderst du deine Entscheidung zuerst?"
    options:
      - { text: "Mit Händen, die in der Basis {{t:call}} und {{t:fold}} mischen: Jetzt {{t:call|callst}} du immer", correct: true, why: "Im Gleichgewicht sind diese Hände indifferent, weil der Gegner genau so viele {{t:bluff|Bluffs}} hat wie nötig. Schon ein kleiner Überschuss an {{t:bluff|Bluffs}} sorgt dafür, dass {{t:call}} mehr verdient als {{t:fold}}." }
      - { text: "Mit den schwächsten Händen, die in der Basis immer {{t:fold|folden}}", why: "Diese Hände verlieren sogar gegen einen Teil der {{t:bluff|Bluffs}} oder brauchen einen viel größeren Überschuss. Sie ändern sich erst, wenn der Gegner stark vom Gleichgewicht abweicht." }
      - { text: "Mit den stärksten Händen: Jetzt {{t:raise|raist}} du sie", why: "Die stärksten Hände spielst du ohnehin weiter. Die Änderung beginnt bei Händen an der Grenze der Entscheidung." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "In einem veröffentlichten Solver-Beispiel {{t:bluff|blufft}} der Gegner am River mit etwa {{n:overbluff.lock}} statt etwa {{n:overbluff.base}} seiner Bets. Wie ändert sich deine Antwort auf seine Bet mit Händen, die {{t:bluff|Bluffs}} fangen?"
    options:
      - { text: "Du hörst auf zu {{t:fold|folden}}: Hände, die in der Basis gemischt haben, {{t:call|callen}} jetzt immer", correct: true, why: "Das reichte, damit die Verteidigung in der Lösung mit fixierter Strategie des Gegners auf reines {{t:call|Callen}} umschaltete. Indifferente Hände reagieren auf den kleinsten Überschuss an {{t:bluff|Bluffs}}." }
      - { text: "Fast gar nicht: Ein paar Punkte sind zu wenig, um etwas zu ändern", why: "Für indifferente Hände sind ein paar Punkte viel: Im Gleichgewicht bringen ihnen {{t:call}} und {{t:fold}} dasselbe, also entscheidet jeder Überschuss an {{t:bluff|Bluffs}} zugunsten des {{t:call|Callens}}." }
      - { text: "Du fängst an, mit Händen, die {{t:bluff|Bluffs}} fangen, zu {{t:raise|raisen}}", why: "Ein {{t:raise|Raise}} vertreibt die {{t:bluff|Bluffs}} des Gegners, und bessere Hände {{t:call|callen}}. Eine Hand, die {{t:bluff|Bluffs}} fängt, verdient am {{t:call|Callen}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Du weißt, dass der Gegner in einer bestimmten Linie seltener {{t:bluff|blufft}} als im Gleichgewicht. Was machst du mit einer Hand, die {{t:bluff|Bluffs}} fängt und in der Basis manchmal {{t:call|callt}} und manchmal {{t:fold|foldet}}?"
    options:
      - { text: "Ich {{t:fold|folde}} immer", correct: true, why: "Wenn es weniger {{t:bluff|Bluffs}} gibt, als das Gleichgewicht verlangt, verlieren indifferente Hände beim {{t:call|Callen}}. Ergebnis des Solvers: Bei zu wenigen {{t:bluff|Bluffs}} {{t:fold|foldest}} du immer." }
      - { text: "Ich {{t:call|calle}} immer, damit der Gegner mich nicht mit {{t:bluff|Bluffs}} ausnutzt", why: "Ein Gegner, der zu selten {{t:bluff|blufft}}, kann dein {{t:fold|Folden}} nicht ausnutzen. Du nutzt seinen Fehler aus, indem du {{t:fold|foldest}}." }
      - { text: "Ich spiele wie in der Basis, halb und halb", why: "Mischen ergibt nur Sinn, wenn beide Entscheidungen dasselbe bringen. Bei zu wenigen {{t:bluff|Bluffs}} bringt {{t:fold}} mehr." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "Du {{t:bet|setzt}} eine C-Bet von {{n:cbet.ex.small}} in einen {{t:pot}} von {{n:ex.pot}}, ganz ohne Hand. Wie oft muss der Gegner {{t:fold|folden}}, damit dieser {{t:bluff}} break-even ist? Gib einen Prozentwert ein."
    answer: alpha.cbet.small
    explanation: "Die Schwelle ist Bet ÷ ({{t:pot}} + Bet) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Ein Gegner mit Fold to C-Bet deutlich über dieser Zahl {{t:fold|foldet}} so oft, dass eine C-Bet sogar ohne Hand verdient."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "Der Gegner hat Fold to C-Bet von {{n:hud.ex.fcb.high}} nach {{n:hud.ex.reg.hands}} Händen. Auf einem {{t:dry|trockenen}} Flop hast du nichts getroffen. Lohnt sich eine C-Bet von 1/3 {{t:pot}} ohne Hand?"
    options:
      - { text: "Ja: Der Gegner {{t:fold|foldet}} öfter als {{n:alpha.cbet.small}}, also verdient die C-Bet sofort", correct: true, why: "Eine C-Bet von 1/3 {{t:pot}} ist bei {{n:alpha.cbet.small}} {{t:fold|Folds}} break-even. Der Gegner {{t:fold|foldet}} viel öfter, also verdient die C-Bet, bevor du die Equity deiner Hand mitrechnest. Fold to C-Bet fasst alle Größen und Tische zusammen, es ist also eine Näherung." }
      - { text: "Nein: Ohne Hand bettest du nicht", why: "Ein {{t:bluff}} braucht keine Hand, er braucht {{t:fold|Folds}}. Wenn der Gegner öfter {{t:fold|foldet}} als {{n:alpha.cbet.small}}, verdient die C-Bet mit jeder Hand." }
      - { text: "Nur mit einer großen Bet, weil eine kleine keine Hände vertreibt", why: "Eine größere Bet braucht mehr {{t:fold|Folds}}: bei 3/4 {{t:pot}} ganze {{n:alpha.cbet.big}}. Wenn der Gegner ohnehin oft {{t:fold|foldet}}, schafft das eine kleine C-Bet günstiger." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "Der Gegner hat Fold to C-Bet von {{n:hud.ex.fcb.low}} nach {{n:hud.ex.reg.hands}} Händen. Du hast den Flop verpasst und hast keinen {{t:draw}}. Du überlegst eine C-Bet von 3/4 {{t:pot}}. Was machst du?"
    options:
      - { text: "Ich {{t:check|checke}}: Dieser Gegner {{t:fold|foldet}} seltener, als eine große C-Bet braucht", correct: true, why: "Eine C-Bet von 3/4 {{t:pot}} ist erst bei {{n:alpha.cbet.big}} {{t:fold|Folds}} break-even, und der Gegner {{t:fold|foldet}} in {{n:hud.ex.fcb.low}} der Fälle. Ohne Hand und ohne Outs verliert so ein {{t:bluff}}." }
      - { text: "Ich bette, weil eine C-Bet Standard ist", why: "Eine C-Bet ohne Hand ist nur gut, wenn der Gegner oft genug {{t:fold|foldet}} oder wenn die Hand Equity hat. Hier gibt es weder das eine noch das andere." }
      - { text: "Ich gehe All-in, um einen {{t:fold}} zu erzwingen", why: "Je größer die Bet, desto mehr {{t:fold|Folds}} braucht sie. Ein Gegner, der selten {{t:fold|foldet}}, {{t:fold|foldet}} nicht öfter, nur weil du mehr {{t:bet|gesetzt}} hast." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "Ein {{t:recreational|Freizeitspieler}} mit Fold to 3-Bet von {{n:mda.rec.f3b}} {{t:open|opent}} aus dem {{t:cutoff}}. Du sitzt am Button. In der Basis {{t:call|callt}} KJs manchmal, und A5s ist manchmal ein 3-Bet-{{t:bluff}}. Wie spielst du gegen diesen Spieler?"
    options:
      - { text: "Ich 3-bette KJs {{t:value|auf Value}}, und A5s 3-bette ich nicht als {{t:bluff}}", correct: true, why: "Ein Spieler, der selten auf eine 3-Bet {{t:fold|foldet}}, {{t:call|callt}} oft mit schwächeren Händen, also verdienen stärkere Hände mit der 3-Bet. Ein 3-Bet-{{t:bluff}} verdient sofort erst bei mehr als {{n:alpha.vs-3bet-ip-size}} {{t:fold|Folds}}, und dieser Spieler {{t:fold|foldet}} in {{n:mda.rec.f3b}} der Fälle." }
      - { text: "Ich 3-bette A5s, weil ein {{t:bluff}} mit {{t:blocker}} eine gute 3-Bet ist", why: "In der Basis ja, gegen einen Gegner, der in etwa der Hälfte der Fälle {{t:fold|foldet}}. Dieser {{t:fold|foldet}} in {{n:mda.rec.f3b}}, also spielt der {{t:bluff}} fast immer einen großen {{t:pot}} mit einer schwachen Hand." }
      - { text: "Ich {{t:call|calle}} KJs nur, um den Gegner nicht zu verschrecken", why: "Gegen einen Spieler, der 3-Bets mit schwächeren Händen {{t:call|callt}}, baut eine 3-Bet mit KJs einen größeren {{t:pot}} mit der besseren Hand und mit {{t:position}}. Das ist besser als nur ein {{t:call}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Laut Populationsdaten aus Online-Mikrolimits (NL25) {{t:fold|folden}} {{t:regular|Regs}} auf eine 3-Bet in {{n:mda.reg.f3b}} der Fälle, {{t:recreational|Freizeitspieler}} in {{n:mda.rec.f3b}}. Eine 3-Bet in {{t:position}} auf {{n:pf.3bet.ip-total}} verdient ohne Hand bei mehr als {{n:alpha.vs-3bet-ip-size}} {{t:fold|Folds}}. Was folgt daraus?"
    options:
      - { text: "Gegen {{t:recreational|Freizeitspieler}} 3-bettest du fast ohne {{t:bluff|Bluffs}}, gegen {{t:regular|Regs}} bleiben {{t:bluff|Bluffs}}, aber nur mit Händen, die Equity haben", correct: true, why: "Keine Gruppe {{t:fold|foldet}} so oft, dass eine 3-Bet ohne Hand verdient. 3-Bet-{{t:bluff|Bluffs}} leben in der Basis von Equity nach dem Flop und von {{t:fold|Folds}}; gegen einen Spieler, der in {{n:mda.rec.f3b}} der Fälle {{t:fold|foldet}}, bleibt vor allem Equity, also 3-bettest du mit einer {{t:linear|linearen}} {{t:range}}." }
      - { text: "Du 3-bettest jeden mit jeder beliebigen Hand, weil alle viel {{t:fold|folden}}", why: "Niemand hier {{t:fold|foldet}} öfter als {{n:alpha.vs-3bet-ip-size}}. Eine 3-Bet mit jeder Hand würde verlieren." }
      - { text: "Gegen {{t:recreational|Freizeitspieler}} hörst du ganz auf zu 3-betten", why: "Im Gegenteil: Ein Spieler, der 3-Bets mit schwächeren Händen {{t:call|callt}}, zahlt deine starken Hände aus. Du änderst die Zusammensetzung der 3-Bet, du verzichtest nicht darauf." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Nach {{n:hud.ex.mid.hands}} Händen wirkt der Gegner loose und passiv, aber die Stichprobe ist klein. Wie weit weichst du von der Basis ab?"
    options:
      - { text: "Ein wenig, in Richtung des Reads und nur mit Grenzhänden", correct: true, why: "Die Richtung sieht man schon in einer kleinen Stichprobe, aber die Zahlen haben einen großen Fehler. Hände an der Grenze der Entscheidung verschiebst du in Richtung des Reads, den Rest spielst du wie in der Basis, bis die Stichprobe wächst." }
      - { text: "Voll: Ich spiele sofort maximal {{t:exploit|exploitativ}} gegen ihn", why: "Bei einer kleinen Stichprobe kann der Read falsch sein. Eine große Abweichung von der Basis ist selbst ausnutzbar: Die Basis ist die Strategie, die am wenigsten ausnutzbar ist." }
      - { text: "Gar nicht, solange ich keine tausend Hände habe", why: "Zu vorsichtig. Die Richtung des Reads bei {{n:hud.ex.mid.hands}} Händen sagt schon etwas aus, und Grenzhände kannst du günstig verschieben." }
---
Ein {{t:exploit|Exploit}} ersetzt die Basis nicht, sondern verschiebt sie. Zuerst weißt du, wie man im Gleichgewicht spielt (Module 3–9), dann siehst du in den Daten, in welche Richtung der Gegner davon abweicht, und verschiebst dein eigenes Spiel in dieselbe Richtung. Die Frage ist: mit welchen Händen und wie weit.

## Zuerst die {{t:mixed-hand|gemischten Hände}}

Im Gleichgewicht spielt ein Teil der Hände zwei Aktionen, z. B. manchmal {{t:call}} und manchmal {{t:fold}}. Das liegt daran, dass beide Aktionen dasselbe bringen: Der Gegner hat genau so viele {{t:bluff|Bluffs}}, dass die Hand indifferent ist. Genau diese Hände reagieren als Erste auf einen Fehler des Gegners:

- der Gegner {{t:bluff|blufft}} zu oft: {{t:mixed-hand|gemischte Hände}} {{t:call|callen}} immer;
- der Gegner {{t:bluff|blufft}} zu selten: {{t:mixed-hand|gemischte Hände}} {{t:fold|folden}} immer.

Es braucht nicht viel. In einem veröffentlichten Solver-Beispiel (der Button bettet am River nach der Linie Bet, {{t:check}}, Bet) hat eine Änderung der {{t:bluff|Bluffs}} des Gegners von etwa {{n:overbluff.base}} auf etwa {{n:overbluff.lock}} die Verteidigung des {{t:big-blind|Big Blinds}} auf reines {{t:call|Callen}} umgestellt. Hände, die in der Basis immer {{t:fold|folden}} oder immer weiterspielen, ändern ihre Entscheidung erst, wenn der Gegner stark vom Gleichgewicht abweicht.

## Der {{t:bluff}} nach Schwelle berechnet

Ob sich ein {{t:bluff}} ohne Hand lohnt, sagt dir {{t:alpha}} aus Modul 6:

```formula
Ein {{t:bluff}} verdient, wenn der Gegner öfter {{t:fold|foldet}} als: Bet ÷ (Pot + Bet)
```

Bei einer C-Bet von 1/3 {{t:pot}} sind das {{n:alpha.cbet.small}}, bei 3/4 {{t:pot}} {{n:alpha.cbet.big}}. Fold to C-Bet aus dem {{t:hud}} zeigt, ob der Gegner über oder unter dieser Schwelle liegt. Das ist eine Näherung: Die Statistik fasst alle Größen und Flops zusammen, und deine Hand hat meist noch etwas Equity. Auf einem Flop, der die {{t:range}} des Gegners trifft, {{t:fold|foldet}} er seltener als im Schnitt.

Spieler der Online-Mikrolimit-Population (NL25) {{t:fold|folden}} auf eine C-Bet am Flop im Schnitt in {{n:mda.all.fcb}} der Fälle. Das muss kein Fehler sein: Auch der Solver {{t:out-of-position}} {{t:fold|foldet}} am Flop öfter, als die {{t:mdf}} angibt (Modul 6). Deshalb rechtfertigt der Populationsschnitt über der Schwelle allein keine C-Bet ohne Hand; du brauchst einen Read auf den konkreten Gegner oder einen Flop, der seine {{t:range}} nicht trifft.

## 3-Bet gegen einen Spieler, der nicht {{t:fold|foldet}}

Eine 3-Bet in {{t:position}} auf {{n:pf.3bet.ip-total}} verdient ganz ohne Hand erst dann, wenn der Gegner öfter {{t:fold|foldet}} als {{n:alpha.vs-3bet-ip-size}} (Modul 4). Daten aus der Online-Mikrolimit-Population (NL25):

| Gruppe | Fold to 3-Bet |
|---|---|
| {{t:regular|Regs}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Freizeitspieler}} | {{n:mda.rec.f3b}} |

In der Basis leben 3-Bet-{{t:bluff|Bluffs}} von {{t:fold|Folds}} und von Equity nach dem Flop. Gegen einen Spieler, der in {{n:mda.rec.f3b}} der Fälle {{t:fold|foldet}}, gibt es kaum {{t:fold|Folds}}, dafür {{t:call|callt}} er mit schwächeren Händen. Deshalb 3-bettest du ihn mit einer {{t:linear|linearen}} {{t:range}}: mehr starke Hände {{t:value|auf Value}}, fast ohne {{t:bluff|Bluffs}}. Trainer in zwei Trainingsmaterialien setzen diese Grenze bei Fold to 3-Bet von etwa {{n:hud.f3b.low}}.

## Kleine Stichprobe, kleine Abweichung

Je kleiner die Stichprobe, desto größer der Fehler der Statistik (Lektion 1). Bei einer kleinen Stichprobe verschiebst du nur Grenzhände und nur in Richtung des Reads. Eine große Abweichung mit der ganzen {{t:range}} ergibt erst bei einer großen Stichprobe und einem deutlichen Fehler des Gegners Sinn. Das Abweichen von der Basis ist selbst ein Fehler, den ein guter Gegner ausnutzen kann.

:::note Quellen
Das Prinzip der {{t:mixed-hand|gemischten Hände}} stammt aus einer veröffentlichten Solver-Analyse mit fixierter Strategie des Gegners (eine Solver-Lösung, keine Populationsdaten). Die {{t:alpha}}-Schwellen sind Rechnung. Fold to 3-Bet und Fold to C-Bet der Population stammen aus einer öffentlichen Statistikdatenbank (ein großer Online-Pokerraum, NL25–NL100, {{n:mda.period.months}} Monate vor Oktober 2026). Die Grenze bei Fold to 3-Bet und das Prinzip „kleine Stichprobe, kleine Abweichung“ sind Empfehlungen aus zwei Trainingsmaterialien.
:::
