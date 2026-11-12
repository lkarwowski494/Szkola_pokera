---
id: m5.l4
module: m5
order: 4
title: "Fuori posizione e contro più avversari"
sub: "Quando fare check più spesso"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:open|Hai aperto}} dal {{t:cutoff|CO}}, il Button {{t:call|ha chiamato}}, i blind {{t:fold|hanno fatto fold}}. Il flop è medio e {{t:connected|connesso}}. Parli per primo. Quale piano è giusto qui?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Faccio check}} più spesso che {{t:in-position}}", correct: true, why: "Sì: il Button {{t:call|ha chiamato}} in {{t:position|posizione}}, quindi ha un {{t:range}} forte, e un flop medio e {{t:connected|connesso}} colpisce bene le sue {{t:pair|coppie}} e i suoi {{t:connectors|connettori}}. {{t:out-of-position|Fuori posizione}} qui {{t:check|fai check}} molto spesso, anche con mani forti." }
      - { text: "C-bet spesso e piccola, come sul Button", why: "È il piano {{t:in-position}} su un flop {{t:dry|secco}} e alto. Qui non hai {{t:position|posizione}}, e il flop non favorisce il tuo {{t:range}}." }
      - { text: "C-bet con tutte le mani, per non perdere l'{{t:initiative|iniziativa}}", why: "L'{{t:initiative|iniziativa}} da sola non vince: il {{t:range}} del Button qui è forte, e dopo ogni {{t:bet|puntata}} parli per primo anche al turn e al river." }
  - kind: cbet
    id: m5.l4.c-oop
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "You {{t:open|opened}} from the {{t:hijack|HJ}}, the Button {{t:call|called}}, and everyone else {{t:fold|folded}}. You act first. Which plan fits this flop?"
    position: HJ
    options:
      check: "I {{t:check}}"
      small: "Small c-bet: {{n:cbet.size.small}} of the {{t:pot}}"
      big: "Big c-bet: {{n:cbet.size.big}} of the {{t:pot}}"
    cases:
      - when: { height: [low], ranks: [connected, semi-connected, disconnected] }
        best: check
        rule: R-M5-012
        why:
          check: "Yes: on a low unpaired flop (the highest card is a nine or lower), the solver {{t:check|checks}} its whole {{t:range}} in this spot. Your wide {{t:range}} has lots of high cards that missed here, while the Button, who {{t:call|called}} with {{t:position}}, has fewer hands with no chance."
          small: "Too often: on a low unpaired flop, the solver doesn't c-bet in this spot; it {{t:check|checks}} its whole {{t:range}}, strong hands included. When the Button {{t:bet|bets}}, some of the strong hands {{t:raise}} after {{t:check|checking}} (check-raise)."
          big: "Too often and too expensive: on a low unpaired flop, the solver doesn't c-bet in this spot; it {{t:check|checks}} its whole {{t:range}}, strong hands included. When the Button {{t:bet|bets}}, some of the strong hands {{t:raise}} after {{t:check|checking}} (check-raise)."
    count: 3
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Perché {{t:out-of-position}} fai c-bet meno spesso che {{t:in-position}}?"
    options:
      - { text: "Perché l'avversario {{t:in-position}} vede la tua mossa su ogni {{t:street}}, e il suo {{t:range}} dopo la {{t:call|chiamata}} è forte", correct: true, why: "Sì: chi {{t:call|chiama}} in {{t:position|posizione}} con le mani deboli {{t:fold|ha fatto fold}}, e con le più forti spesso {{t:raise|ha rilanciato}}. Gli restano mani medie e buone, e in più parla per ultimo." }
      - { text: "Perché la c-bet {{t:out-of-position}} è vietata", why: "No: le regole ti permettono di puntare da qualsiasi posto. Il punto è che la c-bet {{t:out-of-position}} conviene meno spesso." }
      - { text: "Perché {{t:out-of-position}} hai sempre la mano più debole", why: "No: la tua mano non dipende dalla {{t:position|posizione}}. Cambia quanto facilmente ne realizzi l'equity." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:open|Hai aperto}} dal {{t:cutoff|CO}}, il Button {{t:call|ha chiamato}}, i blind {{t:fold|hanno fatto fold}}. Hai {{t:top-pair|top pair}} con il miglior kicker su un flop {{t:dry|secco}}. Parli per primo. Cosa fai?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|Faccio check}} (per {{t:call|chiamare}} la {{t:bet|puntata}} del Button)", correct: true, why: "Sì: il Button {{t:call|ha chiamato}} in {{t:position|posizione}}, quindi il suo {{t:range}} è forte, e su questo flop il solver {{t:out-of-position}} {{t:check|fa check}} con quasi tutto il {{t:range}}, anche con {{t:top-pair|top pair}} e miglior kicker. Dopo il {{t:check}} {{t:call|chiami}} la {{t:bet|puntata}} del Button." }
      - { text: "C-bet di {{n:cbet.size.small}} del {{t:pot|piatto}}", why: "Troppo spesso: in questa situazione il solver punta in meno del {{n:cbet.oop.a94.bet}} dei casi. La {{t:top-pair|top pair}} con il miglior kicker la giochi con {{t:check}} e {{t:call|chiamata}}." }
      - { text: "C-bet di {{n:cbet.size.big}} del {{t:pot|piatto}}", why: "Troppo spesso: in questa situazione il solver punta in meno del {{n:cbet.oop.a94.bet}} dei casi. La {{t:top-pair|top pair}} con il miglior kicker la giochi con {{t:check}} e {{t:call|chiamata}}." }
      - { text: "{{t:fold|Fold}}", why: "Nessuno ha ancora {{t:bet|puntato}}, quindi il {{t:fold}} non ti dà nulla: puoi fare {{t:check}} gratis (regola del modulo 1). Questa mano la giochi con {{t:check}} e {{t:call|chiamata}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Hai aperto}} dal {{t:cutoff|CO}}, il Button e il {{t:big-blind}} {{t:call|hanno chiamato}}. Al flop il {{t:big-blind}} {{t:check|fa check}}, e il Button parla dopo di te. Hai solo carte alte senza {{t:draw|progetto}}. Cosa fai?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Sì: contro due avversari una mano senza {{t:pair|coppia}} e senza {{t:draw|progetto}} vince di rado il {{t:pot|piatto}} con una {{t:bet|puntata}}. È più probabile che uno dei due abbia preso questo flop." }
      - { text: "C-bet piccola, come nel testa a testa", why: "Contro due avversari il {{t:bluff}} deve passare attraverso entrambi, ed entrambi mancano il flop insieme molto più di rado di uno solo." }
      - { text: "C-bet grande, per far uscire entrambi", why: "Un {{t:bluff}} grande contro due avversari rischia molto, e la probabilità che entrambi {{t:fold|facciano fold}} è bassa. Su questo flop hanno molte {{t:pair|coppie}} e molti {{t:draw|progetti}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Hai aperto}} dal {{t:cutoff|CO}}, il Button e il {{t:big-blind}} {{t:call|hanno chiamato}}. Il {{t:big-blind}} {{t:check|fa check}}. Hai {{t:top-pair|top pair}} con un buon kicker. Cosa fai?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Faccio check}}", correct: true, why: "Sì: in un {{t:pot|piatto}} multiway su un flop {{t:dry|secco}} il solver {{t:check|fa check}} molto spesso, anche con mani molto forti, perché due giocatori che {{t:call|hanno chiamato}}, insieme, hanno preso il flop più spesso." }
      - { text: "Punto {{t:value|per valore}}", why: "Contro due avversari su un flop {{t:dry|secco}} il solver {{t:check|fa check}} anche con una mano molto forte; punti di rado e poco, soprattutto quando il flop colpisce bene il tuo {{t:range}}." }
      - { text: "{{t:fold|Faccio fold}}", why: "Nessuno ha {{t:bet|puntato}}, quindi puoi fare {{t:check}} gratis. Il {{t:fold}} significherebbe regalare un {{t:pot|piatto}} in cui probabilmente sei in vantaggio." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Una mano senza {{t:pair|coppia}} manca il flop in circa il {{n:flop.miss.unpaired}} dei casi. Quanto spesso due mani così (quattro valori diversi) lo mancano insieme?"
    options:
      - { text: "Circa {{n:flop.miss.two}}", correct: true, why: "Sì: calcoli come per una mano sola, solo che le carte che fanno coppia sono di più: {{n:pair.outs.two-hands}} su {{n:cards.unseen.two-hands}} sconosciute (escluse le tue carte). La probabilità che nessuna delle {{n:cards.board.flop}} carte del flop sia tra queste è di circa il {{n:flop.miss.two}}: entrambi mancano il flop in meno della metà dei casi." }
      - { text: "Circa {{n:flop.miss.unpaired}}, come per una sola", why: "No: ogni avversario in più è un'altra possibilità che qualcuno abbia preso il flop. La probabilità che lo manchino tutti cala con ogni giocatore." }
      - { text: "Circa {{n:flop.hit.unpaired}}", why: "È la probabilità che una mano senza {{t:pair|coppia}} faccia {{t:pair|coppia}} al flop. La domanda riguarda il fatto che entrambe lo manchino." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Ripasso {{t:in-position}}: {{t:open|hai aperto}} dal Button, il {{t:big-blind}} {{t:call|ha chiamato}} e al flop {{t:check|fa check}}. Quale piano si adatta a questo flop?"
    position: BTN
    options:
      check: "{{t:check|Faccio check}} più spesso, c-bet meno del solito"
      small: "C-bet spesso e piccola: {{n:cbet.size.small}} del {{t:pot|piatto}} ({{n:cbet.btn.small}})"
      big: "C-bet spesso e grande: {{n:cbet.size.big}} del {{t:pot|piatto}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected], oesdPossible: false }
        best: small
        rule: R-M5-007
        why:
          check: "Troppo prudente: su un flop {{t:dry|secco}} e alto hai il {{t:range-advantage|vantaggio di range}}, e l'avversario di solito l'ha mancato. {{t:check|Facendo check}}, gli dai una carta gratis."
          small: "Sì: un flop {{t:dry|secco}} e alto ti favorisce. Una {{t:bet|puntata}} piccola basta perché l'avversario {{t:fold|faccia fold}} con le mani deboli, mentre le {{t:pair|coppie}} peggiori la {{t:call|chiameranno}} comunque."
          big: "Azione giusta, dimensione sbagliata: su un flop {{t:dry|secco}} l'avversario ha pochi {{t:draw|progetti}}, e le mani che hanno mancato il flop {{t:fold|faranno fold}} anche contro una {{t:bet|puntata}} piccola. Una {{t:bet|puntata}} più grande non fa fare {{t:fold}} a più mani, ma rischia di più. Punta circa {{n:cbet.size.small}} del {{t:pot|piatto}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Sì: un flop basso con carte vicine tra loro colpisce il {{t:range}} del {{t:big-blind|big blind}}: difende molte mani con carte piccole, e le tue carte alte qui hanno mancato il flop. Su un flop {{t:connected|connesso}} ha anche {{t:straight|scale}} e {{t:two-pair|doppie coppie}}, quindi di solito non hai il {{t:nuts-advantage|vantaggio di nuts}}. Fai c-bet meno spesso che sui flop alti: molte mani {{t:check|fanno check}}, e puntano soprattutto le mani forti e i {{t:draw|progetti}} forti."
          small: "Troppo spesso: un flop basso con carte vicine tra loro colpisce il {{t:range}} del {{t:big-blind|big blind}}, e su un flop {{t:connected|connesso}} di solito non hai il {{t:nuts-advantage|vantaggio di nuts}}. C-bet frequenti, anche piccole, danno al {{t:big-blind|big blind}} l'occasione di {{t:raise|rilanciare}} (check-raise) con le sue mani più forti."
          big: "Troppo spesso e troppo cara: questo flop colpisce il {{t:range}} del {{t:big-blind|big blind}}, e su un flop {{t:connected|connesso}} ha anche {{t:straight|scale}} e {{t:two-pair|doppie coppie}}. Una c-bet grande e frequente rischia molto, quando tu di solito hai solo carte alte."
    count: 3
---
Finora hai giocato {{t:in-position}} contro un solo avversario. {{t:out-of-position|Fuori posizione}} e contro più giocatori fai c-bet meno spesso.

## {{t:out-of-position|Fuori posizione}}

Quando {{t:open|apri}} dal {{t:cutoff|CO}} e il Button {{t:call|chiama}}, dopo il flop parli per primo su ogni {{t:street}}. In più il {{t:range}} del Button è forte: con le mani deboli {{t:fold|ha fatto fold}} e con parte delle più forti {{t:raise|ha rilanciato}}, quindi gli sono rimaste mani medie e buone. Un {{t:range}} così, senza le mani più forti e composto soprattutto da mani medie, è {{t:condensed|condensato}}. Per questo {{t:out-of-position}} {{t:check|fai check}} molto più spesso, spesso con tutto il {{t:range}}, anche con mani forti: le giocherai con una {{t:call|chiamata}} o un check-raise. Punti soprattutto sui flop che favoriscono moltissimo il tuo {{t:range}}, ad es. K-Q-6. Il {{t:check}} {{t:out-of-position}} non significa rinunciare alla mano: con molte di queste mani {{t:call|chiamerai}} la {{t:bet|puntata}} dell'avversario.

## Contro più avversari

Ogni avversario in più è un'altra possibilità che qualcuno abbia preso il flop. Una mano senza {{t:pair|coppia}} manca il flop in circa il {{n:flop.miss.unpaired}} dei casi, ma due insieme solo in circa il {{n:flop.miss.two}}. Il {{t:bluff}} deve passare attraverso tutti, quindi contro più avversari rinunci soprattutto ai {{t:bluff}}. Punti di rado e poco, soprattutto sui flop che colpiscono bene il tuo {{t:range}}; su un flop {{t:dry|secco}} fai spesso {{t:check}} anche con una mano molto forte.

:::note Da dove vengono queste regole
Le regole di questa lezione provengono da risultati pubblicati dei solver (c-bet {{t:out-of-position}}, c-bet su flop con un asso e nel {{t:pot|piatto}} multiway) e da materiali didattici ({{t:pot|piatto}} multiway). Sono euristiche: l'app non indica le frequenze in percentuale. La probabilità che due mani manchino il flop insieme è un calcolo esatto per due mani con quattro valori diversi; esclude le tue carte, come il numero per una mano sola.
:::
