---
id: m10.l1
module: m10
order: 1
title: "HUD-Statistiken"
sub: "Was VPIP und PFR messen und wie viele Hände du brauchst"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Du sitzt im {{t:big-blind|Big Blind}}. Zwei Spieler limpen, du {{t:check|checkst}} und siehst den Flop. Erhöht diese Hand deinen {{t:vpip}}?"
    options:
      - { text: "Nein: Du hast keinen einzigen {{t:chips|Chip}} freiwillig gesetzt", correct: true, why: "{{t:vpip}} zählt nur freiwillige Einsätze vor dem Flop: einen {{t:call}} oder einen {{t:raise}}. Der {{t:big-blind|Big Blind}} ist ein Pflichteinsatz, und ein {{t:check}} kostet nichts." }
      - { text: "Ja: Du spielst den Flop, also zählt die Hand als gespielt", why: "Den Flop zu sehen reicht nicht. {{t:vpip}} steigt erst, wenn du selbst vor dem Flop {{t:chips|Chips}} setzt." }
      - { text: "Ja, und auch deinen {{t:pfr}}", why: "{{t:pfr}} steigt nur bei einem {{t:raise|Raise}} vor dem Flop. Hier hat niemand {{t:raise|geraist}}, und du hast nur {{t:check|gecheckt}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Ein Freund zeigt dir eine Notiz: Ein Gegner hat {{t:vpip}} {{n:hud.ex.wrong.vpip}} und {{t:pfr}} {{n:hud.ex.wrong.pfr}}. Was hältst du davon?"
    options:
      - { text: "Das ist unmöglich: {{t:pfr}} kann nicht höher sein als {{t:vpip}}", correct: true, why: "Jeder {{t:raise|Raise}} vor dem Flop ist auch ein freiwilliger Einsatz und zählt daher in beiden Statistiken. {{t:pfr}} ist immer höchstens so hoch wie {{t:vpip}}; dein Freund hat die Zahlen verwechselt." }
      - { text: "Das ist ein sehr aggressiver Spieler, der fast nie {{t:call|callt}}", why: "Ein Spieler, der nie {{t:call|callt}}, hat einen {{t:pfr}} gleich seinem {{t:vpip}}, aber nicht höher. Ein höherer {{t:pfr}} bedeutet einen Fehler im Eintrag." }
      - { text: "Das ist ein passiver Spieler", why: "Passivität erkennst du daran, dass {{t:pfr}} deutlich niedriger ist als {{t:vpip}}, nicht höher." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Ein Gegner hat {{t:vpip}} {{n:mda.rec.vpip}} und {{t:pfr}} {{n:mda.rec.pfr}}. Was macht er mit den Händen, die er spielt, aber nicht {{t:raise|raist}}?"
    options:
      - { text: "Er {{t:call|callt}} oder limpt: Das ist die Differenz von {{n:mda.rec.gap}} der Hände", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Diese Hände bringt er ohne {{t:raise|Raise}} in den {{t:pot|Pot}}: Er limpt oder {{t:call|callt}} die {{t:open|Eröffnungen}} anderer Spieler." }
      - { text: "Er {{t:fold|foldet}} sie vor dem Flop", why: "Vor dem Flop gefoldete Hände zählen überhaupt nicht zum {{t:vpip}}. Die Differenz {{t:vpip}} − {{t:pfr}} sind Hände, die ohne {{t:raise|Raise}} gespielt wurden." }
      - { text: "Er spielt sie {{t:all-in}}", why: "Ein All-in vor dem Flop ist auch ein {{t:raise|Raise}} und würde daher den {{t:pfr}} erhöhen. Die Differenz sind Hände, die nur {{t:call|gecallt}} oder gelimpt wurden." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Nach {{n:hud.se.ex.n}} Händen hat ein Gegner {{t:vpip}} {{n:hud.se.ex.p}}. Wie groß ist der Standardfehler dieser Zahl in Prozentpunkten? Gib eine Zahl ein."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Mit etwa {{n:var.conf95}} Sicherheit liegt der wahre {{t:vpip}} im Bereich ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Nach {{n:hud.se.ex.n}} Händen liegt der {{t:vpip}} eines Gegners bei {{n:hud.se.ex.p}}. Was weißt du über seinen wahren {{t:vpip}}?"
    options:
      - { text: "Mit etwa {{n:var.conf95}} Sicherheit liegt er zwischen {{n:hud.ci.ex.low}} und {{n:hud.ci.ex.high}}", correct: true, why: "Der Standardfehler beträgt etwa {{n:hud.se.ex}}, und das {{n:var.conf95}}-Intervall ist ± {{n:var.z95}} Fehler, also ± {{n:hud.ci.ex}}. Du weißt, dass der Gegner nicht extrem ist, kannst aber Typen, die nur wenige Punkte trennen, noch nicht unterscheiden." }
      - { text: "Er liegt genau bei {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} Hände sind immer noch eine kleine Stichprobe: Der Fehler beträgt etwa {{n:hud.se.ex}}, und das {{n:var.conf95}}-Intervall ist ± {{n:hud.ci.ex}}." }
      - { text: "Nichts: Vor tausend Händen haben Statistiken keine Bedeutung", why: "Übertrieben. Ein Intervall von {{n:hud.ci.ex.low}} bis {{n:hud.ci.ex.high}} schließt einen sehr tighten und einen sehr loosen Spieler schon aus. Es fehlt nur die Genauigkeit." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Nach einigen hundert Händen hatte ein Gegner {{n:hud.se.f3b.n}}-mal die Gelegenheit, auf eine 3-Bet zu reagieren, und hat in {{n:hud.se.f3b.p}} der Fälle {{t:fold|gefoldet}}. Was weißt du über seinen Fold to 3-Bet?"
    options:
      - { text: "Fast nichts: Mit etwa {{n:var.conf95}} Sicherheit liegt er zwischen {{n:hud.ci.f3b.low}} und {{n:hud.ci.f3b.high}}", correct: true, why: "Es zählen die Gelegenheiten, nicht die Hände. Der Fehler ist √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, und das {{n:var.conf95}}-Intervall ist ± {{n:hud.ci.f3b}}. In so ein Intervall passt sowohl ein Spieler, der fast immer verteidigt, als auch einer, der fast immer {{t:fold|foldet}}." }
      - { text: "Er {{t:fold|foldet}} in genau {{n:hud.se.f3b.p}} der Fälle, weil die Stichprobe einige hundert Hände umfasst", why: "Einige hundert Hände sind nur {{n:hud.se.f3b.n}} Gelegenheiten für diese Statistik. Den Fehler berechnest du aus den Gelegenheiten: Er liegt bei etwa {{n:hud.se.f3b}}." }
      - { text: "Er {{t:fold|foldet}} zu oft, denn über {{n:hud.f3b.low}} ist ein Fehler", why: "{{n:hud.se.f3b.p}} ist nicht „über {{n:hud.f3b.low}}“, und bei {{n:hud.se.f3b.n}} Gelegenheiten beträgt der Fehler etwa {{n:hud.se.f3b}}. Aus so einer Stichprobe kannst du keinen Schluss ziehen." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Ein neuer Gegner, {{n:hud.ex.few.hands}} Hände im {{t:hud|HUD}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. Wie spielst du gegen ihn?"
    options:
      - { text: "Wie gegen einen unbekannten Spieler, nach der Basis; ich sammle weitere Hände", correct: true, why: "Unter etwa {{n:hud.hands.random}} Händen sind Statistiken zufällig: Ein paar gute Karten hintereinander ergeben so einen {{t:vpip}}. Den Spielertyp erkennst du grob nach etwa {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} Händen, und {{t:vpip}} und {{t:pfr}} stabilisieren sich nach etwa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "Wie gegen einen {{t:maniac|Maniac}}: Ich {{t:call|calle}} weit", why: "Ein {{t:maniac|Maniac}}, also ein sehr looser und aggressiver Spieler, ist nur eine Möglichkeit: Nach {{n:hud.ex.few.hands}} Händen kann es jeder Typ sein. Weites {{t:call|Callen}} auf Basis von Zufall kostet dich, wenn sich der Gegner als gewöhnlicher {{t:regular|Reg}} herausstellt, also als Stammspieler, der ziemlich solide spielt." }
      - { text: "Wie gegen einen {{t:nit|Nit}}, weil die meisten Spieler Nits sind", why: "Das weißt du auch nicht: Ein {{t:nit}}, also ein sehr tighter Spieler, ist nur einer der Typen. Ohne Stichprobe gibt es keinen Read, also kehrst du zur Basis zurück." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Welche Statistik braucht die meisten Hände, um verlässlich zu sein?"
    options:
      - { text: "Fold to 3-Bet", correct: true, why: "Eine Gelegenheit für Fold to 3-Bet entsteht nur, wenn der Gegner {{t:open|eröffnet}} und eine 3-Bet bekommen hat, also selten. Deshalb brauchst du etwa {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} Hände statt {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "{{t:vpip}} hat in jeder Hand eine Gelegenheit und stabilisiert sich deshalb am schnellsten: nach etwa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} Händen." }
      - { text: "{{t:pfr}}", why: "{{t:pfr}} hat wie {{t:vpip}} in jeder Hand eine Gelegenheit, in der der Spieler {{t:raise|raisen}} kann, und stabilisiert sich daher schnell." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "Dein Pokerraum verbietet Programme mit {{t:hud|HUD}} am Tisch. Was machst du?"
    options:
      - { text: "Ich spiele ohne {{t:hud|HUD}} und schaue mir nach der {{t:session|Session}} meine Handdatenbank und meine Notizen zu Stammgegnern an", correct: true, why: "Die Regeln des Pokerraums sind verbindlich: Ein verbotenes Programm kann zur Schließung deines Kontos führen. Statistiken aus deiner eigenen Handhistorie kannst du dir nach dem Spiel ansehen, und manche Pokerräume zeigen am Tisch eigene Statistiken an." }
      - { text: "Ich nutze trotz des Verbots ein {{t:hud|HUD}}, weil es einen Vorteil bringt", why: "Für einen Regelverstoß kann der Pokerraum dein Konto schließen und dein Guthaben einbehalten. Der Vorteil ist das nicht wert." }
      - { text: "Ich verzichte auf {{t:exploit|Exploits}}, weil sie ohne {{t:hud|HUD}} unmöglich sind", why: "Sie sind möglich: Reads aus der Handanalyse nach der {{t:session|Session}} und Populationsdaten deines {{t:stakes|Limits}} zeigen ebenfalls, in welche Richtung du von der Basis abweichen solltest." }
---
Ein {{t:exploit|Exploit}} ist eine Abweichung von der Basis aus den Modulen 3–9 in Richtung des gegnerischen Fehlers. Um zu wissen, in welche Richtung du abweichen solltest, brauchst du Daten. Online liefert sie ein {{t:hud}}: ein Programm, das Hände aufzeichnet und die Statistiken jedes Gegners am Tisch anzeigt.

## {{t:vpip}} und {{t:pfr}}

Die zwei wichtigsten Zahlen beschreiben das Spiel vor dem Flop:

- **{{t:vpip}}**: in wie viel Prozent der Hände ein Spieler vor dem Flop freiwillig {{t:chips|Chips}} in den {{t:pot|Pot}} bringt, also {{t:call|callt}} oder {{t:raise|raist}}. Blinds zählen nicht, weil sie Pflicht sind.
- **{{t:pfr}}**: in wie viel Prozent der Hände ein Spieler vor dem Flop {{t:raise|raist}}: {{t:open|eröffnet}}, 3-bettet oder 4-bettet.

Jeder {{t:raise|Raise}} ist auch ein freiwilliger Einsatz, daher übersteigt {{t:pfr}} nie den {{t:vpip}}. Die Differenz {{t:vpip}} − {{t:pfr}} sind die Hände, die der Spieler nur {{t:call|gecallt}} oder gelimpt hat. Ein Spieler mit {{t:vpip}} {{n:mda.rec.vpip}} und {{t:pfr}} {{n:mda.rec.pfr}} spielt viele Hände, geht aber in {{n:mda.rec.gap}} aller Hände ohne {{t:raise|Raise}} in den {{t:pot|Pot}}.

## Weitere Statistiken

| Statistik | Was sie misst | Gelegenheit |
|---|---|---|
| 3-Bet | wie oft er die {{t:open|Eröffnung}} eines anderen {{t:raise|raist}} | jemand vor ihm hat {{t:open|eröffnet}} |
| Fold to 3-Bet | wie oft er auf eine 3-Bet {{t:fold|foldet}} | er hat {{t:open|eröffnet}} und eine 3-Bet bekommen |
| C-Bet | wie oft er nach seinem eigenen {{t:raise|Raise}} am Flop bettet | er war vor dem Flop der {{t:aggressor|Aggressor}} |
| Fold to C-Bet | wie oft er auf eine C-Bet {{t:fold|foldet}} | er hat eine C-Bet bekommen |
| {{t:wtsd}} | wie oft er nach dem Flop zum Showdown geht | er hat den Flop gesehen |

Die letzte Spalte ist wichtig: Eine Statistik ändert sich nur, wenn der Gegner eine Gelegenheit hat. {{t:vpip}} hat in jeder Hand eine Gelegenheit, Fold to 3-Bet nur, wenn der Gegner {{t:open|eröffnet}} und eine 3-Bet bekommen hat.

## Wie viele Hände du brauchst

Jede Hand ist eine zufällige Stichprobe aus der Strategie des Gegners, daher hat eine Statistik einen Fehler wie jeder Stichprobenmittelwert. Du berechnest ihn mit der Formel für den Fehler eines Stichprobenmittelwerts (in Modul 12 berechnest du mit derselben Formel den Fehler deiner {{t:winrate|Winrate}}):

```formula
Fehler = √(p × (1 − p) ÷ n)
{{n:var.conf95}}-Intervall = p ± {{n:var.z95}} × Fehler
```

Dabei ist p der Anteil (z. B. {{t:vpip}}) und n die Zahl der Gelegenheiten. Nach {{n:hud.se.ex.n}} Händen mit {{t:vpip}} {{n:hud.se.ex.p}} beträgt der Fehler etwa {{n:hud.se.ex}}, also liegt der wahre {{t:vpip}} mit etwa {{n:var.conf95}} Sicherheit zwischen **{{n:hud.ci.ex.low}} und {{n:hud.ci.ex.high}}**. Ein Fold to 3-Bet von {{n:hud.se.f3b.p}} bei {{n:hud.se.f3b.n}} Gelegenheiten ergibt ein Intervall von {{n:hud.ci.f3b.low}} bis {{n:hud.ci.f3b.high}}: fast nichts.

Trainer nennen ähnliche Schwellen:

- unter etwa {{n:hud.hands.random}} Händen sind Statistiken zufällig; du spielst wie gegen einen unbekannten Spieler;
- den Spielertyp erkennst du grob nach {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} Händen, und {{t:vpip}} und {{t:pfr}} stabilisieren sich nach etwa {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}};
- 3-Bet braucht etwa {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} Hände, Fold to 3-Bet etwa {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}, Statistiken vom Turn und River noch mehr.

:::note Wenn der Pokerraum ein {{t:hud|HUD}} verbietet
Manche Pokerräume (laut Trainingsmaterialien auch große Pokerräume auf niedrigen {{t:stakes|Limits}}) verbieten Programme mit {{t:hud|HUD}} am Tisch. Dann schaust du dir nach der {{t:session|Session}} deine eigene Handhistorie an, machst Notizen zu Stammgegnern und nutzt Populationsdaten deines {{t:stakes|Limits}} (Lektion 2). Die Schwellen für die Stichproben stammen aus zwei Trainingsmaterialien, die unterschiedliche Handzahlen nennen. Die Fehlerformel ist eine Rechnung.
:::
