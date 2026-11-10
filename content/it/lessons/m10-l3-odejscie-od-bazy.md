---
id: m10.l3
module: m10
order: 3
title: "Deviare dalla base"
sub: "Con quali mani e di quanto"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Sai che in questa linea l'avversario {{t:bluff|bluffa}} un po' più spesso che in equilibrio. Con quali mani cambi decisione per prime?"
    options:
      - { text: "Con le mani che nella base mischiano {{t:call|chiamata}} e {{t:fold|fold}}: ora {{t:call|chiami}} sempre", correct: true, why: "In equilibrio queste mani sono indifferenti, perché l'avversario ha esattamente tanti {{t:bluff|bluff}} quanti ne servono. Basta un piccolo eccesso di {{t:bluff|bluff}} perché la {{t:call|chiamata}} renda più del {{t:fold|fold}}." }
      - { text: "Con le mani più deboli, che nella base {{t:fold|foldano}} sempre", why: "Queste mani perdono anche contro una parte dei {{t:bluff|bluff}} oppure hanno bisogno di un eccesso molto maggiore. Cambiano solo quando l'avversario si allontana molto dall'equilibrio." }
      - { text: "Con le mani più forti: ora le {{t:raise|rilanci}}", why: "Le mani più forti le giochi comunque. Il cambiamento parte dalle mani al limite della decisione." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "In un esempio pubblicato di solver, l'avversario al river {{t:bluff|bluffa}} con circa il {{n:overbluff.lock}} delle puntate invece di circa il {{n:overbluff.base}}. Come cambia la tua risposta alla sua puntata con le mani che catturano i {{t:bluff|bluff}}?"
    options:
      - { text: "Smetti di {{t:fold|foldare}}: le mani che nella base mischiavano ora {{t:call|chiamano}} sempre", correct: true, why: "Tanto è bastato perché, nella soluzione con la strategia dell'avversario bloccata, la difesa passasse alla sola {{t:call|chiamata}}. Le mani indifferenti reagiscono al minimo eccesso di {{t:bluff|bluff}}." }
      - { text: "Quasi niente: pochi punti sono troppo pochi per cambiare qualcosa", why: "Per le mani indifferenti pochi punti sono tanti: in equilibrio {{t:call|chiamata}} e {{t:fold|fold}} danno loro lo stesso risultato, quindi ogni eccesso di {{t:bluff|bluff}} fa pendere la bilancia verso la {{t:call|chiamata}}." }
      - { text: "Inizi a {{t:raise|rilanciare}} con le mani che catturano i {{t:bluff|bluff}}", why: "Il {{t:raise|rilancio}} fa uscire i {{t:bluff|bluff}} dell'avversario, mentre le mani migliori {{t:call|chiamano}}. Una mano che cattura i {{t:bluff|bluff}} guadagna con la {{t:call|chiamata}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Sai che in una data linea l'avversario {{t:bluff|bluffa}} meno spesso che in equilibrio. Che cosa fai con una mano che cattura i {{t:bluff|bluff}} e che nella base a volte {{t:call|chiama}} e a volte {{t:fold|folda}}?"
    options:
      - { text: "{{t:fold|Foldo}} sempre", correct: true, why: "Quando i {{t:bluff|bluff}} sono meno di quanti ne richieda l'equilibrio, le mani indifferenti perdono {{t:call|chiamando}}. Risultato del solver: con un deficit di {{t:bluff|bluff}} {{t:fold|foldi}} sempre." }
      - { text: "{{t:call|Chiamo}} sempre, così l'avversario non mi sfrutta con i {{t:bluff|bluff}}", why: "Un avversario che {{t:bluff|bluffa}} troppo raramente non può sfruttare i tuoi {{t:fold|fold}}. Sei tu a sfruttare il suo errore {{t:fold|foldando}}." }
      - { text: "Gioco come nella base, metà e metà", why: "Mischiare ha senso solo quando entrambe le decisioni danno lo stesso risultato. Con un deficit di {{t:bluff|bluff}} il {{t:fold|fold}} rende di più." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "{{t:bet|Punti}} una c-bet di {{n:cbet.ex.small}} in un {{t:pot|piatto}} di {{n:ex.pot}}, senza alcuna mano. Quanto spesso l'avversario deve {{t:fold|foldare}} perché questo {{t:bluff|bluff}} vada in pari? Inserisci la percentuale."
    answer: alpha.cbet.small
    explanation: "La soglia è puntata ÷ ({{t:pot|piatto}} + puntata) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Un avversario con fold to c-bet nettamente sopra questo numero {{t:fold|folda}} abbastanza spesso da far guadagnare la c-bet anche senza mano."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "L'avversario ha un fold to c-bet del {{n:hud.ex.fcb.high}} su {{n:hud.ex.reg.hands}} mani. Su un flop {{t:dry|secco}} non hai preso niente. Conviene una c-bet da 1/3 di {{t:pot|piatto}} senza mano?"
    options:
      - { text: "Sì: l'avversario {{t:fold|folda}} più spesso del {{n:alpha.cbet.small}}, quindi la c-bet guadagna subito", correct: true, why: "Una c-bet da 1/3 di {{t:pot|piatto}} va in pari con il {{n:alpha.cbet.small}} di {{t:fold|fold}}. L'avversario {{t:fold|folda}} molto più spesso, quindi la c-bet guadagna prima ancora che tu conti l'equity della tua mano. Il fold to c-bet unisce tutte le dimensioni e tutti i tavoli, quindi è un'approssimazione." }
      - { text: "No: senza mano non punti", why: "Il {{t:bluff|bluff}} non ha bisogno di una mano, ha bisogno di {{t:fold|fold}}. Quando l'avversario {{t:fold|folda}} più spesso del {{n:alpha.cbet.small}}, la c-bet guadagna con qualsiasi mano." }
      - { text: "Solo con una dimensione grande, perché una piccola non fa uscire mani", why: "Una puntata più grande richiede più {{t:fold|fold}}: con 3/4 di {{t:pot|piatto}} addirittura il {{n:alpha.cbet.big}}. Quando l'avversario {{t:fold|folda}} spesso comunque, una c-bet piccola ottiene lo stesso a minor costo." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "L'avversario ha un fold to c-bet del {{n:hud.ex.fcb.low}} su {{n:hud.ex.reg.hands}} mani. Hai mancato il flop e non hai un {{t:draw|progetto}}. Valuti una c-bet da 3/4 di {{t:pot|piatto}}. Che cosa fai?"
    options:
      - { text: "Faccio {{t:check|check}}: questo avversario {{t:fold|folda}} meno spesso di quanto serva a una c-bet grande", correct: true, why: "Una c-bet da 3/4 di {{t:pot|piatto}} va in pari solo con il {{n:alpha.cbet.big}} di {{t:fold|fold}}, e l'avversario {{t:fold|folda}} nel {{n:hud.ex.fcb.low}} dei casi. Senza mano e senza out, questo {{t:bluff|bluff}} perde." }
      - { text: "Punto, perché la c-bet è standard", why: "Una c-bet senza mano è buona solo quando l'avversario {{t:fold|folda}} abbastanza spesso o quando la mano ha equity. Qui non c'è né l'una né l'altra cosa." }
      - { text: "Vado all-in per forzare il {{t:fold|fold}}", why: "Più grande è la puntata, più {{t:fold|fold}} le servono. Un avversario che {{t:fold|folda}} di rado non {{t:fold|folderà}} più spesso perché hai {{t:bet|puntato}} di più." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "Un {{t:recreational|giocatore ricreativo}} con fold to 3-bet del {{n:mda.rec.f3b}} {{t:open|apre}} dal {{t:cutoff|CO}}. Sei sul Button. Nella base KJs a volte {{t:call|chiama}}, e A5s a volte è un 3-bet di {{t:bluff|bluff}}. Come giochi contro questo giocatore?"
    options:
      - { text: "Faccio 3-bet con KJs {{t:value|per valore}} e non faccio 3-bet con A5s come {{t:bluff|bluff}}", correct: true, why: "Un giocatore che {{t:fold|folda}} di rado al 3-bet spesso {{t:call|chiama}} con mani più deboli, quindi le mani più forti guadagnano con il 3-bet. Un 3-bet di {{t:bluff|bluff}} guadagna subito solo con oltre il {{n:alpha.vs-3bet-ip-size}} di {{t:fold|fold}}, e questo giocatore {{t:fold|folda}} nel {{n:mda.rec.f3b}} dei casi." }
      - { text: "Faccio 3-bet con A5s, perché un {{t:bluff|bluff}} con un {{t:blocker|blocker}} è un buon 3-bet", why: "Nella base sì, contro un avversario che {{t:fold|folda}} circa metà delle volte. Questo {{t:fold|folda}} nel {{n:mda.rec.f3b}} dei casi, quindi il {{t:bluff|bluff}} gioca quasi sempre un {{t:pot|piatto}} grande con una mano debole." }
      - { text: "{{t:call|Chiamo}} soltanto con KJs, per non spaventare l'avversario", why: "Contro un giocatore che {{t:call|chiama}} i 3-bet con mani più deboli, il 3-bet con KJs costruisce un {{t:pot|piatto}} più grande con una mano migliore e in {{t:position|posizione}}. È meglio della sola {{t:call|chiamata}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Secondo i dati sulla popolazione dei microlimiti online (NL25), i {{t:regular|regular}} {{t:fold|foldano}} al 3-bet nel {{n:mda.reg.f3b}} dei casi, e i {{t:recreational|giocatori ricreativi}} nel {{n:mda.rec.f3b}}. Un 3-bet in {{t:position|posizione}} a {{n:pf.3bet.ip-total}} guadagna senza mano con oltre il {{n:alpha.vs-3bet-ip-size}} di {{t:fold|fold}}. Che cosa ne consegue?"
    options:
      - { text: "Contro i {{t:recreational|giocatori ricreativi}} fai 3-bet quasi senza {{t:bluff|bluff}}; contro i {{t:regular|regular}} i {{t:bluff|bluff}} restano, ma solo con mani che hanno equity", correct: true, why: "Nessun gruppo {{t:fold|folda}} così spesso da far guadagnare un 3-bet senza mano. Nella base i 3-bet di {{t:bluff|bluff}} vivono dell'equity postflop e dei {{t:fold|fold}}; contro un giocatore che {{t:fold|folda}} nel {{n:mda.rec.f3b}} dei casi resta soprattutto l'equity, quindi fai 3-bet con un {{t:range|range}} {{t:linear|lineare}}." }
      - { text: "Fai 3-bet a tutti con qualsiasi mano, perché tutti {{t:fold|foldano}} molto", why: "Qui nessuno {{t:fold|folda}} più spesso del {{n:alpha.vs-3bet-ip-size}}. Fare 3-bet con ogni mano sarebbe in perdita." }
      - { text: "Contro i {{t:recreational|giocatori ricreativi}} smetti del tutto di fare 3-bet", why: "Al contrario: un giocatore che {{t:call|chiama}} i 3-bet con mani più deboli paga le tue mani forti. Cambi la composizione del 3-bet, non ci rinunci." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Dopo {{n:hud.ex.mid.hands}} mani l'avversario sembra loose e passivo, ma il campione è piccolo. Quanto ti allontani dalla base?"
    options:
      - { text: "Un po', nella direzione della lettura e solo con le mani al limite", correct: true, why: "La direzione si vede già in un campione piccolo, ma i numeri hanno un errore grande. Le mani al limite della decisione le sposti verso la lettura, e il resto lo giochi come nella base finché il campione non cresce." }
      - { text: "Fino in fondo: gioco subito contro di lui con il massimo {{t:exploit|exploit}}", why: "Con un campione piccolo la lettura può essere sbagliata. Una grande deviazione dalla base è essa stessa sfruttabile: la base è la strategia meno vulnerabile allo sfruttamento." }
      - { text: "Per niente, finché non avrò mille mani", why: "Troppo prudente. La direzione della lettura dopo {{n:hud.ex.mid.hands}} mani significa già qualcosa, e puoi spostare le mani al limite a basso costo." }
---
{{t:exploit|Lo sfruttamento}} non sostituisce la base, la sposta. Prima sai come si gioca in equilibrio (moduli 3–9), poi dai dati vedi in quale direzione l'avversario se ne allontana, e sposti il tuo gioco nella stessa direzione. La domanda è: con quali mani e di quanto.

## Prima le {{t:mixed-hand|mani miste}}

In equilibrio alcune mani giocano due azioni, ad esempio a volte {{t:call|chiamano}} e a volte {{t:fold|foldano}}. Lo fanno perché entrambe le azioni danno lo stesso risultato: l'avversario ha esattamente tanti {{t:bluff|bluff}} da rendere la mano indifferente. Sono queste le mani che reagiscono per prime all'errore dell'avversario:

- l'avversario {{t:bluff|bluffa}} troppo spesso: le {{t:mixed-hand|mani miste}} {{t:call|chiamano}} sempre;
- l'avversario {{t:bluff|bluffa}} troppo raramente: le {{t:mixed-hand|mani miste}} {{t:fold|foldano}} sempre.

Basta poco. In un esempio pubblicato di solver (il Button punta al river dopo la linea bet, {{t:check|check}}, bet), portare i {{t:bluff|bluff}} dell'avversario da circa il {{n:overbluff.base}} a circa il {{n:overbluff.lock}} ha spostato la difesa del {{t:big-blind|big blind}} sulla sola {{t:call|chiamata}}. Le mani che nella base {{t:fold|foldano}} sempre o proseguono sempre cambiano decisione solo quando l'avversario si allontana molto dall'equilibrio.

## Il {{t:bluff|bluff}} calcolato con una soglia

Se un {{t:bluff|bluff}} senza mano conviene te lo dice l'{{t:alpha|alpha}} del modulo 6:

```formula
Il {{t:bluff|bluff}} guadagna quando l'avversario {{t:fold|folda}} più spesso di: puntata ÷ (piatto + puntata)
```

Con una c-bet da 1/3 di {{t:pot|piatto}} è il {{n:alpha.cbet.small}}, con 3/4 di {{t:pot|piatto}} il {{n:alpha.cbet.big}}. Il fold to c-bet dell'{{t:hud|HUD}} mostra se l'avversario è sopra o sotto questa soglia. È un'approssimazione: la statistica unisce tutte le dimensioni e tutti i flop, e la tua mano di solito ha ancora un po' di equity. Su un flop che colpisce il {{t:range|range}} dell'avversario, lui {{t:fold|folda}} meno spesso della media.

I giocatori della popolazione dei microlimiti online (NL25) {{t:fold|foldano}} alla c-bet al flop in media nel {{n:mda.all.fcb}} dei casi. Non è per forza un errore: anche il solver {{t:out-of-position|fuori posizione}} al flop {{t:fold|folda}} più spesso di quanto indichi l'{{t:mdf|MDF}} (modulo 6). Per questo la sola media della popolazione sopra la soglia non giustifica una c-bet senza mano; ti serve una lettura sull'avversario specifico o un flop che non colpisce il suo {{t:range|range}}.

## Il 3-bet contro un giocatore che non {{t:fold|folda}}

Un 3-bet in {{t:position|posizione}} a {{n:pf.3bet.ip-total}} guadagna senza alcuna mano solo quando l'avversario {{t:fold|folda}} più spesso del {{n:alpha.vs-3bet-ip-size}} (modulo 4). Dati sulla popolazione dei microlimiti online (NL25):

| Gruppo | Fold to 3-bet |
|---|---|
| {{t:regular|Regular}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Giocatori ricreativi}} | {{n:mda.rec.f3b}} |

Nella base i 3-bet di {{t:bluff|bluff}} vivono dei {{t:fold|fold}} e dell'equity postflop. Contro un giocatore che {{t:fold|folda}} nel {{n:mda.rec.f3b}} dei casi, i {{t:fold|fold}} quasi non ci sono, in compenso lui {{t:call|chiama}} con mani più deboli. Per questo contro di lui fai 3-bet con un {{t:range|range}} {{t:linear|lineare}}: più mani forti {{t:value|per valore}}, quasi nessun {{t:bluff|bluff}}. In due materiali formativi gli allenatori fissano questo limite a un fold to 3-bet di circa il {{n:hud.f3b.low}}.

## Campione piccolo, deviazione piccola

Più piccolo è il campione, più grande è l'errore della statistica (lezione 1). Con un campione piccolo sposti solo le mani al limite e solo nella direzione della lettura. Una deviazione grande, con tutto il {{t:range|range}}, ha senso solo con un campione grande e un errore evidente dell'avversario. Deviare dalla base è di per sé un errore che un buon avversario può sfruttare.

:::note Fonti
Il principio delle {{t:mixed-hand|mani miste}} viene da un'analisi di solver pubblicata con la strategia dell'avversario bloccata (una soluzione del solver, non dati sulla popolazione). Le soglie di {{t:alpha|alpha}} sono un calcolo. Il fold to 3-bet e il fold to c-bet della popolazione vengono da un database pubblico di statistiche (una grande sala online, NL25–NL100, {{n:mda.period.months}} mesi prima di ottobre 2026). Il limite di fold to 3-bet e il principio «campione piccolo, deviazione piccola» sono raccomandazioni di due materiali formativi.
:::
