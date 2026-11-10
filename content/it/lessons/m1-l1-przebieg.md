---
id: m1.l1
module: m1
order: 1
title: "Lo svolgimento di una mano"
sub: "Blind, street e mosse disponibili"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "È il flop e nessuno prima di te ha {{t:bet|puntato}}. Cosa puoi fare?"
    options:
      - { text: "Fare {{t:check|check}} o {{t:bet|puntare}}", correct: true, why: "Senza una {{t:bet|puntata}} prima di te hai due opzioni: lasciare che il gioco prosegua gratis oppure {{t:bet|puntare}} tu stesso." }
      - { text: "{{t:call|Chiamare}}", why: "Non c'è niente da {{t:call|chiamare}}, perché nessuno ha {{t:bet|puntato}} nulla." }
      - { text: "{{t:raise|Rilanciare}}", why: "Puoi {{t:raise|rilanciare}} solo la {{t:bet|puntata}} di qualcun altro. La prima {{t:bet|puntata}} del giro si chiama bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Quante {{t:community-cards|carte comuni}} escono sul flop?"
    options:
      - { text: "3", correct: true, why: "Il flop sono tre carte insieme. Poi turn e river ne aggiungono una ciascuno." }
      - { text: "1", why: "Turn e river escono una carta alla volta." }
      - { text: "5", why: "Le cinque {{t:community-cards|carte comuni}} ci sono solo sul river." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "L'avversario ha {{t:bet|puntato}} 20 {{t:chips|fiches}}. Hai una mano debole e non vuoi continuare a giocare. Cosa fai?"
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Quando c'è una {{t:bet|puntata}} e non vuoi pagare, {{t:fold|foldi}}. Perdi solo quello che hai già messo." }
      - { text: "{{t:check|Check}}", why: "Il check non è possibile quando c'è una {{t:bet|puntata}} da {{t:call|chiamare}}." }
      - { text: "{{t:call|Chiamo}}", why: "La {{t:call|chiamata}} costa 20 {{t:chips|fiches}}. Visto che non vuoi giocare, è una perdita." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Qual è l'ultimo {{t:betting-round|giro di puntate}}?"
    options:
      - { text: "River", correct: true, why: "Il river è la quinta {{t:community-cards|carta comune}}. Se dopo le puntate sul river restano almeno due giocatori, scoprono le carte (showdown)." }
      - { text: "Turn", why: "Il turn è la quarta carta. Dopo c'è ancora il river." }
      - { text: "Flop", why: "Il flop è il primo giro con le {{t:community-cards|carte comuni}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Sei in {{t:big-blind|big blind}}, tutti hanno {{t:fold|foldato}} e lo {{t:small-blind|small blind}} ha solo completato. Hai una mano debole. Cosa fai?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|Check}}", correct: true, why: "Il tuo {{t:big-blind|big blind}} vale come una {{t:bet|puntata}} e lo {{t:small-blind|small blind}} l'ha solo pareggiato. Nessuno ha {{t:raise|rilanciato}}, quindi vedi il flop gratis. Una mano debole non è un motivo per foldare, quando non costa nulla." }
      - { text: "{{t:fold|Foldo}}", why: "{{t:fold|Foldare}} quando puoi fare {{t:check|check}} gratis è una perdita pura." }
      - { text: "{{t:raise|Rilancio}}", why: "Con 7-2 non hai niente su cui costruire; il {{t:check|check}} ti dà un flop gratis." }
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
Ogni mano segue un ordine fisso. Prima due giocatori versano delle puntate obbligatorie, cioè i **blind**: lo {{t:small-blind|small blind}} e il {{t:big-blind|big blind}}. Così nel {{t:pot|piatto}} c'è sempre qualcosa in palio.

Prima del flop il {{t:big-blind|big blind}} vale come una {{t:bet|puntata}}: chi vuole giocare deve almeno {{t:call|chiamarlo}}. Il {{t:big-blind|big blind}} parla per ultimo prima del flop. Se nessuno ha {{t:raise|rilanciato}}, può fare {{t:check|check}} e vedere il flop senza aggiungere nulla.

## Quattro {{t:betting-round|giri di puntate}}

1. **Preflop**: hai solo le tue 2 carte.
2. **Flop**: sul {{t:board|board}} arrivano 3 {{t:community-cards|carte comuni}}.
3. **Turn**: la quarta carta.
4. **River**: la quinta e ultima carta.

Se dopo le puntate sul river sono rimasti in gioco almeno due giocatori, scoprono le carte. È lo **showdown**: il punto migliore vince il {{t:pot|piatto}}. Se prima tutti tranne uno {{t:fold|foldano}}, quel giocatore vince il {{t:pot|piatto}} senza mostrare le carte.

## Mosse disponibili

- **{{t:check|Check}}**: non metti nulla. Solo se in questo giro nessuno prima di te ha {{t:bet|puntato}} o {{t:raise|rilanciato}} (prima del flop il {{t:big-blind|big blind}} può fare {{t:check|check}} se nessuno ha {{t:raise|rilanciato}}).
- **{{t:bet|Punto}}**: la prima {{t:bet|puntata}} del giro. Nelle formule delle lezioni successive scriviamo semplicemente «bet».
- **{{t:call|Chiamo}}**: pareggi la {{t:bet|puntata}} dell'avversario.
- **{{t:raise|Rilancio}}**: aumenti la {{t:bet|puntata}} di qualcun altro.
- **{{t:fold|Foldo}}**: butti le carte e perdi quello che hai già messo.

:::note Da ricordare
Se qualcuno ha {{t:bet|puntato}}, puoi {{t:fold|foldare}}, {{t:call|chiamare}} o {{t:raise|rilanciare}}. Se nessuno ha {{t:bet|puntato}}, puoi fare {{t:check|check}} o {{t:bet|puntare}}.
:::

:::note All-in e {{t:side-pot|piatto secondario}}
Non puoi {{t:bet|puntare}} più di quanto hai davanti. Quando metti tutte le tue {{t:chips|fiches}}, sei **all-in**: non partecipi più alle puntate e le restanti {{t:community-cards|carte comuni}} vengono distribuite fino alla fine. Da ogni avversario puoi vincere al massimo quanto hai messo tu. Se gli altri continuano a giocare per di più, l'eccedenza va nel **{{t:side-pot|piatto secondario}}** (side pot), che si contendono solo loro.
:::
