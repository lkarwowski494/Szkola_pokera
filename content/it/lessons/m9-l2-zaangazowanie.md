---
id: m9.l2
module: m9
order: 2
title: "Impegno"
sub: "Quando ti giochi tutto lo stack"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, stack da {{n:commit.stack}} ciascuno. Punti tutto il {{t:pot|piatto}} ({{n:ex.bet.pot}}) e l'avversario va all-in. Devi aggiungere {{n:commit.after-pot.call}}. Quanta equity ti serve per {{t:call|chiamare}}? Inserisci il numero in percentuale."
    answer: eq.commit.after-pot
    explanation: "Prima dell'eccedenza dell'avversario nel {{t:pot|piatto}} ci sono {{n:ex.pot.after-pot-call}} (il {{t:pot|piatto}}, la tua {{t:bet|puntata}} e il suo pareggio). Aggiungi {{n:commit.after-pot.call}}, quindi equity necessaria = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Dopo una {{t:bet|puntata}} così sei impegnato nel piatto: il {{t:fold}} di solito non conviene."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, stack da {{n:commit.stack}} ciascuno. Punti metà {{t:pot|piatto}} ({{n:ex.bet.half}}) e l'avversario va all-in. Devi aggiungere {{n:commit.after-half.call}}. Quanta equity ti serve per {{t:call|chiamare}}? Inserisci il numero in percentuale."
    answer: eq.commit.after-half
    explanation: "Prima dell'eccedenza dell'avversario nel {{t:pot|piatto}} ci sono {{n:ex.half.total}} (il {{t:pot|piatto}}, la tua {{t:bet|puntata}} e il suo pareggio). Aggiungi {{n:commit.after-half.call}}: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. Meno che contro un all-in immediato ({{n:eq.jam.spr2}}), perché parte dei soldi l'hai già messa."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Hai la {{t:top-pair|top pair}}, punti tutto il {{t:pot|piatto}} e l'avversario va all-in. Per {{t:call|chiamare}} ti serve {{n:eq.commit.after-pot}} di equity. Cosa fai?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Sì: il prezzo è ottimo. Con un {{t:spr}} basso l'avversario va all-in anche con {{t:draw|progetti}} e donne più deboli, quindi la {{t:top-pair|top pair}} con l'asso di solito ha molta più equity di {{n:eq.commit.after-pot}}. Perde nettamente solo contro {{t:two-pair|doppia coppia}} e set." }
      - { text: "{{t:fold|Foldo}}, perché l'all-in indica una mano forte", why: "Il {{t:fold}} cede un {{t:pot|piatto}} in cui hai già messo parecchio. Devi vincere solo una volta su cinque, cioè nel {{n:eq.commit.after-pot}} dei casi. Se avevi intenzione di {{t:fold|foldare}} qui, era meglio non puntare tutto il {{t:pot|piatto}}." }
      - { text: "{{t:fold|Foldo}}, perché l'{{t:spr}} è basso", why: "Un {{t:spr}} basso funziona al contrario: rende più facile giocarsi tutto lo stack, perché il prezzo sull'all-in è migliore." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Dopo la tua {{t:bet|puntata}} ti resterebbe nello stack meno di quanto varrà il {{t:pot|piatto}} una volta {{t:call|chiamata}} la puntata. Quale piano non ha senso?"
    options:
      - { text: "{{t:bet|Puntata}} e {{t:fold}} se l'avversario va all-in", correct: true, why: "Sì, questo piano è un errore: dopo una {{t:bet|puntata}} così ti serve pochissima equity per {{t:call|chiamare}} l'all-in (con {{t:spr}} {{n:spr.commit}} e una {{t:bet|puntata}} pari al {{t:pot|piatto}} solo {{n:eq.commit.after-pot}}). Se {{t:fold|foldi}} comunque, la {{t:bet|puntata}} regala solo {{t:chips|fiches}}." }
      - { text: "All-in subito", why: "È un piano sensato con una mano forte: ti giochi comunque tutto lo stack, quindi lo metti dentro subito." }
      - { text: "{{t:check|Check}}", why: "Sensato anche questo quando non vuoi giocarti tutto lo stack: non metti soldi che poi renderebbero difficile {{t:fold|foldare}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Piatto}} dopo un 4-bet, {{t:spr}} circa {{n:spr.4bet}}. Hai chiuso la {{t:top-pair|top pair}} con il miglior kicker. Che piano scegli?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Mi gioco tutto lo stack", correct: true, why: "Sì: con {{t:spr}} circa {{n:spr.4bet}} per l'all-in ti serve solo circa {{n:eq.jam.4bet}} di equity, e la {{t:top-pair|top pair}} con l'asso qui è molto forte. Punti o {{t:call|chiami}} con il piano di mettere dentro tutto." }
      - { text: "Gioco con cautela e {{t:fold|foldo}} su una {{t:bet|puntata}} grande", why: "Con un {{t:spr}} così basso, {{t:fold|foldare}} la {{t:top-pair|top pair}} cede troppo. Dopo un 4-bet l'avversario ha anche AQ, QQ, JJ e altre mani che perdono contro la tua." }
      - { text: "Punto poco e {{t:fold|foldo}} sull'all-in", why: "È un piano {{t:bet|puntata}} e {{t:fold}} con un {{t:spr}} basso: dopo la {{t:bet|puntata}} il prezzo sull'all-in sarà ancora migliore, e il {{t:fold}} cede un {{t:pot|piatto}} in cui hai già messo soldi." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Perché con {{t:spr}} circa {{n:spr.commit}} la {{t:top-pair|top pair}} di solito si gioca tutto lo stack?"
    options:
      - { text: "Perché per l'all-in ti serve circa {{n:eq.jam.spr2}} di equity, e due {{t:bet|puntate}} da circa {{n:geo.spr2.2}} del {{t:pot|piatto}} mettono dentro tutto lo stack", correct: true, why: "Sì: il prezzo è buono, e per mettere dentro lo stack bastano due {{t:value|street di valore}}. Due street la {{t:top-pair|top pair}} di solito le regge. La soglia in sé è un'euristica: conta anche con cosa gioca l'avversario." }
      - { text: "Perché la {{t:top-pair|top pair}} vince sempre", why: "Non sempre: a volte l'avversario ha {{t:two-pair|doppia coppia}} o un set. Con un {{t:spr}} basso, però, mani peggiori e {{t:draw|progetti}} mettono dentro abbastanza soldi, e il prezzo è buono." }
      - { text: "Perché con {{t:spr}} {{n:spr.commit}} le regole non permettono di {{t:fold|foldare}}", why: "Puoi sempre {{t:fold|foldare}}. Il punto è che il {{t:fold}} di solito costa più di quanto rende: per l'all-in ti serve solo circa {{n:eq.jam.spr2}} di equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Piatto}} con un solo rilancio, stack da {{n:format.stack}}, {{t:spr}} circa {{n:spr.srp}}. Hai chiuso la {{t:top-pair|top pair}} con un buon kicker. Come tratti questa mano?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Come una mano da valore, ma di solito non da tutto lo stack", correct: true, why: "Sì: con {{t:spr}} circa {{n:spr.srp}} tutto lo stack entra solo dopo diverse {{t:bet|puntate}} più grandi del {{t:pot|piatto}}. Un avversario che mette dentro così tanto raramente ha una mano peggiore di una sola {{t:pair|coppia}}." }
      - { text: "Mi gioco tutto lo stack, perché la {{t:top-pair|top pair}} è forte", why: "Con {{t:spr}} {{n:spr.commit}} sì, ma qui l'{{t:spr}} è circa {{n:spr.srp}}. Quando nel {{t:pot|piatto}} c'è tutto lo stack, l'avversario di solito ha {{t:two-pair|doppia coppia}}, un set o una {{t:pair|coppia}} migliore." }
      - { text: "{{t:fold|Foldo}} sulla prima {{t:bet|puntata}} dell'avversario", why: "Troppo prudente: la {{t:top-pair|top pair}} con un buon kicker è una mano forte su questo flop. Il punto è non costruirci un {{t:pot|piatto}} da tutto lo stack, non {{t:fold|foldare}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Piatto}} dopo un 4-bet, {{t:spr}} circa {{n:spr.4bet}}. Hai una {{t:pair|coppia}} di jack e sul flop ci sono un asso e un re. L'avversario va all-in. E la regola «con un {{t:spr}} basso mi gioco lo stack»?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Non copre questa mano: è una {{t:pair|coppia}} più bassa di entrambe le carte alte del {{t:board}}", correct: true, why: "Sì: la regola parla della {{t:top-pair|top pair}} e di mani migliori. Dopo un 4-bet l'avversario ha spesso un asso o un re, e i tuoi jack perdono contro qualsiasi {{t:pair|coppia}} fatta con una carta alta. Qui {{t:fold|foldi}} più spesso, nonostante il buon prezzo ({{n:eq.jam.4bet}})." }
      - { text: "La copre: con un {{t:spr}} basso {{t:call|chiamo}} con tutto", why: "Un {{t:spr}} basso dà un buon prezzo, ma non trasforma una mano debole in una forte. Quando l'avversario ha spesso una {{t:pair|coppia}} migliore, anche {{n:eq.jam.4bet}} di equity può essere troppo." }
      - { text: "La copre, ma solo quando ho {{t:position|posizione}}", why: "La {{t:position|posizione}} non cambia con cosa giochi. La regola riguarda la {{t:top-pair|top pair}} e le mani migliori." }
---
L'impegno (in inglese commitment) è la situazione in cui nel {{t:pot|piatto}} ci sono già così tanti soldi rispetto al tuo stack che il {{t:fold}} sull'all-in non conviene quasi mai. L'{{t:spr}} della lezione precedente ti dice quanto ci sei vicino già all'inizio del flop.

## Dopo una {{t:bet|puntata}} il prezzo è ancora migliore

Esempio: {{t:spr}} {{n:spr.commit}}, nel {{t:pot|piatto}} {{n:ex.pot}}, stack da {{n:commit.stack}} ciascuno. Se l'avversario va all-in subito, ti serve {{n:eq.jam.spr2}} di equity. Se punti prima tu, te ne serve meno:

| La tua {{t:bet|puntata}} prima dell'all-in dell'avversario | Da aggiungere | Equity necessaria |
|---|---|---|
| Nessuna (l'avversario va subito all-in) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Metà {{t:pot|piatto}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Tutto il {{t:pot|piatto}} ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Non pianificare di {{t:bet|puntare}} e {{t:fold|foldare}}

Se dopo la tua {{t:bet|puntata}} ti resterebbe nello stack meno di quanto varrà il {{t:pot|piatto}} una volta {{t:call|chiamata}} la puntata, {{t:bet|puntare}} e {{t:fold|foldare}} sull'all-in di solito non ha senso: per {{t:call|chiamare}} l'all-in ti serve allora meno equity che per {{t:call|chiamare}} una {{t:bet|puntata}} pari al {{t:pot|piatto}} ({{n:eq.bet-pot}}). Hai due strade sensate: giocarti tutto lo stack (puntare o andare all-in) oppure fare {{t:check}}.

## {{t:spr}} basso: la {{t:top-pair|top pair}} si gioca lo stack

Regola: **con un {{t:spr}} al flop inferiore a circa {{n:spr.zone.low}}, la {{t:top-pair|top pair}} e le mani migliori di solito si giocano tutto lo stack** (le zone di {{t:spr}} della lezione precedente). L'{{t:spr}} di {{n:spr.commit}} dell'esempio rientra in questa zona, e i calcoli in questo caso sostengono la regola:

- per l'all-in ti serve al massimo circa {{n:eq.jam.spr2}} di equity, e dopo una tua {{t:bet|puntata}} ancora meno,
- due {{t:bet|puntate}} da circa {{n:geo.spr2.2}} del {{t:pot|piatto}} mettono dentro tutto lo stack: con un {{t:pot|piatto}} di {{n:ex.pot}} sono {{n:geo.spr2.flop}} al flop e {{n:geo.spr2.turn}} al turn, in totale {{n:geo.spr2.total}},
- la {{t:top-pair|top pair}} di solito regge due {{t:value|street di valore}} (la lezione sul piano per tre {{t:street|street}}).

I calcoli però non fissano una soglia esatta. Se la {{t:top-pair|top pair}} abbia abbastanza equity dipende da con cosa gioca l'avversario. Per questo è un'euristica, non una legge rigida. La regola riguarda la {{t:top-pair|top pair}} e le mani migliori: una {{t:pair|coppia}} più bassa delle carte alte sul {{t:board}} non rientra.

## {{t:spr}} alto: più cautela con una sola {{t:pair|coppia}}

In un {{t:pot|piatto}} con un solo rilancio l'{{t:spr}} è circa {{n:spr.srp}}. Per mettere dentro tutto lo stack entro il river bisognerebbe puntare più del {{t:pot|piatto}} su ogni {{t:street}} (la lezione sulla dimensione geometrica). Un avversario che mette dentro così tanti soldi raramente ha una mano peggiore di una sola {{t:pair|coppia}}. Per questo con una sola {{t:pair|coppia}} in un {{t:pot|piatto}} così giochi per valore, ma di solito non pianifichi di giocarti tutto lo stack.

:::note Da dove vengono queste regole
La soglia di circa {{n:spr.zone.low}} viene da materiali didattici e da un'analisi di solver pubblicata (con {{t:spr}} circa {{n:spr.commit}} ogni {{t:top-pair|top pair}} e ogni mano migliore si gioca lo stack). La cautela con una sola {{t:pair|coppia}} con un {{t:spr}} alto è confermata da materiali didattici e analisi di solver. I numeri su prezzo e dimensioni delle puntate in questa lezione sono pura matematica.
:::
