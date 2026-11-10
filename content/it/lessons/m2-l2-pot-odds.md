---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "Quando conviene chiamare"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Nel {{t:pot|piatto}} ci sono {{n:ex.third.pot}}. L'avversario {{t:bet|punta}} {{n:ex.third.bet}}. Di quanta equity hai bisogno per {{t:call|chiamare}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Il {{t:pot|piatto}} dopo la {{t:bet|puntata}} è {{n:ex.third.pot-after-bet}}, tu aggiungi {{n:ex.third.bet}}, in tutto {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "È quanto ti serve contro una {{t:bet|puntata}} grande quanto il {{t:pot|piatto}}. Qui la {{t:bet|puntata}} è 1/3 del {{t:pot|piatto}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "Questo è {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Al denominatore aggiungi anche la tua {{t:call|chiamata}}." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Hai un {{t:flush-draw|progetto di colore}}. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Ti serve {{n:eq.bet-pot}}. Il {{t:flush|colore}} ti dà {{n:outs.flush}} out, cioè circa {{n:odds.flush.turn-river}}. Anche se aggiungi i {{n:pair.outs.per-rank}} assi che ti danno una {{t:pair|coppia}} d'assi (in tutto {{n:outs.flush-ace}} out, circa {{n:odds.flush-ace.turn-river}}), resta comunque nettamente meno di {{n:eq.bet-pot}}. Una {{t:call|chiamata}} così perde nel lungo periodo." }
      - { text: "{{t:call|Chiamo}}", why: "È allettante, perché hai un {{t:draw|progetto}} verso il miglior {{t:flush|colore}} e anche un asso può aiutarti, ma anche circa {{n:odds.flush-ace.turn-river}} è meno di {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Rilancio}} all-in", why: "Tra i giocatori esperti a volte è una giocata possibile, ma senza un buon motivo rischi tutto lo stack (tutte le {{t:chips|fiches}} che hai davanti) con una mano che ancora non ha niente." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Stessa mano, ma l'avversario {{t:bet|punta}} solo {{n:ex.bet.quarter}} in un {{t:pot|piatto}} di {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Ti serve {{n:eq.bet-quarter}} e hai circa {{n:odds.flush.turn-river}}, e con gli assi ancora di più. Una {{t:bet|puntata}} piccola ti dà un buon prezzo." }
      - { text: "{{t:fold|Foldo}}", why: "Costa troppo poco per {{t:fold|foldare}}: {{n:odds.flush.turn-river}} è più del {{n:eq.bet-quarter}} necessario, e con gli assi ancora di più." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "L'avversario {{t:bet|punta}} metà {{t:pot|piatto}}. Di quanta equity hai bisogno?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Piatto}} {{n:ex.pot}}, {{t:bet|puntata}} {{n:ex.bet.half}}. Aggiungi {{n:ex.bet.half}} su un totale di {{n:ex.half.total}}, cioè {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Errore frequente: {{n:ex.wrong.half}} è la {{t:bet|puntata}} divisa per il {{t:pot|piatto}} prima della {{t:bet|puntata}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Quanto aggiungi va diviso per l'intero {{t:pot|piatto}} dopo la tua {{t:call|chiamata}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "È quanto ti serve contro una {{t:bet|puntata}} grande quanto l'intero {{t:pot|piatto}}." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "L'avversario {{t:bet|punta}} l'intero {{t:pot|piatto}}. Quale percentuale di equity ti serve per {{t:call|chiamare}}? Inserisci un numero."
    answer: eq.bet-pot
    explanation: "{{t:pot|Piatto}} {{n:ex.pot}}, {{t:bet|puntata}} {{n:ex.bet.pot}}. Aggiungi {{n:ex.bet.pot}} a un {{t:pot|piatto}} che, dopo la tua {{t:call|chiamata}}, contiene {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Dividi quanto aggiungi per l'intero {{t:pot|piatto}}: {{n:eq.bet-pot}}, cioè un terzo."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Quando l'avversario {{t:bet|punta}} e tu hai un {{t:draw|progetto}}, la domanda è: il prezzo è buono? Confronti due numeri: **quanto spesso devi vincere** e **quanto spesso vinci davvero**.

:::note Equity e probabilità di centrare
**L'equity** è la tua quota del {{t:pot|piatto}}: quanto spesso vinci se la mano arriva allo showdown senza altre {{t:bet|puntate}}. La **probabilità di centrare** della lezione sugli out è solo la probabilità che esca un out. Con un {{t:draw|progetto}} puro, che vince solo se va a segno, la probabilità di centrare sulle carte che vedrai davvero a questo prezzo approssima l'equity. Contro una {{t:bet|puntata}} al flop è la probabilità su una carta, non fino al river.
:::

## Quanto spesso devi vincere

```formula
equity necessaria = chiamata ÷ piatto dopo la tua chiamata
piatto dopo la tua chiamata = piatto prima della puntata + puntata + chiamata
```

Esempio: nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.half}}. Ora il {{t:pot|piatto}} contiene {{n:ex.half.pot-after-bet}}, tu aggiungi {{n:ex.bet.half}}, quindi il {{t:pot|piatto}} dopo la tua {{t:call|chiamata}} è {{n:ex.half.total}}. Ti serve {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Promemoria rapido

| {{t:bet|Puntata}} dell'avversario | Equity necessaria |
|---|---|
| Tutto il {{t:pot|piatto}} | {{n:eq.bet-pot}} |
| Metà {{t:pot|piatto}} | {{n:eq.bet-half}} |
| Un quarto di {{t:pot|piatto}} | {{n:eq.bet-quarter}} |

:::note La decisione
Se la tua equity è superiore a quella necessaria, {{t:call|chiami}}. Se è inferiore, {{t:fold|foldi}}. Deriva dal {{t:expected-value|valore atteso}}: l'{{t:expected-value|EV}} della {{t:call|chiamata}} = equity × {{t:pot|piatto}} dopo la tua {{t:call|chiamata}} − {{t:call|chiamata}}, ed è negativo esattamente quando l'equity è inferiore a quella necessaria. Questo solo calcolo elimina la maggior parte degli errori costosi dei principianti. Per ora tralasci le {{t:implied-odds|implied odds}}, cioè le {{t:chips|fiches}} che ti aspetti di vincere più avanti nella mano se chiudi il tuo punto; torneranno nei moduli successivi.
:::
