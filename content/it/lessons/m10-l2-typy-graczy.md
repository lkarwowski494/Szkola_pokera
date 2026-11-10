---
id: m10.l2
module: m10
order: 2
title: "Tipi di giocatori"
sub: "Nit, reg, giocatore passivo, maniaco"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "Dopo {{n:hud.ex.reg.hands}} mani l'avversario ha {{t:vpip}} {{n:hud.ex.passive.vpip}} e {{t:pfr}} {{n:hud.ex.passive.pfr}}. Che cosa dice del suo gioco prima del flop?"
    options:
      - { text: "È passivo: con la maggior parte delle mani si limita a {{t:call|chiamare}} o fa limp", correct: true, why: "La differenza {{t:vpip}} − {{t:pfr}} è di {{n:hud.ex.passive.gap}} punti, sopra la soglia di {{n:hud.gap.passive}}. Gioca parecchie mani, ma la maggior parte le mette nel {{t:pot|piatto}} senza {{t:raise|rilancio}}." }
      - { text: "È aggressivo, perché gioca molte mani", why: "Il numero di mani ({{t:vpip}}) dice quanto largo gioca, non quanto è aggressivo. L'aggressività la indicano il {{t:pfr}} e la differenza tra i due." }
      - { text: "È un {{t:nit}}", why: "Un {{t:nit}} gioca fino a circa il {{n:hud.vpip.nit-max}} delle mani; questo giocatore ne gioca chiaramente di più." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "Secondo i dati sulla popolazione dei microlimiti online (NL25), i {{t:recreational|giocatori ricreativi}} arrivano allo showdown nel {{n:mda.rec.wtsd}} dei casi e vincono il {{n:mda.rec.wsd}} degli showdown; i {{t:regular|regular}} rispettivamente il {{n:mda.reg.wtsd}} e il {{n:mda.reg.wsd}}. Che cosa ne consegue?"
    options:
      - { text: "I {{t:recreational|giocatori ricreativi}} pagano fino in fondo più spesso e perdono più spesso: {{t:call|chiamano}} con mani più deboli", correct: true, why: "Arrivano allo showdown più spesso e lo vincono meno spesso, quindi ci arrivano con mani più deboli. Contro di loro punti {{t:value|per valore}} più mani e {{t:bluff|bluffi}} di meno." }
      - { text: "I {{t:recreational|giocatori ricreativi}} {{t:bluff|bluffano}} più spesso", why: "Questi numeri dicono quanto spesso arrivano allo showdown e con che cosa, non parlano dei {{t:bluff|bluff}}. Vincono meno showdown perché {{t:call|chiamano}} con mani più deboli." }
      - { text: "Niente: una differenza di pochi punti è rumore", why: "Sono dati di tutta la popolazione di questo {{t:stakes|limite}} su {{n:mda.period.months}} mesi, non di qualche decina di mani di un solo giocatore. La differenza è coerente a NL25, NL50 e NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Hai puntato al flop e al turn, l'avversario ha {{t:call|chiamato}}. È un {{t:recreational|giocatore ricreativo}} passivo ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} mani). {{t:check|Fa check}}. Che cosa fai con {{t:top-pair|top pair}} e il secondo miglior kicker?"
    options:
      - { text: "Punto {{t:value|per valore}}", correct: true, why: "Un giocatore così {{t:call|chiama}} fino in fondo con re più deboli, otto e {{t:pair|coppie}} servite. Più della metà delle sue {{t:call|chiamate}} sono mani peggiori della tua, quindi la puntata rende (soglia del modulo 8)." }
      - { text: "{{t:check|Faccio check}} per non scontrarmi con una mano migliore", why: "Contro un giocatore che {{t:call|chiama}} con mani più deboli, il {{t:check}} rinuncia a valore. Le mani migliori a volte pagheranno, ma le {{t:call|chiamate}} con mani peggiori sono di più." }
      - { text: "Punto tutto il {{t:pot|piatto}} come {{t:bluff}}", why: "Con {{t:top-pair|top pair}} non è un {{t:bluff}}: batti molte delle mani che {{t:call|chiameranno}}. La puntata è {{t:value|per valore}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, {{t:straight-draw|progetto di scala}} mancato. L'avversario è un {{t:recreational|giocatore ricreativo}} passivo ({{t:wtsd}} {{n:mda.rec.wtsd}}), ha {{t:call|chiamato}} al flop e al turn. {{t:check|Fa check}}. Che cosa fai?"
    options:
      - { text: "{{t:check|Faccio check}} e rinuncio al {{t:pot|piatto}}", correct: true, why: "Un {{t:bluff}} rende solo se l'avversario {{t:fold|folda}} più spesso dell'{{t:alpha}} della tua puntata. Un giocatore che ha {{t:call|chiamato}} due {{t:street}} e arriva spesso allo showdown raramente {{t:fold|folda}} al river." }
      - { text: "Punto forte, perché non ho valore allo showdown", why: "Nella strategia di base (modulo 8) un {{t:bluff}} così può essere buono, ma contro questo giocatore mancano i {{t:fold}}: il {{t:bluff}} perde." }
      - { text: "Punto poco, così il {{t:bluff}} costa meno", why: "Una puntata più piccola richiede meno {{t:fold}}, ma una mano che ha {{t:call|chiamato}} due {{t:street}} di solito {{t:call|chiama}} anche una puntata piccola. Meglio rinunciare al {{t:pot|piatto}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "{{t:open|Apri}} dal {{t:cutoff|CO}}. Sul Button siede un {{t:nit}}: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} mani. Ti fa 3-bet. Che cosa fai con AJo?"
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Chi gioca così poche mani fa 3-bet soprattutto con le più forti: AQ, AK e {{t:pair|coppie}} alte, che dominano AJ. Contro di lui {{t:fold|foldi}} più spesso che nella strategia di base del modulo 4." }
      - { text: "{{t:call|Chiamo}}, perché AJ è una mano forte", why: "AJ è forte contro un {{t:range}} ampio. Contro il 3-bet di un giocatore con {{t:vpip}} {{n:hud.ex.nit.vpip}} è spesso dominata e fuori {{t:position|posizione}}." }
      - { text: "Faccio 4-bet", why: "Un 4-bet con AJ contro un {{t:nit}} gioca contro un {{t:range}} che la domina e raramente {{t:fold|folda}}. Non è né {{t:value|valore}} né un buon {{t:bluff}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Sei sul Button, tutti hanno {{t:fold|foldato}}. In {{t:big-blind}} c'è un {{t:nit}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} dopo {{n:hud.ex.reg.hands}} mani). Come cambi la tua {{t:open|apertura}}?"
    options:
      - { text: "{{t:open|Apro}} più largo che nella strategia di base", correct: true, why: "Un {{t:nit}} difende il blind in modo stretto, quindi la tua {{t:open|apertura}} vince subito più spesso, anche con una mano debole." }
      - { text: "{{t:open|Apro}} più stretto, perché il {{t:nit}} ha mani forti", why: "Il {{t:nit}} ha mani forti quando gioca. In {{t:big-blind}} il più delle volte {{t:fold|folda}}, ed è questo il tuo guadagno." }
      - { text: "Niente cambia: il tipo di giocatore non influisce sul furto dei blind", why: "Influisce. Il guadagno del furto dipende da quanto spesso il blind {{t:fold|folda}}, e un {{t:nit}} {{t:fold|folda}} spesso." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "L'avversario è un {{t:maniac|maniaco}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} dopo {{n:hud.ex.reg.hands}} mani. Ha puntato a ogni {{t:street}}, al river {{t:bet|punta}} tutto il {{t:pot|piatto}}. Che cosa fai con {{t:top-pair|top pair}} e un kicker debole?"
    options:
      - { text: "{{t:call|Chiamo}}", correct: true, why: "Contro un giocatore che {{t:bluff|bluffa}} più che nella strategia di base, le mani al limite della {{t:call|chiamata}} rendono. La {{t:pair|coppia}} massima batte i suoi {{t:bluff}} e parte delle sue mani di valore." }
      - { text: "{{t:fold|Foldo}}, perché una puntata di tutto il {{t:pot|piatto}} indica una mano forte", why: "Da un giocatore che gioca quasi ogni mano con un {{t:raise|rilancio}} e punta a ogni {{t:street}}, una puntata grande contiene molti {{t:bluff}}. {{t:fold|Foldando}}, lo paghi per il fatto di essere aggressivo." }
      - { text: "{{t:raise|Rilancio}} all-in", why: "Il {{t:raise|rilancio}} fa {{t:fold|foldare}} i {{t:bluff}} e fa {{t:call|chiamare}} le mani migliori. Con una mano che cattura i {{t:bluff}} basta una {{t:call|chiamata}}." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Giochi contro un {{t:maniac|maniaco}}. Al turn hai una mano debole senza possibilità di migliorare, e lui {{t:check|fa check}}. Che cosa fai?"
    options:
      - { text: "{{t:check|Faccio check}}: {{t:bluff|bluffare}} un {{t:maniac|maniac}} raramente funziona", correct: true, why: "Il {{t:maniac|maniac}} raramente {{t:fold|folda}} e spesso {{t:raise|rilancia}}. Con lui guadagni {{t:call|chiamando}} con mani più forti, non con i {{t:bluff}}." }
      - { text: "Punto, perché il {{t:check}} di un {{t:maniac|maniac}} indica debolezza", why: "Può darsi, ma il {{t:maniac|maniac}} spesso {{t:raise|rilancia}} con qualsiasi mano. Il {{t:bluff}} ha bisogno di {{t:fold}}, e lui ne concede pochi." }
      - { text: "Punto all-in così non può {{t:raise|rilanciare}}", why: "Rischi tutto lo stack per vincere un {{t:pot|piatto}} piccolo, contro un giocatore che raramente {{t:fold|folda}}. È il modo più costoso di {{t:bluff|bluffare}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Le statistiche della lezione precedente si combinano in alcuni profili tipici. Il tipo di giocatore ti dice in quale direzione si allontana dalla strategia di base: gioca troppo poche mani, troppe mani, {{t:call|chiama}} troppo spesso oppure {{t:raise|rilancia}} troppo spesso.

## Due numeri, quattro tipi

Il tipo lo leggi dal {{t:vpip}} e dalla differenza {{t:vpip}} − {{t:pfr}} (6-max, almeno circa {{n:hud.hands.vpip.low}} mani):

| Tipo | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Errore rispetto alla base |
|---|---|---|---|
| {{t:nit|Nit}} | fino a circa {{n:hud.vpip.nit-max}} | piccola | gioca troppo poche mani |
| {{t:regular|Regular}} ({{t:tag}}, {{t:lag}}) | circa {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | piccola | vicino alla base |
| {{t:recreational|giocatore ricreativo}} passivo | da circa {{n:hud.vpip.loose}} | oltre {{n:hud.gap.passive}} punti | troppe mani, {{t:call|chiama}} troppo spesso |
| {{t:maniac|maniaco}} | da circa {{n:hud.vpip.loose}} | fino a circa {{n:hud.gap.aggressive}} punti | troppe mani, {{t:raise|rilancia}} troppo spesso |

Un giocatore passivo con una differenza grande si chiama anche {{t:calling-station}}. Tra i tipi ci sono zone di transizione (ad es. un {{t:vpip}} tra il dieci e il venti per cento, oppure un giocatore loose con una differenza di pochi punti): lì non assegni un tipo, ma guardi le statistiche successive.

## Che cosa dicono i dati sulla popolazione

Un database pubblico di statistiche riporta le statistiche medie dei giocatori di una grande sala online, NL25 6-max, su tutte le mani degli ultimi {{n:mda.period.months}} mesi. Lì i {{t:regular|regular}} sono i giocatori con {{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} e un risultato superiore a {{n:mda.reg.def.wr}}, mentre i {{t:recreational|giocatori ricreativi}} sono quelli con {{t:vpip}} oltre {{n:mda.rec.def}} e un risultato inferiore a {{n:mda.rec.def.wr}}:

| Statistica | {{t:regular|Regular}} | {{t:recreational|Giocatori ricreativi}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Showdown vinti | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Risultato | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

I {{t:recreational|giocatori ricreativi}} hanno una differenza {{t:vpip}} − {{t:pfr}} di {{n:mda.rec.gap.pp}} punti, quindi sono passivi. Arrivano allo showdown più spesso e lo vincono meno spesso: {{t:call|chiamano}} con mani più deboli. Inoltre {{t:fold|foldano}} raramente al 3-bet. A NL50 e NL100 i numeri sono quasi gli stessi.

## Il {{t:recreational|giocatore ricreativo}} passivo

La strategia di base del modulo 8 non cambia: punti {{t:value|per valore}} quando più della metà delle mani che {{t:call|chiameranno}} sono peggiori, e un {{t:bluff}} rende quando l'avversario {{t:fold|folda}} più spesso dell'{{t:alpha}}. Cambia l'avversario: {{t:call|chiama}} con più mani deboli. Perciò:

- punti {{t:value|per valore}} più mani, anche più sottili, ad es. {{t:top-pair|top pair}} con un kicker più debole su tre {{t:street}};
- {{t:bluff|bluffi}} più di rado, soprattutto al river: mancano i {{t:fold}} grazie ai quali il {{t:bluff}} dovrebbe rendere.

## {{t:nit|Nit}} e {{t:maniac|maniaco}}

**Il {{t:nit}}** gioca solo mani forti. Quando {{t:raise|rilancia}} o fa 3-bet, le mani nella parte bassa del tuo {{t:range}} di {{t:call|chiamata}} sono più spesso dominate, quindi le {{t:fold|foldi}} più spesso che nella strategia di base del modulo 4. Quando è sul blind, rubi più spesso, perché difende raramente.

**Il {{t:maniac|maniaco}}** gioca molte mani e quasi tutte le {{t:raise|rilancia}}. Le sue puntate contengono più {{t:bluff}} che nella strategia di base, quindi le mani al limite della {{t:call|chiamata}} le {{t:call|chiami}}, con mani molto forti lo lasci puntare, e tu non {{t:bluff|bluffi}}: raramente {{t:fold|folda}}.

:::note Da dove vengono queste soglie
Le soglie dei tipi sono convenzioni dei coach (due materiali didattici, cash game online 6-max): prendiamo la parte comune oppure un intervallo che copre entrambe le fonti. I dati sulla popolazione provengono da un database pubblico di statistiche (una grande sala online, NL25–NL100, tutte le mani dei {{n:mda.period.months}} mesi prima di ottobre 2026; il sito non indica il numero di mani). La lettura del tipo per il {{t:nit}} e il {{t:maniac|maniac}} si basa sulle statistiche del singolo avversario, non sui dati dell'intera popolazione, quindi richiede un campione.
:::
