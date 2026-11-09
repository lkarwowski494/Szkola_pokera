---
id: m4.l2
module: m4
order: 2
title: "Den Big Blind verteidigen"
sub: "Preis für den Call und weite Verteidigung"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "Der Button hat auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:small-blind|Small Blind}} hat {{t:fold|gefoldet}}. Wie viel Prozent Equity brauchst du im {{t:big-blind|Big Blind}}, damit sich ein {{t:call|Call}} lohnt (ohne Berücksichtigung des Spiels nach dem Flop)? Gib eine Zahl ein."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Du zahlst {{n:bb.call.vs-btn}} in einen {{t:pot|Pot}} nach, der nach deinem {{t:call|Call}} {{n:bb.pot-after.vs-btn}} enthält: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} ergibt etwa {{n:eq.bb-vs-btn-open}}. Die Hälfte bräuchtest du nur, wenn im {{t:pot|Pot}} allein der {{t:bet|Einsatz}} des Gegners läge; die Blinds im {{t:pot|Pot}} verbessern den Preis."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "Der {{t:small-blind|Small Blind}} hat auf {{n:pf.open-size-sb}} {{t:open|eröffnet}}. Wie viel Equity brauchst du im {{t:big-blind|Big Blind}} für einen {{t:call|Call}}?"
    table: { position: BB }
    options:
      - { text: "Etwa {{n:eq.bb-vs-sb-open}}", correct: true, why: "Du zahlst {{n:bb.call.vs-sb}} in einen {{t:pot|Pot}} nach, der nach deinem {{t:call|Call}} {{n:bb.pot-after.vs-sb}} enthält: Das sind etwa {{n:eq.bb-vs-sb-open}}. Der Preis ist schlechter als gegen den Button, dafür hast du nach dem Flop {{t:position|Position}}." }
      - { text: "Etwa {{n:eq.bb-vs-btn-open}}", why: "Das ist der Preis gegen ein {{t:open|Open}} des Buttons auf {{n:pf.open-size}}. Der {{t:small-blind|Small Blind}} {{t:open|eröffnet}} größer, also zahlst du mehr." }
      - { text: "Etwa die Hälfte", why: "Die Hälfte der Equity bräuchtest du, wenn im {{t:pot|Pot}} nur der {{t:bet|Einsatz}} des Gegners läge. Hier liegen darin zusätzlich die Blinds, also ist der Preis besser." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Warum {{t:call|callst}} du im {{t:big-blind|Big Blind}} nicht mit jeder Hand, die etwa {{n:eq.bb-vs-btn-open}} Equity gegen die {{t:range|Range}} des Buttons hat?"
    table: { position: BB }
    options:
      - { text: "Weil du {{t:out-of-position|ohne Position}} nicht deine ganze Equity realisierst", correct: true, why: "Equity ist deine Chance, wenn die Hand ohne {{t:bet|Einsätze}} zu Ende gespielt wird. {{t:out-of-position|Ohne Position}} wirst du deine Hand oft vor dem Showdown {{t:fold|folden}}, deshalb realisieren schwache Offsuit-Hände weniger, als die Equity anzeigt." }
      - { text: "Weil der Button immer eine starke Hand hat", why: "Der Button {{t:open|eröffnet}} sehr weit, deshalb ist die Verteidigung im {{t:big-blind|BB}} weit." }
      - { text: "Weil du {{t:chips|Chips}} sparen musst", why: "Es zählt der {{t:expected-value|Erwartungswert}}, nicht das Sparen von {{t:chips|Chips}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "Der Button hat auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:small-blind|Small Blind}} hat {{t:fold|gefoldet}}. Du hast QQ im {{t:big-blind|Big Blind}}. Was machst du?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-Bet auf {{n:pf.3bet.oop-total}}", correct: true, why: "QQ ist eine {{t:value|Value}}-Hand. {{t:out-of-position|Ohne Position}} {{t:raise|raist}} du auf etwa {{n:pf.3bet.size-oop}} des {{t:open|Opens}}, damit der Button nicht billig {{t:in-position|in Position}} {{t:call|callt}}." }
      - { text: "3-Bet auf {{n:pf.3bet.ip-total}}", sizeError: true, why: "Gute Aktion, aber das ist die Größe für einen Spieler {{t:in-position|in Position}} ({{n:pf.3bet.size-ip}} des {{t:open|Opens}}). {{t:out-of-position|Ohne Position}} {{t:raise|raist}} du höher: auf {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Callen}}", why: "Du verlierst Wert: Mit QQ willst du den {{t:pot|Pot}} vor dem Flop aufbauen, statt einen kleinen {{t:pot|Pot}} {{t:out-of-position|ohne Position}} zu spielen." }
      - { text: "{{t:fold|Folden}}", why: "QQ gehört preflop zu den besten Händen. Ein {{t:fold|Fold}} ist ein großer Fehler." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "Der Button hat auf {{n:pf.open-size}} {{t:open|eröffnet}}, der {{t:small-blind|Small Blind}} hat {{t:fold|gefoldet}}. Markiere die Hände, mit denen du den {{t:big-blind|Big Blind}} verteidigst (per {{t:call|Call}} oder 3-Bet)."
---
Der {{t:big-blind|Big Blind}} hat schon einen ganzen Blind im {{t:pot|Pot}}, daher zahlt er gegen ein {{t:open|Open}} nur wenig nach. Wenn der Button auf {{n:pf.open-size}} {{t:open|eröffnet}} und der {{t:small-blind|Small Blind}} {{t:fold|foldet}}, brauchst du zum {{t:call|Callen}} nur etwa {{n:eq.bb-vs-btn-open}} Equity. Deshalb verteidigt der {{t:big-blind|Big Blind}} am weitesten von allen {{t:position|Positionen}}.

## Der Preis ist nicht alles

Equity sagt dir, wie oft du gewinnst, wenn ihr beide ohne weitere {{t:bet|Einsätze}} zum Showdown kommt. {{t:out-of-position|Ohne Position}} wirst du nach dem Flop oft {{t:fold|folden}}, deshalb realisieren schwache Offsuit-Hände weniger als ihre Equity. Gesuitete Hände, {{t:connectors|Connectors}} und mittlere {{t:pair|Paare}} realisieren mehr, deshalb verteidigst du mit ihnen im Raster eher.

```range
vs-open.bb-vs-btn
```

Veröffentlichte Solver-Lösungen verteidigen hier etwa {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} der Hände ({{t:call|Call}} und 3-Bet zusammen). Der Solver der App, aus dem das Raster stammt, verteidigt hier weiter als die veröffentlichten Lösungen.

## Gegen den {{t:small-blind|Small Blind}}

Der {{t:small-blind|Small Blind}} {{t:open|eröffnet}} größer, auf {{n:pf.open-size-sb}}, daher brauchst du zum {{t:call|Callen}} etwa {{n:eq.bb-vs-sb-open}} Equity. Der Preis ist schlechter, aber nach dem Flop hast du {{t:position|Position}}, daher verteidigst du trotzdem weit: mehr als die Hälfte der Hände.

```range
vs-open.bb-vs-sb
```

Eine veröffentlichte Solver-Lösung verteidigt hier etwa {{n:pf.bb-def.vs-sb.pub}} der Hände. Der Solver der App, aus dem das Raster stammt, verteidigt hier enger als die veröffentlichte Lösung.

:::note Wie du aus dem {{t:big-blind|Big Blind}} {{t:raise|raist}}
Die Raster zeigen, womit du verteidigst, nicht wie: 3-Bet und {{t:call|Call}} sind zusammengefasst, weil sich die Zusammensetzung der 3-Bets aus dem {{t:big-blind|Big Blind}} im Solver der App von veröffentlichten Ergebnissen anderer Solver unterscheidet. Gegen den Button beträgt eine 3-Bet aus dem {{t:big-blind|Big Blind}} etwa {{n:pf.3bet.size-oop}} des {{t:open|Opens}}. Du 3-bettest die stärksten Hände (TT+, AQ+, AJs+) plus {{t:bluff|Bluffs}} vom unteren Ende deiner {{t:range|Range}} zum {{t:call|Callen}}: A5s, manchmal A4s, und gesuitete {{t:connectors|Connectors}}. Mittlere und kleine {{t:pair|Paare}}, KQo und Offsuit-Asse {{t:call|callst}} du meist. Gegen den {{t:small-blind|Small Blind}} hast du {{t:position|Position}}, daher {{t:raise|raist}} du kleiner, auf etwa {{n:pf.3bet.size-ip}} des {{t:open|Opens}}. Dann 3-bettest du vor allem für {{t:value|Value}} (TT+, AJs+, einen Teil von AQo und KQ), und A5s sowie gesuitete {{t:connectors|Connectors}} {{t:call|callst}} du meist.
:::
