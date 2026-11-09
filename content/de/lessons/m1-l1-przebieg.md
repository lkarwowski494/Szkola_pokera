---
id: m1.l1
module: m1
order: 1
title: "Ablauf einer Hand"
sub: "Blinds, Straßen und mögliche Aktionen"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "Es ist der Flop, und niemand vor dir hat {{t:bet|gesetzt}}. Was kannst du tun?"
    options:
      - { text: "{{t:check|Checken}} oder {{t:bet|setzen}}", correct: true, why: "Ohne {{t:bet|Einsatz}} vor dir hast du zwei Optionen: kostenlos weitergeben oder selbst {{t:bet|setzen}}." }
      - { text: "{{t:call|Mitgehen}}", why: "Es gibt nichts zum {{t:call|Mitgehen}}, weil niemand etwas {{t:bet|gesetzt}} hat." }
      - { text: "{{t:raise|Erhöhen}}", why: "{{t:raise|Erhöhen}} kannst du nur den {{t:bet|Einsatz}} eines anderen. Der erste {{t:bet|Einsatz}} in einer Runde heißt Bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Wie viele {{t:community-cards|Gemeinschaftskarten}} kommen auf dem Flop?"
    options:
      - { text: "3", correct: true, why: "Der Flop sind drei Karten auf einmal. Danach kommt am Turn und am River je eine dazu." }
      - { text: "1", why: "Turn und River kommen mit je einer Karte." }
      - { text: "5", why: "Fünf {{t:community-cards|Gemeinschaftskarten}} liegen erst am River." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "Dein Gegner hat 20 {{t:chips|Chips}} {{t:bet|gesetzt}}. Du hast eine schwache Hand und willst nicht weiterspielen. Was tust du?"
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Wenn es einen {{t:bet|Einsatz}} gibt und du nicht zahlen willst, {{t:fold|foldest}} du. Du verlierst nur, was du schon eingezahlt hast." }
      - { text: "Ich {{t:check|checke}}", why: "Ein Check ist nicht möglich, wenn ein {{t:bet|Einsatz}} zum {{t:call|Mitgehen}} offen ist." }
      - { text: "Ich {{t:call|gehe mit}}", why: "{{t:call|Mitgehen}} kostet 20 {{t:chips|Chips}}. Da du nicht spielen willst, ist das ein Verlust." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Welche {{t:betting-round|Setzrunde}} ist die letzte?"
    options:
      - { text: "River", correct: true, why: "Der River ist die fünfte {{t:community-cards|Gemeinschaftskarte}}. Sind nach dem Setzen am River noch mindestens zwei Spieler übrig, decken sie ihre Karten auf (Showdown)." }
      - { text: "Turn", why: "Der Turn ist die vierte Karte. Danach kommt noch der River." }
      - { text: "Flop", why: "Der Flop ist die erste Runde mit {{t:community-cards|Gemeinschaftskarten}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Du sitzt im {{t:big-blind|Big Blind}}, alle haben {{t:fold|gefoldet}}, und der {{t:small-blind|Small Blind}} hat nur komplettiert. Du hast eine schwache Hand. Was tust du?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Dein {{t:big-blind|Big Blind}} zählt wie ein {{t:bet|Einsatz}}, und der {{t:small-blind|Small Blind}} hat ihn nur ausgeglichen. Niemand hat {{t:raise|erhöht}}, also siehst du den Flop kostenlos. Eine schwache Hand ist kein Grund zu folden, wenn es nichts kostet." }
      - { text: "Ich {{t:fold|folde}}", why: "{{t:fold|Folden}}, wenn du kostenlos {{t:check|checken}} kannst, ist ein reiner Verlust." }
      - { text: "Ich {{t:raise|erhöhe}}", why: "Mit 7-2 hast du nichts, worauf du aufbauen kannst; ein {{t:check|Check}} bringt dir einen kostenlosen Flop." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
Jede Hand läuft in einer festen Reihenfolge ab. Zuerst zahlen zwei Spieler Pflichteinsätze ein, die **Blinds**: den {{t:small-blind|Small Blind}} und den {{t:big-blind|Big Blind}}. So liegt im {{t:pot|Pot}} immer etwas, um das gespielt wird.

Vor dem Flop zählt der {{t:big-blind|Big Blind}} wie ein {{t:bet|Einsatz}}: Wer spielen will, muss mindestens {{t:call|mitgehen}}. Der {{t:big-blind|Big Blind}} ist vor dem Flop als Letzter dran. Hat niemand {{t:raise|erhöht}}, kann er {{t:check|checken}} und den Flop ohne Zuzahlung sehen.

## Vier {{t:betting-round|Setzrunden}}

1. **Preflop**: Du hast nur deine 2 Karten.
2. **Flop**: 3 {{t:community-cards|Gemeinschaftskarten}} kommen auf das {{t:board|Board}}.
3. **Turn**: die vierte Karte.
4. **River**: die fünfte, letzte Karte.

Sind nach dem Setzen am River noch mindestens zwei Spieler im Spiel, decken sie ihre Karten auf. Das ist der **Showdown**: Die beste Hand gewinnt den {{t:pot|Pot}}. Wenn alle bis auf einen schon vorher {{t:fold|folden}}, gewinnt dieser eine den {{t:pot|Pot}}, ohne seine Karten zu zeigen.

## Mögliche Aktionen

- **{{t:check|Checken}}**: Du zahlst nichts ein. Nur wenn in dieser Runde niemand vor dir {{t:bet|gesetzt}} oder {{t:raise|erhöht}} hat (vor dem Flop kann der {{t:big-blind|Big Blind}} {{t:check|checken}}, wenn niemand {{t:raise|erhöht}} hat).
- **{{t:bet|Setzen}}**: der erste {{t:bet|Einsatz}} in der Runde. In Formeln in späteren Lektionen schreiben wir kurz „bet“.
- **{{t:call|Mitgehen}}**: Du gleichst den {{t:bet|Einsatz}} des Gegners aus.
- **{{t:raise|Erhöhen}}**: Du erhöhst den {{t:bet|Einsatz}} eines anderen.
- **{{t:fold|Folden}}**: Du wirfst deine Karten weg und verlierst, was du schon eingezahlt hast.

:::note Zum Merken
Wenn jemand {{t:bet|gesetzt}} hat, kannst du {{t:fold|folden}}, {{t:call|mitgehen}} oder {{t:raise|erhöhen}}. Wenn niemand {{t:bet|gesetzt}} hat, kannst du {{t:check|checken}} oder {{t:bet|setzen}}.
:::

:::note All-in und {{t:side-pot|Nebenpot}}
Du kannst nicht mehr {{t:bet|setzen}}, als du vor dir liegen hast. Wenn du alle deine {{t:chips|Chips}} einzahlst, bist du **all-in**: Du bietest nicht mehr weiter mit, und die restlichen {{t:community-cards|Gemeinschaftskarten}} werden bis zum Ende ausgeteilt. Von jedem Gegner kannst du höchstens so viel gewinnen, wie du selbst eingezahlt hast. Spielen die anderen um mehr weiter, kommt der Überschuss in einen **{{t:side-pot|Nebenpot}}**, um den nur sie spielen.
:::
