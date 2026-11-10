---
id: m9.l1
module: m9
order: 1
title: "SPR: rapporto tra stack e piatto"
sub: "Quanti soldi restano dietro il piatto"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Hai aperto}} dal Button a {{n:pf.open-size}}, il {{t:big-blind|big blind}} {{t:call|ha chiamato}}, stack da {{n:format.stack}}. Al flop nel {{t:pot|piatto}} ci sono {{n:bb.pot-after.vs-btn}} e dietro di te restano {{n:spr.srp.stack}}. Quanto vale l'{{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Circa {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. Lo stack dietro il {{t:pot|piatto}} è oltre dieci volte più grande del {{t:pot|piatto}}: è un {{t:spr}} tipico dopo un'{{t:open|apertura}} e una {{t:call|chiamata}}." }
      - { text: "Circa {{n:spr.srp.wrong-full}}", why: "È quello che ottieni dall'intero stack di {{n:format.stack}}. I tuoi {{n:pf.open-size}} sono già nel {{t:pot|piatto}}, quindi conti solo ciò che resta: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Circa {{n:spr.3bet-ip}}", why: "Questo è l'{{t:spr}} dopo un 3-bet e una {{t:call|chiamata}}. In un {{t:pot|piatto}} con un solo rilancio il {{t:pot|piatto}} è molto più piccolo, quindi l'{{t:spr}} è di circa {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Il {{t:cutoff|CO}} {{t:open|ha aperto}} a {{n:pf.open-size}}, tu dal Button {{t:raise|hai rilanciato}} (3-bet) a {{n:pf.3bet.ip-total}}, il {{t:cutoff|CO}} {{t:call|ha chiamato}}, i blind {{t:fold|hanno foldato}}. Al flop nel {{t:pot|piatto}} ci sono {{n:vs3bet.pot-after}} e dietro di te {{n:spr.3bet-ip.stack}}. Quanto vale l'{{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Circa {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Dopo un 3-bet il {{t:pot|piatto}} è tre volte più grande che dopo una normale {{t:open|apertura}}, quindi l'{{t:spr}} scende da circa {{n:spr.srp}} a circa {{n:spr.3bet-ip}}." }
      - { text: "Circa {{n:spr.3bet-ip.wrong-full}}", why: "È quello che ottieni dall'intero stack di {{n:format.stack}}. Il tuo 3-bet da {{n:pf.3bet.ip-total}} è già nel {{t:pot|piatto}}, quindi dividi solo ciò che resta: {{n:spr.3bet-ip.stack}}." }
      - { text: "Circa {{n:spr.srp}}", why: "Questo è l'{{t:spr}} in un {{t:pot|piatto}} con un solo rilancio. Dopo un 3-bet il {{t:pot|piatto}} è molto più grande e lo stack dietro è più piccolo, quindi l'{{t:spr}} scende a circa {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Il Button {{t:open|ha aperto}}, tu dal {{t:big-blind|big blind}} {{t:raise|hai rilanciato}} (3-bet) a {{n:pf.3bet.oop-total}}, il Button {{t:call|ha chiamato}}. Al flop nel {{t:pot|piatto}} ci sono {{n:spr.3bet-oop.pot}}, dietro di te {{n:spr.3bet-oop.stack}}. Quanto vale l'{{t:spr}}?"
    table: { position: BB }
    options:
      - { text: "Circa {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Fuori posizione}} il 3-bet è più grande, quindi il {{t:pot|piatto}} cresce di più e l'{{t:spr}} è più basso che dopo un 3-bet {{t:in-position|in posizione}} ({{n:spr.3bet-ip}})." }
      - { text: "Circa {{n:spr.3bet-ip}}", why: "Questo è l'{{t:spr}} dopo un 3-bet {{t:in-position|in posizione}} a {{n:pf.3bet.ip-total}}. Il tuo 3-bet a {{n:pf.3bet.oop-total}} crea un {{t:pot|piatto}} più grande, quindi l'{{t:spr}} è più basso: circa {{n:spr.3bet-oop}}." }
      - { text: "Circa {{n:spr.4bet}}", why: "Un {{t:spr}} così basso lo dà solo un 4-bet. Dopo un 3-bet a {{n:pf.3bet.oop-total}} risulta circa {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stack da {{n:format.stack}}. In quale {{t:pot|piatto}} l'{{t:spr}} al flop è il più basso?"
    options:
      - { text: "In un {{t:pot|piatto}} con 4-bet e {{t:call|chiamata}}", correct: true, why: "Sì: quando il Button fa 4-bet a {{n:pf.4bet.example.low}} sul 3-bet dello {{t:small-blind|small blind}}, lo {{t:small-blind|small blind}} {{t:call|chiama}} e il {{t:big-blind|big blind}} {{t:fold|ha foldato}}, nel {{t:pot|piatto}} ci sono {{n:spr.4bet.pot}} e dietro solo {{n:spr.4bet.stack}}. {{t:spr}} circa {{n:spr.4bet}}." }
      - { text: "In un {{t:pot|piatto}} con 3-bet e {{t:call|chiamata}}", why: "Dopo un 3-bet l'{{t:spr}} è di circa {{n:spr.3bet-ip}} {{t:in-position|in posizione}} e circa {{n:spr.3bet-oop}} {{t:out-of-position|fuori posizione}}. Un 4-bet lo abbassa ancora di più: a circa {{n:spr.4bet}}." }
      - { text: "In un {{t:pot|piatto}} con un solo rilancio", why: "Al contrario: qui l'{{t:spr}} è il più alto, circa {{n:spr.srp}}, perché il {{t:pot|piatto}} al flop è piccolo." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Perché dopo un 3-bet l'{{t:spr}} al flop è molto più basso che dopo una normale {{t:open|apertura}}?"
    options:
      - { text: "Il {{t:pot|piatto}} cresce di parecchie volte, mentre lo stack dietro cala di poco", correct: true, why: "Sì: il {{t:pot|piatto}} cresce da {{n:bb.pot-after.vs-btn}} a {{n:vs3bet.pot-after}}, mentre lo stack dietro scende solo da {{n:spr.srp.stack}} a {{n:spr.3bet-ip.stack}}. Il rapporto scende da circa {{n:spr.srp}} a circa {{n:spr.3bet-ip}}." }
      - { text: "Perché dopo un 3-bet i giocatori hanno stack più piccoli", why: "Solo un po' più piccoli: {{n:spr.3bet-ip.stack}} invece di {{n:spr.srp.stack}}. A determinare il calo dell'{{t:spr}} è il fatto che il {{t:pot|piatto}} è tre volte più grande." }
      - { text: "Perché il 3-bet dà la {{t:position|posizione}}", why: "La {{t:position|posizione}} dipende dal posto al tavolo, non dal 3-bet. L'{{t:spr}} è solo lo stack dietro il {{t:pot|piatto}} diviso per il {{t:pot|piatto}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Hai aperto}} dal Button a {{n:pf.open-size}}, hai {{n:format.stack}}. Il {{t:big-blind|big blind}} ha solo {{n:spr.short.stack}} e {{t:call|chiama}}. {{t:pot|Piatto}} al flop: {{n:bb.pot-after.vs-btn}}. Quanto vale l'{{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Circa {{n:spr.short}}", correct: true, why: "Calcoli dallo {{t:effective-stack|stack effettivo}}, cioè il più piccolo dei due: all'avversario restano {{n:spr.short.behind}}, quindi {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Oltre a ciò che è già nel {{t:pot|piatto}}, ognuno di voi può mettere al massimo altri {{n:spr.short.behind}}." }
      - { text: "Circa {{n:spr.srp}}", why: "Sarebbe così se anche l'avversario avesse {{n:format.stack}}. Potete giocare solo per lo stack più piccolo, quindi l'{{t:spr}} è di circa {{n:spr.short}}." }
      - { text: "Non si può calcolare perché gli stack sono diversi", why: "Si può: prendi lo stack più piccolo (quello effettivo). All'avversario restano {{n:spr.short.behind}}, quindi l'{{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Quando calcoli l'{{t:spr}} che ti dice come giocare la mano dopo il flop?"
    options:
      - { text: "Al flop, prima che qualcuno faccia una {{t:bet|puntata}}", correct: true, why: "Sì: l'{{t:spr}} si può calcolare su ogni {{t:street|street}} (in M7 l'hai calcolato al turn), ma per il piano della mano prendi lo stack dietro il {{t:pot|piatto}} diviso per il {{t:pot|piatto}} all'inizio del flop. Così sai quanti {{t:pot|piatti}} restano da giocare su tre {{t:street|street}}." }
      - { text: "Prima della mano, prima che qualcuno {{t:raise|rilanci}}", why: "Prima del flop non sai ancora quanto sarà grande il {{t:pot|piatto}}. L'{{t:spr}} dipende proprio da ciò che è successo prima del flop: dopo un'{{t:open|apertura}} circa {{n:spr.srp}}, dopo un 3-bet circa {{n:spr.3bet-ip}}." }
      - { text: "Al river, prima dell'ultima {{t:bet|puntata}}", why: "Al river resta una sola decisione. L'{{t:spr}} si può calcolare anche lì, ma per il piano della mano è più utile l'{{t:spr}} del flop, perché copre tutte e tre le {{t:street|street}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "{{t:raise|Hai rilanciato}} dal Button (3-bet), il {{t:cutoff|CO}} {{t:call|ha chiamato}}. L'{{t:spr}} al flop è di circa {{n:spr.3bet-ip}}. Hai centrato la {{t:top-pair|top pair}} con un buon kicker. Come consideri questa mano?"
    table: { position: BTN }
    options:
      - { text: "Come una mano al limite: la giochi {{t:value|per valore}}, ma non sempre {{t:call|chiami}} l'all-in dell'avversario", correct: true, why: "Un {{t:spr}} di circa {{n:spr.3bet-ip}} è nella zona da {{n:spr.zone.low}} a {{n:spr.zone.mid}}, in cui la {{t:top-pair|top pair}} è una mano al limite. La decisione su tutto lo stack dipende da come gioca l'avversario e da com'è il {{t:board|board}}." }
      - { text: "Giochi sempre per tutto lo stack", why: "Di solito è così solo con un {{t:spr}} sotto circa {{n:spr.zone.low}}, ad es. dopo un 4-bet (circa {{n:spr.4bet}}). Con un {{t:spr}} di circa {{n:spr.3bet-ip}} servono più {{t:bet|puntate}} per arrivare all'all-in, e fino in fondo pagano soprattutto mani più forti." }
      - { text: "Giochi con cautela, come con un {{t:spr}} molto alto", why: "Con tanta cautela giochi la {{t:top-pair|top pair}} sopra circa {{n:spr.zone.deep}}, ad es. in un {{t:pot|piatto}} con un solo rilancio (circa {{n:spr.srp}}). Dopo un 3-bet l'{{t:spr}} è molto più basso." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. Nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario va all-in per {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). Quanta equity ti serve per {{t:call|chiamare}}? Inserisci il numero in percentuale."
    answer: eq.jam.spr2
    explanation: "Aggiungi {{n:commit.stack}}, e il {{t:pot|piatto}} dopo la {{t:call|chiamata}} è {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Equity necessaria = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Al flop l'avversario va all-in per tutto lo stack ({{n:format.stack}} a inizio mano). In quale {{t:pot|piatto}} ti serve meno equity per {{t:call|chiamare}}?"
    options:
      - { text: "Dopo un 4-bet: circa {{n:eq.jam.4bet}}", correct: true, why: "Con un {{t:spr}} di circa {{n:spr.4bet}} aggiungi {{n:spr.4bet.stack}} per vincere il {{t:pot|piatto}} di {{n:spr.4bet.pot}} e lo stack dell'avversario. Più basso è l'{{t:spr}}, migliore è il prezzo." }
      - { text: "Dopo un 3-bet: circa {{n:eq.jam.3bet-ip}}", why: "Dopo un 3-bet {{t:in-position|in posizione}} ti serve circa {{n:eq.jam.3bet-ip}}. Dopo un 4-bet il {{t:pot|piatto}} è più grande rispetto allo stack, quindi basta circa {{n:eq.jam.4bet}}." }
      - { text: "Dopo un'{{t:open|apertura}} e una {{t:call|chiamata}}: circa {{n:eq.jam.srp}}", why: "È il prezzo peggiore dei tre: con un {{t:spr}} di circa {{n:spr.srp}} aggiungi {{n:spr.srp.stack}} per vincere il piccolo {{t:pot|piatto}} di {{n:bb.pot-after.vs-btn}} e lo stack dell'avversario." }
---
Prima del flop decidi quanti soldi finiscono nel {{t:pot|piatto}}. Dopo il flop conta quanto resta ancora dietro. Un solo numero lega le due cose: l'{{t:spr}}.

## Che cos'è l'{{t:spr}}

L'{{t:spr}} (in inglese stack-to-pot ratio) è il rapporto tra lo stack e il {{t:pot|piatto}} all'inizio di una {{t:street|street}}. Puoi calcolarlo su ogni {{t:street|street}} (in M7 l'hai calcolato al turn), ma per il piano della mano prendi l'{{t:spr}} del flop, prima che qualcuno faccia una {{t:bet|puntata}}.

```formula
SPR = stack effettivo ÷ piatto al flop
```

Lo {{t:effective-stack|stack effettivo}} è il più piccolo dei due stack, senza ciò che è già nel {{t:pot|piatto}}. È il massimo che ciascun giocatore può ancora aggiungere al {{t:pot|piatto}}: oltre al {{t:pot|piatto}} non puoi vincere dall'avversario più dello {{t:effective-stack|stack effettivo}}, ed è il massimo che puoi ancora perdere.

Esempio: {{t:open|hai aperto}} dal Button a {{n:pf.open-size}}, il {{t:big-blind|big blind}} {{t:call|ha chiamato}}. Il {{t:pot|piatto}} al flop è di {{n:bb.pot-after.vs-btn}}, dietro di te restano {{n:spr.srp.stack}}. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## Il preflop determina l'{{t:spr}}

Ogni {{t:raise|rilancio}} prima del flop rende il {{t:pot|piatto}} parecchie volte più grande, mentre lo stack dietro cala molto più lentamente. Per questo l'{{t:spr}} dipende molto da ciò che è successo prima del flop.

| {{t:pot|Piatto}} (stack da {{n:format.stack}}) | {{t:pot|Piatto}} al flop | Stack dietro il {{t:pot|piatto}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Apertura}} e {{t:call|chiamata}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position|in posizione}} e {{t:call|chiamata}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet dal {{t:big-blind|big blind}} e {{t:call|chiamata}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-bet del Button sul 3-bet dello {{t:small-blind|small blind}} e {{t:call|chiamata}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Zone di {{t:spr}}

Le zone di {{t:spr}} le ricavi dall'{{t:spr}} al flop. Più alto è l'{{t:spr}}, più forte deve essere la mano per giocare per tutto lo stack:

| {{t:spr}} | Con cosa giochi di solito per tutto lo stack |
|---|---|
| sotto {{n:spr.zone.low}} | {{t:top-pair|top pair}} o meglio |
| da {{n:spr.zone.low}} a {{n:spr.zone.mid}} | la {{t:top-pair|top pair}} è una mano al limite |
| da {{n:spr.zone.mid}} a {{n:spr.zone.deep}} | {{t:two-pair|doppia coppia}} alta o meglio |
| sopra {{n:spr.zone.deep}} | set, {{t:straight|scala}} o meglio |

Dopo un'{{t:open|apertura}} e una {{t:call|chiamata}} ({{t:spr}} circa {{n:spr.srp}}) sei nella zona più alta, dopo un 3-bet (circa {{n:spr.3bet-ip}}) nella zona in cui la {{t:top-pair|top pair}} è al limite, e dopo un 4-bet (circa {{n:spr.4bet}}) in quella più bassa. Le soglie sono una semplificazione. Le fonti dividono le zone in modo diverso, ma concordano che sotto circa {{n:spr.zone.low}} la {{t:top-pair|top pair}} gioca per lo stack, mentre con un {{t:spr}} più alto una sola {{t:pair|coppia}} lo fa sempre più raramente. Il limite di {{n:spr.zone.mid}} è una convenzione adottata nell'app. La soglia di {{n:spr.zone.deep}} deriva dal calcolo: con un {{t:spr}} di {{n:spr.zone.deep}}, tre {{t:bet|puntate}} della dimensione del {{t:pot|piatto}} portano all'all-in.

## {{t:spr}} basso: prezzo migliore sull'all-in

Quando l'avversario va all-in per tutto lo stack, aggiungi il tuo stack per vincere il {{t:pot|piatto}} e il suo stack. Equity necessaria = stack ÷ ({{t:pot|piatto}} + 2·stack). Con un {{t:spr}} di {{n:spr.commit}} è {{n:eq.jam.spr2}}, dopo un 4-bet circa {{n:eq.jam.4bet}}, dopo un 3-bet circa {{n:eq.jam.3bet-ip}}, e in un {{t:pot|piatto}} con un solo rilancio già circa {{n:eq.jam.srp}}.

Più basso è l'{{t:spr}}, meno soldi restano da giocare e più è facile mettere dentro tutto lo stack. Più è alto, più {{t:street|street}} e {{t:bet|puntate}} restano prima che lo stack finisca nel {{t:pot|piatto}}.

:::note Da dove vengono questi numeri
I {{t:pot|piatti}} e gli stack derivano dalle size del modulo sul gioco prima del flop ({{t:open|apertura}} a {{n:pf.open-size}}, 3-bet a {{n:pf.3bet.ip-total}} o {{n:pf.3bet.oop-total}}, 4-bet a {{n:pf.4bet.example.low}}). Il {{t:pot|piatto}} dopo il 4-bet è uno scenario: il Button fa 4-bet sul 3-bet dello {{t:small-blind|small blind}}, lo {{t:small-blind|small blind}} {{t:call|chiama}} e il {{t:big-blind|big blind}} {{t:fold|ha foldato}}, lasciando il suo blind nel {{t:pot|piatto}}. Una size diversa dà un {{t:spr}} un po' diverso, ma l'ordine è sempre lo stesso: più {{t:raise|rilanci}} prima del flop, più basso è l'{{t:spr}}.
:::
