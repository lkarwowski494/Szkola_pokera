---
id: m4.l2
module: m4
order: 2
title: "Difendere il big blind"
sub: "Il prezzo della chiamata e una difesa larga"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "Il Button ha {{t:open|aperto}} a {{n:pf.open-size}}, lo {{t:small-blind}} ha {{t:fold|foldato}}. Quale percentuale di equity ti serve nel {{t:big-blind|big blind}} perché la {{t:call|chiamata}} sia conveniente (senza considerare il gioco dopo il flop)? Inserisci un numero."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Aggiungi {{n:bb.call.vs-btn}} a un {{t:pot|piatto}} che dopo la {{t:call|chiamata}} contiene {{n:bb.pot-after.vs-btn}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} fa circa {{n:eq.bb-vs-btn-open}}. Ti servirebbe la metà solo se nel {{t:pot|piatto}} ci fosse soltanto la {{t:bet|puntata}} dell'avversario; i blind nel {{t:pot|piatto}} migliorano il prezzo."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "Lo {{t:small-blind|small blind}} ha {{t:open|aperto}} a {{n:pf.open-size-sb}}. Quanta equity ti serve nel {{t:big-blind|big blind}} per {{t:call|chiamare}}?"
    table: { position: BB }
    options:
      - { text: "Circa {{n:eq.bb-vs-sb-open}}", correct: true, why: "Aggiungi {{n:bb.call.vs-sb}} a un {{t:pot|piatto}} che dopo la {{t:call|chiamata}} contiene {{n:bb.pot-after.vs-sb}}: fa circa {{n:eq.bb-vs-sb-open}}. Il prezzo è peggiore rispetto al Button, ma in compenso dopo il flop hai la {{t:position|posizione}}." }
      - { text: "Circa {{n:eq.bb-vs-btn-open}}", why: "Questo è il prezzo contro un'{{t:open|apertura}} dal Button a {{n:pf.open-size}}. Lo {{t:small-blind|small blind}} {{t:open|apre}} con una dimensione maggiore, quindi paghi di più." }
      - { text: "Circa la metà", why: "Ti servirebbe metà dell'equity se nel {{t:pot|piatto}} ci fosse solo la {{t:bet|puntata}} dell'avversario. Qui ci sono anche i blind, quindi il prezzo è migliore." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Perché nel {{t:big-blind|big blind}} non {{t:call|chiami}} con ogni mano che ha circa {{n:eq.bb-vs-btn-open}} di equity contro il {{t:range}} del Button?"
    table: { position: BB }
    options:
      - { text: "Perché {{t:out-of-position}} non realizzi tutta l'equity", correct: true, why: "L'equity è la probabilità di vincere giocando fino alla fine senza {{t:bet|puntate}}. {{t:out-of-position|Fuori posizione}} spesso {{t:fold|folderai}} la mano prima dello showdown, quindi le mani deboli di semi diversi realizzano meno di quanto indichi l'equity." }
      - { text: "Perché il Button ha sempre una mano forte", why: "Il Button {{t:open|apre}} molto largo, per questo la difesa del {{t:big-blind|BB}} è larga." }
      - { text: "Perché bisogna risparmiare {{t:chips|fiches}}", why: "Conta il {{t:expected-value}}, non risparmiare {{t:chips|fiches}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "Il Button ha {{t:open|aperto}} a {{n:pf.open-size}}, lo {{t:small-blind}} ha {{t:fold|foldato}}. Hai QQ nel {{t:big-blind|big blind}}. Cosa fai?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet a {{n:pf.3bet.oop-total}}", correct: true, why: "QQ è una mano {{t:value|da valore}}. {{t:out-of-position|Fuori posizione}} {{t:raise|rilanci}} a circa {{n:pf.3bet.size-oop}} l'{{t:open|apertura}}, così il Button non può {{t:call|chiamare}} a buon prezzo {{t:in-position}}." }
      - { text: "3-bet a {{n:pf.3bet.ip-total}}", sizeError: true, why: "Azione giusta, ma questa è la dimensione per un giocatore {{t:in-position}} ({{n:pf.3bet.size-ip}} l'{{t:open|apertura}}). {{t:out-of-position|Fuori posizione}} {{t:raise|rilanci}} di più: a {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Chiamo}}", why: "Perdi valore: con QQ vuoi costruire il {{t:pot|piatto}} prima del flop, non giocare un {{t:pot|piatto}} piccolo {{t:out-of-position}}." }
      - { text: "{{t:fold|Foldo}}", why: "QQ è una delle mani migliori preflop. Il {{t:fold}} è un grave errore." }
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
    prompt: "Il Button ha {{t:open|aperto}} a {{n:pf.open-size}}, lo {{t:small-blind}} ha {{t:fold|foldato}}. Colora le mani con cui difendi il {{t:big-blind}} (con una {{t:call|chiamata}} o un 3-bet)."
---
Il {{t:big-blind}} ha già nel {{t:pot|piatto}} un blind intero, quindi contro un'{{t:open|apertura}} deve aggiungere poco. Quando il Button {{t:open|apre}} a {{n:pf.open-size}} e lo {{t:small-blind}} {{t:fold|folda}}, per {{t:call|chiamare}} ti serve solo circa {{n:eq.bb-vs-btn-open}} di equity. Per questo il {{t:big-blind}} difende più largo di tutte le {{t:position|posizioni}}.

## Il prezzo non è tutto

L'equity dice quanto spesso vinci se entrambi arrivate allo showdown senza ulteriori {{t:bet|puntate}}. {{t:out-of-position|Fuori posizione}} spesso {{t:fold|folderai}} dopo il flop, quindi le mani deboli di semi diversi realizzano meno della loro equity. Le mani dello stesso seme, i {{t:connectors|connettori}} e le {{t:pair|coppie}} medie realizzano di più, per questo nella griglia difendi con loro più volentieri.

```range
vs-open.bb-vs-btn
```

Le soluzioni pubblicate dei solver qui difendono circa {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} delle mani ({{t:call|chiamata}} e 3-bet insieme). Il solver dell'app, da cui proviene la griglia, qui difende più largo delle soluzioni pubblicate.

## Contro lo {{t:small-blind}}

Lo {{t:small-blind|small blind}} {{t:open|apre}} con una dimensione maggiore, a {{n:pf.open-size-sb}}, quindi per {{t:call|chiamare}} ti serve circa {{n:eq.bb-vs-sb-open}} di equity. Il prezzo è peggiore, ma dopo il flop hai la {{t:position|posizione}}, quindi difendi comunque largo: più di metà delle mani.

```range
vs-open.bb-vs-sb
```

Una soluzione pubblicata di un solver qui difende circa {{n:pf.bb-def.vs-sb.pub}} delle mani. Il solver dell'app, da cui proviene la griglia, qui difende più stretto della soluzione pubblicata.

:::note Come {{t:raise|rilanciare}} dal {{t:big-blind}}
Le griglie mostrano con cosa difenderti, non come: 3-bet e {{t:call|chiamata}} sono accorpati, perché la composizione dei 3-bet dal {{t:big-blind}} nel solver dell'app differisce dai risultati pubblicati di altri solver. Contro il Button, un 3-bet dal {{t:big-blind}} è di circa {{n:pf.3bet.size-oop}} l'{{t:open|apertura}}. Fai 3-bet con le mani più forti (TT+, AQ+, AJs+) più {{t:bluff|bluff}} presi dalla parte bassa del tuo {{t:range}} di {{t:call|chiamata}}: A5s, a volte A4s, e {{t:connectors|connettori}} dello stesso seme. Le {{t:pair|coppie}} medie e piccole, KQo e gli assi di semi diversi di solito li {{t:call|chiami}}. Contro lo {{t:small-blind}} hai la {{t:position|posizione}}, quindi {{t:raise|rilanci}} meno, circa {{n:pf.3bet.size-ip}} l'{{t:open|apertura}}. In quel caso fai 3-bet soprattutto {{t:value|per valore}} (TT+, AJs+, parte di AQo e KQ), mentre A5s e i {{t:connectors|connettori}} dello stesso seme di solito li {{t:call|chiami}}.
:::
