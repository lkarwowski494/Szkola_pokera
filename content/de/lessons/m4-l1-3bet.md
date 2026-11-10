---
id: m4.l1
module: m4
order: 1
title: "Wenn jemand vor dir eröffnet hat"
sub: "Fold, Call oder 3-Bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "Der {{t:cutoff|CO}} hat auf {{n:pf.open-size}} {{t:open|eröffnet}}. Du willst vom Button {{t:raise|raisen}}. Auf wie viel?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "Auf {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|In Position}} {{t:raise|raist}} du auf etwa {{n:pf.3bet.size-ip}} der {{t:open|Eröffnung}}. Das ist der Standard, der auf dem Flop ein gutes Verhältnis von Stack zu {{t:pot|Pot}} lässt." }
      - { text: "Auf {{n:pf.3bet.too-small}}", why: "Zu klein: Dein Gegner bekommt einen sehr guten Preis, um mit fast allem zu {{t:call|callen}} und weiterzuspielen." }
      - { text: "Auf {{n:pf.3bet.too-big}}", why: "Zu groß für das Spiel {{t:in-position}}: Du riskierst mehr, und die besseren Hände des Gegners {{t:fold|folden}} trotzdem nicht." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "Der Button hat auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:small-blind}} hat {{t:fold|gefoldet}}. Du willst aus dem {{t:big-blind|Big Blind}} {{t:raise|raisen}}. Auf wie viel?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "Auf {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Ohne Position}} {{t:raise|raist}} du auf etwa {{n:pf.3bet.size-oop}} der {{t:open|Eröffnung}}. Die größere Size nimmt dem Button den billigen {{t:call|Call}} {{t:in-position}}." }
      - { text: "Auf {{n:pf.3bet.ip-total}}", why: "Das ist die Size für einen Spieler {{t:in-position}}. {{t:out-of-position|Ohne Position}} gibst du dem Gegner einen zu guten Preis." }
      - { text: "Ich {{t:call|calle}} nur", why: "Mit KK willst du den {{t:pot|Pot}} sofort aufbauen: Das ist die zweitbeste Hand preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "Der Button hat auf {{n:pf.open-size}} {{t:open|eröffnet}}. Du sitzt im {{t:small-blind|Small Blind}}. Welcher Plan ist Standard?"
    table: { position: SB }
    options:
      - { text: "Ich {{t:raise|raise}} oder {{t:fold|folde}}", correct: true, why: "Nach einem {{t:call|Call}} spielst du {{t:out-of-position}}, und hinter dir sitzt noch der {{t:big-blind}}. Aus dem {{t:small-blind|Small Blind}} gegen späte {{t:open|Eröffnungen}} {{t:raise|raisen}} oder {{t:fold|folden}} Solver fast immer." }
      - { text: "Ich {{t:call|calle}} weit, weil ich schon einen halben Blind im {{t:pot|Pot}} habe", why: "Ein halber Blind ist wenig. Ein {{t:call|Call}} {{t:out-of-position}} mit dem {{t:big-blind|Big Blind}} im Rücken bringt eine schwache {{t:equity-realization|Equity-Realisierung}}: Du gewinnst einen kleineren Teil des {{t:pot|Pots}}, als die Equity der Hand anzeigt, weil du oft vor dem Showdown {{t:fold|foldest}}." }
      - { text: "Ich {{t:fold|folde}} immer", why: "Zu tight: Der Button {{t:open|eröffnet}} sehr weit, also lohnt es sich, mit starken Händen und einem Teil der {{t:bluff|Bluffs}} zu {{t:raise|raisen}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Du sitzt im {{t:big-blind|Big Blind}} gegen eine {{t:open|Eröffnung}} vom Button. Welche dieser Hände ist eine typische 3-Bet als {{t:bluff}}?"
    table: { position: BB }
    options:
      - { text: "A5 suited", correct: true, why: "Sie blockt AA und AK des Gegners und hat nach einem {{t:call|Call}} Chancen auf einen {{t:flush}} und eine {{t:straight|Straße}}. Das ist ein typischer {{t:bluff}} aus dem unteren Teil der {{t:range|Range}}, mit der du {{t:call|callst}}: Aus dem {{t:big-blind|Big Blind}} 3-bettest du die stärksten Hände plus solche {{t:bluff|Bluffs}}." }
      - { text: "K7 offsuit", why: "Mit dieser Hand verteidigst du per {{t:call|Call}}. Als 3-Bet blockt sie nichts Wichtiges und spielt schlecht, wenn der Gegner {{t:call|callt}}." }
      - { text: "{{t:pair|Paar}} 22", why: "Die kleinsten {{t:pair|Paare}} verteidigen per {{t:call|Call}}: Sie verdienen, wenn sie ein Set treffen (einen {{t:three-of-a-kind|Drilling}} mit einem {{t:pocket-pair|Pocket Pair}}, also einem {{t:pair|Paar}} aus deinen zwei {{t:hole-cards|Hole Cards}}), und eine 3-Bet mit ihnen verträgt eine 4-Bet schlecht." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
Wenn jemand vor dir {{t:open|eröffnet}} hat, hast du drei Möglichkeiten: Du {{t:fold|foldest}}, {{t:call|callst}} oder {{t:raise|raist}} noch einmal. Der erneute {{t:raise|Raise}} heißt 3-Bet, weil er die dritte {{t:bet|Bet}} in der Hand ist (Blind, {{t:open|Eröffnung}}, {{t:raise|Raise}}).

## Größe der 3-Bet

{{t:in-position|In Position}} {{t:raise|raist}} du auf etwa {{n:pf.3bet.size-ip}} der {{t:open|Eröffnung}}, also bei einer {{t:open|Eröffnung}} auf {{n:pf.open-size}} auf {{n:pf.3bet.ip-total}}. {{t:out-of-position|Ohne Position}}, zum Beispiel aus den Blinds gegen eine {{t:open|Eröffnung}} vom {{t:cutoff|CO}} oder Button, gehst du auf etwa {{n:pf.3bet.size-oop}} der {{t:open|Eröffnung}}, also {{n:pf.3bet.oop-total}}. Die größere Size {{t:out-of-position}} nimmt dem Gegner den billigen {{t:call|Call}}, mit dem er danach mit dem Vorteil der {{t:position|Position}} spielen würde.

## Die {{t:position|Position}} entscheidet, ob du {{t:call|callst}}

Laut veröffentlichten Solver-Lösungen 3-bettet der Button gegen eine {{t:open|Eröffnung}} vom {{t:cutoff|CO}} meist etwa {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} der Hände und {{t:call|callt}} nur etwa {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Gegen eine {{t:open|Eröffnung}} von {{t:utg|UTG}} (in dieser Lösung eine minimale, auf {{n:pf.open-size.solver-utg}}) gibt es schon etwas mehr {{t:call|Calls}} als 3-Bets: etwa {{n:pf.call-freq.btn-vs-utg}} gegenüber {{n:pf.3bet-freq.btn-vs-utg}}. Die {{t:range|Range}} von {{t:utg|UTG}} ist stark, also bekommt eine 3-Bet häufiger eine 4-Bet und gewinnt seltener sofort den {{t:pot|Pot}}.

```range
vs-open.btn-vs-co
```

Das Raster zeigt nur, welche Hände der Button spielt (per 3-Bet oder {{t:call|Call}}) und welche er {{t:fold|foldet}}. Die Aufteilung zwischen 3-Bet und {{t:call|Call}} lernst du aus den Zahlen oben: Der Solver der App {{t:call|callt}} in diesem Spot fast nie, deshalb bildet er diese Aufteilung nicht ab. Bei gut einem Dutzend Händen, z. B. A8s, 98s und 44, spielt der Solver der App anders als die veröffentlichten Lösungen, deshalb werden sie in den Übungen nicht bewertet.

Aus dem {{t:small-blind|Small Blind}} {{t:raise|raist}} oder {{t:fold|foldest}} du fast immer. Ein {{t:call|Call}} bedeutet Spiel {{t:out-of-position}}, und der {{t:big-blind}} hinter dir kann noch {{t:raise|raisen}}. {{t:out-of-position|Ohne Position}} hat eine Hand eine schlechtere **{{t:equity-realization|Equity-Realisierung}}**: Sie gewinnt einen kleineren Teil des {{t:pot|Pots}}, als ihre Equity anzeigt, weil du öfter vor dem Showdown {{t:fold|foldest}} und den {{t:pot|Pot}} schwerer mit einer {{t:bet|Bet}} gewinnst.

```range
vs-open.sb-vs-btn
```

Laut der veröffentlichten Solver-Lösung {{t:call|callt}} der {{t:small-blind}} gegen den Button fast nichts: Er 3-bettet etwa {{n:pf.3bet-freq.sb-vs-btn}} der Hände, den oberen Teil seiner {{t:range|Range}} (u. a. 77+, AJo+, KQo, A5s, A4s, T9s), und {{t:fold|foldet}} den Rest. Der Solver der App 3-bettet hier {{n:solver.3bet.sb-vs-btn}} der Hände, darunter die {{t:pair|Paare}} 55 und 66, die auch die veröffentlichte Lösung oft 3-bettet; seine wenigen {{t:call|Calls}} zählt das Raster als {{t:fold|Folds}}. Bei einigen Händen, z. B. ATo, T9s und A4s, spielt der Solver der App anders als die veröffentlichten Lösungen, deshalb werden sie in den Übungen nicht bewertet.

## {{t:linear|Lineare}} oder {{t:polarized|polarisierte}} {{t:range|Range}}

Mit {{t:position|Position}} gegen eine {{t:open|Eröffnung}} vom {{t:cutoff|CO}} 3-bettest du vor allem die besten Hände von oben und nimmst ein paar {{t:bluff|Bluffs}} mit suited Assen dazu (A5s, A4s), während du mittlere Hände (z. B. 77–99, AJs, ATs, suited {{t:connectors|Connectors}}) gemischt spielst: Einen Teil 3-bettest du, mit einem Teil {{t:call|callst}} du. Der Gegner {{t:call|callt}} oft, also willst du eine Hand, die nach einem {{t:call|Call}} gut im {{t:pot|Pot}} spielt. Quellen nennen eine solche {{t:range|Range}} unterschiedlich: manche {{t:linear|linear}} (von den stärksten Händen abwärts aufgebaut), andere {{t:polarized|polarisiert}} (hauptsächlich bestehend aus sehr starken Händen und {{t:bluff|Bluffs}}, fast ohne mittlere); wichtiger ist, welche Hände du 3-bettest und mit welchen du {{t:call|callst}}.

Aus dem {{t:big-blind|Big Blind}} gegen den Button 3-bettest du die stärksten Hände (TT+, AQ+, AJs+) plus {{t:bluff|Bluffs}} aus dem unteren Teil der {{t:range|Range}}, mit der du {{t:call|callst}}: A5s, manchmal A4s, und suited {{t:connectors|Connectors}}. Suited Asse blocken AA und AK des Gegners, und wenn sie einen {{t:call|Call}} bekommen, können sie noch einen {{t:flush}} oder eine {{t:straight|Straße}} treffen. Mit mittleren und kleinen {{t:pair|Paaren}}, KQo sowie offsuit Assen (AJo–A9o) {{t:call|callst}} du meist nur: Aus dem {{t:big-blind|Big Blind}} kommst du billig rein und schließt die Action, deshalb verdienen diese Hände nach einem {{t:call|Call}} mehr. Die Zusammensetzung hängt vom {{t:rake|Rake}} und von der Größe der 3-Bet ab, deshalb werden 99, KQo und AJo unterschiedlich gespielt. Gegen eine {{t:open|Eröffnung}} aus dem {{t:small-blind|Small Blind}} 3-bettest du vor allem {{t:value|für Value}} (TT+, AJs+, einen Teil von AQo und KQ), und mit A5s und suited {{t:connectors|Connectors}} {{t:call|callst}} du meist.

Aus dem {{t:small-blind|Small Blind}} spielst du anders: 3-Bet oder {{t:fold|Fold}}, mit dem oberen Teil deiner {{t:range|Range}} in der 3-Bet.

:::note Woher diese Regeln kommen
Die Raster für den Button und den {{t:small-blind|Small Blind}} stammen vom Solver der App und stimmen ungefähr mit den Quellen überein (im {{t:small-blind|Small Blind}} bis auf einige Hände, die in den Übungen nicht bewertet werden). Wie du aus dem {{t:big-blind|Big Blind}} 3-bettest, lehrt eine Regel, die auf veröffentlichten Ergebnissen anderer Solver aus mehreren unabhängigen Quellen beruht: Die Zusammensetzung der 3-Bets aus dem {{t:big-blind|Big Blind}} im Solver der App weicht davon ab.
:::
